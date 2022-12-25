function BranchListService() {
    var _service = new Service();
    this.getBranch = function () {
        return _service.postData("/admin/branchlist/getall", { pm: "BT" });
    };
    //Lấy tất cả danh sách chi nhánh quản lý
    this.layDsChiNhanh = function () {
        return _service.postData("/admin/branchlist/getall", { pm: "BT" });
    };
    //Lấy tất cả danh sách chi nhánh quản lý
    this.layDsChiNhanhCtyBh = function () {
        return _service.postData("/admin/branchlist/GetAllByPartner", { pm: "BT" });
    };
    //Lấy tất cả danh sách chi nhánh quản lý
    this.layDsChiNhanhQTHT = function () {
        return _service.postData("/admin/branchlist/getallnonecache", { pm: "BT" });
    };
    //Xóa thông tin chi nhánh
    this.xoaChiNhanh = function (obj) {
        return _service.postData("/admin/branchlist/delete", obj);
    };
    //Lưu thông tin chi nhánh
    this.luuChiNhanh = function (obj) {
        return _service.postData("/admin/branchlist/save", obj);
    };
    this.luuTaiKhoan = function (obj) {
        return _service.postData("/admin/branchlist/savebanklist", obj);
    };
    this.xoaTaiKhoan = function (obj) {
        return _service.postData("/admin/branchlist/deletebanklist", obj);
    };
    //Tìm kiếm chi nhánh
    this.timKiemChiNhanh = function (obj) {
        return _service.postData("/admin/branchlist/getpaging", obj);
    };
    //Lấy thông tin chi tiết chi nhánh
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/branchlist/getdetail", obj);
    };
} 