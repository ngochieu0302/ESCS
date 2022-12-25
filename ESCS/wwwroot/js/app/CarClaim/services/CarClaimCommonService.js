function CarClaimCommonService() {
    var _service = new Service();
    this.layDanhSachHoSoGiayTo = function () {
        return _service.postData("/CarClaim/CarClaimCommon/layDanhMucHoSoGiayTo");
    };
    // Yêu cầu bổ sung hồ sơ
    this.luuHoSoGiayTo = function (obj) {
        return _service.postData("/CarClaim/CarClaimCommon/luuHoSoGiayTo", obj);
    }
    // Xóa yêu cầu bổ sung hồ sơ
    this.xoaHoSoGiayTo = function (obj) {
        return _service.postData("/CarClaim/CarClaimCommon/xoaHoSoGiayTo", obj);
    }
    // Lưu thông tin hồ sơ giấy tờ
    this.luuBsHoSoGiayTo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/saveadditionaldocument", obj);
    }
    // Lưu thông tin hồ sơ giấy tờ bổ sung
    this.luuBsHoSoGiayToBoSung = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/SaveDocumentBs", obj);
    }
    // Lấy danh sách hồ sơ giấy tờ
    this.layHoSoGiayTo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/getdocument", obj);
    }
    // Xóa hồ sơ giấy tờ
    this.xoaHoSoGiayTo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/deletedocument", obj);
    }
    // Lấy điều khoản bổ sung xe
    this.layDKBSXe = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layDKBSXe", obj);
    }
    // Lấy thông tin tiến trình bồi thường xe 
    this.layThongTinTienTrinh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layThongTinTienTrinh", obj);
    }
    // Đọc dữ liệu OCR
    this.docOCR = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/docOCR", obj);
    }
    // Đọc dữ liệu OCR
    this.docOCRBaoGia = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/DocOCRBaoGia", obj);
    }
    // Nhận diện AI
    this.nhanDienAI = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/nhanDienAI", obj);
    }
    // Lấy lịch sử xin ý kiến
    this.LayLichSuXinYKien = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/LayLichSuXinYKien", obj);
    }
    // Lưu nhóm xin ý kiến
    this.NhomXinYKienNh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/NhomXinYKienNh", obj);
    }
    // Lưu xin ý kiến
    this.XinYKienNh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/XinYKienNh", obj);
    }
    // Hủy xin ý kiến
    this.XinYKienX = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/XinYKienX", obj);
    }
    //  Ý kiến liệt kê chi tiết
    this.YKienCT = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/YKienCT", obj);
    }
    //  Lưu cho ý kiến
    this.ChoYKienNh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/ChoYKienNh", obj);
    }
    //  Lấy danh sách nsd ý kiến theo chi nhánh
    this.layNsdYKienTheoChiNhanh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layNsdYKienTheoChiNhanh", obj);
    }
    this.layDsDonViXinYKien = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layTrinhXinYKien", obj);
    }
    // Liệt kê thông tin đơn vị
    this.lietKeThongTinDonVi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKeThongTinDonVi", obj);
    };
    // Liệt kê + phân trang thông tin chi phí khác
    this.getPagingChiPhiKhac = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/getPagingChiPhiKhac", obj);
    };
    // Liệt kê chi tiết thông tin chi phí khác
    this.getDetailChiPhiKhac = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/getDetailChiPhiKhac", obj);
    };
    // Lưu thông tin chi phí khác
    this.luuThongTinChiPhiKhac = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/luuThongTinChiPhiKhac", obj);
    };
    // Xóa thông tin chi phí khác
    this.xoaThongTinChiPhiKhac = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xoaThongTinChiPhiKhac", obj);
    };
    // Lưu ước tổn thất
    this.luuUocTonThat = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/luuUocTonThat", obj);
    };
    // Lấy ước tổn thất
    this.layUocTonThat = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layUocTonThat", obj);
    };
    // Lưu tạo lần nhận xét
    this.taoNhanXet = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/taonhanxet", obj);
    };
    // Lấy danh sách nội dung nhận xét
    this.layDanhSachNoiDung = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layDanhSachNoiDung", obj);
    };
    // Phân trang danh sách nội dung
    this.lietKePhanTrangNoiDung = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKePhanTrangNoiDung", obj);
    };
    // Xóa thông tin nội dung
    this.xoaThongTinNoiDung = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xoaThongTinNoiDung", obj);
    };
    // Liệt kê danh sách cảnh báo
    this.danhSachCanhBao = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/danhSachCanhBao", obj);
    };
    // Sửa thông tin GCN
    this.suaGCN = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/suaGCN", obj);
    };
    // Sửa thông tin GCN CTCT
    this.suaGCNCTCT = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/suaGCNCTCT", obj);
    };
    //Lấy thông tin giấy chứng nhận từ phía đối tác
    this.layThongTinGCN = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layThongTinGCN", obj);
    };
    //Lấy thông tin kỳ hạn thanh toán phí
    this.xemTinhTrangTTPhi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemTinhTrangTTPhi", obj);
    };
    //Lấy thông tin trình duyệt hồ sơ
    this.layThongTinDuyetHoSo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layThongTinDuyetHoSo", obj);
    };
    //Xem toàn bộ thông tin hồ sơ bồi thường
    this.xemToanBoThongTinHoSoBoiThuong = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemToanBoThongTinHoSoBoiThuong", obj);
    };
    //Xem toàn bộ thông tin hồ sơ bồi thường
    this.xemThongTinHoSoBoiThuong = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemThongTinHoSoBoiThuong", obj);
    };
    //Liệt kê thông tin SLA
    this.xemThongTinSLA = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemThongTinSLA", obj);
    };
    //Lấy danh sách files
    this.layDanhSachAnh = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/GetListFiles", obj);
    };
    //Thêm cán bộ
    this.themCanBoTraoDoi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/themCanBoTraoDoi", obj);
    };
    //Xóa cán bộ
    this.xoaCanBoTraoDoi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xoaCanBoTraoDoi", obj);
    };
    //Nhập nội dung trao đổi
    this.nhapNoiDungTraoDoi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/nhapNoiDungTraoDoi", obj);
    };
    //Liệt kê nội dung trao đổi
    this.lietKeNoiDungTraoDoi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKeNoiDungTraoDoi", obj);
    };
    //Liệt kê danh sách cán bộ trao đổi
    this.lietKeDanhSachCanBoTraoDoi = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKeDanhSachCanBoTraoDoi", obj);
    }
    //Liệt kê danh sách cán bộ trao đổi
    this.lietKeThongTinOCR = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKeThongTinOCR", obj);
    };
    //Chi phí khác của hồ sơ
    this.chiPhiKhacHS = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/chiPhiKhacHS", obj);
    };
    //Lưu thông tin tính toán chi phí khác
    this.luuTinhToanCPKhac = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/luuTinhToanCPKhac", obj);
    };
    this.layThongTinOCR = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layThongTinOCR", obj);
    }
    this.lietKeDanhSachGiayToOCR = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/lietKeDanhSachGiayToOCR", obj);
    }
    this.soSanhThongTinOCRHoaDon = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/soSanhThongTinOCRHoaDon", obj);
    }
    // Xem giá gợi ý
    this.xemGiaGoiY = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemGiaGoiY", obj);
    };
    // Cập nhật thông tin hóa đơn OCR
    this.capNhatThongTinHoaDon = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/capNhatThongTinHoaDon", obj);
    };
    // Lấy danh sách video của hồ sơ
    this.getListVideo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/getListVideo", obj);
    };
    // Lấy link video
    this.xemVideoHs = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/xemVideoHs", obj);
    };
    // Upload video
    this.uploadVideo = function (obj) {
        return _service.postFormData("/carclaim/carclaimcommon/uploadVideo", obj);
    };
    // Sửa tên video
    this.suaTenVideo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/suaTenVideo", obj);
    };
    // Lấy danh sách hạng mục DGRR theo hồ sơ bồi thường
    this.layHangMucDGRR = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layHangMucDGRR", obj);
    };
    // Lấy danh sách ảnh thumnail ảnh DGRR và ảnh tổn thất
    this.layAnhThumnailDGRRTonThat = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layAnhThumnailDGRRTonThat", obj);
    };
    // Lấy ảnh chi tiết theo bt ảnh
    this.layFileTheoBT = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/layFileTheoBT", obj);
    };
}