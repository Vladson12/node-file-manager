export const contentType = (stats) => {
  if (stats.isFile()) return "file";
  if (stats.isDirectory()) return "directory";
  if (stats.isBlockDevice()) return "block device";
  if (stats.isCharacterDevice()) return "character device";
  if (stats.isSymbolicLink()) return "symbolic link";
  if (stats.isFIFO()) return "fifo";
  if (stats.isSocket()) return "socket";
};
