const { execSync, spawnSync } = require("node:child_process");
const path = require("node:path");
const process = require("node:process");

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
      stagedFiles.map(file =>
        eslintFix(file).then(() => runGitAdd(file)),
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
function eslintFix(filePath) {
  return new Promise((resolve, reject) => {
    const eslint = spawnSync(
      "npx eslint",
      ["--fix", "--quiet", filePath],
      {
        stdio: "inherit",
        shell: true,
      },
    );

    if (eslint.status !== 0) {
      reject(new Error(`ESLint 修复失败: ${filePath}`));
    }
    else {
      resolve();
    }
  });
}

/**
 * 执行 `git add ` 将 `eslint --fix` 的文件推送至暂存区
 */
function runGitAdd(filePath) {
  spawnSync(
    "git",
    ["add", "--", path.normalize(filePath)],
    {
      stdio: "inherit",
      shell: true,
    },
  );
}

;(() => {
  const stagedFiles = getStagedFiles();
  if (stagedFiles.length) {
    processFilesWithESLint(stagedFiles);
  }
})();
