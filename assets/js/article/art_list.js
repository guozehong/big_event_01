$(function () {
    template.defaults.imports.dataFormat = function (dtStr) {
        let dt = new Date(dtStr)
        let y = dt.getFullYear()
        let m = padZero(dt.getMonth() + 1)
        let d = padZero(dt.getDate())

        let hh = padZero(dt.getHours())
        let mm = padZero(dt.getMinutes())
        let ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss;
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    let q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 2, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
    }
    let layer = layui.layer;

    //渲染文章列表
    initTable();
    function initTable() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败！')
                }
                let htmlStr = template('tpl-table', res);
                $('tbody').html(htmlStr)
                //调用分页
                renderPage(res.total);
            }
        })
    }

    // 3.初始化分类
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


    //4.筛选实现
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        let cate_id = $('[name=cate_id]').val();
        let state = $('[name=state]').val();
        q.cate_id = cate_id;
        q.state = state;
        console.log(cate_id, state);
        initTable();
    })

    //5.分页
    function renderPage(total) {
        var laypage = layui.laypage;
        //自定义排版

        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox', //注意，这里的 pageBox 是 ID，不用加 # 号
            count: total,//数据总数，服务器里拿
            limit: q.pagesize,//一页显示多少条
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                // console.log(obj);
                if (!first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;
                    initTable();
                }
            }
        });

    }

    //删除文章
    //删除
    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr("data-id");
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message)
                    }
                    console.log($('.btn-delete').length);
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) {
                        q.pagenum--;
                    }
                    initTable();
                    layer.msg('恭喜您，删除成功')

                }
            })
            layer.close(index);
        })
    });

})