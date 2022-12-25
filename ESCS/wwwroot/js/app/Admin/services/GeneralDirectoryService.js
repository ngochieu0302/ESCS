function GeneralDirectoryService() {

    var _service = new Service();

    //Lấy danh mục chung theo mã đối tác nsd
    this.layDsBoMaChung = function () {
        return _service.postData("/admin/generaldirectory/getall", {});
    };

    //Lưu thông tin bộ mã chung CSYT
    this.saveCSYT = function (obj) {
        return _service.postData("/admin/generaldirectory/save", obj);
    };

    //Xóa thông tin bộ mã chung CSYT
    this.deleteCSYT = function (obj) {
        return _service.postData("/admin/generaldirectory/delete", obj);
    };

    //Tìm kiếm + phân trang bộ mã chung CSYT
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/generaldirectory/getpaging", obj);
    };

    //Lấy thông tin chi tiết bộ mã chung CSYT
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/generaldirectory/getdetail", obj);
    };
}