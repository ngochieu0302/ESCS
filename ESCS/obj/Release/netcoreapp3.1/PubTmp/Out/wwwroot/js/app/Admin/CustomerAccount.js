var objDanhMuc = {};
//Service
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _customerAccountService = new CustomerAccountService();
var _administrativeUnitsService = new AdministrativeUnitsService();
//Form
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveCustomer = new FormService("frmSaveCustomer");

//Modal
var _modalSaveCustomer = new ModalService("modalSaveCustomer");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;
var objData = null;
var tinh_thanh;
var quan_huyen;
var xa_phuong;

var configColumn = [
    { field: "stt", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ho_ten", title: "Họ và tên", width: "12%", headerSort: false },
    { field: "ngay_sinh_hthi", title: "Ngày sinh", width: "8%", hozAlign: "center", headerSort: false },
    { field: "dien_thoai", title: "Điện thoại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "cmt", title: "CMT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_tinh_hthi", title: "Tỉnh thành", width: "12%", headerSort: false },
    { field: "ten_quan_hthi", title: "Quận huyện", width: "12%", headerSort: false },
    { field: "ten_phuong_hthi", title: "Xã phường", width: "12%", headerSort: false },
    { field: "dia_chi", title: "Địa chỉ", width: "20%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];
var _gridViewCustomer = new GridViewService("gridViewCustomer", configColumn, getPaging, rowClick);

//GetPaging
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _customerAccountService.getPaging(objTimKiem).then(res => {
        _gridViewCustomer.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCustomer.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCustomerView.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _customerAccountService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveCustomer.resetForm();
        _frmSaveCustomer.setData(objDatact);
        _frmSaveCustomer.getControl("ma_doi_tac").readOnly();
        _frmSaveCustomer.getControl("tinh_thanh").trigger("select2:select");
        _frmSaveCustomer.getControl("quan_huyen").setValue(objDatact.quan_huyen);
        _frmSaveCustomer.getControl("quan_huyen").trigger("select2:select");
        _frmSaveCustomer.getControl("xa_phuong").setValue(objDatact.xa_phuong);
        _frmSaveCustomer.clearErrorMessage();
        _modalSaveCustomer.show();
    });
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
         _administrativeUnitsService.layDsTinhThanh()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.donvihanhchinh = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCustomer.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        tinh_thanh = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
        quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
        xa_phuong = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");

        _frmSaveCustomer.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmSaveCustomer.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmSaveCustomer.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmSaveCustomer.getControl("tinh_thanh").addEventChange(val => {
            var arrQuanHuyen = quan_huyen.where(n => n.ma_tinh === val);
            _frmSaveCustomer.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmSaveCustomer.getControl("quan_huyen").setValue("");
            _frmSaveCustomer.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        });
        _frmSaveCustomer.getControl("quan_huyen").addEventChange(val => {
            var arrXaPhuong = xa_phuong.where(n => n.ma_quan === val)
            _frmSaveCustomer.getControl("xa_phuong").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmSaveCustomer.getControl("xa_phuong").setValue("");
        });
        getPaging(1);
    });

    $("#btnNhapThongTinCustomer").click(function () {
        _frmSaveCustomer.resetForm();
        _frmSaveCustomer.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCustomer.getControl("ma_doi_tac").readOnly(false);
        _frmSaveCustomer.clearErrorMessage();
        _frmSaveCustomer.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmSaveCustomer.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmSaveCustomer.getControl("trang_thai").setValue("D");
        _modalSaveCustomer.show();
    });

    //Lưu thông tin 
    $("#btnSaveCustomer").click(function () {
        if (_frmSaveCustomer.isValid()) {
            var formData = _frmSaveCustomer.getJsonData();
            _customerAccountService.saveCustomer(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin người dùng thành công");
                    getPaging(1);
                    _modalSaveCustomer.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin 
    $("#btnDeleteCustomer").click(function () {
        var formData = _frmSaveCustomer.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin người dùng này không?", "", val => {
            _customerAccountService.deleteCustomer(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin người dùng thành công");
                    getPaging(1);
                    _modalSaveCustomer.hide();
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