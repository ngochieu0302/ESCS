function ExpertationcostService() {
    var _service = new Service();
    //Tìm kiếm + phân trang chi phí giám định
    this.timKiemPtrang = function (obj) {
        return _service.postData("/manager/expertationcost/getpaging", obj);
    };
    //Tìm kiếm + phân trang chi phí giám định
    this.layDsHoSoBT = function (obj) {
        return _service.postData("/manager/expertationcost/layDsHoSoBT", obj);
    };
    //Lấy chi tiết hồ sơ giám định(TPA)
    this.GetDetail = function (obj) {
        return _service.postData("/manager/expertationcost/GetDetail", obj);
    };
    //Lưu thông tin chi phí giám định
    this.luuChiPhiGiamDinh = function (obj) {
        return _service.postData("/manager/expertationcost/luuChiPhiGiamDinh", obj);
    };
    //Lưu thông tin hóa đơn/chứng từ chi phí giám định
    this.nhapChungTuBoiThuong = function (obj) {
        return _service.postData("/manager/expertationcost/nhapChungTuBoiThuong", obj);
    };
    //Lưu thông tin thụ hưởng
    this.nhapThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/manager/expertationcost/nhapThongTinNguoiThuHuong", obj);
    };
    //Lấy danh sách đơn vị giám định
    this.layDanhSachDonViGD = function (obj) {
        return _service.postData("/manager/expertationcost/layDanhSachDonViGD", obj);
    };
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/manager/expertationcost/getfilesthumnail", obj);
    }
    // Xóa file
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/manager/expertationcost/deleteimagedamage", obj);
    }
    // Chuyển thanh toán
    this.chuyenThanhToan = function (obj) {
        return _service.postData("/manager/expertationcost/chuyenThanhToan", obj);
    };
    // Gỡ chuyển thanh toán
    this.goChuyenThanhToan = function (obj) {
        return _service.postData("/manager/expertationcost/goChuyenThanhToan", obj);
    };
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/manager/expertationcost/phanLoaiHangMuc", obj);
    }
    // Lấy thông tin chi tiết hồ sơ bồi thường
    this.layChiTietHoSoBT = function (obj) {
        return _service.postData("/manager/expertationcost/layChiTietHoSoBT", obj);
    }
    // Lưu chi phí giám định chi tiết
    this.luuChiPhiGDChiTiet = function (obj) {
        return _service.postData("/manager/expertationcost/luuChiPhiGDChiTiet", obj);
    }
    // Xóa chi phí giám định chi tiết
    this.xoaChiPhiGDChiTiet = function (obj) {
        return _service.postData("/manager/expertationcost/xoaChiPhiGDChiTiet", obj);
    }
    // Lưu chi phí thực tế chi tiết
    this.luuTienThucTe = function (obj) {
        return _service.postData("/manager/expertationcost/luuTienThucTe", obj);
    }
}