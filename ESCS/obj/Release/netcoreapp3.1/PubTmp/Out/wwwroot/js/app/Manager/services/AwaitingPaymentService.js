function AwaitingPaymentService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang tạm ứng
    this.getPaging = function (obj) {
        return _service.postData("/manager/awaitingpayment/getPaging", obj);
    };
    // Lấy thông tin chi tiết hồ sơ bồi thường
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/carclaim/CarCompensation/layThongTinChiTietHoSo", obj);
    };
    // Đóng hồ sơ
    this.dongHoSoBT = function (obj) {
        return _service.postData("/manager/awaitingpayment/dongHoSoBT", obj);
    };
    // Mở hồ sơ
    this.huyDongHoSoBT = function (obj) {
        return _service.postData("/manager/awaitingpayment/huyDongHoSoBT", obj);
    };
    // Chuyển lại hồ sơ bồi thường
    this.chuyenBT = function (obj) {
        return _service.postData("/manager/awaitingpayment/chuyenBT", obj);
    };
    // Lấy thông tin tiền bồi thường
    this.layTienBT = function (obj) {
        return _service.postData("/manager/awaitingpayment/layTienBT", obj);
    };
    // Cập nhật lại thông tin tin tiền thue
    this.capNhatThue = function (obj) {
        return _service.postData("/manager/awaitingpayment/capNhatThue", obj);
    };
}