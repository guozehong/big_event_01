$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value, item) {
            if (value.length > 6) {
                return "1~6之间"
            }
        }
    })
    //表单重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })
    // 修改用户信息
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改失败！')
                }
                layer.msg('恭喜您，用户信息修改成功！')
                window.parent.getUserInfo();
            }
        })
    })
})

// 2.用户渲染
initUserInfo();
let layer = layui.layer;
let form = layui.form;
function initUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            form.val('formUserInfo', res.data);
        }
    })
}