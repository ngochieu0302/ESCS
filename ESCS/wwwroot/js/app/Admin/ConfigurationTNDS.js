var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _UploadExcelService = new UploadExcelService();
var _partnerListService = new PartnerListService();
var _configurationTNDSService = new ConfigurationTNDSService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmNhapConfigTNDS = new FormService("frmNhapConfigTNDS");
var _modalChiTietTiLeTT = new ModalService("modalChiTietTiLeTT");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var _dataPTTT = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ma_ct", title: "Mã cấp trên", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ngay_ad_hthi", title: "Ngày áp dụng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "40%", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "6%", hozAlign: "center",headerSort: false },
    { field: "pt_tu", title: "Phần trăm từ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "pt_toi", title: "Phần trăm tới", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
]

var _gridViewConfigTNDS = new GridViewService("gridViewConfigTNDS", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;

    _configurationTNDSService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewConfigTNDS.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewConfigTNDS.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewConfigTNDS.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    objGetDetail = { ma_doi_tac: data.ma_doi_tac, ma: data.ma, ngay_ad: data.ngay_ad };
    _configurationTNDSService.layThongTinChiTiet(objGetDetail).then(res => {
        var objDatact = res.data_info;
        if (row !== undefined) {
            row.select();
            $('#ten_tltt').html(objDatact.ten);
            ESUtil.genHTML("templateThongTinTiLeTT", "thongTinTiLeTT", objDatact);
            _modalChiTietTiLeTT.show();
        }
    });
}


function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _configurationTNDSService.layDsPhanTramThuongTat()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";

        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.layDsPhanTramThuongTat = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        /*_frmTimKiem.getControl("ngay_ad").setValue(parseInt(ngay_ad).numberToDate());*/
        _frmNhapConfigTNDS.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });

    $("#btnClose").click(function () {
        $("#inside-modal").esmodal("hide");
    });

    //Export excel 
    $("#btnExportExcel").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_PTTT";
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
        _configurationTNDSService.SaveDataExcel(obj).then(res => {
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
})