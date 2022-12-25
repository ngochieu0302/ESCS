var objDanhMuc = {};

var _service = new Service()
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _opinionGroupService = new OpinionGroupService();
var _carClaimCommonService = new CarClaimCommonService();

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhomTrinhYKien = new ModalService("modalNhomTrinhYKien");
var _frmModalNhomTrinhYKien = new FormService("frmModalNhomTrinhYKien");
var _frmXinYKienThemNhomTenNhom = new FormService("frmXinYKienThemNhomTenNhom");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;
var arr_cb = [];

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "12%", align: "center", headerSort: false },
    { field: "ten_nhom", title: "Tên nhóm", width: "20%", headerSort: false },
    { field: "loai_trinh_hthi", title: "Loại trình", width: "12%", align: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", align: "center", headerSort: false },
    { field: "nghiep_vu_hthi", title: "Nghiệp vụ", width: "10%", align: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false },
];
var _gridViewNguoiXinYKien = new GridViewService("gridViewNguoiXinYKien", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _opinionGroupService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewNguoiXinYKien.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewNguoiXinYKien.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewNguoiXinYKien.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").attr("data-val", "");
    _opinionGroupService.layThongTinChiTiet(data).then(res => {
        console.log(res);
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _frmModalNhomTrinhYKien.getControl("so_id").setValue(res.data_info.mau.so_id);
        var ds_nsd = res.data_info.mau_ct;
        var arr_cnhanh = [];
        var can_bo_chon = "";
        for (var i = 0; i < ds_nsd.length; i++) {
            if (can_bo_chon == "") {
                can_bo_chon = ds_nsd[i].nsd_duyet;
            }
            else {
                can_bo_chon += ";" + ds_nsd[i].nsd_duyet;
            }
            var cnhanh = arr_cnhanh.where(n => n.ma == ds_nsd[i].ma_chi_nhanh_duyet).firstOrDefault();
            if (cnhanh == null) {
                arr_cnhanh.push({ ma: ds_nsd[i].ma_chi_nhanh_duyet, ten: ds_nsd[i].ten_cnhanh_duyet });
            }
        }
        var text = "";
        var ma_cnhanh = "";
        if (arr_cnhanh.length == 1) {
            text = arr_cnhanh[0].ten;
            ma_cnhanh = arr_cnhanh[0].ma;
        }
        else if (arr_cnhanh.length > 1) {
            text = "Đã có " + arr_cnhanh.length + " đơn vị được chọn";
            for (var i = 0; i < arr_cnhanh.length; i++) {
                if (ma_cnhanh == "") {
                    ma_cnhanh = arr_cnhanh[i].ma;
                }
                else {
                    ma_cnhanh += ";" + arr_cnhanh[i].ma;
                }
            }
        }
        _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").attr("data-val", ma_cnhanh);
        _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").setValue(text);
        _frmModalNhomTrinhYKien.getControl("can_bo_chon").setValue(can_bo_chon);
        $("#modalXinYKienThemNhomTenNhom").val(res.data_info.mau.ten_nhom);
        _frmXinYKienThemNhomTenNhom.getControl("loai_trinh").setValue(res.data_info.mau.loai_trinh);
        _frmXinYKienThemNhomTenNhom.getControl("nghiep_vu").setValue(res.data_info.mau.nghiep_vu);
        onModalNhomYKienTimKiemCanBo(1);
        _modalNhomTrinhYKien.show();
    });
}
function onModalXinYKienChonDonVi(el, placement = "bottom") {
    ESUtil.genHTML("modalXinYKienChonDonViDanhSachTemplate", "modalXinYKienChonDonViDanhSach", { danh_sach: objDanhMuc.dsDonVi });
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet[value='" + arr[i] + "']").prop("checked", true);
    }
    _modalXinYKienChonDonVi.setPlacement(placement);
    _modalXinYKienChonDonVi.show(el);
}
function onModalNhomYKienTimKiemCanBo(trang) {
    var _frmModalNhomTrinhYKien = new FormService("frmModalNhomTrinhYKien");
    var hanh_dong = _frmModalNhomTrinhYKien.getControl("hanh_dong").val();
    var ma_doi_tac = _frmModalNhomTrinhYKien.getControl("ma_doi_tac").val();
    var so_id = _frmModalNhomTrinhYKien.getControl("so_id").val();
    var arr_cnhanh = _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").attr("data-val");
    var tim = _frmModalNhomTrinhYKien.getControl("tim").val();
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        tim: tim,
        arr_cnhanh: arr_cnhanh,
        trang: trang,
        so_dong: 7
    };

    ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: [] });
    $("#modalXinYKienThemNhomDSCanBo_pagination").html("");
    if (obj.arr_cnhanh == "" || trang == "") {
        return;
    }
    _service.postData("/carclaim/carclaimcommon/layNsdYKienTheoChiNhanh", obj).then(res => {
        if (res.state_info.status !== "OK") {
            var _notifyService = new NotifyService();
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: res.data_info.data }, () => {
            var can_bo_chon = _frmModalNhomTrinhYKien.getControl("can_bo_chon").val();
            arr_cb = can_bo_chon.split(";").where(n => n != "");
            if (arr_cb.length > 0) {
                for (var i = 0; i < arr_cb.length; i++) {
                    $("#modalXinYKienThemNhomDSCanBo input[type='checkbox'][data-val='" + arr_cb[i] + "']").prop("checked", true);
                }
            }
        });
        $("#modalXinYKienThemNhomDSCanBo_pagination").html(ESUtil.pagingHTML("onModalNhomYKienTimKiemCanBo", obj.trang, res.data_info.tong_so_dong, obj.so_dong));
    });
}
function onModalXinYKienChonCanBo(el) {
    var nsd_duyet = $(el).attr("data-val");
    var checked = $(el).is(":checked");
    var can_bo_chon = _frmModalNhomTrinhYKien.getControl("can_bo_chon").val();
    var arr = can_bo_chon.split(";").where(n => n != "");
    arr = arr.removeItem(n => n == nsd_duyet);
    if (checked) {
        arr.push(nsd_duyet);
    }
    var can_bo_chon_new = "";
    for (var i = 0; i < arr.length; i++) {
        if (can_bo_chon_new == "") {
            can_bo_chon_new = arr[i];
        }
        else {
            can_bo_chon_new += ";" + arr[i];
        }
    }
    _frmModalNhomTrinhYKien.getControl("can_bo_chon").setValue(can_bo_chon_new);
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _carClaimCommonService.layDsDonViXinYKien()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.dsDonVi = arrRes[2].data_info.don_vi;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmModalNhomTrinhYKien.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn đơn vị chi nhánh", "");
    });
    $("#btnNhapThongTin").click(function () {
        _frmXinYKienThemNhomTenNhom.resetForm();
        _frmXinYKienThemNhomTenNhom.getControl("nghiep_vu").setValue('XE');
        _frmModalNhomTrinhYKien.getControl("can_bo_chon").setValue("");
        ESUtil.genHTML("modalXinYKienThemNhomDSCanBoTemplate", "modalXinYKienThemNhomDSCanBo", { danh_sach: [] });
        _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").attr("data-val", "");
        _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh_duyet").val("");
        $(".chon-can-bo").prop("checked", false);
        _frmXinYKienThemNhomTenNhom.clearErrorMessage();

        _modalNhomTrinhYKien.show();
    });
    $("#ModalXinYKien_btnChonDonVi").click(function () {
        var data_val = "";
        var ten_dvi = "";
        var count = $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet:checked").length;
        $("#modalXinYKienChonDonViDanhSach .modalChonDviDuyet:checked").each(function () {
            var val = $(this).val();
            if (data_val == "") {
                var don_vi = objDanhMuc.dsDonVi.where(n => n.ma == val).firstOrDefault();
                ten_dvi = don_vi.ten_tat;
            }
            else {
                ten_dvi = null;
            }
            if (data_val == "") {
                data_val = val;
            }
            else if (!data_val.includes(val)) {
                data_val += ";" + val
            }

        });
        if (ten_dvi == null && count > 1) {
            ten_dvi = "Đã có " + count + " đơn vị được chọn";
        }
        $(_modalXinYKienChonDonVi.target).attr("data-val", data_val);
        $(_modalXinYKienChonDonVi.target).val(ten_dvi);

        _modalXinYKienChonDonVi.hide();
    });
    $("#ModalXinYKien_btnTimKiemCanBo").click(function () {
        onModalNhomYKienTimKiemCanBo(1);
    });
    $("#ModalXinYKien_btnLuuThemNhom").click(function () {
        if (_frmXinYKienThemNhomTenNhom.isValid()) {
            var obj = {
                ma_doi_tac: _frmModalNhomTrinhYKien.getControl("ma_doi_tac").val(),
                ma_chi_nhanh: _frmModalNhomTrinhYKien.getControl("ma_chi_nhanh").val(),
                so_id: _frmModalNhomTrinhYKien.getControl("so_id").val(),
                nghiep_vu: _frmXinYKienThemNhomTenNhom.getControl("nghiep_vu").val(),
                loai_trinh: _frmXinYKienThemNhomTenNhom.getControl("loai_trinh").val(),
                ten_nhom: _frmXinYKienThemNhomTenNhom.getControl("ten_nhom").val(),
                nhom_ca_nhan: $("#escs_tai_khoan").val(),
                arr_nsd: _frmModalNhomTrinhYKien.getControl("can_bo_chon").val().split(";").where(n => n != ""),
                trang_thai: "D"
            }
            if (obj.arr_nsd.length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ xin ý kiến");
                return;
            }
            if (obj.ten_nhom.trim() == "") {
                _notifyService.error("Bạn chưa nhập tên nhóm");
                return;
            }
            _opinionGroupService.luuNguoiXinYKien(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmModalNhomTrinhYKien.getControl("so_id").val(res.out_value.so_id);
                _notifyService.success("Lưu thông tin thành công");
                _modalNhomTrinhYKien.hide();
                getPaging(1);
            });
        };
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
})