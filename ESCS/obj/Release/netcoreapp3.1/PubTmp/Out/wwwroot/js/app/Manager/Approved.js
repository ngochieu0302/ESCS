const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = "PD";
const MAN_HINH = "PHE_DUYET";
const NV_TRINH = {
    XE: "XE",
    XE_MAY: "XE_MAY",
    NG: "NG",
    THANH_TOAN: "THANH_TOAN"
}
var thong_tin_toan_bo_ho_so = {};
var arrChiNhanhTKiem = [];
const NHOM_LHNV = {
    XE: "VCX",
    NGUOI: "NG",
    HANG_HOA: "HH",
    TNDS: "TNDS",
    NNTX: "NNTX",
    LPHU_XE: "LPHU_XE"
}
const DOI_TUONG_TT = {
    XE: "XE",
    NGUOI: "NGUOI",
    NGUOI_HK: "NGUOI_HK",
    HANG_HOA: "HANG_HOA",
    TAI_SAN: "TAI_SAN"
}
var arrNghiepVu = [
    { ma: "GD", ten: "Giám định", nv: "XE" },
    { ma: "BT", ten: "Bồi thường", nv: "XE" },
    { ma: "PD", ten: "Phê duyệt", nv: "XE" },
    { ma: "GD", ten: "Giám định", nv: "XE_MAY" },
    { ma: "BT", ten: "Bồi thường", nv: "XE_MAY" },
    { ma: "PD", ten: "Phê duyệt", nv: "XE_MAY" },
    { ma: "TN", ten: "Tiếp nhận", nv: "NG" },
    { ma: "BL", ten: "Bảo lãnh", nv: "NG" },
    { ma: "TT", ten: "Tính toán", nv: "NG" }
]
var arrNV_CT = [
    { ma: "PHE_DUYET_TU", ten: "Ý kiến duyệt", nv: "XE", pm: "PD" }
]
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var arrNhanXet = [];

var TAB_TO_TRINH = "divToTrinh";
var TAB_TAI_LIEU = "divTaiLieu";
var _commonService = new CommonService();
var _statusListService = new StatusListService();
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var objDanhMuc = {};
var arrTrangThai = [];
var arrAnhGiayToTaiLieu = [];
var ho_so_chi_tiet = {};
var so_id_1;
var ma_doi_tac_1;
var nv_1;
var lhnv_1;
var loai_trinh_1;
var ma_chi_nhanh_1;
var nghiep_vu;

var _service = new Service();
var _notifyService = new NotifyService();
var _approvedService = new ApprovedService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _trinhDuyetService = new TrinhDuyetService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _carInvestigationService = new CarInvestigationService();
var _carCompensationService = new CarCompensationService();
var _carClaimCommonService = new CarClaimCommonService();
var _userManagementService = new UserManagementService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _modalDocumentService = new ModalDocumentService();
var _modalThongTinHoSoService = new ModalThongTinHoSoService();

var _frmTimKiemHoSo = new FormService("frmTimKiemHoSo");
var _frmTaoNoiDung = new FormService("frmTaoNoiDung");
var _frmPheDuyet = new FormService("frmPheDuyet");
var _frmDanhSachToTrinh = new FormService("frmDanhSachToTrinh");
var _frmThemHMTT = new FormService("frmThemHMTT");

var _modalTaoNoiDung = new ModalService("modalTaoNoiDung");
var _modalChonNoiDung = new ModalDragService("modalChonNoiDung", undefined, "top");
var _modalXemHinhAnh = new ModalFullScreenService("modalXemHinhAnh", "navPheDuyet"); //tabPheDuyetContent
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "");
var _modalDeXuatGia = new ModalService("modalDeXuatGia", "");
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");
var _popoverGhiChu = new PopoverService("popoverGhiChu");
var _popoverDienGiai = new PopoverService("popoverDienGiai");
var _popoverGhiChuLSTT = new PopoverService("popoverGhiChuLSTT");
var _popoverChanDoan = new PopoverService("popoverChanDoan");
var _popoverNguyenNhanGiamTru = new PopoverService("popoverNguyenNhanGiamTru");

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
        getAnhThumnail({ ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.ho_so.so_id });
    }
};
var _uploadService = new UploadService(configUpload);

var configColumn = [
    { field: "nghiep_vu", title: "NV", width: "5%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_trinh", title: "Ngày trình", width: "7%", hozAlign: "center", headerSort: false },
    { field: "loai", title: "Loại", width: "16%", headerSort: false, hozAlign: "center" },
    { field: "so_hs", title: "Số hồ sơ/chứng từ", width: "15%", headerSort: false, hozAlign: "center" },
    { field: "lan", title: "Lần", width: "8%", headerSort: false, hozAlign: "center" },
    { field: "doi_tuong", title: "Đối tượng/NĐBH", width: "12%", headerSort: false, hozAlign: "center" },
    { field: "phe_duyet_ma", title: "Duyệt chính", width: "7%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "trang_thai", title: "Trạng thái", width: "7%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "tien", title: "Số tiền trình", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nguoi_trinh", title: "Người trình", width: "12%", hozAlign: "center", headerSort: false },
];
var _gridViewDanhSachHoSo = new GridViewService("gridViewDanhSachHoSo", configColumn, getPaging, rowClick);
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    var objGetDetail = {
        ma_doi_tac_xl: data.ma_doi_tac,
        ma_doi_tac: data.ma_doi_tac,
        ma_doi_tac_ql: data.ma_doi_tac_ql,
        so_id: data.so_id,
        nv: data.nv,
        lhnv: data.lh_nv,
        loai: data.ma,
        ten: data.loai,
        bt: data.bt,
        lan: data.lan,
        nguon: data.nguon,
        hanh_dong: data.hanh_dong
    };
    loadThongTinHoSoPheDuyet(objGetDetail, arrRes => {
        if (row !== undefined) {
            row.select();
        }
        _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(ho_so_chi_tiet.ds_doi_tuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (ho_so_chi_tiet.ds_doi_tuong != null && ho_so_chi_tiet.ds_doi_tuong.length > 0) ? ho_so_chi_tiet.ds_doi_tuong[0].so_id_doi_tuong : "");
        _uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            type: "image",
            nv: ho_so_chi_tiet.trinh_duyet_ct.nv,
            pm: "BT"
        });
        if (ESCS_MA_DOI_TAC == "PJICO") {
            $("#btnTuChoi").html('<i class="fas fa-share-square mr-2"></i> Trả lại HS');
        }
        showModalPheDuyet();
    });
}
function xemTab(tabId) {
    $(".tabPheDuyetContent").addClass("d-none");
    $("#navPheDuyet .breadcrumb-item").removeClass("active");
    $("#" + tabId + "TabItem").addClass("active");
    $("#" + tabId).removeClass("d-none");
}
function anHienNutDuyet() {
    $("#btnDuyet").addClass("d-none");
    $("#btnTuChoi").addClass("d-none");
    $("#btnHuyDuyet").addClass("d-none");
    var trinh_duyet = ho_so_chi_tiet.trinh_duyet.where(n => n.nguoi_duyet == ESCS_NSD).firstOrDefault();
    var trinh_duyet_chinh = ho_so_chi_tiet.trinh_duyet.where(n => n.phe_duyet == 1).firstOrDefault();
    if ((trinh_duyet_chinh.trang_thai == "D" || trinh_duyet_chinh.trang_thai == "T") && trinh_duyet_chinh.nguoi_duyet != ESCS_NSD) {
        return;
    }
    if (trinh_duyet != null) {
        if (trinh_duyet.trang_thai == "C") {
            $("#btnDuyet").removeClass("d-none");
            $("#btnTuChoi").removeClass("d-none");
        }
        if (trinh_duyet.trang_thai == "D") {
            $("#btnHuyDuyet").removeClass("d-none");
        }
        if (trinh_duyet.trang_thai == "T") {
            $("#btnDuyet").removeClass("d-none");
        }
    }
}
function getPaging(trang) {
    if (_frmTimKiemHoSo.isValid()) {
        var objTimKiem = _frmTimKiemHoSo.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _approvedService.paging(objTimKiem).then(res => {
            _gridViewDanhSachHoSo.setDataSource(res, trang);
        });
    }
}
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}
function calcHeight(iframeElement) {
    if (iframeElement && iframeElement && iframeElement.contentWindow && iframeElement.contentWindow.document && iframeElement.contentWindow.document.body) {
        var the_height = iframeElement.contentWindow.document.body.scrollHeight;
        iframeElement.height = the_height;
    }
}
function setIframe(id, html) {
    $('#viewHtml_iframe_viewer').attr("srcdoc", html);
}
function loadDsTrinhDuyet() {
    var to_trinh = ho_so_chi_tiet.to_trinh;
    var objGetDetail = {
        ma_doi_tac: ho_so_chi_tiet.to_trinh.ma_doi_tac,
        so_id: ho_so_chi_tiet.to_trinh.so_id,
        loai: ho_so_chi_tiet.to_trinh.loai,
        bt: ho_so_chi_tiet.to_trinh.bt,
        lan: ho_so_chi_tiet.to_trinh.lan
    };
    _approvedService.getDetail(objGetDetail).then(res => {
        ho_so_chi_tiet = res.data_info;
        ho_so_chi_tiet.to_trinh = to_trinh;
        ESUtil.genHTML("tblDanhSachTrinhDuyetTemplate", "tblDanhSachTrinhDuyet", res.data_info);
        anHienNutDuyet();
    });
}
function xemToTrinhNghiepVu(loai_trinh, ma_lhnv, nv_trinh = 'XE') {
    $("#navNghiepVu .breadcrumb-item").removeClass("active");
    $("#navNghiepVu .breadcrumb-item[data-lhnv='" + ma_lhnv + "']").addClass("active");
    $(".TABLE_LOAI_TRINH").addClass("d-none");
    $(".TABLE_" + loai_trinh).addClass("d-none");
    $("#" + loai_trinh).removeClass("d-none");
    if (ma_lhnv == null || ma_lhnv == "") {
        return;
    }
    if (nv_trinh == NV_TRINH.XE) {
        var lhnv = ho_so_chi_tiet.lh_nv.where(n => n.ma == ma_lhnv).firstOrDefault();
        var idBodyTable = loai_trinh + "_" + lhnv.nhom + "_" + lhnv.doi_tuong;
        $("#TABLE_" + idBodyTable).removeClass("d-none");
        var data = [];
        if (lhnv.nhom == NHOM_LHNV.XE) {
            data = ho_so_chi_tiet.hang_muc.where(n => n.lh_nv == ma_lhnv);
        }
        else {
            data = ho_so_chi_tiet.hang_muc_ct.where(n => n.lh_nv == ma_lhnv);
        }
        var tong = ho_so_chi_tiet.tong.where(n => n.lh_nv == ma_lhnv).firstOrDefault();
        ESUtil.genHTML("TABLE_BODY_" + idBodyTable + "_TEMPLATE", "TABLE_BODY_" + idBodyTable, { danh_sach: data }, () => {
            //Tờ trình giám định
            if ($("#TABLE_" + idBodyTable + "_CHI_PHI_DU_KIEN")) {
                if (lhnv.nhom == NHOM_LHNV.XE)
                    $("#TABLE_" + idBodyTable + "_CHI_PHI_DU_KIEN").html(ESUtil.formatMoney(data.sum(n => n.gia_giam_dinh)));
                else
                    $("#TABLE_" + idBodyTable + "_CHI_PHI_DU_KIEN").html(ESUtil.formatMoney(data.sum(n => n.tien_tt)));
            }
            //Tờ trình phương án, Trờ trình từ chối bồi thường xe

            if ($("#TABLE_" + idBodyTable + "_TIEN_VTU")) {
                if (lhnv.nhom == NHOM_LHNV.XE)
                    $("#TABLE_" + idBodyTable + "_TIEN_VTU").html(ESUtil.formatMoney(data.sum(n => n.tien_vtu_dx)));
            }
            if ($("#TABLE_" + idBodyTable + "_TIEN_NHAN_CONG")) {
                if (lhnv.nhom == NHOM_LHNV.XE)
                    $("#TABLE_" + idBodyTable + "_TIEN_NHAN_CONG").html(ESUtil.formatMoney(data.sum(n => n.tien_nhan_cong_dx)));
            }

            if ($("#TABLE_" + idBodyTable + "_TIEN_TTGD")) {
                if (lhnv.nhom == NHOM_LHNV.XE)
                    $("#TABLE_" + idBodyTable + "_TIEN_TTGD").html(ESUtil.formatMoney(data.sum(n => n.tong_cong)));
                else
                    $("#TABLE_" + idBodyTable + "_TIEN_TTGD").html(ESUtil.formatMoney(data.sum(n => n.tien_tt)));
            }
            if ($("#TABLE_" + idBodyTable + "_TIEN_DE_XUAT")) {
                if (lhnv.nhom == NHOM_LHNV.XE)
                    $("#TABLE_" + idBodyTable + "_TIEN_DE_XUAT").html(ESUtil.formatMoney(data.sum(n => n.gia_duyet_dx)));
                else
                    $("#TABLE_" + idBodyTable + "_TIEN_DE_XUAT").html(ESUtil.formatMoney(data.sum(n => n.tien_dx_pa)));
            }

            if ($("#TABLE_" + idBodyTable + "_TIEN_DUYET")) {
                $("#TABLE_" + idBodyTable + "_TIEN_DUYET").html(ESUtil.formatMoney(data.sum(n => n.tien_duyet)));
            }

            if (tong != null) {
                if ($("#" + idBodyTable + "_TONG_MIEN_THUONG")) {
                    $("#" + idBodyTable + "_TONG_MIEN_THUONG").html(ESUtil.formatMoney(tong.tien_mien_thuong));
                }
                if ($("#" + idBodyTable + "_TONG_BOI_THUONG")) {
                    $("#" + idBodyTable + "_TONG_BOI_THUONG").html(ESUtil.formatMoney(tong.tien_duyet_gia - tong.tien_mien_thuong));
                }
                if ($("#" + idBodyTable + "_TONG_THUE")) {
                    $("#" + idBodyTable + "_TONG_THUE").html(ESUtil.formatMoney(tong.tien_thue));
                }
                if ($("#" + idBodyTable + "_TONG_CHI_TRA")) {
                    $("#" + idBodyTable + "_TONG_CHI_TRA").html(ESUtil.formatMoney(tong.tien_duyet_gia - tong.tien_mien_thuong + tong.tien_thue));
                }
            }
        });

        if (tong != null) {
            if ($("#" + loai_trinh + "_SO_VU_TT")) {
                $("#" + loai_trinh + "_SO_VU_TT").html(tong.so_vu);
            }
            if ($("#" + loai_trinh + "_KHAU_TRU")) {
                $("#" + loai_trinh + "_KHAU_TRU").html(tong.khau_tru == "c" ? "Có" : "Không");
            }
            if ($("#" + loai_trinh + "_MIEN_THUONG")) {
                $("#" + loai_trinh + "_MIEN_THUONG").html(ESUtil.formatMoney(tong.tien_mien_thuong / tong.so_vu));
            }
            if ($("#" + loai_trinh + "_THUE")) {
                $("#" + loai_trinh + "_THUE").html(ESUtil.formatMoney(tong.tien_thue));
            }
            if ($("#" + loai_trinh + "_TL_THUE")) {
                $("#" + loai_trinh + "_TL_THUE").html(tong.thue);
            }
        }
    }
}
function xemToTrinhConNguoi(loai_trinh, lan) {
    $(".TABLE_LOAI_TRINH").addClass("d-none");
    $("#" + loai_trinh).removeClass("d-none");
    if (loai_trinh == "NG_TRINH_DUYET_BAO_LANH") {
        $("#navNghiepVu").parent().removeClass("d-none");
        $("#navNghiepVu .breadcrumb-item").removeClass("active");
        $("#navNghiepVu .breadcrumb-item[data-lan='" + lan + "']").addClass("active");

        $("#" + loai_trinh + "_CT").removeClass("d-none");
        ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_TEMPLATE", "TABLE_BODY_" + loai_trinh, { danh_sach: ho_so_chi_tiet.hang_muc }, () => {
            $("#TABLE_NG_TRINH_DUYET_BAO_LANH_TIEN_YC").html(ESUtil.formatMoney(ho_so_chi_tiet.hang_muc.sum(n => n.tien_yc)));
            $("#TABLE_NG_TRINH_DUYET_BAO_LANH_TIEN_GIAM").html(ESUtil.formatMoney(ho_so_chi_tiet.hang_muc.sum(n => n.tong_tien_giam)));
            $("#TABLE_NG_TRINH_DUYET_BAO_LANH_TIEN_DUYET").html(ESUtil.formatMoney(ho_so_chi_tiet.hang_muc.sum(n => n.tien_duyet)));
        });
        ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_CT_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_CT", { danh_sach: [] });
    }
    else {
        $("#navNghiepVu").parent().addClass("d-none");
        $("#" + loai_trinh + "_LAN_KHAM").removeClass("d-none");
        $("#" + loai_trinh + "_QLOI").removeClass("d-none");
        $("#" + loai_trinh + "_QLOI_CT").removeClass("d-none");
        ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_LAN_KHAM_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_LAN_KHAM", { danh_sach: ho_so_chi_tiet.lh_nv }, () => {
            $(".TABLE_NG_TRINH_DUYET_TIEN_YC").html(ESUtil.formatMoney(ho_so_chi_tiet.lh_nv.sum(n => n.tien_yc)));
            $(".TABLE_NG_TRINH_DUYET_TIEN_GIAM").html(ESUtil.formatMoney(ho_so_chi_tiet.lh_nv.sum(n => n.tien_giam)));
        });
        ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_QLOI_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_QLOI", { danh_sach: [] });
        ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_QLOI_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_QLOI_CT", { danh_sach: [] });
        if (ho_so_chi_tiet.lh_nv.length > 0) {
            xemChiTietLanKham(loai_trinh, ho_so_chi_tiet.lh_nv[0].lan);
            if (ho_so_chi_tiet.hang_muc.length > 0) {
                xemChiTietQLoi(loai_trinh, ho_so_chi_tiet.lh_nv[0].lan, ho_so_chi_tiet.hang_muc[0].id_qloi);
            }
        }
    }
}
function xemChiTietLanKham(loai_trinh, lan) {
    var data = ho_so_chi_tiet.hang_muc.where(n => n.lan == lan);
    $("#TABLE_BODY_" + loai_trinh + "_LAN_KHAM tr").removeClass("active");
    $("#TABLE_BODY_" + loai_trinh + "_LAN_KHAM tr[data-lan='" + lan + "']").addClass("active");
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_QLOI_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_QLOI", { danh_sach: data });
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_QLOI_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_QLOI_CT", { danh_sach: [] });
}
function xemChiTietQLoi(loai_trinh, lan, id_qloi) {
    var data = ho_so_chi_tiet.hang_muc_ct.where(n => n.lan == lan && n.id_qloi == id_qloi);
    $("#TABLE_BODY_" + loai_trinh + "_QLOI tr").removeClass("active");
    $("#TABLE_BODY_" + loai_trinh + "_QLOI tr[data-lan='" + lan + "'][data-id-qloi='" + id_qloi + "']").addClass("active");
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_QLOI_CT_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_QLOI_CT", { danh_sach: data });
}
function xemToTrinhThanhToan(loai_trinh) {
    $(".TABLE_LOAI_TRINH").addClass("d-none");
    $("#" + loai_trinh).removeClass("d-none");
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_TEMPLATE", "TABLE_BODY_" + loai_trinh, { danh_sach: ho_so_chi_tiet.hang_muc });
}
function xemToTrinhGiamDinhHoSo(loai_trinh) {
    $(".TABLE_LOAI_TRINH").addClass("d-none");
    //$("#" + loai_trinh).removeClass("d-none");
    //if (loai_trinh == "TRINH_DUYET_HO_SO_GIAM_DINH") {

    //    $("#" + loai_trinh + "_CT").removeClass("d-none");
    //    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_TEMPLATE", "TABLE_BODY_" + loai_trinh, { danh_sach: ho_so_chi_tiet.hang_muc }, () => {
            
    //    });
    //    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_CT_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_CT", { danh_sach: [] });
    //}
}
function xemToTrinhTamUngBT(loai_trinh) {
    $(".TABLE_LOAI_TRINH").addClass("d-none");
    $("#" + loai_trinh).removeClass("d-none");
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_TEMPLATE", "TABLE_BODY_" + loai_trinh, { danh_sach: ho_so_chi_tiet.hang_muc }, () => {
        var tong = 0;
        $.each(ho_so_chi_tiet.hang_muc, (index, item) => {
            tong += parseFloat(item.tien);
        });
        $('#tong_tien_yc_tu').html(ESUtil.formatMoney(tong));
    });
}
function xemChiTietQuyenLoi(loai_trinh, id_qloi) {
    $("#TABLE_BODY_" + loai_trinh + " tr").removeClass("active");
    $("#TABLE_BODY_" + loai_trinh + " tr[data-id-qloi='" + id_qloi + "']").addClass("active");

    var data = ho_so_chi_tiet.hang_muc_ct.where(n => n.id_qloi == id_qloi);
    ESUtil.genHTML("TABLE_BODY_" + loai_trinh + "_CT_TEMPLATE", "TABLE_BODY_" + loai_trinh + "_CT", { danh_sach: data });
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac: arr[0],
        so_id: arr[1],
        nv: arr[2],
        lh_nv: arr[3],
        ma: arr[4],
        bt: arr[5],
        loai: arr[6],
        hanh_dong: arr[7]
    };
    rowClick(data);
}
function showModalPheDuyet() {
    $("#CarCompensationModal").esmodal("show");
}
function getAnhThumnail(obj, callback = undefined) {
    _carInvestigationService.layDanhSachFile(obj).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function bindAnhThumnail(arrAnh) {
    $("#dsAnhTonThat").html("");
    $("#dsNhomAnh").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return;
    }
    var arrDataCPL = [];
    var arrDataTT = [];
    var arrDataTC = [];
    var arrDataTL = [];
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
    }
    var arrData = [
        { loai_tai_lieu: "CPL", ten_loai_tai_lieu: "Ảnh chưa phân loại", so_luong_tai_lieu: arrDataCPL.length },
        { loai_tai_lieu: "TT", ten_loai_tai_lieu: "Ảnh tổn thất", so_luong_tai_lieu: arrDataTT.length },
        { loai_tai_lieu: "TC", ten_loai_tai_lieu: "Ảnh toàn cảnh/hiện trường", so_luong_tai_lieu: arrDataTC.length },
        { loai_tai_lieu: "TL", ten_loai_tai_lieu: "Tài liệu", so_luong_tai_lieu: arrDataTL.length }
    ];

    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
            $("#dsNhomAnh").append('<button class="dropdown-item" type="button" data-id="nhom_anh_' + i + '" onclick="goToScroll(\'nhom_anh_' + i + '\')">' + arrAnh[i].nhom_anh + '</button>');
        }
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, ma_file, loai, ...object }) => {
        acc[ma_file] = (acc[ma_file] || []);
        acc[ma_file].push({ bt, ma_file, ma_chi_nhanh, loai, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ ma_file: key == null || key == "null" ? '' : key, loai: "", nhom: "", children: value }));

    for (var i = 0; i < result.length; i++) {
        if (result[i].ma_file == "") {
            result[i].nhom = "Ảnh chưa phân loại";
            result[i].loai = 'CPL';
        }
        else {
            if (result[i].children.length > 0) {
                result[i].nhom = result[i].children.firstOrDefault().nhom_anh;
                result[i].loai = result[i].children.firstOrDefault().loai;
            }
            else {
                result[i].nhom = "Không xác định";
                result[i].loai = "";
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
    return result;
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
function onToggleImg(index) {
    var count = $(".nhom_anh_ton_that_" + index + ":checked").length;
    var count_check = $(".nhom_anh_ton_that_" + index).length;
    if (count < count_check) {
        $(".nhom_anh_ton_that_" + index).prop("checked", true);
    } else {
        $(".nhom_anh_ton_that_" + index).prop("checked", false);
    }
}
function xemChiTietNguoiTrinh(el, nd) {
    $("#y_kien_nguoi_duyet_khac").val("");
    if (nd != undefined && nd != null && nd != "") {
        $("#y_kien_nguoi_duyet_khac").val(nd);
    }
}

function layMaMauInKySo(loai_trinh, nv = "TN", loai = "", hanh_dong = "") {
    if (ESCS_MA_DOI_TAC == "OPES") {
        if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD") 
            return "OPES_BCGD";
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN") 
            return "OPES_DE_XUAT_PHUONG_AN_SC";
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH") 
            return "OPES_TB_BOI_THUONG_BAI_NAI,OPES_GIAY_BAO_LANH_THANH_TOAN";
        if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG") 
            return "OPES_TO_TRINH_BOI_THUONG,OPES_TB_BOI_THUONG_BAI_NAI,OPES_GIAY_BAO_LANH_THANH_TOAN";
        if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI') 
            return "OPES_TB_TU_CHOI_TB,OPES_TO_TRINH_TU_CHOI_BT";
        if (loai_trinh == 'TRINH_THANH_TOAN')
            return "OPES_DE_NGHI_THANH_TOAN_BT";
        return;
    }
    //XE Ô TÔ
    if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD")
        return "ESCS_BCGD";
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong != 'PHUONG_AN_BOI_THUONG_BAO_LANH')
        return "ESCS_TB_DUYET_PHUONG_AN,ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == 'PHUONG_AN_BOI_THUONG_BAO_LANH') 
        return "ESCS_TB_DUYET_PHUONG_AN,ESCS_THONG_BAO_BOI_THUONG,ESCS_THONG_BAO_DUYET_BAO_LANH,ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA,ESCS_TO_TRINH_BOI_THUONG";
    if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG")
        return "ESCS_THONG_BAO_BOI_THUONG,ESCS_THONG_BAO_DUYET_BAO_LANH,ESCS_TO_TRINH_BOI_THUONG";
    if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI')
        return "ESCS_TB_TU_CHOI_TB,ESCS_TO_TRINH_TU_CHOI_BT";
    if (loai_trinh == 'NG_TRINH_DUYET_BAO_LANH') 
        return "ESCS_TB_GYCXNBL_QL_KHAC";
    if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && loai == 'BLVP')
        return "ESCS_TB_TU_CHOI_BLVP";
    if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && loai == 'HSTT')
        return "ESCS_TBTCTTBH";
    if (loai_trinh == 'NG_TRINH_DUYET_DUYET_GIA') 
        return "ESCS_TT_DXBT_QL_KHAC";
    if (loai_trinh == 'NG_TRINH_DUYET_BOI_THUONG') 
        return "ESCS_PATTBH";
    if (loai_trinh == 'TRINH_THANH_TOAN') 
        return "ESCS_TTBT";
    if (loai_trinh == 'XE_TRINH_DUYET_TAM_UNG_BT') 
        return "ESCS_TAM_UNG_BT";
    //XE MÁY
    if (loai_trinh == "XE_MAY_TRINH_DUYET_BAO_CAO_GD")
        return "ESCS_BCGD_XE_MOTO";
}
function layFileHienThi(loai_trinh, nv = "TN", nguon, hanh_dong) {
    if (ESCS_MA_DOI_TAC == "OPES") {
        if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD")
            return "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG";//OPES_XE_BBGD_XCG
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN")
            return "OPES_DE_XUAT_PHUONG_AN_SC";
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH")
            return "OPES_TO_TRINH_BOI_THUONG";
        if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG") 
            return "OPES_TO_TRINH_BOI_THUONG";
        if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI') 
            return "OPES_TO_TRINH_TU_CHOI_BT";
        if (loai_trinh == 'XE_TRINH_DUYET_TAM_UNG_BT')
            return "OPES_TAM_UNG_BOI_THUONG";
        if (loai_trinh == 'TRINH_THANH_TOAN')
            return "OPES_DE_NGHI_THANH_TOAN_BT";
        return;
    }
    if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD") 
        return "ESCS_BCGD";
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN")
        return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH")
        return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG") 
        return "ESCS_TO_TRINH_BOI_THUONG";
    if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI') 
        return "ESCS_TO_TRINH_TU_CHOI_BT";
    if (loai_trinh == 'NG_TRINH_DUYET_BAO_LANH') 
        return "ESCS_NG_TO_TRINH_DUYET_BAO_LANH";
    if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && (nguon == "BLVP" || nguon == 'CSYT'))
        return "ESCS_NG_TRINH_TU_CHOI_BLVP";
    if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && (nguon == "HSTT" || nguon == 'MOBILE')) 
        return "ESCS_NG_TO_TRINH_TU_CHOI_BH";
    if (loai_trinh == 'NG_TRINH_DUYET_DUYET_GIA') 
        return "ESCS_TT_DXBT";
    if (loai_trinh == 'NG_TRINH_DUYET_BOI_THUONG') 
        return "ESCS_TT_DXBT";
    if (loai_trinh == 'TRINH_THANH_TOAN') 
        return "ESCS_TTBT";
    if (loai_trinh == 'XE_TRINH_DUYET_TAM_UNG_BT') 
        return "ESCS_TAM_UNG_BT";
    if (loai_trinh =='TRINH_DUYET_HO_SO_GIAM_DINH')
        return "ESCS_TRINH_GIAM_DINH_HS";

    //XE MÁY
    if (loai_trinh == "XE_MAY_TRINH_DUYET_BAO_CAO_GD")
        return "ESCS_BCGD_XE_MOTO";
}
function layMaMauInKhongKySo(loai_trinh, nv = "TN") {
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && nv != 'BB') {
        return "ESCS_DUYET_PASC";
    }
    return "";
}
function layMaMauEmail(loai_trinh, nv) {
    if (loai_trinh == "XE_TRINH_DUYET_GIAM_DINH") {
        return "TEMPLATE_EMAIL_BBGD,TEMPLATE_EMAIL_DUYET_GD";
    }
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && nv != 'BB') {
        return "TEMPLATE_EMAIL_PDBG,TEMPLATE_EMAIL_DUYET_PA";
    }
    if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && nv == 'BB') {
        return "TEMPLATE_EMAIL_DUYET_PA";
    }
    if (loai_trinh == "XE_TRINH_DUYET_BAO_LANH") {
        return "TEMPLATE_EMAIL_TBBL,TEMPLATE_EMAIL_DUYET_BAO_LANH";
    }
    if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG" && nv != "BB") {
        return "TEMPLATE_EMAIL_DUYET_BT";
    }
    if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG" && nv == "BB") {
        return "TEMPLATE_EMAIL_DUYET_BT";
    };
    if (loai_trinh == "NG_TRINH_DUYET_BAO_LANH") {
        return "TEMPALTE_EMAIL_DUYET_BL";
    };
    if (loai_trinh == "NG_TRINH_DUYET_DUYET_GIA") {
        return "TEMPLATE_EMAIL_NG_DUYET_PA";
    };

    //if (loai_trinh == "NG_TRINH_DUYET_BOI_THUONG") {
    //    return "TEMPLATE_EMAIL_NG_TC_DUYET_BT";
    //};
    return "";
}

function layDuLieuXE() {
    var arr_vcx = ho_so_chi_tiet.hang_muc.where(n => n.nhom == NHOM_LHNV.XE).select(n => {
        var a = {};
        a.bt = n.bt;
        a.nhom = n.nhom;
        a.hang_muc = n.hang_muc;
        a.tien_vtu_duyet = n.tien_vtu_duyet;
        a.tien_nhan_cong_duyet = n.tien_nhan_cong_duyet;
        a.tien_khac_duyet = n.tien_khac_duyet;
        a.tien_duyet = n.tien_duyet;
        return a;
    });
    if (ho_so_chi_tiet.hang_muc_ct != null && ho_so_chi_tiet.hang_muc_ct.length > 0) {
        var arr_khac = ho_so_chi_tiet.hang_muc_ct.select(n => {
            var a = {};
            a.bt = n.bt;
            a.nhom = n.nhom;
            a.hang_muc = n.hang_muc;
            a.tien_duyet = n.tien_duyet;
            return a;
        });
        arr_vcx = arr_vcx.concat(arr_khac);
    }
    return arr_vcx
}
function updateTien(el, bt, nhom, loai = undefined) {
    var val = $(el).val().replace(/[^0-9]+/g, '');;
    if (val == "") {
        val = "0";
    }
    if (nhom == NHOM_LHNV.XE) {
        var item = ho_so_chi_tiet.hang_muc.where(n => n.bt == bt).firstOrDefault();
        if (loai == "TIEN_VTU_DUYET") {
            item.tien_vtu_duyet = parseFloat(val);
        }
        if (loai == "TIEN_NHAN_CONG_DUYET") {
            item.tien_nhan_cong_duyet = parseFloat(val);
        }
        if (loai == "TIEN_KHAC_DUYET") {
            item.tien_khac_duyet = parseFloat(val);
        }
        item.tien_duyet = item.tien_vtu_duyet + item.tien_nhan_cong_duyet + item.tien_khac_duyet;

        $("#vcx_hang_muc_" + bt).val(ESUtil.formatMoney(item.tien_duyet));
        if (loai == "TIEN_VTU_DUYET" || loai == "TIEN_NHAN_CONG_DUYET" || loai == "TIEN_KHAC_DUYET") {
            var arr = layDuLieuXE();
            var tien_vtu_duyet = arr.sum(n => n.tien_vtu_duyet);
            var tong_tien_nhan_cong_duyet = arr.sum(n => n.tien_nhan_cong_duyet);
            var tong_tien_khac_duyet = arr.sum(n => n.tien_khac_duyet);

            if ($("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_VTU").length > 0) {
                $("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_VTU").html(ESUtil.formatMoney(tien_vtu_duyet));
            }
            if ($("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_NHAN_CONG").length > 0) {
                $("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_NHAN_CONG").html(ESUtil.formatMoney(tong_tien_nhan_cong_duyet));
            }
            if ($("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_KHAC").length > 0) {
                $("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_KHAC").html(ESUtil.formatMoney(tong_tien_khac_duyet));
            }
            if ($("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_DUYET").length > 0) {
                $("#TABLE_XE_TRINH_DUYET_DUYET_GIA_VCX_XE_TIEN_DUYET").html(ESUtil.formatMoney(tien_vtu_duyet + tong_tien_nhan_cong_duyet + tong_tien_khac_duyet));
            }
        }
    }
    else {
        var item = ho_so_chi_tiet.hang_muc_ct.where(n => n.bt == bt).firstOrDefault();
        item.tien_duyet = parseFloat(val);
    }
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
function showDienGiai(el) {
    _popoverDienGiai.options = { placement: "bottom bottom-right" };
    $("#divDienGiai_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divDienGiai_NoiDung").val(val);
    _popoverDienGiai.showWithPosition(el);
}
function dongPopover(el) {
    $(el).parent().parent().hide();
}
function bindThongTinFormNhanXet() {
    $("#modalTaoNoiDungFormLietKe").addClass("d-none");
    $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
    _frmTaoNoiDung.getControl("nv").setValue("XE");
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue("PD");
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("nv_ct").setValue("PHE_DUYET_TU");
    _frmTaoNoiDung.getControl("ma_doi_tac").readOnly();
    _frmTaoNoiDung.getControl("nv").readOnly();
    _frmTaoNoiDung.getControl("pm").readOnly();
}
function chonNhanXet(el) {
    $("#modalChonNoiDungDanhSach .modalChonNoiDungItem").prop("checked", false);
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.to_trinh.ma_doi_tac_xl,
        pm: CONSTANT_PM,
        nv: "XE",
        nv_ct: "PHE_DUYET_TU"
    }
    loadDuLieuFormNhanXet(el, obj);
}
function loadDuLieuFormNhanXet(el, obj) {
    _carClaimCommonService.layDanhSachNoiDung(obj).then(res => {
        arrNhanXet = res.data_info.noi_dung;
        ESUtil.genHTML("modalChonNoiDungDanhSachTemplate", "modalChonNoiDungDanhSach", { danh_sach: arrNhanXet }, () => {
            $("#modalChonNoiDungDanhSach .single_checked").click(function () {
                $("#modalChonNoiDungDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var val = $(el).attr("data-val");
        $("#modalChonNoiDungDanhSach .dscnd").removeClass("d-none");
        $("#inputSearch_ChonNoiDung").setValue("");
        $("#inputSearch_ChonNoiDung").focus();
        $("#inputSearch_ChonNoiDung").val();
        $("#modalChonNoiDungDanhSach .modalChonNoiDungItem").prop("checked", false);
        if (val != undefined && val != null && val != "") {
            $("#modalChonNoiDungDanhSach .modalChonNoiDungItem[value='" + val + "']").prop("checked", true);
        }
        _modalChonNoiDung.show(el);
    });
}
function getPagingDanhSachNoiDung(trang, callback = undefined) {
    var objTKiem = _frmTaoNoiDung.getJsonData();
    objTKiem.trang = trang;
    objTKiem.so_dong = 7;
    _carClaimCommonService.lietKePhanTrangNoiDung(objTKiem).then(res => {
        var data = res.data_info.data;
        ESUtil.genHTML("tblDanhSachNoiDung_template", "tblDanhSachNoiDung", { data: data });
        $("#tblDanhSachNoiDung_pagination").html(ESUtil.pagingHTML("getPagingDanhSachNoiDung", objTKiem.trang, res.data_info.tong_so_dong, objTKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function suaNoiDung(ma_doi_tac, so_id, pm, nv, nv_ct, noi_dung) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        pm: pm,
        nv: nv,
        nv_ct: nv_ct,
        noi_dung: noi_dung
    };
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("nv").setValue(obj.nv);
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue(obj.pm);
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("nv_ct").setValue(obj.nv_ct);
    _frmTaoNoiDung.setData(obj);
    $("#modalTaoNoiDungFormLietKe").addClass("d-none");
    $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    $("#btnXoaNoiDung").show();
}
function initImageViewerHangMuc() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-hang-muc');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-hang-muc-container',
        id: 'img-hang-muc-container',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function openModalImages(val) {
    _approvedService.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so.so_id
    }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            var ext = [".jpg", ".png", ".jpeg", ".gif"];
            var ds_anh = res.data_info.where(n => ext.includes(n.extension))
            var arrAnhHangMuc = bindAnhThumnail(ds_anh);
            ESUtil.genHTML("dsHinhAnhHangMucTemplate", "dsHinhAnhHangMuc", { danh_sach: arrAnhHangMuc });
            $('#input_imagesCategory').val(val);
            $("#input_imagesCategory").trigger('keyup');
        }
        initImageViewerHangMuc();
        _modalXemHinhAnh.show();
    })
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
function showChanDoan(el) {
    _popoverChanDoan.options = { placement: "top top-right" };
    $("#divChanDoan_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divChanDoan_NoiDung").val(val);
    _popoverChanDoan.showWithPosition(el);
}
/*Code xem toàn bộ thông tin hồ sơ*/
function xemToanBoThongTinHoSoBoiThuong() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh_ql: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        nv: ho_so_chi_tiet.ho_so.nghiep_vu,
        man_hinh: 'PHE_DUYET'
    }
    _modalThongTinHoSoService.data = obj;
    _modalThongTinHoSoService.xemChiTietThongTinHoSo();
}
function loadThongTinHoSoPheDuyet(objGetDetail, callback) {
    nghiep_vu = objGetDetail.nv;
    _service.all([
        _commonService.InPdf({
            ma_mau_in: layFileHienThi(objGetDetail.loai, objGetDetail.lhnv, objGetDetail.nguon, objGetDetail.hanh_dong),
            so_id: objGetDetail.so_id,
            loai: objGetDetail.loai,
            ma_dt_trinh: "",
            ma_doi_tac: objGetDetail.ma_doi_tac,
            ma_doi_tac_ql: objGetDetail.ma_doi_tac_ql
        }),
        _approvedService.getDetail(objGetDetail)
    ]).then(arrRes => {
        ho_so_chi_tiet = arrRes[1].data_info;
        ho_so_chi_tiet.ho_so.nv = objGetDetail.lhnv;
        ho_so_chi_tiet.to_trinh = objGetDetail;
        xemTab(TAB_TO_TRINH);
        PDFObject.embed("data:application/pdf;base64," + arrRes[0],
            "#viewHtml", {
            pdfOpenParams: {
                navpanes: 0,
                statusbar: 0,
                toolbar: 0,
                view: "FitH",
                pagemode: "bookmarks"
            }
        });
        var trinh_duyet = ho_so_chi_tiet.trinh_duyet.where(n => n.nguoi_duyet == ESCS_NSD).firstOrDefault();
        _frmPheDuyet.getControl("noi_dung").setValue("");
        _frmPheDuyet.getControl("noi_dung_duyet").setValue("");
        if (trinh_duyet == null) {
            _notifyService.error("Bạn không có trong danh sách người duyệt");
            return;
        }
        _frmPheDuyet.getControl("noi_dung").setValue(trinh_duyet.noi_dung);
        _frmPheDuyet.getControl("noi_dung_duyet").setValue(trinh_duyet.noi_dung_duyet);
        _frmDanhSachToTrinh.getControl("to_trinh").setDataSource(ho_so_chi_tiet.ds_trinh, "to_trinh", "bt", "", objGetDetail.bt);
        anHienNutDuyet();
        //Nghiệp vụ xe
        var lh_nv = ho_so_chi_tiet.lh_nv[0];
        if (objGetDetail.nv == "XE" && lh_nv == undefined && objGetDetail.loai != 'XE_TRINH_DUYET_BAO_CAO_GD') {
            _notifyService.error("Không xác định được loại hình nghiệp vụ phê duyệt");
            return;
        }
        if (objGetDetail.nv == "XE") {
            $("#navNghiepVu").removeClass("d-none");
            $("#divXemThongTinHoSoGD").removeClass("d-none");
            $("#divXemThongTinHoSoBT").removeClass("d-none");
            $(".tabThongTinInAnXeOTo").removeClass("d-none");
            if (objGetDetail.loai == 'XE_TRINH_DUYET_BAO_CAO_GD') {
                xemToTrinhNghiepVu(objGetDetail.loai, "");
                $("#navNghiepVu").addClass("d-none");
            }
            else if (objGetDetail.loai == 'XE_TRINH_DUYET_TAM_UNG_BT') {
                xemToTrinhTamUngBT(objGetDetail.loai);
            } else {
                ESUtil.genHTML("navNghiepVuTemplate", "navNghiepVu", { danh_sach: ho_so_chi_tiet.lh_nv });
                xemToTrinhNghiepVu(objGetDetail.loai, lh_nv.ma);
            }
            $("#frmDanhSachToTrinh").removeClass("d-none");
        }
        //Nghiệp vụ con người
        if (objGetDetail.nv == "NG") {
            $("#navNghiepVu").parent().removeClass("d-none");
            $("#divXemThongTinHoSoGD").addClass("d-none");
            $("#divXemThongTinHoSoBT").addClass("d-none");
            ESUtil.genHTML("navNghiepVuNGUOITemplate", "navNghiepVu", { danh_sach: ho_so_chi_tiet.lh_nv });
            xemToTrinhConNguoi(objGetDetail.loai, lh_nv.lan);
            if (ho_so_chi_tiet.hang_muc.length > 0) {
                xemChiTietQuyenLoi(objGetDetail.loai, ho_so_chi_tiet.hang_muc[0].id_qloi);
            }
            $("#frmDanhSachToTrinh").addClass("d-none");
        }
        //Nghiệp vụ thanh toán
        if (objGetDetail.nv == "THANH_TOAN") {
            $("#navNghiepVu").parent().addClass("d-none");
            xemToTrinhThanhToan(objGetDetail.loai);
        }
        //Nghiệp vụ giám định hồ sơ
        if (objGetDetail.nv == "HSGD") {
            $("#navNghiepVu").parent().addClass("d-none");
            xemToTrinhGiamDinhHoSo(objGetDetail.loai);
        }
        $("#CarCompensationModal #noi_dung_trinh").html(objGetDetail.ten);
        ESUtil.genHTML("tblDanhSachTrinhDuyetTemplate", "tblDanhSachTrinhDuyet", ho_so_chi_tiet);
        getAnhThumnail({ ma_doi_tac: objGetDetail.ma_doi_tac, so_id: objGetDetail.so_id, ma_chi_nhanh: '' });
        $("#y_kien_nguoi_duyet_khac").val("");
        if (callback) {
            callback(arrRes);
        }

    });
}
function copyLinkChupHT(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
function copyLinkChupCT(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
function copyDataVal(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
//Xem màn hình GD, BT
function ShowInvestigationDisplay() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_GD'
    };
    var notify_url = "/carclaim/carinvestigation";
    window.open("/Manager/Approved/TransInvestigationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
}
function ShowCompensationDisplay() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_BT'
    };
    var notify_url = "/carclaim/carcompensation";
    window.open("/Manager/Approved/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
}
//Tìm kiếm nhiều chi nhánh
function onFocusTimKiem(el) {
    $(el).focus();
}
function onChonDonViXuly(el, placement = "bottom") {
    $("#chon_tat_ca").prop("checked", false);
    var count_item = $(".modalChonChiNhanh").length;
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonChiNhanhDanhSach .modalChonChiNhanh").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanh[value='" + arr[i] + "']").prop("checked", true);
    }
    if (count_item === arr.length)
        $("#chon_tat_ca").prop("checked", true);
    _modalChonChiNhanh.setPlacement(placement);
    _modalChonChiNhanh.show(el);
}
function onChonTatCaDonVi(el) {
    arrChiNhanhTKiem = [];
    var checked = $(el).is(":checked");
    if (checked) {
        $(".modalChonChiNhanh").prop("checked", checked);
        $.each($("#modalChonChiNhanhDanhSach input.modalChonChiNhanh"), function (index, item) {
            if ($('.modalChonChiNhanh').is(':checked')) {
                var val = $(item).val();
                arrChiNhanhTKiem.push(val);
                $("#modalChonChiNhanhTimKiem_ma").val(arrChiNhanhTKiem.join("|"));
            }
        });
    } else {
        $(".modalChonChiNhanh").prop("checked", false);
        $("#modalChonChiNhanhTimKiem_ma").val("");
    }
}
function onChonDonVi(el) {
    var count_item = $(".modalChonChiNhanh").length;
    var count_checked = $(".modalChonChiNhanh:checked").length;
    $("#chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#modalChonChiNhanhTimKiem_ma").val() != "") {
        arr_ma = $("#modalChonChiNhanhTimKiem_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#modalChonChiNhanhTimKiem_ma").val(arr_ma.join("|"));
}
$(document).ready(function () {
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
    _frmTimKiemHoSo.getControl("ngayd").setValue(ngayDauThang);
    _frmTimKiemHoSo.getControl("ngayc").setValue(dateNow);
    _frmTimKiemHoSo.getControl("phe_duyet").setValue("1");
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.getBranch(),
        _statusListService.layDsTrangThai(),
        _commonService.layControl({ nv: "XE" }),
        _userManagementService.layDsNSD(),
        _userManagementService.layDsCanBoQuyen(),
        _categoryvehicleListService.layDsHangMucXe(),
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.cnhanh = arrRes[1].data_info;
        objDanhMuc.ds_trang_thai = arrRes[2].data_info;
        arrTrangThai = arrRes[3].data_info;
        objDanhMuc.can_bo = arrRes[4].data_info;
        objDanhMuc.ds_nsd_quyen_blvp = arrRes[5].data_info.nsd_quyen_blvp;
        objDanhMuc.ds_nsd_quyen_tncn = arrRes[5].data_info.nsd_quyen_tncn;
        objDanhMuc.ds_nsd_quyen_ttbt = arrRes[5].data_info.nsd_quyen_ttbt;

        objDanhMuc.hang_muc_xe = arrRes[6].data_info;
        objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.loai === "TAI_LIEU");

        _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.cnhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
        _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
        _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
        ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });
        hienThiHoSoNofify();
    });
    _frmTimKiemHoSo.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.cnhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
    });
    _frmTaoNoiDung.getControl('nv').addEventChange(val => {
        var arr_nv = arrNghiepVu.where(n => n.nv == val);
        _frmTaoNoiDung.getControl("pm").setDataSource(arr_nv, "ten", "ma", "Chọn phần mềm", "");
    });
    _frmTaoNoiDung.getControl('pm').addEventChange(val => {
        var arr_nv_ct = arrNV_CT.where(n => n.pm == val);
        _frmTaoNoiDung.getControl("nv_ct").setDataSource(arr_nv_ct, "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
    });
    _frmDanhSachToTrinh.getControl("to_trinh").addEventChange(val => {
        if (val !== null && val !== "" && val !== undefined) {
            var ds_trinh = ho_so_chi_tiet.ds_trinh.where(n => n.bt == val).firstOrDefault();
            var objGetDetail = { ma_doi_tac_xl: ds_trinh.ma_doi_tac, ma_doi_tac: ds_trinh.ma_doi_tac, so_id: ds_trinh.so_id, nv: ds_trinh.nv, lhnv: ds_trinh.lh_nv, loai: ds_trinh.loai, ten: ds_trinh.ten_to_trinh, bt: ds_trinh.bt, lan: "", hanh_dong: ds_trinh.hanh_dong };
            loadThongTinHoSoPheDuyet(objGetDetail);
        } else {
            _notifyService.error("Bạn chưa chọn tờ trình !");
            return;
        }
    });
    getPaging(1);
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $('#FrmApprovedSearch_trang_thai, #FrmApprovedSearch_loai, #FrmApprovedSearch_nv, #FrmApprovedSearch_ma_chi_nhanh, #FrmApprovedSearch_ma_doi_tac').bind("change", function () {
        getPaging(1);
    });
    $("#btnDuyet").click(function () {
        _notifyService.confirmApprove("Bạn có chắc chắn muốn duyệt không?", type => {
            var nguoi_duyet = ho_so_chi_tiet.trinh_duyet.where(n => n.nguoi_duyet == ESCS_NSD).firstOrDefault();
            if (nguoi_duyet == null) {
                _notifyService.error("Bạn không có trong danh sách người được phê duyệt");
                return;
            }
            var loai_trinh = nguoi_duyet.loai;
            var bt = _frmDanhSachToTrinh.getControl("to_trinh").val();
            if (bt === "" || bt === null || bt === undefined) {
                _notifyService.error("Không tìm thấy thông tin trình duyệt !");
                return;
            }
            var json = {};
            json.ma_doi_tac_xl = ho_so_chi_tiet.to_trinh.ma_doi_tac_xl;
            json.ma_doi_tac = ho_so_chi_tiet.to_trinh.ma_doi_tac_xl;
            json.so_id = ho_so_chi_tiet.to_trinh.so_id;
            json.bt = bt;
            json.nv = ho_so_chi_tiet.to_trinh.nv;
            json.loai = loai_trinh;
            json.so_id_tu = ho_so_chi_tiet.trinh_duyet.firstOrDefault().lan;
            json.noi_dung_duyet = _frmPheDuyet.getControl("noi_dung_duyet").val();

            json.create_file_sign = layMaMauInKySo(loai_trinh, ho_so_chi_tiet.ho_so.nv, ho_so_chi_tiet.ho_so.loai, ho_so_chi_tiet.trinh_duyet_ct.hanh_dong);
            json.remove_file = layMaMauInKySo(loai_trinh, ho_so_chi_tiet.ho_so.nv, ho_so_chi_tiet.ho_so.loai, ho_so_chi_tiet.trinh_duyet_ct.hanh_dong);

            json.arr = [];
            if (json.loai == "XE_TRINH_DUYET_DUYET_GIA" || json.loai == "XE_TRINH_DUYET_GIAM_DINH") {
                json.arr = layDuLieuXE();
            }
            json.pm = CONSTANT_PM;

            json.gui_email = type == "PHE_DUYET_VA_GUI_EMAIL" ? "C" : "K";
            _approvedService.SuKienDongY(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadDsTrinhDuyet();
                getPaging(1);
                _notifyService.success("Duyệt thành công !");
            });
        });
    });
    $("#btnHuyDuyet").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy duyệt không?", "", val => {
            var json = {};
            var bt = _frmDanhSachToTrinh.getControl("to_trinh").val();
            if (bt === "" || bt === null || bt === undefined) {
                _notifyService.error("Không tìm thấy thông tin trình duyệt !");
                return;
            }
            json.ma_doi_tac_xl = ho_so_chi_tiet.to_trinh.ma_doi_tac_xl;
            json.ma_doi_tac = ho_so_chi_tiet.to_trinh.ma_doi_tac;
            json.so_id = ho_so_chi_tiet.to_trinh.so_id;
            json.bt = bt;
            json.nv = ho_so_chi_tiet.to_trinh.nv;
            json.loai = ho_so_chi_tiet.to_trinh.loai;
            json.so_id_tu = ho_so_chi_tiet.trinh_duyet.firstOrDefault().lan;
            json.pm = CONSTANT_PM;
            json.remove_file = layMaMauInKySo(json.loai, ho_so_chi_tiet.ho_so.nv, ho_so_chi_tiet.ho_so.loai, ho_so_chi_tiet.trinh_duyet_ct.hanh_dong);
            _approvedService.SuKienHuyDongY(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var ds_trinh = ho_so_chi_tiet.ds_trinh.where(n => n.bt == json.bt).firstOrDefault();
                var thu_tu_max = ho_so_chi_tiet.ds_trinh.where(n => n.thu_tu < ds_trinh.thu_tu).max(n => n.thu_tu);
                ds_trinh = ho_so_chi_tiet.ds_trinh.where(n => n.thu_tu == thu_tu_max).firstOrDefault();

                if (ds_trinh != null) {
                    var objGetDetail = { ma_doi_tac_xl: ds_trinh.ma_doi_tac, ma_doi_tac: ds_trinh.ma_doi_tac, so_id: ds_trinh.so_id, nv: ds_trinh.nv, lhnv: ds_trinh.lh_nv, loai: ds_trinh.loai, ten: ds_trinh.ten_to_trinh, bt: ds_trinh.bt, lan: "", hanh_dong: ds_trinh.hanh_dong };
                    loadThongTinHoSoPheDuyet(objGetDetail, arrRes => {
                        _frmDanhSachToTrinh.getControl("to_trinh").setValue(ds_trinh.bt);
                    });
                }
                else {
                    $("#CarCompensationModal").esmodal("hide");
                }
                //loadDsTrinhDuyet();
                getPaging(1);
                _notifyService.success("Hủy duyệt thành công");
            });
        });
    });
    $("#btnTuChoi").click(function () {
        _notifyService.confirmApprove("Bạn có chắc chắn muốn từ chối duyệt tờ trình này không?", type => {
            var nguoi_duyet = ho_so_chi_tiet.trinh_duyet.where(n => n.nguoi_duyet == ESCS_NSD).firstOrDefault();
            if (nguoi_duyet == null) {
                _notifyService.error("Bạn không có trong danh sách người được phê duyệt");
                return;
            }
            if (!_frmPheDuyet.isValid()) {
                return;
            }
            var loai_trinh = nguoi_duyet.loai;
            var bt = _frmDanhSachToTrinh.getControl("to_trinh").val();
            if (bt === "" || bt === null || bt === undefined) {
                _notifyService.error("Không tìm thấy thông tin trình duyệt !");
                return;
            }
            var json = {};
            json.ma_doi_tac_xl = ho_so_chi_tiet.to_trinh.ma_doi_tac_xl;
            json.so_id = ho_so_chi_tiet.to_trinh.so_id;
            json.bt = bt;
            json.nv = ho_so_chi_tiet.to_trinh.nv;
            json.loai = loai_trinh;
            json.so_id_tu = ho_so_chi_tiet.trinh_duyet.firstOrDefault().lan;
            json.noi_dung = _frmPheDuyet.getControl("noi_dung_duyet").val();
            json.pm = CONSTANT_PM;
            json.gui_email = type == "PHE_DUYET_VA_GUI_EMAIL";
            _approvedService.tuChoiDuyet(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var ds_trinh = ho_so_chi_tiet.ds_trinh.where(n => n.bt == json.bt).firstOrDefault();
                var thu_tu_max = ho_so_chi_tiet.ds_trinh.where(n => n.thu_tu < ds_trinh.thu_tu).max(n => n.thu_tu);
                ds_trinh = ho_so_chi_tiet.ds_trinh.where(n => n.thu_tu == thu_tu_max).firstOrDefault();
                if (ds_trinh != null) {
                    var objGetDetail = { ma_doi_tac_xl: ds_trinh.ma_doi_tac, ma_doi_tac: ds_trinh.ma_doi_tac, so_id: ds_trinh.so_id, nv: ds_trinh.nv, lhnv: ds_trinh.lh_nv, loai: ds_trinh.loai, ten: ds_trinh.ten_to_trinh, bt: ds_trinh.bt, lan: "", hanh_dong: ds_trinh.hanh_dong };
                    loadThongTinHoSoPheDuyet(objGetDetail, arrRes => {
                        _frmDanhSachToTrinh.getControl("to_trinh").setValue(ds_trinh.bt);
                    });
                }
                else {
                    $("#CarCompensationModal").esmodal("hide");
                }
                //loadDsTrinhDuyet();
                getPaging(1);
                _notifyService.success("Từ chối tờ trình thành công !");
            });
        });
    });
    $("#btnThemYKien").click(function () {
        bindThongTinFormNhanXet();
        _frmTaoNoiDung.getControl("nv_ct").setValue("PHE_DUYET_TU");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    $("#btnLuuNoiDung").click(function () {
        if (_frmTaoNoiDung.isValid()) {
            var formData = _frmTaoNoiDung.getJsonData();
            _carClaimCommonService.taoNhanXet(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalTaoNoiDung.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var val = $("#modalChonNoiDungDanhSach .modalChonNoiDungItem:checked").val();

        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var arr = arrNhanXet.where(n => n.so_id == val).firstOrDefault();
            $(target).attr("data-loai", arr.nv_ct);
            if (arr.nv_ct == "PHE_DUYET_TU") {
                _frmPheDuyet.getControl("noi_dung_duyet").val(arr.noi_dung);
            }
        }
        _modalChonNoiDung.hide();
    });
    $("#btnBoChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var loai = $(target).attr("data-loai");
        if (loai == "PHE_DUYET_TU") {
            _frmPheDuyet.getControl("noi_dung_duyet").val("");
            $(target).attr("data-val", "");
        }
        _modalChonNoiDung.hide();
    });
    $("#btnXemDanhSachNoiDung").click(function () {
        $("#modalTaoNoiDungFormLietKe").removeClass("d-none");
        $("#modalTaoNoiDungFormNhap").addClass("d-none");
        getPagingDanhSachNoiDung(1);
    });
    $("#btnManHinhThemMoi").click(function () {
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    });
    $("#btnXoaNoiDung").click(function () {
        var formData = _frmTaoNoiDung.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _carClaimCommonService.xoaThongTinNoiDung(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPagingDanhSachNoiDung(1);
                    $("#modalTaoNoiDungFormLietKe").removeClass("d-none");
                    $("#modalTaoNoiDungFormNhap").addClass("d-none");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#inputSearch_ChonNoiDung").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChonNoiDungDanhSach .dscnd").removeClass("d-none");
            return;
        }
        $("#modalChonNoiDungDanhSach .dscnd").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = arrNhanXet.where(n => n.noi_dung.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChonNoiDungDanhSach #dscnd_" + source[i].so_id).removeClass("d-none");
            }
        }
    }, 300));
    $("#input_imagesCategory").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMuc .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMuc .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMuc .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $("#btnDongPopperChanDoan").click(function () {
        _popoverChanDoan.hide();
    });
    $("form[name='frmTimKiemHoSo'] input[name='so_hs'],input[name='doi_tuong']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPaging(1);
        }
    });
    //Tìm kiếm chi nhánh
    $("#modalChonChiNhanhTimKiem").keyup(ESUtil.delay(function (e) {
        var tim = ESUtil.xoaKhoangTrangText($(this).val().toLowerCase());
        if (tim == "") {
            $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").removeClass("d-none");
            return;
        }
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").addClass("d-none");
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");
    }, 500));
    $("#ModalChonChiNhanh_btnChonDonVi").click(function () {
        var ma = $("#modalChonChiNhanhTimKiem_ma").val();
        var arr = ma.split("|");
        var data_val = "";
        var ten_dvi = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                data_val += arr[i];
            } else {
                data_val += ";" + arr[i];
            }
        }
        if (arr.length >= 1 && arr[0].trim() != null && arr[0].trim() != "") {
            ten_dvi = "Đã có " + arr.length + " đơn vị được chọn";
        }
        $(_modalChonChiNhanh.target).attr("data-val", data_val);
        $(_modalChonChiNhanh.target).val(ten_dvi);
        _modalChonChiNhanh.hide();
    });
});