function OpinionService() {
    var _service = new Service();
    //// Lấy chi tiết từ hash code
    this.getInfoFromHashCode = function (obj) {
        return _service.postData("/opinion/getInfoFromHashCode", obj);
    };
    // Lưu ý kiến cán bộ
    this.luuYKienCanBo = function (obj) {
        return _service.postData("/opinion/luuYKienCanBo", obj);
    };
} 