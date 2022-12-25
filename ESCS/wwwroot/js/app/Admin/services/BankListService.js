function BankListService() {
    var _service = new Service(); 
    //Lấy tất cả danh sách ngân hàng
    this.layDsNganHang = function () {
        return _service.postData("/admin/banklist/getall", {});
    };
    //Xóa ngân hàng
    this.xoaNganHang = function (obj) {
        return _service.postData("/admin/banklist/delete", obj);
    };
    //Lưu thông tin ngân hàng
    this.luuThongTinNganHang = function (obj) {
        return _service.postData("/admin/banklist/save", obj);
    };
    //Tìm kiếm + phân trang ngân hàng
    this.timKiemNganHang = function (obj) {
        return _service.postData("/admin/banklist/getpaging", obj);
    };
    //Lấy thông tin chi tiết ngân hàng
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/banklist/getdetail", obj);
    };
    //Lưu thông tin import excel
    this.SaveDataExcel = function (obj) {
        return _service.postData("/admin/banklist/SaveDataExcel", obj);
    };
} 