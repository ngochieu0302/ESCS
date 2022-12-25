var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _towingCompanyService = new TowingCompanyService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTin = new FormService("frmLuuThongTin");
var _modalNhapThongTin = new ModalService("modalNhapThongTin");

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;
var tinh_thanh;
var quan_huyen;
var xa_phuong;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Đơn vị cẩu kéo", width: "20%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "8%", hozAlign: "center", headerSort: false },
    { field: "sdt", title: "Điện thoại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ten_tinh_thanh", title: "Tỉnh thành", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ten_quan_huyen", title: "Quận huyện", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ten_xa_phuong", title: "Xã phường", hozAlign: "center", width: "10%", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "25%", headerSort: false },
    { field: "ten_ngan_hang", title: "Tên ngân hàng", width: "20%", headerSort: false },
    { field: "stk", title: "Số tài khoản", width: "10%", hozAlign: "center", headerSort: false },
    { field: "chu_tk", title: "Chủ tài khoản", width: "12%", hozAlign: "center", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "18%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _towingCompanyService.getPaging(objTimKiem).then(res => {
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
    _towingCompanyService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.setData(objData);
        _modalNhapThongTin.show();
        row.select();
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTin.getControl("ma").readOnly();
        _frmLuuThongTin.getControl("nhom").readOnly();
        _frmLuuThongTin.getControl("tinh_thanh").trigger("select2:select");
        _frmLuuThongTin.getControl("quan_huyen").setValue(objData.quan_huyen);
        _frmLuuThongTin.getControl("quan_huyen").trigger("select2:select");
        _frmLuuThongTin.getControl("xa_phuong").setValue(objData.xa_phuong);
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _bankListService.layDsNganHang(),
        _administrativeUnitsService.layDsTinhThanh()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.donvihanhchinh = arrRes[2].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");

        tinh_thanh = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
        quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
        xa_phuong = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");

        _frmLuuThongTin.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmLuuThongTin.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmLuuThongTin.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmLuuThongTin.getControl("tinh_thanh").addEventChange(val => {
            var arrQuanHuyen = quan_huyen.where(n => n.ma_tinh === val);
            _frmLuuThongTin.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmLuuThongTin.getControl("quan_huyen").setValue("");
            _frmLuuThongTin.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        });
        _frmLuuThongTin.getControl("quan_huyen").addEventChange(val => {
            var arrXaPhuong = xa_phuong.where(n => n.ma_quan === val)
            _frmLuuThongTin.getControl("xa_phuong").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
            _frmLuuThongTin.getControl("xa_phuong").setValue("");
        });
        getPaging(1);
    });
    // Nhập thông tin 
    $("#btnThemMoi").click(function () {
        _frmLuuThongTin.resetForm();
        _frmLuuThongTin.clearErrorMessage();
        _frmLuuThongTin.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTin.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTin.getControl("ma").readOnly(false);
        _frmLuuThongTin.getControl("nhom").readOnly(false);
        _frmLuuThongTin.getControl("trang_thai").setValue("D");
        $("#modal-user-log").html("");
        _frmLuuThongTin.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmLuuThongTin.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmLuuThongTin.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _modalNhapThongTin.show();
    });
    // Lưu thông tin 
    $("#btnLuuThongTin").click(function () {
        if (_frmLuuThongTin.isValid()) {
            var formData = _frmLuuThongTin.getJsonData();
            _towingCompanyService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    // Xóa thông tin 
    $("#btnXoaThongTin").click(function () {
        var formData = _frmLuuThongTin.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _towingCompanyService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapThongTin.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Tìm kiếm thông tin
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});