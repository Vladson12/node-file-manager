import { resolve } from "path";
import { cwd } from "process";
import fs from "fs";
import { EOL } from "os";

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
