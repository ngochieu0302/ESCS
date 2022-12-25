function HealthService() {

    var _service = new Service();

    // load trang
    this.pageload = function () {
        return _service.postData("/contract/HealthCare/pageload");
    };

    // Tìm kiếm + phân trang xe cơ giới
    this.timKiemPTrang = function (obj) {
        return _service.postData("/contract/HealthCare/getpaging", obj);
    };

    // Lưu thông tin khách hàng
    this.saveThongTinKH = function (obj) {
        return _service.postData("/contract/HealthCare/save", obj);
    }

    // Tìm kiếm khách hàng
    this.timkiemKhachhang = function (objTimKiem) {
        return _service.postData("/contract/HealthCare/timkiemkhachhang", objTimKiem);
    };

    // lấy chi tiết khách hàng
    this.get_detail_kh = function (data) {
        return _service.postData("/contract/car/kh_detail", data);
    };

    // 
    this.luuThongTinGCN = function (obj) {
        return _service.postData("/contract/healthCare/luuThongTinGCN", obj);
    };

    // lưu hợp đồng
    this.hd_nhap = function (obj) {
        return _service.postData("/contract/healthCare/hd_nh", obj);
    };

    // Liệt kê danh hồ sơ khách hàng
    this.layChiTietHopDong = function (obj) {
        return _service.postData("/contract/HealthCare/layChiTietHopDong", obj);
    }

    // Liệt kê danh sách sản phẩm
    this.getListLHNV = function (obj) {
        return _service.postData("/contract/HealthCare/getListLHNV", obj);
    }

    // Liệt kê danh sách gói bảo hiểm
    this.getDsGoiBH = function (obj) {
        return _service.postData("/contract/HealthCare/getDsGoiBH", obj);
    }
    // Liệt kê danh sách gói bảo hiểm
    this.LayQuyenLoiGoiBH = function (obj) {
        return _service.postData("/contract/HealthCare/LayQuyenLoiGoiBH", obj);
    }
    // Lấy điều khoản bổ sung của gcn
    this.LayDKBSGCN = function (obj) {
        return _service.postData("/contract/HealthCare/LayDKBSGCN", obj);
    }
    //Lưu thông tin Email CC
    this.saveEmail_CC = function (obj) {
        return _service.postData("/contract/HealthCare/SaveEmail_CC", obj);
    };
    //Xem thông tin chi tiết Email CC
    this.xemThongTinEmail = function (obj) {
        return _service.postData("/contract/HealthCare/GetDetailEmail_CC", obj);
    };
    // lấy danh sách file
    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    };
    //Xóa thông tin chi tiết Email CC
    this.deleleEmailCC = function (obj) {
        return _service.postData("/contract/HealthCare/DeleteEmailCC", obj);
    };
    //Lấy danh sách nhà bảo hiểm
    this.getListNhaBH = function (obj) {
        return _service.postData("/contract/HealthCare/getListNhaBH", obj);
    };
    //Lấy danh sách đồng tái
    this.getListDongtai = function (obj) {
        return _service.postData("/contract/HealthCare/getListDongtai", obj);
    };
    //Lưu thông tin đồng tái
    this.LuuThongTinDongTai = function (obj) {
        return _service.postData("/contract/HealthCare/LuuThongTinDongTai", obj);
    };
    //lấy chi tiết đồng tái
    this.getDetailDongTai = function (obj) {
        return _service.postData("/contract/HealthCare/getDetailDongTai", obj);
    };
    //xóa đồng tái
    this.XoaDongTai = function (obj) {
        return _service.postData("/contract/HealthCare/XoaDongTai", obj);
    };
    // Xóa ảnh
    this.xoaAnh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deleteimagedamage", obj);
    };
    // Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/contract/HealthCare/SaveDataExcel", obj);
    };
    // Lưu thông tin tổng phí TPA
    this.tongPhiTpaNhap = function (obj) {
        return _service.postData("/contract/HealthCare/TongPhiTpaNhap", obj);
    };
    // Lấy danh sách tổng phí TPA
    this.GetTongPhiTpa = function (obj) {
        return _service.postData("/contract/HealthCare/GetTongPhiTpa", obj);
    };
    // Xóa phí phát sinh TPA
    this.xoaTongPhiTpa = function (obj) {
        return _service.postData("/contract/HealthCare/xoaTongPhiTpa", obj);
    };
    // Lấy danh sách đối tượng mapping từ excel
    this.GetLisMappingDoiTuong = function (obj) {
        return _service.postData("/contract/HealthCare/GetLisMappingDoiTuong", obj);
    };
    // Lưu danh sách đối tượng cần kết thúc thời  hạn hợp đồng
    this.UpdateMappingDoiTuong = function (obj) {
        return _service.postData("/contract/HealthCare/UpdateMappingDoiTuong", obj);
    };
    //Lưu phân loại hạng mục
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/contract/carContract/phanLoaiHangMuc", obj);
    };
    //Lưu sửa GCN
    this.luuSuaGCN = function (obj) {
        return _service.postData("/contract/HealthCare/luuSuaGCN", obj);
    };
    //Lưu sửa GCN
    this.huyDuyetHD = function (obj) {
        return _service.postData("/contract/HealthCare/huyDuyetHD", obj);
    };
    //Liệt kê kỳ thanh toán
    this.getPagingKyThanhToan = function (obj) {
        return _service.postData("/contract/HealthCare/getPagingKyThanhToan", obj);
    };
    //Liệt kê chi tiết kỳ thanh toán
    this.getDetailKyThanhToan = function (obj) {
        return _service.postData("/contract/HealthCare/getDetailKyThanhToan", obj);
    };
    //Nhập thông tin kỳ thanh toán
    this.nhapThongTinKyThanhToan = function (obj) {
        return _service.postData("/contract/HealthCare/nhapThongTinKyThanhToan", obj);
    };
    //Xóa thông tin kỳ thanh toán
    this.xoaThongTinKyThanhToan = function (obj) {
        return _service.postData("/contract/HealthCare/xoaThongTinKyThanhToan", obj);
    };
    //Lấy danh sách NDBH
    this.layDanhSachNDBH = function (obj) {
        return _service.postData("/contract/HealthCare/layDanhSachNDBH", obj);
    };
}