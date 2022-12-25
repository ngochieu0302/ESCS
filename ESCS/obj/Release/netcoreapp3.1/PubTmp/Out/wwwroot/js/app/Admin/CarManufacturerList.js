var objDanhMuc = {};
var _frmLuuThongTinHangXe = new FormService("frmLuuThongTinHangXe");
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _carmanufacturerListService = new CarManufacturerListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapHangXe = new ModalService("modalNhapHangXe");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var arrNV = [
    { ma: "XE", ten: "Xe ô tô" },
    {ma: "XE_MAY", ten: "Xe máy"},
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Tên", width: "35%", headerSort: false }
];
var _gridViewHangXe = new GridViewService("gridViewHangXe", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _carmanufacturerListService.timKiemHangXe(objTimKiem).then(res => {
        _gridViewHangXe.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _carmanufacturerListService.layThongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTinHangXe.clearErrorMessage();
        _frmLuuThongTinHangXe.setData(objDatact);
        _modalNhapHangXe.show();
        row.select();
        _frmLuuThongTinHangXe.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinHangXe.getControl("ma").readOnly();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("nv").setDataSource(arrNV, "ten", "ma", "Chọn nghiệp vụ", "");
        _frmLuuThongTinHangXe.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    //Nhập thông tin hãng xe
    $("#btnNhapThongTinHangXe").click(function() {
        _frmLuuThongTinHangXe.resetForm();
        _frmLuuThongTinHangXe.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinHangXe.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinHangXe.getControl("ma").readOnly(false);
        _frmLuuThongTinHangXe.getControl("trang_thai").setValue(1);
        _frmLuuThongTinHangXe.clearErrorMessage();
        _modalNhapHangXe.show();
    });
    //Lưu thông tin hãng xe
    $("#btnLuuThongTinHangXe").click(function() {
        if (_frmLuuThongTinHangXe.isValid()) {
            var formData = _frmLuuThongTinHangXe.getJsonData();
            _carmanufacturerListService.luuThongTinHangXe(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin hãng xe thành công.");
                    getPaging(1);
                    _modalNhapHangXe.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin hãng xe
    $("#btnXoaThongTinHangXe").click(function() {
        var formData = _frmLuuThongTinHangXe.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hãng xe này không?",
            "",
            val => {
                _notifyService.warning(
                    "Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
            });
    });
    //Export excel hãng xe
    $("#btnExportExcelCarManufacture").click(function() {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_HANG_XE";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            console.log(res);
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
    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function() {
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
        _carmanufacturerListService.SaveDataExcel(obj).then(res => {
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
});