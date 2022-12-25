var objDanhMuc = {};

var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _rangeVehicleService = new RangeVehicleService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmSaveLoaiXe = new FormService("frmSaveLoaiXe");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapLoaiXe = new ModalService("modalNhapLoaiXe");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên loại xe", width: "35%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "30%", hozAlign: "center", headerSort: false }
];

var _gridViewLoaiXe = new GridViewService("gridViewLoaiXe", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _rangeVehicleService.timKiemLoaiXe(objTimKiem).then(res => {
        _gridViewLoaiXe.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _rangeVehicleService.thongTinChiTietLoaiXe(data).then(res => {
        var objDatact = res.data_info;
        _frmSaveLoaiXe.clearErrorMessage();
        _frmSaveLoaiXe.setData(objDatact);
        _modalNhapLoaiXe.show();
        row.select();
        _frmSaveLoaiXe.getControl("ma_doi_tac").readOnly();
        _frmSaveLoaiXe.getControl("ma").readOnly();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLoaiXe.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        
    });
    //Nhập thông tin loại xe
    $("#btnNhapLoaiXe").click(function () {
        _frmSaveLoaiXe.resetForm();
        _frmSaveLoaiXe.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLoaiXe.getControl("trang_thai").setValue(1);
        _frmSaveLoaiXe.getControl("ma_doi_tac").readOnly(false);
        _frmSaveLoaiXe.getControl("ma").readOnly(false);
        _frmSaveLoaiXe.getControl("hang_xe").readOnly(false);
        _frmSaveLoaiXe.clearErrorMessage();
        _modalNhapLoaiXe.show();
    });
    //Lưu thông tin loại xe
    $("#btnSaveLoaiXe").click(function () {
        if (_frmSaveLoaiXe.isValid()) {
            var formData = _frmSaveLoaiXe.getJsonData();
            _rangeVehicleService.luuLoaiXe(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin loại xe thành công.");
                    getPaging(1);
                    _modalNhapLoaiXe.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin loại xe
    $("#btnDeleteLoaiXe").click(function () {
        var formData = _frmSaveLoaiXe.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa loại xe này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    //Export excel loại xe
    $("#btnExportExcelLoaixe").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_LOAI_XE";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    //Màn hình tìm kiếm loại xe
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });

    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });

    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _rangeVehicleService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    getPaging(1);
});

