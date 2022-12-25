function CategoryPersonService() {

    var _service = new Service();

    //Lấy danh mục hạng mục con người theo mã đối tác nsd
    this.layDsHMCN = function () {
        return _service.postData("/admin/categoryperson/getall", {});
    };

    //Lưu thông tin
    this.saveCategoryperson = function (obj) {
        return _service.postData("/admin/categoryperson/save", obj);
    };

    //Xóa thông tin
    this.delete = function (obj) {
        return _service.postData("/admin/categoryperson/delete", obj);
    };

    //Tìm kiếm + phân trang Hospital
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/categoryperson/getpaging", obj);
    };

    //Lấy thông tin chi tiết Hospital
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/categoryperson/getdetail", obj);
    };

    ////Lưu thông tin import excel
    //this.SaveDataExcel = function (obj) {
    //    return _service.postData("/admin/hospital/SaveDataExcel", obj);
    //};
}