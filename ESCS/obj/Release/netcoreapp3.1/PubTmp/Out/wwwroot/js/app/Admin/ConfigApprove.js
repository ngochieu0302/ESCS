var objDanhMuc = {};
var _notifyService = new NotifyService();
var _service = new Service();
var _configApproveService = new ConfigApproveService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _branchListService = new BranchListService();
var _businessCodeService = new BusinessCodeService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuu = new FormService("frmLuu");
var _modalNhap = new ModalService("modalNhap");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var arrChiNhanh;
var arrNSDDuyet;
const GRID_HO_SO_SO_DONG = 14;

var arr_loai_trinh = [
    { ma: "TRINH_THANH_TOAN", ten: "Trình duyệt thanh toán", nv: "THANH_TOAN" },

    { ma: "XE_TRINH_DUYET_BAO_CAO_GD", ten: "Trình duyệt báo cáo giám định", nv: "XE" },
    { ma: "XE_TRINH_DUYET_GIAM_DINH", ten: "Trình duyệt biên bản giám định", nv: "XE" },
    { ma: "XE_TRINH_DUYET_DUYET_GIA", ten:"Trình duyệt duyệt giá",nv: "XE"},
    { ma: "XE_TRINH_DUYET_BAO_LANH", ten:"Trình duyệt bảo lãnh",nv: "XE"},
    { ma: "XE_TRINH_DUYET_BOI_THUONG", ten: "Trình duyệt bồi thường", nv: "XE" },
    { ma: "XE_TRINH_DUYET_TU_CHOI", ten: "Trình duyệt từ chối bồi thường", nv: "XE" },
    { ma: "XE_TRINH_DUYET_TAM_UNG_BT", ten:"Trình duyệt tạm ứng bồi thường",nv: "XE"},
    { ma: "XE_TRINH_DUYET_THU_HOI_VAT_TU", ten:"Trình duyệt thu hồi vật tư",nv: "XE"},
    { ma: "XE_TRINH_DUYET_THU_DOI_NTBA", ten: "Trình duyệt thu đòi người thứ 3", nv: "XE" },

    { ma: "XE_MAY_TRINH_DUYET_BAO_CAO_GD", ten: "Trình duyệt báo cáo giám định", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_GIAM_DINH", ten: "Trình duyệt biên bản giám định", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_DUYET_GIA", ten: "Trình duyệt duyệt giá", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_BAO_LANH", ten: "Trình duyệt bảo lãnh", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_BOI_THUONG", ten: "Trình duyệt bồi thường", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_TU_CHOI", ten: "Trình duyệt từ chối bồi thường", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_TAM_UNG_BT", ten: "Trình duyệt tạm ứng bồi thường", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_THU_HOI_VAT_TU", ten: "Trình duyệt thu hồi vật tư", nv: "XE_MAY" },
    { ma: "XE_MAY_TRINH_DUYET_THU_DOI_NTBA", ten: "Trình duyệt thu đòi người thứ 3", nv: "XE_MAY" },

    { ma: "NG_TRINH_DUYET_DUYET_GIA", ten: "Trình duyệt phương án", nv: "NG" },
    { ma: "NG_TRINH_DUYET_BAO_LANH", ten: "Trình duyệt bảo lãnh", nv: "NG" },
    { ma: "NG_TRINH_DUYET_BOI_THUONG", ten: "Trình duyệt bồi thường", nv: "NG" },
    { ma: "NG_TRINH_DUYET_TU_CHOI", ten: "Trình từ chối bồi thường", nv: "NG" }
]
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_nhom", title: "Tên nhóm", width: "18%", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "12%", hozAlign: "center", headerSort: false },
    { field: "loai_trinh_ten", title: "Loại trình", width: "14%", headerSort: false, hozAlign: "center" },
    { field: "ngay_ad_hthi", title: "Ngày áp dụng", width: "8%", headerSort: false, hozAlign: "center" },
    { field: "nhom_ca_nhan", title: "Nhóm cá nhân", width: "10%", hozAlign: "center", headerSort: false },
    { field: "phan_cap_hthi", title: "Trình phân cấp", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nghiep_vu_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];
var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _configApproveService.paging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (data.ma_doi_tac === undefined || data.ma_doi_tac === null || data.ma_doi_tac === "") {
        return;
    }
    _configApproveService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmLuu.clearErrorMessage();
        _frmLuu.getControl("ma_doi_tac").readOnly();
        _frmLuu.setData(objData.mau);
        _frmLuu.getControl("nghiep_vu").trigger("select2:select");
        _frmLuu.getControl("loai_trinh").setValue(objData.mau.loai_trinh);
        $("#nsd_luu").html("(" + objData.mau.nsd_luu + ")");
        $("#ds_chi_nhanh_tkiem").html("");
        $("#ds_can_bo_tkiem").html("");
        _frmLuu.getControl("ma_doi_tac").trigger("select2:select");
        _frmLuu.getControl("ma_chi_nhanh").val(objData.mau.ma_chi_nhanh);
        if (objData.mau.ngan_hang != undefined && objData.mau.ngan_hang != null && objData.mau.ngan_hang != "") {
            var cnhanh = objDanhMuc.cnhanh.where(n => n.ma_ct == objData.mau.ngan_hang);
            _frmLuu.getControl("cnhanh_ngan_hang").setDataSource(cnhanh, "ten", "ma", "Chọn chi nhánh", objData.mau.cnhanh_ngan_hang);
        }
        _modalNhap.show();
    });
}
function bindDataMenucha() {
    var data = [];
    if (objDanhMuc.menu_cha != undefined && objDanhMuc.menu_cha != null) {
        data = objDanhMuc.menu_cha.where(n => n.nhom == nhom);
        _frmLuu.getControl("so_id_cha").setDataSource(data, "ten", "so_id", "Chọn menu cha", "");
    }
}
function chonChiNhanh(el) {
    var checked = $(el).is(":checked");
    var ma_chi_nhanh = $(el).val();
    if (checked) {
        _configApproveService.searchUserByBranch({
            ma_doi_tac: _frmLuu.getControl("ma_doi_tac").val(),
            so_id: _frmLuu.getControl("so_id").val(),
            ma_chi_nhanh: ma_chi_nhanh
        }).then(res => {
            arrNSDDuyet = res.data_info.sort((a, b) => (b.chon - a.chon) || (a.stt - b.stt));
            ESUtil.appendHTML("ds_can_bo_tkiem_template", "ds_can_bo_tkiem", { nsd_duyet: arrNSDDuyet });
        });
    }
    else {
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "']").remove();
    }
}
function chonCanBoDuyet(el, ma_chi_nhanh){
    var checked = $(el).is(":checked");
    var val = $(el).val();
    if (checked) {
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-stt='" + ma_chi_nhanh + '/' + val + '/stt' + "']").removeAttr("readonly");
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-phe-duyet='" + ma_chi_nhanh + '/' + val + "']").removeAttr("disabled");
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-thu-tu-duyet='" + ma_chi_nhanh + '/' + val + '/thu_tu_duyet' + "']").removeAttr("readonly");
    }
    else {
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-stt='" + ma_chi_nhanh + '/' + val + '/stt' + "']").attr("readonly", 'readonly');
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-thu-tu-duyet='" + ma_chi_nhanh + '/' + val + '/thu_tu_duyet' + "']").attr("readonly", 'readonly');
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-phe-duyet='" + ma_chi_nhanh + '/' + val + "']").attr("disabled", "disabled");
        $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + ma_chi_nhanh + "'] input[data-phe-duyet='" + ma_chi_nhanh + '/' + val + "']").prop("checked", false);
    }
}
function chonPheDuyet(el) {
    $("#ds_can_bo_tkiem input[data-phe-duyet]").prop("checked", false);
    $(el).prop("checked", true);
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
         arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmLuu.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmLuu.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        getPaging(1);
    });

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmTimKiem.getControl("nghiep_vu").addEventChange(val => {
        var loai_trinh = arr_loai_trinh.where(n => n.nv == val);
        _frmTimKiem.getControl("loai_trinh").setDataSource(loai_trinh, "ten", "ma", "Chọn loại trình", "");
    });
    _frmLuu.getControl("nghiep_vu").addEventChange(val => {
        var loai_trinh = arr_loai_trinh.where(n => n.nv == val);
        _frmLuu.getControl("loai_trinh").setDataSource(loai_trinh, "ten", "ma", "Chọn loại trình", "");
    });
    _frmLuu.getControl("ma_doi_tac").addEventChange(val => {
        if (val == "") {
            $("#ds_chi_nhanh_tkiem").html("");
            $("#ds_can_bo_tkiem").html("");
            return;
        }
        var so_id = _frmLuu.getControl("so_id").val();
        _configApproveService.searchUser({
            ma_doi_tac: val,
            so_id: so_id
        }).then(res => {
            ESUtil.genHTML("ds_chi_nhanh_tkiem_template", "ds_chi_nhanh_tkiem", { cnhanh: res.data_info.cnhanh }, () => {
                $("#ds_chi_nhanh_tkiem input.item-chi-nhanh-duyet:checked").each(function (index, item) {
                    chonChiNhanh(this);
                });
            });
        });
        var arr_chi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmLuu.getControl("ma_chi_nhanh").setDataSource(arr_chi_nhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    $("#btnNhap").click(function () {
        _frmLuu.resetForm();
        _frmLuu.clearErrorMessage();
        $("#nsd_luu").html("");
        _frmLuu.getControl("tu_dong").setValue("K");
        _frmLuu.getControl("trang_thai").setValue("D");
        _frmLuu.getControl("nghiep_vu").setValue("XE");
        _frmLuu.getControl("nghiep_vu").trigger("select2:select");
        _frmLuu.getControl("ngay_ad").setValue(new Date().ddmmyyyy());
        _frmLuu.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmLuu.getControl("phan_cap").setValue("K");
        _frmLuu.getControl("ma_chi_nhanh").readOnly(false);
        _frmLuu.getControl("loai").setValue("DT");

        var so_id = _frmLuu.getControl("so_id").val();
        _configApproveService.searchUser({
            ma_doi_tac: _frmLuu.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC),
            so_id: so_id
        }).then(res => {
            ESUtil.genHTML("ds_chi_nhanh_tkiem_template", "ds_chi_nhanh_tkiem", { cnhanh: res.data_info.cnhanh }, () => {
                console.log(res.data_info.cnhanh);
                $("#ds_chi_nhanh_tkiem input.item-chi-nhanh-duyet:checked").each(function (index, item) {
                    chonChiNhanh(this);
                });
            });
        });
        _frmLuu.getControl("ma_doi_tac").readOnly(false);
        _frmLuu.getControl("ma_chi_nhanh").readOnly(false);
        ESUtil.genHTML("ds_chi_nhanh_tkiem_template", "ds_chi_nhanh_tkiem", { cnhanh: [] });
        ESUtil.genHTML("ds_can_bo_tkiem_template", "ds_can_bo_tkiem", { nsd_duyet: [] });
        _modalNhap.show();
    });
    $("#btnLuu").click(function () {
        if (_frmLuu.isValid()) {
            var obj = _frmLuu.getJsonData();
            obj.arr = [];
            $("#ds_can_bo_tkiem input.item-chon:checked").each(function (index, item) {
                var objItem = { ma_chi_nhanh_duyet: "", nsd: "", stt: "", phe_duyet: "", thu_tu_duyet: "" };
                objItem.ma_chi_nhanh_duyet = $(this).attr("data-chi-nhanh");
                objItem.nsd = $(this).val();
                objItem.phe_duyet = "0";
                objItem.stt = $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + objItem.ma_chi_nhanh_duyet + "'] input[data-stt='" + objItem.ma_chi_nhanh_duyet + '/' + objItem.nsd + '/stt' + "']").val();
                objItem.thu_tu_duyet = $("#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + objItem.ma_chi_nhanh_duyet + "'] input[data-thu-tu-duyet='" + objItem.ma_chi_nhanh_duyet + '/' + objItem.nsd + '/thu_tu_duyet' + "']").val();
                var elpd = "#ds_can_bo_tkiem tr[data-nhom-chi-nhanh='" + objItem.ma_chi_nhanh_duyet + "'] input[data-phe-duyet='" + objItem.ma_chi_nhanh_duyet + '/' + objItem.nsd + "']";
                var pd = $(elpd).is(":checked");
                if (pd) {
                    objItem.phe_duyet = "1";
                }
                obj.arr.push(objItem);
            });
            if (obj.arr.length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ duyệt");
                return;
            }
            if (obj.arr.where(n => n.phe_duyet == "1").length <= 0) {
                _notifyService.error("Bạn chưa chọn cán bộ duyệt chính");
                return;
            }
            if (obj.arr.where(n => n.phe_duyet == "1").length > 1) {
                _notifyService.error("Có nhiều hơn 1 cán bộ duyệt chính");
                return;
            }
            _configApproveService.save(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _frmLuu.getControl("so_id").val(res.out_value.so_id);
                    _notifyService.success("Lưu thông báo thành công.");
                    getPaging(1);
                    _modalNhap.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoa").click(function () {
        var obj = _frmLuu.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa nhóm phê duyệt này không?", "", val => {
            _configApproveService.delete(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin nhóm phê duyệt thành công.");
                    getPaging(1);
                    _modalNhap.hide();
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
    $("#btnCopy").click(function () {
        _frmLuu.getControl("loai_trinh").setValue("");
        _frmLuu.getControl("so_id").setValue("");
        $("#nsd_luu").html("");
    });
    $("#input_tkiem_chi_nhanh").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#ds_chi_nhanh_tkiem .chi_nhanh").removeClass("d-none");
            return;
        }
        $("#ds_chi_nhanh_tkiem .chi_nhanh").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = arrChiNhanh.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#ds_chi_nhanh_tkiem #chi_nhanh_" + source[i].ma.trim().replace(/[^a-zA-Z0-9]/g, '')).removeClass("d-none");
            }
        }
    }, 300));
    $("#input_tkiem_can_bo").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#ds_can_bo_tkiem .ma_cb").removeClass("d-none");
            return;
        }
        $("#ds_can_bo_tkiem .ma_cb").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = arrNSDDuyet.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#ds_can_bo_tkiem #ma_cb_" + source[i].ma.trim().replace(/[^a-zA-Z0-9]/g, '')).removeClass("d-none");
            }
        }
    }, 300));
});