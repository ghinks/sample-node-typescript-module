import { expect } from "chai";
import { extractTagsFromGitString } from "./index";
import fs from "fs";
import path from "path";

describe("Extract git tags", () => {
  const fn: string = path.join(__dirname, "index.spec.json");
  const data: { stdout: string } = JSON.parse(fs.readFileSync(fn, "utf8"));
  const rowsOfTestData: string[] = data.stdout.split("\n");
  it("expect to get an array of strings", () => {
    const result = extractTagsFromGitString(rowsOfTestData);
    expect(result).to.be.an("Array");
    expect(result.length).to.be.greaterThan(1);
  });
});
