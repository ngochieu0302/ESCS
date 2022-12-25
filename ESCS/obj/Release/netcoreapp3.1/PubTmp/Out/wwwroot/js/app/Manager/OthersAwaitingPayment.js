//Service
var _service_new = new Service();
var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _service = new OthersAwaitingPaymentService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _viewImagesService = new ViewImagesService();
var _userManagementService = new UserManagementService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _hospitalService = new HospitalService();
var _UploadExcelService = new UploadExcelService();

var objDanhMuc = {};
var dataDetail = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var arrAnhHangMucTonThat = [];
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var objData = null;

var so_hs;
var ten_don_vi_cap;
var ngay_dong_hs;
var ngay_chuyen_tt;
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;

var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");
//Form
var _frmThemCanBoTraoDoi = new FormService("frmThemCanBoTraoDoi");
var _frmTimKiemHoSoChoThanhToan = new FormService("frmTimKiemHoSoChoThanhToan");
var _frmThemHoaDonChungTuBoiThuong = new FormService("frmThemHoaDonChungTuBoiThuong");
var _frmThemNguoiThuHuongBoiThuong = new FormService("frmThemNguoiThuHuongBoiThuong");
var _frmUploadHoaDonDienTu = new FormService("frmUploadHoaDonDienTu");

//Modal
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalThemHoaDonChungTuBoiThuong = new ModalService("modalThemHoaDonChungTuBoiThuong");
var _modalThemNguoiThuHuongBoiThuong = new ModalService("modalThemNguoiThuHuongBoiThuong");
var _modalDonViPhatHanhHoaDonDienTu = new ModalFullScreenService("modalDonViPhatHanhHoaDonDienTu");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_text", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nv_hs_text", title: "Nghiệp vụ hồ sơ", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái HS", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "so_hs", title: "Số hồ sơ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_hs_bt", title: "Số hồ sơ BT", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "15%", headerSort: false },
    { field: "tien", title: "Số tiền", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "tl_thue", title: "Tỷ lệ thuế", width: "8%", hozAlign: "center", headerSort: false },
    { field: "thue", title: "Tiền thuế", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nsd", title: "Cán bộ xử lý", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý bồi thường", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_id", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];

var _gridViewHoSo = new GridViewService("gridViewHoSo", configColumn, getPaging, rowClick);

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    var obj = {
        ma_doi_tac: data.ma_doi_tac,
        so_id: data.so_id,
        nv: data.nv
    }
    _service.layThongTinChiTietHoSo(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet = res.data_info;
        var ho_so = res.data_info.ho_so;
        if (ho_so.ngay_dong < 30000101) {
            $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
            $("#btnDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
        } else {
            $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
            $("#btnDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
        }
        xemToanBoThongTinHoSoBoiThuong(ho_so_chi_tiet);
    });
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiemHoSoChoThanhToan.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 13;
    _service.getPaging(objTimKiem).then(res => {
        _gridViewHoSo.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function showStepToanBoThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinHoSoBoiThuong") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinThanhToanThuHuong").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuong").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuong").find("li:first-child > a").addClass("active");
        showStepThongTinHoSoBoiThuong("tabToanBoThongTinThanhToanThuHuong");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieu").addClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieuActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayTo").find("li:first-child > a").addClass("active");
    }
    return;
}
function showStepThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinLichSuTonThat") {
        $("#tblToanBoThongTinLichSuTonThat").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoThongTinYeuCauBaoHiem") {
        $("#tblToanBoThongTinKhamChuaBenhYCBH").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoYKienCanBo") {
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").readOnly();
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").setValue("NOI_BO");
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoi_template", "tblDanhSachCanBoThamGiaTraoDoi", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoi_template", "tblDanhSachNoiDungTraoDoi", { data: [] });
        $('#tblDanhSachNoiDungTraoDoi').html("");
        trang = 1;
        getPagingNoiDungTraoDoi(trang, () => {
            let div = $('#lichSuTraoDoi').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoi();
    }
    return;
}
function showStepHinhAnhHoSoBoiThuong(step) {
    if (step === "tabToanBoAnhHoSoGiayToTaiLieu") {
        $("#divTableXemToanBoAnhHoSoGiayToTaiLieuTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhGiayToTaiLieuChuaPhanLoai") {
        $("#divTableXemToanBoAnhGiayToTaiLieuCPLTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDong") {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    if (step == "tabToanBoThongTinTaiLieuPDF") {

    }
    return;
}
function xemTabToanBoAnhHoSoBoiThuong(tabId) {
    ESUtil.genHTML("dsToanBoAnh_template", "dsToanBoAnhHoSoGiayToTaiLieu", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnh_template", "dsToanBoAnhGiayToTaiLieuCPL", { danh_sach: [] });
    trang = 1;
    if (tabId === "divTableToanBoAnhHoSoGiayToTaiLieu") {
        $("#navTabToanBoAnhGiayToTaiLieu .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToTaiLieu").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToTaiLieu") {
        $("#navTabAnhGiayToTaiLieu .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhHoSoGiayToTaiLieu").addClass("d-none");
        getPagingListImages(1, "TL", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableToanBoAnhGiayToTaiLieuCPL") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoai .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhGiayToTaiLieuCPL").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhGiayToTaiLieuCPL") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoai .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhGiayToTaiLieuCPL").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
    }
}
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        loai: loai,
        nv: "HSGD"
    }
    obj.trang = trang;
    obj.so_dong = 6;
    _service.layDanhSachAnh(obj).then(res => {
        var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
        var source = res.data_info.data.where(n => ext.includes(n.extension));
        source = _.chain(source).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value })).value();
        var tong_so_dong = res.data_info.tong_so_dong;
        if (tong_so_dong % 6 == 0) {
            trang_max = tong_so_dong / 6;
        } else {
            trang_max = parseInt(tong_so_dong / 6) + 1;
        }
        if (source.length != 0) {
            if (loai === "TL") {
                ESUtil.appendHTML("dsToanBoAnh_template", "dsToanBoAnhHoSoGiayToTaiLieu", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "CHUA_PHAN_LOAI") {
                ESUtil.appendHTML("dsToanBoAnh_template", "dsToanBoAnhGiayToTaiLieuCPL", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
        } else {
            _notifyService.warning("Không có hình ảnh nào !");
            return;
        }
    });
}
function initImageViewerToanBoAnh() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnh');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhChiTietView',
        id: 'modalXemHinhAnhChiTietView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        viewed() {
            this.viewer.zoomTo(0.5);
        }
    };
    var viewer = new Viewer(pictures, options);
}
//---Code xem toàn bộ thông tin hồ sơ---
function xemToanBoThongTinHoSoBoiThuong(ho_so_chi_tiet) {
    so_hs = ho_so_chi_tiet.ho_so.so_hs;
    ten_don_vi_cap = ho_so_chi_tiet.ho_so.ten_cnhanh_cap;
    ngay_chuyen_tt = ho_so_chi_tiet.ho_so.ngay_chuyen_tt;
    ngay_dong_hs = ho_so_chi_tiet.ho_so.ngay_dong_hs;
    $(".soHoSo_xemToanBoThongTinHSBT").html(so_hs);
    $(".donViCapDon_xemToanBoThongTinHSBT").html(ten_don_vi_cap);
    $(".ngayChuyenTToan_xemToanBoThongTinHSBT").html(ngay_chuyen_tt.numberToDate());
    $(".ngayDongHoSo_xemToanBoThongTinHSBT").html(ngay_dong_hs);
    ESUtil.genHTML("tblToanBoThongTinChungHoSo_template", "tblToanBoThongTinChungHoSo", { ho_so: ho_so_chi_tiet.ho_so });
    //ESUtil.genHTML("tblToanBoThongTinHoSoGiayTo_template", "tblToanBoThongTinHoSoGiayTo", { data: ho_so_chi_tiet.ho_so_giay_to });
    loadChungTuThuHuong();
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh: '',
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hdong: '',
        so_id_dtuong: '',
        nv: 'HSGD'
    }
    _service.GetFilesThumnail(obj).then(res => {
        var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
        var arrAnh = res.data_info.where(n => ext.includes(n.extension));
        var arrPDF = res.data_info.where(n => n.extension == ".pdf");
        var arrAnhTL = [];
        var arrAnhCPL = [];
        for (var i = 0; i < arrAnh.length; i++) {
            if (arrAnh[i].loai == "TT") {
                arrAnhTL.push(arrAnh[i]);
            }
            if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                arrAnhCPL.push(arrAnh[i]);
            }
        }
        arrAnhTL = _.chain(arrAnhTL).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value, bt: [], ma_hm: [] })).value();
        arrAnhCPL = _.chain(arrAnhCPL).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value, bt: [], ma_hm: [] })).value();
        for (var i = 0; i < arrAnhTL.length; i++) {
            var data = arrAnhTL[i].data;
            if (data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    arrAnhTL[i].bt.push(data[j].bt);
                    arrAnhTL[i].ma_hm = data.firstOrDefault().ma_file;
                }
            }
        }
        for (var i = 0; i < arrAnhCPL.length; i++) {
            var data = arrAnhCPL[i].data;
            if (data.length > 0) {
                for (var j = 0; j < data.length; j++) {
                    arrAnhCPL[i].bt.push(data[j].bt);
                    arrAnhCPL[i].ma_hm = data.firstOrDefault().ma_file;
                }
            }
        }
        ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToTaiLieu_template", "tblToanBoThongTinAnhHoSoGiayToTaiLieu", { dataAnhGiayToTaiLieu: arrAnhTL });
        ESUtil.genHTML("tblToanBoThongTinAnhGiayToTaiLieuCPL_template", "tblToanBoThongTinAnhGiayToTaiLieuCPL", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
        ESUtil.genHTML("tblToanBoThongTinTaiLieuPDF_template", "tblToanBoThongTinTaiLieuPDF", { dataTaiLieuPDF: arrPDF });
    });
    _modalXemToanBoThongTinHoSo.show();
    showStepToanBoThongTinHoSoBoiThuong("tabToanBoThongTinHoSoBoiThuong");
}
function bindThongTinHoaDonChungTuXemToanBoThongTinHSBT() {
    $(".suaThongTinHoaDonChungTu").click(function () {
        _frmThemHoaDonChungTuBoiThuong.resetForm();
        _frmThemHoaDonChungTuBoiThuong.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        console.log(data);
        _frmThemHoaDonChungTuBoiThuong.setData(data);
        _modalThemHoaDonChungTuBoiThuong.show();
    });
    $(".xoaThongTinHoaDonChungTu").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _service.xoaChungTuBoiThuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    _notifyService.success("Xóa chứng từ thành công.");
                    loadChungTuThuHuong();
                });
            });
        });
    });
}
function bindThongTinNguoiThuHuongXemToanBoThongTinHSBT() {
    $(".suaNguoiThuHuong").click(function () {
        _frmThemNguoiThuHuongBoiThuong.resetForm();
        _frmThemNguoiThuHuongBoiThuong.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmThemNguoiThuHuongBoiThuong.setData(data);
        _frmThemNguoiThuHuongBoiThuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
        _modalThemNguoiThuHuongBoiThuong.show();
    });
    $(".xoaNguoiThuHuong").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _service.xoaThongTinNguoiThuHuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    _notifyService.success("Xóa người thụ hưởng thành công.");
                    loadChungTuThuHuong();
                });
            });
        });
    });
}
function initHoaDonChungTu(res) {
    ESUtil.genHTML("tblToanBoThongTinHoaDonChungTu_template", "tblToanBoThongTinHoaDonChungTu", { data: res.chung_tu }, () => {
        var chung_tu_tong_tien = 0;
        var chung_tu_tong_thue = 0;
        var tong_cong = 0;
        for (var i = 0; i < res.chung_tu.length; i++) {
            chung_tu_tong_tien += parseInt(res.chung_tu[i].tien);
            chung_tu_tong_thue += parseInt(res.chung_tu[i].thue);
            tong_cong += parseInt(res.chung_tu[i].tong_cong);
        }
        $("#tongTienHoaDonChungTu_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(chung_tu_tong_tien));
        $("#tongTienThueHoaDonChungTu_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(chung_tu_tong_thue));
        $("#tongCongTienHoaDonChungTu_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tong_cong));
    });
    bindThongTinHoaDonChungTuXemToanBoThongTinHSBT();
}
function initNguoiThuHuong(res) {
    ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuong_template", "tblToanBoThongTinNguoiThuHuongBoiThuong", { data: res.thu_huong }, () => {
        var thu_huong_tong = 0;
        for (var i = 0; i < res.thu_huong.length; i++) {
            thu_huong_tong += parseInt(res.thu_huong[i].tien);
        }
        $("#tongSoTienThuHuong_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thu_huong_tong));
    });
    bindThongTinNguoiThuHuongXemToanBoThongTinHSBT();
}
function loadChungTuThuHuong() {
    initHoaDonChungTu(ho_so_chi_tiet);
    initNguoiThuHuong(ho_so_chi_tiet);
}
function chungTuTinhTienXemToanBoThongTinHSBT() {
    var so_tien = parseInt(_frmThemHoaDonChungTuBoiThuong.getControl("tien").getValue());
    var tl_thue = parseInt(_frmThemHoaDonChungTuBoiThuong.getControl("tl_thue").getValue());
    var thue = Math.round(so_tien * (tl_thue / 100));
    var tong_cong = so_tien + thue;
    _frmThemHoaDonChungTuBoiThuong.getControl("thue").setValue(ESUtil.formatMoney(thue));
    _frmThemHoaDonChungTuBoiThuong.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function showPopupDocHoaDonDienTu(el) {
    _frmUploadHoaDonDienTu.resetForm();
    _frmUploadHoaDonDienTu.clearErrorMessage();
    $("#fileNameHoaDonDienTu").html("");
    _modalDonViPhatHanhHoaDonDienTu.show();
}
function openXemChiTietTaiLieuPDF(bt) {
    _service.GetFiles({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: bt }).then(res => {
        callBackViewFile(res);
    });
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}

$(document).ready(function () {
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_c").setValue(dateNow);

    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _userManagementService.layDsNSD(),
        _bankListService.layDsNganHang(),
        _userManagementService.layDsCanBoQuyen()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.can_bo = arrRes[2].data_info;
        objDanhMuc.ngan_hang = arrRes[3].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh_ngan_hang = arrRes[3].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.ds_can_bo = arrRes[4].data_info.nsd_quyen_ttbt;

        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiemHoSoChoThanhToan.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmThemHoaDonChungTuBoiThuong.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
        _frmThemNguoiThuHuongBoiThuong.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmThemNguoiThuHuongBoiThuong.getControl("ma_ngan_hang").trigger('select2:select');

        getPaging(1);
    });
    _frmThemHoaDonChungTuBoiThuong.getControl("tl_thue").addEventChange(val => {
        chungTuTinhTienXemToanBoThongTinHSBT();
    });
    _frmThemNguoiThuHuongBoiThuong.getControl("ma_ngan_hang").addEventChange(val => {
        _frmThemNguoiThuHuongBoiThuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    $("#btnLuuThongTinHoaDonChungTuBoiThuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuong.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemHoaDonChungTuBoiThuong.isValid()) {
            _service.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    loadChungTuThuHuong();
                    _frmThemHoaDonChungTuBoiThuong.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu chứng từ thành công");
                });
            });
        }
    });
    $("#btnLuuDongThongTinHoaDonChungTuBoiThuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuong.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemHoaDonChungTuBoiThuong.isValid()) {
            _service.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    loadChungTuThuHuong();
                    _modalThemHoaDonChungTuBoiThuong.hide();
                    _notifyService.success("Lưu chứng từ thành công");
                });
            });
        }
    });
    $("#btnLuuThongTinNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuong.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemNguoiThuHuongBoiThuong.isValid()) {
            data.loai = "TH";
            _service.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    loadChungTuThuHuong();
                    _frmThemNguoiThuHuongBoiThuong.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu thông tin thụ hưởng thành công");
                });
            });
        }
    });
    $("#btnLuuDongThongTinNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuong.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemNguoiThuHuongBoiThuong.isValid()) {
            data.loai = "TH";
            _service.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var data_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: ho_so_chi_tiet.ho_so.nv
                }
                _service.layThongTinChiTietHoSo(data_1).then(resDetail => {
                    ho_so_chi_tiet = resDetail.data_info;
                    loadChungTuThuHuong();
                    _modalThemNguoiThuHuongBoiThuong.hide();
                    _frmThemNguoiThuHuongBoiThuong.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu thông tin thụ hưởng thành công");
                });
            });
        }
    });
    $("#btnDongHoSo_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn đóng hồ sơ này không?", "", val => {
            var data = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                nv: ho_so_chi_tiet.ho_so.nv
            }
            _service.dongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
                $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                _modalXemToanBoThongTinHoSo.hide();
                _notifyService.success("Đóng hồ sơ thành công.");
                getPaging(1);
            });
        });
    });
    $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn hủy đóng hồ sơ này không?", "", val => {
            var data = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                nv: ho_so_chi_tiet.ho_so.nv
            }
            _service.huyDongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").addEventChange("d-none");
                _notifyService.success("Hủy đóng hồ sơ bồi thường thành công.");
                _modalXemToanBoThongTinHoSo.hide();
                getPaging(1);
            });
        });
    });
    $("#btnThemHoaDonChungTu_xemToanBoThongTinHSBT").click(function () {
        _frmThemHoaDonChungTuBoiThuong.resetForm();
        _frmThemHoaDonChungTuBoiThuong.clearErrorMessage();
        _modalThemHoaDonChungTuBoiThuong.show();
    });
    $("#btnThemNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        _frmThemNguoiThuHuongBoiThuong.resetForm();
        _frmThemNguoiThuHuongBoiThuong.clearErrorMessage();
        _modalThemNguoiThuHuongBoiThuong.show();
    });
    //Đọc hóa đơn 
    $('#modalDonViPhatHanhHoaDonDienTu_btnChonFileHoaDonDT').click(function () {
        if (!_frmUploadHoaDonDienTu.isValid()) {
            return;
        }
        $("#fileHoaDonDienTu").trigger("click");
    });
    $("#fileHoaDonDienTu").change(function () {
        var i = $(this).prev('label').clone();
        var file = $("#fileHoaDonDienTu")[0].files[0].name;
        $(this).prev('label').text(file);
    });
    $('#modalDonViPhatHanhHoaDonDienTu_btnDocFileHoaDonDT').click(function () {
        if (_frmUploadHoaDonDienTu.isValid()) {
            _frmThemHoaDonChungTuBoiThuong.resetForm();
            _frmThemHoaDonChungTuBoiThuong.clearErrorMessage();
            var formData = _frmUploadHoaDonDienTu.getFormFileData();
            formData.append("ma_doi_tac", ho_so_chi_tiet.ho_so.ma_doi_tac);
            formData.append("so_id", ho_so_chi_tiet.ho_so.so_id);
            _common.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDonDienTu.hide();
                    $('#btnThemHoaDonChungTu_xemToanBoThongTinHSBT').trigger('click');
                    var obj = {
                        so_id: ho_so_chi_tiet.ho_so.so_id,
                        dvi_phat_hanh: _frmUploadHoaDonDienTu.getControl('dvi_ph').getValue(),
                        ten_dvi_phat_hanh: res.sellerLegalName,
                        mst_dvi_phat_hanh: res.sellerTaxCode,
                        dchi_dvi_phat_hanh: res.sellerAddressLine,
                        ngay_ct: res.invoiceIssuedDate,
                        mau_hdon: res.invoiceSeries,
                        ky_hieu_hdon: res.templateCode,
                        so_hdon: res.invoiceNumber,
                        dien_giai: '',
                        tien: res.totalAmountWithoutVAT,
                        tl_thue: res.vatPercentage,
                        thue: res.totalVATAmount,
                        tong_cong: res.totalAmountWithVAT,
                        ten_dvi_nhan: res.buyerLegalName,
                        mst_dvi_nhan: res.buyerTaxCode,
                        dchi_dvi_nhan: res.buyerAddressLine,
                        website_tra_cuu: '',
                        ma_tra_cuu: ''
                    }
                    obj.tl_thue = obj.tl_thue.replace('%', '');
                    _frmThemHoaDonChungTuBoiThuong.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmThemHoaDonChungTuBoiThuong.setData(obj);
                }
            });
        }
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    
    getPaging(1);
});
