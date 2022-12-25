var objDanhMuc = {};
var _service = new Service();

var _notifyService = new NotifyService();
var _costsListService = new CostsListService();
var _partnerListService = new PartnerListService();
var _unitService = new UnitService();

var _frmLuuChiPhi = new FormService("frmLuuChiPhi");
var _frmTimKiem = new FormService("frmTimKiem");

var _modalNhapChiPhi = new ModalService("modalNhapChiPhi");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
const GRID_HO_SO_SO_DONG = 14;

var arrLoai = [
    { ma: "KB", ten: "Khám bệnh" },
    { ma: "TH", ten: "Thuốc" },
    { ma: "KH", ten: "Khác" },
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "22%", headerSort: false },
    { field: "loai_hthi", title: "Loại", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_dvi_tinh", title: "Đơn vị tính", width: "8%", hozAlign: "center", headerSort: false },
    { field: "gia", title: "Giá", width: "8%", headerSort: false, hozAlign: "right", formatter: formatterMoney },
    { field: "trang_thai_hthi", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewChiPhi = new GridViewService("gridViewChiPhi", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _costsListService.getPaging(objTimKiem).then(res => {
        _gridViewChiPhi.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewChiPhi.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewChiPhi.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _costsListService.getDetail(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        if (res.data_info.loai == 'TH') {
            $("#cp_thuoc").removeClass('d-none');
            $('form[name=frmLuuChiPhi] input[name=gia]').prop('required', true);
            $('form[name=frmLuuChiPhi] select[name=dvi_tinh]').prop('required', true);

        } else{
            $("#cp_thuoc").addClass('d-none');
            $('form[name=frmLuuChiPhi] input[name=gia]').prop('required', false);
            $('form[name=frmLuuChiPhi] select[name=dvi_tinh]').prop('required', false);
        }
        var objData = res.data_info;
        _frmLuuChiPhi.resetForm();
        _frmLuuChiPhi.clearErrorMessage();
        _frmLuuChiPhi.setData(objData);
        $("#modal-user-log").html("(" + objData.nsd + " - " + objData.ngay + ")");
        if (res.data_info.ma_ct != null) {
            _frmLuuChiPhi.getControl("ma_ct").setValue(objData.ma_ct);
        } else {
            var arrCapTren = objDanhMuc.chi_phi.where(n => n.ma_ct == null);
            _frmLuuChiPhi.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", "");
        }
        _frmLuuChiPhi.getControl("ma_doi_tac").readOnly();
        _frmLuuChiPhi.getControl("ma").readOnly();
        _frmLuuChiPhi.getControl("loai").readOnly();
        _modalNhapChiPhi.show();
    });
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _costsListService.layDsChiPhi(),
        _unitService.getAll()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.chi_phi = arrRes[1].data_info;
        objDanhMuc.dvi_tinh = arrRes[2].data_info.where(n => n.nhom == "THUOC");
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuChiPhi.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        _frmTimKiem.getControl("loai").setDataSource(arrLoai, "ten", "ma", "Chọn loại", "");
        _frmLuuChiPhi.getControl("dvi_tinh").setDataSource(objDanhMuc.dvi_tinh, "ten", "ma", "Chọn đơn vị tính", "");
        var arrCapTren = objDanhMuc.chi_phi.where(n => n.ma_ct == null);
        _frmLuuChiPhi.getControl("ma_ct").setDataSource(arrCapTren, "ten", "ma", "Chọn mã cấp trên", "");
        getPaging(1);
    });

    _frmLuuChiPhi.getControl("loai").addEventChange(val => {     
        if (val === 'TH') {
            $("#cp_thuoc").removeClass('d-none');
            $('form[name=frmLuuChiPhi] input[name=gia]').prop('required', true);
            $('form[name=frmLuuChiPhi] select[name=dvi_tinh]').prop('required', true);
        } else {
            $("#cp_thuoc").addClass('d-none');
            $('form[name=frmLuuChiPhi] input[name=gia]').prop('required', false);
            $('form[name=frmLuuChiPhi] select[name=dvi_tinh]').prop('required', false);
        }
    });

    //Nhập thông tin chi phí
    $("#btnThemMoi").click(function () {
        _frmLuuChiPhi.resetForm();
        _frmLuuChiPhi.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuChiPhi.getControl("ma_doi_tac").readOnly(false);
        _frmLuuChiPhi.getControl("ma").readOnly(false);
        _frmLuuChiPhi.getControl("loai").readOnly(false);
        _frmLuuChiPhi.getControl("trang_thai").setValue('D');
        $("#modal-user-log").html("");
        _frmLuuChiPhi.clearErrorMessage();
        _modalNhapChiPhi.show();
    })

    //Lưu thông tin chi phí
    $("#btnLuuTTChiPhi").click(function () {
        if (_frmLuuChiPhi.isValid()) {
            var formData = _frmLuuChiPhi.getJsonData();
            _costsListService.luuThongTinChiPhi(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin chi phí thành công");
                    getPaging(1);
                    _modalNhapChiPhi.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin chi phí
    $("#btnXoaTTChiPhi").click(function () {
        var formData = _frmLuuChiPhi.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin chi phí này không?", "", val => {
            _costsListService.delete(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin chi phí thành công");
                    getPaging(1);
                    _modalNhapChiPhi.hide();
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