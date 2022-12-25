var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _costDiseasService = new CostDiseasService();
var _diseasesListService = new DiseasesListService();
var _costsListService = new CostsListService();
var _modalDocumentService = new ModalDocumentService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmNhapMaBenh = new FormService("frmNhapMaBenh");
var _frmXemKetQua = new FormService("frmXemKetQua");
var _popoverTraCuuBenh = new PopoverService("popoverTraCuuBenh");
var _modalXemChiTiet = new ModalService("modalXemChiTiet");
var _modalChiPhiKhamBenh = new ModalDragService("modalChiPhiKhamBenh", undefined, "right");
var _modalChiPhiThuoc = new ModalDragService("modalChiPhiThuoc", undefined, "right");
var _modalChiPhiKhac = new ModalDragService("modalChiPhiKhac", undefined, "left");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;
var el = null;
var _dataBenhChiPhi = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_icd", title: "Bệnh ICD", width: "30%", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "15%", headerSort: false },
    { field: "loai_hthi", title: "Loại", width: "10%", align: "center", headerSort: false },
    { field: "ten_dvi_tinh", title: "Đơn vị tính", width: "8%", align: "center", headerSort: false },
    { field: "gia_tham_khao", title: "Giá tham khảo", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", hozAlign: "center", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _costDiseasService.GetPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _frmNhapMaBenh.setData(data);
    $("#inputTimKiemBenhLy_ma").val(data.ma_benh);
    $('#btnTraCuuBenh').trigger('click');
    showModal();
}
function showModal() {
    $('#inside-modal .nav-tabs.profile-tab').tabdrop();
    $("#inside-modal").esmodal("show");
}
function hideModal() {
    $("#inside-modal").esmodal("hide");
}
function traCuuBenh() {
    $("#inputTimKiemBenhLy").val("");
    $(".item-benh").prop("checked", false);
    var ma = _frmNhapMaBenh.getControl("ma_benh").val().replace(/;/g, "|");
    var ten = _frmNhapMaBenh.getControl("chan_doan").val().replace(/;/g, "|");
    $("#inputTimKiemBenhLy_ma").val(ma);
    $("#inputTimKiemBenhLy_ten").val(ten);

    getPagingBenhLy(1);
    _popoverTraCuuBenh.show(() => {
        $("#inputTimKiemBenhLy").focus();
        return true;
    });
}
function chonBenhLy(el) {
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#inputTimKiemBenhLy_ma").val() != "") {
        arr_ma = $("#inputTimKiemBenhLy_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#inputTimKiemBenhLy_ma").val(arr_ma.join("|"));
}
function getPagingBenhLy(trang, callback = undefined) {
    var tim = $("#inputTimKiemBenhLy").val();
    tim = ESUtil.removeVietnameseTones(tim).toUpperCase();
    tim = tim.replace(/ /g, "");
    var so_dong = 20;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    var source = JSON.parse(JSON.stringify(objDanhMuc.ds_benh_ly));
    if (tim != "") {
        source = source.where(n => n.ten_tim.includes(tim));
    }
    var tong_so_dong = source.length;
    /*    var arr = source.slide(dau-1, cuoi -1);*/
    var arr = source.where((item, i) => i > dau && i <= cuoi);
    ESUtil.genHTML("dsBenhLyTemplate", "dsBenhLy", { ds_benh_ly: arr }, () => {
        var ma = $("#inputTimKiemBenhLy_ma").val();
        if (ma != "") {
            var arr = ma.split("|");
            for (var i = 0; i < arr.length; i++) {
                $("#ma_benh_" + arr[i].replace(/\./g, "")).prop("checked", true);
            }
        }
    });
    $("#dsBenhLy_pagination").html(ESUtil.pagingHTML("getPagingBenhLy", trang, tong_so_dong, so_dong));
    $("#inputTimKiemBenhLy").focus();
}
function xoaChiPhi(el) {
    _notifyService.confirm("Bạn có chắc muốn xóa chi phí này không?", "", () => {
        $(el).parent().parent().remove();
    });
}
function getTableChiPhiKham() {
    var otArr = [];
    $("#tbDsChiPhiKhamBenh tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).attr("data-val");
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "KB";
        otArr.push(json);
    });
    return otArr;
}
function getTableChiPhiThuoc() {
    var otArr = [];
    $("#tbDsChiPhiThuoc tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).attr("data-val");
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "TH";
        otArr.push(json);
    });
    return otArr;
}
function getTableChiPhiKhac() {
    var otArr = [];
    $("#tbDsCPK tr").each(function (e) {
        if ($(this).find("input").length <= 0)
            return;
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).attr("data-val");
                }
            });
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        json.loai = "KH";
        otArr.push(json);
    });
    return otArr;
}
function chonCPKB(el) {
    ESUtil.genHTML("modalChiPhiKhamBenhDanhSachTemplate", "modalChiPhiKhamBenhDanhSach", { danh_sach: objDanhMuc.chi_phi.where(n => n.loai == "KB") }, () => {
        $("#modalChiPhiKhamBenhDanhSach .dscpkb").removeClass("d-none");
        $("#inputSearch_ChiPhiKhamBenh").focus();
        $("#inputSearch_ChiPhiKhamBenh").val("");
        $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem").prop("checked", false);
        var arr = getTableChiPhiKham();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ma != '') {
                $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem[value='" + arr[i].ma + "']").prop("checked", true);
            }
        }
        _modalChiPhiKhamBenh.show(el);
    });
}
function chonLoaiThuoc(el) {
    ESUtil.genHTML("modalChiPhiThuocDanhSachTemplate", "modalChiPhiThuocDanhSach", { danh_sach: objDanhMuc.chi_phi.where(n => n.loai == "TH") }, () => {
        $("#modalChiPhiThuocDanhSach .dscpt").removeClass("d-none");
        $("#inputSearch_ChiPhiThuoc").focus();
        $("#inputSearch_ChiPhiThuoc").val("");
        $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem").prop("checked", false);
        var arr = getTableChiPhiThuoc();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ma != '') {
                $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem[value='" + arr[i].ma + "']").prop("checked", true);
            }
        }
        _modalChiPhiThuoc.show(el);
    });
}
function chonCPK(el) {
    ESUtil.genHTML("modalChiPhiKhacDanhSachTemplate", "modalChiPhiKhacDanhSach", { danh_sach: objDanhMuc.chi_phi.where(n => n.loai == 'KH') }, () => {
        $("#modalChiPhiKhacDanhSach .dscpk").removeClass("d-none");
        $("#inputSearch_ChiPhiKhac").focus();
        $("#inputSearch_ChiPhiKhac").val("");
        $("#modalChiPhiThuocDanhSach .modalChiPhiKhacItem").prop("checked", false);
        var arr = getTableChiPhiKhac();
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].ma != '') {
                $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem[value='" + arr[i].ma + "']").prop("checked", true);
            }
        }
        _modalChiPhiKhac.show(el);
    });
}
function getDataTable() {
    var arrKb = getTableChiPhiKham().where(n => n.ma != '' && n.ma != undefined);
    var arrTh = getTableChiPhiThuoc().where(n => n.ma != '' && n.ma != undefined);
    var arrKh = getTableChiPhiKhac().where(n => n.ma != '' && n.ma != undefined);

    var arr = [...arrKb, ...arrTh, ...arrKh];

    return arr;
}

$(document).ready(function () {
    var storageDanhSachBenhLy = ESStorage.getItemLocalStorage(ESConstants.DANH_SACH_BENH_LY);
    if (storageDanhSachBenhLy === undefined || storageDanhSachBenhLy === null || storageDanhSachBenhLy === "null") {
        _service.all([
            _partnerListService.layDsDoiTac(),
            _costsListService.layDsChiPhi(),
            _diseasesListService.layDanhSachMaBenh(),
        ]).then(arrRes => {
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_phi = arrRes[1].data_info;
            objDanhMuc.ds_benh_ly = arrRes[2].data_info;

            ESStorage.setItemLocalStorage(ESConstants.DANH_SACH_BENH_LY, JSON.stringify(objDanhMuc.ds_benh_ly));
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmNhapMaBenh.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

            ESUtil.genHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: [] });

            ESUtil.genHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: [] });

            ESUtil.genHTML("tbDsCPKTemplate", "tbDsCPK", { data: [] });

            getPaging(1);
        });
    } else {
        _service.all([
            _partnerListService.layDsDoiTac(),
            _costsListService.layDsChiPhi(),
            _diseasesListService.layDanhSachMaBenh(),
        ]).then(arrRes => {
            objDanhMuc.doi_tac = arrRes[0].data_info;
            objDanhMuc.chi_phi = arrRes[1].data_info;
            objDanhMuc.ds_benh_ly = arrRes[2].data_info;
            ESStorage.setItemLocalStorage(ESConstants.DANH_SACH_BENH_LY, JSON.stringify(objDanhMuc.ds_benh_ly));
            ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
            objDanhMuc.doi_tac = arrRes[0].data_info;
            _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmNhapMaBenh.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

            ESUtil.genHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: [] });

            ESUtil.genHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: [] });

            ESUtil.genHTML("tbDsCPKTemplate", "tbDsCPK", { data: [] });

            getPaging(1);
        });
    }
    
    $("#btnThemMoi").click(function () {
        ESUtil.genHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: [] });
        ESUtil.genHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: [] });
        ESUtil.genHTML("tbDsCPKTemplate", "tbDsCPK", { data: [] });

        _frmNhapMaBenh.resetForm();
        _frmNhapMaBenh.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        
        
        _frmNhapMaBenh.clearErrorMessage();
        showModal();
    });

    $("#btnTraCuuBenh").click(function () {
        var ma = $("#inputTimKiemBenhLy_ma").val();
        if (ma == "") {
            _notifyService.error("Bạn chưa chọn bệnh lý");
            return;
        }
        var arr = ma.split("|");
        var ten = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                ten += objDanhMuc.ds_benh_ly.where(n => n.ma == arr[i]).firstOrDefault().ten_v;  
            } else {
                ten += "; " + objDanhMuc.ds_benh_ly.where(n => n.ma == arr[i]).firstOrDefault().ten_v; 
            }
        }
        _frmNhapMaBenh.getControl("ma_benh").val(ma.replace(/\|/g, ";"));
        _frmNhapMaBenh.getControl("chan_doan").val(ten);
        _popoverTraCuuBenh.hide();

        var obj = {
            ma_doi_tac: _frmNhapMaBenh.getControl('ma_doi_tac').getValue(),
            ma_benh: ma
        }
        _costDiseasService.layThongTinChiTiet(obj).then(res => {
            var arrCPKB = res.data_info.where(n => n.loai == 'KB');
            ESUtil.genHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: arrCPKB });
            var arrLT = res.data_info.where(n => n.loai == 'TH');
            ESUtil.genHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: arrLT });
            var arrCPK = res.data_info.where(n => n.loai == 'KH');
            ESUtil.genHTML("tbDsCPKTemplate", "tbDsCPK", { data: arrCPK });
        });
    });

    $("#btnLuu").click(function () {
        if (_frmNhapMaBenh.isValid()) {
            var data = getDataTable();
            var obj = {
                ma_doi_tac: _frmNhapMaBenh.getControl('ma_doi_tac').getValue(),
                ma_benh: _frmNhapMaBenh.getControl('ma_benh').getValue(),
                data: data
            };
            _costDiseasService.Save(obj).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    hideModal();
                    _notifyService.success("Lưu thông tin thành công.");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDongTraCuuBenh").click(function () {
        _popoverTraCuuBenh.hide();
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    })

    $("#btnThemCPKB").click(function () {
        ESUtil.appendHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: [] });
    });

    $('#btnChonChiPhiKhamBenh').click(function () {
        var arr = getTableChiPhiKham();
        arr = arr.filter(n => n.ma != '');
        var ds_chon = $("#modalChiPhiKhamBenhDanhSach .modalChiPhiKhamBenhItem:checked");

        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.chi_phi.where(n => n.loai == "KB" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({ ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct, gia_tham_khao: 0 });
                }
            });
        }
        console.log(danh_sach_chon);
        ESUtil.genHTML("tbDsChiPhiKhamBenhTemplate", "tbDsChiPhiKhamBenh", { data: danh_sach_chon });
        _modalChiPhiKhamBenh.hide();
    });

    $("#btnThemLoaiThuoc").click(function () {
        ESUtil.appendHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: [] });
    });

    $('#btnChonChiPhiThuoc').click(function () {
        var arr = getTableChiPhiThuoc();
        arr = arr.filter(n => n.ma != '');
        var ds_chon = $("#modalChiPhiThuocDanhSach .modalChiPhiThuocItem:checked");
        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.chi_phi.where(n => n.loai == "TH" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({
                        ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct, gia_tham_khao: 0
                    });
                }
            });
        }
        ESUtil.genHTML("tbDsChiPhiThuocTemplate", "tbDsChiPhiThuoc", { data: danh_sach_chon });
        _modalChiPhiThuoc.hide();
    });

    $("#btnThemCPK").click(function () {
        ESUtil.appendHTML("tbDsCPKTemplate", "tbDsCPK", { data: [] });
    });

    $('#btnChonChiPhiKhac').click(function () {
        var arr = getTableChiPhiKhac();
        arr = arr.filter(n => n.ma != '');
        var ds_chon = $("#modalChiPhiKhacDanhSach .modalChiPhiKhacItem:checked");
        var danh_sach_chon = [];
        if (ds_chon.length > 0) {
            ds_chon.each(function (index, el) {
                var value = $(el).val();
                var ton_tai = arr.where(n => n.ma == value).firstOrDefault();
                if (ton_tai != null) {
                    danh_sach_chon.push(ton_tai);
                }
                else {
                    var chi_phi = objDanhMuc.chi_phi.where(n => n.loai == "KH" && n.ma == value).firstOrDefault();
                    danh_sach_chon.push({
                        ma: value, ten: chi_phi.ten, ma_ct: chi_phi.ma_ct, ten_ct: chi_phi.ten_ct, gia_tham_khao: 0
                    });
                }
            });
        }
        ESUtil.genHTML("tbDsCPKTemplate", "tbDsCPK", { data: danh_sach_chon });
        _modalChiPhiKhac.hide();
    });
});