function MotorcycleContractService() {

    var _service = new Service();

    // Tìm kiếm + phân trang xe cơ giới
    this.timKiemPTrang = function (obj) {
        return _service.postData("/contract/motorcyclecontract/getpaging", obj);
    };

    // Lưu thông tin khách hàng
    this.saveThongTinKH = function (obj) {
        return _service.postData("/contract/motorcyclecontract/save", obj);
    }

    // Tìm kiếm khách hàng
    this.timkiemKhachhang = function (objTimKiem) {
        return _service.postData("/contract/motorcyclecontract/timkiemkhachhang", objTimKiem);
    };

    // lấy chi tiết khách hàng
    this.get_detail_kh = function (data) {
        return _service.postData("/contract/motorcyclecontract/kh_detail", data);
    };

    // Lưu thông tin khách hàng
    this.kh_nhap = function (obj) {
        return _service.postData("/contract/motorcyclecontract/kh_nh", obj);
    };

    // lưu hợp đồng
    this.hd_nhap = function (obj) {
        return _service.postData("/contract/motorcyclecontract/hd_nh", obj);
    };

    // Liệt kê danh hồ sơ khách hàng
    this.layChiTietHopDong = function (obj) {
        return _service.postData("/contract/motorcyclecontract/layChiTietHopDong", obj); 
    }

    // Liệt kê chi tiết HĐ xe
    this.get_detail = function (data) {
        return _service.postData("/contract/motorcyclecontract/Xe_detail", data);
    };

    // Liệt kê đồng tái
    this.layDsHdXe_dong_tai = function (obj) {
        return _service.postData("/contract/motorcyclecontract/getpagingxe_dong_tai", obj);
    }

    // Lưu danh sách xe
    this.luuThongTinGCN = function (obj) {
        return _service.postData("/contract/motorcyclecontract/luuthongtingcn", obj);
    };
    // Lưu thông tin điều khoản bổ sung
    this.luuThongTinDKBS = function (obj) {
        return _service.postData("/contract/motorcyclecontract/luuthongtinDKBS", obj);
    }

    // Lưu đồng tái
    this.dongtai_nhap = function (obj) {
        return _service.postData("/contract/motorcyclecontract/xe_dongtai_nh", obj);
    };

    // lấy danh sách file
    this.layDanhSachFile = function (obj) {
        return _service.postData("/motorcycleclaim/motorcycleinvestigation/getfilesthumnail", obj);
    };

    // Lấy chi tiết ảnh
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/motorcycleclaim/motorcycleinvestigation/getfiles", obj);
    }

    // Tải file ảnh zip
    this.taiFileAnhTonThatZip = function (obj) {
        return _service.postData("/motorcycleclaim/motorcycleinvestigation/downloadzipfile", obj);
    }

    // Xóa ảnh hồ sơ giám định
    this.xoaAnhHoSoGiamDinh = function (obj) {
        return _service.postData("/motorcycleclaim/motorcycleinvestigation/deleteimagedamage", obj);
    }
    //Lấy danh sách nhà bảo hiểm
    this.getListNhaBH = function (obj) {
        return _service.postData("/contract/motorcyclecontract/getListNhaBH", obj);
    };
    // Liệt kê danh sách gói bảo hiểm
    this.LayQuyenLoiGoiBH = function (obj) {
        return _service.postData("/contract/motorcyclecontract/LayQuyenLoiGoiBH", obj);
    }
    //Lưu thông tin đồng tái
    this.LuuThongTinDongTai = function (obj) {
        return _service.postData("/contract/motorcyclecontract/LuuThongTinDongTai", obj);
    };
    //Lấy danh sách đồng tái
    this.getListDongtai = function (obj) {
        return _service.postData("/contract/motorcyclecontract/getListDongtai", obj);
    };
    //lấy chi tiết đồng tái
    this.getDetailDongTai = function (obj) {
        return _service.postData("/contract/motorcyclecontract/getDetailDongTai", obj);
    };
    //xóa đồng tái
    this.XoaDongTai = function (obj) {
        return _service.postData("/contract/motorcyclecontract/XoaDongTai", obj);
    };
    //Lưu thông tin import excel xe
    this.SaveDataExcel = function (obj) {
        return _service.postData("/contract/motorcyclecontract/SaveDataExcel", obj);
    };
    //Lưu phân loại hạng mục
    this.phanLoaiHangMuc = function (obj) {
        return _service.postData("/contract/motorcyclecontract/phanLoaiHangMuc", obj);
    };
}