function MotoClaimCommon() {
    this.target = null;
    this.data = null;
    this._modalUocTonThat = new ModalService("modalUocTonThat");
    this._frmUocTonThat = new FormService("frmUocTonThat");
    this._motoClaimCommonService = new MotoClaimCommonService();
    this._frmAddHoSoGiayTo = new FormService("frmAddHoSoGiayTo");
    this._notifyService = new NotifyService();
    this.luuBoSungHoSoGiayTo = function (so_id, pm, callback = undefined) {
        var _instance = this;
        var obj = _instance._frmAddHoSoGiayTo.getJsonData();
        obj.so_id = so_id;
        obj.nv = "XE_MAY";
        obj.pm = pm;
        if (_instance._frmAddHoSoGiayTo.isValid()) {
            _instance._motoClaimCommonService.luuBsHoSoGiayTo(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _instance._notifyService.error(res.state_info.message_body);
                    return;
                }
                _instance._notifyService.success("Lưu thông tin thành công.");
                if (callback) {
                    callback(res);
                }
            });
        }
    }
    this.loadDmucLoaiHsGiayTo = function (arr) {
        var _instance = this;
        _instance._frmAddHoSoGiayTo.getControl("ma_hs").setDataSource(arr, "ten", "ma", "Chọn hạng mục", "", "HANG_MUC_TAI_LIEU");
    }
    this.layDanhSachLoaiHsGiayTo = function (obj, callback = undefined) {
        var _instance = this;
        _instance._motoClaimCommonService.layHoSoGiayTo(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _instance._notifyService.error(res.state_info.message_body);
                return;
            }
            if (callback) {
                callback(res);
            }
        });
    }
    this._modalDsLHNV = new ModalDragService("modalDsLHNV", undefined, "right");

    this.layDSThongTinTienTrinh = function (obj, callback = undefined) {
        var _instance = this;
        _instance._motoClaimCommonService.layThongTinTienTrinh(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _instance._notifyService.error(res.state_info.message_body);
                return;
            }
            if (callback) {
                callback(res);
            }
        });
    }
    this.showUocTonThat = function (data, el) {
        var _instance = this;
        _instance.target = el;
        _instance.data = data;
        var _service = new Service();
        var _notifyService = new NotifyService();
        _instance._frmUocTonThat.resetForm();
        _instance._frmUocTonThat.clearErrorMessage();
        var obj = {
            ma_doi_tac: data.ma_doi_tac,
            so_id: data.so_id,
            nv: 'XE_MAY'
        }
        _service.postData("/motoclaim/motoclaimcommon/layUocTonThat", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _instance._frmUocTonThat.getControl('ma_doi_tac').val(data.ma_doi_tac);
            _instance._frmUocTonThat.getControl('so_id').val(data.so_id);
            _instance._frmUocTonThat.getControl('so_id_hd').val(data.so_id_hd);
            _instance._frmUocTonThat.getControl('so_id_dt').val(data.so_id_dt);

            ESUtil.genHTML("dsUocTonThatNV_template", "dsUocTonThatNV", { data: res.data_info }, () => {
                _instance.TinhToanUocTonThat();
                $('#dsUocTonThatNV tr input[data-field=uoc_ton_that]').trigger('change');
            });
            
            _instance._modalUocTonThat.show();
        });
    }
    this.getDataTableUocTT = function() {
        var otArrGD = [];
        $("#tableDSUocTonThatNV tr.row-item").each(function (e) {
            var json = {};
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    var field = $(this).attr("data-field");
                    if ($(this).hasClass("number")) {
                        json[field] = $(this).val().replace(/[^0-9]+/g, '');
                    }
                    else if ($(this).hasClass("combobox")) {
                        json[field] = $(this).val();
                        if (json[field] == undefined) {
                            json[field] = "";
                        }
                    }
                    else {
                        json[field] = $(this).val();
                    }
                });
                $(this).find("a").each(function (el) {
                    var field = $(this).attr("data-field");
                    if ($(this).hasClass("number")) {
                        json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                    }
                    else if ($(this).hasClass("combobox")) {
                        json[field] = $(this).attr("data-val");
                        if (json[field] == undefined) {
                            json[field] = "";
                        }
                    }
                    else {
                        json[field] = $(this).attr("data-val");
                    }
                });
            });
            if (json.lh_nv != '') {
                otArrGD.push(json);
            }
        });
        return otArrGD;
    }
    this.getCheckedUocTT = function () {
        var _instance = this;
        var arr_chon = [];
        $("#modalLHNVDanhSach .modalLHNVItem ").each(function () {
            if ($(this).is(":checked")) {
                var obj = {
                    lh_nv: "",
                    ten_lhnv: "",
                    uoc_ton_that: "0",
                    tl_thue: "0",
                    tien_thue: "0",
                    tong_cong: "0"
                };
                var val = $(this).val();
                var lh_nv = _instance.data.lhnv.where(n => n.ma == val).firstOrDefault();
                obj.lh_nv = val;
                obj.ten_lhnv = lh_nv.ten;
                arr_chon.push(obj);
            }
        });
        return arr_chon;
    }
    this.luuUocTonThat = function (callback = undefined) {
        var _instance = this;
        var _service = new Service();
        var _notifyService = new NotifyService();
        if (_instance._frmUocTonThat.isValid()) {
            var obj = {
                ma_doi_tac: _instance._frmUocTonThat.getControl("ma_doi_tac").val(),
                so_id: _instance._frmUocTonThat.getControl("so_id").val(),
                nv: 'XE_MAY',
                arr: _instance.getDataTableUocTT()
            }
            _service.postData("/motoclaim/motoinvestigation/luuUocTonThatNV", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                
                if (callback) {
                    callback(res.out_value.tien_uoc_master);
                }
            });
        }
    }
    this.TinhToanUocTonThat = function() {
        $('#dsUocTonThatNV tr input[data-field=uoc_ton_that], #dsUocTonThatNV tr input[data-field=tl_thue]').change(function () {
            var uoc_ton_that = parseInt($(this).closest("tr").find("input[data-field='uoc_ton_that']").val().replace(/[^0-9]+/g, ''));
            var tl_thue = parseInt($(this).closest("tr").find("input[data-field='tl_thue']").val().replace(/[^0-9]+/g, ''));
            var tien_thue = uoc_ton_that * tl_thue / 100;
            var tong_cong = uoc_ton_that + tien_thue;

            if (tl_thue > 10) {
                $(this).closest("tr").find("input[data-field='tl_thue']").val(10);
            }

            $(this).closest("tr").find("a[data-field='tien_thue']").html(ESUtil.formatMoney(tien_thue));
            $(this).closest("tr").find("a[data-field='tong_cong']").html(ESUtil.formatMoney(tong_cong));

            var tt_xe_tong_so_tien_uoc = 0;
            var tt_xe_tong_tien_uoc_thue = 0;
            var tt_xe_tong_cong_uoc_ton_that = 0;
            $.each($('#dsUocTonThatNV tr.row-item'), (index, item) => {
                var tien_uoc_item = parseInt($(item).find("input[data-field='uoc_ton_that']").val().replace(/[^0-9]+/g, ''));
                var tl_thue_item = parseInt($(item).find("input[data-field='tl_thue']").val().replace(/[^0-9]+/g, ''));
                var tien_thue_item = tien_uoc_item * tl_thue_item / 100;
                var tong_cong_item = tien_uoc_item + tien_thue_item;

                tt_xe_tong_so_tien_uoc += tien_uoc_item;
                tt_xe_tong_tien_uoc_thue += tien_thue_item;
                tt_xe_tong_cong_uoc_ton_that += tong_cong_item;

                $('#tt_xe_tong_so_tien_uoc_nv').html(ESUtil.formatMoney(tt_xe_tong_so_tien_uoc));
                $('#tt_xe_tong_tien_thue_nv').html(ESUtil.formatMoney(tt_xe_tong_tien_uoc_thue));
                $('#tt_xe_tong_cong_nv').html(ESUtil.formatMoney(tt_xe_tong_cong_uoc_ton_that));
            });
        });
    }
    
    this.OnInit = function () {
        var _instance = this;

        $('#btnThemLHNV').click(function () {
            var obj = {
                ma_doi_tac: _instance._frmUocTonThat.getControl("ma_doi_tac").val(),
                so_id_hd: _instance._frmUocTonThat.getControl("so_id_hd").val(),
                so_id_dt: _instance._frmUocTonThat.getControl("so_id_dt").val(),
                nv: 'XE_MAY'
            };
            var _service = new MotoInvestigationService();
            _service.layDsLHNVUoc(obj).then(res => {
                ESUtil.genHTML("modalLHNVDanhSachTemplate", "modalLHNVDanhSach", { data: res.data_info }, () => {
                    var arr_data = _instance.getDataTableUocTT();
                    $("#modalLHNVDanhSach .dslhnv").removeClass("d-none");
                    $("#inputSearch_LHNV").focus();
                    $("#inputSearch_LHNV").val("");
                    $("#modalLHNVDanhSach .modalLHNVItem").prop("checked", false);
                    for (var i = 0; i < arr_data.length; i++) {
                        $("#modalLHNVDanhSach .modalLHNVItem[value='" + arr_data[i].lh_nv + "']").prop("checked", true);
                    }
                    _instance._modalDsLHNV.show(this);
                });
            });
        });

        $('#btnChonLHNV').click(function () {
            //Lấy dữ liệu table
            var arr_table = _instance.getDataTableUocTT();
            //Danh sách đã chọn
            var arr_chon = _instance.getCheckedUocTT();
            var arr_tong_hop = [];
            for (var i = 0; i < arr_chon.length; i++) {
                var lh_nv = arr_table.where(n => n.lh_nv == arr_chon[i].lh_nv).firstOrDefault();

                if (lh_nv != null) {
                    arr_tong_hop.push(lh_nv);
                }
                else {
                    arr_tong_hop.push(arr_chon[i]);
                }
            }
            
            ESUtil.genHTML("dsUocTonThatNV_template", "dsUocTonThatNV", { data: arr_tong_hop }, () => {
                _instance.TinhToanUocTonThat();
                $('#dsUocTonThatNV tr input[data-field=uoc_ton_that]').trigger('change');
            });

            _instance._modalDsLHNV.hide();
        });

        $('#btnLuuUocTT').click(function () {
            _instance.luuUocTonThat((uoc_ton_that) => {
                $(_instance.target).closest('td').find('span.uoc_ton_that').html(ESUtil.formatMoney(uoc_ton_that));
                _notifyService.success('Lưu ước tổn thất thành công');
            });
        });

        $('#btnLuuDongUocTT').click(function () {
            _instance.luuUocTonThat((uoc_ton_that) => {
                $(_instance.target).closest('td').find('span.uoc_ton_that').html(ESUtil.formatMoney(uoc_ton_that));
                _notifyService.success('Lưu ước tổn thất thành công');
                _instance._modalUocTonThat.hide();
            });
        });

        $("#btnChuyenCore").click(function () {
            _instance.luuUocTonThat((uoc_ton_that) => {
                _notifyService.confirm("Bạn chắc chắn có muốn chuyển core với số ước tổn thất trên không?", "", val => {
                    var obj = {
                        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
                        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
                        hanh_dong: "CHUYEN_DU_LIEU_BT",
                    }
                    var _service = new MotoInvestigationService();
                    _service.laySoHoSo(obj).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        _service.layThongTinChiTietHoSo(obj).then(res1 => {
                            ho_so_chi_tiet = res1;
                            ESUtil.genHTML("titleUpdateContractTemplate", "titleUpdateContract", { ho_so: ho_so_chi_tiet.data_info.ho_so });
                            $("#navThongTinChung").bindJsonToHtml(ho_so_chi_tiet.data_info.ho_so);
                            _notifyService.success("Chuyển core thành công");
                        });
                    });
                });
            });
        });
    }
    this.OnInit();
}