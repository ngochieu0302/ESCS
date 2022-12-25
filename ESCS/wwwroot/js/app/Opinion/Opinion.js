var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var _opinionService = new OpinionService();
var _frmSaveOpinion = new FormService('frmSaveOpinion');
var setStep = "";

function randomNum() {
    "use strict";
    return Math.floor(Math.random() * 9) + 1;
}
function page404() {
    let loop1, loop2, loop3, time = 30, i = 0, number, selector3 = document.querySelector('.thirdDigit'), selector2 = document.querySelector('.secondDigit'),
        selector1 = document.querySelector('.firstDigit');
    loop3 = setInterval(function () {
        "use strict";
        if (i > 40) {
            clearInterval(loop3);
            selector3.textContent = 4;
        } else {
            selector3.textContent = randomNum();
            i++;
        }
    }, time);
    loop2 = setInterval(function () {
        "use strict";
        if (i > 80) {
            clearInterval(loop2);
            selector2.textContent = 0;
        } else {
            selector2.textContent = randomNum();
            i++;
        }
    }, time);
    loop1 = setInterval(function () {
        "use strict";
        if (i > 100) {
            clearInterval(loop1);
            selector1.textContent = 4;
        } else {
            selector1.textContent = randomNum();
            i++;
        }
    }, time);
}

function hienThi(step) {
    setStep = step;
    $('#y_kien').addClass("d-none");
    $('#trang_chu').addClass("d-none");
    $('#page404').addClass("d-none");
    $('#device_detect').addClass("d-none");
    if (step == 'page404') {
        page404();
    }
    $('#' + step).removeClass("d-none");
}

$(document).ready(function () {
    var hashcode = $("#hashcode").val();
    _opinionService.getInfoFromHashCode({ hashcode: hashcode }).then(res => {
        if (res.state_info.status !== "OK") {
            hienThi("page404");
            return;
        }
        objDanhMuc.tt_y_kien = res.data_info.firstOrDefault();
        if (objDanhMuc.tt_y_kien == null || objDanhMuc.tt_y_kien == undefined || objDanhMuc.tt_y_kien.length <= 0) {
            hienThi("page404");
            return;
        }
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        if (!device) {
            hienThi("device_detect");
            return;
        } else {
            hienThi("trang_chu");
        }
    });

    $(".accordion-title").click(function (e) {
        var accordionitem = $(this).attr("data-tab");
        $("#" + accordionitem).slideToggle().parent().siblings().find(".accordion-content").slideUp();

        $(this).toggleClass("active-title");
        $("#" + accordionitem).parent().siblings().find(".accordion-title").removeClass("active-title");

        $("i.fa-chevron-down", this).toggleClass("chevron-top");
        $("#" + accordionitem).parent().siblings().find(".accordion-title i.fa-chevron-down").removeClass("chevron-top");
    });

    $("#btnChoYKien").click(function () {
        _frmSaveOpinion.resetForm();
        _frmSaveOpinion.clearErrorMessage();
        _frmSaveOpinion.getControlById("ten_nsd_xin_yk").val(objDanhMuc.tt_y_kien.ten_nsd_xin_yk);
        _frmSaveOpinion.getControlById("email_nsd_xin_yk").val(objDanhMuc.tt_y_kien.email_nsd_xin_yk);
        _frmSaveOpinion.getControlById("dthoai_nsd_xin_yk").val(objDanhMuc.tt_y_kien.dthoai_nsd_xin_yk);
        _frmSaveOpinion.getControl("so_id_yk").val(objDanhMuc.tt_y_kien.so_id_yk);
        hienThi("y_kien");
    });

    $("#btnQuayLai").click(function () {
        hienThi("trang_chu");
    });

    $("#btnGuiYKien").click(function () {
        if (_frmSaveOpinion.isValid()) {
            var so_id_yk = _frmSaveOpinion.getControl("so_id_yk").val();
            var nd_y_kien = _frmSaveOpinion.getControl("nd_y_kien").val();
            var obj = {
                so_id_yk: so_id_yk,
                nd_y_kien: nd_y_kien
            }
            if (nd_y_kien == null || nd_y_kien == undefined || nd_y_kien.trim() == "") {
                _notifyService.error("Bạn chưa nhập ý kiến. Vui lòng nhập ý kiến về hồ sơ");
                return;
            }
            _opinionService.luuYKienCanBo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                else {
                    _notifyService.info("Gửi ý kiến thành công", () => {
                        hienThi("trang_chu");
                    });
                }
            });
        }
    });
});