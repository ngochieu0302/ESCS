function MailServerService() {

    var _service = new Service();

    // Lưu thông tin mail server
    this.save = function (obj) {
        return _service.postData("/admin/mailserver/save", obj);
    };
    // Tìm kiếm + phân trang mail server 
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/mailserver/getpaging", obj);
    }
    //Xem chi tiết
    this.xemChitietMailServer = function (obj) {
        return _service.postData("/admin/mailserver/getdetail", obj);
    };
    //xóa thong tin mail server
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/mailserver/delete", obj);
    };
};