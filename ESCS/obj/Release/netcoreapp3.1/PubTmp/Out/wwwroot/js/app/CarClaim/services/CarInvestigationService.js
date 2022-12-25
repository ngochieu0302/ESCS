function CarInvestigationService() {
    var _service = new Service();
    this.base = new Service();
    // Lấy tất cả danh mục màn hình giám định xe cơ giới
    this.layDanhMuc = function () {
        return _service.postData("/carclaim/carinvestigation/pageload");
    };
    // Tìm kiếm  + phân trang hồ sơ giám định
    this.timKiemHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getpaging", obj);
    };
    // Lấy thông tin chi tiết hồ sơ giám định
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getdetail", obj);
    };
    // Lấy thông tin reload
    this.layThongTinReload = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getreload", obj);
    };
    // Nhận hồ sơ
    this.nhanHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/receiveHS", obj);
    };
    // Lấy lại thông tin hạng mục tổn thất
    this.layThongTinHangMucTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getcategoriesdamage", obj);
    };
    // Tìm kiếm xe
    this.timKiemXe = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getpagingsearchcar", obj);
    }
    // Lưu thông tin người thông báo
    this.luuThongTinNguoiThongBao = function (obj) {
        return _service.postData("/carclaim/carinvestigation/savecustomerinfo", obj);
    }
    // Cập nhật thông tin người thông báo
    this.capNhatThongTinNguoiThongBao = function (obj) {
        return _service.postData("/carclaim/carinvestigation/updatecustomerinfo", obj);
    }
    // Lưu thông tin diễn biến tổn thất
    this.luuDienBienTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveprocessdamage", obj);
    }
    // Xóa vụ tổn thất
    this.xoaVuTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deletedamage", obj);
    }
    // Lưu thông tin lần giám định
    this.luuLanGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveinspection", obj);
    }
    // Lưu thông tin bên giam gia giám định
    this.luuBenLienQuan = function (obj) {
        return _service.postData("/carclaim/carinvestigation/savepersoninvolve", obj);
    }
    // Xóa thông tin bên liên quan
    this.xoaBenLienQuan = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deletepersoninvolve", obj);
    }
    // Xóa lần giám định
    this.xoaLanGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deleteinspection", obj);
    }
    // Chuyển người xử lý hồ sơ
    this.chuyenNguoiXuLy = function (obj) {
        return _service.postData("/carclaim/carinvestigation/moveuserhandler", obj);
    }
    // Hủy hồ sơ
    this.huyHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/destroyrecordsdamage", obj);
    }
    // Gỡ hủy hồ sơ giám định
    this.goHuyHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/goHuyHoSo", obj);
    }
    // Lấy danh sách quá trình xử lý
    this.danhSachQuaTrinhXuLy = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getlistprocessing", obj);
    }
    // Lưu thông tin giám định tổn thất
    this.luuGiamDinhTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveexpertisedamage", obj);
    }
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    }
    // Lấy thông tin hợp đồng
    this.layThongTinHopDong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getcontract", obj);
    }
    // Lấy ảnh file chi tiết
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfiles", obj);
    }
    // Xóa ảnh trong hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deleteimagedamage", obj);
    }
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMucTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/classifycategoriesdamage", obj);
    }
    // So sánh dữ liệu OCR
    this.soSanhDuLieuOCR = function (obj) {
        return _service.postData("/carclaim/carinvestigation/compareocr", obj);
    }
    // Cập nhật hạng mục tổn thất đã phân
    this.capNhatHangMucTonThatDaPhan = function (obj) {
        return _service.postData("/carclaim/carinvestigation/updatecategoriesdamage", obj);
    }
    // Xóa hạng mục tổn thất đã phân
    this.xoaNhatHangMucTonThatDaPhan = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deletecategoriesdamage", obj);
    }
    // Download zip file ảnh/tài liệu tổn thất
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/carclaim/carinvestigation/downloadzipfile", obj);
    }
    // Chuyển hồ sơ sang tính toán bồi thường 
    this.chuyenBoiThuong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/convert2compensation", obj);
    }
    // Hủy chuyển sang bồi thường
    this.huyChuyenBoiThuong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/undoconvert2compensation", obj);
    }
    // Cho phép bắt đầu giám định
    this.batDauGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/startinspection", obj);
    }
    // Kết thúc giám định
    this.ketThucGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/endinspection", obj);
    }
    // Hủy kết thúc giám định
    this.huyKetThucGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/undoendinspection", obj);
    }
    // Duyệt biên bản giám định
    this.duyetBienBanGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/duyetbbgd", obj);
    }
    // Duyệt báo cáo giám định
    this.duyetBaoCaoGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/duyetBaoCaoGD", obj);
    }
    // Hủy duyệt báo cáo giám định
    this.huyDuyetBaoCaoGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/huyDuyetBaoCaoGD", obj);
    }
    // Hủy duyệt biên bản giám định
    this.huyDuyetBienBanGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/huyduyetbbgd", obj);
    }
    // Lấy hạng mục tổn thất
    this.layDsHangMucTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getcategories", obj);
    }
    // Bổ sung thêm thông tin bằng lái xe
    this.bsThongTinBangLaiXe = function (obj) {
        return _service.postData("/carclaim/carinvestigation/savelicenseinfo", obj);
    }
    // Bổ sung thêm thông tin đăng kiểm xe
    this.bsThongTinDangKiemXe = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveregistryinfo", obj);
    }
    // Gửi email cho giám định viên
    this.guiEmailGiamDinhVien = function (obj) {
        return _service.postData("/carclaim/carinvestigation/sendmailinspector", obj);
    }
    // In mẫu in
    this.inBienBanGiamDinh = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/printpdf", obj);
    }
    // In mẫu in và ký số
    this.inBienBanGiamDinhKySo = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/printsignaturepdf", obj);
    }
    // Lấy danh sách lịch sử tổn thất
    this.layDsLichSuTonThat = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/gethistory", obj);
    }
    // Lấy danh sách tọa độ giám định viên hiện trường
    this.layToaDoGDVHT = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/getlocation", obj);
    }
    // Lấy danh sách giám định viên theo địa bàn
    this.layDsGiamDinhVien = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/getuserinspection", obj);
    }
    // Lấy chi phí tự động
    this.layChiPhiTuDong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getautocost", obj);
    }
    // Lấy chi phí tự động
    this.nhapGiayToLoi = function (obj) {
        return _service.postData("/carclaim/carinvestigation/setGiayToLoi", obj);
    }
    // Lấy chi tiết hạng mục TNDS
    this.layHangMucChiTiet = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layHangMucChiTiet", obj);
    }
    // Nhập chi tiết hạng mục TNDS
    this.luuTNDS = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveDetailTNDS", obj);
    }
    // Kết thúc lần giám định
    this.ketThucLanGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/ketThucLanGiamDinh", obj);
    }
    // Chuyển giám định viên hiện trường
    this.chuyenNguoiXuLyGDVHT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/chuyenNguoiXuLyGDVHT", obj);
    }
    // Cập nhật thông tin OCR
    this.capNhatThongTinOCR = function (obj) {
        return _service.postData("/carclaim/carinvestigation/capNhatThongTinOCR", obj);
    }
    // Cập nhật thông tin OCR
    this.kiemTraQuyenXuLy = function (obj) {
        return _service.postData("/carclaim/carinvestigation/kiemTraQuyenXuLy", obj);
    }
    // Lấy mức độ tổn thất AI
    this.layMucDoTonThatAI = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layMucDoTonThatAI", obj);
    }
    // Lấy danh sách tỷ lệ thương tật
    this.layDanhSachTyLeThuongTat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layDanhSachTyLeThuongTat", obj);
    }
    // Update khách hàng VIP
    this.khachHangVIP = function (obj) {
        return _service.postData("/carclaim/carinvestigation/updateKHVIP", obj);
    };
    // Lấy  cache đánh giá hiện trường
    this.GetAllDght = function (obj) {
        return _service.postData("/carclaim/carinvestigation/GetAllDght", obj);
    };
    // Lưu thông tin đánh giá hiện trường
    this.luuDanhGiaHienTruong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuDanhGiaHienTruong", obj);
    };
    // Lấy chi tiết đánh giá hiện trường
    this.LayChiTietDanhGiaHienTruong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/LayChiTietDanhGiaHienTruong", obj);
    };
    // Lưu chi tiết hạng mục
    this.luuChiTietHangMuc = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuChiTietHangMuc", obj);
    };
    // Bổ sung hồ sơ giấy tờ
    this.boSungGiayTo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/addprofile", obj);
    }
    // Lấy danh sách đối tượng tổn thất
    this.getlistDoiTuongTonThat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/GetlistDoiTuongTonThat", obj);
    }
    // Lưu đối tượng tổn thất
    this.saveDoiTuongTT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/saveDoiTuongTT", obj);
    }
    // Xóa đối tượng tổn thất
    this.xoaDoiTuongTT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/xoaDoiTuongTT", obj);
    }
    //Lấy danh sách chi phí lần giám định
    this.lietKeChiPhiLanGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/lietKeChiPhiLanGD", obj);
    }
    //Lưu thông tin chi phí lần giám định
    this.luuChiPhiLanGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuChiPhiLanGD", obj);
    }
    //Xóa thông tin chi phí lần giám định
    this.xoaChiPhiLanGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/xoaChiPhiLanGD", obj);
    }
    //Tìm kiếm loại chi phí giám định
    this.dsLoaiChiPhiGDTKiem = function (obj) {
        return _service.postData("/carclaim/carinvestigation/DSLoaiChiPhiGDTKiem", obj);
    }
    //Lấy danh sách nhóm sự kiện bảo hiểm
    this.dsNhomSuKienBH = function (obj) {
        return _service.postData("/carclaim/carinvestigation/DSNhomSuKienBH", obj);
    }
    //Tìm kiếm sự kiện bảo hiểm
    this.tkiemSuKienBH = function (obj) {
        return _service.postData("/carclaim/carinvestigation/TKiemSuKienBH", obj);
    }
    //Lưu thông tin sự kiện bảo hiểm
    this.luuSuKienBH = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuSuKienBH", obj);
    }
    //Lấy danh sách sự kiện theo vụ tổn thất
    this.layDSSuKienTheoVuTT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layDSSuKienTheoVuTT", obj);
    }
    //Lấy thông tin báo cáo giám định hiện trường
    this.layBaoCaoGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layBaoCaoGD", obj);
    }
    //Lưu thông tin báo cáo giám định
    this.luuBaoCaoGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuBaoCaoGD", obj);
    }
    //Xác nhận khách hàng ký tay
    this.xacNhanKyTay = function (obj) {
        return _service.postData("/carclaim/carinvestigation/xacNhanKyTay", obj);
    }
    this.laySoHoSo = function (obj) {
        return _service.postData("/carclaim/carinvestigation/laySoHoSo", obj);
    }
    //Gửi email xác nhận DGHT
    this.guiEmailKhachHang = function (obj) {
        return _service.postData("/carclaim/carinvestigation/guiEmailKhachHang", obj);
    }
    this.layThongTinXacNhanBBGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layThongTinXacNhanBBGD", obj);
    }
    this.huyKetThucLanGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/huyKetThucLanGD", obj);
    }
    // Lưu ước tổn thất nghiệp vụ ở bước lấy số hồ sơ
    this.luuUocTonThatNV = function (obj) {
        return _service.postData("/carclaim/carinvestigation/luuUocTonThatNV", obj);
    }
    // Lấy danh sách người trong nhóm phân công giám định
    this.layDsNguoiTrongNhomPhanCongGD = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layDsNguoiTrongNhomPhanCongGD", obj);
    }
    // Lấy danh sách lhnv đối tượng hợp đồng đã tham gia
    this.layDsLHNVUoc = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layDsLHNVUoc", obj);
    }
    // Lấy thông tin phí
    this.layThongTinTinhTrangThanhToan = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemTinhTrangTTPhi", obj);
    }
    // Xem thông tin chi tiết phương án
    this.xemChiTietPhuongAn = function (obj) {
        return _service.postData("/carclaim/CarCompensation/xemChiTietPhuongAn", obj);
    };
    // Kiểm tra hồ sơ duyệt giá tự động hay không
    this.ktraHoSoDuyetGiaTuDong = function (obj) {
        return _service.postData("/carclaim/carinvestigation/ktraHoSoDuyetGiaTuDong", obj);
    };
    // Lấy lịch sử yêu cầu BSHS
    this.layLichSuYeuCauBSHS = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layLichSuYeuCauBSHS", obj);
    };
    //Lấy danh sách thương tật
    this.layDsThuongTat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layDsThuongTat", obj);
    };
    //Lưu thương tật
    this.nhapThuongTat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/nhapThuongTat", obj);
    };
    //Xóa thương tật
    this.xoaThuongTat = function (obj) {
        return _service.postData("/carclaim/carinvestigation/xoaThuongTat", obj);
    };


    // Thêm gara báo giá
    this.themGaraBaoGia = function (obj) {
        return _service.postData("/carclaim/carinvestigation/themGaraBaoGia", obj);
    }
    // Xóa gara báo giá
    this.xoaGaraBaoGia = function (obj) {
        return _service.postData("/carclaim/carinvestigation/xoaGaraBaoGia", obj);
    }
    // Chọn phương án
    this.chonPhuongAn = function (obj) {
        return _service.postData("/carclaim/carinvestigation/chonPhuongAn", obj);
    }
    // Lấy tất cả gara báo giá
    this.layGaraBaoGia = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layGaraBaoGia", obj);
    }
    // Lấy gara báo giá chi tiết
    this.layGaraBaoGiaCT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/layGaraBaoGiaCT", obj);
    }
    // Sửa gara báo giá chi tiết
    this.suaGaraBaoGiaCT = function (obj) {
        return _service.postData("/carclaim/carinvestigation/suaGaraBaoGiaCT", obj);
    }
    // Kết thúc báo giá
    this.ketThucBaoGia = function (obj) {
        return _service.postData("/carclaim/carinvestigation/ketThucBaoGia", obj);
    };
    // Hủy kết thúc báo giá
    this.huyKetThucBaoGia = function (obj) {
        return _service.postData("/carclaim/carinvestigation/huyKetThucBaoGia", obj);
    };
    // Lấy danh sách gara báo giá
    this.timKiemGaraBaoGia = function (obj) {
        return _service.getFile("/contact/timKiemGaraBaoGia", obj);
    }
    // Lấy danh sách loại hình nghiệp vụ theo đối tượng
    this.layDSLHNV = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/layDSLHNV", obj);
    }
    // Lấy thông tin đánh giá theo loại hình nghiệp vụ
    this.layDgiaLHNV = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/layDgiaLHNV", obj);
    }
}