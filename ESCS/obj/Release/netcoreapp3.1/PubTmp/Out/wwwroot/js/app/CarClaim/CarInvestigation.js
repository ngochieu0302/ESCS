/// <reference path="../../common/navtabservice.js" />
/// <reference path="../../common/gridviewservice.js" />
/// <reference path="../commonservice.js" />
/// <reference path="../../common/formservice.js" />
/// <reference path="../../common/notifyservice.js" />
/// <reference path="../../common/buttonservice.js" />
/// <reference path="../../common/selectcheckboxservice.js" />
/// <reference path="services/carinvestigationservice.js" />

var ESCS_TIEN_BH_TNDS_NGUOI = 150000000;
const AN_HIEN_TRANG_THAI_HO_SO = true;
const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'GD'; //Giám định
const MAN_HINH = "GIAM_DINH";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_CHI_NHANH = $("#escs_ma_chi_nhanh").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var HANG_MUC_TOP = 50;
var arrHangMucTT = [];
var arrBaoGiaGara = [];
var arrDataBaoGia = [];
var arrChiNhanhTKiem = [];
var arrNoiDung = [];
var arrDataOCR = [];
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var DS_GIA_TU_DONG = [];

var HANG_MUC_PHAN_LOAI_CUOI_CUNG = null;
var ANH_CHON_CUOI_CUNG = null;
var nhom_y_kien = "";
var data_nsd_cho_yk = "";
var y_kien_chi_tiet = {};

const NHOM_LHNV = {
    XE: "VCX",
    NNTX: "NNTX",
    LPHU_XE: "LPHU_XE",
    NGUOI: "NG",
    HANG_HOA: "HH",
    TNDS: "TNDS"
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
    TU_DONG_GIA_XE_XUAT: "TU_DONG_GIA_XE_XUAT"
}
const THOI_HAN_BANG_LAI = [
    { hang_gplx: "A4", nam_sd: 10 },
    { hang_gplx: "B2", nam_sd: 10 },
    { hang_gplx: "B1", nam_sd: 10 },
    { hang_gplx: "C", nam_sd: 5 },
    { hang_gplx: "D", nam_sd: 5 },
    { hang_gplx: "E", nam_sd: 5 },
    { hang_gplx: "F", nam_sd: 5 },
    { hang_gplx: "FC", nam_sd: 5 }
];

const TINH_TRANG_TNDS = [
    { ten: "Thương", ma: "THUONG" },
    { ten: "Chết", ma: "CHET" },
    { ten: "Hỏng", ma: "HONG" },
];

let autocomplete;
let autocomplete1;
let _frmDienBienTonThat_dia_diem;
let _frmThongTinGiamDinh_dia_diem;

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

var arrNghiepVu = [
    { ma: "GD", ten: "Giám định", nv: "XE" },
    { ma: "BT", ten: "Bồi thường", nv: "XE" },
    { ma: "TN", ten: "Tiếp nhận", nv: "NG" },
    { ma: "BL", ten: "Bảo lãnh", nv: "NG" },
    { ma: "TT", ten: "Tính toán", nv: "NG" }
]

var arrNV_CT = [
    { ma: "KIEN_NGHI", ten: "Kiến nghị giải quyết", nv: "XE", pm: "GD" },
    { ma: "TRINH_DUYET_GD", ten: "Trình báo cáo giám định", nv: "XE", pm: "GD" }
]

var NAM_SAN_XUAT = [];
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}

var connectionChatHoSo = null;
var ho_so_click_dau_tien = { so_id: null, lan: 0 };
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var objDanhMuc = {};
var arrTrangThai = [];
var objDanhMucDonViHanhChinh = [];
var ho_so_chi_tiet = null;
var tthai_vu_tt = "xem";
var tthai_lan_gd = "xem";
var ds_hmtt = [];
var carClaimTabShow = "";
var ds_anh_gd = [];
var gd_chon_anh_arr = [];
var su_kien_bh_chon = [];
var elementDanhGia;

var configColumn = [
    { field: "kh_vip", title: "*", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nguon_tb", title: "Nguồn", width: "5%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái HS", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "pt_hoan_thanh", title: "% hoàn thành", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "so_hs", title: "Số hồ sơ", width: "16%", headerSort: false, hozAlign: "center" },
    { field: "nsd", title: "BTV/GĐVTT", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ma_gdvht", title: "GĐV hiện trường", width: "12%", hozAlign: "center", headerSort: false },
    { field: "doi_tuong", title: "Biển xe", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_kh", title: "Tên khách hàng", width: "12%", headerSort: false },
    { field: "so_tien", title: "Số tiền TT", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "so_vu", title: "Số vụ", width: "6%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý", width: "13%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "13%", hozAlign: "center", headerSort: false },
    { field: "nv", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số HĐBH", width: "10%", hozAlign: "center", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "8%", hozAlign: "center", headerSort: false },
    { field: "so_id", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];
var configColumnTkiemXe = [
    { field: "bien_xe", title: "Biển số xe", hozAlign: "center", width: "100", headerSort: false },
    { field: "gcn", title: "Số giấy chứng nhận", hozAlign: "center", width: "145", headerSort: false },
    { field: "nghiep_vu", title: "Nghiệp vụ", hozAlign: "center", width: "100", headerSort: false },
    { field: "ngay_hl", title: "Hiệu lực bảo hiểm", width: "135", headerSort: false },
    { field: "ten", title: "Tên khách hàng", width: "250", headerSort: false },
    { field: "ten_chu_xe", title: "Tên chủ xe", width: "250", headerSort: false },
    { field: "ten_dvi_cap_don", title: "Đơn vị cấp đơn", width: "400", headerSort: false }
];
var configColumnQuyen = [{
    headerSort: false,
    field: "ten_chuc_nang",
    title: "Tên chức năng",
    width: "550"
},
{
    headerSort: false,
    headerClick: headerCheckBoxAllClick,
    field: "nhap",
    title: headerCheckBoxAllTemplate("Nhập", "nhap", "gridViewQuyen"),
    width: "100",
    align: "center",
    formatter: cellCheckBoxTemplate,
    cellClick: cellCheckBoxClick
},
{
    headerSort: false,
    headerClick: headerCheckBoxAllClick,
    field: "xem",
    title: headerCheckBoxAllTemplate("Xem", "xem", "gridViewQuyen"),
    width: "100",
    align: "center",
    formatter: cellCheckBoxTemplate,
    cellClick: cellCheckBoxClick
}
];
var configColumnDonVi = [{
    headerSort: false,
    headerClick: headerCheckBoxAllClick,
    field: "chon",
    title: headerCheckBoxAllTemplate("Chọn", "chon", "gridViewDonVi"),
    width: "80",
    align: "center",
    formatter: cellCheckBoxTemplate,
    cellClick: cellCheckBoxClick
},
{
    headerSort: false,
    field: "ten",
    title: "Tên chi nhánh",
    width: "420"
},
{
    headerSort: false,
    field: "ten_dtac",
    title: "Đối tác",
    width: "260"
},
];
var option = {
    group_name: "ma_ct",
    dispay_name: "ten",
    value_name: "ma",
    z_index: 9999999,
    width_box: 250,
    height_box: 240,
    single_checked: true,
    placeholder: "Click để chọn",
    title: "Chọn hạng mục tổn thất",
    onChecked: function (arr) {
        _frmThemHMTT.getControl("thay_the_sc").setValue("");
        _frmThemHMTT.getControl("thu_hoi").setValue("");
        _frmThemHMTT.getControl("chinh_hang").setValue("K");
        if (arr.length > 0) {
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.ma == arr[0].ma).firstOrDefault();
            if (muc_do.pa_khac_phuc == "T") {
                _frmThemHMTT.getControl("thay_the_sc").setValue("T");
                _frmThemHMTT.getControl("thu_hoi").setValue("C");
            }
            else {
                _frmThemHMTT.getControl("thay_the_sc").setValue("S");
                _frmThemHMTT.getControl("thu_hoi").setValue("K");
            }

        }
        layChiPhiTuDong();
    }
};
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
        getAnhThumnail();
    }
};
var _commonService = new CommonService();
var _service = new CarInvestigationService();
var _notifyService = new NotifyService();
var _eschat = new ESChat();
var _esSendEmail = new ESSendEmail();
var _modalDocumentService = new ModalDocumentService();
var _carClaimCommonService = new CarClaimCommonService();
var _carCompensationService = new CarCompensationService();
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
var _printedService = new PrintedService();
var _unitService = new UnitService();
var _carContractService = new CarContractService();
var _configurationObjectGroupService = new ConfigurationObjectGroupService();
var _companyInvestigationService = new CompanyInvestigationService();
var _carManufacturerListService = new CarManufacturerListService()
var _hieuXeService = new HieuXeService();
var _rangeVehicleService = new RangeVehicleService();
var _viewImagesService = new ViewImagesService();
var _storageUnitService = new StorageUnitService();

var _modalViewFile = new ModalService("modalViewFile");
var _modalCarSearch = new ModalService("modalCarSearch");
var _modalCarCustomerInfo = new ModalService("modalCarCustomerInfo");
var _modalThongTinNguoiLienHe = new ModalService("modalThongTinNguoiLienHe");
var _modalXemThongTinChungNhan = new ModalService("modalXemThongTinChungNhan");
var _modalThongTinLaySoHS = new ModalService("modalThongTinLaySoHS");
var _modalSuaGCN = new ModalService("modalSuaGCN");
var _modalBenThamGiaGiamDinh = new ModalService("modalBenThamGiaGiamDinh");
var _modalChuyenNguoiXuLy = new ModalService("modalChuyenNguoiXuLy");
var _modalChuyenNguoiXuLyGDVHT = new ModalService("modalChuyenNguoiXuLyGDVHT");
var _modalHuyHoSo = new ModalService("modalHuyHoSo");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "stepHinhAnhHoSo");
var _modalGaraList = new ModalService("modalGaraList", "Danh sách Gara");
var _modalXemDiaBanGiamDinh = new ModalService("modalXemDiaBanGiamDinh");
var _modalViewImages = new ModalService("modalViewImages");
var _modalTroChuyenGDV = new ModalService("modalTroChuyenGDV");
var _modalThemChiTietTNDS = new ModalService("modalThemChiTietTNDS");
var _modalThemChiTietTNDSNguoi = new ModalService("modalThemChiTietTNDSNguoi");
var _modalMap = new ModalMapService("modalMap", "stepHinhAnhHoSo");
var _modalCarClaimCompareData = new ModalFullScreenService("modalCarClaimCompareData", "stepHinhAnhHoSo");
var _modalCarClaimCompareDataGPLX = new ModalFullScreenService("modalCarClaimCompareDataGPLX", "stepHinhAnhHoSo");
var _modalCarClaimCompareDataDangKiem = new ModalFullScreenService("modalCarClaimCompareDataDangKiem", "stepHinhAnhHoSo");
var _modalTrinhDuyetService = new ModalTrinhDuyetService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalBaoCaoService = new ModalBaoCaoService("Báo cáo bảo hiểm xe cơ giới", "XE", "BC_XE_GD");
var _modalRadio = new ModalDragService("modalRadio", undefined, "bottom");
var _modalCheckbox = new ModalDragService("modalCheckbox", undefined, "top");
var _modalDviTinh = new ModalDragService("modalDviTinh", undefined, "bottom");
var _modalMucDoTT = new ModalDragService("modalMucDoTT", undefined, "bottom");
var _modalCarFlowChart = new ModalService("modalCarFlowChart");
var _modalLoaiHSGT = new ModalDragService("modalLoaiHSGT", undefined, "bottom");
var _modalAddDoiTuongTT = new ModalService("modalAddDoiTuongTT");
var _modalDanhSachChiPhiGDLan = new ModalService("modalDanhSachChiPhiGDLan");
var _modalChonDoiTuongTT = new ModalDragService("modalChonDoiTuongTT", undefined, "right");
var _modalChonDoiTuongTTTab4_1 = new ModalDragService("modalChonDoiTuongTTTab4_1", undefined, "right");
var _modalLoaiChiPhiLanGD = new ModalDragService("modalLoaiChiPhiLanGD", undefined, "bottom");
var _modalChonNoiDung = new ModalDragService("modalChonNoiDung", undefined, "bottom");
var _modalSuKienBH = new ModalService("modalSuKienBH");
var _modalAddChiPhiKhac = new ModalService("modalAddChiPhiKhac");
var _modalTaoNoiDung = new ModalService("modalTaoNoiDung");
var _modalGuiMailDGHT = new ModalService("modalGuiMailDGHT");
var _modalXacMinhPhiService = new ModalXacMinhPhiService();
var _modalTrinhXinYKien = new ModalTrinhXinYKienService();
var _modalDsLHNVLaySoHS = new ModalDragService("modalDsLHNVLaySoHS", undefined, "right");
var _modalDsLHNV = new ModalDragService("modalDsLHNV", undefined, "right");
var _modalHangGPLX = new ModalDragService("modalHangGPLX", undefined, "left");
var _modalSLAFlowChart = new ModalService("modalSLAFlowChart");
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalHangMucTonThat = new ModalDragService("modalHangMucTonThat", undefined, "bottom");
var _modalTimKiemNangCao = new ModalService("modalTimKiemNangCao");
var _modalXemQRCode = new ModalXemQRCode();
var _modalXemHinhAnhCTiet = new ModalFullScreenService("modalXemHinhAnhCTiet", "");
var _modalLichSuYeuCauBSHS = new ModalService("modalLichSuYeuCauBSHS");
var _modalTLThuongTat = new ModalService("modalTLThuongTat");
var _modalLapPhuongAnSuaChua = new ModalService("modalLapPhuongAnSuaChua");
var _modalGiamGiaPA = new ModalService("modalGiamGiaPA");
var _modalKhauTruPA = new ModalService("modalKhauTruPA");
var _modalThuePA = new ModalService("modalThuePA");
var _modalTinhToanCPKhac = new ModalService("modalTinhToanCPKhac");
var _modalSoSanhBaoGia = new ModalService("modalSoSanhBaoGia");
var _modalVideo = new ModalService("modalVideo");
var _modalVideoDGRRHD = new ModalService("modalVideoDGRRHD");
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");
var _frmAddLicenseInfo = new FormService("frmAddLicenseInfo");
var _frmAddRegistryInfo = new FormService("frmAddRegistryInfo");
var _frmTimKiemHoSo = new FormService("frmTimKiemHoSo");
var _modalSoSanhDGRR = new ModalSoSanhDGRRService()
var _modalThongTinHoSoService = new ModalThongTinHoSoService();
var _modalLapPhuongAnSuaChuaService = new ModalLapPhuongAnSuaChuaService();

_frmTimKiemHoSo.getControl("gdvtt").setDataSource([{ ma: ESCS_NSD, ten: "Hồ sơ cá nhân" }], "ten", "ma", "Tất cả", ESCS_NSD);

var _frmCarClaimCarSearch = new FormService("frmCarClaimCarSearch");
var _frmCarClaimCustomerInfo = new FormService("frmCarClaimCustomerInfo");
var _frmThongTinNguoiLienHe = new FormService("frmThongTinNguoiLienHe");
var _frmDienBienTonThat = new FormService("frmDienBienTonThat");
var _frmThongTinGiamDinh = new FormService("frmThongTinGiamDinh");
var _frmBenThamGiaGiamDinh = new FormService("frmBenThamGiaGiamDinh");
var _frmDanhGiaTonThat = new FormService("frmDanhGiaTonThat");
var _frmChuyenNguoiXuLy = new FormService("frmChuyenNguoiXuLy");
var _frmChuyenNguoiXuLyGDVHT = new FormService("frmChuyenNguoiXuLyGDVHT");
var _frmHuyHoSo = new FormService("frmHuyHoSo");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmTKiemGara = new FormService("frmTKiemGara");
var _frmTimKiemGDV = new FormService("frmTimKiemGDV");
var _frmBsBenThamGiaGD = new FormService("frmBsBenThamGiaGD");
var _frmThemTNDS = new FormService("frmThemTNDS");
var _frmThemTNDSNguoi = new FormService("frmThemTNDSNguoi");
var _frmToaDoAnh = new FormService("frmToaDoAnh");
var _frmNgayChup = new FormService("frmNgayChup");
var _frmCarClaimCompareDataGPLX = new FormService("frmCarClaimCompareDataGPLX");
var _frmCarClaimCompareDataDangKiem = new FormService("frmCarClaimCompareDataDangKiem");
var _frmPhanLoaiNhanh = new FormService("frmPhanLoaiNhanh");
var _frmDanhGiaHienTruong = new FormService("frmDanhGiaHienTruong");
var _frmChiTietTonThat = new FormService("frmChiTietTonThat");
var _frmAddDoiTuongTT = new FormService("frmAddDoiTuongTT");
var _frmDanhSachChiPhiGDLan = new FormService("frmDanhSachChiPhiGDLan");
var _frmSuKienBH = new FormService("frmSuKienBH");
var _frmTKiemSuKienBH = new FormService("frmTKiemSuKienBH");
var _frmBaoCaoGD = new FormService("frmBaoCaoGD");
var _frmXemThongTinBaoGiaPhuongAn = new FormService("frmXemThongTinBaoGiaPhuongAn");
var _frmAddChiPhiKhac = new FormService("frmAddChiPhiKhac");
var _frmTKiemChiPhiKhac = new FormService("frmTKiemChiPhiKhac");
var _frmTaoNoiDung = new FormService("frmTaoNoiDung");
var _frmSuaGCN = new FormService("frmSuaGCN");
var _frmDanhGiaTNDSTAISAN = new FormService("frmDanhGiaTNDSTAISAN");
var _frmTLThuongTat = new FormService("frmTLThuongTat");
var _frmTLThuongTatNhap = new FormService("frmTLThuongTatNhap");
var _frmTaoHDAo = new FormService("frmTaoHDAo");
var _frmChonGaraSuaChuaSearch = new FormService("frmChonGaraSuaChuaSearch");
var _frmTkiemTLThuongTat = new FormService("frmTkiemTLThuongTat");
var _frmTinhToanBoiThuongPA = new FormService("frmTinhToanBoiThuongPA");
/*Báo giá gara*/
var _frmBaoGiaGara = new FormService("frmBaoGiaGara");
var _frmThemGara = new FormService("frmThemGara");
var _frmGaraHopTac = new FormService("frmGaraHopTac");
var _frmSelectedGara = new FormService("frmSelectedGara");
var _frmHangMucBoSung = new FormService("frmHangMucBoSung");
var _frmThemGaraBaoGia = new FormService("frmThemGaraBaoGia");
var _frmDocOCRBaoGiaGara = new FormService("frmDocOCRBaoGiaGara");
var _frmModalVideoUpload = new FormService("frmModalVideoUpload");

var _selectCheckBoxService = new SelectCheckBoxService("frmThemHMTT_muc_do", option);
var _navBoiThuong = new NavTabService("navBoiThuong", ["stepDienBienTonThat", "stepThongTinGiamDinh", "stepHinhAnhHoSo", "stepDanhGiaTonThat"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navThongTinLienHe", "navQuaTrinhGiaiQuyet", "navLichSuTonThat"], "nav-tabs-timeline");
var _navDanhGiaTonThat = new NavTabService("navDanhGiaTonThat", ["tabDGTTThongTinChung", "tabDGTTKhaiBaoHangMuc"], "nav-pills");
var _navBaoCaoGD = new NavTabService("navBaoCaoGD", ["navBaoCaoGD_DGHT", "navBaoCaoGD_BCGD"], "nav-pills");

var _addLicenseInfoModal = new ModalFullScreenService("addLicenseInfoModal", "");
var _addRegistryInfoModal = new ModalFullScreenService("addRegistryInfoModal", "");
var _addBenThamGiaGiamDinhModal = new ModalFullScreenService("addBenThamGiaGiamDinhModal", "");
var _popoverAddLicenseInfo = new PopoverService("popoverAddLicenseInfo");
var _popoverAddRegistryInfo = new PopoverService("popoverAddRegistryInfo");
var _popupoverDoiChieuGPLXOCR = new PopoverService("popupoverDoiChieuGPLXOCR");
var _popoverTyLeThuongTat = new PopoverService("popoverTyLeThuongTat");
var _popoverGhiChu = new PopoverService("popoverGhiChu");
var _popoverMoTa = new PopoverService("popoverMoTa");
var _popoverNDGiamDinh = new PopoverService("popoverNDGiamDinh");
var _popoverGhiChuNoiDungCPGD = new PopoverService("popoverGhiChuNoiDungCPGD");
var _popoverGhiChuBaoGia = new PopoverService("popoverGhiChuBaoGia");
var _popoverChonGaraSuaChua = new PopoverService("popoverChonGaraSuaChua");
var _popoverNhapTenFile = new PopoverService("popoverNhapTenFile");
/*Báo giá gara*/
var _popoverHangMucBoSung = new PopoverService("popoverHangMucBoSung");
var _popoverThemBaoGiaBaoGia = new PopoverService("popoverThemBaoGiaBaoGia");
var _modalDocOCRBaoGiaGara = new ModalService("modalDocOCRBaoGiaGara");
var _modalBaoGiaChonHangMucTonThat = new ModalDragService("modalBaoGiaChonHangMucTonThat", undefined, "");

var _gridViewHoSoGiamDinh = new GridViewService("gridViewHoSoGiamDinh", configColumn, getPaging, rowClick);
var _navTabTimKiemXe = new NavTabService("navTabTimKiemXe", ["tabTimKiemXe", "tabThongTinLienHe"], "quy-trinh");
var _uploadService = new UploadService(configUpload);

function changeTabTKiemXe(tab) {
    var currentTab = _navTabTimKiemXe.currentTab;
    if (currentTab == "tabTimKiemXe") {
        $("#btnTiepTheo").trigger("click");
    } else {
        _navTabTimKiemXe.showTab(tab);
    }
}
function hthiMauPhamViBaoHiem(pham_vi = undefined) {
    if (pham_vi == undefined) {
        $("form[name='frmDienBienTonThat'] input[name='ly_do']").css("background-color", "#e9ecef");
        return;
    }
    if (pham_vi == "1") {
        $("form[name='frmDienBienTonThat'] input[name='ly_do']").css("background-color", "#d4edda");
        return;
    }
    if (pham_vi == "0") {
        $("form[name='frmDienBienTonThat'] input[name='ly_do']").css("background-color", "#f8d7da");
        return;
    }
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
function hideModalTimKiemXe() {
    $("#modalCarSearch").modal("hide");
}
function bindDataDienBienTonThat(res, showTab = true) {
    ho_so_chi_tiet = res;
    _uploadService.setParam({
        ma_doi_tac: res.data_info.ho_so.ma_doi_tac,
        so_id: res.data_info.ho_so.so_id,
        type: "image",
        pm: CONSTANT_PM
    });
    _frmDanhGiaTonThat.resetForm();
    _frmThemHMTT.getControl("lh_nv").setDataSource(ho_so_chi_tiet.data_info.lh_nv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
    _frmThemHMTT.getControl("ma_kho").setDataSource(objDanhMuc.ds_kho_luu_tru, "ten", "ma", "Chọn kho lưu trữ", "");
    _frmDanhGiaTonThat.getControl("so_id").val(res.data_info.ho_so.so_id);
    $("#navThongTinChung").bindJsonToHtml(res.data_info.ho_so);
    $("#navThongTinChung #ttchung_dien_thoai").attr("href", "javascript:void(0)");
    if (res.data_info.ho_so.dien_thoai !== undefined && res.data_info.ho_so.dien_thoai !== null && res.data_info.ho_so.dien_thoai !== "") {
        $("#navThongTinChung #ttchung_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dien_thoai + "')");
    }
    $("#navThongTinLienHe").bindJsonToHtml(res.data_info.ho_so);
    $("#navThongTinLienHe #ttNguoiThongBao_dien_thoai").attr("href", "javascript:void(0)");
    if (res.data_info.ho_so.dthoai_tb !== undefined && res.data_info.ho_so.dthoai_tb !== null && res.data_info.ho_so.dthoai_tb !== "") {
        $("#navThongTinLienHe #ttNguoiThongBao_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dthoai_tb + "')");
    }
    $("#navThongTinLienHe #ttNguoiLienHe_dien_thoai").attr("href", "javascript:void(0)");
    if (res.data_info.ho_so.dthoai_lhe !== undefined && res.data_info.ho_so.dthoai_lhe !== null && res.data_info.ho_so.dthoai_lhe !== "") {
        $("#navThongTinLienHe #ttNguoiLienHe_dien_thoai").attr("onclick", "ESUtil.voiceCall('" + res.data_info.ho_so.dthoai_lhe + "')");
    }
    ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: res.data_info.ho_so });

    _frmDienBienTonThat.getControl("dang_kiem_so").val("");
    _frmDienBienTonThat.getControl("dang_kiem_hl").val("");
    _frmDienBienTonThat.getControl("dang_kiem_kt").val("");

    if (res.data_info.dien_bien.length <= 0) {
        tthai_vu_tt = "them_moi";
        $("#btnThemMoiVuTonThat").attr("disabled", "disabled");
        $("#btnHuyThaoTac").show();
        $("#btnXoaDienBienTonThat").hide();

        showDsVuTonThat([{ gio_xr: "", ngay_xr: "//", so_id: res.data_info.ho_so.so_id }]);
        _frmDienBienTonThat.resetForm();
        _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val", "");
        _frmDienBienTonThat.getControl("gio_xr").val(gioHT);
        _frmDienBienTonThat.getControl("ngay_xr").val(dateNow);
        _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        setStyleVuTTSelect("");
        if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe === "QH.0002") {
            _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_tb);
            _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_tb);
            _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_tb);
        }
        hthiMauPhamViBaoHiem();
    }
    else {
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
        hthiMauPhamViBaoHiem(res.data_info.dien_bien[0].pham_vi);
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("href", "javascript:void(0)");
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("onclick", "ESUtil.voiceCall('" + _frmDienBienTonThat.getControl("dthoai_lxe").val() + "')");
        setStyleVuTTSelect(res.data_info.dien_bien[0].vu_tt);
    }
    _frmDienBienTonThat.getControl("so_id").val(res.data_info.ho_so.so_id);
    if (showTab) {
        _navBoiThuong.showTab("stepDienBienTonThat");
    }
    /*    bindDataTableKNGQ(res.data_info.kien_nghi);*/
    if (ho_so_click_dau_tien.so_id === ho_so_chi_tiet.data_info.ho_so.so_id) {
        ho_so_click_dau_tien.lan += 1;
    } else {
        ho_so_click_dau_tien.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        ho_so_click_dau_tien.lan = 1;
    }
    loadDanhSachHoSoGiayTo();
    loadDanhSachHoSoGiayToLoi();
    ganTrangThaiHoSo();
    $("#btnNhanHoSoTuCCCT").addClass("d-none");
    if (ho_so_chi_tiet.data_info.ho_so.ngay >= 30000101) {
        $("#btnNhanHoSoTuCCCT").removeClass("d-none");
    }
    _frmDanhGiaTonThat.getControl("gara").setValue(ho_so_chi_tiet.data_info.ho_so.gara);
    _frmDanhGiaTonThat.getControl("y_kien").val(ho_so_chi_tiet.data_info.ho_so.y_kien);
    _frmDanhGiaTonThat.getControl("y_kien_kh").val(ho_so_chi_tiet.data_info.ho_so.y_kien_kh);
    _frmDanhGiaTonThat.getControl("danh_gia_gdv").val(ho_so_chi_tiet.data_info.ho_so.danh_gia_gdv);

    showModalBoiThuong();
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
        $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
    }
    if (ho_so_chi_tiet !== undefined && ho_so_chi_tiet !== null) {
        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
    }
    anHienDuyetBCGD();
}
function rowClick(data, row) {
    $("#btnLapPASC").addClass("d-none");
    $("#btnLapPhuongAnGia").addClass("d-none");
    $("#btnThemChiPhiKhac").addClass("d-none");
    $("#btnLuuCTGiamDinh").addClass("d-none");
    $("#btnHuyThaoTac").hide();
    $("#btnThemMoiVuTonThat").removeAttr("disabled");
    _navThongTinHoSo.showTab("navThongTinChung");
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
        $("#btnXemToaDoThucTe").addClass("d-none");
        ho_so_chi_tiet = res;
        if (ho_so_chi_tiet.data_info.ho_so.gdv_bao_gia == "C" && ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd < 30000101) {
            $("#btnLapPhuongAnGia").removeClass("d-none");
            $("#btnLapPASC").removeClass("d-none");
            $("#btnThemChiPhiKhac").removeClass("d-none");
        }

        _frmAddDoiTuongTT.getControl("nhom").setDataSource(dsNhomDoiTuongTheoLHNV(), "ten_nhom_doi_tuong", "doi_tuong", "Chọn nhóm đối tượng", "");

        bindDataDienBienTonThat(res);
        bindPhanLoaiHangMucCT();
        ESUtil.genHTML("navDanhGiaNghiepVuTemplate", "navDanhGiaNghiepVu", { danh_sach: ho_so_chi_tiet.data_info.lh_nv });
        if (row !== undefined) {
            row.select();
        }
        showStep("stepDienBienTonThat");
        hienThiChatVoiGiamDinhVien();

        if (ho_so_chi_tiet.data_info.ho_so.nhom_kh_vip == 'C') {
            $("#chonKhachHangVip").removeClass('defaultColor');
            $("#chonKhachHangVip").addClass('active-star');
        } else {
            $("#chonKhachHangVip").addClass('defaultColor');
            $("#chonKhachHangVip").removeClass('active-star');
        }
        _carClaimCommonService.LayLichSuXinYKien({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, nghiep_vu: 'XE' }).then(res_yk => {
            if (res_yk.state_info.status != 'OK') {
                _notifyService.error(res_yk.state_info.message_body);
                return;
            }
            objDanhMuc.lsXinYKien = res_yk.data_info;
        });
        ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.data_info.canh_bao });
        _carClaimCommonService.danhSachCanhBao(objGetDetail).then(res1 => {
            ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
        });
        _frmThemGara.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.nhom == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE")[0].so_id_doi_tuong : "");
        _frmGaraHopTac.getControl("so_id_doi_tuong").setDataSource(res.data_info.ds_doi_tuong.where(n => n.loai == "XE" || n.loai == "XE"), "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", (res.data_info.ds_doi_tuong != null && res.data_info.ds_doi_tuong.where(n => n.loai == "XE").length > 0) ? res.data_info.ds_doi_tuong.where(n => n.loai == "XE")[0].so_id_doi_tuong : "");
    });
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
    var objTimKiem = _frmTimKiemHoSo.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    objTimKiem.ma_chi_nhanh = _frmTimKiemHoSo.getControl("ma_chi_nhanh").attr("data-val");
    _service.timKiemHoSo(objTimKiem).then(res => {
        _gridViewHoSoGiamDinh.setDataSource(res, trang, GRID_HO_SO_SO_DONG);
    });
}
function formatterTrangThai(cell, formatterParams, onRendered) {
    switch (cell.getValue()) {
        case null:
            return '<span class="badge badge-pill badge-danger">Không xác định</span>'
        default:
            return "";
    }
}
function timKiemXe() {
    var objSearch = _frmCarClaimCarSearch.getJsonData();
    if (objSearch.ngay_xr == "") {
        _notifyService.error("Bạn chưa nhập ngày xảy ra tổn thất");
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
            _notifyService.error("THÔNG BÁO TỪ CORE BẢO HIỂM:\n" + res.state_info.message_body);
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
function rowClickTkiemXe(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.bien_xe === undefined) {
        return;
    }
    row.select();
}
function selectCar(obj = undefined) {
    _frmCarClaimCustomerInfo.clearErrorMessage();
}
function bindDataThongTinNguoiLienHe() {
    var obj = ESUtil.cloneObject(ho_so_chi_tiet.data_info.ho_so);
    var ngay_tb_tmp = obj.ngay_tb.split(" ");
    obj.ngay_tb = ngay_tb_tmp[0].dateToNumber();
    obj.gio_tb = ngay_tb_tmp[1];
    _frmThongTinNguoiLienHe.setData(obj);
    $("#chkThamGiaLienHeUpdate").prop("checked", false);
    if (obj.nguoi_tb === obj.nguoi_lhe && obj.moi_qh_tb === obj.moi_qh_lhe && obj.dthoai_tb === obj.dthoai_lhe && obj.email_tb === obj.email_lhe) {
        $("#chkThamGiaLienHeUpdate").prop("checked", true);
        setNguoiLienHeCapNhat();
    }
    _modalThongTinNguoiLienHe.show();
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
    var data = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt == vu_tt).firstOrDefault();

    $("#btnXemToaDoThucTe").attr("data-x", "0");
    $("#btnXemToaDoThucTe").attr("data-y", "0");
    $("#btnXemToaDoThucTe").addClass("d-none");
    if (data !== undefined && data !== null) {
        $("#btnXemToaDoThucTe").attr("data-x", data.x);
        $("#btnXemToaDoThucTe").attr("data-y", data.y);
        if (ho_so_chi_tiet.data_info.ho_so.nguon_tb == "MOBILE") {
            $("#btnXemToaDoThucTe").removeClass("d-none");
            $("#btnXemToaDoThucTe").html("(Tọa độ: " + data.x + ", " + data.y + ")")
        }
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
        _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val", data.nhom_su_kien);
        _frmDienBienTonThat.getControl("nhom_su_kien").setValue(data.ten_nhom_su_kien);
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("href", "javascript:void(0)");
        $("form[name='frmDienBienTonThat'] #call_dthoai_lxe").attr("onclick", "ESUtil.voiceCall('" + _frmDienBienTonThat.getControl("dthoai_lxe").val() + "')");
        hthiMauPhamViBaoHiem(data.pham_vi);
    }
}
function setDataStep2(so_id, lan_gd = "") {
    _frmThongTinGiamDinh.resetForm();
    _frmThongTinGiamDinh.getControl("so_id").val(so_id);
    _frmThongTinGiamDinh.getControl("lan_gd").val(lan_gd);
    _frmThongTinGiamDinh.getControl("gio_gd").val(gioHT);
    _frmThongTinGiamDinh.getControl("ngay_gd").val(dateNow);
    _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");

    fillDataBenThamGiaGiamDinh([]);
    showDsLanGD([{ gio_gd: "", ngay_gd: "//" }]);
    setStyleLanGDSelect("");

    if (lan_gd !== "" && ho_so_chi_tiet.data_info.lan_gd.length > 0) {
        ho_so_chi_tiet.data_info.lan_gd = ho_so_chi_tiet.data_info.lan_gd.removeItem(n => n.lan_gd === undefined);
        var objLanGd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd.toString() === lan_gd.toString()).firstOrDefault();
        if (objLanGd !== undefined && objLanGd !== null) {
            var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === objLanGd.tinh_thanh);
            _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmThongTinGiamDinh.getControl("quan_huyen").setValue("");
            _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === objLanGd.quan_huyen);
            _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmThongTinGiamDinh.getControl("phuong_xa").setValue("");

            _frmThongTinGiamDinh.getControl("dvi_gdinh").setValue(objLanGd.dvi_gdinh);
            _frmThongTinGiamDinh.getControl("dvi_gdinh").trigger("select2:select");

            var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === objLanGd.dvi_gdinh);
            _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
            _frmThongTinGiamDinh.getControl("ma_gdv").setValue(objLanGd.ma_gdv);

            _frmThongTinGiamDinh.setData(objLanGd);
            $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "#");
            if (arrCanBo !== undefined && arrCanBo !== null) {
                var can_bo = arrCanBo.where(n => n.ma === objLanGd.ma_gdv).firstOrDefault();
                if (can_bo !== undefined && can_bo !== null) {
                    $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "javascript:void(0)");
                    $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("onclick", "ESUtil.voiceCall('" + can_bo.call_id + "', true)");
                }
            }
            _frmThongTinGiamDinh.getControl("so_id").val(so_id);
            var dsBenThamGia = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === lan_gd.toString());
            fillDataBenThamGiaGiamDinh(dsBenThamGia);
            showDsLanGD(ho_so_chi_tiet.data_info.lan_gd);
            setStyleLanGDSelect(lan_gd);
        } else {
            _notifyService.error("Lần giám định không hợp lệ");
        }
    }
}
function showDsLanGD(arr) {
    $("#tblDanhSachLanGiamDinh tbody").html("");
    if (arr === undefined || arr === null || arr.length <= 0) {
        return;
    }
    for (var i = 0; i < arr.length; i++) {
        var lan_gd = arr[i].lan_gd;
        if (lan_gd === undefined || lan_gd === null || lan_gd === "") {
            lan_gd = "";
        }
        var tr = $("<tr style='cursor:pointer' onclick='xemChiTietLanGD(" + lan_gd + ")'></tr>");
        tr.attr("id", "ds_lan_gd_" + lan_gd);
        tr.attr("class", "ds_lan_gd");
        var td_gio_gd = $("<td></td>");
        td_gio_gd.html(arr[i].gio_gd);
        var td_ngay_gd = $("<td></td>");
        td_ngay_gd.html(arr[i].ngay_gd == null ? '//' : arr[i].ngay_gd);
        tr.append(td_gio_gd);
        tr.append(td_ngay_gd);
        $("#tblDanhSachLanGiamDinh tbody").append(tr);
    }
}
function setStyleLanGDSelect(lan_gd) {
    $("#tblDanhSachLanGiamDinh tbody tr").css("font-weight", "unset");
    $("#tblDanhSachLanGiamDinh tbody tr").css("color", "black");
    $("#tblDanhSachLanGiamDinh tbody tr#ds_lan_gd_" + lan_gd).css("font-weight", "bold");
    $("#tblDanhSachLanGiamDinh tbody tr#ds_lan_gd_" + lan_gd).css("color", "red");
}
function xemChiTietLanGD(lan_gd) {
    if (tthai_lan_gd === "them_moi") {
        _notifyService.warning("Bạn đang thêm mới dữ liệu");
        return;
    }
    _frmThongTinGiamDinh.clearErrorMessage();
    if (lan_gd == undefined || lan_gd == null) {
        $("#btnChuyenGDVHT").hide();
        return;
    }
    $("#btnChuyenGDVHT").hide();
    $("#btnHuyKTLanGD").addClass("d-none");
    setStyleLanGDSelect(lan_gd);
    var data = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined && n.lan_gd != null && n.lan_gd.toString() === lan_gd.toString()).firstOrDefault();
    var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined && n.lan_gd != null).max(n => n.lan_gd);
    if (data !== undefined && data !== null) {
        if (data.lan_gd == lan_gd_max && data.ngay_ycktgd_dongy < 30000101) {
            $("#btnHuyKTLanGD").removeClass("d-none");
        }
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === data.tinh_thanh);
        _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmThongTinGiamDinh.getControl("quan_huyen").setValue("");
        _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === data.quan_huyen);
        _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmThongTinGiamDinh.getControl("phuong_xa").setValue("");

        var arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma_chi_nhanh == data.dvi_gdinh);
        _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThongTinGiamDinh.getControl("ma_gdv").setValue("");
        var dsBenThamGia = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === lan_gd.toString());
        fillDataBenThamGiaGiamDinh(dsBenThamGia);
        _frmThongTinGiamDinh.setData(data);

        if (data.doi_tuong_gd != '' && data.doi_tuong_gd != undefined) {
            var arr_doi_tuong_gd = data.doi_tuong_gd.split(',');
            var ten_doi_tuong_gd = [];
            $.each(arr_doi_tuong_gd, (index, item) => {
                var ten_dt = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.ma_doi_tac == ho_so_chi_tiet.data_info.ho_so.ma_doi_tac && n.so_id == ho_so_chi_tiet.data_info.ho_so.so_id && n.so_id_doi_tuong == item).firstOrDefault();
                if (ten_dt != null) {
                    var ten = ten_dt.ten_doi_tuong;
                    ten_doi_tuong_gd.push(ten);
                }
            });
            var ten_dt_gd = ten_doi_tuong_gd.join(', ');
            if (ten_dt_gd.length > 110) {
                ten_dt_gd = ten_dt_gd.substr(0, 110) + '...';
            }
            _frmThongTinGiamDinh.getControl('doi_tuong_gd').val(ten_dt_gd);
            _frmThongTinGiamDinh.getControl('doi_tuong_gd').attr('data-val', data.doi_tuong_gd);
        }
        //Nếu mà hồ sơ đã kết thúc giám định
        var ngay_kt_hs_gd = ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd;
        if (ngay_kt_hs_gd < 30000101) {
            $("#btnChuyenGDVHT").hide();
            anHienNutFormLanGiamDinh(lan_gd);
            return;
        }
        var chua_ket_thuc = data.ngay_ycktgd_dongy >= 30000101 || ngay_kt_hs_gd >= 30000101;
        if (data.ngay_ycgd_dongy < 30000101 && data.ngay_ycktgd_dongy >= 30000101 && chua_ket_thuc) {
            $("#btnChuyenGDVHT").show();
        }
    }
    anHienNutFormLanGiamDinh(lan_gd);
}
function clearCacheLocalStoreage() {
    ESStorage.removeItemLocalStorage(keyCache.HANG_MUC_XE_CHINH);
    ESStorage.removeItemLocalStorage(keyCache.HANG_MUC_TAI_LIEU);
}
function tongTienHMTT() {
    var tong_tien = 0;
    for (var i = 0; i < ds_hmtt.length; i++) {
        tong_tien += parseFloat(ds_hmtt[i].tien_gd);
    }
    return tong_tien;
}
function themHMTT(jsonFormHMTT) {
    jsonFormHMTT = chuanHoaJsonHMTT(jsonFormHMTT);
    var index = ds_hmtt.length;
    jsonFormHMTT.index = index;
    ds_hmtt.push(jsonFormHMTT);
}
function updateRowHMTT(index, objDataRow = {}) {
    objDataRow = chuanHoaJsonHMTT(objDataRow);
    ds_hmtt[index] = objDataRow;
}
function chuanHoaJsonHMTT(jsonFormHMTT) {
    jsonFormHMTT["lh_nv_ten"] = objDanhMuc.lhnv.where(n => n.ma === jsonFormHMTT.lh_nv).firstOrDefault().ten;
    jsonFormHMTT["hang_muc_ten"] = objDanhMuc.hang_muc_xe.where(n => n.ma === jsonFormHMTT.hang_muc).firstOrDefault().ten;
    jsonFormHMTT["muc_do_ten"] = "";
    var arr = jsonFormHMTT.muc_do.split(",");
    if (arr !== undefined && arr !== null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            var muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma === arr[i]).firstOrDefault().ten;
            if (i === 0) {
                jsonFormHMTT["muc_do_ten"] = muc_do_ten;
            } else {
                jsonFormHMTT["muc_do_ten"] += ", " + muc_do_ten;
            }
        }
    }
    jsonFormHMTT["chinh_hang_ten"] = _commonService.danhMucChung.noi_sua_chua.where(n => n.ma === jsonFormHMTT.chinh_hang).firstOrDefault().ten;
    jsonFormHMTT["phuong_an_ten"] = _commonService.danhMucChung.phuong_an_sua_chua.where(n => n.ma === jsonFormHMTT.phuong_an).firstOrDefault().ten;
    jsonFormHMTT["thu_hoi_ten"] = _commonService.danhMucChung.thu_hoi_vat_tu.where(n => n.ma === jsonFormHMTT.thu_hoi).firstOrDefault().ten;
    jsonFormHMTT.tien_gd = parseFloat(jsonFormHMTT.tien_gd);
    jsonFormHMTT.index = parseInt(jsonFormHMTT.index);
    jsonFormHMTT["tien_gd_hien_thi"] = ESUtil.formatMoney(jsonFormHMTT.tien_gd);

    return jsonFormHMTT;
}
function suaHMTT(vu_tt, hang_muc, so_id, ma_chi_nhanh, ma_doi_tac, arr_muc_do_ai = null, showmodal = true) {
    var arrBTImage = ho_so_chi_tiet.data_info.hinh_anh.where(n => n.ma_file == hang_muc).select(n => n.bt);
    ANH_CHON_CUOI_CUNG = ho_so_chi_tiet.data_info.hang_muc.where(n => n.hang_muc == hang_muc).firstOrDefault();
    if (ANH_CHON_CUOI_CUNG == null) {
        ANH_CHON_CUOI_CUNG = {};
    }
    ANH_CHON_CUOI_CUNG.loai = "TT";
    ANH_CHON_CUOI_CUNG.ma_file = hang_muc;
    phanLoaiAnh(() => {
        _frmThemHMTT.getControl("hang_muc_cu").setValue(hang_muc);
        _frmThemHMTT.getControl("loai").readOnly(true);
        _modalThemHMTT.show();
    }, arrBTImage, "cap_nhat");
}
function xoaHMTT(vu_tt, hang_muc, so_id, ma_chi_nhanh, ma_doi_tac) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa hạng mục này không?", index, val => {
        var obj = ho_so_chi_tiet.data_info.hang_muc.where(n => n.vu_tt.toString() === vu_tt.toString() && n.hang_muc === hang_muc && n.so_id.toString() === so_id.toString() && n.ma_chi_nhanh === ma_chi_nhanh && n.ma_doi_tac === ma_doi_tac).firstOrDefault();
        _service.xoaNhatHangMucTonThatDaPhan(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
            var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
            var doi_tuong = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
            var hang_muc_xoa = $("#navDanhGiaNghiepVu li.active").attr("data-hang-muc");
            hang_muc_xoa = hang_muc_xoa || "";
            if (lhnv != undefined) {
                xemChiTietDTTonThat(lhnv, nhom, doi_tuong, hang_muc_xoa);
            }

            _notifyService.success("Xóa hạng mục thành công.");
            getAnhThumnail();
            loadHangMucTonThat(obj);

            var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
            _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                ho_so_chi_tiet = res;
                $("#navThongTinChung").bindJsonToHtml(res.data_info.ho_so);
            });

        });

    });
}
function fillDataBenThamGiaGiamDinh(arrData) {
    for (var i = 0; i < arrData.length; i++) {
        var moi_qh = objDanhMuc.dmuc_chung.where(n => n.nhom === "MOI_QUAN_HE" && n.ma === arrData[i].dai_dien).firstOrDefault();
        arrData[i].moi_qh_ten = moi_qh.ten;
    }
    ESUtil.genHTML("dsBenThamGiaGiamDinhTemplate", "dsBenThamGiaGiamDinh", { danh_sach: arrData });
}
function suaBenThamGiaGiamDinh(bt) {
    var ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    var lan_gd = _frmThongTinGiamDinh.getControl("lan_gd").val();
    var data = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.bt.toString() === bt.toString()).firstOrDefault();
    data.ma_doi_tac = ma_doi_tac;
    data.so_id = so_id;
    _frmBenThamGiaGiamDinh.setData(data);
    _modalBenThamGiaGiamDinh.show(data);
}
function xoaBenThamGiaGiamDinh(bt) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa bên đại diện tham gia này không?", bt, val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: _frmThongTinGiamDinh.getControl("so_id").val(),
            lan_gd: _frmThongTinGiamDinh.getControl("lan_gd").val(),
            bt: bt
        };
        _service.xoaBenLienQuan(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ho_so_chi_tiet.data_info.nguoi_dd = ho_so_chi_tiet.data_info.nguoi_dd.removeItem(n => n.lan_gd.toString() === obj.lan_gd.toString() && n.bt.toString() === obj.bt.toString());
            fillDataBenThamGiaGiamDinh(ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === obj.lan_gd.toString()));
            _notifyService.success("Xóa bên tham gia giám định thành công");
        });
    });
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
}
function setNguoiLienHeCapNhat() {
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
        initImageViewerPLHM();
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
        pm: pm
    }).then(res => {
        ho_so_chi_tiet.data_info.hinh_anh = res.data_info;
        bindAnhThumnail(res.data_info);
        ds_anh_gd = res.data_info;
        initImageViewer();
        initImageViewerPLHM();
        if (callback) {
            callback(res);
        }
    });
}
function getAnhThumnailView(ma_file, callback = undefined) {
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        ma_file: ma_file
    }).then(res => {
        if (callback) {
            callback(res);
        }
    });
}
function kiemTraChuyenStep(step) {
    var check = true;
    if (step === "stepThongTinGiamDinh" || step === "stepHinhAnhHoSo" || step === "stepDanhGiaTonThat") {
        if (ho_so_chi_tiet.data_info.ho_so.ngay >= 30000101) {
            _notifyService.error("Giám định viên trung tâm chưa tiếp nhận hồ sơ");
            return false;
        }
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
    if (step === "stepHinhAnhHoSo" || step === "stepDanhGiaTonThat") {
        var choPhepGiamDinh = ho_so_chi_tiet.data_info.lan_gd[ho_so_chi_tiet.data_info.lan_gd.length - 1];
        if (choPhepGiamDinh == undefined) {
            _notifyService.error("Không xác định được lần giám định");
            return false;
        }
        var so_luong_anh = ho_so_chi_tiet.data_info.hinh_anh.length;
        if (choPhepGiamDinh.ngay_nhan >= 30000101 && so_luong_anh <= 0) {
            _notifyService.error("Giám định viên hiện trường chưa tiếp nhận");
            return false;
        }
        if (ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd !== undefined).length <= 0) {
            _notifyService.error("Bạn chưa nhập thông tin giám định");
            return false;
        }
    }
    if (step === "stepDanhGiaTonThat") {
        if (ho_so_chi_tiet.data_info.ho_so.nv_xly != 'NGUOI') {
            if (ho_so_chi_tiet.data_info.hang_muc.length <= 0) {
                _notifyService.error("Bạn chưa phân loại hạng mục");
                return false;
            }
        }
        $(".inputSearchHangMucGiamDinh").val("");
        $(".inputSearchHangMucGiamDinh_TNDS_TAI_SAN_XE").val("");
    }
    return check;
}
function layDsLHNVDaPhan() {
    var array = ho_so_chi_tiet.data_info.hang_muc;
    var flags = [], output = [], l = array.length, i;
    for (i = 0; i < l; i++) {
        if (flags[array[i].lh_nv]) continue;
        var lhnv = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == array[i].lh_nv).firstOrDefault();
        if (lhnv != null) {
            if (lhnv.doi_tuong == "XE") {
                lhnv.hang_muc = "";
            }
            else {
                lhnv.hang_muc = array[i].hang_muc;
            }
            flags[array[i].lh_nv] = true;
            output.push(lhnv);
        }
    }
    output.sort(function (a, b) { return a.stt - b.stt });
    return output;
}
function showStep(step, gdv = undefined) {
    carClaimTabShow = step;
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
            if (lhnv_da_phan.length > 0) {
                xemChiTietDTTonThat(lhnv_da_phan[0].ma, lhnv_da_phan[0].nhom, lhnv_da_phan[0].doi_tuong, lhnv_da_phan[0].hang_muc);
            }
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
            if (lhnv_da_phan.length <= 0) {
                $("#divDanhGiaKhongXacDinh").show();
            }
        });
        layDSLHNV();
    }
    _navBoiThuong.showTab(step);
    anHienPhanLoai(false);
    _navDanhGiaTonThat.showTab("tabDGTTKhaiBaoHangMuc");
    if (step === "stepThongTinBCGD") {
        xemDanhGiaBaoCao("BCGD");
    }
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
function initImageViewerPLHM() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-plhm');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container-plhm',
        id: 'img-container-plhm',
        event_item: "dblclick",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function geocodeAddress(geocoder, resultsMap) {
    const address = "218 Đội Cấn, Ba Đình, Hà Nội, Việt Nam";
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
function layChiTietAnh(el, so_id, bt) {
    if ($(el).attr("data-original") === undefined || $(el).attr("data-original") === null || $(el).attr("data-original") === "") {
        _service.layAnhChiTiet({ so_id: so_id, bt: bt }).then(res => {
            $(el).attr("data-original", "data:image/png;base64, " + res.data_info.duong_dan);
        });
    }
}
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function anHienTrachNhiemVeNguoi(val) {
    var loai = _frmThemHMTT.getControl("loai").val();
    if (val == "NGUOI" || val == "TAI_SAN" || loai == "TL" || loai == "TC") {
        $(".tn_ve_tnds").hide();
        if (val == "NGUOI") {

        }
        if (val == "TAI_SAN") {

        }
        return;
    }
    $(".tn_ve_tnds").show();
}
function getPagingHangMuc(trang) {
    var data = [];
    var arrTmp = [];
    var so_dong = 20;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var loai = _frmThemHMTT.getControl("loai").getValue();
    var lh_nv = _frmThemHMTT.getControl("lh_nv").getValue();
    var so_id_doi_tuong = _frmThemHMTT.getControl("so_id_doi_tuong").getValue();
    var doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => lh_nv != null && n.ma == lh_nv.trim()).firstOrDefault();
    if (loai == "TL") {
        data = objDanhMuc.hang_muc_tai_lieu;
    }
    if (loai == "TC") {
        data = objDanhMuc.hang_muc_toan_canh;
    }
    if (loai == "TT") {
        if (doi_tuong.nhom == DOI_TUONG_TT.XE) {
            data = objDanhMuc.hang_muc_chinh;
        } else if (doi_tuong.nhom == DOI_TUONG_TT.NGUOI && objLHNV.nhom == "NG") {
            data = objDanhMuc.hang_muc_nntx;
        } else if (doi_tuong.nhom == DOI_TUONG_TT.NGUOI && objLHNV.nhom == "TNDS") {
            data = objDanhMuc.hang_muc_tnds_ng;
        } else if (doi_tuong.nhom == DOI_TUONG_TT.HANG_HOA) {
            data = objDanhMuc.hang_muc_hang_hoa;
        } else if (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "KHAC") {
            data = objDanhMuc.hang_muc_tnds_ts;
        }
        else if (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "XE") {
            data = objDanhMuc.hang_muc_chinh;
        }
    }
    var tim = $("#inputTimKiemHangMuc").val();
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
        ESUtil.genHTML("dsHangMucTemplate", "dsHangMuc", { data: arrTmp }, () => {
            var ma = $("#inputTimKiemHangMuc_ma").val();
            if (ma != undefined && ma != null && ma != "") {
                $("#dsHangMuc .modalDanhSachHangMucItem[value='" + ma + "']").prop("checked", true);
            }
            $("#dsHangMuc .single_checked").click(function () {
                $("#dsHangMuc .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
    }
    $("#dsHangMuc_pagination").html(ESUtil.pagingHTML("getPagingHangMuc", trang, tong_so_dong, so_dong));
    $("#inputTimKiemHangMuc").focus();
}
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
function chonHangMucTonThat(el) {
    $("#inputTimKiemHangMuc").val("");
    $("#dsHangMuc .modalDanhSachHangMucItem").prop("checked", false);
    var ma = $(el).attr("data-val");
    $("#inputTimKiemHangMuc_ma").val(ma);
    getPagingHangMuc(1);
    _modalHangMucTonThat.show(el);
    $("#inputTimKiemHangMuc").focus();
}
function onChonHangMuc(el) {
    var val = $(el).attr('data-val');
    var ten = $(el).attr('data-name');
    if (val != undefined && val != null) {
        _frmThemHMTT.getControl("hang_muc").setValue(ten);
        _frmThemHMTT.getControl("hang_muc").attr("data-val", val);
    }
    _modalHangMucTonThat.hide();
}
function anHienHangMuc(loai, doi_tuong) {
    var val = _frmThemHMTT.getControl("hang_muc").attr("data-val");
    layChiPhiTuDong();
    anHienTrachNhiemVeNguoi(val);
    if (loai == "TT" && doi_tuong == DOI_TUONG_TT.TAI_SAN) {
        _selectCheckBoxService.setCheckedValue([]);
        _frmThemHMTT.getControl("muc_do").attr("data-val", "");
        _frmThemHMTT.getControl("muc_do").setValue("");

        if (val == "TAI_SAN") {
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        if (val == "NGUOI") {
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        anHienControlPhanLoai();
    }
}
function hienThiNhomTaiLieuTonThat() {
    anHienHangMuc();
}
function hienThiNhomTNDS() {
    anHienHangMuc("TT", DOI_TUONG_TT.TAI_SAN);
}
function hienThiNhomTaiLieuGiayTo() {
    anHienHangMuc();
}
function hienThiNhomTaiLieuToanCanh() {
    anHienHangMuc();
}
function hienThiNhomHangHoa() {
    anHienHangMuc();
}
function hienThiNhomNNTX() {
    anHienHangMuc();
}
function loadHangMucMucDo(loai, lh_nv, hang_muc = "") {
    var objLHNV = null;
    var doi_tuong = DOI_TUONG_TT.XE;
    if (lh_nv != undefined && lh_nv != null && lh_nv.trim() != "") {
        objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == lh_nv.trim()).firstOrDefault();
        doi_tuong = objLHNV.doi_tuong;
    }
    //Vật chất xe
    if (loai == "TT" && doi_tuong == DOI_TUONG_TT.XE) {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_chinh, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
        var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE");
        _selectCheckBoxService.setDataSource(muc_do);
    }
    //Hàng hóa trên xe
    if (loai == "TT" && (doi_tuong == DOI_TUONG_TT.HANG_HOA || doi_tuong == DOI_TUONG_TT.TAI_SAN)) {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_hang_hoa, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
        var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
        _selectCheckBoxService.setDataSource(muc_do);
    }
    //Người ngồi trên xe
    if (loai == "TT" && doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.loai == "TN") {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_nntx, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
        var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        _selectCheckBoxService.setDataSource(muc_do);
    }
    //TNDS về người
    if (loai == "TT" && doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.loai == "BB") {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_tnds_ng, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
        var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
        _selectCheckBoxService.setDataSource(muc_do);
    }
    //Tài liệu
    if (loai == "TL") {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_tai_lieu, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
    }
    //Toàn cảnh
    if (loai == "TC") {
        ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), objDanhMuc.hang_muc_toan_canh, "ma", "ten", HANG_MUC_TOP, "280px", val => {
            layChiPhiTuDong();
            anHienTrachNhiemVeNguoi(val);
        });
    }
}
function loadMucDoTT(loai, lh_nv, so_id_doi_tuong) {
    var doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
    _selectCheckBoxService.setCheckedValue([]);
    _frmThemHMTT.getControl("hang_muc").attr("data-val", "");
    _frmThemHMTT.getControl("hang_muc").setValue("");
    if (loai == "TL") {
        getPagingHangMuc(1);
        anHienHangMuc();
    }
    if (loai == "TC") {
        getPagingHangMuc(1);
        anHienHangMuc();
    }
    var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => lh_nv != null && n.ma == lh_nv.trim()).firstOrDefault();
    if (doi_tuong == null || objLHNV == null)
        return;
    if (loai === "TT") {
        //Mức độ tổn thất về xe
        if (doi_tuong.nhom == DOI_TUONG_TT.XE) {//|| (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == DOI_TUONG_TT.XE)           
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        //Mức độ tổn thất về người
        else if (doi_tuong.nhom == DOI_TUONG_TT.NGUOI && objLHNV.nhom == "NG") {
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        //Mức độ tổn thất về người
        else if (doi_tuong.nhom == DOI_TUONG_TT.NGUOI && objLHNV.nhom == "TNDS") {
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        //Mức Hàng hóa, tài sản không phải là xe
        else if (doi_tuong.nhom == DOI_TUONG_TT.HANG_HOA) {
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        //Mức độ tổn thất là tài sản khác
        else if (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "KHAC") {
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
            _selectCheckBoxService.setDataSource(muc_do);
        }
        //Mức độ tổn thất là tài sản và đối tượng là XE
        else if (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "XE") {
            getPagingHangMuc(1);
            anHienHangMuc();
            var muc_do = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE");
            _selectCheckBoxService.setDataSource(muc_do);
        }
    }
}
function suaThongTinNguoiThongBao() {
    var objJson = _frmThongTinNguoiLienHe.getJsonData();
    _service.capNhatThongTinNguoiThongBao(objJson).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet.data_info.ho_so.nguoi_tb = objJson.nguoi_tb;
        ho_so_chi_tiet.data_info.ho_so.moi_qh_tb = objJson.moi_qh_tb;
        ho_so_chi_tiet.data_info.ho_so.moi_qh_tb_ten = objDanhMuc.dmuc_chung.where(n => n.nhom === "MOI_QUAN_HE" && n.ma === objJson.moi_qh_tb).firstOrDefault().ten;
        ho_so_chi_tiet.data_info.ho_so.dthoai_tb = objJson.dthoai_tb;
        ho_so_chi_tiet.data_info.ho_so.email_tb = objJson.email_tb;

        ho_so_chi_tiet.data_info.ho_so.nguoi_lhe = objJson.nguoi_lhe;
        ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe = objJson.moi_qh_lhe;
        ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe_ten = objDanhMuc.dmuc_chung.where(n => n.nhom === "MOI_QUAN_HE" && n.ma === objJson.moi_qh_lhe).firstOrDefault().ten;
        ho_so_chi_tiet.data_info.ho_so.dthoai_lhe = objJson.dthoai_lhe;
        ho_so_chi_tiet.data_info.ho_so.email_lhe = objJson.email_lhe;

        ho_so_chi_tiet.data_info.ho_so.nguon_tb = objJson.nguon_tb;
        ho_so_chi_tiet.data_info.ho_so.nguon_tb_ten = "Không xác định";
        var nguon = _commonService.danhMucChung.nguon_tb.where(n => n.ma === objJson.nguon_tb).firstOrDefault();
        if (nguon !== undefined && nguon !== null) {
            ho_so_chi_tiet.data_info.ho_so.nguon_tb_ten = nguon.ten;
        }

        ho_so_chi_tiet.data_info.ho_so.ngay_tb = _frmThongTinNguoiLienHe.getControl("ngay_tb").val() + " " + _frmThongTinNguoiLienHe.getControl("gio_tb").val();

        $("#navThongTinLienHe").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
        $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);

        _modalThongTinNguoiLienHe.hide();
        _notifyService.success("Cập nhật thông tin thành công");
    }).catch(err => {
    });
}
function loadHangMucTonThat(obj, callback = undefined) {
    _service.layDsHangMucTonThat(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet.data_info.hang_muc = res.data_info;
        if (!callback) {
            if (ho_so_chi_tiet.data_info.hang_muc.length <= 0) {
                showStep("stepHinhAnhHoSo");
            }
        }
        else {
            callback(res);
        }
    });
}
function bindVuTonThat(val) {
    var arr = ho_so_chi_tiet.data_info.dien_bien;
    if (arr !== null && arr.length > 0) {
        var arrClone = arr.clone();
        var arrHT = [];
        for (var i = 0; i < arrClone.length; i++) {
            arrHT.push({ ma: arrClone[i].vu_tt, ten: arrClone[i].gio_xr + " " + arrClone[i].ngay_xr + " - " + arrClone[i].dia_diem })
        }
        _frmThemHMTT.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", "");
        if (arrHT.length === 1) {
            _frmThemHMTT.getControl("vu_tt").setValue(arrHT[0].ma);
        }
    }
}
function goToScroll(element) {
    $('#lstImage').animate({ scrollTop: $("#" + element).offset().top }, 'slow');
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
function bindCmdDataThoiGian(objDanhMuc) {
    _frmDienBienTonThat.getControl("gio_xr").val(gioHT);
    _frmDienBienTonThat.getControl("ngay_xr").val(dateNow);
}
function bindCmbDataDonVi(objDanhMuc) {
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
    _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
    _frmTimKiemHoSo.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("nguon").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("nv").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("trang_thai").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSo.getControl("gdvtt").addEventChange(val => {
        getPaging(1);
    });

    _frmCarClaimCarSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
    _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", "");
    _frmCarClaimCarSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmCarClaimCarSearch.getControl("ma_chi_nhanh").setValue("");
    });
    _frmThongTinGiamDinh.getControl("dvi_gdinh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị", "");
    _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");

    _frmThongTinGiamDinh.getControl("dvi_gdinh").addEventChange(val => {
        var arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh == val);
        _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThongTinGiamDinh.getControl("ma_gdv").setValue("");
    });
    _frmThongTinGiamDinh.getControl("ma_gdv").addEventChange(val => {
        var ma_dvi = _frmThongTinGiamDinh.getControl("dvi_gdinh").val();
        var can_bo = objDanhMuc.can_bo.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma_chi_nhanh === ma_dvi && n.ma === val).firstOrDefault();
        _frmThongTinGiamDinh.getControl("ten_gdv").val("");
        _frmThongTinGiamDinh.getControl("dthoai_gdv").val("");
        _frmThongTinGiamDinh.getControl("email_gdv").val("");
        $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "#");

        if (can_bo !== undefined && can_bo !== null) {
            _frmThongTinGiamDinh.getControl("ten_gdv").val(can_bo.ten);
            _frmThongTinGiamDinh.getControl("dthoai_gdv").val(can_bo.dthoai);
            _frmThongTinGiamDinh.getControl("email_gdv").val(can_bo.email);
            $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("href", "javascript:void(0)");
            $("form[name='frmThongTinGiamDinh'] #call_cb_gd").attr("onclick", "ESUtil.voiceCall('" + can_bo.call_id + "', true)");
        }
    });
    ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });
}
function bindCmbDataMoiQuanHe(objDanhMuc) {
    var arr = objDanhMuc.dmuc_chung.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom === "MOI_QUAN_HE").sortBy("stt");
    var arrMoiQuanHe = arr.filter(item => {
        return item.ma !== "QH.0003";// && item.ma !== "QH.0004"
    });
    _frmCarClaimCustomerInfo.getControl("moi_qh_tb").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmCarClaimCustomerInfo.getControl("moi_qh_lhe").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmThongTinNguoiLienHe.getControl("moi_qh_tb").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmThongTinNguoiLienHe.getControl("moi_qh_lhe").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");

    _frmBenThamGiaGiamDinh.getControl("dai_dien").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmBenThamGiaGiamDinh.getControl("dai_dien").addEventChange(val => {
        //Chủ xe
        if (val === "QH.0001") {
            _frmBenThamGiaGiamDinh.getControl("ten").val(ho_so_chi_tiet.data_info.ho_so.chu_xe);
            _frmBenThamGiaGiamDinh.getControl("dien_thoai").val(ho_so_chi_tiet.data_info.ho_so.dien_thoai);
            _frmBenThamGiaGiamDinh.getControl("email").val(ho_so_chi_tiet.data_info.ho_so.email);
            _frmBenThamGiaGiamDinh.getControl("dia_chi").val(ho_so_chi_tiet.data_info.ho_so.chu_xe_dchi);
        }
        //Lái xe
        else if (val === "QH.0002") {
            _frmBenThamGiaGiamDinh.getControl("ten").val(_frmDienBienTonThat.getControl("ten_lxe").val());
            _frmBenThamGiaGiamDinh.getControl("dien_thoai").val(_frmDienBienTonThat.getControl("dthoai_lxe").val());
            _frmBenThamGiaGiamDinh.getControl("email").val(_frmDienBienTonThat.getControl("email_lxe").val());
        }

        else {
            _frmBenThamGiaGiamDinh.getControl("ten").val("");
            _frmBenThamGiaGiamDinh.getControl("dien_thoai").val("");
            _frmBenThamGiaGiamDinh.getControl("email").val("");
            _frmBenThamGiaGiamDinh.getControl("dia_chi").val("");
            _frmBenThamGiaGiamDinh.getControl("loi_khai_nhan_chung").val("");
        }
    });


    _frmBsBenThamGiaGD.getControl("dai_dien").setDataSource(arrMoiQuanHe, "ten", "ma", "Chọn mối quan hệ", "");
    _frmBsBenThamGiaGD.getControl("dai_dien").addEventChange(val => {
        //Chủ xe
        if (val === "QH.0001") {
            _frmBsBenThamGiaGD.getControl("ten").val(ho_so_chi_tiet.data_info.ho_so.chu_xe);
            _frmBsBenThamGiaGD.getControl("dien_thoai").val(ho_so_chi_tiet.data_info.ho_so.dien_thoai);
            _frmBsBenThamGiaGD.getControl("email").val(ho_so_chi_tiet.data_info.ho_so.email);
            _frmBsBenThamGiaGD.getControl("dia_chi").val(ho_so_chi_tiet.data_info.ho_so.chu_xe_dchi);
        }
        //Lái xe
        if (val === "QH.0002") {
            _frmBsBenThamGiaGD.getControl("ten").val(_frmDienBienTonThat.getControl("ten_lxe").val());
            _frmBsBenThamGiaGD.getControl("dien_thoai").val(_frmDienBienTonThat.getControl("dthoai_lxe").val());
            _frmBsBenThamGiaGD.getControl("email").val(_frmDienBienTonThat.getControl("email_lxe").val());
        }
    });

}
function bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh) {
    var dviHanhChinh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
    _frmDienBienTonThat.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
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
    _frmThongTinGiamDinh.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmThongTinGiamDinh.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmThongTinGiamDinh.getControl("quan_huyen").setValue("");
        _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmThongTinGiamDinh.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmThongTinGiamDinh.getControl("phuong_xa").setValue("");
    });
    _frmTKiemGara.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmTKiemGara.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmTKiemGara.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmTKiemGara.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTKiemGara.getControl("quan_huyen").setValue("");
    });

    _frmTimKiemGDV.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmTimKiemGDV.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmTimKiemGDV.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmTimKiemGDV.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTimKiemGDV.getControl("quan_huyen").setValue("");
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
    _frmTimKiemGDV.getControl("quan_huyen").addEventChange(val => {
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
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
}
function bindCmbDataNhomNguyenNhan(objDanhMuc) {
    var arrNhomNguyenNhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
    _frmDienBienTonThat.getControl("nhom_nguyen_nhan").setDataSource(arrNhomNguyenNhan, "ten", "ma", "Chọn nhóm nguyên nhân", "");
}

function bindCmbDataNhomTaiLieu(nhom_tai_lieu) {
    _frmThemHMTT.getControl("loai").setDataSource(nhom_tai_lieu, "ten", "ma");
}
function bindDataChuyenNguoiXuLy(ma_doi_tac, so_id) {
    _frmChuyenNguoiXuLy.clearErrorMessage();
    _frmChuyenNguoiXuLy.getControl("ma_doi_tac").val(ma_doi_tac);
    _frmChuyenNguoiXuLy.getControl("so_id").val(so_id);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").setValue("");
    _frmChuyenNguoiXuLy.getControl("nsd_moi").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
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
    if (hanh_dong == 'CHUYEN_GDVHT') {
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
        _service.layDsNguoiTrongNhomPhanCongGD(obj).then(res => {
            _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setDataSource(res.data_info, "ten_can_bo", "nsd", "Chọn cán bộ", "");
        });
    }
}
function bindDataTableKNGQ(arrData) {
    $("#tableDsKienNghiPhuongAn tbody").html("");
    if (arrData === undefined || arrData === null || arrData.length <= 0) {
        arrData = [];
    }
    var arrKNGQ = objDanhMuc.dmuc_chung.where(n => n.nhom === "KNGQ").sortBy("stt");

    for (var i = 0; i < arrKNGQ.length; i++) {
        var checked = arrData.where(n => n.ma !== undefined && n.ma === arrKNGQ[i].ma).length > 0 ? 'checked="checked"' : "";
        var tr = $('<tr style="cursor:pointer">');
        var td1 = $('<td style="width:60px; text-align:center;"></td>');
        var div = $('<div class="custom-control custom-checkbox custom-control-inline" style="margin:unset;"></div>');
        var checkbox = $('<input type="checkbox" id="kien_nghi_' + arrKNGQ[i].ma + '" name="kngq[' + i + '][ma]" value="' + arrKNGQ[i].ma + '" class="custom-control-input" ' + checked + '>');
        var lb_check = $('<label class="custom-control-label" for="kien_nghi_' + arrKNGQ[i].ma + '">&nbsp;</label>');
        div.append(checkbox);
        div.append(lb_check);
        td1.append(div);
        var td2 = $('<td></td>');
        var lb = $('<label>' + arrKNGQ[i].ten + '</label>');
        var input_hidden_ten = $('<input type="hidden" name="kngq[' + i + '][ten]" value="' + arrKNGQ[i].ten + '">');
        var input_hidden_ghi_chu = $('<input type="hidden" name="kngq[' + i + '][ghi_chu]" value="">');

        td2.append(lb);
        td2.append(input_hidden_ten);
        td2.append(input_hidden_ghi_chu);

        tr.append(td1);
        tr.append(td2);
        $("#tableDsKienNghiPhuongAn tbody").append(tr);
    }

}
function bindHangGPLX() {
    _frmDienBienTonThat.getControl("gplx_hang").setDataSource(THOI_HAN_BANG_LAI, "hang_gplx", "hang_gplx", "Chọn", "");
    _frmAddLicenseInfo.getControl("gplx_hang").setDataSource(THOI_HAN_BANG_LAI, "hang_gplx", "hang_gplx", "Chọn", "");
}
function loadFormBsThongTinBenTGGD() {
    _frmBsBenThamGiaGD.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
    _frmBsBenThamGiaGD.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
    _frmBsBenThamGiaGD.getControl("lan_gd").setDataSource([], "ten", "ma", "Chọn lần giám định", "");
    var ds_lan_gd = ho_so_chi_tiet.data_info.lan_gd;
    if (ds_lan_gd !== undefined && ds_lan_gd !== null) {
        var arr = [];
        for (var i = 0; i < ds_lan_gd.length; i++) {
            arr.push({ ma: ds_lan_gd[i].lan_gd, ten: ds_lan_gd[i].gio_gd + " " + ds_lan_gd[i].ngay_gd + " - " + ds_lan_gd[i].dia_diem });
        }
        arr.sort((a, b) => b.ma - a.ma);
        _frmBsBenThamGiaGD.getControl("lan_gd").setDataSource(arr, "ten", "ma", "Chọn lần giám định", arr[0].ma);
    }
    _addBenThamGiaGiamDinhModal.show();
}
function loadFormBsThongTinBangLaiXe(vu_tt = undefined) {
    _addLicenseInfoModal.show();
    var json = null;
    var arr = ho_so_chi_tiet.data_info.dien_bien;
    var arrDT = ho_so_chi_tiet.data_info.ds_doi_tuong;
    if (vu_tt === undefined) {
        json = arr[0];
        vu_tt = json.vu_tt.toString();
    } else {
        vu_tt = vu_tt.toString();
        json = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt.toString() === vu_tt.toString()).firstOrDefault();
    }
    if (json === undefined || json === null) {
        _notifyService.error("Không tìm thấy vụ tổn thất");
        return;
    }
    if (arrDT !== null && arrDT.length > 0) {
        var doi_tuong = [];
        for (var i = 0; i < arrDT.length; i++) {
            if ((arrDT[i].nhom == "XE") || (arrDT[i].nhom == "TAI_SAN" && arrDT[i].loai == "XE")) {
                doi_tuong.push({ ma: arrDT[i].so_id_doi_tuong, ten: arrDT[i].ten_doi_tuong });
            }
        }
        if (doi_tuong.length == 1) {
            _frmAddLicenseInfo.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", doi_tuong[0].ma);
        } else {
            _frmAddLicenseInfo.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", "");
        }
    }
    if (arr !== null && arr.length > 0) {
        var arrClone = arr.clone();
        var arrHT = [];
        for (var i = 0; i < arrClone.length; i++) {
            arrHT.push({ ma: arrClone[i].vu_tt, ten: arrClone[i].gio_xr + " " + arrClone[i].ngay_xr + " - " + arrClone[i].dia_diem })
        }
        _frmAddLicenseInfo.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", vu_tt);
    }
    _frmAddLicenseInfo.getControl("ten_lxe").val(json.ten_lxe);
    _frmAddLicenseInfo.getControl("dthoai_lxe").val(json.dthoai_lxe);
    _frmAddLicenseInfo.getControl("email_lxe").val(json.email_lxe);
    _frmAddLicenseInfo.getControl("gplx_so").val(json.gplx_so);
    _frmAddLicenseInfo.getControl("gplx_hang").val(json.gplx_hang);
    _frmAddLicenseInfo.getControl("gplx_hieu_luc").val((json.gplx_hieu_luc !== undefined && json.gplx_hieu_luc !== null && json.gplx_hieu_luc !== "") ? json.gplx_hieu_luc : "");
    _frmAddLicenseInfo.getControl("gplx_het_han").val((json.gplx_hieu_luc !== undefined && json.gplx_hieu_luc !== null && json.gplx_hieu_luc !== "") ? json.gplx_het_han : "");
}
function loadFormBsThongTinDangKiem(vu_tt = undefined) {
    var json = null;
    var arr = ho_so_chi_tiet.data_info.dien_bien;
    var arrDT = ho_so_chi_tiet.data_info.ds_doi_tuong;
    if (vu_tt === undefined) {
        json = arr[0];
        vu_tt = arr[0].vu_tt.toString();
    } else {
        vu_tt = vu_tt.toString();
        json = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt.toString() === vu_tt).firstOrDefault();
    }
    if (json === undefined || json === null) {
        _notifyService.error("Không tìm thấy vụ tổn thất");
        return;
    }
    if (arr !== null && arr.length > 0) {
        var arrClone = arr.clone();
        var arrHT = [];
        for (var i = 0; i < arrClone.length; i++) {
            arrHT.push({ ma: arrClone[i].vu_tt, ten: arrClone[i].gio_xr + " " + arrClone[i].ngay_xr + " - " + arrClone[i].dia_diem })
        }
        _frmAddRegistryInfo.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", vu_tt);
    }
    if (arrDT !== null && arrDT.length > 0) {
        var doi_tuong = [];
        for (var i = 0; i < arrDT.length; i++) {
            if ((arrDT[i].nhom == "XE") || (arrDT[i].nhom == "TAI_SAN" && arrDT[i].loai == "XE")) {
                doi_tuong.push({ ma: arrDT[i].so_id_doi_tuong, ten: arrDT[i].ten_doi_tuong });
            }
        }
        if (doi_tuong.length == 1) {
            _frmAddRegistryInfo.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", doi_tuong[0].ma);
        } else {
            _frmAddRegistryInfo.getControl("so_id_doi_tuong").setDataSource(doi_tuong, "ten", "ma", "Chọn đối tượng tổn thất", "");
        }
    }
    //_frmAddRegistryInfo.getControl("vu_tt").setValue(json.vu_tt);
    _frmAddRegistryInfo.getControl("dangkiem_so").val(json.dangkiem_so);
    _frmAddRegistryInfo.getControl("dangkiem_hieu_luc").val((json.dangkiem_hieu_luc !== undefined && json.dangkiem_hieu_luc !== null && json.dangkiem_hieu_luc !== "") ? json.dangkiem_hieu_luc : dateNow);
    _frmAddRegistryInfo.getControl("dangkiem_het_han").val((json.dangkiem_het_han !== undefined && json.dangkiem_het_han !== null && json.dangkiem_het_han !== "") ? json.dangkiem_het_han : dateNow);
    _addRegistryInfoModal.show();
}
function loadDanhSachHoSoGiayTo() {
    if (ho_so_chi_tiet.data_info.ho_so_giay_to !== undefined) {
        ESUtil.genHTML("templateDsHoSoGiayTo", "bodyDsHoSoGiayTo", { ho_so_giay_to: ho_so_chi_tiet.data_info.ho_so_giay_to });
    }
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
function loadDanhSachHoSoGiayToLoi() {
    if (ho_so_chi_tiet.data_info.loi !== undefined) {
        ESUtil.genHTML("bodyHoSoGiayToLoi_template", "bodyHoSoGiayToLoi", ho_so_chi_tiet.data_info);
    }
}
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
async function bindGridPageLoad(arrRes) {
    _gridViewHoSoGiamDinh.setDataSource(arrRes[2], 1, GRID_HO_SO_SO_DONG);
}
function base64ToArrayBuffer(base64) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
        var ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
function chonGara(ma_gara) {
    var checked = $("#gara_" + ma_gara).is(":checked");
    $(".input-tkiem-gara").prop("checked", false);
    $("#gara_" + ma_gara).prop("checked", checked);
}
function xoaSelectAnh() {
    $("input[name='ds_anh_xe']").prop("checked", false);
}
function luuPhanHangMuc(callback = undefined) {
    var hanh_dong = _frmThemHMTT.getControl("hanh_dong").val();
    _frmThemHMTT.clearErrorMessage();
    var loai = _frmThemHMTT.getControl("loai").val();
    var hang_muc = _frmThemHMTT.getControl("hang_muc").attr("data-val");
    if (hang_muc === undefined || hang_muc === null) {
        hang_muc = "";
    }
    if (loai === "") {
        _frmThemHMTT.isValid();
        return;
    }
    var jsonFormHMTT = _frmThemHMTT.getJsonData();
    jsonFormHMTT.hang_muc = hang_muc;
    jsonFormHMTT.ma_kho = "";
    if (loai === "TT") {
        var doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == jsonFormHMTT.so_id_doi_tuong).firstOrDefault();
        var lhnv = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma === jsonFormHMTT.lh_nv.trim()).firstOrDefault();
        if (lhnv === null) {
            _frmThemHMTT.setError("lh_nv");
            return;
        }
        if (lhnv !== null && lhnv.loai !== "BB" || (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "XE")) {
            if (_frmThemHMTT.isValid()) {
                jsonFormHMTT.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
                jsonFormHMTT.pm = CONSTANT_PM;
                jsonFormHMTT.muc_do = $("#frmThemHMTT_muc_do").attr("data-val");
                jsonFormHMTT.so_id_doi_tuong = _frmThemHMTT.getControl('so_id_doi_tuong').getValue();
                if (hanh_dong === "them_moi") {
                    jsonFormHMTT.bt = getImageSelect();
                }
                else {
                    var hang_muc_cu = _frmThemHMTT.getControl("hang_muc_cu").val();
                    jsonFormHMTT.bt = ho_so_chi_tiet.data_info.hinh_anh.where(n => n.ma_file == hang_muc_cu).select(n => n.bt);
                }

                if (doi_tuong == null) {
                    _notifyService.error("Không xác định được đối tượng");
                    return;
                }
                HANG_MUC_PHAN_LOAI_CUOI_CUNG = jsonFormHMTT;
                _service.phanLoaiHangMucTonThat(jsonFormHMTT).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    if (hanh_dong != "them_moi") {
                        var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                        var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
                        var doi_tuong_id = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
                        var hang_muc = $("#navDanhGiaNghiepVu li.active").attr("data-hang-muc");
                        hang_muc = hang_muc || "";
                        if (lhnv != undefined && !(doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "XE")) {
                            xemChiTietDTTonThat(lhnv, nhom, doi_tuong_id, hang_muc);
                        }
                    }
                    getAnhThumnail(res => {
                        if (!callback) {
                            for (var i = 0; i < jsonFormHMTT.bt.length; i++) {
                                $("#img" + jsonFormHMTT.bt[i]).prop("checked", true);
                            }
                        }
                    });
                    if (doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "XE")
                        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id }, res => {
                            _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").trigger("select2:select");
                        });
                    else
                        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
                    _notifyService.success("Lưu thông tin thành công");
                    var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                    _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                        ho_so_chi_tiet = resDetail;
                        $("#navThongTinChung").bindJsonToHtml(resDetail.data_info.ho_so);
                    });
                    if (callback) {
                        callback();
                    }
                });
            }
        }
        else if (lhnv !== null && lhnv.loai === "BB") {
            var jsonFormHMTTBB = _frmThemHMTT.getJsonData();
            jsonFormHMTTBB.hang_muc = hang_muc;
            jsonFormHMTTBB.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            jsonFormHMTTBB.pm = CONSTANT_PM;
            jsonFormHMTTBB.muc_do = $("#frmThemHMTT_muc_do").attr("data-val");
            jsonFormHMTT.so_id_doi_tuong = _frmThemHMTT.getControl('so_id_doi_tuong').getValue();
            var check = true;
            if (jsonFormHMTTBB.loai === undefined || jsonFormHMTTBB.loai === null || jsonFormHMTTBB.loai === "") {
                check = false;
                _frmThemHMTT.setError("loai");
            }
            if (jsonFormHMTTBB.tien_gd === undefined || jsonFormHMTTBB.tien_gd === null || jsonFormHMTTBB.tien_gd === "") {
                check = false;
                _frmThemHMTT.setError("tien_gd");
            }
            if (jsonFormHMTTBB.vu_tt === undefined || jsonFormHMTTBB.vu_tt === null || jsonFormHMTTBB.vu_tt === "") {
                check = false;
                _frmThemHMTT.setError("vu_tt");
            }
            if (check) {
                if (jsonFormHMTTBB.hang_muc == "NGUOI" || jsonFormHMTTBB.hang_muc == "TN_NGUOI") {
                    jsonFormHMTTBB.thay_the_sc = "";
                    jsonFormHMTTBB.chinh_hang = "";
                    jsonFormHMTTBB.thu_hoi = "";
                }
                if (hanh_dong === "them_moi") {
                    jsonFormHMTTBB.bt = getImageSelect();
                    HANG_MUC_PHAN_LOAI_CUOI_CUNG = jsonFormHMTTBB;
                    _service.phanLoaiHangMucTonThat(jsonFormHMTTBB).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        getAnhThumnail(res => {
                            if (!callback) {
                                for (var i = 0; i < jsonFormHMTT.bt.length; i++) {
                                    $("#img" + jsonFormHMTT.bt[i]).prop("checked", true);
                                }
                            }
                        });
                        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
                        _notifyService.success("Lưu thông tin thành công");
                        if (callback) {
                            callback();
                        }
                    });
                } else {
                    HANG_MUC_PHAN_LOAI_CUOI_CUNG = jsonFormHMTTBB;
                    _service.capNhatHangMucTonThatDaPhan(jsonFormHMTTBB).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
                        _notifyService.success("Lưu thông tin thành công");

                        var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
                        var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
                        var doi_tuong = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
                        var hang_muc = $("#navDanhGiaNghiepVu li.active").attr("data-hang-muc");
                        hang_muc = hang_muc || "";
                        if (lhnv != undefined) {
                            xemChiTietDTTonThat(lhnv, nhom, doi_tuong, hang_muc);
                        }

                        if (callback) {
                            callback();
                        }
                    });
                }
            }
        }
    }
    else if (loai === "TL" || loai === "TC") {
        if (hang_muc === "") {
            _frmThemHMTT.setError("hang_muc");
            return;
        }
        if (hanh_dong === "them_moi") {
            jsonFormHMTT.bt = getImageSelect();
            HANG_MUC_PHAN_LOAI_CUOI_CUNG = jsonFormHMTT;
            _service.phanLoaiHangMucTonThat({
                pm: CONSTANT_PM,
                loai: loai,
                hang_muc: hang_muc,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_doi_tuong: _frmThemHMTT.getControl('so_id_doi_tuong').getValue(),
                bt: getImageSelect(),
                ghi_chu: jsonFormHMTT.ghi_chu
            }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(res => {
                    if (!callback) {
                        for (var i = 0; i < jsonFormHMTT.bt.length; i++) {
                            $("#img" + jsonFormHMTT.bt[i]).prop("checked", true);
                        }
                    }
                });
                layLaiDsHoSoGiayTo();
                if (callback) {
                    callback();
                }
                _notifyService.success("Lưu thông tin thành công");
            });
        }
    }
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
    gdv_chon = null;
    if (obj.tinh_thanh === "" && obj.quan_huyen === "") {
        ESUtil.genHTML("templateDsGiamDinhVienTheoDiaBan", "bodyDsGiamDinhVienTheoDiaBan", { ds_gdv: [] });
        return;
    }
    _service.layDsGiamDinhVien(obj).then(res => {
        ESUtil.genHTML("templateDsGiamDinhVienTheoDiaBan", "bodyDsGiamDinhVienTheoDiaBan", { ds_gdv: res.data_info });
    });
}
function layChiPhiTuDong() {
    var obj = _frmThemHMTT.getJsonData();
    var check = true;
    if (ho_so_chi_tiet.data_info.dien_bien === undefined ||
        ho_so_chi_tiet.data_info.dien_bien === null ||
        ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt !== undefined).length <= 0) {
        check = false;
    }
    if (ho_so_chi_tiet.data_info.ho_so === undefined ||
        ho_so_chi_tiet.data_info.ho_so === null ||
        ho_so_chi_tiet.data_info.ho_so.hang_xe === undefined ||
        ho_so_chi_tiet.data_info.ho_so.hang_xe === null ||
        ho_so_chi_tiet.data_info.ho_so.hang_xe === "") {
        check = false;
    }
    if (ho_so_chi_tiet.data_info.ho_so === undefined ||
        ho_so_chi_tiet.data_info.ho_so === null ||
        ho_so_chi_tiet.data_info.ho_so.hieu_xe === undefined ||
        ho_so_chi_tiet.data_info.ho_so.hieu_xe === null ||
        ho_so_chi_tiet.data_info.ho_so.hieu_xe === "") {
        check = false;
    }
    obj.hang_muc = _frmThemHMTT.getControl("hang_muc").attr("data-val");

    if (obj.hang_muc === undefined || obj.hang_muc === null || obj.hang_muc === "") {
        check = false;
    }
    if ($("#frmThemHMTT_muc_do").attr("data-val") === undefined || $("#frmThemHMTT_muc_do").attr("data-val") === null || $("#frmThemHMTT_muc_do").attr("data-val") === "") {
        check = false;
    }
    if (obj.thay_the_sc === undefined || obj.thay_the_sc === null || obj.thay_the_sc === "") {
        check = false;
    }
    if (obj.chinh_hang === undefined || obj.chinh_hang === null || obj.chinh_hang === "") {
        check = false;
    }
    if (!check) {
        _frmThemHMTT.getControl("tien_tu_dong").val("0");
        return;
    }
    obj.muc_do = $("#frmThemHMTT_muc_do").attr("data-val");
    if (obj.vu_tt == undefined || obj.vu_tt == null || obj.vu_tt == "" || obj.vu_tt == "0") {
        return;
    }
    //obj.tinh_thanh = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt == obj.vu_tt).firstOrDefault().tinh_thanh;
    obj.hang_xe = ho_so_chi_tiet.data_info.ho_so.hang_xe;
    obj.hieu_xe = ho_so_chi_tiet.data_info.ho_so.hieu_xe;
    obj.nam_sx = ho_so_chi_tiet.data_info.ho_so.nam_sx;

    var objTmp = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        tinh_thanh: '',
        gara: '',
        hang_muc: obj.hang_muc,
        muc_do: obj.muc_do,
        hang_xe: obj.hang_xe,
        hieu_xe: obj.hieu_xe,
        nam_sx: obj.nam_sx,
        thay_the_sc: obj.thay_the_sc,
        chinh_hang: obj.chinh_hang
    }
    //obj.tinh_thanh = "01";
    //obj.quan_huyen = "019";
    //obj.hang_muc = "00002";
    //obj.muc_do = "MD.00202,MD.00201,MD.00203";
    //obj.hang_xe = "MERCEDES-BENZ";
    //obj.hieu_xe = "E-CLASS";
    //obj.thay_the_sc = "T";
    //obj.chinh_hang = "K";
    _service.layChiPhiTuDong(objTmp).then(res => {
        _frmThemHMTT.getControl("tien_tu_dong").val(res.out_value.gia_tu_dong);
        _frmThemHMTT.getControl("tien_tu_dong").trigger("keyup");
    });
}
function layGiaTuDongPhanLoaiNhanh(callback = undefined) {
    var data = _frmPhanLoaiNhanh.getJsonData();
    if (data.loai != "TT") {
        return;
    }

    var obj = {};
    obj.vu_tt = data.vu_tt;
    if (obj.vu_tt == undefined || obj.vu_tt == null || obj.vu_tt == "" || obj.vu_tt == "0") {
        return;
    }
    obj.hang_muc = $("#divPLHMHangMuc .plhm-hangmuc-item:checked").val();
    var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.vu_tt == obj.vu_tt && n.hang_muc == obj.hang_muc).firstOrDefault();
    if (hm != undefined && hm != null && hm.tien_tu_dong != null && hm.tien_tu_dong != 0) {
        $("#plhm-tien-tu-dong").val(ESUtil.formatMoney(hm.tien_tu_dong));
        return;
    }

    obj.tinh_thanh = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt == obj.vu_tt).firstOrDefault().tinh_thanh;
    obj.hang_xe = ho_so_chi_tiet.data_info.ho_so.hang_xe;
    obj.hieu_xe = ho_so_chi_tiet.data_info.ho_so.hieu_xe;

    if (obj.hang_muc == undefined || obj.hang_muc == null) {
        obj.hang_muc = "";
    }
    var arr_muc_do = [];
    $("#divPLHMMucDo .plhm-mucdo-item:checked").each(function (el) {
        var val = $(this).val();
        arr_muc_do.push(val);
    });
    obj.muc_do = "";
    if (arr_muc_do.length > 0) {
        arr_muc_do.sort((a, b) => a - b);
        obj.muc_do = arr_muc_do.join(",");
    }
    obj.thay_the_sc = "";
    if ($("#plhmPASC_S").is(":checked")) {
        obj.thay_the_sc = "S";
    }
    if ($("#plhmPASC_T").is(":checked")) {
        obj.thay_the_sc = "T";
    }
    obj.chinh_hang = "";
    if ($("#plhmPAChinhHang_K").is(":checked")) {
        obj.chinh_hang = "K";
    }
    if ($("#plhmPAChinhHang_C").is(":checked")) {
        obj.chinh_hang = "C";
    }
    if (obj.hang_muc == "" || obj.muc_do == "" || obj.thay_the_sc == "" || obj.chinh_hang == "") {
        return;
    }
    _service.layChiPhiTuDong(obj).then(res => {

        $("#plhm-tien-tu-dong").val(res.out_value.gia_tu_dong);
        if (callback) {
            callback(res);
        }
    });
}
function hienThiChatVoiGiamDinhVien() {
    $("#btnTroChuyenGiamDinhVien").hide();
    var ho_so = ho_so_chi_tiet.data_info.ho_so;
    if (ho_so.ma_doi_tac === ESCS_MA_DOI_TAC && ho_so.nsd === ESCS_NSD) {
        $("#btnTroChuyenGiamDinhVien").show();
    }
}
function chatGiamDinhVien(ma_doi_tac, so_id, dvi_gdinh, ma_gdv, ten_gdv) {
    //Lấy 100 nội dung chát gần nhất
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        dvi_gdinh: dvi_gdinh,
        ma_gdv: ma_gdv,
        ten_gdv: ten_gdv
    };
    $("#dropdownGDVHT").removeClass('show');
    $("#dropdownGDVTT").removeClass('show');
    //Có dung chát thì bind vào hộp chát
    _eschat.showHide({
        page: 1,
        contents: [],
        is_show: true,
        dispay_name: ten_gdv,
        is_call_video: true,
        is_attach_file: true,
        is_scroll_load_event: true,
        data: obj,
        ajax_load: {
            url: "/home/getcontentchat",
            type: "POST"
        }
    });
    _modalTroChuyenGDV.hide();
}
function xemChiTietAnhHangMucGT(ma_doi_tac, so_id, ma_hs) {
    $("#divViewImages").html("");
    getAnhThumnailView(ma_hs, (res) => {
        if (res.data_info.length <= 0) {
            _notifyService.error("Không có ảnh hiển thị");
            return;
        }
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
        ESUtil.genHTML("templateItemViewImage", "modalViewImagesContentList", res);
        _modalViewImages.show();
    });
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
            var image = $("<img class='img-fluid' style='max-height: 410px; margin: 0 auto;' />");
            if (res.data_info.duong_dan_ai != undefined && res.data_info.duong_dan_ai != null && res.data_info.duong_dan_ai != "") {
                image.attr("src", "data:image/png;base64," + res.data_info.duong_dan_ai);
            }
            else {
                image.attr("src", "data:image/png;base64," + res.data_info.duong_dan);
            }
            $("#divViewImages").html(image);
        }
    });
}
function onToggleImg(index) {
    var count = $(".nhom_anh_ton_that_" + index + ":checked").length;
    var count_check = $(".nhom_anh_ton_that_" + index).length;
    if (count < count_check) {
        // $(".nhom_anh_ton_that_" + index).prop("checked", true);
        $(".nhom_anh_ton_that_" + index).trigger("click");
    } else {
        $(".nhom_anh_ton_that_" + index).prop("checked", false);
    }
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
        ANH_CHON_CUOI_CUNG = gd_chon_anh_arr[gd_chon_anh_arr.length - 1];
    }
    phanLoaiAnh();
}
function anHienNutDuyet(phan_cap = "K") {
    $("#btnDuyetgiamdinh").hide();
    if (phan_cap == "C") {
        $("#btnDuyetgiamdinh").show();
    }
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
function initAutocomplete() {
    var key = $("#escs_dv_google").val();
    if (key == undefined || key == null || key == "") {
        return;
    }
    _frmDienBienTonThat_dia_diem = document.querySelector("#frmDienBienTonThat_dia_diem");
    _frmThongTinGiamDinh_dia_diem = document.querySelector("#frmThongTinGiamDinh_dia_diem");
    autocomplete = new google.maps.places.Autocomplete(_frmDienBienTonThat_dia_diem, {
        componentRestrictions: { country: ["vn"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    autocomplete1 = new google.maps.places.Autocomplete(_frmThongTinGiamDinh_dia_diem, {
        componentRestrictions: { country: ["vn"] },
        fields: ["address_components", "geometry"],
        types: ["address"],
    });
    _frmDienBienTonThat_dia_diem.focus();
    _frmThongTinGiamDinh_dia_diem.focus();
    autocomplete.addListener("place_changed", fillInAddress);
    autocomplete1.addListener("place_changed", fillInAddress1);
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
function fillInAddress1() {
    var place = autocomplete1.getPlace();
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
            _frmThongTinGiamDinh.getControl("tinh_thanh").val(tinh.ma_tinh).trigger('change').trigger('select2:select');
            if (ten_quan != "") {
                var reg_ten_quan = new RegExp(ten_quan.toLowerCase(), 'gi');
                var quan = objDanhMuc.quan_huyen.where(n => n.ma_tinh == ma_tinh && n.ten_quan.toLowerCase().match(reg_ten_quan) != null).firstOrDefault();
                if (quan != null) {
                    ma_quan = quan.ma_quan;
                    _frmThongTinGiamDinh.getControl("quan_huyen").val(quan.ma_quan).trigger('change').trigger('select2:select');
                    if (ten_phuong != "") {
                        var reg_ten_phuong = new RegExp(ten_phuong.toLowerCase(), 'gi');
                        var phuong = objDanhMuc.xa_phuong.where(n => n.ma_tinh == ma_tinh && n.ma_quan == ma_quan && n.ten_phuong.toLowerCase().match(reg_ten_phuong) != null).firstOrDefault();
                        if (phuong != null) {
                            _frmThongTinGiamDinh.getControl("phuong_xa").val(phuong.ma_phuong).trigger('change').trigger('select2:select');
                        }
                    }
                }
            }
        }
    }
    var chon = _frmThongTinGiamDinh_dia_diem.value;
    _frmThongTinGiamDinh_dia_diem.value = chon.split(",")[0];
}
function chuyenNgayGioThanhSo(ngay, gio) {
    var arrNgay = ngay.split('/');
    var arrThoiGian = gio.split(':');
    var ngay_tmp = arrNgay[0].length < 2 ? "0" + arrNgay[0] : arrNgay[0];
    var thang_tmp = arrNgay[1].length < 2 ? "0" + arrNgay[1] : arrNgay[1];
    var nam_tmp = arrNgay[2];
    var gio_tmp = arrThoiGian[0] < 2 ? "0" + arrThoiGian[0] : arrThoiGian[0];
    var phut_tmp = arrThoiGian[1] < 2 ? "0" + arrThoiGian[1] : arrThoiGian[1];
    var so = nam_tmp + thang_tmp + ngay_tmp + gio_tmp + phut_tmp;
    return parseFloat(so);
}
function doiChieuGPLX(strObjOCR) {
    var data = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt != undefined);
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
        arrHT.push({ ma: data[i].vu_tt, ten: data[i].gio_xr + " " + data[i].ngay_xr + " - " + data[i].dia_diem })
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
    var data = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt != undefined);
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
        arrHT.push({ ma: data[i].vu_tt, ten: data[i].gio_xr + " " + data[i].ngay_xr + " - " + data[i].dia_diem })
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
function sdOCR(nhom, vu_tt = '') {
    var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    var bt = '';
    if (nhom == "GPLX") {
        vu_tt = _frmCarClaimCompareDataGPLX.getControl("vu_tt").val();
        so_id_doi_tuong = _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").val();
        bt = _frmCarClaimCompareDataGPLX.getControl("bt").val();
    }
    if (nhom == "DANG_KIEM") {
        vu_tt = _frmCarClaimCompareDataDangKiem.getControl("vu_tt").val();
        so_id_doi_tuong = _frmCarClaimCompareDataGPLX.getControl("so_id_doi_tuong").val();
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
        nhom: nhom,
        arr: arrDataOCR,
        vu_tt: vu_tt,
        bt: bt
    };
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hợp đồng và hồ sơ", "", () => {
        if (obj.arr.length == 0) {
            _notifyService.error("Vui lòng tích chọn dữ liệu để sử dụng");
            return;
        }
        _service.capNhatThongTinOCR(obj).then(res => {
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
        pm: "GD"
    };

    _frmTLThuongTatNhap.resetForm();
    _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", "");
    _service.layDsThuongTat(obj).then(res => {
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
        _service.xoaThuongTat(obj).then(res => {
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
function danhGiaThuongTat(el) {
    var nhom = _frmTkiemTLThuongTat.getControl("nhom").val();
    var source = objDanhMuc.ds_tltt.where(n => n.nhom == nhom);
    fnLoadTreeTLTT(source);
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
    $("#treeTLTT").jstree(true).settings.core.data = source;
    $("#treeTLTT").jstree(true).refresh();
    _popoverTyLeThuongTat.show();
}
function getDataTreeTLTT() {
    var arr = $("#treeTLTT").jstree("get_selected");
    if (arr == undefined || arr == null || arr.length <= 0) {
        return "";
    }
    return arr.join();
}
function chuanHoaBtAnh(arr) {
    var arr_bt = []
    for (var i = 0; i < arr.length; i++) {
        arr_bt.push({ bt: arr[i] });
    }
    return arr_bt;
}
function chuanHoaAIMucDoTonThat(strMucDo) {
    if (strMucDo == undefined || strMucDo == null) {
        return null;
    }
    var arr = strMucDo.split(",");
    var arr_bt = []
    $.each(arr, function (i, el) {
        if ($.inArray(el, arr_bt) === -1) {
            arr_bt.push(el);
        };
    });
    return arr_bt;
}
function anHienControlPhanLoai() {
    $("#divpl_loai").show();
    $("#divpl_lh_nv").show();
    $("#divpl_muc_do").show();
    $("#divpl_thay_the_sc").show();
    $("#divpl_chinh_hang").show();
    $("#divpl_so_luong").show();
    $("#divpl_thu_hoi").show();
    $("#divpl_tien_tu_dong").show();
    $("#divpl_tien_gd").show();
    $("#divpl_hang_muc").show();
    $("#divpl_vu_tt").show();
    $("#divpl_ghi_chu").show();

    $("#divpl_loai").removeClass("col-12");
    $("#divpl_loai").addClass("col-6");
    $("#divpl_lh_nv").removeClass("col-12");
    $("#divpl_lh_nv").addClass("col-6");
    $("#divpl_muc_do").removeClass("col-12");
    $("#divpl_muc_do").addClass("col-6");
    $("#divpl_thay_the_sc").removeClass("col-12");
    $("#divpl_thay_the_sc").addClass("col-6");
    $("#divpl_chinh_hang").removeClass("col-12");
    $("#divpl_chinh_hang").addClass("col-6");
    $("#divpl_thu_hoi").removeClass("col-12");
    $("#divpl_thu_hoi").addClass("col-6");
    $("#divpl_tien_tu_dong").removeClass("col-12");
    $("#divpl_tien_tu_dong").addClass("col-6");
    $("#divpl_tien_gd").removeClass("col-12");
    $("#divpl_tien_gd").addClass("col-6");

    $("#divpl_so_id_doi_tuong").removeClass("col-6");
    $("#divpl_so_id_doi_tuong").addClass("col-12");
    $("#divpl_hang_muc").removeClass("col-6");
    $("#divpl_hang_muc").addClass("col-12");
    $("#divpl_vu_tt").removeClass("col-6");
    $("#divpl_vu_tt").addClass("col-12");
    $("#divpl_ghi_chu").removeClass("col-6");
    $("#divpl_ghi_chu").addClass("col-12");

    var loai = _frmThemHMTT.getControl("loai").val();
    var lhnv = _frmThemHMTT.getControl("lh_nv").val();
    var so_id_doi_tuong = _frmThemHMTT.getControl("so_id_doi_tuong").val();

    var doi_tuong = null;
    if (lhnv != undefined && lhnv != null && lhnv.trim() != "") {
        doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
    }
    if (loai == "TL" || loai == "TC") {
        $("#divpl_loai").removeClass("col-6");
        $("#divpl_loai").addClass("col-12");

        $("#divpl_lh_nv").hide();
        $("#divpl_muc_do").hide();
        $("#divpl_thay_the_sc").hide();
        $("#divpl_chinh_hang").hide();
        $("#divpl_so_luong").hide();
        $("#divpl_thu_hoi").hide();
        $("#divpl_tien_tu_dong").hide();
        $("#divpl_tien_gd").hide();
        $("#divpl_vu_tt").hide();
        $("#divpl_ghi_chu").hide();
    }
    if (loai == "TL") {
        $("#divpl_ghi_chu").show();
    }
    if (doi_tuong == null) {
        return;
    }
    if (loai == "TT" && doi_tuong.nhom == DOI_TUONG_TT.HANG_HOA) {
        $("#divpl_so_id_doi_tuong").removeClass("col-12");
        $("#divpl_so_id_doi_tuong").addClass("col-6");

        $("#divpl_hang_muc").hide();
        $("#divpl_thay_the_sc").hide();
        $("#divpl_chinh_hang").hide();
        $("#divpl_so_luong").hide();
        $("#divpl_tien_tu_dong").hide();
    }
    if (loai == "TT" && doi_tuong.nhom == DOI_TUONG_TT.NGUOI) {

        $("#divpl_hang_muc").hide();
        $("#divpl_thay_the_sc").hide();
        $("#divpl_chinh_hang").hide();
        $("#divpl_so_luong").hide();
        $("#divpl_thu_hoi").hide();
        $("#divpl_tien_tu_dong").hide();
    }
    if (loai == "TT" && doi_tuong.nhom == DOI_TUONG_TT.TAI_SAN && doi_tuong.loai == "KHAC") {
        $("#divpl_so_id_doi_tuong").removeClass("col-12");
        $("#divpl_so_id_doi_tuong").addClass("col-6");

        $("#divpl_hang_muc").hide();
        $("#divpl_thay_the_sc").hide();
        $("#divpl_chinh_hang").hide();
        $("#divpl_so_luong").hide();
        $("#divpl_tien_tu_dong").hide();
    }
}
function phanLoaiAnh(callback = undefined, arrBtImage = undefined, man_hinh = "them_moi") {
    _frmThemHMTT.resetForm();
    _frmThemHMTT.clearErrorMessage();
    _frmThemHMTT.getControl("hang_muc").readOnly(false);
    _frmThemHMTT.getControl("loai").readOnly(false);
    _selectCheckBoxService.setCheckedValue([]);
    /*    ESUtil.autoComplete(document.getElementById("frmThemHMTT_hang_muc"), [], "ma", "ten", HANG_MUC_TOP, "280px");*/
    _frmThemHMTT.getControl("hang_muc").attr("data-val", "");
    _frmThemHMTT.getControl("hang_muc").setValue("");
    _frmThemHMTT.getControl("loai").setValue("TT");
    _frmThemHMTT.getControl("thay_the_sc").setValue("S");
    _frmThemHMTT.getControl("chinh_hang").setValue("K");
    _frmThemHMTT.getControl("thu_hoi").setValue("K");
    _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
    //Lấy danh sách bt ảnh đã chọn
    var arrVal = getImageSelect();
    if (arrBtImage != undefined) {
        arrVal = arrBtImage;
    }
    if (arrVal.length <= 0) {
        _notifyService.error("Vui lòng chọn ảnh cần phân loại");
        return;
    }
    //Kiểm tra thông tin ảnh chọn cuối cùng
    if (ANH_CHON_CUOI_CUNG == null) {
        _notifyService.error("Không xác định ảnh được ảnh chọn cuối cùng");
        return;
    }
    var dien_bien = ho_so_chi_tiet.data_info.dien_bien.firstOrDefault();
    if (dien_bien == null) {
        _notifyService.error("Không xác định được vụ tổn thất");
        return;
    }
    var objForm = {
        pm: CONSTANT_PM,
        hanh_dong: man_hinh,
        hang_muc_cu: "",
        bt: arrVal,

        loai: ANH_CHON_CUOI_CUNG.loai,
        lh_nv: ANH_CHON_CUOI_CUNG.lh_nv || "",
        so_id_doi_tuong: ANH_CHON_CUOI_CUNG.so_id_doi_tuong,
        hang_muc: ANH_CHON_CUOI_CUNG.ma_file,
        hang_muc_ten: ANH_CHON_CUOI_CUNG.ten_file,
        muc_do: ANH_CHON_CUOI_CUNG.muc_do,
        muc_do_ten: ANH_CHON_CUOI_CUNG.muc_do_ten,
        thay_the_sc: ANH_CHON_CUOI_CUNG.thay_the_sc,
        chinh_hang: ANH_CHON_CUOI_CUNG.chinh_hang,
        thu_hoi: ANH_CHON_CUOI_CUNG.thu_hoi,
        so_luong: ANH_CHON_CUOI_CUNG.so_luong,
        tien_tu_dong: ANH_CHON_CUOI_CUNG.tien_tu_dong == null ? 0 : ANH_CHON_CUOI_CUNG.tien_tu_dong,
        tien_gd: ANH_CHON_CUOI_CUNG.tien_gd == null ? 0 : ANH_CHON_CUOI_CUNG.tien_gd,
        vu_tt: ANH_CHON_CUOI_CUNG.vu_tt,
        ghi_chu: ANH_CHON_CUOI_CUNG.ghi_chu
    }
    if (objForm.loai == null || objForm.loai == "") {
        objForm.loai = "TT";
    }
    if (objForm.loai == "TT") {
        var objHangMuc = ho_so_chi_tiet.data_info.hang_muc.where(n => n.loai == objForm.loai && n.hang_muc == objForm.hang_muc).firstOrDefault();
        objForm.hang_muc_ten = objHangMuc == null ? objForm.hang_muc_ten : objHangMuc.ten_hang_muc;
    }
    if (objForm.loai == "TL") {
        var objHangMuc = ho_so_chi_tiet.data_info.ho_so_giay_to.where(n => n.ma_hs == objForm.hang_muc).firstOrDefault();
        objForm.hang_muc_ten = objHangMuc == null ? objForm.hang_muc_ten : objHangMuc.ten;
        objForm.ghi_chu = objHangMuc == null ? objForm.ghi_chu : objHangMuc.ghi_chu;
    }
    if (objForm.loai == "TC") {
        var objHangMuc = ho_so_chi_tiet.data_info.hinh_anh.where(n => n.ma_file == objForm.hang_muc).firstOrDefault();
        var ds_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong;
        _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(ds_doi_tuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", ds_doi_tuong.length == 1 ? ds_doi_tuong[0].so_id_doi_tuong : "");
        objForm.hang_muc = objHangMuc.ma_file;
        objForm.hang_muc_ten = objHangMuc.ten_file;
    }
    if (objForm.vu_tt == null || objForm.vu_tt == "" || objForm.vu_tt == "0") {
        objForm.vu_tt = dien_bien.vu_tt;
    }
    if ((objForm.lh_nv == undefined || objForm.lh_nv == null || objForm.lh_nv == "") &&
        ho_so_chi_tiet.data_info.lh_nv != undefined && ho_so_chi_tiet.data_info.lh_nv != null && ho_so_chi_tiet.data_info.lh_nv.length == 1) {
        objForm.lh_nv = ho_so_chi_tiet.data_info.lh_nv[0].ma;
    }
    if ((objForm.so_id_doi_tuong == undefined || objForm.so_id_doi_tuong == null || objForm.so_id_doi_tuong == "" || objForm.so_id_doi_tuong == "0") &&
        ho_so_chi_tiet.data_info.ds_doi_tuong != undefined && ho_so_chi_tiet.data_info.ds_doi_tuong != null && ho_so_chi_tiet.data_info.ds_doi_tuong.length == 1) {
        objForm.so_id_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong[0].so_id_doi_tuong;
    }
    _frmThemHMTT.setData(objForm);
    _frmThemHMTT.getControl("loai").trigger("select2:select");
    _frmThemHMTT.getControl("lh_nv").trigger("select2:select");
    if (objForm.lh_nv != "") {
        _frmThemHMTT.getControl("so_id_doi_tuong").setValue(objForm.so_id_doi_tuong);
        _frmThemHMTT.getControl("so_id_doi_tuong").trigger("select2:select");
    }
    _frmThemHMTT.getControl("muc_do").attr("data-val", objForm.muc_do);
    _frmThemHMTT.getControl("muc_do").setValue(objForm.muc_do_ten);

    _frmThemHMTT.getControl("hang_muc").attr("data-val", objForm.hang_muc);
    _frmThemHMTT.getControl("hang_muc").setValue(objForm.hang_muc_ten);
    _frmThemHMTT.getControl("thay_the_sc").trigger("select2:select");
    _frmThemHMTT.getControl("thu_hoi").trigger("select2:select");

    anHienControlPhanLoai();
    if (callback) {
        callback();
    }
}
function fnLoadTreeTLTT(json_data) {
    var id = "treeTLTT";
    $('#' + id)
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
function onSearchTyLeThuongTat(el) {
    $("#inputTimKiemTyLeThuongTat").trigger("focus");
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
function bindPhanLoaiHangMuc() {
    ESUtil.genHTML("divPLHMHangMucTemplate", "divPLHMHangMuc", { danh_sach: objDanhMuc.hang_muc_xe });
    objDanhMuc.muc_do_ton_that.sort((a, b) => { return a.ma_ct > b.ma_ct ? -1 : 1; });
    var arrMucDo = [];
    var mucdo_ct = objDanhMuc.muc_do_ton_that.where(n => n.ma_ct == null);
    for (var i = 0; i < mucdo_ct.length; i++) {
        mucdo_ct[i].children = [];
        var chil = objDanhMuc.muc_do_ton_that.where(n => n.ma_ct == mucdo_ct[i].ma);
        if (chil != null && chil.length > 0) {
            for (var j = 0; j < chil.length; j++) {
                mucdo_ct[i].children.push(chil[j]);
            }
        }
        arrMucDo.push(mucdo_ct[i]);
    }
    //arrMucDo.sort((a, b) => a.stt - b.stt);
    var arrMucDoNhom = [
        { nhom: "XE", ten: "", danh_sach: [] },
        { nhom: "NG", ten: "Tổn thất về người", danh_sach: [] },
        { nhom: "TAI_SAN", ten: "Tổn thất về tài sản", danh_sach: [] }
    ];
    for (var i = 0; i < arrMucDoNhom.length; i++) {
        arrMucDoNhom[i].danh_sach = arrMucDo.where(n => n.nhom == arrMucDoNhom[i].nhom);
    }
    ESUtil.genHTML("divPLHMMucDoTemplate", "divPLHMMucDo", { nhom: arrMucDoNhom });
}
function bindPhanLoaiHangMucCT() {
    var arr = ho_so_chi_tiet.data_info.dien_bien;
    if (arr !== null && arr.length > 0) {
        var arrClone = arr.clone();
        var arrHT = [];
        for (var i = 0; i < arrClone.length; i++) {
            arrHT.push({ ma: arrClone[i].vu_tt, ten: arrClone[i].gio_xr + " " + arrClone[i].ngay_xr + " - " + arrClone[i].dia_diem })
        }
        _frmPhanLoaiNhanh.getControl("vu_tt").setDataSource(arrHT, "ten", "ma", "Chọn vụ tổn thất", "");
        if (arrHT.length === 1) {
            _frmPhanLoaiNhanh.getControl("vu_tt").setValue(arrHT[0].ma);
        }
    }
    _frmPhanLoaiNhanh.getControl("lh_nv").setDataSource(ho_so_chi_tiet.data_info.lh_nv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
    if (ho_so_chi_tiet.data_info.lh_nv.length == 1) {
        _frmPhanLoaiNhanh.getControl("lh_nv").setValue(ho_so_chi_tiet.data_info.lh_nv[0].ma);
    }

    ESUtil.genHTML("tbDsPhanLoaiNhanhTemplate", "tbDsPhanLoaiNhanh", { danh_sach: ho_so_chi_tiet.data_info.hang_muc }, () => {
        var tong = ho_so_chi_tiet.data_info.hang_muc.sum(n => n.gia_giam_dinh);
        $("#tbDsPhanLoaiNhanhTongCong").html(ESUtil.formatMoney(tong));
    });
    anHienDanhMucPhanLoaiNhanh("LOAI");
    anHienDanhMucPhanLoaiNhanh("LHNV");
}
function plhmChonAnh(bt, ma_file) {
    var active = $("#divAnhPhanLoai_" + bt).hasClass("active");
    if (active) {
        $("#divAnhPhanLoai_" + bt).removeClass("active");
    }
    else {
        $("#divAnhPhanLoai_" + bt).addClass("active");
    }
    if (ma_file != undefined && ma_file != null && ma_file != "" && !active) {
        $("#plhm-tien-tu-dong").val("0");
        $("#plhm-tien-gd").val("0");

        var obj = _frmPhanLoaiNhanh.getJsonData();
        var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.hang_muc == ma_file).firstOrDefault();
        if (hm != undefined && hm != null) {
            if (hm.loai != undefined && hm.loai != null && hm.loai.trim() != "") {
                _frmPhanLoaiNhanh.getControl("loai").setValue(hm.loai);
                _frmPhanLoaiNhanh.getControl("loai").trigger("select2:select");
            }
            if (hm.lh_nv != undefined && hm.lh_nv != null && hm.lh_nv.trim() != "") {
                _frmPhanLoaiNhanh.getControl("lh_nv").setValue(hm.lh_nv);
                _frmPhanLoaiNhanh.getControl("lh_nv").trigger("select2:select");
            }
            var mucdo_tt = hm.muc_do != null ? hm.muc_do.split(",") : "";
            if (obj.loai == "TT") {
                $("#inputPLHMTKiemHangMuc").val(hm.ten_hang_muc);
                /*$("#inputPLHMTKiemHangMuc").trigger("keyup");*/
                $("#divPLHMHangMuc .plhm-hangmuc-item").prop("checked", false);
                $("#divPLHMHangMuc #plhm_hangmuc_" + ma_file).prop("checked", true);
                $("#plhm-tien-tu-dong").val(ESUtil.formatMoney(hm.tien_tu_dong));
                $("#plhm-tien-gd").val(ESUtil.formatMoney(hm.tien_gd));
            }
            $("#divPLHMMucDo .plhm-mucdo-item").prop("checked", false);
            $("#divPLHMMucDo .plhm-mucdo-item").removeAttr("disabled");
            if (mucdo_tt.length > 0) {
                for (var i = 0; i < mucdo_tt.length; i++) {
                    $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + mucdo_tt[i] + "']").prop("checked", true);
                    $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + mucdo_tt[i] + "']").trigger("change");
                }
            }
            if (hm.thay_the_sc != "") {
                $("#plhmPASC_" + hm.thay_the_sc).prop("checked", true);
            }
            if (hm.chinh_hang != "") {
                $("#plhmPAChinhHang_" + hm.chinh_hang).prop("checked", true);
            }
            if (hm.thu_hoi != "") {
                $("#plhmPAThuHoi_" + hm.thu_hoi).prop("checked", true);
            }
        }
        else {
            var hinh_anh = ho_so_chi_tiet.data_info.hinh_anh.where(n => n.ma_file == ma_file).firstOrDefault();
            if (hinh_anh != undefined && hinh_anh != null && hinh_anh.loai != undefined && hinh_anh.loai != null && hinh_anh.loai != "") {
                _frmPhanLoaiNhanh.getControl("loai").setValue(hinh_anh.loai);
                _frmPhanLoaiNhanh.getControl("loai").trigger("select2:select");

                $("#inputPLHMTKiemHangMuc").val(hinh_anh.nhom_anh);
                /*                $("#inputPLHMTKiemHangMuc").trigger("keyup");*/
                $("#divPLHMHangMuc .plhm-hangmuc-item").prop("checked", false);
                $("#divPLHMHangMuc #plhm_hangmuc_" + ma_file).prop("checked", true);
            }
        }
    }
    $("#tbDsPhanLoaiNhanh .plhm_hang_muc_phan").removeClass("active");
}
function plhmDblChonAnh(bt) {
    $("#plhm_nhanh_xem_vi_tri_anh").html("Xem vị trí chụp ảnh");
    if (ho_so_chi_tiet.data_info.hinh_anh != undefined && ho_so_chi_tiet.data_info.hinh_anh != null && ho_so_chi_tiet.data_info.hinh_anh.length > 0) {
        var tailieu = ho_so_chi_tiet.data_info.hinh_anh.where(n => n.bt == bt).firstOrDefault();
        if (tailieu.extension != ".pdf") {
            $("#plhm_nhanh_xem_vi_tri_anh").html("Xem vị trí chụp ảnh(" + tailieu.x + "," + tailieu.y + ")");
            $("#plhm_nhanh_xem_vi_tri_anh").attr("data-x", tailieu.x);
            $("#plhm_nhanh_xem_vi_tri_anh").attr("data-y", tailieu.y);
            anHienXemAnhPhanLoaiNhanh();
        }
    }

}
function plhmChonNhomAnh(nhom_anh) {
    var count = $("#divPLHMHinhAnh .divAnhPhanLoai[data-ma-file='" + nhom_anh + "'].active").length;
    if (count > 0) {
        $("#divPLHMHinhAnh .divAnhPhanLoai[data-ma-file='" + nhom_anh + "']").removeClass("active");
    }
    else {
        $("#divPLHMHinhAnh .divAnhPhanLoai[data-ma-file='" + nhom_anh + "']").each(function () {
            var bt = $(this).attr("data-bt");
            plhmChonAnh(bt, nhom_anh);
        });
    }
}
function anHienXemAnhPhanLoaiNhanh(hien = true) {
    if (hien) {
        $("#divPhanLoaiDanhSach").hide();
        $("#divPhanLoaiXemAnh").show();
    }
    else {
        $("#divPhanLoaiDanhSach").show();
        $("#divPhanLoaiXemAnh").hide();
    }
}
function plhmChonHangMuc(el, ma, loai, nhom, nv) {
    $("#divPLHMHangMuc .plhm-hangmuc-item").prop("checked", false);
    $(el).prop("checked", true);
    if (loai == "TNDS" && ma == "NGUOI") {
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").prop("checked", false);
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").attr("disabled", "disabled");
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").removeAttr("disabled");
    }
    if (loai == "TNDS" && ma == "TAI_SAN") {
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").prop("checked", false);
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").attr("disabled", "disabled");
        $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").removeAttr("disabled");
    }
    layGiaTuDongPhanLoaiNhanh();
}
function plhmChonMucDo(el, ma, ma_ct, nv, nhom, pa_khac_phuc) {
    var checked = $(el).is(":checked");
    if (nhom == "XE") {
        if (checked) {
            $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma-ct='" + ma + "']").attr("disabled", "disabled");
        }
        else {
            $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma-ct='" + ma + "']").removeAttr("disabled");
        }

        if (ma_ct != "") {
            if (checked) {
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + ma_ct + "']").attr("disabled", "disabled");
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma-ct='" + ma_ct + "']").attr("disabled", "disabled");
            }
            else {
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + ma_ct + "']").removeAttr("disabled");
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma-ct='" + ma_ct + "']").removeAttr("disabled");
            }
            $(el).removeAttr("disabled");
        }

        var dem = $("#divPLHMMucDo .plhm-mucdo-item[plhm-phuong-an='T']:checked").length;
        if (dem > 0) {
            $("#plhmPASC_T").prop("checked", true);
            $("#plhmPAThuHoi_C").prop("checked", true);
        }
        else {
            $("#plhmPASC_S").prop("checked", true);
            $("#plhmPAThuHoi_K").prop("checked", true);
        }
    }
    if (nhom == "NG" || nhom == "TAI_SAN") {
        if (checked) {
            $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='" + nhom + "']").attr("disabled", "disabled");
        }
        else {
            $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='" + nhom + "']").removeAttr("disabled");
        }
        $(el).removeAttr("disabled");
    }
    layGiaTuDongPhanLoaiNhanh();
}
function luuPhanLoaiNhanh(obj, callback = undefined) {
    _service.phanLoaiHangMucTonThat(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getAnhThumnail();
        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id }, res => {
            ESUtil.genHTML("tbDsPhanLoaiNhanhTemplate", "tbDsPhanLoaiNhanh", { danh_sach: ho_so_chi_tiet.data_info.hang_muc }, () => {
                var tong = ho_so_chi_tiet.data_info.hang_muc.sum(n => n.gia_giam_dinh);
                $("#tbDsPhanLoaiNhanhTongCong").html(ESUtil.formatMoney(tong));
            });
        });
        _notifyService.success("Lưu thông tin thành công");
        if (callback) {
            callback(res);
        }
    });
}
function anHienDanhMucPhanLoaiNhanh(nhom) {
    /*HANG_HOA,TAI_LIEU,NNTX,CHINH,PHU,TNDS_TS,TNDS_NG,TOAN_CANH,TNDS*/
    var obj = _frmPhanLoaiNhanh.getJsonData();
    var nv = ho_so_chi_tiet.data_info.ho_so.ma_nv;
    $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TLHD']").addClass("d-none");
    $("#divPLHMHangMuc .div-plhm-hangmuc-item").addClass("d-none");
    $("#divPLHMHangMuc .plhm-hangmuc-item").prop("checked", false);
    $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TLHD']").addClass("d-none");
    if (obj.loai == "TT") {
        var objLHNV = null;
        if (obj.lh_nv != "") {
            objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv).firstOrDefault();
        }
        if (objLHNV == null || objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
            $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='CHINH']").removeClass("d-none");
        }
        if (objLHNV != null && objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='HANG_HOA']").removeClass("d-none");
        }
        if (objLHNV != null && objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom != NHOM_LHNV.TNDS) {
            $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='NNTX']").removeClass("d-none");
        }
        if (objLHNV != null && objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TNDS_NG']").removeClass("d-none");
        }
        if (objLHNV != null && objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN && objLHNV.nhom == NHOM_LHNV.TNDS) {
            $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TNDS_TS']").removeClass("d-none");
        }
        $("#divPLHMMucDo .plhm-mucdo-item").removeAttr("disabled");
        $("#plhmPAKhacPhuc input[name='plhmPASC']").removeAttr("disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").removeAttr("disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").removeAttr("disabled");
    }
    if (obj.loai == "TL") {
        $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TAI_LIEU']").removeClass("d-none");

        $("#divPLHMMucDo .plhm-mucdo-item").attr("disabled", "disabled");
        $("#divPLHMMucDo .plhm-mucdo-item").prop("checked", false);
        $("#plhmPAKhacPhuc input[name='plhmPASC']").attr("disabled", "disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").attr("disabled", "disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").attr("disabled", "disabled");

        $("#plhmPAKhacPhuc input[name='plhmPASC']").prop("checked", false);
        $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").prop("checked", false);
        $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").prop("checked", false);
    }
    if (obj.loai == "TC") {
        $("#divPLHMHangMuc .div-plhm-hangmuc-item[plhm-hangmuc-loai='TOAN_CANH']").removeClass("d-none");

        $("#divPLHMMucDo .plhm-mucdo-item").attr("disabled", "disabled");
        $("#divPLHMMucDo .plhm-mucdo-item").prop("checked", false);

        $("#plhmPAKhacPhuc input[name='plhmPASC']").attr("disabled", "disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").attr("disabled", "disabled");
        $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").attr("disabled", "disabled");

        $("#plhmPAKhacPhuc input[name='plhmPASC']").prop("checked", false);
        $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").prop("checked", false);
        $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").prop("checked", false);
    }
    if (nhom == "LHNV") {
        var doi_tuong = null;
        if (obj.lh_nv == undefined || obj.lh_nv == null || obj.lh_nv.trim() == "") {
            return;
        }
        doi_tuong = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv.trim()).firstOrDefault().doi_tuong;
        var hang_muc_tnds = "";
        $("#divPLHMMucDo .div-plhm-mucdo-item").show();
        $("#divPLHMMucDo .plhm-mucdo-item").prop("checked", false);
        $("#plhm_nhom_muctt_XE").show();
        $("#plhm_nhom_muctt_NG").show();
        $("#plhm_nhom_muctt_TAI_SAN").show();
        if (nv == "TN") {
            if (doi_tuong == DOI_TUONG_TT.XE) {
                $("#plhm_nhom_muctt_NG").hide();
                $("#plhm_nhom_muctt_TAI_SAN").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='NG']").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").hide();
            }
            if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                $("#plhm_nhom_muctt_NG").hide();
                $("#plhm_nhom_muctt_XE").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='NG']").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='XE']").hide();
            }
            if (doi_tuong == DOI_TUONG_TT.NGUOI) {
                $("#plhm_nhom_muctt_TAI_SAN").hide();
                $("#plhm_nhom_muctt_XE").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='XE']").hide();
            }

            $("#plhmPAKhacPhuc input[name='plhmPASC']").removeAttr("disabled");
            $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").removeAttr("disabled");
            $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").removeAttr("disabled");
            if ($("#plhmPAKhacPhuc input[name='plhmPASC']:checked").length <= 0) {
                $("#plhmPAKhacPhuc #plhmPASC_S").prop("checked", true);
            }
            if ($("#plhmPAKhacPhuc input[name='plhmPAChinhHang']:checked").length <= 0) {
                $("#plhmPAKhacPhuc #plhmPAChinhHang_K").prop("checked", true);
            }
            if ($("#plhmPAKhacPhuc input[name='plhmPAThuHoi']:checked").length <= 0) {
                $("#plhmPAKhacPhuc #plhmPAThuHoi_K").prop("checked", true);
            }
        }
        else {
            $("#plhm_nhom_muctt_XE").hide();
            $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='XE']").hide();
            $("#plhmPAKhacPhuc input[name='plhmPASC']").attr("disabled", "disabled");
            $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").attr("disabled", "disabled");
            $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").attr("disabled", "disabled");

            $("#plhmPAKhacPhuc input[name='plhmPASC']").prop("checked", false);
            $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']").prop("checked", false);
            $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']").prop("checked", false);
            if (doi_tuong == DOI_TUONG_TT.NGUOI) {
                $("#plhm_nhom_muctt_TAI_SAN").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").hide();
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").prop("checked", false);
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").attr("disabled", "disabled");
                if (obj.loai == "TT") {
                    $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").removeAttr("disabled");
                }
            }
            if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                $("#plhm_nhom_muctt_NG").hide();
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-mucdo-nhom='NG']").hide();
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").prop("checked", false);
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='NG']").attr("disabled", "disabled");
                if (obj.loai == "TT") {
                    $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-nhom='TAI_SAN']").removeAttr("disabled");
                }
            }
        }
    }
}
function anHienPhanLoai(hien = true) {
    if (hien) {
        $("#divCarCommonInfo").hide();
        $("#divCarClaimContentStep3HinhAnh").hide();
        $("#divCarClaimContentStep3PhanLoai").show();
        anHienXemAnhPhanLoaiNhanh(false);
    }
    else {
        $("#divCarCommonInfo").show();
        $("#divCarClaimContentStep3HinhAnh").show();
        $("#divCarClaimContentStep3PhanLoai").hide();
        anHienXemAnhPhanLoaiNhanh(true);
    }
}
function onChonKhachHang(so_id, so_id_dt, loai) {
    $("#modalCarSearchDsGCN .tkiem_kh").removeClass("active");
    $("#modalCarSearchDsGCN #tkiem_kh_" + so_id + "_" + so_id_dt + "_" + loai).addClass("active");
}
function plhmChonHangMucDaPhan(hang_muc, vu_tt) {
    var hm = ho_so_chi_tiet.data_info.hang_muc.where(n => n.hang_muc == hang_muc && n.vu_tt == vu_tt).firstOrDefault();
    if (hm != undefined && hm != null) {
        _frmPhanLoaiNhanh.getControl("vu_tt").setValue(vu_tt);
        _frmPhanLoaiNhanh.getControl("loai").setValue(hm.loai);
        _frmPhanLoaiNhanh.getControl("loai").trigger("select2:select");
        _frmPhanLoaiNhanh.getControl("lh_nv").setValue(hm.lh_nv.trim());
        _frmPhanLoaiNhanh.getControl("lh_nv").trigger("select2:select");
        $("#inputPLHMTKiemHangMuc").val(hm.ten_hang_muc);
        $("#inputPLHMTKiemHangMuc").trigger("keyup");
        if (ho_so_chi_tiet.data_info.lh_nv.length == 1) {
            _frmPhanLoaiNhanh.getControl("lh_nv").setValue(ho_so_chi_tiet.data_info.lh_nv[0].ma);
            _frmPhanLoaiNhanh.getControl("lh_nv").trigger("select2:select");
        }
        $("#divPLHMHangMuc .plhm-hangmuc-item").prop("checked", false);
        $("#plhm_hangmuc_" + hang_muc).prop("checked", true);
        $("#divPLHMMucDo .plhm-mucdo-item").prop("checked", false);
        $("#divPLHMMucDo .plhm-mucdo-item").removeAttr("disabled");
        var muc_do = hm.muc_do == null ? [] : hm.muc_do.split(",");
        if (muc_do.length > 0) {
            for (var i = 0; i < muc_do.length; i++) {
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + muc_do[i] + "']").prop("checked", true);
                $("#divPLHMMucDo .plhm-mucdo-item[plhm-mucdo-ma='" + muc_do[i] + "']").trigger("change");
            }
        }
        if (hm.thay_the_sc == "S") {
            $("#plhmPASC_S").prop("checked", true);
        }
        if (hm.thay_the_sc == "T") {
            $("#plhmPASC_T").prop("checked", true);
        }
        if (hm.chinh_hang == "K") {
            $("#plhmPAChinhHang_K").prop("checked", true);
        }
        if (hm.chinh_hang == "C") {
            $("#plhmPAChinhHang_C").prop("checked", true);
        }
        if (hm.thu_hoi == "K") {
            $("#plhmPAThuHoi_K").prop("checked", true);
        }
        if (hm.thu_hoi == "C") {
            $("#plhmPAThuHoi_C").prop("checked", true);
        }
        $("#plhm-tien-tu-dong").val(ESUtil.formatMoney(hm.tien_tu_dong));
        $("#plhm-tien-gd").val(ESUtil.formatMoney(hm.tien_gd));
        $("#divPLHMHinhAnh .divAnhPhanLoai").removeClass("active");
        $("#divPLHMHinhAnh .divAnhPhanLoai[data-ma-file='" + hang_muc + "']").addClass("active");
        $("#tbDsPhanLoaiNhanh tr").removeClass("active");
        $("#tbDsPhanLoaiNhanh tr#plhm_hang_muc_phan_" + vu_tt + "_" + hang_muc).addClass("active");
    }
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
                    _notifyService.success("Chuyển khách hàng VIP sang khách hàng phổ thông thành công");
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
                    _notifyService.success("Chuyển khách hàng phổ thông sang khách hàng VIP thành công");
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
function getDataFrmDanhGiaHienTruong() {
    var arr = [];
    $.each($('form[name=frmDanhGiaHienTruong] textarea'), (index, item) => {
        var obj = {
            kieu: '',
            bat_buoc_nhap: 0,
            loai: $(item).attr('name'),
            ten_loai: $(item).attr('col-name'),
            noi_dung: $(item).val()
        }
        arr.push(obj);
    });
    $.each($('form[name=frmDanhGiaHienTruong] input.number'), (index, item) => {
        var obj = {
            kieu: '',
            bat_buoc_nhap: 0,
            loai: $(item).attr('name'),
            ten_loai: $(item).attr('col-name'),
            noi_dung: $(item).val().replace(/[^0-9]+/g, '')
        }
        arr.push(obj);
    });
    $.each(objDanhMuc.danh_gia_hien_truong.loai, (index, item) => {
        if (item.kieu == 'RADIO' || item.kieu == 'CHECKBOX') {
            var obj = {
                kieu: item.kieu,
                bat_buoc_nhap: item.bat_buoc_nhap,
                loai: item.loai,
                ten_loai: item.ten_loai,
                noi_dung: ''
            }
            $("form[name=frmDanhGiaHienTruong] input:checked").each(function (el) {
                if ($(this).attr('name') == item.loai) {
                    var noi_dung_text = $(this).val();
                    if (obj.noi_dung == "") {
                        obj.noi_dung = noi_dung_text;
                    }
                    else {
                        obj.noi_dung += "," + noi_dung_text;
                    }
                }
            });

            arr.push(obj);
        }
    })
    return arr;
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
    if (doi_tuong != DOI_TUONG_TT.HANG_HOA && doi_tuong != DOI_TUONG_TT.TAI_SAN) {
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
function xemChiTietDTTonThat(lhnv, nhom, doi_tuong, hang_muc) {
    $("#navDanhGiaNghiepVu li").removeClass("active");
    $("#navDanhGiaNghiepVu li[data-lhnv='" + lhnv + "']").addClass("active");
    $(".divDanhGiaItem").hide();
    $("#btnLuuCTGiamDinh").addClass("d-none");
    if (doi_tuong == "TAI_SAN") {
        $("#tableChiTietTonThatTNDS_TAI_SAN").addClass("d-none");
        $("#tableChiTietTonThatTNDS_TAI_SAN_XE").addClass("d-none");

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
        $("#divDanhGiaTNDSTAISAN").show();
        ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        $("#btnLuuCTGiamDinh").removeClass("d-none");
        return;
    }
    nhapChiTietNghiepVu(nhom, "", lhnv, 0, res => {
        if (doi_tuong == DOI_TUONG_TT.XE) {
            ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatVCX", { danh_sach: res.data_info }, () => {
                tinhTongTienVCX();
            });
            $("#divDanhGiaVCX").show();
        }
        if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                $("#btnLuuCTGiamDinh").removeClass("d-none");
            }
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalChiTietTonThatHANGHOATemplate", "modalChiTietTonThatHANGHOA", { danh_sach: res.data_info }, () => {
                tinhTongTienHangHoa();
            });
            $("#divDanhGiaHANGHOA").show();
        }
        if (nhom == NHOM_LHNV.NNTX && doi_tuong == DOI_TUONG_TT.NGUOI) {
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                $("#btnLuuCTGiamDinh").removeClass("d-none");
            }
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            ESUtil.genHTML("modalChiTietTonThatNGUOITemplate", "modalChiTietTonThatNGUOI", { danh_sach: res.data_info }, () => {
                tinhTongTienNguoi();
            });
            $("#divDanhGiaNNTX").show();
        }
        if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI) {
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                $("#btnLuuCTGiamDinh").removeClass("d-none");
            }
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalChiTietTonThatTNDSNGUOITemplate", "modalChiTietTonThatTNDSNGUOI", { danh_sach: res.data_info }, () => {
                tinhTongTienTNDSNguoi()
            });
            $("#divDanhGiaTNDSNGUOI").show();
        }
        if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI_HK) {
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                $("#btnLuuCTGiamDinh").removeClass("d-none");
            }
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalChiTietTonThatTNDSNGUOI_HKTemplate", "modalChiTietTonThatTNDSNGUOI_HK", { danh_sach: res.data_info }, () => {
                tinhTongTienTNDSNguoiHK()
            });
            $("#divDanhGiaTNDSNGUOI_HK").show();
        }
        if (nhom == NHOM_LHNV.LPHU_XE && doi_tuong == DOI_TUONG_TT.NGUOI) {
            if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                $("#btnLuuCTGiamDinh").removeClass("d-none");
            }
            var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "NG");
            ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                $("#modalMucDoTTDanhSach .single_checked").click(function () {
                    $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            ESUtil.genHTML("modalChiTietTonThatLPHU_XETemplate", "modalChiTietTonThatLPHU_XE", { danh_sach: res.data_info }, () => {
                tinhTongTienNguoi();
            });
            $("#divDanhGiaLPHU_XE").show();
        }

        if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            $("#tableChiTietTonThatTNDS_TAI_SAN").addClass("d-none");
            $("#tableChiTietTonThatTNDS_TAI_SAN_XE").addClass("d-none");

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
            $("#divDanhGiaTNDSTAISAN").show();

        }
        if (doi_tuong != DOI_TUONG_TT.XE) {
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
            $("#btnLuuCTGiamDinh").removeClass("d-none");
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
    _service.layHangMucChiTiet(obj).then(res => {
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
function layDuLieuBangDGTNDSTAISANXE() {
    var otArr = [];
    $("#modalChiTietTonThatTNDS_TAI_SAN_XE tr.hmChiTietItem").each(function (e) {
        var json = { gia: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("a.combobox[data-field='gia']").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = parseFloat($(this).attr("data-val"));
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGVCX() {
    var otArr = [];
    $("#modalChiTietTonThatVCX tr.hmChiTietItem").each(function (e) {
        var json = { gia: 0 };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("a.combobox[data-field='gia']").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = parseFloat($(this).attr("data-val"));
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGHangHoa() {
    var otArr = [];
    $("#modalChiTietTonThatHANGHOA tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, so_id_doi_tuong_cha: 0 };
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
        if (json.muc_do != "") {
            json.muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault().ten;
        }
        if (json.dvi_tinh != "") {
            json.dvi_tinh_ten = objDanhMuc.dvi_tinh.where(n => n.ma == json.dvi_tinh).firstOrDefault().ten;
        }
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGTNDSTaiSan() {
    var otArr = [];
    $("#modalChiTietTonThatTNDS_TAI_SAN tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, so_id_doi_tuong_cha: 0 };
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
        if (json.muc_do != "") {
            json.muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault().ten;
        }
        if (json.dvi_tinh != "") {
            json.dvi_tinh_ten = objDanhMuc.dvi_tinh.where(n => n.ma == json.dvi_tinh).firstOrDefault().ten;
        }
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGNguoi() {
    var otArr = [];
    $("#modalChiTietTonThatNGUOI tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", cmnd: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, pttt_tu: 0, pttt_toi: 0 };
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
        if (json.muc_do != "") {
            var md = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault();
            json.muc_do_ten = md == null ? "" : md.ten;

            var arr = json.thuong_tat.split(',');
            json.pttt_tu = 0;
            json.pttt_toi = 0;
            for (var i = 0; i < arr.length; i++) {
                var item = objDanhMuc.ds_tltt.where(n => n.id == arr[i]).firstOrDefault();
                if (item != null && item.pt_tu != null && item.pt_toi != null) {
                    json.pttt_tu += item.pt_tu;
                    json.pttt_toi += item.pt_toi;
                }
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
        }
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGTNDSNguoi() {
    var otArr = [];
    $("#modalChiTietTonThatTNDSNGUOI tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", cmnd: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, pttt_tu: 0, pttt_toi: 0 };
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
        if (json.muc_do != "") {
            json.muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault().ten;

            var arr = json.thuong_tat.split(',');
            json.pttt_tu = 0;
            json.pttt_toi = 0;
            for (var i = 0; i < arr.length; i++) {
                var item = objDanhMuc.ds_tltt.where(n => n.id == arr[i]).firstOrDefault();
                if (item != null && item.pt_tu != null && item.pt_toi != null) {
                    json.pttt_tu += item.pt_tu;
                    json.pttt_toi += item.pt_toi;
                }
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
        }
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGTNDSHanhKhach() {
    var otArr = [];
    $("#modalChiTietTonThatTNDSNGUOI_HK tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", cmnd: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, pttt_tu: 0, pttt_toi: 0 };
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
        if (json.muc_do != "") {
            json.muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault().ten;

            var arr = json.thuong_tat.split(',');
            json.pttt_tu = 0;
            json.pttt_toi = 0;
            for (var i = 0; i < arr.length; i++) {
                var item = objDanhMuc.ds_tltt.where(n => n.id == arr[i]).firstOrDefault();
                if (item != null && item.pt_tu != null && item.pt_toi != null) {
                    json.pttt_tu += item.pt_tu;
                    json.pttt_toi += item.pt_toi;
                }
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
        }
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuBangDGLPHU_XE() {
    var otArr = [];
    $("#modalChiTietTonThatLPHU_XE tr.hmChiTietItem").each(function (e) {
        var json = { ten: "", dia_chi: "", cmnd: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, pttt_tu: 0, pttt_toi: 0 };
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
        if (json.muc_do != "") {
            json.muc_do_ten = objDanhMuc.muc_do_ton_that.where(n => n.ma == json.muc_do).firstOrDefault().ten;

            var arr = json.thuong_tat.split(',');
            json.pttt_tu = 0;
            json.pttt_toi = 0;
            for (var i = 0; i < arr.length; i++) {
                var item = objDanhMuc.ds_tltt.where(n => n.id == arr[i]).firstOrDefault();
                if (item != null && item.pt_tu != null && item.pt_toi != null) {
                    json.pttt_tu += item.pt_tu;
                    json.pttt_toi += item.pt_toi;
                }
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
            if (json.pttt_tu > 100) {
                json.pttt_toi = 100;
            }
        }
        otArr.push(json);
    });
    return otArr;
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
function showNDGiamDinh(el) {
    _popoverNDGiamDinh.options = { placement: "top" };
    var lan_gd = _frmThongTinGiamDinh.getControl("lan_gd").val();
    if (lan_gd == null || lan_gd == "" || lan_gd == 0) {
        _notifyService.error("Không xác định được lần giám định");
        return;
    }
    var lan = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd == lan_gd).firstOrDefault();
    $("#divNDGiamDinh_NoiDung").val(lan.nd_ghi_chu);
    _popoverNDGiamDinh.showWithPosition(el);
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
function xoaHangMucChiTiet(el, loai) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng tổn thất này không?", "", () => {
        $(el).parent().parent().remove();
        if (loai == "TAI_SAN") {
            var arr = layDuLieuBangDGHangHoa();
            ESUtil.genHTML("modalChiTietTonThatHANGHOATemplate", "modalChiTietTonThatHANGHOA", { danh_sach: arr });
        }
        if (loai == "NGUOI") {
            var arr = layDuLieuBangDGNguoi();
            ESUtil.genHTML("modalChiTietTonThatNGUOITemplate", "modalChiTietTonThatNGUOI", { danh_sach: arr });
        }
    });
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
function tinhTongTienTNDSTAISANXE() {
    var arr = layDuLieuBangDGTNDSTAISANXE();
    var tong_tien_tt = arr.sum(n => n.gia);
    $("#modalChiTietTonThatTNDS_TAI_SAN_XETongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function tinhTongTienVCX() {
    var arr = layDuLieuBangDGVCX();
    var tong_tien_tt = arr.sum(n => n.gia);
    $("#modalChiTietTonThatVCXTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function tinhTongTienHangHoa() {
    var arr = layDuLieuBangDGHangHoa();
    var tong_tien_tt = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].tien_tt == "") {
                arr[i].tien_tt = 0;
            }
            tong_tien_tt += parseFloat(arr[i].tien_tt);
        }
    }
    $("#modalChiTietTonThatHANGHOATongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function tinhTongTienNguoi() {
    var arr = layDuLieuBangDGNguoi();
    var tong_tien_tt = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].tien_tt == "") {
                arr[i].tien_tt = 0;
            }
            tong_tien_tt += parseFloat(arr[i].tien_tt);
        }
    }
    var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
    var doi_tuong = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
    if (nhom == "NNTX" && doi_tuong == "NGUOI") {
        $("#modalChiTietTonThatNNTXTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
    }
    if (nhom == "TNDS" && doi_tuong == "NGUOI") {
        $("#modalChiTietTonThatTNDSNGUOITongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
    }
    if (nhom == "LPHU_XE" && doi_tuong == "NGUOI") {
        $("#modalChiTietTonThatTNDSNGUOITongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
    }
}
function tinhTongTienTNDSNguoi() {
    var arr = layDuLieuBangDGTNDSNguoi();
    var tong_tien_tt = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].tien_tt == "") {
                arr[i].tien_tt = 0;
            }
            tong_tien_tt += parseFloat(arr[i].tien_tt);
        }
    }
    $("#modalChiTietTonThatTNDSNGUOITongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function tinhTongTienTNDSNguoiHK() {
    var arr = layDuLieuBangDGTNDSHanhKhach();
    var tong_tien_tt = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].tien_tt == "") {
                arr[i].tien_tt = 0;
            }
            tong_tien_tt += parseFloat(arr[i].tien_tt);
        }
    }
    $("#modalChiTietTonThatTNDSNGUOI_HKTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function tinhTongTienTNDSTaiSan() {
    var tong_tien_doi_tuong_khac = 0;
    var arr = layDuLieuBangDGTNDSTaiSan();
    var arr_doi_tuong_goc = arr.where(n => n.so_id_doi_tuong != 0 && n.so_id_doi_tuong_cha == 0);
    if (arr_doi_tuong_goc != null && arr_doi_tuong_goc.length > 0) {
        for (var i = 0; i < arr_doi_tuong_goc.length; i++) {
            var so_pt = arr.where(n => n.so_id_doi_tuong_cha == arr_doi_tuong_goc[i].so_id_doi_tuong).length;
            if (so_pt > 0) {
                var tong = arr.where(n => n.so_id_doi_tuong_cha == arr_doi_tuong_goc[i].so_id_doi_tuong).sum(n => parseFloat(n.tien_tt));
                arr_doi_tuong_goc[i].tien_tt = tong;
                $("#doi_tuong_goc_" + arr_doi_tuong_goc[i].so_id_doi_tuong).html(ESUtil.formatMoney(tong));
            }
            else {
                tong_tien_doi_tuong_khac += parseFloat(arr_doi_tuong_goc[i].tien_tt);
            }
        }
    }
    var tong_tien_tt = arr_doi_tuong_goc.sum(n => parseFloat(n.tien_tt));
    $("#doi_tuong_goc_khac").html(ESUtil.formatMoney(tong_tien_doi_tuong_khac));
    $("#modalChiTietTonThatTNDS_TAI_SANTongTienTT").html(ESUtil.formatMoney(tong_tien_tt));
}
function onChangeTinhTong(el) {
    var tr = $(el).parent().parent();
    var td = tr.children();
    var gia = 0;
    var so_luong_tt = 0;
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "gia") {
                gia = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "so_luong_tt") {
                so_luong_tt = $(this).val().replace(/[^0-9]+/g, '');
            }
        });
    });
    if (gia == "") {
        gia = 0;
    }
    if (so_luong_tt == "") {
        so_luong_tt = 0;
    }
    gia = parseFloat(gia);
    so_luong_tt = parseFloat(so_luong_tt);
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_tt") {
                $(this).val(ESUtil.formatMoney(gia * so_luong_tt));
            }
            if (field == "tien_dx") {
                $(this).val(ESUtil.formatMoney(gia * so_luong_tt));
            }
        });
    });
    tinhTongTienHangHoa();
    tinhTongTienTNDSTaiSan();
}
function onChangeTinhTongTaiSanHHoa(el) {
    var tr = $(el).parent().parent();
    var td = tr.children();
    var tien_vtu = 0;
    var tien_nhan_cong = 0;
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_vtu") {
                tien_vtu = $(this).val().replace(/[^0-9]+/g, '');
            }
            if (field == "tien_nhan_cong") {
                tien_nhan_cong = $(this).val().replace(/[^0-9]+/g, '');
            }
        });
    });
    if (tien_vtu == "") {
        tien_vtu = 0;
    }
    if (tien_nhan_cong == "") {
        tien_nhan_cong = 0;
    }
    tien_vtu = parseFloat(tien_vtu);
    tien_nhan_cong = parseFloat(tien_nhan_cong);
    td.each(function (i) {
        $(this).find("input").each(function (el) {
            var field = $(this).attr("data-field");
            if (field == "tien_tt") {
                $(this).val(ESUtil.formatMoney(tien_vtu + tien_nhan_cong));
            }
            if (field == "tien_dx") {
                $(this).val(ESUtil.formatMoney(tien_vtu + tien_nhan_cong));
            }
        });
    });
    tinhTongTienHangHoa();
    tinhTongTienTNDSTaiSan();
}
function luuChiTietHangMuc(callback = undefined) {
    var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
    var doi_tuong = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
    var lhnv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
    var hang_muc = $("#navDanhGiaNghiepVu li.active").attr("data-hang-muc");
    var arr = null;
    if (doi_tuong == "HANG_HOA") {
        arr = layDuLieuBangDGHangHoa();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }
            if (obj.so_id_doi_tuong_cha == "1") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập đối tượng cha");
                return;
            }
            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
            //if (obj.so_luong.trim() == "" || obj.so_luong.trim() == "0") {
            //    _notifyService.error("Tồn tại dòng dữ liệu chưa nhập số lượng");
            //    return;
            //}

            if (obj.so_luong_tt.trim() == "" || obj.so_luong_tt.trim() == "0") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập số lượng tổn thất");
                return;
            }
            obj.so_luong = obj.so_luong_tt.trim();
            //if (parseFloat(obj.so_luong_tt.trim()) > parseFloat(obj.so_luong.trim())) {
            //    _notifyService.error("Số lượng tổn thất không vượt quá số lượng thực tế");
            //    return;
            //}
        }
    }
    if (doi_tuong == "TAI_SAN") {
        arr = layDuLieuBangDGTNDSTaiSan();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }
            if (obj.so_id_doi_tuong_cha == "1") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập đối tượng cha");
                return;
            }
            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
            //if (obj.so_luong.trim() == "" || obj.so_luong.trim() == "0") {
            //    _notifyService.error("Tồn tại dòng dữ liệu chưa nhập số lượng");
            //    return;
            //}
            if (obj.so_luong_tt.trim() == "" || obj.so_luong_tt.trim() == "0") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập số lượng tổn thất");
                return;
            }
            obj.so_luong = obj.so_luong_tt.trim();
            //if (parseFloat(obj.so_luong_tt.trim()) > parseFloat(obj.so_luong.trim())) {
            //    _notifyService.error("Số lượng tổn thất không vượt quá số lượng thực tế");
            //    return;
            //}
        }
    }
    if (nhom != "TNDS" && doi_tuong == "NGUOI") {
        arr = layDuLieuBangDGNguoi();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }

            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
        }
    }
    if (nhom == "TNDS" && doi_tuong == "NGUOI") {
        arr = layDuLieuBangDGTNDSNguoi();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }
            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
        }
    }
    if (nhom == "TNDS" && doi_tuong == "NGUOI_HK") {
        arr = layDuLieuBangDGTNDSHanhKhach();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }
            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
        }
    }
    if (nhom == "LPHU_XE" && doi_tuong == "NGUOI") {
        arr = layDuLieuBangDGLPHU_XE();
        for (var i = 0; i < arr.length; i++) {
            var obj = arr[i];
            if (obj.ten.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa nhập tên đối tượng");
                return;
            }
            if (obj.muc_do.trim() == "") {
                _notifyService.error("Tồn tại dòng dữ liệu chưa chọn mức độ tổn thất");
                return;
            }
        }
    }
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nhom: nhom,
        doi_tuong: doi_tuong,
        lh_nv: lhnv,
        hang_muc: hang_muc,
        data: arr
    };

    _service.luuChiTietHangMuc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _notifyService.success("Lưu thông tin thành công");
        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
        _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
            ho_so_chi_tiet = res;
            $("#navThongTinChung").bindJsonToHtml(res.data_info.ho_so);
            $("#navDanhGiaNghiepVu").parent().show();
            if (ho_so_chi_tiet.data_info.lh_nv.length <= 1) {
                $("#navDanhGiaNghiepVu").parent().hide();
            }
            var lhnv_tmp = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv.trim()).firstOrDefault();
            xemChiTietDTTonThat(obj.lh_nv, lhnv_tmp.nhom, lhnv_tmp.doi_tuong, obj.hang_muc);
        });
        if (callback) {
            callback(res);
        }
        getPaging(1);
    });
}
function dongBangTyLeThuongTat() {
    _popoverTyLeThuongTat.hide();
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
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
    }).then(res => {
        if (res.state_info.status != "OK") {
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
function anHienNutFormLanGiamDinh(lan) {
    var ngay_ket_thuc_gd_ho_so = ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd;
    $("#btnLuuThongTinGiamDinh").addClass("d-none");
    $("#btnThemMoiThongTinGiamDinh").addClass("d-none");
    $("#btnHuyThaoTacGiamDinh").addClass("d-none");
    $("#btnXoaThongTinGiamDinh").addClass("d-none");
    $("#btnAddBenThamGiaGiamDinh").addClass("d-none");
    //Nếu hồ sơ đã kết thúc giám định
    if (ngay_ket_thuc_gd_ho_so < 30000101) {
        return;
    }
    //Nếu thêm lần giám định mới
    if (lan == undefined || lan == null || lan == "" || lan == "0" || ho_so_chi_tiet.data_info.lan_gd == null || ho_so_chi_tiet.data_info.lan_gd.length <= 0) {
        $("#btnLuuThongTinGiamDinh").removeClass("d-none");
        return;
    }
    var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.max(n => n.lan_gd);
    if (lan != lan_gd_max) {
        return;
    }
    //Nếu xem lần giám định
    var lichGiamDinh = ho_so_chi_tiet.data_info.gdvht.where(n => n.lan_gd == lan).firstOrDefault();
    if (lichGiamDinh != null) {
        if (lichGiamDinh.ngay_ycktgd_dongy < 30000101) {
            $("#btnThemMoiThongTinGiamDinh").removeClass("d-none");
            return;
        }
        if (lichGiamDinh.ngay_ycktgd_dongy >= 30000101) {
            $("#btnLuuThongTinGiamDinh").removeClass("d-none");
            $("#btnAddBenThamGiaGiamDinh").removeClass("d-none");
        }
        if (lichGiamDinh.ngay_nhan >= 30000101) {
            $("#btnXoaThongTinGiamDinh").removeClass("d-none");
        }
    }
}
function TransCompensationDisplay() {
    var data = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_BT'
    };
    var notify_url = "/carclaim/carcompensation";
    window.open("/carclaim/carinvestigation/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_self');
}
function chonDoiTuongTT(so_id_doi_tuong) {
    $("#dsDoiTuongTT #doi_tuong_tt_" + so_id_doi_tuong).prop("checked", !$("#dsDoiTuongTT #doi_tuong_tt_" + so_id_doi_tuong).is(":checked"));
}
function suaDoiTuongTT(so_id_doi_tuong) {
    $("#btnMoiAddDoiTuongTT").addClass("d-none");
    $("#btnLuuChonDoiTuongTT").addClass("d-none");
    $("#btnLuuAddDoiTuongTT").removeClass("d-none");
    $("#btnHuyLuu").removeClass("d-none");

    $("#modalAddDoiTuongTTDsChon").addClass("d-none");
    $("#modalAddDoiTuongTTForm").removeClass("d-none");

    _frmAddDoiTuongTT.resetForm();
    _frmAddDoiTuongTT.clearErrorMessage();
    $("#dsDoiTuongTT .item_so_id_doi_tuong").removeClass("active");
    $("#modalAddDoiTuongTT .loai_doi_tuong").addClass("d-none");

    $('.ds_doi_tuong_tt').removeClass('active_dttt');
    $("#ds_doi_tuong_tt_" + so_id_doi_tuong).addClass('active_dttt');
    $("#dsDoiTuongTT .item_so_id_doi_tuong[data-so-id-doi-tuong='" + so_id_doi_tuong + "']").addClass("active");

    var dt = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.so_id_doi_tuong == so_id_doi_tuong).firstOrDefault();
    if (dt.nhom == DOI_TUONG_TT.TAI_SAN) {
        _frmAddDoiTuongTT.getControl("loai").setDataSource([{ ma: "KHAC", ten: "Tài sản khác" }, { ma: "XE", ten: "Tài sản là một xe ô tô khác" }], "ten", "ma", "Chọn loại đối tượng", "");
    }
    if (dt.nhom == DOI_TUONG_TT.NGUOI) {
        _frmAddDoiTuongTT.getControl("loai").setDataSource([
            { ma: "TNDS", ten: "TNDS về người" },
            { ma: "NNTX", ten: "Người ngồi trên xe" },
            { ma: "LPHU_XE", ten: "Lái phụ xe" },
            { ma: "NGUOI_HK", ten: "Hành khách trên xe" }
        ], "ten", "ma", "Chọn loại đối tượng", "");
    }
    if (dt.nhom == DOI_TUONG_TT.TAI_SAN || dt.nhom == DOI_TUONG_TT.NGUOI) {
        $("#modalAddDoiTuongTT .loai_doi_tuong").removeClass("d-none");
    }
    _frmAddDoiTuongTT.setData(dt);
}
function luuChonDoiTuong(callback = undefined) {
    var arrInput = $("#dsDoiTuongTT .input_chon_doi_tuong_tt:checked");
    var val = "";
    var val_name = "";
    if (arrInput.length > 0) {
        var arrChecked = [];
        var arrChecked_name = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            var item_name = $(this).attr('data-val');
            arrChecked.push(item);
            arrChecked_name.push(item_name);
        });
        val = arrChecked.join(",");
        val_name = arrChecked_name.join(", ");
        if (val_name.length > 110) {
            val_name = val_name.substr(0, 110) + '...';
        }
    }
    $("#doi_tuong_gd").val(val_name);
    $("#doi_tuong_gd").attr('data-val', val);
    if (callback) {
        callback();
    }
}
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
function showDoiTuongCha(el, nhom, doi_tuong, so_id_doi_tuong) {
    nhapChiTietNghiepVu(nhom, "", doi_tuong, 0, res => {
        var arr = res.data_info.where(n => n.so_id_doi_tuong_cha == 0 && n.so_id_doi_tuong != so_id_doi_tuong);
        ESUtil.genHTML("modalChonDoiTuongTTTab4_1DanhSachTemplate", "modalChonDoiTuongTTTab4_1DanhSach", { danh_sach: arr }, () => {
            $("#modalChonDoiTuongTTTab4_1DanhSach .single_checked").click(function () {
                var before_checked = $(this).is(":checked");
                $("#modalChonDoiTuongTTTab4_1DanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", before_checked);
            });
        });
        var val = $(el).attr("data-val");
        $("#modalChonDoiTuongTTTab4_1 .modalChonDoiTuongTTTab4_1Item").prop("checked", false);
        if (val != undefined && val != null && val != "") {
            $("#modalChonDoiTuongTTTab4_1 .modalChonDoiTuongTTTab4_1Item[value='" + val + "']").prop("checked", true);
        }
        _modalChonDoiTuongTTTab4_1.show(el);
    });
}
function dsNhomDoiTuongTheoLHNV() {
    var arr = ho_so_chi_tiet.data_info.lh_nv;
    var arr_out = [];
    for (var i = 0; i < arr.length; i++) {
        var count = arr_out.where(n => n.doi_tuong == arr[i].doi_tuong).length;
        if (count <= 0) {
            arr_out.push({ doi_tuong: arr[i].doi_tuong, ten_nhom_doi_tuong: arr[i].ten_nhom_doi_tuong });
        }
    }
    return arr_out;
}
function getDataTableChiPhiGD() {
    var otArrGD = [];
    $("#bodyDanhSachChiPhiGDLan tr.row-item").each(function (e) {
        var json = { ten_cp: '', tien: '', ma_cp: '', ten_loai_chi_phi: '', ghi_chu: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
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
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        if (json.ma_cp != '') {
            json.ten_loai_chi_phi = objDanhMuc.chi_phi_gd.where(n => n.ma == json.ma_cp).firstOrDefault().ten;
        }
        otArrGD.push(json);
    });
    return otArrGD;
}
function getCheckedDataTableChiPhiGD() {
    var arr_chon = [];
    $("#modalLoaiChiPhiLanGDDanhSach .modalChonLoaiChiPhiLanGDItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma_cp: $(this).val(),
                ten_loai_chi_phi: objDanhMuc.chi_phi_gd.where(n => n.ma == $(this).val()).firstOrDefault().ten,
                ten_cp: '',
                tien: '',
                ghi_chu: '',
                bt: ''
            };
            arr_chon.push(obj);
        }
    });
    return arr_chon;
}
function tinhTongTienChiPhiLanGD() {
    var arr = getDataTableChiPhiGD();
    var tongTienChiPhiLanGD = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            tongTienChiPhiLanGD += parseFloat(arr[i].tien);
        }
    }
    $("#tongTienChiPhiGDLan").html(ESUtil.formatMoney(tongTienChiPhiLanGD));
}
function xoaChiPhiLanGD(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa chi phí lần giám định này không?", "", () => {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lan_gd: _frmDanhSachChiPhiGDLan.getControl("lan_gd").val(),
            bt: $(el).parent().attr('data-val')
        }
        _service.xoaChiPhiLanGD(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin chi phí thành công");
            $(el).closest("tr").remove();
            tinhTongTienChiPhiLanGD();
        });
    })
}
function chonLoaiChiPhiLanGD(el) {
    var arrLoaiCP = objDanhMuc.chi_phi_gd;
    $("#modalLoaiChiPhiLanGDDanhSach .dslcp").removeClass("d-none");
    $("#inputSearch_LoaiChiPhiLanGD").focus();
    $("#inputSearch_LoaiChiPhiLanGD").val("");
    $("#modalLoaiChiPhiLanGDDanhSach .modalChonLoaiChiPhiLanGDItem").prop("checked", false);
    var arr = getDataTableChiPhiGD();
    $.each(arrLoaiCP, (index1, item1) => {
        $.each(arr, (index2, item2) => {
            if (item1.ma == 'KHAC') {
            }
            else if (item1.ma == item2.ma_cp && item1 != 'KHAC') {
                arrLoaiCP = arrLoaiCP.filter(n => n != item1);
                return arrLoaiCP;
            }
        })
    });
    ESUtil.genHTML("modalDanhSachLoaiChiPhiLanGDTemplate", "modalLoaiChiPhiLanGDDanhSach", { danh_sach: arrLoaiCP }, () => {
        $("#modalLoaiChiPhiLanGDDanhSach .single_checked").click(function () {
            $("#modalLoaiChiPhiLanGDDanhSach .single_checked").prop("checked", false);
            $(this).prop("checked", true);
        });
    });
    _modalLoaiChiPhiLanGD.show(el);
}
function lietKeThongTinChiPhiLanGD(so_id, lan_gd) {
    _frmDanhSachChiPhiGDLan.clearErrorMessage();
    var obj = {
        so_id: so_id,
        lan_gd: lan_gd
    };
    _service.lietKeChiPhiLanGD(obj).then(res => {
        var dataCPGD = res.data_info;
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            ESUtil.genHTML("danhSachChiPhiGDLanTemplate", "bodyDanhSachChiPhiGDLan", { data: dataCPGD }, () => {
                tinhTongTienChiPhiLanGD();
            });
        } else {
            ESUtil.genHTML("danhSachChiPhiGDLanTemplate", "bodyDanhSachChiPhiGDLan", { data: [] }, () => {
                tinhTongTienChiPhiLanGD();
            });
        }
    });
}
function bindLanGiamDinh(val) {
    var arr = ho_so_chi_tiet.data_info.lan_gd;
    if (arr !== null && arr.length > 0) {
        var arrClone = arr.clone();
        var arrGD = [];
        var arrGDV = [];
        for (var i = 0; i < arrClone.length; i++) {
            arrGD.push({ ma: arrClone[i].lan_gd, ten: arrClone[i].gio_gd + " " + arrClone[i].ngay_gd + " - " + arrClone[i].dia_diem }),
                arrGDV.push({ lan_gd: arrClone[i].lan_gd, ma_gdv: arrClone[i].ma_gdv, ten_gdv: arrClone[i].ten_gdv })
        }
        if (arrGDV[0].lan_gd == null || arrGDV[0].lan_gd == "" || arrGDV[0].lan_gd == undefined) {
            _notifyService.error("Không xác định được lần giám định");
            return;
        }
        _frmDanhSachChiPhiGDLan.getControl("lan_gd").setDataSource(arrGD, "ten", "ma", "Chọn lần giám định", "");
        _frmDanhSachChiPhiGDLan.getControl('lan_gd').addEventChange(val => {
            var gdv = arrGDV.where(n => n.lan_gd == val);
            _frmDanhSachChiPhiGDLan.getControl("ma_gdv").setValue(gdv[0].ma_gdv)
        });
        if (arrGD.length == 1 || arrGD.length > 1) {
            _frmDanhSachChiPhiGDLan.getControl("lan_gd").setValue(arrGD[0].ma);
            _frmDanhSachChiPhiGDLan.getControl("lan_gd").trigger("select2:select");
        }
    }
    _modalDanhSachChiPhiGDLan.show();
}
function showGhiChuChiPhiGD(el) {
    _popoverGhiChuNoiDungCPGD.options = { placement: "bottom bottom-right" };
    $("#divGhiChu_NoiDungCPGD").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDungCPGD").val(val);
    _popoverGhiChuNoiDungCPGD.showWithPosition(el);
}
function getPagingSKBH(trang, callback = undefined) {
    var objTimKiem = _frmTKiemSuKienBH.getJsonData();
    objTimKiem.nv = "XE";
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 5;
    $("#dsBenhLy_pagination").html("");
    _service.tkiemSuKienBH(objTimKiem).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tableSuKienBHTemplate", "tableSuKienBH", { danh_sach: res.data_info.data }, () => {
            if (su_kien_bh_chon != undefined && su_kien_bh_chon != null && su_kien_bh_chon.length > 0) {
                for (var i = 0; i < su_kien_bh_chon.length; i++) {
                    if ($("#sukien_" + su_kien_bh_chon[i].bt)) {
                        $("#sukien_" + su_kien_bh_chon[i].bt).prop("checked", true);
                    }
                }
            }
        });
        $("#tableSuKienBH_pagination").html(ESUtil.pagingHTML("getPagingSKBH", objTimKiem.trang, res.data_info.tong_so_dong, objTimKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function suaSuKienBH(bt, nhom_su_kien, ten_sk, tu_ngay, den_ngay, mo_ta) {
    var obj = {
        bt: bt,
        nhom_su_kien: nhom_su_kien,
        ten_sk: ten_sk,
        tu_ngay: tu_ngay,
        den_ngay: den_ngay,
        mo_ta: mo_ta
    };
    _frmSuKienBH.resetForm();
    _frmSuKienBH.clearErrorMessage();
    _frmSuKienBH.setData(obj);
    $("#modalSuKienBHFormChon").addClass("d-none");
    $("#modalSuKienBHFormNhap").removeClass("d-none");
}
function chonSuKien(bt, nhom_su_kien, ten_sk, tu_ngay, den_ngay, thoi_gian, mo_ta) {
    var obj = {
        bt: bt,
        nhom_su_kien: nhom_su_kien,
        ten_sk: ten_sk,
        tu_ngay: tu_ngay,
        den_ngay: den_ngay,
        thoi_gian: thoi_gian,
        mo_ta: mo_ta
    };
    su_kien_bh_chon = su_kien_bh_chon.removeItem(n => n.bt == bt);
    $("#sukien_" + bt).prop("checked", !$("#sukien_" + bt).is(":checked"));
    if ($("#sukien_" + bt).is(":checked")) {
        su_kien_bh_chon.push(obj);
    }
    $("#btnXemDsSuKienChon").html('<i class="fa fa-eye mr-2"></i>Xem danh sách');
    if (su_kien_bh_chon.length > 0) {
        $("#btnXemDsSuKienChon").html('<i class="fa fa-eye mr-2"></i>Xem danh sách (' + su_kien_bh_chon.length + ')');
    }
}
function layDSSuKienTheoVuTT(nhom_su_kien, callback = undefined) {
    if (nhom_su_kien == undefined || nhom_su_kien == null || nhom_su_kien.trim() == "") {
        var arr = [];
        if (callback) {
            callback(arr);
        }
        return;
    }
    _service.layDSSuKienTheoVuTT({ nhom_su_kien: nhom_su_kien }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res.data_info);
        }
    });
}
function anHienDuyetBCGD() {
    $("#btnDuyetBCGD").addClass("d-none");
    $("#btnHuyDuyetBCGD").addClass("d-none");
    $("#btnTrinhphancapBCGD").addClass("d-none");

    $("#btnModalDuyetBCGD").addClass("d-none");
    $("#btnModalHuyDuyetBCGD").addClass("d-none");
    $("#btnModalTrinhphancapBCGD").addClass("d-none");

    if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
        if (ho_so_chi_tiet.data_info.ho_so.ngay_duyet_bcgd < 30000101) {
            $("#btnDuyetBCGD").addClass("d-none");
            $("#btnTrinhphancapBCGD").addClass("d-none");
            $("#btnHuyDuyetBCGD").removeClass("d-none");

            $("#btnModalDuyetBCGD").addClass("d-none");
            $("#btnModalTrinhphancapBCGD").addClass("d-none");
            $("#btnModalHuyDuyetBCGD").removeClass("d-none");
        }
        else if (ho_so_chi_tiet.data_info.ho_so.ngay_trinh_bcgd < 30000101) {
            $("#btnDuyetBCGD").addClass("d-none");
            $("#btnHuyDuyetBCGD").addClass("d-none");
            $("#btnTrinhphancapBCGD").removeClass("d-none");

            $("#btnModalDuyetBCGD").addClass("d-none");
            $("#btnModalHuyDuyetBCGD").addClass("d-none");
            $("#btnModalTrinhphancapBCGD").removeClass("d-none");
        }
        else {
            $("#btnDuyetBCGD").removeClass("d-none");
            $("#btnTrinhphancapBCGD").removeClass("d-none");
            $("#btnHuyDuyetBCGD").addClass("d-none");

            $("#btnModalDuyetBCGD").removeClass("d-none");
            $("#btnModalTrinhphancapBCGD").removeClass("d-none");
            $("#btnModalHuyDuyetBCGD").addClass("d-none");
        }
    }
}
function bindFormBaoCaoGD(obj) {
    _frmBaoCaoGD.resetForm();
    _frmBaoCaoGD.clearErrorMessage();
    _frmBaoCaoGD.getControl("gara_chinh_hang").readOnly();
    _frmBaoCaoGD.getControl("gara_hop_tac").readOnly();

    $("#modalBaoCaoGDTrangThai").removeClass("text-success");
    $("#modalBaoCaoGDTrangThai").addClass("text-danger");
    $("#modalBaoCaoGDTrangThai").html("Chưa thực hiện đánh giá");

    $("#frmBaoCaoGD input[name='ho_so_day_du']").prop("checked", false);
    $("#frmBaoCaoGD input[name='nguyen_nhan']").prop("checked", false);
    $("#frmBaoCaoGD input[name='pham_vi_tt']").prop("checked", false);
    $("#frmBaoCaoGD input[name='gt_tham_gia_bh']").prop("checked", false);
    $("#frmBaoCaoGD input[name='tuan_thu']").prop("checked", false);
    $("#frmBaoCaoGD input[name='thoi_han_khai_bao']").prop("checked", false);
    $("#frmBaoCaoGD #pt_gt_tham_gia_bh").html("");
    $("#frmBaoCaoGD #pt_che_tai").html("");
    if (obj != undefined && obj != null) {
        if (obj.khai_bao == "D") {
            $("#modalBaoCaoGDTrangThai").addClass("text-success");
            $("#modalBaoCaoGDTrangThai").removeClass("text-danger");
            $("#modalBaoCaoGDTrangThai").html("Đang thực hiện báo cáo giám định");
        }
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "D")
            $("#frmBaoCaoGD input#ho_so_day_du_d").prop("checked", true);
        if (obj.ho_so_day_du != null && obj.ho_so_day_du == "K")
            $("#frmBaoCaoGD input#ho_so_day_du_k").prop("checked", true);

        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "D")
            $("#frmBaoCaoGD input#nguyen_nhan_d").prop("checked", true);
        if (obj.nguyen_nhan != null && obj.nguyen_nhan == "K")
            $("#frmBaoCaoGD input#nguyen_nhan_k").prop("checked", true);

        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "C")
            $("#frmBaoCaoGD input#pham_vi_tt_c").prop("checked", true);
        if (obj.pham_vi_tt != null && obj.pham_vi_tt == "K")
            $("#frmBaoCaoGD input#pham_vi_tt_k").prop("checked", true);

        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "D")
            $("#frmBaoCaoGD input#gt_tham_gia_bh_d").prop("checked", true);
        if (obj.gt_tham_gia_bh != null && obj.gt_tham_gia_bh == "K")
            $("#frmBaoCaoGD input#gt_tham_gia_bh_k").prop("checked", true);

        if (obj.tuan_thu != null && obj.tuan_thu == "C")
            $("#frmBaoCaoGD input#tuan_thu_c").prop("checked", true);
        if (obj.tuan_thu != null && obj.tuan_thu == "K")
            $("#frmBaoCaoGD input#tuan_thu_k").prop("checked", true);

        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "D")
            $("#frmBaoCaoGD input#thoi_han_khai_bao_d").prop("checked", true);
        if (obj.thoi_han_khai_bao != null && obj.thoi_han_khai_bao == "K")
            $("#frmBaoCaoGD input#thoi_han_khai_bao_k").prop("checked", true);

        _frmBaoCaoGD.getControl("noi_dung_danh_gia").val(obj.noi_dung_danh_gia);
        _frmBaoCaoGD.getControl("gara_de_xuat").setValue(obj.gara_de_xuat);
        _frmBaoCaoGD.getControl("gara_de_xuat").attr("data-ma", obj.ma_gara);
        _frmBaoCaoGD.getControl("gara_chinh_hang").setValue(obj.gara_chinh_hang);
        _frmBaoCaoGD.getControl("gara_hop_tac").setValue(obj.gara_hop_tac);
        _frmBaoCaoGD.getControl("uoc_ton_that").setValue(obj.uoc_ton_that);
        _frmBaoCaoGD.getControl("ly_do").setValue(obj.ly_do);
        _frmBaoCaoGD.getControl("gdvht_de_xuat").val(obj.gdvht_de_xuat);
        _frmBaoCaoGD.getControl("noi_dung_de_xuat").val(obj.noi_dung_de_xuat);
        _frmBaoCaoGD.getControl("pt_gt_tham_gia_bh").setValue(obj.pt_gt_tham_gia_bh);
        _frmBaoCaoGD.getControl("pt_che_tai").setValue(obj.pt_che_tai);
        $("#frmBaoCaoGD #pt_gt_tham_gia_bh").html(obj.pt_gt_tham_gia_bh);
        $("#frmBaoCaoGD #pt_che_tai").html(obj.pt_che_tai);
    }
}
function layFormBaoCaoGD() {
    var obj = _frmBaoCaoGD.getJsonData();
    obj.ho_so_day_du = $("#frmBaoCaoGD input#ho_so_day_du_d").is(":checked") ? "D" : "K";
    obj.nguyen_nhan = $("#frmBaoCaoGD input#nguyen_nhan_d").is(":checked") ? "D" : "K";
    obj.pham_vi_tt = $("#frmBaoCaoGD input#pham_vi_tt_c").is(":checked") ? "C" : "K";
    obj.gt_tham_gia_bh = $("#frmBaoCaoGD input#gt_tham_gia_bh_d").is(":checked") ? "D" : "K";
    obj.tuan_thu = $("#frmBaoCaoGD input#tuan_thu_c").is(":checked") ? "C" : "K";
    obj.thoi_han_khai_bao = $("#frmBaoCaoGD input#thoi_han_khai_bao_d").is(":checked") ? "D" : "K";
    obj.gara_de_xuat = _frmBaoCaoGD.getControl("gara_de_xuat").attr("data-ma");
    return obj;
}
function luuBaoCaoGD(callback = undefined) {
    if (!_frmBaoCaoGD.isValid()) {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    }
    var obj = layFormBaoCaoGD();
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.nguon = "GD";

    _service.luuBaoCaoGD(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _notifyService.success("Lưu thông tin báo cáo giám định thành công");
        $("#modalBaoCaoGDTrangThai").addClass("text-success");
        $("#modalBaoCaoGDTrangThai").removeClass("text-danger");
        $("#modalBaoCaoGDTrangThai").html("Đang thực hiện báo cáo giám định");
        if (callback) {
            callback(res);
        }
    });
}
function luuVaTrinhBaoCaoGD(callback = undefined) {
    if (!_frmBaoCaoGD.isValid()) {
        _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ");
        return;
    }
    var obj = layFormBaoCaoGD();
    obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    obj.nguon = "GD";

    _service.luuBaoCaoGD(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _notifyService.success("Lưu thông tin báo cáo giám định thành công");
        $("#btnModalTrinhphancapBCGD").trigger('click');
        $("#modalBaoCaoGDTrangThai").addClass("text-success");
        $("#modalBaoCaoGDTrangThai").removeClass("text-danger");
        $("#modalBaoCaoGDTrangThai").html("Đang thực hiện báo cáo giám định");
        if (callback) {
            callback(res);
        }
    });
}
function luuDGHT(callback = undefined) {
    if (_frmDanhGiaHienTruong.isValid()) {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            data: getDataFrmDanhGiaHienTruong()
        }
        var temp = obj.data.where(n => (n.kieu == 'RADIO' || n.kieu == 'CHECKBOX') && n.bat_buoc_nhap == 1 && n.noi_dung == '').length;
        var temp1 = obj.data.where(n => n.kieu == 'NUMBER' && n.bat_buoc_nhap == 1 && (n.noi_dung == '0' || n.noi_dung == 0)).length;
        if (temp > 0 || temp1 > 0) {
            _notifyService.error('Có đánh giá bắt buộc chưa được nhập!');
            return;
        }
        var flag = false;
        $.each(obj.data, (index, item) => {
            if (item.noi_dung != "" && item.noi_dung != undefined) {
                flag = true;
            }
        });
        if (!flag) {
            _notifyService.error('Chưa có đánh giá nào');
            return;
        }
        if (obj.data.length == 0) {
            _notifyService.error('Chưa có đánh giá nào');
            return;
        }
        _service.luuDanhGiaHienTruong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu đánh giá hiện trường thành công.");
            if (callback) {
                callback();
            }
        });
    }
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
function capNhatUocTonThat(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        lhnv: objDanhMuc.lhnv
    }
    _carClaimCommon.showUocTonThat(obj, el);
}
function laySoHoSo() {
    $('#table_uoc_ton_that').show();
    $('#btnLuuUocLaySoHS').show();
    $('#btnLaySoHS').show();
    _service.layThongTinHopDong({
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        pm: "GD",
        nv: "XE"
    }).then(res => {
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
            ESUtil.genHTML("dsXacMinhPhiLaySoHS_template", "dsXacMinhPhiLaySoHS", { danh_sach: res.data_info.tt_phi });
            ESUtil.genHTML("dsUocTonThatNVLaySoHS_template", "dsUocTonThatNVLaySoHS", { data: res.data_info.uoc_ton_that_nv }, () => {
                TinhToanUocTonThat();
                $('#dsUocTonThatNVLaySoHS tr input[data-field=uoc_ton_that]').trigger('change');
            });
            _modalXemThongTinChungNhan.show();
        }
    });
}
function binDataFormKienNghi() {
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
    _frmTaoNoiDung.getControl("nv").setValue("XE");
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue("GD");
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("ma_doi_tac").readOnly();
    _frmTaoNoiDung.getControl("nv").readOnly();
    _frmTaoNoiDung.getControl("pm").readOnly();
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
function loadDuLieuFormNoiDung(el, obj) {
    _carClaimCommonService.layDanhSachNoiDung(obj).then(res => {
        arrNoiDung = res.data_info.noi_dung;
        ESUtil.genHTML("modalChonNoiDungDanhSachTemplate", "modalChonNoiDungDanhSach", { danh_sach: arrNoiDung }, () => {
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
function chonKienNghi(el, placement = "top") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        pm: CONSTANT_PM,
        nv: "XE",
        nv_ct: "KIEN_NGHI"
    }
    loadDuLieuFormNoiDung(el, obj);
    _modalChonNoiDung.options = { placement: placement };
    _modalChonNoiDung.show(el);
}
function chonNoiDungTrinhDuyet(el, placement = "bottom") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        pm: CONSTANT_PM,
        nv: "XE",
        nv_ct: "TRINH_DUYET_GD"
    }
    loadDuLieuFormNoiDung(el, obj);
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
function xemDanhGiaBaoCao(tab) {
    _navBaoCaoGD.showTab("navBaoCaoGD_" + tab);
    $("#btnGuiXacNhanDGHT").addClass("d-none");
    $("#btnXacNhanKyTay").addClass("d-none");

    $("#btnInBCGD").addClass("d-none");
    $("#btnInDGHT").addClass("d-none");
    $("#btnIn" + tab).removeClass("d-none");

    if (tab == "DGHT") {
        $("#btnModalTrinhphancapBCGD").addClass("d-none");
        $("#btnGuiXacNhanDGHT").addClass("d-none");
        $("#btnXacNhanKyTay").addClass("d-none");
        $("#btnLuuBaoCaoGD").addClass("d-none");
        $("#btnLuuTrinhBaoCaoGD").addClass("d-none");
        $("#btnLuuDanhGiaHienTruong").removeClass("d-none");

        _frmDanhGiaHienTruong.clearErrorMessage();
        _frmDanhGiaHienTruong.resetForm();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        };
        _service.LayChiTietDanhGiaHienTruong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var dght = res.data_info.dght;
            $("#dght_trang_thai").html("Chưa gửi xác nhận");
            $("#dght_trang_thai").addClass("text-danger");
            $("#dght_hinh_thuc").addClass("text-danger");
            $("#dght_ngay_xac_nhan").addClass("text-danger");
            $("#dght_hinh_thuc").html("Chưa xác định");
            $("#dght_ngay_xac_nhan").html("Chưa xác định");
            if (dght != null) {
                $("#dght_trang_thai").html(dght.xac_nhan);
                $("#dght_hinh_thuc").html(dght.hinh_thuc);
                $("#dght_hinh_thuc").removeClass("text-danger");
                $("#dght_ngay_xac_nhan").removeClass("text-danger");
                $("#dght_hinh_thuc").addClass("text-success");
                $("#dght_ngay_xac_nhan").addClass("text-success");
                $("#dght_ngay_xac_nhan").html(dght.ngay_xac_nhan_hthi);
                if (dght.ngay_xac_nhan < 30000101 && dght.ngay_xac_nhan > 0) {
                    $("#dght_trang_thai").removeClass("text-danger");
                    if (dght.trang_thai == "T") {
                        $("#dght_trang_thai").addClass("text-danger");
                    }
                    else {
                        $("#dght_trang_thai").addClass("text-success");
                    }
                }
                else {
                    $("#btnGuiXacNhanDGHT").removeClass("d-none");
                    $("#btnXacNhanKyTay").removeClass("d-none");
                }
            }

            ESUtil.genHTML("danh_gia_hien_truong_template", "danh_gia_hien_truong", { kieu: objDanhMuc.danh_gia_hien_truong.loai, data: objDanhMuc.danh_gia_hien_truong.lke }, () => {
                $.each(res.data_info.dght_ct, (index, item) => {
                    if (item.noi_dung != '' && item.noi_dung != undefined) {
                        $("form[name=frmDanhGiaHienTruong] textarea[name='" + item.loai + "']").val(item.noi_dung);
                        $("form[name=frmDanhGiaHienTruong] input.number[name='" + item.loai + "']").val(ESUtil.formatMoney(item.noi_dung));
                        var arr = item.noi_dung.split(",").where(n => n != '');
                        for (var i = 0; i < arr.length; i++) {
                            var val = arr[i];
                            if (val != undefined && val != null && val != "") {
                                $("form[name=frmDanhGiaHienTruong] input[value='" + val + "']").prop("checked", true);
                            }
                        }
                    }
                });
            });
        });
    }
    if (tab == 'BCGD') {
        $("#btnLuuDanhGiaHienTruong").addClass("d-none");
        $("#btnModalTrinhphancapBCGD").removeClass("d-none");
        $("#btnLuuBaoCaoGD").removeClass("d-none");
        $("#btnLuuTrinhBaoCaoGD").removeClass("d-none");

        //if (!_frmBaoCaoGD.getControl("gara_de_xuat").checkBindData()) {
        //    _frmBaoCaoGD.getControl("gara_de_xuat").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
        //}
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nguon: "GD"
        };
        _service.layBaoCaoGD(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            bindFormBaoCaoGD(res.data_info);
        });
    }
}
function xemThongTinXacNhan() {
    $("#btnXacNhanKyTayBBGD").addClass("d-none");
    $("#bbgd_trang_thai").addClass("text-danger");
    $("#bbgd_hinh_thuc").addClass("text-danger");
    $("#bbgd_ngay_xac_nhan").addClass("text-danger");
    $("#bbgd_trang_thai").html("Chưa xác nhận");
    $("#bbgd_hinh_thuc").html("Chưa xác định");
    $("#bbgd_ngay_xac_nhan").html("Chưa xác định");
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    };
    _service.layThongTinXacNhanBBGD(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info;
        if (data == null || data.ngay_xac_nhan >= 30000101) {
            $("#btnXacNhanKyTayBBGD").removeClass("d-none");
            return;
        }
        $("#btnXacNhanKyTayBBGD").remove("d-none");
        $("#bbgd_trang_thai").removeClass("text-danger");
        $("#bbgd_hinh_thuc").removeClass("text-danger");
        $("#bbgd_ngay_xac_nhan").removeClass("text-danger");
        $("#bbgd_trang_thai").addClass("text-success");
        $("#bbgd_hinh_thuc").addClass("text-success");
        $("#bbgd_ngay_xac_nhan").addClass("text-success");
        $("#bbgd_trang_thai").html(data.xac_nhan);
        $("#bbgd_hinh_thuc").html(data.hinh_thuc);
        $("#bbgd_ngay_xac_nhan").html(data.ngay_xac_nhan_hthi);
    });
}
function getDataTableUocTTLaySoHS() {
    var otArrGD = [];
    $("#tableDSUocTonThatNVLaySoHS tr.row-item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
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
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        if (json.lh_nv != '') {
            otArrGD.push(json);
        }
    });
    return otArrGD;
}
function getDataTableUocTT() {
    var otArrGD = [];
    $("#dsUocTonThatNV tr.row-item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
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
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        if (json.lh_nv != '') {
            otArrGD.push(json);
        }
    });
    return otArrGD;
}
function TinhToanUocTonThat() {
    $('#dsUocTonThatNVLaySoHS tr input[data-field=uoc_ton_that], #dsUocTonThatNVLaySoHS tr input[data-field=tl_thue]').change(function () {
        var uoc_ton_that = parseInt($(this).closest("tr").find("input[data-field='uoc_ton_that']").val().replace(/[^0-9]+/g, ''));
        var tl_thue = parseInt($(this).closest("tr").find("input[data-field='tl_thue']").val().replace(/[^0-9]+/g, ''));
        var tien_thue = uoc_ton_that * tl_thue / 100;
        var tong_cong = uoc_ton_that + tien_thue;

        if (tl_thue > 10) {
            $(this).closest("tr").find("input[data-field='tl_thue']").val(10);
        }

        $(this).closest("tr").find("a[data-field='tien_thue']").html(ESUtil.formatMoney(tien_thue));
        $(this).closest("tr").find("a[data-field='tong_cong']").html(ESUtil.formatMoney(tong_cong));

        var tt_xe_tong_so_tien_uoc = 0;
        var tt_xe_tong_tien_uoc_thue = 0;
        var tt_xe_tong_cong_uoc_ton_that = 0;
        $.each($('#dsUocTonThatNVLaySoHS tr.row-item'), (index, item) => {
            var tien_uoc_item = parseInt($(item).find("input[data-field='uoc_ton_that']").val().replace(/[^0-9]+/g, ''));
            var tl_thue_item = parseInt($(item).find("input[data-field='tl_thue']").val().replace(/[^0-9]+/g, ''));
            var tien_thue_item = tien_uoc_item * tl_thue_item / 100;
            var tong_cong_item = tien_uoc_item + tien_thue_item;

            tt_xe_tong_so_tien_uoc += tien_uoc_item;
            tt_xe_tong_tien_uoc_thue += tien_thue_item;
            tt_xe_tong_cong_uoc_ton_that += tong_cong_item;

            $('#tt_xe_tong_so_tien_uoc').html(ESUtil.formatMoney(tt_xe_tong_so_tien_uoc));
            $('#tt_xe_tong_tien_uoc_thue').html(ESUtil.formatMoney(tt_xe_tong_tien_uoc_thue));
            $('#tt_xe_tong_cong_uoc_ton_that').html(ESUtil.formatMoney(tt_xe_tong_cong_uoc_ton_that));
        });
    });
}
function luuUocTonThatLaySoHS(callback = undefined) {
    var arr_data = getDataTableUocTTLaySoHS();
    var obj_data = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        arr: arr_data
    }
    _service.luuUocTonThatNV(obj_data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _service.layThongTinChiTietHoSo(obj_data).then(res1 => {
            ho_so_chi_tiet = res1;
            $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
            if (callback) {
                callback();
            }
        });
    });
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
        pm: "GD",
        nv: "XE"
    };
    _service.base.all([
        _carClaimCommonService.layThongTinGCN(obj),
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
                    $("#tblCarCommonCertificate").bindJsonToHtml(res.data_info.ho_so);
                } else {
                    $("#tblCarCommonCertificate").bindJsonToHtml({});
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
function chonLHNVUocLaySoHS(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt
    };
    _service.layDsLHNVUoc(obj).then(res => {
        ESUtil.genHTML("modalLHNVDanhSachTemplate", "modalLHNVDanhSachLaySoHS", { data: res.data_info }, () => {
            var arr_data = getDataTableUocTTLaySoHS();
            $("#modalLHNVDanhSachLaySoHS .dslhnv").removeClass("d-none");
            $("#inputSearch_LHNVLaySoHS").focus();
            $("#inputSearch_LHNVLaySoHS").val("");
            $("#modalLHNVDanhSachLaySoHS .modalLHNVItem").prop("checked", false);
            for (var i = 0; i < arr_data.length; i++) {
                $("#modalLHNVDanhSachLaySoHS .modalLHNVItem[value='" + arr_data[i].lh_nv + "']").prop("checked", true);
            }
            _modalDsLHNVLaySoHS.show(el);
        });
    });
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
function dongPopover(el) {
    $(el).parent().parent().hide();
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
        nv: 'XE',
        man_hinh: 'GIAM_DINH_XE'
    }
    _modalThongTinHoSoService.data = obj;
    _modalThongTinHoSoService.xemChiTietThongTinHoSo();
}
function getCheckedUocTTLaySoHS() {
    var arr_chon = [];
    $("#modalLHNVDanhSachLaySoHS .modalLHNVItem ").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                lh_nv: "",
                ten_lhnv: "",
                uoc_ton_that: "0",
                tl_thue: "0",
                tien_thue: "0",
                tong_cong: "0"
            };
            var val = $(this).val();
            var lh_nv = objDanhMuc.lhnv.where(n => n.ma == val).firstOrDefault();
            obj.lh_nv = val;
            obj.ten_lhnv = lh_nv.ten;
            arr_chon.push(obj);
        }
    });
    return arr_chon;
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
//Đọc OCR báo giá
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
function getImageOCRSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_ocr']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
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
        var json = {};
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
    _carCompensationService.layDuLieuBaoGiaGara(obj).then(res => {
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
    _carCompensationService.layDuLieuBaoGiaGara(obj).then(res => {
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
//Tìm kiếm hạng mục
function layDuLieuBangDGVCXTimKiem() {
    var otArr = [];
    $("#modalChiTietTonThatVCX tr.hmChiTietItem").each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
            x = $(this).children();
            x.each(function (i) {
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
function layDuLieuBangTNDSTAISANXETimKiem() {
    var otArr = [];
    $("#modalChiTietTonThatTNDS_TAI_SAN_XE tr.hmChiTietItem").each(function (e) {
        var json = {};
        if (!$(this).hasClass("d-none")) {
            x = $(this).children();
            x.each(function (i) {
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
function layDuLieuBaoGiaChiTietTimKiem() {
    var otArr = [];
    $('table#tableDsHMTTBaoGia tr.gara_bg_ctiet').each(function (e) {
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
//Lấy lịch sử yêu cầu BSHS
function getPagingLichSuYeuCauBSHS(trang, callback = undefined) {
    var obj = {};
    obj.trang = trang;
    obj.so_dong = 8;
    obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id
    _service.layLichSuYeuCauBSHS(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.data;
        ESUtil.genHTML("danhSachHoSoGiayToYeuCauTemplate", "danhSachHoSoGiayToYeuCau", { data: data }, () => {
            _modalLichSuYeuCauBSHS.show();
        });
        $("#danhSachHoSoGiayToYeuCau_pagination").html(ESUtil.pagingHTML("getPagingLichSuYeuCauBSHS", obj.trang, res.data_info.tong_so_dong, obj.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function loadGaraBaoGia(callback = undefined) {
    var json = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    }
    $("#btnTrinhPA").addClass("d-none");
    $("#btnDuyetBaoGiaGara").hide();
    $("#btnTuChoiBT").hide();
    $("#btnHuyDuyetBaoGiaGara").hide();
    _frmThemGara.getControl("gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
    _service.layGaraBaoGia(json).then(res => {
        if (res.state_info.status != "OK") {
            e.preventDefault();
            return;
        }
        if (res.data_info.gara.where(n => n.chon_pa_trinh == "D").length > 0) {
            $("#btnTrinhPA").removeClass("d-none");
        }
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
        if ($('.layBaoGiaCT').length > 0) {
            $('.layBaoGiaCT')[0].click();
        } else {
            ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", { data_info: [] });
        }
        if (callback) {
            callback(res);
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
            //_carCompensationService
            _service.xoaGaraBaoGia(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadGaraBaoGia();
                _notifyService.success("Xóa báo giá thành công.");
            });
        });
    });
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
    json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    json.bt_gara = bt_gara;
    json.gara = gara;
    json.so_id_doi_tuong = so_id_doi_tuong;
    //objBaoGiaChiTiet = json;
    //_carCompensationService
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
function capNhatThongTinHangMuc(el, loai_hang_muc, hanh_dong = "SUA", placement = "right right-bottom") {
    _frmHangMucBoSung.getControl("hang_muc").readOnly(false);
    $("#btnXoaInputHangMucBoSung").removeClass("d-none");
    $("#xoaHangMucBoSung").removeClass("d-none");
    if (loai_hang_muc == "G" && hanh_dong == "SUA") {
        $("#btnXoaInputHangMucBoSung").addClass("d-none");
        $("#xoaHangMucBoSung").addClass("d-none");
        _frmHangMucBoSung.getControl("hang_muc").readOnly();
    }
    objDanhMuc.muc_do_ton_that_xe = JSON.parse(JSON.stringify(objDanhMuc.muc_do_ton_that.where(n => n.nhom == "XE")));
    _frmHangMucBoSung.getControl("muc_do").setDataSource(objDanhMuc.muc_do_ton_that_xe, "ten", "ma", "Chọn mức độ tổn thất", "");

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
function chonPaTrinhGD(el, so_id_pa) {
    var objData = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: so_id_pa,
        chon: $(el).is(":checked") ? "D" : "C"
    };
    //_carCompensationService
    _service.chonPhuongAn(objData).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        loadGaraBaoGia();
        _notifyService.success("Chọn phương án thành công");
    });
}
function navTimKiemXe(val) {
    $(".divTIMKIEM").addClass("d-none");
    $(".divTAOHD").addClass("d-none");
    $(".div" + val).removeClass("d-none");
    $("#navLuongXuLy .breadcrumb-item").removeClass("active");
    $("#navLuongXuLy .breadcrumb-item[data-val='" + val + "']").addClass("active");
    _frmTaoHDAo.getControl("loai").setValue("TN");
    _frmTaoHDAo.getControl("loai").trigger("select2:select");
    if (val == "TAOHD") {
        _frmCarClaimCustomerInfo.getControl("so_id_hd").setValue("");
        _frmCarClaimCustomerInfo.getControl("so_id_dt").setValue("");
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
    var hop_tac = $(el).attr("data-hop-tac");
    var chinh_hang = $(el).attr("data-chinh-hang");
    _frmBaoCaoGD.getControl("gara_de_xuat").setValue(ten_gara);
    _frmBaoCaoGD.getControl("gara_de_xuat").attr("data-ma", gara);
    _frmBaoCaoGD.getControl("gara_hop_tac").setValue(hop_tac == null ? "K" : hop_tac);
    _frmBaoCaoGD.getControl("gara_chinh_hang").setValue(chinh_hang == null ? "K" : chinh_hang);
    _popoverChonGaraSuaChua.hide();
}
function xoaChonGara(el) {
    $(el).closest("div.input-group").find("input").attr("data-ma", "");
    $(el).closest("div.input-group").find("input").val("");
    _frmBaoCaoGD.getControl("gara_hop_tac").setValue("");
    _frmBaoCaoGD.getControl("gara_chinh_hang").setValue("");
}
function dongPopover(el) {
    $(el).parent().parent().hide();
}
function chuanHoaDuLieuSoSanhBGGara(du_lieu) {
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
function layDSLHNV() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id
    };
    _service.layDSLHNV(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        objDanhMuc.lh_nv_doi_tuong = res.data_info;
        _frmDanhGiaTonThat.getControl("lh_nv").setDataSource(res.data_info, "ten", "ma", "Chọn loại hình nghiệp vụ", "")
    });
}
function layThongTinDanhGia() {
    if (objDanhMuc.lh_nv_doi_tuong != undefined && objDanhMuc.lh_nv_doi_tuong != null && objDanhMuc.lh_nv_doi_tuong.length > 0) {
        _frmDanhGiaTonThat.getControl("lh_nv").setValue(objDanhMuc.lh_nv_doi_tuong[0].ma);
        _frmDanhGiaTonThat.getControl("lh_nv").trigger("select2:select");
    }
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
function onXemHangMucDGRR(hang_muc) {
    var ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
    var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
    _modalSoSanhDGRR.show(ma_doi_tac, so_id, hang_muc, "XE");
}
function xemDsDoiTuongTonThat() {
    $("#btnMoiAddDoiTuongTT").removeClass("d-none");
    $("#btnLuuChonDoiTuongTT").removeClass("d-none");
    $("#btnLuuAddDoiTuongTT").addClass("d-none");
    $("#btnHuyLuu").addClass("d-none");
    $("#modalAddDoiTuongTTDsChon").removeClass("d-none");
    $("#modalAddDoiTuongTTForm").addClass("d-none");
    _frmAddDoiTuongTT.resetForm();
    _frmAddDoiTuongTT.clearErrorMessage();
    $("#modalAddDoiTuongTT .loai_doi_tuong").addClass("d-none");
    _frmAddDoiTuongTT.getControl("loai").removeAttr("required");
    _frmAddDoiTuongTT = new FormService("frmAddDoiTuongTT");
    ESUtil.genHTML("dsDoiTuongTTTemplate", "dsDoiTuongTT", { data: ho_so_chi_tiet.data_info.ds_doi_tuong }, () => {
        $("#dsDoiTuongTT .input_chon_doi_tuong_tt").prop("checked", false);
        var val = $("#doi_tuong_gd").attr('data-val');
        if (val != "" && val != undefined) {
            var arr = val.split(",");
            for (var i = 0; i < arr.length; i++) {
                $("#dsDoiTuongTT .input_chon_doi_tuong_tt[value='" + arr[i] + "']").prop("checked", true);
            }
        }
    });
    _modalAddDoiTuongTT.show();
}
//Lập phương án
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
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("GIAM_DINH");
    clearCacheLocalStoreage();
    var tu_dong_gia_de_xuat = ESStorage.getItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT);
    if (tu_dong_gia_de_xuat == undefined || tu_dong_gia_de_xuat == null || tu_dong_gia_de_xuat == "") {
        ESStorage.setItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT, "K");
    }
    _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource([], "ten", "ma", "Chọn đối tác", "");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    _frmTimKiemHoSo.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemHoSo.getControl("gdvtt").setValue("");
    _frmTimKiemHoSo.getControl("ngay_c").setValue(dateNow);
    _frmTimKiemGDV.getControl("ngay_bd").setValue(ngayDauThang);
    _frmTimKiemGDV.getControl("ngay_kt").setValue(dateNow);

    //DEV
    //_frmTimKiemHoSo.getControl("ngay_d").setValue("01/11/2022");
    //_frmTimKiemHoSo.getControl("so_hs").setValue("183");

    var objTimKiem = _frmTimKiemHoSo.getJsonData();
    objTimKiem.trang = 1;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null || storageDonViHanhChinh === "null") {
        _service.base.all([
            _userManagementService.layDsNSD(),//0
            _commonService.layTatCaDonViHanhChinh(),//1
            _commonService.layControl({ nv: "XE" }),//2
            _service.timKiemHoSo(objTimKiem),//3
            _partnerListService.layDsDoiTac(),//4
            _branchListService.layDsChiNhanh(),//5
            _businessCodeService.layDsLHNV("XE"),//6
            _categoryvehicleListService.layDsHangMucXe(),//7
            _bankListService.layDsNganHang(),//8
            _garaListService.layDsGara(),//9
            _damageLevelService.layDsMucDoTonThat(),//10
            _categoryCommonService.layDsDanhMucChung(),//11
            _statusListService.layDsTrangThai(),//12
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "GDHT" }),//13
            _service.layDanhSachTyLeThuongTat(),//14
            _service.GetAllDght({ ma_doi_tac: ESCS_MA_DOI_TAC }),//15
            _unitService.Tkiem({ nhom: "TSHH" }),//16
            _service.dsNhomSuKienBH({ nv: "XE" }),//17
            _service.dsLoaiChiPhiGDTKiem(),//18
            _companyInvestigationService.timKiemCongTyGD({}),//19
            _commonService.danhSachNoiDung({ ma_doi_tac: ESCS_MA_DOI_TAC }),//20
            _carManufacturerListService.layDsHangXe(),//21
            _hieuXeService.layDsHieuXe(),//22
            _rangeVehicleService.layDsLoaiXe(),//23,
            _storageUnitService.layDsMaKho({ ma_doi_tac: ESCS_MA_DOI_TAC }), //24
            _carClaimCommonService.lietKeDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC }),//25
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info;
            objDanhMuc.doi_tac = arrRes[4].data_info;
            objDanhMuc.chi_nhanh = arrRes[5].data_info;
            objDanhMuc.lhnv = arrRes[6].data_info;
            objDanhMuc.hang_muc_xe = arrRes[7].data_info;
            objDanhMuc.ngan_hang = arrRes[8].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[8].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.gara = arrRes[9].data_info;
            objDanhMuc.muc_do_ton_that = arrRes[10].data_info;
            objDanhMuc.dmuc_chung = arrRes[11].data_info;
            objDanhMuc.ds_trang_thai = arrRes[12].data_info;
            objDanhMuc.ds_gdvht = arrRes[13].data_info;
            objDanhMuc.ds_tltt = chuanHoaDuLieuTreeTLTT(arrRes[14].data_info);
            objDanhMuc.danh_gia_hien_truong = arrRes[15].data_info;
            objDanhMuc.dvi_tinh = arrRes[16].data_info;
            objDanhMuc.nhom_su_kien = arrRes[17].data_info;
            objDanhMuc.chi_phi_gd = arrRes[18].data_info;
            objDanhMuc.cty_gdinh = arrRes[19].data_info;
            objDanhMuc.dsKienNghi = arrRes[20].data_info;
            objDanhMuc.hang_xe = arrRes[21].data_info.where(n => n.nv == 'XE');
            objDanhMuc.hieu_xe = arrRes[22].data_info.where(n => n.nv == 'XE');
            objDanhMuc.loai_xe = arrRes[23].data_info.where(n => n.nv == 'XE');
            objDanhMuc.ds_kho_luu_tru = arrRes[24].data_info;
            objDanhMuc.ds_giay_to = arrRes[25].data_info;
            arrTrangThai = arrRes[2].data_info;

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
            _modalBaoCaoService.data.trang_thai = objDanhMuc.ds_trang_thai;
            _modalBaoCaoService.data.nguon = _commonService.danhMucChung.nguon_tb;
            _modalBaoCaoService.fillDataControl();

            _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
            _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");

            _frmSuaGCN.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
            _frmSuaGCN.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
            _frmSuaGCN.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");
            _frmSuaGCN.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");
            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => {
                _frmTimKiemHoSo.getControl("trang_thai").setDataSource(objDanhMuc.ds_trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                _gridViewHoSoGiamDinh.setDataSource(arrRes[3], 1, GRID_HO_SO_SO_DONG);
            });
            ESUtil.executeAsync(() => { bindCmdDataThoiGian(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });
            ESUtil.executeAsync(() => {
                objDanhMucDonViHanhChinh = arrRes[1].data_info;
                ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMucDonViHanhChinh));
                bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);
                objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
                objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
                objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");
            });
            ESUtil.executeAsync(() => { bindCmbDataNhomNguyenNhan(objDanhMuc); });
            ESUtil.executeAsync(() => { bindHangGPLX(); });
            ESUtil.executeAsync(() => {
                objDanhMuc.hang_muc_chinh = objDanhMuc.hang_muc_xe.where(n => n.loai !== "PHU" && n.loai !== "TAI_LIEU" && n.loai !== "ANH_TOAN_CANH" && n.nhom !== "HSGT");
                objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.loai === "TAI_LIEU");
                objDanhMuc.hang_muc_toan_canh = objDanhMuc.hang_muc_xe.where(n => n.loai === "TOAN_CANH");
                objDanhMuc.hang_muc_tnds = objDanhMuc.hang_muc_xe.where(n => n.loai == "TNDS" && (n.ma == "NGUOI" || n.ma == "TAI_SAN"));
                objDanhMuc.hang_muc_hang_hoa = objDanhMuc.hang_muc_xe.where(n => n.loai === "HANG_HOA");
                objDanhMuc.hang_muc_nntx = objDanhMuc.hang_muc_xe.where(n => n.loai === "NNTX");
                objDanhMuc.hang_muc_tnds_ng = objDanhMuc.hang_muc_xe.where(n => n.loai === "TNDS_NG");
                objDanhMuc.hang_muc_tnds_ts = objDanhMuc.hang_muc_xe.where(n => n.loai === "TNDS_TS");
                _carClaimCommon.loadDmucLoaiHsGiayTo(objDanhMuc.hang_muc_tai_lieu);
                for (var i = 0; i < objDanhMuc.muc_do_ton_that.length; i++) {
                    if (objDanhMuc.muc_do_ton_that[i].ma_ct === undefined || objDanhMuc.muc_do_ton_that[i].ma_ct === null || objDanhMuc.muc_do_ton_that[i].ma_ct === "") {
                        objDanhMuc.muc_do_ton_that[i].ma_ct_ten = "Khác";
                    } else {
                        var tt = objDanhMuc.muc_do_ton_that.where(n => n.ma === objDanhMuc.muc_do_ton_that[i].ma_ct).firstOrDefault();
                        if (tt === undefined || tt === null) {
                            objDanhMuc.muc_do_ton_that[i].ma_ct_ten = "Không xác định mã cha";
                            continue;
                        }
                        objDanhMuc.muc_do_ton_that[i].ma_ct_ten = tt.ten;
                    }
                }
            });
            ESUtil.executeAsync(() => { bindCmbDataNhomTaiLieu(_commonService.danhMucChung.nhom_tai_lieu); });
            ESUtil.executeAsync(() => {
                ESUtil.autoComplete(document.getElementById("frmHangMucBoSung_hang_muc"), objDanhMuc.hang_muc_chinh, "ma", "ten", 10, "280px", val => { });
            });
            ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalDanhSachLoaiChiPhiLanGDTemplate", "modalLoaiChiPhiLanGDDanhSach", { danh_sach: objDanhMuc.chi_phi_gd });
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
                ESUtil.genHTML("modalHangGPLXDanhSachTemplate", "modalHangGPLXDanhSach", { danh_sach: THOI_HAN_BANG_LAI });

                _frmTinhToanBoiThuongPA.getControl("khau_tru").setDataSource(_commonService.danhMucChung.khau_tru, "ten", "ma", "Chọn khấu trừ", "");
                _frmTinhToanBoiThuongPA.getControl("tl_thue").setDataSource(_commonService.danhMucChung.tl_thue_mien_thuong, "ten", "ma");
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
            _commonService.layControl({ nv: "XE" }),
            _service.timKiemHoSo(objTimKiem),
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _businessCodeService.layDsLHNV("XE"),
            _categoryvehicleListService.layDsHangMucXe(),
            _bankListService.layDsNganHang(),
            _garaListService.layDsGara(),
            _damageLevelService.layDsMucDoTonThat(),
            _categoryCommonService.layDsDanhMucChung(),
            _statusListService.layDsTrangThai(),
            _userManagementService.layDsQuyenNSD({ nhom_chuc_nang: "GDHT" }),
            _service.layDanhSachTyLeThuongTat(),
            _unitService.Tkiem({ nhom: "TSHH" }),
            _service.GetAllDght({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _service.dsLoaiChiPhiGDTKiem(),
            _service.dsNhomSuKienBH({ nv: "XE" }),
            _companyInvestigationService.timKiemCongTyGD({}),
            _commonService.danhSachNoiDung({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _carManufacturerListService.layDsHangXe(),
            _hieuXeService.layDsHieuXe(),
            _rangeVehicleService.layDsLoaiXe(),
            _storageUnitService.layDsMaKho({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _carClaimCommonService.lietKeDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC })
        ]).then(arrRes => {
            objDanhMuc.can_bo = arrRes[0].data_info;
            objDanhMuc.doi_tac = arrRes[3].data_info;
            objDanhMuc.chi_nhanh = arrRes[4].data_info;
            objDanhMuc.lhnv = arrRes[5].data_info;
            objDanhMuc.hang_muc_xe = arrRes[6].data_info;
            objDanhMuc.ngan_hang = arrRes[7].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[7].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.gara = arrRes[8].data_info;
            objDanhMuc.muc_do_ton_that = arrRes[9].data_info;
            objDanhMuc.dmuc_chung = arrRes[10].data_info;
            objDanhMuc.ds_trang_thai = arrRes[11].data_info;
            objDanhMuc.ds_gdvht = arrRes[12].data_info;
            objDanhMuc.ds_tltt = chuanHoaDuLieuTreeTLTT(arrRes[13].data_info);
            objDanhMuc.dvi_tinh = arrRes[14].data_info;
            objDanhMuc.danh_gia_hien_truong = arrRes[15].data_info;
            objDanhMuc.chi_phi_gd = arrRes[16].data_info;
            objDanhMuc.nhom_su_kien = arrRes[17].data_info;
            objDanhMuc.cty_gdinh = arrRes[18].data_info;
            objDanhMuc.dsKienNghi = arrRes[19].data_info;
            objDanhMuc.hang_xe = arrRes[20].data_info.where(n => n.nv == 'XE');
            objDanhMuc.hieu_xe = arrRes[21].data_info.where(n => n.nv == 'XE');
            objDanhMuc.loai_xe = arrRes[22].data_info.where(n => n.nv == 'XE');
            objDanhMuc.ds_kho_luu_tru = arrRes[23].data_info;
            objDanhMuc.ds_giay_to = arrRes[24].data_info;
            arrTrangThai = arrRes[1].data_info;

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.dmuc_chung.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
            _modalBaoCaoService.data.trang_thai = objDanhMuc.ds_trang_thai;
            _modalBaoCaoService.data.nguon = _commonService.danhMucChung.nguon_tb;
            _modalBaoCaoService.fillDataControl();

            _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
            _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");

            _frmSuaGCN.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
            _frmSuaGCN.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
            _frmSuaGCN.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");
            _frmSuaGCN.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");

            ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
            ESUtil.executeAsync(() => {
                _frmTimKiemHoSo.getControl("trang_thai").setDataSource(objDanhMuc.ds_trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                _gridViewHoSoGiamDinh.setDataSource(arrRes[2], 1, GRID_HO_SO_SO_DONG);
            });
            ESUtil.executeAsync(() => { bindCmdDataThoiGian(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataMoiQuanHe(objDanhMuc); });
            ESUtil.executeAsync(() => { bindCmbDataNhomNguyenNhan(objDanhMuc); });
            ESUtil.executeAsync(() => { bindHangGPLX(); });
            ESUtil.executeAsync(() => {
                objDanhMuc.hang_muc_chinh = objDanhMuc.hang_muc_xe.where(n => n.loai !== "PHU" && n.loai !== "TAI_LIEU" && n.loai !== "ANH_TOAN_CANH" && n.nhom !== "HSGT");
                objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.loai === "TAI_LIEU");
                objDanhMuc.hang_muc_toan_canh = objDanhMuc.hang_muc_xe.where(n => n.loai === "TOAN_CANH");
                objDanhMuc.hang_muc_tnds = objDanhMuc.hang_muc_xe.where(n => n.loai == "TNDS" && (n.ma == "NGUOI" || n.ma == "TAI_SAN"));
                objDanhMuc.hang_muc_hang_hoa = objDanhMuc.hang_muc_xe.where(n => n.loai === "HANG_HOA");
                objDanhMuc.hang_muc_nntx = objDanhMuc.hang_muc_xe.where(n => n.loai === "NNTX");
                objDanhMuc.hang_muc_tnds_ng = objDanhMuc.hang_muc_xe.where(n => n.loai === "TNDS_NG");
                objDanhMuc.hang_muc_tnds_ts = objDanhMuc.hang_muc_xe.where(n => n.loai === "TNDS_TS");
                _carClaimCommon.loadDmucLoaiHsGiayTo(objDanhMuc.hang_muc_tai_lieu);
                for (var i = 0; i < objDanhMuc.muc_do_ton_that.length; i++) {
                    if (objDanhMuc.muc_do_ton_that[i].ma_ct === undefined || objDanhMuc.muc_do_ton_that[i].ma_ct === null || objDanhMuc.muc_do_ton_that[i].ma_ct === "") {
                        objDanhMuc.muc_do_ton_that[i].ma_ct_ten = "Khác";
                    } else {
                        var tt = objDanhMuc.muc_do_ton_that.where(n => n.ma === objDanhMuc.muc_do_ton_that[i].ma_ct).firstOrDefault();
                        if (tt === undefined || tt === null) {
                            objDanhMuc.muc_do_ton_that[i].ma_ct_ten = "Không xác định mã cha";
                            continue;
                        }
                        objDanhMuc.muc_do_ton_that[i].ma_ct_ten = tt.ten;
                    }
                }
            });
            ESUtil.executeAsync(() => { bindCmbDataNhomTaiLieu(_commonService.danhMucChung.nhom_tai_lieu); });
            ESUtil.executeAsync(() => {
                ESUtil.autoComplete(document.getElementById("frmHangMucBoSung_hang_muc"), objDanhMuc.hang_muc_chinh, "ma", "ten", 10, "280px", val => { });
            });
            ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalDanhSachLoaiChiPhiLanGDTemplate", "modalLoaiChiPhiLanGDDanhSach", { danh_sach: objDanhMuc.chi_phi_gd });
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
                        _frmAddChiPhiKhac.getControl("ten_chi_phi").setValue("Chi phí giám định với đơn vị giám định ngoài");
                        bindDataThongTinChiTietForm(ma_chi_phi, val);
                    }
                    if (ma_chi_phi == "CP_CAU_KEO") {
                        var ma = val.split("-")[0];
                        var nhom = val.split("-")[1];
                        bindDataThongTinChiTietForm(ma_chi_phi, ma, nhom);
                        anHienColChiPhiKhac(ma_chi_phi, nhom);
                    }
                });
                ESUtil.genHTML("modalHangGPLXDanhSachTemplate", "modalHangGPLXDanhSach", { danh_sach: THOI_HAN_BANG_LAI });

                _frmTinhToanBoiThuongPA.getControl("khau_tru").setDataSource(_commonService.danhMucChung.khau_tru, "ten", "ma", "Chọn khấu trừ", "");
                _frmTinhToanBoiThuongPA.getControl("tl_thue").setDataSource(_commonService.danhMucChung.tl_thue_mien_thuong, "ten", "ma");
            });
        });
    }
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
    _frmTaoNoiDung.getControl('nv').addEventChange(val => {
        var arr_nv = arrNghiepVu.where(n => n.nv == val);
        _frmTaoNoiDung.getControl("pm").setDataSource(arr_nv, "ten", "ma", "Chọn phần mềm", "");
    });
    _frmTaoNoiDung.getControl('pm').addEventChange(val => {
        var arr_nv_ct = arrNV_CT.where(n => n.pm == val);
        _frmTaoNoiDung.getControl("nv_ct").setDataSource(arr_nv_ct, "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
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
                so_id: _frmCarClaimCustomerInfo.getControl('so_id_hd').val()
            }
            _carContractService.layChiTietHopDong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var res_data = {
                    nguoi_tb: res.data_info.hd.ten,
                    dthoai_tb: res.data_info.hd.dthoai,
                    email_tb: res.data_info.hd.email
                }
                _frmCarClaimCustomerInfo.getControl('nguoi_tb').setValue(res_data.nguoi_tb);
                _frmCarClaimCustomerInfo.getControl('dthoai_tb').setValue(res_data.dthoai_tb);
                _frmCarClaimCustomerInfo.getControl('email_tb').setValue(res_data.email_tb);
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
    _frmCarClaimCompareDataGPLX.getControl("vu_tt").addEventChange(val => {
        var vu_tt_model = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt == val).firstOrDefault();
        var json_ocr = JSON.parse(_frmCarClaimCompareDataGPLX.getControl("json_ocr").val());
        var arr = [];
        var ho_ten = {
            ma_nd: "HO_TEN",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "HỌ TÊN LÁI XE",
            nd_goc: vu_tt_model.ten_lxe == null || vu_tt_model.ten_lxe == '' ? 'Chưa có dữ liệu' : vu_tt_model.ten_lxe,
            nd_ocr: json_ocr.ho_ten == null || json_ocr.ho_ten == '' ? 'Chưa có dữ liệu ocr' : json_ocr.ho_ten,
            so_sanh: false
        };
        ho_ten.so_sanh = ESUtil.compareText(ho_ten.nd_goc, ho_ten.nd_ocr);
        var so_gplx = {
            ma_nd: "SO_GPLX",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "SỐ GPLX",
            nd_goc: vu_tt_model.gplx_so == null || vu_tt_model.gplx_so == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_so,
            nd_ocr: json_ocr.so == null || json_ocr.so == '' ? 'Chưa có dữ liệu ocr' : json_ocr.so,
            so_sanh: false
        };
        so_gplx.so_sanh = ESUtil.compareText(so_gplx.nd_goc, so_gplx.nd_ocr);
        var hang = {
            ma_nd: "HANG",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "HẠNG",
            nd_goc: vu_tt_model.gplx_hang == null || vu_tt_model.gplx_hang == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_hang,
            nd_ocr: json_ocr.hang == null || json_ocr.hang == '' ? 'Chưa có dữ liệu ocr' : json_ocr.hang,
            so_sanh: false
        };
        hang.so_sanh = ESUtil.compareText(hang.nd_goc, hang.nd_ocr);
        var ngay_cap = {
            ma_nd: "NGAY_CAP",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "NGÀY CẤP",
            nd_goc: vu_tt_model.gplx_hieu_luc == null || vu_tt_model.gplx_hieu_luc == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_hieu_luc,
            nd_ocr: json_ocr.ngay_cap == null || json_ocr.ngay_cap == '' ? 'Chưa có dữ liệu ocr' : json_ocr.ngay_cap,
            so_sanh: false
        };
        ngay_cap.so_sanh = ESUtil.compareStringDate(ngay_cap.nd_goc, ngay_cap.nd_ocr);
        var ngay_het_han = {
            ma_nd: "NGAY_HET_HAN",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "NGÀY HẾT HẠN",
            nd_goc: vu_tt_model.gplx_het_han == null || vu_tt_model.gplx_het_han == '' ? 'Chưa có dữ liệu' : vu_tt_model.gplx_het_han,
            nd_ocr: json_ocr.ngay_het_han == null || json_ocr.ngay_het_han == '' ? 'Chưa có dữ liệu ocr' : json_ocr.ngay_het_han,
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
        var vu_tt_model = ho_so_chi_tiet.data_info.dien_bien.where(n => n.vu_tt == val).firstOrDefault();
        var json_ocr = JSON.parse(_frmCarClaimCompareDataDangKiem.getControl("json_ocr").val());
        var arr = [];
        var so_dang_kiem = {
            ma_nd: "SO_DANG_KIEM",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "SỐ ĐĂNG KIỂM",
            nd_goc: vu_tt_model.dangkiem_so == null || vu_tt_model.dangkiem_so == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_so,
            nd_ocr: json_ocr.so_seri == null || json_ocr.so_seri == '' ? 'Chưa có dữ liệu ocr' : json_ocr.so_seri,
            so_sanh: false
        };
        so_dang_kiem.so_sanh = ESUtil.compareText(so_dang_kiem.nd_goc, so_dang_kiem.nd_ocr);
        var ngay_cap = {
            ma_nd: "NGAY_CAP",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "NGÀY CẤP",
            nd_goc: vu_tt_model.dangkiem_hieu_luc == null || vu_tt_model.dangkiem_hieu_luc == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_hieu_luc,
            nd_ocr: json_ocr.ngay_cap == null || json_ocr.ngay_cap == '' ? 'Chưa có dữ liệu ocr' : json_ocr.ngay_cap,
            so_sanh: false
        };
        ngay_cap.so_sanh = ESUtil.compareStringDate(ngay_cap.nd_goc, ngay_cap.nd_ocr);
        var ngay_het_han = {
            ma_nd: "NGAY_HET_HAN",
            vu_tt: vu_tt_model.vu_tt,
            noi_dung_so_sanh: "NGÀY HẾT HẠN",
            nd_goc: vu_tt_model.dangkiem_het_han == null || vu_tt_model.dangkiem_het_han == '' ? 'Chưa có dữ liệu' : vu_tt_model.dangkiem_het_han,
            nd_ocr: json_ocr.ngay_het_han == null || json_ocr.ngay_het_han == '' ? 'Chưa có dữ liệu ocr' : json_ocr.ngay_het_han,
            so_sanh: false
        };
        ngay_het_han.so_sanh = ESUtil.compareStringDate(ngay_het_han.nd_goc, ngay_het_han.nd_ocr);
        arr.push(so_dang_kiem);
        arr.push(ngay_cap);
        arr.push(ngay_het_han);
        ESUtil.genHTML("modalCarClaimCompareDataDangKiem_SoSanh_Template", "modalCarClaimCompareDataDangKiem_SoSanh", { data: arr });
    });
    _frmPhanLoaiNhanh.getControl("loai").addEventChange(val => {
        anHienDanhMucPhanLoaiNhanh("LOAI");
    });
    _frmPhanLoaiNhanh.getControl("lh_nv").addEventChange(val => {
        anHienDanhMucPhanLoaiNhanh("LHNV");
    });
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").addEventChange(val => {
        var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setValue("");
    });
    _frmChuyenNguoiXuLyGDVHT.getControl("ma_chi_nhanh_moi").addEventChange(val => {
        var arrCanBo = objDanhMuc.ds_gdvht.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmChuyenNguoiXuLyGDVHT.getControl("nsd_moi").setValue("");
    });
    _frmAddLicenseInfo.getControl("vu_tt").addEventChange(val => {
        loadFormBsThongTinBangLaiXe(val);
    });
    _frmAddRegistryInfo.getControl("vu_tt").addEventChange(val => {
        loadFormBsThongTinDangKiem(val);
    });
    _frmThemHMTT.getControl("loai").addEventChange(val => {
        var loai = _frmThemHMTT.getControl("loai").val();
        var so_id_doi_tuong = _frmThemHMTT.getControl("so_id_doi_tuong").val();
        var lh_nv = _frmThemHMTT.getControl("lh_nv").val();
        if (loai == "TC" || loai == "TL") {
            var ds_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong;
            _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(ds_doi_tuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", ds_doi_tuong.length <= 0 ? "" : ds_doi_tuong[0].so_id_doi_tuong);
        }
        /*        loadMucDoTT(val, lh_nv, so_id_doi_tuong);*/
        anHienControlPhanLoai();
    });
    _frmThemHMTT.getControl("lh_nv").addEventChange(val => {
        var loai = _frmThemHMTT.getControl("loai").val();
        if (loai == "TT") {
            var objLHNV = ho_so_chi_tiet.data_info.lh_nv.where(n => val != null && n.ma == val.trim()).firstOrDefault();
            var ds_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong;
            var doi_tuong = objLHNV == null ? "" : objLHNV.doi_tuong;
            var arr_dt = ds_doi_tuong.where(n => n.nhom == doi_tuong);
            _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(arr_dt, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", arr_dt.length <= 0 ? "" : arr_dt[0].so_id_doi_tuong);
            _frmThemHMTT.getControl("so_id_doi_tuong").trigger("select2:select");
        }
        else {
            var ds_doi_tuong = ho_so_chi_tiet.data_info.ds_doi_tuong;
            _frmThemHMTT.getControl("so_id_doi_tuong").setDataSource(ds_doi_tuong, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", ds_doi_tuong.length <= 0 ? "" : ds_doi_tuong[0].so_id_doi_tuong);
        }
        anHienControlPhanLoai();
    });
    _frmThemHMTT.getControl("so_id_doi_tuong").addEventChange(val => {
        var loai = _frmThemHMTT.getControl("loai").val();
        var lh_nv = _frmThemHMTT.getControl("lh_nv").val();
        loadMucDoTT(loai, lh_nv, val);
        anHienControlPhanLoai();
    });
    _frmThemHMTT.getControl("thay_the_sc").addEventChange(val => {
        if (val == "S") {
            _frmThemHMTT.getControl("so_luong").val(0);
            _frmThemHMTT.getControl("so_luong").attr("disabled", "disabled");
        } else {
            _frmThemHMTT.getControl("so_luong").val(1);
            _frmThemHMTT.getControl("so_luong").removeAttr("disabled");
        }
    });
    _frmDienBienTonThat.getControl("gplx_hang").addEventChange(val => {
        setNgayHetHanGPLX();
    });
    _frmDienBienTonThat.getControl("gplx_hieu_luc").on('apply.daterangepicker', function (ev, picker) {
        setNgayHetHanGPLX();
    });
    _frmAddDoiTuongTT.getControl("nhom").addEventChange(val => {
        $("#modalAddDoiTuongTT .loai_doi_tuong").addClass("d-none");
        _frmAddDoiTuongTT.getControl("loai").removeAttr("required");
        if (val == DOI_TUONG_TT.TAI_SAN) {
            _frmAddDoiTuongTT.getControl("loai").setDataSource([
                { ma: "KHAC", ten: "Tài sản khác" },
                { ma: "XE", ten: "Tài sản là một xe ô tô khác" }
            ], "ten", "ma", "Chọn loại đối tượng", "");
            _frmAddDoiTuongTT.getControl("loai").setValue("KHAC");
            $("#modalAddDoiTuongTT .loai_doi_tuong").removeClass("d-none");
            _frmAddDoiTuongTT.getControl("loai").attr("required", "required");
        }
        if (val == DOI_TUONG_TT.NGUOI) {
            _frmAddDoiTuongTT.getControl("loai").setDataSource([
                { ma: "TNDS", ten: "TNDS về người" },
                { ma: "NNTX", ten: "Người ngồi trên xe" },
                { ma: "LPHU_XE", ten: "Lái phụ xe" },
                { ma: "NGUOI_HK", ten: "Hành khách trên xe" }
            ], "ten", "ma", "Chọn loại đối tượng", "");
            _frmAddDoiTuongTT.getControl("loai").setValue("TNDS");
            $("#modalAddDoiTuongTT .loai_doi_tuong").removeClass("d-none");
            _frmAddDoiTuongTT.getControl("loai").attr("required", "required");
        }
        _frmAddDoiTuongTT = new FormService("frmAddDoiTuongTT");
    });
    _frmDanhGiaTNDSTAISAN.getControl("loai_tai_san").addEventChange(val => {
        $("#tableChiTietTonThatTNDS_TAI_SAN").addClass("d-none");
        $("#tableChiTietTonThatTNDS_TAI_SAN_XE").addClass("d-none");
        $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").addClass("d-none");
        if (val == "XE") {
            $("#tableChiTietTonThatTNDS_TAI_SAN_XE").removeClass("d-none");
            $("#frmDanhGiaTNDSTAISAN_doi_tuong_xe").removeClass("d-none");
            var ds_tsan_xe = ho_so_chi_tiet.data_info.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
            _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setDataSource(ds_tsan_xe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
            if (ds_tsan_xe.length > 0) {
                _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").setValue(ds_tsan_xe[0].so_id_doi_tuong);
                _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").trigger("select2:select");
            }
        }
        if (val == "KHAC") {
            $("#tableChiTietTonThatTNDS_TAI_SAN").removeClass("d-none");
            var lh_nv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
            var doi_tuong = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
            var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
            nhapChiTietNghiepVu(doi_tuong, val, lh_nv, 0, res => {
                //res.data_info = chuanHoaNVCT(res.data_info, nhom, doi_tuong, '');
                if (ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd >= 30000101) {
                    $("#btnLuuCTGiamDinh").removeClass("d-none");
                }
                var muc_do_tt = objDanhMuc.muc_do_ton_that.where(n => n.nhom == "TAI_SAN");
                ESUtil.genHTML("modalMucDoTTDanhSachTemplate", "modalMucDoTTDanhSach", { danh_sach: muc_do_tt }, () => {
                    $("#modalMucDoTTDanhSach .single_checked").click(function () {
                        $("#modalMucDoTTDanhSach .single_checked").prop("checked", false);
                        $(this).prop("checked", true);
                    });
                });
                ESUtil.genHTML("modalChiTietTonThatTNDS_TAI_SANTemplate", "modalChiTietTonThatTNDS_TAI_SAN", { danh_sach: res.data_info }, () => {
                    tinhTongTienTNDSTaiSan();
                });
            });
        }
    });
    _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").addEventChange(val => {
        var lh_nv = $("#navDanhGiaNghiepVu li.active").attr("data-lhnv");
        var doi_tuong = $("#navDanhGiaNghiepVu li.active").attr("data-doi-tuong");
        var nhom = $("#navDanhGiaNghiepVu li.active").attr("data-nhom");
        var so_id_doi_tuong = _frmDanhGiaTNDSTAISAN.getControl("doi_tuong_xe").val();
        nhapChiTietNghiepVu(doi_tuong, "XE", lh_nv, so_id_doi_tuong, res => {
            ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatTNDS_TAI_SAN_XE", { danh_sach: res.data_info }, () => {
                tinhTongTienTNDSTAISANXE();
            });
        });
    });
    _frmTaoHDAo.getControl("loai").addEventChange(val => {
        var lhnv = objDanhMuc.lhnv.where(n => n.loai == val);
        _frmTaoHDAo.getControl("lh_nv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        if (val == "TN") {
            var lhnv_vcx = objDanhMuc.lhnv.where(n => n.loai == val && n.vcx == "VCX").firstOrDefault();
            if (lhnv_vcx != null) {
                _frmTaoHDAo.getControl("lh_nv").setValue(lhnv_vcx.ma);
            }
        }
    });
    _frmDanhGiaTonThat.getControl("lh_nv").addEventChange(val => {
        if (val == "")
            return;
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lh_nv: val
        }
        _service.layDgiaLHNV(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmDanhGiaTonThat.getControl("gara").val(res.data_info?.ma_gara);
            _frmDanhGiaTonThat.getControl("uoc_ton_that").val(ESUtil.formatMoney(res.data_info?.uoc_ton_that));
            _frmDanhGiaTonThat.getControl("danh_gia_gdv").val(res.data_info?.danh_gia_gdv);
            _frmDanhGiaTonThat.getControl("y_kien").val(res.data_info?.kien_nghi_gq);
            _frmDanhGiaTonThat.getControl("y_kien_kh").val(res.data_info?.y_kien_khach_hang);
        });
    });
    _frmTkiemTLThuongTat.getControl("nhom").addEventChange(val => {
        danhGiaThuongTat(elementDanhGia);
    });
    _frmTLThuongTatNhap.getControl("pttt").change(e => {
        var val = _frmTLThuongTatNhap.getControl("pttt").val().replace(/[^0-9]+/g, '');
        var tl = 0;
        if (val == null || val=="")
            tl = 0;
        else
            tl = parseInt(val);
        if (tl < 0) {
            tl = 0;
        }
        if (tl > 100) {
            tl = 100;
        }
        _frmTLThuongTatNhap.getControl("pttt").val(tl);

        var tien = Math.round(_commonService.danhMucChung.so_tien_bh.nguoi * tl / 100);
        _frmTLThuongTatNhap.getControl("tien").val(ESUtil.formatMoney(tien));
    });
    //huynq 12/08/2022
    $("#btnTimKiemGDV").click(function () {
        hienThiDsGiamDinhVien(_frmTimKiemGDV.getJsonData());
    });
    $("#btnThemMoiHoSo").click(function () {
        ho_so_chi_tiet = null;

        navTimKiemXe("TIMKIEM");
        _frmCarClaimCarSearch.resetForm();
        _frmCarClaimCarSearch.clearErrorMessage();
        _frmCarClaimCustomerInfo.resetForm();
        _frmCarClaimCustomerInfo.clearErrorMessage();
        _frmCarClaimCarSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmCarClaimCarSearch.getControl("ma_doi_tac").trigger("select2:select");
        _frmCarClaimCarSearch.getControl("ngay_xr").setValue(new Date().ddmmyyyy());

        ESUtil.genHTML("modalCarSearchDsGCNTemplate", "modalCarSearchDsGCN", { data_info: [] });
        $("#modalCarSearch").modal("show");
        _navTabTimKiemXe.showTab("tabTimKiemXe");
        showStep('tabTimKiemXe');
    });
    $("#btnCarSearch").click(function () {
        if (!_frmCarClaimCarSearch.isValid())
            return;
        timKiemXe();
    });
    $("#btnTiepTheo").click(function () {
        $("#Tab_tabTimKiemXe").removeClass("disabledTab");
        var currentTab = _navTabTimKiemXe.currentTab;
        var selectedData = [];
        if ($("#modalCarSearchDsGCN .tkiem_kh.active").length > 0) {
            selectedData.push({
                ma_doi_tac: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_ma_doi_tac"),
                ma_chi_nhanh: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_ma_chi_nhanh"),
                so_id: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_so_id"),
                so_id_dt: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_so_id_dt"),
                loai: $("#modalCarSearchDsGCN .tkiem_kh.active").attr("data_loai")
            });
        }
        if (currentTab === "tabTimKiemXe") {
            var tabActive = $("#navLuongXuLy .breadcrumb-item.active").attr("data-val");
            if (tabActive == "TIMKIEM") {
                if (selectedData.length === 1) {
                    if (_frmCarClaimCarSearch.isValid()) {
                        var dataRow = selectedData[0];
                        if (_frmCarClaimCustomerInfo.getControl('so_id').val() == '' || _frmCarClaimCustomerInfo.getControl('so_id').val() == undefined || _frmCarClaimCustomerInfo.getControl('so_id').val() == null) {
                            _frmCarClaimCustomerInfo.getControl('nguon_tb').attr('readonly', false);
                            _frmCarClaimCustomerInfo.getControl('hien_truong').attr('readonly', false);
                            _frmCarClaimCustomerInfo.getControl('gio_tb').prop('readonly', false);
                            _frmCarClaimCustomerInfo.getControl('ngay_tb').prop('readonly', false);

                            _frmCarClaimCustomerInfo.getControl("nguon_tb").setValue("TTGD");
                            _frmCarClaimCustomerInfo.getControl("hien_truong").setValue("K");
                            _frmCarClaimCustomerInfo.getControl("gio_tb").val(gioHT);
                            _frmCarClaimCustomerInfo.getControl("ngay_tb").val(dateNow);
                        }
                        _frmCarClaimCustomerInfo.getControl("nv").val(dataRow.loai);
                        _frmCarClaimCustomerInfo.getControl("ma_doi_tac").val(ESCS_MA_DOI_TAC);
                        _frmCarClaimCustomerInfo.getControl("ma_chi_nhanh").val(dataRow.ma_chi_nhanh);
                        _frmCarClaimCustomerInfo.getControl("so_id_hd").val(dataRow.so_id);
                        _frmCarClaimCustomerInfo.getControl("so_id_dt").val(dataRow.so_id_dt);
                        _frmCarClaimCustomerInfo.getControl("nv_xly").setDataSource(_commonService.danhMucChung.luong_xly, "ten", "ma", "Chọn luồng xử lý", "");
                        if (ho_so_chi_tiet != null) {
                            _frmCarClaimCustomerInfo.getControl("nv_xly").setValue(ho_so_chi_tiet.data_info.ho_so.nv_xly);
                        }
                        var objRequest = {
                            ma_chi_nhanh: dataRow.ma_chi_nhanh,
                            so_id_hd: dataRow.so_id,
                            so_id_gcn: dataRow.so_id_dt
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
                }
                else {
                    _notifyService.error("Thông tin xe không xác định");
                }
            }
            if (tabActive == "TAOHD") {
                if (!_frmTaoHDAo.isValid()) {
                    return;
                }
                var obj = _frmTaoHDAo.getJsonData();
                //var lhnv = objDanhMuc.lhnv.where(n => n.loai == obj.loai && n.ma_doi_tac == ESCS_MA_DOI_TAC);
                _frmCarClaimCustomerInfo.getControl("nv_xly").setDataSource(_commonService.danhMucChung.luong_xly, "ten", "ma", "Chọn luồng xử lý", "");
                _navTabTimKiemXe.showTab("tabThongTinLienHe");
            }
            _frmCarClaimCustomerInfo.getControl("nguon_tb").setValue("TTGD");
            _frmCarClaimCustomerInfo.getControl("hien_truong").setValue("K");
            _frmCarClaimCustomerInfo.getControl("gio_tb").val(gioHT);
            _frmCarClaimCustomerInfo.getControl("ngay_tb").val(dateNow);

        } else if (currentTab === "tabThongTinLienHe") {
            _frmCarClaimCustomerInfo.clearErrorMessage();
            _frmCarClaimCustomerInfo.getControl('nguon_tb').removeAttr('readonly');
            _frmCarClaimCustomerInfo.getControl('gio_tb').prop('readonly', false);
            _frmCarClaimCustomerInfo.getControl('ngay_tb').prop('readonly', false);
            if (_frmCarClaimCustomerInfo.isValid()) {
                var objJson = _frmCarClaimCustomerInfo.getJsonData();
                objJson.ma_doi_tac = ESCS_MA_DOI_TAC;
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
                _service.luuThongTinNguoiThongBao(objJson).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _frmCarClaimCustomerInfo.getControl("so_hs").val(res.out_value.so_hs);
                    _frmCarClaimCustomerInfo.getControl("so_id").val(res.out_value.so_id);
                    _frmDienBienTonThat.getControl("so_id").val(res.out_value.so_id);
                    var objGetDetail = { ma_doi_tac: objJson.ma_doi_tac, so_id: res.out_value.so_id }
                    _service.layThongTinChiTietHoSo(objGetDetail).then(res => {
                        ho_so_chi_tiet = res;
                        ganTrangThaiHoSo(res);
                        _navThongTinHoSo.showTab("navThongTinChung");
                        _modalCarSearch.hide();
                        bindDataDienBienTonThat(res);
                        showStep("stepDienBienTonThat");
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
    $("#btnLuuDienBienTonThat").click(function () {
        if (_frmDienBienTonThat.isValid()) {
            var jsonStep1 = _frmDienBienTonThat.getJsonData();
            jsonStep1.nhom_su_kien = _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val");
            var gio_xr = jsonStep1.gio_xr.timeToNumber();
            if (gio_xr.toString().length == 3) {
                gio_xr = "0" + gio_xr;
            }
            var ngay_gio_xr = parseInt(jsonStep1.ngay_xr + '' + gio_xr);

            var gio_ht = new Date().HHmm().timeToNumber();
            if (gio_ht.toString().length == 3) {
                gio_ht = "0" + gio_ht;
            }

            var ngay_ht = new Date().ddmmyyyy().dateToNumber();
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
                    jsonStep1.vu_tt = parseFloat(res.out_value.vu_tt);
                    jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                    jsonStep1.so_id = parseFloat(jsonStep1.so_id);
                    jsonStep1.ly_do = res.out_value.ly_do;
                    jsonStep1.pham_vi = res.out_value.pham_vi;
                    ho_so_chi_tiet.data_info.dien_bien.push(jsonStep1);
                } else {
                    var index = ho_so_chi_tiet.data_info.dien_bien.findIndex(x => x.vu_tt == jsonStep1.vu_tt);
                    jsonStep1.ngay_xr = jsonStep1.ngay_xr.numberToDate();
                    jsonStep1.so_id = parseFloat(jsonStep1.so_id);
                    jsonStep1.ly_do = res.out_value.ly_do;
                    jsonStep1.pham_vi = res.out_value.pham_vi;
                    ho_so_chi_tiet.data_info.dien_bien[index] = jsonStep1;
                }
                showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
                setStyleVuTTSelect(_frmDienBienTonThat.getControl("vu_tt").val());
                _notifyService.success("Lưu thông tin thành công.");
                $("#btnHuyThaoTac").trigger('click');
                _frmDienBienTonThat.getControl("ly_do").val(res.out_value.ly_do);
                hthiMauPhamViBaoHiem(res.out_value.pham_vi);
            });

        }
    });
    $("#btnXoaDienBienTonThat").click(function () {
        var so_id = _frmDienBienTonThat.getControl("so_id").val();
        var vu_tt = _frmDienBienTonThat.getControl("vu_tt").val();
        if (so_id === "" || vu_tt === "") {
            _notifyService.success("Thông tin vụ tổn thất chưa xác định. Trạng thái không thể xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa diễn biến tổn thất này không?", " ", val => {
            _service.xoaVuTonThat({ so_id: so_id, vu_tt: vu_tt }).then(res => {
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
    $("#btnXoaThongTinGiamDinh").click(function () {
        var so_id = _frmThongTinGiamDinh.getControl("so_id").val();
        var lan_gd = _frmThongTinGiamDinh.getControl("lan_gd").val();
        if (so_id === "" || lan_gd === "") {
            _notifyService.error("Bạn chưa chọn lần giám định");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa thông tin giám định này không?", " ", val => {
            obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: so_id,
                lan_gd: lan_gd
            };
            _service.xoaLanGiamDinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.data_info.nguoi_dd = ho_so_chi_tiet.data_info.nguoi_dd.removeItem(n => n.lan_gd.toString() === obj.lan_gd.toString());
                ho_so_chi_tiet.data_info.lan_gd = ho_so_chi_tiet.data_info.lan_gd.removeItem(n => n.so_id.toString() === obj.so_id.toString() && n.lan_gd.toString() === obj.lan_gd.toString());
                if (ho_so_chi_tiet.data_info.lan_gd.length <= 0) {
                    showDsLanGD([{ gio_gd: "", ngay_gd: "//" }]);
                    setStyleLanGDSelect("");
                    $("#btnThemMoiThongTinGiamDinh").trigger("click");
                } else {
                    showDsLanGD(ho_so_chi_tiet.data_info.lan_gd);
                    xemChiTietLanGD(ho_so_chi_tiet.data_info.lan_gd[0].lan_gd);
                    setStyleLanGDSelect(ho_so_chi_tiet.data_info.lan_gd[0].lan_gd);
                }
                _notifyService.success("Xóa lần giám định thành công");
            })

        });
    });
    $("#btnLuuBenThamGiaGiamDinh").click(function () {
        if (_frmBenThamGiaGiamDinh.isValid()) {
            var json = _frmBenThamGiaGiamDinh.getJsonData();
            _service.luuBenLienQuan(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (json.bt === "") {
                    json.bt === res.out_value.bt;
                    ho_so_chi_tiet.data_info.nguoi_dd.push(json);
                } else {
                    var index = ho_so_chi_tiet.data_info.nguoi_dd.findIndex(n => n.bt.toString() === json.bt.toString());
                    ho_so_chi_tiet.data_info.nguoi_dd[index] = json;
                }
                var arr = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === json.lan_gd.toString());
                fillDataBenThamGiaGiamDinh(arr);
                _modalBenThamGiaGiamDinh.hide();
                _notifyService.success("Lưu thông tin đại diện giám định thành công");
            });
        }
    });
    $("#btnLuuBsBenThamGiaGD").click(function () {
        if (_frmBsBenThamGiaGD.isValid()) {
            var json = _frmBsBenThamGiaGD.getJsonData();
            _service.luuBenLienQuan(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (json.bt === "") {
                    json.bt === res.out_value.bt;
                    ho_so_chi_tiet.data_info.nguoi_dd.push(json);
                } else {
                    var index = ho_so_chi_tiet.data_info.nguoi_dd.findIndex(n => n.bt.toString() === json.bt.toString());
                    ho_so_chi_tiet.data_info.nguoi_dd[index] = json;
                }
                var arr = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === json.lan_gd.toString());
                fillDataBenThamGiaGiamDinh(arr);
                _notifyService.success("Lưu thông tin đại diện giám định thành công");
            });
        }
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnAddBenThamGiaGiamDinh").click(function () {
        if (_frmThongTinGiamDinh.getControl('lan_gd').getValue() == '') {
            _notifyService.error('Chưa có thông tin lần giám định');
            return;
        }
        _frmBenThamGiaGiamDinh.clearErrorMessage();
        _frmBenThamGiaGiamDinh.resetForm();
        _frmBenThamGiaGiamDinh.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        _frmBenThamGiaGiamDinh.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _frmBenThamGiaGiamDinh.getControl("lan_gd").val(_frmThongTinGiamDinh.getControl("lan_gd").val());
        _modalBenThamGiaGiamDinh.show();
    });
    $("#btnLuuThongTinGiamDinh").click(function () {
        if (!_frmThongTinGiamDinh.isValid()) {
            return;
        }
        var obj = _frmThongTinGiamDinh.getJsonData();
        obj.doi_tuong_gd = _frmThongTinGiamDinh.getControl('doi_tuong_gd').attr('data-val');
        var ngay_ht = dateNow.dateToNumber();
        var gio_ht = new Date().HHmm().timeToNumber();

        var message = "Ngày giờ giám định không được nhỏ hơn ngày giờ hiện tại";
        if (ESCS_MA_DOI_TAC == "PJICO") {
            ngay_ht = ho_so_chi_tiet.data_info.ho_so.ngay_tb1.dateToNumber();
            gio_ht = ho_so_chi_tiet.data_info.ho_so.gio_tb.timeToNumber();
            message = "Ngày giờ giám định không được nhỏ hơn ngày giờ thông báo";
        }

        if (gio_ht.toString().length == 3) {
            gio_ht = "0" + gio_ht;
        }
        var gio_gd = obj.gio_gd.timeToNumber();
        if (gio_gd.toString().length == 3) {
            gio_gd = "0" + gio_gd;
        }

        var ngay_gio_gd = parseInt(obj.ngay_gd + '' + gio_gd);
        var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
        if (ngay_gio_gd < ngay_gio_ht) {
            _notifyService.error(message);
            return;
        }
        var dia_chi = getDiaChi(obj.tinh_thanh, obj.quan_huyen, obj.phuong_xa, obj.dia_diem);
        _modalMap.layToaDo(dia_chi, toa_do => {
            obj.latitude = toa_do.lat;
            obj.longitude = toa_do.lng;
            _service.luuLanGiamDinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    tthai_lan_gd = "xem";
                    _notifyService.success("Lưu thông tin lần giám định thành công.");
                    showDsLanGD(ho_so_chi_tiet.data_info.lan_gd);
                    xemChiTietLanGD(res.out_value.lan_gd.toString());
                    getPaging(1);
                });
            });
        });
    });
    $("#btnLuuDanhGiaTonThat").click(function () {
        $("#error_frmDanhGiaTonThat_kien_nghi").hide();
        var obj = _frmDanhGiaTonThat.getJsonData();
        if (!_frmDanhGiaTonThat.isValid()) {
            return;
        }
        _service.luuGiamDinhTonThat(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ho_so_chi_tiet.data_info.ho_so.gara = obj.gara;
            ho_so_chi_tiet.data_info.ho_so.y_kien = obj.y_kien;
            ho_so_chi_tiet.data_info.ho_so.y_kien_kh = obj.y_kien_kh;
            ho_so_chi_tiet.data_info.ho_so.danh_gia_gdv = obj.danh_gia_gdv;
            _notifyService.success("Lưu thông tin thành công");
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
            var ten_lxe = _frmDienBienTonThat.getControl("ten_lxe").val();
            var dthoai_lxe = _frmDienBienTonThat.getControl("dthoai_lxe").val();
            var email_lxe = _frmDienBienTonThat.getControl("email_lxe").val();
            var gplx_so = _frmDienBienTonThat.getControl("gplx_so").val();
            var gplx_hang = _frmDienBienTonThat.getControl("gplx_hang").val();
            var gplx_hieu_luc = _frmDienBienTonThat.getControl("gplx_hieu_luc").val();
            var gplx_het_han = _frmDienBienTonThat.getControl("gplx_het_han").val();
            var dangkiem_so = _frmDienBienTonThat.getControl("dangkiem_so").val();
            var dangkiem_hieu_luc = _frmDienBienTonThat.getControl("dangkiem_hieu_luc").val();
            var dangkiem_het_han = _frmDienBienTonThat.getControl("dangkiem_het_han").val();

            _frmDienBienTonThat.resetForm();
            _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val", "");
            _frmDienBienTonThat.getControl("so_id").val(so_id);
            _frmDienBienTonThat.getControl("gio_xr").val(new Date().HHmm());
            _frmDienBienTonThat.getControl("ngay_xr").val(dateNow);
            _frmDienBienTonThat.getControl("gplx_hieu_luc").val("");
            _frmDienBienTonThat.getControl("gplx_het_han").val("");
            _frmDienBienTonThat.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmDienBienTonThat.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");

            _frmDienBienTonThat.getControl("ten_lxe").val(ten_lxe);
            _frmDienBienTonThat.getControl("dthoai_lxe").val(dthoai_lxe);
            _frmDienBienTonThat.getControl("email_lxe").val(email_lxe);
            _frmDienBienTonThat.getControl("gplx_so").val(gplx_so);
            _frmDienBienTonThat.getControl("gplx_hang").setValue(gplx_hang);
            _frmDienBienTonThat.getControl("gplx_hieu_luc").val(gplx_hieu_luc);
            _frmDienBienTonThat.getControl("gplx_het_han").val(gplx_het_han);
            _frmDienBienTonThat.getControl("dangkiem_so").val(dangkiem_so);
            _frmDienBienTonThat.getControl("dangkiem_hieu_luc").val(dangkiem_hieu_luc);
            _frmDienBienTonThat.getControl("dangkiem_het_han").val(dangkiem_het_han);
            setStyleVuTTSelect("");
        }
        if (ho_so_chi_tiet.data_info.ho_so.moi_qh_lhe === "QH.0002") {
            _frmDienBienTonThat.getControl("ten_lxe").val(ho_so_chi_tiet.data_info.ho_so.nguoi_tb);
            _frmDienBienTonThat.getControl("dthoai_lxe").val(ho_so_chi_tiet.data_info.ho_so.dthoai_tb);
            _frmDienBienTonThat.getControl("email_lxe").val(ho_so_chi_tiet.data_info.ho_so.email_tb);
        }
    });
    $("#btnHuyThaoTac").click(function () {
        tthai_vu_tt = "xem";
        $("#btnThemMoiVuTonThat").removeAttr("disabled");
        $("#btnXoaDienBienTonThat").show();
        $("#btnHuyThaoTac").hide();
        _frmDienBienTonThat.clearErrorMessage();
        var dsVuTT = ho_so_chi_tiet.data_info.dien_bien;
        dsVuTT = dsVuTT.removeItem(n => n.vu_tt === undefined);
        showDsVuTonThat(ho_so_chi_tiet.data_info.dien_bien);
        if (ho_so_chi_tiet.data_info.dien_bien.length > 0) {
            xemChiTietVuTonThat(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
            setStyleVuTTSelect(ho_so_chi_tiet.data_info.dien_bien[0].vu_tt);
        } else {
            $("#btnThemMoiVuTonThat").trigger("click");
        }

    });
    $("#btnThemMoiThongTinGiamDinh").click(function () {
        tthai_lan_gd = "them_moi";
        $("#btnHuyThaoTacGiamDinh").addClass("d-none");
        var dsLanGD = ho_so_chi_tiet.data_info.lan_gd;
        if (dsLanGD.where(n => n.lan_gd === undefined).length <= 0) {
            fillDataBenThamGiaGiamDinh([]);
            ho_so_chi_tiet.data_info.lan_gd.push({ gio_gd: "", ngay_gd: "//", so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            showDsLanGD(ho_so_chi_tiet.data_info.lan_gd);
            var so_id = _frmThongTinGiamDinh.getControl("so_id").val();
            var doi_tuong_gd = _frmThongTinGiamDinh.getControl("doi_tuong_gd").attr("data-val");
            var doi_tuong_gd_ten = _frmThongTinGiamDinh.getControl("doi_tuong_gd").val();
            _frmThongTinGiamDinh.resetForm();
            _frmThongTinGiamDinh.getControl("doi_tuong_gd").attr("data-val", doi_tuong_gd);
            _frmThongTinGiamDinh.getControl("doi_tuong_gd").val(doi_tuong_gd_ten);

            _frmThongTinGiamDinh.getControl("trang_thai").setValue("M");
            _frmThongTinGiamDinh.getControl("dvi_gdinh").setValue("");
            _frmThongTinGiamDinh.getControl("dvi_gdinh").trigger("select2:select");
            _frmThongTinGiamDinh.getControl("so_id").val(so_id);
            _frmThongTinGiamDinh.getControl("gio_gd").val(new Date().HHmmAddMinutes(10));
            _frmThongTinGiamDinh.getControl("ngay_gd").val(dateNow);
            _frmThongTinGiamDinh.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmThongTinGiamDinh.getControl("phuong_xa").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmThongTinGiamDinh.getControl("ma_gdv").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
            setStyleLanGDSelect("");
            $("#btnThemMoiThongTinGiamDinh").addClass("d-none");
            $("#btnLuuThongTinGiamDinh").removeClass("d-none");
            if (dsLanGD.where(n => n.lan_gd !== undefined).length > 0) {
                $("#btnHuyThaoTacGiamDinh").removeClass("d-none");
            }
        }
    });
    $("#btnHuyThaoTacGiamDinh").click(function () {
        tthai_lan_gd = "xem";
        ho_so_chi_tiet.data_info.lan_gd = ho_so_chi_tiet.data_info.lan_gd.removeItem(n => n.lan_gd === undefined);
        showDsLanGD(ho_so_chi_tiet.data_info.lan_gd);
        if (ho_so_chi_tiet.data_info.lan_gd.length > 0) {
            var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.max(n => n.lan_gd);
            xemChiTietLanGD(lan_gd_max);
            setStyleLanGDSelect(lan_gd_max);
            anHienNutFormLanGiamDinh(lan_gd_max);
        } else {
            $("#btnThemMoiThongTinGiamDinh").trigger("click");
        }
    });
    $("#btnSuaThongTinNguoiThongBao").click(function () {
        bindDataThongTinNguoiLienHe();
    });
    $("#btnLuuThongTinNguoiLienHe").click(function () {
        suaThongTinNguoiThongBao();
    });
    $("#btnSuaThongTinXeTonThat").click(function () {
        _frmCarClaimCarSearch.resetForm();
        _frmCarClaimCarSearch.clearErrorMessage();
        ESUtil.genHTML("modalCarSearchDsGCNTemplate", "modalCarSearchDsGCN", { data_info: [] });
        _frmCarClaimCustomerInfo.resetForm();
        _frmCarClaimCustomerInfo.clearErrorMessage();
        var obj = ESUtil.cloneObject(ho_so_chi_tiet.data_info.ho_so);
        var ngay_tb_tmp = obj.ngay_tb.split(" ");
        obj.ngay_tb = ngay_tb_tmp[0].dateToNumber();
        obj.gio_tb = ngay_tb_tmp[1];
        _frmCarClaimCustomerInfo.setData(obj);
        _navTabTimKiemXe.showTab("tabTimKiemXe");
        navTimKiemXe('TIMKIEM');
        _frmCarClaimCarSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmCarClaimCarSearch.getControl("ma_doi_tac").trigger("select2:select");
        var ngay_xr = ho_so_chi_tiet.data_info.ho_so.ngay_xr;
        if (ngay_xr != undefined && ngay_xr != null && ngay_xr != "") {
            ngay_xr = ngay_xr.split(" ")[0];
            _frmCarClaimCarSearch.getControl("ngay_xr").setValue(ngay_xr);
        }

        _frmCarClaimCustomerInfo.getControl('nguon_tb').attr('readonly', 'readonly');
        _frmCarClaimCustomerInfo.getControl('hien_truong').attr('readonly', 'readonly');
        _frmCarClaimCustomerInfo.getControl('gio_tb').prop('readonly', true);
        _frmCarClaimCustomerInfo.getControl('ngay_tb').prop('readonly', true);
        _modalCarSearch.show();
    });
    $("#btnXemThongTinChungNhan").click(function () {
        $('#table_uoc_ton_that').hide();
        $('#btnLuuUocLaySoHS').hide();
        $('#btnLaySoHS').hide();
        $("#btnSuaGCN").show();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh_ql: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            pm: "GD",
            nv: "XE"
        };
        _service.layThongTinTinhTrangThanhToan(obj).then(res_tt => {
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
    });
    $("#btnChuyenNguoiXuLy").click(function () {
        bindDataChuyenNguoiXuLy(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalChuyenNguoiXuLy.show();
    });
    $("#btnChuyenGDVHT").click(function () {
        bindDataChuyenNguoiXuLyGDVHT(
            "CHUYEN_GDVHT",
            ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ho_so_chi_tiet.data_info.ho_so.so_id,
            _frmThongTinGiamDinh.getControl("lan_gd").val()
        );
        _modalChuyenNguoiXuLyGDVHT.setTitle("Chuyển GĐV hiện trường");
        _modalChuyenNguoiXuLyGDVHT.show();
    });
    $("#btnPhanCongGDVHT").click(function () {
        var tinh_thanh = _frmThongTinGiamDinh.getControl("tinh_thanh").val();
        var quan_huyen = _frmThongTinGiamDinh.getControl("quan_huyen").val();
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

        //bindDataChuyenNguoiXuLyGDVHT(
        //    "PHAN_CONG_GDVHT",
        //    ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        //    ho_so_chi_tiet.data_info.ho_so.so_id,
        //    _frmThongTinGiamDinh.getControl("lan_gd").val()
        //);
        //_modalChuyenNguoiXuLyGDVHT.setTitle("Phân công GĐV hiện trường");
        //_modalChuyenNguoiXuLyGDVHT.show();
    });
    $("#btnXemDiaBanGiamDinh").click(function () {
        var tinh_thanh = _frmThongTinGiamDinh.getControl("tinh_thanh").val();
        var quan_huyen = _frmThongTinGiamDinh.getControl("quan_huyen").val();
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
    $("#btnLuuChuyenNguoiXuLy").click(function () {
        _notifyService.confirm("Bạn có chắc chắn chuyển hồ sơ ?", "", val => {
            if (_frmChuyenNguoiXuLy.isValid()) {
                var obj = _frmChuyenNguoiXuLy.getJsonData();
                obj.pm = CONSTANT_PM;
                _service.chuyenNguoiXuLy(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh = obj.ma_chi_nhanh_moi;
                    ho_so_chi_tiet.data_info.ho_so.nsd = obj.nsd_moi;
                    _modalChuyenNguoiXuLy.hide();
                    _notifyService.success("Chuyển người xử lý thành công");
                    getPaging(1);
                });
            }
        })
    });
    $("#btnLuuChuyenNguoiXuLyGDVHT").click(function () {
        _notifyService.confirm("Bạn có chắc chắn chuyển giám định viên hiện trường này không? ?", "", val => {
            if (_frmChuyenNguoiXuLyGDVHT.isValid()) {
                var obj = _frmChuyenNguoiXuLyGDVHT.getJsonData();
                obj.nv = 'XE';
                _service.chuyenNguoiXuLyGDVHT(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    var lan_gd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd == obj.lan_gd).firstOrDefault();
                    lan_gd.dvi_gdinh = obj.ma_chi_nhanh_moi;
                    lan_gd.ma_gdv = obj.nsd_moi;
                    _modalChuyenNguoiXuLyGDVHT.hide();
                    xemChiTietLanGD(obj.lan_gd);
                    if (obj.hanh_dong == "CHUYEN_GDVHT") {
                        _notifyService.success("Chuyển GĐV hiện trường thành công");
                    }
                    if (obj.hanh_dong == "PHAN_CONG_GDVHT") {
                        _notifyService.success("Phân công GĐV hiện trường thành công");
                    }
                    getPaging(1);
                });
            }
        })
    });
    $("#btnHuyHoSo").click(function () {
        _frmHuyHoSo.getControl("ma_doi_tac").val(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
        _frmHuyHoSo.getControl("so_id").val(ho_so_chi_tiet.data_info.ho_so.so_id);
        _frmHuyHoSo.getControl("nd").val("");
        _modalHuyHoSo.show();
    });
    $("#btnLuuHuyHoSo").click(function () {
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
                    });
                    ganTrangThaiHoSo(res);
                    _notifyService.success("Hủy hồ sơ thành công");
                    _modalHuyHoSo.hide();
                    getPaging(1);
                });
            });
        }
    });
    $("#btnGoHuyHoSo").click(function () {
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
                });
                ganTrangThaiHoSo(res);
                _notifyService.success("Gỡ hủy hồ sơ thành công");
                getPaging(1);
            });
        });
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
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", index, val => {
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
    $("#btnPhanLoaiTonThat").click(function () {
        phanLoaiAnh(() => {
            _modalThemHMTT.show();
        });
    });
    $("#btnLuuHMTT").click(function () {
        luuPhanHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanHangMuc(() => {
            _modalThemHMTT.hide();
        });
    });
    $("#btnGuiEmailGiamDinhVien").click(function () {
        _service.guiEmailGiamDinhVien({}).then(res => { });
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
                if (extension === ".xml") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/xml");
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
    $("#btnInDGHT").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
            { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
            { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
            { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" }
        ];
        var ma_mau_in_hthi = "ESCS_BBGD_HIEN_TRUONG";
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_XE_TB_TON_THAT", ten: "OPES - Thông báo tổn thất và yêu cầu bồi thường" },
                { ma: "OPES_BCGD", ten: "OPES - Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "OPES - Biên bản xác minh hiện trường" },//OPES_XE_BBXMHT
                { ma: "OPES_XE_TO_TRINH_THUE_GD", ten: "OPES - Tờ trình thuê giám định" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "OPES - Biên bản giám định tổn thất" }, //OPES_XE_BBGD_XCG
                { ma: "OPES_TRUNG_CAU_CONG_AN", ten: "OPES - Trưng cầu công an" },
                { ma: "OPES_TONG_HOP_KQ_GD_XCG", ten: "OPES - Bản tổng hợp giám định XCG" },
                { ma: "OPES_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN", ten: "OPES - Giấy giao nhận kiêm phiếu hẹn" }
            ];
            ma_mau_in_hthi = "ESCS_BBGD_HIEN_TRUONG";//OPES_XE_BBXMHT
        }
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
        _modalDocumentService.show(ma_mau_in_hthi);
    });
    $("#btnInBCGD").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
            { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
            { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
            { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" }
        ];
        var ma_mau_in_hthi = "ESCS_BCGD";
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_XE_TB_TON_THAT", ten: "OPES - Thông báo tổn thất và yêu cầu bồi thường" },
                { ma: "OPES_BCGD", ten: "OPES - Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "OPES - Biên bản xác minh hiện trường" },//OPES_XE_BBXMHT
                { ma: "OPES_XE_TO_TRINH_THUE_GD", ten: "OPES - Tờ trình thuê giám định" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "OPES - Biên bản giám định tổn thất" },//OPES_XE_BBGD_XCG
                { ma: "OPES_TRUNG_CAU_CONG_AN", ten: "OPES - Trưng cầu công an" },
                { ma: "OPES_TONG_HOP_KQ_GD_XCG", ten: "OPES - Bản tổng hợp giám định XCG" },
                { ma: "OPES_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN", ten: "OPES - Giấy giao nhận kiêm phiếu hẹn" }
            ];
            ma_mau_in_hthi = "OPES_BCGD";
        }
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
        _modalDocumentService.show(ma_mau_in_hthi);
    });
    $("#btnIn").bind("click", function () {
        var sourceMauIn = [
            { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
            { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
            { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
            { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" },
            { ma: "ESCS_TO_TRINH_TU_CHOI_BT", ten: "Tờ trình từ chối bồi thường" },
            { ma: "ESCS_TB_TU_CHOI_TB", ten: "Thông báo từ chối bồi thường" }
        ];
        var ma_mau_in_hthi = "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG";
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_XE_TB_TON_THAT", ten: "OPES - Thông báo tổn thất và yêu cầu bồi thường" },
                { ma: "OPES_BCGD", ten: "OPES - Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "OPES - Biên bản xác minh hiện trường" },//OPES_XE_BBXMHT
                { ma: "OPES_XE_TO_TRINH_THUE_GD", ten: "OPES - Tờ trình thuê giám định" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "OPES - Biên bản giám định tổn thất" },//OPES_XE_BBGD_XCG
                { ma: "OPES_TRUNG_CAU_CONG_AN", ten: "OPES - Trưng cầu công an" },
                { ma: "OPES_TONG_HOP_KQ_GD_XCG", ten: "OPES - Bản tổng hợp giám định XCG" },
                { ma: "OPES_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN", ten: "OPES - Giấy giao nhận kiêm phiếu hẹn" },
                { ma: "OPES_TO_TRINH_TU_CHOI_BT", ten: "OPES - Tờ trình từ chối bồi thường" },
                { ma: "OPES_TB_TU_CHOI_TB", ten: "OPES - Thông báo từ chối bồi thường" }
            ];
            ma_mau_in_hthi = "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG";//OPES_XE_BBGD_XCG
        }
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
        _modalDocumentService.show(ma_mau_in_hthi);
    });
    $("#btnInTBGD").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
            { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
            { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
            { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" }
        ];
        if (ESCS_MA_DOI_TAC == "PJICO") {
            sourceMauIn = [
                { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
                { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" },
                { ma: "PJICO_XAC_NHAN_AN_CHI", ten: "[PJICO] - Xác nhận ấn chỉ" }
            ];
        }
        var ma_mau_in_hthi = "ESCS_BCGD";
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_XE_TB_TON_THAT", ten: "OPES - Thông báo tổn thất và yêu cầu bồi thường" },
                { ma: "OPES_BCGD", ten: "OPES - Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "OPES - Biên bản xác minh hiện trường" },//OPES_XE_BBXMHT
                { ma: "OPES_XE_TO_TRINH_THUE_GD", ten: "OPES - Tờ trình thuê giám định" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "OPES - Biên bản giám định tổn thất" },//OPES_XE_BBGD_XCG
                { ma: "OPES_TRUNG_CAU_CONG_AN", ten: "OPES - Trưng cầu công an" },
                { ma: "OPES_TONG_HOP_KQ_GD_XCG", ten: "OPES - Bản tổng hợp giám định XCG" },
                { ma: "OPES_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN", ten: "OPES - Giấy giao nhận kiêm phiếu hẹn" }
            ];
            ma_mau_in_hthi = "OPES_BCGD";
        }
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
        _modalDocumentService.show(ma_mau_in_hthi);
    });
    $("#btnXuatExcel").click(function () {
        var obj = _frmTimKiemHoSo.getJsonData();
        obj.ma_mau_in = "ESCS_BC_BT_XE_GIAM_DINH";
        new Service().getFile("/common/ExportExcel", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnHuyDuyetBCGD, #btnModalHuyDuyetBCGD").click(function () {
        _notifyService.confirm("Bạn có muốn hủy duyệt báo cáo giám định?", index, val => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = CONSTANT_PM;
            obj.remove_file = "ESCS_BCGD";
            if (ESCS_MA_DOI_TAC == "OPES") {
                obj.remove_file = "OPES_BCGD";
            }

            _service.huyDuyetBaoCaoGD(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    return;
                }
                _service.layThongTinChiTietHoSo(obj).then(res => {
                    ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                    $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    ganTrangThaiHoSo(res);
                });
                _notifyService.success("Hủy biên báo cáo giám định thành công");
                getPaging(1);
            });
        });
    });
    $("#btnHuyDuyetBBGD").click(function () {
        _notifyService.confirm("Bạn có muốn hủy duyệt biên bản giám định?", index, val => {
            var obj = _frmThongTinGiamDinh.getJsonData();

            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.remove_file = "ESCS_BBGD";
            obj.pm = CONSTANT_PM;
            if (ESCS_MA_DOI_TAC == "OPES") {
                obj.remove_file = "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG";//OPES_XE_BBGD_XCG
            }
            _service.huyDuyetBienBanGiamDinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    return;
                }
                _service.layThongTinChiTietHoSo(obj).then(res => {
                    ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                    $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    ganTrangThaiHoSo(res);
                });
                _notifyService.success("Hủy biên bản giám định thành công");
                getPaging(1);
            });
        });
    });
    $("#btnDuyetBCGD, #btnModalDuyetBCGD").click(function () {
        _notifyService.confirm("Bạn có muốn duyệt báo cáo giám định?", "", type => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = CONSTANT_PM;

            obj.create_file_sign = "ESCS_BCGD";
            obj.remove_file = "ESCS_BCGD";
            if (ESCS_MA_DOI_TAC == "OPES") {
                obj.remove_file = "OPES_BCGD";
            }

            _service.duyetBaoCaoGD(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layThongTinChiTietHoSo(obj).then(res => {
                    ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                    $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    ganTrangThaiHoSo(res);
                });
                _notifyService.success("Duyệt báo cáo giám định thành công");
                getPaging(1);
            });
        });
    });
    $("#btnDuyetgiamdinh").click(function () {
        _notifyService.confirmApprove("Bạn có muốn duyệt biên bản giám định?", type => {
            var obj = _frmThongTinGiamDinh.getJsonData();

            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = CONSTANT_PM;
            obj.gui_email = type == "PHE_DUYET_VA_GUI_EMAIL" ? "C" : "K";
            obj.ma_email = "TEMPLATE_EMAIL_BBGD";
            obj.create_file = "ESCS_TBTN";
            obj.create_file_sign = "ESCS_BBGD";
            obj.remove_file = "ESCS_TBTN,ESCS_BBGD";

            _service.duyetBienBanGiamDinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layThongTinChiTietHoSo(obj).then(res => {
                    ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                    $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    ganTrangThaiHoSo(res);
                });
                _notifyService.success("Duyệt biên bản giám định thành công");
                getPaging(1);
            });
        });
    });
    $("#btnHuyKetthucgiamdinh").click(function () {
        _notifyService.confirm("Bạn có muốn hủy kết thúc giám định?", index, val => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            _service.huyKetThucGiamDinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    $("#btnLapPhuongAnGia").addClass("d-none");
                    $("#btnLapPASC").addClass("d-none");
                    $("#btnThemChiPhiKhac").addClass("d-none");
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
                    }
                    ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                    ganTrangThaiHoSo(res);
                });

                _notifyService.success("Hủy kết thúc giám định thành công");
                getPaging(1);
            });
        });
    });
    $("#btnKetthucgiamdinh").click(function () {
        var objCheck = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        };
        _service.ktraHoSoDuyetGiaTuDong(objCheck).then(resCheck => {
            if (resCheck.state_info.status !== "OK") {
                _notifyService.error(resCheck.state_info.message_body);
                return;
            }
            var thong_bao = "Kết thúc hồ sơ giám định đồng nghĩa với khách hàng đã xác nhận biên bản giám định";
            var xac_nhan = ho_so_chi_tiet.data_info.xac_nhan.where(n => n.ma == "BBGD").firstOrDefault();
            if (xac_nhan != null) {
                if (xac_nhan.ngay_xac_nhan < 30000101) {
                    thong_bao = "Bạn có muốn cho phép kết thúc giám định?";
                }
            }
            $("#gd_duyet_gia_tu_dong").prop("checked", false);

            _notifyService.ketThucGiamDinh(thong_bao, () => {
                $(".gd_duyet_gia_tu_dong").addClass("d-none");
                if (resCheck.data_info.dkien_ap_dung == "D") {
                    $(".gd_duyet_gia_tu_dong").removeClass("d-none");
                }
            }, type => {
                var checked = $("#gd_duyet_gia_tu_dong").is(":checked");
                var obj = _frmThongTinGiamDinh.getJsonData();
                obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
                obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
                obj.duyet_gia_tu_dong = (checked && resCheck.data_info.dkien_ap_dung == "D") ? "C" : "K";

                _service.ketThucGiamDinh(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    if (type == "KET_THUC_CHUYEN") {
                        TransCompensationDisplay();
                    }
                    if (type == "KET_THUC") {
                        var ds_lan_gd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined);
                        for (var i = 0; i < ds_lan_gd.length; i++) {
                            ds_lan_gd[i].trang_thai = 'K';
                            ds_lan_gd[i].trang_thai_lich = 'K';
                        }

                        var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                        _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                            ho_so_chi_tiet = resDetail;
                            if (ho_so_chi_tiet.data_info.ho_so.gdv_bao_gia == "C" && ho_so_chi_tiet.data_info.ho_so.ngay_ket_thuc_gd < 30000101) {
                                $("#btnLapPhuongAnGia").removeClass("d-none");
                                $("#btnLapPASC").removeClass("d-none");
                                $("#btnThemChiPhiKhac").removeClass("d-none");
                            }
                            ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                            ganTrangThaiHoSo(res);
                            anHienNutDuyet(res.out_value.phan_cap);
                            $("#btnKetthucLanGiamDinh").addClass("d-none");
                            $("#btnKetthucLanGiamDinhStep2").addClass("d-none");
                        });
                        _notifyService.success("Kết thúc giám định thành công");
                        getPaging(1);
                    }
                });
            });
        });
    });
    $("#btnChuyenboithuong").click(function () {
        _notifyService.confirmEmail("Bạn có muốn chuyển hồ sơ sang bộ phận bồi thường?", type => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = CONSTANT_PM;
            obj.gui_email = type == "CHUYEN_VA_GUI_MAIL" ? "C" : "K";
            _service.chuyenBoiThuong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ganTrangThaiHoSo(res);
                _notifyService.success("Chuyển hồ sơ thành công");
                getPaging(1);
            });
        });
    });
    $("#btnHuyChuyenboithuong").click(function () {
        _notifyService.confirm("Bạn có muốn lấy lại hồ sơ về giám định ?", index, val => {
            var obj = _frmThongTinGiamDinh.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.pm = CONSTANT_PM;

            _service.huyChuyenBoiThuong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Hủy chuyển hồ sơ thành công");
                _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                    ho_so_chi_tiet.data_info.ho_so = resDetail.data_info.ho_so;
                    $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    ganTrangThaiHoSo(resDetail);
                    ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                });
                getPaging(1);
            });
        });
    });
    $("#btnHuyTrinhDuyet").click(function () {
        xoaTrinhDuyet();
        getPaging(1);
    });
    $("#btnTrinhphancapBCGD, #btnModalTrinhphancapBCGD").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            loai_trinh: "XE_TRINH_DUYET_BAO_CAO_GD",
            nghiep_vu: "XE",
            create_file: "ESCS_BCGD",
            remove_file: "ESCS_BCGD",
            pm: CONSTANT_PM
        }
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.create_file = "OPES_BCGD";
            obj.remove_file = "OPES_BCGD";
        }
        _modalTrinhDuyetService.show(obj, (type, res) => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _service.layThongTinChiTietHoSo(obj).then(res => {
                ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                ganTrangThaiHoSo(res);
            });
            getPaging(1);
        });
    });
    $("#btnTrinhphancap").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            loai_trinh: "XE_TRINH_DUYET_GIAM_DINH",
            nghiep_vu: "XE",
            create_file: "ESCS_BBGD",
            remove_file: "ESCS_BBGD",
            pm: CONSTANT_PM
        }
        obj.ma = "TEMPLATE_MAIL_TRINH_GD";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
            var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
            if (trang_thai != null) {
                ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
            }
            $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
            ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
        });
    });
    $("#btnHangMucKetThucGiamDinh").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnHangMucTrinhPhanCap").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnHangMucChuyenHoSo").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnHangMucInAn").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnTTChungKetThucGiamDinh").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnTTChungTrinhPhanCap").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnTTChungChuyenHoSo").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnTTChungInAn").click(function () {
        _notifyService.error("Chưa thực hiện chức năng");
    });
    $("#btnLuuAddLicenseInfo").click(function () {
        if (_frmAddLicenseInfo.isValid()) {
            var json = _frmAddLicenseInfo.getJsonData();
            json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            _service.bsThongTinBangLaiXe(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (ho_so_chi_tiet.data_info.dien_bien !== null) {
                    for (var i = 0; i < ho_so_chi_tiet.data_info.dien_bien.length; i++) {
                        if (ho_so_chi_tiet.data_info.dien_bien[i].vu_tt.toString() === json.vu_tt.toString()) {
                            ho_so_chi_tiet.data_info.dien_bien[i].ten_lxe = json.ten_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].dthoai_lxe = json.dthoai_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].email_lxe = json.email_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_so = json.gplx_so;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_hang = json.gplx_hang;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_hieu_luc = json.gplx_hieu_luc.numberToDate();
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_het_han = json.gplx_het_han.numberToDate();
                        }
                    }
                }

                _notifyService.success("Bổ sung thông tin thành công");
            });
        }
    });
    $("#btnLuuAddRegistryInfo").click(function () {
        if (_frmAddRegistryInfo.isValid()) {
            var json = _frmAddRegistryInfo.getJsonData();
            json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            _service.bsThongTinDangKiemXe(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (ho_so_chi_tiet.data_info.dien_bien !== null) {
                    for (var i = 0; i < ho_so_chi_tiet.data_info.dien_bien.length; i++) {
                        if (ho_so_chi_tiet.data_info.dien_bien[i].vu_tt.toString() === json.vu_tt.toString()) {
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_so = json.dangkiem_so;
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_hieu_luc = json.dangkiem_hieu_luc.numberToDate();
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_het_han = json.dangkiem_het_han.numberToDate();
                        }
                    }
                }
                _notifyService.success("Bổ sung thông tin thành công");
            });
        }
    });
    $("#btnFormBsTTBangLaiXe").click(function () {
        loadFormBsThongTinBangLaiXe();
        _popoverAddLicenseInfo.show();
    });
    $("#btnFormBsTTDangKiem").click(function () {
        loadFormBsThongTinDangKiem();
        _popoverAddRegistryInfo.show();
    });
    $("#btnTKiemGara").click(function () {
        _modalGaraList.show();
    });
    $("#btnModalGaraListSearch").click(function () {
        var obj = _frmTKiemGara.getJsonData();
        if (obj === undefined || obj === null) {
            _notifyService.error("Bạn chưa nhập thông tin tìm kiếm");
            return;
        }
        if ((obj.tinh_thanh === undefined || obj.tinh_thanh === null || obj.tinh_thanh === "") &&
            (obj.quan_huyen === undefined || obj.quan_huyen === null || obj.quan_huyen === "") &&
            (obj.ten === undefined || obj.ten === null || obj.ten === "")) {
            _notifyService.error("Bạn chưa nhập thông tin tìm kiếm");
            return;
        }
        obj.tinh_thanh = (obj.tinh_thanh === undefined || obj.tinh_thanh === null) ? "" : obj.tinh_thanh;
        obj.quan_huyen = (obj.quan_huyen === undefined || obj.quan_huyen === null) ? "" : obj.quan_huyen;
        obj.ten = (obj.ten === undefined || obj.ten === null) ? "" : obj.ten;
        var garas = objDanhMuc.gara.where(n => (obj.tinh_thanh === "" || n.tinh_thanh === obj.tinh_thanh) && (obj.quan_huyen === "" || n.quan_huyen === obj.quan_huyen) && (obj.ten === "" || n.ten.toLowerCase().indexOf(obj.ten.toLowerCase()) !== -1));
        ESUtil.genHTML("templateTimKiemGara", "bodyTableTKiemGara", { ds_gara: garas });

    });
    $("#btnChonGara").click(function () {
        var count = $(".input-tkiem-gara:checked").length;
        if (count <= 0) {
            _notifyService.error("Bạn chưa chọn gara");
            return;
        }
        var val = $(".input-tkiem-gara:checked").first().val();
        if (val === null || val === "") {
            _notifyService.error("Không xác định được mã gara");
            return;
        }
        _frmDanhGiaTonThat.getControl("gara").setValue(val);
        _modalGaraList.hide();
    });
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
    $("#btnTrinhTuChoiBT").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            loai_trinh: "XE_TRINH_DUYET_TU_CHOI",
            nghiep_vu: "XE",
            create_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            remove_file: "ESCS_TO_TRINH_TU_CHOI_BT",
            pm: CONSTANT_PM
        }
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.create_file = "OPES_TO_TRINH_TU_CHOI_BT";
            obj.remove_file = "OPES_TO_TRINH_TU_CHOI_BT";
        }
        _modalTrinhDuyetService.show(obj, (type, res) => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _service.layThongTinChiTietHoSo(obj).then(res => {
                ho_so_chi_tiet.data_info.ho_so = res.data_info.ho_so;
                $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                ganTrangThaiHoSo(res);
            });
            getPaging(1);
        });
    });
    $("#btnXoaInputHangMuc").click(function () {
        _frmThemHMTT.getControl("hang_muc").val("");
        _frmThemHMTT.getControl("hang_muc").attr("data-val", "");
    });
    $("#btnChonGDV").click(function () {
        if (gdv_chon === null) {
            _notifyService.error("Bạn chưa chọn giám định viên");
            return;
        }
        _frmThongTinGiamDinh.getControl("dvi_gdinh").setValue(gdv_chon.ma_chi_nhanh);
        _frmThongTinGiamDinh.getControl("dvi_gdinh").trigger("select2:select");
        _frmThongTinGiamDinh.getControl("ma_gdv").setValue(gdv_chon.ma_gdv);
        _modalXemDiaBanGiamDinh.hide();
    });
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.hasClass('disabled')) {
            return false;
        }
    });
    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $("form[name='frmThemHMTT'] select[name='thay_the_sc'],form[name='frmThemHMTT'] select[name='chinh_hang'],form[name='frmThemHMTT'] select[name='vu_tt']").on("select2:select", function () {
        layChiPhiTuDong();
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
    $("#btnTroChuyenGiamDinhVien").click(function () {
        var ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        var so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        var dvi_giam_dinh = _frmThongTinGiamDinh.getControl("dvi_gdinh").val();
        var ma_gdv = _frmThongTinGiamDinh.getControl("ma_gdv").val();
        if (dvi_giam_dinh == "" || ma_gdv == "") {
            _notifyService.error("Không xác định được giám định viên");
            return;
        }
        var cb = objDanhMuc.can_bo.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh == dvi_giam_dinh && n.ma == ma_gdv).firstOrDefault();
        chatGiamDinhVien(ma_doi_tac, so_id, dvi_giam_dinh, ma_gdv, cb.ten);
    });
    $("#btnGuiEmail").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'GD',
            /*loai: "TEMPLATE_EMAIL_TBGD"*/
        });
    });
    $("#btnGuiMailBBGD").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'GD',
            loai: "TEMPLATE_EMAIL_BBGD"
        });
    });
    $("#btnThemTNDS").click(function () {
        var obj = {};
        ESUtil.appendHTML("modalThemTNDS_template", "modalThemTNDS_body", { lstTNDS: obj }, () => {
            var hang_muc = _frmThemTNDS.getControl("hang_muc").val();
            if (hang_muc == "NGUOI" || hang_muc == "TN_NGUOI") {
                $("#modalThemTNDS_body input.sl").attr("readonly", "readonly");
            }
            if (hang_muc == "TAI_SAN" || hang_muc == "TN_TAI_SAN") {
                $("#modalThemTNDS_body input.sl").removeAttr("readonly");
            }
        });
        $('select.select2').select2();
        $(".remove_config").click(function () {
            _notifyService.confirm("Bạn có chắc chắn muốn xóa đối tượng này không?", "", () => {
                $(this).closest("tr").remove();
            });
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
    $("#btnLuuTNDS").click(function () {
        var otArr = [];
        $('#tblCauHinhTNDS tbody tr').each(function (e) {
            var json = { ten: "", dchi: "", sl: "", tinh_trang: "", tien_tthat: "", ghi_chu: "", thuong_tat: "", tien: 0, tien_duyet: 0, pttt: 0 };
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
            loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            _modalThemChiTietTNDS.hide();
            getPaging(1);
        });
    });
    $("#btnLuuTNDSNguoi").click(function () {
        var otArr = [];
        $('#tblCauHinhTNDSNguoi tbody tr').each(function (e) {
            var json = { ten: "", dchi: "", sl: "", tinh_trang: "", tien_tthat: "", ghi_chu: "", tien: 0, tien_duyet: 0, pttt: 0 };
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
                    if ($(this).hasClass("ghi_chu")) {
                        json["ghi_chu"] = $(this).val();
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
            loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id });
            _modalThemChiTietTNDSNguoi.hide();
            getPaging(1);
        });
    });
    $("#btnNhanHoSoTuCCCT").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn nhận hồ sơ này không?", "", val => {
            _service.nhanHoSo({
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.data_info.ho_so.ma_trang_thai = res.out_value.trang_thai_out;
                ho_so_chi_tiet.data_info.ho_so.ngay = new Date().ddmmyyyy().dateToNumber();
                var trang_thai = objDanhMuc.ds_trang_thai.where(n => n.ma_trang_thai == res.out_value.trang_thai_out).firstOrDefault();
                if (trang_thai != null) {
                    ho_so_chi_tiet.data_info.ho_so.trang_thai = trang_thai.ten;
                    ho_so_chi_tiet.data_info.ho_so.ngay = new Date().ddmmyyyy().dateToNumber();
                }
                $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                ESUtil.anHienControl(arrTrangThai, ho_so_chi_tiet.data_info.ho_so);
                _notifyService.success("Nhận hồ sơ thành công.");
            });
        });
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
    $("#btnXemToaDoThucTe").click(function () {
        var kinh_do = $("#btnXemToaDoThucTe").attr("data-x");
        var vi_do = $("#btnXemToaDoThucTe").attr("data-y");
        if (kinh_do == undefined) {
            kinh_do = 0
        }
        if (vi_do == undefined) {
            vi_do = 0
        }
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });
    $("#xemBanDoThongTinGiamDinh").click(function () {
        var ma_tinh = _frmThongTinGiamDinh.getControl("tinh_thanh").val();
        var ma_quan = _frmThongTinGiamDinh.getControl("quan_huyen").val();
        var ma_phuong = _frmThongTinGiamDinh.getControl("phuong_xa").val();
        var dchi_ctiet = _frmThongTinGiamDinh.getControl("dia_diem").val();
        var dia_chi = getDiaChi(ma_tinh, ma_quan, ma_phuong, dchi_ctiet);
        if (dia_chi != "") {
            _modalMap.hienThiMapTheoDiaChi(dia_chi, dia_chi);
        }
    });
    $("#btnXemViTriChupAnh").click(function () {
        var kinh_do = _frmToaDoAnh.getControl("kinh_do").val();
        var vi_do = _frmToaDoAnh.getControl("vi_do").val();
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });
    $("#btnXemViTriChupAnhPLHMNhanh").click(function () {
        var kinh_do = $("#plhm_nhanh_xem_vi_tri_anh").attr("data-x");
        var vi_do = $("#plhm_nhanh_xem_vi_tri_anh").attr("data-y");
        if (kinh_do == undefined || kinh_do == null || kinh_do == "" || kinh_do == "0" ||
            vi_do == undefined || vi_do == null || vi_do == "" || vi_do == "0") {
            _notifyService.error("Không xác định vị trí");
            return;
        }
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });
    $("#btnSoSanhDuLieu,#btnSoSanhDuLieuPLHMNhanh").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        };
        _service.soSanhDuLieuOCR(obj).then(res => {
            ESUtil.genHTML("modalCarClaimCompareDataTable_Template", "modalCarClaimCompareDataTable", { data: res.data_info });
            ESUtil.genHTML("modalCarClaimCompareData_GPLX_Template", "modalCarClaimCompareData_GPLX", res.data_info);
            ESUtil.genHTML("modalCarClaimCompareData_DANGKIEM_Template", "modalCarClaimCompareData_DANGKIEM", res.data_info);
            _modalCarClaimCompareData.show();
        });

    });
    $("#btnxemBanDoGDVHT").click(function () {
        var lan_gd_max = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined).max(n => n.lan_gd);
        var lan = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd == lan_gd_max).firstOrDefault();
        var tinh_thanh = "";
        var quan_huyen = "";
        var phuong_xa = "";
        var dia_diem = "";
        if (lan == undefined && lan == null) {
            tinh_thanh = _frmThongTinGiamDinh.getControl("tinh_thanh").val();
            quan_huyen = _frmThongTinGiamDinh.getControl("quan_huyen").val();
            phuong_xa = _frmThongTinGiamDinh.getControl("phuong_xa").val();
            dia_diem = _frmThongTinGiamDinh.getControl("dia_diem").val();
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
                    _frmThongTinGiamDinh.getControl("dvi_gdinh").setValue(ma_dvi);
                    _frmThongTinGiamDinh.getControl("dvi_gdinh").trigger("select2:select");
                    _frmThongTinGiamDinh.getControl("ma_gdv").setValue(gdv);
                    _modalMap.hide();
                });
            });
        }
    });
    $('#image_fullsreen').on('click', function () {
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        } else {
            $('#stepHinhAnhHoSo').fullscreen();
        }
    });
    $("#btnLuuYeuCauBsGiayTo").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: "XE",
            pm: CONSTANT_PM,
            arr: []
        };
        $("#bodyDsHoSoGiayTo input.input_chon_hsgt_bs:checked").each(function (el) {
            var ma_hs = $(this).val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
            obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: so_id_doi_tuong, trang_thai: 'C', hop_le: hop_le, gara_thu_ho: gara_thu_ho, loai: loai, ghi_chu: ghi_chu });
        });
        $("#bodyDsHoSoGiayTo a[data-field=trang_thai][data-val=D]").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
            obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: so_id_doi_tuong, trang_thai: 'D', hop_le: hop_le, gara_thu_ho: gara_thu_ho, loai: loai, ghi_chu: ghi_chu });
        });
        $("#bodyDsHoSoGiayTo input.input_chon_gara_thu_ho:checked").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var so_id_doi_tuong = $(this).closest('tr').find('a[data-field=so_id_doi_tuong]').attr('data-val');
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var gara_thu_ho = $(this).closest('tr').find('input.input_chon_gara_thu_ho:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
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
    $("#btnKetthucLanGiamDinh,#btnKetthucLanGiamDinhStep2").click(function () {
        var length = ho_so_chi_tiet.data_info.lan_gd.length;
        if (length > 0) {
            _notifyService.confirm("Bạn có chắc chắn muốn kết thúc lần giám định này không?", "", val => {
                var lan_gd = ho_so_chi_tiet.data_info.lan_gd.where(n => n.lan_gd != undefined).max(n => n.lan_gd);
                _service.ketThucLanGiamDinh({
                    ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                    lan_gd: lan_gd
                }).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Kết thúc lần giám định thành công");
                    $("#btnKetthucLanGiamDinh").addClass("d-none");
                    $("#btnKetthucLanGiamDinhStep2").addClass("d-none");
                    var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                    _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                        ho_so_chi_tiet = resDetail;
                        anHienNutFormLanGiamDinh(lan_gd);
                        ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                        ganTrangThaiHoSo(resDetail);
                        $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                    });
                });
            });
        } else {
            _notifyService.error("Lịch giám định chưa được tạo");
        }
    });
    $("#btnDongTyLeThuongTat").click(function () {
        _popoverTyLeThuongTat.hide();
    });
    $("#btnLuuDongTyLeThuongTat").click(function () {
        var nhom = _frmTkiemTLThuongTat.getControl("nhom").val();
        var arr_checked = $("#treeTLTT").jstree("get_checked", true);
        if (arr_checked.length <= 0) {
            _notifyService.error("Bạn chưa chọn tỷ lệ thương tật");
            return;
        }
        if (arr_checked[0].state.checkbox_disabled) {
            _notifyService.error("Vui lòng chọn thương tật có tỷ lệ.");
            return;
        }
        var data = getDataTreeTLTT();
        if (data != "" && elementDanhGia) {
            $(elementDanhGia).attr("data-val", data);
            var item = objDanhMuc.ds_tltt.where(n => n.nhom == nhom && n.id == data).firstOrDefault();
            if (item.pt_tu != null && item.pt_toi != null && item.pt_tu == item.pt_toi) {
                _frmTLThuongTatNhap.getControl("pttt").val(item.pt_tu);
                var tien = Math.round(_commonService.danhMucChung.so_tien_bh.nguoi * item.pt_tu / 100);
                _frmTLThuongTatNhap.getControl("tien").val(ESUtil.formatMoney(tien));
            }
            $(elementDanhGia).val(item.text);
        }
        else {
            $(elementDanhGia).attr("data-val", "");
            $(elementDanhGia).val("");
        }
        _popoverTyLeThuongTat.hide();
    });
    $("#btnPhanLoaiHangMuc").click(function () {
        loadHangMucTonThat({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id }, res => {
            bindPhanLoaiHangMucCT();
            ESUtil.genHTML("tbDsPhanLoaiNhanhTemplate", "tbDsPhanLoaiNhanh", { danh_sach: ho_so_chi_tiet.data_info.hang_muc }, () => {
                var tong = ho_so_chi_tiet.data_info.hang_muc.sum(n => n.gia_giam_dinh);
                $("#tbDsPhanLoaiNhanhTongCong").html(ESUtil.formatMoney(tong));

                $("#plhm_nhanh_xem_vi_tri_anh").html("Xem vị trí chụp ảnh");
                $("#plhm_nhanh_xem_vi_tri_anh").removeAttr("data-x");
                $("#plhm_nhanh_xem_vi_tri_anh").removeAttr("data-y");
                anHienPhanLoai();
            });
        });
    });
    $("#btnThoatPLHMNhanh").click(function () {
        anHienPhanLoai(false);
    });
    $("#btnLuuPhanLoaiNhanh").click(function () {
        if (!_frmPhanLoaiNhanh.isValid()) {
            return;
        }
        var obj = _frmPhanLoaiNhanh.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.pm = "GD";
        obj.tien_tu_dong = $("#plhm-tien-tu-dong").val();
        obj.tien_gd = $("#plhm-tien-gd").val();

        obj.tien_tu_dong = obj.tien_tu_dong == "" ? "0" : obj.tien_tu_dong;
        obj.tien_gd = obj.tien_gd == "" ? "0" : obj.tien_gd;
        obj.ghi_chu = "";
        obj.bt = [];
        $("#divPLHMHinhAnh .divAnhPhanLoai.active").each(function (el) {
            var bt = $(this).attr("data-bt");
            obj.bt.push(bt);
        });
        obj.hang_muc = $("#divPLHMHangMuc .plhm-hangmuc-item:checked").val();
        obj.hang_muc = obj.hang_muc || "";
        obj.muc_do = "";
        var arr_muc_do = [];
        $("#divPLHMMucDo .plhm-mucdo-item:checked").each(function (el) {
            var val = $(this).val();
            arr_muc_do.push(val);
        });
        arr_muc_do.sort((a, b) => a - b);
        obj.muc_do = arr_muc_do.join(",");
        obj.thay_the_sc = $("#plhmPAKhacPhuc input[name='plhmPASC']:checked").val();
        obj.thay_the_sc = obj.thay_the_sc || "";
        obj.chinh_hang = $("#plhmPAKhacPhuc input[name='plhmPAChinhHang']:checked").val();
        obj.chinh_hang = obj.chinh_hang || "";
        obj.thu_hoi = $("#plhmPAKhacPhuc input[name='plhmPAThuHoi']:checked").val();
        obj.thu_hoi = obj.thu_hoi || "";
        if (obj.bt == undefined || obj.bt == null || obj.bt.length <= 0) {
            _notifyService.error("Bạn chưa chọn tài liệu phân loại");
            return;
        }
        if (obj.hang_muc == "") {
            _notifyService.error("Bạn chưa chọn hạng mục tổn thất");
            return;
        }
        if (obj.loai == "TT" && obj.muc_do == "") {
            _notifyService.error("Bạn chưa chọn mức độ tổn thất");
            return;
        }
        luuPhanLoaiNhanh(obj, res => {
            $("#plhm_nhanh_xem_vi_tri_anh").html("Xem vị trí chụp ảnh");
            $("#plhm_nhanh_xem_vi_tri_anh").removeAttr("data-x");
            $("#plhm_nhanh_xem_vi_tri_anh").removeAttr("data-y");
            anHienXemAnhPhanLoaiNhanh(false);
        });
    });
    $("#inputPLHMTKiemHangMuc").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val();
        if (tim == "") {
            anHienDanhMucPhanLoaiNhanh("LOAI");
            return;
        }
        tim = tim.toLowerCase();
        var nv = ho_so_chi_tiet.data_info.ho_so.ma_nv;
        var source = JSON.parse(JSON.stringify(objDanhMuc.hang_muc_xe));
        var objForm = _frmPhanLoaiNhanh.getJsonData();
        if (objForm.loai == "TT") {
            var doi_tuong = null;
            if (objForm.lh_nv.trim() != "") {
                doi_tuong = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == objForm.lh_nv.trim()).firstOrDefault().doi_tuong;
            }
            if (doi_tuong == null || doi_tuong == DOI_TUONG_TT.XE) {
                source = source.where(n => n.loai == "CHINH");
            }
            if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                source = source.where(n => n.loai == "HANG_HOA");
            }
            if (nv == "TN" && doi_tuong == DOI_TUONG_TT.NGUOI) {
                source = source.where(n => n.loai == "NNTX");
            }
            if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                source = source.where(n => n.loai == "TNDS_TS");
            }
            if (nv == "BB" && doi_tuong == DOI_TUONG_TT.NGUOI) {
                source = source.where(n => n.loai == "TNDS_NG");

            }
        }
        if (objForm.loai == "TC") {
            source = source.where(n => n.loai == "TOAN_CANH");
        }
        if (objForm.loai == "TL") {
            source = source.where(n => n.loai == "TAI_LIEU");
        }
        if (tim != "") {
            var source = source.where(n => n.ten.toLowerCase().includes(tim));
            $("#divPLHMHangMuc .div-plhm-hangmuc-item").addClass("d-none");
            for (var i = 0; i < source.length; i++) {
                $("#divPLHMHangMuc #div-plhm-hangmuc-item-" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputPLHMTKiemMucDo").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val();
        if (tim == "") {
            $("#divPLHMMucDo .div-plhm-mucdo-item").show();
            anHienDanhMucPhanLoaiNhanh("LHNV");
            return;
        }
        tim = tim.toLowerCase();
        var source = JSON.parse(JSON.stringify(objDanhMuc.muc_do_ton_that));
        if (tim != "") {
            var source = source.where(n => n.ten.toLowerCase().includes(tim));
            $("#divPLHMMucDo .div-plhm-mucdo-item").hide();
            for (var i = 0; i < source.length; i++) {
                $("#divPLHMMucDo .div-plhm-mucdo-item[plhm-div-ma='" + source[i].ma + "']").show();
            }
        }
    }, 1000));
    $("#plhmPAKhacPhuc input[name='plhmPASC'], #plhmPAKhacPhuc input[name='plhmPAChinhHang']").change(function () {
        layGiaTuDongPhanLoaiNhanh();
    });
    $("#btnBaoCao").click(function () {
        _modalBaoCaoService.show();
    });
    $('#btnAnhHopDong').click(function () {
        if ($(this).find('i.fas').hasClass('fa-file-contract')) {
            $("a.btnXemVideo").removeClass("d-none");
            $("a.btnXemVideoDGRRHD").removeClass("d-none");
            $("a.btnXemVideo").addClass("d-none");
            getAnhThumnailHopDong(() => {
                $(this).find('i.fas').removeClass('fa-file-contract').addClass('fa-car');
                $(this).find('i.fas').attr('title', 'Click để xem ảnh giám định xe');
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
    $('#btnLuuDanhGiaHienTruong').click(function () {
        luuDGHT()
    });
    $("#btnThemChiTietDTTonThatHANGHOA").click(function () {
        var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
        var doi_tuong = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
        var hang_muc = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-hang-muc");
        nhom = nhom || "";
        doi_tuong = doi_tuong || "";
        hang_muc = hang_muc || "";
        var json = { bt: "", ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, nhom: nhom, hang_muc: hang_muc, so_luong_dt: 0, so_id_doi_tuong: 0, so_id_doi_tuong_cha: 0 };
        var arr = layDuLieuBangDGHangHoa();
        arr.push(json);
        ESUtil.genHTML("modalChiTietTonThatHANGHOATemplate", "modalChiTietTonThatHANGHOA", { danh_sach: arr });
    });
    $("#btnThemChiTietDTTonThatTNDS_TAI_SAN").click(function () {
        var nhom = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-nhom");
        var doi_tuong = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-doi-tuong");
        var hang_muc = $("#navDanhGiaNghiepVu .breadcrumb-item.active").attr("data-hang-muc");
        nhom = nhom || "";
        doi_tuong = doi_tuong || "";
        hang_muc = hang_muc || "";

        var json = { bt: "", ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: 1, dvi_tinh: "", dvi_tinh_ten: "", gia: 0, so_luong_tt: 1, tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0, so_luong_dt: 0, so_id_doi_tuong: 0, so_id_doi_tuong_cha: 0 };
        var arr = layDuLieuBangDGTNDSTaiSan();
        arr.push(json);
        arr = chuanHoaNVCT(arr, nhom, doi_tuong, hang_muc);
        ESUtil.genHTML("modalChiTietTonThatTNDS_TAI_SANTemplate", "modalChiTietTonThatTNDS_TAI_SAN", { danh_sach: arr }, () => {
            tinhTongTienTNDSTaiSan();
        });
    });
    $("#btnThemChiTietDTTonThatNGUOI").click(function () {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
        var arr = layDuLieuBangDGNguoi();
        arr.push(json);
        ESUtil.genHTML("modalChiTietTonThatNGUOITemplate", "modalChiTietTonThatNGUOI", { danh_sach: arr });
    });
    $("#btnThemChiTietDTTonThatTNDSNGUOI").click(function () {
        var json = { ten: "", dia_chi: "", muc_do: "", muc_do_ten: "", so_luong: "", dvi_tinh: "", dvi_tinh_ten: "", gia: "", so_luong_tt: "", tien_tt: 0, tien_dx: 0, mo_ta: "", ghi_chu: "", thuong_tat: "", pttt: 0 };
        var arr = layDuLieuBangDGTNDSNguoi();
        arr.push(json);
        ESUtil.genHTML("modalChiTietTonThatTNDSNGUOITemplate", "modalChiTietTonThatTNDSNGUOI", { danh_sach: arr });
    });
    $("#close_popGhiChu").click(function () {
        _popoverGhiChu.hide();
    });
    $("#close_popMoTa").click(function () {
        _popoverMoTa.hide();
    });
    $("#close_popoverNDGiamDinh").click(function () {
        _popoverNDGiamDinh.hide();
    });
    $("#close_popGhiChuNoiDungCPGD").click(function () {
        _popoverGhiChuNoiDungCPGD.hide();
    });
    $("#luuGhiChu").click(function () {
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
    $("#luuGhiChuCPGD").click(function () {
        var val = $("#divGhiChu_NoiDungCPGD").val();
        $(_popoverGhiChuNoiDungCPGD.target).attr("data-val", val);
        if (val != "") {
            $(_popoverGhiChuNoiDungCPGD.target).attr("href", "#");
        }
        else {
            $(_popoverGhiChuNoiDungCPGD.target).removeAttr("href");
        }
        _popoverGhiChuNoiDungCPGD.hide();
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
    $("#inputSearch_LoaiChiPhiLanGD").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalLoaiChiPhiLanGDDanhSach .dslcp").removeClass("d-none");
            return;
        }
        $("#modalLoaiChiPhiLanGDDanhSach .dslcp").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.chi_phi_gd.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalLoaiChiPhiLanGDDanhSach #dslcp_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnLuuCTGiamDinh").click(function () {
        luuChiTietHangMuc();
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
    $("#btnBoSungHoSo").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'GD',
            loai: "TEMPLATE_EMAIL_BSHS"
        });
    });
    $('#btnLuuAddDoiTuongTT').click(function () {
        if (!_frmAddDoiTuongTT.isValid())
            return;
        var obj = _frmAddDoiTuongTT.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        if (obj.nhom != "TAI_SAN" && obj.nhom != "NGUOI") {
            obj.loai = "";
        }
        _service.saveDoiTuongTT(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            $("#btnMoiAddDoiTuongTT").removeClass("d-none");
            $("#btnLuuChonDoiTuongTT").removeClass("d-none");
            $("#btnLuuAddDoiTuongTT").addClass("d-none");
            $("#btnHuyLuu").addClass("d-none");

            $("#modalAddDoiTuongTTDsChon").removeClass("d-none");
            $("#modalAddDoiTuongTTForm").addClass("d-none");

            var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
            _service.getlistDoiTuongTonThat(objGetDetail).then(res1 => {
                ho_so_chi_tiet.data_info.ds_doi_tuong = res1.data_info;
                ESUtil.genHTML("dsDoiTuongTTTemplate", "dsDoiTuongTT", { data: ho_so_chi_tiet.data_info.ds_doi_tuong }, () => {
                    if (ho_so_chi_tiet.data_info.ds_doi_tuong.length > 0) {
                        var id = $('#doi_tuong_gd').attr("id");
                        $("#dsDoiTuongTT .input_chon_doi_tuong_tt").prop("checked", false);
                        var val = $("#" + id).attr('data-val');
                        if (val != "" && val != undefined) {
                            var arr = val.split(",");
                            for (var i = 0; i < arr.length; i++) {
                                $("#dsDoiTuongTT .input_chon_doi_tuong_tt[value='" + arr[i] + "']").prop("checked", true);
                            }
                        }
                    }
                });

            });
            _notifyService.success("Lưu đối tượng tổn thất thành công.");
        });
    });
    $('#btnMoiAddDoiTuongTT').click(function () {
        $("#btnMoiAddDoiTuongTT").addClass("d-none");
        $("#btnLuuChonDoiTuongTT").addClass("d-none");
        $("#btnLuuAddDoiTuongTT").removeClass("d-none");
        $("#btnHuyLuu").removeClass("d-none");

        $("#modalAddDoiTuongTTDsChon").addClass("d-none");
        $("#modalAddDoiTuongTTForm").removeClass("d-none");
        _frmAddDoiTuongTT.resetForm();
        _frmAddDoiTuongTT.clearErrorMessage();
        $("#dsDoiTuongTT .item_so_id_doi_tuong").removeClass("active");
        $('#dsDoiTuongTT tr .ds_doi_tuong_tt').removeClass('active_dttt');
    });
    $("#btnHuyLuu").click(function () {
        $("#btnMoiAddDoiTuongTT").removeClass("d-none");
        $("#btnLuuChonDoiTuongTT").removeClass("d-none");
        $("#btnLuuAddDoiTuongTT").addClass("d-none");
        $("#btnHuyLuu").addClass("d-none");

        $("#modalAddDoiTuongTTDsChon").removeClass("d-none");
        $("#modalAddDoiTuongTTForm").addClass("d-none");
    });
    $('#btnChonDoiTuongTT').click(function () {
        var arrInput = $(".modalChonDoiTuongTTItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            var item_name = $(this).attr('data-val');
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        var id = $("#modalChonDoiTuongTTElementSelect").val();
        $("#" + id).attr('data-val', val);
        if (val != '') {
            $("#" + id).attr('href', '#');
        } else {
            $("#" + id).removeAttr('href');
        }
        if ($("#" + id).attr("onchange") != undefined) {
            $("#" + id).trigger("change");
        }
        _modalChonDoiTuongTT.hide();
    });
    $('#btnChonDoiTuongTTTab4_1').click(function () {
        var target = _modalChonDoiTuongTTTab4_1.target;
        var val = $("#modalChonDoiTuongTTTab4_1DanhSach .modalChonDoiTuongTTTab4_1Item:checked").val();
        $(target).removeAttr('href');
        if (val != undefined && val != null && val != "") {
            $(target).attr('href', '#');
        }
        $(target).attr("data-val", (val == undefined || val == null) ? "" : val);

        _modalChonDoiTuongTTTab4_1.hide();
    });
    $("#btnDsChiPhiGD").click(function () {
        bindLanGiamDinh();
        lietKeThongTinChiPhiLanGD(ho_so_chi_tiet.data_info.ho_so.so_id, _frmDanhSachChiPhiGDLan.getControl("lan_gd").val());
    });
    $("#btnThemChiPhiGDLan").click(function () {
        var json = { ten_cp: '', tien: '', ma_cp: '', ten_loai_chi_phi: '', ghi_chu: '', bt: '' };
        arr = getDataTableChiPhiGD();
        arr.push(json);
        ESUtil.genHTML("danhSachChiPhiGDLanTemplate", "bodyDanhSachChiPhiGDLan", { data: arr });
    });
    $('#btnChonLoaiChiPhiLanGD').click(function () {
        var target = _modalLoaiChiPhiLanGD.target;
        var arr_chon = getCheckedDataTableChiPhiGD();
        if (arr_chon && arr_chon.length > 0) {
            for (var i = 0; i < arr_chon.length; i++) {
                var ma_cp = arr_chon[i].ma_cp;
                var ten_loai_chi_phi = arr_chon[i].ten_loai_chi_phi;
            }
        } else {
            _notifyService.error("Bạn chưa chọn loại chi phí");
            return;
        }
        $(target).attr("data-val", ma_cp);
        $(target).html(ten_loai_chi_phi);
        if (ma_cp === 'KHAC') {
            $(target).closest('tr').find('input[data-field=ten_cp]').val('');
            $(target).closest('tr').find('input[data-field=ten_cp]').prop('readonly', false);
        } else {
            $(target).closest('tr').find('input[data-field=ten_cp]').val(ten_loai_chi_phi);
            $(target).closest('tr').find('input[data-field=ten_cp]').prop('readonly', true);
        }
        _modalLoaiChiPhiLanGD.hide();
    });
    $("#btnLuuChiPhiLanGD").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lan_gd: _frmDanhSachChiPhiGDLan.getControl("lan_gd").val(),
            ma_gdv: "",
            chi_phi: getDataTableChiPhiGD()
        }
        _service.luuChiPhiLanGD(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin chi phí thành công");
            lietKeThongTinChiPhiLanGD(obj.so_id, obj.lan_gd);
            tinhTongTienChiPhiLanGD();
        });
    });
    $("#btnLuuDongChiPhiLanGD").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            lan_gd: _frmDanhSachChiPhiGDLan.getControl("lan_gd").val(),
            ma_gdv: "",
            chi_phi: getDataTableChiPhiGD()
        }
        _service.luuChiPhiLanGD(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin chi phí thành công");
            tinhTongTienChiPhiLanGD();
            lietKeThongTinChiPhiLanGD(obj.so_id, obj.lan_gd);
            _modalDanhSachChiPhiGDLan.hide();
        });
    })
    $("#btnOCR").click(function () {
        var arr_bt = getImageSelect();
        if (arr_bt == undefined || arr_bt == null || arr_bt.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        _carClaimCommonService.docOCR({ ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arr_bt }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            $("#btnSoSanhDuLieu").trigger("click");
        });
    });
    $("#btnAI").click(function () {
        var arr_bt = getImageSelect();
        if (arr_bt == undefined || arr_bt == null || arr_bt.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn nhận diện tổn thất (AI)");
            return;
        }
        _carClaimCommonService.nhanDienAI({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: arr_bt }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            for (var i = 0; i < arr_bt.length; i++) {
                $("#dsAnhTonThat img[data-bt='" + arr_bt[i] + "']").attr("data-original", "");
                $("#dsAnhTonThat img[data-bt='" + arr_bt[i] + "']").removeAttr("data-original-ai");
                $("#dsAnhTonThat img[data-bt='" + arr_bt[i] + "']").removeAttr("data-original-base");
            }
            initImageViewer();
            _notifyService.success("Hệ thống đã hoàn thành việc nhận diện tổn thất");
        });
    });
    $("#btnThemSuKienBaoHiem").click(function () {
        _frmSuKienBH.getControl("nhom_su_kien").setDataSource(objDanhMuc.nhom_su_kien, "ten", "ma", "Chọn nhóm sự kiện", "");
        su_kien_bh_chon = [];
        $("#frmTKiemSuKienBH").removeClass("d-none");
        $("#btnXemDsSuKienChon").html('<i class="fa fa-eye mr-2"></i>Xem danh sách');
        _frmTKiemSuKienBH.resetForm();
        _frmTKiemSuKienBH.getControl("nv").setValue("XE");
        var nhom_su_kien = _frmDienBienTonThat.getControl("nhom_su_kien").attr("data-val") || "";
        layDSSuKienTheoVuTT(nhom_su_kien, arr => {
            su_kien_bh_chon = arr;
            getPagingSKBH(1, res => {
                $("#modalSuKienBHFormNhap").addClass("d-none");
                $("#modalSuKienBHFormChon").removeClass("d-none");
                $("#btnManHinhTKiemSuKien").addClass("d-none");
                _modalSuKienBH.show();
            });
        });

    });
    $("#btnThemMoiSuKien").click(function () {
        _frmSuKienBH.resetForm();
        _frmSuKienBH.clearErrorMessage();
        $("#modalSuKienBHFormChon").addClass("d-none");
        $("#modalSuKienBHFormNhap").removeClass("d-none");
    });
    $("#btnQuayLaiChonSuKien").click(function () {
        $("#modalSuKienBHFormNhap").addClass("d-none");
        $("#modalSuKienBHFormChon").removeClass("d-none");
    });
    $("#btnLuuSuKienBH").click(function () {
        if (!_frmSuKienBH.isValid())
            return;
        var obj = _frmSuKienBH.getJsonData();
        obj.nv = "XE";
        _service.luuSuKienBH(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmSuKienBH.getControl("bt").setValue(res.out_value.bt);
            getPagingSKBH(1);
            _notifyService.success("Lưu thông tin sự kiện thành công");
        });
    });
    $("#btnXemDsSuKienChon").click(function () {
        if (su_kien_bh_chon == undefined || su_kien_bh_chon == null || su_kien_bh_chon.length <= 0) {
            _notifyService.error("Chưa có sự kiện nào được chọn");
            return;
        }
        ESUtil.genHTML("tableSuKienBHTemplate", "tableSuKienBH", { danh_sach: su_kien_bh_chon }, () => {
            for (var i = 0; i < su_kien_bh_chon.length; i++) {
                if ($("#sukien_" + su_kien_bh_chon[i].bt)) {
                    $("#sukien_" + su_kien_bh_chon[i].bt).prop("checked", true);
                }
            }
            $("#tableSuKienBH_pagination").html("");
            $("#frmTKiemSuKienBH").addClass("d-none");
            $("#btnXemDsSuKienChon").addClass("d-none");
            $("#btnLuuChonSuKien").addClass("d-none");
            $("#btnThemMoiSuKien").addClass("d-none");
            $("#btnManHinhTKiemSuKien").removeClass("d-none");
        });
    });
    $("#btnManHinhTKiemSuKien").click(function () {
        getPagingSKBH(1, res => {
            $("#frmTKiemSuKienBH").removeClass("d-none");
            $("#btnXemDsSuKienChon").removeClass("d-none");
            $("#btnLuuChonSuKien").removeClass("d-none");
            $("#btnThemMoiSuKien").removeClass("d-none");
            $("#btnManHinhTKiemSuKien").addClass("d-none");
        });
    });
    $("#btnLuuChonSuKien").click(function () {
        if (su_kien_bh_chon.length == 0) {
            _notifyService.error("Chưa có sự kiện bảo hiểm nào được chọn");
            return;
        }
        $("#nhom_su_kien").attr("data-val", "");
        $("#nhom_su_kien").val("");
        if (su_kien_bh_chon == undefined || su_kien_bh_chon == null || su_kien_bh_chon.length <= 0) {
            _modalSuKienBH.hide();
            return;
        }
        var val = "";
        var text = "";
        for (var i = 0; i < su_kien_bh_chon.length; i++) {
            if (val == "") {
                val += su_kien_bh_chon[i].bt;
                text += su_kien_bh_chon[i].ten_sk;
            }
            else {
                val += "," + su_kien_bh_chon[i].bt;
                text += ", " + su_kien_bh_chon[i].ten_sk;
            }
        }
        $("#nhom_su_kien").attr("data-val", val);
        $("#nhom_su_kien").val(text);
        _modalSuKienBH.hide();
    });
    $("#btnLuuChonDoiTuongTT").click(function () {
        luuChonDoiTuong(() => {
            _modalAddDoiTuongTT.hide();
        });
    });
    $("#frmBaoCaoGD input[name='ho_so_day_du']").click(function () {
        $("#frmBaoCaoGD input[name='ho_so_day_du']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBaoCaoGD input[name='nguyen_nhan']").click(function () {
        $("#frmBaoCaoGD input[name='nguyen_nhan']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBaoCaoGD input[name='pham_vi_tt']").click(function () {
        $("#frmBaoCaoGD input[name='pham_vi_tt']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBaoCaoGD input[name='gt_tham_gia_bh']").click(function () {
        $("#frmBaoCaoGD input[name='gt_tham_gia_bh']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBaoCaoGD input[name='tuan_thu']").click(function () {
        $("#frmBaoCaoGD input[name='tuan_thu']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#frmBaoCaoGD input[name='thoi_han_khai_bao']").click(function () {
        $("#frmBaoCaoGD input[name='thoi_han_khai_bao']").prop("checked", false);
        $(this).prop("checked", true);
    });
    $("#btnLuuBaoCaoGD").click(function () {
        luuBaoCaoGD();
    });
    $("#btnLuuTrinhBaoCaoGD").click(function () {
        luuVaTrinhBaoCaoGD();
    });
    $("#btnXinYKienBBGD").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id_hs: ho_so_chi_tiet.data_info.ho_so.so_id,
            nhom: "BBGD"
        }
        _modalTrinhXinYKien.show(obj);
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
    $("#btnThemChiPhiKhac").click(function () {
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
            obj.pm = "GD";
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
    $('#btnCapNhatUocTonThat').click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            uoc_ton_that: ho_so_chi_tiet.data_info.ho_so.uoc_ton_that
        }
        _carClaimCommon.showUocTonThat(obj);
    });
    $("#btnThemKienNghi").click(function () {
        binDataFormKienNghi();
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
        _frmTaoNoiDung.getControl("nv_ct").setValue("KIEN_NGHI");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    $("#btnThemNoiDungTrinh").click(function () {
        binDataFormKienNghi();
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
        _frmTaoNoiDung.getControl("nv_ct").setValue("TRINH_DUYET_GD");
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
    $("#inputSearch_ChonNoiDung").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChonNoiDungDanhSach .dscnd").removeClass("d-none");
            return;
        }
        $("#modalChonNoiDungDanhSach .dscnd").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = arrNoiDung.where(n => n.noi_dung.toLowerCase().includes(tim));
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
            var arr = arrNoiDung.where(n => n.so_id == val).firstOrDefault();
            $(target).attr("data-loai", arr.nv_ct);
            if (arr.nv_ct == "KIEN_NGHI") {
                _frmDanhGiaTonThat.getControl("y_kien").val(arr.noi_dung);
            } else {
                $("#noi_dung_trinh").val(arr.noi_dung);
            }
        }
        _modalChonNoiDung.hide();
    });
    $("#btnBoChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var loai = $(target).attr("data-loai");
        if (loai == "KIEN_NGHI") {
            $("#y_kien").val("");
            $(target).attr("data-val", "");
        } else {
            $("#noi_dung_trinh").val("");
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
    $("#btnXacNhanKyTay").click(function () {
        _notifyService.confirm("Bạn có chắc chắn là khách hàng đã ký giấy báo cáo giám định hiện trường này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                loai: "DGHT"
            }
            _service.xacNhanKyTay(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xác nhận thành công");
                xemDanhGiaBaoCao('DGHT');
            });
        });
    });
    $("#btnXacNhanKyTayBBGD").click(function () {
        _notifyService.confirm("Bạn có chắc chắn là khách hàng đã ký giấy biên bản giám định không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                loai: "BBGD",
                nguon: 'GDTT'
            }
            _service.xacNhanKyTay(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xác nhận thành công");
                xemThongTinXacNhan();
            });
        });
    });
    $("#btnGuiXacNhanDGHT").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            nv: 'XE',
            pm: 'GD',
            loai: "TEMPLATE_EMAIL_XAC_NHAN_DGHT"
        });

    });
    $("#btnGuiEmailDGHT").click(function () {
        var email_nhan = _frmNhapThongTinEmail.getControl("email_nhan").val();
        if (email_nhan == null || email_nhan == "" || email_nhan == undefined) {
            _notifyService.error("Bạn chưa nhập thông tin email khách hàng");
            return;
        }
        _notifyService.confirm("Bạn có chắc chắn muốn gửi thông báo xác nhận đến cho khách hàng hay không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                nv: "XE",
                loai: "TEMPLATE_EMAIL_XAC_NHAN_DGHT",
                email_nhan: email_nhan
            }
            _service.guiEmailKhachHang(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                } else {
                    _notifyService.success("Gửi email thành công");
                }
            });
        });
    });
    $("#btnSuaGCN").click(function () {
        _frmSuaGCN.resetForm();
        _frmSuaGCN.clearErrorMessage();
        _service.layThongTinHopDong({
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            pm: "GD",
            nv: "XE"
        }).then(res => {
            _frmSuaGCN.getControl("bien_xe").setValue(res.data_info.ho_so.bien_xe);
            _frmSuaGCN.getControl("hang_xe").setValue(res.data_info.ho_so.hang_xe_ten);
            _frmSuaGCN.getControl("hang_xe").trigger("select2:select");
            _frmSuaGCN.getControl("hieu_xe").setValue(res.data_info.ho_so.hieu_xe);
            _frmSuaGCN.getControl("nam_sx").setValue(res.data_info.ho_so.nam_sx);
            _frmSuaGCN.getControl("md_sd").setValue(res.data_info.ho_so.md_sd);
            _frmSuaGCN.getControl("loai_xe").setValue(res.data_info.ho_so.ma_loai_xe);
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
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            pm: "GD"
        };
        if (_frmSuaGCN.isValid()) {
            var formData = _frmSuaGCN.getJsonData();
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
    $("#btnHuyKTLanGD").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy kết thúc lần giám định này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                lan_gd: _frmThongTinGiamDinh.getControl("lan_gd").val()
            }
            _service.huyKetThucLanGD(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Hủy kết thúc lần giám định thành công");
                _service.layThongTinChiTietHoSo(obj).then(res => {
                    ho_so_chi_tiet.data_info = res.data_info;
                    xemChiTietLanGD(obj.lan_gd);
                });
            });
        });
    });
    $("#btnXacMinhPhi").click(function () {
        _modalXacMinhPhiService.show({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh_ql: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
            so_id_hd: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            nv: "XE"
        });
    });
    $('#btnLaySoHS').click(function () {
        luuUocTonThatLaySoHS(() => {
            var uoc_ton_that = $("#tt_xe_tong_cong_uoc_ton_that").html();
            _notifyService.confirmHTML("Bạn chắc chắn có muốn mở số hồ sơ bồi thường với ước tổn thất <b class='font-weight-bold'>" + uoc_ton_that + "</b> không?", "", val => {
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                    hanh_dong: "LAY_SO_HS",
                }
                _service.laySoHoSo(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _service.layThongTinChiTietHoSo(obj).then(res1 => {
                        ho_so_chi_tiet = res1;
                        ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                        $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                        _notifyService.success("Lấy số hồ sơ thành công");
                        _modalXemThongTinChungNhan.hide();
                    });
                });
            });
        });
    });
    $('#btnLuuUocLaySoHS').click(function () {
        luuUocTonThatLaySoHS(() => {
            _notifyService.success("Lưu thông tin ước tổn thất thành công");
        });
    });
    $('#btnChonLHNVLaySoHS').click(function () {
        //Lấy dữ liệu table
        var arr_table = getDataTableUocTTLaySoHS();
        //Danh sách đã chọn
        var arr_chon = getCheckedUocTTLaySoHS();
        var arr_tong_hop = [];
        for (var i = 0; i < arr_chon.length; i++) {
            var lh_nv = arr_table.where(n => n.lh_nv == arr_chon[i].lh_nv).firstOrDefault();

            if (lh_nv != null) {
                arr_tong_hop.push(lh_nv);
            }
            else {
                arr_tong_hop.push(arr_chon[i]);
            }
        }
        if (true) {

        }
        ESUtil.genHTML("dsUocTonThatNVLaySoHS_template", "dsUocTonThatNVLaySoHS", { data: arr_tong_hop }, () => {
            TinhToanUocTonThat();
            $('#dsUocTonThatNVLaySoHS tr input[data-field=uoc_ton_that]').trigger('change');
        });

        _modalDsLHNVLaySoHS.hide();
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
    $("#btnLuuCloseAddLicenseInfo").click(function () {
        if (_frmAddLicenseInfo.isValid()) {
            var json = _frmAddLicenseInfo.getJsonData();
            json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            _service.bsThongTinBangLaiXe(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (ho_so_chi_tiet.data_info.dien_bien !== null) {
                    for (var i = 0; i < ho_so_chi_tiet.data_info.dien_bien.length; i++) {
                        if (ho_so_chi_tiet.data_info.dien_bien[i].vu_tt.toString() === json.vu_tt.toString()) {
                            ho_so_chi_tiet.data_info.dien_bien[i].ten_lxe = json.ten_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].dthoai_lxe = json.dthoai_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].email_lxe = json.email_lxe;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_so = json.gplx_so;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_hang = json.gplx_hang;
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_hieu_luc = json.gplx_hieu_luc.numberToDate();
                            ho_so_chi_tiet.data_info.dien_bien[i].gplx_het_han = json.gplx_het_han.numberToDate();
                        }
                    }
                }
                _notifyService.success("Bổ sung thông tin thành công");
                _addLicenseInfoModal.hide();
            });
        }
    });
    $("#btnLuuCloseAddRegistryInfo").click(function () {
        if (_frmAddRegistryInfo.isValid()) {
            var json = _frmAddRegistryInfo.getJsonData();
            json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            _service.bsThongTinDangKiemXe(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (ho_so_chi_tiet.data_info.dien_bien !== null) {
                    for (var i = 0; i < ho_so_chi_tiet.data_info.dien_bien.length; i++) {
                        if (ho_so_chi_tiet.data_info.dien_bien[i].vu_tt.toString() === json.vu_tt.toString()) {
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_so = json.dangkiem_so;
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_hieu_luc = json.dangkiem_hieu_luc.numberToDate();
                            ho_so_chi_tiet.data_info.dien_bien[i].dangkiem_het_han = json.dangkiem_het_han.numberToDate();
                        }
                    }
                }
                _notifyService.success("Bổ sung thông tin thành công");
                _addRegistryInfoModal.hide();
            });
        }
    });
    $("#btnLuuDongBsBenThamGiaGD").click(function () {
        if (_frmBsBenThamGiaGD.isValid()) {
            var json = _frmBsBenThamGiaGD.getJsonData();
            _service.luuBenLienQuan(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (json.bt === "") {
                    json.bt === res.out_value.bt;
                    ho_so_chi_tiet.data_info.nguoi_dd.push(json);
                } else {
                    var index = ho_so_chi_tiet.data_info.nguoi_dd.findIndex(n => n.bt.toString() === json.bt.toString());
                    ho_so_chi_tiet.data_info.nguoi_dd[index] = json;
                }
                var arr = ho_so_chi_tiet.data_info.nguoi_dd.where(n => n.lan_gd.toString() === json.lan_gd.toString());
                fillDataBenThamGiaGiamDinh(arr);
                _notifyService.success("Lưu thông tin đại diện giám định thành công");
                _addBenThamGiaGiamDinhModal.hide();
            });
        }
    });
    $("#inputTimKiemHangMuc").click(function () {
        $(this).focus();
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
    //Tìm kiếm hồ sơ nâng cao
    $("#btnTimKiemHoSoNangCao").click(function () {
        _modalTimKiemNangCao.show();
    });
    $("#inputTimKiemHangMuc").keyup(ESUtil.delay(function (e) {
        getPagingHangMuc(1);
    }, 300));
    $(".inputSearchHangMucGiamDinh").keyup(ESUtil.delay(function (e) {
        ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatVCX", { danh_sach: arrHangMucTT }, () => {
            tinhTongTienVCX();
        });
        var val = $(this).val().trim();
        $("#modalChiTietTonThatVCX .hmChiTietItem").removeClass("d-none");
        if (val != "") {
            $("#modalChiTietTonThatVCX .hmChiTietItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalChiTietTonThatVCX .hmChiTietItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuBangDGVCXTimKiem();
            ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatVCX", { danh_sach: arr }, () => {
                tinhTongTienVCX();
            });
        }
    }, 300));
    $(".inputSearchHangMucGiamDinh_TNDS_TAI_SAN_XE").keyup(ESUtil.delay(function (e) {
        ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatTNDS_TAI_SAN_XE", { danh_sach: arrHangMucTT }, () => {
            tinhTongTienTNDSTAISANXE();
        });
        var val = $(this).val().trim();
        $("#modalChiTietTonThatTNDS_TAI_SAN_XE .hmChiTietItem").removeClass("d-none");
        if (val != "") {
            $("#modalChiTietTonThatTNDS_TAI_SAN_XE .hmChiTietItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalChiTietTonThatTNDS_TAI_SAN_XE .hmChiTietItem[data-search*=" + textSearch + "]").removeClass("d-none");
            var arr = layDuLieuBangTNDSTAISANXETimKiem();
            ESUtil.genHTML("modalChiTietTonThatVCXTemplate", "modalChiTietTonThatTNDS_TAI_SAN_XE", { danh_sach: arr }, () => {
                tinhTongTienTNDSTAISANXE();
            });
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
    //Báo giá và trình phương án giá
    $("#btnLapPhuongAnGia").click(function () {
        $("#btnThemHangMucGaraBao").addClass("d-none");
        var tu_dong_gia_de_xuat = ESStorage.getItemLocalStorage(keyCache.TU_DONG_GIA_XE_XUAT);
        if (tu_dong_gia_de_xuat == "C")
            $("#chk_tu_dong_de_xuat").prop("checked", true);
        else
            $("#chk_tu_dong_de_xuat").prop("checked", false);

        loadGaraBaoGia(res => {
            if ($("#garaBaoGia tr").find("td").hasClass("layBaoGiaCT")) {
                $("#garaBaoGia tr td.layBaoGiaCT")[0].click();
            }
            //anHienNutDuyetPA(res.out_value.phan_cap);
            $("#chkGiamGiaBGVtu").prop("checked", true);
            $("#chkGiamGiaBGNhanCong").prop("checked", true);
            $("#chkGiamGiaBGSon").prop("checked", true);
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
    $(".btnThemBaoGia").inlinePopover({
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
    $("#btnDsGaraHopTac").inlinePopover({
        target: "#dsGaraHopTac",
        close_on_outside_click: false,
        onBeforeShow: function (source) {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id
            };
            _carCompensationService.layGaraHopTac(obj).then(res => {
                ESUtil.genHTML("divGaraHopTac_template", "divGaraHopTac", res);
            });
        }
    });
    $("#btnLuuGara").click(function () {
        if (!_frmThemGara.isValid())
            return;

        var json = _frmThemGara.getJsonData();
        json.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        json.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        _service.themGaraBaoGia(json).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadGaraBaoGia();
            _notifyService.success("Thêm/Sửa gara báo giá thành công");
        });
        $("#themBaoGia").hide();
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
            loadGaraBaoGia();
        });
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
        _carCompensationService.chonGaraHopTacBaoGia(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadGaraBaoGia();
            _notifyService.success("Cập nhật gara báo giá thành công");
        });
    });
    $("#btnDownloadMauBaoGia").click(function () {
        if ($("#garaBaoGia tr.selected").length <= 0) {
            _notifyService.error("Không xác định được gara báo giá");
            return;
        }
        var objBaoGiaChiTiet = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            so_id_doi_tuong: $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong"),
            gara: $("#garaBaoGia tr.selected").attr("data-ma-gara"),
            bt_gara: $("#garaBaoGia tr.selected").attr("data-bt-gara")
        };
        _carCompensationService.downloadMauBaoGia(objBaoGiaChiTiet).then(res => {
            ESUtil.convertBase64ToFile(res, "template_bao_gia_chi_tiet.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnKetThucBaoGia").click(function () {
        _notifyService.ketThucBaoGia("Bạn có chắc chắn muốn kết thúc báo giá với gara này không?", type => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                so_id_doi_tuong: $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong"),
                gara: $("#garaBaoGia tr.selected").attr("data-ma-gara"),
                so_lieu_tu_dong: "K"
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
                    loadGaraBaoGia();
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
            //_carCompensationService
            _service.huyKetThucBaoGia(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.data_info.ho_so.so_id };
                _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                    ho_so_chi_tiet = resDetail;
                    loadGaraBaoGia();
                    _notifyService.success("Hủy kết thúc báo giá thành công.");
                });
            });
        });
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
    $("#file_upload_bao_gia").change(function () {
        var formFields = document.getElementById('frmThemGara').elements;
        if (formFields['file_upload_bao_gia'].files.length > 0) {
            var formData = _frmThemGara.getFormFileData();
            formData.set("bt_gara", $("#garaBaoGia tr.selected").attr("data-bt-gara"));
            formData.set("gara", $("#garaBaoGia tr.selected").attr("data-ma-gara"));
            formData.set("so_id_doi_tuong", $("#garaBaoGia tr.selected").attr("data-so-id-doi-tuong"));
            formData.set("ma_doi_tac", ho_so_chi_tiet.data_info.ho_so.ma_doi_tac);
            formData.set("so_id", ho_so_chi_tiet.data_info.ho_so.so_id);

            _carCompensationService.uploadBaoGia(formData).then(res => {
                document.getElementById("file_upload_bao_gia").value = "";
                ESUtil.genHTML("garaBaoGiaCT_template", "garaBaoGiaCT", res, () => {
                    bindEventBaoGiaCT();
                });
            });
        }
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
        } btnKetThucBaoGia
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
            _modalLapPhuongAnSuaChua.hide();
        });
    });
    //Đọc OCR báo giá
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
                _popoverThemBaoGiaBaoGia.hide();
            });
        }
    });
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
            _carCompensationService.luuThongTinOCRBaoGiaGara(obj).then(res => {
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
    //Tìm kiếm
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
                        item.ten_hang_muc_ocr = itemTK.ten_hang_muc_ocr,
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
    $(".inputSearchHangMuc").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMucCTiet .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucCTiet .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucCTiet .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //Lịch sử yêu cầu bsct
    $("#btnLichSuYeuCauBsGiayTo").click(function () {
        getPagingLichSuYeuCauBSHS(1);
    });
    //Lưu tỷ lệ thương tật
    $("#btnLuuTLThuongTat").click(function () {
        var obj = _frmTLThuongTat.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.data_info.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
        obj.pm = "GD";
        obj.ma_thuong_tat = _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val");
        obj.pttt = _frmTLThuongTatNhap.getControl("pttt").val();
        obj.tien = _frmTLThuongTatNhap.getControl("tien").val();
        obj.ghi_chu = _frmTLThuongTatNhap.getControl("ghi_chu").val();
        if (obj.ma_thuong_tat == undefined || obj.ma_thuong_tat == null || obj.ma_thuong_tat == "") {
            _notifyService.error("Không xác định được mức độ thương tật");
            return;
        }
        _service.nhapThuongTat(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmTLThuongTatNhap.resetForm();
            _frmTLThuongTatNhap.getControl("ma_thuong_tat").attr("data-val", "");
            _notifyService.success("Lưu mức độ thương tật thành công");
            nhapThuongTat(obj.bt, obj.vu_tt, obj.lh_nv, obj.hang_muc, obj.so_id_doi_tuong, false);

            var lhnv_tmp = ho_so_chi_tiet.data_info.lh_nv.where(n => n.ma == obj.lh_nv.trim()).firstOrDefault();
            xemChiTietDTTonThat(obj.lh_nv, lhnv_tmp.nhom, lhnv_tmp.doi_tuong, obj.hang_muc);
        });
    });
    //Tìm kiếm tỷ lệ thương tật
    $("#inputTimKiemTyLeThuongTat").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeTLTT").jstree('search', val);
        }, 500);
    });
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
        _carCompensationService.laySoSanhBGGara(obj).then(res => {
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
    $("#ModalTrinhDuyet").on('show.bs.modal', function () {
        $("#modalLapPhuongAnSuaChua").css("z-index", "1045");
    });
    $("#ModalTrinhDuyet").on('hide.bs.modal', function () {
        $("#modalLapPhuongAnSuaChua").css("z-index", "1050");
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
        console.log(file);
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
    $("#btnLapPASC").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id
        }
        _modalLapPhuongAnSuaChuaService.show(obj);
    });
    _stringeeService.hide();
});
$(document).bind('fscreenchange', function (e, state, elem) {
    if ($.fullscreen.isFullScreen()) {
        $('#image_fullsreen').find('i').removeClass('fa-expand-arrows-alt').addClass('fa-compress-arrows-alt');
    } else {
        e.preventDefault();
        $('#image_fullsreen').find('i').removeClass('fa-compress-arrows-alt').addClass('fa-expand-arrows-alt');
        _modalThemHMTT.hide();
        _modalCarClaimCompareData.hide();
    }
});
window.uploadPhotos = function (url) {
    var file = event.target.files[0];
    if (file.type.match(/image.*/)) {
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.onload = function (imageEvent) {
                var canvas = document.createElement('canvas'),
                    max_size = 544, // TODO : pull max size from a site config
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL('image/jpeg');
                var resizedImage = dataURLToBlob(dataUrl);
                $.event.trigger({
                    type: "imageResized",
                    blob: resizedImage,
                    url: dataUrl
                });
            }
            image.src = readerEvent.target.result;
        }
        reader.readAsDataURL(file);
    }
};



