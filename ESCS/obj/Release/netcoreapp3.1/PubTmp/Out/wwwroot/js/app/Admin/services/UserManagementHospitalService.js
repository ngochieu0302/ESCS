function UserManagementHospitalService() {
    var _service = new Service();
    //Lưu thông tin người dùng bệnh viện
    this.Save = function (obj) {
        return _service.postData("/admin/UserManagementHospital/save", obj);
    };
    //Tìm kiếm + phân trang bệnh viện
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/UserManagementHospital/getpaging", obj);
    };
    //Lấy thông tin chi tiết người dùng bệnh viện
    this.xemChiTiet = function (obj) {
        return _service.postData("/admin/UserManagementHospital/getdetail", obj);
    };
    //Lấy thông tin chi tiết người dùng bệnh viện
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/UserManagementHospital/delete", obj);
    };
} 