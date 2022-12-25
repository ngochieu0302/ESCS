function PackageService() {
    var _service = new Service();
    this.base = new Service();
    this.paging = function (obj) {
        return _service.postData("/contract/package/paging", obj);
    };
    this.danhSachQuyenLoiTree = function (obj) {
        return _service.postData("/contract/package/danhSachQuyenLoiTree", obj);
    };
    this.luuGoiBH = function (obj) {
        return _service.postData("/contract/package/save", obj);
    };
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/contract/package/detail", obj);
    };
    this.layThongTinChiTietTheoMa = function (obj) {
        return _service.postData("/contract/package/layChiTietGoiTheoMa", obj);
    };
    this.luuTienQuyenLoi = function (obj) {
        return _service.postData("/contract/package/saveql", obj);
    };
    this.GetAllQLBS = function (obj) {
        return _service.postData("/contract/package/GetAllQLBS", obj);
    };
    this.luuDkbsGoi = function (obj) {
        return _service.postData("/contract/package/luuDkbsGoi", obj);
    };
    this.deleteDkbsGoi = function (obj) {
        return _service.postData("/contract/package/xoaDkbsGoi", obj);
    };
    this.getDkbsGoi = function (obj) {
        return _service.postData("/contract/package/getDkbsGoi", obj);
    };
    // Lưu thông tin tỷ lệ đồng - thời gian chờ
    this.luuTyLeDong = function (obj) {
        return _service.postData("/contract/package/luuTyLeDong", obj);
    };
    // Xóa cấu hình mã bệnh
    this.xoaCauHinhMaBenh = function (obj) {
        return _service.postData("/contract/package/xoaCauHinhMaBenh", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/contract/package/SaveDataExcel", obj);
    };
    //Lưu ghi chú khác
    this.LuuGhiChuKhac = function (obj) {
        return _service.postData("/contract/package/LuuGhiChuKhac", obj);
    };
    //Lấy danh sách nhóm gói
    this.LayDanhSachNhomGoiBH = function (obj) {
        return _service.postData("/contract/package/LayDanhSachNhomGoiBH", obj);
    };
    //Lưu nhóm gói
    this.LuuNhomGoiBH = function (obj) {
        return _service.postData("/contract/package/LuuNhomGoiBH", obj);
    };
    //Xóa nhóm gói
    this.xoaNhomGoiBH = function (obj) {
        return _service.postData("/contract/package/xoaNhomGoiBH", obj);
    };
}