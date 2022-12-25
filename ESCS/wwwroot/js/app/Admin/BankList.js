var objDanhMuc = {};
var _service = new Service();
var _frmLuuThongTinNganHang = new FormService("frmLuuThongTinNganHang");
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapNganHang = new ModalService("modalNhapNganHang");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_ngan_hang", title: "Mã ngân hàng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_ngan_hang", title: "Tên ngân hàng", width: "30%", headerSort: false },
    { field: "ma_chi_nhanh", title: "Mã chi nhánh", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Tên chi nhánh", width: "30%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewMaNganHang = new GridViewService("gridViewMaNganHang", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _bankListService.timKiemNganHang(objTimKiem).then(res => {
        _gridViewMaNganHang.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _bankListService.layThongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTinNganHang.clearErrorMessage();
        _frmLuuThongTinNganHang.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinNganHang.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinNganHang.getControl("ma_chi_nhanh").readOnly();
        _frmLuuThongTinNganHang.getControl("ma_ngan_hang").readOnly();
        _modalNhapNganHang.show();
        row.select();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function() {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _bankListService.layDsNganHang(),
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1)
            ? arrRes[0].data_info[0].ma
            : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom == 'NGAN_HANG');
        objDanhMuc.ngan_hang_cnhanh = arrRes[1].data_info.where(n => n.nhom = 'CHI_NHANH_NGAN_HANG');

        _frmLuuThongTinNganHang.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac,
            "ten",
            "ma",
            "Chọn đối tác",
            ESCS_MA_DOI_TAC_DUY_NHAT);

        _frmTimKiem.getControl("ma_doi_tac")
            .setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ten_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmTimKiem.getControl("ten_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");

        getPaging(1);
    });

    _frmTimKiem.getControl("ten_ngan_hang").addEventChange(val => {
        var cnhanh = objDanhMuc.ngan_hang_cnhanh.where(n => n.ma_ct == val);
        _frmTimKiem.getControl("ten_chi_nhanh").setDataSource(cnhanh, "ten", "ma", "Chọn chi nhánh", "");
    });
    //Nhập thông tin ngân hàng
    $("#btnNhapThongTinNganHang").click(function() {
        _frmLuuThongTinNganHang.clearErrorMessage();
        _frmLuuThongTinNganHang.resetForm();
        _frmLuuThongTinNganHang.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinNganHang.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinNganHang.getControl("ma_chi_nhanh").readOnly(false);
        _frmLuuThongTinNganHang.getControl("ma_ngan_hang").readOnly(false);
        _frmLuuThongTinNganHang.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhapNganHang.show();
    });
    //Lưu thông tin ngân hàng
    $("#btnLuuThongTinNganHang").click(function() {
        if (_frmLuuThongTinNganHang.isValid()) {
            var formData = _frmLuuThongTinNganHang.getJsonData();

            _bankListService.luuThongTinNganHang(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapNganHang.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin ngân hàng
    $("#btnXoaThongTinNganHang").click(function () {
        _notifyService.confirmDelete("Xóa dữ liệu danh mục khi đã được sử dụng sẽ ảnh hưởng đến dữ liệu khác. Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            var formData = _frmLuuThongTinNganHang.getJsonData();
            _bankListService.xoaNganHang(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công.");
                    getPaging(1);
                    _modalNhapNganHang.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Export Excel ngân hàng
    $("#btnExportExcelBankList").click(function() {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_NGAN_HANG";
        console.log(obj.ma_mau_in);
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res,
                obj.ma_mau_in +
                "_" +
                new Date().getFullYear() +
                new Date().getMonth() +
                new Date().getDay() +
                new Date().getHours() +
                new Date().getMinutes() +
                new Date().getSeconds() +
                new Date().getMilliseconds() +
                ".xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    //Màn hình tìm kiếm thông tin ngân hàng
    $("#btnTimKiem").click(function() {
        getPaging(1);
    });

    $('#btnImportExcel').click(function() {
        _modalUploadExcel.show();
    });

    $('#btnUploadExcel').click(function() {
        $("#frmImportExcelFile").click();
    });

    $('#btnSaveExcel').click(function() {
        var obj = {
            data: objData
        };
        _bankListService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
});

