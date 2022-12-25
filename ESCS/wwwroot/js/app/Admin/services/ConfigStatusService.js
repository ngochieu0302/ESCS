function ConfigStatusService() {

    var _service = new Service();

    //Lưu thông tin trạng thái
    this.luuTrangThai = function (obj) {
        return _service.postData("/admin/configstatus/save", obj);
    };

    this.TKiemTrangThai = function (obj) {
        return _service.postData("/admin/configstatus/TKiemTrangThai", obj);
    };

    //Tìm kiếm + phân trang trạng thái
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/configstatus/getpaging", obj);
    };

    //Lấy thông tin chi tiết trạng thái
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/configstatus/getdetail", obj);
    };
} 