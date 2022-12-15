import { resolve, basename, relative } from "path";
import { cwd } from "process";
import fs from "fs";
import {
  readdir,
  stat,
  rename,
  access,
  writeFile,
  rm,
  constants,
} from "fs/promises";
import { pipeline } from "stream/promises";
import { contentType } from "./utils/fsUtil.js";

export const add = async (newFileName) => {
  if (!newFileName) {
    throw new Error("Invalid input");
  }

  const resolvedFilePath = resolve(cwd(), newFileName);

  try {
    await writeFile(resolvedFilePath, "", { flag: "wx" });
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const cat = async (pathToFile) => {
  if (!pathToFile) {
    throw new Error("Invalid input");
  }

  const resolvedPathToFile = resolve(cwd(), pathToFile);

  const readStream = fs.createReadStream(resolvedPathToFile, "utf-8");

  return new Promise((resolve, reject) => {
    readStream.on("data", (chunk) => {
      console.log(chunk);
    });
    readStream.on("error", (err) => reject(new Error("Operation failed")));
    readStream.on("end", () => {
      resolve();
    });
  });
};

export const rn = async (pathTofile, newFilename) => {
  if (!pathTofile || !newFilename) throw new Error("Invalid input");

  const resolvedPathToFile = resolve(cwd(), pathTofile);
  const resolvedNewPath = resolve(resolvedPathToFile, "..", newFilename);

  try {
    await access(resolvedNewPath);
  } catch (err) {
    return new Promise((resolve, reject) => {
      rename(resolvedPathToFile, resolvedNewPath)
        .then(() => resolve())
        .catch((err) => {
          reject(new Error("Operation failed"));
        });
    });
  }
  throw new Error("Operation failed");
};

export const cp = async (pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) throw new Error("Invalid input");

  const resolvedPathToFile = resolve(cwd(), pathToFile);
  let resolvedPathToNewDirectory = resolve(cwd(), pathToNewDirectory);

  console.log(resolvedPathToFile);
  console.log(resolvedPathToNewDirectory);

  if (
    [basename(resolvedPathToFile), ""].includes(
      relative(resolvedPathToNewDirectory, resolvedPathToFile)
    )
  ) {
    return;
  }

  let readStream = fs.createReadStream(resolvedPathToFile);
  let writeStream = fs.createWriteStream(resolvedPathToNewDirectory);

  try {
    await pipeline(readStream, writeStream);
  } catch (err) {
    if (err.errno === -4068) {
      readStream = fs.createReadStream(resolvedPathToFile);
      writeStream = fs.createWriteStream(
        resolve(resolvedPathToNewDirectory, basename(resolvedPathToFile))
      );
      try {
        pipeline(readStream, writeStream);
      } catch {
        throw new Error("Operation failed");
      }
    } else {
      throw new Error("Operation failed");
    }
  }
};

export const mv = async (pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) throw new Error("Invalid input");

  const resolvedPathToFile = resolve(cwd(), pathToFile);
  const resolvedPathToNewDirectory = resolve(
    cwd(),
    pathToNewDirectory,
    basename(resolvedPathToFile)
  );

  if (resolvedPathToFile === resolvedPathToNewDirectory) return;

  const readStream = fs.createReadStream(resolvedPathToFile);
  const writeStream = fs.createWriteStream(resolvedPathToNewDirectory);

  try {
    await pipeline(readStream, writeStream);
    await rm(resolvedPathToFile);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const remove = async (pathToFile) => {
  if (!pathToFile) {
    throw new Error("Invalid input");
  }

  const resolvedPathToFile = path.resolve(cwd(), pathToFile);

  try {
    await rm(resolvedPathToFile);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const ls = async () => {
  try {
    const content = await readdir(cwd());
    const resArr = [];

    for (const item of content) {
      try {
        const name = basename(item);
        const type = contentType(await stat(resolve(cwd(), item)));
        resArr.push({ name, type });
      } catch {
        continue;
      }
    }

    resArr.sort((a, b) => {
      if (a.type === b.type) {
        return a.name.localeCompare(b.name);
      } else {
        return a.type.localeCompare(b.type);
      }
    });

    console.table(resArr);
  } catch (err) {
    throw new Error("Operation failed");
  }
};
