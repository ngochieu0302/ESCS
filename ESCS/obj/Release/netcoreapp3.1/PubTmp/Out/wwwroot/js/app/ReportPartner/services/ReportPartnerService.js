function ReportPartnerService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.layDanhSachBieuMauBaoCao = function (obj) {
        return _service.postData("/admin/printed/layDanhSachBieuMauBaoCao", obj);
    };
}