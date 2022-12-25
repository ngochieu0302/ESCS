var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _printedService = new PrintedService();
var _titleService = new TitleService();

var _modalNhapMauIn = new ModalService("modalNhapMauIn");
var _modalCauHinhMauIn = new ModalService("modalCauHinhMauIn");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveMauIn = new FormService("frmSaveMauIn");
var _frmSaveCauHinhMauIn = new FormService("frmSaveCauHinhMauIn");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 14;

var arrPm = [
    { ma: "GD", ten: "Giám định", nv: "XE", loai: "WORD" },
    { ma: "BH", ten: "Hợp đồng", nv: "XE", loai: "WORD"},
    { ma: "BT", ten: "Bồi thường", nv: "XE", loai: "WORD" },

    { ma: "GD", ten: "Giám định", nv: "XE_MAY", loai: "WORD" },
    { ma: "BH", ten: "Hợp đồng", nv: "XE_MAY", loai: "WORD" },
    { ma: "BT", ten: "Bồi thường", nv: "XE_MAY", loai: "WORD" },

    { ma: "TN", ten: "Tiếp nhận", nv: "NG", loai: "WORD"},
    { ma: "BL", ten: "Bảo lãnh", nv: "NG", loai: "WORD" },
    { ma: "TT", ten: "Tính toán", nv: "NG", loai: "WORD"},
    { ma: "BC_XE", ten: "Báo cáo xe ô tô", nv: "XE", loai: "EXCEL" },
    { ma: "BC_XM", ten: "Báo cáo xe máy", nv: "XE_MAY", loai: "EXCEL" },
    { ma: "BC_NG", ten: "Báo cáo con người", nv: "NG", loai: "EXCEL" },
];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "ma", title: "Mã", width: "15%", headerSort: false },
    { field: "url_file", title: "Url file", width: "25%", headerSort: false },
    { field: "ma_action_api", title: "Mã action api", width: "15%", headerSort: false },
    { field: "loai", title: "Loại", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "pm_hthi", title: "Phần mềm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_ht_hthi", title: "Ngày", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewMauIn = new GridViewService("gridViewMauIn", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _printedService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewMauIn.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewMauIn.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewMauIn.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _printedService.xemChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmSaveMauIn.clearErrorMessage();
        _frmSaveMauIn.setData(objDatact);
        _frmSaveMauIn.getControl("nv").trigger("select2:select");
        _frmSaveMauIn.getControl("pm").setValue(objDatact.pm);
        _frmSaveMauIn.getControl("ma_doi_tac").readOnly();
        _frmSaveMauIn.getControl("ma").readOnly();
        _modalNhapMauIn.show();
        $("#btnCauHinhMauIn").show();
    });
}
function getPagingCauHinh(trang, callback = undefined) {
    var objTKiem = _frmSaveCauHinhMauIn.getJsonData();
    objTKiem.trang = trang;
    objTKiem.so_dong = 4;
    _printedService.lietKeDanhSachCauHinh(objTKiem).then(res => {
        var data = res.data_info.data;
        ESUtil.genHTML("tblDanhSachCauHinhMauIn_template", "tblDanhSachCauHinhMauIn", { data: data });
        $("#tblDanhSachCauHinhMauIn_pagination").html(ESUtil.pagingHTML("getPagingCauHinh", objTKiem.trang, res.data_info.tong_so_dong, objTKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function loadDataFormCauHinh() {
    _frmSaveCauHinhMauIn.resetForm();
    _frmSaveCauHinhMauIn.clearErrorMessage();
    var ma_mau_in = _frmSaveMauIn.getControl("ma").getValue();
    _frmSaveCauHinhMauIn.getControl("ma_mau_in").setValue(ma_mau_in);
    _frmSaveCauHinhMauIn.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
    _frmSaveCauHinhMauIn.getControl("loai").setValue("NK");
    $("#modalCauHinhMauInNhap").show();
    $("#modalCauHinhMauInLietKe").hide();
}
function suaNoiDungCauHinh(ma_doi_tac, bt, ma_mau_in, ma_chuc_danh, ten_hthi_ky, stt, loai) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        bt: bt,
        ma_mau_in: ma_mau_in,
        ma_chuc_danh: ma_chuc_danh,
        ten_hthi_ky: ten_hthi_ky,
        stt: stt,
        loai: loai
    }
    _frmSaveCauHinhMauIn.resetForm();
    _frmSaveCauHinhMauIn.clearErrorMessage();
    _frmSaveCauHinhMauIn.setData(obj);
    //_frmSaveCauHinhMauIn.getControl("ma_chuc_danh").setValue(ma_chuc_danh);
    //_frmSaveCauHinhMauIn.getControl("ma_chuc_danh").trigger("select2:select");
    _frmSaveCauHinhMauIn.getControl("ten_hthi_ky").setValue(ten_hthi_ky);
    $("#modalCauHinhMauInLietKe").hide();
    $("#modalCauHinhMauInNhap").show();
    $("#btnXoaCauHinhMauIn").show();
}
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _titleService.layDsChucDanh()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.chuc_danh = arrRes[1].data_info.chuc_danh;
        _frmSaveMauIn.getControl("pm").setDataSource([], "ten", "ma", "Chọn nhóm hiển thị", "");
        _frmTimKiem.getControl("pm").setDataSource([], "ten", "ma", "Chọn nhóm hiển thị", "");
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveMauIn.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveMauIn.getControl("ma_doi_tac_ql").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", "");
/*        _frmSaveCauHinhMauIn.getControl("ma_chuc_danh").setDataSource(objDanhMuc.chuc_danh, "ten", "ma", "Chọn chức danh", "");*/
        getPaging(1);
    });
    _frmTimKiem.getControl('nv').addEventChange(val => {
        var arr = arrPm.where(n => n.nv == val);
        _frmTimKiem.getControl("pm").setDataSource(arr, "ten", "ma", "Chọn nhóm hiển thị", "");
    });

    _frmSaveMauIn.getControl('nv').addEventChange(val => {
        var loai = _frmSaveMauIn.getControl('loai').val();
        var arr = arrPm.where(n => n.nv == val && n.loai == loai);
        _frmSaveMauIn.getControl("pm").setDataSource(arr, "ten", "ma", "Chọn nhóm hiển thị", "");
    });
    _frmSaveMauIn.getControl('loai').addEventChange(val => {
        var nv = _frmSaveMauIn.getControl('nv').val();
        var arr = arrPm.where(n => n.nv == nv && n.loai == val);
        _frmSaveMauIn.getControl("pm").setDataSource(arr, "ten", "ma", "Chọn nhóm hiển thị", "");
    });

    //_frmSaveCauHinhMauIn.getControl("ma_chuc_danh").addEventChange(val => {
    //    var chuc_danh = objDanhMuc.chuc_danh.where(n => n.ma == val).firstOrDefault();
    //    if (chuc_danh == null || chuc_danh == undefined || chuc_danh == "") {
    //        _frmSaveCauHinhMauIn.getControl("ten_hthi_ky").setValue("");
    //    } else {
    //        _frmSaveCauHinhMauIn.getControl("ten_hthi_ky").setValue(chuc_danh.ten);
    //    }
    //});

    $("#btnAddMauIn").click(function () {
        _frmSaveMauIn.resetForm();
        _frmSaveMauIn.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveMauIn.getControl("ma_doi_tac").readOnly(false);
        _frmSaveMauIn.getControl("ma").readOnly(false);
        _frmSaveMauIn.clearErrorMessage();
        _frmSaveMauIn.getControl("trang_thai").setValue("1");
        $("#btnCauHinhMauIn").hide();
        _modalNhapMauIn.show();
    });
    $("#btnLuuThongTinMauIn").click(function () {
        if (!_frmSaveMauIn.isValid()) {
            return;
        }
        var formData = _frmSaveMauIn.getFormFileData();
        _printedService.save(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công.");
                getPaging(1);
                _modalNhapMauIn.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $("#btnCauHinhMauIn").click(function () {
        _modalCauHinhMauIn.show();
        loadDataFormCauHinh();
        $("#btnXemDanhSachCauHinh").trigger("click");
        $("#btnXoaCauHinhMauIn").hide();
    });

    $("#btnXemDanhSachCauHinh").click(function () {
        getPagingCauHinh(1);
        $("#modalCauHinhMauInNhap").hide();
        $("#modalCauHinhMauInLietKe").show();
    });

    $("#btnManHinhThemMoi").click(function () {
        loadDataFormCauHinh();
        $("#btnXoaCauHinhMauIn").hide();
    });

    $("#btnLuuCauHinhMauIn").click(function () {
        if (!_frmSaveCauHinhMauIn.isValid()) {
            return;
        }
        var formData = _frmSaveCauHinhMauIn.getJsonData();
        _printedService.luuThongTinCauHinh(formData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
                getPagingCauHinh(1);
                $("#modalCauHinhMauInNhap").hide();
                $("#modalCauHinhMauInLietKe").show();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $("#btnXoaCauHinhMauIn").click(function () {
        var formData = _frmSaveCauHinhMauIn.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _printedService.xoaThongTinCauHinh(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getPagingCauHinh(1);
                    $("#modalCauHinhMauInNhap").hide();
                    $("#modalCauHinhMauInLietKe").show();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
})