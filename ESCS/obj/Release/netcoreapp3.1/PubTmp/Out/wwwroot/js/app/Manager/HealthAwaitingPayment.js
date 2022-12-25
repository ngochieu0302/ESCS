//Service
var _service_new = new Service();
var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _service = new HealthAwaitingPaymentService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _healthCompensationService = new HealthCompensationService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _viewImagesService = new ViewImagesService();
var _userManagementService = new UserManagementService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _hospitalService = new HospitalService();
var _UploadExcelService = new UploadExcelService();
var _modalDocumentService = new ModalDocumentService();

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
var dsHoSoChoDong = [];
var dsHoSoDeNghiDong = [];

var so_hs;
var ten_don_vi_cap;
var ngay_dong_hs;
var ngay_chuyen_tt;
var thong_tin_toan_bo_ho_so = {};
var arrAnhHangMucHoaDon = [];
var arrDuLieuHoaDon = [];
var arrThongTinOCRHoaDon = [];
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;

var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");
//Form
var _frmThemCanBoTraoDoiConNguoi = new FormService("frmThemCanBoTraoDoiConNguoi");
var _frmThemNoiDungTraoDoiConNguoi = new FormService("frmThemNoiDungTraoDoiConNguoi");
var _frmTimKiemHoSoChoThanhToan = new FormService("frmTimKiemHoSoChoThanhToan");
var _frmThemNguoiThuHuongBoiThuongConNguoi = new FormService("frmThemNguoiThuHuongBoiThuongConNguoi");
var _frmThemHoaDonChungTuBoiThuongConNguoi = new FormService("frmThemHoaDonChungTuBoiThuongConNguoi");
var _frmUploadHoaDonDienTu = new FormService("frmUploadHoaDonDienTu");
var _frmNhomChatTraoDoi = new FormService("frmNhomChatTraoDoi");
var _frmOCRHoaDonChungTu = new FormService("frmOCRHoaDonChungTu");
var _frmSearchLanTiepNhanDongHS = new FormService("frmSearchLanTiepNhanDongHS");
var _frmSearchHoSoChoDong = new FormService("frmSearchHoSoChoDong");
var _frmDetailLanTiepNhanDongHoSo = new FormService("frmDetailLanTiepNhanDongHoSo");
//Modal
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalXemHinhAnhChiTiet = new ModalFullScreenService("modalXemHinhAnhChiTiet", "");
var _modalThemCanBoTraoDoiConNguoi = new ModalService("modalThemCanBoTraoDoiConNguoi");
var _modalThemHoaDonChungTuBoiThuongConNguoi = new ModalService("modalThemHoaDonChungTuBoiThuongConNguoi");
var _modalThemNguoiThuHuongBoiThuongConNguoi = new ModalService("modalThemNguoiThuHuongBoiThuongConNguoi");
var _modalOCRHoaDonChungTu = new ModalFullScreenService("modalOCRHoaDonChungTu", "");
var _modalXemHinhAnhHoaDonCTiet = new ModalFullScreenService("modalXemHinhAnhHoaDonCTiet", "");
var _modalXemHinhAnhHangMucTonThat = new ModalFullScreenService("modalXemHinhAnhHangMucTonThat", "");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalDonViPhatHanhHoaDonDienTu = new ModalFullScreenService("modalDonViPhatHanhHoaDonDienTu");
var _popoverGhiChuLSTT = new PopoverService("popoverGhiChuLSTT");
var _popoverNguyenNhanGiamTru = new PopoverService("popoverNguyenNhanGiamTru");
var _modalDsLanTiepNhanDongHoSo = new ModalService("modalDsLanTiepNhanDongHoSo");
var _modalAddHoSoChoDong = new ModalService("modalAddHoSoChoDong");
var _modalCanBo = new ModalDragService("modalCanBo", undefined, "bottom");

var configColumn = [
    { field: "kh_vip", title: "*", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nguon_tb", title: "Nguồn", width: "5%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái HS", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "so_hs", title: "Số hồ sơ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "Cán bộ bồi thường", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên người được bảo hiểm", width: "15%", headerSort: false },
    { field: "so_tien_yc", title: "Số tiền yc", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "so_tien_duyet", title: "Số tiền duyệt", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nsd_tn", title: "Cán bộ tiếp nhận", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nsd_blvp", title: "Cán bộ bảo lãnh", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý bồi thường", width: "15%", hozAlign: "center", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "12%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số Hợp đồng", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nhom_sp", title: "Sản phẩm", width: "12%", hozAlign: "center", headerSort: false },
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
    _service.layThongTinChiTietHoSo(data).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet = res.data_info;
        var ho_so = res.data_info.ho_so;
        if (ho_so.ngay_duyet_bt < 30000101) {
            $("#btnHuyDongHoSoConNguoi_xemToanBoThongTinHSBT").removeClass("d-none");
            $("#btnDongHoSoConNguoi_xemToanBoThongTinHSBT").addClass("d-none");
        } else {
            $("#btnHuyDongHoSoConNguoi_xemToanBoThongTinHSBT").addClass("d-none");
            $("#btnDongHoSoConNguoi_xemToanBoThongTinHSBT").removeClass("d-none");
        }
        anHienTabXemToanBoThongTinHoSoBoiThuong("NG");
        xemToanBoThongTinHoSoBoiThuong(ho_so.ma_doi_tac, ho_so.ma_chi_nhanh_ql, ho_so.ma_chi_nhanh, ho_so.so_id, ho_so.so_id_hd, ho_so.so_id_dt);
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
//---Code xem toàn bộ thông tin hồ sơ---
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh_ql, ma_chi_nhanh, so_id, so_id_hd, so_id_dt) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_chi_nhanh_ql: ma_chi_nhanh_ql,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id: so_id,
        so_id_hd: so_id_hd,
        so_id_dt: so_id_dt,
        pm: 'TINH_TOAN'
    }
    _service.base.all([
        _healthClaimCommonService.layToanBoThongTinHoSo(obj),
        _healthClaimCommonService.layDanhSachFile(obj)
    ]).then(arrRes => {
        var resHoSo = arrRes[0];
        var resHinhAnh = arrRes[1];
        if (resHoSo.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        //Thông tin hồ sơ
        $(".soHoSo_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.so_hs);
        $(".soHoSoConNguoi_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.so_hs);
        $(".donViCapDonConNguoi_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.ten_cnhanh_cap);
        $(".ngayChuyenTToanConNguoi_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.ngay_chuyen_tt.numberToDate());
        $(".ngayDongHoSoConNguoi_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.ngay_dong_hs);

        thong_tin_toan_bo_ho_so.lan_kham = resHoSo.data_info.lan_kham;
        thong_tin_toan_bo_ho_so.lan_kham_qloi = resHoSo.data_info.lan_kham_qloi;
        ESUtil.genHTML("tblToanBoThongTinChungHoSoConNguoi_template", "tblToanBoThongTinChungHoSoConNguoi", { ho_so: resHoSo.data_info.ho_so });
        ESUtil.genHTML("tblToanBoThongTinGiayChungNhanConNguoi_template", "tblToanBoThongTinGiayChungNhanConNguoi", { gcn: resHoSo.data_info.gcn.firstOrDefault() });
        ESUtil.genHTML("tblToanBoThongTinChiTietGiayChungNhanConNguoi_template", "tblToanBoThongTinChiTietGiayChungNhanConNguoi", { data: resHoSo.data_info.gcn_ql });
        ESUtil.genHTML("tblToanBoThongTinHoSoGiayToConNguoi_template", "tblToanBoThongTinHoSoGiayToConNguoi", { data: resHoSo.data_info.ho_so_giay_to });
        ESUtil.genHTML("tblToanBoThongTinKhamChuaBenhYCBHConNguoi_template", "tblToanBoThongTinKhamChuaBenhYCBHConNguoi", { data: resHoSo.data_info.lan_kham });
        ESUtil.genHTML("tblToanBoThongTinLichSuTonThatConNguoi_template", "tblToanBoThongTinLichSuTonThatConNguoi", { arrHoSo: resHoSo.data_info.lich_su_ton_that, arrHoSoQloi: resHoSo.data_info.lich_su_ton_that_qloi }, () => {
            var tong_yc = 0, tong_duyet = 0;
            $.each(resHoSo.data_info.lich_su_ton_that, (index, item) => {
                tong_yc += parseFloat(item.so_tien_yc);
                tong_duyet += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCau_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_yc));
            $('#tongTienDuyet_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_duyet));
        });
        ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi_template", "tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi", { data: resHoSo.data_info.qua_trinh_xly });
        loadChungTuThuHuong();
        //Hình ảnh
        var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
        var arrAnh = resHinhAnh.data_info.where(n => ext.includes(n.extension));
        var arrPDF = resHinhAnh.data_info.where(n => n.extension == ".pdf");
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
        ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi_template", "tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi", { dataAnhGiayToTaiLieu: arrAnhTL });
        ESUtil.genHTML("tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi_template", "tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
        ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFConNguoi_template", "tblToanBoThongTinTaiLieuPDFConNguoi", { dataTaiLieuPDF: arrPDF });
        //Mẫu in
        var sourceMauIn = [
            { ma: "ESCS_YCTTBH", ten: "Giấy yêu cầu trả tiền bảo hiểm" },
            { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
            { ma: "ESCS_TT_DXBT", ten: "Tờ trình đề xuất phương án trả tiền bảo hiểm" },
            { ma: "ESCS_TT_DXBT_QL_KHAC", ten: "Thông báo phê duyệt đề xuất trả tiền bảo hiểm" },
            { ma: "ESCS_NG_TO_TRINH_TU_CHOI_BH", ten: "Tờ trình từ chối chi trả tiền bảo hiểm" },
            { ma: "ESCS_TBTCTTBH", ten: "Thông báo phê duyệt từ chối chi trả tiền bảo hiểm" },
            { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
            { ma: "ESCS_NG_TO_TRINH_DUYET_BAO_LANH", ten: "Thông báo trình bảo lãnh viện phí" },
            { ma: "ESCS_TB_GYCXNBL_QL_KHAC", ten: "Giấy yêu cầu kiêm xác nhận bảo lãnh" },
            { ma: "ESCS_NG_TRINH_TU_CHOI_BLVP", ten: "Tờ trình từ chối bảo lãnh viện phí" },
            { ma: "ESCS_TB_TU_CHOI_BLVP", ten: "Thông báo từ chối bảo lãnh viện phí" },
            { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" }
        ];
        ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnConNguoi", { dataTaiLieuIn: sourceMauIn });
    });
    _modalXemToanBoThongTinHoSo.show();
    showStepToanBoThongTinHoSoBoiThuong("tabToanBoThongTinHoSoBoiThuong");
}
function anHienTabXemToanBoThongTinHoSoBoiThuong(nv) {
    if (nv === "NG") {
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
        $("#navToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');

        $("#navToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
        $("#navToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
    }
}
function showStepToanBoThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinHoSoBoiThuong") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinThanhToanThuHuongConNguoi").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("li:first-child > a").addClass("active");
        showStepThongTinHoSoBoiThuong("tabToanBoThongTinHoaDonChungTuXe");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoiActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayToConNguoi").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayToConNguoi").find("li:first-child > a").addClass("active");
    }
    return;
}
function showStepThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinLichSuTonThatConNguoi") {
        $("#tblToanBoThongTinLichSuTonThatConNguoi").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoThongTinYeuCauBaoHiemConNguoi") {
        $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoYKienCanBoConNguoi") {
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").readOnly();
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").setValue("NOI_BO");
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoiConNguoi_template", "tblDanhSachCanBoThamGiaTraoDoiConNguoi", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoiConNguoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiConNguoi').html("");
        trang = 1;
        getPagingNoiDungTraoDoiConNguoi(trang, () => {
            let div = $('#lichSuTraoDoiConNguoi').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoiConNguoi();
    }
    return;
}
function showStepHinhAnhHoSoBoiThuong(step) {
    if (step === "tabToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi") {
        $("#divTableXemToanBoAnhGiayToTaiLieuCPLConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongConNguoi") {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    return;
}
function xemTabToanBoAnhHoSoBoiThuong(tabId) {
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: [] });
    trang = 1;
    if (tabId === "divTableToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabAnhGiayToTaiLieu .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
        getPagingListImages(1, "TL", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
    }
}
function xemChiTietLanKhamChuaBenh(lan) {
    $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi tr.active_row").removeClass("active_row");
    var lan_kham = thong_tin_toan_bo_ho_so.lan_kham.where(n => n.lan == lan).firstOrDefault();
    ESUtil.genHTML("tblToanBoThongTinYeuCauBaoHiemConNguoi_template", "tblToanBoThongTinYeuCauBaoHiemConNguoi", { data: [] });
    if (lan_kham != null) {
        $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi tr#lan_kham_" + lan).addClass("active_row");
        var qloi = thong_tin_toan_bo_ho_so.lan_kham_qloi.where(n => n.lan == lan);
        ESUtil.genHTML("tblToanBoThongTinYeuCauBaoHiemConNguoi_template", "tblToanBoThongTinYeuCauBaoHiemConNguoi", { data: qloi }, () => {
            var tongSoTienYeuCauBaoHiemConNguoi = 0;
            var tongSoTienGiamTruBaoHiemConNguoi = 0;
            var tongSoTienDuyetBaoHiemConNguoi = 0;
            if (qloi != null && qloi.length > 0) {
                for (var i = 0; i < qloi.length; i++) {
                    tongSoTienYeuCauBaoHiemConNguoi += parseInt(qloi[i].tien_yc);
                    tongSoTienGiamTruBaoHiemConNguoi += parseInt(qloi[i].tong_tien_giam);
                    tongSoTienDuyetBaoHiemConNguoi += parseInt(qloi[i].tien_duyet);
                }
            }
            $('#tongSoTienYeuCauBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienYeuCauBaoHiemConNguoi));
            $('#tongSoTienGiamTruBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienGiamTruBaoHiemConNguoi));
            $('#tongSoTienDuyetBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienDuyetBaoHiemConNguoi));
        });
    }
}
function showGhiChuLSTTToanBoThongTin(el) {
    _popoverGhiChuLSTT.options = { placement: "left" };
    $("#divGhiChu_NoiDungLSTT").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDungLSTT").val(val);
    _popoverGhiChuLSTT.showWithPosition(el);
}
function xemToanBoHinhAnhHoSoBoiThuong(loai, hang_muc) {
    var data = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: 'NG',
        hang_muc: hang_muc,
        loai: loai
    }
    window.open("/ViewImages?so_id=" + data.so_id + "&nv=" + data.nv + "&hm=" + data.hang_muc + "&loai=" + data.loai, '_blank');
}
function initImageViewerToanBoAnh() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhConNguoi');
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
function xemChiTietHinhAnhHoSo(el) {
    _modalXemHinhAnhChiTiet.show();
}
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        loai: loai,
        nv: "NG"
    }
    obj.trang = trang;
    obj.so_dong = 6;
    _healthClaimCommonService.layDanhSachAnh(obj).then(res => {
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
                ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "CHUA_PHAN_LOAI") {
                ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: source }, () => {
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
function bindImagesToanBoAnhHoSo(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [] }));

    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
            });
        }
    });
    return result;
}
function bindImagesAnhThumnailHopDong(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [], extension: [] }));

    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
                if (!(item.extension.includes(item1.extension))) {
                    item.extension.push(item1.extension);
                }
            });
        }
    });
    return result;
}
function bindImagesHangMucTonThat(arrAnh) {
    $("#dsHinhAnhHangMucTonThat").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, children: value }));

    return result;
}
function dowloadHinhAnhHoSo(arrAnh) {
    var arrAnhDowLoad = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhDowLoad.length; i++) {
        arr.push(arrAnhDowLoad[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        if (mergedArr.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (mergedArr.length === 1) {
            _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: mergedArr[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension);
                }
                if (extension === ".pdf") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/pdf");
                }
                if (extension === ".xlsx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
                if (extension === ".xls") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.ms-excel");
                }
                if (extension === ".doc") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/msword");
                }
                if (extension === ".docx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                }
            });
        } else {
            _healthClaimCommonService.taiFileAnhTonThatZip({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: mergedArr }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    } else {
        _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
        return;
    }
}
function printHinhAnhHoSo(arrAnh) {
    var arrAnhPrinted = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhPrinted.length; i++) {
        arr.push(arrAnhPrinted[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        _commonService.InHoaDon({
            ma_mau_in: "BT_IN_ANH_HOA_DON",
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            bt: mergedArr

        }, "#modalDocumentContents").then(res => {
            _modalPreviewFileService.viewFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf");
        });
    } else {
        _notifyService.error("Vui lòng chọn tài liệu cần in");
        return;
    }
}
function getImagesHinhAnhHoSo(name) {
    var arrAnh = [];
    $("input:checkbox[name='" + name + "']:checked").each(function () {
        arrAnh.push($(this).val());
    });
    return arrAnh;
}
function onChonTai(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkTaiAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkTaiAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonIn(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkInAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkInAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonXem(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkXemAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkXemAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
//---Hình ảnh---
function getToanBoAnhThumnailHopDong(obj, callback = undefined) {
    _healthClaimCommonService.layDanhSachFile({
        ma_doi_tac: obj.ma_doi_tac,
        ma_chi_nhanh: obj.ma_chi_nhanh_ql,
        so_id: obj.so_id,
        so_id_dt: obj.so_id_dt,
        pm: obj.pm
    }).then(res => {
        var arrAnh = res.data_info;
        var arrAnhTL = [];
        var arrAnhCPL = [];
        for (var i = 0; i < arrAnh.length; i++) {
            if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                arrAnhCPL.push(arrAnh[i]);
            }
            if (arrAnh[i].loai == "TT") {
                arrAnhTL.push(arrAnh[i]);
            }
        }
        var arrAnhPDF = arrAnhTL.where(n => n.extension == ".pdf");
        arrAnhTL = bindImagesAnhThumnailHopDong(arrAnhTL);
        arrAnhPDF = bindImagesAnhThumnailHopDong(arrAnhPDF);
        var arr = arrAnhTL.concat(arrAnhPDF);
        ESUtil.genHTML("tblToanBoThongTinTaiLieuHopDongConNguoi_template", "tblToanBoThongTinTaiLieuHopDongConNguoi", { dataTaiLieuHD: arr });
        if (callback) {
            callback(res);
        }
    });
}
function openXemChiTietTaiLieuHopDong(val, bt, extension) {
    if (extension == '.pdf') {
        _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so_chi_tiet.ho_so.so_id_hd, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        _healthClaimCommonService.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
            pm: "BH"
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                $('#input_imagesHangMucTonThat').val(val);
                $("#input_imagesHangMucTonThat").trigger('keyup');
            }
            initImageViewerHangMucTonThat();
            _modalXemHinhAnhHangMucTonThat.show();
        });
    }
}
function openXemChiTietTaiLieuPDF(bt) {
    _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: bt }).then(res => {
        callBackViewFile(res);
    });
}
function initImageViewerToanBoAnhConNguoi() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhConNguoi');
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
function initImageViewerHangMucTonThat() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-images-hang-muc');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'images-hang-muc-container',
        id: 'images-hang-muc-container',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function openXemHinhAnhHangMucTonThat(nv, val) {
    if (nv == 'NG') {
        _healthClaimCommonService.layDanhSachFile({
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
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                $('#input_imagesHangMucTonThat').val(val);
                $("#input_imagesHangMucTonThat").trigger('keyup');
            }
            initImageViewerHangMucTonThat();
        });
        _modalXemHinhAnhHangMucTonThat.show();
    }
}
function openXemChiTietMauIn(ma_mau_in) {
    _modalDocumentService.onClickIem = function (ma_mau_in) {
        _commonService.InPdf({
            ma_mau_in: ma_mau_in,
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt
        }, "#modalDocumentContents").then(response => {
            _modalDocumentService.viewFile(response);
        });
    }
    _modalDocumentService.show(ma_mau_in);
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
function showNguyenNhanGiamTru(el) {
    _popoverNguyenNhanGiamTru.options = { placement: "left" };
    $("#divNguyenNhanGiamTru").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divNguyenNhanGiamTru").val(val);
    _popoverNguyenNhanGiamTru.showWithPosition(el);
}
function showGhiChuLSTT(el) {
    _popoverGhiChuLSTT.options = { placement: "left" };
    $("#divGhiChu_NoiDungLSTT").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDungLSTT").val(val);
    _popoverGhiChuLSTT.showWithPosition(el);
}
//---Trao đổi ý kiến---
function getPagingNoiDungTraoDoiConNguoi(trang, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: "NG"
    }
    obj.trang = trang;
    obj.so_dong = 7;
    _healthClaimCommonService.lietKeNoiDungTraoDoi(obj).then(res => {
        var data = res.data_info.data;
        var tong_so_dong = res.out_value.tong_so_dong;
        if (tong_so_dong % 7 == 0) {
            trang_max_nd = tong_so_dong / 7;
        } else {
            trang_max_nd = parseInt(tong_so_dong / 7) + 1;
        }
        if (data.length != 0) {
            data = data.reverse();
            ESUtil.prependHTML("tblDanhSachNoiDungTraoDoiConNguoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: data }, () => {
                if (callback) {
                    callback();
                }
            });
            $(".chat-num-messages").html("(" + tong_so_dong + " tin nhắn)");
        }
    });
}
function xoaNguoiThamGiaTraoDoiConNguoi(so_id, nv, ma_nsd) {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa cán bộ này khỏi danh sách cán bộ trao đổi này không?", "", () => {
        var obj = {
            so_id: so_id,
            nv: nv,
            ma_nsd: ma_nsd
        }
        _healthClaimCommonService.xoaCanBoTraoDoi(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin thành công");
            getPagingDanhSachCanBoTraoDoiConNguoi();
        });
    });
}
function getPagingDanhSachCanBoTraoDoiConNguoi() {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: "NG"
    }
    _healthClaimCommonService.lietKeDanhSachCanBoTraoDoi(obj).then(res => {
        var data = res.data_info;
        var so_nguoi_tg = data.length;
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoiConNguoi_template", "tblDanhSachCanBoThamGiaTraoDoiConNguoi", { data: data });
        $("#soNguoiThamGiaTraoDoiConNguoi").html("(Có " + so_nguoi_tg + " cán bộ)")
    });
}
function bindDataCanBoTraoDoiConNguoi(ma_doi_tac, so_id) {
    _frmThemCanBoTraoDoiConNguoi.getControl("so_id").val(so_id);
    _frmThemCanBoTraoDoiConNguoi.getControl("nv").val('NG');
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").setValue("");
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}
//Hóa đơn chứng từ
function bindThongTinNguoiThuHuongXemToanBoThongTinHSBT() {
    $(".suaNguoiThuHuongConNguoi").click(function () {
        _frmThemNguoiThuHuongBoiThuongConNguoi.resetForm();
        _frmThemNguoiThuHuongBoiThuongConNguoi.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmThemNguoiThuHuongBoiThuongConNguoi.setData(data);
        _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
        _modalThemNguoiThuHuongBoiThuongConNguoi.show();
    });
    $(".xoaNguoiThuHuongConNguoi").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _healthCompensationService.xoaThongTinNguoiThuHuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xóa người thụ hưởng thành công.");
                loadChungTuThuHuong();
            });
        });
    });
}
function bindThongTinHoaDonChungTuXemToanBoThongTinHSBT() {
    $(".suaThongTinHoaDonChungTuConNguoi").click(function () {
        _frmThemHoaDonChungTuBoiThuongConNguoi.resetForm();
        _frmThemHoaDonChungTuBoiThuongConNguoi.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmThemHoaDonChungTuBoiThuongConNguoi.setData(data);
        _modalThemHoaDonChungTuBoiThuongConNguoi.show();
    });
    $(".xoaThongTinHoaDonChungTuConNguoi").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _healthCompensationService.xoaChungTuBoiThuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xóa người thụ hưởng thành công.");
                loadChungTuThuHuong();
            });
        });
    });
}
function chungTuTinhTienXemToanBoThongTinHSBT() {
    var so_tien = parseInt(_frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tien").getValue());
    var thue = _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("thue").val();
    if (thue == '' || thue == undefined || thue == null) {
        thue = 0;
    } else {
        thue = parseInt(thue.replace(/[^0-9]+/g, ''));
    }
    var tong_cong = so_tien + thue;
    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function initHoaDonChungTu(res) {
    ESUtil.genHTML("tblToanBoThongTinHoaDonChungTuConNguoi_template", "tblToanBoThongTinHoaDonChungTuConNguoi", { data: res.data_info.chung_tu }, () => {
        var chung_tu_tong_tien = 0;
        var chung_tu_tong_thue = 0;
        var tong_cong = 0;
        for (var i = 0; i < res.data_info.chung_tu.length; i++) {
            chung_tu_tong_tien += parseInt(res.data_info.chung_tu[i].tien);
            chung_tu_tong_thue += parseInt(res.data_info.chung_tu[i].thue);
            tong_cong += parseInt(res.data_info.chung_tu[i].tong_cong);
        }
        $("#tongTienHoaDonChungTuConNguoi_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(chung_tu_tong_tien));
        $("#tongTienThueHoaDonChungTuConNguoi_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(chung_tu_tong_thue));
        $("#tongCongTienHoaDonChungTuConNguoi_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tong_cong));
    });
    bindThongTinHoaDonChungTuXemToanBoThongTinHSBT();
}
function initNguoiThuHuong(res) {
    ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi_template", "tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi", { data: res.data_info.thu_huong }, () => {
        var thu_huong_tong = 0;
        for (var i = 0; i < res.data_info.thu_huong.length; i++) {
            thu_huong_tong += parseInt(res.data_info.thu_huong[i].tien);
        }
        $("#tongSoTienThuHuongConNguoi_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thu_huong_tong));
    });
    bindThongTinNguoiThuHuongXemToanBoThongTinHSBT();
}
function loadChungTuThuHuong() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id
    };
    _healthCompensationService.layChungTuBoiThuong(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        initHoaDonChungTu(res);
        initNguoiThuHuong(res);
        _service.layThongTinChiTietHoSo(data).then(resDetail => {
            ho_so_chi_tiet = resDetail.data_info;
        });
    });
}
function unique_arr(arr) {
    var newArr = []
    newArr = arr.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item)
    })
    return newArr;
}
function showPopupDocHoaDonDienTuConNguoi(el) {
    _frmUploadHoaDonDienTu.resetForm();
    _frmUploadHoaDonDienTu.clearErrorMessage();
    $("#fileNameHoaDonDienTu").html("");
    _modalDonViPhatHanhHoaDonDienTu.show();
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
//Đọc OCR hóa đơn
function bindImagesTab1(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    return result;
}
function getImageHoaDonOCRSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_hoa_don_ocr']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function getHangMucAnhHoaDon() {
    var arrVal = [];
    $("input:checkbox[name='ds_hoa_don_ocr']:checked").each(function () {
        arrVal.push($(this).attr("data-ma-file"));
    });
    return arrVal;
}
function loadThongTinOCRHoaDonChungTu(obj, callback = undefined) {
    var arrVal = getImageHoaDonOCRSelect();
    var arrHangMuc = getHangMucAnhHoaDon();
    _service.soSanhOCRHoaDon(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var chung_tu = res.data_info.chung_tu;
        arrDuLieuHoaDon = res.data_info.data;
        if (arrDuLieuHoaDon.length <= 0) {
            _notifyService.error("Chưa có dữ liệu OCR hóa đơn");
            return;
        }
        var arrHD = [];
        if (chung_tu.length > 0) {
            for (var i = 0; i < chung_tu.length; i++) {
                arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
            }
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
        }
        else {
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", "");
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
        }
        _frmOCRHoaDonChungTu.getControl("bt").setValue(arrVal.firstOrDefault());
        _frmOCRHoaDonChungTu.getControl("hang_muc").setValue(arrHangMuc.firstOrDefault());
        $("#hoa_don_item_tat_ca").prop("checked", true);
        $("#hoa_don_item_tat_ca").trigger("change");
    });
}
function layDuLieuOCRHoaDonChungTu() {
    var otArr = [];
    $("#modalCompareDataOCRHoaDonChungTu tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).val();
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onChonHoaDonOCR(el, val) {
    var count_item = $(".hoa_don_item").length;
    var count_checked = $(".hoa_don_item:checked").length;
    $("#hoa_don_item_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#hoa_don_item_tat_ca").prop("checked", true);
    var data = layDuLieuOCRHoaDonChungTu();
    var hs = data.where(n => n.ma_nd == val).firstOrDefault();
    var count = arrThongTinOCRHoaDon.where(n => n.ma_nd == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrThongTinOCRHoaDon.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.ma_nd == val);
    }
}
function onChonHoaDonTatCaOCR(el) {
    arrThongTinOCRHoaDon = [];
    var checked = $(el).is(":checked");
    $(".hoa_don_item").prop("checked", checked);
    var data = layDuLieuOCRHoaDonChungTu();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.ma_nd == data[i].ma_nd).firstOrDefault();
            var count = arrThongTinOCRHoaDon.where(n => n.ma_nd == data[i].ma_nd).length;
            if (checked && count <= 0) {
                arrThongTinOCRHoaDon.push(hs);
            }
            if (!checked && count > 0) {
                arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.ma_nd == data[i].ma_nd);
            }
        }
    }
}
function sdOCRHoaDon(el) {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nhom: 'INVOICE',
        arr: arrThongTinOCRHoaDon,
        hang_muc: _frmOCRHoaDonChungTu.getControl("hang_muc").val(),
        bt: _frmOCRHoaDonChungTu.getControl("bt").val(),
        bt_hoa_don: _frmOCRHoaDonChungTu.getControl("hoa_don").val()
    };
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hóa đơn chứng từ ?", "", () => {
        _healthClaimCommonService.capNhatThongTinOCRConNguoi(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Cập nhật dữ liệu thành công");
            $("#hoa_don_item_tat_ca").prop("checked", false);
            if (obj.nhom == "INVOICE") {
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                    ho_so_chi_tiet = res;
                    var chung_tu = ho_so_chi_tiet.data_info.chung_tu;
                    var arrHD = [];
                    if (chung_tu.length > 0) {
                        for (var i = 0; i < chung_tu.length; i++) {
                            arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
                        }
                        _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
                        _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
                    }
                });
            }
            loadChungTuThuHuong();
        });
    });
};
function layChiTietHoaDonChungTu(ma_doi_tac, so_id, ma_file, bt) {
    $(".images-ocr").prop("checked", false);
    $("#img_" + so_id + '_' + bt).prop("checked", true);
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        nv: 'NG',
        hang_muc: ma_file,
        bt: bt.split(",")
    }
    loadThongTinOCRHoaDonChungTu(obj);
}
function initImageViewerHangMucCTiet() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-hoadon');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-hang-muc-hoadon',
        id: 'img-hang-muc-hoadon',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function bindImagesCategoryDetail(arrAnh) {
    $("#dsHinhAnhHangMucHoaDonCTiet").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    return result;
}
function openModalXemHinhAnhHoaDonCTiet(val, bt, extension) {
    if (extension == ".pdf") {
        _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        $('.inputSearchHangMucHoaDon').val('');
        _healthClaimCommonService.layDanhSachFile({
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
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucHoaDon = bindImagesCategoryDetail(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucHoaDonTemplate", "dsHinhAnhHangMucHoaDonCTiet", { danh_sach: arrAnhHangMucHoaDon });
                $('.inputSearchHangMucHoaDon').val(val);
                $(".inputSearchHangMucHoaDon").trigger('keyup');
            }
            initImageViewerHangMucCTiet();
            _modalXemHinhAnhHoaDonCTiet.show();
        });
    }
}
function cauHinhAnHienNut(man_hinh) {
    $('#btnQuaylaiTab2').hide();
    $('#btnQuaylaiTab3').hide();
    $('#btnThemMoiLanTiepNhanDongHoSo').hide();
    $('#btnTiepTheoLanTiepNhanDongHS').hide();
    $('#btnThemHoSoLanTiepNhanDongHS').hide();
    $('#btnLuuLanTiepNhanDongHS').hide();
    $('#btnXoaLanTiepNhanDongHS').hide();
    $('#btnDongLanTiepNhanDongHS').hide();
    $('#btnHuyDongLanTiepNhanDongHS').hide();
    $('#btnXuatBaoCaoLanTiepNhanDongHS').hide();
    $('#modalAddLanTiepNhanHoSo').hide();
    $('#modalListLanTiepNhanHoSo').hide();
    $('#modalChiTietLanTiepNhanHoSo').hide();
    if (man_hinh == '1') {
        $('#btnThemMoiLanTiepNhanDongHoSo').show();
        $('#modalListLanTiepNhanHoSo').show();
    } else if (man_hinh == '2') {
        $('#btnQuaylaiTab2').show();
        $('#btnTiepTheoLanTiepNhanDongHS').show();
        $('#btnXuatBaoCaoLanTiepNhanDongHS').show();
        $('#modalAddLanTiepNhanHoSo').show();
    }
    else if (man_hinh == '3') {
        $('#btnQuaylaiTab3').show();
        $('#btnDongLanTiepNhanDongHS').show();
        $('#btnHuyDongLanTiepNhanDongHS').show();
        $('#btnThemHoSoLanTiepNhanDongHS').show();
        $('#btnLuuLanTiepNhanDongHS').show();
        $('#btnXoaLanTiepNhanDongHS').show();
        $('#modalChiTietLanTiepNhanHoSo').show();
    }
}
function chonCanBo(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalCanBoDanhSach .dscb").removeClass("d-none");
    $("#inputSearch_CanBo").focus();
    $("#inputSearch_CanBo").val("");
    $("#modalCanBoDanhSach .modalCanBoItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalCanBoDanhSach .modalCanBoItem[value='" + val + "']").prop("checked", true);
    }
    _modalCanBo.show(el);
}
function onChonCanBo(el) {
    var target = _modalCanBo.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        $(target).attr("data-val", val);
        var can_bo = objDanhMuc.ds_can_bo.where(n => n.ma == val).firstOrDefault();
        $(target).val(can_bo.ten);
        $(target).attr("col-val", can_bo.ma);
    }
    _modalCanBo.hide();
}
function xoaChonCanBo(el) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
}
function layDuLieuHoSoChoDong() {
    var otArr = [];
    $("#TableSearchDanhSachHoSoChoDong tr.row_item").each(function (e) {
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
function layDuLieuHoSoDeNghiDong() {
    var otArr = [];
    $("#TableDeNghiHoSoChoDong tr.row_item").each(function (e) {
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
function onChonHoSoChoDong(el) {
    var count_item = $(".ttbt_item").length;
    var count_checked = $(".ttbt_item:checked").length;
    $("#ttbt_chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#ttbt_chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var dsHSTKiem = layDuLieuHoSoChoDong();
    var hs = dsHSTKiem.where(n => n.bt == val).firstOrDefault();
    var count = dsHoSoChoDong.where(n => n.bt == val).length;
    if ($(el).is(":checked") && count <= 0) {
        hs.checked = true;
        dsHoSoChoDong.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        dsHoSoChoDong = dsHoSoChoDong.removeItem(n => n.bt == val);
    }
}
function onChonTatCaHoSoChoDong(el) {
    var checked = $(el).is(":checked");
    $(".ttbt_item").prop("checked", checked);
    var dsHSTKiem = layDuLieuHoSoChoDong();
    if (dsHSTKiem.length > 0) {
        for (var i = 0; i < dsHSTKiem.length; i++) {
            var hs = dsHSTKiem.where(n => n.bt == dsHSTKiem[i].bt).firstOrDefault();
            var count = dsHoSoChoDong.where(n => n.bt == dsHSTKiem[i].bt).length;
            if (checked && count <= 0) {
                hs.checked = true;
                dsHoSoChoDong.push(hs);
            }
            if (!checked && count > 0) {
                dsHoSoChoDong = dsHoSoChoDong.removeItem(n => n.bt == dsHSTKiem[i].bt);
            }
        }
    }
    //var tong = dsHoSoThanhToan.sum(n => parseFloat(n.tien));
    //$("#txtSoHSThanhToan").html(dsHoSoThanhToan.length);
    //_frmThanhToan.getControl("tong_tien").setValue(ESUtil.formatMoney(tong));
}
function xoaHoSoDeNghiDong(el) {
    _notifyService.confirm("Bạn có chắc muốn xóa hồ sơ này không?", "", () => {
        $(el).parent().parent().remove();
        var bt = $(el).parent().parent().find("input[data-field='bt']").val();
        var arr = dsHoSoDeNghiDong;
        for (var i = 0; i < arr.length; i++) {
            arr = arr.removeItem(n => n.bt == bt);
        }
    });
}
function editLanTiepNhanDongHs(so_id_lan) {
    if (so_id_lan != '' && so_id_lan != null && so_id_lan != undefined) {
        var obj = {
            so_id: so_id_lan
        }
        _service.layChiTietLanTiepNhanDongHoSo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            for (var i = 0; i < res.data_info.chi_tiet.length; i++) {
                res.data_info.chi_tiet[i].checked = true;
            }
            dsHoSoDeNghiDong = res.data_info.chi_tiet;
            _frmDetailLanTiepNhanDongHoSo.getControl("so_id").val(res.data_info.tt_chung.firstOrDefault().so_id);
            _frmDetailLanTiepNhanDongHoSo.getControl("noi_dung").val(res.data_info.tt_chung.firstOrDefault().noi_dung);
            ESUtil.genHTML("TableDeNghiHoSoChoDongTemplate", "TableDeNghiHoSoChoDong", { data: res.data_info.chi_tiet });
            cauHinhAnHienNut(3);
            if (res.data_info.tt_chung.firstOrDefault().trang_thai == 'D') {
                $("#btnDongLanTiepNhanDongHS").hide();
                $("#btnHuyDongLanTiepNhanDongHS").show();
            } else {
                $("#btnDongLanTiepNhanDongHS").show();
                $("#btnHuyDongLanTiepNhanDongHS").hide();
            }
        });
    }
}
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("THANH_TOAN_NG");
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_c").setValue(dateNow);
    _frmSearchLanTiepNhanDongHS.getControl("ngay_d").setValue(ngayDauThang);
    _frmSearchLanTiepNhanDongHS.getControl("ngay_c").setValue(dateNow);
    _frmSearchHoSoChoDong.getControl("ngay_d").setValue(ngayDauThang);
    _frmSearchHoSoChoDong.getControl("ngay_c").setValue(dateNow);
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _userManagementService.layDsNSD(),
        _bankListService.layDsNganHang(),
        _userManagementService.layDsCanBoQuyen(),
        _healthClaimCommonService.layDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC })
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.can_bo = arrRes[2].data_info;
        objDanhMuc.ngan_hang = arrRes[3].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh_ngan_hang = arrRes[3].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.ds_can_bo = arrRes[4].data_info.nsd_quyen_ttbt;
        objDanhMuc.ds_giay_to = arrRes[5].data_info;
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiemHoSoChoThanhToan.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh_ql").setValue("");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setValue("");
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").addEventChange(val => {
            var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
            _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
            _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setValue("");
        });

        _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
        _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").addEventChange(val => {
            _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
        });
        _frmTimKiemHoSoChoThanhToan.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        });

        var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        ESUtil.genHTML("modalCanBoDanhSachTemplate", "modalCanBoDanhSach", { danh_sach_can_bo: arrCanBo }, () => {
            $("#modalCanBoDanhSach .single_checked").click(function () {
                $("#modalCanBoDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });

        _frmSearchLanTiepNhanDongHS.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);

        getPaging(1);
    });
    _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("pttt").addEventChange(val => {
        $("#lblMaNganHang").addClass("_required");
        _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").attr("required", "required");
        if (val == "TM") {
            $("#lblMaNganHang").removeClass("_required");
            _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").removeAttr("required");
        }
        _frmThemNguoiThuHuongBoiThuongConNguoi = new FormService("frmThemNguoiThuHuongBoiThuongConNguoi");
    });
    _frmOCRHoaDonChungTu.getControl("hoa_don").addEventChange(val => {
        var data = arrDuLieuHoaDon;
        var arr = [];
        if (val != "" && val != null && val != undefined) {
            var chung_tu = ho_so_chi_tiet.chung_tu.where(n => n.bt == val).firstOrDefault();
            if (chung_tu != null && chung_tu != undefined) {
                var ten_dvi_phat_hanh = {
                    ma_nd: "TEN_DVI_PHAT_HANH",
                    noi_dung_so_sanh: "Đơn vị phát hành",
                    nd_goc: chung_tu.ten_dvi_phat_hanh == null || chung_tu.ten_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_phat_hanh,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                    ten_dvi_phat_hanh.nd_save = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                }
                ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);

                var mst_dvi_phat_hanh = {
                    ma_nd: "MST_DVI_PHAT_HANH",
                    noi_dung_so_sanh: "Mã số thuế",
                    nd_goc: chung_tu.mst_dvi_phat_hanh == null || chung_tu.mst_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.mst_dvi_phat_hanh,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                    mst_dvi_phat_hanh.nd_save = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                }
                mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);

                var ngay_ct = {
                    ma_nd: "NGAY_CT",
                    noi_dung_so_sanh: "Ngày hóa đơn",
                    nd_goc: chung_tu.ngay_ct == null || chung_tu.ngay_ct == '' ? 'Chưa có dữ liệu' : chung_tu.ngay_ct,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
                    ngay_ct.nd_save = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
                }
                ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);

                var mau_hdon = {
                    ma_nd: "MAU_HDON",
                    noi_dung_so_sanh: "Mẫu hóa đơn",
                    nd_goc: chung_tu.mau_hdon == null || chung_tu.mau_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.mau_hdon,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
                    mau_hdon.nd_save = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
                }
                mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);

                var so_hdon = {
                    ma_nd: "SO_HDON",
                    noi_dung_so_sanh: "Số hóa đơn",
                    nd_goc: chung_tu.so_hdon == null || chung_tu.so_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.so_hdon,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
                    so_hdon.nd_save = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
                }
                so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);

                var ky_hieu_hdon = {
                    ma_nd: "KY_HIEU_HDON",
                    noi_dung_so_sanh: "Ký hiệu hóa đơn",
                    nd_goc: chung_tu.ky_hieu_hdon == null || chung_tu.ky_hieu_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.ky_hieu_hdon,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
                    ky_hieu_hdon.nd_save = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
                }
                ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);

                var tong_tien = {
                    ma_nd: "TONG_TIEN",
                    noi_dung_so_sanh: "Tổng tiền",
                    nd_goc: chung_tu.tien == null || chung_tu.tien == '' ? 'Chưa có dữ liệu' : chung_tu.tien,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    so_sanh: false
                };
                if (data.length > 1) {
                    tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
                    tong_tien.nd_save = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
                }
                tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);

                var ten_dvi_nhan_hdon = {
                    ma_nd: "HO_TEN",
                    noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    nd_goc: chung_tu.ten_dvi_nhan == null || chung_tu.ten_dvi_nhan == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_nhan,
                    so_sanh: false
                };
                if (data.length > 1) {
                    ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri;
                    ten_dvi_nhan_hdon.nd_save = data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri;
                }
                ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);

                var website_tra_cuu = {
                    ma_nd: "WEBSITE_TRA_CUU_HDON",
                    noi_dung_so_sanh: "Website tra cứu",
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    nd_goc: chung_tu.website_tra_cuu == null || chung_tu.website_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.website_tra_cuu,
                    so_sanh: false
                };
                if (data.length > 1) {
                    website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
                    website_tra_cuu.nd_save = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
                }
                website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);

                var ma_tra_cuu = {
                    ma_nd: "MA_TRA_CUU_HDON",
                    noi_dung_so_sanh: "Mã tra cứu hóa đơn",
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_save: '',
                    nd_goc: chung_tu.ma_tra_cuu == null || chung_tu.ma_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.ma_tra_cuu,
                    so_sanh: false
                };
                if (data.length > 1) {
                    ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
                    ma_tra_cuu.nd_save = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
                }
                ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

                arr.push(ten_dvi_phat_hanh);
                arr.push(mst_dvi_phat_hanh);
                arr.push(ngay_ct);
                arr.push(mau_hdon);
                arr.push(so_hdon);
                arr.push(ky_hieu_hdon);
                arr.push(tong_tien);
                arr.push(ten_dvi_nhan_hdon);
                arr.push(website_tra_cuu);
                arr.push(ma_tra_cuu);
                ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
            }
        } else {
            var ten_dvi_phat_hanh = {
                ma_nd: "TEN_DVI_PHAT_HANH",
                noi_dung_so_sanh: "Đơn vị phát hành",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                ten_dvi_phat_hanh.nd_save = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
            }
            ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);

            var mst_dvi_phat_hanh = {
                ma_nd: "MST_DVI_PHAT_HANH",
                noi_dung_so_sanh: "Mã số thuế",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
                mst_dvi_phat_hanh.nd_save = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
            }
            mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);

            var ngay_ct = {
                ma_nd: "NGAY_CT",
                noi_dung_so_sanh: "Ngày hóa đơn",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
                ngay_ct.nd_save = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
            }
            ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);

            var mau_hdon = {
                ma_nd: "MAU_HDON",
                noi_dung_so_sanh: "Mẫu hóa đơn",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
                mau_hdon.nd_save = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
            }
            mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);

            var so_hdon = {
                ma_nd: "SO_HDON",
                noi_dung_so_sanh: "Số hóa đơn",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
                so_hdon.nd_save = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
            }
            so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);

            var ky_hieu_hdon = {
                ma_nd: "KY_HIEU_HDON",
                noi_dung_so_sanh: "Ký hiệu hóa đơn",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
                ky_hieu_hdon.nd_save = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
            }
            ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);

            var tong_tien = {
                ma_nd: "TONG_TIEN",
                noi_dung_so_sanh: "Tổng tiền",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
                tong_tien.nd_save = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
            }
            tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);

            var ten_dvi_nhan_hdon = {
                ma_nd: "HO_TEN",
                noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
                nd_ocr: 'Chưa có dữ liệu',
                nd_goc: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri;
                ten_dvi_nhan_hdon.nd_save = data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri;
            }
            ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);

            var website_tra_cuu = {
                ma_nd: "WEBSITE_TRA_CUU_HDON",
                noi_dung_so_sanh: "Website tra cứu",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
                website_tra_cuu.nd_save = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
            }
            website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);

            var ma_tra_cuu = {
                ma_nd: "MA_TRA_CUU_HDON",
                noi_dung_so_sanh: "Mã tra cứu hóa đơn",
                nd_goc: 'Chưa có dữ liệu',
                nd_ocr: 'Chưa có dữ liệu',
                nd_save: '',
                so_sanh: false
            };
            if (data.length > 1) {
                ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
                ma_tra_cuu.nd_save = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? ' ' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
            }
            ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

            arr.push(ten_dvi_phat_hanh);
            arr.push(mst_dvi_phat_hanh);
            arr.push(ngay_ct);
            arr.push(mau_hdon);
            arr.push(so_hdon);
            arr.push(ky_hieu_hdon);
            arr.push(tong_tien);
            arr.push(ten_dvi_nhan_hdon);
            arr.push(website_tra_cuu);
            arr.push(ma_tra_cuu);
            ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
        }
    });
    _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("dvi_th").addEventChange(val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            dvi_th: val
        }
        _healthClaimCommonService.layThongTinHThuHuong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != null) {
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("pttt").setValue(res.data_info.pttt);
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ten").setValue(res.data_info.ten);
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("tien").setValue(ESUtil.formatMoney(res.data_info.tien));
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("dien_giai").setValue(res.data_info.dien_giai);
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("tk_cmt").setValue(res.data_info.tk_cmt);
                res.data_info.ma_ngan_hang = res.data_info.ma_ngan_hang == null ? "" : res.data_info.ma_ngan_hang;
                res.data_info.ma_chi_nhanh = res.data_info.ma_chi_nhanh == null ? "" : res.data_info.ma_chi_nhanh;
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").setValue(res.data_info.ma_ngan_hang);
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_ngan_hang").trigger("select2:select");
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("ma_chi_nhanh").setValue(res.data_info.ma_chi_nhanh);
            }
        });
    });
    //_frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tl_thue").addEventChange(val => {
    //    chungTuTinhTienXemToanBoThongTinHSBT();
    //});
    $('form[name=frmThemHoaDonChungTuBoiThuongConNguoi] input[name=thue]').on('change', function () {
        chungTuTinhTienXemToanBoThongTinHSBT();
    });
    _frmTimKiemHoSoChoThanhToan.getControl("ma_doi_tac").addEventChange(val => {
        getPaging(1);
    });
    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("dvi_ph").addEventChange(val => {
        if (val == "BENH_VIEN") {
            var arr = ho_so_chi_tiet.lan_kham;
            var arrBV = [];
            if (arr.length > 0) {
                $.each(arr, function (index, item) {
                    arrBV.push(item.benh_vien);
                });
            }
            var data = unique_arr(arrBV);
            if (val == "BENH_VIEN" && data.length == 1) {
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    ma: data.toString()
                }
                _hospitalService.layThongTinChiTiet(obj).then(res => {
                    var bv = res.data_info;
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("ten_dvi_phat_hanh").setValue(bv.ten);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("mst_dvi_phat_hanh").setValue(bv.mst);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("dchi_dvi_phat_hanh").setValue(bv.dia_chi);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tien").setValue(ho_so_chi_tiet.ho_so.so_tien_duyet);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tl_thue").setValue(0);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tl_thue").trigger('select2:select');
                });
            }
            
        }
    });
    //---Trao đổi---
    $("#btnThemNoiDungTraoDoiConNguoi").click(function () {
        if (_frmThemNoiDungTraoDoiConNguoi.isValid()) {
            var obj = _frmThemNoiDungTraoDoiConNguoi.getJsonData();
            obj.so_id = ho_so_chi_tiet.ho_so.so_id;
            obj.nv = 'NG';
            if (obj.nd.trim() == "" || obj.nd.trim() == null) {
                _notifyService.error("Bạn chưa nhập nội dung trao đổi");
                return;
            }
            _healthClaimCommonService.nhapNoiDungTraoDoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#noiDungTraoDoiConNguoi").setValue("");
                $("#tblDanhSachNoiDungTraoDoiConNguoi").html("");
                trang = 1;
                getPagingNoiDungTraoDoiConNguoi(trang, () => {
                    let div = $('#lichSuTraoDoiConNguoi').get(0);
                    div.scrollTo(0, document.body.scrollHeight);
                });
            });
        }
    });
    $("#noiDungTraoDoiConNguoi").keydown(function (event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            event.preventDefault();
            $("#btnThemNoiDungTraoDoiConNguoi").trigger('click');
        }
    });
    $("#btnThemCanBoThamGiaTraoDoiConNguoi").click(function () {
        _frmThemCanBoTraoDoiConNguoi.resetForm();
        _frmThemCanBoTraoDoiConNguoi.clearErrorMessage();
        bindDataCanBoTraoDoiConNguoi(ho_so_chi_tiet.ho_so.ma_doi_tac, ho_so_chi_tiet.ho_so.so_id);
        _modalThemCanBoTraoDoiConNguoi.show();
    });
    $("#btnThemVaDongCanBoTraoDoiConNguoi").click(function () {
        if (_frmThemCanBoTraoDoiConNguoi.isValid()) {
            var formData = _frmThemCanBoTraoDoiConNguoi.getJsonData();
            _healthClaimCommonService.themCanBoTraoDoi(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Thêm cán bộ thành công");
                    _modalThemCanBoTraoDoiConNguoi.hide();
                    getPagingDanhSachCanBoTraoDoiConNguoi();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#lichSuTraoDoiConNguoi').scroll(function () {
        let div = $(this).get(0);
        if ((Math.round(div.scrollTop)) <= 0) {
            trang++;
            if (trang > trang_max_nd) {
                return;
            }
            getPagingNoiDungTraoDoiConNguoi(trang);
            div.scroll({ top: 1, behavior: "smooth" });
        }
    });
    //---Ảnh---
    $("#input_imagesHangMucTonThat").keyup(ESUtil.delay(function (e) {
        var val = $("#input_imagesHangMucTonThat").val().trim();
        $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#btnTaiAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_giay_to_tai_lieu");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnTaiAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_hsgt_chua_phan_loai");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_giay_to_tai_lieu");
        printHinhAnhHoSo(arr);
    });
    $("#btnInAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_hsgt_chua_phan_loai");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_giay_to_tai_lieu");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TL", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnXemAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_hsgt_chua_phan_loai");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHUA_PHAN_LOAI", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    //-----Xem toàn bộ ảnh-----
    $('#divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TL", () => { initImageViewerToanBoAnhConNguoi(); });
        }
    });
    $('#divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhConNguoi(); });
        }
    });
    //Thêm hóa đơn chứng từ
    $("#btnThemHoaDonChungTuConNguoi_xemToanBoThongTinHSBT").click(function () {
        _frmThemHoaDonChungTuBoiThuongConNguoi.resetForm();
        _frmThemHoaDonChungTuBoiThuongConNguoi.clearErrorMessage();
        _modalThemHoaDonChungTuBoiThuongConNguoi.show();
    });
    $("#btnThemNguoiThuHuongConNguoi_xemToanBoThongTinHSBT").click(function () {
        _frmThemNguoiThuHuongBoiThuongConNguoi.resetForm();
        _frmThemNguoiThuHuongBoiThuongConNguoi.clearErrorMessage();
        _modalThemNguoiThuHuongBoiThuongConNguoi.show();
    })
    $("#frmThemHoaDonChungTuBoiThuongConNguoi input[name='thue']").change(function () {
        var so_tien = parseInt(_frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tien").getValue());
        var thue = parseInt(_frmThemHoaDonChungTuBoiThuongConNguoi.getControl("thue").getValue());
        var tong_cong = so_tien + thue;
        _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });
    $("#frmThemHoaDonChungTuBoiThuongConNguoi input[name='tien']").change(function () {
        chungTuTinhTienXemToanBoThongTinHSBT();
    });
    //Lưu thông tin
    $("#btnLuuThongTinHoaDonChungTuBoiThuongConNguoi_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuongConNguoi.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemHoaDonChungTuBoiThuongConNguoi.isValid()) {
            _healthCompensationService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmThemHoaDonChungTuBoiThuongConNguoi.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuDongThongTinHoaDonChungTuBoiThuongConNguoi_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuongConNguoi.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemHoaDonChungTuBoiThuongConNguoi.isValid()) {
            _healthCompensationService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _modalThemHoaDonChungTuBoiThuongConNguoi.hide();
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuThongTinNguoiThuHuongConNguoi_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuongConNguoi.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemNguoiThuHuongBoiThuongConNguoi.isValid()) {
            data.loai = "TH";
            _healthCompensationService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnLuuDongThongTinNguoiThuHuongConNguoi_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuongConNguoi.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmThemNguoiThuHuongBoiThuongConNguoi.isValid()) {
            data.loai = "TH";
            _healthCompensationService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _modalThemNguoiThuHuongBoiThuongConNguoi.hide();
                _frmThemNguoiThuHuongBoiThuongConNguoi.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnDongHoSoConNguoi_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn đóng hồ sơ này không?", "", val => {
            var data = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id
            }
            _service.dongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongHoSoConNguoi_xemToanBoThongTinHSBT").addClass("d-none");
                $("#btnHuyDongHoSoConNguoi_xemToanBoThongTinHSBT").removeClass("d-none");
                _modalXemToanBoThongTinHoSo.hide();
                _notifyService.success("Đóng hồ sơ thành công.");
                getPaging(1);
                try {
                    var objTichHop = {
                        ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
                        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
                        so_id_gcn: ho_so_chi_tiet.ho_so.so_id_dt,
                        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                        so_id: ho_so_chi_tiet.ho_so.so_id,
                        hanh_dong: "CHUYEN_DU_LIEU_BT"
                    }
                    _healthClaimCommonService.tichHopCN(objTichHop).then(resTichHop => { console.log(resTichHop) });
                } catch { };
            });
        });
    });
    $("#btnHuyDongHoSoConNguoi_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn hủy đóng hồ sơ này không?", "", val => {
            var data = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.so_id,
                so_id: ho_so_chi_tiet.ho_so.so_id
            }
            _service.huyDongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongHoSoConNguoi_xemToanBoThongTinHSBT").removeClass("d-none");
                $("#btnHuyDongHoSoConNguoi_xemToanBoThongTinHSBT").addEventChange("d-none");
                _notifyService.success("Hủy đóng hồ sơ bồi thường thành công.");
                _modalXemToanBoThongTinHoSo.hide();
                getPaging(1);
                try {
                    var objTichHop = {
                        ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
                        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
                        so_id_gcn: ho_so_chi_tiet.ho_so.so_id_dt,
                        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                        so_id: ho_so_chi_tiet.ho_so.so_id,
                        hanh_dong: "CHUYEN_DU_LIEU_BT"
                    }
                    _healthClaimCommonService.tichHopCN(objTichHop).then(resTichHop => { console.log(resTichHop) });
                } catch { };
            });
        });
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
            _frmThemHoaDonChungTuBoiThuongConNguoi.resetForm();
            _frmThemHoaDonChungTuBoiThuongConNguoi.clearErrorMessage();
            var formData = _frmUploadHoaDonDienTu.getFormFileData();
            formData.append("ma_doi_tac", ho_so_chi_tiet.ho_so.ma_doi_tac);
            formData.append("so_id", ho_so_chi_tiet.ho_so.so_id);
            _common.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDonDienTu.hide();
                    $('#btnThemHoaDonChungTuConNguoi_xemToanBoThongTinHSBT').trigger('click');
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
                    _frmThemHoaDonChungTuBoiThuongConNguoi.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmThemHoaDonChungTuBoiThuongConNguoi.setData(obj);
                }
            });
        }
    });
    $("#btnExport").click(function () {
        var _serviceTmpHome = new Service();
        var obj = _frmTimKiemHoSoChoThanhToan.getJsonData();
        obj.ma_mau_in = "BC_NG_BL_DS_CHUYEN_KE_TOAN";
        _serviceTmpHome.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res,
                obj.ma_mau_in +
                "_" +
                new Date().getFullYear() +
                new Date().getMonth() +
                new Date().getDay() +
                new Date().getHours() +
                new Date().getMinutes() +
                new Date().getSeconds() +
                new Date().getMilliseconds() +
                ".xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $('#close_nguyenNhanGiamTru').click(function () {
        _popoverNguyenNhanGiamTru.hide();
    });
    $("form[name='frmTimKiemHoSoChoThanhToan'] input[name='ngay_d'],input[name='ngay_c'],input[name='so_hs'],input[name='ten_kh'],input[name='nd_tim'],input[name='so_hd']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPaging(1);
        }
    });
    $("#btnImportDsHoSoChoDong").click(function () {
        $("#table_import_excel thead tr").html('');
        $("#table_import_excel tbody").html('');
        _modalUploadExcel.show();
    });
    $("#btnUploadExcel").click(function () {
        $("#frmImportExcelFile").click();
    });
    $("#btnSaveExcel").click(function () {
        var obj = {
            data: objData,
        }
        if (obj.data == null) {
            return;
        }
        _service.importHSChoDong(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Đóng hồ sơ thành công.");
                //layChitietHopDong(hop_dong_chi_tiet.data_info.hd);
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#btnTaiTemplate").click(function () {
        var obj = _frmTimKiemHoSoChoThanhToan.getJsonData();
        obj.ma_doi_tac = ESCS_MA_DOI_TAC;
        obj.ma_mau_in = "ESCS_EXCEL_DONG_NHIEU_HS";
        _service_new.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    $("#btnDocOCRHoaDon").click(function () {
        arrDuLieuHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt
        }
        var chung_tu = ho_so_chi_tiet.chung_tu;
        _healthClaimCommonService.layDanhSachFile(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var data = [];
                var ds_giay_to = objDanhMuc.ds_giay_to;
                $.each(res.data_info, function (index, item) {
                    $.each(ds_giay_to, function (index1, item1) {
                        if (item.ma_file == item1.hang_muc && item1.ma == 'HOA_DON_VIEN_PHI') {
                            data.push(item);
                        }
                    });
                });
                var ext = [".jpg", ".png", ".jpeg", ".gif", ".pdf"];
                var ds_anh = data.where(n => ext.includes(n.extension));
                var arrAnh = bindImagesTab1(ds_anh);
                ESUtil.genHTML("dsAnhHoaDonChungTu_template", "dsAnhHoaDonChungTu", { danh_sach: arrAnh });
            }
            var arrHD = [];
            if (chung_tu.length > 0) {
                for (var i = 0; i < chung_tu.length; i++) {
                    arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
                }
                _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
                _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
            }
            else {
                _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", "");
            }
            _modalOCRHoaDonChungTu.show();
            $("#hoa_don_item_tat_ca").prop("checked", false);
        });
    });
    $("#btnDocOCRHoaDonChungTu").click(function () {
        arrDuLieuHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var arrVal = getImageHoaDonOCRSelect();
        var arrHangMuc = getHangMucAnhHoaDon();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nv: "NG",
            hang_muc: arrHangMuc.firstOrDefault(),
            bt: arrVal
        };
        if (arrVal == undefined || arrVal == null || arrVal.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        _healthClaimCommonService.docOCR(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadThongTinOCRHoaDonChungTu(obj);
        });
    });
    $('#btnToggleImageHoaDon').click(function () {
        $("#dsAnhHoaDonChungTu").toggleClass("list");
        if ($("#dsAnhHoaDonChungTu").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $(".inputSearchHangMucHoaDon").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#btnTiepNhanHSGoc").click(function () {
        $('#btnSearchLanTiepNhanDongHS').trigger('click');
        cauHinhAnHienNut("1");
        _modalDsLanTiepNhanDongHoSo.show();
    });
    $("#btnSearchLanTiepNhanDongHS").click(function () {
        ESUtil.genHTML("DanhSachLanTiepNhanDongHSBodyTemplate", "DanhSachLanTiepNhanDongHSBody", { data: [] });
        var obj = _frmSearchLanTiepNhanDongHS.getJsonData();
        _service.layDanhSachlanTiepNhanDongHoSo(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("DanhSachLanTiepNhanDongHSBodyTemplate", "DanhSachLanTiepNhanDongHSBody", { data: res.data_info });
        });
    });
    $("#btnThemMoiLanTiepNhanDongHoSo").click(function () {
        dsHoSoChoDong = [];
        dsHoSoDeNghiDong = [];
        ESUtil.genHTML("TableSearchDanhSachHoSoChoDongTemplate", "TableSearchDanhSachHoSoChoDong", { data: [] });
        cauHinhAnHienNut("2");
        $("#btnTimKiemHoSoChoDong").trigger('click');
    });
    $("#btnQuaylaiTab2").click(function () {
        cauHinhAnHienNut("1");
    });
    $("#btnTimKiemHoSoChoDong").click(function () {
        var obj = _frmSearchHoSoChoDong.getJsonData();
        obj.ma_doi_tac = ESCS_MA_DOI_TAC;
        obj.nsd_chuyen_tt = _frmSearchHoSoChoDong.getControl("nsd_chuyen_tt").attr("col-val");
        _service.layDanhSachHoSoChoDong(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("TableSearchDanhSachHoSoChoDongTemplate", "TableSearchDanhSachHoSoChoDong", { data: res.data_info });
        });
    });
    $('#btnTiepTheoLanTiepNhanDongHS').click(function () {
        var arrHoSoCho = dsHoSoChoDong;
        if (arrHoSoCho.length <= 0) {
            _notifyService.error("Bạn chưa chọn hồ sơ nào để thêm vào lần tiếp nhận!");
            return;
        }
        var arrHoSoDeNghi = dsHoSoDeNghiDong;
        for (var i = 0; i < arrHoSoDeNghi.length; i++) {
            for (var j = 0; j < arrHoSoCho.length; j++) {
                if (arrHoSoDeNghi[i].bt == arrHoSoCho[j].bt) {
                    arrHoSoDeNghi = arrHoSoDeNghi.removeItem(n => n.bt == arrHoSoCho[j].bt);
                }
            }
        }
        var arr = arrHoSoCho.concat(arrHoSoDeNghi);
        ESUtil.genHTML("TableDeNghiHoSoChoDongTemplate", "TableDeNghiHoSoChoDong", { data: arr });
        cauHinhAnHienNut(3);
        var so_id_lan = _frmDetailLanTiepNhanDongHoSo.getControl("so_id").val();
        if (so_id_lan != null && so_id_lan != undefined && so_id_lan != '') {
            $('#btnDongLanTiepNhanDongHS').show();
            $('#btnHuyDongLanTiepNhanDongHS').show();
            $('#btnXoaLanTiepNhanDongHS').show();
        } else {
            $('#btnDongLanTiepNhanDongHS').hide();
            $('#btnHuyDongLanTiepNhanDongHS').hide();
            $('#btnXoaLanTiepNhanDongHS').hide();
        }
    });
    $('#btnThemHoSoLanTiepNhanDongHS').click(function () {
        $('#btnTimKiemHoSoChoDong').trigger('click');
        cauHinhAnHienNut(2);
    });
    $('#btnQuaylaiTab3').click(function () {
        dsHoSoChoDong = [];
        ESUtil.genHTML("TableSearchDanhSachHoSoChoDongTemplate", "TableSearchDanhSachHoSoChoDong", { data: [] });
        cauHinhAnHienNut("2");
        $("#btnTimKiemHoSoChoDong").trigger('click');
    });
    $('#btnLuuLanTiepNhanDongHS').click(function () {
        if (_frmDetailLanTiepNhanDongHoSo.isValid()) {
            var obj = _frmDetailLanTiepNhanDongHoSo.getJsonData();
            obj.arr = layDuLieuHoSoDeNghiDong();
            if (obj.arr.length == 0) {
                _notifyService.error("Bạn chưa chọn hồ sơ nào!");
            }
            _service.luuLanTiepNhanHoSoChoDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                cauHinhAnHienNut("1");
                _notifyService.success('Lưu thông tin lần tiếp nhận đóng hồ sơ thành công!');
                $('#btnSearchLanTiepNhanDongHS').trigger('click');
            });
        }
    });
    $('#btnXoaLanTiepNhanDongHS').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn xóa lần tiếp nhận đóng hồ sơ này không?", "", () => {
            var obj = _frmDetailLanTiepNhanDongHoSo.getJsonData();
            
            _service.xoaLanTiepNhanHoSoChoDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                cauHinhAnHienNut("1");
                _notifyService.success('Xóa thông tin lần tiếp nhận đóng hồ sơ thành công!');
                $('#btnSearchLanTiepNhanDongHS').trigger('click');
            });
        });
    });
    $('#btnDongLanTiepNhanDongHS').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn đóng lần tiếp nhận đóng hồ sơ này không?", "", () => {
            var obj = _frmDetailLanTiepNhanDongHoSo.getJsonData();
            _service.dongLanTiepNhanDongHoSo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongLanTiepNhanDongHS").hide();
                $("#btnHuyDongLanTiepNhanDongHS").show();
                _notifyService.success("Đóng danh sách hồ sơ thành công");
            });
        });
    });
    $('#btnHuyDongLanTiepNhanDongHS').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn hủy đóng lần tiếp nhận đóng hồ sơ này không?", "", () => {
            var obj = _frmDetailLanTiepNhanDongHoSo.getJsonData();
            _service.huyDongLanTiepNhanDongHoSo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#btnDongLanTiepNhanDongHS").show();
                $("#btnHuyDongLanTiepNhanDongHS").hide();
                _notifyService.success("Hủy đóng danh sách hồ sơ thành công");
            });
        });
    });
    $('#btnXuatBaoCaoLanTiepNhanDongHS').click(function () {
        var obj = _frmSearchHoSoChoDong.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_HS_LAN_TIEP_NHAN_DONG_HS";
        _service_new.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    getPaging(1);
});
