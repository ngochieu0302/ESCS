var objDanhMuc = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();

var _service = new Service();
var _customerService = new CustomerService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();

var _frmSaveQLKH = new FormService("frmSaveQLKH");
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapQLKH = new ModalService("modalNhapQLKH");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac_cn", title: "Chi nhánh", hozAlign: "center", width: "21%", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "loai_kh_hthi", title: "Khách hàng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã khách hàng", width: "15%", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "38%", headerSort: false },
    { field: "cmt", title: "Chứng minh thư", width: "10%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "10%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "12%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "nd", title: "Nội dung", width: "12%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewQLKH = new GridViewService("gridViewQLKH", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _customerService.timKiemKH(objTimKiem).then(res => {
        _gridViewQLKH.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewQLKH.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewQLKH.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _customerService.xemChiTiet_KH(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objData = res.data_info;
        _frmSaveQLKH.clearErrorMessage();
        _frmSaveQLKH.setData(objData);
        if (objData.loai_kh == 'T') {
            $('#mst_cn').show();
            $('#cmt_cn').hide();
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', true);
        } else if (objData.loai_kh == 'C') {
            $('#mst_cn').hide();
            $('#cmt_cn').show();
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', true);
        }
        _frmSaveQLKH.getControl("ma_doi_tac").trigger("select2:select");
        _frmSaveQLKH.getControl("ma_chi_nhanh").setValue(objData.ma_chi_nhanh);
        _frmSaveQLKH.getControl("ma_doi_tac").readOnly();
        _frmSaveQLKH.getControl("ma_chi_nhanh").readOnly();
        _frmSaveQLKH.getControl("ma").readOnly();
        _frmSaveQLKH.getControl("loai_kh").readOnly();
        _frmSaveQLKH.getControl("loai_kh").trigger("select2:select");
        _modalNhapQLKH.show();
    });
};
$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _branchListService.layDsChiNhanh()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKH.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        
        getPaging(1);
    });

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arr_chi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arr_chi_nhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    _frmSaveQLKH.getControl("ma_doi_tac").addEventChange(val => {
        var arr_chi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveQLKH.getControl("ma_chi_nhanh").setDataSource(arr_chi_nhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    _frmSaveQLKH.getControl("loai_kh").addEventChange(val => {
        if (val == 'T') {
            $('#mst_cn').show();
            $('#cmt_cn').hide();
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', true);
        } else if (val == 'C') {
            $('#mst_cn').hide();
            $('#cmt_cn').show();
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', true);
        }
    });

    $("#btnNhapQLKH").click(function () {
        _frmSaveQLKH.resetForm();
        _frmSaveQLKH.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKH.getControl("ma_doi_tac").trigger("select2:select");
        _frmSaveQLKH.getControl("ma_doi_tac").readOnly(false);
        _frmSaveQLKH.getControl("ma_chi_nhanh").readOnly(false);
        _frmSaveQLKH.getControl("ma").readOnly(false);
        _frmSaveQLKH.clearErrorMessage();
        _frmSaveQLKH.getControl("loai_kh").setValue("C");
        _frmSaveQLKH.getControl("loai_kh").trigger('select2:select');
        _frmSaveQLKH.getControl("loai_kh").readOnly(false);
        _modalNhapQLKH.show();
    });

    $("#btnSaveQLKH").click(function () {
        if (_frmSaveQLKH.isValid()) {
            var formData = _frmSaveQLKH.getJsonData();
            _customerService.saveKH(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin khách hàng thành công.");
                    getPaging(1);
                    _modalNhapQLKH.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnDeleteQLKH").click(function () {
        var formData = _frmSaveQLKH.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa khách hàng này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
})