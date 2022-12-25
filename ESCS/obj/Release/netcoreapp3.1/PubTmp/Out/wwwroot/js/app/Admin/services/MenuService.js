function MenuService() {
    var _service = new Service();
    this.pageload = function () {
        return _service.postData("/admin/menu/pageload", { pm: "BT" });
    };
    this.getListParentMenu = function () {
        return _service.postData("/admin/menu/getlistparentmenu", {});
    };
    this.delete = function (obj) {
        return _service.postData("/admin/menu/delete", obj);
    };
    this.save = function (obj) {
        return _service.postData("/admin/menu/save", obj);
    };
    this.paging = function (obj) {
        return _service.postData("/admin/menu/getpaging", obj);
    };
    this.getDetail = function (obj) {
        return _service.postData("/admin/menu/getdetail", obj);
    };
} 