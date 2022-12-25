function MappingDamageLevelService() {

    var _service = new Service();

    //Lấy tất cả mã hạng mục mapping
    this.getAll = function () {
        return _service.postData("/admin/mappingdamagelevel/getall", {});
    }

    //Xóa thông tin mapping mức độ tổn thất
    this.deleteHospital = function (obj) {
        return _service.postData("/admin/mappingdamagelevel/delete", obj);
    };

    //Lưu thông tin mức độ tổn thất
    this.saveMucDoTT_AI = function (obj) {
        return _service.postData("/admin/mappingdamagelevel/save", obj);
    };

    //Tìm kiếm + phân trang mức độ tổn thất
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/mappingdamagelevel/getpaging", obj);
    };

    //Lấy thông tin chi tiết mức độ tổn thất
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/mappingdamagelevel/getdetail", obj);
    };
}