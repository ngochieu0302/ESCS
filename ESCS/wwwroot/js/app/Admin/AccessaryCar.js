var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _garalistService = new GaraListService();
var _partnerListService = new PartnerListService();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var _frmTimKiem = new FormService("frmTimKiem");

$(document).ready(function () {
    _service.all([
        _garalistService.layDsGara(),
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        objDanhMuc.gara = arrRes[0];
        objDanhMuc.doi_tac = arrRes[1];
        _frmTimKiem.getControl("gara").setDataSource(objDanhMuc.gara.data_info, "ten", "ma", "Chọn gara");
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[1].data_info != null && arrRes[1].data_info.length == 1) ? arrRes[1].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    })


})