function ConfigurationTPAService() {

    var _service = new Service();

    //Xóa thông tin cấu hình TPA
    this.deleteTPA = function (obj) {
        return _service.postData("/admin/configurationtpa/delete", obj);
    };

    //Lưu thông tin cấu hình TPA
    this.SaveTPA = function (obj) {
        return _service.postData("/admin/configurationtpa/save", obj);
    };

    //Tìm kiếm + phân trang cấu hình TPA
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/configurationtpa/getpaging", obj);
    };

    //Lấy thông tin chi tiết cấu hình TPA
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configurationtpa/getdetail", obj);
    };
}