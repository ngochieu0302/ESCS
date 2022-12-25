var _common = new CommonService();
var _service = new PaymentService();
var _service_new = new Service();
var _serviceThanhToan = new Service();
var _notifyService = new NotifyService();
var _modalDocumentService = new ModalDocumentService();
var _commonService = new CommonService();
var _carClaimCommonService = new CarClaimCommonService();
var _carInvestigationService = new CarInvestigationService();
var _UploadExcelService = new UploadExcelService();
var _userManagementService = new UserManagementService();

var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var objDanhMuc = {};
var arrChiNhanhTKiem = [];
var ho_so_chi_tiet = {};
var nghiep_vu = "";
var ho_so = {};
var loai_trinh = "";
var nv_trinh = "";
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var thong_tin_toan_bo_ho_so = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();

const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'TT'; //Thanh toán
var mode = "pro";
if (mode === "dev") {
    dateNow = "30/10/2020";
    ngayDauThang = "01/10/2020";
}
var dsHoSoThanhToan = [];
var dsHoSoDeNghiThanhToan = [];

var arrNghiepVu = [
    { ma: "TTBT", ten: "Thanh toán bồi thường", nv: "XE" }
]

var arrNV_CT = [
    { ma: "TRINH_DUYET_TT", ten: "Trình phê duyệt thanh toán", nv: "XE", pm: "TTBT" }
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "tien", title: "Số tiền", width: "10%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "so_luong", title: "SL giao dịch", width: "10%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "ngay_nh", title: "Ngày nhập", width: "12%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "15%", hozAlign: "center", headerSort: false, formatter: "html" }, 
    { field: "nsd", title: "Người sử dụng", width: "20%", hozAlign: "center", headerSort: false },
];
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _modalTrinhDuyetService = new ModalTrinhDuyetService();
var _userManagementService = new UserManagementService();
var _modalDocumentService = new ModalDocumentService();
var _modalPreviewFileService = new ModalPreviewFileService();

var _gridViewThanhToan = new GridViewService("gridViewThanhToan", configColumn, getPaging, rowClick);
var _frmTimKiemThanhToan = new FormService("frmTimKiemThanhToan");
var _frmTaoNoiDung = new FormService("frmTaoNoiDung");
var _frmThanhToan = new FormService("frmThanhToan");
var _frmSearchHoSoTon = new FormService("frmSearchHoSoTon");
var _frmDanhSachHoSoTon = new FormService("frmDanhSachHoSoTon");
var _frmSearchHoSoDeNghiThanhToan = new FormService("frmSearchHoSoDeNghiThanhToan");
var _frmXemThongTinBaoGiaPhuongAn = new FormService("frmXemThongTinBaoGiaPhuongAn");
var _frmThemCanBoTraoDoiXeOTo = new FormService("frmThemCanBoTraoDoiXeOTo");
var _frmThemCanBoTraoDoiConNguoi = new FormService("frmThemCanBoTraoDoiConNguoi");
var _frmNoiDungTraoDoiXeOTo = new FormService("frmNoiDungTraoDoiXeOTo");
var _frmThemNoiDungTraoDoiConNguoi = new FormService("frmThemNoiDungTraoDoiConNguoi");
var _frmNhomChatTraoDoi = new FormService("frmNhomChatTraoDoi");

var _modalThanhToanBoiThuong = new ModalService("modalThanhToanBoiThuong");
var _modalThanhToanBoiThuongChiTiet = new ModalService("modalThanhToanBoiThuongChiTiet");
var _modalTaoNoiDung = new ModalService("modalTaoNoiDung");
var _modalThemHoSoDeNghi = new ModalService("modalThemHoSoDeNghi");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalUploadExcelDsTon = new ModalService("ModalUploadExcelDsTon");
var _modalBenhVien = new ModalDragService("modalBenhVien", undefined, "bottom");
var _modalChonNoiDung = new ModalDragService("modalChonNoiDung", undefined, "bottom");
var _modalChiNhanhDonVi = new ModalDragService("modalChiNhanhDonVi", undefined, "bottom");
var _modalXemToanBoThongTinHoSo = new ModalService("modalXemToanBoThongTinHoSo");
var _modalXemHinhAnhHangMucTonThat = new ModalFullScreenService("modalXemHinhAnhHangMucTonThat", "");
var _modalThemCanBoTraoDoiXeOTo = new ModalService("modalThemCanBoTraoDoiXeOTo");
var _modalThemCanBoTraoDoiConNguoi = new ModalService("modalThemCanBoTraoDoiConNguoi");
var _modalXemHinhAnhChiTiet = new ModalFullScreenService("modalXemHinhAnhChiTiet", "");
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");

_frmSearchHoSoTon.getControl("nsd_duyet_bt").setDataSource([{ ma: ESCS_NSD, ten: "Hồ sơ cá nhân" }], "ten", "ma", "Tất cả", ESCS_NSD);
var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id_tt === undefined || data.so_id_tt === null || data.so_id_tt === 0 || data.so_id_tt === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id_tt: data.so_id_tt };
    xemCtietThanhToan(objGetDetail, res => {
        if (row !== undefined) {
            row.select();
        }
        anHienNut();
        $("#btnExportDsHsTon").addClass("d-none");
    });
}
function anHienNut(isNew = false) {
    $("#btnXoa").addClass("d-none");
    $("#btnThemHoSoTon").addClass("d-none");
    $("#btnLuuDeNghiThanhToanHoSo").addClass("d-none");
    $("#btnXacNhanThanhToan").addClass("d-none");
    $("#btnHuyXacNhanThanhToan").addClass("d-none");
    if (isNew) {
        $("#btnLuuDongHoSo").removeClass("d-none");
        return;
    }
    if (ho_so_chi_tiet.ttchung.trang_thai == "C") {
        $("#btnXoa").removeClass("d-none");
        $("#btnXacNhanThanhToan").removeClass("d-none");
        $("#btnThemHoSoTon").removeClass("d-none");
        $("#btnLuuDeNghiThanhToanHoSo").removeClass("d-none");
    }
    if (ho_so_chi_tiet.ttchung.trang_thai == "D") {
        $("#btnHuyXacNhanThanhToan").removeClass("d-none");
        $("#btnThemHoSoTon").addClass("d-none");
        $("#btnLuuDeNghiThanhToanHoSo").addClass("d-none");
    }
}
function xemCtietThanhToan(objGetDetail, callback = undefined) {
    _service.layCtThanhToan(objGetDetail).then(res => {       
        ho_so_chi_tiet = res.data_info;
        var thanh_toan = res.data_info.ttchung;
        _frmSearchHoSoDeNghiThanhToan.resetForm();
        _frmSearchHoSoDeNghiThanhToan.getControl("nv").setValue(thanh_toan.nhom);
        _frmSearchHoSoDeNghiThanhToan.getControl("ngay_d").setValue(ngayDauThang);
        _frmSearchHoSoDeNghiThanhToan.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoDeNghiThanhToan.getControl("ma_doi_tac_ql").setValue(thanh_toan.ma_doi_tac);
        _frmSearchHoSoDeNghiThanhToan.getControl("so_id_tt").setValue(thanh_toan.so_id_tt);
        _frmThanhToan.setData(thanh_toan);
        nghiep_vu = thanh_toan.nhom;
        anHienTabXemToanBoThongTinHoSoBoiThuong(nghiep_vu);
        for (var i = 0; i < res.data_info.chi_tiet.length; i++) {
            res.data_info.chi_tiet[i].checked = true;
        }
        dsHoSoDeNghiThanhToan = res.data_info.chi_tiet;
        ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: res.data_info.chi_tiet }, () => {
            $(".ttct_item").attr("disabled", "disabled");
            $(".ttct_item").prop("checked", true);
            _modalThanhToanBoiThuongChiTiet.show();
        });
        $("#PaymentTableDeNghiThanhToanChiTiet_pagination").html(ESUtil.pagingHTML("getHoSoDeNghiThanhToan", 1, res.data_info.chi_tiet.length, res.data_info.chi_tiet.length));
        anHienNut();
        _frmSearchHoSoDeNghiThanhToan.getControl("nv").readOnly(true);
        _frmSearchHoSoDeNghiThanhToan.getControl("ma_doi_tac_ql").readOnly(true);
        _frmSearchHoSoDeNghiThanhToan.getControl("noi_dung").readOnly(false);
        if (callback) {
            callback(res);
        }
    });
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
function binDataFormKienNghi() {
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
    _frmTaoNoiDung.getControl("nv").setValue("XE");
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue("TTBT");
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("ma_doi_tac").readOnly();
    _frmTaoNoiDung.getControl("nv").readOnly();
    _frmTaoNoiDung.getControl("pm").readOnly();
}
function getPagingDanhSachNoiDung(trang, callback = undefined) {
    var objTKiem = _frmTaoNoiDung.getJsonData();
    objTKiem.trang = trang;
    objTKiem.so_dong = 7;
    _carClaimCommonService.lietKePhanTrangNoiDung(objTKiem).then(res => {
        var data = res.data_info.data;
        ESUtil.genHTML("tblDanhSachNoiDung_template", "tblDanhSachNoiDung", { data: data });
        $("#tblDanhSachNoiDung_pagination").html(ESUtil.pagingHTML("getPagingDanhSachNoiDung", objTKiem.trang, res.data_info.tong_so_dong, objTKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function suaNoiDung(ma_doi_tac, so_id, pm, nv, nv_ct, noi_dung) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        pm: pm,
        nv: nv,
        nv_ct: nv_ct,
        noi_dung: noi_dung
    };
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("nv").setValue(obj.nv);
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue(obj.pm);
    _frmTaoNoiDung.getControl("pm").trigger("select2:select")
    _frmTaoNoiDung.getControl("nv_ct").setValue(obj.nv_ct);
    _frmTaoNoiDung.setData(obj);
    $("#modalTaoNoiDungFormLietKe").addClass("d-none");
    $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    $("#btnXoaNoiDung").show();
}
function chonNoiDungTrinhDuyet(el, placement = "bottom") {
    var obj = {
        ma_doi_tac: ho_so_chi_tiet.ttchung.ma_doi_tac,
        pm: 'TTBT',
        nv: "XE",
        nv_ct: "TRINH_DUYET_TT"
    }
    loadDuLieuFormNoiDung(el, obj);
    _modalChonNoiDung.options = { placement: placement };
    _modalChonNoiDung.show(el);
}
function loadDuLieuFormNoiDung(el, obj) {
    _carClaimCommonService.layDanhSachNoiDung(obj).then(res => {
        arrNoiDung = res.data_info.noi_dung;
        ESUtil.genHTML("modalChonNoiDungDanhSachTemplate", "modalChonNoiDungDanhSach", { danh_sach: arrNoiDung }, () => {
            $("#modalChonNoiDungDanhSach .single_checked").click(function () {
                $("#modalChonNoiDungDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        var val = $(el).attr("data-val");
        $("#modalChonNoiDungDanhSach .dscnd").removeClass("d-none");
        $("#inputSearch_ChonNoiDung").setValue("");
        $("#inputSearch_ChonNoiDung").focus();
        $("#inputSearch_ChonNoiDung").val();
        $("#modalChonNoiDungDanhSach .modalChonNoiDungItem").prop("checked", false);
        if (val != undefined && val != null && val != "") {
            $("#modalChonNoiDungDanhSach .modalChonNoiDungItem[value='" + val + "']").prop("checked", true);
        }
        _modalChonNoiDung.show(el);
    });
}
function onModalChonDonVi(el, placement = "bottom") {
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonDonViDanhSach .modalChonDvi").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonDonViDanhSach .modalChonDvi[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalChiNhanhDonVi.setPlacement(placement);
    _modalChiNhanhDonVi.show(el);
}
function onFocus(el) {
    $(el).focus();
}
function chonBenhVien(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    }
    _modalBenhVien.show(el);
}
function getPaging(trang) {
    if (_frmTimKiemThanhToan.isValid()) {
        var objTimKiem = _frmTimKiemThanhToan.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewThanhToan.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function getHoSoTon(trang, callback = undefined) {
    dsHoSoThanhToan = [];
    var objTimKiem = _frmSearchHoSoTon.getJsonData();
    var arr_cnhanh = _frmSearchHoSoTon.getControl("ma_chi_nhanh").attr("data-val");
    objTimKiem.arr_cnhanh = arr_cnhanh;
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 1000;
    _service.layDSTon(objTimKiem).then(res => {
        for (var i = 0; i < res.data_info.data.length; i++) {
            if (dsHoSoThanhToan.where(n => n.bt == res.data_info.data[i].bt).length > 0) {
                res.data_info.data[i].checked = true;
            }
            else {
                res.data_info.data[i].checked = false;
            }
        }
        ESUtil.genHTML("PaymentTableDeNghiThanhToan_template", "PaymentTableDeNghiThanhToan", res.data_info);
        $("#PaymentTableDeNghiThanhToan_pagination").html(ESUtil.pagingHTML("getHoSoTon", trang, res.data_info.tong_so_dong, objTimKiem.so_dong));
        if (callback) {
            callback(res)
        }
    });
}
function layDuLieuHoSoTonThanhToan() {
    var otArr = [];
    $("#PaymentTableDeNghiThanhToan tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onChon(el) {
    var count_item = $(".ttbt_item").length;
    var count_checked = $(".ttbt_item:checked").length;
    $("#ttbt_chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#ttbt_chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var dsHSTKiem = layDuLieuHoSoTonThanhToan();
    var hs = dsHSTKiem.where(n => n.bt == val).firstOrDefault();
    var count = dsHoSoThanhToan.where(n => n.bt == val).length;
    if ($(el).is(":checked") && count <= 0) {
        hs.checked = true;
        dsHoSoThanhToan.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        dsHoSoThanhToan = dsHoSoThanhToan.removeItem(n => n.bt == val);
    }
    var tong = dsHoSoThanhToan.sum(n => parseFloat(n.tien));
    $("#txtSoHSThanhToan").html(dsHoSoThanhToan.length);
    _frmThanhToan.getControl("tong_tien").setValue(ESUtil.formatMoney(tong));
}
function onChonTatCa(el) {
    var checked = $(el).is(":checked");
    $(".ttbt_item").prop("checked", checked);
    var dsHSTKiem = layDuLieuHoSoTonThanhToan();
    if (dsHSTKiem.length > 0) {
        for (var i = 0; i < dsHSTKiem.length; i++) {
            var hs = dsHSTKiem.where(n => n.bt == dsHSTKiem[i].bt).firstOrDefault();
            var count = dsHoSoThanhToan.where(n => n.bt == dsHSTKiem[i].bt).length;
            if (checked && count <= 0) {
                hs.checked = true;
                dsHoSoThanhToan.push(hs);
            }
            if (!checked && count > 0) {
                dsHoSoThanhToan = dsHoSoThanhToan.removeItem(n => n.bt == dsHSTKiem[i].bt);
            }
        }
    }
    var tong = dsHoSoThanhToan.sum(n => parseFloat(n.tien));
    $("#txtSoHSThanhToan").html(dsHoSoThanhToan.length);
    _frmThanhToan.getControl("tong_tien").setValue(ESUtil.formatMoney(tong));
}
function getHoSoDeNghiThanhToan(trang, callback = undefined) {
    var so_dong = 1000;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var source = dsHoSoDeNghiThanhToan;
    if (tim != "") {
        source = source.where(n => ESUtil.removeVietnameseTones(n.so_hs_tkiem.replace(/\s+/g, "")).includes(tim));
    }
    var tong_so_dong = source.length;
    var arr = source.where((item, i) => i >= dau && i <= cuoi);
    ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: arr });
    $("#PaymentTableDeNghiThanhToanChiTiet_pagination").html(ESUtil.pagingHTML("getHoSoDeNghiThanhToan", trang, tong_so_dong, so_dong));
}
function layDuLieuHoSoDeNghiThanhToan() {
    var otArr = [];
    $("#PaymentTableDeNghiThanhToanChiTiet tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function xoaHoSoDeNghiThanhToan(el) {
    _notifyService.confirm("Bạn có chắc muốn xóa hồ sơ này không?", "", () => {
        var trang_thai = ho_so_chi_tiet.ttchung.trang_thai;

        if (trang_thai == 'D') {
            _notifyService.error("Hồ sơ đã phê duyệt thanh toán không sửa xóa.");
            return;
        } else {
            $(el).parent().parent().remove();
            var bt = $(el).parent().parent().find("input[data-field='bt']").val();
            var arr = dsHoSoDeNghiThanhToan;
            for (var i = 0; i < arr.length; i++) {
                arr = arr.removeItem(n => n.bt == bt);
            }
        }
    });
}
function layDuLieuBangDsDeNghiThanhToan() {
    var otArr = [];
    $("#DeNghiThanhToanTable1 tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onChonTatCaHoSoDeNghi(el) {
    var checked = $(el).is(":checked");
    $(".de_nghi_tt_item").prop("checked", checked);
    var dsHSTKiem = layDuLieuBangDsDeNghiThanhToan();
    if (dsHSTKiem.length > 0) {
        for (var i = 0; i < dsHSTKiem.length; i++) {
            var hs = dsHSTKiem.where(n => n.bt == dsHSTKiem[i].bt).firstOrDefault();
            var count = dsHoSoThanhToan.where(n => n.bt == dsHSTKiem[i].bt).length;
            if (checked && count <= 0) {
                hs.checked = true;
                dsHoSoThanhToan.push(hs);
            }
            if (!checked && count > 0) {
                dsHoSoThanhToan = dsHoSoThanhToan.removeItem(n => n.bt == dsHSTKiem[i].bt);
            }
        }
    }
}
function xoaChon(el, loai) {
    $(el).closest("div.input-group").find("input").attr("col-val", "");
    $(el).closest("div.input-group").find("input").attr("data-val", "");
    $(el).closest("div.input-group").find("input").val("");
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
function xemNoiDungFileDsTon() {
    var formData = _frmDanhSachHoSoTon.getFormFileData();
    _commonService.docFileExcel(formData).then(resExcel => {
        var dataExcel = resExcel.filter(n => n != resExcel[0]);
        var obj = {
            data: dataExcel,
            nv: _frmSearchHoSoTon.getControl("nv").getValue()
        };
        _service.GetLisMappingDsHsTon(obj).then(resMapping => {
            if (resMapping.state_info.status === "OK") {
                var arr = [];
                var dataMapping = resMapping.data_info;
                $.each(dataExcel, (index, item) => {
                    $.each(dataMapping, (indexMap, itemMap) => {
                        // if (index == indexMap) {
                            // if (item.so_hs == itemMap.so_hs_map) {
                                // var obj = {
                                    // so_hs_map: itemMap.so_hs_map.trim(),
                                    // tien_map: itemMap.tien_map,
                                    // ten_map: itemMap.ten_map.trim(),
                                    // tk_cmt_map: itemMap.tk_cmt_map.trim(),
                                    // ma_ngan_hang_map: itemMap.ma_ngan_hang_map.trim(),
                                    // ten_ngan_hang_map: itemMap.ten_ngan_hang_map.trim(),
                                    // trang_thai: 0
                                // }
                                // if (item.so_hs.trim() == obj.so_hs_map && item.stk_cmt.trim() == obj.tk_cmt_map
                                    // && item.ma_ngan_hang.trim() == obj.ma_ngan_hang_map) {
                                    // obj.trang_thai = 1;
                                // }
                                // var mergerObj = { ...item, ...obj };
                                // arr.push(mergerObj);
								// dataExcel = dataExcel.filter(n => n.so_hs !== item.so_hs);
                                // dataMapping = dataMapping.filter(n => n.so_hs !== item.so_hs_map);
                            // } else {                       
                                // var obj = {
                                    // so_hs_map: "",
                                    // tien_map: "",
                                    // ten_map: "",
                                    // tk_cmt_map: "",
                                    // ma_ngan_hang_map: "",
                                    // ten_ngan_hang_map: "",
                                    // trang_thai: 0
                                // }
                                // var mergerObj = { ...item, ...obj };
                                // arr.push(mergerObj);
                            // }
                        // }
						if (item.so_hs == itemMap.so_hs_map) {
                            var obj = {
                                so_hs_map: itemMap.so_hs_map.trim(),
                                tien_map: itemMap.tien_map,
                                ten_map: itemMap.ten_map.trim(),
                                tk_cmt_map: itemMap.tk_cmt_map.trim(),
                                ma_ngan_hang_map: itemMap.ma_ngan_hang_map.trim(),
                                ten_ngan_hang_map: itemMap.ten_ngan_hang_map,
                                trang_thai: 0
                            }
                            if (item.so_hs.trim() == obj.so_hs_map && item.stk_cmt.trim() == obj.tk_cmt_map
                                && item.ma_ngan_hang.trim() == obj.ma_ngan_hang_map) {
                                obj.trang_thai = 1;
                            }
                            var mergerObj = { ...item, ...obj };
                            arr.push(mergerObj);
                        } 
						// else {
                            // var obj = {
                                // so_hs_map: "",
                                // tien_map: "",
                                // ten_map: "",
                                // tk_cmt_map: "",
                                // ma_ngan_hang_map: "",
                                // ten_ngan_hang_map: "",
                                // trang_thai: 0
                            // }
                            // var mergerObj = { ...item, ...obj };
                            // arr.push(mergerObj);
                        // }
                    });
                });
                ESUtil.genHTML('tblDsUploadHsTonTemplate', 'tblDsUploadHsTon', { data: arr });
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
}
function getDataTableMappingExcel() {
    var arr = [];
    $("#tblDsUploadHsTon tr").each(function () {
        var obj = {
            so_hs: $(this).find('input[name=so_hs]').getValue(),
            tien: $(this).find('input[name=tien]').getValue(),
            ten: $(this).find('input[name=ten]').getValue(),
            stk_cmt: $(this).find('input[name=stk_cmt]').getValue(),
            ma_ngan_hang: $(this).find('input[name=ma_ngan_hang]').getValue(),
            ten_ngan_hang: $(this).find('input[name=ten_ngan_hang]').getValue()
        };
        var checked = $(this).find('input[name=trang_thai]');
        if (checked.is(':checked')) {
            arr.push(obj);
        };
    });
    return arr;
}
//---Code xem toàn bộ thông tin hồ sơ---
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh_ql, ma_chi_nhanh, so_id, so_id_hd, so_id_dt, nv) {
    if (nv === "XE") {
        var obj = {
            ma_doi_tac: ma_doi_tac,
            ma_chi_nhanh_ql: ma_chi_nhanh_ql,
            ma_chi_nhanh: ma_chi_nhanh,
            so_id: so_id,
            so_id_hd: so_id_hd,
            so_id_dt: so_id_dt,
            nv: 'XE'
        }
        _service.base.all([
            _carClaimCommonService.xemToanBoThongTinHoSoBoiThuong(obj),
            _carInvestigationService.layDanhSachFile(obj)
        ]).then(arrRes => {
            var resHoSo = arrRes[0];
            ho_so = resHoSo.data_info;
            var resHinhAnh = arrRes[1];
            if (resHoSo.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            //Thông tin hồ sơ
            var thong_tin_chung = resHoSo.data_info.thong_tin_chung;
            $(".soHoSo_xemToanBoThongTinHSBT").html(thong_tin_chung.so_hs);
            $(".ngayDong_xemToanBoThongTinHSBT").html(thong_tin_chung.ngay_dong_hs);
            $(".donViCapDon_xemToanBoThongTinHSBT").html(thong_tin_chung.ten_cnhanh_cap);
            $(".soTien_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.tien_duyet));
            $(".soTienThue_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.thue));
            $(".tongSoTien_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(thong_tin_chung.tien_duyet + thong_tin_chung.thue));
            var arrLHNV = resHoSo.data_info.dk;
            ESUtil.genHTML("tblToanBoThongTinChungHoSoBoiThuongXeOTo_template", "tblToanBoThongTinChungHoSoBoiThuongXeOTo", { ho_so: thong_tin_chung });
            ESUtil.genHTML("tblToanBoThongTinGiayChungNhanXeOTo_template", "tblToanBoThongTinGiayChungNhanXeOTo", { gcn: resHoSo.data_info.gcn });
            ESUtil.genHTML("tblToanBoThongTinLoaiHinhNghiepVuThamGia_template", "tblToanBoThongTinLoaiHinhNghiepVuThamGia", { data: arrLHNV }, () => {
                var tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe = 0;
                var tongTienMienThuong_xemToanBoThongTinHSBTXe = 0;
                var tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe = 0;
                for (var i = 0; i < arrLHNV.length; i++) {
                    tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe += arrLHNV[i].tien;
                    tongTienMienThuong_xemToanBoThongTinHSBTXe += arrLHNV[i].mien_thuong;
                    tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe += arrLHNV[i].phi;
                }
                $("#tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe));
                $("#tongTienMienThuong_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienMienThuong_xemToanBoThongTinHSBTXe));
                $("#tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe));
            });
            ESUtil.genHTML("tblToanBoThongTinVuTonThatXeOTo_template", "tblToanBoThongTinVuTonThatXeOTo", { data: resHoSo.data_info.ds_vu_tt });
            ESUtil.genHTML("tblToanBoThongTinLichGiamDinhXeOTo_template", "tblToanBoThongTinLichGiamDinhXeOTo", { data: resHoSo.data_info.ds_lan_gd });
            ESUtil.genHTML("tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo_template", "tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo", { data: resHoSo.data_info.ds_nguoi_tham_gia });
            ESUtil.genHTML("tblToanBoThongTinHoSoGiayToXeOTo_template", "tblToanBoThongTinHoSoGiayToXeOTo", { ho_so_giay_to: resHoSo.data_info.ho_so_giay_to });
            ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuHMTT_template", "navToanBoThongTinLoaiHinhNghiepVuHMTT", { danh_sach: resHoSo.data_info.lh_nv });
            ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuBaoGiaPhuongAn_template", "navToanBoThongTinLoaiHinhNghiepVuBaoGiaPhuongAn", { danh_sach: resHoSo.data_info.lh_nv });
            ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong_template", "navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong", { danh_sach: resHoSo.data_info.lh_nv });
            ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo_template", "tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo", { data: resHoSo.data_info.qua_trinh_xu_ly });
            ESUtil.genHTML("tblToanBoLichSuTonThatXeOTo_template", "tblToanBoLichSuTonThatXeOTo", { data: resHoSo.data_info.lich_su_ton_that });
            //Thông tin hình ảnh
            var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
            var arrAnh = resHinhAnh.data_info.where(n => ext.includes(n.extension));
            var arrPDF = resHinhAnh.data_info.where(n => n.extension == ".pdf");
            var arrAnhTC = [];
            var arrAnhTT = [];
            var arrAnhCPL = [];
            var arrAnhGTTL = [];
            for (var i = 0; i < arrAnh.length; i++) {
                if (arrAnh[i].loai == "TC") {
                    arrAnhTC.push(arrAnh[i]);
                }
                if (arrAnh[i].loai == "TT") {
                    arrAnhTT.push(arrAnh[i]);
                }
                if (arrAnh[i].loai == "TL") {
                    arrAnhGTTL.push(arrAnh[i]);
                }
                if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                    arrAnhCPL.push(arrAnh[i]);
                }
            }
            arrAnhTC = bindImagesToanBoAnhHoSo(arrAnhTC);
            arrAnhTT = bindImagesToanBoAnhHoSo(arrAnhTT);
            arrAnhGTTL = bindImagesToanBoAnhHoSo(arrAnhGTTL);
            arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);

            ESUtil.genHTML("tblToanBoThongTinAnhToanCanhXeOTo_template", "tblToanBoThongTinAnhToanCanhXeOTo", { dataAnhToanCanh: arrAnhTC });
            ESUtil.genHTML("tblToanBoThongTinAnhTonThatXeOTo_template", "tblToanBoThongTinAnhTonThatXeOTo", { dataAnhTonThat: arrAnhTT });
            ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToXeOTo_template", "tblToanBoThongTinAnhHoSoGiayToXeOTo", { dataAnhHoSoGiayTo: arrAnhGTTL });
            ESUtil.genHTML("tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo_template", "tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
            ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFXeOTo_template", "tblToanBoThongTinTaiLieuPDFXeOTo", { dataTaiLieuPDF: arrPDF });
            //Mẫu in
            var sourceMauIn = [
                { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
                { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
                { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
                { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" },
                { ma: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA", ten: "Tờ trình phương án sửa chữa" },
                { ma: "ESCS_TB_DUYET_PHUONG_AN", ten: "Thông báo duyệt phương án" },
                { ma: "ESCS_THONG_BAO_DUYET_BAO_LANH", ten: "Thông báo duyệt bảo lãnh" },
                { ma: "ESCS_TO_TRINH_BOI_THUONG", ten: "Tờ trình bồi thường" },
                { ma: "ESCS_THONG_BAO_BOI_THUONG", ten: "Thông báo bồi thường" },
                { ma: "ESCS_TO_TRINH_TU_CHOI_BT", ten: "Tờ trình từ chối bồi thường" },
                { ma: "ESCS_TB_TU_CHOI_TB", ten: "Thông báo từ chối bồi thường" }
            ];
            if (ESCS_MA_DOI_TAC == "OPES") {
                sourceMauIn = [
                    { ma: "OPES_XE_TB_TON_THAT", ten: "OPES - Thông báo tổn thất và yêu cầu bồi thường" },
                    { ma: "OPES_BCGD", ten: "OPES - Báo cáo giám định" },
                    { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "OPES - Biên bản xác minh hiện trường" },//OPES_XE_BBXMHT
                    { ma: "OPES_XE_TO_TRINH_THUE_GD", ten: "OPES - Tờ trình thuê giám định" },
                    { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "OPES - Biên bản giám định tổn thất" },//OPES_XE_BBGD_XCG
                    { ma: "OPES_TRUNG_CAU_CONG_AN", ten: "OPES - Trưng cầu công an" },
                    { ma: "OPES_TONG_HOP_KQ_GD_XCG", ten: "OPES - Bản tổng hợp giám định XCG" },
                    { ma: "OPES_GIAY_GIAO_NHAN_KIEM_PHIEU_HEN", ten: "OPES - Giấy giao nhận kiêm phiếu hẹn" }
                ];
            }
            ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnXeOTo", { dataTaiLieuIn: sourceMauIn });
            _modalDocumentService.setDataSource(sourceMauIn);
        });
        showStepToanBoThongTinHoSoBoiThuong("tabToanBoThongTinHoSoBoiThuong");
        _modalXemToanBoThongTinHoSo.show();
    }
    if (nv == 'NG') {
        var obj = {
            ma_doi_tac: ma_doi_tac,
            ma_chi_nhanh_ql: ma_chi_nhanh_ql,
            ma_chi_nhanh: ma_chi_nhanh,
            so_id: so_id,
            so_id_hd: so_id_hd,
            so_id_dt: so_id_dt,
            pm: 'TINH_TOAN'
        }
        _service.base.all([
            _healthClaimCommonService.layToanBoThongTinHoSo(obj),
            _healthClaimCommonService.layDanhSachFile(obj)
        ]).then(arrRes => {
            var resHoSo = arrRes[0];
            var resHinhAnh = arrRes[1];
            ho_so = resHoSo.data_info;
            ho_so.thong_tin_chung = ho_so.ho_so;
            if (resHoSo.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            //Thông tin hồ sơ
            $(".soHoSo_xemToanBoThongTinHSBT").html(resHoSo.data_info.ho_so.so_hs);
            thong_tin_toan_bo_ho_so.lan_kham = resHoSo.data_info.lan_kham;
            thong_tin_toan_bo_ho_so.lan_kham_qloi = resHoSo.data_info.lan_kham_qloi;
            ESUtil.genHTML("tblToanBoThongTinChungHoSoConNguoi_template", "tblToanBoThongTinChungHoSoConNguoi", { ho_so: resHoSo.data_info.ho_so });
            ESUtil.genHTML("tblToanBoThongTinGiayChungNhanConNguoi_template", "tblToanBoThongTinGiayChungNhanConNguoi", { gcn: resHoSo.data_info.gcn.firstOrDefault() });
            ESUtil.genHTML("tblToanBoThongTinChiTietGiayChungNhanConNguoi_template", "tblToanBoThongTinChiTietGiayChungNhanConNguoi", { data: resHoSo.data_info.gcn_ql });
            ESUtil.genHTML("tblToanBoThongTinHoSoGiayToConNguoi_template", "tblToanBoThongTinHoSoGiayToConNguoi", { data: resHoSo.data_info.ho_so_giay_to });
            ESUtil.genHTML("tblToanBoThongTinKhamChuaBenhYCBHConNguoi_template", "tblToanBoThongTinKhamChuaBenhYCBHConNguoi", { data: resHoSo.data_info.lan_kham });
            ESUtil.genHTML("tblToanBoThongTinHoaDonChungTuConNguoi_template", "tblToanBoThongTinHoaDonChungTuConNguoi", { data: resHoSo.data_info.chung_tu });
            var chung_tu_tong_tien = chung_tu_tong_thue = chung_tu_tong_cong = 0;
            $.each(resHoSo.data_info.chung_tu, function (index, item) {
                chung_tu_tong_tien += item.tien;
                chung_tu_tong_thue += item.thue;
                chung_tu_tong_cong += item.tong_cong;
            });
            $('#tongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_tien));
            $('#tongTienThueHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_thue));
            $('#tongCongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_cong));
            ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi_template", "tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi", { data: resHoSo.data_info.thu_huong });
            var thu_huong_tong = 0;
            $.each(resHoSo.data_info.thu_huong, function (index, item) {
                thu_huong_tong += item.tien;
            });
            $('#tongSoTienThuHuong_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(thu_huong_tong));
            ESUtil.genHTML("tblToanBoThongTinLichSuTonThatConNguoi_template", "tblToanBoThongTinLichSuTonThatConNguoi", { arrHoSo: resHoSo.data_info.lich_su_ton_that }, () => {
                var tong_yc = 0, tong_duyet = 0;
                $.each(resHoSo.data_info.lich_su_ton_that, (index, item) => {
                    tong_yc += parseFloat(item.so_tien_yc);
                    tong_duyet += parseFloat(item.so_tien_duyet);
                });
                $('#tongTienYeuCau_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_yc));
                $('#tongTienDuyet_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_duyet));
            });
            ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi_template", "tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi", { data: resHoSo.data_info.qua_trinh_xly });
            //Thông tin hình ảnh
            var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
            var arrAnh = resHinhAnh.data_info.where(n => ext.includes(n.extension));
            var arrPDF = resHinhAnh.data_info.where(n => n.extension == ".pdf");
            var arrAnhTL = [];
            var arrAnhCPL = [];

            for (var i = 0; i < arrAnh.length; i++) {
                if (arrAnh[i].loai == "TT") {
                    arrAnhTL.push(arrAnh[i]);
                }
                if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                    arrAnhCPL.push(arrAnh[i]);
                }
            }
            arrAnhTL = bindImagesAnhThumnailHopDong(arrAnhTL);
            arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);
            ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi_template", "tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi", { dataAnhGiayToTaiLieu: arrAnhTL });
            ESUtil.genHTML("tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi_template", "tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
            ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFConNguoi_template", "tblToanBoThongTinTaiLieuPDFConNguoi", { dataTaiLieuPDF: arrPDF });
            //Mẫu in
            var sourceMauIn = [
                { ma: "ESCS_YCTTBH", ten: "Giấy yêu cầu trả tiền bảo hiểm" },
                { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
                { ma: "ESCS_TT_DXBT", ten: "Tờ trình đề xuất phương án trả tiền bảo hiểm" },
                { ma: "ESCS_TT_DXBT_QL_KHAC", ten: "Thông báo phê duyệt đề xuất trả tiền bảo hiểm" },
                { ma: "ESCS_NG_TO_TRINH_TU_CHOI_BH", ten: "Tờ trình từ chối chi trả tiền bảo hiểm" },
                { ma: "ESCS_TBTCTTBH", ten: "Thông báo phê duyệt từ chối chi trả tiền bảo hiểm" },
                { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
                { ma: "ESCS_NG_TO_TRINH_DUYET_BAO_LANH", ten: "Thông báo trình bảo lãnh viện phí" },
                { ma: "ESCS_TB_GYCXNBL_QL_KHAC", ten: "Giấy yêu cầu kiêm xác nhận bảo lãnh" },
                { ma: "ESCS_NG_TRINH_TU_CHOI_BLVP", ten: "Tờ trình từ chối bảo lãnh viện phí" },
                { ma: "ESCS_TB_TU_CHOI_BLVP", ten: "Thông báo từ chối bảo lãnh viện phí" },
                { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" }
            ];
            ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnConNguoi", { dataTaiLieuIn: sourceMauIn });
            _modalDocumentService.setDataSource(sourceMauIn);
        });
        showStepToanBoThongTinHoSoBoiThuong("tabToanBoThongTinHoSoBoiThuong");
        _modalXemToanBoThongTinHoSo.show();
    }
}
function anHienTabXemToanBoThongTinHoSoBoiThuong(nv) {
    if (nv === "XE") {
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
        $("#navToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');

        $("#navToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
        $("#navToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
    }
    if (nv === "NG" || nv === "NGBL" || nv === "NGTT") {
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
        $("#navToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');

        $("#navToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
        $("#navToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
        $("#tabContentToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
    }
}
function showStepToanBoThongTinHoSoBoiThuong(step) {
    if (nghiep_vu === "XE") {
        if (step === "tabToanBoThongTinHoSoBoiThuong") {
            _navToanBoThongTinHoSoBoiThuong.showTab(step);
            $("#anHienTabThongTinChungXeOTo").trigger('click');
            $("#anHienTabThongTinHoaDonChungTuXe").addClass("d-none");
            $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
            $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
            $("#tabToanBoThongTinChungXeOTo").addClass("active");
            $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("a.active").removeClass("active");
            $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("li:nth-child(2) > a").addClass("active");
            showStepThongTinHoSoBoiThuong("tabToanBoThongTinChungXeOTo");
        }
        if (step === "tabToanBoThongTinHoSoGiayTo") {
            _navToanBoThongTinHoSoBoiThuong.showTab(step);
            $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
            $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
            $("#tabToanBoAnhToanCanhXeOTo").addClass("active");
            $("#tabToanBoAnhToanCanhXeOToActive").trigger('click');
            $("#navToanBoThongTinHoSoGiayToXeOTo").find("a.active").removeClass("active");
            $("#navToanBoThongTinHoSoGiayToXeOTo").find("li:first-child > a").addClass("active");
        }
        return;
    }
    if (nghiep_vu === "NG" || nghiep_vu == "NGBL" || nghiep_vu == "NGTT") {
        if (step === "tabToanBoThongTinHoSoBoiThuong") {
            _navToanBoThongTinHoSoBoiThuong.showTab(step);
            $("#anHienTabThongTinChungConNguoi").trigger('click');
            $("#anHienTabThongTinHoaDonChungTuConNguoi").addClass("d-none");

            $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
            $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
            $("#tabToanBoThongTinChungConNguoi").addClass("active");
            $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("a.active").removeClass("active");
            $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("li:nth-child(2) > a").addClass("active");
            showStepThongTinHoSoBoiThuong("tabToanBoThongTinChungConNguoi");
        }
        if (step === "tabToanBoThongTinHoSoGiayTo") {
            _navToanBoThongTinHoSoBoiThuong.showTab(step);
            $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
            $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
            $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("active");
            $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoiActive").trigger('click');
            $("#navToanBoThongTinHoSoGiayToConNguoi").find("a.active").removeClass("active");
            $("#navToanBoThongTinHoSoGiayToConNguoi").find("li:first-child > a").addClass("active");
        }
        return;
    }
}
function showStepThongTinHoSoBoiThuong(step) {
    if (step === "tabToanBoThongTinHangMucTonThatXeOTo") {
        ESUtil.genHTML("tblToanBoThongTinHangMucTonThatXeOTo_template", "tblToanBoThongTinHangMucTonThatXeOTo", { data: [] }, () => {
            $("#tblToanBoThongTinHangMucTonThatTongTienGiamDinh_xemToanBoThongTinHSBTXe").html(0);
            $("#tblToanBoThongTinHangMucTonThatTongTienDeXuat_xemToanBoThongTinHSBTXe").html(0);
            $("#tblToanBoThongTinHangMucTonThatTongTienDuyet_xemToanBoThongTinHSBTXe").html(0);
        });
        $("#btnXemToanBoThongTinHMTT_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoThongTinBaoGiaPhuongAnXeOTo") {
        hienThiBangGiaPA(null);
        _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setDataSource([], "ten_pa", "so_id_pa");
        $("#btnXemToanBoThongTinBGPA_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoThongTinBoiThuongXeOTo") {
        ESUtil.genHTML("tblToanBoThongTinBoiThuongXeOTo_template", "tblToanBoThongTinBoiThuongXeOTo", { data: [] });
        $("#tblThongTinBoiThuongVCXMucMienThuong_xemToanBoThongTinHSBTXe").html(0);
        $("#tblThongTinBoiThuongVCXGiamTruKhac_xemToanBoThongTinHSBTXe").html(0);
        $("#btnXemToanBoThongTinTTBT_xemToanBoThongTinHSBTXe").trigger('click');
    }
    if (step === "tabToanBoYKienCanBoXeOTo") {
        ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoiXeOTo_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoiXeOTo_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiXeOTo').html("");
        trang = 1;
        getPagingNoiDungTraoDoiXeOTo(trang, () => {
            let div = $('#lichSuChatTraoDoiXeOTo').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoiXeOTo();
    }
    if (step === "tabToanBoThongTinLichSuTonThatConNguoi") {
        $("#tblToanBoThongTinLichSuTonThatConNguoi").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoThongTinYeuCauBaoHiemConNguoi") {
        $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi").find("tr:first-child").trigger("click");
    }
    if (step === "tabToanBoYKienCanBoConNguoi") {
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").setValue("NOI_BO");
        _frmNhomChatTraoDoi.getControl("loai_trao_doi").readOnly();
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoiConNguoi_template", "tblDanhSachCanBoThamGiaTraoDoiConNguoi", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoiConNguoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiConNguoi').html("");
        trang = 1;
        getPagingNoiDungTraoDoiConNguoi(trang, () => {
            let div = $('#lichSuTraoDoiConNguoi').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoiConNguoi();
    }
    return;
}
function showStepHinhAnhHoSoBoiThuong(step) {
    if (step === "tabToanBoAnhTonThatXeOTo") {
        $("#divTableXemToanBoAnhTonThatXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhToanCanhXeOTo") {
        $("#divTableXemToanBoAnhToanCanhXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoGiayToXeOTo") {
        $("#divTableXemToanBoAnhHoSoGiayToXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoChuaPhanLoaiXeOTo") {
        $("#divTableXemToanBoAnhChuaPhanLoaiXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi") {
        $("#divTableXemToanBoAnhGiayToTaiLieuCPLConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongXeOTo") {
        var obj = {
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh_ql,
            so_id: ho_so.thong_tin_chung.so_id_hd,
            so_id_dt: ho_so.thong_tin_chung.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongConNguoi") {
        var obj = {
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh_ql,
            so_id: ho_so.thong_tin_chung.so_id_hd,
            so_id_dt: ho_so.thong_tin_chung.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    return;
}
function xemToanBoHinhAnhHoSoBoiThuong(loai, hang_muc) {
    var data = {
        so_id: ho_so.thong_tin_chung.so_id,
        nv: nghiep_vu,
        hang_muc: hang_muc,
        loai: loai
    }
    window.open("/ViewImages?so_id=" + data.so_id + "&nv=" + data.nv + "&hm=" + data.hang_muc + "&loai=" + data.loai, '_blank');
}
function xemTabToanBoAnhHoSoBoiThuong(tabId) {
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: [] });
    trang = 1;
    if (tabId === "divTableToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhTonThatXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhTonThatXeOTo").addClass("d-none");
        getPagingListImages(1, "CHINH", () => { initImageViewerToanBoAnhXe(); });
    }
    if (tabId === "divTableToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhToanCanhXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhToanCanhXeOTo").addClass("d-none");
        getPagingListImages(1, "TOAN_CANH", () => { initImageViewerToanBoAnhXe(); });
    }
    if (tabId === "divTableAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhHoSoGiayToXeOTo").addClass("d-none");
        getPagingListImages(1, "TAI_LIEU", () => { initImageViewerToanBoAnhXe(); });
    }
    if (tabId === "divTableAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhChuaPhanLoaiXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhChuaPhanLoaiXeOTo").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhXe(); });
    }
    if (tabId === "divTableToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabAnhGiayToTaiLieu .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
        getPagingListImages(1, "TL", () => { initImageViewerToanBoAnhConNguoi(); });
    }
    if (tabId === "divTableToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhConNguoi(); });
    }
}
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: ho_so.thong_tin_chung.so_id,
        loai: loai,
        nv: nghiep_vu
    }
    obj.trang = trang;
    obj.so_dong = 6;
    if (nghiep_vu === "XE") {
        _carClaimCommonService.layDanhSachAnh(obj).then(res => {
            var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
            var source = res.data_info.data.where(n => ext.includes(n.extension));
            source = _.chain(source).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value })).value();
            var tong_so_dong = res.data_info.tong_so_dong;
            if (tong_so_dong % 6 == 0) {
                trang_max = tong_so_dong / 6;
            } else {
                trang_max = parseInt(tong_so_dong / 6) + 1;
            }
            if (source.length != 0) {
                if (loai === "CHINH") {
                    ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
                if (loai === "TOAN_CANH") {
                    ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
                if (loai === "TAI_LIEU") {
                    ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
                if (loai === "CHUA_PHAN_LOAI") {
                    ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
            } else {
                _notifyService.warning("Không có hình ảnh nào !");
                return;
            }
        });
    }
    if (nghiep_vu === "NG" || nghiep_vu === "NGBL" || nghiep_vu === "NGTT") {
        _healthClaimCommonService.layDanhSachAnh(obj).then(res => {
            var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
            var source = res.data_info.data.where(n => ext.includes(n.extension));
            source = _.chain(source).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value })).value();
            var tong_so_dong = res.data_info.tong_so_dong;
            if (tong_so_dong % 6 == 0) {
                trang_max = tong_so_dong / 6;
            } else {
                trang_max = parseInt(tong_so_dong / 6) + 1;
            }
            if (source.length != 0) {
                if (loai === "TL") {
                    ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
                if (loai === "CHUA_PHAN_LOAI") {
                    ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: source }, () => {
                        if (callback) {
                            callback();
                        }
                    });
                }
            } else {
                _notifyService.warning("Không có hình ảnh nào !");
                return;
            }
        });
    }
}
function xemChiTietHinhAnhHoSo(el) {
    _modalXemHinhAnhChiTiet.show();
}
function bindImagesToanBoAnhHoSo(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [] }));

    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
            });
        }
    });
    return result;
}
function bindImagesAnhThumnailHopDong(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [], extension: [] }));

    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
                if (!(item.extension.includes(item1.extension))) {
                    item.extension.push(item1.extension);
                }
            });
        }
    });
    return result;
}
function bindImagesHangMucTonThat(arrAnh) {
    $("#dsHinhAnhHangMucTonThat").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    return result;
}
function dowloadHinhAnhHoSo(arrAnh) {
    var arrAnhDowLoad = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhDowLoad.length; i++) {
        arr.push(arrAnhDowLoad[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        if (mergedArr.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (mergedArr.length === 1) {
            _carInvestigationService.layAnhChiTiet({ so_id: ho_so.thong_tin_chung.so_id, bt: mergedArr[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension);
                }
                if (extension === ".pdf") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/pdf");
                }
                if (extension === ".xlsx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
                if (extension === ".xls") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.ms-excel");
                }
                if (extension === ".doc") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/msword");
                }
                if (extension === ".docx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                }
            });
        } else {
            _carInvestigationService.taiFileAnhTonThatZip({ so_id: ho_so.thong_tin_chung.so_id, bt: mergedArr }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    } else {
        _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
        return;
    }
}
function printHinhAnhHoSo(arrAnh) {
    var arrAnhPrinted = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhPrinted.length; i++) {
        arr.push(arrAnhPrinted[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        _commonService.InHoaDon({
            ma_mau_in: "BT_IN_ANH_HOA_DON",
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            so_id: ho_so.thong_tin_chung.so_id,
            bt: mergedArr

        }, "#modalDocumentContents").then(res => {
            _modalPreviewFileService.viewFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf");
        });
    } else {
        _notifyService.error("Vui lòng chọn tài liệu cần in");
        return;
    }
}
function getImagesHinhAnhHoSo(name) {
    var arrAnh = [];
    $("input:checkbox[name='" + name + "']:checked").each(function () {
        arrAnh.push($(this).val());
    });
    return arrAnh;
}
function onChonTai(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkTaiAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkTaiAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonIn(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkInAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkInAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonXem(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkXemAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkXemAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
//--Hình ảnh hồ sơ--
function getToanBoAnhThumnailHopDong(obj, callback = undefined) {
    _carInvestigationService.layDanhSachFile({
        ma_doi_tac: obj.ma_doi_tac,
        ma_chi_nhanh: obj.ma_chi_nhanh_ql,
        so_id: obj.so_id,
        so_id_dt: obj.so_id_dt,
        pm: obj.pm
    }).then(res => {
        var arrAnh = res.data_info;
        var arrAnhTL = [];
        var arrAnhCPL = [];
        for (var i = 0; i < arrAnh.length; i++) {
            if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                arrAnhCPL.push(arrAnh[i]);
            }
            if (arrAnh[i].loai == "TT") {
                arrAnhTL.push(arrAnh[i]);
            }
        }
        var arrAnhPDF = arrAnhTL.where(n => n.extension == ".pdf");
        arrAnhTL = bindImagesAnhThumnailHopDong(arrAnhTL);
        arrAnhPDF = bindImagesAnhThumnailHopDong(arrAnhPDF);
        var arr = arrAnhTL.concat(arrAnhPDF);
        if (nghiep_vu === "XE") {
            ESUtil.genHTML("tblToanBoThongTinTaiLieuHopDongXeOTo_template", "tblToanBoThongTinTaiLieuHopDongXeOTo", { dataTaiLieuHD: arr });
        }
        if (nghiep_vu === "NG" || nghiep_vu === "NGBL" || nghiep_vu === "NGTT") {
            ESUtil.genHTML("tblToanBoThongTinTaiLieuHopDongConNguoi_template", "tblToanBoThongTinTaiLieuHopDongConNguoi", { dataTaiLieuHD: arr });
        }
        if (callback) {
            callback(res);
        }
    });
}
function openXemChiTietTaiLieuHopDong(val, bt, extension) {
    if (nghiep_vu === "XE") {
        if (extension == '.pdf') {
            _carInvestigationService.layAnhChiTiet({ so_id: ho_so.thong_tin_chung.so_id_hd, bt: bt }).then(res => {
                callBackViewFile(res);
            });
        } else {
            _carInvestigationService.layDanhSachFile({
                ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
                ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh_ql,
                so_id: ho_so.thong_tin_chung.so_id_hd,
                so_id_dt: ho_so.thong_tin_chung.so_id_dt,
                pm: "BH"
            }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                    var ext = [".jpg", ".png", ".jpeg", ".gif"];
                    var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                    var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                    ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                    $('#input_imagesHangMucTonThat').val(val);
                    $("#input_imagesHangMucTonThat").trigger('keyup');
                }
                initImageViewerHangMucTonThat();
                _modalXemHinhAnhHangMucTonThat.show();
            });
        }
    }
    if (nghiep_vu === "NG" || nghiep_vu === "NGBL" || nghiep_vu === "NGTT") {
        if (extension == '.pdf') {
            _healthClaimCommonService.layAnhChiTiet({ so_id: ho_so.thong_tin_chung.so_id_hd, bt: bt }).then(res => {
                callBackViewFile(res);
            });
        } else {
            _healthCareGuaranteeService.layDanhSachFile({
                ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
                ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh,
                so_id: ho_so.thong_tin_chung.so_id_hd,
                pm: "BH"
            }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                    var ext = [".jpg", ".png", ".jpeg", ".gif"];
                    var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                    var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                    ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                    $('#input_imagesHangMucTonThat').val(val);
                    $("#input_imagesHangMucTonThat").trigger('keyup');
                }
                initImageViewerHangMucTonThat();
                _modalXemHinhAnhHangMucTonThat.show();
            });
        }
    }
}
function openXemChiTietTaiLieuPDF(bt) {
    _carInvestigationService.layAnhChiTiet({ so_id: ho_so.thong_tin_chung.so_id, bt: bt }).then(res => {
        callBackViewFile(res);
    });
}
function initImageViewerToanBoAnhXe() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhXe');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhChiTietView',
        id: 'modalXemHinhAnhChiTietView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        viewed() {
            this.viewer.zoomTo(0.4);
        }
    };
    var viewer = new Viewer(pictures, options);
}
function initImageViewerToanBoAnhConNguoi() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhConNguoi');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhChiTietView',
        id: 'modalXemHinhAnhChiTietView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        viewed() {
            this.viewer.zoomTo(0.5);
        }
    };
    var viewer = new Viewer(pictures, options);
}
function initImageViewerHangMucTonThat() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-images-hang-muc');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'images-hang-muc-container',
        id: 'images-hang-muc-container',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function openXemHinhAnhHangMucTonThat(nv, val) {
    if (nv == 'XE') {
        _carInvestigationService.layDanhSachFile({
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh,
            so_id: ho_so.thong_tin_chung.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                $('#input_imagesHangMucTonThat').val(val);
                $("#input_imagesHangMucTonThat").trigger('keyup');
            }
            initImageViewerHangMucTonThat();
        });
    }
    if (nv == 'NG') {
        _healthClaimCommonService.layDanhSachFile({
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            ma_chi_nhanh: ho_so.thong_tin_chung.ma_chi_nhanh,
            so_id: ho_so.thong_tin_chung.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                $('#input_imagesHangMucTonThat').val(val);
                $("#input_imagesHangMucTonThat").trigger('keyup');
            }
            initImageViewerHangMucTonThat();
        });
    }
    _modalXemHinhAnhHangMucTonThat.show();
}
function openXemChiTietMauIn(ma_mau_in) {
    _modalDocumentService.onClickIem = function (ma_mau_in) {
        _commonService.InPdf({
            ma_mau_in: ma_mau_in,
            ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
            ma_doi_tac_ql: ho_so.thong_tin_chung.ma_doi_tac_ql,
            so_id: ho_so.thong_tin_chung.so_id,
            so_id_hd: ho_so.thong_tin_chung.so_id_hd,
            so_id_dt: ho_so.thong_tin_chung.so_id_dt
        }, "#modalDocumentContents").then(response => {
            _modalDocumentService.viewFile(response);
        });
    }
    _modalDocumentService.show(ma_mau_in);
}
//Xe
function xemThongTinChiTietHoSoBoiThuong(nhom, lhnv) {
    var obj = {
        ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
        so_id: ho_so.thong_tin_chung.so_id,
        nhom: nhom,
        lhnv: lhnv
    }
    _carClaimCommonService.xemThongTinHoSoBoiThuong(obj).then(res => {
        var dataHangMuc = res.data_info.hang_muc;
        var thong_tin_chung = res.data_info.thong_tin_chung;
        $("#tblThongTinBoiThuongVCXMucMienThuong_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(thong_tin_chung.mien_thuong));
        $("#tblThongTinBoiThuongVCXGiamTruKhac_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(thong_tin_chung.thue));

        if (dataHangMuc.length > 0) {
            ESUtil.genHTML("tblToanBoThongTinHangMucTonThatXeOTo_template", "tblToanBoThongTinHangMucTonThatXeOTo", { data: dataHangMuc }, () => {
                var tblPhuongAnVCXTienGiamDinh = res.data_info.hang_muc.sum(n => n.gia_giam_dinh);
                var tblPhuongAnVCXTienDeXuat = res.data_info.hang_muc.sum(n => n.gia_duyet_dx);
                var tblPhuongAnVCXTienDuyet = res.data_info.hang_muc.sum(n => n.gia_duyet);
                $("#tblToanBoThongTinHangMucTonThatTongTienGiamDinh_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienGiamDinh));
                $("#tblToanBoThongTinHangMucTonThatTongTienDeXuat_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienDeXuat));
                $("#tblToanBoThongTinHangMucTonThatTongTienDuyet_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tblPhuongAnVCXTienDuyet));
            });
        }
        ESUtil.genHTML("tblToanBoThongTinBoiThuongXeOTo_template", "tblToanBoThongTinBoiThuongXeOTo", { data: res.data_info.thong_tin_boi_thuong }, () => {
            var tienGiaDuyetVtu = 0;
            var tienGiaDuyetNC = 0;
            var tienGiaDuyetKhac = 0;
            var tienGiamGia = 0;
            var tienKhauTru = 0;
            var tienThue = 0;
            var data = res.data_info.thong_tin_boi_thuong;
            for (var i = 0; i < data.length; i++) {
                tienGiaDuyetVtu += parseFloat(data[i].gia_vtu_duyet);
                tienGiaDuyetNC += parseFloat(data[i].gia_nhan_cong_duyet);
                tienGiaDuyetKhac += parseFloat(data[i].gia_khac_duyet);
                tienGiamGia += parseFloat(data[i].giam_gia);
                tienKhauTru += parseFloat(data[i].tien_ktru_tien_bh);
                tienThue += parseFloat(data[i].tien_thue);
            }
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetVtu_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetVtu));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetNC_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetNC));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetKhac_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiaDuyetKhac));
            $("#tblToanBoThongTinBoiThuongVCXTienDuyetGiamGia_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienGiamGia));
            $("#tblToanBoThongTinBoiThuongVCXTienKhauTru_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienKhauTru));
            $("#tblToanBoThongTinBoiThuongVCXTienThue_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tienThue));
        });
        var dataPhuongAn = res.data_info.phuong_an;
        if (dataPhuongAn.length > 0) {
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setDataSource(res.data_info.phuong_an, "ten_pa", "so_id_pa");
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").setValue(res.data_info.phuong_an[0].so_id_pa);
            _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").trigger("select2:select");
        }
    });
}
function xemThongTinChiTietPhuongAn(so_id_pa) {
    var obj = {
        ma_doi_tac: ho_so.thong_tin_chung.ma_doi_tac,
        so_id: ho_so.thong_tin_chung.so_id,
        so_id_pa: so_id_pa,
        lh_nv: ho_so.lh_nv[0].ma
    };
    _carInvestigationService.xemChiTietPhuongAn(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        hienThiBangGiaPA(res.data_info.tong_hop_pa);
    });
}
function hienThiBangGiaPA(obj) {
    //TIỀN DUYỆT GIÁ
    $(".tinhToanNVPATienDuyetGia").html("0");
    //KHẤU HAO, GIẢM TRỪ BỒI THƯỜNG, GIẢM GIÁ
    $(".tinhToanNVPATienKhauHao").html("0");
    $(".tinhToanNVPATienBH").html("0");
    $(".tinhToanNVPAGiamTru").html("0");
    $(".tinhToanNVPAGiamTruKhac").html("0");
    $(".tinhToanNVPATienGiamGiaVtu").html("0");
    $(".tinhToanNVPATienGiamGiaNhanCong").html("0");
    $(".tinhToanNVPATienGiamGiaKhac").html("0");
    $(".tinhToanNVPATongKhauHaoGiamTruGiamGia").html("0");
    //KHẤU TRỪ THEO HỢP ĐỒNG, QUY TẮC BẢO HIỂM
    $(".tinhToanNVPATienKhauTruPTBoiThuong").html("0");
    $(".tinhToanNVPAMienThuong").html("0");
    $(".tinhToanNVPATongKhauTru").html("0");
    //CHI PHÍ CẨU KÉO (GỒM GIẢM TRỪ NẾU CÓ)
    $(".tinhToanNVPAChiPhiCau").html("0");
    $(".tinhToanNVPAChiPhiKeo").html("0");
    $(".tinhToanNVPAChiPhiKhac").html("0");
    $(".tinhToanNVPATongChiPhi").html("0");
    //SỐ TIỀN BỒI THƯỜNG
    $(".tinhToanNVPATienSuaChuaChuaVAT").html("0");
    $(".tinhToanNVPATienChiPhiKhacChuaVAT").html("0");

    $(".tinhToanNVPATienBoiThuongChuaVAT").html("0");
    $(".tinhToanNVPATienThue").html("0");
    $(".tinhToanNVPATienThueChiPhiKhac").html("0");
    $(".tinhToanNVPATongThue").html("0");

    $(".tinhToanNVPATienBoiThuongBaoGomVAT").html("0");
    $(".tinhToanNVPATienKHChiTra").html("0");

    $(".tinhToanNVPAGiamGia").html("0");
    $(".tinhToanNVPAChiPhiKhac").html("0");
    $(".tinhToanNVPATienBoiThuong").html("0");
    $(".tinhToanNVPAConLai").html("0");
    $(".tinhToanNVPATongCong").html("0");

    if (obj != null) {
        $(".tinhToanNVPATienDuyetGia").html(obj.tong_gia_duyet);
        //KHẤU HAO, GIẢM TRỪ BỒI THƯỜNG, GIẢM GIÁ
        $(".tinhToanNVPATienKhauHao").html(obj.tien_khau_hao);
        $(".tinhToanNVPATienBH").html(obj.tien_bao_hiem);
        $(".tinhToanNVPAGiamTru").html(obj.tien_giam_tru);
        $(".tinhToanNVPAGiamTruKhac").html(obj.tien_giam_tru_khac);
        $(".tinhToanNVPATienGiamGiaVtu").html(obj.tien_giam_gia_vtu);
        $(".tinhToanNVPATienGiamGiaNhanCong").html(obj.tien_giam_gia_nhan_cong);
        $(".tinhToanNVPATienGiamGiaKhac").html(obj.tien_giam_gia_khac);
        $(".tinhToanNVPATongKhauHaoGiamTruGiamGia").html(obj.tong_giam_chua_ktru);
        //KHẤU TRỪ THEO HỢP ĐỒNG, QUY TẮC BẢO HIỂM
        $(".tinhToanNVPATienKhauTruPTBoiThuong").html(obj.tien_ktru_bh);
        $(".tinhToanNVPAMienThuong").html(obj.tien_mien_thuong);
        $(".tinhToanNVPATongKhauTru").html(obj.tong_ktru);
        //CHI PHÍ CẨU KÉO (GỒM GIẢM TRỪ NẾU CÓ)
        $(".tinhToanNVPAChiPhiCau").html(obj.cp_cau);
        $(".tinhToanNVPAChiPhiKeo").html(obj.cp_keo);
        $(".tinhToanNVPAChiPhiKhac").html(obj.cp_khac);
        $(".tinhToanNVPATongChiPhi").html(obj.tong_cp_khac);
        //SỐ TIỀN BỒI THƯỜNG
        $(".tinhToanNVPATienSuaChuaChuaVAT").html();//Tiền sửa chữa chưa vat
        $(".tinhToanNVPATienChiPhiKhacChuaVAT").html(obj.tong_cp_khac);//Chi phí khác chưa vat
        $(".tinhToanNVPATienBoiThuongChuaVAT").html(obj.tien_bt_chua_vat);//Tiền bồi thường chưa VAT
        $(".tinhToanNVPATienThue").html(obj.tien_thue);
        $(".tinhToanNVPATienThueChiPhiKhac").html("0");
        $(".tinhToanNVPATongThue").html(obj.tien_thue);

        $(".tinhToanNVPATienBoiThuongBaoGomVAT").html(obj.tien_bt_gom_vat);
        $(".tinhToanNVPATienKHChiTra").html(obj.tien_kh_chi_tra_chua_vat);
    }
}
//Con người
function xemChiTietLichSuTonThat(ma_doi_tac, so_id, callback = undefined) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id
    }
    $("#tblToanBoThongTinLichSuTonThatConNguoi tr.active_row").removeClass('active_row');
    $("#tblToanBoThongTinLichSuTonThatConNguoi tr[data-id='" + obj.so_id + "']").addClass('active_row');
    ESUtil.genHTML("tblToanBoThongTinChiTietQuyenLoiHoSoConNguoi_template", "tblToanBoThongTinChiTietQuyenLoiHoSoConNguoi", { data: [] });
    _healthClaimCommonService.layHoSoQuyenLoi(obj).then(res => {
        ESUtil.genHTML("tblToanBoThongTinChiTietQuyenLoiHoSoConNguoi_template", "tblToanBoThongTinChiTietQuyenLoiHoSoConNguoi", { data: res.data_info }, () => {
            var tong_yc = 0, tong_giam = 0, tong_duyet = 0;
            $.each(res.data_info, (index, item) => {
                tong_yc += parseFloat(item.tien_yc);
                tong_giam += parseFloat(item.tong_tien_giam);
                tong_duyet += parseFloat(item.tien_duyet);
            });
            $('#lsttTongTienYeuCau_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_yc));
            $('#lsttTongTienGiam_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_giam));
            $('#lsttTongTienDuyet_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_duyet));
        });
        if (callback) {
            callback;
        }
    });
}
function xemChiTietLanKhamChuaBenh(lan) {
    $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi tr.active_row").removeClass("active_row");
    var lan_kham = thong_tin_toan_bo_ho_so.lan_kham.where(n => n.lan == lan).firstOrDefault();
    ESUtil.genHTML("tblToanBoThongTinYeuCauBaoHiemConNguoi_template", "tblToanBoThongTinYeuCauBaoHiemConNguoi", { data: [] });
    if (lan_kham != null) {
        $("#tblToanBoThongTinKhamChuaBenhYCBHConNguoi tr#lan_kham_" + lan).addClass("active_row");
        var qloi = thong_tin_toan_bo_ho_so.lan_kham_qloi.where(n => n.lan == lan);
        ESUtil.genHTML("tblToanBoThongTinYeuCauBaoHiemConNguoi_template", "tblToanBoThongTinYeuCauBaoHiemConNguoi", { data: qloi }, () => {
            var tongSoTienYeuCauBaoHiemConNguoi = 0;
            var tongSoTienGiamTruBaoHiemConNguoi = 0;
            var tongSoTienDuyetBaoHiemConNguoi = 0;
            if (qloi != null && qloi.length > 0) {
                for (var i = 0; i < qloi.length; i++) {
                    tongSoTienYeuCauBaoHiemConNguoi += parseInt(qloi[i].tien_yc);
                    tongSoTienGiamTruBaoHiemConNguoi += parseInt(qloi[i].tong_tien_giam);
                    tongSoTienDuyetBaoHiemConNguoi += parseInt(qloi[i].tien_duyet);
                }
            }
            $('#tongSoTienYeuCauBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienYeuCauBaoHiemConNguoi));
            $('#tongSoTienGiamTruBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienGiamTruBaoHiemConNguoi));
            $('#tongSoTienDuyetBaoHiemConNguoi_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tongSoTienDuyetBaoHiemConNguoi));
        });
    }
}
function showGhiChuLSTTToanBoThongTin(el) {
    _popoverGhiChuLSTT.options = { placement: "left" };
    $("#divGhiChu_NoiDungLSTT").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divGhiChu_NoiDungLSTT").val(val);
    _popoverGhiChuLSTT.showWithPosition(el);
}
function showNguyenNhanGiamTru(el) {
    _popoverNguyenNhanGiamTru.options = { placement: "left" };
    $("#divNguyenNhanGiamTru").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divNguyenNhanGiamTru").val(val);
    _popoverNguyenNhanGiamTru.showWithPosition(el);
}
//Ý kiến - XE
function getPagingNoiDungTraoDoiXeOTo(trang, callback = undefined) {
    var obj = {
        so_id: ho_so.thong_tin_chung.so_id,
        nv: "XE"
    }
    obj.trang = trang;
    obj.so_dong = 7;
    _carClaimCommonService.lietKeNoiDungTraoDoi(obj).then(res => {
        var data = res.data_info.data;
        var tong_so_dong = res.out_value.tong_so_dong;
        if (tong_so_dong % 7 == 0) {
            trang_max_nd = tong_so_dong / 7;
        } else {
            trang_max_nd = parseInt(tong_so_dong / 7) + 1;
        }
        if (data.length != 0) {
            data = data.reverse();
            ESUtil.prependHTML("tblDanhSachNoiDungTraoDoiXeOTo_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: data }, () => {
                if (callback) {
                    callback();
                }
            });
            $("#soLuongTinNhanTraoDoiXeOTo").html("(" + tong_so_dong + " tin nhắn)");
        }
    });
}
function xoaNguoiThamGiaTraoDoiXeOTo(so_id, nv, ma_nsd) {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa cán bộ này khỏi danh sách cán bộ trao đổi này không?", "", () => {
        var obj = {
            so_id: so_id,
            nv: nv,
            ma_nsd: ma_nsd
        }
        _carClaimCommonService.xoaCanBoTraoDoi(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin thành công");
            getPagingDanhSachCanBoTraoDoiXeOTo();
        });
    });
}
function getPagingDanhSachCanBoTraoDoiXeOTo() {
    var obj = {
        so_id: ho_so.thong_tin_chung.so_id,
        nv: "XE"
    }
    _carClaimCommonService.lietKeDanhSachCanBoTraoDoi(obj).then(res => {
        var data = res.data_info;
        var so_nguoi_tg = data.length;
        ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoiXeOTo_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: data });
        $("#soNguoiThamGiaTraoDoiXeOTo").html("(Có " + so_nguoi_tg + " cán bộ)")
    });
}
function bindDataCanBoTraoDoiXeOTo(ma_doi_tac, so_id) {
    _frmThemCanBoTraoDoiXeOTo.getControl("so_id").val(so_id);
    _frmThemCanBoTraoDoiXeOTo.getControl("nv").val('XE');
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setValue("");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}
//Ý kiến - NG
function getPagingNoiDungTraoDoiConNguoi(trang, callback = undefined) {
    var obj = {
        so_id: ho_so.thong_tin_chung.so_id,
        nv: "NG"
    }
    obj.trang = trang;
    obj.so_dong = 7;
    _healthClaimCommonService.lietKeNoiDungTraoDoi(obj).then(res => {
        var data = res.data_info.data;
        var tong_so_dong = res.out_value.tong_so_dong;
        if (tong_so_dong % 7 == 0) {
            trang_max_nd = tong_so_dong / 7;
        } else {
            trang_max_nd = parseInt(tong_so_dong / 7) + 1;
        }
        if (data.length != 0) {
            data = data.reverse();
            ESUtil.prependHTML("tblDanhSachNoiDungTraoDoiConNguoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: data }, () => {
                if (callback) {
                    callback();
                }
            });
            $(".chat-num-messages").html("(" + tong_so_dong + " tin nhắn)");
        }
    });
}
function xoaNguoiThamGiaTraoDoiConNguoi(so_id, nv, ma_nsd) {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa cán bộ này khỏi danh sách cán bộ trao đổi này không?", "", () => {
        var obj = {
            so_id: so_id,
            nv: nv,
            ma_nsd: ma_nsd
        }
        _healthClaimCommonService.xoaCanBoTraoDoi(obj).then(res => {
            if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin thành công");
            getPagingDanhSachCanBoTraoDoiConNguoi();
        });
    });
}
function getPagingDanhSachCanBoTraoDoiConNguoi() {
    var obj = {
        so_id: ho_so.thong_tin_chung.so_id,
        nv: "NG"
    }
    _healthClaimCommonService.lietKeDanhSachCanBoTraoDoi(obj).then(res => {
        var data = res.data_info;
        var so_nguoi_tg = data.length;
        ESUtil.genHTML("tblDanhSachCanBoThamGiaTraoDoiConNguoi_template", "tblDanhSachCanBoThamGiaTraoDoiConNguoi", { data: data });
        $("#soNguoiThamGiaTraoDoiConNguoi").html("(Có " + so_nguoi_tg + " cán bộ)")
    });
}
function bindDataCanBoTraoDoiConNguoi(ma_doi_tac, so_id) {
    _frmThemCanBoTraoDoiConNguoi.getControl("so_id").val(so_id);
    _frmThemCanBoTraoDoiConNguoi.getControl("nv").val('NG');
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").setValue("");
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}
//Copy link
function copyLinkChupHT(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
function copyLinkChupCT(el) {
    var text = $(el).attr("data-val");
    navigator.clipboard.writeText(text);
    _notifyService.success("Copy thành công")
}
//Tìm kiếm nhiều chi nhánh
function onFocusTimKiem(el) {
    $(el).focus();
}
function onChonDonViXuly(el, placement = "bottom") {
    $("#chon_tat_ca").prop("checked", false);
    var count_item = $(".modalChonChiNhanh").length;
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonChiNhanhDanhSach .modalChonChiNhanh").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanh[value='" + arr[i] + "']").prop("checked", true);
    }
    if (count_item === arr.length)
        $("#chon_tat_ca").prop("checked", true);
    _modalChonChiNhanh.setPlacement(placement);
    _modalChonChiNhanh.show(el);
}
function onChonTatCaDonVi(el) {
    arrChiNhanhTKiem = [];
    var checked = $(el).is(":checked");
    if (checked) {
        $(".modalChonChiNhanh").prop("checked", checked);
        $.each($("#modalChonChiNhanhDanhSach input.modalChonChiNhanh"), function (index, item) {
            if ($('.modalChonChiNhanh').is(':checked')) {
                var val = $(item).val();
                arrChiNhanhTKiem.push(val);
                $("#modalChonChiNhanhTimKiem_ma").val(arrChiNhanhTKiem.join("|"));
            }
        });
    } else {
        $(".modalChonChiNhanh").prop("checked", false);
        $("#modalChonChiNhanhTimKiem_ma").val("");
    }
}
function onChonDonVi(el) {
    var count_item = $(".modalChonChiNhanh").length;
    var count_checked = $(".modalChonChiNhanh:checked").length;
    $("#chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#modalChonChiNhanhTimKiem_ma").val() != "") {
        arr_ma = $("#modalChonChiNhanhTimKiem_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#modalChonChiNhanhTimKiem_ma").val(arr_ma.join("|"));
}
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("THANH_TOAN");
    _frmTimKiemThanhToan.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemThanhToan.getControl("ngay_c").setValue(dateNow);
    _frmSearchHoSoTon.getControl("ngay_d").setValue(ngayDauThang);
    _frmSearchHoSoTon.getControl("ngay_c").setValue(dateNow);
    _frmSearchHoSoTon.getControl("nv").setValue("XE");
    getPaging(1);
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _service.layDsTaiKhoanChiNhanh(),
        _healthClaimCommonService.layDsBenhVien(),
        _carClaimCommonService.layDsDonViXinYKien(),
        _userManagementService.layDsNSD(),
        _userManagementService.layDsCanBoQuyen()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.tai_khoan = arrRes[2].data_info;
        objDanhMuc.benh_vien = arrRes[3].data_info;
        objDanhMuc.dsDonVi = arrRes[4].data_info.don_vi;
        objDanhMuc.can_bo = arrRes[5].data_info;
        objDanhMuc.ds_nsd_quyen_blvp = arrRes[6].data_info.nsd_quyen_blvp;
        objDanhMuc.ds_nsd_quyen_tncn = arrRes[6].data_info.nsd_quyen_tncn;
        objDanhMuc.ds_nsd_quyen_ttbt = arrRes[6].data_info.nsd_quyen_ttbt;
        objDanhMuc.ngan_hang = [];
        for (var i = 0; i < objDanhMuc.tai_khoan.length; i++) {
            var obj = { ngan_hang: objDanhMuc.tai_khoan[i].ngan_hang, ten_ngan_hang: objDanhMuc.tai_khoan[i].ten_ngan_hang };
            var count = objDanhMuc.ngan_hang.where(n => n.ngan_hang == obj.ngan_hang).length;
            if (count <= 0) {
                objDanhMuc.ngan_hang.push(obj);
            }
        }
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiemThanhToan.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmTimKiemThanhToan.getControl("ma_doi_tac").trigger("select2:select");
        _frmThanhToan.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten_ngan_hang", "ngan_hang", "Chọn ngân hàng", "");
        _frmThanhToan.getControl("tai_khoan").setDataSource([], "tai_khoan", "ma_tai_khoan", "Chọn tài khoản thanh toán", "");

        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").trigger("select2:select");
        _frmSearchHoSoDeNghiThanhToan.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmSearchHoSoDeNghiThanhToan.getControl("ma_doi_tac_ql").trigger("select2:select");

        _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
        _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");

        _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").addEventChange(val => {
            var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
            _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
            _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setValue("");
        });
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").addEventChange(val => {
            var arrCanBo = [];
            arrCanBo = arrCanBo.concat(objDanhMuc.ds_nsd_quyen_blvp, objDanhMuc.ds_nsd_quyen_tncn, objDanhMuc.ds_nsd_quyen_ttbt);
            arrCanBo = arrCanBo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
            _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
            _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setValue("");
        });

        _frmTimKiemThanhToan.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh_ql").setValue("");
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh").setValue("");
        ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });

        hienThiHoSoNofify();
    });

    _frmThanhToan.getControl("ma_nh").addEventChange(val => {
        var tai_khoan = objDanhMuc.tai_khoan.where(n => n.ngan_hang == val);
        _frmThanhToan.getControl("tai_khoan").setDataSource(tai_khoan, "tai_khoan", "tai_khoan", "Chọn tài khoản thanh toán", "");
    });
    _frmSearchHoSoTon.getControl("ma_doi_tac_ql").addEventChange(val => {
        var data = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        ESUtil.genHTML("modalChonDonViDanhSachTemplate", "modalChonDonViDanhSach", { danh_sach: data });
    });
    _frmSearchHoSoTon.getControl("nsd_duyet_bt").addEventChange(val => {
        getHoSoTon(1);
    });
    _frmSearchHoSoTon.getControl("nv").addEventChange(val => {
        getHoSoTon(1);
    });
    $("#Modal_btnChonDonVi").click(function () {
        var data_val = ""; var ten_dvi = "";
        var count = $("#modalChonDonViDanhSach .modalChonDvi:checked").length;
        $("#modalChonDonViDanhSach .modalChonDvi:checked").each(function () {
            var val = $(this).val();
            if (data_val == "") {
                var dvi = objDanhMuc.dsDonVi.where(n => n.ma == val).firstOrDefault();
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
        $(_modalChiNhanhDonVi.target).attr("data-val", data_val);
        $(_modalChiNhanhDonVi.target).val(ten_dvi);
        _modalChiNhanhDonVi.hide();
    });
    $("#btnTimKiemHoSoTon").click(function () {
        var so_id_tt = _frmThanhToan.getControl("so_id_tt").val();
        if (so_id_tt != "") {
            return;
        }
        getHoSoTon(1);
    });
    $("form[name='frmSearchHoSoTon'] input[name='ngay_d'],input[name='ngay_c'],input[name='noi_dung']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getHoSoTon(1);
        }
    });
    _frmTaoNoiDung.getControl('nv').addEventChange(val => {
        var arr_nv = arrNghiepVu.where(n => n.nv == val);
        _frmTaoNoiDung.getControl("pm").setDataSource(arr_nv, "ten", "ma", "Chọn phần mềm", "");
    });
    _frmTaoNoiDung.getControl('pm').addEventChange(val => {
        var arr_nv_ct = arrNV_CT.where(n => n.pm == val);
        _frmTaoNoiDung.getControl("nv_ct").setDataSource(arr_nv_ct, "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
    });
    _frmXemThongTinBaoGiaPhuongAn.getControl("phuong_an").addEventChange(val => {
        xemThongTinChiTietPhuongAn(val);
    });
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").addEventChange(val => {
        var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setValue("");
    });
    _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").addEventChange(val => {
        var arrCanBo = [];
        arrCanBo = arrCanBo.concat(objDanhMuc.ds_nsd_quyen_blvp, objDanhMuc.ds_nsd_quyen_tncn, objDanhMuc.ds_nsd_quyen_ttbt);
        arrCanBo = arrCanBo.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC && n.ma_chi_nhanh === val);
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").setValue("");
    });
    $("#btnThemMoiHoSo").click(function () {
        dsHoSoThanhToan = [];
        dsHoSoDeNghiThanhToan = [];
        anHienNut(true);
        $('#ttbt_chon_tat_ca').removeAttr("disabled");
        $("#ttbt_chon_tat_ca").prop("checked", false);
        $("#btnDanhSachHoSoDeNghiThanhToan").addClass("d-none");
        _frmThanhToan.resetForm();
        _frmThanhToan.getControl("ngay_ht").setValue(dateNow);
        _frmSearchHoSoTon.resetForm();
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC);
        _frmSearchHoSoTon.getControl("ngay_d").setValue(ngayDauThang);
        _frmSearchHoSoTon.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoTon.getControl("nv").setValue("XE");
        _frmSearchHoSoTon.getControl("nv").readOnly(false);
        _frmSearchHoSoTon.getControl("noi_dung").readOnly(false);
        $("#txtSoHSThanhToan").html("0");
        getHoSoTon(1, res => {
            _modalThanhToanBoiThuong.show();
        });
    });
    $("#btnThemDeNghiThanhToan").click(function () {
        var obj = _frmSearchHoSoTon.getJsonData();
        anHienTabXemToanBoThongTinHoSoBoiThuong(obj.nv)
        var arrHoSoCho = dsHoSoThanhToan;
        if (arrHoSoCho.length <= 0) {
            _notifyService.error("Bạn chưa chọn hồ sơ làm đề nghị thanh toán!");
            return;
        }
        var arrHoSoDeNghi = dsHoSoDeNghiThanhToan;
        for (var i = 0; i < arrHoSoDeNghi.length; i++) {
            for (var j = 0; j < arrHoSoCho.length; j++) {
                if (arrHoSoDeNghi[i].bt == arrHoSoCho[j].bt) {
                    arrHoSoDeNghi = arrHoSoDeNghi.removeItem(n => n.bt == arrHoSoCho[j].bt);
                }
            }
        }
        var arr = arrHoSoCho.concat(arrHoSoDeNghi);
        ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: arr }, () => {
            $("#btnLuuDeNghiThanhToanHoSo").removeClass("d-none");
            $("#btnThemHoSoTon").removeClass("d-none");
            $("#btnXacNhanThanhToan").addClass("d-none");
            $("#btnXuatBaoCaoThanhToan").addClass("d-none");
            $("#btnXoa").addClass("d-none");
            $("#btnIn").addClass("d-none");
            $("#btnTrinhThanhToan").addClass("d-none");
            _frmSearchHoSoDeNghiThanhToan.getControl("nv").setValue(obj.nv);
            _modalThanhToanBoiThuong.hide();
            _modalThanhToanBoiThuongChiTiet.show();
        });
    });
    $("#btnDanhSachHoSoDeNghiThanhToan").click(function () {
        var arr = dsHoSoDeNghiThanhToan;
        ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: arr }, () => {
            $("#txtSoHSThanhToan").html(arr.length);
            _modalThanhToanBoiThuong.hide();
            _modalThanhToanBoiThuongChiTiet.show();
        });
    });
    $("#btnThemHoSoTon").click(function () {
        var obj = _frmSearchHoSoDeNghiThanhToan.getJsonData();
        var arrHoSoDeNghi = dsHoSoDeNghiThanhToan;
        if (arrHoSoDeNghi.length > 0) {
            $("#btnDanhSachHoSoDeNghiThanhToan").removeClass("d-none");
        }
        getHoSoTon(1, res => {
            $(".ttbt_item").removeAttr("disabled");
            $(".ttbt_item").prop("checked", false);
            $('#ttbt_chon_tat_ca').removeAttr("disabled");
            $('#ttbt_chon_tat_ca').prop("checked", false);
            $("#txtSoHSThanhToan").html("0");
            _modalThanhToanBoiThuongChiTiet.show();
            _modalThanhToanBoiThuong.show();
            _frmSearchHoSoTon.getControl("nv").setValue(obj.nv);
            _frmSearchHoSoTon.getControl("nv").readOnly();
            _frmSearchHoSoTon.getControl("nv").trigger("select2:select");
            _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setValue(obj.ma_doi_tac_ql);
        });
    });
    $("#btnLuuDeNghiThanhToanHoSo").click(function () {
        var obj = _frmThanhToan.getJsonData();
        var nv = _frmSearchHoSoDeNghiThanhToan.getControl("nv").val();
        dsHoSoDeNghiThanhToan = layDuLieuHoSoDeNghiThanhToan();
        obj.nhom = nv;
        obj.dvi_nhan = "";
        if (nv != "XE") {
            if (nv != 'HSGD') {
                nv = "NG";
            }
        }
        if (_frmThanhToan.isValid()) {
            obj.arr = dsHoSoDeNghiThanhToan;
            if (obj.arr.length <= 0) {
                _notifyService.error("Bạn chưa chọn hồ sơ thanh toán.");
                return;
            }
            for (var i = 0; i < obj.arr.length; i++) {
                delete obj.arr[i].trang_thai;
            }
            obj.nv = nv;
            obj.ma_cnhanh_nh = "";
            obj.ma_tk = obj.tai_khoan;
            _service.nhapHsThanhToan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmThanhToan.getControl("so_id_tt").setValue(res.out_value.so_id_tt);
                _notifyService.success("Lưu đề nghị thanh toán thành công.");
                getPaging(1);
                _modalThanhToanBoiThuongChiTiet.hide();
            });
        }
    });
    $("#btnTKiemHsDeNghiThanhToan").click(function () {
        var so_id_tt = _frmThanhToan.getControl("so_id_tt").val();
        if (so_id_tt != "") {
            return;
        }
        $("#inputNoiDungTimKiem").focus();
    });
    $("#btnXoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa tất cả hồ sơ đề nghị thanh toán này không?", "", () => {
            var obj = _frmThanhToan.getJsonData();
            if (_frmThanhToan.isValid()) {
                _service.xoaHsThanhToan(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _modalThanhToanBoiThuongChiTiet.hide();
                    _notifyService.success("Xóa thành công");
                    getPaging(1);
                });
            }
        });
    });
    $("#btnIn").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_TTBT", ten: "Bảng kê thanh toán bồi thường" },
        ];
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_DE_NGHI_THANH_TOAN_BT", ten: "Đề nghị thanh toán bồi thường" }
            ]
        }
        _modalDocumentService.setDataSource(sourceMauIn);
        _modalDocumentService.onClickIem = function (ma_mau_in) {
            _commonService.InPdf({
                ma_mau_in: ma_mau_in,
                ma_doi_tac: ho_so_chi_tiet.ttchung.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.ttchung.ma_doi_tac,
                so_id: ho_so_chi_tiet.ttchung.so_id_tt
            },
                "#modalDocumentContents").then(response => {
                    _modalDocumentService.viewFile(response);
                });
        }
        _modalDocumentService.show("ESCS_TTBT");
    });
    $("#btnXuatBaoCaoThanhToan").click(function () {
        var obj = _frmSearchHoSoTon.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_CHUYEN_TIEN";
        obj.ma_doi_tac = ho_so_chi_tiet.ttchung.ma_doi_tac;
        obj.so_id_tt = ho_so_chi_tiet.ttchung.so_id_tt;
        _serviceThanhToan.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnXacNhanThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn xác nhận thanh toán đề nghị này không?", "", val => {
            var obj = { so_id_tt: ho_so_chi_tiet.ttchung.so_id_tt };
            _service.xacNhanThanhToan(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.ttchung.trang_thai = "D";
                anHienNut();
                getPaging(1);
                _notifyService.success("Xác nhận thanh toán thành công");
            });
        });
    });
    $("#btnHuyXacNhanThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn gỡ đề nghị thanh toán này không?", "", val => {
            var obj = { so_id_tt: ho_so_chi_tiet.ttchung.so_id_tt };
            _service.huyXacNhanThanhToan(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.ttchung.trang_thai = "C";
                anHienNut();
                getPaging(1);
                _notifyService.success("Gỡ xác nhận đề nghị thanh toán thành công");
            });
        });
    });
    $("#modalChonDonViTimKiem").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        var ma_doi_tac = _frmSearchHoSoTon.getControl("ma_doi_tac_ql").getValue();
        var data = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == ma_doi_tac);
        if (tim == "") {
            $("#modalChonDonViDanhSach .modalChonDonViDanhSachItem").removeClass("d-none");
            return;
        }
        $("#modalChonDonViDanhSach .modalChonDonViDanhSachItem").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = data.where(n => n.ten_tat.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalChonDonViDanhSach #modalChonDonViDanhSachItem_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("form[name='frmTimKiemThanhToan'] input[name='ngay_d'],input[name='ngay_c'],input[name='so_hs'],input[name='ten_kh']").on('keyup', function (e) {
        if (e.key === 'Enter' || e.keyCode === 13) {
            getPaging(1);
        }
    });
    $("#btnFrmSearch").click(function () {
        getPaging(1);
    });
    //Trình duyệt
    $("#btnTrinhDuyet").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ttchung.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ttchung.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.ttchung.so_id_tt,
            nghiep_vu: "THANH_TOAN",
            loai_trinh: "TRINH_THANH_TOAN",
            pm: CONSTANT_PM
        };
        obj.ma = "TEMPLATE_EMAIL_TRINH_THANH_TOAN_BT";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            var objGetDetail = { ma_doi_tac: obj.ma_doi_tac, so_id_tt: obj.so_id };
            _service.layCtThanhToan(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail.data_info;
                anHienNut();
            });
            getPaging(1);
        });
    });
    $("#btnThemNoiDungTrinh").click(function () {
        binDataFormKienNghi();
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
        _frmTaoNoiDung.getControl("nv_ct").setValue("TRINH_DUYET_TT");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    $("#btnLuuNoiDung").click(function () {
        if (_frmTaoNoiDung.isValid()) {
            var formData = _frmTaoNoiDung.getJsonData();
            _carClaimCommonService.taoNhanXet(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalTaoNoiDung.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXemDanhSachNoiDung").click(function () {
        $("#modalTaoNoiDungFormLietKe").removeClass("d-none");
        $("#modalTaoNoiDungFormNhap").addClass("d-none");
        getPagingDanhSachNoiDung(1);
    });
    $("#btnManHinhThemMoi").click(function () {
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
    });
    $("#btnChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        var val = $("#modalChonNoiDungDanhSach .modalChonNoiDungItem:checked").val();

        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var arr = arrNoiDung.where(n => n.so_id == val).firstOrDefault();
            $(target).attr("data-loai", arr.nv_ct);
            $("#noi_dung_trinh").val(arr.noi_dung);
        }
        _modalChonNoiDung.hide();
    });
    $("#btnBoChonNoiDung").click(function () {
        var target = _modalChonNoiDung.target;
        $("#noi_dung_trinh").val("");
        $(target).attr("data-val", "");
        _modalChonNoiDung.hide();
    });
    $("#btnXoaNoiDung").click(function () {
        var formData = _frmTaoNoiDung.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _carClaimCommonService.xoaThongTinNoiDung(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPagingDanhSachNoiDung(1);
                    $("#modalTaoNoiDungFormLietKe").removeClass("d-none");
                    $("#modalTaoNoiDungFormNhap").addClass("d-none");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Import excel
    $("#btnDownloadMauDeNghiThanhToan").click(function () {
        var obj = _frmSearchHoSoTon.getJsonData();
        obj.ma_doi_tac = ESCS_MA_DOI_TAC;
        obj.ma_mau_in = "ESCS_EXCEL_THANH_TOAN_MAU_EXP";
        _service_new.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, "template_import_ho_so_de_nghi_thanh_toan.xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnUploadHoSo").click(function () {
        ESUtil.genHTML('tblDsUploadHsTonTemplate', 'tblDsUploadHsTon', { data: [] });
        ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: [] });
        $("#txtSoHSThanhToan").html('0');
        _modalUploadExcelDsTon.show();
    });
    $("#btnUploadDsHsTon").click(function () {
        $("#frmImportExcelFileDsHsTon").val("");
        $("#frmImportExcelFileDsHsTon").click();
    });
    $("#btnLuuDsHsTon").click(function () {
        var arr = getDataTableMappingExcel();
        var obj = _frmSearchHoSoTon.getJsonData();
        if (arr.length == 0) {
            _notifyService.error("Bạn chưa upload danh sách hồ sơ!");
            return;
        }
        obj.data = arr;
        if (obj.data == null) {
            return;
        };
        _service.importDsDeNghiThanhToan(obj).then(res => {
            if (res.state_info.status === "OK") {
                var arr = res.data_info;
                dsHoSoDeNghiThanhToan = arr;
                ESUtil.genHTML("PaymentTableDeNghiThanhToanChiTiet_template", "PaymentTableDeNghiThanhToanChiTiet", { data: arr }, () => {
                    $(".ttct_item").attr("disabled", "disabled");
                    $("#txtSoHSThanhToan").html(arr.length);
                    $("#btnIn").addClass("d-none");
                    $("#btnLuuDeNghiThanhToanHoSo").removeClass("d-none");
                    $("#btnThemHoSoTon").removeClass("d-none");
                    _notifyService.success("Upload excel thành công.");
                    _modalUploadExcelDsTon.hide();
                    _modalThanhToanBoiThuong.hide();
                    _modalThanhToanBoiThuongChiTiet.show();
                });
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#inputNoiDungTimKiem").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        val = ESUtil.removeVietnameseTones(val).toUpperCase();
        val = val.replace(/\s+/g, "");
        $("#PaymentTableDeNghiThanhToanChiTiet .thanhToanChiTiet").removeClass("d-none");
        if (val != "") {
            $("#PaymentTableDeNghiThanhToanChiTiet .thanhToanChiTiet").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#PaymentTableDeNghiThanhToanChiTiet .thanhToanChiTiet[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //---Hình ảnh xe---
    $("#btnTaiAnhToanCanhXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_toan_canh");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhToanCanhXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_toan_canh");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhToanCanhXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_toan_canh");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TOAN_CANH", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhTonThatXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_ton_that");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhTonThatXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_ton_that");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhTonThatXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_ton_that");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHINH", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_ho_so_giay_to");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_ho_so_giay_to");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhHoSoGiayToXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_ho_so_giay_to");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TAI_LIEU", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnTaiAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_chua_phan_loai");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_chua_phan_loai");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhChuaPhanLoaiXeOTo_xemToanBoHoSo").bind("click", function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_chua_phan_loai");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHUA_PHAN_LOAI", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    //---Hình ảnh con người---
    $("#btnTaiAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_giay_to_tai_lieu");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnTaiAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_tai_anh_hsgt_chua_phan_loai");
        dowloadHinhAnhHoSo(arr);
    });
    $("#btnInAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_giay_to_tai_lieu");
        printHinhAnhHoSo(arr);
    });
    $("#btnInAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_in_anh_hsgt_chua_phan_loai");
        printHinhAnhHoSo(arr);
    });
    $("#btnXemAnhHoSoGiayToTaiLieu_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_giay_to_tai_lieu");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("TL", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    $("#btnXemAnhGiayToTaiLieuCPL_xemToanBoHSBT").bind('click', function () {
        var arr = getImagesHinhAnhHoSo("ds_xem_anh_hsgt_chua_phan_loai");
        if (arr.length > 0) {
            xemToanBoHinhAnhHoSoBoiThuong("CHUA_PHAN_LOAI", arr);
        } else {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
            return;
        }
    });
    //---Xem toàn bộ ảnh xe---
    $("#input_imagesHangMucTonThat").keyup(ESUtil.delay(function (e) {
        var val = $("#input_imagesHangMucTonThat").val().trim();
        $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $('#divTableXemToanBoAnhToanCanhXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TOAN_CANH", () => { initImageViewerToanBoAnhXe(); });
        }
    });
    $('#divTableXemToanBoAnhTonThatXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHINH", () => { initImageViewerToanBoAnhXe(); });
        }
    });
    $('#divTableXemToanBoAnhHoSoGiayToXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TAI_LIEU", () => { initImageViewerToanBoAnhXe(); });
        }
    });
    $('#divTableXemToanBoAnhChuaPhanLoaiXeOTo').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhXe(); });
        }
    });
    //---Xem toàn bộ ảnh con người---
    $('#divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "TL", () => { initImageViewerToanBoAnhConNguoi(); });
        }
    });
    $('#divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi').scroll(function () {
        let div = $(this).get(0);
        if (Math.round((div.scrollTop + div.offsetHeight)) === div.scrollHeight) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingListImages(trang, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhConNguoi(); });
        }
    });
    //---Trao đổi xe---
    $("#btnThemNoiDungTraoDoiXeOTo").click(function () {
        if (_frmNoiDungTraoDoiXeOTo.isValid()) {
            var obj = _frmNoiDungTraoDoiXeOTo.getJsonData();
            obj.so_id = ho_so.thong_tin_chung.so_id;
            obj.nv = 'XE';
            obj.nd = $("#noiDungTraoDoiXeOTo").val();
            if (obj.nd.trim() == "" || obj.nd.trim() == null) {
                _notifyService.error("Bạn chưa nhập nội dung trao đổi");
                return;
            }
            _carClaimCommonService.nhapNoiDungTraoDoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#noiDungTraoDoiXeOTo").setValue("");
                $("#tblDanhSachNoiDungTraoDoiXeOTo").html("");
                trang = 1;
                getPagingNoiDungTraoDoiXeOTo(trang, () => {
                    let div = $('#lichSuChatTraoDoiXeOTo').get(0);
                    div.scrollTo(0, document.body.scrollHeight);
                });
            });
        }
    });
    $("#noiDungTraoDoiXeOTo").keydown(function (event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            event.preventDefault();
            $("#btnThemNoiDungTraoDoiXeOTo").trigger('click');
        }
    });
    $("#btnThemNguoiThamGiaTraoDoiXeOTo").click(function () {
        _frmThemCanBoTraoDoiXeOTo.resetForm();
        _frmThemCanBoTraoDoiXeOTo.clearErrorMessage();
        bindDataCanBoTraoDoiXeOTo(ho_so.thong_tin_chung.ma_doi_tac, ho_so.thong_tin_chung.so_id);
        _modalThemCanBoTraoDoiXeOTo.show();
    });
    $("#btnThemVaDongCanBoTraoDoiXeOTo").click(function () {
        var formData = _frmThemCanBoTraoDoiXeOTo.getJsonData();
        var ma_chi_nhanh = _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").val();
        var ma_nsd = _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").val();
        if (ma_chi_nhanh == null || ma_chi_nhanh.trim() == "" || ma_chi_nhanh == undefined) {
            _notifyService.error("Bạn chưa chọn chi nhánh");
            return;
        }
        if (ma_nsd == null || ma_nsd.trim() == "" || ma_nsd == undefined) {
            _notifyService.error("Bạn chưa chọn cán bộ");
            return;
        }
        formData.ma_chi_nhanh = ma_chi_nhanh;
        formData.ma_nsd = ma_nsd;
        _carClaimCommonService.themCanBoTraoDoi(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Thêm cán bộ thành công");
                _modalThemCanBoTraoDoiXeOTo.hide();
                getPagingDanhSachCanBoTraoDoiXeOTo();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $('#lichSuChatTraoDoiXeOTo').scroll(function () {
        let div = $(this).get(0);
        if ((Math.round(div.scrollTop)) <= 0) {
            trang++;
            if (trang > trang_max_nd) {
                return;
            }
            getPagingNoiDungTraoDoiXeOTo(trang);
            div.scroll({ top: 1, behavior: "smooth" });
        }
    });
    //---Trao đổi con người---
    $("#btnThemNoiDungTraoDoiConNguoi").click(function () {
        if (_frmThemNoiDungTraoDoiConNguoi.isValid()) {
            var obj = _frmThemNoiDungTraoDoiConNguoi.getJsonData();
            obj.so_id = ho_so.thong_tin_chung.so_id;
            obj.nd = $("#noiDungTraoDoiConNguoi").val();
            obj.nv = 'NG';
            if (obj.nd.trim() == "" || obj.nd.trim() == null) {
                _notifyService.error("Bạn chưa nhập nội dung trao đổi");
                return;
            }
            _healthClaimCommonService.nhapNoiDungTraoDoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#noiDungTraoDoiConNguoi").setValue("");
                $("#tblDanhSachNoiDungTraoDoiConNguoi").html("");
                trang = 1;
                getPagingNoiDungTraoDoiConNguoi(trang, () => {
                    let div = $('#lichSuTraoDoiConNguoi').get(0);
                    div.scrollTo(0, document.body.scrollHeight);
                });
            });
        }
    });
    $("#noiDungTraoDoiConNguoi").keydown(function (event) {
        var code = event.keyCode || event.which;
        if (code === 13) {
            event.preventDefault();
            $("#btnThemNoiDungTraoDoiConNguoi").trigger('click');
        }
    });
    $("#btnThemCanBoThamGiaTraoDoiConNguoi").click(function () {
        _frmThemCanBoTraoDoiConNguoi.resetForm();
        _frmThemCanBoTraoDoiConNguoi.clearErrorMessage();
        bindDataCanBoTraoDoiConNguoi(ho_so.thong_tin_chung.ma_doi_tac, ho_so.thong_tin_chung.so_id);
        _modalThemCanBoTraoDoiConNguoi.show();
    });
    $("#btnThemVaDongCanBoTraoDoiConNguoi").click(function () {
        var formData = _frmThemCanBoTraoDoiConNguoi.getJsonData();
        var ma_chi_nhanh = _frmThemCanBoTraoDoiConNguoi.getControl("ma_chi_nhanh").val();
        var ma_nsd = _frmThemCanBoTraoDoiConNguoi.getControl("ma_nsd").val();
        if (ma_chi_nhanh == null || ma_chi_nhanh.trim() == "" || ma_chi_nhanh == undefined) {
            _notifyService.error("Bạn chưa chọn chi nhánh");
            return;
        }
        if (ma_nsd == null || ma_nsd.trim() == "" || ma_nsd == undefined) {
            _notifyService.error("Bạn chưa chọn cán bộ");
            return;
        }
        formData.ma_chi_nhanh = ma_chi_nhanh;
        formData.ma_nsd = ma_nsd;
        _healthClaimCommonService.themCanBoTraoDoi(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Thêm cán bộ thành công");
                _modalThemCanBoTraoDoiConNguoi.hide();
                getPagingDanhSachCanBoTraoDoiConNguoi();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $('#lichSuTraoDoiConNguoi').scroll(function () {
        let div = $(this).get(0);
        if ((Math.round(div.scrollTop)) <= 0) {
            trang++;
            if (trang > trang_max_nd) {
                return;
            }
            getPagingNoiDungTraoDoiConNguoi(trang);
            div.scroll({ top: 1, behavior: "smooth" });
        }
    });
    $('#close_popGhiChuLSTT').click(function () {
        _popoverGhiChuLSTT.hide();
    });
    $('#close_nguyenNhanGiamTru').click(function () {
        _popoverNguyenNhanGiamTru.hide();
    });
    $(".inputTimKiemHangMuc_xemToanBoThongTinHSBTXe").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").removeClass("d-none");
        if (val != "") {
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    //Trình thanh toán
    $("#btnTrinhThanhToan").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ttchung.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ttchung.ma_doi_tac,
            so_id: ho_so_chi_tiet.ttchung.so_id_tt,
            loai_trinh: "TRINH_THANH_TOAN",
            nghiep_vu: "THANH_TOAN",
            remove_file: "ESCS_TTBT",
            create_file: "ESCS_TTBT",
            pm: "THANH_TOAN"
        }
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.remove_file = "OPES_DE_NGHI_THANH_TOAN_BT";
            obj.create_file = "OPES_DE_NGHI_THANH_TOAN_BT";
        }
        obj.ma = "";
        var objGetDetail = {
            ma_doi_tac: ho_so_chi_tiet.ttchung.ma_doi_tac,
            so_id_tt: ho_so_chi_tiet.ttchung.so_id_tt
        }
        _modalTrinhDuyetService.show(obj, (type, res) => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            xemCtietThanhToan(objGetDetail, resDetail => {
                anHienNut();
            });
            getPaging(1);
        });
    });
    //Tìm kiếm chi nhánh
    $("#modalChonChiNhanhTimKiem").keyup(ESUtil.delay(function (e) {
        var tim = ESUtil.xoaKhoangTrangText($(this).val().toLowerCase());
        if (tim == "") {
            $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").removeClass("d-none");
            return;
        }
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").addClass("d-none");
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");
    }, 500));
    $("#ModalChonChiNhanh_btnChonDonVi").click(function () {
        var ma = $("#modalChonChiNhanhTimKiem_ma").val();
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
        $(_modalChonChiNhanh.target).attr("data-val", data_val);
        $(_modalChonChiNhanh.target).val(ten_dvi);
        _modalChonChiNhanh.hide();
    });
});