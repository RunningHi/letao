//测试代码
$(function() {
  // $('button[type=submit]').click(function (event) {
  //     event.preventDefault();
  //     console.log("hha");
  //  })

  $("form")
    .bootstrapValidator({
      feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
      },
      fields: {
        username: {
          validators: {
            //非空
            notEmpty: {
              message: "用户名不能为空"
            },
            //长度校验
            stringLength: {
              min: 6,
              max: 30,
              message: "用户名长度必须在6到30之间"
            },
            callback: {
              message: "用户名不存在"
            }
          }
        },
        password: {
          validators: {
            notEmpty: {
              message: "密码不能为空"
            },
            //长度校验
            stringLength: {
              min: 6,
              max: 30,
              message: "密码长度必须在6到30之间"
            },
            callback: {
              message: "密码错误"
            }
          }
        }
      }
    })
    .on("success.form.bv", function(e) {
      e.preventDefault();
      console.log("你点我啦");
      // 增加进度条开启代码
      //开启进度条
      NProgress.start();
      // ajax 提交数据
      $.ajax({
        url: "/employee/employeeLogin",
        data: $("form").serialize(),
        type: "post",
        success: function(backData) {
          console.log(backData);
          // 正确
          if (backData.success == true) {
            window.location.href = "./index.html";
          } else {
            // 获取验证插件对象
            var validator = $("form").data("bootstrapValidator"); //获取表单校验实例
            // 失败
            if (backData.error == 1000) {
              // console.log('用户名不存在')
              //使用表单校验实例可以调用一些常用的方法。
              validator.updateStatus("username", "INVALID", "callback");
            } else if (backData.error == 1001) {
              // console.log('密码错误');
              //使用表单校验实例可以调用一些常用的方法。
              validator.updateStatus("password", "INVALID", "callback");
            }
          }

          setTimeout(function() {
            // 收起进度条
            NProgress.done();
          }, 1000);
        }
      });
    });

  // 3.为重置表单绑定点击事件
  $("button[type=reset]").click(function() {
    //获取验证插件对象
    var validator = $("form").data("bootstrapValidator"); //获取表单校验实例
    //重置表单
    validator.resetForm();
  });

  // 4.测试进度条

  //关闭进度条
  setTimeout(function() {}, 2000);
});
