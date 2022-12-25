function HealthCareGuaranteeService() {
    var _service = new Service();
    this.base = new Service();
    // Tìm kiếm  + phân trang hồ sơ bồi thường
    this.paging = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/GetPaging", obj);
    };
    this.timNDBH = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/searchNDBH", obj);
    };
    this.nhapThongTinNDBH = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/insertNDBH", obj);
    };
    this.khachHangVIP = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/updateKHVIP", obj);
    };
    this.chuyenNguoiXuLy = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/chuyenNguoiXuLy", obj);
    }
    this.layThongTinChiTietHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/detailNDBH", obj);
    };
    this.themLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/insertLanBaoLanh", obj);
    };
    this.suaLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/editLanBaoLanh", obj);
    };
    this.duyetLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/duyetLanBaoLanh", obj);
    };
    this.huyDuyetLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/huyDuyetLanBaoLanh", obj);
    };
    this.xoaQuyenLoi = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/xoaQuyenLoi", obj);
    };
    this.suaQuyenLoi = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/editQuyenLoi", obj);
    };
   
    this.layChungTu = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layChungTu", obj);
    };
    this.layLSTT = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layLSTT", obj);
    };
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
    this.copyLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/copyLanBaoLanh", obj);
    };
    this.chuyenThanhToan = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/chuyenThanhToan", obj);
    };
    this.goChuyenThanhToan = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/goChuyenThanhToan", obj);
    };
    // Lấy danh sách file thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/getfilesthumnail", obj);
    }
    // Xóa ảnh trong hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/deleteimagedamage", obj);
    }
    // Xem chi tiết quyền lợi
    this.layCTQuyenLoi = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/getCTQuyenLoi", obj);
    }
    // Chuyển bồi thường
    this.chuyenBoiThuong = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/chuyenBoiThuong", obj);
    }
    // phân loại hạng mục tổn thất
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/phanLoaiHangMuc", obj);
    }
    
    // Thay đổi đối tượng BH
    this.thayDoiDTBH = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/thayDoiDTBH", obj);
    }
    // Thay đổi cơ sở y tế
    this.thayDoiCSYT = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/thayDoiCSYT", obj);
    }
    // Hủy hồ sơ
    this.huyHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/huyHoSo", obj);
    }
    // Gỡ hủy hồ sơ
    this.goHuyHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/goHuyHoSo", obj);
    }
    // Từ chối bảo lãnh
    this.tuChoiBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/tuChoiBaoLanh", obj);
    }
    // Gỡ từ chối bảo lãnh
    this.goTuChoiBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/goTuChoiBaoLanh", obj);
    }
    // Lưu chi phí chi tiết
    this.LuuChiPhiChiTiet = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/LuuChiPhiChiTiet", obj);
    }
    // Lưu liên hệ csyt
    this.luuLienHeCSYT = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/luuLienHeCSYT", obj);
    }
    // Lấy thông tin liên hệ cơ sở y tế
    this.layTTLienHeCSYT = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layTTLienHeCSYT", obj);
    }
    // Xóa thông tin lần bảo lãnh
    this.xoaLanBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/xoaLanBaoLanh", obj);
    }
    // Copy hồ sơ bảo lãnh
    this.copyHoSoBaoLanh = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/copyHoSoBaoLanh", obj);
    }
    // Lấy danh sách lhnv đối tượng hợp đồng đã tham gia
    this.layDsLHNVUoc = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layDsLHNVUoc", obj);
    }
    //Lưu thông tin import excel
    this.ImportLienHeCSYT = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/ImportLienHeCSYT", obj);
    }
    // Xem quyền lợi từ hệ thống MIC
    this.getListQuyenLoiMIC = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/getListQuyenLoiMIC", obj);
    }
    // Nhận hồ sơ
    this.NhanHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/NhanHoSo", obj);
    }
    // Lấy lịch sử yêu cầu bổ sung HSGT
    this.layLichSuYeuCauBSHS = function (obj) {
        return _service.postData("/healthclaim/HealthCompensation/layLichSuYeuCauBSHS", obj);
    }
}