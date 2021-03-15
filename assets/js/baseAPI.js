//开发路径
let baseURL = 'http://api-breakingnews-web.itheima.net';
//测试路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
//生产路径
// let baseURL = 'http://api-breakingnews-web.itheima.net';
$.ajaxPrefilter(function (options) {
    console.log(options);
    options.url = baseURL + options.url;
    if (options.url.indexOf('/my/') != -1) {
        //身份认证
        options.headers = {
            Authorization: localStorage.getItem("token") || '',
        }
        //登录拦截
        options.complete = function (res) {
            console.log(res.responseJSON);
            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == "身份认证失败！") {
                localStorage.removeItem('token');
                location.href = '/login.html'
            }
        }
    }
})