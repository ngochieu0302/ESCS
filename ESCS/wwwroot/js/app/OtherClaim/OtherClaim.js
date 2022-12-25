var _common = new CommonService();
var _service = new OtherClaimService();
var _notifyService = new NotifyService();
var dateNow = new Date().ddmmyyyy();
var gioHT = new Date().HHmm();
var ngayDauThang = new Date().getNgayDauThang();
var ngayDauNam = new Date().getNgayDauNam();
var objDanhMuc = {};

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_CHI_NHANH = $("#escs_ma_chi_nhanh").val();
var ESCS_NSD = $("#escs_tai_khoan").val();

const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'BT'; //Bồi thường
const NV = 'NG';

var ho_so_chi_tiet = {};
var tthai_vu_tt = "xem";
var tthai_lan_gd = "xem";
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var OtherClaimTabShow = "";

var configColumn = [
    { field: "nv", title: "nghiệp vụ", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "13%", hozAlign: "center", headerSort: false }, //, formatter: formatterTrangThai 
    { field: "so_hs", title: "Số hồ sơ", width: "15%", headerSort: false, hozAlign: "center" },
    { field: "doi_tuong", title: "Tên đối tượng", width: "20%", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "12%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số Hợp đồng", width: "15%", hozAlign: "center", headerSort: false },
    { field: "tien_tthat", title: "Số tiền tổn thất", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "tien_duyet", title: "Số tiền duyệt", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nsd", title: "Cán bộ tiếp nhận", width: "12%", hozAlign: "center", headerSort: false }
];

var configUpload = {
    onSuccess: function (file, response) {
        if (response.state_info.status === "NotOK") {
            _notifyService.error(response.state_info.message_body);
            return
        }
        var arrError = response.data_info.where(n => n.status_upload == "ERROR");
        for (var i = 0; i < arrError.length; i++) {
            _notifyService.error(arrError[i].error_message);
            return
        }
        /*getAnhThumnail();*/
    }
};
// Service
var _commonService = new CommonService();
var _notifyService = new NotifyService();
/*var _esSendEmail = new ESSendEmail();*/
var _service = new OtherClaimService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _otherContractService = new OtherContractService();
/*var _uploadService = new UploadService(configUpload);*/
// Form
var _frmTimKiem = new FormService("FrmSearch");
var _frmOtherClaimSearch = new FormService("frmOtherClaimSearch");
var _frmOtherClaimCustomerInfo = new FormService("frmOtherClaimCustomerInfo");
var _frmThongTinNguoiLienHe = new FormService("frmThongTinNguoiLienHe");
var _frmDienBienTonThat = new FormService("frmDienBienTonThat");
// Modal
var _modalMoHoSoBT = new ModalService("OtherClaimModal");
// Navtab
var _navTabTimKiemDoiTuong = new NavTabService("navTabTimKiemDoiTuong", ["tabTimKiemDoiTuong", "tabThongTinLienHe"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navThongTinLienHe", "navQuaTrinhGiaiQuyet", "navLichSuTonThat"], "nav-tabs-timeline");
var _navOtherClaimContentTab = new NavTabService("navThongTinHoSo", ["tabThongTinDienBienTonThat", "tabThongTinGiamDinh", "tabHoSoGiayTo", "tabTinhToanBoiThuong"], "nav-tabs-timeline");
// GridView
var _gridViewHoSoBoiThuong = new GridViewService("gridViewHoSoBoiThuong", configColumn, getPaging, rowClick);

function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.getpaging(objTimKiem).then(res => {
            _gridViewHoSoBoiThuong.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewHoSoBoiThuong.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewHoSoBoiThuong.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function rowClick(data, row) {
    _navOtherClaimContentTab.showTab("tabThongTinDienBienTonThat");
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac_ql, so_id: data.so_id };
    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
        ho_so_chi_tiet = res;
        bindDataDienBienTonThat(res);
        //bindPhanLoaiHangMucCT();
        ESUtil.genHTML("navDanhGiaNghiepVuTemplate", "navDanhGiaNghiepVu", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });
        if (row !== undefined) {
            row.select();
        }
        showStep("stepDienBienTonThat");
        /*hienThiChatVoiGiamDinhVien();*/

        if (ho_so_chi_tiet.data_info.ho_so.nhom_kh_vip == 'C') {
            $("#chonKhachHangVip").removeClass('defaultColor');
            $("#chonKhachHangVip").addClass('active-star');
        } else {
            $("#chonKhachHangVip").addClass('defaultColor');
            $("#chonKhachHangVip").removeClass('active-star');
        }
        //_carClaimCommonService.LayLichSuXinYKien({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, nghiep_vu: 'XE' }).then(res_yk => {
        //    if (res_yk.state_info.status != 'OK') {
        //        _notifyService.error(res_yk.state_info.message_body);
        //        return;
        //    }
        //    objDanhMuc.lsXinYKien = res_yk.data_info;
        //});
        //ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.data_info.canh_bao });
        //_carClaimCommonService.danhSachCanhBao(objGetDetail).then(res1 => {
        //    ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
        //});
        //anHienTabXemToanBoThongTinHoSoBoiThuong("XE");


        _frmThemGara.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE")[0].so_id_doi_tuong : "");
        _frmGaraHopTac.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE")[0].so_id_doi_tuong : "");
    });
}
function showModalBoiThuong() {
    $('#inside-modal .nav-tabs.profile-tab').tabdrop();
    $("#inside-modal").esmodal("show");
}
function hideModalBoiThuong() {
    $("#inside-modal").esmodal("hide");
    var data = ho_so_chi_tiet.data_info.ho_so;
    $("#dropdownGDVHT").removeClass('show');
    $("#dropdownGDVTT").removeClass('show');
}
function showStep(step, gdv = undefined) {
    OtherClaimTabShow = step;
    if (step === "stepDienBienTonThat") {
        $(".lstButtonESCS").hide();
        $(".lstButton_" + step).css('display', 'flex');
        $("#btnThemMoiVuTonThat").removeAttr("disabled");
        $("#btnXoaDienBienTonThat").show();
        $("#btnHuyThaoTac").hide();
        tthai_vu_tt = "xem";
        ho_so_chi_tiet.data_info.dien_bien = ho_so_chi_tiet.data_info.dien_bien.removeItem(n => n.vu_tt === undefined);
        showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
        if (ho_so_chi_tiet.data_info.dien_bien.length > 0) {
            xemChiTietVuTonThat(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
        } else {
            tthai_vu_tt = "them_moi";
            $("#btnThemMoiVuTonThat").trigger("click");
        }
    }
    if (step === "stepThongTinGiamDinh") {
        if (!kiemTraChuyenStep(step)) {
            return;
        }
        if (!_frmDienBienTonThat.isValid()) {
            return;
        }
        if (!_frmThongTinGiamDinh.getControl("cty_gdinh").checkBindData()) {
            _frmThongTinGiamDinh.getControl("cty_gdinh").setDataSource(objDanhMuc.cty_gdinh, "ten", "ma", "Chọn công ty giám định", "");
        }
        if (!_frmAddChiPhiKhac.getControl("ngan_hang").checkBindData()) {
            _frmAddChiPhiKhac.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        }
        $(".lstButtonESCS").hide();
        $(".lstButton_" + step).css('display', 'flex');
        $("#btnChuyenGDVHT").hide();
        tthai_lan_gd = "xem";
        var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        var lan_gd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined).length <= 0 ? "" : ho_so_chi_tiet.data_info.lan_gd.max(n => n.lan_gd);
        setDataStep2(so_id, lan_gd);
        xemChiTietLanGD(lan_gd);
        if (lan_gd === "" || lan_gd === undefined) {
            tthai_lan_gd = "them_moi";
            $("#la_gdvht").prop("checked", false);
            $("#btnThemMoiThongTinGiamDinh").trigger("click");
            _frmThongTinGiamDinh.getControl("dvi_gdinh").setValue("");
            _frmThongTinGiamDinh.getControl("dvi_gdinh").trigger("select2:select");
            _frmThongTinGiamDinh.getControl("dvi_gdinh").readOnly(false);
            _frmThongTinGiamDinh.getControl("ma_gdv").readOnly(false);
            _frmThongTinGiamDinh.getControl("doi_tuong_gd").attr("data-val", ho_so_chi_tiet.data_info.ds_doi_tuong[0].so_id_doi_tuong);
            _frmThongTinGiamDinh.getControl("doi_tuong_gd").setValue(ho_so_chi_tiet.data_info.ds_doi_tuong[0].ten_doi_tuong);
        }
        if (ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd !== undefined).length <= 0 && ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined).length > 0) {
            var dien_bien = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined)[0];
            _frmThongTinGiamDinh.getControl("tinh_thanh").setValue(dien_bien.tinh_thanh);
            _frmThongTinGiamDinh.getControl("tinh_thanh").trigger("select2:select");
            _frmThongTinGiamDinh.getControl("quan_huyen").setValue(dien_bien.quan_huyen);
            _frmThongTinGiamDinh.getControl("quan_huyen").trigger("select2:select");
            _frmThongTinGiamDinh.getControl("phuong_xa").setValue(dien_bien.phuong_xa);
            _frmThongTinGiamDinh.getControl("dia_diem").setValue(dien_bien.dia_diem);
        }
        var arrLHNV = ho_so_chi_tiet.data_info.lh_nv;
        _frmAddChiPhiKhac.getControl("lh_nv").setDataSource(arrLHNV, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
    }
    if (step === "stepHinhAnhHoSo") {
        if (!kiemTraChuyenStep(step)) {
            return;
        }
        $(".lstButtonESCS").hide();
        $(".lstButton_" + step).css('display', 'flex');

        bindVuTonThat();
        getAnhThumnail(res => {
            if (gdv !== undefined) {
                if ($("#lstImage") && $("#img" + gdv.id_anh)) {
                    $("#lstImage").animate({
                        scrollTop: $("#img" + gdv.id_anh).position().top
                    }, 'slow');
                }
            }
        });
    }
    if (step === "stepDanhGiaTonThat") {
        if (!kiemTraChuyenStep(step)) {
            return;
        }
        $("#btnTrinhTuChoiBT").addClass("d-none");
        $("#btnXacNhanKyTayBBGD").addClass("d-none");
        //if (!_frmDanhGiaTonThat.getControl("gara").checkBindData()) {
        //    _frmDanhGiaTonThat.getControl("gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
        //} 
        ESUtil.executeAsync(() => {
            ESUtil.genHTML("modalDviTinhDanhSachTemplate", "modalDviTinhDanhSach", { danh_sach: objDanhMuc.dvi_tinh }, () => {
                $("#modalDviTinhDanhSach .single_checked").click(function () {
                    $("#modalDviTinhDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
        });
        $(".divDanhGiaItem").hide();
        bindVuTonThat();
        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
        _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
            ho_so_chi_tiet = res;
            //Lấy ra danh sách hạng mục đã phân
            var lhnv_da_phan = layDsLHNVDaPhan();
            $("#navDanhGiaNghiepVu").parent().show();
            ESUtil.genHTML("navDanhGiaNghiepVuTemplate", "navDanhGiaNghiepVu", { danh_sach: lhnv_da_phan });
            if (lhnv_da_phan.length <= 1) {
                $("#navDanhGiaNghiepVu").parent().hide();
            }
            xemChiTietDTTonThat(lhnv_da_phan[0].ma, lhnv_da_phan[0].nhom, lhnv_da_phan[0].doi_tuong, lhnv_da_phan[0].hang_muc);
            $("#btnKetthucLanGiamDinh").addClass("d-none");
            $("#btnKetthucLanGiamDinhStep2").addClass("d-none");
            $(".lstButtonESCS").hide();
            $(".lstButton_" + step).css('display', 'flex');
            anHienNutDuyet(res.out_value.phan_cap);
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined).max(n => n.lan_gd);
                var gdvht = ho_so_chi_tiet.data_info.gdvht.where(n => n.lan_gd == lan_gd_max).firstOrDefault();
                if (gdvht.ngay_ycktgd_dongy < 30000101) {
                    $("#btnKetthucLanGiamDinh").addClass("d-none");
                    $("#btnKetthucLanGiamDinhStep2").addClass("d-none");
                }
                else {
                    $("#btnKetthucLanGiamDinh").removeClass("d-none");
                    $("#btnKetthucLanGiamDinhStep2").removeClass("d-none");
                }

                $("#btnTrinhTuChoiBT").removeClass("d-none");
            }
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
            $("#btnLuuCTGiamDinh").addClass("d-none");
            var arrDoiTuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || (n.nhom == "TAI_SAN" && n.loai == "XE"));

            if (arrDoiTuong.length == 1) {
                _frmThemGaraBaoGia.getControl("so_id_doi_tuong").setDataSource(arrDoiTuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", arrDoiTuong[0].so_id_doi_tuong);
                _frmGaraHopTac.getControl("so_id_doi_tuong").setDataSource(arrDoiTuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", arrDoiTuong[0].so_id_doi_tuong);
            } else {
                _frmThemGaraBaoGia.getControl("so_id_doi_tuong").setDataSource(arrDoiTuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
                _frmGaraHopTac.getControl("so_id_doi_tuong").setDataSource(arrDoiTuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
            }
        });
    }
    _navBoiThuong.showTab(step);
    anHienPhanLoai(false);
    _navDanhGiaTonThat.showTab("tabDGTTKhaiBaoHangMuc");
    if (step === "stepThongTinBCGD") {
        xemDanhGiaBaoCao("BCGD");
    }
}
function onChonKhachHang(so_id, so_id_dt) {
    $("#modalOtherSearchDsGCN .tkiem_kh").removeClass("active");
    $("#modalOtherSearchDsGCN #tkiem_kh_" + so_id + "_" + so_id_dt).addClass("active");
}
function xemThongTinGiayChungNhan(ma_chi_nhanh, so_id_hdong, so_id_gcn) {
    $("#btnSuaGCN").hide();
    $("#btnLuuUocLaySoHS").hide();
    $("#btnLaySoHS").hide();
    $("#table_uoc_ton_that").hide();

    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        ma_chi_nhanh_ql: ma_chi_nhanh,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id_hd: so_id_hdong,
        so_id_dt: so_id_gcn,
        so_id_gcn: so_id_gcn,
        pm: "BT",
        nv: ho_so_chi_tiet.data_info.ho_so.nv
    };
    _service.base.all([
        _service.layThongTinGCN(obj),
        _service.layThongTinTinhTrangThanhToan(obj)
    ]).then(arrRes => {
        if (arrRes[0].state_info.status != "OK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        _service.layThongTinHopDong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info !== null) {
                if (res.data_info.ho_so !== null) {
                    $("#tblOtherCommonCertificate").bindJsonToHtml(res.data_info.ho_so);
                } else {
                    $("#tblOtherCommonCertificate").bindJsonToHtml({});
                }
                ESUtil.genHTML("danhSachNV_template", "danhSachNV", { lhnv: res.data_info.dk }, () => {
                    hthiTongTien(res.data_info.dk);
                    $(document).on("keypress",
                        "#danhSachNV input.number",
                        function (e) {
                            var keycode = e.which || e.keyCode;
                            var arrKeycode = [8, 37, 39, 46];
                            if (!(event.shiftKey == false &&
                                ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                                event.preventDefault();
                            }
                        });
                });
                ESUtil.genHTML("dsXacMinhPhiLaySoHS_template", "dsXacMinhPhiLaySoHS", { danh_sach: arrRes[1].data_info });
                _modalXemThongTinChungNhan.show();
            }
        });
    });
}
function bindCmbDataDonVi(objDanhMuc) {
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
    _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_chi_nhanh").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiem.getControl("nv").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiem.getControl("trang_thai").addEventChange(val => {
        getPaging(1);
    });

    _frmOtherClaimSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    _frmOtherClaimSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", "");
    _frmOtherClaimSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmOtherClaimSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmOtherClaimSearch.getControl("ma_chi_nhanh").setValue("");
    });
    //_frmThongTinGiamDinh.getControl("dvi_gdinh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    //_frmThongTinGiamDinh.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");

    //_frmThongTinGiamDinh.getControl("dvi_gdinh").addEventChange(val => {
    //    var arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh == val);
    //    _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
    //    _frmThongTinGiamDinh.getControl("ma_gdv").setValue("");
    //});
    //_frmThongTinGiamDinh.getControl("ma_gdv").addEventChange(val => {
    //    var ma_dvi = _frmThongTinGiamDinh.getControl("dvi_gdinh").val();
    //    var can_bo = objDanhMuc.can_bo.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma_chi_nhanh === ma_dvi && n.ma === val).firstOrDefault();
    //    _frmThongTinGiamDinh.getControl("ten_gdv").val("");
    //    _frmThongTinGiamDinh.getControl("dthoai_gdv").val("");
    //    _frmThongTinGiamDinh.getControl("email_gdv").val("");
    //    $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "#");

    //    if (can_bo !== undefined && can_bo !== null) {
    //        _frmThongTinGiamDinh.getControl("ten_gdv").val(can_bo.ten);
    //        _frmThongTinGiamDinh.getControl("dthoai_gdv").val(can_bo.dthoai);
    //        _frmThongTinGiamDinh.getControl("email_gdv").val(can_bo.email);
    //        $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "javascript:void(0)");
    //        $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("onclick", "ESUtil.voiceCall('" + can_bo.call_id + "', true)");
    //    }
    //});
}
function bindCmbDataMoiQuanHe(objDanhMuc) {
    var arr = objDanhMuc.dmuc_chung.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom === "MOI_QUAN_HE").sortBy("stt");
    var arrMoiQuanHe = arr;
    _frmOtherClaimCustomerInfo.getControl("moi_qh_tb").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmOtherClaimCustomerInfo.getControl("moi_qh_lhe").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    //_frmThongTinNguoiLienHe.getControl("moi_qh_tb").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    //_frmThongTinNguoiLienHe.getControl("moi_qh_lhe").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");

    //_frmBenThamGiaGiamDinh.getControl("dai_dien").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    //_frmBenThamGiaGiamDinh.getControl("dai_dien").addEventChange(val => {
    //    // Bản thân
    //    if (val === "QH.0004") {
    //        _frmBenThamGiaGiamDinh.getControl("ten").val(ho_so_chi_tiet.data_info.ho_so.chu_xe);
    //        _frmBenThamGiaGiamDinh.getControl("dien_thoai").val(ho_so_chi_tiet.data_info.ho_so.dien_thoai);
    //        _frmBenThamGiaGiamDinh.getControl("email").val(ho_so_chi_tiet.data_info.ho_so.email);
    //        _frmBenThamGiaGiamDinh.getControl("dia_chi").val(ho_so_chi_tiet.data_info.ho_so.chu_xe_dchi);
    //    }
    //    //Lái xe
    //    else if (val === "QH.0002") {
    //        _frmBenThamGiaGiamDinh.getControl("ten").val(_frmDienBienTonThat.getControl("ten_lxe").val());
    //        _frmBenThamGiaGiamDinh.getControl("dien_thoai").val(_frmDienBienTonThat.getControl("dthoai_lxe").val());
    //        _frmBenThamGiaGiamDinh.getControl("email").val(_frmDienBienTonThat.getControl("email_lxe").val());
    //    }

    //    else {
    //        _frmBenThamGiaGiamDinh.getControl("ten").val("");
    //        _frmBenThamGiaGiamDinh.getControl("dien_thoai").val("");
    //        _frmBenThamGiaGiamDinh.getControl("email").val("");
    //        _frmBenThamGiaGiamDinh.getControl("dia_chi").val("");
    //        _frmBenThamGiaGiamDinh.getControl("loi_khai_nhan_chung").val("");
    //    }
    //});


    //_frmBsBenThamGiaGD.getControl("dai_dien").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    //_frmBsBenThamGiaGD.getControl("dai_dien").addEventChange(val => {
    //    //Chủ xe
    //    if (val === "QH.0001") {
    //        _frmBsBenThamGiaGD.getControl("ten").val(ho_so_chi_tiet.data_info.ho_so.chu_xe);
    //        _frmBsBenThamGiaGD.getControl("dien_thoai").val(ho_so_chi_tiet.data_info.ho_so.dien_thoai);
    //        _frmBsBenThamGiaGD.getControl("email").val(ho_so_chi_tiet.data_info.ho_so.email);
    //        _frmBsBenThamGiaGD.getControl("dia_chi").val(ho_so_chi_tiet.data_info.ho_so.chu_xe_dchi);
    //    }
    //    //Lái xe
    //    if (val === "QH.0002") {
    //        _frmBsBenThamGiaGD.getControl("ten").val(_frmDienBienTonThat.getControl("ten_lxe").val());
    //        _frmBsBenThamGiaGD.getControl("dien_thoai").val(_frmDienBienTonThat.getControl("dthoai_lxe").val());
    //        _frmBsBenThamGiaGD.getControl("email").val(_frmDienBienTonThat.getControl("email_lxe").val());
    //    }
    //});

}
function timKiemDoiTuong() {
    var objSearch = _frmOtherClaimSearch.getJsonData();
    if (objSearch.ngay_xr == "") {
        _notifyService.error("Bạn chưa nhập ngày xảy ra tổn thất");
        return;
    }
    if (objSearch.so_hdong.trim() == "" && objSearch.gcn.trim() == "" && objSearch.ten_doi_tuong.trim() == "" && objSearch.nv.trim() == "") {
        _notifyService.error("Phải có ít nhất 1 tiêu chí tìm kiếm");
        return;
    }
    _service.timKiemDoiTuong(objSearch).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info === null || res.data_info.length <= 0) {
            _notifyService.error("Không tìm thấy đối tượng theo tiêu chí tìm kiếm");
            return;
        }
        ESUtil.genHTML("modalOtherSearchDsGCNTemplate", "modalOtherSearchDsGCN", { data_info: res.data_info });
    });
}
function onChonKhachHang(so_id, so_id_dt) {
    $("#modalOtherSearchDsGCN .tkiem_kh").removeClass("active");
    $("#modalOtherSearchDsGCN #tkiem_kh_" + so_id + "_" + so_id_dt).addClass("active");
}
function setNguoiLienHeTheoNguoiThongBao() {
    _frmOtherClaimCustomerInfo.getControl("nguoi_lhe").readOnly(false);
    _frmOtherClaimCustomerInfo.getControl("moi_qh_lhe").readOnly(false);
    _frmOtherClaimCustomerInfo.getControl("dthoai_lhe").readOnly(false);
    _frmOtherClaimCustomerInfo.getControl("email_lhe").readOnly(false);
    if (_frmOtherClaimCustomerInfo.getControlById("chkThamGiaLienHe").is(":checked")) {
        var customer = _frmOtherClaimCustomerInfo.getJsonData();
        customer.nguoi_lhe = customer.nguoi_tb;
        customer.moi_qh_lhe = customer.moi_qh_tb;
        customer.dthoai_lhe = customer.dthoai_tb;
        customer.email_lhe = customer.email_tb;
        _frmOtherClaimCustomerInfo.setData(customer);
        _frmOtherClaimCustomerInfo.getControl("nguoi_lhe").readOnly();
        _frmOtherClaimCustomerInfo.getControl("moi_qh_lhe").readOnly();
        _frmOtherClaimCustomerInfo.getControl("dthoai_lhe").readOnly();
        _frmOtherClaimCustomerInfo.getControl("email_lhe").readOnly();
    }
}
function changeTabTKiemDoiTuong(tab) {
    var currentTab = _navTabTimKiemDoiTuong.currentTab;
    if (currentTab == "tabTimKiemDoiTuong") {
        $("#btnTiepTheo").trigger("click");
    } else {
        _navTabTimKiemDoiTuong.showTab(tab);
    }
}
function hienThiLSTT(obj) {
    if (obj === undefined || obj === null ||
        obj.so_hs === undefined || obj.so_hs === null || obj.so_hs === "" ||
        obj.ngay_ht === undefined || obj.ngay_ht === null || obj.ngay_ht === "" ||
        obj.trang_thai === undefined || obj.trang_thai === null || obj.trang_thai === "" ||
        obj.tien === undefined || obj.tien === null || obj.tien === ""
    ) {
        return null;
    }
    var div_timeline_item = $("<div class='timeline-item align-items-start'></div>");
    var div_timeline_badge = $("<div class='timeline-badge'></div>");
    var i_icon_warning = $("<i class='fa fa-genderless text-warning icon-xl'></i>");
    var i_icon_success = $("<i class='fa fa-genderless text-success icon-xl'></i>");
    var i_icon_danger = $("<i class='fa fa-genderless text-danger icon-xl'></i>");
    var i_icon_primary = $("<i class='fa fa-genderless text-primary icon-xl'></i>");
    var div = $("<div class='px-3 wd-100p'></div>");
    var div_timeline_label = $("<div class='timeline-label'></div>");

    var span_time = $("<span></span>");
    var span_ho_so = $("<span class='tx-12'></span>");
    span_time.html(obj.ngay_ht);
    span_ho_so.html(obj.so_hs);

    var div_timeline_content = $("<div class='timeline-content'></div>");
    var p_tien = $("<p class='m-0'></p>");
    var p_trang_thai = $("<p class='m-0'></p>");
    p_tien.text(ESUtil.formatMoney(obj.tien));
    p_trang_thai.text("(" + obj.trang_thai + ")");

    div_timeline_content.append(p_tien);
    div_timeline_content.append(p_trang_thai);

    div_timeline_label.append(span_time);
    div_timeline_label.append(span_ho_so);

    div.append(div_timeline_label);
    div.append(div_timeline_content);

    switch (obj.hanh_dong) {
        case "ADD":
            div_timeline_badge.append(i_icon_success);
            break;
        case "UPDATE":
            div_timeline_badge.append(i_icon_warning);
            break;
        case "DELETE":
            div_timeline_badge.append(i_icon_danger);
            break;
        default:
            div_timeline_badge.append(i_icon_primary);
            break;
    }
    div_timeline_item.append(div_timeline_badge);
    div_timeline_item.append(div);
    return div_timeline_item;
}
function showTabThongTinChung(tab) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt
    }
    if (tab === "navQuaTrinhGiaiQuyet") {
        _service.danhSachQuaTrinhXuLy(obj).then(res => {
            $("#navQuaTrinhGiaiQuyetTimeLine").html("");
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info.length > 0) {
                for (var i = 0; i < res.data_info.length; i++) {
                    var item = res.data_info[i];
                    if (hienThiQTXL(item) !== null) {
                        $("#navQuaTrinhGiaiQuyetTimeLine").append(hienThiQTXL(item));
                    };
                }
            }
            _navThongTinHoSo.showTab(tab);
        });
    }
    if (tab === "navLichSuTonThat") {
        _service.layDsLichSuTonThat(obj).then(res => {
            $("#navLichSuTonThatTimeLine").html("");
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info.length > 0) {
                for (var i = 0; i < res.data_info.length; i++) {
                    var item = res.data_info[i];
                    if (hienThiLSTT(item) !== null) {
                        $("#navLichSuTonThatTimeLine").append(hienThiLSTT(item));
                    };
                }
            }
        });
        _navThongTinHoSo.showTab(tab);
    }
}
function bindDataDienBienTonThat(res, showTab = true) {
    ho_so_chi_tiet = res;
    //_uploadService.setParam({
    //    ma_doi_tac: res.data_info.ho_so.ma_doi_tac,
    //    so_id: res.data_info.ho_so.so_id,
    //    type: "image",
    //    pm: CONSTANT_PM
    //});
    $("#navThongTinChung").bindJsonToHtml(res.data_info.ho_so);
    //$("#navThongTinChung #ttchung_dien_thoai").attr("href", "javascript:void(0)");
    //if (res.data_info.ho_so.dien_thoai !== undefined && res.data_info.ho_so.dien_thoai !== null && res.data_info.ho_so.dien_thoai !== "") {
    //    $("#navThongTinChung #ttchung_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dien_thoai + "')");
    //}
    //$("#navThongTinLienHe").bindJsonToHtml(res.data_info.ho_so);
    //$("#navThongTinLienHe #ttNguoiThongBao_dien_thoai").attr("href", "javascript:void(0)");
    //if (res.data_info.ho_so.dthoai_tb !== undefined && res.data_info.ho_so.dthoai_tb !== null && res.data_info.ho_so.dthoai_tb !== "") {
    //    $("#navThongTinLienHe #ttNguoiThongBao_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dthoai_tb + "')");
    //}
    //$("#navThongTinLienHe #ttNguoiLienHe_dien_thoai").attr("href", "javascript:void(0)");
    //if (res.data_info.ho_so.dthoai_lhe !== undefined && res.data_info.ho_so.dthoai_lhe !== null && res.data_info.ho_so.dthoai_lhe !== "") {
    //    $("#navThongTinLienHe #ttNguoiLienHe_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dthoai_lhe + "')");
    //}
    //ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: res.data_info.ho_so });

    //_frmDienBienTonThat.getControl("dang_kiem_so").val("");
    //_frmDienBienTonThat.getControl("dang_kiem_hl").val("");
    //_frmDienBienTonThat.getControl("dang_kiem_kt").val("");

    //if (res.data_info.dien_bien.length <= 0) {
    //    tthai_vu_tt = "them_moi";
    //    $("#btnThemMoiVuTonThat").attr("disabled", "disabled");
    //    $("#btnHuyThaoTac").show();
    //    $("#btnXoaDienBienTonThat").hide();

    //    showDsVuTonThat([{ gio_xr: "", ngay_xr: "//", so_id: res.data_info.ho_so.so_id }]);
    //    _frmDienBienTonThat.resetForm();
    //    _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val", "");
    //    _frmDienBienTonThat.getControl("gio_xr").val(gioHT);
    //    _frmDienBienTonThat.getControl("ngay_xr").val(dateNow);
    //    _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    //    _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    //    setStyleVuTTSelect("");
    //    if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe === "QH.0002") {
    //        _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_tb);
    //        _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_tb);
    //        _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_tb);
    //    }
    //    hthiMauPhamViBaoHiem();
    //}
    //else {
    //    tthai_vu_tt = "xem";
    //    $("#btnThemMoiVuTonThat").removeAttr("disabled");
    //    $("#btnHuyThaoTac").hide();
    //    $("#btnXoaDienBienTonThat").show();

    //    var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === res.data_info.dien_bien[0].tinh_thanh);
    //    _frmDienBienTonThat.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
    //    _frmDienBienTonThat.getControl("quan_huyen").setValue("");
    //    _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    //    var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === res.data_info.dien_bien[0].quan_huyen);
    //    _frmDienBienTonThat.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    //    _frmDienBienTonThat.getControl("phuong_xa").setValue("");

    //    showDsVuTonThat(res.data_info.dien_bien);
    //    _frmDienBienTonThat.setData(res.data_info.dien_bien[0]);
    //    hthiMauPhamViBaoHiem(res.data_info.dien_bien[0].pham_vi);
    //    $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("href", "javascript:void(0)");
    //    $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("onclick", "ESUtil.voiceCall('" + _frmDienBienTonThat.getControl("dthoai_lxe").val() + "')");
    //    setStyleVuTTSelect(res.data_info.dien_bien[0].vu_tt);
    //}
    //_frmDienBienTonThat.getControl("so_id").val(res.data_info.ho_so.so_id);
    //if (showTab) {
    //    _navBoiThuong.showTab("stepDienBienTonThat");
    //}
    ///*    bindDataTableKNGQ(res.data_info.kien_nghi);*/
    //if (ho_so_click_dau_tien.so_id === ho_so_chi_tiet.data_info.ho_so.so_id) {
    //    ho_so_click_dau_tien.lan += 1;
    //} else {
    //    ho_so_click_dau_tien.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    //    ho_so_click_dau_tien.lan = 1;
    //}
    //loadDanhSachHoSoGiayTo();
    //loadDanhSachHoSoGiayToLoi();
    //ganTrangThaiHoSo();
    //$("#btnNhanHoSoTuCCCT").addClass("d-none");
    //if (ho_so_chi_tiet.data_info.ho_so.ngay >= 30000101) {
    //    $("#btnNhanHoSoTuCCCT").removeClass("d-none");
    //}
    //_frmDanhGiaTonThat.getControl("gara").setValue(ho_so_chi_tiet.data_info.ho_so.gara);
    //_frmDanhGiaTonThat.getControl("y_kien").val(ho_so_chi_tiet.data_info.ho_so.y_kien);
    //_frmDanhGiaTonThat.getControl("y_kien_kh").val(ho_so_chi_tiet.data_info.ho_so.y_kien_kh);
    //_frmDanhGiaTonThat.getControl("danh_gia_gdv").val(ho_so_chi_tiet.data_info.ho_so.danh_gia_gdv);

    showModalBoiThuong();
}
function showDsVuTonThat(arr) {
    $("#tblDanhSachVuTonThat tbody").html("");
    if (arr === undefined || arr === null || arr.length <= 0) {
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        var vu_tt = arr[i].vu_tt;
        if (vu_tt === undefined || vu_tt === null || vu_tt === "") {
            vu_tt = "";
        }
        var tr = $("<tr style='cursor:pointer' onclick='xemChiTietVuTonThat(" + vu_tt + ")'></tr>");
        tr.attr("id", "ds_vu_ton_that_" + vu_tt);
        tr.attr("class", "ds_vu_ton_that");
        var td_gio_xr = $("<td></td>");
        var h = arr[i].gio_xr;
        if (arr[i].pham_vi == "0") {
            h = '<i class="fas fa-exclamation-triangle mr-2" style="color:#dc3545 !important"></i>' + h;
        }
        td_gio_xr.html(h);
        var td_ngay_xr = $("<td></td>");
        td_ngay_xr.html(arr[i].ngay_xr);
        tr.append(td_gio_xr);
        tr.append(td_ngay_xr);
        $("#tblDanhSachVuTonThat tbody").append(tr);
    }
}
function bindAnhThumnail(arrAnh) {
    $("#dsAnhTonThat").html("");
    $("#dsNhomAnh").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }

    var arrDataCPL = [];
    var arrDataTT = [];
    var arrDataTC = [];
    var arrDataTL = [];
    var arrDataGCN = [];
    var arrDataDGRR = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
            arrDataCPL.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TT") {
            arrDataTT.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TC") {
            arrDataTC.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TL") {
            arrDataTL.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "GCN") {
            arrDataGCN.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "DGRR") {
            arrDataDGRR.push(arrAnh[i]);
        }
    }

    var arrData = [
        { loai_tai_lieu: "CPL", ten_loai_tai_lieu: "Ảnh chưa phân loại", so_luong_tai_lieu: arrDataCPL.length },
        { loai_tai_lieu: "TT", ten_loai_tai_lieu: "Ảnh tổn thất", so_luong_tai_lieu: arrDataTT.length },
        { loai_tai_lieu: "TC", ten_loai_tai_lieu: "Ảnh toàn cảnh/hiện trường", so_luong_tai_lieu: arrDataTC.length },
        { loai_tai_lieu: "TL", ten_loai_tai_lieu: "Tài liệu", so_luong_tai_lieu: arrDataTL.length },
        { loai_tai_lieu: "GCN", ten_loai_tai_lieu: "Tài liệu HĐ gốc", so_luong_tai_lieu: arrDataGCN.length },
        { loai_tai_lieu: "DGRR", ten_loai_tai_lieu: "Tài liệu ĐGRR", so_luong_tai_lieu: arrDataDGRR.length }
    ];

    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
            $("#dsNhomAnh").append('<button class="dropdown-item" type="button" data-id="nhom_anh_' + i + '" onclick="goToScroll(\'nhom_anh_' + i + '\')">' + arrAnh[i].nhom_anh + '</button>');
        }
    }

    var result1 = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, ma_file, loai, so_id_doi_tuong, ten_doi_tuong, ...object }) => {
        acc[ma_file + "/" + so_id_doi_tuong] = (acc[ma_file + "/" + so_id_doi_tuong] || []);
        acc[ma_file + "/" + so_id_doi_tuong].push({ bt, ma_file, ma_chi_nhanh, loai, so_id_doi_tuong, ten_doi_tuong, ...object });
        return acc;
    }, {}));
    var result = result1.map(([key, value]) => ({ ma_file: key == null || key == "null" ? '' : key.split("/")[0], so_id_doi_tuong: key == null || key == "null" ? '' : key.split("/")[1], children: value }));

    //var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, ma_file, loai, ...object }) => {
    //    acc[ma_file] = (acc[ma_file] || []);
    //    acc[ma_file].push({ bt, ma_file, ma_chi_nhanh, loai, ...object });
    //    return acc;
    //}, {})).map(([key, value]) => ({ ma_file: key == null || key == "null" ? '' : key, children: value }));

    for (var i = 0; i < result.length; i++) {
        if (result[i].ma_file == "") {
            result[i].nhom = "Ảnh chưa phân loại";
            result[i].loai = 'CPL';
            result[i].ten_doi_tuong = result[i].children.firstOrDefault().ten_doi_tuong;
        }
        else {
            if (result[i].children.length > 0) {
                result[i].nhom = result[i].children.firstOrDefault().nhom_anh;
                result[i].loai = result[i].children.firstOrDefault().loai;
                result[i].ten_doi_tuong = result[i].children.firstOrDefault().ten_doi_tuong;
            }
            else {
                result[i].nhom = "Không xác định";
                result[i].loai = "";
                result[i].ten_doi_tuong = result[i].children.firstOrDefault().ten_doi_tuong;
            }
        }
        if (result[i].ma_file == "") {
            result[i].stt = 0;
        }
        else {
            result[i].stt = 1;
        }
    }
    result.sort((a, b) => a.stt - b.stt);

    ESUtil.genHTML("lstImage_template", "dsAnhTonThat", { arrLoai: arrData, arrAnh: result });
    ESUtil.genHTML("divPLHMHinhAnhtemplate", "divPLHMHinhAnh", { arrLoai: arrData, arrAnh: result });
    return result;
}
function getAnhThumnail(callback = undefined) {
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }).then(res => {
        ho_so_chi_tiet.data_info.hinh_anh = res.data_info;
        bindAnhThumnail(res.data_info);
        ds_anh_gd = res.data_info;
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function initImageViewer() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container',
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}

$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiem.getControl("ngay_c").setValue(dateNow);

    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null || storageDonViHanhChinh === "null") {
        _administrativeUnitsService.layDsTinhThanh().then(res => {
            objDanhMuc.donvihanhchinh = res.data_info;
            ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMuc.donvihanhchinh));
        });
    }
    else {
        objDanhMuc.donvihanhchinh = JSON.parse(storageDonViHanhChinh);
    }

    var storageDanhSachBenhLy = ESStorage.getItemLocalStorage(ESConstants.DANH_SACH_BENH_LY);
    if (storageDanhSachBenhLy === undefined || storageDanhSachBenhLy === null || storageDanhSachBenhLy === "null" || storageDanhSachBenhLy === "[]") {
        _service.base.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _bankListService.layDsNganHang({ ma_doi_tac: ESCS_MA_DOI_TAC }),//theo đối tác nsd
            _commonService.layControl({ nv: "BTK" }),
            _service.layDsDanhMucChung()
        ]).then(arrRes => {
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_nhanh = arrRes[1].data_info;
            objDanhMuc.ngan_hang = arrRes[2].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[2].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.cau_hinh_nut = arrRes[3].data_info;
            objDanhMuc.dmuc_chung = arrRes[4].data_info;

            ESStorage.setItemLocalStorage(ESConstants.DANH_SACH_BENH_LY, JSON.stringify(objDanhMuc.ds_benh_ly));

            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });

            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });

            //_frmTimKiemNDBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
            //_frmTimKiemNDBH.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            //_frmTimKiemDTBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten_tat", "ma", "Chọn đối tác", "");
            //_frmTimKiemDTBH.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        });
    }
    else {
        _service.base.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _bankListService.layDsNganHang({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _commonService.layControl({ nv: "BTK" }),
            _service.layDsDanhMucChung()
        ]).then(arrRes => {
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_nhanh = arrRes[1].data_info;
            objDanhMuc.ngan_hang = arrRes[2].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[2].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.cau_hinh_nut = arrRes[3].data_info;
            objDanhMuc.dmuc_chung = arrRes[4].data_info;
            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });

            //_frmTimKiemNDBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
            //_frmTimKiemNDBH.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            //_frmTimKiemDTBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten_tat", "ma", "Chọn đối tác", "");
            //_frmTimKiemDTBH.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            getPaging(1);
        })
    };
    _frmOtherClaimCustomerInfo.getControl("moi_qh_tb").addEventChange(val => {
        if (val == 'QH.0004') {
            var obj = {
                ma_doi_tac: _frmOtherClaimCustomerInfo.getControl('ma_doi_tac').val(),
                ma_chi_nhanh: '',
                so_id: _frmOtherClaimCustomerInfo.getControl('so_id_hd').val()
            }
            _otherContractService.layChiTietHopDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var res_data = {
                    nguoi_tb: res.data_info.hd.ten,
                    dthoai_tb: res.data_info.hd.dthoai,
                    email_tb: res.data_info.hd.email
                }
                _frmOtherClaimCustomerInfo.getControl('nguoi_tb').setValue(res_data.nguoi_tb);
                _frmOtherClaimCustomerInfo.getControl('dthoai_tb').setValue(res_data.dthoai_tb);
                _frmOtherClaimCustomerInfo.getControl('email_tb').setValue(res_data.email_tb);
            });
        }
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmOtherClaimCustomerInfo.getControl("moi_qh_lhe").addEventChange(val => {
        if (val == 'QH.0004') {
            var obj = {
                ma_doi_tac: _frmOtherClaimCustomerInfo.getControl('ma_doi_tac').val(),
                ma_chi_nhanh: '',
                so_id: _frmOtherClaimCustomerInfo.getControl('so_id_hd').val()
            }
            _otherContractService.layChiTietHopDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var res_data = {
                    nguoi_tb: res.data_info.hd.ten,
                    dthoai_tb: res.data_info.hd.dthoai,
                    email_tb: res.data_info.hd.email
                }
                _frmOtherClaimCustomerInfo.getControl('nguoi_lhe').setValue(res_data.nguoi_tb);
                _frmOtherClaimCustomerInfo.getControl('dthoai_lhe').setValue(res_data.dthoai_tb);
                _frmOtherClaimCustomerInfo.getControl('email_lhe').setValue(res_data.email_tb);
            });
        }
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmOtherClaimCustomerInfo.getControlById("chkThamGiaLienHe").change(function () {
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmOtherClaimCustomerInfo.getMultipleControl("nguoi_tb, dthoai_tb, email_tb").keyup(function () {
        setNguoiLienHeTheoNguoiThongBao();
    });
    $("#btnTiepTheo").click(function () {
        $("#Tab_tabTimKiemDoiTuong").removeClass("disabledTab");
        var currentTab = _navTabTimKiemDoiTuong.currentTab;
        var selectedData = [];
        if ($("#modalOtherSearchDsGCN .tkiem_kh.active").length > 0) {
            selectedData.push({
                ma_doi_tac: $("#modalOtherSearchDsGCN .tkiem_kh.active").attr("data_ma_doi_tac"),
                ma_chi_nhanh: $("#modalOtherSearchDsGCN .tkiem_kh.active").attr("data_ma_chi_nhanh"),
                so_id: $("#modalOtherSearchDsGCN .tkiem_kh.active").attr("data_so_id"),
                so_id_dt: $("#modalOtherSearchDsGCN .tkiem_kh.active").attr("data_so_id_dt"),
                nv: $("#modalOtherSearchDsGCN .tkiem_kh.active").attr("data_nv")
            });
        }
        if (currentTab === "tabTimKiemDoiTuong") {
            if (selectedData.length === 1) {
                if (_frmOtherClaimSearch.isValid()) {
                    var dataRow = selectedData[0];
                    if (_frmOtherClaimCustomerInfo.getControl('so_id').val() == '' || _frmOtherClaimCustomerInfo.getControl('so_id').val() == undefined || _frmOtherClaimCustomerInfo.getControl('so_id').val() == null) {
                        _frmOtherClaimCustomerInfo.getControl('gio_tb').prop('readonly', false);
                        _frmOtherClaimCustomerInfo.getControl('ngay_tb').prop('readonly', false);
                        _frmOtherClaimCustomerInfo.getControl("gio_tb").val(gioHT);
                        _frmOtherClaimCustomerInfo.getControl("ngay_tb").val(dateNow);
                    }
                    _frmOtherClaimCustomerInfo.getControl("nv").val(dataRow.nv);
                    _frmOtherClaimCustomerInfo.getControl("ma_doi_tac").val(ESCS_MA_DOI_TAC);
                    _frmOtherClaimCustomerInfo.getControl("ma_chi_nhanh").val(dataRow.ma_chi_nhanh);
                    _frmOtherClaimCustomerInfo.getControl("so_id_hd").val(dataRow.so_id);
                    _frmOtherClaimCustomerInfo.getControl("so_id_dt").val(dataRow.so_id_dt);

                    _frmOtherClaimCustomerInfo.clearErrorMessage();
                    _navTabTimKiemDoiTuong.showTab("tabThongTinLienHe");
                }
            }
            else {
                _notifyService.error("Thông tin đối tượng không xác định");
            }
        } else if (currentTab === "tabThongTinLienHe") {
            _frmOtherClaimCustomerInfo.clearErrorMessage();
            _frmOtherClaimCustomerInfo.getControl('gio_tb').prop('readonly', false);
            _frmOtherClaimCustomerInfo.getControl('ngay_tb').prop('readonly', false);
            if (_frmOtherClaimCustomerInfo.isValid()) {
                var objJson = _frmOtherClaimCustomerInfo.getJsonData();
                objJson.nguon_tb = 'TTGD';
                var gio_tb = objJson.gio_tb.timeToNumber();
                var ngay_gio_tb = parseInt(objJson.ngay_tb + '' + gio_tb);
                var gio_ht = new Date().HHmm().timeToNumber();
                var ngay_ht = new Date().ddmmyyyy().dateToNumber();
                var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);

                _service.luuThongTinNguoiThongBao(objJson).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _frmOtherClaimCustomerInfo.getControl("so_hs").val(res.out_value.so_hs);
                    _frmOtherClaimCustomerInfo.getControl("so_id").val(res.out_value.so_id);
                    _frmDienBienTonThat.getControl("so_id").val(res.out_value.so_id);
                    var objGetDetail = { ma_doi_tac: objJson.ma_doi_tac, so_id: res.out_value.so_id }
                    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                        ho_so_chi_tiet = res;
                        ganTrangThaiHoSo(res);
                        _navOtherClaimContentTab.showTab("tabThongTinDienBienTonThat");
                        $("#modalOtherSearch").modal("hide");
                        /*bindDataDienBienTonThat(res);*/
                        /*showStep("stepDienBienTonThat");*/
                        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                        getPaging(1);
                        $("#btnXemToaDoThucTe").addClass("d-none");
                        _notifyService.success("Lưu thông tin thành công");
                    });
                }).catch(err => {
                });
            }
        }

    });

    $("#btnThemMoiHoSo").click(function () {
        _frmOtherClaimSearch.resetForm();
        _frmOtherClaimSearch.clearErrorMessage();
        _frmOtherClaimCustomerInfo.resetForm();
        _frmOtherClaimCustomerInfo.clearErrorMessage();
        _frmOtherClaimSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmOtherClaimSearch.getControl("ma_doi_tac").trigger("select2:select");
        _frmOtherClaimSearch.getControl("ngay_xr").setValue(new Date().ddmmyyyy());

        ESUtil.genHTML("modalOtherSearchDsGCNTemplate", "modalOtherSearchDsGCN", { data_info: [] });
        $("#modalOtherSearch").modal("show");
        _navTabTimKiemDoiTuong.showTab("tabTimKiemDoiTuong");
        /*showStep('tabTimKiemDoiTuong');*/
    });
    $("#btnOtherSearch").click(function () {
        if (!_frmOtherClaimSearch.isValid())
            return;
        timKiemDoiTuong();
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
});