var _frmDetail = new FormService("frmDetail");
var _notifyService = new NotifyService();
var _service = new Service();
var _actionLogService = new ActionLogService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalDetail = new ModalService("modalDetail");


var configColumn = [
    { field: "index", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "datetime", title: "Thời gian", width: "14%", hozAlign: "center", headerSort: false },
    { field: "area", title: "Area", width: "14%", hozAlign: "center", headerSort: false },
    { field: "controller", title: "Controller", width: "14%", hozAlign: "center", headerSort: false },
    { field: "action", title: "Action", width: "14%", hozAlign: "center", headerSort: false },
    { field: "name", title: "File", width: "40%", hozAlign: "center", headerSort: false }
];
var _gridViewLog = new GridViewService("gridViewLog", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _actionLogService.timKiemPhanTrang(objTimKiem).then(res => {
        _gridViewLog.setDataSource(res, trang);
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _actionLogService.thongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmDetail.clearErrorMessage();
        _frmDetail.setData(objDatact);
        _modalDetail.show();
        row.select();
    });
};


$(document).ready(function () {
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});