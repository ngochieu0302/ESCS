﻿function AveragePriceService() {
    var _service = new Service();
    //Lấy danh mục tra cứu giá
    this.layDsTraCuuGia = function () {
        return _service.postData("/motoclaim/averageprice/getall", {});
    };
    //Tìm kiếm + phân trang tra cứu giá
    this.timKiemPTrang = function (obj) {
        return _service.postData("/motoclaim/averageprice/getpaging", obj);
    };
    //Lấy thông tin chi tiết tra cứu giá
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/motoclaim/averageprice/getdetail", obj);
    };
    this.layDanhSachHoSo = function (obj) {
        return _service.postData("/motoclaim/averageprice/getlistcontract", obj);
    };
}