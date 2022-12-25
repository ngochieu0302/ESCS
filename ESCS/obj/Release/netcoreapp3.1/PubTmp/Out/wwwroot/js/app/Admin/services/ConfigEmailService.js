function ConfigEmailService() {

    var _service = new Service();

    //Lưu thông tin Email
    this.SaveEmailCH = function (obj) {
        return _service.postFormData("/admin/configemail/save", obj);
    };

    //Tìm kiếm + phân trang Email
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/configemail/getpaging", obj);
    };

    //Lấy thông tin chi tiết Email
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configemail/getdetail", obj);
    };
}