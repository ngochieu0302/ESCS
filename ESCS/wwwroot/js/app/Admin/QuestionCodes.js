var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _questionCodesService = new QuestionCodesService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmLuuThongTinCauHoi = new FormService("frmLuuThongTinCauHoi");
var _modalNhapCauHoi = new ModalService("modalNhapCauHoi");

const GRID_HO_SO_SO_DONG = 14;

var arrLoai = [
    { ma: "TNDS", ten: "TNDS", nv: "XE" },
    { ma: "NNTX", ten: "Người ngồi trên xe", nv: "XE" },
    { ma: "HHTX", ten: "Hàng hóa trên xe", nv: "XE" },
    { ma: "VCX", ten: "Vật chất xe", nv: "XE" },
    { ma: "CN01", ten: "Bảo hiểm sức khỏe", nv: "NG" },
    { ma: "CN02", ten: "Bảo hiểm tai nạn", nv: "NG" },
    { ma: "CN03", ten: "Bảo hiểm du lịch quốc tế", nv: "NG" },
    { ma: "CN04", ten: "Bảo hiểm Ung thư", nv: "NG" }
]

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nv_ct_hthi", title: "Loại", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "noi_dung", title: "Nội dung", width: "40%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "17%", headerSort: false }
];

var _gridViewQuestionCodes = new GridViewService("gridViewQuestionCodes", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _questionCodesService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewQuestionCodes.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewQuestionCodes.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewQuestionCodes.addRowEmpty(GRID_HO_SO_SO_DONG);
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
    _questionCodesService.xemChiTietCauHoi(data).then(res => {
        if (row !== undefined) {
            row.select();
        }
        var objDatact = res.data_info;
        _frmLuuThongTinCauHoi.clearErrorMessage();
        _frmLuuThongTinCauHoi.setData(objDatact);
        $("#modal-user-log").html("(" + objDatact.nsd + " - " + objDatact.ngay + ")");
        _frmLuuThongTinCauHoi.getControl("nv").trigger("select2:select");
        _frmLuuThongTinCauHoi.getControl("nv_ct").setValue(objDatact.nv_ct);
        _frmLuuThongTinCauHoi.getControl("ma_doi_tac").readOnly();
        _frmLuuThongTinCauHoi.getControl("ma").readOnly();
        _modalNhapCauHoi.show();
    });
};

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac()]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn loại", "");
        _frmLuuThongTinCauHoi.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHoi.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn loại", "");
    });
    _frmTimKiem.getControl("nv").addEventChange(val => {
        var arr = arrLoai.where(n => n.nv == val);
        _frmTimKiem.getControl("nv_ct").setDataSource(arr, "ten", "ma", "Chọn loại", "");
    });
    _frmLuuThongTinCauHoi.getControl("nv").addEventChange(val => {
        var arr = arrLoai.where(n => n.nv == val);
        _frmLuuThongTinCauHoi.getControl("nv_ct").setDataSource(arr, "ten", "ma", "Chọn loại", "");
    });
    $("#btnAddQuestionCodes").click(function () {
        _frmLuuThongTinCauHoi.resetForm();
        _frmLuuThongTinCauHoi.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmLuuThongTinCauHoi.getControl("ma_doi_tac").readOnly(false);
        _frmLuuThongTinCauHoi.clearErrorMessage();
        $("#modal-user-log").html("");
        _modalNhapCauHoi.show();
    });
    $("#btnLuuThongTinCauHoi").click(function () {
        if (_frmLuuThongTinCauHoi.isValid()) {
            var formData = _frmLuuThongTinCauHoi.getJsonData();
            _questionCodesService.saveCauHoi(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin câu hỏi thành công.");
                    getPaging(1);
                    _modalNhapCauHoi.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnXoaCauHoi").click(function () {
        var formData = _frmLuuThongTinCauHoi.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa câu hỏi này không?", "", val => {
            _questionCodesService.deleteCauHoi(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa câu hỏi thành công.");
                    getPaging(1);
                    _modalNhapCauHoi.hide();
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
});