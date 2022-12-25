function UserManagementService() {
    var _service = new Service();
    this.pageload = function () {
        return _service.postData("/admin/usermanagement/pageload", { pm: "BT"});
    };
    this.save = function (obj) {
        return _service.postData("/admin/usermanagement/saveuser", obj);
    };
    this.paging = function (obj) {
        return _service.postData("/admin/usermanagement/getpaging", obj);
    };
    this.getDetail = function (obj) {
        return _service.postData("/admin/usermanagement/getdetail", obj);
    };
    // Import excel danh sách nsd
    this.importExcelDanhSachNsd = function (obj) {
        return _service.postData("/admin/usermanagement/importExcelDanhSachNsd", obj);
    };
}