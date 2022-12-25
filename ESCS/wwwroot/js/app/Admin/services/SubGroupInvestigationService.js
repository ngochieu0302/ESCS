function SubGroupInvestigationService() {

    var _service = new Service();    
    //Xóa phân nhóm giám định
    this.xoaNhomGD = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/delete", obj);
    };
    //Lưu thông tin phân nhóm giám định
    this.luuNhomGD = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/Save", obj);
    };
    //Tìm kiếm + phân trang phân nhóm giám định
    this.getPaging = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/getpaging", obj);
    };
    //Tìm kiếm danh sách cán bộ
    this.tKiemCanBo = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/tKiemCanBo", obj);
    };
    //Lấy thông tin chi tiết phân nhóm giám định
    this.getDetail = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/GetDetail", obj);
    };
    //Xoá thông tin chi tiết phân nhóm giám định
    this.delete = function (obj) {
        return _service.postData("/admin/subgroupinvestigation/Delete", obj);
    };
}