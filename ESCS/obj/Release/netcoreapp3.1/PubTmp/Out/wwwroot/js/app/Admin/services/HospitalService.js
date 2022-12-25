function HospitalService() {

    var _service = new Service();

    //Lấy danh mục Hospital theo mã đối tác nsd
    this.layDsHospital = function () {
        return _service.postData("/admin/hospital/getall", {});
    };

    //Xóa thông tin Hospital
    this.deleteHospital = function (obj) {
        return _service.postData("/admin/hospital/delete", obj);
    };

    //Lưu thông tin Hospital
    this.SaveHospital = function (obj) {
        return _service.postData("/admin/hospital/save", obj);
    };

    //Tìm kiếm + phân trang Hospital
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/hospital/getpaging", obj);
    };

    //Lấy thông tin chi tiết Hospital
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/hospital/getdetail", obj);
    };

    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/hospital/SaveDataExcel", obj);
    };
}