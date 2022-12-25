function ModalXemQRCodeHopDong() {
    this.modalId = "modalXemQRCodeHopDong";
    this.data = null;
    this.frmXemQRCodeHopDong = new FormService("frmXemQRCodeHopDong");
    this.xemFile = function (isShow = true) {
        var _notifyService = new NotifyService();
        var _instance = this;
        if (_instance.data == undefined || _instance.data == null ||
            _instance.data.so_id == undefined || _instance.data.so_id == null || _instance.data.so_id == "" || _instance.data.so_id == "0" ||
            _instance.data.nv == undefined || _instance.data.nv == null || _instance.data.nv == "" ||
            _instance.data.loai == undefined || _instance.data.loai == null || _instance.data.loai == "") {
            _notifyService.error("Thiếu thông tin để xem file QRCode");
            return;
        }
        _instance.frmXemQRCodeHopDong.getControl("loai").setValue(_instance.data.loai);
        var _service = new Service();
        _service.postData("/contract/carcontract/GetQRCodeHopDong", _instance.data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            $("#modalXemQRCodeHopDongImage").addClass("d-none");
            if (res.data_info.file_base64 != null && res.data_info.file_base64 != "") {
                $("#modalXemQRCodeHopDongImage").removeClass("d-none");
                var src = "data:image/jpeg;base64, " + res.data_info.file_base64;
                $("#modalXemQRCodeHopDongImage").attr("src", src);
            }
            if (res.data_info.url_link != null && res.data_info.url_link != "") {
                var link = res.data_info.url_link;
                $("#linkQRCodeHopDong").attr("data-val", link);
            }
            if (isShow) {
                $('#' + _instance.modalId).modal('show');
            }
        });
    }
    this.hide = function () {
        $('#' + this.modalId).removeClass("in");
        $('#' + this.modalId).css("display", "none");
        $('.modal-backdrop').remove();
        $('#' + this.modalId).modal('hide');
    };
    this.OnInit = function () {
        var _instance = this;
        _instance.frmXemQRCodeHopDong.getControl("loai").addEventChange(val => {
            _instance.data.loai = val;
            _instance.xemFile(false);
        });
    }
    this.OnInit();
}
