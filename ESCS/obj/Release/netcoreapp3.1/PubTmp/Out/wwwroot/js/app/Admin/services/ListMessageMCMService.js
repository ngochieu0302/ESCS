function ListMessageMCMService() {
    var _service = new Service();
     
    //Xóa danh sách tin nhắn MCM
    this.xoaDanhSachTinNhan = function (obj) {
        return _service.postData("/admin/listmessagemcm/delete", obj);
    };
    //Lưu thông tin danh sách tin nhắn MCM
    this.luuDanhSachTinNhan = function (obj) {
        return _service.postData("/admin/listmessagemcm/save", obj);
    };
    //Tìm kiếm + phân trang danh sách tin nhắn MCM 
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/listmessagemcm/getpaging", obj);
    };
    //Lấy thông tin chi tiết danh sách tin nhắn MCM
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/listmessagemcm/getdetail", obj);
    };
} 