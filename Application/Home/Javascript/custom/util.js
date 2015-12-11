/**
 * Created by Jimmy on 2015/10/21.
 */
define(['jquery'],function () {
    window.Hisihi = {};

    /*********************通用方法*****************************/

    /*
     *拓展Date方法。得到格式化的日期形式 基本是什么格式都支持
     *date.format('yyyy-MM-dd')，date.format('yyyy/MM/dd'),date.format('yyyy.MM.dd')
     *date.format('dd.MM.yy'), date.format('yyyy.dd.MM'), date.format('yyyy-MM-dd HH:mm')   等等都可以
     *使用方法 如下：
     *                       var date = new Date();
     *                       var todayFormat = date.format('yyyy-MM-dd'); //结果为2015-2-3
     *Parameters:
     *format - {string} 目标格式 类似('yyyy-MM-dd')
     *Returns - {string} 格式化后的日期 2015-2-3
     *
     */
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        }
        if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
        return format;
    };

    /*
     *拓展string的方法，去除两端空格
     */
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g,'');
    };

    Hisihi.getLocalTime = function (nS, format) {
        var daa = new Date(1230999938);
        return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
    };




    /******************添加手机号码验证*********************/
    Hisihi.addMobileValidity=function(){
        jQuery.validator.addMethod("isMobile", function(value, element) {
            var length = value.length;
            var mobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            return this.optional(element) || (length == 11 && mobile.test(value));
        }, "请正确填写您的手机号码");
    }

    /***********创建模态窗口**************/
    Hisihi.modelBox = function (options) {
        return (this instanceof Hisihi.modelBox) ? this.initialize(options) : new Hisihi.modelBox;
    };

    Hisihi.modelBox.prototype = {
        headLabel: '信息提示',
        btnType: ['关闭'],
        showMsg: '信息填写错误',
        boxWidth: '540px',
        boxHeight: '315px',
        $panel: null,
        showAtFirst: true,
        posInfo: null,

        //显示隐藏的回调
        stateChangeCallback: null,

        //按钮回调方法
        btnsCallback: null,

        //初始化回调方法
        initCallback: null,

        initialize: function (options) {
            $.extend(this, options);
            var str = this.createBoxContent();

            $('body').append(str);

            this.$panel = $('.cornerModelBoxBg:last');

            this.eventsInit(); //事件注册
            this.controlModelBoxW_H(); //窗口大小控制
            this.controModelBoxPosIfo();

            if (this.showAtFirst) {
                this.show();
            }
            else {
                this.hide(false);
            }
            this.initCallback && this.initCallback.call(this);
        },

        /*事件注册*/
        eventsInit: function () {
            var $box = this.$panel;
            var that = this;
            $box.on('click', '.cornerModelBoxClose', function () {
                that.hide();
            });
        },

        createBoxContent: function () {
            var mainConte = this.boxMainContentForAlert();
            var str = '<div class="cornerModelBoxBg">' +
                '<div class="cornerModelBox">' +
                '<div class="cornerModelBoxHead">' + this.headLabel + '</div>' +
                '<div class="cornerModelBoxClose" title="关闭">×</div>' +
                '<div class="cornerModelBoxMain">' + mainConte + '</div>' +
                '</div>';
            return str;
        },

        boxMainContentForAlert: function () {
            var str = '<div class="r2ModuleBoxMain">' +
                '<p>' + this.showMsg + '</p>' +
                '</div>' +
                '<div class="r2ModuleBoxBtns">' +
                '<div class="auditBtns">关闭</div>' +
                '</div>';
            return str;
        },


        /*显示模态窗口*/
        show: function (showMsg, type) {
            var that = this;
            var $container = this.$panel;
            $container.show();
        },

        /*
         *隐藏模态窗口
         *Parameters:
         *flag - {bool} 是否用回调
         */
        hide: function (flag) {
            this.$panel.hide();
            if (typeof flag == 'undefined') {
                flag = true;
            }
            if (flag) {
                this.closeBoxCallback && this.closeBoxCallback.call(this);
            }
        },

        /*控制模态窗口的大小样式*/
        controlModelBoxW_H: function () {
            var mainBox = this.$panel.find('.cornerModelBox');
            mainBox.css({'height': this.boxHeight, 'width': this.boxWidth});
        },

        /*控制模态窗口的位置样式*/
        controModelBoxPosIfo: function () {
            var mainBox = this.$panel.find('.cornerModelBox');
            if (!this.posInfo) {
                var ph = this.$panel.height(),
                    pw = this.$panel.width(),
                    mh = mainBox.height(),
                    mw = mainBox.width();
                this.posInfo = {
                    'top': (ph - mh) / 2 - 80,
                    'left': (pw - mw) / 2
                };
            }
            mainBox.css(this.posInfo);
        },

        OBJECT_NAME: 'Hisihi.modelBox'
    };

    /*
    *向本地localStorage中写入信息
    * para:
    * dictionary - {object} 键值对信息 {key：val}
    *
    * */
    Hisihi.writeInfoToStorage=function(dictionary){
        var storage = window.localStorage,
            info = storage.getItem(dictionary.key); //myToken
        storage.setItem(dictionary.key,dictionary.val); //'basic '+this.getBase64encode(data.token + ':')
    };

    /*
     * 读取本地localStorage中的信息
     * para:
     * keyName - {string} 键值 名称
     *
     * */
    Hisihi.getInfoFromStorage=function(key){
        var storage = window.localStorage,
            info = storage.getItem(key); //myToken
        if (info) {
            return info;
        }else{
            return false;
        }
    };

    /*
     * 读取本地localStorage中的   令牌信息查询
     * para:
     * keyName - {string} 键值 名称
     *
     * */
    Hisihi.getMyToken=function() {
        var token = Hisihi.getInfoFromStorage(window.localStorageOrgTokenName);
        if (!token) {
            window.location.href = window.urlObject.ctl + "/Index";  //跳转登录页面
        } else {
            return token;
        }
    };


    /*获得机构id*/
    Hisihi.getOrgId=function(){
        var data=Hisihi.getInfoFromStorage(window.localStorageOrgName);
        data=JSON.parse(data);
        return data.organization_id;
    },

    /*
    *通用异步请求方法
    *para:
    * url- {string} 请求地址 必须
    * dataStr,请求参数 必须,区分两种情况，
    * 1.post  - {json string}   严格标准的json字符串 '{"name":"mayday","pwd":"123456"}'
    * 2.get - {json object}  json {"name":"mayday","pwd":"123456"}
    * successCallback - {function} 请求成功回调方法 必须
    * options -{object} 可选参数
    */
    Hisihi.getDataAsync = function (url,dataStr,successCallback,options) {
        var that=this;
        for(var item in this.defaultOptions){
            var val=options[item];
            if(val===undefined){
                options[item]=this.defaultOptions[item];
            }
        }


        var loginXhr=$.ajax({
            url: url,
            type:options.type,
            data:dataStr,
            timeOut:options.timeOut,
            beforeSend:function(xhr){
                //将token加入到请求的头信息中
                if(options.needToken){
                    var token=Hisihi.getMyToken();
                    xhr.setRequestHeader('Authorization',token);  //设置头消息
                }
            },
            complete:function(xmlRequest,status){
                if(status=='success'){
                    successCallback(JSON.parse(xmlRequest.responseText));
                }
                //超时
                else if(status=='timeout'){
                    loginXhr.abort();
                    options.errorCallback('请求超时，请稍后重试');
                }
                else if(status=='error'){
                    var result=JSON.parse(xmlRequest.responseText),
                        str=that.errorCodeInfo(result.code);
                    if(result.code==1003){
                        if(window.confirm('令牌信息已经过期，请重新登录')){
                            window.location.href = window.urlObject.ctl + "/Index";  //跳转登录页面
                        }else{
                            options.errorCallback(str);
                        }
                    }else {
                        options.errorCallback(str);
                    }
                }
            }
        });
    };

    /*
    *Hisihi.getDataAsync 默认参数
    */
    Hisihi.getDataAsync.prototype={
        defaultOptions:(function(){
            return {
                type: 'post',
                timeOut: '10000',
                needToken:true,
                errorCallback:function(data) {
                    alert(data);
                }
            }
        })(),

        /*通用的错误码信息*/
        errorCodeInfo:function(code){
            var str='';
            switch (code){
                case 1001:{
                    str='查询结果为空';
                    break;
                }
                case 1003:{
                    str='令牌信息已经过期，请重新登录';
                    break;
                }
                case 1007:{
                    str='服务器内部错误';
                    break;
                }
                default:{
                    str='';
                    break;
                }
            }
            return str;
        },
    };



    /*
     *得到随机的整数
     *para
     * max - {num} 最大值
     * min - {num} 最小值 默认为0
     */
    Hisihi.getRandomNum = function (max, min) {
        if (!min) {
            min = 0;
        }
        var rand = max - min,
            num = (Math.random() * rand) + min;
        return Math.round(num);
    };

    /*
     *从时间戳 得到 时间
     * para
     * dateInfo - {num} 时间戳
     * dateFormat - {string} 时间格式 默认为'yyyy.MM.dd'
     */
    Hisihi.getTimeFromTimestamp = function (dateInfo, dateFormat) {
        if (!dateFormat) {
            dateFormat = 'yyyy.MM.dd';
        }
        return new Date(parseFloat(dateInfo) * 1000).format(dateFormat);
    };

    /*
     *字符串截取
     * para
     * str - {string} 目标字符串
     * len - {int} 最大长度
     */
    Hisihi.substrLongStr = function (str, len) {
        if (str.length > len) {
            str = str.substr(0, parseInt(len - 1)) + '……';
        }
        return str;
    };

    /*
     *文件上传
     */
    Hisihi.initUploadify = function ($object,callback,options) {
        var defaultPara={
            height: 32,
            width: 80,
            swf: window.urlObject.js + "/libs/uploadify/uploadify.swf",
            fileObjName: "download",
            buttonText: "上传图片",
            uploader: window.urlObject.apiUrl+'/file',
            fileDataName:'Filename',
            removeTimeout: 1,
            multi: false,
            fileSizeLimit : '1MB', //设置单个文件大小限制
            fileTypeExts: '*.jpg; *.png; *.gif;',
            queueID:'',
            overrideEvents : ['onDialogClose','onSelectError','onUploadProgress','onUploadError'],
            onSelectError:function(file, errorCode, errorMsg){
                Hisihi.uploadify_onSelectError.call(this,file, errorCode, errorMsg,options);
            },
            onUploadError:function(file, errorCode, errorMsg, errorString){
                Hisihi.uploadify_onUploadError.call(this,file, errorCode, errorMsg, errorString,options);
            },
            onFallback: function () {
                alert('未检测到兼容版本的Flash.');
            },
        };
        for(var item in options){
            var val=options[item];
            if(val){
                defaultPara[item]=val;
            }
        }
        defaultPara.onUploadSuccess=function(file, data){
            var data = $.parseJSON(data);
            callback(file,data);
        };
        $object.uploadify(defaultPara);
    };

    Hisihi.uploadify_onSelectError = function(file, errorCode, errorMsg,options) {
        var msgText = "上传失败,";
        switch (errorCode) {
            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                //this.queueData.errorMsg = "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                msgText += "每次最多上传 " + this.settings.queueSizeLimit + "个文件";
                break;
            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                msgText += "文件大小超过限制( " + this.settings.fileSizeLimit + " )";
                break;
            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                msgText += "文件大小为0";
                break;
            case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:
                msgText += "文件格式不正确，仅限 " + this.settings.fileTypeExts;
                break;
            default:
                msgText += "错误代码：" + errorCode + "\n" + errorMsg;
        }
        if(options.errorCallback) {
            options.errorCallback(msgText);
        }else{
            alert(msgText);
        }
    };

    Hisihi.uploadify_onUploadError=function(file, errorCode, errorMsg, errorString,options){
        if (errorCode == SWFUpload.UPLOAD_ERROR.FILE_CANCELLED
            || errorCode == SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED) {
            return;
        }
        var msgText = "上传失败,";
        switch (errorCode) {
            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                msgText += "HTTP 错误\n" + errorMsg;
                break;
            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                msgText += "上传文件丢失，请重新上传";
                break;
            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                msgText += "IO错误";
                break;
            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                msgText += "安全性错误\n" + errorMsg;
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                msgText += "每次最多上传 " + this.settings.uploadLimit + "个";
                break;
            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                msgText += errorMsg;
                break;
            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                msgText += "找不到指定文件，请重新操作";
                break;
            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                msgText += "参数错误";
                break;
            default:
                msgText += "文件:" + file.name + "\n错误码:" + errorCode + "\n"
                    + errorMsg + "\n" + errorString;
        }
        if(options.errorCallback) {
            options.errorCallback(msgText);
        }else{
            alert(msgText);
        }
    };

    (function ($) {
        /************************提示等待插件*************************/
        var CornerLoading = function ($element, options) {
            this.options = options;
            this.$element = $element;
            this.addLoadingToPage();
            this.$loadingBox = $element.find('.cornerLoadingBox');
        };
        CornerLoading.prototype = {

            /*添加等待图片到页面中*/
            addLoadingToPage: function () {
                var postion = this.$element.css('position');
                if (postion == 'static') {
                    this.$element.css('position', 'relative');
                }
                var str = '<div class="cornerLoadingBox">' +
                    '<div class="cornerLoadingItem cornerLoadingImg"></div>' +
                    '<div class="cornerLoadingItem cornerLoadingText">' + this.options.text + '</div>' +
                    '</div>';
                this.$element.append(str);
                this.$cornerLoadingBox = this.$element.find('.cornerLoadingBox');
                var left = (this.$element.width() - this.$cornerLoadingBox.width()) / 2,
                    top = (this.$element.height() - this.$cornerLoadingBox.height()) / 3;
                this.$cornerLoadingBox.css({'left': left, 'top': top});
                this.options.showAtFirst && this.showLoading();
            },

            showLoading: function () {
                this.$cornerLoadingBox.show();
            },
            hideLoading: function () {
                this.$cornerLoadingBox.hide();
            }
        };

        $.fn.cornerLoading = function (option) {
            if (this.length == 0) {
                return;
            }
            var args = Array.prototype.slice.call(arguments, 1);
            var innerReturn,
                defaultParas = {
                    text: '数据加载中，请稍后……',
                    showAtFirst: true,
                };
            this.each(function () {
                var $this = $(this),
                    data = $this.data('cornerLoading'),
                    options = typeof option == 'object' ? option : {};
                if (!data) {
                    $this.data('cornerLoading', data = new CornerLoading($(this), $.extend(defaultParas, options)))
                }
                if (typeof option == 'string' && typeof data[option] == 'function') {
                    innerReturn = data[option].call(data, args);
                }
            });
            if (innerReturn !== undefined) {
                return innerReturn;
            } else {
                return this;
            }
        };

        /************************提示等待插件 end*************************/


        /***************根据比例大小 计算图片的大小************/
        $.fn.setImgBox=function(){
            if (this.length == 0) {
                return;
            }
            var img=new Image();
            img.src=this[0].src;
            var height = img.height,
                width = img.width,
                mHeight=this.css('max-height'),
                mWidth=this.css('max-width');
            if (!mHeight || mHeight=='none') {
                mHeight = this.parent().height();
            }else{
                mHeight=mHeight.replace('px','');
            }
            if (!mWidth|| mWidth=='none') {
                mWidth = this.parent().width();
            }
            else{
                mWidth=mWidth.replace('px','');
            }
            var flag1 = height > mHeight;
            var flag2 = width > mWidth;
            var radio = 1;
            if (flag1 || flag2) {
                var radio1 = mHeight / height;
                var radio2 = mWidth / width;
                if (radio1 < radio2) {
                    height = mHeight;
                    width = width * radio1;
                    radio = radio1;
                } else {
                    width = mWidth;
                    height = height * radio2;
                    radio = radio2;
                }
            }
            this.css({'width':width+'px','height':height+'px','margin-top':(this.parent().height()-height)/2+'px'}).attr('data-radio',radio);
            return this;
        };


})(jQuery);


    /*
    *显示翻转板子 提示等待
    *para:
    * flag - {bool} 显示还是隐藏等待效果 默认为了隐藏
    */
    Hisihi.controlLoadingTips=function(flag){
        if(typeof flag == 'undefined' || flag) {
            $('#loadingDataLayout').addClass('active').show();
        }else{
            $('#loadingDataLayout').removeClass('active').hide();
        }
    };

});


