function CustomerService() {

    var _service = new Service();
    // Lấy tất cả danh sách quản lý khách hàng (CACHE)
    this.getAllKH = function () {
        return _service.postData("/contract/customer/getall", {});
    }
    // Lưu thông tin khách hàng
    this.saveKH = function (obj) {
        return _service.postData("/contract/customer/save", obj);
    };
    // Tìm kiếm khách hàng
    this.timKiemKH = function (obj) {
        return _service.postData("/contract/customer/getpaging", obj);
    }
    // Xem thông tin chi tiết khách hàng
    this.xemChiTiet_KH = function (obj) {
        return _service.postData("/contract/customer/getdetail", obj);
    }
}