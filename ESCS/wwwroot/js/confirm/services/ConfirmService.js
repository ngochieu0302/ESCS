function ConfirmService() {
    var _service = new Service();
    //
    this.layThongTinTuShortLink = function (obj) {
        return _service.postData("/confirm/getInfoFromShortLink", obj);
    };
    //
    this.LayDanhSachDanhGia = function (obj) {
        return _service.postData("/confirm/getListRate", obj);
    };
    //
    this.LuuThongTin = function (obj) {
        return _service.postData("/confirm/SaveInformation", obj);
    };
    //
    this.CapNhatThongTin = function (obj) {
        return _service.postData("/confirm/UpdateInformation", obj);
    };
    //
    this.guiOTPXacNhan = function (obj) {
        return _service.postData("/confirm/guiOTPXacNhan", obj);
    };
    // lưu xác nhận của khách hàng qua mã OTP
    this.luuXacNhanKhachHangOTP = function (obj) {
        return _service.postData("/confirm/luuXacNhanKhachHangOTP", obj);
    };
    // lưu xác nhận của khách hàng không qua mã OTP
    this.luuXacNhanKhachHangKhongOTP = function (obj) {
        return _service.postData("/confirm/luuXacNhanKhachHangKhongOTP", obj);
    };
}