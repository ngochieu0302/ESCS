var objDanhMuc = {};
var _frmLuuThongTinMauIn = new FormService("frmLuuThongTinMauIn");
var _notifyService = new NotifyService();
var _service = new Service();
var _mauinservice = new Mauinservice();
var _partnerListService = new PartnerListService();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapMauIn = new ModalService("modalNhapMauIn");
var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "ngay_ht", title: "Ngày hệ thống", width: "10%", headerSort: false },
    { field: "ma_action_api", title: "Mã action", width: "20%", headerSort: false },
    { field: "ma_doi_tac", title: "Mã đối tác", width: "10%", headerSort: false },
    { field: "ten", title: "Tên mẫu in", width: "10%", headerSort: false },
    { field: "ma", title: "Mã", width: "15%", headerSort: false },
    { field: "url_file", title: "Url File", width: "30%", headerSort: false },
];
var _gridViewMauIn = new GridViewService("gridViewMauIn", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 12;
    _mauinservice.paging(objTimKiem).then(res => {
        _gridViewMauIn.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _mauinservice.getDetail(data).then(res => {
        var objData = res.data_info;
        _frmLuuThongTinMauIn.setData(objData);
        _modalNhapMauIn.show();
        row.select();
    });
};
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", "");
        _frmLuuThongTinMauIn.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", "");
    });
    $("#btnNhapThongTinMauIn").click(function () {
        _frmLuuThongTinMauIn.resetForm();
        _modalNhapMauIn.show();
    });
    $("#btnLuuThongTinMauIn").click(function () {
        if (_frmLuuThongTinMauIn.isValid()) {
            var formData = _frmLuuThongTinMauIn.getJsonData();

            _mauinservice.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin mẫu in thành công.");
                    getPaging(1);
                    _modalNhapMauIn.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //$("#btnXoaThongTinMauIn").click(function () {
    //    var formData = _frmLuuThongTinMauIn.getJsonData();
    //    _mauinservice.delete(formData).then(res => {
    //        if (res.state_info.status === "OK") {
    //            _notifyService.success("Xóa thông tin mẫu in thành công.");
    //            getPaging(1);
    //            _modalNhapMauIn.hide();
    //        }
    //        else {
    //            _notifyService.error(res.state_info.message_body);
    //        }
    //    });
    //});
    $("#btnXoaThongTinMauIn").click(function () {
        var formData = _frmLuuThongTinMauIn.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa đối tác này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
            //_partnerListService.xoaDoiTac(formData).then(res => {
            //    if (res.state_info.status === "OK") {
            //        _notifyService.success("Xóa thông tin mã đối tác thành công.");
            //        getPaging(1);
            //        _modalNhapMaDoiTac.hide();
            //    }
            //    else {
            //        _notifyService.error(res.state_info.message_body);
            //    }
            //});
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $("#btnCompile").click(function () {
        var obj = _frmLuuThongTinMauIn.getJsonData();
        obj.ma_mau_in = obj.ma;
        _mauinservice.compile(obj).then(res => {
            if (res.state_info.status !== "OK") {
                return;
            }
            _notifyService.success("Compile thành công");
        });
    });
    $("#btnCopyAndCompile").click(function () {
        var obj = _frmLuuThongTinMauIn.getJsonData();
        var objNew = {
            ma_mau_in: obj.ma
        }
        _mauinservice.copyAndCompile(objNew).then(res => {
            if (res.state_info.status !== "OK") {
                return;
            }
            _notifyService.success("Compile thành công");
        });
    });
    getPaging(1);
});

