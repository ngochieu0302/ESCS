const THEM_MOI = 1;
const CAP_NHAT = 2;
var TRANG_THAI = THEM_MOI;
var ngay_tt = null;
var _service = new Service();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _departmentListService = new DepartmentListService();
var _functionService = new FunctionService();
var _userManagementService = new UserManagementService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _commonService = new CommonService();
var _businessCodeService = new BusinessCodeService();
var _productHumanService = new ProductHumanService();
var _titleService = new TitleService();
var _UploadExcelService = new UploadExcelService();

var objPhanCapCT = {};
var arrDonViQuanLyNSD = [];
var arrDsQuyenNSD = [];
var obj_nhom_quyen = {};

var _notifyService = new NotifyService();
var dateNow = new Date().ddmmyyyy();
var dateNowKT = new Date().ddmmyyyy(3);
var objDanhMuc = {
    loai_tk: [
        { ma: "S", ten: "Quản trị hệ thống" },
        { ma: "A", ten: "Quản trị người dùng" },
        { ma: "U", ten: "Người sử dụng" }
    ]
};
var objMien = [
    { ma: "B", ten: "Miền Bắc" },
    { ma: "T", ten: "Miền Trung" },
    { ma: "N", ten: "Miền Nam" },
]
var objDanhMucDonViHanhChinh = [];
var nguoi_dung = {};
var arrTinh = [];
var arrQuanHuyen = [];
var ds_giam_dinh = [];
var boi_thuong = [];
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", headerSort: false, hozAlign: "center" },
    { field: "ma", title: "Tài khoản", width: "12%", headerSort: false },
    { field: "ten", title: "Tên người dùng", width: "12%", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false, hozAlign: "center" },
    { field: "dthoai", title: "Điện thoại", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_dtac", title: "Đơn vị", width: "12%", headerSort: false, hozAlign: "center" },
    { field: "ten_cnhanh", title: "Chi nhánh", width: "18%", headerSort: false, hozAlign: "center" },
    { field: "ten_phong", title: "Phòng", width: "19%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "12%", headerSort: false, hozAlign: "center", formatter: "html" },
];

var _frmLuuThongTinNguoiDung = new FormService("frmLuuThongTinNguoiDung");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmPhanDiaBanGiamDinh = new FormService("frmPhanDiaBanGiamDinh");
var _frmThemNhomQuyenChiTiet = new FormService("frmThemNhomQuyenChiTiet");
var _btnNhapThongTinNguoiDung = new ButtonService("btnNhapThongTinNguoiDung");
var _btnLuuThongTinNguoiDung = new ButtonService("btnLuuThongTinNguoiDung");
var _gridViewNguoiDung = new GridViewService("gridViewNguoiDung", configColumn, getPaging, rowClick);
var _btnPhanChiaDiaBan = new ButtonService("btnPhanChiaDiaBan");
var _modalDiaBanGiamDinh = new ModalService("modalDiaBanGiamDinh");
var _modalThemNhomQuyenChiTiet = new ModalService("modalThemNhomQuyenChiTiet");
var _btnLuuPhanDiaBan = new ButtonService("btnLuuPhanDiaBan");
var _btnTimKiem = new ButtonService("btnTimKiem");
var _btnPhanCap = new ButtonService("btnPhanCap");
var _modalPhanCapGiamDinhBoiThuong = new ModalService("modalPhanCapGiamDinhBoiThuong");
var _frmPhanCapGiamDinhBoiThuong = new FormService("frmPhanCapGiamDinhBoiThuong");
var _btnLuuPhanCapGiamDinhBoiThuong = new ButtonService("btnLuuPhanCapGiamDinhBoiThuong");
var _btnThemMoiPhanCapBoiThuong = new ButtonService("btnThemMoiPhanCapBoiThuong");
var _btnThemMoiPhanCapGiamDinh = new ButtonService("btnThemMoiPhanCapGiamDinh");
var _modalThemPhanCap = new ModalService("modalThemPhanCap");
var _frmThemPhanCap = new FormService("frmThemPhanCap");
var _modalThemNhomPCChiTiet = new ModalService("modalThemNhomPCChiTiet");
var _frmThemNhomPCChiTiet = new FormService("frmThemNhomPCChiTiet");
var _modalDanhSachNsdPhanCap = new ModalDragService("modalDanhSachNsdPhanCap", undefined, "bottom bottom-left");
var _frmThemPhanCapNhomPC = new FormService("frmThemPhanCapNhomPC");
var _modalThemPhanCapNhomPC = new ModalService("modalThemPhanCapNhomPC");
var _modalUploadExcel = new ModalService("modalUploadExcel");

function showModal(ishow = true) {
    if (ishow) {
        $("#modalNhapNguoiDung").esmodal("show");
    }
    else {
        $("#modalNhapNguoiDung").esmodal("hide");
    }
}
function chuanHoaCNhanhDoiTac(arrChiNhanh) {
    var arrDoiTac = [];
    for (var i = 0; i < arrChiNhanh.length; i++) {
        if (arrDoiTac.where(n => n.ma_doi_tac === arrChiNhanh[i].ma_doi_tac).length <= 0) {
            arrDoiTac.push({
                ma_doi_tac: arrChiNhanh[i].ma_doi_tac,
                ma_doi_tac_ql: arrChiNhanh[i].ma_doi_tac_ql,
                ma_chi_nhanh: arrChiNhanh[i].ma,
                ma_chi_nhanh_ql: arrChiNhanh[i].ma,
                ten_dtac: arrChiNhanh[i].ten_dtac,
                ds_cnhanh: [],
                chon: false
            });
        }
    }
    for (var idtac = 0; idtac < arrDoiTac.length; idtac++) {
        var ds_cnhanh = arrChiNhanh.where(n => n.ma_doi_tac === arrDoiTac[idtac].ma_doi_tac);
        arrDoiTac[idtac].ds_cnhanh = ds_cnhanh;
        if (ds_cnhanh.where(n => n.chon).length > 0) {
            arrDoiTac[idtac].chon = true;
        }
    }
    return arrDoiTac;
}
function onChangeTatCa(el) {
    $(".input-dvi-qly").prop("checked", false);
    if ($(el).is(":checked")) {
        $(".input-dvi-qly").prop("checked", true);
    }
}
function onChangeCNhanh(el) {
    $("#chon_tat_ca_dvi").prop("checked", false);
    var dem = $("#tableDonViQuanLy .input-dvi-qly").length;
    var dem_checked = $("#tableDonViQuanLy .input-dvi-qly:checked").length;
    if (dem == dem_checked) {
        $("#chon_tat_ca_dvi").prop("checked", true);
    }
}
function onChangeDtac(el) {
    var ma_dtac = $(el).val();
    $(".ql_cnhanh[dvi-ma='" + ma_dtac + "']").prop("checked", false);
    if ($(el).is(":checked"))
        $(".ql_cnhanh[dvi-ma='" + ma_dtac + "']").prop("checked", true);
    $("#chon_tat_ca_cnhanh").prop("checked", false);
    if ($(".ql_cnhanh").length === $(".ql_cnhanh:checked").length)
        $("#chon_tat_ca_cnhanh").prop("checked", true);
    $("#chon_tat_ca_dvi").prop("checked", false);
    if ($(".ql_dtac").length === $(".ql_dtac:checked").length)
        $("#chon_tat_ca_dvi").prop("checked", true);
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    $('#menuTab a[href="#phan_quyen_chuc_nang"]').tab('show');
    _userManagementService.layThongTinChiTiet(data).then(res => {
        _frmLuuThongTinNguoiDung.resetForm();
        _frmLuuThongTinNguoiDung.clearErrorMessage();

        TRANG_THAI = CAP_NHAT;
        row.select();
        var objData = res.data_info.nsd;
        $("#modal-user-log").html("(" + objData.nsd_hthi + ")");
        $("#btnKhoaTaiKhoan").hide();
        $("#btnXoaTaiKhoan").hide();
        $("#btnMoTaiKhoan").hide();
        if (objData.trang_thai == "D") {
            $("#btnKhoaTaiKhoan").show();
            $("#btnXoaTaiKhoan").show();
        }
        if (objData.trang_thai == "K") {
            $("#btnMoTaiKhoan").show();
            $("#btnXoaTaiKhoan").show();
        }
        bindLoaiTaiKhoan(objData.loai_tk);
        var dsDoiTacQuanLy = JSON.parse(JSON.stringify(objDanhMuc.dtac_chi_nhanh));// objDanhMuc.dtac_chi_nhanh.clone();
        var dsQuyen = JSON.parse(JSON.stringify(objDanhMuc.quyen));//objDanhMuc.quyen.clone();
        for (var i = 0; i < dsQuyen.length; i++) {
            dsQuyen[i].xem = false;
            dsQuyen[i].nhap = false;
            for (var j = 0; j < res.data_info.quyen.length; j++) {
                if (dsQuyen[i].nhom_chuc_nang === res.data_info.quyen[j].nhom_chuc_nang) {
                    if (res.data_info.quyen[j].nhap === "1") {
                        dsQuyen[i].nhap = true;
                    }
                    if (res.data_info.quyen[j].xem === "1") {
                        dsQuyen[i].xem = true;
                    }
                }
            }
        }
        var count = dsQuyen.length;
        var count_nhap = dsQuyen.where(n => n.nhap).length;
        var count_xem = dsQuyen.where(n => n.xem).length;
        if (count === count_nhap)
            $("#nhap_tat_ca").prop("checked", true);
        else
            $("#nhap_tat_ca").prop("checked", false);

        if (count === count_xem)
            $("#xem_tat_ca").prop("checked", true);
        else
            $("#xem_tat_ca").prop("checked", false);
        if (objData.loai_tk != "S") {
            dsQuyen = dsQuyen.where(n => n.nhom_chuc_nang != "ESCS");
        }
        arrDsQuyenNSD = dsQuyen;
        ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: dsQuyen });
        for (var i = 0; i < dsDoiTacQuanLy.length; i++) {
            dsDoiTacQuanLy[i]["ma_doi_tac_ql"] = dsDoiTacQuanLy[i].ma_doi_tac;
            dsDoiTacQuanLy[i]["ma_chi_nhanh_ql"] = dsDoiTacQuanLy[i].ma;
            dsDoiTacQuanLy[i]["chon"] = false;
            for (var j = 0; j < res.data_info.quanly.length; j++) {
                if (dsDoiTacQuanLy[i].ma_doi_tac_ql === res.data_info.quanly[j].ma_doi_tac_ql
                    && dsDoiTacQuanLy[i].ma_chi_nhanh_ql === res.data_info.quanly[j].ma_chi_nhanh_ql) {
                    dsDoiTacQuanLy[i]["chon"] = true;
                }
            }
        }
        arrDonViQuanLyNSD = res.data_info.quanly;
        bindTableDonViQuanLy(res.data_info.quanly, objData.ma_doi_tac, objData.loai_tk);
        $(".tbtn").click(function () {
            $(this).parents(".custom-table").find(".toggler1").removeClass("toggler1");
            $(this).parents("tbody").find(".toggler").addClass("toggler1");
            $(this).parents(".custom-table").find("i").removeClass("fa-chevron-up").addClass("fa-chevron-down");
            $(this).find("i").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        });

        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").setValue(objData.ma_doi_tac);
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setValue(objData.ma_chi_nhanh);
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").trigger("select2:select");
        _frmLuuThongTinNguoiDung.setData(objData);
        _frmLuuThongTinNguoiDung.getControl("mat_khau").setValue("");
        nguoi_dung = objData;
        $("#rowPhanQuyen").show();
        $("#rowPhanCap").hide();
        _frmLuuThongTinNguoiDung.getControl("ma").readOnly();
        $("#divMatKhau label").removeClass("_required");
        $("#divMatKhau input[name='mat_khau']").removeAttr("required", "");
        _userManagementService.layNhomQuyen().then(res_nhom_quyen => {
            obj_nhom_quyen = res_nhom_quyen.data_info;
            _frmLuuThongTinNguoiDung.getControl('nhom_quyen').setDataSource(obj_nhom_quyen.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
        });
        showModal();
    });
}
function bindLoaiTaiKhoan(loai_tk) {
    //Nếu người đăng nhập là supper admin thì có thể chỉnh sửa tất cả
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "S") {
        _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource(objDanhMuc.loai_tk, "ten", "ma", "Chọn loại tài khoản", "");
    }
    //Nếu người đăng nhập là admin thì không được chỉnh sửa loại tài khoản của supper admin
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "A") {
        if (loai_tk == "S") {
            _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly();
            _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource(objDanhMuc.loai_tk, "ten", "ma", "Chọn loại tài khoản", "");
        }
        else {
            _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly(false);
            _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource([
                { ma: "A", ten: "Quản trị người dùng" },
                { ma: "U", ten: "Người sử dụng" }
            ], "ten", "ma", "Chọn loại tài khoản", "");
        }

    }
    //Nếu người đăng nhập là người dùng
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "U") {
        _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly();
        _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource(objDanhMuc.loai_tk, "ten", "ma", "Chọn loại tài khoản", "");
    }
}
function bindLoaiTaiKhoanThemMoi() {
    //Nếu người đăng nhập là supper admin thì có thể chỉnh sửa tất cả
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "S") {
        _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource(objDanhMuc.loai_tk, "ten", "ma", "Chọn loại tài khoản", "");
    }
    //Nếu người đăng nhập là admin thì không được chỉnh sửa loại tài khoản của supper admin
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "A") {
        _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource([
            { ma: "A", ten: "Quản trị người dùng" },
            { ma: "U", ten: "Người sử dụng" }
        ], "ten", "ma", "Chọn loại tài khoản", "");
    }
    //Nếu người đăng nhập là người dùng
    if (OBJ_ACCOUNT_LOGIN.loai_tk == "U") {
        _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource([
            { ma: "U", ten: "Người sử dụng" }
        ], "ten", "ma", "Chọn loại tài khoản", "");
    }
}
function onNhapTatCaChange(el) {
    if ($(el).is(":checked"))
        $(".nhap-item").prop("checked", true);
    else
        $(".nhap-item").prop("checked", false);
}
function onXemTatCaChange(el) {
    if ($(el).is(":checked"))
        $(".xem-item").prop("checked", true);
    else
        $(".xem-item").prop("checked", false);
}
function onNhapChange(el) {
    var count = $(".nhap-item").length;
    var count_nhap = $(".nhap-item:checked").length;
    if (count === count_nhap)
        $("#nhap_tat_ca").prop("checked", true);
    else
        $("#nhap_tat_ca").prop("checked", false);
}
function onXemChange(el) {
    var count = $(".xem-item").length;
    var count_xem = $(".xem-item:checked").length;
    if (count === count_xem)
        $("#xem_tat_ca").prop("checked", true);
    else
        $("#xem_tat_ca").prop("checked", false);
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _userManagementService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewNguoiDung.setDataSource(res, trang);
    });
}
function onSearchTinhThanh(el) {

    var searchText = $(el).val();
    var searchTextUpper = searchText.toUpperCase();
    if (searchText === "") {
        $(".divItemTinhThanh").show();
    }
    else {
        $(".divItemTinhThanh").hide();
        $(".divItemTinhThanh[data-text*='" + searchTextUpper + "']").show();
    }
}
function onSearchQuanHuyen(el) {
    var searchText = $(el).val();
    var searchTextUpper = searchText.toUpperCase();
    if (searchText === "") {
        $(".divItemQuanHuyen").show();
    }
    else {
        $(".divItemQuanHuyen").hide();
        $(".divItemQuanHuyen[data-text*='" + searchTextUpper + "']").show();
    }
}
function onChangeTinhThanh() {
    $("#input_tkiem_quan_huyen").val("");
    arrTinh = [];
    $('.dbgd_tinh_thanh').each(function () {
        if (this.checked) {
            arrTinh.push($(this).val())
        }
    });
    arrQuanHuyen = [];
    $('.dbgd_quan_huyen').each(function () {
        if (this.checked) {
            arrQuanHuyen.push($(this).val())
        }
    });

    bindQuanHuyen(arrTinh, arrQuanHuyen);
    var count = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "").length;
    //var fill = arr.length;
    //$("#tinh_thanh_tat_ca").prop("checked", count === fill);
}
function onChangeQuanHuyen() {
    var count = $('.dbgd_quan_huyen').length;
    var fill = $('.dbgd_quan_huyen:checked').length;
    $("#quan_huyen_tat_ca").prop("checked", count === fill);
    arrQuanHuyen = [];
    $('.dbgd_quan_huyen').each(function () {
        if (this.checked) {
            arrQuanHuyen.push($(this).val())
        }
    });
}
function bindTinhThanh(arr_checked = []) {
    var tinhThanh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "").clone();
    for (var i = 0; i < tinhThanh.length; i++) {
        tinhThanh[i].chon = false;
    }
    if (arr_checked !== undefined && arr_checked.length > 0) {
        for (var i = 0; i < arr_checked.length; i++) {
            for (var j = 0; j < tinhThanh.length; j++) {
                if (arr_checked[i] === tinhThanh[j].ma_tinh) {
                    tinhThanh[j].chon = true;
                    continue;
                }
            }
        }
    }
    $("#ds_tinh_thanh").html("");
    ESUtil.genHTML("dsTinhThanhTemplate", "ds_tinh_thanh", { ds_tinh_thanh: tinhThanh });
}
function bindQuanHuyen(arr_ma_tinh, arr_checked = []) {
    var quan_huyen = [];
    for (var i = 0; i < arr_ma_tinh.length; i++) {
        ma_tinh = arr_ma_tinh[i];
        var tmp = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === ma_tinh);
        for (var j = 0; j < tmp.length; j++) {
            tmp[j].chon = false;
        }
        Array.prototype.push.apply(quan_huyen, tmp);
    }
    if (arr_checked !== undefined && arr_checked !== null && arr_checked.length > 0) {
        for (var j = 0; j < quan_huyen.length; j++) {
            quan_huyen[j].chon = false;
            var count = arr_checked.where(n => n === quan_huyen[j].ma_tinh + "." + quan_huyen[j].ma_quan).length;
            if (count > 0) {
                quan_huyen[j].chon = true;
            }
        }
    }
    quan_huyen.sort(function (a, b) {
        if (a.ma_tinh < b.ma_tinh) return -1;
        if (a.ma_tinh > b.ma_tinh) return 1;
        return 0;
    });
    $("#ds_quan_huyen").html("");
    ESUtil.genHTML("dsQuanHuyenTemplate", "ds_quan_huyen", { ds_quan_huyen: quan_huyen });
}
function chonTatCaTinhThanh(el) {
    $(".dbgd_tinh_thanh").prop("checked", $(el).is(":checked"));
    var tinhThanh = [];
    if ($(el).is(":checked")) {
        tinhThanh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "").select(n => n.ma_tinh);
    }
    bindQuanHuyen(tinhThanh);
}
function chonTatCaQuanHuyen(el) {
    $(".dbgd_quan_huyen").prop("checked", $(el).is(":checked"));
}
function addIndex(index) {
    $("#index_hang_muc").val(index);
}
function timKiemHangMucXe(el, classItem) {
    var searchText = $("#timKiemHangMuc").val();
    var searchTextUpper = searchText.toUpperCase();
    var arr = objDanhMuc.hang_muc.where(n => n.ten.toUpperCase().includes(searchTextUpper))
    ESUtil.genHTML("templateItemHangMuc", "divDsHangMuc", { hang_muc: arr });
    $("#timKiemHangMuc").focus();
}
function chonHangMuc(ma, ten) {
    var index = $("#index_hang_muc").val();
    $("#hang_muc_" + index).val(ma);
    $("#hang_muc_ten_" + index).val(ten);
    $("#popoverHangMuc").hide();
    ds_giam_dinh[index].hang_muc = ma;
    ds_giam_dinh[index].hang_muc_ten = ten;
}
function xoaPhanCapGiamDinh(index) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa phân cấp giám định này không?", "", val => {
        objPhanCapCT.giam_dinh = layDsPhanCapGiamDinh();
        objPhanCapCT.giam_dinh.splice(index, 1);
        ESUtil.genHTML("templatePhanCapGiamDinh", "tablePhanCapGiamDinhBoby", objPhanCapCT, () => {
            $('#tablePhanCapGiamDinhBoby select.select2').select2();
            $("#divPhanCapGiamDinh").scrollTop($("#tablePhanCapGiamDinhBoby")[0].scrollHeight);
        });
    });
}
function xoaPhanCapBoiThuong(index) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa phân cấp bồi thường này không?", "", val => {
        objPhanCapCT.boi_thuong = layDsPhanCapBoiThuong();
        objPhanCapCT.boi_thuong.splice(index, 1);
        ESUtil.genHTML("templatePhanCapBoiThuong", "tablePhanCapBoiThuongBody", objPhanCapCT, () => {
            $('#tablePhanCapBoiThuongBody select.select2').select2();
            $("#divPhanCapBoiThuong").scrollTop($("#tablePhanCapBoiThuongBody")[0].scrollHeight);
        });
    });
}
function layDsPhanCapGiamDinh() {
    var giam_dinh = [];
    $("#tablePhanCapGiamDinhBoby tr.gd_tn").each(function (index, el) {
        var objGiamDinh_t = {
            lh_nv: "",
            thay_the_sc: "T",
            hang_muc: "",
            tien: 0
        };
        var objGiamDinh_s = {
            lh_nv: "",
            thay_the_sc: "S",
            hang_muc: "",
            tien: 0
        };
        objGiamDinh_t.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh_s.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh_s.tien = parseFloat($(el).find("input#gd_tien_s_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_t.tien = parseFloat($(el).find("input#gd_tien_t_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_s.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_t.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        giam_dinh.push(objGiamDinh_t);
        giam_dinh.push(objGiamDinh_s);
    });
    return giam_dinh;
}
function layDsPhanCapGiamDinhNhomPC() {
    var giam_dinh = [];
    $("#tablePhanCapGiamDinhBobyNhomPC tr.gd_tn").each(function (index, el) {
        var objGiamDinh_t = {
            lh_nv: "",
            thay_the_sc: "T",
            hang_muc: "",
            tien: 0
        };
        var objGiamDinh_s = {
            lh_nv: "",
            thay_the_sc: "S",
            hang_muc: "",
            tien: 0
        };
        objGiamDinh_t.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh_s.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh_s.tien = parseFloat($(el).find("input#gd_tien_s_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_t.tien = parseFloat($(el).find("input#gd_tien_t_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_s.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh_t.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        giam_dinh.push(objGiamDinh_t);
        giam_dinh.push(objGiamDinh_s);
    });
    return giam_dinh;
}
function layDsPhanCapGiamDinhBB() {
    var giam_dinh = [];
    $("#tablePhanCapGiamDinhBobyBB tr.gd_bb").each(function (index, el) {
        var objGiamDinh = {
            lh_nv: "",
            thay_the_sc: " ",
            hang_muc: "",
            tien: 0
        };
        objGiamDinh.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh.tien = parseFloat($(el).find("input#gd_tien_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        giam_dinh.push(objGiamDinh);
    });
    return giam_dinh;
}
function layDsPhanCapGiamDinhBBNhomPC() {
    var giam_dinh = [];
    $("#tablePhanCapGiamDinhBobyBBNhomPC tr.gd_bb").each(function (index, el) {
        var objGiamDinh = {
            lh_nv: "",
            thay_the_sc: " ",
            hang_muc: "",
            tien: 0
        };
        objGiamDinh.lh_nv = $(el).find("input#lh_nv_" + index).attr('col-val');
        objGiamDinh.tien = parseFloat($(el).find("input#gd_tien_" + index).val().replace(/[^0-9]+/g, ''));
        objGiamDinh.tien_uoc_bcgd = parseFloat($(el).find("input#tien_uoc_bcgd_" + index).val().replace(/[^0-9]+/g, ''));
        giam_dinh.push(objGiamDinh);
    });
    return giam_dinh;
}
function layDsPhanCapBoiThuong() {
    var boi_thuong = [];
    $("#tablePhanCapBoiThuongBody tr.btx").each(function (index, el) {
        var objBoiThuong = {
            lh_nv: "",
            tien_phuong_an: 0,
            tien_bao_lanh: 0,
            tien_boi_thuong: 0
        };
        objBoiThuong.lh_nv = $(el).find("input#bt_lh_nv_" + index).attr('col-val');
        objBoiThuong.tien_phuong_an = parseFloat($(el).find("input#bt_tien_phuong_an_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_bao_lanh = parseFloat($(el).find("input#bt_tien_bao_lanh_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_boi_thuong = parseFloat($(el).find("input#bt_tien_boi_thuong_" + index).val().replace(/[^0-9]+/g, ''));
        boi_thuong.push(objBoiThuong);
    });
    return boi_thuong;
}
function layDsPhanCapBoiThuongNhomPC() {
    var boi_thuong = [];
    $("#tablePhanCapBoiThuongBodyNhomPC tr.btx").each(function (index, el) {
        var objBoiThuong = {
            lh_nv: "",
            tien_phuong_an: 0,
            tien_bao_lanh: 0,
            tien_boi_thuong: 0
        };
        objBoiThuong.lh_nv = $(el).find("input#bt_lh_nv_" + index).attr('col-val');
        objBoiThuong.tien_phuong_an = parseFloat($(el).find("input#bt_tien_phuong_an_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_bao_lanh = parseFloat($(el).find("input#bt_tien_bao_lanh_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_boi_thuong = parseFloat($(el).find("input#bt_tien_boi_thuong_" + index).val().replace(/[^0-9]+/g, ''));
        boi_thuong.push(objBoiThuong);
    });
    return boi_thuong;
}
function layDsPhanCapBoiThuongNguoi() {
    var boi_thuong = [];
    $("#tablePhanCapBoiThuongNguoiBody tr.bt_ng").each(function (index, el) {
        var objBoiThuong = {
            lh_nv: "",
            tien_phuong_an: 0,
            tien_bao_lanh: 0,
            tien_boi_thuong: 0
        };
        objBoiThuong.lh_nv = $(el).find("input#btn_lh_nv_" + index).attr('col-val');
        objBoiThuong.tien_phuong_an = parseFloat($(el).find("input#btn_tien_phuong_an_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_bao_lanh = parseFloat($(el).find("input#btn_tien_bao_lanh_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_boi_thuong = parseFloat($(el).find("input#btn_tien_boi_thuong_" + index).val().replace(/[^0-9]+/g, ''));
        boi_thuong.push(objBoiThuong);
    });
    return boi_thuong;
}
function layDsPhanCapBoiThuongNguoiNhomPC() {
    var boi_thuong = [];
    $("#tablePhanCapBoiThuongNguoiBodyNhomPC tr.bt_ng").each(function (index, el) {
        var objBoiThuong = {
            lh_nv: "",
            tien_phuong_an: 0,
            tien_bao_lanh: 0,
            tien_boi_thuong: 0
        };
        objBoiThuong.lh_nv = $(el).find("input#btn_lh_nv_" + index).attr('col-val');
        objBoiThuong.tien_phuong_an = parseFloat($(el).find("input#btn_tien_phuong_an_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_bao_lanh = parseFloat($(el).find("input#btn_tien_bao_lanh_" + index).val().replace(/[^0-9]+/g, ''));
        objBoiThuong.tien_boi_thuong = parseFloat($(el).find("input#btn_tien_boi_thuong_" + index).val().replace(/[^0-9]+/g, ''));
        boi_thuong.push(objBoiThuong);
    });
    return boi_thuong;
}
function bindTableDonViQuanLy(arr_dvi_qly_nsd = [], ma_doi_tac = "", loai_tk = "") {
    $("#chon_tat_ca_dvi").prop("checked", false);
    var arr = JSON.parse(JSON.stringify(objDanhMuc.dtac_chi_nhanh));
    if (loai_tk != "" && ma_doi_tac != "") {
        if (loai_tk != "S") {
            arr = arr.where(n => n.ma_doi_tac == ma_doi_tac);
        }
    }
    for (var i = 0; i < arr.length; i++) {
        arr[i].chon = false;
        for (var j = 0; j < arr_dvi_qly_nsd.length; j++) {
            if (arr[i].ma_doi_tac == arr_dvi_qly_nsd[j].ma_doi_tac_ql && arr[i].ma == arr_dvi_qly_nsd[j].ma_chi_nhanh_ql) {
                arr[i].chon = true;
            }
        }
    }
    if (arr.length == arr.where(n => n.chon).length) {
        $("#chon_tat_ca_dvi").prop("checked", true);
    }
    ESUtil.genHTML("templateDonViQuanLy", "tableDonViQuanLy", { quanly: arr });
}
function getDoiTacQuanLy() {
    var arr = [];
    $("#tableDonViQuanLy .input-dvi-qly:checked").each(function (index, el) {
        arr.push({
            ma_doi_tac_ql: $(el).attr("data-doi-tac"),
            ma_chi_nhanh_ql: $(el).attr("data-chi-nhanh")
        });
    });
    return arr;
}
function setDefaultPhanCap() {
    ESUtil.genHTML("templatePhanCapGiamDinhTNClone", "tablePhanCapGiamDinhBoby", { ds_lhnv_tn: [] });
    ESUtil.genHTML("templatePhanCapGiamDinhBBClone", "tablePhanCapGiamDinhBobyBB", { ds_lhnv_bb: [] });
    ESUtil.genHTML("templatePhanCapBoiThuongClone", "tablePhanCapBoiThuongBody", { ds_lhnv: [] });
    ESUtil.genHTML("templatePhanCapBoiThuongNguoiClone", "tablePhanCapBoiThuongNguoiBody", { sp_con_nguoi: [] });
    ESUtil.genHTML("modalPhanCapChung_template", "tablePhanCapChungBody", { ds_phan_cap_chung: [] });
}
function setDefaultPhanCapNhomPC() {
    ESUtil.genHTML("templatePhanCapGiamDinhTNCloneNhomPC", "tablePhanCapGiamDinhBobyNhomPC", { ds_lhnv_tn: [] });
    ESUtil.genHTML("templatePhanCapGiamDinhBBCloneNhomPC", "tablePhanCapGiamDinhBobyBBNhomPC", { ds_lhnv_bb: [] });
    ESUtil.genHTML("templatePhanCapBoiThuongCloneNhomPC", "tablePhanCapBoiThuongBodyNhomPC", { ds_lhnv: [] });
    ESUtil.genHTML("templatePhanCapBoiThuongNguoiCloneNhomPC", "tablePhanCapBoiThuongNguoiBodyNhomPC", { sp_con_nguoi: [] });
    ESUtil.genHTML("modalPhanCapChungNhomPC_template", "tablePhanCapChungBodyNhomPC", { ds_phan_cap_chung: [] });
}
function openTab(tab) {
    var nv = _frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue("");
    $("#navTableXe li").removeClass("active");
    $("#navTableNG li").removeClass("active");
    $("#tabXe").addClass('d-none');
    $("#tabNguoi").addClass('d-none');
    if (nv == "XE" || nv == "XE_MAY") {
        $("#tabXe").removeClass('d-none');
        $('#giam_dinh').removeClass('d-none');
        $('#boi_thuong').removeClass('d-none');
        $('#phan_cap_chung').removeClass('d-none');
        $("#navTableXe li[data-loai='" + tab + "']").addClass("active");
        if (tab == "GDX") {
            $('#boi_thuong').addClass('d-none');
            $('#phan_cap_chung').addClass('d-none');
            $("#btnOpenCopyPhanCap").show();
            $("#btnLuuPhanCapGiamDinhBoiThuong").show();
            $("#btnLuuPhanCapChung").hide();
        }
        if (tab == 'BTX') {
            $('#boi_thuong').removeClass('d-none');
            $('#giam_dinh').addClass('d-none');
            $('#phan_cap_chung').addClass('d-none');
            $("#btnOpenCopyPhanCap").show();
            $("#btnLuuPhanCapGiamDinhBoiThuong").show();
            $("#btnLuuPhanCapChung").hide();
        }
        if (tab == 'PCT') {
            $("#phan_cap_chung").removeClass('d-none');
            $('#boi_thuong').addClass('d-none');
            $('#giam_dinh').addClass('d-none');
            $("#btnLuuPhanCapChung").show();
            $("#btnOpenCopyPhanCap").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuong").hide();
        }
    }
    if (nv == "HSKHAC") {
        $("#tabXe").removeClass('d-none');
        $('#giam_dinh').removeClass('d-none');
        $('#boi_thuong').removeClass('d-none');
        $('#phan_cap_chung').removeClass('d-none');
        $("#navTableXe li[data-loai='" + tab + "']").addClass("active");
        if (tab == "GDX") {
            $('#boi_thuong').addClass('d-none');
            $('#phan_cap_chung').addClass('d-none');
            $("#btnOpenCopyPhanCap").show();
            $("#btnLuuPhanCapGiamDinhBoiThuong").show();
            $("#btnLuuPhanCapChung").hide();
        }
        if (tab == 'BTX') {
            $('#boi_thuong').removeClass('d-none');
            $('#giam_dinh').addClass('d-none');
            $('#phan_cap_chung').addClass('d-none');
            $("#btnOpenCopyPhanCap").show();
            $("#btnLuuPhanCapGiamDinhBoiThuong").show();
            $("#btnLuuPhanCapChung").hide();
        }
        if (tab == 'PCT') {
            $("#phan_cap_chung").removeClass('d-none');
            $('#boi_thuong').addClass('d-none');
            $('#giam_dinh').addClass('d-none');
            $("#btnLuuPhanCapChung").show();
            $("#btnOpenCopyPhanCap").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuong").hide();
        }
    }
    if (nv == "NG") {
        $("#tabNguoi").removeClass('d-none');
        $('#boi_thuong_nguoi').addClass('d-none');
        $("#navTableNG li[data-loai='" + tab + "']").addClass("active");
        if (tab == "BTN") {
            $('#boi_thuong_nguoi').removeClass('d-none');
        }
    }
    if (nv == "THANH_TOAN") {
        $("#tabXe").removeClass('d-none');
        $('#giam_dinh').removeClass('d-none');
        $('#boi_thuong').removeClass('d-none');
        $('#phan_cap_chung').removeClass('d-none');
        $("#navTableXe li[data-loai='" + tab + "']").addClass("active");
        if (tab == 'PCT') {
            $("#phan_cap_chung").removeClass('d-none');
            $('#giam_dinh').addClass('d-none');
            $('#boi_thuong').addClass('d-none');
            $("#btnLuuPhanCapChung").show();
            $("#btnOpenCopyPhanCap").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuong").hide();
        }
    }
}
function openTabNhomPC(tab) {
    var nv = _frmThemNhomPCChiTiet.getControl('nv').getValue("");
    $("#navTableXeNhomPC li").removeClass("active");
    $("#navTableNGNhomPC li").removeClass("active");
    $("#tabXeNhomPC").addClass('d-none');
    $("#tabNguoiNhomPC").addClass('d-none');
    if (nv == "XE" || nv == "XE_MAY") {
        $("#tabXeNhomPC").removeClass('d-none');
        $('#giam_dinh_nhom_pc').removeClass('d-none');
        $('#boi_thuong_nhom_pc').removeClass('d-none');
        $('#phan_cap_chung_nhom_pc').removeClass('d-none');
        $("#navTableXeNhomPC li[data-loai='" + tab + "']").addClass("active");
        if (tab == "GDX") {
            $('#boi_thuong_nhom_pc').addClass('d-none');
            $('#phan_cap_chung_nhom_pc').addClass('d-none');
            $("#btnOpenCopyPhanCapNhomPC").show();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").show();
            $("#btnLuuPhanCapChungNhomPC").hide();
        }
        if (tab == 'BTX') {
            $('#boi_thuong_nhom_pc').removeClass('d-none');
            $('#giam_dinh_nhom_pc').addClass('d-none');
            $('#phan_cap_chung_nhom_pc').addClass('d-none');

            $("#btnOpenCopyPhanCapNhomPC").show();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").show();
            $("#btnLuuPhanCapChungNhomPC").hide();
        }
        if (tab == 'PCT') {
            $("#phan_cap_chung_nhom_pc").removeClass('d-none');
            $('#boi_thuong_nhom_pc').addClass('d-none');
            $('#giam_dinh_nhom_pc').addClass('d-none');
            $("#btnLuuPhanCapChungNhomPC").show();
            $("#btnOpenCopyPhanCapNhomPC").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").hide();
        }
    }
    if (nv == "HSKHAC") {
        $("#tabXeNhomPC").removeClass('d-none');
        $('#giam_dinh_nhom_pc').removeClass('d-none');
        $('#boi_thuong_nhom_pc').removeClass('d-none');
        $('#phan_cap_chung_nhom_pc').removeClass('d-none');
        $("#navTableXeNhomPC li[data-loai='" + tab + "']").addClass("active");
        if (tab == "GDX") {
            $('#boi_thuong_nhom_pc').addClass('d-none');
            $('#phan_cap_chung_nhom_pc').addClass('d-none');
            $("#btnOpenCopyPhanCapNhomPC").show();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").show();
            $("#btnLuuPhanCapChungNhomPC").hide();
        }
        if (tab == 'BTX') {
            $('#boi_thuong_nhom_pc').removeClass('d-none');
            $('#giam_dinh_nhom_pc').addClass('d-none');
            $('#phan_cap_chung_nhom_pc').addClass('d-none');
            $("#btnOpenCopyPhanCapNhomPC").show();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").show();
            $("#btnLuuPhanCapChungNhomPC").hide();
        }
        if (tab == 'PCT') {
            $("#phan_cap_chung_nhom_pc").removeClass('d-none');
            $('#boi_thuong_nhom_pc').addClass('d-none');
            $('#giam_dinh_nhom_pc').addClass('d-none');
            $("#btnLuuPhanCapChungNhomPC").show();
            $("#btnOpenCopyPhanCapNhomPC").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").hide();
        }
    }
    if (nv == "NG") {
        $("#tabNguoiNhomPC").removeClass('d-none');
        $('#boi_thuong_nguoi_nhom_pc').addClass('d-none');
        $("#navTableNGNhomPC li[data-loai='" + tab + "']").addClass("active");
        if (tab == "BTN") {
            $('#boi_thuong_nguoi_nhom_pc').removeClass('d-none');
        }
    }
    if (nv == "THANH_TOAN") {
        $("#tabXeNhomPC").removeClass('d-none');
        $('#giam_dinh_nhom_pc').removeClass('d-none');
        $('#boi_thuong_nhom_pc').removeClass('d-none');
        $('#phan_cap_chung_nhom_pc').removeClass('d-none');
        $("#navTableXeNhomPC li[data-loai='" + tab + "']").addClass("active");
        if (tab == 'PCT') {
            $("#phan_cap_chung_nhom_pc").removeClass('d-none');
            $('#giam_dinh_nhom_pc').addClass('d-none');
            $('#boi_thuong_nhom_pc').addClass('d-none');

            $("#btnLuuPhanCapChungNhomPC").show();
            $("#btnOpenCopyPhanCapNhomPC").hide();
            $("#btnLuuPhanCapGiamDinhBoiThuongNhomPC").hide();
        }
    }
}
function getDetailPhanCapTheoNgay(so_id) {
    $('#tam_ung_thanh_toan').find('input[name=tien_tam_ung]').val('');
    $('#tam_ung_thanh_toan').find('input[name=tien_thanh_toan]').val('');
    $('#tam_ung_thanh_toan_ng').find('input[name=tien_tam_ung]').val('');
    $('#tam_ung_thanh_toan_ng').find('input[name=tien_thanh_toan]').val('');
    if (so_id != undefined) {
        $('.item-ngay-hl-kt').removeClass("text-danger");
        $("#bt_" + so_id).addClass("text-danger");
        var nv = _frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue();
        _userManagementService.layPhanCap({
            ma_doi_tac: nguoi_dung.ma_doi_tac,
            nv: nv,
            so_id: so_id
        }).then(res => {
            objPhanCapCT = res.data_info.phan_cap || {};
            _frmPhanCapGiamDinhBoiThuong.setData(res.data_info.phan_cap);
            $('#tam_ung_thanh_toan').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_tam_ung));
            $('#tam_ung_thanh_toan').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_thanh_toan));
            $('#tam_ung_thanh_toan_ng').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_tam_ung));
            $('#tam_ung_thanh_toan_ng').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_thanh_toan));
            var mdt = _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue();
            objPhanCapCT["ds_lhnv"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCT["ds_lhnv_tn"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx == 'VCX' && n.nv == nv);
            objPhanCapCT["ds_lhnv_bb"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx != 'VCX' && n.nv == nv);
            objPhanCapCT["sp_con_nguoi"] = objDanhMuc.sp_con_nguoi.where(n => n.ma_doi_tac == mdt);
            objPhanCapCT["giam_dinh"] = res.data_info.giam_dinh.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCT["boi_thuong"] = res.data_info.boi_thuong.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCT["boi_thuong_nguoi"] = res.data_info.boi_thuong_ng.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == 'NG');
            objPhanCapCT["ds_phan_cap_chung"] = res.data_info.phan_cap_chung;
            ESUtil.genHTML("templatePhanCapGiamDinhTNClone", "tablePhanCapGiamDinhBoby", objPhanCapCT);
            ESUtil.genHTML("templatePhanCapGiamDinhBBClone", "tablePhanCapGiamDinhBobyBB", objPhanCapCT);
            ESUtil.genHTML("templatePhanCapBoiThuongClone", "tablePhanCapBoiThuongBody", objPhanCapCT);
            ESUtil.genHTML("templatePhanCapBoiThuongNguoiClone", "tablePhanCapBoiThuongNguoiBody", objPhanCapCT);
            ESUtil.genHTML("modalPhanCapChung_template", "tablePhanCapChungBody", objPhanCapCT);
        });
    }
}
function getDetailPhanCapTheoNgayNhomPC(so_id) {
    $('#tam_ung_thanh_toan_nhom_pc').find('input[name=tien_tam_ung]').val('');
    $('#tam_ung_thanh_toan_nhom_pc').find('input[name=tien_thanh_toan]').val('');
    $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_tam_ung]').val('');
    $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_thanh_toan]').val('');
    _frmThemNhomPCChiTiet.getControl('so_id').setValue(so_id);
    var nhom = _frmThemNhomPCChiTiet.getControl('nhom_moi').getValue();
    if (nhom != '' && so_id != undefined) {
        $('.item-ngay-hl-kt-nhom-pc').removeClass("text-danger");
        $("#btnhompc_" + so_id).addClass("text-danger");
        var nv = _frmThemNhomPCChiTiet.getControl('nv').getValue();
        _userManagementService.layPhanCapNhomPC({
            nhom_moi: _frmThemNhomPCChiTiet.getControl('nhom_moi').getValue(),
            nv: nv,
            so_id: so_id
        }).then(res => {
            objPhanCapCTNhomPC = res.data_info.phan_cap || {};
            _frmThemNhomPCChiTiet.setData(res.data_info.phan_cap);
            $('#tam_ung_thanh_toan_nhom_pc').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_tam_ung));
            $('#tam_ung_thanh_toan_nhom_pc').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_thanh_toan));
            $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_tam_ung));
            $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(res.data_info.phan_cap.tien_thanh_toan));
            var mdt = _frmThemNhomPCChiTiet.getControl('ma_doi_tac_ql').getValue();
            objPhanCapCTNhomPC["ds_lhnv"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCTNhomPC["ds_lhnv_tn"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx == 'VCX' && n.nv == nv);
            objPhanCapCTNhomPC["ds_lhnv_bb"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx != 'VCX' && n.nv == nv);
            objPhanCapCTNhomPC["sp_con_nguoi"] = objDanhMuc.sp_con_nguoi.where(n => n.ma_doi_tac == mdt);
            objPhanCapCTNhomPC["giam_dinh"] = res.data_info.giam_dinh.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCTNhomPC["boi_thuong"] = res.data_info.boi_thuong.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == nv);
            objPhanCapCTNhomPC["boi_thuong_nguoi"] = res.data_info.boi_thuong_ng.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nv == 'NG');
            objPhanCapCTNhomPC["ds_phan_cap_chung"] = res.data_info.phan_cap_chung;
            ESUtil.genHTML("templatePhanCapGiamDinhTNCloneNhomPC", "tablePhanCapGiamDinhBobyNhomPC", objPhanCapCTNhomPC);
            ESUtil.genHTML("templatePhanCapGiamDinhBBCloneNhomPC", "tablePhanCapGiamDinhBobyBBNhomPC", objPhanCapCTNhomPC);
            ESUtil.genHTML("templatePhanCapBoiThuongCloneNhomPC", "tablePhanCapBoiThuongBodyNhomPC", objPhanCapCTNhomPC);
            ESUtil.genHTML("templatePhanCapBoiThuongNguoiCloneNhomPC", "tablePhanCapBoiThuongNguoiBodyNhomPC", objPhanCapCTNhomPC);
            ESUtil.genHTML("modalPhanCapChungNhomPC_template", "tablePhanCapChungBodyNhomPC", objPhanCapCTNhomPC);
        });
    }
}
function getListNgay(callback = undefined) {
    var nv = _frmPhanCapGiamDinhBoiThuong.getControl("nv").getValue();
    var ma_doi_tac_ql = _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue()
    if (nv == 'XE' || nv == 'XE_MAY') {
        ma_doi_tac_ql = '';
    }
    var objNgay = {
        ma_doi_tac: nguoi_dung.ma_doi_tac,
        ma_doi_tac_ql: ma_doi_tac_ql,
        ma: nguoi_dung.ma,
        nv: nv
    }
    _userManagementService.layDSNgay(objNgay).then(res => {
        ESUtil.genHTML("tblDsNgayBody_template", "tblDsNgayBody", { ds_ngay: res.data_info }, () => {
            if (res.data_info.length > 0) {
                var dem = 0;
                $.each(res.data_info, (index, item) => {
                    if (item.ngay_hl <= dateNow.dateToNumber() && item.ngay_kt >= dateNow.dateToNumber()) {
                        getDetailPhanCapTheoNgay(item.so_id);
                        dem++;
                    }
                    if (dem == 0) {
                        getDetailPhanCapTheoNgay(res.data_info[0].so_id);
                    }
                });
                var nam_c = String(res.data_info[0].ngay_kt).substr(0, 4);
                var thang_c = parseInt(String(res.data_info[0].ngay_kt).substr(4, 2)) - 1;
                var ngay_c = String(res.data_info[0].ngay_kt).substr(6, 2);
                var ngay_cuoi = new Date(nam_c, thang_c, ngay_c);
                ngay_tt = new Date();
                ngay_tt.setTime(ngay_cuoi.getTime() + (24 * 60 * 60 * 1000));
                _frmThemPhanCap.getControl('ngay_hl').setValue(ngay_tt.ddmmyyyy());
                var vl = _frmThemPhanCap.getControl('ngay_hl').val();
                if (vl != "") {
                    var ngay_kt_date = vl.slice(0, 6);
                    var ngay_kt_int = parseInt(vl.slice(-4, 10)) + 1;
                    _frmThemPhanCap.getControl('ngay_kt').val(ngay_kt_date.toString() + ngay_kt_int.toString());
                }
            } else {
                setDefaultPhanCap();
            }
        });
        if (callback) {
            callback();
        }
    });
}
function getListNgayNhomPC(callback = undefined) {
    var nv = _frmThemNhomPCChiTiet.getControl("nv").getValue();
    var ma_doi_tac_ql = _frmThemNhomPCChiTiet.getControl('ma_doi_tac_ql').getValue()
    if (nv == 'XE' || nv == 'XE_MAY') {
        ma_doi_tac_ql = '';
    }
    var objNgay = {
        nhom_moi: _frmThemNhomPCChiTiet.getControl("nhom_moi").val(),
        ma_doi_tac_ql: ma_doi_tac_ql,
        nv: nv
    }
    _userManagementService.layDSNgayNhomPC(objNgay).then(res => {
        ESUtil.genHTML("tblDsNgayBodyNhomPC_template", "tblDsNgayBodyNhomPC", { ds_ngay: res.data_info }, () => {
            if (res.data_info.length > 0) {
                var dem = 0;
                $.each(res.data_info, (index, item) => {
                    if (item.ngay_hl <= dateNow.dateToNumber() && item.ngay_kt >= dateNow.dateToNumber()) {
                        getDetailPhanCapTheoNgayNhomPC(item.so_id);
                        dem++;
                    }
                    if (dem == 0) {
                        getDetailPhanCapTheoNgayNhomPC(res.data_info[0].so_id);
                    }
                });
            } else {
                setDefaultPhanCapNhomPC();
            }
        });
        if (callback) {
            callback();
        }
    });
}
function suaNgayPhanCap(so_id) {
    _frmThemPhanCap.resetForm();
    _frmThemPhanCap.clearErrorMessage();
    $('#btnCopyNgayPhanCap').hide();
    $('#btnLuuNgayPhanCap').show();
    if (_frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue() == 'NG' && _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue() == '') {
        _notifyService.error('Chưa có mã đối tác quản lý');
        return;
    }
    var obj = {
        ma_doi_tac: nguoi_dung.ma_doi_tac,
        nv: _frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue(),
        so_id: so_id
    }
    _userManagementService.getDetailPhanCapNgay(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmThemPhanCap.setData(res.data_info);
        _modalThemPhanCap.show();
    });
}
function suaNgayPhanCapNhomPC(so_id) {
    _frmThemPhanCapNhomPC.resetForm();
    _frmThemPhanCapNhomPC.clearErrorMessage();
    if (_frmThemNhomPCChiTiet.getControl('nv').getValue() == 'NG' && _frmThemNhomPCChiTiet.getControl('ma_doi_tac_ql').getValue() == '') {
        _notifyService.error('Chưa có mã đối tác quản lý');
        return;
    }
    var obj = {
        nhom_moi: _frmThemNhomPCChiTiet.getControl('nhom_moi').val(),
        nv: _frmThemNhomPCChiTiet.getControl('nv').getValue(),
        so_id: so_id
    }
    _userManagementService.getDetailPhanCapNgayNhomPC(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmThemPhanCapNhomPC.setData(res.data_info);
        _modalThemPhanCapNhomPC.show();
    });
}
function getListphanCapChung(so_id) {
    var obj = {
        ma_doi_tac: nguoi_dung.ma_doi_tac,
        so_id: so_id
    }
    _userManagementService.layThongTinPhanCapChung(obj).then(res => {
        ESUtil.genHTML("modalPhanCapChung_template", "tablePhanCapChungBody", { ds_phan_cap_chung: res.data_info.tam_ung });
    });
}
function getDataTablePhanCapChung() {
    var otArr = [];
    $("#tablePhanCapChung tr.row_item").each(function (e) {
        var json = {
            name: '',
            value: '',
            ma: ''
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find('input').each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            })
        });
        otArr.push(json);
    });
    return otArr;
}
function getDataTablePhanCapChungNhomPC() {
    var otArr = [];
    $("#tablePhanCapChungNhomPC tr.row_item").each(function (e) {
        var json = {
            name: '',
            value: '',
            ma: ''
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find('input').each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            })
        });
        otArr.push(json);
    });
    return otArr;
}
function onNhapTatCaChangeCauHinh(el) {
    if ($(el).is(":checked"))
        $(".nhap-item-cau-hinh").prop("checked", true);
    else
        $(".nhap-item-cau-hinh").prop("checked", false);
}
function onXemTatCaChangeCauHinh(el) {
    if ($(el).is(":checked"))
        $(".xem-item-cau-hinh").prop("checked", true);
    else
        $(".xem-item-cau-hinh").prop("checked", false);
}
function onNhapChangeCauHinh(el) {
    var count = $(".nhap-item-cau-hinh").length;
    var count_nhap = $(".nhap-item-cau-hinh:checked").length;
    if (count === count_nhap)
        $("#nhap_tat_ca_cau_hinh").prop("checked", true);
    else
        $("#nhap_tat_ca_cau_hinh").prop("checked", false);
}
function onXemChangeCauHinh(el) {
    var count = $(".xem-item-cau-hinh").length;
    var count_xem = $(".xem-item-cau-hinh:checked").length;
    if (count === count_xem)
        $("#xem_tat_ca_cau_hinh").prop("checked", true);
    else
        $("#xem_tat_ca_cau_hinh").prop("checked", false);
}
function luuNhomQuyen(callback = undefined) {
    if (_frmThemNhomQuyenChiTiet.isValid()) {
        var formData = _frmThemNhomQuyenChiTiet.getJsonData();
        formData.nhom_moi = _frmThemNhomQuyenChiTiet.getControl('nhom_moi').val();
        if (formData.quyen === undefined) {
            formData.quyen = [];
        }
        for (var i_quyen = 0; i_quyen < formData.quyen.length; i_quyen++) {
            if (formData.quyen[i_quyen].nhap === undefined) {
                formData.quyen[i_quyen].nhap = "0";
            }
            if (formData.quyen[i_quyen].xem === undefined) {
                formData.quyen[i_quyen].xem = "0";
            }
        }
        _userManagementService.luuNhomQuyenCauHinh(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công.");
                _userManagementService.layNhomQuyen().then(res => {
                    obj_nhom_quyen = res.data_info;
                    _frmThemNhomQuyenChiTiet.getControl('nhom').setDataSource(obj_nhom_quyen.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
                    getPaging(1);
                });
                if (callback) {
                    callback();
                }
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    }
};
function chonCanBoPhanCap(el) {
    var arr = _frmThemNhomPCChiTiet.getControl('ad_nsd').val().split(';');
    $("#modalNsdPhanCapDanhSach .dsnsd").removeClass("d-none");
    $("#inputSearch_NsdPhanCap").val("");
    $("#inputSearch_NsdPhanCap").focus();
    $("#modalNsdPhanCapDanhSach .modalChonNsdPhanCapItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalNsdPhanCapDanhSach .modalChonNsdPhanCapItem[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalDanhSachNsdPhanCap.show(el);
}
function getCheckedAdNsd() {
    var arr_chon = [];
    $("#modalNsdPhanCapDanhSach .modalChonNsdPhanCapItem").each(function () {
        if ($(this).is(":checked")) {
            arr_chon.push($(this).val());
        }
    });
    return arr_chon;
}
function onSearchNSD(el) {
    var val = $(el).val().trim();
    $("#modalNsdPhanCapDanhSach .dsnsd").removeClass("d-none");
    if (val != "") {
        $("#modalNsdPhanCapDanhSach .dsnsd").addClass("d-none");
        var textSearch = ESUtil.xoaKhoangTrangText(val);
        $("#modalNsdPhanCapDanhSach .dsnsd[data-search*=" + textSearch + "]").removeClass("d-none");
    }
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    //_frmLuuThongTinNguoiDung.getControl("ngay_sinh").setMaxDate(dateNow);
    _frmLuuThongTinNguoiDung.getControl("ngay_hl").addEventChangeDate(val => {
        _frmLuuThongTinNguoiDung.getControl("ngay_kt").setMinDate(val);
    });
    _frmLuuThongTinNguoiDung.getControl("loai_tk").setDataSource(objDanhMuc.loai_tk, "ten", "ma", "Chọn loại tài khoản", "");

    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null) {
        _service.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _departmentListService.layDsPhongBan(),
            _functionService.timKiem({ pm: "BT" }),
            _commonService.layTatCaDonViHanhChinh(),
            _categoryvehicleListService.layDsHangMucXe(),
            _businessCodeService.layDsLHNVXe(),
            _productHumanService.getAllSanPham(),
            _titleService.layDsChucDanh({ ma_doi_tac: ESCS_MA_DOI_TAC }),
            _userManagementService.layDsNSD()
        ]).then(arrRes => {
            objDanhMuc["doi_tac"] = arrRes[0].data_info;
            objDanhMuc["dtac_chi_nhanh"] = arrRes[1].data_info;
            objDanhMuc["phong"] = arrRes[2].data_info;
            objDanhMuc["quyen"] = arrRes[3].data_info;
            objDanhMuc["hang_muc"] = arrRes[5].data_info;
            objDanhMuc["lhnv"] = arrRes[6].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc["sp_con_nguoi"] = arrRes[7].data_info;
            objDanhMuc["ma_chuc_danh"] = arrRes[8].data_info;
            objDanhMuc["nsd_pc"] = arrRes[9].data_info;

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            var arrChiNhanh = objDanhMuc.dtac_chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);

            _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setValue("");
            _frmLuuThongTinNguoiDung.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");
            _frmLuuThongTinNguoiDung.getControl("ma_chuc_danh").setDataSource(objDanhMuc.ma_chuc_danh.chuc_danh, "ten", "ma", "Chọn chức danh", "");

            _frmPhanCapGiamDinhBoiThuong.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmThemPhanCap.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);

            _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
            _frmTimKiem.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");

            _frmPhanCapGiamDinhBoiThuong.getControl("nv").setValue('XE');

            ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: objDanhMuc.quyen });
            getListphanCapChung();
            getPaging(1);
            _frmPhanDiaBanGiamDinh.getControl("mien").setDataSource(objMien, "ten", "ma", "Chọn tên miền", "");
            objDanhMucDonViHanhChinh = arrRes[4].data_info;
            ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMucDonViHanhChinh));
            _frmThemNhomQuyenChiTiet.getControl('nhom').setDataSource(objDanhMuc.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
            _frmThemNhomPCChiTiet.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);


            ESUtil.genHTML("modalNsdPhanCapDanhSachTemplate", "modalNsdPhanCapDanhSach", { danh_sach: objDanhMuc.nsd_pc });

            bindTinhThanh();
            bindQuanHuyen([]);
        });
    }
    else {
        objDanhMucDonViHanhChinh = JSON.parse(storageDonViHanhChinh);
        bindTinhThanh();
        bindQuanHuyen([]);
        _service.all([
            _partnerListService.layDsDoiTac(),
            _branchListService.layDsChiNhanh(),
            _departmentListService.layDsPhongBan(),
            _functionService.timKiem({ pm: "BT" }),
            _categoryvehicleListService.layDsHangMucXe(),
            _businessCodeService.layDsLHNVXe(),
            _productHumanService.getAllSanPham(),
            _titleService.layDsChucDanh(),
            _userManagementService.layDsNSD()
        ]).then(arrRes => {
            objDanhMuc["doi_tac"] = arrRes[0].data_info;
            objDanhMuc["dtac_chi_nhanh"] = arrRes[1].data_info;
            objDanhMuc["phong"] = arrRes[2].data_info;
            objDanhMuc["quyen"] = arrRes[3].data_info;
            objDanhMuc["hang_muc"] = arrRes[4].data_info;
            objDanhMuc["lhnv"] = arrRes[5].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            objDanhMuc["sp_con_nguoi"] = arrRes[6].data_info;
            objDanhMuc["ma_chuc_danh"] = arrRes[7].data_info;
            objDanhMuc["nsd_pc"] = arrRes[8].data_info;

            ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
            var arrChiNhanh = objDanhMuc.dtac_chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);

            _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmLuuThongTinNguoiDung.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");
            _frmLuuThongTinNguoiDung.getControl("ma_chuc_danh").setDataSource(objDanhMuc.ma_chuc_danh.chuc_danh, "ten", "ma", "Chọn chức danh", "");
            _frmPhanCapGiamDinhBoiThuong.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);

            _frmThemPhanCap.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);

            _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
            _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
            _frmTimKiem.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");
            _frmPhanDiaBanGiamDinh.getControl("mien").setDataSource(objMien, "ten", "ma", "Chọn tên miền", "");
            _frmThemNhomQuyenChiTiet.getControl('nhom').setDataSource(objDanhMuc.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
            _frmThemNhomPCChiTiet.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);

            ESUtil.genHTML("modalNsdPhanCapDanhSachTemplate", "modalNsdPhanCapDanhSach", { danh_sach: objDanhMuc.nsd_pc });

            ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: objDanhMuc.quyen });
            getListphanCapChung();
            getPaging(1);
        });
    }
    _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.dtac_chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setValue("");
        _frmLuuThongTinNguoiDung.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");
        bindTableDonViQuanLy(arrDonViQuanLyNSD, val, _frmLuuThongTinNguoiDung.getControl("loai_tk").val());
    });
    _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").addEventChange(val => {
        var ma_dtac = _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").val();
        var ma_cnhanh = val;
        var arrPhong = objDanhMuc.phong.where(n => n.ma_doi_tac === ma_dtac && n.ma_chi_nhanh === ma_cnhanh);
        _frmLuuThongTinNguoiDung.getControl("phong").setDataSource(arrPhong, "ten", "ma", "Chọn phòng", "");
        _frmLuuThongTinNguoiDung.getControl("phong").setValue("");
    });
    _frmLuuThongTinNguoiDung.getControl("loai_tk").addEventChange(val => {
        bindTableDonViQuanLy(arrDonViQuanLyNSD, _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").val(), val);
        if (arrDsQuyenNSD != null && arrDsQuyenNSD.length <= 0) {
            arrDsQuyenNSD = JSON.parse(JSON.stringify(objDanhMuc.quyen));
            for (var i = 0; i < arrDsQuyenNSD.length; i++) {
                arrDsQuyenNSD[i].nhap = false;
                arrDsQuyenNSD[i].xem = false;
            }
        }
        if (val != "S") {
            arrDsQuyenNSD = arrDsQuyenNSD.where(n => n.nhom_chuc_nang != "ESCS");
        }
        else {
            arrDsQuyenNSD = arrDsQuyenNSD.removeItem(n => n.nhom_chuc_nang == "ESCS")
            var escs = JSON.parse(JSON.stringify(objDanhMuc.quyen.where(n => n.nhom_chuc_nang == "ESCS")));
            for (var i = 0; i < escs.length; i++) {
                arrDsQuyenNSD.push(escs[i]);
            }
        }
        ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: arrDsQuyenNSD });
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.dtac_chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiem.getControl("ma_chi_nhanh").setValue("");
        _frmTimKiem.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng", "");
    });
    _frmTimKiem.getControl("ma_chi_nhanh").addEventChange(val => {
        var ma_dtac = _frmTimKiem.getControl("ma_doi_tac").val();
        var ma_cnhanh = val;
        var arrPhong = objDanhMuc.phong.where(n => n.ma_doi_tac === ma_dtac && n.ma_chi_nhanh === ma_cnhanh);
        _frmTimKiem.getControl("phong").setDataSource(arrPhong, "ten", "ma", "Chọn phòng", "");
        _frmTimKiem.getControl("phong").setValue("");
    });
    _frmPhanCapGiamDinhBoiThuong.getControl("ma_doi_tac_ql").addEventChange(val => {
        if (val != '') {
            getListNgay();
        } else {
            ESUtil.genHTML("tblDsNgayBody_template", "tblDsNgayBody", { ds_ngay: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhTNClone", "tablePhanCapGiamDinhBoby", { ds_lhnv_tn: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhBBClone", "tablePhanCapGiamDinhBobyBB", { ds_lhnv_bb: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongClone", "tablePhanCapBoiThuongBody", { ds_lhnv: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongNguoiClone", "tablePhanCapBoiThuongNguoiBody", { sp_con_nguoi: [] });
        }
    });
    _frmPhanCapGiamDinhBoiThuong.getControl('nv').addEventChange(val => {
        if (val != "" && val != null) {
            if (val == "XE" || val == "XE_MAY") {
                $('#tabNguoi').addClass("d-none");
                $('#ma_doi_tac_ql').addClass('d-none');
                $('#tabXe').removeClass("d-none");
                $('#giam-dinh-tab').removeClass('d-none');
                $('#boi-thuong-tab').removeClass('d-none');
                $('#phan-cap-chung-tab').removeClass('d-none');
                openTab("GDX");
            }
            if (val == "NG") {
                $('#tabNguoi').removeClass("d-none");
                $('#tabXe').addClass("d-none");
                $('#ma_doi_tac_ql').removeClass('d-none');
                openTab("BTN");
            }
            if (val == "THANH_TOAN") {
                $('#tabNguoi').addClass("d-none");
                $('#tabXe').removeClass("d-none");
                $('#ma_doi_tac_ql').addClass('d-none');
                $('#giam-dinh-tab').addClass('d-none');
                $('#boi-thuong-tab').addClass('d-none');
                $('#phan-cap-chung-tab').removeClass('d-none');
                $('#giam_dinh').addClass('d-none');
                $('#boi_thuong').addClass('d-none');
                $('#phan_cap_chung').removeClass('d-none');
                openTab("PCT");
            }
            if (val == "HSKHAC") {
                $('#tabNguoi').addClass("d-none");
                $('#ma_doi_tac_ql').addClass('d-none');
                $('#tabXe').removeClass("d-none");
                $('#giam-dinh-tab').removeClass('d-none');
                $('#boi-thuong-tab').removeClass('d-none');
                $('#phan-cap-chung-tab').removeClass('d-none');
                openTab("GDX");
            }
            getListNgay();
        } else {
            ESUtil.genHTML("tblDsNgayBody_template", "tblDsNgayBody", { ds_ngay: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhTNClone", "tablePhanCapGiamDinhBoby", { ds_lhnv_tn: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhBBClone", "tablePhanCapGiamDinhBobyBB", { ds_lhnv_bb: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongClone", "tablePhanCapBoiThuongBody", { ds_lhnv: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongNguoiClone", "tablePhanCapBoiThuongNguoiBody", { sp_con_nguoi: [] });
        }
    });
    _frmThemNhomPCChiTiet.getControl('nv').addEventChange(val => {
        if (_frmThemNhomPCChiTiet.getControl('nhom').getValue() == '') {
            setDefaultPhanCapNhomPC();
            ESUtil.genHTML("tblDsNgayBodyNhomPC_template", "tblDsNgayBodyNhomPC", { ds_ngay: [] });
            return;
        }
        if (val != '') {
            if (val == "XE" || val == "XE_MAY") {
                $("#ap_dung_cho_can_bo").removeClass("col-9");
                $("#ap_dung_cho_can_bo").addClass("col-12");
                $('#tabNguoiNhomPC').addClass("d-none");
                $('#ma_doi_tac_ql_nhom_pc').addClass('d-none');
                $('#tabXeNhomPC').removeClass("d-none");
                $('#giam-dinh-tab-nhom-pc').removeClass('d-none');
                $('#boi-thuong-tab-nhom-pc').removeClass('d-none');
                $('#phan-cap-chung-tab-nhom-pc').removeClass('d-none');
                openTabNhomPC("GDX");
            }
            if (val == "NG") {
                $("#ap_dung_cho_can_bo").addClass("col-9");
                $("#ap_dung_cho_can_bo").removeClass("col-12");
                $('#tabNguoiNhomPC').removeClass("d-none");
                $('#tabXeNhomPC').addClass("d-none");
                $('#ma_doi_tac_ql_nhom_pc').removeClass('d-none');
                openTabNhomPC("BTN");
            }
            if (val == "THANH_TOAN") {
                $("#ap_dung_cho_can_bo").removeClass("col-9");
                $("#ap_dung_cho_can_bo").addClass("col-12");
                $('#tabNguoiNhomPC').addClass("d-none");
                $('#tabXeNhomPC').removeClass("d-none");
                $('#ma_doi_tac_ql_nhom_pc').addClass('d-none');
                $('#giam-dinh-tab-nhom-pc').addClass('d-none');
                $('#boi-thuong-tab-nhom-pc').addClass('d-none');
                $('#phan-cap-chung-tab-nhom-pc').removeClass('d-none');
                $('#giam_dinh_nhom_pc').addClass('d-none');
                $('#boi_thuong_nhom_pc').addClass('d-none');
                $('#phan_cap_chung_nhom_pc').removeClass('d-none');
                openTabNhomPC("PCT");
            }
            if (val == "HSKHAC") {
                $("#ap_dung_cho_can_bo").removeClass("col-9");
                $("#ap_dung_cho_can_bo").addClass("col-12");
                $('#tabNguoiNhomPC').addClass("d-none");
                $('#ma_doi_tac_ql_nhom_pc').addClass('d-none');
                $('#tabXeNhomPC').removeClass("d-none");
                $('#giam-dinh-tab-nhom-pc').removeClass('d-none');
                $('#boi-thuong-tab-nhom-pc').removeClass('d-none');
                $('#phan-cap-chung-tab-nhom-pc').removeClass('d-none');
                openTabNhomPC("GDX");
            }
            getListNgayNhomPC();
        } else {
            ESUtil.genHTML("tblDsNgayBodyNhomPC_template", "tblDsNgayBodyNhomPC", { ds_ngay: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhTNCloneNhomPC", "tablePhanCapGiamDinhBobyNhomPC", { ds_lhnv_tn: [] });
            ESUtil.genHTML("templatePhanCapGiamDinhBBCloneNhomPC", "tablePhanCapGiamDinhBobyBBNhomPC", { ds_lhnv_bb: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongCloneNhomPC", "tablePhanCapBoiThuongBodyNhomPC", { ds_lhnv: [] });
            ESUtil.genHTML("templatePhanCapBoiThuongNguoiCloneNhomPC", "tablePhanCapBoiThuongNguoiBodyNhomPC", { sp_con_nguoi: [] });
        }
    });
    _frmPhanDiaBanGiamDinh.getControl("mien").addEventChange(val => {
        $("#ds_tinh_thanh").html("");
        var arrTinhThanh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "").clone();
        if (val != "") {
            arrTinhThanh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "" && n.mien == val).clone();
        }
        ESUtil.genHTML("dsTinhThanhTemplate", "ds_tinh_thanh", { ds_tinh_thanh: arrTinhThanh });
        onChangeTinhThanh();
    });
    _frmLuuThongTinNguoiDung.getControl('nhom_quyen').addEventChange(val => {
        var dsQuyen = JSON.parse(JSON.stringify(objDanhMuc.quyen));
        var nhom_quyen_ct = obj_nhom_quyen.nhom_quyen_ct.where(n => n.nhom == val);
        for (var i = 0; i < dsQuyen.length; i++) {
            dsQuyen[i].xem = false;
            dsQuyen[i].nhap = false;
            for (var j = 0; j < nhom_quyen_ct.length; j++) {
                if (dsQuyen[i].nhom_chuc_nang === nhom_quyen_ct[j].quyen) {
                    if (nhom_quyen_ct[j].nhap == "1") {
                        dsQuyen[i].nhap = true;
                    }
                    if (nhom_quyen_ct[j].xem == "1") {
                        dsQuyen[i].xem = true;
                    }
                }
            }
        }
        var count = dsQuyen.length;
        var count_nhap = dsQuyen.where(n => n.nhap).length;
        var count_xem = dsQuyen.where(n => n.xem).length;
        if (count === count_nhap)
            $("#nhap_tat_ca").prop("checked", true);
        else
            $("#nhap_tat_ca").prop("checked", false);

        if (count === count_xem)
            $("#xem_tat_ca").prop("checked", true);
        else
            $("#xem_tat_ca").prop("checked", false);

        ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: dsQuyen });
    });
    _frmThemNhomQuyenChiTiet.getControl('nhom').addEventChange(val => {
        if (val != '') {
            _frmThemNhomQuyenChiTiet.getControl('nhom_moi').prop('readonly', true);
            _frmThemNhomQuyenChiTiet.getControl('nhom_moi').val(val);
            _frmThemNhomQuyenChiTiet.getControl('ten').val(obj_nhom_quyen.nhom_quyen.where(n => n.nhom == val).firstOrDefault().ten);

            var dsQuyen = JSON.parse(JSON.stringify(objDanhMuc.quyen));
            var nhom_quyen_ct = obj_nhom_quyen.nhom_quyen_ct.where(n => n.nhom == val);
            for (var i = 0; i < dsQuyen.length; i++) {
                dsQuyen[i].xem = false;
                dsQuyen[i].nhap = false;
                for (var j = 0; j < nhom_quyen_ct.length; j++) {
                    if (dsQuyen[i].nhom_chuc_nang === nhom_quyen_ct[j].quyen) {
                        if (nhom_quyen_ct[j].nhap == "1") {
                            dsQuyen[i].nhap = true;
                        }
                        if (nhom_quyen_ct[j].xem == "1") {
                            dsQuyen[i].xem = true;
                        }
                    }
                }
            }
            var count = dsQuyen.length;
            var count_nhap = dsQuyen.where(n => n.nhap).length;
            var count_xem = dsQuyen.where(n => n.xem).length;
            if (count === count_nhap)
                $("#nhap_tat_ca_cau_hinh").prop("checked", true);
            else
                $("#nhap_tat_ca_cau_hinh").prop("checked", false);

            if (count === count_xem)
                $("#xem_tat_ca_cau_hinh").prop("checked", true);
            else
                $("#xem_tat_ca_cau_hinh").prop("checked", false);

            ESUtil.genHTML("templateDsChucNangCauHinh", "bodyTablePhanQuyenCauHinh", { ds_quyen: dsQuyen });
        } else {
            _frmThemNhomQuyenChiTiet.clearErrorMessage();
            _frmThemNhomQuyenChiTiet.resetForm();
            _frmThemNhomQuyenChiTiet.getControl('nhom_moi').prop('readonly', false);
            var dsQuyen = JSON.parse(JSON.stringify(objDanhMuc.quyen));
            for (var i = 0; i < dsQuyen.length; i++) {
                dsQuyen[i].xem = false;
                dsQuyen[i].nhap = false;
            }
            ESUtil.genHTML("templateDsChucNangCauHinh", "bodyTablePhanQuyenCauHinh", { ds_quyen: dsQuyen });
        }
    });
    _frmPhanCapGiamDinhBoiThuong.getControl('nhom_phan_cap').addEventChange(val => {
        var nv = _frmPhanCapGiamDinhBoiThuong.getControl("nv").getValue();
        var ma_doi_tac_ql = _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue()
        if (nv == 'XE') {
            ma_doi_tac_ql = '';
        }
        var objNgay = {
            ma_doi_tac: nguoi_dung.ma_doi_tac,
            ma_doi_tac_ql: ma_doi_tac_ql,
            ma: nguoi_dung.ma,
            nv: nv
        }
        _userManagementService.layDSNgay(objNgay).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(response.state_info.message_body);
                return
            } else {
                if (res.data_info.length <= 0) {
                    _notifyService.error("Bạn chưa chọn ngày áp dụng");
                    return
                } else {
                    var nhom_pc = obj_nhom_pc.nhom_pc.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom == val).firstOrDefault();
                    $('#tam_ung_thanh_toan').find('input[name=tien_tam_ung]').val('');
                    $('#tam_ung_thanh_toan').find('input[name=tien_thanh_toan]').val('');
                    $('#tam_ung_thanh_toan_ng').find('input[name=tien_tam_ung]').val('');
                    $('#tam_ung_thanh_toan_ng').find('input[name=tien_thanh_toan]').val('');
                    if (val != '') {
                        _frmPhanCapGiamDinhBoiThuong.setData(res.data_info.phan_cap);
                        $('#tam_ung_thanh_toan').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(nhom_pc.so_tien));
                        $('#tam_ung_thanh_toan').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(nhom_pc.so_tien));
                        $('#tam_ung_thanh_toan_ng').find('input[name=tien_tam_ung]').val(ESUtil.formatMoney(nhom_pc.so_tien));
                        $('#tam_ung_thanh_toan_ng').find('input[name=tien_thanh_toan]').val(ESUtil.formatMoney(nhom_pc.so_tien));
                        var mdt = _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue();
                        objPhanCapCT["ds_lhnv"] = objDanhMuc.lhnv;
                        objPhanCapCT["ds_lhnv_tn"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx == 'VCX');
                        objPhanCapCT["ds_lhnv_bb"] = objDanhMuc.lhnv.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.vcx != 'VCX');
                        objPhanCapCT["sp_con_nguoi"] = objDanhMuc.sp_con_nguoi.where(n => n.ma_doi_tac == mdt);
                        objPhanCapCT["giam_dinh"] = [];
                        $.each(objPhanCapCT["ds_lhnv"], function (index, item) {
                            var obj_giam_dinh = {
                                hang_muc: "",
                                hang_muc_ten: "",
                                lh_nv: item.ma,
                                ma: "",
                                ma_chi_nhanh: "",
                                ma_doi_tac: "",
                                nhom_hang_muc: "",
                                nv: "XE",
                                so_id: 0,
                                thay_the_sc: " ",
                                tien: nhom_pc.so_tien,
                                tien_uoc_bcgd: nhom_pc.so_tien
                            }
                            objPhanCapCT["giam_dinh"].push(obj_giam_dinh);
                        });
                        objPhanCapCT["boi_thuong"] = [];
                        $.each(objPhanCapCT["ds_lhnv"], function (index, item) {
                            var obj_giam_dinh = {
                                lh_nv: item.ma,
                                ma: "",
                                ma_chi_nhanh: "",
                                ma_doi_tac: "",
                                nv: "XE",
                                so_id: 0,
                                tien_bao_lanh: nhom_pc.so_tien,
                                tien_boi_thuong: nhom_pc.so_tien,
                                tien_phuong_an: nhom_pc.so_tien
                            }
                            objPhanCapCT["boi_thuong"].push(obj_giam_dinh);
                        });
                        objPhanCapCT["boi_thuong_nguoi"] = [];
                        $.each(objPhanCapCT["sp_con_nguoi"], function (index, item) {
                            var obj_giam_dinh = {
                                lh_nv: item.ma,
                                ma: "",
                                ma_chi_nhanh: "",
                                ma_doi_tac: "",
                                nv: "NG",
                                so_id: 0,
                                tien_bao_lanh: nhom_pc.so_tien,
                                tien_boi_thuong: nhom_pc.so_tien,
                                tien_phuong_an: nhom_pc.so_tien
                            }
                            objPhanCapCT["boi_thuong_nguoi"].push(obj_giam_dinh);
                        });
                        objPhanCapCT["boi_thuong_nguoi"] = [];
                        $.each(objPhanCapCT["sp_con_nguoi"], function (index, item) {
                            var obj_giam_dinh = {
                                lh_nv: item.ma,
                                ma: "",
                                ma_chi_nhanh: "",
                                ma_doi_tac: "",
                                nv: "NG",
                                so_id: 0,
                                tien_bao_lanh: nhom_pc.so_tien,
                                tien_boi_thuong: nhom_pc.so_tien,
                                tien_phuong_an: nhom_pc.so_tien
                            }
                            objPhanCapCT["boi_thuong_nguoi"].push(obj_giam_dinh);
                        });
                        /*objPhanCapCT["ds_phan_cap_chung"] = res.data_info.phan_cap_chung;*/
                        ESUtil.genHTML("templatePhanCapGiamDinhTNClone", "tablePhanCapGiamDinhBoby", objPhanCapCT);
                        ESUtil.genHTML("templatePhanCapGiamDinhBBClone", "tablePhanCapGiamDinhBobyBB", objPhanCapCT);
                        ESUtil.genHTML("templatePhanCapBoiThuongClone", "tablePhanCapBoiThuongBody", objPhanCapCT);
                        ESUtil.genHTML("templatePhanCapBoiThuongNguoiClone", "tablePhanCapBoiThuongNguoiBody", objPhanCapCT);
                        //ESUtil.genHTML("modalPhanCapChung_template", "tablePhanCapChungBody", objPhanCapCT);
                    }
                }
            }
        });
    });
    _frmThemNhomPCChiTiet.getControl('nhom').addEventChange(val => {
        if (val == "") {
            _frmThemNhomPCChiTiet.getControl('nhom_moi').prop('readonly', false);
        } else {
            _frmThemNhomPCChiTiet.getControl('nhom_moi').prop('readonly', true);
            _frmThemNhomPCChiTiet.getControl('nhom_moi').val(val);
            var pc = obj_nhom_pc.nhom_pc.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom == val).firstOrDefault();
            _frmThemNhomPCChiTiet.setData(pc);
            _frmThemNhomPCChiTiet.getControl('nv').trigger('select2:select');
        }
    });
    _btnNhapThongTinNguoiDung.click(function () {
        TRANG_THAI = THEM_MOI;
        arrDonViQuanLyNSD = [];
        arrDsQuyenNSD = [];

        _frmLuuThongTinNguoiDung.getControl("ma").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("mat_khau").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly(false);
        $("#btnKhoaTaiKhoan").hide();
        $("#btnXoaTaiKhoan").hide();
        $("#btnMoTaiKhoan").hide();
        bindLoaiTaiKhoanThemMoi();
        $("#chon_tat_ca_dvi").prop("checked", false);
        $("#rowPhanQuyen").show();
        $("#rowPhanCap").hide();
        var objDefault = {
            pm: "BT",
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_chi_nhanh: "",
            phong: "",
            ma: "",
            ten: "",
            mat_khau: "",
            ngay_sinh: dateNow.dateToNumber(),
            dthoai: "",
            email: "",
            ngay_hl: dateNow.dateToNumber(),
            ngay_kt: dateNowKT.dateToNumber()
        };
        $('#menuTab a[href="#phan_quyen_chuc_nang"]').tab('show');
        for (var i = 0; i < objDanhMuc.quyen.length; i++) {
            objDanhMuc.quyen[i].nhap = false;
            objDanhMuc.quyen[i].xem = false;
        }
        bindTableDonViQuanLy();

        ESUtil.genHTML("templateDsChucNang", "bodyTablePhanQuyen", { ds_quyen: objDanhMuc.quyen });
        _frmLuuThongTinNguoiDung.clearErrorMessage();
        _frmLuuThongTinNguoiDung.setData(objDefault);
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").trigger("select2:select");
        $("#divMatKhau label").addClass("_required");
        $("#divMatKhau input[name='mat_khau']").attr("required", "required");
        showModal();
    });
    _btnLuuThongTinNguoiDung.click(function () {
        _frmLuuThongTinNguoiDung = new FormService("frmLuuThongTinNguoiDung");
        if (_frmLuuThongTinNguoiDung.isValid()) {
            var formData = _frmLuuThongTinNguoiDung.getJsonData();
            if (formData.quyen === undefined) {
                formData.quyen = [];
            }
            if (formData.quanly === undefined) {
                formData.quanly = [];
            }
            for (var i_quyen = 0; i_quyen < formData.quyen.length; i_quyen++) {
                if (formData.quyen[i_quyen].nhap === undefined) {
                    formData.quyen[i_quyen].nhap = "0";
                }
                if (formData.quyen[i_quyen].xem === undefined) {
                    formData.quyen[i_quyen].xem = "0";
                }
            }
            formData.quanly = getDoiTacQuanLy();
            formData.pm = "BT";
            formData.trang_thai = 'D';
            if (formData.loai_tk == "S") {
                _notifyService.confirm("Bạn đang lưu tài khoản với quyền quản trị cao nhất SUPPER ADMIN. Bạn có chắc chắn muốn tạo tài khoản này không?", "", val => {
                    _userManagementService.luuThongTinNSD(formData).then(res => {
                        if (res.state_info.status === "OK") {
                            _notifyService.success("Lưu thông tin thành công.");
                            getPaging(1);
                            showModal(false);
                        }
                        else {
                            _notifyService.error(res.state_info.message_body);
                        }
                    });
                });
            }
            else {
                _userManagementService.luuThongTinNSD(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin thành công.");
                        getPaging(1);
                        showModal(false);
                    }
                    else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }

        }
    });
    _btnPhanChiaDiaBan.click(function () {
        _frmPhanDiaBanGiamDinh.getControl("mien").setValue('');
        ESUtil.genHTML("dsTinhThanhTemplate", "ds_tinh_thanh", { ds_tinh_thanh: [] });
        ESUtil.genHTML("dsQuanHuyenTemplate", "ds_quan_huyen", { ds_quan_huyen: [] });
        var ma_doi_tac = _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").val();
        var ma = _frmLuuThongTinNguoiDung.getControl("ma").val();
        if (ma_doi_tac === "") {
            _notifyService.error("Không tìm thấy thông tin đối tác");
            return;
        }
        if (ma === "") {
            _notifyService.error("Không tìm thấy mã người sử dụng");
            return;
        }
        _userManagementService.layDsDiaBanNSD({ ma_doi_tac: ma_doi_tac, ma: ma }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            arrTinh = [];
            for (var i = 0; i < res.data_info.tinh_thanh.length; i++) {
                arrTinh.push(res.data_info.tinh_thanh[i].tinh_thanh);
            }
            arrQuanHuyen = [];
            for (var j = 0; j < res.data_info.quan_huyen.length; j++) {
                arrQuanHuyen.push(res.data_info.quan_huyen[j].tinh_thanh + "." + res.data_info.quan_huyen[j].quan_huyen);
            }
            bindTinhThanh(arrTinh);
            bindQuanHuyen(arrTinh, arrQuanHuyen);
            _modalDiaBanGiamDinh.show();
        });
    });
    _btnLuuPhanDiaBan.click(function () {
        var ma_doi_tac = _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").val();
        var ma = _frmLuuThongTinNguoiDung.getControl("ma").val();
        if (ma_doi_tac === "") {
            _notifyService.error("Không tìm thấy thông tin đối tác");
            return;
        }
        if (ma === "") {
            _notifyService.error("Không tìm thấy mã người sử dụng");
            return;
        }

        var arrQuanHuyen = [];
        $('.dbgd_quan_huyen').each(function () {
            if (this.checked) {
                var val = $(this).val();
                var obj = {
                    quan_huyen: val.split(".")[1],
                    tinh_thanh: val.split(".")[0]
                };
                arrQuanHuyen.push(obj)
            }
        });
        if (arrQuanHuyen <= 0) {
            _notifyService.error("Bạn chưa chọn địa bàn Quận huyện.");
            return;
        }
        _userManagementService.luuThongTinDiaBanNSD({ ma_doi_tac: ma_doi_tac, ma: ma, dvhc: arrQuanHuyen }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin địa bàn giám định thành công");
            _modalDiaBanGiamDinh.hide();
        });
    });
    _btnTimKiem.click(function () {
        getPaging(1);
    });
    $('#btnPhanCapClone').click(function () {
        _frmPhanCapGiamDinhBoiThuong.resetForm();
        _frmPhanCapGiamDinhBoiThuong.getControl("ma").val(nguoi_dung.ma);
        _frmPhanCapGiamDinhBoiThuong.getControl("nv").setValue('XE');
        _frmPhanCapGiamDinhBoiThuong.getControl("nv").trigger('select2:select');
        _userManagementService.layNhomPhanCap().then(res => {
            obj_nhom_pc = res.data_info;
            _frmPhanCapGiamDinhBoiThuong.getControl('nhom_phan_cap').setDataSource(obj_nhom_pc.nhom_pc, "ten", "nhom", "Chọn nhóm phân cấp", "");
        });
        openTab('GDX');
        _modalPhanCapGiamDinhBoiThuong.show();
    });
    _btnThemMoiPhanCapGiamDinh.click(function () {
        var objGiamDinh = {
            lh_nv: "",
            thay_the_sc: "",
            hang_muc: "",
            tien: 0
        };
        objPhanCapCT.giam_dinh = layDsPhanCapGiamDinh();
        objPhanCapCT.giam_dinh.push(objGiamDinh);
        ESUtil.genHTML("templatePhanCapGiamDinh", "tablePhanCapGiamDinhBoby", objPhanCapCT, () => {
            $('#tablePhanCapGiamDinhBoby select.select2').select2();
            $("#divPhanCapGiamDinh").scrollTop($("#tablePhanCapGiamDinhBoby")[0].scrollHeight);
        });
    });
    _btnThemMoiPhanCapBoiThuong.click(function () {
        var objBoiThuong = {
            lh_nv: "",
            tien_phuong_an: 0,
            tien_bao_lanh: 0,
            tien_boi_thuong: 0
        };
        objPhanCapCT.boi_thuong = layDsPhanCapBoiThuong();
        objPhanCapCT.boi_thuong.push(objBoiThuong);
        ESUtil.genHTML("templatePhanCapBoiThuong", "tablePhanCapBoiThuongBody", objPhanCapCT, () => {
            $('#tablePhanCapBoiThuongBody select.select2').select2();
            $("#divPhanCapBoiThuong").scrollTop($("#tablePhanCapBoiThuongBody")[0].scrollHeight);
        });
    });
    _btnLuuPhanCapGiamDinhBoiThuong.click(function () {
        var obj = _frmPhanCapGiamDinhBoiThuong.getJsonData();
        obj.ma_doi_tac = nguoi_dung.ma_doi_tac;
        obj.ma = nguoi_dung.ma;
        if (obj.nv == 'XE' || obj.nv == 'XE_MAY') {
            obj.gd = layDsPhanCapGiamDinh();
            obj.gd_bb = layDsPhanCapGiamDinhBB();
            obj.bt = layDsPhanCapBoiThuong();
            //Kiểm tra dữ liệu
            var arrGD = [];
            for (var i = 0; i < obj.gd.length; i++) {
                if (obj.gd[i].lh_nv === undefined || obj.gd[i].lh_nv === null || obj.gd[i].lh_nv === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if ((obj.gd[i].thay_the_sc === undefined || obj.gd[i].thay_the_sc === null || obj.gd[i].thay_the_sc === "") && obj.gd[i].lh_nv !== "XE01") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn phương án khắc phục dòng " + (i + 1));
                    return;
                }
                if (obj.gd[i].tien === undefined || obj.gd[i].tien === null || obj.gd[i].tien === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập số tiền dòng " + (i + 1));
                    return;
                }
                if (arrGD.where(n => n.lh_nv === obj.gd[i].lh_nv && n.thay_the_sc === obj.gd[i].thay_the_sc).length <= 0) {
                    arrGD.push({
                        lh_nv: obj.gd[i].lh_nv,
                        thay_the_sc: obj.gd[i].thay_the_sc,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrGD.where(n => n.lh_nv === obj.gd[i].lh_nv && n.thay_the_sc === obj.gd[i].thay_the_sc).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrGD.length; i++) {
                var arr = arrGD[i].dong.split('|');
                var msg = "Phân cấp giám định: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ và phương án khắc phục";
                    _notifyService.error(msg);
                    return;
                }
            }

            var arrGDBB = [];
            for (var i = 0; i < obj.gd_bb.length; i++) {
                if (obj.gd_bb[i].lh_nv === undefined || obj.gd_bb[i].lh_nv === null || obj.gd_bb[i].lh_nv === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if ((obj.gd_bb[i].thay_the_sc === undefined || obj.gd_bb[i].thay_the_sc === null || obj.gd_bb[i].thay_the_sc === "")) {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn phương án khắc phục dòng " + (i + 1));
                    return;
                }
                if (obj.gd_bb[i].tien === undefined || obj.gd_bb[i].tien === null || obj.gd_bb[i].tien === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập số tiền dòng " + (i + 1));
                    return;
                }
                if (arrGDBB.where(n => n.lh_nv === obj.gd_bb[i].lh_nv && n.thay_the_sc === obj.gd_bb[i].thay_the_sc).length <= 0) {
                    arrGDBB.push({
                        lh_nv: obj.gd_bb[i].lh_nv,
                        thay_the_sc: obj.gd_bb[i].thay_the_sc,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrGDBB.where(n => n.lh_nv === obj.gd_bb[i].lh_nv && n.thay_the_sc === obj.gd_bb[i].thay_the_sc).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrGD.length; i++) {
                var arr = arrGD[i].dong.split('|');
                var msg = "Phân cấp giám định: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ và phương án khắc phục";
                    _notifyService.error(msg);
                    return;
                }
            }
            var arrBT = [];

            for (var i = 0; i < obj.bt.length; i++) {
                if (obj.bt[i].lh_nv === undefined || obj.bt[i].lh_nv === null || obj.bt[i].lh_nv === "") {
                    _notifyService.error("Phân cấp bồi thường: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_phuong_an === undefined || obj.bt[i].tien_phuong_an === null || obj.bt[i].tien_phuong_an === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền phương án dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_bao_lanh === undefined || obj.bt[i].tien_bao_lanh === null || obj.bt[i].tien_bao_lanh === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bảo lãnh dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_boi_thuong === undefined || obj.bt[i].tien_boi_thuong === null || obj.bt[i].tien_boi_thuong === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bồi thường dòng " + (i + 1));
                    return;
                }
                if (arrBT.where(n => n.lh_nv === obj.bt[i].lh_nv).length <= 0) {
                    arrBT.push({
                        lh_nv: obj.bt[i].lh_nv,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrBT.where(n => n.lh_nv === obj.bt[i].lh_nv).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrBT.length; i++) {
                var arr = arrBT[i].dong.split('|');
                var msg = "Phân cấp bồi thường: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ";
                    _notifyService.error(msg);
                    return;
                }
            }
        }
        else if (obj.nv == 'NG') {
            obj.btn = layDsPhanCapBoiThuongNguoi();
            obj.tien_tam_ung = $('#tam_ung_thanh_toan_ng').find('input[name=tien_tam_ung]').val().replace(/[^0-9]+/g, '');;
            obj.tien_thanh_toan = $('#tam_ung_thanh_toan_ng').find('input[name=tien_thanh_toan]').val().replace(/[^0-9]+/g, '');;
            var arrBTN = [];
            for (var i = 0; i < obj.btn.length; i++) {
                if (obj.btn[i].lh_nv === undefined || obj.btn[i].lh_nv === null || obj.btn[i].lh_nv === "") {
                    _notifyService.error("Phân cấp bồi thường: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_phuong_an === undefined || obj.btn[i].tien_phuong_an === null || obj.btn[i].tien_phuong_an === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền phương án dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_bao_lanh === undefined || obj.btn[i].tien_bao_lanh === null || obj.btn[i].tien_bao_lanh === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bảo lãnh dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_boi_thuong === undefined || obj.btn[i].tien_boi_thuong === null || obj.btn[i].tien_boi_thuong === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bồi thường dòng " + (i + 1));
                    return;
                }
                if (arrBTN.where(n => n.lh_nv === obj.btn[i].lh_nv).length <= 0) {
                    arrBTN.push({
                        lh_nv: obj.btn[i].lh_nv,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrBTN.where(n => n.lh_nv === obj.btn[i].lh_nv).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrBTN.length; i++) {
                var arr = arrBTN[i].dong.split('|');
                var msg = "Phân cấp bồi thường: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ";
                    _notifyService.error(msg);
                    return;
                }
            }
        }
        _userManagementService.luuPhanCap(obj).then(res => {
            if (res.state_info.status != "OK") {
                return;
            }
            _notifyService.success("Lưu phân cấp giám định bồi thường thành công");
        });
    });
    $("#btnKhoaTaiKhoan").click(function () {
        _notifyService.confirm("Sau khi khóa tài khoản, mọi thao tác của người dùng sẽ không được thực hiện. Bạn có chắc chắn muốn khóa tài khoản này không?", "", () => {
            var obj = _frmLuuThongTinNguoiDung.getJsonData();
            obj.trang_thai = "K";
            _userManagementService.khoaTaiKhoan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmLuuThongTinNguoiDung.getControl("trang_thai").val("K");
                $("#btnKhoaTaiKhoan").hide();
                $("#btnMoTaiKhoan").show();
                _notifyService.success("Khóa tài khoản thành công.");
            });
        });
    });
    $("#btnMoTaiKhoan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn xóa tài khoản này không?", "", () => {
            var obj = _frmLuuThongTinNguoiDung.getJsonData();
            obj.trang_thai = "D";
            _userManagementService.moKhoaTaiKhoan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmLuuThongTinNguoiDung.getControl("trang_thai").val("D");
                $("#btnMoTaiKhoan").hide();
                $("#btnKhoaTaiKhoan").show();
                _notifyService.success("Mở khóa tài khoản thành công.");
            });
        });
    });
    $("#btnXoaTaiKhoan").click(function () {
        _notifyService.confirm("Sau khi mở khóa tài khoản, mọi thao tác của người dùng sẽ được thực hiện như bình thường. Bạn có chắc chắn muốn mở tài khoản này không?", "", () => {
            var obj = _frmLuuThongTinNguoiDung.getJsonData();
            obj.trang_thai = "X";
            _userManagementService.xoaTaiKhoan(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmLuuThongTinNguoiDung.getControl("trang_thai").val("X");
                $("#btnMoTaiKhoan").hide();
                $("#btnKhoaTaiKhoan").hide();
                $("#btnXoaTaiKhoan").hide();
                _notifyService.success("Xóa khóa tài khoản thành công.");
            });
        });
    });
    $("#btnThemMoiNgayPhanCap").click(function () {
        _frmThemPhanCap.clearErrorMessage();

        if (_frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue() == 'NG' && _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue() == '') {
            _notifyService.error('Chưa có mã đối tác quản lý');
            return;
        }
        $('#btnCopyNgayPhanCap').hide();
        $('#btnLuuNgayPhanCap').show();
        _modalThemPhanCap.show();
    });
    $('#btnLuuNgayPhanCap').click(function () {
        if (_frmThemPhanCap.isValid()) {
            var obj = _frmThemPhanCap.getJsonData();
            obj.ma_doi_tac = nguoi_dung.ma_doi_tac;
            obj.ma = nguoi_dung.ma;
            obj.nv = _frmPhanCapGiamDinhBoiThuong.getControl('nv').getValue();
            obj.ma_doi_tac_ql = _frmPhanCapGiamDinhBoiThuong.getControl('ma_doi_tac_ql').getValue();
            _userManagementService.luuPhanCapNgay(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getListNgay(() => {
                    getDetailPhanCapTheoNgay(res.out_value.so_id);
                });
                _notifyService.success("Thêm mới ngày phân cấp thành công.");
                _modalThemPhanCap.hide();
            });
        }
    });
    $('#btnXoaPhanCap').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa phân cấp này không?", "", val => {
            var obj = _frmPhanCapGiamDinhBoiThuong.getJsonData();
            obj.ma_doi_tac = nguoi_dung.ma_doi_tac;
            _userManagementService.deletePhanCapNgay(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getListNgay(() => {
                    getDetailPhanCapTheoNgay(res.out_value.so_id);
                });
                _notifyService.success("Xóa phân cấp thành công.");
            });
        });
    });
    $('#btnOpenCopyPhanCap').click(function () {
        _frmThemPhanCap.resetForm();
        _frmThemPhanCap.clearErrorMessage();
        $('#btnCopyNgayPhanCap').show();
        $('#btnLuuNgayPhanCap').hide();
        _modalThemPhanCap.show();
    });
    $('#btnCopyNgayPhanCap').click(function () {
        if (_frmThemPhanCap.isValid()) {
            var obj = _frmThemPhanCap.getJsonData();
            obj.ma_doi_tac = nguoi_dung.ma_doi_tac;
            obj.so_id = _frmPhanCapGiamDinhBoiThuong.getControl('so_id').val();
            _userManagementService.copyPhanCapNgay(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getListNgay(() => {
                    getDetailPhanCapTheoNgay(res.out_value.so_id_moi);
                });
                _notifyService.success("Sao chép phân cấp thành công.");
                _modalThemPhanCap.hide();
            });
        }
    });
    $("#btnLuuPhanCapChung").click(function () {
        var obj = _frmPhanCapGiamDinhBoiThuong.getJsonData();
        obj.ma_doi_tac = nguoi_dung.ma_doi_tac;
        var arr = getDataTablePhanCapChung();
        var data = {};
        for (let i = 0; i < arr.length; i++) {
            data[arr[i].ma] = arr[i].value;
            data[arr[i].ma_trang_thai] = arr[i].value_trang_thai;
        }
        var mergedObj = { ...obj, ...data };
        _userManagementService.luuThongTinPhanCapChung(mergedObj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
                return;
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        })
    });
    $("#btnCopyThongTinNguoiDung").click(function () {
        var obj = _frmLuuThongTinNguoiDung.getJsonData();
        TRANG_THAI = THEM_MOI;
        _frmLuuThongTinNguoiDung.getControl("ma").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("mat_khau").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("loai_tk").readOnly(false);
        $("#btnKhoaTaiKhoan").hide();
        $("#btnXoaTaiKhoan").hide();
        $("#btnMoTaiKhoan").hide();
        $("#rowPhanQuyen").show();
        $("#rowPhanCap").hide();
        var objDefault = {
            pm: "BT",
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_chi_nhanh: obj.ma_chi_nhanh,
            phong: obj.phong,
            ma: "",
            ma_chuc_danh: "",
            ten: "",
            mat_khau: "",
            ngay_sinh: dateNow.dateToNumber(),
            dthoai: "",
            email: "",
            ngay_hl: dateNow.dateToNumber(),
            ngay_kt: dateNowKT.dateToNumber(),
            loai_tk: obj.loai_tk
        };
        _frmLuuThongTinNguoiDung.clearErrorMessage();
        _frmLuuThongTinNguoiDung.setData(objDefault);
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").setValue(objDefault.ma_chi_nhanh);
        _frmLuuThongTinNguoiDung.getControl("ma_chi_nhanh").trigger("select2:select");
        _frmLuuThongTinNguoiDung.getControl("phong").setValue(objDefault.phong);
        $("#divMatKhau label").addClass("_required");
        $("#divMatKhau input[name='mat_khau']").attr("required", "required");
    });
    $("#chonTatCaPhuongAn").click(function () {
        if ($('#chonTatCaPhuongAn').is(':checked')) {
            var tien_phuong_an = $('input[data-field = tien_phuong_an]:first-child').val();
            $('input[data-field="tien_phuong_an"]').val(tien_phuong_an);
        }
    });
    $("#chonTatCaBaoLanh").click(function () {
        if ($('#chonTatCaBaoLanh').is(':checked')) {
            var tien_bao_lanh = $('input[data-field = tien_bao_lanh]:first-child').val();
            $('input[data-field="tien_bao_lanh"]').val(tien_bao_lanh);
        }
    });
    $("#chonTatCaBoiThuong").click(function () {
        if ($('#chonTatCaBoiThuong').is(':checked')) {
            var tien_boi_thuong = $('input[data-field = tien_boi_thuong]:first-child').val();
            $('input[data-field="tien_boi_thuong"]').val(tien_boi_thuong);
        }
    });
    $("#chonTatCaPhuongAn_xe").click(function () {
        if ($('#chonTatCaPhuongAn_xe').is(':checked')) {
            var bt_tien_phuong_an = $('input[data-field = bt_tien_phuong_an]:first-child').val();
            $('input[data-field="bt_tien_phuong_an"]').val(bt_tien_phuong_an);
        }
    });
    $("#chonTatCaBaoLanh_xe").click(function () {
        if ($('#chonTatCaBaoLanh_xe').is(':checked')) {
            var bt_tien_bao_lanh = $('input[data-field = bt_tien_bao_lanh]:first-child').val();
            $('input[data-field="bt_tien_bao_lanh"]').val(bt_tien_bao_lanh);
        }
    });
    $("#chonTatCaBoiThuong_xe").click(function () {
        if ($('#chonTatCaBoiThuong_xe').is(':checked')) {
            var bt_tien_boi_thuong = $('input[data-field = bt_tien_boi_thuong]:first-child').val();
            $('input[data-field="bt_tien_boi_thuong"]').val(bt_tien_boi_thuong);
        }
    });
    $("#chonTatCaTien_PCGDBB").click(function () {
        if ($('#chonTatCaTien_PCGDBB').is(':checked')) {
            var gd_tien = $('input[data-field = gd_tien]:first-child').val();
            $('input[data-field="gd_tien"]').val(gd_tien);
        }
    });
    $("#chonTatCaTienUoc_PCGDBB").click(function () {
        if ($('#chonTatCaTienUoc_PCGDBB').is(':checked')) {
            var tien_uoc_bcgd = $('input[data-field = tien_uoc_bcgd]:first-child').val();
            $('input[data-field="tien_uoc_bcgd"]').val(tien_uoc_bcgd);
        }
    });
    $("#btnThemNhomQuyenCt").click(function () {
        _frmThemNhomQuyenChiTiet.clearErrorMessage();
        _frmThemNhomQuyenChiTiet.resetForm();
        _userManagementService.layNhomQuyen().then(res => {
            obj_nhom_quyen = res.data_info;
            _frmThemNhomQuyenChiTiet.getControl('nhom').setDataSource(obj_nhom_quyen.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
            _frmThemNhomQuyenChiTiet.getControl('nhom').trigger('select2:select');
            _modalThemNhomQuyenChiTiet.show();
        });
    });
    $("#btnLuuNhomQuyen").click(function () {
        luuNhomQuyen();
    });
    $("#btnLuuDongNhomQuyen").click(function () {
        luuNhomQuyen(() => {
            _modalThemNhomQuyenChiTiet.hide();
        });
    });
    $("#btnThemNhomPhanCapCt").click(function () {
        _frmThemNhomPCChiTiet.clearErrorMessage();
        _frmThemNhomPCChiTiet.resetForm();
        ESUtil.genHTML("tblDsNgayBodyNhomPC_template", "tblDsNgayBodyNhomPC", { ds_ngay: [] });
        ESUtil.genHTML("templatePhanCapGiamDinhTNCloneNhomPC", "tablePhanCapGiamDinhBobyNhomPC", { ds_lhnv_tn: [] });
        ESUtil.genHTML("templatePhanCapGiamDinhBBCloneNhomPC", "tablePhanCapGiamDinhBobyBBNhomPC", { ds_lhnv_bb: [] });
        ESUtil.genHTML("templatePhanCapBoiThuongCloneNhomPC", "tablePhanCapBoiThuongBodyNhomPC", { ds_lhnv: [] });
        ESUtil.genHTML("templatePhanCapBoiThuongNguoiCloneNhomPC", "tablePhanCapBoiThuongNguoiBodyNhomPC", { sp_con_nguoi: [] });
        _userManagementService.layNhomPhanCap().then(res => {
            obj_nhom_pc = res.data_info;
            _frmThemNhomPCChiTiet.getControl('nhom').setDataSource(obj_nhom_pc.nhom_pc, "ten", "nhom", "Chọn nhóm phân cấp", "");
            _frmThemNhomPCChiTiet.getControl('nv').setValue('XE');
            _frmThemNhomPCChiTiet.getControl('nv').trigger('select2:select');
            _frmThemNhomPCChiTiet.getControl('nhom').trigger('select2:select');
            openTabNhomPC('GDX');
            _modalThemNhomPCChiTiet.show();
        });

    });
    $("#btnChonNsdPhanCap").click(function () {
        var arr = getCheckedAdNsd();
        if (arr != undefined && arr.length > 0) {
            var ad_nsd = "";
            $.each(arr, function (index, item) {
                if (ad_nsd == "") {
                    ad_nsd = item;
                } else {
                    ad_nsd = ad_nsd + ';' + item;
                }
            });
            _frmThemNhomPCChiTiet.getControl('ad_nsd').val(ad_nsd);
        }
        _modalDanhSachNsdPhanCap.hide();
    });
    $("#btnThemMoiNgayPhanCapNhomPC").click(function () {
        if (_frmThemNhomPCChiTiet.getControl('nv').getValue() == 'NG' && _frmThemNhomPCChiTiet.getControl('ma_doi_tac_ql').getValue() == '') {
            _notifyService.error('Chưa có mã đối tác quản lý');
            return;
        }
        _frmThemPhanCapNhomPC.clearErrorMessage();
        _frmThemPhanCapNhomPC.resetForm();
        _modalThemPhanCapNhomPC.show();
    });
    $('#btnLuuNgayPhanCapNhomPC').click(function () {
        if (_frmThemPhanCapNhomPC.isValid()) {
            var obj = _frmThemPhanCapNhomPC.getJsonData();
            obj.nhom_moi = _frmThemNhomPCChiTiet.getControl('nhom_moi').val();
            obj.ten = _frmThemNhomPCChiTiet.getControl('ten').val();
            obj.nv = _frmThemNhomPCChiTiet.getControl('nv').getValue();
            obj.ma_doi_tac_ql = _frmThemNhomPCChiTiet.getControl('ma_doi_tac_ql').getValue();
            _userManagementService.luuPhanCapNgayNhomPC(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getListNgayNhomPC(() => {
                    getDetailPhanCapTheoNgayNhomPC(res.out_value.so_id);
                });
                _notifyService.success("Thêm mới ngày phân cấp thành công.");
                _modalThemPhanCapNhomPC.hide();
            });
        }
    });
    $('#btnLuuPhanCapGiamDinhBoiThuongNhomPC').click(function () {
        var obj = _frmThemNhomPCChiTiet.getJsonData();
        if (obj.nv == 'XE' || obj.nv == 'XE_MAY') {
            obj.gd = layDsPhanCapGiamDinhNhomPC();
            obj.gd_bb = layDsPhanCapGiamDinhBBNhomPC();
            obj.bt = layDsPhanCapBoiThuongNhomPC();
            //Kiểm tra dữ liệu
            var arrGD = [];
            for (var i = 0; i < obj.gd.length; i++) {
                if (obj.gd[i].lh_nv === undefined || obj.gd[i].lh_nv === null || obj.gd[i].lh_nv === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if ((obj.gd[i].thay_the_sc === undefined || obj.gd[i].thay_the_sc === null || obj.gd[i].thay_the_sc === "") && obj.gd[i].lh_nv !== "XE01") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn phương án khắc phục dòng " + (i + 1));
                    return;
                }
                if (obj.gd[i].tien === undefined || obj.gd[i].tien === null || obj.gd[i].tien === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập số tiền dòng " + (i + 1));
                    return;
                }
                if (arrGD.where(n => n.lh_nv === obj.gd[i].lh_nv && n.thay_the_sc === obj.gd[i].thay_the_sc).length <= 0) {
                    arrGD.push({
                        lh_nv: obj.gd[i].lh_nv,
                        thay_the_sc: obj.gd[i].thay_the_sc,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrGD.where(n => n.lh_nv === obj.gd[i].lh_nv && n.thay_the_sc === obj.gd[i].thay_the_sc).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrGD.length; i++) {
                var arr = arrGD[i].dong.split('|');
                var msg = "Phân cấp giám định: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ và phương án khắc phục";
                    _notifyService.error(msg);
                    return;
                }
            }

            var arrGDBB = [];
            for (var i = 0; i < obj.gd_bb.length; i++) {
                if (obj.gd_bb[i].lh_nv === undefined || obj.gd_bb[i].lh_nv === null || obj.gd_bb[i].lh_nv === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if ((obj.gd_bb[i].thay_the_sc === undefined || obj.gd_bb[i].thay_the_sc === null || obj.gd_bb[i].thay_the_sc === "")) {
                    _notifyService.error("Phân cấp giám định: Bạn chưa chọn phương án khắc phục dòng " + (i + 1));
                    return;
                }
                if (obj.gd_bb[i].tien === undefined || obj.gd_bb[i].tien === null || obj.gd_bb[i].tien === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập số tiền dòng " + (i + 1));
                    return;
                }
                if (arrGDBB.where(n => n.lh_nv === obj.gd_bb[i].lh_nv && n.thay_the_sc === obj.gd_bb[i].thay_the_sc).length <= 0) {
                    arrGDBB.push({
                        lh_nv: obj.gd_bb[i].lh_nv,
                        thay_the_sc: obj.gd_bb[i].thay_the_sc,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrGDBB.where(n => n.lh_nv === obj.gd_bb[i].lh_nv && n.thay_the_sc === obj.gd_bb[i].thay_the_sc).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrGD.length; i++) {
                var arr = arrGD[i].dong.split('|');
                var msg = "Phân cấp giám định: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ và phương án khắc phục";
                    _notifyService.error(msg);
                    return;
                }
            }
            var arrBT = [];

            for (var i = 0; i < obj.bt.length; i++) {
                if (obj.bt[i].lh_nv === undefined || obj.bt[i].lh_nv === null || obj.bt[i].lh_nv === "") {
                    _notifyService.error("Phân cấp bồi thường: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_phuong_an === undefined || obj.bt[i].tien_phuong_an === null || obj.bt[i].tien_phuong_an === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền phương án dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_bao_lanh === undefined || obj.bt[i].tien_bao_lanh === null || obj.bt[i].tien_bao_lanh === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bảo lãnh dòng " + (i + 1));
                    return;
                }
                if (obj.bt[i].tien_boi_thuong === undefined || obj.bt[i].tien_boi_thuong === null || obj.bt[i].tien_boi_thuong === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bồi thường dòng " + (i + 1));
                    return;
                }
                if (arrBT.where(n => n.lh_nv === obj.bt[i].lh_nv).length <= 0) {
                    arrBT.push({
                        lh_nv: obj.bt[i].lh_nv,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrBT.where(n => n.lh_nv === obj.bt[i].lh_nv).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrBT.length; i++) {
                var arr = arrBT[i].dong.split('|');
                var msg = "Phân cấp bồi thường: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ";
                    _notifyService.error(msg);
                    return;
                }
            }
        }
        else if (obj.nv == 'NG') {
            obj.btn = layDsPhanCapBoiThuongNguoiNhomPC();
            obj.tien_tam_ung = $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_tam_ung]').val().replace(/[^0-9]+/g, '');;
            obj.tien_thanh_toan = $('#tam_ung_thanh_toan_ng_nhom_pc').find('input[name=tien_thanh_toan]').val().replace(/[^0-9]+/g, '');;
            var arrBTN = [];
            for (var i = 0; i < obj.btn.length; i++) {
                if (obj.btn[i].lh_nv === undefined || obj.btn[i].lh_nv === null || obj.btn[i].lh_nv === "") {
                    _notifyService.error("Phân cấp bồi thường: Bạn chưa chọn loại hình nghiệp vụ dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_phuong_an === undefined || obj.btn[i].tien_phuong_an === null || obj.btn[i].tien_phuong_an === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền phương án dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_bao_lanh === undefined || obj.btn[i].tien_bao_lanh === null || obj.btn[i].tien_bao_lanh === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bảo lãnh dòng " + (i + 1));
                    return;
                }
                if (obj.btn[i].tien_boi_thuong === undefined || obj.btn[i].tien_boi_thuong === null || obj.btn[i].tien_boi_thuong === "") {
                    _notifyService.error("Phân cấp giám định: Bạn chưa nhập tiền bồi thường dòng " + (i + 1));
                    return;
                }
                if (arrBTN.where(n => n.lh_nv === obj.btn[i].lh_nv).length <= 0) {
                    arrBTN.push({
                        lh_nv: obj.btn[i].lh_nv,
                        dong: (i + 1).toString()
                    });
                }
                else {
                    var pt = arrBTN.where(n => n.lh_nv === obj.btn[i].lh_nv).firstOrDefault();
                    pt.dong += "|" + (i + 1).toString();
                }
            }
            for (var i = 0; i < arrBTN.length; i++) {
                var arr = arrBTN[i].dong.split('|');
                var msg = "Phân cấp bồi thường: Dòng ";
                if (arr.length > 1) {
                    for (var j = 0; j < arr.length; j++) {
                        if (j == 0) {
                            msg += arr[j];
                        }
                        else {
                            msg += "," + arr[j];
                        }
                    }
                    msg += " bị trùng lặp loại hình nghiệp vụ";
                    _notifyService.error(msg);
                    return;
                }
            }
        }
        _userManagementService.luuPhanCapNhomPC(obj).then(res => {
            if (res.state_info.status != "OK") {
                return;
            }
            _notifyService.success("Lưu nhóm phân cấp giám định bồi thường thành công");
        });
    });
    $("#btnLuuPhanCapChungNhomPC").click(function () {
        var obj = _frmThemNhomPCChiTiet.getJsonData();
        var arr = getDataTablePhanCapChungNhomPC();
        var data = {};
        for (let i = 0; i < arr.length; i++) {
            data[arr[i].ma] = arr[i].value;
            data[arr[i].ma_trang_thai] = arr[i].value_trang_thai;
        }
        var mergedObj = { ...obj, ...data };
        _userManagementService.luuThongTinPhanCapChungNhomPC(mergedObj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
                return;
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        })
    });
    $("#btnXoaNhomQuyen").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa phân cấp này không?", "", val => {
            var obj = _frmThemNhomQuyenChiTiet.getJsonData();
            _userManagementService.xoaNhomQuyen(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _userManagementService.layNhomQuyen().then(res => {
                    obj_nhom_quyen = res.data_info;
                    _frmThemNhomQuyenChiTiet.getControl('nhom').setDataSource(obj_nhom_quyen.nhom_quyen, "ten", "nhom", "Chọn nhóm quyền", "");
                    _frmThemNhomQuyenChiTiet.getControl('nhom').setValue('');
                    _frmThemNhomQuyenChiTiet.getControl('nhom').trigger('select2:select');
                    getPaging(1);
                });
                _notifyService.success("Xóa nhóm quyền thành công.");
            });
        });
    });
    $('#btnImportExcelDsNsd').click(function () {
        _modalUploadExcel.show();
    });
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _userManagementService.importExcelDanhSachNsd(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#btnTaiTemplate").click(function () {
        var obj = {}
        obj.ma_mau_in = "ESCS_EXCEL_DANH_SACH_NSD";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, "template_import_danh_sach_nsd.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
});