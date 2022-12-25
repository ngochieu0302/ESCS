function BenefitsProductService() {

    var _service = new Service();

    //Lưu thông tin quyền lợi sản phẩm
    this.saveBeneFits = function (obj) {
        return _service.postData("/admin/benefitsproduct/save", obj);
    }
    //Tìm kiếm + phân trang quyền lợi sản phẩm
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/benefitsproduct/getpaging", obj);
    };
    //Lấy thông tin chi tiết quyền lợi sản phẩm
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/benefitsproduct/getdetail", obj);
    };
    //Lấy thông tin chi tiết quyền lợi sản phẩm
    this.layQuyenLoiCha = function (obj) {
        return _service.postData("/admin/benefitsproduct/getparent", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/benefitsproduct/SaveDataExcel", obj);
    };
}