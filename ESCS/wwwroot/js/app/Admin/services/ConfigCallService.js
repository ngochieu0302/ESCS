function ConfigCallService() {

    var _service = new Service();

    //Lưu thông tin video call - voice call
    this.saveConfigCall = function (obj) {
        return _service.postData("/admin/configcall/saveconfigcall", obj);
    };
    //Xóa thông tin video call - voice call 
    this.deleteConfigCall = function (obj) {
        return _service.postData("/admin/configcall/delete", obj);
    };
    //Tìm kiếm + phân trang video call - voice call
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/configcall/getpaging", obj);
    };
    //Lấy thông tin chi tiết video call - voice call
    this.getdetailConfigCall = function (obj) {
        return _service.postData("/admin/configcall/getdetail", obj);
    };
} 