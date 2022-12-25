function OpinionGroupService() {

    var _service = new Service();

    //Xóa thông tin 
    this.xoaNguoiXinYKien = function (obj) {
        return _service.postData("/admin/opiniongroup/delete", obj);
    };

    //Lưu thông tin 
    this.luuNguoiXinYKien = function (obj) {
        return _service.postData("/admin/opiniongroup/save", obj);
    };

    //Tìm kiếm + phân trang
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/opiniongroup/getpaging", obj);
    };

    //Lấy thông tin chi tiết 
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/opiniongroup/getdetail", obj);
    };
}