import { parseNodeArg } from "./utils/parse.js";
import { homedir, EOL } from "os";
import { env, chdir, cwd, stdin, stdout, exit } from "process";
import { handle } from "./commandDispatcher.js";
import readline from "readline";

try {
  env.USERNAME = parseNodeArg("username");
} catch (err) {
  console.log(
    "Please try again by passing username correclty in following way: --username=your_username"
  );
  exit(0);
}

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

console.log(`Welcome to the File Manager, ${env.USERNAME}!${EOL}`);
chdir(homedir());
console.log(`You're currently in ${cwd()}`);

rl.on("line", (command) => {
  handle(command)
    .catch((err) => console.log(err.message))
    .finally(() => console.log(`${EOL}You're currently in ${cwd()}`));
});

process.on("exit", () => {
  console.log(`${EOL}Thank you for using File Manager, ${env.USERNAME}!`);
});
