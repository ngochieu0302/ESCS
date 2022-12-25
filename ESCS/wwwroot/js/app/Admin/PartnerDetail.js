const GRID_HO_SO_SO_DONG = 14;
const CONSTANT_PM = 'LN'; //Lịch nghỉ
//var _commonService = new CommonService();
// PHÊ DUYỆT 
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_NSD = $("#escs_tai_khoan").val();

var dateNow = new Date().ddmmyyyy();
var gioHT = new Date().HHmm();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var objDanhMuc = {};
var arrChiNhanh = [];
var ho_so_chi_tiet = {};
var _notifyService = new NotifyService();
var _service = new PartnerDetailService();
var _userManagementService = new UserManagementService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();

var _frmSearch = new FormService("frmSearch");
var _frmThemCauHinh = new FormService("frmThemCauHinh");

var _modalThemCauHinh = new ModalService("modalThemCauHinh");
var _modalChonMaChiNhanh = new ModalDragService("modalChonMaChiNhanh", undefined, "bottom");
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_ten", title: "Nghiệp vụ", width: "6%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac_ql", title: "Đối tác quản lý đơn", width: "18%", headerSort: false },
    { field: "ten_dvi_ql", title: "Đơn vị quản lý đơn", width: "18%", headerSort: false },

    { field: "ten_dvi_gd", title: "ĐV xử lý giám định", width: "15%", headerSort: false },
    { field: "ten_dvi_bt", title: "ĐV xử lý bồi thường", width: "15%", headerSort: false },
    { field: "ten_dvi_tt", title: "ĐV xử lý thanh toán", width: "15%", headerSort: false },
    { field: "tu_ngay_hthi", title: "Ngày áp dụng", width: "8%", hozAlign: "center", headerSort: false }
];
var _gridViewDanhSach = new GridViewService("gridViewDanhSach", configColumn, getPaging, rowClick);
function getPaging(trang) {
    if (_frmSearch.isValid()) {
        var objTimKiem = _frmSearch.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewDanhSach.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac_ql: arr[0],
        so_id: arr[1]
    };
    rowClick(data);
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === 0 || data.ma_doi_tac === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, tu_ngay: data.tu_ngay, bt: data.bt };
    _service.xemCNDoiTac(objGetDetail).then(res => {
        var data = res.data_info;

        chiTietDong(data);
        _frmThemCauHinh.getControl("ma_doi_tac_ql").readOnly(true);
        _frmThemCauHinh.getControl("tu_ngay").readOnly(true);
    });
}
function chiTietDong(data) {
    _frmThemCauHinh.setData(data.cau_hinh);
    var ma_doi_tac_ql = data.cau_hinh.ma_doi_tac_ql;
    var arrMaChiNhanh = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ma_doi_tac_ql);
    var arrCauHinhXe = data.cau_hinh_ct.where(n => n.nv == 'XE');
    var arrCauHinhXeMay = data.cau_hinh_ct.where(n => n.nv == 'XE_MAY');
    var arrCauHinhNg = data.cau_hinh_ct.where(n => n.nv == 'NG');
    var arrXeInput = [];
    var arrXeMayInput = [];
    var arrNgInput = [];
    $.each(arrMaChiNhanh, (index, item) => {
        var cauHinhXe = (arrCauHinhXe != null && arrCauHinhXe.length > 0) ? arrCauHinhXe.where(n => n.ma_chi_nhanh_ql == item.ma).firstOrDefault() : null;
        var cauHinhXeMay = (arrCauHinhXeMay != null && arrCauHinhXeMay.length > 0) ? arrCauHinhXeMay.where(n => n.ma_chi_nhanh_ql == item.ma).firstOrDefault() : null;
        var cauHinhNg = (arrCauHinhNg != null && arrCauHinhNg.length > 0) ? arrCauHinhNg.where(n => n.ma_chi_nhanh_ql == item.ma).firstOrDefault() : null;
        var objXE = {
            ma_chi_nhanh_ql: item.ma,
            ten_chi_nhanh_ql: item.ten_tat,
            nv: "XE",
            ma_chi_nhanh_gd: cauHinhXe != null ? cauHinhXe.ma_chi_nhanh_gd : null,
            ten_chi_nhanh_gd: cauHinhXe != null ? cauHinhXe.ten_chi_nhanh_gd : null,
            ma_chi_nhanh_tt: cauHinhXe != null ? cauHinhXe.ma_chi_nhanh_tt : null,
            ten_chi_nhanh_tt: cauHinhXe != null ? cauHinhXe.ten_chi_nhanh_tt : null,
            ma_chi_nhanh_bt: cauHinhXe != null ? cauHinhXe.ma_chi_nhanh_bt : null,
            ten_chi_nhanh_bt: cauHinhXe != null ? cauHinhXe.ten_chi_nhanh_bt : null
        }
        var objXeMay = {
            ma_chi_nhanh_ql: item.ma,
            ten_chi_nhanh_ql: item.ten_tat,
            nv: "XE_MAY",
            ma_chi_nhanh_gd: cauHinhXeMay != null ? cauHinhXeMay.ma_chi_nhanh_gd : null,
            ten_chi_nhanh_gd: cauHinhXeMay != null ? cauHinhXeMay.ten_chi_nhanh_gd : null,
            ma_chi_nhanh_tt: cauHinhXeMay != null ? cauHinhXeMay.ma_chi_nhanh_tt : null,
            ten_chi_nhanh_tt: cauHinhXeMay != null ? cauHinhXeMay.ten_chi_nhanh_tt : null,
            ma_chi_nhanh_bt: cauHinhXeMay != null ? cauHinhXeMay.ma_chi_nhanh_bt : null,
            ten_chi_nhanh_bt: cauHinhXeMay != null ? cauHinhXeMay.ten_chi_nhanh_bt : null
        }
        var objNG = {
            ma_chi_nhanh_ql: item.ma,
            ten_chi_nhanh_ql: item.ten_tat,
            nv: "NG",
            ma_chi_nhanh_bt: cauHinhNg != null ? cauHinhNg.ma_chi_nhanh_bt : null,
            ten_chi_nhanh_bt: cauHinhNg != null ? cauHinhNg.ten_chi_nhanh_bt : null,
            ma_chi_nhanh_tt: cauHinhNg != null ? cauHinhNg.ma_chi_nhanh_tt : null,
            ten_chi_nhanh_tt: cauHinhNg != null ? cauHinhNg.ten_chi_nhanh_tt : null,
        }
        arrXeInput.push(objXE);
        arrXeMayInput.push(objXeMay);
        arrNgInput.push(objNG);
    });
    ESUtil.genHTML("modalThemCauHinhXeTemplate", "modalThemCauHinhXe", { arrChiNhanh: arrXeInput });
    ESUtil.genHTML("modalThemCauHinhXeMayTemplate", "modalThemCauHinhXeMay", { arrChiNhanh: arrXeMayInput });
    ESUtil.genHTML("modalThemCauHinhNgTemplate", "modalThemCauHinhNg", { arrChiNhanh: arrNgInput });
    _modalThemCauHinh.show();
}
function getDataTableXe() {
    var otArr = [];
    $("#modalThemCauHinhXe tr").each(function (e) {
        var json = {
            nv: 'XE',
            ma_chi_nhanh_ql: $(this).find("td a[data-field='ma_chi_nhanh_ql']").attr("data-val"),
            ma_chi_nhanh_gd: $(this).find("td input[data-field='ma_chi_nhanh_gd']").attr("data-val"),
            ma_chi_nhanh_bt: $(this).find("td input[data-field='ma_chi_nhanh_bt']").attr("data-val"),
            ma_chi_nhanh_tt: $(this).find("td input[data-field='ma_chi_nhanh_tt']").attr("data-val")
        };
        if ((json.ma_chi_nhanh_gd != "" && json.ma_chi_nhanh_gd != undefined) || (json.ma_chi_nhanh_bt != "" && json.ma_chi_nhanh_bt != undefined)
            || (json.ma_chi_nhanh_tt != "" && json.ma_chi_nhanh_tt != undefined)) {
            otArr.push(json);
        }
    });
    return otArr;
}
function getDataTableXeMay() {
    var otArr = [];
    $("#modalThemCauHinhXeMay tr").each(function (e) {
        var json = {
            nv: 'XE_MAY',
            ma_chi_nhanh_ql: $(this).find("td a[data-field='ma_chi_nhanh_ql']").attr("data-val"),
            ma_chi_nhanh_gd: $(this).find("td input[data-field='ma_chi_nhanh_gd']").attr("data-val"),
            ma_chi_nhanh_bt: $(this).find("td input[data-field='ma_chi_nhanh_bt']").attr("data-val"),
            ma_chi_nhanh_tt: $(this).find("td input[data-field='ma_chi_nhanh_tt']").attr("data-val")
        };
        if ((json.ma_chi_nhanh_gd != "" && json.ma_chi_nhanh_gd != undefined) || (json.ma_chi_nhanh_bt != "" && json.ma_chi_nhanh_bt != undefined)
            || (json.ma_chi_nhanh_tt != "" && json.ma_chi_nhanh_tt != undefined)) {
            otArr.push(json);
        }
    });
    return otArr;
}
function getDataTableNg() {
    var otArr = [];
    $("#modalThemCauHinhNg tr").each(function (e) {
        var json = {
            nv: 'NG',
            ma_chi_nhanh_ql: $(this).find("td a[data-field='ma_chi_nhanh_ql']").attr("data-val"),
            ma_chi_nhanh_bt: $(this).find("td input[data-field='ma_chi_nhanh_bt']").attr("data-val"),
            ma_chi_nhanh_tt: $(this).find("td input[data-field='ma_chi_nhanh_tt']").attr("data-val")
        };
        if ((json.ma_chi_nhanh_bt != "" && json.ma_chi_nhanh_bt != undefined) || (json.ma_chi_nhanh_tt != "" && json.ma_chi_nhanh_tt != undefined)) {
            otArr.push(json);
        }
    });
    return otArr;
}
function chonMaChiNhanh(el, index, placement = "bottom") {
    _modalChonMaChiNhanh.target = el;
    $("#modalChonMaChiNhanh .modalChonMaChiNhanhItem").prop("checked", false);
    var val = $(el).attr("data-val");
    $("#modalChonMaChiNhanh .modalChonMaChiNhanhItem[value='" + val + "']").prop("checked", true);
    if (index < 3) {
        placement = "bottom";
    }
    _modalChonMaChiNhanh.setPlacement(placement);
    _modalChonMaChiNhanh.show(el);
    $("#modalChonMaChiNhanhElementSearch").val("");
    $("#modalChonMaChiNhanhElementSearch").focus();
}
function rowSelected(el) {
    $('tr.rowSelected').removeClass('rowSelected');
    $(el).addClass('rowSelected');
}
$(document).ready(function () {
    _frmSearch.getControl("ngay_d").setValue("");
    _frmSearch.getControl("ngay_c").setValue("");
    var objTimKiem = _frmSearch.getJsonData();
    objTimKiem.trang = 1;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _service.paging(objTimKiem)
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.don_vi = arrRes[1].data_info;
        _frmSearch.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThemCauHinh.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        ESUtil.genHTML("modalChonMaChiNhanhTemplate", "modalChonMaChiNhanhDanhSach", { danh_sach: objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC) }, () => {
            $("#modalChonMaChiNhanhDanhSach .single_checked").click(function () {
                var before_checked = $(this).is(":checked");
                $("#modalChonMaChiNhanhDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", before_checked);
            });
        });
        getPaging(1);
    });
    _frmThemCauHinh.getControl("ma_doi_tac_ql").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.don_vi.where(n => n.ma_doi_tac === val);
        for (var i = 0; i < arrChiNhanh.length; i++) {
            arrChiNhanh[i].ma_chi_nhanh_ql = arrChiNhanh[i].ma;
            arrChiNhanh[i].ten_chi_nhanh_ql = arrChiNhanh[i].ten_tat;

            arrChiNhanh[i].ma_chi_nhanh_gd = "";
            arrChiNhanh[i].ma_chi_nhanh_bt = "";
            arrChiNhanh[i].ma_chi_nhanh_tt = "";

            arrChiNhanh[i].ten_chi_nhanh_gd = "";
            arrChiNhanh[i].ten_chi_nhanh_bt = "";
            arrChiNhanh[i].ten_chi_nhanh_tt = "";
        }
        $("#xe-tab").trigger('click');
        ESUtil.genHTML("modalThemCauHinhXeTemplate", "modalThemCauHinhXe", { arrChiNhanh: arrChiNhanh });
        ESUtil.genHTML("modalThemCauHinhXeMayTemplate", "modalThemCauHinhXeMay", { arrChiNhanh: arrChiNhanh });
        ESUtil.genHTML("modalThemCauHinhNgTemplate", "modalThemCauHinhNg", { arrChiNhanh: arrChiNhanh });
    });
    $("#btnFrmBranchSearch").click(function () {
        getPaging(1);
    });
    $("#btnFrmBranchAdd").click(function () {
        $("#modalThemCauHinh_body").html("");
        _frmThemCauHinh.resetForm();
        _frmThemCauHinh.clearErrorMessage();
        _frmThemCauHinh.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThemCauHinh.getControl("ma_doi_tac_ql").trigger('select2:select');
        _frmThemCauHinh.getControl("ma_doi_tac_ql").readOnly(false);
        _frmThemCauHinh.getControl("tu_ngay").readOnly(false);
        _modalThemCauHinh.show();
    });
    $("#btnLuuCauHinh").click(function () {
        if (_frmThemCauHinh.isValid()) {
            var obj = _frmThemCauHinh.getJsonData();
            obj.xe = getDataTableXe();
            obj.xe_may = getDataTableXeMay();
            obj.ng = getDataTableNg();
            _service.luuCNDoiTac(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _modalThemCauHinh.hide();
                getPaging(1);
                _notifyService.success("Cấu hình xử lý hồ sơ thành công.");
            });
        }
    });
    $("#modalChonMaChiNhanhElementSearch").click(function () {
        $(this).focus();
    });
    $("#modalChonMaChiNhanhElementSearch").keyup(ESUtil.delay(function () {
        var search = $(this).val().toLowerCase();
        if (search === "") {
            $("#modalChonMaChiNhanhDanhSach .custom-control").removeClass("d-none");
            return;
        }
        $("#modalChonMaChiNhanhDanhSach .custom-control").addClass("d-none");
        $("#modalChonMaChiNhanhDanhSach .custom-control[data-text*='" + search + "']").removeClass("d-none");
    }, 150));
    $("#btnChonMaChiNhanh").click(function () {
        var val = $(".modalChonMaChiNhanhItem:checked").val();
        if (val == undefined || val == null || val == "") {
            val = "";
        }
        if ($(_modalChonMaChiNhanh.target).hasClass('dsDVGD')) {
            if ($('#chon_tat_ca_dvgd').is(':checked')) {
                $(".dsDVGD").removeClass("hasValue");
                $(".dsDVGD").attr("data-val", val);
                if (val != "") {
                    $(".dsDVGD").addClass("hasValue");
                }
                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(".dsDVGD").val(dvi.ten_tat);
                }
                else {
                    $(".dsDVGD").val("");
                }
            }
            else {
                $(_modalChonMaChiNhanh.target).removeClass("hasValue");
                $(_modalChonMaChiNhanh.target).attr("data-val", val);
                if (val != "") {
                    $(_modalChonMaChiNhanh.target).addClass("hasValue");
                }

                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(_modalChonMaChiNhanh.target).val(dvi.ten_tat);
                }
                else {
                    $(_modalChonMaChiNhanh.target).val("");
                }
            }
        }
        else if ($(_modalChonMaChiNhanh.target).hasClass('dsDVBT')) {
            if ($('#chon_tat_ca_dvbt').is(':checked')) {
                $(".dsDVBT").removeClass("hasValue");
                $(".dsDVBT").attr("data-val", val);
                if (val != "") {
                    $(".dsDVBT").addClass("hasValue");
                }
                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(".dsDVBT").val(dvi.ten_tat);
                }
                else {
                    $(".dsDVBT").val("");
                }
            }
            else {
                $(_modalChonMaChiNhanh.target).removeClass("hasValue");
                $(_modalChonMaChiNhanh.target).attr("data-val", val);
                if (val != "") {
                    $(_modalChonMaChiNhanh.target).addClass("hasValue");
                }

                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(_modalChonMaChiNhanh.target).val(dvi.ten_tat);
                }
                else {
                    $(_modalChonMaChiNhanh.target).val("");
                }
            }
        }
        else if ($(_modalChonMaChiNhanh.target).hasClass('dsDVTT')) {
            if ($('#chon_tat_ca_dvtt').is(':checked')) {
                $(".dsDVTT").removeClass("hasValue");
                $(".dsDVTT").attr("data-val", val);
                if (val != "") {
                    $(".dsDVTT").addClass("hasValue");
                }
                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(".dsDVTT").val(dvi.ten_tat);
                }
                else {
                    $(".dsDVTT").val("");
                }
            }
            else {
                $(_modalChonMaChiNhanh.target).removeClass("hasValue");
                $(_modalChonMaChiNhanh.target).attr("data-val", val);
                if (val != "") {
                    $(_modalChonMaChiNhanh.target).addClass("hasValue");
                }

                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(_modalChonMaChiNhanh.target).val(dvi.ten_tat);
                }
                else {
                    $(_modalChonMaChiNhanh.target).val("");
                }
            }
        }
        else if ($(_modalChonMaChiNhanh.target).hasClass('dsDVBT_NG')) {
            if ($('#chon_tat_ca_dvbt_ng').is(':checked')) {
                $(".dsDVBT_NG").removeClass("hasValue");
                $(".dsDVBT_NG").attr("data-val", val);
                if (val != "") {
                    $(".dsDVBT_NG").addClass("hasValue");
                }
                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(".dsDVBT_NG").val(dvi.ten_tat);
                }
                else {
                    $(".dsDVBT_NG").val("");
                }
            }
            else {
                $(_modalChonMaChiNhanh.target).removeClass("hasValue");
                $(_modalChonMaChiNhanh.target).attr("data-val", val);
                if (val != "") {
                    $(_modalChonMaChiNhanh.target).addClass("hasValue");
                }

                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(_modalChonMaChiNhanh.target).val(dvi.ten_tat);
                }
                else {
                    $(_modalChonMaChiNhanh.target).val("");
                }
            }
        }
        else if ($(_modalChonMaChiNhanh.target).hasClass('dsDVTT_NG')) {
            if ($('#chon_tat_ca_dvtt_ng').is(':checked')) {
                $(".dsDVTT_NG").removeClass("hasValue");
                $(".dsDVTT_NG").attr("data-val", val);
                if (val != "") {
                    $(".dsDVTT_NG").addClass("hasValue");
                }
                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(".dsDVTT_NG").val(dvi.ten_tat);
                }
                else {
                    $(".dsDVBT_NG").val("");
                }
            }
            else {
                $(_modalChonMaChiNhanh.target).removeClass("hasValue");
                $(_modalChonMaChiNhanh.target).attr("data-val", val);
                if (val != "") {
                    $(_modalChonMaChiNhanh.target).addClass("hasValue");
                }

                var dvi = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma == val).firstOrDefault();
                if (dvi != null) {
                    $(_modalChonMaChiNhanh.target).val(dvi.ten_tat);
                }
                else {
                    $(_modalChonMaChiNhanh.target).val("");
                }
            }
        }

        _modalChonMaChiNhanh.hide();
    });
    $('#btnXoaCauHinh').click(function () {
        var data = _frmThemCauHinh.getJsonData();
        var obj = {};
        obj.bt = data.bt;
        obj.ma_doi_tac = ESCS_MA_DOI_TAC;
        _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình chi nhánh này không?", "", val => {
            _service.xoaCauHinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThemCauHinh.hide();
                _notifyService.success("Xóa cấu hình xử lý hồ sơ thành công.");
            });
        });
    });
});