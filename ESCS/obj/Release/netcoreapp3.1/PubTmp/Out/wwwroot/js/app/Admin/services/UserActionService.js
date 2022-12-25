// Create by : Namnt.vbi
function UserActionService() {

    var _service = new Service();

    // Tìm kiếm + phân trang log người sử dụng
    this.timKiemHD = function (obj) {
        return _service.postData("/admin/useraction/getpaging", obj);
    };
    // Xem thông tin chi tiết log người sử dụng
    this.xemChiTietLog = function (obj) {
        return _service.postData("/admin/useraction/getdetail", obj);
    };
}