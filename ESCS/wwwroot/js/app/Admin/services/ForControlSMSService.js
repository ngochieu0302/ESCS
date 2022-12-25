function ForControlSMSService() {

    var _service = new Service();
    //Tìm kiếm + phân trang trạng thái
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/forControlSMS/getpaging", obj);
    };
    //Lấy thông tin chi tiết trạng thái
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/forControlSMS/getdetail", obj);
    };
}