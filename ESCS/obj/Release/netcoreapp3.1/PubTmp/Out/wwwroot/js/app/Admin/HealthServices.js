var objDanhMuc = {};
var _frmSaveDichVu = new FormService("frmSaveDichVu");
var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _healthServicesSevice = new HealthServicesService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapDichVu = new ModalService("modalNhapDichVu");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_dich_vu", title: "Mã dịch vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_dich_vu", title: "Tên dịch vụ", width: "25%", hozAlign: "center", headerSort: false },
    { field: "ma_dich_vu_ct", title: "Mã dịch vụ CT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma_dich_vu_byt", title: "Mã dịch vụ BYT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "gia_dich_vu_byt", title: "Giá dịch vụ BYT", width: "10%", headerSort: false, hozAlign: "right", formatter: formatterMoney },
    { field: "gia_vien_phi", title: "Giá viện phí", width: "10%", headerSort: false, hozAlign: "right", formatter: formatterMoney },
    { field: "gia_dich_vu", title: "Giá dịch vụ", width: "10%", headerSort: false, hozAlign: "right", formatter: formatterMoney },
    { field: "ghi_chu", title: "Ghi chú", width: "15%", headerSort: false }
];
var _gridViewDichVu = new GridViewService("gridViewDichVu", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _healthServicesSevice.getpaging(objTimKiem).then(res => {
        _gridViewDichVu.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _healthServicesSevice.layThongTinChiTietDichVu(data).then(res => {
        var objDatact = res.data_info;
        _frmSaveDichVu.clearErrorMessage();
        _frmSaveDichVu.setData(objDatact);
        _modalNhapDichVu.show();
        row.select();
        _frmSaveDichVu.getControl("ma_doi_tac").readOnly();
        _frmSaveDichVu.getControl("ma_dich_vu").readOnly();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _healthServicesSevice.getListParentCode()
    ]).then(arrRes => {
            objDanhMuc.doi_tac = arrRes[0];

            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmSaveDichVu.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmSaveDichVu.getControl("ma_dich_vu_ct").setDataSource(arrRes[1].data_info, "ten_dich_vu", "ma_dich_vu", "Chọn mã cấp trên", '');
        });
    //Nhập thông tin dịch vụ
    $("#btnNhapDichVu").click(function () {
        _frmSaveDichVu.resetForm();
        _frmSaveDichVu.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveDichVu.getControl("ma_dich_vu").readOnly(false);
        _frmSaveDichVu.clearErrorMessage();

        _modalNhapDichVu.show();
    });
    //Lưu thông tin dịch vụ
    $("#btnLuuThongTinDichVu").click(function () {
        if (_frmSaveDichVu.isValid()) {
            var formData = _frmSaveDichVu.getJsonData();
            _healthServicesSevice.luuThongTinDichVu(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin dịch vụ sức khỏe thành công.");
                    getPaging(1);
                    _modalNhapDichVu.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin dịch vụ
    $("#btnXoaThongTinDichVu").click(function () {
        var formData = _frmSaveDichVu.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hiệu xe này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    //Export excel dịch vụ
    $("#btnExportExcelDichVu").click(function () {
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
        _healthServicesSevice.SaveDataExcel(obj).then(res => {
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