import { expect } from "chai";
import * as data from "../extractTags/index.spec.json";
import { __RewireAPI__ as otherAPIs, execShellCmd } from "./index";

describe("exec", () => {
  describe("Passing", () => {
    before(() => {
      otherAPIs.__Rewire__("exec", () => Promise.resolve(data));
    });
    after(() => otherAPIs.__ResetDependency__("exec"));
    it("to get an answer", async () => {
      const cmd = "git ls-remote --tags git@github.com:expressjs/express.git";
      expect(await execShellCmd(cmd)).to.be.an("Array");
    });
  });
  describe("Failing", () => {
    before(() => {
      otherAPIs.__Rewire__("exec", () => Promise.reject("forced error"));
    });
    after(() => otherAPIs.__ResetDependency__("exec"));
    it("not to get an answer", async () => {
      const cmd = "git ls-remote --tags git@github.com:expressjs/express.git";
      const result: string[] = await execShellCmd(cmd);
      expect(result).to.be.an("Array");
      expect(result.length).to.be.equal(0);
    });
  });
});
