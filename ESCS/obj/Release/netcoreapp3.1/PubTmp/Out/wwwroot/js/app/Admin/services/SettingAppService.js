function SettingAppService() {
    var _service = new Service();
    //Lấy thông tin nsd
    this.getpaging = function (obj) {
        return _service.postData("/admin/SettingApp/getpaging", obj);
    };

    // Thêm cài đặt cấu hình
    this.themcaidat = function (obj) {
        return _service.postFormData("/admin/SettingApp/AddSettingApp", obj);
    }

    // Cập nhật cài đặt cấu hình
    this.capnhatcaidat = function (obj) {
        return _service.postFormData("/admin/SettingApp/UpdateSettingApp", obj);
    }

    // Cập nhật cài đặt cấu hình
    this.xoacaidat = function (obj) {
        return _service.postData("/admin/SettingApp/DeleteSettingApp", obj);
    }
}