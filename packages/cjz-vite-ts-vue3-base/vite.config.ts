import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import legacy from '@vitejs/plugin-legacy'//兼容传统浏览器
import externalGlobals from 'rollup-plugin-external-globals' //cdn
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression' //gzip压缩
import html from 'vite-plugin-html' //html模板控制

// 解析绝对路径方法
const resolvePath = (p: string) => resolve(__dirname, p)

// 获取环境变量方法
const getEnvConfig = (mode) => require(resolvePath(`./src/config/${mode}.ts`))

export default defineConfig(async ({ command, mode }) => {
  const envConfig = await getEnvConfig(mode)
  return {
    plugins: [
      vue(),
      vueJsx(), //vue-jsx
      html({
        minify: true, // 开启最小化
        // 注入数据
        inject: {
          data: {
            title: envConfig.title,
          },
        },
      }),
      // gzip压缩
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
      //兼容传统浏览器
      // legacy({ targets: ['defaults', 'not IE 11'] })
    ],
    // 全局样式
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "./src/style/flex.less";`,
        },
      },
    },
    // 服务
    server: {
      open: true,
      port: 3006,
      // 代理配置
      proxy: {
        '/apis': {
          target: 'http://101.200.76.112/', //代理接口
          changeOrigin: true, //开启跨域
          rewrite: (path) => path.replace(/^\/apis/, ''), //替换路径
        },
      },
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
          drop_console: true, //取消console
        },
      },
      brotliSize: false, //打包时不计算包大小
      // rollup配置
      rollupOptions: {
        // 配置cdn
        external: ['vue'],
        plugins: [
          externalGlobals({
            vue: 'Vue',
          }),
        ],
        //静态资源文件夹
        assetsDir: 'static/img/',
        rollupOptions: {
          output: {
            chunkFileNames: 'static/js/[name]-[hash].js',
            entryFileNames: 'static/js/[name]-[hash].js',
            assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          },
        },
      },
    },
    resolve: {
      // 配置别名
      alias: {
        '@': resolvePath('./src'),
      },
    },
  }
})
