var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _benefitsProductService = new BenefitsProductService();
var _productHumanService = new ProductHumanService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalAdd = new ModalService("modalAdd");
var _frmSaveQuyenLoi = new FormService("frmSaveQuyenLoi");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "6%", hozAlign: "center", headerSort: false },
    { field: "ten_hienthi", title: "Tên", width: "22%", headerSort: false },
    { field: "ma_lhnv", title: "Mã SP", width: "6%", hozAlign: "center", headerSort: false },
    { field: "ten_sp", title: "Tên SP", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "Người sử dụng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_hthi", title: "Ngày tạo", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", hozAlign: "center", width: "10%", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewLHNV = new GridViewService("gridViewLHNV", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _benefitsProductService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewLHNV.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewLHNV.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewLHNV.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.ma === undefined || data.ma === null || data.ma === "") {
        return;
    }
    _benefitsProductService.layThongTinChiTiet(data).then(res => {
        _frmSaveQuyenLoi.resetForm();
        var objDatact = res.data_info;
        _frmSaveQuyenLoi.clearErrorMessage();
        if (res.data_info.loai == null || res.data_info.loai == '' || res.data_info.loai == undefined) {
            $("form[name=frmSaveQuyenLoi] #loai_nt").prop("checked", false);
            $("form[name=frmSaveQuyenLoi] #loai_gt").prop("checked", false);
            $("form[name=frmSaveQuyenLoi] #loai_ra").prop("checked", false);
        } else {
            var arr_loai = res.data_info.loai.split(';');
            if (arr_loai.indexOf('NT') != -1) {
                $("form[name=frmSaveQuyenLoi] #loai_nt").prop("checked", true);
            }
            if (arr_loai.indexOf('GT') != -1) {
                $("form[name=frmSaveQuyenLoi] #loai_gt").prop("checked", true);
            }
            if (arr_loai.indexOf('RA') != -1) {
                $("form[name=frmSaveQuyenLoi] #loai_ra").prop("checked", true);
            }
        };
        _frmSaveQuyenLoi.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmSaveQuyenLoi.getControl("nhom").trigger('select2:select');
        _frmSaveQuyenLoi.getControl("ma_doi_tac").trigger('select2:select');
        _frmSaveQuyenLoi.getControl("ma_lhnv").setValue(objDatact.ma_lhnv);
        row.select();
        _frmSaveQuyenLoi.getControl("ma_doi_tac").readOnly();
        _frmSaveQuyenLoi.getControl("ma_lhnv").readOnly();
        _frmSaveQuyenLoi.getControl("ma").readOnly();
        _frmSaveQuyenLoi.getControl("nv").readOnly();
        _modalAdd.show();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
function layThongTinLoaiHinh() {
    var arr_loai = [];
    var rang_checked = $('form[name=frmSaveQuyenLoi] #loai_ra').is(":checked");
    var nt_checked = $("form[name=frmSaveQuyenLoi] #loai_nt").is(":checked");
    var gt_checked = $("form[name=frmSaveQuyenLoi] #loai_gt").is(":checked");
    if (rang_checked) {
        arr_loai.push('RA');
    }
    if (nt_checked) {
        arr_loai.push('NT');
    }
    if (gt_checked) {
        arr_loai.push('GT');
    }
    var loai = arr_loai.join(';');
    return loai;  
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _productHumanService.getAllSanPham(),
        _benefitsProductService.layQuyenLoiCha()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.ten_sp = arrRes[1].data_info;
        objDanhMuc.ql_cha = arrRes[2].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_doi_tac").trigger('select2:select');
        _frmSaveQuyenLoi.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_lhnv").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        _frmSaveQuyenLoi.getControl("ma_lhnv").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        _frmSaveQuyenLoi.getControl("ma_ct").setDataSource(objDanhMuc.ql_cha, "ten", "ma", "Chọn quyền lợi cha", "");
    });
    //Nhập thông tin quyền lợi sản phẩm
    $("#btnAddLHNV").click(function() {
        _frmSaveQuyenLoi.resetForm();
        _frmSaveQuyenLoi.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQuyenLoi.getControl("ma_doi_tac").readOnly(false);
        _frmSaveQuyenLoi.getControl("ma_lhnv").readOnly(false);
        _frmSaveQuyenLoi.getControl("ma").readOnly(false);
        _frmSaveQuyenLoi.clearErrorMessage();
        _frmSaveQuyenLoi.getControl("nv").setValue("NG");
        _frmSaveQuyenLoi.getControl("trang_thai").setValue("1");
        _frmSaveQuyenLoi.getControl("nv").readOnly();
        $("#modal-user-log").html("");
/*        _frmSaveQuyenLoi.getControl("ma_ct").readOnly(true);*/
        _modalAdd.show();
    });
    //_frmSaveQuyenLoi.getControl("nhom").addEventChange(val => {
    //    if (val == 'CHINH') {
    //        _frmSaveQuyenLoi.getControl("ma_ct").readOnly(false);
    //    } else {
    //        _frmSaveQuyenLoi.getControl("ma_ct").readOnly(true);
    //    }
    //});
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var sp = objDanhMuc.ten_sp.where(n => n.ma_doi_tac == val);
        _frmTimKiem.getControl("ma_lhnv").setDataSource(sp, "ten", "ma", "Chọn sản phẩm", "");
    });
    _frmSaveQuyenLoi.getControl("ma_doi_tac").addEventChange(val => {
        var sp = objDanhMuc.ten_sp.where(n => n.ma_doi_tac == val);
        _frmSaveQuyenLoi.getControl("ma_lhnv").setDataSource(sp, "ten", "ma", "Chọn sản phẩm", "");
    });

    $("#btnSaveQuyenLoi").click(function() {
        if (_frmSaveQuyenLoi.isValid()) {
            var formData = _frmSaveQuyenLoi.getJsonData();
            formData.loai = layThongTinLoaiHinh();
            _benefitsProductService.saveBeneFits(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin quyền lợi thành công.");
                    if (formData.ma_ct == "") {
                        _benefitsProductService.layQuyenLoiCha().then(res => {
                            objDanhMuc.ql_cha = res.data_info;
                            _frmSaveQuyenLoi.getControl("ma_ct").setDataSource(objDanhMuc.ql_cha,
                                "ten",
                                "ma",
                                "Chọn quyền lợi cha",
                                "");
                        });
                    }
                    getPaging(1);
                    _modalAdd.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnDeleteQuyenLoi").click(function() {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa quyền lợi sản phẩm này không?",
            "",
            val => {
                _notifyService.warning(
                    "Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
            });
    });
    $("#btnExportExcelBenefitsProduct").click(function() {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_QUYEN_LOI_SP";
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
    $("#btnTimKiem").click(function() {
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
        _benefitsProductService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    getPaging(1);
})