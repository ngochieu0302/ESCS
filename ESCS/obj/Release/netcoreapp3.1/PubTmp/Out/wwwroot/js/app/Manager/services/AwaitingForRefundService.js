function AwaitingForRefundService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hoàn quỹ
    this.getPaging = function (obj) {
        return _service.postData("/manager/awaitingforrefund/getPaging", obj);
    };
    // Xóa
    this.delete = function (obj) {
        return _service.postData("/manager/awaitingforrefund/delete", obj);
    };
    // Liệt kê chi tiết
    this.getDetail = function (obj) {
        return _service.postData("/manager/awaitingforrefund/getDetail", obj);
    };
    // Lấy danh sách hồ sơ hoàn quỹ tồn
    this.getListBackLog = function (obj) {
        return _service.postData("/manager/awaitingforrefund/getListBackLog", obj);
    };
    // Nhập hồ sơ hoàn quỹ
    this.nhapHsHoanQuy = function (obj) {
        return _service.postData("/manager/awaitingforrefund/nhapHsHoanQuy", obj);
    };
    // Lấy chi tiết hồ sơ hoàn quỹ
    this.layCtHoanQuy = function (obj) {
        return _service.postData("/manager/awaitingforrefund/layCtHoanQuy", obj);
    };
    // Xác nhận hồ sơ hoàn quỹ
    this.xacNhanHoanQuy = function (obj) {
        return _service.postData("/manager/awaitingforrefund/xacNhanHoanQuy", obj);
    };
    // Hủy xác nhận hồ sơ hoàn quỹ
    this.xacNhanHoanQuyHuy = function (obj) {
        return _service.postData("/manager/awaitingforrefund/xacNhanHoanQuyHuy", obj);
    };
    // Xóa đề nghị hoàn quỹ
    this.xoaHsHoanQuy = function (obj) {
        return _service.postData("/manager/awaitingforrefund/xoaHsHoanQuy", obj);
    };
}