var _serviceTemp = new Service();
var _modalLapPhuongAnSuaChua = new ModalService("modalLapPhuongAnSuaChua");
var _modalGiamGiaPA = new ModalService("modalGiamGiaPA");
var _modalKhauTruPA = new ModalService("modalKhauTruPA");
var _modalThuePA = new ModalService("modalThuePA");
var _modalBoiThuongVienDanhGiaHoSoBoiThuong = new ModalService("modalBoiThuongVienDanhGiaHoSoBoiThuong");
var _frmModalGiamGiaPA = new FormService("frmModalGiamGiaPA");
var _frmTinhToanBoiThuongPA = new FormService("frmTinhToanBoiThuongPA");
var _frmKhauTruPA = new FormService("frmKhauTruPA");
var _frmBoiThuongVienDanhGiaHoSoBoiThuong = new FormService("frmBoiThuongVienDanhGiaHoSoBoiThuong");
var _popoverGhiChu = new PopoverService("popoverGhiChu");
var _popoverNguyenNhan = new PopoverService("popoverNguyenNhan");
var _popoverDKBS = new PopoverService("popoverDKBS");

function lapPASC(obj, callback = undefined) {
    if (ho_so_chi_tiet.data_info.lh_nv == null || ho_so_chi_tiet.data_info.lh_nv.length <= 0) {
        _notifyService.error("Không xác định được loại hình nghiệp vụ");
        return;
    }
    $(".lblBHMienThuong").html("Miễn thường (gồm VAT)/vụ");
    if (ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != undefined &&
        ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != null &&
        ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat == 'K') {
        $(".lblBHMienThuong").html("Miễn thường (chưa VAT)/vụ");
    }
    $("#modalLapPhuongAnSuaChua .divPhuongAnDanhGiaItem").addClass("d-none");
    $("#navPhuongAnNghiepVu .breadcrumb-item[data-lhnv='" + ho_so_chi_tiet.data_info.lh_nv[0].ma + "']").addClass("active");
    bindNguyenNhanGiamTru(ho_so_chi_tiet.data_info.lh_nv[0].ma);
    _serviceTemp.postData("/carclaim/CarCompensation/layDSPhuongAn", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info == null || res.data_info.length <= 0) {
            _notifyService.error("Chưa có báo giá kết thúc");
            return;
        }
        _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", obj).then(resDetail => {
            if (resDetail.state_info.status !== "OK") {
                _notifyService.error(resDetailHs.state_info.message_body);
                return;
            }
            ho_so_chi_tiet = resDetail;
            ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: res.data_info }, () => {
                $("#tblDsPhuongAnBody .single_checked").click(function () {
                    $("#tblDsPhuongAnBody .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
                if (res.data_info.length > 0) {
                    xemChiTietPhuongAnGara(res.data_info[0].so_id_pa);
                }
                if (callback) {
                    callback(res);
                }
            });
        });
    });
}
function luuPASC(callback = undefined) {
    if (!_frmTinhToanBoiThuongPA.isValid())
        return;
    var vcx = getDataTablePhuongAnVCX();
    if (vcx.length > 0) {
        var so_id_pa = _frmTinhToanBoiThuongPA.getControl("so_id_pa").val();
        var objData = _frmTinhToanBoiThuongPA.getJsonData();
        objData.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        objData.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        objData.ten_pa = ho_so_chi_tiet.data_info.ds_phuong_an.where(n => n.ma_doi_tac == ho_so_chi_tiet.data_info.ho_so.ma_doi_tac && n.so_id_pa == so_id_pa).firstOrDefault().ten_pa;
        objData.mo_ta = '';
        objData.vcx = vcx;
        if (objData.tl_thue != undefined && objData.tl_thue != null && objData.tl_thue == "THM") {
            objData.tl_thue = 0;
            objData.pt_ad_thue_mien_thuong = "THM";
        }
        else {
            objData.pt_ad_thue_mien_thuong = "TLT";
        }
        _serviceTemp.postData("/carclaim/CarCompensation/luuPhuongAnVCX", objData).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var idPhuongAn = res.out_value.so_id_pa.toString();
            var objGetDetail = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_pa: idPhuongAn
            };
            _serviceTemp.all([
                _serviceTemp.postData("/carclaim/CarCompensation/xemBangKeCtietPA", objGetDetail),
                _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", objGetDetail),
            ]).then(arrRes => {
                hienThiBangGiaPA(objGetDetail);
                ho_so_chi_tiet = arrRes[1];
                xemChiTietPhuongAnGara(idPhuongAn, res => {
                    var so_id_doi_tuong = $("#tblDsPhuongAnBody td.text-danger").attr("data-so_id_doi_tuong");
                    var doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
                    if (doi_tuong != null && doi_tuong.nhom == "TAI_SAN" && doi_tuong.loai != null && doi_tuong.loai == "XE") {
                        _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("XE");
                        _frmTinhToanBoiThuongPA.getControl("loai_ts").trigger("select2:select");
                    }
                });
                if (callback) {
                    callback()
                }
            });
        });
    }
}
function chonGaraPhuongAn(el, callback = undefined) {
    var val = $(el).attr("data-val");
    $("#modalGaraPhuongAnDanhSach .dsmdtt").removeClass("d-none");
    $("#inputSearch_GaraPhuongAn").focus();
    $("#inputSearch_GaraPhuongAn").val();
    $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem[value='" + val + "']").prop("checked", true);
    }
    _modalGaraPhuongAn.show(el);
    if (callback) {
        callback();
    }
}
function getDataTablePhuongAnVCX() {
    var otArr = [];
    $("#tblPhuongAnCT tr").each(function (e) {
        var json = {
            bt: 0, bt_gara: 0, ghi_chu: '', hang_muc: '', ma_gara: '', tien_ht_gara: 0, tien_vtu: 0, tien_khac: 0,
            tien_nhan_cong: 0, tien_khac_dx: 0, tien_nhan_cong_dx: 0, tien_vtu_dx: 0, tien_dx: 0, nguyen_nhan: ""
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr('data-val');
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        if (json.hang_muc != '' && json.hang_muc != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}
function onCheckAllPaHm(el) {
    var val = $(el).is(':checked');
    if (val == true) {
        $('#tblPhuongAnCT tr td input.input_chon_hm_gara').prop('checked', true);
    } else {
        $('#tblPhuongAnCT tr td input.input_chon_hm_gara').prop('checked', false);
    }
}
function xemChiTietPhuongAnGara(so_id_pa, callback = undefined) {
    $("#tblDsPhuongAnBody .dspa").removeClass("text-danger");
    $("#pa_" + so_id_pa).addClass("text-danger");
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: so_id_pa
    };
    _serviceTemp.postData("/carclaim/CarCompensation/layLHNVPhuongAn", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("navPhuongAnNghiepVuTemplate", "navPhuongAnNghiepVu", { danh_sach: res.data_info }, () => {
            var lh_nv = "";
            if (res.data_info == undefined || res.data_info == null || res.data_info.length > 0) {
                lh_nv = res.data_info[0].ma;
            }
            xemChiTietPhuongAn(so_id_pa, lh_nv, callback);
        });
    });
}
function xemChiTietPhuongAn(so_id_pa = undefined, lh_nv, callback = undefined) {
    if (ho_so_chi_tiet.data_info.lh_nv != null && ho_so_chi_tiet.data_info.lh_nv.length > 0) {
        for (var i = 0; i < ho_so_chi_tiet.data_info.lh_nv.length; i++) {
            ho_so_chi_tiet.data_info.lh_nv[i].so_id_pa = so_id_pa;
            ho_so_chi_tiet.data_info.lh_nv[i].active = 0;
            if (ho_so_chi_tiet.data_info.lh_nv[i].ma == lh_nv) {
                ho_so_chi_tiet.data_info.lh_nv[i].active = 1;
            }
        }
    }
    var dem = ho_so_chi_tiet.data_info.lh_nv.where(n => n.active == 1).length;
    if (dem < 0) {
        ho_so_chi_tiet.data_info.lh_nv[0].active = 1;
    }
    $("#navPhuongAnNghiepVu .breadcrumb-item").removeClass("active");
    $("#navPhuongAnNghiepVu .breadcrumb-item[data-lhnv='" + lh_nv.trim() + "']").addClass("active");
    var so_id_doi_tuong = $('#tblDsPhuongAnBody tr td.dspa.text-danger').attr('data-so_id_doi_tuong');
    if (so_id_pa == undefined || so_id_pa == "" || so_id_pa == null) {
        so_id_pa = $('#tblDsPhuongAnBody tr td.dspa.text-danger').attr('data-so-id-pa');
    }
    $("#btnLuuPASC").addClass("d-none");
    $("#btnLuuPASC_NV").addClass("d-none");
    $("#tblDsPhuongAnBody .dspa").removeClass('text-danger');
    $("#pa_" + so_id_pa).addClass('text-danger');
    var lh_nv = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv");

    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: so_id_pa,
        lh_nv: lh_nv
    };
    $("#divInputLoaiTSPA").addClass("d-none");
    $("#divInputMucMienThuongPA").removeClass("pl-0");
    _serviceTemp.postData("/carclaim/CarCompensation/xemChiTietPhuongAn", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $(".divPhuongAnDanhGiaItem").addClass("d-none");
        var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
        var phuong_an = res.data_info.phuong_an;
        var data = res.data_info.data;
        if (phuong_an == null) {
            _notifyService.error("Không xác định được phương án");
            return;
        }
        hienThiBangGiaPA(obj);
        _frmTinhToanBoiThuongPA.resetForm();
        _frmTinhToanBoiThuongPA.clearErrorMessage();
        _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(phuong_an.so_id_pa);
        _frmTinhToanBoiThuongPA.getControl("ma_gara").val(phuong_an.ma_gara);
        _frmTinhToanBoiThuongPA.getControl("so_vu").setValue(phuong_an.so_vu_tt);
        _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(phuong_an.mien_thuong);
        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue(phuong_an.mien_thuong / phuong_an.so_vu_tt);
        _frmTinhToanBoiThuongPA.getControl("khau_tru").setValue(phuong_an.khau_tru);
        _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly();
        if (phuong_an.pt_ad_thue_mien_thuong != "THM") {
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue(phuong_an.tl_thue_mien_thuong);
        }
        else {
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue(phuong_an.pt_ad_thue_mien_thuong);
        }
        _frmTinhToanBoiThuongPA.getControl("thue").setValue(phuong_an.tien_thue_sua_chua);
        _frmTinhToanBoiThuongPA.getControl("giam_tru_khac").setValue(phuong_an.tien_giam_tru_khac);
        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly();
        _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly();
        _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly();
        /*Vật chất xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly(false);
            _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly(false);
            _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly(false);

            $('#btnLuuPASC').removeClass("d-none");
            $("#divPhuongAnVCX").removeClass("d-none");
            _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly(false);
            ESUtil.genHTML("tblPhuongAnCT_template", "tblPhuongAnCT", { data: data }, () => {
                $(".tblPhuongAnCTGiamGia_T").addClass("d-none");
                $(".tblPhuongAnCTGiamGia_S").removeClass("d-none");
                if (data != undefined && data != null && data.length > 0 &&
                    data[0].lh_tt_giam_gia != undefined && data[0].lh_tt_giam_gia != null && data[0].lh_tt_giam_gia == "T") {
                    $(".tblPhuongAnCTGiamGia_T").removeClass("d-none");
                    $(".tblPhuongAnCTGiamGia_S").addClass("d-none");
                }
                bindEventPACT();
                tinhToanPA();
            });
        }
        /*Người ngồi trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
            $('#btnLuuPASC_NV').removeClass("d-none");
            $("#divPhuongAnNNTX").removeClass("d-none");
            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
            var arr_tong_hop = [];

            $.each(arr_pa, (index, item) => {
                var obj_tong_hop = item;
                arr_tong_hop.push(obj_tong_hop);
            });
            if (arr_tong_hop.length > 0) {
                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
            }
            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
            ESUtil.genHTML("modalChiTietPhuongAnNGUOITemplate", "modalChiTietPhuongAnNGUOI", { danh_sach: arr_tong_hop }, () => {
                bindEventPACT(() => {
                    tinhToanPA();
                });
            });
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
        }
        /*Hàng hóa trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            var tl_thue_max = 0;
            var tong_mien_thuong = 0;
            if (data.length > 0) {
                tl_thue_max = data.max(n => n.tl_thue);
                tong_mien_thuong = data.sum(n => n.tien_mien_thuong);
            }
            var mien_thuong_vat = tong_mien_thuong;
            if (phuong_an.bh_mien_thuong_vat == "C") {
                mien_thuong_vat = Math.round(tong_mien_thuong + tong_mien_thuong * tl_thue_max / 100);
            }
            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly(false);
            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue(mien_thuong_vat);
            $('#btnLuuPASC_NV').removeClass("d-none");
            $("#divPhuongAnHANGHOA").removeClass("d-none");
            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
            var arr_tong_hop = [];

            $.each(arr_pa, (index, item) => {
                var obj_tong_hop = item;
                arr_tong_hop.push(obj_tong_hop);
            });
            if (arr_tong_hop.length > 0) {
                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
            }
            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
            ESUtil.genHTML("modalChiTietPhuongAnHANGHOATemplate", "modalChiTietPhuongAnHANGHOA", { danh_sach: arr_tong_hop }, () => {
                bindEventPACT(() => {
                    tinhToanPA();
                });
            });
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
        }
        /*TNDS về người*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $('#btnLuuPASC_NV').removeClass("d-none");
            $("#divPhuongAnTNDSNguoi").removeClass("d-none");
            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
            var arr_tong_hop = [];
            $.each(arr_pa, (index, item) => {
                var obj_tong_hop = item;
                arr_tong_hop.push(obj_tong_hop);
            });
            if (arr_tong_hop.length > 0) {
                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
            }
            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
            ESUtil.genHTML("modalChiTietPhuongAnTNDS_NGUOITemplate", "modalChiTietPhuongAnTNDS_NGUOI", { danh_sach: arr_tong_hop }, () => {
                bindEventPACT(() => {
                    tinhToanPA();
                });
            });
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
        }
        /*TNDS về hành khách*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $('#btnLuuPASC_NV').removeClass("d-none");
            $("#divPhuongAnTNDSNguoiHK").removeClass("d-none");
            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
            var arr_tong_hop = [];
            $.each(arr_pa, (index, item) => {
                var obj_tong_hop = item;
                arr_tong_hop.push(obj_tong_hop);
            });
            if (arr_tong_hop.length > 0) {
                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
            }
            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
            ESUtil.genHTML("modalChiTietPhuongAnTNDS_NGUOI_HKTemplate", "modalChiTietPhuongAnTNDS_NGUOI_HK", { danh_sach: arr_tong_hop }, () => {
                bindEventPACT(() => {
                    tinhToanPA();
                });
            });
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
        }
        /*TNDS về tài sản*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $("#divInputLoaiTSPA").removeClass("d-none");
            $("#divInputMucMienThuongPA").addClass("pl-0");
            _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("KHAC");
            if (so_id_doi_tuong != "0") {
                _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("XE");
            }
            _frmTinhToanBoiThuongPA.getControl("loai_ts").trigger("select2:select");
            if (callback) {
                callback(res);
            }
        }
    });
}
function hienThiBangGiaPA(obj) {
    _serviceTemp.postData("/carclaim/CarCompensation/layBangChiTietPAView", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("modalLapPhuongAnSuaChuaBangPAViewTemplate", "modalLapPhuongAnSuaChuaBangPAView", res.data_info, () => {
            $("#modalLapPhuongAnSuaChuaBangPAView .pa_nghiep_vu_bang_tinh").addClass("d-none");
            for (var i = 0; i < res.data_info.lh_nv.length; i++) {
                var lh_nv_show = res.data_info.lh_nv[i].vcx + res.data_info.lh_nv[i].doi_tuong;
                $("#modalLapPhuongAnSuaChuaBangPAView ." + lh_nv_show.toUpperCase()).removeClass("d-none");
            }
        });
    });
}
function tinhToanPA(el) {
    var mien_thuong_vutt = _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").val();
    var so_vu = _frmTinhToanBoiThuongPA.getControl("so_vu").val();
    if (mien_thuong_vutt == undefined || mien_thuong_vutt == null || mien_thuong_vutt == "" || mien_thuong_vutt < 0) {
        mien_thuong_vutt = 0;
        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue("0");
    }
    if (so_vu == undefined || so_vu == null || so_vu == "" || so_vu < 0) {
        so_vu = 1;
        _frmTinhToanBoiThuongPA.getControl("so_vu").setValue("1");
    }
    mien_thuong_vutt = parseFloat(mien_thuong_vutt.replace(/[^0-9]+/g, ''));
    so_vu = parseFloat(so_vu.replace(/[^0-9]+/g, ''));
    var tong_mien_thuong = mien_thuong_vutt * so_vu;
    _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(ESUtil.formatMoney(tong_mien_thuong));

    var data = _frmTinhToanBoiThuongPA.getJsonData();
    data.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    data.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;

    if (data.tl_thue != undefined && data.tl_thue != null && data.tl_thue == "THM") {
        data.tl_thue = 0;
        data.pt_ad_thue_mien_thuong = "THM";//Thuế miễn thường theo thuế hạng mục
    }
    else {
        data.pt_ad_thue_mien_thuong = "TLT";//Thuế miễn thường theo tỷ lệ thuế
    }

    data.lh_nv = $("#navPhuongAnNghiepVu li.active").attr("data-lhnv");
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == data.lh_nv).firstOrDefault();
    //Vật chất xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        ganDuLieuTinhToanPAVCX(el);
        data.arr = layDuLieuTinhToanPAVCX();
    }
    //Người ngồi trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanPANNTX(el);
        data.arr = layDuLieuTinhToanPANNTX();
    }
    //Hàng hóa trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        ganDuLieuTinhToanPAHANGHOA(el);
        data.arr = layDuLieuTinhToanPAHANGHOA();
    }
    //TNDS về người
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanPATNDSNGUOI(el);
        data.arr = layDuLieuTinhToanPATNDSNGUOI();
    }
    //TNDS về hành khách
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanPATNDSNGUOI_HK(el);
        data.arr = layDuLieuTinhToanPATNDSNGUOI_HK();
    }
    //TNDS về tài sản
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        ganDuLieuTinhToanPATNDSTAISAN(el);
        ganDuLieuTinhToanPAVCX(el);//Tài sản là xe
        data.arr = layDuLieuTinhToanPATNDSTAISAN();
        var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
        var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
        var arrChuanHoa = chuanHoaNVCTTinhToan(data.arr, nhom, doi_tuong, "");
        var arr = [];
        var cha_co_pt = arrChuanHoa.where(n => n.so_luong_dt > 0);
        var cha_Khong_co_pt = arrChuanHoa.where(n => n.so_luong_dt <= 0);
        for (var i = 0; i < cha_co_pt.length; i++) {
            for (var j = 0; j < cha_co_pt[i].ds_doi_tuong.length; j++) {
                arr.push(cha_co_pt[i].ds_doi_tuong[j]);
            }
        }
        for (var i = 0; i < cha_Khong_co_pt.length; i++) {
            arr.push(cha_Khong_co_pt[i]);
        }
        data.arr = arr;
    }
    data.mien_thuong = data.mien_thuong.replace(/[^0-9]+/g, '');
    var thue = data.thue.replace(/[^0-9]+/g, '');
    if (thue <= 0 || isNaN(thue)) thue = 0;
    data.thue = 0;
    _serviceTemp.postData("/carclaim/CarCompensation/tinhPABoiThuongPA", data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var objTinhToan = res.data_info;
        hienThiTongPA(objTinhToan);
        //Vật chất xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
            $("#tblTinhToanPAVCXTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPAVCXTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanPAVCXTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanPAVCXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
            $("#tblTinhToanPAVCXTienGiamGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
            $("#tblTinhToanPAVCXTienGiamGia_T").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
            $("#tblTinhToanPAVCXThue").html(ESUtil.formatMoney(objTinhToan.kq.tien_thue));
            $("#tblTinhToanPAVCXTienKhauTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_ktru_bao_hiem));
        }
        //Hàng hóa trên xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            $("#tblTinhToanPAHANGHOATienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPAHANGHOATienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanPAHANGHOATienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanPAHANGHOATienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //Người ngồi trên xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
            $("#tblTinhToanPANNTXTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPANNTXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về người
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#tblTinhToanPATNDS_NGUOITienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPATNDS_NGUOITienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về hành khách
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#tblTinhToanPATNDS_NGUOI_HKTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPATNDS_NGUOI_HKTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về tài sản
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $("#tblTinhToanPATNDS_TAISANTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
            $("#tblTinhToanPATNDS_TAISANTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanPATNDS_TAISANTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));

            var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
            var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
            //Cũ var arr = chuanHoaNVCTTinhToan(layDuLieuTinhToanTNDSTAISAN(), nhom, doi_tuong);
            var arr = chuanHoaNVCTTinhToan(layDuLieuTinhToanPATNDSTAISAN(), nhom, doi_tuong);
            var tien_khau_hao_khac = 0;
            var tien_bao_hiem_khac = 0;
            var tien_giam_tru_khac = 0;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].so_luong_dt > 0) {
                    arr[i].tien_khau_hao = 0;
                    arr[i].tien_bao_hiem = 0;
                    arr[i].tien_giam_tru = 0;
                    for (var j = 0; j < arr[i].ds_doi_tuong.length; j++) {
                        var pt = arr[i].ds_doi_tuong[j];
                        pt.tien_khau_hao = parseFloat(pt.gia_duyet) * parseFloat(pt.pt_khau_hao) / 100;
                        var tien_con_lai = parseFloat(pt.gia_duyet) - pt.tien_khau_hao;
                        pt.tien_bao_hiem = parseFloat(tien_con_lai) * (1 - parseFloat(pt.pt_bao_hiem) / 100) * tien_con_lai;
                        tien_con_lai = tien_con_lai - pt.tien_bao_hiem;
                        pt.tien_giam_tru = parseFloat(tien_con_lai) * parseFloat(pt.pt_giam_tru) / 100;
                    }
                    arr[i].tien_khau_hao = arr[i].ds_doi_tuong.sum(n => n.tien_khau_hao);
                    arr[i].tien_bao_hiem = arr[i].ds_doi_tuong.sum(n => n.tien_bao_hiem);
                    arr[i].tien_giam_tru = arr[i].ds_doi_tuong.sum(n => n.tien_giam_tru);

                    $("#tong_khau_hao_" + arr[i].so_id_doi_tuong).html(ESUtil.formatMoney(arr[i].tien_khau_hao));
                    $("#tong_giam_tru_" + arr[i].so_id_doi_tuong).html(ESUtil.formatMoney(arr[i].tien_giam_tru));
                }
                else {
                    var pt = arr[i];
                    pt.tien_khau_hao = parseFloat(pt.gia_duyet) * parseFloat(pt.pt_khau_hao) / 100;
                    var tien_con_lai = parseFloat(pt.gia_duyet) - pt.tien_khau_hao;
                    pt.tien_bao_hiem = parseFloat(tien_con_lai) * (1 - parseFloat(pt.pt_bao_hiem) / 100) * tien_con_lai;
                    tien_con_lai = tien_con_lai - pt.tien_bao_hiem;
                    pt.tien_giam_tru = parseFloat(tien_con_lai) * parseFloat(pt.pt_giam_tru) / 100;
                }
            }
            var tien_khau_hao_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => n.tien_khau_hao);
            var tien_giam_tru_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => n.tien_giam_tru);

            $("#tong_khau_hao_ct_khac").html(ESUtil.formatMoney(tien_khau_hao_khac));
            $("#tong_khau_giam_ct_khac").html(ESUtil.formatMoney(tien_giam_tru_khac));
        }
    });
}
function bindEventPACT(callback = undefined) {
    $("input.number").keypress(function (e) {
        var keycode = e.which || e.keyCode;
        var arrKeycode = [8, 37, 39];
        if (!(e.shiftKey == false && ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
            e.preventDefault();
        }
    });
    $("input.number").keyup(function (e) {
        var value = ESUtil.formatMoney(parseInt($(this).val().replace(/[^0-9]+/g, '')));
        $(this).val(value);
    });
    $("#tblPhuongAnCT input[name='tien_vtu_dx'], #tblPhuongAnCT input[name='tien_nhan_cong_dx']").change(function () {
        var tien_vtu_dx = parseInt($(this).closest("tr").find("input[name='tien_vtu_dx']").val().replace(/[^0-9]+/g, ''));
        var tien_nhan_cong_dx = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val().replace(/[^0-9]+/g, ''));

        var tien_dx = ESUtil.formatMoney(tien_vtu_dx + tien_nhan_cong_dx);
        $(this).closest("tr").find("input[name='tien_dx']").val(ESUtil.formatMoney(tien_dx));
        if (callback) {
            callback();
        }
    });
    $(`#modalChiTietPhuongAnNGUOI input[name='tien_dx'], #modalChiTietPhuongAnHANGHOA input[name='tien_dx'],
       #modalChiTietPhuongAnTNDS_NGUOI input[name = 'tien_dx'], #modalChiTietPhuongAnTNDS_TAI_SAN input[name = 'tien_dx'],
       #modalChiTietPhuongAnTNDS_NGUOI_HK input[name = 'tien_dx']`).change(function () {
        if (callback) {
            callback();
        }
    });
    if (callback) {
        callback();
    }
}
function layDuLieuTinhToanPAVCX() {
    var otArr = [];
    $("#tblPhuongAnCT tr").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        if (json.hang_muc != undefined && json.hang_muc != '' && json.hang_muc != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTinhToanPAHANGHOA() {
    var otArr = [];
    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        json.dkbs = "";
        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTinhToanPANNTX() {
    var otArr = [];
    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        json.pt_khau_hao = "0";
        json.dkbs = "";
        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTinhToanPATNDSNGUOI() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        json.pt_khau_hao = "0";
        json.dkbs = "";
        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTinhToanPATNDSNGUOI_HK() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        json.pt_khau_hao = "0";
        json.dkbs = "";
        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTinhToanPATNDSTAISAN() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        json.dkbs = "";
        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangPAHangHoa() {
    var otArr = [];
    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangPANNTX() {
    var otArr = [];
    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
        var json = { so_id_doi_tuong: '', ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangPATNDSNguoi() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangPATNDSNguoiHK() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangPATNDSTaiSan() {
    var otArr = [];
    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;


}
function ganDuLieuTinhToanVCX(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoVCX").is(":checked");
    var chkBaoHiemVCX = $("#chkBaoHiemVCX").is(":checked");
    var chkGiamTruVCX = $("#chkGiamTruVCX").is(":checked");
    var chkTLThue = $("#chkTLThue").is(":checked");
    var chkNguyenNhanVCX = $("#chkNguyenNhanVCX").is(":checked");

    $("#tblTinhToanVCX tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    if (val == "") {
                        val = "0";
                    }
                    $(this).val(val);
                }
                if (chkBaoHiemVCX && field == "pt_bao_hiem" && current_field == field) {
                    if (val == "") {
                        val = "0";
                    }
                    $(this).val(val);
                }
                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
                    if (val == "") {
                        val = "0";
                    }
                    $(this).val(val);
                }
                if (chkTLThue && field == "tl_thue" && current_field == field) {
                    if (val == "") {
                        val = "0";
                    }
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                //if (chkDKBSVCX && field == "dkbs" && current_field == field) {
                //    $(this).attr("data-val", val);
                //    $(this).removeAttr("href");
                //    if (val != "") {
                //        $(this).attr("href", "#");
                //    }
                //}
                if (chkNguyenNhanVCX && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanHANGHOA(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoHANGHOA").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemHANGHOA").is(":checked");
    var chkGiamTru = $("#chkGiamTruHANGHOA").is(":checked");
    var chkTLThue = $("#chkTLThueHANGHOA").is(":checked");
    var chkNguyenNhan = $("#chkAllNguyenNhanHANGHOA").is(":checked");

    $("#tblTinhToanHANGHOA tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkTLThue && field == "tl_thue" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanNNTX(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkBaoHiemNNTX = $("#chkBaoHiemNNTX").is(":checked");
    var chkGiamTruNNTX = $("#chkGiamTruNNTX").is(":checked");
    var chkAllNguyenNhanNNTX = $("#chkAllNguyenNhanNNTX").is(":checked");
    $("#tblTinhToanNNTX tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTruNNTX && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiemNNTX && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkAllNguyenNhanNNTX && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });

}
function ganDuLieuTinhToanTNDSNGUOI(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkBaoHiem = $("#chkBaoHiemTNDS_NGUOI").is(":checked");
    var chkGiamTru = $("#chkGiamTruTNDS_NGUOI").is(":checked");
    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_NGUOI").is(":checked");
    $("#tblTinhToanTNDS_NGUOI tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanTNDSNGUOI_HK(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkBaoHiem = $("#chkBaoHiemTNDS_NGUOI_HK").is(":checked");
    var chkGiamTru = $("#chkGiamTruTNDS_NGUOI_HK").is(":checked");
    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_NGUOI_HK").is(":checked");
    $("#tblTinhToanTNDS_NGUOI_HK tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanLPHU_XE(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkBaoHiem = $("#chkBaoHiemLPHU_XE").is(":checked");
    var chkGiamTru = $("#chkGiamTruLPHU_XE").is(":checked");
    var chkNguyenNhan = $("#chkAllNguyenNhanLPHU_XE").is(":checked");
    $("#tblTinhToanLPHU_XE tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanTNDSTAISAN(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoTNDS_TAISAN").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemTNDS_TAISAN").is(":checked");
    var chkGiamTru = $("#chkGiamTruTNDS_TAISAN").is(":checked");
    var chkTLThue = $("#chkTLThueTNDS_TAISAN").is(":checked");
    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_TAISAN").is(":checked");
    $("#tblTinhToanTNDS_TAISAN tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkTLThue && field == "tl_thue" && current_field == field) {
                    $(this).val(val);
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
                    $(this).attr("data-val", val);
                    $(this).removeAttr("href");
                    if (val != "") {
                        $(this).attr("href", "#");
                    }
                }
            });
        });
    });
}
function ganDuLieuTinhToanPAVCX(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoPAVCX").is(":checked");
    var chkBaoHiemVCX = $("#chkBaoHiemPAVCX").is(":checked");
    var chkGiamTruVCX = $("#chkGiamTruPAVCX").is(":checked");
    var chkTLThue = $("#chkTLThuePA").is(":checked");

    $("#tblPhuongAnCT tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiemVCX && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkTLThue && field == "tl_thue" && current_field == field) {
                    if (val == "") {
                        val = "0";
                    }
                    $(this).val(val);
                }
            });
        });
    });
}
function ganDuLieuTinhToanPAHANGHOA(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoPAHANGHOA").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemPAHANGHOA").is(":checked");
    var chkGiamTru = $("#chkGiamTruPAHANGHOA").is(":checked");
    var chkTLThuePAHANGHOA = $("#chkTLThuePAHANGHOA").is(":checked");

    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkTLThuePAHANGHOA && field == "tl_thue" && current_field == field) {
                    $(this).val(val);
                }
            });
        });
    });
}
function ganDuLieuTinhToanPANNTX(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkGiamTruVCX = $("#chkGiamTruPANNTX").is(":checked");
    var chkBaoHiemPANNTX = $("#chkBaoHiemPANNTX").is(":checked");
    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiemPANNTX && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
        });
    });

}
function ganDuLieuTinhToanPATNDSNGUOI(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkGiamTru = $("#chkGiamTruPATNDS_NGUOI").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemPATNDS_NGUOI").is(":checked");
    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
        });
    });
}
function ganDuLieuTinhToanPATNDSNGUOI_HK(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var chkGiamTru = $("#chkGiamTruPATNDS_NGUOI_HK").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemPATNDS_NGUOI_HK").is(":checked");
    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
            });
        });
    });
}
function ganDuLieuTinhToanPATNDSTAISAN(el) {
    if (el == undefined) {
        return;
    }
    var current_field = $(el).attr("data-field");
    var val = $(el).val();
    if (val == undefined || val == null || val == "") {
        val = $(el).attr("data-val");
    }
    var checkKhauHao = $("#chkKhauHaoPATNDS_TAISAN").is(":checked");
    var chkBaoHiem = $("#chkBaoHiemPATNDS_TAISAN").is(":checked");
    var chkGiamTru = $("#chkGiamTruPATNDS_TAISAN").is(":checked");
    var chkTLThue = $("#chkTLThuePATNDS_TAISAN").is(":checked");
    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
                    $(this).val(val);
                }
                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
                    $(this).val(val);
                }
                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
                    $(this).val(val);
                }
                if (chkTLThue && field == "tl_thue" && current_field == field) {
                    $(this).val(val);
                }
            });
        });
    });
}
function nhapGiamGiaPA(callback = undefined) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val()
    };
    _frmModalGiamGiaPA.getControl("lh_giam_gia").setValue("BH");
    _frmModalGiamGiaPA.getControl("lh_tt_giam_gia").setValue("S");

    _serviceTemp.postData("/carclaim/CarCompensation/layDanhSachGiamGiaPA", obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res);
        }
        else {
            ESUtil.genHTML("tblHangMucGiamGiaPATemplate", "tblHangMucGiamGiaPA", { danh_sach: res.data_info }, () => {
                var lh_giam_gia = "BH";
                var lh_tt_giam_gia = "S";
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0 &&
                    res.data_info[0].lh_giam_gia != undefined && res.data_info[0].lh_giam_gia != null && res.data_info[0].lh_giam_gia != '' &&
                    res.data_info[0].lh_tt_giam_gia != undefined && res.data_info[0].lh_tt_giam_gia != null && res.data_info[0].lh_tt_giam_gia != '') {
                    lh_giam_gia = res.data_info[0].lh_giam_gia;
                    lh_tt_giam_gia = res.data_info[0].lh_tt_giam_gia;
                }
                _frmModalGiamGiaPA.getControl("lh_giam_gia").setValue(lh_giam_gia);
                _frmModalGiamGiaPA.getControl("lh_tt_giam_gia").setValue(lh_tt_giam_gia);
                hienThiTongGiamGiaPA(res.data_info);
            });
            _modalGiamGiaPA.show();
        }
    });
}
function hienThiTongGiamGiaPA(data) {
    var tbl_giam_gia_tong_tien_vtu_duyet = 0;
    var tbl_giam_gia_tong_tien_nhan_cong_duyet = 0;
    var tbl_giam_gia_tong_tien_khac_duyet = 0;
    var tbl_giam_gia_tong_tong_duyet = 0;

    var tong_tien_giam_gia_vtu = 0;
    var tong_tien_giam_gia_nhan_cong = 0;
    var tong_tien_giam_gia_khac = 0;
    var tong_tong_giam_gia = 0;
    var tong_tien_con_lai = 0;
    for (var i = 0; i < data.length; i++) {
        tbl_giam_gia_tong_tien_vtu_duyet += parseFloat(data[i].tien_vtu);
        tbl_giam_gia_tong_tien_nhan_cong_duyet += parseFloat(data[i].tien_nhan_cong);
        tbl_giam_gia_tong_tien_khac_duyet += parseFloat(data[i].tien_khac);
        tbl_giam_gia_tong_tong_duyet += parseFloat(data[i].tong_duyet);

        tong_tien_giam_gia_vtu += parseFloat(data[i].tien_giam_gia_vtu);
        tong_tien_giam_gia_nhan_cong += parseFloat(data[i].tien_giam_gia_nhan_cong);
        tong_tien_giam_gia_khac += parseFloat(data[i].tien_giam_gia_khac);
        tong_tong_giam_gia += parseFloat(data[i].tong_giam_gia);
        tong_tien_con_lai += parseFloat(data[i].tien_con_lai);
    }
    $("#tbl_pa_giam_gia_tong_tien_vtu_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_vtu_duyet));
    $("#tbl_pa_giam_gia_tong_tien_nhan_cong_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_nhan_cong_duyet));
    $("#tbl_pa_giam_gia_tong_tien_khac_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_khac_duyet));
    $("#tbl_pa_giam_gia_tong_tong_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tong_duyet));

    $("#tong_tien_giam_gia_vtu_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_vtu));
    $("#tong_tien_giam_gia_nhan_cong_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_nhan_cong));
    $("#tong_tien_giam_gia_khac_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_khac));
    $("#tong_tong_giam_gia_pa").html(ESUtil.formatMoney(tong_tong_giam_gia));
    $("#tong_tien_con_lai_pa").html(ESUtil.formatMoney(tong_tien_con_lai));
}
function luuGiamGiaPA(callback = undefined) {
    var arr = layDuLieuGiamGiaPA();
    if (arr != undefined && arr != null && arr.length > 0) {
        var lh_giam_gia = _frmModalGiamGiaPA.getControl("lh_giam_gia").val();
        var lh_tt_giam_gia = "S";
        for (var i = 0; i < arr.length; i++) {
            arr[i].lh_giam_gia = lh_giam_gia;
            arr[i].lh_tt_giam_gia = lh_tt_giam_gia;
        }
    }
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
        hm: arr
    };
    _serviceTemp.postData("/carclaim/CarCompensation/luuThongTinGiamGiaPA", obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _notifyService.success("Lưu thông tin giảm giá thành công");
        nhapGiamGiaPA(res => {
            var arr = res.data_info;
            ganTyLeGiamGiaKhuTruThuePA(arr);
            $("#btnTinhToanPA").trigger("click");
            xemChiTietPhuongAnGara(obj.so_id_pa);
        });
        if (callback) {
            callback(res);
        }
    });
}
function ganTyLeGiamGiaKhuTruThuePA(arr) {
    if (arr == undefined || arr == null || arr.length <= 0) {
        return;
    }
    $("#tblPhuongAnCT tr.tblPhuongAnCTItem").each(function (e) {
        x = $(this).children();
        var ma = $(this).find("input[name='hang_muc']").val();
        var hang_muc = arr.where(n => n.hang_muc == ma).firstOrDefault();
        if (hang_muc != null) {
            var tl_giam_gia_vtu = hang_muc.tl_giam_gia_vtu;
            var tl_giam_gia_nhan_cong = hang_muc.tl_giam_gia_nhan_cong;
            var tl_giam_gia_khac = hang_muc.tl_giam_gia_khac;
            var tien_giam_gia_vtu = hang_muc.tien_giam_gia_vtu;
            var tien_giam_gia_nhan_cong = hang_muc.tien_giam_gia_nhan_cong;
            var tien_giam_gia_khac = hang_muc.tien_giam_gia_khac;
            var tl_ktru_tien_bh = hang_muc.tl_ktru_tien_bh;
            var tien_ktru_tien_bh = hang_muc.tien_ktru_tien_bh;
            var tl_thue_vtu = hang_muc.tl_thue_vtu;
            var tl_thue_nhan_cong = hang_muc.tl_thue_nhan_cong;
            var tl_thue_khac = hang_muc.tl_thue_khac;
            var tien_thue = hang_muc.tien_thue_vtu + hang_muc.tien_thue_nhan_cong + hang_muc.tien_thue_khac;

            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    var field = $(this).attr("data-field");
                    if (field == "tl_giam_gia_vtu") {
                        $(this).val(tl_giam_gia_vtu);
                    }
                    if (field == "tl_giam_gia_nhan_cong") {
                        $(this).val(tl_giam_gia_nhan_cong);
                    }
                    if (field == "tl_giam_gia_khac") {
                        $(this).val(tl_giam_gia_khac);
                    }
                    if (field == "tien_giam_gia_vtu") {
                        $(this).val(tien_giam_gia_vtu);
                    }
                    if (field == "tien_giam_gia_nhan_cong") {
                        $(this).val(tien_giam_gia_nhan_cong);
                    }
                    if (field == "tien_giam_gia_khac") {
                        $(this).val(tien_giam_gia_khac);
                    }
                    if (field == "tl_ktru_tien_bh") {
                        $(this).val(tl_ktru_tien_bh);
                    }
                    if (field == "tl_thue_vtu") {
                        $(this).val(tl_thue_vtu);
                    }
                    if (field == "tl_thue_nhan_cong") {
                        $(this).val(tl_thue_nhan_cong);
                    }
                    if (field == "tl_thue_khac") {
                        $(this).val(tl_thue_khac);
                    }
                });
                $(this).find("a.combobox").each(function (el) {
                    var field = $(this).attr("data-field");
                    if (field == "tien_giam_gia") {
                        $(this).html(ESUtil.formatMoney(tien_giam_gia_vtu + tien_giam_gia_nhan_cong + tien_giam_gia_khac));
                        $(this).attr("data-val", tien_giam_gia_vtu + tien_giam_gia_nhan_cong + tien_giam_gia_khac);
                    }
                    if (field == "tien_ktru_tien_bh") {
                        $(this).html(ESUtil.formatMoney(tien_ktru_tien_bh));
                        $(this).attr("data-val", tien_ktru_tien_bh);
                    }
                    if (field == "tien_thue") {
                        $(this).html(ESUtil.formatMoney(tien_thue));
                        $(this).attr("data-val", tien_thue);
                    }
                });
            });
        }
    });
}
function layDuLieuGiamGiaPA() {
    var otArr = [];
    $("#tblHangMucGiamGiaPA tr.tblHangMucGiamGiaItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function ganDuLieuGiamGiaPA(arr) {
    ESUtil.genHTML("tblHangMucGiamGiaPATemplate", "tblHangMucGiamGiaPA", { danh_sach: arr });
}
function tinhGiamGiaPA(hang_muc, field) {
    var arr = layDuLieuGiamGiaPA();
    var check_tl_giam_gia_vtu = $("#check_tl_giam_gia_vtu_pa").is(":checked");
    var check_tien_giam_gia_vtu = $("#check_tien_giam_gia_vtu_pa").is(":checked");
    var check_tl_giam_gia_nhan_cong = $("#check_tl_giam_gia_nhan_cong_pa").is(":checked");
    var check_tien_giam_gia_nhan_cong = $("#check_tien_giam_gia_nhan_cong_pa").is(":checked");
    var check_tl_giam_gia_khac = $("#check_tl_giam_gia_khac_pa").is(":checked");
    var check_tien_giam_gia_khac = $("#check_tien_giam_gia_khac_pa").is(":checked");

    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
    if (field == "tl_giam_gia_vtu") {
        if (check_tl_giam_gia_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
                if (arr[i].tl_giam_gia_vtu > 100)
                    arr[i].tl_giam_gia_vtu = 100;
                if (arr[i].tl_giam_gia_vtu < 0)
                    arr[i].tl_giam_gia_vtu = 0;
                arr[i].tien_giam_gia_vtu = Math.round(arr[i].tl_giam_gia_vtu * parseFloat(arr[i].tien_vtu) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            }
        }
        else {
            item.tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
            if (item.tl_giam_gia_vtu > 100)
                item.tl_giam_gia_vtu = 100;
            if (item.tl_giam_gia_vtu < 0)
                item.tl_giam_gia_vtu = 0;
            item.tien_giam_gia_vtu = Math.round(item.tl_giam_gia_vtu * parseFloat(item.tien_vtu) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }
    }
    if (field == "tl_giam_gia_nhan_cong") {
        if (check_tl_giam_gia_nhan_cong) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_giam_gia_nhan_cong = parseFloat(item.tl_giam_gia_nhan_cong);
                if (arr[i].tl_giam_gia_nhan_cong > 100)
                    arr[i].tl_giam_gia_nhan_cong = 100;
                if (arr[i].tl_giam_gia_nhan_cong < 0)
                    arr[i].tl_giam_gia_nhan_cong = 0;
                arr[i].tien_giam_gia_nhan_cong = Math.round(arr[i].tl_giam_gia_nhan_cong * parseFloat(arr[i].tien_nhan_cong) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            }
        }
        else {
            item.tl_giam_gia_nhan_cong = parseFloat(item.tl_giam_gia_nhan_cong);
            if (item.tl_giam_gia_nhan_cong > 100)
                item.tl_giam_gia_nhan_cong = 100;
            if (item.tl_giam_gia_nhan_cong < 0)
                item.tl_giam_gia_nhan_cong = 0;
            item.tien_giam_gia_nhan_cong = Math.round(item.tl_giam_gia_nhan_cong * parseFloat(item.tien_nhan_cong) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }
    }
    if (field == "tl_giam_gia_khac") {
        if (check_tl_giam_gia_khac) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_giam_gia_khac = parseFloat(item.tl_giam_gia_khac);
                if (arr[i].tl_giam_gia_khac > 100)
                    arr[i].tl_giam_gia_khac = 100;
                if (arr[i].tl_giam_gia_khac < 0)
                    arr[i].tl_giam_gia_khac = 0;
                arr[i].tien_giam_gia_khac = Math.round(arr[i].tl_giam_gia_khac * parseFloat(arr[i].tien_khac) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            }
        }
        else {
            item.tl_giam_gia_khac = parseFloat(item.tl_giam_gia_khac);
            if (item.tl_giam_gia_khac > 100)
                item.tl_giam_gia_khac = 100;
            if (item.tl_giam_gia_khac < 0)
                item.tl_giam_gia_khac = 0;
            item.tien_giam_gia_khac = Math.round(item.tl_giam_gia_khac * parseFloat(item.tien_khac) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }

    }
    if (field == "tien_giam_gia_vtu") {
        if (check_tien_giam_gia_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
                if (arr[i].tien_giam_gia_vtu > parseFloat(arr[i].tien_vtu))
                    arr[i].tien_giam_gia_vtu = parseFloat(arr[i].tien_vtu);
                if (arr[i].tien_giam_gia_vtu < 0)
                    arr[i].tien_giam_gia_vtu = 0;
                arr[i].tl_giam_gia_vtu = Math.round(arr[i].tien_giam_gia_vtu * 100 / parseFloat(arr[i].tien_vtu));
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            }
        }
        else {
            item.tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
            if (item.tien_giam_gia_vtu > parseFloat(item.tien_vtu))
                item.tien_giam_gia_vtu = parseFloat(item.tien_vtu);
            if (item.tien_giam_gia_vtu < 0)
                item.tien_giam_gia_vtu = 0;
            item.tl_giam_gia_vtu = Math.round(item.tien_giam_gia_vtu * 100 / parseFloat(item.tien_vtu));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }
    }
    if (field == "tien_giam_gia_nhan_cong") {
        if (check_tien_giam_gia_nhan_cong) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
                if (arr[i].tien_giam_gia_nhan_cong > parseFloat(arr[i].tien_nhan_cong))
                    arr[i].tien_giam_gia_nhan_cong = parseFloat(arr[i].tien_nhan_cong);
                if (arr[i].tien_giam_gia_nhan_cong < 0)
                    arr[i].tien_giam_gia_nhan_cong = 0;
                arr[i].tl_giam_gia_nhan_cong = Math.round(arr[i].tien_giam_gia_nhan_cong * 100 / parseFloat(arr[i].tien_nhan_cong));
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            }
        }
        else {
            item.tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
            if (item.tien_giam_gia_nhan_cong > parseFloat(item.tien_nhan_cong))
                item.tien_giam_gia_nhan_cong = parseFloat(item.tien_nhan_cong);
            if (item.tien_giam_gia_nhan_cong < 0)
                item.tien_giam_gia_nhan_cong = 0;
            item.tl_giam_gia_nhan_cong = Math.round(item.tien_giam_gia_nhan_cong * 100 / parseFloat(item.tien_nhan_cong));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }

    }
    if (field == "tien_giam_gia_khac") {
        if (check_tien_giam_gia_khac) {
            arr[i].tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
            if (arr[i].tien_giam_gia_khac > parseFloat(arr[i].tien_khac))
                arr[i].tien_giam_gia_khac = parseFloat(arr[i].tien_khac);
            if (arr[i].tien_giam_gia_khac < 0)
                arr[i].tien_giam_gia_khac = 0;
            arr[i].tl_giam_gia_khac = Math.round(arr[i].tien_giam_gia_khac * 100 / parseFloat(arr[i].tien_khac));
            arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
        }
        else {
            item.tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
            if (item.tien_giam_gia_khac > parseFloat(item.tien_khac))
                item.tien_giam_gia_khac = parseFloat(item.tien_khac);
            if (item.tien_giam_gia_khac < 0)
                item.tien_giam_gia_khac = 0;
            item.tl_giam_gia_khac = Math.round(item.tien_giam_gia_khac * 100 / parseFloat(item.tien_khac));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
        }
    }
    ganDuLieuGiamGiaPA(arr);
    hienThiTongGiamGiaPA(arr);
}
function luuThuePA(callback = undefined) {
    var arr = layDuLieuThuePA();
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
        hm: arr
    };
    _serviceTemp.postData("/carclaim/CarCompensation/luuThongTinThuePA", obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        nhapGiamGiaPA(res => {
            var arr = res.data_info;
            ganTyLeGiamGiaKhuTruThuePA(arr);
            $("#btnTinhToanPA").trigger("click");
            xemChiTietPhuongAnGara(obj.so_id_pa);
        });
        _notifyService.success("Lưu thông tin thuế thành công");
        if (callback) {
            callback(res);
        }
    });
}
function onChangeTinhTongPA(el) {
    var tr = $(el).parent().parent();
    var td = tr.children();
    var tien_dx = 0;
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_dx") {
                tien_dx = $(this).val().replace(/[^0-9]+/g, '');
            }
        });
        $(this).find("a.combobox").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_dx") {
                tien_dx = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
        });
    });

    if (tien_dx == "") {
        tien_dx = 0;
    }
    tien_dx = parseFloat(tien_dx);

    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_dx") {
                $(this).val(ESUtil.formatMoney(tien_dx));
            }
        });
    });

    var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
    var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");

    var arrData = layDuLieuBangPATNDSTaiSan();
    arrData = chuanHoaNVCT(arrData, nhom, doi_tuong, "");
    var arrCha = arrData.where(n => n.so_id_doi_tuong_cha == "0");
    for (var i = 0; i < arrCha.length; i++) {
        if (arrCha[i].so_luong_dt > 0) {
            arrCha[i].tien_dx = arrCha[i].ds_doi_tuong.sum(n => parseFloat(n.tien_dx));

            $("#input_tien_dx_pa" + arrCha[i].so_id_doi_tuong).val(arrCha[i].tien_dx);

            $("#tong_pa_dx_" + arrCha[i].so_id_doi_tuong).html(ESUtil.formatMoney(arrCha[i].tien_dx));
        }
    }
    var tong_dx_khac = arrData.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_dx));

    $("#tong_pa_dx_khac").html(ESUtil.formatMoney(tong_dx_khac));
}
function hienThiTongGiamGia(data) {
    var tong_tien_giam_gia_vtu = 0;
    var tong_tien_giam_gia_nhan_cong = 0;
    var tong_tien_giam_gia_khac = 0;
    var tong_tong_giam_gia = 0;
    for (var i = 0; i < data.length; i++) {

        tong_tien_giam_gia_vtu += parseFloat(data[i].tien_giam_gia_vtu);
        tong_tien_giam_gia_nhan_cong += parseFloat(data[i].tien_giam_gia_nhan_cong);
        tong_tien_giam_gia_khac += parseFloat(data[i].tien_giam_gia_khac);
        tong_tong_giam_gia += parseFloat(data[i].tong_giam_gia);
    }

    $("#tong_tien_giam_gia_vtu").html(ESUtil.formatMoney(tong_tien_giam_gia_vtu));
    $("#tong_tien_giam_gia_nhan_cong").html(ESUtil.formatMoney(tong_tien_giam_gia_nhan_cong));
    $("#tong_tien_giam_gia_khac").html(ESUtil.formatMoney(tong_tien_giam_gia_khac));
    $("#tong_tong_giam_gia").html(ESUtil.formatMoney(tong_tong_giam_gia));
}
function nhapGiamGia(callback = undefined, lh_giam_gia = undefined) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val()
    };
    if (lh_giam_gia == undefined || lh_giam_gia == null || lh_giam_gia == '') {
        lh_giam_gia = "BH";
    }
    _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
    _frmModalGiamGia.getControl("lh_tt_giam_gia").setValue("S");

    _serviceTemp.postData("/carclaim/CarCompensation/layThongTinGiamGia", obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (!callback) {
            ESUtil.genHTML("tblHangMucGiamGiaTemplate", "tblHangMucGiamGia", { danh_sach: res.data_info }, () => {
                var lh_giam_gia = "BH";
                var lh_tt_giam_gia = "S";
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0 &&
                    res.data_info[0].lh_giam_gia != undefined && res.data_info[0].lh_giam_gia != null && res.data_info[0].lh_giam_gia != '' &&
                    res.data_info[0].lh_tt_giam_gia != undefined && res.data_info[0].lh_tt_giam_gia != null && res.data_info[0].lh_tt_giam_gia != '') {
                    lh_giam_gia = res.data_info[0].lh_giam_gia;
                    lh_tt_giam_gia = res.data_info[0].lh_tt_giam_gia;
                }
                _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
                _frmModalGiamGia.getControl("lh_tt_giam_gia").setValue(lh_tt_giam_gia);

                hienThiTongGiamGia(res.data_info);
            });
            _modalGiamGia.show();
            return;
        }
        callback(res);
    });
}
function layDuLieuGiamGia() {
    var otArr = [];
    $("#tblHangMucGiamGia tr.tblHangMucGiamGiaItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuThue() {
    var otArr = [];
    $("#tblHangMucThue tr.tblHangMucThueItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuThuePA() {
    var otArr = [];
    $("#tblHangMucThuePA tr.tblHangMucThueItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function hienThiTongThue(data) {
    var tong_tien_thue_vtu = 0;
    var tong_tien_thue_nhan_cong = 0;
    var tong_tien_thue_khac = 0;
    var tong_tong_thue = 0;
    for (var i = 0; i < data.length; i++) {

        tong_tien_thue_vtu += parseFloat(data[i].tien_thue_vtu);
        tong_tien_thue_nhan_cong += parseFloat(data[i].tien_thue_nhan_cong);
        tong_tien_thue_khac += parseFloat(data[i].tien_thue_khac);
        tong_tong_thue += parseFloat(data[i].tong_thue);
    }

    $("#tong_tien_thue_vtu").html(ESUtil.formatMoney(tong_tien_thue_vtu));
    $("#tong_tien_thue_nhan_cong").html(ESUtil.formatMoney(tong_tien_thue_nhan_cong));
    $("#tong_tien_thue_khac").html(ESUtil.formatMoney(tong_tien_thue_khac));
    $("#tong_tong_thue").html(ESUtil.formatMoney(tong_tong_thue));
}
function hienThiTongThuePA(data) {
    var tong_tien_thue_vtu = 0;
    var tong_tien_thue_nhan_cong = 0;
    var tong_tien_thue_khac = 0;
    var tong_tong_thue = 0;
    for (var i = 0; i < data.length; i++) {

        tong_tien_thue_vtu += parseFloat(data[i].tien_thue_vtu);
        tong_tien_thue_nhan_cong += parseFloat(data[i].tien_thue_nhan_cong);
        tong_tien_thue_khac += parseFloat(data[i].tien_thue_khac);
        tong_tong_thue += parseFloat(data[i].tong_thue);
    }

    $("#tong_tien_thue_vtu_pa").html(ESUtil.formatMoney(tong_tien_thue_vtu));
    $("#tong_tien_thue_nhan_cong_pa").html(ESUtil.formatMoney(tong_tien_thue_nhan_cong));
    $("#tong_tien_thue_khac_pa").html(ESUtil.formatMoney(tong_tien_thue_khac));
    $("#tong_tong_thue_pa").html(ESUtil.formatMoney(tong_tong_thue));
}
function nhapThuePA() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
        lh_nv: $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv")
    };
    _serviceTemp.postData("/carclaim/CarCompensation/layThuePA", obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tblHangMucThuePATemplate", "tblHangMucThuePA", { danh_sach: res.data_info }, () => {
            hienThiTongThuePA(res.data_info);
        });
        _modalThuePA.show();
    });
}
function layDuLieuKhauTruPA() {
    var otArr = [];
    $("#tblKhauTruPA tr.tblKhauTruItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function ganDuLieuGiamGia(arr) {
    ESUtil.genHTML("tblHangMucGiamGiaTemplate", "tblHangMucGiamGia", { danh_sach: arr }, () => {
        var lh_giam_gia = "BH";
        var lh_tt_giam_gia = "S";
        if (arr != undefined && arr != null && arr.length > 0 &&
            arr[0].lh_giam_gia != undefined && arr[0].lh_giam_gia != null && arr[0].lh_giam_gia != '' &&
            arr[0].lh_tt_giam_gia != undefined && arr[0].lh_tt_giam_gia != null && arr[0].lh_tt_giam_gia != '') {
            lh_giam_gia = arr[0].lh_giam_gia;
            lh_tt_giam_gia = arr[0].lh_tt_giam_gia;
        }
        _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
        _frmModalGiamGia.getControl("lh_tt_giam_gia").setValue(lh_tt_giam_gia);

    });
}
function ganDuLieuThuePA(arr) {
    ESUtil.genHTML("tblHangMucThuePATemplate", "tblHangMucThuePA", { danh_sach: arr });
}
function ganDuLieuKhauTruPA(arr) {
    ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: arr });
}
function tinhThuePA(hang_muc, field) {
    var arr = layDuLieuThuePA();
    var check_tl_thue_vtu = $("#check_tl_thue_vtu_pa").is(":checked");
    var check_tien_thue_vtu = $("#check_tien_thue_vtu_pa").is(":checked");
    var check_tl_thue_nhan_cong = $("#check_tl_thue_nhan_cong_pa").is(":checked");
    var check_tien_thue_nhan_cong = $("#check_tien_thue_nhan_cong_pa").is(":checked");
    var check_tl_thue_khac = $("#check_tl_thue_khac_pa").is(":checked");
    var check_tien_thue_khac = $("#check_tien_thue_khac_pa").is(":checked");

    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
    if (field == "tl_thue_vtu") {
        if (check_tl_thue_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_thue_vtu = parseFloat(item.tl_thue_vtu);
                if (arr[i].tl_thue_vtu > 100)
                    arr[i].tl_thue_vtu = 100;
                if (arr[i].tl_thue_vtu < 0)
                    arr[i].tl_thue_vtu = 0;
                arr[i].tien_thue_vtu = Math.round(arr[i].tl_thue_vtu * parseFloat(arr[i].tien_vtu_duyet) * 100) / 10000;
                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
            }
        }
        else {
            item.tl_thue_vtu = parseFloat(item.tl_thue_vtu);
            if (item.tl_thue_vtu > 100)
                item.tl_thue_vtu = 100;
            if (item.tl_thue_vtu < 0)
                item.tl_thue_vtu = 0;
            item.tien_thue_vtu = Math.round(item.tl_thue_vtu * parseFloat(item.tien_vtu_duyet) * 100) / 10000;
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }
    }
    if (field == "tl_thue_nhan_cong") {
        if (check_tl_thue_nhan_cong) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_thue_nhan_cong = parseFloat(item.tl_thue_nhan_cong);
                if (arr[i].tl_thue_nhan_cong > 100)
                    arr[i].tl_thue_nhan_cong = 100;
                if (arr[i].tl_thue_nhan_cong < 0)
                    arr[i].tl_thue_nhan_cong = 0;
                arr[i].tien_thue_nhan_cong = Math.round(arr[i].tl_thue_nhan_cong * parseFloat(arr[i].tien_nhan_cong_duyet) * 100) / 10000;
                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
            }
        }
        else {
            item.tl_thue_nhan_cong = parseFloat(item.tl_thue_nhan_cong);
            if (item.tl_thue_nhan_cong > 100)
                item.tl_thue_nhan_cong = 100;
            if (item.tl_thue_nhan_cong < 0)
                item.tl_thue_nhan_cong = 0;
            item.tien_thue_nhan_cong = Math.round(item.tl_thue_nhan_cong * parseFloat(item.tien_nhan_cong_duyet) * 100) / 10000;
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }
    }
    if (field == "tl_thue_khac") {
        if (check_tl_thue_khac) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_thue_khac = parseFloat(item.tl_thue_khac);
                if (arr[i].tl_thue_khac > 100)
                    arr[i].tl_thue_khac = 100;
                if (arr[i].tl_thue_khac < 0)
                    arr[i].tl_thue_khac = 0;
                arr[i].tien_thue_khac = Math.round(arr[i].tl_thue_khac * parseFloat(arr[i].tien_khac_duyet) * 100) / 10000;
                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
            }
        }
        else {
            item.tl_thue_khac = parseFloat(item.tl_thue_khac);
            if (item.tl_thue_khac > 100)
                item.tl_thue_khac = 100;
            if (item.tl_thue_khac < 0)
                item.tl_thue_khac = 0;
            item.tien_thue_khac = Math.round(item.tl_thue_khac * parseFloat(item.tien_khac_duyet) * 100) / 10000;
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }

    }
    if (field == "tien_thue_vtu") {
        if (check_tien_thue_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_thue_vtu = parseFloat(item.tien_thue_vtu);
                if (arr[i].tien_thue_vtu > parseFloat(arr[i].tien_vtu_duyet))
                    arr[i].tien_thue_vtu = parseFloat(arr[i].tien_vtu_duyet);
                if (arr[i].tien_thue_vtu < 0)
                    arr[i].tien_thue_vtu = 0;
                arr[i].tl_thue_vtu = Math.round(arr[i].tien_thue_vtu * 100 / parseFloat(arr[i].tien_vtu_duyet));
                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
            }
        }
        else {
            item.tien_thue_vtu = parseFloat(item.tien_thue_vtu);
            if (item.tien_thue_vtu > parseFloat(item.tien_vtu_duyet))
                item.tien_thue_vtu = parseFloat(item.tien_vtu_duyet);
            if (item.tien_thue_vtu < 0)
                item.tien_thue_vtu = 0;
            item.tl_thue_vtu = Math.round(item.tien_thue_vtu * 100 / parseFloat(item.tien_vtu_duyet));
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }
    }
    if (field == "tien_thue_nhan_cong") {
        if (check_tien_thue_nhan_cong) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_thue_nhan_cong = parseFloat(item.tien_thue_nhan_cong);
                if (arr[i].tien_thue_nhan_cong > parseFloat(arr[i].tien_thue_duyet))
                    arr[i].tien_thue_nhan_cong = parseFloat(arr[i].tien_thue_duyet);
                if (arr[i].tien_thue_nhan_cong < 0)
                    arr[i].tien_thue_nhan_cong = 0;
                arr[i].tl_thue_nhan_cong = Math.round(arr[i].tien_thue_nhan_cong * 100 / parseFloat(arr[i].tien_thue_duyet));
                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
            }
        }
        else {
            item.tien_thue_nhan_cong = parseFloat(item.tien_thue_nhan_cong);
            if (item.tien_thue_nhan_cong > parseFloat(item.tien_nhan_cong_duyet))
                item.tien_thue_nhan_cong = parseFloat(item.tien_nhan_cong_duyet);
            if (item.tien_thue_nhan_cong < 0)
                item.tien_thue_nhan_cong = 0;
            item.tl_thue_nhan_cong = Math.round(item.tien_thue_nhan_cong * 100 / parseFloat(item.tien_nhan_cong_duyet));
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }
    }
    if (field == "tien_thue_khac") {
        if (check_tien_thue_khac) {
            arr[i].tien_thue_khac = parseFloat(item.tien_thue_khac);
            if (arr[i].tien_thue_khac > parseFloat(arr[i].tien_khac_duyet))
                arr[i].tien_thue_khac = parseFloat(arr[i].tien_khac_duyet);
            if (arr[i].tien_thue_khac < 0)
                arr[i].tien_thue_khac = 0;
            arr[i].tl_thue_khac = Math.round(arr[i].tien_thue_khac * 100 / parseFloat(arr[i].tien_khac_duyet));
            arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
        }
        else {
            item.tien_thue_khac = parseFloat(item.tien_thue_khac);
            if (item.tien_thue_khac > parseFloat(item.tien_khac_duyet))
                item.tien_thue_khac = parseFloat(item.tien_khac_duyet);
            if (item.tien_thue_khac < 0)
                item.tien_thue_khac = 0;
            item.tl_thue_khac = Math.round(item.tien_thue_khac * 100 / parseFloat(item.tien_khac_duyet));
            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
        }
    }
    ganDuLieuThuePA(arr);
    hienThiTongThuePA(arr);
}
function tinhKhauTruPA(hang_muc, field) {
    var arr = layDuLieuKhauTruPA();
    var check_tl_ktru_tien_bh = $("#check_tl_ktru_tien_bh_pa").is(":checked");
    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
    if (field == "tl_ktru_tien_bh") {
        if (check_tl_ktru_tien_bh) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_ktru_tien_bh = parseFloat(item.tl_ktru_tien_bh);
                if (arr[i].tl_ktru_tien_bh > 100)
                    arr[i].tl_ktru_tien_bh = 100;
                if (arr[i].tl_ktru_tien_bh < 0)
                    arr[i].tl_ktru_tien_bh = 0;
            }
        }
    }
    ganDuLieuKhauTruPA(arr);
}
function luuKhauTruPA(callback = undefined) {
    if (_frmKhauTruPA.isValid()) {
        var arr = layDuLieuKhauTruPA();
        var data = _frmKhauTruPA.getJsonData();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            vu_tt: data.vu_tt,
            so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
            tien_ktru_tien_bh: data.tien_ktru_tien_bh,
            hm: arr
        };
        if (obj.vu_tt == undefined || obj.vu_tt == null || obj.vu_tt == "" || obj.vu_tt == "0") {
            _notifyService.error("Bạn chưa chọn vụ tổn thất");
            return;
        }
        if (obj.tien_ktru_tien_bh == undefined || obj.tien_ktru_tien_bh == null || obj.tien_ktru_tien_bh == "" || obj.tien_ktru_tien_bh < 0) {
            _notifyService.error("Số tiền khấu trừ phải lớn hơn hoặc bằng 0");
            return;
        }
        _serviceTemp.postData("/carclaim/CarCompensation/luuThongTinKhauTruPA", obj).then(res => {
            if (res.state_info.status != 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            nhapGiamGiaPA(res => {
                var arr = res.data_info;
                ganTyLeGiamGiaKhuTruThuePA(arr);
                $("#btnTinhToanPA").trigger("click");
                xemChiTietPhuongAnGara(obj.so_id_pa);
            });
            _notifyService.success("Lưu thông tin khấu trừ thành công");
            if (callback) {
                callback(res);
            }
        });
    }
}
function getCheckedPhuongAn() {
    var arr = [];
    $.each($('#tblDsPhuongAnBody tr').find('td input.dspa:checked'), (index, item) => {
        var obj = {
            so_id_pa: $(item).attr('data-val')
        }
        if (obj.so_id_pa != '' && obj.so_id_pa != undefined) {
            arr.push(obj);
        }
    });
    return arr;
}
function chonPhuongAn(el) {
    if ($(el).is(":checked")) {
        var objData = {};
        objData.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        objData.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        objData.so_id_pa = $(el).attr("data-val");
        objData.chon = 'D';
        _serviceTemp.postData("/carclaim/CarCompensation/chonPhuongAn", objData).then(res => {
            if (res.state_info.status == "OK") {
                reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
                _notifyService.success("Chọn phương án thành công");
                xemChiTietPhuongAnGara(objData.so_id_pa);
            } else {
                $(el).prop("checked", false);
                _notifyService.error(res.state_info.message_body);
            }
        });
    } else {
        var objData = {};
        objData.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        objData.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        objData.so_id_pa = $(el).attr("data-val");
        objData.chon = 'C';
        _serviceTemp.postData("/carclaim/CarCompensation/chonPhuongAn", objData).then(res1 => {
            if (res1.state_info.status == "OK") {
                reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
                _notifyService.success("Bỏ chọn phương án thành công");
            } else {
                $(el).prop("checked", true);
                _notifyService.error(res1.state_info.message_body);
            }
        });
    }
}
function nhapKhauTruPA() {
    _frmKhauTruPA.resetForm();
    _frmKhauTruPA.clearErrorMessage();
    _frmKhauTruPA.getControl("vu_tt").setDataSource(ho_so_chi_tiet.data_info.ds_vu_tt, "ten", "ma");
    if (ho_so_chi_tiet.data_info.ds_vu_tt.length > 0) {
        _frmKhauTruPA.getControl("vu_tt").setValue(ho_so_chi_tiet.data_info.ds_vu_tt[0].ma);
        _frmKhauTruPA.getControl("vu_tt").trigger("select2:select");
        _modalKhauTruPA.show();
    } else {
        _notifyService.error("Chưa có vụ tổn thất nào");
    }
}
function hienThiTongPA(obj) {
    $(".tinhToanNVTienDuyetGiaPA").html("0");
    $(".tinhToanNVTienBoiThuongChuaVATPA").html("0");
    $(".tinhToanNVTongThuePA").html("0");
    $(".tinhToanNVTienBoiThuongBaoGomVATPA").html("0");
    $(".tinhToanNVTienKHChiTraPA").html("0");
    $(".tinhToanNVTienSuaChuaChuaVATPA").html("0");
    $(".tinhToanNVTienThuePA").html("0");
    $(".tinhToanNVTienChiPhiKhacChuaVATPA").html("0");
    $(".tinhToanNVTienThueChiPhiKhacPA").html("0");

    $("#tinhToanPAHSTongBoiThuong").html("0");
    $("#tinhToanPAHSTongMienThuong").html("0");
    $("#tinhToanPAHSTongGiamTruKhac").html("0");
    $("#tinhToanPAHSConLai").html("0");
    $("#tinhToanPAHSTongThue").html("0");
    $("#tinhToanPAHSChiPhiKhac").html("0");
    $("#tinhToanPAHSTongCong").html("0");

    _frmTinhToanBoiThuongPA.getControl("thue").setValue("0");
    if (obj != null) {
        var tong_bt = obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac;
        $(".tinhToanNVTienDuyetGiaPA").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia));
        $(".tinhToanNVTienBoiThuongChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac));//Tiền bồi thường chưa VAT
        $(".tinhToanNVTongThuePA").html(ESUtil.formatMoney(obj.kq.tien_thue + obj.kq.tien_thue_chi_phi_khac));
        $(".tinhToanNVTienBoiThuongBaoGomVATPA").html(ESUtil.formatMoney(tong_bt));
        $(".tinhToanNVTienKHChiTraPA").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia - tong_bt));
        $(".tinhToanNVTienSuaChuaChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong));//Tiền sửa chữa chưa vat
        $(".tinhToanNVTienThuePA").html(ESUtil.formatMoney(obj.kq.tien_thue));
        $(".tinhToanNVTienChiPhiKhacChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_chi_phi_khac));//Chi phí khác chưa vat
        $(".tinhToanNVTienThueChiPhiKhacPA").html(ESUtil.formatMoney(obj.kq.tien_thue_chi_phi_khac));


        _frmTinhToanBoiThuongPA.getControl("thue").setValue(ESUtil.formatMoney(obj.kq.tien_thue));
        _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(ESUtil.formatMoney(obj.kq.tien_mien_thuong_sau_thue));
        var tien_boi_thuong_hs = obj.tong.tien_duyet_gia - obj.tong.tien_bao_hiem - obj.tong.tien_khau_hao - obj.tong.tien_giam_tru;
        tien_boi_thuong_hs = tien_boi_thuong_hs < 0 ? 0 : tien_boi_thuong_hs;
        $("#tinhToanPAHSTongBoiThuong").html(ESUtil.formatMoney(tien_boi_thuong_hs));
        $("#tinhToanPAHSTongMienThuong").html(ESUtil.formatMoney(obj.tong.tien_mien_thuong));
        $("#tinhToanPAHSTongGiamTruKhac").html(ESUtil.formatMoney(obj.tong.tien_giam_tru_khac));
        var con_lai_hs = tien_boi_thuong_hs - obj.tong.tien_mien_thuong - obj.tong.tien_giam_tru_khac;
        con_lai_hs = con_lai_hs < 0 ? 0 : con_lai_hs;
        $("#tinhToanPAHSConLai").html(ESUtil.formatMoney(con_lai_hs));
        $("#tinhToanPAHSTongThue").html(ESUtil.formatMoney(obj.tong.tien_thue));
        $("#tinhToanPAHSChiPhiKhac").html(ESUtil.formatMoney(obj.tong.chi_phi_khac));
        $("#tinhToanPAHSTongCong").html(ESUtil.formatMoney(con_lai_hs + obj.tong.tien_thue + obj.tong.chi_phi_khac));
    }
}
function getDataTableCPKhac() {
    var otArr = [];
    $("#tblTinhToanCPKhac tr.tblTinhToanCPKhacItem").each(function (e) {
        var json = {
            so_id: 0,
            so_id_doi_tuong: 0,
            ten_doi_tuong: "",
            bt: 0,
            ma_chi_phi: "",
            ten: "",
            so_tien: 0,
            pt_bao_hiem: 0,
            pt_giam_tru: 0,
            tl_thue: 0,
            tien_bh: 0,
            tien_thue: 0,
            tong_cong: 0
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr('data-val');
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        json.stt = parseFloat(json.stt);
        json.bt = parseFloat(json.bt);
        json.so_id = parseFloat(json.so_id);
        json.so_tien = parseFloat(json.so_tien);
        json.pt_bao_hiem = parseFloat(json.pt_bao_hiem);
        json.pt_giam_tru = parseFloat(json.pt_giam_tru);
        json.tien_bh = parseFloat(json.tien_bh);
        json.tl_thue = parseFloat(json.tl_thue);
        json.tien_thue = parseFloat(json.tien_thue);
        json.tong_tien = 0;
        otArr.push(json);
    });
    return otArr;
}
function tinhToanCPKhac(el) {
    var arr = getDataTableCPKhac();
    if (arr != undefined && arr != null && arr.length > 0) {
        var ptTrachNhiemChecked = $("#modalTinhToanCPKhacTrachNhiem").is(":checked");
        var ptGiamTruChecked = $("#modalTinhToanCPKhacGiamTru").is(":checked");
        var tlThueChecked = $("#modalTinhToanCPKhacTLThue").is(":checked");
        if (el != undefined) {
            var name = $(el).attr("data-field");
            var val = parseFloat($(el).val().replace(/[^0-9]+/g, ''));
            if (val > 100)
                val = 100;
            if (val < 0)
                val = 0;
        }

        for (var i = 0; i < arr.length; i++) {
            if (el != undefined && name == "pt_bao_hiem" && ptTrachNhiemChecked)
                arr[i].pt_bao_hiem = val;
            if (el != undefined && name == "pt_giam_tru" && ptGiamTruChecked)
                arr[i].pt_giam_tru = val;
            if (el != undefined && name == "tl_thue" && tlThueChecked)
                arr[i].tl_thue = val;

            var tien_con_lai = arr[i].so_tien;
            var tien_con_lai = tien_con_lai - (100 - arr[i].pt_bao_hiem) * tien_con_lai / 100;
            tien_con_lai = tien_con_lai - arr[i].pt_giam_tru * tien_con_lai / 100;
            arr[i].tien_bh = Math.round(tien_con_lai);
            arr[i].tien_thue = Math.round(tien_con_lai * arr[i].tl_thue / 100);
            arr[i].tong_tien = Math.round(arr[i].tien_bh + arr[i].tien_thue);
        }
    }
    ESUtil.genHTML("tblTinhToanCPKhacTemplate", "tblTinhToanCPKhac", { data: arr }, () => {

    });
}
function luuTinhToanCPKhac(callback) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        cp: getDataTableCPKhac()
    };
    _serviceTemp.postData("/carclaim/carclaimcommon/luuTinhToanCPKhac", obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        xemChiTietPhuongAnGara($("#tblDsPhuongAnBody td.dspa.text-danger").attr("data-so-id-pa"));
        _notifyService.success("Lưu thông tin chi phí thành công");
        if (callback) {
            callback(res);
        }
    });
}
function showGhiChu(el) {
    _popoverGhiChu.options = { placement: "bottom bottom-right" };
    $("#divGhiChu_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDung").val(val);
    _popoverGhiChu.showWithPosition(el);
}
function showNguyenNhan(el) {
    _popoverNguyenNhan.options = { placement: "bottom bottom-right" };
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    var arr = val.split(",");
    $("#divNguyenNhan .modalChonNguyenNhanGiamTruItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#divNguyenNhan .modalChonNguyenNhanGiamTruItem[value='" + arr[i] + "']").prop("checked", true);
    }
    _popoverNguyenNhan.showWithPosition(el);
}
function showDKBS(el) {
    _popoverDKBS.options = { placement: "bottom bottom-right" };
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    var arr = val.split(",");
    $("#divDKBS .hang_muc_dkbs").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#divDKBS .hang_muc_dkbs[value='" + arr[i] + "']").prop("checked", true);
    }
    _popoverDKBS.showWithPosition(el);
}
function xemThongTinBoiThuongVienDanhGiaHoSoBoiThuong(el) {
    _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("dvi_nhan").setDataSource(ho_so_chi_tiet.data_info.dvi_nhan_hdon, "ten_dvi_nhan", "dvi_nhan", "Chọn đơn vị nhận hóa đơn", "");
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv"),
        pm: "BT"
    }
    _serviceTemp.postData("/carclaim/CarCompensation/xemthongTinChiTietBTVDanhGiaHSBT", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        bindFormBoiThuongVienDanhGiaHoSoBoiThuong(res.data_info);
        _modalBoiThuongVienDanhGiaHoSoBoiThuong.show();
    });
}
function luuThongTinBTVDanhGiaHoSoBoiThuong(callback = undefined) {
    if (!_frmBoiThuongVienDanhGiaHoSoBoiThuong.isValid()) {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    }
    var obj = layFormBoiThuongVienDanhGiaHoSoBoiThuong();
    if (obj != undefined && obj != null) {
        _serviceTemp.postData("/carclaim/CarCompensation/luuThongTinBTVDanhGiaHSBT", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin thành công");
            var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
            _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                loadThonginBoiThuongVienDanhGiaHoSoBoiThuong(ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault());
            });
            if (callback) {
                callback();
            }
        });
    }
}
function layFormBoiThuongVienDanhGiaHoSoBoiThuong() {
    var obj = _frmBoiThuongVienDanhGiaHoSoBoiThuong.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.lh_nv = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv");
    obj.ho_so_day_du = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#day_du_hop_le").is(":checked") ? "D" : "K";
    obj.nguyen_nhan = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_nguyen_nhan").is(":checked") ? "D" : "K";
    obj.pham_vi_tt = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_pham_vi_tt").is(":checked") ? "C" : "K";
    obj.gt_tham_gia_bh = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_gt_tham_gia_bh").is(":checked") ? "D" : "K";
    obj.tuan_thu = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_tuan_thu").is(":checked") ? "C" : "K";
    obj.thoi_han_khai_bao = $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_thoi_han_khai_bao").is(":checked") ? "D" : "K";
    obj.trang_thai = "D";
    if (obj.danh_gia == "" || obj.danh_gia == null || obj.danh_gia == undefined) {
        _notifyService.error("Bạn chưa nhập đánh giá của bồi thường viên");
        return;
    }
    if (obj.de_xuat == "" || obj.de_xuat == null || obj.de_xuat == undefined) {
        _notifyService.error("Bạn chưa nhập đề xuất của bồi thường viên");
        return;
    }
    if (obj.dvi_nhan == "" || obj.dvi_nhan == null || obj.dvi_nhan == undefined) {
        _notifyService.error("Bạn chưa chọn đơn vị nhận hóa đơn");
        return;
    }
    if (obj.ho_so_day_du == "K" && obj.nguyen_nhan == "K" && obj.pham_vi_tt == "K" && obj.gt_tham_gia_bh == "K" && obj.tuan_thu == "K" && obj.thoi_han_khai_bao == "K") {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    } else {
        return obj;
    }
}
function bindFormBoiThuongVienDanhGiaHoSoBoiThuong(obj) {
    _frmBoiThuongVienDanhGiaHoSoBoiThuong.resetForm();
    _frmBoiThuongVienDanhGiaHoSoBoiThuong.clearErrorMessage();
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='ho_so_day_du']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='nguyen_nhan']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='pham_vi_tt']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='gt_tham_gia_bh']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='tuan_thu']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='thoi_han_khai_bao']").prop("checked", false);
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong #phan_tram_gt_tham_gia_bh").html("");
    $("#frmBoiThuongVienDanhGiaHoSoBoiThuong #phan_tram_che_tai").html("");
    _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("dvi_nhan").setValue(ho_so_chi_tiet.data_info.ho_so.dvi_nhan_hdon);
    _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("dvi_nhan").trigger("select2:select");
    if (obj != undefined && obj != null) {
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "D")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#day_du_hop_le").prop("checked", true);
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_day_du_hop_le").prop("checked", true);

        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "D")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_nguyen_nhan").prop("checked", true);
        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_dung_nguyen_nhan").prop("checked", true);

        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "C")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_pham_vi_tt").prop("checked", true);
        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_pham_vi_tt").prop("checked", true);

        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "D")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_gt_tham_gia_bh").prop("checked", true);
        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_dung_gt_tham_gia_bh").prop("checked", true);

        if (obj.tuan_thu != null && obj.tuan_thu == "C")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_tuan_thu").prop("checked", true);
        if (obj.tuan_thu != null && obj.tuan_thu == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_tuan_thu").prop("checked", true);

        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "D")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_thoi_han_khai_bao").prop("checked", true);
        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "K")
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#ko_dung_thoi_han_khai_bao").prop("checked", true);

        _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("pt_gt_tham_gia_bh").setValue(obj.pt_gt_tham_gia_bh);
        _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("pt_che_tai").setValue(obj.pt_che_tai);
        _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("danh_gia").val(obj.danh_gia);
        _frmBoiThuongVienDanhGiaHoSoBoiThuong.getControl("de_xuat").val(obj.de_xuat);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong #phan_tram_gt_tham_gia_bh").html(obj.pt_gt_tham_gia_bh);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong #phan_tram_che_tai").html(obj.pt_che_tai);
    } else {
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#day_du_hop_le").prop("checked", true);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_nguyen_nhan").prop("checked", true);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_pham_vi_tt").prop("checked", true);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_gt_tham_gia_bh").prop("checked", true);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#co_tuan_thu").prop("checked", true);
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input#dung_thoi_han_khai_bao").prop("checked", true);
    }
}
function loadThonginBoiThuongVienDanhGiaHoSoBoiThuong(arr) {
    $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").removeClass("bg-danh-gia");
    $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").html("Bồi thường viên chưa đánh giá");
    $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").addClass("bg-chua-dg");

    if (arr != null && arr.trang_thai == "D" && arr.de_xuat != null && arr.danh_gia != null && arr.dvi_nhan_hdon != null) {
        $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").html("Đã thực hiện đánh giá");
        $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").removeClass("bg-chua-dg");
        $("#divInputBoiThuongVienDanhGiaHoSoBoiThuong").addClass("bg-danh-gia");
    }
}
function ModalLapPhuongAnSuaChuaService() {
    this.modalId = "modalLapPhuongAnSuaChua";
    this.show = function (obj, callback = undefined) {
        var _instance = this;
        _instance.data = obj;
        lapPASC(obj, res => {
            loadThonginBoiThuongVienDanhGiaHoSoBoiThuong(ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault());
            _modalLapPhuongAnSuaChua.show();
        });
    };
    this.OnInit = function () {
        _frmTinhToanBoiThuongPA.getControl("mien_thuong").addEventChange(val => {
            tinhToanPA();
        });
        _frmTinhToanBoiThuongPA.getControl("khau_tru").addEventChange(val => {
            _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue("0");
            if (val == "C") {
                _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(ESUtil.formatMoney(ho_so_chi_tiet.data_info.ho_so.mien_thuong));
            }
            tinhToanPA();
        });
        _frmTinhToanBoiThuongPA.getControl("tl_thue").addEventChange(val => {
            tinhToanPA();
        });
        _frmTinhToanBoiThuongPA.getControl("giam_tru_khac").addEventChange(val => {
            tinhToanPA();
        });
        _frmTinhToanBoiThuongPA.getControl("loai_ts").addEventChange(val => {
            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly();
            _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly();
            _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly();
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");

            $("#btnLuuPASC").addClass("d-none");
            $("#btnLuuPASC_NV").addClass("d-none");
            $("#divInputMucMienThuongPA").removeClass("pl-0");
            $(".divPhuongAnDanhGiaItem").addClass("d-none");

            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_pa: $("#tblDsPhuongAnBody td.text-danger").attr("data-so-id-pa"),
                lh_nv: $("#navPhuongAnNghiepVu li.active").attr("data-lhnv"),
                loai_ts: val
            };
            var so_id_pa = obj.so_id_pa;

            _serviceTemp.postData("/carclaim/CarCompensation/xemChiTietPhuongAn", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var phuong_an = res.data_info.phuong_an;
                var data = res.data_info.data;
                if (phuong_an == null) {
                    _notifyService.error("Không xác định được phương án");
                    return;
                }
                _frmTinhToanBoiThuongPA.resetForm();
                _frmTinhToanBoiThuongPA.clearErrorMessage();
                _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue(val);

                _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(phuong_an.so_id_pa);
                _frmTinhToanBoiThuongPA.getControl("ma_gara").val(phuong_an.ma_gara);
                _frmTinhToanBoiThuongPA.getControl("so_vu").setValue(phuong_an.so_vu_tt);
                _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(phuong_an.mien_thuong);
                _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue(phuong_an.mien_thuong / phuong_an.so_vu_tt);
                _frmTinhToanBoiThuongPA.getControl("khau_tru").setValue(phuong_an.khau_tru);
                _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly();

                _frmTinhToanBoiThuongPA.getControl("thue").setValue(phuong_an.tien_thue_sua_chua);
                _frmTinhToanBoiThuongPA.getControl("giam_tru_khac").setValue(phuong_an.tien_giam_tru_khac);

                if (val == "XE") {
                    _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly(false);
                    _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly(false);
                    _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly(false);
                    if (phuong_an.pt_ad_thue_mien_thuong == "THM") {
                        _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
                    }
                    else {
                        _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue(phuong_an.tl_thue_mien_thuong);
                    }
                    /*Tài sản xe*/
                    $('#btnLuuPASC').removeClass("d-none");
                    $("#divPhuongAnVCX").removeClass("d-none");
                    _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly(false);
                    ESUtil.genHTML("tblPhuongAnCT_template", "tblPhuongAnCT", { data: data }, () => {
                        $(".tblPhuongAnCTGiamGia_T").addClass("d-none");
                        $(".tblPhuongAnCTGiamGia_S").removeClass("d-none");
                        if (data != undefined && data != null && data.length > 0 &&
                            data[0].lh_tt_giam_gia != undefined && data[0].lh_tt_giam_gia != null && data[0].lh_tt_giam_gia == "T") {
                            $(".tblPhuongAnCTGiamGia_T").removeClass("d-none");
                            $(".tblPhuongAnCTGiamGia_S").addClass("d-none");
                        }
                        bindEventPACT();
                        tinhToanPA();
                    });
                }

                if (val == "KHAC") {
                    $("#divInputMucMienThuongPA").addClass("pl-0");
                    _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("KHAC");

                    $('#btnLuuPASC_NV').removeClass("d-none");
                    $("#divPhuongAnTNDSTaiSan").removeClass("d-none");
                    var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
                    ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
                    var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
                    ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                        $("#modalMucDoTTDanhSach .single_checked").click(function () {
                            $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                            $(this).prop("checked", true);
                        });
                    });

                    var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
                    var arr_tong_hop = [];
                    $.each(arr_pa, (index, item) => {
                        var obj_tong_hop = item;
                        arr_tong_hop.push(obj_tong_hop);
                    });

                    if (arr_tong_hop.length > 0) {
                        _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
                        _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
                    }
                    _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
                    ESUtil.genHTML("modalChiTietPhuongAnTNDS_TAI_SANTemplate", "modalChiTietPhuongAnTNDS_TAI_SAN", { danh_sach: arr_tong_hop }, () => {
                        var tiendx_khac = arr_tong_hop.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_dx));
                        var tienkh_khac = arr_tong_hop.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_khau_hao));
                        var tiengt_khac = arr_tong_hop.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_giam_tru));
                        $("#tong_pa_dx_khac").html(ESUtil.formatMoney(tiendx_khac));
                        $("#tong_pa_khau_hao_khac").html(ESUtil.formatMoney(tienkh_khac));
                        $("#tong_pa_giam_tru_khac").html(ESUtil.formatMoney(tiengt_khac));
                        bindEventPACT(() => {
                            tinhToanPA();
                        });
                    });
                }
            });
        });
        _frmKhauTruPA.getControl("vu_tt").addEventChange(val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
                vu_tt: val
            }
            _frmKhauTruPA.getControl("tien_ktru_tien_bh").setValue("0");
            ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: [] });
            _serviceTemp.postData("/carclaim/CarCompensation/layKhauTruPA", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (res.data_info.vu_tt != null) {
                    _frmKhauTruPA.getControl("tien_ktru_tien_bh").setValue(ESUtil.formatMoney(res.data_info.vu_tt.tien_ktru_tien_bh));
                }
                ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: res.data_info.ktru });
            });
        });
        $("#btnLapPASC_BG").click(function () {
            lapPASC(res => {
                $("#CarCompensationQuotation").modal("hide");
                _modalLapPhuongAnSuaChua.show();
            });
        });
        $("#btnTrinhPA").click(function () {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
                nghiep_vu: "XE",
                pm: CONSTANT_PM,
                remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                hanh_dong: "PHUONG_AN"
            }
            if (ho_so_chi_tiet.data_info.lh_nv.where(n => n.nhom != NHOM_LHNV.XE).length > 0) {
                obj.remove_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
                obj.create_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
                obj.nghiep_vu_khac = true;
            }
            if (ESCS_MA_DOI_TAC == "OPES") {
                obj.remove_file = "OPES_DE_XUAT_PHUONG_AN_SC";
                obj.create_file = "OPES_DE_XUAT_PHUONG_AN_SC";
            }
            _modalTrinhDuyetService.show(obj, (type, res) => {
                ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
                var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
                if (trang_thai != null) {
                    ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
                }
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                _modalLapPhuongAnSuaChua.hide();
            });
        });
        $("#btnTrinhPANghiepVuKhac").click(function () {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
                nghiep_vu: "XE",
                pm: CONSTANT_PM,
                remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                hanh_dong: "PHUONG_AN"
            }
            _modalTrinhDuyetService.show(obj, (type, res) => {
                ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
                var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
                if (trang_thai != null) {
                    ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
                }
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                _modalLapPhuongAnSuaChua.hide();
            });
        });
        $("#btnTrinhPABT").click(function () {
            var arrDanhGiaBTV = ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault();
            if (arrDanhGiaBTV == null || arrDanhGiaBTV.trang_thai != "D") {
                _notifyService.error("Bồi thường viên chưa đánh giá");
                return;
            }
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
                nghiep_vu: "XE",
                pm: CONSTANT_PM,
                remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
                hanh_dong: "PHUONG_AN_BOI_THUONG_BAO_LANH"
            }
            if (ho_so_chi_tiet.data_info.lh_nv.where(n => n.nhom != NHOM_LHNV.XE).length > 0) {
                obj.remove_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
                obj.create_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
                obj.nghiep_vu_khac = true;
            }
            if (ESCS_MA_DOI_TAC == "OPES") {
                obj.remove_file = "OPES_DE_XUAT_PHUONG_AN_SC,OPES_TO_TRINH_BOI_THUONG";
                obj.create_file = "OPES_DE_XUAT_PHUONG_AN_SC,OPES_TO_TRINH_BOI_THUONG";
            }
            _modalTrinhDuyetService.show(obj, (type, res) => {
                ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
                var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
                if (trang_thai != null) {
                    ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
                }
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                _modalLapPhuongAnSuaChua.hide();
            });
        });
        $("#ModalTrinhDuyet").on('show.bs.modal', function () {
            $("#modalLapPhuongAnSuaChua").css("z-index", "1045");
        });
        $("#ModalTrinhDuyet").on('hide.bs.modal', function () {
            $("#modalLapPhuongAnSuaChua").css("z-index", "1050");
        });
        $("#modalBoiThuongVienDanhGiaHoSoBoiThuong").on('show.bs.modal', function () {
            $("#modalLapPhuongAnSuaChua").css("z-index", "1045");
        });
        $("#modalBoiThuongVienDanhGiaHoSoBoiThuong").on('hide.bs.modal', function () {
            $("#modalLapPhuongAnSuaChua").css("z-index", "1050");
        });
        $("#btnTinhToanCPKhac").click(function () {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _serviceTemp.postData("/carclaim/carclaimcommon/chiPhiKhacHS", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("tblTinhToanCPKhacTemplate", "tblTinhToanCPKhac", { data: res.data_info });
                _modalTinhToanCPKhac.show();
            });
        });
        $("#tt_xe_tong_tien_bh").html(ESUtil.formatMoney(tt_xe_tong_tien_bh));
        $("#tt_xe_tong_tien_mien_thuong").html(ESUtil.formatMoney(tt_xe_tong_tien_mien_thuong));
        $("#tt_xe_tong_phi").html(ESUtil.formatMoney(tt_xe_tong_phi));
        $("#btnLuuTinhToanCPKhac").click(function () {
            luuTinhToanCPKhac();
        });
        $("#btnLuuDongTinhToanCPKhac").click(function () {
            luuTinhToanCPKhac(res => {
                _modalTinhToanCPKhac.hide();
            });
        });
        $('#btnLuuPASC').click(function () {
            luuPASC(() => {
                _notifyService.success("Lưu thông tin phương án thành công");
            });
        });
        $('#btnLuuPASC_NV').click(function () {
            var lh_nv = $("#navPhuongAnNghiepVu li.active").attr("data-lhnv");
            var json = _frmTinhToanBoiThuongPA.getJsonData();
            json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            json.lh_nv = lh_nv;
            json.so_id_doi_tuong = $("#tblDsPhuongAnBody td.text-danger").attr("data-so_id_doi_tuong");

            var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();

            if (json.tl_thue != undefined && json.tl_thue != null && json.tl_thue == "THM") {
                json.tl_thue = 0;
                json.pt_ad_thue_mien_thuong = "THM";//Thuế miễn thường theo thuế hạng mục
            }
            else {
                json.pt_ad_thue_mien_thuong = "TLT";//Thuế miễn thường theo tỷ lệ thuế
            }

            /*Hàng hóa trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                json.data = layDuLieuBangPAHangHoa();
            }
            /*Người ngồi trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
                json.data = layDuLieuBangPANNTX();
            }
            /*TNDS về người*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
                json.data = layDuLieuBangPATNDSNguoi();
            }
            /*TNDS về hành khách*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
                json.data = layDuLieuBangPATNDSNguoiHK();
            }
            /*TNDS về tài sản*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                json.data = layDuLieuBangPATNDSTaiSan();
            }

            if (objLHNV.doi_tuong != DOI_TUONG_TT.XE) {
                _serviceTemp.postData("/carclaim/CarCompensation/luuPhuongAnNV", json).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    hienThiBangGiaPA({ ma_doi_tac: json.ma_doi_tac, so_id: json.so_id });
                    idPhuongAn = res.out_value.so_id_pa.toString();
                    _notifyService.success("Lưu thông tin thành công");
                    var objGetDetail = { ma_doi_tac: json.ma_doi_tac, so_id: json.so_id };
                    _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", objGetDetail).then(resDetail => {
                        ho_so_chi_tiet = resDetail;
                    });
                });
            }
        });
        $('#btnChonPA').click(function () {
            var arrPA = getCheckedPhuongAn();
            if (arrPA.length <= 0) {
                _notifyService.error('Không tìm thấy phương án');
                return;
            }
            var objData = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_pa: arrPA[0].so_id_pa,
                lhnv: $("#navPhuongAnNghiepVu li.active").attr("data-lhnv")
            }
            _serviceTemp.postData("/carclaim/CarCompensation/chonPhuongAn", objData).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }

                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    tongHopTienPhuongAn();
                    reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
                    ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: ho_so_chi_tiet.data_info.ds_phuong_an }, () => {
                        $('#btnBoChonPA').show();
                        $('#btnChonPA').hide();
                        _notifyService.success("Chọn phương án thành công");
                    });
                });
            });
        });
        $('#btnBoChonPA').click(function () {
            var arrPA = getCheckedPhuongAn();
            if (arrPA.length <= 0) {
                _notifyService.error('Không tìm thấy phương án');
                return;
            }
            var objData = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_pa: arrPA[0].so_id_pa,
                lhnv: $("#navPhuongAnNghiepVu li.active").attr("data-lhnv")
            }
            _serviceTemp.postData("/carclaim/CarCompensation/boChonPhuongAn", objData).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _serviceTemp.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = res1;
                    tongHopTienPhuongAn();
                    reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
                    ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: ho_so_chi_tiet.data_info.ds_phuong_an }, () => {
                        $('#btnBoChonPA').hide();
                        $('#btnChonPA').show();
                        _notifyService.success("Bỏ chọn phương án thành công");
                    });
                });
            });
        });
        $("#btnLuuGiamGiaPA").click(function () {
            luuGiamGiaPA();
        });
        $("#btnLuuDongGiamGiaPA").click(function () {
            luuGiamGiaPA(res => {
                _modalGiamGiaPA.hide();
            });
        });
        $("#btnLuuThuePA").click(function () {
            luuThuePA(res => { });
        });
        $("#btnLuuDongThuePA").click(function () {
            luuThuePA(res => {
                _modalThuePA.hide();
            });
        });
        $("#btnLuuGiamGia").click(function () {
            luuGiamGia(res => { });
        });
        $("#btnLuuDongGiamGia").click(function () {
            luuGiamGia(res => {
                _modalGiamGia.hide();
            });
        });
        $("#btnLuuKhauTru").click(function () {
            luuKhauTru(res => { });
        });
        $("#btnLuuDongKhauTru").click(function () {
            luuKhauTru(res => {
                _modalKhauTru.hide();
            });
        });
        $("#btnLuuThue").click(function () {
            luuThue(res => { });
        });
        $("#btnLuuDongThue").click(function () {
            luuThue(res => {
                _modalThue.hide();
            });
        });
        $("#btnLuuKhauTruPA").click(function () {
            luuKhauTruPA();
        });
        $("#btnLuuDongKhauTruPA").click(function () {
            luuKhauTruPA(res => {
                _modalKhauTruPA.hide();
            });
        });
        $("#chonGhiChu").click(function () {
            var val = $("#divGhiChu_NoiDung").val();
            $(_popoverGhiChu.target).attr("data-val", val);
            if (val != "") {
                $(_popoverGhiChu.target).attr("href", "#");
            }
            else {
                $(_popoverGhiChu.target).removeAttr("href");
            }
            _popoverGhiChu.hide();
        });
        $("#chonGhiChuBaoGia").click(function () {
            var val = $("#divGhiChuBaoGia_NoiDung").val();
            $(_popoverGhiChuBaoGia.target).attr("data-val", val);
            if (val != "") {
                $(_popoverGhiChuBaoGia.target).attr("href", "#");
            }
            else {
                $(_popoverGhiChuBaoGia.target).removeAttr("href");
            }
            _popoverGhiChuBaoGia.hide();
        });
        $("#chonDKBS").click(function () {
            var dkbs = "";
            $("#divDKBS .hang_muc_dkbs:checked").each(function () {
                if (dkbs == "") {
                    dkbs = $(this).val();
                }
                else {
                    dkbs += "," + $(this).val();
                }
            });
            $(_popoverDKBS.target).attr("data-val", dkbs);
            $(_popoverDKBS.target).removeAttr("href");
            if (dkbs != "") {
                $(_popoverDKBS.target).attr("href", "#");
            }
            _popoverDKBS.hide();
            var lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
            var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
            //Vật chất xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
                ganDuLieuTinhToanVCX(_popoverDKBS.target);
            }
            //Hàng hóa trên xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ganDuLieuTinhToanHANGHOA(_popoverDKBS.target);
            }
            //Người ngồi trên xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
                ganDuLieuTinhToanNNTX(_popoverDKBS.target);
            }
            //TNDS về người
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ganDuLieuTinhToanTNDSNGUOI(_popoverDKBS.target);
            }
            //TNDS về tài sản
            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                ganDuLieuTinhToanTNDSTAISAN(_popoverDKBS.target);
            }
        });
        $("#chonNguyenNhan").click(function () {
            var nguyen_nhan = "";
            $("#divNguyenNhan .modalChonNguyenNhanGiamTruItem:checked").each(function () {
                if (nguyen_nhan == "") {
                    nguyen_nhan = $(this).val();
                }
                else {
                    nguyen_nhan += "," + $(this).val();
                }
            });
            $(_popoverNguyenNhan.target).attr("data-val", nguyen_nhan);
            $(_popoverNguyenNhan.target).removeAttr("href");
            if (nguyen_nhan != "") {
                $(_popoverNguyenNhan.target).attr("href", "#");
            }
            _popoverNguyenNhan.hide();
            var lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
            var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
            //Vật chất xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
                ganDuLieuTinhToanVCX(_popoverNguyenNhan.target);
            }
            //Hàng hóa trên xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ganDuLieuTinhToanHANGHOA(_popoverNguyenNhan.target);
            }
            //Người ngồi trên xe
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
                ganDuLieuTinhToanNNTX(_popoverNguyenNhan.target);
            }
            //TNDS về người
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ganDuLieuTinhToanTNDSNGUOI(_popoverNguyenNhan.target);
            }
            //TNDS về tài sản
            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                ganDuLieuTinhToanTNDSTAISAN(_popoverNguyenNhan.target);
            }
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='ho_so_day_du']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='ho_so_day_du']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='nguyen_nhan']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='nguyen_nhan']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='pham_vi_tt']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='pham_vi_tt']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='gt_tham_gia_bh']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='gt_tham_gia_bh']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='tuan_thu']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='tuan_thu']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='thoi_han_khai_bao']").click(function () {
            $("#frmBoiThuongVienDanhGiaHoSoBoiThuong input[name='thoi_han_khai_bao']").prop("checked", false);
            $(this).prop("checked", true);
        });
        $("#btnLuuDongBoiThuongVienDanhGiaHSBT").click(function () {
            luuThongTinBTVDanhGiaHoSoBoiThuong(res => {
                _modalBoiThuongVienDanhGiaHoSoBoiThuong.hide();
            });
        });
        $("#btnDongBoiThuongVienDanhGiaHSBT").click(function () {
            _modalBoiThuongVienDanhGiaHoSoBoiThuong.hide();
        });
    };
    this.OnInit();
}
