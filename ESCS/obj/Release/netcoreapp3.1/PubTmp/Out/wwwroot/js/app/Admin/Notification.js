var objDanhMuc = {};
var _frmLuuThongTinThongBao = new FormService("frmLuuThongTinThongBao");
var _notifyService = new NotifyService();
var _notificationService = new NotificationService();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapThongBao = new ModalService("modalNhapThongBao");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac", title: "Mã đối tác", width: "10%", headerSort: false },
    { field: "nsd", title: "NSD", width: "10%", headerSort: false },
    { field: "chu_de", title: "Chủ đề", width: "12%", headerSort: false },
    { field: "tieu_de", title: "Tiêu đề", width: "12%", headerSort: false },
    { field: "nd", title: "Nội dung", width: "12%", headerSort: false },
    { field: "nd_tom_tat", title: "Nội dung tóm tắt", width: "10%", headerSort: false },
    { field: "tg_thong_bao", title: "Thời gian thông báo", width: "12%", headerSort: false },
    { field: "loai_thong_bao", title: "Loại thông báo", width: "15%", headerSort: false },
    { field: "canh_bao", title: "Cảnh báo", width: "12%", headerSort: false },
    { field: "nguoi_gui", title: "Người gửi", width: "10%", headerSort: false },
];
var _gridViewThongBao = new GridViewService("gridViewThongBao", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 15;
    _notificationService.paging(objTimKiem).then(res => {
        _gridViewThongBao.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _notificationService.getDetail(data).then(res => {
        var objData = res.data_info;
        _frmLuuThongTinThongBao.setData(objData);
        _modalNhapThongBao.show();
        row.select();
    });
};

$(document).ready(function () {
    _notificationService.pageload().then(res => {
        objDanhMuc = res;
        console.log(objDanhMuc);
        _frmTimKiem.getControl("ten").setDataSource(objDanhMuc.data_info, "ten", "ma", "Chọn tên đối tác", "");
        getPaging(1);
    });

    $("#btnNhapThongTin").click(function () {
        _frmLuuThongTinThongBao.resetForm();
        _modalNhapThongBao.show();
    });

    $("#btnLuuThongTin").click(function () {
        if (_frmLuuThongTinThongBao.isValid()) {
            var formData = _frmLuuThongTinThongBao.getJsonData();

            _notificationService.save(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Đã lưu thông báo thành công.");
                    getPaging(1);
                    _modalNhapThongBao.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXoaThongTin").click(function () {
        var formData = _frmLuuThongTinThongBao.getJsonData();
        _notificationService.delete(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Đã xóa thông báo thành công.");
                getPaging(1);
                _modalNhapThongBao.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});

