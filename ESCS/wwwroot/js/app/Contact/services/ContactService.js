function ContactService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang thanh toán
    this.paging = function (obj) {
        return _service.postData("/contact/paging", obj);
    };
    // Tìm kiếm xe
    this.timKiemXe = function (obj) {
        return _service.postDataTimeOut("/carclaim/carinvestigation/getpagingsearchcar", obj, 45000, "Vượt quá thời gian cho phép tìm kiếm, vui lòng nhập điều kiện tìm kiếm khác");
    }
    // Tìm kiếm xe máy
    this.timKiemXeMay = function (obj) {
        return _service.postDataTimeOut("/moto/motoinvestigation/getpagingsearchcar", obj, 45000, "Vượt quá thời gian cho phép tìm kiếm, vui lòng nhập điều kiện tìm kiếm khác");
    }
    // Nhập hồ sơ tiếp nhận
    this.nhapHsTiepNhan = function (obj) {
        return _service.postData("/contact/SaveHsTiepNhan", obj);
    }
    // Danh sách vụ tổn thất
    this.layCtHsTiepNhan = function (obj) {
        return _service.postData("/contact/GetHsTiepNhan", obj);
    }
    // Lấy danh sách quá trình xử lý
    this.danhSachQuaTrinhXuLy = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getlistprocessing", obj);
    }
    // Lấy danh sách lịch sử tổn thất
    this.layDsLichSuTonThat = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/gethistory", obj);
    }
    // Kiểm tra số vụ tổn thất xảy ra trong cùng 1 ngày
    this.ktraVuTT = function (obj) {
        return _service.getFile("/contact/ktraVuTT", obj);
    }
    // Lấy danh sách lịch sử tổn thất
    this.luuDienBienTonThat = function (obj) {
        return _service.getFile("/contact/saveTonThat", obj);
    }
    // Xóa tiếp nhận vụ tổn thất
    this.xoaVuTT = function (obj) {
        return _service.getFile("/contact/xoaVuTT", obj);
    }
    // Lấy danh sách tiếp nhận
    this.layDsLichSuTiepNhan = function (obj) {
        return _service.getFile("/contact/listLanTiepNhan", obj);
    }
    // Lưu lần tiếp nhận
    this.luuLanTiepNhan = function (obj) {
        return _service.getFile("/contact/luuLanTiepNhan", obj);
    }
    // Chuyển bồi thường
    this.chuyenBoiThuong = function (obj) {
        return _service.getFile("/contact/chuyenBoiThuong", obj);
    }
    // Update khách hàng VIP
    this.khachHangVIP = function (obj) {
        return _service.postData("/contact/updateKHVIP", obj);
    };
    // Lấy thông tin hợp đồng
    this.layThongTinHopDong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getcontract", obj);
    }
    // Cập nhật thông tin giám định
    this.capNhatThongTinGD = function (obj) {
        return _service.postData("/contact/capNhatThongTinGD", obj);
    }
    // Hủy hồ sơ tiếp nhận
    this.huyHoSoTiepNhan = function (obj) {
        return _service.postData("/contact/huyHoSoTiepNhan", obj);
    }
    // Gỡ hủy hồ sơ tiếp nhận
    this.goHuyHoSoTiepNhan = function (obj) {
        return _service.postData("/contact/goHuyHoSoTiepNhan", obj);
    }
    // Lấy danh sách tọa độ giám định viên hiện trường
    this.layToaDoGDVHT = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/getlocation", obj);
    }
    // Lấy danh sách giám định viện hiện trường
    this.lietKeDanhSachGDVHT = function (obj) {
        return _service.getFile("/contact/lietKeDanhSachGDVHT", obj);
    }
    // Lấy danh sách gara báo giá
    this.timKiemGaraBaoGia = function (obj) {
        return _service.getFile("/contact/timKiemGaraBaoGia", obj);
    }
}