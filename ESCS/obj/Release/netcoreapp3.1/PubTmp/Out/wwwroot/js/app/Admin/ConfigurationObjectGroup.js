var objDanhMuc = {};
var _service = new Service();

var _notifyService = new NotifyService();
var _configurationObjectGroupService = new ConfigurationObjectGroupService();
var _partnerListService = new PartnerListService();

var _frmLuuThongTin = new FormService("frmLuuThongTin");
var _frmTimKiem = new FormService("frmTimKiem");

var _modalNhapThongTin = new ModalService("modalNhapThongTin");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "stt", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "10%", hozAlign: "center", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configurationObjectGroupService.getPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _configurationObjectGroupService.getDetail(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.setData(objDatact);
        row.select();
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTin.getControl("ma").readOnly();
        _modalNhapThongTin.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });

    //Nhập thông tin 
    $("#btnThemMoi").click(function () {
        _frmLuuThongTin.resetForm();
        _frmLuuThongTin.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTin.getControl("ma").readOnly(false);
        _frmLuuThongTin.getControl("trang_thai").setValue("D");
        _frmLuuThongTin.clearErrorMessage();
        _modalNhapThongTin.show();
    })

    //Lưu thông tin 
    $("#btnLuuThongTin").click(function () {
        if (_frmLuuThongTin.isValid()) {
            var formData = _frmLuuThongTin.getJsonData();
            _configurationObjectGroupService.luuThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
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
    $("#btnXoaThongTin").click(function () {
        var formData = _frmLuuThongTin.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _configurationObjectGroupService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công.");
                    getPaging(1);
                    _modalNhapThongTin.hide();
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
