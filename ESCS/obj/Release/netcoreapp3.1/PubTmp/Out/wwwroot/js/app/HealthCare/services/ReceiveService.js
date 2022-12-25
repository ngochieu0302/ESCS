function ReceiveService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.paging = function (obj) {
        return _service.postData("/healthclaim/Receive/GetPaging", obj);
    };
    this.timNDBH = function (obj) {
        return _service.postData("/healthclaim/Receive/searchNDBH", obj);
    };
    this.nhapThongTinNDBH = function (obj) {
        return _service.postData("/healthclaim/Receive/insertNDBH", obj);
    };
    this.khachHangVIP = function (obj) {
        return _service.postData("/healthclaim/Receive/updateKHVIP", obj);
    };
    this.chuyenNguoiXuLy = function (obj) {
        return _service.postData("/healthclaim/Receive/chuyenNguoiXuLy", obj);
    }
    this.layThongTinChung = function (obj) {
        return _service.postData("/healthclaim/Receive/getCommonInfo", obj);
    };
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/healthclaim/Receive/detailHoSo", obj);
    };
    this.layDSLanTiepNhan = function (obj) {
        return _service.postData("/healthclaim/Receive/lstReceives", obj);
    };
    this.layCTLanTiepNhan = function (obj) {
        return _service.postData("/healthclaim/Receive/detailReceive", obj);
    };
    this.ThemHoSoTiepNhanLan = function (obj) {
        return _service.postData("/healthclaim/Receive/ThemHoSoTiepNhanLan", obj);
    };
    this.ThemHoSoTiepNhanQuyenLoiLan = function (obj) {
        return _service.postData("/healthclaim/Receive/ThemHoSoTiepNhanQuyenLoiLan", obj);
    };
    this.XoaHoSoTiepNhanLan = function (obj) {
        return _service.postData("/healthclaim/Receive/XoaHoSoTiepNhanLan", obj);
    };
    this.XoaHoSoTiepNhanQuyenLoiLan = function (obj) {
        return _service.postData("/healthclaim/Receive/XoaHoSoTiepNhanQuyenLoiLan", obj);
    };
    this.LayChiTietQLoi = function (obj) {
        return _service.postData("/healthclaim/Receive/LayChiTietQLoi", obj);
    };
    this.xemChiTietNDBH = function (obj) {
        return _service.postData("/healthclaim/Receive/xemChiTietNDBH", obj);
    };
    // Lấy danh sách quyền lợi gốc
    this.getListQuyenLoiGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/getListQuyenLoiGoc", obj);
    }
    // Chuyển sang hồ sơ tính toán
    this.chuyenHoSoSangTinhToan = function (obj) {
        return _service.postData("/healthclaim/Receive/chuyenHoSoSangTinhToan", obj);
    }
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/healthclaim/Receive/getfilesthumnail", obj);
    }
    // Xóa ảnh trong hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/healthclaim/Receive/deleteimagedamage", obj);
    }
    // Lấy lịch sử tổn thất
    this.layLSTT = function (obj) {
        return _service.postData("/healthclaim/Receive/layLSTT", obj);
    }
    // Lấy lịch sử tổn thất tổng hợp theo quyền lợi
    this.layLSTTGroup = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLSTTGroup", obj);
    }
    // Lấy top 5 hợp đồng tái tục
    this.layDanhSachHDTaiTuc = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layDanhSachHDTaiTuc", obj);
    }
    // Lấy lịch sử tổn thất top 5
    this.layLSTTTop5 = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLSTTTop5", obj);
    }
    // Lấy lịch sử tổn thất tổng hợp theo quyền lợi top 5
    this.layLSTTGroupTop5 = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLSTTGroupTop5", obj);
    }
    // Hủy hồ sơ tiếp nhận
    this.huyHoSoTiepNhan = function (obj) {
        return _service.postData("/healthclaim/Receive/huyHoSoTiepNhan", obj);
    }
    // Hủy hồ sơ tiếp nhận
    this.goHuyHoSoTiepNhan = function (obj) {
        return _service.postData("/healthclaim/Receive/goHuyHoSoTiepNhan", obj);
    }
    // Lấy tài liệu hồ sơ
    this.getHosoTaiLieu = function (obj) {
        return _service.postData("/healthclaim/Receive/getHosoTaiLieu", obj);
    }
    // Lấy chứng từ bồi thường
    this.layChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/Receive/layChungTuBoiThuong", obj);
    }
    // Nhập chứng từ bồi thường
    this.nhapChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/Receive/nhapChungTuBoiThuong", obj);
    }
    // Xóa chứng từ bồi thường
    this.xoaChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/Receive/xoaChungTuBoiThuong", obj);
    }
    // Nhập thông tin người thụ hưởng
    this.nhapThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/healthclaim/Receive/nhapThongTinNguoiThuHuong", obj);
    }
    // Xóa thông tin người thụ hưởng
    this.xoaThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/healthclaim/Receive/xoaThongTinNguoiThuHuong", obj);
    }
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/healthclaim/Receive/phanLoaiHangMuc", obj);
    }
    // Nhận hồ sơ
    this.nhanHoSo = function (obj) {
        return _service.postData("/healthclaim/Receive/nhanHoSo", obj);
    }
    // Lưu chi phí chi tiết
    this.LuuChiPhiChiTiet = function (obj) {
        return _service.postData("/healthclaim/Receive/LuuChiPhiChiTiet", obj);
    }
    // Gửi thông báo YCBSHS
    this.guiThongBaoYCBSHS = function (obj) {
        return _service.postData("/healthclaim/Receive/guiThongBaoYCBSHS", obj);
    }
    // Kiểm tra hồ sơ có đủ điều kiện duyệt giá hay không
    this.ktraHoSoDuyetTuDong = function (obj) {
        return _service.postData("/healthclaim/Receive/ktraHoSoDuyetTuDong", obj);
    }
    // Xem quyền lợi từ hệ thống MIC
    this.getListQuyenLoiMIC = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/getListQuyenLoiMIC", obj);
    }
    // xem lần nhận hồ sơ gốc
    this.xemLanNhanHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/xemLanNhanHoSoGoc", obj);
    }
    // lấy chi tiết lần nhận hồ sơ gốc
    this.layChiTietlanNhanHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/layChiTietlanNhanHoSoGoc", obj);
    }
    // lưu lần nhận hồ sơ gốc
    this.luulanNhanHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/luulanNhanHoSoGoc", obj);
    }
    // lấy danh sách lần nhận hồ sơ gốc
    this.layDanhSachLanBoSungHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/layDanhSachLanBoSungHoSoGoc", obj);
    }
    // lưu lần chi tiết nhận hồ sơ gốc
    this.luulanNhanChiTietHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/luulanNhanChiTietHoSoGoc", obj);
    }
    // Xác nhận lần nhận hồ sơ gốc
    this.XacNhanlanNhanHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/XacNhanlanNhanHoSoGoc", obj);
    }
    // Lấy lịch sử yêu cầu bổ sung HSGT
    this.layLichSuYeuCauBSHS = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLichSuYeuCauBSHS", obj);
    }
    // Xóa lần nhận hồ sơ gốc
    this.xoaLanNhanHoSoGoc = function (obj) {
        return _service.postData("/healthclaim/Receive/xoaLanNhanHoSoGoc", obj);
    }
    // Kiểm tra lần tiếp nhận trùng bệnh viện
    this.kiemTraTrungLanTiepNhan = function (obj) {
        return _service.postData("/healthclaim/Receive/kiemTraTrungLanTiepNhan", obj);
    }
    // Nhập thông tin phản hồi ý kiến khách hàng
    this.nhapThongTinPhanHoiYKien = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/nhapThongTinPhanHoiYKien", obj);
    }
}