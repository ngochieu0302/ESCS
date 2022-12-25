var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _damageLevelService = new DamageLevelService();
var _mappingDamageLevelService = new MappingDamageLevelService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmSaveMucDoTT_AI = new FormService("frmSaveMucDoTT_AI");
var _modalNhap = new ModalService("modalNhap");

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac", title: "Đối tác", width: "15%", align: "center", headerSort: false },
    { field: "doi_tac_ai", title: "Đối tác AI", width: "15%", headerSort: false },
    { field: "ma_muc_do", title: "Mã mức độ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_muc_do", title: "Tên mức độ", width: "20%", headerSort: false },
    { field: "ma_mapping", title: "Mã mapping", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_mapping", title: "Tên mapping", width: "20%", headerSort: false }
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _mappingDamageLevelService.timKiemPTrang(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
};

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
};

function getDataTable() {
    var arr = [];
    $("#tableMapping tr").each(function () {
        var ma = $(this).attr("row-val");
        if (ma.includes('.')) {
            ma = ma.split('').filter(n => n != '.').join('');
        }
        var obj = {
            ma_muc_do: $("#ma_muc_do_" + ma).val(),
            ten_muc_do: $("#ten_muc_do_" + ma).val(),
            ma_mapping: $("#ma_mapping_" + ma).val(),
            ten_mapping: $("#ten_mapping_" + ma).val(),
            ten_tat_mapping: $("#ten_tat_mapping_" + ma).val()
        };
        if (obj.ma_mapping == "" || obj.ma_mapping == undefined || obj.ma_mapping == null) {
            // nothing
        } else {
            arr.push(obj);
        }
    });
    return arr;
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTacQTHT(),
        _damageLevelService.layDsMucDoTonThat(),
        _mappingDamageLevelService.getAll()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.muc_do = arrRes[1].data_info;
        objDanhMuc.mapping_muc_do = arrRes[2].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmSaveMucDoTT_AI.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
    })
    _frmSaveMucDoTT_AI.getControl("ma_doi_tac").addEventChange(val => {
        var lstMucDo = objDanhMuc.muc_do.where(n => n.ma_doi_tac === val);
        var listMapping = objDanhMuc.mapping_muc_do.where(n => n.ma_doi_tac == val);
        $.each(lstMucDo, function (index1, value1) {
            $.each(listMapping, function (index2, value2) {
                if (value1.ma == value2.ma_muc_do) {
                    lstMucDo[index1].ma_mapping = value2.ma_mapping;
                    lstMucDo[index1].ten_mapping = value2.ten_mapping;
                    lstMucDo[index1].ten_tat_mapping = value2.ten_tat_mapping;
                }
            });
        });
        ESUtil.genHTML("tableMucDo_AI_template", "tableMapping", { mdtt: lstMucDo });

    });

    $("#btnNhap").click(function () {
        _frmSaveMucDoTT_AI.resetForm();
        _frmSaveMucDoTT_AI.clearErrorMessage();
        _frmSaveMucDoTT_AI.getControl("ma_doi_tac").readOnly(false);
        _frmSaveMucDoTT_AI.getControl("doi_tac_ai").setValue('FPT');
        ESUtil.genHTML("tableMucDo_AI_template", "tableMapping", { mdtt: [] });
        _modalNhap.show();
    })

    $("#btnSave").click(function () {
        var obj = {
            ma_doi_tac: _frmSaveMucDoTT_AI.getControl('ma_doi_tac').getValue(),
            doi_tac_ai: _frmSaveMucDoTT_AI.getControl('doi_tac_ai').getValue(),
            data: getDataTable()
        };
        console.log(obj);
        _mappingDamageLevelService.saveMucDoTT_AI(obj).then(res => {
            if (res.state_info.status === "OK") {
                getPaging(1);
                _notifyService.success("Lưu thông tin thành công.");
                _modalNhap.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    })

    $("#btnTimKiem").click(function () {
        getPaging(1);
    })

    getPaging(1);
})