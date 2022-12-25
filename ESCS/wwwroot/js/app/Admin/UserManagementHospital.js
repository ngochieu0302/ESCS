var objDanhMuc = {};
//Service
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _userManagementHospitalService = new UserManagementHospitalService();
var _healthClaimCommonService = new HealthClaimCommonService();

var _modalNguoiDung = new ModalService("modalNguoiDung");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinNguoiDung = new FormService("frmLuuThongTinNguoiDung");
var _modalBenhVien = new ModalDragService("modalBenhVien", undefined, "bottom");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "benh_vien", title: "Mã", width: "6%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên cơ sở y tế", width: "20%", headerSort: false },
    { field: "ma", title: "Tài khoản", width: "10%", hozAlign: "center", headerSort: false },
    { field: "dthoai", title: "Điện thoại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ngay_hl_hthi", title: "Ngày hiệu lực", width: "9%", hozAlign: "center", headerSort: false },
    { field: "ngay_kt_hthi", title: "Ngày kết thúc", width: "9%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "9%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];
var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _userManagementHospitalService.timKiemPTrang(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac == undefined || data.ma_doi_tac == null || data.ma_doi_tac == "") {
        return;
    }
    _userManagementHospitalService.xemChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinNguoiDung.resetForm();
        _frmLuuThongTinNguoiDung.clearErrorMessage();
        _frmLuuThongTinNguoiDung.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _modalNguoiDung.show();
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinNguoiDung.getControl("benh_vien").readOnly();
        _frmLuuThongTinNguoiDung.getControl("ma").readOnly();
        _frmLuuThongTinNguoiDung.getControl("ten").readOnly();
        $("#btnXoaChon").addClass('disabled-link');
    });
}
function chonBenhVien(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    }
    _modalBenhVien.show(el);
}

function xoaChon(el) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
    _frmLuuThongTinNguoiDung.getControl("ten").setValue('');
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _healthClaimCommonService.layDsBenhVien()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.benh_vien = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
            $("#modalBenhVienDanhSach .single_checked").click(function () {
                $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
    });

    $("#btnAdd").click(function () {
        _frmLuuThongTinNguoiDung.resetForm();
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinNguoiDung.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("ma").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("benh_vien").readOnly(false);
        _frmLuuThongTinNguoiDung.getControl("ten").readOnly();
        _frmLuuThongTinNguoiDung.clearErrorMessage();
        _frmLuuThongTinNguoiDung.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        $("#btnXoaChon").removeClass('disabled-link');
        $("#btnXoaChon").trigger('click');
        _modalNguoiDung.show();
    });
    //Thêm người sử dụng
    $("#btnLuuThongTinNguoiDung").click(function () {
        if (_frmLuuThongTinNguoiDung.isValid()) {
            var formData = _frmLuuThongTinNguoiDung.getJsonData();
            _userManagementHospitalService.Save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin người dùng thành công.");
                    getPaging(1);
                    _modalNguoiDung.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin người sử dụng
    $("#btnXoaThongTinNguoiDung").click(function () {
        var formData = _frmLuuThongTinNguoiDung.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin người sử dụng này không?", "", val => {
            _userManagementHospitalService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin người dùng thành công.");
                    getPaging(1);
                    _modalNguoiDung.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Chọn bệnh viện
    $("#btnChonBenhVien").click(function () {
        var target = _modalBenhVien.target;
        var val = $("#modalBenhVienDanhSach .modalBenhVienItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
            $(target).val(bv.ma);
            $(target).attr("col-val", bv.ma);
            _frmLuuThongTinNguoiDung.getControl("ten").setValue(bv.ten);
        }
        _modalBenhVien.hide();
    });
    //Tìm kiếm bênh viện
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

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });

    getPaging(1);
})