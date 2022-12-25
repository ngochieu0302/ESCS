function RetrieveCategoriesService() {

    var _service = new Service();

    //Xóa thông tin
    this.xoaThuHoiVatTu = function (obj) {
        return _service.postData("/manager/retrievecategories/delete", obj);
    };

    //Lưu thông tin
    this.luuThuHoiVatTu = function (obj) {
        return _service.postData("/manager/retrievecategories/save", obj);
    };

    //Tìm kiếm + phân trang thông tin 
    this.timKiemVatTuThuHoi = function (obj) {
        return _service.postData("/manager/retrievecategories/getpaging", obj);
    };

    //Lấy thông tin chi tiết thông tin
    this.layThongTinChiTietThuHoiVatTu = function (obj) {
        return _service.postData("/manager/retrievecategories/getdetail", obj);
    };

    //Tìm kiếm
    this.layDsVatTu = function (obj) {
        return _service.postData("/manager/retrievecategories/getpagingvattu", obj);
    };
} 