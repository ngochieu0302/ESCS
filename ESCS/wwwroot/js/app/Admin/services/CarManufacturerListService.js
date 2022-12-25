function CarManufacturerListService() {
    var _service = new Service();
    // Lấy tất cả danh sách hãng xe
    this.layDsHangXe = function () {
        return _service.postData("/admin/carmanufacturerlist/getall", {});
    };
    // Xóa hãng xe
    this.xoaHangXe = function (obj) {
        return _service.postData("/admin/carmanufacturerlist/delete", obj);
    };
    // Lưu thông tin hãng xe
    this.luuThongTinHangXe = function (obj) {
        return _service.postData("/admin/carmanufacturerlist/save", obj);
    };
    // Tìm kiếm + phân trang hãng xe
    this.timKiemHangXe = function (obj) {
        return _service.postData("/admin/carmanufacturerlist/getpaging", obj);
    };
    // Lấy thông tin chi tiết hãng xe
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/carmanufacturerlist/getdetail", obj);
    };
    // Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/carmanufacturerlist/SaveDataExcel", obj);
    };
} 