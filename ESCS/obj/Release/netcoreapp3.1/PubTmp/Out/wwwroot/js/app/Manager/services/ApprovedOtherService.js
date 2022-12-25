function ApprovedOtherService() {

    var _service = new Service();

    // Tìm kiếm + phân trang phê duyệt, thanh lý, bồi thường
    this.paging  = function (obj) {
        return _service.postData("/manager/approvedother/getpaging", obj);
    }; 

    // Xem chi tiết phê duyệt, thanh lý, bồi thường
    this.getDetail = function (obj) {
        return _service.postData("/Manager/ApprovedOther/GetDetail", obj);
    };

    this.PheDuyet = function (obj) {
        return _service.postData("/Manager/ApprovedOther/PheDuyet", obj);
    };

    this.HuyDuyet = function (obj) {
        return _service.postData("/Manager/ApprovedOther/HuyDuyet", obj);
    };
}