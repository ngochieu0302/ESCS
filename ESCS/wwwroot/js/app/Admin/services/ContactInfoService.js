function ContactInfoService() {

    var _service = new Service();

    //Lưu thông tin liên hệ
    this.SaveContact = function (obj) {
        return _service.postData("/admin/ContactInfo/Save", obj);
    };
    // Tìm kiếm phân trang
    this.GetPaging = function (obj) {
        return _service.postData("/admin/ContactInfo/GetPaging", obj);
    };
    //Liệt kê chi tiết
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/ContactInfo/GetDetail", obj);
    }
    //Xóa thông tin
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/ContactInfo/xoaThongTin", obj);
    }
}