var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _productHumanService = new ProductHumanService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalNhapLHNV = new ModalService("modalNhapLHNV");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveLHNV = new FormService("frmSaveLHNV");
var objData = null;

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã sản phẩm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "30%", headerSort: false },
    { field: "nsd", title: "NSD", width: "10%", headerSort: false },
    { field: "ngay_hthi", title: "Ngày tạo", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewProduct = new GridViewService("gridViewProduct", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _productHumanService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewProduct.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewProduct.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewProduct.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _productHumanService.xemChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveLHNV.clearErrorMessage();
        _frmSaveLHNV.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmSaveLHNV.getControl("ma_doi_tac").readOnly();
        _frmSaveLHNV.getControl("nv").readOnly();
        _frmSaveLHNV.getControl("ma").readOnly();
        _modalNhapLHNV.show();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLHNV.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    //Nhập sản phẩm con người
    $("#btnAddProduct").click(function () {
        _frmSaveLHNV.resetForm();
        _frmSaveLHNV.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveLHNV.getControl("ma_doi_tac").readOnly(false);
        _frmSaveLHNV.getControl("ma").readOnly(false);
        _frmSaveLHNV.clearErrorMessage();
        _frmSaveLHNV.getControl("nv").setValue("NG");
        _frmSaveLHNV.getControl("nv").readOnly();
        _frmSaveLHNV.getControl("trang_thai").setValue("1");
        $("#modal-user-log").html("");
        _modalNhapLHNV.show();
    })
    //Lưu thông sản phẩm con người
    $("#btnLuuThongTinLHNV").click(function () {
        if (_frmSaveLHNV.isValid()) {
            var formData = _frmSaveLHNV.getJsonData();
            _productHumanService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalNhapLHNV.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin sản phẩm con người
    $("#btnXoaThongTinLHNV").click(function () {
        var formData = _frmSaveLHNV.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa sản phẩm con người này không?", "", val => {
            _productHumanService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin sản phẩm con người thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    })
    //Export excel sản phẩm con người
    $("#btnExportExcelProductHuman").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_SP_CN";
        console.log(obj.ma_mau_in);
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            console.log(res);
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    })
    //Màn hình tìm sản phẩm con người
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
        _productHumanService.SaveDataExcel(obj).then(res => {
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