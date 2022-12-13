import { normalize } from "path";

export const parseArg = (argKey) => {
  const args = process.argv.slice(2);
  const desiredArg = args.find((elem) => elem.startsWith(`--${argKey}=`));
  if (!desiredArg) throw new Error("Arg not found!");
  const keyValue = desiredArg.slice(2).split("=");
  if (keyValue.length !== 2) throw new Error("Arg passed in wrong format!");
  const [_, value] = keyValue;
  if (!value) throw new Error("Arg value not defined!");
  return value;
};

export const parseFileManagerCommandAndArgs = (line) => {
  let currentLine = line.trim();

  const args = [];
  for (let i = 0; i < currentLine.length; i++) {
    const symbol = currentLine.charAt(i);
    let beginIndex = i;
    let endIndex = i;

    // SYMBOL !== '\"' && !== "\'"
    if (symbol !== '"' && symbol !== "'") {
      if (symbol === " ") {
        continue;
      }
      for (let j = i + 1; j < currentLine.length; j++) {
        const nextSymbol = currentLine.charAt(j);
        if (j === currentLine.length - 1 || nextSymbol === " ") {
          endIndex = j;
          i = endIndex;
          break;
        }
        if (['"', "'"].includes(nextSymbol)) {
          throw new Error("Invalid input " + j);
        }
      }

      if (endIndex === currentLine.length - 1) {
        args.push(currentLine.slice(beginIndex));
      } else {
        args.push(currentLine.slice(beginIndex, endIndex));
      }
    } else if (symbol === '"') {
      // SYMBOL === '\"'
      for (let j = i + 1; j < currentLine.length; j++) {
        const nextSymbol = currentLine.charAt(j);
        if (nextSymbol === '"') {
          endIndex = j + 1;
          i = endIndex;
          break;
        }
        if (j === currentLine.length - 1 || nextSymbol === "'") {
          throw new Error("Invalid input " + j);
        }
      }

      if (endIndex === beginIndex || endIndex === beginIndex + 2) {
        throw new Error("Invalid input");
      } else {
        args.push(currentLine.slice(beginIndex, endIndex));
      }
    } else if (symbol === "'") {
      // SYMBOL === "\'"
      for (let j = i + 1; j < currentLine.length; j++) {
        const nextSymbol = currentLine.charAt(j);
        if (nextSymbol === "'") {
          endIndex = j + 1;
          i = endIndex;
          break;
        }
        if (j === currentLine.length - 1 || nextSymbol === '"') {
          throw new Error("Invalid input " + j);
        }
      }

      if (endIndex === beginIndex || endIndex === beginIndex + 2) {
        throw new Error("Invalid input");
      } else {
        args.push(currentLine.slice(beginIndex, endIndex));
      }
    }
  }

  if (!args[0]) throw new Error("Invalid input");

  return args.map((arg) => normalize(arg.replace(/["']/g, "")));
};

// parseFileManagerCommandAndArgs("        node     'a'");
// parseFileManagerCommandAndArgs(
//   "        node     \"with spaces double quotes\"   withoutSpaces   'with spaces single quotes'"
// );
// parseFileManagerCommandAndArgs("");
