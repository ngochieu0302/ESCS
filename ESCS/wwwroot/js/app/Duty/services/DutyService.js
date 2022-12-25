function DutyService() {
    var _service = new Service();
    this.base = new Service();

    this.paging = function (obj) {
        return _service.postData("/Duty/paging", obj);
    };
    this.luuLichTruc = function (obj) {
        return _service.postData("/Duty/save", obj);
    };
    this.xemChiTietLichTruc = function (obj) {
        return _service.postData("/Duty/detail", obj);
    };
    this.xoaLichTruc = function (obj) {
        return _service.postData("/Duty/delete", obj);
    };
    this.duyetLichTruc = function (obj) {
        return _service.postData("/Duty/approve", obj);
    };
} 