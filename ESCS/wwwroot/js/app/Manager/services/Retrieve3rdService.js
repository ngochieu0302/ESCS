function Retrieve3rdService() {

    var _service = new Service();

    // Tìm kiếm danh sách thanh toán tồn
    this.GetListTon = function (obj) {
        return _service.postData("/manager/retrieve3rd/getlistton", obj);
    };

    // Lấy chi tiết hồ sơ thanh toán
    this.GetDetailTon = function (obj) {
        return _service.postData("/manager/retrieve3rd/getdetailton", obj);
    };

    //Xóa thông tin thu đòi người thứ 3 phát sinh
    this.xoaThuDoiNguoiThu3 = function (obj) {
        return _service.postData("/manager/retrieve3rd/delete", obj);
    };

    //Lưu thông tin thu đòi người thứ 3 phát sinh
    this.luuThuDoiNguoiThu3 = function (obj) {
        return _service.postData("/manager/retrieve3rd/save", obj);
    };

    //Tìm kiếm + phân trang thông tin thu đòi người thứ 3 phát sinh
    this.timKiemThuDoiNguoiThu3 = function (obj) {
        return _service.postData("/manager/retrieve3rd/getpaging", obj);
    };

    //Lấy thông tin chi tiết thông tin thu đòi người thứ 3 phát sinh
    this.layThongTinChiTietThuDoiNguoiThu3 = function (obj) {
        return _service.postData("/manager/retrieve3rd/getdetail", obj);
    };

    //Tìm kiếm người thứ 3 cần thu đòi
    this.layDsNguoiThuBaCanThuDoi = function (obj) {
        return _service.postData("/manager/retrieve3rd/getpagingtnba", obj);
    };
} 