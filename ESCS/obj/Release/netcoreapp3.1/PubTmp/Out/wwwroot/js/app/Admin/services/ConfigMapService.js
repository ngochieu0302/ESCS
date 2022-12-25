function ConfigMapService() {

    var _service = new Service();

    //Lưu thông tin google maps
    this.saveConfigMaps = function (obj) {
        return _service.postData("/admin/configmap/saveconfigmaps", obj);
    };
    //Xóa thông tin dịch google maps
    this.deleteConfigMaps = function (obj) {
        return _service.postData("/admin/configmap/delete", obj);
    };
    //Tìm kiếm + phân trang google maps
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/configmap/getpaging", obj);
    };
    //Lấy thông tin chi tiết google maps
    this.getdetailConfigMaps = function (obj) {
        return _service.postData("/admin/configmap/getdetail", obj);
    };
} 