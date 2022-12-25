function ViewImagesService() {
    var _service = new Service();

    this.layDanhSachAnh = function (obj) {
        return _service.postData("/ViewImages/GetListFiles", obj);
    };    
}