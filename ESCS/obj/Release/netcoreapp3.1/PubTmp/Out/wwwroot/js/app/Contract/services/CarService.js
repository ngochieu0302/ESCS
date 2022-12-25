function CarService() {
    var _service = new Service();

    this.pageload = function () {
        return _service.postData("/contract/car/pageload");
    };

    this.timkiemHD = function (objTimKiem) {
        return _service.postData("/contract/car/xe_timkiem", objTimKiem);
    };

    this.get_detail = function (data) {
        return _service.postData("/contract/car/Xe_detail", data);
    };

    this.get_gcn_lke = function (data) {
        return _service.postData("/contract/car/Xe_gcn_lke", data);
    };

    this.dongtai_lke = function (data) {
        return _service.postData("/contract/car/xe_dongtai_lke", data);
    };

    this.hd_nhap = function (obj) {
        return _service.postData("/contract/car/hd_nh", obj);
    };

    this.ds_nhap = function (obj) {
        return _service.postData("/contract/car/xe_ds_nh", obj);
    };

    this.dongtai_nhap = function (obj) {
        return _service.postData("/contract/car/xe_dongtai_nh", obj);
    };

    this.xe_excel_nh = function (obj) {
        return _service.postData("/contract/car/xe_excel_nh", obj);
    };

    this.ds_xoa = function (obj) {
        return _service.postData("/contract/car/ds_xoa", obj);
    };

    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    };
}