var objDanhMuc = {};
var _service = new Service();

var _notifyService = new NotifyService();
var _UploadExcelService = new UploadExcelService();
var _unitService = new UnitService();
var _partnerListService = new PartnerListService();

var _frmLuuThongTin = new FormService("frmLuuThongTin");
var _frmTimKiem = new FormService("frmTimKiem");

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalNhapThongTin = new ModalService("modalNhapThongTin");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _unitService.getPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _unitService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.setData(objDatact);
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTin.getControl("ma").readOnly();
        _frmLuuThongTin.getControl("nhom").readOnly();
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _modalNhapThongTin.show();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _unitService.getAll()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.don_vi_tinh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });

    //Nhập thông tin 
    $("#btnThemMoi").click(function () {
        _frmLuuThongTin.resetForm();
        _frmLuuThongTin.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTin.getControl("ma").readOnly(false);
        _frmLuuThongTin.getControl("nhom").readOnly(false);
        _frmLuuThongTin.getControl("trang_thai").setValue(1);
        _frmLuuThongTin.clearErrorMessage();
        $("#modal-user-log").html("");
        _modalNhapThongTin.show();
    })

    //Lưu thông tin 
    $("#btnLuuThongTin").click(function () {
        if (_frmLuuThongTin.isValid()) {
            var formData = _frmLuuThongTin.getJsonData();
            _unitService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin đơn vị tính thành công");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin
    $("#btnDelete").click(function () {
        var formData = _frmLuuThongTin.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            if (formData.ma == null || formData.ma == undefined || formData.ma.trim() == "") {
                _notifyService.error("Chưa có mã đơn vị tính cần xóa");
                return;
            }
            _unitService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin đơn vị tính thành công");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    ////Export excel đơn vị tính
    $("#btnExportExcel").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DON_VI_TINH";
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
        _unitService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công");
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
    getPaging(1);
})
