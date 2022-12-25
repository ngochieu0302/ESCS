function ReportService() {
    var _service = new Service();
    //Lấy thông tin đối tác
    this.layDsDoiTac = function (obj) {
        return _service.postData("/admin/accountemail/getall", obj);
    };
    //Lấy thông tin chi nhánh
    this.layDsChiNhanh = function () {
        return _service.postData("/admin/branchlist/getall", { pm: "BT" });
    };
    //Lấy thông tin bệnh viện
    this.layDsHospital = function () {
        return _service.postData("/admin/hospital/getall", {});
    };
    //Lấy danh sách biểu mẫu báo cáo
    this.layDanhSachBieuMauBaoCao = function (obj) {
        return _service.postData("/admin/printed/layDanhSachBieuMauBaoCao", obj);
    }
}