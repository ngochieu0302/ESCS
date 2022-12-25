function MappingHangMucService() {
    var _service = new Service();
    //Get paging mapping mã hạng mục
    this.getPaging = function (obj) {
        return _service.postData("/admin/mappinghangmuc/getPaging", obj);
    }
    //Lấy tất cả mã hạng mục mapping
    this.getAll = function () {
        return _service.postData("/admin/mappinghangmuc/getall", { });
    }
    //Lấy tất cả mã hạng mục mapping
    this.luuThongTinHangMuc = function (obj) {
        return _service.postData("/admin/mappinghangmuc/luuThongTinHangMuc", obj);
    }
}