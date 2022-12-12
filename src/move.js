import { chdir } from "process";
import path, { resolve } from "path";
import { cwd } from "process";
import fs from "fs/promises";
import { contentType } from "./utils/fsUtil.js";

export const moveUp = () => {
  try {
    chdir("..");
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const cd = (args) => {
  if (args.length !== 1) {
    throw new Error("Invalid input");
  }
  let dirPath;
  try {
    dirPath = resolve(cwd(), args[0]);
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    chdir(dirPath);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const list = async () => {
  try {
    const content = await fs.readdir(cwd());
    const resArr = [];

    for (const item of content) {
      const name = path.basename(item);
      const type = contentType(await fs.stat(resolve(cwd(), item)));
      resArr.push({ name, type });
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
