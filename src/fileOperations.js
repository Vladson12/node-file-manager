import path, { resolve, basename } from "path";
import { cwd } from "process";
import fs from "fs";
import { rename, access, writeFile, rm } from "fs/promises";
import { pipeline } from "stream/promises";

export const add = async (files) => {
  let filePaths;
  try {
    filePaths = files.map((file) => resolve(cwd(), file));
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    const promises = filePaths.map((filePath) =>
      writeFile(filePath, "", { flag: "wx" })
    );
    await Promise.allSettled(promises);
  } catch (err) {
    throw new Error(`Operation failed`);
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

export const rn = async (args) => {
  if (!args || args.length !== 2) {
    throw new Error("Invalid input");
  }
  const [filePath, newFileName] = args;
  if (!filePath || !newFileName) throw new Error("Invalid input");

  const resolvedFilePath = resolve(cwd(), filePath);
  const resolvedNewPath = resolve(resolvedFilePath, "..", newFileName);
  console.log(resolvedFilePath);
  console.log(resolvedNewPath);

  try {
    await access(resolvedNewPath);
  } catch (err) {
    return new Promise((resolve, reject) => {
      rename(resolvedFilePath, resolvedNewPath)
        .then(() => resolve())
        .catch((err) => {
          reject(new Error("Operation failed"));
        });
    });
  }
  throw new Error("Operation failed");
};

export const cp = async (args) => {
  if (!args || args.length !== 2) {
    throw new Error("Invalid input");
  }
  const [filePath, newDirPath] = args;
  if (!filePath || !newDirPath) throw new Error("Invalid input");

  try {
    const resolvedFilePath = resolve(cwd(), filePath);
    const resolvedNewDirPath = resolve(
      cwd(),
      newDirPath,
      basename(resolvedFilePath)
    );

    if (resolvedFilePath === resolvedNewDirPath) return;

    const readStream = fs.createReadStream(resolvedFilePath);
    const writeStream = fs.createWriteStream(resolvedNewDirPath);

    await pipeline(readStream, writeStream);
  } catch (err) {
    console.log(err);
    throw new Error("Operation failed");
  }
};

export const mv = async (args) => {
  if (!args || args.length !== 2) {
    throw new Error("Invalid input");
  }
  const [filePath, newDirPath] = args;
  if (!filePath || !newDirPath) throw new Error("Invalid input");

  try {
    const resolvedFilePath = resolve(cwd(), filePath);
    const resolvedNewDirPath = resolve(
      cwd(),
      newDirPath,
      basename(resolvedFilePath)
    );

    if (resolvedFilePath === resolvedNewDirPath) return;

    const readStream = fs.createReadStream(resolvedFilePath);
    const writeStream = fs.createWriteStream(resolvedNewDirPath);

    await pipeline(readStream, writeStream);
    await rm(resolvedFilePath);
  } catch (err) {
    console.log(err);
    throw new Error("Operation failed");
  }
};

export const remove = async (files) => {
  return new Promise(async (resolve, reject) => {
    if (!files || files.length !== 1) {
      return reject("Invalid input");
    }

    let filePath;
    try {
      filePath = path.resolve(cwd(), files[0]);
    } catch (err) {
      return reject(new Error("Invalid input"));
    }

    try {
      await rm(filePath);
    } catch (err) {
      return reject(new Error("Operation failed"));
    }

    return resolve();
  });
};
