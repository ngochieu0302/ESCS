var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _branchListService = new BranchListService();
var _partnerListService = new PartnerListService();
var _configMapService = new ConfigMapService();
var _modalAdd = new ModalService("modalAdd");
var _frmSaveConfigMaps = new FormService("frmSaveConfigMaps");
var _frmTimKiem = new FormService("frmTimKiem");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false },
    { field: "ten_cnhanh", title: "Chi nhánh", width: "15%", hozAlign: "center", headerSort: false },
    { field: "key", title: "key", width: "25%", headerSort: false },
    { field: "ngay_ht_hthi", title: "Ngày tạo", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ngay_hl_hthi", title: "Ngày hiệu lực", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ngay_kt_hthi", title: "Ngày kết thúc", hozAlign: "center", width: "10%", headerSort: false }
];

var _gridViewConfigMap = new GridViewService("gridViewConfigMap", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configMapService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewConfigMap.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewConfigMap.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewConfigMap.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _configMapService.getdetailConfigMaps(data).then(res => {
        console.log(data);
        var objData = res.data_info;
        console.log(objData);
        _frmSaveConfigMaps.clearErrorMessage();
        _frmSaveConfigMaps.getControl("ma_doi_tac").readOnly();
        _frmSaveConfigMaps.setData(objData);
        _frmSaveConfigMaps.getControl("ma_doi_tac").trigger("select2:select");
        _frmSaveConfigMaps.getControl("ma_chi_nhanh").val(objData.ma_chi_nhanh);
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
        _frmSaveConfigMaps.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmSaveConfigMaps.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmSaveConfigMaps.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveConfigMaps.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    $("#btnAddConfigMap").click(function () {
        _frmSaveConfigMaps.resetForm();
        _frmSaveConfigMaps.getControl("ma_doi_tac").readOnly(false);
        _frmSaveConfigMaps.clearErrorMessage();
        _frmSaveConfigMaps.getControl("ap_dung").setValue("1");
        _modalAdd.show();
    });

    $("#btnSaveConfigMaps").click(function () {
        if (_frmSaveConfigMaps.isValid()) {
            var formData = _frmSaveConfigMaps.getJsonData();
            _configMapService.saveConfigMaps(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin dịch vụ google maps thành công.");
                    getPaging(1);
                    _modalAdd.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteConfigMaps").click(function () {
        var formData = _frmSaveConfigMaps.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dịch vụ google maps này không?", "", val => {
            _configMapService.deleteConfigMaps(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin dịch vụ google maps thành công.");
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
})