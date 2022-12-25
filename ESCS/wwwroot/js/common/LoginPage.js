var _btnRecoverPass = new ButtonService("btnRecoverPass");
var _service = new Service();
$(document).ready(function () {
    _btnRecoverPass.click(function () {
        $("#validate-recover-pass-username").html("");
        $("#validate-recover-pass-captcha").html("");
        var username = $("form[name='frmRecoverPass'] input[name='username']").val();
        var captcha = $("form[name='frmRecoverPass'] input[name='captcha']").val();
        var check = true;
        if (username === undefined || username === null || username.trim() === "") {
            $("#validate-recover-pass-username").html("Bạn chưa nhập tài khoản");
            check = false;
        }
        if (captcha === undefined || captcha === null || captcha.trim() === "") {
            $("#validate-recover-pass-captcha").html("Bạn chưa nhập captcha");
            check = false;
        }
        if (check) {
            _service.postDataObject("/home/recoverpass", { username: username, captcha: captcha }).then(res => {
                $("#img-captcha-recover-pass").attr("src", "/Home/CaptchaRecoverPass?timestamp=" + new Date().getTime());
                $("form[name='frmRecoverPass'] input[name='captcha']").val("");
                if (res.state_info.status !== "OK") {
                    if (res.state_info.message_code!=="500") {
                        var arr = res.state_info.message_code.split('.');
                        $("#" + arr[0]).html(res.state_info.message_body);
                        return;
                    }
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("form[name='frmRecoverPass'] input[name='username']").val("");
                $("#recoverform").slideUp();
                $("#recoverformSuccess").fadeIn();
            });
        }
    });
    var url_logo = $("#loginpage-logo").attr("src");
    ESUtil.checkLoadImage(url_logo, null, () => {
        $("#loginpage-logo").attr("src", "/images/logo-icon.png");
    });
});