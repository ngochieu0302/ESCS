var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var _businessCodeService = new BusinessCodeService();
var _partnerListService = new PartnerListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmSaveLHNV = new FormService("frmSaveLHNV");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapLHNV = new ModalService("modalNhapLHNV");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;
const GRID_HO_SO_SO_DONG = 14;

var vat_chat_xe = [
    { ma: "VCX", ten: "Vật chất xe" },
    { ma: "NNTX", ten: "Người ngồi trên xe" },
    { ma: "HH", ten: "Hàng hóa trên xe" },
    { ma: "TNDS", ten: "Trách nhiệm dân sự" },
    { ma: "LPHU_XE", ten: "Lái phụ xe" },
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "vcx_hthi", title: "Nhóm", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "5%", align: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", align: "center", width: "6%", headerSort: false },
    { field: "bthuong_hthi", title: "Bồi thường", align: "center", width: "8%", headerSort: false },
    { field: "loai_hthi", title: "Loại hình", width: "9%", hozAlign: "center", headerSort: false },
    { field: "doi_tuong_hthi", title: "Đối tượng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", align: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewLHNV = new GridViewService("gridViewLHNV", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _businessCodeService.paging(objTimKiem).then(res => {
        _gridViewLHNV.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewLHNV.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewLHNV.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _businessCodeService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveLHNV.clearErrorMessage();
        _frmSaveLHNV.setData(objDatact);
        _modalNhapLHNV.show();
        _frmSaveLHNV.getControl("ma").readOnly();
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
    });
};
function batBuocTheoNghiepVu(nv = "") {
    _frmSaveLHNV.getControl("vcx").removeAttr("required");
    _frmSaveLHNV.getControl("loai").removeAttr("required");
    $("#lbl_vcx").removeClass("_required");
    $("#lbl_loai").removeClass("_required");
    if (nv == "XE") {
        _frmSaveLHNV.getControl("vcx").attr("required", "required");
        $("#lbl_vcx").addClass("_required");
        $("#lbl_loai").addClass("_required");
    }
    _frmSaveLHNV = new FormService("frmSaveLHNV");
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    batBuocTheoNghiepVu();
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLHNV.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("vcx").setDataSource(vat_chat_xe, "ten", "ma", "Chọn nhóm", "");
        _frmSaveLHNV.getControl("vcx").setDataSource(vat_chat_xe, "ten", "ma", "Chọn nhóm", "");
        getPaging(1);
    });
    _frmSaveLHNV.getControl("nv").addEventChange(val => {
        batBuocTheoNghiepVu(val);
    });

    //Nhập thông tin LHNV
    $("#btnNhapThongTinLHNV").click(function () {
        _frmSaveLHNV.resetForm();
        _frmSaveLHNV.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLHNV.getControl("trang_thai").setValue(1);
        _frmSaveLHNV.getControl("nv").setValue("XE");
        _frmSaveLHNV.getControl("nv").setValue("XE");
        _frmSaveLHNV.clearErrorMessage();
        _frmSaveLHNV.getControl("ma").readOnly(false);
        $("#modal-user-log").html("");
        _modalNhapLHNV.show();
    });
    //Lưu thông tin LHNV
    $("#btnLuuThongTinLHNV").click(function () {
        if (_frmSaveLHNV.isValid()) {
            var formData = _frmSaveLHNV.getJsonData();
            _businessCodeService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin loại hình nghiệp vụ thành công.");
                    getPaging(1);
                    _modalNhapLHNV.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXoaThongTinLHNV").click(function () {
        var formData = _frmSaveLHNV.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa loại hình nghiệp vụ này không?", "", val => {
            _businessCodeService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin loại hình nghiệp vụ thành công.");
                    getPaging(1);
                    _modalNhapLHNV.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    //ExportExcel thông tin LHNV
    $("#btnExportExcelBussinessCode").click(function () {
        console.log('abc');
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_LHNV_XE";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    //Màn hình tìm kiếm LHNV
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    //UploadExcel thông tin LHNV
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });
    //UploadExcel thông tin LHNV
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    //SaveExcel thông tin LHNV
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _businessCodeService.SaveDataExcel(obj).then(res => {
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
});

