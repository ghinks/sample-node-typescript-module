import { execShellCmd } from "./cmd/index";

const run = async (): Promise<string[]> => {
  const cmd = "git ls-remote --tags git@github.com:expressjs/express.git";
  const tags = await execShellCmd(cmd);
  tags.forEach((t: string) => console.log(t));
  return tags;
};

export { run };
