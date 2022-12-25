var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var _modalXacNhan = new ModalService("modalXacNhan");
var _frmXacNhan = new FormService("frmXacNhan");

var short_link = '';
var text_xac_nhan = 'Hồ sơ này đã được xác nhận';

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

function randomNumber() {
    "use strict";
    return Math.floor(Math.random() * 9) + 1;
}

function hienThi(step) {
    setStep = step;
    if (step == 'page404') {
        page404();
    }
    $('#trang_chu').addClass("d-none");
    $('#page404').addClass("d-none");
    $('#' + step).removeClass("d-none");
}
$(document).ready(function () {
    var short_link = $("#short_link").val();
    if (short_link == '' || short_link == null || short_link == undefined) {
        hienThi("page404");
        return;
    }
    _service.postData("/ClaimOnline/layThongTinKhachHangShortLink", { short_link: short_link }).then(arrRes => {
        objDanhMuc = arrRes.data_info;
        if (objDanhMuc.doi_tac == null) {
            hienThi("page404");
            return;
        }
        var data = objDanhMuc.data;
        if (data.ngay_xn < 30000101 && data.ly_do == 'Tôi đồng ý!' && data.xac_nhan == 'D') {
            $(".message_error_confirm").html(text_xac_nhan);
        }
        var ho_so = objDanhMuc.ho_so;
        $('.tieu_de').html(data.tieu_de);
        var logo = objDanhMuc.cai_dat.where(n => n.loai == "LOGO_DANG_NHAP").firstOrDefault();
        ESUtil.checkLoadImage("/" + logo.url_anh, () => {
            $(".app_logo").attr("src", "/" + logo.url_anh);
        }, () => { console.log("Không tìm thấy ảnh logo trên webserver"); });
        $(".app_ten_cty_bh").html(logo.ten_doi_tac.toUpperCase());
        ESUtil.genHTML("divThongTinHoSoTemplate", "divThongTinHoSo", { ho_so: ho_so });
        ESUtil.genHTML("divThongTinDoiTuongBaoHiemTemplate", "divThongTinDoiTuongBaoHiem", { ho_so: ho_so });
        hienThi("trang_chu");
    });

    $('#btnYKienKhac').click(function () {
        _frmXacNhan.resetForm();
        _frmXacNhan.clearErrorMessage();
        _frmXacNhan.getControl('ly_do_tu_choi').readOnly(false);
        _modalXacNhan.show();
        $("#btnLuuXacNhanText").html("Gửi ý kiến");
        $("#trang_chu").addClass("filter-blur");
    });

    $("#btnLuuXacNhan").click(function () {
        if (_frmXacNhan.isValid()) {
            var objDataInput = {};
            objDataInput.short_link = short_link;
            objDataInput.xac_nhan = 'D';
            objDataInput.ly_do_tu_choi = _frmXacNhan.getControl('ly_do_tu_choi').val();
            if (objDataInput.ly_do_tu_choi == "" || objDataInput.ly_do_tu_choi == null) {
                _notifyService.error("Vui lòng nhập ý kiến !");
                return;
            }
            _service.postData("/ClaimOnline/luuXacNhanPhuongAnBoiThuong", objDataInput).then(res => {
                if (res.state_info.status === "OK") {
                    var tb = "Gửi ý kiến thành công";
                    if (objDataInput.ly_do_tu_choi == "Tôi đồng ý!") {
                        tb = "Xác nhận thành công";
                    }
                    _notifyService.info(tb, () => {
                        $('#btnXacNhan').prop('disabled', true);
                        $('#btnDongModalXacNhan').trigger('click');
                        hienThi("trang_chu");
                        if (objDataInput.ly_do_tu_choi == 'Tôi đồng ý!') {
                            $(".message_error_confirm").html(text_xac_nhan);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXacNhan").click(function () {
        _frmXacNhan.resetForm();
        _frmXacNhan.clearErrorMessage();
        _modalXacNhan.show();
        $("#btnLuuXacNhanText").html("Xác nhận");
        _frmXacNhan.getControl('ly_do_tu_choi').val("Tôi đồng ý!");
        _frmXacNhan.getControl('ly_do_tu_choi').readOnly();
        $("#trang_chu").addClass("filter-blur");
    });

    $("#btnDongModalXacNhan").click(function () {
        _modalXacNhan.hide();
        $("#trang_chu").removeClass("filter-blur");
    });
});

