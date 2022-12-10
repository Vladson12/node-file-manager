import { parseArg } from "./utils/parseArg.js";

let username;

try {
  username = parseArg("username");
} catch (err) {
  console.log(
    "Please try again by passing username correclty in following way: --username=your_username"
  );
  process.exit(0);
}

console.log(`Welcome to the File Manager, ${username}!`);
