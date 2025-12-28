# Vue3-big-event-admin

这是一个基于 Vue 3 + Vite 的后台管理示例项目（事件管理面板）。本仓库包含页面、路由、状态管理和简单的文章管理功能，适合作为学习或二次开发的起点。

## 特性
- Vue 3 + Composition API + Element Plus
- Vite 开发构建
- 简单的状态管理（pinia /  store）
- 文章管理、频道选择、用户资料与密码修改示例

## 本地开发

先安装依赖：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

本地访问 http://localhost:5173（Vite 默认端口）。

## 生产构建

```bash
pnpm build
```

构建结果输出至 `dist/`。

## 代码风格与检查

项目集成了 ESLint 与 Prettier（如已启用），运行：

```bash
pnpm lint
pnpm format
```

如果第一次提交时遇到 pre-commit 钩子阻止，可以暂时绕过：

```bash
git commit -m "msg" --no-verify
```

## 部署（GitHub Pages）

本仓库已包含 GitHub Actions 工作流：在 `main` 分支 push 时会自动运行 `pnpm install`、`pnpm build` 并部署到 GitHub Pages（Actions 使用官方 Pages action）。

注意：如果你希望站点在 `https://<user>.github.io/<repo>/` 下正确访问，请在 `vite.config.js` 中设置 `base: '/<repo>/'`。

## 常见 CI 命令

在远程仓库（GitHub）上首次 push 后可在 `Actions` 页面查看构建与部署日志。


## 联系


项目目录示例：

- `src/` 源代码
- `public/` 静态资源


