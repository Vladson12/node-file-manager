import { moveUp, cd } from "./moveOperations.js";
import { add, cat, rn, cp, mv, remove, ls } from "./fileOperations.js";
import { parseFileManagerCommandAndArgs } from "./utils/parse.js";
import { os } from "./osOperations.js";
import { hashFile } from "../hashOperation.js";
import { compress, decompress } from "../archiveOperations.js";
import { EOL } from "os";

export const handle = async (commandLine) => {
  const [command, ...args] = parseFileManagerCommandAndArgs(commandLine);
  console.log(`COMMAND: [${command}]`);
  console.log("ARGS:");
  console.log(args);

  switch (command) {
    case ".exit":
      process.exit();
    case "up":
      moveUp();
      break;
    case "cd":
      if (args.length !== 1) {
        throw new Error("Invalid input");
      }
      cd(...args);
      break;
    case "ls":
      if (args.length !== 0) {
        throw new Error("Invalid input");
      }
      await ls();
      break;
    case "add":
      if (args.length === 0) {
        throw new Error("Invalid input");
      }
      await add(...args);
      break;
    case "cat":
      if (args.length === 0) {
        throw new Error("Invalid input");
      }
      await cat(...args);
      break;
    case "rn":
      if (args.length !== 2) {
        throw new Error("Invalid input");
      }
      await rn(...args);
      break;
    case "cp":
      if (args.length !== 2) {
        throw new Error("Invalid input");
      }
      await cp(...args);
      break;
    case "mv":
      if (args.length !== 2) {
        throw new Error("Invalid input");
      }
      await mv(...args);
      break;
    case "rm":
      if (args.length !== 1) {
        throw new Error("Invalid input");
      }
      await remove(...args);
      break;
    case "os":
      if (args.length !== 1) {
        throw new Error("Invalid input");
      }
      os(...args);
      break;
    case "hash":
      if (args.length !== 1) {
        throw new Error("Invalid input");
      }
      await hashFile(...args);
      break;
    case "compress":
      if (args.length !== 2) {
        throw new Error("Invalid input");
      }
      await compress(...args);
      break;
    case "decompress":
      if (args.length !== 2) {
        throw new Error("Invalid input");
      }
      await decompress(...args);
      break;
    case EOL:
      return;
    default:
      throw new Error(`Invalid input`);
  }
};
