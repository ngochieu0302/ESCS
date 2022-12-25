function ApprovedService() {
    var _service = new Service();

    this.paging = function (obj) {
        return _service.postData("/Manager/Approved/Liet_ke_trang", obj);
    };

    this.getDetail = function (obj) {
        return _service.postData("/Manager/Approved/Liet_ke_chi_tiet", obj);
    };

    this.SuKienDongY = function (obj) {
        return _service.postData("/Manager/Approved/Dong_y_duyet", obj);
    };

    this.SuKienHuyDongY = function (obj) {
        return _service.postData("/Manager/Approved/Huy_dong_y_duyet", obj);
    };
    this.tuChoiDuyet = function (obj) {
        return _service.postData("/Manager/Approved/TuChoiDuyet", obj);
    };

    // xem ảnh 
    this.layDanhSachFile = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfilesthumnail", obj);
    }
    this.layAnhChiTiet = function (obj) {
        return _service.postData("/carclaim/carinvestigation/getfiles", obj);
    }
    // In mẫu in và ký số
    this.inBienBanGiamDinhKySo = function (obj) {
        return _service.getFile("/carclaim/carinvestigation/printsignaturepdf", obj);
    }
} 