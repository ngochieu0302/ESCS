//version 2022-07-16 10:21
var BT_TEMP;

var ESCS_TIEN_BH_TNDS_NGUOI = 150000000;
var nhom_y_kien = "";
var data_nsd_cho_yk = "";
var y_kien_chi_tiet = {};
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var DS_GIA_TU_DONG = [];
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
const arrLoaiHSGT = [
    { ma: 'BG', ten: 'Bản gốc' },
    { ma: 'BS', ten: 'Bản sao' },
    { ma: 'BDC', ten: 'Bản đối chiếu' }
]
const keyCache = {
    HANG_MUC_XE_CHINH: "HANG_MUC_XE_CHINH",
    HANG_MUC_TAI_LIEU: "HANG_MUC_TAI_LIEU",
    TU_DONG_GIA_XE_XUAT: "TU_DONG_GIA_XE_XUAT",
    GIA_TU_DONG: "GIA_TU_DONG"
}
var NAM_SAN_XUAT = [];
var arrThongTinDuLieuOCR = [];
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}

var _common = new CommonService();
var _service = new CarCompensationService();
var _service_trinh_duyet = new TrinhDuyetService();
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
var arrTrangThai = [];
var arrDataBaoGia = [];
var arrBaoGiaGara = [];
var arrTinhToanBoiThuong = [];
var arrHangMucTonThat = [];
var arrNhanXet = [];
var arrDuLieuOCRHoaDon = [];
var arrThongTinOCRHoaDon = [];
var arrDataOCR = [];
const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'BT'; //Bồi thường
const MAN_HINH = "BOI_THUONG";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const AN_HIEN_TRANG_THAI_HO_SO = true;
var gd_chon_anh_arr = [];
var gd_anh_chon_cuoi = null;
var hop_dong_chi_tiet = null;
var lhnv = null;

var objBaoGiaChiTiet = {};
var objChonDuyetBaoGiaCT;
var objBaoGiaGaraApi = {};

var ho_so = {};
var mode = "dev";
//if (mode === "dev") {
//    dateNow = "30/08/2022";
//    ngayDauThang = "25/07/2022";
//}
var configColumn = [
    { field: "kh_vip", title: "*", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nguon_tb", title: "Nguồn", width: "6%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái HS", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" }, //, formatter: formatterTrangThai
    { field: "pt_hoan_thanh", title: "% hoàn thành", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "so_hs", title: "Số hồ sơ", width: "16%", headerSort: false, hozAlign: "center" },
    { field: "nsd", title: "Bồi thường viên", width: "12%", hozAlign: "center", headerSort: false },
    { field: "doi_tuong", title: "Biển xe", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_kh", title: "Tên khách hàng", width: "12%", headerSort: false },
    { field: "so_tien", title: "Số tiền TT", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "so_vu", title: "Số vụ", width: "6%", hozAlign: "center", headerSort: false, visible: false },
    { field: "nv", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số HĐBH", width: "10%", hozAlign: "center", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý", width: "23%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "23%", hozAlign: "center", headerSort: false },
    { field: "so_id", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];

var _gridViewHoSoBoiThuong = new GridViewService("gridViewHoSoBoiThuong", configColumn, getPaging, rowClick);
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
        if (response.out_value != undefined && response.out_value != null &&
            response.out_value.action != undefined && response.out_value.action != null &&
            response.out_value.action == "ATTACH_FILE") {
            if (_uploadService.callback) {
                _uploadService.callback(response);
            }
        }
        else
            getAnhThumnail();
    }
};
var _service_base = new Service();
var _carClaimCommonService = new CarClaimCommonService();
var _commonService = new CommonService();
var _carClaimCommon = new CarClaimCommon();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _businessCodeService = new BusinessCodeService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _bankListService = new BankListService();
var _garaListService = new GaraListService();
var _damageLevelService = new DamageLevelService();
var _categoryCommonService = new CategoryCommonService();
var _userManagementService = new UserManagementService();
var _statusListService = new StatusListService();
var _carInvestigationService = new CarInvestigationService();
var _modalDocumentService = new ModalDocumentService();
var _uploadService = new UploadService(configUpload);
var _printedService = new PrintedService();
var _unitService = new UnitService();
var _carManufacturerListService = new CarManufacturerListService()
var _hieuXeService = new HieuXeService();
var _rangeVehicleService = new RangeVehicleService();
var _storageUnitService = new StorageUnitService();
var _modalXacMinhPhiService = new ModalXacMinhPhiService();
var _modalXemQRCode = new ModalXemQRCode();
var _modalLapPhuongAnSuaChuaService = new ModalLapPhuongAnSuaChuaService();

var _navBoiThuong = new NavTabService("navBoiThuong", ["CarCompensationContentStep1", "CarCompensationContentStep2", "CarCompensationContentStep3", "CarCompensationContentStep4", "CarCompensationContentStep5"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navThongTinLienHe", "navQuaTrinhGiaiQuyet", "navLichSuTonThat"], "nav-tabs-timeline");
var _frmTimKiem = new FormService("FrmCarClaimSearch");
_frmTimKiem.getControl("btv").setDataSource([{ ma: ESCS_NSD, ten: "Hồ sơ cá nhân" }], "ten", "ma", "Tất cả", ESCS_NSD);

var _frmTaoNoiDung = new FormService("frmTaoNoiDung");
var _frmSuaGCN_BT = new FormService("frmSuaGCN_BT");
var _frmDienBienTonThat = new FormService("frmDienBienTonThat");
var _frmThongTinGiamDinh = new FormService("frmThongTinGiamDinh");
var _frmThemHMTTPhu = new FormService("frmThemHMTTPhu");
var _frmThemGara = new FormService("frmThemGara");
var _frmThemGaraBaoGia = new FormService("frmThemGaraBaoGia");
var _frmSelectedGara = new FormService("frmSelectedGara");
var _frmTinhToanBoiThuong = new FormService("frmTinhToanBoiThuong");
var _frmCarCompensationAddInvoice = new FormService("frmCarCompensationAddInvoice");
var _frmCarCompensationAddBenefit = new FormService("frmCarCompensationAddBenefit");
var _frmCarCompensationAdvance = new FormService("frmCarCompensationAdvance");
var _frmNguyenNhanGiamTru = new FormService("frmNguyenNhanGiamTru");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmChuyenNguoiXuLy = new FormService("frmChuyenNguoiXuLy");
var _frmHuyHoSo = new FormService("frmHuyHoSo");
var _frmThemTNDS = new FormService("frmThemTNDS");
var _frmThemTNDSNguoi = new FormService("frmThemTNDSNguoi");
var _frmThuHoiVatTu = new FormService("frmThuHoiVatTu");
var _frmThuDoiNTBA = new FormService("frmThuDoiNTBA");
var _frmDKBS = new FormService('frmDKBS');
var _frmToaDoAnh = new FormService("frmToaDoAnh");
var _frmGhiChuHangMuc = new FormService("frmGhiChuHangMuc");
var _frmDocHoaDonDT = new FormService("frmDocHoaDonDT");
var _frmBaoGiaGara = new FormService("frmBaoGiaGara");
var _frmTinhToanBoiThuongPA = new FormService("frmTinhToanBoiThuongPA");
var _frmAddChiPhiKhac = new FormService("frmAddChiPhiKhac");
var _frmTKiemChiPhiKhac = new FormService("frmTKiemChiPhiKhac");
var _frmHangMucBoSung = new FormService("frmHangMucBoSung");
var _frmKhauTru = new FormService("frmKhauTru");
var _frmDanhGiaDeXuat = new FormService("frmDanhGiaDeXuat");
var _frmXemThongTinBaoGiaPhuongAn = new FormService("frmXemThongTinBaoGiaPhuongAn");
var _frmBoiThuongVienDanhGia = new FormService("frmBoiThuongVienDanhGia");
var _frmModalXinYKien = new FormService("frmModalXinYKien");
var _frmCapNhatThue = new FormService("frmCapNhatThue");
var _frmDocOCRBaoGiaGara = new FormService("frmDocOCRBaoGiaGara");
var _frmCarClaimCompareDataGPLX = new FormService("frmCarClaimCompareDataGPLX");
var _frmCarClaimCompareDataDangKiem = new FormService("frmCarClaimCompareDataDangKiem");
var _frmOCRHoaDonChungTu = new FormService("frmOCRHoaDonChungTu");
var _frmModalGiamGia = new FormService("frmModalGiamGia");
var _frmGaraHopTac = new FormService("frmGaraHopTac");
var _frmTLThuongTat = new FormService("frmTLThuongTat");
var _frmTLThuongTatNhap = new FormService("frmTLThuongTatNhap");
var _frmDanhGiaTNDSTAISAN = new FormService("frmDanhGiaTNDSTAISAN");
var _frmModalVideoUpload = new FormService("frmModalVideoUpload");

var _popoverTyLeThuongTat = new PopoverService("popoverTyLeThuongTat");
var _popoverGhiChuChiTietHM = new PopoverService("popoverGhiChuChiTietHM");
var _popoverMoTa = new PopoverService("popoverMoTa");
var _popoverDiaChi = new PopoverService("popoverDiaChi");
var _popoverGhiChuBaoGia = new PopoverService("popoverGhiChuBaoGia");
var _popoverHangMucBoSung = new PopoverService("popoverHangMucBoSung");
var _popoverBangGiaChiTiet = new PopoverService("popoverBangGiaChiTiet");
var _popoverBoiThuongVienDanhGia = new PopoverService("popoverBoiThuongVienDanhGia");
var _popoverThemBaoGiaBaoGia = new PopoverService("popoverThemBaoGiaBaoGia");
var _popoverNhapTenFile = new PopoverService("popoverNhapTenFile");

var _modalTrinhDuyetService = new ModalTrinhDuyetService();
var _modalCapNhatThue = new ModalFullScreenService("modalCapNhatThue", "");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "CarCompensationContentStep2");
var _modalChuyenNguoiXuLy = new ModalService("modalChuyenNguoiXuLy");
var _modalHuyHoSo = new ModalService("modalHuyHoSo");
var _modalViewImages = new ModalService("modalViewImages");
var _modalXemThongTinChungNhan = new ModalService("modalXemThongTinChungNhan");
var _modalSuaGCN = new ModalService("modalSuaGCN");
var _modalThemChiTietTNDS = new ModalService("modalThemChiTietTNDS");
var _modalThemChiTietTNDSNguoi = new ModalService("modalThemChiTietTNDSNguoi");
var _modalBaoGiaGara = new ModalFullScreenService("modalBaoGiaGara");
var _modalBaoCaoService = new ModalBaoCaoService("Báo cáo bảo hiểm xe cơ giới", "XE", "BC_XE_BT");
var _modalThuHoiVatTu = new ModalService("modalThuHoiVatTu");
var _modalThuDoiNTBA = new ModalService("modalThuDoiNTBA");
var _modalReadInvoice = new ModalService("modalReadInvoice");
var _modalCarCompensationAddInvoice = new ModalService("CarCompensationAddInvoice");
var _modalCarCompensationAddBenefit = new ModalService("CarCompensationAddBenefit");
var _modalCarCompensationAdvance = new ModalService("CarCompensationAdvance");
var _modalThemHMTTPHU = new ModalService("modalThemHMTTPHU");
var _modalMap = new ModalMapService("modalMap");
var _modalCarClaimCompareData = new ModalFullScreenService("modalCarClaimCompareData", "CarCompensationContentStep2");
var _modalDviTinh = new ModalDragService("modalDviTinh", undefined, "bottom");
var _modalMucDoTT = new ModalDragService("modalMucDoTT", undefined, "bottom");
var _modalNguyenNhanGiamTru = new ModalDragService("modalNguyenNhanGiamTru", undefined, "bottom");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalTuChoiBT = new ModalService("modalTuChoiBT");
var _modalXemHinhAnh = new ModalFullScreenService("modalXemHinhAnh", "CarCompensationContentStep3");
var _modalXemHinhAnhCTiet = new ModalFullScreenService("modalXemHinhAnhCTiet", "CarCompensationContentStep3");
var _modalCarFlowChart = new ModalService("modalCarFlowChart");
var _modalSLAFlowChart = new ModalService("modalSLAFlowChart");
var _modalLoaiHSGT = new ModalDragService("modalLoaiHSGT", undefined, "bottom");
var _modalBoiThuongToanBo = new ModalFullScreenService("modalBoiThuongToanBo", "");
var _modalDeXuatGiaiQuyet = new ModalService("modalDeXuatGiaiQuyet");
var _modalGaraPhuongAn = new ModalDragService("modalGaraPhuongAn", undefined, "right");
var _modalGiamGia = new ModalService("modalGiamGia");
var _modalKhauTru = new ModalService("modalKhauTru");
var _modalThue = new ModalService("modalThue");
var _modalTrinhXinYKien = new ModalTrinhXinYKienService();
var _modalAddChiPhiKhac = new ModalService("modalAddChiPhiKhac");
var _modalTaoNoiDung = new ModalService("modalTaoNoiDung");
var _modalDsKienNghi = new ModalService("modalDsKienNghi");
var _modalChonNoiDung = new ModalDragService("modalChonNoiDung", undefined, "bottom");
var _modalChonDoiTuongTT = new ModalDragService("modalChonDoiTuongTT", undefined, "right");
var _modalBaoGiaDoc = new ModalService("modalBaoGiaDoc");
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalXemHinhAnhHoaDonCTiet = new ModalFullScreenService("modalXemHinhAnhHoaDonCTiet", "");
var _modalTinhToanCPKhac = new ModalService("modalTinhToanCPKhac");
var _modalDocOCRBaoGiaGara = new ModalService("modalDocOCRBaoGiaGara");
var _modalOCRHoaDonChungTu = new ModalFullScreenService("modalOCRHoaDonChungTu", "");
var _modalBaoGiaChonHangMucTonThat = new ModalDragService("modalBaoGiaChonHangMucTonThat", undefined, "");
var _modalCarClaimCompareDataGPLX = new ModalFullScreenService("modalCarClaimCompareDataGPLX", "stepHinhAnhHoSo");
var _modalCarClaimCompareDataDangKiem = new ModalFullScreenService("modalCarClaimCompareDataDangKiem", "stepHinhAnhHoSo");
var _modalTachNghiepVu = new ModalService("modalTachNghiepVu");
var _modalSoSanhBaoGia = new ModalService("modalSoSanhBaoGia");
var _modalDocHoaDonDienTu = new ModalFullScreenService("modalDocHoaDonDienTu", "");
var _modalChonSoHoaDon = new ModalDragService("modalChonSoHoaDon", undefined, "");
var _modalTLThuongTat = new ModalService("modalTLThuongTat");
var _modalVideo = new ModalService("modalVideo");
var _modalVideoDGRRHD = new ModalService("modalVideoDGRRHD");
var _modalSoSanhDGRR = new ModalSoSanhDGRRService();
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");
var _modalThongTinHoSoService = new ModalThongTinHoSoService();

var option = {
    group_name: "ma_ct",
    dispay_name: "ten",
    value_name: "ma",
    z_index: 9999999,
    width_box: 250,
    height_box: 240,
    placeholder: "Click để chọn",
    title: "Chọn hạng mục tổn thất",
    onChecked: function (arr) {
    }
};

var arrNghiepVu = [
    { ma: "GD", ten: "Giám định", nv: "XE" },
    { ma: "BT", ten: "Bồi thường", nv: "XE" },
    { ma: "TN", ten: "Tiếp nhận", nv: "NG" },
    { ma: "BL", ten: "Bảo lãnh", nv: "NG" },
    { ma: "TT", ten: "Tính toán", nv: "NG" }
]

var arrNV_CT = [
    { ma: "NHAN_XET", ten: "Nhận xét của bồi thường viên", nv: "XE", pm: "BT" },
    { ma: "DE_XUAT", ten: "Đề xuất của bồi thường viên", nv: "XE", pm: "BT" },
    { ma: "TRINH_DUYET_BT", ten: "Trình phê duyệt", nv: "XE", pm: "BT" }
]

var _selectCheckBoxService = new SelectCheckBoxService("frmHangMucBoSung_muc_do", option);

var _esSendEmail = new ESSendEmail();
var data_bill = null;
var elementDanhGia;

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
function showModalBoiThuong() {
    $('#CarCompensationModal .nav-tabs.profile-tab').tabdrop();
    $("#CarCompensationModal").esmodal("show");
}
function bindDataDienBienTonThat(res) {
    ho_so_chi_tiet = res;
    _uploadService.setParam({
        ma_doi_tac: res.data_info.ho_so.ma_doi_tac,
        so_id: res.data_info.ho_so.so_id,
        type: "image",
        pm: CONSTANT_PM
    });
    //Step 1, tab 1: Diễn biến tổn thất
    _frmDienBienTonThat.getControl("vu_tt").setDataSource(res.data_info.ds_vu_tt, "ten", "ma");

    if (res.data_info.ds_vu_tt.length > 0) {
        $('#vu_tt').val($('#vu_tt option:first-child').val()).trigger('change');
    } else {
        ESUtil.genHTML("CarCompensationContentStep1Table2_template_none", "CarCompensationContentStep1Table2", res.data_info);
    }
    //Step 1, tab 2: Thông tin giám định
    _frmThongTinGiamDinh.getControl("lan_gd").setDataSource(res.data_info.ds_lan_gd, "ten", "ma");
    if (res.data_info.ds_lan_gd.length > 0) {
        $('#lan_gd').val($('#lan_gd option:first-child').val()).trigger('change');
    } else {
        ESUtil.genHTML("CarCompensationContentStep1Table3_template_none", "CarCompensationContentStep1Table3", res.data_info);
    }
    var btTongTienTonThat = 0;
    for (var i = 0; i < res.data_info.danh_gia_gd.length; i++) {
        btTongTienTonThat += res.data_info.danh_gia_gd[i].gia_giam_dinh;
    }
    $("#btTongTienTonThat").html(ESUtil.formatMoney(btTongTienTonThat));
    //Step 1, tab 3: Đánh giá sơ bộ tổn thất
    $(".divDanhGiaGDItem").hide();
    //Step 1, tab 3: Lấy tổng giá giám định
    var tong_gia = 0;
    $.each(res.data_info.danh_gia_gd, function (i, item) {
        tong_gia += item.gia_giam_dinh;
    });
    $("#gia_giam_dinh_tong").html(ESUtil.formatMoney(tong_gia));
    //Step 1, tab 3: Đánh giá chung
    ESUtil.genHTML("Step1YKien_template", "Step1YKien", res.data_info);
    //Step 1, tab 4: Hồ sơ giấy tờ
    ESUtil.genHTML("tblStep1_HoSoGiayTo_template", "CarCompensationContentStep1HoSoGiayTo", res.data_info);
    //Step 4:Hóa đơn, chứng từ
    initHoaDonChungTu(res);
    //Step 4:Người thụ hưởng
    initNguoiThuHuong(res);
    //Step 4:Hồ sơ giấy tờ
    ESUtil.genHTML("tblStep4_HoSoGiayTo_template", "CarCompensationContentStep4HoSoGiayTo", res.data_info);
    //Step 4:Hồ sơ giấy tờ lỗi
    ESUtil.genHTML("bodyHoSoGiayToLoi_template", "bodyHoSoGiayToLoi", ho_so_chi_tiet.data_info);
    //Modal thêm hạng mục/phụ tùng
    bindCmbDataLHNV(res.data_info);
    //Thông tin trên header modal
    ESUtil.genHTML("titleCarCompensationTemplate", "CarCompensationModalLabel", { ho_so: ho_so_chi_tiet.data_info.ho_so });
    showModalBoiThuong();
}
function showDanhGiaTT() {
    var lhnv = ho_so_chi_tiet.data_info.lh_nv.firstOrDefault();
    xemChiTietDTTonThatGD(lhnv.ma, lhnv.nhom, lhnv.doi_tuong, lhnv.hang_muc);
}
function chuanHoaNVCT(dsNVCT, nhom, doi_tuong, hang_muc) {
    if (dsNVCT.length > 0) {
        for (var i = 0; i < dsNVCT.length; i++) {
            dsNVCT[i].doi_tuong_goc = false;//Không là đối tượng gốc
            if (dsNVCT[i].so_id_doi_tuong != 0) {
                dsNVCT[i].doi_tuong_goc = true;//Là đối tượng gốc
            }
            dsNVCT[i].nhom = nhom;
            dsNVCT[i].hang_muc = hang_muc;
            dsNVCT[i].so_luong_dt = 0;
        }
    }
    if (doi_tuong != DOI_TUONG_TT.TAI_SAN) {
        return dsNVCT;
    }
    //Chuẩn hóa cha con đối tượng cũ
    var arr = [];
    var doi_tuong_cha = dsNVCT.where(n => n.doi_tuong_goc);
    if (doi_tuong_cha.length > 0) {
        for (var i = 0; i < doi_tuong_cha.length; i++) {
            doi_tuong_cha[i].ds_doi_tuong = dsNVCT.where(n => n.so_id_doi_tuong_cha == doi_tuong_cha[i].so_id_doi_tuong);
            doi_tuong_cha[i].so_luong_dt = doi_tuong_cha[i].ds_doi_tuong.length;
            arr.push(doi_tuong_cha[i]);
        }
    }
    //Thêm lại đối tượng mới
    var doi_tuong_moi = dsNVCT.where(n => n.so_id_doi_tuong_cha == 0 && n.so_id_doi_tuong == 0);
    if (doi_tuong_moi.length > 0) {
        for (var i = 0; i < doi_tuong_moi.length; i++) {
            arr.push(doi_tuong_moi[i]);
        }
    }
    arr.sort((a, b) => b.so_luong_dt - a.so_luong_dt);
    return arr;
}
function chuanHoaNVCTTinhToan(dsNVCT, nhom, doi_tuong) {
    if (dsNVCT.length > 0) {
        for (var i = 0; i < dsNVCT.length; i++) {
            dsNVCT[i].doi_tuong_goc = false;//Không là đối tượng gốc
            if (dsNVCT[i].so_id_doi_tuong != 0) {
                dsNVCT[i].doi_tuong_goc = true;//Là đối tượng gốc
            }
            dsNVCT[i].nhom = nhom;
            dsNVCT[i].so_luong_dt = 0;
        }
    }
    if (doi_tuong != DOI_TUONG_TT.TAI_SAN) {
        return dsNVCT;
    }
    //Chuẩn hóa cha con đối tượng cũ
    var arr = [];
    var doi_tuong_cha = dsNVCT.where(n => n.doi_tuong_goc);
    if (doi_tuong_cha.length > 0) {
        for (var i = 0; i < doi_tuong_cha.length; i++) {
            doi_tuong_cha[i].ds_doi_tuong = dsNVCT.where(n => n.so_id_doi_tuong_cha == doi_tuong_cha[i].so_id_doi_tuong);
            doi_tuong_cha[i].so_luong_dt = doi_tuong_cha[i].ds_doi_tuong.length;
            arr.push(doi_tuong_cha[i]);
        }
    }
    //Thêm lại đối tượng mới
    var doi_tuong_moi = dsNVCT.where(n => n.so_id_doi_tuong_cha == 0 && n.so_id_doi_tuong == 0);
    if (doi_tuong_moi.length > 0) {
        for (var i = 0; i < doi_tuong_moi.length; i++) {
            arr.push(doi_tuong_moi[i]);
        }
    }
    arr.sort((a, b) => b.so_luong_dt - a.so_luong_dt);
    return arr;
}
function xemChiTietDTTonThatGD(lhnv, nhom, doi_tuong, hang_muc) {
    $("#navDanhGiaGiamDinh li").removeClass("active");
    $("#navDanhGiaGiamDinh li[data-lhnv='" + lhnv + "']").addClass("active");
    $(".divDanhGiaGDItem").hide();
    if (doi_tuong == "TAI_SAN") {
        $("#tableChiTietTonThatGDTNDS_TAI_SAN").addClass("d-none");
        $("#tableChiTietTonThatGDTNDS_TAI_SAN_XE").addClass("d-none");
        var ds_tsan_xe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
        var ds_tsan_khac = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
        _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
        _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
        $("#frmDanhGiaTNDSTAISAN_loai_tai_san").addClass("d-none");
        $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").addClass("d-none");
        if (ds_tsan_khac.length > 0)
            _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
        else if (ds_tsan_xe.length > 0)
            _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
        _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
        if (ds_tsan_xe.length > 0) {
            $("#frmDanhGiaTNDSTAISAN_loai_tai_san").removeClass("d-none");
        }
        $("#divDanhGiaGDTNDSTAISAN").show();
    }
    nhapChiTietNghiepVu(nhom, "", lhnv, 0, res => {
        if (doi_tuong == DOI_TUONG_TT.XE) {
            ESUtil.genHTML("modalChiTietTonThatGDVCXTemplate", "modalChiTietTonThatGDVCX", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_gd));
                $("#modalChiTietTonThatGDVCXTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
            $("#divDanhGiaGDVCX").show();
        }
        if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            ESUtil.genHTML("modalChiTietTonThatGDHANGHOATemplate", "modalChiTietTonThatGDHANGHOA", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_tt));
                $("#modalChiTietTonThatGDHANGHOATongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
            $("#divDanhGiaGDHANGHOA").show();
        }
        if (nhom != NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI) {
            ESUtil.genHTML("modalChiTietTonThatGDNGUOITemplate", "modalChiTietTonThatGDNGUOI", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_tt));
                $("#modalChiTietTonThatGDNGUOITongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
            $("#divDanhGiaGDNNTX").show();
        }
        if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI) {
            ESUtil.genHTML("modalChiTietTonThatGDTNDSNGUOITemplate", "modalChiTietTonThatGDTNDSNGUOI", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_tt));
                $("#modalChiTietTonThatGDVCXTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
            $("#divDanhGiaGDTNDSNGUOI").show();
        }
        if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI_HK) {
            ESUtil.genHTML("modalChiTietTonThatGDTNDSNGUOI_HKTemplate", "modalChiTietTonThatGDTNDSNGUOI_HK", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_tt));
                $("#modalChiTietTonThatGDTNDSNGUOI_HKTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
            $("#divDanhGiaGDTNDSNGUOI_HK").show();
        }
        if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $("#tableChiTietTonThatGDTNDS_TAI_SAN").addClass("d-none");
            $("#tableChiTietTonThatGDTNDS_TAI_SAN_XE").addClass("d-none");

            var ds_tsan_xe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
            var ds_tsan_khac = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
            _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
            _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
            $("#frmDanhGiaTNDSTAISAN_loai_tai_san").addClass("d-none");
            $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").addClass("d-none");
            if (ds_tsan_khac.length > 0)
                _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
            else if (ds_tsan_xe.length > 0)
                _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
            _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
            if (ds_tsan_xe.length > 0) {
                $("#frmDanhGiaTNDSTAISAN_loai_tai_san").removeClass("d-none");
            }
            $("#divDanhGiaGDTNDSTAISAN").show();
        }
    });
}
function nhapChiTietNghiepVu(nhom, loai, lh_nv, so_id_doi_tuong, callback = undefined) {
    var obj = {};
    arrHangMucTT = [];
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.lh_nv = lh_nv;
    obj.nhom = nhom;
    obj.loai = loai;
    obj.so_id_doi_tuong = so_id_doi_tuong;
    obj.pm = CONSTANT_PM;
    _carInvestigationService.layHangMucChiTiet(obj).then(res => {
        arrHangMucTT = res.data_info;
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    data_bill = data;
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac_ql, so_id: data.so_id };
    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
        showStep("CarCompensationContentStep1");
        objBaoGiaChiTiet.ma_doi_tac = data.ma_doi_tac_ql;
        objBaoGiaChiTiet.so_id = data.so_id;
        //lưu thông tin hồ sơ đang xem Local Storage
        _frmThemHMTTPhu.getControl("ma_doi_tac").setValue(data.ma_doi_tac_ql);
        _frmThemGara.getControl("ma_doi_tac").setValue(data.ma_doi_tac_ql);
        _frmThemHMTTPhu.getControl("so_id").setValue(data.so_id);
        _frmThemGara.getControl("so_id").setValue(data.so_id);
        _frmThemGaraBaoGia.getControl("ma_doi_tac").setValue(data.ma_doi_tac_ql);
        _frmThemGaraBaoGia.getControl("so_id").setValue(data.so_id);
        _frmTinhToanBoiThuong.getControl("ma_doi_tac").setValue(data.ma_doi_tac_ql);
        _frmTinhToanBoiThuong.getControl("so_id").setValue(data.so_id);
        _frmCarCompensationAddInvoice.getControl("so_id").setValue(data.so_id);
        _frmCarCompensationAddBenefit.getControl("so_id").setValue(data.so_id);

        _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.length > 0) ? res.data_info.ds_doi_tuong[0].so_id_doi_tuong : "");
        _frmThemGara.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE")[0].so_id_doi_tuong : "");
        _frmGaraHopTac.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE")[0].so_id_doi_tuong : "");
        _frmThemGaraBaoGia.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.nhom == "XE")[0].so_id_doi_tuong : "");

        //Tab thông tin chung
        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", res.data_info);
        //Tab thông tin liên hệ
        ESUtil.genHTML("navThongTinLienHe_template", "navThongTinLienHe", res.data_info);
        bindDataDienBienTonThat(res);
        initTamUng(res);
        resetTabs();
        getAnhThumnail();
        ganTrangThaiHoSo();
        if (row !== undefined) {
            row.select();
        }
        _frmThuHoiVatTu.getControl("hang_muc").setDataSource(res.data_info.hang_muc, "ten_hang_muc", "hang_muc", "Chọn hạng mục", "");
        //Danh sách vật tư thu hồi
        ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", res.data_info);
        //Danh sách thu đòi người thứ 3
        ESUtil.genHTML("tableDanhSachThuDoiNTBA_template", "tableDanhSachThuDoiNTBA", res.data_info);
        tinhTongTienThuHoiVatTu();
        tinhTongTienThuDoiNTBA();
        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        var ds_lhnv = ho_so_chi_tiet.data_info.lh_nv;
        for (var i = 0; i < ds_lhnv.length; i++) {
            if (ds_lhnv[i].nhom == "VCX") {
                ds_lhnv[i].hang_muc = "";
            }
            else {
                var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.lh_nv == ds_lhnv[i].ma).firstOrDefault();
                ds_lhnv[i].hang_muc = hm.hang_muc;
            }
        }
        ESUtil.genHTML("navDanhGiaGiamDinhTemplate", "navDanhGiaGiamDinh", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });
        ESUtil.genHTML("navDanhGiaNghiepVuTemplate", "navDanhGiaNghiepVu", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });
        ESUtil.genHTML("navPhuongAnNghiepVuTemplate", "navPhuongAnNghiepVu", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });
        ESUtil.genHTML("navNghiepVuTab4Template", "navNghiepVuTab4", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });

        $("#navDanhGiaGiamDinh").parent().show();
        $("#navDanhGiaNghiepVu").parent().show();
        $("#navNghiepVuTab4").parent().show();
        if (ho_so_chi_tiet.data_info.lh_nv.length <= 1) {
            $("#navDanhGiaGiamDinh").parent().hide();
            $("#navDanhGiaNghiepVu").parent().hide();
            $("#navNghiepVuTab4").parent().hide();
        }
        if (ho_so_chi_tiet.data_info.lh_nv.length > 0) {
            xemChiTietDTTonThat(ho_so_chi_tiet.data_info.lh_nv[0].ma);
        }
        else {
            xemChiTietDTTonThat("");
            anHienNutDuyetPA();
        }
        _carClaimCommonService.LayLichSuXinYKien({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, nghiep_vu: 'XE' }).then(res_yk => {
            if (res_yk.state_info.status != 'OK') {
                _notifyService.error(res_yk.state_info.message_body);
                return;
            }
            objDanhMuc.lsXinYKien = res_yk.data_info;
        });
        ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.data_info.canh_bao });
        ESUtil.genHTML("modalChonSoHoaDonTemplate", "modalChonSoHoaDonDanhSach", { danh_sach: ho_so_chi_tiet.data_info.chung_tu });
        _carClaimCommonService.danhSachCanhBao(objGetDetail).then(res1 => {
            ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
        });
    });
}
function hideModalBoiThuong() {
    $("#inside-modal").esmodal("hide");
}
function tinhTongTienThuHoiVatTu() {
    $("#tongTienVatTuThuHoiDuKien").html("");
    if (ho_so_chi_tiet != undefined && ho_so_chi_tiet != null &&
        ho_so_chi_tiet.data_info.thu_hoi != undefined && ho_so_chi_tiet.data_info.thu_hoi != null && ho_so_chi_tiet.data_info.thu_hoi.length > 0
    ) {
        var tong = 0;
        for (var i = 0; i < ho_so_chi_tiet.data_info.thu_hoi.length; i++) {
            ho_so_chi_tiet.data_info.thu_hoi[i].tien = parseFloat(ho_so_chi_tiet.data_info.thu_hoi[i].tien);
            tong += ho_so_chi_tiet.data_info.thu_hoi[i].tien;
        }
        $("#tongTienVatTuThuHoiDuKien").html(ESUtil.formatMoney(parseFloat(tong)));
    }
}
function tinhTongTienThuDoiNTBA() {
    $("#tongTienThuDoiNTBADuKien").html("");
    if (ho_so_chi_tiet != undefined && ho_so_chi_tiet != null &&
        ho_so_chi_tiet.data_info.ntba != undefined && ho_so_chi_tiet.data_info.ntba != null && ho_so_chi_tiet.data_info.ntba.length > 0
    ) {
        var tong = 0;
        for (var i = 0; i < ho_so_chi_tiet.data_info.ntba.length; i++) {
            ho_so_chi_tiet.data_info.ntba[i].tien = parseFloat(ho_so_chi_tiet.data_info.ntba[i].tien);
            tong += ho_so_chi_tiet.data_info.ntba[i].tien;
        }
        $("#tongTienThuDoiNTBADuKien").html(ESUtil.formatMoney(parseFloat(tong)));
    }
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
function resetTabs() {
    //reset tab Thông tin chung
    $("#navThongTinHoSo .nav-tabs .nav-link").removeClass("active");
    $("#navThongTinHoSo .nav-item:first-child .nav-link").addClass("active");

    $("#navThongTinHoSo .tab-content .tab-pane").removeClass("active");
    $("#navThongTinHoSo #navThongTinChung").addClass("active");
    //reset tab chính
    $('.info-tab .wizard-inner .nav-link').removeClass("active").first().addClass("active");
    $('.wizard > .tab-content > .tab-pane').removeClass("active show");
    $('#CarCompensationContentStep1').addClass("active show");
    //reset tab 1
    $('#CarCompensationContent1Tab .nav-link').removeClass("active").first().addClass("active");

    $('.tab-pane[id^="CarCompensationContentStep1Tab"]').removeClass("active");
    $('#CarCompensationContentStep1Tab1').addClass("active");
    //reset tab 4
    $('#CarCompensationContent4Tab .nav-link').removeClass("active").first().addClass("active");

    $('.tab-pane[id^="CarCompensationContentStep4Tab"]').removeClass("active");
    $('#CarCompensationContentStep4Tab1').addClass("active");
}
function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewHoSoBoiThuong.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewHoSoBoiThuong.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewHoSoBoiThuong.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function bindCmbDataHangMucXe(objDanhMuc) {
    _frmThemHMTTPhu.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_xe.where(n => n.loai == "PHU"), "ten", "ma", "Chọn hạng mục", "");
}
function bindCmbDataLHNV(objDanhMuc) {
    _frmThemHMTTPhu.getControl("lh_nv").setDataSource(objDanhMuc.lh_nv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
}
function bindCmbDataGara(objDanhMuc) {
    _frmThemGara.getControl("gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
    _frmThemGaraBaoGia.getControl("gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
    _frmAddChiPhiKhac.getControl("ma_gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
}
function initHoaDonChungTu(res) {
    var chung_tu_tong_tien = 0;
    var chung_tu_tong_thue = 0;
    var tong_cong = 0;
    $.each(res.data_info.chung_tu, function (i, item) {
        chung_tu_tong_tien += parseInt(item.tien);
        chung_tu_tong_thue += parseInt(item.thue);
        tong_cong += parseInt(item.tong_cong);
    });
    ESUtil.genHTML("step4_chung_tu_template", "step4_chung_tu", res.data_info);
    //tổng cộng
    $("#step4_chung_tu").next().find(".chung_tu_tong_tien").html(ESUtil.formatMoney(chung_tu_tong_tien));
    $("#step4_chung_tu").next().find(".chung_tu_tong_thue").html(ESUtil.formatMoney(chung_tu_tong_thue));
    $("#step4_chung_tu").next().find(".chung_tu_tong_cong").html(ESUtil.formatMoney(tong_cong));
    bindEditChungTu();
}
function initNguoiThuHuong(res) {
    var thu_huong_tong = 0;
    $.each(res.data_info.thu_huong, function (i, item) {
        thu_huong_tong += parseInt(item.tien);
    });
    ESUtil.genHTML("step4_thu_huong_template", "step4_thu_huong", res.data_info);
    $("#step4_thu_huong").next().find(".thu_huong_tong").html(ESUtil.formatMoney(thu_huong_tong));
    bindEditThuHuong();
}
function initTamUng(res) {
    var tam_ung_tong = 0;
    $.each(res.data_info.tam_ung, function (i, item) {
        tam_ung_tong += parseInt(item.tien);
    });
    ESUtil.genHTML("step4_tam_ung_template", "step4_tam_ung", res.data_info);
    $("#step4_tam_ung").next().find(".tam_ung_tong").html(ESUtil.formatMoney(tam_ung_tong));
}
function loadGaraBaoGia(callback = undefined) {
    var json = _frmThemHMTTPhu.getJsonData();
    $("#btnDuyetBaoGiaGara").hide();
    $("#btnTuChoiBT").hide();
    $("#btnHuyDuyetBaoGiaGara").hide();
    _service.layGaraBaoGia(json).then(res => {
        if (res.state_info.status == "OK") {
            ESUtil.genHTML("garaBaoGia_template", "garaBaoGia", { data_info: res.data_info.gara }, () => {
                if (res.data_info.gara.length == 0) {
                    $('#btnKetThucBaoGia, #btnHuyKetThucBaoGia').hide();
                } else {
                    $('#btnKetThucBaoGia, #btnHuyKetThucBaoGia').show();
                }
            });
            var gara = res.data_info.gara.where(n => n.lien_ket_bg == 1);
            _frmBaoGiaGara.getControl("gara").setDataSource(gara, "ten", "gara", "Chọn gara liên kết", "");
            bindBtnSuaBaoGia();
            bindBtnXoaBaoGia();
            if (res.data_info.tl_boi_thuong.gia_tri_xe > 0 && res.data_info.tl_boi_thuong.so_tien_bh > 0) {
                $(".tinhToanBGGiaTriXe").html(ESUtil.formatMoney(res.data_info.tl_boi_thuong.gia_tri_xe));
                $(".tinhToanBGSoTienBH").html(ESUtil.formatMoney(res.data_info.tl_boi_thuong.so_tien_bh));
                $(".tinhToanBGTyLeBH").html(res.data_info.tl_boi_thuong.ty_le_bh + '%');
                $(".tinhToanBGTyLeTonThat").html(res.data_info.tl_boi_thuong.ty_le_tt ?? "0" + '%');
                $("#tinhToanBGHienThi").css('display', 'display');
                if (res.data_info.tl_boi_thuong.ty_le_tt >= 75) {
                    $("#tinhToanBGBoiThuongToanBo").removeClass("d-none");
                }
            }
            else {
                $("#tinhToanBGHienThi").css('display', 'none');
            }
            ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: [] });
            if (callback) {
                callback(res);
            }
            return;
        } else {
            e.preventDefault();
        }
    });
}
function bindBtnSuaBaoGia() {
    $('.btnSuaBaoGia').inlinePopover({
        target: "#themBaoGia",
        close_on_outside_click: false,
        onBeforeShow: function (source) {
            $('#themBaoGia .popover-title .close').next().html('Sửa gara báo giá');
            var gara = source.data('gara');
            var bt_gara = source.data('bt_gara');
            var so_id_doi_tuong = source.data('so_id_doi_tuong');
            var datetime = source.data('date').split(" ");

            _frmThemGara.getControl('bt_gara').setValue(bt_gara);
            _frmThemGara.getControl('gara').setValue(gara);
            _frmThemGara.getControl('so_id_doi_tuong').setValue(so_id_doi_tuong);
            _frmThemGara.getControl('gio_bg').setValue(datetime[0]);
            _frmThemGara.getControl('ngay_bg').val(datetime[1]);
        }
    });
}
function loadHoaDonXML(callback = undefined) {
    var json = _frmTinhToanBoiThuong.getJsonData();
    _service.docHoaDon(json).then(res => {
        if (res.state_info.status == "OK") {
            if (res.data_info.hoa_don == null) {
                _notifyService.error("Chưa upload file hóa đơn điện tử.");
                return;
            }
            ESUtil.genHTML("docEbill_template", "docEbill", res.data_info);
            // gird BILL dưới
            ESUtil.genHTML("docEbillCT_template", "docEbillCT", res.data_info);
            if (callback) {
                callback(res);
            }
            return;
        } else {
            e.preventDefault();
        }
    });
}
function bindBtnXoaBaoGia() {
    $(".xoaBaoGia").click(function () {
        var so_id_doi_tuong = $(this).attr("data-so_id_doi_tuong");
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa báo giá này không?", "", val => {
            var json = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_doi_tuong: so_id_doi_tuong
            };
            json.bt_gara = $(this).data("bt_gara");
            json.gara = $(this).data("gara");
            _service.xoaGaraBaoGia(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    if ($("#garaBaoGia tr").find("td").hasClass("layBaoGiaCT")) {
                        $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                    }
                });
                _notifyService.success("Xóa báo giá thành công.");
            });
        });
    });
}
function xoaTrinhDuyet(ma_doi_tac, so_id, bt, pm) {
    if (pm == "BT") {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa trình duyệt này không ?", "", val => {
            var obj = {
                ma_doi_tac: ma_doi_tac,
                so_id: so_id,
                bt: bt
            };
            _service_trinh_duyet.xoaTrinhDuyet(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadLichSuTrinhDuyet(obj, "gridTrinhDuyet_template", "gridTrinhDuyet");
                ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
                var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
                if (trang_thai != null) {
                    ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
                }
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                _notifyService.success("Xóa trình duyệt thành công.");
            });
        });
    }
}
function html2json() {
    var otArr = [];
    $('table#tableDsHMTTBaoGia tbody tr.gara_bg_ctiet').each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("name");
                if ($(this).hasClass("number")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function bindEventBaoGiaCT(tuDongTienDeXuat = false) {
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

    $("#garaBaoGiaCT input[name='so_luong']").change(function () {
        //Gán giá trị
        var sl = $(this).closest("tr").find("input[name='so_luong']").val().replace(/[^0-9]+/g, '');
        var so_luong = 0;
        if (sl.trim() != "") {
            so_luong = parseInt(sl.trim());
        }
        $(this).closest("tr").find("input[name='tien_vtu']").removeAttr("readonly");
        if (so_luong <= 0) {
            $(this).closest("tr").find("input[name='tien_vtu']").val("0");
            $(this).closest("tr").find("input[name='tien_vtu']").attr("readonly", "readonly");
            $(this).closest("tr").find("input[name='tien_vtu']").trigger("change");
        }
    });

    $("#garaBaoGiaCT input[name='tien_vtu'], #garaBaoGiaCT input[name='tien_nhan_cong'], #garaBaoGiaCT input[name='tien_khac']").change(function () {
        var tu_dong_gia_de_xuat = ESStorage.getItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT);
        if (tu_dong_gia_de_xuat == "C") {
            tuDongTienDeXuat = true;
        }
        else {
            tuDongTienDeXuat = false;
        }
        //Lấy giá trị và chuẩn hóa giá trị
        var hang_muc = $(this).closest("tr").find("input[name='hang_muc']").val();
        var tien_vtu = parseInt($(this).closest("tr").find("input[name='tien_vtu']").val().replace(/[^0-9]+/g, ''));
        var tien_nhan_cong = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong']").val().replace(/[^0-9]+/g, ''));
        var tien_khac = parseInt($(this).closest("tr").find("input[name='tien_khac']").val().replace(/[^0-9]+/g, ''));
        //Tính toán
        var tong_cong = ESUtil.formatMoney(tien_vtu + tien_nhan_cong + tien_khac);
        //Gán giá trị
        $(this).closest("tr").find("input[name='tong_cong']").val(tong_cong);
        if (tuDongTienDeXuat) {
            $(this).closest("tr").find("input[name='tien_vtu_dx']").val(ESUtil.formatMoney(tien_vtu));
            $(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val(ESUtil.formatMoney(tien_nhan_cong));
            $(this).closest("tr").find("input[name='tien_khac_dx']").val(ESUtil.formatMoney(tien_khac));
            $(this).closest("tr").find("input[name='tien_dx']").val(ESUtil.formatMoney(tong_cong));

            $(this).closest("tr").find("input[name='tien_vtu_duyet']").val(ESUtil.formatMoney(tien_vtu));
            $(this).closest("tr").find("input[name='tien_nhan_cong_duyet']").val(ESUtil.formatMoney(tien_nhan_cong));
            $(this).closest("tr").find("input[name='tien_khac_duyet']").val(ESUtil.formatMoney(tien_khac));
            $(this).closest("tr").find("input[name='tien_duyet']").val(tong_cong);
        }
        else {
            var gia_tu_dong = ESStorage.getItemLocalStorage(keyCache.GIA_TU_DONG);
            if (gia_tu_dong == "C" && DS_GIA_TU_DONG != undefined && DS_GIA_TU_DONG != null && DS_GIA_TU_DONG.length > 0) {
                var hang_muc_tu_dong = DS_GIA_TU_DONG.where(n => n.hang_muc == hang_muc).firstOrDefault();
                if (hang_muc_tu_dong != undefined && hang_muc_tu_dong != null) {
                    var name = $(this).attr("name");
                    if (name == "tien_vtu") {
                        var tien_vtu_tu_dong = hang_muc_tu_dong.tien_vtu;
                        if (tien_vtu < hang_muc_tu_dong.tien_vtu) {
                            tien_vtu_tu_dong = tien_vtu;
                        }
                        $(this).closest("tr").find("input[name='tien_vtu_dx']").val(ESUtil.formatMoney(tien_vtu_tu_dong));
                        $(this).closest("tr").find("input[name='tien_vtu_duyet']").val(ESUtil.formatMoney(tien_vtu_tu_dong));
                    }
                    if (name == "tien_nhan_cong") {
                        var tien_nhan_cong_tu_dong = hang_muc_tu_dong.tien_nhan_cong;
                        if (tien_nhan_cong < hang_muc_tu_dong.tien_nhan_cong) {
                            tien_nhan_cong_tu_dong = tien_nhan_cong;
                        }

                        $(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val(ESUtil.formatMoney(tien_nhan_cong_tu_dong));
                        $(this).closest("tr").find("input[name='tien_nhan_cong_duyet']").val(ESUtil.formatMoney(tien_nhan_cong_tu_dong));
                    }
                    if (name == "tien_khac") {
                        var tien_khac_tu_dong = hang_muc_tu_dong.tien_khac;
                        if (tien_khac < hang_muc_tu_dong.tien_khac) {
                            tien_khac_tu_dong = tien_khac;
                        }
                        $(this).closest("tr").find("input[name='tien_khac_dx']").val(ESUtil.formatMoney(tien_khac_tu_dong));
                        $(this).closest("tr").find("input[name='tien_khac_duyet']").val(ESUtil.formatMoney(tien_khac_tu_dong));
                    }
                    var tien_vtu_dx = parseInt($(this).closest("tr").find("input[name='tien_vtu_dx']").val().replace(/[^0-9]+/g, ''));
                    var tien_nhan_cong_dx = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val().replace(/[^0-9]+/g, ''));
                    var tien_khac_dx = parseInt($(this).closest("tr").find("input[name='tien_khac_dx']").val().replace(/[^0-9]+/g, ''));
                    var tong_cong_dx = ESUtil.formatMoney(tien_vtu_dx + tien_nhan_cong_dx + tien_khac_dx);
                    $(this).closest("tr").find("input[name='tien_dx']").val(ESUtil.formatMoney(tong_cong_dx));
                    $(this).closest("tr").find("input[name='tien_duyet']").val(ESUtil.formatMoney(tong_cong_dx));
                }
            }
        }
    });

    $("#garaBaoGiaCT input[name='tien_vtu_dx'], #garaBaoGiaCT input[name='tien_nhan_cong_dx'], #garaBaoGiaCT input[name='tien_khac_dx']").change(function () {
        var tien_vtu_dx = parseInt($(this).closest("tr").find("input[name='tien_vtu_dx']").val().replace(/[^0-9]+/g, ''));
        var tien_nhan_cong_dx = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val().replace(/[^0-9]+/g, ''));
        var tien_khac_dx = parseInt($(this).closest("tr").find("input[name='tien_khac_dx']").val().replace(/[^0-9]+/g, ''));

        var tien_dx = ESUtil.formatMoney(tien_vtu_dx + tien_nhan_cong_dx + tien_khac_dx);
        $(this).closest("tr").find("input[name='tien_dx']").val(ESUtil.formatMoney(tien_dx));

        $(this).closest("tr").find("input[name='tien_vtu_duyet']").val(ESUtil.formatMoney(tien_vtu_dx));
        $(this).closest("tr").find("input[name='tien_nhan_cong_duyet']").val(ESUtil.formatMoney(tien_nhan_cong_dx));
        $(this).closest("tr").find("input[name='tien_khac_duyet']").val(ESUtil.formatMoney(tien_khac_dx));
        $(this).closest("tr").find("input[name='tien_duyet']").val(tien_dx);
    });

    $("#garaBaoGiaCT input[name='tien_vtu_duyet'], #garaBaoGiaCT input[name='tien_nhan_cong_duyet'], #garaBaoGiaCT input[name='tien_khac_duyet']").change(function () {
        var tien_vtu_duyet = parseInt($(this).closest("tr").find("input[name='tien_vtu_duyet']").val().replace(/[^0-9]+/g, ''));
        var tien_nhan_cong_duyet = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong_duyet']").val().replace(/[^0-9]+/g, ''));
        var tien_khac_duyet = parseInt($(this).closest("tr").find("input[name='tien_khac_duyet']").val().replace(/[^0-9]+/g, ''));
        var tien_duyet = ESUtil.formatMoney(tien_vtu_duyet + tien_nhan_cong_duyet + tien_khac_duyet);
        $(this).closest("tr").find("input[name='tien_duyet']").val(ESUtil.formatMoney(tien_duyet));
    });

    $("#garaBaoGiaCT input[name='tl_giam_gia_vtu']").change(function () {
        var chkGiamGiaBGVtu = $("#chkGiamGiaBGVtu").is(":checked");
        var val = $(this).val();
        if (chkGiamGiaBGVtu) {
            $("#garaBaoGiaCT input[name='tl_giam_gia_vtu']").val(val);
        }
    });

    $("#garaBaoGiaCT input[name='tl_giam_gia_nhan_cong']").change(function () {
        var chkGiamGiaBGNhanCong = $("#chkGiamGiaBGNhanCong").is(":checked");
        var val = $(this).val();
        if (chkGiamGiaBGNhanCong) {
            $("#garaBaoGiaCT input[name='tl_giam_gia_nhan_cong']").val(val);
        }
    });

    $("#garaBaoGiaCT input[name='tl_giam_gia_khac']").change(function () {
        var chkGiamGiaBGSon = $("#chkGiamGiaBGSon").is(":checked");
        var val = $(this).val();
        if (chkGiamGiaBGSon) {
            $("#garaBaoGiaCT input[name='tl_giam_gia_khac']").val(val);
        }
    });
}
function reloadPhuongAnKhacPhuc(ma_doi_tac, so_id) {
    var objGetDetail = { ma_doi_tac: ma_doi_tac, so_id: so_id };
    _service.xemNghiepVu(objGetDetail).then(res => {
        res.data_info.pa_khac_phuc = res.data_info.tinh_toan_bt = res.data_info.nv;
        var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
        xemChiTietDTTonThat(lhnv);
    });
}
//function bindEventPACT(callback = undefined) {
//    $("input.number").keypress(function (e) {
//        var keycode = e.which || e.keyCode;
//        var arrKeycode = [8, 37, 39];
//        if (!(e.shiftKey == false && ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
//            e.preventDefault();
//        }
//    });
//    $("input.number").keyup(function (e) {
//        var value = ESUtil.formatMoney(parseInt($(this).val().replace(/[^0-9]+/g, '')));
//        $(this).val(value);
//    });
//    $("#tblPhuongAnCT input[name='tien_vtu_dx'], #tblPhuongAnCT input[name='tien_nhan_cong_dx']").change(function () {
//        var tien_vtu_dx = parseInt($(this).closest("tr").find("input[name='tien_vtu_dx']").val().replace(/[^0-9]+/g, ''));
//        var tien_nhan_cong_dx = parseInt($(this).closest("tr").find("input[name='tien_nhan_cong_dx']").val().replace(/[^0-9]+/g, ''));

//        var tien_dx = ESUtil.formatMoney(tien_vtu_dx + tien_nhan_cong_dx);
//        $(this).closest("tr").find("input[name='tien_dx']").val(ESUtil.formatMoney(tien_dx));
//        if (callback) {
//            callback();
//        }
//    });
//    $(`#modalChiTietPhuongAnNGUOI input[name='tien_dx'], #modalChiTietPhuongAnHANGHOA input[name='tien_dx'],
//       #modalChiTietPhuongAnTNDS_NGUOI input[name = 'tien_dx'], #modalChiTietPhuongAnTNDS_TAI_SAN input[name = 'tien_dx'],
//       #modalChiTietPhuongAnTNDS_NGUOI_HK input[name = 'tien_dx']`).change(function () {
//        if (callback) {
//            callback();
//        }
//    });
//    if (callback) {
//        callback();
//    }
//}
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
function goToScroll(element) {
    $('#lstImage').animate({ scrollTop: $("#" + element).offset().top }, 'slow');
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
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function getAnhThumnail(callback = undefined) {
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function getAnhThumnailHopDong(callback = undefined) {
    var pm = "BH";
    if (ESCS_MA_DOI_TAC == "OPES") {
        pm = "API";
    }
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        pm: "API"
    }).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function chungTuTinhTien() {
    var so_tien = parseInt(_frmCarCompensationAddInvoice.getControl("tien").getValue());
    var tl_thue = parseInt(_frmCarCompensationAddInvoice.getControl("tl_thue").getValue());
    var thue = Math.round(so_tien * (tl_thue / 100));
    var tong_cong = so_tien + thue;
    _frmCarCompensationAddInvoice.getControl("thue").setValue(ESUtil.formatMoney(thue));
    _frmCarCompensationAddInvoice.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function loadChungTuThuHuong() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    };
    _service.layChungTuBoiThuong(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        initHoaDonChungTu(res);
        initNguoiThuHuong(res);
        _service.layThongTinChiTietHoSo(data).then(resDetail => {
            ho_so_chi_tiet = resDetail;
            ESUtil.genHTML("modalChonSoHoaDonTemplate", "modalChonSoHoaDonDanhSach", { danh_sach: ho_so_chi_tiet.data_info.chung_tu });
        });
    });
}
function showStep(step) {
    anHienTabThongTinChung();
    $(".lstButtonESCS").hide();
    $(".lstButton_" + step).css('display', 'flex');
    if (!kiemTraStep(step)) {
        return;
    }
    _navBoiThuong.showTab(step);
    if (step === "CarCompensationContentStep1") {
        $('#CarCompensationContent1Tab .nav-link').removeClass("active").first().addClass("active");
        $('.tab-pane[id^="CarCompensationContentStep1Tab"]').removeClass("active");
        $('#CarCompensationContentStep1Tab1').addClass("active");
    }
    if (step === "CarCompensationContentStep2") {
        getAnhThumnail();
    }
    if (step == "CarCompensationContentStep3") {
        anHienTabThongTinChung(false);
    }
    if (step === "CarCompensationContentStep4") {
        var arr = ho_so_chi_tiet.data_info.dvi_nhan_hdon;
        _frmTinhToanBoiThuong.getControl("dvi_nhan").setDataSource(arr, "ten_dvi_nhan", "dvi_nhan", "Chọn đơn vị nhận hóa đơn", "");
        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
        _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
            ho_so_chi_tiet = res;
            ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;

            $(".lblBHMienThuong").html("Miễn thường (gồm VAT)/vụ");
            if (ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != undefined &&
                ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != null &&
                ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat == 'K') {
                $(".lblBHMienThuong").html("Miễn thường (chưa VAT)/vụ");
            }

            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
            _frmTinhToanBoiThuong.getControl("dvi_nhan").setValue(ho_so_chi_tiet.data_info.ho_so.dvi_nhan_hdon);
            _frmTinhToanBoiThuong.getControl("dvi_nhan").trigger("select2:select");

            var arrDanhGiaBTV = ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault();
            $("#divInputBoiThuongVienDanhGia").removeClass("bg-danh-gia");
            $("#divInputBoiThuongVienDanhGia").val("Bồi thường viên chưa đánh giá");
            $("#divInputBoiThuongVienDanhGia").addClass("bg-chua-dg");

            if (arrDanhGiaBTV != null && arrDanhGiaBTV.trang_thai == "D") {
                $("#divInputBoiThuongVienDanhGia").val("Đã thực hiện đánh giá");
                $("#divInputBoiThuongVienDanhGia").removeClass("bg-chua-dg");
                $("#divInputBoiThuongVienDanhGia").addClass("bg-danh-gia");
            }

            var ds_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong;
            if (ds_doi_tuong != undefined && ds_doi_tuong != null && ds_doi_tuong.where(n => n.nhom != 'NGUOI').length == 0) {
                $("#btnCarCompensationContentStep4_FwdApproval").removeClass("d-none");
            }
        });

        //Mở rộng tab
        anHienTabThongTinChung(false);
        //Cho table vật chất xe 100%
        $('#CarCompensationContent4Tab .nav-link').removeClass("active").first().addClass("active");
        $('.tab-pane[id^="CarCompensationContentStep4Tab"]').removeClass("active");
        $('#CarCompensationContentStep4Tab1').addClass("active");
        $("#de_xuat").val("");
        $("#danh_gia").val("");
        $(".inputSearchHangMucTinhToan").val("");
        if (ho_so_chi_tiet.data_info.lh_nv.length > 0) {
            xemTinhToanNghiepVu(ho_so_chi_tiet.data_info.lh_nv[0].ma);
        }
        else {
            xemTinhToanNghiepVu("");
        }
    }
    return;
}
function kiemTraStep(step) {
    if (step === "CarCompensationContentStep2" || step === "CarCompensationContentStep3" || step === "CarCompensationContentStep4" || step === "CarCompensationContentStep5") {
        if (ho_so_chi_tiet.data_info.ho_so.ngay_nhan_hs >= 30000101) {
            _notifyService.error("Hồ sơ chưa kết thúc giám định");
            return false;
        }
    }
    return true;
}
function layDuLieuBangTinhToan() {
    var otArr = [];
    $('tbody#tblStep4 tr').each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("name");
                if ($(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/^\d{3}\.\d{2}$/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        if (JSON.stringify(json) != '{}') {
            otArr.push(json);
        }
    });
    return otArr;
}
function tinhToan(el) {
    var mien_thuong_vutt = _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").val();
    var so_vu = _frmTinhToanBoiThuong.getControl("so_vu_tt").val();
    if (mien_thuong_vutt == undefined || mien_thuong_vutt == null || mien_thuong_vutt == "" || mien_thuong_vutt < 0) {
        mien_thuong_vutt = 0;
        _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").setValue("0");
    }
    if (so_vu == undefined || so_vu == null || so_vu == "" || so_vu < 0) {
        so_vu = 1;
        _frmTinhToanBoiThuong.getControl("so_vu_tt").setValue("1");
    }
    mien_thuong_vutt = parseFloat(mien_thuong_vutt.replace(/[^0-9]+/g, ''));
    so_vu = parseFloat(so_vu.replace(/[^0-9]+/g, ''));
    var tong_mien_thuong = mien_thuong_vutt * so_vu;
    _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(ESUtil.formatMoney(tong_mien_thuong));

    var data = _frmTinhToanBoiThuong.getJsonData();
    data.lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == data.lh_nv).firstOrDefault();
    //Vật chất xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        ganDuLieuTinhToanVCX(el);
        data.arr = layDuLieuTinhToanVCX();
    }
    //Người ngồi trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanNNTX(el);
        data.arr = layDuLieuTinhToanNNTX();
    }
    //Hàng hóa trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        ganDuLieuTinhToanHANGHOA(el);
        data.arr = layDuLieuTinhToanHANGHOA();
    }
    //TNDS về người
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanTNDSNGUOI(el);
        data.arr = layDuLieuTinhToanTNDSNGUOI();
    }
    //TNDS về hành khách
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
        ganDuLieuTinhToanTNDSNGUOI_HK(el);
        data.arr = layDuLieuTinhToanTNDSNGUOI_HK();
    }
    //Bảo hiểm lái phụ xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
        ganDuLieuTinhToanLPHU_XE(el);
        data.arr = layDuLieuTinhToanLPHU_XE();
    }
    //TNDS về tài sản
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        ganDuLieuTinhToanTNDSTAISAN(el);
        ganDuLieuTinhToanVCX(el);
        data.arr = layDuLieuTinhToanTNDSTAISAN();
        var nhom = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-nhom");
        var doi_tuong = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-doi-tuong");
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
    data.thue = thue;
    /*    data.thue = 0;*/
    _service.tinhPABoiThuong(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var objTinhToan = res.data_info;
        hienThiTong(objTinhToan);
        //Vật chất xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
            $("#tblTinhToanVCXTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanVCXTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanVCXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));

            $("#tblTinhToanVCXTienDuyetGiamGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
            $("#tblTinhToanVCXTienDuyetGiamGia_T").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
            $("#tblTinhToanVCXTienKhauTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_ktru_bao_hiem));
            $("#tblTinhToanVCXThue").html(ESUtil.formatMoney(objTinhToan.kq.tien_thue));
        }
        //Hàng hóa trên xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            $("#tblTinhToanHANGHOATienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanHANGHOATienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanHANGHOATienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //Người ngồi trên xe
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
            $("#tblTinhToanNNTXTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanNNTXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về người
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#tblTinhToanTNDS_NGUOITienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanTNDS_NGUOITienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về hành khách
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#tblTinhToanTNDS_NGUOI_HKTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanTNDS_NGUOI_HKTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
            $("#tblTinhToanLPHU_XETienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanLPHU_XETienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
        }
        //TNDS về tài sản
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $("#tblTinhToanTNDS_TAISANTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
            $("#tblTinhToanTNDS_TAISANTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
            $("#tblTinhToanTNDS_TAISANTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
            var nhom = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-nhom");
            var doi_tuong = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-doi-tuong");
            var arr = chuanHoaNVCTTinhToan(layDuLieuTinhToanTNDSTAISAN(), nhom, doi_tuong);
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
function bindEditChungTu() {
    $(".edit_chung_tu").click(function () {
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmCarCompensationAddInvoice.setData(data);
        $('#CarCompensationAddInvoice').modal("show");
    });
    $(".xoaChungTu").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = _frmCarCompensationAddInvoice.getControl("so_id").getValue();
            _service.xoaChungTuBoiThuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _notifyService.success("Xóa chứng từ thành công.");
            });
        });
    });
}
function bindEditThuHuong() {
    $(".edit_thu_huong").click(function () {
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmCarCompensationAddBenefit.setData(data);
        _frmCarCompensationAddBenefit.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
        $('#CarCompensationAddBenefit').modal("show");
    });
    $(".xoaNguoiThuHuong").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = _frmCarCompensationAddBenefit.getControl("so_id").getValue();
            _service.xoaThongTinNguoiThuHuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _notifyService.success("Xóa người thụ hưởng thành công.");
            });
        });
    });
}
function initScrollableTable(id) {
    //var $table = $('table.fixed-header#'+id);
    var $table = $('#' + id).closest("table");

    $table.find('thead').css("display", "");
    $table.find('tbody').css("display", "");
    $table.find('thead tr').children().each(function (i, v) {
        $(v).css("width", '');
    });
    $table.find('tbody tr').children().each(function (i, v) {
        $(v).css("width", '');
    });

    var $bodyCells = $table.find('thead tr:first').children();
    var colWidth;
    colWidth = $bodyCells.map(function () {
        var width = $(this).actual('width', { display: 'inline-block' });
        return width;
        //return $(this).actual('width');
    }).get();
    $table.find('thead').css("display", "block");
    $table.find('tbody').css("display", "block");
    $table.find('thead tr').children().each(function (i, v) {
        $(v).width(colWidth[i]);
    });
    $table.find('tbody tr').children().each(function (i, v) {
        $(v).width(colWidth[i]);
    });
}
function showPopover(id) { }
function xoaHoSoGiayTo(ma_hs) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa hồ sơ, giấy tờ này không?", "", val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            ma_hs: ma_hs
        };
        _carClaimCommonService.xoaHoSoGiayTo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa dữ liệu thành công");
            layLaiDsHoSoGiayTo();
        });
    });
}
function layLaiDsHoSoGiayTo() {
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac
    };
    _carClaimCommon.layDanhSachLoaiHsGiayTo(obj, res => {
        ho_so_chi_tiet.data_info.ho_so_giay_to = res.data_info;
        loadDanhSachHoSoGiayTo();
    });
}
function loadDanhSachHoSoGiayTo() {
    ESUtil.genHTML("tblStep1_HoSoGiayTo_template", "CarCompensationContentStep1HoSoGiayTo", { ho_so_giay_to: ho_so_chi_tiet.data_info.ho_so_giay_to });
    ESUtil.genHTML("tblStep4_HoSoGiayTo_template", "CarCompensationContentStep4HoSoGiayTo", { ho_so_giay_to: ho_so_chi_tiet.data_info.ho_so_giay_to });
}
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function luuPhanHangMuc(callback = undefined) {
    var hanh_dong = _frmThemHMTT.getControl("hanh_dong").val();
    _frmThemHMTT.clearErrorMessage();
    var loai = _frmThemHMTT.getControl("loai").val();
    var so_id_doi_tuong = _frmThemHMTT.getControl("so_id_doi_tuong").val();
    var hang_muc = _frmThemHMTT.getControl("hang_muc").attr("complete-val");
    if (hang_muc === undefined || hang_muc === null) {
        hang_muc = "";
    }
    if (loai === "") {
        _frmThemHMTT.isValid();
        return;
    }
    if (loai === "TL" || loai == "TT") {
        if (hang_muc === "") {
            _frmThemHMTT.setError("hang_muc");
            return;
        }
        if (hanh_dong === "them_moi") {
            _service.phanLoaiHangMucTonThat({
                pm: CONSTANT_PM,
                loai: loai,
                hang_muc: hang_muc,
                so_id_doi_tuong: so_id_doi_tuong,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                bt: getImageSelect(),
                ghi_chu: _frmThemHMTT.getControl("ghi_chu").val()
            }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(res => { });
                layLaiDsHoSoGiayTo();
                if (callback) {
                    callback();
                }
                _notifyService.success("Lưu thông tin thành công");
            });
        }
    }
}
function bindDataChuyenNguoiXuLy(ma_doi_tac, so_id) {
    _frmChuyenNguoiXuLy.getControl("ma_doi_tac").val(ma_doi_tac);
    _frmChuyenNguoiXuLy.getControl("so_id").val(so_id);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").setValue("");
    _frmChuyenNguoiXuLy.getControl("nsd_moi").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}
function ganTrangThaiHoSo(res = undefined) {
    if (!AN_HIEN_TRANG_THAI_HO_SO) {
        $(".escs_pquyen").removeClass("d-none");
        return;
    }
    if (res !== undefined &&
        res.out_value !== undefined &&
        res.out_value !== null &&
        res.out_value.trang_thai_out &&
        ho_so_chi_tiet !== undefined &&
        ho_so_chi_tiet !== null &&
        ho_so_chi_tiet.data_info !== undefined &&
        ho_so_chi_tiet.data_info !== null &&
        ho_so_chi_tiet.data_info.ho_so !== undefined &&
        ho_so_chi_tiet.data_info.ho_so !== null &&
        ho_so_chi_tiet.data_info.ho_so.ma_trang_thai !== undefined) {

        ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
        var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
        if (trang_thai != null) {
            ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
        }
        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
    }
    if (ho_so_chi_tiet !== undefined && ho_so_chi_tiet !== null) {
        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
    }
}
function xemChiTietAnhHangMucGT(ma_doi_tac, so_id, ma_hs) {
    $("#divViewImages").html("");
    getAnhThumnailView(ma_hs, (res) => {
        if (res.data_info.length <= 0) {
            _notifyService.error("Không có ảnh hiển thị");
            return;
        }
        $("#modalViewImagesContent").attr("style", "height:450px;");
        _modalViewImages.setTitle("Thông tin hồ sơ giấy tờ");
        $("#modalViewImagesThongTinChiTiet").hide();
        ESUtil.genHTML("templateItemViewImage", "modalViewImagesContentList", res);
        _modalViewImages.show();
    });
}
function xemChiTietAnhHangMucTT(vu_tt, hang_muc, so_id, ma_chi_nhanh, ma_doi_tac) {
    $("#divViewImages").html("");
    getAnhThumnailView(hang_muc, (res) => {
        if (res.data_info.length <= 0) {
            _notifyService.error("Không có ảnh hiển thị");
            return;
        }
        var hm = ho_so_chi_tiet.data_info.danh_gia_gd.where(n => n.hang_muc === hang_muc && n.ma_doi_tac === ma_doi_tac).firstOrDefault();
        switch (hm.loai) {
            case "TT":
                hm.loai_ten = "Tổn thất";
                break;
            case "TL":
                hm.loai_ten = "Giấy tờ, tài liệu";
                break;
            case "TL":
                hm.loai_ten = "Toàn cảnh, hiện trường";
                break;
            default:
                hm.loai_ten = "Không xác định";
                break;
        }
        var lhnv = objDanhMuc.lhnv.where(n => n.ma === hm.lh_nv && n.ma_doi_tac === ma_doi_tac).firstOrDefault();
        hm.lhnv_ten = lhnv == null ? "" : lhnv.ten;
        switch (hm.thay_the_sc) {
            case "T":
                hm.thay_the_sc_ten_hthi = "Thay thế";
                break;
            case "S":
                hm.thay_the_sc_ten_hthi = "Sửa chữa";
                break;
            default:
                hm.thay_the_sc_ten_hthi = "Không xác định";
                break;
        }
        switch (hm.chinh_hang) {
            case "C":
                hm.chinh_hang_hthi = "Chính hãng";
                break;
            case "K":
                hm.chinh_hang_hthi = "Sửa chữa ngoài";
                break;
            default:
                hm.chinh_hang_hthi = "Không xác định";
                break;
        }
        var vu_tt = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma === hm.vu_tt).firstOrDefault();
        hm.vu_tt_ten = vu_tt == null ? "" : vu_tt.ten;
        switch (hm.thu_hoi) {
            case "C":
                hm.thu_hoi_ten = "Có";
                break;
            case "K":
                hm.thu_hoi_ten = "Không";
                break;
            default:
                hm.thu_hoi_ten = "Không xác định";
                break;
        }

        $("#modalViewImagesContent").attr("style", "height:570px;");
        $("#modalViewImagesThongTinChiTiet").css("margin-bottom", "15px");
        $("#modalViewImagesThongTinChiTiet").show();
        ESUtil.genHTML("templateChiTietHangMuc", "modalViewImagesThongTinChiTiet", hm);
        ESUtil.genHTML("templateItemViewImage", "modalViewImagesContentList", res);
        _modalViewImages.setTitle("Thông tin đánh giá tổn thất");
        _modalViewImages.show();
    });
}
function getAnhThumnailView(ma_file, callback = undefined) {
    var _carInvestigationService = new CarInvestigationService();
    _carInvestigationService.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        ma_file: ma_file
    }).then(res => {
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
function xemAnh(so_id, bt) {
    var _commonService = new CommonService();
    _commonService.layAnhChiTiet({ so_id: so_id, bt: bt }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info === null) {
            return;
        }
        var ext = res.data_info.extension;
        if (ext === ".jpg" || ext === ".jpeg" || ext === ".png" || ext === ".gif") {
            var image = $("<img class='img-fluid' style='max-height: 410px' />");
            image.attr("src", "data:image/png;base64," + res.data_info.duong_dan);
            $("#divViewImages").html(image);
        }
    });
}
function doiChieuGPLX(strObjOCR) {
    var data = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma != undefined);
    var arrDT = ho_so_chi_tiet.data_info.ds_doi_tuong;
    if (arrDT.length <= 0) {
        _notifyService.error("Không xác định đối tượng tổn thất");
        return;
    }
    if (data.length <= 0) {
        _notifyService.error("Không xác định vụ tổn thất");
        return;
    }
    var data = data.clone();
    var arrHT = [];
    for (var i = 0; i < data.length; i++) {
        arrHT.push({ ma: data[i].ma, ten: data[i].ten })
    }
    if (arrDT !== null && arrDT.length > 0) {
        var doi_tuong = [];
        for (var i = 0; i < arrDT.length; i++) {
            if ((arrDT[i].nhom == "XE") || (arrDT[i].nhom == "TAI_SAN" && arrDT[i].loai == "XE")) {
                doi_tuong.push({ ma: arrDT[i].so_id_doi_tuong, ten: arrDT[i].ten_doi_tuong });
            }
        }
        if (doi_tuong.length == 1) {
            _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", doi_tuong[0].ma);
        } else {
            _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", "");
        }
    }
    _frmCarClaimCompareDataGPLX.getControl("json_ocr").val(strObjOCR);
    _frmCarClaimCompareDataGPLX.getControl("bt").val(JSON.parse(strObjOCR).bt);
    _frmCarClaimCompareDataGPLX.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", arrHT[0].ma);
    _frmCarClaimCompareDataGPLX.getControl("vu_tt").trigger("select2:select");
    _modalCarClaimCompareDataGPLX.show();
    $("#gplx_item_tat_ca").prop("checked", true);
    $("#gplx_item_tat_ca").trigger("change");
}
function doiChieuDangKiem(strObjOCR) {
    var data = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma != undefined);
    if (data.length <= 0) {
        _notifyService.error("Không xác định vụ tổn thất");
        return;
    }
    var arrDT = ho_so_chi_tiet.data_info.ds_doi_tuong;
    if (arrDT.length <= 0) {
        _notifyService.error("Không xác định đối tượng tổn thất");
        return;
    }
    var data = data.clone();
    var arrHT = [];
    for (var i = 0; i < data.length; i++) {
        arrHT.push({ ma: data[i].ma, ten: data[i].ten })
    }
    if (arrDT !== null && arrDT.length > 0) {
        var doi_tuong = [];
        for (var i = 0; i < arrDT.length; i++) {
            if ((arrDT[i].nhom == "XE") || (arrDT[i].nhom == "TAI_SAN" && arrDT[i].loai == "XE")) {
                doi_tuong.push({ ma: arrDT[i].so_id_doi_tuong, ten: arrDT[i].ten_doi_tuong });
            }
        }
        if (doi_tuong.length == 1) {
            _frmCarClaimCompareDataDangKiem.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", doi_tuong[0].ma);
        } else {
            _frmCarClaimCompareDataDangKiem.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", "");
        }
    }
    _frmCarClaimCompareDataDangKiem.getControl("json_ocr").val(strObjOCR);
    _frmCarClaimCompareDataDangKiem.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", arrHT[0].ma);
    _frmCarClaimCompareDataDangKiem.getControl("vu_tt").trigger("select2:select");
    _modalCarClaimCompareDataDangKiem.show();
    $("#dk_item_tat_ca").prop("checked", true);
    $("#dk_item_tat_ca").trigger("change");
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
function anHienNutDuyetPA(phan_cap = "K") {
    $("#btnDuyetBaoGiaGara").hide();
    $("#btnTuChoiBT").hide();
    $("#btnHuyDuyetBaoGiaGara").hide();

    $("#btnDuyetPAVCX").hide();
    $("#btnHuyDuyetPAVCX").hide();
    var count_lhnv = ho_so_chi_tiet.data_info.lh_nv.length;
    var vcx = ho_so_chi_tiet.data_info.lh_nv.where(n => n.doi_tuong == DOI_TUONG_TT.XE).firstOrDefault();
    if (ho_so_chi_tiet.data_info.ho_so.ma_trang_thai == "HSBT_XE_BT_NHAN_HS") {
        if (phan_cap == "C") {
            $("#btnDuyetBaoGiaGara").show();
            $("#btnTuChoiBT").show();
            if (count_lhnv == 1 && vcx != null) {
                $("#btnDuyetPAVCX").show();
            }
        }
    }
    if (ho_so_chi_tiet.data_info.ho_so.ma_trang_thai == "HSBT_XE_BT_DUYET_GIA") {
        if (phan_cap == "C") {
            $("#btnHuyDuyetBaoGiaGara").show();
            if (count_lhnv == 1 && vcx != null) {
                $("#btnHuyDuyetPAVCX").show();
            }
        }
    }
}
function chonGaraDuyet(el) {
    var $box = $(el);
    var old_value = $("input:checkbox[name='chon_bao_gia']:checked").val();
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    var json = {};
    json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    json.gara = $box.data("gara");
    json.bt_gara = $box.val();
    json.lh_nv = ho_so_chi_tiet.data_info.lh_nv.where(n => n.nhom == NHOM_LHNV.XE).firstOrDefault().ma;
    if ($box.is(":checked")) {
        $(group).prop("checked", false);
        $box.prop("checked", true);
        json.chon = 'D';
    } else {
        $(group).prop("checked", false);
        json.chon = 'C';
    }

    _service.chonBaoGia(json).then(res => {
        if (res.state_info.status == "OK") {
            objChonDuyetBaoGiaCT = res.data_info;
            var ma_doi_tac = _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue();
            var so_id = _frmTinhToanBoiThuong.getControl("so_id").getValue();
            reloadPhuongAnKhacPhuc(ma_doi_tac, so_id);
            $(".btnSuaBaoGia").show();
            $(".xoaBaoGia").show();
            if (json.chon == 'D') {
                $(".btnSuaBaoGia[data-gara='" + json.gara + "']").hide();
                $(".xoaBaoGia[data-gara='" + json.gara + "']").hide();

            }
            var objGetDetail = { ma_doi_tac: json.ma_doi_tac, so_id: json.so_id };
            _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                tongHopTienPhuongAn();
                xemChiTietDTTonThat(json.lh_nv);
            });
        } else {
            $(group).prop("checked", false);
            $("input:checkbox[name='chon_bao_gia'][value='" + old_value + "']").prop("checked", true);
        }
    });
}
function xemBaoGiaCT(el, trang_thai = undefined, lien_ket_bg = undefined, trang_thai_bg = undefined, ngay_ycsc = undefined) {
    arrBaoGiaGara = [];
    $("#btnYeuCauSuaChua").addClass("d-none");
    $("#garaBaoGia tr").removeClass("selected");
    $(el).parent().addClass("selected");
    $("#btnKetThucBaoGia").addClass("d-none");
    $("#btnHuyKetThucBaoGia").addClass("d-none");
    $(".layBaoGiaCT").closest('tr').removeClass('table-primary');
    $(el).closest('tr').addClass("table-primary");
    var bt_gara = $(el).data("bt_gara");
    var gara = $(el).data("gara");
    var so_id_doi_tuong = $(el).data("so_id_doi_tuong");

    _frmSelectedGara.getControl("bt_gara").setValue(bt_gara);
    _frmSelectedGara.getControl("gara").setValue(gara);

    $(".tinhToanBGGiaTriXe").html("0");
    $(".tinhToanBGSoTienBH").html("0");
    $(".tinhToanBGTyLeBH").html("0");
    $(".tinhToanBGTyLeTonThat").html("0");
    $("#tinhToanBGBoiThuongToanBo").addClass("d-none");

    var json = _frmThemGara.getJsonData();
    json.bt_gara = bt_gara;
    json.gara = gara;
    json.so_id_doi_tuong = so_id_doi_tuong;
    objBaoGiaChiTiet = json;
    _service.layGaraBaoGiaCT(json).then(res => {
        arrBaoGiaGara = res.data_info.gara_ct;
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#btnThemHangMucGaraBao").removeClass("d-none");

        if (res.data_info.gara.ngay_dong_bg >= 30000101) {
            $("#btnKetThucBaoGia").removeClass("d-none");
        }
        else {
            $("#btnHuyKetThucBaoGia").removeClass("d-none");
        }
        ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: res.data_info.gara_ct }, () => {
            bindEventBaoGiaCT();
        });

        if (res.data_info.tl_boi_thuong.gia_tri_xe > 0 && res.data_info.tl_boi_thuong.so_tien_bh > 0) {
            $(".tinhToanBGGiaTriXe").html(ESUtil.formatMoney(res.data_info.tl_boi_thuong.gia_tri_xe));
            $(".tinhToanBGSoTienBH").html(ESUtil.formatMoney(res.data_info.tl_boi_thuong.so_tien_bh));
            $(".tinhToanBGTyLeBH").html(res.data_info.tl_boi_thuong.ty_le_bh + '%');
            $(".tinhToanBGTyLeTonThat").html(res.data_info.tl_boi_thuong.ty_le_tt ?? "0" + '%');
            $("#tinhToanBGHienThi").css('display', 'display');
            if (res.data_info.tl_boi_thuong.ty_le_tt >= 75) {
                $("#tinhToanBGBoiThuongToanBo").removeClass("d-none");
            }
        }
        else {
            $("#tinhToanBGHienThi").css('display', 'none');
        }
    });
}
function nhapChiTietTNDS(hang_muc) {
    var obj = _frmThongTinGiamDinh.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.pm = CONSTANT_PM;
    obj.hang_muc = hang_muc;

    _service.layTNDS(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (hang_muc == "TAI_SAN" || hang_muc == "TN_TAI_SAN") {
            ESUtil.genHTML("modalThemTNDS_template", "modalThemTNDS_body", { lstTNDS: res.data_info }, () => {
                $("#modalThemTNDS_body input.sl").removeAttr("readonly");
                _frmThemTNDS.getControl("ma_doi_tac").setValue(obj.ma_doi_tac);
                _frmThemTNDS.getControl("so_id").setValue(obj.so_id);
                _frmThemTNDS.getControl("hang_muc").setValue(obj.hang_muc);
                _frmThemTNDS.getControl("pm").setValue(obj.pm);
                $('#modalThemTNDS_body select.select2').select2();
                $("#modalThemTNDS_body .remove_config").click(function () {
                    _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?", "", () => {
                        $(this).closest("tr").remove();
                    });
                });
                _modalThemChiTietTNDS.show();
            });

        }
        if (hang_muc == "NGUOI" || hang_muc == "TN_NGUOI") {
            ESUtil.genHTML("modalThemTNDSNguoi_template", "modalThemTNDSNguoi_body", { lstTNDS: res.data_info }, () => {
                $("#modalThemTNDSNguoi_body input.sl").removeAttr("readonly");
                _frmThemTNDSNguoi.getControl("ma_doi_tac").setValue(obj.ma_doi_tac);
                _frmThemTNDSNguoi.getControl("so_id").setValue(obj.so_id);
                _frmThemTNDSNguoi.getControl("hang_muc").setValue(obj.hang_muc);
                _frmThemTNDSNguoi.getControl("pm").setValue(obj.pm);
                $('#modalThemTNDSNguoi_body select.select2').select2();
                $("#modalThemTNDSNguoi_body .remove_config").click(function () {
                    _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?", "", () => {
                        $(this).closest("tr").remove();
                    });
                });
                _modalThemChiTietTNDSNguoi.show();
            });

        }
    });
}
function suaVatTuThuHoi(bt) {
    _frmThuHoiVatTu.clearErrorMessage();
    var obj = ho_so_chi_tiet.data_info.thu_hoi.where(n => n.bt == bt).firstOrDefault();
    _frmThuHoiVatTu.setData(obj);
    _modalThuHoiVatTu.show();
}
function suaThuDoiNTBA(bt) {
    _frmThuDoiNTBA.clearErrorMessage();
    var obj = ho_so_chi_tiet.data_info.ntba.where(n => n.bt == bt).firstOrDefault();
    _frmThuDoiNTBA.setData(obj);
    _modalThuDoiNTBA.show();
}
function onClickGDChiTiet(el, obj) {
    if ($(el).is(":checked")) {
        gd_chon_anh_arr.push(obj);
    } else {
        gd_chon_anh_arr = $.grep(gd_chon_anh_arr, function (e) {
            return e.bt != obj.bt;
        });
    }
    if (gd_chon_anh_arr.length > 0) {
        gd_anh_chon_cuoi = gd_chon_anh_arr[gd_chon_anh_arr.length - 1];
    }
}
function xoaVatTuThuHoi(ma_doi_tac, so_id, bt) {
    _notifyService.confirmDelete("Bạn có chăc chắn muốn xóa vật tư thu hồi này không?", "", val => {
        _service.xoaVatTuThuHoi({
            ma_doi_tac: ma_doi_tac,
            so_id: so_id,
            bt: bt
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ho_so_chi_tiet.data_info.thu_hoi = ho_so_chi_tiet.data_info.thu_hoi.removeItem(n => n.bt == bt);
            ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", ho_so_chi_tiet.data_info);
            tinhTongTienThuHoiVatTu();
            _notifyService.success("Xóa thông tin thành công");
        });
    });
}
function xoaThuDoiNTBA(ma_doi_tac, so_id, bt) {
    _notifyService.confirmDelete("Bạn có chăc chắn muốn xóa thu đòi người thứ 3 này không?", "", val => {
        _service.xoaNTBA({
            ma_doi_tac: ma_doi_tac,
            so_id: so_id,
            bt: bt
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ho_so_chi_tiet.data_info.ntba = ho_so_chi_tiet.data_info.ntba.removeItem(n => n.bt == bt);
            ESUtil.genHTML("tableDanhSachThuDoiNTBA_template", "tableDanhSachThuDoiNTBA", ho_so_chi_tiet.data_info);
            tinhTongTienThuDoiNTBA();
            _notifyService.success("Xóa thông tin thành công");
        });
    });
}
function xemGhiChuHangMuc(bt) {
    var obj = ho_so_chi_tiet.data_info.danh_gia_gd.where(n => n.bt == bt).firstOrDefault();
    $("#divXemGhiChuGD").val(obj.ghi_chu);
}
function loadTamUng() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    };
    _service.layTamUng(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet.data_info.tam_ung = res.data_info;
        initTamUng(ho_so_chi_tiet);
    });
}
function luuTamUng(callback = undefined) {
    var data = _frmCarCompensationAdvance.getJsonData();
    if (_frmCarCompensationAdvance.isValid()) {
        _service.luuTamUng(data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadTamUng();
            _frmCarCompensationAdvance.getControl("so_id_tu").setValue(res.out_value.so_id_tu);
            _notifyService.success("Lưu thông tin thành công");
            if (callback) {
                callback(res);
            }
        });
    }
}
function xoaTamUng(so_id_tu) {
    _notifyService.confirmDelete("Bạn có chắc chắc muốn xóa yêu cầu tạm ứng này không?", "", () => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            so_id_tu: so_id_tu
        };
        _service.xoaTamUng(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadTamUng();
            _notifyService.success("Xóa thông tin thành công");
        });
    });
}
function xemCtietTamUng(so_id_tu) {
    anHienQTXL(false);
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_tu: so_id_tu
    };
    _service.xemCtietTamUng(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmCarCompensationAdvance.resetForm();
        _frmCarCompensationAdvance.clearErrorMessage();
        _frmCarCompensationAdvance.setData(res.data_info.tam_ung);
        _frmCarCompensationAdvance.getControl("ma_nh").trigger("select2:select");
        _frmCarCompensationAdvance.getControl("ma_cnhanh_nh").setValue(res.data_info.tam_ung.ma_cnhanh_nh);
        _modalCarCompensationAdvance.show();
    });
}
function danhGiaThuongTat(el) {
    fnLoadTreeTLTT(objDanhMuc.ds_tltt);
    elementDanhGia = el;
    var data = $(el).attr("data-val");
    if (data == undefined || data == null)
        data = "";
    var arr_chon = data.split(",");
    $("#treeTLTT").jstree(true).uncheck_all();
    for (var i = 0; i < arr_chon.length; i++) {
        $("#treeTLTT").jstree(true).check_node(arr_chon[i]);
    }
    $("#btnChuyenXemDanhSach").attr("data-chon", "1");
    _popoverTyLeThuongTat.show();
}
function fnLoadTreeTLTT(json_data) {
    var id = "treeTLTT";
    $('#' + id)
        //.on('search.jstree', function (nodes, str, res) {
        //    if (str.nodes.length === 0) {
        //        $('#' + id).jstree(true).hide_all();
        //    }
        //})
        .on('loaded.jstree', function () {
            $('#' + id).jstree('open_all');
        })
        .jstree({
            "core": {
                'multiple': false,
                "animation": 0,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: false },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "types": {
                "file": {
                    "icon": "glyphicon glyphicon-file",
                }
            },
            "plugins": [
                "dnd", "types", "search", "checkbox"
            ]
        });
}
function chuanHoaDuLieuTreeTLTT(arr) {
    if (arr == undefined || arr == null) {
        return [];
    }
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].pt_tu != null && arr[i].pt_toi != null) {
            if (arr[i].pt_tu == arr[i].pt_toi) {
                arr[i].text = arr[i].text + " (" + arr[i].pt_tu + "%)";
            }
            else {
                arr[i].text = arr[i].text + " (" + arr[i].pt_tu + " - " + arr[i].pt_toi + "%)";
            }
        }
        else {
            arr[i].state = { checkbox_disabled: true };
            arr[i].a_attr = { class: "no_checkbox" };
        }
    }
    return arr;
}
function chuyenXemDanhSach(el) {
    var chon = $(el).attr("data-chon");
    if (chon == "1") {
        //chuyển chế độ xem
        var checkedNodes = $("#treeTLTT").jstree(true).get_selected(true);
        var arr = [];
        for (var i = 0; i < checkedNodes.length; i++) {
            arr.push({
                id: checkedNodes[i].id,
                text: checkedNodes[i].text,
                parent: "#",
                a_attr: { class: "no_checkbox" }
            });
        }
        $("#treeTLTT").jstree(true).settings.core.data = arr;
        $("#treeTLTT").jstree(true).refresh();
        $(el).attr("data-chon", "0");
    }
    if (chon == "0") {
        $("#treeTLTT").jstree(true).settings.core.data = objDanhMuc.ds_tltt;
        $("#treeTLTT").jstree(true).refresh();
        danhGiaThuongTat(elementDanhGia);
        $("#treeTLTT").jstree('open_all');
    }
}
function getDataTreeTLTT() {
    var arr = $("#treeTLTT").jstree("get_selected");
    if (arr == undefined || arr == null || arr.length <= 0) {
        return "";
    }
    return arr.join();
}
function chonGaraBaoGia(gara) {
    var checked = $("#garaBaoGia input[name='chuyen_bao_gia_gara']:checked").length;
    if (checked > 0) {
        $("#btnChuyenBaoGia").removeClass("d-none");
    }
    else {
        $("#btnChuyenBaoGia").addClass("d-none");
    }
}
function layDuLieuTableBaoGia() {
    var otArr = [];
    $('#modalBaoGiaGara_lan_ct tr').each(function (e) {
        var obj = {
            hang_muc: $(this).attr("data-hang-muc"),
            tien_dx_gara: "",
            so_luong: "",
            tien_vtu: "",
            tien_nhan_cong: "",
            tien_khac: "",
            ghi_chu: ""
        };
        var td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                if ($(this).hasClass("tien_dx_gara")) {
                    obj["tien_dx_gara"] = $(this).val().replace(/[^0-9]+/g, '');
                }

                if ($(this).hasClass("so_luong")) {
                    obj["so_luong"] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("tien_vtu")) {
                    obj["tien_vtu"] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("tien_nhan_cong")) {
                    obj["tien_nhan_cong"] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("tien_khac")) {
                    obj["tien_khac"] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("ghi_chu")) {
                    obj["ghi_chu"] = $(this).val();
                }
            });
        });
        otArr.push(obj);
    });
    return otArr;
}
function tinhTongTienBG() {
    var otArr = [];
    $('#modalBaoGiaGara_lan_ct tr').each(function (e) {
        var obj = {
            so_luong: 0,
            tien_vtu: 0,
            tien_nhan_cong: 0,
            tien_khac: 0,
            tong_cong: 0
        };
        var td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                if ($(this).hasClass("so_luong")) {
                    obj["so_luong"] = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                }
                if ($(this).hasClass("tien_vtu")) {
                    obj["tien_vtu"] = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                }
                if ($(this).hasClass("tien_nhan_cong")) {
                    obj["tien_nhan_cong"] = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                }
                if ($(this).hasClass("tien_khac")) {
                    obj["tien_khac"] = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                }
            });
        });
        obj.tong_cong = obj.so_luong * obj.tien_vtu + obj.tien_nhan_cong + obj.tien_khac;
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                if ($(this).hasClass("tien_dx")) {
                    $(this).val(ESUtil.formatMoney(obj.tong_cong));
                }
            });
        });
        otArr.push(obj);
    });

    var tongTienVatTu = 0;
    var tongTienCong = 0;
    var tongTongCong = 0;
    for (var i = 0; i < otArr.length; i++) {
        tongTienVatTu += otArr[i].tien_vtu;
        tongTienCong += otArr[i].tien_nhan_cong;
        tongTongCong += otArr[i].tong_cong;
    }
    $("#modalBaoGiaGaraTongTienVatTu").html(ESUtil.formatMoney(tongTienVatTu));
    $("#modalBaoGiaGaraTongTienCong").html(ESUtil.formatMoney(tongTienCong));
    $("#modalBaoGiaGaraTongTongCong").html(ESUtil.formatMoney(tongTongCong));

}
function xemChiTietBaoGiaGara(el, ma_gara, so_id_bg) {
    _frmBaoGiaGara.getControl("so_id_bg").setValue("");
    _frmBaoGiaGara.getControl("so_id_bg").setValue(so_id_bg);
    _frmBaoGiaGara.getControl("gara").setValue(ma_gara);

    layBaoGiaTuGara(ma_gara, res => {
        ESUtil.genHTML("modalBaoGiaGara_lan_template", "modalBaoGiaGara_lan", res.data_info);
        var lan = res.data_info.bg_lan[0];
        $(".modalBaoGiaGara_lan_item").removeClass("active");
        $("#modalBaoGiaGara_lan tr[data-lan='" + lan.lan_bg + "']").addClass("active");
        _frmBaoGiaGara.getControl("ten_nsd_gara").setValue(lan.ten_nsd_gara);
        _frmBaoGiaGara.getControl("dthoai_nsd_gara").setValue(lan.dthoai_nsd_gara);
        _frmBaoGiaGara.getControl("email_nsd_gara").setValue(lan.email_nsd_gara);
        _frmBaoGiaGara.getControl("trang_thai_bg_hthi").setValue(lan.trang_thai_bg_hthi);
        anHienNutBaoGia(lan.lan_bg);
        var bg = res.data_info.bg;
        $("#btnYeuCauSuaChua").addClass("d-none");
        if (bg.ngay_ktbg < 30000101 && bg.ngay_ycsc >= 30000101) {
            $("#btnYeuCauSuaChua").removeClass("d-none");
        }
        var hm = objBaoGiaGaraApi.bg_lan_ct.where(n => n.lan_bg == lan.lan_bg);
        ESUtil.genHTML("modalBaoGiaGara_lan_ct_template", "modalBaoGiaGara_lan_ct", { bg_lan_ct: hm }, () => {
            var tongTienVatTu = 0;
            var tongTienCong = 0;
            var tongTienKhac = 0;
            var tongTongCong = 0;

            var tongTienVatTuGara = 0;
            var tongTienCongGara = 0;
            var tongTienKhacGara = 0;
            var tongTongCongGara = 0;

            for (var i = 0; i < hm.length; i++) {
                tongTienVatTu += hm[i].tien_vtu;
                tongTienCong += hm[i].tien_nhan_cong;
                tongTienKhac += hm[i].tien_khac;
                tongTongCong += (hm[i].so_luong * hm[i].tien_vtu + hm[i].tien_nhan_cong + hm[i].tien_khac);

                tongTienVatTuGara += hm[i].tien_vtu_gara;
                tongTienCongGara += hm[i].tien_nhan_cong_gara;
                tongTienKhacGara += hm[i].tien_khac_gara;
                tongTongCongGara += (hm[i].so_luong_gara * hm[i].tien_vtu_gara + hm[i].tien_nhan_cong_gara + hm[i].tien_khac_gara);
            }

            $("#modalBaoGiaGaraTongTienVatTu").html(ESUtil.formatMoney(tongTienVatTu));
            $("#modalBaoGiaGaraTongTienCong").html(ESUtil.formatMoney(tongTienCong));
            $("#modalBaoGiaGaraTongTienKhac").html(ESUtil.formatMoney(tongTienKhac));
            $("#modalBaoGiaGaraTongTongCong").html(ESUtil.formatMoney(tongTongCong));

            $("#modalBaoGiaGaraTongTienVatTuGara").html(ESUtil.formatMoney(tongTienVatTuGara));
            $("#modalBaoGiaGaraTongTienCongGara").html(ESUtil.formatMoney(tongTienCongGara));
            $("#modalBaoGiaGaraTongTienKhacGara").html(ESUtil.formatMoney(tongTienKhacGara));
            $("#modalBaoGiaGaraTongTongCongGara").html(ESUtil.formatMoney(tongTongCongGara));
        });
        _modalBaoGiaGara.showWithPosition(el);
    });

}
function layBaoGiaTuGara(ma_gara, callback = undefined) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        gara: ma_gara
    }
    _service.layBaoGiaGara(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        objBaoGiaGaraApi = res.data_info;
        if (callback) {
            callback(res);
        }
    });
}
function xemChiTietLanBaoGia(el, lan_bg) {
    $(".modalBaoGiaGara_lan_item").removeClass("active");
    $(el).addClass("active");
    var lan = objBaoGiaGaraApi.bg_lan.where(n => n.lan_bg == lan_bg).firstOrDefault();
    _frmBaoGiaGara.getControl("ten_nsd_gara").setValue(lan.ten_nsd_gara);
    _frmBaoGiaGara.getControl("dthoai_nsd_gara").setValue(lan.dthoai_nsd_gara);
    _frmBaoGiaGara.getControl("email_nsd_gara").setValue(lan.email_nsd_gara);
    _frmBaoGiaGara.getControl("trang_thai_bg_hthi").setValue(lan.trang_thai_bg_hthi);
    anHienNutBaoGia(lan_bg);

    var hm = objBaoGiaGaraApi.bg_lan_ct.where(n => n.lan_bg == lan_bg);
    ESUtil.genHTML("modalBaoGiaGara_lan_ct_template", "modalBaoGiaGara_lan_ct", { bg_lan_ct: hm }, () => {
        var tongTienVatTu = 0;
        var tongTienCong = 0;
        var tongTienKhac = 0;
        var tongTongCong = 0;

        var tongTienVatTuGara = 0;
        var tongTienCongGara = 0;
        var tongTienKhacGara = 0;
        var tongTongCongGara = 0;

        for (var i = 0; i < hm.length; i++) {
            tongTienVatTu += hm[i].tien_vtu;
            tongTienCong += hm[i].tien_nhan_cong;
            tongTienKhac += hm[i].tien_khac;
            tongTongCong += (hm[i].so_luong * hm[i].tien_vtu + hm[i].tien_nhan_cong + hm[i].tien_khac);

            tongTienVatTuGara += hm[i].tien_vtu_gara;
            tongTienCongGara += hm[i].tien_nhan_cong_gara;
            tongTienKhacGara += hm[i].tien_khac_gara;
            tongTongCongGara += (hm[i].so_luong_gara * hm[i].tien_vtu_gara + hm[i].tien_nhan_cong_gara + hm[i].tien_khac_gara);
        }

        $("#modalBaoGiaGaraTongTienVatTu").html(ESUtil.formatMoney(tongTienVatTu));
        $("#modalBaoGiaGaraTongTienCong").html(ESUtil.formatMoney(tongTienCong));
        $("#modalBaoGiaGaraTongTienKhac").html(ESUtil.formatMoney(tongTienKhac));
        $("#modalBaoGiaGaraTongTongCong").html(ESUtil.formatMoney(tongTongCong));

        $("#modalBaoGiaGaraTongTienVatTuGara").html(ESUtil.formatMoney(tongTienVatTuGara));
        $("#modalBaoGiaGaraTongTienCongGara").html(ESUtil.formatMoney(tongTienCongGara));
        $("#modalBaoGiaGaraTongTienKhacGara").html(ESUtil.formatMoney(tongTienKhacGara));
        $("#modalBaoGiaGaraTongTongCongGara").html(ESUtil.formatMoney(tongTongCongGara));
    });
}
function anHienNutBaoGia(lan_bg) {
    $("#btnBGChapNhan").addClass("d-none");
    /*    $("#btnBGTuChoi").addClass("d-none");*/
    $("#btnBGYeuCauMoi").addClass("d-none");
    $("#btnBGLuu").addClass("d-none");
    $("#btnBGChuyenGara").addClass("d-none");
    var lan = objBaoGiaGaraApi.bg_lan.where(n => n.lan_bg == lan_bg).firstOrDefault();
    if (lan.trang_thai_yc == "YCBG" && lan.trang_thai_bg == "CBG") {
        $("#btnBGChapNhan").removeClass("d-none");
        $("#btnBGLuu").removeClass("d-none");
        $("#btnBGChuyenGara").removeClass("d-none");
        /*$("#btnBGTuChoi").removeClass("d-none");*/
    }
    if (lan.trang_thai_yc == "TCBG" && lan.trang_thai_bg == "CBG") {
        $("#btnBGYeuCauMoi").removeClass("d-none");
    }
    //if (lan.trang_thai_yc == "YCM" && lan.trang_thai_bg == "CN") {
    //    $("#btnBGLuu").removeClass("d-none");
    //    $("#btnBGChuyenGara").removeClass("d-none");
    //}
}
function chonKhachHangVip(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nhom_kh_vip: '',
        pm: CONSTANT_PM
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
function anHienGridTinhToan(doi_tuong) {
    _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
    _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(true);
    if (doi_tuong == DOI_TUONG_TT.XE) {
        _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(false);
    }
    if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        $(".ttpt_khau_hao").removeClass("d-none");
        $(".ttpt_bao_hiem").removeClass("d-none");
        $(".ttpt_giam_tru").removeClass("d-none");
    }
    if (doi_tuong == DOI_TUONG_TT.NGUOI) {
        $(".ttpt_giam_tru").removeClass("d-none");
    }
    if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        $(".ttpt_khau_hao").removeClass("d-none");
        $(".ttpt_giam_tru").removeClass("d-none");
    }
}
function hienThiGiaDuyet() {
    var arr = layDuLieuBangTinhToan();
    var tong = arr.sum(n => parseFloat(n.gia_duyet));
    $(".tien_duyet_gia").html(ESUtil.formatMoney(tong));
}
function xemTinhToanNghiepVu(lhnv) {
    arrTinhToanBoiThuong = [];
    $("#navNghiepVuTab4 li").removeClass("active");
    $("#navNghiepVuTab4 li[data-lhnv='" + lhnv + "']").addClass("active");
    $(".divTinhToanItem").addClass("d-none");
    $(".tinhToanTaiSan").addClass("d-none");
    $(".tinhToanXE").addClass("d-none");

    $(".tinhToanDviNhanHD").removeClass("d-none");
    $(".tinhToanDanhGia").removeClass("d-none");

    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
    if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    var chi_phi_khac = ho_so_chi_tiet.data_info.chi_phi_khac.where(n => n.lh_nv == lhnv).sum(n => n.so_tien);
    _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
    _frmTinhToanBoiThuong.getControl("khau_tru").setValue("K");
    _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(true);
    _frmTinhToanBoiThuong.getControl("tl_thue").setValue("THM");
    _frmTinhToanBoiThuong.getControl("thue").setValue("0");
    _frmTinhToanBoiThuong.getControl("giam_tru_khac").setValue("0");
    _frmTinhToanBoiThuong.getControl("chi_phi_khac").setValue(ESUtil.formatMoney(chi_phi_khac));

    /*Vật chất xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        $(".tinhToanXE").removeClass("d-none");
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NGUYEN_NHAN_GIAM_TRU");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        ESUtil.genHTML("divDKBS_template", "divDKBS", { dkbs: ho_so_chi_tiet.data_info.dkbs });
        _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(false);
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
        _frmTinhToanBoiThuong.getControl("khau_tru").setValue("K");
        $("#divTinhToanVCX").removeClass("d-none");
        if (lhnv == "") {
            return;
        }
    }
    /*Hàng hóa trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanHANGHOA").removeClass("d-none");
    }
    /*Người ngồi trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.NNTX) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanNNTX").removeClass("d-none");
    }
    /*TNDS về người*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanTNDS_NGUOI").removeClass("d-none");
    }
    /*TNDS về hành khách*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanTNDS_NGUOI_HK").removeClass("d-none");
    }
    /*TNDS về tài sản*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        $(".tinhToanTaiSan").removeClass("d-none");
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanTNDS_TAISAN").removeClass("d-none");
        /*Nếu nghiệp vụ là tài sản thì ăn theo trigger loai_ts*/
        //_frmTinhToanBoiThuong.getControl("loai_ts").setValue("KHAC");
        //_frmTinhToanBoiThuong.getControl("loai_ts").trigger("select2:select");

        var loai_ts = _frmTinhToanBoiThuong.getControl("loai_ts").val();
        if (loai_ts == null) {
            _frmTinhToanBoiThuong.getControl("loai_ts").setValue("KHAC");
        }
        var doi_tuong = _frmTinhToanBoiThuong.getControl("doi_tuong").val();
        onChangeLoaiTS(loai_ts, function () {
            if (loai_ts == "XE") {
                _frmTinhToanBoiThuong.getControl("doi_tuong").setValue(doi_tuong); 
                setTimeout(function () {
                    _frmTinhToanBoiThuong.getControl("doi_tuong").trigger("select2:select");
                }, 150);
            }
        });
        
        return;
    }
    /*Tai nạn lái phụ xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
        $("#divTinhToanLPHU_XE").removeClass("d-none");
    }
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: lhnv
    }
    _service.layHangMucLHNV(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var tong_nv = res.data_info.tong_nv;
        _frmTinhToanBoiThuong.getControl("so_vu").setValue(tong_nv.so_vu);
        _frmTinhToanBoiThuong.getControl("so_vu_tt").setValue(tong_nv.so_vu_tt);

        if (tong_nv.pt_ad_thue_mien_thuong == "THM") {
            _frmTinhToanBoiThuong.getControl("tl_thue").setValue("THM");
        }
        else {
            _frmTinhToanBoiThuong.getControl("tl_thue").setValue(tong_nv.tl_thue);
        }
        _frmTinhToanBoiThuong.getControl("so_id_doi_tuong").setValue(tong_nv.so_id_doi_tuong);
        _frmTinhToanBoiThuong.getControl("thue").setValue(tong_nv.thue);
        _frmTinhToanBoiThuong.getControl("giam_tru_khac").setValue(ESUtil.formatMoney(tong_nv.tien_giam_tru_khac));
        _frmTinhToanBoiThuong.getControl("khau_tru").setValue(tong_nv.khau_tru);
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(tong_nv.tien_mien_thuong_sau_thue);
        _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").setValue(tong_nv.tien_mien_thuong_sau_thue / tong_nv.so_vu_tt);

        $("#danh_gia").val(tong_nv.danh_gia);
        $("#de_xuat").val(tong_nv.de_xuat);

        /*Vật chất xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
            ESUtil.genHTML("tblTinhToanVCXTemplate", "tblTinhToanVCX", { tinh_toan_bt: res.data_info.data }, () => {
                var data = res.data_info.data;
                arrTinhToanBoiThuong = data;
                $(".tblTinhToanVCX_T").addClass("d-none");
                $(".tblTinhToanVCX_S").removeClass("d-none");
                if (data != undefined && data != null && data.length > 0 &&
                    data[0].lh_tt_giam_gia != undefined && data[0].lh_tt_giam_gia != null && data[0].lh_tt_giam_gia == "T") {
                    $(".tblTinhToanVCX_T").removeClass("d-none");
                    $(".tblTinhToanVCX_S").addClass("d-none");
                }
                $("#tblTinhToanVCXSoLuongHM").html(data.length + " hạng mục");
                var giaDuyetVtu = 0;
                var giaDuyetNC = 0;
                var giaDuyetKhac = 0;
                var giaDuyet = 0;
                var giamGia = 0;
                var tienKhauTru = 0;
                var tienThue = 0;
                for (var i = 0; i < data.length; i++) {
                    giaDuyetVtu += parseFloat(data[i].gia_vtu_duyet);
                    giaDuyetNC += parseFloat(data[i].gia_nhan_cong_duyet);
                    giaDuyetKhac += parseFloat(data[i].gia_khac_duyet);
                    giaDuyet += parseFloat(data[i].gia_duyet);
                    giamGia += parseFloat(data[i].giam_gia);
                    tienKhauTru += parseFloat(data[i].tien_ktru_tien_bh);
                    tienThue += parseFloat(data[i].tien_thue);
                }
                $("#tblTinhToanVCXTienDuyetVtu").html(ESUtil.formatMoney(giaDuyetVtu));
                $("#tblTinhToanVCXTienDuyetNC").html(ESUtil.formatMoney(giaDuyetNC));
                $("#tblTinhToanVCXTienDuyetKhac").html(ESUtil.formatMoney(giaDuyetKhac));
                $("#tblTinhToanVCXTienDuyetGia").html(ESUtil.formatMoney(giaDuyet));
                $("#tblTinhToanVCXTienDuyetGiamGia").html(ESUtil.formatMoney(giamGia));
                $("#tblTinhToanVCXTienDuyetGiamGia_T").html(ESUtil.formatMoney(giamGia));
                $("#tblTinhToanVCXTienKhauTru").html(ESUtil.formatMoney(tienKhauTru));
                $("#tblTinhToanVCXThue").html(ESUtil.formatMoney(tienThue));
                tinhToan();
            });
        }
        /*Hàng hóa trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            $(".tinhToanHH").removeClass("d-none");
            ESUtil.genHTML("tblTinhToanHANGHOATemplate", "tblTinhToanHANGHOA", { tinh_toan_bt: res.data_info.data }, () => {
                var giaduyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanHANGHOATienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").setValue(tong_nv.tien_mien_thuong_sau_thue / tong_nv.so_vu_tt);
                tinhToan();
            });
        }
        /*Người ngồi trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.NNTX) {
            ESUtil.genHTML("tblTinhToanNNTXTemplate", "tblTinhToanNNTX", { tinh_toan_bt: res.data_info.data }, () => {
                var giaduyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanNNTXTienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }
        /*TNDS về người*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            ESUtil.genHTML("tblTinhToanTNDS_NGUOITemplate", "tblTinhToanTNDS_NGUOI", { tinh_toan_bt: res.data_info.data }, () => {
                var giaduyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanTNDS_NGUOITienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }
        /*TNDS về hành khách*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
            ESUtil.genHTML("tblTinhToanTNDS_NGUOI_HKTemplate", "tblTinhToanTNDS_NGUOI_HK", { tinh_toan_bt: res.data_info.data }, () => {
                var giaduyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanTNDS_NGUOI_HKTienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }
        /*TNDS về tài sản*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            var nhom = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-nhom");
            var doi_tuong = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-doi-tuong");
            var arr = chuanHoaNVCTTinhToan(res.data_info.data, nhom, doi_tuong);
            ESUtil.genHTML("tblTinhToanTNDS_TAISANTemplate", "tblTinhToanTNDS_TAISAN", { tinh_toan_bt: arr }, () => {
                var giaduyet = arr.sum(n => parseFloat(n.tien_duyet_pa));
                var giaduyet_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanTNDS_TAISANTienDuyetGiaKhac").html(ESUtil.formatMoney(giaduyet_khac));
                $("#tblTinhToanTNDS_TAISANTienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }
        /*Tai nạn lái phụ xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
            ESUtil.genHTML("tblTinhToanLPHU_XETemplate", "tblTinhToanLPHU_XE", { tinh_toan_bt: res.data_info.data }, () => {
                var giaduyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanLPHU_XETienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }
    });
}
function bindNguyenNhanGiamTru(lhnv) {
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
    if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    /*Vật chất xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NGUYEN_NHAN_GIAM_TRU");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
    }
    /*Hàng hóa trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
    }
    /*Người ngồi trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
    }
    /*TNDS về người*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
    }
    /*TNDS về tài sản*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
    }
}
function xemChiTietDTTonThat(lhnv) {
    $("#navDanhGiaNghiepVu li").removeClass("active");
    $("#navDanhGiaNghiepVu li[data-lhnv='" + lhnv + "']").addClass("active");
    $(".divDanhGiaItem").hide();
    arrHangMucTonThat = [];
    $("#btnLuuHangMucCtiet").removeClass("d-none");
    $(".btnLapPASCKhac").removeClass("d-none");
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
    if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    /*Vật chất xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        $("#divDanhGiaVCX").show();
        $("#btnLuuHangMucCtiet").addClass("d-none");
        $(".btnLapPASCKhac").addClass("d-none");
        if (lhnv == "") {
            return;
        }
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var arr_vcx = res.data_info;
            arrHangMucTonThat = arr_vcx;
            ESUtil.genHTML("tblPhuongAnVCXTemplate", "tblPhuongAnVCX", { pa_khac_phuc: arr_vcx }, () => {
                var tblPhuongAnVCXTienGiamDinh = arr_vcx.sum(n => n.gia_giam_dinh);
                var tblPhuongAnVCXTienDeXuat = arr_vcx.sum(n => n.gia_duyet_dx);
                var tblPhuongAnVCXTienDuyet = arr_vcx.sum(n => n.gia_duyet);
                $("#tblPhuongAnVCXTienGiamDinh").html(ESUtil.formatMoney(tblPhuongAnVCXTienGiamDinh));
                $("#tblPhuongAnVCXTienDeXuat").html(ESUtil.formatMoney(tblPhuongAnVCXTienDeXuat));
                $("#tblPhuongAnVCXTienDuyet").html(ESUtil.formatMoney(tblPhuongAnVCXTienDuyet));
                $("#tblPhuongAnVCX .xoaHangMucTonThat").click(function () {
                    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa hạng mục này không?", "", val => {
                        var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
                        _service.xoaHangMucTonThat(json).then(res => {
                            if (res.state_info.status !== "OK") {
                                _notifyService.error(res.state_info.message_body);
                            }
                            var ma_doi_tac = _frmThemHMTTPhu.getControl("ma_doi_tac").getValue();
                            var so_id = _frmThemHMTTPhu.getControl("so_id").getValue();
                            reloadPhuongAnKhacPhuc(ma_doi_tac, so_id);
                            _notifyService.success("Xóa hạng mục bồi thường thành công.");
                        });
                    });
                });

            });
            anHienNutDuyetPA(res.out_value.phan_cap);
        });
    }
    /*Người ngồi trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
        $("#divDanhGiaNNTX").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrHangMucTonThat = res.data_info;
            ESUtil.genHTML("modalChiTietTonThatNGUOITemplate", "modalChiTietTonThatNGUOI", { danh_sach: res.data_info }, () => {
                tongTienConNguoi()
            });
            $("#divPhuongAnNguoi").show();
            anHienNutDuyetPA(res.out_value.phan_cap);
        });
    }
    /*Hàng hóa trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        $("#divDanhGiaHANGHOA").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrHangMucTonThat = res.data_info;
            ESUtil.genHTML("modalChiTietTonThatHANGHOATemplate", "modalChiTietTonThatHANGHOA", { danh_sach: res.data_info }, () => {
                tongTienHangHoa();
            });
            $("#divPhuongAnHangHoa").show();
            anHienNutDuyetPA(res.out_value.phan_cap);

        });
    }
    /*TNDS về người*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        $("#divDanhGiaTNDSNguoi").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrHangMucTonThat = res.data_info;
            ESUtil.genHTML("modalChiTietTonThatTNDS_NGUOITemplate", "modalChiTietTonThatTNDS_NGUOI", { danh_sach: res.data_info }, () => {
                tongTienConNguoi()
            });
            $("#divPhuongAnNguoi").show();
            anHienNutDuyetPA(res.out_value.phan_cap);
        });
    }
    /*TNDS về hành khách trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
        $("#divDanhGiaHanhKhach").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrHangMucTonThat = res.data_info;
            ESUtil.genHTML("modalChiTietTonThatTNDS_NGUOI_HKTemplate", "modalChiTietTonThatTNDS_NGUOI_HK", { danh_sach: res.data_info }, () => {
                tongTienConNguoi()
            });
            $("#divPhuongAnNguoi").show();
            anHienNutDuyetPA(res.out_value.phan_cap);
        });
    }
    /*TNDS về tài sản*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        $("#divDanhGiaTNDSTaiSan").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: lhnv
        }
        _service.layChiTietHangMuc(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrHangMucTonThat = res.data_info;
            res.data_info = chuanHoaNVCT(res.data_info, objLHNV.nhom, objLHNV.doi_tuong, "");
            ESUtil.genHTML("modalChiTietTonThatTNDS_TAI_SANTemplate", "modalChiTietTonThatTNDS_TAI_SAN", { danh_sach: res.data_info }, () => {
                var tong_thoa_thuan_khac = res.data_info.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_thoa_thuan));
                var tong_dx_khac = res.data_info.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_dx_pa));
                var tong_duyet_khac = res.data_info.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_duyet_pa));

                $("#tong_thoa_thuan_khac").html(ESUtil.formatMoney(tong_thoa_thuan_khac));
                $("#tong_dx_khac").html(ESUtil.formatMoney(tong_dx_khac));
                $("#tong_duyet_khac").html(ESUtil.formatMoney(tong_duyet_khac));

                tongTienTNDSTaiSan()
            });
            $("#divPhuongAnTNDSTaiSan").show();
            anHienNutDuyetPA(res.out_value.phan_cap);
        });
    }

    tongHopTienPhuongAn();
}
function tongTienHangHoa() {
    var arr = layDuLieuBangDGHangHoa();
    var tong_tien_tt = 0;
    var tong_tien_giam_tru = 0;
    var tong_tien_dx_pa = 0;
    var tong_tien_duyet_pa = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            tong_tien_tt += parseFloat(arr[i].tien_tt);
            tong_tien_giam_tru += parseFloat(arr[i].tien_giam_tru);
            tong_tien_dx_pa += parseFloat(arr[i].tien_dx_pa);
            tong_tien_duyet_pa += parseFloat(arr[i].tien_duyet_pa);
        }
    }
    $("#tableChiTietTonThatHANGHOATienTT").html(ESUtil.formatMoney(tong_tien_tt));
    $("#tableChiTietTonThatHANGHOATienGiam").html(ESUtil.formatMoney(tong_tien_giam_tru));
    $("#tableChiTietTonThatHANGHOATienDx").html(ESUtil.formatMoney(tong_tien_dx_pa));
    $("#tableChiTietTonThatHANGHOATienDuyet").html(ESUtil.formatMoney(tong_tien_duyet_pa));
}
function tongTienTNDSTaiSan() {
    var arr = layDuLieuBangDGTNDSTaiSan();
    var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
    var doi_tuong = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
    arr = chuanHoaNVCT(arr, nhom, doi_tuong, "");
    var tong_tien_tt_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_tt));

    var tong_tien_tt = 0;
    var tong_tien_thoa_thuan = 0;
    var tong_tien_giam_tru = 0;
    var tong_tien_dx_pa = 0;
    var tong_tien_duyet_pa = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            tong_tien_tt += parseFloat(arr[i].tien_tt);
            tong_tien_thoa_thuan += parseFloat(arr[i].tien_thoa_thuan);
            tong_tien_giam_tru += parseFloat(arr[i].tien_giam_tru);
            tong_tien_dx_pa += parseFloat(arr[i].tien_dx_pa);
            tong_tien_duyet_pa += parseFloat(arr[i].tien_duyet_pa);
        }
    }
    $("#doi_tuong_goc_khac").html(ESUtil.formatMoney(tong_tien_tt_khac));
    $("#tableChiTietTonThatTNDS_TAI_SANTienTT").html(ESUtil.formatMoney(tong_tien_tt));
    $("#tableChiTietTonThatTNDS_TAI_SANTienThoaThuan").html(ESUtil.formatMoney(tong_tien_thoa_thuan));
    $("#tableChiTietTonThatTNDS_TAI_SANTienGiam").html(ESUtil.formatMoney(tong_tien_giam_tru));
    $("#tableChiTietTonThatTNDS_TAI_SANTienDx").html(ESUtil.formatMoney(tong_tien_dx_pa));
    $("#tableChiTietTonThatTNDS_TAI_SANTienDuyet").html(ESUtil.formatMoney(tong_tien_duyet_pa));
}
function tongTienConNguoi() {
    var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
    var arr = [];
    if (nhom == NHOM_LHNV.NGUOI) {
        arr = layDuLieuBangDGNNTX();
    }
    if (nhom == NHOM_LHNV.TNDS) {
        arr = layDuLieuBangDGTNDSNguoi();
    }
    var tong_tien_tt = 0;
    var tong_tien_thoa_thuan = 0;
    var tong_tien_giam_tru = 0;
    var tong_tien_dx_pa = 0;
    var tong_tien_duyet_pa = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            tong_tien_tt += parseFloat(arr[i].tien_tt);
            tong_tien_thoa_thuan += parseFloat(arr[i].tien_thoa_thuan);
            tong_tien_giam_tru += parseFloat(arr[i].tien_giam_tru);
            tong_tien_dx_pa += parseFloat(arr[i].tien_dx_pa);
            tong_tien_duyet_pa += parseFloat(arr[i].tien_duyet_pa);
        }
    }
    if (nhom == NHOM_LHNV.NGUOI) {
        $("#tableChiTietTonThatNGUOITienTT").html(ESUtil.formatMoney(tong_tien_tt));
        $("#tableChiTietTonThatNGUOITienGiam").html(ESUtil.formatMoney(tong_tien_giam_tru));
        $("#tableChiTietTonThatNGUOITienDx").html(ESUtil.formatMoney(tong_tien_dx_pa));
        $("#tableChiTietTonThatNGUOITienDuyet").html(ESUtil.formatMoney(tong_tien_duyet_pa));
    }
    if (nhom == NHOM_LHNV.TNDS) {
        $("#tableChiTietTonThatTNDS_NGUOITienTT").html(ESUtil.formatMoney(tong_tien_tt));
        $("#tableChiTietTonThatTNDS_NGUOITienThoaThuan").html(ESUtil.formatMoney(tong_tien_thoa_thuan));
        $("#tableChiTietTonThatTNDS_NGUOITienGiam").html(ESUtil.formatMoney(tong_tien_giam_tru));
        $("#tableChiTietTonThatTNDS_NGUOITienDx").html(ESUtil.formatMoney(tong_tien_dx_pa));
        $("#tableChiTietTonThatTNDS_NGUOITienDuyet").html(ESUtil.formatMoney(tong_tien_duyet_pa));
    }
}
function showMoTa(el) {
    _popoverMoTa.options = { placement: "bottom bottom-right" };
    $("#divMoTa_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divMoTa_NoiDung").val(val);
    _popoverMoTa.showWithPosition(el);
}
function showDiaChi(el) {
    _popoverDiaChi.options = { placement: "bottom bottom-right" };
    $("#divDiaChi_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divDiaChi_NoiDung").val(val);
    _popoverDiaChi.showWithPosition(el);
}
function showGhiChu(el) {
    _popoverGhiChuChiTietHM.options = { placement: "bottom bottom-right" };
    $("#divGhiChuChiTietHM_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChuChiTietHM_NoiDung").val(val);
    _popoverGhiChuChiTietHM.showWithPosition(el);
}
function chonMucDoChiTietTonThat(el) {
    var val = $(el).attr("data-val");
    $("#modalMucDoTTDanhSach .dsmdtt").removeClass("d-none");
    $("#inputSearch_MucDoTT").focus();
    $("#inputSearch_MucDoTT").val();
    $("#modalMucDoTTDanhSach .modalMucDoTTItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalMucDoTTDanhSach .modalMucDoTTItem[value='" + val + "']").prop("checked", true);
    }
    _modalMucDoTT.show(el);
}
function chonDViTinhChiTietTonThat(el) {
    var val = $(el).attr("data-val");
    $("#modalDviTinhDanhSach .dsdvitinh").removeClass("d-none");
    $("#inputSearch_DviTinh").focus();
    $("#inputSearch_DviTinh").val();
    $("#modalDviTinhDanhSach .modalDviTinhItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalDviTinhDanhSach .modalDviTinhItem[value='" + val + "']").prop("checked", true);
    }
    _modalDviTinh.show(el);
}
function onChangeTinhTong(el, loai = "") {
    var tr = $(el).parent().parent();
    var td = tr.children();
    var gia = 0;
    var so_luong_tt = 0;
    var tien_giam_tru = 0;
    var tien_thoa_thuan = 0;
    var tien_dx_pa = 0;
    var tien_duyet_pa = 0;
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "gia") {
                gia = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "so_luong_tt") {
                so_luong_tt = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_giam_tru") {
                tien_giam_tru = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_thoa_thuan") {
                tien_thoa_thuan = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_dx_pa") {
                tien_dx_pa = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_duyet_pa") {
                tien_duyet_pa = $(this).val().replace(/[^0-9]+/g, '');
            }
        });
        $(this).find("a.combobox").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "gia") {
                gia = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "so_luong_tt") {
                so_luong_tt = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "tien_giam_tru") {
                tien_giam_tru = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "tien_thoa_thuan") {
                tien_thoa_thuan = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_dx_pa") {
                tien_dx_pa = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "tien_duyet_pa") {
                tien_duyet_pa = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
        });
    });
    if (gia == "") {
        gia = 0;
    }
    if (so_luong_tt == "") {
        so_luong_tt = 0;
    }
    if (tien_giam_tru == "") {
        tien_giam_tru = 0;
    }
    if (tien_thoa_thuan == "") {
        tien_thoa_thuan = 0;
    }
    if (tien_dx_pa == "") {
        tien_dx_pa = 0;
    }
    if (tien_duyet_pa == "") {
        tien_duyet_pa = 0;
    }
    gia = parseFloat(gia);
    so_luong_tt = parseFloat(so_luong_tt);
    tien_giam_tru = parseFloat(tien_giam_tru);
    tien_thoa_thuan = parseFloat(tien_thoa_thuan);
    tien_dx_pa = parseFloat(tien_dx_pa);
    tien_duyet_pa = parseFloat(tien_duyet_pa);

    if (loai == "TIEN_THOA_THUAN") {
        if (tien_thoa_thuan < tien_dx_pa) {
            _notifyService.error("Tiền đề xuất phương án không được lớn hơn số tiền đã thỏa thuận");
            tien_dx_pa = tien_thoa_thuan;
            if (tien_dx_pa < tien_duyet_pa) {
                tien_duyet_pa = tien_dx_pa;
            }
        }
    }
    if (loai == "TIEN_DX_PA") {
        tien_duyet_pa = tien_dx_pa;
    }
    if (loai == "TIEN_DX_PA") {
        tien_duyet_pa = tien_dx_pa;
    }
    if (loai == "TIEN_DUYET_PA") {
        if (tien_duyet_pa > tien_dx_pa) {
            _notifyService.error("Tiền duyệt không lớn hơn tiền đề xuất");
            tien_duyet_pa = tien_dx_pa;
        }
    }

    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_giam_tru") {
                $(this).val(ESUtil.formatMoney(tien_giam_tru));
            }
            if (field == "tien_dx_pa") {
                $(this).val(ESUtil.formatMoney(tien_dx_pa));
            }
            if (field == "tien_duyet_pa") {
                $(this).val(ESUtil.formatMoney(tien_duyet_pa));
            }
        });
    });

    var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
    var doi_tuong = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
    if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        tongTienHangHoa();
    }
    if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        var arrData = layDuLieuBangDGTNDSTaiSan();
        arrData = chuanHoaNVCT(arrData, nhom, doi_tuong, "");
        var arrCha = arrData.where(n => n.so_id_doi_tuong_cha == "0");
        for (var i = 0; i < arrCha.length; i++) {
            if (arrCha[i].so_luong_dt > 0) {
                arrCha[i].tien_thoa_thuan = arrCha[i].ds_doi_tuong.sum(n => parseFloat(n.tien_thoa_thuan));
                arrCha[i].tien_dx_pa = arrCha[i].ds_doi_tuong.sum(n => parseFloat(n.tien_dx_pa));
                arrCha[i].tien_duyet_pa = arrCha[i].ds_doi_tuong.sum(n => parseFloat(n.tien_duyet_pa));

                $("#input_tien_thoa_thuan_" + arrCha[i].so_id_doi_tuong).val(arrCha[i].tien_thoa_thuan);
                $("#input_tien_dx_pa_" + arrCha[i].so_id_doi_tuong).val(arrCha[i].tien_dx_pa);
                $("#input_tien_duyet_pa_" + arrCha[i].so_id_doi_tuong).val(arrCha[i].tien_duyet_pa);

                $("#tong_thoa_thuan_" + arrCha[i].so_id_doi_tuong).html(ESUtil.formatMoney(arrCha[i].tien_thoa_thuan));
                $("#tong_dx_" + arrCha[i].so_id_doi_tuong).html(ESUtil.formatMoney(arrCha[i].tien_dx_pa));
                $("#tong_duyet_" + arrCha[i].so_id_doi_tuong).html(ESUtil.formatMoney(arrCha[i].tien_duyet_pa));
            }
        }
        var tong_thoa_thuan_khac = arrData.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_thoa_thuan));
        var tong_dx_khac = arrData.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_dx_pa));
        var tong_duyet_khac = arrData.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_duyet_pa));

        $("#tong_thoa_thuan_khac").html(ESUtil.formatMoney(tong_thoa_thuan_khac));
        $("#tong_dx_khac").html(ESUtil.formatMoney(tong_dx_khac));
        $("#tong_duyet_khac").html(ESUtil.formatMoney(tong_duyet_khac));

        tongTienTNDSTaiSan();
    }
}
function onChangeTien(el, loai = "") {
    var tr = $(el).parent().parent();
    var td = tr.children();
    /*var tien_tt = 0;*/
    var tien_thoa_thuan = 0;
    var tien_dx_pa = 0;
    var tien_giam_tru = 0;
    var tien_duyet_pa = 0;
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_thoa_thuan") {
                tien_thoa_thuan = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_giam_tru") {
                tien_giam_tru = $(this).val().replace(/[^0-9]+/g, '');
            }

            if (field == "tien_dx_pa") {
                tien_dx_pa = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_duyet_pa") {
                tien_duyet_pa = $(this).val().replace(/[^0-9]+/g, '');
            }
        });
        $(this).find("a.combobox").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_thoa_thuan") {
                tien_thoa_thuan = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "tien_giam_tru") {
                tien_giam_tru = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }

            if (field == "tien_dx_pa") {
                tien_dx_pa = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
            if (field == "tien_duyet_pa") {
                tien_duyet_pa = $(this).attr("data-val").replace(/[^0-9]+/g, '');
            }
        });
    });
    if (tien_thoa_thuan == "") {
        tien_thoa_thuan = 0;
    }
    if (tien_giam_tru == "") {
        tien_giam_tru = 0;
    }
    if (tien_dx_pa == "") {
        tien_dx_pa = 0;
    }
    if (tien_duyet_pa == "") {
        tien_duyet_pa = 0;
    }
    tien_giam_tru = parseFloat(tien_giam_tru);
    tien_thoa_thuan = parseFloat(tien_thoa_thuan);
    tien_dx_pa = parseFloat(tien_dx_pa);
    tien_duyet_pa = parseFloat(tien_duyet_pa);
    if (loai == "TIEN_THOA_THUAN") {
        if (tien_thoa_thuan != 0 && tien_thoa_thuan < tien_dx_pa) {
            tien_dx_pa = tien_thoa_thuan;
            if (tien_duyet_pa > tien_dx_pa) {
                tien_duyet_pa = tien_dx_pa;
            }
        }
    }

    if (loai == "TIEN_DX_PA") {
        if (tien_thoa_thuan != 0 && tien_thoa_thuan < tien_dx_pa) {
            _notifyService.error("Tiền đề xuất không được lớn hơn tiền đã thỏa thuận");
            tien_dx_pa = tien_thoa_thuan;
        }
        tien_duyet_pa = tien_dx_pa;
    }
    if (loai == "TIEN_DUYET_PA") {
        if (tien_duyet_pa > tien_dx_pa) {
            _notifyService.error("Tiền duyệt không lớn hơn tiền đề xuất");
            tien_duyet_pa = tien_dx_pa;
        }
    }

    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_giam_tru") {
                $(this).val(ESUtil.formatMoney(tien_giam_tru));
            }
            if (field == "tien_dx_pa") {
                $(this).val(ESUtil.formatMoney(tien_dx_pa));
            }
            if (field == "tien_duyet_pa") {
                $(this).val(ESUtil.formatMoney(tien_duyet_pa));
            }
        });
    });

    tongTienConNguoi();
}
function chonNguyenNhanGiamTru(el) {
    var ds_val = $(el).attr("data-val");
    if (ds_val == undefined || ds_val == null) {
        ds_val = "";
    }
    $("#modalChonNguyenNhanGiamTruDanhSach .nngt").removeClass("d-none");
    $("#inputSearch_NguyenNhanGiamTru").focus();
    $("#inputSearch_NguyenNhanGiamTru").val();
    $("#modalChonNguyenNhanGiamTruDanhSach .modalChonNguyenNhanGiamTruItem").prop("checked", false);
    var arr = ds_val.split(",");
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        if (val != undefined && val != null && val != "") {
            $("#modalChonNguyenNhanGiamTruDanhSach .modalChonNguyenNhanGiamTruItem[value='" + val + "']").prop("checked", true);
        }
    }
    _modalNguyenNhanGiamTru.show(el);
}
function layDuLieuBangDGHangHoa() {
    var otArr = [];
    $("#modalChiTietTonThatHANGHOA tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
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
function layDuLieuBangDGNNTX() {
    var otArr = [];
    $("#modalChiTietTonThatNGUOI tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGTNDSNguoi() {
    var otArr = [];
    $("#modalChiTietTonThatTNDS_NGUOI tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
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
function layDuLieuBangDGTNDSTaiSan() {
    var otArr = [];
    $("#modalChiTietTonThatTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
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
//function layDuLieuBangPAHangHoa() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
//        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuBangPANNTX() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
//        var json = { so_id_doi_tuong: '', ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuBangPATNDSNguoi() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
//        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuBangPATNDSNguoiHK() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
//        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        if (json.so_id_doi_tuong != 0 && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != undefined) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuBangPATNDSTaiSan() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
//        var json = { so_id_doi_tuong: '', ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, ghi_chu: "", thuong_tat: "", pttt: 0 };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;


//}
function layDuLieuTinhToanVCX() {
    var otArr = [];
    $("#tblTinhToanVCX tr.tblTinhToanVCXItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanHANGHOA() {
    var otArr = [];
    $("#tblTinhToanHANGHOA tr.tblTinhToanHANGHOAItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanNNTX() {
    var otArr = [];
    $("#tblTinhToanNNTX tr.tblTinhToanNNTXItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanLPHU_XE() {
    var otArr = [];
    $("#tblTinhToanLPHU_XE tr.tblTinhToanLPHU_XEItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanTNDSNGUOI() {
    var otArr = [];
    $("#tblTinhToanTNDS_NGUOI tr.tblTinhToanTNDS_NGUOIItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanTNDSNGUOI_HK() {
    var otArr = [];
    $("#tblTinhToanTNDS_NGUOI_HK tr.tblTinhToanTNDS_NGUOI_HKItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuTinhToanTNDSTAISAN() {
    var otArr = [];
    $("#tblTinhToanTNDS_TAISAN tr.hmChiTietItem").each(function (e) {
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
        otArr.push(json);
    });
    return otArr;
}
//function ganDuLieuTinhToanVCX(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoVCX").is(":checked");
//    var chkBaoHiemVCX = $("#chkBaoHiemVCX").is(":checked");
//    var chkGiamTruVCX = $("#chkGiamTruVCX").is(":checked");
//    var chkTLThue = $("#chkTLThue").is(":checked");
//    var chkNguyenNhanVCX = $("#chkNguyenNhanVCX").is(":checked");

//    $("#tblTinhToanVCX tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    if (val == "") {
//                        val = "0";
//                    }
//                    $(this).val(val);
//                }
//                if (chkBaoHiemVCX && field == "pt_bao_hiem" && current_field == field) {
//                    if (val == "") {
//                        val = "0";
//                    }
//                    $(this).val(val);
//                }
//                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
//                    if (val == "") {
//                        val = "0";
//                    }
//                    $(this).val(val);
//                }
//                if (chkTLThue && field == "tl_thue" && current_field == field) {
//                    if (val == "") {
//                        val = "0";
//                    }
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                //if (chkDKBSVCX && field == "dkbs" && current_field == field) {
//                //    $(this).attr("data-val", val);
//                //    $(this).removeAttr("href");
//                //    if (val != "") {
//                //        $(this).attr("href", "#");
//                //    }
//                //}
//                if (chkNguyenNhanVCX && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanHANGHOA(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoHANGHOA").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemHANGHOA").is(":checked");
//    var chkGiamTru = $("#chkGiamTruHANGHOA").is(":checked");
//    var chkTLThue = $("#chkTLThueHANGHOA").is(":checked");
//    var chkNguyenNhan = $("#chkAllNguyenNhanHANGHOA").is(":checked");

//    $("#tblTinhToanHANGHOA tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkTLThue && field == "tl_thue" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanNNTX(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkBaoHiemNNTX = $("#chkBaoHiemNNTX").is(":checked");
//    var chkGiamTruNNTX = $("#chkGiamTruNNTX").is(":checked");
//    var chkAllNguyenNhanNNTX = $("#chkAllNguyenNhanNNTX").is(":checked");
//    $("#tblTinhToanNNTX tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTruNNTX && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiemNNTX && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkAllNguyenNhanNNTX && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });

//}
//function ganDuLieuTinhToanTNDSNGUOI(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkBaoHiem = $("#chkBaoHiemTNDS_NGUOI").is(":checked");
//    var chkGiamTru = $("#chkGiamTruTNDS_NGUOI").is(":checked");
//    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_NGUOI").is(":checked");
//    $("#tblTinhToanTNDS_NGUOI tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanTNDSNGUOI_HK(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkBaoHiem = $("#chkBaoHiemTNDS_NGUOI_HK").is(":checked");
//    var chkGiamTru = $("#chkGiamTruTNDS_NGUOI_HK").is(":checked");
//    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_NGUOI_HK").is(":checked");
//    $("#tblTinhToanTNDS_NGUOI_HK tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanLPHU_XE(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkBaoHiem = $("#chkBaoHiemLPHU_XE").is(":checked");
//    var chkGiamTru = $("#chkGiamTruLPHU_XE").is(":checked");
//    var chkNguyenNhan = $("#chkAllNguyenNhanLPHU_XE").is(":checked");
//    $("#tblTinhToanLPHU_XE tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanTNDSTAISAN(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoTNDS_TAISAN").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemTNDS_TAISAN").is(":checked");
//    var chkGiamTru = $("#chkGiamTruTNDS_TAISAN").is(":checked");
//    var chkTLThue = $("#chkTLThueTNDS_TAISAN").is(":checked");
//    var chkNguyenNhan = $("#chkAllNguyenNhanTNDS_TAISAN").is(":checked");
//    $("#tblTinhToanTNDS_TAISAN tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkTLThue && field == "tl_thue" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkNguyenNhan && field == "nguyen_nhan" && current_field == field) {
//                    $(this).attr("data-val", val);
//                    $(this).removeAttr("href");
//                    if (val != "") {
//                        $(this).attr("href", "#");
//                    }
//                }
//            });
//        });
//    });
//}
//function layDuLieuTinhToanPAVCX() {
//    var otArr = [];
//    $("#tblPhuongAnCT tr").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        if (json.hang_muc != undefined && json.hang_muc != '' && json.hang_muc != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuTinhToanPAHANGHOA() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        json.dkbs = "";
//        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuTinhToanPANNTX() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        json.pt_khau_hao = "0";
//        json.dkbs = "";
//        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuTinhToanPATNDSNGUOI() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        json.pt_khau_hao = "0";
//        json.dkbs = "";
//        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuTinhToanPATNDSNGUOI_HK() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        json.pt_khau_hao = "0";
//        json.dkbs = "";
//        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function layDuLieuTinhToanPATNDSTAISAN() {
//    var otArr = [];
//    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a.combobox").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//        });
//        json.dkbs = "";
//        if (json.so_id_doi_tuong != undefined && json.so_id_doi_tuong != '' && json.so_id_doi_tuong != null) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function ganDuLieuTinhToanPAVCX(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoPAVCX").is(":checked");
//    var chkBaoHiemVCX = $("#chkBaoHiemPAVCX").is(":checked");
//    var chkGiamTruVCX = $("#chkGiamTruPAVCX").is(":checked");
//    var chkTLThue = $("#chkTLThuePA").is(":checked");

//    $("#tblPhuongAnCT tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiemVCX && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkTLThue && field == "tl_thue" && current_field == field) {
//                    if (val == "") {
//                        val = "0";
//                    }
//                    $(this).val(val);
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanPAHANGHOA(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoPAHANGHOA").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemPAHANGHOA").is(":checked");
//    var chkGiamTru = $("#chkGiamTruPAHANGHOA").is(":checked");
//    var chkTLThuePAHANGHOA = $("#chkTLThuePAHANGHOA").is(":checked");

//    $("#modalChiTietPhuongAnHANGHOA tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkTLThuePAHANGHOA && field == "tl_thue" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanPANNTX(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkGiamTruVCX = $("#chkGiamTruPANNTX").is(":checked");
//    var chkBaoHiemPANNTX = $("#chkBaoHiemPANNTX").is(":checked");
//    $("#modalChiTietPhuongAnNGUOI tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTruVCX && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiemPANNTX && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//        });
//    });

//}
//function ganDuLieuTinhToanPATNDSNGUOI(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkGiamTru = $("#chkGiamTruPATNDS_NGUOI").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemPATNDS_NGUOI").is(":checked");
//    $("#modalChiTietPhuongAnTNDS_NGUOI tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanPATNDSNGUOI_HK(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var chkGiamTru = $("#chkGiamTruPATNDS_NGUOI_HK").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemPATNDS_NGUOI_HK").is(":checked");
//    $("#modalChiTietPhuongAnTNDS_NGUOI_HK tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//        });
//    });
//}
//function ganDuLieuTinhToanPATNDSTAISAN(el) {
//    if (el == undefined) {
//        return;
//    }
//    var current_field = $(el).attr("data-field");
//    var val = $(el).val();
//    if (val == undefined || val == null || val == "") {
//        val = $(el).attr("data-val");
//    }
//    var checkKhauHao = $("#chkKhauHaoPATNDS_TAISAN").is(":checked");
//    var chkBaoHiem = $("#chkBaoHiemPATNDS_TAISAN").is(":checked");
//    var chkGiamTru = $("#chkGiamTruPATNDS_TAISAN").is(":checked");
//    var chkTLThue = $("#chkTLThuePATNDS_TAISAN").is(":checked");
//    $("#modalChiTietPhuongAnTNDS_TAI_SAN tr").each(function (e) {
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if (checkKhauHao && field == "pt_khau_hao" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkBaoHiem && field == "pt_bao_hiem" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkGiamTru && field == "pt_giam_tru" && current_field == field) {
//                    $(this).val(val);
//                }
//                if (chkTLThue && field == "tl_thue" && current_field == field) {
//                    $(this).val(val);
//                }
//            });
//        });
//    });
//}
function tongHopTienPhuongAn() {
    var hm = ho_so_chi_tiet.data_info.hang_muc;
    var tong_tien_gd = hm.sum(n => n.gia_giam_dinh);
    var tong_tien_dx = hm.sum(n => n.gia_duyet_dx);
    var tong_tien_duyet = hm.sum(n => n.gia_duyet);

    $(".spanPATongTienTTGD").html(ESUtil.formatMoney(tong_tien_gd));
    $(".spanPATongTienDX").html(ESUtil.formatMoney(tong_tien_dx));
    $(".spanPATongTienDuyet").html(ESUtil.formatMoney(tong_tien_duyet));
}
function dongPopover(el) {
    $(el).parent().parent().hide();
}
function huyHoSo() {
    _frmHuyHoSo.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
    _frmHuyHoSo.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
    _frmHuyHoSo.getControl("nd").val("");
    _modalHuyHoSo.setTitle("Hủy hồ sơ bồi thường");
    _modalHuyHoSo.show();
}
function goHuyHoSo() {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn gỡ hủy hồ sơ này không?", "", val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _service.goHuyHoSo(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                bindDataDienBienTonThat(resDetail);
                ganTrangThaiHoSo(resDetail);
            });

            _notifyService.success("Gỡ hủy hồ sơ thành công");
            getPaging(1);
        });
    });
}
function chuyenNguoiXuLy() {
    bindDataChuyenNguoiXuLy(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
    _modalChuyenNguoiXuLy.show();
}
function hienThiTong(obj) {
    //TIỀN DUYỆT GIÁ
    $(".tinhToanNVTienDuyetGia1").html("0");
    $(".tinhToanNVTienBoiThuongChuaVAT1").html("0");
    $(".tinhToanNVTongThue1").html("0");
    $(".tinhToanNVTienBoiThuongBaoGomVAT1").html("0");
    $(".tinhToanNVTienKHChiTra1").html("0");
    $(".tinhToanNVTienSuaChuaChuaVAT1").html("0");
    $(".tinhToanNVTienThue1").html("0");
    $(".tinhToanNVTienChiPhiKhacChuaVAT1").html("0");
    $(".tinhToanNVTienThueChiPhiKhac1").html("0");

    $("#tinhToanHSTongBoiThuong").html("0");
    $("#tinhToanHSTongMienThuong").html("0");
    $("#tinhToanHSTongGiamTruKhac").html("0");
    $("#tinhToanHSConLai").html("0");
    $("#tinhToanHSTongThue").html("0");
    $("#tinhToanHSChiPhiKhac").html("0");
    $("#tinhToanHSTongCong").html("0");

    _frmTinhToanBoiThuong.getControl("thue").setValue("0");
    if (obj != null) {
        var tong_bt = obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac;
        $(".tinhToanNVTienDuyetGia1").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia));
        $(".tinhToanNVTienBoiThuongChuaVAT1").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac));//Tiền bồi thường chưa VAT
        $(".tinhToanNVTongThue1").html(ESUtil.formatMoney(obj.kq.tien_thue + obj.kq.tien_thue_chi_phi_khac));
        $(".tinhToanNVTienBoiThuongBaoGomVAT1").html(ESUtil.formatMoney(tong_bt));
        $(".tinhToanNVTienKHChiTra1").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia - tong_bt));
        $(".tinhToanNVTienSuaChuaChuaVAT1").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong));//Tiền sửa chữa chưa vat
        $(".tinhToanNVTienThue1").html(ESUtil.formatMoney(obj.kq.tien_thue));
        $(".tinhToanNVTienChiPhiKhacChuaVAT1").html(ESUtil.formatMoney(obj.kq.tong_chi_phi_khac));//Chi phí khác chưa vat
        $(".tinhToanNVTienThueChiPhiKhac1").html(ESUtil.formatMoney(obj.kq.tien_thue_chi_phi_khac));


        _frmTinhToanBoiThuong.getControl("thue").setValue(ESUtil.formatMoney(obj.kq.thue));
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(ESUtil.formatMoney(obj.kq.tien_mien_thuong_sau_thue));
        var tien_boi_thuong_hs = obj.tong.tien_duyet_gia - obj.tong.tien_bao_hiem - obj.tong.tien_khau_hao - obj.tong.tien_giam_tru;
        tien_boi_thuong_hs = tien_boi_thuong_hs < 0 ? 0 : tien_boi_thuong_hs;
        $("#tinhToanHSTongBoiThuong").html(ESUtil.formatMoney(tien_boi_thuong_hs));
        $("#tinhToanHSTongMienThuong").html(ESUtil.formatMoney(obj.tong.tien_mien_thuong));
        $("#tinhToanHSTongGiamTruKhac").html(ESUtil.formatMoney(obj.tong.tien_giam_tru_khac));
        var con_lai_hs = tien_boi_thuong_hs - obj.tong.tien_mien_thuong - obj.tong.tien_giam_tru_khac;
        con_lai_hs = con_lai_hs < 0 ? 0 : con_lai_hs;
        $("#tinhToanHSConLai").html(ESUtil.formatMoney(con_lai_hs));
        $("#tinhToanHSTongThue").html(ESUtil.formatMoney(obj.tong.tien_thue));
        $("#tinhToanHSChiPhiKhac").html(ESUtil.formatMoney(obj.tong.chi_phi_khac));
        $("#tinhToanHSTongCong").html(ESUtil.formatMoney(con_lai_hs + obj.tong.tien_thue + obj.tong.chi_phi_khac));
    }
}
//function hienThiBangGiaPA(obj) {
//    _service.layBangChiTietPAView(obj).then(res => {
//        if (res.state_info.status !== "OK") {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        ESUtil.genHTML("modalLapPhuongAnSuaChuaBangPAViewTemplate", "modalLapPhuongAnSuaChuaBangPAView", res.data_info, () => {
//            $("#modalLapPhuongAnSuaChuaBangPAView .pa_nghiep_vu_bang_tinh").addClass("d-none");
//            for (var i = 0; i < res.data_info.lh_nv.length; i++) {
//                var lh_nv_show = res.data_info.lh_nv[i].vcx + res.data_info.lh_nv[i].doi_tuong;
//                console.log(lh_nv_show);
//                $("#modalLapPhuongAnSuaChuaBangPAView ." + lh_nv_show.toUpperCase()).removeClass("d-none");
//            }
//        });
//    });
//}
//function hienThiTongPA(obj) {
//    $(".tinhToanNVTienDuyetGiaPA").html("0");
//    $(".tinhToanNVTienBoiThuongChuaVATPA").html("0");
//    $(".tinhToanNVTongThuePA").html("0");
//    $(".tinhToanNVTienBoiThuongBaoGomVATPA").html("0");
//    $(".tinhToanNVTienKHChiTraPA").html("0");
//    $(".tinhToanNVTienSuaChuaChuaVATPA").html("0");
//    $(".tinhToanNVTienThuePA").html("0");
//    $(".tinhToanNVTienChiPhiKhacChuaVATPA").html("0");
//    $(".tinhToanNVTienThueChiPhiKhacPA").html("0");

//    $("#tinhToanPAHSTongBoiThuong").html("0");
//    $("#tinhToanPAHSTongMienThuong").html("0");
//    $("#tinhToanPAHSTongGiamTruKhac").html("0");
//    $("#tinhToanPAHSConLai").html("0");
//    $("#tinhToanPAHSTongThue").html("0");
//    $("#tinhToanPAHSChiPhiKhac").html("0");
//    $("#tinhToanPAHSTongCong").html("0");

//    _frmTinhToanBoiThuongPA.getControl("thue").setValue("0");
//    if (obj != null) {
//        var tong_bt = obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac;
//        $(".tinhToanNVTienDuyetGiaPA").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia));
//        $(".tinhToanNVTienBoiThuongChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong + obj.kq.tong_chi_phi_khac));//Tiền bồi thường chưa VAT
//        $(".tinhToanNVTongThuePA").html(ESUtil.formatMoney(obj.kq.tien_thue + obj.kq.tien_thue_chi_phi_khac));
//        $(".tinhToanNVTienBoiThuongBaoGomVATPA").html(ESUtil.formatMoney(tong_bt));
//        $(".tinhToanNVTienKHChiTraPA").html(ESUtil.formatMoney(obj.kq.tien_duyet_gia - tong_bt));
//        $(".tinhToanNVTienSuaChuaChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_boi_thuong));//Tiền sửa chữa chưa vat
//        $(".tinhToanNVTienThuePA").html(ESUtil.formatMoney(obj.kq.tien_thue));
//        $(".tinhToanNVTienChiPhiKhacChuaVATPA").html(ESUtil.formatMoney(obj.kq.tong_chi_phi_khac));//Chi phí khác chưa vat
//        $(".tinhToanNVTienThueChiPhiKhacPA").html(ESUtil.formatMoney(obj.kq.tien_thue_chi_phi_khac));


//        _frmTinhToanBoiThuongPA.getControl("thue").setValue(ESUtil.formatMoney(obj.kq.tien_thue));
//        _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(ESUtil.formatMoney(obj.kq.tien_mien_thuong_sau_thue));
//        var tien_boi_thuong_hs = obj.tong.tien_duyet_gia - obj.tong.tien_bao_hiem - obj.tong.tien_khau_hao - obj.tong.tien_giam_tru;
//        tien_boi_thuong_hs = tien_boi_thuong_hs < 0 ? 0 : tien_boi_thuong_hs;
//        $("#tinhToanPAHSTongBoiThuong").html(ESUtil.formatMoney(tien_boi_thuong_hs));
//        $("#tinhToanPAHSTongMienThuong").html(ESUtil.formatMoney(obj.tong.tien_mien_thuong));
//        $("#tinhToanPAHSTongGiamTruKhac").html(ESUtil.formatMoney(obj.tong.tien_giam_tru_khac));
//        var con_lai_hs = tien_boi_thuong_hs - obj.tong.tien_mien_thuong - obj.tong.tien_giam_tru_khac;
//        con_lai_hs = con_lai_hs < 0 ? 0 : con_lai_hs;
//        $("#tinhToanPAHSConLai").html(ESUtil.formatMoney(con_lai_hs));
//        $("#tinhToanPAHSTongThue").html(ESUtil.formatMoney(obj.tong.tien_thue));
//        $("#tinhToanPAHSChiPhiKhac").html(ESUtil.formatMoney(obj.tong.chi_phi_khac));
//        $("#tinhToanPAHSTongCong").html(ESUtil.formatMoney(con_lai_hs + obj.tong.tien_thue + obj.tong.chi_phi_khac));
//    }
//}
function bindImagesCategory(arrAnh) {
    $("#dsHinhAnhHangMuc").html("");
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
    $('#input_imagesCategory').val('');
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            var ext = [".jpg", ".png", ".jpeg", ".gif"];
            var ds_anh = res.data_info.where(n => ext.includes(n.extension));
            var arrAnhHangMuc = bindImagesCategory(ds_anh);
            ESUtil.genHTML("dsHinhAnhHangMucTemplate", "dsHinhAnhHangMuc", { danh_sach: arrAnhHangMuc });
            $('#input_imagesCategory').val(val);
            $("#input_imagesCategory").trigger('keyup');
        }
        initImageViewerHangMuc();
        _modalXemHinhAnh.show();
    });
}
function bindImagesCategoryDetail(arrAnh) {
    $("#dsHinhAnhHangMucCTiet").html("");
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
function initImageViewerHangMucCTiet() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-detail');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-hang-muc-detail',
        id: 'img-hang-muc-detail',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function openModalXemHinhAnhCTiet(val, bt, extension) {
    if (extension == ".pdf") {
        _service.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        $('.inputSearchHangMuc').val('');
        _service.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMuc = bindImagesCategoryDetail(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTemplate", "dsHinhAnhHangMucCTiet", { danh_sach: arrAnhHangMuc });
                $('.inputSearchHangMuc').val(val);
                $(".inputSearchHangMuc").trigger('keyup');
            }
            initImageViewerHangMucCTiet();
            _modalXemHinhAnhCTiet.show();
        });
    }
}
function layThongTinTienTrinh() {
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac
    };
    _carClaimCommon.layDSThongTinTienTrinh(obj, res => {
        var dataGDHT = res.data_info.where(n => n.nhom == "GDHT");
        var dataGDTT = res.data_info.where(n => n.nhom == "GDTT");
        var dataBTV = res.data_info.where(n => n.nhom == "BTV")
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info.length > 0) {
            ESUtil.genHTML("templategiamDinhHienTruong", "giamDinhHienTruong", { source: dataGDHT });
            ESUtil.genHTML("templategiamDinhTrungTam", "giamDinhTrungTam", { source: dataGDTT });
            ESUtil.genHTML("templateboiThuongVien", "boiThuongVien", { source: dataBTV });
        }
    });
}
function anHienQTXL(hien = true) {
    $("#modalDialogQTXL").css("display", "none");
    $("#modalDialogQTXL").removeClass("active");
    $("#modalDialogThemTamUng").css("float", "");
    $("#modalDialogThemTamUng").css("margin", "5px auto");
    if (hien) {
        $("#modalDialogThemTamUng").css("float", "left");
        $("#modalDialogThemTamUng").css("margin-left", "170px");
        $("#modalDialogQTXL").addClass("active");
        $("#modalDialogQTXL").slideDown(800);
    }
}
function showGhiChuBaoGia(el) {
    _popoverGhiChuBaoGia.options = { placement: "bottom bottom-right" };
    $("#divGhiChuBaoGia_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChuBaoGia_NoiDung").val(val);
    _popoverGhiChuBaoGia.showWithPosition(el);
}
function anHienTabThongTinChung(hien_thi = true) {
    $(".tab-navigator").css("width", "70vw");
/*    $("#CarCompensationModal .esmodal-content").css("height", "");*/
/*    $("#cardCarCompensationContent").css("height", "");*/
    $("#divCommonTab").removeClass("d-none");
    $("#divInfoTab").removeClass("col-12");
    $("#divInfoTab").addClass("col-9");
    $("#tblVatChatXe").css("width", "150%");
    $("#btnAnHienTabCommon i").removeClass("fa-angle-right");
    $("#btnAnHienTabCommon i").addClass("fa-angle-left");
    if (!hien_thi) {
        $(".tab-navigator").css("width", "70vw");
        $("#divCommonTab").addClass("d-none");
        $("#divInfoTab").removeClass("col-9");
        $("#divInfoTab").addClass("col-12");
        $("#tblVatChatXe").css("width", "106%");
 /*       var height = $(window).height();*/
/*        $("#cardCarCompensationContent").css("height", (height - 114) + "px");*/
        $("#btnAnHienTabCommon i").addClass("fa-angle-right");
        $("#btnAnHienTabCommon i").removeClass("fa-angle-left");
    }
}
function chonLoaiHSGT(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalLoaiHSGTDanhSach .dscb").removeClass("d-none");
    $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem[value='" + val + "']").prop("checked", true);
    }
    _modalLoaiHSGT.show(el);
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
function OpenDeXuatGiaiQuyet(el) {
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#frmNoiDungDeXuatGiaiQuyet").jqxEditor('val', val);
    $('#frmNoiDungDeXuatGiaiQuyet').jqxEditor({
        height: "500px",
        width: '100%',
        theme: null,
        disabled: false,
        editable: true,
        tools: "bold italic underline | format font size | color background | left center right | outdent indent | ul ol | image | clean | html"
    });
    _modalDeXuatGiaiQuyet.show(el);
}
function TransInvestigationDisplay() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_GD'
    };
    var notify_url = "/carclaim/carinvestigation";
    window.open("/carclaim/carcompensation/TransInvestigationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_self');
}
//function chonGaraPhuongAn(el, callback = undefined) {
//    var val = $(el).attr("data-val");
//    $("#modalGaraPhuongAnDanhSach .dsmdtt").removeClass("d-none");
//    $("#inputSearch_GaraPhuongAn").focus();
//    $("#inputSearch_GaraPhuongAn").val();
//    $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem").prop("checked", false);
//    if (val != undefined && val != null && val != "") {
//        $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem[value='" + val + "']").prop("checked", true);
//    }
//    _modalGaraPhuongAn.show(el);
//    if (callback) {
//        callback();
//    }
//}
//function getDataTablePhuongAnVCX() {
//    var otArr = [];
//    $("#tblPhuongAnCT tr").each(function (e) {
//        var json = {
//            bt: 0, bt_gara: 0, ghi_chu: '', hang_muc: '', ma_gara: '', tien_ht_gara: 0, tien_vtu: 0, tien_khac: 0,
//            tien_nhan_cong: 0, tien_khac_dx: 0, tien_nhan_cong_dx: 0, tien_vtu_dx: 0, tien_dx: 0, nguyen_nhan: ""
//        };
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr('data-val');
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
//                }
//                else if ($(this).hasClass("combobox")) {
//                    json[field] = $(this).attr("data-val");
//                    if (json[field] == undefined) {
//                        json[field] = "";
//                    }
//                }
//                else {
//                    json[field] = $(this).attr('data-val');
//                }
//            });
//        });
//        if (json.hang_muc != '' && json.hang_muc != undefined) {
//            otArr.push(json);
//        }
//    });
//    return otArr;
//}
//function onCheckAllPaHm(el) {
//    var val = $(el).is(':checked');
//    if (val == true) {
//        $('#tblPhuongAnCT tr td input.input_chon_hm_gara').prop('checked', true);
//    } else {
//        $('#tblPhuongAnCT tr td input.input_chon_hm_gara').prop('checked', false);
//    }
//}
function dongBangTyLeThuongTat() {
    _popoverTyLeThuongTat.hide();
}
function tinhTongTienDXuat(el) {
    var tr = $(el).parent().parent();
    var name = $(el).attr("name");
    var val = $(el).val().replace(/[^0-9]+/g, '');
    if (val == undefined || val == null || val=='') {
        val = '0';
    }
    val = parseInt(val);
    var val1 = 0;
    if (name == "tien_vtu_dx_pa") {
        val1 = $(tr).find("input[name='tien_nhan_cong_dx_pa']").val().replace(/[^0-9]+/g, '');
        if (val1 == undefined || val1 == null || val1 == '') {
            val1 = '0';
        }
        val1 = parseInt(val1);
    }
    if (name == "tien_nhan_cong_dx_pa") {
        val1 = $(tr).find("input[name='tien_vtu_dx_pa']").val().replace(/[^0-9]+/g, '');
        if (val1 == undefined || val1 == null || val1 == '') {
            val1 = '0';
        }
        val1 = parseInt(val1);
    }
    $(tr).find("input[name='tien_dx_pa']").val(ESUtil.formatMoney(val + val1));
}
//function tinhToanPA(el) {
//    var mien_thuong_vutt = _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").val();
//    var so_vu = _frmTinhToanBoiThuongPA.getControl("so_vu").val();
//    if (mien_thuong_vutt == undefined || mien_thuong_vutt == null || mien_thuong_vutt == "" || mien_thuong_vutt < 0) {
//        mien_thuong_vutt = 0;
//        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue("0");
//    }
//    if (so_vu == undefined || so_vu == null || so_vu == "" || so_vu < 0) {
//        so_vu = 1;
//        _frmTinhToanBoiThuongPA.getControl("so_vu").setValue("1");
//    }
//    mien_thuong_vutt = parseFloat(mien_thuong_vutt.replace(/[^0-9]+/g, ''));
//    so_vu = parseFloat(so_vu.replace(/[^0-9]+/g, ''));
//    var tong_mien_thuong = mien_thuong_vutt * so_vu;
//    _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(ESUtil.formatMoney(tong_mien_thuong));

//    var data = _frmTinhToanBoiThuongPA.getJsonData();
//    data.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
//    data.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;

//    if (data.tl_thue != undefined && data.tl_thue != null && data.tl_thue == "THM") {
//        data.tl_thue = 0;
//        data.pt_ad_thue_mien_thuong = "THM";//Thuế miễn thường theo thuế hạng mục
//    }
//    else {
//        data.pt_ad_thue_mien_thuong = "TLT";//Thuế miễn thường theo tỷ lệ thuế
//    }

//    data.lh_nv = $("#navPhuongAnNghiepVu li.active").attr("data-lhnv");
//    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == data.lh_nv).firstOrDefault();
//    //Vật chất xe
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
//        ganDuLieuTinhToanPAVCX(el);
//        data.arr = layDuLieuTinhToanPAVCX();
//    }
//    //Người ngồi trên xe
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
//        ganDuLieuTinhToanPANNTX(el);
//        data.arr = layDuLieuTinhToanPANNTX();
//    }
//    //Hàng hóa trên xe
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
//        ganDuLieuTinhToanPAHANGHOA(el);
//        data.arr = layDuLieuTinhToanPAHANGHOA();
//    }
//    //TNDS về người
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
//        ganDuLieuTinhToanPATNDSNGUOI(el);
//        data.arr = layDuLieuTinhToanPATNDSNGUOI();
//    }
//    //TNDS về hành khách
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
//        ganDuLieuTinhToanPATNDSNGUOI_HK(el);
//        data.arr = layDuLieuTinhToanPATNDSNGUOI_HK();
//    }
//    //TNDS về tài sản
//    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
//        ganDuLieuTinhToanPATNDSTAISAN(el);
//        ganDuLieuTinhToanPAVCX(el);//Tài sản là xe
//        data.arr = layDuLieuTinhToanPATNDSTAISAN();
//        var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
//        var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
//        var arrChuanHoa = chuanHoaNVCTTinhToan(data.arr, nhom, doi_tuong, "");
//        var arr = [];
//        var cha_co_pt = arrChuanHoa.where(n => n.so_luong_dt > 0);
//        var cha_Khong_co_pt = arrChuanHoa.where(n => n.so_luong_dt <= 0);
//        for (var i = 0; i < cha_co_pt.length; i++) {
//            for (var j = 0; j < cha_co_pt[i].ds_doi_tuong.length; j++) {
//                arr.push(cha_co_pt[i].ds_doi_tuong[j]);
//            }
//        }
//        for (var i = 0; i < cha_Khong_co_pt.length; i++) {
//            arr.push(cha_Khong_co_pt[i]);
//        }
//        data.arr = arr;
//    }
//    data.mien_thuong = data.mien_thuong.replace(/[^0-9]+/g, '');
//    var thue = data.thue.replace(/[^0-9]+/g, '');
//    if (thue <= 0 || isNaN(thue)) thue = 0;
//    /*data.thue = thue;*/
//    data.thue = 0;
//    _service.tinhPABoiThuongPA(data).then(res => {
//        if (res.state_info.status !== "OK") {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        var objTinhToan = res.data_info;
//        hienThiTongPA(objTinhToan);

//        //Vật chất xe
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
//            $("#tblTinhToanPAVCXTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPAVCXTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
//            $("#tblTinhToanPAVCXTienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
//            $("#tblTinhToanPAVCXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
//            $("#tblTinhToanPAVCXTienGiamGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
//            $("#tblTinhToanPAVCXTienGiamGia_T").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_gia));
//            $("#tblTinhToanPAVCXThue").html(ESUtil.formatMoney(objTinhToan.kq.tien_thue));
//            $("#tblTinhToanPAVCXTienKhauTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_ktru_bao_hiem));
//        }
//        //Hàng hóa trên xe
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
//            $("#tblTinhToanPAHANGHOATienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPAHANGHOATienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
//            $("#tblTinhToanPAHANGHOATienBaoHiem").html(ESUtil.formatMoney(objTinhToan.kq.tien_bao_hiem));
//            $("#tblTinhToanPAHANGHOATienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
//        }
//        //Người ngồi trên xe
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
//            $("#tblTinhToanPANNTXTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPANNTXTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
//        }
//        //TNDS về người
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
//            $("#tblTinhToanPATNDS_NGUOITienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPATNDS_NGUOITienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
//        }
//        //TNDS về hành khách
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
//            $("#tblTinhToanPATNDS_NGUOI_HKTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPATNDS_NGUOI_HKTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));
//        }
//        //TNDS về tài sản
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
//            $("#tblTinhToanPATNDS_TAISANTienDuyetGia").html(ESUtil.formatMoney(objTinhToan.kq.tien_duyet_gia));
//            $("#tblTinhToanPATNDS_TAISANTienKhauHao").html(ESUtil.formatMoney(objTinhToan.kq.tien_khau_hao));
//            $("#tblTinhToanPATNDS_TAISANTienGiamTru").html(ESUtil.formatMoney(objTinhToan.kq.tien_giam_tru));

//            var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
//            var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
//            var arr = chuanHoaNVCTTinhToan(layDuLieuTinhToanTNDSTAISAN(), nhom, doi_tuong);
//            var tien_khau_hao_khac = 0;
//            var tien_bao_hiem_khac = 0;
//            var tien_giam_tru_khac = 0;

//            for (var i = 0; i < arr.length; i++) {
//                if (arr[i].so_luong_dt > 0) {
//                    arr[i].tien_khau_hao = 0;
//                    arr[i].tien_bao_hiem = 0;
//                    arr[i].tien_giam_tru = 0;
//                    for (var j = 0; j < arr[i].ds_doi_tuong.length; j++) {
//                        var pt = arr[i].ds_doi_tuong[j];
//                        pt.tien_khau_hao = parseFloat(pt.gia_duyet) * parseFloat(pt.pt_khau_hao) / 100;
//                        var tien_con_lai = parseFloat(pt.gia_duyet) - pt.tien_khau_hao;
//                        pt.tien_bao_hiem = parseFloat(tien_con_lai) * (1 - parseFloat(pt.pt_bao_hiem) / 100) * tien_con_lai;
//                        tien_con_lai = tien_con_lai - pt.tien_bao_hiem;
//                        pt.tien_giam_tru = parseFloat(tien_con_lai) * parseFloat(pt.pt_giam_tru) / 100;
//                    }
//                    arr[i].tien_khau_hao = arr[i].ds_doi_tuong.sum(n => n.tien_khau_hao);
//                    arr[i].tien_bao_hiem = arr[i].ds_doi_tuong.sum(n => n.tien_bao_hiem);
//                    arr[i].tien_giam_tru = arr[i].ds_doi_tuong.sum(n => n.tien_giam_tru);

//                    $("#tong_khau_hao_" + arr[i].so_id_doi_tuong).html(ESUtil.formatMoney(arr[i].tien_khau_hao));
//                    $("#tong_giam_tru_" + arr[i].so_id_doi_tuong).html(ESUtil.formatMoney(arr[i].tien_giam_tru));
//                }
//                else {
//                    var pt = arr[i];
//                    pt.tien_khau_hao = parseFloat(pt.gia_duyet) * parseFloat(pt.pt_khau_hao) / 100;
//                    var tien_con_lai = parseFloat(pt.gia_duyet) - pt.tien_khau_hao;
//                    pt.tien_bao_hiem = parseFloat(tien_con_lai) * (1 - parseFloat(pt.pt_bao_hiem) / 100) * tien_con_lai;
//                    tien_con_lai = tien_con_lai - pt.tien_bao_hiem;
//                    pt.tien_giam_tru = parseFloat(tien_con_lai) * parseFloat(pt.pt_giam_tru) / 100;
//                }
//            }
//            var tien_khau_hao_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => n.tien_khau_hao);
//            var tien_giam_tru_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => n.tien_giam_tru);

//            $("#tong_khau_hao_ct_khac").html(ESUtil.formatMoney(tien_khau_hao_khac));
//            $("#tong_khau_giam_ct_khac").html(ESUtil.formatMoney(tien_giam_tru_khac));
//        }
//    });
//}
//function onChangeTinhTongPA(el) {
//    var tr = $(el).parent().parent();
//    var td = tr.children();
//    var tien_dx = 0;
//    td.each(function (i) {
//        $(this).find("input").each(function (el) {
//            var field = $(this).attr("data-field");
//            if (field == "tien_dx") {
//                tien_dx = $(this).val().replace(/[^0-9]+/g, '');
//            }
//        });
//        $(this).find("a.combobox").each(function (el) {
//            var field = $(this).attr("data-field");
//            if (field == "tien_dx") {
//                tien_dx = $(this).attr("data-val").replace(/[^0-9]+/g, '');
//            }
//        });
//    });

//    if (tien_dx == "") {
//        tien_dx = 0;
//    }
//    tien_dx = parseFloat(tien_dx);

//    td.each(function (i) {
//        $(this).find("input").each(function (el) {
//            var field = $(this).attr("data-field");
//            if (field == "tien_dx") {
//                $(this).val(ESUtil.formatMoney(tien_dx));
//            }
//        });
//    });

//    var nhom = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-nhom");
//    var doi_tuong = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");

//    var arrData = layDuLieuBangPATNDSTaiSan();
//    arrData = chuanHoaNVCT(arrData, nhom, doi_tuong, "");
//    var arrCha = arrData.where(n => n.so_id_doi_tuong_cha == "0");
//    for (var i = 0; i < arrCha.length; i++) {
//        if (arrCha[i].so_luong_dt > 0) {
//            arrCha[i].tien_dx = arrCha[i].ds_doi_tuong.sum(n => parseFloat(n.tien_dx));

//            $("#input_tien_dx_pa" + arrCha[i].so_id_doi_tuong).val(arrCha[i].tien_dx);

//            $("#tong_pa_dx_" + arrCha[i].so_id_doi_tuong).html(ESUtil.formatMoney(arrCha[i].tien_dx));
//        }
//    }
//    var tong_dx_khac = arrData.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_dx));

//    $("#tong_pa_dx_khac").html(ESUtil.formatMoney(tong_dx_khac));
//}
//function hienThiTongGiamGia(data) {
//    var tong_tien_giam_gia_vtu = 0;
//    var tong_tien_giam_gia_nhan_cong = 0;
//    var tong_tien_giam_gia_khac = 0;
//    var tong_tong_giam_gia = 0;
//    for (var i = 0; i < data.length; i++) {

//        tong_tien_giam_gia_vtu += parseFloat(data[i].tien_giam_gia_vtu);
//        tong_tien_giam_gia_nhan_cong += parseFloat(data[i].tien_giam_gia_nhan_cong);
//        tong_tien_giam_gia_khac += parseFloat(data[i].tien_giam_gia_khac);
//        tong_tong_giam_gia += parseFloat(data[i].tong_giam_gia);
//    }

//    $("#tong_tien_giam_gia_vtu").html(ESUtil.formatMoney(tong_tien_giam_gia_vtu));
//    $("#tong_tien_giam_gia_nhan_cong").html(ESUtil.formatMoney(tong_tien_giam_gia_nhan_cong));
//    $("#tong_tien_giam_gia_khac").html(ESUtil.formatMoney(tong_tien_giam_gia_khac));
//    $("#tong_tong_giam_gia").html(ESUtil.formatMoney(tong_tong_giam_gia));
//}
//function nhapGiamGia(callback = undefined, lh_giam_gia = undefined) {
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
//        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val()
//    };
//    if (lh_giam_gia == undefined || lh_giam_gia == null || lh_giam_gia=='') {
//        lh_giam_gia = "BH";
//    }
//    _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
//    _frmModalGiamGia.getControl("lh_tt_giam_gia").setValue("S");

//    _service.layThongTinGiamGia(obj).then(res => {
//        if (res.state_info.status != 'OK') {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        if (!callback) {
//            ESUtil.genHTML("tblHangMucGiamGiaTemplate", "tblHangMucGiamGia", { danh_sach: res.data_info }, () => {
//                var lh_giam_gia = "BH";
//                var lh_tt_giam_gia = "S";
//                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0 &&
//                    res.data_info[0].lh_giam_gia != undefined && res.data_info[0].lh_giam_gia != null && res.data_info[0].lh_giam_gia != '' &&
//                    res.data_info[0].lh_tt_giam_gia != undefined && res.data_info[0].lh_tt_giam_gia != null && res.data_info[0].lh_tt_giam_gia != '') {
//                    lh_giam_gia = res.data_info[0].lh_giam_gia;
//                    lh_tt_giam_gia = res.data_info[0].lh_tt_giam_gia;
//                }
//                _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
//                _frmModalGiamGia.getControl("lh_tt_giam_gia").setValue(lh_tt_giam_gia);

//                hienThiTongGiamGia(res.data_info);
//            });
//            _modalGiamGia.show();
//            return;
//        }
//        callback(res);
//    });
//}
//function layDuLieuGiamGia() {
//    var otArr = [];
//    $("#tblHangMucGiamGia tr.tblHangMucGiamGiaItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                json[field] = $(this).attr("data-val");
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;
//}
//function layDuLieuThue() {
//    var otArr = [];
//    $("#tblHangMucThue tr.tblHangMucThueItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                json[field] = $(this).attr("data-val");
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;
//}
//function layDuLieuThuePA() {
//    var otArr = [];
//    $("#tblHangMucThuePA tr.tblHangMucThueItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                json[field] = $(this).attr("data-val");
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;
//}
//function hienThiTongThue(data) {
//    var tong_tien_thue_vtu = 0;
//    var tong_tien_thue_nhan_cong = 0;
//    var tong_tien_thue_khac = 0;
//    var tong_tong_thue = 0;
//    for (var i = 0; i < data.length; i++) {

//        tong_tien_thue_vtu += parseFloat(data[i].tien_thue_vtu);
//        tong_tien_thue_nhan_cong += parseFloat(data[i].tien_thue_nhan_cong);
//        tong_tien_thue_khac += parseFloat(data[i].tien_thue_khac);
//        tong_tong_thue += parseFloat(data[i].tong_thue);
//    }

//    $("#tong_tien_thue_vtu").html(ESUtil.formatMoney(tong_tien_thue_vtu));
//    $("#tong_tien_thue_nhan_cong").html(ESUtil.formatMoney(tong_tien_thue_nhan_cong));
//    $("#tong_tien_thue_khac").html(ESUtil.formatMoney(tong_tien_thue_khac));
//    $("#tong_tong_thue").html(ESUtil.formatMoney(tong_tong_thue));
//}
//function hienThiTongThuePA(data) {
//    var tong_tien_thue_vtu = 0;
//    var tong_tien_thue_nhan_cong = 0;
//    var tong_tien_thue_khac = 0;
//    var tong_tong_thue = 0;
//    for (var i = 0; i < data.length; i++) {

//        tong_tien_thue_vtu += parseFloat(data[i].tien_thue_vtu);
//        tong_tien_thue_nhan_cong += parseFloat(data[i].tien_thue_nhan_cong);
//        tong_tien_thue_khac += parseFloat(data[i].tien_thue_khac);
//        tong_tong_thue += parseFloat(data[i].tong_thue);
//    }

//    $("#tong_tien_thue_vtu_pa").html(ESUtil.formatMoney(tong_tien_thue_vtu));
//    $("#tong_tien_thue_nhan_cong_pa").html(ESUtil.formatMoney(tong_tien_thue_nhan_cong));
//    $("#tong_tien_thue_khac_pa").html(ESUtil.formatMoney(tong_tien_thue_khac));
//    $("#tong_tong_thue_pa").html(ESUtil.formatMoney(tong_tong_thue));
//}
function nhapThue() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val()
    };
    _service.layThue(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tblHangMucThueTemplate", "tblHangMucThue", { danh_sach: res.data_info }, () => {
            hienThiTongThue(res.data_info);
        });
        _modalThue.show();
    });
}
//function nhapThuePA() {
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
//        lh_nv: $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv")
//    };
//    _service.layThuePA(obj).then(res => {
//        if (res.state_info.status != 'OK') {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        ESUtil.genHTML("tblHangMucThuePATemplate", "tblHangMucThuePA", { danh_sach: res.data_info }, () => {
//            hienThiTongThuePA(res.data_info);
//        });
//        _modalThuePA.show();
//    });
//}
function layDuLieuKhauTru() {
    var otArr = [];
    $("#tblKhauTru tr.tblKhauTruItem").each(function (e) {
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
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
//function layDuLieuKhauTruPA() {
//    var otArr = [];
//    $("#tblKhauTruPA tr.tblKhauTruItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                json[field] = $(this).attr("data-val");
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;
//}
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
function ganDuLieuKhauTru(arr) {
    ESUtil.genHTML("tblKhauTruTemplate", "tblKhauTru", { danh_sach: arr });
}
function ganDuLieuThue(arr) {
    ESUtil.genHTML("tblHangMucThueTemplate", "tblHangMucThue", { danh_sach: arr });
}
//function ganDuLieuThuePA(arr) {
//    ESUtil.genHTML("tblHangMucThuePATemplate", "tblHangMucThuePA", { danh_sach: arr });
//}
//function ganDuLieuKhauTruPA(arr) {
//    ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: arr });
//}
function tinhGiamGia(hang_muc, field) {
    var arr = layDuLieuGiamGia();
    var check_tl_giam_gia_vtu = $("#check_tl_giam_gia_vtu").is(":checked");
    var check_tien_giam_gia_vtu = $("#check_tien_giam_gia_vtu").is(":checked");
    var check_tl_giam_gia_nhan_cong = $("#check_tl_giam_gia_nhan_cong").is(":checked");
    var check_tien_giam_gia_nhan_cong = $("#check_tien_giam_gia_nhan_cong").is(":checked");
    var check_tl_giam_gia_khac = $("#check_tl_giam_gia_khac").is(":checked");
    var check_tien_giam_gia_khac = $("#check_tien_giam_gia_khac").is(":checked");

    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
    if (field == "tl_giam_gia_vtu") {
        if (check_tl_giam_gia_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
                if (arr[i].tl_giam_gia_vtu > 100)
                    arr[i].tl_giam_gia_vtu = 100;
                if (arr[i].tl_giam_gia_vtu < 0)
                    arr[i].tl_giam_gia_vtu = 0;
                arr[i].tien_giam_gia_vtu = Math.round(arr[i].tl_giam_gia_vtu * parseFloat(arr[i].tien_vtu_duyet) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
                arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
            }
        }
        else {
            item.tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
            if (item.tl_giam_gia_vtu > 100)
                item.tl_giam_gia_vtu = 100;
            if (item.tl_giam_gia_vtu < 0)
                item.tl_giam_gia_vtu = 0;
            item.tien_giam_gia_vtu = Math.round(item.tl_giam_gia_vtu * parseFloat(item.tien_vtu_duyet) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
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
                arr[i].tien_giam_gia_nhan_cong = Math.round(arr[i].tl_giam_gia_nhan_cong * parseFloat(arr[i].tien_nhan_cong_duyet) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
                arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
            }
        }
        else {
            item.tl_giam_gia_nhan_cong = parseFloat(item.tl_giam_gia_nhan_cong);
            if (item.tl_giam_gia_nhan_cong > 100)
                item.tl_giam_gia_nhan_cong = 100;
            if (item.tl_giam_gia_nhan_cong < 0)
                item.tl_giam_gia_nhan_cong = 0;
            item.tien_giam_gia_nhan_cong = Math.round(item.tl_giam_gia_nhan_cong * parseFloat(item.tien_nhan_cong_duyet) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
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
                arr[i].tien_giam_gia_khac = Math.round(arr[i].tl_giam_gia_khac * parseFloat(arr[i].tien_khac_duyet) * 100) / 10000;
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
                arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
            }
        }
        else {
            item.tl_giam_gia_khac = parseFloat(item.tl_giam_gia_khac);
            if (item.tl_giam_gia_khac > 100)
                item.tl_giam_gia_khac = 100;
            if (item.tl_giam_gia_khac < 0)
                item.tl_giam_gia_khac = 0;
            item.tien_giam_gia_khac = Math.round(item.tl_giam_gia_khac * parseFloat(item.tien_khac_duyet) * 100) / 10000;
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
        }

    }
    if (field == "tien_giam_gia_vtu") {
        if (check_tien_giam_gia_vtu) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
                if (arr[i].tien_giam_gia_vtu > parseFloat(arr[i].tien_vtu_duyet))
                    arr[i].tien_giam_gia_vtu = parseFloat(arr[i].tien_vtu_duyet);
                if (arr[i].tien_giam_gia_vtu < 0)
                    arr[i].tien_giam_gia_vtu = 0;
                arr[i].tl_giam_gia_vtu = Math.round(arr[i].tien_giam_gia_vtu * 100 / parseFloat(arr[i].tien_vtu_duyet));
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
                arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
            }
        }
        else {
            item.tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
            if (item.tien_giam_gia_vtu > parseFloat(item.tien_vtu_duyet))
                item.tien_giam_gia_vtu = parseFloat(item.tien_vtu_duyet);
            if (item.tien_giam_gia_vtu < 0)
                item.tien_giam_gia_vtu = 0;
            item.tl_giam_gia_vtu = Math.round(item.tien_giam_gia_vtu * 100 / parseFloat(item.tien_vtu_duyet));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
        }
    }
    if (field == "tien_giam_gia_nhan_cong") {
        if (check_tien_giam_gia_nhan_cong) {
            for (var i = 0; i < arr.length; i++) {
                arr[i].tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
                if (arr[i].tien_giam_gia_nhan_cong > parseFloat(arr[i].tien_nhan_cong_duyet))
                    arr[i].tien_giam_gia_nhan_cong = parseFloat(arr[i].tien_nhan_cong_duyet);
                if (arr[i].tien_giam_gia_nhan_cong < 0)
                    arr[i].tien_giam_gia_nhan_cong = 0;
                arr[i].tl_giam_gia_nhan_cong = Math.round(arr[i].tien_giam_gia_nhan_cong * 100 / parseFloat(arr[i].tien_nhan_cong_duyet));
                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
                arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
            }
        }
        else {
            item.tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
            if (item.tien_giam_gia_nhan_cong > parseFloat(item.tien_nhan_cong_duyet))
                item.tien_giam_gia_nhan_cong = parseFloat(item.tien_nhan_cong_duyet);
            if (item.tien_giam_gia_nhan_cong < 0)
                item.tien_giam_gia_nhan_cong = 0;
            item.tl_giam_gia_nhan_cong = Math.round(item.tien_giam_gia_nhan_cong * 100 / parseFloat(item.tien_nhan_cong_duyet));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
        }

    }
    if (field == "tien_giam_gia_khac") {
        if (check_tien_giam_gia_khac) {
            arr[i].tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
            if (arr[i].tien_giam_gia_khac > parseFloat(arr[i].tien_khac_duyet))
                arr[i].tien_giam_gia_khac = parseFloat(arr[i].tien_khac_duyet);
            if (arr[i].tien_giam_gia_khac < 0)
                arr[i].tien_giam_gia_khac = 0;
            arr[i].tl_giam_gia_khac = Math.round(arr[i].tien_giam_gia_khac * 100 / parseFloat(arr[i].tien_khac_duyet));
            arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
            arr[i].tien_con_lai = parseFloat(arr[i].tong_duyet) - parseFloat(arr[i].tong_giam_gia);
        }
        else {
            item.tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
            if (item.tien_giam_gia_khac > parseFloat(item.tien_khac_duyet))
                item.tien_giam_gia_khac = parseFloat(item.tien_khac_duyet);
            if (item.tien_giam_gia_khac < 0)
                item.tien_giam_gia_khac = 0;
            item.tl_giam_gia_khac = Math.round(item.tien_giam_gia_khac * 100 / parseFloat(item.tien_khac_duyet));
            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
            item.tien_con_lai = parseFloat(item.tong_duyet) - parseFloat(item.tong_giam_gia);
        }
    }
    ganDuLieuGiamGia(arr);
    hienThiTongGiamGia(arr);
}
function tinhThue(hang_muc, field) {
    var arr = layDuLieuThue();
    var check_tl_thue_vtu = $("#check_tl_thue_vtu").is(":checked");
    var check_tien_thue_vtu = $("#check_tien_thue_vtu").is(":checked");
    var check_tl_thue_nhan_cong = $("#check_tl_thue_nhan_cong").is(":checked");
    var check_tien_thue_nhan_cong = $("#check_tien_thue_nhan_cong").is(":checked");
    var check_tl_thue_khac = $("#check_tl_thue_khac").is(":checked");
    var check_tien_thue_khac = $("#check_tien_thue_khac").is(":checked");

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
    ganDuLieuThue(arr);
    hienThiTongThue(arr);
}
//function tinhThuePA(hang_muc, field) {
//    var arr = layDuLieuThuePA();
//    var check_tl_thue_vtu = $("#check_tl_thue_vtu_pa").is(":checked");
//    var check_tien_thue_vtu = $("#check_tien_thue_vtu_pa").is(":checked");
//    var check_tl_thue_nhan_cong = $("#check_tl_thue_nhan_cong_pa").is(":checked");
//    var check_tien_thue_nhan_cong = $("#check_tien_thue_nhan_cong_pa").is(":checked");
//    var check_tl_thue_khac = $("#check_tl_thue_khac_pa").is(":checked");
//    var check_tien_thue_khac = $("#check_tien_thue_khac_pa").is(":checked");

//    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
//    if (field == "tl_thue_vtu") {
//        if (check_tl_thue_vtu) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_thue_vtu = parseFloat(item.tl_thue_vtu);
//                if (arr[i].tl_thue_vtu > 100)
//                    arr[i].tl_thue_vtu = 100;
//                if (arr[i].tl_thue_vtu < 0)
//                    arr[i].tl_thue_vtu = 0;
//                arr[i].tien_thue_vtu = Math.round(arr[i].tl_thue_vtu * parseFloat(arr[i].tien_vtu_duyet) * 100) / 10000;
//                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//            }
//        }
//        else {
//            item.tl_thue_vtu = parseFloat(item.tl_thue_vtu);
//            if (item.tl_thue_vtu > 100)
//                item.tl_thue_vtu = 100;
//            if (item.tl_thue_vtu < 0)
//                item.tl_thue_vtu = 0;
//            item.tien_thue_vtu = Math.round(item.tl_thue_vtu * parseFloat(item.tien_vtu_duyet) * 100) / 10000;
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }
//    }
//    if (field == "tl_thue_nhan_cong") {
//        if (check_tl_thue_nhan_cong) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_thue_nhan_cong = parseFloat(item.tl_thue_nhan_cong);
//                if (arr[i].tl_thue_nhan_cong > 100)
//                    arr[i].tl_thue_nhan_cong = 100;
//                if (arr[i].tl_thue_nhan_cong < 0)
//                    arr[i].tl_thue_nhan_cong = 0;
//                arr[i].tien_thue_nhan_cong = Math.round(arr[i].tl_thue_nhan_cong * parseFloat(arr[i].tien_nhan_cong_duyet) * 100) / 10000;
//                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//            }
//        }
//        else {
//            item.tl_thue_nhan_cong = parseFloat(item.tl_thue_nhan_cong);
//            if (item.tl_thue_nhan_cong > 100)
//                item.tl_thue_nhan_cong = 100;
//            if (item.tl_thue_nhan_cong < 0)
//                item.tl_thue_nhan_cong = 0;
//            item.tien_thue_nhan_cong = Math.round(item.tl_thue_nhan_cong * parseFloat(item.tien_nhan_cong_duyet) * 100) / 10000;
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }
//    }
//    if (field == "tl_thue_khac") {
//        if (check_tl_thue_khac) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_thue_khac = parseFloat(item.tl_thue_khac);
//                if (arr[i].tl_thue_khac > 100)
//                    arr[i].tl_thue_khac = 100;
//                if (arr[i].tl_thue_khac < 0)
//                    arr[i].tl_thue_khac = 0;
//                arr[i].tien_thue_khac = Math.round(arr[i].tl_thue_khac * parseFloat(arr[i].tien_khac_duyet) * 100) / 10000;
//                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//            }
//        }
//        else {
//            item.tl_thue_khac = parseFloat(item.tl_thue_khac);
//            if (item.tl_thue_khac > 100)
//                item.tl_thue_khac = 100;
//            if (item.tl_thue_khac < 0)
//                item.tl_thue_khac = 0;
//            item.tien_thue_khac = Math.round(item.tl_thue_khac * parseFloat(item.tien_khac_duyet) * 100) / 10000;
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }

//    }
//    if (field == "tien_thue_vtu") {
//        if (check_tien_thue_vtu) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tien_thue_vtu = parseFloat(item.tien_thue_vtu);
//                if (arr[i].tien_thue_vtu > parseFloat(arr[i].tien_vtu_duyet))
//                    arr[i].tien_thue_vtu = parseFloat(arr[i].tien_vtu_duyet);
//                if (arr[i].tien_thue_vtu < 0)
//                    arr[i].tien_thue_vtu = 0;
//                arr[i].tl_thue_vtu = Math.round(arr[i].tien_thue_vtu * 100 / parseFloat(arr[i].tien_vtu_duyet));
//                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//            }
//        }
//        else {
//            item.tien_thue_vtu = parseFloat(item.tien_thue_vtu);
//            if (item.tien_thue_vtu > parseFloat(item.tien_vtu_duyet))
//                item.tien_thue_vtu = parseFloat(item.tien_vtu_duyet);
//            if (item.tien_thue_vtu < 0)
//                item.tien_thue_vtu = 0;
//            item.tl_thue_vtu = Math.round(item.tien_thue_vtu * 100 / parseFloat(item.tien_vtu_duyet));
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }
//    }
//    if (field == "tien_thue_nhan_cong") {
//        if (check_tien_thue_nhan_cong) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tien_thue_nhan_cong = parseFloat(item.tien_thue_nhan_cong);
//                if (arr[i].tien_thue_nhan_cong > parseFloat(arr[i].tien_thue_duyet))
//                    arr[i].tien_thue_nhan_cong = parseFloat(arr[i].tien_thue_duyet);
//                if (arr[i].tien_thue_nhan_cong < 0)
//                    arr[i].tien_thue_nhan_cong = 0;
//                arr[i].tl_thue_nhan_cong = Math.round(arr[i].tien_thue_nhan_cong * 100 / parseFloat(arr[i].tien_thue_duyet));
//                arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//            }
//        }
//        else {
//            item.tien_thue_nhan_cong = parseFloat(item.tien_thue_nhan_cong);
//            if (item.tien_thue_nhan_cong > parseFloat(item.tien_nhan_cong_duyet))
//                item.tien_thue_nhan_cong = parseFloat(item.tien_nhan_cong_duyet);
//            if (item.tien_thue_nhan_cong < 0)
//                item.tien_thue_nhan_cong = 0;
//            item.tl_thue_nhan_cong = Math.round(item.tien_thue_nhan_cong * 100 / parseFloat(item.tien_nhan_cong_duyet));
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }
//    }
//    if (field == "tien_thue_khac") {
//        if (check_tien_thue_khac) {
//            arr[i].tien_thue_khac = parseFloat(item.tien_thue_khac);
//            if (arr[i].tien_thue_khac > parseFloat(arr[i].tien_khac_duyet))
//                arr[i].tien_thue_khac = parseFloat(arr[i].tien_khac_duyet);
//            if (arr[i].tien_thue_khac < 0)
//                arr[i].tien_thue_khac = 0;
//            arr[i].tl_thue_khac = Math.round(arr[i].tien_thue_khac * 100 / parseFloat(arr[i].tien_khac_duyet));
//            arr[i].tong_thue = parseFloat(arr[i].tien_thue_vtu) + parseFloat(arr[i].tien_thue_nhan_cong) + parseFloat(arr[i].tien_thue_khac);
//        }
//        else {
//            item.tien_thue_khac = parseFloat(item.tien_thue_khac);
//            if (item.tien_thue_khac > parseFloat(item.tien_khac_duyet))
//                item.tien_thue_khac = parseFloat(item.tien_khac_duyet);
//            if (item.tien_thue_khac < 0)
//                item.tien_thue_khac = 0;
//            item.tl_thue_khac = Math.round(item.tien_thue_khac * 100 / parseFloat(item.tien_khac_duyet));
//            item.tong_thue = parseFloat(item.tien_thue_vtu) + parseFloat(item.tien_thue_nhan_cong) + parseFloat(item.tien_thue_khac);
//        }
//    }
//    ganDuLieuThuePA(arr);
//    hienThiTongThuePA(arr);
//}
function tinhKhauTru(hang_muc, field) {
    var arr = layDuLieuKhauTru();
    var check_tl_ktru_tien_bh = $("#check_tl_ktru_tien_bh").is(":checked");
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
    ganDuLieuKhauTru(arr);
}
//function tinhKhauTruPA(hang_muc, field) {
//    var arr = layDuLieuKhauTruPA();
//    var check_tl_ktru_tien_bh = $("#check_tl_ktru_tien_bh_pa").is(":checked");
//    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
//    if (field == "tl_ktru_tien_bh") {
//        if (check_tl_ktru_tien_bh) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_ktru_tien_bh = parseFloat(item.tl_ktru_tien_bh);
//                if (arr[i].tl_ktru_tien_bh > 100)
//                    arr[i].tl_ktru_tien_bh = 100;
//                if (arr[i].tl_ktru_tien_bh < 0)
//                    arr[i].tl_ktru_tien_bh = 0;
//            }
//        }

//    }
//    ganDuLieuKhauTruPA(arr);
//}
function luuGiamGia(callback = undefined) {
    var arr = layDuLieuGiamGia();
    var lh_giam_gia = _frmModalGiamGia.getControl("lh_giam_gia").val();
    var lh_tt_giam_gia = "S";
    if (arr != undefined && arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            arr[i].lh_giam_gia = lh_giam_gia;
            arr[i].lh_tt_giam_gia = lh_tt_giam_gia;
        }
    }

    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val(),
        hm: arr
    };
    _service.luuThongTinGiamGia(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        nhapGiamGia(resDetail => {
            var arrDetail = resDetail.data_info;
            ganTyLeGiamGiaKhuTruThue(arrDetail);
            $("#btnTinhToan").trigger("click");
            _frmModalGiamGia.getControl("lh_giam_gia").setValue(lh_giam_gia);
        }, lh_giam_gia);
        _notifyService.success("Lưu thông tin giảm giá thành công");
        if (callback) {
            callback(res);
        }
    });
}
function luuKhauTru(callback = undefined) {
    var arr = layDuLieuKhauTru();
    var data = _frmKhauTru.getJsonData();
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val(),
        vu_tt: data.vu_tt,
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
    _service.luuThongTinKhauTru(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        nhapGiamGia(resDetail => {
            var arrDetail = resDetail.data_info;
            ganTyLeGiamGiaKhuTruThue(arrDetail);
            $("#btnTinhToan").trigger("click");
        });
        _notifyService.success("Lưu thông tin khấu trừ thành công");
        if (callback) {
            callback(res);
        }
    });
}
function luuThue(callback = undefined) {
    var arr = layDuLieuThue();
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
        so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val(),
        hm: arr
    };
    _service.luuThongTinThue(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        nhapGiamGia(resDetail => {
            var arrDetail = resDetail.data_info;
            ganTyLeGiamGiaKhuTruThue(arrDetail);
            $("#btnTinhToan").trigger("click");
        });
        _notifyService.success("Lưu thông tin thuế thành công");
        if (callback) {
            callback(res);
        }
    });
}
function ganTyLeGiamGiaKhuTruThue(arr) {
    if (arr == undefined || arr == null || arr.length <= 0) {
        return;
    }
    $("#tblTinhToanVCX tr.tblTinhToanVCXItem").each(function (e) {
        x = $(this).children();
        var ma = $(this).find("input[data-field='hang_muc']").val();
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
                    if (field == "giam_gia") {
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
//function luuKhauTruPA(callback = undefined) {
//    if (_frmKhauTruPA.isValid()) {
//        var arr = layDuLieuKhauTruPA();
//        var data = _frmKhauTruPA.getJsonData();
//        var obj = {
//            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//            vu_tt: data.vu_tt,
//            so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
//            tien_ktru_tien_bh: data.tien_ktru_tien_bh,
//            hm: arr
//        };
//        if (obj.vu_tt == undefined || obj.vu_tt == null || obj.vu_tt == "" || obj.vu_tt == "0") {
//            _notifyService.error("Bạn chưa chọn vụ tổn thất");
//            return;
//        }
//        if (obj.tien_ktru_tien_bh == undefined || obj.tien_ktru_tien_bh == null || obj.tien_ktru_tien_bh == "" || obj.tien_ktru_tien_bh < 0) {
//            _notifyService.error("Số tiền khấu trừ phải lớn hơn hoặc bằng 0");
//            return;
//        }
//        _service.luuThongTinKhauTruPA(obj).then(res => {
//            if (res.state_info.status != 'OK') {
//                _notifyService.error(res.state_info.message_body);
//                return;
//            }
//            nhapGiamGiaPA(res => {
//                var arr = res.data_info;
//                ganTyLeGiamGiaKhuTruThuePA(arr);
//                $("#btnTinhToanPA").trigger("click");
//                xemChiTietPhuongAnGara(obj.so_id_pa);
//            });
//            _notifyService.success("Lưu thông tin khấu trừ thành công");
//            if (callback) {
//                callback(res);
//            }
//        });
//    }
//}
//function hienThiTongGiamGiaPA(data) {
//    var tbl_giam_gia_tong_tien_vtu_duyet = 0;
//    var tbl_giam_gia_tong_tien_nhan_cong_duyet = 0;
//    var tbl_giam_gia_tong_tien_khac_duyet = 0;
//    var tbl_giam_gia_tong_tong_duyet = 0;

//    var tong_tien_giam_gia_vtu = 0;
//    var tong_tien_giam_gia_nhan_cong = 0;
//    var tong_tien_giam_gia_khac = 0;
//    var tong_tong_giam_gia = 0;
//    var tong_tien_con_lai = 0;
//    for (var i = 0; i < data.length; i++) {
//        tbl_giam_gia_tong_tien_vtu_duyet += parseFloat(data[i].tien_vtu);
//        tbl_giam_gia_tong_tien_nhan_cong_duyet += parseFloat(data[i].tien_nhan_cong);
//        tbl_giam_gia_tong_tien_khac_duyet += parseFloat(data[i].tien_khac);
//        tbl_giam_gia_tong_tong_duyet += parseFloat(data[i].tong_duyet);

//        tong_tien_giam_gia_vtu += parseFloat(data[i].tien_giam_gia_vtu);
//        tong_tien_giam_gia_nhan_cong += parseFloat(data[i].tien_giam_gia_nhan_cong);
//        tong_tien_giam_gia_khac += parseFloat(data[i].tien_giam_gia_khac);
//        tong_tong_giam_gia += parseFloat(data[i].tong_giam_gia);
//        tong_tien_con_lai += parseFloat(data[i].tien_con_lai);
//    }
//    $("#tbl_pa_giam_gia_tong_tien_vtu_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_vtu_duyet));
//    $("#tbl_pa_giam_gia_tong_tien_nhan_cong_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_nhan_cong_duyet));
//    $("#tbl_pa_giam_gia_tong_tien_khac_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tien_khac_duyet));
//    $("#tbl_pa_giam_gia_tong_tong_duyet").html(ESUtil.formatMoney(tbl_giam_gia_tong_tong_duyet));

//    $("#tong_tien_giam_gia_vtu_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_vtu));
//    $("#tong_tien_giam_gia_nhan_cong_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_nhan_cong));
//    $("#tong_tien_giam_gia_khac_pa").html(ESUtil.formatMoney(tong_tien_giam_gia_khac));
//    $("#tong_tong_giam_gia_pa").html(ESUtil.formatMoney(tong_tong_giam_gia));
//    $("#tong_tien_con_lai_pa").html(ESUtil.formatMoney(tong_tien_con_lai));
//}
//function nhapGiamGiaPA(callback = undefined) {
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val()
//    };
//    _frmModalGiamGiaPA.getControl("lh_giam_gia").setValue("BH");
//    _frmModalGiamGiaPA.getControl("lh_tt_giam_gia").setValue("S");

//    _service.layDanhSachGiamGiaPA(obj).then(res => {
//        if (res.state_info.status != 'OK') {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        if (callback) {
//            callback(res);
//        }
//        else {
//            ESUtil.genHTML("tblHangMucGiamGiaPATemplate", "tblHangMucGiamGiaPA", { danh_sach: res.data_info }, () => {
//                var lh_giam_gia = "BH";
//                var lh_tt_giam_gia = "S";
//                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0 &&
//                    res.data_info[0].lh_giam_gia != undefined && res.data_info[0].lh_giam_gia != null && res.data_info[0].lh_giam_gia != '' &&
//                    res.data_info[0].lh_tt_giam_gia != undefined && res.data_info[0].lh_tt_giam_gia != null && res.data_info[0].lh_tt_giam_gia != '') {
//                    lh_giam_gia = res.data_info[0].lh_giam_gia;
//                    lh_tt_giam_gia = res.data_info[0].lh_tt_giam_gia;
//                }
//                _frmModalGiamGiaPA.getControl("lh_giam_gia").setValue(lh_giam_gia);
//                _frmModalGiamGiaPA.getControl("lh_tt_giam_gia").setValue(lh_tt_giam_gia);
//                hienThiTongGiamGiaPA(res.data_info);
//            });
//            _modalGiamGiaPA.show();
//        }
//    });
//    //luuPASC(() => {

//    //});
//}
//function layDuLieuGiamGiaPA() {
//    var otArr = [];
//    $("#tblHangMucGiamGiaPA tr.tblHangMucGiamGiaItem").each(function (e) {
//        var json = {};
//        x = $(this).children();
//        x.each(function (i) {
//            $(this).find("input").each(function (el) {
//                var field = $(this).attr("data-field");
//                if ($(this).hasClass("number")) {
//                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
//                }
//                else {
//                    json[field] = $(this).val();
//                }
//            });
//            $(this).find("a").each(function (el) {
//                var field = $(this).attr("data-field");
//                json[field] = $(this).attr("data-val");
//            });
//        });
//        otArr.push(json);
//    });
//    return otArr;
//}
//function ganDuLieuGiamGiaPA(arr) {
//    ESUtil.genHTML("tblHangMucGiamGiaPATemplate", "tblHangMucGiamGiaPA", { danh_sach: arr });
//}
//function tinhGiamGiaPA(hang_muc, field) {
//    var arr = layDuLieuGiamGiaPA();
//    var check_tl_giam_gia_vtu = $("#check_tl_giam_gia_vtu_pa").is(":checked");
//    var check_tien_giam_gia_vtu = $("#check_tien_giam_gia_vtu_pa").is(":checked");
//    var check_tl_giam_gia_nhan_cong = $("#check_tl_giam_gia_nhan_cong_pa").is(":checked");
//    var check_tien_giam_gia_nhan_cong = $("#check_tien_giam_gia_nhan_cong_pa").is(":checked");
//    var check_tl_giam_gia_khac = $("#check_tl_giam_gia_khac_pa").is(":checked");
//    var check_tien_giam_gia_khac = $("#check_tien_giam_gia_khac_pa").is(":checked");

//    var item = arr.where(n => n.hang_muc == hang_muc).firstOrDefault();
//    if (field == "tl_giam_gia_vtu") {
//        if (check_tl_giam_gia_vtu) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
//                if (arr[i].tl_giam_gia_vtu > 100)
//                    arr[i].tl_giam_gia_vtu = 100;
//                if (arr[i].tl_giam_gia_vtu < 0)
//                    arr[i].tl_giam_gia_vtu = 0;
//                arr[i].tien_giam_gia_vtu = Math.round(arr[i].tl_giam_gia_vtu * parseFloat(arr[i].tien_vtu) * 100) / 10000;
//                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//            }
//        }
//        else {
//            item.tl_giam_gia_vtu = parseFloat(item.tl_giam_gia_vtu);
//            if (item.tl_giam_gia_vtu > 100)
//                item.tl_giam_gia_vtu = 100;
//            if (item.tl_giam_gia_vtu < 0)
//                item.tl_giam_gia_vtu = 0;
//            item.tien_giam_gia_vtu = Math.round(item.tl_giam_gia_vtu * parseFloat(item.tien_vtu) * 100) / 10000;
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }
//    }
//    if (field == "tl_giam_gia_nhan_cong") {
//        if (check_tl_giam_gia_nhan_cong) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_giam_gia_nhan_cong = parseFloat(item.tl_giam_gia_nhan_cong);
//                if (arr[i].tl_giam_gia_nhan_cong > 100)
//                    arr[i].tl_giam_gia_nhan_cong = 100;
//                if (arr[i].tl_giam_gia_nhan_cong < 0)
//                    arr[i].tl_giam_gia_nhan_cong = 0;
//                arr[i].tien_giam_gia_nhan_cong = Math.round(arr[i].tl_giam_gia_nhan_cong * parseFloat(arr[i].tien_nhan_cong) * 100) / 10000;
//                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//            }
//        }
//        else {
//            item.tl_giam_gia_nhan_cong = parseFloat(item.tl_giam_gia_nhan_cong);
//            if (item.tl_giam_gia_nhan_cong > 100)
//                item.tl_giam_gia_nhan_cong = 100;
//            if (item.tl_giam_gia_nhan_cong < 0)
//                item.tl_giam_gia_nhan_cong = 0;
//            item.tien_giam_gia_nhan_cong = Math.round(item.tl_giam_gia_nhan_cong * parseFloat(item.tien_nhan_cong) * 100) / 10000;
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }
//    }
//    if (field == "tl_giam_gia_khac") {
//        if (check_tl_giam_gia_khac) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tl_giam_gia_khac = parseFloat(item.tl_giam_gia_khac);
//                if (arr[i].tl_giam_gia_khac > 100)
//                    arr[i].tl_giam_gia_khac = 100;
//                if (arr[i].tl_giam_gia_khac < 0)
//                    arr[i].tl_giam_gia_khac = 0;
//                arr[i].tien_giam_gia_khac = Math.round(arr[i].tl_giam_gia_khac * parseFloat(arr[i].tien_khac) * 100) / 10000;
//                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//            }
//        }
//        else {
//            item.tl_giam_gia_khac = parseFloat(item.tl_giam_gia_khac);
//            if (item.tl_giam_gia_khac > 100)
//                item.tl_giam_gia_khac = 100;
//            if (item.tl_giam_gia_khac < 0)
//                item.tl_giam_gia_khac = 0;
//            item.tien_giam_gia_khac = Math.round(item.tl_giam_gia_khac * parseFloat(item.tien_khac) * 100) / 10000;
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }

//    }
//    if (field == "tien_giam_gia_vtu") {
//        if (check_tien_giam_gia_vtu) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
//                if (arr[i].tien_giam_gia_vtu > parseFloat(arr[i].tien_vtu))
//                    arr[i].tien_giam_gia_vtu = parseFloat(arr[i].tien_vtu);
//                if (arr[i].tien_giam_gia_vtu < 0)
//                    arr[i].tien_giam_gia_vtu = 0;
//                arr[i].tl_giam_gia_vtu = Math.round(arr[i].tien_giam_gia_vtu * 100 / parseFloat(arr[i].tien_vtu));
//                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//            }
//        }
//        else {
//            item.tien_giam_gia_vtu = parseFloat(item.tien_giam_gia_vtu);
//            if (item.tien_giam_gia_vtu > parseFloat(item.tien_vtu))
//                item.tien_giam_gia_vtu = parseFloat(item.tien_vtu);
//            if (item.tien_giam_gia_vtu < 0)
//                item.tien_giam_gia_vtu = 0;
//            item.tl_giam_gia_vtu = Math.round(item.tien_giam_gia_vtu * 100 / parseFloat(item.tien_vtu));
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }
//    }
//    if (field == "tien_giam_gia_nhan_cong") {
//        if (check_tien_giam_gia_nhan_cong) {
//            for (var i = 0; i < arr.length; i++) {
//                arr[i].tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
//                if (arr[i].tien_giam_gia_nhan_cong > parseFloat(arr[i].tien_nhan_cong))
//                    arr[i].tien_giam_gia_nhan_cong = parseFloat(arr[i].tien_nhan_cong);
//                if (arr[i].tien_giam_gia_nhan_cong < 0)
//                    arr[i].tien_giam_gia_nhan_cong = 0;
//                arr[i].tl_giam_gia_nhan_cong = Math.round(arr[i].tien_giam_gia_nhan_cong * 100 / parseFloat(arr[i].tien_nhan_cong));
//                arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//            }
//        }
//        else {
//            item.tien_giam_gia_nhan_cong = parseFloat(item.tien_giam_gia_nhan_cong);
//            if (item.tien_giam_gia_nhan_cong > parseFloat(item.tien_nhan_cong))
//                item.tien_giam_gia_nhan_cong = parseFloat(item.tien_nhan_cong);
//            if (item.tien_giam_gia_nhan_cong < 0)
//                item.tien_giam_gia_nhan_cong = 0;
//            item.tl_giam_gia_nhan_cong = Math.round(item.tien_giam_gia_nhan_cong * 100 / parseFloat(item.tien_nhan_cong));
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }

//    }
//    if (field == "tien_giam_gia_khac") {
//        if (check_tien_giam_gia_khac) {
//            arr[i].tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
//            if (arr[i].tien_giam_gia_khac > parseFloat(arr[i].tien_khac))
//                arr[i].tien_giam_gia_khac = parseFloat(arr[i].tien_khac);
//            if (arr[i].tien_giam_gia_khac < 0)
//                arr[i].tien_giam_gia_khac = 0;
//            arr[i].tl_giam_gia_khac = Math.round(arr[i].tien_giam_gia_khac * 100 / parseFloat(arr[i].tien_khac));
//            arr[i].tong_giam_gia = parseFloat(arr[i].tien_giam_gia_vtu) + parseFloat(arr[i].tien_giam_gia_nhan_cong) + parseFloat(arr[i].tien_giam_gia_khac);
//        }
//        else {
//            item.tien_giam_gia_khac = parseFloat(item.tien_giam_gia_khac);
//            if (item.tien_giam_gia_khac > parseFloat(item.tien_khac))
//                item.tien_giam_gia_khac = parseFloat(item.tien_khac);
//            if (item.tien_giam_gia_khac < 0)
//                item.tien_giam_gia_khac = 0;
//            item.tl_giam_gia_khac = Math.round(item.tien_giam_gia_khac * 100 / parseFloat(item.tien_khac));
//            item.tong_giam_gia = parseFloat(item.tien_giam_gia_vtu) + parseFloat(item.tien_giam_gia_nhan_cong) + parseFloat(item.tien_giam_gia_khac);
//        }
//    }

//    ganDuLieuGiamGiaPA(arr);
//    hienThiTongGiamGiaPA(arr);
//}
//function ganTyLeGiamGiaKhuTruThuePA(arr) {
//    if (arr == undefined || arr == null || arr.length <= 0) {
//        return;
//    }
//    $("#tblPhuongAnCT tr.tblPhuongAnCTItem").each(function (e) {
//        x = $(this).children();
//        var ma = $(this).find("input[name='hang_muc']").val();
//        var hang_muc = arr.where(n => n.hang_muc == ma).firstOrDefault();
//        if (hang_muc != null) {
//            var tl_giam_gia_vtu = hang_muc.tl_giam_gia_vtu;
//            var tl_giam_gia_nhan_cong = hang_muc.tl_giam_gia_nhan_cong;
//            var tl_giam_gia_khac = hang_muc.tl_giam_gia_khac;
//            var tien_giam_gia_vtu = hang_muc.tien_giam_gia_vtu;
//            var tien_giam_gia_nhan_cong = hang_muc.tien_giam_gia_nhan_cong;
//            var tien_giam_gia_khac = hang_muc.tien_giam_gia_khac;
//            var tl_ktru_tien_bh = hang_muc.tl_ktru_tien_bh;
//            var tien_ktru_tien_bh = hang_muc.tien_ktru_tien_bh;
//            var tl_thue_vtu = hang_muc.tl_thue_vtu;
//            var tl_thue_nhan_cong = hang_muc.tl_thue_nhan_cong;
//            var tl_thue_khac = hang_muc.tl_thue_khac;
//            var tien_thue = hang_muc.tien_thue_vtu + hang_muc.tien_thue_nhan_cong + hang_muc.tien_thue_khac;

//            x.each(function (i) {
//                $(this).find("input").each(function (el) {
//                    var field = $(this).attr("data-field");
//                    if (field == "tl_giam_gia_vtu") {
//                        $(this).val(tl_giam_gia_vtu);
//                    }
//                    if (field == "tl_giam_gia_nhan_cong") {
//                        $(this).val(tl_giam_gia_nhan_cong);
//                    }
//                    if (field == "tl_giam_gia_khac") {
//                        $(this).val(tl_giam_gia_khac);
//                    }
//                    if (field == "tien_giam_gia_vtu") {
//                        $(this).val(tien_giam_gia_vtu);
//                    }
//                    if (field == "tien_giam_gia_nhan_cong") {
//                        $(this).val(tien_giam_gia_nhan_cong);
//                    }
//                    if (field == "tien_giam_gia_khac") {
//                        $(this).val(tien_giam_gia_khac);
//                    }
//                    if (field == "tl_ktru_tien_bh") {
//                        $(this).val(tl_ktru_tien_bh);
//                    }
//                    if (field == "tl_thue_vtu") {
//                        $(this).val(tl_thue_vtu);
//                    }
//                    if (field == "tl_thue_nhan_cong") {
//                        $(this).val(tl_thue_nhan_cong);
//                    }
//                    if (field == "tl_thue_khac") {
//                        $(this).val(tl_thue_khac);
//                    }
//                });
//                $(this).find("a.combobox").each(function (el) {
//                    var field = $(this).attr("data-field");
//                    if (field == "tien_giam_gia") {
//                        $(this).html(ESUtil.formatMoney(tien_giam_gia_vtu + tien_giam_gia_nhan_cong + tien_giam_gia_khac));
//                        $(this).attr("data-val", tien_giam_gia_vtu + tien_giam_gia_nhan_cong + tien_giam_gia_khac);
//                    }
//                    if (field == "tien_ktru_tien_bh") {
//                        $(this).html(ESUtil.formatMoney(tien_ktru_tien_bh));
//                        $(this).attr("data-val", tien_ktru_tien_bh);
//                    }
//                    if (field == "tien_thue") {
//                        $(this).html(ESUtil.formatMoney(tien_thue));
//                        $(this).attr("data-val", tien_thue);
//                    }
//                });
//            });
//        }
//    });
//}
//function luuGiamGiaPA(callback = undefined) {
//    var arr = layDuLieuGiamGiaPA();
//    if (arr != undefined && arr != null && arr.length > 0) {
//        var lh_giam_gia = _frmModalGiamGiaPA.getControl("lh_giam_gia").val();
//        var lh_tt_giam_gia = "S";
//        for (var i = 0; i < arr.length; i++) {
//            arr[i].lh_giam_gia = lh_giam_gia;
//            arr[i].lh_tt_giam_gia = lh_tt_giam_gia;
//        }
//    }
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
//        hm: arr
//    };
//    _service.luuThongTinGiamGiaPA(obj).then(res => {
//        if (res.state_info.status != 'OK') {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        _notifyService.success("Lưu thông tin giảm giá thành công");
//        nhapGiamGiaPA(res => {
//            var arr = res.data_info;
//            ganTyLeGiamGiaKhuTruThuePA(arr);
//            $("#btnTinhToanPA").trigger("click");
//            xemChiTietPhuongAnGara(obj.so_id_pa);
//        });
//        if (callback) {
//            callback(res);
//        }
//    });
//}
//function luuThuePA(callback = undefined) {
//    var arr = layDuLieuThuePA();
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
//        hm: arr
//    };
//    _service.luuThongTinThuePA(obj).then(res => {
//        if (res.state_info.status != 'OK') {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        nhapGiamGiaPA(res => {
//            var arr = res.data_info;
//            ganTyLeGiamGiaKhuTruThuePA(arr);
//            $("#btnTinhToanPA").trigger("click");
//            xemChiTietPhuongAnGara(obj.so_id_pa);
//        });
//        _notifyService.success("Lưu thông tin thuế thành công");
//        if (callback) {
//            callback(res);
//        }
//    });
//}
function bindDataDonViHanhChinh(objDanhMucDonViHanhChinh) {
    var dviHanhChinh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
    _frmAddChiPhiKhac.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmAddChiPhiKhac.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmAddChiPhiKhac.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmAddChiPhiKhac.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmAddChiPhiKhac.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmAddChiPhiKhac.getControl("quan_huyen").setValue("");
        _frmAddChiPhiKhac.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmAddChiPhiKhac.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmAddChiPhiKhac.getControl("xa_phuong").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmAddChiPhiKhac.getControl("xa_phuong").setValue("");
    });
}
function xemBangChiTietGia(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }
    _service.xemBangGiaChiTiet(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }

        ESUtil.genHTML("modalBangTinhToanChiTietTemplate", "modalBangTinhToanChiTiet", res.data_info, () => {
            $("#modalBangTinhToanChiTiet .pa_nghiep_vu_bang_tinh").addClass("d-none");
            for (var i = 0; i < res.data_info.lh_nv.length; i++) {
                var lh_nv_show = res.data_info.lh_nv[i].vcx + res.data_info.lh_nv[i].doi_tuong;
                $("#modalBangTinhToanChiTiet ." + lh_nv_show.toUpperCase()).removeClass("d-none");
            }
        });

        _popoverBangGiaChiTiet.options = { placement: "custom" };
        _popoverBangGiaChiTiet.options.position = { top: 55, left: 250 };
        _popoverBangGiaChiTiet.showWithPosition(el);
    });
}
function capNhatUocTonThatBT(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        uoc_ton_that: ho_so_chi_tiet.data_info.ho_so.uoc_ton_that
    }
    _carClaimCommon.showUocTonThat(obj, el);
}
function bindThongTinDonViThamGia(ma_chi_phi) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_phi: ma_chi_phi
    }
    _carClaimCommonService.lietKeThongTinDonVi(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var arrData = res.data_info.lke_dvi;
        if (arrData != null && arrData.length > 0) {
            if (ma_chi_phi == "CP_CAU_KEO") {
                _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource(arrData, "ten", "ma_nhom", "Chọn đơn vị tham gia", "");
            } else {
                _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource(arrData, "ten", "ma", "Chọn đơn vị tham gia", "");
            }
        } else {
            _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource([], "ten", "ma", "Chọn đơn vị tham gia", "");
            resetFormChiPhiKhac();
        }
    });
}
function bindDataThongTinChiTietForm(ma_chi_phi, ma, nhom) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_phi: ma_chi_phi,
        ma: ma,
        nhom: nhom
    }
    _carClaimCommonService.lietKeThongTinDonVi(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.lke_tt;
        if (data !== null && data !== undefined) {
            _frmAddChiPhiKhac.getControl("ngan_hang").setValue(data.ngan_hang);
            _frmAddChiPhiKhac.getControl("stk").setValue(data.stk);
            _frmAddChiPhiKhac.getControl("chu_tk").setValue(data.chu_tk);
        } else {
            resetFormChiPhiKhac();
        }
    });
}
function bindThongTinChiTietGara(ma_gara, ma_chi_phi) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_gara: ma_gara,
        ma_chi_phi: ma_chi_phi
    }
    _carClaimCommonService.lietKeThongTinDonVi(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.tt_gara;
        if (data !== null && data !== undefined) {
            _frmAddChiPhiKhac.getControl("tinh_thanh").setValue(data.tinh_thanh);
            _frmAddChiPhiKhac.getControl("tinh_thanh").trigger("select2:select");
            _frmAddChiPhiKhac.getControl("quan_huyen").setValue(data.quan_huyen);
            _frmAddChiPhiKhac.getControl("quan_huyen").trigger("select2:select");
            _frmAddChiPhiKhac.getControl("dia_chi").setValue(data.dia_chi);
        } else {
            bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh)
            _frmAddChiPhiKhac.getControl("tinh_thanh").setValue("");
            _frmAddChiPhiKhac.getControl("quan_huyen").setValue("");
            _frmAddChiPhiKhac.getControl("xa_phuong").setValue("");
            _frmAddChiPhiKhac.getControl("dia_chi").setValue("");
        }
    });
}
function resetFormChiPhiKhac() {
    _frmAddChiPhiKhac.clearErrorMessage();
    _frmAddChiPhiKhac.getControl("stk").setValue("");
    _frmAddChiPhiKhac.getControl("bt").setValue("");
    _frmAddChiPhiKhac.getControl("nhom").setValue("");
    _frmAddChiPhiKhac.getControl("chi_phi_khac").setValue("");
    _frmAddChiPhiKhac.getControl("chi_phi_cau").setValue("");
    _frmAddChiPhiKhac.getControl("chi_phi_keo").setValue("");
    _frmAddChiPhiKhac.getControl("ten_chi_phi").setValue("");
    _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_cau").setValue("");
    _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_keo").setValue("");
    _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_khac").setValue("");
    _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_cau").setValue("");
    _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_keo").setValue("");
    _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_khac").setValue("");
    _frmAddChiPhiKhac.getControl("chu_tk").setValue("");
    _frmAddChiPhiKhac.getControl("ngan_hang").setValue("");
    _frmAddChiPhiKhac.getControl("khoang_cach_km").setValue("");
    _frmAddChiPhiKhac.getControl("tinh_thanh").setValue("");
    _frmAddChiPhiKhac.getControl("quan_huyen").setValue("");
    _frmAddChiPhiKhac.getControl("xa_phuong").setValue("");
    _frmAddChiPhiKhac.getControl("dia_chi").setValue("");
    _frmAddChiPhiKhac.getControl("ma_gara").setValue("");
    _frmAddChiPhiKhac.getControl("noi_dung").setValue("");
}
function getPagingChiPhiKhac(trang, callback = undefined) {
    var objTimKiem = _frmTKiemChiPhiKhac.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 8;
    objTimKiem.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    objTimKiem.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    _carClaimCommonService.getPagingChiPhiKhac(objTimKiem).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tblDanhSachDonViThamGiaTemplate", "tblDanhSachDonViThamGia", { data: res.data_info.data });
        $("#tableDonViThamGia_pagination").html(ESUtil.pagingHTML("getPagingChiPhiKhac", objTimKiem.trang, res.data_info.tong_so_dong, objTimKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function suaChiPhiKhac(so_id, ma_chi_phi, bt) {
    var obj = {
        so_id: so_id,
        ma_chi_phi: ma_chi_phi,
        bt: bt
    };
    _carClaimCommonService.getDetailChiPhiKhac(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info;
        var arr = [
            { ma: data.ma, ten: data.ten }
        ]
        var dsDoiTuongTaiSanXe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || (n.nhom == "TAI_SAN" && n.loai == "XE"));
        var dsLHNV = ho_so_chi_tiet.data_info.lh_nv;
        if (data.ma_chi_phi == "CP_CAU" || data.ma_chi_phi == "CP_KEO")
            data.ma_chi_phi = "CP_CAU_KEO";
        _frmAddChiPhiKhac.clearErrorMessage();
        _frmAddChiPhiKhac.getControl("ma_chi_phi").readOnly();
        _frmAddChiPhiKhac.getControl("dvi_tham_gia").readOnly();
        _frmAddChiPhiKhac.getControl("lh_nv").readOnly();
        _frmAddChiPhiKhac.getControl("so_id_doi_tuong").readOnly();
        _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource(arr, "ten", "ma", "Chọn đơn vị tham gia", data.ma);
        _frmAddChiPhiKhac.getControl("so_id_doi_tuong").setDataSource(dsDoiTuongTaiSanXe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", data.so_id_doi_tuong);
        _frmAddChiPhiKhac.getControl("lh_nv").setDataSource(dsLHNV, "ten", "ma", "Chọn loại hình nghiệp vụ", data.lh_nv);

        if (data.ma_chi_phi == "CP_GIAM_DINH") {
            anHienColChiPhiKhac(data.ma_chi_phi, "");
        } else if (data.ma_chi_phi == "KHAC") {
            anHienColChiPhiKhac(data.ma_chi_phi, "");
        } else if (data.ma_chi_phi == "CP_CAU_KEO") {
            $("#thongTinDiaDiemKeoXe").removeClass("d-none");
            anHienColChiPhiKhac(data.ma_chi_phi, data.nhom);
            if (data.tinh_thanh !== null || data.quan_huyen !== null || data.xa_phuong !== null) {
                _frmAddChiPhiKhac.getControl("tinh_thanh").setValue(data.tinh_thanh);
                _frmAddChiPhiKhac.getControl("tinh_thanh").trigger("select2:select");
                _frmAddChiPhiKhac.getControl("quan_huyen").setValue(data.quan_huyen);
                _frmAddChiPhiKhac.getControl("quan_huyen").trigger("select2:select");
                _frmAddChiPhiKhac.getControl("xa_phuong").trigger(data.xa_phuong);
            }
        }
        _frmAddChiPhiKhac.setData(data);
        $("#modalAddChiPhiKhacForm").removeClass("d-none");
        $("#modalDanhSachDonViThamGia").addClass("d-none");
        $("#btnXoaAddChiPhiKhac").show();
    });
}
function tinhTienThueChiPhiKhac() {
    var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").getValue();
    if (ma_chi_phi == "KHAC" || ma_chi_phi == "CP_GIAM_DINH") {
        var tien_khac = 0; thue_khac = 0;
        var tien = _frmAddChiPhiKhac.getControl("chi_phi_khac").getValue();
        var thue = _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_khac").getValue();
        if (tien !== null && tien.trim() !== "" && tien > 0 && !(isNaN(tien))) {
            tien_khac = parseInt(tien);
        }
        if (thue !== null && thue.trim() !== "" && thue > 0 && !(isNaN(thue))) {
            thue_khac = parseInt(thue);
        }
        var tien_thue = Math.round(tien_khac * (thue_khac / 100));
        _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_khac").setValue(ESUtil.formatMoney(tien_thue));
    } else if (ma_chi_phi == "CP_CAU_KEO") {
        var tien_cau = 0; tien_keo = 0; tl_thue_cau = 0; tl_thue_keo = 0;
        var cau = _frmAddChiPhiKhac.getControl("chi_phi_cau").getValue();
        var keo = _frmAddChiPhiKhac.getControl("chi_phi_keo").getValue();
        var thue_cau = _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_cau").getValue();
        var thue_keo = _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_keo").getValue();
        if (cau !== null && cau.trim() !== "" && cau > 0 && !(isNaN(cau))) {
            tien_cau = parseInt(cau);
        }
        if (keo !== null && keo.trim() !== "" && keo > 0 && !(isNaN(keo))) {
            tien_keo = parseInt(keo);
        }
        if (thue_cau !== null && thue_cau.trim() !== "" && thue_cau > 0 && !(isNaN(thue_cau))) {
            tl_thue_cau = parseInt(thue_cau);
        }
        if (thue_keo !== null && thue_keo.trim() !== "" && thue_keo > 0 && !(isNaN(thue_keo))) {
            tl_thue_keo = parseInt(thue_keo);
        }
        if (tien_cau > 0 && tien_keo <= 0) {
            var tien_thue_cau = Math.round(tien_cau * (tl_thue_cau / 100));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_cau").setValue(ESUtil.formatMoney(tien_thue_cau));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_keo").setValue(0);
        }
        if (tien_keo > 0 && tien_cau <= 0) {
            var tien_thue_keo = Math.round(tien_keo * (tl_thue_keo / 100));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_keo").setValue(ESUtil.formatMoney(tien_thue_keo));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_cau").setValue(0);
        }
        if (tien_cau > 0 && tien_keo > 0) {
            var tien_thue_cau = Math.round(tien_cau * (tl_thue_cau / 100));
            var tien_thue_keo = Math.round(tien_keo * (tl_thue_keo / 100));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_keo").setValue(ESUtil.formatMoney(tien_thue_keo));
            _frmAddChiPhiKhac.getControl("tien_thue_chi_phi_cau").setValue(ESUtil.formatMoney(tien_thue_cau));
        }
    }
}
function tinhTongTienHoSoChiPhiKhac(data) {
    if (data.length > 0) {
        var tong_tien = 0;
        for (var i = 0; i < data.length; i++) {
            tong_tien += data[i].tong_cong;
        }
    }
    $("#tong_tien_ho_so").html(ESUtil.formatMoney(tong_tien));
}
function anHienColChiPhiKhac(ma_chi_phi, nhom) {
    $("#donViThamGia").show();
    if (ma_chi_phi === "CP_GIAM_DINH") {
        $("#divChiPhiCauXe").addClass("d-none");
        $("#divChiPhiKeoXe").addClass("d-none");
        $("#thongTinDiaDiemKeoXe").hide();
        $("#divChiPhiKhac").show();
        $("#donViThamGia").show();
        $("#tien_keo_xe").hide();
        $("#tl_thue_keo_xe").hide();
        $("#tien_thue_keo_xe").hide();
        $("#tien_cau_xe").hide();
        $("#tl_thue_cau_xe").hide();
        $("#tien_thue_cau_xe").hide();

        $('form[name=frmAddChiPhiKhac] select[name=dvi_tham_gia]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=ten_chi_phi]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=khoang_cach_km]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tinh_thanh]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=quan_huyen]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=xa_phuong]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=dia_chi]').prop('required', false);
    } else if (ma_chi_phi === "KHAC") {
        $("#donViThamGia").hide();
        $("#thongTinDiaDiemKeoXe").hide();
        $("#divChiPhiCauXe").addClass("d-none");
        $("#divChiPhiKeoXe").addClass("d-none");
        $("#tien_keo_xe").hide();
        $("#tl_thue_keo_xe").hide();
        $("#tien_thue_keo_xe").hide();
        $("#tien_cau_xe").hide();
        $("#tl_thue_cau_xe").hide();
        $("#tien_thue_cau_xe").hide();
        $("#divChiPhiKhac").show();

        $('form[name=frmAddChiPhiKhac] select[name=dvi_tham_gia]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_cau]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_keo]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=ten_chi_phi]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_khac]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=khoang_cach_km]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tinh_thanh]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=quan_huyen]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=xa_phuong]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=dia_chi]').prop('required', false);
    } else if (ma_chi_phi === "CP_CAU_KEO" && nhom !== "") {
        $("#divChiPhiKhac").hide();
        $("#donViThamGia").show();
        $("#thongTinDiaDiemKeoXe").show();
        $('form[name=frmAddChiPhiKhac] select[name=dvi_tham_gia]').prop('required', true);
        $('form[name=frmAddChiPhiKhac] input[name=chi_phi_khac]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=ten_chi_phi]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_khac]').prop('required', false);
        $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_khac]').prop('required', false);
        if (nhom === "CAU") {
            $("#tien_cau_xe").removeClass("d-none");
            $("#tl_thue_cau_xe").removeClass("d-none");
            $("#tien_thue_cau_xe").removeClass("d-none");
            $("#thongTinDiaDiemKeoXe").hide();
            $("#divChiPhiKeo").hide();
            $("#tien_keo_xe").hide();
            $("#tl_thue_keo_xe").hide();
            $("#tien_thue_keo_xe").hide();
            $("#tien_cau_xe").show();
            $("#tl_thue_cau_xe").show();
            $("#tien_thue_cau_xe").show();
            $("#divChiPhiCauXe").removeClass("d-none");
            $("#divChiPhiKeoXe").addClass("d-none");
            $("#divChiPhiCau").show();
            $("#tl_thue_chi_phi_cau").show();
            $("#tien_thue_chi_phi_cau").show();

            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_cau]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_cau]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_cau]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_keo]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_keo]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_keo]').prop('required', false);

            $('form[name=frmAddChiPhiKhac] input[name=khoang_cach_km]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=tinh_thanh]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=quan_huyen]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=xa_phuong]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=dia_chi]').prop('required', false);
        } else if (nhom === "KEO") {
            $("#tien_keo_xe").removeClass("d-none");
            $("#tl_thue_keo_xe").removeClass("d-none");
            $("#tien_thue_keo_xe").removeClass("d-none");

            $("#divChiPhiCau").hide();
            $("#tien_cau_xe").hide();
            $("#tl_thue_cau_xe").hide();
            $("#tien_thue_cau_xe").hide();
            $("#tien_keo_xe").show();
            $("#tl_thue_keo_xe").show();
            $("#tien_thue_keo_xe").show();
            $("#thongTinDiaDiemKeoXe").show();
            $("#divChiPhiCauXe").addClass("d-none");
            $("#divChiPhiKeoXe").removeClass("d-none");
            $("#divChiPhiKeo").show();
            $("#tl_thue_keo_xe").removeClass("col-sm-2").addClass("col-sm-4");
            $("#tien_thue_keo_xe").removeClass("col-sm-2").addClass("col-sm-4");
            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_cau]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_cau]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_cau]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_keo]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_keo]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_keo]').prop('required', true);

            $('form[name=frmAddChiPhiKhac] input[name=khoang_cach_km]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=tinh_thanh]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=quan_huyen]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=xa_phuong]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=dia_chi]').prop('required', false);
        } else {
            $("#tien_cau_xe").removeClass("d-none");
            $("#tien_keo_xe").removeClass("d-none");
            $("#tl_thue_keo_xe").removeClass("d-none");
            $("#tien_thue_keo_xe").removeClass("d-none");
            $("#tl_thue_keo_xe").removeClass("d-none");
            $("#tien_thue_keo_xe").removeClass("d-none");
            $("#thongTinDiaDiemKeoXe").show();
            $("#divChiPhiCauXe").removeClass("d-none");
            $("#divChiPhiKeoXe").removeClass("d-none");
            $("#divChiPhiKeo").show();
            $("#divChiPhiCau").show();
            $("#tien_cau_xe").show();
            $("#tien_keo_xe").show();
            $("#tl_thue_keo_xe").show();
            $("#tien_thue_keo_xe").show();
            $("#tl_thue_cau_xe").show();
            $("#tien_thue_cau_xe").show();

            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_cau]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=chi_phi_keo]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_keo]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] input[name=tien_thue_chi_phi_cau]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_keo]').prop('required', true);
            $('form[name=frmAddChiPhiKhac] select[name=tl_thue_chi_phi_cau]').prop('required', true);

            $('form[name=frmAddChiPhiKhac] input[name=khoang_cach_km]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=tinh_thanh]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=quan_huyen]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] select[name=xa_phuong]').prop('required', false);
            $('form[name=frmAddChiPhiKhac] input[name=dia_chi]').prop('required', false);
        }
    }
    else {
        $("#thongTinDiaDiemKeoXe").hide();
    }
}
function capNhatThongTinHangMuc(el, loai_hang_muc, hanh_dong = "SUA", placement = "right right-bottom") {
    _frmHangMucBoSung.getControl("hang_muc").readOnly(false);
    $("#btnXoaInputHangMucBoSung").removeClass("d-none");
    $("#xoaHangMucBoSung").removeClass("d-none");
    if (loai_hang_muc == "G" && hanh_dong == "SUA") {
        $("#btnXoaInputHangMucBoSung").addClass("d-none");
        $("#xoaHangMucBoSung").addClass("d-none");
        _frmHangMucBoSung.getControl("hang_muc").readOnly();
    }
    _frmHangMucBoSung.resetForm();
    _frmHangMucBoSung.clearErrorMessage();
    _frmHangMucBoSung.getControl("hang_muc").attr("complete-val", "");
    _frmHangMucBoSung.getControl("muc_do").setValue("");

    var tr = $(el).parent().parent();
    var hang_muc = tr.find("input[name='hang_muc']").val();
    _frmHangMucBoSung.getControl("hang_muc_goc").setValue(hang_muc);
    if (hanh_dong == "SUA") {

        var muc_do = tr.find("input[name='muc_do']").val();
        var thay_the_sc = tr.find("input[name='thay_the_sc']").val();
        if (hang_muc != undefined && hang_muc != null && hang_muc != "") {
            var obj_hang_muc = objDanhMuc.hang_muc_xe.where(n => n.ma == hang_muc).firstOrDefault();
            if (obj_hang_muc != null) {
                _frmHangMucBoSung.getControl("hang_muc").attr("complete-val", hang_muc);
                _frmHangMucBoSung.getControl("hang_muc").setValue(obj_hang_muc.ten);
            }
        }
        if (muc_do != undefined && muc_do != null && muc_do != "") {
            var arr = muc_do.split(",");
            var muc_do_ten = "";
            if (arr !== undefined && arr !== null && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var ten = objDanhMuc.muc_do_ton_that_xe.where(n => n.ma === arr[i].trim()).firstOrDefault().ten;
                    if (i === 0) {
                        muc_do_ten = ten;
                    } else {
                        muc_do_ten += ", " + ten;
                    }
                }
            }
            _frmHangMucBoSung.getControl("muc_do").setValue(muc_do);
        }
        if (thay_the_sc != undefined && thay_the_sc != null && thay_the_sc != "") {
            _frmHangMucBoSung.getControl("thay_the_sc").setValue(thay_the_sc);
        }
    }

    _popoverHangMucBoSung.options = { placement: placement, hanh_dong: hanh_dong };
    if (placement == "custom") {
        _popoverHangMucBoSung.options.position = { top: 265, left: -25 };
    }
    _popoverHangMucBoSung.showWithPosition(el);
}
function nhapKhauTru() {
    _frmKhauTru.resetForm();
    _frmKhauTru.clearErrorMessage();
    _frmKhauTru.getControl("vu_tt").setDataSource(ho_so_chi_tiet.data_info.ds_vu_tt, "ten", "ma");
    if (ho_so_chi_tiet.data_info.ds_vu_tt.length > 0) {
        _frmKhauTru.getControl("vu_tt").setValue(ho_so_chi_tiet.data_info.ds_vu_tt[0].ma);
        _frmKhauTru.getControl("vu_tt").trigger("select2:select");
    }
    _modalKhauTru.show();
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
function chonNhanXet(el, placement = "top") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        pm: CONSTANT_PM,
        nv: "XE_MAY",
        nv_ct: "NHAN_XET"
    }
    loadDuLieuFormNhanXet(el, obj);
    _modalChonNoiDung.options = { placement: placement };
    _modalChonNoiDung.show(el);
}
function chonDeXuat(el, placement = "top") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        pm: CONSTANT_PM,
        nv: "XE_MAY",
        nv_ct: "DE_XUAT"
    }
    loadDuLieuFormNhanXet(el, obj);
    _modalChonNoiDung.options = { placement: placement };
    _modalChonNoiDung.show(el);
}
function chonNoiDungTrinhDuyet(el, placement = "bottom") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        pm: CONSTANT_PM,
        nv: "XE_MAY",
        nv_ct: "TRINH_DUYET_BT"
    }
    loadDuLieuFormNhanXet(el, obj);
    _modalChonNoiDung.options = { placement: placement };
    _modalChonNoiDung.show(el);
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
function bindThongTinFormNhanXet() {
    $("#modalTaoNoiDungFormLietKe").addClass("d-none");
    $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
    _frmTaoNoiDung.getControl("nv").setValue("XE_MAY");
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue("BT");
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("ma_doi_tac").readOnly();
    _frmTaoNoiDung.getControl("nv").readOnly();
    _frmTaoNoiDung.getControl("pm").readOnly();
}
//function nhapKhauTruPA() {
//    _frmKhauTruPA.resetForm();
//    _frmKhauTruPA.clearErrorMessage();
//    _frmKhauTruPA.getControl("vu_tt").setDataSource(ho_so_chi_tiet.data_info.ds_vu_tt, "ten", "ma");
//    if (ho_so_chi_tiet.data_info.ds_vu_tt.length > 0) {
//        _frmKhauTruPA.getControl("vu_tt").setValue(ho_so_chi_tiet.data_info.ds_vu_tt[0].ma);
//        _frmKhauTruPA.getControl("vu_tt").trigger("select2:select");
//        _modalKhauTruPA.show();
//    } else {
//        _notifyService.error("Chưa có vụ tổn thất nào");
//    }
//}
function luuTinhToanBoiThuong(callback) {
    if (!_frmDanhGiaDeXuat.isValid()) {
        return;
    }
    var data = _frmTinhToanBoiThuong.getJsonData();
    data.lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
    data.danh_gia = $("#danh_gia").val();
    data.de_xuat = $("#de_xuat").val();
    data.mien_thuong = data.mien_thuong.replace(/[^0-9]+/g, '');
    var thue = parseInt(data.thue.replace(/[^0-9]+/g, ''));
    if (thue <= 0 || isNaN(thue)) thue = 0;
    data.thue = thue;
    if (data.tl_thue == "THM") {
        data.tl_thue = "0";
        data.pt_ad_thue_mien_thuong = "THM";
    }
    else {
        data.pt_ad_thue_mien_thuong = "TLT";
    }

    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == data.lh_nv).firstOrDefault();
    //Vật chất xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        data.arr = layDuLieuTinhToanVCX();
    }
    //Hàng hóa trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        data.so_id_doi_tuong = "0";
        data.arr = layDuLieuTinhToanHANGHOA();
    }
    //Người ngồi trên xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.NNTX) {
        data.so_id_doi_tuong = "0";
        data.arr = layDuLieuTinhToanNNTX();
    }
    //Tai nạn lái phụ xe
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
        data.so_id_doi_tuong = "0";
        data.arr = layDuLieuTinhToanLPHU_XE();
    }
    //TNDS về người
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        data.so_id_doi_tuong = "0";
        data.arr = layDuLieuTinhToanTNDSNGUOI();
    }
    //TNDS về hành khách
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
        data.so_id_doi_tuong = "0";
        data.arr = layDuLieuTinhToanTNDSNGUOI_HK();
    }
    //TNDS về tài sản
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        if (data.loai_ts == "KHAC") {
            data.arr = layDuLieuTinhToanTNDSTAISAN();
            data.so_id_doi_tuong = "0";
        }
        else {
            data.arr = layDuLieuTinhToanVCX();
        }
    }
    _service.luuPABoiThuong(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback()) {
            callback(res);
        }
    });
}
function xemChiTietDTPhuongAn(lhnv) {
    var so_id_pa = $('#tblDsPhuongAnBody tr td.dspa.text-danger').attr('data-so-id-pa');
    $("#navPhuongAnNghiepVu li").removeClass("active");
    $("#navPhuongAnNghiepVu li[data-lhnv='" + lhnv + "']").addClass("active");
    $(".divPhuongAnDanhGiaItem").addClass("d-none");
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
    if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    _frmTinhToanBoiThuongPA.resetForm();
    _frmTinhToanBoiThuongPA.clearErrorMessage();
    _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(so_id_pa);
    _frmTinhToanBoiThuongPA.getControl("so_vu").setValue("0");
    _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue("0");
    _frmTinhToanBoiThuongPA.getControl("khau_tru").setValue("K");
    _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly(true);
    _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");

    _frmTinhToanBoiThuongPA.getControl("thue").setValue("0");
    _frmTinhToanBoiThuongPA.getControl("giam_tru_khac").setValue("0");
    /*Vật chất xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
        $('#btnLuuPASC_NV').hide();
        $('#btnLuuPASC').show();
        $("#divPhuongAnVCX").show();
        if (lhnv == "") {
            return;
        }
        _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly(false);
        _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue("0");
        _frmTinhToanBoiThuongPA.getControl("khau_tru").setValue("K");

        var arr_tong_hop = [];
        var arr_vcx_pa = ho_so_chi_tiet.data_info.phuong_an_ct.where(n => n.so_id_pa == so_id_pa);
        $.each(arr_vcx_pa, (index, item) => {
            var obj_tong_hop = {}
            obj_tong_hop = item;
            arr_tong_hop.push(obj_tong_hop);
        });
        if (arr_tong_hop.length > 0) {
            _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
        }
        _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
        ESUtil.genHTML("tblPhuongAnCT_template", "tblPhuongAnCT", { data: arr_tong_hop }, () => {
            $(".tblPhuongAnCTGiamGia_T").addClass("d-none");
            $(".tblPhuongAnCTGiamGia_S").removeClass("d-none");
            if (arr_tong_hop != undefined && arr_tong_hop != null && arr_tong_hop.length > 0 &&
                arr_tong_hop[0].lh_tt_giam_gia != undefined && arr_tong_hop[0].lh_tt_giam_gia != null && arr_tong_hop[0].lh_tt_giam_gia == "T") {
                $(".tblPhuongAnCTGiamGia_T").removeClass("d-none");
                $(".tblPhuongAnCTGiamGia_S").addClass("d-none");
            }

            bindEventPACT(() => {
                tinhToanPA();
            });
        });
    }
    /*Người ngồi trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
        $('#btnLuuPASC').hide();
        $('#btnLuuPASC_NV').show();
        $("#divPhuongAnNNTX").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });

        var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == lhnv);
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
    }
    /*Hàng hóa trên xe*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
        $('#btnLuuPASC').hide();
        $('#btnLuuPASC_NV').show();
        $("#divPhuongAnHANGHOA").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });

        var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == lhnv);
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
    }
    /*TNDS về người*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
        $('#btnLuuPASC').hide();
        $('#btnLuuPASC_NV').show();
        $("#divPhuongAnTNDSNguoi").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });

        var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == lhnv);
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
    }
    /*TNDS về tài sản*/
    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        $('#btnLuuPASC').hide();
        $('#btnLuuPASC_NV').show();
        $("#divPhuongAnTNDSTaiSan").show();
        var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
        ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
        var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
        ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
            $("#modalMucDoTTDanhSach .single_checked").click(function () {
                $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });

        var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == lhnv);
        var arr_tong_hop = [];
        $.each(arr_pa, (index, item) => {
            var obj_tong_hop = item;
            arr_tong_hop.push(obj_tong_hop);
        });

        if (arr_tong_hop.length > 0) {
            _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
        }
        _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
        arr_tong_hop = chuanHoaNVCT(arr_tong_hop, objLHNV.nhom, objLHNV.doi_tuong, objLHNV.hang_muc);
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
}
//function xemChiTietPhuongAnGara(so_id_pa, callback = undefined) {
//    $("#tblDsPhuongAnBody .dspa").removeClass("text-danger");
//    $("#pa_" + so_id_pa).addClass("text-danger");
//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: so_id_pa
//    };
//    _service.layLHNVPhuongAn(obj).then(res => {
//        if (res.state_info.status !== "OK") {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        ESUtil.genHTML("navPhuongAnNghiepVuTemplate", "navPhuongAnNghiepVu", { danh_sach: res.data_info }, () => {
//            var lh_nv = "";
//            if (res.data_info == undefined || res.data_info == null || res.data_info.length > 0) {
//                lh_nv = res.data_info[0].ma;
//            }
//            xemChiTietPhuongAn(so_id_pa, lh_nv, callback);
//        });
//    });
//}
function xemChiTietPhuongAnLHNV(lh_nv) {
    $("#navPhuongAnNghiepVu .breadcrumb-item").removeClass("active");
    $("#navPhuongAnNghiepVu .breadcrumb-item[data-lhnv='" + lh_nv + "']").addClass("active");
    var so_id_pa = $("#tblDsPhuongAnBody .dspa.active").attr("data-so-id-pa");
    xemChiTietPhuongAn(so_id_pa, lh_nv, res => { });
}
//function xemChiTietPhuongAn(so_id_pa = undefined, lh_nv, callback = undefined) {
//    if (ho_so_chi_tiet.data_info.lh_nv != null && ho_so_chi_tiet.data_info.lh_nv.length > 0) {
//        for (var i = 0; i < ho_so_chi_tiet.data_info.lh_nv.length; i++) {
//            ho_so_chi_tiet.data_info.lh_nv[i].so_id_pa = so_id_pa;
//            ho_so_chi_tiet.data_info.lh_nv[i].active = 0;
//            if (ho_so_chi_tiet.data_info.lh_nv[i].ma == lh_nv) {
//                ho_so_chi_tiet.data_info.lh_nv[i].active = 1;
//            }
//        }
//    }
//    var dem = ho_so_chi_tiet.data_info.lh_nv.where(n => n.active == 1).length;
//    if (dem < 0) {
//        ho_so_chi_tiet.data_info.lh_nv[0].active = 1;
//    }
//    $("#navPhuongAnNghiepVu .breadcrumb-item").removeClass("active");
//    $("#navPhuongAnNghiepVu .breadcrumb-item[data-lhnv='" + lh_nv.trim() + "']").addClass("active");
//    var so_id_doi_tuong = $('#tblDsPhuongAnBody tr td.dspa.text-danger').attr('data-so_id_doi_tuong');
//    if (so_id_pa == undefined || so_id_pa == "" || so_id_pa == null) {
//        so_id_pa = $('#tblDsPhuongAnBody tr td.dspa.text-danger').attr('data-so-id-pa');
//    }
//    $("#btnLuuPASC").addClass("d-none");
//    $("#btnLuuPASC_NV").addClass("d-none");
//    $("#tblDsPhuongAnBody .dspa").removeClass('text-danger');
//    $("#pa_" + so_id_pa).addClass('text-danger');
//    var lh_nv = $("#navPhuongAnNghiepVu .breadcrumb-item.active").attr("data-lhnv");

//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//        so_id_pa: so_id_pa,
//        lh_nv: lh_nv
//    };
//    $("#divInputLoaiTSPA").addClass("d-none");
//    $("#divInputMucMienThuongPA").removeClass("pl-0");

//    _service.xemChiTietPhuongAn(obj).then(res => {
//        if (res.state_info.status !== "OK") {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        $(".divPhuongAnDanhGiaItem").addClass("d-none");
//        var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
//        var phuong_an = res.data_info.phuong_an;
//        var data = res.data_info.data;
//        if (phuong_an == null) {
//            _notifyService.error("Không xác định được phương án");
//            return;
//        }
//        hienThiBangGiaPA(obj);
//        _frmTinhToanBoiThuongPA.resetForm();
//        _frmTinhToanBoiThuongPA.clearErrorMessage();
//        _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(phuong_an.so_id_pa);
//        _frmTinhToanBoiThuongPA.getControl("ma_gara").val(phuong_an.ma_gara);
//        _frmTinhToanBoiThuongPA.getControl("so_vu").setValue(phuong_an.so_vu_tt);
//        _frmTinhToanBoiThuongPA.getControl("mien_thuong").setValue(phuong_an.mien_thuong);
//        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue(phuong_an.mien_thuong / phuong_an.so_vu_tt);
//        _frmTinhToanBoiThuongPA.getControl("khau_tru").setValue(phuong_an.khau_tru);
//        _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly();
//        if (phuong_an.pt_ad_thue_mien_thuong != "THM") {
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue(phuong_an.tl_thue_mien_thuong);
//        }
//        else {
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue(phuong_an.pt_ad_thue_mien_thuong);
//        }
//        _frmTinhToanBoiThuongPA.getControl("thue").setValue(phuong_an.tien_thue_sua_chua);
//        _frmTinhToanBoiThuongPA.getControl("giam_tru_khac").setValue(phuong_an.tien_giam_tru_khac);

//        _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly();
//        _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly();
//        _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly();

//        /*Vật chất xe*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
//            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly(false);
//            _frmTinhToanBoiThuongPA.getControl("so_vu").readOnly(false);
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").readOnly(false);

//            $('#btnLuuPASC').removeClass("d-none");
//            $("#divPhuongAnVCX").removeClass("d-none");
//            _frmTinhToanBoiThuongPA.getControl("khau_tru").readOnly(false);
//            ESUtil.genHTML("tblPhuongAnCT_template", "tblPhuongAnCT", { data: data }, () => {
//                $(".tblPhuongAnCTGiamGia_T").addClass("d-none");
//                $(".tblPhuongAnCTGiamGia_S").removeClass("d-none");
//                if (data != undefined && data != null && data.length > 0 &&
//                    data[0].lh_tt_giam_gia != undefined && data[0].lh_tt_giam_gia != null && data[0].lh_tt_giam_gia == "T") {
//                    $(".tblPhuongAnCTGiamGia_T").removeClass("d-none");
//                    $(".tblPhuongAnCTGiamGia_S").addClass("d-none");
//                }

//                bindEventPACT();
//                tinhToanPA();
//            });
//        }
//        /*Người ngồi trên xe*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
//            $('#btnLuuPASC_NV').removeClass("d-none");
//            $("#divPhuongAnNNTX").removeClass("d-none");
//            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
//            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
//            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
//            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
//                $("#modalMucDoTTDanhSach .single_checked").click(function () {
//                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
//                    $(this).prop("checked", true);
//                });
//            });

//            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
//            var arr_tong_hop = [];

//            $.each(arr_pa, (index, item) => {
//                var obj_tong_hop = item;
//                arr_tong_hop.push(obj_tong_hop);
//            });
//            if (arr_tong_hop.length > 0) {
//                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
//            }
//            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
//            ESUtil.genHTML("modalChiTietPhuongAnNGUOITemplate", "modalChiTietPhuongAnNGUOI", { danh_sach: arr_tong_hop }, () => {
//                bindEventPACT(() => {
//                    tinhToanPA();
//                });
//            });

//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
//        }
//        /*Hàng hóa trên xe*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
//            var tl_thue_max = 0;
//            var tong_mien_thuong = 0;
//            if (data.length > 0) {
//                tl_thue_max = data.max(n => n.tl_thue);
//                tong_mien_thuong = data.sum(n => n.tien_mien_thuong);
//            }
//            var mien_thuong_vat = tong_mien_thuong;
//            if (phuong_an.bh_mien_thuong_vat == "C") {
//                mien_thuong_vat = Math.round(tong_mien_thuong + tong_mien_thuong * tl_thue_max / 100);
//            }
//            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").readOnly(false);
//            _frmTinhToanBoiThuongPA.getControl("mien_thuong_vutt").setValue(mien_thuong_vat);
//            $('#btnLuuPASC_NV').removeClass("d-none");
//            $("#divPhuongAnHANGHOA").removeClass("d-none");
//            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA");
//            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
//            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
//            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
//                $("#modalMucDoTTDanhSach .single_checked").click(function () {
//                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
//                    $(this).prop("checked", true);
//                });
//            });

//            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
//            var arr_tong_hop = [];

//            $.each(arr_pa, (index, item) => {
//                var obj_tong_hop = item;
//                arr_tong_hop.push(obj_tong_hop);
//            });

//            if (arr_tong_hop.length > 0) {
//                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
//            }
//            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
//            ESUtil.genHTML("modalChiTietPhuongAnHANGHOATemplate", "modalChiTietPhuongAnHANGHOA", { danh_sach: arr_tong_hop }, () => {
//                bindEventPACT(() => {
//                    tinhToanPA();
//                });
//            });
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
//        }
//        /*TNDS về người*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
//            $('#btnLuuPASC_NV').removeClass("d-none");
//            $("#divPhuongAnTNDSNguoi").removeClass("d-none");
//            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
//            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
//            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
//            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
//                $("#modalMucDoTTDanhSach .single_checked").click(function () {
//                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
//                    $(this).prop("checked", true);
//                });
//            });

//            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
//            var arr_tong_hop = [];
//            $.each(arr_pa, (index, item) => {
//                var obj_tong_hop = item;
//                arr_tong_hop.push(obj_tong_hop);
//            });
//            if (arr_tong_hop.length > 0) {
//                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
//            }
//            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
//            ESUtil.genHTML("modalChiTietPhuongAnTNDS_NGUOITemplate", "modalChiTietPhuongAnTNDS_NGUOI", { danh_sach: arr_tong_hop }, () => {
//                bindEventPACT(() => {
//                    tinhToanPA();
//                });
//            });
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
//        }
//        /*TNDS về hành khách*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
//            $('#btnLuuPASC_NV').removeClass("d-none");
//            $("#divPhuongAnTNDSNguoiHK").removeClass("d-none");
//            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_CON_NGUOI");
//            ESUtil.genHTML("modalChonNguyenNhanGiamTruDanhSachTemplate", "modalChonNguyenNhanGiamTruDanhSach", { danh_sach: nguyen_nhan_giam_tru });
//            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
//            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
//                $("#modalMucDoTTDanhSach .single_checked").click(function () {
//                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
//                    $(this).prop("checked", true);
//                });
//            });

//            var arr_pa = ho_so_chi_tiet.data_info.phuong_an_nv_ct.where(n => n.so_id_pa == so_id_pa && n.lh_nv == obj.lh_nv);
//            var arr_tong_hop = [];
//            $.each(arr_pa, (index, item) => {
//                var obj_tong_hop = item;
//                arr_tong_hop.push(obj_tong_hop);
//            });
//            if (arr_tong_hop.length > 0) {
//                _frmTinhToanBoiThuongPA.setData(arr_tong_hop[0]);
//            }
//            _frmTinhToanBoiThuongPA.getControl('so_vu').val(ho_so_chi_tiet.data_info.ho_so.so_vu);
//            ESUtil.genHTML("modalChiTietPhuongAnTNDS_NGUOI_HKTemplate", "modalChiTietPhuongAnTNDS_NGUOI_HK", { danh_sach: arr_tong_hop }, () => {
//                bindEventPACT(() => {
//                    tinhToanPA();
//                });
//            });
//            _frmTinhToanBoiThuongPA.getControl("tl_thue").setValue("THM");
//        }
//        /*TNDS về tài sản*/
//        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
//            $("#divInputLoaiTSPA").removeClass("d-none");
//            $("#divInputMucMienThuongPA").addClass("pl-0");
//            _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("KHAC");
//            if (so_id_doi_tuong != "0") {
//                _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("XE");
//            }
//            _frmTinhToanBoiThuongPA.getControl("loai_ts").trigger("select2:select");
//            if (callback) {
//                callback(res);
//            }
//        }
//    });
//}
function xemThongTinGiayChungNhanCarcompensation() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh_ql: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nv: "XE"
    };
    _carInvestigationService.layThongTinTinhTrangThanhToan(obj).then(res_tt => {
        _service.layThongTinHopDong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info !== null) {
                res.data_info.tong_phi_hthi = ESUtil.formatMoney(res.data_info.ho_so.tong_phi);
                if (res.data_info.ho_so.mien_thuong != undefined) {
                    res.data_info.ho_so.mien_thuong = ESUtil.formatMoney(res.data_info.ho_so.mien_thuong);
                }
                $("#tblCarCommonCertificate").bindJsonToHtml(res.data_info.ho_so);
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
                ESUtil.genHTML("dsXacMinhPhiLaySoHS_template", "dsXacMinhPhiLaySoHS", { danh_sach: res_tt.data_info });
                _modalXemThongTinChungNhan.show();
            }
        });
    });

}
//function lapPASC(callback = undefined) {
//    if (ho_so_chi_tiet.data_info.lh_nv == null || ho_so_chi_tiet.data_info.lh_nv.length <= 0) {
//        _notifyService.error("Không xác định được loại hình nghiệp vụ");
//        return;
//    }
//    $(".lblBHMienThuong").html("Miễn thường (gồm VAT)/vụ");
//    if (ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != undefined && 
//        ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat != null &&
//        ho_so_chi_tiet.data_info.ho_so.bh_mien_thuong_vat == 'K') {
//        $(".lblBHMienThuong").html("Miễn thường (chưa VAT)/vụ");
//    }

//    $("#modalLapPhuongAnSuaChua .divPhuongAnDanhGiaItem").addClass("d-none");
//    $("#navPhuongAnNghiepVu .breadcrumb-item[data-lhnv='" + ho_so_chi_tiet.data_info.lh_nv[0].ma + "']").addClass("active");
//    bindNguyenNhanGiamTru(ho_so_chi_tiet.data_info.lh_nv[0].ma);

//    var obj = {
//        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
//    }
//    _service.layDSPhuongAn(obj).then(res => {
//        if (res.state_info.status !== "OK") {
//            _notifyService.error(res.state_info.message_body);
//            return;
//        }
//        if (res.data_info == null || res.data_info.length <= 0) {
//            _notifyService.error("Chưa có báo giá kết thúc");
//            return;
//        }
//        _service.layThongTinChiTietHoSo(obj).then(resDetailHs => {
//            if (resDetailHs.state_info.status !== "OK") {
//                _notifyService.error(resDetailHs.state_info.message_body);
//                return;
//            }
//            ho_so_chi_tiet = resDetailHs;
//            ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: res.data_info }, () => {
//                $("#tblDsPhuongAnBody .single_checked").click(function () {
//                    $("#tblDsPhuongAnBody .single_checked").prop("checked", false);
//                    $(this).prop("checked", true);
//                });

//                if (res.data_info.length > 0) {
//                    xemChiTietPhuongAnGara(res.data_info[0].so_id_pa);
//                }
//                if (callback) {
//                    callback(res);
//                }
//            });
//        });
//    });
//}
function showNhomDoiTuong(el) {
    ESUtil.genHTML("modalChonDoiTuongTTDanhSachTemplate", "modalChonDoiTuongTTDanhSach", { danh_sach: ho_so_chi_tiet.data_info.ds_doi_tuong });
    var id = $(el).attr("id");
    $("#modalChonDoiTuongTTElementSelect").val($(el).attr("id"));
    $("#modalChonDoiTuongTT .modalChonDoiTuongTTItem").prop("checked", false);
    //var val = $("#" + id).val();
    var val = $("#" + id).attr('data-val');
    if (val != "" && val != undefined) {
        var arr = val.split(",");
        for (var i = 0; i < arr.length; i++) {
            $("#modalChonDoiTuongTT .modalChonDoiTuongTTItem[value='" + arr[i] + "']").prop("checked", true);
        }
    }
    _modalChonDoiTuongTT.show(el);
}
//function luuPASC(callback = undefined) {
//    if (!_frmTinhToanBoiThuongPA.isValid())
//        return;

//    var vcx = getDataTablePhuongAnVCX();
//    if (vcx.length > 0) {
//        var so_id_pa = _frmTinhToanBoiThuongPA.getControl("so_id_pa").val();
//        var objData = _frmTinhToanBoiThuongPA.getJsonData();
//        objData.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
//        objData.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
//        objData.ten_pa = ho_so_chi_tiet.data_info.ds_phuong_an.where(n => n.ma_doi_tac == ho_so_chi_tiet.data_info.ho_so.ma_doi_tac && n.so_id_pa == so_id_pa).firstOrDefault().ten_pa;
//        objData.mo_ta = '';
//        objData.vcx = vcx;
//        if (objData.tl_thue != undefined && objData.tl_thue != null && objData.tl_thue == "THM") {
//            objData.tl_thue = 0;
//            objData.pt_ad_thue_mien_thuong = "THM";
//        }
//        else {
//            objData.pt_ad_thue_mien_thuong = "TLT";
//        }

//        _service.luuPhuongAnVCX(objData).then(res => {
//            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
//                _notifyService.error(res.state_info.message_body);
//                return;
//            }
//            var idPhuongAn = res.out_value.so_id_pa.toString();
//            var objGetDetail = {
//                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
//                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
//                so_id_pa: idPhuongAn
//            };
//            _service.base.all([
//                _service.xemBangKeCtietPA(objGetDetail),
//                _service.layThongTinChiTietHoSo(objGetDetail)]).then(arrRes => {
//                    hienThiBangGiaPA(objGetDetail);
//                    ho_so_chi_tiet = arrRes[1];
//                    xemChiTietPhuongAnGara(idPhuongAn, res => {
//                        var so_id_doi_tuong = $("#tblDsPhuongAnBody td.text-danger").attr("data-so_id_doi_tuong");
//                        var doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
//                        if (doi_tuong != null && doi_tuong.nhom == "TAI_SAN" && doi_tuong.loai != null && doi_tuong.loai == "XE") {
//                            _frmTinhToanBoiThuongPA.getControl("loai_ts").setValue("XE");
//                            _frmTinhToanBoiThuongPA.getControl("loai_ts").trigger("select2:select");
//                        }
//                    });
//                    if (callback) {
//                        callback()
//                    }
//                });
//        });
//    }
//}
function copyText(el) {
    var text = $(el).html();
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy số hồ sơ thành công")
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
function layFormDanhGiaBTV() {
    var obj = _frmBoiThuongVienDanhGia.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.ho_so_day_du = $("#frmBoiThuongVienDanhGia input#ho_so_day_du_d").is(":checked") ? "D" : "K";
    obj.nguyen_nhan = $("#frmBoiThuongVienDanhGia input#nguyen_nhan_d").is(":checked") ? "D" : "K";
    obj.pham_vi_tt = $("#frmBoiThuongVienDanhGia input#pham_vi_tt_c").is(":checked") ? "C" : "K";
    obj.gt_tham_gia_bh = $("#frmBoiThuongVienDanhGia input#gt_tham_gia_bh_d").is(":checked") ? "D" : "K";
    obj.tuan_thu = $("#frmBoiThuongVienDanhGia input#tuan_thu_c").is(":checked") ? "C" : "K";
    obj.thoi_han_khai_bao = $("#frmBoiThuongVienDanhGia input#thoi_han_khai_bao_d").is(":checked") ? "D" : "K";
    obj.trang_thai = "D";
    if (obj.ho_so_day_du == "K" && obj.nguyen_nhan == "K" && obj.pham_vi_tt == "K" && obj.gt_tham_gia_bh == "K" && obj.tuan_thu == "K" && obj.thoi_han_khai_bao == "K") {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    } else {
        return obj;
    }
}
function luuThongTinDanhGiaBTV(callback = undefined) {
    if (!_frmBoiThuongVienDanhGia.isValid()) {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    }
    var obj = layFormDanhGiaBTV();
    if (obj != undefined && obj != null) {
        _service.luuThongTinDanhGiaBTV(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin thành công");

            $("#modalDanhGiaBoiThuongVienTrangThai").addClass("text-success");
            $("#modalDanhGiaBoiThuongVienTrangThai").removeClass("text-danger");
            $("#modalDanhGiaBoiThuongVienTrangThai").html("Đã thực hiện đánh giá");
            $("#divInputBoiThuongVienDanhGia").val("Đã thực hiện đánh giá");
            $("#divInputBoiThuongVienDanhGia").removeClass("bg-chua-dg");
            $("#divInputBoiThuongVienDanhGia").addClass("bg-danh-gia");
            if (callback) {
                callback(res);
            }
        });
    }
}
function xemThongTinBoiThuongVienDanhGia(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }
    _service.xemthongTinChiTietBTVDanhGia(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        bindFormBoiThuongVienDanhGia(res.data_info);
        _popoverBoiThuongVienDanhGia.options = { placement: "custom" };
        _popoverBoiThuongVienDanhGia.options.position = { top: 105, left: 525 };
        _popoverBoiThuongVienDanhGia.showWithPosition(el);
    });
}
function bindFormBoiThuongVienDanhGia(obj) {
    _frmBoiThuongVienDanhGia.resetForm();
    _frmBoiThuongVienDanhGia.clearErrorMessage();
    console.log(obj);
    $("#modalDanhGiaBoiThuongVienTrangThai").removeClass("text-success");
    $("#modalDanhGiaBoiThuongVienTrangThai").addClass("text-danger");
    $("#modalDanhGiaBoiThuongVienTrangThai").html("Chưa thực hiện đánh giá");

    $("#frmBoiThuongVienDanhGia input[name='ho_so_day_du']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia input[name='nguyen_nhan']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia input[name='pham_vi_tt']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia input[name='gt_tham_gia_bh']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia input[name='tuan_thu']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia input[name='thoi_han_khai_bao']").prop("checked", false);
    $("#frmBoiThuongVienDanhGia #pt_gt_tham_gia_bh").html("");
    $("#frmBoiThuongVienDanhGia #pt_che_tai").html("");
    if (obj != undefined && obj != null) {
        if (obj.trang_thai == "D") {
            $("#modalDanhGiaBoiThuongVienTrangThai").addClass("text-success");
            $("#modalDanhGiaBoiThuongVienTrangThai").removeClass("text-danger");
            $("#modalDanhGiaBoiThuongVienTrangThai").html("Đã thực hiện đánh giá");
        }
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "D")
            $("#frmBoiThuongVienDanhGia input#ho_so_day_du_d").prop("checked", true);
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "K")
            $("#frmBoiThuongVienDanhGia input#ho_so_day_du_k").prop("checked", true);

        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "D")
            $("#frmBoiThuongVienDanhGia input#nguyen_nhan_d").prop("checked", true);
        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "K")
            $("#frmBoiThuongVienDanhGia input#nguyen_nhan_k").prop("checked", true);

        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "C")
            $("#frmBoiThuongVienDanhGia input#pham_vi_tt_c").prop("checked", true);
        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "K")
            $("#frmBoiThuongVienDanhGia input#pham_vi_tt_k").prop("checked", true);

        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "D")
            $("#frmBoiThuongVienDanhGia input#gt_tham_gia_bh_d").prop("checked", true);
        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "K")
            $("#frmBoiThuongVienDanhGia input#gt_tham_gia_bh_k").prop("checked", true);

        if (obj.tuan_thu != null && obj.tuan_thu == "C")
            $("#frmBoiThuongVienDanhGia input#tuan_thu_c").prop("checked", true);
        if (obj.tuan_thu != null && obj.tuan_thu == "K")
            $("#frmBoiThuongVienDanhGia input#tuan_thu_k").prop("checked", true);

        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "D")
            $("#frmBoiThuongVienDanhGia input#thoi_han_khai_bao_d").prop("checked", true);
        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "K")
            $("#frmBoiThuongVienDanhGia input#thoi_han_khai_bao_k").prop("checked", true);

        _frmBoiThuongVienDanhGia.getControl("pt_gt_tham_gia_bh").setValue(obj.pt_gt_tham_gia_bh);
        _frmBoiThuongVienDanhGia.getControl("pt_che_tai").setValue(obj.pt_che_tai);
        $("#frmBoiThuongVienDanhGia #pt_gt_tham_gia_bh").html(obj.pt_gt_tham_gia_bh);
        $("#frmBoiThuongVienDanhGia #pt_che_tai").html(obj.pt_che_tai);
    } else {
        $("#frmBoiThuongVienDanhGia input#ho_so_day_du_d").prop("checked", true);
        $("#frmBoiThuongVienDanhGia input#nguyen_nhan_d").prop("checked", true);
        $("#frmBoiThuongVienDanhGia input#pham_vi_tt_c").prop("checked", true);
        $("#frmBoiThuongVienDanhGia input#gt_tham_gia_bh_d").prop("checked", true);
        $("#frmBoiThuongVienDanhGia input#tuan_thu_c").prop("checked", true);
        $("#frmBoiThuongVienDanhGia input#thoi_han_khai_bao_d").prop("checked", true);
    }
}
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh_ql, ma_chi_nhanh, so_id, so_id_hd, so_id_dt) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_chi_nhanh_ql: ma_chi_nhanh_ql,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id: so_id,
        so_id_hd: so_id_hd,
        so_id_dt: so_id_dt,
        nv: 'XE',
        man_hinh: 'BOI_THUONG_XE'
    }
    _modalThongTinHoSoService.data = obj;
    _modalThongTinHoSoService.xemChiTietThongTinHoSo();
}
function onDragOverHM(event) {
    event.preventDefault();
}
function onDropHM(event, loai) {
    event.preventDefault();
    var loai_drag_drop = event.dataTransfer.getData("loai_drag_drop");
    var index_drag = event.dataTransfer.getData("index_drag");
    var index_drop = $(event.target).parent().parent().data("rowindex").toString();
    if (index_drag != index_drop) {
        var td_drag = $("#bodyDsBaoGiaGaraDoc tr[data-rowindex='" + index_drag + "'] td.item" + loai_drag_drop);
        var td_drop = $("#bodyDsBaoGiaGaraDoc tr[data-rowindex='" + index_drop + "'] td.item" + loai_drag_drop);
        var count = td_drag.length;
        for (var i = 0; i < count; i++) {
            var htmlDrag = $(td_drag[i]).html();
            var htmlDrop = $(td_drop[i]).html();
            $(td_drag[i]).html(htmlDrop);
            $(td_drop[i]).html(htmlDrag);
        }
    }
}
function getDataBGDoc() {
    var otArr = [];
    $("#bodyDsBaoGiaGaraDoc tr.dsBaoGiaGaraDocItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("a").each(function (el) {
                var name = $(this).attr("data-field");
                if (name != undefined) {
                    if ($(this).hasClass("number")) {
                        json[name] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                    } else {
                        json[name] = $(this).attr("data-val");
                    }
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onTachDong(el, loai) {
    var index = $(el).parent().parent().attr("data-rowindex");
    var bt = parseInt(index) + 1;
    var data = getDataBGDoc();
    var item = data.where(n => n.bt == bt).firstOrDefault();
    if (item == undefined || item == null) {
        return;
    }
    var itemClone = JSON.parse(JSON.stringify(item));
    if (loai == "NHAN_CONG" && (item.ten_hang_muc_nhan_cong == undefined || item.ten_hang_muc_nhan_cong == null || item.ten_hang_muc_nhan_cong.trim() == "")) {
        _notifyService.error("Không xác định được chi phí nhân công");
        return;
    }
    if (loai == "SON" && (item.ten_hang_muc_son == undefined || item.ten_hang_muc_son == null || item.ten_hang_muc_son.trim() == "")) {
        _notifyService.error("Không xác định được chi phí sơn");
        return;
    }
    itemClone.bt = parseInt(itemClone.bt) + 1;
    itemClone.ma_hang_muc_he_thong = "";
    itemClone.so_luong_vtu = "0";
    itemClone.ten_hang_muc_he_thong = "";
    itemClone.ten_hang_muc_son = "";
    itemClone.ten_hang_muc_vtu = "";
    itemClone.ten_hang_muc_nhan_cong = "";
    itemClone.tien_nhan_cong = 0;
    itemClone.tien_son = 0;
    itemClone.tien_vtu = 0;
    itemClone.tl_khop = "0";
    itemClone.tl_khop_nhan_cong = "0";
    itemClone.tl_khop_son = "0";

    if (loai == "NHAN_CONG") {
        if ((item.ten_hang_muc_vtu == undefined || item.ten_hang_muc_vtu == null || item.ten_hang_muc_vtu.trim() == "") &&
            (item.ten_hang_muc_son == undefined || item.ten_hang_muc_son == null || item.ten_hang_muc_son.trim() == "")) {
            _notifyService.error("Không thể tách chi phí độc lập");
            return;
        }
        itemClone.ten_hang_muc_he_thong = item.ten_hang_muc_nhan_cong;
        itemClone.ten_hang_muc_nhan_cong = item.ten_hang_muc_nhan_cong;
        itemClone.tien_nhan_cong = item.tien_nhan_cong;

        item.ten_hang_muc_nhan_cong = "";
        item.tl_khop_nhan_cong = 0;
        item.tien_nhan_cong = "0";
    }
    if (loai == "SON") {
        if ((item.ten_hang_muc_vtu == undefined || item.ten_hang_muc_vtu == null || item.ten_hang_muc_vtu.trim() == "") &&
            (item.ten_hang_muc_nhan_cong == undefined || item.ten_hang_muc_nhan_cong == null || item.ten_hang_muc_nhan_cong.trim() == "")) {
            _notifyService.error("Không thể tách chi phí độc lập");
            return;
        }
        itemClone.ten_hang_muc_he_thong = item.ten_hang_muc_son;
        itemClone.ten_hang_muc_son = item.ten_hang_muc_son;
        itemClone.tien_son = item.tien_son;

        item.ten_hang_muc_son = "";
        item.tl_khop_son = 0;
        item.tien_son = "0";
    }

    var dataNew = data.where(n => n.bt > item.bt);
    for (var i = 0; i < dataNew.length; i++) {
        dataNew[i].bt = parseInt(dataNew[i].bt) + 1;
    }
    data.splice(itemClone.bt - 1, 0, itemClone);
    ESUtil.genHTML("bodyDsBaoGiaGaraDocTemplate", "bodyDsBaoGiaGaraDoc", { data: data });
}
function luuThueBT(callback = undefined) {
    var obj = _frmCapNhatThue.getJsonData();
    if (obj.so_id == undefined || obj.so_id == null || obj.so_id == "" || obj.so_id == 0) {
        _notifyService.error("Thiếu thông tin cập nhật thuế");
        return;
    }

    obj.tien_thue = _frmCapNhatThue.getControl("tien_thue").val().replace(/[^0-9]+/g, '');
    if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "" || obj.tien_thue < 0) {
        _notifyService.error("Tiền thuế cập nhật lại phải lớn hơn 0");
        return;
    }

    obj.tien_thue_cp_khac = _frmCapNhatThue.getControl("tien_thue_cp_khac").val().replace(/[^0-9]+/g, '');
    if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "" || obj.tien_thue_cp_khac < 0) {
        _notifyService.error("Tiền thuế chi phí khác cập nhật lại phải lớn hơn 0");
        return;
    }

    obj.ma_doi_tac = ESCS_MA_DOI_TAC;
    var checked = $("#frmCapNhatThueGenFileBT").is(":checked");
    if (checked) {
        obj.gen_file = "C";
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.create_file_sign = "OPES_TB_BOI_THUONG_BAI_NAI";
            obj.remove_file = "OPES_TB_BOI_THUONG_BAI_NAI";
        } else {
            obj.create_file_sign = "ESCS_THONG_BAO_BOI_THUONG";
            obj.remove_file = "ESCS_THONG_BAO_BOI_THUONG";
        }
    }
    else {
        obj.gen_file = "K";
        obj.create_file_sign = "";
        obj.remove_file = "";
    }
    _notifyService.confirm("Bạn có chắc chắn muốn cập nhật lại số tiền thuế không?", "", () => {
        _service.capNhatThue(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadChungTuThuHuong();
            _notifyService.success("Cập nhật tiền thuế thành công");
            if (callback) {
                callback(res);
            }
        });
    });
}
//Đọc OCR báo giá
function onToggleImgOCR(el, index) {
    var checked = $(el).closest('div').find('input[type="checkbox]"').is(":checked");
    var count = $(".nhom_anh_ocr_" + index + ":checked").length;
    var count_check = $(".nhom_anh_ocr_" + index).length;
    if (count < count_check) {
        $(".images-ocr").prop("checked", false);
        $(".nhom_anh_ocr_" + index).prop("checked", true);
    } else {
        $(".nhom_anh_ocr_" + index).prop("checked", false);
        $(".images-ocr").prop("checked", false);
    }
}
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
function getPagingBaoGiaHangMucHeThong(trang) {
    var data = objDanhMuc.hang_muc_chinh;
    var arrTmp = [];
    var so_dong = 18;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var tim = $("#inputTimKiemHangMucHeThong").val();
    var textSearch = "%" + tim.replace(/ /g, '%') + "%";
    for (var i = 0; i < data.length; i++) {
        var check = data[i].ten.toUpperCase().like(textSearch.toUpperCase());
        if (check) {
            var objSearch = data[i];
            var arrKyTu = tim.toUpperCase().split(' ').where(n => n != " ");
            objSearch.orderTmp = [];
            for (var j = 0; j < arrKyTu.length; j++) {
                objSearch.orderTmp.push(data[i].ten.toUpperCase().indexLike(arrKyTu[j].toUpperCase()));
            }
            arrTmp.push(objSearch);
        }
        if (data[i].ten_alias != null && data[i].ten_alias != "") {
            var ten_alias = data[i].ten_alias.toUpperCase().like(textSearch.toUpperCase());
            if (ten_alias) {
                var objSearch = data[i];
                var arrKyTu = tim.toUpperCase().split(' ').where(n => n != " ");
                objSearch.orderTmp = [];
                for (var j = 0; j < arrKyTu.length; j++) {
                    objSearch.orderTmp.push(data[i].ten_alias.toUpperCase().indexLike(arrKyTu[j].toUpperCase()));
                }
                arrTmp.push(objSearch);
            }
        }
    }
    var tong_so_dong = arrTmp.length;
    arrTmp = arrTmp.where((item, i) => i >= dau && i <= cuoi - 1);
    arrTmp.sort(compareAutoCompleteHangMuc);
    if (arrTmp != null && arrTmp.length > 0) {
        ESUtil.genHTML("modalDanhSachHangMucTonThatTemplate", "modalDanhSachHangMucTonThat", { data: arrTmp }, () => {
            var ma = $("#inputTimKiemHangMucHeThong_ma").val();
            if (ma != undefined && ma != null && ma != "") {
                $("#modalDanhSachHangMucTonThat .modalDanhSachHangMucItem[value='" + ma + "']").prop("checked", true);
            }
            $("#modalDanhSachHangMucTonThat .single_checked").click(function () {
                $("#modalDanhSachHangMucTonThat .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
    }
    $("#modalDanhSachHangMucTonThat_pagination").html(ESUtil.pagingHTML("getPagingBaoGiaHangMucHeThong", trang, tong_so_dong, so_dong));
    $("#inputTimKiemHangMucHeThong").focus();
}
function getPagingBaoGiaHangMucGiamDinh(trang) {
    var data = _.sortBy(ho_so_chi_tiet.data_info.hang_muc, x => x.ten_hang_muc);
    var arr = layDuLieuOCRBaoGiaGara();
    var arrTmp = [];
    var arrHM = [];
    var so_dong = 18;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var tim = $("#inputTimKiemHangMucGiamDinh").val();
    var textSearch = "%" + tim.replace(/ /g, '%') + "%";
    $.each(arr, (index, item) => {
        if (item.ma_hang_muc_he_thong != "" && item.ma_hang_muc_he_thong != null) {
            arrHM.push(item.ma_hang_muc_he_thong);
        }
    });
    for (var i = 0; i < data.length; i++) {
        var check = data[i].ten_hang_muc.toUpperCase().like(textSearch.toUpperCase());
        if (check) {
            var objSearch = data[i];
            var arrKyTu = tim.toUpperCase().split(' ').where(n => n != " ");
            objSearch.orderTmp = [];
            for (var j = 0; j < arrKyTu.length; j++) {
                objSearch.orderTmp.push(data[i].ten_hang_muc.toUpperCase().indexLike(arrKyTu[j].toUpperCase()));
            }
            arrTmp.push(objSearch);
        }
        if (data[i].ten_alias != null && data[i].ten_alias != "") {
            var ten_alias = data[i].ten_alias.toUpperCase().like(textSearch.toUpperCase());
            if (ten_alias) {
                var objSearch = data[i];
                var arrKyTu = tim.toUpperCase().split(' ').where(n => n != " ");
                objSearch.orderTmp = [];
                for (var j = 0; j < arrKyTu.length; j++) {
                    objSearch.orderTmp.push(data[i].ten_alias.toUpperCase().indexLike(arrKyTu[j].toUpperCase()));
                }
                arrTmp.push(objSearch);
            }
        }
    }
    var tong_so_dong = arrTmp.length;
    arrTmp = arrTmp.where((item, i) => i >= dau && i <= cuoi - 1);
    arrTmp.sort(compareAutoCompleteHangMuc);
    if (arrTmp != null && arrTmp.length > 0) {
        ESUtil.genHTML("modalDanhSachHangMucGiamDinhTemplate", "modalDanhSachHangMucGiamDinh", { data: arrTmp, hm: arrHM }, () => {
            var ma = $("#inputTimKiemHangMuc_ma").val();
            if (ma != undefined && ma != null && ma != "") {
                $("#modalDanhSachHangMucGiamDinh .modalDanhSachHangMucItem[value='" + ma + "']").prop("checked", true);
            }
            $("#modalDanhSachHangMucGiamDinh .single_checked").click(function () {
                $("#modalDanhSachHangMucGiamDinh .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
    }
    $("#modalDanhSachHangMucGiamDinh_pagination").html(ESUtil.pagingHTML("getPagingBaoGiaHangMucGiamDinh", trang, tong_so_dong, so_dong));
    $("#inputTimKiemHangMucGiamDinh").focus();
}
function capNhatThongTinHangMucOCR(el) {
    $("#inputTimKiemHangMucHeThong").val("");
    $("#inputTimKiemHangMucGiamDinh").val("");
    $("#modalDanhSachHangMucTonThat .modalDanhSachHangMucItem").prop("checked", false);
    $("#modalDanhSachHangMucGiamDinh .modalDanhSachHangMucItem").prop("checked", false);
    var ma = $(el).attr("data-ma");
    $("#inputTimKiemHangMucGiamDinh_ma").val(ma);
    $("#inputTimKiemHangMucHeThong_ma").val(ma);
    getPagingBaoGiaHangMucHeThong(1);
    getPagingBaoGiaHangMucGiamDinh(1);
    _modalBaoGiaChonHangMucTonThat.show(el);
    $("#inputTimKiemHangMucHeThong").focus();
    $("#inputTimKiemHangMucGiamDinh").focus();
}
function filterArray(arrBaoGia, arrHM) {
    $.each(arrBaoGia, (index1, item1) => {
        $.each(arrHM, (index2, item2) => {
            if (item1.ma_hang_muc_he_thong == item2.hang_muc) {
                arrBaoGia = arrBaoGia.filter(n => n != item1);
            }
        });
    });
    return arrBaoGia;
}
function onChonHangMucBaoGia(el) {
    var arr = [];
    var arrBaoGia = layDuLieuOCRBaoGiaGara();
    var tr = $(_modalBaoGiaChonHangMucTonThat.target).parent().parent();
    var bt = tr.find("a[data-field='bt']").attr("data-val");
    var val = $(el).attr('data-val');
    var ten_hm = $(el).attr('data-name');
    var ten = ESUtil.xoaKhoangTrangText(ten_hm);
    var loai_tien = tr.find("input:checkbox[data-field='loai_tien']:checked").attr("data-val");
    var arrBG = arrBaoGia.where(n => n.bt == bt);
    $.each(arrBaoGia, (index1, item1) => {
        $.each(arrBG, (index2, item2) => {
            if (item1.bt == item2.bt) {
                var obj = {
                    bt: item2.bt,
                    hang_muc: item2.hang_muc,
                    ten_hang_muc: item2.ten_hang_muc,
                    ma_hang_muc_he_thong: val,
                    ten_hang_muc_he_thong: ten_hm,
                    so_luong: item2.so_luong,
                    don_gia: item2.don_gia,
                    pt_giam_gia: item2.pt_giam_gia,
                    giam_gia: item2.giam_gia,
                    thanh_tien: item2.thanh_tien,
                    tl_thue: item2.tl_thue,
                    loai_tien: item2.loai_tien,
                    tien_duyet: item2.tien_duyet,
                    tl_khop: item2.tl_khop,
                    mapping: "1"
                }
                arr.push(obj);
                arrBaoGia = arrBaoGia.filter(n => n != item1);
            }
        });
    });
    $.each(arrBaoGia, (index, item) => {
        var obj1 = {
            bt: item.bt,
            hang_muc: item.hang_muc,
            ten_hang_muc: item.ten_hang_muc,
            ma_hang_muc_he_thong: item.ma_hang_muc_he_thong,
            ten_hang_muc_he_thong: item.ten_hang_muc_he_thong,
            so_luong: item.so_luong,
            don_gia: item.don_gia,
            pt_giam_gia: item.pt_giam_gia,
            giam_gia: item.giam_gia,
            thanh_tien: item.thanh_tien,
            tien_duyet: item.tien_duyet,
            tl_thue: item.tl_thue,
            loai_tien: item.loai_tien,
            tl_khop: item.tl_khop,
            mapping: item.mapping
        }
        arr.push(obj1);
    });
    arr.sort((a, b) => a.bt - b.bt);
    ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arr });

    if (loai_tien != "" && loai_tien != null && loai_tien != undefined) {
        //$("." + loai_tien + '_' + ten).prop("checked", false);
        $("#TIEN_VAT_TU_" + val + '_' + bt).prop("checked", false);
        $("#TIEN_NHAN_CONG_" + val + '_' + bt).prop("checked", false);
        $("#TIEN_SON_" + val + '_' + bt).prop("checked", false);
        $("#" + loai_tien + '_' + val + '_' + bt).prop("checked", true);
    }
    _modalBaoGiaChonHangMucTonThat.hide();
}
function chonLoaiTien(el, loai, ma_hang_muc_ht, index) {
    var ten_hang_muc = $(el).attr("data-text");
    //$("." + loai + '_' + ten_hang_muc).prop("checked", false);
    $("#TIEN_VAT_TU_" + ma_hang_muc_ht + '_' + index).prop("checked", false);
    $("#TIEN_NHAN_CONG_" + ma_hang_muc_ht + '_' + index).prop("checked", false);
    $("#TIEN_SON_" + ma_hang_muc_ht + '_' + index).prop("checked", false);
    $("#" + loai + '_' + ma_hang_muc_ht + '_' + index).prop("checked", true);
}
function layDuLieuOCRBaoGiaGaraTimKiem() {
    var otArr = [];
    $("#tblDuLieuOCRBaoGiaGara tr.dsBaoGiaGaraOCRItem").each(function (e) {
        if (!$(this).hasClass("d-none")) {
            var json = {};
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    var field = $(this).attr("data-field");
                    if ($(this).is(":checked") == true) {
                        json[field] = $(this).attr("data-val");
                    }
                    if ($(this).hasClass("number")) {
                        json[field] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("hang_muc")) {
                        json[field] = $(this).val();
                    }
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                });
                $(this).find("a.combobox").each(function (el) {
                    var field = $(this).attr("data-field");
                    json[field] = $(this).attr("data-val");
                });
            });
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuOCRBaoGiaGara() {
    var otArr = [];
    $("#tblDuLieuOCRBaoGiaGara tr.dsBaoGiaGaraOCRItem").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).is(":checked") == true) {
                    json[field] = $(this).attr("data-val");
                }
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("hang_muc")) {
                    json[field] = $(this).val();
                }
                if (json[field] == undefined) {
                    json[field] = "";
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuOCRBaoGiaGaraLuu() {
    var otArr = [];
    $("#tblDuLieuOCRBaoGiaGara tr.dsBaoGiaGaraOCRItem").each(function (e) {
        var json = {
            hang_muc: "", ten_hang_muc: "", ten_hang_muc_he_thong: "", so_luong: 0, tien_vat_tu: 0, tien_nhan_cong: 0, tien_khac: 0, bt: 0,
            tl_khop: 0, tien_vtu_dx: 0, tien_nhan_cong_dx: 0, tien_khac_dx: 0
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).is(":checked") == true) {
                    json[field] = $(this).attr("data-val");
                }
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                if ($(this).hasClass("hang_muc")) {
                    json[field] = $(this).val();
                }
                if (json[field] == undefined) {
                    json[field] = "";
                }
            });
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
            if (json.loai_tien == 'TIEN_VAT_TU') {
                json.tien_vat_tu = parseInt(json.thanh_tien);
                json.tien_vtu_dx = parseInt(json.tien_duyet);
            }
            if (json.loai_tien == 'TIEN_NHAN_CONG') {
                json.tien_nhan_cong = parseInt(json.thanh_tien);
                json.tien_nhan_cong_dx = parseInt(json.tien_duyet);
            }
            if (json.loai_tien == 'TIEN_SON') {
                json.tien_khac = parseInt(json.thanh_tien);
                json.tien_khac_dx = parseInt(json.tien_duyet);
            }
        });
        var item_check = otArr.where(n => n.hang_muc == json.hang_muc).firstOrDefault();
        if (item_check != undefined && item_check != null) {
            if (json.loai_tien == 'TIEN_VAT_TU') {
                item_check.tien_vat_tu = parseInt(json.tien_vat_tu + item_check.tien_vat_tu);
                item_check.tien_vtu_dx = parseInt(json.tien_vtu_dx + item_check.tien_vtu_dx);
            }
            if (json.loai_tien == 'TIEN_NHAN_CONG') {
                item_check.tien_nhan_cong = parseInt(json.tien_nhan_cong + item_check.tien_nhan_cong);
                item_check.tien_nhan_cong_dx = parseInt(json.tien_nhan_cong_dx + item_check.tien_nhan_cong_dx);
            }
            if (json.loai_tien == 'TIEN_SON') {
                item_check.tien_khac = parseInt(json.tien_khac + item_check.tien_khac);
                item_check.tien_khac_dx = parseInt(json.tien_khac_dx + item_check.tien_khac_dx);
            }
        }
        else {
            item_check = json;
            otArr.push(item_check);
        }
    });
    return otArr;
}
function layDanhSachHinhAnhBaoGia() {
    $("#dsAnhBaoGiaGara").html("");
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }
    _service.layDanhSachFile(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            var data = [];
            var ds_giay_to = objDanhMuc.ds_giay_to;
            $.each(res.data_info, function (index, item) {
                $.each(ds_giay_to, function (index1, item1) {
                    if (item.ma_file == item1.hang_muc && item1.ma == 'BAO_GIA_GARA') {
                        data.push(item);
                    }
                });
            });
            var ext = [".jpg", ".png", ".jpeg", ".gif", ".pdf"];
            var ds_anh = data.where(n => ext.includes(n.extension));
            var arrAnh = bindImagesTab1(ds_anh);
            ESUtil.genHTML("dsAnhBaoGiaGara_template", "dsAnhBaoGiaGara", { danh_sach: arrAnh });
        }
    });
}
function layThongTinOCRBaoGia(obj, callback = undefined) {
    arrDataBaoGia = [];
    _service.layDuLieuBaoGiaGara(obj).then(res => {
        arrDataBaoGia = _.sortBy(res.data_info, x => x.bt && x.bt_anh);
        ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arrDataBaoGia }, () => {
            var tongSoTienBaoGia = 0;
            var tongSoTienDuyet = 0;
            $.each(res.data_info, function (index, item) {
                tongSoTienBaoGia += parseInt(item.thanh_tien);
                tongSoTienDuyet += parseInt(item.thanh_tien);
            });
            $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
            $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
        });
    });
    if (callback) {
        callback();
    }
}
function showChonGaraBaoGia(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }
    var val = $(el).attr("data-gara");
    _service.layGaraBaoGia(obj).then(res => {
        var data = res.data_info.gara;
        console.log(data);
        if (data.length == 1) {
            var gara = data.firstOrDefault();
            _frmThemGaraBaoGia.getControl("gara").setDataSource(data, "ten", "gara", "Chọn gara", gara.gara);
            $(el).attr("data-gara", gara.gara);
            $("#tenGaraSuaChua").html(gara.ten);
            _frmThemGaraBaoGia.setData(gara);
            _frmDocOCRBaoGiaGara.setData(gara);
        }
        if (data.length > 1) {
            if (val != null && val != undefined && val != "") {
                _frmThemGaraBaoGia.getControl("gara").setDataSource(data, "ten", "gara", "Chọn gara", val);
                var detail = data.where(n => n.gara == val).firstOrDefault();
                _frmThemGaraBaoGia.setData(detail);
                _frmDocOCRBaoGiaGara.setData(detail);
            } else {
                _frmThemGaraBaoGia.getControl("gara").setDataSource(data, "ten", "gara", "Chọn gara", "");
                _frmThemGaraBaoGia.getControl("gara").addEventChange(val => {
                    var detail = data.where(n => n.gara == val).firstOrDefault();
                    _frmThemGaraBaoGia.setData(detail);
                    _frmDocOCRBaoGiaGara.setData(detail);
                });
            }
        }
    });
    _popoverThemBaoGiaBaoGia.options = { placement: "bottom" };
    _popoverThemBaoGiaBaoGia.showWithPosition(el);
}
function layChiTietBaoGiaGara(ma_doi_tac, so_id, bt) {
    arrDataBaoGia = [];
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        bt: bt.split(",")
    }
    _service.layDuLieuBaoGiaGara(obj).then(res => {
        if (res.data_info != null && res.data_info != "") {
            var data = res.data_info.firstOrDefault();
            arrDataBaoGia = res.data_info;
            $("#tenGaraSuaChua").html(data.ten_gara);
            $("#tenGaraSuaChua").attr("data-gara", data.ma_gara);
            $("#tenGaraSuaChua").attr("data-id-doi-tuong", data.so_id_doi_tuong);
            _frmThemGaraBaoGia.setData(data);
            _frmDocOCRBaoGiaGara.setData(data);
            ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arrDataBaoGia }, () => {
                var tongSoTienBaoGia = 0;
                var tongSoTienDuyet = 0;
                $.each(res.data_info, function (index, item) {
                    tongSoTienBaoGia += parseInt(item.thanh_tien);
                    tongSoTienDuyet += parseInt(item.tien_duyet);
                });
                $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
                $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
            });
        } else {
            ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: [] }, () => {
                $("#tongSoTienBaoGia").html(0);
            });
        }
    });
}
function onChangeSoLuong(el) {
    var so_luong = parseInt($(el).val().replace(/[^0-9]+/g, ''));
    var don_gia = parseInt($(el).closest("tr").find("input[data-field='don_gia']").attr("data-val").replace(/[^0-9]+/g, ''));
    if (so_luong != null && so_luong != "" && so_luong != 0) {
        $(el).closest("tr").find("input[data-field='so_luong']").attr("data-val", so_luong);
        $(el).closest("tr").find("input[data-field='so_luong']").html(so_luong);
        $(el).closest("tr").find("a[data-field='so_luong']").attr("data-val", so_luong);
        $(el).closest("tr").find("a[data-field='so_luong']").html(so_luong);
        var thanh_tien = don_gia * so_luong;
        $(el).closest("tr").find("a[data-field='thanh_tien']").attr("data-val", thanh_tien);
        $(el).closest("tr").find("a[data-field='thanh_tien']").html(ESUtil.formatMoney(thanh_tien));
        $(el).closest("tr").find("input[data-field='tien_duyet']").attr("data-val", thanh_tien);
        $(el).closest("tr").find("input[data-field='tien_duyet']").val(ESUtil.formatMoney(thanh_tien));

        var arr = layDuLieuOCRBaoGiaGara();
        var tongSoTienBaoGia = 0;
        var tongSoTienDuyet = 0;
        $.each(arr, function (index, item) {
            tongSoTienBaoGia += parseInt(item.thanh_tien);
            tongSoTienDuyet += parseInt(item.thanh_tien);
        });
        $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
        $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));

    } else {
        $(el).closest("tr").find("input[data-field='so_luong']").attr("data-val", so_luong);
        $(el).closest("tr").find("input[data-field='so_luong']").html(so_luong);
        $(el).closest("tr").find("a[data-field='so_luong']").attr("data-val", so_luong);
        $(el).closest("tr").find("a[data-field='so_luong']").html(so_luong);
        $(el).closest("tr").find("a[data-field='thanh_tien']").attr("data-val", don_gia);
        $(el).closest("tr").find("a[data-field='thanh_tien']").html(ESUtil.formatMoney(don_gia));
        $(el).closest("tr").find("input[data-field='tien_duyet']").attr("data-val", don_gia);
        $(el).closest("tr").find("input[data-field='tien_duyet']").val(ESUtil.formatMoney(don_gia));

        var arr = layDuLieuOCRBaoGiaGara();
        var tongSoTienBaoGia = 0;
        var tongSoTienDuyet = 0;
        $.each(arr, function (index, item) {
            tongSoTienBaoGia += parseInt(item.thanh_tien);
            tongSoTienDuyet += parseInt(item.thanh_tien);
        });
        $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
        $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
    }
}
function onChangeDonGia(el) {
    var don_gia = parseInt($(el).val().replace(/[^0-9]+/g, ''));
    var so_luong = parseInt($(el).closest("tr").find("input[data-field='so_luong']").attr("data-val").replace(/[^0-9]+/g, ''));
    var thanh_tien = 0;
    if (don_gia != null && don_gia != "" && don_gia != 0) {
        $(el).closest("tr").find("input[data-field='don_gia']").attr("data-val", don_gia);
        $(el).closest("tr").find("input[data-field='don_gia']").html(ESUtil.formatMoney(don_gia));
        if (so_luong != null && so_luong != undefined && so_luong != 0) {
            thanh_tien = don_gia * so_luong;
        } else {
            thanh_tien = don_gia;
        }
        $(el).closest("tr").find("a[data-field='thanh_tien']").attr("data-val", thanh_tien);
        $(el).closest("tr").find("a[data-field='thanh_tien']").html(ESUtil.formatMoney(thanh_tien));
        $(el).closest("tr").find("input[data-field='tien_duyet']").attr("data-val", thanh_tien);
        $(el).closest("tr").find("input[data-field='tien_duyet']").val(ESUtil.formatMoney(thanh_tien));

        var arr = layDuLieuOCRBaoGiaGara();
        var tongSoTienBaoGia = 0;
        var tongSoTienDuyet = 0;
        $.each(arr, function (index, item) {
            tongSoTienBaoGia += parseInt(item.thanh_tien);
            tongSoTienDuyet += parseInt(item.thanh_tien);
        });
        $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
        $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
    } else {
        $(el).closest("tr").find("input[data-field='don_gia']").attr("data-val", don_gia);
        $(el).closest("tr").find("input[data-field='don_gia']").html(don_gia);
        $(el).closest("tr").find("a[data-field='thanh_tien']").attr("data-val", don_gia);
        $(el).closest("tr").find("a[data-field='thanh_tien']").html(ESUtil.formatMoney(don_gia));
        $(el).closest("tr").find("input[data-field='tien_duyet']").attr("data-val", don_gia);
        $(el).closest("tr").find("input[data-field='tien_duyet']").val(ESUtil.formatMoney(don_gia));

        var arr = layDuLieuOCRBaoGiaGara();
        var tongSoTienBaoGia = 0;
        var tongSoTienDuyet = 0;
        $.each(arr, function (index, item) {
            tongSoTienBaoGia += parseInt(item.thanh_tien);
            tongSoTienDuyet += parseInt(item.thanh_tien);
        });
        $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
        $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
    }
}
function onChangeSoTienDuyet(el) {
    var tongSoTienDuyet = 0;
    var arr = layDuLieuOCRBaoGiaGara();
    $.each(arr, function (index, item) {
        tongSoTienDuyet += parseInt(item.tien_duyet.replace(/[^0-9]+/g, ''));
    });
    $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
}
function xoaDongBaoGia(bt) {
    var arr = layDuLieuOCRBaoGiaGara();
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dòng dữ liệu này không?", "", () => {
        arr = arr.removeItem(n => n.bt == bt);
        _notifyService.success("Xóa dòng báo giá thành công");
        ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arr }, () => {
            var tongSoTienBaoGia = 0;
            var tongSoTienDuyet = 0;
            $.each(arr, function (index, item) {
                tongSoTienBaoGia += parseInt(item.thanh_tien);
                tongSoTienDuyet += parseInt(item.thanh_tien);
            });
            $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
            $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
        });
    });
}
function kiemTraLuuBaoGia(arrBaoGiaMapping, arrBaoGia) {
    var dem = 0;
    var arrHangMuc = ho_so_chi_tiet.data_info.hang_muc;
    var arr = [];
    if (arrBaoGiaMapping.length > 0) {
        $.each(arrBaoGiaMapping, function (index, item) {
            if (parseInt(item.tien_duyet.replace(/[^0-9]+/g, '')) > parseInt(item.thanh_tien)) {
                _notifyService.error("Số tiền đề xuất duyệt không được lớn hơn số tiền báo giá dòng: " + (index + 1));
                dem++;
            }
        });
    }
    if (arrBaoGia.length > 0) {
        $.each(arrBaoGia, function (index, item) {
            if (item.loai_tien == "" || item.loai_tien == null) {
                _notifyService.error("Bạn chưa chọn nhóm hạng mục hoặc xóa dòng báo giá không sử dụng dòng: " + (index + 1));
                dem++;
            }
            if (item.ma_hang_muc_he_thong == "" || item.ma_hang_muc_he_thong == null) {
                _notifyService.error("Không xác định được hạng mục tổn thất dòng: " + (index + 1));
                dem++;
            }
            $.each(arrHangMuc, function (index1, item1) {
                if (item.ma_hang_muc_he_thong == item1.hang_muc) {
                    arr.push(item1);
                    arrHangMuc = arrHangMuc.filter(n => n != item1);
                }
            });
        });
        if (arrHangMuc.length > 0) {
            _notifyService.error("Tồn tại hạng mục giám định chưa phân loại theo hạng mục báo giá sửa chữa");
            dem++;
        }
    }
    return dem;
}
//Đọc OCR hóa đơn
function getImageOCRSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_ocr']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
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
function loadThongTinOCRHoaDonChungTu(obj) {
    _carClaimCommonService.soSanhThongTinOCRHoaDon(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var chung_tu = res.data_info.chung_tu;
        arrDuLieuOCRHoaDon = res.data_info.data;
        var arrHD = [];
        if (chung_tu.length > 0) {
            for (var i = 0; i < chung_tu.length; i++) {
                arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
            }
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
            _frmOCRHoaDonChungTu.getControl("bt").setValue(arrHD[0].ma);
        }
        else {
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", "");
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
        }
        $("#hoa_don_item_tat_ca").prop("checked", true);
        $("#hoa_don_item_tat_ca").trigger("change");
    });
}
function layChiTietHoaDonChungTu(ma_doi_tac, so_id, ma_file, bt) {
    $(".images-ocr").prop("checked", false);
    $("#img_" + so_id + '_' + bt).prop("checked", true);
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        nv: 'XE',
        hang_muc: ma_file,
        bt: bt.split(",")
    }
    loadThongTinOCRHoaDonChungTu(obj);
}
function soSanhDuLieuOCRHoaDon(val) {
    var data = arrDuLieuOCRHoaDon;
    var arr = [];
    if (val != "" && val != null && val != undefined) {
        var chung_tu = ho_so_chi_tiet.data_info.chung_tu.where(n => n.bt == val).firstOrDefault();
        //Tên đvị phát hành
        var ten_dvi_phat_hanh = {
            loai: "TEN_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Đơn vị phát hành",
            nd_goc: chung_tu.ten_dvi_phat_hanh == null || chung_tu.ten_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);
        //Mã số thuế
        var mst_dvi_phat_hanh = {
            loai: "MST_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Mã số thuế",
            nd_goc: chung_tu.mst_dvi_phat_hanh == null || chung_tu.mst_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.mst_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);
        //Địa chỉ 
        var dchi_dvi_phat_hanh = {
            loai: "DCHI_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Địa chỉ",
            nd_goc: chung_tu.dchi_dvi_phat_hanh == null || chung_tu.dchi_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.dchi_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            dchi_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        dchi_dvi_phat_hanh.so_sanh = ESUtil.compareText(dchi_dvi_phat_hanh.nd_goc, dchi_dvi_phat_hanh.nd_ocr);
        //Ngày hdon
        var ngay_ct = {
            loai: "NGAY_CT",
            noi_dung_so_sanh: "Ngày hóa đơn",
            nd_goc: chung_tu.ngay_ct == null || chung_tu.ngay_ct == '' ? 'Chưa có dữ liệu' : chung_tu.ngay_ct,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
        }
        ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);
        //Mẫu hdon
        var mau_hdon = {
            loai: "MAU_HDON",
            noi_dung_so_sanh: "Mẫu hóa đơn",
            nd_goc: chung_tu.mau_hdon == null || chung_tu.mau_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.mau_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
        }
        mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);
        //Ký hiệu hdon
        var ky_hieu_hdon = {
            loai: "KY_HIEU_HDON",
            noi_dung_so_sanh: "Ký hiệu hóa đơn",
            nd_goc: chung_tu.ky_hieu_hdon == null || chung_tu.ky_hieu_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.ky_hieu_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
        }
        ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);
        //Số hdon
        var so_hdon = {
            loai: "SO_HDON",
            noi_dung_so_sanh: "Số hóa đơn",
            nd_goc: chung_tu.so_hdon == null || chung_tu.so_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.so_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
        }
        so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);
        //Tiền
        var tien = {
            loai: "TIEN",
            noi_dung_so_sanh: "Số tiền",
            nd_goc: chung_tu.tien_hdon == null || chung_tu.tien_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.tien_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tien.nd_ocr = data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri;
        }
        tien.so_sanh = ESUtil.compareText(tien.nd_goc, tien.nd_ocr);
        //TL thuế
        var tl_thue = {
            loai: "TL_THUE",
            noi_dung_so_sanh: "Tỉ lệ thuế",
            nd_goc: chung_tu.tl_thue == null || chung_tu.tl_thue == '' ? 'Chưa có dữ liệu' : chung_tu.tl_thue,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tl_thue.nd_ocr = data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri;
        }
        tl_thue.so_sanh = ESUtil.compareText(tl_thue.nd_goc, tl_thue.nd_ocr);
        //Thuế
        var thue = {
            loai: "TIEN_THUE",
            noi_dung_so_sanh: "Tiền thuế",
            nd_goc: chung_tu.tien_thue == null || chung_tu.tien_thue == '' ? 'Chưa có dữ liệu' : chung_tu.tien_thue,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            thue.nd_ocr = data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri;
        }
        thue.so_sanh = ESUtil.compareText(thue.nd_goc, thue.nd_ocr);
        //Tổng tiền
        var tong_tien = {
            loai: "TONG_TIEN",
            noi_dung_so_sanh: "Tổng tiền",
            nd_goc: chung_tu.tong_tien == null || chung_tu.tong_tien == '' ? 'Chưa có dữ liệu' : chung_tu.tong_tien,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
        }
        tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);
        //Tên dvi nhận
        var ten_dvi_nhan_hdon = {
            loai: "TEN_DVI_NHAN_HDON",
            noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
            nd_ocr: '',
            nd_goc: chung_tu.ten_dvi_nhan == null || chung_tu.ten_dvi_nhan == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_nhan,
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri;
        }
        ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);
        //Website tra cứu
        var website_tra_cuu = {
            loai: "WEBSITE_TRA_CUU_HDON",
            noi_dung_so_sanh: "Website tra cứu",
            nd_ocr: '',
            nd_goc: chung_tu.website_tra_cuu == null || chung_tu.website_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.website_tra_cuu,
            so_sanh: false
        };
        if (data.length > 1) {
            website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);
        //Mã tra cứu
        var ma_tra_cuu = {
            loai: "MA_TRA_CUU_HDON",
            noi_dung_so_sanh: "Mã tra cứu hóa đơn",
            nd_ocr: '',
            nd_goc: chung_tu.ma_tra_cuu == null || chung_tu.ma_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.ma_tra_cuu,
            so_sanh: false
        };
        if (data.length > 1) {
            ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

        arr.push(ten_dvi_phat_hanh);
        arr.push(mst_dvi_phat_hanh);
        arr.push(dchi_dvi_phat_hanh);
        arr.push(ngay_ct);
        arr.push(mau_hdon);
        arr.push(so_hdon);
        arr.push(ky_hieu_hdon);
        arr.push(tien);
        arr.push(tl_thue);
        arr.push(thue);
        arr.push(tong_tien);
        arr.push(ten_dvi_nhan_hdon);
        arr.push(ma_tra_cuu);
        arr.push(website_tra_cuu);
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
    }
    else {
        var chung_tu = ho_so_chi_tiet.data_info.chung_tu.where(n => n.bt == val).firstOrDefault();
        //Tên đvị phát hành
        var ten_dvi_phat_hanh = {
            loai: "TEN_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Đơn vị phát hành",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);
        //Mã số thuế
        var mst_dvi_phat_hanh = {
            loai: "MST_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Mã số thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);
        //Địa chỉ 
        var dchi_dvi_phat_hanh = {
            loai: "DCHI_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Địa chỉ",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            dchi_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        dchi_dvi_phat_hanh.so_sanh = ESUtil.compareText(dchi_dvi_phat_hanh.nd_goc, dchi_dvi_phat_hanh.nd_ocr);
        //Ngày hdon
        var ngay_ct = {
            loai: "NGAY_CT",
            noi_dung_so_sanh: "Ngày hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
        }
        ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);
        //Mẫu hdon
        var mau_hdon = {
            loai: "MAU_HDON",
            noi_dung_so_sanh: "Mẫu hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
        }
        mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);
        //Ký hiệu hdon
        var ky_hieu_hdon = {
            loai: "KY_HIEU_HDON",
            noi_dung_so_sanh: "Ký hiệu hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
        }
        ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);
        //Số hdon
        var so_hdon = {
            loai: "SO_HDON",
            noi_dung_so_sanh: "Số hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
        }
        so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);
        //Tiền
        var tien = {
            loai: "TIEN",
            noi_dung_so_sanh: "Số tiền",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tien.nd_ocr = data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri;
        }
        tien.so_sanh = ESUtil.compareText(tien.nd_goc, tien.nd_ocr);
        //TL thuế
        var tl_thue = {
            loai: "TL_THUE",
            noi_dung_so_sanh: "Tỉ lệ thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tl_thue.nd_ocr = data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri;
        }
        tl_thue.so_sanh = ESUtil.compareText(tl_thue.nd_goc, tl_thue.nd_ocr);
        //Thuế
        var thue = {
            loai: "TIEN_THUE",
            noi_dung_so_sanh: "Tiền thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            thue.nd_ocr = data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri;
        }
        thue.so_sanh = ESUtil.compareText(thue.nd_goc, thue.nd_ocr);
        //Tổng tiền
        var tong_tien = {
            loai: "TONG_TIEN",
            noi_dung_so_sanh: "Tổng tiền",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
        }
        tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);
        //Tên dvi nhận
        var ten_dvi_nhan_hdon = {
            loai: "TEN_DVI_NHAN_HDON",
            noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri;
        }
        ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);
        //Website tra cứu
        var website_tra_cuu = {
            loai: "WEBSITE_TRA_CUU_HDON",
            noi_dung_so_sanh: "Website tra cứu",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);
        //Mã tra cứu
        var ma_tra_cuu = {
            loai: "MA_TRA_CUU_HDON",
            noi_dung_so_sanh: "Mã tra cứu hóa đơn",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

        arr.push(ten_dvi_phat_hanh);
        arr.push(mst_dvi_phat_hanh);
        arr.push(dchi_dvi_phat_hanh);
        arr.push(ngay_ct);
        arr.push(mau_hdon);
        arr.push(so_hdon);
        arr.push(ky_hieu_hdon);
        arr.push(tien);
        arr.push(tl_thue);
        arr.push(thue);
        arr.push(tong_tien);
        arr.push(ten_dvi_nhan_hdon);
        arr.push(ma_tra_cuu);
        arr.push(website_tra_cuu);
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
    }
}
function layDuLieuOCRHoaDonChungTu() {
    var otArr = [];
    $("#modalCompareDataOCRHoaDonChungTu tr.row_item").each(function (e) {
        var json = { loai: '', nd_ocr: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (json[field] != undefined) {
                    json[field] = $(this).val();
                }
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
    var hs = data.where(n => n.loai == val).firstOrDefault();
    var count = arrThongTinOCRHoaDon.where(n => n.loai == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrThongTinOCRHoaDon.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.loai == val);
    }
}
function onChonHoaDonTatCaOCR(el) {
    arrThongTinOCRHoaDon = [];
    var checked = $(el).is(":checked");
    $(".hoa_don_item").prop("checked", checked);
    var data = layDuLieuOCRHoaDonChungTu();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.loai == data[i].loai).firstOrDefault();
            var count = arrThongTinOCRHoaDon.where(n => n.loai == data[i].loai).length;
            if (checked && count <= 0) {
                arrThongTinOCRHoaDon.push(hs);
            }
            if (!checked && count > 0) {
                arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.loai == data[i].loai);
            }
        }
    }
}
function sdOCRHoaDon(el) {
    var arr = arrThongTinOCRHoaDon;
    var arrVal = getImageHoaDonOCRSelect();
    if (arr.length == 0) {
        _notifyService.error("Bạn chưa tích chọn dữ liệu cần sử dụng !");
        return;
    }
    var obj = {
        data: arr,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        bt: arrVal[0],
        dvi_ph: 'GARA'
    }
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hóa đơn chứng từ ?", "", () => {
        _carClaimCommonService.capNhatThongTinHoaDon(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Cập nhật dữ liệu thành công");
            $("#hoa_don_item_tat_ca").prop("checked", false);
            var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
            _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail;
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
            loadChungTuThuHuong();
            _modalOCRHoaDonChungTu.hide();
        });
    });
};
function initImageViewerHangMucHoaDonCTiet() {
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
function bindImagesCategoryHoaDonDetail(arrAnh) {
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
        _carInvestigationService.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        $('.inputSearchHangMucHoaDon').val('');
        _carInvestigationService.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMuc = bindImagesCategoryHoaDonDetail(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucHoaDonTemplate", "dsHinhAnhHangMucHoaDonCTiet", { danh_sach: arrAnhHangMuc });
                $('.inputSearchHangMucHoaDon').val(val);
                $(".inputSearchHangMucHoaDon").trigger('keyup');
            }
            initImageViewerHangMucHoaDonCTiet();
            _modalXemHinhAnhHoaDonCTiet.show();
        });
    }
}
//OCR xe
function layDuLieuOCRGPLX() {
    var otArr = [];
    $("#modalCarClaimCompareDataGPLX_SoSanh tr.row_item").each(function (e) {
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
function onChonOCRGPLX(el, val) {
    var count_item = $(".gplx_item").length;
    var count_checked = $(".gplx_item:checked").length;
    $("#gplx_item_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#gplx_item_tat_ca").prop("checked", true);
    var data = layDuLieuOCRGPLX();
    var hs = data.where(n => n.ma_nd == val).firstOrDefault();
    var count = arrDataOCR.where(n => n.ma_nd == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrDataOCR.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrDataOCR = arrDataOCR.removeItem(n => n.ma_nd == val);
    }
}
function onChonTatCaOCRGPLX(el) {
    arrDataOCR = [];
    var checked = $(el).is(":checked");
    $(".gplx_item").prop("checked", checked);
    var data = layDuLieuOCRGPLX();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.ma_nd == data[i].ma_nd).firstOrDefault();
            var count = arrDataOCR.where(n => n.ma_nd == data[i].ma_nd).length;
            if (checked && count <= 0) {
                arrDataOCR.push(hs);
            }
            if (!checked && count > 0) {
                arrDataOCR = arrDataOCR.removeItem(n => n.ma_nd == data[i].ma_nd);
            }
        }
    }
}
function layDuLieuOCRDangKiem() {
    var otArr = [];
    $("#modalCarClaimCompareDataDangKiem_SoSanh tr.row_item").each(function (e) {
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
function onChonOCRDK(el, val) {
    var count_item = $(".dangkiem_item").length;
    var count_checked = $(".dangkiem_item:checked").length;
    $("#dk_item_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#dk_item_tat_ca").prop("checked", true);
    var data = layDuLieuOCRDangKiem();
    var hs = data.where(n => n.ma_nd == val).firstOrDefault();
    var count = arrDataOCR.where(n => n.ma_nd == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrDataOCR.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrDataOCR = arrDataOCR.removeItem(n => n.ma_nd == val);
    }
}
function onChonTatCaOCRDK(el) {
    arrDataOCR = [];
    var checked = $(el).is(":checked");
    $(".dangkiem_item").prop("checked", checked);
    var data = layDuLieuOCRDangKiem();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.ma_nd == data[i].ma_nd).firstOrDefault();
            var count = arrDataOCR.where(n => n.ma_nd == data[i].ma_nd).length;
            if (checked && count <= 0) {
                arrDataOCR.push(hs);
            }
            if (!checked && count > 0) {
                arrDataOCR = arrDataOCR.removeItem(n => n.ma_nd == data[i].ma_nd);
            }
        }
    }
}
function sdOCR(nhom, vu_tt = '') {
    var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    var bt = '';
    if (nhom == "GPLX") {
        so_id_doi_tuong = _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").val();
        vu_tt = _frmCarClaimCompareDataGPLX.getControl("vu_tt").val();
        bt = _frmCarClaimCompareDataGPLX.getControl("bt").val();
    }
    if (nhom == "DANG_KIEM") {
        so_id_doi_tuong = _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").val();
        vu_tt = _frmCarClaimCompareDataDangKiem.getControl("vu_tt").val();
    }
    if (so_id_doi_tuong == null || so_id_doi_tuong == undefined || so_id_doi_tuong == "") {
        _notifyService.error("Không xác định được đối tượng tổn thất !");
        return;
    }
    if (vu_tt == null || vu_tt == undefined || vu_tt == "") {
        _notifyService.error("Không xác định được vụ tổn thất !");
        return;
    }
    var obj = {
        so_id: so_id,
        so_id_doi_tuong: so_id_doi_tuong,
        nhom: nhom,
        arr: arrDataOCR,
        vu_tt: vu_tt,
        bt: bt
    };
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hợp đồng và hồ sơ", "", () => {
        if (obj.arr.length == 0) {
            _notifyService.error("Vui lòng tích chọn dữ liệu để sử dụng !");
            return;
        }
        _carInvestigationService.capNhatThongTinOCR(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (obj.nhom == "GPLX") {
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                    ho_so_chi_tiet = res;
                    _frmCarClaimCompareDataGPLX.getControl("vu_tt").trigger("select2:select");
                    $("#gplx_item_tat_ca").prop("checked", false);
                });
            }
            if (obj.nhom == "DANG_KIEM") {
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                    ho_so_chi_tiet = res;
                    _frmCarClaimCompareDataDangKiem.getControl("vu_tt").trigger("select2:select");
                    $("#dk_item_tat_ca").prop("checked", false);
                });
            }
            _notifyService.success("Cập nhật dữ liệu thành công");
        });
    });
};
function compareAutoCompleteHangMuc(a, b) {
    var count = a.orderTmp.length;
    var bang_tat_ca = 0;
    for (var i = 0; i < count; i++) {
        if ((a.orderTmp[i] - b.orderTmp[i]) > 0) {
            return 1
        }
        if (a.orderTmp[i] == b.orderTmp[i]) {
            bang_tat_ca = bang_tat_ca + 1;
        }
        if ((a.orderTmp[i] - b.orderTmp[i]) < 0) {
            return -1
        }
    }
    if (bang_tat_ca == count) {
        return 0;
    }
    return 1;
}
//Lấy dữ liệu nghiệp vụ cần tách
function layNghiepVuCanTach() {
    var otArr = [];
    $("#modalTachNghiepVuBody tr").each(function (e) {
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input[data-field='lh_nv']").each(function (el) {
                if ($(this).is(":checked")) {
                    var field = $(this).attr("data-field");
                    otArr.push($(this).val());
                }
            });
        });
    });
    return otArr;
}
//Lấy lại danh sách giá tự động
function capNhapDSGiaTuDong() {
    var arr = html2json();
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        gara: $("#garaBaoGia tr.selected").attr("data-ma-gara"),
        arr: []
    }
    for (var i = 0; i < arr.length; i++) {
        obj.arr.push({
            hang_muc: arr[i].hang_muc,
            muc_do: arr[i].muc_do,
            thay_the_sc: arr[i].thay_the_sc
        });
    }
    _carClaimCommonService.xemGiaGoiY(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        DS_GIA_TU_DONG = res.data_info;
    });
}
//So sánh báo giá
function chuanHoaDuLieuSoSanhBGGara(du_lieu) {
    //du_lieu.gara, du_lieu.data
    var arrHangMuc = [];
    for (var i = 0; i < du_lieu.gara.length; i++) {
        var bgia_ct = du_lieu.data.where(n => n.gara == du_lieu.gara[i].gara);
        for (var b_i1 = 0; b_i1 < bgia_ct.length; b_i1++) {
            if (arrHangMuc.where(n => n.hang_muc == bgia_ct[b_i1].hang_muc).length <= 0) {
                arrHangMuc.push({ hang_muc: bgia_ct[b_i1].hang_muc, hang_muc_ten: bgia_ct[b_i1].hang_muc_ten });
            }
        }
    }

    for (var b_i1 = 0; b_i1 < arrHangMuc.length; b_i1++) {
        arrHangMuc[b_i1]["tien_vtu_min"] = 0;
        arrHangMuc[b_i1]["tien_nhan_cong_min"] = 0;
        arrHangMuc[b_i1]["tien_khac_min"] = 0;

        for (var i = 0; i < du_lieu.gara.length; i++) {
            var hm = du_lieu.data.where(n => n.gara == du_lieu.gara[i].gara && n.hang_muc == arrHangMuc[b_i1].hang_muc).firstOrDefault();
            if (hm != null) {
                arrHangMuc[b_i1]["tien_vtu_" + i] = hm.tien_vtu;
                arrHangMuc[b_i1]["tien_nhan_cong_" + i] = hm.tien_nhan_cong;
                arrHangMuc[b_i1]["tien_khac_" + i] = hm.tien_khac;
            }
            else {
                arrHangMuc[b_i1]["tien_vtu_" + i] = 0;
                arrHangMuc[b_i1]["tien_nhan_cong_" + i] = 0;
                arrHangMuc[b_i1]["tien_khac_" + i] = 0;
            }

            if (arrHangMuc[b_i1]["tien_vtu_min"] == 0 || arrHangMuc[b_i1]["tien_vtu_" + i] < arrHangMuc[b_i1]["tien_vtu_min"]) {
                arrHangMuc[b_i1]["tien_vtu_min"] = arrHangMuc[b_i1]["tien_vtu_" + i];
            }
            if (arrHangMuc[b_i1]["tien_nhan_cong_min"] == 0 || arrHangMuc[b_i1]["tien_nhan_cong_" + i] < arrHangMuc[b_i1]["tien_nhan_cong_min"]) {
                arrHangMuc[b_i1]["tien_nhan_cong_min"] = arrHangMuc[b_i1]["tien_nhan_cong_" + i];
            }
            if (arrHangMuc[b_i1]["tien_khac_min"] == 0 || arrHangMuc[b_i1]["tien_khac_" + i] < arrHangMuc[b_i1]["tien_khac_min"]) {
                arrHangMuc[b_i1]["tien_khac_min"] = arrHangMuc[b_i1]["tien_khac_" + i];
            }
        }
    }
    return arrHangMuc;
}
function showPopupDocHoaDonDienTu(el) {
    _frmDocHoaDonDT.resetForm();
    _frmDocHoaDonDT.clearErrorMessage();
    $("#fileNameHoaDonDienTu").html("");
    _modalDocHoaDonDienTu.show();
}
//Chon hoa don
function chonSoHoaDon(el) {
    $("#modalChonSoHoaDon .modalChonSoHoaDonItem").prop("checked", false);
    var val = $(el).val();
    if (val != "") {
        var arr = val.split(",");
        for (var i = 0; i < arr.length; i++) {
            $("#modalChonSoHoaDon .modalChonSoHoaDonItem[value='" + arr[i] + "']").prop("checked", true);
        }
    }
    _modalChonSoHoaDon.show(el);
}
//Tìm kiếm
function layDuLieuTableGiamDinhVCXTimKiem() {
    var otArr = [];
    $("#modalChiTietTonThatGDVCX tr.hmChiTietItem").each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
            td = $(this).children();
            td.each(function (i) {
                $(this).find("input").each(function (el) {
                    var field = $(this).attr("data-field");
                    json[field] = $(this).val();
                });
            });
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTablePhuongAnVCXTimKiem() {
    var otArr = [];
    $("#tblPhuongAnVCX tr.hmChiTietItem").each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
            td = $(this).children();
            td.each(function (i) {
                $(this).find("input").each(function (el) {
                    var field = $(this).attr("data-field");
                    json[field] = $(this).attr("data-val");
                });
            });
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTableBaoGiaGaraTimKiem() {
    var otArr = [];
    $('table#tableDsHMTTBaoGia tbody tr.gara_bg_ctiet').each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    var name = $(this).attr("name");
                    if ($(this).hasClass("number")) {
                        json[name] = $(this).val().replace(/[^0-9]+/g, '');
                    } else {
                        json[name] = $(this).val();
                    }
                });
                $(this).find("a").each(function (el) {
                    var name = $(this).attr("data-field");
                    if ($(this).hasClass("number")) {
                        json[name] = $(this).val().replace(/[^0-9]+/g, '');
                    } else {
                        json[name] = $(this).attr("data-val");
                    }
                });
            });
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuTableTinhToanVCXTimKiem() {
    var otArr = [];
    $("#tblTinhToanVCX tr.tblTinhToanVCXItem").each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
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
        }
    });
    return otArr;
}
//Nhập tỉ lệ thương tật
function nhapThuongTat(bt, vu_tt, lh_nv, hang_muc, so_id_doi_tuong, showModal = true) {
    if (bt == undefined || bt == null || bt == "0") {
        _notifyService.error("Thiếu tham số bt");
        return;
    }
    if (vu_tt == undefined || vu_tt == null || vu_tt == "0") {
        _notifyService.error("Thiếu tham số vu_tt");
        return;
    }
    if (lh_nv == undefined || lh_nv == null || lh_nv == "") {
        _notifyService.error("Thiếu tham số lh_nv");
        return;
    }
    if (hang_muc == undefined || hang_muc == null || hang_muc == "") {
        _notifyService.error("Thiếu tham số hang_muc");
        return;
    }
    if (so_id_doi_tuong == undefined || so_id_doi_tuong == null || so_id_doi_tuong == "0") {
        _notifyService.error("Thiếu tham số so_id_doi_tuong");
        return;
    }
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        bt: bt,
        vu_tt: vu_tt,
        lh_nv: lh_nv,
        hang_muc: hang_muc,
        so_id_doi_tuong: so_id_doi_tuong,
        pm: "BT"
    };

    _frmTLThuongTatNhap.resetForm();
    _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", "");
    _carInvestigationService.layDsThuongTat(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmTLThuongTat.setData(obj);
        ESUtil.genHTML("tableTLThuongTatTemplate", "tableTLThuongTat", { data: res.data_info });
        if (showModal)
            _modalTLThuongTat.show();
    });
}
function xoaTLThuongTat(bt, vu_tt, lh_nv, so_id_doi_tuong, ma_thuong_tat, pm) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa mức độ thương tật này không?", "", () => {
        var obj = _frmTLThuongTat.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.bt = bt;
        obj.vu_tt = vu_tt;
        obj.lh_nv = lh_nv;
        obj.so_id_doi_tuong = so_id_doi_tuong;
        obj.ma_thuong_tat = ma_thuong_tat;
        obj.pm = pm;
        if (obj.ma_thuong_tat == undefined || obj.ma_thuong_tat == null || obj.ma_thuong_tat == "") {
            _notifyService.error("Không xác định được mức độ thương tật");
            return;
        }
        _carInvestigationService.xoaThuongTat(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmTLThuongTatNhap.resetForm();
            _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", "");

            _notifyService.success("Xóa mức độ thương tật thành công");
            nhapThuongTat(obj.bt, obj.vu_tt, obj.lh_nv, obj.hang_muc, obj.so_id_doi_tuong, false);
        });
    });
}
function xemTLThuongTat(ma_thuong_tat, ten_thuong_tat, pttt, tien_ht, ghi_chu) {
    _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", ma_thuong_tat);
    _frmTLThuongTatNhap.getControl("ma_thuong_tat").val(ten_thuong_tat);
    _frmTLThuongTatNhap.getControl("pttt").val(pttt);
    _frmTLThuongTatNhap.getControl("tien").val(tien_ht);
    _frmTLThuongTatNhap.getControl("ghi_chu").val(ghi_chu);
}
function onSearchTyLeThuongTat(el) {
    $("#inputTimKiemTyLeThuongTat").trigger("focus");
}
function xemVideoHs(bt) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        bt: bt
    }
    _carClaimCommonService.xemVideoHs(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#inputNhapTenFile").focus();
        var ten = $("#modalVideoDanhSach a.active").text();
        $("#inputNhapTenFile").val(ten);
        $("#modalVideoView").attr("src", res.data_info.duong_dan);
    });
}
function xemVideoDGRRHD(bt) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        bt: bt
    }
    _carClaimCommonService.xemVideoHs(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#modalVideoViewDGRRHD").attr("src", res.data_info.duong_dan);
    });
}
function showNhapTen(el) {
    _popoverNhapTenFile.options = { placement: "top" };
    $("#inputNhapTenFile").focus();
    var ten = $("#modalVideoDanhSach a.active").text();
    $("#inputNhapTenFile").val(ten);
    _popoverNhapTenFile.showWithPosition(el);
}
function closeCaptureVideo() {
    $(".modalVideoCapture").addClass("d-none");
}
function captureVideo() {
    var canvas = document.getElementById("canvasVideo");
    var video = document.getElementById("modalVideoView");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const playImage = new Image();
    playImage.src = "path to image asset";
    playImage.onload = () => {
        const startX = video.videoWidth / 2 - playImage.width / 2;
        const startY = video.videoHeight / 2 - playImage.height / 2;
        canvas
            .getContext("2d")
            .drawImage(playImage, startX, startY, playImage.width, playImage.height);
        canvas.toBlob() = (blob) => {
            const img = new Image();
            img.src = window.URL.createObjectUrl(blob);
        };
    };

    $(".modalVideoCapture").removeClass("d-none");

    setTimeout(function () {
        $(".modalVideoCapture").addClass("d-none");
    }, 4000);

    var formData = new FormData();
    formData.append("ma_doi_tac_nsd", ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
    formData.append("ma_doi_tac", ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
    formData.append("so_id", ho_so_chi_tiet.data_info.ho_so.so_id);
    formData.append("so_id_dt", "0");
    formData.append("so_id_doi_tuong", "0");
    formData.append("nv", "XE");
    formData.append("pm", "GD");
    formData.append("ung_dung", "WEB");
    formData.append("file0", ESUtil.postCanvasToURL("canvasVideo"), "file.png");
    var _baseService = new Service();
    _baseService.postFormData("/upload/uploadfile", formData).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
    });

    _notifyService.success("Chụp ảnh thành công");
}
function onXemHangMucDGRR(hang_muc) {
    var ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    _modalSoSanhDGRR.show(ma_doi_tac, so_id, hang_muc, "XE");
}
function onChangeLoaiTS(val, callback = undefined) {
    $(".tinhToanTaiSanDoiTuong").addClass("d-none");
    if (val == "XE") {
        $(".tinhToanTaiSanDoiTuong").removeClass("d-none");
        $(".tinhToanDviNhanHD").addClass("d-none");
        $(".tinhToanDanhGia").addClass("d-none");
        var dsDoiTuongTaiSanXe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == "TAI_SAN" && n.loai == "XE");
        _frmTinhToanBoiThuong.getControl("doi_tuong").setDataSource(dsDoiTuongTaiSanXe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", "");
        if (dsDoiTuongTaiSanXe != undefined && dsDoiTuongTaiSanXe != null && dsDoiTuongTaiSanXe.length > 0) {
            _frmTinhToanBoiThuong.getControl("doi_tuong").setValue(dsDoiTuongTaiSanXe[0].so_id_doi_tuong);
            _frmTinhToanBoiThuong.getControl("doi_tuong").trigger("select2:select");
        }
        if (callback) {
            callback();
        }
        return;
    }
    $(".divTinhToanItem").addClass("d-none");
    $(".tinhToanXE").addClass("d-none");
    $("#divTinhToanTNDS_TAISAN").removeClass("d-none");
    $(".tinhToanDviNhanHD").removeClass("d-none");
    $(".tinhToanDviNhanHD").removeClass("d-none");
    $(".tinhToanDanhGia").removeClass("d-none");

    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv")
    }
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv).firstOrDefault();
    if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    _service.layHangMucLHNV(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var tong_nv = res.data_info.tong_nv;
        _frmTinhToanBoiThuong.getControl("so_vu").setValue(tong_nv.so_vu);
        _frmTinhToanBoiThuong.getControl("so_vu_tt").setValue(tong_nv.so_vu_tt);

        _frmTinhToanBoiThuong.getControl("tl_thue").setValue(tong_nv.tl_thue);
        _frmTinhToanBoiThuong.getControl("so_id_doi_tuong").setValue(tong_nv.so_id_doi_tuong);

        _frmTinhToanBoiThuong.getControl("thue").setValue(tong_nv.thue);
        _frmTinhToanBoiThuong.getControl("giam_tru_khac").setValue(ESUtil.formatMoney(tong_nv.tien_giam_tru_khac));
        _frmTinhToanBoiThuong.getControl("khau_tru").setValue(tong_nv.khau_tru);
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(tong_nv.tien_mien_thuong_sau_thue);
        _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").setValue(tong_nv.tien_mien_thuong_sau_thue / tong_nv.so_vu_tt);

        $("#danh_gia").val(tong_nv.danh_gia);
        $("#de_xuat").val(tong_nv.de_xuat);

        /*TNDS về tài sản*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            var nhom = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-nhom");
            var doi_tuong = $("#navNghiepVuTab4 .breadcrumb-item.active").attr("data-doi-tuong");
            var arr = chuanHoaNVCTTinhToan(res.data_info.data, nhom, doi_tuong);
            ESUtil.genHTML("tblTinhToanTNDS_TAISANTemplate", "tblTinhToanTNDS_TAISAN", { tinh_toan_bt: arr }, () => {
                var giaduyet = arr.sum(n => parseFloat(n.tien_duyet_pa));
                var giaduyet_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_duyet_pa));
                $("#tblTinhToanTNDS_TAISANTienDuyetGiaKhac").html(ESUtil.formatMoney(giaduyet_khac));
                $("#tblTinhToanTNDS_TAISANTienDuyetGia").html(ESUtil.formatMoney(giaduyet));
                tinhToan();
            });
        }

        if (callback) {
            callback();
        }
    });
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
$(document).bind('fscreenchange', function (e, state, elem) {
    if ($.fullscreen.isFullScreen()) {
        $('#CarCompensationContentStep4Tab1').append($('.popover-x'));
        $('#CarCompensationModalLabel_fullsreen').find('i').removeClass('fa-expand-arrows-alt').addClass('fa-compress-arrows-alt');
        $('#image_fullsreen').find('i').removeClass('fa-expand-arrows-alt').addClass('fa-compress-arrows-alt');
        $('#table_vat_chat_xe').css('max-height', '500px');
    } else {
        e.preventDefault();
        $('#CarCompensationModalLabel_fullsreen').find('i').removeClass('fa-compress-arrows-alt').addClass('fa-expand-arrows-alt');
        $('#image_fullsreen').find('i').removeClass('fa-compress-arrows-alt').addClass('fa-expand-arrows-alt');
        $('body').append($('.popover-x'));
        _modalThemHMTT.hide();
        $('#table_vat_chat_xe').css('max-height', '280px');
    }

    $('#state').text($.fullscreen.isFullScreen() ? '' : 'not');
});
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("BOI_THUONG");
    var tu_dong_gia_de_xuat = ESStorage.getItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT);
    if (tu_dong_gia_de_xuat == undefined || tu_dong_gia_de_xuat == null || tu_dong_gia_de_xuat == "") {
        ESStorage.setItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT, "K");
    }
    _frmTimKiem.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiem.getControl("ngay_c").setValue(dateNow);
    $("#CarCommonInfoCarSearch").hide();
    $("#CarCommonInfoCustomerInfo").hide();
    $("#CarCommonInfoCustomerInfo1").hide();
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('disabled')) {
            return false;
        }
    });
    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs .nav-item .active');
        var $activeli = $active.parent("li");
        $($activeli).next().find('a[data-toggle="tab"]').removeClass("disabled");
        $($activeli).next().find('a[data-toggle="tab"]').click();

    });
    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs .nav-item .active');
        var $activeli = $active.parent("li");
        $($activeli).prev().find('a[data-toggle="tab"]').removeClass("disabled");
        $($activeli).prev().find('a[data-toggle="tab"]').click();
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    var _serviceTmpHome = new Service();
    $("#btnXuatExcel").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_BC_BT_XE_BOI_THUONG";

        _serviceTmpHome.getFile("/common/ExportExcel", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });

    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null || storageDonViHanhChinh === "null") {
        _service.base.all([
            _userManagementService.layDsNSD(),//0
            _commonService.layControl({ nv: "XE" }),//1
            _partnerListService.layDsDoiTac(),//2
            _branchListService.layDsChiNhanh(),//3
            _businessCodeService.layDsLHNV(),//4
            _categoryvehicleListService.layDsHangMucXe(),//5
            _bankListService.layDsNganHang(),//6
            _garaListService.layDsGara(),//7
            _damageLevelService.layDsMucDoTonThat(),//8
            _categoryCommonService.layDsDanhMucChung(),//9
            _statusListService.layDsTrangThai(),//10
            _carInvestigationService.layDanhSachTyLeThuongTat(),//11
            _unitService.Tkiem({ nhom: "TSHH" }),//12
            _commonService.layTatCaDonViHanhChinh(),//13
            _carManufacturerListService.layDsHangXe(),//14
            _hieuXeService.layDsHieuXe(),//15
            _rangeVehicleService.layDsLoaiXe(),//16,
            _carClaimCommonService.lietKeDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC }),//17
            _storageUnitService.layDsMaKho({ ma_doi_tac: ESCS_MA_DOI_TAC })
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info;
            objDanhMuc.doi_tac = arrRes[2].data_info;
            objDanhMuc.chi_nhanh = arrRes[3].data_info;
            objDanhMuc.lhnv = arrRes[4].data_info;
            objDanhMuc.hang_muc_xe = arrRes[5].data_info;
            objDanhMuc.ngan_hang = arrRes[6].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[6].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.gara = arrRes[7].data_info;
            objDanhMuc.muc_do_ton_that = arrRes[8].data_info;
            objDanhMuc.dmuc_chung = arrRes[9].data_info;
            objDanhMuc.hang_muc_bo_sung = objDanhMuc.hang_muc_xe.where(n => n.loai == "PHU" || n.loai == "CHINH");
            objDanhMuc.hang_muc_chinh = objDanhMuc.hang_muc_xe.where(n => n.loai == "CHINH" && n.nhom != "HSGT");
            objDanhMuc.muc_do_ton_that_xe = JSON.parse(JSON.stringify(objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE")));
            objDanhMuc.ds_trang_thai = arrRes[10].data_info;
            arrTrangThai = arrRes[10].data_info;
            objDanhMuc.ds_tltt = chuanHoaDuLieuTreeTLTT(arrRes[11].data_info);
            objDanhMuc.dvi_tinh = arrRes[12].data_info;
            objDanhMuc.hang_xe = arrRes[14].data_info.where(n => n.nv == 'XE');
            objDanhMuc.hieu_xe = arrRes[15].data_info.where(n => n.nv == 'XE');
            objDanhMuc.loai_xe = arrRes[16].data_info.where(n => n.nv == 'XE');
            objDanhMuc.ds_giay_to = arrRes[17].data_info;
            objDanhMuc.ds_kho_luu_tru = arrRes[18].data_info;
            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.ds_trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                ESUtil.autoComplete(document.getElementById("frmHangMucBoSung_hang_muc"), objDanhMuc.hang_muc_chinh, "ma", "ten", 10, "280px", val => { });
            });
            ESUtil.executeAsync(() => {
                for (var i = 0; i < objDanhMuc.muc_do_ton_that_xe.length; i++) {
                    if (objDanhMuc.muc_do_ton_that_xe[i].ma_ct === undefined || objDanhMuc.muc_do_ton_that_xe[i].ma_ct === null || objDanhMuc.muc_do_ton_that[i].ma_ct === "") {
                        objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = "Khác";
                    } else {
                        var tt = objDanhMuc.muc_do_ton_that_xe.where(n => n.ma === objDanhMuc.muc_do_ton_that_xe[i].ma_ct).firstOrDefault();
                        if (tt === undefined || tt === null) {
                            objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = "Không xác định mã cha";
                            continue;
                        }
                        objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = tt.ten;
                    }
                }
                _frmHangMucBoSung.getControl("muc_do").setDataSource(objDanhMuc.muc_do_ton_that_xe, "ten", "ma", "Chọn mức độ tổn thất", "");
            });
            ESUtil.executeAsync(() => { fnLoadTreeTLTT(objDanhMuc.ds_tltt); });
            ESUtil.executeAsync(() => {
                ESUtil.genHTML("modalDviTinhDanhSachTemplate", "modalDviTinhDanhSach", { danh_sach: objDanhMuc.dvi_tinh }, () => {
                    $("#modalDviTinhDanhSach .single_checked").click(function () {
                        $("#modalDviTinhDanhSach .single_checked").prop("checked", false);
                        $(this).prop("checked", true);
                    });
                });
            });
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.executeAsync(() => {
                objDanhMucDonViHanhChinh = arrRes[13].data_info;
                ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMucDonViHanhChinh));
                bindDataDonViHanhChinh(objDanhMucDonViHanhChinh);
                objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
                objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
                objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");
            });
            ESUtil.executeAsync(() => {
                _frmAddChiPhiKhac.getControl("ma_gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
                _frmAddChiPhiKhac.getControl("ma_chi_phi").addEventChange(val => {
                    $("#thongTinDiaDiemKeoXe").removeClass("d-none");
                    resetFormChiPhiKhac();
                    if (val == "CP_GIAM_DINH" || val == "CP_CAU_KEO") {
                        bindThongTinDonViThamGia(val);
                    }
                    if (val == "") {
                        _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource([], "ten", "ma", "Chọn đơn vị tham gia", "");
                    }
                    anHienColChiPhiKhac(val, "");
                });
                _frmAddChiPhiKhac.getControl("dvi_tham_gia").addEventChange(val => {
                    resetFormChiPhiKhac();
                    var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").val();
                    if (ma_chi_phi == "CP_GIAM_DINH") {
                        bindDataThongTinChiTietForm(ma_chi_phi, val);
                        _frmAddChiPhiKhac.getControl("ten_chi_phi").setValue("Chi phí giám định với đơn vị giám định ngoài");
                    }
                    if (ma_chi_phi == "CP_CAU_KEO") {
                        var ma = val.split("-")[0];
                        var nhom = val.split("-")[1];
                        bindDataThongTinChiTietForm(ma_chi_phi, ma, nhom);
                        anHienColChiPhiKhac(ma_chi_phi, nhom);
                    }
                });
                _frmAddChiPhiKhac.getControl("ma_gara").addEventChange(val => {
                    var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").val();
                    bindThongTinChiTietGara(val, ma_chi_phi);
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_khac").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_cau").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_keo").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
            });
            bindCmbDataHangMucXe(objDanhMuc);
            bindCmbDataGara(objDanhMuc);

            _frmTinhToanBoiThuong.getControl("khau_tru").setDataSource(_common.danhMucChung.khau_tru, "ten", "ma", " ", "");
            _frmTinhToanBoiThuong.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue_mien_thuong, "ten", "ma", " ", "");
            _frmTinhToanBoiThuongPA.getControl("khau_tru").setDataSource(_common.danhMucChung.khau_tru, "ten", "ma", "Chọn khấu trừ", "");
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue_mien_thuong, "ten", "ma");
            _frmCarCompensationAddInvoice.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
            _frmCarCompensationAddBenefit.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmAddChiPhiKhac.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmCarCompensationAdvance.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmCarCompensationAdvance.getControl("ma_cnhanh_nh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            _frmThuHoiVatTu.getControl("ma_kho").setDataSource(objDanhMuc.ds_kho_luu_tru, "ten", "ma", "Chọn kho lưu trữ", "");
            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
            _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
            _frmSuaGCN_BT.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
            _frmSuaGCN_BT.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
            _frmSuaGCN_BT.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");
            _frmSuaGCN_BT.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });

            _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setValue("");
            objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.loai === "TAI_LIEU");
            _carClaimCommon.loadDmucLoaiHsGiayTo(objDanhMuc.hang_muc_tai_lieu);
            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
            _modalBaoCaoService.data.trang_thai = objDanhMuc.ds_trang_thai;
            _modalBaoCaoService.data.nguon = _commonService.danhMucChung.nguon_tb;
            _modalBaoCaoService.fillDataControl();
            hienThiHoSoNofify();
            getPaging(1);
        });
    } else {
        var objDanhMucDonViHanhChinh = JSON.parse(storageDonViHanhChinh);
        bindDataDonViHanhChinh(objDanhMucDonViHanhChinh);
        objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
        objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
        objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");

        _service.base.all([
            _userManagementService.layDsNSD(),//0
            _commonService.layControl({ nv: "XE" }),//1
            _partnerListService.layDsDoiTac(),//2
            _branchListService.layDsChiNhanh(),//3
            _businessCodeService.layDsLHNV(),//4
            _categoryvehicleListService.layDsHangMucXe(),//5
            _bankListService.layDsNganHang(),//6
            _garaListService.layDsGara(),//7
            _damageLevelService.layDsMucDoTonThat(),//8
            _categoryCommonService.layDsDanhMucChung(),//9
            _statusListService.layDsTrangThai(),//10
            _carInvestigationService.layDanhSachTyLeThuongTat(),//11
            _unitService.Tkiem({ nhom: "TSHH" }),//12
            //_commonService.layTatCaDonViHanhChinh(),//13
            _carManufacturerListService.layDsHangXe(),//13
            _hieuXeService.layDsHieuXe(),//14
            _rangeVehicleService.layDsLoaiXe(),//15
            _carClaimCommonService.lietKeDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC }), //16
            _storageUnitService.layDsMaKho({ ma_doi_tac: ESCS_MA_DOI_TAC }) //17
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info;
            objDanhMuc.doi_tac = arrRes[2].data_info;
            objDanhMuc.chi_nhanh = arrRes[3].data_info;
            objDanhMuc.lhnv = arrRes[4].data_info;
            objDanhMuc.hang_muc_xe = arrRes[5].data_info;
            objDanhMuc.ngan_hang = arrRes[6].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[6].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.gara = arrRes[7].data_info;
            objDanhMuc.muc_do_ton_that = arrRes[8].data_info;
            objDanhMuc.dmuc_chung = arrRes[9].data_info;
            objDanhMuc.hang_muc_bo_sung = objDanhMuc.hang_muc_xe.where(n => n.loai == "PHU" || n.loai == "CHINH");
            objDanhMuc.hang_muc_chinh = objDanhMuc.hang_muc_xe.where(n => n.loai == "CHINH" && n.nhom != "HSGT");
            objDanhMuc.muc_do_ton_that_xe = JSON.parse(JSON.stringify(objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE")));
            objDanhMuc.ds_trang_thai = arrRes[10].data_info;
            arrTrangThai = arrRes[10].data_info;
            objDanhMuc.ds_tltt = chuanHoaDuLieuTreeTLTT(arrRes[11].data_info);
            objDanhMuc.dvi_tinh = arrRes[12].data_info;
            objDanhMuc.hang_xe = arrRes[13].data_info.where(n => n.nv == 'XE');
            objDanhMuc.hieu_xe = arrRes[14].data_info.where(n => n.nv == 'XE');
            objDanhMuc.loai_xe = arrRes[15].data_info.where(n => n.nv == 'XE');
            objDanhMuc.ds_giay_to = arrRes[16].data_info;
            objDanhMuc.ds_kho_luu_tru = arrRes[17].data_info;
            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.ds_trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                ESUtil.autoComplete(document.getElementById("frmHangMucBoSung_hang_muc"), objDanhMuc.hang_muc_chinh, "ma", "ten", 10, "280px", val => { });
            });
            ESUtil.executeAsync(() => {
                for (var i = 0; i < objDanhMuc.muc_do_ton_that_xe.length; i++) {
                    if (objDanhMuc.muc_do_ton_that_xe[i].ma_ct === undefined || objDanhMuc.muc_do_ton_that_xe[i].ma_ct === null || objDanhMuc.muc_do_ton_that[i].ma_ct === "") {
                        objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = "Khác";
                    } else {
                        var tt = objDanhMuc.muc_do_ton_that_xe.where(n => n.ma === objDanhMuc.muc_do_ton_that_xe[i].ma_ct).firstOrDefault();
                        if (tt === undefined || tt === null) {
                            objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = "Không xác định mã cha";
                            continue;
                        }
                        objDanhMuc.muc_do_ton_that_xe[i].ma_ct_ten = tt.ten;
                    }
                }
                _frmHangMucBoSung.getControl("muc_do").setDataSource(objDanhMuc.muc_do_ton_that_xe, "ten", "ma", "Chọn mức độ tổn thất", "");
            });
            ESUtil.executeAsync(() => { fnLoadTreeTLTT(objDanhMuc.ds_tltt); });
            ESUtil.executeAsync(() => {
                ESUtil.genHTML("modalDviTinhDanhSachTemplate", "modalDviTinhDanhSach", { danh_sach: objDanhMuc.dvi_tinh }, () => {
                    $("#modalDviTinhDanhSach .single_checked").click(function () {
                        $("#modalDviTinhDanhSach .single_checked").prop("checked", false);
                        $(this).prop("checked", true);
                    });
                });
            });
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.executeAsync(() => {
                _frmAddChiPhiKhac.getControl("ma_gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
                _frmAddChiPhiKhac.getControl("ma_chi_phi").addEventChange(val => {
                    $("#thongTinDiaDiemKeoXe").removeClass("d-none");
                    resetFormChiPhiKhac();
                    if (val == "CP_GIAM_DINH" || val == "CP_CAU_KEO") {
                        bindThongTinDonViThamGia(val);
                    }
                    if (val == "") {
                        _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource([], "ten", "ma", "Chọn đơn vị tham gia", "");
                    }
                    anHienColChiPhiKhac(val, "");
                });
                _frmAddChiPhiKhac.getControl("dvi_tham_gia").addEventChange(val => {
                    resetFormChiPhiKhac();
                    var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").val();
                    if (ma_chi_phi == "CP_GIAM_DINH") {
                        bindDataThongTinChiTietForm(ma_chi_phi, val);
                        _frmAddChiPhiKhac.getControl("ten_chi_phi").setValue("Chi phí giám định với đơn vị giám định ngoài");
                    }
                    if (ma_chi_phi == "CP_CAU_KEO") {
                        var ma = val.split("-")[0];
                        var nhom = val.split("-")[1];
                        bindDataThongTinChiTietForm(ma_chi_phi, ma, nhom);
                        anHienColChiPhiKhac(ma_chi_phi, nhom);
                    }
                });
                _frmAddChiPhiKhac.getControl("ma_gara").addEventChange(val => {
                    var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").val();
                    bindThongTinChiTietGara(val, ma_chi_phi);
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_khac").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_cau").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
                _frmAddChiPhiKhac.getControl("tl_thue_chi_phi_keo").addEventChange(val => {
                    tinhTienThueChiPhiKhac();
                });
            });
            bindCmbDataHangMucXe(objDanhMuc);
            bindCmbDataGara(objDanhMuc);

            _frmTinhToanBoiThuong.getControl("khau_tru").setDataSource(_common.danhMucChung.khau_tru, "ten", "ma", " ", "");
            _frmTinhToanBoiThuong.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue_mien_thuong, "ten", "ma", " ", "");
            _frmTinhToanBoiThuongPA.getControl("khau_tru").setDataSource(_common.danhMucChung.khau_tru, "ten", "ma", "Chọn khấu trừ", "");
            _frmTinhToanBoiThuongPA.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue_mien_thuong, "ten", "ma");
            _frmCarCompensationAddInvoice.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
            _frmCarCompensationAddBenefit.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmAddChiPhiKhac.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmCarCompensationAdvance.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmCarCompensationAdvance.getControl("ma_cnhanh_nh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            _frmThuHoiVatTu.getControl("ma_kho").setDataSource(objDanhMuc.ds_kho_luu_tru, "ten", "ma", "Chọn kho lưu trữ", "");
            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
            _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
            _frmSuaGCN_BT.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
            _frmSuaGCN_BT.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
            _frmSuaGCN_BT.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");
            _frmSuaGCN_BT.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setValue("");
            ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });

            objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.loai === "TAI_LIEU");
            _carClaimCommon.loadDmucLoaiHsGiayTo(objDanhMuc.hang_muc_tai_lieu);
            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
            _modalBaoCaoService.data.trang_thai = objDanhMuc.ds_trang_thai;
            _modalBaoCaoService.data.nguon = _commonService.danhMucChung.nguon_tb;
            _modalBaoCaoService.fillDataControl();
            hienThiHoSoNofify();
            getPaging(1);
        });
    }

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
    });
    _frmCapNhatThue.getControl("tien_thue").change(function () {
        var obj = _frmCapNhatThue.getJsonData();
        if (obj.so_tien == undefined || obj.so_tien == null || obj.so_tien == "") {
            obj.so_tien = 0;
        }
        if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "") {
            obj.tien_thue_cp_khac = 0;
        }
        obj.tien_thue = _frmCapNhatThue.getControl("tien_thue").val().replace(/[^0-9]+/g, '');
        if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "") {
            obj.tien_thue = 0;
        }
        var tong_cong = parseFloat(obj.so_tien) + parseFloat(obj.tien_thue) + parseFloat(obj.tien_thue_cp_khac);
        _frmCapNhatThue.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });

    _frmCapNhatThue.getControl("tien_thue_cp_khac").change(function () {
        var obj = _frmCapNhatThue.getJsonData();
        if (obj.so_tien == undefined || obj.so_tien == null || obj.so_tien == "") {
            obj.so_tien = 0;
        }
        obj.tien_thue_cp_khac = _frmCapNhatThue.getControl("tien_thue_cp_khac").val().replace(/[^0-9]+/g, '');
        if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "") {
            obj.tien_thue_cp_khac = 0;
        }
        if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "") {
            obj.tien_thue = 0;
        }
        var tong_cong = parseFloat(obj.so_tien) + parseFloat(obj.tien_thue) + parseFloat(obj.tien_thue_cp_khac);
        _frmCapNhatThue.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });


    _frmTimKiem.getControl("btv").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_chi_nhanh").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        getPaging(1);
    });
    _frmTinhToanBoiThuong.getControl("mien_thuong").addEventChange(val => {
        tinhToan();
    });
    _frmTinhToanBoiThuong.getControl("khau_tru").addEventChange(val => {
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
        if (val == "C") {
            _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(ESUtil.formatMoney(ho_so_chi_tiet.data_info.ho_so.mien_thuong));
        }
        tinhToan();
    });
    _frmTinhToanBoiThuong.getControl("giam_tru_khac").addEventChange(val => {
        tinhToan();
    });  
    _frmCarCompensationAddInvoice.getControl("dvi_ph").addEventChange(val => {
        var data = _frmTinhToanBoiThuong.getJsonData();
        data.loai = val;
        _service.layThongTinDoiTacChungTu(data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            res = res.data_info;
            var tong_cong = res.tien + res.thue;
            _frmCarCompensationAddInvoice.getControl("ten_dvi_phat_hanh").setValue(res.ten);
            _frmCarCompensationAddInvoice.getControl("mst_dvi_phat_hanh").setValue(res.mst);
            _frmCarCompensationAddInvoice.getControl("dchi_dvi_phat_hanh").setValue(res.dia_chi);
            _frmCarCompensationAddInvoice.getControl("ten_dvi_nhan").setValue(res.ten_dvi_nhan);
            _frmCarCompensationAddInvoice.getControl("dchi_dvi_nhan").setValue(res.dchi_dvi_nhan);
            _frmCarCompensationAddInvoice.getControl("mst_dvi_nhan").setValue(res.mst_dvi_nhan);
            _frmCarCompensationAddInvoice.getControl("mau_hdon").setValue(res.mau_hdon);
            _frmCarCompensationAddInvoice.getControl("ky_hieu_hdon").setValue(res.ky_hieu_hdon);
            _frmCarCompensationAddInvoice.getControl("tien").setValue(res.tien);
            _frmCarCompensationAddInvoice.getControl("thue").setValue(ESUtil.formatMoney(res.thue));
            _frmCarCompensationAddInvoice.getControl("tl_thue").setValue(res.tl_thue);
            _frmCarCompensationAddInvoice.getControl("website_tra_cuu").setValue(res.website_tra_cuu);
            _frmCarCompensationAddInvoice.getControl("ma_tra_cuu").setValue(res.ma_tra_cuu);
            _frmCarCompensationAddInvoice.getControl("tong_cong").setValue(tong_cong);
        });

    });
    _frmCarCompensationAddInvoice.getControl("tl_thue").addEventChange(val => {
        chungTuTinhTien();
    });
    _frmBaoGiaGara.getControl("gara").addEventChange(val => {
        layBaoGiaTuGara(val);
    });
    _frmCarCompensationAddBenefit.getControl("dvi_th").addEventChange(val => {
        var data = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            loai: val
        };
        _service.layThongTinDoiTac(data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var resData = res.data_info;
            _frmCarCompensationAddBenefit.getControl("ten").setValue(resData.ten);
            _frmCarCompensationAddBenefit.getControl("tk_cmt").setValue(resData.tai_khoan);
            _frmCarCompensationAddBenefit.getControl("tien_chua_vat").setValue(resData.tien_chua_vat);
            _frmCarCompensationAddBenefit.getControl("tien_thue").setValue(resData.tien_thue);
            _frmCarCompensationAddBenefit.getControl("tien").setValue(resData.tien);
            _frmCarCompensationAddBenefit.getControl("dien_giai").setValue(resData.dien_giai_1);
        });
    });
    _frmCarCompensationAddBenefit.getControl("ma_ngan_hang").addEventChange(val => {
        _frmCarCompensationAddBenefit.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmCarCompensationAdvance.getControl("ma_nh").addEventChange(val => {
        _frmCarCompensationAdvance.getControl("ma_cnhanh_nh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmModalTrinhDuyet.getControl("ma_doi_tac_duyet").addEventChange(val => {
        _service_trinh_duyet.layDanhSachNguoiDuyet({
            ma_doi_tac: val,
            ma_doi_tac_duyet: val,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            nv: nv_trinh,
            loai: loai_trinh
        }).then(res => {
            _frmModalTrinhDuyet.getControl("nguoi_duyet").setDataSource(res.data_info, "ten", "ma", "Chọn cán bộ");
        });
    });
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").addEventChange(val => {
        var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ho_so_chi_tiet.data_info.ho_so.ma_doi_tac && n.ma_chi_nhanh === val);
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setValue("");
    });
    _frmAddChiPhiKhac.getControl("ma_gara").addEventChange(val => {
        var ma_chi_phi = _frmAddChiPhiKhac.getControl("ma_chi_phi").val();
        bindThongTinChiTietGara(val, ma_chi_phi);
    });
    _frmKhauTru.getControl("vu_tt").addEventChange(val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
            so_id_doi_tuong: _frmTinhToanBoiThuong.getControl("doi_tuong").val(),
            vu_tt: val
        }
        _frmKhauTru.getControl("tien_ktru_tien_bh").setValue("0");
        ESUtil.genHTML("tblKhauTruTemplate", "tblKhauTru", { danh_sach: [] });
        _service.layKhauTru(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info.vu_tt != null) {
                _frmKhauTru.getControl("tien_ktru_tien_bh").setValue(ESUtil.formatMoney(res.data_info.vu_tt.tien_ktru_tien_bh));
            }
            ESUtil.genHTML("tblKhauTruTemplate", "tblKhauTru", { danh_sach: res.data_info.ktru });
        });
    });
    _frmTaoNoiDung.getControl('nv').addEventChange(val => {
        var arr_nv = arrNghiepVu.where(n => n.nv == val);
        _frmTaoNoiDung.getControl("pm").setDataSource(arr_nv, "ten", "ma", "Chọn phần mềm", "");
    });
    //_frmKhauTruPA.getControl("vu_tt").addEventChange(val => {
    //    var obj = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        so_id_pa: _frmTinhToanBoiThuongPA.getControl("so_id_pa").val(),
    //        vu_tt: val
    //    }
    //    _frmKhauTruPA.getControl("tien_ktru_tien_bh").setValue("0");
    //    ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: [] });
    //    _service.layKhauTruPA(obj).then(res => {
    //        if (res.state_info.status !== "OK") {
    //            _notifyService.error(res.state_info.message_body);
    //            return;
    //        }
    //        if (res.data_info.vu_tt != null) {
    //            _frmKhauTruPA.getControl("tien_ktru_tien_bh").setValue(ESUtil.formatMoney(res.data_info.vu_tt.tien_ktru_tien_bh));
    //        }
    //        ESUtil.genHTML("tblKhauTruPATemplate", "tblKhauTruPA", { danh_sach: res.data_info.ktru });
    //    });
    //});
    _frmTaoNoiDung.getControl('pm').addEventChange(val => {
        var arr_nv_ct = arrNV_CT.where(n => n.pm == val);
        _frmTaoNoiDung.getControl("nv_ct").setDataSource(arr_nv_ct, "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
    });
    _frmSuaGCN_BT.getControl("hang_xe").addEventChange(val => {
        var arrHieuXe = objDanhMuc.hieu_xe.where(n => n.hang_xe === val);
        _frmSuaGCN_BT.getControl("hieu_xe").setDataSource(arrHieuXe, "ten", "ma", "Chọn hiệu xe", "");
    });
    _frmCarCompensationAddBenefit.getControl("tien_chua_vat").change(function () {
        var tien_chua_vat = parseFloat(_frmCarCompensationAddBenefit.getControl("tien_chua_vat").val().replace(/[^0-9]+/g, ''));
        var tien_thue = parseFloat(_frmCarCompensationAddBenefit.getControl("tien_thue").val().replace(/[^0-9]+/g, ''));
        if (tien_chua_vat == undefined || tien_chua_vat == null || tien_chua_vat == "") {
            tien_chua_vat = 0;
        }
        if (tien_thue == undefined || tien_thue == null || tien_thue == "") {
            tien_thue = 0;
        }
        var tien = tien_chua_vat + tien_thue;
        _frmCarCompensationAddBenefit.getControl("tien").setValue(ESUtil.formatMoney(tien));
    });
    _frmCarCompensationAddBenefit.getControl("tien_thue").change(function () {
        var tien_chua_vat = parseFloat(_frmCarCompensationAddBenefit.getControl("tien_chua_vat").val().replace(/[^0-9]+/g, ''));
        var tien_thue = parseFloat(_frmCarCompensationAddBenefit.getControl("tien_thue").val().replace(/[^0-9]+/g, ''));
        if (tien_chua_vat == undefined || tien_chua_vat == null || tien_chua_vat == "") {
            tien_chua_vat = 0;
        }
        if (tien_thue == undefined || tien_thue == null || tien_thue == "") {
            tien_thue = 0;
        }
        var tien = tien_chua_vat + tien_thue;
        _frmCarCompensationAddBenefit.getControl("tien").setValue(ESUtil.formatMoney(tien));
    });
    _frmCarClaimCompareDataGPLX.getControl("vu_tt").addEventChange(val => {
        var vu_tt_model = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma == val).firstOrDefault();
        var json_ocr = JSON.parse(_frmCarClaimCompareDataGPLX.getControl("json_ocr").val());
        var arr = [];
        var ho_ten = {
            ma_nd: "HO_TEN",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "HỌ TÊN LÁI XE",
            nd_goc: vu_tt_model.ten_lxe == null || vu_tt_model.ten_lxe == '' ? 'Chưa có dữ liệu' : vu_tt_model.ten_lxe,
            nd_ocr: json_ocr.ho_ten == null || json_ocr.ho_ten == '' ? 'Chưa có dữ liệu' : json_ocr.ho_ten,
            so_sanh: false
        };
        ho_ten.so_sanh = ESUtil.compareText(ho_ten.nd_goc, ho_ten.nd_ocr);
        var so_gplx = {
            ma_nd: "SO_GPLX",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "SỐ GPLX",
            nd_goc: vu_tt_model.gplx_so == null || vu_tt_model.gplx_so == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_so,
            nd_ocr: json_ocr.so == null || json_ocr.so == '' ? 'Chưa có dữ liệu' : json_ocr.so,
            so_sanh: false
        };
        so_gplx.so_sanh = ESUtil.compareText(so_gplx.nd_goc, so_gplx.nd_ocr);
        var hang = {
            ma_nd: "HANG",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "HẠNG",
            nd_goc: vu_tt_model.gplx_hang == null || vu_tt_model.gplx_hang == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_hang,
            nd_ocr: json_ocr.hang == null || json_ocr.hang == '' ? 'Chưa có dữ liệu' : json_ocr.hang,
            so_sanh: false
        };
        hang.so_sanh = ESUtil.compareText(hang.nd_goc, hang.nd_ocr);
        var ngay_cap = {
            ma_nd: "NGAY_CAP",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "NGÀY CẤP",
            nd_goc: vu_tt_model.gplx_hieu_luc == null || vu_tt_model.gplx_hieu_luc == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_hieu_luc,
            nd_ocr: json_ocr.ngay_cap == null || json_ocr.ngay_cap == '' ? 'Chưa có dữ liệu' : json_ocr.ngay_cap,
            so_sanh: false
        };
        ngay_cap.so_sanh = ESUtil.compareStringDate(ngay_cap.nd_goc, ngay_cap.nd_ocr);
        var ngay_het_han = {
            ma_nd: "NGAY_HET_HAN",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "NGÀY HẾT HẠN",
            nd_goc: vu_tt_model.gplx_het_han == null || vu_tt_model.gplx_het_han == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_het_han,
            nd_ocr: json_ocr.ngay_het_han == null || json_ocr.ngay_het_han == '' ? 'Chưa có dữ liệu' : json_ocr.ngay_het_han,
            so_sanh: false
        };
        ngay_het_han.so_sanh = ESUtil.compareStringDate(ngay_het_han.nd_goc, ngay_het_han.nd_ocr);
        arr.push(ho_ten);
        arr.push(so_gplx);
        arr.push(hang);
        arr.push(ngay_cap);
        arr.push(ngay_het_han);
        ESUtil.genHTML("modalCarClaimCompareDataGPLX_SoSanh_Template", "modalCarClaimCompareDataGPLX_SoSanh", { data: arr });
    });
    _frmCarClaimCompareDataDangKiem.getControl("vu_tt").addEventChange(val => {
        var vu_tt_model = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma == val).firstOrDefault();
        var json_ocr = JSON.parse(_frmCarClaimCompareDataDangKiem.getControl("json_ocr").val());
        var arr = [];
        var so_dang_kiem = {
            ma_nd: "SO_DANG_KIEM",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "SỐ ĐĂNG KIỂM",
            nd_goc: vu_tt_model.dangkiem_so == null || vu_tt_model.dangkiem_so == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_so,
            nd_ocr: json_ocr.so_seri == null || json_ocr.so_seri == '' ? 'Chưa có dữ liệu' : json_ocr.so_seri,
            so_sanh: false
        };
        so_dang_kiem.so_sanh = ESUtil.compareText(so_dang_kiem.nd_goc, so_dang_kiem.nd_ocr);
        var ngay_cap = {
            ma_nd: "NGAY_CAP",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "NGÀY CẤP",
            nd_goc: vu_tt_model.dangkiem_hieu_luc == null || vu_tt_model.dangkiem_hieu_luc == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_hieu_luc,
            nd_ocr: json_ocr.ngay_cap == null || json_ocr.ngay_cap == '' ? 'Chưa có dữ liệu' : json_ocr.ngay_cap,
            so_sanh: false
        };
        ngay_cap.so_sanh = ESUtil.compareStringDate(ngay_cap.nd_goc, ngay_cap.nd_ocr);
        var ngay_het_han = {
            ma_nd: "NGAY_HET_HAN",
            vu_tt: vu_tt_model.ma,
            noi_dung_so_sanh: "NGÀY HẾT HẠN",
            nd_goc: vu_tt_model.dangkiem_het_han == null || vu_tt_model.dangkiem_het_han == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_het_han,
            nd_ocr: json_ocr.ngay_het_han == null || json_ocr.ngay_het_han == '' ? 'Chưa có dữ liệu' : json_ocr.ngay_het_han,
            so_sanh: false
        };
        ngay_het_han.so_sanh = ESUtil.compareStringDate(ngay_het_han.nd_goc, ngay_het_han.nd_ocr);
        arr.push(so_dang_kiem);
        arr.push(ngay_cap);
        arr.push(ngay_het_han);
        ESUtil.genHTML("modalCarClaimCompareDataDangKiem_SoSanh_Template", "modalCarClaimCompareDataDangKiem_SoSanh", { data: arr });
    });
    _frmOCRHoaDonChungTu.getControl("hoa_don").addEventChange(val => {
        soSanhDuLieuOCRHoaDon(val);
    });
    _btnLuuTrinhDuyet.click(function () {
        var json = _frmModalTrinhDuyet.getJsonData();
        //json.ma_doi_tac = json.dvi;
        json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        json.nv = nv_trinh;
        json.loai = loai_trinh;
        //json.nv = "XE";
        //json.loai = "XE_TRINH_DUYET_BOI_THUONG";
        json.ma_chi_nhanh_duyet = ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh;
        json.id_template = "gridTrinhDuyet_template";
        json.id_grid = "gridTrinhDuyet";
        json.ma_doi_tac_duyet = _frmModalTrinhDuyet.getControl("ma_doi_tac_duyet").val();
        luuTrinhDuyet(json);
    });
    _frmThemHMTT.getControl("loai").addEventChange(val => {
        $("#frmThemHMTT_hang_muc").val("");
        $("#frmThemHMTT_hang_muc").attr("complete-val", "");
        if (val == "TL") {
            ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_tai_lieu, "ma", "ten", 50, "280px");
        }
        if (val == "TT") {
            var ds_hang_muc = ho_so_chi_tiet.data_info.hang_muc.select(n => { var objTemp = { ma: n.hang_muc, ten: n.ten_hang_muc }; return objTemp; });
            ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), ds_hang_muc, "hang_muc", "ten_hang_muc", 50, "280px");
        }
    });
    _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").addEventChange(val => {
        $("#tableChiTietTonThatGDTNDS_TAI_SAN").addClass("d-none");
        $("#tableChiTietTonThatGDTNDS_TAI_SAN_XE").addClass("d-none");
        $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").addClass("d-none");
        if (val == "XE") {
            $("#tableChiTietTonThatGDTNDS_TAI_SAN_XE").removeClass("d-none");
            $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").removeClass("d-none");
            var ds_tsan_xe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
            _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setDataSource(ds_tsan_xe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
            if (ds_tsan_xe.length > 0) {
                _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setValue(ds_tsan_xe[0].so_id_doi_tuong);
                _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").trigger("select2:select");
            }
        }
        if (val == "KHAC") {
            $("#tableChiTietTonThatGDTNDS_TAI_SAN").removeClass("d-none");
            var lh_nv = $("#navDanhGiaGiamDinh li.active").attr("data-lhnv");
            var doi_tuong = $("#navDanhGiaGiamDinh li.active").attr("data-doi-tuong");
            var nhom = $("#navDanhGiaGiamDinh li.active").attr("data-nhom");
            nhapChiTietNghiepVu(doi_tuong, val, lh_nv, 0, res => {
                ESUtil.genHTML("modalChiTietTonThatGDTNDS_TAI_SANTemplate", "modalChiTietTonThatGDTNDS_TAI_SAN", { danh_sach: res.data_info }, () => {
                    var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_tt));
                    $("#modalChiTietTonThatTNDS_TAI_SANTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
                });
            });
        }
    });
    _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").addEventChange(val => {
        var lh_nv = $("#navDanhGiaGiamDinh li.active").attr("data-lhnv");
        var doi_tuong = $("#navDanhGiaGiamDinh li.active").attr("data-doi-tuong");
        var nhom = $("#navDanhGiaGiamDinh li.active").attr("data-nhom");
        var so_id_doi_tuong = _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").val();
        nhapChiTietNghiepVu(doi_tuong, "XE", lh_nv, so_id_doi_tuong, res => {
            ESUtil.genHTML("modalChiTietTonThatGDVCXTemplate", "modalChiTietTonThatGDTNDS_TAI_SAN_XE", { danh_sach: res.data_info }, () => {
                var tong_tien_tt = res.data_info.sum(n => parseFloat(n.tien_gd));
                $("#modalChiTietTonThatGDTNDS_TAI_SAN_XETongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
            });
        });
    });   
    _frmTinhToanBoiThuong.getControl("loai_ts").addEventChange(val => {
        onChangeLoaiTS(val);
    });
    _frmTinhToanBoiThuong.getControl("doi_tuong").addEventChange(val => {
        $(".divTinhToanItem").addClass("d-none");
        $(".tinhToanTaiSan").addClass("d-none");
        $(".tinhToanXE").addClass("d-none");
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: $("#navNghiepVuTab4 li.active").attr("data-lhnv"),
            so_id_doi_tuong: val
        }
        var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv).firstOrDefault();
        if (ho_so_chi_tiet.data_info.lh_nv.length == 0 && objLHNV == null) {
            objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
        }
        var chi_phi_khac = ho_so_chi_tiet.data_info.chi_phi_khac.where(n => n.lh_nv == obj.lh_nv).sum(n => n.so_tien);
        _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
        _frmTinhToanBoiThuong.getControl("khau_tru").setValue("K");
        _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(true);
        _frmTinhToanBoiThuong.getControl("tl_thue").setValue("THM");
        _frmTinhToanBoiThuong.getControl("thue").setValue("0");
        _frmTinhToanBoiThuong.getControl("giam_tru_khac").setValue("0");
        _frmTinhToanBoiThuong.getControl("chi_phi_khac").setValue(ESUtil.formatMoney(chi_phi_khac));

        /*Tài sản là xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $(".tinhToanXE").removeClass("d-none");
            $(".tinhToanTaiSan").removeClass("d-none");
            var nguyen_nhan_giam_tru = objDanhMuc.dmuc_chung.where(n => n.nhom == "NGUYEN_NHAN_GIAM_TRU");
            ESUtil.genHTML("divNguyenNhanTemplate", "divNguyenNhan", { danh_sach: nguyen_nhan_giam_tru });
            ESUtil.genHTML("divDKBS_template", "divDKBS", { dkbs: ho_so_chi_tiet.data_info.dkbs });
            _frmTinhToanBoiThuong.getControl("khau_tru").readOnly(false);
            _frmTinhToanBoiThuong.getControl("mien_thuong").setValue("0");
            _frmTinhToanBoiThuong.getControl("khau_tru").setValue("K");
            $("#divTinhToanVCX").removeClass("d-none");
            if (obj.lh_nv == "") {
                return;
            }
        }

        _service.layHangMucLHNV(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var tong_nv = res.data_info.tong_nv;
            _frmTinhToanBoiThuong.getControl("so_vu").setValue(tong_nv.so_vu);
            _frmTinhToanBoiThuong.getControl("so_vu_tt").setValue(tong_nv.so_vu_tt);
            if (tong_nv.pt_ad_thue_mien_thuong == "THM") {
                _frmTinhToanBoiThuong.getControl("tl_thue").setValue("THM");
            }
            else {
                _frmTinhToanBoiThuong.getControl("tl_thue").setValue(tong_nv.tl_thue);
            }
            _frmTinhToanBoiThuong.getControl("so_id_doi_tuong").setValue(tong_nv.so_id_doi_tuong);
            _frmTinhToanBoiThuong.getControl("thue").setValue(tong_nv.thue);
            _frmTinhToanBoiThuong.getControl("giam_tru_khac").setValue(ESUtil.formatMoney(tong_nv.tien_giam_tru_khac));
            _frmTinhToanBoiThuong.getControl("khau_tru").setValue(tong_nv.khau_tru);
            _frmTinhToanBoiThuong.getControl("mien_thuong").setValue(tong_nv.tien_mien_thuong_sau_thue);
            _frmTinhToanBoiThuong.getControl("mien_thuong_vutt").setValue(tong_nv.tien_mien_thuong_sau_thue / tong_nv.so_vu_tt);
            $("#danh_gia").val(tong_nv.danh_gia);
            $("#de_xuat").val(tong_nv.de_xuat);

            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                ESUtil.genHTML("tblTinhToanVCXTemplate", "tblTinhToanVCX", { tinh_toan_bt: res.data_info.data }, () => {
                    var data = res.data_info.data;

                    $(".tblTinhToanVCX_T").addClass("d-none");
                    $(".tblTinhToanVCX_S").removeClass("d-none");
                    if (data != undefined && data != null && data.length > 0 &&
                        data[0].lh_tt_giam_gia != undefined && data[0].lh_tt_giam_gia != null && data[0].lh_tt_giam_gia == "T") {
                        $(".tblTinhToanVCX_T").removeClass("d-none");
                        $(".tblTinhToanVCX_S").addClass("d-none");
                    }
                    $("#tblTinhToanVCXSoLuongHM").html(data.length + " hạng mục");
                    var giaDuyetVtu = 0;
                    var giaDuyetNC = 0;
                    var giaDuyetKhac = 0;
                    var giaDuyet = 0;
                    var giamGia = 0;
                    var tienKhauTru = 0;
                    var tienThue = 0;
                    for (var i = 0; i < data.length; i++) {
                        giaDuyetVtu += parseFloat(data[i].gia_vtu_duyet);
                        giaDuyetNC += parseFloat(data[i].gia_nhan_cong_duyet);
                        giaDuyetKhac += parseFloat(data[i].gia_khac_duyet);
                        giaDuyet += parseFloat(data[i].gia_duyet);
                        giamGia += parseFloat(data[i].giam_gia);
                        tienKhauTru += parseFloat(data[i].tien_ktru_tien_bh);
                        tienThue += parseFloat(data[i].tien_thue);
                    }

                    $("#tblTinhToanVCXTienDuyetVtu").html(ESUtil.formatMoney(giaDuyetVtu));
                    $("#tblTinhToanVCXTienDuyetNC").html(ESUtil.formatMoney(giaDuyetNC));
                    $("#tblTinhToanVCXTienDuyetKhac").html(ESUtil.formatMoney(giaDuyetKhac));
                    $("#tblTinhToanVCXTienDuyetGia").html(ESUtil.formatMoney(giaDuyet));
                    $("#tblTinhToanVCXTienDuyetGiamGia").html(ESUtil.formatMoney(giamGia));
                    $("#tblTinhToanVCXTienDuyetGiamGia_T").html(ESUtil.formatMoney(giamGia));
                    $("#tblTinhToanVCXTienKhauTru").html(ESUtil.formatMoney(tienKhauTru));
                    $("#tblTinhToanVCXThue").html(ESUtil.formatMoney(tienThue));
                    //tinhToan();
                });
            }
        });
    });
    $("#btnXoaInputHangMucBoSung").click(function () {
        _frmHangMucBoSung.getControl("hang_muc").val("");
        _frmHangMucBoSung.getControl("hang_muc").removeAttr("complete-val");
        _frmHangMucBoSung.getControl("hang_muc").trigger("click");
    });
    $("#vu_tt").change(function () {
        var maVuTonThat = $(this).val();
        var json = ho_so_chi_tiet.data_info;
        var val = json.ds_vu_tt.where(n => n.ma == maVuTonThat);
        ESUtil.genHTML("CarCompensationContentStep1Table2_template", "CarCompensationContentStep1Table2", val[0]);
    });
    $("#lan_gd").change(function () {
        var maLanGiamDinh = $(this).val();
        var json = ho_so_chi_tiet.data_info;
        var val = json.ds_lan_gd.where(n => n.ma == maLanGiamDinh);
        ESUtil.genHTML("CarCompensationContentStep1Table3_template", "CarCompensationContentStep1Table3", val[0]);
        //lấy danh sách người tham gia giám định
        var data = {
            "arrNguoiGiamDinh": json.ds_nguoi_tham_gia.where(n => n.lan_gd == maLanGiamDinh)
        };
        ESUtil.genHTML("CarCompensationContentStep1Table4_template", "CarCompensationContentStep1Table4", data);
    });
    $("#btnNhanHoSo").click(function () {
        _notifyService.confirm("Bạn có muốn nhận hồ sơ bồi thường ?", "", val => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;

            _service.nhanHoSo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.data_info.ho_so.ngay_nhan_hs = new Date().ddmmyyyy().dateToNumber();
                ganTrangThaiHoSo(res);
                _notifyService.success("Nhận hồ sơ thành công");
                getPaging(1);
            });
        });
    });
    $("#btnChuyenLaiHoSo").click(function () {
        _notifyService.confirm("Bạn có muốn trả hồ sơ bồi thường ?", "", val => {
            var obj = _frmThongTinGiamDinh.getJsonData();

            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = "BT";

            _service.traHoSo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ganTrangThaiHoSo(res);
                _notifyService.success("Trả hồ sơ thành công");
                getPaging(1);
            });
        });
    });
    $("#btnLuuHMTTPhu").click(function () {
        if (_frmThemHMTTPhu.isValid()) {
            var json = _frmThemHMTTPhu.getJsonData();
            _service.luuHangMucTonThat(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var ma_doi_tac = _frmThemHMTTPhu.getControl("ma_doi_tac").getValue();
                var so_id = _frmThemHMTTPhu.getControl("so_id").getValue();
                reloadPhuongAnKhacPhuc(ma_doi_tac, so_id);
                _notifyService.success("Lưu thông tin đại diện giám định thành công");
            });
        }
    });
    $("#btnLuuDongHMTTPhu").click(function () {
        if (_frmThemHMTTPhu.isValid()) {
            var json = _frmThemHMTTPhu.getJsonData();
            _service.luuHangMucTonThat(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var ma_doi_tac = _frmThemHMTTPhu.getControl("ma_doi_tac").getValue();
                var so_id = _frmThemHMTTPhu.getControl("so_id").getValue();
                reloadPhuongAnKhacPhuc(ma_doi_tac, so_id);
                _notifyService.success("Lưu thông tin đại diện giám định thành công");
            });
            $("#modalThemHMTTPHU").modal("hide");
        }
    });
    $("#btnLuuGara").click(function () {
        if (_frmThemGara.isValid()) {
            var json = _frmThemGara.getJsonData();
            _service.themGaraBaoGia(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                _notifyService.success("Thêm/Sửa gara báo giá thành công");
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res1 => {
                    ho_so_chi_tiet = res1;
                });
            });
            $("#themBaoGia").hide();
        }
    });
    $("#btnLuuBaoGiaGara").click(function () {
        $("#inputTimKiemHangMucBaoGia").val("");
        $("#inputTimKiemHangMucBaoGia").trigger("keyup");
        var json = {};
        json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        json.gara = $("#garaBaoGia tr.selected").attr("data-ma-gara");
        json.bt_gara = $("#garaBaoGia tr.selected").attr("data-bt-gara");
        json.so_id_doi_tuong = $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong");
        json.arr = html2json();

        _service.suaGaraBaoGiaCT(json).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
            ganTrangThaiHoSo(res);
            var objGetDetail = { ma_doi_tac: json.ma_doi_tac, so_id: json.so_id };
            _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                tongHopTienPhuongAn();
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", resDetail.data_info);
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT[data-gara='" + json.gara + "'][data-so_id_doi_tuong='" + json.so_id_doi_tuong + "'][data-bt_gara='" + json.bt_gara + "']").click();
                });
                $('#btnKetThucBaoGia').trigger('click');

            });
        });
    });
    $("#btnLuuHangMucCtiet").click(function () {
        var lh_nv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
        var json = {};
        json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        json.lh_nv = lh_nv;
        json.hang_muc = ho_so_chi_tiet.data_info.hang_muc.where(n => n.lh_nv == lh_nv).firstOrDefault().hang_muc;
        var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
        /*Hàng hóa trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            json.data = layDuLieuBangDGHangHoa();
        }
        /*Người ngồi trên xe*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
            json.data = layDuLieuBangDGNNTX();
        }
        /*TNDS về người*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            json.data = layDuLieuBangDGTNDSNguoi();
        }
        /*TNDS về tài sản*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            json.data = layDuLieuBangDGTNDSTaiSan();
        }

        if (objLHNV.doi_tuong != DOI_TUONG_TT.XE) {
            _service.luuChiTietHangMuc(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin thành công");
                var objGetDetail = { ma_doi_tac: json.ma_doi_tac, so_id: json.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    tongHopTienPhuongAn();
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", resDetail.data_info);
                });
            });
        }
    });
    $("#btnDuyetBaoGiaGara,#btnDuyetPAVCX").click(function () {
        var arrTable = html2json();
        _notifyService.confirmApprove("Bạn có chắc chắn muốn duyệt phương án?", type => {
            if (_frmSelectedGara.isValid()) {
                var json = _frmSelectedGara.getJsonData();
                json.arr = arrTable;
                json.so_id = _frmThemGara.getControl("so_id").getValue();
                json.ma = "TEMPLATE_EMAIL_PDBG";
                json.ma_mau_in = "ESCS_DUYET_PASC";
                json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
                json.pm = CONSTANT_PM;
                json.gui_email = type == "PHE_DUYET_VA_GUI_EMAIL";

                _service.duyetGaraBaoGiaCT(json).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    var ma_doi_tac = _frmThemHMTTPhu.getControl("ma_doi_tac").getValue();
                    reloadPhuongAnKhacPhuc(ma_doi_tac, json.so_id);

                    var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                        ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                        loadGaraBaoGia(resCT => {
                            $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                        });
                        anHienNutDuyetPA("C");

                        var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                        xemChiTietDTTonThat(lhnv);
                    });
                    getPaging(1);
                    _notifyService.success("Duyệt báo giá thành công");
                });
            }
        });
    });
    $("#btnHuyDuyetBaoGiaGara,#btnHuyDuyetPAVCX").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy duyệt phương án?", "", val => {
            var arrTable = html2json();
            if (_frmSelectedGara.isValid()) {
                var json = _frmSelectedGara.getJsonData();
                json.arr = arrTable;
                json.so_id = _frmThemGara.getControl("so_id").getValue();
                json.ma_mau_in = "ESCS_DUYET_PASC";
                json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
                json.pm = CONSTANT_PM;
                _service.huyDuyetGaraBaoGiaCT(json).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }

                    var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                        ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                        loadGaraBaoGia(resCT => {
                            $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                        });
                        anHienNutDuyetPA("C");
                        var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                        xemChiTietDTTonThat(lhnv);
                    });
                    var ma_doi_tac = _frmThemHMTTPhu.getControl("ma_doi_tac").getValue();
                    reloadPhuongAnKhacPhuc(ma_doi_tac, json.so_id);
                    getPaging(1);
                    _notifyService.success("Hủy duyệt thành công");

                });
            }
        });
    });
    $('#CarCompensationEbill').on('show.bs.modal', function (e) {
        loadGaraBaoGia(resCT => {
            $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
        });
    });
    $('#btnCarCompensationContentStep4_save').click(function () {
        $(".inputSearchHangMucTinhToan").val("");
        $(".inputSearchHangMucTinhToan").trigger("keyup");
        luuTinhToanBoiThuong(res => {
            var lhnv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
            xemTinhToanNghiepVu(lhnv);
            _notifyService.success("Lưu tính toán bồi thường thành công");
        });
    });
    $('#btnCarCompensationContentStep4_luuVaTrinh').click(function () {
        $(".inputSearchHangMucTinhToan").val("");
        $(".inputSearchHangMucTinhToan").trigger("keyup");
        luuTinhToanBoiThuong(res => {
            _notifyService.success("Lưu tính toán bồi thường thành công");
            $('#btnCarCompensationContentStep4_FwdApproval').trigger('click');
        });
    });
    $("#btnTinhToan").click(function () {
        tinhToan();
    });
    $("#btnXemViTriChupAnh").click(function () {
        var kinh_do = _frmToaDoAnh.getControl("kinh_do").val();
        var vi_do = _frmToaDoAnh.getControl("vi_do").val();
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });
    $('#CarCompensationModalLabel_fullsreen').on('click', function () {
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        } else {
            $('#CarCompensationContentStep4Tab1 select.select2').select2({
                dropdownParent: $('#CarCompensationContentStep4Tab1')
            });
            $('#CarCompensationContentStep4Tab1').fullscreen();
        }
    });
    $("#frmCarCompensationAddInvoice input[name='tien']").change(function () {
        chungTuTinhTien();
    });
    $("#frmCarCompensationAddInvoice input[name='thue']").change(function () {
        var so_tien = parseInt(_frmCarCompensationAddInvoice.getControl("tien").getValue());
        var thue = parseInt(_frmCarCompensationAddInvoice.getControl("thue").getValue());
        var tong_cong = so_tien + thue;
        _frmCarCompensationAddInvoice.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });
    $("#btnCarCompensationAddInvoice_save").click(function () {
        var data = _frmCarCompensationAddInvoice.getJsonData();
        if (_frmCarCompensationAddInvoice.isValid()) {
            _service.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmCarCompensationAddInvoice.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnCarCompensationAddInvoice_save_close").click(function () {
        var data = _frmCarCompensationAddInvoice.getJsonData();
        if (_frmCarCompensationAddInvoice.isValid()) {
            _service.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                $("#CarCompensationAddInvoice").modal("hide");
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnCarCompensationAddBenefit_save").click(function () {
        var data = _frmCarCompensationAddBenefit.getJsonData();
        if (_frmCarCompensationAddBenefit.isValid()) {
            data.loai = "TH";
            _service.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmCarCompensationAddBenefit.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnCarCompensationAddBenefit_save_close").click(function () {
        var data = _frmCarCompensationAddBenefit.getJsonData();
        if (_frmCarCompensationAddBenefit.isValid()) {
            data.loai = "TH";
            _service.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                $("#CarCompensationAddBenefit").modal("hide");
                _frmCarCompensationAddBenefit.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnCarCompensationAdvance_save").click(function () {
        luuTamUng();
    });
    $("#btnCarCompensationAdvance_save_close").click(function () {
        luuTamUng(res => {
            _modalCarCompensationAdvance.hide();
        });
    });
    $("#btnCarCompensationContentStep3_FwdApproval_1, #btnTrinhPAVCX").click(function () {
        var obj = {
            ma_doi_tac: _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue(),
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
            nghiep_vu: "XE",
            pm: CONSTANT_PM,
            remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
            create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
        }
        _modalTrinhDuyetService.show(obj, (type, res) => {
            ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
            var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
            if (trang_thai != null) {
                ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
            }

            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        });
    });
    $("#btnCarCompensationContentStep4_Guarantee").click(function () {
        var obj = {
            ma_doi_tac: _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue(),
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            loai_trinh: "XE_TRINH_DUYET_BAO_LANH",
            nghiep_vu: "XE",
            ma_mau_in: "ESCS_TO_TRINH_BAO_LANH",
            pm: CONSTANT_PM
        }
        obj.ma = "TEMPLATE_EMAIL_TRINH_BAO_LANH";
        _modalTrinhDuyetService.show(obj);
    });
    $("#btnCarCompensationContentStep4_FwdApproval").click(function () {
        var danh_gia = $("#divInputBoiThuongVienDanhGia").val();
        if (danh_gia == "Bồi thường viên chưa đánh giá") {
            _notifyService.error("Vui lòng đánh giá trước khi trình");
            return;
        }
        if (!_frmDanhGiaDeXuat.isValid()) {
            _notifyService.error("Bạn chưa nhận xét/đề xuất bồi thường");
            return;
        }

        var obj = {
            ma_doi_tac: _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue(),
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            loai_trinh: "XE_TRINH_DUYET_BOI_THUONG",
            nghiep_vu: "XE",
            remove_file: "ESCS_TO_TRINH_BOI_THUONG",
            create_file: "ESCS_TO_TRINH_BOI_THUONG",
            hanh_dong: "BOI_THUONG_BAO_LANH",
            pm: CONSTANT_PM
        }
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.remove_file = "OPES_TO_TRINH_BOI_THUONG";
            obj.create_file = "OPES_TO_TRINH_BOI_THUONG";
        }
        _modalTrinhDuyetService.show(obj);
    });
    //$("#chonDKBS").click(function () {
    //    var dkbs = "";
    //    $("#divDKBS .hang_muc_dkbs:checked").each(function () {
    //        if (dkbs == "") {
    //            dkbs = $(this).val();
    //        }
    //        else {
    //            dkbs += "," + $(this).val();
    //        }
    //    });
    //    $(_popoverDKBS.target).attr("data-val", dkbs);
    //    $(_popoverDKBS.target).removeAttr("href");
    //    if (dkbs != "") {
    //        $(_popoverDKBS.target).attr("href", "#");
    //    }
    //    _popoverDKBS.hide();
    //    var lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
    //    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
    //    //Vật chất xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
    //        ganDuLieuTinhToanVCX(_popoverDKBS.target);
    //    }
    //    //Hàng hóa trên xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
    //        ganDuLieuTinhToanHANGHOA(_popoverDKBS.target);
    //    }
    //    //Người ngồi trên xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
    //        ganDuLieuTinhToanNNTX(_popoverDKBS.target);
    //    }
    //    //TNDS về người
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
    //        ganDuLieuTinhToanTNDSNGUOI(_popoverDKBS.target);
    //    }
    //    //TNDS về tài sản
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
    //        ganDuLieuTinhToanTNDSTAISAN(_popoverDKBS.target);
    //    }
    //});
    //$("#chonNguyenNhan").click(function () {
    //    var nguyen_nhan = "";
    //    $("#divNguyenNhan .modalChonNguyenNhanGiamTruItem:checked").each(function () {
    //        if (nguyen_nhan == "") {
    //            nguyen_nhan = $(this).val();
    //        }
    //        else {
    //            nguyen_nhan += "," + $(this).val();
    //        }
    //    });
    //    $(_popoverNguyenNhan.target).attr("data-val", nguyen_nhan);
    //    $(_popoverNguyenNhan.target).removeAttr("href");
    //    if (nguyen_nhan != "") {
    //        $(_popoverNguyenNhan.target).attr("href", "#");
    //    }
    //    _popoverNguyenNhan.hide();
    //    var lh_nv = $("#navNghiepVuTab4 li.active").attr("data-lhnv");
    //    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();
    //    //Vật chất xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
    //        ganDuLieuTinhToanVCX(_popoverNguyenNhan.target);
    //    }
    //    //Hàng hóa trên xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
    //        ganDuLieuTinhToanHANGHOA(_popoverNguyenNhan.target);
    //    }
    //    //Người ngồi trên xe
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
    //        ganDuLieuTinhToanNNTX(_popoverNguyenNhan.target);
    //    }
    //    //TNDS về người
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
    //        ganDuLieuTinhToanTNDSNGUOI(_popoverNguyenNhan.target);
    //    }
    //    //TNDS về tài sản
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
    //        ganDuLieuTinhToanTNDSTAISAN(_popoverNguyenNhan.target);
    //    }
    //});
    $("#btnLuuAddHoSoGiayTo").click(function () {
        _carClaimCommon.luuBoSungHoSoGiayTo(ho_so_chi_tiet.data_info.ho_so.so_id, CONSTANT_PM, res => {
            layLaiDsHoSoGiayTo();
        });
    });
    $("#btnLuuAddHoSoGiayToDong").click(function () {
        _carClaimCommon.luuBoSungHoSoGiayTo(ho_so_chi_tiet.data_info.ho_so.so_id, CONSTANT_PM, res => {
            layLaiDsHoSoGiayTo();
            $(".popover.popover-x").hide();
        });
    });
    $("#btnCloseAddHoSoGiayTo").click(function () {
        $(".popover.popover-x").hide();
    });
    $("#btnUpLoadAnhDGTT").click(function () {
        _uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            type: "image",
            pm: CONSTANT_PM
        });
        _uploadService.showPupup();
    });
    $("#btnXoaLoadAnhDGTT").click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", null, val => {
            _service.xoaAnhHoSoGiamDinh({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal, pm: CONSTANT_PM }).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(response => {
                    if (response !== undefined && response !== null && response.state_info.status === "NotOK") {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Xóa ảnh giám định thành công.");
                });
                layLaiDsHoSoGiayTo();
            });
        });
    });
    $("#btnViewAnhListDGTT").click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        var vutt = _frmDienBienTonThat.getControl("vu_tt").val();
        _frmThemHMTT.getControl("loai").setValue("TL");
        $("#frmThemHMTT_hang_muc").val("");
        $("#frmThemHMTT_hang_muc").attr("complete-val", "");
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_tai_lieu, "ma", "ten", 50, "280px");
        _modalThemHMTT.show();
    });
    $("#btnLuuHMTT").click(function () {
        luuPhanHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanHangMuc(() => {
            _modalThemHMTT.hide();
        });
    });
    $("#btnDownLoadAnhDGTT").click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (arrVal.length === 1) {
            _service.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "anh_ton_that_" + new Date().toDateString() + extension);
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
            _service.taiFileAnhTonThatZip({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });
    $('#btnCarCompensationContentStep3_print, #btnCarCompensationContentStep4_print').bind("click", function () {
        var sourceMauIn = [
            { ma: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA", ten: "Tờ trình phương án sửa chữa" },
            { ma: "ESCS_TB_DUYET_PHUONG_AN", ten: "Thông báo duyệt phương án" },
            { ma: "ESCS_TO_TRINH_BOI_THUONG", ten: "Tờ trình bồi thường" },
            { ma: "ESCS_THONG_BAO_DUYET_BAO_LANH", ten: "Thông báo duyệt bảo lãnh" },
            { ma: "ESCS_THONG_BAO_BOI_THUONG", ten: "Thông báo bồi thường" },
            { ma: "ESCS_GIAY_DE_NGHI_CHUYEN_TIEN", ten: "Giấy đề nghị chuyển tiền" },
            { ma: "ESCS_TO_TRINH_TU_CHOI_BT", ten: "Tờ trình từ chối bồi thường" },
            { ma: "ESCS_TB_TU_CHOI_TB", ten: "Thông báo từ chối bồi thường" }
        ];
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_DE_XUAT_PHUONG_AN_SC", ten: "OPES - Tờ trình đề xuất phương án sửa chữa" },
                { ma: "OPES_TO_TRINH_BOI_THUONG", ten: "OPES - Tờ trình bồi thường" },
                { ma: "OPES_TB_BOI_THUONG_BAI_NAI", ten: "OPES - Thông báo bồi thường" },
                { ma: "OPES_GIAY_BAO_LANH_THANH_TOAN", ten: "OPES - Giấy bảo lãnh thanh toán" },
                { ma: "OPES_BANG_KE_BAN_GIAO_PHU_TUNG", ten: "OPES - Bảng kê bàn giao phụ tùng thay thế" },
                { ma: "OPES_TO_TRINH_TU_CHOI_BT", ten: "OPES - Tờ trình từ chối bồi thường" },
                { ma: "OPES_TB_TU_CHOI_TB", ten: "OPES - Thông báo từ chối bồi thường" }
            ];
        };
        _modalDocumentService.setDataSource(sourceMauIn);
        _modalDocumentService.onClickIem = function (ma_mau_in) {
            _commonService.InPdf({
                ma_mau_in: ma_mau_in,
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
                so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt
            }, "#modalDocumentContents").then(response => {
                _modalDocumentService.viewFile(response);
            });
        }
        _modalDocumentService.show("ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA");
        if (ESCS_MA_DOI_TAC == "OPES") {
            _modalDocumentService.show("OPES_DE_XUAT_PHUONG_AN_SC");
        }
    });
    $('#btnLuuChuyenNguoiXuLy').click(function () {
        if (_frmChuyenNguoiXuLy.isValid()) {
            _notifyService.confirm("Bạn có chắc chắn chuyển hồ sơ ?", "", val => {
                var obj = _frmChuyenNguoiXuLy.getJsonData();
                obj.pm = CONSTANT_PM;
                _service.chuyenNguoiXuLy(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh = obj.ma_chi_nhanh_moi;
                    _modalChuyenNguoiXuLy.hide();
                    _notifyService.success("Chuyển người xử lý thành công");
                });
            });
        }
    });
    $('#btnLuuHuyHoSo').click(function () {
        if (_frmHuyHoSo.isValid()) {
            _notifyService.confirmDelete("Bạn có chắc chắn muốn hủy hồ sơ này không", "", val => {
                var obj = _frmHuyHoSo.getJsonData();
                obj.pm = CONSTANT_PM;
                _service.huyHoSo(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                        ho_so_chi_tiet = resDetail;
                        bindDataDienBienTonThat(resDetail);
                        ganTrangThaiHoSo(resDetail);
                    });

                    _notifyService.success("Hủy hồ sơ thành công");
                    _modalHuyHoSo.hide();
                    getPaging(1);
                });
            });
        }
    });
    $("#luuKiemTraGiayTo").click(function () {
        var arr = [];
        $('#bodyHoSoGiayToLoi .chkLoi').each(function () {
            var value = $(this).is(':checked') ? 'D' : 'C';
            var jsonObj = {
                'ma_loi': $(this).val(),
                'kq_nsd': value
            }
            arr.push(jsonObj);
        });

        var json = {};
        json.arr = arr;
        json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        json.pm = CONSTANT_PM;
        _service.nhapGiayToLoi(json).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu dữ liệu thành công");
        });
    });
    $('.btnThemBaoGia').inlinePopover({
        target: "#themBaoGia",
        close_on_outside_click: false,
        onBeforeShow: function (source) {
            $('#themBaoGia .popover-title .close').next().html('Thêm gara báo giá');
            var curTime = new Date();
            _frmThemGara.getControl('bt_gara').setValue('');
            _frmThemGara.getControl('gara').setValue('');
            _frmThemGara.getControl('gio_bg').setValue(curTime.getHours() + ":" + curTime.getMinutes());
            var curDate = new Date().ddmmyyyy();
            _frmThemGara.getControl('ngay_bg').val(curDate);
        }
    });
    $('#btnDsGaraHopTac').inlinePopover({
        target: "#dsGaraHopTac",
        close_on_outside_click: false,
        onBeforeShow: function (source) {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            };
            _service.layGaraHopTac(obj).then(res => {
                ESUtil.genHTML("divGaraHopTac_template", "divGaraHopTac", res);
            });
        }
    });
    $("#btnLuuChonGara").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            so_id_doi_tuong: _frmGaraHopTac.getControl("so_id_doi_tuong").val(),
            arr: []
        };
        $('#divGaraHopTac input.item_gara_ht:checked').each(function () {
            var val = $(this).val();
            var item = { gara: val };
            obj.arr.push(item);
        });
        if (obj.arr.length <= 0) {
            _notifyService.error("Bạn chưa chọn gara");
        }
        _service.chonGaraHopTacBaoGia(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadGaraBaoGia(resCT => {
                $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
            });
            _notifyService.success("Cập nhật gara báo giá thành công");
        });
    });
    $("#btnDownloadMauBaoGia").click(function () {
        _service.downloadMauBaoGia(objBaoGiaChiTiet).then(res => {
            ESUtil.convertBase64ToFile(res, "template_bao_gia_chi_tiet.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnDownloadMauBaoGiaDoc").click(function () {
        _service.downloadMauBaoGiaDoc(objBaoGiaChiTiet).then(res => {
            ESUtil.convertBase64ToFile(res, "template_bao_gia_chi_tiet.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#file_upload_bao_gia").change(function () {
        var formFields = document.getElementById('frmThemGara').elements;
        if (formFields['file_upload_bao_gia'].files.length > 0) {
            var formData = _frmThemGara.getFormFileData();
            formData.set("bt_gara", objBaoGiaChiTiet.bt_gara);
            formData.set("gara", objBaoGiaChiTiet.gara);
            formData.set("so_id_doi_tuong", objBaoGiaChiTiet.so_id_doi_tuong);
            _service.uploadBaoGia(formData).then(res => {
                document.getElementById("file_upload_bao_gia").value = "";
                ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", res, () => {
                    bindEventBaoGiaCT();
                });
            });
        }
    });
    $("#file_upload_bao_gia_doc").change(function () {
        var formFields = document.getElementById('frmThemGara').elements;
        if (formFields['file_upload_bao_gia_doc'].files.length > 0) {
            var formData = _frmThemGara.getFormFileData();
            _service.uploadBaoGiaDoc(formData).then(res => {
                document.getElementById("file_upload_bao_gia_doc").value = "";
                /*BT_TEMP = res;*/
                ESUtil.genHTML("bodyDsBaoGiaGaraDocTemplate", "bodyDsBaoGiaGaraDoc", { data: res }, () => {
                    //$("#bodyDsBaoGiaGaraDoc .itemHMVtu").draggable({
                    //    scroll: true,
                    //    start: function (event, ui) {
                    //    },
                    //    drag: function (event, ui) {
                    //    },
                    //    stop: function (event, ui) {
                    //    }
                    //});

                    //$('#bodyDsBaoGiaGaraDoc .ten_hang_muc_nhan_cong').on("dragstart", function (event) {
                    //    var dt = event.originalEvent.dataTransfer;
                    //    dt.setData('Text', $(this).closest("td").index() + " , " + $(this).closest("tr").index()); //save index of td & tr
                    //});
                    //$('#bodyDsBaoGiaGaraDoc td').on("dragenter dragover drop", function (event) {
                    //    event.preventDefault();
                    //    var index_ = $(this).index() //get index of td where we are dropping..
                    //    if (event.type === 'drop') {
                    //        var data = event.originalEvent.dataTransfer.getData('Text');
                    //        var new_data = data.split(",") //get data which is set
                    //        //check if the index of td from where span is taken and td where span is to drop is same..
                    //        if (new_data[0] == index_) {
                    //            var data_before = $(this).find('div.ten_hang_muc_nhan_cong').clone();
                    //            $(this).text("") //clear if any text before...
                    //            de = $(`#bodyDsBaoGiaGaraDoc tr:eq(${new_data[1]}) td:eq(${new_data[0]}) div`).clone() //detach() //get that element
                    //            $(`#bodyDsBaoGiaGaraDoc tr:eq(${new_data[1]}) td:eq(${new_data[0]}) div`).text("");
                    //            $(de[0]).appendTo($(this));
                    //            $(data_before[0]).appendTo($(`#bodyDsBaoGiaGaraDoc tr:eq(${new_data[1]}) td:eq(${new_data[0]})`));
                    //        }
                    //    };
                    //});
                    _modalBaoGiaDoc.show();
                });
            });
        }
    });
    $("#btnXoaInputHangMuc").click(function () {
        _frmThemHMTT.getControl("hang_muc").val("");
        _frmThemHMTT.getControl("hang_muc").removeAttr("complete-val");
        _frmThemHMTT.getControl("hang_muc").trigger("click");
    });
    $("#btnCarCompensationQuotation").click(function () {
        $("#inputTimKiemHangMucBaoGia").val("");
        $("#btnThemHangMucGaraBao").addClass("d-none");
        var tu_dong_gia_de_xuat = ESStorage.getItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT);
        if (tu_dong_gia_de_xuat == "C") {
            $("#chk_tu_dong_de_xuat").prop("checked", true);
        }
        else {
            $("#chk_tu_dong_de_xuat").prop("checked", false);
        }
        loadGaraBaoGia(res => {
            if ($("#garaBaoGia tr").find("td").hasClass("layBaoGiaCT")) {
                $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
            }
            anHienNutDuyetPA(res.out_value.phan_cap);
            var gia_tu_dong = ESStorage.getItemLocalStorage(keyCache.GIA_TU_DONG);
            DS_GIA_TU_DONG = [];
            if (gia_tu_dong == "C") {
                $("#chk_tu_dong_gia_goi_y").prop("checked", true);
                capNhapDSGiaTuDong();
            }
            else {
                $("#chk_tu_dong_gia_goi_y").prop("checked", false);
            }
            $("#CarCompensationQuotation").modal("show");
        });
    });
    $("#btnThemTNDS").click(function () {
        var obj = {};
        ESUtil.appendHTML("modalThemTNDS_template", "modalThemTNDS_body", { lstTNDS: obj });
        $('select.select2').select2();
        $(".remove_config").click(function () {
            _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?", "", () => {
                $(this).closest("tr").remove();
            });
        });
    });
    $("#btnLuuTNDS").click(function () {
        var otArr = [];
        $('#tblCauHinhTNDS tbody tr').each(function (e) {
            var json = { ten: "", dchi: "", sl: "", tinh_trang: "", tien_tthat: "", ghi_chu: "", thuong_tat: "", pttt_tu: 0, pttt_toi: 0, pttt: 0, tien_duyet: 0 };
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    if ($(this).hasClass("ten")) {
                        json["ten"] = $(this).val();
                    }
                    if ($(this).hasClass("dchi")) {
                        json["dchi"] = $(this).val();
                    }
                    if ($(this).hasClass("sl")) {
                        json["sl"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("tien_tthat")) {
                        json["tien_tthat"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("tien")) {
                        json["tien"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("ghi_chu")) {
                        json["ghi_chu"] = $(this).val();
                    }
                });
                $(this).find(".tinh_trang").each(function (el) {
                    json["tinh_trang"] = $(this).val();
                });
                json["thuong_tat"] = "";
            });
            otArr.push(json);
        });
        var obj = _frmThemTNDS.getJsonData();
        obj.arr = otArr;
        _service.luuTNDS(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info === null) {
                return;
            }
            _notifyService.success("Cập nhật thông tin thành công");
            //loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
            _modalThemChiTietTNDS.hide();
        });
    });
    $("#btnThemHangMucThuHoi").click(function () {
        _frmThuHoiVatTu.resetForm();
        _frmThuHoiVatTu.clearErrorMessage();
        _frmThuHoiVatTu.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        _frmThuHoiVatTu.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalThuHoiVatTu.show();
    });
    $("#btnThemNguoiThuDoi").click(function () {
        _frmThuDoiNTBA.resetForm();
        _frmThuDoiNTBA.clearErrorMessage();
        _frmThuDoiNTBA.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        _frmThuDoiNTBA.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalThuDoiNTBA.show();
    });
    $("#btnThuHoiVatTuLuu").click(function () {
        if (!_frmThuHoiVatTu.isValid()) {
            return;
        }
        var obj = _frmThuHoiVatTu.getJsonData();
        var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.hang_muc == obj.hang_muc).firstOrDefault();
        obj.ten = hm.ten_hang_muc;
        _service.luuVatTuThuHoi(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", ho_so_chi_tiet.data_info);
                tinhTongTienThuHoiVatTu();
                _notifyService.success("Lưu thông tin vật tư thu hồi thành công");
            });

            //if (obj.bt == undefined || obj.bt == null || obj.bt == "") {
            //    ho_so_chi_tiet.data_info.thu_hoi = ho_so_chi_tiet.data_info.thu_hoi.removeItem(n => n.hang_muc == obj.hang_muc);
            //    obj.bt = res.out_value.bt;
            //    ho_so_chi_tiet.data_info.thu_hoi.push(obj);
            //    _frmThuHoiVatTu.getControl("bt").val(obj.bt);
            //} else {
            //    for (var i = 0; i < ho_so_chi_tiet.data_info.thu_hoi.length; i++) {
            //        if (ho_so_chi_tiet.data_info.thu_hoi[i].bt == obj.bt) {
            //            ho_so_chi_tiet.data_info.thu_hoi[i] = obj;
            //            break;
            //        }
            //    }
            //}
            //ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", ho_so_chi_tiet.data_info);
            //tinhTongTienThuHoiVatTu();
            //_notifyService.success("Lưu thông tin vật tư thu hồi thành công");
        });
    });
    $("#btnThuHoiVatTuLuuDong").click(function () {
        if (!_frmThuHoiVatTu.isValid()) {
            return;
        }
        var obj = _frmThuHoiVatTu.getJsonData();
        var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.hang_muc == obj.hang_muc).firstOrDefault();
        obj.ten = hm.ten_hang_muc;
        _service.luuVatTuThuHoi(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", ho_so_chi_tiet.data_info);
                tinhTongTienThuHoiVatTu();
                _modalThuHoiVatTu.hide();
                _notifyService.success("Lưu thông tin vật tư thu hồi thành công");
            });

            //if (obj.bt == undefined || obj.bt == null || obj.bt == "") {
            //    ho_so_chi_tiet.data_info.thu_hoi = ho_so_chi_tiet.data_info.thu_hoi.removeItem(n => n.hang_muc == obj.hang_muc);
            //    obj.bt = res.out_value.bt;
            //    ho_so_chi_tiet.data_info.thu_hoi.push(obj);
            //    _frmThuHoiVatTu.getControl("bt").val(obj.bt);
            //} else {
            //    for (var i = 0; i < ho_so_chi_tiet.data_info.thu_hoi.length; i++) {
            //        if (ho_so_chi_tiet.data_info.thu_hoi[i].bt == obj.bt) {
            //            ho_so_chi_tiet.data_info.thu_hoi[i] = obj;
            //            break;
            //        }
            //    }
            //}
            //ESUtil.genHTML("tableThuHoiVatTu_template", "tableThuHoiVatTu", ho_so_chi_tiet.data_info);
            //tinhTongTienThuHoiVatTu();
            //_modalThuHoiVatTu.hide();
            //_notifyService.success("Lưu thông tin vật tư thu hồi thành công");
        });

    });
    $("#btnThuDoiNTBA").click(function () {
        if (!_frmThuDoiNTBA.isValid()) {
            return;
        }
        var obj = _frmThuDoiNTBA.getJsonData();
        _service.luuNTBA(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (obj.bt == undefined || obj.bt == null || obj.bt == "") {
                obj.bt = res.out_value.bt;
                ho_so_chi_tiet.data_info.ntba.push(obj);
                _frmThuDoiNTBA.getControl("bt").val(obj.bt);
            } else {
                for (var i = 0; i < ho_so_chi_tiet.data_info.ntba.length; i++) {
                    if (ho_so_chi_tiet.data_info.ntba[i].bt == obj.bt) {
                        ho_so_chi_tiet.data_info.ntba[i] = obj;
                        break;
                    }
                }
            }
            ESUtil.genHTML("tableDanhSachThuDoiNTBA_template", "tableDanhSachThuDoiNTBA", ho_so_chi_tiet.data_info);
            tinhTongTienThuDoiNTBA();
            _notifyService.success("Lưu thông tin thu đòi người thứ 3 thành công");
        });
    });
    $("#btnThuDoiNTBADong").click(function () {
        if (!_frmThuDoiNTBA.isValid()) {
            return;
        }
        var obj = _frmThuDoiNTBA.getJsonData();
        _service.luuNTBA(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (obj.bt == undefined || obj.bt == null || obj.bt == "") {
                obj.bt = res.out_value.bt;
                ho_so_chi_tiet.data_info.ntba.push(obj);
                _frmThuDoiNTBA.getControl("bt").val(obj.bt);
            } else {
                for (var i = 0; i < ho_so_chi_tiet.data_info.ntba.length; i++) {
                    if (ho_so_chi_tiet.data_info.ntba[i].bt == obj.bt) {
                        ho_so_chi_tiet.data_info.ntba[i] = obj;
                        break;
                    }
                }
            }
            ESUtil.genHTML("tableDanhSachThuDoiNTBA_template", "tableDanhSachThuDoiNTBA", ho_so_chi_tiet.data_info);
            tinhTongTienThuDoiNTBA();
            _modalThuDoiNTBA.hide();
            _notifyService.success("Lưu thông tin thu đòi người thứ 3 thành công");
        });
    });
    $("#btnThemHoaDonChungTu").click(function () {
        _frmCarCompensationAddInvoice.resetForm();
        _frmCarCompensationAddInvoice.clearErrorMessage();
        _frmCarCompensationAddInvoice.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalCarCompensationAddInvoice.show();
    });
    $("#btnThemNguoiThuHuong").click(function () {
        _frmCarCompensationAddBenefit.resetForm();
        _frmCarCompensationAddBenefit.clearErrorMessage();
        _frmCarCompensationAddBenefit.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _frmCarCompensationAddBenefit.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        _modalCarCompensationAddBenefit.show();
    });
    $("#btnThemTamUng").click(function () {
        if (ho_so_chi_tiet.data_info.tam_ung.length > 0 && ho_so_chi_tiet.data_info.tam_ung[0].trang_thai != "D") {
            _notifyService.error("Không thể thêm tạm ứng khi có tạm ứng chưa duyệt.");
            return;
        }
        anHienQTXL(false);
        _frmCarCompensationAdvance.resetForm();
        _frmCarCompensationAdvance.clearErrorMessage();
        _frmCarCompensationAdvance.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _frmCarCompensationAdvance.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        _frmCarCompensationAdvance.getControl("ngay_yc").setValue(dateNow);
        _modalCarCompensationAdvance.show();
    });
    $("#btnThemHMTTPHU").click(function () {
        _frmThemHMTTPhu.resetForm();
        _frmThemHMTTPhu.clearErrorMessage();
        _frmThemHMTTPhu.getControl("tien_gd").val(0);
        _frmThemHMTTPhu.getControl("gara").val("");
        _frmThemHMTTPhu.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        _frmThemHMTTPhu.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalThemHMTTPHU.show();
    });
    $('#image_fullsreen').on('click', function () {
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        } else {
            $('#CarCompensationContentStep2').fullscreen();
        }
    });
    $("#btnSoSanhDuLieu").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        };
        var _carInvestigationService = new CarInvestigationService();
        _carInvestigationService.soSanhDuLieuOCR(obj).then(res => {
            ESUtil.genHTML("modalCarClaimCompareDataTable_Template", "modalCarClaimCompareDataTable", { data: res.data_info });
            ESUtil.genHTML("modalCarClaimCompareData_GPLX_Template", "modalCarClaimCompareData_GPLX", res.data_info);
            ESUtil.genHTML("modalCarClaimCompareData_DANGKIEM_Template", "modalCarClaimCompareData_DANGKIEM", res.data_info);
            _modalCarClaimCompareData.show();
        });
    });
    $("#btnLuuYeuCauBsGiayTo").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: "XE",
            pm: CONSTANT_PM,
            arr: []
        };
        $("#CarCompensationContentStep4HoSoGiayTo input.input_chon_hsgt_bs:checked").each(function (el) {
            var ma_hs = $(this).val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('input[data-field=ghi_chu]').val();
            obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: so_id_doi_tuong, trang_thai: 'C', hop_le: hop_le, gara_thu_ho: gara_thu_ho, loai: loai, ghi_chu: ghi_chu });
        });
        $("#CarCompensationContentStep4HoSoGiayTo a[data-field=trang_thai][data-val=D]").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('input[data-field=ghi_chu]').val();
            obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: so_id_doi_tuong, trang_thai: 'D', hop_le: hop_le, gara_thu_ho: gara_thu_ho, loai: loai, ghi_chu: ghi_chu });
        });
        $("#CarCompensationContentStep4HoSoGiayTo input.input_chon_gara_thu_ho:checked").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('input[data-field=ghi_chu]').attr('data-val');
            if (obj.arr.where(n => n.ma_hs == ma_hs).firstOrDefault() != null) {
                obj.arr.where(n => n.ma_hs == ma_hs).firstOrDefault().gara_thu_ho = gara_thu_ho;
            } else {
                obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: so_id_doi_tuong, trang_thai: 'K', hop_le: hop_le, gara_thu_ho: gara_thu_ho, loai: loai, ghi_chu: ghi_chu });
            }
        });
        _carClaimCommonService.luuBsHoSoGiayToBoSung(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu yêu cầu bổ sung giấy tờ thành công");
            layLaiDsHoSoGiayTo();
        });
    });
    $("#btnTrinhTamUng").click(function () {
        if (ho_so_chi_tiet.data_info.tam_ung.length <= 0) {
            _notifyService.error("Bạn chưa có yêu cầu tạm ứng");
            return;
        }
        var ma_dt_trinh = 0;
        for (var i = 0; i < ho_so_chi_tiet.data_info.tam_ung.length; i++) {
            if (ho_so_chi_tiet.data_info.tam_ung[i].so_id_tu > ma_dt_trinh) {
                ma_dt_trinh = ho_so_chi_tiet.data_info.tam_ung[i].so_id_tu;
            }
        }
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            ma_dt_trinh: ma_dt_trinh,
            loai_trinh: "XE_TRINH_DUYET_TAM_UNG_BT",
            nghiep_vu: "XE",
            ma_mau_in: "ESCS_TAM_UNG_BT",
            pm: CONSTANT_PM
        }
        _modalTrinhDuyetService.show(obj, (type, res) => {
            loadTamUng();
        });
    });
    $("#btnGuiMailBBGD").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'BT',
            /*loai: "TEMPLATE_EMAIL_PDBG"*/
        });
    });
    $("#btnGuiMailBBGDB8").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'BT',
            /*loai: "TEMPLATE_EMAIL_PDBG"*/
        });
    });
    $("#btnThemTNDSNguoi").click(function () {
        var obj = {};
        ESUtil.appendHTML("modalThemTNDSNguoi_template", "modalThemTNDSNguoi_body", { lstTNDS: obj }, () => {
            var hang_muc = _frmThemTNDS.getControl("hang_muc").val();
            if (hang_muc == "NGUOI" || hang_muc == "TN_NGUOI") {
                $("#modalThemTNDSNguoi_body input.sl").attr("readonly", "readonly");
            }
        });
        $('#modalThemTNDSNguoi_body select.select2').select2();
        $("#modalThemTNDSNguoi_body .remove_config").click(function () {
            _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?", "", () => {
                $(this).closest("tr").remove();
            });
        });
    });
    $("#btnLuuTNDSNguoi").click(function () {
        var otArr = [];
        $('#tblCauHinhTNDSNguoi tbody tr').each(function (e) {
            var json = { ten: "", dchi: "", sl: "", tinh_trang: "", tien_tthat: "", ghi_chu: "", pttt: 0, tien: 0, tien_duyet: 0 };
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    if ($(this).hasClass("ten")) {
                        json["ten"] = $(this).val();
                    }
                    if ($(this).hasClass("dchi")) {
                        json["dchi"] = $(this).val();
                    }
                    if ($(this).hasClass("sl")) {
                        json["sl"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("tien_tthat")) {
                        json["tien_tthat"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("tien")) {
                        json["tien"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    if ($(this).hasClass("ghi_chu")) {
                        json["ghi_chu"] = $(this).val();
                    }
                    if ($(this).hasClass("pttt")) {
                        json["pttt"] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                });
                $(this).find(".tinh_trang").each(function (el) {
                    json["tinh_trang"] = $(this).val();
                });
                $(this).find(".thuong_tat").each(function (el) {
                    json["thuong_tat"] = $(this).attr("data-val");
                });
                if (!json["thuong_tat"]) {
                    json["thuong_tat"] = "";
                }
            });
            otArr.push(json);
        });
        var obj = _frmThemTNDSNguoi.getJsonData();
        obj.arr = otArr;
        _service.luuTNDS(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info === null) {
                return;
            }
            _notifyService.success("Cập nhật thông tin thành công");
            reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
            //loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            _modalThemChiTietTNDSNguoi.hide();
            getPaging(1);
        });
    });
    $("#btnDongTyLeThuongTat").click(function () {
        _popoverTyLeThuongTat.hide();
    });
    $("#btnLuuTyLeThuongTat").click(function () {
        var data = getDataTreeTLTT();
        if (data != "" && elementDanhGia) {
            $(elementDanhGia).attr("data-val", data);
            $(elementDanhGia).html("Đánh giá thương tật (" + data.split(',').length + ")");
        }
        else {
            $(elementDanhGia).attr("data-val", "");
            $(elementDanhGia).html("Đánh giá thương tật (0)");
        }
    });
    $("#btnLuuDongTyLeThuongTat").click(function () {
        var data = getDataTreeTLTT();
        if (data != "" && elementDanhGia) {
            $(elementDanhGia).attr("data-val", data);
            var item = objDanhMuc.ds_tltt.where(n => n.id == data).firstOrDefault();
            $(elementDanhGia).val(item.text);
        }
        else {
            $(elementDanhGia).attr("data-val", "");
            $(elementDanhGia).val("");
        }
        _popoverTyLeThuongTat.hide();
    });
    //Upload hóa đơn ĐT
    $('#btnUploadHoaDon').click(function () {
        if (!_frmDocHoaDonDT.isValid()) {
            return;
        }
        $("#frmImportHoaDon").trigger("click");
    });
    $("#frmImportHoaDon").change(function () {
        var i = $(this).prev('label').clone();
        var file = $("#frmImportHoaDon")[0].files[0].name;
        $(this).prev('label').text(file);
    });
    $('#btnDocHoaDonXML').click(function () {
        if (_frmDocHoaDonDT.isValid()) {
            _frmCarCompensationAddInvoice.resetForm();
            _frmCarCompensationAddInvoice.clearErrorMessage();
            var formData = _frmDocHoaDonDT.getFormFileData();
            formData.append("ma_doi_tac", ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
            formData.append("so_id", ho_so_chi_tiet.data_info.ho_so.so_id);
            _commonService.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDonDienTuXe.hide();
                    $('#btnThemHoaDonChungTu_xemToanBoThongTinHSBT').trigger('click');
                    var obj = {
                        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                        dvi_phat_hanh: _frmDocHoaDonDT.getControl('dvi_ph').getValue(),
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
                    _frmCarCompensationAddInvoice.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmCarCompensationAddInvoice.setData(obj);
                }
            });
        }
    });
    //end
    $("#btnChuyenBaoGia").click(function () {
        var checked = $("#garaBaoGia input[name='chuyen_bao_gia_gara']:checked").length;
        if (checked <= 0) {
            _notifyService.error("Bạn chưa chọn gara cần chuyển báo giá.");
            return;
        }
        _notifyService.confirm("Bạn có chắc chắn muốn chuyển thông tin báo giá sang những gara đã chọn?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: []
            }
            $("#garaBaoGia input[name='chuyen_bao_gia_gara']:checked").each(function () {
                var ma = $(this).attr("data-gara");
                obj.gara.push({ ma: ma });
            });
            if (obj.length <= 0) {
                _notifyService.error("Bạn chưa chọn gara cần chuyển báo giá.");
            }
            _service.chuyenBaoGiaGara(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Chuyển báo giá thành công");
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                $("#btnChuyenBaoGia").addClass("d-none");
            });

        });
    });
    $("#btnBGLuu").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            gara: _frmBaoGiaGara.getControl("gara").val(),
            lan_bg: $("#modalBaoGiaGara_lan .modalBaoGiaGara_lan_item.active").attr("data-lan"),
            hm: layDuLieuTableBaoGia()
        };
        if (obj.hm == null || obj.hm.length <= 0) {
            _notifyService.error("Không lấy được thông tin hạng mục báo giá");
            return;
        }
        for (var i = 0; i < obj.hm.length; i++) {
            var tien_dx = (parseInt(obj.hm[i].so_luong) * parseInt(obj.hm[i].tien_vtu)) + parseInt(obj.hm[i].tien_nhan_cong);
            if (tien_dx > parseInt(obj.hm[i].tien_dx_gara)) {
                _notifyService.error("Tiền đề xuất báo giá không được lớn hơn tiền báo giá gara");
                return;
            }
        }
        _service.luuLanBaoGia(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layBaoGiaTuGara(obj.gara);
            _notifyService.success("Lưu thành công");
        });
    });
    $("#btnBGChuyenGara").click(function () {
        _notifyService.confirm("Bạn có chắc chắn chuyển lần báo giá mới sang gara?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: _frmBaoGiaGara.getControl("gara").val()
            };
            _service.chuyenLanBaoGiaMoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layBaoGiaTuGara(obj.gara, res => {
                    ESUtil.genHTML("modalBaoGiaGara_lan_template", "modalBaoGiaGara_lan", res.data_info);
                    var lan = res.data_info.bg_lan[0];
                    $(".modalBaoGiaGara_lan_item").removeClass("active");
                    $("#modalBaoGiaGara_lan tr[data-lan='" + lan.lan_bg + "']").addClass("active");
                    _frmBaoGiaGara.getControl("ten_nsd_gara").setValue(lan.ten_nsd_gara);
                    _frmBaoGiaGara.getControl("dthoai_nsd_gara").setValue(lan.dthoai_nsd_gara);
                    _frmBaoGiaGara.getControl("email_nsd_gara").setValue(lan.email_nsd_gara);
                    _frmBaoGiaGara.getControl("trang_thai_bg_hthi").setValue(lan.trang_thai_bg_hthi);
                    anHienNutBaoGia(lan.lan_bg);
                    var hm = objBaoGiaGaraApi.bg_lan_ct.where(n => n.lan_bg == lan.lan_bg);
                    ESUtil.genHTML("modalBaoGiaGara_lan_ct_template", "modalBaoGiaGara_lan_ct", { bg_lan_ct: hm }, () => {
                        var tongTienVatTu = 0;
                        var tongTienCong = 0;
                        var tongTienKhac = 0;
                        var tongTongCong = 0;

                        var tongTienVatTuGara = 0;
                        var tongTienCongGara = 0;
                        var tongTienKhacGara = 0;
                        var tongTongCongGara = 0;

                        for (var i = 0; i < hm.length; i++) {
                            tongTienVatTu += hm[i].tien_vtu;
                            tongTienCong += hm[i].tien_nhan_cong;
                            tongTienKhac += hm[i].tien_khac;
                            tongTongCong += (hm[i].so_luong * hm[i].tien_vtu + hm[i].tien_nhan_cong + hm[i].tien_khac);

                            tongTienVatTuGara += hm[i].tien_vtu_gara;
                            tongTienCongGara += hm[i].tien_nhan_cong_gara;
                            tongTienKhacGara += hm[i].tien_khac_gara;
                            tongTongCongGara += (hm[i].so_luong_gara * hm[i].tien_vtu_gara + hm[i].tien_nhan_cong_gara + hm[i].tien_khac_gara);
                        }

                        $("#modalBaoGiaGaraTongTienVatTu").html(ESUtil.formatMoney(tongTienVatTu));
                        $("#modalBaoGiaGaraTongTienCong").html(ESUtil.formatMoney(tongTienCong));
                        $("#modalBaoGiaGaraTongTienKhac").html(ESUtil.formatMoney(tongTienKhac));
                        $("#modalBaoGiaGaraTongTongCong").html(ESUtil.formatMoney(tongTongCong));

                        $("#modalBaoGiaGaraTongTienVatTuGara").html(ESUtil.formatMoney(tongTienVatTuGara));
                        $("#modalBaoGiaGaraTongTienCongGara").html(ESUtil.formatMoney(tongTienCongGara));
                        $("#modalBaoGiaGaraTongTienKhacGara").html(ESUtil.formatMoney(tongTienKhacGara));
                        $("#modalBaoGiaGaraTongTongCongGara").html(ESUtil.formatMoney(tongTongCongGara));
                    });
                });
                _notifyService.success("Chuyển lần báo giá mới thành công");
            });
        });
    });
    $("#btnBGChapNhan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn chấp thuận với báo giá này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: _frmBaoGiaGara.getControl("gara").val()
            };
            _service.chapThuanBaoGia(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                layBaoGiaTuGara(obj.gara, resBG => {
                    ESUtil.genHTML("modalBaoGiaGara_lan_template", "modalBaoGiaGara_lan", resBG.data_info);
                    var lan = resBG.data_info.bg_lan[0];
                    $(".modalBaoGiaGara_lan_item").removeClass("active");
                    $("#modalBaoGiaGara_lan tr[data-lan='" + lan.lan_bg + "']").addClass("active");
                    anHienNutBaoGia(lan.lan_bg);

                    var bg = resBG.data_info.bg;
                    $("#btnYeuCauSuaChua").addClass("d-none");
                    if (bg.ngay_ktbg < 30000101 && bg.ngay_ycsc >= 30000101) {
                        $("#btnYeuCauSuaChua").removeClass("d-none");
                    }
                });
                _notifyService.success("Báo giá đã được chấp thuận");
            });
        });
    });
    $("#btnBGHuy").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy báo giá Online này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: _frmBaoGiaGara.getControl("gara").val(),
                buoc: "HUY_BG"
            };
            _service.huyBaoGia(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                _modalBaoGiaGara.hide();
                _notifyService.success("Báo giá hủy thành công");
            });
        });
    });
    $("#btnBaoCao").click(function () {
        _modalBaoCaoService.show();
    });
    $("#btnYeuCauSuaChua").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn yêu cầu gara sửa chữa xe này?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: $("#garaBaoGia tr.selected").attr("data-ma-gara"),
                buoc: "SUA_CHUA"
            };

            _service.yeuCauSuaChua(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                $("#btnYeuCauSuaChua").addClass("d-none");
                _notifyService.success("Đã gửi yêu cầu sửa chữa gara");
            });
        });
    });
    $('#btnAnhHopDong').click(function () {
        if ($(this).find('i.fas').hasClass('fa-file-contract')) {
            $("a.btnXemVideo").removeClass("d-none");
            $("a.btnXemVideoDGRRHD").removeClass("d-none");
            $("a.btnXemVideo").addClass("d-none");
            getAnhThumnailHopDong(() => {
                $(this).find('i.fas').removeClass('fa-file-contract').addClass('fa-car');
                $(this).find('i.fas').attr('title', 'Click để xem ảnh bồi thường xe');
            });
        } else if ($(this).find('i.fas').hasClass('fa-car')) {
            $("a.btnXemVideo").removeClass("d-none");
            $("a.btnXemVideoDGRRHD").removeClass("d-none");
            $("a.btnXemVideoDGRRHD").addClass("d-none");
            getAnhThumnail(() => {
                $(this).find('i.fas').removeClass('fa-car').addClass('fa-file-contract');
                $(this).find('i.fas').attr('title', 'Click để xem ảnh hợp đồng');
            });
        }
    });
    $("#close_popGhiChu").click(function () {
        _popoverGhiChuChiTietHM.hide();
    });
    $("#close_popMoTa").click(function () {
        _popoverMoTa.hide();
    });
    $("#close_popDiaChi").click(function () {
        _popoverDiaChi.hide();
    });
    $("#luuGhiChu").click(function () {
        var val = $("#divGhiChuChiTietHM_NoiDung").val();
        $(_popoverGhiChuChiTietHM.target).attr("data-val", val);
        if (val != "") {
            $(_popoverGhiChuChiTietHM.target).attr("href", "#");
        }
        else {
            $(_popoverGhiChuChiTietHM.target).removeAttr("href");
        }
        _popoverGhiChuChiTietHM.hide();
    });
    $("#luuMoTa").click(function () {
        var val = $("#divMoTa_NoiDung").val();
        $(_popoverMoTa.target).attr("data-val", val);
        if (val != "") {
            $(_popoverMoTa.target).attr("href", "#");
        }
        else {
            $(_popoverMoTa.target).removeAttr("href");
        }
        _popoverMoTa.hide();
    });
    $("#luuDiaChi").click(function () {
        var val = $("#divDiaChi_NoiDung").val();
        $(_popoverDiaChi.target).attr("data-val", val);
        if (val != "") {
            $(_popoverDiaChi.target).attr("href", "#");
        }
        else {
            $(_popoverDiaChi.target).removeAttr("href");
        }
        _popoverDiaChi.hide();
    });
    $("#inputSearch_DviTinh").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalDviTinhDanhSach .dsdvitinh").removeClass("d-none");
            return;
        }
        $("#modalDviTinhDanhSach .dsdvitinh").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.dvi_tinh.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalDviTinhDanhSach #dsdvitinh_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_MucDoTT").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalMucDoTTDanhSach .dsmdtt").removeClass("d-none");
            return;
        }
        $("#modalMucDoTTDanhSach .dsmdtt").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.muc_do_ton_that.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalMucDoTTDanhSach [data-id='dsmdtt_" + source[i].ma + "'").removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_NguyenNhanGiamTru").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChonNguyenNhanGiamTruDanhSach .nngt").removeClass("d-none");
            return;
        }
        $("#modalChonNguyenNhanGiamTruDanhSach .nngt").addClass("d-none");
        var source = [];
        if (tim != "") {
            var arr = objDanhMuc.dmuc_chung.where(n => n.nhom == "NNGT_HANG_HOA" || n.nhom == "NNGT_CON_NGUOI");
            source = arr.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChonNguyenNhanGiamTruDanhSach #nngt_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnChonDviTinh").click(function () {
        var target = _modalDviTinh.target;
        var val = $("#modalDviTinhDanhSach .modalDviTinhItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var dvi_tinh = objDanhMuc.dvi_tinh.where(n => n.ma == val).firstOrDefault();
            $(target).val(dvi_tinh.ten);
        }
        _modalDviTinh.hide();
    });
    $("#btnChonMucDoTT").click(function () {
        var target = _modalMucDoTT.target;
        var val = $("#modalMucDoTTDanhSach .modalMucDoTTItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.ma == val).firstOrDefault();
            $(target).val(muc_do_tt.ten);
        }
        _modalMucDoTT.hide();
    });
    $("#btnChonNguyenNhanGiamTru").click(function () {
        var target = _modalNguyenNhanGiamTru.target;
        var checked = $("#modalChonNguyenNhanGiamTruDanhSach .modalChonNguyenNhanGiamTruItem:checked");
        var val = "";
        if (checked && checked.length > 0) {
            checked.each(function () {
                var current = $(this).val();
                if (val == "") {
                    val = current;
                }
                else {
                    val += "," + current;
                }
            });
        }
        $(target).attr("data-val", val);
        if (val != "") {
            $(target).attr("href", "#");
        }
        else {
            $(target).removeAttr("href");
        }
        _modalNguyenNhanGiamTru.hide();
    });
    $("#btnTuChoiBT").click(function () {
        $("#ndTuChoiBT").val("");
        _modalTuChoiBT.show();
    });
    $("#btnLuuTuChoiBT").click(function () {
        var nd = $("#ndTuChoiBT").val();
        if (nd.trim() == "") {
            _notifyService.error("Bạn chưa nhập lý do từ chối bồi thường");
            return;
        }
        _notifyService.confirm("Bạn có chắc chắn muốn từ chối bồi thường hồ sơ này không?", "", val => {
            var nd = $("#ndTuChoiBT").val();
            _notifyService.error("Chưa xử lý");
        })
    });
    $("#btnTrinhTuChoiBTStep4").click(function () {
        var arr = ho_so_chi_tiet.data_info.btv_danh_gia;
        if (arr.length == 0) {
            _notifyService.error("Vui lòng đánh giá trước khi trình!");
            return;
        }
        if (!_frmDanhGiaDeXuat.isValid()) {
            _notifyService.error("Bạn chưa nhận xét/đề xuất bồi thường.");
            return;
        }

        var obj = {
            ma_doi_tac: _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue(),
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            loai_trinh: "XE_TRINH_DUYET_TU_CHOI",
            nghiep_vu: "XE",
            remove_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            create_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            pm: CONSTANT_PM
        }
        obj.ma = "";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
            var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
            if (trang_thai != null) {
                ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
            }

            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        });
    });
    $("#btnTrinhTuChoiBT").click(function () {
        var arr = ho_so_chi_tiet.data_info.btv_danh_gia;
        if (arr.length == 0) {
            _notifyService.error("Vui lòng đánh giá trước khi trình!");
            return;
        }

        var obj = {
            ma_doi_tac: _frmTinhToanBoiThuong.getControl("ma_doi_tac").getValue(),
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: _frmTinhToanBoiThuong.getControl("so_id").getValue(),
            loai_trinh: "XE_TRINH_DUYET_TU_CHOI",
            nghiep_vu: "XE",
            remove_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            create_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            pm: CONSTANT_PM
        }
        obj.ma = "";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
            var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
            if (trang_thai != null) {
                ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
            }

            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        });
    });
    $("#btnXemTienTrinhGiaiQuyet").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        };
        _carClaimCommonService.xemThongTinSLA(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info.length > 0) {
                ESUtil.genHTML("tblThongTinTienTrinhBoiThuongSLA_template", "tblThongTinTienTrinhBoiThuongSLA", { data: res.data_info });
            }
        });
        _modalSLAFlowChart.show();
    });
    $("#input_imagesCategory").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMuc .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMuc .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMuc .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $(".inputSearchHangMuc").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMucCTiet .imagesCategory").removeClass("style");
        if (val != "") {
            $("#dsHinhAnhHangMucCTiet .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucCTiet .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $('#btnCarCompensationAdvance_processing').click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: _frmCarCompensationAdvance.getControl('so_id_tu').getValue(),
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt
        }
        _service.danhSachQuaTrinhXuLy(obj).then(res => {
            $("#tabQuaTrinhGiaiQuyetTimeLine").html("");
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info.length > 0) {
                for (var i = 0; i < res.data_info.length; i++) {
                    var item = res.data_info[i];
                    if (hienThiQTXL(item) !== null) {
                        $("#tabQuaTrinhGiaiQuyetTimeLine").append(hienThiQTXL(item));
                    };
                }
            }
            if ($("#modalDialogQTXL").hasClass("active")) {
                anHienQTXL(false);
            }
            else {
                anHienQTXL(true);
            }
        });
    });
    $('#btnCloseQTXL').click(function () {
        if ($("#modalDialogQTXL").hasClass("active")) {
            anHienQTXL(false);
        }
        else {
            anHienQTXL(true);
        }
    });
    $("#btnAnHienTabCommon").click(function () {
        var isShow = $("#divCommonTab").hasClass("d-none");
        if (isShow) {
            anHienTabThongTinChung(true);
        }
        else {
            anHienTabThongTinChung(false);
        }
    });
    $('#btnChonLoaiHSGT').click(function () {
        var target = _modalLoaiHSGT.target;
        var val = $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var data = arrLoaiHSGT.where(n => n.ma == val).firstOrDefault();
            $(target).html(data.ten);
            $(target).attr("data-val", data.ma);
        }
        _modalLoaiHSGT.hide();
    });
    $("#btnBoChonLoaiHSGT").click(function () {
        var target = _modalLoaiHSGT.target;
        $(target).attr("data-val", "");
        $(target).html("Chọn loại hồ sơ");
        _modalLoaiHSGT.hide();
    });
    $('#btnLuuDeXuatGiaiQuyet').click(function () {
        var val = $('#frmNoiDungDeXuatGiaiQuyet').jqxEditor('val');
        $(_modalDeXuatGiaiQuyet.target).attr("data-val", val);
        if (val != '<div>​</div><div id="eJOY__extension_root" class="eJOY__extension_root_class" style="all: unset;"></div>' && val != '') {
            $(_modalDeXuatGiaiQuyet.target).attr("href", "#");
        }
        else {
            $(_modalDeXuatGiaiQuyet.target).removeAttr("href");
        }
        _modalDeXuatGiaiQuyet.hide();
    });
    $("#btnBoiThuongToanBo").click(function () {
        $("#btnLuuBTTB").addClass("d-none");
        $("#btnXoaBTTB").addClass("d-none");
        $("#txtNoiDongBTTB").val("");
        if (ho_so_chi_tiet.data_info.ho_so.bt_toan_bo == "C") {
            $("#btnXoaBTTB").removeClass("d-none");
            $("#txtNoiDongBTTB").val(ho_so_chi_tiet.data_info.ho_so.noi_dung_bttb);
        }
        else
            $("#btnLuuBTTB").removeClass("d-none");


        _modalBoiThuongToanBo.show();
    });
    $("#btnLuuBTTB").click(function () {
        var noi_dung = $("#txtNoiDongBTTB").val();
        if (noi_dung.trim() == "") {
            _notifyService.error("Bạn chưa nhập nội dung bồi thường toàn bộ");
            return;
        }
        _notifyService.confirmDelay("Hệ thống sẽ thực hiện tính toán tổn thất toàn bộ sau <strong style='color:red;font-weight:bold;'></strong> giây.", 6, () => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                noi_dung: noi_dung
            }
            _service.boithuongToanBo(obj).then(res => {
                var objGetDetail = { ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                    ho_so_chi_tiet = res;
                    var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                    xemChiTietDTTonThat(lhnv);
                });
                $("#btnLuuBTTB").addClass("d-none");
                $("#btnXoaBTTB").removeClass("d-none");
                _notifyService.success("Tạo phương án bồi thường toàn bộ thành công");
            });
        });
    });
    $("#btnXoaBTTB").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy phương án bồi thường toàn bộ không?", "", () => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _service.xoaBoithuongToanBo(obj).then(res => {
                var objGetDetail = { ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                    ho_so_chi_tiet = res;
                    var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                    xemChiTietDTTonThat(lhnv);
                });
                $("#btnLuuBTTB").removeClass("d-none");
                $("#btnXoaBTTB").addClass("d-none");
                _notifyService.success("Hủy phương án bồi thường toàn bộ thành công");
            });
        });
    });
    $("#btnXemTaiLieu").bind("click", function () {
        _commonService.InPdf({
            ma_mau_in: "BT_ANH_TON_THAT",
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            bt: getImageSelect()

        }, "#modalDocumentContents").then(res => {
            ESUtil.convertBase64ToFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf", "application/pdf");
        });
    });
    $('#btnGaraPhuongAn').click(function () {
        var target = _modalGaraPhuongAn.target;
        var val = $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem:checked").val();
        var bt_gara = $("#modalGaraPhuongAnDanhSach .modalGaraPhuongAnItem:checked").attr('data-bt-gara');
        if (val != undefined && val != null) {
            var arrDetailgara = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                gara: val,
                bt_gara: bt_gara
            }
            _service.layGaraBaoGiaCT(arrDetailgara).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }

                if ($(target).closest('tr').find('input.input_chon_hm_gara').is(':checked') == false) {
                    $(target).attr("data-val", val);
                    var hm = $(target).closest('tr').find('input[data-field=hang_muc]').val();
                    var data_hm = res.data_info.gara_ct.where(n => n.hang_muc == hm).firstOrDefault();
                    $(target).closest('tr').find('input[data-field=bt_gara]').val(bt_gara);
                    $(target).closest('tr').find('input[data-field=tien_ht_gara]').val(ESUtil.formatMoney(data_hm.tien_ht_gara));
                    $(target).closest('tr').find('input[data-field=tien_vtu]').val(ESUtil.formatMoney(data_hm.tien_vtu));
                    $(target).closest('tr').find('input[data-field=tien_nhan_cong]').val(ESUtil.formatMoney(data_hm.tien_nhan_cong));
                    $(target).closest('tr').find('input[data-field=tong_cong]').val(ESUtil.formatMoney(data_hm.tong_cong));
                    $(target).closest('tr').find('input[data-field=tien_vtu_dx]').val(ESUtil.formatMoney(data_hm.tien_vtu_dx));
                    $(target).closest('tr').find('input[data-field=tien_nhan_cong_dx]').val(ESUtil.formatMoney(data_hm.tien_nhan_cong_dx));
                    $(target).closest('tr').find('input[data-field=tien_dx]').val(ESUtil.formatMoney(data_hm.tien_dx));
                    if (val != '') {
                        $(target).attr('href', '#');
                    } else {
                        $(target).removeAttr('href');
                    }
                    tinhToanPA();
                } else {
                    $.each($('.input_chon_hm_gara:checked'), (index, item) => {
                        $(item).closest('tr').find('td a[data-field=ma_gara]').attr("data-val", val);
                        var hm = $(item).closest('tr').find('input[data-field=hang_muc]').val();
                        var data_hm = res.data_info.gara_ct.where(n => n.hang_muc == hm).firstOrDefault();
                        $(item).closest('tr').find('input[data-field=bt_gara]').val(bt_gara);
                        $(item).closest('tr').find('input[data-field=tien_ht_gara]').val(ESUtil.formatMoney(data_hm.tien_ht_gara));
                        $(item).closest('tr').find('input[data-field=tien_vtu]').val(ESUtil.formatMoney(data_hm.tien_vtu));
                        $(item).closest('tr').find('input[data-field=tien_nhan_cong]').val(ESUtil.formatMoney(data_hm.tien_nhan_cong));
                        $(item).closest('tr').find('input[data-field=tong_cong]').val(ESUtil.formatMoney(data_hm.tong_cong));
                        $(item).closest('tr').find('input[data-field=tien_vtu_dx]').val(ESUtil.formatMoney(data_hm.tien_vtu_dx));
                        $(item).closest('tr').find('input[data-field=tien_nhan_cong_dx]').val(ESUtil.formatMoney(data_hm.tien_nhan_cong_dx));
                        $(item).closest('tr').find('input[data-field=tien_dx]').val(ESUtil.formatMoney(data_hm.tien_dx));
                        if (val != '') {
                            $(item).closest('tr').find('td a[data-field=ma_gara]').attr('href', '#');
                        } else {
                            $(item).closest('tr').find('td a[data-field=ma_gara]').removeAttr('href');
                        }
                        tinhToanPA();
                    });
                }
            });
        }
        _modalGaraPhuongAn.hide();
    });
    $("#inputSearch_GaraPhuongAn").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalGaraPhuongAnDanhSach .dsgarapa").removeClass("d-none");
            return;
        }
        $("#modalGaraPhuongAnDanhSach .dsgarapa").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = ho_so_chi_tiet.data_info.gara_bao_gia.where(n => n.ten_gara.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalGaraPhuongAnDanhSach [data-id='ds_gara_pa_" + source[i].ma_gara + "'").removeClass("d-none");
            }
        }
    }, 300));
    //$('#btnLuuPASC').click(function () {
    //    luuPASC(() => {
    //        _notifyService.success("Lưu thông tin phương án thành công");
    //    });
    //});
    //$('#btnLuuPASC_NV').click(function () {
    //    var lh_nv = $("#navPhuongAnNghiepVu li.active").attr("data-lhnv");
    //    var json = _frmTinhToanBoiThuongPA.getJsonData();
    //    json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    //    json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    //    json.lh_nv = lh_nv;
    //    json.so_id_doi_tuong = $("#tblDsPhuongAnBody td.text-danger").attr("data-so_id_doi_tuong");

    //    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv).firstOrDefault();

    //    if (json.tl_thue != undefined && json.tl_thue != null && json.tl_thue == "THM") {
    //        json.tl_thue = 0;
    //        json.pt_ad_thue_mien_thuong = "THM";//Thuế miễn thường theo thuế hạng mục
    //    }
    //    else {
    //        json.pt_ad_thue_mien_thuong = "TLT";//Thuế miễn thường theo tỷ lệ thuế
    //    }

    //    /*Hàng hóa trên xe*/
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
    //        json.data = layDuLieuBangPAHangHoa();
    //    }
    //    /*Người ngồi trên xe*/
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
    //        json.data = layDuLieuBangPANNTX();
    //    }
    //    /*TNDS về người*/
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
    //        json.data = layDuLieuBangPATNDSNguoi();
    //    }
    //    /*TNDS về hành khách*/
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
    //        json.data = layDuLieuBangPATNDSNguoiHK();
    //    }
    //    /*TNDS về tài sản*/
    //    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
    //        json.data = layDuLieuBangPATNDSTaiSan();
    //    }

    //    if (objLHNV.doi_tuong != DOI_TUONG_TT.XE) {
    //        _service.luuPhuongAnNV(json).then(res => {
    //            if (res.state_info.status !== "OK") {
    //                _notifyService.error(res.state_info.message_body);
    //                return;
    //            }
    //            hienThiBangGiaPA({ ma_doi_tac: json.ma_doi_tac, so_id: json.so_id });
    //            idPhuongAn = res.out_value.so_id_pa.toString();
    //            _notifyService.success("Lưu thông tin thành công");
    //            var objGetDetail = { ma_doi_tac: json.ma_doi_tac, so_id: json.so_id };
    //            _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
    //                ho_so_chi_tiet = resDetail;
    //            });
    //        });
    //    }
    //});
    //$('#btnChonPA').click(function () {
    //    var arrPA = getCheckedPhuongAn();
    //    if (arrPA.length <= 0) {
    //        _notifyService.error('Không tìm thấy phương án');
    //        return;
    //    }
    //    var objData = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        so_id_pa: arrPA[0].so_id_pa,
    //        lhnv: $("#navPhuongAnNghiepVu li.active").attr("data-lhnv")
    //    }
    //    _service.chonPhuongAn(objData).then(res => {
    //        if (res.state_info.status !== "OK") {
    //            _notifyService.error(res.state_info.message_body);
    //            return;
    //        }

    //        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
    //        _service.layThongTinChiTietHoSo(objGetDetail).then(res1 => {
    //            ho_so_chi_tiet = res1;
    //            tongHopTienPhuongAn();
    //            reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
    //            ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: ho_so_chi_tiet.data_info.ds_phuong_an }, () => {
    //                $('#btnBoChonPA').show();
    //                $('#btnChonPA').hide();
    //                _notifyService.success("Chọn phương án thành công");
    //            });
    //        });
    //    });
    //});
    //$('#btnBoChonPA').click(function () {
    //    var arrPA = getCheckedPhuongAn();
    //    if (arrPA.length <= 0) {
    //        _notifyService.error('Không tìm thấy phương án');
    //        return;
    //    }
    //    var objData = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        so_id_pa: arrPA[0].so_id_pa,
    //        lhnv: $("#navPhuongAnNghiepVu li.active").attr("data-lhnv")
    //    }
    //    _service.boChonPhuongAn(objData).then(res => {
    //        if (res.state_info.status !== "OK") {
    //            _notifyService.error(res.state_info.message_body);
    //            return;
    //        }
    //        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
    //        _service.layThongTinChiTietHoSo(objGetDetail).then(res1 => {
    //            ho_so_chi_tiet = res1;
    //            tongHopTienPhuongAn();
    //            reloadPhuongAnKhacPhuc(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
    //            ESUtil.genHTML("tblDsPhuongAnBodyTemplate", "tblDsPhuongAnBody", { data: ho_so_chi_tiet.data_info.ds_phuong_an }, () => {
    //                $('#btnBoChonPA').hide();
    //                $('#btnChonPA').show();
    //                _notifyService.success("Bỏ chọn phương án thành công");
    //            });
    //        });
    //    });
    //});
    //$("#btnLuuGiamGiaPA").click(function () {
    //    luuGiamGiaPA();
    //});
    //$("#btnLuuDongGiamGiaPA").click(function () {
    //    luuGiamGiaPA(res => {
    //        _modalGiamGiaPA.hide();
    //    });
    //});
    //$("#btnLuuThuePA").click(function () {
    //    luuThuePA(res => { });
    //});
    //$("#btnLuuDongThuePA").click(function () {
    //    luuThuePA(res => {
    //        _modalThuePA.hide();
    //    });
    //});
    //$("#btnLuuGiamGia").click(function () {
    //    luuGiamGia(res => { });
    //});
    //$("#btnLuuDongGiamGia").click(function () {
    //    luuGiamGia(res => {
    //        _modalGiamGia.hide();
    //    });
    //});
    //$("#btnLuuKhauTru").click(function () {
    //    luuKhauTru(res => { });
    //});
    //$("#btnLuuDongKhauTru").click(function () {
    //    luuKhauTru(res => {
    //        _modalKhauTru.hide();
    //    });
    //});
    //$("#btnLuuThue").click(function () {
    //    luuThue(res => { });
    //});
    //$("#btnLuuDongThue").click(function () {
    //    luuThue(res => {
    //        _modalThue.hide();
    //    });
    //});
    //$("#btnLuuKhauTruPA").click(function () {
    //    luuKhauTruPA();
    //});
    //$("#btnLuuDongKhauTruPA").click(function () {
    //    luuKhauTruPA(res => {
    //        _modalKhauTruPA.hide();
    //    });
    //});
    $("#btnXinYKienPABT").click(function () {
        _frmModalXinYKien.resetForm();
        _frmModalXinYKien.clearErrorMessage();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id_hs: ho_so_chi_tiet.data_info.ho_so.so_id,
            nhom: "PABT"
        }
        _modalTrinhXinYKien.show(obj);
    });
    $("#btnXinYKienDUYETBT").click(function () {
        _frmModalXinYKien.resetForm();
        _frmModalXinYKien.clearErrorMessage();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id_hs: ho_so_chi_tiet.data_info.ho_so.so_id,
            nhom: "DUYETBT"
        }
        _modalTrinhXinYKien.show(obj);
    });
    $("#chonHangMucBoSung").click(function () {
        if (_popoverHangMucBoSung.options.hanh_dong == "SUA") {
            var hang_muc_goc = _frmHangMucBoSung.getControl("hang_muc_goc").val();
            var obj = {
                hang_muc: _frmHangMucBoSung.getControl("hang_muc").attr("complete-val"),
                muc_do: _frmHangMucBoSung.getControl("muc_do").val(),
                thay_the_sc: _frmHangMucBoSung.getControl("thay_the_sc").val()
            }
            if (obj.hang_muc == "") {
                _notifyService.error("Bạn chưa chọn hạng mục");
                return;
            }
            if (obj.muc_do == "") {
                _notifyService.error("Bạn chưa chọn mức độ tổn thất");
                return;
            }
            if (obj.thay_the_sc == "") {
                _notifyService.error("Bạn chưa chọn phương án sửa chữa");
                return;
            }
            var hang_muc = objDanhMuc.hang_muc_xe.where(n => n.ma == obj.hang_muc).firstOrDefault();
            if (hang_muc == null) {
                _notifyService.error("Không xác định được hạng mục tổn thất");
                return;
            }
            obj.hang_muc_ten = hang_muc.ten;

            var arr = obj.muc_do.split(",");
            var muc_do_ten = "";
            if (arr !== undefined && arr !== null && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var ten = objDanhMuc.muc_do_ton_that_xe.where(n => n.ma === arr[i].trim()).firstOrDefault().ten;
                    if (i === 0) {
                        muc_do_ten = ten;
                    } else {
                        muc_do_ten += ", " + ten;
                    }
                }
            }
            obj.muc_do_ten = muc_do_ten;
            if (obj.thay_the_sc == "T") {
                obj.thay_the_sc_ten = "Thay thế";
            }
            if (obj.thay_the_sc == "S") {
                obj.thay_the_sc_ten = "Sửa chữa";
            }
            var count = html2json().where(n => n.hang_muc == obj.hang_muc && n.hang_muc != hang_muc_goc).length;
            if (count > 0) {
                _notifyService.error("Hạng mục tổn thất đã có trong danh sách");
                return;
            }
            var tr = $(_popoverHangMucBoSung.target).parent().parent();
            tr.find("input[name='hang_muc']").val(obj.hang_muc);
            tr.find("input[name='muc_do']").val(obj.muc_do);
            tr.find("input[name='thay_the_sc']").val(obj.thay_the_sc);
            tr.find("input[name='so_luong']").attr("readonly", "readonly");
            tr.find("input[name='tien_vtu']").attr("readonly", "readonly");
            if (obj.thay_the_sc == "T") {
                tr.find("input[name='so_luong']").removeAttr("readonly");
                tr.find("input[name='tien_vtu']").removeAttr("readonly");
            }
            else {
                tr.find("input[name='so_luong']").val("0");
            }
            tr.find("a[data-field='ten_hang_muc']").html(obj.hang_muc_ten);
            tr.find("a[data-field='muc_do_ten']").html(obj.muc_do_ten);
            tr.find("a[data-field='thay_the_sc_ten']").html(obj.thay_the_sc_ten);

            tr.find("a[data-field='ten_hang_muc']").attr("data-val", obj.hang_muc_ten);
            tr.find("a[data-field='muc_do_ten']").attr("data-val", obj.muc_do_ten);
            tr.find("a[data-field='thay_the_sc_ten']").attr("data-val", obj.thay_the_sc_ten);

            tr.find("a[data-field='ten_hang_muc']").removeClass("text-danger");
            tr.find("a[data-field='muc_do_ten']").removeClass("text-danger");
            tr.find("a[data-field='thay_the_sc_ten']").removeClass("text-danger");
        }
        if (_popoverHangMucBoSung.options.hanh_dong == "THEM_MOI") {
            var obj = {
                bt: 0,
                hang_muc: _frmHangMucBoSung.getControl("hang_muc").attr("complete-val"),
                ten_hang_muc: "",
                muc_do: _frmHangMucBoSung.getControl("muc_do").val(),
                muc_do_ten: "",
                thay_the_sc: _frmHangMucBoSung.getControl("thay_the_sc").val(),
                thay_the_sc_ten: "",
                tien_vtu: 0,
                tien_nhan_cong: 0,
                tien_khac: 0,
                tong_cong: 0,
                tien_vtu_dx: 0,
                tien_nhan_cong_dx: 0,
                tien_khac_dx: 0,
                tien_dx: 0,
                tien_vtu_duyet: 0,
                tien_nhan_cong_duyet: 0,
                tien_khac_duyet: 0,
                tien_duyet: 0,
                so_luong: 0,
                ghi_chu: "",
                loai_hang_muc: "B"
            }
            if (obj.thay_the_sc == "T") {
                obj.so_luong = 1;
            }
            if (obj.hang_muc == "") {
                _notifyService.error("Bạn chưa chọn hạng mục");
                return;
            }
            if (obj.muc_do == "") {
                _notifyService.error("Bạn chưa chọn mức độ tổn thất");
                return;
            }
            if (obj.thay_the_sc == "") {
                _notifyService.error("Bạn chưa chọn phương án sửa chữa");
                return;
            }
            var hang_muc = objDanhMuc.hang_muc_xe.where(n => n.ma == obj.hang_muc).firstOrDefault();
            if (hang_muc == null) {
                _notifyService.error("Không xác định được hạng mục tổn thất");
                return;
            }
            obj.ten_hang_muc = hang_muc.ten;
            var arr = obj.muc_do.split(",");
            var muc_do_ten = "";
            if (arr !== undefined && arr !== null && arr.length > 0) {
                for (var i = 0; i < arr.length; i++) {
                    var ten = objDanhMuc.muc_do_ton_that_xe.where(n => n.ma === arr[i].trim()).firstOrDefault().ten;
                    if (i === 0) {
                        muc_do_ten = ten;
                    } else {
                        muc_do_ten += ", " + ten;
                    }
                }
            }
            obj.muc_do_ten = muc_do_ten;
            if (obj.thay_the_sc == "T") {
                obj.thay_the_sc_ten = "Thay thế";
            }
            if (obj.thay_the_sc == "S") {
                obj.thay_the_sc_ten = "Sửa chữa";
            }
            var count = html2json().where(n => n.hang_muc == obj.hang_muc).length;
            if (count > 0) {
                _notifyService.error("Hạng mục tổn thất đã có trong danh sách");
                return;
            }
            var ds_hang_muc = html2json();
            ds_hang_muc.push(obj);
            ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: ds_hang_muc }, () => {
                bindEventBaoGiaCT();
            });
        }
        _popoverHangMucBoSung.hide();
    });
    $("#xoaHangMucBoSung").click(function () {
        var tr = $(_popoverHangMucBoSung.target).parent().parent();
        tr.remove();
        _popoverHangMucBoSung.hide();
    });
    $("#btnKetThucBaoGia").click(function () {
        _notifyService.ketThucBaoGia("Bạn có chắc chắn muốn kết thúc báo giá với gara này không?", type => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_doi_tuong: $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong"),
                gara: $("#garaBaoGia tr.selected").attr("data-ma-gara")
            }
            if (obj.gara == undefined || obj.gara == null || obj.gara == "") {
                _notifyService.error("Bạn chưa chọn gara");
                return;
            }
            _service.ketThucBaoGia(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    loadGaraBaoGia(resCT => {
                        $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                    });
                    if (type == "KET_THUC_BG") {
                        _notifyService.success("Kết thúc báo giá thành công.");
                    }
                    if (type == "KET_THUC_BG_LAP_PA") {
                        $("#CarCompensationQuotation").modal("hide");
                        $('#btnLapPASC').trigger('click');
                    }
                });
            });
        });
    });
    $("#btnHuyKetThucBaoGia").click(function () {
        _notifyService.confirm("Hủy kết thúc báo giá sẽ hủy phương án báo giá với gara này. Bạn có chắc chắn muốn hủy kết thúc báo giá này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_doi_tuong: $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong"),
                gara: $("#garaBaoGia tr.selected").attr("data-ma-gara")
            }
            if (obj.gara == undefined || obj.gara == null || obj.gara == "") {
                _notifyService.error("Bạn chưa chọn gara");
                return;
            }
            _service.huyKetThucBaoGia(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    loadGaraBaoGia(resCT => {
                        $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                    });
                    _notifyService.success("Hủy kết thúc báo giá thành công.");
                });
            });
        });
    });
    $("#btnChiPhiKhac").click(function () {
        _frmTKiemChiPhiKhac.resetForm();
        _frmTKiemChiPhiKhac.clearErrorMessage();
        getPagingChiPhiKhac(1, res => {
            var data = res.data_info.data;
            tinhTongTienHoSoChiPhiKhac(data);
            $("#modalAddChiPhiKhacForm").addClass("d-none");
            $("#modalDanhSachDonViThamGia").removeClass("d-none");
            _modalAddChiPhiKhac.show();
        });
    });
    $("#btnThemMoiChiPhiKhac").click(function () {
        resetFormChiPhiKhac();
        var dsDoiTuongTaiSanXe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || (n.nhom == "TAI_SAN" && n.loai == "XE"));
        var dsLHNV = ho_so_chi_tiet.data_info.lh_nv;
        if (dsDoiTuongTaiSanXe.length == 1) {
            _frmAddChiPhiKhac.getControl("so_id_doi_tuong").setDataSource(dsDoiTuongTaiSanXe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", dsDoiTuongTaiSanXe[0].so_id_doi_tuong);
        } else {
            _frmAddChiPhiKhac.getControl("so_id_doi_tuong").setDataSource(dsDoiTuongTaiSanXe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
        }
        if (dsLHNV.length == 1) {
            _frmAddChiPhiKhac.getControl("lh_nv").setDataSource(dsLHNV, "ten", "ma", "Chọn loại hình nghiệp vụ", dsLHNV[0].ma);
        } else {
            _frmAddChiPhiKhac.getControl("lh_nv").setDataSource(dsLHNV, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        }
        _frmAddChiPhiKhac.getControl("dvi_tham_gia").setDataSource([], "ten", "ma", "Chọn đơn vị tham gia", "");
        _frmAddChiPhiKhac.getControl("ma_chi_phi").setValue("");
        _frmAddChiPhiKhac.getControl("ma_chi_phi").readOnly(false);
        _frmAddChiPhiKhac.getControl("dvi_tham_gia").readOnly(false);
        _frmAddChiPhiKhac.getControl("lh_nv").readOnly(false);
        _frmAddChiPhiKhac.getControl("so_id_doi_tuong").readOnly(false);
        $("#modalAddChiPhiKhacForm").removeClass("d-none");
        $("#modalDanhSachDonViThamGia").addClass("d-none");
        $("#thongTinDiaDiemKeoXe").addClass("d-none");
        $("#btnXoaAddChiPhiKhac").hide();
        $("#donViThamGia").show();
    });
    $("#btnQuayLaiDanhSachChiPhiKhac").click(function () {
        $("#modalAddChiPhiKhacForm").addClass("d-none");
        $("#modalDanhSachDonViThamGia").removeClass("d-none");
        _frmAddChiPhiKhac.resetForm();
        _frmAddChiPhiKhac.clearErrorMessage();
    });
    $("#btnLuuAddChiPhiKhac").click(function () {
        if (_frmAddChiPhiKhac.isValid()) {
            var ma = _frmAddChiPhiKhac.getControl("dvi_tham_gia").val();
            var obj = _frmAddChiPhiKhac.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            if (obj.ma_chi_phi == "CP_CAU_KEO") {
                obj.dvi_tham_gia = ma.split("-")[0];
                var nhom = ma.split("-")[1];
                if (nhom === "CAU") {
                    obj.ten_chi_phi = "Chi phí cẩu";
                } else if (nhom === "KEO") {
                    obj.ten_chi_phi = "Chi phí kéo";
                } else if (nhom === "CAU_KEO") {
                    obj.ten_chi_phi = "Chi phí cẩu và kéo";
                }
            }
            if (obj.ma_chi_phi == "KHAC") {
                obj.dvi_tham_gia = "";
            }
            obj.pm = "BT";
            _carClaimCommonService.luuThongTinChiPhiKhac(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin chi phí thành công");
                getPagingChiPhiKhac(1, res => {
                    tinhTongTienHoSoChiPhiKhac(res.data_info.data);
                    $("#modalAddChiPhiKhacForm").addClass("d-none");
                    $("#modalDanhSachDonViThamGia").removeClass("d-none");
                });
            });
        }
    });
    $("#btnXoaAddChiPhiKhac").click(function () {
        var obj = _frmAddChiPhiKhac.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin chi phí này không?", "", val => {
            _carClaimCommonService.xoaThongTinChiPhiKhac(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPagingChiPhiKhac(1, res => {
                        tinhTongTienHoSoChiPhiKhac(res.data_info.data);
                        $("#modalAddChiPhiKhacForm").addClass("d-none");
                        $("#modalDanhSachDonViThamGia").removeClass("d-none");
                    });
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnDongBangGiaChitiet").click(function () {
        _popoverBangGiaChiTiet.hide();
    });
    $("#btnThemNhanXet").click(function () {
        bindThongTinFormNhanXet();
        _frmTaoNoiDung.getControl("nv_ct").setValue("NHAN_XET");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    $("#btnThemDeXuat").click(function () {
        bindThongTinFormNhanXet();
        _frmTaoNoiDung.getControl("nv_ct").setValue("DE_XUAT");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    $("#btnThemNoiDungTrinh").click(function () {
        bindThongTinFormNhanXet();
        _frmTaoNoiDung.getControl("nv_ct").setValue("TRINH_DUYET_BT");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
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
    $("#btnChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var val = $("#modalChonNoiDungDanhSach .modalChonNoiDungItem:checked").val();

        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var arr = arrNhanXet.where(n => n.so_id == val).firstOrDefault();
            $(target).attr("data-loai", arr.nv_ct);
            if (arr.nv_ct == "NHAN_XET") {
                $("#danh_gia").val(arr.noi_dung);
            } else if (arr.nv_ct == "DE_XUAT") {
                $("#de_xuat").val(arr.noi_dung);
            } else {
                $("#noi_dung_trinh").val(arr.noi_dung);
            }
        }
        _modalChonNoiDung.hide();
    });
    $("#btnBoChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var loai = $(target).attr("data-loai");
        if (loai == "NHAN_XET") {
            $("#danh_gia").val("");
            $(target).attr("data-val", "");
        } else if (loai == "DE_XUAT") {
            $("#de_xuat").val("");
            $(target).attr("data-val", "");
        } else {
            $("#noi_dung_trinh").val("");
            $(target).attr("data-val", "");
        }
        _modalChonNoiDung.hide();
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
    $("#btnChuyenThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn chuyển thanh toán hồ sơ bồi thường này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _service.chuyenThanhToan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Chuyển thanh toán thành công");
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                    bindDataDienBienTonThat(resDetail);
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                });
            });
        });
    });
    $("#btnHuyChuyenThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy chuyển thanh toán hồ sơ bồi thường này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _service.huyChuyenThanhToan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Hủy chuyển thanh toán thành công");
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    bindDataDienBienTonThat(resDetail);
                    ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
                });
            });
        });
    });
    $("#btnSuaGCN").click(function () {
        _frmSuaGCN_BT.resetForm();
        _frmSuaGCN_BT.clearErrorMessage();
        _service.layThongTinHopDong({
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            pm: "BT"
        }).then(res => {
            _frmSuaGCN_BT.getControl("bien_xe").setValue(res.data_info.ho_so.bien_xe);
            _frmSuaGCN_BT.getControl("hang_xe").setValue(res.data_info.ho_so.hang_xe_ten);
            _frmSuaGCN_BT.getControl("hang_xe").trigger("select2:select");
            _frmSuaGCN_BT.getControl("hieu_xe").setValue(res.data_info.ho_so.hieu_xe);
            _frmSuaGCN_BT.getControl("nam_sx").setValue(res.data_info.ho_so.nam_sx);
            _frmSuaGCN_BT.getControl("md_sd").setValue(res.data_info.ho_so.md_sd);
            _frmSuaGCN_BT.getControl("loai_xe").setValue(res.data_info.ho_so.ma_loai_xe);
        });
        _modalXemThongTinChungNhan.hide();
        _modalSuaGCN.show();
    });
    $("#btnXemGCN").click(function () {
        _modalSuaGCN.hide();
        _modalXemThongTinChungNhan.show();
    });
    $("#btnLuuGCN").click(function () {
        var obj = {
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            pm: "BT"
        };
        if (_frmSuaGCN_BT.isValid()) {
            var formData = _frmSuaGCN_BT.getJsonData();
            var objData = {
                ma_doi_tac: obj.ma_doi_tac,
                so_id_dt: obj.so_id_dt,
                so_id_hd: obj.so_id_hd,
                bien_xe: formData.bien_xe,
                hang_xe: formData.hang_xe,
                hieu_xe: formData.hieu_xe,
                loai_xe: formData.loai_xe,
                md_sd: formData.md_sd,
                nam_sx: formData.nam_sx
            };
            _carClaimCommonService.suaGCN(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalSuaGCN.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        };
    });
    //------------Code phương án -------------
    $("#btnLapPASC_BG").click(function () {
        lapPASC(res => {
            $("#CarCompensationQuotation").modal("hide");
            _modalLapPhuongAnSuaChua.show();
        });
    });
    $("#btnLapPASC").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _modalLapPhuongAnSuaChuaService.show(obj);
    });
    //$("#btnLapPASC").click(function () {
    //    lapPASC(res => {
    //        loadThonginBoiThuongVienDanhGiaHoSoBoiThuong(ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault());
    //        _modalLapPhuongAnSuaChua.show();
    //    });
    //});
    //$("#btnTrinhPA").click(function () {
    //    var obj = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
    //        nghiep_vu: "XE",
    //        pm: CONSTANT_PM,
    //        remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        hanh_dong: "PHUONG_AN"
    //    }
    //    if (ho_so_chi_tiet.data_info.lh_nv.where(n => n.nhom != NHOM_LHNV.XE).length > 0) {
    //        obj.remove_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    //        obj.create_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    //        obj.nghiep_vu_khac = true;
    //    }
    //    if (ESCS_MA_DOI_TAC == "OPES") {
    //        obj.remove_file = "OPES_DE_XUAT_PHUONG_AN_SC";
    //        obj.create_file = "OPES_DE_XUAT_PHUONG_AN_SC";
    //    }
    //    _modalTrinhDuyetService.show(obj, (type, res) => {
    //        ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
    //        var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
    //        if (trang_thai != null) {
    //            ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
    //        }
    //        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
    //        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
    //        _modalLapPhuongAnSuaChua.hide();
    //    });
    //});
    //$("#btnTrinhPANghiepVuKhac").click(function () {
    //    var obj = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
    //        nghiep_vu: "XE",
    //        pm: CONSTANT_PM,
    //        remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        hanh_dong: "PHUONG_AN"
    //    }
    //    //if (ESCS_MA_DOI_TAC == "OPES") {
    //    //    obj.remove_file = "OPES_DE_XUAT_PHUONG_AN_SC";
    //    //    obj.create_file = "OPES_DE_XUAT_PHUONG_AN_SC";
    //    //}
    //    _modalTrinhDuyetService.show(obj, (type, res) => {
    //        ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
    //        var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
    //        if (trang_thai != null) {
    //            ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
    //        }
    //        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
    //        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
    //        _modalLapPhuongAnSuaChua.hide();
    //    });
    //});
    //$("#btnTrinhPABT").click(function () {
    //    var arrDanhGiaBTV = ho_so_chi_tiet.data_info.btv_danh_gia.firstOrDefault();
    //    if (arrDanhGiaBTV == null || arrDanhGiaBTV.trang_thai != "D") {
    //        _notifyService.error("Bồi thường viên chưa đánh giá");
    //        return;
    //    }
    //    var obj = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    //        loai_trinh: "XE_TRINH_DUYET_DUYET_GIA",
    //        nghiep_vu: "XE",
    //        pm: CONSTANT_PM,
    //        remove_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        create_file: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA",
    //        hanh_dong: "PHUONG_AN_BOI_THUONG_BAO_LANH"
    //    }
    //    if (ho_so_chi_tiet.data_info.lh_nv.where(n => n.nhom != NHOM_LHNV.XE).length > 0) {
    //        obj.remove_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    //        obj.create_file = "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
    //        obj.nghiep_vu_khac = true;
    //    }
    //    if (ESCS_MA_DOI_TAC == "OPES") {
    //        obj.remove_file = "OPES_DE_XUAT_PHUONG_AN_SC,OPES_TO_TRINH_BOI_THUONG";
    //        obj.create_file = "OPES_DE_XUAT_PHUONG_AN_SC,OPES_TO_TRINH_BOI_THUONG";
    //    }
    //    _modalTrinhDuyetService.show(obj, (type, res) => {
    //        ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
    //        var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
    //        if (trang_thai != null) {
    //            ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
    //        }
    //        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet.data_info);
    //        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
    //        _modalLapPhuongAnSuaChua.hide();
    //    });
    //});
    //$("#ModalTrinhDuyet").on('show.bs.modal', function () {
    //    $("#modalLapPhuongAnSuaChua").css("z-index", "1045");
    //});
    //$("#ModalTrinhDuyet").on('hide.bs.modal', function () {
    //    $("#modalLapPhuongAnSuaChua").css("z-index", "1050");
    //});
    $("#frmBoiThuongVienDanhGia input[name='ho_so_day_du']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='ho_so_day_du']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBoiThuongVienDanhGia input[name='nguyen_nhan']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='nguyen_nhan']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBoiThuongVienDanhGia input[name='pham_vi_tt']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='pham_vi_tt']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBoiThuongVienDanhGia input[name='gt_tham_gia_bh']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='gt_tham_gia_bh']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBoiThuongVienDanhGia input[name='tuan_thu']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='tuan_thu']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBoiThuongVienDanhGia input[name='thoi_han_khai_bao']").click(function () {
        $("#frmBoiThuongVienDanhGia input[name='thoi_han_khai_bao']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#btnLuuDongBoiThuongVienDanhGia").click(function () {
        luuThongTinDanhGiaBTV(res => {
            _popoverBoiThuongVienDanhGia.hide();
        });
    });
    $("#btnLuuBoiThuongVienDanhGia").click(function () {
        luuThongTinDanhGiaBTV();
    });
    $("#btnDongBoiThuongVienDanhGia").click(function () {
        _popoverBoiThuongVienDanhGia.hide();
    });
    //Cập nhật lại thuế
    $("#btnCapNhatThue").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _service.layTienBT(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmCapNhatThue.setData(res.data_info);
            $("#frmCapNhatThueGenFileBT").prop("checked", true);
            _modalCapNhatThue.show();
        });
    });
    $("#btnLuuDongCapNhatThue").click(function () {
        _frmCapNhatThue.getControl("hanh_dong").setValue("K");
        luuThueBT(res => {
            _modalCapNhatThue.hide();
        });
    });
    $("#btnLuuDongCapNhatThueThuHuong").click(function () {
        _frmCapNhatThue.getControl("hanh_dong").setValue("C");
        luuThueBT(res => {
            _modalCapNhatThue.hide();
        });
    });
    //$("#btnTinhToanCPKhac").click(function () {
    //    var obj = {
    //        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
    //        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    //    }
    //    _carClaimCommonService.chiPhiKhacHS(obj).then(res => {
    //        if (res.state_info.status !== "OK") {
    //            _notifyService.error(res.state_info.message_body);
    //            return;
    //        }
    //        ESUtil.genHTML("tblTinhToanCPKhacTemplate", "tblTinhToanCPKhac", { data: res.data_info });
    //        _modalTinhToanCPKhac.show();
    //    });
    //});
    //$("#tt_xe_tong_tien_bh").html(ESUtil.formatMoney(tt_xe_tong_tien_bh));
    //$("#tt_xe_tong_tien_mien_thuong").html(ESUtil.formatMoney(tt_xe_tong_tien_mien_thuong));
    //$("#tt_xe_tong_phi").html(ESUtil.formatMoney(tt_xe_tong_phi));
    //$("#btnLuuTinhToanCPKhac").click(function () {
    //    luuTinhToanCPKhac();
    //});
    //$("#btnLuuDongTinhToanCPKhac").click(function () {
    //    luuTinhToanCPKhac(res => {
    //        _modalTinhToanCPKhac.hide();
    //    });
    //});
    //OCR báo giá và hóa đơn
    $("#btnXoaAnhBaoGia").click(function () {
        var arrVal = getImageOCRSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", null, val => {
            _service.xoaAnhHoSoGiamDinh({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal, pm: CONSTANT_PM }).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(response => {
                    if (response !== undefined && response !== null && response.state_info.status === "NotOK") {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Xóa ảnh giám định thành công.");
                });
                layDanhSachHinhAnhBaoGia();
            });
        });
    });
    $("#btnInAnhBaoGia").bind("click", function () {
        var arrVal = getImageOCRSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần in");
            return;
        }
        _commonService.InPdf({
            ma_mau_in: "BT_ANH_TON_THAT",
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            bt: arrVal

        }, "#modalDocumentContents").then(res => {
            ESUtil.convertBase64ToFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf", "application/pdf");
        });
    });
    $("#btnDownLoadAnhBaoGia").click(function () {
        var arrVal = getImageOCRSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (arrVal.length === 1) {
            _service.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "anh_ton_that_" + new Date().toDateString() + extension);
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
            _service.taiFileAnhTonThatZip({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });
    $("#btnUpLoadAnhBaoGia").click(function () {
        _uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            type: "image",
            pm: CONSTANT_PM
        });
        _uploadService.showPupup();
    });
    $('#btnToggleImageView').click(function () {
        $("#dsAnhBaoGiaGara").toggleClass("list");
        if ($("#dsAnhBaoGiaGara").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $("#btnDongThemGaraBaoGia").click(function () {
        _popoverThemBaoGiaBaoGia.hide();
    });
    $("#btnLuuThemGaraBaoGia").click(function () {
        var target = _popoverThemBaoGiaBaoGia.target;
        if (_frmThemGaraBaoGia.isValid()) {
            var json = _frmThemGaraBaoGia.getJsonData();
            if (json.so_id_doi_tuong == null || json.so_id_doi_tuong == "" || json.so_id_doi_tuong == undefined) {
                _notifyService.error("Không xác định được đối tượng tổn thất !");
                return;
            }
            if (json.gara == null || json.gara == "" || json.gara == undefined) {
                _notifyService.error("Không xác định được gara báo giá !");
                return;
            }
            _service.themGaraBaoGia(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia(resCT => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                });
                _notifyService.success("Lưu thông tin gara báo giá thành công");
                var ten_gara = objDanhMuc.gara.where(n => n.ma_doi_tac == json.ma_doi_tac && n.ma == json.gara).firstOrDefault().ten;
                $(target).attr("data-gara", json.gara);
                $(target).attr("data-id-doi-tuong", json.so_id_doi_tuong);
                $(target).html(ten_gara);
                _frmDocOCRBaoGiaGara.setData(json);
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(res1 => {
                    ho_so_chi_tiet = res1;
                });
                _popoverThemBaoGiaBaoGia.hide();
            });
        }
    });
    $("#btnOCRBaoGia").click(function () {
        $("#inputSearchHangMucOCRBaoGia").val("");
        ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: [] }, () => {
            $("#tongSoTienBaoGia").html(0);
            $("#tongSoTienDuyet").html(0);
        });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _service.layGaraBaoGia(obj).then(res => {
            var data = res.data_info.gara;
            if (data.length == 1) {
                var gara = data.firstOrDefault();
                _frmDocOCRBaoGiaGara.setData(gara);
                _frmThemGaraBaoGia.setData(gara);
                $("#tenGaraSuaChua").attr("data-gara", gara.gara);
                $("#tenGaraSuaChua").attr("data-id-doi-tuong", gara.so_id_doi_tuong);
                $("#tenGaraSuaChua").html(gara.ten);
            } else {
                $("#tenGaraSuaChua").attr("data-gara", "");
                $("#tenGaraSuaChua").attr("data-id-doi-tuong", "");
                $("#tenGaraSuaChua").html("Chọn gara sửa chữa");
                _frmDocOCRBaoGiaGara.resetForm();
            }
        });
        layDanhSachHinhAnhBaoGia();
        _modalDocOCRBaoGiaGara.show();
    });
    $("#btnDocOCRBaoGia").click(function () {
        ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: [] }, () => {
            $("#tongSoTienBaoGia").html(0);
            $("#tongSoTienDuyet").html(0);
        });
        var arrVal = getImageOCRSelect();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            bt: arrVal,
            gara: $("#tenGaraSuaChua").attr("data-gara")
        }
        if (arrVal == undefined || arrVal == null || arrVal.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        if (obj.gara == undefined || obj.gara == null || obj.gara == "") {
            _notifyService.error("Bạn chưa chọn gara báo giá sữa chữa");
            return;
        }
        _carClaimCommonService.docOCRBaoGia(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layThongTinOCRBaoGia(obj);
        });
    });
    $("#btnLuuDocOCRBaoGiaGara").click(function () {
        $("#inputSearchHangMucOCRBaoGia").val("");
        $("#inputSearchHangMucOCRBaoGia").trigger("keyup");
        var so_id_doi_tuong = $("#tenGaraSuaChua").attr("data-id-doi-tuong");
        if (so_id_doi_tuong == "" || so_id_doi_tuong == null || so_id_doi_tuong == undefined) {
            _notifyService.error("Bạn chưa chọn đối tượng tổn thất!");
            return;
        }
        var arrBaoGia = layDuLieuOCRBaoGiaGaraLuu();
        var arrBaoGiaMapping = layDuLieuOCRBaoGiaGara();
        var obj = _frmDocOCRBaoGiaGara.getJsonData();
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.so_id_doi_tuong = so_id_doi_tuong;
        obj.lh_nv = ho_so_chi_tiet.data_info.lh_nv[0].ma;
        obj.bt_anh = getImageOCRSelect();
        obj.arr = arrBaoGia;
        obj.data = arrBaoGiaMapping;
        var dem = kiemTraLuuBaoGia(arrBaoGiaMapping, arrBaoGia);
        if (dem == 0) {
            _service.luuThongTinOCRBaoGiaGara(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin báo giá thành công");
                _modalDocOCRBaoGiaGara.hide();
                $("#btnThemHangMucGaraBao").addClass("d-none");
                loadGaraBaoGia(res => {
                    $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
                    anHienNutDuyetPA(res.out_value.phan_cap);
                });

            });
        }
    });
    $("#inputTimKiemHangMucHeThong").keyup(ESUtil.delay(function (e) {
        getPagingBaoGiaHangMucHeThong(1);
    }, 300));
    $("#inputTimKiemHangMucGiamDinh").keyup(ESUtil.delay(function (e) {
        getPagingBaoGiaHangMucGiamDinh(1);
    }, 300));
    $("#inputSearchHangMucOCRBaoGia").keyup(ESUtil.delay(function (e) {
        var val = $("#inputSearchHangMucOCRBaoGia").val().trim();
        var arrTK = layDuLieuOCRBaoGiaGaraTimKiem();
        $("#tblDuLieuOCRBaoGiaGara .dsBaoGiaGaraOCRItem").removeClass("d-none");
        $.each(arrDataBaoGia, function (index, item) {
            $.each(arrTK, function (indexTK, itemTK) {
                if (item.bt == itemTK.bt) {
                    item.bt = itemTK.bt,
                        item.bt_bao_gia = itemTK.bt_bao_gia,
                        item.don_gia = itemTK.don_gia,
                        item.giam_gia = itemTK.giam_gia,
                        item.hang_muc = itemTK.hang_muc,
                        item.loai_tien = itemTK.loai_tien,
                        item.ma_hang_muc_he_thong = itemTK.ma_hang_muc_he_thong,
                        item.ten_hang_muc_he_thong = itemTK.ten_hang_muc_he_thong,
                        item.pt_giam_gia = itemTK.pt_giam_gia,
                        item.so_luong = itemTK.so_luong,
                        item.ten_hang_muc = itemTK.ten_hang_muc,
                        item.thanh_tien = itemTK.thanh_tien,
                        item.tien_duyet = itemTK.tien_duyet,
                        item.tien_khac = itemTK.tien_khac,
                        item.tien_khac_dx = itemTK.tien_khac_dx,
                        item.tien_nhan_cong = itemTK.tien_nhan_cong,
                        item.tien_nhan_cong_dx = itemTK.tien_nhan_cong_dx,
                        item.tien_vat_tu = itemTK.tien_vat_tu,
                        item.tien_vtu_dx = itemTK.tien_vtu_dx,
                        item.tl_khop = itemTK.tl_khop
                }
            });
        });
        ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arrDataBaoGia }, () => {
            var tongSoTienBaoGia = 0;
            var tongSoTienDuyet = 0;
            $.each(arrDataBaoGia, function (index, item) {
                tongSoTienBaoGia += parseInt(item.thanh_tien);
                tongSoTienDuyet += parseInt(item.tien_duyet);
            });
            $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
            $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
        });
        if (val != "") {
            $("#tblDuLieuOCRBaoGiaGara .dsBaoGiaGaraOCRItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblDuLieuOCRBaoGiaGara .dsBaoGiaGaraOCRItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuOCRBaoGiaGaraTimKiem();
            ESUtil.genHTML("tblDuLieuOCRBaoGiaGaraTemplate", "tblDuLieuOCRBaoGiaGara", { data: arr }, () => {
                var tongSoTienBaoGia = 0;
                var tongSoTienDuyet = 0;
                $.each(arr, function (index, item) {
                    tongSoTienBaoGia += parseInt(item.thanh_tien);
                    tongSoTienDuyet += parseInt(item.tien_duyet);
                });
                $("#tongSoTienBaoGia").html(ESUtil.formatMoney(tongSoTienBaoGia));
                $("#tongSoTienDuyet").html(ESUtil.formatMoney(tongSoTienDuyet));
            });
        }
    }, 300));
    //Đọc OCR hóa đơn
    $("#btnDocOCRHoaDon").click(function () {
        arrDuLieuOCRHoaDon = [];
        arrThongTinOCRHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        var chung_tu = ho_so_chi_tiet.data_info.chung_tu;
        _service.layDanhSachFile(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var data = [];
                var ds_giay_to = objDanhMuc.ds_giay_to;
                $.each(res.data_info, function (index, item) {
                    $.each(ds_giay_to, function (index1, item1) {
                        if (item.ma_file == item1.hang_muc && (item1.ma == 'HOA_DON_DIEN_TU' || item1.ma == "HOA_DON_GIAY")) {
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
                _frmOCRHoaDonChungTu.getControl("bt").setValue(arrHD[0].ma);
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
        arrThongTinOCRHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var arrVal = getImageHoaDonOCRSelect();
        var arrHangMuc = getHangMucAnhHoaDon();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: "XE",
            hang_muc: arrHangMuc[0],
            bt: arrVal,
            su_dung_truc_tiep_kqua: "K"
        };
        if (arrVal == undefined || arrVal == null || arrVal.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        _carClaimCommonService.docOCR(obj).then(res => {
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
    //Tách nghiệp vụ hồ sơ
    $("#btnTachNghiepVuHs").click(function () {
        ESUtil.genHTML("modalTachNghiepVuBodyTemplate", "modalTachNghiepVuBody", { data: ho_so_chi_tiet.data_info.lh_nv });
        _modalTachNghiepVu.show();
    });
    $("#btnChapNhanTachNghiepVu").click(function () {
        var lh_nv = layNghiepVuCanTach();
        if (lh_nv == undefined || lh_nv == null || lh_nv.length <= 0) {
            _notifyService.error("Không xác định được loại hình nghiệp vụ cần tách");
            return;
        }
        if (lh_nv.length == ho_so_chi_tiet.data_info.lh_nv.length) {
            _notifyService.error("Số lượng nghiệp vụ cần tách đang cùng với số lượng nghiệp vụ của hồ sơ gốc. Trạng thái không thể tách.");
            return;
        }
        _notifyService.confirm("Bạn có chắc chắn muốn tách nghiệp vụ hồ sơ này không?", "", val => {
            var data = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                kieu_tach: "1",
                lh_nv: lh_nv,
                hanh_dong: 'XEM_CTIET_HO_SO_BT'
            }
            _service.tachNghiepVuHs(data).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                data.so_id = res.out_value.so_id_tach;
                var notify_url = "/carclaim/carcompensation";
                window.open("/carclaim/carinvestigation/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_self');
            });
        });
    });
    //Tự động giá đề xuất
    $("#chk_tu_dong_de_xuat").change(function () {
        var is_checked = $("#chk_tu_dong_de_xuat").is(":checked");
        if (is_checked) {
            ESStorage.setItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT, "C");
        }
        else {
            ESStorage.setItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT, "K");
        }
    });
    $("#chk_tu_dong_gia_goi_y").change(function () {
        var is_checked = $("#chk_tu_dong_gia_goi_y").is(":checked");
        if (is_checked) {
            ESStorage.setItemLocalStorage(keyCache.GIA_TU_DONG, "C");
        }
        else {
            ESStorage.setItemLocalStorage(keyCache.GIA_TU_DONG, "K");
        }

        DS_GIA_TU_DONG = [];
        if (is_checked) {
            capNhapDSGiaTuDong();
        }
    });
    //Tìm kiếm hạng mục báo giá
    $("#inputTimKiemHangMucBaoGia").keyup(ESUtil.delay(function (e) {
        var val = $("#inputTimKiemHangMucBaoGia").val().trim();
        var arrTK = layDuLieuTableBaoGiaGaraTimKiem();
        $("#garaBaoGiaCT .gara_bg_ctiet").removeClass("d-none");
        $.each(arrBaoGiaGara, function (index, item) {
            $.each(arrTK, function (indexTK, itemTK) {
                if (item.bt == itemTK.bt) {
                    item.ghi_chu = itemTK.ghi_chu,
                        item.gia_giam_dinh = itemTK.gia_giam_dinh,
                        item.hang_muc = itemTK.hang_muc,
                        item.loai_hang_muc = itemTK.loai_hang_muc,
                        item.muc_do = itemTK.muc_do,
                        item.muc_do_ten = itemTK.muc_do_ten,
                        item.so_luong = itemTK.so_luong,
                        item.ten_hang_muc = itemTK.ten_hang_muc,
                        item.thay_the_sc = itemTK.thay_the_sc,
                        item.thay_the_sc_ten = itemTK.thay_the_sc_ten,
                        item.tien_duyet = itemTK.tien_duyet,
                        item.tien_dx = itemTK.tien_dx,
                        item.tien_ht_gara = itemTK.tien_ht_gara,
                        item.tien_khac = itemTK.tien_khac,
                        item.tien_khac_dx = itemTK.tien_khac_dx,
                        item.tien_khac_duyet = itemTK.tien_khac_duyet,
                        item.tien_nhan_cong = itemTK.tien_nhan_cong,
                        item.tien_nhan_cong_dx = itemTK.tien_nhan_cong_dx,
                        item.tien_nhan_cong_duyet = itemTK.tien_nhan_cong_dx,
                        item.tien_vat_tu = itemTK.tien_vat_tu,
                        item.tien_vtu_dx = itemTK.tien_vtu_dx,
                        item.tien_vtu_duyet = itemTK.tien_vtu_duyet,
                        item.tl_giam_gia_khac = itemTK.tl_giam_gia_khac,
                        item.tl_giam_gia_nhan_cong = itemTK.tl_giam_gia_nhan_cong,
                        item.tl_giam_gia_vtu = itemTK.tl_giam_gia_vtu,
                        item.tong_cong = itemTK.tong_cong
                }
            });
        });
        ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: arrBaoGiaGara });
        if (val != "") {
            $("#garaBaoGiaCT .gara_bg_ctiet").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#garaBaoGiaCT .gara_bg_ctiet[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuTableBaoGiaGaraTimKiem();
            ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: arr });
        }
    }, 300));
    //Tìm kiếm hạng mục giám định
    $(".inputSearchHangMucGiamDinh").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblPhuongAnVCX .hmChiTietItem").removeClass("d-none");
        ESUtil.genHTML("tblPhuongAnVCXTemplate", "tblPhuongAnVCX", { pa_khac_phuc: arrHangMucTonThat });
        if (val != "") {
            $("#tblPhuongAnVCX .hmChiTietItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblPhuongAnVCX .hmChiTietItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuTablePhuongAnVCXTimKiem();
            ESUtil.genHTML("tblPhuongAnVCXTemplate", "tblPhuongAnVCX", { pa_khac_phuc: arr });
        }
    }, 300));
    $(".inputSearchHangMucTinhToan").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        var arrTK = layDuLieuTableTinhToanVCXTimKiem();
        $("#tblTinhToanVCX .hmTinhToanItem").removeClass("d-none");
        $.each(arrTinhToanBoiThuong, function (index, item) {
            $.each(arrTK, function (indexTK, itemTK) {
                if (item.bt == itemTK.bt) {
                    item.bt = itemTK.bt,
                        item.ten = itemTK.ten,
                        item.vu_tt_ten = itemTK.vu_tt_ten,
                        item.ghi_chu = itemTK.ghi_chu,
                        item.dkbs = itemTK.dkbs,
                        item.gia_duyet = itemTK.gia_duyet,
                        item.gia_khac_duyet = itemTK.gia_khac_duyet,
                        item.gia_nhan_cong_duyet = itemTK.gia_nhan_cong_duyet,
                        item.gia_vtu_duyet = itemTK.gia_vtu_duyet,
                        item.giam_gia = itemTK.giam_gia,
                        item.hang_muc = itemTK.hang_muc,
                        item.lh_giam_gia = itemTK.lh_giam_gia,
                        item.lh_tt_giam_gia = itemTK.lh_tt_giam_gia,
                        item.nguyen_nhan = itemTK.nguyen_nhan,
                        item.pt_bao_hiem = itemTK.pt_bao_hiem,
                        item.pt_giam_tru = itemTK.pt_giam_tru,
                        item.pt_khau_hao = itemTK.pt_khau_hao,
                        item.so_id_doi_tuong = itemTK.so_id_doi_tuong,
                        item.so_id_doi_tuong_cha = itemTK.so_id_doi_tuong_cha,
                        item.tien_con_lai = itemTK.tien_con_lai,
                        item.tien_giam_gia_khac = itemTK.tien_giam_gia_khac,
                        item.tien_giam_gia_nhan_cong = itemTK.tien_giam_gia_nhan_cong,
                        item.tien_giam_gia_vtu = itemTK.tien_giam_gia_vtu,
                        item.tien_ktru_tien_bh = itemTK.tien_ktru_tien_bh,
                        item.tien_thue = itemTK.tien_thue,
                        item.tl_giam_gia_khac = itemTK.tl_giam_gia_khac,
                        item.tl_giam_gia_nhan_cong = itemTK.tl_giam_gia_nhan_cong,
                        item.tl_giam_gia_vtu = itemTK.tl_giam_gia_vtu,
                        item.tl_ktru_tien_bh = itemTK.tl_ktru_tien_bh,
                        item.tl_thue_khac = itemTK.tl_thue_khac,
                        item.tl_thue_nhan_cong = itemTK.tl_thue_nhan_cong,
                        item.tl_thue_vtu = itemTK.tl_thue_vtu,
                        item.vu_tt = itemTK.vu_tt
                }
            });
        });
        console.log(arrTinhToanBoiThuong);
        ESUtil.genHTML("tblTinhToanVCXTemplate", "tblTinhToanVCX", { tinh_toan_bt: arrTinhToanBoiThuong }, () => {
            $(".tblTinhToanVCX_T").addClass("d-none");
            $(".tblTinhToanVCX_S").removeClass("d-none");
            if (arrTinhToanBoiThuong != undefined && arrTinhToanBoiThuong != null && arrTinhToanBoiThuong.length > 0 &&
                arrTinhToanBoiThuong[0].lh_tt_giam_gia != undefined && arrTinhToanBoiThuong[0].lh_tt_giam_gia != null && arrTinhToanBoiThuong[0].lh_tt_giam_gia == "T") {
                $(".tblTinhToanVCX_T").removeClass("d-none");
                $(".tblTinhToanVCX_S").addClass("d-none");
            }
        });
        if (val != "") {
            $("#tblTinhToanVCX .hmTinhToanItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblTinhToanVCX .hmTinhToanItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuTableTinhToanVCXTimKiem();
            ESUtil.genHTML("tblTinhToanVCXTemplate", "tblTinhToanVCX", { tinh_toan_bt: arr }, () => {
                $(".tblTinhToanVCX_T").addClass("d-none");
                $(".tblTinhToanVCX_S").removeClass("d-none");
                if (arr != undefined && arr != null && arr.length > 0 &&
                    arr[0].lh_tt_giam_gia != undefined && arr[0].lh_tt_giam_gia != null && arr[0].lh_tt_giam_gia == "T") {
                    $(".tblTinhToanVCX_T").removeClass("d-none");
                    $(".tblTinhToanVCX_S").addClass("d-none");
                }
            });
        }
    }, 300));
    $("#inputSearchHangMucGiamDinhStep1").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#modalChiTietTonThatGDVCX .hmChiTietItem").removeClass("d-none");
        ESUtil.genHTML("modalChiTietTonThatGDVCXTemplate", "modalChiTietTonThatGDVCX", { danh_sach: arrHangMucTonThat });
        if (val != "") {
            $("#modalChiTietTonThatGDVCX .hmChiTietItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalChiTietTonThatGDVCX .hmChiTietItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuTableGiamDinhVCXTimKiem();
            ESUtil.genHTML("modalChiTietTonThatGDVCXTemplate", "modalChiTietTonThatGDVCX", { danh_sach: arr });
        }
    }, 300));
    $(".inputTimKiemHangMuc_xemToanBoThongTinHSBTXe").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").removeClass("d-none");
        if (val != "") {
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //So sánh báo giá
    $("#btnGaraBaoGiaSoSanh").click(function () {
        var arr_gara = [];
        var arr_doi_tuong = [];
        $("#garaBaoGia input.garaBaoGiaChonItem:checked").each(function (i, el) {
            arr_gara.push($(this).val());
            arr_doi_tuong.push($(this).attr("data-so_id_doi_tuong"));
        });
        if (arr_gara.length <= 0) {
            _notifyService.error("Không có báo giá gara nào được chọn");
            return;
        }
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            gara: arr_gara,
            so_id_doi_tuong: arr_doi_tuong
        }
        _service.laySoSanhBGGara(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            $("#modalSoSanhBaoGiaTable").css("width", "100%");
            if (res.data_info.gara.length > 2) {
                var width = 700 + 300 * res.data_info.gara.length;
                $("#modalSoSanhBaoGiaTable").css("width", width + "px");
            }
            //Chuẩn hóa dữ liệu
            var arr = chuanHoaDuLieuSoSanhBGGara(res.data_info);
            ESUtil.genHTML("modalSoSanhBaoGiaTableTheadTemplate", "modalSoSanhBaoGiaTableThead", { data: res.data_info.gara });
            ESUtil.genHTML("modalSoSanhBaoGiaTableTbodyTemplate", "modalSoSanhBaoGiaTableTbody", { data: arr, gara: res.data_info.gara });
            _modalSoSanhBaoGia.show();
        });
    });
    //Xem QRCode
    $(".btnXemQRCode").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: "XE",
            loai: "HOSO"
        }
        _modalXemQRCode.data = obj;
        _modalXemQRCode.xemFile();
    });
    //Tìm kiếm gara liên kết
    $("#inputSearchGaraHopTac").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#divGaraHopTac .divItemGaraHopTac").removeClass("d-none");
        if (val != "") {
            $("#divGaraHopTac .divItemGaraHopTac").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#divGaraHopTac .divItemGaraHopTac[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $('#btnChonSoHoaDon').click(function () {
        var target = _modalChonSoHoaDon.target;
        var arrInput = $("#modalChonSoHoaDon .modalChonSoHoaDonItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        $(target).val(val);
        _modalChonSoHoaDon.hide();
    });
    //Lưu tỷ lệ thương tật
    $("#btnLuuTLThuongTat").click(function () {
        var obj = _frmTLThuongTat.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.pm = "BT";
        obj.ma_thuong_tat = _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val");
        obj.pttt = _frmTLThuongTatNhap.getControl("pttt").val();
        obj.tien = _frmTLThuongTatNhap.getControl("tien").val();
        obj.ghi_chu = _frmTLThuongTatNhap.getControl("ghi_chu").val();
        if (obj.ma_thuong_tat == undefined || obj.ma_thuong_tat == null || obj.ma_thuong_tat == "") {
            _notifyService.error("Không xác định được mức độ thương tật");
            return;
        }
        _carInvestigationService.nhapThuongTat(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmTLThuongTatNhap.resetForm();
            _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", "");
            _notifyService.success("Lưu mức độ thương tật thành công");
            nhapThuongTat(obj.bt, obj.vu_tt, obj.lh_nv, obj.hang_muc, obj.so_id_doi_tuong, false);
        });
    });
    //Tìm kiếm tỷ lệ thương tật
    $("#inputTimKiemTyLeThuongTat").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeTLTT").jstree('search', val);
        }, 500);
    });
    //Xem video
    $("a.btnXemVideo").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _carClaimCommonService.getListVideo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("modalVideoDanhSachTemplate", "modalVideoDanhSach", { data: res.data_info }, () => {
                $("a.videoLink").click(function () {
                    $("a.videoLink").removeClass("active");
                    $(this).addClass("active");
                });
                if (res.data_info != null && res.data_info.length > 0) {
                    $("a.videoLink")[0].click();
                }
            });
            _modalVideo.show();
        });
    });
    $("#modalVideoClose").click(function () {
        $("#modalVideoView").get(0).pause();
        $("#modalVideoView").get(0).currentTime = 0;
    });
    $("#modalVideoDGRRHDClose").click(function () {
        $("#modalVideoViewDGRRHD").get(0).pause();
        $("#modalVideoViewDGRRHD").get(0).currentTime = 0;
    });
    $("#modalVideoUpload").click(function () {
        $("#inputModalVideoUpload").trigger("click");
    });
    $("#inputModalVideoUpload").on("change", function (e) {
        var file = e.currentTarget.files[0];
        var MB = 100;
        const maxAllowedSize = MB * 1024 * 1024;
        if (file.size > maxAllowedSize) {
            _notifyService.error("File video không được vượt quá " + MB + "MB");
            return;
        }
        var formData = _frmModalVideoUpload.getFormFileData();
        formData.append("ma_doi_tac", ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        formData.append("so_id", ho_so_chi_tiet.data_info.ho_so.so_id);
        _carClaimCommonService.uploadVideo(formData).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var btActive = $("#modalVideoDanhSach a.active").attr("data-bt");
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }
            _carClaimCommonService.getListVideo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("modalVideoDanhSachTemplate", "modalVideoDanhSach", { data: res.data_info }, () => {
                    $("a.videoLink").click(function () {
                        $("a.videoLink").removeClass("active");
                        $(this).addClass("active");
                    });
                    $("a.videoLink").removeClass("active");
                    $("#modalVideoDanhSach a.videoLink[data-bt='" + btActive + "']").addClass("active");
                });
            });
        });
    });
    $("#close_popNhapTenFile").click(function () {
        _popoverNhapTenFile.hide();
    });
    $("#luuNhapTenFile").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            bt: $("#modalVideoDanhSach a.active").attr("data-bt"),
            ten: $("#inputNhapTenFile").val()
        }
        if (obj.ten == undefined || obj.ten == null || obj.ten == "") {
            _notifyService.error("Bạn chưa nhập tên file");
            return;
        }
        _carClaimCommonService.suaTenVideo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Cập nhật tên video thành công.");
            $("#modalVideoDanhSach a.active").text(obj.ten);
            _popoverNhapTenFile.hide();
            //load lại danh sách
        });
    });
    // xem video DGRR hợp đồng
    $("a.btnXemVideoDGRRHD").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt
        }
        _carClaimCommonService.getListVideo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("modalVideoDanhSachDGRRHDTemplate", "modalVideoDanhSachDGRRHD", { data: res.data_info }, () => {
                $("a.videoLinkDGRRHD").click(function () {
                    $("a.videoLinkDGRRHD").removeClass("active");
                    $(this).addClass("active");
                });
                if (res.data_info != null && res.data_info.length > 0) {
                    $("a.videoLinkDGRRHD")[0].click();
                }
            });
            _modalVideoDGRRHD.show();
        });
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