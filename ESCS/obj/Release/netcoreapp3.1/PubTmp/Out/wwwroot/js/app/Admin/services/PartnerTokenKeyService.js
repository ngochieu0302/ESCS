function PartnerTokenKeyService() {
    var _service = new Service();
    //Tìm kiếm phân trang 
    this.getpaging = function (obj) {
        return _service.postData("/admin/PartnerTokenKey/getPaging", obj);
    };
    //Lấy thông tin chi tiết 
    this.layThongTinMaDoiTacTokenKey = function (obj) {
        return _service.postData("/admin/PartnerTokenKey/getDetail", obj);
    };
    
    //Lưu thông tin 
    this.luuThongTinMaDoiTacTokenKey = function (obj) {
        return _service.postData("/admin/PartnerTokenKey/save", obj);
    };
    //Xóa thông tin
    this.xoaThongTinMaDoiTacTokenKey = function (obj) {
        return _service.postData("/admin/PartnerTokenKey/Delete", obj);
    };
} 