function RangeVehicleService() {

    var _service = new Service();

    //Lấy tất cả danh sách loại xe (có cache)
    this.layDsLoaiXe = function () {
        return _service.postData("/admin/rangevehicle/getall", {});
    };
    //Lưu thông tin loại xe
    this.luuLoaiXe = function (obj) {
        return _service.postData("/admin/rangevehicle/save", obj);
    };
    //Xóa thông tin loại xe
    this.xoaLoaiXe = function (obj) {
        return _service.postData("/admin/rangevehicle/delete", obj);
    };
    //Tìm kiếm loại xe
    this.timKiemLoaiXe = function (obj) {
        return _service.postData("/admin/rangevehicle/getpaging", obj);
    };
    //Lấy thông tin chi tiết loại xe
    this.thongTinChiTietLoaiXe = function (obj) {
        return _service.postData("/admin/rangevehicle/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/rangevehicle/SaveDataExcel", obj);
    };
}