function ProcessingFactorService() {

    var _service = new Service();

    //Lấy danh sách (cache)
    this.getAll = function () {
        return _service.postData("/admin/processingfactor/getAll", {});
    }
    //Tìm kiếm + phân trang
    this.getPaging = function (obj) {
        return _service.postData("/admin/processingfactor/GetPaging", obj);
    };
    //Lấy danh sách nsd
    this.GetListNSD = function (obj) {
        return _service.postData("/admin/processingfactor/GetListNsd", obj);
    };
    //Lấy danh sách hệ số nsd
    this.GetListHeSoNSD = function (obj) {
        return _service.postData("/admin/processingfactor/GetListHeSoNsd", obj);
    };
    //Hệ số nsd nhập
    this.HeSoNsdNhap = function (obj) {
        return _service.postData("/admin/processingfactor/HeSoNsdNhap", obj);
    };
    //Hệ số nsd xóa
    this.xoaCauHinh = function (obj) {
        return _service.postData("/admin/processingfactor/deleteConfig", obj);
    };
}