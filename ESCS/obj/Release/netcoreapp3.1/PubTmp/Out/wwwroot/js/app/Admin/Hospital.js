var objDanhMuc = {};

var objDanhMucDonViHanhChinh = [];
var _frmLuuThongTinHospital = new FormService("frmLuuThongTinHospital");
var _notifyService = new NotifyService();
var _service = new Service();
var _hospitalService = new HospitalService();
var _partnerListService = new PartnerListService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _bankListService = new BankListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapHospital = new ModalService("modalNhapHospital");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", align: "center", headerSort: false },
    { field: "ten", title: "Tên bệnh viện", width: "20%", headerSort: false },
    { field: "dai_dien", title: "Đại diện", width: "10%", headerSort: false },
    { field: "dia_chi", title: "Địa chỉ", width: "30%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_tinh_hthi", title: "Tỉnh thành", width: "10%", headerSort: false },
    { field: "ten_quan_hthi", title: "Quận huyện", width: "10%", headerSort: false },
    { field: "sdt", title: "Điện thoại", width: "10%", align: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "so_tk", title: "Số tài khoản", width: "10%", align: "center", headerSort: false },
    { field: "chu_tk", title: "Đối tượng thụ hưởng", width: "15%", headerSort: false },
    { field: "vat_hthi", title: "Thuế VAT", width: "6%", align: "center", headerSort: false },
    { field: "loai_hthi", title: "Loại", width: "8%", align: "center", headerSort: false },
    { field: "ghi_chu", title: "Ghi chú", width: "10%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", align: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];
var _gridViewHospital = new GridViewService("gridViewHospital", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _hospitalService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewHospital.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewHospital.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHospital.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _hospitalService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinHospital.resetForm();
        _frmLuuThongTinHospital.setData(objDatact);
        _frmLuuThongTinHospital.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinHospital.getControl("ma").readOnly();
        _frmLuuThongTinHospital.getControl("tinh_thanh").trigger("select2:select");
        _frmLuuThongTinHospital.getControl("quan_huyen").setValue(objDatact.quan_huyen);
        _frmLuuThongTinHospital.getControl("ngan_hang").trigger("select2:select");
        _frmLuuThongTinHospital.getControl("chi_nhanh_ngan_hang").setValue(objDatact.chi_nhanh_ngan_hang);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinHospital.clearErrorMessage();
        _modalNhapHospital.show();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _administrativeUnitsService.layDsTinhThanh(), _bankListService.layDsNganHang()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.donvihanhchinh = arrRes[1].data_info;
        objDanhMuc.ngan_hang = arrRes[2].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh = arrRes[2].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");

        var tinh_thanh = objDanhMuc.donvihanhchinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmTimKiem.getControl("tinh_thanh").addEventChange(val => {
            var quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() === val && n.ma_phuong.trim() === "");
            _frmTimKiem.getControl("quan_huyen").setDataSource(quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });
        _frmTimKiem.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");

        _frmLuuThongTinHospital.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinHospital.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmLuuThongTinHospital.getControl("tinh_thanh").addEventChange(val => {
            var quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_tinh.trim() === val && n.ma_phuong.trim() === "");
            _frmLuuThongTinHospital.getControl("quan_huyen").setDataSource(quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });
        _frmLuuThongTinHospital.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmLuuThongTinHospital.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmLuuThongTinHospital.getControl("chi_nhanh_ngan_hang").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");

        getPaging(1);
    });
    _frmLuuThongTinHospital.getControl("ngan_hang").addEventChange(val => {
        _frmLuuThongTinHospital.getControl("chi_nhanh_ngan_hang").setDataSource(objDanhMuc.chi_nhanh.where(n => n.ma_ct === val), "ten", "ma", "Chọn chi nhánh", "");
    });
    //Nhập thông tin bệnh viện
    $("#btnNhapThongTinHospital").click(function () {
        _frmLuuThongTinHospital.resetForm();
        _frmLuuThongTinHospital.clearErrorMessage();
        _frmLuuThongTinHospital.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinHospital.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinHospital.getControl("ma").readOnly(false);
        _frmLuuThongTinHospital.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhapHospital.show();
    })
    //Lưu thông tin bệnh viện
    $("#btnLuuThongTinHospital").click(function () {
        if (_frmLuuThongTinHospital.isValid()) {
            var formData = _frmLuuThongTinHospital.getJsonData();
            _hospitalService.SaveHospital(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin bệnh viện thành công.");
                    getPaging(1);
                    _modalNhapHospital.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin bệnh viện
    $("#btnXoaThongTinHospital").click(function () {    
        var formData = _frmLuuThongTinHospital.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin bệnh viện này không?", "", val => {
            _hospitalService.deleteHospital(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin bệnh viện thành công");
                    getPaging(1);
                    _modalNhapHospital.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    })
    //ExportExce thông tin bệnh viện
    $("#btnExportExcelHospital").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_CSYT";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    })
    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    })
    //ImportExcel thông tin bệnh viện
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    })
    //UploadExcel thông tin bệnh viện
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    })
    //Lưu excel thông tin bệnh viện
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _hospitalService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    })
    getPaging(1);
})