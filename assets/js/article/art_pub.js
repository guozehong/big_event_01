$(function () {
    // 3.初始化分类
    let layer = layui.layer;
    let form = layui.form;
    initCate();
    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                let htmlStr = template('tpl-cate', res);
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    // 初始化富文本编辑器
    initEditor();

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    // 4.点击按钮，选择图片
    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })

    // 同步图片
    $('#coverFile').on('change', function (e) {
        // 获取到文件的列表数组
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
            return layer.msg('您可以选择一张图片作为封面')
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    // 设置状态
    let state = '已发布';
    $('#btnSave2').on('click', function () {
        state = "草稿";
    })

    // 发布文章
    $('#form-pub').on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 创建对线
        let fd = new FormData(this);
        // 放入状态
        fd.append('state', state);
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                console.log(...fd);
                // 6. 发起 ajax 数据请求
                publishArticle(fd);
            })
    })

    //封装，添加文章方法
    function publishArticle(fd) {
        $.ajax({
            type: 'POST',
            url: '/my/article/add',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.msg("恭喜您，文章发布成功");
                location.href = '/article/art_list.html'
            }
        })
    }


})