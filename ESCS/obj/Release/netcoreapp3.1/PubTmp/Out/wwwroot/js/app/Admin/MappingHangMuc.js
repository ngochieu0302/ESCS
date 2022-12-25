var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _mappingHangMuc = new MappingHangMucService();
var _categoryvehicleListService = new CategoryvehicleListService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveCode = new FormService("frmSaveCode");
var _modalNhapCode = new ModalService("modalNhapCode");
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_hang_muc", title: "Mã hạng mục", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_hang_muc", title: "Tên hạng mục", width: "20%", headerSort: false },
    { field: "ma_mapping_ai", title: "Mã mapping AI", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_mapping_ai", title: "Tên mapping AI", width: "20%", headerSort: false },
    { field: "ten_tat_mapping_ai", title: "Tên tắt", width: "15%", headerSort: false },
    { field: "doi_tac_ai", title: "Đối tác AI", width: "15%", headerSort: false, hozAlign: "center" },
    { field: "ma_doi_tac", title: "Đối tác", width: "20%", headerSort: false }
];

var _gridViewCode = new GridViewService("gridViewCode", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _mappingHangMuc.getPaging(objTimKiem).then(res => {
        _gridViewCode.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
}
function getDataTable() {
    var arr = [];
    $("#tableNhapMapping tr").each(function () {
        var ma = $(this).attr("row-val");
        var obj = {
            ma_hang_muc: $("#ma_hang_muc_" + ma).val(),
            ten_hang_muc: $("#ten_hang_muc_" + ma).val(),
            ma_mapping_ai: $("#ma_mapping_ai_" + ma).val(),
            ten_mapping_ai: $("#ten_mapping_ai_" + ma).val(),
            ten_tat_mapping_ai: $("#ten_tat_mapping_ai_" + ma).val()
        };
        if (obj.ma_mapping_ai == "" || obj.ma_mapping_ai == undefined || obj.ma_mapping_ai == null) {
            // nothing
        } else {
            arr.push(obj);
        }
    });
    return arr;
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _categoryvehicleListService.layDsHangMucXe(),
        _mappingHangMuc.getAll()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.hang_muc = arrRes[1].data_info;
        objDanhMuc.mapping_hang_muc = arrRes[2].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, 'ten', 'ma', 'Chọn đối tác', '');
        _frmSaveCode.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, 'ten', 'ma', 'Chọn đối tác', '');
        getPaging(1);
    });
    _frmSaveCode.getControl('ma_doi_tac').addEventChange(val => {
        var listHangMuc = objDanhMuc.hang_muc.where(n => n.ma_doi_tac === val);
        var listMapping = objDanhMuc.mapping_hang_muc.where(n => n.ma_doi_tac == val && n.doi_tac_ai === $('#doi_tac_ai').val());
        $.each(listHangMuc, function(index1, value1) {
            $.each(listMapping, function (index2, value2) {
                if (value1.ma == value2.ma_hang_muc) {
                    listHangMuc[index1].ma_mapping_ai = value2.ma_mapping_ai;
                    listHangMuc[index1].ten_mapping_ai = value2.ten_mapping_ai;
                    listHangMuc[index1].ten_tat_mapping_ai = value2.ten_tat_mapping_ai;
                }
            });
        });

        ESUtil.genHTML("HangMuc_template", "tableNhapMapping", { hang_muc: listHangMuc });
    });
    $("#btnNhapThongTinCode").click(function () {
        _frmSaveCode.resetForm();
        _frmSaveCode.clearErrorMessage();
        _frmSaveCode.getControl("ma_doi_tac").readOnly(false);
        _frmSaveCode.getControl("doi_tac_ai").setValue('FPT');
        _modalNhapCode.show();
        ESUtil.genHTML("HangMuc_template", "tableNhapMapping", { hang_muc: [] });
    });
    $('#btnSaveCode').click(function () {
        var obj = {
            ma_doi_tac: _frmSaveCode.getControl('ma_doi_tac').getValue(),
            doi_tac_ai: _frmSaveCode.getControl('doi_tac_ai').getValue(),
            data: getDataTable()
        };
        _mappingHangMuc.luuThongTinHangMuc(obj).then(res => {
            if (res.state_info.status === "OK") {
                getPaging(1);
                _notifyService.success("Lưu thông tin thành công.");
                _modalNhapCode.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#inputSearch").keyup(function () {
        setTimeout(() => {
            var val = $(this).val().toLowerCase();
            if (val == "") {
                $("#tableNhapMapping tr[data-search]").show();
                return;
            }
            $("#tableNhapMapping tr[data-search]").hide();
            $("#tableNhapMapping tr[data-search*='" + val + "']").show();
        }, 500);
    });
});

