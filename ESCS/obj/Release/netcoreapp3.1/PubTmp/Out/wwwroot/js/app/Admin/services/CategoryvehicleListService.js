function CategoryvehicleListService() {
    var _service = new Service();
    this.layDsHangMucXe = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/getall", obj);
    };
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/delete", obj);
    };
    this.luuThongTin = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/save", obj);
    };
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/getpaging", obj);
    };
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/getdetail", obj);
    };
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/SaveDataExcel", obj);
    };
    this.GetAllViTriTonThat = function (obj) {
        return _service.postData("/admin/categoryvehiclelist/GetAllViTriTonThat", obj);
    };
} 