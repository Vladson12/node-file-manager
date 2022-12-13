import { resolve } from "path";
import { cwd } from "process";
import fs from "fs";
import { EOL } from "os";
import { rename, access } from "fs/promises";

export const add = async (files) => {
  let filePaths;
  try {
    filePaths = files.map((file) => resolve(cwd(), file));
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    const promises = filePaths.map((filePath) =>
      fs.writeFile(filePath, "", { flag: "wx" })
    );
    const results = await Promise.allSettled(promises);
    const errors = [];
    results.forEach((res) => {
      if (res.status === "rejected") {
        errors.push(res.reason);
      }
    });
    if (errors.length) {
      throw new Error(errors.toString());
    }
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
  const [filePath, newFileName] = args;
  if (!filePath || !newFileName) throw new Error("Invalid input");

  const resolvedFilePath = resolve(cwd(), filePath);
  const resolvedNewPath = resolve(resolvedFilePath, "..", newFileName);

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
  throw new Error("Operation failed!!!");
};
