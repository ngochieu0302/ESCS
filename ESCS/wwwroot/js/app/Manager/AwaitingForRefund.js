//Service
var _serviceHoanQuy = new Service();
var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _bankListService = new BankListService();
var _service = new AwaitingForRefundService();
var _partnerListService = new PartnerListService();
var _modalDocumentService = new ModalDocumentService();

var objDanhMuc = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var ngayDauNam = new Date().getNgayDauNam();
var dsHoSoHoanQuy = [];
var dsHoSoDeNghiHoanQuy = [];

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;
//Form
var _frmTimKiemHoSo = new FormService("frmTimKiemHoSo");
var _frmHoanQuy = new FormService("frmHoanQuy");
var _frmSearchHoSoTon = new FormService("frmSearchHoSoTon");
var _frmSearchHoSoDeNghiHoanQuy = new FormService("frmSearchHoSoDeNghiHoanQuy");
//Modal
var _modalTaoDeNghiHoanQuy = new ModalService("modalTaoDeNghiHoanQuy");
var _modalHoanQuyBoiThuong = new ModalService("modalHoanQuyBoiThuong");
var _popoverGhiChu = new PopoverService("popoverGhiChu");

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "nv", title: "Nghiệp vụ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "tien", title: "Số tiền", width: "15%", hozAlign: "center", headerSort: false, formatter: formatterMoney },
    { field: "sl_ho_so", title: "Số lượng hồ sơ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ngay_ht", title: "Ngày nhập", width: "15%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "20%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nsd", title: "Người sử dụng", width: "15%", hozAlign: "center", headerSort: false,}
];

var _gridViewHoSo = new GridViewService("gridViewHoSo", configColumn, getPaging, rowClick);

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id_tt === undefined || data.so_id_tt === null || data.so_id_tt === 0 || data.so_id_tt === "") {
        return;
    }
    dsHoSoHoanQuy = [];
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id_tt: data.so_id_tt };
    xemCtietHoanQuy(objGetDetail, res => {
        if (row !== undefined) {
            row.select();
        }
        $("#btnExportDsHsTon").addClass("d-none");
        _modalHoanQuyBoiThuong.show();
    });
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiemHoSo.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 13;
    _service.getPaging(objTimKiem).then(res => {
        _gridViewHoSo.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function xemCtietHoanQuy(objGetDetail, callback = undefined) {
    _service.layCtHoanQuy(objGetDetail).then(res => {
        ho_so_chi_tiet = res.data_info;
        var hoan_quy = res.data_info.ttchung;
        _frmSearchHoSoDeNghiHoanQuy.resetForm();
        _frmSearchHoSoDeNghiHoanQuy.getControl("nv").setValue(hoan_quy.nv);
        _frmSearchHoSoDeNghiHoanQuy.getControl("ma_doi_tac_ql").setValue(hoan_quy.ma_doi_tac_ql);
        _frmSearchHoSoDeNghiHoanQuy.setData(hoan_quy);
        _frmHoanQuy.setData(hoan_quy);
        for (var i = 0; i < res.data_info.chi_tiet.length; i++) {
            res.data_info.chi_tiet[i].checked = true;
        }
        dsHoSoDeNghiHoanQuy = res.data_info.chi_tiet;
        ESUtil.genHTML("tblHoanQuyChiTiet_template", "tblHoanQuyChiTiet", { data: res.data_info.chi_tiet }, () => {
            $(".ttct_item").attr("disabled", "disabled");
            $(".ttct_item").prop("checked", true);
            $("#txtSoHSHoanQuy").html(res.data_info.chi_tiet.length);
            $("#modalHoanQuyBoiThuongFormNhap").addClass("d-none");
            $("#modalHoanQuyBoiThuongFormLietKe").removeClass("d-none");
        });
        anHienNut();
        _frmSearchHoSoDeNghiHoanQuy.getControl("nv").readOnly(true);
        _frmSearchHoSoDeNghiHoanQuy.getControl("noi_dung").readOnly(false);
        $("#btnXuatBaoCaoHoanQuy").removeClass("d-none");
        $("#btnIn").removeClass("d-none");
        if (callback) {
            callback(res);
        }
    });
}
function getHoSoTon(trang, callback = undefined) {
    var objTimKiem = _frmSearchHoSoTon.getJsonData();
    _service.getListBackLog(objTimKiem).then(res => {
        if (res.data_info.length > 0) {
            for (var i = 0; i < res.data_info.length; i++) {
                if (dsHoSoHoanQuy.where(n => n.bt == res.data_info[i].bt).length > 0) {
                    res.data_info[i].checked = true;
                }
                else {
                    res.data_info[i].checked = false;
                }
            }
        }
        
        ESUtil.genHTML("tblHoanQuyTon_template", "tblHoanQuyTon", { data: res.data_info });
        if (callback) {
            callback(res)
        }
    });
}
function anHienNut(isNew = false) {
    $("#btnXoa").addClass("d-none");
    $("#btnThemHoSoTon").addClass("d-none");
    $("#btnLuuDeNghiHoanQuyHoSo").addClass("d-none");
    $("#btnXacNhanHoanQuy").addClass("d-none");
    $("#btnHuyXacNhanHoanQuy").addClass("d-none");
    if (isNew) {
        $("#btnLuuDongHoSo").removeClass("d-none");
        return;
    }
    if (ho_so_chi_tiet.ttchung.trang_thai == "C") {
        $("#btnXoa").removeClass("d-none");
        $("#btnXacNhanHoanQuy").removeClass("d-none");
        $("#btnThemHoSoTon").removeClass("d-none");
        $("#btnLuuDeNghiHoanQuyHoSo").removeClass("d-none");
    }
    if (ho_so_chi_tiet.ttchung.trang_thai == "D") {
        $("#btnHuyXacNhanHoanQuy").removeClass("d-none");
        $("#btnThemHoSoTon").addClass("d-none");
        $("#btnLuuDeNghiHoanQuyHoSo").addClass("d-none");
    }
}
function layDuLieuHoSoTonHoanQuy() {
    var otArr = [];
    $("#tblHoanQuyTon tr.row_item").each(function (e) {
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
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function layDuLieuHoSoTonHoanQuyChecked() {
    var otArr = [];
    $("#tblHoanQuyTon tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        if ($(this).find('input[data-field=bt]:checked').length > 0) {
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
                $(this).find("a").each(function (el) {
                    var field = $(this).attr("data-field");
                    if ($(this).hasClass("number")) {
                        json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                    }
                    else if ($(this).hasClass("combobox")) {
                        json[field] = $(this).attr("data-val");
                    }
                    else {
                        json[field] = $(this).attr('data-val');
                    }
                });
            });
            otArr.push(json);
        }
    });
    return otArr;
}
function layDuLieuHoSoDeNghiHoanQuy() {
    var otArr = [];
    $("#tblHoanQuyChiTiet tr.row_item").find('input[data-field=bt]:checked').each(function (e) {
        var json = {};
        x = $(this).closest('tr').children();
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
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).attr('data-val');
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
    var so_id_hs = $(el).closest('td').find('input[data-field=so_id_hs]').val();
    var dsHSTKiem = layDuLieuHoSoTonHoanQuy();
    var hs = dsHSTKiem.where(n => n.so_id_hs == so_id_hs && n.bt == val).firstOrDefault();
    var count = dsHoSoHoanQuy.where(n => n.so_id_hs == so_id_hs && n.bt == val).length;
    if ($(el).is(":checked") && count <= 0) {
        hs.checked = true;
        dsHoSoHoanQuy.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        dsHoSoHoanQuy = dsHoSoHoanQuy.removeItem(n => n.so_id_hs == so_id_hs && n.bt == val);
    }
    var tong = dsHoSoHoanQuy.sum(n => parseFloat(n.tien));
    $("#txtSoHSHoanQuy").html(dsHoSoHoanQuy.length);
    _frmHoanQuy.getControl("tong_tien").setValue(ESUtil.formatMoney(tong));
}
function onChonTatCa(el) {
    var checked = $(el).is(":checked");
    $(".ttbt_item").prop("checked", checked);
    var dsHSTKiem = layDuLieuHoSoTonHoanQuy();
    if (dsHSTKiem.length > 0) {

        for (var i = 0; i < dsHSTKiem.length; i++) {
            var hs = dsHSTKiem.where(n => n => n.so_id_hs == dsHSTKiem[i].so_id_hs && n.bt == dsHSTKiem[i].bt).firstOrDefault();
            var count = dsHoSoHoanQuy.where(n => n.so_id_hs == dsHSTKiem[i].so_id_hs && n.bt == dsHSTKiem[i].bt).length;
            if (checked && count <= 0) {
                hs.checked = true;
                dsHoSoHoanQuy.push(hs);
            }
            if (!checked && count > 0) {
                dsHoSoHoanQuy = dsHoSoHoanQuy.removeItem(n => n.so_id_hs == dsHSTKiem[i].so_id_hs && n.bt == dsHSTKiem[i].bt);
            }
        }
    }
    var tong = dsHoSoHoanQuy.sum(n => parseFloat(n.tien));
    $("#txtSoHSHoanQuy").html(dsHoSoHoanQuy.length);
    _frmHoanQuy.getControl("tong_tien").setValue(ESUtil.formatMoney(tong));
}
function xoaHoSoDeNghiHoanQuy(el, so_id_hs, bt) {
    _notifyService.confirm("Bạn có chắc muốn xóa hồ sơ này không?", "", () => {
        var trang_thai = ho_so_chi_tiet.ttchung.trang_thai;
        if (trang_thai == 'D') {
            _notifyService.error("Hồ sơ đã phê duyệt hoàn quỹ không sửa xóa.");
            return;
        } else {
            $(el).parent().parent().remove();
            var arr = layDuLieuHoSoDeNghiHoanQuy();
            dsHoSoDeNghiHoanQuy = arr;
        }
    });
}
$(document).ready(function () {
    _frmTimKiemHoSo.getControl("ngay_d").setValue(ngayDauNam);
    _frmTimKiemHoSo.getControl("ngay_c").setValue(dateNow);

    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _bankListService.layDsNganHang()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.ngan_hang = arrRes[1].data_info.where(n => n.nhom === "NGAN_HANG");

        _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").trigger("select2:select");
        _frmSearchHoSoDeNghiHoanQuy.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmSearchHoSoDeNghiHoanQuy.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        getPaging(1);
    });
    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnTimKiemHoSoTon").click(function () {
        getHoSoTon(1);
    });
    $("#btnThemMoiHoSo").click(function () {
        dsHoSoHoanQuy = [];
        dsHoSoDeNghiHoanQuy = [];
        anHienNut(true);
        $('#ttbt_chon_tat_ca').removeAttr("disabled");
        $("#ttbt_chon_tat_ca").prop("checked", false);
        _frmHoanQuy.resetForm();
        _frmHoanQuy.getControl("ngay_ht").setValue(dateNow);
        _frmSearchHoSoTon.resetForm();
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC);
        _frmSearchHoSoTon.getControl("ngay_d").setValue(ngayDauNam);
        _frmSearchHoSoTon.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoTon.getControl("nv").setValue("NG");
        $("#txtSoHSHoanQuy").html("0");
        _frmSearchHoSoTon.getControl("nv").readOnly(false);
        _frmSearchHoSoTon.getControl("noi_dung").readOnly(false);
        $("#btnXuatBaoCaoHoanQuy").addClass("d-none");
        $("#btnDanhSachHoSoDeNghiHoanQuy").addClass("d-none");
        $("#modalHoanQuyBoiThuongFormLietKe").addClass("d-none");
        $("btnExportDsHsTon").removeClass("d-none");
        $("#modalHoanQuyBoiThuongFormNhap").removeClass("d-none");
        getHoSoTon(1, res => {
            _modalHoanQuyBoiThuong.show();
        });
    });
    $("#btnThemDeNghiHoanQuy").click(function () {
        var obj = _frmSearchHoSoTon.getJsonData();
        var arrHoSoCho = dsHoSoHoanQuy;
        //var arrHoSoCho = layDuLieuHoSoTonHoanQuyChecked();
        var arrHoSoDeNghi = dsHoSoDeNghiHoanQuy;
        var arr = arrHoSoDeNghi;
        $.each(arrHoSoCho, function (index, item) {
            if (arrHoSoDeNghi.where(n => n.so_id_hs == item.so_id_hs).length > 0) {
                arrHoSoDeNghi.where(n => n.so_id_hs == item.so_id_hs).firstOrDefault().tien = parseInt(arrHoSoDeNghi.where(n => n.so_id_hs == item.so_id_hs).firstOrDefault().tien) + parseInt(item.tien);
            }
            else {
                arr.push(item);
            }
        });
        if (arrHoSoCho.length <= 0) {
            _notifyService.error("Bạn chưa chọn hồ sơ làm đề nghị hoàn quỹ!");
            return;
        }
        ESUtil.genHTML("tblHoanQuyChiTiet_template", "tblHoanQuyChiTiet", { data: arr }, () => {
            $("#modalHoanQuyBoiThuongFormNhap").addClass("d-none");
            $("#modalHoanQuyBoiThuongFormLietKe").removeClass("d-none");
            $("#btnLuuDeNghiHoanQuyHoSo").removeClass("d-none");
            $("#btnThemHoSoTon").removeClass("d-none");
            $("#btnXacNhanHoanQuy").addClass("d-none");
            $("#btnXuatBaoCaoHoanQuy").addClass("d-none");
            $("#btnXoa").addClass("d-none");
            $("#btnIn").addClass("d-none");
            _frmSearchHoSoDeNghiHoanQuy.getControl("nv").setValue(obj.nv);
            _frmSearchHoSoDeNghiHoanQuy.getControl("ma_doi_tac_ql").setValue(obj.ma_doi_tac_ql);
        });
    });
    $("#btnThemHoSoTon").click(function () {
        $("#modalHoanQuyBoiThuongFormNhap").removeClass("d-none");
        $("#modalHoanQuyBoiThuongFormLietKe").addClass("d-none");
        $("#btnDanhSachHoSoDeNghiHoanQuy").removeClass("d-none");
        _frmSearchHoSoTon.resetForm();
        _frmSearchHoSoTon.getControl("ngay_d").setValue(ngayDauNam);
        _frmSearchHoSoTon.getControl("ngay_c").setValue(dateNow);
        _frmSearchHoSoTon.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC);
        _frmSearchHoSoTon.getControl("nv").setValue("NG");
        ESUtil.genHTML("tblHoanQuyTon_template", "tblHoanQuyTon", { data: [] });
        getHoSoTon(1, () => {
            $(".ttbt_item").removeAttr("disabled");
            $(".ttbt_item").prop("checked", false);
            $('#ttbt_chon_tat_ca').removeAttr("disabled");
            $('#ttbt_chon_tat_ca').prop("checked", false);
            $("#txtSoHSHoanQuy").html("0");
        });
    });
    $("#btnLuuDeNghiHoanQuyHoSo").click(function () {
        var obj = _frmHoanQuy.getJsonData();
        obj.nv = _frmSearchHoSoDeNghiHoanQuy.getControl('nv').getValue();
        obj.ma_doi_tac_ql = _frmSearchHoSoDeNghiHoanQuy.getControl('ma_doi_tac_ql').getValue();
        obj.ma_nh = _frmSearchHoSoDeNghiHoanQuy.getControl('ma_nh').getValue();
        obj.ma_tk = _frmSearchHoSoDeNghiHoanQuy.getControl('ma_tk').val();
        obj.ten_thu_huong = _frmSearchHoSoDeNghiHoanQuy.getControl('ten_thu_huong').val();
        obj.nd = _frmSearchHoSoDeNghiHoanQuy.getControl('nd').val();
        dsHoSoDeNghiHoanQuy = layDuLieuHoSoDeNghiHoanQuy();
        if (_frmHoanQuy.isValid()) {
            obj.arr = dsHoSoDeNghiHoanQuy;
            if (obj.arr.length <= 0) {
                _notifyService.error("Bạn chưa chọn hồ sơ hoàn quỹ.");
                return;
            }
            _service.nhapHsHoanQuy(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmHoanQuy.getControl("so_id_tt").setValue(res.out_value.so_id_tt);
                _notifyService.success("Lưu đề nghị hoàn quỹ thành công.");
                getPaging(1);
                _modalHoanQuyBoiThuong.hide();
            });
        }
    });
    $("#btnXacNhanHoanQuy").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn xác nhận đề nghị hoàn quỹ này không?", "", val => {
            var obj = { so_id_tt: ho_so_chi_tiet.ttchung.so_id_tt };
            _service.xacNhanHoanQuy(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.ttchung.trang_thai = "D";
                anHienNut();
                getPaging(1);
                _notifyService.success("Xác nhận hoàn quỹ thành công");
            });
        });
    });
    $("#btnHuyXacNhanHoanQuy").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn gỡ đề nghị hoàn quỹ này không?", "", val => {
            var obj = { so_id_tt: ho_so_chi_tiet.ttchung.so_id_tt };
            _service.xacNhanHoanQuyHuy(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ho_so_chi_tiet.ttchung.trang_thai = "C";
                anHienNut();
                getPaging(1);
                _notifyService.success("Gỡ xác nhận đề nghị hoàn quỹ thành công");
            });
        });
    });
    $("#btnXoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa tất cả hồ sơ đề nghị hoàn quỹ này không?", "", () => {
            var obj = _frmHoanQuy.getJsonData();
            if (_frmHoanQuy.isValid()) {
                _service.xoaHsHoanQuy(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _modalHoanQuyBoiThuong.hide();
                    _notifyService.success("Xóa đề nghị hoàn quỹ thành công");
                    getPaging(1);
                });
            }
        });
    });
    $("#btnXuatBaoCaoHoanQuy").click(function () {
        var obj = _frmSearchHoSoTon.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_CHUYEN_TIEN";
        obj.ma_doi_tac = ho_so_chi_tiet.ttchung.ma_doi_tac;
        obj.so_id_tt = ho_so_chi_tiet.ttchung.so_id_tt;
        _serviceHoanQuy.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $("#btnIn").click(function () {
        var sourceMauIn = [
            { ma: "ESCS_HQBT", ten: "Bảng kê hoàn quỹ bồi thường" },
        ];
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
        _modalDocumentService.show("ESCS_HQBT");
    });
    getPaging(1);
});
