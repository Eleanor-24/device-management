# device-management
设备管理app只有前端部分代码，并非完整项目
读取设备识别码，并和用户的登录账号进行绑定，保存到数据库，更换	登录账户时更新到数据库中；封装数据请求，实现前后端数据交互；实现扫描二维	码，生成设备实时绑定信息。

#######开发环境和框架
hbuilderx
scss
uni-app


#######目录结构
├── Readme.md                   // help
├── api                         // 接口管理
├── common                      // 封装网络请求
├── components
│   ├── loginBtn               // 自定义按钮组件
│   ├── myInput                 //自定义input组件
│   ├── uni-icons                // 字体图标
├── js_sdk                        //二维码插件
├── pages
│   ├── login               // 登录和注册界面
│   ├── main                 //二维码显示解绑界面
├── unpackage
├── APP.vue
├── main.js
├──manifest.json
├──pages.json
└──uni.scss
