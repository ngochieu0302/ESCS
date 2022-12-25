var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _accountEmailService = new AccountEmailService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTin = new FormService("frmLuuThongTin");

var _modalNhapThongTin = new ModalService("modalNhapThongTin");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;
var LOAI_MAIL = [
    { ma: "NOIBO", ten: "Nội bộ" }
];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_mail_server", title: "Mã", width: "6%", headerSort: false, hozAlign: "center" },
    { field: "tai_khoan", title: "Tài khoản", width: "20%", hozAlign: "center", headerSort: false },
    { field: "ten_hien_thi", title: "Tên hiển thị", width: "15%", headerSort: false },
    { field: "ap_dung_hthi", title: "Áp dụng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "mac_dinh_hthi", title: "Mặc định", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Mã đối tác", width: "35%",  headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _accountEmailService.getPaging(objTimKiem).then(res => {
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
    _accountEmailService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuuThongTin.resetForm();
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.setData(objData);
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTin.getControl("ma_mail_server").readOnly();
        _frmLuuThongTin.getControl("tai_khoan").readOnly();
        _modalNhapThongTin.show();
    });
};
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đơn vị", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đơn vị", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_mail_server").setDataSource(LOAI_MAIL, "ten", "ma", "Chọn loại email", LOAI_MAIL);
        getPaging(1);
    });
    $("#btnThemMoi").click(function () {
        _frmLuuThongTin.resetForm();
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTin.getControl("ma_mail_server").readOnly(false);
        _frmLuuThongTin.getControl("tai_khoan").readOnly(false);
        _modalNhapThongTin.show();
    });
    $("#btnLuuThongTin").click(function () {
        if (_frmLuuThongTin.isValid()) {
            var formData = _frmLuuThongTin.getJsonData();
            _accountEmailService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaThongTin").click(function () {
        var formData = _frmLuuThongTin.getJsonData();
        //_notifyService.confirmDelete("Bạn có chắc muốn xóa tài khoản mail này không?", "", val => {
        //    _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        //});
        _notifyService.confirmDelete("Bạn có chắc muốn xóa tài khoản mail này không?", "", val => {
            _accountEmailService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});