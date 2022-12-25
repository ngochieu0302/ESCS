//create by : namnt
var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _configCallService = new ConfigCallService();
var _modalAdd = new ModalService("modalAdd");
var _frmSaveConfigCall = new FormService("frmSaveConfigCall");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;

var _frmTimKiem = new FormService("frmTimKiem");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false },
    { field: "ten_cnhanh", title: "Chi nhánh", width: "15%", hozAlign: "center", headerSort: false },
    { field: "sdt", title: "SĐT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "sid", title: "SID", width: "10%", hozAlign: "center", headerSort: false },
    { field: "secret", title: "SECRET", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ap_dung_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_hl_hthi", title: "Ngày hiệu lực", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_kt_hthi", title: "Ngày kết thúc", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "NSD", width: "15%", headerSort: false }
];

var _gridViewConfigCall = new GridViewService("gridViewConfigCall", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configCallService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewConfigCall.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewConfigCall.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewConfigCall.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _configCallService.getdetailConfigCall(data).then(res => {
        var objData = res.data_info;
        _frmSaveConfigCall.clearErrorMessage();
        _frmSaveConfigCall.getControl("ma_doi_tac").readOnly();
        _frmSaveConfigCall.setData(objData);
        _frmSaveConfigCall.getControl("ma_doi_tac").trigger("select2:select");
        _frmSaveConfigCall.getControl("ma_chi_nhanh").val(objData.ma_chi_nhanh);
        _modalAdd.show();
        row.select();
    });
};

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTacQTHT(), _branchListService.layDsChiNhanhQTHT()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSaveConfigCall.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmSaveConfigCall.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmSaveConfigCall.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveConfigCall.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    $("#btnAddConfigCall").click(function () {
        _frmSaveConfigCall.resetForm(); 
        _frmSaveConfigCall.getControl("ma_doi_tac").readOnly(false);
        _frmSaveConfigCall.clearErrorMessage();
        _frmSaveConfigCall.getControl("ap_dung").setValue("1");
        _modalAdd.show();
    })

    $("#btnSaveConfig").click(function () {
        if (_frmSaveConfigCall.isValid()) {
            var formData = _frmSaveConfigCall.getJsonData();
            _configCallService.saveConfigCall(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin dịch vụ thành công.");
                    getPaging(1);
                    _modalAdd.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteConfig").click(function () {
        var formData = _frmSaveConfigCall.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dịch vụ Video call - Voice call này không?", "", val => {
            _configCallService.deleteConfigCall(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin dịch vụ Video call - Voice call thành công.");
                    getPaging(1);
                    _modalAdd.hide();
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