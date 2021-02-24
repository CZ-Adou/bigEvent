$(function() {
    var form = layui.form;
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    });

    initUserInfo();
    console.log(layer);
    // 获取用户基本信息
    function initUserInfo() {
        $.ajax({
            type: 'GET', 
            url: '/my/userinfo', 
            success(res) {
                // console.log(res);
                if (res.status !==0) {
                    return layer.msg('获取用户信息失败！');
                }
                console.log(res);
                form.val('formUserInfo', res.data);
            }
        })
    }

    $('#btnReset').on('click',function (e) {
          e.preventDefault();
          initUserInfo();
    });

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/updatepwd',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layui.layer.msg('更新密码失败！')
            }
            layui.layer.msg('更新密码成功！')
            // 重置表单
            $('.layui-form')[0].reset()
          }
        })
      })
  })