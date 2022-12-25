var objDanhMuc = {};
var _frmLuuThongTinChiNhanh = new FormService("frmLuuThongTinChiNhanh");
var _frmLuuThongNganHang = new FormService("frmLuuThongNganHang");
var _notifyService = new NotifyService();
var _branchListService = new BranchListService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _service = new Service();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapChiNhanh = new ModalService("modalNhapChiNhanh");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", headerSort: false, hozAlign: "center" },
    //{ field: "ten", title: "Tên", width: "22%", headerSort: false },
    { field: "ten_tat", title: "Chi nhánh", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_e", title: "Tên tiếng anh", width: "15%", hozAlign: "center", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "20%", headerSort: false },
    { field: "ten_tat_doi_tac", title: "Đối tác", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "mst", title: "Mã số thuế", width: "11%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "11%", headerSort: false },
    { field: "email", title: "Email", width: "15%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" }
];

_navThongTinChiNhanh = new NavTabService("navThongTinChiNhanh", ["tabThongTinChiNhanh", "tabThongTinTaiKhoan","tabPhanCongXuLy"],"nav-pills");
var _gridViewMaDoiTac_chi_nhanh = new GridViewService("gridViewMaDoiTac_chi_nhanh", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _branchListService.timKiemChiNhanh(objTimKiem).then(res => {
        _gridViewMaDoiTac_chi_nhanh.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewMaDoiTac_chi_nhanh.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewMaDoiTac_chi_nhanh.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function getDetail(obj, callback = undefined) {
    _branchListService.layThongTinChiTiet(obj).then(res => {
        if (callback) {
            callback(res);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    getDetail(data, res => {
        var objData = res.data_info.cnhanh;
        _frmLuuThongNganHang.resetForm();
        _frmLuuThongNganHang.clearErrorMessage();
        ESUtil.genHTML("bodyTableDanhSachTaiKhoanChiNhanhTemplate", "bodyTableDanhSachTaiKhoanChiNhanh", { ds_tai_khoan: res.data_info.tai_khoan });
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
        _frmLuuThongTinChiNhanh.clearErrorMessage();
        _frmLuuThongTinChiNhanh.setData(objData);
        _modalNhapChiNhanh.show();
        row.select();
        _frmLuuThongTinChiNhanh.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinChiNhanh.getControl("ma").readOnly();
    });
};

function xoaTaiKhoan(ngan_hang, chi_nhanh, so_tk) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa tài khoản này không?", "", () => {
        var obj = {};
        obj.ma_doi_tac = _frmLuuThongTinChiNhanh.getControl("ma_doi_tac").val();
        obj.ma_chi_nhanh = _frmLuuThongTinChiNhanh.getControl("ma").val();
        obj.ma = _frmLuuThongTinChiNhanh.getControl("ma").val();
        obj.ngan_hang = ngan_hang;
        obj.chi_nhanh = chi_nhanh;
        obj.so_tk = so_tk;
        _branchListService.xoaTaiKhoan(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Xóa thông tin tài khoản chi nhánh thành công.");
                getDetail(obj, res => {
                    _frmLuuThongNganHang.resetForm();
                    _frmLuuThongNganHang.clearErrorMessage();
                    ESUtil.genHTML("bodyTableDanhSachTaiKhoanChiNhanhTemplate", "bodyTableDanhSachTaiKhoanChiNhanh", { ds_tai_khoan: res.data_info.tai_khoan });
                });
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
}
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _bankListService.layDsNganHang()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.cnhanh = arrRes[1].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
     
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmLuuThongTinChiNhanh.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongNganHang.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");

        getPaging(1);
    });

    $("#btnNhapThongTinMaDoiTac_chi_nhanh").click(function () {
        _navThongTinChiNhanh.showTab("tabThongTinChiNhanh");
        _frmLuuThongNganHang.resetForm();
        _frmLuuThongNganHang.clearErrorMessage();
        ESUtil.genHTML("bodyTableDanhSachTaiKhoanChiNhanhTemplate", "bodyTableDanhSachTaiKhoanChiNhanh", { ds_tai_khoan: [] });
        $("#modal-user-log").html("");
        _frmLuuThongTinChiNhanh.resetForm();
        _frmLuuThongTinChiNhanh.clearErrorMessage();
        _frmLuuThongTinChiNhanh.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinChiNhanh.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinChiNhanh.getControl("ma").readOnly(false);
        _frmLuuThongTinChiNhanh.getControl("trang_thai").setValue(1);
        _modalNhapChiNhanh.show();
    });
    $("#btnLuuThongTinMaDoiTac_chi_nhanh").click(function () {
        if (_frmLuuThongTinChiNhanh.isValid()) {
            var formData = _frmLuuThongTinChiNhanh.getJsonData();
            _branchListService.luuChiNhanh(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin chi nhánh thành công.");
                    getPaging(1);
                    _modalNhapChiNhanh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnLuuTaiKhoan").click(function () {
        if (_frmLuuThongNganHang.isValid()) {
            var obj = _frmLuuThongNganHang.getJsonData();
            obj.ma_doi_tac = ESCS_MA_DOI_TAC;
            obj.ma_chi_nhanh = _frmLuuThongTinChiNhanh.getControl("ma").val();
            obj.ma = _frmLuuThongTinChiNhanh.getControl("ma").val();
            _branchListService.luuTaiKhoan(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin tài khoản chi nhánh thành công.");
                    getDetail(obj, res => {
                        _frmLuuThongNganHang.resetForm();
                        _frmLuuThongNganHang.clearErrorMessage();
                        ESUtil.genHTML("bodyTableDanhSachTaiKhoanChiNhanhTemplate", "bodyTableDanhSachTaiKhoanChiNhanh", { ds_tai_khoan: res.data_info.tai_khoan });
                    });
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaThongTinMaDoiTac_chi_nhanh").click(function () {
        var formData = _frmLuuThongTinChiNhanh.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa chi nhánh này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    //$("#btnExportExcelBranchList").click(function () {
    //    var obj = _frmTimKiem.getJsonData();
    //    obj.ma_mau_in = "ESCS_EXCEL_DS_DON_VI";
    //    _service.getFile("/common/ExportExcel", obj).then(res => {
    //        ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    //    });
    //});
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $("#btnThemPhanCongXuLy").click(function () {

    });
});

