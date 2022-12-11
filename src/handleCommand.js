import { Transform } from "stream";
import { moveUp } from "./move.js";
import { EOL } from "os";
import { cwd } from "process";

export const handle = new Transform({
  transform(chunk, encoding, callback) {
    const [command, ...args] = chunk.toString().trim().split(" ");

    try {
      switch (command) {
        case ".exit":
          process.emit("beforeexit");
          break;
        case "up":
          moveUp();
          break;
        default:
          throw new Error(`${command}: command not found`);
      }
    } catch (err) {
      console.log(`Operation failed: ${err.message}`);
    }

    console.log(`${EOL}You are currently in ${cwd()}`);
    callback();
  },
});
