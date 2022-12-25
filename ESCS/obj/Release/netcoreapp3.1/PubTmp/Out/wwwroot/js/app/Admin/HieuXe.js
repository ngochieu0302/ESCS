var objDanhMuc = {};
var _frmSaveHieuXe = new FormService("frmSaveHieuXe");
var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _carManufacturerListService = new CarManufacturerListService();
var _hieuxeService = new HieuXeService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapHieuXe = new ModalService("modalNhapHieuXe");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
var arrNV = [
    { ma: "XE", ten: "Xe ô tô" },
    { ma: "XE_MAY", ten: "Xe máy" },
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên hiệu xe", width: "15%", hozAlign: "center", headerSort: false },
    { field: "hang_xe", title: "Hãng xe", width: "15%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", hozAlign: "center", headerSort: false }
];
var _gridViewHieuXe = new GridViewService("gridViewHieuXe", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _hieuxeService.timKiemHieuXe(objTimKiem).then(res => {
        _gridViewHieuXe.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _hieuxeService.layThongTinChiTietHieuXe(data).then(res => {
        var objDatact = res.data_info;
        _frmSaveHieuXe.clearErrorMessage();
        _frmSaveHieuXe.setData(objDatact);
        _modalNhapHieuXe.show();
        row.select();
        _frmSaveHieuXe.getControl("ma_doi_tac").readOnly();
        _frmSaveHieuXe.getControl("ma").readOnly();
        _frmSaveHieuXe.getControl("hang_xe").readOnly();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([
        _carManufacturerListService.layDsHangXe(),
        _partnerListService.layDsDoiTac()]).then(arrRes => {
        objDanhMuc.ds_hang_xe = arrRes[0];
        objDanhMuc.doi_tac = arrRes[1];

        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[1].data_info != null && arrRes[1].data_info.length == 1) ? arrRes[1].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("nv").setDataSource(arrNV, "ten", "ma", "Chọn nghiệp vụ", "");
        _frmSaveHieuXe.getControl("ma_doi_tac").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveHieuXe.getControl("hang_xe").setDataSource(objDanhMuc.ds_hang_xe.data_info, "ten", "ma", "Chọn hãng xe", "");
    });
    //Nhập thông tin hiệu xe
    $("#btnNhapHieuXe").click(function () {
        _frmSaveHieuXe.resetForm();
        _frmSaveHieuXe.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveHieuXe.getControl("ma_doi_tac").readOnly();
        _frmSaveHieuXe.getControl("ma").readOnly(false);
        _frmSaveHieuXe.getControl("hang_xe").readOnly(false);
        _frmSaveHieuXe.getControl("trang_thai").setValue(1);
        _frmSaveHieuXe.clearErrorMessage();

        _modalNhapHieuXe.show();
    });
    //Lưu thông tin hiệu xe
    $("#btnLuuThongTinHieuXe").click(function () {
        if (_frmSaveHieuXe.isValid()) {
            var formData = _frmSaveHieuXe.getJsonData();
            _hieuxeService.luuThongTinHieuXe(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin hiệu xe thành công.");
                    getPaging(1);
                    _modalNhapHieuXe.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin hiệu xe
    $("#btnXoaThongTinHieuXe").click(function () {
        var formData = _frmSaveHieuXe.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hiệu xe này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    //Export excel hiệu xe
    $("#btnExportExcelHieuXe").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_HIEU_XE";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res,
                obj.ma_mau_in +
                "_" +
                new Date().getFullYear() +
                new Date().getMonth() +
                new Date().getDay() +
                new Date().getHours() +
                new Date().getMinutes() +
                new Date().getSeconds() +
                new Date().getMilliseconds() +
                ".xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    //Màn hình tìm kiếm hiệu xe
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
        _hieuxeService.SaveDataExcel(obj).then(res => {
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