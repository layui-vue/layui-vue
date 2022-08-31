### 项目结构

package -> component 组件源码

package -> document-component 组件文档

package -> document-layer 弹层文档

package -> icons 图标源码

package -> layer 弹层源码

### 分支说明

master: 稳定的发行代码

next: 含有新特性的开发代码

### 启动项目

使用 git clone 拉取代码

```
https://gitee.com/layui/layui-vue.git
```

切换到你要修改和开发的分支, 如 next。

```
git checkout next
```

注意: 环境要求不低于 node 16, 并且依赖 pnpm 包管理工具


下载 pnpm 包管理工具

```
npm install pnpm -g
```

完成后, 在项目根目录执行 `pnpm install` 安装依赖。

```
pnpm install
```

然后运行项目

```
npm run dev
```

启动成功后，访问 http://127.0.0.1:3000