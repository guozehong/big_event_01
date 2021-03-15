$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //选择文件
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })
    //修改图片
    let layer = layui.layer;
    $('#file').on('change', function (e) {
        let file = e.target.files[0]
        //前端非空校验
        if (file == undefined) {
            return layer.msg('请选择图片！')
        }
        //根据选择的文件创建一个临时的地址
        let newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)

    })
    $('#btnUpload').on('click', function () {
        let dataURL = $image
            .cropper('getCroppedCanvas', {//创建一个Canvas
                width: 100,
                height: 100
            })
            .toDataURL('image/png')
        console.log(dataURL);
        $.ajax({
            type: 'post',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您，更换头像成功');
                window.parent.getUserInfo();
            }
        })
    })
})