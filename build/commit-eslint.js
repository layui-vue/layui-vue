const { execSync, spawnSync } = require('node:child_process')
const path = require('node:path')
const process = require('node:process')

function getStagedFiles() {
  try {
    const output = execSync(
      'git diff --cached --name-only -z',
      {
        shell: true,
      },
    )

    // 用 \0 分割并过滤空值
    return output
      .toString('utf8')
      .split('\0')
      .filter(file => file.trim() !== '')
  }
  catch {
    return []
  }
}

async function processFilesWithESLint(stagedFiles) {
  try {
    // 并行处理（控制并发）
    const results = await Promise.allSettled(
      stagedFiles.map(file =>
        eslintFix(file).then(() => runGitAdd(file)),
      ),
    )

    // 处理错误结果
    const errors = results.filter(r => r.status === 'rejected')
    if (errors.length > 0) {
      console.error('\x1B[31mESLint 校验未通过：\x1B[0m')
      errors.forEach((e, i) => console.error(`${i + 1}. ${e.reason}`))
      process.exit(1) // 退出码非零阻止提交
    }
  }
  catch (error) {
    console.error('\x1B[31m处理过程中断：\x1B[0m', error)
    process.exit(1)
  }
}

/**
 * 执行 ESLint 修复单个文件
 */
function eslintFix(filePath) {
  return new Promise((resolve, reject) => {
    const eslint = spawnSync(
      'npx eslint',
      ['--fix', filePath],
      {
        stdio: 'inherit',
        shell: true,
      },
    )

    if (eslint.status !== 0) {
      reject(new Error(`ESLint 修复失败: ${filePath}`))
    }
    else {
      resolve()
    }
  })
}

/**
 * 执行 `git add ` 将 `eslint --fix` 的文件推送至暂存区
 */
function runGitAdd(filePath) {
  spawnSync(
    'git',
    ['add', '--', path.normalize(filePath)],
    {
      stdio: 'inherit',
      shell: true,
    },
  )
}

;(() => {
  const stagedFiles = getStagedFiles()
  if (stagedFiles.length) {
    processFilesWithESLint(stagedFiles)
  }
})()
