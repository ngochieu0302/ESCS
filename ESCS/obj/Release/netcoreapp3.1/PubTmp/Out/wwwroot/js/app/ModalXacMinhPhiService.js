function ModalXacMinhPhiService(title = "Thông tin tình trạng thanh toán phí", nv = "XE") {
    this.idModal = "modalXacMinhPhi";
    this.nv = nv;
    this.data = {};
    this.onInit = function () {
        var _instance = this;      
        $("#modalXacMinhPhi .modal-title").html(title);
    }
    this.show = function (data) {
        var _service = new Service();
        _service.postData("/carclaim/carclaimcommon/xemTinhTrangTTPhi", data).then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("dsXacMinhPhi_template", "dsXacMinhPhi", { danh_sach: res.data_info });
            $("#modalXacMinhPhi").modal('show');
        });
    }
    this.onInit();
}