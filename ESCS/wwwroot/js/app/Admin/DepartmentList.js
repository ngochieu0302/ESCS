var objDanhMuc = {};
var _frmLuuThongTinDoiTacPhong = new FormService("frmLuuThongTinDoiTacPhong");
var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _departmentListService = new DepartmentListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMaDoiTacPhong = new ModalService("modalNhapMaDoiTacPhong");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "6%", hozAlign: "center" , headerSort: false },
    { field: "ten", title: "Tên", width: "35%", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "35%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];
var _gridViewDoiTacPhong = new GridViewService("gridViewDoiTacPhong", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _departmentListService.timKiemPhongBan(objTimKiem).then(res => {
        _gridViewDoiTacPhong.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _departmentListService.layThongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTinDoiTacPhong.clearErrorMessage();
        _frmLuuThongTinDoiTacPhong.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setValue(objDatact.ma_chi_nhanh);
        _modalNhapMaDoiTacPhong.show();
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinDoiTacPhong.getControl("ma").readOnly();
        row.select();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";

        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        getPaging(1);
    });

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị chi nhánh", "");
    });

    _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn đơn vị chi nhánh", "");
    });
    $("#btnNhapThongTinDoiTacPhong").click(function () {
        _frmLuuThongTinDoiTacPhong.clearErrorMessage();
        _frmLuuThongTinDoiTacPhong.resetForm();
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        if (ESCS_MA_DOI_TAC_DUY_NHAT == '') {
            _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        }
        _frmLuuThongTinDoiTacPhong.getControl("ma_chi_nhanh").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("ma").readOnly(false);
        _frmLuuThongTinDoiTacPhong.getControl("trang_thai").setValue(1);
        $("#modal-user-log").html("");
        _modalNhapMaDoiTacPhong.show();
    });
    $("#btnLuuThongTinDoiTacPhong").click(function () {
        if (_frmLuuThongTinDoiTacPhong.isValid()) {
            var formData = _frmLuuThongTinDoiTacPhong.getJsonData();
            _departmentListService.luuPhongBan(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin mã đối tác phòng ban thành công.");
                    getPaging(1);
                    _modalNhapMaDoiTacPhong.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaThongTinDoiTacPhong").click(function () {
        var formData = _frmLuuThongTinDoiTacPhong.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa phòng ban này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
            //_departmentListService.xoaPhongBan(formData).then(res => {
            //    if (res.state_info.status === "OK") {
            //        _notifyService.success("Xóa thông tin mã đối tác phòng ban thành công.");
            //        getPaging(1);
            //        _modalNhapMaDoiTacPhong.hide();
            //    }
            //    else {
            //        _notifyService.error(res.state_info.message_body);
            //    }
            //});
        });
    });
    $("#btnExportExcelDepartmentList").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_PHONG_BAN";
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
        _departmentListService.SaveDataExcel(obj).then(res => {
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

