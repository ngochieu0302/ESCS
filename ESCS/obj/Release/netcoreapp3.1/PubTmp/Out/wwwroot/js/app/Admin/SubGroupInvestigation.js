var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _userManagementService = new UserManagementService();
var _subGroupInvestigationService = new SubGroupInvestigationService();

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_CHI_NHANH = $("#escs_ma_chi_nhanh").val();

var _frmTimKiemNhomGD = new FormService("frmTimKiemNhomGD");
var _frmSearchNhomGD = new FormService("frmSearchNhomGD");
var _frmNhomGD = new FormService("frmNhomGD");
var _modalNhomGD = new ModalService("modalNhomGD");

const GRID_HO_SO_SO_DONG = 14;
var arrCanBo = [];
var arrTruongNhom = [];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_nhom", title: "Tên nhóm", width: "20%", headerSort: false },
    { field: "ten_cnhanh", title: "Chi nhánh", width: "15%", align: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", align: "center", width: "10%", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", align: "center", width: "10%", headerSort: false },
    { field: "stt", title: "Thứ tự hiển thị", align: "center", width: "10%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "27%", hozAlign: "center", headerSort: false }
];
var _gridViewNhomGD = new GridViewService("gridViewNhomGD", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiemNhomGD.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _subGroupInvestigationService.getPaging(objTimKiem).then(res => {
        _gridViewNhomGD.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewNhomGD.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewNhomGD.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.ma_doi_tac == undefined || data.ma_doi_tac == null || data.ma_doi_tac == "") {
        return;
    }
    _subGroupInvestigationService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        arrCanBo = res.data_info.phan_cong_gd.sort((a, b) => a.truong_nhom - b.truong_nhom);
        var _dataTTChung = res.data_info.tt_nhom.firstOrDefault();
        _frmNhomGD.clearErrorMessage();
        _frmSearchNhomGD.resetForm();
        _frmSearchNhomGD.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmNhomGD.getControl("ma_chi_nhanh").readOnly();
        _frmNhomGD.getControl("nv").readOnly();
        $("#btnXoaNhomGD").show();
        _frmNhomGD.setData(_dataTTChung);
        getPagingDSCanBo(1, arrCanBo => {
            _modalNhomGD.show();
        });
    });
};
function getPagingDSCanBo(trang, callback = undefined) {
    var objTKiem = _frmSearchNhomGD.getJsonData();
    objTKiem.trang = trang;
    objTKiem.so_dong = 8;
    _subGroupInvestigationService.tKiemCanBo(objTKiem).then(res => {
        var dataNSD = res.data_info.data;
        ESUtil.genHTML("tblNhomGD_template", "tblNhomGD", { data: dataNSD }, () => {
            $("#txtDanhSachCanBo").html(arrCanBo.length);
            if (arrCanBo != undefined && arrCanBo != null && arrCanBo.length > 0) {
                for (var i = 0; i < arrCanBo.length; i++) {
                    $("#tblNhomGD tr.divItemDsCanBo input[data-field='nsd'][data-val='" + arrCanBo[i].nsd + "']").prop("checked", true);
                    $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + arrCanBo[i].nsd + "']").removeAttr("disabled");
                    $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + arrCanBo[i].nsd + "']").val(arrCanBo[i].truong_nhom);
                }
            }
        });
        $("#tblNhomGD_pagination").html(ESUtil.pagingHTML("getPagingDSCanBo", objTKiem.trang, res.data_info.tong_so_dong, objTKiem.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function chonCanBo(el) {
    var nsd = $(el).attr("data-val");
    var dsCanBo = getDataTableCanBo();
    var cb = dsCanBo.where(n => n.nsd == nsd).firstOrDefault();
    var count = arrCanBo.where(n => n.nsd == nsd).length;
    if ($(el).is(":checked") && count <= 0) {
        cb.checked = true;
        $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + nsd + "']").removeAttr("disabled");
        $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + nsd + "']").val(0);
        arrCanBo.push(cb);
    } else {
        $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + nsd + "']").attr("disabled", "disabled");
        $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + nsd + "']").prop("checked", false);
        $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + nsd + "']").val("");
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrCanBo = arrCanBo.removeItem(n => n.nsd == nsd);
    }
    $("#txtDanhSachCanBo").html(arrCanBo.length);
}
function chonTruongNhom(el) {
    var obj = {
        ma_doi_tac: $(el).attr('data-ma-doi-tac'),
        nsd: $(el).attr('data-nsd'),
        truong_nhom: $(el).val()
    }
    if (parseInt(obj.truong_nhom) > 3) {
        $(el).val(3);
    }
    arrTruongNhom = arrTruongNhom.removeItem(n => n.nsd == obj.nsd);
    arrTruongNhom.push(obj);
    $.each(arrCanBo, function (index, item) {
        $.each(arrTruongNhom, function (index1, item1) {
            if (item.ma_doi_tac == item1.ma_doi_tac && item.nsd == item1.nsd) {
                item.truong_nhom = item1.truong_nhom;
            }
        });
    });
}
function getDataTableCanBo() {
    var otArr = [];
    $("#tblNhomGD tr.divItemDsCanBo").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
                if (name == "nsd") {
                    json["chon"] = $(this).is(":checked");
                    json["nsd"] = json[name];
                }
                if (name == "truong_nhom") {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function xemDanhSachCanBo() {
    if (arrCanBo == undefined || arrCanBo == null || arrCanBo.length <= 0) {
        _notifyService.error("Chưa có cán bộ nào được chọn");
        return;
    }
    ESUtil.genHTML("tblNhomGD_template", "tblNhomGD", { data: arrCanBo }, () => {
        for (var i = 0; i < arrCanBo.length; i++) {
            if (arrCanBo[i].truong_nhom == null || arrCanBo[i].truong_nhom == "") {
                $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + arrCanBo[i].nsd + "']").val(0);
            }
            $("#tblNhomGD tr.divItemDsCanBo input[data-field='nsd'][data-val='" + arrCanBo[i].nsd + "']").prop("checked", true);
            $("#tblNhomGD tr.divItemDsCanBo input[data-field='truong_nhom'][data-nsd='" + arrCanBo[i].nsd + "']").removeAttr("disabled");
        }
    });
    $("#tblNhomGD_pagination").html(ESUtil.pagingHTML("getPagingDSCanBo", 1, arrCanBo.length, arrCanBo.length));
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        _frmTimKiemNhomGD.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSearchNhomGD.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmNhomGD.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemNhomGD.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSearchNhomGD.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmNhomGD.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });
    _frmTimKiemNhomGD.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemNhomGD.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmSearchNhomGD.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSearchNhomGD.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    $("#btnThemMoiNhomGD").click(function () {
        _frmNhomGD.resetForm();
        _frmSearchNhomGD.resetForm();
        _frmNhomGD.clearErrorMessage();
        arrCanBo.length = [];
        $("#txtDanhSachCanBo").html("0");
        $("#btnXoaNhomGD").hide();
        _frmNhomGD.getControl("trang_thai").setValue("D");
        _frmSearchNhomGD.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmNhomGD.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmNhomGD.getControl("ma_chi_nhanh").readOnly(false);
        _frmNhomGD.getControl("nv").readOnly(false);
        _modalNhomGD.show();
        getPagingDSCanBo(1, res => {
            _modalNhomGD.show();
        });
    });

    $("#btnLuuNhomGD").click(function () {
        if (_frmNhomGD.isValid()) {
            var objData = _frmNhomGD.getJsonData();
            var obj = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ma_chi_nhanh: objData.ma_chi_nhanh,
                ten_nhom: objData.ten_nhom,
                trang_thai: objData.trang_thai,
                stt: objData.stt,
                nv: objData.nv,
                bt_nhom: objData.bt
            };
            $.each(arrCanBo, function (index, item) {
                if (item.truong_nhom == null || item.truong_nhom == "") {
                    item.truong_nhom = 0;
                }
                if (item.truong_nhom > 3) {
                    item.truong_nhom = 3;
                }
            });
            obj.data = arrCanBo;
            if (obj.data.length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ giám định");
                return;
            }
            var arr_truong_nhom = obj.data.where(n => n.truong_nhom == 1);
            if (arr_truong_nhom.length >= 2) {
                _notifyService.error("Nhóm giám định không thể có 2 trưởng nhóm");
                return;
            }
            var truong_nhom = obj.data.where(n => n.truong_nhom == 1).firstOrDefault();
            if (truong_nhom == null || truong_nhom == "") {
                _notifyService.error("Chưa có trưởng nhóm giám định");
                return;
            }
            _subGroupInvestigationService.luuNhomGD(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    getPaging(1);
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnLuuVaDongNhomGD").click(function () {
        if (_frmNhomGD.isValid()) {
            var objData = _frmNhomGD.getJsonData();
            var obj = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ma_chi_nhanh: objData.ma_chi_nhanh,
                ten_nhom: objData.ten_nhom,
                trang_thai: objData.trang_thai,
                stt: objData.stt,
                nv: objData.nv,
                bt_nhom: objData.bt
            };
            $.each(arrCanBo, function (index, item) {
                if (item.truong_nhom == null || item.truong_nhom == "") {
                    item.truong_nhom = 0;
                }
                if (item.truong_nhom > 3) {
                    item.truong_nhom = 3;
                }
            });
            obj.data = arrCanBo;
            if (obj.data.length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ giám định");
                return;
            }
            var truong_nhom = obj.data.where(n => n.truong_nhom == 1).firstOrDefault();
            var arr_truong_nhom = obj.data.where(n => n.truong_nhom == 1);
            if (arr_truong_nhom.length >= 2) {
                _notifyService.error("Nhóm giám định không thể có 2 trưởng nhóm");
                return;
            }
            if (truong_nhom)
                if (truong_nhom == null || truong_nhom == "") {
                    _notifyService.error("Chưa có trưởng nhóm giám định");
                    return;
                }
            _subGroupInvestigationService.luuNhomGD(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _modalNhomGD.hide();
                    getPaging(1);
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnXoaNhomGD").click(function () {
        var formData = _frmNhomGD.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _subGroupInvestigationService.delete(formData).then(res => {
                if (formData.bt == "" || formData.bt == undefined || formData.bt == null) {
                    _notifyService.error("Có lỗi xảy ra trong quá trình xóa dữ liệu");
                } else {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Xóa thông tin thành công");
                        getPaging(1);
                        _modalNhomGD.hide();
                    }
                    else {
                        _notifyService.error(res.state_info.message_body);
                    }
                }
            });
        });
    });

    $("#btnTKiemNhomGD").click(function () {
        getPagingDSCanBo(1);
    });

    $("#btnFrmSearch").click(function () {
        getPaging(1);
    });
})