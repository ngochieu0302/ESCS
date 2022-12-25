function CostsListService() {

    var _service = new Service();

    //Lấy danh mục chi phí theo mã đối tác nsd
    this.layDsChiPhi = function (obj) {
        return _service.postData("/admin/costslist/getall", obj);
    };

    //Xóa thông tin chi phí
    this.delete = function (obj) {
        return _service.postData("/admin/costslist/delete", obj);
    };

    //Lưu thông tin chi phí
    this.luuThongTinChiPhi = function (obj) {
        return _service.postData("/admin/costslist/luuThongTinChiPhi", obj);
    };

    //Tìm kiếm + phân trang chi phí
    this.getPaging = function (obj) {
        return _service.postData("/admin/costslist/getpaging", obj);
    };

    //Lấy thông tin chi tiết chi phí
    this.getDetail = function (obj) {
        return _service.postData("/admin/costslist/getdetail", obj);
    };

}