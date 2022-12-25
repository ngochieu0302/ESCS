var objDanhMuc = {};
var _service = new Service();

var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _APIIntegrationService = new APIIntegrationService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalSaveThongTin = new ModalService("modalSaveThongTin");
var _frmSaveThongTin = new FormService("frmSaveThongTin");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_api", title: "Mã", width: "9%", hozAlign: "center", headerSort: false },
    { field: "ngay_hthi", title: "Ngày giờ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "NSD", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "data_response", title: "data_response", width: "45%", headerSort: false},
    { field: "ten_doi_tac", title: "Đối tác", width: "30%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _APIIntegrationService.getPaging(objTimKiem).then(res => {
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
    _APIIntegrationService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveThongTin.clearErrorMessage();
        _frmSaveThongTin.setData(objDatact);
        _modalSaveThongTin.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveThongTin.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
})
