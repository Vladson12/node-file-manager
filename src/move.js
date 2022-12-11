import { chdir } from "process";

export const moveUp = () => {
  chdir("..");
};
