function CauseBenefitsService() {
    var _service = new Service();

    this.getPaging = function (obj) {
        return _service.postData("/admin/causebenefits/GetPaging", obj);
    };
    this.luuThongTinCauHinh = function (obj) {
        return _service.postData("/admin/causebenefits/luuThongTinCauHinh", obj);
    };
    this.getAll = function (obj) {
        return _service.postData("/admin/causebenefits/getAll", obj);
    };
}