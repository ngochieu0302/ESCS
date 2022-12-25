function AccountEmailService() {
    var _service = new Service();
    //Lưu thông tin cấu hình mẫu sms
    this.layTatCaTaiKhoan = function (obj) {
        return _service.postData("/admin/accountemail/getall", obj);
    };
    //Liệt kê + phân trang
    this.getPaging = function (obj) {
        return _service.postData("/admin/accountemail/getpaging", obj);
    };
    //Liệt kê chi tiết
    this.getDetail = function (obj) {
        return _service.postData("/admin/accountemail/getdetail", obj);
    };
    //Nhập thông tin
    this.save = function (obj) {
        return _service.postData("/admin/accountemail/save", obj);
    };
    //Xóa thông tin
    this.delete = function (obj) {
        return _service.postData("/admin/accountemail/delete", obj);
    };
} 