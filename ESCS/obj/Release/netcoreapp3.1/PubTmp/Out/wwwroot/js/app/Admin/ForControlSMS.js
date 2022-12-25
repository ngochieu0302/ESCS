var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _forControlSMSService = new ForControlSMSService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinDoiSoatSMS = new FormService("frmLuuThongTinDoiSoatSMS");
var _modalDoiSoatSMS = new ModalService("modalDoiSoatSMS");

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var arrPm = [
    { ma: "GD", ten: "Giám định", nv: "XE" },
    { ma: "BT", ten: "Bồi thường", nv: "XE" },
    { ma: "TN", ten: "Tiếp nhận", nv: "NG" },
    { ma: "BL", ten: "Bảo lãnh", nv: "NG" },
    { ma: "TT", ten: "Tính toán", nv: "NG" }
];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "pm_hthi", title: "Phần mềm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "sdt_nhan", title: "SĐT nhận", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_hthi", title: "Ngày gửi", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "30%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _forControlSMSService.timKiemPtrang(objTimKiem).then(res => {
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
    _forControlSMSService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinDoiSoatSMS.clearErrorMessage();
        _frmLuuThongTinDoiSoatSMS.setData(objDatact);
        _modalDoiSoatSMS.show();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinDoiSoatSMS.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT)
        getPaging(1);
    });
    _frmTimKiem.getControl("pm").setDataSource(arrPm, "ten", "ma", "Chọn phần mềm", "");
    _frmTimKiem.getControl("nv").addEventChange(val => {
        var arr = arrPm.where(n => n.nv == val);
        _frmTimKiem.getControl("pm").setDataSource(arr, "ten", "ma", "Chọn phần mềm", "");
    });
    _frmLuuThongTinDoiSoatSMS.getControl("pm").setDataSource(arrPm, "ten", "ma", "Chọn phần mềm", "");
    //Tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});

