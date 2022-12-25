var objDanhMuc = {};

var _notifyService = new NotifyService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _partnerListService = new PartnerListService();
var _service = new Service();
var _UploadExcelService = new UploadExcelService();

var _frmLuuThongTinMaTinh = new FormService("frmLuuThongTinMaTinh");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMaTinh = new ModalService("modalNhapMaTinh");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_phuong", title: "Mã phường", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_phuong", title: "Tên phường", width: "20%", headerSort: false },
    { field: "ma_quan", title: "Mã quận", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_quan", title: "Tên quận", width: "20%", headerSort: false },
    { field: "ma_tinh", title: "Mã tỉnh", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_tinh", title: "Tên tỉnh", width: "20%", headerSort: false },
    { field: "mien_ten", title: "Miền", width: "12%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewDonViHanhChinh = new GridViewService("gridViewDonViHanhChinh", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _administrativeUnitsService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewDonViHanhChinh.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _administrativeUnitsService.layThongTinChiTiet(data).then(res => {
        var objData1 = res.data_info;
        _frmLuuThongTinMaTinh.clearErrorMessage();
        _frmLuuThongTinMaTinh.setData(objData1);
        _modalNhapMaTinh.show();
        row.select();
        $("#modal-user-log").html("(" + objData1.nsd + " - " + objData1.ngay + ")");
        _frmLuuThongTinMaTinh.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinMaTinh.getControl("ma_tinh").readOnly();
        _frmLuuThongTinMaTinh.getControl("ma_quan").readOnly();
        _frmLuuThongTinMaTinh.getControl("ma_phuong").readOnly();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMaTinh.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });

    $("#btnNhapThongTinMaTinh").click(function () {
        _frmLuuThongTinMaTinh.resetForm();
        _frmLuuThongTinMaTinh.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMaTinh.clearErrorMessage();
        _frmLuuThongTinMaTinh.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinMaTinh.getControl("ma_tinh").readOnly(false);
        _frmLuuThongTinMaTinh.getControl("ma_quan").readOnly(false);
        _frmLuuThongTinMaTinh.getControl("ma_phuong").readOnly(false);
        _frmLuuThongTinMaTinh.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhapMaTinh.show();
    });

    $("#btnLuuThongTinMaTinh").click(function () {
        if (_frmLuuThongTinMaTinh.isValid()) {
            var formData = _frmLuuThongTinMaTinh.getJsonData();
            _administrativeUnitsService.luuDonViHanhChinh(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapMaTinh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXoaThongTinMaTinh").click(function () {
        var formData = _frmLuuThongTinMaTinh.getJsonData();
        _notifyService.confirmDelete("Xóa dữ liệu danh mục khi đã được sử dụng sẽ ảnh hưởng đến dữ liệu khác. Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            _administrativeUnitsService.xoaDonViHanhChinh(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin đơn vị hành chính thành công.");
                    getPaging(1);
                    _modalNhapMaTinh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    $("#btnExportExcelAdministrativeunits").click(function () {
        //console.log("123");
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_DON_VI_HANH_CHINH";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

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
        console.log(obj);
        _administrativeUnitsService.SaveDataExcel(obj).then(res => {
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

