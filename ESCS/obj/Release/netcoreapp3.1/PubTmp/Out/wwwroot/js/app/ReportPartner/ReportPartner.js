var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objDanhMuc = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();

// forms
var _frmBaoCaoDoiTac = new FormService("frmBaoCaoDoiTac");

// services
var _service = new Service();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _statusListService = new StatusListService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _categoryPersonListService = new CategoryPersonService();
var _productHumanService = new ProductHumanService();
var _reportPartnerService = new ReportPartnerService();

// modals
var _modalBenhVien = new ModalDragService("modalBenhVien", undefined, "top");

function chonBenhVien(el) {
    var val = $(el).attr("col-val");
    $(el).blur();
    $("#modalBenhVienDanhSach .dsbv").removeClass("d-none");
    $("#inputSearch_BenhVien").focus();
    $("#inputSearch_BenhVien").val("");
    if (val != undefined && val != null && val != "") {
        $("#modalBenhVienDanhSach .modalBenhVienItem[value='" + val + "']").prop("checked", true);
    } else {
        $("#modalBenhVienDanhSach .modalBenhVienItem").prop("checked", false);
    }
    _modalBenhVien.show(el);
}
function onChonBenhVien(el) {
    var target = _modalBenhVien.target;
    var val = $(el).val();
    if (val != undefined && val != null) {
        $(target).attr("data-val", val);
        var bv = objDanhMuc.benh_vien.where(n => n.ma == val).firstOrDefault();
        $(target).val(bv.ten);
        $(target).attr("col-val", bv.ma);
    }
    _modalBenhVien.hide();
}

$(document).ready(function () {
    var _serviceTmpHome = new Service();
    $("#btnXuatExcel").click(function () {
        var obj = _frmTimKiemHoSo.getJsonData();
        obj.ma_mau_in = obj.mau_bao_cao;
        _serviceTmpHome.getFile("/common/ExportExcel", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _statusListService.layDsTrangThaiCN(),
        _healthClaimCommonService.layDanhSachCoSoYTe(),
        _categoryPersonListService.layDsHMCN({ ma_doi_tac: ESCS_MA_DOI_TAC }),
        _productHumanService.getAllSanPham(),
        _healthClaimCommonService.layDanhMucChung({ ma_doi_tac: ESCS_MA_DOI_TAC }),
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.trang_thai = arrRes[2].data_info;
        objDanhMuc.benh_vien = arrRes[3].data_info.benh_vien.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC) // && (n.bl_ngoaitru == 'C' || n.bl_noitru == 'C' || n.bl_rang == 'C'));
        objDanhMuc.nha_thuoc = arrRes[3].data_info.nha_thuoc.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        objDanhMuc.hang_muc_ng = arrRes[4].data_info;
        objDanhMuc.san_pham = arrRes[5].data_info;
        objDanhMuc.nguyen_nhan = arrRes[6].data_info.where(n => n.nhom == "NGUYEN_NHAN");
        objDanhMuc.hinh_thuc = arrRes[6].data_info.where(n => n.nhom == "HINH_THUC");
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";

        _frmBaoCaoDoiTac.getControl("ngayd").setValue(ngayDauThang);
        _frmBaoCaoDoiTac.getControl("ngayc").setValue(dateNow);

        ESUtil.executeAsync(() => {
            _frmBaoCaoDoiTac.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
            _frmBaoCaoDoiTac.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        });
        ESUtil.executeAsync(() => {
            _frmBaoCaoDoiTac.getControl("nhom_nguyen_nhan").setDataSource(objDanhMuc.nguyen_nhan, "ten", "ma", "Chọn nguyên nhân", "");
        });
        ESUtil.executeAsync(() => {
            _frmBaoCaoDoiTac.getControl("hinh_thuc_dtri").setDataSource(objDanhMuc.hinh_thuc, "ten", "ma", "Chọn hình thức điều trị", "");
        });
        ESUtil.executeAsync(() => {
            _frmBaoCaoDoiTac.getControl("trang_thai").setDataSource(objDanhMuc.trang_thai, "ten", "ma_trang_thai", "Chọn trạng thái");
        });
        ESUtil.executeAsync(() => {
            _frmBaoCaoDoiTac.getControl("san_pham").setDataSource(objDanhMuc.san_pham, "ten", "ma", "Chọn sản phẩm", "");
        });

        ESUtil.genHTML("modalBenhVienDanhSachTemplate", "modalBenhVienDanhSach", { danh_sach: objDanhMuc.benh_vien }, () => {
            $("#modalBenhVienDanhSach .single_checked").click(function () {
                $("#modalBenhVienDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
        _reportPartnerService.layDanhSachBieuMauBaoCao({ nv: 'NG', pm: 'BC_NG_TT' }).then(res => {
            _frmBaoCaoDoiTac.getControl("mau_bao_cao").setDataSource(res.data_info, "ten", "ma", "Chọn biểu mẫu báo cáo");
        });
    });
    _frmBaoCaoDoiTac.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmBaoCaoDoiTac.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmBaoCaoDoiTac.getControl("ma_chi_nhanh").setValue("");
    });
    $("#btnXuatBaoCaoChung").click(function () {
        if (!_frmBaoCaoDoiTac.isValid()) {
            return;
        }
        var obj = _frmBaoCaoDoiTac.getJsonData();
        obj.benh_vien = _frmBaoCaoDoiTac.getControl('benh_vien').attr('col-val');
        obj.ma_mau_in = obj.mau_bao_cao;
        _service.getFile("/common/ExportBaoCao", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
});