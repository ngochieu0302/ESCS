function QuestionCodesService() {

    var _service = new Service();

    //Lưu thông tin câu hỏi
    this.saveCauHoi = function (obj) {
        return _service.postData("/admin/questioncodes/save", obj);
    };
    //Xóa thông tin câu hỏi
    this.deleteCauHoi = function (obj) {
        return _service.postData("/admin/questioncodes/delete", obj);
    };
    //Tìm kiếm + phân trang câu hỏi
    this.timKiemPtrang = function (obj) {
        return _service.postData("/admin/questioncodes/getpaging", obj);
    };
    //Lấy thông tin chi tiết câu hỏi
    this.xemChiTietCauHoi = function (obj) {
        return _service.postData("/admin/questioncodes/getdetail", obj);
    };
} 