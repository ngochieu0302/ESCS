function ConfigOCRService() {

    var _service = new Service();

    //Lưu thông tin cấu hình dịch vụ OCR
    this.saveConfigOCR = function (obj) {
        return _service.postData("/admin//saveconfigocr", obj);
    };

    // Xóa dịch vụ cấu hình dịch vụ OCR
    this.deleteConfig = function (obj) {
        return _service.postData("/admin/configocr/delete", obj);
    };
} 