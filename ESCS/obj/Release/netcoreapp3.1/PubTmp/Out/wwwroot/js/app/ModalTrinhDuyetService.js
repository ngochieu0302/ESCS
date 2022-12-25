var _modalTrinhDuyetChonDonVi = new ModalDragService("modalTrinhDuyetChonDonVi", undefined, "bottom");
function onModalTrinhDuyetChonDonVi(el, placement = "bottom") {
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalTrinhDuyetChonDonViDanhSach .modalChonDviDuyet").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalTrinhDuyetChonDonViDanhSach .modalChonDviDuyet[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalTrinhDuyetChonDonVi.setPlacement(placement);
    _modalTrinhDuyetChonDonVi.show(el);
}
function onFocus(el) {
    $(el).focus();
}
function onModalTrinhDuyetChonPheDuyetChinh(el, phan_cap) {
    $("#modalTrinhDuyetThemNhomDSCanBo input[data-field='phe_duyet']").prop("checked", false);
    $(el).prop("checked", true);
}
function onModalTrinhDuyetChonCanBo(el) {
    var nsd_duyet = $(el).attr("data-val");
    var checked = $(el).is(":checked");
    if (checked) {
        $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + nsd_duyet + "']").removeAttr("disabled");
    }
    else {
        $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + nsd_duyet + "']").attr("disabled", "disabled");
        $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + nsd_duyet + "']").prop("checked", false);
    }
}
function onSearchCanBoTrinhDuyet(el) {
    var searchText = $(el).val();
    if (searchText === "") {
        $(".divItemDsCanBoTrinh").removeClass("d-none");
    }
    else {
        $(".divItemDsCanBoTrinh").addClass("d-none");
        $(".divItemDsCanBoTrinh[data-text*='" + searchText + "']").removeClass("d-none");
    }
}
function getDataTableThemNhom() {
    var otArr = [];
    $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
                if (name == "nsd_duyet") {
                    json["chon"] = $(this).is(":checked");
                    json["nsd"] = json[name];
                }
                if (name == "phe_duyet") {
                    json["phe_duyet"] = $(this).is(":checked") ? 1 : 0;
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function getTableDsNguoiDuyet() {
    var otArr = [];
    $("#ModalTrinhDuyetGrid tr.divItemDsNguoiDuyet").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).val();
                if (name =="phan_cap") {
                    json[name] = "";
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function ModalTrinhDuyetService(title = undefined) {
    this.tuDongGuiEmailKhiDuyet = "C";
    this.modalId = "ModalTrinhDuyet";
    this.form = new FormService("frmModalTrinhDuyet");
    this.frmModalTrinhDuyetThemNhom = new FormService("frmModalTrinhDuyetThemNhom");
    this.modalTrinhDuyetThemNhom = new ModalFullScreenService("modalTrinhDuyetThemNhom", "");
    this.title = title;
    this.objDanhMuc = null;
    this.thongBao = null;
    this.data = null;
    this.callback = null;
    this.luuNhomTrinhDuyet = function (callback = undefined) {
        var _instance = this;
        var _notifyService = new NotifyService();
        var _frmModalTrinhDuyetThemNhom = new FormService("frmModalTrinhDuyetThemNhom");
        if (!_frmModalTrinhDuyetThemNhom.isValid()) {
            return;
        }
        var obj = _frmModalTrinhDuyetThemNhom.getJsonData();
        obj.arr = getDataTableThemNhom();
        obj.arr = obj.arr.where(n => n.chon);
        if (obj.arr.length <= 0) {
            _notifyService.error("Bạn chưa chọn cán bộ phê duyệt");
            return;
        }
        var phe_duyet_chinh = obj.arr.where(n => n.phe_duyet == 1).firstOrDefault();
        if (phe_duyet_chinh == null) {
            _notifyService.error("Bạn chưa chọn cán bộ duyệt chính");
            return;
        }
        for (var i = 0; i < obj.arr.length; i++) {
            delete obj.arr[i].ma_doi_tac_duyet;
            delete obj.arr[i].nsd_duyet;
            delete obj.arr[i].chon;
            obj.arr[i].phe_duyet = obj.arr[i].phe_duyet.toString();
        }
        obj.ma_doi_tac = $("#escs_ma_doi_tac").val();
        obj.ma_chi_nhanh = $("#escs_ma_chi_nhanh").val();
        obj.nhom_ca_nhan = obj.so_id == "" ? $("#escs_tai_khoan").val() : obj.nhom_ca_nhan;
        obj.ngay_ad = obj.so_id == "" ? new Date().ddmmyyyy().dateToNumber() : obj.ngay_ad;
        obj.loai_trinh = _instance.data.loai_trinh;
        obj.nghiep_vu = _instance.data.nghiep_vu;
        obj.trang_thai = "D";
        delete obj["ma_chi_nhanh_duyet"];
        delete obj["tim"];
        var _service = new Service();
        _service.postData("/admin/configapprove/save", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var so_id = res.out_value.so_id;
            var data = _instance.data;
            _instance.layChitiet(data, undefined, () => {
                _instance.form.getControl("so_id_trinh_mau").setValue(so_id);
                _instance.form.getControl("so_id_trinh_mau").trigger("select2:select");
            });
            _notifyService.success("Lưu nhóm trình duyệt thành công");
            if (callback) {
                callback(res);
            }
        });
    }
    this.setTitle = function (title) {
        var id = this.modalId;
        if (title !== undefined && $("#" + id + " .modal-title") !== undefined) {
            $("#" + id + " .modal-title").html(title);
        }
    };
    this.layChitiet = function (obj, hanh_dong = undefined, callback = undefined) {
        var _instance = this;
        _instance.data = obj;
        if (!_instance.data.nghiep_vu_khac) {
            _instance.data.nghiep_vu_khac = false;
        }
        var _service = new Service();
        var _commonService = new CommonService;

        var _form = this.form;
        _form.resetForm();
        _form.clearErrorMessage();

        $("#ModalTrinhDuyet_btnLuuTrinhDuyet").hide();
        $("#ModalTrinhDuyet_btnHuyTrinhDuyet").hide();
        _form.getControl("so_id_trinh_mau").readOnly();
        _form.getControl("nd").readOnly();

        ESUtil.genHTML("ModalTrinhDuyetGridTemplate", "ModalTrinhDuyetGrid", { ds_nsd: [] });
        _service.all([
            _commonService.InPdf({
                ma_mau_in: _instance.layFileHienThi(_instance.data.loai_trinh, _instance.data.nguon, _instance.data.hanh_dong),
                so_id: _instance.data.so_id,
                loai: _instance.data.loai_trinh,
                ma_dt_trinh: "",
                ma_doi_tac: _instance.data.ma_doi_tac,
                ma_doi_tac_ql: _instance.data.ma_doi_tac_ql
            }),
            _service.postData("/carclaim/carclaimcommon/laythongtinduyethoso", obj)
        ]).then(arrRes => {
            var res0 = arrRes[0];
            var res1 = arrRes[1];
            if (res1.state_info.status !== "OK") {
                var _notifyService = new NotifyService();
                _notifyService.error(res1.state_info.message_body);
                return;
            }

            if (hanh_dong == 'show_modal') {
                $("#divToTrinhDuyetTabItem").trigger('click');
            }

            PDFObject.embed("data:application/pdf;base64," + res0,
                "#viewHtmlTrinhDuyet", {
                pdfOpenParams: {
                    navpanes: 0,
                    statusbar: 0,
                    toolbar: 0,
                    view: "FitH",
                    pagemode: "bookmarks"
                }
            });

            _instance.objDanhMuc = res1.data_info;
            var ls = res1.data_info.ls_trinh_duyet;
            ESUtil.genHTML("modalTrinhDuyetChonDonViDanhSachTemplate", "modalTrinhDuyetChonDonViDanhSach", { danh_sach: _instance.objDanhMuc.don_vi });

            _form.getControl("so_id_trinh_mau").setDataSource(_instance.objDanhMuc.nhom, "ten_nhom", "so_id", "Chọn nhóm duyệt", "");

            ESUtil.genHTML("ModalTrinhDuyetGridLichSuTemplate", "ModalTrinhDuyetGridLichSu", { lich_su: ls });
            var phe_duyet = ls.where(n => n.trang_thai == "C" && n.phe_duyet == "1" && n.loai == obj.loai_trinh).firstOrDefault();
            if (phe_duyet != null) {
                $("#ModalTrinhDuyet_btnLuuTrinhDuyet").hide();
                $("#ModalTrinhDuyet_btnHuyTrinhDuyet").show();
                _form.getControl("so_id_trinh_mau").readOnly();
                _form.getControl("nd").readOnly();
                _form.getControl("bt").val(phe_duyet.bt);
                _form.getControl("so_id_trinh_mau").val(phe_duyet.so_id_nhom_trinh);
                _form.getControl("nd").val(phe_duyet.nd);
                _form.getControl("so_id_trinh_mau").trigger("select2:select");
            }
            else {
                $("#ModalTrinhDuyet_btnLuuTrinhDuyet").show();
                $("#ModalTrinhDuyet_btnHuyTrinhDuyet").hide();
                _form.getControl("so_id_trinh_mau").readOnly(false);
                _form.getControl("nd").readOnly(false);
            }
            if (callback) {
                callback();
            }
        });
    }
    this.show = function (obj, fnSuccess, zIndex = undefined) {
        var _instance = this;
        _instance.callback = fnSuccess;
        $("#ModalTrinhDuyet_btnXoaNhomTrinh").addClass("d-none");
        this.layChitiet(obj, hanh_dong = 'show_modal', () => {
            $('#' + this.modalId).modal('show');
            if (zIndex) {
                $('#' + this.modalId).css("z-index", zIndex);
            }
            _instance.anHienControllTheoNghiepVu();
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
    this.anHienPheDuyet = function () {
        $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet']").attr("disabled", "disabled");
        $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='nsd_duyet']:checked").each(function (e) {
            var nsd_duyet = $(this).attr("data-val");
            $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + nsd_duyet + "']").removeAttr("disabled");
        });
    };
    this.layFileHienThi = function (loai_trinh, nguon, hanh_dong) {
        var _instance = this;
        if (_instance.data.ma_doi_tac == "OPES") {
            if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD")
                return "OPES_BCGD";
            if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN")
                return "OPES_DE_XUAT_PHUONG_AN_SC";
            if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH")
                return "OPES_TO_TRINH_BOI_THUONG";
            if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG")
                return "OPES_TO_TRINH_BOI_THUONG";
            if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI')
                return "OPES_TO_TRINH_TU_CHOI_BT";
            if (loai_trinh == 'XE_TRINH_DUYET_TAM_UNG_BT')
                return "OPES_TAM_UNG_BOI_THUONG";
            if (loai_trinh == 'TRINH_THANH_TOAN')
                return "OPES_DE_NGHI_THANH_TOAN_BT";
            return;
        }
        if (loai_trinh == "XE_TRINH_DUYET_BAO_CAO_GD")
            return "ESCS_BCGD";
        if (loai_trinh == "XE_MAY_TRINH_DUYET_BAO_CAO_GD")
            return "ESCS_BCGD_XE_MOTO";

        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN" && !_instance.data.nghiep_vu_khac) 
            return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH" && !_instance.data.nghiep_vu_khac) 
            return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";

        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN" && _instance.data.nghiep_vu_khac)
            return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";
        if (loai_trinh == 'XE_TRINH_DUYET_DUYET_GIA' && hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH" && _instance.data.nghiep_vu_khac)
            return "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA";

        if (loai_trinh == "XE_TRINH_DUYET_BOI_THUONG") 
            return "ESCS_TO_TRINH_BOI_THUONG";
        if (loai_trinh == 'XE_TRINH_DUYET_TU_CHOI') 
            return "ESCS_TO_TRINH_TU_CHOI_BT";
        if (loai_trinh == 'NG_TRINH_DUYET_BAO_LANH')
            return "ESCS_NG_TO_TRINH_DUYET_BAO_LANH";

        if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && (nguon == "BLVP" || nguon == 'CSYT')) 
            return "ESCS_NG_TRINH_TU_CHOI_BLVP";
        if (loai_trinh == 'NG_TRINH_DUYET_TU_CHOI' && (nguon == "HSTT" || nguon == 'MOBILE')) 
            return "ESCS_NG_TO_TRINH_TU_CHOI_BH";

        if (loai_trinh == 'NG_TRINH_DUYET_DUYET_GIA') 
            return "ESCS_TT_DXBT";
        if (loai_trinh == 'NG_TRINH_DUYET_BOI_THUONG') 
            return "ESCS_TT_DXBT";
        if (loai_trinh == 'TRINH_THANH_TOAN') 
            return "ESCS_TTBT";
        if (loai_trinh == 'XE_TRINH_DUYET_TAM_UNG_BT') 
            return "ESCS_TAM_UNG_BT";
        if (loai_trinh == 'TRINH_DUYET_HO_SO_GIAM_DINH') {
            return "ESCS_TRINH_GIAM_DINH_HS";
        }
    }
    this.anHienControllTheoNghiepVu = function () {
        var _instance = this;
        var nv = _instance.data.nghiep_vu;
        $("#ModalTrinhDuyetNhomPheDuyet").removeClass("col-3");
        $("#ModalTrinhDuyetNhomPheDuyet").addClass("col-5");//Mặc định

        $("#ModalTrinhDuyetNoiDungTrinh").removeClass("col-4");
        $("#ModalTrinhDuyetNoiDungTrinh").addClass("col-5");//Mặc định
        $("#ModalTrinhDuyetEmailNhanKhiDuyet").addClass("d-none");//Mặc định
        $("#ModalTrinhDuyetNutTrinh").addClass("col-1");
        if (nv != undefined && nv != null && nv == "NG") {
            $("#ModalTrinhDuyetEmailNhanKhiDuyet").removeClass("d-none");

            $("#ModalTrinhDuyetNhomPheDuyet").addClass("col-3");
            $("#ModalTrinhDuyetNhomPheDuyet").removeClass("col-5");

            $("#ModalTrinhDuyetNoiDungTrinh").addClass("col-4");
            $("#ModalTrinhDuyetNoiDungTrinh").removeClass("col-5");
        }
    }
    this.luuCauHinhEmail = function (obj) {
        var _instance = this;
        var _service = new Service();
        if (obj.nv != undefined && obj.nv != null && obj.nv == "NG") {
            var objCauHinh = {
                nv: "NG",
                tu_dong: "K",
                so_id: _instance.data.so_id,
                loai_trinh: _instance.data.loai_trinh,
                email_nhan: $("#ModalTrinhDuyetEmailNhanKhiDuyet_Email").val()
            }
            var tu_dong = $("#ModalTrinhDuyetEmailNhanKhiDuyetTuDong").is(":checked");
            if (tu_dong) {
                objCauHinh.tu_dong = "C";
            }
            var urlCauHinhEmail = "/carclaim/carclaimcommon/luuCauHinhGuiEmail";
            _service.postData(urlCauHinhEmail, objCauHinh).then(res => { });
        }
    }
    this.OnInit = function () {
        var _instance = this;
        var modalId = this.modalId;
        var _form = this.form;
        var _service = new Service();
        if (title !== undefined && $("#" + modalId + " .modal-title") !== undefined) {
            $("#" + modalId + " .modal-title").html(title);
        }
        _form.getControl("so_id_trinh_mau").addEventChange(val => {
            $("#ModalTrinhDuyet_btnXoaNhomTrinh").addClass("d-none");
            if (_instance.objDanhMuc.nhom_ct != null) {
                var nsd = _instance.objDanhMuc.nhom_ct.where(n => n.so_id == val);
                nsd.sort((a, b) => a.stt_duyet - b.stt_duyet);
                ESUtil.genHTML("ModalTrinhDuyetGridTemplate", "ModalTrinhDuyetGrid", { ds_nsd: nsd });
            }
            var tai_khoan = $("#escs_tai_khoan").val();
            var nhom = _instance.objDanhMuc.nhom.where(n => n.so_id == val).firstOrDefault();
            if (nhom != null && nhom.nhom_ca_nhan == tai_khoan) {
                $("#ModalTrinhDuyet_btnXoaNhomTrinh").removeClass("d-none");
            }
        });
        $("#ModalTrinhDuyet_btnLuuTrinhDuyet").click(function () {
            if (_form.isValid()) {
                var _notifyService = new NotifyService();
                var obj = _form.getJsonData();
                obj.ma_doi_tac = _instance.data.ma_doi_tac;
                obj.so_id = _instance.data.so_id;
                obj.nv = _instance.data.nghiep_vu;
                obj.loai = _instance.data.loai_trinh;
                obj.hanh_dong = _instance.data.hanh_dong;
                obj.ma_dt_trinh = _instance.data.ma_dt_trinh;
                obj.pm = _instance.data.pm;

                obj.create_file = _instance.data.create_file||"";
                obj.create_file_sign ="";
                obj.remove_file = _instance.data.remove_file||"";

                obj.arr = getTableDsNguoiDuyet();
                if (obj.arr.length <= 0) {
                    _notifyService.error("Không xác định người phê duyệt");
                    return;
                }
                var duyet_chinh = obj.arr.where(n => n.phe_duyet == "1").firstOrDefault();
                if (duyet_chinh == null) {
                    _notifyService.error("Không xác định người duyệt chính");
                    return;
                }
                if (duyet_chinh.phan_cap != null && duyet_chinh.phan_cap != "" && duyet_chinh.phan_cap.trim() =="Phân cấp không phù hợp") {
                    _notifyService.error("Người duyệt chính phân cấp không phù hợp");
                    return;
                }
                var thong_bao = "Bạn có chắc chắn trình duyệt hồ sơ không?";
                if (_instance.thongBao != undefined && _instance.thongBao != null) {
                    thong_bao = _instance.thongBao;
                }
                var _notifyService = new NotifyService();
                //Lưu cấu hình email nhận
                if (_instance.data.hanh_dong == "BOI_THUONG_BAO_LANH") {
                    _notifyService.trinhDuyetBoiThuong(thong_bao, type => {
                        obj.ma = _instance.data.ma;
                        obj.gui_email = "C";
                        obj.hanh_dong = type == "BOI_THUONG_BAO_LANH" ?"BOI_THUONG_BAO_LANH":"";
                        var url = "/carclaim/carclaimcommon/trinhDuyet";
                        _service.postData(url, obj).then(res => {
                            if (res.state_info.status !== "OK") {
                                _notifyService.error(res.state_info.message_body);
                                return;
                            }
                            _instance.layChitiet(_instance.data);
                            if (_instance.callback) {
                                _instance.callback("TRINH_DUYET", res);
                            }
                            $('#' + _instance.modalId).modal('hide');
                            _notifyService.success("Trình duyệt thành công");
                        });
                        _instance.luuCauHinhEmail(obj);
                    });
                }
                else if (_instance.data.hanh_dong == "PHUONG_AN" ||_instance.data.hanh_dong == "PHUONG_AN_BOI_THUONG_BAO_LANH") {
                    _notifyService.trinhDuyetBoiThuongPA(thong_bao, type => {
                        obj.ma = _instance.data.ma;
                        obj.gui_email = "C";
                        obj.hanh_dong = _instance.data.hanh_dong;
                        var url = "/carclaim/carclaimcommon/trinhDuyet";
                        _service.postData(url, obj).then(res => {
                            if (res.state_info.status !== "OK") {
                                _notifyService.error(res.state_info.message_body);
                                return;
                            }
                            _instance.layChitiet(_instance.data);
                            if (_instance.callback) {
                                _instance.callback("TRINH_DUYET", res);
                            }
                            $('#' + _instance.modalId).modal('hide');
                            _notifyService.success("Trình duyệt thành công");
                        });
                        _instance.luuCauHinhEmail(obj);
                    });
                }
                else {
                    _notifyService.confirmProcessed(thong_bao, type => {
                        obj.ma = _instance.data.ma;
                        obj.gui_email = type == "TRINH_DUYET_VA_GUI_EMAIL" ? "C" : "K";
                        var url = "/carclaim/carclaimcommon/trinhDuyet";
                        _service.postData(url, obj).then(res => {
                            if (res.state_info.status !== "OK") {
                                _notifyService.error(res.state_info.message_body);
                                return;
                            }
                            _instance.layChitiet(_instance.data);
                            if (_instance.callback) {
                                _instance.callback("TRINH_DUYET", res);
                            }
                            $('#' + _instance.modalId).modal('hide');
                            _notifyService.success("Trình duyệt thành công");
                        });
                        _instance.luuCauHinhEmail(obj);
                    });
                }
            }
        });
        $("#ModalTrinhDuyet_btnHuyTrinhDuyet").click(function () {
            if (_form.isValid()) {
                var obj = _form.getJsonData();
                obj.ma_doi_tac = _instance.data.ma_doi_tac;
                obj.so_id = _instance.data.so_id;
                obj.nv = _instance.data.nghiep_vu;
                obj.loai = _instance.data.loai_trinh;
                obj.ma_dt_trinh = _instance.data.ma_dt_trinh;
                obj.pm = _instance.data.pm;
                obj.remove_file = _instance.data.remove_file || "";

                var _notifyService = new NotifyService();
                _notifyService.confirm("Bạn có chắc chắn hủy trình duyệt hồ sơ này không?", "", () => {
                    var url = "";
                    url = "/carclaim/carclaimcommon/huyTrinhDuyet";
                    _service.postData(url, obj).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        _instance.layChitiet(_instance.data);
                        if (_instance.callback) {
                            _instance.callback("HUY_TRINH", res);
                        }
                        $('#' + _instance.modalId).modal('hide');
                        _notifyService.success("Hủy trình duyệt thành công");
                    });
                });
            }
        });
        $("#ModalTrinhDuyet_btnTaoNhomTrinh").click(function () {
            var _notifyService = new NotifyService();
            var loai_trinh = _instance.data.loai_trinh;
            var phe_duyet = _instance.objDanhMuc.ls_trinh_duyet.where(n => n.trang_thai == "C" && n.phe_duyet == "1" && n.loai == loai_trinh).firstOrDefault();
            if (phe_duyet != null) {
                _notifyService.error("Vui lòng thực hiện thao tác hủy trình để thực hiện thao tác");
                return;
            }
            _instance.frmModalTrinhDuyetThemNhom.resetForm();
            _instance.frmModalTrinhDuyetThemNhom.getControl("ten_nhom").readOnly(false);
            _instance.frmModalTrinhDuyetThemNhom.getControl("so_id").setValue("");
            _instance.frmModalTrinhDuyetThemNhom.getControl("ngay_ad").setValue("");
            _instance.frmModalTrinhDuyetThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val","");
            ESUtil.genHTML("modalTrinhDuyetChonDonViDanhSachTemplate", "modalTrinhDuyetChonDonViDanhSach", { danh_sach: _instance.objDanhMuc.don_vi });
            ESUtil.genHTML("modalTrinhDuyetThemNhomDSCanBoTemplate", "modalTrinhDuyetThemNhomDSCanBo", { danh_sach: [] });
            _instance.modalTrinhDuyetThemNhom.show();
        });
        $("#ModalTrinhDuyet_btnTrinhDuyetChonDonVi").click(function () {
            var data_val = ""; var ten_dvi = "";
            var count = $("#modalTrinhDuyetChonDonViDanhSach .modalChonDviDuyet:checked").length;
            $("#modalTrinhDuyetChonDonViDanhSach .modalChonDviDuyet:checked").each(function () {
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
            $(_modalTrinhDuyetChonDonVi.target).attr("data-val", data_val);
            $(_modalTrinhDuyetChonDonVi.target).val(ten_dvi);
            ESUtil.genHTML("modalTrinhDuyetThemNhomDSCanBoTemplate", "modalTrinhDuyetThemNhomDSCanBo", { danh_sach: [] });
            if (data_val != "") {
                _service.postData("/admin/usermanagement/layDSCanBoTheoDonVi", {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    so_id: _instance.data.so_id,
                    nv: _instance.data.nghiep_vu,
                    pm: _instance.data.pm,
                    loai: _instance.data.loai_trinh,
                    arr_cnhanh: data_val
                }).then(res => {
                    if (res.state_info.status !== "OK") {
                        var _notifyService = new NotifyService();
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _instance.objDanhMuc.ds_can_bo = res.data_info;
                    var id_nhom = _instance.frmModalTrinhDuyetThemNhom.getControl("so_id").val();
                    var dsCanBo = _instance.objDanhMuc.nhom_ct.where(n => n.so_id == id_nhom);
                    if (_instance.objDanhMuc.ds_can_bo != null && _instance.objDanhMuc.ds_can_bo.length > 0) {
                        for (var i = 0; i < _instance.objDanhMuc.ds_can_bo.length; i++) {
                            var item = _instance.objDanhMuc.ds_can_bo[i];
                            item.chon = 0;
                            item.chinh = 0;
                            var cb = dsCanBo.where(n => n.nsd_duyet == item.ma).firstOrDefault();
                            if (cb != null) {
                                item.chon = 1;
                                if (cb.phe_duyet == "1") {
                                    item.chinh = 1;
                                }
                            }
                        }
                        _instance.objDanhMuc.ds_can_bo.sort((a, b) => b.chon - a.chon);
                    }

                    ESUtil.genHTML("modalTrinhDuyetThemNhomDSCanBoTemplate", "modalTrinhDuyetThemNhomDSCanBo", { danh_sach: _instance.objDanhMuc.ds_can_bo }, () => {
                        for (var i = 0; i < dsCanBo.length; i++) {
                            $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='nsd_duyet'][data-val='" + dsCanBo[i].nsd_duyet + "']").prop("checked", true);
                            if (dsCanBo[i].phe_duyet == "1") {
                                $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + dsCanBo[i].nsd_duyet + "']").prop("checked", true);
                            }
                        }
                        _instance.anHienPheDuyet();
                    });
                });
            }
            _modalTrinhDuyetChonDonVi.hide();
        });
        $("#ModalTrinhDuyet_btnLuuThemNhomTrinhDuyet").click(function () {
            _instance.luuNhomTrinhDuyet();
        });
        $("#ModalTrinhDuyet_btnLuuDongThemNhomTrinhDuyet").click(function () {
            _instance.luuNhomTrinhDuyet(res => {
                _instance.modalTrinhDuyetThemNhom.hide();
            });
        });
        $("#ModalTrinhDuyet_btnThemNguoiPheDuyet").click(function () {
            var _notifyService = new NotifyService();
            var id_nhom = _instance.form.getControl("so_id_trinh_mau").val();
            if (id_nhom == "") {
                _notifyService.error("Vui lòng chọn nhóm trình để thêm cán bộ vào nhóm");
                return;
            }
            var loai_trinh = _instance.data.loai_trinh;
            var phe_duyet = _instance.objDanhMuc.ls_trinh_duyet.where(n => n.trang_thai == "C" && n.phe_duyet == "1" && n.loai == loai_trinh).firstOrDefault();
            if (phe_duyet != null) {
                _notifyService.error("Vui lòng thực hiện thao tác hủy trình để thực hiện thao tác");
                return;
            }
            var objNhom = _instance.objDanhMuc.nhom.where(n => n.so_id == id_nhom).firstOrDefault();
            if (objNhom.nhom_ca_nhan != $("#escs_tai_khoan").val()) {
                _notifyService.error("Không chỉnh sửa nhóm trình duyệt chung hoặc của người khác");
                return;
            }
            _instance.frmModalTrinhDuyetThemNhom.getControl("ten_nhom").readOnly(true);
            _instance.frmModalTrinhDuyetThemNhom.getControl("ten_nhom").setValue(objNhom.ten_nhom);
            _instance.frmModalTrinhDuyetThemNhom.getControl("so_id").setValue(objNhom.so_id);
            _instance.frmModalTrinhDuyetThemNhom.getControl("ngay_ad").setValue(objNhom.ngay_ad);
            _instance.frmModalTrinhDuyetThemNhom.getControl("nhom_ca_nhan").setValue(objNhom.nhom_ca_nhan);

            var dsCanBo = _instance.objDanhMuc.nhom_ct.where(n => n.so_id == id_nhom);
            var ma_dvi_duyet = "";
            var ten_dvi_duyet = "";
            if (dsCanBo.length > 0) {
                for (var i = 0; i < dsCanBo.length; i++) {
                    if (ma_dvi_duyet == "") {
                        ma_dvi_duyet = dsCanBo[i].ma_chi_nhanh_duyet;
                    }
                    else if (!ma_dvi_duyet.includes(dsCanBo[i].ma_chi_nhanh_duyet)) {
                        ma_dvi_duyet += ";" + dsCanBo[i].ma_chi_nhanh_duyet;
                    }
                }
                if (ma_dvi_duyet.split(";").where(n=>n !="").length == 1) {
                    var dvi = _instance.objDanhMuc.don_vi.where(n => n.ma == ma_dvi_duyet).firstOrDefault();
                    ten_dvi_duyet = dvi.ten;
                }
                else {
                    ten_dvi_duyet = "Đã có " + ma_dvi_duyet.split(";").where(n => n != "").length + " đơn vị được chọn";
                }
            }
            _instance.frmModalTrinhDuyetThemNhom.getControl("ma_chi_nhanh_duyet").attr("data-val", ma_dvi_duyet);
            _instance.frmModalTrinhDuyetThemNhom.getControl("ma_chi_nhanh_duyet").setValue(ten_dvi_duyet);
            if (ma_dvi_duyet != "") {
                _service.postData("/admin/usermanagement/layDSCanBoTheoDonVi", {
                    ma_doi_tac: _instance.data.ma_doi_tac,
                    so_id: _instance.data.so_id,
                    nv: _instance.data.nghiep_vu,
                    pm: _instance.data.pm,
                    loai: _instance.data.loai_trinh,
                    arr_cnhanh: ma_dvi_duyet
                }).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    if (res.data_info != null && res.data_info.length > 0) {
                        for (var i = 0; i < res.data_info.length; i++) {
                            var item = res.data_info[i];
                            item.chon = 0;
                            item.chinh = 0;
                            var cb = dsCanBo.where(n => n.nsd_duyet == item.ma).firstOrDefault();
                            if (cb != null) {
                                item.chon = 1;
                                if (cb.phe_duyet == "1") {
                                    item.chinh = 1;
                                }
                            }
                        }
                        res.data_info.sort((a, b) => b.chon - a.chon);
                    }

                    ESUtil.genHTML("modalTrinhDuyetThemNhomDSCanBoTemplate", "modalTrinhDuyetThemNhomDSCanBo", { danh_sach: res.data_info }, () => {
                        for (var i = 0; i < dsCanBo.length; i++) {
                            $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='nsd_duyet'][data-val='" + dsCanBo[i].nsd_duyet + "']").prop("checked", true);
                            if (dsCanBo[i].phe_duyet == "1") {
                                $("#modalTrinhDuyetThemNhomDSCanBo tr.divItemDsCanBoTrinh input[data-field='phe_duyet'][data-nsd='" + dsCanBo[i].nsd_duyet + "']").prop("checked", true);
                            }
                        }
                        _instance.anHienPheDuyet();
                    });
                    _instance.modalTrinhDuyetThemNhom.show();
                });
            }
        });
        $("#ModalTrinhDuyet_btnXoaNhomTrinh").click(function () {
            var _notifyService = new NotifyService();
            var id_nhom = _instance.form.getControl("so_id_trinh_mau").val();
            if (id_nhom == "") {
                _notifyService.error("Vui lòng chọn nhóm trình để thêm cán bộ vào nhóm");
                return;
            }
            var objNhom = _instance.objDanhMuc.nhom.where(n => n.so_id == id_nhom).firstOrDefault();
            var obj = {
                ma_doi_tac: objNhom.ma_doi_tac,
                ma_chi_nhanh: objNhom.ma_chi_nhanh,
                so_id: objNhom.so_id
            }
            _notifyService.confirm("Bạn có chắc chắn muốn xóa nhóm trình duyệt cá nhân của mình?", "", () => {
                var _service = new Service();
                _service.postData("/admin/configapprove/delete", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    $("#ModalTrinhDuyet_btnXoaNhomTrinh").addClass("d-none");
                    var data = _instance.data;
                    _instance.layChitiet(data);
                    _notifyService.success("Xóa nhóm trình thành công");
                });
            });
        });
        $("#divToTrinhDuyetTabItem").click(function () {
            $(".tabTrinhDuyetContent").addClass("d-none");
            $("#navTrinhDuyet .breadcrumb-item").removeClass("active");
            $("#divToTrinhDuyetTabItem").addClass("active");
            $("#divToTrinhDuyet").removeClass("d-none");
        });
        $("#divNoiDungTrinhTabItem").click(function () {
            $(".tabTrinhDuyetContent").addClass("d-none");
            $("#navTrinhDuyet .breadcrumb-item").removeClass("active");
            $("#divNoiDungTrinhTabItem").addClass("active");
            $("#divNoiDungTrinh").removeClass("d-none");
            $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input").prop("checked", false);
            $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input[value='" + _instance.tuDongGuiEmailKhiDuyet + "']").prop("checked", true);
            $("#ModalTrinhDuyetEmailNhanKhiDuyet_Email").val("");
            if (_instance.objDanhMuc.cau_hinh_email != null) {
                $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input[value='" + _instance.objDanhMuc.cau_hinh_email.tu_dong + "']").prop("checked", true);
                $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input[value='" + _instance.objDanhMuc.cau_hinh_email.tu_dong + "']").trigger("change");
                $("#ModalTrinhDuyetEmailNhanKhiDuyet_Email").val(_instance.objDanhMuc.cau_hinh_email.email_nhan);
            }
        });
        $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input").change(function () {
            $("#ModalTrinhDuyetEmailNhanKhiDuyet .ModalTrinhDuyetEmailNhanKhiDuyet_input").prop("checked", false);
            $(this).prop("checked", true);
        });
    };
    this.OnInit();
}
