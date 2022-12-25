function CostDiseasService() {

    var _service = new Service();

    //Lưu mã bệnh chi phí
    this.Save = function (obj) {
        return _service.postData("/admin/CostDisease/Save", obj);
    };
    // Tìm kiếm phân trang
    this.GetPaging = function (obj) {
        return _service.postData("/admin/CostDisease/GetPaging", obj);
    };
    //Liệt kê chi tiết
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/CostDisease/getDetail", obj);
    }
}