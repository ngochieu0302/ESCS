var objDanhMuc = {};
var _common = new CommonService();
var _service = new Service();
var _diseasesListService = new DiseasesListService();
var _partnerListService = new PartnerListService();
var _notifyService = new NotifyService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();

var _frmTimKiem = new FormService("FrmSearch");
var _frmChiTietBenh = new FormService("frmChiTietBenh");
var _modalChiTietBenh = new ModalService("modalChiTietBenh");
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

const GRID_HO_SO_SO_DONG = 14;
const CONSTANT_PM = 'BT';

var configColumn = [
    { field: "sott", title: "STT", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ten_doi_tac", title: "Mã đối tác", width: "15%", headerSort: false, formatter: "html" },
    { field: "ma_ct", title: "Mã cấp trên", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã bệnh", width: "8%", headerSort: false, hozAlign: "center" },
    { field: "ten_e", title: "Tên tiếng anh", width: "20%", headerSort: false },
    { field: "ten_v", title: "Tên tiếng việt", width: "20%", headerSort: false },
    { field: "ma_byt", title: "Mã bộ y tế", width: "5%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "Người sử dụng", width: "10%", headerSort: false, formatter: formatterMoney },
    { field: "benh_db", title: "Bệnh đặc biệt", width: "8%", hozAlign: "center", headerSort: false },
    { field: "benh_bs", title: "Bệnh bẩm sinh", width: "8%", hozAlign: "center", headerSort: false },
    { field: "benh_td", title: "Bệnh tình dục", width: "8%", hozAlign: "center", headerSort: false },
    { field: "benh_cs", title: "Bệnh có sẵn", width: "8%", hozAlign: "center", headerSort: false }
];

var _gridViewDanhSachBenh = new GridViewService("gridViewDanhSachBenh", configColumn, getPaging, rowClick);

function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _diseasesListService.paging(objTimKiem).then(res => {
            _gridViewDanhSachBenh.setDataSource(res, trang, 14);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewDanhSachBenh.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewDanhSachBenh.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
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
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, ma: data.ma};
    _diseasesListService.layThongTinChiTietBenh(objGetDetail).then(res => {
        var objDatact = res.data_info;
        if (row !== undefined) {
            row.select();
            $('#ten_benh').html(objDatact.ten_v);
            ESUtil.genHTML("templateThongTinBenh", "thongTinBenh", objDatact);
            _modalChiTietBenh.show();
        }
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _diseasesListService.base.all([
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        getPaging(1);
    });

    $("#btnExportExcelDiseasList").click(function() {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_LOAI_BENH";
        console.log(obj.ma_mau_in);
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

    $('#btnTimKiemBenh').click(function() {
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
        _diseasesListService.SaveDataExcel(obj).then(res => {
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