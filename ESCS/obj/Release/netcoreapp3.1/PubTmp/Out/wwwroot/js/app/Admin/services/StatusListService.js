function StatusListService() {
    var _service = new Service();
    //Lấy tất cả danh sách trạng thái hồ sơ
    this.layDsTrangThai = function (obj) {
        return _service.postData("/admin/statuslist/getall", obj);
    };
    this.layDsTrangThaiCN = function () {
        return _service.postData("/admin/statuslist/getallcn", {});
    };
} 