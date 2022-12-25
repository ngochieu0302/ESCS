function DiseasesListService() {
    var _service = new Service();
    this.base = new Service();
    // lấy danh sách mã bệnh
    this.layDanhSachMaBenh = function (obj) {
        return _service.postData("/admin/diseasesList/getall", obj);
    };
    // Tìm kiếm  + phân trang bệnh
    this.paging = function (obj) {
        return _service.postData("/admin/DiseasesList/paging", obj);
    };
    // Lấy chi tiết bệnh
    this.layThongTinChiTietBenh = function (obj) {
        return _service.postData("/admin/DiseasesList/getDetail", obj);
    };
    // Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/DiseasesList/SaveDataExcel", obj);
    };
}