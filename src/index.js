import { parseArg } from "./utils/parseArg.js";
import { homedir, EOL } from "os";
import { env, chdir, cwd, stdin, stdout, exit } from "process";
import { pipeline } from "stream/promises";
import { handle } from "./handleCommand.js";

try {
  env.USERNAME = parseArg("username");
} catch (err) {
  console.log(
    "Please try again by passing username correclty in following way: --username=your_username"
  );
  process.exit(0);
}

console.log(`${EOL}Welcome to the File Manager, ${env.USERNAME}!${EOL}`);
chdir(homedir());
console.log(`You're currently in ${cwd()}`);

pipeline(stdin, handle, stdout);

const exitEvents = ["beforeexit", "SIGINT"];

exitEvents.forEach((exitEvent) => {
  process.on(exitEvent, () => {
    console.log(`${EOL}Thank you for using File Manager, ${env.USERNAME}!`);
    exit();
  });
});
