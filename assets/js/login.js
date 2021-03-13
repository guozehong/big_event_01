$(function () {
    $('#link_reg').on('click', function () {
        //点击登录模块a链接 登录模块隐藏，注册模块显示
        $('.login-box').hide();
        $('.reg-box').show();
    })
    $('#link_login').on('click', function () {
        //点击注册模块a链接 注册模块隐藏，登录模块显示
        $('.reg-box').hide();
        $('.login-box').show();
    })

    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value, item) {
            if (value != $('.reg-box input[name=password]').val()) {
                return "两次密码输入不一致！";
            }
        }
    })
    let layer = layui.layer;
    //注册表单事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box input[name=username]').val(),
                password: $('.reg-box input[name=password]').val()
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                // 手动切换到登录界面
                $('#link_login').click();
                // 重置form表单
                $('#form_reg')[0].reset();

            }
        })
    })
    //登录表单事件
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 });
                //提示信息，保存token， 跳转页面
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }
        })
    })
})