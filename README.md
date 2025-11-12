# SkillLink 前端

基于 React + Vite 的现代化单页应用

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
```

## 📁 项目结构

```
frontend/src/
├── api.js                # API 接口封装
├── AuthContext.jsx       # 认证上下文
├── App.jsx              # 主应用组件
├── App.css              # 全局样式
├── main.jsx             # 入口文件
├── components/          # 共享组件
│   ├── Header.jsx       # 导航栏
│   └── Header.css
└── pages/               # 页面组件
    ├── Home.jsx         # 首页
    ├── SkillList.jsx    # 技能列表
    ├── SkillDetail.jsx  # 技能详情
    ├── Login.jsx        # 登录
    ├── Register.jsx     # 注册
    ├── MyOrders.jsx     # 我的订单
    ├── MySkills.jsx     # 我的技能
    ├── CreateSkill.jsx  # 发布技能
    └── Profile.jsx      # 个人中心
```

## 🎨 主要功能

### 公开页面
- 首页（搜索、分类、推荐）
- 技能列表（筛选、搜索）
- 技能详情（查看、预约）
- 登录/注册

### 需要登录
- 我的订单
- 个人中心

### 服务提供者专属
- 我的技能
- 发布技能

## 🔐 认证

使用 Context API 管理用户状态：
- `AuthContext` 提供用户信息和认证方法
- `ProtectedRoute` 保护需要登录的路由
- `ProviderRoute` 保护服务提供者路由

## 🌐 API 集成

所有 API 调用封装在 `api.js` 中：
- 自动添加认证 token
- 统一错误处理
- 拦截器处理响应

## 🎨 样式

每个页面组件都有对应的 CSS 文件，采用 BEM 命名规范。

全局样式在 `App.css` 和 `index.css`。

## 📦 依赖

主要依赖：
- react
- react-dom
- react-router-dom
- axios
- vite

## 🔧 配置

### Vite 配置

`vite.config.js` 配置了：
- 开发服务器端口（3000）
- API 代理（代理到后端 8000 端口）

## 🚀 部署

### 构建

```bash
npm run build
```

### 预览

```bash
npm run preview
```

构建产物在 `dist/` 目录，可以部署到任何静态服务器。

## 📝 开发指南

### 添加新页面

1. 在 `src/pages/` 创建组件
2. 创建对应的 CSS 文件
3. 在 `App.jsx` 添加路由

### 调用 API

```javascript
import { skillAPI } from './api';

// 获取技能列表
const skills = await skillAPI.getSkills({ category: 'sports' });
```

### 使用认证

```javascript
import { useAuth } from './AuthContext';

function MyComponent() {
  const { user, logout, isProvider } = useAuth();
  
  // 使用用户信息
}
```

## 🐛 调试

- 开发模式会显示详细错误信息
- 使用浏览器开发者工具
- 检查网络请求

## 📚 学习资源

- [React 文档](https://react.dev/)
- [Vite 文档](https://vitejs.dev/)
- [React Router 文档](https://reactrouter.com/)
