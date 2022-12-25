var objDanhMuc = {};
var _frmLuuMenu = new FormService("frmLuuMenu");
var _notifyService = new NotifyService();
var _service = new Service();
var _menuService = new MenuService();
var _partnerListService = new PartnerListService();
var _functionService = new FunctionService();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMenu = new ModalService("modalNhapMenu");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "icon", title: "Icon", width: "6%", headerSort: false, hozAlign: "center", formatter: formatterIcon },
    { field: "ten_hienthi", title: "Tên", width: "30%", headerSort: false },
    { field: "url", title: "URL", width: "19%", headerSort: false },
    { field: "tthai_hien_thi", title: "Chế độ hiển thị", width: "10%", hozAlign: "center", headerSort: false },
    { field: "tthai_hien_thi", title: "Trạng thái hiển thị", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nhom_ten", title: "Nhóm", width: "15%", hozAlign: "center", headerSort: false },
];

var _gridViewMenu = new GridViewService("gridViewMenu", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _menuService.paging(objTimKiem).then(res => {
        _gridViewMenu.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _menuService.getDetail(data).then(res => {
        var objData = res.data_info;
        _frmLuuMenu.clearErrorMessage();
        _frmLuuMenu.setData(objData);
        _frmLuuMenu.getControl("nhom").trigger("select2:select");
        if (objData.so_id_cha != undefined && objData.so_id_cha != null && objData.so_id_cha != "" && objData.so_id_cha!= 0) {
            _frmLuuMenu.getControl("so_id_cha").val(objData.so_id_cha);
        }
        if (objData.nhom_quyen != undefined && objData.nhom_quyen != null && objData.nhom_quyen != "") {
            var arr = objData.nhom_quyen.split(',');
            $("input.menu_nhom_quyen").each(function (index) {
                var count = arr.where(n => n == $(this).val()).length;
                if (count > 0) {
                    $(this).prop("checked", true);
                }
                else {
                    $(this).prop("checked", false);
                }
            });
        } 
        _modalNhapMenu.show();
        row.select();
    });
};
function bindDataMenucha() {
    var nhom = _frmLuuMenu.getControl("nhom").val();
    var data = [];
    if (objDanhMuc.menu_cha != undefined && objDanhMuc.menu_cha != null) {
        data = objDanhMuc.menu_cha.where(n => n.nhom == nhom);
        _frmLuuMenu.getControl("so_id_cha").setDataSource(data, "ten", "so_id", "Chọn menu cha", "");
    }
   
}
function chonNhomQuyen(el) {
    var nhom_quyen = "";
    $("input.menu_nhom_quyen:checked").each(function (index) {
        if (index == 0) {
            nhom_quyen = $(this).val();
        }
        else {
            nhom_quyen += ","+$(this).val();
        }
    });
    _frmLuuMenu.getControl("nhom_quyen").val(nhom_quyen);
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _menuService.getListParentMenu(),
        _functionService.timKiem()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.menu_cha = arrRes[1].data_info;
        objDanhMuc.nhom_quyen = arrRes[2].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuMenu.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        ESUtil.genHTML("dsNhomQuyenTemplate", "dsNhomQuyen", { nhom_quyen: objDanhMuc.nhom_quyen });

        _frmLuuMenu.getControl("so_id_cha").setDataSource([], "ten", "so_id", "Chọn menu cha", "");
    });
    _frmLuuMenu.getControl("nhom").addEventChange(val => {
        bindDataMenucha();
    });
    $("#btnNhapMenu").click(function () {
        _frmLuuMenu.resetForm();
        _frmLuuMenu.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        ESUtil.genHTML("dsNhomQuyenTemplate", "dsNhomQuyen", { nhom_quyen: objDanhMuc.nhom_quyen });
        _frmLuuMenu.clearErrorMessage();
        _modalNhapMenu.show();
    });
    $("#btnLuuThongBao").click(function () {
        if (_frmLuuMenu.isValid()) {
            var formData = _frmLuuMenu.getJsonData();
            _menuService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông báo thành công.");
                    getPaging(1);
                    _modalNhapMenu.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaThongBao").click(function () {
        var formData = _frmLuuMenu.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa menu này không?", "", val => {
            _menuService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin menu thành công.");
                    getPaging(1);
                    _modalNhapMenu.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});

