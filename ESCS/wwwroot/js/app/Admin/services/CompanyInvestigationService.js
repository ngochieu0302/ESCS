function CompanyInvestigationService() {

    var _service = new Service();
    
    // Xóa mã công ty giám định
    this.xoaMaCongTyGD = function (obj) {
        return _service.postData("/admin/companyinvestigation/deletecompanyinvestigation", obj);
    };
    // Lưu thông tin mã công ty giám định
    this.luuMaCongTyGD = function (obj) {
        return _service.postData("/admin/companyinvestigation/savecompanyinvestigation", obj);
    };
    // Tìm kiếm + phân trang mã công ty giám định
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/companyinvestigation/getpagingcompanyinvestigation", obj);
    };
    // Lấy thông tin chi tiết mã công ty giám định
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/companyinvestigation/getdetailcompanyinvestigation", obj);
    };
    // Tìm kiếm công ty giám định
    this.timKiemCongTyGD = function (obj) {
        return _service.postData("/admin/companyinvestigation/timKiemCongTyGD", obj);
    };

} 