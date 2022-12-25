var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _categoryPersonService = new CategoryPersonService();

var _modalNhap = new ModalService("modalNhap");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveHM = new FormService("frmSaveHM");

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "50%", headerSort: false },
    { field: "loai_hthi", title: "Loại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false },
    { field: "ten_doi_tac", title: "Tên đối tác", width: "15%", headerSort: false }
];

var _gridViewHM = new GridViewService("gridViewHM", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _categoryPersonService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewHM.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewHM.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHM.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _categoryPersonService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmSaveHM.clearErrorMessage();
        _frmSaveHM.setData(objData);
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
        _modalNhap.show();
        _frmSaveHM.getControl("ma_doi_tac").readOnly();
        _frmSaveHM.getControl("ma").readOnly();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveHM.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    });

    $("#btnNhap").click(function () {
        _frmSaveHM.resetForm();
        _frmSaveHM.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveHM.clearErrorMessage();
        _frmSaveHM.getControl("ma_doi_tac").readOnly(false);
        _frmSaveHM.getControl("ma").readOnly(false);
        _frmSaveHM.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhap.show();
    });

    $("#btnSave").click(function () {
        if (_frmSaveHM.isValid()) {
            var formData = _frmSaveHM.getJsonData();
            formData.nv = "NG"
            _categoryPersonService.saveCategoryperson(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXoa").click(function () {
        var formData = _frmSaveHM.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hạng mục này không?", "", val => {
            _categoryPersonService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    })
    getPaging(1);
})