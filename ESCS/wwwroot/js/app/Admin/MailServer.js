var objDanhMuc = {};
var _frmLuuMailServer = new FormService("frmLuuMailServer");
var _notifyService = new NotifyService();
var _mailServerService = new MailServerService();
var _partnerListService = new PartnerListService();
var _service = new Service();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMailServer = new ModalService("modalNhapMailServer");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;
var LOAI_MAIL = [
    { ma: "NOIBO", ten: "Nội bộ" }
];

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "smtp_server", title: "SMTP Server", width: "15%", headerSort: false },
    { field: "ap_dung_hthi", title: "Áp dụng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Mã đối tác", width: "35%", hozAlign: "center", headerSort: false }
];

var _gridViewMailServer = new GridViewService("gridViewMailServer", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _mailServerService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewMailServer.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewMailServer.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewMailServer.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _mailServerService.xemChitietMailServer(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuuMailServer.resetForm();
        _frmLuuMailServer.clearErrorMessage();
        _frmLuuMailServer.setData(objData);
        _frmLuuMailServer.getControl("ma_doi_tac").readOnly();
        _frmLuuMailServer.getControl("ma").readOnly();
        _modalNhapMailServer.show();
    });
};
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đơn vị", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuMailServer.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đơn vị", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuMailServer.getControl("ma").setDataSource(LOAI_MAIL, "ten", "ma", "Chọn loại email", LOAI_MAIL);
        getPaging(1);
    });
    $("#btnNhapMailServer").click(function () {
        _frmLuuMailServer.resetForm();
        _frmLuuMailServer.clearErrorMessage();
        _frmLuuMailServer.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuMailServer.getControl("ma_doi_tac").readOnly(false);
        _frmLuuMailServer.getControl("ma").readOnly(false);
        _modalNhapMailServer.show();
    });
    $("#btnLuuMailServer").click(function () {
        if (_frmLuuMailServer.isValid()) {
            var formData = _frmLuuMailServer.getJsonData();
            _mailServerService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapMailServer.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaMailServer").click(function () {
        var formData = _frmLuuMailServer.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa tài khoản mail server này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
        //_notifyService.confirmDelete("Bạn có chắc muốn xóa tài khoản mail server này không?", "", val => {
        //    _mailServerService.xoaThongTin(formData).then(res => {
        //        if (res.state_info.status === "OK") {
        //            _notifyService.success("Xóa thông tin thành công");
        //            getPaging(1);
        //            _modalNhapMailServer.hide();
        //        }
        //        else {
        //            _notifyService.error(res.state_info.message_body);
        //        }
        //    });
        //});
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});