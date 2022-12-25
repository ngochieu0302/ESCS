var objDanhMuc = {};
var _service = new Service();

var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _titleService = new TitleService();

var _frmSaveThongTin = new FormService("frmSaveThongTin");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalSaveThongTin = new ModalService("modalSaveThongTin");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "nsd", title: "Người tạo", width: "12%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "35%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _titleService.getPaging(objTimKiem).then(res => {
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
    if (data.ma_doi_tac == undefined || data.ma_doi_tac == null || data.ma_doi_tac == "") {
        return;
    }
    _titleService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmSaveThongTin.clearErrorMessage();
        _frmSaveThongTin.setData(objDatact);
        _frmSaveThongTin.getControl("ma_doi_tac").readOnly();
        _frmSaveThongTin.getControl("ma").readOnly();
        _modalSaveThongTin.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveThongTin.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });

    //Nhập thông tin 
    $("#btnThemChucDanh").click(function () {
        _frmSaveThongTin.resetForm();
        _frmSaveThongTin.clearErrorMessage();
        _frmSaveThongTin.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveThongTin.getControl("ma_doi_tac").readOnly(false);
        _frmSaveThongTin.getControl("ma").readOnly(false);
        _frmSaveThongTin.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalSaveThongTin.show();
    });

    //Lưu thông tin 
    $("#btnLuuThongTin").click(function () {
        if (_frmSaveThongTin.isValid()) {
            var formData = _frmSaveThongTin.getJsonData();
            _titleService.luuThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    getPaging(1);
                    _modalSaveThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin
    $("#btnDelete").click(function () {
        var formData = _frmSaveThongTin.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _titleService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalSaveThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
})
