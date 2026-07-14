# 通用后台管理系统

基于 React 的通用后台管理系统，提供用户管理、商品管理、数据可视化等常见后台功能模块，适合作为企业级后台管理系统的起步模板。

## 技术栈

| 技术 | 说明 |
|------|------|
| React 19 | 前端框架 |
| React Router 6 | 路由管理 |
| Redux Toolkit | 状态管理 |
| Ant Design 6 | UI 组件库 |
| ECharts 6 | 数据可视化图表 |
| Axios | HTTP 请求 |
| MockJS | 模拟接口数据 |

## 功能模块

- **登录/权限管理** — 用户登录、路由鉴权守卫
- **首页仪表盘** — ECharts 数据可视化展示
- **用户管理** — 用户列表、新增、编辑、删除
- **商品管理** — 商品列表、新增、编辑、删除
- **通用布局** — 可折叠侧边栏、顶部导航、标签页导航

## 项目结构

```
src/
├── api/                # API 接口层
│   ├── axios.js        # Axios 实例封装
│   ├── index.js        # 接口定义
│   ├── mock.js         # Mock 数据入口
│   └── mockServeData/  # Mock 数据文件
├── assets/             # 静态资源
├── components/         # 公共组件
│   ├── commonAside/    # 侧边栏组件
│   ├── commonHeader/   # 顶部栏组件
│   ├── commonTag/      # 标签页组件
│   └── Echarts/        # 图表组件
├── config/             # 配置文件
├── pages/              # 页面组件
│   ├── home/           # 首页仪表盘
│   ├── login/          # 登录页
│   ├── mall/           # 商品管理
│   ├── user/           # 用户管理
│   ├── other/          # 其他页面
│   └── main.js         # 主布局
├── router/             # 路由配置
├── store/              # Redux 状态管理
├── App.js              # 根组件
└── index.js            # 应用入口
```

## 快速开始

### 环境要求

- Node.js >= 16
- npm >= 8

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

浏览器访问 [http://localhost:3000](http://localhost:3000) 即可查看。

> 项目已内置 Mock 数据，无需后端即可体验全部功能。

### 生产构建

```bash
npm run build
```

构建产物输出到 `build/` 目录，可直接部署至任意静态服务器。

## 登录账号

| 角色 | 用户名 | 密码 |
|------|--------|------|
| 管理员 | admin | admin |

## License

MIT
