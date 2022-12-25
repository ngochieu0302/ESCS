function InsuranceService() {
    var _service = new Service();

    this.paging = function (obj) {
        return _service.postData("/admin/insurance/getpaging", obj);
    };
    this.delete = function (obj) {
        return _service.postData("/admin/insurance/delete", obj);
    };
    this.save = function (obj) {
        return _service.postFormData("/admin/insurance/save", obj);
    };
    this.getDetail = function (obj) {
        return _service.postData("/admin/insurance/getdetail", obj);
    };
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/insurance/SaveDataExcel", obj);
    };
} 