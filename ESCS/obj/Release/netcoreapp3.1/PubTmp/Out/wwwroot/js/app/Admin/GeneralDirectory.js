var objDanhMuc = {};

var _service = new Service();
var _partnerListService = new PartnerListService();
var _generalDirectoryService = new GeneralDirectoryService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveCSYT = new FormService("frmSaveCSYT");
var _modalNhapCSYT = new ModalService("modalNhapCSYT");

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", align: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "nhom_hthi", title: "Nhóm", width: "15%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_hthi", title: "Ngày tạo", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ghi_chu", title: "Ghi chú", width: "25%", headerSort: false }    
];

var _gridViewCSYT = new GridViewService("gridViewCSYT", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _generalDirectoryService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewCSYT.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewCSYT.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewCSYT.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
};
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _generalDirectoryService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveCSYT.clearErrorMessage();
        _frmSaveCSYT.setData(objDatact);
        _frmSaveCSYT.getControl("ma_doi_tac").readOnly();
        _frmSaveCSYT.getControl("ma").readOnly();
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _modalNhapCSYT.show();
    });
};

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCSYT.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    });

    $("#btnNhapCSYT").click(function () {
        _frmSaveCSYT.resetForm();
        _frmSaveCSYT.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveCSYT.getControl("ma_doi_tac").readOnly(false);
        _frmSaveCSYT.getControl("ma").readOnly(false);
        _frmSaveCSYT.clearErrorMessage();
        _frmSaveCSYT.getControl("trang_thai").setValue("1");
        $("#modal-user-log").html("");
        _modalNhapCSYT.show();
    })

    $("#btnSaveCSYT").click(function () {
        if (_frmSaveCSYT.isValid()) {
            var formData = _frmSaveCSYT.getJsonData();
            _generalDirectoryService.saveCSYT(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin bộ mã chung thành công");
                    getPaging(1);
                    _modalNhapCSYT.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })

    $("#btnDeleteCSYT").click(function () {
        var formData = _frmSaveCSYT.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa bộ mã chung này không?", "", val => {
            _generalDirectoryService.deleteCSYT(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin bộ mã chung thành công");
                    getPaging(1);
                    _modalNhapCSYT.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    })

    $("#btnTimKiem").click(function () {
        getPaging(1);
    })

    getPaging(1);
});