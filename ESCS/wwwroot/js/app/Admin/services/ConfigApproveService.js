function ConfigApproveService() {
    var _service = new Service();

    //Tìm kiếm + phân trang cấu hình duyệt
    this.paging = function (obj) {
        return _service.postData("/admin/configapprove/getpaging", obj);
    };
    //Xóa thông tin cấu hình duyệt
    this.delete = function (obj) {
        return _service.postData("/admin/configapprove/delete", obj);
    };
    //Lưu thông tin cấu hình duyệt
    this.save = function (obj) {
        return _service.postData("/admin/configapprove/save", obj);
    };
    //Lấy thông tin chi tiết cấu hình duyệt
    this.getDetail = function (obj) {
        return _service.postData("/admin/configapprove/getdetail", obj);
    };
    //Tìm kiếm người duyệt
    this.searchUser = function (obj) {
        return _service.postData("/admin/configapprove/searchuserapprove", obj);
    };
    this.searchUserByBranch = function (obj) {
        return _service.postData("/admin/configapprove/searchUserByBranch", obj);
    };
} 