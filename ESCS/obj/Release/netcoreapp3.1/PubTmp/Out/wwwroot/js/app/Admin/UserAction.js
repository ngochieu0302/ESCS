var objDanhMuc = {};

var _service = new Service();
var _userActionService = new UserActionService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _userManagementService = new UserManagementService();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalLogNSD = new ModalService("modalLogNSD");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_chi_nhanh_ten", title: "Chi nhánh", width: "20%", hozAlign: "center", headerSort: false },
    { field: "nsd_ten", title: "Người sử dụng", width: "15%", hozAlign: "center", headerSort: false },
    { field: "vung_qt_ten", title: "Vùng quản trị", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nhom_ten", title: "Nhóm", width: "15%", headerSort: false },
    { field: "chuc_nang_ten", title: "Chức năng", width: "15%", headerSort: false },
    { field: "loai_hd_hthi", title: "Loại hành động", hozAlign: "center", width: "10%", headerSort: false },
    { field: "thoi_gian_hthi", title: "Thời gian", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac_ten", title: "Đơn vị", width: "12%", hozAlign: "center", headerSort: false }
];

var _gridViewAction = new GridViewService("gridViewAction", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _userActionService.timKiemHD(objTimKiem).then(res => {
        _gridViewAction.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewAction.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewAction.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    objTimKiem = data;
    ESUtil.genHTML("templateThongTinLogNSD", "ThongTinLogNSD", data);
    _modalLogNSD.show();
};

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _branchListService.layDsChiNhanh(), _userManagementService.layDsNSD()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.nsd = arrRes[2].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    //Màn hình tìm kiếm
    $("#btnSearchHD").click(function () {
        getPaging(1);
    });
});