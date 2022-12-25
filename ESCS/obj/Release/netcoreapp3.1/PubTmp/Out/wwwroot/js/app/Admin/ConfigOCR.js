var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _configOCRService = new ConfigOCRService();
var dateNow = new Date().ddmmyyyy();
var _frmAddOCR = new FormService("frmAddOCR");
var _frmEdit = new FormService("frmEdit");
var _frmTimKiem = new FormService("FrmSearchConfigOCR");
var _frmThemDvOcr = new FormService("frmThemDvOcr");
var _modalConfigOcr = new ModalService("modalConfigOcr");
var _btnLuuCauHinh = new ButtonService("btnLuuCauHinh");
var _modalAddOCR = new ModalService("modalAddOCR");

var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var objData = null; 

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false },
    { field: "ten_cnhanh", title: "Chi nhánh", hozAlign: "center", width: "15%", headerSort: false },
    { field: "ngay_hl_hthi", title: "Ngày hiệu lực", hozAlign: "center", width: "10%", headerSort: false },
    { field: "ngay_kt_hthi", title: "Ngày kết thúc", hozAlign: "center", width: "10%", headerSort: false },
    { field: "base_url", title: "Base URL", width: "20%", headerSort: false },
    { field: "api_key", title: "Api key", width: "20%", headerSort: false },
    { field: "ap_dung_hthi", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
];
var configOcrColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_doi_tac", title: "Đối tác", width: "44%", headerSort: false },
    { field: "ma_chi_nhanh", title: "Chi nhánh", width: "25%", headerSort: false },
    { field: "base_url", title: "Base Url", width: "25%", headerSort: false }
];

var _gridViewConfigOCR = new GridViewService("gridViewConfigOCR", configColumn, getPaging, rowClick);

function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _configOCRService.timKiemPTrang(objTimKiem).then(res => {
            _gridViewConfigOCR.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewConfigOCR.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewConfigOCR.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    objData = data;
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, ma_chi_nhanh: data.ma_chi_nhanh, ngay_ht: data.ngay_ht };
    console.log(objGetDetail);
    _configOCRService.xemChiTietConfigOcr(objGetDetail).then(res => {
        console.log(res);
        var objData = res.data_info;
        if (row !== undefined) {
            row.select();
            ESUtil.genHTML("templateThongTinDvOcr", "ThongTinDvOcr", objData);
            _modalConfigOcr.show();
        }
    });
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTacQTHT(), _branchListService.layDsChiNhanhQTHT()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmAddOCR.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmAddOCR.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    $("#btnAddORC").click(function () {
        $("#modalAddConfig_body").html("");
        _frmAddOCR.resetForm();
        _frmAddOCR.clearErrorMessage();
        $(".card-title-bg").show();
        _modalAddOCR.show();
    });

    $("#btnAddConfig").click(function () {
        ESUtil.appendHTML("dich_vu_ocr_template", "modalAddConfig_body",
            {
                ma_doi_tac: $("#ma_doi_tac").val(),
                ma_chi_nhanh: objDanhMuc.chi_nhanh,
                //_frmAddOCR.getControl("ma_doi_tac").addEventChange(val => {
                //    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
                //    _frmAddOCR.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
                //})
            }, () => {
                $('#modalAddConfig_body select.select2').select2();
                $('#modalAddConfig_body .datepicker').daterangepicker({
                    singleDatePicker: true,
                    showDropdowns: true,
                    locale: {
                        format: "DD/MM/YYYY"
                    },
                    drops: $(this).data('drops')
                });
                $("#modalAddConfig_body .delete_config").click(function () {
                    var formData = _frmAddOCR.getJsonData();
                    _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình dịch vụ Ocr này không?", "", val => {
                        if (true) {
                            $(this).closest("tr").remove();
                        }
                    });

                });
                $("#modalAddConfig_body .check_config").click(function () {
                    _notifyService.success("Đang sử dụng");
                    $(this).closest("tr").find("input").each(function (el) {
                        if ($(this).hasClass("ap_dung")) {
                            $(this).val('1');
                        }
                    });
                });
                $("#modalAddConfig_body .remove_config").click(function () {
                    _notifyService.warning("Ngưng sử dụng");
                    $(this).closest("tr").find("input").each(function (el) {
                        if ($(this).hasClass("ap_dung")) {
                            $(this).val('0');
                        }
                    });
                });
            });
    });

    $("#btnEditConfig").click(function () {
        _frmAddOCR.resetForm();
        _modalConfigOcr.hide();
        $(".card-title-bg").hide();
        _modalAddOCR.show();
        console.log(objData);
        _frmAddOCR.setData(objData);
        $("#modalAddConfig_body .check_config").click(function () {
            _notifyService.success("Đang sử dụng");
            $(this).closest("tr").find("input").each(function (el) {
                if ($(this).hasClass("ap_dung")) {
                    $(this).val('1');
                }
            });
        });
        $("#modalAddConfig_body .remove_config").click(function () {
            _notifyService.warning("Ngưng sử dụng");
            $(this).closest("tr").find("input").each(function (el) {
                if ($(this).hasClass("ap_dung")) {
                    $(this).val('0');
                }
            });
        });
    });

    $("#btnSaveConfig").click(function () {
        var otArr = [];
        $('#tblCauHinh tbody tr').each(function (e) {
            var json = {
                /*ma_doi_tac: "", hm_gplx: "", hm_dky_xe: "", hm_dkiem_xe: "",*/
                ma_chi_nhanh_dv: "", base_url_dv: "", api_key_dv: "", ap_dung: "", ngay_hl_dv: 0, ngay_kt_dv: 0
            };
            x = $(this).children();
            x.each(function (i) {
                $(this).find("input").each(function (el) {
                    if ($(this).hasClass("hm_gplx")) {
                        json["hm_gplx"] = $(this).val();
                    }
                });
                $(this).find("input").each(function (el) {
                    if ($(this).hasClass("base_url_dv")) {
                        json["base_url_dv"] = $(this).val();
                    }
                    if ($(this).hasClass("api_key_dv")) {
                        json["api_key_dv"] = $(this).val();
                    }
                    if ($(this).hasClass("ap_dung")) {
                        json["ap_dung"] = $(this).val();
                    }
                });
                $(this).find("select").each(function (el) {
                    if ($(this).hasClass("ma_chi_nhanh_dv")) {
                        json["ma_chi_nhanh_dv"] = $(this).val();
                    }
                });
                $(this).find(".ngay_hl_dv").each(function (el) {
                    json["ngay_hl_dv"] = $(this).val().dateToNumber();
                });
                $(this).find(".ngay_kt_dv").each(function (el) {
                    json["ngay_kt_dv"] = $(this).val().dateToNumber();
                });
            });
            otArr.push(json);
        });
        if (_frmAddOCR.isValid()) {
            var obj = _frmAddOCR.getJsonData();
            obj.ma_doi_tac = $("#ma_doi_tac").val();
            //obj.ma_doi_tac = ESCS_MA_DOI_TAC;
            //objDanhMuc.chi_nhanh = arrRes[1].data_info;
            obj.arr = otArr;
            console.log(otArr);
            for (var i = 0; i < obj.arr.length; i++) {
                if (obj.arr[i].ma_doi_tac == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn đối tác cấu hình dịch vụ.");
                    return;
                }
                if (obj.arr[i].ma_chi_nhanh == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn chi nhánh cấu hình dịch vụ.");
                    return;
                }
                if (obj.arr[i].base_url == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn Base Url.");
                    return;
                }
                if (obj.arr[i].api_key == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn Api key.");
                    return;
                }
                if (obj.arr[i].ngay_hl == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn ngày hiệu lực.");
                    return;
                }
                if (obj.arr[i].ngay_kt == "") {
                    _notifyService.error("Dòng " + (i + 1) + " - Chưa chọn ngày kết thúc.");
                    return;
                }
            }
            _configOCRService.saveConfigOCR(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _modalAddOCR.hide();
                getPaging(1);
                _notifyService.success("Cấu hình dịch vụ OCR thành công.");
            });
        }
    });

    $(".delete_config").click(function () {
        $(this).closest("tr").remove();
    });

    $("#btnDeleteConfig").click(function () {
        //_notifyService.confirmDelete("Bạn có chắc muốn xóa dịch vụ Ocr này không?", "", val => {
        //    _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        //});

        var formData = _frmAddOCR.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dịch vụ Ocr này không?", "", val => {
            _configOCRService.deleteConfig(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin dịch vụ Ocr thành công.");
                    getPaging(1);
                    _modalConfigOcr.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    })

    $("#btnSearch").click(function () {
        getPaging(1);
    });

    getPaging(1);
});