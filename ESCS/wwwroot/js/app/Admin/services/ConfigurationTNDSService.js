function ConfigurationTNDSService() {

    var _service = new Service();

    //Lấy tất cả danh sách
    this.layDsPhanTramThuongTat = function () {
        return _service.postData("/admin/configurationtnds/getall", {});
    };

    //Tìm kiếm + phân trang
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/configurationtnds/getpaging", obj);
    };

    //Lấy thông tin chi tiết
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configurationtnds/getdetail", obj);
    };

    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/configurationtnds/SaveDataExcel", obj);
    };
}