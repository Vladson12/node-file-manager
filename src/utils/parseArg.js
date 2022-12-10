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
