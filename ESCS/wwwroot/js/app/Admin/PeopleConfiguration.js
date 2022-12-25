var objDanhMuc = {};
var objCauHinh = {};
var objCauHinhSLA = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var arrCloneSLA = [];

var _service = new Service();
var _notifyService = new NotifyService();
var _branchListService = new BranchListService();
var _partnerListService = new PartnerListService();
var _peopleConfigurationService = new PeopleConfigurationService();
var _hospitalService = new HospitalService();
var _categoryPersonListService = new CategoryPersonService();
var _productHumanService = new ProductHumanService();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var dateNow = new Date().ddmmyyyy();
const GRID_HO_SO_SO_DONG = 14;

var _modalThemCauHinhBoiThuongConNguoi = new ModalService("modalThemCauHinhBoiThuongConNguoi");
var _modalCHDuyetBTTuDong = new ModalService("modalCHDuyetBTTuDong");
var _modalCHPheDuyetBoiThuongTuDongNhapNgayAD = new ModalService("modalCHPheDuyetBoiThuongTuDongNhapNgayAD");
var _modalCauHinhSLA = new ModalService("modalCauHinhSLA");

var _frmThemCauHinhPhanCong = new FormService("frmThemCauHinhPhanCong");
var _frmCHPheDuyetBoiThuongTuDongNhapNgayAD = new FormService("frmCHPheDuyetBoiThuongTuDongNhapNgayAD");
var _frmQuyenLoi = new FormService("frmQuyenLoi");
var _frmCauHinhSLA = new FormService("frmCauHinhSLA");

function chonLoaiCauHinh(loai) {
    $('.cau_hinh_nguoi').removeClass('card_active');
    if (loai == 'CH_BOI_THUONG_CON_NGUOI') {
        $("#ch_boi_thuong_con_nguoi").addClass('card_active');
        $('#divInputThemNgayCHBTConNguoi').hide();
        $('#divThemMoiNgayCHBTConNguoi').show();
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: 0,
            nv: 'NG'
        }
        _peopleConfigurationService.xemCauHinhBoiThuongConNguoi(obj).then(res => {
            objCauHinh = res.data_info;
            ESUtil.genHTML("tblDsNgayCauHinhConNguoi_template", "tblDsNgayCHBTConNguoi", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                if (res.data_info.ds_ngay.length > 0) {
                    getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                }
            });
        });
        _modalThemCauHinhBoiThuongConNguoi.show();
    }
    else if (loai == 'CH_DUYET_TU_DONG_CON_NGUOI') {
        _peopleConfigurationService.layDsNgayADDuyetBoiThuongTuDong().then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongNgayADTemplate", "modalCHPheDuyetBoiThuongTuDongNgayAD", { data: res.data_info }, () => {
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a.nav-link").removeClass("active");
                    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a[data_ngay_ad='" + res.data_info[0].ngay_ad + "']").addClass("active");
                    layChiTietCHDuyetBoiThuongTuDong(res.data_info[0].ngay_ad);
                }
            });
            hienThiTabCHDuyetBoiThuong("tabCHDonViBenhVienHSGT");
            _modalCHDuyetBTTuDong.show();
        });
    }
    else if (loai == 'CH_SLA_CON_NGUOI') {
        $('#ch_sla_nguoi').addClass('card_active');
        _frmCauHinhSLA.resetForm();
        _frmCauHinhSLA.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmCauHinhSLA.getControl("ma_doi_tac").trigger('select2:select');
        _frmCauHinhSLA.getControl("nguon").setValue("BLVP");
        _frmCauHinhSLA.getControl("nguon").trigger('select2:select');
        $("#ngayad_sla").val(dateNow);

        $('#divInputThemNgayCHSLA').hide();
        $('#divThemMoiNgayCHSLA').show();
        //var obj = {
        //    ma_doi_tac: _frmCauHinhSLA.getControl("ma_doi_tac").getValue(),
        //    nguon: _frmCauHinhSLA.getControl("nguon").getValue()
        //}
        //_peopleConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
        //    objCauHinhSLA = res.data_info;
        //    ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
        //        if (res.data_info.ds_ngay.length > 0) {
        //            getDetailCauHinhSLA(res.data_info.ds_ngay[0].ngay_ad);
        //        }
        //    });
        //});
        _modalCauHinhSLA.show();
    }
}
function getDetailCompensation(ngay_ad) {
    ESUtil.genHTML("modalCauHinhBoiThuongConNguoi_template", "modalCauHinhBoiThuongConNguoi", { ds_boi_thuong: [] });
    if (ngay_ad != undefined && ngay_ad != null && ngay_ad.toString().trim() != "") {
        $('.item-ngay_ad').removeClass("text-danger");
        $('.item-ngay_ad').removeClass("active");
        $("#ds_ngay_ad_bt_" + ngay_ad).addClass("text-danger");
        $("#ds_ngay_ad_bt_" + ngay_ad).addClass("active");
        var objDsNgay = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: ngay_ad,
            nv: 'NG'
        };
        _peopleConfigurationService.xemCauHinhBoiThuongConNguoi(objDsNgay).then(res => {
            if (res.data_info.tt_lke == null || res.data_info.tt_lke.length <= 0) {
                ESUtil.genHTML("modalCauHinhBoiThuongConNguoi_template", "modalCauHinhBoiThuongConNguoi", { ds_boi_thuong: objCauHinh.tt_chung });
            }
            else {
                ESUtil.genHTML("modalCauHinhBoiThuongConNguoi_template", "modalCauHinhBoiThuongConNguoi", { ds_boi_thuong: res.data_info.tt_lke });
            }
        });
    }
}
//Get data table bồi thường xe
function getDataTableCauHinhBoiThuong() {
    var otArr = [];
    $("#modalCauHinhBoiThuongConNguoi tr.row_item").each(function (e) {
        var json = { ma: '', gia_tri: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } else if ($(this).hasClass("radio")) {
                    json[field] = $(this).is(":checked") == true ? 'S' : 'T';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layChiTietCHDuyetBoiThuongTuDong(ngay_ad) {
    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a.nav-link").removeClass("active");
    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a[data_ngay_ad='" + ngay_ad + "']").addClass("active");
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text']").val("0");
    _peopleConfigurationService.layChiTietCHDuyetBoiThuongTuDong({ ngay_ad: ngay_ad }).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        resetFormCauHinh();
        for (var i = 0; i < res.data_info.dvi.length; i++) {
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").prop("checked", true);
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_tien_yc'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").val(ESUtil.formatMoney(res.data_info.dvi[i].so_tien_yc));
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_ngay_yc'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").val(res.data_info.dvi[i].so_ngay_yc);
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_lan_yc'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").val(res.data_info.dvi[i].so_lan);
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem select[name='loai'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").val(res.data_info.dvi[i].loai_ho_so);
        }
        for (var i = 0; i < res.data_info.benh_vien.length; i++) {
            $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox'][data_ma_bv='" + res.data_info.benh_vien[i].benh_vien + "']").prop("checked", true);
            $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem select[name='loai_hinh'][data_ma_bv='" + res.data_info.benh_vien[i].benh_vien + "']").val(res.data_info.benh_vien[i].hinh_thuc);
        }
        for (var i = 0; i < res.data_info.quyen_loi.length; i++) {
            $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").prop("checked", true);
            $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_tien_yc'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").val(ESUtil.formatMoney(res.data_info.quyen_loi[i].so_tien_yc));
            $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_ngay_yc'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").val(res.data_info.quyen_loi[i].so_ngay_yc);
        }
        for (var i = 0; i < res.data_info.ho_so_giay_to.length; i++) {
            $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox'][data_hsgt='" + res.data_info.ho_so_giay_to[i].hsgt + "']").prop("checked", true);
            $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem select[name='loai_hinh'][data_hsgt='" + res.data_info.ho_so_giay_to[i].hsgt + "']").val(res.data_info.ho_so_giay_to[i].hinh_thuc);
        }
    });
}
function resetFormCauHinh() {
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_tien_yc']").val(0);
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_ngay_yc']").val(0);
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_lan_yc']").val(0);
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem select[name='loai']").val('');

    $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem select[name='loai_hinh']").val('');

    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_tien_yc']").val(0);
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_ngay_yc']").val(0);

    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem select[name='loai_hinh']").val('');
}
//Cấu hình duyệt bồi thường tự động
function hienThiTabCHDuyetBoiThuong(tab) {
    $("#tabCHDonViBenhVienHSGTMenu").removeClass("active");
    $("#tabCHQuyenLoiMenu").removeClass("active");
    $(".tabCHDonViBenhVienHSGT").addClass("d-none");
    $(".tabCHQuyenLoi").addClass("d-none");
    $("#" + tab + "Menu").addClass("active");
    $("." + tab).removeClass("d-none");
}
function onChkHienThiBVAD(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetBoiThuongTuDongBVADTkiem").val("");
    if (!checked) {
        $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem").removeClass("d-none");
        return;
    }
    $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem").addClass("d-none");
    $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox']:checked").parent().parent().removeClass("d-none");
}
function onChkHienThiHSGTAD(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetBoiThuongTuDongHSGTADTkiem").val("");
    if (!checked) {
        $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem").removeClass("d-none");
        return;
    }
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem").addClass("d-none");
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox']:checked").parent().parent().removeClass("d-none");
}
function chonTatCaDviCHDuyetBoiThuong(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']").prop("checked", checked);
}
function chonTatCaBVCHDuyetBoiThuong(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox']").prop("checked", checked);
}
function chonTatCaHSGTCHDuyetBoiThuong(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox']").prop("checked", checked);
}
function layDviCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_ma_dvi"));
    });
    return arr;
}
function layDviSoTienCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_dvi = $(el).attr("data_ma_dvi");
        var so_tien = $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_tien_yc'][data_ma_dvi='" + ma_dvi + "']").val();
        if (so_tien == undefined || so_tien == null) {
            so_tien = "0";
        }
        so_tien = parseFloat(so_tien.replace(/[^0-9]+/g, ''))
        arr.push(so_tien);
    });
    return arr;
}
function layDviSoNgayCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_dvi = $(el).attr("data_ma_dvi");
        var so_ngay = $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_ngay_yc'][data_ma_dvi='" + ma_dvi + "']").val();
        if (so_ngay == undefined || so_ngay == null) {
            so_ngay = "0";
        }
        so_ngay = parseFloat(so_ngay.replace(/[^0-9]+/g, ''))
        arr.push(so_ngay);
    });
    return arr;
}
function layDviSoLanCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_dvi = $(el).attr("data_ma_dvi");
        var so_lan = $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='text'][name='so_lan_yc'][data_ma_dvi='" + ma_dvi + "']").val();
        if (so_lan == undefined || so_lan == null) {
            so_lan = "0";
        }
        so_lan = parseFloat(so_lan.replace(/[^0-9]+/g, ''))
        arr.push(so_lan);
    });
    return arr;
}
function layDviLoaiCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_dvi = $(el).attr("data_ma_dvi");
        var loai = $("#modalCHPheDuyetBoiThuongTuDongDviAD div.modalCHPheDuyetBoiThuongTuDongDviADItem select[name='loai'][data_ma_dvi='" + ma_dvi + "']").val();
        if (loai == undefined || loai == null) {
            loai = "";
        }
        arr.push(loai);
    });
    return arr;
}
function layBVCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongBVAD div.modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_ma_bv"));
    });
    return arr;
}
function layBVLoaiCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongBVAD div.modalCHPheDuyetBoiThuongTuDongBVItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_bv = $(el).attr("data_ma_bv");
        var loai = $("#modalCHPheDuyetBoiThuongTuDongBVAD div.modalCHPheDuyetBoiThuongTuDongBVItem select[name='loai_hinh'][data_ma_bv='" + ma_bv + "']").val();
        if (loai == undefined || loai == null) {
            loai = "";
        }
        arr.push(loai);
    });
    return arr;
}
function layQuyenLoiCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD div.modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_quyen_loi"));
    });
    return arr;
}
function layQuyenLoiSoTienCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD div.modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_qloi = $(el).attr("data_quyen_loi");
        var so_tien = $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD div.modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[name='so_tien_yc'][data_quyen_loi='" + ma_qloi + "']").val();
        if (so_tien == undefined || so_tien == null) {
            so_tien = "0";
        }
        so_tien = parseFloat(so_tien.replace(/[^0-9]+/g, ''))
        arr.push(so_tien);
    });
    return arr;
}
function layQuyenLoiSoNgayCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD div.modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_qloi = $(el).attr("data_quyen_loi");
        var so_ngay = $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD div.modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[name='so_ngay_yc'][data_quyen_loi='" + ma_qloi + "']").val();
        if (so_ngay == undefined || so_ngay == null) {
            so_ngay = "0";
        }
        so_ngay = parseFloat(so_ngay.replace(/[^0-9]+/g, ''))
        arr.push(so_ngay);
    });
    return arr;
}
function layHSGTNgayCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD div.modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_hsgt"));
    });
    return arr;
}
function layHSGTLoaiCHDuyetBoiThuong() {
    var arr = [];
    $("#modalCHPheDuyetBoiThuongTuDongHSGTAD div.modalCHPheDuyetBoiThuongTuDongHSGTItem input[type='checkbox']:checked").each(function (i, el) {
        var hsgt = $(el).attr("data_hsgt");
        var loai = $("#modalCHPheDuyetBoiThuongTuDongHSGTAD div.modalCHPheDuyetBoiThuongTuDongHSGTItem select[name='loai_hinh'][data_hsgt='" + hsgt + "']").val();
        if (loai == undefined || loai == null) {
            loai = "";
        }
        arr.push(loai);
    });
    return arr;
}
//--------------------Code SLA-----------------------
function getDetailCauHinhSLA(ngay_ad) {
    ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: [] });
    if (ngay_ad != undefined && ngay_ad != null && ngay_ad.toString().trim() != "") {
        $('.item-ngay_ad').removeClass("text-danger");
        $('.item-ngay_ad').removeClass("active");
        $("#ds_ngay_ad_sla_" + ngay_ad).addClass("text-danger");
        $("#ds_ngay_ad_sla_" + ngay_ad).addClass("active");

        var obj = {
            ma_doi_tac: _frmCauHinhSLA.getControl("ma_doi_tac").getValue(),
            ngay_ad: ngay_ad,
            nguon: _frmCauHinhSLA.getControl("nguon").getValue()
        }
        _peopleConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
            var data = res.data_info.ttin_ctiet;
            if (data.length > 0) {
                ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: data });
            }
            else {
                ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: arrCloneSLA });
            }
        });
    }
}
function getDataTableCauHinhSLA() {
    var otArr = [];
    $("#tblCauHinhSLA tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function addRowSLA(el) {
    var ten = $(el).closest('tr.row_item').find("span").html();
    var tien_tu = $(el).closest('tr.row_item').find("input[data-field='tien_tu']").val();
    var tien_toi = $(el).closest('tr.row_item').find("input[data-field='tien_toi']").val();
    arrCloneSLA = getDataTableCauHinhSLA();
    if (tien_tu == 0 && tien_toi == 0) {
        _notifyService.error("Bạn chưa nhập tiền từ, tiền tới");
        return;
    } else {
        _notifyService.confirmHTML('Bạn có chắc muốn thêm bước thực hiện <b class="font-weight-bold">' + ten + '</b> này không?', "", val => {
            var obj = {};
            obj.stt = $(el).closest('tr.row_item').find('input[data-field="stt"]').attr('data-val');
            obj.ma = $(el).closest('tr.row_item').find('input[data-field="ma"]').attr('data-val');
            obj.buoc_thuc_hien = $(el).closest('tr.row_item').find('input[data-field="buoc_thuc_hien"]').attr('data-val');
            obj.tien_tu = 0;
            obj.tien_toi = 0;
            obj.tgian = 0;
            obj.tgian_noti = 0;
            obj.tgian_hanh_chinh = "K";
            arrCloneSLA.push(obj);
            arrCloneSLA.sort((a, b) => a.stt - b.stt);
            ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: arrCloneSLA });
        });
    }
}
function removeRowSLA(el) {
    var ten = $(el).closest('tr.row_item').find("span").html();
    _notifyService.confirmHTML('Bạn có chắc muốn xóa bước thực hiện <b class="font-weight-bold">' + ten + '</b> này không?', "", val => {
        $(el).closest("tr").remove();
        _notifyService.success("Xóa bước thực hiện thành công");
    });
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _hospitalService.layDsHospital(),
        _categoryPersonListService.layDsHMCN({ ma_doi_tac: ESCS_MA_DOI_TAC }),
        _peopleConfigurationService.layDanhMucQuyenLoi({ ma_doi_tac: "", ma_lh_nv: "" }),
        _productHumanService.getAllSanPham()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.don_vi = arrRes[1].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        objDanhMuc.benh_vien = arrRes[2].data_info.benh_vien.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        objDanhMuc.ho_so_giay_to = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.loai === "TL");
        objDanhMuc.quyen_loi = arrRes[4].data_info;
        objDanhMuc.san_pham = arrRes[5].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);

        _frmCauHinhSLA.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongDviADTemplate", "modalCHPheDuyetBoiThuongTuDongDviAD", { data: objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC) });
        ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongBVADTemplate", "modalCHPheDuyetBoiThuongTuDongBVAD", { data: objDanhMuc.benh_vien });
        ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongHSGTADTemplate", "modalCHPheDuyetBoiThuongTuDongHSGTAD", { data: objDanhMuc.ho_so_giay_to });
        _frmQuyenLoi.getControl("san_pham").setDataSource(objDanhMuc.san_pham, "ten", "ma", "Chọn sản phẩm", "");
    });

    _frmQuyenLoi.getControl("san_pham").addEventChange(val => {
        var ngay_ad = $('#modalCHPheDuyetBoiThuongTuDongNgayAD a.nav-link.active').attr('data_ngay_ad');
        var arr_quyen_loi = objDanhMuc.quyen_loi.where(n => n.ma_lhnv == val);
        ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongQuyenLoiADTemplate", "modalCHPheDuyetBoiThuongTuDongQuyenLoiAD", { data: arr_quyen_loi }, () => {
            _peopleConfigurationService.layChiTietCHDuyetBoiThuongTuDong({ ngay_ad: ngay_ad }).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox']").prop("checked", false);
                $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_tien_yc']").val(0);
                $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_ngay_yc']").val(0);
                for (var i = 0; i < res.data_info.quyen_loi.length; i++) {
                    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='checkbox'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").prop("checked", true);
                    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_tien_yc'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").val(ESUtil.formatMoney(res.data_info.quyen_loi[i].so_tien_yc));
                    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem input[type='text'][name='so_ngay_yc'][data_quyen_loi='" + res.data_info.quyen_loi[i].lh_nv + "']").val(res.data_info.quyen_loi[i].so_ngay_yc);
                }
            });
        });
    });
    _frmCauHinhSLA.getControl("ma_doi_tac").addEventChange(val => {
        if (_frmCauHinhSLA.getControl("nguon").getValue() != "") {
            var obj = {
                ma_doi_tac: val,
                nguon: _frmCauHinhSLA.getControl("nguon").getValue()
            }
            _peopleConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
                objCauHinhSLA = res.data_info;
                ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                    if (res.data_info.ds_ngay.length > 0) {
                        getDetailCauHinhSLA(res.data_info.ds_ngay[0].ngay_ad);
                    }
                });
            });
        }
    });
    _frmCauHinhSLA.getControl("nguon").addEventChange(val => {
        if (_frmCauHinhSLA.getControl("ma_doi_tac").getValue() != "") {
            var obj = {
                ma_doi_tac: _frmCauHinhSLA.getControl("ma_doi_tac").getValue(),
                nguon: val
            }
            _peopleConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
                objCauHinhSLA = res.data_info;
                ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                    if (res.data_info.ds_ngay.length > 0) {
                        getDetailCauHinhSLA(res.data_info.ds_ngay[0].ngay_ad);
                    }
                });
            });
        }
    });
    $("#btnOpenInputThemNgayCHBTConNguoi").click(function () {
        $('.item-ngay_ad').removeClass("text-danger");
        ESUtil.genHTML("modalCauHinhBoiThuongConNguoi_template", "modalCauHinhBoiThuongConNguoi", { ds_boi_thuong: [] });
        $('#divInputThemNgayCHBTConNguoi').show();
        $('#divThemMoiNgayCHBTConNguoi').hide();
    });
    $("#btnThemNgayCHBTConNguoi").click(function () {
        var arrNgay = [];
        $("#tblDsNgayCauHinhBoiThuongConNguoi tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_bt').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: ngay_new.dateToNumber(),
            ngay_ad_hthi: ngay_new
        }
        var arr = objCauHinh.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhConNguoi_template", "tblDsNgayCHBTConNguoi", { ds_ngay_ad: arr }, () => {
            getDetailCompensation(obj.ngay_ad);
            $('#divInputThemNgayCHBTConNguoi').hide();
            $('#divThemMoiNgayCHBTConNguoi').show();
        });
    });
    // Lưu thông tin cấu hình bồi thường con người
    $("#btnLuuCauHinhBoiThuongConNguoi").click(function () {
        var objData = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: $("#tblDsNgayCHBTConNguoi tr.active").attr("data-val"),
            nv: "NG",
            data: getDataTableCauHinhBoiThuong()
        }
        _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin cấu hình bồi thường này không?", "", () => {
            _peopleConfigurationService.luuThongTinCauHinhBoiThuongConNguoi(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _peopleConfigurationService.xemCauHinhBoiThuongConNguoi(objData).then(res => {
                        objCauHinh = res.data_info;
                        ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                            if (res.data_info.ds_ngay.length > 0) {
                                getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                            }
                        });
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Đóng sự kiện thêm mới ngày áp dụng
    $("#btnDongNgayCHBTConNguoi").click(function () {
        getDetailCompensation(objCauHinh.ds_ngay[0].ngay_ad);
        $('#divInputThemNgayCHBTConNguoi').hide();
        $('#divThemMoiNgayCHBTConNguoi').show();
    });
    $("#btnXoaCauHinhBoiThuongConNguoi").click(function () {
        var objData = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: $("#tblDsNgayCHBTConNguoi tr.active").attr("data-val"),
            nv: 'NG'
        }
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
            _peopleConfigurationService.xoaCauHinhBoiThuongConNguoi(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa cấu hình thành công");
                    _peopleConfigurationService.xemCauHinhBoiThuongConNguoi(objData).then(res => {
                        objCauHinh = res.data_info;
                        ESUtil.genHTML("tblDsNgayCauHinhConNguoi_template", "tblDsNgayCHBTConNguoi", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                            if (res.data_info.ds_ngay.length > 0) {
                                getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                            }
                        });
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Cấu hình phê duyệt tự động
    $("#btnThemNgayADDuyetBoiThuongTuDong").click(function () {
        _modalCHPheDuyetBoiThuongTuDongNhapNgayAD.show();
    });
    $("#btnLuuCHPheDuyetBoiThuongTuDongNhapNgayAD").click(function () {
        var obj = _frmCHPheDuyetBoiThuongTuDongNhapNgayAD.getJsonData();
        _peopleConfigurationService.luuCHDuyetBoiThuongTuDongNgayAD(obj).then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _peopleConfigurationService.layDsNgayADDuyetBoiThuongTuDong().then(resDetail => {
                if (resDetail.state_info.status != "OK") {
                    _notifyService.error(resDetail.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("modalCHPheDuyetBoiThuongTuDongNgayADTemplate", "modalCHPheDuyetBoiThuongTuDongNgayAD", { data: resDetail.data_info }, () => {
                    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a.nav-link").removeClass("active");
                    $("#modalCHPheDuyetBoiThuongTuDongNgayAD a[data_ngay_ad='" + obj.ngay_ad + "']").addClass("active");
                    //layChiTietCHDuyetGiaTuDong(obj.ngay_ad);
                });
                //hienThiTabCHDuyetGia("tabCHDonViGaraHangXeHieuXe");
            });
            _modalCHPheDuyetBoiThuongTuDongNhapNgayAD.hide();
        });
    });
    $("#btnLuuCauHinhDuyetBoiThuong").click(function () {
        var id = $("#modalCHPheDuyetBoiThuongTuDongTabList a.active").attr("id");
        if (id == "tabCHDonViBenhVienHSGTMenu" || id == 'tabCHQuyenLoiMenu') {
            var obj = {
                ngay_ad: 0,
                san_pham: "",
                dvi: [],
                dvi_loai: [],
                dvi_so_tien: [],
                dvi_so_ngay: [],
                dvi_so_lan: [],
                bv: [],
                bv_loai_hinh: [],
                ngay_ad: 0,
                qloi: [],
                qloi_so_tien: [],
                qloi_so_ngay: [],
                hsgt: [],
                hsgt_loai_hinh: []
            }
            obj.ngay_ad = $("#modalCHPheDuyetBoiThuongTuDongNgayAD a.active").attr("data_ngay_ad");
            obj.san_pham = _frmQuyenLoi.getControl("san_pham").val();
            obj.dvi = layDviCHDuyetBoiThuong();
            obj.dvi_loai = layDviLoaiCHDuyetBoiThuong();
            obj.dvi_so_tien = layDviSoTienCHDuyetBoiThuong();
            obj.dvi_so_ngay = layDviSoNgayCHDuyetBoiThuong();
            obj.dvi_so_lan = layDviSoLanCHDuyetBoiThuong();
            obj.bv = layBVCHDuyetBoiThuong();
            obj.bv_loai_hinh = layBVLoaiCHDuyetBoiThuong();
            obj.qloi = layQuyenLoiCHDuyetBoiThuong();
            obj.qloi_so_tien = layQuyenLoiSoTienCHDuyetBoiThuong();
            obj.qloi_so_ngay = layQuyenLoiSoNgayCHDuyetBoiThuong();
            obj.hsgt = layHSGTNgayCHDuyetBoiThuong()
            obj.hsgt_loai_hinh = layHSGTLoaiCHDuyetBoiThuong();

            _peopleConfigurationService.luuCHDuyetBoiThuongDanhMuc(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin cấu hình thành công");
            });
        }
    });
    $("#modalCHPheDuyetBoiThuongTuDongDviADTkiem").keyup(ESUtil.delay(function (e) {
        var val = $("#modalCHPheDuyetBoiThuongTuDongDviADTkiem").val().trim();
        $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetBoiThuongTuDongDviAD .modalCHPheDuyetBoiThuongTuDongDviADItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetBoiThuongTuDongBVADTkiem").keyup(ESUtil.delay(function (e) {
        $("#chkHienThiBVAD").prop("checked", false);
        var val = $("#modalCHPheDuyetBoiThuongTuDongBVADTkiem").val().trim();
        $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetBoiThuongTuDongBVAD .modalCHPheDuyetBoiThuongTuDongBVItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiADTkiem").keyup(ESUtil.delay(function (e) {
        var val = $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiADTkiem").val().trim();
        $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetBoiThuongTuDongQuyenLoiAD .modalCHPheDuyetBoiThuongTuDongQuyenLoiADItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetBoiThuongTuDongHSGTADTkiem").keyup(ESUtil.delay(function (e) {
        $("#chkHienThiHSGTAD").prop("checked", false);
        var val = $("#modalCHPheDuyetBoiThuongTuDongHSGTADTkiem").val().trim();
        $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            console.log(textSearch);
            $("#modalCHPheDuyetBoiThuongTuDongHSGTAD .modalCHPheDuyetBoiThuongTuDongHSGTItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //---------Cấu hình SLA-------------
    $('#btnOpenInputThemNgayCHSLA').click(function () {
        var arr = getDataTableCauHinhSLA();
        arrCloneSLA = arr.clone();
        $('.item-ngay_ad').removeClass("text-danger");
        ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: [] });
        $('#divInputThemNgayCHSLA').show();
        $('#divThemMoiNgayCHSLA').hide();
    });
    $('#btnDongNgayCHSLA').click(function () {
        getDetailCauHinhSLA(objCauHinhSLA.ds_ngay[0].ngay_ad);
        $('#divInputThemNgayCHSLA').hide();
        $('#divThemMoiNgayCHSLA').show();
    });
    $('#btnThemNgayCHSLA').click(function () {
        var arrNgay = [];
        $("#tblDsNgayCauHinhSLA tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_sla').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: ngay_new.dateToNumber(),
            ngay_ad_hthi: ngay_new
        }
        var arr = objCauHinhSLA.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: arr }, () => {
            getDetailCauHinhSLA(obj.ngay_ad);
            $('#divInputThemNgayCHSLA').hide();
            $('#divThemMoiNgayCHSLA').show();
        });
    });
    $("#btnLuuCauHinhSLA").click(function () {
        if (_frmCauHinhSLA.isValid()) {
            var obj = _frmCauHinhSLA.getJsonData();
            obj.ngay_ad = $("#tblDsNgayCauHinhSLA tr.active").attr('data-val');
            obj.nguon = _frmCauHinhSLA.getControl("nguon").getValue();
            obj.arr = getDataTableCauHinhSLA();

            for (var i = 0; i < obj.arr.length; i++) {
                if (obj.arr[i].tien_tu == 0 && obj.arr[i].tien_toi == 0) {
                    _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ dòng " + (i + 1));
                    return;
                }
            }
            _peopleConfigurationService.luuThongTinCauHinhSLA(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
});