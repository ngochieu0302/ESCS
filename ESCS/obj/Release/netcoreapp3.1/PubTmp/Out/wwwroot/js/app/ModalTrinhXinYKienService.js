var _modalXinYKienChonDonVi = new ModalDragService("modalXinYKienChonDonVi", undefined, "bottom");
var arr_muc_do_ut = [
    { ma: 'BINHTHUONG', ten: 'Bình thường' },
    { ma: 'CAO', ten: 'Cao' },
    { ma: 'RATCAO', ten: 'Rất cao' }
];
function onModalXinYKienChonDonVi(el, placement = "bottom") {
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalXinYKienChonDonVi.setPlacement(placement);
    _modalXinYKienChonDonVi.show(el);
}
function onModalXinYKienTimKiemCanBo(trang) {
    var _frmModalXinYKienThemNhom = new FormService("frmModalXinYKienThemNhom");
    var hanh_dong = _frmModalXinYKienThemNhom.getControl("hanh_dong").val();
    var ma_doi_tac = _frmModalXinYKienThemNhom.getControl("ma_doi_tac").val();
    var so_id = _frmModalXinYKienThemNhom.getControl("so_id").val();
    var arr_cnhanh = _frmModalXinYKienThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val");
    var tim = _frmModalXinYKienThemNhom.getControl("tim").val();
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        tim: tim,
        arr_cnhanh: arr_cnhanh,
        trang: trang,
        so_dong: 7
    };
    ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: [] });
    $("#modalXinYKienThemNhomDSCanBo_pagination").html("");
    if (obj.arr_cnhanh == "" || trang=="") {
        return;
    }   
    var _service = new Service();
    _service.postData("/carclaim/carclaimcommon/layNsdYKienTheoChiNhanh", obj).then(res => {
        if (res.state_info.status !== "OK") {
            var _notifyService = new NotifyService();
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: res.data_info.data }, () => {
            if (hanh_dong=="CHON_CAN_BO") {
                var can_bo_chon = _frmModalXinYKienThemNhom.getControl("can_bo_chon").val();
                var arr_cb = can_bo_chon.split(";").where(n => n != "");
                if (arr_cb.length>0) {
                    for (var i = 0; i < arr_cb.length; i++) {
                        $("#modalXinYKienThemNhomDSCanBo input[type='checkbox'][data-val='" + arr_cb[i] + "']").prop("checked", true);
                    }
                }
            }
        });
        $("#modalXinYKienThemNhomDSCanBo_pagination").html(ESUtil.pagingHTML("onModalXinYKienTimKiemCanBo", obj.trang, res.data_info.tong_so_dong, obj.so_dong));
    });
}
function onModalXinYKienChonCanBo(el) {
    var nsd_duyet = $(el).attr("data-val");
    var checked = $(el).is(":checked");
    var _frmModalXinYKienThemNhom = new FormService("frmModalXinYKienThemNhom");
    var can_bo_chon = _frmModalXinYKienThemNhom.getControl("can_bo_chon").val();
    var arr = can_bo_chon.split(";").where(n => n != "");
    arr = arr.removeItem(n => n == nsd_duyet);
    if (checked) {
        arr.push(nsd_duyet);
    }
    var can_bo_chon_new = "";
    for (var i = 0; i < arr.length; i++) {
        if (can_bo_chon_new == "") {
            can_bo_chon_new = arr[i];
        }
        else {
            can_bo_chon_new += ";"+ arr[i];
        }
    }
    _frmModalXinYKienThemNhom.getControl("can_bo_chon").setValue(can_bo_chon_new);
}
function onModalXinYKienGridXoaNsd(ma_chi_nhanh_duyet, nsd_duyet) {
    var dsCanBo = layDsNsdXinYKien();
    dsCanBo = dsCanBo.removeItem(n => n.ma_chi_nhanh_duyet == ma_chi_nhanh_duyet && n.nsd_duyet == nsd_duyet);
    ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: dsCanBo });
}
function onModalXinYKienGridXemCTNoiDung(ma_chi_nhanh_duyet, nsd_duyet) {
    var _service = new Service();
    var _notifyService = new NotifyService();
    var _frmModalXinYKien = new FormService("frmModalXinYKien");
    var obj = {
        so_id_yk: _frmModalXinYKien.getControl("lan").val(),
        nsd_duyet: nsd_duyet
    };
    _service.postData("/carclaim/carclaimcommon/layNoiDungYKien", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("ModalXinYKienNoiDungTemplate", "ModalXinYKienNoiDung", { danh_sach: res.data_info });
    });
}
function layDsNsdXinYKien() {
    var otArr = [];
    $("#ModalXinYKienGrid tr.divItemDsNguoiDuyet").each(function (e) {
        var json = { ma_chi_nhanh_duyet: "", ten_cnhanh_duyet: "", nsd_duyet: "", ten_nsd_duyet: "", trang_thai_y_kien:""};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("a.combobox").each(function (el) {
                var field = $(this).attr("data-field");
                json[field] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function ModalTrinhXinYKienService(title = undefined) {
    this.modalId = "modalXinYKien";
    this.modalXinYKienThemNhom = new ModalFullScreenService("modalXinYKienThemNhom", "");
    this.frmModalXinYKienThemNhom = new FormService("frmModalXinYKienThemNhom");
    this.form = new FormService("frmModalXinYKien");
    this.title = title;
    this.lan_trinh_moi = [{ so_id_yk: 0, lan: "Lần xin ý kiến mới", trang_thai_ten: "Xin ý kiến mới" }]
    this.objDanhMuc = null;
    this.thongBao = null;
    this.data = null;
    this.callback = null;
    this.ds_can_bo_duyet = [];//{ma_chi_nhanh_duyet:"", ten_cnhanh_duyet:"", nsd_duyet:"", ten_nsd_duyet:""}
    this.layChiTietTrinhTheoHS = function (obj, callback = undefined) {
        var _instance = this;
        var _service = new Service();
        _service.postData("/carclaim/carclaimcommon/layTrinhXinYKien", obj).then(res => {
            if (res.state_info.status !== "OK") {
                var _notifyService = new NotifyService();
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _instance.objDanhMuc = res.data_info;
            $("#ModalXinYKien_btnThemLanXinYKien").removeClass("d-none");
            $("#ModalXinYKien_btnHuyThemLanXinYKien").addClass("d-none");
            $("#modalXinYKien_btnKetThucTrinhXinYKien").addClass("d-none");
            
            ESUtil.genHTML("ModalXinYKienNoiDungTemplate", "ModalXinYKienNoiDung", { danh_sach: [] });
            ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: [] });
            ESUtil.genHTML("modalXinYKienChonDonViDanhSachTemplate", "modalXinYKienChonDonViDanhSach", { danh_sach: _.sortBy(_instance.objDanhMuc.don_vi, x => x.ten_tat)});
            _instance.form.getControl("nd_y_kien").setValue("");
            _instance.form.getControl("muc_do_ut").setDataSource(arr_muc_do_ut, "ten", "ma", "Chọn mức độ ưu tiên", "");
            _instance.form.getControl("so_id_nhom_y_kien_mau").setDataSource(_instance.objDanhMuc.nhom_trinh, "ten", "ma", "Chọn nhóm trình xin ý kiến", "");
            _instance.form.getControl("lan").readOnly(false);
            if (_instance.objDanhMuc.lan_trinh.length <= 0) {
                _instance.form.getControl("lan").setDataSource(_instance.lan_trinh_moi, "lan", "so_id_yk", "Chọn lần xin ý kiến", "0");
                _instance.form.getControl("lan").readOnly(true);
                _instance.dsCanBoDuyet(0);
            }
            else {
                var so_id_yk = _instance.objDanhMuc.lan_trinh[0].so_id_yk;
                _instance.form.getControl("lan").setDataSource(_instance.objDanhMuc.lan_trinh, "lan", "so_id_yk", "Chọn lần xin ý kiến", so_id_yk);
                _instance.dsCanBoDuyet(so_id_yk);
            }
            if (callback) {
                callback(res.data_info);
            }
        });
    }
    this.dsCanBoDuyet = function (so_id_yk) {
        var _instance = this;
        $("#modalXinYKien_btnTrinhXinYKien").addClass("d-none");
        $("#modalXinYKien_btnHuyTrinhXinYKien").addClass("d-none");
        $("#modalXinYKien_btnLuuXinYKien").addClass("d-none");
        $("#modalXinYKien_btnLuuVaGuiXinYKien").addClass("d-none");
        $("#modalXinYKien_btnLuuDongXinYKien").addClass("d-none");
        $("#modalXinYKien_btnKetThucTrinhXinYKien").addClass("d-none");

        $("#ModalXinYKienGridTrangThaiYKien").html("Xin ý kiến mới");
        ESUtil.genHTML("ModalXinYKienNoiDungTemplate", "ModalXinYKienNoiDung", { danh_sach: [] });

        _instance.form.getControl("muc_do_ut").setValue("");
        _instance.form.getControl("nd_y_kien").setValue("");
        _instance.form.getControl("nd_y_kien").val("");
        var lanYKien = _instance.objDanhMuc.lan_trinh.where(n => n.so_id_yk == so_id_yk).firstOrDefault();
        if (lanYKien != null) {
            $("#ModalXinYKienGridTrangThaiYKien").html(lanYKien.trang_thai_ten);
            _instance.form.getControl("nd_y_kien").setValue(lanYKien.nd_y_kien);
            _instance.form.getControl("nd_y_kien").val(lanYKien.nd_y_kien);
            _instance.form.getControl("muc_do_ut").setValue(lanYKien.muc_do_ut);
            _instance.form.getControl("gio_kt").setValue(lanYKien.gio_kt);
            _instance.form.getControl("ngay_kt").setValue(lanYKien.ngay_kt);

            if (lanYKien.ngay_trinh == null && lanYKien.ngay_dong == null) {
                $("#modalXinYKien_btnTrinhXinYKien").addClass("d-none");
                $("#modalXinYKien_btnLuuXinYKien").removeClass("d-none");
                $("#modalXinYKien_btnLuuVaGuiXinYKien").removeClass("d-none");
                $("#modalXinYKien_btnLuuDongXinYKien").removeClass("d-none");
            }
            if (lanYKien.ngay_trinh != null && lanYKien.ngay_dong == null) {
                $("#modalXinYKien_btnHuyTrinhXinYKien").removeClass("d-none");
            /*    $("#modalXinYKien_btnKetThucTrinhXinYKien").removeClass("d-none");*/
            }
        }
        if (so_id_yk == 0) {
            $("#modalXinYKien_btnLuuXinYKien").removeClass("d-none");
            $("#modalXinYKien_btnLuuVaGuiXinYKien").removeClass("d-none");
            $("#modalXinYKien_btnLuuDongXinYKien").removeClass("d-none");
        }
        if (so_id_yk.toString() == "") {
            $("#modalXinYKien_btnLuuXinYKien").addClass("d-none");
            $("#modalXinYKien_btnLuuVaGuiXinYKien").addClass("d-none");
            $("#modalXinYKien_btnLuuDongXinYKien").addClass("d-none");
        }
        var dsCanBo = _instance.objDanhMuc.nsd_duyet.where(n => n.so_id_yk == so_id_yk);
        ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: dsCanBo });
    }
    this.show = function (obj, show_modal = true, callback = undefined) {
        var _instance = this;
        _instance.data = obj;
        _instance.layChiTietTrinhTheoHS(obj, res => {
            if (show_modal) {
                $('#' + this.modalId).modal('show');
            }
            if (callback) {
                callback(res);
            }
        });
    };
    this.hide = function () {
        $('#' + this.modalId).removeClass("in");
        $('#' + this.modalId).css("display", "none");
        $('.modal-backdrop').remove();
        $('#' + this.modalId).modal('hide');
    };
    this.dismiss = function (callback = undefined) {
        $('#' + this.modalId).on('hidden.bs.modal', callback);
    };
    this.css = function (attribute, value) {
        $('#' + this.modalId).css(attribute, value);
    };
    this.luuNhomXinYKien = function (callback = undefined) {
        var _notifyService = new NotifyService();
        var _frmModalXinYKienThemNhom = new FormService("frmModalXinYKienThemNhom");
        var obj = {
            ma_doi_tac: _frmModalXinYKienThemNhom.getControl("ma_doi_tac").val(),
            loai_trinh: _frmModalXinYKienThemNhom.getControl("loai_trinh").val(),
            so_id: _frmModalXinYKienThemNhom.getControl("so_id").val(),
            nghiep_vu: "XE",
            trang_thai: "D",
            ten_nhom: $("#modalXinYKienThemNhomTenNhom").val(),
            nhom_ca_nhan: $("#escs_tai_khoan").val(),
            arr_nsd: _frmModalXinYKienThemNhom.getControl("can_bo_chon").val().split(";").where(n => n != "")
        }
        if (obj.arr_nsd.length <= 0) {
            _notifyService.error("Bạn chưa chọn cán bộ xin ý kiến");
            return;
        }
        if (obj.ten_nhom.trim()=="") {
            _notifyService.error("Bạn chưa nhập tên nhóm");
            return;
        }
        var _opinionGroupService = new OpinionGroupService();
        _opinionGroupService.luuNguoiXinYKien(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmModalXinYKienThemNhom.getControl("so_id").val(res.out_value.so_id);
            _notifyService.success("Lưu thông tin nhóm trình ý kiến thành công");
            if (callback) {
                callback(res);
            }
        });
    }
    this.luuLanXinYKien = function (callback = undefined) {
        var _instance = this;
        var _service = new Service();
        var _notifyService = new NotifyService();
        if (_instance.form.isValid()) {
            var obj = {
                ma_doi_tac: _instance.data.ma_doi_tac,
                so_id_hs: _instance.data.so_id_hs,
                nv: _instance.data.nv,
                so_id_yk: _instance.form.getControl("lan").val(),
                so_id_nhom_y_kien_mau: _instance.form.getControl("so_id_nhom_y_kien_mau").val(),
                muc_do_ut: _instance.form.getControl("muc_do_ut").val(),
                gio_kt: _instance.form.getControl("gio_kt").val(),
                ngay_kt: _instance.form.getControl("ngay_kt").val().dateToNumber(),
                nhom: _instance.data.nhom,
                nd_y_kien: _instance.form.getControl("nd_y_kien").val(),
                gui_email: "K",
                arr: layDsNsdXinYKien()
            }
            if (obj.so_id_yk == "") {
                _notifyService.error("Bạn chưa chọn lần xin ý kiến");
                return;
            }
            if (obj.muc_do_ut == "") {
                _notifyService.error("Bạn chưa chọn mức độ ưu tiên");
                return;
            }
            if (obj.gio_kt == "") {
                _notifyService.error("Bạn chưa chọn giờ kết thúc");
                return;
            }
            if (obj.ngay_kt == "") {
                _notifyService.error("Bạn chưa chọn ngày kết thúc");
                return;
            }
            if (obj.ma_doi_tac == undefined || obj.ma_doi_tac == null || obj.ma_doi_tac.trim() == "" ||
                obj.so_id_hs == undefined || obj.so_id_hs == null || obj.so_id_hs == 0 || obj.so_id_hs.toString().trim() == "" ||
                obj.nhom == undefined || obj.nhom == null || obj.nhom.trim() == "") {
                _notifyService.error("Thiếu tham số xác định hồ sơ");
                return;
            }
            if (obj.nd_y_kien == undefined || obj.nd_y_kien == null || obj.nd_y_kien.trim() == "") {
                _notifyService.error("Bạn chưa nhập nội dung trình xin ý kiến");
                return;
            }
            if (obj.arr == undefined || obj.arr == null || obj.arr.length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ cho ý kiến");
                return;
            }
            var gio_kt = obj.gio_kt.timeToNumber();
            if (gio_kt.toString().length == 3) {
                gio_kt = "0" + gio_kt;
            }
            var ngay_gio_kt = parseInt(obj.ngay_kt + '' + gio_kt);
            var gio_ht = new Date().HHmm().timeToNumber();
            if (gio_ht.toString().length == 3) {
                gio_ht = "0" + gio_ht;
            }
            var ngay_ht = new Date().ddmmyyyy().dateToNumber();
            var ngay_gio_ht = parseInt(ngay_ht + '' + gio_ht);
            if (ngay_gio_kt < ngay_gio_ht) {
                _notifyService.error("Giờ kết thúc không được nhỏ hơn giờ hiện tại");
                return;
            }
            _service.postData("/carclaim/carclaimcommon/XinYKienNh", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _instance.show(_instance.data, false, resDetail => {
                    _instance.form.getControl("lan").setValue(res.out_value.so_id_yk);
                    _instance.form.getControl("lan").trigger("select2:select");
                    if (callback) {
                        callback(res);
                    }
                });
                _notifyService.success("Lưu nội dung trình xin ý kiến thành công");
            });
        }
    }
    this.OnInit = function () {
        var _instance = this;
        var modalId = this.modalId;
        if (title !== undefined && $("#" + modalId + " .modal-title") !== undefined) {
            $("#" + modalId + " .modal-title").html(title);
        }
        _instance.form.getControl("so_id_nhom_y_kien_mau").addEventChange(val => {
            ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: [] });
            if (val!="") {
                var obj = {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    so_id: val
                };
                var _opinionGroupService = new OpinionGroupService();
                _opinionGroupService.layThongTinChiTiet(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _instance.ds_can_bo_duyet = res.data_info.mau_ct;
                    ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: _instance.ds_can_bo_duyet });
                });
            }
        });
        _instance.form.getControl("lan").addEventChange(val => {
            _instance.dsCanBoDuyet(val);
        });
        $("#modalXinYKienChonDonViTimKiem").keyup(ESUtil.delay(function (e) {
            var tim = $(this).val();
            if (tim=="") {
                $("#modalXinYKienChonDonViDanhSach .modalXinYKienChonDonViDanhSachItem").removeClass("d-none");
                return;
            }
            $("#modalXinYKienChonDonViDanhSach .modalXinYKienChonDonViDanhSachItem").addClass("d-none");
            $("#modalXinYKienChonDonViDanhSach .modalXinYKienChonDonViDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");

        },500));
        $("#ModalXinYKien_btnTaoNhom").click(function () {
            _instance.frmModalXinYKienThemNhom.resetForm();
            _instance.frmModalXinYKienThemNhom.getControl("ten_nhom").readOnly(false);
            _instance.frmModalXinYKienThemNhom.getControl("hanh_dong").setValue("NHOM_TRINH");
            _instance.frmModalXinYKienThemNhom.getControl("ma_doi_tac").setValue(_instance.data.ma_doi_tac);
            _instance.frmModalXinYKienThemNhom.getControl("so_id_hs").setValue(_instance.data.so_id_hs);
            _instance.frmModalXinYKienThemNhom.getControl("loai_trinh").setValue(_instance.data.nhom);
            _instance.frmModalXinYKienThemNhom.getControl("so_id").setValue("");
            _instance.frmModalXinYKienThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val", "");
            ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: [] });
            $("#modalXinYKienThemNhomDSCanBo_pagination").html("");
            $("#modalXinYKienThemNhomTenNhom").val("");
            $("#modalXinYKienThemNhom .modal-title").html("Thông tin nhóm trình ý kiến");
            $("#divModalXinYKienThemNhomTenNhom").removeClass("d-none");
            $("#ModalXinYKien_btnLuuThemNhom").removeClass("d-none");
            $("#ModalXinYKien_btnLuuDongThemNhom").removeClass("d-none");
            $("#ModalXinYKien_btnThemCanBo").addClass("d-none");

            var so_id_nhom = _instance.form.getControl("so_id_nhom_y_kien_mau").val();
            if (so_id_nhom != undefined && so_id_nhom != null && so_id_nhom.trim() != "") {
                var obj = {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    so_id: so_id_nhom
                };
                var _opinionGroupService = new OpinionGroupService();
                _opinionGroupService.layThongTinChiTiet(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _instance.frmModalXinYKienThemNhom.getControl("so_id").setValue(so_id_nhom);
                    var ds_nsd = res.data_info.mau_ct;
                    var arr_cnhanh = [];
                    var can_bo_chon = "";
                    for (var i = 0; i < ds_nsd.length; i++) {
                        if (can_bo_chon == "") {
                            can_bo_chon = ds_nsd[i].nsd_duyet;
                        }
                        else {
                            can_bo_chon += ";"+ds_nsd[i].nsd_duyet;
                        }
                        var cnhanh = arr_cnhanh.where(n => n.ma == ds_nsd[i].ma_chi_nhanh_duyet).firstOrDefault();
                        if (cnhanh == null) {
                            arr_cnhanh.push({ ma: ds_nsd[i].ma_chi_nhanh_duyet, ten: ds_nsd[i].ten_cnhanh_duyet});
                        }
                    }
                    var text = "";
                    var ma_cnhanh = "";
                    if (arr_cnhanh.length == 1) {
                        text = arr_cnhanh[0].ten;
                        ma_cnhanh = arr_cnhanh[0].ma;
                    }
                    else if (arr_cnhanh.length > 1) {
                        text = "Đã có " + arr_cnhanh.length + " đơn vị được chọn";
                        for (var i = 0; i < arr_cnhanh.length; i++) {
                            if (ma_cnhanh == "") {
                                ma_cnhanh = arr_cnhanh[i].ma;
                            }
                            else {
                                ma_cnhanh += ";"+arr_cnhanh[i].ma;
                            }
                        }
                    }
                    _instance.frmModalXinYKienThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val", ma_cnhanh);
                    _instance.frmModalXinYKienThemNhom.getControl("ma_chi_nhanh_duyet").setValue(text);
                    _instance.frmModalXinYKienThemNhom.getControl("can_bo_chon").setValue(can_bo_chon);
                    $("#modalXinYKienThemNhomTenNhom").val(res.data_info.mau.ten_nhom);
                    onModalXinYKienTimKiemCanBo(1);
                });
            }
            _instance.modalXinYKienThemNhom.show();
        });
        $("#ModalXinYKien_btnChonDonVi").click(function () {
            var data_val = ""; var ten_dvi = "";
            var count = $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet:checked").length;
            $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet:checked").each(function () {
                var val = $(this).val();
                if (data_val == "") {
                    var dvi = _instance.objDanhMuc.don_vi.where(n => n.ma == val).firstOrDefault();
                    ten_dvi = dvi.ten_tat;
                }
                else {
                    ten_dvi = null;
                }
                if (data_val == "") {
                    data_val = val;
                }
                else if (!data_val.includes(val)) {
                    data_val += ";" + val
                }

            });
            if (ten_dvi == null && count > 1) {
                ten_dvi = "Đã có " + count + " đơn vị được chọn";
            }
            $(_modalXinYKienChonDonVi.target).attr("data-val", data_val);
            $(_modalXinYKienChonDonVi.target).val(ten_dvi);
            _modalXinYKienChonDonVi.hide();
            onModalXinYKienTimKiemCanBo(1);
        });
        $("#ModalXinYKien_btnTimKiemCanBo").click(function () {
            onModalXinYKienTimKiemCanBo(1);
        });
        $("#ModalXinYKien_btnLuuThemNhom").click(function () {
            _instance.luuNhomXinYKien(res => {
                _instance.show(_instance.data, false, resDetail => {
                    _instance.form.getControl("so_id_nhom_y_kien_mau").setValue(res.out_value.so_id);
                    _instance.form.getControl("so_id_nhom_y_kien_mau").trigger("select2:select");
                });
            });
        });
        $("#ModalXinYKien_btnLuuDongThemNhom").click(function () {
            _instance.luuNhomXinYKien(res => {
                _instance.show(_instance.data, false, resDetail => {
                    _instance.form.getControl("so_id_nhom_y_kien_mau").setValue(res.out_value.so_id);
                    _instance.form.getControl("so_id_nhom_y_kien_mau").trigger("select2:select");
                    _instance.modalXinYKienThemNhom.hide();
                });
            });
        });
        $("#ModalXinYKien_btnThemNguoiPheDuyet").click(function () {
            _instance.frmModalXinYKienThemNhom.resetForm();
            _instance.frmModalXinYKienThemNhom.getControl("ten_nhom").readOnly(false);
            _instance.frmModalXinYKienThemNhom.getControl("hanh_dong").setValue("CHON_CAN_BO");
            _instance.frmModalXinYKienThemNhom.getControl("ma_doi_tac").setValue(_instance.data.ma_doi_tac);
            _instance.frmModalXinYKienThemNhom.getControl("so_id_hs").setValue(_instance.data.so_id_hs);
            _instance.frmModalXinYKienThemNhom.getControl("loai_trinh").setValue(_instance.data.nhom);
            _instance.frmModalXinYKienThemNhom.getControl("so_id").setValue("");
            _instance.frmModalXinYKienThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val", "");
            ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: [] });
            $("#modalXinYKienThemNhomDSCanBo_pagination").html("");
            $("#modalXinYKienThemNhomTenNhom").val("");
            $("#modalXinYKienThemNhom .modal-title").html("Tìm kiếm cán bộ");
            $("#divModalXinYKienThemNhomTenNhom").addClass("d-none");
            $("#ModalXinYKien_btnLuuThemNhom").addClass("d-none");
            $("#ModalXinYKien_btnLuuDongThemNhom").addClass("d-none");
            $("#ModalXinYKien_btnThemCanBo").removeClass("d-none");
            _instance.ds_can_bo_duyet = layDsNsdXinYKien();
            var ds_can_bo_duyet = _instance.ds_can_bo_duyet;
            var can_bo_chon = "";
            if (ds_can_bo_duyet != undefined && ds_can_bo_duyet != null && ds_can_bo_duyet.length>0) {
                for (var i = 0; i < ds_can_bo_duyet.length; i++) {
                    if (can_bo_chon == "") {
                        can_bo_chon = ds_can_bo_duyet[i].nsd_duyet;
                    }
                    else {
                        can_bo_chon += ";"+ds_can_bo_duyet[i].nsd_duyet;
                    }
                }
                _instance.frmModalXinYKienThemNhom.getControl("can_bo_chon").setValue(can_bo_chon);
            }
            _instance.modalXinYKienThemNhom.show();
        });
        $("#ModalXinYKien_btnThemCanBo").click(function () {
            var _frmModalXinYKienThemNhom = new FormService("frmModalXinYKienThemNhom");
            var ma_doi_tac = _frmModalXinYKienThemNhom.getControl("ma_doi_tac").val();
            var can_bo_chon = _frmModalXinYKienThemNhom.getControl("can_bo_chon").val();
            var obj = {
                ma_doi_tac: ma_doi_tac,
                arr_nsd: can_bo_chon
            };
            if (obj.can_bo_chon == "") {
                _instance.modalXinYKienThemNhom.hide();
                return;
            }
            var _service = new Service();
            _service.postData("/carclaim/carclaimcommon/layNsdYKienTheoDanhSach", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    var _notifyService = new NotifyService();
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _instance.ds_can_bo_duyet = res.data_info;
                if (_instance.ds_can_bo_duyet == undefined || _instance.ds_can_bo_duyet == null) {
                    _instance.ds_can_bo_duyet = [];
                }
                ESUtil.genHTML("ModalXinYKienGridTemplate", "ModalXinYKienGrid", { ds_nsd: _instance.ds_can_bo_duyet });
                _instance.modalXinYKienThemNhom.hide();
            });
        });
        $("#modalXinYKien_btnLuuXinYKien").click(function () {
            _instance.luuLanXinYKien();
        });
        $("#modalXinYKien_btnLuuVaGuiXinYKien").click(function () {
            _instance.luuLanXinYKien(res => {
                $("#modalXinYKien_btnTrinhXinYKien").addClass("d-none");
                $("#modalXinYKien_btnTrinhXinYKien").trigger("click");
            });
        });
        $("#modalXinYKien_btnLuuDongXinYKien").click(function () {
            _instance.luuLanXinYKien(res => {
                _instance.hide();
            });
        });
        $("#ModalXinYKien_btnThemLanXinYKien").click(function () {
            _instance.form.getControl("lan").setDataSource(_instance.lan_trinh_moi, "lan", "so_id_yk", "Chọn lần xin ý kiến", "0");
            _instance.form.getControl("lan").readOnly(true);
            _instance.form.getControl("so_id_nhom_y_kien_mau").setValue("");
            _instance.form.getControl("so_id_nhom_y_kien_mau").trigger("select2:select");
            _instance.form.getControl("gio_kt").setValue(new Date().HHmm());
            _instance.form.getControl("ngay_kt").setValue(new Date().ddmmyyyy());
            _instance.dsCanBoDuyet(0);

            $("#ModalXinYKien_btnThemLanXinYKien").addClass("d-none");
            $("#ModalXinYKien_btnHuyThemLanXinYKien").removeClass("d-none");
        });
        $("#ModalXinYKien_btnHuyThemLanXinYKien").click(function () {
            if (_instance.objDanhMuc.lan_trinh != null && _instance.objDanhMuc.lan_trinh.length > 0) {
                var so_id_yk = _instance.objDanhMuc.lan_trinh[0].so_id_yk;
                _instance.form.getControl("lan").setDataSource(_instance.objDanhMuc.lan_trinh, "lan", "so_id_yk", "Chọn lần xin ý kiến", so_id_yk);
                _instance.form.getControl("lan").readOnly(false);
                _instance.form.getControl("so_id_nhom_y_kien_mau").setValue("");
                _instance.form.getControl("so_id_nhom_y_kien_mau").trigger("select2:select");
                _instance.dsCanBoDuyet(so_id_yk);
                $("#ModalXinYKien_btnThemLanXinYKien").removeClass("d-none");
                $("#ModalXinYKien_btnHuyThemLanXinYKien").addClass("d-none");
            }
        });
        $("#modalXinYKien_btnTrinhXinYKien").click(function () {
            var _notifyService = new NotifyService();
            _notifyService.confirm("Bạn có chắc chắn muốn trình xin ý kiến nội dung này không?", "", val => {
                var obj = {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    nv: _instance.data.nv,
                    so_id_yk: _instance.form.getControl("lan").val(),
                    hanh_dong:"TRINH_Y_KIEN",
                    gui_email: "C"
                }
                var _service = new Service();
                _service.postData("/carclaim/carclaimcommon/trinhGuiYKien", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    $("#modalXinYKien_btnKetThucTrinhXinYKien").trigger("click");
                    _notifyService.success("Trình xin ý kiến thành công");
                    _instance.show(_instance.data, false, resDetail => {
                        _instance.dsCanBoDuyet(obj.so_id_yk);
                    });
                });
            });
        });
        $("#modalXinYKien_btnHuyTrinhXinYKien").click(function () {
            var _notifyService = new NotifyService();
            _notifyService.confirm("Bạn có chắc chắn muốn hủy trình xin ý kiến nội dung này không?","", val => {
                var obj = {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    nv: _instance.data.nv,
                    so_id_yk: _instance.form.getControl("lan").val(),
                    hanh_dong: "HUY_TRINH"
                }
                var _service = new Service();
                _service.postData("/carclaim/carclaimcommon/trinhGuiYKien", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Thu hồi trình xin ý kiến thành công");
                    _instance.show(_instance.data, false, resDetail => {
                        _instance.dsCanBoDuyet(obj.so_id_yk);
                    });
                });
            });
        });
        $("#modalXinYKien_btnKetThucTrinhXinYKien").click(function () {
            var _notifyService = new NotifyService();
            var obj = {
                ma_doi_tac: _instance.data.ma_doi_tac,
                nv: _instance.data.nv,
                so_id_yk: _instance.form.getControl("lan").val(),
                hanh_dong: "DONG_Y_KIEN"
            }
            var _service = new Service();
            _service.postData("/carclaim/carclaimcommon/trinhGuiYKien", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _instance.show(_instance.data, false, resDetail => {
                    _instance.dsCanBoDuyet(obj.so_id_yk);
                });
            });
        });
    };
    this.OnInit();
}
