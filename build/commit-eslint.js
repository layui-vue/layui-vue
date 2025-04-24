const { execSync, spawn } = require("node:child_process");
const process = require("node:process");
const { consola } = require("consola");

/**
 * 获取 `暂存区` 所有文件（过滤以删除的文件）
 */
function getStagedFiles() {
  try {
    const output = execSync(
      "git diff --diff-filter=d --cached --name-only -z",
      { shell: true },
    );

    // 用 \0 分割并过滤空值
    return output
      .toString("utf8")
      .split("\0")
      .filter(file => file.trim() !== "");
  }
  catch {
    return [];
  }
}

async function processFilesWithESLint(stagedFiles) {
  try {
    const results = await Promise.allSettled(
      stagedFiles.map((file, index) =>
        eslintFix(file, stagedFiles.length, index + 1),
      ),
    );

    // 处理错误结果
    const errors = results.filter(r => r.status === "rejected");
    if (errors.length > 0) {
      process.exit(1);
    }
  }
  catch (error) {
    console.error("\x1B[31m处理过程中断：\x1B[0m", error);
    process.exit(1);
  }
}

/**
 * 执行 ESLint 修复单个文件
 */
function eslintFix(filePath, length, index) {
  return new Promise((resolve, reject) => {
    consola.start(`[${index}/${length}] Eslint Formatting... [filePath: ${filePath}] `);

    // 使用异步的 spawn
    const eslintProcess = spawn(
      "npx eslint",
      ["--fix", "--quiet", filePath],
      { shell: true, stdio: "inherit" }, // stdio: 'inherit' 直接输出到控制台
    );

    eslintProcess.on("close", (code) => {
      if (code === 0) {
        consola.success(`[${index}/${length}] Eslint Format successfully! [filePath: ${filePath}]`);
        resolve();
      }
      else {
        consola.error(`[${index}/${length}] Eslint Format failed! [filePath: ${filePath}]`);
        reject(new Error(`ESLint 修复失败: ${filePath}`));
      }
    });

    eslintProcess.on("error", (error) => {
      consola.error(`[${index}/${length}] Eslint Execution Error! [filePath: ${filePath}]`);
      reject(error);
    });
  });
}

;(() => {
  const stagedFiles = getStagedFiles();
  if (stagedFiles.length) {
    processFilesWithESLint(stagedFiles);
  }
})();
