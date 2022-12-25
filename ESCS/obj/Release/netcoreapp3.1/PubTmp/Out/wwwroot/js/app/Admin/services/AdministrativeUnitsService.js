function AdministrativeUnitsService() {
    var _service = new Service();
    //Lấy danh sách tỉnh thành (cache)
    this.layDsTinhThanh = function () {
        return _service.postData("/admin/administrativeunits/getadministrativeunits", {});
    }
    //Xóa đơn vị hành chính
    this.xoaDonViHanhChinh = function (obj) {
        return _service.postData("/admin/administrativeunits/delete", obj);
    };
    //Lưu thông tin đơn vị hành chính
    this.luuDonViHanhChinh = function (obj) {
        return _service.postData("/admin/administrativeunits/save", obj);
    };
    //Tìm kiếm + phân trang đơn vị hành chính
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/administrativeunits/getpaging", obj);
    };
    //Lấy thông tin chi tiết đơn vị hành chính
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/administrativeunits/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/administrativeunits/SaveDataExcel", obj);
    };
} 