function StorageUnitService() {
    var _service = new Service();
    //Lấy tất cả danh sách kho thu hồi vật tư
    this.layDsMaKho = function (obj) {
        return _service.postData("/admin/StorageUnit/GetAllStorageUnit", obj);
    };
    this.getPaging = function (obj) {
        return _service.postData("/admin/StorageUnit/paging", obj);
    };
    this.saveKTHVT = function (obj) {
        return _service.postData("/admin/StorageUnit/save", obj);
    };
    this.detailKTHVT = function (obj) {
        return _service.postData("/admin/StorageUnit/detail", obj);
    };
    this.deleteKTHVT = function (obj) {
        return _service.postData("/admin/StorageUnit/delete", obj);
    };
}