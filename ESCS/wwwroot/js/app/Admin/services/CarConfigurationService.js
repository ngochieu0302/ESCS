function CarConfigurationService() {

    var _service = new Service();

    //Xóa thông tin phương pháp tính khấu hao
    this.xoaThongTinKauHao = function (obj) {
        return _service.postData("/admin/carconfiguration/delete", obj);
    };

    //Lưu thông tin phương pháp tính khấu hao
    this.SavePhuongPhapKhauHao = function (obj) {
        return _service.postData("/admin/carconfiguration/SavePhuongPhapKhauHao", obj);
    };

    //Lưu thông tin phương pháp tính khấu hao danh sách ngày
    this.SaveNgayKhauHao = function (obj) {
        return _service.postData("/admin/carconfiguration/savengaykhauhao", obj);
    };

    //Lưu thông tin phương pháp tính khấu hao loại xe
    this.SaveLoaiXe = function (obj) {
        return _service.postData("/admin/carconfiguration/saveloaixe", obj);
    };

    //Lưu thông tin phương pháp tính khấu hao loại xe
    this.SaveCarConfigLoaiXe = function (obj) {
        return _service.postData("/admin/carconfiguration/saveloaixe", obj);
    };

    //Tìm kiếm + phân trang phương pháp tính khấu hao
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/carconfiguration/getpaging", obj);
    };

    //Lấy thông tin chi tiết phương pháp tính khấu hao
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/carconfiguration/getdetail", obj);
    };

    // Lưu thông tin phương pháp tính giảm trừ bảo hiểm
    this.SaveReduce = function (obj) {
        return _service.postData("/admin/carconfiguration/savereduce", obj);
    };

    //Lấy thông tin chi tiết phương pháp tính giảm trừ bảo hiểm
    this.layThongTinChiTietGiamTru = function (obj) {
        return _service.postData("/admin/carconfiguration/getdetailreduce", obj);
    };

    // Liệt kê thông tin cấu hình bồi thường xe
    this.layThongTinChiTietCar = function (obj) {
        return _service.postData("/admin/carconfiguration/getdetailcar", obj);
    };

    // Nhập thông tin cấu hình bồi thường xe
    this.luuThongTinCauHinhXe = function (obj) {
        return _service.postData("/admin/carconfiguration/savecauhinhbt", obj);
    };

    // Lấy danh sách ngày
    this.GetDsNgay = function (obj) {
        return _service.postData("/admin/carconfiguration/getdsngay", obj);
    };

    // Xóa cấu hình khấu hao
    this.deleteConfigKhauHao = function (obj) {
        return _service.postData("/admin/carconfiguration/deleteConfigKhauHao", obj);
    };

    // Xóa cấu hình khấu hao
    this.deleteConfigGiamTru = function (obj) {
        return _service.postData("/admin/carconfiguration/deleteConfigGiamTru", obj);
    };

    // Xóa cấu hình chung xe ô tô
    this.deleteConfigCommonCar = function (obj) {
        return _service.postData("/admin/carconfiguration/deleteConfigCommonCar", obj);
    };

    // Xóa cấu hình khấu hao loại xe
    this.deleteConfigKhauHaoLoaiXe = function (obj) {
        return _service.postData("/admin/carconfiguration/deleteConfigKhauHaoLoaiXe", obj);
    };
    
    this.xemCauHinhBoiThuong = function (obj) {
        return _service.postData("/admin/carconfiguration/xemCauHinhBoiThuong", obj);
    }

    // Nhập thông tin cấu hình bồi thường xe
    this.luuThongTinCauHinhBoiThuong = function (obj) {
        return _service.postData("/admin/carconfiguration/luucauhinhboithuong", obj);
    };

    // Xóa cấu hình cấu hình bồi thường xe
    this.xoaCauHinhBoiThuong = function (obj) {
        return _service.postData("/admin/carconfiguration/xoacauhinhboithuong", obj);
    };
    //Xem thông tin cấu hình hồ sơ giấy tờ
    this.xemCauHinhHoSo = function (obj) {
        return _service.postData("/admin/carconfiguration/xemCauHinhHoSo", obj);
    }
    //Lưu thông tin cấu hình hồ sơ giấy tờ
    this.luuThongTinHoSoChungTu = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinHoSoChungTu", obj);
    }
    //Xóa thông tin cấu hình hồ sơ giấy tờ
    this.xoaCauHinhHoSo = function (obj) {
        return _service.postData("/admin/carconfiguration/xoaCauHinhHoSo", obj);
    }
    //Lưu thông tin tiến trình KPI
    this.luuThongTinTienTrinhKPI = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinTienTrinhKPI", obj);
    }
    //Xóa thông tin tiến trình KPI
    this.xoaThongTinTienTrinhKPI = function (obj) {
        return _service.postData("/admin/carconfiguration/xoaThongTinTienTrinhKPI", obj);
    }
    //Liệt kê ngày + tiền  thông tin tiến trình KPI
    this.xemThongTinChiTietNgayTien = function (obj) {
        return _service.postData("/admin/carconfiguration/xemThongTinChiTietNgayTien", obj);
    }
    //Liệt kê thông tin tiến trình KPI
    this.layThongTinChiTietKPI = function (obj) {
        return _service.postData("/admin/carconfiguration/layThongTinChiTietKPI", obj);
    }
    //------------Cấu hình SLA-----------------
    //Nhập thông tin cấu hình SLA
    this.luuThongTinCauHinhSLA = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinCauHinhSLA", obj);
    }
    //Liệt kê thông tin cấu hình SLA
    this.lietKeThongTinCauHinhSLA = function (obj) {
        return _service.postData("/admin/carconfiguration/lietKeThongTinCauHinhSLA", obj);
    }

    //Cấu hình phân công theo địa bàn
    this.luuThongTinPhanCong = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinPhanCong", obj);
    }
    //Liệt kê thông tin cấu hình phân công theo địa bàn
    this.lietKeThongTinPhanCongDiaBan = function (obj) {
        return _service.postData("/admin/carconfiguration/lietKeThongTinPhanCongDiaBan", obj);
    }
    //Xóa thông tin cấu hình phân công theo địa bàn
    this.xoaThongTinPhanCongDiaBan = function (obj) {
        return _service.postData("/admin/carconfiguration/xoaThongTinPhanCongDiaBan", obj);
    }
    //Lấy chi tiết phân công
    this.layThongTinChiTietPhanCongDiaBan = function (obj) {
        return _service.postData("/admin/carconfiguration/layThongTinChiTietPhanCongDiaBan", obj);
    }
    //Xem thông tin chi tiết  cấu hình phân công theo địa bàn
    this.xemCTietCauHinhPhanCongDiaBan = function (obj) {
        return _service.postData("/admin/carconfiguration/xemCTietCauHinhPhanCongDiaBan", obj);
    }
    //----------------------------------------------------------------------------------------
    //Lấy danh sách ngày áp dụng duyệt giá tự động
    this.layDsNgayADDuyetGiaTuDong = function () {
        return _service.postData("/admin/carconfiguration/layDsNgayADDuyetGiaTuDong", {});
    }
    //Lấy chi tiết cấu hình duyệt giá tự động theo ngày áp dụng
    this.layChiTietCHDuyetGiaTuDong = function (obj) {
        return _service.postData("/admin/carconfiguration/layChiTietCHDuyetGiaTuDong", obj);
    }
    //Lưu ngày áp dụng cấu hình duyệt giá tự động
    this.luuCHDuyetGiaTuDongNgayAD = function (obj) {
        return _service.postData("/admin/carconfiguration/luuCHDuyetGiaTuDongNgayAD", obj);
    }
    //Lưu cấu hình duyệt giá danh mục
    this.luuCHDuyetGiaDanhMuc = function (obj) {
        return _service.postData("/admin/carconfiguration/luuCHDuyetGiaDanhMuc", obj);
    }

    //Lấy hãng/hiệu xe đang áp dụng báo giá
    this.layHangHieuXeCHDG = function (obj) {
        return _service.postData("/admin/carconfiguration/layHangHieuXeCHDG", obj);
    }

    //Lấy danh sách hạng mục nhập thông tin cấu hình
    this.layDSHangMucCHDGNhap = function (obj) {
        return _service.postData("/admin/carconfiguration/layDSHangMucCHDGNhap", obj);
    }

    //Lưu thông tin giá duyệt tự động
    this.luuDuLieuHangMucCHDGNhap = function (obj) {
        return _service.postData("/admin/carconfiguration/luuDuLieuHangMucCHDGNhap", obj);
    }

    //Lấy danh sách hạng mục cấu hình duyệt giá
    this.timKiemDsCauHinhDuyetGia = function (obj) {
        return _service.postData("/admin/carconfiguration/timKiemDsCauHinhDuyetGia", obj);
    }

    //------------Cấu hình SLA-----------------
    //Nhập thông tin Cấu hình bên tham gia giám định mặc định
    this.luuThongTinCHBenGDMD = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinCHBenGDMD", obj);
    }
    //Liệt kê thông Cấu hình bên tham gia giám định mặc định
    this.lietKeThongTinCHBenGDMD = function (obj) {
        return _service.postData("/admin/carconfiguration/lietKeThongTinCHBenGDMD", obj);
    }

    //------------Cấu hình xử lý hồ sơ bồi thường --------------
    //Liệt kê thông cấu hình xử lý
    this.lietKeCauHinhXyLyBoiThuong = function (obj) {
        return _service.postData("/admin/carconfiguration/lietKeCauHinhXyLyBoiThuong", obj);
    }
    //Lưu thông cấu hình xử lý
    this.luuThongTinCauHinhXuLy = function (obj) {
        return _service.postData("/admin/carconfiguration/luuThongTinCauHinhXuLy", obj);
    }
}