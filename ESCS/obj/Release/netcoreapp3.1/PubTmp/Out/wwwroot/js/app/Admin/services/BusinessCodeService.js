function BusinessCodeService() {
    var _service = new Service();

    this.layDsLHNV = function (nv) {
        return _service.postData("/admin/businesscode/getall", { pm: "BT", nv: nv});
    };

    this.layDsLHNVXe = function () {
        return _service.postData("/admin/businesscode/getallcar", { pm: "BT" });
    };

    this.layDsLHNVXeMay = function () {
        return _service.postData("/admin/businesscode/getallmotocycle", { pm: "BT" });
    };

    this.pageload = function () {
        return _service.postData("/admin/businesscode/pageload", { pm: "BT" });
    };

    this.delete = function (obj) {
        return _service.postData("/admin/businesscode/Delete", obj);
    };

    this.save = function (obj) {
        return _service.postData("/admin/businesscode/Save", obj);
    };

    this.paging = function (obj) {
        return _service.postData("/admin/businesscode/GetPaging", obj);
    };

    this.getDetail = function (obj) {
        return _service.postData("/admin/businesscode/GetDetail", obj);
    };

    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/businesscode/SaveDataExcel", obj);
    };
} 