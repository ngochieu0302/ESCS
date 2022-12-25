function Mauinservice() {
    var _service = new Service();
    this.pageload = function () {
        return _service.postData("/admin/mauin/pageload", { pm: "BT" });
    };

    this.delete = function (obj) {
        return _service.postData("/admin/mauin/delete", obj);
    };
    this.save = function (obj) {
        return _service.postData("/admin/mauin/save", obj);
    };
    this.paging = function (obj) {
        return _service.postData("/admin/mauin/getpaging", obj);
    };
    this.getDetail = function (obj) {
        return _service.postData("/admin/mauin/getdetail", obj);
    };
    this.compile = function (obj) {
        return _service.postData("/common/compile", obj);
    };
    this.copyAndCompile = function (obj) {
        return _service.postData("/common/copyandcompile", obj);
    };
} 