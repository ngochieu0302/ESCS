//Service
var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();

var _service = new AdvanceCompensationService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _carClaimCommonService = new CarClaimCommonService();

var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var objDanhMuc = {};
var arrChiNhanhTKiem = [];
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();

//Form
var _frmTimKiemTamUng = new FormService("frmTimKiemTamUng");
var _frmTamUng = new FormService("frmTamUng");
var _frmSearchHoSoTamUng = new FormService("frmSearchHoSoTamUng");
var _frmTaoNoiDung = new FormService("frmTaoNoiDung");
//Modal
var _modalDocumentService = new ModalDocumentService();
var _modalTrinhDuyetService = new ModalTrinhDuyetService();
var _modalTamUngBoiThuong = new ModalService("modalTamUngBoiThuong");
var _modalTaoNoiDung = new ModalService("modalTaoNoiDung");
var _modalChonNoiDung = new ModalDragService("modalChonNoiDung", undefined, "bottom");
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();

const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'BT';
var ho_so_chi_tiet = {};
var loai_trinh = "";
var nv_trinh = "";

var mode = "pro";
if (mode === "dev") {
    dateNow = "30/10/2020";
    ngayDauThang = "01/10/2020";
}
var arrNghiepVu = [
    { ma: "TUBT", ten: "Tạm ứng bồi thường", nv: "XE" }
]

var arrNV_CT = [
    { ma: "TRINH_DUYET_TU", ten: "Trình phê duyệt tạm ứng", nv: "XE", pm: "TUBT" }
]
var dsHoSoTamUng = [];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên khách hàng", width: "15%", headerSort: false },
    { field: "tk_cmt", title: "Số tài khoản/CMT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "tien", title: "Số tiền yêu cầu", width: "10%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "ngay_yc", title: "Ngày yêu cầu", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "pttt_hthi", title: "PT Thanh toán", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_nh", title: "Ngân hàng", width: "20%", headerSort: false },
    { field: "ten_cnhanh_nh", title: "Chi nhánh ngân hàng", width: "25%", headerSort: false },
    { field: "nd", title: "Nội dung", width: "20%", headerSort: false },
];

var _gridViewTamUng = new GridViewService("gridViewTamUng", configColumn, getPaging, rowClick);

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id_tu === undefined || data.so_id_tu === null || data.so_id_tu === 0 || data.so_id_tu === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id: data.so_id, so_id_tu: data.so_id_tu };
    _service.xemCtietTamUng(objGetDetail).then(res => {
        if (row !== undefined) {
            row.select();
        }
        ho_so_chi_tiet = res.data_info;
        for (var i = 0; i < res.data_info.ho_so.length; i++) {
            res.data_info.ho_so[i].checked = true;
        }
        dsHoSoTamUng = res.data_info.ho_so;
        _frmSearchHoSoTamUng.resetForm();
        _frmSearchHoSoTamUng.clearErrorMessage();

        ESUtil.genHTML("tblTamUngBT_template", "tblTamUngBT", { data: res.data_info.ho_so }, () => {
            $(".ttbt_item").attr("disabled", "disabled");
            $(".ttbt_item").prop("checked", true);
        });
        $("#btnTKiemHsTamUng").addClass('disabled-link');
        $("#tblTamUngBT_pagination").html(ESUtil.pagingHTML("getHSTamUngTon", 1, res.data_info.ho_so.length, res.data_info.ho_so.length));

        if (ho_so_chi_tiet.tam_ung.pttt == "TM") {
            $('form[name=frmTamUng] select[name=ma_nh]').prop('required', false);
            //$('form[name=frmTamUng] select[name=ma_cnhanh_nh]').prop('required', false);
        }
        if (ho_so_chi_tiet.tam_ung.pttt == "CK") {
            $('form[name=frmTamUng] select[name=ma_nh]').prop('required', true);
            //$('form[name=frmTamUng] select[name=ma_cnhanh_nh]').prop('required', true);
        }
        _frmTamUng.resetForm();
        _frmTamUng.clearErrorMessage();
        var tam_ung = res.data_info.tam_ung;

        _frmTamUng.setData(tam_ung);
        _frmTamUng.getControl("ma_nh").trigger("select2:select");
        _frmTamUng.setData(tam_ung);
        _frmSearchHoSoTamUng.getControl("ngay_d").setValue(ngayDauThang);
        _frmSearchHoSoTamUng.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoTamUng.getControl("nv").setValue("XE");
        _frmSearchHoSoTamUng.getControl("nv").readOnly();
        _frmSearchHoSoTamUng.getControl("so_hs").readOnly();
        anHienNutTheoTrangThai(res.data_info.tam_ung.trang_thai);

        $("#btnTrinhDuyet").show();
        _modalTamUngBoiThuong.show();
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
//Get Paging
function getPaging(trang) {
    var objTimKiem = _frmTimKiemTamUng.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 13;
    _service.layDsHSTamUng(objTimKiem).then(res => {
        _gridViewTamUng.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewTamUng.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewTamUng.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function getHSTamUngTon(trang, callback = undefined) {
    var objTKiem = _frmSearchHoSoTamUng.getJsonData();
    objTKiem.ma_doi_tac = ESCS_MA_DOI_TAC;
    objTKiem.pm = CONSTANT_PM;
    objTKiem.trang = trang;
    objTKiem.so_dong = 13;
    objTKiem.nv = "";
    _service.layDsHoSo(objTKiem).then(res => {
        var data = res.data_info;
        ESUtil.genHTML("tblTamUngBT_template", "tblTamUngBT", data, () => {
            $("#tblTamUngBT .single_checked").click(function () {
                $("#tblTamUngBT .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        $("#tblTamUngBT_pagination").html(ESUtil.pagingHTML("getHSTamUngTon", trang, res.data_info.tong_so_dong, objTKiem.so_dong));
        if (callback) {
            callback(res)
        }
    });
}
function layDuLieuBangTamUng() {
    var otArr = [];
    $("#tblTamUngBT tr.row_item").each(function (e) {
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
    var val = $(el).val();
    var dsHSTKiem = layDuLieuBangTamUng();
    var hs = dsHSTKiem.where(n => n.so_id == val).firstOrDefault();

    if ($(el).is(":checked")) {
        hs.checked = true;
        dsHoSoTamUng.push(hs);
    }
}
function anHienNutTheoTrangThai(trang_thai = "") {
    $("#btnXoa").hide();
    $("#btnIn").show();
    $("#btnTrinhDuyet").hide();
    $("#btnLuuHoSo").hide();
    $("#btnLuuDongHoSo").hide();
    if (trang_thai == "") {
        $("#btnLuuHoSo").show();
        $("#btnLuuDongHoSo").show();
    }
    if (trang_thai == "C") {
        $("#btnXoa").show();
        $("#btnIn").show();
        $("#btnLuuHoSo").show();
        $("#btnLuuDongHoSo").show();
        $("#btnTrinhDuyet").show();
    }
    if (trang_thai == "T") {
        $("#btnTrinhDuyet").show();
        $("#btnIn").show();
    }
}
function binDataFormKienNghi() {
    _frmTaoNoiDung.resetForm();
    _frmTaoNoiDung.clearErrorMessage();
    _frmTaoNoiDung.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
    _frmTaoNoiDung.getControl("nv").setValue("XE");
    _frmTaoNoiDung.getControl("nv").trigger("select2:select");
    _frmTaoNoiDung.getControl("pm").setValue("TUBT");
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
        ma_doi_tac: ho_so_chi_tiet.tam_ung.ma_doi_tac,
        pm: 'TUBT',
        nv: "XE",
        nv_ct: "TRINH_DUYET_TU"
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
//Xem toàn bộ thông tin hồ sơ
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh, ma_chi_nhanh_ql, so_id, so_id_hd, so_id_dt, nv) {

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
    _frmTimKiemTamUng.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemTamUng.getControl("ngay_c").setValue(dateNow);

    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _bankListService.layDsNganHang()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.ngan_hang = arrRes[2].data_info.where(n => n.nhom == 'NGAN_HANG');
        objDanhMuc.ngan_hang_cnhanh = arrRes[2].data_info.where(n => n.nhom = 'CHI_NHANH_NGAN_HANG');

        _frmTimKiemTamUng.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemTamUng.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemTamUng.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemTamUng.getControl("ma_chi_nhanh").setValue("");
        _frmTimKiemTamUng.getControl("ma_chi_nhanh_ql").setValue("");

        _frmTamUng.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmTamUng.getControl("ma_cnhanh_nh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");

        _frmTaoNoiDung.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmTaoNoiDung.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
        _frmTaoNoiDung.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ chi tiết", "");
        ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });
        getPaging(1);

        hienThiHoSoNofify();
    });

    _frmTamUng.getControl("ma_nh").addEventChange(val => {
        var cnhanh = objDanhMuc.ngan_hang_cnhanh.where(n => n.ma_ct == val);
        _frmTamUng.getControl("ma_cnhanh_nh").setDataSource(cnhanh, "ten", "ma", "Chọn chi nhánh", "");
    });

    _frmTamUng.getControl("pttt").addEventChange(val => {
        if (val == "TM") {
            $('form[name=frmTamUng] select[name=ma_nh]').prop('required', false);
            //$('form[name=frmTamUng] select[name=ma_cnhanh_nh]').prop('required', false);
        }
        if (val == "CK") {
            $('form[name=frmTamUng] select[name=ma_nh]').prop('required', true);
            //$('form[name=frmTamUng] select[name=ma_cnhanh_nh]').prop('required', true);
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

    //Thêm mới hồ sơ tạm ứng
    $("#btnThemMoiHoSo").click(function () {
        anHienNutTheoTrangThai("");
        $("#btnTKiemHsTamUng").removeClass('disabled-link');
        _frmTamUng.resetForm();
        _frmTamUng.getControl("ngay_yc").setValue(dateNow);
        _frmTamUng.getControl("pttt").setValue("CK");
        _frmSearchHoSoTamUng.resetForm();
        _frmSearchHoSoTamUng.getControl("ngay_d").setValue(ngayDauThang);
        _frmSearchHoSoTamUng.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoTamUng.getControl("nv").setValue("XE");
        _frmSearchHoSoTamUng.getControl("nv").readOnly();
        _frmSearchHoSoTamUng.getControl("so_hs").readOnly(false);
        _frmTamUng.clearErrorMessage();
        getHSTamUngTon(1, res => {
            _modalTamUngBoiThuong.show();
        });
    });

    //Lưu thông tin hồ sơ tạm ứng
    $("#btnLuuHoSo").click(function () {
        var obj = _frmTamUng.getJsonData();
        var data = dsHoSoTamUng;

        if (_frmTamUng.isValid()) {
            if (data.length <= 0) {
                _notifyService.error("Chưa chọn hồ sơ tạm ứng bồi thường");
                return;
            }
            for (var i = 0; i < data.length; i++) {
                obj.ma_doi_tac = data[i].ma_doi_tac;
                obj.ma_chi_nhanh = data[i].ma_chi_nhanh;
                obj.so_id = data[i].so_id;
            }
            _service.luuTamUng(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmTamUng.getControl("so_id_tu").setValue(res.out_value.so_id_tu);
                _notifyService.success("Lưu thông tin tạm ứng thành công");
                getPaging(1);
                _modalTamUngBoiThuong.hide();
            });
        }
    });

    //Lưu đóng thông tin hồ sơ tạm ứng
    $("#btnLuuDongHoSo").click(function () {
        var obj = _frmTamUng.getJsonData();
        var data = dsHoSoTamUng;
        if (_frmTamUng.isValid()) {
            if (data.length <= 0) {
                _notifyService.error("Chưa chọn hồ sơ tạm ứng bồi thường");
                return;
            }
            for (var i = 0; i < data.length; i++) {
                obj.ma_doi_tac = data[i].ma_doi_tac;
                obj.ma_chi_nhanh = data[i].ma_chi_nhanh;
                obj.so_id = data[i].so_id;
            }
            _service.luuTamUng(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmTamUng.getControl("so_id_tu").setValue(res.out_value.so_id_tu);
                _notifyService.success("Lưu thông tin tạm ứng thành công");
                getPaging(1);
                _modalTamUngBoiThuong.hide();
            });
        }
    });

    //Xóa thông tin hồ sơ tạm ứng
    $("#btnXoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin tạm ứng này không?", "", () => {
            var obj = _frmTamUng.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.tam_ung.ma_doi_tac,
                obj.so_id = ho_so_chi_tiet.tam_ung.so_id,
                obj.so_id_tu = ho_so_chi_tiet.tam_ung.so_id_tu

            if (_frmTamUng.isValid()) {
                _service.xoaTamUng(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _modalTamUngBoiThuong.hide();
                    _notifyService.success("Xóa thông tin tạm ứng thành công");
                    getPaging(1);
                });
            }
        });
    });

    //In ấn
    $("#btnIn").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_TAM_UNG_BT", ten: "Tờ trình tạm ứng bồi thường" },
            //{ ma: "OPES_TAM_UNG_BOI_THUONG", ten: "Tờ trình tạm ứng bồi thường" }
        ];
        var ma_mau_in_hthi = "ESCS_TAM_UNG_BT";
        if (ESCS_MA_DOI_TAC == "OPES") {
            sourceMauIn = [
                { ma: "OPES_TAM_UNG_BOI_THUONG", ten: "Tờ trình tạm ứng bồi thường" }
            ];
            ma_mau_in_hthi = "OPES_TAM_UNG_BOI_THUONG";
        }
        _modalDocumentService.setDataSource(sourceMauIn);
        _modalDocumentService.onClickIem = function (ma_mau_in) {
            _commonService.InPdf({
                ma_mau_in: ma_mau_in,
                ma_doi_tac: ho_so_chi_tiet.tam_ung.ma_doi_tac,
                ma_doi_tac_ql: ho_so_chi_tiet.tam_ung.ma_doi_tac_ql,
                so_id: ho_so_chi_tiet.tam_ung.so_id
            },
                "#modalDocumentContents").then(response => {
                    _modalDocumentService.viewFile(response);
                });
        }
        _modalDocumentService.show(ma_mau_in_hthi);
    });

    //Trình duyệt tạm ứng
    $("#btnTrinhDuyet").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.tam_ung.ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.tam_ung.ma_doi_tac_ql,
            so_id: ho_so_chi_tiet.tam_ung.so_id,
            ma_dt_trinh: ho_so_chi_tiet.tam_ung.so_id_tu,
            nghiep_vu: "XE",
            loai_trinh: "XE_TRINH_DUYET_TAM_UNG_BT",
            pm: CONSTANT_PM
        };
        obj.ma = "";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            var objGetDetail = { ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id, so_id_tu: obj.ma_dt_trinh };
            _service.xemCtietTamUng(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail.data_info;
                anHienNutTheoTrangThai(ho_so_chi_tiet.tam_ung.trang_thai);
            });
            getPaging(1);
        });
    });

    //Tìm kiếm
    $("#btnFrmSearch").click(function () {
        getPaging(1);
    });

    $("#btnTKiemHsTamUng").click(function () {
        getHSTamUngTon(1);
    });
    //Tạo nội dung trình
    $("#btnThemNoiDungTrinh").click(function () {
        binDataFormKienNghi();
        $("#modalTaoNoiDungFormLietKe").addClass("d-none");
        $("#modalTaoNoiDungFormNhap").removeClass("d-none");
        _frmTaoNoiDung.getControl("nv_ct").setValue("TRINH_DUYET_TU");
        $("#btnXoaNoiDung").hide();
        _modalTaoNoiDung.show();
    });
    //Lưu nội dung trình
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
    //Xem danh sách nội dung trình
    $("#btnXemDanhSachNoiDung").click(function () {
        $("#modalTaoNoiDungFormLietKe").removeClass("d-none");
        $("#modalTaoNoiDungFormNhap").addClass("d-none");
        getPagingDanhSachNoiDung(1);
    });
    //Button thêm mới
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
