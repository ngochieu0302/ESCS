function ProductHumanService() {

    var _service = new Service();

    //Lấy danh sách sản phẩm con người (cache)
    this.getAllSanPham = function () {
        return _service.postData("/admin/producthuman/getallproducthuman", {});
    }
    //Lưu thông tin sản phẩm con người
    this.save = function (obj) {
        return _service.postData("/admin/producthuman/save", obj);
    };
    //Xóa thông tin sản phẩm con người
    this.delete = function (obj) {
        return _service.postData("/admin/producthuman/delete", obj);
    };
    //Tìm kiếm + phân trang sản phẩm con người
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/producthuman/getpaging", obj);
    };
    //Lấy thông tin chi tiết sản phẩm con người
    this.xemChiTiet = function (obj) {
        return _service.postData("/admin/producthuman/getdetail", obj);
    };
    //Lấy thông tin chi tiết sản phẩm con người
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/producthuman/SaveDataExcel", obj);
    };
} 