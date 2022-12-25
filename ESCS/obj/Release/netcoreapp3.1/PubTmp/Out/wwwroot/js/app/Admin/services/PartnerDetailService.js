function PartnerDetailService() {
    var _service = new Service();
    this.base = new Service();

    this.paging = function (obj) {
        return _service.postData("/admin/partnerdetail/list", obj);
    };
    this.luuCNDoiTac = function (obj) {
        return _service.postData("/admin/partnerdetail/save", obj);
    };
    this.xemCNDoiTac = function (obj) {
        return _service.postData("/admin/partnerdetail/detail", obj);
    };
    this.xoaCNDoiTac = function (obj) {
        return _service.postData("/admin/partnerdetail/delete", obj);
    };
    this.layDSChiNhanh = function (obj) {
        return _service.postData("/admin/partnerdetail/listByPartner", obj);
    };
    this.xoaCauHinh = function (obj) {
        return _service.postData("/admin/partnerdetail/deleteConfig", obj);
    };
} 