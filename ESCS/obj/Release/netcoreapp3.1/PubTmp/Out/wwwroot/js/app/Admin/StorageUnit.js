var objDanhMuc = {};
var _frmSaveKhoTHVT = new FormService("frmSaveKhoTHVT");
var _notifyService = new NotifyService();
var _service = new Service();
var _commonService = new CommonService();
var _storageUnitService = new StorageUnitService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapKhoTHVT = new ModalService("modalNhapKhoTHVT");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var GRID_HO_SO_SO_DONG = 14;
var objData = null;

var objDanhMucDonViHanhChinh = [];

var configColumn = [
    { field: "sott", title: "STT", width: "3%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã kho", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên kho", width: "15%", hozAlign: "center", headerSort: false },
    { field: "tinh_thanh_ten", title: "Tỉnh thành", width: "10%", hozAlign: "center", headerSort: false },
    { field: "quan_huyen_ten", title: "Quận huyện", width: "9%", hozAlign: "center", headerSort: false },
    { field: "xa_phuong_ten", title: "Phường xã", width: "9%", hozAlign: "center", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "20%", hozAlign: "center", headerSort: false },
    { field: "dvi_qly_ten", title: "Đơn vị quản lý", width: "12%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac_ten", title: "Đối tác", width: "12%", hozAlign: "center", headerSort: false },
];
var _gridViewKhoTHVT = new GridViewService("gridViewKhoTHVT", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _storageUnitService.getPaging(objTimKiem).then(res => {
        _gridViewKhoTHVT.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewKhoTHVT.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewKhoTHVT.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _storageUnitService.detailKTHVT(data).then(res => {
        var objDatact = res.data_info;

        _frmSaveKhoTHVT.clearErrorMessage();
        _frmSaveKhoTHVT.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        if (objDatact.ma_doi_tac != null || objDatact.ma_doi_tac != '') {
            arrTempCN = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac.trim() === objDatact.ma_doi_tac);
            _frmSaveKhoTHVT.getControl("dvi_qly").setDataSource(arrTempCN, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmSaveKhoTHVT.getControl("dvi_qly").setValue(objDatact.dvi_qly);
        }

        if (objDatact.tinh_thanh != null || objDatact.tinh_thanh != '') {
            arrTempQuan = objDanhMuc.quan_huyen.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === objDatact.tinh_thanh);
            _frmSaveKhoTHVT.getControl("quan_huyen").setDataSource(arrTempQuan, "ten_quan", "ma_quan", "Chọn quận huyện", "");
            _frmSaveKhoTHVT.getControl("quan_huyen").setValue(objDatact.quan_huyen);

            if (objDatact.quan_huyen != null || objDatact.quan_huyen != '') {
                arrTempXa = objDanhMuc.xa_phuong.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === objDatact.quan_huyen);
                _frmSaveKhoTHVT.getControl("xa_phuong").setDataSource(arrTempXa, "ten_phuong", "ma_phuong", "Chọn phường xã", "");
                _frmSaveKhoTHVT.getControl("xa_phuong").setValue(objDatact.xa_phuong);
            }
        }

        _frmSaveKhoTHVT.getControl("ma_doi_tac").readOnly();
        _frmSaveKhoTHVT.getControl("ma").readOnly();
        _modalNhapKhoTHVT.show();
        row.select();
    });
};
function bindCbbDoiTacChiNhanh(objDoiTac, objChiNhanh) {
    _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDoiTac, "ten", "ma", "Chọn đối tác", "");
    _frmTimKiem.getControl("dvi_qly").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrCN = objChiNhanh.where(n => n.ma_doi_tac.trim() === val);
        _frmTimKiem.getControl("dvi_qly").setDataSource(arrCN, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiem.getControl("dvi_qly").setValue("");
    });

    _frmSaveKhoTHVT.getControl("ma_doi_tac").setDataSource(objDoiTac, "ten", "ma", "Chọn đối tác", "");
    _frmSaveKhoTHVT.getControl("dvi_qly").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    _frmSaveKhoTHVT.getControl("ma_doi_tac").addEventChange(val => {
        var arrCN = objChiNhanh.where(n => n.ma_doi_tac.trim() === val);
        _frmSaveKhoTHVT.getControl("dvi_qly").setDataSource(arrCN, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSaveKhoTHVT.getControl("dvi_qly").setValue("");
    });
}

function bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh) {
    var dviHanhChinh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");

    _frmTimKiem.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmTimKiem.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmTimKiem.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmTimKiem.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmTimKiem.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTimKiem.getControl("quan_huyen").setValue("");
        _frmTimKiem.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmTimKiem.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmTimKiem.getControl("xa_phuong").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmTimKiem.getControl("xa_phuong").setValue("");
    });

    _frmSaveKhoTHVT.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmSaveKhoTHVT.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmSaveKhoTHVT.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    _frmSaveKhoTHVT.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmSaveKhoTHVT.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmSaveKhoTHVT.getControl("quan_huyen").setValue("");
        _frmSaveKhoTHVT.getControl("xa_phuong").setDataSource([], "ten_phuong", "ma_phuong", "Chọn xã phường", "");
    });
    _frmSaveKhoTHVT.getControl("quan_huyen").addEventChange(val => {
        var arrXaPhuong = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() !== "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() !== "" && n.ma_quan.trim() === val);
        _frmSaveKhoTHVT.getControl("xa_phuong").setDataSource(arrXaPhuong, "ten_phuong", "ma_phuong", "Chọn xã phường", "");
        _frmSaveKhoTHVT.getControl("xa_phuong").setValue("");
    });
}

$(document).ready(function () {
    objTrangThai = [{ ten: "Đang sử dụng", ma: "D" }, { ten: "Ngưng sử dụng", ma: "K" }];
    _frmTimKiem.getControl("trang_thai").setDataSource(objTrangThai, "ten", "ma", "Chọn trạng thái", "");
    _frmSaveKhoTHVT.getControl("trang_thai").setDataSource(objTrangThai, "ten", "ma", "Chọn trạng thái", "");

    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _commonService.layTatCaDonViHanhChinh()
    ]).then(arrRes => {

        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        bindCbbDoiTacChiNhanh(arrRes[0].data_info, arrRes[1].data_info);
        
        objDanhMucDonViHanhChinh = arrRes[2].data_info;
        bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);
        objDanhMuc.tinh_thanh = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() == "" && n.ma_phuong.trim() == "");
        objDanhMuc.quan_huyen = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() == "");
        objDanhMuc.xa_phuong = objDanhMucDonViHanhChinh.where(n => n.ma_tinh.trim() != "" && n.ma_quan.trim() != "" && n.ma_phuong.trim() != "");

    });

    //Nhập thông tin
    $("#btnNhapKhoTHVT").click(function () {
        _frmSaveKhoTHVT.resetForm();
        _frmSaveKhoTHVT.getControl("ma_doi_tac").readOnly(false);
        _frmSaveKhoTHVT.getControl("ma").readOnly(false);
        _frmSaveKhoTHVT.clearErrorMessage();
        $("#modal-user-log").html("");
        _modalNhapKhoTHVT.show();
    });
    //Lưu thông tin 
    $("#btnLuuKho").click(function () {
        if (_frmSaveKhoTHVT.isValid()) {
            var formData = _frmSaveKhoTHVT.getJsonData();
            _storageUnitService.saveKTHVT(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin mã kho thành công.");
                    getPaging(1);
                    _modalNhapKhoTHVT.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin 
    $("#btnXoaKho").click(function () {
        var formData = _frmSaveKhoTHVT.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình này không?", "", val => {
            _storageUnitService.deleteKTHVT(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin mã kho thành công.");
                    getPaging(1);
                    _modalNhapKhoTHVT.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });


    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);

});