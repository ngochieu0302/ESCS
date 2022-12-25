function PartnerListService() {

    var _service = new Service();

    //Lấy tất cả danh sách đối tác theo đối tác quản lý (có cache)
    this.layDsDoiTac = function () {
        return _service.postData("/admin/partnerlist/getall", {});
    };
    //Lấy tất cả danh sách đối tác
    this.layDsDoiTacQTHT = function () {
        return _service.postData("/admin/partnerlist/getallnonecache", {});
    };
    //Xóa thông tin đối tác
    this.xoaDoiTac = function (obj) {
        return _service.postData("/admin/partnerlist/delete", obj);
    };
    //Lưu thông tin đối tác
    this.luuThongTinDoiTac = function (obj) {   
        //return _service.postData("/admin/partnerlist/save", obj);
        return _service.postFormData("/admin/partnerlist/save", obj);
    };
    //Tìm kiếm đối tác
    this.timKiemDoiTac = function (obj) {
        return _service.postData("/admin/partnerlist/getpaging", obj);
    };
    //Lấy thông tin chi tiết đối tác
    this.layThongTinChiTietDoiTac = function (obj) {
        return _service.postData("/admin/partnerlist/getdetail", obj);
    }; 

    //Lưu thông tin dịch vụ OCR
    this.saveConfigOCR = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfigocr", obj);
    };

    // Lưu thông tin dịch vụ Call
    this.saveConfigCall = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfigcall", obj);
    };

    // Lưu thông tin dịch vụ Google Maps
    this.saveConfigMaps = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfigmaps", obj)
    }

    // Lưu thông tin dịch vụ SMS
    this.saveConfigSMS = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfigsms", obj)
    }

    //Lưu thông tin mẫu in
    this.saveConfigSetting = function (obj) {
        return _service.postFormData("/admin/partnerlist/saveconfigsetting", obj)
    }

    //Lưu thông tin dịch vụ ứng dụng
    this.saveConfigApp = function (obj) {
        return _service.postFormData("/admin/partnerlist/saveconfigapp", obj)
    }

    //Lưu thông tin cấu hình xe
    this.saveCauHinhXe = function (obj) {
        return _service.postData("/admin/partnerlist/SaveCauHinhXe", obj)
    }

    //Lấy tất cả mức độ tổn thất mapping
    this.getAllMucDo = function () {
        return _service.postData("/admin/partnerlist/getallmucdo", {});
    }

    //Lưu thông tin mức độ tổn thất mapping
    this.saveMucDoTT_AI = function (obj) {
        return _service.postData("/admin/partnerlist/savemucdoai", obj);
    };

    //Tìm kiếm + phân trang mức độ tổn thất mapping
    this.timKiemPTrangMucDo = function (obj) {
        return _service.postData("/admin/partnerlist/getpagingmucdo", obj);
    };

    //Lưu thông tin cấu hình dịch vụ AI
    this.saveConfigAI = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfigai", obj); 
    }

    //Lưu thông tin cấu hình dịch vụ báo giá Gara
    this.saveConfigGara = function (obj) {
        return _service.postData("/admin/partnerlist/saveconfiggara", obj);
    }

    //Xem thông tin dịch vụ báo giá Gara
    this.lietkeBaoGia = function (obj) {
        return _service.postData("/admin/partnerlist/getpagingbaogia", obj);
    }

    //Lấy tất cả danh sách báo giá
    this.layDsBaoGia = function (obj) {
        return _service.postData("/admin/partnerlist/getallbaogia", obj);
    };
} 