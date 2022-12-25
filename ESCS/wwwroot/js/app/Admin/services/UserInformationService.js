function UserInformationService() {
    var _service = new Service();
    //Lấy thông tin nsd
    this.layThongTinNsd = function (obj) {
        return _service.postData("/admin/userinformation/GetUserInformation", obj);
    };

    // Cập nhật thông tin nsd
    this.capnhat = function(obj) {
        return _service.postFormData("/admin/userinformation/UpdateUserInformation", obj);
    }
}