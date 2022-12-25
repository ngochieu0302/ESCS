function OthersAwaitingPaymentService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang tạm ứng
    this.getPaging = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/getPaging", obj);
    };
    // Lấy thông tin chi tiết hồ sơ bồi thường
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/layThongTinChiTietHoSo", obj);
    };
    // Đóng hồ sơ
    this.dongHoSoBT = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/dongHoSoBT", obj);
    };
    // Mở hồ sơ
    this.huyDongHoSoBT = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/huyDongHoSoBT", obj);
    };
    // Import danh sách hồ sơ chờ đóng
    this.importHSChoDong = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/importHSChoDong", obj);
    };
    // Nhập chứng từ bồi thường
    this.nhapChungTuBoiThuong = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/nhapChungTuBoiThuong", obj);
    }
    // Xóa chứng từ bồi thường
    this.xoaChungTuBoiThuong = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/xoaChungTuBoiThuong", obj);
    }
    // Nhập thông tin người thụ hưởng
    this.nhapThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/nhapThongTinNguoiThuHuong", obj);
    }
    // Xóa thông tin người thụ hưởng
    this.xoaThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/xoaThongTinNguoiThuHuong", obj);
    }
    //Lấy danh sách files
    this.layDanhSachAnh = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/GetListFiles", obj);
    };
    //Lấy danh sách files thumbnail
    this.GetFilesThumnail = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/GetFilesThumnail", obj);
    };
    //Get file
    this.GetFiles = function (obj) {
        return _service.postData("/manager/othersawaitingpayment/GetFiles", obj);
    };
}