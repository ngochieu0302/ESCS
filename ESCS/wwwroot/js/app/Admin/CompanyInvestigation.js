var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _companyInvestigationService = new CompanyInvestigationService();
var _bankListService = new BankListService();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinMaCongTyGD = new FormService("frmLuuThongTinMaCongTyGD");
var _modalNhapMaCongTyGD = new ModalService("modalNhapMaCongTyGD");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "dia_chi", title: "Địa chỉ", width: "25%", headerSort: false },
    { field: "dthoai", title: "Điện thoại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "16%", headerSort: false }
];

var _gridViewCongTyGD = new GridViewService("gridViewCongTyGD", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _companyInvestigationService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewCongTyGD.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCongTyGD.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCongTyGD.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _companyInvestigationService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuuThongTinMaCongTyGD.clearErrorMessage();
        _frmLuuThongTinMaCongTyGD.setData(objData);
        _modalNhapMaCongTyGD.show();
        _frmLuuThongTinMaCongTyGD.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinMaCongTyGD.getControl("ma").readOnly();
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _bankListService.layDsNganHang()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom === "NGAN_HANG");

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMaCongTyGD.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMaCongTyGD.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        getPaging(1);
    });
    // Nhập thông tin công ty giám định
    $("#btnNhapCongTyGD").click(function () {
        _frmLuuThongTinMaCongTyGD.resetForm();
        _frmLuuThongTinMaCongTyGD.clearErrorMessage();
        _frmLuuThongTinMaCongTyGD.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMaCongTyGD.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinMaCongTyGD.getControl("ma").readOnly(false);
        _frmLuuThongTinMaCongTyGD.getControl("trang_thai").setValue("D");
        $("#modal-user-log").html("");
        _modalNhapMaCongTyGD.show();
    });
    // Lưu thông tin công ty giám định
    $("#btnLuuMaCongTyGD").click(function () {
        if (_frmLuuThongTinMaCongTyGD.isValid()) {
            var formData = _frmLuuThongTinMaCongTyGD.getJsonData();
            _companyInvestigationService.luuMaCongTyGD(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapMaCongTyGD.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    // Xóa thông tin công ty giám định
    $("#btnXoaMaCongTyGD").click(function () {
        var formData = _frmLuuThongTinMaCongTyGD.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin công ty giám định này không?", "", val => {
            _companyInvestigationService.xoaMaCongTyGD(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapMaCongTyGD.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Tìm kiếm thông tin công ty giám định
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});