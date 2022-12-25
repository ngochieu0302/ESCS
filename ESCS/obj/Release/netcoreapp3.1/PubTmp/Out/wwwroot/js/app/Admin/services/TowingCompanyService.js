function TowingCompanyService() {
    var _service = new Service();
    //Xóa thông tin
    this.delete = function (obj) {
        return _service.postData("/admin/towingcompany/delete", obj);
    };
    //Lưu thông tin 
    this.save = function (obj) {
        return _service.postData("/admin/towingcompany/save", obj);
    };
    //Tìm kiếm + phân trang
    this.getPaging = function (obj) {
        return _service.postData("/admin/towingcompany/getpaging", obj);
    };
    //Lấy thông tin chi tiết 
    this.getDetail = function (obj) {
        return _service.postData("/admin/towingcompany/getdetail", obj);
    };    
}