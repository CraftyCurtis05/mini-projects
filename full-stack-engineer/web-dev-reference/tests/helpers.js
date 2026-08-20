import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

export function loadScript(relativePath) {
  const filename = path.resolve(process.cwd(), relativePath);
  const source = fs.readFileSync(filename, "utf8");
  vm.runInThisContext(source, { filename });
}
