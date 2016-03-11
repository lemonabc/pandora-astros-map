$(function() {
    var domCodes = $('.view-code'),
        domQrCodes = $('.qrcode'),
        domPersonList = $('.person-list'),
        domTime = $('.time'),
        domDialog = $('.dialog'),
        domClosed = $('.closed');

        domCodes.click(function(){
            var ele = $(this);
            var url = ele.attr('data-url');
            var hostObj = getUrlHost();
                url= 'http://'+hostObj.host+url;
                console.log(url);
            $.ajax({
                url: url,
                type: 'GET',
                success: function (ResultData) {
                    console.log(ResultData);
                    if(ResultData){
                        $('.d-content',domDialog).val(ResultData);
                        domDialog.show();
                    }
                },
                error: function (xhr) {
                    
                }
            });
        });

        domClosed.on('click',function(){
            domDialog.hide();
        });

        domQrCodes.each(function(){
            var ele = $(this);
            var url = ele.attr('data-url'),
                color = ele.attr('data-color'),
                foreground = '#777777';
            var hostObj = getUrlHost();
                url= 'http://'+hostObj.host+url;
            //console.log(url);
            var domCode = $('.code',ele);
            domCode.qrcode({
                text: url,
                render: "canvas", //设置渲染方式  
                width: 100, //设置宽度  
                height: 100, //设置高度  
                correctLevel: 0, //纠错等级  
                background: "#ffffff", //背景颜色  
                foreground: foreground //前景颜色 
            });
            ele.on({
                mouseover: function(){
                    domCode.show();
                },
                mouseout: function(){
                    domCode.hide();
                }
            });
        });

        domPersonList.on({
            mouseover: function(){
                var ele = $(this);
                $('.members',ele).show();
            },
            mouseout: function(){
                var ele =this;
                $('.members',ele).hide();
            }
        });

        domTime.on({
            mouseover: function(){
                var ele =$(this);
                $('.updata',ele).show();
            },
            mouseout: function(){
                var ele =this;
                $('.updata',ele).hide();
            }
        });
        /**
         * 根据URL返回host
         * @param  {String} path 源URL字符串
         * @return {String}      URL的HOST部分
         */
        function getUrlHost(path) {
            var a = document.createElement("a"),
                host;
            a.href = path;
            var m = a.href.match(/(?:https?\:)?(?:\/\/)?([a-z,A-Z.,\-,0-9]+)(?:\:(\d+)?)?/)
            host = {
                hostname: m[1] || a.hostname,
                host: (m[1] + (m[2] ? ':' + m[2] : '')) || a.host
            };
            a = null;
            return host;
        }
});