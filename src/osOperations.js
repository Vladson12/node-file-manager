import { EOL, cpus, homedir, userInfo, arch } from "os";

export const os = (option) => {
  if (!option) {
    throw new Error("Invalid input");
  }

  switch (option) {
    case "--EOL":
      console.log(JSON.stringify(EOL));
      break;
    case "--cpus":
      const cpusInfo = cpus();
      console.log(`total cpus: ${cpusInfo.length}`);
      console.log(
        cpusInfo.map((cpu) => ({
          model: cpu.model.trim(),
          speed: `${(Math.round(cpu.speed / 100) / 10).toFixed(1)} GHz`,
        }))
      );
      break;
    case "--homedir":
      console.log(homedir());
      break;
    case "--username":
      console.log(userInfo().username);
      break;
    case "--architecture":
      console.log(arch());
      break;
    default:
      throw new Error("Invalid input");
  }
};
