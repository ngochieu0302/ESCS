function CategoryvehicleAIService() {
    var _service = new Service();
    this.luuThongTin = function (obj) {
        return _service.postData("/admin/categoryvehicleai/save", obj);
    };
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/categoryvehicleai/getpaging", obj);
    };
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/categoryvehicleai/getdetail", obj);
    };
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/categoryvehicleai/SaveDataExcel", obj);
    };
}