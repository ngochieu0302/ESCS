function AdvancePaymentService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang thanh toán
    this.paging = function (obj) {
        return _service.postData("/manager/advancepayment/paging", obj);
    };
    // Tìm kiếm danh sách thanh toán tồn
    this.layDSTon = function (obj) {
        return _service.postData("/manager/advancepayment/layDSTon", obj);
    };
    // Tìm kiếm danh sách người sử dụng
    this.layDMNguoiSuDung = function (obj) {
        return _service.postData("/manager/payment/layDMNguoiSuDung", obj);
    };
    // Nhập hồ sơ thanh toán
    this.nhapHsThanhToan = function (obj) {
        return _service.postData("/manager/payment/nhapHsThanhToan", obj);
    };
    // Xóa hồ sơ thanh toán
    this.xoaHsThanhToan = function (obj) {
        return _service.postData("/manager/payment/xoaHsThanhToan", obj);
    };
    // Lấy chi tiết hồ sơ thanh toán
    this.layCtThanhToan = function (obj) {
        return _service.postData("/manager/payment/layCtThanhToan", obj);
    };
    // Lấy danh sách tài khoản thanh toán của chi nhánh
    this.layDsTaiKhoanChiNhanh = function (obj) {
        return _service.postData("/manager/payment/layDsTaiKhoanChiNhanh", obj);
    };
}