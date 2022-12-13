import { chdir } from "process";
import path, { resolve } from "path";
import { cwd } from "process";

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
