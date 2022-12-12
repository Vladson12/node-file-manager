import { resolve } from "path";
import { cwd } from "process";
import fs from "fs/promises";

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
