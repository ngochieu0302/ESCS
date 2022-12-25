function OtherContractService() {
    var _service = new Service();
    // Tìm kiếm phân trang
    this.getpaging = function (obj) {
        return _service.postData("/contract/othercontract/getpaging", obj);
    };
    // Tìm kiếm khách hàng
    this.timkiemKhachhang = function (objTimKiem) {
        return _service.postData("/contract/othercontract/timkiemkhachhang", objTimKiem);
    };
    // lưu hợp đồng
    this.hd_nhap = function (obj) {
        return _service.postData("/contract/othercontract/hd_nh", obj);
    };
    // Lấy chi tiết hợp đồng
    this.layChiTietHopDong = function (obj) {
        return _service.postData("/contract/othercontract/layChiTietHopDong", obj);
    }
    //Lấy danh sách nhà bảo hiểm
    this.getListNhaBH = function (obj) {
        return _service.postData("/contract/othercontract/getListNhaBH", obj);
    };
    // Lấy danh sách loại hình nghiệp vụ
    this.getListLHNV = function (obj) {
        return _service.postData("/contract/othercontract/getListLHNV", obj);
    };
    //Lấy danh sách đồng tái
    this.getListDongtai = function (obj) {
        return _service.postData("/contract/othercontract/getListDongtai", obj);
    };
    //Lưu thông tin đồng tái
    this.LuuThongTinDongTai = function (obj) {
        return _service.postData("/contract/othercontract/LuuThongTinDongTai", obj);
    };
    //lấy chi tiết đồng tái
    this.getDetailDongTai = function (obj) {
        return _service.postData("/contract/othercontract/getDetailDongTai", obj);
    };
    //xóa đồng tái
    this.XoaDongTai = function (obj) {
        return _service.postData("/contract/othercontract/XoaDongTai", obj);
    };
    //Xem thông tin chi tiết Email CC
    this.xemThongTinEmail = function (obj) {
        return _service.postData("/contract/othercontract/GetDetailEmail_CC", obj);
    };
    // Lấy danh sách tổng phí TPA
    this.GetTongPhiTpa = function (obj) {
        return _service.postData("/contract/othercontract/GetTongPhiTpa", obj);
    };
    // Lưu thông tin tổng phí TPA
    this.tongPhiTpaNhap = function (obj) {
        return _service.postData("/contract/othercontract/TongPhiTpaNhap", obj);
    };
    // Lấy danh sách tổng phí TPA
    this.GetTongPhiTpa = function (obj) {
        return _service.postData("/contract/othercontract/GetTongPhiTpa", obj);
    };
    // Xóa phí phát sinh TPA
    this.xoaTongPhiTpa = function (obj) {
        return _service.postData("/contract/othercontract/xoaTongPhiTpa", obj);
    };
    // Lưu đối tượng bảo hiểm
    this.luuThongTinGCN = function (obj) {
        return _service.postData("/contract/othercontract/luuThongTinGCN", obj);
    };
    // lấy danh sách file
    this.layDanhSachFile = function (obj) {
        return _service.postData("/contract/othercontract/getfilesthumnail", obj);
    };
    // lấy danh sách hạng mục bồi thường khác
    this.layHangMucCache = function (obj) {
        return _service.postData("/contract/othercontract/layHangMucCache", obj);
    };
    //Lưu phân loại hạng mục
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/contract/othercontract/phanLoaiHangMuc", obj);
    };
    // Lấy chi tiết ảnh
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/contract/othercontract/getfiles", obj);
    }
    // Tải file ảnh zip
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/contract/othercontract/downloadzipfile", obj);
    }
    // Xóa ảnh
    this.xoaAnh = function (obj) {
        return _service.postData("/contract/othercontract/deleteimagedamage", obj);
    };
}