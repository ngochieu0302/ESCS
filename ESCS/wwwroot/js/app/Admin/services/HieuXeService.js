function HieuXeService() {
    var _service = new Service();
    //Lấy tất cả danh sách hiệu xe (có cache)
    this.layDsHieuXe = function () {
        return _service.postData("/admin/hieuxe/pageload", {});
    };
    //Xóa thông tin hiệu xe
    this.xoaHieuXe = function (obj) {
        return _service.postData("/admin/hieuxe/delete", obj);
    };
    //Lưu thông tin hiệu xe
    this.luuThongTinHieuXe = function (obj) {
        return _service.postData("/admin/hieuxe/save", obj);
    };
    //Tìm kiếm hiệu xe
    this.timKiemHieuXe = function (obj) {
        return _service.postData("/admin/hieuxe/getpaging", obj);
    };
    //Lấy thông tin chi tiết hiệu xe
    this.layThongTinChiTietHieuXe = function (obj) {
        return _service.postData("/admin/hieuxe/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/hieuxe/SaveDataExcel", obj);
    };
} 