var _service = new Service();
var _notifyService = new NotifyService();
var _modalYKienKhachHang = new ModalService("modalYKienKhachHang");
var _frmYKienKhachHang = new FormService("frmYKienKhachHang");
var setStep = "";
var objDanhMuc = {};
var arrFiles;

function gotoTop() {
    $('html, body').scrollTop(0);
}
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
function page505() {
    let loop4, loop5, loop6, time1 = 30, j = 0, number1, selector6 = document.querySelector('.thirdThree'), selector5 = document.querySelector('.secondTwo'),
        selector4 = document.querySelector('.firstOne');
    loop6 = setInterval(function () {
        "use strict";
        if (j > 40) {
            clearInterval(loop6);
            selector6.textContent = 5;
        } else {
            selector6.textContent = randomNumber();
            j++;
        }
    }, time1);
    loop5 = setInterval(function () {
        "use strict";
        if (j > 80) {
            clearInterval(loop5);
            selector5.textContent = 0;
        } else {
            selector5.textContent = randomNumber();
            j++;
        }
    }, time1);
    loop4 = setInterval(function () {
        "use strict";
        if (j > 100) {
            clearInterval(loop4);
            selector4.textContent = 0;
        } else {
            selector4.textContent = randomNumber();
            j++;
        }
    }, time1);
}
function hienThi(step) {
    setStep = step;
    if (step == 'page404') {
        page404();
    }
    if (step == 'page_ddos') {
        page505();
    }
    $('#device-detect').addClass("d-none");
    $('#danh_sach_xe').addClass("d-none");
    $('#bo_sung_giay_to').addClass("d-none");
    $('#khai_bao_ton_that').addClass("d-none");
    $('#thong_tin_ho_so').addClass("d-none");
    $('#tai_lieu_boi_thuong').addClass("d-none");
    $('#thong_tin_dien_bien').addClass("d-none");
    $('#chi_tiet_giay_chung_nhan').addClass("d-none");
    $('#trang_chu').addClass("d-none");
    $('#page404').addClass("d-none");
    $('#page_ddos').addClass("d-none");
    $('#' + step).removeClass("d-none");
    gotoTop();
}
$("#rdgiaychungnhan").click(function () {
    hienThi("giaychungnhan");
});
function onChangeAnh(el) {
    const [file] = el.files;
    var id = $(el).attr("id");
    var ma = $(el).attr("data-ma");
    if (file) {
        $("#img_" + id).attr("src", URL.createObjectURL(file));
        var loai_giay_to = objDanhMuc.giay_to.where(n => n.ma == ma).firstOrDefault();
        var ho_so_giay_to = loai_giay_to.files.where(n => n.file_name == id).firstOrDefault();
        ho_so_giay_to.is_exist = true;
        var dem = loai_giay_to.files.where(n => n.is_exist == false).length;
        if (dem == 0) {
            var index_new = loai_giay_to.files.max(n => n.file_index) + 1;
            var fileNew = { file_index: index_new, file_name: "file_" + ma + "_" + index_new, is_exist: false };
            loai_giay_to.files.push(fileNew);
            var item = JSON.parse(JSON.stringify(fileNew));
            item.ma = ma;
            ESUtil.appendHTML("divGiayToTemplate", "divGiayTo" + ma, item);
        }
    }
}
$(document).ready(function () {
    hienThi("page_ddos");
    var ma = $("#short_link").val();
    _service.postData("/ClaimOnline/laythongtinHSBS", { short_link: ma }).then(res => {
        if (res.state_info.status !== "OK") {
            hienThi("page404");
            return;
        }
        objDanhMuc = res.data_info;
        if (objDanhMuc.doi_tac == null) {
            hienThi("page404");
            return;
        }
        gotoTop();
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
        if (!device) {
            hienThi("device-detect");
            return;
        } else {
            hienThi("trang_chu");
            $(".btnBoSungHoSo").addClass("d-none");
            $(".boSungHoSo").removeClass("d-none");
        }
        var logo = objDanhMuc.cai_dat.where(n => n.loai == "LOGO_DANG_NHAP").firstOrDefault();
        ESUtil.checkLoadImage("/" + logo.url_anh, () => {
            $(".app_logo").attr("src", "/" + logo.url_anh);
        }, () => { console.log("Không tìm thấy ảnh logo trên webserver"); });
        $(".app_ten_cty_bh").html(logo.ten_doi_tac.toUpperCase());
        var ho_so = objDanhMuc.ho_so;
        ESUtil.genHTML("divCTHSTemplate", "divCTHS");
        ESUtil.genHTML("divThongTinHoSoTemplate", "divThongTinHoSo", { ho_so: ho_so });
        ESUtil.genHTML("divTimKiemTemplate", "divTimKiem");
        ESUtil.genHTML("divTTXTemplate", "divTTX");
        ESUtil.genHTML("divKhaiBaoVuTonThatNTBTemplate", "divKhaiBaoVuTonThatNTB");
        ESUtil.genHTML("divKhaiBaoVuTonThatNLHTemplate", "divKhaiBaoVuTonThatNLH");
        ESUtil.genHTML("divTGDDTTTemplate", "divTGDDTT");
        ESUtil.genHTML("divDBTemplate","divDB");
        ESUtil.genHTML("divChiTietGCNTemplate", "divChiTietGCN");
        ESUtil.genHTML("divThongTinXeTemplate", "divThongTinXe");
    });

    $('#btnTimKiem').click(function () {
        hienThi("danh_sach_xe");
    });
    $("#btnChupAnh").click(function () {
        hienThi("bo_sung_giay_to");
    });
    $("#btnTTDB").click(function () {
        hienThi("thong_tin_dien_bien");
    });
    $("#btnQuayLaiDS").click(function () {
        hienThi("chi_tiet_giay_chung_nhan");
    });
    $("#btnTiepTuc").click(function () {
        hienThi("khai_bao_ton_that");
    });
    $("#btnQuayLaiDSX").click(function () {
        hienThi("danh_sach_xe");
    });
    $("#btnQuayLaiTTLH").click(function () {
        hienThi("khai_bao_ton_that");
    });
    $('#divThongTinXe').click(function () {
        hienThi("chi_tiet_giay_chung_nhan");
    });
    $('#btnTiepTucBoSung').click(function () {
        hienThi("bo_sung_giay_to");
    });
    $('#btnQuayLaiTLBT').click(function () {
        hienThi("tai_lieu_boi_thuong");
    });
    $("#btnQuayLai").click(function () {
        hienThi("trang_chu");
    });
    $("#btnQuayLaiCT").click(function () {
        hienThi("thong_tin_ho_so");
    });
    $("#btnUpload").click(function () {
        var formData = new FormData();
        formData.append("ma_doi_tac_nsd", objDanhMuc.ho_so.ma_doi_tac);
        formData.append("ma_doi_tac", objDanhMuc.ho_so.ma_doi_tac);
        formData.append("ma_chi_nhanh", objDanhMuc.ho_so.ma_chi_nhanh);
        formData.append("so_id", objDanhMuc.ho_so.so_id);
        formData.append("so_id_dt", objDanhMuc.ho_so.so_id_dt);
        formData.append("nv", objDanhMuc.ho_so.nv);
        formData.append("pm", "WEB");
        formData.append("ung_dung", "WEB_MOBILE_KH");
        var arr = [];
        var ds_giay_to = objDanhMuc.giay_to;
        var fileIndex = 0;
        for (var i = 0; i < ds_giay_to.length; i++) {
            var giay_to = ds_giay_to[i];
            var ds_file = giay_to.files.where(n => n.is_exist);
            if (ds_file.length == 0) {
                _notifyService.error("Bạn chưa thực hiện chụp ảnh.");
                return;
            }
            for (var j = 0; j < ds_file.length; j++) {
                var fileName = $("#divDsAnhYCBS input#" + ds_file[j].file_name)[0].files[0].name;
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                var fileInfo = { key_file: "file" + fileIndex, nhom: giay_to.ma_hs, x: "0", y: "0" };
                arr.push(fileInfo);
                formData.append("file" + fileIndex, $("#divDsAnhYCBS input#" + ds_file[j].file_name)[0].files[0], ds_file[j].file_name + "." + fileNameExt);
                fileIndex++;
            }
        }
        formData.append("files", JSON.stringify(arr));
        _service.postFormData("/upload/uploadfilenonelogin", formData).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            hienThi("trang_chu");
            $(".boSungHoSo").removeClass("d-none");
            for (var i = 0; i < objDanhMuc.giay_to.length; i++) {
                objDanhMuc.giay_to[i].files = [];
                objDanhMuc.giay_to[i].files.push({ file_index: 0, file_name: "file_" + objDanhMuc.giay_to[i].ma_hs + "_0", is_exist: false })
                objDanhMuc.giay_to[i].files.push({ file_index: 1, file_name: "file_" + objDanhMuc.giay_to[i].ma_hs + "_1", is_exist: false })
            }
            ESUtil.genHTML("divDsAnhYCBSTemplate", "divDsAnhYCBS", objDanhMuc);
            $("#btnHoanThanhBoSung").trigger("click");
        });
    });
    $("#btnHoanThanhBoSung").click(function () {
        _frmYKienKhachHang.resetForm();
        _frmYKienKhachHang.clearErrorMessage
        _modalYKienKhachHang.show();
        $("#trang_chu").addClass("filter-blur");
    });
    $("#btnDongYKienKhachHang").click(function () {
        _modalYKienKhachHang.hide();
        $("#trang_chu").removeClass("filter-blur");
    });
    $("#btnLuuYKienKhachHang").click(function () {
        var obj = _frmYKienKhachHang.getJsonData();
        obj.ma_doi_tac = objDanhMuc.ho_so.ma_doi_tac;
        obj.so_id = objDanhMuc.ho_so.so_id;
        obj.nv = objDanhMuc.ho_so.nv;
        obj.so_hs = objDanhMuc.ho_so.so_hs;
        obj.nhom = "BSCT";
        if (obj.noi_dung.trim() == "" || obj.noi_dung.trim() == null) {
            _notifyService.error("Vui lòng nhập ý kiến !");
            return;
        }
        _service.postData("/ClaimOnline/luuYKienKhachHang", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmYKienKhachHang.getControl("bt").setValue(res.out_value.bt);
            _notifyService.info("Bạn đã bổ sung hồ sơ giấy tờ thành công. Vui lòng chờ bồi thường viên kiểm tra lại !", () => {
                _modalYKienKhachHang.hide();
                $("#trang_chu").removeClass("filter-blur");
                $(".btnBoSungHoSo").addClass("d-none");
                $(".boSungHoSo").removeClass("d-none");
            });
        });
    });
});