var objDanhMuc = {};
var _notifyService = new NotifyService();
var _service = new Service();
var _damageLevelService = new DamageLevelService();
var _partnerListService = new PartnerListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmLuuThongTinMucDoTT = new FormService("frmLuuThongTinMucDoTT");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMucDoTT = new ModalService("modalNhapMucDoTT");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
var ObjDoiTac = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", align: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", align: "center", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "8%", align: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "pa_khac_phuc_hthi", title: "PA khắc phục", width: "8%", align: "center", headerSort: false },
    { field: "ky_hieu", title: "Ký hiệu", width: "15%", align: "center", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "8%", align: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Mã đối tác", width: "20%", headerSort: false }
];

var _gridViewMucDoTT = new GridViewService("gridViewMucDoTT", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _damageLevelService.paging(objTimKiem).then(res => {
        _gridViewMucDoTT.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _damageLevelService.getDetail(data).then(res => {
        var objDatact = res.data_info;
        ObjDoiTac = res.data_info.ma_doi_tac;
        _frmLuuThongTinMucDoTT.clearErrorMessage();
        _frmLuuThongTinMucDoTT.setData(objDatact);
        _modalNhapMucDoTT.show();
        row.select();
        _frmLuuThongTinMucDoTT.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinMucDoTT.getControl("ma").readOnly();
        _frmLuuThongTinMucDoTT.getControl("nhom").readOnly();
        if (res.data_info.nhom == "NG" || res.data_info.nhom == "TAI_SAN") {
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").readOnly();
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").setValue("");
        } else {
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").readOnly(false);
        }
        var arrCapTren = objDanhMuc.layDsMucDoTonThat.where(n => n.ma_doi_tac == ObjDoiTac && n.ma_ct == null);
        _frmLuuThongTinMucDoTT.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", res.data_info.ma_ct);
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _damageLevelService.layDsMucDoTonThat()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.layDsMucDoTonThat = arrRes[1].data_info;
       
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMucDoTT.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMucDoTT.getControl("ma_ct").setDataSource([], "ten", "ma", "Chọn mã cấp trên", "");
        getPaging(1);
    });
    _frmLuuThongTinMucDoTT.getControl('ma_doi_tac').addEventChange(val => {
        var arrCapTren = objDanhMuc.layDsMucDoTonThat.where(n => n.ma_doi_tac == val && n.ma_ct == null);
        _frmLuuThongTinMucDoTT.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", "");
    });

    _frmLuuThongTinMucDoTT.getControl("nhom").addEventChange(val => {
        if (val == "NG" || val == "TAI_SAN") {
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").readOnly();
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").setValue("");
            _frmLuuThongTinMucDoTT.getControl("ma_ct").setValue("");
        } else {
            _frmLuuThongTinMucDoTT.getControl("pa_khac_phuc").readOnly(false);
        }
    });
    //Nhập thông tin mức độ tổn thất
    $("#btnNhapThongTinMucDoTT").click(function () {
        _frmLuuThongTinMucDoTT.resetForm();
        _frmLuuThongTinMucDoTT.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMucDoTT.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinMucDoTT.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinMucDoTT.getControl("ma").readOnly(false);
        _frmLuuThongTinMucDoTT.getControl("nhom").readOnly(false);
        _frmLuuThongTinMucDoTT.clearErrorMessage();
        _frmLuuThongTinMucDoTT.getControl("trang_thai").setValue(1);
        _modalNhapMucDoTT.show();
    });
    //Lưu thông tin mức độ tổn thất
    $("#btnLuuThongTinMucDoTT").click(function () {
        if (_frmLuuThongTinMucDoTT.isValid()) {
            var formData = _frmLuuThongTinMucDoTT.getJsonData();
            _damageLevelService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin mức độ tổn thất thành công.");
                    getPaging(1);
                    _modalNhapMucDoTT.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin mức độ tổn thất
    $("#btnXoaThongTinMucDoTT").click(function () {
        var formData = _frmLuuThongTinMucDoTT.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa mức độ tổn thất này không?", "", val => {
            _damageLevelService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapMucDoTT.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //ExportExcel mức độ tổn thất
    $("#btnExportExcelMucDoTT").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_MUC_DO_TT";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    //Màn hình tìm kiếm
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
        _damageLevelService.SaveDataExcel(obj).then(res => {
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