import { moveUp, cd, ls } from "./move.js";
import { add, cat, rn, cp } from "./fileOperations.js";
import { parseFileManagerCommandAndArgs } from "./utils/parseArg.js";

export const handle = async (commandLine) => {
  const [command, ...args] = parseFileManagerCommandAndArgs(commandLine);

  switch (command) {
    case ".exit":
      process.exit();
    case ".up":
      moveUp();
      break;
    case "cd":
      cd(args);
      break;
    case "ls":
      await ls();
      break;
    case "add":
      await add(args);
      break;
    case "cat":
      await cat(args);
      break;
    case "rn":
      await rn(args);
      break;
    case "cp":
      await cp(args);
      break;
    default:
      throw new Error(`Invalid input`);
  }
};
