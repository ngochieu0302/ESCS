function LockDataService() {
    var _service = new Service();

    //Lưu thông tin khóa dữ liệu
    this.luuThongTin = function (obj) {
        return _service.postData("/admin/lockdata/luuThongTin",obj);
    }
    //Liệt kê thông tin khóa dữ liệu
    this.getPaging = function (obj) {
        return _service.postData("/admin/lockdata/GetPaging", obj);
    }
    //Liệt kê thông tin chi tiết khóa dữ liệu
    this.getDetail = function (obj) {
        return _service.postData("/admin/lockdata/GetDetail", obj);
    }
    //Xóa thông tin khóa dữ liệu
    this.xoaThongTin = function (obj) {
        return _service.postData("/admin/lockdata/xoaThongTin", obj);
    }
}