function HealthAwaitingPaymentService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang tạm ứng
    this.getPaging = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/getPaging", obj);
    };
    // Lấy thông tin chi tiết hồ sơ bồi thường
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/detailHoSo", obj);
    };
    // Đóng hồ sơ
    this.dongHoSoBT = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/dongHoSoBT", obj);
    };
    // Mở hồ sơ
    this.huyDongHoSoBT = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/huyDongHoSoBT", obj);
    };
    // Import danh sách hồ sơ chờ đóng
    this.importHSChoDong = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/importHSChoDong", obj);
    };
    this.soSanhOCRHoaDon = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/soSanhOCRHoaDon", obj);
    };
    // Lấy danh sách lần tiếp nhận đóng hồ sơ
    this.layDanhSachlanTiepNhanDongHoSo = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/layDanhSachlanTiepNhanDongHoSo", obj);
    };
    // Lấy danh sách hồ sơ chờ đóng
    this.layDanhSachHoSoChoDong = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/layDanhSachHoSoChoDong", obj);
    };
    // lưu danh sách hồ sơ chờ đóng
    this.luuLanTiepNhanHoSoChoDong = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/luuLanTiepNhanHoSoChoDong", obj);
    };
    // xóa lần tiếp nhận đóng hồ sơ
    this.xoaLanTiepNhanHoSoChoDong = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/xoaLanTiepNhanHoSoChoDong", obj);
    };
    // lấy chi tiết lần tiếp nhận đóng hồ sơ
    this.layChiTietLanTiepNhanDongHoSo = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/layChiTietLanTiepNhanDongHoSo", obj);
    };
    // đóng lần tiếp nhận đóng hồ sơ
    this.dongLanTiepNhanDongHoSo = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/dongLanTiepNhanDongHoSo", obj);
    };
    // hủy đóng lần tiếp nhận đóng hồ sơ
    this.huyDongLanTiepNhanDongHoSo = function (obj) {
        return _service.postData("/manager/healthawaitingpayment/huyDongLanTiepNhanDongHoSo", obj);
    };
}