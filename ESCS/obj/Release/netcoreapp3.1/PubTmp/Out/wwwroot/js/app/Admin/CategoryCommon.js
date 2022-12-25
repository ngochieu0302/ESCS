var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var _categorycommonService = new CategoryCommonService();
var _partnerListService = new PartnerListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveCode = new FormService("frmSaveCode");
var _modalNhapCode = new ModalService("modalNhapCode");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", headerSort: false, hozAlign: "center" },
    { field: "ten", title: "Tên", width: "18%", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "8%", headerSort: false, hozAlign: "center" },
    { field: "nhom_hthi", title: "Nhóm", width: "12%", headerSort: false, hozAlign: "center" },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ghi_chu", title: "Ghi chú", width: "12%", headerSort: false },
    { field: "nsd", title: "Người cập nhật", width: "10%", headerSort: false, hozAlign: "center"},
    { field: "ngay_cap_nhat", title: "Ngày cập nhật", width: "10%", headerSort: false, hozAlign: "center"},
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false, hozAlign: "center" }
];

var _gridViewCode = new GridViewService("gridViewCode", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _categorycommonService.timKiemCode(objTimKiem).then(res => {
        _gridViewCode.setDataSource(res, trang);
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _categorycommonService.layThongTinChiTietCode(data).then(res => {
        _frmSaveCode.clearErrorMessage();
        var objData = res.data_info;
        _frmSaveCode.setData(objData);
        row.select();
        _frmSaveCode.getControl("ma_doi_tac").readOnly();
        _frmSaveCode.getControl("ma").readOnly();
        _frmSaveCode.getControl("nv").readOnly();
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay+")");
        _modalNhapCode.show();
    });
};

function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCode.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        getPaging(1);
    });

    $("#btnNhapThongTinCode").click(function () {
        _frmSaveCode.resetForm();
        _frmSaveCode.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCode.clearErrorMessage();
        _frmSaveCode.getControl("ma_doi_tac").readOnly(false);
        _frmSaveCode.getControl("ma").readOnly(false);
        _frmSaveCode.getControl("nv").readOnly(false);
        _frmSaveCode.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhapCode.show();
    });

    $("#btnSaveCode").click(function () {
        if (_frmSaveCode.isValid()) {
            var formData = _frmSaveCode.getJsonData();
            _categorycommonService.luuThongTinCode(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin bộ mã chung thành công.");
                    getPaging(1);
                    _modalNhapCode.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteCode").click(function () {
        var formData = _frmSaveCode.getJsonData();
        _notifyService.confirmDelete("Xóa dữ liệu danh mục khi đã được sử dụng sẽ ảnh hưởng đến dữ liệu khác. Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            _categorycommonService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin bộ mã chung thành công.");
                    getPaging(1);
                    _modalNhapCode.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    $("#btnExportExcelCateCommon").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_MA_DUNG_CHUNG";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
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
        _categorycommonService.SaveDataExcel(obj).then(res => {
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

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});