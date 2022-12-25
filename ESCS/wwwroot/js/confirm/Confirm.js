var objDanhMuc = {};
var _service = new Service();
var _confirmService = new ConfirmService();
var _notifyService = new NotifyService();
var _modalXacNhan = new ModalService("modalXacNhan");
var _frmXacNhan = new FormService("frmXacNhan");
var short_link = '';
var text_xac_nhan = "Hồ sơ này đã được khách hàng xác nhận!";
var text_tu_choi = 'Hồ sơ này đã từ chối xác nhận';

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
    var url_string = window.location.href;
    var url = new URL(url_string);
    var short_link = url.searchParams.get("r");
    if (short_link == '' || short_link == null || short_link == undefined) {
        hienThi("page404");
        return;
    }
    $("#btnXacNhan").addClass("btn-button").removeClass("btn-disabled");
    _confirmService.layThongTinTuShortLink({ short_link: short_link }).then(arrRes => {
        objDanhMuc = arrRes.data_info;
        if (objDanhMuc.doi_tac == null) {
            hienThi("page404");
            return;
        }
        var data = objDanhMuc.data;
        var ho_so = objDanhMuc.ho_so;
        var tinh_toan = objDanhMuc.tinh_toan;
        $('.tieu_de').html(data.tieu_de);
        
        if (data.ngay_xn != null && data.ngay_xn != undefined && data.ngay_xn < 30000101) {
            if (data.xac_nhan == 'D') {
                $('.message_error').html(text_xac_nhan);
                $("#btnXacNhan").removeClass("btn-button").addClass("btn-disabled");
            }
            if (data.xac_nhan == 'T') {
                $('.message_error').html(text_tu_choi);
            }
            $('.message_error').show();
        } else {
            $('.message_error').html();
            $('.message_error').hide();
        }
        var logo = objDanhMuc.cai_dat.where(n => n.loai == "LOGO_DANG_NHAP").firstOrDefault();
        ESUtil.checkLoadImage("/" + logo.url_anh, () => {
            $(".app_logo").attr("src", "/" + logo.url_anh);
        }, () => { console.log("Không tìm thấy ảnh logo trên webserver"); });
        $(".app_ten_cty_bh").html(logo.ten_doi_tac.toUpperCase());

        if (data.pm == "BH") {
            ESUtil.genHTML("divThongTinHopDongXeTemplate", "divThongTinHoSoXe", { ho_so: ho_so });
            ESUtil.genHTML("divThongTinKhachHangTemplate", "divThongTinDoiTuongBaoHiemXe", { ho_so: ho_so });
            $("#divThongTinTinhToan").addClass("d-none");
        } else {
            ESUtil.genHTML("divThongTinHoSoXeTemplate", "divThongTinHoSoXe", { ho_so: ho_so });
            ESUtil.genHTML("divThongTinDoiTuongBaoHiemXeTemplate", "divThongTinDoiTuongBaoHiemXe", { ho_so: ho_so }, () => {
                $("#divThongTinDoiTuongBaoHiemXe").find("div.boi-thuong").addClass("d-none");
                if (data.ma == 'PAGIA') {
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.boi-thuong").removeClass("d-none");
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.pa-gia").removeClass("d-none");
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.pa-boi-thuong").addClass("d-none");
                }
                if (data.ma == 'PABT') {
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.boi-thuong").removeClass("d-none");
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.pa-boi-thuong").removeClass("d-none");
                    $("#divThongTinDoiTuongBaoHiemXe").find("div.pa-gia").addClass("d-none");
                }
            });
            if (data.ma == 'PABT') {
                $("#divThongTinTinhToan").removeClass("d-none");
                if (tinh_toan != null) {
                    ESUtil.genHTML("divThongTinTinhToanBoiThuong_template", "divThongTinTinhToanBoiThuong", { vcx: tinh_toan });
                }
            } else {
                $("#divThongTinTinhToan").addClass("d-none");
            }
        }
        hienThi("trang_chu");
    });

    $('#btnXacNhan').click(function () {
        var data = objDanhMuc.data;
        if (data.ngay_xn != null && data.ngay_xn != undefined && data.ngay_xn < 30000101) {
            if (data.xac_nhan == 'D') {
                _notifyService.error(text_xac_nhan);
                return;
            }
        } else {
            _frmXacNhan.resetForm();
            _frmXacNhan.clearErrorMessage();
            _modalXacNhan.show();
        }
    });

    $("#btnLuuXacNhan").click(function () {
        if (_frmXacNhan.isValid()) {
            var ly_do_tu_choi = _frmXacNhan.getControl('ly_do_tu_choi').val();
            if (ly_do_tu_choi.trim() == "" || ly_do_tu_choi.trim() == null) {
                _notifyService.error("Vui lòng nhập ý kiến của bạn!");
                return;
            }
            var obj = {
                short_link: short_link,
                xac_nhan: 'D',
                ly_do_tu_choi: ly_do_tu_choi
            }
            _confirmService.luuXacNhanKhachHangKhongOTP(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.info("Xác nhận thành công", () => {
                        $('#btnXacNhan').prop('disabled', true);
                        $('.message_error').html(text_xac_nhan);
                        $('.message_error').show();
                        _modalXacNhan.hide();
                        $("#btnXacNhan").addClass("btn-disabled").removeClass("btn-button");
                        hienThi("trang_chu");
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
});
