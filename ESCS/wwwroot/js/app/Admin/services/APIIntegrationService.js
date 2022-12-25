function APIIntegrationService() {
    var _service = new Service();
    //Liệt kê + phân trang
    this.getPaging = function (obj) {
        return _service.postData("/admin/apiIntegration/getpaging", obj);
    };
    //Liệt kê chi tiết
    this.getDetail = function (obj) {
        return _service.postData("/admin/apiIntegration/getdetail", obj);
    };
}