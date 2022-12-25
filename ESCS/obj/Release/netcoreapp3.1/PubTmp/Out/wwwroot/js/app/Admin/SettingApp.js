var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _settingAppService = new SettingAppService();
var _partnerListService = new PartnerListService();
var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinCaiDat = new FormService("frmLuuThongTinCaiDat");
var _modalNhapCaiDat = new ModalService("modalNhapCaiDat");
var _modalSettingApp = new ModalService("modalSettingApp");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đơn vị bảo hiểm", width: "20%", headerSort: false },
    { field: "ma_app", title: "Mã app", width: "8%", hozAlign: "center", headerSort: false },
    { field: "url_anh", title: "Url ảnh", width: "20%", headerSort: false },
    { field: "ten", title: "Tên", width: "15%", headerSort: false },
    { field: "ten_tat", title: "Tên tắt", width: "15%", headerSort: false },
    { field: "loai", title: "Loại", hozAlign: "center", width: "10%", headerSort: false },
    { field: "chieu_rong", title: "Chiều rộng", hozAlign: "center", width: "8%", headerSort: false },
    { field: "chieu_dai", title: "Chiều dài", hozAlign: "center", width: "8%", headerSort: false },
    { field: "toa_do_x", title: "Tọa độ x", hozAlign: "center", width: "8%", headerSort: false },
    { field: "toa_do_y", title: "Tọa độ y", hozAlign: "center", width: "8%", headerSort: false }
];

var _gridViewAction = new GridViewService("gridViewAction", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _settingAppService.getpaging(objTimKiem).then(res => {
        _gridViewAction.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewAction.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewAction.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    if (row !== undefined) {
        row.select();
        _frmLuuThongTinCaiDat.setData(data);
        if (data.url_anh == null) {
            $("#img_main").attr("src", "/images/default.png");
        }
        else {
            $('#img_main').attr('src', '/' + data.url_anh);
        }
        
        _frmLuuThongTinCaiDat.getControl('ma_doi_tac').readOnly();
        _frmLuuThongTinCaiDat.getControl('ma_app').readOnly();
        _frmLuuThongTinCaiDat.getControl('loai').readOnly();
        $('#btnCapNhatCauHinh').show();
        $('#btnDeleteCauHinh').show();
        $('#btnThemMoiCauHinh').hide();
        _modalNhapCaiDat.show();
    }
};

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCaiDat.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        console.log(objDanhMuc.doi_tac);
        getPaging(1);
    });

    $("#btnSearchST").click(function () {
        getPaging(1);
    });

    $("#btnNhapThongTinST").click(function () {
        $("#img_main").attr("src", "/images/default.png");
        _frmLuuThongTinCaiDat.clearErrorMessage();
        _frmLuuThongTinCaiDat.resetForm();
        _frmLuuThongTinCaiDat.getControl('ma_doi_tac').readOnly(false);
        _frmLuuThongTinCaiDat.getControl('ma_app').readOnly(false);
        _frmLuuThongTinCaiDat.getControl('loai').readOnly(false);
        $('#btnThemMoiCauHinh').show();
        $('#btnDeleteCauHinh').hide();
        $('#btnCapNhatCauHinh').hide();
        _modalNhapCaiDat.show();
    });

    $("#btnThemMoiCauHinh").click(function () {
        var objData = _frmLuuThongTinCaiDat.getFormFileData();
        _settingAppService.themcaidat(objData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success('Thêm cấu hình ứng dụng thành công.');
                _modalNhapCaiDat.hide();
                getPaging(1);
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnCapNhatCauHinh').click(function() {
        var objData = _frmLuuThongTinCaiDat.getFormFileData();
        _settingAppService.capnhatcaidat(objData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success('Cập nhật cấu hình ứng dụng thành công.');
                _modalNhapCaiDat.hide();
                getPaging(1);
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnDeleteCauHinh').click(function() {
        var formData = _frmLuuThongTinCaiDat.getJsonData();
        console.log(formData);
        _notifyService.confirmDelete("Bạn có chắc muốn xóa khách hàng này không?", "ok", val => {
            if (val === 'ok') {
                _settingAppService.xoacaidat(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success('Xóa cấu hình ứng dụng thành công.');
                        _modalNhapCaiDat.hide();
                        getPaging(1);
                    }
                    else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        });
    });

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#file_anh").on('change', function () {
        readURL(this);
    });
});