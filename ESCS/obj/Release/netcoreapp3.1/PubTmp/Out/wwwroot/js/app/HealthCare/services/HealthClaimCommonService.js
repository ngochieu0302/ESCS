function HealthClaimCommonService() {
    var _service = new Service();
    this.layDanhSachCoSoYTe = function () {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDSCoSoYTe");
    };
    this.layDsBenhVien = function () {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDsBenhVien");
    };
    this.layDsNhaThuoc = function () {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDsNhaThuoc");
    };
    this.layDanhSachQuyenLoiGoc = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDsQlGoc", obj);
    };
    this.layDanhMucChung = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDMChung", obj);
    };
    this.layQuaTrinhXuLy = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/quaTrinhXuLy", obj);
    };
    this.layLichSuTonThat = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/lichSuTonThat", obj);
    };
    this.layDsQloiGoc = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/layDsQloiGoc", obj);
    }
    this.luuBsHoSoGiayToBoSung = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/SaveDocumentBs", obj);
    }
    // Lấy danh sách hồ sơ giấy tờ
    this.layHoSoGiayTo = function (obj) {
        return _service.postData("/HealthClaim/HealthClaimCommon/GetDocument", obj);
    }
    this.layChungTu = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layChungTu", obj);
    };
    // Lấy thông tin tiền hóa đơn chứng từ
    this.layThongTinHThuHuong = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/layThongTinHThuHuong", obj);
    }
    this.nhapChungTu = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/nhapChungTu", obj);
    };
    this.xoaChungTu = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/xoaChungTu", obj);
    };
    this.nhapThuHuong = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/nhapThuHuong", obj);
    };
    this.xoaThuHuong = function (obj) {
        return _service.postData("/healthclaim/HealthGuarantee/xoaThuHuong", obj);
    };
    this.layDSChiPhi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layDSChiPhi", obj);
    };
    //Lưu thông tin chi phí
    this.luuThongTinChiPhi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/luuThongTinChiPhi", obj);
    };
    this.layHoSoQuyenLoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layHoSoQuyenLoi", obj);
    };
    // Lấy ảnh thumnail
    this.layDanhSachFile = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/getfilesthumnail", obj);
    }
    // Lấy ảnh file chi tiết
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/getfiles", obj);
    }
    // Download zip file ảnh/tài liệu
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/downloadzipfile", obj);
    }
    // Lưu thông tin hạng mục tài liệu
    this.luuThongTinHangMucTaiLieu = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/luuThongTinHangMucTaiLieu", obj);
    }
    // Lưu thông tin danh mục bệnh viện nhà thuốc
    this.luuThongTinDanhMucBVNT = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/luuThongTinDanhMucBVNT", obj);
    }
    // Lưu tạo lần nhận xét
    this.taoNhanXet = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/taonhanxet", obj);
    };
    // Lấy danh sách nội dung nhận xét
    this.layDanhSachNoiDung = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layDanhSachNoiDung", obj);
    };
    // Phân trang danh sách nội dung
    this.lietKePhanTrangNoiDung = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/lietKePhanTrangNoiDung", obj);
    };
    // Xóa thông tin nội dung
    this.xoaThongTinNoiDung = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xoaThongTinNoiDung", obj);
    };
    //Lấy danh sách files
    this.layDanhSachAnh = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/GetListFiles", obj);
    };
    //Thêm cán bộ
    this.themCanBoTraoDoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/themCanBoTraoDoi", obj);
    };
    //Xóa cán bộ
    this.xoaCanBoTraoDoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xoaCanBoTraoDoi", obj);
    };
    //Nhập nội dung trao đổi
    this.nhapNoiDungTraoDoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/nhapNoiDungTraoDoi", obj);
    };
    //Liệt kê nội dung trao đổi
    this.lietKeNoiDungTraoDoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/lietKeNoiDungTraoDoi", obj);
    };
    //Liệt kê danh sách cán bộ trao đổi
    this.lietKeDanhSachCanBoTraoDoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/lietKeDanhSachCanBoTraoDoi", obj);
    };
    //Lấy toàn bộ thông tin hồ sơ
    this.layToanBoThongTinHoSo = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layToanBoThongTinHoSo", obj);
    };
    // Kiểm tra trùng CSYT trong 1 ngày
    this.kiemTraTrungCSYT = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/kiemTraTrungCSYT", obj);
    };
    // Liệt kê danh sách cảnh báo
    this.danhSachCanhBao = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/danhSachCanhBao", obj);
    };
    // Lấy tình trạng thanh toán phí
    this.xemTinhTrangTTPhi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xemTinhTrangTTPhi", obj);
    }
    // Lấy chi tiết gcn
    this.getContract = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/GetContract", obj);
    }
    // Lấy danh sách hồ sơ quyền lợi đã sử dụng
    this.layHoSoQLoiDaDung = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/LayHoSoQLoiDaDung", obj);
    }
    // Xem thông tin quyền lợi bảo hiểm
    this.xemThongTinQuyenLoiBaoHiem = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xemThongTinQuyenLoiBaoHiem", obj);
    }

    // Tích hợp hệ thống
    this.tichHopConNguoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/tichHopConNguoi", obj);
    }
    // Xem thông tin chi tiết GCN
    this.layThongTinGCN = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layThongTinGCN", obj);
    }
    // Lưu ước tổn thất nghiệp vụ ở bước lấy số hồ sơ
    this.luuUocTonThat = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/luuUocTonThat", obj);
    }
    // Lấy số hồ sơ
    this.tichHopCN = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/tichHopCN", obj);
    }
    // Sửa thông tin người liên hệ
    this.suaThongTinNguoiLH = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/suaThongTinNguoiLH", obj);
    }
    // Sửa thông tin người liên hệ
    this.suaThongTinNguoiTB = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/suaThongTinNguoiTB", obj);
    }

    //Cập nhật trạng thái bổ sung hồ sơ gốc
    this.updateTrangThaiHsGoc = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/updateTrangThaiHsGoc", obj);
    }
    // Đọc dữ liệu OCR
    this.docOCR = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/docOCR", obj);
    }
    this.layThongTinDuLieuOCR = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layThongTinDuLieuOCR", obj);
    }
    //Trao đổi bệnh viện
    this.nhapNoiDungTraoDoiBV = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/nhapNoiDungTraoDoiBV", obj);
    }
    this.lietKeNoiDungTraoDoiBV = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/lietKeNoiDungTraoDoiBV", obj);
    }
    // Lưu tạo lần ghi chú
    this.themGhiChu = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/themGhiChu", obj);
    };
    // Xem danh sách ghi chú
    this.lietKePhanTrangGhiChu = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/lietKePhanTrangGhiChu", obj);
    };
    // Xem danh sách ghi chú
    this.layDanhSachGhiChu = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layDanhSachGhiChu", obj);
    };
    // Xóa thông tin ghi chú
    this.xoaThongTinGhiChu = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xoaThongTinGhiChu", obj);
    };
    // Lấy danh sách giấy tờ ocr
    this.layDanhSachGiayToOCR = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layDanhSachGiayToOCR", obj);
    };
    //Cập nhật thông tin OCR con người
    this.capNhatThongTinOCRConNguoi = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/capNhatThongTinOCRConNguoi", obj);
    };
    //So sánh thông tin OCR hóa đơn
    this.soSanhDuLieuOCRHoaDon = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/soSanhDuLieuOCRHoaDon", obj);
    };
    //Lấy danh sách dịch vụ sức khỏe
    this.layDanhSachDichVuChiTiet = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/layDanhSachDichVuChiTiet", obj);
    };
    //Cập nhật thông tin OCR hóa đơn
    this.capNhatThongTinOCRHoaDon = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/capNhatThongTinOCRHoaDon", obj);
    };
    //Xem thông tin SLA con người
    this.xemThongTinSLA = function (obj) {
        return _service.postData("/healthclaim/HealthClaimCommon/xemThongTinSLA", obj);
    };
}
