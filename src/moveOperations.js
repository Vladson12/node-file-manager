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

export const cd = (pathToDirectory) => {
  let resolvedPathToDirectory;
  try {
    resolvedPathToDirectory = resolve(cwd(), pathToDirectory);
  } catch (err) {
    throw new Error("Invalid input");
  }

  try {
    chdir(resolvedPathToDirectory);
  } catch (err) {
    throw new Error("Operation failed");
  }
};
