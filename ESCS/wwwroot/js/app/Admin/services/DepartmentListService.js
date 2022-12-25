function DepartmentListService() {
    var _service = new Service();
    //Lấy tất cả danh sách phòng ban
    this.layDsPhongBan = function () {
        return _service.postData("/admin/departmentlist/getall", { });
    };
    //Xóa thông tin phòng ban
    this.xoaPhongBan = function (obj) {
        return _service.postData("/admin/departmentlist/delete", obj);
    };
    //Lưu thông tin phòng ban
    this.luuPhongBan = function (obj) {
        return _service.postData("/admin/departmentlist/save", obj);
    };
    //Tìm kiếm phòng ban
    this.timKiemPhongBan = function (obj) {
        return _service.postData("/admin/departmentlist/getpaging", obj);
    };
    //Lấy thông tin chi tiết phòng ban
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/departmentlist/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/departmentlist/SaveDataExcel", obj);
    };
} 