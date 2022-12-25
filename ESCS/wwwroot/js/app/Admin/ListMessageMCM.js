var objDanhMuc = {};

var _notifyService = new NotifyService();
var _listMessageMCMService = new ListMessageMCMService();
var _partnerListService = new PartnerListService();
var _service = new Service();

var _frmLuuThongTinDsTinNhan = new FormService("frmLuuThongTinDsTinNhan");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapDsTinNhan = new ModalService("modalNhapDsTinNhan");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "tempid", title: "Tempid", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chien_dich", title: "Tên chiến dịch", width: "20%", headerSort: false },
    { field: "channel", title: "Channel", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nd_sms", title: "Nội dung tin nhắn", width: "30%", hozAlign: "center", headerSort: false },
    { field: "param_zalo", title: "Param zalo", width: "25%", headerSort: false },
    { field: "param_viber", title: "Param viber", width: "25%", hozAlign: "center", headerSort: false },
    { field: "param_sms", title: "Param sms", width: "28%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewDanhSachTinNhan = new GridViewService("gridViewDanhSachTinNhan", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    console.log(objTimKiem);
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _listMessageMCMService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewDanhSachTinNhan.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewDanhSachTinNhan.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewDanhSachTinNhan.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    $("#btnXoaThongTinDsTinNhan").show();
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _listMessageMCMService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinDsTinNhan.resetForm();
        _frmLuuThongTinDsTinNhan.setData(objDatact);
        _frmLuuThongTinDsTinNhan.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinDsTinNhan.clearErrorMessage();
        _modalNhapDsTinNhan.show();
    });
} 

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinDsTinNhan.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    //Nhập thông tin danh sách tin nhắn
    $("#btnNhapDsTinNhan").click(function () {
        _frmLuuThongTinDsTinNhan.resetForm();
        _frmLuuThongTinDsTinNhan.clearErrorMessage();
        _frmLuuThongTinDsTinNhan.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinDsTinNhan.getControl("ma_doi_tac").readOnly(false);
        $("#btnXoaThongTinDsTinNhan").hide();
        _modalNhapDsTinNhan.show();
    });
    //Lưu thông tin danh sách tin nhắn
    $("#btnLuuThongTinDsTinNhan").click(function () {
        if (_frmLuuThongTinDsTinNhan.isValid()) {
            var formData = _frmLuuThongTinDsTinNhan.getJsonData();
            _listMessageMCMService.luuDanhSachTinNhan(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapDsTinNhan.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin danh sách tin nhắn
    $("#btnXoaThongTinDsTinNhan").click(function () {
        var formData = _frmLuuThongTinDsTinNhan.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _listMessageMCMService.xoaDanhSachTinNhan(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapDsTinNhan.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    })
    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
})