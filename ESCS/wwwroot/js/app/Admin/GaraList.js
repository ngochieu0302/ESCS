var objDanhMuc = {};
var objDanhMucDonViHanhChinh = [];
var _frmLuuThongTinGara = new FormService("frmLuuThongTinGara");
var _notifyService = new NotifyService();
var _service = new Service();
var _garalistService = new GaraListService();
var _partnerListService = new PartnerListService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _carManufacturerListService = new CarManufacturerListService();
var _bankListService = new BankListService();
var _UploadExcelService = new UploadExcelService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _damageLevelService = new DamageLevelService();
var _hieuXeService = new HieuXeService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _frmTimKiem = new FormService("frmTimKiem");
var _frm_table_ton_that = new FormService("frm_table_ton_that");
var _frmNhapGiaGara = new FormService("frmNhapGiaGara");
var _modalNhapGara = new ModalService("modalNhapGara");
var _modalNhapBaoGia = new ModalService("modalNhapBaoGia");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var tinh_thanh;
var quan_huyen;
var objData = null;
var _data_Gara = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã Gara", width: "6%", align: "center", headerSort: false },
    { field: "ma_gara_dt", title: "Mã Gara hợp tác", width: "10%", align: "center", headerSort: false },
    { field: "ten", title: "Tên Gara", width: "25%", headerSort: false },
    { field: "ten_tat", title: "Tên tắt", width: "10%", headerSort: false },
    { field: "dia_chi", title: "Địa chỉ", width: "25%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "8%", align: "center", headerSort: false },
    { field: "ten_tinh_hthi", title: "Tỉnh thành", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_quan_hthi", title: "Quận huyện", width: "10%", hozAlign: "center", headerSort: false },
    { field: "chinh_hang_hthi", title: "Chính hãng", width: "10%", align: "center", headerSort: false },
    { field: "dien_thoai", title: "Điện thoại", width: "8%", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "lien_he", title: "Liên hệ", width: "10%", headerSort: false },
    { field: "tai_khoan", title: "Số tài khoản", width: "10%", align: "center", headerSort: false },
    { field: "thu_huong", title: "Đối tượng thụ hưởng", width: "20%", headerSort: false },
    { field: "ngan_hang", title: "Ngân hàng", width: "25%", headerSort: false },
    { field: "chi_nhanh", title: "Chi nhánh ngân hàng", width: "25%", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "12%", headerSort: false }
];

var _gridViewGara = new GridViewService("gridViewGara", configColumn, getPaging, rowClick);

//Phân trang
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _garalistService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewGara.setDataSource(res, trang);
    });
}
//Xem chi tiết thông tin Gara
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    $('#treeHangXe').jstree("destroy").empty();
    $('#treeHangMuc').jstree("destroy").empty();
    $('#treeMucDo').jstree("destroy").empty();
    $('#treeNamsx').jstree("destroy").empty();
    _garalistService.layThongTinChiTiet(data).then(res => {
        _data_Gara = res.data_info;
        var objDatact = res.data_info;
        _frmLuuThongTinGara.clearErrorMessage();
        _frmLuuThongTinGara.setData(objDatact);
        _frmLuuThongTinGara.getControl("ma").readOnly();
        _frmLuuThongTinGara.getControl("tinh_thanh").trigger("select2:select");
        _frmLuuThongTinGara.getControl("quan_huyen").setValue(objDatact.quan_huyen);
        _frmLuuThongTinGara.getControl("ngan_hang_ma").trigger("select2:select");
        _frmLuuThongTinGara.getControl("chi_nhanh_ma").setValue(objDatact.chi_nhanh_ma);
        _frmLuuThongTinGara.getControl("ket_noi_bg").trigger("select2:select");
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        if (objDatact.hang_xe != undefined && objDatact.hang_xe != null && objDatact.hang_xe != "") {
            var ds_hang_xe = objDatact.hang_xe.split(",");
            if (ds_hang_xe.length > 0) {
                _frmLuuThongTinGara.getControl("hang_xe_view").val(ds_hang_xe).trigger('change');
            }
        }
        $("#btnCauHinhGara").show();
        _modalNhapGara.show();
        row.select();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
// tree
function taoDuLieuTreeHangXe(ma_doi_tac, hang_xe, hieu_xe, callback = undefined) {
    var arr = [];
    var hang_xe_new = hang_xe.where(n => n.ma_doi_tac == ma_doi_tac);
    var hieu_xe_new = hieu_xe.where(n => n.ma_doi_tac == ma_doi_tac);
    _garalistService.getConfigGara({ ma_doi_tac: ma_doi_tac, ma_gara: _data_Gara.ma }).then(res => {
        for (var i = 0; i < hang_xe_new.length; i++) {
            var obj = {
                id: hang_xe_new[i].ma,
                parent: "#",
                text: hang_xe_new[i].ten,
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
        for (var i = 0; i < hieu_xe_new.length; i++) {
            var obj = {
                id: hieu_xe_new[i].hang_xe + "/" + hieu_xe_new[i].ma,
                parent: hieu_xe_new[i].hang_xe,
                text: hieu_xe_new[i].ten,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {}
            }
            for (var j = 0; j < res.data_info.hieu_xe.length; j++) {
                if (hieu_xe_new[i].ma == res.data_info.hieu_xe[j].ma_hieu_xe) {
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
function taoDuLieuTreeHangMuc(ma_doi_tac, hang_muc, callback = undefined) {
    var arr = [];
    var hang_muc_new = hang_muc.where(n => n.ma_doi_tac == ma_doi_tac);
    _garalistService.getConfigGara({ ma_doi_tac: ma_doi_tac, ma_gara: _data_Gara.ma }).then(res => {
        for (var i = 0; i < hang_muc_new.length; i++) {
            var obj = {
                id: hang_muc_new[i].ma,
                parent: "#",
                text: hang_muc_new[i].ten,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {}
            }
            for (var j = 0; j < res.data_info.hm.length; j++) {
                if (hang_muc_new[i].ma == res.data_info.hm[j].ma_hang_muc) {
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
function taoDuLieuTreeMucDo(ma_doi_tac, muc_do_ton_that, callback = undefined) {
    _garalistService.getConfigGara({ ma_doi_tac: ma_doi_tac, ma_gara: _data_Gara.ma }).then(res => {
        var arr = [];
        var muc_do_ton_that_new = muc_do_ton_that.where(n => n.ma_doi_tac == ma_doi_tac && n.nhom == "XE");
        for (var i = 0; i < muc_do_ton_that_new.length; i++) {
            var obj = {};
            if (muc_do_ton_that_new[i].ma_ct == null) {
                obj = {
                    id: muc_do_ton_that_new[i].ma,
                    parent: '#',
                    text: muc_do_ton_that_new[i].ten,
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
                    id: muc_do_ton_that_new[i].ma,
                    parent: muc_do_ton_that_new[i].ma_ct,
                    text: muc_do_ton_that_new[i].ten,
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
            for (var j = 0; j < res.data_info.mdtt.length; j++) {
                if (muc_do_ton_that_new[i].ma == res.data_info.mdtt[j].ma_muc_do_tt) {
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
            "plugins": [
                "search", "checkbox"
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
            "plugins": [
                "search", "checkbox"
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

$(document).ready(function () {
    //Lấy tất cả thông tin danh mục
    _service.all([
        _garalistService.layDsGara(),
        _partnerListService.layDsDoiTac(),
        _administrativeUnitsService.layDsTinhThanh(),
        _bankListService.layDsNganHang(),
        _carManufacturerListService.layDsHangXe(),
        _categoryvehicleListService.layDsHangMucXe(),
        _damageLevelService.layDsMucDoTonThat(),
        _hieuXeService.layDsHieuXe()
    ]).then(arrRes => {
        objDanhMuc.gara = arrRes[0];
        objDanhMuc.doi_tac = arrRes[1];
        objDanhMuc.donvihanhchinh = arrRes[2].data_info;
        objDanhMuc.ngan_hang = arrRes[3].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh = arrRes[3].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.hang_xe = arrRes[4].data_info.where(n => n.nv == 'XE');
        objDanhMuc.hang_muc = arrRes[5].data_info;
        objDanhMuc.muc_do = arrRes[6].data_info;
        objDanhMuc.hieu_xe = arrRes[7].data_info.where(n => n.nv == 'XE');
        tinh_thanh = objDanhMuc.donvihanhchinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
        quan_huyen = objDanhMuc.donvihanhchinh.where(n => n.ma_phuong.trim() === "" && n.ma_phuong.trim() === "");

        _frmTimKiem.getControl("ten").setDataSource(objDanhMuc.gara.data_info, "ten", "ma");

        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[1].data_info != null && arrRes[1].data_info.length == 1) ? arrRes[1].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinGara.getControl("ma_doi_tac").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        _frmTimKiem.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "")
        _frmTimKiem.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTimKiem.getControl("tinh_thanh").addEventChange(val => {
            var ds_quan_huyen = quan_huyen.where(n => n.ma_tinh === val);
            _frmTimKiem.getControl("quan_huyen").setDataSource(ds_quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });

        _frmLuuThongTinGara.getControl("hang_xe_view").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
        _frmLuuThongTinGara.getControl("tinh_thanh").setDataSource(tinh_thanh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
        _frmLuuThongTinGara.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmLuuThongTinGara.getControl("tinh_thanh").addEventChange(val => {
            var ds_quan_huyen = quan_huyen.where(n => n.ma_tinh === val);
            _frmLuuThongTinGara.getControl("quan_huyen").setDataSource(ds_quan_huyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        });
        _frmLuuThongTinGara.getControl("ngan_hang_ma").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmLuuThongTinGara.getControl("chi_nhanh_ma").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");

        _frmNhapGiaGara.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        getPaging(1);
    });
    _frmLuuThongTinGara.getControl("ngan_hang_ma").addEventChange(val => {
        _frmLuuThongTinGara.getControl("chi_nhanh_ma").setDataSource(objDanhMuc.chi_nhanh.where(n => n.ma_ct === val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmLuuThongTinGara.getControl("ket_noi_bg").addEventChange(val => {
        _frmLuuThongTinGara.getControl("tk_bgia").readOnly(false);
        _frmLuuThongTinGara.getControl("mk_bgia").readOnly(false);
        if (val=="K") {
            _frmLuuThongTinGara.getControl("tk_bgia").readOnly();
            _frmLuuThongTinGara.getControl("mk_bgia").readOnly();
        }
    });
    _frmLuuThongTinGara.getControl("hang_xe_view").on('change',
        function (e) {
            var val = $(this).val();
            var hang_xe = "";
            if (val.length > 0) {
                for (var i = 0; i < val.length; i++) {
                    if (i == 0) {
                        hang_xe = val[i];
                    } else {
                        hang_xe += "," + val[i];
                    }
                }
            }
            _frmLuuThongTinGara.getControl("hang_xe").val(hang_xe);
        });
    //Nhập thông tin Gara
    $("#btnNhapThongTinGara").click(function () {
        _frmLuuThongTinGara.resetForm();
        _frmLuuThongTinGara.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinGara.getControl("trang_thai").setValue(1);
        _frmLuuThongTinGara.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinGara.getControl("ma").readOnly(false);
        _frmLuuThongTinGara.getControl("chi_nhanh_ma").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");

        _frmLuuThongTinGara.getControl("ket_noi_bg").setValue("K");
        _frmLuuThongTinGara.getControl("tk_bgia").readOnly();
        _frmLuuThongTinGara.getControl("mk_bgia").readOnly();
        $("#modal-user-log").html("");
        _frmLuuThongTinGara.clearErrorMessage();
        $("#btnCauHinhGara").hide();
        _modalNhapGara.show();
    });
    //Lưu thông tin Gara
    $("#btnLuuThongTinGara").click(function () {
        if (_frmLuuThongTinGara.isValid()) {
            var formData = _frmLuuThongTinGara.getJsonData();
            _garalistService.luuGara(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin gara thành công.");
                    getPaging(1);
                    _modalNhapGara.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    //Xóa thông tin gara
    $("#btnXoaThongTinGara").click(function () {
        var formData = _frmLuuThongTinGara.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin gara này không?", "", val => {
            _garalistService.xoaGara(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công.");
                    getPaging(1);
                    _modalNhapGara.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    //ExportExcel Gara
    $("#btnExportExcelGaraList").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_GARA";
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
    //Màn hình tìm kiếm thông tin Gara
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    //ImportExcel Gara
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });
    //UploadExcel Gara
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    //SaveExcel Gara
    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _garalistService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $("#btnCauHinhGara").click(function () {
        _modalNhapGara.hide();
        $("#inside-modal").esmodal("show");
        _frmLuuThongTinGara.getControl("ma_doi_tac").readOnly();
        taoDuLieuTreeHangXe(ESCS_MA_DOI_TAC_DUY_NHAT,
            objDanhMuc.hang_xe,
            objDanhMuc.hieu_xe,
            arr => {
                fnLoadTreeHangXe(arr);
            });
        taoDuLieuTreeHangMuc(ESCS_MA_DOI_TAC_DUY_NHAT,
            objDanhMuc.hang_muc,
            arr => {
                fnLoadTreeHangMuc(arr);
            });
        taoDuLieuTreeMucDo(ESCS_MA_DOI_TAC_DUY_NHAT, objDanhMuc.muc_do, arr => {
            fnLoadTreeMucDo(arr);
        });
    });

    $("#btnSaveCauHinhXe").click(function () {
        _notifyService.error("123");
    });

    $("#btnClose").click(function () {
        $("#inside-modal").esmodal("hide");
        _modalNhapGara.show();
    });

    $('#image_fullsreen').on('click', function () {
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        } else {
            $('#inside-modal').fullscreen();
        }
    });

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
    $('#btnLuu').click(function () {
        var arrHangXeHieuXe = [];
        $.each($('#treeHangXe').jstree().get_selected(true), (it, value) => {
            if (value.parent == '#') {
                return;
            }
            var obj = {
                ma_hang_xe: value.id.split('/')[0],
                ma_hieu_xe: value.id.split('/')[1]
            }
            arrHangXeHieuXe.push(obj);
        });
        var arrHangMuc = [];
        $.each($('#treeHangMuc').jstree().get_selected(true), (it, value) => {
            var obj = {
                ma_hang_muc: value.id
            }
            arrHangMuc.push(obj);
        });

        var arrMucDoTT = [];
        $.each($('#treeMucDo').jstree().get_selected(true), (it, value) => {
            var obj = {
                ma_muc_do_tt: value.id,
                ma_mdtt_ct: value.parent == "#" ? null : value.parent
            }
            arrMucDoTT.push(obj);
        });

        var objData_gara = {
            ma_doi_tac: _data_Gara.ma_doi_tac,
            ma_gara: _data_Gara.ma,
            data_hx: arrHangXeHieuXe,
            data_hm: arrHangMuc,
            data_mdtt: arrMucDoTT
        }
        
        _garalistService.saveConfigGara(objData_gara).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu cài đặt gara thành công");
                getPaging(1);
                $("#inside-modal").esmodal("hide");
                _modalNhapGara.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
})