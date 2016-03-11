# pandora-astros-map
pandora插件，astros项目页面索引

###启用

```
require('pandora-astros-map')(app);
```

### 配置
#### 项目信息
通过 project/config/site.js 设置(选填)：

```
des: {
    name: 'astro',
    wd:'kumaw,ringcrazy',
    product:'wheasy',
    developer:'aimar'
}
```
#### 页面信息
在路由文件顶部（如projectRoot/routes/login.js)增加以下内容

```
/**
 * @title: 用户登陆页
 * @ctime: 2015/10/09
 * @edittime: 2015/10/09
 * @ui: 彭倩
 * @ux: 刘倩茹
 * @wd: 万虎
 * @router: /user/login
 */
```

###访问
插件固定路由是`astros-map`

http://127.0.0.1:3300/astros-map