function PriceGaraService() {
    var _service = new Service();
    this.getPaging = function (obj) {
        return _service.postData("/admin/pricegara/getpaging", obj);
    };
    // Lưu thông tin giá gara
    this.luuThongTinGiaGara = function (obj) {
        return _service.postData("/admin/pricegara/SavePriceGara", obj);
    };
    // Lấy thông tin chi tiết giá gara
    this.getDetail = function (obj) {
        return _service.postData("/admin/pricegara/getDetail", obj);
    };
    // Lấy danh sách cấu hình giá gara
    this.layDanhSachCauHinh = function (obj) {
        return _service.postData("/admin/pricegara/layDanhSachCauHinh", obj);
    };
    // Xóa báo giá gara
    this.delete = function (obj) {
        return _service.postData("/admin/pricegara/deletePriceGara", obj);
    };
    // Import excel giá gara
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/pricegara/SaveDataExcel", obj);
    };
} 