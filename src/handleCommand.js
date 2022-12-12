import { Transform } from "stream";
import { moveUp } from "./move.js";
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
    case "add":
      await add(args);
      break;
    default:
      throw new Error(`Invalid input`);
  }
};

const validate = (command) => {};
