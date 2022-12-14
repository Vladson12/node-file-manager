import path, { resolve } from "path";
import { createHash } from "crypto";
import fs from "fs";
import { cwd } from "process";

export const hashFile = async (pathToFile) => {
  const resolvedPathToFile = resolve(cwd(), pathToFile);
  const readStream = fs.createReadStream(resolvedPathToFile);
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
