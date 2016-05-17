'use strict';

var filePlus = require('file-plus'),
    fs = require('fs'),
    path = require("path"),
    reg_note = /@(\S+):\s+(\S+)/g,
    mime = require('./cfg/mime');

module.exports = function(app) {

    var router = require('express').Router();
    //console.log(app);
    var cfg = app.get('$config');
    if (!cfg) {
        console.warn('pandora-map', 'app 未找到 $config 属性，请确认是否已绑定Pandora');
    }
    if (!cfg.routes) {
        console.warn('pandora-map', '请设置路由');
        return;
    }

    var mapCfg = cfg.siteMap || {};
    var des = mapCfg.des || null;
    // 在 router 上装备控制器与中间件
    router.get(mapCfg.route || '/astros-map', function(req, res) {
        var site_pages = [];
        var files = filePlus.getAllFilesSync(cfg.routes);
        // console.log(files);return
        if (files.length) {
            files.forEach(function(file){       
                var fileContent = fs.readFileSync(file,'utf8'); //同步读原图
                //console.log(fileContent);
                var site_page={},flag=false;
                fileContent.replace(reg_note,function(s,k,v){
                    site_page[k] = v.split(',');
                    flag = true;
                });
                if(flag){
                    //console.log("1____________"+site_page['router']);
                    site_page['url'] = site_page['router'][0];
                    site_pages.push(site_page);
                }         
            });
        }

        let printList = {
            des:des,
            list:site_pages
        }
        res.setHeader("Content-Type", 'text/html');
        res.end(getTpl('map')(printList));
        
    });

    router.get('/__assets/*', /*A, B, C,*/ function(req, res) {
        //console.log(req.params[0]);
        var filePath = path.join(__dirname,'assets',req.params[0]);
        let ext = path.extname(filePath);
        ext = ext ? ext.slice(1) : 'unknown';
        let contentType = mime[ext] || "text/plain";
        /*console.log(ext);
        console.log(contentType);*/
        res.setHeader("Content-Type", contentType);
        require('fs').readFile(filePath, function(err, data) {
            if (err) {
                console.log('500 ', req.url);
                data = JSON.stringify(err)
            } else {
                console.log('200 ', req.url);
            }
            res.end(data);
        })
        
    });

    app.use(router);
}

let tplDir = path.join(__dirname, 'template');
function getTpl(name) {
    try {
        return require('./lib/arttemplate').render(fs.readFileSync(path.join(tplDir, name + '.html'), 'utf8'))
    } catch (err) {
        console.error(err);
        return function(a) {
            return a
        }
    }
}