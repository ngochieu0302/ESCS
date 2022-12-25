var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _configureQRCODEService = new ConfigureQRCODEService();

var _frmLuuThongTinCauHinh = new FormService("frmLuuThongTinCauHinh");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapCauHinh = new ModalService("modalNhapCauHinh");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "loai_hthi", title: "Loại", width: "15%", headerSort: false },
    { field: "url_redirect", title: "Url redirect", width: "15%", headerSort: false },
    { field: "do_rong", title: "Độ rộng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "cap_do", title: "Cấp độ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewCauHinh = new GridViewService("gridViewCauHinh", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configureQRCODEService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewCauHinh.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCauHinh.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCauHinh.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    //_hospitalService.layThongTinChiTiet(data).then(res => {
    //    if (row !== undefined) {
    //        row.select();
    //    }
    //    var objDatact = res.data_info;
    //    _frmLuuThongTinHospital.resetForm();
    //    _frmLuuThongTinHospital.setData(objDatact);
    //    _frmLuuThongTinHospital.getControl("ma_doi_tac").readOnly();
    //    _frmLuuThongTinHospital.getControl("ma").readOnly();
    //    _frmLuuThongTinHospital.getControl("tinh_thanh").trigger("select2:select");
    //    _frmLuuThongTinHospital.getControl("quan_huyen").setValue(objDatact.quan_huyen);
    //    _frmLuuThongTinHospital.getControl("ngan_hang").trigger("select2:select");
    //    _frmLuuThongTinHospital.getControl("chi_nhanh_ngan_hang").setValue(objDatact.chi_nhanh_ngan_hang);
    //    _frmLuuThongTinHospital.clearErrorMessage();
    //    _modalNhapHospital.show();
    //});
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHinh.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        getPaging(1);
    });
    //Nhập thông tin cấu hình
    $("#btnNhapThongTinCauHinh").click(function () {
        _frmLuuThongTinCauHinh.resetForm();
        _frmLuuThongTinCauHinh.clearErrorMessage();
        _frmLuuThongTinCauHinh.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHinh.getControl("ma_doi_tac").readOnly(false);
        _modalNhapCauHinh.show();
    });
    //Lưu thông tin cấu hình
    $("#btnLuuThongTinCauHinh").click(function () {
        if (_frmLuuThongTinCauHinh.isValid()) {
            var formData = _frmLuuThongTinCauHinh.getJsonData();
            _configureQRCODEService.luuCauHinhQRCODE(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin cấu hình thành công.");
                    getPaging(1);
                    _modalNhapCauHinh.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
})