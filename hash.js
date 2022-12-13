import path, { resolve } from "path";
import { createHash } from "crypto";
import fs from "fs";
import { cwd } from "process";

export const hashFile = async (file) => {
  let filePath;
  try {
    filePath = resolve(cwd(), file);
  } catch (err) {
    throw new Error("Invalid input");
  }

  const readStream = fs.createReadStream(filePath);
  const hash = createHash("sha256");

  return new Promise((resolve, reject) => {
    readStream.on("data", (file) => hash.update(file));

    readStream.on("end", () => {
      console.log(hash.digest("hex"));
      resolve();
    });

    readStream.on("error", (err) => reject(new Error("Operation failed")));
  });
};
