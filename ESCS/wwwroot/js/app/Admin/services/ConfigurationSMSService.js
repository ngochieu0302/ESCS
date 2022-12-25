function ConfigurationSMSService() {

    var _service = new Service();

    //Lưu thông tin cấu hình mẫu sms
    this.luuCauHinhSMS = function (obj) {
        return _service.postData("/admin/configurationsms/save", obj);
    };

    //Tìm kiếm + phân trang cấu hình mẫu sms
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/configurationsms/getpaging", obj);
    };

    //Lấy thông tin chi tiết cấu hình mẫu sms
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configurationsms/getdetail", obj);
    };
} 