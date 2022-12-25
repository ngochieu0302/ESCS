var objDanhMuc = {};
var _service = new Service();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var arrData = [];
var trang = 0;
var trang_max = 0;
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
}
var NAM_SAN_XUAT = [];
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}
// Services
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _departmentListService = new DepartmentListService();
var _otherContractService = new OtherContractService();
var _categoryCommonService = new CategoryCommonService();
var _commonService = new CommonService();
var _customerService = new CustomerService();
var _UploadExcelService = new UploadExcelService();
// xe máy
var _carManufacturerListService = new CarManufacturerListService();
var _hieuXeService = new HieuXeService();

// Form
var _frmTimKiem = new FormService("frmTimKiem");
var _frmOtherContractSearch = new FormService("frmOtherContractSearch");
var _frmHopDong = new FormService("frmHopDong");
var _frmGCNKhac = new FormService("frmGCNKhac");
var _frmDTNhaBH = new FormService("frmDTNhaBH");
var _frmDTNoiBo = new FormService("frmDTNoiBo");
var _frmEmail_CC = new FormService("frmEmail_CC");
var _frmEditKH = new FormService("frmEditKH");
var _frmHopDongEdit = new FormService("frmHopDongEdit");
var _frmSuaGCN = new FormService("frmSuaGCN");
var _frmThemTongPhi = new FormService("frmThemTongPhi");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmGCNXeMay = new FormService("frmGCNXeMay");
// Modal
var _modalOtherContractSearch = new ModalService("modalOtherContractSearch");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalEditKH = new ModalService("modalEditKH");
var _modalEditHD = new ModalService("modalEditHD");
var _modalSuaGCN = new ModalFullScreenService("modalSuaGCN", "");
var _modalThemTongPhi = new ModalService("ModalThemTongPhi");
var _modalSDBS = new ModalService("modalSDBS");
var _modalChonDKBS = new ModalDragService("modalChonDKBS", undefined, "bottom");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "tabHoSoGiayTo");
// Pop Over
var _popoverDsGCN = new PopoverService("popoverDsGCN");
var _popoverGhiChu = new PopoverService("popoverGhiChu");
var _popoverGhiChuDKBS = new PopoverService("popoverGhiChuDKBS");
// Navtab
var _navTabTimKiemKhachHang = new NavTabService("navTabTimKiemKhachHang", ["tabTimKiemKH", "tabThongTinHD"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navDanhSachKhac"], "nav-tabs-timeline");
var _navThongTinChiTietKhac = new NavTabService("navThongTinChiTietKhac", ["thong_tin_bt_khac", "tai_lieu", "thong_tin_dong_tai"], "quy-trinh");//nav-tabs-timeline
var _navDongtai = new NavTabService("navDongtai", ["tabNhaBH", "tabNoiBo"], "nav-tabs-timeline");
var _navThongTinQuyenLoiDKBS = new NavTabService("navThongTinQuyenLoiDKBS", ["tabThongTinDK", "tabThongTinDKBS"], "nav-pills");

var _dataKH = null;
var _dataDK = null;
var _danhmuc = null;
var data_doi_tac = null;
var gd_chon_anh_arr = [];
var gd_anh_chon_cuoi = null;
var hop_dong_chi_tiet = null;
var so_id_goi_bh = null;
var dsGoiBH = null;
var objData = null;
var tuoi = 0;
var ngay_hl = 0;

const GRID_HOP_DONG_SO_DONG = 14;
const GRID_KH_SO_DONG = 10;
const CONSTANT_PM = 'BH';

var configUpload = {
    onSuccess: function (file, response, data) {
        if (response.state_info.status === "NotOK") {
            _notifyService.error(response.state_info.message_body);
            return
        }
        var arrError = response.data_info.where(n => n.status_upload == "ERROR");
        for (var i = 0; i < arrError.length; i++) {
            _notifyService.error(arrError[i].error_message);
            return
        }
        if (data.loai == "IMPORT") {
            _gridUploadExcel(response);
            _uploadService.hidePupup();
        } else {
            getAnhThumnail();
        }
    }
};
var _uploadService = new UploadService(configUpload);

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ngay_cap", title: "Ngày cấp", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "kieu_hd_ten", title: "Kiểu hợp đồng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "13%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số hợp đồng", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên khách", width: "18%", hozAlign: "left", headerSort: false },
    { field: "so_luong_dt", title: "SL người", width: "6%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "tong_phi", title: "Tổng phí", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nsd", title: "Cán bộ cấp đơn", width: "11%", hozAlign: "center", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "23%", hozAlign: "left", headerSort: false },
    { field: "so_hd_goc", title: "Số hợp đồng gốc", width: "15%", hozAlign: "left", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var configColumnKH = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac_cn", title: "Đơn vị", hozAlign: "center", width: "21%", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "loai_kh_hthi", title: "Khách hàng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã khách hàng", width: "15%", rowClickheaderSort: false },
    { field: "dchi", title: "Địa chỉ", width: "38%", headerSort: false },
    { field: "cmt", title: "CMT", width: "10%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "12%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "25%", headerSort: false },
];

var _gridViewHDKhac = new GridViewService("gridViewHDKhac", configColumn, getPaging, rowClick);
var _gridViewKH = new GridViewService("gridViewTkiemKH", configColumnKH, getPagingKhachHang, rowClickKH);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HOP_DONG_SO_DONG;
    _otherContractService.getpaging(objTimKiem).then(res => {
        _gridViewHDKhac.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HOP_DONG_SO_DONG) {
            _gridViewHDKhac.addRowEmpty(GRID_HOP_DONG_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHDKhac.addRowEmpty(GRID_HOP_DONG_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.so_id == undefined || data.so_id == null || data.so_id == 0 || data.so_id == "") {
        _notifyService.error("Vui lòng chọn hợp đồng");
        return;
    }
    layChitietHopDong(data);
    if (row !== undefined) {
        row.select();
        var objInput = {
            ma_doi_tac: data.ma_doi_tac,
            so_id: data.so_id,
            nv: data.nv
        }
        _otherContractService.getListDongtai(objInput).then(res => {
            ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
        });
    }
    _navDongtai.showTab("tabNhaBH");
};
function rowClickKH(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _dataKH = data;
    row.select();
};
function xemChiTietGCNKhac(ma_doi_tac, so_id, so_id_dt) {
    $(".item-gcn").removeClass("text-danger");
    _navThongTinQuyenLoiDKBS.showTab("tabThongTinDK");
    if (ma_doi_tac == "" || so_id == "" || so_id_dt == "") {
        var lhnv = objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.nhom == 'CHINH');
        var dkbs = objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.nhom == 'DKBS');
        ESUtil.genHTML("danhSachNV_template", "danhSachNV", { lhnv: lhnv }, () => {
            hthiTongTien();
            $(document).on("keypress", "#danhSachNV input.number", function (e) {
                var keycode = e.which || e.keyCode;
                var arrKeycode = [8, 37, 39, 46];
                if (!(event.shiftKey == false &&
                    ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                    event.preventDefault();
                }
            });
        });
        ESUtil.genHTML("danhSachNVDKBS_template", "danhSachNVDKBS", { lhnv: dkbs }, () => {
            hthiTongTienDKBS();
            $(document).on("keypress", "#danhSachNVDKBS input.number", function (e) {
                var keycode = e.which || e.keyCode;
                var arrKeycode = [8, 37, 39, 46];
                if (!(event.shiftKey == false &&
                    ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                    event.preventDefault();
                }
            });
        });
        return;
    }
    var obj = hop_dong_chi_tiet.data_info.gcn.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
    if (obj != null) {
        _frmGCNKhac.setData(obj);
        $("#item-gcn-" + ma_doi_tac + so_id + so_id_dt).addClass("text-danger");
        
        var lhnv = objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.nhom == 'CHINH');
        var lhnv_dkbs = objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.nhom == 'DKBS');
        for (var i = 0; i < lhnv.length; i++) {
            lhnv[i].tien_bh = 0;
            lhnv[i].thue = 0;
            lhnv[i].phi = 0;
            lhnv[i].ktru = 'K';
            lhnv[i].mien_thuong = '';
            lhnv[i].thue = 0;
            lhnv[i].nhom = '';
            var dsDieuKhoan = [];
            if (hop_dong_chi_tiet != null &&
                hop_dong_chi_tiet.data_info != null &&
                hop_dong_chi_tiet.data_info.dk != null &&
                ma_doi_tac != "" &&
                so_id != "" &&
                so_id_dt != "") {
                dsDieuKhoan = hop_dong_chi_tiet.data_info.dk.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt && n.nhom == 'CHINH');
            }
            if (dsDieuKhoan != null && dsDieuKhoan.length > 0) {
                for (var j = 0; j < dsDieuKhoan.length; j++) {
                    if (lhnv[i].ma == dsDieuKhoan[j].lh_nv) {
                        lhnv[i].tien_bh = dsDieuKhoan[j].tien_bh;
                        lhnv[i].thue = dsDieuKhoan[j].thue;
                        lhnv[i].tl_phi = dsDieuKhoan[j].tl_phi;
                        lhnv[i].phi = dsDieuKhoan[j].phi;
                        lhnv[i].ktru = dsDieuKhoan[j].ktru;
                        lhnv[i].mien_thuong = dsDieuKhoan[j].mien_thuong;
                        lhnv[i].nhom = "CHINH";
                    }
                }
            }
        }
        for (var i = 0; i < lhnv_dkbs.length; i++) {
            lhnv_dkbs[i].ktru = 'K';
            lhnv_dkbs[i].mien_thuong = '';
            lhnv_dkbs[i].nhom = '';
            var dsDKBS = [];
            if (hop_dong_chi_tiet != null &&
                hop_dong_chi_tiet.data_info != null &&
                hop_dong_chi_tiet.data_info.dk != null &&
                ma_doi_tac != "" &&
                so_id != "" &&
                so_id_dt != "") {
                dsDKBS = hop_dong_chi_tiet.data_info.dkbs.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt && n.nhom == 'DKBS');
            }
            if (dsDKBS != null && dsDKBS.length > 0) {
                for (var j = 0; j < dsDKBS.length; j++) {
                    if (lhnv_dkbs[i].ma == dsDKBS[j].lh_nv) {
                        lhnv_dkbs[i].ktru = dsDKBS[j].ktru;
                        lhnv_dkbs[i].mien_thuong = dsDKBS[j].mien_thuong;
                        lhnv_dkbs[i].nhom = "DKBS";
                    }
                }
            }
        }
        ESUtil.genHTML("danhSachNV_template", "danhSachNV", { lhnv: lhnv }, () => {
            hthiTongTien();
            $(document).on("keypress", "#danhSachNV input.number", function (e) {
                var keycode = e.which || e.keyCode;
                var arrKeycode = [8, 37, 39, 46];
                if (!(event.shiftKey == false &&
                    ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                    event.preventDefault();
                }
            });
        });
        ESUtil.genHTML("danhSachNVDKBS_template", "danhSachNVDKBS", { lhnv: lhnv_dkbs }, () => {
            hthiTongTienDKBS();
            $(document).on("keypress", "#danhSachNVDKBS input.number", function (e) {
                var keycode = e.which || e.keyCode;
                var arrKeycode = [8, 37, 39, 46];
                if (!(event.shiftKey == false &&
                    ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                    event.preventDefault();
                }
            });
        });
        getAnhThumnailHopDong();
    }
}
function showStep(step) {
    _navThongTinChiTietKhac.showTab(step);
    if (step == 'thong_tin_dong_tai') {
        $('#nbh').trigger('click');
        _navDongtai.showTab("tabNhaBH");
    }
}
function anHienThemMoiKH(form = "frmOtherContractSearch", is_slide = false) {
    $("#frmOtherContractSearch").hide();
    $("#frmSaveQLKHSearch").hide();
    $("#btnTiepTheo").hide();
    $("#btnSaveQLKHSearch").hide();
    $("#btnHuyThemMoiKH").hide();

    if (form == "frmOtherContractSearch") {
        $("#btnTiepTheo").show();
        if (is_slide)
            $("#frmOtherContractSearch").slideDown();
        else
            $("#frmOtherContractSearch").show();
    }
    if (form == "frmSaveQLKHSearch") {
        $("#btnSaveQLKHSearch").show();
        $("#btnHuyThemMoiKH").show();
        if (is_slide)
            $("#frmSaveQLKHSearch").slideDown();
        else
            $("#frmSaveQLKHSearch").show();
    }
}
function getPagingKhachHang(trang, callback = undefined) {
    var objTimKiem = _frmOtherContractSearch.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_KH_SO_DONG;
    _otherContractService.timkiemKhachhang(objTimKiem).then(res => {
        _gridViewKH.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_KH_SO_DONG) {
            _gridViewKH.addRowEmpty(GRID_KH_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewKH.addRowEmpty(GRID_KH_SO_DONG);
        }
        if (callback) {
            callback(res);
        }
    });
}
function layChitietHopDong(data, callback = undefined) {
    _otherContractService.layChiTietHopDong(data).then(res => {
        $("#inside-modal").esmodal("show");
        _frmGCNKhac.resetForm();
        _frmGCNKhac.clearErrorMessage();
        $('#danhDachGCNKhac').html('');
        trang = 1;
        hop_dong_chi_tiet = res;

        getDefaultDongTai();
        $('#so_luong_dt').html(hop_dong_chi_tiet.data_info.hd.so_luong_dt);
        $("#CarContractustomer1").bindJsonToHtml(res.data_info.hd);
        $("#CarContractustomer2").bindJsonToHtml(res.data_info.hd);
        _frmHopDong.setData(res.data_info.hd);
        _navThongTinChiTietKhac.showTab("thong_tin_bt_khac");
        $('#titleUpdateHD').html("Số hợp đồng: " + res.data_info.hd.so_hd);
        getPagingGCNTabLeft(trang);
        if (res.data_info.gcn == null || res.data_info.gcn.length <= 0) {
            $("#btnMoiGCN").trigger("click");
            _navThongTinHoSo.showTab("navThongTinChung");
        }
        else {
            xemChiTietGCNKhac(res.data_info.gcn[0].ma_doi_tac, res.data_info.gcn[0].so_id, res.data_info.gcn[0].so_id_dt);
            _navThongTinHoSo.showTab("navDanhSachKhac");
        }

        if (callback) {
            callback(res);
        }
    });
}
function getPagingGCNTabLeft(trang, callback = undefined) {
    var tim = $("#inputSearchBTKhac").val();
    tim = ESUtil.removeVietnameseTones(tim).toUpperCase();
    tim = tim.replace(/ /g, '');
    var so_dong = 14;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;

    var source = JSON.parse(JSON.stringify(hop_dong_chi_tiet.data_info.gcn));
    if (tim != "") {
        source = source.where(n => ESUtil.removeVietnameseTones(n.ten).toUpperCase().replace(/ /g, '').includes(tim));
    }
    var tong_so_dong = source.length;

    if (tong_so_dong % 15 == 0) {
        trang_max = tong_so_dong / 15;
    } else {
        trang_max = parseInt(tong_so_dong / 15) + 1;
    }
    if (trang == 1) {
        var arr = source.where((item, i) => i >= dau && i <= cuoi);
    } else if (trang > 1) {
        var arr = source.where((item, i) => i > dau && i <= cuoi);
    }
    if (arr.length != 0) {
        ESUtil.appendHTML("danhDachGCNKhac_template", "danhDachGCNKhac", { gcn: arr });
    }
    if (callback) {
        callback();
    }
}
function getDefaultDongTai() {
    _frmDTNhaBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrNhaBH = objDanhMuc.NhaBH.where(n => n.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNhaBH.getControl("don_vi_dong_tai").setDataSource(arrNhaBH, "ten", "ma", "Chọn nhà bảo hiểm", "");
    _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");

    _frmDTNoiBo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNoiBo.getControl("don_vi_dong_tai").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
}
function getAnhThumnail(callback = undefined) {
    _otherContractService.layDanhSachFile({
        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
        so_id: hop_dong_chi_tiet.data_info.hd.so_id,
        so_id_dt: _frmGCNKhac.getControl("so_id_dt").val(),
    }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
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
function xemChiTietEmailCC(data) {
    _otherContractService.xemThongTinEmail(data).then(res => {
        // form email CC
        _frmEmail_CC.resetForm();
        _frmEmail_CC.clearErrorMessage();
        if (res.data_info != null && res.data_info != undefined) {
            _frmEmail_CC.setData(res.data_info);
            _frmEmail_CC.getControl('so_id_dt').attr('data-val', res.data_info.so_id_dt);
            var ten = JSON.parse(JSON.stringify(hop_dong_chi_tiet.data_info.gcn)).where(n => n.so_id_dt == res.data_info.so_id_dt).firstOrDefault().ten;
            _frmEmail_CC.getControl('so_id_dt').val(ten);
        }
    });
}
function onCheckKhauTru(el, val) {
    var check = $(el).is(":checked");
    $("#danhSachNV input[col-mien-thuong='" + val + "']").attr("disabled", "disabled");
    if (check) {
        $("#danhSachNV input[col-mien-thuong='" + val + "']").removeAttr("disabled");
    }
    else {
        $("#danhSachNV input[col-mien-thuong='" + val + "']").val("0");
    }
    hthiTongTien();
}
function hthiTongTien() {
    var tt_khac_tong_tien_bh = 0;
    var tt_khac_tong_tien_mien_thuong = 0;
    var tt_khac_tong_phi = 0;
    var tt_khac_tong_thue = 0;
    $("#danhSachNV tr.ds_lhnv").each(function () {
        var ma = $(this).attr("row-val");
        tt_khac_tong_tien_bh += $("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
        tt_khac_tong_tien_mien_thuong += $("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
        tt_khac_tong_phi += $("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
        tt_khac_tong_thue += $("#danhSachNV tr input[col-thue-bh='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-thue-bh='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
    });

    $("#tt_khac_tong_tien_bh").html(ESUtil.formatMoney(tt_khac_tong_tien_bh));
    $("#tt_khac_tong_tien_mien_thuong").html(ESUtil.formatMoney(tt_khac_tong_tien_mien_thuong));
    $("#tt_khac_tong_phi").html(ESUtil.formatMoney(tt_khac_tong_phi));
    $("#tt_khac_tong_thue").html(ESUtil.formatMoney(tt_khac_tong_thue));
}
function hthiTongTienDKBS() {
    var tt_khac_tong_tien_mien_thuong = 0;
    $("#danhSachNVDKBS tr.ds_lhnv").each(function () {
        var ma = $(this).attr("row-val");
        tt_khac_tong_tien_mien_thuong += $("#danhSachNVDKBS tr input[col-mien-thuong='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNVDKBS tr input[col-mien-thuong='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
    });

    $("#tt_khac_tong_tien_mien_thuong_dkbs").html(ESUtil.formatMoney(tt_khac_tong_tien_mien_thuong));
}
function getDataTable() {
    var arr = [];
    $("#danhSachNV tr.ds_lhnv").each(function () {
        var ma = $(this).attr("row-val");
        var obj = {
            so_id_dt: 0,
            lh_nv: ma,
            ten: objDanhMuc.lhnv.where(n => n.ma == ma).firstOrDefault().ten,
            nhom: 'CHINH',
            tien_bh: $("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            phi: $("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            thue: $("#danhSachNV tr input[col-thue-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            mien_thuong: $("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            ktru: $("#danhSachNV tr input[col-khau-tru='" + ma + "']").is(":checked") ? "C" : "K",
            dkbs: $("#danhSachNV tr input[col-dkbs='" + ma + "']").val()
        };
        arr.push(obj);
    });
    return arr;
}
function getDataTableDKBS() {
    var arr = [];
    $("#danhSachNVDKBS tr.ds_lhnv").each(function () {
        var ma = $(this).attr("row-val");
        var obj = {
            so_id_dt: 0,
            lh_nv: ma,
            ten: objDanhMuc.lhnv.where(n => n.ma == ma).firstOrDefault().ten,
            nhom: 'DKBS',
            tien_bh: 0,
            phi: 0,
            thue: 0,
            mien_thuong: $("#danhSachNVDKBS tr input[col-mien-thuong='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            ktru: $("#danhSachNVDKBS tr input[col-khau-tru='" + ma + "']").is(":checked") ? "C" : "K",
            dkbs: $("#danhSachNVDKBS tr input[col-dkbs='" + ma + "']").val()
        };
        arr.push(obj);
    });
    return arr;
}
function getAnhThumnailHopDong(callback = undefined) {
    var pm = "BH";
    _otherContractService.layDanhSachFile({
        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql,
        so_id: hop_dong_chi_tiet.data_info.hd.so_id,
        so_id_dt: _frmGCNKhac.getControl("so_id_dt").val(),
        pm: pm
    }).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function luuPhanLoaiHangMuc(callback = undefined) {
    if (!_frmThemHMTT.isValid()) {
        return;
    }
    var obj = _frmThemHMTT.getJsonData();
    obj.loai = "TLHD";
    obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
    obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
    obj.pm = CONSTANT_PM;
    obj.bt = getImageSelect();
    obj.nv = hop_dong_chi_tiet.data_info.hd.nv;
    _otherContractService.phanLoaiHangMuc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getAnhThumnailHopDong(res => {
            if (!callback) {
                for (var i = 0; i < obj.bt.length; i++) {
                    $("#img" + obj.bt[i]).prop("checked", true);
                }
            }
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
function onToggleImg(index) {
    var count = $(".nhom_anh_ton_that_" + index + ":checked").length;
    var count_check = $(".nhom_anh_ton_that_" + index).length;
    if (count < count_check) {
        $(".nhom_anh_ton_that_" + index).prop("checked", true);
    } else {
        $(".nhom_anh_ton_that_" + index).prop("checked", false);
    }
}
function ChonGCNDongTai(el) {
    $("#inputTimKiemGCN").val("");
    $(".item-gcn").prop("checked", false);
    var ma = _frmDTNoiBo.getControl("so_id_dt").attr('data-val');
    $("#inputTimKiemGCN_ma").val(ma);

    getPagingGCN(1);
    _popoverDsGCN.show(el, () => {
        $("#inputTimKiemGCN").focus();
        return true;
    });
}
function getPagingGCN(trang, callback = undefined) {
    var tim = $("#inputTimKiemGCN").val();
    tim = ESUtil.removeVietnameseTones(tim).toUpperCase();
    tim = tim.replace(/ /g, '');
    var so_dong = 20;

    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var source = JSON.parse(JSON.stringify(hop_dong_chi_tiet.data_info.gcn));
    if (tim != "") {
        source = source.where(n => ESUtil.removeVietnameseTones(n.ten).toUpperCase().includes(tim));
    }
    var tong_so_dong = source.length;
    var arr = source.where((item, i) => i >= dau && i <= cuoi - 1);
    ESUtil.genHTML("danhSachGCNTemplate", "danhSachGCN", { data: arr }, () => {
        $("#danhSachGCN .single_checked").click(function () {
            $("#danhSachGCN .single_checked").prop("checked", false);
            $(this).prop("checked", true);
        });
        var ma = $("#inputTimKiemGCN_ma").val();
        if (ma != "") {
            $("#gcn_" + ma.replace(/\./g, '')).prop("checked", true);
        }
    });
    $("#dsGCN_pagination").html(ESUtil.pagingHTML("getPagingGCN", trang, tong_so_dong, so_dong));
    $("#inputTimKiemGCN").focus();
}
function chonGCNPaging(el) {
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var ma = '';
    if ($("#inputTimKiemGCN_ma").val() != "") {
        ma = $("#inputTimKiemGCN_ma").val();
    }
    if (checked) {
        ma = val;
    } else {
        ma = '';
    }
    $("#inputTimKiemGCN_ma").val(ma);
}
function getDefaultDongTai() {
    _frmDTNhaBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrNhaBH = objDanhMuc.NhaBH.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNhaBH.getControl("don_vi_dong_tai").setDataSource(arrNhaBH, "ten", "ma", "Chọn nhà bảo hiểm", "");
    _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");

    _frmDTNoiBo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNoiBo.getControl("don_vi_dong_tai").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
}
function xemGhiChuQl(el) {
    _popoverGhiChu.options = { placement: "top top-right" };
    $("#divGhiChu_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDung").val(val);
    _popoverGhiChu.showWithPosition(el);
}
function xemGhiChuQlDKBS(el) {
    _popoverGhiChuDKBS.options = { placement: "top top-right" };
    $("#divGhiChuDKBS_NoiDung").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChuDKBS_NoiDung").val(val);
    _popoverGhiChuDKBS.showWithPosition(el);
}
$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue(new Date().getNgayDauThang());
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _departmentListService.layDsPhongBan(),
        _otherContractService.getListNhaBH(),
        _otherContractService.getListLHNV(),
        _otherContractService.layHangMucCache(),
        _carManufacturerListService.layDsHangXe(),
        _hieuXeService.layDsHieuXe()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.phong_ban = arrRes[2].data_info;
        objDanhMuc.NhaBH = arrRes[3].data_info;
        objDanhMuc.lhnv = arrRes[4].data_info;
        objDanhMuc.hang_muc = arrRes[5].data_info;
        objDanhMuc.hang_xe = arrRes[6].data_info.where(n => n.nv == 'XE_MAY');
        objDanhMuc.hieu_xe = arrRes[7].data_info.where(n => n.nv == 'XE_MAY');
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmOtherContractSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmOtherContractSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmHopDong.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh2 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDong.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh2, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");

        _frmEditKH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh3 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmEditKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh3, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmHopDongEdit.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDongEdit.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");

        objDanhMuc.hang_muc_tlhd = objDanhMuc.hang_muc.where(n => n.loai === "TLHD");
        _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tlhd, "ten", "ma", "Chọn tài liệu", "");

        // Xe máy
        _frmGCNXeMay.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
        _frmGCNXeMay.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
        _frmGCNXeMay.getControl("nam_sx").setDataSource(NAM_SAN_XUAT, "ten", "ma", "Chọn năm sản xuất", "");

        getPaging(1);
    });

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChi_nhanh, "ten_tat", "ma", "Chọn đơn vị");
    });
    _frmOtherContractSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmOtherContractSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDong.getControl("ma_doi_tac_ql").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmHopDong.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDong.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        var ma_doi_tac = _frmHopDong.getControl("ma_doi_tac_ql").val();
        var arrPhongBan = objDanhMuc.phong_ban.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh === val);
        _frmHopDong.getControl("phong").setDataSource(arrPhongBan, "ten", "ma", "Chọn phòng ban", "");
    });
    _frmHopDongEdit.getControl("ma_doi_tac_ql").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDongEdit.getControl("phong").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDongEdit.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        var ma_doi_tac = _frmHopDongEdit.getControl("ma_doi_tac_ql").val();
        var arrPhongBan = objDanhMuc.phong_ban.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh === val);
        _frmHopDongEdit.getControl("phong").setDataSource(arrPhongBan, "ten", "ma", "Chọn phòng ban", "");
    });
    // Xe máy
    _frmGCNXeMay.getControl("hang_xe").addEventChange(val => {
        _frmGCNXeMay.getControl("hieu_xe").setDataSource(objDanhMuc.hieu_xe.where(n => n.hang_xe == val), "ten", "ma", "Chọn hiệu xe", "");
    });
    $("#btnOtherSearch").click(function () {
        _dataKH = null;
        getPagingKhachHang(1);
    });
    $("#btnThemMoiKhachHang").click(function () {
        $("#btnFooter").show();
        anHienThemMoiKH("frmSaveQLKHSearch", false);
    });
    $("#btnTiepTheo").click(function () {
        if (_dataKH == null) {
            _notifyService.error("Vui lòng chọn khách hàng");
            return;
        }
        _navTabTimKiemKhachHang.showTab("tabThongTinHD");
        _frmHopDong.clearErrorMessage();
        _frmHopDong.resetForm();
        _frmHopDong.getControl("ma_kh").val(_dataKH.ma);
        _frmHopDong.getControl("khach_hang").val(_dataKH.ten + ' - ' + _dataKH.ma);
        _frmHopDong.getControl("ma_doi_tac_ql").setValue(_dataKH.ma_doi_tac);
        _frmHopDong.getControl("ma_doi_tac_ql").trigger('select2:select');
        _frmHopDong.getControl("ma_chi_nhanh_ql").setValue(_dataKH.ma_chi_nhanh);
        _frmHopDong.getControl("ma_chi_nhanh_ql").trigger('select2:select');
        _frmHopDong.getControl("trang_thai").setValue("C");
        _frmHopDong.getControl("trang_thai").readOnly();
        _frmHopDong.getControl("kieu_hd").setValue("G");
        _frmHopDong.getControl("kieu_hd").readOnly();
        _frmHopDong.getControl("kieu_hd").trigger('select2:select');

        _frmHopDong.getControl('ngay_cap').val(new Date().ddmmyyyy());
        _frmHopDong.getControl('ngay_hl').val(new Date().ddmmyyyy());
        _frmHopDong.getControl('ngay_hl').trigger('change');
    });
    $("#btnQuayLai").click(function () {
        _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
    });
    $('#btnLuuHD').click(function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SAVE';
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }
            _otherContractService.hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDong.getControl('so_id').val(res.out_value.so_id);
                    formData.so_id = res.out_value.so_id;
                    var obj = {
                        ma_doi_tac: ESCS_MA_DOI_TAC,
                        ma_doi_tac_ql: formData.ma_doi_tac,
                        so_id: res.out_value.so_id
                    };
                    $('.close').trigger('click');
                    $('#btnSearch').click();
                    layChitietHopDong(obj);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnSuaThongTinKH").click(function () {
        _customerService.xemChiTiet_KH({
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
            ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql,
            ma: hop_dong_chi_tiet.data_info.hd.ma_kh
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmEditKH.clearErrorMessage();
            _frmEditKH.setData(res.data_info);
            _frmEditKH.getControl("ma_doi_tac").trigger("select2:select");
            _frmEditKH.getControl("ma_chi_nhanh").setValue(res.data_info.ma_chi_nhanh);
            _frmEditKH.getControl("ma_doi_tac").readOnly();
            _frmEditKH.getControl("ma_chi_nhanh").readOnly();
            _frmEditKH.getControl("ma").readOnly();
            _frmEditKH.getControl("loai_kh").trigger("select2:select");
            _modalEditKH.show();
        });
    });
    $("#btnSuaThongTinHD").click(function () {
        setTimeout(() => {
            _gridViewKH.table.redraw(true);
        }, 200);
        _frmHopDongEdit.resetForm();
        _frmHopDongEdit.clearErrorMessage();
        _frmHopDongEdit.setData(hop_dong_chi_tiet.data_info.hd);
        _frmHopDongEdit.getControl("ma_doi_tac_ql").trigger("select2:select");
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql);
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").trigger("select2:select");
        _frmHopDongEdit.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmHopDongEdit.getControl("kieu_hd").trigger("select2:select");
        _frmHopDongEdit.getControl("kieu_hd").readOnly();
        _frmHopDongEdit.getControl("so_hd_goc").readOnly();
        _frmHopDongEdit.getControl("khach_hang").val(hop_dong_chi_tiet.data_info.hd.ten + ' - ' + hop_dong_chi_tiet.data_info.hd.ma_kh);
        _frmHopDongEdit.getControl("ma_doi_tac").readOnly(false);
        _frmHopDongEdit.getControl("ma_chi_nhanh").readOnly(false);
        _frmHopDongEdit.getControl("phong").readOnly(false);
        _frmHopDongEdit.getControl("loai").setValue("SAVE");
        _modalEditHD.show();
    });
    $("#btnClose").click(function () {
        $("#inside-modal").esmodal("hide");
    });
    $("#btnSuaGCN").click(function () {
        var ma_doi_tac = _frmGCNKhac.getControl("ma_doi_tac").val();
        var so_id = _frmGCNKhac.getControl("so_id").val();
        var so_id_dt = _frmGCNKhac.getControl("so_id_dt").val();
        var obj = hop_dong_chi_tiet.data_info.gcn.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
        if (obj == null) {
            _notifyService.error("Không xác định được đối tượng bảo hiểm");
            return;
        }
        _frmSuaGCN.resetForm();
        _frmSuaGCN.clearErrorMessage();
        _frmSuaGCN.setData(obj);
        _frmSuaGCN.getControl("lhnv").trigger("select2:select");
        _frmSuaGCN.getControl("goi_bh").setValue(obj.goi_bh);
        _modalSuaGCN.show();
    });
    $('#btnTongPhi').click(function () {
        var obj = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id
        }
        _frmThemTongPhi.setData(obj);

        _otherContractService.GetTongPhiTpa(obj).then(res => {
            ESUtil.genHTML("tblTongPhiTPA_template", "tblTongPhiTPA", { data: res.data_info }, () => {
                var tong = 0;
                $.each(res.data_info, (index, item) => {
                    tong += parseInt(item.phi_tpa);
                });
                $('#tong_phi_tpa').html(ESUtil.formatMoney(tong));
            });
        });

        _modalThemTongPhi.show();
    });
    $('#btnLuuTongPhi').click(function () {
        if (_frmThemTongPhi.isValid()) {
            var formData = _frmThemTongPhi.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql;
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            _otherContractService.tongPhiTpaNhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var obj = {
                        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
                        so_id: hop_dong_chi_tiet.data_info.hd.so_id
                    }
                    _healthService.GetTongPhiTpa(obj).then(res1 => {
                        ESUtil.genHTML("tblTongPhiTPA_template", "tblTongPhiTPA", { data: res1.data_info }, () => {
                            var tong = 0;
                            $.each(res1.data_info, (index, item) => {
                                tong += parseInt(item.phi_tpa);
                            });
                            $('#tong_phi_tpa').html(ESUtil.formatMoney(tong));
                        });
                    });
                    _frmThemTongPhi.clearErrorMessage();
                    _frmThemTongPhi.resetForm();
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#btnXoaPhiTPA').click(function () {
        var obj = _frmThemTongPhi.getJsonData();
        obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;

        _notifyService.confirmDelete("Bạn có chắc muốn xóa phí phát sinh này không?", "", val => {
            _healthService.xoaTongPhiTpa(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id
                }
                _healthService.GetTongPhiTpa(obj).then(res1 => {
                    ESUtil.genHTML("tblTongPhiTPA_template", "tblTongPhiTPA", { data: res1.data_info }, () => {
                        var tong = 0;
                        $.each(res1.data_info, (index, item) => {
                            tong += parseInt(item.phi_tpa);
                        });
                        $('#tong_phi_tpa').html(ESUtil.formatMoney(tong));
                    });
                });
                _frmThemTongPhi.clearErrorMessage();
                _frmThemTongPhi.resetForm();
                _notifyService.success("Xóa phí phát sinh thành công.");
            });
        });
    });
    $('#btnMoiPhiTPA').click(function () {
        _frmThemTongPhi.clearErrorMessage();
        _frmThemTongPhi.resetForm();
    });
    $("#btnSDBS").click(function () {
        _frmHopDongEdit.resetForm();
        _frmHopDongEdit.clearErrorMessage();
        _frmHopDongEdit.setData(hop_dong_chi_tiet.data_info.hd);
        _frmHopDongEdit.getControl("so_id").setValue("");
        _frmHopDongEdit.getControl("ma_doi_tac_ql").trigger("select2:select");
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql);
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").trigger("select2:select");
        _frmHopDongEdit.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmHopDongEdit.getControl("kieu_hd").setValue("B");
        _frmHopDongEdit.getControl("kieu_hd").trigger("select2:select");
        _frmHopDongEdit.getControl("kieu_hd").readOnly();
        _frmHopDongEdit.getControl("so_hd_goc").setValue(hop_dong_chi_tiet.data_info.hd.so_hd);
        _frmHopDongEdit.getControl("so_hd_goc").readOnly();
        _frmHopDongEdit.getControl("khach_hang").val(hop_dong_chi_tiet.data_info.hd.ten + ' - ' + hop_dong_chi_tiet.data_info.hd.ma_kh);
        _frmHopDongEdit.getControl("ma_doi_tac").readOnly();
        _frmHopDongEdit.getControl("ma_chi_nhanh").readOnly();
        _frmHopDongEdit.getControl("so_hd").setValue("");
        _frmHopDongEdit.getControl("trang_thai").setValue("C");
        _frmHopDongEdit.getControl("loai").setValue("SDBS");
        _modalEditHD.show();
    });
    $("#btnLuuHDEdit").click(function () {
        if (_frmHopDongEdit.isValid()) {
            var formData = _frmHopDongEdit.getJsonData();
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }
            _otherContractService.hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDongEdit.getControl('so_id').val(res.out_value.so_id);
                    formData.so_id = res.out_value.so_id;
                    var obj = {
                        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                        ma_doi_tac_ql: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
                        so_id: res.out_value.so_id
                    };
                    layChitietHopDong(obj);
                    _modalEditHD.hide();
                    getPaging(1);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXemThongTinSDBS").click(function () {
        ESUtil.genHTML("SDBS_template", "tableSDBS", { dk: hop_dong_chi_tiet.data_info.hd_sdbs });
        _modalSDBS.show();
    });
    $('#btnUpLoadAnhDGTT').click(function () {
        var obj = {
            ma_doi_tac: _frmGCNKhac.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNKhac.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNKhac.getControl("so_id").val(),
            so_id_dt: _frmGCNKhac.getControl("so_id_dt").val(),
            type: "image",
            pm: "BH",
            nv: hop_dong_chi_tiet.data_info.hd.nv,
            loai: ""
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Không xác định đối tượng bảo hiểm");
            return;
        }
        _uploadService.setParam(obj);
        _uploadService.showPupup();
    });
    $("#btnAdd").click(function () {
        $("#btnFooter").hide();
        anHienThemMoiKH("frmOtherContractSearch", false);
        getPagingKhachHang(1, res => {
            _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
            _modalOtherContractSearch.show();
            _frmOtherContractSearch.resetForm();
            _frmOtherContractSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmOtherContractSearch.getControl("ma_doi_tac").trigger("select2:select");
            setTimeout(() => {
                _gridViewKH.table.redraw(true);
            }, 200);
        });
    });
    $("#btnSearch").click(function () {
        getPaging(1);
    });
    $("#btnChonDKBS").click(function () {
        var arrInput = $(".modalChonDKBSItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        var id = $("#modalChonDKBSElementSelect").val();
        $("#" + id).val(val);
        if ($("#" + id).attr("onchange") != undefined) {
            $("#" + id).trigger("change");
        }
        _modalChonDKBS.hide();
    });
    $('#btnLuuGCN').click(function () {
        if (!_frmGCNKhac.isValid())
            return;
        var obj = _frmGCNKhac.getJsonData();
        obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        obj.nv = hop_dong_chi_tiet.data_info.hd.nv;
        obj.dk = getDataTable();
        obj.dkbs = getDataTableDKBS();
        _otherContractService.luuThongTinGCN(obj).then(res => {
            if (res.state_info.status === "OK") {
                var objChiTiet = {
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                    so_id_dt: res.out_value.so_id_dt
                };
                layChitietHopDong(objChiTiet, resCtiet => {
                    xemChiTietGCNKhac(objChiTiet.ma_doi_tac, objChiTiet.so_id, objChiTiet.so_id_dt);
                });
                _notifyService.success("Lưu thông tin thành công.");
                getPaging(1);
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $('#btnCopyGCN').click(function () {
        _frmGCNKhac.getControl('gcn').val('');
        _frmGCNKhac.getControl('so_id_dt').val('');
    });
    $('#btnMoiGCN').click(function () {
        _frmGCNKhac.resetForm();
        _frmGCNKhac.clearErrorMessage();
        _frmGCNKhac.getControl("ma_doi_tac").setValue(hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
        _frmGCNKhac.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmGCNKhac.getControl("so_id").setValue(hop_dong_chi_tiet.data_info.hd.so_id);
        xemChiTietGCNKhac(hop_dong_chi_tiet.data_info.hd.ma_doi_tac, "", "");
    });
    $("#btnXoaGCN").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hợp đồng bảo hiểm này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    $('#btnViewAnhListDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        _frmThemHMTT.getControl("hang_muc").setValue("");
        _modalThemHMTT.show();
    });
    $("#btnLuuHMTT").click(function () {
        luuPhanLoaiHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanLoaiHangMuc(res => {
            _modalThemHMTT.hide();
        });
    });
    $('#btnDownLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (arrVal.length === 1) {
            _otherContractService.layAnhChiTiet({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal[0] }).then(res => {
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
        }
        else {
            _otherContractService.taiFileAnhTonThatZip({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });
    $('#btnXoaLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        var obj = {
            ma_doi_tac: _frmGCNKhac.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNKhac.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNKhac.getControl("so_id").val(),
            so_id_dt: _frmGCNKhac.getControl("so_id_dt").val(),
            type: "image",
            pm: CONSTANT_PM,
            bt: arrVal,
            loai: ""
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Không xác định đối tượng bảo hiểm");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", 1, val => {
            _otherContractService.xoaAnh(obj).then(res => {
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
            });
        });
    });
    $('#btnChonGCN').click(function () {
        if (_popoverDsGCN.target == 'NB') {
            var so_id_dt = $("#inputTimKiemGCN_ma").val();
            if (so_id_dt == "") {
                _notifyService.error("Bạn chưa chọn gcn nào");
                return;
            }
            var dt = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt && n.so_id == hop_dong_chi_tiet.data_info.hd.so_id).firstOrDefault();
            ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;

            _frmDTNoiBo.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNoiBo.getControl("so_id_dt").val(ten);
            if (dt.length != 0) {
                lhnv = JSON.parse(JSON.stringify(objDanhMuc.lhnv.where(
                    n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.loai == dt.loai && n.nhom == 'CHINH')));
                _frmDTNoiBo.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            } else {
                _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            }
        } else if (_popoverDsGCN.target == 'NBH') {
            var so_id_dt = $("#inputTimKiemGCN_ma").val();
            if (so_id_dt == "") {
                _notifyService.error("Bạn chưa chọn gcn nào");
                return;
            }
            var dt = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt && n.so_id == hop_dong_chi_tiet.data_info.hd.so_id).firstOrDefault();
            ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;

            _frmDTNhaBH.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNhaBH.getControl("so_id_dt").val(ten);
            if (dt.length != 0) {
                lhnv = JSON.parse(JSON.stringify(objDanhMuc.lhnv.where(
                    n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.nv == hop_dong_chi_tiet.data_info.hd.nv && n.loai == dt.loai && n.nhom == 'CHINH')));
                _frmDTNhaBH.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            } else {
                _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            }
        }
        _popoverDsGCN.hide();
    });
    $('#btnLuuDTNhaBH').click(function () {
        if (_frmDTNhaBH.isValid()) {
            if (_frmDTNhaBH.getControl('tl_dong').val() == "" && _frmDTNhaBH.getControl('tl_tai_cd').val() == "" && _frmDTNhaBH.getControl('tl_tai_tt').val() == "") {
                _notifyService.error("Bạn không được để trống cả 3 trường tỷ lệ đồng / tái");
                return;
            }
            var formData = _frmDTNhaBH.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            formData.nv = hop_dong_chi_tiet.data_info.hd.nv;
            formData.so_id_dt = _frmDTNhaBH.getControl('so_id_dt').attr('data-val');
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NGOAI';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _otherContractService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _otherContractService.getListDongtai(objInput).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    $('#btnMoiDTNhaBH').trigger('click');
                    _notifyService.success("Lưu thông tin thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#btnLuuDTNoiBo').click(function () {
        if (_frmDTNoiBo.isValid()) {
            var formData = _frmDTNoiBo.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            formData.nv = hop_dong_chi_tiet.data_info.hd.nv;
            formData.so_id_dt = _frmDTNoiBo.getControl('so_id_dt').attr('data-val');
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NOIBO';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _otherContractService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _otherContractService.getListDongtai(objInput).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    $('#btnMoiDTNoiBo').trigger('click');
                    _notifyService.success("Lưu thông tin thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
});