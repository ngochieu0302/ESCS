function ConfigurationObjectGroupService() {
    var _service = new Service();

    //lấy cache 
    this.getAll = function (obj) {
        return _service.postData("/admin/ConfigurationObjectGroup/getall", obj);
    };
    //Tìm kiếm 
    this.getPaging = function (obj) {
        return _service.postData("/admin/ConfigurationObjectGroup/getpaging", obj);
    };
    //Lấy thông tin chi tiết 
    this.getDetail = function (obj) {
        return _service.postData("/admin/ConfigurationObjectGroup/getdetail", obj);
    };
    //Lưu thông tin 
    this.luuThongTin = function (obj) {
        return _service.postData("/admin/ConfigurationObjectGroup/save", obj);
    };
    //Xóa thông tin
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/ConfigurationObjectGroup/delete", obj);
    };
}