function UnitService() {
    var _service = new Service();
    //Lấy danh mục ĐVT thuốc theo mã đối tác nsd
    this.getAll = function () {
        return _service.postData("/admin/unit/getall", {});
    };
    //Lấy danh mục ĐVT thuốc theo mã đối tác nsd
    this.Tkiem = function (obj) {
        return _service.postData("/admin/unit/search", obj);
    };
    //Xóa thông tin ĐVT thuốc
    this.delete = function (obj) {
        return _service.postData("/admin/unit/delete", obj);
    };
    //Lưu thông tin ĐVT thuốc
    this.save = function (obj) {
        return _service.postData("/admin/unit/save", obj);
    };
    //Tìm kiếm + phân trang ĐVT thuốc
    this.getPaging = function (obj) {
        return _service.postData("/admin/unit/getpaging", obj);
    };
    //Lấy thông tin chi tiết ĐVT thuốc
    this.getDetail = function (obj) {
        return _service.postData("/admin/unit/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/unit/SaveDataExcel", obj);
    };
}