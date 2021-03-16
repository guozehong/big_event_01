$(function () {
    initArtCateList()
    //渲染文章类别管理界面
    function initArtCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                let str = template('tpl-art-cate', { data: res.data })
                $('tbody').html(str);
            }
        })
    }


    let layer = layui.layer;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html(),
        })
    })

    let indexAdd = null;
    let form = layui.form
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg("恭喜您，文章类别添加成功！")
                layer.close(indexAdd)
            }
        })
    })

    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html(),
        })

        let Id = $(this).attr("data-id");
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                console.log(res.data);
                form.val('form-edit', res.data)
            }
        })
    })

    //修改
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                initArtCateList();
                layer.msg("恭喜您，文章类别修改成功！", { icon: 6 })
                layer.close(indexEdit)
            }
        })
    })

    //删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr("data-id");
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    initArtCateList();
                    layer.msg('恭喜您，删除成功')
                }
            })
            layer.close(index);
        })
    });
})