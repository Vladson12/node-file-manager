import { moveUp, cd, ls } from "./move.js";
import { add } from "./fileOperations.js";
import { parseFileManagerCommandAndArgs } from "./utils/parseArg.js";

const commands = { exit: ".exit", up: "up", add: "add" };

export const handle = async (commandLine) => {
  const [command, ...args] = parseFileManagerCommandAndArgs(commandLine);

  switch (command) {
    case commands.exit:
      process.exit();
    case commands.up:
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
    default:
      throw new Error(`Invalid input`);
  }
};
