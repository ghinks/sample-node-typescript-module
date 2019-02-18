import { exec as execCB } from "child_process";
import { promisify } from "util";
import { extractTagsFromGitString } from "../extractTags";
const exec = promisify(execCB);

const execShellCmd = async (cmd: string): Promise<string[]> => {
  try {
    const result: { stdout: string } = await exec(cmd, { maxBuffer: Infinity });
    const results: string[] = result.stdout.split("\n");
    const versions = extractTagsFromGitString(results);
    const orderedTags = versions.sort();
    return orderedTags;
  } catch (e) {
    console.error(e.message);
    return [];
  }
};

export { execShellCmd, extractTagsFromGitString };
