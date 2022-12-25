function TitleService() {

    var _service = new Service();

    //Lấy danh mục chức danh theo mã đối tác nsd
    this.layDsChucDanh = function (obj) {
        return _service.postData("/admin/Title/getall", obj);
    };

    //Liệt kê + phân trang chức danh
    this.getPaging = function (obj) {
        return _service.postData("/admin/Title/getPaging", obj);
    };

    //Lưu thông tin chức danh
    this.luuThongTin = function (obj) {
        return _service.postData("/admin/Title/save", obj);
    };
    
    //Xem thông tin chi tiết chức danh
    this.getDetail = function (obj) {
        return _service.postData("/admin/Title/getDetail", obj);
    };

    //Xóa thông tin chức danh
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/Title/delete", obj);
    };
}