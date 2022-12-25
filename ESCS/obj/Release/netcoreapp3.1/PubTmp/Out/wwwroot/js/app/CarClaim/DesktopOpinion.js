var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_CHI_NHANH = $("#escs_ma_chi_nhanh").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objDanhMuc = {};
var objLichSuYKien = {};
var ho_so_chi_tiet = null;
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
const GRID_HO_SO_SO_DONG = 13;

var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;

var _commonService = new CommonService();
var _carInvestigationService = new CarInvestigationService();
var _carClaimCommonService = new CarClaimCommonService();
var _service = new DesktopOpinionService();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _userManagementService = new UserManagementService();
var _modalDocumentService = new ModalDocumentService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmChoYKien = new FormService("frmChoYKien");
var _frmDienBienTonThat = new FormService("frmDienBienTonThat");
var _frmThongTinGiamDinh = new FormService("frmThongTinGiamDinh");
var _frmXemThongTinBaoGiaPhuongAn = new FormService("frmXemThongTinBaoGiaPhuongAn");
var _frmThemCanBoTraoDoiXeOTo = new FormService("frmThemCanBoTraoDoiXeOTo");
var _frmNoiDungTraoDoiXeOTo = new FormService("frmNoiDungTraoDoiXeOTo");

var _modalChiTietHS = new ModalService("modalChiTietHS");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalXemHinhAnh = new ModalFullScreenService("modalXemHinhAnh", "");
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalXemHinhAnhChiTiet = new ModalFullScreenService("modalXemHinhAnhChiTiet", "");
var _modalXemHinhAnhHangMucTonThat = new ModalFullScreenService("modalXemHinhAnhHangMucTonThat", "");
var _modalThemCanBoTraoDoiXeOTo = new ModalService("modalThemCanBoTraoDoiXeOTo");

var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ten_nhom", title: "Nhóm", width: "12%", hozAlign: "center", headerSort: false },
    { field: "lan_yk", title: "Lần ý kiến", width: "10%", hozAlign: "center", headerSort: false },
    { field: "muc_do_ut_ten", title: "Mức độ ưu tiên", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nd_y_kien", title: "Nội dung", width: "25%", headerSort: false },
    { field: "nsd", title: "Người xin ý kiến", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var arr_nhom = [
    { ma: "BBGD", ten: "Biên bản giám định" },
    { ma: "PABT", ten: "Phương án bồi thường" },
    { ma: "DUYETBT", ten: "Duyệt bồi thường" },
    { ma: "TCBT", ten: "Từ chối bồi thường" }
]

var _gridViewChoYKien = new GridViewService("gridViewChoYKien", configColumn, getPaging, rowClick);

function hideESModal() {
    $("#inside-modal").esmodal("hide");
}

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _service.getPaging(objTimKiem).then(res => {
        _gridViewChoYKien.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewChoYKien.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewChoYKien.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id_hs === undefined || data.so_id_hs === null || data.so_id_hs === 0 || data.so_id_hs === "") {
        return;
    }
    if (row !== undefined) {
        row.select();
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id: data.so_id_hs };

    getAnhThumnail({ ma_doi_tac: data.ma_doi_tac, so_id: data.so_id_hs, ma_chi_nhanh: data.ma_chi_nhanh });
    _service.lietKeThongTinChiTietHoSo(objGetDetail).then(res => {
        bindDataDienBienTonThat(res);
        lietKeLichSuYKien(data.ma_doi_tac, data.so_id_yk);
        $("#inside-modal").esmodal("show");
        anHienTabXemToanBoThongTinHoSoBoiThuong("XE");
    });
}
function lietKeLichSuYKien(ma_doi_tac, so_id_yk) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id_yk: so_id_yk
    }
    _service.yKienCT(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmChoYKien.resetForm();
        _frmChoYKien.clearErrorMessage();
        objLichSuYKien = res.data_info;
        ESUtil.genHTML("tblLichSuChoYKien_template", "tblLichSuChoYKien", { data: objLichSuYKien });
        _frmChoYKien.getControl("ma_doi_tac").val(ma_doi_tac);
        _frmChoYKien.getControl("so_id_yk").val(so_id_yk);
        _frmChoYKien.getControl("nd_y_kien").removeAttr("disabled");
    });
}
function bindDataDienBienTonThat(res) {
    ho_so_chi_tiet = res;
    _frmDienBienTonThat.getControl("vu_tt").setDataSource(res.data_info.ds_vu_tt, "ten", "ma");
    if (res.data_info.ds_vu_tt.length > 0) {
        $('#vu_tt').val($('#vu_tt option:first-child').val()).trigger('change');
    } else {
        ESUtil.genHTML("tblDienBienTonThat_template", "tblDienBienTonThat", res.data_info.ds_vu_tt);
    }
    _frmThongTinGiamDinh.getControl("lan_gd").setDataSource(res.data_info.ds_lan_gd, "ten", "ma");
    if (res.data_info.ds_lan_gd.length > 0) {
        $('#lan_gd').val($('#lan_gd option:first-child').val()).trigger('change');
    } else {
        ESUtil.genHTML("tblThongTinGiamDinh_template", "tblThongTinGiamDinh", res.data_info.ds_lan_gd);
    }
    ESUtil.genHTML("tblThongTinHoSoGiayToYKienTemplate", "tblThongTinHoSoGiayToYKien", { data: res.data_info.ho_so_giay_to });
    ESUtil.genHTML("thongTinSoHoSo_template", "thongTinSoHoSo", { ho_so: ho_so_chi_tiet.data_info.ho_so });
}
function onTab(tab) {
    $('#navThongTinHS li.active').removeClass('active');
    $('#navThongTinHS li#tab_' + tab).addClass('active');
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac: arr[0],
        so_id_hs: arr[1],
        so_id_yk: arr[2]
    };
    rowClick(data);
}
function goToScroll(element) {
    $('#lstImage').animate({ scrollTop: $("#" + element).offset().top }, 'slow');
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
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
function xemNoiDungChoYKien(bt) {
    $("#tblLichSuChoYKien .ls_cho_y_kien").removeClass("active");
    $("#tblLichSuChoYKien #ls_cho_y_kien_" + bt).addClass("active");
    var obj = objLichSuYKien.where(n => n.bt == bt).firstOrDefault();
    _frmChoYKien.getControl("nd_y_kien").val(obj.nd_cho_y_kien);
    _frmChoYKien.getControl("nd_y_kien").attr("disabled", "disabled");
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
//---Code xem toàn bộ thông tin hồ sơ---
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh_ql, ma_chi_nhanh, so_id, so_id_hd, so_id_dt) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_chi_nhanh_ql: ma_chi_nhanh_ql,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id: so_id,
        so_id_hd: so_id_hd,
        so_id_dt: so_id_dt,
        nv: 'XE'
    }
    _service.base.all([
        _carClaimCommonService.xemToanBoThongTinHoSoBoiThuong(obj),
        _carInvestigationService.layDanhSachFile(obj)
    ]).then(arrRes => {
        var resHoSo = arrRes[0];
        var resHinhAnh = arrRes[1];
        if (resHoSo.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        //Thông tin hồ sơ
        var thong_tin_chung = resHoSo.data_info.thong_tin_chung;
        $(".soHoSo_xemToanBoThongTinHSBT").html(thong_tin_chung.so_hs);
        $(".ngayDong_xemToanBoThongTinHSBT").html(thong_tin_chung.ngay_dong_hs);
        $(".donViCapDon_xemToanBoThongTinHSBT").html(thong_tin_chung.ten_cnhanh_cap);
        $(".soTien_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.tien_duyet));
        $(".soTienThue_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.thue));
        $(".tongSoTien_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.tien_duyet + thong_tin_chung.thue));
        var arrLHNV = resHoSo.data_info.dk;
        ESUtil.genHTML("tblToanBoThongTinChungHoSoBoiThuongXeOTo_template", "tblToanBoThongTinChungHoSoBoiThuongXeOTo", { ho_so: thong_tin_chung });
        ESUtil.genHTML("tblToanBoThongTinGiayChungNhanXeOTo_template", "tblToanBoThongTinGiayChungNhanXeOTo", { gcn: resHoSo.data_info.gcn });
        ESUtil.genHTML("tblToanBoThongTinLoaiHinhNghiepVuThamGia_template", "tblToanBoThongTinLoaiHinhNghiepVuThamGia", { data: arrLHNV }, () => {
            var tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe = 0;
            var tongTienMienThuong_xemToanBoThongTinHSBTXe = 0;
            var tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe = 0;
            for (var i = 0; i < arrLHNV.length; i++) {
                tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe += arrLHNV[i].tien;
                tongTienMienThuong_xemToanBoThongTinHSBTXe += arrLHNV[i].mien_thuong;
                tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe += arrLHNV[i].phi;
            }
            $("#tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe));
            $("#tongTienMienThuong_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienMienThuong_xemToanBoThongTinHSBTXe));
            $("#tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe));
        });
        ESUtil.genHTML("tblToanBoThongTinVuTonThatXeOTo_template", "tblToanBoThongTinVuTonThatXeOTo", { data: resHoSo.data_info.ds_vu_tt });
        ESUtil.genHTML("tblToanBoThongTinLichGiamDinhXeOTo_template", "tblToanBoThongTinLichGiamDinhXeOTo", { data: resHoSo.data_info.ds_lan_gd });
        ESUtil.genHTML("tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo_template", "tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo", { data: resHoSo.data_info.ds_nguoi_tham_gia });
        ESUtil.genHTML("tblToanBoThongTinHoSoGiayToXeOTo_template", "tblToanBoThongTinHoSoGiayToXeOTo", { ho_so_giay_to: resHoSo.data_info.ho_so_giay_to });
        ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuHMTT_template", "navToanBoThongTinLoaiHinhNghiepVuHMTT", { danh_sach: resHoSo.data_info.lh_nv });
        ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuBaoGiaPhuongAn_template", "navToanBoThongTinLoaiHinhNghiepVuBaoGiaPhuongAn", { danh_sach: resHoSo.data_info.lh_nv });
        ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong_template", "navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong", { danh_sach: resHoSo.data_info.lh_nv });
        ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo_template", "tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo", { data: resHoSo.data_info.qua_trinh_xu_ly });
        ESUtil.genHTML("tblToanBoLichSuTonThatXeOTo_template", "tblToanBoLichSuTonThatXeOTo", { data: resHoSo.data_info.lich_su_ton_that });
        //Thông tin hình ảnh
        var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
        var arrAnh = resHinhAnh.data_info.where(n => ext.includes(n.extension));
        var arrPDF = resHinhAnh.data_info.where(n => n.extension == ".pdf");
        var arrAnhTC = [];
        var arrAnhTT = [];
        var arrAnhCPL = [];
        var arrAnhGTTL = [];
        for (var i = 0; i < arrAnh.length; i++) {
            if (arrAnh[i].loai == "TC") {
                arrAnhTC.push(arrAnh[i]);
            }
            if (arrAnh[i].loai == "TT") {
                arrAnhTT.push(arrAnh[i]);
            }
            if (arrAnh[i].loai == "TL") {
                arrAnhGTTL.push(arrAnh[i]);
            }
            if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                arrAnhCPL.push(arrAnh[i]);
            }
        }
        arrAnhTC = bindImagesToanBoAnhHoSo(arrAnhTC);
        arrAnhTT = bindImagesToanBoAnhHoSo(arrAnhTT);
        arrAnhGTTL = bindImagesToanBoAnhHoSo(arrAnhGTTL);
        arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);

        ESUtil.genHTML("tblToanBoThongTinAnhToanCanhXeOTo_template", "tblToanBoThongTinAnhToanCanhXeOTo", { dataAnhToanCanh: arrAnhTC });
        ESUtil.genHTML("tblToanBoThongTinAnhTonThatXeOTo_template", "tblToanBoThongTinAnhTonThatXeOTo", { dataAnhTonThat: arrAnhTT });
        ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToXeOTo_template", "tblToanBoThongTinAnhHoSoGiayToXeOTo", { dataAnhHoSoGiayTo: arrAnhGTTL });
        ESUtil.genHTML("tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo_template", "tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
        ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFXeOTo_template", "tblToanBoThongTinTaiLieuPDFXeOTo", { dataTaiLieuPDF: arrPDF });

        //Mẫu in
        var sourceMauIn = [
            { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
            { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
            { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
            { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" },
            { ma: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA", ten: "Tờ trình phương án sửa chữa" },
            { ma: "ESCS_TB_DUYET_PHUONG_AN", ten: "Thông báo duyệt phương án" },
            { ma: "ESCS_THONG_BAO_DUYET_BAO_LANH", ten: "Thông báo duyệt bảo lãnh" },
            { ma: "ESCS_TO_TRINH_BOI_THUONG", ten: "Tờ trình bồi thường" },
            { ma: "ESCS_THONG_BAO_BOI_THUONG", ten: "Thông báo bồi thường" },
            { ma: "ESCS_TO_TRINH_TU_CHOI_BT", ten: "Tờ trình từ chối bồi thường" },
            { ma: "ESCS_TB_TU_CHOI_TB", ten: "Thông báo từ chối bồi thường" }
        ];
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
        }
        ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnXeOTo", { dataTaiLieuIn: sourceMauIn });
        _modalDocumentService.setDataSource(sourceMauIn);
    });
    showStepToanBoThongTinHoSoBoiThuong("tabToanBoThongTinHoSoBoiThuong");
    _modalXemToanBoThongTinHoSo.show();
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
function anHienTabXemToanBoThongTinHoSoBoiThuong(nv) {
    if (nv === "XE") {
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
        $("#navToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');

        $("#navToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
        $("#navToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
    }
}
function showStepToanBoThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinHoSoBoiThuong") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#anHienTabThongTinChungXeOTo").trigger('click');
        $("#anHienTabThongTinHoaDonChungTuXe").addClass("d-none");
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinChungXeOTo").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("li:nth-child(2) > a").addClass("active");
        showStepThongTinHoSoBoiThuong("tabToanBoThongTinChungXeOTo");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhToanCanhXeOTo").addClass("active");
        $("#tabToanBoAnhToanCanhXeOToActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("li:first-child > a").addClass("active");
    }
    return;
}
function showStepThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinHangMucTonThatXeOTo") {
        ESUtil.genHTML("tblToanBoThongTinHangMucTonThatXeOTo_template", "tblToanBoThongTinHangMucTonThatXeOTo", { data: [] }, () => {
            $("#tblToanBoThongTinHangMucTonThatTongTienGiamDinh_xemToanBoThongTinHSBTXe").html(0);
            $("#tblToanBoThongTinHangMucTonThatTongTienDeXuat_xemToanBoThongTinHSBTXe").html(0);
            $("#tblToanBoThongTinHangMucTonThatTongTienDuyet_xemToanBoThongTinHSBTXe").html(0);
        });
        $("#btnXemToanBoThongTinHMTT_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoThongTinBaoGiaPhuongAnXeOTo") {
        hienThiBangGiaPA(null);
        _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setDataSource([], "ten_pa", "so_id_pa");
        $("#btnXemToanBoThongTinBGPA_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoThongTinBoiThuongXeOTo") {
        ESUtil.genHTML("tblToanBoThongTinBoiThuongXeOTo_template", "tblToanBoThongTinBoiThuongXeOTo", { data: [] });
        $("#tblThongTinBoiThuongVCXMucMienThuong_xemToanBoThongTinHSBTXe").html(0);
        $("#btnXemToanBoThongTinTTBT_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoYKienCanBoXeOTo") {
        ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoiXeOTo_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoiXeOTo_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiXeOTo').html("");
        trang = 1;
        getPagingNoiDungTraoDoiXeOTo(trang, () => {
            let div = $('#lichSuChatTraoDoiXeOTo').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoiXeOTo();
    }
    return;
}
function showStepHinhAnhHoSoBoiThuong(step) {
    if (step === "tabToanBoAnhTonThatXeOTo") {
        $("#divTableXemToanBoAnhTonThatXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhToanCanhXeOTo") {
        $("#divTableXemToanBoAnhToanCanhXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoGiayToXeOTo") {
        $("#divTableXemToanBoAnhHoSoGiayToXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoChuaPhanLoaiXeOTo") {
        $("#divTableXemToanBoAnhChuaPhanLoaiXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongXeOTo") {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    return;
}
function xemThongTinChiTietHoSoBoiThuong(nhom, lhnv) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nhom: nhom,
        lhnv: lhnv
    }
    _carClaimCommonService.xemThongTinHoSoBoiThuong(obj).then(res => {
        var dataHangMuc = res.data_info.hang_muc;
        var thong_tin_chung = res.data_info.thong_tin_chung;
        $("#tblThongTinBoiThuongVCXMucMienThuong_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(thong_tin_chung.mien_thuong));

        if (dataHangMuc.length > 0) {
            ESUtil.genHTML("tblToanBoThongTinHangMucTonThatXeOTo_template", "tblToanBoThongTinHangMucTonThatXeOTo", { data: dataHangMuc }, () => {
                var tblPhuongAnVCXTienGiamDinh = res.data_info.hang_muc.sum(n => n.gia_giam_dinh);
                var tblPhuongAnVCXTienDeXuat = res.data_info.hang_muc.sum(n => n.gia_duyet_dx);
                var tblPhuongAnVCXTienDuyet = res.data_info.hang_muc.sum(n => n.gia_duyet);
                $("#tblToanBoThongTinHangMucTonThatTongTienGiamDinh_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienGiamDinh));
                $("#tblToanBoThongTinHangMucTonThatTongTienDeXuat_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienDeXuat));
                $("#tblToanBoThongTinHangMucTonThatTongTienDuyet_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienDuyet));
            });
        }
        ESUtil.genHTML("tblToanBoThongTinBoiThuongXeOTo_template", "tblToanBoThongTinBoiThuongXeOTo", { data: res.data_info.thong_tin_boi_thuong }, () => {
            var tienGiaDuyetVtu = 0;
            var tienGiaDuyetNC = 0;
            var tienGiaDuyetKhac = 0;
            var tienGiamGia = 0;
            var tienKhauTru = 0;
            var tienThue = 0;
            var data = res.data_info.thong_tin_boi_thuong;
            for (var i = 0; i < data.length; i++) {
                tienGiaDuyetVtu += parseFloat(data[i].gia_vtu_duyet);
                tienGiaDuyetNC += parseFloat(data[i].gia_nhan_cong_duyet);
                tienGiaDuyetKhac += parseFloat(data[i].gia_khac_duyet);
                tienGiamGia += parseFloat(data[i].giam_gia);
                tienKhauTru += parseFloat(data[i].tien_ktru_tien_bh);
                tienThue += parseFloat(data[i].tien_thue);
            }
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetVtu_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetVtu));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetNC_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetNC));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetKhac_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetKhac));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetGiamGia_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiamGia));
            $("#tblToanBoThongTinBoiThuongVCXTienKhauTru_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienKhauTru));
            $("#tblToanBoThongTinBoiThuongVCXTienThue_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienThue));
        });
        var dataPhuongAn = res.data_info.phuong_an;
        if (dataPhuongAn.length > 0) {
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setDataSource(res.data_info.phuong_an, "ten_pa", "so_id_pa");
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setValue(res.data_info.phuong_an[0].so_id_pa);
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").trigger("select2:select");
        }
    });
}
function xemThongTinChiTietPhuongAn(so_id_pa) {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        so_id_pa: so_id_pa,
        lh_nv: ho_so_chi_tiet.data_info.lh_nv[0].ma
    };
    _carInvestigationService.xemChiTietPhuongAn(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        hienThiBangGiaPA(res.data_info.tong_hop_pa);
    });
}
//--Hình ảnh hồ sơ--
function getToanBoAnhThumnailHopDong(obj, callback = undefined) {
    _carInvestigationService.layDanhSachFile({
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
        ESUtil.genHTML("tblToanBoThongTinTaiLieuHopDongXeOTo_template", "tblToanBoThongTinTaiLieuHopDongXeOTo", { dataTaiLieuHD: arr });
        if (callback) {
            callback(res);
        }
    });
}
function openXemChiTietTaiLieuHopDong(val, bt, extension) {
    if (extension == '.pdf') {
        _carInvestigationService.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        _carInvestigationService.layDanhSachFile({
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            ma_chi_nhanh: ho_so_chi_tiet.data_info.ho_so.ma_chi_nhanh_ql,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id_hd,
            so_id_dt: ho_so_chi_tiet.data_info.ho_so.so_id_dt,
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
            initImageViewerHangMucTonThatXe();
            _modalXemHinhAnhHangMucTonThat.show();
        });
    }
}
function xemTabToanBoAnhHoSoBoiThuong(tabId) {
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: [] });
    trang = 1;
    if (tabId === "divTableToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhTonThatXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhTonThatXeOTo").addClass("d-none");
        getPagingListImages(1, "CHINH", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhToanCanhXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhToanCanhXeOTo").addClass("d-none");
        getPagingListImages(1, "TOAN_CANH", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhHoSoGiayToXeOTo").addClass("d-none");
        getPagingListImages(1, "TAI_LIEU", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhChuaPhanLoaiXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhChuaPhanLoaiXeOTo").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
    }
}
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        loai: loai,
        nv: "XE"
    }
    obj.trang = trang;
    obj.so_dong = 6;
    _carClaimCommonService.layDanhSachAnh(obj).then(res => {
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
            if (loai === "CHINH") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "TOAN_CANH") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "TAI_LIEU") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "CHUA_PHAN_LOAI") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: source }, () => {
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
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhXe');
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
            this.viewer.zoomTo(0.4);
        }
    };
    var viewer = new Viewer(pictures, options);
}
function xemChiTietHinhAnhHoSo(el) {
    _modalXemHinhAnhChiTiet.show();
}
function initImageViewerHangMucTonThatXe() {
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
            var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
            ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
            $('#input_imagesHangMucTonThat').val(val);
            $("#input_imagesHangMucTonThat").trigger('keyup');
        }
        initImageViewerHangMucTonThatXe();
        _modalXemHinhAnhHangMucTonThat.show();
    });
}
function openXemChiTietTaiLieuPDF(bt) {
    _carInvestigationService.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: bt }).then(res => {
        callBackViewFile(res);
    });
}
function getImagesHinhAnhHoSo(name) {
    var arrAnh = [];
    $("input:checkbox[name='" + name + "']:checked").each(function () {
        arrAnh.push($(this).val());
    });
    return arrAnh;
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
            _carInvestigationService.layAnhChiTiet({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: mergedArr[0] }).then(res => {
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
            _carInvestigationService.taiFileAnhTonThatZip({ so_id: ho_so_chi_tiet.data_info.ho_so.so_id, bt: mergedArr }).then(res => {
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
            ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
            so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
            bt: mergedArr

        }, "#modalDocumentContents").then(res => {
            _modalPreviewFileService.viewFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf");
        });
    } else {
        _notifyService.error("Vui lòng chọn tài liệu cần in");
        return;
    }
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
}
function xemToanBoHinhAnhHoSoBoiThuong(loai, hang_muc) {
    var data = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nv: "XE",
        hang_muc: hang_muc,
        loai: loai
    }
    window.open("/ViewImages?so_id=" + data.so_id + "&nv=" + data.nv + "&hm=" + data.hang_muc + "&loai=" + data.loai, '_blank');
}
function openXemChiTietMauIn(ma_mau_in) {
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
    _modalDocumentService.show(ma_mau_in);
}
function hienThiBangGiaPA(obj) {
    //TIỀN DUYỆT GIÁ
    $(".tinhToanNVPATienDuyetGia").html("0");
    //KHẤU HAO, GIẢM TRỪ BỒI THƯỜNG, GIẢM GIÁ
    $(".tinhToanNVPATienKhauHao").html("0");
    $(".tinhToanNVPATienBH").html("0");
    $(".tinhToanNVPAGiamTru").html("0");
    $(".tinhToanNVPAGiamTruKhac").html("0");
    $(".tinhToanNVPATienGiamGiaVtu").html("0");
    $(".tinhToanNVPATienGiamGiaNhanCong").html("0");
    $(".tinhToanNVPATienGiamGiaKhac").html("0");
    $(".tinhToanNVPATongKhauHaoGiamTruGiamGia").html("0");
    //KHẤU TRỪ THEO HỢP ĐỒNG, QUY TẮC BẢO HIỂM
    $(".tinhToanNVPATienKhauTruPTBoiThuong").html("0");
    $(".tinhToanNVPAMienThuong").html("0");
    $(".tinhToanNVPATongKhauTru").html("0");
    //CHI PHÍ CẨU KÉO (GỒM GIẢM TRỪ NẾU CÓ)
    $(".tinhToanNVPAChiPhiCau").html("0");
    $(".tinhToanNVPAChiPhiKeo").html("0");
    $(".tinhToanNVPAChiPhiKhac").html("0");
    $(".tinhToanNVPATongChiPhi").html("0");
    //SỐ TIỀN BỒI THƯỜNG
    $(".tinhToanNVPATienSuaChuaChuaVAT").html("0");
    $(".tinhToanNVPATienChiPhiKhacChuaVAT").html("0");

    $(".tinhToanNVPATienBoiThuongChuaVAT").html("0");
    $(".tinhToanNVPATienThue").html("0");
    $(".tinhToanNVPATienThueChiPhiKhac").html("0");
    $(".tinhToanNVPATongThue").html("0");

    $(".tinhToanNVPATienBoiThuongBaoGomVAT").html("0");
    $(".tinhToanNVPATienKHChiTra").html("0");

    $(".tinhToanNVPAGiamGia").html("0");
    $(".tinhToanNVPAChiPhiKhac").html("0");
    $(".tinhToanNVPATienBoiThuong").html("0");
    $(".tinhToanNVPAConLai").html("0");
    $(".tinhToanNVPATongCong").html("0");

    if (obj != null) {
        $(".tinhToanNVPATienDuyetGia").html(obj.tong_gia_duyet);
        //KHẤU HAO, GIẢM TRỪ BỒI THƯỜNG, GIẢM GIÁ
        $(".tinhToanNVPATienKhauHao").html(obj.tien_khau_hao);
        $(".tinhToanNVPATienBH").html(obj.tien_bao_hiem);
        $(".tinhToanNVPAGiamTru").html(obj.tien_giam_tru);
        $(".tinhToanNVPAGiamTruKhac").html(obj.tien_giam_tru_khac);
        $(".tinhToanNVPATienGiamGiaVtu").html(obj.tien_giam_gia_vtu);
        $(".tinhToanNVPATienGiamGiaNhanCong").html(obj.tien_giam_gia_nhan_cong);
        $(".tinhToanNVPATienGiamGiaKhac").html(obj.tien_giam_gia_khac);
        $(".tinhToanNVPATongKhauHaoGiamTruGiamGia").html(obj.tong_giam_chua_ktru);
        //KHẤU TRỪ THEO HỢP ĐỒNG, QUY TẮC BẢO HIỂM
        $(".tinhToanNVPATienKhauTruPTBoiThuong").html(obj.tien_ktru_bh);
        $(".tinhToanNVPAMienThuong").html(obj.tien_mien_thuong);
        $(".tinhToanNVPATongKhauTru").html(obj.tong_ktru);
        //CHI PHÍ CẨU KÉO (GỒM GIẢM TRỪ NẾU CÓ)
        $(".tinhToanNVPAChiPhiCau").html(obj.cp_cau);
        $(".tinhToanNVPAChiPhiKeo").html(obj.cp_keo);
        $(".tinhToanNVPAChiPhiKhac").html(obj.cp_khac);
        $(".tinhToanNVPATongChiPhi").html(obj.tong_cp_khac);
        //SỐ TIỀN BỒI THƯỜNG
        $(".tinhToanNVPATienSuaChuaChuaVAT").html();//Tiền sửa chữa chưa vat
        $(".tinhToanNVPATienChiPhiKhacChuaVAT").html(obj.tong_cp_khac);//Chi phí khác chưa vat
        $(".tinhToanNVPATienBoiThuongChuaVAT").html(obj.tien_bt_chua_vat);//Tiền bồi thường chưa VAT

        $(".tinhToanNVPATienThue").html(obj.tien_thue);
        $(".tinhToanNVPATienThueChiPhiKhac").html("0");
        $(".tinhToanNVPATongThue").html(obj.tien_thue);

        $(".tinhToanNVPATienBoiThuongBaoGomVAT").html(obj.tien_bt_gom_vat);
        $(".tinhToanNVPATienKHChiTra").html(obj.tien_kh_chi_tra_chua_vat);
    }
}
//---Trao đổi ý kiến---
function getPagingNoiDungTraoDoiXeOTo(trang, callback = undefined) {
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nv: "XE"
    }
    obj.trang = trang;
    obj.so_dong = 7;
    _carClaimCommonService.lietKeNoiDungTraoDoi(obj).then(res => {
        var data = res.data_info.data;
        var tong_so_dong = res.out_value.tong_so_dong;
        if (tong_so_dong % 7 == 0) {
            trang_max_nd = tong_so_dong / 7;
        } else {
            trang_max_nd = parseInt(tong_so_dong / 7) + 1;
        }
        if (data.length != 0) {
            ESUtil.prependHTML("tblDanhSachNoiDungTraoDoiXeOTo_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: data }, () => {
                if (callback) {
                    callback();
                }
            });
            $("#soLuongTinNhanTraoDoiXeOTo").html("(" + tong_so_dong + " tin nhắn)");
        }
    });
}
function xoaNguoiThamGiaTraoDoiXeOTo(so_id, nv, ma_nsd) {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa cán bộ này khỏi danh sách cán bộ trao đổi này không?", "", () => {
        var obj = {
            so_id: so_id,
            nv: nv,
            ma_nsd: ma_nsd
        }
        _carClaimCommonService.xoaCanBoTraoDoi(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin thành công");
            getPagingDanhSachCanBoTraoDoiXeOTo();
        });
    });
}
function getPagingDanhSachCanBoTraoDoiXeOTo() {
    var obj = {
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        nv: "XE"
    }
    _carClaimCommonService.lietKeDanhSachCanBoTraoDoi(obj).then(res => {
        var data = res.data_info;
        var so_nguoi_tg = data.length;
        ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoiXeOTo_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: data });
        $("#soNguoiThamGiaTraoDoiXeOTo").html("(Có " + so_nguoi_tg + " cán bộ)")
    });
}
function bindDataCanBoTraoDoiXeOTo(ma_doi_tac, so_id) {
    _frmThemCanBoTraoDoiXeOTo.getControl("so_id").val(so_id);
    _frmThemCanBoTraoDoiXeOTo.getControl("nv").val('XE');
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setValue("");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}

$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiem.getControl("ngay_c").setValue(dateNow);
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _userManagementService.layDsNSD()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.can_bo = arrRes[2].data_info;
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiem.getControl('ma_doi_tac').setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmTimKiem.getControl('nhom').setDataSource(arr_nhom, "ten", "ma", "Chọn nhóm", "");
        ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);

        _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").addEventChange(val => {
            var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
            _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
            _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setValue("");
        });
        _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").addEventChange(val => {
            xemThongTinChiTietPhuongAn(val);
        });
        getPaging(1);
    });
    $('#btnTimKiem').click(function () {
        getPaging(1);
    });
    $("#btnThemMoiYKien").click(function () {
        _frmChoYKien.getControl("nd_y_kien").removeAttr("disabled");
        $("#tblLichSuChoYKien .ls_cho_y_kien").removeClass("active");
        _frmChoYKien.getControl("nd_y_kien").val("");
    });
    $("#vu_tt").change(function () {
        var maVuTonThat = $(this).val();
        var val = ho_so_chi_tiet.data_info.ds_vu_tt.where(n => n.ma == maVuTonThat);
        ESUtil.genHTML("tblDienBienTonThat_template", "tblDienBienTonThat", val[0]);
    });
    $("#lan_gd").change(function () {
        var maLanGiamDinh = $(this).val();
        var val = ho_so_chi_tiet.data_info.ds_lan_gd.where(n => n.ma == maLanGiamDinh);
        ESUtil.genHTML("tblThongTinGiamDinh_template", "tblThongTinGiamDinh", val[0]);
        //lấy danh sách người tham gia giám định
        var data = {
            "arrNguoiGiamDinh": ho_so_chi_tiet.data_info.ds_nguoi_tham_gia.where(n => n.lan_gd == maLanGiamDinh)
        };
        ESUtil.genHTML("tblThongTinCacBenThamGiaGD_template", "tblThongTinCacBenThamGiaGD", data);
    });
    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $('#btnLuuChoYKien').click(function () {
        if (_frmChoYKien.isValid()) {
            var obj = _frmChoYKien.getJsonData();
            if (obj.nd_y_kien == null || obj.nd_y_kien.trim() == "") {
                _notifyService.error("Bạn chưa nhập ý kiến !");
                return;
            }
            _service.choYKienNh(obj).then(res => {
                if (res.state_info.status != 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: _frmChoYKien.getControl("ma_doi_tac").val(),
                    so_id: _frmChoYKien.getControl("so_id_hs").val(),
                    so_id_yk: _frmChoYKien.getControl("so_id_yk").val()
                }
                _service.yKienCT(obj).then(res1 => {
                    if (res.state_info.status != 'OK') {
                        _notifyService.error(res1.state_info.message_body);
                        return;
                    }
                    lietKeLichSuYKien(ESCS_MA_DOI_TAC, res.out_value.so_id_yk);
                    _notifyService.success("Cho ý kiến thành công");
                });
            });
        }
    });
    //---Code xem toàn bộ thông tin hồ sơ---
    $("#input_imagesHangMucTonThat").keyup(ESUtil.delay(function (e) {
        var val = $("#input_imagesHangMucTonThat").val().trim();
        $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //---Hình ảnh---
    $("#btnTaiAnhToanCanhXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_toan_canh");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhToanCanhXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_toan_canh");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhToanCanhXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_toan_canh");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TOAN_CANH", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhTonThatXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_ton_that");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhTonThatXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_ton_that");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhTonThatXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_ton_that");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHINH", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_ho_so_giay_to");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_ho_so_giay_to");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_ho_so_giay_to");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TAI_LIEU", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_chua_phan_loai");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_chua_phan_loai");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_chua_phan_loai");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHUA_PHAN_LOAI", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    //---Xem toàn bộ ảnh---
    $('#divTableXemToanBoAnhToanCanhXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TOAN_CANH", () => { initImageViewerToanBoAnh(); });
        }
    });
    $('#divTableXemToanBoAnhTonThatXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHINH", () => { initImageViewerToanBoAnh(); });
        }
    });
    $('#divTableXemToanBoAnhHoSoGiayToXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TAI_LIEU", () => { initImageViewerToanBoAnh(); });
        }
    });
    $('#divTableXemToanBoAnhChuaPhanLoaiXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
        }
    });
    //---Trao đổi---
    $("#btnThemNoiDungTraoDoiXeOTo").click(function () {
        if (_frmNoiDungTraoDoiXeOTo.isValid()) {
            var obj = _frmNoiDungTraoDoiXeOTo.getJsonData();
            obj.so_id = ho_so_chi_tiet.data_info.ho_so.so_id;
            obj.nv = 'XE';
            if (obj.nd.trim() == "" || obj.nd.trim() == null) {
                _notifyService.error("Bạn chưa nhập nội dung trao đổi");
                return;
            }
            _carClaimCommonService.nhapNoiDungTraoDoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#noiDungTraoDoiXeOTo").setValue("");
                $("#tblDanhSachNoiDungTraoDoiXeOTo").html("");
                trang = 1;
                getPagingNoiDungTraoDoiXeOTo(trang, () => {
                    let div = $('#lichSuChatTraoDoiXeOTo').get(0);
                    div.scrollTo(0, document.body.scrollHeight);
                });
            });
        }
    });
    $("#noiDungTraoDoiXeOTo").keydown(function (event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            event.preventDefault();
            $("#btnThemNoiDungTraoDoiXeOTo").trigger('click');
        }
    });
    $("#btnThemNguoiThamGiaTraoDoiXeOTo").click(function () {
        _frmThemCanBoTraoDoiXeOTo.resetForm();
        _frmThemCanBoTraoDoiXeOTo.clearErrorMessage();
        bindDataCanBoTraoDoiXeOTo(ho_so_chi_tiet.data_info.ho_so.ma_doi_tac, ho_so_chi_tiet.data_info.ho_so.so_id);
        _modalThemCanBoTraoDoiXeOTo.show();
    });
    $("#btnThemVaDongCanBoTraoDoiXeOTo").click(function () {
        if (_frmThemCanBoTraoDoiXeOTo.isValid()) {
            var formData = _frmThemCanBoTraoDoiXeOTo.getJsonData();
            _carClaimCommonService.themCanBoTraoDoi(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Thêm cán bộ thành công");
                    _modalThemCanBoTraoDoiXeOTo.hide();
                    getPagingDanhSachCanBoTraoDoiXeOTo();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#lichSuChatTraoDoiXeOTo').scroll(function () {
        let div = $(this).get(0);
        if ((Math.round(div.scrollTop)) <= 0) {
            trang++;
            if (trang > trang_max_nd) {
                return;
            }
            getPagingNoiDungTraoDoiXeOTo(trang);
            div.scroll({ top: 1, behavior: "smooth" });
        }
    });
    $(".inputTimKiemHangMuc_xemToanBoThongTinHSBTXe").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").removeClass("d-none");
        if (val != "") {
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
});