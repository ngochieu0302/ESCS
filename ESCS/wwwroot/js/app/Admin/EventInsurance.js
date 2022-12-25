var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _eventInsuranceService = new EventInsuranceService();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinSuKienBH = new FormService("frmLuuThongTinSuKienBH");
var _modalNhapSuKienBH = new ModalService("modalNhapSuKienBH");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewSuKienBH = new GridViewService("gridViewSuKienBH", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _eventInsuranceService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewSuKienBH.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewSuKienBH.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewSuKienBH.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.ma_doi_tac == undefined || data.ma_doi_tac == null || data.ma_doi_tac == "") {
        return;
    }
    _eventInsuranceService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuuThongTinSuKienBH.clearErrorMessage();
        _frmLuuThongTinSuKienBH.setData(objData);
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
        _modalNhapSuKienBH.show();
        _frmLuuThongTinSuKienBH.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinSuKienBH.getControl("ma").readOnly();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac()
        ]).then(arrRes => {
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            objDanhMuc.doi_tac = arrRes[0];

            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmLuuThongTinSuKienBH.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            getPaging(1);
        });
    // Nhập thông tin sự kiện bảo hiểm
    $("#btnNhapSuKienBH").click(function () {
        _frmLuuThongTinSuKienBH.resetForm();
        _frmLuuThongTinSuKienBH.clearErrorMessage();
        _frmLuuThongTinSuKienBH.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinSuKienBH.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinSuKienBH.getControl("ma").readOnly(false);
        _frmLuuThongTinSuKienBH.getControl("nv").setValue("XE");
        _frmLuuThongTinSuKienBH.getControl("trang_thai").setValue("D");
        $("#modal-user-log").html("");
        _modalNhapSuKienBH.show();
    });
    // Lưu thông tin sự kiện bảo hiểm
    $("#btnLuuSuKienBH").click(function () {
        if (_frmLuuThongTinSuKienBH.isValid()) {
            var formData = _frmLuuThongTinSuKienBH.getJsonData();
            _eventInsuranceService.luuSuKienBH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapSuKienBH.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    // Xóa thông tin sự kiện bảo hiểm
    $("#btnXoaSuKienBH").click(function () {
        var formData = _frmLuuThongTinSuKienBH.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin sự kiện bảo hiểm này không?", "", val => {
            _eventInsuranceService.xoaSuKienBH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapSuKienBH.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Tìm kiếm thông tin sự kiện bảo hiểm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});