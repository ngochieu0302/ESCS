function PrintedService() {
    var _service = new Service();
    //Lưu thông tin mẫu in 
    this.save = function (obj) {
        return _service.postFormData("/admin/printed/save", obj);
    };
    //Xóa thông tin mẫu in 
    //this.delete = function (obj) {
    //    return _service.postData("/admin/printed/delete", obj);
    //};
    //Tìm kiếm + phân trang
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/printed/getpaging", obj);
    };
    //Lấy thông tin chi tiết mẫu in 
    this.xemChiTiet = function (obj) {
        return _service.postData("/admin/printed/getdetail", obj);
    };
    // lấy danh sách biểu mẫu
    this.layDanhSachBieuMauBaoCao = function (obj) {
        return _service.postData("/admin/printed/layDanhSachBieuMauBaoCao", obj);
    }
    //Liệt kê
    this.lietKeDanhSachCauHinh = function (obj) {
        return _service.postData("/admin/printed/lietKeDanhSachCauHinh", obj);
    };
    //Nhập thông tin
    this.luuThongTinCauHinh = function (obj) {
        return _service.postData("/admin/printed/luuThongTinCauHinh", obj);
    };
    //Xóa thông tin
    this.xoaThongTinCauHinh = function (obj) {
        return _service.postData("/admin/printed/xoaThongTinCauHinh", obj);
    };
} 