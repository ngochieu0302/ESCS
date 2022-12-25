function DashboardConfigService() {
    var _service = new Service();
    //Tìm kiếm phân trang 
    this.getpaging = function (obj) {
        return _service.postData("/admin/DashboardConfig/getPaging", obj);
    };
    //Lấy thông tin chi tiết 
    this.layThongTinCauHinhDashBoard = function (obj) {
        return _service.postData("/admin/DashboardConfig/getDetail", obj);
    };
    
    //Lưu thông tin 
    this.luuThongTinCauHinhDashboard = function (obj) {
        return _service.postData("/admin/DashboardConfig/save", obj);
    };
    //Xóa thông tin
    this.xoaThongTinCauHinhDashboard = function (obj) {
        return _service.postData("/admin/DashboardConfig/Delete", obj);
    };
} 