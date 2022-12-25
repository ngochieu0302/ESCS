function ActionLogService() {
    var _service = new Service(); 
    
    //Tìm kiếm + phân trang
    this.timKiemPhanTrang = function (obj) {
        return _service.postData("/admin/actionlog/getpaging", obj);
    };
    //Lấy thông tin chi tiết
    this.thongTinChiTiet = function (obj) {
        return _service.postData("/admin/actionlog/getdetail", obj);
    };
} 