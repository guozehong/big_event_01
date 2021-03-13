//开发路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
//测试路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
//生产路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (options) {
    options.url = baseURL + options.url;
})