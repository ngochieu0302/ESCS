function ConfigureQRCODEService() {
    var _service = new Service();
    
    //Xóa cấu hình QRCODE
    this.xoaCauHinhQRCODE = function (obj) {
        return _service.postData("/admin/configureqrcode/delete", obj);
    };
    //Lưu thông tin cấu hình QRCODE
    this.luuCauHinhQRCODE = function (obj) {
        return _service.postData("/admin/configureqrcode/save", obj);
    };
    //Tìm kiếm + phân trang cấu hình QRCODE
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/configureqrcode/getpaging", obj);
    };
    //Lấy thông tin chi tiết cấu hình QRCODE
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configureqrcode/getdetail", obj);
    };
} 