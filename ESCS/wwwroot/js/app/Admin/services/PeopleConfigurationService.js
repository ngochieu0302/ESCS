function PeopleConfigurationService() {

    var _service = new Service();
    // Lấy danh sách ngày
    this.GetDsNgay = function (obj) {
        return _service.postData("/admin/peopleconfiguration/getdsngay", obj);
    };
    this.xemCauHinhBoiThuongConNguoi = function (obj) {
        return _service.postData("/admin/peopleconfiguration/xemCauHinhBoiThuongConNguoi", obj);
    }
    // Nhập thông tin cấu hình bồi thường người
    this.luuThongTinCauHinhBoiThuongConNguoi = function (obj) {
        return _service.postData("/admin/peopleconfiguration/luuCauHinhBoiThuongConNguoi", obj);
    };
    // Xóa cấu hình cấu hình bồi thường người
    this.xoaCauHinhBoiThuongConNguoi = function (obj) {
        return _service.postData("/admin/peopleconfiguration/xoaCauHinhBoiThuongConNguoi", obj);
    };
    // Lấy danh sách ngày áp dụng cấu hình duyệt tự động
    this.layDsNgayADDuyetBoiThuongTuDong = function (obj) {
        return _service.postData("/admin/peopleconfiguration/layDsNgayADDuyetBoiThuongTuDong", obj);
    };
    // Lấy chi tiết cấu hình duyệt tự động
    this.layChiTietCHDuyetBoiThuongTuDong = function (obj) {
        return _service.postData("/admin/peopleconfiguration/layChiTietCHDuyetBoiThuongTuDong", obj);
    };
    // Lấy chi tiết cấu hình duyệt tự động
    this.luuCHDuyetBoiThuongTuDongNgayAD = function (obj) {
        return _service.postData("/admin/peopleconfiguration/luuCHDuyetBoiThuongTuDongNgayAD", obj);
    };
    // Lấy danh mục quyền lợi
    this.layDanhMucQuyenLoi = function (obj) {
        return _service.postData("/admin/peopleconfiguration/layDanhMucQuyenLoi", obj);
    };
    //Lưu cấu hình duyệt bồi thường danh mục
    this.luuCHDuyetBoiThuongDanhMuc = function (obj) {
        return _service.postData("/admin/peopleconfiguration/luuCHDuyetBoiThuongDanhMuc", obj);
    }
    //------------Cấu hình SLA-----------------
    //Nhập thông tin cấu hình SLA
    this.luuThongTinCauHinhSLA = function (obj) {
        return _service.postData("/admin/peopleconfiguration/luuThongTinCauHinhSLA", obj);
    }
    //Liệt kê thông tin cấu hình SLA
    this.lietKeThongTinCauHinhSLA = function (obj) {
        return _service.postData("/admin/peopleconfiguration/lietKeThongTinCauHinhSLA", obj);
    }
}