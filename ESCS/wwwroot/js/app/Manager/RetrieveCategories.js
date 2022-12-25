var objDanhMuc = {};
var _service = new Service();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var dateNow = new Date().ddmmyyyy();

var _notifyService = new NotifyService();
var _retrieveCatService = new RetrieveCategoriesService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _frmTimKiem = new FormService("frmTimKiem");
var _frmTimKiemVatTu = new FormService("frmTimKiemVatTu");
var _frmThanhToanThuDoi = new FormService("frmThanhToanThuDoi");
var _frmLuuHoaDonChungTu = new FormService("frmLuuHoaDonChungTu");
var _modalThuHoiVatTu = new ModalService("modalThuHoiVatTu");
var _modalRetrieve3rdSearchModal = new ModalService("modalRetrieve3rdSearchModal");
var _modalTrinhDuyetService = new ModalTrinhDuyetService();

const GRID_HO_SO_SO_DONG = 13;
const GRID_HO_SO_SO_DONG_HS = 7;
const CONSTANT_TD = 'TD';

var arrChecked = [];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_ct", title: "Số chứng từ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay", title: "Ngày yêu cầu", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "20%", headerSort: false },
    { field: "tong_tien_dx", title: "Tổng tiền đề xuất", width: "10%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "trang_thai", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ghi_chu", title: "Ghi chú", width: "35%", headerSort: false },
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (row !== undefined) {
        row.select();
    }
    if (data.so_id_tl == undefined) {
        _notifyService.error("Vui lòng chọn yêu cầu thanh lý");
        return;
    }
    _retrieveCatService.layThongTinChiTietThuHoiVatTu(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#tableDsNguoiThuDoiCheckAll").attr("disabled", "disabled");
        $("#tableDsNguoiThuDoiCheckAll").prop("checked", true);

        _frmTimKiemVatTu.resetForm();
        _frmTimKiemVatTu.getControl("so_hs").readOnly(true);
        _frmTimKiemVatTu.getControl("tu_ngay").readOnly(true);
        _frmTimKiemVatTu.getControl("den_ngay").readOnly(true);
        _frmTimKiemVatTu.getControl("so_id_tl").val(res.data_info.thu_hoi.so_id_tl);
        $("#btnRetrieveCatSearchModal").attr("disabled", "disabled");

        _frmLuuHoaDonChungTu.getControl("so_ct").readOnly();
        _frmLuuHoaDonChungTu.getControl("so_id_tl").val(res.data_info.thu_hoi.so_id_tl);
        _frmLuuHoaDonChungTu.getControl("so_ct").val(res.data_info.thu_hoi.so_ct);
        _frmLuuHoaDonChungTu.getControl("ngay_ht").val(res.data_info.thu_hoi.ngay_ht);
        _frmLuuHoaDonChungTu.getControl("ghi_chu").val(res.data_info.thu_hoi.ghi_chu);
        $("#modalThuHoiVatTu_Luu").hide();
        $("#modalThuHoiVatTu_LuuChungTu").hide();
        $("#modalThuHoiVatTu_Xoa").hide();
        $("#btnTrinhThanhLy").hide();
        $("#modalXemToTrinh").hide();
        if (res.data_info.thu_hoi.trang_thai == "C") {
            $("#modalThuHoiVatTu_Xoa").show();
            $("#modalThuHoiVatTu_Luu").show();
            $("#btnTrinhThanhLy").show();
            $("#modalXemToTrinh").show();
        }
        if (res.data_info.thu_hoi.trang_thai == "T") {
            $("#btnTrinhThanhLy").show();
        }
        if (res.data_info.thu_hoi.trang_thai == "D") {
            _frmLuuHoaDonChungTu.getControl("so_ct").readOnly(false);
            $("#modalThuHoiVatTu_LuuChungTu").show();
        }
        arrChecked = [];
        ESUtil.genHTML("bodyTableDsVatTuTemplate", "bodyTableDsVatTu", { data_info: res.data_info.thu_hoi_ct }, () => {
            $(".thuhoi-item:checked").each(function (index, el) {
                var bt = parseInt($(this).attr("data-bt"));
                var tien = $("#bodyTableDsVatTu_Tien_" + bt).val().replace(/[^0-9]+/g, '');
                var ten = $("#bodyTableDsVatTu_Ten_" + bt).html().trim();
                var so_hs = $("#bodyTableDsVatTu_SoHS_" + bt).html().trim();
                var hang_muc = $("#bodyTableDsVatTu_HangMuc_" + bt).val();
                var ghi_chu = $("#bodyTableDsVatTu_GhiChu_" + bt).val();
                tien = tien == "" ? 0 : parseInt(tien);
                arrChecked.push({
                    bt: bt,
                    tien: tien,
                    ten: ten,
                    so_hs: so_hs,
                    hang_muc: hang_muc,
                    ghi_chu: ghi_chu
                });
            });
            tinhTongTien();
        });
        _modalThuHoiVatTu.show();
    });
};
function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.pm = CONSTANT_TD;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _retrieveCatService.timKiemVatTuThuHoi(objTimKiem).then(res => {
            _gridView.setDataSource(res, trang, GRID_HO_SO_SO_DONG);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function tinhTongTien() {
    $("#frmLuuHoaDonChungTu_Tongtien").val("0");
    var tongTien = 0;
    for (var i = 0; i < arrChecked.length; i++) {
        tongTien += arrChecked[i].tien;
    }
    if (tongTien > 0) {
        $("#frmLuuHoaDonChungTu_Tongtien").val(ESUtil.formatMoney(tongTien));
    }
}
function checkAll(el) {
    var check = $(el).is(":checked");
    if (check)
        $(".thuhoi-item").prop("checked", true);
    else
        $(".thuhoi-item").prop("checked", false);
    arrChecked = [];
    $(".thuhoi-item:checked").each(function (index, el) {
        var bt = parseInt($(this).attr("data-bt"));
        var tien = $("#bodyTableDsVatTu_Tien_" + bt).val().replace(/[^0-9]+/g, '');
        var ten = $("#bodyTableDsVatTu_Ten_" + bt).html().trim();
        var so_hs = $("#bodyTableDsVatTu_SoHS_" + bt).html().trim();
        var hang_muc = $("#bodyTableDsVatTu_HangMuc_" + bt).val();
        var ghi_chu = $("#bodyTableDsVatTu_GhiChu_" + bt).val();
        tien = tien == "" ? 0 : parseInt(tien);
        arrChecked.push({
            bt: bt,
            tien: tien,
            ten: ten,
            so_hs: so_hs,
            hang_muc: hang_muc,
            ghi_chu: ghi_chu
        });
    });
    tinhTongTien();
}
function checkItem(el) {
    var total_row = $(".ntba-row").length;
    var row_checked = $(".thuhoi-item:checked").length;
    $(".ntba-all").prop("checked", false);
    if (total_row == row_checked) {
        $(".ntba-all").prop("checked", true);
    }
    var bt = parseInt($(el).attr("data-bt"));
    arrChecked = arrChecked.removeItem(n => n.bt == bt);
    if ($(el).is(":checked")) {
        var tien = $("#bodyTableDsVatTu_Tien_" + bt).val().replace(/[^0-9]+/g, '');
        var ten = $("#bodyTableDsVatTu_Ten_" + bt).html().trim();
        var so_hs = $("#bodyTableDsVatTu_SoHS_" + bt).html().trim();
        var hang_muc = $("#bodyTableDsVatTu_HangMuc_" + bt).val();
        var ghi_chu = $("#bodyTableDsVatTu_GhiChu_" + bt).val();
        tien = tien == "" ? 0 : parseInt(tien);
        arrChecked.push({
            bt: bt,
            tien: tien,
            ten: ten,
            so_hs: so_hs,
            hang_muc: hang_muc,
            ghi_chu: ghi_chu
        });
    }
    tinhTongTien();
}
function tinhLaiTien(el, bt) {
    var item = arrChecked.where(n => n.bt == bt).firstOrDefault();
    var val = $(el).val().replace(/[^0-9]+/g, '');
    var tien = val == "" ? 0 : parseInt(val);
    if (item != null) {
        item.tien = tien;
    }
    tinhTongTien();
}

$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue(new Date().getNgayDauThang());
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    $("#btnAddRetrieveCategory").click(function () {
        arrChecked = [];
        $("#frmLuuHoaDonChungTu_Tongtien").val(0);
        $("#btnRetrieveCatSearchModal").removeAttr("disabled");
        $("#btnTrinhThanhLy").hide();
        $("#modalXemToTrinh").hide();
        _frmTimKiemVatTu.resetForm();
        _frmTimKiemVatTu.clearErrorMessage();
        var obj = _frmTimKiemVatTu.getJsonData();
        _retrieveCatService.layDsVatTu(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            $("#tableDsNguoiThuDoiCheckAll").prop("checked", false);
            _frmTimKiemVatTu.resetForm();
            _frmTimKiemVatTu.clearErrorMessage();
            _frmLuuHoaDonChungTu.resetForm();
            _frmLuuHoaDonChungTu.clearErrorMessage();
            $("#modalThuHoiVatTu_Xoa").hide();
            _frmLuuHoaDonChungTu.getControl("ngay_ht").setValue(dateNow);
            _frmLuuHoaDonChungTu.getControl("tong_tien").setValue("0");
            _frmTimKiemVatTu.getControl("so_hs").readOnly(false);
            _frmTimKiemVatTu.getControl("tu_ngay").readOnly(false);
            _frmTimKiemVatTu.getControl("den_ngay").readOnly(false);
            $("#tableDsNguoiThuDoiCheckAll").removeAttr("disabled");
            ESUtil.genHTML("bodyTableDsVatTuTemplate", "bodyTableDsVatTu", res);
            _modalThuHoiVatTu.show();
        });
    });
    $("#btnFrmRetrieve3rdSearch").click(function () {
        getPaging(1);
    });
    $("#btnRetrieveCatSearchModal").click(function () {
        var obj = _frmTimKiemVatTu.getJsonData();
        _retrieveCatService.layDsVatTu(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (arrChecked != null && arrChecked.length > 0) {
                for (var i = 0; i < arrChecked.length; i++) {
                    var item = res.data_info.where(n => n.bt == arrChecked[i].bt).firstOrDefault();
                    if (item != null) {
                        item.chon = true;
                    }
                }
            }
            $("#tableDsNguoiThuDoiCheckAll").prop("checked", false);
            if (arrChecked.length == res.data_info.length) {
                $("#tableDsNguoiThuDoiCheckAll").prop("checked", true);
            }
            ESUtil.genHTML("bodyTableDsVatTuTemplate", "bodyTableDsVatTu", res);
        });
    });
    $("#modalThuHoiVatTu_Luu").click(function () {
        if (_frmLuuHoaDonChungTu.isValid()) {
            if (arrChecked.length<=0) {
                _notifyService.error("Bạn chưa chọn vật tư cần thanh lý");
                return;
            }
            var obj = _frmLuuHoaDonChungTu.getJsonData();
            obj.so_hs = _frmTimKiemVatTu.getControl("so_hs").val().trim();
            obj.so_id_tl = _frmTimKiemVatTu.getControl("so_id_tl").val().trim();
            obj.arr = arrChecked;
            _retrieveCatService.luuThuHoiVatTu(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThuHoiVatTu.hide();
                _notifyService.success("Lưu thông tin thành công");
            });
        }
    });
    $("#modalThuHoiVatTu_Xoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa yêu cầu thanh lý thu hồi vật tư phát sinh không?", "", () => {
            var so_id_tl = _frmTimKiemVatTu.getControl("so_id_tl").val().trim();
            _retrieveCatService.xoaThuHoiVatTu({ so_id_tl: so_id_tl }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThuHoiVatTu.hide();
                _notifyService.success("Xóa thông tin thành công");
            });
        });
    });
    $("#btnTrinhThanhLy").click(function () {
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_doi_tac_ql: ESCS_MA_DOI_TAC,
            so_id: 0,
            ma_dt_trinh: _frmLuuHoaDonChungTu.getControl("so_id_tl").val(),
            loai_trinh: "XE_TRINH_DUYET_THU_HOI_VAT_TU",
            nghiep_vu: "XE",
        }
        var data = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            so_id_tl: _frmLuuHoaDonChungTu.getControl("so_id_tl").val()
        };
        _modalTrinhDuyetService.show(obj, (type, res) => {
            _retrieveCatService.layThongTinChiTietThuHoiVatTu(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#tableDsNguoiThuDoiCheckAll").attr("disabled", "disabled");
                $("#tableDsNguoiThuDoiCheckAll").prop("checked", true);

                _frmTimKiemVatTu.resetForm();
                _frmTimKiemVatTu.getControl("so_hs").readOnly(true);
                _frmTimKiemVatTu.getControl("tu_ngay").readOnly(true);
                _frmTimKiemVatTu.getControl("den_ngay").readOnly(true);
                _frmTimKiemVatTu.getControl("so_id_tl").val(res.data_info.thu_hoi.so_id_tl);
                $("#btnRetrieveCatSearchModal").attr("disabled", "disabled");
                _frmLuuHoaDonChungTu.getControl("so_ct").readOnly();
                _frmLuuHoaDonChungTu.getControl("so_id_tl").val(res.data_info.thu_hoi.so_id_tl);
                _frmLuuHoaDonChungTu.getControl("so_ct").val(res.data_info.thu_hoi.so_ct);
                _frmLuuHoaDonChungTu.getControl("ngay_ht").val(res.data_info.thu_hoi.ngay_ht);
                _frmLuuHoaDonChungTu.getControl("ghi_chu").val(res.data_info.thu_hoi.ghi_chu);
                $("#modalThuHoiVatTu_Luu").hide();
                $("#modalThuHoiVatTu_Xoa").hide();
                $("#modalThuHoiVatTu_LuuChungTu").hide();
                $("#btnTrinhThanhLy").hide();
                $("#modalXemToTrinh").hide();
                if (res.data_info.thu_hoi.trang_thai == "C") {
                    $("#modalThuHoiVatTu_Xoa").show();
                    $("#modalThuHoiVatTu_Luu").show();
                    $("#btnTrinhThanhLy").show();
                    $("#modalXemToTrinh").show();
                }
                if (res.data_info.thu_hoi.trang_thai == "T") {
                    $("#btnTrinhThanhLy").show();
                }
                if (res.data_info.thu_hoi.trang_thai == "D") {
                    _frmLuuHoaDonChungTu.getControl("so_ct").readOnly(false);
                    $("#modalThuHoiVatTu_LuuChungTu").show();
                }
                arrChecked = [];
                ESUtil.genHTML("bodyTableDsVatTuTemplate", "bodyTableDsVatTu", { data_info: res.data_info.thu_hoi_ct }, () => {
                    $(".thuhoi-item:checked").each(function (index, el) {
                        var bt = parseInt($(this).attr("data-bt"));
                        var tien = $("#bodyTableDsVatTu_Tien_" + bt).val().replace(/[^0-9]+/g, '');
                        var ten = $("#bodyTableDsVatTu_Ten_" + bt).html().trim();
                        var so_hs = $("#bodyTableDsVatTu_SoHS_" + bt).html().trim();
                        var hang_muc = $("#bodyTableDsVatTu_HangMuc_" + bt).val();
                        var ghi_chu = $("#bodyTableDsVatTu_GhiChu_" + bt).val();
                        tien = tien == "" ? 0 : parseInt(tien);
                        arrChecked.push({
                            bt: bt,
                            tien: tien,
                            ten: ten,
                            so_hs: so_hs,
                            hang_muc: hang_muc,
                            ghi_chu: ghi_chu
                        });
                    });
                    tinhTongTien();
                });
            });
            getPaging(1);
        });
    });
    $("#modalXemToTrinh").click(function () {
        _notifyService.success("Đang cập nhật");
    })
    getPaging(1);
});