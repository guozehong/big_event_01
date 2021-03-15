$(function () {
    getUserInof();
    //退出功能
    let layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function (index) {
            //清空loken信息
            localStorage.removeItem('token');
            //跳转到login界面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})
//获取用户信息（封装到入口函数的外面）
// 原因：后面其他的页面要调用。
function getUserInof() {
    //发送ajax
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ''
        // },
        data: {},
        success: (res) => {
            if (res.status == 0) {
                renderAvatar(res.data)
            }
        }
    })
}

// 用户界面渲染封装
function renderAvatar(user) {
    let name = user.nickname || user.username;
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpCase());
    } else {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
        $('#welcome').html(`欢迎&nbsp&nbsp${name}`)
    }
}


