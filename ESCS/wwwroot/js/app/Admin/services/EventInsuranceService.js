function EventInsuranceService() {

    var _service = new Service();

    // Xóa sự kiện bảo hiểm
    this.xoaSuKienBH = function (obj) {
        return _service.postData("/admin/eventinsurance/deleteeventinsurance", obj);
    };
    // Lưu thông tin sự kiện bảo hiểm
    this.luuSuKienBH = function (obj) {
        return _service.postData("/admin/eventinsurance/saveeventinsurance", obj);
    };
    // Tìm kiếm + phân trang sự kiện bảo hiểm
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/eventinsurance/getpagingeventinsurance", obj);
    };
    // Lấy thông tin chi tiết sự kiện bảo hiểm
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/eventinsurance/getdetaileventInsurance", obj);
    };
} 