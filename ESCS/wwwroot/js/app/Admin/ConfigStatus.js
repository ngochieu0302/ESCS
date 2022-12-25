var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _configStatus = new ConfigStatusService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinTrangThaiTen = new FormService("frmLuuThongTinTrangThaiTen");
var _modalNhapTrangThaiTen = new ModalService("modalNhapTrangThaiTen");

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_trang_thai", title: "Mã", width: "15%", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "pt_hoan_thanh", title: "% Hoàn thành", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },  
    { field: "ten_doi_tac", title: "Đối tác", width: "30%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configStatus.timKiemPtrang(objTimKiem).then(res => {
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
    _configStatus.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinTrangThaiTen.clearErrorMessage();
        _frmLuuThongTinTrangThaiTen.setData(objDatact);
        _frmLuuThongTinTrangThaiTen.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinTrangThaiTen.getControl("ma_trang_thai").readOnly();
        _frmLuuThongTinTrangThaiTen.getControl("btn_an").readOnly();
        _frmLuuThongTinTrangThaiTen.getControl("btn_hien").readOnly();
        _modalNhapTrangThaiTen.show();
    });
};

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _configStatus.TKiemTrangThai()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.ds_trang_thai = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinTrangThaiTen.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("trang_thai").setDataSource(objDanhMuc.ds_trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái", "");

        getPaging(1);
    });
    _frmTimKiem.getControl("nv").addEventChange(val => {
        var arrTrangThai = objDanhMuc.ds_trang_thai.where(n => n.nv == val);
        _frmTimKiem.getControl("trang_thai").setDataSource(arrTrangThai, "ten", "ma_trang_thai", "Chọn trạng thái", "");
    })
    //Nhập thông tin 
    $("#btnNhap").click(function () {
        _frmLuuThongTinTrangThaiTen.clearErrorMessage();
        _frmLuuThongTinTrangThaiTen.resetForm();
        _frmLuuThongTinTrangThaiTen.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinTrangThaiTen.getControl("trang_thai").setValue("D");
        _frmLuuThongTinTrangThaiTen.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuuThongTinTrangThaiTen.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinTrangThaiTen.getControl("ma_trang_thai").readOnly(false);
        _frmLuuThongTinTrangThaiTen.getControl("btn_an").readOnly(false);
        _frmLuuThongTinTrangThaiTen.getControl("btn_hien").readOnly(false);
        _modalNhapTrangThaiTen.show();
    });

    //Lưu thông tin
    $("#btnLuuThongTinTrangThaiTen").click(function () {
        if (_frmLuuThongTinTrangThaiTen.isValid()) {
            var formData = _frmLuuThongTinTrangThaiTen.getJsonData();
            _configStatus.luuTrangThai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin trạng thái thành công.");
                    getPaging(1);
                    _modalNhapTrangThaiTen.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    //Tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
});

