/**
 * Created by airbreak on 2016/4/14.
 */
require.config({
    baseUrl:window.urlObj.js,
    paths: {
        $:'libs/zepto.min',
        prefix:'libs/prefixfree.min',
        fx:'libs/fx',
        tips:'custom/tips/tips',
        mytips:'custom/tips/mytips'
    },
    shim: {
        $: {
            exports: '$'
        },
        fx: {
            deps: ['$'],
            exports: 'fx'
        },
        prefix: {
            exports: 'prefix'
        },
    }
});

requirejs(['mytips','prefix'],function(){

});