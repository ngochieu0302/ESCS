function AdvanceCompensationService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang tạm ứng
    this.layDsHSTamUng = function (obj) {
        return _service.postData("/manager/advancecompensation/layDsHSTamUng", obj);
    };
    // Xem thông tin chi tiết hồ sơ tạm ứng
    this.xemCtietTamUng = function (obj) {
        return _service.postData("/manager/advancecompensation/xemCtietTamUng", obj);
    };
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.layDsHoSo = function (obj) {
        return _service.postData("/manager/advancecompensation/paging", obj);
    };
    // Lưu thông tin hồ sơ tạm ứng
    this.luuTamUng = function (obj) {
        return _service.postData("/manager/advancecompensation/luuTamUng", obj);
    };
    // Xóa thông tin hồ sơ tạm ứng
    this.xoaTamUng = function (obj) {
        return _service.postData("/manager/advancecompensation/xoaTamUng", obj);
    };
}