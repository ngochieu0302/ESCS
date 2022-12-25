var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _guestAssessService = new GuestAssessService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhap = new ModalService("modalNhap");
var _frmSave = new FormService("frmSave");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", align: "center", headerSort: false },
    { field: "noi_dung", title: "Nội dung", width: "30%", headerSort: false },
    { field: "nv", title: "Nghiệp vụ", width: "10%", align: "center", headerSort: false },
    { field: "ngay_ad_hthi", title: "Ngày áp dụng", width: "10%", align: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];
var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _guestAssessService.timKiemPTrang(objTimKiem).then(res => {
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
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _guestAssessService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSave.resetForm();
        _frmSave.setData(objDatact);
        _frmSave.getControl("ma_doi_tac").readOnly();
        _frmSave.getControl("ma").readOnly();
        _frmSave.clearErrorMessage();
        _modalNhap.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _branchListService.layDsChiNhanh()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });
    _frmSave.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        _frmSave.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh");
    });
    //Nhập thông tin khách hàng đánh giá
    $("#btnNhapThongTin").click(function () {
        _frmSave.resetForm();
        _frmSave.clearErrorMessage();
        _frmSave.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("nv").setValue("XE");
        _frmSave.getControl("ma_doi_tac").readOnly(false);
        _frmSave.getControl("ma").readOnly(false);
        _modalNhap.show();
    });
    $("#btnLuuThongTin").click(function () {
        if (_frmSave.isValid()) {
            var formData = _frmSave.getJsonData();
            _guestAssessService.luuKhDanhGia(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin
    $("#btnXoaThongTin").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            var formData = _frmSave.getJsonData();
            _guestAssessService.xoaKhDanhGia(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhap.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
})