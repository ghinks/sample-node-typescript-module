import * as data from "../extractTags/index.spec.json";
import { __RewireAPI__ as otherAPIs, execShellCmd } from "./index";

describe("exec", () => {
  describe("Passing", () => {
    beforeEach(() => {
      otherAPIs.__Rewire__("exec", () => Promise.resolve(data));
    });
    afterEach(() => otherAPIs.__ResetDependency__("exec"));
    test("to get an answer", async () => {
      const cmd = "git ls-remote --tags git@github.com:expressjs/express.git";
      const result = await execShellCmd(cmd);
      expect(result.length).toBeGreaterThan(1);
    });
  });
  describe("Failing", () => {
    const mockConsoleError = jest.fn();
    const globConsErr = global.console.error;
    beforeEach(() => {
      global.console.error = mockConsoleError;
      otherAPIs.__Rewire__("exec", () =>
        Promise.reject("forced error on purpose really!")
      );
    });
    afterEach(() => {
      otherAPIs.__ResetDependency__("exec");
      global.console.error = globConsErr;
    });
    test("not to get an answer", async () => {
      const cmd = "git ls-remote --tags git@github.com:expressjs/express.git";
      const result: string[] = await execShellCmd(cmd);
      expect(result.length).toBe(0);
    });
  });
});
