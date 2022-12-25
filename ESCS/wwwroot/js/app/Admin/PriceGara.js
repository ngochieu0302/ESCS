var objDanhMuc = {};
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;
//Services
var _service = new Service();
var _notifyService = new NotifyService();
var _garaListService = new GaraListService();
var _partnerListService = new PartnerListService();
var _priceGaraService = new PriceGaraService();
var _UploadExcelService = new UploadExcelService();

//Form
var _frmTimKiem = new FormService("frmTimKiem");
var _frmNhapGiaGara = new FormService("frmNhapGiaGara");
var _navThongTin = new NavTabService("navThongTin", ["tabThongTinChung", "tabBaoGiaGara"], "quy-trinh");
//Modal
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _dataGara = null;
var objData = null;
var dateNow = new Date().ddmmyyyy();

var configColumn = [
    { field: "stt", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "gara", title: "Mã gara", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ngay_ad_hthi", title: "Ngày áp dụng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_gara", title: "Tên gara", width: "30%", headerSort: false },
    { field: "nsd", title: "nsd", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];
var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

//GetPaging
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _priceGaraService.getPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewChiPhi.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
//Rowclick
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac == undefined || data.ma_doi_tac == null || data.ma_doi_tac == "") {
        return;
    }
    _priceGaraService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        _dataGara = res.data_info.data.firstOrDefault();
        showStep("tabBaoGiaGara");

        ESUtil.genHTML("tableNhapGiaGara_template", "tableNhapGiaGara", { data: res.data_info.data });
        _frmNhapGiaGara.getControl("ngay_ad").setValue(_dataGara.ngay_ad_hthi);
        _frmNhapGiaGara.getControl("gara").setValue(_dataGara.gara);

        $('#treeHangXe').jstree("destroy").empty();
        $('#treeHangMuc').jstree("destroy").empty();
        $('#treeMucDo').jstree("destroy").empty();

        loadData(ESCS_MA_DOI_TAC_DUY_NHAT, _dataGara.gara, _dataGara.ngay_ad);
        showModal();
    });
};
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
//Show/Hide modal
function showModal() {
    $('#inside-modal .nav-tabs.profile-tab').tabdrop();
    $("#inside-modal").esmodal("show");
}
function hideModal() {
    $("#inside-modal").esmodal("hide");
}
function loadData(ma_doi_tac, gara, ngay_ad, callback = undefined) {
    var hang_xe = objDanhMuc.cau_hinh.hang_xe;
    var hieu_xe = objDanhMuc.cau_hinh.hieu_xe;
    var hang_muc = objDanhMuc.cau_hinh.hang_muc;
    var muc_do = objDanhMuc.cau_hinh.muc_do;
    if (hang_xe.length <= 0 || hang_xe == null || hang_xe == undefined && hieu_xe.length <= 0 || hieu_xe == null || hieu_xe == undefined
        && hang_muc.length <= 0 || hang_muc == null || hang_muc == undefined && muc_do.length <= 0 || muc_do == null || muc_do == undefined) {
        _notifyService.error("Gara chưa được cấu hình");
        $('#treeHangXe').jstree("destroy").empty();
        $('#treeHangMuc').jstree("destroy").empty();
        $('#treeMucDo').jstree("destroy").empty();
        return;
    }
    else {
        $('#treeHangXe').jstree("destroy").empty();
        $('#treeHangMuc').jstree("destroy").empty();
        $('#treeMucDo').jstree("destroy").empty();
        if (gara != '') {
            taoDuLieuTreeHangXe(ma_doi_tac,
                hang_xe,
                hieu_xe,
                gara,
                ngay_ad,
                arr => {
                    fnLoadTreeHangXe(arr);
                });

            taoDuLieuTreeHangMuc(ma_doi_tac,
                hang_muc,
                gara,
                ngay_ad,
                arr => {
                    fnLoadTreeHangMuc(arr);
                });

            taoDuLieuTreeMucDo(ma_doi_tac,
                muc_do,
                gara,
                ngay_ad,
                arr => {
                    fnLoadTreeMucDo(arr);
                });
        } else {
            fnLoadTreeHangXe(taoDuLieuTreeHangXe(ma_doi_tac, hang_xe, hieu_xe, ngay_ad));
            fnLoadTreeHangMuc(taoDuLieuTreeHangMuc(ma_doi_tac, hang_muc, ngay_ad));
            fnLoadTreeMucDo(taoDuLieuTreeMucDo(ma_doi_tac, muc_do, ngay_ad));
        }
    }
    if (callback) {
        callback();
    }
}
//Tree
function taoDuLieuTreeHangXe(ma_doi_tac, hang_xe, hieu_xe, gara, ngay_ad, callback = undefined) {
    var arr = [];
    _priceGaraService.getDetail({ ma_doi_tac: ma_doi_tac, gara: gara, ngay_ad: ngay_ad }).then(res => {
        for (var i = 0; i < hang_xe.length; i++) {
            var obj = {
                id: hang_xe[i].ma_hang_xe,
                parent: "#",
                text: hang_xe[i].ten_hang_xe,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {},
            }
            arr.push(obj);
        }
        for (var i = 0; i < hieu_xe.length; i++) {
            var obj = {
                id: hieu_xe[i].ma_hang_xe + "/" + hieu_xe[i].ma_hieu_xe,
                parent: hieu_xe[i].ma_hang_xe,
                text: hieu_xe[i].ten_hieu_xe,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {},
            }
            for (var j = 0; j < res.data_info.data.length; j++) {
                if (hieu_xe[i].ma_hieu_xe == res.data_info.data[j].hieu_xe) {
                    obj.state.selected = true;
                }
            }
            arr.push(obj);
        }
        if (callback) {
            callback(arr);
        }
    });
}
function taoDuLieuTreeHangMuc(ma_doi_tac, hang_muc, gara, ngay_ad, callback = undefined) {
    var arr = [];
    _priceGaraService.getDetail({ ma_doi_tac: ma_doi_tac, gara: gara, ngay_ad: ngay_ad }).then(res => {
        for (var i = 0; i < hang_muc.length; i++) {
            var obj = {
                id: hang_muc[i].ma_hang_muc,
                parent: "#",
                text: hang_muc[i].ten_hang_muc,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false
                },
                li_attr: {},
                a_attr: {}
            }
            for (var j = 0; j < res.data_info.data.length; j++) {
                if (hang_muc[i].ma_hang_muc == res.data_info.data[j].hang_muc) {
                    obj.state.selected = true;
                }
            }
            arr.push(obj);
        }
        if (callback) {
            callback(arr);
        }
    });
}
function taoDuLieuTreeMucDo(ma_doi_tac, muc_do_ton_that, gara, ngay_ad, callback = undefined) {
    var arr = [];
    _priceGaraService.getDetail({ ma_doi_tac: ma_doi_tac, gara: gara, ngay_ad: ngay_ad }).then(res => {
        for (var i = 0; i < muc_do_ton_that.length; i++) {
            if (muc_do_ton_that[i].ma_mdtt_ct == null) {
                obj = {
                    id: muc_do_ton_that[i].ma_muc_do,
                    parent: '#',
                    text: muc_do_ton_that[i].ten_muc_do,
                    icon: "",
                    state: {
                        opened: true,
                        disabled: false,
                        selected: false
                    },
                    li_attr: {},
                    a_attr: {}
                }
            } else {
                obj = {
                    id: muc_do_ton_that[i].ma_muc_do,
                    text: muc_do_ton_that[i].ten_muc_do,
                    icon: "",
                    state: {
                        opened: true,
                        disabled: false,
                        selected: false
                    },
                    li_attr: {},
                    a_attr: {}
                }
            }
            for (var j = 0; j < res.data_info.data.length; j++) {
                if (muc_do_ton_that[i].ma_muc_do_tt == res.data_info.data[j].muc_do) {
                    obj.state.selected = true;
                }
            }
            arr.push(obj);
        }
        if (callback) {
            callback(arr);
        }
    });
}
function fnLoadTreeHangXe(json_data) {
    $('#treeHangXe')
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: true },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "sort": function (a, b) {
            },
            "plugins": [
                "search", "checkbox", "sort"
            ]
        });
}
function fnLoadTreeHangMuc(json_data) {
    $('#treeHangMuc')
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: true },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "sort": function (a, b) {

            },
            "plugins": [
                "search", "checkbox", "sort"
            ]
        });
}
function fnLoadTreeMucDo(json_data) {
    $('#treeMucDo')
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": {
                "three_state": false
            },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "sort": function (a, b) {

            },
            "plugins": [
                "search", "checkbox", "sort"
            ]
        });
}
//Lấy data tree
function getDataTable() {
    var otArr = [];
    $("#tableNhapGiaGara tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("col-value")) {
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
//Show step
function showStep(step) {
    if (step === "tabThongTinChung") {
        _navThongTin.showTab(step);
    }
    if (step === "tabBaoGiaGara") {
        _navThongTin.showTab(step);
    }
    return;
}
//Xóa dòng dữ liệu giá gara
function xoaBaoGia(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dòng dữ liệu này không?", "", () => {
        $(el).parent().parent().remove();
    })
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _priceGaraService.layDanhSachCauHinh()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.cau_hinh = arrRes[1].data_info;

        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        _frmNhapGiaGara.getControl("gara").setDataSource(objDanhMuc.cau_hinh.gara, "ten_gara", "ma_gara", "Chọn gara", "");
    
        getPaging(1);
    });


    //Load hãng xe, hiệu xe, hạng mục, mức độ theo gara
    //_frmNhapGiaGara.getControl('gara').addEventChange(val => {
    //    (ESCS_MA_DOI_TAC_DUY_NHAT, val);
    //});

    //Thêm mới giá hợp tác
    $("#btnThemMoi").click(function () {
        showModal();
        showStep("tabThongTinChung");
        $('#treeHangXe').jstree("destroy").empty();
        $('#treeHangMuc').jstree("destroy").empty();
        $('#treeMucDo').jstree("destroy").empty();
        _frmNhapGiaGara.clearErrorMessage();
        _frmNhapGiaGara.resetForm();
        _frmNhapGiaGara.getControl('ngay_ad').setValue(dateNow);
        _frmNhapGiaGara.getControl('ma_doi_tac').setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        loadData(ESCS_MA_DOI_TAC_DUY_NHAT);
        ESUtil.genHTML("tableNhapGiaGara_template", "tableNhapGiaGara", { data: [] });
    });

    //Tìm kiếm hãng xe, hiệu xe, hạng mục, mức độ tổn thất
    $("#timKiemHangXe").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeHangXe").jstree('search', val);
        }, 500);

    });
    $("#timKiemHangMuc").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeHangMuc").jstree('search', val);
        }, 500);
    });
    $("#timKiemMucDo").keyup(function () {
        $("#treeMucDo").jstree('search', $(this).val());
    });

    //Thêm giá
    $('#btnThemGia').click(function () {
        var objData = _frmNhapGiaGara.getJsonData();
        if (objData.gara == '' || objData.gara == null && objData.gara == undefined) {
            _notifyService.error("Bạn chưa chọn gara");
            return;
        }
        if (objData.ngay_ad == '' || objData.ngay_ad == null && objData.ngay_ad == undefined) {
            _notifyService.error("Bạn chưa chọn ngày áp dụng");
            return;
        }
        var arrHangXeHieuXe = [];
        $.each($('#treeHangXe').jstree().get_selected(true), (it, value) => {
            if (value.parent == '#') {
                return;
            }
            var obj = {
                hang_xe: value.id.split('/')[0],
                hieu_xe: value.id.split('/')[1]
            }
            arrHangXeHieuXe.push(obj);
        });
        var arrHangMuc = $('#treeHangMuc').jstree().get_selected(true);
        var arrMucDoTT = $('#treeMucDo').jstree().get_selected(true);

        if (arrHangXeHieuXe.length <= 0) {
            _notifyService.error("Bạn chưa chọn hãng xe hiệu xe");
            return;
        }
        if (arrHangMuc.length <= 0) {
            _notifyService.error("Bạn chưa chọn hạng mục tổn thất");
            return;
        }
        var arr = [];
        for (let i = 0; i < arrHangXeHieuXe.length; i++) {
            for (let j = 0; j < arrHangMuc.length; j++) {
                for (let k = 0; k < arrMucDoTT.length; k++) {
                    let obj = {
                        hx: arrHangXeHieuXe[i],
                        hm: arrHangMuc[j],
                        mdtt: arrMucDoTT[k]
                    }
                    obj.ngay_ad = objData.ngay_ad;
                    arr.push(obj);
                }
            }
        }
        var objDetail = {
            ma_doi_tac: objData.ma_doi_tac,
            gara: objData.gara,
            ngay_ad: objData.ngay_ad
        }
        var arrData = [];
        _priceGaraService.getDetail(objDetail).then(res => {
            let arr1 = res.data_info.data;
            $.each(arr, (index1, item1) => {
                $.each(arr1, (index2, item2) => {
                    if (item1.ngay_ad == item2.ngay_ad && item1.hx.hang_xe == item2.hang_xe && item1.hx.hieu_xe == item2.hieu_xe && item1.hm.id == item2.hang_muc && item1.mdtt.id == item2.muc_do) {
                        var obj = {
                            hang_xe: item2.hang_xe,
                            hieu_xe: item2.hieu_xe,
                            hang_muc: item2.hang_muc,
                            ten_hang_muc: item2.ten_hang_muc,
                            ten_muc_do: item2.ten_muc_do,
                            muc_do: item2.muc_do,
                            tien_vtu: item2.tien_vtu,
                            tien_nhan_cong: item2.tien_nhan_cong,
                            tien_khac: item2.tien_khac
                        }
                        arrData.push(obj);
                        arr = arr.filter(n => n != item1);
                    }
                });
            });
            $.each(arr, (index, item) => {
                var obj1 = {
                    hang_xe: item.hx.hang_xe,
                    hieu_xe: item.hx.hieu_xe,
                    hang_muc: item.hm.id,
                    ten_hang_muc: item.hm.text,
                    ten_muc_do: item.mdtt.text,
                    muc_do: item.mdtt.id,
                    tien_vtu: 0,
                    tien_nhan_cong: 0,
                    tien_khac: 0
                }
                arrData.push(obj1);
            });
            ESUtil.genHTML("tableNhapGiaGara_template", "tableNhapGiaGara", { data: arrData });
            showStep("tabBaoGiaGara");
        });

    });

    $('#checkAllTienVTu').click(function () {
        if ($('#checkAllTienVTu').is(':checked')) {
            var tien_vtu = $('input[data-field = tien_vtu]:first-child').val();
            $('input[data-field="tien_vtu"]').val(tien_vtu);
        }
    });
    $('#checkAllTienNhanCong').click(function () {
        if ($('#checkAllTienNhanCong').is(':checked')) {
            var tien_nhan_cong = $('input[data-field = tien_nhan_cong]:first-child').val();
            $('input[data-field = tien_nhan_cong]').val(tien_nhan_cong);
        }
    });
    $('#checkAllTienKhac').click(function () {
        if ($('#checkAllTienKhac').is(':checked')) {
            var tien_khac = $('input[data-field = tien_khac]:first-child').val();
            $('input[data-field = tien_khac]').val(tien_khac);
        }
    });
    //Lưu thông tin giá hợp tác gara
    $('#btnLuuThongTinGiaGaraHopTac').click(function () {
        var objData = _frmNhapGiaGara.getJsonData();
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            gara: objData.gara,
            ngay_ad: objData.ngay_ad,
            data: getDataTable()
        };
        _priceGaraService.luuThongTinGiaGara(obj).then(res => {
            if (res.state_info.status === "OK") {
                getPaging(1);
                _notifyService.success("Lưu thông tin thành công");
                hideModal();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    //Xóa tất cả
    $('#btnXoa').click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa tất cả báo giá gara này không?", "", () => {
            var objData = _frmNhapGiaGara.getJsonData();
            var obj = {
                ma_doi_tac: objData.ma_doi_tac,
                gara: objData.gara,
                ngay_ad: objData.ngay_ad
            };
            _priceGaraService.delete(obj).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    _notifyService.success("Xóa báo giá gara thành công");
                    hideModal();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    //Quay lại
    $("#btnQuayLai").click(function () {
        showStep("tabThongTinChung");
    })

    //Export excel giá gara
    $("#btnExportExcel").click(function () {
        var obj = _frmNhapGiaGara.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_GIA_GARA";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res,
                obj.ma_mau_in +
                "_" +
                new Date().getFullYear() +
                new Date().getMonth() +
                new Date().getDay() +
                new Date().getHours() +
                new Date().getMinutes() +
                new Date().getSeconds() +
                new Date().getMilliseconds() +
                ".xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    //ImportExcel giá Gara
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });
    //UploadExcel giá Gara
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    //SaveExcel giá Gara
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _priceGaraService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công");
                _modalUploadExcel.hide();
                hideModal();
                getPaging(1);
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});
