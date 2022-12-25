function HealthCompensationService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.paging = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/GetPaging", obj);
    };
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/detailHoSo", obj);
    };
    // Lấy chi tiết lần
    this.layCTLan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/detailReceive", obj);
    };
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/getfilesthumnail", obj);
    }
    //Update khách hàng VIP
    this.khachHangVIP = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/updateKHVIP", obj);
    };
    //Chuyển người xử lý
    this.chuyenNguoiXuLy = function (obj) {
        return _service.postData("/healthclaim/Receive/chuyenNguoiXuLy", obj);
    }
    // Xóa ảnh trong hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/deleteimagedamage", obj);
    }
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/phanLoaiHangMuc", obj);
    }
    // Lấy chứng từ bồi thường
    this.layChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layChungTuBoiThuong", obj);
    }
    // Nhập chứng từ bồi thường
    this.nhapChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/nhapChungTuBoiThuong", obj);
    }
    // Xóa chứng từ bồi thường
    this.xoaChungTuBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/xoaChungTuBoiThuong", obj);
    }
    // Nhập thông tin người thụ hưởng
    this.nhapThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/nhapThongTinNguoiThuHuong", obj);
    }
    // Xóa thông tin người thụ hưởng
    this.xoaThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/xoaThongTinNguoiThuHuong", obj);
    }
    // Lấy lịch sử tổn thất
    this.layLSTT = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLSTT", obj);
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
    // Lấy danh sách quyền lợi gốc
    this.getListQuyenLoiGoc = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/getListQuyenLoiGoc", obj);
    }
    // Nhận hồ sơ
    this.NhanHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/NhanHoSo", obj);
    }
    // Trả hồ sơ
    this.TraHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/TraHoSo", obj);
    }
    // Trình bồi thường
    this.TrinhBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/", obj);
    }
    // Duyệt phương án
    this.DuyetPhuongAn = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/duyetPA", obj);
    }
    // Hủy duyệt phương án
    this.huyDuyetPA = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/huyDuyetPA", obj);
    }
    // Từ chối bồi thường
    this.TuChoiBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/TuChoiBoiThuong", obj);
    }
    // Hủy từ chối bồi thường
    this.HuyTuChoiBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/HuyTuChoiBoiThuong", obj);
    }
    // Thêm lần tính toán
    this.themLanTinhToan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/themLanTinhToan", obj);
    };
    // Xóa quyền lợi
    this.xoaQuyenLoi = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/xoaQuyenLoi", obj);
    };
    this.chuyenThanhToan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/chuyenThanhToan", obj);
    };
    this.goChuyenThanhToan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/goChuyenThanhToan", obj);
    };
    // Lưu chi phí chi tiết
    this.LuuChiPhiChiTiet = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/LuuChiPhiChiTiet", obj);
    }
    // Copy hồ sơ
    this.copyHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/copyHoSo", obj);
    }
    // Hủy hồ sơ tính toán
    this.huyHoSoTinhToan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/huyHoSoTinhToan", obj);
    }
    // Hủy hồ sơ tiếp nhận
    this.goHuyHoSoTinhToan= function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/goHuyHoSoTinhToan", obj);
    }
    // Sửa hồ sơ tiếp nhận
    this.suaHoSoTiepNhanLan = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/suaHoSoTiepNhanLan", obj);
    }
    // Xác nhân ký tay
    this.xacNhanKyTay = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/xacNhanKyTay", obj);
    }
    // Xem quyền lợi từ hệ thống MIC
    this.getListQuyenLoiMIC = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/getListQuyenLoiMIC", obj);
    }
    // Lấy lịch sử yêu cầu bổ sung HSGT
    this.layLichSuYeuCauBSHS = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLichSuYeuCauBSHS", obj);
    }
    // Nhập thông tin phản hồi ý kiến khách hàng
    this.nhapThongTinPhanHoiYKien = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/nhapThongTinPhanHoiYKien", obj);
    }
}

