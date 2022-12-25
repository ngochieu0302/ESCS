var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _configurationSMSService = new ConfigurationSMSService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinCauHinhSMS = new FormService("frmLuuThongTinCauHinhSMS");
var _modalNhapCauHinhSMS = new ModalService("modalNhapCauHinhSMS");
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "noi_dung", title: "Nội dung", width: "30%", headerSort: false },
    { field: "mo_ta_tham_so", title: "Mô tả tham số", width: "30%", headerSort: false },
    { field: "kiem_duyet_hthi", title: "Kiểm duyệt", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewCauHinhSMS = new GridViewService("gridViewCauHinhSMS", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configurationSMSService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewCauHinhSMS.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCauHinhSMS.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCauHinhSMS.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();        
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _configurationSMSService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinCauHinhSMS.clearErrorMessage();
        _frmLuuThongTinCauHinhSMS.setData(objDatact);
        row.select();
        _frmLuuThongTinCauHinhSMS.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinCauHinhSMS.getControl("ma").readOnly();
        _modalNhapCauHinhSMS.show();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHinhSMS.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    $("#btnNhapCauHinhSMS").click(function () {
        _frmLuuThongTinCauHinhSMS.clearErrorMessage();
        _frmLuuThongTinCauHinhSMS.resetForm();
        _frmLuuThongTinCauHinhSMS.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHinhSMS.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinCauHinhSMS.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinCauHinhSMS.getControl("ma").readOnly(false);
        _frmLuuThongTinCauHinhSMS.getControl("trang_thai").setValue("D");
        _modalNhapCauHinhSMS.show();
    });
    $("#btnLuuThongTinCauHinhSMS").click(function () {
        if (_frmLuuThongTinCauHinhSMS.isValid()) {
            var formData = _frmLuuThongTinCauHinhSMS.getJsonData();
            _configurationSMSService.luuCauHinhSMS(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapCauHinhSMS.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});