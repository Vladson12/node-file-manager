import { moveUp, cd } from "./moveOperations.js";
import { add, cat, rn, cp, mv, remove, ls } from "./fileOperations.js";
import { parseFileManagerCommandAndArgs } from "./utils/parse.js";
import { os } from "./osOperations.js";

export const handle = async (commandLine) => {
  const [command, ...args] = parseFileManagerCommandAndArgs(commandLine);

  switch (command) {
    case ".exit":
      process.exit();
    case "up":
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
    case "mv":
      await mv(args);
      break;
    case "rm":
      await remove(args);
      break;
    case "os":
      os(args[0]);
      break;
    default:
      throw new Error(`Invalid input`);
  }
};
