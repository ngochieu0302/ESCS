function OtherClaimService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.getpaging = function (obj) {
        return _service.postData("/otherclaim/claim/GetPaging", obj);
    };
    // Tìm kiếm đối tượng
    this.timKiemDoiTuong = function (obj) {
        return _service.postData("/otherclaim/claim/timKiemDoiTuong", obj);
    };
    // tạo mới hồ sơ
    this.luuThongTinNguoiThongBao = function (obj) {
        return _service.postData("/otherclaim/claim/luuThongTinNguoiThongBao", obj);
    };
    // Lấy danh sách hạng mục khác
    this.layDsDanhMucChung = function (obj) {
        return _service.postData("/otherclaim/claim/layDsDanhMucChung", obj);
    };
    // Lấy thông tin chi tiết hồ sơ
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/otherclaim/claim/layThongTinChiTietHoSo", obj);
    };
    // Lấy thông tin lịch sử tổn thất
    this.danhSachQuaTrinhXuLy = function (obj) {
        return _service.postData("/otherclaim/claim/danhSachQuaTrinhXuLy", obj);
    };
}