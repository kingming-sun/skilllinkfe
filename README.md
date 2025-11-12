# React 前端应用

这是一个使用 React + Vite 构建的现代化前端应用。

## 功能特性

- ✅ 现代化 UI/UX 设计
- ✅ 响应式布局
- ✅ 与 FastAPI 后端集成
- ✅ 完整的 CRUD 操作
- ✅ 实时状态更新

## 技术栈

- **React** - UI 库
- **Vite** - 构建工具
- **ES6+** - 现代 JavaScript

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 运行开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 3. 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录

### 4. 预览生产构建

```bash
npm run preview
```

## 项目结构

```
frontend/
├── src/
│   ├── App.jsx          # 主应用组件
│   ├── App.css          # 应用样式
│   ├── main.jsx         # 入口文件
│   └── index.css        # 全局样式
├── public/              # 静态资源
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置
├── package.json         # 依赖配置
└── README.md           # 项目文档
```

## 可用脚本

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run lint` - 运行代码检查

## 配置

### API 地址

API 地址配置在 `src/App.jsx` 中：

```javascript
const API_URL = 'http://localhost:8000'
```

### 代理配置

Vite 代理配置在 `vite.config.js` 中，用于开发环境的 API 代理。

## 开发建议

1. **状态管理**: 对于复杂应用，考虑使用 Redux 或 Zustand
2. **路由**: 添加 React Router 实现多页面应用
3. **UI 组件库**: 集成 Material-UI 或 Ant Design
4. **类型安全**: 迁移到 TypeScript
5. **测试**: 使用 Vitest 和 React Testing Library

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 扩展阅读

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [MDN Web 文档](https://developer.mozilla.org/)
