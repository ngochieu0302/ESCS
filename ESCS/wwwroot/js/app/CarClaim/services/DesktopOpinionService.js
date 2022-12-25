function DesktopOpinionService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang lấy danh sách ý kiến
    this.getPaging = function (obj) {
        return _service.postData("/carclaim/desktopopinion/getpaging", obj);
    };
    //  Lưu cho ý kiến
    this.choYKienNh = function (obj) {
        return _service.postData("/carclaim/desktopopinion/Choykiennh", obj);
    }
    //  Ý kiến liệt kê chi tiết
    this.yKienCT = function (obj) {
        return _service.postData("/carclaim/desktopopinion/ykienct", obj);
    }
    // Liệt kê thông tin chi tiết hồ sơ
    this.lietKeThongTinChiTietHoSo = function (obj) {
        return _service.postData("/carclaim/desktopopinion/lietKeThongTinChiTietHoSo", obj);
    }

    // xem ảnh 
    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    }
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfiles", obj);
    }
}