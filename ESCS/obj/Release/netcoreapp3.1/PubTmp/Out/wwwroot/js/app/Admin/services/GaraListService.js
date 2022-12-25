function GaraListService() {
    var _service = new Service();
    //Lấy danh mục gara theo mã đối tác nsd
    this.layDsGara = function () {
        return _service.postData("/admin/garalist/getall", {  });
    };
    //Xóa thông tin gara
    this.xoaGara = function (obj) {
        return _service.postData("/admin/garalist/delete", obj);
    };
    //Lưu thông tin gara
    this.luuGara = function (obj) {
        return _service.postData("/admin/garalist/save", obj);
    };
    //Tìm kiếm + phân trang gara
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/garalist/getpaging", obj);
    };
    //Lấy thông tin chi tiết gara
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/garalist/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/garalist/SaveDataExcel", obj);
    };
    //Lưu thiết lập gara
    this.saveConfigGara = function (obj) {
        return _service.postData("/admin/garalist/saveConfigGara", obj);
    };
    //Lấy cấu hình gara
    this.getConfigGara = function (obj) {
        return _service.postData("/admin/garalist/getConfigGara", obj);
    };
}