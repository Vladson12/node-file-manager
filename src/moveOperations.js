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
  if (!pathToDirectory) {
    throw new Error("Invalid input");
  }

  const resolvedPathToDirectory = resolve(cwd(), pathToDirectory);

  try {
    chdir(resolvedPathToDirectory);
  } catch (err) {
    throw new Error("Operation failed");
  }
};
