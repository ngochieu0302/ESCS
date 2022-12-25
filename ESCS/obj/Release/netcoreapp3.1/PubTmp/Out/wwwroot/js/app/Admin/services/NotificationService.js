function NotificationService() {
    var _service = new Service();
    this.pageload = function () {
        return _service.postData("/admin/notification/pageload", { pm: "BT" });
    };

    // Tìm kiếm đối tác
    this.lietkeThongBao = function (obj) {
        return _service.postData("/admin/notification/getpaging", obj);
    }; 
} 