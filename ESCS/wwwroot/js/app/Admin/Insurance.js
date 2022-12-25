var objDanhMuc = {};
var _notifyService = new NotifyService();
var _service = new Service();
var _insuranceService = new InsuranceService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _UploadExcelService = new UploadExcelService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuu = new FormService("frmLuu");
var _modalNhap = new ModalService("modalNhap");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

const IMAGE_DEFAULT = "/images/default.png";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", headerSort: false, hozAlign: "center"},
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "23%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "12%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "12%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ttrang_hthi", title: "Trạng thái", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "12%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _insuranceService.paging(objTimKiem).then(res => {
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
    _insuranceService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuu.clearErrorMessage();
        _frmLuu.getControl("ma_doi_tac").readOnly();
        _frmLuu.getControl("ma").readOnly();
        _frmLuu.getControl("ttrang").readOnly(false);
        _frmLuu.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        $("#preview_file_logo").attr("src", IMAGE_DEFAULT);
        if (objDatact.logo != undefined && objDatact.logo != null && objDatact.logo != "") {
            ESUtil.checkLoadImage("/" + objDatact.logo, () => {
                $("#preview_file_logo").attr("src", "/" + objDatact.logo);
            });
        }
        if (objDatact.ngan_hang != undefined && objDatact.ngan_hang != null && objDatact.ngan_hang != "") {
            var cnhanh = objDanhMuc.cnhanh.where(n => n.ma_ct == objDatact.ngan_hang);
            _frmLuu.getControl("cnhanh_ngan_hang").setDataSource(cnhanh, "ten", "ma", "Chọn chi nhánh", objDatact.cnhanh_ngan_hang);
        }
        _modalNhap.show();
    });
};
function bindDataMenucha() {
    var data = [];
    if (objDanhMuc.menu_cha != undefined && objDanhMuc.menu_cha != null) {
        data = objDanhMuc.menu_cha.where(n => n.nhom == nhom);
        _frmLuu.getControl("so_id_cha").setDataSource(data, "ten", "so_id", "Chọn menu cha", "");
    }

}
function chonNhomQuyen(el) {
    var nhom_quyen = "";
    $("input.menu_nhom_quyen:checked").each(function (index) {
        if (index == 0) {
            nhom_quyen = $(this).val();
        }
        else {
            nhom_quyen += "," + $(this).val();
        }
    });
    _frmLuu.getControl("nhom_quyen").val(nhom_quyen);
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _bankListService.layDsNganHang()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuu.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        if (arrRes[1].data_info != null) {
            objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom == 'NGAN_HANG');
            objDanhMuc.cnhanh = arrRes[1].data_info.where(n => n.nhom = 'CHI_NHANH_NGAN_HANG');
            _frmLuu.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
            _frmLuu.getControl("cnhanh_ngan_hang").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        }
        getPaging(1);
    });
    _frmLuu.getControl("ngan_hang").addEventChange(val => {
        var cnhanh = objDanhMuc.cnhanh.where(n => n.ma_ct == val);
        _frmLuu.getControl("cnhanh_ngan_hang").setDataSource(cnhanh, "ten", "ma", "Chọn chi nhánh", "");
    });
    $("#btnNhap").click(function () {
        $("#preview_file_logo").attr("src", IMAGE_DEFAULT);
        _frmLuu.resetForm();
        _frmLuu.getControl("ttrang").setValue("D");
        _frmLuu.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuu.getControl("ma_doi_tac").readOnly(false);
        _frmLuu.getControl("ma").readOnly(false);
        _frmLuu.getControl("ttrang").readOnly(false);
        $("#modal-user-log").html("");
        _frmLuu.clearErrorMessage();
        _modalNhap.show();
    });
    $("#btnLuu").click(function () {
        if (_frmLuu.isValid()) {
            var formData = _frmLuu.getFormFileData();
            _insuranceService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông báo thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoa").click(function () {
        var formData = _frmLuu.getJsonData();
        _notifyService.confirmDelete("Xóa dữ liệu danh mục khi đã được sử dụng sẽ ảnh hưởng đến dữ liệu khác. Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            _insuranceService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin nhà bảo hiểm thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnExportExcelInsurance").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_NHA_BAO_HIEM";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _insuranceService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#file_logo").change(function () {
        var input = this;
        ESUtil.readURL(input, "/images/default.png");
    });
});