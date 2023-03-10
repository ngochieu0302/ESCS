var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var _modalChonDonViBaoCao = new ModalDragService("modalChonDonViBaoCao", undefined, "bottom");
function onChonChiNhanhBaoCao(el, placement = "bottom") {
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalChonDonViBaoCao.setPlacement(placement);
    _modalChonDonViBaoCao.show(el);
}
function ModalBaoCaoService(title = "Báo cáo chung", nv = "XE", pm = "GD") {
    this.idModal = "modalBaoCaoChung";
    this.nv = nv;
    this.pm = pm;
    this.frmBaoCaoChung = null;
    this.data = {
        ds_bao_cao: [],
        doi_tac: [],
        chi_nhanh: [],
        nguyen_nhan: [],
        hinh_thuc: [],
        san_pham: [],
        trang_thai: [],
        nguon: [],
    };
    this.onInit = function () {
        var _instance = this;
        $("#rowThangDp").addClass("d-none");
        _instance.frmBaoCaoChung = new FormService("frmBaoCaoChung");
        $("#modalBaoCaoChung .modal-title").html(title);
        var _printedService = new PrintedService();
        _printedService.layDanhSachBieuMauBaoCao({ nv: _instance.nv, pm: _instance.pm }).then(res => {
            _instance.data.ds_bao_cao = res.data_info;
            _instance.frmBaoCaoChung.getControl("mau_bao_cao").setDataSource(_instance.data.ds_bao_cao, "ten", "ma", "Chọn biểu mẫu báo cáo");
        });
        _instance.frmBaoCaoChung.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = _instance.data.chi_nhanh.where(n => n.ma_doi_tac === val);
            _instance.frmBaoCaoChung.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _instance.frmBaoCaoChung.getControl("ma_chi_nhanh").setValue("");
        });
        _instance.frmBaoCaoChung.getControl("mau_bao_cao").addEventChange(val => {
            $("#rowThangDp").addClass("d-none");
            if (val =="BC_XE_GD_BC_DU_PHONG") {
                $("#rowThangDp").removeClass("d-none");
            }
        });

        if (_instance.nv == 'XE') {
            $("#benh_vien").hide();
            $("#nv_nguoi").hide();
            $("#nv_xe").show();
        } else if (_instance.nv == 'NG') {
            $("#benh_vien").show();
            $("#nv_nguoi").show();
            $("#nv_xe").hide();
        }

        $("#modalChonDonViBaoCaoTimKiem").keyup(ESUtil.delay(function (e) {
            var tim = $(this).val();
            if (tim == "") {
                $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem").removeClass("d-none");
                return;
            }
            $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem").addClass("d-none");
            $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");
        }, 500));

        $("#ModalBaoCao_btnChonDonVi").click(function () {
            var data_val = ""; var ten_dvi = "";
            var count = $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao:checked").length;
            $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao:checked").each(function () {
                var val = $(this).val();
                if (data_val == "") {
                    var dvi = _instance.data.chi_nhanh.where(n => n.ma == val).firstOrDefault();
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
            $(_modalChonDonViBaoCao.target).attr("data-val", data_val);
            $(_modalChonDonViBaoCao.target).val(ten_dvi);
            _modalChonDonViBaoCao.hide();
        });

        $("#btnXuatBaoCaoChung").click(function () {
            if (!_instance.frmBaoCaoChung.isValid()) {
                return;
            }
            var obj = _instance.frmBaoCaoChung.getJsonData();
            obj.benh_vien = _instance.frmBaoCaoChung.getControl('benh_vien').attr('col-val');
            obj.ma_mau_in = obj.mau_bao_cao;
            var _serviceTmpHome = new Service();
            _serviceTmpHome.getFile("/common/ExportBaoCao", obj).then(res => {
                ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            });
        });
    }
    this.fillDataControl = function () {
        var _instance = this;
        if (_instance.nv == "NG") {
            _instance.frmBaoCaoChung.getControl("san_pham").setDataSource(_instance.data.san_pham, "ten", "ma", "Chọn sản phẩm", "");
        }
        _instance.frmBaoCaoChung.getControl("ngayd").setValue(ngayDauThang);
        _instance.frmBaoCaoChung.getControl("ngayc").setValue(dateNow);
        _instance.frmBaoCaoChung.getControl("ma_doi_tac").setDataSource(_instance.data.doi_tac, "ten", "ma", "Chọn đối tác", "");
        ESUtil.genHTML("modalChonDonViBaoCaoDanhSachTemplate", "modalChonDonViBaoCaoDanhSach", { danh_sach: _.sortBy(_instance.data.chi_nhanh, x => x.ten_tat) });
/*        _instance.frmBaoCaoChung.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");*/
        _instance.frmBaoCaoChung.getControl("nhom_nguyen_nhan").setDataSource(_instance.data.nguyen_nhan, "ten", "ma", "Chọn nguyên nhân", "");
        _instance.frmBaoCaoChung.getControl("hinh_thuc_dtri").setDataSource(_instance.data.hinh_thuc, "ten", "ma", "Chọn hình thức điều trị", "");
        _instance.frmBaoCaoChung.getControl("trang_thai").setDataSource(_instance.data.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái");
        _instance.frmBaoCaoChung.getControl("nguon").setDataSource(_instance.data.nguon, "ten", "ma", "Chọn nguồn khai báo");
    }
    this.show = function () {
        $("#modalBaoCaoChung").modal('show');
    }
    this.onInit();
}