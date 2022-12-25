var objDanhMuc = {};
var _service = new Service();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var NAM_SAN_XUAT = [];
var arrData = [];
var trang = 0;
var trang_max = 0;
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}
// Services
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _departmentListService = new DepartmentListService();
var _healthService = new HealthService();
var _categoryCommonService = new CategoryCommonService();
var _commonService = new CommonService();
var _packageService = new PackageService();
var _carManufacturerListService = new CarManufacturerListService();
var _hieuXeService = new HieuXeService();
var _rangeVehicleService = new RangeVehicleService();
var _businessCodeService = new BusinessCodeService();
var _customerService = new CustomerService();
var _UploadExcelService = new UploadExcelService();
var _categoryPersonService = new CategoryPersonService();
var _departmentListService = new DepartmentListService();

// Form
var _frmTimKiem = new FormService("frmTimKiem");
var _frmEditKH = new FormService("frmEditKH");
var _frmCarContractSearch = new FormService("frmCarContractSearch");
var _frmSaveQLKHSearch = new FormService("frmSaveQLKHSearch");
var _frmHopDong = new FormService("frmHopDong");
var _frmGCNNguoi = new FormService("frmGCNNguoi");
var _frmImportXe = new FormService("frmImportXe");
var _frmEmail_CC = new FormService("frmEmail_CC");
var _frmDTNhaBH = new FormService("frmDTNhaBH");
var _frmDTNoiBo = new FormService("frmDTNoiBo");
var _frmHopDongEdit = new FormService("frmHopDongEdit");
var _frmToaDoAnh = new FormService("frmToaDoAnh");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmThemTongPhi = new FormService("frmThemTongPhi");
var _frmSuaDoiTuong = new FormService("frmSuaDoiTuong");
var _frmSuaGCN = new FormService("frmSuaGCN");
var _frmLuuThongTinDoiTacPhong = new FormService("frmLuuThongTinDoiTacPhong");
var _frmNhapKyThanhToan = new FormService("frmNhapKyThanhToan");
var _frmSearchDanhSachNDBH = new FormService("frmSearchDanhSachNDBH");
// Modal
var _modalCarContractSearch = new ModalService("modalCarContractSearch");
var _modalSDBS = new ModalService("modalSDBS");
var _modalEditKH = new ModalService("modalEditKH");
var _modalEditHD = new ModalService("modalEditHD");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalMap = new ModalMapService("modalMap");
var _modalThemTongPhi = new ModalService("ModalThemTongPhi");
var _modalSuaDoiTuong = new ModalService("ModalSuaDoiTuong");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "tabHoSoGiayTo");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalSuaGCN = new ModalFullScreenService("modalSuaGCN", "");
var _modalNhapMaDoiTacPhong = new ModalService("modalNhapMaDoiTacPhong");
var _modalNhapKyThanhToan = new ModalService("modalNhapKyThanhToan");
var _modalGoiBH = new ModalDragService("modalGoiBH", undefined, "left");
var _modalXemQuyenLoi = new ModalService("modalXemQuyenLoi");
var _modalXemToanBoNDBH = new ModalService("modalXemToanBoNDBH");
// Pop Over
var _popoverDsGCN = new PopoverService("popoverDsGCN");
var _popoverChonDoiTuong = new PopoverService("popoverChonDoiTuong");
// Navtab
var _navTabTimKiemKhachHang = new NavTabService("navTabTimKiemKhachHang", ["tabTimKiemKH", "tabThongTinHD"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navDanhSachNguoi"], "nav-tabs-timeline");
var _navThongTinChiTietNguoi = new NavTabService("navThongTinChiTietNguoi", ["thong_tin_nguoi", "tai_lieu", "thong_tin_dong_tai", "cau_hinh_email_cc"], "quy-trinh");//nav-tabs-timeline
var _navDongtai = new NavTabService("navDongtai", ["tabNhaBH", "tabNoiBo"], "nav-tabs-timeline");
var _navThongTinQuyenLoiDKBS = new NavTabService("navThongTinQuyenLoiDKBS", ["tabThongTinQuyenLoiBaoHiem", "tabDieuKhoanBoSung"], "nav-pills");

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
const GRID_GCN_SO_DONG = 15;
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
    { field: "ngay_text", title: "Ngày nhập HĐ", width: "8%", hozAlign: "center", headerSort: false },
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

var configColumnDsNDBH = [
    { field: "sott", title: "Stt", width: "3%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", hozAlign: "center", width: "12%", headerSort: false },
    { field: "ngay_sinh", title: "Ngày sinh", hozAlign: "center", width: "6%", headerSort: false },
    { field: "gioi_tinh", title: "Giới tính", width: "5%", hozAlign: "center", headerSort: false },
    { field: "dthoai", title: "Điện thoại", hozAlign: "center", width: "7%", headerSort: false },
    { field: "so_cmt", title: "CMND", hozAlign: "center", width: "7%", headerSort: false },
    { field: "email", title: "Email", hozAlign: "center", width: "12%", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "15%", headerSort: false },
    { field: "gcn", title: "Số GCN", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ngay_cap", title: "Ngày cấp", hozAlign: "center", width: "6%", headerSort: false },
    { field: "ngay_hl", title: "Ngày hiệu lực", hozAlign: "center", width: "10%", headerSort: false },
    { field: "goi_bh", title: "Gói bảo hiểm", hozAlign: "center", width: "10%", headerSort: false },
];

var _gridViewHDSucKhoe = new GridViewService("gridViewHDSucKhoe", configColumn, getPaging, rowClick);
var _gridViewKH = new GridViewService("gridViewTkiemKH", configColumnKH, getPagingKhachHang, rowClickKH);
var _gridViewDanhSachNDBH = new GridViewService("gridViewDanhSachNDBH", configColumnDsNDBH, getPagingDanhSachNDBH);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HOP_DONG_SO_DONG;
    _healthService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewHDSucKhoe.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HOP_DONG_SO_DONG) {
            _gridViewHDSucKhoe.addRowEmpty(GRID_HOP_DONG_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHDSucKhoe.addRowEmpty(GRID_HOP_DONG_SO_DONG);
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
            nv: 'NG'
        }
        _healthService.getListDongtai(objInput).then(res => {
            ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
        });
    }
    _navDongtai.showTab("tabNhaBH");
};
function showStep(step) {
    _navThongTinChiTietNguoi.showTab(step);
    if (step == 'thong_tin_dong_tai') {
        $('#nbh').trigger('click');
        _navDongtai.showTab("tabNhaBH");
    }
}
function xemChiTietEmailCC(data) {
    _healthService.xemThongTinEmail(data).then(res => {
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
function layChitietHopDong(data, callback = undefined) {
    _healthService.layChiTietHopDong(data).then(res => {
        $("#inside-modal").esmodal("show");
        _frmGCNNguoi.resetForm();
        _frmGCNNguoi.clearErrorMessage();
        $('#danhDachGCNNguoi').html('');
        trang = 1;
        dsGoiBH = res.data_info.goi_bh;
        hop_dong_chi_tiet = res;
        var ma_doi_tac_ql = hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql;
        _frmGCNNguoi.getControl("lhnv").setDataSource(objDanhMuc.lhnv.where(n => n.ma_doi_tac == ma_doi_tac_ql), "ten", "ma", "Chọn sản phẩm", "");
        _frmSuaGCN.getControl("lhnv").setDataSource(objDanhMuc.lhnv.where(n => n.ma_doi_tac == ma_doi_tac_ql), "ten", "ma", "Chọn sản phẩm", "");

        getDefaultDongTai();
        $('#so_luong_dt').html(hop_dong_chi_tiet.data_info.hd.so_luong_dt);
        $("#CarContractustomer1").bindJsonToHtml(res.data_info.hd);
        $("#CarContractustomer2").bindJsonToHtml(res.data_info.hd);
        _frmHopDong.setData(res.data_info.hd);
        _navThongTinChiTietNguoi.showTab("thong_tin_nguoi");
        $('#titleUpdateHD').html("Số hợp đồng: " + res.data_info.hd.so_hd);
        getPagingGCNTabLeft(trang);
        //ESUtil.pagingHTML("getPagingGCN", trang, tong_so_dong, so_dong)
        //ESUtil.genHTML("danhDachGCNNguoi_template", "danhDachGCNNguoi", res.data_info);
        if (res.data_info.gcn == null || res.data_info.gcn.length <= 0) {
            $("#btnMoiGCN").trigger("click");
            _navThongTinHoSo.showTab("navThongTinChung");
        }
        else {
            xemChiTietGCNNguoi(res.data_info.gcn[0].ma_doi_tac, res.data_info.gcn[0].so_id, res.data_info.gcn[0].so_id_dt);
            _navThongTinHoSo.showTab("navDanhSachNguoi");
        }

        if (callback) {
            callback(res);
        }
    });
}
function getDefaultDongTai() {
    var ma_doi_tac_ql = hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql;

    _frmDTNhaBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrNhaBH = objDanhMuc.NhaBH.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNhaBH.getControl("don_vi_dong_tai").setDataSource(arrNhaBH, "ten", "ma", "Chọn nhà bảo hiểm", "");
    _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");

    _frmDTNoiBo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNoiBo.getControl("don_vi_dong_tai").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
}
function getPagingKhachHang(trang, callback = undefined) {
    var objTimKiem = _frmCarContractSearch.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_KH_SO_DONG;
    _healthService.timkiemKhachhang(objTimKiem).then(res => {
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
function getPagingDanhSachNDBH(trang, callback = undefined) {
    var objTimKiem = _frmSearchDanhSachNDBH.getJsonData();
    objTimKiem.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_GCN_SO_DONG -1;
    _healthService.layDanhSachNDBH(objTimKiem).then(res => {
        _gridViewDanhSachNDBH.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_GCN_SO_DONG) {
            _gridViewDanhSachNDBH.addRowEmpty(GRID_GCN_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewDanhSachNDBH.addRowEmpty(GRID_GCN_SO_DONG);
        }
        if (callback) {
            callback(res);
        }
    });
}
function rowClickKH(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _dataKH = data;
    row.select();
};
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
function getPagingGCNTabLeft(trang, callback = undefined) {
    var tim = $("#inputSearchNguoi").val();
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
        ESUtil.appendHTML("danhDachGCNNguoi_template", "danhDachGCNNguoi", { gcn: arr });
    }
    if (callback) {
        callback();
    }
}
function xemChiTietGCNNguoi(ma_doi_tac, so_id, so_id_dt) {
    $(".item-gcn").removeClass("text-danger");
    if (ma_doi_tac == "" || so_id == "" || so_id_dt == "") {
        return;
    }
    var obj = hop_dong_chi_tiet.data_info.gcn.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
    if (obj != null) {
        // form thông tin GCN
        _frmGCNNguoi.resetForm();
        _frmGCNNguoi.clearErrorMessage();
        _frmGCNNguoi.setData(obj);
        _frmGCNNguoi.getControl("lhnv").trigger("select2:select");
        _frmGCNNguoi.getControl("goi_bh").attr('data-val', obj.goi_bh);
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();
        var goi_bh = dsGoiBH.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.ma_nhom == lhnv && n.ma == obj.goi_bh).firstOrDefault();
        _frmGCNNguoi.getControl("goi_bh").setValue(goi_bh.ten);
        _frmGCNNguoi.getControl("goi_bh").attr("data-id-goi", goi_bh.so_id);
        _frmGCNNguoi.getControl("goi_bh").attr("data-val", obj.goi_bh);
        $("#item-gcn-" + ma_doi_tac + so_id + so_id_dt).addClass("text-danger");

        getAnhThumnail();

        var obj_email_cc = {
            ma_doi_tac: obj.ma_doi_tac,
            so_id_hd: obj.so_id,
            so_id_dt: obj.so_id_dt
        }
        xemChiTietEmailCC(obj_email_cc);
    }
    var objInput = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        so_id_dt: so_id_dt
    }
    ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
    ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: [] });
    _service.all([
        _healthService.LayQuyenLoiGoiBH(objInput),
        _healthService.LayDKBSGCN(objInput)
    ]).then(arrRes => {
        if (arrRes[0].state_info.status !== "OK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        if (arrRes[1].state_info.status !== "OK") {
            _notifyService.error(arrRes[1].state_info.message_body);
            return;
        }
        ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: arrRes[0].data_info }, () => {
            hthiTongCong();
        });

        var dkbs = arrRes[1].data_info.where(n => n.type == 'DKBS');
        if (dkbs.length == 0) {
            ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: [] });
        } else {
            ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: dkbs });
        }
    });
}
function getDataTable() {
    var arr = [];
    $("#danhSachNV tr").each(function () {
        var ma = $(this).attr("row-val");
        var obj = {
            so_id_dt: 0,
            lh_nv: ma,
            tien: $("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            tl_phi: $("#danhSachNV tr input[col-tl-phi='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            phi: $("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            thue: 0,
            mien_thuong: $("#danhSachNV tr input[col-mien-thuong='" + ma + "']").is(":checked") ? "C" : "K",
            ktru: $("#danhSachNV tr input[col-khau-tru='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            dkbs: ""
        };
        arr.push(obj);
    });
    return arr;
}
function getAnhThumnail(callback = undefined) {
    _healthService.layDanhSachFile({
        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
        so_id: hop_dong_chi_tiet.data_info.hd.so_id,
        so_id_dt: _frmGCNNguoi.getControl("so_id_dt").val(),
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
function anHienThemMoiKH(form = "frmCarContractSearch", is_slide = false) {
    $("#frmCarContractSearch").hide();
    $("#frmSaveQLKHSearch").hide();
    $("#btnTiepTheo").hide();
    $("#btnSaveQLKHSearch").hide();
    $("#btnHuyThemMoiKH").hide();

    if (form == "frmCarContractSearch") {
        $("#btnTiepTheo").show();
        if (is_slide)
            $("#frmCarContractSearch").slideDown();
        else
            $("#frmCarContractSearch").show();
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
function Xem_chi_tiet_dong_tai(ma_doi_tac, so_id, so_id_dt, don_vi_dong_tai, loai_dong) {
    $(".dong_tai").removeClass("active");
    $("#dong_tai_"+so_id+"_"+so_id_dt).addClass("active");
    var objInput = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        so_id_dt: so_id_dt,
        don_vi_dong_tai: don_vi_dong_tai,
        loai_dong: loai_dong,
        nv: 'NG'
    }
    _healthService.getDetailDongTai(objInput).then(res => {
        if (res.data_info.loai_dong == 'NGOAI') {
            _navDongtai.showTab("tabNhaBH");
            $('#nbh').trigger('click');
            _healthService.LayQuyenLoiGoiBH(objInput).then(resp => {
                _frmDTNhaBH.getControl("lhnv").setDataSource(resp.data_info, "ten", "lh_nv", "Chọn loại hình nghiệp vụ", res.data_info.lhnv.trim());
            });
            _frmDTNhaBH.setData(res.data_info);
            var ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;
            _frmDTNhaBH.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNhaBH.getControl("so_id_dt").val(ten);
        } else if (res.data_info.loai_dong == 'NOIBO') {
            _navDongtai.showTab("tabNoiBo");
            $('#nb').trigger('click');
            $('#CarCompensationContent2Tab .nav-link').removeClass("active").first().addClass("active");
            _healthService.LayQuyenLoiGoiBH(objInput).then(resp => {
                _frmDTNoiBo.getControl("lhnv").setDataSource(resp.data_info, "ten", "lh_nv", "Chọn loại hình nghiệp vụ", res.data_info.lhnv.trim());
            });
            _frmDTNoiBo.setData(res.data_info);
            var ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;
            _frmDTNoiBo.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNoiBo.getControl("so_id_dt").val(ten);
        }
    });
}
function ConvertDateToString(d) {
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 101).toString().slice(-2);
    var dd = (d.getDate() + 100).toString().slice(-2);
    return yyyy + dd + mm;
}
function layGoi(ma_sp, gioi_tinh, ngay_sinh, ngay_hl, ma_goi = undefined, callback = undefined) {
    var tuoi = ESUtil.tinh_tuoi(ngay_sinh, ngay_hl);
    var ngay_hl = ngay_hl.dateToNumber();
    var nhom_goi = _frmGCNNguoi.getControl("nhom_goi").getValue();
    var arrGoiBH = dsGoiBH.where(n => n.ma_nhom === ma_sp && (n.gioi_tinh == undefined || n.gioi_tinh == null || n.gioi_tinh.trim() == "" || n.gioi_tinh == gioi_tinh) && tuoi >= n.tuoi_tu &&
        tuoi <= n.tuoi_toi && ngay_hl >= n.ngay_ad && (nhom_goi == '' || n.nhom_goi == nhom_goi));

    for (var index1 = 0; index1 < arrGoiBH.length - 1; index1++) {
        for (var index2 = index1 + 1; index2 < arrGoiBH.length; index2++) {
            if (arrGoiBH[index1].ma_doi_tac == arrGoiBH[index2].ma_doi_tac && arrGoiBH[index1].gioi_tinh == arrGoiBH[index2].gioi_tinh
                && arrGoiBH[index1].tuoi_tu == arrGoiBH[index2].tuoi_tu && arrGoiBH[index1].tuoi_toi == arrGoiBH[index2].tuoi_toi
                && arrGoiBH[index1].ma == arrGoiBH[index2].ma && arrGoiBH[index1].ma_nhom == arrGoiBH[index2].ma_nhom) {
                if (ngay_hl - arrGoiBH[index1].ngay_ad >= ngay_hl - arrGoiBH[index2].ngay_ad) {
                    arrGoiBH = arrGoiBH.filter(item => item != arrGoiBH[index1]);
                } else {
                    arrGoiBH = arrGoiBH.filter(item => item != arrGoiBH[index2]);
                }
            }
        }
    }
    if (ma_goi != undefined && ma_goi != null) {
        arrGoiBH = arrGoiBH.where(n => n.ma == ma_goi);
    }
    //ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
    if (callback) {
        callback();
    }
    return arrGoiBH;
}
function hthiTongCong() {
    var tt_nguoi_so_lan_ngay = 0;
    var tt_nguoi_ql_lan_ngay = 0;
    var tt_nguoi_ql_nam = 0;
    var tt_nguoi_tl_dong = 0;
    var tt_nguoi_tg_cho = 0;
    var tt_nguoi_tl_phi = 0;
    var tt_nguoi_phi_bh = 0;
    $('#tableNhapQLoi tr').each(function () {
        var ma = $(this).attr("row-val");
        //tt_nguoi_so_lan_ngay += $("#tableNhapQLoi tr td[col-so-lan-ngay='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-so-lan-ngay='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        //tt_nguoi_ql_lan_ngay += $("#tableNhapQLoi tr td[col-tien-lan-ngay='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-tien-lan-ngay='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        //tt_nguoi_ql_nam += $("#tableNhapQLoi tr td[col-tien-nam='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-tien-nam='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        //tt_nguoi_tl_dong += $("#tableNhapQLoi tr td[col-dong-bh='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-dong-bh='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        //tt_nguoi_tg_cho += $("#tableNhapQLoi tr td[col-so-ngay-cho='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-so-ngay-cho='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        //tt_nguoi_tl_phi += $("#tableNhapQLoi tr td[col-tl-phi='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-tl-phi='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
        tt_nguoi_phi_bh += $("#tableNhapQLoi tr td[col-phi='" + ma + "']").html().trim() == "" ? 0 : parseFloat($("#tableNhapQLoi tr td[col-phi='" + ma + "']").html().trim().replace(/[^0-9]+/g, ''));
    });
    //$("#tt_nguoi_so_lan_ngay").html(ESUtil.formatMoney(tt_nguoi_so_lan_ngay));
    //$("#tt_nguoi_ql_lan_ngay").html(ESUtil.formatMoney(tt_nguoi_ql_lan_ngay));
    //$("#tt_nguoi_ql_nam").html(ESUtil.formatMoney(tt_nguoi_ql_nam));
    //$("#tt_nguoi_tl_dong").html(ESUtil.formatMoney(tt_nguoi_tl_dong));
    //$("#tt_nguoi_tg_cho").html(ESUtil.formatMoney(tt_nguoi_tg_cho));
    //$("#tt_nguoi_tl_phi").html(ESUtil.formatMoney(tt_nguoi_tl_phi));
    $("#tt_nguoi_phi_bh").html(ESUtil.formatMoney(tt_nguoi_phi_bh));
}
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
function rowSelected(el) {
    $('#tblTongPhiTPA tr.rowSelected').removeClass('rowSelected');
    $(el).addClass('rowSelected');

    var obj = {
        ngay_ps: $('#tblTongPhiTPA tr.rowSelected').find('input[name=ngay_ps_item]').val(),
        phi_tpa: $('#tblTongPhiTPA tr.rowSelected').find('input[name=phi_tpa_item]').val(),
        ghi_chu: $('#tblTongPhiTPA tr.rowSelected').find('input[name=ghi_chu_item]').val()
    }
    _frmThemTongPhi.setData(obj);
}
function xemNoiDungFileDoiTuong() {
    var formData = _frmSuaDoiTuong.getFormFileData();
    _commonService.docFileExcel(formData).then(res => {
        var data_excel = res.filter(n => n != res[0]);

        var obj = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
            ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id,
            data: data_excel
        }
        _healthService.GetLisMappingDoiTuong(obj).then(res1 => {
            var arr = [];
            var data_mapping = res1.data_info;
            $.each(data_excel, (index1, item1) => {
                $.each(data_mapping, (index2, item2) => {
                    if (index1 == index2) {
                        var mergerObj = { ...item1, ...item2 };
                        arr.push(mergerObj);
                    }
                });
            });
            ESUtil.genHTML('tblSuaDoiTuongTemplate', 'tblSuaDoiTuong', { data: arr });
        });
    });
}
function getDataTableMappingExcel() {
    var arr = [];
    $("#tblSuaDoiTuong tr").each(function () {
        var obj = {
            gcn: $(this).find('input[name=gcn_map]').getValue(),
            ngay_kt: $(this).find('input[name=ngay_kt]').getValue()
        };
        arr.push(obj);
    });
    return arr;
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
    obj.nv = 'NG';
    _healthService.phanLoaiHangMuc(obj).then(res => {
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
        _notifyService.success("Phân loại hạng mục thành công");
        if (callback) {
            callback(res);
        }
    });
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
function traCuuDoiTuong() {
    $("#inputTimKiemDoiTuong").val("");
    $(".item-sogcn").prop("checked", false);

    getPagingDoiTuong(1);
    _popoverChonDoiTuong.show(() => {
        $("#inputTimKiemDoiTuong").focus();
        return true;
    });
}
function getPagingDoiTuong(trang, callback = undefined) {
    var tim = $("#inputTimKiemDoiTuong").val();
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
    ESUtil.genHTML("dsDoiTuongTemplate", "dsDoiTuong", { data: arr }, () => {
        var ma = $("#inputTimKiemDoiTuong_ma").val();
        if (ma != "") {
            var arr = ma.split("|");
            for (var i = 0; i < arr.length; i++) {
                $("#sogcn_" + arr[i].replace(/\./g, '')).prop("checked", true);
            }
        }
    });
    $("#dsDoiTuong_pagination").html(ESUtil.pagingHTML("getPagingDoiTuong", trang, tong_so_dong, so_dong));
    $("#inputTimKiemDoiTuong").focus();
}
function chonDoiTuong(el) {
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#inputTimKiemDoiTuong_ma").val() != "") {
        arr_ma = $("#inputTimKiemDoiTuong_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#inputTimKiemDoiTuong_ma").val(arr_ma.join("|"));
}
function luuSuaGCN(callback = undefined) {
    if (!_frmSuaGCN.isValid())
        return;
    var obj = _frmSuaGCN.getJsonData();
    _notifyService.confirm("Sửa thông tin giấy chứng nhận sẽ ảnh hưởng đến thông tin hồ sơ bồi thường. Bạn có chắc chắn muốn lưu thông tin GCN này không?", "", () => {
        _notifyService.confirmDelay("Hệ thống sẽ thực hiện cập nhật sau <strong style='color:red;font-weight:bold;'></strong> giây.", 6, () => {
            _healthService.luuSuaGCN(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id
                };
                _healthService.layChiTietHopDong(obj).then(res => {
                    hop_dong_chi_tiet = res;
                    if (callback) {
                        callback(res);
                    }
                });
                _notifyService.success("Cập nhật thông tin GCN thành công");
            });
        });
    });
}
function onChonTatCa(el) {
    var checked = $(el).is(":checked");
    $(".item-sogcn").prop("checked", checked);
    if ($('.item-sogcn').is(':checked')) {
        $.each($("#dsDoiTuong input[data-name=so_id_dt]"), function (index, item) {
            var val = $(item).val();
            arrData.push(val);
        });
        $("#inputTimKiemDoiTuong_ma").val(arrData.join("|"));
    }
}
function getPagingKyThanhToan(trang, callback = undefined) {
    var objTimKiem = _frmNhapKyThanhToan.getJsonData();
    objTimKiem.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
    objTimKiem.so_id = hop_dong_chi_tiet.data_info.hd.so_id_d;
    objTimKiem.so_dong = 8;
    objTimKiem.nv = "NG";
    _healthService.getPagingKyThanhToan(objTimKiem).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tblDanhSachKyThanhToan_template", "tblDanhSachKyThanhToan", { data: res.data_info.data });
        $("#tblDanhSachKyThanhToan_pagination").html(ESUtil.pagingHTML("getPagingKyThanhToan", objTimKiem.trang, res.out_value.tong_so_dong, objTimKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function suaKyThanhToan(so_id, bt, nv) {
    var obj = {
        so_id: so_id,
        bt: bt,
        nv: nv
    };
    _healthService.getDetailKyThanhToan(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info;
        _frmNhapKyThanhToan.setData(data);
        $("#modalDanhSachKyThanhToanFormNhap").removeClass("d-none");
        $("#modalDanhSachKyThanhToanFormLietKe").addClass("d-none");
        $("#btnXoaKyThanhToan").show();
    });
}
function chonDsGoiBH(el = undefined) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#inputSearch_GoiBH").focus();
    $("#inputSearch_GoiBH").val("");
    $("#modalGoiBHDanhSach .dsbv").removeClass("d-none");
    if (val == "" || val == null || val == undefined) {
        $("#modalGoiBHDanhSach .modalGoiBHItem").prop("checked", false);
    }
    if (val != undefined && val != null && val != "") {
        $("#modalGoiBHDanhSach .modalGoiBHItem").prop("checked", false);
        $("#modalGoiBHDanhSach .modalGoiBHItem[value='" + val + "']").prop("checked", true);
    }
    _modalGoiBH.show(el);
}
function onChonGoiBH(el) {
    var target = _modalGoiBH.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        var goi_bh = dsGoiBH.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.ma == val).firstOrDefault();
        $(target).val(goi_bh.ten);
        $(target).attr("data-val", goi_bh.ma);
        $(target).attr("data-id-goi", goi_bh.so_id);
        if ($(target).hasClass("text-danger")) {
            $(target).removeClass("text-danger").addClass("text-primary");
        }
    }
    var so_id = _frmGCNNguoi.getControl("goi_bh").attr("data-id-goi");
    if (so_id == "" || so_id == undefined || so_id == null) {
        _notifyService.error("Chưa có gói bảo hiểm");
        return;
    }
    var obj = {
        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
        so_id: so_id
    };
    _service.all([
        _packageService.layThongTinChiTietTheoMa(obj),
        _packageService.getDkbsGoi(obj)
    ]).then(arrRes => {
        if (arrRes[0].state_info.status !== "OK") {
            _notifyService.error(arrRes[0].state_info.message_body);
            return;
        }
        if (arrRes[1].state_info.status !== "OK") {
            _notifyService.error(arrRes[1].state_info.message_body);
            return;
        }
        ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: arrRes[0].data_info.dk });
        hthiTongCong();

        var dkbs = arrRes[1].data_info.where(n => n.type == 'DKBS');
        if (dkbs.length == 0) {
            ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: [] });
        } else {
            ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: dkbs });
        }
    });
    _modalGoiBH.hide();
}
function xemChiTietquyenLoiGoiBH() {
    var so_id = _frmGCNNguoi.getControl("goi_bh").attr("data-id-goi");
    if (so_id == "" || so_id == undefined || so_id == null) {
        _notifyService.error("Chưa có gói bảo hiểm");
        return;
    }
    _navThongTinQuyenLoiDKBS.showTab("tabThongTinQuyenLoiBaoHiem");
    _modalXemQuyenLoi.show();
}
$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue(new Date().getNgayDauThang());
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _departmentListService.layDsPhongBan(),
        _healthService.getListLHNV(),
        _healthService.getListNhaBH(),
        _categoryPersonService.layDsHMCN(),
        _packageService.LayDanhSachNhomGoiBH()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.phong_ban = arrRes[2].data_info;
        objDanhMuc.lhnv = arrRes[3].data_info;
        objDanhMuc.NhaBH = arrRes[4].data_info;
        objDanhMuc.hang_muc = arrRes[5].data_info;
        objDanhMuc.nhom_goi = arrRes[6].data_info
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmCarContractSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmCarContractSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmHopDong.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh2 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDong.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh2, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");

        _frmGCNNguoi.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        _frmHopDong.getControl("ma_nhom").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        /*_frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");*/
        ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: [] });

        _frmEditKH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh3 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmEditKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh3, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmSaveQLKHSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKHSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmHopDongEdit.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDongEdit.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDongEdit.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");

        _frmSaveQLKHSearch.getControl("loai_kh").setValue('C');
        _frmSaveQLKHSearch.getControl("loai_kh").trigger('select2:select');

        objDanhMuc.hang_muc_tlhd = objDanhMuc.hang_muc.where(n => n.loai == "TLHD");
        _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tlhd, "ten", "ma", "Chọn tài liệu", "");

        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        });
        _frmGCNNguoi.getControl("nhom_goi").setDataSource(objDanhMuc.nhom_goi, "ten", "ma", "Chọn nhóm gói", "");
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChi_nhanh, "ten_tat", "ma", "Chọn đơn vị");
    });
    _frmCarContractSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmCarContractSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    _frmGCNNguoi.getControl("gioi_tinh").addEventChange(val => {
        var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
            //_frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: [] });
            return;
        }
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, undefined, () => {
            ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
        });
        //_frmGCNNguoi.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", "");
        ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: arrGoiBH });
    });
    _frmGCNNguoi.getControl("lhnv").addEventChange(val => {
        var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
            //_frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: [] });
            return;
        }
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, undefined, () => {
            ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
        });
        //_frmGCNNguoi.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", "");
        ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: arrGoiBH });
    });
    _frmGCNNguoi.getControl("nhom_goi").addEventChange(val => {
        var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
            //_frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: [] });
            return;
        }
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, undefined, () => {
            ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
        });
        //_frmGCNNguoi.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", "");
        ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: arrGoiBH });
    });

    _frmSuaGCN.getControl("lhnv").addEventChange(val => {
        var ngay_sinh = $('form[name="frmSuaGCN"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmSuaGCN"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmSuaGCN.getControl("gioi_tinh").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || val == "") {
            _frmSuaGCN.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }
        var arrGoiBH = layGoi(val, gioi_tinh, ngay_sinh, ngay_hl);
        _frmSuaGCN.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", "");
    });
    _frmSuaGCN.getControl("gioi_tinh").addEventChange(val => {
        var ngay_sinh = $('form[name="frmSuaGCN"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmSuaGCN"] input[name="ngay_hl"]').val();
        var gioi_tinh = val;
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();

        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || val == "") {
            _frmSuaGCN.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }
        var so_id = _frmSuaGCN.getControl("so_id").val();
        var so_id_dt = _frmSuaGCN.getControl("so_id_dt").val();
        var doi_tuong_bh = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl);
        if (arrGoiBH.length <= 0 || arrGoiBH.where(n => n.ma == doi_tuong_bh.goi_bh).length <= 0) {
            _frmSuaGCN.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }
        _frmSuaGCN.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", doi_tuong_bh.goi_bh);
    });

    $('form[name="frmSuaGCN"] input[name="ngay_sinh"], form[name="frmSuaGCN"] input[name="ngay_hl"]').change(function () {
        var vl = $('form[name="frmSuaGCN"] input[name="ngay_hl"]').val();
        if (vl != "") {
            var ngay_kt_date = vl.slice(0, 6);
            var ngay_kt_int = parseInt(vl.slice(-4, 10)) + 1;
            $('form[name="frmSuaGCN"] input[name="ngay_kt"]').val(ngay_kt_date.toString() + ngay_kt_int.toString());
        }
        var ngay_sinh = $('form[name="frmSuaGCN"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmSuaGCN"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmSuaGCN.getControl("gioi_tinh").val();
        var lhnv = _frmSuaGCN.getControl("lhnv").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
            _frmSuaGCN.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }

        var so_id = _frmSuaGCN.getControl("so_id").val();
        var so_id_dt = _frmSuaGCN.getControl("so_id_dt").val();
        var doi_tuong_bh = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl);
        if (arrGoiBH.length <= 0 || arrGoiBH.where(n => n.ma == doi_tuong_bh.goi_bh).length <= 0) {
            _frmSuaGCN.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }
        _frmSuaGCN.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", doi_tuong_bh.goi_bh.toString());
    });


    $('form[name="frmGCNNguoi"] input[name="ngay_sinh"], form[name="frmGCNNguoi"] input[name="ngay_hl"]').change(function () {
        var vl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
        if (vl != "") {
            var ngay_kt_date = vl.slice(0, 6);
            var ngay_kt_int = parseInt(vl.slice(-4, 10)) + 1;
            $('form[name="frmGCNNguoi"] input[name="ngay_kt"]').val(ngay_kt_date.toString() + ngay_kt_int.toString());
        }
        var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
        var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
        var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
        var lhnv = _frmGCNNguoi.getControl("lhnv").val();
        if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
            _frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
            return;
        }
        var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, undefined, () => {
            ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
        });
        _frmGCNNguoi.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "ma", "Chọn gói bảo hiểm", "");
    });

    $('form[name="frmHopDong"] input[name="ngay_hl"]').change(function () {
        var vl = $('form[name="frmHopDong"] input[name="ngay_hl"]').val();
        if (vl != "") {
            /*var ngay_kt_int = vl.slice(0, 2);*/
            var thang_kt_int = parseInt(vl.slice(3, 5));
            var nam_kt_int = parseInt(vl.slice(-4, 10)) + 1;
            var ngay_kt_int = new Date(nam_kt_int, thang_kt_int, 0).getDate();
            var thang_kt_string = "";
            if (thang_kt_int < 10) {
                thang_kt_string = '0' + thang_kt_int;
            } else {
                thang_kt_string = thang_kt_int.toString();
            }

            $('form[name="frmHopDong"] input[name="ngay_kt"]').val(ngay_kt_int.toString() + '/' + thang_kt_string + '/' + nam_kt_int.toString());
        }
    });

    //_frmGCNNguoi.getControl("goi_bh").addEventChange(val => {
    //    ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
    //    var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
    //    var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
    //    var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
    //    var lhnv = _frmGCNNguoi.getControl("lhnv").val();
    //    if (ngay_sinh == "" || ngay_hl == "" || gioi_tinh == "" || lhnv == "") {
    //        //_frmGCNNguoi.getControl("goi_bh").setDataSource([], "ten", "ma", "Chọn gói bảo hiểm", "");
    //        ESUtil.genHTML("modalGoiBHDanhSachTemplate", "modalGoiBHDanhSach", { danh_sach: [] });
    //        return;
    //    }
    //    var goi = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, val, () => {
    //        ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: [] });
    //    }).firstOrDefault();

    //    if (goi == null) {
    //        return;
    //    }
    //    var obj = {
    //        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
    //        so_id: goi.so_id
    //    };
    //    _packageService.layThongTinChiTietTheoMa(obj).then(res => {
    //        if (res.state_info.status !== "OK") {
    //            _notifyService.error(res.state_info.message_body);
    //            return;
    //        }
    //        ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: res.data_info.dk });
    //        hthiTongCong();
    //    });
    //});

    $('form[name="frmGCNNguoi"] input[name="gio_hl"]').change(function () {
        $('form[name="frmGCNNguoi"] input[name="gio_kt"]').val($('form[name="frmGCNNguoi"] input[name="gio_hl"]').val());
    });
    _frmHopDong.getControl("kieu_hd").addEventChange(val => {
        if (val == 'B') {
            $("form[name='frmHopDong'] input[name='so_hd_goc']").prop('readonly', false);
        } else {
            $("form[name='frmHopDong'] input[name='so_hd_goc']").prop('readonly', true);
        }
    });
    _frmHopDongEdit.getControl("kieu_hd").addEventChange(val => {
        if (val == 'B') {
            $("form[name='frmHopDongEdit'] input[name='so_hd_goc']").prop('readonly', false);
        } else {
            $("form[name='frmHopDongEdit'] input[name='so_hd_goc']").prop('readonly', true);
        }
    });
    _frmHopDong.getControl("ma_doi_tac_ql").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmHopDong.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        console.log(val);
        _frmHopDong.getControl("ma_nhom").setDataSource(objDanhMuc.lhnv.where(n => n.ma_doi_tac == val), "ten", "ma", "Chọn sản phẩm", "");
    });
    _frmHopDong.getControl("ma_chi_nhanh_ql").addEventChange(val => {
        var ma_doi_tac = _frmHopDong.getControl("ma_doi_tac_ql").val();
        var arrPhongBan = objDanhMuc.phong_ban.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh === val);
        _frmHopDong.getControl("phong").setDataSource(arrPhongBan, "ten", "ma", "Chọn phòng ban", "");
    });
    _frmEditKH.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmEditKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmSaveQLKHSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveQLKHSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");
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
    _frmDTNhaBH.getControl("so_id_dt").addEventChange(val => {
        var objInput = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id,
            so_id_dt: val
        }
        _healthService.LayQuyenLoiGoiBH(objInput).then(res => {
            _frmDTNhaBH.getControl("lhnv").setDataSource(res.data_info, "ten_hien_thi", "lh_nv", "Chọn loại hình nghiệp vụ", "");
        });
    });
    _frmDTNoiBo.getControl("so_id_dt").addEventChange(val => {
        console.log(val);
        var objInput = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id,
            so_id_dt: val
        }
        _healthService.LayQuyenLoiGoiBH(objInput).then(res => {
            _frmDTNoiBo.getControl("lhnv").setDataSource(res.data_info, "ten_hien_thi", "lh_nv", "Chọn loại hình nghiệp vụ", "");
        });
    });
    _frmEditKH.getControl('loai_kh').addEventChange(val => {
        if (val == 'T') {
            $('#cmt_cn').hide();
            $('#mst_cn').show();
            $('form[name=frmEditKH] input[name=cmt]').prop('required', false);
            $('form[name=frmEditKH] input[name=mst]').prop('required', true);
        } else if (val == 'C') {
            $('#cmt_cn').show();
            $('#mst_cn').hide();
            $('form[name=frmEditKH] input[name=mst]').prop('required', false);
            $('form[name=frmEditKH] input[name=cmt]').prop('required', true);
        } else if (val == null || val == "" || val == undefined) {
            $('#cmt_cn').show();
            $('#mst_cn').hide();
        }
    });
    _frmSaveQLKHSearch.getControl("loai_kh").addEventChange(val => {
        if (val == 'T') {
            $('#mst_search').show();
            $('#cmt_search').hide();
            $('form[name=frmSaveQLKHSearch] input[name=cmt]').prop('required', false);
            $('form[name=frmSaveQLKHSearch] input[name=mst]').prop('required', true);
        } else if (val == 'C') {
            $('#mst_search').hide();
            $('#cmt_search').show();
            $('form[name=frmSaveQLKHSearch] input[name=mst]').prop('required', false);
            $('form[name=frmSaveQLKHSearch] input[name=cmt]').prop('required', true);
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

    $("#btnAdd").click(function () {
        $("#btnFooter").hide();
        anHienThemMoiKH("frmCarContractSearch", false);
        getPagingKhachHang(1, res => {
            _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
            _modalCarContractSearch.show();
            _frmCarContractSearch.resetForm();
            _frmCarContractSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmCarContractSearch.getControl("ma_doi_tac").trigger("select2:select");
            setTimeout(() => {
                _gridViewKH.table.redraw(true);
            }, 200);
        });
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
        /*_frmHopDong.getControl('ngay_kt').val(new Date().ddmmyyyy(1));*/

        //if (hop_dong_chi_tiet.data_info.hd != null && hop_dong_chi_tiet.data_info.hd.phong != undefined && hop_dong_chi_tiet.data_info.hd.phong != null && hop_dong_chi_tiet.data_info.hd.phong != "") {
        //    _frmHopDong.getControl('phong').val(hop_dong_chi_tiet.data_info.hd.phong);
        //    _frmHopDong.getControl('phong').trigger('select2:select');
        //}
    });

    $("#btnQuayLai").click(function () {
        _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
    });

    $("#btnSearch").click(function () {
        getPaging(1);
    });

    $("#btnCarSearch").click(function () {
        _dataKH = null;
        getPagingKhachHang(1);
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

    $("#btnSaveQLKH").click(function () {
        if (_frmEditKH.isValid()) {
            var formData = _frmEditKH.getJsonData();
            _customerService.saveKH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _modalEditKH.hide();
                    layChitietHopDong({
                        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                        so_id: hop_dong_chi_tiet.data_info.hd.so_id
                    });
                    _notifyService.success("Lưu thông tin khách hàng thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnSaveQLKHSearch").click(function () {
        if (_frmSaveQLKHSearch.isValid()) {
            var formData = _frmSaveQLKHSearch.getJsonData();
            _customerService.saveKH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin khách hàng thành công.");
                    getPaging(1);
                    anHienThemMoiKH("frmCarContractSearch", false);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteQLKH").click(function () {
        _notifyService.confirmDelete("Chức năng tạm thời không được xóa")
    });

    $('#btnLuuHD').click(function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SAVE';
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }

            _healthService.hd_nhap(formData).then(res => {
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

    $("#btnClose").click(function () {
        $("#inside-modal").esmodal("hide");
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

    $("#btnCloseHD").click(function () {
        $("#modalCarContractSearch").esmodal("hide");
    })

    $('#btnLuuSDBS').click(function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SDBS';
            if (formData.so_id == null || formData.so_id == '') {
                _notifyService.error("Chọn hợp đồng để tạo phụ lục.");
                return;
            }

            if (hop_dong_chi_tiet.data_info.hd.so_hd == formData.so_hd) {
                _notifyService.error("Số hợp đồng phụ lục phải khác số hợp đồng cũ.");
                return;
            }

            formData.kieu_hd = 'B';

            hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDong.getControl('so_id').val(res.out_value.so_id);
                    var formData = _frmHopDong.getJsonData();
                    showWindowEdit(formData);
                    $('#btnSearch').click();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $('#btnMoiGCN').click(function () {
        _frmGCNNguoi.resetForm();
        _frmGCNNguoi.clearErrorMessage();
        _frmGCNNguoi.getControl("loai").setValue("TN");
        _frmGCNNguoi.getControl("ma_doi_tac").setValue(hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
        _frmGCNNguoi.getControl("ma_chi_nhanh").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh);
        _frmGCNNguoi.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmGCNNguoi.getControl("so_id").setValue(hop_dong_chi_tiet.data_info.hd.so_id);
        _frmGCNNguoi.getControl("loai").trigger("select2:select");
        _frmGCNNguoi.getControl("ngay_cap").setValue(new Date().ddmmyyyy());
        $(".item-gcn").removeClass("text-danger");
        xemChiTietGCNNguoi("", "", "");
    });

    $('#btnCopyGCN').click(function () {
        $("#danhDachGCNNguoi .item-gcn").removeClass("text-danger");
        _frmGCNNguoi.getControl('gcn').val('');
        _frmGCNNguoi.getControl('so_id_dt').val('');
    });

    $('#btnLuuGCN').click(function () {
        if (_frmGCNNguoi.isValid()) {
            var obj = _frmGCNNguoi.getJsonData();
            obj.goi_bh = _frmGCNNguoi.getControl("goi_bh").attr("data-val");
            obj.dk = getDataTable();
            _healthService.luuThongTinGCN(obj).then(res => {
                if (res.state_info.status === "OK") {
                    var objChiTiet = {
                        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                        so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                        so_id_dt: res.out_value.so_id_dt
                    };
                    layChitietHopDong(objChiTiet, resCtiet => {
                        xemChiTietGCNNguoi(objChiTiet.ma_doi_tac, objChiTiet.so_id, objChiTiet.so_id_dt);
                    });
                    getPaging(1);
                    _notifyService.success("Lưu thông tin thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $('#btnLuuDOTAI').bind('click', function () {
        var data = new Object();
        data.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        data.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
        data.ma_chi_nhanh = hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh;
        data.phong = hop_dong_chi_tiet.data_info.hd.phong;

        var data_dk = $("#table-data-do-tai").jqxGrid('getrows');

        data.do = data_dk;

        _healthService.dongtai_nhap(data).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công.");
                loadDetailDongTai();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnCheckExcel').bind('click', function () {
        //loadingForm(true);
        setTimeout(function () {
            check_valid_upload('table-data-excel');
            //loadingForm(false);
        }, 50);
    });

    $('#btnUpLoadAnhDGTT').click(function () {
        var obj = {
            ma_doi_tac: _frmGCNNguoi.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNNguoi.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNNguoi.getControl("so_id").val(),
            so_id_dt: _frmGCNNguoi.getControl("so_id_dt").val(),
            type: "image",
            pm: "BH",
            nv: "NG",
            loai: ""
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Không xác định đối tượng bảo hiểm");
            return;
        }
        _uploadService.setParam(obj);
        _uploadService.showPupup();
    });

    $('#btnXoaLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        var obj = {
            ma_doi_tac: _frmGCNNguoi.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNNguoi.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNNguoi.getControl("so_id").val(),
            so_id_dt: _frmGCNNguoi.getControl("so_id_dt").val(),
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
            _healthService.xoaAnh(obj).then(res => {
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

    $('#btnDownLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (arrVal.length === 1) {
            _healthService.layAnhChiTiet({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal[0] }).then(res => {
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
            _healthService.taiFileAnhTonThatZip({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });

    //$("#btnExportHDCN").click(function () {
    //    var formData = _frmHopDong.getJsonData();
    //    formData.ma_mau_in = "ESCS_EXCEL_DS_XE"; // 
    //    _service.getFile("/common/ExportExcelTable", formData).then(res => {
    //        ESUtil.convertBase64ToFile(res, "export_" + new Date().toDateString() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    //    });
    //});

    $("#btnExportHDCN").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql;
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        obj.ma_chi_nhanh = hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql;
        obj.ma_mau_in = "ESCS_EXCEL_HDCN";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
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

    $("#btnXemViTriChupAnh").click(function () {
        var kinh_do = _frmToaDoAnh.getControl("kinh_do").val();
        var vi_do = _frmToaDoAnh.getControl("vi_do").val();
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });

    $("#btnXoaGCN").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hợp đồng bảo hiểm xe ô tô  này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });

    $("#btnLuuDKBS").click(function () {
        var obj = {
            ma_doi_tac: _frmGCNNguoi.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNNguoi.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNNguoi.getControl("so_id").val(),
            so_id_dt: _frmGCNNguoi.getControl("so_id_dt").val(),
            dkbs: getTableDKBS()
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Bạn chưa chọn đối tượng bảo hiểm");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn lưu thông tin điều khoản bổ sung này không?", "", () => {
            _healthService.luuThongTinDKBS(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var strDKBS = "";
                for (var i = 0; i < obj.dkbs.length; i++) {
                    if (strDKBS == "")
                        strDKBS = obj.dkbs[i].ma;
                    else
                        strDKBS += "," + obj.dkbs[i].ma;
                }
                _frmGCNNguoi.getControl("dkbs").val(strDKBS);
                _notifyService.success("Lưu thông tin thành công");
            });
        });
    });

    $("#btnSaveEmail_CC").click(function () {
        if (_frmEmail_CC.isValid()) {
            var arr = [];
            $.each(_frmEmail_CC.getControl("so_id_dt").attr('data-val').split(';'), (index, item) => {
                var obj_arr = {
                    so_id_dt: item
                }
                if (item != '' && item != undefined && item != null) {
                    arr.push(obj_arr);
                }
            });

            var objData = {
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                so_id_hd: hop_dong_chi_tiet.data_info.hd.so_id,
                email_cc: _frmEmail_CC.getControl("email_cc").val(),
                email_bcc: _frmEmail_CC.getControl("email_bcc").val(),
                arr: arr
            };

            _healthService.saveEmail_CC(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin Email CC thành công.");
                    if (arr.length > 0) {
                        xemChiTietGCNNguoi(hop_dong_chi_tiet.data_info.hd.ma_doi_tac, hop_dong_chi_tiet.data_info.hd.so_id, arr[0].so_id_dt);
                    }
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteEmail_CC").click(function () {
        //_notifyService.confirmDelete("Bạn có chắc muốn xóa EMAIL CC này không?", "", val => {
        //    _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        //});
        _frmEmail_CC.getControl('ma_doi_tac').val(hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
        var formData = _frmEmail_CC.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa EMAIL CC này không?",
            "",
            val => {
                _healthService.deleleEmailCC(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Xóa thông tin EMAIL CC thành công.");
                        _frmEmail_CC.resetForm();
                        _frmEmail_CC.clearErrorMessage();
                        $("#inside-modal").esmodal("hide");
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            });
    });

    $("#btnThemMoiKhachHang").click(function () {
        $("#btnFooter").show();
        anHienThemMoiKH("frmSaveQLKHSearch", false);
    });

    $("#btnHuyThemMoiKH").click(function () {
        anHienThemMoiKH("frmCarContractSearch", false);
        $("#btnFooter").hide();
    });

    $("#btnLuuHDEdit").click(function () {
        if (_frmHopDongEdit.isValid()) {
            var formData = _frmHopDongEdit.getJsonData();
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }
            _healthService.hd_nhap(formData).then(res => {
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

    $('#tabDongTai_click').click(function () {
        _navDongtai.showTab("tabNhaBH");
        $('#nbh').trigger('click');
    });

    $('#btnLuuDTNhaBH').click(function () {
        if (_frmDTNhaBH.isValid()) {
            if (_frmDTNhaBH.getControl('tl_dong').val() == "" && _frmDTNhaBH.getControl('tl_tai_cd').val() == "" && _frmDTNhaBH.getControl('tl_tai_tt').val() == "") {
                _notifyService.error("Bạn không được để trống cả 3 trường tỷ lệ đồng / tái");
                return;
            }
            var formData = _frmDTNhaBH.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            formData.nv = 'NG';
            formData.so_id_dt = _frmDTNhaBH.getControl('so_id_dt').attr('data-val');
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NGOAI';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _healthService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _healthService.getListDongtai(objInput).then(res => {
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
            formData.nv = 'NG';
            formData.so_id_dt = _frmDTNoiBo.getControl('so_id_dt').attr('data-val');
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NOIBO';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _healthService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _healthService.getListDongtai(objInput).then(res => {
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

    $('#btnXoaDTNhaBH').click(function () {
        var objInput = _frmDTNhaBH.getJsonData();
        objInput.so_id_dt = _frmDTNhaBH.getControl('so_id_dt').attr('data-val');
        objInput.nv = 'NG';
        objInput.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        objInput.loai_dong = 'NGOAI';
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa không?", 1, val => {
            _healthService.XoaDongTai(objInput).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                } else {
                    _notifyService.success("Xóa đồng tái thành công.");
                    var dt = {
                        ma_doi_tac: objInput.ma_doi_tac,
                        so_id: objInput.so_id,
                        nv: objInput.nv
                    }
                    _healthService.getListDongtai(dt).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                }
            });
        });
    });

    $('#btnXoaDTNoiBo').click(function () {
        var objInput = _frmDTNoiBo.getJsonData();
        objInput.so_id_dt = _frmDTNoiBo.getControl('so_id_dt').attr('data-val');
        objInput.nv = 'NG';
        objInput.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        objInput.loai_dong = 'NOIBO';
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa đồng tái này không?", 1, val => {
            _healthService.XoaDongTai(objInput).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                } else {
                    var dt = {
                        ma_doi_tac: objInput.ma_doi_tac,
                        so_id: objInput.so_id,
                        nv: objInput.nv
                    }
                    _healthService.getListDongtai(dt).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    _notifyService.success("Xóa đồng tái thành công.");
                }
            });
        });
    });

    $('#btnMoiDTNhaBH').click(function () {
        _frmDTNhaBH.resetForm();
        _frmDTNhaBH.clearErrorMessage();
        _frmDTNhaBH.getControl('so_id_dt').attr('data-val', '');
        Xem_chi_tiet_dong_tai("", "", "", "", "");
        _frmDTNhaBH.getControl('lhnv').setDataSource([], 'ten', 'lh_nv', 'Chọn loại hình nghiệp vụ', '');
    });

    $('#btnMoiDTNoiBo').click(function () {
        _frmDTNoiBo.resetForm();
        _frmDTNoiBo.clearErrorMessage();
        _frmDTNoiBo.getControl('so_id_dt').attr('data-val', '');
        Xem_chi_tiet_dong_tai("", "", "", "", "");
        _frmDTNoiBo.getControl('lhnv').setDataSource([], 'ten', 'lh_nv', 'Chọn loại hình nghiệp vụ', '');
    });

    $("#inputSearchNguoi").keyup(function () {
        setTimeout(() => {
            $('#danhDachGCNNguoi').html('');
            getPagingGCNTabLeft(1);
            //var val = $(this).val().toLowerCase();
            //if (val == "") {
            //    $("#danhDachGCNNguoi tr[data-search]").show();
            //    return;
            //}
            //$("#danhDachGCNNguoi tr[data-search]").hide();
            //$("#danhDachGCNNguoi tr[data-search*='" + val + "']").show();
        }, 500);
    });

    $("#btnXemThongTinSDBS").click(function () {
        ESUtil.genHTML("SDBS_template", "tableSDBS", { dk: hop_dong_chi_tiet.data_info.hd_sdbs });
        _modalSDBS.show();
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

    $('#btnImportDSNguoi').click(function () {
        $("#table_import_excel thead tr").html('');
        $("#table_import_excel tbody").html('');
        _modalUploadExcel.show();
    });

    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });

    $('#btnSaveExcel').click(function () {
        var obj = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
            ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id,
            data: objData,
        };
        if (obj.data == null) {
            return;
        }
        _healthService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                layChitietHopDong(hop_dong_chi_tiet.data_info.hd);
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnNewExcel').click(function () {
        _UploadExcelService.refresh();
    });

    $('#btnTongPhi').click(function () {
        var obj = {
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id
        }
        _frmThemTongPhi.setData(obj);

        _healthService.GetTongPhiTpa(obj).then(res => {
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
            _healthService.tongPhiTpaNhap(formData).then(res => {
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
        if (obj.ngay_ps == "" || obj.ngay_ps == null) {
            _notifyService.error("Chưa có ngày phát sinh!");
            return;
        }
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

    $('#btnEditHDCN').click(function () {
        ESUtil.genHTML('tblSuaDoiTuongTemplate', 'tblSuaDoiTuong', { data: [] });
        _modalSuaDoiTuong.show();
    });

    $('#btnDowmloadTemplate').click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        obj.ma_chi_nhanh = hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh;
        obj.ma_mau_in = "ESCS_EXCEL_EDIT_DTHDBH";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    $('#btnUploadDoiTuong').click(function () {
        $("#frmImportExcelFileDoiTuong").click();
    });

    $('#btnLuuDoiTuong').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn cập nhật đối tượng hợp đồng không?", 1, val => {
            var obj = {
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                data: getDataTableMappingExcel()
            }
            if (obj.data.length == 0) {
                _notifyService.error('Chưa có dữ liệu');
                return;
            }
            _healthService.UpdateMappingDoiTuong(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layChitietHopDong({
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id
                });
                _modalSuaDoiTuong.hide();
                _notifyService.success("Cập nhật thành công.");
            });
        });
    });

    $("#btnLuuHMTT").click(function () {
        luuPhanLoaiHangMuc();
    });

    $("#btnLuuDongHMTT").click(function () {
        luuPhanLoaiHangMuc(res => {
            _modalThemHMTT.hide();
        });
    });

    $('#btnChonGCN').click(function () {
        if (_popoverDsGCN.target == 'NB') {
            var so_id_dt = $("#inputTimKiemGCN_ma").val();
            if (so_id_dt == "") {
                _notifyService.error("Bạn chưa chọn gcn nào");
                return;
            }
            ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;
            _frmDTNoiBo.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNoiBo.getControl("so_id_dt").val(ten);
            var objInput = {
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                so_id_dt: so_id_dt
            }
            _healthService.LayQuyenLoiGoiBH(objInput).then(res => {
                _frmDTNoiBo.getControl("lhnv").setDataSource(res.data_info, "ten_hien_thi", "lh_nv", "Chọn loại hình nghiệp vụ", "");
            });
        } else if (_popoverDsGCN.target == 'NBH') {
            var so_id_dt = $("#inputTimKiemGCN_ma").val();
            if (so_id_dt == "") {
                _notifyService.error("Bạn chưa chọn gcn nào");
                return;
            }
            ten = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == so_id_dt).firstOrDefault().ten;
            _frmDTNhaBH.getControl("so_id_dt").attr('data-val', so_id_dt);
            _frmDTNhaBH.getControl("so_id_dt").val(ten);
            var objInput = {
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                so_id_dt: so_id_dt
            }
            _healthService.LayQuyenLoiGoiBH(objInput).then(res => {
                _frmDTNhaBH.getControl("lhnv").setDataSource(res.data_info, "ten_hien_thi", "lh_nv", "Chọn loại hình nghiệp vụ", "");
            });
        }
        _popoverDsGCN.hide();
    });

    $('#divDanhDachGCNNguoi').scroll(function () {
        let div = $(this).get(0);
        if (Math.round(div.scrollTop + div.clientHeight) >= div.scrollHeight - 1) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingGCNTabLeft(trang);
        }
    });

    $("#btnSuaGCN").click(function () {
        var ma_doi_tac = _frmGCNNguoi.getControl("ma_doi_tac").val();
        var so_id = _frmGCNNguoi.getControl("so_id").val();
        var so_id_dt = _frmGCNNguoi.getControl("so_id_dt").val();
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

    $("#btnLuuSuaGCN").click(function () {
        luuSuaGCN(res => {
            var obj = _frmSuaGCN.getJsonData();
            xemChiTietGCNNguoi(hop_dong_chi_tiet.data_info.hd.ma_doi_tac, obj.so_id, obj.so_id_dt);
        });
    });

    $("#btnLuuDongSuaGCN").click(function () {
        luuSuaGCN(res => {
            var obj = _frmSuaGCN.getJsonData();
            xemChiTietGCNNguoi(hop_dong_chi_tiet.data_info.hd.ma_doi_tac, obj.so_id, obj.so_id_dt);
            _modalSuaGCN.hide();
        });
    });

    $("#btnDongChonGCN").click(function () {
        _popoverDsGCN.hide();
    });

    $("#btnLuuChonDoiTuong").click(function () {
        var ma = $("#inputTimKiemDoiTuong_ma").val();
        if (ma == "") {
            _frmEmail_CC.getControl("so_id_dt").val("");
            _notifyService.error("Bạn chưa chọn đối tượng");
            return;
        }
        var arr = ma.split("|");
        var so_id_dt = "";
        var ten = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                so_id_dt += arr[i];
                ten += JSON.parse(JSON.stringify(hop_dong_chi_tiet.data_info.gcn)).where(n => n.so_id_dt == arr[i]).firstOrDefault().ten;  // ten_v
            } else {
                so_id_dt += ";" + arr[i];
                ten += "; " + JSON.parse(JSON.stringify(hop_dong_chi_tiet.data_info.gcn)).where(n => n.so_id_dt == arr[i]).firstOrDefault().ten;  // ten_v
            }
        }
        _frmEmail_CC.getControl("so_id_dt").attr('data-val', so_id_dt);
        _frmEmail_CC.getControl("so_id_dt").val(ten);

        _popoverChonDoiTuong.hide();
    });
    $("#btnDongChonDoiTuong").click(function () {
        _popoverChonDoiTuong.hide();
    });
    $("#inputTimKiemDoiTuong").click(function () {
        $(this).focus();
    });

    $("#btnThemDanhMucPhongBan").click(function () {
        _frmLuuThongTinDoiTacPhong.clearErrorMessage();
        _frmLuuThongTinDoiTacPhong.resetForm();
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        if (ESCS_MA_DOI_TAC_DUY_NHAT == '') {
            _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        }
        _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("ma").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("trang_thai").setValue(1);
        _modalNhapMaDoiTacPhong.show();
    });
    $("#btnLuuThongTinDoiTacPhong").click(function () {
        if (_frmLuuThongTinDoiTacPhong.isValid()) {
            var formData = _frmLuuThongTinDoiTacPhong.getJsonData();
            _departmentListService.luuPhongBan(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin phòng ban thành công.");
                    getPaging(1);
                    _modalNhapMaDoiTacPhong.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnExportDSHD").click(function () {
        var _serviceTmpHome = new Service();
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_HDCN";
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
    $('#btnHuyDuyetHD').click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy duyệt hợp đồng này không?", "", () => {
            var obj = {
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                so_id: hop_dong_chi_tiet.data_info.hd.so_id
            }
            _healthService.huyDuyetHD(obj).then(res => {
                if (res.state_info.status !== 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _modalEditHD.hide();
                getPaging(1);
                _notifyService.success("Hủy duyệt hợp đồng thành công.");
            });
        });
    });
    $('#btnXemThanhToanPhi').click(function () {
        _frmNhapKyThanhToan.resetForm();
        _frmNhapKyThanhToan.clearErrorMessage();
        getPagingKyThanhToan(1, res => {
            $("#modalDanhSachKyThanhToanFormNhap").addClass("d-none");
            $("#modalDanhSachKyThanhToanFormLietKe").removeClass("d-none");
            _modalNhapKyThanhToan.show();
        });
    });
    $("#btnThemMoiKyThanhToan").click(function () {
        _frmNhapKyThanhToan.resetForm();
        _frmNhapKyThanhToan.clearErrorMessage();
        $("#modalDanhSachKyThanhToanFormNhap").removeClass("d-none");
        $("#modalDanhSachKyThanhToanFormLietKe").addClass("d-none");
        $("#btnXoaKyThanhToan").hide();
    });
    $("#btnQuayLaiDSKyThanhToan").click(function () {
        getPagingKyThanhToan(1, res => {
            $("#modalDanhSachKyThanhToanFormNhap").addClass("d-none");
            $("#modalDanhSachKyThanhToanFormLietKe").removeClass("d-none");
        });
    });
    $("#btnLuuKyThanhToan").click(function () {
        if (_frmNhapKyThanhToan.isValid()) {
            var obj = _frmNhapKyThanhToan.getJsonData();
            obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id_d;
            obj.nv = "NG";
            _healthService.nhapThongTinKyThanhToan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layChitietHopDong({
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id
                });
                _notifyService.success("Lưu thông tin kỳ thanh toán thành công");
                getPagingKyThanhToan(1, res => {
                    $("#modalDanhSachKyThanhToanFormNhap").addClass("d-none");
                    $("#modalDanhSachKyThanhToanFormLietKe").removeClass("d-none");
                });
            });
        }
    });
    $("#btnXoaKyThanhToan").click(function () {
        var obj = _frmNhapKyThanhToan.getJsonData();
        obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id_d;
        obj.nv = "NG";
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin kỳ thanh toán này không?", "", val => {
            _healthService.xoaThongTinKyThanhToan(obj).then(res => {
                if (res.state_info.status === "OK") {
                    layChitietHopDong({
                        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                        so_id: hop_dong_chi_tiet.data_info.hd.so_id
                    });
                    _notifyService.success("Xóa thông tin thành công");
                    getPagingKyThanhToan(1, res => {
                        $("#modalDanhSachKyThanhToanFormNhap").addClass("d-none");
                        $("#modalDanhSachKyThanhToanFormLietKe").removeClass("d-none");
                    });
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#inputSearch_GoiBH").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalGoiBHDanhSach .dsbv").removeClass("d-none");
            return;
        }
        $("#modalGoiBHDanhSach .dsbv").addClass("d-none");
        var source = [];
        if (tim != "") {
            var ngay_sinh = $('form[name="frmGCNNguoi"] input[name="ngay_sinh"]').val();
            var ngay_hl = $('form[name="frmGCNNguoi"] input[name="ngay_hl"]').val();
            var gioi_tinh = _frmGCNNguoi.getControl("gioi_tinh").val();
            var lhnv = _frmGCNNguoi.getControl("lhnv").val();
            var arrGoiBH = layGoi(lhnv, gioi_tinh, ngay_sinh, ngay_hl, undefined);
            if (arrGoiBH.length> 0) {
                source = arrGoiBH.where(n => n.ten.toLowerCase().includes(tim));
            }
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalGoiBHDanhSach #dsgoibh_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnXemToanBoNDBH").click(function () {
        getPagingDanhSachNDBH(1, res => {
            _modalXemToanBoNDBH.show();
            setTimeout(() => {
                _gridViewDanhSachNDBH.table.redraw(true);
            }, 200);
        });
    });
    $("#btnSearchDanhSachNDBH").click(function () {
        getPagingDanhSachNDBH(1);
    });
});