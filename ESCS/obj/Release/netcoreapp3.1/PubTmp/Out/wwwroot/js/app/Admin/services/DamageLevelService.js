function DamageLevelService() {
    var _service = new Service();
    this.layDsMucDoTonThat = function () {
        return _service.postData("/admin/damagelevel/getall", { pm: "BT" });
    };

    this.pageload = function () {
        return _service.postData("/admin/damagelevel/pageload", { pm: "BT" });
    };

    this.delete = function (obj) {
        return _service.postData("/admin/damagelevel/Xoa_nhap", obj);
    };
    this.save = function (obj) {
        return _service.postData("/admin/damagelevel/Luu_nhap", obj);
    };
    this.paging = function (obj) {
        return _service.postData("/admin/damagelevel/Liet_ke_trang", obj);
    };
    this.getDetail = function (obj) {
        return _service.postData("/admin/damagelevel/Liet_ke_chi_tiet", obj);
    };
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/damagelevel/SaveDataExcel", obj);
    };
} 