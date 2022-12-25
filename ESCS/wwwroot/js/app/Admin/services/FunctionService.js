function FunctionService() {
    var _service = new Service();
    //Tìm kiếm chức năng
    this.timKiem = function (obj) {
        return _service.postData("/admin/function/getdatabysearch", obj);
    };
}