var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _configurationTPAService = new ConfigurationTPAService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapCauHinh = new ModalService("modalNhapCauHinh");
var _frmSaveCauHinh = new FormService("frmSaveCauHinh");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "25%", headerSort: false },
    { field: "ten_doi_tac_ql", title: "Đối tác quản lý", width: "25%", headerSort: false },
    { field: "ngay_ad_hthi", title: "Ngày", width: "8%", hozAlign: "center", headerSort: false },
    { field: "so_tien_pc", title: "Số tiền phân cấp", hozAlign: "right", width: "10%", headerSort: false }
];

var _gridViewCauHinh = new GridViewService("gridViewCauHinh", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configurationTPAService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewCauHinh.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCauHinh.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCauHinh.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    //if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
    //    return;
    //}
    _configurationTPAService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveCauHinh.resetForm();
        _frmSaveCauHinh.setData(objDatact);
        _frmSaveCauHinh.getControl("ma_doi_tac").readOnly();
        _frmSaveCauHinh.clearErrorMessage();
        _modalNhapCauHinh.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCauHinh.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCauHinh.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác quản lý", "");
        getPaging(1);
    });
    $("#btnNhapCauHinh").click(function () {
        _frmSaveCauHinh.resetForm();
        _frmSaveCauHinh.clearErrorMessage();
        _frmSaveCauHinh.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCauHinh.getControl("ma_doi_tac").readOnly(false);
        _modalNhapCauHinh.show();
    });
    $("#btnLuuThongTinCauHinh").click(function () {
        if (_frmSaveCauHinh.isValid()) {
            var formData = _frmSaveCauHinh.getJsonData();
            _configurationTPAService.SaveTPA(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapCauHinh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaThongTinCauHinh").click(function () {
        var formData = _frmSaveCauHinh.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _configurationTPAService.deleteTPA(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapCauHinh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    })
});
