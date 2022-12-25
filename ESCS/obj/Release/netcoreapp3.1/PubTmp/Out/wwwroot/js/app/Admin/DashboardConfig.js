var objDanhMuc = {};
var _frmSaveConfig = new FormService("frmSaveConfig");
var _notifyService = new NotifyService();
var _service = new Service();
var _partnerListService = new PartnerListService();
var _userManagementService = new UserManagementService();
var _dashboardConfigSevice = new DashboardConfigService();
//var _modalBtnHien = new ModalDragService("modalBtnHien", undefined, "top");
var dashboardList = [
    {
        ten: "Dashboard xe",
        ma: "dashboard_xe"
    },
    {
        ten: "Dashboard con người",
        ma: "dashboard_ng"
    },
    {
        ten: "Dashboard TTGQ",
        ma: "dashboard_ttgq"
    }
];

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapConfig = new ModalService("modalNhapConfig");
var _modalNguoiSuDung = new ModalDragService("modalNguoiSuDung", undefined, "right");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var GRID_HO_SO_SO_DONG = 14;
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac_ten", title: "Đối tác", width: "20%", hozAlign: "center", headerSort: false },
    { field: "nsd_cai_dat_ten", title: "Người dùng", width: "20%", hozAlign: "center", headerSort: false },
    { field: "btn_hien_ten", title: "Button hiển thị", width: "20%", hozAlign: "center", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", width: "20%", hozAlign: "center", headerSort: false },
    { field: "ngay", title: "Ngày", width: "15%", hozAlign: "center", headerSort: false },
];
var _gridViewConfig = new GridViewService("gridViewConfig", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _dashboardConfigSevice.getpaging(objTimKiem).then(res => {
        _gridViewConfig.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewConfig.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewConfig.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    ESUtil.genHTML("tbDsCauHinhTemplate", "tbDsCauHinh", { danh_sach: [] });

    _dashboardConfigSevice.layThongTinCauHinhDashBoard(data).then(res => {
        var objDatact = res.data_info;
        _frmSaveConfig.clearErrorMessage();
        _frmSaveConfig.setData(objDatact[0]);
        var mdt = _frmSaveConfig.getControl("ma_doi_tac").val();
        if (mdt != null && mdt != null) {
            genNSD(mdt, objDanhMuc.nsd);
            ESUtil.genHTML("tbDsCauHinhTemplate", "tbDsCauHinh", { danh_sach: objDatact });
        }
        _modalNhapConfig.show();
        row.select();
        _frmSaveConfig.getControl("ma_doi_tac").readOnly();
    });
};
function bindMaDoiTac_NSD(objMDT, objNSD) {
    ESCS_MA_DOI_TAC_DUY_NHAT = (objMDT != null && objMDT.length == 1) ? objMDT[0].ma : "";

    _frmTimKiem.getControl("ma_doi_tac").setDataSource(objMDT, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    _frmTimKiem.getControl("nsd_cai_dat").setDataSource([], "ten", "ma", "Chọn người dùng", "");
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrNSD = objNSD.where(n => n.ma_doi_tac.trim() === val);
        _frmTimKiem.getControl("nsd_cai_dat").setDataSource(arrNSD, "ten", "ma", "Chọn người dùng", "");
        _frmTimKiem.getControl("nsd_cai_dat").setValue("");
    });

    _frmSaveConfig.getControl("ma_doi_tac").setDataSource(objMDT, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    _frmSaveConfig.getControl("ma_doi_tac").addEventChange(val => {
        genNSD(val, objNSD);
    });
}
function genNSD(ma_doi_tac, objNSD) {
    var arrNSD = objNSD.where(n => n.ma_doi_tac.trim() === ma_doi_tac);
    ESUtil.genHTML("modalNguoiSuDungDanhSachTemplate", "modalNguoiSuDungDanhSach", { danh_sach: arrNSD });
}

function chonNguoiSuDung(el) {
    var arr = getTableNSD();
    $("#modalNguoiSuDungDanhSach .dsnsd").removeClass("d-none");
    $("#inputSearch_NguoiSuDung").focus();
    $("#inputSearch_NguoiSuDung").val("");
    $("#modalNguoiSuDungDanhSach .modalChonNguoiSuDungItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalNguoiSuDungDanhSach .modalChonNguoiSuDungItem[value='" + arr[i].ma + "']").prop("checked", true);
    }
    _modalNguoiSuDung.show(el);
}
function getTableNSD() {
    var otArr = [];
    $("#tbDsCauHinh tr.DsCauHinhItem").each(function (e) {
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-name");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function getCheckedNSD() {
    var arr_chon = [];
    
    $("#modalNguoiSuDungDanhSach .modalChonNguoiSuDungItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma: "",
                ten: "",
                xe: 0,
                ng: 0,
                ttgq: 0
            };
            var ma = $(this).val();
            var ten = $(this).data("ten");

            obj.ma = ma;
            obj.ten = ten;

            arr_chon.push(obj);
        }
    });
    
    return arr_chon;
}
function xoaNSD(el) {
    _notifyService.confirm("Bạn có chắc muốn xóa cấu hình này không?", "", () => {
        $(el).parent().parent().remove();
    });
}
$("#btnChonNguoiSuDung").click(function () {
    var arr_chon = getCheckedNSD();
    ESUtil.genHTML("tbDsCauHinhTemplate", "tbDsCauHinh", { danh_sach: arr_chon });
    _modalNguoiSuDung.hide();
});

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _userManagementService.layDsNSD({ ma_doi_tac: ESCS_MA_DOI_TAC }),
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.nsd = arrRes[1].data_info;
        bindMaDoiTac_NSD(objDanhMuc.doi_tac, objDanhMuc.nsd);

        ESUtil.genHTML("tbDsCauHinhTemplate", "tbDsCauHinh", { danh_sach: [] });
    });

    _frmTimKiem.getControl("btn_hien").setDataSource(dashboardList, "ten", "ma", "Chọn Dashboard", "");
    _frmSaveConfig.getControl("btn_hien").setDataSource(dashboardList, "ten", "ma", "Chọn Dashboard", "");

    //Nhập thông tin config
    $("#btnNhapConfig").click(function () {
        _frmSaveConfig.resetForm();
        _frmSaveConfig.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        var arrNSD = objDanhMuc.nsd.where(n => n.ma_doi_tac.trim() === ESCS_MA_DOI_TAC);
        genNSD(ESCS_MA_DOI_TAC, arrNSD);
        ESUtil.genHTML("tbDsCauHinhTemplate", "tbDsCauHinh", { danh_sach: [] });
        _frmSaveConfig.clearErrorMessage();
        _frmSaveConfig.getControl("ma_doi_tac").readOnly(false);
        _modalNhapConfig.show();
    });
    //Lưu thông tin config
    $("#btnLuuThongTinConfig").click(function () {
        if (_frmSaveConfig.isValid()) {
            var formData = _frmSaveConfig.getJsonData();
            formData.tbl = getTableNSD();
            _dashboardConfigSevice.luuThongTinCauHinhDashboard(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin cấu hình thành công.");
                    getPaging(1);
                    _modalNhapConfig.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Xóa thông tin dịch vụ
    $("#btnXoaThongTinConfig").click(function () {
        var formData = _frmSaveConfig.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình này không?", "", val => {
            _dashboardConfigSevice.xoaThongTinCauHinhDashboard(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin cấu hình thành công.");
                    getPaging(1);
                    _modalNhapConfig.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });


    $("#inputSearch_NguoiSuDung").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalNguoiSuDungDanhSach .dsnsd").removeClass("d-none");
            return;
        }
        $("#modalNguoiSuDungDanhSach .dsnsd").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.nsd.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalNguoiSuDungDanhSach #dsnsd_" + ESUtil.xoaKhoangTrangText(source[i].ma)).removeClass("d-none");
            }
        }
    }, 300));

    //Màn hình tìm kiếm
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });

    getPaging(1);
});