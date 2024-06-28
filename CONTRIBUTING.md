# 贡献指南

首先，感谢您对 Layui-Vue 的关注和贡献！我们欢迎所有的改进和建议。为了使您的贡献能够顺利地合并，请遵循以下指南。

## 目录结构

为了更好地理解项目结构，请参考以下目录说明：

- `docs`：官方文档
- `packages`：组件源码目录
  - `component`：`Layui-vue` 组件源码
  - `json-schema-form`：`json-schema-form` 组件源码
  - `icons`：图标源码
  - `layer`：`Layer-vue` 弹层源码
  - `layui`: `Layui-vue` publish目录
- `play`：组件本地调试目录

## 提交 PR 的步骤

1. **Fork 仓库**：在 Gitee 上 fork 本仓库 [Layui-vue](https://gitee.com/layui-vue/layui-vue) 到您的仓库。

2. **Clone 仓库**：将 fork 的仓库克隆到本地。
    ```bash
    git clone https://gitee.com/your-username/layui-vue.git
    cd layui-vue
    ```

3. **创建分支**：在 `2.x` 分支上创建一个新的分支用于您的开发。分支名推荐使用 `username/调整范围` 如 `Jevin/feat-button`
    ```bash
    git checkout -b your-feature-branch
    ```

4. **安装依赖**：确保您已安装必要的依赖。
    ```bash
    pnpm install
    ```

5. **本地开发**：在 `play` 目录下进行组件的本地调试和开发。

6. **提交更改**：请按照 [Conventional Commits 规范](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 提交您的更改。不符合提交规范的 PR 将不会被合并。
    ```bash
    git add .
    git commit -m "feat(button): 新增按钮组件"
    ```

7. **推送分支**：将您本地的分支推送到远程仓库。
    ```bash
    git push origin your-feature-branch
    ```

8. **创建 Pull Request**：在 Gitee [Layui-vue](https://gitee.com/layui-vue/layui-vue) 上创建一个新的 Pull Request，描述您的更改内容和目的。

## 提交规范

为了保持代码库的整洁和一致性，请遵循以下提交规范：

- **feat**：新功能
- **fix**：修补 bug
- **docs**：仅文档更改
- **style**：仅对组件样式进行调整
- **refactor**：重构（即不是新增功能，也不是修改 bug 的代码变动）
- **perf**：性能优化
- **test**：增加测试
- **chore**：构建过程或辅助工具的变动


## 最后

再次感谢您的贡献！如果在贡献过程中有任何疑问或需要帮助，请在 Gitee 上创建 issue，我们会尽快回复。

Happy coding!

Layui-Vue Team
