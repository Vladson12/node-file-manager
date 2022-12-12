import { parseArg } from "./utils/parseArg.js";
import { homedir, EOL } from "os";
import { env, chdir, cwd, stdin, stdout, exit } from "process";
import { handle } from "./handleCommand.js";
import readline from "readline";

try {
  env.USERNAME = parseArg("username");
} catch (err) {
  console.log(
    "Please try again by passing username correclty in following way: --username=your_username"
  );
  process.exit(0);
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
    .then((data) => console.log(`${EOL}You're currently in ${cwd()}`));
});

process.on("exit", () => {
  console.log(`Thank you for using File Manager, ${env.USERNAME}!`);
});
