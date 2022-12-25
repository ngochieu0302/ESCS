function HealthServicesService() {
    var _service = new Service();
    //Tìm kiếm phân trang dịch vụ sức khỏe
    this.getpaging = function (obj) {
        return _service.postData("/admin/HealthServices/getPaging", obj);
    };
    //Lấy thông tin chi tiết dịch vụ
    this.layThongTinChiTietDichVu = function (obj) {
        return _service.postData("/admin/HealthServices/getdetail", obj);
    };
    //Lấy danh sách mã cấp trên
    this.getListParentCode = function (obj) {
        return _service.postData("/admin/HealthServices/getListParentCode", obj);
    };
    //Xóa thông tin dịch vụ
    this.xoaDichVu = function (obj) {
        return _service.postData("/admin/HealthServices/delete", obj);
    };
    //Lưu thông tin dịch vụ
    this.luuThongTinDichVu = function (obj) {
        return _service.postData("/admin/HealthServices/save", obj);
    };
    //Lấy thông tin chi tiết dịch vụ
    this.layThongTinChiTietDichVu = function (obj) {
        return _service.postData("/admin/HealthServices/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/HealthServices/SaveDataExcel", obj);
    };
} 