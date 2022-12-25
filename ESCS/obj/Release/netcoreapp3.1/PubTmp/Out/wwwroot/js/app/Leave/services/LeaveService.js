function LeaveService() {
    var _service = new Service();
    this.base = new Service();

    this.paging = function (obj) {
        return _service.postData("/Leave/paging", obj);
    };
    this.luuLichNghi = function (obj) {
        return _service.postData("/Leave/save", obj);
    };
    this.xemChiTietLichNghi = function (obj) {
        return _service.postData("/Leave/detail", obj);
    };
    this.xoaLichNghi = function (obj) {
        return _service.postData("/Leave/delete", obj);
    };
    this.duyetLichNghi = function (obj) {
        return _service.postData("/Leave/approve", obj);
    };
} 