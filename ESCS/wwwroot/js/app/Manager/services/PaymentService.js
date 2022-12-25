function PaymentService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang thanh toán
    this.paging = function (obj) {
        return _service.postData("/manager/payment/paging", obj);
    };
    // Tìm kiếm danh sách thanh toán tồn
    this.layDSTon = function (obj) {
        return _service.postData("/manager/payment/layDSTon", obj);
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
    // Xác nhận đã thanh toán đề nghị
    this.xacNhanThanhToan = function (obj) {
        return _service.postData("/manager/payment/xacNhanThanhToan", obj);
    };
    // Gỡ xác nhận thanh toán
    this.huyXacNhanThanhToan = function (obj) {
        return _service.postData("/manager/payment/huyXacNhanThanhToan", obj);
    };
    // Import danh sách hồ sơ đề nghị thanh toán
    this.importDsDeNghiThanhToan = function (obj) {
        return _service.postData("/manager/payment/importDsDeNghiThanhToan", obj);
    };
    // Lấy danh sách hồ sơ mapping từ excel
    this.GetLisMappingDsHsTon = function (obj) {
        return _service.postData("/manager/payment/GetLisMappingDsHsTon", obj);
    };
    // Thêm danh sách hồ sơ đề nghị thanh toán
    this.luuDsDeNghiThanhToan = function (obj) {
        return _service.postData("/manager/payment/luuDsDeNghiThanhToan", obj);
    };
}