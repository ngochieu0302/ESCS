function ModalSoSanhDGRRService() {
    this.modalId = "modalSoSanhDGRR";
    this.data = null;
    this.show = function (ma_doi_tac, so_id_hs, hang_muc, nv) {
        var _instance = this;
        $('#' + _instance.modalId).modal('show');
        var _service = new CarClaimCommonService();
        var obj = {
            ma_doi_tac: ma_doi_tac,
            so_id: so_id_hs,
            nv: nv
        };
        _service.layHangMucDGRR(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("modalSoSanhDGRRHangMucTemplate", "modalSoSanhDGRRHangMuc", res, () => {
                if (hang_muc != undefined && hang_muc != null && hang_muc != "") {
                    $("#modalSoSanhDGRRHangMuc a[data-hang-muc='" + hang_muc + "']").addClass("active");
                }
                onModalSoSanhDGRRHangMucClick(obj.so_id, res.out_value.so_id_hd, res.out_value.so_id_dt, hang_muc, res.out_value.nv);
            });
        });
    }
    this.OnInit = function () {
        var _instance = this;
    }
    this.OnInit();
}
function initImageViewerDGRR_CHUNG() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('#modalSoSanhDGRRAnhCapDon');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container',
        id: 'modalSoSanhDGRRViewerDGRR_CHUNG',
        tooltip: true,
        title: false,
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function initImageViewerANH_TON_THAT() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('#modalSoSanhDGRRAnhTonThat');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container',
        id: 'modalSoSanhDGRRViewerANH_TON_THAT',
        tooltip: true,
        title: false,
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function onModalSoSanhDGRRHangMucClick(so_id, so_id_hd, so_id_dt, hang_muc, nv) {
    var _service = new CarClaimCommonService();
    var obj = {
        so_id: so_id,
        so_id_hd: so_id_hd,
        so_id_dt: so_id_dt,
        hang_muc: hang_muc,
        nv: nv
    }
    _service.layAnhThumnailDGRRTonThat(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#modalSoSanhDGRRHangMuc a").removeClass("active");
        $("#modalSoSanhDGRRHangMuc a[data-hang-muc='" + hang_muc + "']").addClass("active");
        var anhDGRR = [];
        var anhTThat = [];
        if (res.data_info != null) {
            anhDGRR = res.data_info.where(n => n.nhom_anh == "DGRR_CHUNG");
            anhTThat = res.data_info.where(n => n.nhom_anh == "ANH_TON_THAT");
        }
        ESUtil.genHTML("modalSoSanhDGRRAnhCapDonTemplate", "modalSoSanhDGRRAnhCapDon", { data_info: anhDGRR }, () => {
            initImageViewerDGRR_CHUNG();
        });
        ESUtil.genHTML("modalSoSanhDGRRAnhTonThatTemplate", "modalSoSanhDGRRAnhTonThat", { data_info: anhTThat }, () => {
            initImageViewerANH_TON_THAT();
        });
    });
}
function onModalSoSanhDGRRXemAnhClick(nhom_anh, bt) {
    if (nhom_anh == "DGRR_CHUNG") {
        $("#modalSoSanhDGRRAnhCapDon .modalSoSanhDGRRAnhCapDonItem").removeClass("active");
        $("#modalSoSanhDGRRAnhCapDon .modalSoSanhDGRRAnhCapDonItem[data-bt='" + bt + "']").addClass("active");
    }
    if (nhom_anh == "ANH_TON_THAT") {
        $("#modalSoSanhDGRRAnhTonThat .modalSoSanhDGRRAnhTonThatItem").removeClass("active");
        $("#modalSoSanhDGRRAnhTonThat .modalSoSanhDGRRAnhTonThatItem[data-bt='" + bt + "']").addClass("active");
    }
}
