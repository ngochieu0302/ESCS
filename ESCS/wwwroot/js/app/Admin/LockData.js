var objDanhMuc = {};
var ESCS_MA_DOI_TAC_DUY_NHAT = '';
var dateNow = new Date().ddmmyyyy();
var objData = null;
//Service
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _lockDataService = new LockDataService();

//Form
var _frmNhapTTKhoaDL = new FormService('frmNhapTTKhoaDL');
var _frmTimKiem = new FormService("frmTimKiem");
//Modal
var _modalNhapTTKhoaDL = new ModalService('modalNhapTTKhoaDL');

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "NGƯỜI KHÓA", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_khoa_dl", title: "NGÀY KHÓA", width: "12%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "CHI NHÁNH", width: "33%", headerSort: false },
    { field: "ten_doi_tac", title: "ĐỐI TÁC", width: "30%", headerSort: false }
];

var _gridView = new GridViewService("gridViewTTKhoaDL", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _lockDataService.getPaging(objTimKiem).then(res => {
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
    _lockDataService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmNhapTTKhoaDL.clearErrorMessage();
        _frmNhapTTKhoaDL.setData(objDatact);
        _frmNhapTTKhoaDL.getControl("ma_doi_tac").readOnly();
        _frmNhapTTKhoaDL.getControl("ma_chi_nhanh").readOnly();
        _frmNhapTTKhoaDL.getControl("nv").readOnly();
        _frmNhapTTKhoaDL.getControl("ngay_khoa").readOnly();
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _modalNhapTTKhoaDL.show();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", '');
        _frmTimKiem.getControl("ma_doi_tac").trigger('select2:select');

        _frmNhapTTKhoaDL.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmNhapTTKhoaDL.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", '');
        _frmNhapTTKhoaDL.getControl("ma_doi_tac").trigger('select2:select');

        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", '');
    });
    _frmNhapTTKhoaDL.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        _frmNhapTTKhoaDL.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", '');
    });

    //Nhập thông tin
    $("#btnThemMoi").click(function () {
        _frmNhapTTKhoaDL.clearErrorMessage();
        _frmNhapTTKhoaDL.resetForm();
        _frmNhapTTKhoaDL.getControl('ma_doi_tac').setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmNhapTTKhoaDL.getControl('ma_doi_tac').trigger('select2:select');
        _frmNhapTTKhoaDL.getControl("ma_doi_tac").readOnly(false);
        _frmNhapTTKhoaDL.getControl("ma_chi_nhanh").readOnly(false);
        _frmNhapTTKhoaDL.getControl("nv").readOnly(false);
        _frmNhapTTKhoaDL.getControl("ngay_khoa").readOnly(false);
        _frmNhapTTKhoaDL.getControl('ngay_khoa').setValue(dateNow);
        $("#modal-user-log").html("");
        _modalNhapTTKhoaDL.show();
    });

    //Lưu thông tin
    $("#btnLuuTTKhoaDL").click(function () {
        if (_frmNhapTTKhoaDL.isValid()) {
            var formData = _frmNhapTTKhoaDL.getJsonData();
            _lockDataService.luuThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    getPaging(1);
                    _modalNhapTTKhoaDL.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    //Xóa thông tin
    $("#btnXoaTTKhoaDL").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", val => {
            var formData = _frmNhapTTKhoaDL.getJsonData();
            _lockDataService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPaging(1);
                    _modalNhapTTKhoaDL.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    //Tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});