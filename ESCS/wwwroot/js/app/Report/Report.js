var objDanhMuc = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
const ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var arrData = [];
var _service = new Service();
var _commonService = new CommonService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _businessCodeService = new BusinessCodeService();
var _statusListService = new StatusListService();
var _categoryCommonService = new CategoryCommonService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _printedService = new PrintedService();
var _productHumanService = new ProductHumanService();
var _frmBaoCaoChung = new FormService("frmBaoCaoChung");
var _modalBenhVien = new ModalDragService("modalBenhVien", undefined, "top");
var _modalChonDonViBaoCao = new ModalDragService("modalChonDonViBaoCao", undefined, "top");

var arrPhanMem = [
    { ma: "BC_XE", ten: "Danh sách báo cáo xe cơ giới", nv: "XE" },
    { ma: "BC_NG", ten: "Danh sách báo cáo sức khoẻ", nv: "NG" },
];

function onChonChiNhanhBaoCao(el, placement = "top") {
    $("#chon_tat_ca").prop("checked", false);
    var count_item = $(".modalChonDviBaoCao").length;
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonDonViBaoCaoDanhSach .modalChonDviBaoCao[value='" + arr[i] + "']").prop("checked", true);
    }
    if (count_item === arr.length)
        $("#chon_tat_ca").prop("checked", true);
    _modalChonDonViBaoCao.setPlacement(placement);
    _modalChonDonViBaoCao.show(el);
}
function onChonTatCa(el) {
    arrData = [];
    var checked = $(el).is(":checked");
    if (checked) {
        $(".modalChonDviBaoCao").prop("checked", checked);
        $.each($("#modalChonDonViBaoCaoDanhSach input.modalChonDviBaoCao"), function (index, item) {
            if ($('.modalChonDviBaoCao').is(':checked')) {
                var val = $(item).val();
                arrData.push(val);
                $("#modalChonDonViBaoCaoTimKiem_ma").val(arrData.join("|"));
            }
        });
    } else {
        $(".modalChonDviBaoCao").prop("checked", false);
        $("#modalChonDonViBaoCaoTimKiem_ma").val("");
    }
}
function onChonChiNhanh(el) {
    var count_item = $(".modalChonDviBaoCao").length;
    var count_checked = $(".modalChonDviBaoCao:checked").length;
    $("#chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#modalChonDonViBaoCaoTimKiem_ma").val() != "") {
        arr_ma = $("#modalChonDonViBaoCaoTimKiem_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#modalChonDonViBaoCaoTimKiem_ma").val(arr_ma.join("|"));
}
function layDanhSachBieuMauBaoCao(nv, pm) {
    _printedService.layDanhSachBieuMauBaoCao({ nv: nv, pm: pm }).then(res => {
        objDanhMuc.ds_bao_cao = res.data_info;
        _frmBaoCaoChung.getControl("mau_bao_cao").setDataSource(objDanhMuc.ds_bao_cao, "ten", "ma", "Chọn biểu mẫu báo cáo","");
    });
}
function chonBenhVien(el) {
    var val = $(el).attr("col-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    if (val == "" || val == null || val == undefined) {
        $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    }
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    }
    _modalBenhVien.show(el);
}
function onChonBenhVien(el) {
    var target = _modalBenhVien.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        $(target).attr("data-val", val);
        var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
        $(target).val(bv.ten);
        $(target).attr("col-val", bv.ma);
    }
    _modalBenhVien.hide();
}
function xoaChon(el, loai) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
}
$(document).ready(function () {
    _frmBaoCaoChung.getControl("ngayd").setValue(ngayDauThang);
    _frmBaoCaoChung.getControl("ngayc").setValue(dateNow);
    _frmBaoCaoChung.getControl("ngayd_dp").setValue(ngayDauThang);
    _frmBaoCaoChung.getControl("ngayc_dp").setValue(dateNow);
    _service.all([
        _partnerListService.layDsDoiTac(),//0
        _branchListService.layDsChiNhanh(),//1
        _businessCodeService.layDsLHNV(),//2
        _statusListService.layDsTrangThai(),//3
        _categoryCommonService.layDsDanhMucChung(),//4
        _statusListService.layDsTrangThaiCN(),//5
        _healthClaimCommonService.layDsBenhVien(),//6
        _healthClaimCommonService.layDanhMucChung({ ma_doi_tac: ESCS_MA_DOI_TAC }),//7
        _productHumanService.getAllSanPham(),//8
        _printedService.layDanhSachBieuMauBaoCao()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.lh_nv = arrRes[2].data_info;
        objDanhMuc.trang_thai_xe = arrRes[3].data_info;
        objDanhMuc.dmuc_chung = arrRes[4].data_info;
        objDanhMuc.nhom_nguyen_nhan = arrRes[4].data_info.where(n => n.nhom === "NHOM_NGUYEN_NHAN").sortBy("stt");
        objDanhMuc.trang_thai_ng = arrRes[5].data_info;
        objDanhMuc.benh_vien = arrRes[6].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        objDanhMuc.nguyen_nhan = arrRes[7].data_info.where(n => n.nhom == "NGUYEN_NHAN");
        objDanhMuc.hinh_thuc = arrRes[7].data_info.where(n => n.nhom == "HINH_THUC");
        objDanhMuc.san_pham = arrRes[8].data_info;
        objDanhMuc.ds_mau_in = arrRes[9].data_info;

        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : ESCS_MA_DOI_TAC;
        _frmBaoCaoChung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmBaoCaoChung.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
            ESUtil.genHTML("modalChonDonViBaoCaoDanhSachTemplate", "modalChonDonViBaoCaoDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });
        });
        ESUtil.executeAsync(() => {
            ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
                $("#modalBenhVienDanhSach .single_checked").click(function () {
                    $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                });
            });
        });
        ESUtil.executeAsync(() => {
            ESUtil.genHTML("tblDanhSachMauInTemplate", "tblDanhSachMauIn", { danh_sach: objDanhMuc.ds_mau_in, data: arrPhanMem  }, () => {
                $("#tblDanhSachMauIn .single_checked").click(function () {
                    $("#tblDanhSachMauIn .single_checked").prop("checked", false);
                    $(this).prop("checked", true);
                    $("#divCollapseThongTinHoSoXE").trigger('click');
                });
            });
        });
        ESUtil.executeAsync(() => {
            _frmBaoCaoChung.getControl("hinh_thuc_dtri").setDataSource(objDanhMuc.hinh_thuc, "ten", "ma", "Chọn hình thức điều trị", "");
        });
        _frmBaoCaoChung.getControl("ma_doi_tac").trigger("select2:select");
        _frmBaoCaoChung.getControl("nv").trigger("select2:select");
    });
    //Biểu mẫu báo cáo
    _frmBaoCaoChung.getControl("mau_bao_cao").addEventChange(val => {
        $("#rowNgayDuPhongHoSo").addClass("d-none");
        if (val == "BC_XE_BT_BC_DU_PHONG") {
            //$("#rowNgayMoHoSo").addClass("d-none");
            //$("#rowNgayDongHoSo").addClass("d-none");
            $("#rowNgayDuPhongHoSo").removeClass("d-none");
        }
    });
    //Chọn chi nhánh
    $("#modalChonDonViBaoCaoTimKiem").keyup(ESUtil.delay(function (e) {
        var tim = ESUtil.xoaKhoangTrangText($(this).val().toLowerCase());
        if (tim == "") {
            $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem").removeClass("d-none");
            return;
        }
        $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem").addClass("d-none");
        $("#modalChonDonViBaoCaoDanhSach .modalChonDonViBaoCaoDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");
    }, 500));
    //Tìm kiếm bệnh viện
    $("#inputSearch_BenhVien").keyup(function () {
        setTimeout(() => {
            var val = ESUtil.xoaKhoangTrangText($(this).val().toLowerCase());
            if (val == "") {
                $("#modalBenhVienDanhSach div.dsbv[data-search]").show();
                return;
                $(target).attr("col-val", val);
            }
            $("#modalBenhVienDanhSach div.dsbv[data-search]").hide();
            $("#modalBenhVienDanhSach div.dsbv[data-search*='" + val + "']").show();
        }, 500);
    });

    $("#ModalBaoCao_btnChonDonVi").click(function () {
        var ma = $("#modalChonDonViBaoCaoTimKiem_ma").val();
        var arr = ma.split("|");
        var data_val = "";
        var ten_dvi = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                data_val += arr[i];
            } else {
                data_val += ";" + arr[i];
            }
        }
        if (arr.length >= 1 && arr[0].trim() != null && arr[0].trim() != "") {
            ten_dvi = "Đã có " + arr.length + " đơn vị được chọn";
        }
        $(_modalChonDonViBaoCao.target).attr("data-val", data_val);
        $(_modalChonDonViBaoCao.target).val(ten_dvi);
        _modalChonDonViBaoCao.hide();
    });
    //Xuất báo cáo
    $("#btnXuatBaoCaoChung").click(function () {
        if (!_frmBaoCaoChung.isValid()) {
            return;
        }
        var obj = _frmBaoCaoChung.getJsonData();
        obj.ma_chi_nhanh = _frmBaoCaoChung.getControl('ma_chi_nhanh').attr('data-val');
        obj.benh_vien = _frmBaoCaoChung.getControl('benh_vien').attr('col-val');
        obj.ma_mau_in = obj.mau_bao_cao;
        var _serviceTmpHome = new Service();
        _serviceTmpHome.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    //Tìm kiếm mẫu báo cáo
    $("#frmBaoCao_timKiem").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblDanhSachMauIn .modalChonMauInBaoCaoDanhSachItem").removeClass("d-none");
        if (val != "") {
            $("#tblDanhSachMauIn .modalChonMauInBaoCaoDanhSachItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblDanhSachMauIn .modalChonMauInBaoCaoDanhSachItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
});