function HealthClaimCommon() {
    this.data = null;
    this.data_goi_bh = null;
    this.arrQL = null;
    this.dsGoiBH = null;
    this.callback = null;
    this._frmThemHangMucTaiLieu = new FormService("frmThemHangMucTaiLieu");
    this._frmThemDanhMucBVNT = new FormService("frmThemDanhMucBVNT");
    this._frmUocTonThatNguoi = new FormService("frmUocTonThatNguoi");
    this._frmThongTinLienHe = new FormService("frmThongTinLienHe");
    this._chonGoiBH = new FormService("ChonGoiBH");
    this._modalThemHangMucTaiLieu = new ModalService("modalThemHangMucTaiLieu");
    this._modalThemDanhMucBVNT = new ModalService("modalThemDanhMucBVNT");
    this._modalUocTonThatNguoi = new ModalService("modalUocTonThatNguoi");
    this._modalXemThongTinGoiBH = new ModalService("modalXemThongTinGoiBH");
    this._modalQuyenLoiBH = new ModalDragService("modalQuyenLoiBH", undefined, "");
    this._healthClaimCommonService = new HealthClaimCommonService();
    this.showThemHangMucTaiLieu = function (data, callback = undefined) {
        var _instance = this;
        _instance.data = data;
        _instance.callback = callback;
        _instance._frmThemHangMucTaiLieu.resetForm();
        _instance._frmThemHangMucTaiLieu.clearErrorMessage();
        _instance._frmThemHangMucTaiLieu.getControl('ma_doi_tac').setDataSource(data.ma_doi_tac, "ten", "ma", "Chọn đối tác", "");
        _instance._frmThemHangMucTaiLieu.getControl('loai').setValue('TL');
        _instance._frmThemHangMucTaiLieu.getControl('loai').attr('readonly', 'readonly');
        _instance._modalThemHangMucTaiLieu.show();
    }
    this.showThemDanhMucBenhVien = function (data, callback = undefined) {
        var _instance = this;
        _instance.data = data;
        _instance.callback = callback;
        _instance._frmThemDanhMucBVNT.getControl('loai').removeAttr('readonly');
        _instance._frmThemDanhMucBVNT.resetForm();
        _instance._frmThemDanhMucBVNT.clearErrorMessage();
        _instance._frmThemDanhMucBVNT.getControl('ma_doi_tac').setDataSource(data.ma_doi_tac, "ten", "ma", "Chọn đối tác", "");
        _instance._frmThemDanhMucBVNT.getControl('ngan_hang').setDataSource(data.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _instance._frmThemDanhMucBVNT.getControl('chi_nhanh_ngan_hang').setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        var arr_tinh_thanh = data.don_vi_hanh_chinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
        _instance._frmThemDanhMucBVNT.getControl('tinh_thanh').setDataSource(arr_tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _instance._frmThemDanhMucBVNT.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _instance._frmThemDanhMucBVNT.getControl('loai').setValue('BV');
        _instance._frmThemDanhMucBVNT.getControl('loai').attr('readonly', 'readonly');
        _instance._modalThemDanhMucBVNT.show();
    }
    this.showThemDanhMucNhaThuoc = function (data, callback = undefined) {
        var _instance = this;
        _instance.data = data;
        _instance.callback = callback;
        _instance._frmThemDanhMucBVNT.getControl('loai').removeAttr('readonly');
        _instance._frmThemDanhMucBVNT.resetForm();
        _instance._frmThemDanhMucBVNT.clearErrorMessage();
        _instance._frmThemDanhMucBVNT.getControl('ma_doi_tac').setDataSource(data.ma_doi_tac, "ten", "ma", "Chọn đối tác", "");
        _instance._frmThemDanhMucBVNT.getControl('ngan_hang').setDataSource(data.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _instance._frmThemDanhMucBVNT.getControl('chi_nhanh_ngan_hang').setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        var arr_tinh_thanh = data.don_vi_hanh_chinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
        _instance._frmThemDanhMucBVNT.getControl('tinh_thanh').setDataSource(arr_tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _instance._frmThemDanhMucBVNT.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _instance._frmThemDanhMucBVNT.getControl('loai').setValue('NT');
        _instance._frmThemDanhMucBVNT.getControl('loai').attr('readonly', 'readonly');
        _instance._modalThemDanhMucBVNT.show();
    }
    this.showUocTonThatNguoi = function (data, el) {
        var _instance = this;
        _instance.target = el;
        _instance.data = data;
        var _service = new Service();
        var _notifyService = new NotifyService();
        _instance._frmUocTonThatNguoi.resetForm();
        _instance._frmUocTonThatNguoi.clearErrorMessage();
        var obj = {
            ma_doi_tac: data.ma_doi_tac,
            so_id: data.so_id
        };
        _service.postData("/healthclaim/healthclaimcommon/layUocTonThat", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            };
            _instance._frmUocTonThatNguoi.getControl('ma_doi_tac').val(data.ma_doi_tac);
            _instance._frmUocTonThatNguoi.getControl('so_id').val(data.so_id);
            _instance._frmUocTonThatNguoi.getControl('so_id_hd').val(data.so_id_hd);
            _instance._frmUocTonThatNguoi.getControl('so_id_dt').val(data.so_id_dt);
            ESUtil.genHTML("dsUocTonThatNVNguoi_template", "dsUocTonThatNVNguoi", { data: res.data_info }, () => {
                _instance.TinhToanUocTonThatNguoi();
                $('#dsUocTonThatNVNguoi tr input[data-field=uoc_ton_that]').trigger('change');
            });
            _instance._modalUocTonThatNguoi.show();
        });
    }
    this.TinhToanUocTonThatNguoi = function () {
        $('#dsUocTonThatNVNguoi tr input[name=uoc_ton_that], #dsUocTonThatNVNguoi tr input[name=tl_thue]').change(function () {
            var uoc_ton_that = parseInt($(this).closest("tr").find("input[name='uoc_ton_that']").val().replace(/[^0-9]+/g, ''));
            var tl_thue = parseInt($(this).closest("tr").find("input[name='tl_thue']").val().replace(/[^0-9]+/g, ''));
            var tien_thue = uoc_ton_that * tl_thue / 100;
            var tong_cong = uoc_ton_that + tien_thue;

            if (tl_thue > 10) {
                $(this).closest("tr").find("input[data-field='tl_thue']").val(10);
            }

            $(this).closest("tr").find("a[name='tien_thue']").html(ESUtil.formatMoney(tien_thue));
            $(this).closest("tr").find("a[name='tien_thue']").attr("data-val", ESUtil.formatMoney(tien_thue));
            $(this).closest("tr").find("a[data-field='tong_cong']").html(ESUtil.formatMoney(tong_cong));
        });
    }
    this.luuUocTonThat = function (callback = undefined) {
        var _instance = this;
        var _service = new Service();
        var _notifyService = new NotifyService();
        if (_instance._frmUocTonThatNguoi.isValid()) {
            var obj = {
                ma_doi_tac: _instance._frmUocTonThatNguoi.getControl("ma_doi_tac").val(),
                so_id: _instance._frmUocTonThatNguoi.getControl("so_id").val(),
                uoc_ton_that: _instance._frmUocTonThatNguoi.getControl("uoc_ton_that").val(),
                tien_thue: _instance._frmUocTonThatNguoi.getControl("tien_thue").attr("data-val"),
                tl_thue: _instance._frmUocTonThatNguoi.getControl("tl_thue").val(),
                pm: _instance.data.pm
            };
            _service.postData("/healthclaim/HealthClaimCommon/luuUocTonThat", obj).then(res => {
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
    this.showThongTinGoiBH = function (data, callback = undefined) {
        var _instance = this;
        var _service = new Service();
        _instance.data_goi_bh = data;
        _service.postData("/contract/HealthCare/getListLHNV", { ma_doi_tac: _instance.data_goi_bh.ma_doi_tac_ql }).then(resCT => {
            if (resCT.state_info.status !== "OK") {
                _notifyService.error(resCT.state_info.message_body);
                return;
            }
            _service.postData("/healthclaim/HealthClaimCommon/layDsGoiBH", { ma_doi_tac_ql: _instance.data_goi_bh.ma_doi_tac_ql }).then(resgoi => {
                if (resgoi.state_info.status !== "OK") {
                    _notifyService.error(resgoi.state_info.message_body);
                    return;
                }
                _instance._chonGoiBH.clearErrorMessage();
                _instance._chonGoiBH.resetForm();
                _instance._chonGoiBH.setData(_instance.data_goi_bh);
                _instance._chonGoiBH.getControl("san_pham").setDataSource(resCT.data_info, "ten", "ma", "Chọn sản phẩm", _instance.data_goi_bh.san_pham);
                _instance._chonGoiBH.setData(_instance.data_goi_bh);
                _instance.dsGoiBH = resgoi.data_info;
                _instance._chonGoiBH.getControl('san_pham').trigger('select2:select');
                _instance._chonGoiBH.getControl("goi_bh").setValue(_instance.data_goi_bh.goi_bh);
                if (_instance.data_goi_bh.goi_bh != undefined && _instance.data_goi_bh.goi_bh != null && _instance.data_goi_bh.goi_bh != '') {
                    var obj_input = {
                        ma_doi_tac_ql: _instance.data_goi_bh.ma_doi_tac_ql,
                        so_id_hd: _instance.data_goi_bh.so_id_hd,
                        so_id_dt: _instance.data_goi_bh.so_id_dt
                    }
                    _service.postData("/healthclaim/healthclaimcommon/layDsQLNDBH", obj_input).then(res => {
                        ESUtil.genHTML("tblDanhSachQuyenLoiGoiBHTemplate", "tblDanhSachQuyenLoiGoiBH", { data: res.data_info });
                        _instance._chonGoiBH.getControl('san_pham').readOnly();
                        _instance._chonGoiBH.getControl('goi_bh').readOnly();
                    });
                } else {
                    _instance._chonGoiBH.getControl('san_pham').readOnly(false);
                    _instance._chonGoiBH.getControl('goi_bh').readOnly(false);
                }
                _instance._modalXemThongTinGoiBH.show();
            });
        });
        if (callback) {
            callback();
        }
    }
    this.layGoi = function (ma_sp, gioi_tinh, ngay_sinh, ngay_hl, ma_goi = undefined, callback = undefined) {
        var _instance = this;
        var ngay_hl_text = ngay_hl.numberToDate();
        var tuoi = ESUtil.tinh_tuoi(ngay_sinh, ngay_hl_text);
        var ngay_hl = ngay_hl;
        var arrGoiBH = _instance.dsGoiBH.where(n => n.ma_nhom === ma_sp && (n.gioi_tinh == undefined || n.gioi_tinh == null || n.gioi_tinh.trim() == "" || n.gioi_tinh == gioi_tinh) &&
            (n.ngay_sinh == undefined || n.ngay_sinh == null || n.ngay_sinh.trim() == "" || tuoi >= n.tuoi_tu && tuoi <= n.tuoi_toi) && ngay_hl >= n.ngay_ad);

        for (var index1 = 0; index1 < arrGoiBH.length - 1; index1++) {
            for (var index2 = index1 + 1; index2 < arrGoiBH.length; index2++) {
                if (arrGoiBH[index1].ma_doi_tac == arrGoiBH[index2].ma_doi_tac && arrGoiBH[index1].gioi_tinh == arrGoiBH[index2].gioi_tinh
                    && arrGoiBH[index1].tuoi_tu == arrGoiBH[index2].tuoi_tu && arrGoiBH[index1].tuoi_toi == arrGoiBH[index2].tuoi_toi
                    && arrGoiBH[index1].ma == arrGoiBH[index2].ma && arrGoiBH[index1].ma_nhom == arrGoiBH[index2].ma_nhom) {
                    if (ngay_hl - arrGoiBH[index1].ngay_ad >= ngay_hl - arrGoiBH[index2].ngay_ad) {
                        arrGoiBH = arrGoiBH.filter(item => item != arrGoiBH[index1]);
                    } else {
                        arrGoiBH = arrGoiBH.filter(item => item != arrGoiBH[index2]);
                    }
                }
            }
        }
        if (ma_goi != undefined && ma_goi != null) {
            arrGoiBH = arrGoiBH.where(n => n.ma == ma_goi);
        }
        if (callback != undefined) {
            callback();
        }
        return arrGoiBH;
    }
    this.getDatatableGoiQloi = function () {
        var otArr = [];
        $("#tblDanhSachQuyenLoiGoiBH tr.tblDanhSachQuyenLoiGoiBHItem").each(function (e) {
            var json = {};
            td = $(this).children();
            td.each(function (i) {
                $(this).find("a[data-field]").each(function (el) {
                    var name = $(this).attr("data-field");
                    json[name] = $(this).attr("data-val");
                });
                $(this).find("input").each(function (el) {
                    var name = $(this).attr("data-field");
                    if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                        json[name] = $(this).val().replace(/[^0-9]+/g, '');
                    } else {
                        json[name] = $(this).val();
                    }
                });
            });
            otArr.push(json);
        });
        return otArr;
    }
    this.luuQloiGoiBH = function (callback = undefined) {
        var _instance = this;
        var _service = new Service();
        var _notifyService = new NotifyService();
        var data_input = _instance._chonGoiBH.getJsonData();

        data_input.ma_chi_nhanh = _instance.data_goi_bh.ma_chi_nhanh;
        data_input.ma_goi_bh = _instance.dsGoiBH.where(n => n.so_id == data_input.goi_bh).firstOrDefault().ma;
        data_input.so_id_hd = _instance.data_goi_bh.so_id_hd;
        data_input.so_id_gcn = _instance.data_goi_bh.so_id_dt;
        data_input.arr = _instance.getDatatableGoiQloi();

        _service.postData("/healthclaim/HealthClaimCommon/luuQuyenLoiHopDongCu", data_input).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var obj_1 = {
                ma_doi_tac_ql: data_input.ma_doi_tac_ql,
                ma_chi_nhanh: data_input.ma_chi_nhanh,
                so_id_hd: data_input.so_id_hd,
                so_id_gcn: data_input.so_id_gcn
            }
            _service.postData("/healthclaim/HealthClaimCommon/layThongTinGCN", obj_1).then(res1 => {
                if (res1.state_info.status !== "OK") {
                    _notifyService.error(res1.state_info.message_body);
                    return;
                }
                var ten_goi = _instance.dsGoiBH.where(n => n.so_id == data_input.goi_bh).firstOrDefault().ten;
                var ma_goi = _instance.dsGoiBH.where(n => n.so_id == data_input.goi_bh).firstOrDefault().ma;

                var obj = _instance._frmThongTinLienHe.getJsonData();
                obj.so_id_hd_d = res1.data_info.so_id_hd_d;
                obj.ten = data_input.ten_ndbh;
                obj.ngay_sinh = data_input.ngay_sinh;
                obj.gioi_tinh = data_input.gioi_tinh;
                obj.goi_bh = ma_goi + ' - ' + ten_goi
                _instance._frmThongTinLienHe.setData(obj);

                _notifyService.success('Lưu thông tin thành công');
                if (callback != undefined) {
                    callback();
                }
            });
        });
    }
    this.getCheckedQuyenLoi = function () {
        var _instance = this;
        var arr_chon = [];
        $("#modalQuyenLoiBHDanhSach .modalChonQuyenLoiBHItem").each(function () {
            if ($(this).is(":checked")) {
                var obj = {
                    lh_nv: "",
                    lh_nv_ct: "",
                    ten: "",
                    ten_hien_thi: "",
                    so_lan_ngay: "0",
                    tien_lan_ngay: "0",
                    tien_nam: "0",
                    dong_bh: "0",
                    so_ngay_cho: "",
                    tien_nam: "0",
                    so_lan_ngay_duyet: "0",
                    tien_nam_duyet: "0",
                    pd: "0"
                };
                var val = $(this).val();
                var ql = _instance.arrQL.where(n => n.lh_nv == val).firstOrDefault();
                obj.lh_nv = ql.lh_nv;
                obj.ten = ql.ten;
                obj.ten_hien_thi = ql.ten_hien_thi;
                obj.so_lan_ngay = ql.so_lan_ngay;
                obj.tien_lan_ngay = ql.tien_lan_ngay;
                obj.tien_nam = ql.tien_nam;
                obj.dong_bh = ql.dong_bh;
                obj.so_ngay_cho = ql.so_ngay_cho;
                obj.tien_nam = ql.tien_nam;
                obj.pd = ql.pd;
                arr_chon.push(obj);
            }
        });
        return arr_chon;
    }
    this.OnInit = function () {
        var _instance = this;
        var _service = new Service();
        var _notifyService = new NotifyService();

        _instance._frmThemDanhMucBVNT.getControl('ngan_hang').addEventChange(val => {
            var arr_chi_nhanh = _instance.data.chi_nhanh_ngan_hang.where(n => n.ma_ct == val);
            _instance._frmThemDanhMucBVNT.getControl('chi_nhanh_ngan_hang').setDataSource(arr_chi_nhanh, "ten", "ma", "Chọn chi nhánh", "");
        });
        _instance._frmThemDanhMucBVNT.getControl('tinh_thanh').addEventChange(val => {
            var quan_huyen = _instance.data.don_vi_hanh_chinh.where(n => n.ma_tinh.trim() === val && n.ma_phuong.trim() === "");
            _instance._frmThemDanhMucBVNT.getControl("quan_huyen").setDataSource(quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });
        _instance._chonGoiBH.getControl('san_pham').addEventChange(val => {
            var gioi_tinh = _instance._chonGoiBH.getControl("gioi_tinh").getValue();
            var ngay_sinh = _instance._chonGoiBH.getControl("ngay_sinh").getValue();
            var arrGoiBH = _instance.layGoi(val, gioi_tinh, ngay_sinh, _instance.data_goi_bh.ngay_hl, undefined, () => {
                ESUtil.genHTML("tblDanhSachQuyenLoiGoiBHTemplate", "tblDanhSachQuyenLoiGoiBH", { data: [] });
            });
            _instance._chonGoiBH.getControl("goi_bh").setDataSource(arrGoiBH, "ten", "so_id", "Chọn gói bảo hiểm", '');
        });
        _instance._chonGoiBH.getControl('goi_bh').addEventChange(val => {
            var obj_input = {
                ma_doi_tac: _instance.data_goi_bh.ma_doi_tac_ql,
                ma_chi_nhanh: '',
                so_id: val
            };
            _service.postData("/contract/package/detail", obj_input).then(res => {
                _instance.arrQL = res.data_info.dk;
                ESUtil.genHTML("modalQuyenLoiBHDanhSachTemplate", "modalQuyenLoiBHDanhSach", { danh_sach: res.data_info.dk });
                ESUtil.genHTML("tblDanhSachQuyenLoiGoiBHTemplate", "tblDanhSachQuyenLoiGoiBH", { data: res.data_info.dk }, () => {
                    layQlCon = function (lh_nv, arr_result) {
                        var arr_output = res.data_info.dk.where(n => n.lh_nv_ct == lh_nv);

                        if (arr_output.length > 0) {
                            $.each(arr_output, (index, item) => {
                                if (arr_result.indexOf(item.lh_nv) == -1) {
                                    arr_result.push(item.lh_nv);
                                }
                                var arr_con = layQlCon(item, arr_result);
                                $.each(arr_con, (index, item1) => {
                                    if (arr_result.indexOf(item1) == -1) {
                                        arr_result.push(item1);
                                    }
                                });
                            });
                        }
                        return arr_result;
                    };

                    xoaQLoi = function (el) {
                        _notifyService.confirm("Bạn có chắc muốn xóa quyền lợi này không?", "", () => {
                            var arr = [];
                            var lh_nv = $(el).attr('data-lhnv');
                            $(el).closest('tr.tblDanhSachQuyenLoiGoiBHItem').remove();
                            var arr_can_xoa = layQlCon(lh_nv, arr);
                            $.each(arr_can_xoa, (index, item) => {
                                item = item.replace('.', '');
                                $('#quyen_loi_goi_bh_' + item).remove();
                            });
                        });
                    }
                });
            });

        });
        $('#btnDongModalThemHangMucTaiLieu, #nodeDongModalThemHangMucTaiLieu').click(function () {
            _instance._modalThemHangMucTaiLieu.hide();
            if (_instance.callback) {
                _instance.callback();
            }
        });
        $('#btnLuuThemHangMucTaiLieu').click(function () {
            if (_instance._frmThemHangMucTaiLieu.isValid()) {
                var obj = _instance._frmThemHangMucTaiLieu.getJsonData();
                obj.nv = 'NG';
                _service.postData("/healthclaim/healthclaimcommon/luuThongTinHangMucTaiLieu", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Thêm hạng mục thành công");
                    _instance._modalThemHangMucTaiLieu.hide();
                    if (_instance.callback) {
                        _instance.callback();
                    }
                });
            }
        });
        $('#btnLuuThongTinBVNT').click(function () {
            if (_instance._frmThemDanhMucBVNT.isValid()) {
                var obj = _instance._frmThemDanhMucBVNT.getJsonData();
                _service.postData("/healthclaim/healthclaimcommon/luuThongTinDanhMucBVNT", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Lưu thông tin thành công");
                    _instance._modalThemDanhMucBVNT.hide();
                    if (_instance.callback) {
                        _instance.callback();
                    }
                });
            }
        });
        $('#btnLuuUocTTNguoi').click(function () {
            _instance.luuUocTonThat((uoc_ton_that) => {
                $(_instance.target).closest('td').find('span.uoc_ton_that').html(ESUtil.formatMoney(uoc_ton_that));
                _notifyService.success('Lưu ước tổn thất thành công');
            });
        });
        $("#btnLuuDongUocTTNguoi").click(function () {
            _instance.luuUocTonThat((uoc_ton_that) => {
                $(_instance.target).closest('td').find('span.uoc_ton_that').html(ESUtil.formatMoney(uoc_ton_that));
                _notifyService.success('Lưu ước tổn thất thành công');
                _instance._modalUocTonThatNguoi.hide();
            });
        });
        $("#btnChuyenCoreNguoi").click(function () {
            _notifyService.warning('Đang phát triển');
        });
        $("#btnLuuDongQlGoiNDBH").click(function () {
            _instance.luuQloiGoiBH((data) => {
                _instance._modalXemThongTinGoiBH.hide();
            });
        });
        $("#btnLuuQlGoiNDBH").click(function () {
            _instance.luuQloiGoiBH((data) => {
                
            });
        });
        $("#closeModalQloi").click(function () {
            _instance._modalQuyenLoiBH.hide();
        });
        $("#themQLoiBH").click(function () {
            if (_instance._chonGoiBH.getControl('goi_bh').getValue() == "") {
                ESUtil.genHTML("modalQuyenLoiBHDanhSachTemplate", "modalQuyenLoiBHDanhSach", { danh_sach: [] });
            } else {
                var obj_input = {
                    ma_doi_tac: _instance.data_goi_bh.ma_doi_tac_ql,
                    ma_chi_nhanh: '',
                    so_id: _instance._chonGoiBH.getControl('goi_bh').getValue()
                };
                _service.postData("/contract/package/detail", obj_input).then(res => {
                    _instance.arrQL = res.data_info.dk;
                    ESUtil.genHTML("modalQuyenLoiBHDanhSachTemplate", "modalQuyenLoiBHDanhSach", { danh_sach: res.data_info.dk });
                    var arr = _instance.getDatatableGoiQloi();
                    $("#modalQuyenLoiBHDanhSach .dsql").removeClass("d-none");
                    $("#inputSearch_QuyenLoiBH").focus();
                    $("#inputSearch_QuyenLoiBH").val("");
                    $("#modalQuyenLoiBHDanhSach .modalChonQuyenLoiBHItem").prop("checked", false);
                    for (var i = 0; i < arr.length; i++) {
                        $("#modalQuyenLoiBHDanhSach .modalChonQuyenLoiBHItem[value='" + arr[i].lh_nv + "']").prop("checked", true);
                    }
                    _instance._modalQuyenLoiBH.show();
                });
            }
        });
        $("#btnChonQuyenLoiBH").click(function () {
            //Lấy dữ liệu table
            var arr_table = _instance.getDatatableGoiQloi();
            //Danh sách đã chọn
            var arr_chon = _instance.getCheckedQuyenLoi();
            var arr_tong_hop = [];
            for (var i = 0; i < arr_chon.length; i++) {
                var quyen_loi = arr_table.where(n => n.lh_nv == arr_chon[i].lh_nv).firstOrDefault();

                if (quyen_loi != null) {
                    arr_tong_hop.push(quyen_loi);
                }
                else {
                    arr_tong_hop.push(arr_chon[i]);
                }
            }
            ESUtil.genHTML("tblDanhSachQuyenLoiGoiBHTemplate", "tblDanhSachQuyenLoiGoiBH", { data: arr_tong_hop }, () => {
                xoaQLoi = function (el) {
                    _notifyService.confirm("Bạn có chắc muốn xóa quyền lợi này không?", "", () => {
                        $(el).closest('tr.tblDanhSachQuyenLoiGoiBHItem').remove();
                    });
                }
            });
            _instance._modalQuyenLoiBH.hide();
        })
    }
    this.OnInit();
}