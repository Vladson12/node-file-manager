import path, { resolve, basename } from "path";
import { cwd } from "process";
import fs from "fs";
import { rename, access, writeFile, rm } from "fs/promises";
import { pipeline } from "stream/promises";
import fsProm from "fs/promises";
import { contentType } from "./utils/fsUtil.js";

export const add = async (newFileName) => {
  let resolvedFilePath;
  try {
    resolvedFilePath = resolve(cwd(), newFileName);
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    await writeFile(filePath, "", { flag: "wx" });
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const cat = async (files) => {
  let filePaths;
  try {
    filePaths = files.map((file) => resolve(cwd(), file));
  } catch (err) {
    throw new Error("Invalid input");
  }

  return new Promise((resolve, reject) => {
    filePaths.forEach((filePath, index) => {
      const readStream = fs.createReadStream(filePath, "utf-8");
      readStream.on("data", (chunk) => {
        console.log(chunk);
      });
      readStream.on("error", (err) => reject(new Error("Operation failed")));
      readStream.on("end", () => {
        if (index === filePaths.length - 1) {
          resolve();
        }
      });
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

  try {
    const resolvedPathToFile = resolve(cwd(), pathToFile);
    const resolvedPathToNewDirectory = resolve(
      cwd(),
      pathToNewDirectory,
      basename(resolvedPathToFile)
    );

    if (resolvedPathToFile === resolvedPathToNewDirectory) return;

    const readStream = fs.createReadStream(resolvedPathToFile);
    const writeStream = fs.createWriteStream(resolvedPathToNewDirectory);

    await pipeline(readStream, writeStream);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const mv = async (pathToFile, pathToNewDirectory) => {
  if (!pathToFile || !pathToNewDirectory) throw new Error("Invalid input");

  try {
    const resolvedPathToFile = resolve(cwd(), pathToFile);
    const resolvedPathToNewDirectory = resolve(
      cwd(),
      newDirPath,
      basename(resolvedPathToFile)
    );

    if (resolvedPathToFile === resolvedPathToNewDirectory) return;

    const readStream = fs.createReadStream(resolvedPathToFile);
    const writeStream = fs.createWriteStream(resolvedPathToNewDirectory);

    await pipeline(readStream, writeStream);
    await rm(resolvedPathToFile);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const remove = async (pathToFile) => {
  return new Promise(async (resolve, reject) => {
    let resolvedPathToFile;
    try {
      resolvedPathToFile = path.resolve(cwd(), pathToFile);
    } catch (err) {
      return reject(new Error("Invalid input"));
    }

    try {
      await rm(resolvedPathToFile);
    } catch (err) {
      return reject(new Error("Operation failed"));
    }

    return resolve();
  });
};

export const ls = async () => {
  try {
    const content = await fsProm.readdir(cwd());
    const resArr = [];

    for (const item of content) {
      try {
        const name = path.basename(item);
        const type = contentType(await fsProm.stat(resolve(cwd(), item)));
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
