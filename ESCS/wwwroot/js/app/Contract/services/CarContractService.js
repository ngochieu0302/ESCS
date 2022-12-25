function CarContractService() {

    var _service = new Service();

    // load trang
    this.pageload = function () {
        return _service.postData("/contract/car/pageload");
    };

    // Tìm kiếm + phân trang xe cơ giới
    this.timKiemPTrang = function (obj) {
        return _service.postData("/contract/carcontract/getpaging", obj);
    };

    // Lưu thông tin khách hàng
    this.saveThongTinKH = function (obj) {
        return _service.postData("/contract/carcontract/save", obj);
    }

    // Tìm kiếm khách hàng
    this.timkiemKhachhang = function (objTimKiem) {
        return _service.postData("/contract/carcontract/timkiemkhachhang", objTimKiem);
    };

    // lấy chi tiết khách hàng
    this.get_detail_kh = function (data) {
        return _service.postData("/contract/carContract/kh_detail", data);
    };

    // Lưu thông tin khách hàng
    this.kh_nhap = function (obj) {
        return _service.postData("/contract/carContract/kh_nh", obj);
    };

    // lưu hợp đồng
    this.hd_nhap = function (obj) {
        return _service.postData("/contract/carContract/hd_nh", obj);
    };

    // Liệt kê danh hồ sơ khách hàng
    this.layChiTietHopDong = function (obj) {
        return _service.postData("/contract/carContract/layChiTietHopDong", obj); 
    }

    // Liệt kê chi tiết HĐ xe
    this.get_detail = function (data) {
        return _service.postData("/contract/carContract/Xe_detail", data);
    };

    // Liệt kê đồng tái
    this.layDsHdXe_dong_tai = function (obj) {
        return _service.postData("/contract/carcontract/getpagingxe_dong_tai", obj);
    }

    // Lưu danh sách xe
    this.luuThongTinGCN = function (obj) {
        return _service.postData("/contract/carcontract/luuthongtingcn", obj);
    };
    // Lưu thông tin điều khoản bổ sung
    this.luuThongTinDKBS = function (obj) {
        return _service.postData("/contract/carcontract/luuthongtinDKBS", obj);
    }

    // Lưu đồng tái
    this.dongtai_nhap = function (obj) {
        return _service.postData("/contract/carContract/xe_dongtai_nh", obj);
    };

    // lấy danh sách file
    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    };

    // Lấy chi tiết ảnh
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfiles", obj);
    }

    // Tải file ảnh zip
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/carclaim/carinvestigation/downloadzipfile", obj);
    }

    // Xóa ảnh hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/carclaim/carinvestigation/deleteimagedamage", obj);
    }
    //Lấy danh sách nhà bảo hiểm
    this.getListNhaBH = function (obj) {
        return _service.postData("/contract/carContract/getListNhaBH", obj);
    };
    // Liệt kê danh sách gói bảo hiểm
    this.LayQuyenLoiGoiBH = function (obj) {
        return _service.postData("/contract/carContract/LayQuyenLoiGoiBH", obj);
    }
    //Lưu thông tin đồng tái
    this.LuuThongTinDongTai = function (obj) {
        return _service.postData("/contract/carContract/LuuThongTinDongTai", obj);
    };
    //Lấy danh sách đồng tái
    this.getListDongtai = function (obj) {
        return _service.postData("/contract/carContract/getListDongtai", obj);
    };
    //lấy chi tiết đồng tái
    this.getDetailDongTai = function (obj) {
        return _service.postData("/contract/carContract/getDetailDongTai", obj);
    };
    //xóa đồng tái
    this.XoaDongTai = function (obj) {
        return _service.postData("/contract/carContract/XoaDongTai", obj);
    };
    //Lưu thông tin import excel xe
    this.SaveDataExcel = function (obj) {
        return _service.postData("/contract/carContract/SaveDataExcel", obj);
    };
    //Lưu phân loại hạng mục
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/contract/carContract/phanLoaiHangMuc", obj);
    };
    //Liệt kê kỳ thanh toán
    this.getPagingKyThanhToan = function (obj) {
        return _service.postData("/contract/carContract/getPagingKyThanhToan", obj);
    };
    //Liệt kê chi tiết kỳ thanh toán
    this.getDetailKyThanhToan = function (obj) {
        return _service.postData("/contract/carContract/getDetailKyThanhToan", obj);
    };
    //Nhập thông tin kỳ thanh toán
    this.nhapThongTinKyThanhToan = function (obj) {
        return _service.postData("/contract/carContract/nhapThongTinKyThanhToan", obj);
    };
    //Xóa thông tin kỳ thanh toán
    this.xoaThongTinKyThanhToan = function (obj) {
        return _service.postData("/contract/carContract/xoaThongTinKyThanhToan", obj);
    };
    // Lấy danh sách video của gcn
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
    // Sửa tên video
    this.suaTenVideo = function (obj) {
        return _service.postData("/carclaim/carclaimcommon/suaTenVideo", obj);
    };
    // Lấy thông tin đánh giá hạng mục AI
    this.layThongTinDanhGiaHangMucAI = function (obj) {
        return _service.postData("/contract/carContract/layThongTinDanhGiaHangMucAI", obj);
    };
    // Lưu đánh giá hạng mục AI
    this.luuDanhGiaHangMucAI = function (obj) {
        return _service.postData("/contract/carContract/luuDanhGiaHangMucAI", obj);
    };
    // Lưu đánh giá tình trạng sơ bộ
    this.luuDanhGiaHangMucSoBo = function (obj) {
        return _service.postData("/contract/carContract/luuDanhGiaHangMucSoBo", obj);
    };
    // Xác nhận lần đánh giá rủi ro
    this.xacNhanLanDGRR = function (obj) {
        return _service.postData("/contract/carContract/xacNhanLanDGRR", obj);
    };
}