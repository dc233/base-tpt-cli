# Vue 3 + Typescript + Vite的起步项目

### 主要装配

- Vuex —— 状态管理
- Vue-Router —— 路由
- prettier —— 代码格式美化 （vscode安装插件prettier）
- axios —— 网络请求
- less —— 预处理器
- autoprefixer —— postcss插件

### vite插件配置

- vite-plugin-compression —— gzip压缩
- vite-plugin-html —— html模板
- rollup-plugin-external-globals —— cdn
- @vitejs/plugin-vue-jsx —— vue-jsx
- *@vitejs/plugin-legacy* —— 兼容传统浏览器

### vite基本配置

```js
{
    base: './',
    plugins: [
      vue(),
      vueJsx(), //vue-jsx
      //html模板控制
      html({
        minify: true, // 开启最小化
        // 注入数据
        inject: {
          data: {
            title: envConfig.title
          }
        }
      }),
      // gzip压缩
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
      //兼容传统浏览器
      // legacy({ targets: ['defaults', 'not IE 11'] })
    ],
    // 全局样式
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "./src/style/flex.less";`
        }
      }
    },
    // 服务
    server: {
      open: true,
      port: 3003,
      // 代理配置
      proxy: {
        '/apis': {
          target: 'http://101.200.76.112/', //代理接口
          changeOrigin: true, //开启跨域
          rewrite: (path) => path.replace(/^\/apis/, '') //替换路径
        }
      }
    },
    // 打包
    build: {
      // 打包后目录,默认dist
      outDir: 'dist',
      // 拆分css文件
      cssCodeSplit: false,
      minify: 'terser', // 混淆器，terser构建后文件体积更小
      // terser配置
      terserOptions: {
        // 压缩
        compress: {
          keep_infinity: true, //保持infinity
          drop_console: true //取消console
        }
      },
      brotliSize: false, //打包时不计算包大小
      // rollup配置
      rollupOptions: {
        // 配置cdn
        external: ['vue'],
        plugins: [
          externalGlobals({
            vue: 'Vue'
          })
        ],
        //静态资源文件夹
        assetsDir: 'static/img/',
        rollupOptions: {
          output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
          }
        }
      }
    },
    resolve: {
      // 配置别名
      alias: {
        '@': resolvePath('./src/')
      }
    }
  }
```



## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
