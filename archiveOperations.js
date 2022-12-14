import fs from "fs";
import { createBrotliCompress, createBrotliDecompress } from "zlib";
import { pipeline } from "stream/promises";
import { resolve, basename, parse } from "path";
import { cwd } from "process";

export const compress = async (args) => {
  if (!args || args.length !== 2) {
    throw new Error("Invalid input");
  }

  const [pathToFile, pathToDestination] = args;
  if (!pathToFile || !pathToDestination) throw new Error("Invalid input");

  const resolvedPathToFile = resolve(cwd(), pathToFile);
  const resolvedPathToDestination = resolve(
    cwd(),
    pathToDestination,
    basename(resolvedPathToFile) + ".br"
  );

  console.log(resolvedPathToFile);
  console.log(resolvedPathToDestination);

  const readStream = fs.createReadStream(resolvedPathToFile);
  const writeStream = fs.createWriteStream(resolvedPathToDestination);
  const brotliCompress = createBrotliCompress();

  try {
    await pipeline(readStream, brotliCompress, writeStream);
  } catch (err) {
    throw new Error("Operation failed");
  }
};

export const decompress = async (args) => {
  if (!args || args.length !== 2) {
    throw new Error("Invalid input");
  }

  const [pathToFile, pathToDestination] = args;
  if (!pathToFile || !pathToDestination) throw new Error("Invalid input");

  const resolvedPathToFile = resolve(cwd(), pathToFile);
  const resolvedPathToDestination = resolve(
    cwd(),
    pathToDestination,
    parse(resolvedPathToFile).name
  );

  console.log(resolvedPathToFile);
  console.log(resolvedPathToDestination);

  const readStream = fs.createReadStream(resolvedPathToFile);
  const writeStream = fs.createWriteStream(resolvedPathToDestination);
  const brotliDecompress = createBrotliDecompress();

  try {
    await pipeline(readStream, brotliDecompress, writeStream);
  } catch (err) {
    console.log(err);
    throw new Error("Operation failed");
  }
};
