function CustomerAccountService() {
    var _service = new Service();   
    // Tìm kiếm phân trang
    this.getPaging = function (obj) {
        return _service.postData("/admin/customeraccount/GetPaging", obj);
    };
    // Liệt kê thông tin chi tiết
    this.getDetail = function (obj) {
        return _service.postData("/admin/customeraccount/GetDetail", obj);
    };
    //Lưu thông tin nsd
    this.saveCustomer = function (obj) {
        return _service.postData("/admin/customeraccount/Save", obj);
    };
    //xóa thông tin nsd
    this.deleteCustomer = function (obj) {
        return _service.postData("/admin/customeraccount/Delete", obj);
    };
}