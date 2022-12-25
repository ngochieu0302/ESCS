function MotoCompensationService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.paging = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/paging", obj);
    };
    // Lấy thông tin chi tiết hồ sơ bồi thường
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThongTinChiTietHoSo", obj);
    };
    // Lấy tất cả danh mục màn hình giám định xe cơ giới
    this.layDanhMuc = function () {
        return _service.postData("/motoclaim/motoCompensation/layDanhMuc");
    };
    // nhận hồ sơ  btnNhanHoSo
    this.nhanHoSo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/nhanHoSoBoiThuong", obj);
    };
    // nhận hồ sơ  btnNhanHoSo
    this.traHoSo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/traHoSoBoiThuong", obj);
    };
    // Lưu hạng mục tổn thất
    this.luuHangMucTonThat = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuHangMucTonThat", obj);
    }
    // Xóa hạng mục tổn thất
    this.xoaHangMucTonThat = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaHangMucTonThat", obj);
    }
    // Xem nghiệp vụ của 1 hồ sơ tổn thất
    this.xemNghiepVu = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemNghiepVu", obj);
    }
    // Thêm gara báo giá
    this.themGaraBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/themGaraBaoGia", obj);
    }
    // Chọn gara hợp tác báo giá
    this.chonGaraHopTacBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chonGaraHopTacBaoGia", obj);
    }
    // Đọc hóa đơn
    this.docHoaDon = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/docHoaDon", obj);
    }
    // Lấy tất cả gara báo giá
    this.layGaraBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layGaraBaoGia", obj);
    }
    // Lấy gara báo giá chi tiết
    this.layGaraBaoGiaCT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layGaraBaoGiaCT", obj);
    }
    // Xóa gara báo giá
    this.xoaGaraBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaGaraBaoGia", obj);
    }
    // Sửa gara báo giá chi tiết
    this.suaGaraBaoGiaCT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/suaGaraBaoGiaCT", obj);
    }
    // Duyệt gara báo giá chi tiết
    this.duyetGaraBaoGiaCT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/duyetGaraBaoGiaCT", obj);
    }
    // Hủy duyệt gara báo giá chi tiết
    this.huyDuyetGaraBaoGiaCT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/huyDuyetGaraBaoGiaCT", obj);
    }
    // Lưu phương án bồi thường
    this.luuPABoiThuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuPABoiThuong", obj);
    }
    // Tính toán phương án bồi thường
    this.tinhPABoiThuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/tinhPABoiThuong", obj);
    }
    // Tính toán phương án bồi thường phương án
    this.tinhPABoiThuongPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/tinhPABoiThuongPA", obj);
    }
    // Xem bảng kê chi tiết tính toán
    this.xemBangKeCtietPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemBangKeCtietPA", obj);
    }
    // Lấy ảnh file chi tiết
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/getfiles", obj);
    }
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/getfilesthumnail", obj);
    }
    // Nhập chứng từ bồi thường
    this.nhapChungTuBoiThuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/nhapChungTuBoiThuong", obj);
    }
    // Xóa chứng từ bồi thường
    this.xoaChungTuBoiThuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaChungTuBoiThuong", obj);
    }
    // Lấy thông tin đối tác
    this.layThongTinDoiTac = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThongTinDoiTac", obj);
    }
    // Lấy thông tin đối tác chứng từ
    this.layThongTinDoiTacChungTu = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThongTinDoiTacChungTu", obj);
    }
    // Lấy chứng từ bồi thường
    this.layChungTuBoiThuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layChungTuBoiThuong", obj);
    }
    // Nhập thông tin người thụ hưởng
    this.nhapThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/nhapThongTinNguoiThuHuong", obj);
    }
    // Xóa thông tin người thụ hưởng
    this.xoaThongTinNguoiThuHuong = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaThongTinNguoiThuHuong", obj);
    }
    // Lấy danh sách quá trình xử lý
    this.danhSachQuaTrinhXuLy = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/getlistprocessing", obj);
    }
    // Lấy danh sách lịch sử tổn thất
    this.layDsLichSuTonThat = function (obj) {
        return _service.getFile("/motoclaim/motoinvestigation/gethistory", obj);
    }
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMucTonThat = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/phanLoaiHangMucTonThat", obj);
    }
    // Xóa ảnh trong hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/deleteimagedamage", obj);
    }
    // Download zip file ảnh/tài liệu tổn thất
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/downloadzipfile", obj);
    }
    // Chuyển người xử lý hồ sơ
    this.chuyenNguoiXuLy = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/moveuserhandler", obj);
    }
    // Hủy hồ sơ
    this.huyHoSo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/huyHoSo", obj);
    }
    // Gỡ hủy hồ sơ
    this.goHuyHoSo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/goHuyHoSo", obj);
    }
    // Lấy chi phí tự động
    this.nhapGiayToLoi = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/setGiayToLoi", obj);
    }
    // Download mẫu báo giá
    this.downloadMauBaoGia = function (obj) {
        var _serviceDownload = new Service();
        _serviceDownload.isPostObject = true;
        return _serviceDownload.postData("/motoclaim/motocompensation/downloadmaubaogia", obj);
    }
    // Download mẫu báo giá dọc
    this.downloadMauBaoGiaDoc = function (obj) {
        var _serviceDownload = new Service();
        _serviceDownload.isPostObject = true;
        return _serviceDownload.postData("/motoclaim/motocompensation/downloadmaubaogiadoc", obj);
    }
    // Upload mẫu báo giá
    this.uploadBaoGia = function (formData) {
        var _serviceUpload = new Service();
        return _serviceUpload.postFormData("/motoclaim/motocompensation/uploadbaogia", formData);
    }
    // Upload mẫu báo giá dọc
    this.uploadBaoGiaDoc = function (formData) {
        var _serviceUpload = new Service();
        return _serviceUpload.postFormData("/motoclaim/motocompensation/uploadbaogiadoc", formData);
    }
    // BTV chọn báo giá
    this.chonBaoGia = function (obj) {
        return _service.postData("/motoclaim/motocompensation/chonBaoGia", obj);
    }
    // Lấy thông tin hợp đồng
    this.layThongTinHopDong = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/getcontract", obj);
    }
    // Lấy chi tiết hạng mục TNDS
    this.layTNDS = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/listDetailTNDS", obj);
    }
    // Nhập chi tiết hạng mục TNDS
    this.luuTNDS = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/saveDetailTNDS", obj);
    }

    // Lấy danh sách vật tư thu hồi
    this.layDanhSachVatTuThuHoi = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDanhSachVatTuThuHoi", obj);
    }
    // Lưu vật tư thu hồi
    this.luuVatTuThuHoi = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuVatTuThuHoi", obj);
    }
    // Xóa vật tư thu hồi
    this.xoaVatTuThuHoi = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaVatTuThuHoi", obj);
    }

    // Lấy danh sách thu đòi người thứ 3
    this.layDanhSachNTBA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDanhSachNTBA", obj);
    }
    // Lưu thông tin thu đòi người thứ 3
    this.luuNTBA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuNTBA", obj);
    }
    // Xóa thông tin thu đòi người thứ 3
    this.xoaNTBA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaNTBA", obj);
    }
    // Lấy danh sách điều khoản bổ sung theo hạng mục
    this.layDKBSTheoHangMuc = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDKBSTheoHangMuc", obj);
    }
    // Lấy danh sách nguyên nhân giảm trừ theo hạng mục
    this.layNNGTTheoHangMuc = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layNNGTTheoHangMuc", obj);
    }
    // Lưu điều khoản bổ sung theo hạng mục
    this.luuDieuKhoanBoSung = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuDieuKhoanBoSung", obj);
    }
    // Lưu nguyên nhân giảm trừ theo hạng mục
    this.luuNguyenNhanGiamTru = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuNguyenNhanGiamTru", obj);
    }
    // Lưu ghi chú
    this.luuGhiChu = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuGhiChu", obj);
    }
    // Lấy ds tạm ứng của hồ sơ
    this.layTamUng = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layTamUng", obj);
    }
    // Lưu tạm ứng
    this.luuTamUng = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuTamUng", obj);
    }
    // Xóa tạm ứng
    this.xoaTamUng = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaTamUng", obj);
    }
    // Xem chi tiết tạm ứng
    this.xemCtietTamUng = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemCtietTamUng", obj);
    }
    // Lấy gara hợp tác
    this.layGaraHopTac = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layGaraHopTac", obj);
    }
    // Chuyển báo giá sang gara
    this.chuyenBaoGiaGara = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chuyenBaoGiaGara", obj);
    }
    // Lấy thông tin báo giá gara
    this.layBaoGiaGara = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layBaoGiaGara", obj);
    }
    // Cập nhật trạng thái báo giá
    this.capNhatTrangThaiBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/capNhatTrangThaiBaoGia", obj);
    }
    // Tạo lần báo giá mới
    this.taoLanBaoGiaMoi = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/taoLanBaoGiaMoi", obj);
    }
    // Lưu thông tin lần báo giá
    this.luuLanBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuLanBaoGia", obj);
    }
    // Chuyển lần báo giá mới sang gara
    this.chuyenLanBaoGiaMoi = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chuyenLanBaoGiaMoi", obj);
    }
    // Chấp thuận báo giá
    this.chapThuanBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chapThuanBaoGia", obj);
    }
    // Hủy báo giá
    this.huyBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/huyBaoGia", obj);
    }
    // Yêu cầu sửa chữa
    this.yeuCauSuaChua = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/YeuCauSuaChua", obj);
    }
    // Update khách hàng VIP
    this.khachHangVIP = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/updateKHVIP", obj);
    };
    // Lấy chi tiết hạng mục
    this.layChiTietHangMuc = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layChiTietHangMuc", obj);
    };
    // Lưu chi tiết hạng mục
    this.luuChiTietHangMuc = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuChiTietHangMuc", obj);
    };
    // Lấy hạng mục theo LHNV 
    this.layHangMucLHNV = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layHangMucLHNV", obj);
    };

    // Bồi thường toàn bộ
    this.boithuongToanBo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/boithuongToanBo", obj);
    };
    // Xóa bồi thường toàn bộ
    this.xoaBoithuongToanBo = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaBoithuongToanBo", obj);
    };
    
    // Lưu phương án VCX
    this.luuPhuongAnVCX = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuPhuongAnVCX", obj);
    };
    // Lưu phương án nghiệp vụ
    this.luuPhuongAnNV = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuPhuongAnNV", obj);
    };
    // Xóa phương án
    this.xoaPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xoaPhuongAn", obj);
    };
    // Chọn phương án
    this.chonPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chonPhuongAn", obj);
    }
    // Bỏ chọn phương án
    this.boChonPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/boChonPhuongAn", obj);
    };
    // Thêm phương án tổng hợp
    this.ThemPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/ThemPhuongAn", obj);
    };
    // Lấy thông tin giảm giá
    this.layThongTinGiamGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThongTinGiamGia", obj);
    };
    // Lưu thông tin giảm giá
    this.luuThongTinGiamGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinGiamGia", obj);
    };
    // Kết thúc báo giá
    this.ketThucBaoGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/ketThucBaoGia", obj);
    };
    // Hủy kết thúc báo giá
    this.huyKetThucBaoGia  = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/huyKetThucBaoGia", obj);
    };
    // Hủy kết thúc báo giá
    this.layDanhSachGiamGiaPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDanhSachGiamGiaPA", obj);
    };
    // Lưu thông tin giảm giá phương án
    this.luuThongTinGiamGiaPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinGiamGiaPA", obj);
    };
    // Lấy thông tin khấu trừ
    this.layKhauTru = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layKhauTru", obj);
    };
    // Lưu thông tin khấu trừ
    this.luuThongTinKhauTru = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinKhauTru", obj);
    };
    // Lưu thông tin khấu trừ phương án
    this.luuThongTinKhauTruPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinKhauTruPA", obj);
    };
    // Lấy thông tin khấu trừ phương án
    this.layKhauTruPA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layKhauTruPA", obj);
    };
    // Lưu thông tin khấu trừ
    this.xemBangGiaChiTiet = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemBangGiaChiTiet", obj);
    };
    //-----------------------Code phương án -------------------------
    // Lưu thông tin khấu trừ
    this.layDSPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDSPhuongAn", obj);
    };
    // Xem thông tin chi tiết phương án
    this.xemChiTietPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemChiTietPhuongAn", obj);
    };
    // Chuyển thanh toán
    this.chuyenThanhToan = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/chuyenThanhToan", obj);
    };
    // Hủy chuyển thanh toán
    this.huyChuyenThanhToan = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/huyChuyenThanhToan", obj);
    };
    // Lấy thông tin thuế
    this.layThue = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThue", obj);
    };
    // Lưu thông tin thuế
    this.luuThongTinThue = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinThue", obj);
    };
    // Lấy thông tin thuế phương án
    this.layThuePA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layThuePA", obj);
    };
    // Lưu thông tin thuế phương án
    this.luuThongTinThuePA = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinThuePA", obj);
    };
    // Lưu thông tin BTV đánh giá
    this.luuThongTinDanhGiaBTV = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinDanhGiaBTV", obj);
    };
    // Lưu thông tin BTV đánh giá HSBT
    this.luuThongTinBTVDanhGiaHSBT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinBTVDanhGiaHSBT", obj);
    };
    // Liệt kê  thông tin chi tiết  BTV đánh giá
    this.xemthongTinChiTietBTVDanhGia = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemthongTinChiTietBTVDanhGia", obj);
    };
    // Liệt kê  thông tin chi tiết  BTV đánh giá
    this.xemthongTinChiTietBTVDanhGiaHSBT = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/xemthongTinChiTietBTVDanhGiaHSBT", obj);
    };
    // Lấy thông tin tiền bồi thường
    this.layTienBT = function (obj) {
        return _service.postData("/manager/awaitingpayment/layTienBT", obj);
    };
    // Cập nhật lại thông tin tin tiền thue
    this.capNhatThue = function (obj) {
        return _service.postData("/manager/awaitingpayment/capNhatThue", obj);
    };
    // Cập nhật lại thông tin tin tiền thue
    this.layDuLieuBaoGiaGara = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layDuLieuBaoGiaGara", obj);
    };
    // Cập nhật lại thông tin tin tiền thue
    this.luuThongTinOCRBaoGiaGara = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinOCRBaoGiaGara", obj);
    };
    // Cập nhật lại thông tin OCR hóa đơn xe
    this.luuThongTinOCRHoaDonChungTuXe = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/luuThongTinOCRHoaDonChungTuXe", obj);
    };
    // Tách nghiệp vụ bồi thường
    this.tachNghiepVuHs = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/tachNghiepVuHs", obj);
    };
    // Lấy so sánh báo giá
    this.laySoSanhBGGara = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/laySoSanhBGGara", obj);
    };
    // Lấy loại hình nghiệp vụ của Phương án
    this.layLHNVPhuongAn = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layLHNVPhuongAn", obj);
    };
    // Lấy thông tin bảng giá PA
    this.layBangChiTietPAView = function (obj) {
        return _service.postData("/motoclaim/motoCompensation/layBangChiTietPAView", obj);
    };
}