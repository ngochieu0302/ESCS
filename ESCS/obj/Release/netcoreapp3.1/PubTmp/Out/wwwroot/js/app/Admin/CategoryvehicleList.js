var objDanhMuc = {};
var _frmLuuThongTinXeHangMuc = new FormService("frmLuuThongTinXeHangMuc");
var _notifyService = new NotifyService();
var _service = new Service();
var _categoryvehicleListService = new CategoryvehicleListService();
var _partnerListService = new PartnerListService();
var _UploadExcelService = new UploadExcelService();

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalViTri = new ModalDragService("modalViTri", undefined, "bottom");

var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapXeHangMuc = new ModalService("modalNhapXeHangMuc");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var objData = null;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "nv_ten", title: "Nghiệp vụ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "nhom_hang_muc_hthi", title: "Độ phức tạp hạng mục", width: "15%", hozAlign: "center", headerSort: false },
    { field: "loai_ten", title: "Loại", width: "15%", hozAlign: "center", headerSort: false },
    { field: "hien_thi_app_hthi", title: "Hiển thị trên app", width: "10%", hozAlign: "center", headerSort: false },
    //{ field: "trang_thai", title: "Trạng thái", width: "10%", headerSort: false },
    { field: "ten_doi_tac", title: "Tên đối tác", width: "15%", headerSort: false }
];

var _gridViewXeHangMuc = new GridViewService("gridViewXeHangMuc", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _categoryvehicleListService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewXeHangMuc.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _categoryvehicleListService.layThongTinChiTiet(data).then(res => {
        var objDatact = res.data_info;
        _frmLuuThongTinXeHangMuc.clearErrorMessage();
        _frmLuuThongTinXeHangMuc.setData(objDatact);
        _frmLuuThongTinXeHangMuc.getControl('vi_tri').attr('data-val', objDatact.vi_tri);
        _modalNhapXeHangMuc.show();
        row.select();
        $("input.ten_alias").tagsinput("removeAll");
        if (objDatact.ten_alias != null) {
            $("input.ten_alias").tagsinput('add', objDatact.ten_alias);
        }
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinXeHangMuc.getControl("ma").readOnly();
    });
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
function chonViTri(el) {
    var ds_val = $(el).attr("data-val");
    $("#modalChonViTriDanhSach .nngt").removeClass("d-none");
    $("#inputSearch_ViTri").focus();
    $("#inputSearch_ViTri").val();
    $("#modalChonViTriDanhSach .modalChonViTriItem").prop("checked", false);
    if (ds_val != '' && ds_val != undefined) {
        var arr = ds_val.split(",");
        for (var i = 0; i < arr.length; i++) {
            var val = arr[i];
            if (val != undefined && val != null && val != "") {
                $("#modalChonViTriDanhSach .modalChonViTriItem[value='" + val + "']").prop("checked", true);
            }
        }
    }
    _modalViTri.show(el);
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _categoryvehicleListService.GetAllViTriTonThat({ ma_doi_tac: ESCS_MA_DOI_TAC })
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.vi_tri = arrRes[1].data_info.sort((a,b) => a.stt - b.stt);

        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinXeHangMuc.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinXeHangMuc.getControl("ma_doi_tac").setValue("");
        ESUtil.genHTML("modalChonViTriDanhSachTemplate", "modalChonViTriDanhSach", { danh_sach: objDanhMuc.vi_tri });
        getPaging(1);
    });
    //Nhập thông tin xe hạng mục
    $("#btnNhapThongTinXeHangMuc").click(function () {
        _frmLuuThongTinXeHangMuc.resetForm();
        _frmLuuThongTinXeHangMuc.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinXeHangMuc.getControl("nv").setValue("XE");
        _frmLuuThongTinXeHangMuc.getControl("trang_thai").setValue(1);
        _frmLuuThongTinXeHangMuc.getControl("ma").readOnly(false);
        _frmLuuThongTinXeHangMuc.getControl("ten_alias").setValue("");
        $("#modal-user-log").html("");
        $("input.ten_alias").tagsinput("destroy");
        _frmLuuThongTinXeHangMuc.clearErrorMessage();
        _modalNhapXeHangMuc.show();
    })
    //Lưu thông tin xe hạng mục
    $("#btnLuuThongTinXeHangMuc").click(function () {
        if (_frmLuuThongTinXeHangMuc.isValid()) {
            var formData = _frmLuuThongTinXeHangMuc.getJsonData();
            formData.vi_tri = _frmLuuThongTinXeHangMuc.getControl('vi_tri').attr('data-val')
            if (formData.ten_alias.length > 500) {
                formData.ten_alias = formData.ten_alias.substr(0, 500);
            }
            _categoryvehicleListService.luuThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin danh sách xe hạng mục thành công.");
                    getPaging(1);
                    _modalNhapXeHangMuc.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    })
    //Xóa thông tin xe hạng mục
    $("#btnXoaThongTinXeHangMuc").click(function () {
        var formData = _frmLuuThongTinXeHangMuc.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa loại hình nghiệp vụ này không?", "", val => {
            _categoryvehicleListService.xoaThongTin(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin danh sách xe hạng mục thành công.");
                    getPaging(1);
                    _modalNhapXeHangMuc.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });     
    })
    //Export Excel thông tin xe hạng mục
    $("#btnExportExcelXeHangMuc").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.ma_mau_in = "ESCS_EXCEL_DS_XE_HANG_MUC";
        console.log(obj.ma_mau_in);
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    })
    //Màn hình tìm kiếm thông tin xe hạng mục
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $('#btnImportExcel').click(function () {
        _modalUploadExcel.show();
    });

    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });

    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData
        };
        _categoryvehicleListService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnChonViTri').click(function () {
        var target = _modalViTri.target;
        var checked = $("#modalChonViTriDanhSach .modalChonViTriItem:checked");
        var val = "";
        var text = "";
        if (checked && checked.length > 0) {
            checked.each(function () {
                var current = $(this).val();
                var viTri = objDanhMuc.vi_tri.where(n => n.ma == current).firstOrDefault();
                if (val == "") {
                    val = current;
                    text = viTri.ten;
                }
                else {
                    val += "," + current;
                    text += "- " + viTri.ten;
                }
            });
        }
        $(target).attr("data-val", val);
        $(target).val(text);
        _modalViTri.hide();
    });
})