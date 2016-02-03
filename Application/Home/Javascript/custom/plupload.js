/**
 * Created by Jimmy on 2015/10/27.
 */
var uploader=new plupload.Uploader({
    browse_button:'browse',
    url:'http://localhost/upload/upload.php',
    flash_swf_url:window.urlObject.js+'/libs/plupload/Moxie.swf',
    silverlight_xap_url:window.urlObject.js+'/libs/plupload/Moxie.swf'
});
uploader.init();

uploader.bind('FileAdded', function (uploder,files){

});

uploader.bind('UploadProgress',function(uploader,file){
    console.log(file.loaded/file.size * 100);
});

uploader.bind('UploadComplete',function(uploader,file){
    alert('success');
});

document.getElementById('start_upload').onclick=function(){
    alert();
    uploader.start();
};

function getNumberInNormalDistribution(mean,std_dev){
    return mean+(randomNormalDistribution()*std_dev);
}

function randomNormalDistribution() {
    var u = 0.0, v = 0.0, w = 0.0, c = 0.0;
    do {
        //获得两个（-1,1）的独立随机变量
        u = Math.random() * 2 - 1.0;
        v = Math.random() * 2 - 1.0;
        w = u * u + v * v;
    } while (w == 0.0 || w >= 1.0)
    //这里就是 Box-Muller转换
    c = Math.sqrt((-2 * Math.log(w)) / w);
    //返回2个标准正态分布的随机数，封装进一个数组返回
    //当然，因为这个函数运行较快，也可以扔掉一个
    //return [u*c,v*c];
    return u * c;
}

var ss = getNumberInNormalDistribution(180,10);
console.log(ss);

$(function(){
    var temp=15000;

    /*对数函数修正*/
    function getLnMathNum(num){
        var n=Math.log(num+1)/Math.log(2.71828);
        return n;
    }
    $result=$('#result');
    for(var i=0;i<50; i++){
        var num=15*1000 - getLnMathNum(i)*2000;
        num=parseInt(num);
        $result.append('<p>'+i+'：' +num+'----'+(num-temp)+'</p>');
        temp=num;
    }
});

