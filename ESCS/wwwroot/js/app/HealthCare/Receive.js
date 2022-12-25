var _common = new CommonService();
var _service = new ReceiveService();
var _notifyService = new NotifyService();
var _modalDocumentService = new ModalDocumentService();
var _commonService = new CommonService();
var _esSendEmail = new ESSendEmail();
var _serviceTmpHome = new Service();

var _popoverGhiChu = new PopoverService("popoverGhiChu");
var _popoverDMChiPhi = new PopoverService("popoverDMChiPhi");
var _popoverGhiChuBoSungHSGT = new PopoverService("popoverGhiChuBoSungHSGT");

var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var ngayDauNam = new Date().getNgayDauNam();
var objDanhMuc = {};

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_CHI_NHANH = $("#escs_ma_chi_nhanh").val();
var ESCS_NSD = $("#escs_tai_khoan").val();

const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = "TN"; //Tiếp nhận
const NV = "NG";

const arrLoaiHSGT = [
    { ma: 'BG', ten: 'Bản gốc' },
    { ma: 'BS', ten: 'Bản sao' },
    { ma: 'BDC', ten: 'Bản đối chiếu' }
]
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var thong_tin_toan_bo_ho_so = {};
var arrDuLieuOCRGiayTo = [];
var arrThongTinOCRGiayTo = [];
var arrDuLieuOCRHoaDon = [];
var dataRow = null;
var ho_so_chi_tiet = {};
var arrQloiBh = [];
var gd_chon_anh_arr = [];
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var _data = null;
var data_lan = null;
var el = null;
var chi_chon_la = 0;

var configColumn = [
    { field: "kh_vip", title: "*", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nguon_tb", title: "Nguồn", width: "4%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_ht", title: "Ngày mở", width: "6%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "pt_hoan_thanh", title: "% hoàn thành", width: "8%", headerSort: false, hozAlign: "center", formatter: "html" },//, formatter: formatterTrangThai
    { field: "so_hs", title: "Số hồ sơ", width: "14%", headerSort: false, hozAlign: "center" },
    { field: "ten_trang_thai_hs_goc", title: "Trạng thái hồ sơ gốc", width: "12%", headerSort: false, hozAlign: "center", formatter: "html" },
    { field: "nsd_tn", title: "Cán bộ tiếp nhận", width: "10%", hozAlign: "center", headerSort: false },
    { field: "kh_xac_nhan", title: "KH xác nhận", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ten", title: "Tên người được bảo hiểm", width: "15%", headerSort: false },
    { field: "ngay_sinh", title: "Ngày sinh", width: "6%", hozAlign: "center", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "12%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số Hợp đồng", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nhom_sp", title: "Sản phẩm", width: "12%", hozAlign: "center", headerSort: false },
    { field: "so_tien", title: "Số tiền YC", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "ma_cv", title: "Mã công việc", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nsd_btv", title: "Cán bộ bồi thường", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nsd_blvp", title: "Cán bộ bảo lãnh", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý bồi thường", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_id", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];
var configColumnTkiemNguoi = [
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac_ql", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "so_id_hd", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "so_id_dt", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ten", title: "Tên NĐBH", hozAlign: "center", width: "200", headerSort: false, formatter: "html" },
    { field: "so_cmt", title: "Số CMND/CCCD", hozAlign: "center", width: "120", headerSort: false },
    { field: "ngay_sinh", title: "Ngày sinh", hozAlign: "center", width: "120", headerSort: false },
    { field: "ngay_hl", title: "Ngày hiệu lực", width: "145", hozAlign: "center", headerSort: false },
    { field: "ten_khach", title: "Tên người mua", hozAlign: "center", width: "200", headerSort: false },
    { field: "so_hd", title: "Số hợp đồng", hozAlign: "center", width: "180", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", hozAlign: "center", width: "100", headerSort: false },
    { field: "email", title: "Email", hozAlign: "center", width: "200", headerSort: false },
    { field: "nhom_sp", title: "Sản phẩm", hozAlign: "center", width: "200", headerSort: false },
    { field: "gcn", title: "Số giấy chứng nhận", width: "145", hozAlign: "center", headerSort: false },
    { field: "ten_dvi_cap_don", title: "Đơn vị cấp đơn", width: "200", headerSort: false }
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
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _statusListService = new StatusListService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _diseasesListService = new DiseasesListService();
var _branchListService = new BranchListService();
var _categoryPersonListService = new CategoryPersonService();
var _bankListService = new BankListService();
var _userManagementService = new UserManagementService();
var _healthCareGuaranteeService = new HealthCareGuaranteeService();
var _healthClaimCommon = new HealthClaimCommon();
var _uploadService = new UploadService(configUpload);
var _productHumanService = new ProductHumanService();
var _printedService = new PrintedService();
var _costsListService = new CostsListService();
var _unitService = new UnitService();
var _carInvestigation = new CarInvestigationService();
var _hospitalService = new HospitalService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _modalXemQRCode = new ModalXemQRCode();

var _frmTimKiem = new FormService("FrmSearch");
var _frmTimKiemNDBH = new FormService("frmTimKiemNDBH");
var _frmPersonClaimCustomerInfo = new FormService("frmPersonClaimCustomerInfo");
var _frmThemLanTiepNhan = new FormService("frmThemLanTiepNhan");
var _frmThemQuyenLoiLanTiepNhan = new FormService("frmThemQuyenLoiLanTiepNhan");
var _frmThongTinLienHe = new FormService("frmThongTinLienHe");
var _frmEditKH = new FormService("frmEditKH");
var _frmHoaDonChungTu = new FormService("frmHoaDonChungTu");
var _frmNguoiThuHuong = new FormService("frmNguoiThuHuong");
var _frmUploadHDDT = new FormService("frmUploadHDDT");
var _frmLyDoHuyHoSo = new FormService("frmLyDoHuyHoSo");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmChuyenNguoiXuLy = new FormService("frmChuyenNguoiXuLy");
var _frmDMChiPhi = new FormService("frmDMChiPhi");
var _frmChiPhiChiTiet = new FormService("frmChiPhiChiTiet");
var _frmThemCanBoTraoDoiConNguoi = new FormService("frmThemCanBoTraoDoiConNguoi");
var _frmThemNoiDungTraoDoiConNguoi = new FormService("frmThemNoiDungTraoDoiConNguoi");
var _frmThongTinNguoiLienHe = new FormService("frmThongTinNguoiLienHe");
var _frmThongTinNguoiThongBao = new FormService("frmThongTinNguoiThongBao");
var _frmmodalXemNoiDungKhachHangXN = new FormService("frmmodalXemNoiDungKhachHangXN");
var _frmNhomChatTraoDoi = new FormService("frmNhomChatTraoDoi");
var _frmOCRHoaDonChungTu = new FormService("frmOCRHoaDonChungTu");
var _frmThemLanNhanHSGoc = new FormService("frmThemLanNhanHSGoc");
var _frmLanNhanHoSoGoc = new FormService("frmLanNhanHoSoGoc");
//OCR
var _frmOCRGiayTo = new FormService("frmOCRGiayTo");

var _gridViewHoSoBoiThuong = new GridViewService("gridViewHoSoBoiThuong", configColumn, getPaging, rowClick);

var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navQuaTrinhGiaiQuyet"], "nav-tabs-timeline");
var _navBoiThuong = new NavTabService("navBoiThuong", ["tabHoSoGiayTo", "tabThongTinBaoLanh", "tabThongTinChungTu", "tabLichSuTonThat"], "nav-pills");
var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");
var _navThongTinQuyenLoiLSTT = new NavTabService("navThongTinQuyenLoiLSTT", ["tabQuyenLoiBaoHiem", "tabLichSuBoiThuong"], "nav-pills");
var _navThongTinQuyenLoiDKBS = new NavTabService("navThongTinQuyenLoiDKBS", ["tabThongTinQuyenLoiBaoHiem", "tabDieuKhoanBoSung"], "nav-pills");

var _modalCarSearch = new ModalService("ReceiveModal");
var _modalPersonSearch = new ModalService("modalPersonSearch");
var _modalMoHoSoBT = new ModalService("modalMoHoSoBT");
var _modalEditKH = new ModalService("modalEditKH");
var _modalHoaDonChungTu = new ModalService("modalHoaDonChungTu");
var _modalNguoiThuHuong = new ModalService("modalNguoiThuHuong");
var _modalHuyHoSo = new ModalService("ModalHuyHoSo");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "tabHoSoGiayTo");
var _modalDonViPhatHanhHoaDon = new ModalFullScreenService("modalDonViPhatHanhHoaDon");
var _modalBenhVien = new ModalDragService("modalBenhVien", undefined, "bottom");
var _modalNhaThuoc = new ModalDragService("modalNhaThuoc", undefined, "bottom");
var _modalYeuCauBoSungHoSo = new ModalService("modalYeuCauBoSungHoSo");
var _modalAddQuyenLoiYeuCau = new ModalService("modalAddQuyenLoiYeuCau");
var _modalChuyenNguoiXuLy = new ModalService("modalChuyenNguoiXuLy");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalBaoCaoService = new ModalBaoCaoService("Báo cáo bảo hiểm con người", "NG", "BC_NG_TN");
var _modalChiPhiKhamBenh = new ModalDragService("modalChiPhiKhamBenh", undefined, "top");
var _modalChiPhiThuoc = new ModalDragService("modalChiPhiThuoc", undefined, "top");
var _modalChiPhiKhac = new ModalDragService("modalChiPhiKhac", undefined, "top");
var _modalCanBo = new ModalDragService("modalCanBo", undefined, "bottom");
var _modalLoaiHSGT = new ModalDragService("modalLoaiHSGT", undefined, "bottom");
var _modalLoaiChiPhi = new ModalDragService("modalLoaiChiPhi", undefined, "top");
var _modalChonLoaiChiPhiOCR = new ModalDragService("modalChonLoaiChiPhiOCR", undefined, "top");
var _modalChiTietChiPhi = new ModalService("modalChiTietChiPhi");
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalXemHinhAnhChiTiet = new ModalFullScreenService("modalXemHinhAnhChiTiet", "");
var _modalXemHinhAnhGiayToTaiLieu = new ModalFullScreenService("modalXemHinhAnhGiayToTaiLieu", "");
var _modalThemCanBoTraoDoiConNguoi = new ModalService("modalThemCanBoTraoDoiConNguoi");
var _modalXemThongTinChungNhan = new ModalService("modalXemThongTinChungNhan");
var _modalQuyenLoiDaDung = new ModalService("modalQuyenLoiDaDung");
var _modalXemThongTinQuyenLoiLSTT = new ModalService("modalXemThongTinQuyenLoiLSTT");
var _modalThongTinNguoiLienHe = new ModalService("modalThongTinNguoiLienHe");
var _modalThongTinNguoiThongBao = new ModalService("modalThongTinNguoiThongBao");
var _modalXemNoiDungKhachHangXN = new ModalService("modalXemNoiDungKhachHangXN");
var _modalXemThongTinGoiBH = new ModalService("modalXemThongTinGoiBH");
var _modalXemHinhAnhHoaDonCTiet = new ModalFullScreenService("modalXemHinhAnhHoaDonCTiet", "");
var _modalOCRHoaDonChungTu = new ModalService("modalOCRHoaDonChungTu");
var _modalHealthClaimCompareData = new ModalService("modalHealthClaimCompareData");
var _modalXemHinhAnhHangMucTonThat = new ModalFullScreenService("modalXemHinhAnhHangMucTonThat", "");
var _modalXemQuyenLoiChiTiet = new ModalService("modalXemQuyenLoiChiTiet");
var _modalSLAFlowChart = new ModalService("modalSLAFlowChart");
var _modalXemQuyenLoiMIC = new ModalService("modalXemQuyenLoiMIC");
var _modalDsLanNhanHoSoGoc = new ModalService("modalDsLanNhanHoSoGoc");
var _modalThemLanNhanHSGoc = new ModalService("modalThemLanNhanHSGoc");
var _modalLichSuYeuCauBSHS = new ModalService("modalLichSuYeuCauBSHS");
var _modalLHNV = new ModalService("modalLHNV");
//Modal
var _modalHealthClaimCompareDataGiayTo = new ModalFullScreenService("modalHealthClaimCompareDataGiayTo", "");
var _popoverGhiChuLSTT = new PopoverService("popoverGhiChuLSTT");
var _popoverNguyenNhanGiamTru = new PopoverService("popoverNguyenNhanGiamTru");
var _popoverTraCuuBenh = new PopoverService("popoverTraCuuBenh");
var _navTabTimKiemNguoi = new NavTabService("navTabTimKiemNguoi", ["tabTimKiem", "tabThongTinLienHe"], "quy-trinh");
function traCuuBenh() {
    $("#inputTimKiemBenhLy").val("");
    $(".item-benh").prop("checked", false);
    var ma = _frmThemQuyenLoiLanTiepNhan.getControl("ma_benh").val().replace(/;/g, "|");
    var ten = _frmThemQuyenLoiLanTiepNhan.getControl("chan_doan").val().replace(/;/g, "|");
    $("#inputTimKiemBenhLy_ma").val(ma);
    $("#inputTimKiemBenhLy_ten").val(ten);

    getPagingBenhLy(1);
    _popoverTraCuuBenh.show(() => {
        $("#inputTimKiemBenhLy").focus();
        return true;
    });
}
function chonBenhLy(el) {
    var val = $(el).val();
    $(el).blur();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#inputTimKiemBenhLy_ma").val() != "") {
        arr_ma = $("#inputTimKiemBenhLy_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#inputTimKiemBenhLy_ma").val(arr_ma.join("|"));
}
function getPagingBenhLy(trang, callback = undefined) {
    var tim = $("#inputTimKiemBenhLy").val();
    tim = ESUtil.removeVietnameseTones(tim).toUpperCase();
    tim = tim.replace(/ /g, "");
    var so_dong = 20;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var source = JSON.parse(JSON.stringify(objDanhMuc.ds_benh_ly));
    if (tim != "") {
        source = source.where(n => n.ten_tim.includes(tim));
    }
    var tong_so_dong = source.length;
    /*    var arr = source.slide(dau-1, cuoi -1);*/
    var arr = source.where((item, i) => i >= dau && i <= cuoi);
    ESUtil.genHTML("dsBenhLyTemplate", "dsBenhLy", { ds_benh_ly: arr }, () => {
        var ma = $("#inputTimKiemBenhLy_ma").val();
        if (ma != "") {
            var arr = ma.split("|");
            for (var i = 0; i < arr.length; i++) {
                $("#ma_benh_" + arr[i].replace(/\./g, "")).prop("checked", true);
            }
        }
    });
    $("#dsBenhLy_pagination").html(ESUtil.pagingHTML("getPagingBenhLy", trang, tong_so_dong, so_dong));
    $("#inputTimKiemBenhLy").focus();
}
function layDsTaiLieu() {
    getAnhThumnail();
}
function getAnhThumnail(callback = undefined) {
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so.so_id
    }).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function getAnhThumnailHopDong(callback = undefined) {
    _service.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so.so_id_hd
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
    var arrDataTL = [];
    var arrDataGTK = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
            arrDataCPL.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TT") {
            arrDataTL.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TL") {
            arrDataGTK.push(arrAnh[i]);
        }
    }
    var arrData = [
        { loai_tai_lieu: "CPL", ten_loai_tai_lieu: "Ảnh chưa phân loại", so_luong_tai_lieu: arrDataCPL.length },
        { loai_tai_lieu: "TT", ten_loai_tai_lieu: "Giấy tờ, tài liệu", so_luong_tai_lieu: arrDataTL.length },
        { loai_tai_lieu: "TL", ten_loai_tai_lieu: "Giấy tờ khác", so_luong_tai_lieu: arrDataGTK.length },
    ];

    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
            $("#dsNhomAnh").append('<button class="dropdown-item" type="button" data-id="nhom_anh_' + i + '" onclick="goToScroll(\'nhom_anh_' + i + '\')">' + ESUtil.rutGonText(70, arrAnh[i].nhom_anh) + '</button>');
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
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function initImageViewer() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector(".list-pictures");
    var options = {
        inline: true,
        url: "data-original",
        backdrop: true,
        className: "img-container",
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
function initImageViewerTab2() {
    $('#tai-lieu-tab2').hide();
    $('#img-container-tab-2').show();
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-tab-2');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container-tab-2',
        id: 'img-container-tab-2',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFileTab2
    };
    var viewer = new Viewer(pictures, options);
}
function callBackViewFileTab2(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    $('#tai-lieu-tab2').show();
    $('#img-container-tab-2').hide();
    viewFileTab2(res.data_info.duong_dan, res.data_info.ten_file);
    $("#img-container-tab-2 img").css("max-width", "unset");
}
function viewFileTab2(base64, tieu_de = "Xem tài liệu") {
    PDFObject.embed("data:application/pdf;base64," + base64, "#tai_lieu_content",
        {
            pdfOpenParams: {
                navpanes: 1,
                statusbar: 0,
                toolbar: 1,
                view: "FitH",
                pagemode: "bookmarks"
            }
        }
    );
}
function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        // Tìm kiếm cán bộ/bệnh viện
        var isChecked = $('.item-benhvien').is(":checked");
        var isCheckedCB = $('.item-canbo').is(":checked");
        if (isChecked) {
            objTimKiem.benh_vien = _frmTimKiem.getControl("benh_vien").attr("data-val");
        } else {
            $(".item-benhvien").prop("checked", false);
            objTimKiem.benh_vien = '';
        }
        if (isCheckedCB) {
            objTimKiem.blv = _frmTimKiem.getControl("blv").attr("data-val");
        } else {
            $(".item-canbo").prop("checked", false);
            objTimKiem.blv = '';
        }
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
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    layHoSoCTiet(data, res => {
        _frmThemLanTiepNhan.clearErrorMessage();
        _frmThemLanTiepNhan.resetForm();
        _frmThemLanTiepNhan.getControl("ngay_vv").setValue(new Date().ddmmyyyy());
        _frmThemLanTiepNhan.getControl("ngay_rv").setValue(new Date().ddmmyyyy());
        _navThongTinHoSo.showTab("navThongTinChung");

        if (ho_so_chi_tiet.ho_so.trang_thai_hs_goc == "D")
            $("#trang_thai_hs_goc_chk").prop("checked", true);
        else
            $("#trang_thai_hs_goc_chk").prop("checked", false);

        $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
        $("#tong_tien_yc").html("0");
        $("#tabThongTinYeuCau_click").trigger("click");
        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
            ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
        });
        ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", ho_so_chi_tiet);
        ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
        ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
            if (ho_so_chi_tiet.lan_kham != null && ho_so_chi_tiet.lan_kham.length > 0) {
                XemChiTietLan(ho_so_chi_tiet.lan_kham[0].lan);
            }
            else {
                XemChiTietLan();
                _frmThemLanTiepNhan.getControl("ngay_vv").setValue(new Date().ddmmyyyy());
                _frmThemLanTiepNhan.getControl("ngay_rv").setValue(new Date().ddmmyyyy());
            }

        });
        showModalChinh(() => {
            _navBoiThuong.showTab("tabHoSoGiayTo");
        });
        layDsTaiLieu();
        tinhSoNgay();
        anHienTabXemToanBoThongTinHoSoBoiThuong("NG");
    });
}
function suaThongTinNDBH() {
    var obj = ESUtil.cloneObject(ho_so_chi_tiet.ho_so);
    _navTabTimKiemNguoi.showTab("tabThongTinLienHe");
    _frmTimKiemNDBH.resetForm();
    _frmThongTinLienHe.resetForm();
    _frmThongTinLienHe.getControl("ten").readOnly();
    _frmThongTinLienHe.getControl("dien_thoai").readOnly();
    _frmThongTinLienHe.getControl("email").readOnly();
    _frmThongTinLienHe.getControl("ngay_sinh").readOnly();

    _frmThongTinLienHe.getControl("nguoi_lh").readOnly(false);
    _frmThongTinLienHe.getControl("dthoai_nguoi_lh").readOnly(false);
    _frmThongTinLienHe.getControl("email_nguoi_lh").readOnly(false);
    _frmThongTinLienHe.getControl("nguoi_tb").readOnly(false);
    _frmThongTinLienHe.getControl("dthoai_nguoi_tb").readOnly(false);
    _frmThongTinLienHe.getControl("email_nguoi_tb").readOnly(false);

    _frmThongTinLienHe.setData(obj);
    _frmThongTinLienHe.getControl("goi_bh").val(obj.ten_goi_bh);
    ESUtil.genHTML("modalHealthSearchDsGCNTemplate", "modalHealthSearchDsGCN", { data: [] });
    $("#btnTiepTheo").hide();
    $("#btnMoHoSo").show();
    $("#btnMoHoSo").html('<i class="far fa-edit mr-1"></i> Sửa hồ sơ');
    _modalMoHoSoBT.show();
}
function layHoSoCTiet(obj, callback = undefined) {
    _service.layThongTinChiTietHoSo(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet = res.data_info;
        chi_chon_la = res.out_value.chi_chon_la;
        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
        var nguoi_sd = ho_so_chi_tiet.ho_so.nsd;
        if (ho_so_chi_tiet.ho_so.nsd == null) {
            nguoi_sd = "";
        }
        if (ho_so_chi_tiet.ho_so.so_hs != undefined && ho_so_chi_tiet.ho_so.so_hs != null && ho_so_chi_tiet.ho_so.so_hs.trim() != "") {
            $('#titleReceiveSoHoSo').html("<a href='#' onclick='copyText(this)'>" + ho_so_chi_tiet.ho_so.so_hs + "</a>" + " - " + nguoi_sd);
        }
        else {
            $('#titleReceiveSoHoSo').html("<a href='#' onclick='laySoHS()'>Lấy số hồ sơ</a>" + " - " + nguoi_sd);
        }

        if (ho_so_chi_tiet.ho_so.trang_thai_gcn == 1) {
            $('#timeGCN').html('Còn hiệu lực');
            $('#timeGCN').css("color", "green");
        }
        else {
            $('#timeGCN').html('Hết hiệu lực');
            $('#timeGCN').css("color", "red");
        }
        $("#titleReceiveMaDoiTac").html(ho_so_chi_tiet.ho_so.ten_cnhanh_cap);
        ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.canh_bao });
        _healthClaimCommonService.danhSachCanhBao(obj).then(res1 => {
            ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
        });
        if (callback) {
            callback(res);
        }
    });
}
function genThongTinChung(data) {
    _service.layThongTinChung(data).then(res => {
        ho_so_chi_tiet = res.data_info.ho_so;
        /*_uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.ma_doi_tac,
            so_id: ho_so_chi_tiet.so_id,
            type: "image",
            pm: CONSTANT_PM,
            nv: "NV"
        });*/
        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", res.data_info, () => {
            ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
        });
    });
}
function genLichSuTonThat(data) {
    _healthClaimCommonService.layLichSuTonThat(data).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tabLichSuTonThat_template", "tabLichSuTonThat", res.data_info);
    });
}
function genDSLanTiepNhan(data) {
    _service.layDSLanTiepNhan(data).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tblLanTiepNhan_template", "tblLanTiepNhan_body", res.data_info);
        $("#tblLanTiepNhan_body tr").click(function () {
            $("#tblLanTiepNhan_body tr").removeClass("text-danger");
            $(this).addClass("text-danger");
        });
    });
}
function rowClickTkiemNguoi(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.so_id_hd === undefined || data.so_id_hd === null || data.so_id_hd === 0 || data.so_id_hd === "") {
        return;
    }
    if (row !== undefined) {
        dataRow = data;
        xemThongTinQuyenLoiBaoHiem(dataRow);
        row.select();
    }
}
function showModalChinh(callback = undefined) {
    $("#ReceiveModal .nav-tabs.profile-tab").tabdrop();
    $("#ReceiveModal").esmodal("show");
    if (callback) {
        callback();
    }
}
function getCommonCategory(data_info, callback = undefined) {
    var json = { ma_doi_tac: data_info.ma_doi_tac };
    _healthClaimCommonService.layDanhMucChung(json).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var json = {};
        objDanhMuc.nguyen_nhan = json.dsNguyenNhan = res.data_info.where(n => n.nhom == "NGUYEN_NHAN");
        objDanhMuc.hinh_thuc = json.dsHinhThuc = res.data_info.where(n => n.nhom == "HINH_THUC");
        _frmThemLanTiepNhan.getControl("nguyen_nhan").setDataSource(json.dsNguyenNhan, "ten", "ma", "Chọn nguyên nhân", "");
        _frmThemLanTiepNhan.getControl("hinh_thuc").setDataSource(json.dsHinhThuc, "ten", "ma", "Chọn hình thức điều trị", "");
        _frmThemLanTiepNhan.getControl("lh_nv").setDataSource([], "ten", "ma", "Chọn quyền lợi", "");

        if (callback) {
            callback(data_info);
        }
    });
}
function showTabThongTinChung(tab) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ma_doi_tac,
        so_id: ho_so_chi_tiet.so_id
    }
    if (tab === "navQuaTrinhGiaiQuyet") {
        _healthClaimCommonService.layQuaTrinhXuLy(obj).then(res => {
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
function XemChiTietLan(lan) {
    $("#tblLanTiepNhan tr").removeClass("row-selected");
    ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
    _frmThemLanTiepNhan.resetForm();
    _frmThemLanTiepNhan.clearErrorMessage();
    _frmThemLanTiepNhan.getControl("benh_vien").attr("data-val", "");
    _frmThemLanTiepNhan.getControl("nha_thuoc").attr("data-val", "");
    $("#tong_tien_yc").html("0");
    if (ho_so_chi_tiet.lan_kham == null || ho_so_chi_tiet.lan_kham.length <= 0 || lan == undefined || lan == null || lan == 0 || lan == "") {
        return;
    }
    var lan_kham = ho_so_chi_tiet.lan_kham.where(n => n.lan == lan).firstOrDefault();
    if (lan_kham == null) {
        return;
    }
    $("#lan_kham_" + lan).addClass("row-selected");
    _frmThemLanTiepNhan.setData(lan_kham);

    var bv = objDanhMuc.benh_vien.where(n => n.ma == lan_kham.benh_vien).firstOrDefault();
    var nt = objDanhMuc.nha_thuoc.where(n => n.ma == lan_kham.nha_thuoc).firstOrDefault();
    if (lan_kham.benh_vien != null && bv != null) {
        _frmThemLanTiepNhan.getControl("benh_vien").setValue(bv.ten);
        _frmThemLanTiepNhan.getControl("benh_vien").attr("data-val", lan_kham.benh_vien);
    }
    if (lan_kham.nha_thuoc != null && nt != null) {
        _frmThemLanTiepNhan.getControl("nha_thuoc").setValue(nt.ten);
        _frmThemLanTiepNhan.getControl("nha_thuoc").attr("data-val", lan_kham.nha_thuoc);
    }
    var qloi = ho_so_chi_tiet.lan_kham_qloi.where(n => n.lan == lan);
    ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: qloi }, () => {
        $("#tong_tien_yc").html(ESUtil.formatMoney(tongChiPhiLan(lan)));
    });
}
function tongChiPhi() {
    var lan_kham = ho_so_chi_tiet.lan_kham;
    if (lan_kham == null || lan_kham.length <= 0) {
        return 0;
    }
    var tong = 0;
    for (var i = 0; i < lan_kham.length; i++) {
        if (lan_kham[i].tien_yc != "" && lan_kham[i].tien_yc != null && lan_kham[i].tien_yc != undefined) {
            tong += parseInt(lan_kham[i].tien_yc);
        }
    }
    return tong;
}
function tongChiPhiLan(lan) {
    var lan_kham_qloi = ho_so_chi_tiet.lan_kham_qloi.where(n => n.lan == lan);
    if (lan_kham_qloi == null || lan_kham_qloi.length <= 0) {
        return 0;
    }
    var tong = 0;
    for (var i = 0; i < lan_kham_qloi.length; i++) {
        if (lan_kham_qloi[i].tien_yc != "" && lan_kham_qloi[i].tien_yc != null && lan_kham_qloi[i].tien_yc != undefined) {
            tong += parseInt(lan_kham_qloi[i].tien_yc);
        }
    }
    return tong;
}
function xoaQuyenLoi(lan, id_qloi) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        lan: lan,
        id_qloi: id_qloi
    }
    _notifyService.confirm("Bạn có chắc chắn xóa quyền lợi này không?", "", () => {
        _service.XoaHoSoTiepNhanQuyenLoiLan(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
                $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
                $("#tong_tien_yc").html("0");
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                    ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                });
                ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
                ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                    XemChiTietLan(obj.lan);
                });
                _modalAddQuyenLoiYeuCau.hide();
            });
            _notifyService.success("Xóa quyền lợi thành công.");
            getPaging(1);
        });
    });
}
function suaQuyenLoi(lan, id_qloi) {
    var chi_phi = ho_so_chi_tiet.chi_phi.where(n => n.lan == lan && n.id_qloi == id_qloi);
    var chi_phi_ct = ho_so_chi_tiet.chi_phi_ct.where(n => n.lan == lan && n.id_qloi == id_qloi);
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        lan: lan,
        id_qloi: id_qloi,
    }
    $("#tong_chphi_tien_yc").html("0");
    _service.LayChiTietQLoi(obj).then(res => {
        _modalAddQuyenLoiYeuCau.show();
        _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").setValue(res.data_info.nhom_nguyen_nhan);
        _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").trigger("select2:select");
        _frmThemQuyenLoiLanTiepNhan.setData(res.data_info);
        $('#ghi_chu_lan_tn').setValue(res.data_info.ghi_chu);
        $('#ghi_chu_khac_lan_tn').setValue(res.data_info.ghi_chu_khac);

        _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").attr("data-val", res.data_info.lh_nv);

        var obj = ho_so_chi_tiet.qloi_goc.where(n => n.lh_nv == res.data_info.lh_nv).firstOrDefault();
        if (obj == null) {
            return;
        }
        data_qloi_tmp = obj;
        _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").setValue(obj.ten);

        if (chi_phi != null && chi_phi.length > 0) {
            for (var i = 0; i < chi_phi.length; i++) {
                chi_phi[i].so_luong = chi_phi_ct.where(n => n.ma_ct == chi_phi[i].loai_ct).length;
            }
        }

        ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: chi_phi }, () => {
            if (chi_phi != null && chi_phi.length > 0) {
                $("#tong_chphi_tien_yc").html(ESUtil.formatMoney(chi_phi.sum(n => n.tien_yc)));
            }
        });
        $("#tien_yc_tinh_toan").trigger('keyup');
    });
}
function xemQuaTrinhXuLy(tab) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id
    }
    if (tab === "navQuaTrinhGiaiQuyet") {
        _healthClaimCommonService.layQuaTrinhXuLy(obj).then(res => {
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
}
function hienThiTabTKiemXe(tab) {
    var currentTab = _navTabTimKiemNguoi.currentTab;
    if (currentTab == "tabTimKiem") {
        $("#btnTiepTheo").trigger("click");
    } else {
        _navTabTimKiemNguoi.showTab(tab);
        $("#btnTiepTheo").show();
        $("#btnMoHoSo").hide();
    }

}
function layLichSuTonThat() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt
    }
    _service.base.all([
        _service.layLSTT(obj),
        _service.layLSTTGroup(obj)
    ]).then(arrRes => {
        if (arrRes[0] !== undefined && arrRes[0] !== null && arrRes[0].state_info.status === "NotOK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        if (arrRes[1] !== undefined && arrRes[1] !== null && arrRes[1].state_info.status === "NotOK") {
            _notifyService.error(arrRes[1].state_info.message_body);
            return;
        }
        $('#kieuXemLSTT').trigger('change');
        ESUtil.genHTML("tblLichSuTonThatConNguoi_template", "tblLichSuTonThatConNguoi", { arrHoSo: arrRes[0].data_info.ho_so }, () => {
            var tong_yc = 0, tong_duyet = 0;
            $.each(arrRes[0].data_info.ho_so, (index, item) => {
                tong_yc += parseFloat(item.so_tien_yc);
                tong_duyet += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCauLSTT').html(ESUtil.formatMoney(tong_yc));
            $('#tongTienDuyetLSTT').html(ESUtil.formatMoney(tong_duyet));
        });
        ESUtil.genHTML("tblLichSuTonThatConNguoiGroup_template", "tblLichSuTonThatConNguoiGroup", { arrHoSo: arrRes[1].data_info }, () => {
            var tong_yc_gr = 0, tong_duyet_gr = 0;
            $.each(arrRes[1].data_info, (index, item) => {
                tong_yc_gr += parseFloat(item.so_tien_yc);
                tong_duyet_gr += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCauLSTTGroup').html(ESUtil.formatMoney(tong_yc_gr));
            $('#tongTienDuyetLSTTGroup').html(ESUtil.formatMoney(tong_duyet_gr));
        });
    });
}
function layLichSuTonThatTop5() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt
    }
    _service.layDanhSachHDTaiTuc(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        $('#kieuXemLSTTTop5').trigger('change');
        ESUtil.genHTML("tblTop5DanhSachHD_template", "tblTop5DanhSachHD", { data: res.data_info });
        ESUtil.genHTML("tblLichSuTonThatConNguoiTop5_template", "tblLichSuTonThatConNguoiTop5", { arrHoSo: [] }, () => {
            $('#tongTienYeuCauLSTTTop5').html(ESUtil.formatMoney(0));
            $('#tongTienDuyetLSTTTop5').html(ESUtil.formatMoney(0));
        });
        ESUtil.genHTML("tblLichSuTonThatConNguoiGroupTop5_template", "tblLichSuTonThatConNguoiGroupTop5", { arrHoSo: [] }, () => {
            $('#tongTienYeuCauLSTTGroupTop5').html(ESUtil.formatMoney(0));
            $('#tongTienDuyetLSTTGroupTop5').html(ESUtil.formatMoney(0));
        });
    });
}
function xemLSTTTop5(so_id_hd) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: so_id_hd,
        ngay_sinh: ho_so_chi_tiet.ho_so.ngay_sinh,
        so_cmt: ho_so_chi_tiet.ho_so.so_cmt
    }
    _service.base.all([
        _service.layLSTTTop5(obj),
        _service.layLSTTGroupTop5(obj)
    ]).then(arrRes => {
        if (arrRes[0] !== undefined && arrRes[0] !== null && arrRes[0].state_info.status === "NotOK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        if (arrRes[1] !== undefined && arrRes[1] !== null && arrRes[1].state_info.status === "NotOK") {
            _notifyService.error(arrRes[1].state_info.message_body);
            return;
        }
        $("#tblTop5DanhSachHD tr.hop_dong_tai_tuc").removeClass("active");
        $("#hop_dong_tai_tuc_" + so_id_hd).addClass("active");
        $('#kieuXemLSTTTop5').trigger('change');
        ESUtil.genHTML("tblLichSuTonThatConNguoiTop5_template", "tblLichSuTonThatConNguoiTop5", { arrHoSo: arrRes[0].data_info.ho_so }, () => {
            var tong_yc = 0, tong_duyet = 0;
            $.each(arrRes[0].data_info.ho_so, (index, item) => {
                tong_yc += parseFloat(item.so_tien_yc);
                tong_duyet += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCauLSTTTop5').html(ESUtil.formatMoney(tong_yc));
            $('#tongTienDuyetLSTTTop5').html(ESUtil.formatMoney(tong_duyet));
        });
        ESUtil.genHTML("tblLichSuTonThatConNguoiGroupTop5_template", "tblLichSuTonThatConNguoiGroupTop5", { arrHoSo: arrRes[1].data_info }, () => {
            var tong_yc_gr = 0, tong_duyet_gr = 0;
            $.each(arrRes[1].data_info, (index, item) => {
                tong_yc_gr += parseFloat(item.so_tien_yc);
                tong_duyet_gr += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCauLSTTGroupTop5').html(ESUtil.formatMoney(tong_yc_gr));
            $('#tongTienDuyetLSTTGroupTop5').html(ESUtil.formatMoney(tong_duyet_gr));
        });
    });
}
function layQuyenLoiHoSo(obj, callback = undefined) {
    $("#step4_lstt_ho_so tr.active_row").removeClass('active_row');
    $("#step4_lstt_ho_so tr[data-id='" + obj.so_id + "']").addClass('active_row');
    ESUtil.genHTML("step4_lstt_quyen_loi_template", "step4_lstt_quyen_loi", { data: [] });
    _healthClaimCommonService.layHoSoQuyenLoi(obj).then(res => {
        ESUtil.genHTML("step4_lstt_quyen_loi_template", "step4_lstt_quyen_loi", { data: res.data_info }, () => {
            var tong_yc = 0, tong_giam = 0, tong_duyet = 0;
            $.each(res.data_info, (index, item) => {
                tong_yc += parseFloat(item.tien_yc);
                tong_giam += parseFloat(item.tong_tien_giam);
                tong_duyet += parseFloat(item.tien_duyet);
            });
            $('#lstt_tong_tien_yc').html(ESUtil.formatMoney(tong_yc));
            $('#lstt_tong_tien_giam').html(ESUtil.formatMoney(tong_giam));
            $('#lstt_tong_tien_duyet').html(ESUtil.formatMoney(tong_duyet));
        });
        if (callback) {
            callback;
        }
    });
}
function xemHoSoCu(ma_doi_tac, so_id) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id
    }
    layQuyenLoiHoSo(obj);
}
function chonDonViPhatHanhHoaDon(el) {
    _frmUploadHDDT.resetForm();
    _frmUploadHDDT.clearErrorMessage();
    $("#fileNameHoaDonDT").html("");
    _modalDonViPhatHanhHoaDon.options = { placement: "top" };
    _modalDonViPhatHanhHoaDon.showWithPosition(el);
}
function xoaChon(el, loai) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
    if (loai == "ICD") {
        _frmThemQuyenLoiLanTiepNhan.getControl("chan_doan").val("");
    }
}
function xoaChonCanBo(el) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
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
function chonBenhVien(el) {
    var val = $(el).attr("col-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    if (val == "" || val == null || val == undefined) {
        $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    }
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    }
    _modalBenhVien.show(el);
}
function onChonBenhVien(el) {
    var target = _modalBenhVien.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        $(target).attr("data-val", val);
        var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
        $(target).val(bv.ten);
        $(target).attr("col-val", bv.ma);
    }
    _modalBenhVien.hide();
}
function chonNhaThuoc(el) {
    var val = $(el).attr("col-val");
    $(el).blur();
    $("#modalNhaThuocDanhSach .dsnt").removeClass("d-none");
    $("#inputSearch_NhaThuoc").focus();
    $("#inputSearch_NhaThuoc").val("");
    if (val == "" || val == null || val == undefined) {
        $("#modalNhaThuocDanhSach .modalNhaThuocItem").prop("checked", false);
    }
    if (val != undefined && val != null && val != "") {
        $("#modalNhaThuocDanhSach .modalNhaThuocItem[value='" + val + "']").prop("checked", true);
    }
    _modalNhaThuoc.show(el);
}
function onChonNhaThuoc(el) {
    var target = _modalNhaThuoc.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        $(target).attr("data-val", val);
        var nt = objDanhMuc.nha_thuoc.where(n => n.ma == val).firstOrDefault();
        $(target).val(nt.ten);
        $(target).attr("col-val", nt.ma);
    }
    _modalNhaThuoc.hide();
}
function layDsHoSoGiayTo(callback = undefined) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: "NG"
    };
    _healthClaimCommonService.layHoSoGiayTo(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (ho_so_chi_tiet.ho_so_giay_to) {
            ho_so_chi_tiet.ho_so_giay_to = [];
        }
        ho_so_chi_tiet.ho_so_giay_to = res.data_info;
        if (callback) {
            callback(res);
        }
    });
}
function luuPhanLoaiHangMuc(callback = undefined) {
    if (!_frmThemHMTT.isValid()) {
        return;
    }
    var obj = _frmThemHMTT.getJsonData();
    obj.loai = "TL";
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.pm = CONSTANT_PM;
    obj.bt = getImageSelect();
    _service.phanLoaiHangMuc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getAnhThumnail(res => {
            if (!callback) {
                for (var i = 0; i < obj.bt.length; i++) {
                    $("#img" + obj.bt[i]).prop("checked", true);
                }
            }
        });
        layHoSoCTiet(obj, resDetail => {
            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
            });
        });

        _notifyService.success("Phân loại hạng mục thành công");
        if (callback) {
            callback(res);
        }
    });
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
    if (gd_chon_anh_arr == null || gd_chon_anh_arr.length <= 0) {
        return;
    }
}
function refresh() {
    _frmThemLanTiepNhan.clearErrorMessage();
    _frmThemLanTiepNhan.resetForm();
    _frmThemLanTiepNhan.getControl("ngay_vv").setValue(new Date().ddmmyyyy());
    _frmThemLanTiepNhan.getControl("ngay_rv").setValue(new Date().ddmmyyyy());

    _frmThemLanTiepNhan.getControl("benh_vien").attr("col-val", "");
    _frmThemLanTiepNhan.getControl("nha_thuoc").attr("col-val", "");
    ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] }, () => {
        $("#tong_tien_yc").html(ESUtil.formatMoney(0));
    });
}
function layThongTinChungTu() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id
    }
    _healthClaimCommonService.layChungTu(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        //Danh sách chứng từ
        ESUtil.genHTML("step3_chung_tu_template", "step3_chung_tu", res.data_info);
        var chung_tu_tong_tien = chung_tu_tong_thue = chung_tu_tong_cong = 0;
        $.each(res.data_info.chung_tu, function (index, item) {
            chung_tu_tong_tien += item.tien;
            chung_tu_tong_thue += item.thue;
            chung_tu_tong_cong += item.tong_cong;
        });
        $('.chung_tu_tong_tien').html(ESUtil.formatMoney(chung_tu_tong_tien));
        $('.chung_tu_tong_thue').html(ESUtil.formatMoney(chung_tu_tong_thue));
        $('.chung_tu_tong_cong').html(ESUtil.formatMoney(chung_tu_tong_cong));
        //Người thụ hưởng
        ESUtil.genHTML("step3_thu_huong_template", "step3_thu_huong", res.data_info);
        var thu_huong_tong = 0;
        $.each(res.data_info.thu_huong, function (index, item) {
            thu_huong_tong += item.tien;
        });
        $('.thu_huong_tong').html(ESUtil.formatMoney(thu_huong_tong));
    });
}
function suaHoaDonChungTu(el) {
    _frmHoaDonChungTu.clearErrorMessage();
    var data = JSON.parse($(el).closest('tr').find("input[name='objInfo']").val());
    _frmHoaDonChungTu.setData(data);
    _modalHoaDonChungTu.show();
}
function xoaHoaDonChungTu(el) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
        var json = JSON.parse($(el).closest('tr').find("input[name='objInfo']").val());
        json.so_id = ho_so_chi_tiet.ho_so.so_id;
        _healthClaimCommonService.xoaChungTu(json).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layThongTinChungTu();
            _notifyService.success("Xóa chứng từ thành công.");
        });
    });
}
function suaNguoiThuHuong(el) {
    _frmNguoiThuHuong.clearErrorMessage();
    var data = JSON.parse($(el).closest('tr').find("input[name='objInfo']").val());
    _frmNguoiThuHuong.setData(data);
    _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
    _modalNguoiThuHuong.show();
}
function xoaNguoiThuHuong(el) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
        var json = JSON.parse($(el).closest('tr').find("input[name='objInfo']").val());
        json.so_id = ho_so_chi_tiet.ho_so.so_id;
        _healthClaimCommonService.xoaThuHuong(json).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layThongTinChungTu();
            _notifyService.success("Xóa người thụ hưởng thành công.");
        });
    });
}
//function chungTuTinhTien() {
//    var so_tien = parseInt(_frmHoaDonChungTu.getControl("tien").getValue());
//    var tl_thue = parseInt(_frmHoaDonChungTu.getControl("tl_thue").getValue());
//    var thue = (so_tien * (tl_thue / 100));
//    thue = parseInt(thue.toFixed());
//    var tong_cong = so_tien + thue;
//    _frmHoaDonChungTu.getControl("thue").setValue(ESUtil.formatMoney(thue));
//    _frmHoaDonChungTu.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
//}
function chungTuTinhTien() {
    var so_tien = parseInt(_frmHoaDonChungTu.getControl("tien").getValue());
    //var tl_thue = parseInt(_frmHoaDonChungTu.getControl("tl_thue").getValue());
    //var thue = (so_tien * (tl_thue / 100));
    //thue = parseInt(thue.toFixed());
    //var tong_cong = so_tien + thue;

    var thue = _frmHoaDonChungTu.getControl("thue").val();
    if (thue == '' || thue == undefined || thue == null) {
        thue = 0;
    } else {
        thue = parseInt(thue.replace(/[^0-9]+/g, ''));
    }
    var tong_cong = so_tien + thue;
    //_frmHoaDonChungTu.getControl("thue").setValue(ESUtil.formatMoney(thue));
    _frmHoaDonChungTu.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function chonChiPhiKhamBenh(el) {
    ESUtil.genHTML("modalChiPhiKhamBenhDanhSachTemplate", "modalChiPhiKhamBenhDanhSach", { danh_sach: _.sortBy(objDanhMuc.ds_chi_phi.where(n => n.loai == "KB" && n.so_luong_pt == 0), x => x.ten_day_du) }, () => {
        $("#modalChiPhiKhamBenhDanhSach .dscpkb").removeClass("d-none");
        $("#inputSearch_ChiPhiKhamBenh").focus();
        $("#inputSearch_ChiPhiKhamBenh").val("");
        $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem").prop("checked", false);
        var arr = getTableChiPhiKham();
        for (var i = 0; i < arr.length; i++) {
            $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem[value='" + arr[i].ma + "']").prop("checked", true);
        }
        _modalChiPhiKhamBenh.show(el);
    });
}
function chonChiPhiThuoc(el) {
    ESUtil.genHTML("modalChiPhiThuocDanhSachTemplate", "modalChiPhiThuocDanhSach", { danh_sach: objDanhMuc.ds_chi_phi.where(n => n.loai == "TH" && n.so_luong_pt == 0) }, () => {
        $("#modalChiPhiThuocDanhSach .dscpt").removeClass("d-none");
        $("#inputSearch_ChiPhiThuoc").focus();
        $("#inputSearch_ChiPhiThuoc").val("");
        $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem").prop("checked", false);
        var arr = getTableChiPhiThuoc();
        for (var i = 0; i < arr.length; i++) {
            $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem[value='" + arr[i].ma + "']").prop("checked", true);
        }
        _modalChiPhiThuoc.show(el);
    });
}
function chonChiPhiKhac(el) {
    var obj = _frmThemQuyenLoiLanTiepNhan.getJsonData();
    if (obj.ma_benh == "") {
        _notifyService.error("Bạn chưa chọn mã bệnh");
        return;
    }
    var ma_benh = $("#modalChiPhiKhac_MaBenh").val();
    if (ma_benh != obj.ma_benh) {
        $("#modalChiPhiKhac_MaBenh").val(obj.ma_benh);
        _healthClaimCommonService.layDSChiPhi({ loai: "KH", ma_benh: obj.ma_benh }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            objDanhMuc.chi_phi_khac = res.data_info;
            ESUtil.genHTML("modalChiPhiKhacDanhSachTemplate", "modalChiPhiKhacDanhSach", { danh_sach: res.data_info }, () => {
                $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem").prop("checked", false);
                var arr = getTableChiPhiKhac();
                for (var i = 0; i < arr.length; i++) {
                    $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem[value='" + arr[i].ma + "']").prop("checked", true);
                }
                _modalChiPhiKhac.show(el);
            })
        });
    }
    else {
        $("#modalChiPhiKhacDanhSach .dscpk").removeClass("d-none");
        $("#inputSearch_ChiPhiKhac").focus();
        $("#inputSearch_ChiPhiKhac").val("");
        $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem").prop("checked", false);
        var arr = getTableChiPhiKhac();
        for (var i = 0; i < arr.length; i++) {
            $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem[value='" + arr[i].ma + "']").prop("checked", true);
        }
        _modalChiPhiKhac.show(el);
    }
}
function getTableChiPhiKham() {
    var otArr = [];
    $("#tblChiPhiKhamBenh tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "KB";
        otArr.push(json);
    });
    return otArr;
}
function getTableChiPhiThuoc() {
    var otArr = [];
    $("#tblChiPhiThuoc tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "TH";
        otArr.push(json);
    });
    return otArr;
}
function getTableChiPhiKhac() {
    var otArr = [];
    $("#tblChiPhiKhac tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "KH";
        otArr.push(json);
    });
    return otArr;
}
function xoaDong(el, loai) {
    $(el).parent().parent().remove();
    if (loai == "CHI_PHI_KHAM_BENH") {
        var arr = getTableChiPhiKham();
        ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: arr });
    }
    if (loai == "CHI_PHI_THUOC") {
        var arr = getTableChiPhiThuoc();
        ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: arr });
    }
    if (loai == "CHI_PHI_KHAC") {
        var arr = getTableChiPhiKhac();
        ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: arr });
    }
}
function tongChiPhiKhamBenh() {
    $("#tblChiPhiKhamBenh_TongTienKham").html("0");
    var arr = getTableChiPhiKham();
    var checked_count = arr.where(n => n.mac_dinh == "1").length;
    $("#chi_phi_kb").prop("checked", false);
    if (arr.length == checked_count) {
        $("#chi_phi_kb").prop("checked", true);
    }
    //_frmThemQuyenLoiLanTiepNhan.getControl("tien_yc").setValue(ESUtil.formatMoney(tongChiPhiQloi()));
    if (arr != undefined && arr != null && arr.length > 0) {
        var tong_so_tien = 0;
        var tong_gia_tham_khao = 0;
        for (var i = 0; i < arr.length; i++) {
            tong_so_tien += parseInt(arr[i].so_tien);
            tong_gia_tham_khao += parseInt(arr[i].gia_tham_khao);
        }
        $("#tblChiPhiKhamBenh_TongTienKham").html(ESUtil.formatMoney(tong_so_tien));
        return tong_so_tien;
    }
    return 0;
}
function tongChiPhiThuoc() {
    $("#tblChiPhiThuoc_TongThanhTien").html("0");
    var arr = getTableChiPhiThuoc();
    var checked_count = arr.where(n => n.mac_dinh == "1").length;
    $("#chi_phi_th").prop("checked", false);
    if (arr.length == checked_count) {
        $("#chi_phi_th").prop("checked", true);
    }

    if (arr != undefined && arr != null && arr.length > 0) {
        var tong_so_tien = 0;
        var tong_gia_tham_khao = 0;
        for (var i = 0; i < arr.length; i++) {
            arr[i].so_tien = parseInt(arr[i].so_luong) * parseInt(arr[i].don_gia);
            tong_so_tien += parseInt(arr[i].so_tien);
            tong_gia_tham_khao += parseInt(arr[i].gia_tham_khao);
        }
        $("#tblChiPhiThuoc tr").each(function (e) {
            if ($(this).find("input").length <= 0)
                return;
            var json = {};
            td = $(this).children();
            var so_luong = 0;
            var don_gia = 0;
            td.each(function (i) {
                $(this).find("input").each(function (el) {
                    var name = $(this).attr("data-field");
                    if (name == "so_luong") {
                        so_luong = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                    }
                    if (name == "don_gia") {
                        don_gia = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                    }
                });
            });
            td.each(function (i) {
                $(this).find("a[data-field='so_tien']").each(function (el) {
                    var name = $(this).attr("data-field");
                    if (name == "so_tien") {
                        $(this).html(ESUtil.formatMoney(so_luong * don_gia));
                        $(this).attr("data-val", so_luong * don_gia);
                    }
                });
            });
        });
        $("#tblChiPhiThuoc_TongThanhTien").html(ESUtil.formatMoney(tong_so_tien));
        _frmThemQuyenLoiLanTiepNhan.getControl("tien_yc").setValue(ESUtil.formatMoney(tongChiPhiQloi()));
        return tong_so_tien;
    }
    _frmThemQuyenLoiLanTiepNhan.getControl("tien_yc").setValue(ESUtil.formatMoney(tongChiPhiQloi()));
    return 0;
}
function tongChiPhiKhac() {
    $("#tblChiPhiKhac_TongSoTien").html("0");
    var arr = getTableChiPhiKhac();
    var checked_count = arr.where(n => n.mac_dinh == "1").length;
    $("#chi_phi_kh").prop("checked", false);
    if (arr.length == checked_count) {
        $("#chi_phi_kh").prop("checked", true);
    }

    _frmThemQuyenLoiLanTiepNhan.getControl("tien_yc").setValue(ESUtil.formatMoney(tongChiPhiQloi()));
    if (arr != undefined && arr != null && arr.length > 0) {
        var tong_so_tien = 0;
        for (var i = 0; i < arr.length; i++) {
            tong_so_tien += parseInt(arr[i].so_tien);
        }
        $("#tblChiPhiKhac_TongSoTien").html(ESUtil.formatMoney(tong_so_tien));
        return tong_so_tien;
    }
    return 0;
}
function tongChiPhiQloi() {
    var arr_kb = getTableChiPhiKham();
    var arr_th = getTableChiPhiThuoc();
    var arr_kh = getTableChiPhiKhac();
    var tong_kb = arr_kb.sum(n => parseFloat(n.so_tien));
    var tong_th = arr_th.sum(n => parseFloat(n.so_tien));
    var tong_kh = arr_kh.sum(n => parseFloat(n.so_tien));
    return tong_kb + tong_th + tong_kh;
}
function chonKhachHangVip(el) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        nhom_kh_vip: ''
    }
    if (ho_so_chi_tiet.ho_so.nhom_kh_vip == 'VIP') {
        obj.nhom_kh_vip = 'K';
    } else if (ho_so_chi_tiet.ho_so.nhom_kh_vip == '' || ho_so_chi_tiet.ho_so.nhom_kh_vip == null) {
        obj.nhom_kh_vip = null;
    }

    if ($(el).find('i.rating-star').hasClass('active-star')) {
        _notifyService.confirm("Bạn có chắc chuyển khách hàng VIP sang khách hàng phổ thông hay không?", "", () => {
            obj.nhom_kh_vip = null;
            _service.khachHangVIP(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Chuyển sang khách hàng phổ thông thành công.");
                    $(el).find('i.active-star').removeClass('active-star');
                    $(el).find('i').addClass('defaultColor');
                    $(el).closest('td').find('span.ten_kh').removeClass('active-vip');
                    getPaging(1);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    } else {
        _notifyService.confirm("Bạn có chắc chuyển khách hàng này thành khách hàng VIP hay không?", "", () => {
            obj.nhom_kh_vip = 'VIP';
            _service.khachHangVIP(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Chuyển sang khách hàng VIP thành công.");
                    $(el).find('i.defaultColor').removeClass('defaultColor');
                    $(el).find('i').addClass('active-star');
                    $(el).closest('td').find('span.ten_kh').addClass('active-vip');
                    getPaging(1);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    }
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
function xemChiPhi(maChiphi) {
    $(".TABLE_CHI_PHI").addClass("d-none");
    $("#CHI_PHI_" + maChiphi).removeClass("d-none");
    $("#navChiPhi .navChiPhiItem").removeClass("active");
    $("#navChiPhi_" + maChiphi).addClass("active");
}
function onMacDinhChiPhi(el, loai) {
    var val = $(el).val();
    if (val == "1") {
        $(el).val("0");
    }
    else {
        $(el).val("1");
    }
    if (loai == "ALL_KB") {
        $(".chi_phi_kb").prop("checked", $(el).is(":checked"));
        $(".chi_phi_kb").val($(el).is(":checked") ? "1" : "0");
    }
    if (loai == "ALL_TH") {
        $(".chi_phi_th").prop("checked", $(el).is(":checked"));
        $(".chi_phi_th").val($(el).is(":checked") ? "1" : "0");
    }
    if (loai == "ALL_KH") {
        $(".chi_phi_kh").prop("checked", $(el).is(":checked"));
        $(".chi_phi_kh").val($(el).is(":checked") ? "1" : "0");
    }
    if (loai == "KB") {
        $("#chi_phi_kb").prop("checked", false);
        if ($(".chi_phi_kb").length == $(".chi_phi_kb:checked").length) {
            $("#chi_phi_kb").prop("checked", true);
        }
    }
    if (loai == "TH") {
        $("#chi_phi_th").prop("checked", false);
        if ($(".chi_phi_th").length == $(".chi_phi_th:checked").length) {
            $("#chi_phi_th").prop("checked", true);
        }
    }
    if (loai == "KH") {
        $("#chi_phi_kh").prop("checked", false);
        if ($(".chi_phi_kh").length == $(".chi_phi_kh:checked").length) {
            $("#chi_phi_kh").prop("checked", true);
        }
    }
}
function showGhiChu(el) {
    _popoverGhiChu.options = { placement: "top top-right" };
    $("#divGhiChu_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDung").val(val);
    _popoverGhiChu.showWithPosition(el);
}
function dongPopover(el) {
    $(el).parent().parent().hide();
}
function showThemDMChiPhi(el, loai) {
    _frmDMChiPhi.resetForm();
    _frmDMChiPhi.clearErrorMessage();
    if (loai == "KB") {
        $('#cp_thuoc').hide();
        _frmDMChiPhi.getControl("loai").val("KB");
        $('form[name=frmDMChiPhi] input[name=gia]').prop('required', false);
        $('form[name=frmDMChiPhi] select[name=dvi_tinh]').prop('required', false);
    }
    if (loai == "KH") {
        $('#cp_thuoc').hide();
        _frmDMChiPhi.getControl("loai").val("KH");
        $('form[name=frmDMChiPhi] input[name=gia]').prop('required', false);
        $('form[name=frmDMChiPhi] select[name=dvi_tinh]').prop('required', false);
    }
    if (loai == "TH") {
        $('#cp_thuoc').show();
        _frmDMChiPhi.getControl("loai").val("TH");
        $('form[name=frmDMChiPhi] input[name=gia]').prop('required', true);
        $('form[name=frmDMChiPhi] select[name=dvi_tinh]').prop('required', true);
    }
    _frmDMChiPhi.getControl("ma_ct").setValue(_frmChiPhiChiTiet.getControl("ma_ct").val());
    _frmDMChiPhi.getControl("trang_thai").setValue("D");
    _frmDMChiPhi.getControl("ma").focus();
    _popoverDMChiPhi.options = { placement: "top" };
    _popoverDMChiPhi.showWithPosition(el);
}
function dongDMChiPhi() {
    _popoverDMChiPhi.hide();
}
function focusInput(el) {
    $(el).focus();
}
function chuanHoaChiPhi(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].so_luong_pt = arr.where(n => n.ma_ct == arr[i].ma).length;
        if (arr[i].ma_ct == null) {
            arr[i].ma_day_du = arr[i].ma;
            arr[i].ten_day_du = arr[i].ten;

        }
        else {
            var chi_phi = arr.where(n => n.ma == arr[i].ma_ct).firstOrDefault();
            arr[i].ma_day_du = arr[i].ma_ct + "/" + arr[i].ma;
            arr[i].ten_day_du = chi_phi.ten + "/" + arr[i].ten;
        }
    }
    return arr;
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
function chonLoaiChiPhi(el) {
    var arr = getTableChiPhi();
    $("#modalLoaiChiPhiDanhSach .dslcp").removeClass("d-none");
    $("#inputSearch_LoaiChiPhi").focus();
    $("#inputSearch_LoaiChiPhi").val("");
    $("#modalLoaiChiPhiDanhSach .modalChonLoaiChiPhiItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalLoaiChiPhiDanhSach .modalChonLoaiChiPhiItem[value='" + arr[i].loai_ct + "']").prop("checked", true);
    }
    _modalLoaiChiPhi.show(el);
}
function getTableChiPhi() {
    var otArr = [];
    $("#tbDsKhoanChi tr.khoanChiItem").each(function (e) {
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        var chi_phi = objDanhMuc.nhom_chi_phi.where(n => n.ma == json.loai_ct && n.loai == json.loai).firstOrDefault();
        if (chi_phi != null) {
            json.ten_loai_chi_phi = chi_phi.ten;
        }
        otArr.push(json);
    });
    return otArr;
}
function getCheckedChiPhi() {
    var arr_chon = [];
    $("#modalLoaiChiPhiDanhSach .modalChonLoaiChiPhiItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                loai: "",
                loai_ct: "",
                ten_loai_chi_phi: "",
                so_ct: "",
                tien_yc: "0",
                tien_giam: "0",
                tien_duyet: "0",
                nguyen_nhan_giam: "",
                ghi_chu: ""
            };
            var val = $(this).val();
            var loai = $(this).attr("data-loai");
            var chi_phi = objDanhMuc.nhom_chi_phi.where(n => n.ma == val && n.loai == loai).firstOrDefault();
            if (chi_phi != null) {
                obj.loai = chi_phi.loai;
                obj.loai_ct = val;
                obj.ten_loai_chi_phi = chi_phi.ten;
                arr_chon.push(obj);
            }
        }
    });
    return arr_chon;
}
function xemChiTietChiPhi(ma_chi_phi, loai, tien_yc = 0) {
    $(".TABLE_CHI_PHI").addClass("d-none");
    $("#CHI_PHI_" + loai.toUpperCase()).removeClass("d-none");

    $("#tblChiPhiKhamBenh_TongTienKham").html("0");
    $("#tblChiPhiThuoc_TongThanhTien").html("0");
    $("#tblChiPhiKhac_TongSoTien").html("0");
    ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: [] });
    ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: [] });
    ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: [] });

    _frmChiPhiChiTiet.getControl('ma_ct').setValue(ma_chi_phi);
    _frmChiPhiChiTiet.getControl('tien_yc').setValue(tien_yc);

    var lan = _frmThemQuyenLoiLanTiepNhan.getControl('lan').val();
    var id_qloi = _frmThemQuyenLoiLanTiepNhan.getControl('id_qloi').val();
    var chi_phi_goc_temp = ho_so_chi_tiet.chi_phi.where(n => n.id_qloi == id_qloi && n.lan == lan);
    var chi_phi_ct_temp = ho_so_chi_tiet.chi_phi_ct.where(n => n.lan == lan && n.id_qloi == id_qloi && n.ma_ct == ma_chi_phi);
    var arr_kb = chi_phi_ct_temp.where(n => n.loai == 'KB');
    var arr_th = chi_phi_ct_temp.where(n => n.loai == 'TH');
    var arr_kh = chi_phi_ct_temp.where(n => n.loai == 'KH');

    var arr_chi_phi_goc = [];
    $.each(chi_phi_goc_temp, (index, item) => {
        arr_chi_phi_goc.push(item.loai_ct);
    });

    if (arr_chi_phi_goc.indexOf(ma_chi_phi) != -1) {
        var ma = _frmThemQuyenLoiLanTiepNhan.getControl('ma_benh').getValue();
        if (ma == '' || ma == null || ma == undefined) {
            _notifyService.error('Vui lòng chọn mã bệnh');
            return;
        }
        _healthClaimCommonService.layDSChiPhi({ ma_benh: ma.replace(/\|/g, ";") }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var arr_kb_icd = []; var arr_th_icd = []; var arr_kh_icd = [];

            if (loai.toUpperCase() == 'KB') {
                if (arr_kb.length == 0) {
                    var kham_benh = getTableChiPhiKham();
                    if (res.data_info != null) {
                        arr_kb = res.data_info.where(n => n.loai == "KB" && n.ma_ct == ma_chi_phi);
                        for (var i = 0; i < arr_kb.length; i++) {
                            arr_kb[i].so_tien = 0;
                            var item_kb = kham_benh.where(n => n.ma == arr_kb[i].ma).firstOrDefault();
                            if (item_kb != null) {
                                arr_kb[i].so_tien = parseFloat(item_kb.so_tien);
                            }
                        }
                        for (var i = 0; i < kham_benh.length; i++) {
                            var item_kb_tmp = arr_kb.where(n => n.ma == kham_benh[i].ma).firstOrDefault();
                            if (item_kb_tmp == null) {
                                arr_kb.unshift(kham_benh[i]);
                            }
                        }
                        ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: arr_kb }, () => {
                            $('#tblChiPhiKhamBenh_TongTienKham').html(ESUtil.formatMoney(0));
                        });
                    }
                } else {
                    arr_kb_icd = res.data_info.where(n => n.loai == "KB" && n.ma_ct == ma_chi_phi);
                    $.each(arr_kb, (index, item) => {
                        if (arr_kb_icd.where(n => n.ma == item.ma).length > 0) {
                            arr_kb[index].mac_dinh = '1';
                            arr_kb[index].gia_tham_khao = arr_kb_icd.where(n => n.ma == item.ma).firstOrDefault().gia_tham_khao;
                        }
                    });
                    ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: arr_kb }, () => {
                        var tong = arr_kb.sum(n => n.so_tien);
                        $('#tblChiPhiKhamBenh_TongTienKham').html(ESUtil.formatMoney(tong));
                    });
                }
            } else if (loai.toUpperCase() == 'TH') {
                if (arr_th.length == 0) {
                    if (res.data_info != null) {
                        var thuoc = getTableChiPhiThuoc();
                        if (res.data_info != null) {
                            arr_th = res.data_info.where(n => n.loai == "TH" && n.ma_ct == ma_chi_phi);
                            for (var i = 0; i < arr_th.length; i++) {
                                arr_th[i].so_luong = 1;
                                arr_th[i].so_tien = 0;
                                var item_th = thuoc.where(n => n.ma == arr_th[i].ma).firstOrDefault();
                                if (item_th != null) {
                                    arr_th[i].gia = parseFloat(item_th.gia);
                                    arr_th[i].so_luong = parseFloat(item_th.so_luong);
                                    arr_th[i].so_tien = parseFloat(item_th.so_tien);
                                }
                            }
                            for (var i = 0; i < thuoc.length; i++) {
                                var item_th_tmp = arr_th.where(n => n.ma == thuoc[i].ma).firstOrDefault();
                                if (item_th_tmp == null) {
                                    arr_th.unshift(thuoc[i]);
                                }
                            }
                            ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: arr_th }, () => {
                                $('#tblChiPhiThuoc_TongThanhTien').html(ESUtil.formatMoney(0));
                            });
                        }
                    }
                } else {
                    arr_th_icd = res.data_info.where(n => n.loai == "TH" && n.ma_ct == ma_chi_phi);
                    $.each(arr_th, (index, item) => {
                        if (arr_th_icd.where(n => n.ma == item.ma).length > 0) {
                            arr_th[index].mac_dinh = '1';
                            arr_th[index].gia_tham_khao = arr_th_icd.where(n => n.ma == item.ma).firstOrDefault().gia_tham_khao;
                        }
                    });
                    ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: arr_th }, () => {
                        var tong = arr_th.sum(n => n.so_tien);
                        $('#tblChiPhiThuoc_TongThanhTien').html(ESUtil.formatMoney(tong));
                    });
                }

            } else if (loai.toUpperCase() == 'KH') {
                if (arr_kh.length == 0) {
                    if (res.data_info != null) {
                        var khac = getTableChiPhiKhac();
                        arr_kh = res.data_info.where(n => n.loai == "KH" && n.ma_ct == ma_chi_phi);
                        for (var i = 0; i < arr_kh.length; i++) {
                            arr_kh[i].so_tien = 0;
                            var item_kh = khac.where(n => n.ma == arr_kb[i].ma).firstOrDefault();
                            if (item_kh != null) {
                                arr_kh[i].so_tien = parseFloat(item_kh.so_tien);
                            }
                        }
                        for (var i = 0; i < khac.length; i++) {
                            var item_kh_tmp = arr_kh.where(n => n.ma == khac[i].ma).firstOrDefault();
                            if (item_kh_tmp == null) {
                                arr_kh.unshift(khac[i]);
                            }
                        }
                        ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: arr_kh }, () => {
                            $('#tblChiPhiKhac_TongSoTien').html(ESUtil.formatMoney(0));
                        });
                    }
                } else {
                    arr_kh_icd = res.data_info.where(n => n.loai == "KH" && n.ma_ct == ma_chi_phi);
                    $.each(arr_kh, (index, item) => {
                        if (arr_kh_icd.where(n => n.ma == item.ma).length > 0) {
                            arr_kh[index].mac_dinh = '1';
                            arr_kh[index].gia_tham_khao = arr_kh_icd.where(n => n.ma == item.ma).firstOrDefault().gia_tham_khao;
                        }
                    });
                    ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: arr_kh }, () => {
                        var tong = arr_kh.sum(n => n.so_tien);
                        $('#tblChiPhiKhac_TongSoTien').html(ESUtil.formatMoney(tong));
                    });
                }
            }
        });
    } else {
        _notifyService.error('Bạn phải lưu chi phí trước');
        return;
    }

    _modalChiTietChiPhi.show();
}
function tinhTongChiPhi(el = undefined) {
    if (el != undefined && $(el)) {
        var tr = $(el).parent().parent();
        var td = tr.children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-name");
                if (name == "tien_yc") {
                    tien_yc = parseInt($(this).val().replace(/[^0-9]+/g, ''));
                }
            });
        });
    }
    var arr = getTableChiPhi();
    var tong_chphi_tien_yc = 0;
    if (arr != null && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            tong_chphi_tien_yc += parseInt(arr[i].tien_yc);
        }
    }
    $("#tong_chphi_tien_yc").html(ESUtil.formatMoney(tong_chphi_tien_yc));
    _frmThemQuyenLoiLanTiepNhan.getControl('tien_yc').val(ESUtil.formatMoney(tong_chphi_tien_yc))
    return tong_chphi_tien_yc;
}
function xoaChiPhi(el) {
    _notifyService.confirm("Bạn có chắc muốn xóa chi phí này không?", "", () => {
        $(el).parent().parent().remove();
        tinhTongChiPhi();
    });
}
function LuuChiPhiChiTiet(callback = undefined) {
    var data_kham = getTableChiPhiKham();
    var data_thuoc = getTableChiPhiThuoc();
    var data_khac = getTableChiPhiKhac();
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        lan: _frmThemQuyenLoiLanTiepNhan.getControl('lan').getValue(),
        id_qloi: _frmThemQuyenLoiLanTiepNhan.getControl('id_qloi').getValue(),
        lh_nv: _frmThemQuyenLoiLanTiepNhan.getControl('lh_nv').getValue(),
        ma_ct: _frmChiPhiChiTiet.getControl('ma_ct').getValue(),
        ten_ct: objDanhMuc.ds_chi_phi.where(n => n.ma == _frmChiPhiChiTiet.getControl('ma_ct').getValue()).firstOrDefault().ten,
        data: [...data_kham, ...data_thuoc, ...data_khac]
    }
    if (obj.data.length == 0) {
        _notifyService.error("Chưa có dòng chi phí nào được lưu");
        return;
    }
    var count = obj.data.where(n => n.so_tien == "0").length;
    if (count > 0) {
        _notifyService.error("Tồn tại chi phí chưa nhập số tiền");
        return;
    }
    _service.LuuChiPhiChiTiet(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }

        var obj_hsct = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }

        layHoSoCTiet(obj_hsct, res1 => {
            ESUtil.genHTML("tblLanBaoLanhTemplate", "tblLanBaoLanh", ho_so_chi_tiet, () => {
                ESUtil.genHTML("tblQloiLanTemplate", "tblQloiLan", { qloi_bao_lanh: [] });
                if (ho_so_chi_tiet.lan_bao_lanh != null && ho_so_chi_tiet.lan_bao_lanh.length > 0) {
                    xemChiTietLanBLVP(ho_so_chi_tiet.lan_bao_lanh[0].lan);
                }
            });
            var id_qloi = _frmThemQuyenLoiLanTiepNhan.getControl('id_qloi').getValue();
            var lan = _frmThemQuyenLoiLanTiepNhan.getControl('lan').getValue();
            var arrChiPhi = ho_so_chi_tiet.chi_phi.where(n => n.id_qloi == id_qloi && n.lan == lan);
            var arrChiPhiCT = ho_so_chi_tiet.chi_phi_ct.where(n => n.id_qloi == id_qloi && n.lan == lan);

            if (arrChiPhi != null && arrChiPhi.length > 0) {
                for (var i = 0; i < arrChiPhi.length; i++) {
                    arrChiPhi[i].so_luong = arrChiPhiCT.where(n => n.ma_ct == arrChiPhi[i].loai_ct).length;
                }
            }

            ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: arrChiPhi }, () => {
                if (arrChiPhi != null && arrChiPhi.length > 0) {
                    var tong = arrChiPhi.sum(n => n.tien_yc);
                    $("#tong_chphi_tien_yc").html(ESUtil.formatMoney(tong));
                    _frmThemQuyenLoiLanTiepNhan.getControl('tien_yc').val(ESUtil.formatMoney(tong));
                }
            });
            var qloi = ho_so_chi_tiet.lan_kham_qloi.where(n => n.lan == lan);
            ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: qloi }, () => {
                $("#tong_tien_yc").html(ESUtil.formatMoney(tongChiPhiLan(lan)));
            });
            showModalChinh();
        });
        _notifyService.success("Lưu chi phí thành công");
        if (callback) {
            callback(res);
        }
    });
}
function bindImagesTab2(arrAnh) {
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
function getAnhChiTietTab2(so_id, bt, extension) {
    if (extension == '.pdf') {
        _healthClaimCommonService.layAnhChiTiet({ so_id: so_id, bt: bt }).then(res => {
            callBackViewFileTab2(res);
        });
    } else {
        $('#tai-lieu-tab2').hide();
        $('#img-container-tab-2').show();
    }
}
function anHienTaiLieu(hien = true, callback = undefined) {
    $("#modalDialogTaiLieu").css("display", "none");
    $("#modalDialogTaiLieu").removeClass("active");
    $("#modalDialogThongTin").css("float", "");
    $("#modalDialogThongTin").css("margin", "5px auto");
    if (hien) {
        $("#modalDialogThongTin").css("float", "left");
        $("#modalDialogThongTin").css("margin", "5px");
        $("#modalDialogTaiLieu").addClass("active");
        $("#modalDialogTaiLieu").slideDown(800);
        if (callback) {
            callback();
        }
    }
}
function luuQuyenLoiBoiThuong(callback = undefined) {
    if (!_frmThemQuyenLoiLanTiepNhan.isValid()) {
        return;
    }
    var lan = _frmThemLanTiepNhan.getControl("lan").val();
    if (lan == "") {
        _notifyService.error("Bạn chưa chọn lần khám");
        return;
    }
    var obj = _frmThemQuyenLoiLanTiepNhan.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.lan = lan;
    obj.ghi_chu = $('#ghi_chu_lan_tn').val();
    obj.ghi_chu_khac = $('#ghi_chu_khac_lan_tn').val();
    obj.lh_nv = _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").attr("data-val");
    obj.arr = getTableChiPhi();
    if (obj.arr.length > 0 && obj.tien_yc > obj.arr.sum(n => parseFloat(n.tien_yc))) {
        _notifyService.error("Số tiền yêu cầu không được vượt quá tổng tiền chi phí");
        return;
    }
    _service.ThemHoSoTiepNhanQuyenLoiLan(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmThemQuyenLoiLanTiepNhan.getControl("lan").val(obj.lan);
        _frmThemQuyenLoiLanTiepNhan.getControl("id_qloi").val(res.out_value.id_qloi);
        layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {

            if (resDetail !== undefined && resDetail !== null && resDetail.state_info.status === "NotOK") {
                _notifyService.error(resDetail.state_info.message_body);
                return;
            }

            $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
            $("#tong_tien_yc").html("0");
            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
            });
            ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
            ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                XemChiTietLan(lan);
            });

            var id_qloi = _frmThemQuyenLoiLanTiepNhan.getControl('id_qloi').getValue();
            var arrChiPhi = ho_so_chi_tiet.chi_phi.where(n => n.id_qloi == id_qloi && n.lan == lan);
            ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: arrChiPhi }, () => {
                if (arrChiPhi != null && arrChiPhi.length > 0) {
                    var tong = arrChiPhi.sum(n => n.tien_yc);
                    $("#tong_chphi_tien_yc").html(ESUtil.formatMoney(tong));
                    _frmThemQuyenLoiLanTiepNhan.getControl('tien_yc').val(ESUtil.formatMoney(tong));
                }
            });
            if (callback) {
                callback(resDetail)
            }

        });
        getPaging(1);
        _notifyService.success("Lưu quyền lợi thành công.");
    });
}
function xoaSelectAnh() {
    $("input[name='ds_anh_xe']").prop("checked", false);
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
function luuLanTiepNhan(callback = undefined) {
    if (!_frmThemLanTiepNhan.isValid()) {
        return;
    }
    var obj = _frmThemLanTiepNhan.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.benh_vien = _frmThemLanTiepNhan.getControl("benh_vien").attr("data-val");
    obj.nha_thuoc = _frmThemLanTiepNhan.getControl("nha_thuoc").attr("data-val");
    _service.kiemTraTrungLanTiepNhan(obj).then(res_ktra => {
        if (res_ktra.state_info.status !== 'OK') {
            _notifyService.error(res_ktra.state_info.message_body);
            return;
        }
        if (res_ktra.out_value.kiem_tra != '' && res_ktra.out_value.kiem_tra != null && res_ktra.out_value.kiem_tra != undefined && res_ktra.out_value.kiem_tra > 0) {
            _notifyService.confirm("Đã có hồ sơ " + res_ktra.out_value.so_hs + " được khai báo mở cùng bệnh viện trong ngày hôm nay, bạn có muốn tiếp tục thêm lần này?", "", () => {
                _service.ThemHoSoTiepNhanLan(obj).then(res => {
                    if (res.state_info.status != 'OK') {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Lưu lần tiếp nhận thành công.");
                    layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
                        $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
                        $("#tong_tien_yc").html("0");
                        ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
                        ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                            XemChiTietLan(res.out_value.lan);
                            if (callback) {
                                callback();
                            }
                        });
                    });
                });
            });
        } else {
            _service.ThemHoSoTiepNhanLan(obj).then(res => {
                if (res.state_info.status != 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu lần tiếp nhận thành công.");
                layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
                    $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
                    $("#tong_tien_yc").html("0");
                    ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
                    ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                        XemChiTietLan(res.out_value.lan);
                        if (callback) {
                            callback();
                        }
                    });
                });
            });
        }
    });
}
function tinhSoNgay() {
    var ngay_vv = _frmThemLanTiepNhan.getControl("ngay_vv").val();
    var ngay_rv = _frmThemLanTiepNhan.getControl("ngay_rv").val();
    var gio_vv = _frmThemLanTiepNhan.getControl("gio_vv").val();
    var gio_rv = _frmThemLanTiepNhan.getControl("gio_rv").val();
    var so_ngay = ESUtil.getDifferenceInDaysAndHours(ngay_vv, ngay_rv, gio_vv, gio_rv);
    if (so_ngay < 0) {
        _notifyService.error("Ngày vào viện không thể sau ngày ra viện");
        return;
    } else if (so_ngay == 0) {
        $('.canh_bao_ngay_nam_vien').css("display", "inline-block");
    } else {
        $('.canh_bao_ngay_nam_vien').css("display", "none");
    }
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
function showGhiChuBoSungHSGT(el) {
    _popoverGhiChuBoSungHSGT.options = { placement: "bottom bottom-right" };
    $("#divGhiChuBoSungHSGT_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChuBoSungHSGT_NoiDung").val(val);
    _popoverGhiChuBoSungHSGT.showWithPosition(el);
}
function copyText(el) {
    var text = $(el).html();
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy số hồ sơ thành công")
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac: arr[0],
        so_id: arr[1]
    };
    rowClick(data);
}
function TransHealthguaranteeDisplay(ma_doi_tac, so_id, hanh_dong) {
    var data = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_BL'
    };
    var notify_url = "/healthclaim/healthguarantee";
    window.open("/HealthClaim/HealthClaimCommon/TransHealthguaranteeDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
}
function TransReceiveDisplay(ma_doi_tac, so_id, hanh_dong) {
    var data = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_TN'
    };
    var notify_url = "/healthclaim/receive";
    window.open("/HealthClaim/HealthClaimCommon/TransReceiveDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
}
function TransHealthcompensationDisplay(ma_doi_tac, so_id, hanh_dong) {
    var data = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        hanh_dong: 'XEM_CTIET_HO_SO_TT'
    };
    var notify_url = "/healthclaim/healthcompensation";
    window.open("/HealthClaim/HealthClaimCommon/TransReceiveDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
}
//---Code xem toàn bộ thông tin hồ sơ---
function xemToanBoThongTinHoSoBoiThuong() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        pm: 'HSTT'
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
        thong_tin_toan_bo_ho_so.lan_kham = resHoSo.data_info.lan_kham;
        thong_tin_toan_bo_ho_so.lan_kham_qloi = resHoSo.data_info.lan_kham_qloi;
        ESUtil.genHTML("tblToanBoThongTinChungHoSoConNguoi_template", "tblToanBoThongTinChungHoSoConNguoi", { ho_so: resHoSo.data_info.ho_so });
        ESUtil.genHTML("tblToanBoThongTinGiayChungNhanConNguoi_template", "tblToanBoThongTinGiayChungNhanConNguoi", { gcn: resHoSo.data_info.gcn.firstOrDefault() });
        ESUtil.genHTML("tblToanBoThongTinChiTietGiayChungNhanConNguoi_template", "tblToanBoThongTinChiTietGiayChungNhanConNguoi", { data: resHoSo.data_info.gcn_ql });
        ESUtil.genHTML("tblToanBoThongTinHoSoGiayToConNguoi_template", "tblToanBoThongTinHoSoGiayToConNguoi", { data: resHoSo.data_info.ho_so_giay_to });
        ESUtil.genHTML("tblToanBoThongTinKhamChuaBenhYCBHConNguoi_template", "tblToanBoThongTinKhamChuaBenhYCBHConNguoi", { data: resHoSo.data_info.lan_kham });
        ESUtil.genHTML("tblToanBoThongTinHoaDonChungTuConNguoi_template", "tblToanBoThongTinHoaDonChungTuConNguoi", { data: resHoSo.data_info.chung_tu });
        var chung_tu_tong_tien = chung_tu_tong_thue = chung_tu_tong_cong = 0;
        $.each(resHoSo.data_info.chung_tu, function (index, item) {
            chung_tu_tong_tien += item.tien;
            chung_tu_tong_thue += item.thue;
            chung_tu_tong_cong += item.tong_cong;
        });
        $('#tongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_tien));
        $('#tongTienThueHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_thue));
        $('#tongCongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_cong));
        ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi_template", "tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi", { data: resHoSo.data_info.thu_huong });
        var thu_huong_tong = 0;
        $.each(resHoSo.data_info.thu_huong, function (index, item) {
            thu_huong_tong += item.tien;
        });
        $('#tongSoTienThuHuong_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(thu_huong_tong));

        ESUtil.genHTML("tblToanBoThongTinLichSuTonThatConNguoi_template", "tblToanBoThongTinLichSuTonThatConNguoi", { arrHoSo: resHoSo.data_info.lich_su_ton_that }, () => {
            var tong_yc = 0, tong_duyet = 0;
            $.each(resHoSo.data_info.lich_su_ton_that, (index, item) => {
                tong_yc += parseFloat(item.so_tien_yc);
                tong_duyet += parseFloat(item.so_tien_duyet);
            });
            $('#tongTienYeuCau_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_yc));
            $('#tongTienDuyet_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_duyet));
        });
        ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi_template", "tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi", { data: resHoSo.data_info.qua_trinh_xly });
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
        arrAnhTL = bindImagesToanBoAnhHoSo(arrAnhTL);
        console.log(arrAnhTL);
        arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);
        arrPDF = bindImagesToanBoAnhHoSo(arrPDF);
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
        _modalDocumentService.setDataSource(sourceMauIn);
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
        $("#anHienTabThongTinChungConNguoi").trigger('click');
        $("#anHienTabThongTinHoaDonChungTuConNguoi").addClass("d-none");

        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinChungConNguoi").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("li:nth-child(2) > a").addClass("active");
        showStepThongTinHoSoBoiThuong("tabToanBoThongTinChungConNguoi");
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
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").readOnly(true);
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").setValue("NOI_BO");
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").trigger("select2:select");
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoiConNguoi_template", "tblDanhSachCanBoThamGiaTraoDoiConNguoi", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoiConNguoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiConNguoi').html("");
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
        getPagingListImages(1, "TL", () => { initImageViewerToanBoAnhConNguoi(); });
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
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhConNguoi(); });
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
//---Ảnh---
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
        _healthCareGuaranteeService.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.ho_so.so_id_hd,
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
    }
    _modalXemHinhAnhHangMucTonThat.show();
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
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        loai: loai,
        nv: 'NG'
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
function xemChiTietHinhAnhHoSo(el) {
    _modalXemHinhAnhChiTiet.show();
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
function xemToanBoHinhAnhHoSoBoiThuong(loai, hang_muc) {
    var data = {
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: 'NG',
        hang_muc: hang_muc,
        loai: loai
    }
    window.open("/ViewImages?so_id=" + data.so_id + "&nv=" + data.nv + "&hm=" + data.hang_muc + "&loai=" + data.loai, '_blank');
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
function xemThongTinGiayChungNhan() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        ma_chi_nhanh_ql: ho_so_chi_tiet.ho_so.ma_chi_nhanh_ql,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        nv: "NG"
    };
    _service.base.all([
        _healthClaimCommonService.getContract(obj),
        _healthClaimCommonService.xemTinhTrangTTPhi(obj)
    ]).then(arrRes => {
        var res1 = arrRes[0];
        var res2 = arrRes[1];
        if (res1.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res1.data_info !== null) {
            res1.data_info.tong_phi_hthi = ESUtil.formatMoney(res1.data_info.ho_so.tong_phi);
            $("#tblHealthCommonCertificate").bindJsonToHtml(res1.data_info.ho_so);

            ESUtil.genHTML("dsXacMinhPhiLaySoHS_template", "dsXacMinhPhiLaySoHS", { danh_sach: res2.data_info });
            _modalXemThongTinChungNhan.show();
        }
    });
}
function xemChiTietSuDung(lh_nv) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        lh_nv: lh_nv
    }
    _healthClaimCommonService.layHoSoQLoiDaDung(obj).then(res => {
        if (res.state_info.status !== 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML('bodyDsHoSoQLDaDungTemplate', 'bodyDsHoSoQLDaDung', { data: res.data_info });
        _modalQuyenLoiDaDung.show();
    });
}
function xemHoSoConNguoi(so_id, nguon) {
    if (nguon == 'BLVP') {
        var data = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: so_id,
            hanh_dong: 'XEM_CTIET_HO_SO_BL'
        };
        var notify_url = "/healthclaim/healthguarantee";
        window.open("/healthclaim/healthclaimcommon/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    } else if (nguon == 'HSTT') {
        var data = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: so_id,
            hanh_dong: 'XEM_CTIET_HO_SO_BT'
        };
        var notify_url = "/healthclaim/healthcompensation";
        window.open("/healthclaim/healthclaimcommon/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_blank');
    }
}
function xemThongTinQuyenLoiLSTT(ma_doi_tac, ma_chi_nhanh, ma_doi_tac_ql, so_id_hd, so_id_dt) {
    var hd_cu = $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_hd_cu");
    if (hd_cu == 'C') {
        var obj_gcn = {
            ma_doi_tac_ql: ma_doi_tac_ql,
            ma_chi_nhanh: ma_chi_nhanh,
            so_id_hd: so_id_hd,
            so_id_gcn: so_id_dt
        }
        _healthClaimCommonService.layThongTinGCN(obj_gcn).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != null && res.data_info != undefined) {
                var obj = {
                    ma_doi_tac: ma_doi_tac,
                    ma_doi_tac_ql: ma_doi_tac_ql,
                    so_id_hd: so_id_hd,
                    so_id_dt: so_id_dt
                }
                _service.base.all([
                    _healthClaimCommonService.xemThongTinQuyenLoiBaoHiem(obj),
                    _service.layLSTT(obj)
                ]).then(arrRes => {
                    var res_qlg = arrRes[0];
                    var res_lstt = arrRes[1];
                    if (res_qlg.state_info.status !== 'OK') {
                        _notifyService.error(res_qlg.state_info.message_body);
                        return;
                    }
                    if (res_lstt.state_info.status !== 'OK') {
                        _notifyService.error(res_lstt.state_info.message_body);
                        return;
                    }
                    ESUtil.genHTML('tblDanhSachQuyenLoiGocTemplate', 'tblDanhSachQuyenLoiGoc', { lstQlg: res_qlg.data_info });
                    _modalXemThongTinQuyenLoiLSTT.show();
                    _navThongTinQuyenLoiLSTT.showTab("tabQuyenLoiBaoHiem");

                    ESUtil.genHTML('tblDanhSachLichSuBoiThuongTemplate', 'tblDanhSachLichSuBoiThuong', { arrHoSo: res_lstt.data_info.ho_so });
                });
            } else {
                _notifyService.error('Hồ sơ cũ chưa được tích hợp vào hệ thống');
                return;
            }
        })
    } else if (hd_cu == 'M' || hd_cu == '') {
        var objTichHop = {
            ma_chi_nhanh: ma_chi_nhanh,
            so_id_hd: so_id_hd,
            so_id_gcn: so_id_dt
        }
        _healthClaimCommonService.tichHopConNguoi(objTichHop).then(resTichHop => {
            if (resTichHop.state_info.status !== "OK") {
                _notifyService.error(resTichHop.state_info.message_body);
                return;
            }
            var obj = {
                ma_doi_tac: ma_doi_tac,
                ma_doi_tac_ql: ma_doi_tac_ql,
                so_id_hd: so_id_hd,
                so_id_dt: so_id_dt
            }
            _service.base.all([
                _healthClaimCommonService.xemThongTinQuyenLoiBaoHiem(obj),
                _service.layLSTT(obj)
            ]).then(arrRes => {
                var res_qlg = arrRes[0];
                var res_lstt = arrRes[1];
                if (res_qlg.state_info.status !== 'OK') {
                    _notifyService.error(res_qlg.state_info.message_body);
                    return;
                }
                if (res_lstt.state_info.status !== 'OK') {
                    _notifyService.error(res_lstt.state_info.message_body);
                    return;
                }
                ESUtil.genHTML('tblDanhSachQuyenLoiGocTemplate', 'tblDanhSachQuyenLoiGoc', { lstQlg: res_qlg.data_info });
                _modalXemThongTinQuyenLoiLSTT.show();
                _navThongTinQuyenLoiLSTT.showTab("tabQuyenLoiBaoHiem");

                ESUtil.genHTML('tblDanhSachLichSuBoiThuongTemplate', 'tblDanhSachLichSuBoiThuong', { arrHoSo: res_lstt.data_info.ho_so });
            });
        });
    }
}
function unique_arr(arr) {
    var newArr = []
    newArr = arr.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item)
    })
    return newArr;
}
function onChonGCN(so_id_hd, so_id_dt, gioi_tinh, ngay_sinh, ngay_hl, ten) {
    $("#modalHealthSearchDsGCN .tkiem_gcn").removeClass("active");
    $("#modalHealthSearchDsGCN #tkiem_gcn_" + so_id_hd + "_" + so_id_dt).addClass("active");
    var hd_cu = $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_hd_cu");
    if (hd_cu == 'C') {
        var obj = {
            ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
            ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
            so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
            so_id_gcn: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn")
        }
        _healthClaimCommonService.layThongTinGCN(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != null && res.data_info != undefined) {
                data_gcn_chon = {
                    ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
                    so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
                    so_id_dt: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn"),
                    ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
                    ten_ndbh: res.data_info.ten,
                    san_pham: res.data_info.lhnv,
                    goi_bh: res.data_info.so_id_goi_bh,
                    gioi_tinh: res.data_info.gioi_tinh,
                    ngay_sinh: res.data_info.ngay_sinh,
                    ngay_hl: res.data_info.ngay_hl
                }
            } else {
                data_gcn_chon = {
                    ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
                    so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
                    so_id_dt: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn"),
                    ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
                    ten_ndbh: ten,
                    san_pham: '',
                    goi_bh: '',
                    gioi_tinh: gioi_tinh,
                    ngay_sinh: ngay_sinh,
                    ngay_hl: ngay_hl.dateToNumber()
                }
            }
        });
    } else if (hd_cu == 'M') {
        data_gcn_chon = {
            ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
            so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
            so_id_dt: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn"),
            ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql")
        }
    }
}
function capNhatUocTonThat(el) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
        so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        pm: 'TN'
    };
    _healthClaimCommon.showUocTonThatNguoi(obj, el);
}
function laySoHS() {
    _notifyService.confirm("Bạn có chắc chắn muốn lấy hồ sơ không?", "", () => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            hanh_dong: "LAY_SO_HS"
        }
        _healthClaimCommonService.tichHopCN(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ho_so_chi_tiet.ho_so.so_hs = res.out_value.so_hs;
            if (ho_so_chi_tiet.ho_so.so_hs != undefined && ho_so_chi_tiet.ho_so.so_hs != null && ho_so_chi_tiet.ho_so.so_hs.trim() != "") {
                $('#titleReceiveSoHoSo').html("<a href='#' onclick='copyText(this)'>" + ho_so_chi_tiet.ho_so.so_hs + "</a>" + " - " + ho_so_chi_tiet.ho_so.nsd);
            }
            else {
                $('#titleReceiveSoHoSo').html("<a href='#' onclick='laySoHS()'>Lấy số hồ sơ</a>" + " - " + ho_so_chi_tiet.ho_so.nsd);
            }
            _notifyService.success("Lấy số hồ sơ thành công");
        });
    });
}
function huyHoSo() {
    _frmLyDoHuyHoSo.clearErrorMessage();
    _frmLyDoHuyHoSo.resetForm();
    _modalHuyHoSo.show();
}
function goHuyHoSo() {
    _notifyService.confirm("Bạn có chắc gỡ hủy hồ sơ này không?", "", () => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }
        _service.goHuyHoSoTiepNhan(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Gỡ hủy hồ sơ thành công.");
            layHoSoCTiet(obj, res => {
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                    ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                });
                ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", ho_so_chi_tiet);
            });
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
            getPaging(1);
        });
    });
}
function chuyenNguoiXuLy() {
    bindDataChuyenNguoiXuLy(ho_so_chi_tiet.ho_so.ma_doi_tac, ho_so_chi_tiet.ho_so.so_id);
    _modalChuyenNguoiXuLy.show();
}
function suaThongTinNguoiLienHe() {
    _frmThongTinNguoiLienHe.resetForm();
    _frmThongTinNguoiLienHe.clearErrorMessage();
    var obj = ESUtil.cloneObject(ho_so_chi_tiet.ho_so);
    _frmThongTinNguoiLienHe.setData(obj);
    _modalThongTinNguoiLienHe.show();
}
function suaThongTinNguoiThongBao() {
    _frmThongTinNguoiThongBao.resetForm();
    _frmThongTinNguoiThongBao.clearErrorMessage();
    var obj = ESUtil.cloneObject(ho_so_chi_tiet.ho_so);
    _frmThongTinNguoiThongBao.setData(obj);
    _modalThongTinNguoiThongBao.show();
}
function luuThayDoiNguoiLienHe(callback = undefined) {
    if (!_frmThongTinNguoiLienHe.isValid()) {
        return;
    }
    var obj = _frmThongTinNguoiLienHe.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.pm = "HSTT";
    _healthClaimCommonService.suaThongTinNguoiLH(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getPaging(1);
        layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", resDetail.data_info, () => {
                ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
            });
            ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.canh_bao });
            _healthClaimCommonService.danhSachCanhBao(data).then(res1 => {
                ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
            });
        });
        _notifyService.success("Cập nhật thông tin người liên hệ thành công.");
        if (callback) {
            callback(res);
        }
    });
}
function luuThayDoiNguoiThongBao(callback = undefined) {
    if (!_frmThongTinNguoiThongBao.isValid()) {
        return;
    }
    var obj = _frmThongTinNguoiThongBao.getJsonData();
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.pm = "HSTT";
    _healthClaimCommonService.suaThongTinNguoiTB(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getPaging(1);
        layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", resDetail.data_info, () => {
                ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
            });
            ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.canh_bao });
            _healthClaimCommonService.danhSachCanhBao(obj).then(res1 => {
                ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
            });
        });
        _notifyService.success("Cập nhật thông tin người thông báo thành công.");
        if (callback) {
            callback(res);
        }
    });
}
function updateTrangThaiHsGoc() {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        pm: CONSTANT_PM,
        trang_thai_hs_goc: $("#trang_thai_hs_goc_chk").is(":checked") ? "D" : "C"
    };
    var check = ho_so_chi_tiet.ho_so.trang_thai_hs_goc == undefined || ho_so_chi_tiet.ho_so.trang_thai_hs_goc == null || ho_so_chi_tiet.ho_so.trang_thai_hs_goc == "" || ho_so_chi_tiet.ho_so.trang_thai_hs_goc == "C";
    $("#trang_thai_hs_goc_chk").prop("checked", !check);
    new HealthClaimCommonService().updateTrangThaiHsGoc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (obj.trang_thai_hs_goc == "D") {
            $("#trang_thai_hs_goc_chk").prop("checked", true);
        }
        else {
            $("#trang_thai_hs_goc_chk").prop("checked", false);
        }
        ho_so_chi_tiet.ho_so.trang_thai_hs_goc = obj.trang_thai_hs_goc;
        layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
            ESUtil.genHTML("danhSachCanhBaoTemplate", "divThongBaoCanhBao", { danh_sach: ho_so_chi_tiet.canh_bao });
            _healthClaimCommonService.danhSachCanhBao({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }).then(res1 => {
                ESUtil.genHTML("canhBao_template", "canhBao", { danh_sach: res1.data_info });
            });
        });
        _notifyService.success("Cập nhật trạng thái bổ sung hồ sơ gốc thành công");
        getPaging(1);
    });
}
function copyDataVal(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
function onChonTrangThai(el) {
    var checked = $(el).is(":checked");
    var hang_muc = $(el).closest("tr").find('input.input_chon_hsgt_bs').is(":checked");
    if (checked == true && hang_muc == true) {
        $(el).closest("tr").find('input.input_chon_hsgt_bs').prop("checked", false);
    }
    if (checked == true) {
        $(el).closest("tr").find('input.input_chon_hsgt_bs').prop("disabled", true);
    } else {
        $(el).closest("tr").find('input.input_chon_hsgt_bs').prop("disabled", false);
    }
}
function onChonBoSungHS(el) {
    var checked = $(el).is(":checked");
    $(el).prop("disabled", false);
    var trang_thai = $(el).closest("tr").find('input.input_chon_trang_thai').is(":checked");
    if (trang_thai == true) {
        $(el).prop("disabled", true);
    }
}
function xemNoiDungKhachHangXacNhan() {
    _frmmodalXemNoiDungKhachHangXN.resetForm();
    _frmmodalXemNoiDungKhachHangXN.clearErrorMessage();
    var noi_dung = ho_so_chi_tiet.ho_so.noi_dung_xac_nhan;
    var y_kien = ho_so_chi_tiet.ho_so.y_kien_phan_hoi;
    if (noi_dung == null || noi_dung.trim() == "" || noi_dung == undefined) {
        _notifyService.error("Khách hàng chưa xác nhận phương án bồi thường !");
        return;
    }
    if (noi_dung != null && noi_dung != "") {
        _frmmodalXemNoiDungKhachHangXN.getControl("noi_dung").val(noi_dung);
    }
    if (y_kien != null && y_kien != "") {
        _frmmodalXemNoiDungKhachHangXN.getControl("noi_dung_phan_hoi").val(y_kien);
    }
    _modalXemNoiDungKhachHangXN.show();
}
function getAnhChiTietTab1(so_id, bt, extension) {
    if (extension == '.pdf') {
        _healthClaimCommonService.layAnhChiTiet({ so_id: so_id, bt: bt }).then(res => {
            callBackViewFileTab1(res);
        });
    } else {
        $('#tai-lieu-tab1').hide();
        $('#img-container-tab-1').show();
    }
}
//Đọc OCR giấy tờ sức khỏe
function fillterDuLieuGiayToCauHinh(arr) {
    var result = [];
    arr.map(item => {
        if (item.hang_muc != null && item.hang_muc != "") {
            if (result.find(object => {
                var value = object.hang_muc;
                if (value.toUpperCase() === item.hang_muc) {
                    return true;
                } else {
                    return false;
                }
            })) {
            } else {
                result.push(item);
            }
        }
    });
    return result;
}
//--Lấy dữ liệu
function layDuLieuGiayToOCR() {
    var otArr = [];
    $("#modalCompareDataOCRGiayTo tr.row_item").each(function (e) {
        var json = { loai: "", gia_tri: "" };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        if (json.loai != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuBangKeOCR() {
    var otArr = [];
    $("#modalCompareDataOCRBangKeChiTiet tr.row_item").each(function (e) {
        var json = { ten_dich_vu: "", don_gia: "" };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        if (json.don_gia != '' && json.don_gia != 0) {
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuHoaDonOCR() {
    var otArr = [];
    $("#modalCompareDataOCRHoaDonChiTiet tr.row_item").each(function (e) {
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
//--Chọn dữ liệu
function onCheckedAll(el) {
    $(".images-ocr").prop("checked", false);
    var check = $(el).is(":checked");
    if (check == true) {
        $(".images-ocr").prop("checked", true);
    }
}
function onChonDuLieuOCR(el, val) {
    var count_item = $(".ocr_item").length;
    var count_checked = $(".ocr_item:checked").length;
    $("#ocr_chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#ocr_chon_tat_ca").prop("checked", true);
    var data = layDuLieuGiayToOCR();
    var hs = data.where(n => n.loai == val).firstOrDefault();
    var count = arrThongTinOCRGiayTo.where(n => n.loai == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrThongTinOCRGiayTo.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrThongTinOCRGiayTo = arrThongTinOCRGiayTo.removeItem(n => n.loai == val);
    }
}
function onChonTatCa(el) {
    arrThongTinOCRGiayTo = [];
    var checked = $(el).is(":checked");
    $(".ocr_item").prop("checked", checked);
    var data = layDuLieuGiayToOCR();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.loai == data[i].loai).firstOrDefault();
            var count = arrThongTinOCRGiayTo.where(n => n.loai == data[i].loai).length;
            if (checked && count <= 0) {
                arrThongTinOCRGiayTo.push(hs);
            }
            if (!checked && count > 0) {
                arrThongTinOCRGiayTo = arrThongTinOCRGiayTo.removeItem(n => n.loai == data[i].loai);
            }
        }
    }
}
function chonBenhVienOCR(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    if (val == "" || val == null || val == undefined) {
        $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    }
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    }
    _modalBenhVien.show(el);
}
function onChonBenhVien(el) {
    var target = _modalBenhVien.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
        $(target).val(bv.ten);
        $(target).attr("data-val", bv.ma);
        if ($(target).hasClass("text-danger")) {
            $(target).removeClass("text-danger").addClass("text-primary");
        }
    }
    _modalBenhVien.hide();
}
function onChonAnhOCR(so_id, ma_file, bt) {
    //var obj = {
    //    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
    //    so_id: so_id,
    //    hang_muc: ma_file.split(","),
    //    bt: bt.split(",")
    //};
    //soSanhDuLieuOCR(obj);
}
function capNhatLoaiChiPhi(el) {
    $("#inputTimKiemLoaiChiPhi").focus();
    $("#inputTimKiemLoaiChiPhi").val("");
    $("#modalChonLoaiChiPhiOCRDanhSach .modalChonLoaiChiPhiOCRItem").prop("checked", false);
    var val = $(el).attr("data-val");
    _modalChonLoaiChiPhiOCR.show(el);
}
function onChonLoaiChiPhiOCR(el) {
    var target = _modalChonLoaiChiPhiOCR.target;
    var tr = $(target).parent().parent();
    var ma_chi_phi = $(el).val();
    var loai_chi_phi = $(el).attr("data-loai");
    if (ma_chi_phi != undefined && ma_chi_phi != null) {
        $(target).attr("data-val", ma_chi_phi);
        var chi_phi = objDanhMuc.nhom_chi_phi.where(n => n.ma == ma_chi_phi).firstOrDefault();
        $(target).html(chi_phi.ten);
        tr.find("input[data-field='loai_chi_phi']").val(loai_chi_phi);
        tr.find("input[data-field='ten_chi_phi']").val(chi_phi.ten);
    }
    _modalChonLoaiChiPhiOCR.hide();
}
function suaNoiDungOCR(el) {
    var value = $(el).val();
    $(el).attr("data-val", value);
}
//--Image
function getImageOCR() {
    var arrVal = [];
    $("input:checkbox[name='ocr_image']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function getHangMucOCR() {
    var arrVal = [];
    $("input:checkbox[name='ocr_image']:checked").each(function () {
        arrVal.push($(this).attr("data-ma-file"));
    });
    return arrVal;
}
function onToggleImageOCR(index) {
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
function bindImageOCR(arrAnh) {
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
//--Fillter dữ liệu OCR
function chuanHoaDuLieuOCRText(arr) {
    var result = [];
    arr.map(item => {
        if (item.gia_tri != null && item.gia_tri != "" && item.gia_tri != undefined) {
            var gia_tri = ESUtil.xoaKhoangTrangText(item.gia_tri);
            if (result.find(object => {
                var value = ESUtil.xoaKhoangTrangText(object.gia_tri);
                if (value.toUpperCase() === gia_tri.toUpperCase()) {
                    return true;
                } else {
                    return false;
                }
            })) {
            } else {
                result.push(item);
            }
        }
    });
    return result;
}
function chuanHoaDuLieuOCRNumber(arr) {
    var result = [];
    arr.map(item => {
        if (item.gia_tri != null && item.gia_tri != "" && item.gia_tri != undefined) {
            var gia_tri = ESUtil.xoaKhoangTrangText(item.gia_tri);
            if (result.find(object => {
                var value = ESUtil.xoaKhoangTrangText(object.gia_tri);
                if (value.replace(/[^0-9]+/g, '') === gia_tri.replace(/[^0-9]+/g, '')) {
                    return true;
                } else {
                    return false;
                }
            })) {
            } else {
                result.push(item);
            }
        }
    });
    return result;
}
function chuanHoaDuLieuOCRDatetime(arr) {
    var result = [];
    $.each(arr, function (index, item) {
        if (item.gia_tri != null && item.gia_tri != "" && item.gia_tri != undefined) {
            var val = ESUtil.checkDateIsValid(item.gia_tri);
            if (val) {
                result.push(item);
            }
        }
    });
    return result;
}
//--Sử dụng dữ liệu
function soSanhDuLieuOCR(obj, callback = undefined) {
    var arr = [];
    _healthClaimCommonService.layThongTinDuLieuOCR(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.data;
        var ho_so = res.data_info.ho_so;
        var bang_ke = res.data_info.bang_ke;
        var hoa_don = res.data_info.hoa_don;
        var HOA_DON = data.where(n => n.nhom == "INVOICE");
        if (bang_ke.length > 0) {
            $("#modalFormBangKeChiTiet").removeClass("d-none");
            ESUtil.genHTML("modalCompareDataOCRBangKeChiTietTemplate", "modalCompareDataOCRBangKeChiTiet", { data: bang_ke });
        }
        if (hoa_don.length > 0) {
            $("#modalFormHoaDonChiTiet").removeClass("d-none");
            ESUtil.genHTML("modalCompareDataOCRHoaDonChiTietTemplate", "modalCompareDataOCRHoaDonChiTiet", { data: hoa_don });
        }
        if (data.length > 0) {
            var HO_TEN = chuanHoaDuLieuOCRText(data.where(n => n.loai == "HO_TEN"));
            var NGAY_SINH = chuanHoaDuLieuOCRDatetime(chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "NGAY_SINH")));
            var GIOI_TINH = chuanHoaDuLieuOCRText(data.where(n => n.loai == "GIOI_TINH"));
            var DIA_CHI = chuanHoaDuLieuOCRText(data.where(n => n.loai == "DIA_CHI"));
            var DIEN_THOAI = chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "DIEN_THOAI"));
            var EMAIL = chuanHoaDuLieuOCRText(data.where(n => n.loai == "EMAIL"));
            var NGUOI_YC = chuanHoaDuLieuOCRText(data.where(n => n.loai == "HO_TEN_NGUOI_YC"));
            var EMAIL_YC = chuanHoaDuLieuOCRText(data.where(n => n.loai == "EMAIL_NGUOI_YC"));
            var SDT_YC = chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "SDT_NGUOI_YC"));
            var BENH_VIEN = chuanHoaDuLieuOCRText(data.where(n => n.loai == "BENH_VIEN"));
            var NGAY_VV = chuanHoaDuLieuOCRDatetime(chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "NGAY_VV")));
            var NGAY_RV = chuanHoaDuLieuOCRDatetime(chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "NGAY_RV")));
            var CHAN_DOAN = chuanHoaDuLieuOCRText(data.where(n => n.loai == "CHAN_DOAN"));
            var HINH_THUC = chuanHoaDuLieuOCRText(data.where(n => n.loai == "HINH_THUC"));
            var ICD = chuanHoaDuLieuOCRText(data.where(n => n.loai == "MA_ICD"));
            var NGAN_HANG = chuanHoaDuLieuOCRText(data.where(n => n.loai == "TEN_NGAN_HANG"));
            var STK = chuanHoaDuLieuOCRText(data.where(n => n.loai == "STK"));
            var THU_HUONG = chuanHoaDuLieuOCRText(data.where(n => n.loai == "NGUOI_THU_HUONG"));
            var TIEN_YC = chuanHoaDuLieuOCRNumber(data.where(n => n.loai == "TONG_TIEN_YC"));

            if (BENH_VIEN.length > 0) {
                var ten_benh_vien = BENH_VIEN.where(n => n.loai == 'BENH_VIEN').firstOrDefault().gia_tri;
                var benh_vien = objDanhMuc.benh_vien.where(n => ESUtil.xoaKhoangTrangText(n.ten) == ESUtil.xoaKhoangTrangText(ten_benh_vien.toLowerCase()));
                if (benh_vien.length > 0) {
                    var ma_bv = benh_vien[0].ma;
                }
            }
            if (HO_TEN.length > 0) {
                var ho_ten = {
                    loai: "HO_TEN",
                    noi_dung: "Họ và tên",
                    nd_goc: ho_so.ten == null || ho_so.ten == '' ? 'Chưa có dữ liệu' : ho_so.ten,
                    nd_ocr: HO_TEN.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == null || HO_TEN.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : HO_TEN.where(n => n.loai == 'HO_TEN').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ho_ten.so_sanh = ESUtil.compareText(ho_ten.nd_goc, ho_ten.nd_ocr);
            } else {
                var ho_ten = {
                    loai: "HO_TEN",
                    noi_dung: "Họ và tên",
                    nd_goc: ho_so.ten == null || ho_so.ten == '' ? 'Chưa có dữ liệu' : ho_so.ten,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false,
                };
                ho_ten.so_sanh = ESUtil.compareText(ho_ten.nd_goc, ho_ten.nd_ocr);
            }
            if (NGAY_SINH.length > 0) {
                var ngay_sinh = {
                    loai: "NGAY_SINH",
                    noi_dung: "Ngày sinh",
                    nd_goc: ho_so.ngay_sinh == null || ho_so.ngay_sinh == '' ? 'Chưa có dữ liệu' : ho_so.ngay_sinh,
                    nd_ocr: NGAY_SINH.where(n => n.loai == 'NGAY_SINH').firstOrDefault().gia_tri == null || NGAY_SINH.where(n => n.loai == 'NGAY_SINH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : NGAY_SINH.where(n => n.loai == 'NGAY_SINH').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ngay_sinh.so_sanh = ESUtil.compareStringDate(ngay_sinh.nd_goc, ngay_sinh.nd_ocr);
            } else {
                var ngay_sinh = {
                    loai: "NGAY_SINH",
                    noi_dung: "Ngày sinh",
                    nd_goc: ho_so.ngay_sinh == null || ho_so.ngay_sinh == '' ? 'Chưa có dữ liệu' : ho_so.ngay_sinh,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                ngay_sinh.so_sanh = ESUtil.compareStringDate(ngay_sinh.nd_goc, ngay_sinh.nd_ocr);
            }
            if (GIOI_TINH.length > 0) {
                var gioi_tinh = {
                    loai: "GIOI_TINH",
                    noi_dung: "Giới tính",
                    nd_goc: ho_so.gioi_tinh == null || ho_so.gioi_tinh == '' ? 'Chưa có dữ liệu' : ho_so.gioi_tinh,
                    nd_ocr: GIOI_TINH.where(n => n.loai == 'GIOI_TINH').firstOrDefault().gia_tri == null || GIOI_TINH.where(n => n.loai == 'GIOI_TINH').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : GIOI_TINH.where(n => n.loai == 'GIOI_TINH').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                gioi_tinh.so_sanh = ESUtil.compareText(gioi_tinh.nd_goc, gioi_tinh.nd_ocr);
            } else {
                var gioi_tinh = {
                    loai: "GIOI_TINH",
                    noi_dung: "Giới tính",
                    nd_goc: ho_so.gioi_tinh == null || ho_so.gioi_tinh == '' ? 'Chưa có dữ liệu' : ho_so.gioi_tinh,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                gioi_tinh.so_sanh = ESUtil.compareText(gioi_tinh.nd_goc, gioi_tinh.nd_ocr);
            }
            if (DIA_CHI.length > 0) {
                var dia_chi = {
                    loai: "DIA_CHI",
                    noi_dung: "Địa chỉ",
                    nd_goc: ho_so.dchi == null || ho_so.dchi == '' ? 'Chưa có dữ liệu' : ho_so.dchi,
                    nd_ocr: DIA_CHI.where(n => n.loai == 'DIA_CHI').firstOrDefault().gia_tri == null || DIA_CHI.where(n => n.loai == 'DIA_CHI').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : DIA_CHI.where(n => n.loai == 'DIA_CHI').firstOrDefault().gia_tri,
                    so_sanh: false
                };
                dia_chi.so_sanh = ESUtil.compareText(dia_chi.nd_goc, dia_chi.nd_ocr);
            } else {
                var dia_chi = {
                    loai: "DIA_CHI",
                    noi_dung: "Địa chỉ",
                    nd_goc: ho_so.dchi == null || ho_so.dchi == '' ? 'Chưa có dữ liệu' : ho_so.dchi,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: true,
                    so_sanh: false
                };
                dia_chi.so_sanh = ESUtil.compareText(dia_chi.nd_goc, dia_chi.nd_ocr);
            }
            if (DIEN_THOAI.length > 0) {
                var dien_thoai = {
                    loai: "DIEN_THOAI",
                    noi_dung: "Điện thoại",
                    nd_goc: ho_so.dien_thoai == null || ho_so.dien_thoai == '' ? 'Chưa có dữ liệu' : ho_so.dien_thoai,
                    nd_ocr: DIEN_THOAI.where(n => n.loai == 'DIEN_THOAI').firstOrDefault().gia_tri == null || DIEN_THOAI.where(n => n.loai == 'DIEN_THOAI').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : DIEN_THOAI.where(n => n.loai == 'DIEN_THOAI').firstOrDefault().gia_tri,
                    so_sanh: false
                };
                dien_thoai.so_sanh = ESUtil.compareText(dien_thoai.nd_goc, dien_thoai.nd_ocr);
            } else {
                var dien_thoai = {
                    loai: "DIEN_THOAI",
                    noi_dung: "Điện thoại",
                    nd_goc: ho_so.dien_thoai == null || ho_so.dien_thoai == '' ? 'Chưa có dữ liệu' : ho_so.dien_thoai,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                dien_thoai.so_sanh = ESUtil.compareText(dien_thoai.nd_goc, dien_thoai.nd_ocr);
            }
            if (EMAIL.length > 0) {
                var email = {
                    loai: "EMAIL",
                    noi_dung: "Email",
                    nd_goc: ho_so.email == null || ho_so.email == '' ? 'Chưa có dữ liệu' : ho_so.email,
                    nd_ocr: EMAIL.where(n => n.loai == 'EMAIL').firstOrDefault().gia_tri == null || EMAIL.where(n => n.loai == 'EMAIL').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : EMAIL.where(n => n.loai == 'EMAIL').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                email.so_sanh = ESUtil.compareText(email.nd_goc, email.nd_ocr);
            } else {
                var email = {
                    loai: "EMAIL",
                    noi_dung: "Email",
                    nd_goc: ho_so.email == null || ho_so.email == '' ? 'Chưa có dữ liệu' : ho_so.email,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                email.so_sanh = ESUtil.compareText(email.nd_goc, email.nd_ocr);
            }
            if (NGUOI_YC.length > 0) {
                var nguoi_yc = {
                    loai: "HO_TEN_NGUOI_YC",
                    noi_dung: "Người yêu cầu",
                    nd_goc: ho_so.nguoi_yc == null || ho_so.nguoi_yc == '' ? 'Chưa có dữ liệu' : ho_so.nguoi_yc,
                    nd_ocr: NGUOI_YC.where(n => n.loai == 'HO_TEN_NGUOI_YC').firstOrDefault().gia_tri == null || NGUOI_YC.where(n => n.loai == 'HO_TEN_NGUOI_YC').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : NGUOI_YC.where(n => n.loai == 'HO_TEN_NGUOI_YC').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                nguoi_yc.so_sanh = ESUtil.compareText(nguoi_yc.nd_goc, nguoi_yc.nd_ocr);
            } else {
                var nguoi_yc = {
                    loai: "HO_TEN_NGUOI_YC",
                    noi_dung: "Người yêu cầu",
                    nd_goc: ho_so.nguoi_yc == null || ho_so.nguoi_yc == '' ? 'Chưa có dữ liệu' : ho_so.nguoi_yc,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                nguoi_yc.so_sanh = ESUtil.compareText(nguoi_yc.nd_goc, nguoi_yc.nd_ocr);
            }
            if (SDT_YC.length > 0) {
                var sdt_yc = {
                    loai: "SDT_NGUOI_YC",
                    noi_dung: "SĐT người yêu cầu",
                    nd_goc: ho_so.sdt_yc == null || ho_so.sdt_yc == '' ? 'Chưa có dữ liệu' : ho_so.sdt_yc,
                    nd_ocr: SDT_YC.where(n => n.loai == 'SDT_NGUOI_YC').firstOrDefault().gia_tri == null || SDT_YC.where(n => n.loai == 'SDT_NGUOI_YC').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : SDT_YC.where(n => n.loai == 'SDT_NGUOI_YC').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                sdt_yc.so_sanh = ESUtil.compareText(sdt_yc.nd_goc, sdt_yc.nd_ocr);
            } else {
                var sdt_yc = {
                    loai: "SDT_NGUOI_YC",
                    noi_dung: "SĐT người yêu cầu",
                    nd_goc: ho_so.sdt_yc == null || ho_so.sdt_yc == '' ? 'Chưa có dữ liệu' : ho_so.sdt_yc,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                sdt_yc.so_sanh = ESUtil.compareText(sdt_yc.nd_goc, sdt_yc.nd_ocr);
            }
            if (EMAIL_YC.length > 0) {
                var email_yc = {
                    loai: "EMAIL_NGUOI_YC",
                    noi_dung: "Email người yêu cầu",
                    nd_goc: ho_so.email_yc == null || ho_so.email_yc == '' ? 'Chưa có dữ liệu' : ho_so.email_yc,
                    nd_ocr: EMAIL_YC.where(n => n.loai == 'EMAIL_NGUOI_YC').firstOrDefault().gia_tri == null || EMAIL_YC.where(n => n.loai == 'EMAIL_NGUOI_YC').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : EMAIL_YC.where(n => n.loai == 'EMAIL_NGUOI_YC').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                email_yc.so_sanh = ESUtil.compareText(email_yc.nd_goc, email_yc.nd_ocr);
            } else {
                var email_yc = {
                    loai: "EMAIL_NGUOI_YC",
                    noi_dung: "Email người yêu cầu",
                    nd_goc: ho_so.email_yc == null || ho_so.email_yc == '' ? 'Chưa có dữ liệu' : ho_so.email_yc,
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                email_yc.so_sanh = ESUtil.compareText(email_yc.nd_goc, email_yc.nd_ocr);
            }
            if (BENH_VIEN.length > 0) {
                var benh_vien = {
                    loai: "BENH_VIEN",
                    noi_dung: "Bệnh viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: BENH_VIEN.where(n => n.loai == 'BENH_VIEN').firstOrDefault().gia_tri == null || BENH_VIEN.where(n => n.loai == 'BENH_VIEN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : BENH_VIEN.where(n => n.loai == 'BENH_VIEN').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    nd_so_sanh: true,
                    benh_vien: ma_bv,
                    so_sanh: false
                };
                benh_vien.so_sanh = ESUtil.compareText(benh_vien.nd_goc, benh_vien.nd_ocr);
            } else {
                var benh_vien = {
                    loai: "BENH_VIEN",
                    noi_dung: "Bệnh viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    ma_bv: '',
                    so_sanh: false
                };
                benh_vien.so_sanh = ESUtil.compareText(benh_vien.nd_goc, benh_vien.nd_ocr);
            }
            if (NGAY_VV.length > 0) {
                var ngay_vv = {
                    loai: "NGAY_VV",
                    noi_dung: "Ngày vào viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: NGAY_VV.where(n => n.loai == 'NGAY_VV').firstOrDefault().gia_tri == null || NGAY_VV.where(n => n.loai == 'NGAY_VV').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : NGAY_VV.where(n => n.loai == 'NGAY_VV').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ngay_vv.so_sanh = ESUtil.compareStringDate(ngay_vv.nd_goc, ngay_vv.nd_ocr);
            } else {
                var ngay_vv = {
                    loai: "NGAY_VV",
                    noi_dung: "Ngày vào viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                ngay_vv.so_sanh = ESUtil.compareStringDate(ngay_vv.nd_goc, ngay_vv.nd_ocr);
            }
            if (NGAY_RV.length > 0) {
                var ngay_rv = {
                    loai: "NGAY_RV",
                    noi_dung: "Ngày ra viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: NGAY_RV.where(n => n.loai == 'NGAY_RV').firstOrDefault().gia_tri == null || NGAY_RV.where(n => n.loai == 'NGAY_RV').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : NGAY_RV.where(n => n.loai == 'NGAY_RV').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ngay_rv.so_sanh = ESUtil.compareStringDate(ngay_rv.nd_goc, ngay_rv.nd_ocr);
            } else {
                var ngay_rv = {
                    loai: "NGAY_RV",
                    noi_dung: "Ngày ra viện",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                ngay_rv.so_sanh = ESUtil.compareStringDate(ngay_rv.nd_goc, ngay_rv.nd_ocr);
            }
            if (ICD.length > 0) {
                var ma_icd = {
                    loai: "MA_ICD",
                    noi_dung: "Mã bệnh ICD",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: ICD.where(n => n.loai == 'MA_ICD').firstOrDefault().gia_tri == null || ICD.where(n => n.loai == 'MA_ICD').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : ICD.where(n => n.loai == 'MA_ICD').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ma_icd.so_sanh = ESUtil.compareText(ma_icd.nd_goc, ma_icd.nd_ocr);
            } else {
                var ma_icd = {
                    loai: "MA_ICD",
                    noi_dung: "Mã bệnh ICD",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                ma_icd.so_sanh = ESUtil.compareText(ma_icd.nd_goc, ma_icd.nd_ocr);
            }
            if (CHAN_DOAN.length > 0) {
                var chan_doan = {
                    loai: "CHAN_DOAN",
                    noi_dung: "Chẩn đoán",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: CHAN_DOAN.where(n => n.loai == 'CHAN_DOAN').firstOrDefault().gia_tri == null || CHAN_DOAN.where(n => n.loai == 'CHAN_DOAN').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : CHAN_DOAN.where(n => n.loai == 'CHAN_DOAN').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                chan_doan.so_sanh = ESUtil.compareText(chan_doan.nd_goc, chan_doan.nd_ocr);
            } else {
                var chan_doan = {
                    loai: "CHAN_DOAN",
                    noi_dung: "Chẩn đoán",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                chan_doan.so_sanh = ESUtil.compareText(chan_doan.nd_goc, chan_doan.nd_ocr);
            }
            if (HINH_THUC.length > 0) {
                var hinh_thuc = {
                    loai: "HINH_THUC",
                    noi_dung: "Hình thức",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: HINH_THUC.where(n => n.loai == 'HINH_THUC').firstOrDefault().gia_tri == null || HINH_THUC.where(n => n.loai == 'HINH_THUC').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : HINH_THUC.where(n => n.loai == 'HINH_THUC').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                hinh_thuc.so_sanh = ESUtil.compareText(hinh_thuc.nd_goc, hinh_thuc.nd_ocr);
            } else {
                var hinh_thuc = {
                    loai: "HINH_THUC",
                    noi_dung: "Hình thức",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                hinh_thuc.so_sanh = ESUtil.compareText(hinh_thuc.nd_goc, hinh_thuc.nd_ocr);
            }
            if (NGAN_HANG.length > 0) {
                var ten_ngan_hang = {
                    loai: "TEN_NGAN_HANG",
                    noi_dung: "Tên ngân hàng",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: NGAN_HANG.where(n => n.loai == 'TEN_NGAN_HANG').firstOrDefault().gia_tri == null || NGAN_HANG.where(n => n.loai == 'TEN_NGAN_HANG').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : NGAN_HANG.where(n => n.loai == 'TEN_NGAN_HANG').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                ten_ngan_hang.so_sanh = ESUtil.compareText(ten_ngan_hang.nd_goc, ten_ngan_hang.nd_ocr);
            } else {
                var ten_ngan_hang = {
                    loai: "TEN_NGAN_HANG",
                    noi_dung: "Tên ngân hàng",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                ten_ngan_hang.so_sanh = ESUtil.compareText(ten_ngan_hang.nd_goc, ten_ngan_hang.nd_ocr);
            }
            if (STK.length > 0) {
                var stk = {
                    loai: "STK",
                    noi_dung: "Số tài khoản",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: STK.where(n => n.loai == 'STK').firstOrDefault().gia_tri == null || STK.where(n => n.loai == 'STK').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : STK.where(n => n.loai == 'STK').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                stk.so_sanh = ESUtil.compareText(stk.nd_goc, stk.nd_ocr);
            } else {
                var stk = {
                    loai: "STK",
                    noi_dung: "Số tài khoản",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                stk.so_sanh = ESUtil.compareText(stk.nd_goc, stk.nd_ocr);
            }
            if (THU_HUONG.length > 0) {
                var nguoi_thu_huong = {
                    loai: "NGUOI_THU_HUONG",
                    noi_dung: "Người thụ hưởng",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: THU_HUONG.where(n => n.loai == 'NGUOI_THU_HUONG').firstOrDefault().gia_tri == null || THU_HUONG.where(n => n.loai == 'NGUOI_THU_HUONG').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : THU_HUONG.where(n => n.loai == 'NGUOI_THU_HUONG').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                nguoi_thu_huong.so_sanh = ESUtil.compareText(nguoi_thu_huong.nd_goc, nguoi_thu_huong.nd_ocr);
            } else {
                var nguoi_thu_huong = {
                    loai: "NGUOI_THU_HUONG",
                    noi_dung: "Người thụ hưởng",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                nguoi_thu_huong.so_sanh = ESUtil.compareText(nguoi_thu_huong.nd_goc, nguoi_thu_huong.nd_ocr);
            }
            if (TIEN_YC.length > 0) {
                var tien_yc = {
                    loai: "TONG_TIEN_YC",
                    noi_dung: "Số tiền yêu cầu",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: TIEN_YC.where(n => n.loai == 'TONG_TIEN_YC').firstOrDefault().gia_tri == null || TIEN_YC.where(n => n.loai == 'TONG_TIEN_YC').firstOrDefault().gia_tri == '' ? 'Chưa có dữ liệu' : TIEN_YC.where(n => n.loai == 'TONG_TIEN_YC').firstOrDefault().gia_tri,
                    nd_so_sanh: true,
                    so_sanh: false
                };
                tien_yc.so_sanh = ESUtil.compareText(tien_yc.nd_goc, tien_yc.nd_ocr);
            } else {
                var tien_yc = {
                    loai: "TONG_TIEN_YC",
                    noi_dung: "Số tiền yêu cầu",
                    nd_goc: 'Chưa có dữ liệu',
                    nd_ocr: 'Chưa có dữ liệu',
                    nd_so_sanh: false,
                    so_sanh: false
                };
                tien_yc.so_sanh = ESUtil.compareText(tien_yc.nd_goc, tien_yc.nd_ocr);
            }
            arr.push(ho_ten);
            arr.push(ngay_sinh);
            arr.push(gioi_tinh);
            arr.push(dia_chi);
            arr.push(dien_thoai);
            arr.push(email);
            arr.push(benh_vien);
            arr.push(ngay_vv);
            arr.push(ngay_rv);
            arr.push(ma_icd);
            arr.push(chan_doan);
            arr.push(hinh_thuc);
            arr.push(ten_ngan_hang);
            arr.push(stk);
            arr.push(nguoi_thu_huong);

            ESUtil.genHTML("modalCompareDataOCRGiayToTemplate", "modalCompareDataOCRGiayTo", { data: arr });
        }
    });
}
function sdDuLieuOCR() {
    var arrCheck = [];
    var arrChiPhiQuyenLoi = [];
    var arrChiPhiChiTiet = [];
    var data = arrThongTinOCRGiayTo;
    var arr = layDuLieuHoaDonOCR();
    var ma_benh = "";
    var ma_icd = data.where(n => n.loai == 'MA_ICD')[0];
    var chan_doan = data.where(n => n.loai == 'CHAN_DOAN')[0].gia_tri;
    var chan_doan_temp = ESUtil.xoaKhoangTrangText(chan_doan);

    if (ma_icd != undefined) {
        var arrMa = objDanhMuc.ds_benh_ly.where(n => ESUtil.xoaKhoangTrangText(n.ma) == ESUtil.xoaKhoangTrangText(ma_icd.gia_tri.toLowerCase()));
        if (arrMa.length > 0) {
            ma_benh = arrMa[0].ma;
        }
    }
    $.each(arr, function (index, item) {
        if (item.ma_chi_phi == "" || item.ma_chi_phi == null) {
            arrCheck.push(item);
        }
        if (item.thanh_tien == 0) {
            item.thanh_tien = item.don_gia;
        }
        var objQloi = {
            ma_ct: item.ma_chi_phi,
            ten_ct: item.ten_chi_phi,
            loai: item.loai_chi_phi,
            loai_ct: item.ma_chi_phi,
            ten_loai_chi_phi: item.ten_chi_phi,
            so_ct: "",
            tien_yc: parseInt(item.thanh_tien),
            tien_giam: "0",
            tien_duyet: "0",
            nguyen_nhan_giam: "",
            ghi_chu: ""
        }
        arrChiPhiQuyenLoi.push(objQloi);

        var obj = {
            ma: item.ma_chi_phi,
            ma_ct: item.ma_chi_phi,
            ten_ct: item.ten_chi_phi,
            ten: item.ten_dich_vu,
            loai: item.loai_chi_phi,
            so_luong: item.so_luong,
            don_gia: item.don_gia,
            so_tien: item.thanh_tien,
            dvi_tinh: item.dvi_tinh,
            gia_tham_khao: 0,
            mac_dinh: "",
            ghi_chu: ""
        }
        arrChiPhiChiTiet.push(obj);
    });

    arrChiPhiQuyenLoi = arrChiPhiQuyenLoi.reduce((acc, object) => {
        if (acc.find(y => y.loai_ct === object.loai_ct)) return acc.concat([]);
        var tien_yc = arrChiPhiQuyenLoi.filter(y => y.loai_ct === object.loai_ct).map(y => y.tien_yc).reduce((a, b) => a + b, 0);
        return acc.concat([{
            ...object,
            tien_yc,
        }])
    }, []);
    if (data.length <= 0) {
        _notifyService.error("Bạn chưa tích chọn dữ liệu sử dụng");
        return;
    }
    if (arrCheck.length > 0) {
        _notifyService.error("Tồn tại dòng dữ liệu chưa chọn loại chi phí");
        return;
    }
    var benh_vien = data.where(n => n.loai == 'BENH_VIEN')[0];
    if (benh_vien == "" || benh_vien == null || benh_vien == undefined) {
        _notifyService.error("Không xác định được bệnh viện !");
        return;
    }
    var ngay_vv = data.where(n => n.loai == 'NGAY_VV')[0];
    if (ngay_vv == "" || ngay_vv == null || ngay_vv == undefined) {
        _notifyService.error("Không xác định được ngày vào viện !");
        return;
    }
    var ngay_rv = data.where(n => n.loai == 'NGAY_RV')[0];
    if (ngay_rv == "" || ngay_rv == null || ngay_rv == undefined) {
        ngay_rv = ngay_vv;
    }
    var obj = {};
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id;
    obj.lan = "";
    obj.gio_vv = "";
    obj.gio_rv = "";
    obj.ngay_vv = ngay_vv.gia_tri.dateToNumber();
    obj.ngay_rv = ngay_rv.gia_tri.dateToNumber();
    obj.benh_vien = benh_vien.gia_tri;
    obj.nha_thuoc = "";
    obj.ngay_xr = "";
    obj.noi_xr = "";
    obj.nguyen_nhan_tnan = "";
    obj.hau_qua_ct = "";
    obj.nguyen_nhan = "";
    obj.hinh_thuc = ""
    obj.lh_nv = "";
    obj.chan_doan = chan_doan;
    obj.ma_benh = ma_benh;
    obj.tien_yc = 0;
    obj.data = arrChiPhiChiTiet;
    obj.arr = arrChiPhiQuyenLoi;

    _healthClaimCommonService.capNhatThongTinOCRConNguoi(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
            _frmThemQuyenLoiLanTiepNhan.setData(ho_so_chi_tiet.lan_kham_qloi[0]);
            var id_qloi = _frmThemQuyenLoiLanTiepNhan.getControl('id_qloi').getValue();
            var lan = _frmThemQuyenLoiLanTiepNhan.getControl('lan').getValue();
            ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
            });
            ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                XemChiTietLan(lan);
            });
            ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: ho_so_chi_tiet.lan_kham_qloi }, () => {
                $("#tong_tien_yc").html(ESUtil.formatMoney(tongChiPhiLan(lan)));
            });
            var arrChiPhi = ho_so_chi_tiet.chi_phi.where(n => n.id_qloi == id_qloi && n.lan == lan);
            var arrChiPhiCT = ho_so_chi_tiet.chi_phi_ct.where(n => n.id_qloi == id_qloi && n.lan == lan);
            if (arrChiPhi != null && arrChiPhi.length > 0) {
                for (var i = 0; i < arrChiPhi.length; i++) {
                    arrChiPhi[i].so_luong = arrChiPhiCT.where(n => n.ma_ct == arrChiPhi[i].loai_ct).length;
                }
            }
            ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: arrChiPhi }, () => {
                if (arrChiPhi != null && arrChiPhi.length > 0) {
                    var tong = arrChiPhi.sum(n => n.tien_yc);
                    $("#tong_chphi_tien_yc").html(ESUtil.formatMoney(tong));
                    _frmThemQuyenLoiLanTiepNhan.getControl('tien_yc').val(ESUtil.formatMoney(tong));
                }
            });
            _modalHealthClaimCompareData.hide();
            _frmThemQuyenLoiLanTiepNhan.getControl('nguyen_nhan').setValue(obj.nguyen_nhan);
            _frmThemQuyenLoiLanTiepNhan.getControl('nguyen_nhan').trigger("select2:select");
            $("#tabThongTinYeuCau_click").trigger("click");
            _modalAddQuyenLoiYeuCau.show();
        });
    });
}
//OCR hóa đơn
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
function soSanhDuLieuOCRHoaDon(val) {
    var data = arrDuLieuOCRHoaDon;
    var arr = [];
    if (val != "" && val != null && val != undefined) {
        var chung_tu = ho_so_chi_tiet.chung_tu.where(n => n.bt == val).firstOrDefault();
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
        var chung_tu = ho_so_chi_tiet.chung_tu.where(n => n.bt == val).firstOrDefault();
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
function loadThongTinOCRHoaDonChungTu(obj) {
    _healthClaimCommonService.soSanhDuLieuOCRHoaDon(obj).then(res => {
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
        nv: 'NG',
        hang_muc: ma_file,
        bt: bt.split(",")
    }
    loadThongTinOCRHoaDonChungTu(obj);
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
    if (arr.length == 0) {
        _notifyService.error("Bạn chưa tích chọn dữ liệu cần sử dụng !");
        return;
    }
    var obj = {
        data: arr,
        pm:"TN",
        so_id: ho_so_chi_tiet.ho_so.so_id,
        bt: _frmOCRHoaDonChungTu.getControl("bt").val(),
        dvi_ph: 'BENH_VIEN'
    }
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hóa đơn chứng từ ?", "", () => {
        _healthClaimCommonService.capNhatThongTinOCRHoaDon(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Cập nhật dữ liệu thành công");
            $("#hoa_don_item_tat_ca").prop("checked", false);
            var objGetDetail = { ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac, so_id: ho_so_chi_tiet.ho_so.so_id };
            layHoSoCTiet(objGetDetail, res => {
                ho_so_chi_tiet = res.data_info;
                var chung_tu = ho_so_chi_tiet.chung_tu;
                var arrHD = [];
                if (chung_tu.length > 0) {
                    for (var i = 0; i < chung_tu.length; i++) {
                        arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
                    }
                    _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
                    _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
                }
            });
            layThongTinChungTu();
        });
    });
};
function goToScroll(element) {
    $('#lstImage').animate({ scrollTop: $("#" + element).offset().top }, 'slow');
}
function getDetailNgayNhanHSGoc(lan) {
    if (lan != undefined) {
        $('#btnXacNhanLanNhanHSGoc').show();
        $('#btnLuuCTLanNhanHSGoc').show();
        $('#btnXoaLanNhanHSGoc').show();
        $('.item-ngay-nhan-hs-goc').removeClass("text-danger");
        $("#bt_" + lan).addClass("text-danger");
        $('#tableDanhSachHSGTBody input.input_chon_hsgt_bs').prop('checked', false);
        _service.layChiTietlanNhanHoSoGoc({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            lan: lan
        }).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmLanNhanHoSoGoc.getControl('lan').val(lan);
            ESUtil.genHTML("tableDanhSachHSGTBody_template", "tableDanhSachHSGTBody", { ho_so_giay_to: ho_so_chi_tiet.ho_so_giay_to }, () => {
                $('#tableDanhSachHSGTBody input.input_chon_hsgt_bs').prop('checked', false);
                if (res.data_info.length > 0) {
                    if (res.data_info[0].trang_thai == 'D') {
                        $('#btnXacNhanLanNhanHSGoc').hide();
                        $('#btnLuuCTLanNhanHSGoc').hide();
                        $('#btnXoaLanNhanHSGoc').hide();
                    }
                    $.each(res.data_info, (index, item) => {
                        $('#tableDanhSachHSGTBody input#bo_sung_hsgt_goc_' + item.ma_hs).prop('checked', true);
                    });
                }
            });
        });
    }
}
function suaLanNhanHoSoGoc(lan) {
    _frmThemLanNhanHSGoc.resetForm();
    _frmThemLanNhanHSGoc.clearErrorMessage();
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.ho_so.so_id,
        lan: lan
    }
    _service.xemLanNhanHoSoGoc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmThemLanNhanHSGoc.setData(res.data_info);
        _modalThemLanNhanHSGoc.show();
    });
}
//Lấy lịch sử yêu cầu BSHS
function getPagingLichSuYeuCauBSHS(trang, callback = undefined) {
    var obj = {};
    obj.trang = trang;
    obj.so_dong = 8;
    obj.so_id = ho_so_chi_tiet.ho_so.so_id
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
function chonDsLHNV(el = undefined) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#inputSearch_LHNV").focus();
    $("#inputSearch_LHNV").val("");

    _modalLHNV.show(el);
}
function onChonLHNV(el) {
    var target = _modalLHNV.target;
    var val = $(el).attr("data-val");
    if (val != undefined && val != null) {
        var obj = ho_so_chi_tiet.qloi_goc.where(n => n.lh_nv == val).firstOrDefault();
        if (obj == null) {
            return;
        }
        data_qloi_tmp = obj;
        $(target).val(obj.ten);
        $(target).attr("data-val", obj.lh_nv);

        _modalLHNV.hide();
    }
};
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("HSTT");
    //Khởi tạo giá trị cho bộ lọc hồ sơ
    _frmTimKiem.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiem.getControl("ngay_c").setValue(dateNow);
    _frmTimKiem.getControl("ngay_sinh").setValue("");
    if (ESCS_MA_DOI_TAC == 'MIC') {
        $("#btnXemQlMIC").show();
    } else {
        $("#btnXemQlMIC").hide();
    }
    //Lấy danh sách hồ sơ (có phân trang)
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
    if (storageDanhSachBenhLy === undefined || storageDanhSachBenhLy === null || storageDanhSachBenhLy === "null") {
        _service.base.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _statusListService.layDsTrangThaiCN(),
            _healthClaimCommonService.layDsBenhVien(),
            _healthClaimCommonService.layDsNhaThuoc(),
            _diseasesListService.layDanhSachMaBenh(),
            _categoryPersonListService.layDsHMCN(),
            _bankListService.layDsNganHang(),
            _healthClaimCommonService.layDanhMucChung({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _commonService.layControl({ nv: "NG" }),
            _userManagementService.layDsCanBoQuyen(),
            _productHumanService.getAllSanPham(),
            _costsListService.layDsChiPhi({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _unitService.Tkiem({ nhom: "THUOC" }),
            _healthClaimCommonService.layDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC })
        ]).then(arrRes => {
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_nhanh = arrRes[1].data_info;
            objDanhMuc.trang_thai = arrRes[2].data_info;
            objDanhMuc.benh_vien = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);// && (n.bl_ngoaitru == 'C' || n.bl_noitru == 'C' || n.bl_rang == 'C')
            objDanhMuc.nha_thuoc = arrRes[4].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.ds_benh_ly = arrRes[5].data_info;
            objDanhMuc.hang_muc_xe = arrRes[6].data_info;
            objDanhMuc.nguyen_nhan_giam_tru = arrRes[6].data_info.where(n => n.loai === "GT");
            objDanhMuc.ngan_hang = arrRes[7].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[7].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.nguyen_nhan = arrRes[8].data_info.where(n => n.nhom == "NGUYEN_NHAN");
            objDanhMuc.hinh_thuc = arrRes[8].data_info.where(n => n.nhom == "HINH_THUC");
            objDanhMuc.cau_hinh_nut = arrRes[9].data_info;
            objDanhMuc.ds_can_bo = arrRes[10].data_info.nsd_quyen_tncn;
            objDanhMuc.san_pham = arrRes[11].data_info;
            objDanhMuc.ds_chi_phi = chuanHoaChiPhi(arrRes[12].data_info);
            objDanhMuc.dvi_tinh = arrRes[13].data_info;
            objDanhMuc.nhom_chi_phi = objDanhMuc.ds_chi_phi.where(n => n.ma_ct == null);
            objDanhMuc.ds_giay_to = arrRes[14].data_info;

            ESStorage.setItemLocalStorage(ESConstants.DANH_SACH_BENH_LY, JSON.stringify(objDanhMuc.ds_benh_ly));
            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n.ma_doi_tac == ESCS_MA_DOI_TAC && n.loai === "TL");
                _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tai_lieu, "ten", "ma", "Chọn tài liệu", "");
            });
            ESUtil.executeAsync(() => {
                _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").setDataSource(objDanhMuc.nguyen_nhan, "ten", "ma", "Chọn nguyên nhân", "");
                _frmThemQuyenLoiLanTiepNhan.getControl("hinh_thuc").setDataSource(objDanhMuc.hinh_thuc, "ten", "ma", "Chọn hình thức điều trị", "");
                _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").setDataSource([], "ten", "ma", "Chọn quyền lợi", "");
            });
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten_tat", "ma", "Chọn đối tác", "");

            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.nguyen_nhan;
            _modalBaoCaoService.data.hinh_thuc = objDanhMuc.hinh_thuc;
            _modalBaoCaoService.data.san_pham = objDanhMuc.san_pham;
            _modalBaoCaoService.data.trang_thai = objDanhMuc.trang_thai;
            _modalBaoCaoService.fillDataControl();

            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiemNDBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmTimKiemNDBH.getControl("ma_doi_tac").trigger("select2:select");
            _frmTimKiemNDBH.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmEditKH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten_tat", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmEditKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            ESUtil.executeAsync(() => {
                _frmNguoiThuHuong.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            });
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", "");
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            ESUtil.genHTML("modalCanBoDanhSachTemplate", "modalCanBoDanhSach", { danh_sach_can_bo: arrCanBo }, () => {
                $("#modalCanBoDanhSach .single_checked").click(function () {
                    $("#modalCanBoDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
                $("#modalBenhVienDanhSach .single_checked").click(function () {
                    $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalNhaThuocDanhSachTemplate", "modalNhaThuocDanhSach", { danh_sach: objDanhMuc.nha_thuoc }, () => {
                $("#modalNhaThuocDanhSach .single_checked").click(function () {
                    $("#modalNhaThuocDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalLoaiChiPhiDanhSachTemplate", "modalLoaiChiPhiDanhSach", { danh_sach: objDanhMuc.nhom_chi_phi });
            ESUtil.genHTML("modalChonLoaiChiPhiDanhSachOCRTemplate", "modalChonLoaiChiPhiOCRDanhSach", { danh_sach: objDanhMuc.nhom_chi_phi }, () => {
                $("#modalChonLoaiChiPhiOCRDanhSach .single_checked").click(function () {
                    $("#modalChonLoaiChiPhiOCRDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });

            _frmHoaDonChungTu.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
            _frmTimKiemNDBH.getControl("lhnv").setDataSource(objDanhMuc.san_pham, "ten", "ma", "Chọn quyền lợi sản phẩm", "");
            _frmDMChiPhi.getControl("dvi_tinh").setDataSource(objDanhMuc.dvi_tinh, "ten", "ma", "Chọn đơn vị tính", "");
            var arrCapTren = objDanhMuc.ds_chi_phi.where(n => n.ma_ct == null);
            _frmDMChiPhi.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", "");

            hienThiHoSoNofify();
        });
    } else {
        _service.base.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _statusListService.layDsTrangThaiCN(),
            _healthClaimCommonService.layDsBenhVien(),
            _healthClaimCommonService.layDsNhaThuoc(),
            _categoryPersonListService.layDsHMCN(),
            _bankListService.layDsNganHang(),
            _healthClaimCommonService.layDanhMucChung({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _commonService.layControl({ nv: "NG" }),
            _userManagementService.layDsCanBoQuyen(),
            _productHumanService.getAllSanPham(),
            _costsListService.layDsChiPhi({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _unitService.Tkiem({ nhom: "THUOC" }),
            _healthClaimCommonService.layDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC })
        ]).then(arrRes => {
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_nhanh = arrRes[1].data_info;
            objDanhMuc.trang_thai = arrRes[2].data_info;
            objDanhMuc.benh_vien = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);// && (n.bl_ngoaitru == 'C' || n.bl_noitru == 'C' || n.bl_rang == 'C')
            objDanhMuc.nha_thuoc = arrRes[4].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc.ds_benh_ly = JSON.parse(storageDanhSachBenhLy);
            objDanhMuc.hang_muc_xe = arrRes[5].data_info;
            objDanhMuc.nguyen_nhan_giam_tru = arrRes[5].data_info.where(n => n.loai === "GT");
            objDanhMuc.ngan_hang = arrRes[6].data_info.where(n => n.nhom === "NGAN_HANG");
            objDanhMuc.chi_nhanh_ngan_hang = arrRes[6].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
            objDanhMuc.nguyen_nhan = arrRes[7].data_info.where(n => n.nhom == "NGUYEN_NHAN");
            objDanhMuc.hinh_thuc = arrRes[7].data_info.where(n => n.nhom == "HINH_THUC");
            objDanhMuc.cau_hinh_nut = arrRes[8].data_info;
            objDanhMuc.ds_can_bo = arrRes[9].data_info.nsd_quyen_tncn;
            objDanhMuc.san_pham = arrRes[10].data_info;
            objDanhMuc.ds_chi_phi = chuanHoaChiPhi(arrRes[11].data_info);
            objDanhMuc.dvi_tinh = arrRes[12].data_info;
            objDanhMuc.nhom_chi_phi = objDanhMuc.ds_chi_phi.where(n => n.ma_ct == null);
            objDanhMuc.ds_giay_to = arrRes[13].data_info;

            ESUtil.executeAsync(() => {
                _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
            });
            ESUtil.executeAsync(() => {
                objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc_xe.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.loai === "TL");
                _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tai_lieu, "ten", "ma", "Chọn tài liệu", "");
            });
            ESUtil.executeAsync(() => {
                _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").setDataSource(objDanhMuc.nguyen_nhan, "ten", "ma", "Chọn nguyên nhân", "");
                _frmThemQuyenLoiLanTiepNhan.getControl("hinh_thuc").setDataSource(objDanhMuc.hinh_thuc, "ten", "ma", "Chọn hình thức điều trị", "");
                _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").setDataSource([], "ten", "ma", "Chọn quyền lợi", "");
            });
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", "");
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

            _modalBaoCaoService.data.doi_tac = objDanhMuc.doi_tac;
            _modalBaoCaoService.data.chi_nhanh = objDanhMuc.chi_nhanh;
            _modalBaoCaoService.data.nguyen_nhan = objDanhMuc.nguyen_nhan;
            _modalBaoCaoService.data.hinh_thuc = objDanhMuc.hinh_thuc;
            _modalBaoCaoService.data.san_pham = objDanhMuc.san_pham;
            _modalBaoCaoService.data.trang_thai = objDanhMuc.trang_thai;
            _modalBaoCaoService.fillDataControl();
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiemNDBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
            _frmTimKiemNDBH.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmEditKH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten_tat", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmEditKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            ESUtil.executeAsync(() => {
                _frmNguoiThuHuong.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            });
            var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
            ESUtil.genHTML("modalCanBoDanhSachTemplate", "modalCanBoDanhSach", { danh_sach_can_bo: arrCanBo }, () => {
                $("#modalCanBoDanhSach .single_checked").click(function () {
                    $("#modalCanBoDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
                $("#modalBenhVienDanhSach .single_checked").click(function () {
                    $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalNhaThuocDanhSachTemplate", "modalNhaThuocDanhSach", { danh_sach: objDanhMuc.nha_thuoc }, () => {
                $("#modalNhaThuocDanhSach .single_checked").click(function () {
                    $("#modalNhaThuocDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
                $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                    $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            _frmHoaDonChungTu.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
            ESUtil.genHTML("modalLoaiChiPhiDanhSachTemplate", "modalLoaiChiPhiDanhSach", { danh_sach: objDanhMuc.nhom_chi_phi });
            ESUtil.genHTML("modalChonLoaiChiPhiDanhSachOCRTemplate", "modalChonLoaiChiPhiOCRDanhSach", { danh_sach: objDanhMuc.nhom_chi_phi }, () => {
                $("#modalChonLoaiChiPhiOCRDanhSach .single_checked").click(function () {
                    $("#modalChonLoaiChiPhiOCRDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
            _frmTimKiemNDBH.getControl("lhnv").setDataSource(objDanhMuc.san_pham, "ten", "ma", "Chọn quyền lợi sản phẩm", "");
            _frmDMChiPhi.getControl("dvi_tinh").setDataSource(objDanhMuc.dvi_tinh, "ten", "ma", "Chọn đơn vị tính", "");
            var arrCapTren = objDanhMuc.ds_chi_phi.where(n => n.ma_ct == null);
            _frmDMChiPhi.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", "");
            hienThiHoSoNofify();
        });
    }
    _frmThemLanTiepNhan.getControl("ngay_vv").on('apply.daterangepicker', function (ev, picker) {
        tinhSoNgay();
        var value = _frmThemLanTiepNhan.getControl("ngay_vv").val();
        _frmThemLanTiepNhan.getControl("ngay_rv").setValue(value);
    });
    _frmThemLanTiepNhan.getControl("ngay_vv").change(function () {
        tinhSoNgay();
        var value = _frmThemLanTiepNhan.getControl("ngay_vv").val();
        _frmThemLanTiepNhan.getControl("ngay_rv").setValue(value);
    });
    _frmThemLanTiepNhan.getControl("ngay_rv").on('apply.daterangepicker', function (ev, picker) {
        tinhSoNgay();
    });
    _frmThemLanTiepNhan.getControl("gio_vv").on('change', function (ev, picker) {
        tinhSoNgay();
    });
    _frmThemLanTiepNhan.getControl("gio_rv").on('change', function (ev, picker) {
        tinhSoNgay();
    });

    _frmOCRHoaDonChungTu.getControl("hoa_don").addEventChange(val => {
        soSanhDuLieuOCRHoaDon(val);
    });
    _frmHoaDonChungTu.getControl("dvi_ph").addEventChange(val => {
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
                _frmHoaDonChungTu.getControl("ten_dvi_phat_hanh").setValue(bv.ten);
                _frmHoaDonChungTu.getControl("mst_dvi_phat_hanh").setValue(bv.mst);
                _frmHoaDonChungTu.getControl("dchi_dvi_phat_hanh").setValue(bv.dia_chi);
                _frmHoaDonChungTu.getControl("tien").setValue(ho_so_chi_tiet.ho_so.so_tien_duyet);
                _frmHoaDonChungTu.getControl("tl_thue").setValue(0);
                _frmHoaDonChungTu.getControl("tl_thue").trigger('select2:select');
            });
        }
    });
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").addEventChange(val => {
        var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setValue("");
    });
    _frmChuyenNguoiXuLy.getControl("ma_chi_nhanh_moi").addEventChange(val => {
        var arrCanBo = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmChuyenNguoiXuLy.getControl("nsd_moi").setValue("");
    });
    _frmTimKiemNDBH.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemNDBH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", "");
        _frmTimKiemNDBH.getControl("ma_chi_nhanh").setValue("");
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
    });
    _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").addEventChange(val => {
        if (val == "NN001") {
            $(".tai-nan").show();
            $(".tai-nan input").attr("required", "required");
        } else {
            $(".tai-nan").hide();
            $(".tai-nan input").removeAttr("required");
        }
        if (val == "") {
            _frmThemQuyenLoiLanTiepNhan.getControl('lh_nv').setDataSource([], "ten", "lh_nv", "Chọn quyền lợi", "");
            return;
        }
        var hinh_thuc = _frmThemQuyenLoiLanTiepNhan.getControl("hinh_thuc").getValue();
        _frmThemQuyenLoiLanTiepNhan = new FormService("frmThemQuyenLoiLanTiepNhan");
        var arr = ho_so_chi_tiet.qloi_goc.where(n => n.nhom_nguyen_nhan != null && n.nhom_nguyen_nhan.includes(val) && n.loai.includes(hinh_thuc));
        //_frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").setDataSource(arr, "ten", "lh_nv", "Chọn quyền lợi", "");
        ESUtil.genHTML("modalLHNVDanhSachTemplate", "modalLHNVDanhSach", { chi_chon_la: chi_chon_la, danh_sach: arr });
    });
    _frmThemQuyenLoiLanTiepNhan.getControl("hinh_thuc").addEventChange(val => {
        var nhom_nguyen_nhan = _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").getValue();
        if (nhom_nguyen_nhan == '' || nhom_nguyen_nhan == undefined || nhom_nguyen_nhan == null) {
            _notifyService.error("Vui lòng chọn nhóm nguyên nhân!");
            return;
        }
        var arr = ho_so_chi_tiet.qloi_goc.where(n => n.nhom_nguyen_nhan != null && n.nhom_nguyen_nhan.includes(nhom_nguyen_nhan) && n.loai.includes(val));
        //_frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").setDataSource(arr, "ten", "lh_nv", "Chọn quyền lợi", "");
        ESUtil.genHTML("modalLHNVDanhSachTemplate", "modalLHNVDanhSach", { chi_chon_la: chi_chon_la, danh_sach: arr });
    });
    _frmEditKH.getControl("loai_kh").addEventChange(val => {
        if (val == "T") {
            $("#cmt").hide();
            $("#mst").show();
            _frmEditKH.getControl("cmt").prop("required", false);
            _frmEditKH.getControl("mst").prop("required", true);
        } else if (val == "C") {
            $("#cmt").show();
            $("#mst").hide();
            _frmEditKH.getControl("cmt").prop("required", true);
            _frmEditKH.getControl("mst").prop("required", false);
        }
    });
    //_frmHoaDonChungTu.getControl("tl_thue").addEventChange(val => {
    //    chungTuTinhTien();
    //});
    $('form[name=frmHoaDonChungTu] input[name=thue]').on('change', function () {
        chungTuTinhTien();
    });
    $("#frmHoaDonChungTu input[name='tien']").change(function () {
        chungTuTinhTien();
    });
    _frmNguoiThuHuong.getControl("ma_ngan_hang").addEventChange(val => {
        _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmNguoiThuHuong.getControl("dvi_th").addEventChange(val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            dvi_th: val,
        }
        _healthClaimCommonService.layThongTinHThuHuong(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != null) {
                _frmNguoiThuHuong.getControl("pttt").setValue(res.data_info.pttt);
                _frmNguoiThuHuong.getControl("ten").setValue(res.data_info.ten);
                _frmNguoiThuHuong.getControl("tien").setValue(ESUtil.formatMoney(res.data_info.tien));
                _frmNguoiThuHuong.getControl("dien_giai").setValue(res.data_info.dien_giai);
                _frmNguoiThuHuong.getControl("tk_cmt").setValue(res.data_info.tk_cmt);
                res.data_info.ma_ngan_hang = res.data_info.ma_ngan_hang == null ? "" : res.data_info.ma_ngan_hang;
                res.data_info.ma_chi_nhanh = res.data_info.ma_chi_nhanh == null ? "" : res.data_info.ma_chi_nhanh;
                _frmNguoiThuHuong.getControl("ma_ngan_hang").setValue(res.data_info.ma_ngan_hang);
                _frmNguoiThuHuong.getControl("ma_ngan_hang").trigger("select2:select");
                _frmNguoiThuHuong.getControl("ma_chi_nhanh").setValue(res.data_info.ma_chi_nhanh);
            }
        });
    });
    _frmNguoiThuHuong.getControl("pttt").addEventChange(val => {
        $("#lblMaNganHang").addClass("_required");
        _frmNguoiThuHuong.getControl("ma_ngan_hang").attr("required", "required");
        if (val == "TM") {
            $("#lblMaNganHang").removeClass("_required");
            _frmNguoiThuHuong.getControl("ma_ngan_hang").removeAttr("required");
        }
        _frmNguoiThuHuong = new FormService("frmNguoiThuHuong");
    });

    $("#inputTimKiemBenhLy").keypress(function (e) {
        if (e.which == 13) {
            getPagingBenhLy(1);
            return false;
        }
    });
    $("#btnThemMoiHoSo").click(function () {
        $("#btnTiepTheo").show();
        $("#btnMoHoSo").hide();
        _navTabTimKiemNguoi.showTab("tabTimKiem");
        _frmTimKiemNDBH.resetForm();
        _frmThongTinLienHe.resetForm();
        ESUtil.genHTML("modalHealthSearchDsGCNTemplate", "modalHealthSearchDsGCN", { data: [] });
        if (_frmThongTinLienHe.getControl("so_id").getValue() != "") {
            $("#btnMoHoSo").html('<i class="far fa-edit mr-1"></i> Sửa hồ sơ');
        } else {
            $("#btnMoHoSo").html('<i class="fas fa-folder-open mr-1"></i> Mở hồ sơ');
        }
        _modalMoHoSoBT.show();
    });
    _frmThongTinLienHe.getControl("nguoi_lhla").addEventChange(val => {
        if (val == "BAN_THAN") {
            $("#chkThamGiaLienHe").prop("checked", true);
        } else {
            $("#chkThamGiaLienHe").prop("checked", false);
        }
        $("#chkThamGiaLienHe").trigger("change");
    });
    _frmPersonClaimCustomerInfo.getControl("nguoi_lhla").addEventChange(val => {
        if (val == "BAN_THAN") {
            $("#chkThamGiaLienHe").prop("checked", true);
        } else {
            $("#chkThamGiaLienHe").prop("checked", false);
        }
        setNguoiLienHeTheoNguoiThongBao();
    });
    $('#kieuXemLSTT').change(function () {
        $('#div_kieu_1').addClass('d-none');
        $('#div_kieu_2').addClass('d-none');
        var val = $('#kieuXemLSTT').val();
        if (val == 'KIEU1') {
            $('#div_kieu_1').removeClass('d-none');
        } else if (val == 'KIEU2') {
            $('#div_kieu_2').removeClass('d-none');
        }
    });
    $('#kieuXemLSTTTop5').change(function () {
        $('#div_kieu_1_top_5').addClass('d-none');
        $('#div_kieu_2_top_5').addClass('d-none');
        var val = $('#kieuXemLSTTTop5').val();
        if (val == 'KIEU1') {
            $('#div_kieu_1_top_5').removeClass('d-none');
        } else if (val == 'KIEU2') {
            $('#div_kieu_2_top_5').removeClass('d-none');
        }
    });
    $("#btnSearchNDBH").click(function () {
        _frmTimKiemNDBH.clearErrorMessage();
        if (_frmTimKiemNDBH.isValid()) {
            var objJson = _frmTimKiemNDBH.getJsonData();
            if (objJson.gcn.trim() == "" && objJson.so_hd.trim() == "" && objJson.ten_kh.trim() == "" &&
                objJson.nd_tim.trim() == "" && objJson.d_thoai.trim() == "" && (objJson.ngay_sinh == null || objJson.ngay_sinh == 0)) {
                _notifyService.error("Bạn chưa nhập thông tin tìm kiếm (Số HĐ, Số GCN, Tên khách hàng, Số CMT/CCCD/ Ngày sinh, Số điện thoại)");
                return;
            }
            if (objJson.gcn.trim() != "" && objJson.gcn.trim().length < 5) {
                _notifyService.error("Số GCN tìm kiếm không được phép nhỏ hơn 5 ký tự");
                return;
            }
            if (objJson.so_hd.trim() != "" && objJson.so_hd.trim().length < 5) {
                _notifyService.error("Số HĐ tìm kiếm không được phép nhỏ hơn 5 ký tự");
                return;
            }
            if (objJson.ten_kh.trim() != "" && objJson.ten_kh.trim().length < 5) {
                _notifyService.error("Tên khách hàng tìm kiếm không được phép nhỏ hơn 5 ký tự");
                return;
            }
            if (objJson.nd_tim.trim() != "" && objJson.nd_tim.trim().length < 5) {
                _notifyService.error("Số CMT/CCCD/ Ngày sinh tìm kiếm không được phép nhỏ hơn 5 ký tự");
                return;
            }
            if (objJson.d_thoai.trim() != "" && objJson.d_thoai.trim().length < 5) {
                _notifyService.error("Số điện thoại tìm kiếm không được phép nhỏ hơn 5 ký tự");
                return;
            }
            if (objJson.ma_doi_tac == '' && objJson.ma_chi_nhanh == '' && objJson.lhnv == '' && objJson.gcn == ''
                && objJson.so_hd == '' && objJson.ten_kh == '' && objJson.nd_tim == '' && objJson.d_thoai == '') {
                _notifyService.error("Phải chọn ít nhất 1 tiêu chí tìm kiếm");
                return;
            }
            if (objJson.tu_ht == '' || objJson.tu_ht == null || objJson.tu_ht == undefined) {
                objJson.tu_ht = 'HTBT';
            }
            _healthCareGuaranteeService.timNDBH(objJson).then(res => {
                if (res.data_info.length === 0) {
                    _notifyService.error("Không tìm thấy hồ sơ theo tiêu chí tìm kiếm");
                    ESUtil.genHTML("modalHealthSearchDsGCNTemplate", "modalHealthSearchDsGCN", { data: [] });
                    return;
                }
                ESUtil.genHTML("modalHealthSearchDsGCNTemplate", "modalHealthSearchDsGCN", { data: res.data_info });
            });
        }
    });
    $("#btnTiepTheo").click(function () {
        var currentTab = _navTabTimKiemNguoi.currentTab;
        var selectedData = [];
        if (currentTab === "tabTimKiem") {
            if (_frmTimKiemNDBH.isValid()) {
                var selectedData = $("#modalHealthSearchDsGCN tr.tkiem_gcn.active");
                if (selectedData.length === 1) {
                    var hd_cu = $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_hd_cu");
                    if (hd_cu == 'C') {
                        var obj = {
                            ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
                            ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
                            so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
                            so_id_gcn: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn")
                        }
                        _healthClaimCommonService.layThongTinGCN(obj).then(res => {
                            if (res.state_info.status !== "OK") {
                                _notifyService.error(res.state_info.message_body);
                                return;
                            }
                            _modalXemThongTinGoiBH.hide();

                            if (res.data_info != null && res.data_info != undefined) {
                                var objGCN = res.data_info;
                                _frmThongTinLienHe.setData(objGCN);
                                _frmThongTinLienHe.getControl("ten").val(objGCN.ten);
                                _frmThongTinLienHe.getControl("dien_thoai").val(objGCN.d_thoai);
                                _frmThongTinLienHe.getControl("goi_bh").val(objGCN.ten_goi_bh);
                                $("#chkThamGiaLienHe").prop("checked", false);
                                $("#chkThamGiaThongBao").prop("checked", false);

                                _frmThongTinLienHe.getControl("ten").readOnly();
                                _frmThongTinLienHe.getControl("dien_thoai").readOnly();
                                _frmThongTinLienHe.getControl("email").readOnly();
                                _frmThongTinLienHe.getControl("ngay_sinh").readOnly();
                                _navTabTimKiemNguoi.showTab("tabThongTinLienHe");

                                if (_frmThongTinLienHe.getControl("so_id").getValue() != "") {
                                    $("#btnMoHoSo").html('<i class="far fa-edit mr-1"></i> Sửa hồ sơ');
                                } else {
                                    $("#btnMoHoSo").html('<i class="fas fa-folder-open mr-1"></i> Mở hồ sơ');
                                }
                                $("#btnTiepTheo").hide();
                                $("#btnMoHoSo").show();
                            } else {
                                _frmThongTinLienHe.clearErrorMessage();
                                _frmThongTinLienHe.resetForm();
                                var objGCN = {
                                    ma_doi_tac: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac"),
                                    ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
                                    ma_chi_nhanh_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
                                    so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
                                    so_id_dt: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn"),
                                    so_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_hd"),
                                    ten: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ten_ndbh"),
                                    ngay_sinh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ngay_sinh"),
                                    gioi_tinh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_gioi_tinh"),
                                };
                                _frmThongTinLienHe.setData(objGCN);
                                $("#chkThamGiaLienHe").prop("checked", false);

                                _frmThongTinLienHe.getControl("ten").readOnly();
                                _frmThongTinLienHe.getControl("dien_thoai").readOnly();
                                _frmThongTinLienHe.getControl("email").readOnly();
                                _frmThongTinLienHe.getControl("ngay_sinh").readOnly();
                                _navTabTimKiemNguoi.showTab("tabThongTinLienHe");
                                $('#btnThongTinGoiBH').trigger('click');
                            }
                            $('#btnThongTinGoiBH').show();
                            _navTabTimKiemNguoi.showTab("tabThongTinLienHe");
                        })
                    }
                    else if (hd_cu == 'M' || hd_cu == '') {
                        var obj = {
                            ma_doi_tac_ql: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_doi_tac_ql"),
                            ma_chi_nhanh: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_ma_chi_nhanh"),
                            so_id_hd: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_hd"),
                            so_id_gcn: $("#modalHealthSearchDsGCN tr.tkiem_gcn.active").attr("data_so_id_gcn")
                        }
                        _healthClaimCommonService.tichHopConNguoi(obj).then(resTichHop => {
                            if (resTichHop.state_info.status !== "OK") {
                                _notifyService.error(resTichHop.state_info.message_body);
                                return;
                            }
                            _healthClaimCommonService.layThongTinGCN(obj).then(res => {
                                if (res.state_info.status !== "OK") {
                                    _notifyService.error(res.state_info.message_body);
                                    return;
                                }
                                var objGCN = res.data_info;
                                _frmThongTinLienHe.setData(objGCN);
                                _frmThongTinLienHe.getControl("ten").val(objGCN.ten);
                                _frmThongTinLienHe.getControl("dien_thoai").val(objGCN.d_thoai);
                                _frmThongTinLienHe.getControl("goi_bh").val(objGCN.ten_goi_bh);
                                $("#chkThamGiaLienHe").prop("checked", false);
                                $("#chkThamGiaThongBao").prop("checked", false);

                                _frmThongTinLienHe.getControl("ten").readOnly();
                                _frmThongTinLienHe.getControl("dien_thoai").readOnly();
                                _frmThongTinLienHe.getControl("email").readOnly();
                                _frmThongTinLienHe.getControl("ngay_sinh").readOnly();
                                _navTabTimKiemNguoi.showTab("tabThongTinLienHe");

                                if (_frmThongTinLienHe.getControl("so_id").getValue() != "") {
                                    $("#btnMoHoSo").html('<i class="far fa-edit mr-1"></i> Sửa hồ sơ');
                                } else {
                                    $("#btnMoHoSo").html('<i class="fas fa-folder-open mr-1"></i> Mở hồ sơ');
                                }
                                $("#btnTiepTheo").hide();
                                $("#btnMoHoSo").show();
                                $('#btnThongTinGoiBH').hide();
                            })
                        });
                    } else {
                        _notifyService.error("Hợp đồng cũ/mới không hợp lệ.");
                    }
                } else {
                    _notifyService.error("Bạn phải chọn 1 hợp đồng.");
                }
            }
        }
        if (currentTab === "tabThongTinLienHe") {
            _frmThongTinLienHe.getControl("nguoi_lh").readOnly(false);
            _frmThongTinLienHe.getControl("nguoi_lhla").readOnly(false);
            _frmThongTinLienHe.getControl("dthoai_nguoi_lh").readOnly(false);
            _frmThongTinLienHe.getControl("email_nguoi_lh").readOnly(false);

            _frmThongTinLienHe.getControl("nguoi_tb").readOnly(false);
            _frmThongTinLienHe.getControl("dthoai_nguoi_tb").readOnly(false);
            _frmThongTinLienHe.getControl("email_nguoi_tb").readOnly(false);

            if (_frmThongTinLienHe.getControl("so_id").getValue() != "") {
                $("#btnMoHoSo").html('<i class="far fa-edit mr-1"></i> Sửa hồ sơ');
            } else {
                $("#btnMoHoSo").html('<i class="fas fa-folder-open mr-1"></i> Mở hồ sơ');
            }
        }
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnMoHoSo").click(function () {
        if (!_frmThongTinLienHe.isValid()) {
            return;
        }
        var so_id = _frmThongTinLienHe.getControl("so_id").getValue();
        var message = "Bạn có chắc chắn muốn mở hồ sơ không";
        if (so_id != "") {
            message = "Bạn có chắc chắn muốn sửa hồ sơ không";
        }
        _notifyService.confirm(message, "", () => {
            _frmThongTinLienHe.clearErrorMessage();
            var obj = _frmThongTinLienHe.getJsonData();
            obj.nguon = "BLVP";
            _service.nhapThongTinNDBH(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _modalMoHoSoBT.hide();
                $("#itemChiPhiKhamBenh").trigger("click");
                $("#tabChiPhiKhamBenh").addClass("active");
                $("#tblChiPhiKhamBenh_TongTienKham").html("0");
                $("#tblChiPhiThuoc_TongThanhTien").html("0");
                $("#tblChiPhiKhac_TongSoTien").html("0");
                ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: [] });
                ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: [] });
                ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: [] });
                var data = { ma_doi_tac: obj.ma_doi_tac, so_id: res.out_value.so_id };
                refresh();
                layHoSoCTiet(data, res => {
                    _navThongTinHoSo.showTab("navThongTinChung");
                    $("#tabThongTinYeuCau_click").trigger("click");
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", res.data_info, () => {
                        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                    });
                    ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", res.data_info);
                    ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", res.data_info, function () {
                        $("#tblLanTiepNhan").find("tr:first-child").trigger("click");
                        $("#tong_tien_hs").html(ESUtil.formatMoney(data.so_tien));
                    });
                    showModalChinh(() => {
                        _navBoiThuong.showTab("tabHoSoGiayTo");
                        anHienTabXemToanBoThongTinHoSoBoiThuong("NG");
                    });

                    if (ho_so_chi_tiet.ho_so.trang_thai_hs_goc == "D")
                        $("#trang_thai_hs_goc_chk").prop("checked", true);
                    else
                        $("#trang_thai_hs_goc_chk").prop("checked", false);

                    layDsTaiLieu();
                    _notifyService.success("Cập nhật thông tin thành công");
                    getPaging(1);
                });
            });
        });
    });
    $("#chkThamGiaLienHe").change(function () {
        _frmThongTinLienHe.getControl("nguoi_lh").readOnly(false);
        _frmThongTinLienHe.getControl("dthoai_nguoi_lh").readOnly(false);
        _frmThongTinLienHe.getControl("email_nguoi_lh").readOnly(false);
        if (_frmThongTinLienHe.getControlById("chkThamGiaLienHe").is(":checked")) {
            var customer = _frmThongTinLienHe.getJsonData();
            customer.nguoi_lh = customer.ten;
            customer.dthoai_nguoi_lh = customer.dien_thoai;
            customer.email_nguoi_lh = customer.email;
            customer.nguoi_lhla = "BAN_THAN";
            _frmThongTinLienHe.setData(customer);
            _frmThongTinLienHe.getControl("nguoi_lh").readOnly();
            _frmThongTinLienHe.getControl("dthoai_nguoi_lh").readOnly();
            _frmThongTinLienHe.getControl("email_nguoi_lh").readOnly();
        }
    });
    $("#chkThamGiaThongBao").change(function () {
        _frmThongTinLienHe.getControl("nguoi_tb").readOnly(false);
        _frmThongTinLienHe.getControl("dthoai_nguoi_tb").readOnly(false);
        _frmThongTinLienHe.getControl("email_nguoi_tb").readOnly(false);
        if (_frmThongTinLienHe.getControlById("chkThamGiaThongBao").is(":checked")) {
            var customer = _frmThongTinLienHe.getJsonData();
            customer.nguoi_tb = customer.ten;
            customer.dthoai_nguoi_tb = customer.dien_thoai;
            customer.email_nguoi_tb = customer.email;
            _frmThongTinLienHe.setData(customer);
            _frmThongTinLienHe.getControl("nguoi_tb").readOnly();
            _frmThongTinLienHe.getControl("dthoai_nguoi_tb").readOnly();
            _frmThongTinLienHe.getControl("email_nguoi_tb").readOnly();
        }
    });
    $("#btnTraCuuBenh").click(function () {
        var ma = $("#inputTimKiemBenhLy_ma").val();
        if (ma == "") {
            _notifyService.error("Bạn chưa chọn bệnh lý");
            return;
        }
        var arr = ma.split("|");
        var ten = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                ten += objDanhMuc.ds_benh_ly.where(n => n.ma == arr[i]).firstOrDefault().ten_chuan;  // ten_v
            } else {
                ten += "; " + objDanhMuc.ds_benh_ly.where(n => n.ma == arr[i]).firstOrDefault().ten_chuan;  // ten_v
            }
        }
        _frmThemQuyenLoiLanTiepNhan.getControl("ma_benh").val(ma.replace(/\|/g, ";"));
        _frmThemQuyenLoiLanTiepNhan.getControl("chan_doan").val(ten);
        _popoverTraCuuBenh.hide();
    });
    $("#sidebar_info").on("hidden.bs.collapse", function () {
        $("#main_collapse").find(".fa-chevron-left").removeClass("fa-chevron-left").addClass("fa-chevron-right");
    }).on("shown.bs.collapse", function () {
        $("#main_collapse").find(".fa-chevron-right").removeClass("fa-chevron-right").addClass("fa-chevron-left");
    });
    $("#btnXemQuyenLoiChiTiet,#btnXemChiTietQuyenLoiBaoHiem").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }
        _service.getListQuyenLoiGoc(obj).then(res => {
            var res_qloi = res.data_info.qloi;
            var res_dkbs = res.data_info.dkbs.where(n => n.type == 'DKBS');
            var res_ghi_chu_khac = res.data_info.dkbs.where(n => n.type == 'KHAC');

            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("dsQuyenLoiGocTemplate", "dsQuyenLoiGoc", { lstQlg: res_qloi });
            _navThongTinQuyenLoiDKBS.showTab("tabThongTinQuyenLoiBaoHiem");
            ESUtil.genHTML("dsDieuKhoanBoSung_template", "dsDieuKhoanBoSung", { data: res_dkbs });
            ESUtil.genHTML("dsGhiChuKhac_template", "dsGhiChuKhac", { data: res_ghi_chu_khac });

            var obj_1 = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
                so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt
            }
            _service.layLSTT(obj_1).then(res_1 => {
                if (res_1 !== undefined && res_1 !== null && res_1.state_info.status === "NotOK") {
                    _notifyService.error(res_1.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("tblThongTinLSTTTemplate", "tblThongTinLSTT", { arrHoSo: res_1.data_info.ho_so }, () => {
                    var tong_yc = 0, tong_duyet = 0;
                    $.each(res_1.data_info.ho_so, (index, item) => {
                        tong_yc += parseFloat(item.so_tien_yc);
                        tong_duyet += parseFloat(item.so_tien_duyet);
                    });
                    $('#tongYeuCauLSTT').html(ESUtil.formatMoney(tong_yc));
                    $('#tongDuyetLSTT').html(ESUtil.formatMoney(tong_duyet));
                });
            });
            _modalXemQuyenLoiChiTiet.show();
        });
    });
    $("#btnAddQuyenLoiYeuCau").click(function () {
        luuLanTiepNhan(() => {
            $(".tai-nan").hide();
            _frmThemQuyenLoiLanTiepNhan.clearErrorMessage();
            _frmThemQuyenLoiLanTiepNhan.resetForm();
            $('#ghi_chu_lan_tn').val('');
            $('#ghi_chu_khac_lan_tn').val('');
            _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").readOnly(false);
            _frmThemQuyenLoiLanTiepNhan.getControl("lh_nv").readOnly(false);
            var lan = _frmThemLanTiepNhan.getControl("lan").val();

            if (lan == undefined || lan == null || lan == 0 || lan == "") {
                _notifyService.error("Bạn chưa chọn lần khám cần thêm");
                return;
            }
            var obj = {
                nguyen_nhan: "",
                hinh_thuc: "",
                lh_nv: "",
                tien_yc: "0"
            };
            if (ho_so_chi_tiet.lan_kham_qloi != null && ho_so_chi_tiet.lan_kham_qloi.length > 0) {
                obj.nguyen_nhan = ho_so_chi_tiet.lan_kham_qloi[ho_so_chi_tiet.lan_kham_qloi.length - 1].nhom_nguyen_nhan;
                obj.hinh_thuc = ho_so_chi_tiet.lan_kham_qloi[ho_so_chi_tiet.lan_kham_qloi.length - 1].hinh_thuc;
                obj.lh_nv = ho_so_chi_tiet.lan_kham_qloi[ho_so_chi_tiet.lan_kham_qloi.length - 1].lh_nv;
            }
            _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").setValue(obj.nguyen_nhan);
            _frmThemQuyenLoiLanTiepNhan.getControl("nguyen_nhan").trigger("select2:select");
            _frmThemQuyenLoiLanTiepNhan.setData(obj);

            $("#itemChiPhiKhamBenh").trigger("click");
            $("#tblChiPhiKhamBenh_TongTienKham").html("0");
            $("#tblChiPhiThuoc_TongThanhTien").html("0");
            $("#tblChiPhiKhac_TongSoTien").html("0");
            ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: [] });
            ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: [] });
            ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: [] });
            ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: [] }, () => {
                $('#tong_chphi_tien_yc').html(0);
            });
            _modalAddQuyenLoiYeuCau.show();
        });
    });
    $("#btnThemQuyenLoiBaoHiem").click(function () {
        luuQuyenLoiBoiThuong();
    });
    $("#btnThemDongQuyenLoiBaoHiem").click(function () {
        luuQuyenLoiBoiThuong(res => {
            _modalAddQuyenLoiYeuCau.hide();
        });
    });
    $("#btnLuuThongTin").click(function () {
        luuLanTiepNhan();
    });
    $("#btnMoiThongTin").click(function () {
        _frmThemLanTiepNhan.clearErrorMessage();
        _frmThemLanTiepNhan.resetForm();
        _frmThemLanTiepNhan.getControl("ngay_vv").setValue(new Date().ddmmyyyy());
        _frmThemLanTiepNhan.getControl("ngay_rv").setValue(new Date().ddmmyyyy());
        $("#tblLanTiepNhan tr").removeClass("row-selected");
        _frmThemLanTiepNhan.getControl("benh_vien").attr("col-val", "");
        _frmThemLanTiepNhan.getControl("nha_thuoc").attr("col-val", "");
        $("#tong_tien_yc").html("0");
        ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
        tinhSoNgay();
    });
    $("#btnXoaThongTin").click(function () {
        var obj = _frmThemLanTiepNhan.getJsonData();
        if (obj.lan == undefined || obj.lan == null || obj.lan == 0 || obj.lan == "") {
            _notifyService.error("Bạn chưa chọn lần khám");
            return;
        }
        obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.ho_so.so_id;

        _notifyService.confirm("Bạn có chắc muốn xóa lần tiếp nhận này không?", "", () => {
            _service.XoaHoSoTiepNhanLan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xóa lần tiếp nhận thành công.");
                $("#btnMoiThongTin").trigger("click");
                layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id }, resDetail => {
                    $("#tong_tien_hs").html(ESUtil.formatMoney(tongChiPhi()));
                    $("#tong_tien_yc").html("0");
                    ESUtil.genHTML("tbl_bao_lanh_quyen_loi_ct_template", "tbl_bao_lanh_quyen_loi_ct", { data: [] });
                    ESUtil.genHTML("tblLanTiepNhanTemplate", "tblLanTiepNhan", ho_so_chi_tiet, function () {
                        if (ho_so_chi_tiet.lan_kham.length > 0) {
                            XemChiTietLan(ho_so_chi_tiet.lan_kham[0].lan);
                        }
                    });
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                    });
                });
                getPaging(1);
            });
        });
    });
    $("#btnChuyenBoiThuong").click(function () {
        var objCheck = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id
        };
        _service.ktraHoSoDuyetTuDong(objCheck).then(resCheck => {
            if (resCheck.state_info.status !== "OK") {
                _notifyService.error(resCheck.state_info.message_body);
                return;
            }
            _notifyService.ChuyenTinhToan("Bạn có chắc chắn chuyển sang bộ phận tính toán không?", () => {
                $(".tt_duyet_tu_dong").addClass("d-none");
                if (resCheck.data_info.dkien_ap_dung == "D") {
                    $(".tt_duyet_tu_dong").removeClass("d-none");
                }
            }, type => {
                var checked = $("#tt_duyet_tu_dong").is(":checked");
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    gui_email: 'C',
                    loai: 'NG_CHUYEN_TINH_TOAN',
                    duyet_tu_dong: (checked && resCheck.data_info.dkien_ap_dung == "D") ? "C" : "K"
                }
                _service.chuyenHoSoSangTinhToan(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    layHoSoCTiet(obj, res => {
                        ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                            ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                        });
                        ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", ho_so_chi_tiet);
                    });
                    getPaging(1);
                    _notifyService.success("Chuyển hồ sơ sang thành công.");
                    if (res.out_value.chuyen_mh == 1) {
                        var data = {
                            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                            so_id: ho_so_chi_tiet.ho_so.so_id,
                            hanh_dong: 'XEM_CTIET_HO_SO_BT'
                        };
                        var notify_url = "/healthclaim/healthcompensation";
                        window.open("/healthclaim/receive/TransCompensationDisplay?ma_doi_tac=" + data.ma_doi_tac + "&so_id=" + data.so_id + "&hanh_dong=" + data.hanh_dong + "&url_redirect=" + notify_url, '_self');
                    }
                });
            });
        });
    });
    $("#btnUpLoadAnhDGTT").click(function () {
        _uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            type: "image",
            pm: CONSTANT_PM,
            nv: NV
        });
        _uploadService.showPupup();
    });
    $("#btnPhanLoaiTonThat").click(function () {
        _frmThemHMTT.getControl("hang_muc").setValue("");
        var arrVal = [];
        $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
            var objArrVal = {
                bt: $(this).val(),
                hm: $(this).attr('data-hm')
            }
            arrVal.push(objArrVal);
        });
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        _frmThemHMTT.getControl("hang_muc").setValue(arrVal[arrVal.length - 1].hm);
        _modalThemHMTT.show();
    });
    $("#btnXoaLoadAnhDGTT").click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", null, val => {
            var json = {
                so_id: ho_so_chi_tiet.ho_so.so_id,
                so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
                bt: arrVal,
                pm: CONSTANT_PM,
                nv: NV
            };
            _service.xoaAnhHoSoGiamDinh(json).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(response => {
                    if (response !== undefined && response !== null && response.state_info.status === "NotOK") {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Xóa ảnh thành công.");
                });
            });
        });
    });
    $("#btnLuuLyDoHuy").click(function () {
        if (!_frmLyDoHuyHoSo.isValid()) {
            return;
        }
        _notifyService.confirm("Bạn có chắc hủy hồ sơ này không?", "", () => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                nd_huy: _frmLyDoHuyHoSo.getControl("ly_do").getValue()
            }
            _service.huyHoSoTiepNhan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Hủy hồ sơ thành công.");
                _modalHuyHoSo.hide();
                layHoSoCTiet(obj, res => {
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                    });
                    ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", ho_so_chi_tiet);
                });
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
                getPaging(1);
            });
        });
    });
    $("#btnYeuCauBoSungHoSo").click(function () {
        layDsHoSoGiayTo(res => {
            ESUtil.genHTML("templateDsHoSoGiayTo", "bodyDsHoSoGiayTo", { ho_so_giay_to: ho_so_chi_tiet.ho_so_giay_to });
            _modalYeuCauBoSungHoSo.show();
        });
    });
    $("#btnLuuYeuCauBoSungHoSo").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nv: "NG",
            pm: CONSTANT_PM,
            arr: []
        };

        $("#bodyDsHoSoGiayTo input.input_chon_hsgt_bs:checked").each(function (el) {
            var ma_hs = $(this).val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            var trang_thai = $(this).closest('tr').find('input.input_chon_trang_thai:checked').length == 0 ? 'C' : 'D';
            var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
            var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
            var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
            obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: '', gara_thu_ho: 0, trang_thai: 'C', hop_le: hop_le, loai: loai, ghi_chu: ghi_chu });
        });

        $("#bodyDsHoSoGiayTo input.input_chon_trang_thai:checked").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ngay = $(this).closest('tr').find('a[data-field=ngay_bs]').attr("data-val").dateToNumber();
            if (ngay != null && ngay != undefined && ngay != "" && !isNaN(ngay)) {
                var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
                var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
                var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
                var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
                obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: '', ngay_bs: ngay, gara_thu_ho: 0, trang_thai: 'D', hop_le: hop_le, loai: loai, ghi_chu: ghi_chu });
            } else {
                var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
                var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
                var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
                obj.arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: '', gara_thu_ho: 0, trang_thai: 'D', hop_le: 1, loai: loai, ghi_chu: ghi_chu });
            }
        });
        _healthClaimCommonService.luuBsHoSoGiayToBoSung(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layDsHoSoGiayTo(res => {
                ESUtil.genHTML("templateDsHoSoGiayTo", "bodyDsHoSoGiayTo", { ho_so_giay_to: ho_so_chi_tiet.ho_so_giay_to });
            });
            var data = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id
            }
            layHoSoCTiet(data, res => {
                ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                    ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                });
                getPaging(1);
            });
            _notifyService.success("Lưu yêu cầu bổ sung giấy tờ thành công");
        });
    });
    $("#fileHoaDonDT").change(function () {
        var i = $(this).prev("label").clone();
        var file = $("#fileHoaDonDT")[0].files[0].name;
        $(this).prev("label").text(file);
    });
    $("#btnPrint").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_YCTTBH", ten: "Giấy yêu cầu trả tiền bảo hiểm" },
            { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" }
        ];
        _modalDocumentService.setDataSource(sourceMauIn);
        _modalDocumentService.onClickIem = function (ma_mau_in) {
            _commonService.InPdf({
                ma_mau_in: ma_mau_in,
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
                so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd
            },
                "#modalDocumentContents").then(response => {
                    _modalDocumentService.viewFile(response);
                });
        }
        _modalDocumentService.show("ESCS_YCTTBH");
    });
    $("#btnXemTaiLieu").click(function () {
        _commonService.InPdf({
            ma_mau_in: "BT_ANH_TON_THAT_NG",
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            bt: getImageSelect()

        }, "#modalDocumentContents").then(res => {
            ESUtil.convertBase64ToFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf", "application/pdf");
        });
    });
    $("#btnGuiEmailThongBao").click(function () {
        _esSendEmail.show({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nv: "NG",
            pm: "TN",
            loai: "TEMPLATE_EMAIL_NG_BSCT"
        });
    });
    $("#btnChonBenhVien").click(function () {
        var target = _modalBenhVien.target;
        var val = $("#modalBenhVienDanhSach .modalBenhVienItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
            $(target).val(bv.ten);
            $(target).attr("col-val", bv.ma);
        }
        _modalBenhVien.hide();
    });
    $("#btnChonNhaThuoc").click(function () {
        var target = _modalNhaThuoc.target;
        var val = $("#modalNhaThuocDanhSach .modalNhaThuocItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var nt = objDanhMuc.nha_thuoc.where(n => n.ma == val).firstOrDefault();
            $(target).val(nt.ten);
            $(target).attr("col-val", nt.ma);
        }
        _modalNhaThuoc.hide();
    });
    $("#inputSearch_benhvien").keyup(function () {
        setTimeout(() => {
            var val = $(this).val().toLowerCase();
            if (val == "") {
                $("#modalBenhVienDanhSach div.dsbv[data-text]").show();
                return;
                $(target).attr("col-val", val);
            }
            $("#modalBenhVienDanhSach div.dsbv[data-text]").hide();
            $("#modalBenhVienDanhSach div.dsbv[data-text*='" + val + "']").show();
        }, 500);
    });
    $("#inputSearch_nhathuoc").keyup(function () {
        setTimeout(() => {
            var val = $(this).val().toLowerCase();
            if (val == "") {
                $("#modalNhaThuocDanhSach div.dsnt[data-text]").show();
                return;
                $(target).attr("col-val", val);
            }
            $("#modalNhaThuocDanhSach div.dsnt[data-text]").hide();
            $("#modalNhaThuocDanhSach div.dsnt[data-text*='" + val + "']").show();
        }, 500);
    });
    $("#btnLuuHMTT").click(function () {
        luuPhanLoaiHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanLoaiHangMuc(res => {
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
            _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: arrVal[0] }).then(res => {
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
            _healthClaimCommonService.taiFileAnhTonThatZip({ so_id: ho_so_chi_tiet.ho_so.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });
    $("#inputSearch_BenhVien").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
            return;
        }
        $("#modalBenhVienDanhSach .dsbv").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.benh_vien.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalBenhVienDanhSach #dsbv_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_NhaThuoc").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalNhaThuocDanhSach .dsnt").removeClass("d-none");
            return;
        }
        $("#modalNhaThuocDanhSach .dsnt").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.nha_thuoc.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalNhaThuocDanhSach #dsnt_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnThemHoaDonChungTu").click(function () {
        _frmHoaDonChungTu.resetForm();
        _frmHoaDonChungTu.clearErrorMessage();
        _frmHoaDonChungTu.getControl("so_id").val(ho_so_chi_tiet.ho_so.so_id);
        _modalHoaDonChungTu.show();
    });
    $("#btnThemNguoiThuHuong").click(function () {
        _frmNguoiThuHuong.resetForm();
        _frmNguoiThuHuong.clearErrorMessage();
        _frmNguoiThuHuong.getControl("so_id").val(ho_so_chi_tiet.ho_so.so_id);
        _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        _modalNguoiThuHuong.show();
    });
    $("#btnLuuHoaDonChungTu").click(function () {
        var data = _frmHoaDonChungTu.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmHoaDonChungTu.isValid()) {
            _healthClaimCommonService.nhapChungTu(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layThongTinChungTu(ho_so_chi_tiet);
                _frmHoaDonChungTu.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuDongHoaDonChungTu").click(function () {
        var data = _frmHoaDonChungTu.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        data.pm = CONSTANT_PM;
        if (_frmHoaDonChungTu.isValid()) {
            _healthClaimCommonService.nhapChungTu(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layThongTinChungTu(ho_so_chi_tiet);
                _modalHoaDonChungTu.hide();
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuNguoiThuHuong").click(function () {
        var data = _frmNguoiThuHuong.getJsonData();
        data.pm = CONSTANT_PM;
        if (_frmNguoiThuHuong.isValid()) {
            data.loai = "TH";
            _healthClaimCommonService.nhapThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layThongTinChungTu();
                _frmNguoiThuHuong.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnLuuDongNguoiThuHuong").click(function () {
        var data = _frmNguoiThuHuong.getJsonData();
        data.pm = CONSTANT_PM;
        if (_frmNguoiThuHuong.isValid()) {
            data.loai = "TH";
            _healthClaimCommonService.nhapThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layThongTinChungTu();
                _frmNguoiThuHuong.getControl("bt").setValue(res.out_value.bt);
                _modalNguoiThuHuong.hide()
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnChonFileHoaDon").click(function () {
        if (!_frmUploadHDDT.isValid()) {
            return;
        }
        $("#fileHoaDonDT").trigger("click");
    });
    $("#btnDocFileHoaDon").click(function () {
        if (_frmUploadHDDT.isValid()) {
            _frmHoaDonChungTu.resetForm();
            _frmHoaDonChungTu.clearErrorMessage();
            var formData = _frmUploadHDDT.getFormFileData();
            formData.append("ma_doi_tac", ho_so_chi_tiet.ho_so.ma_doi_tac);
            formData.append("so_id", ho_so_chi_tiet.ho_so.so_id);
            _common.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDon.hide();
                    $('#btnThemHoaDonChungTu').trigger('click');
                    var obj = {
                        so_id: ho_so_chi_tiet.ho_so.so_id,
                        dvi_phat_hanh: _frmUploadHDDT.getControl('dvi_ph').getValue(),
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
                        ma_tra_cuu: '',
                        website_tra_cuu: ''
                    }
                    obj.tl_thue = obj.tl_thue.replace('%', '');
                    _frmHoaDonChungTu.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmHoaDonChungTu.setData(obj);
                }
            });
        }
    });
    $("#btnDongTraCuuBenh").click(function () {
        _popoverTraCuuBenh.hide();
    });
    $("#btnChonCanBo").click(function () {
        var target = _modalCanBo.target;
        var val = $("#modalCanBoDanhSach .modalCanBoItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var can_bo = objDanhMuc.ds_can_bo.where(n => n.ma == val).firstOrDefault();
            $(target).val(can_bo.ten);
            $(target).attr("col-val", can_bo.ma);
        }
        _modalCanBo.hide();
    });
    $("#inputSearch_CanBo").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalCanBoDanhSach .dscb").removeClass("d-none");
            return;
        }
        $("#modalCanBoDanhSach .dscb").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.ds_can_bo.where(n => n.ten.toLowerCase().includes(tim));
        }

        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalCanBoDanhSach #dscb_" + source[i].ma.trim().replace(/[^a-zA-Z0-9]/g, '')).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnChonChiPhiKhamBenh").click(function () {
        var arr = getTableChiPhiKham();
        var ds_chon = $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem:checked");
        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.ds_chi_phi.where(n => n.loai == "KB" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({
                        ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct,
                        so_tien: 0, gia_tham_khao: chi_phi.gia_tham_khao, mac_dinh: 0
                    });
                }
            });
        }
        danh_sach_chon.sort((a, b) => { a.mac_dinh - b.mac_dinh });
        ESUtil.genHTML("tblChiPhiKhamBenhTemplate", "tblChiPhiKhamBenh", { data: danh_sach_chon });
        _modalChiPhiKhamBenh.hide();
    });
    $("#btnChonChiPhiThuoc").click(function () {
        var arr = getTableChiPhiThuoc();
        var ds_chon = $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem:checked");
        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.ds_chi_phi.where(n => n.loai == "TH" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({
                        ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct, so_tien: 0,
                        gia_tham_khao: chi_phi.gia_tham_khao, mac_dinh: 0, so_luong: 1, dvi_tinh: chi_phi.dvi_tinh
                    });
                }
            });
        }
        danh_sach_chon.sort((a, b) => { a.mac_dinh - b.mac_dinh });
        ESUtil.genHTML("tblChiPhiThuocTemplate", "tblChiPhiThuoc", { data: danh_sach_chon });
        _modalChiPhiThuoc.hide();
    });
    $("#btnChonChiPhiKhac").click(function () {
        var arr = getTableChiPhiKhac();
        var ds_chon = $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem:checked");
        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.ds_chi_phi.where(n => n.loai == "KH" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({
                        ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct,
                        so_tien: 0, gia_tham_khao: chi_phi.gia_tham_khao, mac_dinh: 0
                    });
                }
            });
        }
        danh_sach_chon.sort((a, b) => { a.mac_dinh - b.mac_dinh });
        ESUtil.genHTML("tblChiPhiKhacTemplate", "tblChiPhiKhac", { data: danh_sach_chon });
        _modalChiPhiKhac.hide();
    });
    $("#btnXemChiTietChiPhiKhamChuaBenh").click(function () {
        $("#dsKhoanChiPhi").slideToggle();
    });
    $("#btnLuuChuyenNguoiXuLy").click(function () {
        _notifyService.confirm("Bạn có chắc chắn chuyển hồ sơ không ?", "", val => {
            if (_frmChuyenNguoiXuLy.isValid()) {
                var obj = _frmChuyenNguoiXuLy.getJsonData();
                obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
                obj.so_id = ho_so_chi_tiet.ho_so.so_id;
                obj.pm = "TIEP_NHAN";
                _service.chuyenNguoiXuLy(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    ho_so_chi_tiet.ho_so.ma_chi_nhanh = obj.ma_chi_nhanh_moi;
                    ho_so_chi_tiet.ho_so.nsd = obj.nsd_moi;
                    _modalChuyenNguoiXuLy.hide();
                    _notifyService.success("Chuyển người xử lý thành công");
                    getPaging(1);
                })
            }
        });
    });
    $("#btnBaoCao").click(function () {
        _modalBaoCaoService.show();
    });
    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $('#btnAnhHopDong').click(function () {
        if ($(this).find('i.fas').hasClass('fa-file-contract')) {
            getAnhThumnailHopDong(() => {
                $(this).find('i.fas').removeClass('fa-file-contract').addClass('fa-heartbeat');
                $(this).find('i.fas').attr('title', 'Click để xem ảnh tiếp nhận hồ sơ');
            });
        } else if ($(this).find('i.fas').hasClass('fa-heartbeat')) {
            getAnhThumnail(() => {
                $(this).find('i.fas').removeClass('fa-heartbeat').addClass('fa-file-contract');
                $(this).find('i.fas').attr('title', 'Click để xem ảnh hợp đồng');
            });
        }
    });
    $("#btnNhanHoSoTN").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn nhận hồ sơ này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id
            };
            _service.nhanHoSo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Nhận hồ sơ thành công");
                layHoSoCTiet(obj, res => {
                    ESUtil.genHTML("navThongTinChung_template", "navThongTinChung", ho_so_chi_tiet, () => {
                        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so);
                    });
                    ESUtil.genHTML("navThongTinCSYT_template", "navThongTinLienHe", ho_so_chi_tiet);
                });
                getPaging(1);
            });
        });
    });
    $("#btnLuuGhiChu").click(function () {
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
    $("#btnLuuThongTinChiPhi").click(function () {
        if (_frmDMChiPhi.isValid()) {
            var obj = _frmDMChiPhi.getJsonData();
            obj.ma_doi_tac = ESCS_MA_DOI_TAC;
            _healthClaimCommonService.luuThongTinChiPhi(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _costsListService.layDsChiPhi().then(res1 => {
                    objDanhMuc.ds_chi_phi = chuanHoaChiPhi(res1.data_info);
                    _notifyService.success("Lưu thông tin chi phí thành công.");
                });
            });
        }
    });
    $("#btnLuuDongThongTinChiPhi").click(function () {
        if (_frmDMChiPhi.isValid()) {
            var obj = _frmDMChiPhi.getJsonData();
            obj.ma_doi_tac = ESCS_MA_DOI_TAC;
            _healthClaimCommonService.luuThongTinChiPhi(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _costsListService.layDsChiPhi().then(res1 => {
                    objDanhMuc.ds_chi_phi = chuanHoaChiPhi(res1.data_info);
                    _popoverDMChiPhi.hide();
                    _notifyService.success("Lưu thông tin chi phí thành công.");
                });
            });
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
    $("#inputSearch_ChiPhiKhamBenh").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChiPhiKhamBenhDanhSach .dscpkb").removeClass("d-none");
            return;
        }
        $("#modalChiPhiKhamBenhDanhSach .dscpkb").addClass("d-none");
        var data = [];
        if (tim != "") {
            data = objDanhMuc.ds_chi_phi.where(n => n.loai == "KB");
            source = data.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChiPhiKhamBenhDanhSach #dscpkb_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_ChiPhiThuoc").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChiPhiThuocDanhSach .dscpt").removeClass("d-none");
            return;
        }
        $("#modalChiPhiThuocDanhSach .dscpt").addClass("d-none");
        var data = [];
        if (tim != "") {
            data = objDanhMuc.ds_chi_phi.where(n => n.loai == "TH");
            source = data.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChiPhiThuocDanhSach #dscpt_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_ChiPhiKhac").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalChiPhiKhacDanhSach .dscpk").removeClass("d-none");
            return;
        }
        $("#modalChiPhiKhacDanhSach .dscpk").addClass("d-none");
        var data = [];
        if (tim != "") {
            data = objDanhMuc.ds_chi_phi.where(n => n.loai == "KH");
            source = data.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChiPhiKhacDanhSach #dscpk_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnChonLoaiChiPhi").click(function () {
        var lan = _frmThemQuyenLoiLanTiepNhan.getControl("lan").val();
        var id_qloi = _frmThemQuyenLoiLanTiepNhan.getControl("id_qloi").val();
        //Lấy dữ liệu table
        var arr_table = getTableChiPhi();
        //Danh sách đã chọn
        var arr_chon = getCheckedChiPhi();
        var arr_tong_hop = [];
        for (var i = 0; i < arr_chon.length; i++) {
            var chi_phi = arr_table.where(n => n.loai_ct == arr_chon[i].loai_ct && n.loai == arr_chon[i].loai).firstOrDefault();
            if (chi_phi != null) {
                chi_phi.so_luong = ho_so_chi_tiet.chi_phi_ct.where(n => n.lan == lan && n.id_qloi == id_qloi && n.ma_ct == chi_phi.loai_ct).length;
                arr_tong_hop.push(chi_phi);
            }
            else {
                arr_chon[i].so_luong = 0;
                arr_tong_hop.push(arr_chon[i]);
            }
        }

        ESUtil.genHTML("tbDsKhoanChiTemplate", "tbDsKhoanChi", { danh_sach: arr_tong_hop });
        _modalLoaiChiPhi.hide();
    });
    $("#btnBoChonLoaiChiPhi").click(function () {
        var target = _modalLoaiChiPhi.target;
        $(target).attr("data-val", "");
        $(target).html("Chọn loại chi phí");
        _modalLoaiChiPhi.hide();
    });
    $('#btnLuuChiTietChiPhi').click(function () {
        LuuChiPhiChiTiet();
    });
    $('#btnLuuDongChiTietChiPhi').click(function () {
        LuuChiPhiChiTiet(res => {
            _modalChiTietChiPhi.hide();
        })
    });
    $("#btnXemTaiLieu_dialog").click(function () {
        $("#dsHinhAnhHoSo").html("");
        _service.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("dsTaiLieuHoSoTemplate", "dsTaiLieuHoSo", { danh_sach: [] });
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ds_pdf = res.data_info.where(n => n.extension == ".pdf");
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                ESUtil.genHTML("dsTaiLieuHoSoTemplate", "dsTaiLieuHoSo", { danh_sach: ds_pdf });
                var arrAnh = bindImagesTab2(ds_anh);
                ESUtil.genHTML("dsHinhAnhHoSoTemplate", "dsHinhAnhHoSo", { danh_sach: arrAnh });
            }
            initImageViewerTab2();
            if ($("#modalDialogTaiLieu").hasClass("active")) {
                anHienTaiLieu(false);
            }
            else {
                var height = $("#modalDialogThongTin .modal-content").height();
                $("#modalDialogThongTin .modal-content").attr("data-height", height);
                anHienTaiLieu(true, () => {
                    setTimeout(function () {
                        var height_tai_lieu = $("#modalDialogTaiLieu .modal-content").height();
                        $("#modalDialogThongTin .modal-content").height(height_tai_lieu);
                    }, 500);
                });
            }
        });
    });
    $('#btnCloseTaiLieu').click(function () {
        anHienTaiLieu(false);
    });
    $("#inputTimKiemBenhLy").click(function () {
        $(this).focus();
    });
    $("#btnThemHangMucTaiLieu").click(function () {
        _modalThemHMTT.hide();
        var objData = {
            ma_doi_tac: objDanhMuc.doi_tac
        }
        _healthClaimCommon.showThemHangMucTaiLieu(objData, () => {
            _categoryPersonListService.layDsHMCN().then(res => {
                objDanhMuc.hang_muc_tai_lieu = res.data_info.where(n => n.loai == 'TL');
                _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tai_lieu, "ten", "ma", "Chọn tài liệu", "");
                _modalThemHMTT.show();
            });
        });
    });
    $('#btnThemDanhMucBenhVien').click(function () {
        var objData = {
            ma_doi_tac: objDanhMuc.doi_tac,
            ngan_hang: objDanhMuc.ngan_hang,
            chi_nhanh_ngan_hang: objDanhMuc.chi_nhanh_ngan_hang,
            don_vi_hanh_chinh: objDanhMuc.donvihanhchinh
        }
        _healthClaimCommon.showThemDanhMucBenhVien(objData, () => {
            _healthClaimCommonService.layDsBenhVien().then(res => {
                objDanhMuc.benh_vien = res.data_info;
                ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
                    $("#modalBenhVienDanhSach .single_checked").click(function () {
                        $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                        $(this).prop("checked", true);
                    });
                });
            });
        });
    });
    $('#btnThemDanhMucNhaThuoc').click(function () {
        var objData = {
            ma_doi_tac: objDanhMuc.doi_tac,
            ngan_hang: objDanhMuc.ngan_hang,
            chi_nhanh_ngan_hang: objDanhMuc.chi_nhanh_ngan_hang,
            don_vi_hanh_chinh: objDanhMuc.donvihanhchinh
        }
        _healthClaimCommon.showThemDanhMucNhaThuoc(objData, () => {
            _healthClaimCommonService.layDsNhaThuoc().then(res => {
                objDanhMuc.nha_thuoc = res.data_info;
                ESUtil.genHTML("modalNhaThuocDanhSachTemplate", "modalNhaThuocDanhSach", { danh_sach: objDanhMuc.nha_thuoc }, () => {
                    $("#modalNhaThuocDanhSach .single_checked").click(function () {
                        $("#modalNhaThuocDanhSach .single_checked").prop("checked", false);
                        $(this).prop("checked", true);
                    });
                });
            });
        });
    });
    $('#close_popGhiChuLSTT').click(function () {
        _popoverGhiChuLSTT.hide();
    });
    $('#close_nguyenNhanGiamTru').click(function () {
        _popoverNguyenNhanGiamTru.hide();
    });
    $('#btnGuiEmailYCBSHS').click(function () {
        var arr = [];
        $("#bodyDsHoSoGiayTo input.input_chon_trang_thai:checked").each(function (el) {
            var ma_hs = $(this).closest('tr').find('input.input_chon_hsgt_bs').val();
            var ngay = $(this).closest('tr').find('a[data-field=ngay_bs]').attr("data-val").dateToNumber();
            if (ngay != null && ngay != undefined && ngay != "" && !isNaN(ngay)) {
                var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
                var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
                var hop_le = $(this).closest('tr').find('input.input_chon_hop_le:checked').length == 0 ? 0 : 1;
                var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
                arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: '', ngay_bs: ngay, gara_thu_ho: 0, trang_thai: 'D', hop_le: hop_le, loai: loai, ghi_chu: ghi_chu });
            } else {
                var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
                var loai = $(this).closest('tr').find('a[data-field=loai]').attr('data-val');
                var ghi_chu = $(this).closest('tr').find('a[data-field=ghi_chu]').attr('data-val');
                arr.push({ ma_hs: ma_hs, ten: ten, so_id_doi_tuong: '', gara_thu_ho: 0, trang_thai: 'D', hop_le: 1, loai: loai, ghi_chu: ghi_chu });
            }
        });
        var count_check = arr.where(n => n.hop_le == '0').length;
        if (count_check > 0) {
            _notifyService.confirmDelete("Có " + count_check + " hồ sơ giấy tờ chưa được tick hợp lệ, Bạn có muốn tiếp tục yêu cầu khách hàng bổ sung?", "", val => {
                _esSendEmail.show({
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                    so_id: ho_so_chi_tiet.ho_so.so_id,
                    nv: 'NG',
                    pm: 'TN',
                    loai: "TEMPLATE_EMAIL_NG_BSCT"
                });
            });
        } else {
            _esSendEmail.show({
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                nv: 'NG',
                pm: 'TN',
                loai: "TEMPLATE_EMAIL_NG_BSCT"
            });
        }
    });
    $("#inputSearch_LoaiChiPhi").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalLoaiChiPhiDanhSach .dslcp").removeClass("d-none");
            return;
        }
        $("#modalLoaiChiPhiDanhSach .dslcp").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.nhom_chi_phi.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalLoaiChiPhiDanhSach #dslcp_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnDongPopperGhiChuBoSungHSGT").click(function () {
        _popoverGhiChuBoSungHSGT.hide();
    });
    $("#btnLuuGhiChuBoSungHSGT").click(function () {
        var val = $("#divGhiChuBoSungHSGT_NoiDung").val();
        $(_popoverGhiChuBoSungHSGT.target).attr("data-val", val);
        if (val != "") {
            $(_popoverGhiChuBoSungHSGT.target).attr("href", "#");
        }
        else {
            $(_popoverGhiChuBoSungHSGT.target).removeAttr("href");
        }
        _popoverGhiChuBoSungHSGT.hide();
    });
    $("#inputSearch_LichSuTonThat").keyup(ESUtil.delay(function (e) {
        var val = $("#inputSearch_LichSuTonThat").val().trim();
        $("#tblLichSuTonThatConNguoi .lichSuTonThat").removeClass("d-none");
        if (val != "") {
            $("#tblLichSuTonThatConNguoi .lichSuTonThat").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblLichSuTonThatConNguoi .lichSuTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#inputSearch_LichSuTonThatTop5").keyup(ESUtil.delay(function (e) {
        var val = $("#inputSearch_LichSuTonThatTop5").val().trim();
        $("#tblLichSuTonThatConNguoiTop5 .lichSuTonThat").removeClass("d-none");
        if (val != "") {
            $("#tblLichSuTonThatConNguoiTop5 .lichSuTonThat").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblLichSuTonThatConNguoiTop5 .lichSuTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
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
    $("#btnXemQRCode").click(function () {
        var obj = {
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nv: "NG",
            loai: "HOSO"
        }
        _modalXemQRCode.data = obj;
        _modalXemQRCode.xemFile();
    });
    //Export Excel LSTT
    $("#btnExportExcelLSTT").click(function () {
        var _serviceTmpHome = new Service();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id_hd: ho_so_chi_tiet.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.ho_so.so_id_dt,
        }
        obj.ma_mau_in = "ESCS_EXCEL_DS_LSTT";
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
    $("#btnLuuDongThongTinNguoiLienHe").click(function () {
        luuThayDoiNguoiLienHe(res => {
            _modalThongTinNguoiLienHe.hide();
        });
    });
    $("#btnLuuDongThongTinNguoiThongBao").click(function () {
        luuThayDoiNguoiThongBao(res => {
            _modalThongTinNguoiThongBao.hide();
        });
    });
    $("#btnThongTinGoiBH").click(function () {
        _healthClaimCommon.showThongTinGoiBH(data_gcn_chon);
    });
    $("form[name='FrmSearch'] input[name='so_hs'],input[name='ten_kh'],input[name='nd_tim'],input[name='so_hd']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPaging(1);
        }
    });
    //Đọc OCR
    $("#btnDocOCR").click(function () {
        ESUtil.genHTML("modalCompareDataOCRThongTinChungTemplate", "modalCompareDataOCRThongTinChung", { data: [] });
        ESUtil.genHTML("modalCompareDataOCRGiayToTemplate", "modalCompareDataOCRGiayTo", { data: [] });
        ESUtil.genHTML("modalCompareDataOCRBangKeChiTietTemplate", "modalCompareDataOCRBangKeChiTiet", { data: [] });
        ESUtil.genHTML("modalCompareDataOCRHoaDonChiTietTemplate", "modalCompareDataOCRHoaDonChiTiet", { data: [] });
        $("#modalFormBangKeChiTiet").addClass("d-none");
        $("#ocr_chon_tat_ca").prop("checked", false);
        $("#checked_all").prop("checked", false);
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.ho_so.ma_chi_nhanh,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }
        _service.layDanhSachFile(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("tblDanhSachHinhAnhHoSoGiayToOCR_template", "tblDanhSachThongTinHoSoGiayToOCR", { danh_sach: [] });
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var data = [];
                var ds_giay_to = fillterDuLieuGiayToCauHinh(objDanhMuc.ds_giay_to);
                $.each(res.data_info, function (index, item) {
                    $.each(ds_giay_to, function (index1, item1) {
                        if (item.ma_file == item1.hang_muc && item1.hang_muc != 'KHAC') {
                            data.push(item);
                        }
                    });
                });
                var ds_pdf = data.where(n => n.extension == ".pdf");
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = data.where(n => ext.includes(n.extension));
                var arrAnh = bindImageOCR(ds_anh);
                var arrFiles = bindImageOCR(ds_pdf);
                ESUtil.genHTML("tblDanhSachHinhAnhHoSoGiayToOCR_template", "tblDanhSachThongTinHoSoGiayToOCR", { danh_sach: arrFiles });
                ESUtil.genHTML("tblDanhSachHinhAnhHoSoGiayToOCR_template", "tblDanhSachHinhAnhHoSoGiayToOCR", { danh_sach: arrAnh });
            }
            _modalHealthClaimCompareData.show();
        });
    });
    $("#btnDocOCRGiayTo").click(function () {
        $("#ocr_chon_tat_ca").prop("checked", false);
        var arrVal = getImageOCR();
        var arrHangMuc = getHangMucOCR();
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            hang_muc: arrHangMuc,
            bt: arrVal,
            su_dung_truc_tiep_kqua: "C"
        }
        if (arrVal == undefined || arrVal == null || arrVal.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        _healthClaimCommonService.docOCR(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            soSanhDuLieuOCR(obj);
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
                        if (item.ma_file == item1.hang_muc && (item1.ma == 'HOA_DON_VIEN_PHI')) {
                            data.push(item);
                        }
                    });
                });
                var ext = [".jpg", ".png", ".jpeg", ".gif", ".pdf"];
                var ds_anh = data.where(n => ext.includes(n.extension));
                var arrAnh = bindImageOCR(ds_anh);
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
            bt: arrVal,
            su_dung_truc_tiep_kqua: "K"
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
    $(".inputSearchHangMucHoaDon").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //Xem tiến trình giải quyết
    $("#btnXemTienTrinhGiaiQuyet").click(function () {
        var nguon = "";
        if (ho_so_chi_tiet.ho_so.nguon == "HSTT") {
            nguon = "TNTT"
        }
        if (ho_so_chi_tiet.ho_so.nguon == "MOBILE") {
            nguon = "TN_MOBILE"
        }
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nguon: nguon
        };
        _healthClaimCommonService.xemThongTinSLA(obj).then(res => {
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
    $('#btnXemQlMIC').click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id
        }
        _service.getListQuyenLoiMIC(obj).then(res => {
            var res_qloi = res.data_info;

            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("dsQuyenLoiMICTemplate", "dsQuyenLoiMIC", { lstQl: res_qloi });
            _modalXemQuyenLoiMIC.show();
        });
    });
    $("#tien_yc_tinh_toan").keyup(function (event) {
        var tien_yc = $("#tien_yc_tinh_toan").val().replace(/[^0-9+]+/g, '');
        if (tien_yc != '' && tien_yc[0] == '0') {
            tien_yc = tien_yc.substring(1, tien_yc.length);
        }
        var code = event.keyCode || event.which;
        if (code === 13) {
            event.preventDefault();
            var tong_tien = 0;
            var arr_item = tien_yc.split('+');
            for (var i = 0; i < arr_item.length; i++) {
                tong_tien += parseInt(arr_item[i].trim().replace(/[^0-9]+/g, ''));
            }
            tien_yc = ESUtil.formatMoney(tong_tien);
        }
        $("#tien_yc_tinh_toan").val(ESUtil.formatMoney(tien_yc));
    });
    $('#btnNhanHoSoGoc').click(function () {
        layDsHoSoGiayTo(() => {
            ESUtil.genHTML("tblDsNgayNhanHoSoGoc_template", "tblDsNgayNhanHoSoGoc", { ds_ngay: [] });
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so.so_id
            }
            _service.layDanhSachLanBoSungHoSoGoc(obj).then(res => {
                if (res.state_info.status !== 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $('#btnXoaLanNhanHSGoc').hide();
                $('#btnLuuCTLanNhanHSGoc').hide();
                $('#btnXacNhanLanNhanHSGoc').hide();
                ESUtil.genHTML("tblDsNgayNhanHoSoGoc_template", "tblDsNgayNhanHoSoGoc", { ds_ngay: res.data_info }, () => {
                    if (res.data_info.length > 0) {
                        getDetailNgayNhanHSGoc(res.data_info[0].lan);
                    }
                    else {
                        ESUtil.genHTML("tableDanhSachHSGTBody_template", "tableDanhSachHSGTBody", { ho_so_giay_to: [] });
                    }
                });
                _modalDsLanNhanHoSoGoc.show();
            });
        });
    });
    $('#btnThemMoiLanNhanHSGoc').click(function () {
        _frmThemLanNhanHSGoc.resetForm();
        _frmThemLanNhanHSGoc.clearErrorMessage();
        _modalThemLanNhanHSGoc.show();
    });
    $('#btnLuuLanNhanHSGoc').click(function () {
        if (_frmThemLanNhanHSGoc.isValid()) {
            var obj = _frmThemLanNhanHSGoc.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.ho_so.so_id;
            _service.luulanNhanHoSoGoc(obj).then(res => {
                if (res.state_info.status !== 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("tblDsNgayNhanHoSoGoc_template", "tblDsNgayNhanHoSoGoc", { ds_ngay: [] });
                var obj1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so.so_id
                }
                _service.layDanhSachLanBoSungHoSoGoc(obj1).then(res1 => {
                    if (res1.state_info.status !== 'OK') {
                        _notifyService.error(res1.state_info.message_body);
                        return;
                    }
                    ESUtil.genHTML("tblDsNgayNhanHoSoGoc_template", "tblDsNgayNhanHoSoGoc", { ds_ngay: res1.data_info }, () => {
                        if (res.out_value.lan != null && res.out_value.lan != '' && res.out_value.lan != undefined) {
                            getDetailNgayNhanHSGoc(res.out_value.lan);
                        }
                    });
                    _notifyService.success("Lưu lần nhận hồ sơ gốc thành công");
                    _modalThemLanNhanHSGoc.hide();
                });
                
            });
        }
    });
    $('#btnLuuCTLanNhanHSGoc').click(function () {
        var obj = _frmLanNhanHoSoGoc.getJsonData();
        obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
        obj.so_id = ho_so_chi_tiet.ho_so.so_id;
        obj.arr = [];
        $("#tableDanhSachHSGTBody input.input_chon_hsgt_bs:checked").each(function (el) {
            var ma_hs = $(this).val();
            var ten = $(this).closest('tr').find('a[data-field=ten]').attr('data-val');
            obj.arr.push({ ma_hs: ma_hs, ten: ten });
        });
        if (obj.lan == null || obj.lan == '' || obj.lan == undefined) {
            _notifyService.error('Chưa có số id lần!');
            return;
        }
        _service.luulanNhanChiTietHoSoGoc(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu chi tiết lần nhận hồ sơ gốc thành công");
        });
    });
    $('#btnXacNhanLanNhanHSGoc').click(function () {
        _notifyService.confirm("Bạn có chắc chắn xác nhận lần nhận hồ sơ gốc này không?", "", () => {
            var obj = _frmLanNhanHoSoGoc.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.ho_so.ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.ho_so.so_id;
            if (obj.lan == null || obj.lan == '' || obj.lan == undefined) {
                _notifyService.error('Chưa có số id lần!');
                return;
            }
            _service.XacNhanlanNhanHoSoGoc(obj).then(res => {
                if (res.state_info.status !== 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $('#btnXacNhanLanNhanHSGoc').hide();
                _notifyService.success("Xác nhận lần nhận hồ sơ gốc thành công");
            });
        });
    });
    //Lịch sử yêu cầu bsct
    $("#btnLichSuYeuCauBsGiayTo").click(function () {
        getPagingLichSuYeuCauBSHS(1);
    });
    $("#btnXoaLanNhanHSGoc").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa lần nhận hồ sơ gốc này không?", "", val => {
            
            _service.xoaLanNhanHoSoGoc(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _service.layDanhSachLanBoSungHoSoGoc(obj).then(res1 => {
                    if (res1.state_info.status !== 'OK') {
                        _notifyService.error(res1.state_info.message_body);
                        return;
                    }
                    ESUtil.genHTML("tblDsNgayNhanHoSoGoc_template", "tblDsNgayNhanHoSoGoc", { ds_ngay: res1.data_info }, () => {
                        if (res1.data_info.length > 0) {
                            getDetailNgayNhanHSGoc(res1.data_info[0].lan);
                        }
                        else {
                            ESUtil.genHTML("tableDanhSachHSGTBody_template", "tableDanhSachHSGTBody", { ho_so_giay_to: [] });
                        }
                    });
                    _modalDsLanNhanHoSoGoc.show();
                });
                _notifyService.success("Xóa lần nhận hồ sơ gốc thành công.");
            });
        });
    });
    //Phản hồi ý kiến khách hàng xác nhận PABT
    $("#btnGuiEmailPhanHoi").click(function () {
        var nd_phan_hoi = _frmmodalXemNoiDungKhachHangXN.getControl("noi_dung_phan_hoi").val();
        if (nd_phan_hoi.trim() == "" || nd_phan_hoi.trim() == null || nd_phan_hoi == undefined) {
            _notifyService.error("Bạn chưa nhập nội dung phản hồi!");
            return;
        }
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ho_so.so_id,
            nv: "NG",
            nhom: "PABT",
            noi_dung: nd_phan_hoi
        }
        _service.nhapThongTinPhanHoiYKien(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _esSendEmail.show({
                ma_doi_tac: ho_so_chi_tiet.ho_so.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.ho_so.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.ho_so.so_id,
                nv: 'NG',
                loai: "TEMPLATE_EMAIL_NG_PHAN_HOI_Y_KIEN_KH"
            });
        });
    });
    getPaging(1);
});