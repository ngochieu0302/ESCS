var objDanhMuc = {};
var _notifyService = new NotifyService();
var _service = new Service();
var _contactInfoService = new ContactInfoService();
var _partnerListService = new PartnerListService();
var _administrativeUnitsService = new AdministrativeUnitsService();

var _modalNhapContact = new ModalService("modalNhapContact");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveContact = new FormService("frmSaveContact");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "ten_tinh_hthi", title: "Tỉnh thành", width: "10%", headerSort: false },
    { field: "ten_quan_hthi", title: "Quận huyện", width: "10%", headerSort: false },
    { field: "ten_phuong_hthi", title: "Xã phường", width: "10%", headerSort: false },
    { field: "dia_chi", title: "Địa chỉ", width: "25%", headerSort: false },
    { field: "sdt", title: "Số điện thoại", width: "10%", align: "center", headerSort: false },
    { field: "email", title: "Email", width: "15%", align: "center", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "15%", align: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", align: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewThongTinLienhe = new GridViewService("gridViewTTLH", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _contactInfoService.GetPaging(objTimKiem).then(res => {
        _gridViewThongTinLienhe.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewThongTinLienhe.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewThongTinLienhe.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _contactInfoService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveContact.clearErrorMessage();
        _frmSaveContact.setData(objDatact);
        _frmSaveContact.getControl("ma_tinh_thanh").trigger("select2:select");
        _frmSaveContact.setData(objDatact);
        _frmSaveContact.getControl("ma_quan_huyen").trigger("select2:select");
        _frmSaveContact.setData(objDatact);
        _frmSaveContact.getControl("ma_doi_tac").readOnly();
        _frmSaveContact.getControl("ma").readOnly();
        _modalNhapContact.show();
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _administrativeUnitsService.layDsTinhThanh(),]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.donvihanhchinh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveContact.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        var tinh_thanh = objDanhMuc.donvihanhchinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
        _frmSaveContact.getControl("ma_tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmSaveContact.getControl("ma_tinh_thanh").addEventChange(val => {
            var quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() === val && n.ma_phuong.trim() === "");
            _frmSaveContact.getControl("ma_quan_huyen").setDataSource(quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });
        _frmSaveContact.getControl("ma_quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        
        _frmSaveContact.getControl("ma_quan_huyen").addEventChange(val => {
            var xa_phuong = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() === $("#ma_tinh_thanh").val() && n.ma_quan.trim() === val);
            _frmSaveContact.getControl("ma_xa_phuong").setDataSource(xa_phuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        });
        _frmSaveContact.getControl("ma_xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        getPaging(1);
    });
    //Nhập thông tin liên hệ
    $("#btnNhap").click(function () {
        _frmSaveContact.resetForm();
        _frmSaveContact.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveContact.getControl("ma_doi_tac").readOnly(false);
        _frmSaveContact.getControl("ma").readOnly(false);
        _frmSaveContact.getControl("trang_thai").setValue(1);
        _frmSaveContact.clearErrorMessage();
        _modalNhapContact.show();
    })
    //Lưu thông tin liên hệ
    $("#btnSaveContact").click(function () {
        if (_frmSaveContact.isValid()) {
            var formData = _frmSaveContact.getJsonData();
            _contactInfoService.SaveContact(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin liên hệ thành công.");
                    getPaging(1);
                    _modalNhapContact.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })

    $("#btnDeleteContact").click(function () {
        var formData = _frmSaveContact.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin liên hệ này không?", "", val => {
            _contactInfoService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapContact.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    //Màn hình tìm kiếm thông tin liên hệ
    $("#btnTimKiem").click(function () {
        getPaging(1);
    })
})