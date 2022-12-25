function DashboardService() {
    var _service = new Service();
    this.base = new Service();
    this.layThongTinDashboard_xe = function (obj) {
        return _service.postData("/Home/layThongTinDashboard", obj);
    };
    this.layThongTinDashboard_ng = function (obj) {
        return _service.postData("/Home/layThongTinDashboardNg", obj);
    };
    this.layThongTinChiTietHoSoDashBoard = function (obj) {
        return _service.postData("/Home/layThongTinChiTietHoSoDashBoard", obj);
    };
    /// tiến trình giải quyết
    this.layThongTinDashboardTTGQ = function (obj) {
        return _service.postData("/Home/layThongTinDashboardTTGQ", obj);
    };
    this.layThongTinChiTietDashboard = function (obj) {
        return _service.postData("/Dashboard/CarAnalysis/layThongTinChiTietDashboard", obj);
    };
    this.layThongTinChiTietDashboardDT = function (obj) {
        return _service.postData("/Dashboard/CarAnalysis/layThongTinChiTietDashboardDT", obj);
    };
    /// con nguoi
    this.layThongTinDashboardNgDB = function (obj) {
        return _service.postData("/Dashboard/HealthAnalysis/layThongTinChiTietDashboardDB", obj);
    };
    this.getCauHinhDashboard = function () {
        return _service.postData("/Home/getCauHinhDashboard", {});
    }
}