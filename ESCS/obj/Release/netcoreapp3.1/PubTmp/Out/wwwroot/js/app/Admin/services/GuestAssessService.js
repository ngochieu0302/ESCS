function GuestAssessService() {

    var _service = new Service();

    //Xóa thông tin khách hàng đánh giá
    this.xoaKhDanhGia = function (obj) {
        return _service.postData("/admin/guestassess/delete", obj);
    };

    //Lưu thông tin khách hàng đánh giá
    this.luuKhDanhGia = function (obj) {
        return _service.postData("/admin/guestassess/save", obj);
    };

    //Tìm kiếm + phân trang khách hàng đánh giá
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/guestassess/getpaging", obj);
    };

    //Lấy thông tin chi tiết khách hàng đánh giá
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/guestassess/getdetail", obj);
    };
}