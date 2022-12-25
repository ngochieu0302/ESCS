var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _configEmailService = new ConfigEmailService();
var _accountEmailService = new AccountEmailService();

var _modalNhapMauMail = new ModalService("modalNhapMauMail");
var _modalDoiTacQL = new ModalDragService("modalDoiTacQL", undefined, "top");
var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinMauMail = new FormService("frmLuuThongTinMauMail");

const GRID_HO_SO_SO_DONG = 14;

var arrPm = [
    { ma: "GD", ten: "Giám định", nv: "XE" },
    { ma: "BT", ten: "Bồi thường", nv: "XE" },
    { ma: "BH", ten: "Hợp đồng", nv: "XE" },

    { ma: "GD", ten: "Giám định", nv: "XE_MAY" },
    { ma: "BT", ten: "Bồi thường", nv: "XE_MAY" },
    { ma: "BH", ten: "Hợp đồng", nv: "XE_MAY" },

    { ma: "TN", ten: "Tiếp nhận bồi thường", nv: "NG" },
    { ma: "BL", ten: "Bảo lãnh", nv: "NG" },
    { ma: "TT", ten: "Tính toán bồi thường", nv: "NG" },
    { ma: "BH", ten: "Hợp đồng con người", nv: "NG" },
];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "ma", title: "Mã", width: "15%", headerSort: false },
    { field: "url", title: "Url", width: "30%", headerSort: false },
    { field: "action", title: "Action api", hozAlign: "center", width: "10%", headerSort: false },
    { field: "pm_hthi", title: "Phần mềm", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ap_dung_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewMauMail = new GridViewService("gridViewMauMail", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configEmailService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewMauMail.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewMauMail.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewMauMail.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _configEmailService.layThongTinChiTiet(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info.mail_lke_ct_cau_hinh;
        var ds_doi_tac_ql_gui_mail = res.data_info.doi_tac_ql;
        _frmLuuThongTinMauMail.clearErrorMessage();
        _frmLuuThongTinMauMail.setData(objDatact);
        _frmLuuThongTinMauMail.getControl("nv").trigger("select2:select");
        _frmLuuThongTinMauMail.getControl("pm").setValue(objDatact.pm);
        _frmLuuThongTinMauMail.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinMauMail.getControl("ma").readOnly();
        ESUtil.genHTML("bodyDanhSachDoiTacQLTemplate", "bodyDanhSachDoiTacQL", { data: ds_doi_tac_ql_gui_mail });
        _modalNhapMauMail.show();
    });
}

function getDataTable() {
    var otArr = [];
    $("#bodyDanhSachDoiTacQL tr.bodyDanhSachDoiTacQLItem").each(function (e) {
        var json = {};
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).val();
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function getDataTableChecked() {
    var arr_chon = [];
    $("#modalDoiTacQLDanhSach .modalChonDoiTacQLItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma_doi_tac_ql: '',
                ten_doi_tac_ql: '',
                email_gui: ''
            };
            var val = $(this).val();
            var doi_tac_ql = objDanhMuc.doi_tac.data_info.where(n => n.ma == val).firstOrDefault();
            obj.ma_doi_tac_ql = doi_tac_ql.ma;
            obj.ten_doi_tac_ql = doi_tac_ql.ten;
            arr_chon.push(obj);
        }
    });
    return arr_chon;
}
function arrayToList(array) {
    let list = null;
    for (let i = array.length - 1; i >= 0; i--) {
        list = { value: array[i], rest: list };
    }
    return list;
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _accountEmailService.layTatCaTaiKhoan()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.tai_khoan = arrRes[1].data_info;
        objDanhMuc.tai_khoan_mac_dinh = "";
        if (objDanhMuc.tai_khoan != undefined && objDanhMuc.tai_khoan != null) {
            var tk = objDanhMuc.tai_khoan.where(n => n.mac_dinh == 1).firstOrDefault();
            if (tk != null) {
                objDanhMuc.tai_khoan_mac_dinh = tk.tai_khoan;
            }
        }
        _frmLuuThongTinMauMail.getControl("pm").setDataSource([], "ten", "ma", "Chọn phần mềm", "");
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMauMail.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMauMail.getControl("tai_khoan_gui").setDataSource(objDanhMuc.tai_khoan, "tai_khoan", "tai_khoan", "Chọn tài khoản gửi", "");
        ESUtil.genHTML("modalDoiTacQLDanhSachTemplate", "modalDoiTacQLDanhSach", { danh_sach: arrRes[0].data_info });
        getPaging(1);
    });
    _frmLuuThongTinMauMail.getControl('nv').addEventChange(val => {
        var arr = arrPm.where(n => n.nv == val);
        _frmLuuThongTinMauMail.getControl("pm").setDataSource(arr, "ten", "ma", "Chọn phần mềm", "");
    });
    $("#btnAddMauMail").click(function () {
        _frmLuuThongTinMauMail.resetForm();
        _frmLuuThongTinMauMail.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinMauMail.getControl("ap_dung").setValue(1);
        _frmLuuThongTinMauMail.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinMauMail.getControl("ma").readOnly(false);
        _frmLuuThongTinMauMail.getControl("tai_khoan_gui").setValue(objDanhMuc.tai_khoan_mac_dinh);
        _frmLuuThongTinMauMail.clearErrorMessage();
        ESUtil.genHTML("bodyDanhSachDoiTacQLTemplate", "bodyDanhSachDoiTacQL", { data: [] });
        _modalNhapMauMail.show();
    });
    $("#btnLuuThongTinMauMail").click(function () {
        if (_frmLuuThongTinMauMail.isValid()) {
            var formData = _frmLuuThongTinMauMail.getFormFileData();
            var arr_data = getDataTable();
            formData.append("arr", JSON.stringify(arr_data));
            _configEmailService.SaveEmailCH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin email thành công.");
                    getPaging(1);
                    _modalNhapMauMail.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#themDoiTacQL').click(function () {
        var arr = getDataTable();
        $("#modalDoiTacQLDanhSach .dsdtql").removeClass("d-none");
        $("#inputSearch_DoiTacQL").focus();
        $("#inputSearch_DoiTacQL").val("");
        $("#modalDoiTacQLDanhSach .modalChonDoiTacQLItem").prop("checked", false);
        for (var i = 0; i < arr.length; i++) {
            $("#modalDoiTacQLDanhSach .modalChonDoiTacQLItem[value='" + arr[i].ma_doi_tac_ql + "']").prop("checked", true);
        }
        _modalDoiTacQL.show();
    });
    $('#btnChonDoiTacQL').click(function () {
        //Lấy dữ liệu table
        var arr_table = getDataTable();
        //Danh sách đã chọn
        var arr_chon = getDataTableChecked();
        var arr_tong_hop = [];
        for (var i = 0; i < arr_chon.length; i++) {
            var doi_tac_ql = arr_table.where(n => n.ma_doi_tac_ql == arr_chon[i].ma_doi_tac_ql).firstOrDefault();

            if (doi_tac_ql != null) {
                arr_tong_hop.push(doi_tac_ql);
            }
            else {
                arr_tong_hop.push(arr_chon[i]);
            }
        }
        console.log(arr_tong_hop);
        ESUtil.genHTML("bodyDanhSachDoiTacQLTemplate", "bodyDanhSachDoiTacQL", { data: arr_tong_hop }, () => {
            xoaEmailDoiTacQL = function (el) {
                _notifyService.confirm("Bạn có chắc muốn xóa dòng này không?", "", () => {
                    $(el).closest('tr.bodyDanhSachDoiTacQLItem').remove();
                });
            }
        });
        _modalDoiTacQL.hide();
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
})