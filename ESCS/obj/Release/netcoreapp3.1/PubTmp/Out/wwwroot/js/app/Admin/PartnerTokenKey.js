var objDanhMuc = {};
var _frmSave = new FormService("frmSave");
var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _partnerTokenKeySevice = new PartnerTokenKeyService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhap = new ModalService("modalNhap");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var GRID_HO_SO_SO_DONG = 14;
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac", title: "Mã đối tác", width: "20%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac_ql", title: "Mã đối tác quản lý", width: "20%", hozAlign: "center", headerSort: false },
    { field: "token", title: "Token key", width: "35%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "20%", hozAlign: "center", headerSort: false }
];
var _gridViewMDTTK = new GridViewService("gridViewMDTTK", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _partnerTokenKeySevice.getpaging(objTimKiem).then(res => {
        _gridViewMDTTK.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewMDTTK.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewMDTTK.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _partnerTokenKeySevice.layThongTinMaDoiTacTokenKey(data).then(res => {
        var objDatact = res.data_info;
        _frmSave.clearErrorMessage();
        _frmSave.setData(objDatact);
        _modalNhap.show();
        row.select();
        _frmSave.getControl("ma_doi_tac").readOnly();
        _frmSave.getControl("ma_doi_tac_ql").readOnly();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];

        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        _frmTimKiem.getControl("ma_doi_tac_ql").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác quản lý", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("ma_doi_tac_ql").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác quản lý", ESCS_MA_DOI_TAC_DUY_NHAT);
    });
    //Nhập thông tin config
    $("#btnNhap").click(function () {
        _frmSave.resetForm();
        _frmSave.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSave.clearErrorMessage();
        _frmSave.getControl("ma_doi_tac").readOnly(false);
        _frmSave.getControl("ma_doi_tac_ql").readOnly(false);
        _modalNhap.show();
    });
    //Lưu thông tin config
    $("#btnLuuThongTin").click(function () {
        if (_frmSave.isValid()) {
            var formData = _frmSave.getJsonData();
            _partnerTokenKeySevice.luuThongTinMaDoiTacTokenKey(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin cấu hình thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin dịch vụ
    $("#btnXoaThongTin").click(function () {
        var formData = _frmSave.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình này không?", "", val => {
            _partnerTokenKeySevice.xoaThongTinMaDoiTacTokenKey(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin cấu hình thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });


    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });

    getPaging(1);
});