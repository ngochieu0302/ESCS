var objDanhMuc = {};
var objData = null;
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var _service = new Service();
var _notifyService = new NotifyService();
var _categoryvehicleAIService = new CategoryvehicleAIService();
var _partnerListService = new PartnerListService();
var _uploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalNhapHangMucAI = new ModalService("modalNhapHangMucAI");

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinHangMucAI = new FormService("frmLuuThongTinHangMucAI");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "6%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên hạng mục", width: "20%", headerSort: false, hozAlign: "center"},
    { field: "ma_ai", title: "Mã AI", width: "20%", hozAlign: "center", headerSort: false },
    { field: "ten_ai", title: "Tên hạng mục AI", width: "20%", hozAlign: "center", headerSort: false },
    { field: "vi_tri_ai", title: "Vị trí AI", width: "7%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "NSD", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Tên đối tác", width: "15%", headerSort: false, hozAlign: "center" }
];

var _gridViewXeHangMucAI = new GridViewService("gridViewXeHangMucAI", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _categoryvehicleAIService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewXeHangMucAI.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _categoryvehicleAIService.layThongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTinHangMucAI.clearErrorMessage();
        _frmLuuThongTinHangMucAI.setData(objDatact);
        _modalNhapHangMucAI.show();
        row.select();
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinHangMucAI.getControl("ma").readOnly();
    });
}
function xemNoiDungFile(el) {
    _uploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinHangMucAI.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinHangMucAI.getControl("ma_doi_tac").setValue("");
        getPaging(1);
    });
    //Nhập thông tin xe hạng mục
    $("#btnNhapThongTinHangMucAI").click(function () {
        _frmLuuThongTinHangMucAI.resetForm();
        _frmLuuThongTinHangMucAI.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmLuuThongTinHangMucAI.getControl("ma").readOnly(false);
        _frmLuuThongTinHangMucAI.clearErrorMessage();
        _modalNhapHangMucAI.show();
    })
    //Lưu thông tin xe hạng mục
    $("#btnLuuThongTinHangMucAI").click(function () {
        if (_frmLuuThongTinHangMucAI.isValid()) {
            var formData = _frmLuuThongTinHangMucAI.getJsonData();
            formData.ma_doi_tac = ESCS_MA_DOI_TAC;
            _categoryvehicleAIService.luuThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin danh sách xe hạng mục thành công");
                    getPaging(1);
                    _modalNhapHangMucAI.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Export Excel thông tin xe hạng mục
    $("#btnExportExcelHangMucAI").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_XE_HANG_MUC_AI";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    })
    //Màn hình tìm kiếm thông tin xe hạng mục
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
        _categoryvehicleAIService.SaveDataExcel(obj).then(res => {
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