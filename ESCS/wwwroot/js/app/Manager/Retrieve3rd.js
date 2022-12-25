var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();

var _retrieve3rdService = new Retrieve3rdService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _frmTimKiem = new FormService("frmTimKiem");
var _frmTimKiemNTBA = new FormService("frmTimKiemNTBA");
var _frmThanhToanThuDoi = new FormService("frmThanhToanThuDoi");
var _frmLuuHoaDonChungTu = new FormService("frmLuuHoaDonChungTu");
var _modalThuDoiNguoiThu3 = new ModalService("modalThuDoiNguoiThu3");
var _modalRetrieve3rdSearchModal = new ModalService("modalRetrieve3rdSearchModal");
var _modalTrinhDuyetService = new ModalTrinhDuyetService();

var dateNow = new Date().ddmmyyyy();

const GRID_HO_SO_SO_DONG = 13;
const GRID_HO_SO_SO_DONG_HS = 7;
const CONSTANT_TD = 'TD';

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_ct", title: "Số chứng từ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay", title: "Ngày yêu cầu", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "16%", headerSort: false },
    { field: "tong_tien_dx", title: "Tổng tiền đề xuất", width: "10%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "doi_tuong", title: "Biển xe", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ghi_chu", title: "Ghi chú", width: "17%", headerSort: false }
];
var _gridViewThuDoiNguoiThu3 = new GridViewService("gridViewThuDoiNguoiThu3", configColumn, getPaging, rowClick);
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (row !== undefined) {
        row.select();
    }
    if (data.so_hs == undefined) {
        _notifyService.error("Vui lòng chọn yêu cầu thu đòi");
        return;
    }
    $("#btnNewRetrieve3rd").trigger("click");
    _retrieve3rdService.layThongTinChiTietThuDoiNguoiThu3(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#tableDsNguoiThuDoiCheckAll").attr("disabled", "disabled");
        $("#tableDsNguoiThuDoiCheckAll").prop("checked", true);

        _frmTimKiemNTBA.getControl("so_hs").readOnly(true);
        _frmTimKiemNTBA.getControl("tu_ngay").readOnly(true);
        _frmTimKiemNTBA.getControl("den_ngay").readOnly(true);


        _frmTimKiemNTBA.getControl("so_hs").val(res.data_info.thu_doi.so_hs);
        _frmTimKiemNTBA.getControl("so_id_td_ntba").val(res.data_info.thu_doi.so_id_td_ntba);

        _frmLuuHoaDonChungTu.getControl("so_ct").readOnly();
        _frmLuuHoaDonChungTu.getControl("so_id").val(res.data_info.thu_doi.so_id);
        _frmLuuHoaDonChungTu.getControl("so_id_td_ntba").val(res.data_info.thu_doi.so_id_td_ntba);
        _frmLuuHoaDonChungTu.getControl("so_ct").val(res.data_info.thu_doi.so_ct);
        _frmLuuHoaDonChungTu.getControl("so_hs").val(res.data_info.thu_doi.so_hs);
        _frmLuuHoaDonChungTu.getControl("ngay_ht").val(res.data_info.thu_doi.ngay_ht);
        _frmLuuHoaDonChungTu.getControl("ghi_chu").val(res.data_info.thu_doi.ghi_chu);

        $("#modalThuDoiNguoiThu3_Luu").hide();
        $("#modalThuDoiNguoiThu3_Xoa").hide();
        $("#modalThuDoiNguoiThu3_Trinh").hide();
        $("#modalXemToTrinh").hide();
        $("#modalThuDoiNguoiThu3_LuuChungTu").hide();
        if (res.data_info.thu_doi.trang_thai == "C") {
            $("#modalThuDoiNguoiThu3_Xoa").show();
            $("#modalThuDoiNguoiThu3_Luu").show();
            $("#modalThuDoiNguoiThu3_Trinh").show();
            $("#modalXemToTrinh").show();
        }
        if (res.data_info.thu_doi.trang_thai == "T") {
            $("#modalThuDoiNguoiThu3_Trinh").show();
        }
        if (res.data_info.thu_doi.trang_thai == "D") {
            _frmLuuHoaDonChungTu.getControl("so_ct").readOnly(false);
            $("#modalThuDoiNguoiThu3_LuuChungTu").show();
        }

        ESUtil.genHTML("bodyTableDsNguoiThuDoiTemplate", "bodyTableDsNguoiThuDoi", { data_info: res.data_info.thu_doi_ct }, () => {
            tinhTongTien();
        });
        _modalThuDoiNguoiThu3.show();
    });
};
function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.pm = CONSTANT_TD;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _retrieve3rdService.timKiemThuDoiNguoiThu3(objTimKiem).then(res => {
            _gridViewThuDoiNguoiThu3.setDataSource(res, trang, GRID_HO_SO_SO_DONG);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewThuDoiNguoiThu3.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewThuDoiNguoiThu3.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function tinhTongTien() {
    $("#frmLuuHoaDonChungTu_Tongtien").val("");
    var tongTien = 0;
    $(".ntba-item:checked").each(function (index, el) {
        var index = parseInt($(this).attr("data-bt"));
        var tien = $("#bodyTableDsNguoiThuDoi_Tien_" + index).val().replace(/[^0-9]+/g, '');
        if (tien == "") {
            tien = "0";
        }
        tongTien += parseInt(tien);
    });
    if (tongTien > 0) {
        $("#frmLuuHoaDonChungTu_Tongtien").val(ESUtil.formatMoney(tongTien));
    }
}
function checkAll(el) {
    var check = $(el).is(":checked");
    if (check)
        $(".ntba-item").prop("checked", true);
    else
        $(".ntba-item").prop("checked", false);

    tinhTongTien();
}
function tinhLaiTien(el) {
    tinhTongTien();
}
function checkItem(el) {
    var total_row = $(".ntba-row").length;
    var row_checked = $(".ntba-item:checked").length;
    $(".ntba-all").prop("checked", false);
    if (total_row == row_checked) {
        $(".ntba-all").prop("checked", true);
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
    $("#btnNewRetrieve3rd").click(function () {
        $("#tableDsNguoiThuDoiCheckAll").prop("checked", false);
        _frmTimKiemNTBA.resetForm();
        _frmTimKiemNTBA.clearErrorMessage();
        _frmLuuHoaDonChungTu.resetForm();
        _frmLuuHoaDonChungTu.clearErrorMessage();
        $("#modalThuDoiNguoiThu3_Xoa").hide();
        $("#modalThuDoiNguoiThu3_Trinh").hide();
        $("#modalXemToTrinh").hide();
        _frmLuuHoaDonChungTu.getControl("so_ct").readOnly();
        _frmLuuHoaDonChungTu.getControl("ngay_ht").setValue(dateNow);
        _frmTimKiemNTBA.getControl("so_hs").readOnly(false);
        _frmTimKiemNTBA.getControl("tu_ngay").readOnly(false);
        _frmTimKiemNTBA.getControl("den_ngay").readOnly(false);
        $("#tableDsNguoiThuDoiCheckAll").removeAttr("disabled");
        ESUtil.genHTML("bodyTableDsNguoiThuDoiTemplate", "bodyTableDsNguoiThuDoi", { data_info: [] });
        _modalThuDoiNguoiThu3.show();
    });
    $("#btnFrmRetrieve3rdSearch").click(function () {
        getPaging(1);
    });
    $("#btnFrmRetrieve3rdSearchModal").click(function () {
        if (_frmTimKiemNTBA.isValid()) {
            var obj = _frmTimKiemNTBA.getJsonData();
            _retrieve3rdService.layDsNguoiThuBaCanThuDoi(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (res.data_info.length <= 0) {
                    _notifyService.error("Hồ sơ không có người thu đòi hoặc đã thu đòi toàn bộ");
                }
                _frmLuuHoaDonChungTu.getControl("so_hs").setValue(obj.so_hs);
                ESUtil.genHTML("bodyTableDsNguoiThuDoiTemplate", "bodyTableDsNguoiThuDoi", res);
            });
        }
    });
    $("#modalThuDoiNguoiThu3_Luu").click(function () {
        if (_frmLuuHoaDonChungTu.isValid()) {
            var obj = _frmLuuHoaDonChungTu.getJsonData();
            obj.so_id_td_ntba = _frmTimKiemNTBA.getControl("so_id_td_ntba").val().trim();
            obj.arr = [];
            $(".ntba-item:checked").each(function (index, el) {
                var bt = parseInt($(this).attr("data-bt"));
                var tien = $("#bodyTableDsNguoiThuDoi_Tien_" + bt).val().replace(/[^0-9]+/g, '');
                var ten = $("#bodyTableDsNguoiThuDoi_Ten_" + bt).val();
                var dthoai = $("#bodyTableDsNguoiThuDoi_Dthoai_" + bt).val();
                var dia_chi = $("#bodyTableDsNguoiThuDoi_Diachi_" + bt).val();
                var ghi_chu = $("#bodyTableDsNguoiThuDoi_GhiChu_" + bt).val();
                if (tien == "") {
                    tien = 0;
                }
                else {
                    tien = parseInt(tien);
                }
                obj.arr.push({
                    bt: bt,
                    tien: tien,
                    ten: ten,
                    dia_chi: dia_chi,
                    dthoai: dthoai,
                    ghi_chu: ghi_chu
                });
            });
            if (obj.arr.length < 0) {
                _notifyService.error("Bạn chưa chọn người cần thu đòi");
                return;
            }
            _retrieve3rdService.luuThuDoiNguoiThu3(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThuDoiNguoiThu3.hide();
                _notifyService.success("Lưu thông tin thành công");
            });
        }
    });
    $("#modalThuDoiNguoiThu3_Xoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa yêu cầu thu tiền người thứ 3 này hay không?", "", () => {
            var so_id_td_ntba = _frmTimKiemNTBA.getControl("so_id_td_ntba").val().trim();
            _retrieve3rdService.xoaThuDoiNguoiThu3({ so_id_td_ntba: so_id_td_ntba }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThuDoiNguoiThu3.hide();
                _notifyService.success("Xóa thông tin thành công");
            });
        });
    });
    $("#modalThuDoiNguoiThu3_Trinh").click(function () {
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_doi_tac_ql: ESCS_MA_DOI_TAC,
            so_id: _frmLuuHoaDonChungTu.getControl("so_id").val(),
            ma_dt_trinh: _frmLuuHoaDonChungTu.getControl("so_id_td_ntba").val(),
            loai_trinh: "XE_TRINH_DUYET_THU_DOI_NTBA",
            nghiep_vu: "XE",
        }
        var data = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            so_id_td_ntba: _frmLuuHoaDonChungTu.getControl("so_id_td_ntba").val()
        };
        _modalTrinhDuyetService.show(obj, (type, res) => {
            _retrieve3rdService.layThongTinChiTietThuDoiNguoiThu3(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                $("#tableDsNguoiThuDoiCheckAll").attr("disabled", "disabled");
                $("#tableDsNguoiThuDoiCheckAll").prop("checked", true);

                _frmTimKiemNTBA.getControl("so_hs").readOnly(true);
                _frmTimKiemNTBA.getControl("tu_ngay").readOnly(true);
                _frmTimKiemNTBA.getControl("den_ngay").readOnly(true);

                _frmTimKiemNTBA.getControl("so_hs").val(res.data_info.thu_doi.so_hs);
                _frmTimKiemNTBA.getControl("so_id_td_ntba").val(res.data_info.thu_doi.so_id_td_ntba);

                _frmLuuHoaDonChungTu.getControl("so_ct").readOnly();
                _frmLuuHoaDonChungTu.getControl("so_id").val(res.data_info.thu_doi.so_id);
                _frmLuuHoaDonChungTu.getControl("so_id_td_ntba").val(res.data_info.thu_doi.so_id_td_ntba);
                _frmLuuHoaDonChungTu.getControl("so_ct").val(res.data_info.thu_doi.so_ct);
                _frmLuuHoaDonChungTu.getControl("so_hs").val(res.data_info.thu_doi.so_hs);
                _frmLuuHoaDonChungTu.getControl("ngay_ht").val(res.data_info.thu_doi.ngay_ht);
                _frmLuuHoaDonChungTu.getControl("ghi_chu").val(res.data_info.thu_doi.ghi_chu);

                $("#modalThuDoiNguoiThu3_Luu").hide();
                $("#modalThuDoiNguoiThu3_Xoa").hide();
                $("#modalThuDoiNguoiThu3_Trinh").hide();
                $("#modalThuDoiNguoiThu3_LuuChungTu").hide();
                if (res.data_info.thu_doi.trang_thai == "C") {
                    $("#modalThuDoiNguoiThu3_Xoa").show();
                    $("#modalThuDoiNguoiThu3_Luu").show();
                    $("#modalThuDoiNguoiThu3_Trinh").show();
                }
                if (res.data_info.thu_doi.trang_thai == "T") {
                    $("#modalThuDoiNguoiThu3_Trinh").show();
                }
                if (res.data_info.thu_doi.trang_thai == "D") {
                    _frmLuuHoaDonChungTu.getControl("so_ct").readOnly(false);
                    $("#modalThuDoiNguoiThu3_LuuChungTu").show();
                }
                ESUtil.genHTML("bodyTableDsNguoiThuDoiTemplate", "bodyTableDsNguoiThuDoi", { data_info: res.data_info.thu_doi_ct }, () => {
                    tinhTongTien();
                });
            });
            getPaging(1);
        });
    });
    $("#modalXemToTrinh").click(function () {
        _notifyService.success("Đang cập nhật");
    });
    getPaging(1);
});