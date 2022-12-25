var _common = new CommonService();
var _service = new ContactService();
var _carInvestigationService = new CarInvestigationService();
var _notifyService = new NotifyService();
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var objDanhMuc = {};
var objDanhMucDonViHanhChinh = {};
var ho_so_chi_tiet = {};
var loai_trinh = "";
var nv_trinh = "";
var contactTabShow = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'TNBT'; //Tiếp nhận bồi thường
const keyCache = {
    HANG_MUC_XE_CHINH: "HANG_MUC_XE_CHINH",
    HANG_MUC_TAI_LIEU: "HANG_MUC_TAI_LIEU",
}

var NAM_SAN_XUAT = [];
var DS_NGHIEP_VU = _common.danhMucChung.nghiep_vu.where(n => n.ap_dung == 1);
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}

const THOI_HAN_BANG_LAI = [
    { hang_gplx: "A4", nam_sd: 10, nv: "XE" },
    { hang_gplx: "B1", nam_sd: 10, nv: "XE" },
    { hang_gplx: "B2", nam_sd: 10, nv: "XE" },
    { hang_gplx: "C", nam_sd: 5, nv: "XE" },
    { hang_gplx: "D", nam_sd: 5, nv: "XE" },
    { hang_gplx: "E", nam_sd: 5, nv: "XE" },
    { hang_gplx: "F", nam_sd: 5, nv: "XE" },
    { hang_gplx: "FC", nam_sd: 5, nv: "XE" },

    { hang_gplx: "A1", nam_sd: 100, nv: "XE_MAY" },
    { hang_gplx: "A2", nam_sd: 100, nv: "XE_MAY" },
    { hang_gplx: "A3", nam_sd: 100, nv: "XE_MAY" },
    { hang_gplx: "A4", nam_sd: 10, nv: "XE_MAY" }

]
var tthai_vu_tt = "xem";

var hienTruong = [
    { ma: "D", ten: "Xe đang ở hiện trường" },
    { ma: "K", ten: "Xe không ở hiện trường" }
]

var ho_so = {};

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nguon_tb", title: "Nguồn", width: "5%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "7%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay", title: "Ngày", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "so_tn", title: "Số tiếp nhận", width: "16%", headerSort: false, hozAlign: "center" },
    { field: "trang_thai", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "doi_tuong", title: "Đối tượng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "gdvtt", title: "Bồi thường viên", width: "12%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "gdvht", title: "GĐV hiện trường", width: "12%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "gcn", title: "Giấy chứng nhận", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ten_kh", title: "Tên khách hàng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh cấp đơn", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "Mã cán bộ tiếp nhận", width: "10%", hozAlign: "center", headerSort: false },
];
var configColumnTkiemXe = [
    { field: "bien_xe", title: "Biển số xe", width: "120", headerSort: false },
    { field: "gcn", title: "Số giấy chứng nhận", width: "145", headerSort: false },
    { field: "nghiep_vu", title: "Nghiệp vụ", width: "150", headerSort: false },
    { field: "ngay_hl", title: "Hiệu lực bảo hiểm", width: "135", headerSort: false },
    { field: "ten", title: "Tên khách hàng", width: "213", headerSort: false }
];
//service
var _commonService = new CommonService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _businessCodeService = new BusinessCodeService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _bankListService = new BankListService();
var _garaListService = new GaraListService();
var _damageLevelService = new DamageLevelService();
var _categoryCommonService = new CategoryCommonService();
var _statusListService = new StatusListService();
var _carContractService = new CarContractService();
var _carClaimCommonService = new CarClaimCommonService();
var _carManufacturerListService = new CarManufacturerListService()
var _hieuXeService = new HieuXeService();
var _rangeVehicleService = new RangeVehicleService();
//grid
var _gridViewThanhToan = new GridViewService("gridViewThanhToan", configColumn, getPaging, rowClick);
var _frmTimKiemHoSo = new FormService("frmTimKiemHoSo");
var _frmCarClaimCarSearch = new FormService("frmCarClaimCarSearch");
var _frmCarClaimCustomerInfo = new FormService("frmCarClaimCustomerInfo");
var _frmThongTinNguoiLienHe = new FormService("frmThongTinNguoiLienHe");
var _frmDienBienTonThat = new FormService("frmDienBienTonThat");
var _frmThemLanGiamDinh = new FormService("frmThemLanGiamDinh");
var _frmThongTinGiamDinh = new FormService("frmThongTinGiamDinh");
var _frmDiaDiemGD = new FormService("frmDiaDiemGD");
var _frmTaoHDAo = new FormService("frmTaoHDAo");
var _frmSuaGCN = new FormService("frmSuaGCN");
var _frmTimKiemGDV = new FormService("frmTimKiemGDV");
var _frmChuyenNguoiXuLyGDVHT = new FormService("frmChuyenNguoiXuLyGDVHT");
var _frmChonGaraSuaChuaSearch = new FormService("frmChonGaraSuaChuaSearch");

//modal
var _modalCarSearch = new ModalService("modalCarSearch");
var _modalThemLanGiamDinh = new ModalService("modalThemLanGiamDinh");
var _modalSuaGCN = new ModalService("modalSuaGCN");
var _modalXemThongTinChungNhan = new ModalService("modalXemThongTinChungNhan");
var _modalMap = new ModalMapService("modalMap");
var _modalHangGPLX = new ModalDragService("modalHangGPLX", undefined, "top");
var _modalMap = new ModalMapService("modalMap", "");
var _modalChuyenNguoiXuLyGDVHT = new ModalService("modalChuyenNguoiXuLyGDVHT");
var _modalXemDiaBanGiamDinh = new ModalService("modalXemDiaBanGiamDinh");
var _modalXemThongTinGiayChungNhanLSTT = new ModalService("modalXemThongTinGiayChungNhanLSTT");
var _popoverChonGaraSuaChua = new PopoverService("popoverChonGaraSuaChua");
//category
var _userManagementService = new UserManagementService();
//tab
var _navTabTimKiemXe = new NavTabService("navTabTimKiemXe", ["tabTimKiemXe", "tabThongTinLienHe", "tabDienBienTonThat"], "quy-trinh");
var _navTiepNhan = new NavTabService("navTiepNhan", ["stepVuTonThat", "stepDiaDiemGiamDinh"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navThongTinLienHe", "navQuaTrinhGiaiQuyet", "navLichSuTonThat"], "nav-tabs-timeline");
var _navMain = new NavTabService("navMain", ["CarCompensationContentStep1Tab1", "CarCompensationContentStep1Tab2", "CarCompensationContentStep1Tab3", "CarCompensationContentStep1Tab4", "CarCompensationContentStep1Tab5"]);
var _navThongTinQuyenLoiDKBS = new NavTabService("navThongTinQuyenLoiDKBS", ["tabThongTinQuyenLoiBaoHiem", "tabDieuKhoanBoSung"], "nav-pills");
var _navThongTinGiayChungNhanLSTT = new NavTabService("navThongTinGiayChungNhanLSTT", ["tabThongTinGiayChungNhan", "tabLichSuBoiThuong"], "nav-pills");

var autocomplete;
var autocompleteGD;
var _frmDienBienTonThat_dia_diem;
var _frmThongTinGiamDinh_dia_diem;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    administrative_area_level_2: 'short_name',
    sublocality_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    _frmDienBienTonThat.getControl("gio_xr").setValue("");
    _frmDienBienTonThat.getControl("ngay_xr").setValue("");
    _frmDiaDiemGD.getControl("gio_gd").setValue("");
    _frmDiaDiemGD.getControl("ngay_gd").setValue("");
    _frmDienBienTonThat.clearErrorMessage();

    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id: data.so_id, nv: data.nv };
    _service.layCtHsTiepNhan(objGetDetail).then(res => {
        if (row !== undefined) {
            row.select();
        }
        ESStorage.setItemLocalStorage("detail", JSON.stringify(res.data_info));
        ho_so_chi_tiet = res;
        $("#titleUpdateContract").bindJsonToHtml(res.data_info.ho_so);
        //Tab thông tin chung
        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", res.data_info);
        //Tab thông tin liên hệ
        ESUtil.genHTML("navThongTinLienHe_template", "navThongTinLienHe", res.data_info);
        //Tab diễn biến tổn thất
        $("#btnHuyThaoTac").hide();
        $("#btnThemMoiVuTonThat").removeAttr("disabled");
        showDsVuTonThat(res.data_info.dien_bien);
        if (res.data_info.dien_bien.length <= 0) {
            tthai_vu_tt = "them_moi";
            $("#btnThemMoiVuTonThat").attr("disabled", "disabled");
            $("#btnHuyThaoTac").show();
            $("#btnXoaDienBienTonThat").hide();

            showDsVuTonThat([{ gio_xr: "", ngay_xr: "//", so_id: res.data_info.ho_so.so_id }]);
            _frmDienBienTonThat.resetForm();
            _frmDienBienTonThat.getControl("so_id").setValue(res.data_info.ho_so.so_id);
            _frmDienBienTonThat.getControl("gio_xr").setValue("");
            _frmDienBienTonThat.getControl("ngay_xr").setValue("");

            _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            setStyleVuTTSelect("");
            if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe === "QH.0002" && ho_so_chi_tiet.data_info.ho_so.moi_qh_tb === "QH.0002") {
                _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_lhe);
                _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_lhe);
                _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_lhe);
            }
            if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe === "QH.0002" && ho_so_chi_tiet.data_info.ho_so.moi_qh_tb !== "QH.0002") {
                _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_lhe);
                _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_lhe);
                _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_lhe);
            }
            if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe !== "QH.0002" && ho_so_chi_tiet.data_info.ho_so.moi_qh_tb === "QH.0002") {
                _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_tb);
                _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_tb);
                _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_tb);
            }
            if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe !== "QH.0002" && ho_so_chi_tiet.data_info.ho_so.moi_qh_tb !== "QH.0002") {
                _frmDienBienTonThat.getControl("ten_lxe").val("");
                _frmDienBienTonThat.getControl("dthoai_lxe").val("");
                _frmDienBienTonThat.getControl("email_lxe").val("");
            }
        } else {
            tthai_vu_tt = "xem";
            $("#btnThemMoiVuTonThat").removeAttr("disabled");
            $("#btnHuyThaoTac").hide();
            $("#btnXoaDienBienTonThat").show();

            var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === res.data_info.dien_bien[0].tinh_thanh);
            _frmDienBienTonThat.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmDienBienTonThat.getControl("quan_huyen").setValue("");
            _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === res.data_info.dien_bien[0].quan_huyen);
            _frmDienBienTonThat.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmDienBienTonThat.getControl("phuong_xa").setValue("");

            showDsVuTonThat(res.data_info.dien_bien);
            _frmDienBienTonThat.setData(res.data_info.dien_bien[0]);
            setStyleVuTTSelect(res.data_info.dien_bien[0].vu_tt);
        }
        //Tab thông tin giám định
        _frmThongTinGiamDinh.getControl("lan_gd").setDataSource(res.data_info.lan_gd, "ten", "ma", "Chọn lần giám định", "");
        if (res.data_info.lan_gd.length > 0) {
            //show lần giám định đầu tiên
            $('#lan_gd').val($('#lan_gd option:nth-child(2)').val()).trigger('change');
        } else {
            if (res.data_info != null) {
                ESUtil.genHTML("CarCompensationContentStep1Table3_template_none", "CarCompensationContentStep1Table3", res.data_info);
            }
        }
        //Tab đánh giá sơ bộ tổn thất
        var btTongTienTonThat = 0;
        if (res.data_info.danh_gia_gd.length > 0) {
            for (var i = 0; i < res.data_info.danh_gia_gd.length; i++) {
                btTongTienTonThat += res.data_info.danh_gia_gd[i].gia_giam_dinh;
            }
        }
        $("#btTongTienTonThat").html(ESUtil.formatMoney(btTongTienTonThat));
        var nv = res.data_info.ho_so.nv;
        //Step 1, tab 3: Đánh giá sơ bộ tổn thất
        $("#rowNghiepVuXe").addClass("d-none");
        if (nv == "XE") {
            $("#rowNghiepVuXe").removeClass("d-none");
        }
        ESUtil.genHTML("CarClaimContentStep4_tbl_dgtt_template", "CarClaimContentStep4_tbl_dgtt", res.data_info);
        ESUtil.genHTML("modalHangGPLXDanhSachTemplate", "modalHangGPLXDanhSach", { danh_sach: THOI_HAN_BANG_LAI.where(n => n.nv == nv)});
        //Step 1, tab 3: Đánh giá chung
        ESUtil.genHTML("Step1YKien_template", "Step1YKien", res.data_info);
        //Tab hồ sơ giấy tờ
        ESUtil.genHTML("HoSoGiayTo_template", "HoSoGiayTo", res.data_info);
        //Tab các lần giám định
        getLanGiamDinh();
        if (res.data_info.ho_so.trang_thai_ma == 'D') {
            anCacNut(true);
        } else {
            anCacNut(false);
            if (res.data_info.dien_bien.length <= 0) {
                $("#btnXoaDienBienTonThat").hide();
            } else {
                $("#btnXoaDienBienTonThat").show();
            }
        }
        $('#inside-modal .nav-tabs.profile-tab').tabdrop();
        $("#inside-modal").esmodal("show");
        showStep("stepVuTonThat");
    });
}
function getLanGiamDinh() {
    var objTimKiem = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    };
    _service.layDsLichSuTiepNhan(objTimKiem).then(res => {
        ESUtil.genHTML("ContactStep5Content_template", "ContactStep5Content", res);
    });
}
function hienThiQTXL(obj) {
    if (obj === undefined || obj === null ||
        obj.nd === undefined || obj.nd === null || obj.nd === "" ||
        obj.ngay === undefined || obj.ngay === null || obj.ngay === "" ||
        obj.ten === undefined || obj.ten === null || obj.ten === ""
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
    var div_timeline_content = $("<div class='timeline-content'></div>");
    var span_time = $("<span></span>");
    var span_name = $("<span class='tx-12'></span>");

    span_time.text(obj.ngay);
    span_name.text(obj.ten);
    div_timeline_content.text(obj.nd);

    div_timeline_label.append(span_time);
    div_timeline_label.append(span_name);
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
function rowClickTkiemXe(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.bien_xe === undefined) {
        return;
    }
    row.select();
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac_ql: arr[0],
        so_id: arr[1]
    };
    rowClick(data);
}
function getPaging(trang) {
    if (_frmTimKiemHoSo.isValid()) {
        var objTimKiem = _frmTimKiemHoSo.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewThanhToan.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function getHoSoTon() {
    var objTimKiem = {};
    objTimKiem.nv = _frmSearchHoSoTon.getControl('nv').getValue();
    _service.layDSTon(objTimKiem).then(res => {
        ESUtil.genHTML("PaymentTable1_template", "PaymentTable1", res);
        _modalThanhToanBoiThuong.show();
    });
}
function clearCacheLocalStoreage() {
    ESStorage.removeItemLocalStorage(keyCache.HANG_MUC_XE_CHINH);
    ESStorage.removeItemLocalStorage(keyCache.HANG_MUC_TAI_LIEU);
}
function bindCmbDataDonVi(objDanhMuc) {
    _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    _frmTimKiemHoSo.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        getPaging(1);
    });

    _frmCarClaimCarSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    _frmCarClaimCarSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
        _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setValue("");
    });

    _frmDiaDiemGD.getControl("dvi_gdinh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    _frmDiaDiemGD.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");

    _frmDiaDiemGD.getControl("dvi_gdinh").addEventChange(val => {
        var arrCanBo = [];
        if (ho_so_chi_tiet.data_info.ho_so.nv_xly != "NGUOI") {
            arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh == val);
        }
        else {
            arrCanBo = objDanhMuc.btv.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh == val);
        }
        _frmDiaDiemGD.getControl("ma_gdv").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmDiaDiemGD.getControl("ma_gdv").setValue("");
    });
}
function bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh) {
    var dviHanhChinh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
    _frmDienBienTonThat.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmDiaDiemGD.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmDiaDiemGD.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmDiaDiemGD.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmTimKiemGDV.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmTimKiemGDV.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");

    _frmChonGaraSuaChuaSearch.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmChonGaraSuaChuaSearch.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmChonGaraSuaChuaSearch.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmChonGaraSuaChuaSearch.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmChonGaraSuaChuaSearch.getControl("quan_huyen").setValue("");
        getPagingGaraSuaChua(1);
    });
    _frmChonGaraSuaChuaSearch.getControl("quan_huyen").addEventChange(val => {
        getPagingGaraSuaChua(1);
    });


    _frmDienBienTonThat.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmDienBienTonThat.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmDienBienTonThat.getControl("quan_huyen").setValue("");
        _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmDienBienTonThat.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmDienBienTonThat.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmDienBienTonThat.getControl("phuong_xa").setValue("");
    });
    _frmDiaDiemGD.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmDiaDiemGD.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmDiaDiemGD.getControl("quan_huyen").setValue("");
        _frmDiaDiemGD.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmDiaDiemGD.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmDiaDiemGD.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmDiaDiemGD.getControl("phuong_xa").setValue("");
    });
    _frmTimKiemGDV.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmTimKiemGDV.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTimKiemGDV.getControl("quan_huyen").setValue("");
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
    _frmTimKiemGDV.getControl("quan_huyen").addEventChange(val => {
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
}
function bindCmbDataNhomNguyenNhan(objDanhMuc) {
    var arrNhomNguyenNhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN" && n.ma_doi_tac == ESCS_MA_DOI_TAC).sortBy("stt");
    _frmDienBienTonThat.getControl("nhom_nguyen_nhan").setDataSource(arrNhomNguyenNhan, "ten", "ma", "Chọn nhóm nguyên nhân", "");
}
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 15,
        center: {
            lat: -34.397,
            lng: 150.644
        }
    });
    const geocoder = new google.maps.Geocoder();
}
function geocodeAddress(geocoder, resultsMap) {
    const address = "126 Đội Cấn, Ba Đình, Hà Nội, Việt Nam";
    geocoder.geocode({
        address: address
    },
        (results, status) => {
            if (status === "OK") {
                resultsMap.setCenter(results[0].geometry.location);
                new google.maps.Marker({
                    map: resultsMap,
                    position: results[0].geometry.location
                });
            } else {
                //alert("Geocode was not successful for the following reason: " + status);
            }
        }
    );
}
function timKiemXe() {
    var objSearch = _frmCarClaimCarSearch.getJsonData();
    if (objSearch.ngay_xr == "") {
        _notifyService.error("Bạn chưa nhập ngày xảy ra tổn thất");
        return;
    }
    if (objSearch.nv == "") {
        _notifyService.error("Không xác định được nghiệp bảo hiểm");
        return;
    }
    if (ESCS_MA_DOI_TAC == "PJICO") {
        if (objSearch.so_gcn.trim() == "" && objSearch.bien_so_xe.trim() == "" &&
            objSearch.so_khung.trim() == "" && objSearch.so_may.trim() == "") {
            _notifyService.error("Phải có ít nhất 1 tiêu chí tìm kiếm (Số GCN, biển số xe, số khung, số máy)");
            return;
        }
    }
    else {
        if (objSearch.ten_kh.trim() == "" && objSearch.cmt_kh.trim() == "" && objSearch.mst_kh.trim() == "" &&
            objSearch.so_hdong.trim() == "" && objSearch.so_gcn.trim() == "" && objSearch.bien_so_xe.trim() == "" &&
            objSearch.so_khung.trim() == "" && objSearch.so_may.trim() == "") {
            _notifyService.error("Phải có ít nhất 1 tiêu chí tìm kiếm");
            return;
        }
    }
    _service.timKiemXe(objSearch).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error("THÔNG BÁO TỪ CORE BẢO HIỂM: " + res.state_info.message_body);
            return;
        }
        if (res.data_info.hd === null || res.data_info.hd.length <= 0) {
            _notifyService.error("Không tìm thấy xe theo tiêu chí tìm kiếm");
            return;
        }
        var data = res.data_info.hd;
        //Dữ liệu MIC
        for (var i = 0; i < data.length; i++) {
            if (data[i].loai_gcn == "T") {
                data[i].loai_gcn = "TN";
            }
            if (data[i].loai_gcn == "B") {
                data[i].loai_gcn = "BB";
            }
            if (data[i].loai_gcn == "C") {
                data[i].loai_gcn = "CH";
            }
        }
        ESUtil.genHTML("modalCarSearchDsGCNTemplate", "modalCarSearchDsGCN", { data_info: data });
    });
}
function onChonKhachHang(so_id, so_id_dt, loai) {
    $("#modalCarSearchDsGCN .tkiem_kh").removeClass("active");
    $("#modalCarSearchDsGCN #tkiem_kh_" + so_id + "_" + so_id_dt + "_" + loai).addClass("active");
}
function selectCar(obj = undefined) {
    _frmCarClaimCustomerInfo.clearErrorMessage();
}
function setNguoiLienHeTheoNguoiThongBao() {
    _frmCarClaimCustomerInfo.getControl("nguoi_lhe").readOnly(false);
    _frmCarClaimCustomerInfo.getControl("moi_qh_lhe").readOnly(false);
    _frmCarClaimCustomerInfo.getControl("dthoai_lhe").readOnly(false);
    _frmCarClaimCustomerInfo.getControl("email_lhe").readOnly(false);
    if (_frmCarClaimCustomerInfo.getControlById("chkThamGiaLienHe").is(":checked")) {
        var customer = _frmCarClaimCustomerInfo.getJsonData();
        customer.nguoi_lhe = customer.nguoi_tb;
        customer.moi_qh_lhe = customer.moi_qh_tb;
        customer.dthoai_lhe = customer.dthoai_tb;
        customer.email_lhe = customer.email_tb;
        _frmCarClaimCustomerInfo.setData(customer);
        _frmCarClaimCustomerInfo.getControl("nguoi_lhe").readOnly();
        _frmCarClaimCustomerInfo.getControl("moi_qh_lhe").readOnly();
        _frmCarClaimCustomerInfo.getControl("dthoai_lhe").readOnly();
        _frmCarClaimCustomerInfo.getControl("email_lhe").readOnly();
    }
    else {
        _frmCarClaimCustomerInfo.getControl("nguoi_lhe").val("");
        _frmCarClaimCustomerInfo.getControl("moi_qh_lhe").setValue("");
        _frmCarClaimCustomerInfo.getControl("dthoai_lhe").val("");
        _frmCarClaimCustomerInfo.getControl("email_lhe").val("");
    }
}
function bindDataToFormThongTinLienHe() {
    _frmThongTinNguoiLienHe.getControl("nguoi_lhe").readOnly(false);
    _frmThongTinNguoiLienHe.getControl("moi_qh_lhe").readOnly(false);
    _frmThongTinNguoiLienHe.getControl("dthoai_lhe").readOnly(false);
    _frmThongTinNguoiLienHe.getControl("email_lhe").readOnly(false);
    if (_frmThongTinNguoiLienHe.getControlById("chkThamGiaLienHeUpdate").is(":checked")) {
        var customer = _frmThongTinNguoiLienHe.getJsonData();
        customer.nguoi_lhe = customer.nguoi_tb;
        customer.moi_qh_lhe = customer.moi_qh_tb;
        customer.dthoai_lhe = customer.dthoai_tb;
        customer.email_lhe = customer.email_tb;
        _frmThongTinNguoiLienHe.setData(customer);
        _frmThongTinNguoiLienHe.getControl("nguoi_lhe").readOnly();
        _frmThongTinNguoiLienHe.getControl("moi_qh_lhe").readOnly();
        _frmThongTinNguoiLienHe.getControl("dthoai_lhe").readOnly();
        _frmThongTinNguoiLienHe.getControl("email_lhe").readOnly();
    }
}
function showTabThongTinChung(tab) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        nv: ho_so_chi_tiet.data_info.ho_so.nv
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
        td_gio_xr.html(arr[i].gio_xr);
        var td_ngay_xr = $("<td></td>");
        td_ngay_xr.html(arr[i].ngay_xr);
        tr.append(td_gio_xr);
        tr.append(td_ngay_xr);
        $("#tblDanhSachVuTonThat tbody").append(tr);
    }
}
function setStyleVuTTSelect(vu_tt) {
    $("#tblDanhSachVuTonThat tbody tr").css("font-weight", "unset");
    $("#tblDanhSachVuTonThat tbody tr").css("color", "black");
    $("#tblDanhSachVuTonThat tbody tr#ds_vu_ton_that_" + vu_tt).css("font-weight", "bold");
    $("#tblDanhSachVuTonThat tbody tr#ds_vu_ton_that_" + vu_tt).css("color", "red");
}
function xemChiTietVuTonThat(vu_tt) {
    if (tthai_vu_tt === "them_moi") {
        _notifyService.warning("Bạn đang thêm mới dữ liệu");
        return;
    }
    setStyleVuTTSelect(vu_tt);
    var data = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt === vu_tt).firstOrDefault();
    if (data !== undefined && data !== null) {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === data.tinh_thanh);
        _frmDienBienTonThat.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmDienBienTonThat.getControl("quan_huyen").setValue("");
        _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === data.quan_huyen);
        _frmDienBienTonThat.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmDienBienTonThat.getControl("phuong_xa").setValue("");
        if (data.gplx_hang === null)
            data.gplx_hang = "";
        _frmDienBienTonThat.setData(data);
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("href", "javascript:void(0)");
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("onclick", "ESUtil.voiceCall('" + _frmDienBienTonThat.getControl("dthoai_lxe").val() + "')");
    }
}
function anCacNut(status = false) {
    $("#btnChuyenGDVHT").hide();
    if (status) {
        $("#btnLuuDienBienTonThat").hide();
        $("#btnLuuVaTiepTheo").hide();
        $("#btnThemMoiVuTonThat").hide();
        $("#btnXoaDienBienTonThat").hide();
        $("#btnChuyenBoiThuong").hide();
        $("#btnHuyHoSoTiepNhan").hide();
        $("#btnGoHuyHoSoTiepNhan").hide();
        $("#btnLuuVaChuyenGD").hide();

        $("#btnChuyenTabGD").hide();
        $("#btnLuuThongTinDiaDiemGD").hide();
        $("#btnChuyenGDVHT").show();
    } else {
        $("#btnLuuDienBienTonThat").show();
        $("#btnLuuVaTiepTheo").show();
        $("#btnThemMoiVuTonThat").show();
        $("#btnXoaDienBienTonThat").show();
        $("#btnChuyenBoiThuong").show();
        $("#btnLuuVaChuyenGD").show();
        $("#btnChuyenTabGD").show();
        $("#btnLuuThongTinDiaDiemGD").show();
        if (ho_so_chi_tiet.data_info.ho_so.trang_thai_ma == 'H') {
            $("#btnHuyHoSoTiepNhan").hide();
            $("#btnGoHuyHoSoTiepNhan").show();
        } else if (ho_so_chi_tiet.data_info.ho_so.trang_thai_ma == 'C') {
            $("#btnHuyHoSoTiepNhan").show();
            $("#btnGoHuyHoSoTiepNhan").hide();
        }
    }
}
function changeTabTKiemXe(tab) {
    _navTabTimKiemXe.showTab(tab);
}
function bindCmbDataMoiQuanHe(objDanhMuc) {
    var arr = objDanhMuc.dmuc_chung.where(n => n.nhom === "MOI_QUAN_HE" && n.ma_doi_tac == ESCS_MA_DOI_TAC).sortBy("stt");
    var arrMoiQuanHe = arr.filter(item => {
        return item.ma !== "QH.0003" && item.ma !== "QH.0004";
    });
    _frmDiaDiemGD.getControl("moi_qh_lhe").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
}
function initAutocomplete() {
    var key = $("#escs_dv_google").val();
    if (key == undefined || key == null || key == "") {
        return;
    }
    _frmDienBienTonThat_dia_diem = document.querySelector("#frmDienBienTonThat_dia_diem");
    autocomplete = new google.maps.places.Autocomplete(_frmDienBienTonThat_dia_diem, {
        componentRestrictions: { country: ["vn"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    _frmDienBienTonThat_dia_diem.focus();
    autocomplete.addListener("place_changed", fillInAddress);


    _frmThongTinGiamDinh_dia_diem = document.querySelector("#frmThongTinGiamDinh_dia_diem");
    autocompleteGD = new google.maps.places.Autocomplete(_frmThongTinGiamDinh_dia_diem, {
        componentRestrictions: { country: ["vn"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    _frmThongTinGiamDinh_dia_diem.focus();
    autocompleteGD.addListener("place_changed", fillInAddressGD);

}
function fillInAddress() {
    var place = autocomplete.getPlace();
    var address = "";
    var ten_tinh = "";
    var ten_quan = "";
    var ten_phuong = "";

    var ma_tinh = "";
    var ma_quan = "";
    for (var i = 0; i < place.address_components.length; i++) {
        var val = place.address_components[i].short_name;
        var is_tinh = place.address_components[i].types.where(n => n == "administrative_area_level_1").length > 0;
        var is_huyen = place.address_components[i].types.where(n => n == "administrative_area_level_2" || n == "locality").length > 0;
        var is_phuong = place.address_components[i].types.where(n => n == "sublocality_level_1").length > 0;
        if (is_tinh) {
            ten_tinh = place.address_components[i].short_name.replace("tp. ", "");
        }
        if (is_huyen) {
            ten_quan = place.address_components[i].short_name.toLowerCase().replace("tx. ", "").replace("tp. ", "");
        }
        if (is_phuong) {
            ten_phuong = place.address_components[i].short_name.toLowerCase().replace("tt. ", "").replace("tp. ", "");
        }
    }
    if (ten_tinh != "") {
        var reg = new RegExp(ten_tinh.toLowerCase(), 'gi');
        var tinh = objDanhMuc.tinh_thanh.where(n => n.ten_tinh.toLowerCase().match(reg) != null).firstOrDefault();
        if (tinh != null) {
            ma_tinh = tinh.ma_tinh;
            _frmDienBienTonThat.getControl("tinh_thanh").val(tinh.ma_tinh).trigger('change').trigger('select2:select');
            if (ten_quan != "") {
                var reg_ten_quan = new RegExp(ten_quan.toLowerCase(), 'gi');
                var quan = objDanhMuc.quan_huyen.where(n => n.ma_tinh == ma_tinh && n.ten_quan.toLowerCase().match(reg_ten_quan) != null).firstOrDefault();
                if (quan != null) {
                    ma_quan = quan.ma_quan;
                    _frmDienBienTonThat.getControl("quan_huyen").val(quan.ma_quan).trigger('change').trigger('select2:select');
                    if (ten_phuong != "") {
                        var reg_ten_phuong = new RegExp(ten_phuong.toLowerCase(), 'gi');
                        var phuong = objDanhMuc.xa_phuong.where(n => n.ma_tinh == ma_tinh && n.ma_quan == ma_quan && n.ten_phuong.toLowerCase().match(reg_ten_phuong) != null).firstOrDefault();
                        if (phuong != null) {
                            _frmDienBienTonThat.getControl("phuong_xa").val(phuong.ma_phuong).trigger('change').trigger('select2:select');
                        }
                    }
                }
            }
        }
    }
    var chon = _frmDienBienTonThat_dia_diem.value;
    _frmDienBienTonThat_dia_diem.value = chon.split(",")[0];
}
function fillInAddressGD() {
    var place = autocompleteGD.getPlace();
    var address = "";
    var ten_tinh = "";
    var ten_quan = "";
    var ten_phuong = "";

    var ma_tinh = "";
    var ma_quan = "";
    for (var i = 0; i < place.address_components.length; i++) {
        var val = place.address_components[i].short_name;
        var is_tinh = place.address_components[i].types.where(n => n == "administrative_area_level_1").length > 0;
        var is_huyen = place.address_components[i].types.where(n => n == "administrative_area_level_2" || n == "locality").length > 0;
        var is_phuong = place.address_components[i].types.where(n => n == "sublocality_level_1").length > 0;
        if (is_tinh) {
            ten_tinh = place.address_components[i].short_name.replace("tp. ", "");
        }
        if (is_huyen) {
            ten_quan = place.address_components[i].short_name.toLowerCase().replace("tx. ", "").replace("tp. ", "");
        }
        if (is_phuong) {
            ten_phuong = place.address_components[i].short_name.toLowerCase().replace("tt. ", "").replace("tp. ", "");
        }
    }
    if (ten_tinh != "") {
        var reg = new RegExp(ten_tinh.toLowerCase(), 'gi');
        var tinh = objDanhMuc.tinh_thanh.where(n => n.ten_tinh.toLowerCase().match(reg) != null).firstOrDefault();
        if (tinh != null) {
            ma_tinh = tinh.ma_tinh;
            _frmDiaDiemGD.getControl("tinh_thanh").val(tinh.ma_tinh).trigger('change').trigger('select2:select');
            if (ten_quan != "") {
                var reg_ten_quan = new RegExp(ten_quan.toLowerCase(), 'gi');
                var quan = objDanhMuc.quan_huyen.where(n => n.ma_tinh == ma_tinh && n.ten_quan.toLowerCase().match(reg_ten_quan) != null).firstOrDefault();
                if (quan != null) {
                    ma_quan = quan.ma_quan;
                    _frmDiaDiemGD.getControl("quan_huyen").val(quan.ma_quan).trigger('change').trigger('select2:select');
                    if (ten_phuong != "") {
                        var reg_ten_phuong = new RegExp(ten_phuong.toLowerCase(), 'gi');
                        var phuong = objDanhMuc.xa_phuong.where(n => n.ma_tinh == ma_tinh && n.ma_quan == ma_quan && n.ten_phuong.toLowerCase().match(reg_ten_phuong) != null).firstOrDefault();
                        if (phuong != null) {
                            _frmDiaDiemGD.getControl("phuong_xa").val(phuong.ma_phuong).trigger('change').trigger('select2:select');
                        }
                    }
                }
            }
        }
    }
    var chon = _frmThongTinGiamDinh_dia_diem.value;
    _frmThongTinGiamDinh_dia_diem.value = chon.split(",")[0];
}
function getDiaChi(ma_tinh, ma_quan, ma_phuong, dia_chi_ctiet) {
    if (ma_tinh == "" || ma_quan == "" || ma_phuong == "" || dia_chi_ctiet == "") {
        var _notifyService = new NotifyService();
        _notifyService.error("Thông tin địa chỉ chưa đầy đủ");
        return "";
    }
    var tinh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh == ma_tinh && n.ma_quan.trim() == "").firstOrDefault();
    var quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh == ma_tinh && n.ma_quan.trim() == ma_quan && n.ma_phuong.trim() == "").firstOrDefault();
    var xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh == ma_tinh && n.ma_quan.trim() == ma_quan && n.ma_phuong.trim() == ma_phuong).firstOrDefault();
    return dia_chi_ctiet + ", " + xa_phuong.ten_phuong + ", " + quan_huyen.ten_quan + ", " + tinh.ten_tinh;
}
function chonKhachHangVip(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nhom_kh_vip: '',
        pm: 'CCTC'
    }
    if (ho_so_chi_tiet.data_info.ho_so.nhom_kh_vip == 'C') {
        obj.nhom_kh_vip = 'K';
    } else if (ho_so_chi_tiet.data_info.ho_so.nhom_kh_vip == 'K' || ho_so_chi_tiet.data_info.ho_so.nhom_kh_vip == null) {
        obj.nhom_kh_vip = 'C';
    }
    if ($(el).find('i.rating-star').hasClass('active-star')) {
        _notifyService.confirm("Bạn có chắc chuyển khách hàng VIP sang khách hàng phổ thông hay không?", "", () => {
            obj.nhom_kh_vip = 'K';
            _service.khachHangVIP(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Chuyển khách hàng VIP sang khách hàng phổ thông thành công.");
                    $(el).find('i.active-star').removeClass('active-star');
                    $(el).find('i').addClass('defaultColor');
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    } else {
        _notifyService.confirm("Bạn có chắc chuyển khách hàng này thành khách hàng VIP hay không?", "", () => {
            obj.nhom_kh_vip = 'C';
            _service.khachHangVIP(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Chuyển khách hàng phổ thông sang khách hàng VIP thành công.");
                    $(el).find('i.defaultColor').removeClass('defaultColor');
                    $(el).find('i').addClass('active-star');
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    }
}
function binDataGPLX() {
    _frmDienBienTonThat.getControl("gplx_hang").setDataSource(THOI_HAN_BANG_LAI, "hang_gplx", "hang_gplx", "Chọn hạng GPLX", "");
}
function setNgayHetHanGPLX() {
    var gplx_hang = _frmDienBienTonThat.getControl("gplx_hang").val();
    var gplx_hieu_luc = _frmDienBienTonThat.getControl("gplx_hieu_luc").val();
    if (gplx_hang !== "" && gplx_hieu_luc !== "") {
        var tgHan = THOI_HAN_BANG_LAI.where(n => n.hang_gplx === gplx_hang).firstOrDefault();
        if (tgHan !== null) {
            var arr_tg = gplx_hieu_luc.split("/");
            var tg_moi = arr_tg[0] + "/" + arr_tg[1] + "/" + (parseInt(arr_tg[2]) + tgHan.nam_sd);
            _frmDienBienTonThat.getControl("gplx_het_han").val(tg_moi);
        }
    }
}
function kiemTraChuyenStep(step) {
    var check = true;
    if (step === "stepThongTinGiamDinh") {
        if (ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined).length <= 0) {
            _notifyService.error("Bạn chưa lưu diễn biến tổn thất");
            return false;
        }

        var count = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined && n.pham_vi == "1").length;
        if (count <= 0) {
            var pham_vi = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined && n.pham_vi == "0").firstOrDefault();
            _notifyService.error(pham_vi.ly_do);
            return false;
        }
    }
    return check;
}
function setDataStep2(so_id, lan_gd = "") {
    _frmDiaDiemGD.resetForm();
    _frmDiaDiemGD.getControl("so_id").val(so_id);
    _frmDiaDiemGD.getControl("lan_gd").val(lan_gd);
    _frmDiaDiemGD.getControl("so_id").val(so_id);
    _frmDiaDiemGD.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmDiaDiemGD.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmDiaDiemGD.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");

    if (lan_gd !== "" && ho_so_chi_tiet.data_info.lan_gd.length > 0) {
        ho_so_chi_tiet.data_info.lan_gd = ho_so_chi_tiet.data_info.lan_gd.removeItem(n => n.lan_gd === undefined);
        var objLanGd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd.toString() === lan_gd.toString()).firstOrDefault();
        if (objLanGd !== undefined && objLanGd !== null) {
            var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === objLanGd.tinh_thanh);
            _frmDiaDiemGD.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmDiaDiemGD.getControl("quan_huyen").setValue("");
            _frmDiaDiemGD.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === objLanGd.quan_huyen);
            _frmDiaDiemGD.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmDiaDiemGD.getControl("phuong_xa").setValue("");

            _frmDiaDiemGD.getControl("dvi_gdinh").setValue(objLanGd.dvi_gdinh);
            _frmDiaDiemGD.getControl("dvi_gdinh").trigger("select2:select");
        }
    }
}
function showStep(stepId) {
    if (stepId == "stepDiaDiemGiamDinh") {
        $(".frmDiaDiemGDGiamDinh").removeClass("d-none");
        $("#thongTinDviGDBT").html("Thông tin đơn vị giám định/cán bộ giám định");
        $("#dviGDBT").html("Đơn vị giám định");
        $("#canBoGDBT").html("Cán bộ giám định hiện trường");

        if (ho_so_chi_tiet.data_info.dien_bien == undefined || ho_so_chi_tiet.data_info.dien_bien == null || ho_so_chi_tiet.data_info.dien_bien.length <= 0) {
            _notifyService.error("Bạn chưa lưu thông tin vụ tổn thất");
            return;
        }
        var hoSo = ho_so_chi_tiet.data_info.ho_so;
        _frmDiaDiemGD.resetForm();
        _frmDiaDiemGD.clearErrorMessage();
        if (hoSo.ngay_gd == "0") {
            hoSo.ngay_gd = "";
        }
        _frmDiaDiemGD.setData(hoSo);
        _frmDiaDiemGD.getControl("tinh_thanh").trigger("select2:select");
        _frmDiaDiemGD.getControl("quan_huyen").setValue(hoSo.quan_huyen);
        _frmDiaDiemGD.getControl("quan_huyen").trigger("select2:select");
        _frmDiaDiemGD.getControl("phuong_xa").setValue(hoSo.phuong_xa);
        _frmDiaDiemGD.getControl("hien_truong").setValue(ho_so_chi_tiet.data_info.ho_so.hien_truong)
        _frmDiaDiemGD.getControl("hien_truong").trigger('select2:select');
        _frmDiaDiemGD.getControl("dvi_gdinh").trigger('select2:select');
        _frmDiaDiemGD.getControl("ma_gdv").setValue(hoSo.ma_gdv);
        _frmDiaDiemGD.getControl("link_chup_anh_ct").setValue(hoSo.link_chup_anh_ct);
        if (hoSo.gara != "" && hoSo.gara != null) {
            _frmDiaDiemGD.getControl("ten_gara").attr("data-ma", hoSo.gara);
        } else {
            _frmDiaDiemGD.getControl("ten_gara").attr("data-ma", "");
        }
        if (ho_so_chi_tiet.data_info.ho_so.hien_truong == 'D') {
            _frmDiaDiemGD.getControl('link_chup_anh_ht').setValue(ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht);
            $("#frmDiaDiemGD_gara").addClass("d-none");
            $("#frmDiaDiemGD_diadiem").removeClass("col-4").addClass("col-8");
        }
        if (ho_so_chi_tiet.data_info.ho_so.hien_truong == 'K') {
            _frmDiaDiemGD.getControl('link_chup_anh_ht').setValue("");
            $("#frmDiaDiemGD_gara").removeClass("d-none");
            $("#frmDiaDiemGD_diadiem").removeClass("col-8").addClass("col-4");
        }
        if (ho_so_chi_tiet.data_info.ho_so.nv_xly == "NGUOI") {
            $(".frmDiaDiemGDGiamDinh").addClass("d-none");
            $("#thongTinDviGDBT").html("Thông tin đơn vị xử lý bồi thường");
            $("#dviGDBT").html("Đơn vị bồi thường");
            $("#canBoGDBT").html("Cán bộ bồi thường");

            if (ho_so_chi_tiet.data_info.ho_so.hien_truong == undefined || ho_so_chi_tiet.data_info.ho_so.hien_truong == null
                || ho_so_chi_tiet.data_info.ho_so.hien_truong == "") {
                _frmDiaDiemGD.getControl('hien_truong').setValue("K");
                $("#frmDiaDiemGD_gara").removeClass("d-none");
                $("#frmDiaDiemGD_diadiem").removeClass("col-8").addClass("col-4");
            }
            var dien_bien = ho_so_chi_tiet.data_info.dien_bien[ho_so_chi_tiet.data_info.dien_bien.length - 1];
            if (ho_so_chi_tiet.data_info.ho_so.dia_diem == undefined || ho_so_chi_tiet.data_info.ho_so.dia_diem == null
                || ho_so_chi_tiet.data_info.ho_so.dia_diem == "") {
                _frmDiaDiemGD.getControl("dia_diem").val(dien_bien.dia_diem);
            }
            if (ho_so_chi_tiet.data_info.ho_so.tinh_thanh == undefined || ho_so_chi_tiet.data_info.ho_so.tinh_thanh == null
                || ho_so_chi_tiet.data_info.ho_so.tinh_thanh == "") {
                _frmDiaDiemGD.getControl("tinh_thanh").setValue(dien_bien.tinh_thanh);
                _frmDiaDiemGD.getControl("tinh_thanh").trigger("select2:select");
                _frmDiaDiemGD.getControl("quan_huyen").setValue(dien_bien.quan_huyen);
                _frmDiaDiemGD.getControl("quan_huyen").trigger("select2:select");
                _frmDiaDiemGD.getControl("phuong_xa").setValue(dien_bien.phuong_xa);
            }
        }
    }
    $("#navTiepNhan li").removeClass("active");
    $("#stepVuTonThat").addClass("d-none");
    $("#stepDiaDiemGiamDinh").addClass("d-none");
    $("#navTiepNhan li#navTiepNhan_" + stepId).addClass("active");
    $("#" + stepId).removeClass("d-none");
}
function hienTruongXe(hienTruong) {
    $("#frmDiaDiemGD_gara").removeClass("d-none");
    $("#frmDiaDiemGD_diadiem").removeClass("col-8").addClass("col-4");
    _frmDiaDiemGD.getControl("dia_diem").readOnly(false);
    _frmDiaDiemGD.getControl("tinh_thanh").readOnly(false);
    _frmDiaDiemGD.getControl("quan_huyen").readOnly(false);
    _frmDiaDiemGD.getControl("phuong_xa").readOnly(false);
    _frmDiaDiemGD.getControl("link_chup_anh_ht").readOnly(false);
    if (hienTruong) {
        $("#frmDiaDiemGD_gara").addClass("d-none");
        $("#frmDiaDiemGD_diadiem").removeClass("col-4").addClass("col-8");
        _frmDiaDiemGD.getControl("dia_diem").readOnly();
        _frmDiaDiemGD.getControl("tinh_thanh").readOnly();
        _frmDiaDiemGD.getControl("quan_huyen").readOnly();
        _frmDiaDiemGD.getControl("phuong_xa").readOnly();
        _frmDiaDiemGD.getControl("link_chup_anh_ht").readOnly();
    }
}
function laySTT(ngay_xr, gio_xr) {
    if (ngay_xr == "" || ngay_xr == "//" || gio_xr == "") {
        return 0;
    }
    return parseFloat(ngay_xr + gio_xr.replace(":", ""));
}
function navTimKiemXe(val) {
    $(".divTIMKIEM").addClass("d-none");
    $(".divTAOHD").addClass("d-none");
    $(".div" + val).removeClass("d-none");
    $("#navLuongXuLy .breadcrumb-item").removeClass("active");
    $("#navLuongXuLy .breadcrumb-item[data-val='" + val + "']").addClass("active");
    var nv_mac_dinh = _common.danhMucChung.nghiep_vu.where(n => n.mac_dinh == 1).firstOrDefault().ma;
    _frmTaoHDAo.getControl("nv").setValue(nv_mac_dinh);
    _frmTaoHDAo.getControl("loai").setValue("TN");
    _frmTaoHDAo.getControl("loai").trigger("select2:select");
    if (val == "TAOHD") {
        _frmCarClaimCustomerInfo.getControl("so_id_hd").setValue("");
        _frmCarClaimCustomerInfo.getControl("so_id_dt").setValue("");
    }
}
function hthiTongTien(arr) {
    var tt_xe_tong_tien_bh = 0;
    var tt_xe_tong_tien_mien_thuong = 0;
    var tt_xe_tong_phi = 0;
    for (var i = 0; i < arr.length; i++) {
        tt_xe_tong_tien_bh += arr[i].tien;
        tt_xe_tong_tien_mien_thuong += arr[i].mien_thuong;
        tt_xe_tong_phi += arr[i].phi;
    }
    $("#tt_xe_tong_tien_bh").html(ESUtil.formatMoney(tt_xe_tong_tien_bh));
    $("#tt_xe_tong_tien_mien_thuong").html(ESUtil.formatMoney(tt_xe_tong_tien_mien_thuong));
    $("#tt_xe_tong_phi").html(ESUtil.formatMoney(tt_xe_tong_phi));
}
function xemThongTinGiayChungNhan(ma_chi_nhanh, so_id_hdong, so_id_gcn, nv) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        ma_chi_nhanh_ql: ma_chi_nhanh,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id_hd: so_id_hdong,
        so_id_dt: so_id_gcn,
        so_id_gcn: so_id_gcn,
        pm: "GD",
        nv: nv
    };
    _service.base.all([
        _carInvestigationService.layThongTinHopDong(obj),
        _carInvestigationService.layThongTinTinhTrangThanhToan(obj),
        _carInvestigationService.layDsLichSuTonThat(obj)
    ]).then(arrRes => {
        if (arrRes[0].state_info.status != "OK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        if (arrRes[1].state_info.status != "OK") {
            _notifyService.error(arrRes[1].state_info.message_body);
            return;
        }
        if (arrRes[2].state_info.status != "OK") {
            _notifyService.error(arrRes[2].state_info.message_body);
            return;
        }
        var data = arrRes[0].data_info;
        if (data !== null) {
            if (data.ho_so !== null) {
                $("#tblCarCommonCertificate").bindJsonToHtml(data.ho_so);
            } else {
                $("#tblCarCommonCertificate").bindJsonToHtml({});
            }
            ESUtil.genHTML("danhSachNV_template", "danhSachNV", { lhnv: data.dk }, () => {
                hthiTongTien(data.dk);
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
        }
        ESUtil.genHTML("dsXacMinhPhiLaySoHS_template", "dsXacMinhPhiLaySoHS", { danh_sach: arrRes[1].data_info });
        ESUtil.genHTML("tblLichSuBoiThuongXe_template", "tblLichSuBoiThuongXe", { data: arrRes[2].data_info });
        _navThongTinGiayChungNhanLSTT.showTab("tabThongTinGiayChungNhan");
        _modalXemThongTinGiayChungNhanLSTT.show();
    });
}
function suaThongTinXeTonThat_Contact() {
    _frmCarClaimCustomerInfo.resetForm();
    _frmCarClaimCustomerInfo.clearErrorMessage();
    var obj = ESUtil.cloneObject(ho_so_chi_tiet.data_info.ho_so);
    obj.ngay_tb = obj.ngay_ht;
    obj.gio_tb = obj.gio_ht;

    //var lhnv = objDanhMuc.lh_nv.where(n => n.loai == obj.loai && n.ma_doi_tac == ESCS_MA_DOI_TAC);
    _frmCarClaimCustomerInfo.getControl("nv_xly").setDataSource(_common.danhMucChung.luong_xly, "ten", "ma", "Chọn luồng xử lý", obj.nv_xly);
    _frmCarClaimCustomerInfo.setData(obj);
    _navTabTimKiemXe.showTab("tabThongTinLienHe");
    /*   _frmCarClaimCustomerInfo.getControl('nv_xly').attr('readonly', 'readonly');*/
    _frmCarClaimCustomerInfo.getControl('nguon_tb').attr('readonly', 'readonly');
    _frmCarClaimCustomerInfo.getControl('gio_tb').prop('readonly', true);
    _frmCarClaimCustomerInfo.getControl('ngay_tb').prop('readonly', true);
    _modalCarSearch.show();
}
function ChonHangGPLX(el) {
    $("#modalHangGPLXDanhSach .modalHangGPLXItem").prop("checked", false);
    var val = $(el).val();
    if (val != "") {
        var arr = val.split(",");
        for (var i = 0; i < arr.length; i++) {
            $("#modalHangGPLXDanhSach .modalHangGPLXItem[value='" + arr[i] + "']").prop("checked", true);
        }
    }
    _modalHangGPLX.show(el);
}
function suaBKS() {
    _frmSuaGCN.resetForm();
    _frmSuaGCN.clearErrorMessage();
    _carInvestigationService.layThongTinHopDong({
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        pm: "GD"
    }).then(res => {
        _frmSuaGCN.getControl("bien_xe").setValue(res.data_info.ho_so.bien_xe);
        _frmSuaGCN.getControl("hang_xe").setValue(res.data_info.ho_so.hang_xe_ten);
        _frmSuaGCN.getControl("hang_xe").trigger("select2:select");
        _frmSuaGCN.getControl("hieu_xe").setValue(res.data_info.ho_so.hieu_xe);
        _frmSuaGCN.getControl("nam_sx").setValue(res.data_info.ho_so.nam_sx);
        _frmSuaGCN.getControl("md_sd").setValue(res.data_info.ho_so.md_sd);
        _frmSuaGCN.getControl("loai_xe").setValue(res.data_info.ho_so.ma_loai_xe);
    });
    _modalSuaGCN.show();
}
function copyLink(el) {
    if (ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht == "" || ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht == null) {
        _notifyService.warning("Không có link chụp ảnh hiện trường");
        return;
    }
    else {
        var link = {
            link: ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht
        }
        navigator.clipboard.writeText(link.link);
        _notifyService.success("Copy link thành công");
    }
}
function copyLinkChupAnhCT(el) {
    if (ho_so_chi_tiet.data_info.ho_so.link_chup_anh_ct == null || ho_so_chi_tiet.data_info.ho_so.link_chup_anh_ct == "") {
        _notifyService.warning("Không có link chụp ảnh chi tiết");
    }
    navigator.clipboard.writeText(ho_so_chi_tiet.data_info.ho_so.link_chup_anh_ct);
    _notifyService.success("Copy link thành công");
}
function xemBanDoGDVHT() {
    var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined).max(n => n.lan_gd);
    var lan = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd == lan_gd_max).firstOrDefault();
    var tinh_thanh = "";
    var quan_huyen = "";
    var phuong_xa = "";
    var dia_diem = "";
    if (lan == undefined && lan == null) {
        tinh_thanh = _frmDiaDiemGD.getControl("tinh_thanh").val();
        quan_huyen = _frmDiaDiemGD.getControl("quan_huyen").val();
        phuong_xa = _frmDiaDiemGD.getControl("phuong_xa").val();
        dia_diem = _frmDiaDiemGD.getControl("dia_diem").val();
    }
    else {
        tinh_thanh = lan.tinh_thanh;
        quan_huyen = lan.quan_huyen;
        phuong_xa = lan.phuong_xa;
        dia_diem = lan.dia_diem;
    }
    var dia_chi = getDiaChi(tinh_thanh, quan_huyen, phuong_xa, dia_diem);
    if (dia_chi != "") {
        _service.layToaDoGDVHT({ tinh_thanh: tinh_thanh, quan_huyen: quan_huyen }).then(res => {
            _modalMap.hienThiViTriGDVHT(res.data_info, dia_chi, (ma_dvi, gdv) => {
                _frmDiaDiemGD.getControl("dvi_gdinh").setValue(ma_dvi);
                _frmDiaDiemGD.getControl("dvi_gdinh").trigger("select2:select");
                _frmDiaDiemGD.getControl("ma_gdv").setValue(gdv);
                _modalMap.hide();
            });
        });
    }
}
function luuDienBienTonThat(callback) {
    if (_frmDienBienTonThat.isValid()) {
        var jsonStep1 = _frmDienBienTonThat.getJsonData();
        _service.ktraVuTT(jsonStep1).then(resKtra => {
            if (resKtra.state_info.status !== "OK") {
                _notifyService.error(resKtra.state_info.message_body);
                return;
            }
            if (resKtra.out_value.so_vu > 0) {
                _notifyService.confirm("Xe này có nhiều vụ tổn thất xảy ra trong cùng 1 ngày. Bạn có muốn tiếp tục xử lý?", "", () => {
                    var gio_xr = jsonStep1.gio_xr.timeToNumber();
                    var ngay_gio_xr = parseInt(jsonStep1.ngay_xr + '' + gio_xr);
                    var gio_ht = new Date().HHmm().timeToNumber();
                    if (ngay_gio_xr.toString().length == 3) {
                        ngay_gio_xr = "0" + ngay_gio_xr;
                    }
                    if (gio_ht.toString().length == 3) {
                        gio_ht = "0" + gio_ht;
                    }
                    var ngay_ht = dateNow.dateToNumber();
                    var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
                    if (ngay_gio_xr > ngay_gio_ht) {
                        _notifyService.error("Giờ thông báo không được lớn hơn giờ hiện tại");
                        return;
                    }
                    _service.luuDienBienTonThat(jsonStep1).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        tthai_vu_tt = "xem";
                        var count = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt === undefined).length;
                        if (count > 0) {
                            ho_so_chi_tiet.data_info.dien_bien.splice(ho_so_chi_tiet.data_info.dien_bien.length - 1, 1);
                        }
                        if (jsonStep1.vu_tt === undefined || jsonStep1.vu_tt === "") {
                            _frmDienBienTonThat.getControl("vu_tt").val(res.out_value.vu_tt);
                            jsonStep1.stt = laySTT(jsonStep1.ngay_xr, jsonStep1.gio_xr);
                            jsonStep1.vu_tt = parseFloat(res.out_value.vu_tt);
                            jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                            jsonStep1.so_id = parseFloat(jsonStep1.so_id);

                            ho_so_chi_tiet.data_info.dien_bien.push(jsonStep1);
                        } else {
                            var index = ho_so_chi_tiet.data_info.dien_bien.findIndex(x => x.vu_tt == jsonStep1.vu_tt);
                            jsonStep1.stt = laySTT(jsonStep1.ngay_xr, jsonStep1.gio_xr);

                            jsonStep1.vu_tt = parseFloat(jsonStep1.vu_tt);
                            jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                            jsonStep1.so_id = parseFloat(jsonStep1.so_id);
                            ho_so_chi_tiet.data_info.dien_bien[index] = jsonStep1;
                        }
                        ho_so_chi_tiet.data_info.dien_bien.sort((a, b) => b.stt - a.stt);
                        showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
                        setStyleVuTTSelect(_frmDienBienTonThat.getControl("vu_tt").val());
                        _notifyService.success("Lưu thông tin thành công.");

                        tthai_vu_tt = "xem";
                        $("#btnThemMoiVuTonThat").removeAttr("disabled");
                        $("#btnXoaDienBienTonThat").show();
                        $("#btnHuyThaoTac").hide();
                        if (callback) {
                            callback(res);
                        }


                    });
                });
            }
            else {
                var gio_xr = jsonStep1.gio_xr.timeToNumber();
                var ngay_gio_xr = parseInt(jsonStep1.ngay_xr + '' + gio_xr);
                var gio_ht = new Date().HHmm().timeToNumber();
                if (ngay_gio_xr.toString().length == 3) {
                    ngay_gio_xr = "0" + ngay_gio_xr;
                }
                if (gio_ht.toString().length == 3) {
                    gio_ht = "0" + gio_ht;
                }
                var ngay_ht = dateNow.dateToNumber();
                var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
                if (ngay_gio_xr > ngay_gio_ht) {
                    _notifyService.error("Giờ thông báo không được lớn hơn giờ hiện tại");
                    return;
                }
                _service.luuDienBienTonThat(jsonStep1).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    tthai_vu_tt = "xem";
                    var count = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt === undefined).length;
                    if (count > 0) {
                        ho_so_chi_tiet.data_info.dien_bien.splice(ho_so_chi_tiet.data_info.dien_bien.length - 1, 1);
                    }
                    if (jsonStep1.vu_tt === undefined || jsonStep1.vu_tt === "") {
                        _frmDienBienTonThat.getControl("vu_tt").val(res.out_value.vu_tt);
                        jsonStep1.stt = laySTT(jsonStep1.ngay_xr, jsonStep1.gio_xr);
                        jsonStep1.vu_tt = parseFloat(res.out_value.vu_tt);
                        jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                        jsonStep1.so_id = parseFloat(jsonStep1.so_id);

                        ho_so_chi_tiet.data_info.dien_bien.push(jsonStep1);
                    } else {
                        var index = ho_so_chi_tiet.data_info.dien_bien.findIndex(x => x.vu_tt == jsonStep1.vu_tt);
                        jsonStep1.stt = laySTT(jsonStep1.ngay_xr, jsonStep1.gio_xr);

                        jsonStep1.vu_tt = parseFloat(jsonStep1.vu_tt);
                        jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                        jsonStep1.so_id = parseFloat(jsonStep1.so_id);
                        ho_so_chi_tiet.data_info.dien_bien[index] = jsonStep1;
                    }
                    ho_so_chi_tiet.data_info.dien_bien.sort((a, b) => b.stt - a.stt);
                    showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
                    setStyleVuTTSelect(_frmDienBienTonThat.getControl("vu_tt").val());
                    _notifyService.success("Lưu thông tin thành công.");

                    tthai_vu_tt = "xem";
                    $("#btnThemMoiVuTonThat").removeAttr("disabled");
                    $("#btnXoaDienBienTonThat").show();
                    $("#btnHuyThaoTac").hide();
                    if (callback) {
                        callback(res);
                    }
                });
            }
        });


    }
}
function bindDataChuyenNguoiXuLyGDVHT(hanh_dong, ma_doi_tac, so_id, lan_gd) {
    _frmChuyenNguoiXuLyGDVHT.clearErrorMessage();
    _frmChuyenNguoiXuLyGDVHT.resetForm();
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").attr('readonly', false);
    _frmChuyenNguoiXuLyGDVHT.getControl("hanh_dong").val(hanh_dong);
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_doi_tac").val(ma_doi_tac);
    _frmChuyenNguoiXuLyGDVHT.getControl("so_id").val(so_id);
    _frmChuyenNguoiXuLyGDVHT.getControl("lan_gd").val(lan_gd);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").setValue("");
    if (hanh_dong == 'CCCT_CHUYEN_GDVHT') {
        $('.chi_nhanh_pcong').css('display', 'block');
        _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
    } else if (hanh_dong == 'PHAN_CONG_GDVHT') {
        $('.chi_nhanh_pcong').css('display', 'none');
        _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").attr('readonly', true);
        _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").setValue(ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh);
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh
        };
        _carInvestigationService.layDsNguoiTrongNhomPhanCongGD(obj).then(res => {
            _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setDataSource(res.data_info, "ten_can_bo", "nsd", "Chọn cán bộ", "");
        });
    }
}
function bindDataGara(objDanhMuc) {
    _frmDiaDiemGD.getControl("gara").setDataSource(objDanhMuc.gara, "ten_gara", "ma_gara", "Chọn gara", "");
}
function chonGiamDinhVien(rownum, ma_doi_tac, ma_chi_nhanh, ma_gdv) {
    $(".input-tkiem-gdv").prop("checked", false);
    $("#gdv_" + rownum).prop("checked", true);
    gdv_chon = {
        ma_doi_tac: ma_doi_tac,
        ma_chi_nhanh: ma_chi_nhanh,
        ma_gdv: ma_gdv
    };
}
function hienThiDsGiamDinhVien(obj) {
    obj.nv = ho_so_chi_tiet.data_info.ho_so.nv;
    gdv_chon = null;
    if (obj.tinh_thanh === "" && obj.quan_huyen === "") {
        ESUtil.genHTML("templateDsGiamDinhVienTheoDiaBan", "bodyDsGiamDinhVienTheoDiaBan", { ds_gdv: [] });
        return;
    }
    _service.lietKeDanhSachGDVHT(obj).then(res => {
        ESUtil.genHTML("templateDsGiamDinhVienTheoDiaBan", "bodyDsGiamDinhVienTheoDiaBan", { ds_gdv: res.data_info });
    });
}
//Xem màn hình GD, BT
function ShowInvestigationDisplay(ma_doi_tac, so_id, nv) {
    var data = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_GD'
    };
    if (nv == "XE") {
        var notify_url = "/carclaim/carinvestigation";
        window.open("/Manager/Approved/TransInvestigationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    }
    if (nv == "XE_MAY") {
        var notify_url = "/motoclaim/motoinvestigation";
        window.open("/Manager/Approved/TransMotoInvestigationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    }
}
function ShowCompensationDisplay(ma_doi_tac, so_id, nv) {
    var data = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_BT'
    };
    if (nv == "XE") {
        var notify_url = "/carclaim/carcompensation";
        window.open("/Manager/Approved/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    }
    if (nv == "XE_MAY") {
        var notify_url = "/motoclaim/motocompensation";
        window.open("/Manager/Approved/TransMotoCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    }
}
//Chọn gara sửa chữa
function getPagingGaraSuaChua(trang) {
    var arrTmp = [];
    var so_dong = 15;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var obj = {
        tinh_thanh: _frmChonGaraSuaChuaSearch.getControl("tinh_thanh").val(),
        quan_huyen: _frmChonGaraSuaChuaSearch.getControl("quan_huyen").val(),
        ten: $("#inputTimKiemGara").val()
    }
    _service.timKiemGaraBaoGia(obj).then(res => {
        arrTmp = res.data_info;
        var tong_so_dong = arrTmp.length;
        arrTmp = arrTmp.where((item, i) => i >= dau && i <= cuoi - 1);
        if (arrTmp != null && arrTmp.length > 0) {
            ESUtil.genHTML("dsGaraTemplate", "dsGara", { data: arrTmp }, () => {
                var ma = $("#inputTimKiemGara_ma").val();
                if (ma != undefined && ma != null && ma != "") {
                    $("#dsGara .modalDanhSachGaraItem[value='" + ma + "']").prop("checked", true);
                }
                $("#dsGara .single_checked").click(function () {
                    $("#dsGara .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
        }
        else {
            ESUtil.genHTML("dsGaraTemplate", "dsGara", { data: [] });
        }
        $("#dsGara_pagination").html(ESUtil.pagingHTML("getPagingGaraSuaChua", trang, tong_so_dong, so_dong));
        $("#inputTimKiemGara").focus();
    });
}
function chonGaraSuaChua(el) {
    $("#inputTimKiemGara").val("");
    $("#dsGara .modalDanhSachGaraItem").prop("checked", false);
    var ma = $(el).attr("data-ma");
    $("#inputTimKiemGara_ma").val(ma);
    getPagingGaraSuaChua(1);
    _popoverChonGaraSuaChua.options.placement = "custom";
    _popoverChonGaraSuaChua.options.position = { top: 100, left: 645 };
    _popoverChonGaraSuaChua.showWithPosition(el);
    $("#inputTimKiemGara").focus();
}
function onChonGara(el) {
    var gara = $(el).attr("data-gara");
    var ten_gara = $(el).attr("data-name");
    var tinh_thanh = $(el).attr("data-province");
    var quan_huyen = $(el).attr("data-district");
    var dia_chi = $(el).attr("data-address");

    _frmDiaDiemGD.getControl("ten_gara").setValue(ten_gara);
    _frmDiaDiemGD.getControl("ten_gara").attr("data-ma", gara);
    _frmDiaDiemGD.getControl("dia_diem").setValue(dia_chi);
    _frmDiaDiemGD.getControl("tinh_thanh").setValue(tinh_thanh);
    _frmDiaDiemGD.getControl("tinh_thanh").trigger("select2:select");
    _frmDiaDiemGD.getControl("quan_huyen").setValue(quan_huyen);
    _frmDiaDiemGD.getControl("quan_huyen").trigger("select2:select");
    _popoverChonGaraSuaChua.hide();
}
function xoaChonGara(el) {
    $(el).closest("div.input-group").find("input").attr("data-ma", "");
    $(el).closest("div.input-group").find("input").val("");
    _frmDiaDiemGD.getControl("dia_diem").setValue("");
    _frmDiaDiemGD.getControl("tinh_thanh").setValue("");
    _frmDiaDiemGD.getControl("quan_huyen").setValue("");
    _frmDiaDiemGD.getControl("phuong_xa").setValue("");
}
function guiSMSKhachHang(el) {
    var ma = $(el).attr("data-val");
    var text = "";
    if (ma == "HIEN_TRUONG" && (ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht == "" || ho_so_chi_tiet.data_info.dien_bien[0].link_chup_anh_ht == null)) {
        _notifyService.warning("Không có link chụp ảnh hiện trường");
        return;
    }
    if (ma == "CHUP_ANH_CHI_TIET" && (ho_so_chi_tiet.data_info.ho_so.link_chup_anh_ct == null || ho_so_chi_tiet.data_info.ho_so.link_chup_anh_ct == "")) {
        _notifyService.warning("Không có link chụp ảnh chi tiết");
        return;
    }
    if (ma == "HIEN_TRUONG") {
        text = "Bạn có muốn gửi SMS link chụp ảnh hiện trường tới khách hàng <b class='font-weight-bold'>" + ho_so_chi_tiet.data_info.ho_so.nguoi_lhe + " - " + ho_so_chi_tiet.data_info.ho_so.dthoai_lhe +"</b> không?";
    }
    if (ma == "CHUP_ANH_CHI_TIET") {
        text = "Bạn có muốn gửi SMS link chụp ảnh chi tiết tới khách hàng <b class='font-weight-bold'>" + ho_so_chi_tiet.data_info.ho_so.nguoi_lhe + " - " + ho_so_chi_tiet.data_info.ho_so.dthoai_lhe +"</b> không?";
    }
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nv: ho_so_chi_tiet.data_info.ho_so.nv,
        loai: ma
    }
    _notifyService.confirmHTML(text, " ", val => {
        _common.sendSMS(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin gửi SMS thành công");
        });
    });
}
//Xe máy
function frmTaoHDAoLoadLHNV(nv, loai_hinh) {
    var lhnv = objDanhMuc.lh_nv.where(n => n.nv == nv && n.loai == loai_hinh);
    _frmTaoHDAo.getControl("lh_nv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
    if (loai_hinh == "TN") {
        var lhnv_vcx = lhnv.where(n => n.loai == loai_hinh && n.vcx == "VCX").firstOrDefault();
        if (lhnv_vcx != null) {
            _frmTaoHDAo.getControl("lh_nv").setValue(lhnv_vcx.ma);
        }
    }
}
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("CONTACT");
    clearCacheLocalStoreage();
    //Lấy danh mục
    _frmCarClaimCarSearch.getControl("nv").setDataSource(DS_NGHIEP_VU, "ten", "ma", "Chọn nghiệp vụ", "");
    _frmTaoHDAo.getControl("nv").setDataSource(DS_NGHIEP_VU, "ten", "ma", "Chọn nghiệp vụ", "");
    _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource([], "ten", "ma", "Chọn đối tác", "");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn đơn vị", "");
    _frmTimKiemHoSo.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemHoSo.getControl("ngay_c").setValue(dateNow);
    _frmTimKiemGDV.getControl("ngay_bd").setValue(ngayDauThang);
    _frmTimKiemGDV.getControl("ngay_kt").setValue(dateNow);
    $("#btnChuyenTabGD").removeClass("d-none");
    $("#btnLuuThongTinDiaDiemGD").removeClass("d-none");
    //Lấy danh sách hồ sơ (có phân trang)
    var objTimKiem = _frmTimKiemHoSo.getJsonData();
    objTimKiem.trang = 1;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    ESUtil.genHTML("CarCompensationContentStep1Table4_template", "CarCompensationContentStep1Table4", { "nguoi_dd": [] });
    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null || storageDonViHanhChinh === "null") {
        _service.base.all([
            _userManagementService.layDsNSD(),
            _service.paging(objTimKiem),
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _categoryCommonService.layDsDanhMucChung(),
            _commonService.layTatCaDonViHanhChinh(),
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "GDHT", nhap: 1 }),
            _businessCodeService.layDsLHNV(),
            _carManufacturerListService.layDsHangXe(),
            _hieuXeService.layDsHieuXe(),
            _rangeVehicleService.layDsLoaiXe(),
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "BTXE", nhap: 1 }),
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.doi_tac = arrRes[2].data_info;
            objDanhMuc.chi_nhanh = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.dmuc_chung = arrRes[4].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.ds_gdvht = arrRes[6].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.lh_nv = arrRes[7].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.hang_xe = arrRes[8].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.hieu_xe = arrRes[9].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.loai_xe = arrRes[10].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.btv = arrRes[11].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataNhomNguyenNhan(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });
            ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);

            ESUtil.executeAsync(() => {
                objDanhMucDonViHanhChinh = arrRes[5].data_info;
                ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMucDonViHanhChinh));
                bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);

                objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
                objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
                objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");
            });
            ESUtil.executeAsync(() => { binDataGPLX(); });
            ESUtil.executeAsync(() => {
                _gridViewThanhToan.setDataSource(arrRes[1], 1);
                if (arrRes[1].data_info.data !== null && arrRes[1].data_info.data !== undefined && arrRes[1].data_info.data.length <= GRID_HO_SO_SO_DONG) {
                    _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG - arrRes[1].data_info.data.length);
                } else {
                    _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG);
                }
            });
        });
    } else {
        objDanhMucDonViHanhChinh = JSON.parse(storageDonViHanhChinh);
        bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);
        objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
        objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
        objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");

        _service.base.all([
            _userManagementService.layDsNSD(),
            _service.paging(objTimKiem),
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _categoryCommonService.layDsDanhMucChung(),
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "GDHT", nhap: 1 }),
            _businessCodeService.layDsLHNV(),
            _carManufacturerListService.layDsHangXe(),
            _hieuXeService.layDsHieuXe(),
            _rangeVehicleService.layDsLoaiXe(),
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "BTXE", nhap: 1 }),
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.doi_tac = arrRes[2].data_info;
            objDanhMuc.chi_nhanh = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.dmuc_chung = arrRes[4].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.ds_gdvht = arrRes[5].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.lh_nv = arrRes[6].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.hang_xe = arrRes[7].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.hieu_xe = arrRes[8].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.loai_xe = arrRes[9].data_info.where(n => n.nv == 'XE' && n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.btv = arrRes[10].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

            _frmSuaGCN.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
            _frmSuaGCN.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
            _frmSuaGCN.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");
            _frmSuaGCN.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");

            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataNhomNguyenNhan(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });
            ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);
            ESUtil.executeAsync(() => { binDataGPLX(); });
            ESUtil.executeAsync(() => {
                _gridViewThanhToan.setDataSource(arrRes[1], 1);
                if (arrRes[1].data_info.data !== null && arrRes[1].data_info.data !== undefined && arrRes[1].data_info.data.length <= GRID_HO_SO_SO_DONG) {
                    _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG - arrRes[1].data_info.data.length);
                } else {
                    _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG);
                }
            });
        });
    }

    _frmDienBienTonThat.getControl("gplx_hang").addEventChange(val => {
        setNgayHetHanGPLX();
    });
    _frmSuaGCN.getControl("hang_xe").addEventChange(val => {
        var arrHieuXe = objDanhMuc.hieu_xe.where(n => n.hang_xe === val);
        _frmSuaGCN.getControl("hieu_xe").setDataSource(arrHieuXe, "ten", "ma", "Chọn hiệu xe", "");
    });
    _frmCarClaimCustomerInfo.getControlById("chkThamGiaLienHe").change(function () {
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmCarClaimCustomerInfo.getMultipleControl("nguoi_tb, dthoai_tb, email_tb").keyup(function () {
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmCarClaimCustomerInfo.getControl("moi_qh_tb").addEventChange(val => {
        if (val == 'QH.0001') {
            var obj = {
                ma_doi_tac: _frmCarClaimCustomerInfo.getControl('ma_doi_tac').val(),
                ma_chi_nhanh: '',
                so_id: _frmCarClaimCustomerInfo.getControl('so_id_hd').val(),
                so_id_dt: _frmCarClaimCustomerInfo.getControl('so_id_dt').val()
            }
            _carContractService.layChiTietHopDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (res.data_info.gcn != null) {
                    var gcn = res.data_info.gcn.where(n => n.so_id_dt == obj.so_id_dt).firstOrDefault();
                    if (gcn != null) {
                        var res_data = {
                            nguoi_tb: gcn.ten,
                            dthoai_tb: res.data_info.hd.dthoai,
                            email_tb: res.data_info.hd.email
                        }
                        _frmCarClaimCustomerInfo.getControl('nguoi_tb').setValue(res_data.nguoi_tb);
                        _frmCarClaimCustomerInfo.getControl('dthoai_tb').setValue(res_data.dthoai_tb);
                        _frmCarClaimCustomerInfo.getControl('email_tb').setValue(res_data.email_tb);
                    }
                }
            });
        }
        setNguoiLienHeTheoNguoiThongBao();
    });
    _frmThongTinNguoiLienHe.getControlById("chkThamGiaLienHeUpdate").change(function () {
        bindDataToFormThongTinLienHe();
    });
    _frmThongTinNguoiLienHe.getMultipleControl("nguoi_tb, dthoai_tb, email_tb").keyup(function () {
        bindDataToFormThongTinLienHe();
    });
    _frmThongTinNguoiLienHe.getControl("moi_qh_tb").addEventChange(val => {
        bindDataToFormThongTinLienHe();
    });
    _frmTaoHDAo.getControl("loai").addEventChange(val => {
        var nv = _frmTaoHDAo.getControl("nv").val();
        frmTaoHDAoLoadLHNV(nv, val);
    });
    _frmTaoHDAo.getControl("nv").addEventChange(val => {
        var loai = _frmTaoHDAo.getControl("loai").val();
        frmTaoHDAoLoadLHNV(val, loai);
    });

    _frmDiaDiemGD.getControl("hien_truong").setDataSource(hienTruong, "ten", "ma", "Chọn hiện trường", "");
    _frmDiaDiemGD.getControl("hien_truong").addEventChange(val => {
        hienTruongXe(val == 'D');
        var hoso = ho_so_chi_tiet.data_info.ho_so;
        if (val == 'D' || (val == 'D' && (hoso.dia_diem == null || hoso.dia_diem.trim() == "") &&
            (hoso.tinh_thanh == null || hoso.tinh_thanh.trim() == "") &&
            (hoso.quan_huyen == null || hoso.quan_huyen.trim() == "") &&
            (hoso.phuong_xa == null || hoso.phuong_xa.trim() == ""))) {
            var vu_tt = ho_so_chi_tiet.data_info.dien_bien[0];
            _frmDiaDiemGD.getControl("dia_diem").setValue(vu_tt.dia_diem);
            _frmDiaDiemGD.getControl("tinh_thanh").setValue(vu_tt.tinh_thanh);
            _frmDiaDiemGD.getControl("tinh_thanh").trigger("select2:select");
            _frmDiaDiemGD.getControl("quan_huyen").setValue(vu_tt.quan_huyen);
            _frmDiaDiemGD.getControl("quan_huyen").trigger("select2:select");
            _frmDiaDiemGD.getControl("phuong_xa").setValue(vu_tt.phuong_xa);
            $("#frmDiaDiemGD_gara").addClass("d-none");
            $("#frmDiaDiemGD_diadiem").removeClass("col-4").addClass("col-8");
        }
        //else {
        //    _frmDiaDiemGD.getControl("gio_gd").setValue(hoso.gio_gd);
        //    _frmDiaDiemGD.getControl("ngay_gd").setValue(hoso.ngay_gd == null || hoso.ngay_gd == 0 ? "" : hoso.ngay_gd.numberToDate());
        //    _frmDiaDiemGD.getControl("dia_diem").setValue(hoso.dia_diem);
        //    _frmDiaDiemGD.getControl("tinh_thanh").setValue(hoso.tinh_thanh == null ? "" : hoso.tinh_thanh);
        //    _frmDiaDiemGD.getControl("tinh_thanh").trigger("select2:select");
        //    _frmDiaDiemGD.getControl("quan_huyen").setValue(hoso.quan_huyen);
        //    _frmDiaDiemGD.getControl("quan_huyen").trigger("select2:select");
        //    _frmDiaDiemGD.getControl("phuong_xa").setValue(hoso.phuong_xa);
        //    _frmDiaDiemGD.getControl("gara").setValue(hoso.gara);
        //    $("#frmDiaDiemGD_gara").removeClass("d-none");
        //    $("#frmDiaDiemGD_diadiem").removeClass("col-8").addClass("col-4");
        //}
    });
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").addEventChange(val => {
        var arrCanBo = [];
        if (ho_so_chi_tiet.data_info.ho_so.nv_xly != "NGUOI") {
            arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        }
        else {
            arrCanBo = objDanhMuc.btv.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        }
        _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setValue("");
    });

    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnThemMoiHoSo").click(function () {
        navTimKiemXe("TIMKIEM");
        _frmCarClaimCarSearch.resetForm();
        _frmCarClaimCarSearch.clearErrorMessage();
        _frmCarClaimCustomerInfo.resetForm();
        _frmCarClaimCustomerInfo.clearErrorMessage();
        _frmCarClaimCarSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmCarClaimCarSearch.getControl("ma_doi_tac").trigger("select2:select");
        var nv_mac_dinh = _common.danhMucChung.nghiep_vu.where(n => n.mac_dinh == 1).firstOrDefault().ma;
        _frmCarClaimCarSearch.getControl("nv").setValue(nv_mac_dinh);

        ESUtil.genHTML("modalCarSearchDsGCNTemplate", "modalCarSearchDsGCN", { data_info: [] });
        _navTabTimKiemXe.showTab("tabTimKiemXe");
        _frmCarClaimCarSearch.getControl("ngay_xr").setValue(dateNow);
        _modalCarSearch.show();
    });
    $("#btnCarSearch").click(function () {
        if (_frmCarClaimCarSearch.isValid()) {
            timKiemXe();
        }
    });
    $("#btnTiepTheo").click(function () {
        var currentTab = _navTabTimKiemXe.currentTab;
        var selectedData = [];
        if ($("#modalCarSearchDsGCN .tkiem_kh.active").length > 0) {
            selectedData.push({
                ma_chi_nhanh: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_ma_chi_nhanh"),
                so_hdong: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_so_hdong"),
                so_id: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_so_id"),
                so_id_dt: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_so_id_dt"),
                loai: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_loai")
            });
        }
        if (currentTab === "tabTimKiemXe") {
            var tabActive = $("#navLuongXuLy .breadcrumb-item.active").attr("data-val");
            if (tabActive == "TIMKIEM") {
                if (!_frmCarClaimCarSearch.isValid()) {
                    return
                }
                _frmCarClaimCustomerInfo.resetForm();
                var dataRow = selectedData[0];
                if (dataRow == undefined) {
                    _notifyService.error("Thông tin xe không xác định");
                    return;
                }
                _frmCarClaimCustomerInfo.getControl("nv").val(_frmCarClaimCarSearch.getControl("nv").val());
                _frmCarClaimCustomerInfo.getControl("so_id_hd").val(dataRow.so_id);
                _frmCarClaimCustomerInfo.getControl("so_id_dt").val(dataRow.so_id_dt);
                _frmCarClaimCustomerInfo.getControl("ma_doi_tac").val(ESCS_MA_DOI_TAC);
                if (dataRow.loai == "CH") {
                    dataRow.loai = "TN";
                }
                _frmCarClaimCustomerInfo.getControl("nv_xly").setDataSource(_common.danhMucChung.luong_xly, "ten", "ma", "Chọn luồng xử lý", "");
                var objRequest = {
                    ma_chi_nhanh: dataRow.ma_chi_nhanh,
                    so_id_hd: dataRow.so_id,
                    so_id_gcn: dataRow.so_id_dt,
                    so_hdong: dataRow.so_hdong
                }
                _carClaimCommonService.layThongTinGCN(objRequest).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    selectCar();
                    _navTabTimKiemXe.showTab("tabThongTinLienHe");
                });
            }
            if (tabActive == "TAOHD") {
                if (!_frmTaoHDAo.isValid()) {
                    return;
                }
                var obj = _frmTaoHDAo.getJsonData();
                _frmCarClaimCustomerInfo.getControl("nv").setValue(obj.nv);
                _frmCarClaimCustomerInfo.getControl("nv_xly").setDataSource(_common.danhMucChung.luong_xly, "ten", "ma", "Chọn luồng xử lý", "");
                _navTabTimKiemXe.showTab("tabThongTinLienHe");
            }
            _frmCarClaimCustomerInfo.getControl("nguon_tb").setValue("CTCT");
            _frmCarClaimCustomerInfo.getControl("gio_tb").val(gioHT);
            _frmCarClaimCustomerInfo.getControl("ngay_tb").val(dateNow);

        }
        if (currentTab === "tabThongTinLienHe") {
            _frmCarClaimCustomerInfo.clearErrorMessage();
            _frmCarClaimCustomerInfo.getControl('nguon_tb').removeAttr('readonly');
            _frmCarClaimCustomerInfo.getControl('gio_tb').prop('readonly', false);
            _frmCarClaimCustomerInfo.getControl('ngay_tb').prop('readonly', false);
            if (!_frmCarClaimCustomerInfo.isValid()) {
                return;
            }
            var objJson = _frmCarClaimCustomerInfo.getJsonData();
            var objDoiTuong = _frmTaoHDAo.getJsonData();
            objJson.loai = objDoiTuong.loai;
            objJson.lh_nv = objDoiTuong.lh_nv;
            objJson.ten = objDoiTuong.ten;
            objJson.bien_xe = objDoiTuong.bien_xe;

            var gio_tb = objJson.gio_tb.timeToNumber();
            if (gio_tb.toString().length == 3) {
                gio_tb = "0" + gio_tb;
            }

            var ngay_gio_tb = parseInt(objJson.ngay_tb + '' + gio_tb);
            var gio_ht = new Date().HHmm().timeToNumber();
            if (gio_ht.toString().length == 3) {
                gio_ht = "0" + gio_ht;
            }

            var ngay_ht = dateNow.dateToNumber();
            var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
            if (ngay_gio_tb > ngay_gio_ht) {
                _notifyService.error("Giờ thông báo không được lớn hơn giờ hiện tại");
                return;
            }
            _service.nhapHsTiepNhan(objJson).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                try {
                    var data = {
                        ma_doi_tac: res.out_value.ma_doi_tac,
                        so_id: res.out_value.so_id
                    };
                    rowClick(data);
                } catch (e) { }
                _modalCarSearch.hide();
                getPaging(1);
            });
        }
    });
    $("#btnLuuDienBienTonThat").click(function () {
        luuDienBienTonThat();
    });
    $("#btnLuuVaTiepTheo").click(function () {
        luuDienBienTonThat(res => {
            showStep("stepDiaDiemGiamDinh");
        });
    });
    $("#btnThemMoiVuTonThat").click(function () {
        tthai_vu_tt = "them_moi";
        $("#btnXoaDienBienTonThat").hide();
        $("#btnHuyThaoTac").show();
        $("#btnThemMoiVuTonThat").attr("disabled", "disabled");

        var dsVuTT = ho_so_chi_tiet.data_info.dien_bien;
        if (dsVuTT.where(n => n.vu_tt === undefined).length <= 0) {
            ho_so_chi_tiet.data_info.dien_bien.push({ gio_xr: "", ngay_xr: "//", so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
            var so_id = _frmDienBienTonThat.getControl("so_id").val();
            _frmDienBienTonThat.resetForm();
            _frmDienBienTonThat.getControl("so_id").val(so_id);
            _frmDienBienTonThat.getControl("gio_xr").setValue("");
            _frmDienBienTonThat.getControl("ngay_xr").setValue("");
            _frmDienBienTonThat.getControl("gplx_hieu_luc").setValue(new Date().ddmmyyyy());
            _frmDienBienTonThat.getControl("gplx_het_han").setValue(new Date().ddmmyyyy());
            _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            setStyleVuTTSelect("");
        }
    });
    $("#btnHuyThaoTac").click(function () {
        tthai_vu_tt = "xem";
        $("#btnThemMoiVuTonThat").removeAttr("disabled");
        $("#btnXoaDienBienTonThat").show();
        $("#btnHuyThaoTac").hide();

        var dsVuTT = ho_so_chi_tiet.data_info.dien_bien;
        ho_so_chi_tiet.data_info.dien_bien = dsVuTT.removeItem(n => n.vu_tt === undefined);
        showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
        if (ho_so_chi_tiet.data_info.dien_bien.length > 0) {
            xemChiTietVuTonThat(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
            setStyleVuTTSelect(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
        } else {
            $("#btnThemMoiVuTonThat").trigger("click");
        }
    });
    $("#btnXoaDienBienTonThat").click(function () {
        var so_id = _frmDienBienTonThat.getControl("so_id").val();
        var vu_tt = _frmDienBienTonThat.getControl("vu_tt").val();
        if (so_id === "" || vu_tt === "") {
            _notifyService.error("Thông tin vụ tổn thất chưa xác định. Trạng thái không thể xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa diễn biến tổn thất này không?", " ", val => {
            _service.xoaVuTT({ so_id: so_id, vu_tt: vu_tt }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var arrIndex = ho_so_chi_tiet.data_info.dien_bien.findIndex(n => n.vu_tt === vu_tt);
                ho_so_chi_tiet.data_info.dien_bien.splice(arrIndex, 1);
                showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
                if (ho_so_chi_tiet.data_info.dien_bien.length > 0) {
                    xemChiTietVuTonThat(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
                    setStyleVuTTSelect(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
                } else {
                    $("#btnThemMoiVuTonThat").trigger("click");
                }
                _notifyService.success("Xóa vụ tổn thất thành công");
            });

        });
    });
    $("#btnThemLanGiamDinh").click(function () {
        _frmThemLanGiamDinh.resetForm();
        _frmThemLanGiamDinh.getControl("ngay_lh").setValue(dateNow);
        _frmThemLanGiamDinh.getControl("gio_lh").val(gioHT);
        _modalThemLanGiamDinh.show();
    });
    $("#btnLuuLanTiepNhan").click(function () {
        if (!_frmThemLanGiamDinh.isValid()) {
            return;
        }
        var json = _frmThemLanGiamDinh.getJsonData();
        json.so_id = _frmDienBienTonThat.getControl("so_id").val();
        json.bt = 0;
        _service.luuLanTiepNhan(json).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            getLanGiamDinh();
            _modalThemLanGiamDinh.hide();
            _notifyService.success("Nhập lần tiếp nhận thành công");
        });
    });
    $("#btnChuyenBoiThuong").click(function () {
        _notifyService.confirmEmail("Bạn có chắc chắn muốn chuyển hồ sơ này không?", type => {
            var so_id = _frmDienBienTonThat.getControl("so_id").val();
            if (so_id === "") {
                _notifyService.error("Thông tin hồ sơ tiếp nhận chưa xác định!");
                return;
            }
            var obj = _frmDienBienTonThat.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.nv = ho_so_chi_tiet.data_info.ho_so.nv;
            obj.so_id = so_id;
            obj.ma = "TEMPLATE_EMAIL_HS_MOI";
            obj.pm = CONSTANT_PM;
            obj.gui_email = type == "CHUYEN_VA_GUI_MAIL";

            _service.chuyenBoiThuong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layCtHsTiepNhan(obj).then(res1 => {
                    ho_so_chi_tiet = res1;
                    _frmDiaDiemGD.getControl("link_chup_anh_ht").setValue(res1.data_info.dien_bien[0].link_chup_anh_ht);
                    _frmDiaDiemGD.getControl("link_chup_anh_ct").setValue(res1.data_info.dien_bien[0].link_chup_anh_ct);
                });
                anCacNut(true);
                _notifyService.success("Chuyển hồ sơ thành công");
                getPaging(1);
            });
        });
    });
    $("#lan_gd").change(function () {
        var maLanGiamDinh = $(this).val();
        var json = JSON.parse(ESStorage.getItemLocalStorage("detail"));
        var val = json.lan_gd.where(n => n.ma == maLanGiamDinh);
        if (val.length > 0) {
            ESUtil.genHTML("CarCompensationContentStep1Table3_template", "CarCompensationContentStep1Table3", val[0]);
        }
        //lấy danh sách người tham gia giám định
        var val = json.nguoi_dd.where(n => n.lan_gd == maLanGiamDinh);
        ESUtil.genHTML("CarCompensationContentStep1Table4_template", "CarCompensationContentStep1Table4", { "nguoi_dd": val });
    });
    $('#callInput').click(function () {
        var val = _.trim(_frmThemLanGiamDinh.getControl('dthoai').getValue(), "_");
        if (val.length > 0) {
            ESUtil.voiceCall(val);
        }
    });
    $("#xemBanDo").click(function () {
        var ma_tinh = _frmDienBienTonThat.getControl("tinh_thanh").val();
        var ma_quan = _frmDienBienTonThat.getControl("quan_huyen").val();
        var ma_phuong = _frmDienBienTonThat.getControl("phuong_xa").val();
        var dchi_ctiet = _frmDienBienTonThat.getControl("dia_diem").val();
        var dia_chi = getDiaChi(ma_tinh, ma_quan, ma_phuong, dchi_ctiet);
        if (dia_chi != "") {
            _modalMap.hienThiMapTheoDiaChi(dia_chi, dia_chi);
        }
    });
    $("#xemBanDoThongTinGiamDinh").click(function () {
        var ma_tinh = _frmDiaDiemGD.getControl("tinh_thanh").val();
        var ma_quan = _frmDiaDiemGD.getControl("quan_huyen").val();
        var ma_phuong = _frmDiaDiemGD.getControl("phuong_xa").val();
        var dchi_ctiet = _frmDiaDiemGD.getControl("dia_diem").val();
        var dia_chi = getDiaChi(ma_tinh, ma_quan, ma_phuong, dchi_ctiet);
        if (dia_chi != "") {
            _modalMap.hienThiMapTheoDiaChi(dia_chi, dia_chi);
        }
    });
    $("#btnChuyenTabGD").click(function () {
        showStep("stepDiaDiemGiamDinh");
    });
    $("#btnLuuThongTinDiaDiemGD").click(function () {
        if (!_frmDiaDiemGD.isValid()) {
            return;
        }
        var obj = _frmDiaDiemGD.getJsonData();
        obj.ma_doi_tac = ESCS_MA_DOI_TAC;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.nv = ho_so_chi_tiet.data_info.ho_so.nv;
        obj.gara = "";
        var gio = _frmDiaDiemGD.getControl("gio_gd").val();
        var ngay = _frmDiaDiemGD.getControl("ngay_gd").val();
        var gara = _frmDiaDiemGD.getControl("ten_gara").attr("data-ma");
        if (gara != undefined && gara != "" && gara != null) {
            obj.gara = gara;
        }
        if (gio != "" && ngay != "") {
            var gio_gd = _frmDiaDiemGD.getControl("gio_gd").val().timeToNumber();
            var ngay_ht = dateNow.dateToNumber();
            var gio_ht = new Date().HHmm().timeToNumber();
            var message = "Ngày giờ giám định không được nhỏ hơn ngày giờ hiện tại";
            if (ESCS_MA_DOI_TAC == "PJICO") {
                ngay_ht = ho_so_chi_tiet.data_info.ho_so.ngay_ht.dateToNumber();
                gio_ht = ho_so_chi_tiet.data_info.ho_so.gio_ht.timeToNumber();
                message = "Ngày giờ giám định không được nhỏ hơn ngày giờ thông báo";
            }
            if (gio_gd.toString().length == 3) {
                gio_gd = "0" + gio_gd;
            }
            if (gio_ht.toString().length == 3) {
                gio_ht = "0" + gio_ht;
            }
            var ngay_gio_gd = parseInt(obj.ngay_gd + '' + gio_gd);
            var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
            
            if (ngay_gio_gd < ngay_gio_ht) {
                _notifyService.error(message);
                return;
            }
           
        }
        _service.capNhatThongTinGD(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin giám định thành công");
            _service.layCtHsTiepNhan(obj).then(res1 => {
                ho_so_chi_tiet = res1;
                _frmDiaDiemGD.getControl("link_chup_anh_ht").setValue(res1.data_info.dien_bien[0].link_chup_anh_ht);
                _frmDiaDiemGD.getControl("link_chup_anh_ct").setValue(res1.data_info.ho_so.link_chup_anh_ct);
            });
        });
    });
    $("#btnLuuVaChuyenGD").click(function () {
        if (!_frmDiaDiemGD.isValid()) {
            return;
        }
        _notifyService.confirmEmail("Bạn có chắc chắn muốn lưu và chuyển hồ sơ này không?", type => {
            var obj = _frmDiaDiemGD.getJsonData();
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.gara = "";
            var gio = _frmDiaDiemGD.getControl("gio_gd").val();
            var ngay = _frmDiaDiemGD.getControl("ngay_gd").val();
            var gara = _frmDiaDiemGD.getControl("ten_gara").attr("data-ma");
            if (gara != undefined && gara != "" && gara != null) {
                obj.gara = gara;
            }
            if (gio != "" && ngay != "") {
                var gio_gd = _frmDiaDiemGD.getControl("gio_gd").val().timeToNumber();
                var ngay_ht = dateNow.dateToNumber();
                var gio_ht = new Date().HHmm().timeToNumber();
                var message = "Ngày giờ giám định không được nhỏ hơn ngày giờ hiện tại";
                if (ESCS_MA_DOI_TAC == "PJICO") {
                    ngay_ht = ho_so_chi_tiet.data_info.ho_so.ngay_ht.dateToNumber();
                    gio_ht = ho_so_chi_tiet.data_info.ho_so.gio_ht.timeToNumber();
                    message = "Ngày giờ giám định không được nhỏ hơn ngày giờ thông báo";
                }
                if (gio_gd.toString().length == 3) {
                    gio_gd = "0" + gio_gd;
                }
                if (gio_ht.toString().length == 3) {
                    gio_ht = "0" + gio_ht;
                }
                var ngay_gio_gd = parseInt(obj.ngay_gd + '' + gio_gd);
                var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
                if (ngay_gio_gd < ngay_gio_ht) {
                    _notifyService.error(message);
                    return;
                }
            }
            _service.capNhatThongTinGD(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var so_id = _frmDienBienTonThat.getControl("so_id").val();
                if (so_id === "") {
                    _notifyService.error("Thông tin hồ sơ tiếp nhận chưa xác định!");
                    return;
                }
                var obj1 = _frmDienBienTonThat.getJsonData();
                obj1.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
                obj1.nv = ho_so_chi_tiet.data_info.ho_so.nv;
                obj1.so_id = so_id;
                obj1.ma = "TEMPLATE_EMAIL_HS_MOI";
                obj1.pm = CONSTANT_PM;
                obj1.gui_email = type == "CHUYEN_VA_GUI_MAIL";

                _service.chuyenBoiThuong(obj1).then(res1 => {
                    if (res1.state_info.status !== "OK") {
                        _notifyService.error(res1.state_info.message_body);
                        return;
                    }
                    _service.layCtHsTiepNhan(obj1).then(res2 => {
                        ho_so_chi_tiet = res2;
                        _frmDiaDiemGD.getControl("link_chup_anh_ht").setValue(res2.data_info.dien_bien[0].link_chup_anh_ht);
                        _frmDiaDiemGD.getControl("link_chup_anh_ct").setValue(res2.data_info.ho_so.link_chup_anh_ct);
                    });
                    anCacNut(true);
                    _notifyService.success("Lưu và chuyển hồ sơ thành công");
                    getPaging(1);
                });
            });
        });
    });
    $('#btnChonHangGPLX').click(function () {
        var target = _modalHangGPLX.target;
        var arrInput = $("#modalHangGPLXDanhSach .modalHangGPLXItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        $(target).val(val);
        _modalHangGPLX.hide();
    });
    $('#btnHuyHoSoTiepNhan').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn hủy hồ sơ tiếp nhận này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                nv: ho_so_chi_tiet.data_info.ho_so.nv
            }
            _service.huyHoSoTiepNhan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layCtHsTiepNhan(obj).then(res1 => {
                    ho_so_chi_tiet = res1;
                    anCacNut(false);
                });
                _notifyService.success("Hủy hồ sơ tiếp nhận thành công");
                getPaging(1);
            });
        });
    });
    $('#btnGoHuyHoSoTiepNhan').click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn gỡ hủy hồ sơ tiếp nhận này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _service.goHuyHoSoTiepNhan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layCtHsTiepNhan(obj).then(res1 => {
                    ho_so_chi_tiet = res1;
                    anCacNut(false);
                });
                _notifyService.success("Gỡ hủy hồ sơ tiếp nhận thành công");
                getPaging(1);
            });
        });
    });
    $("#btnLuuGCN").click(function () {
        if (_frmSuaGCN.isValid()) {
            var formData = _frmSuaGCN.getJsonData();
            var objData = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
                so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
                bien_xe: formData.bien_xe,
                hang_xe: formData.hang_xe,
                hieu_xe: formData.hieu_xe,
                loai_xe: formData.loai_xe,
                md_sd: formData.md_sd,
                nam_sx: formData.nam_sx
            };
            _carClaimCommonService.suaGCNCTCT(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalSuaGCN.hide();
                    var objGetDetail = {
                        ma_doi_tac: objData.ma_doi_tac,
                        so_id: objData.so_id,
                        nv: ho_so_chi_tiet.data_info.ho_so.nv
                    };
                    _service.layCtHsTiepNhan(objGetDetail).then(res1 => {
                        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", res1.data_info);
                    });
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        };
    });
    $("#btnChuyenGDVHT").click(function () {
        bindDataChuyenNguoiXuLyGDVHT(
            "CCCT_CHUYEN_GDVHT",
            ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ho_so_chi_tiet.data_info.ho_so.so_id,
            0
        );
        _modalChuyenNguoiXuLyGDVHT.setTitle("Chuyển GĐV hiện trường");
        _modalChuyenNguoiXuLyGDVHT.show();
    });
    $("#btnLuuChuyenNguoiXuLyGDVHT").click(function () {
        if (!_frmChuyenNguoiXuLyGDVHT.isValid()) {
            return;
        }
        _notifyService.confirm("Bạn có chắc chắn chuyển giám định viên hiện trường này không? ?", "", val => {
            var obj = _frmChuyenNguoiXuLyGDVHT.getJsonData();
            obj.nv = ho_so_chi_tiet.data_info.ho_so.nv;
            _carInvestigationService.chuyenNguoiXuLyGDVHT(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (obj.hanh_dong == "CCCT_CHUYEN_GDVHT") {
                    _notifyService.success("Chuyển GĐV hiện trường thành công");
                }
                _modalChuyenNguoiXuLyGDVHT.hide();
            });
        });
    });
    $("#btnXemDiaBanGiamDinh").click(function () {
        var tinh_thanh = _frmDiaDiemGD.getControl("tinh_thanh").val();
        var quan_huyen = _frmDiaDiemGD.getControl("quan_huyen").val();
        if (tinh_thanh !== null && tinh_thanh !== "") {
            _frmTimKiemGDV.getControl("tinh_thanh").setValue(tinh_thanh);
            var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === tinh_thanh);
            _frmTimKiemGDV.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmTimKiemGDV.getControl("quan_huyen").setValue("");
            if (quan_huyen !== null && quan_huyen !== "") {
                _frmTimKiemGDV.getControl("quan_huyen").setValue(quan_huyen);
            }
            hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
        }
        _modalXemDiaBanGiamDinh.show();
    });
    $("#btnTimKiemGDV").click(function () {
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
    $("#btnChonGDV").click(function () {
        if (gdv_chon === null) {
            _notifyService.error("Bạn chưa chọn giám định viên");
            return;
        }
        _frmDiaDiemGD.getControl("dvi_gdinh").setValue(gdv_chon.ma_chi_nhanh);
        _frmDiaDiemGD.getControl("dvi_gdinh").trigger("select2:select");
        _frmDiaDiemGD.getControl("ma_gdv").setValue(gdv_chon.ma_gdv);
        _modalXemDiaBanGiamDinh.hide();
    });
    //Tìm kiếm
    $("form[name='frmTimKiemHoSo'] input[name='ngay_d'],input[name='ngay_c'],input[name='gcn'],input[name='bien_xe'],input[name='dien_thoai'],input[name='ten_kh']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPaging(1);
        }
    });
    $("#inputTimKiemGara").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPagingGaraSuaChua(1);
        }
    });
});