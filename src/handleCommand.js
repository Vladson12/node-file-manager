import { Transform } from "stream";

export const handle = new Transform({
  transform(chunk, encoding, callback) {
    const [command, ...args] = chunk.toString().trim().split(" ");

    let result;
    switch (command) {
      case ".exit":
        process.emit("beforeexit");
        break;
      default:
        result = "nothing happens!\n";
        break;
    }
    callback(null, result);
  },
});
