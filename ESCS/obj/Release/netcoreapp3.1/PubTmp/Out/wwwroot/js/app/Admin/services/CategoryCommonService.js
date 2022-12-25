function CategoryCommonService() {

    var _service = new Service();

    //Lấy tất cả danh sách bộ mã chung
    this.layDsDanhMucChung = function () {
        return _service.postData("/admin/categorycommon/getall", {});
    };

    //Lưu thông tin bộ mã chung
    this.luuThongTinCode = function (obj) {
        return _service.postData("/admin/categorycommon/save", obj);
    }; 

    //Xóa thông tin bộ mã chung
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/categorycommon/delete", obj);
    };

    //Tìm kiếm bộ mã chung
    this.timKiemCode = function (obj) {
        return _service.postData("/admin/categorycommon/getpaging", obj);
    };

    //Lấy thông tin chi tiết bộ mã chung
    this.layThongTinChiTietCode = function (obj) {
        return _service.postData("/admin/categorycommon/getdetail", obj);
    }; 

    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/categorycommon/SaveDataExcel", obj);
    };
} 