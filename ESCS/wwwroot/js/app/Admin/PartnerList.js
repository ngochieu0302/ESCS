var objDanhMuc = {};

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _mappingHangMuc = new MappingHangMucService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _mappingDamageLevelService = new MappingDamageLevelService();
var _damageLevelService = new DamageLevelService();
var _garaListService = new GaraListService();

var _frmTimKiem = new FormService("frmTimKiem");

var _modalNhapMaDoiTac = new ModalService("modalNhapMaDoiTac");
var _frmLuuThongTinMaDoiTac = new FormService("frmLuuThongTinMaDoiTac");
var _frmSaveConfigOCR = new FormService("frmSaveConfigOCR");
var _frmSaveConfigCall = new FormService("frmSaveConfigCall");
var _frmSaveConfigMaps = new FormService("frmSaveConfigMaps");
var _frmSaveConfigSMS = new FormService("frmSaveConfigSMS");
var _frmSaveSetting = new FormService("frmSaveSetting");
var _frmCauHinhXe = new FormService("frmCauHinhXe");
var _frmMappingHangMuc = new FormService("frmMappingHangMuc");
var _frmSaveMucDoTT_AI = new FormService("frmSaveMucDoTT_AI");
var _frmMauIn = new FormService("frmMauIn");
var _frmSaveConfigAI = new FormService("frmSaveConfigAI");
var _frmSaveBaoGia = new FormService("frmSaveBaoGia");

var _dataHD = null;
var arrMaHangMuc = [];
var arrMaMucDoTT = [];

const IMAGE_DEFAULT = "/images/default.png";
const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên", width: "25%", headerSort: false },
    { field: "ten_tat", title: "Tên tắt", width: "10%", hozAlign: "center", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "27%", headerSort: false },
    { field: "mst", title: "Mã số thuế", width: "12%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "10%", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "domain", title: "Domain", width: "12%", headerSort: false }
];

var _gridViewDoiTac = new GridViewService("gridViewDoiTac", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _partnerListService.timKiemDoiTac(objTimKiem).then(res => {
        _gridViewDoiTac.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewDoiTac.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewDoiTac.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _dataHD = data;
    SetDefaultReset();
    _frmSaveConfigOCR.getControl('ma_doi_tac').val(data.ma);
    _frmSaveConfigCall.getControl('ma_doi_tac').val(data.ma);
    _frmSaveConfigMaps.getControl('ma_doi_tac').val(data.ma);
    _frmSaveConfigSMS.getControl('ma_doi_tac').val(data.ma);
    _frmSaveConfigAI.getControl('ma_doi_tac').val(data.ma);
    _frmSaveBaoGia.getControl('ma_doi_tac').val(data.ma);
    _frmSaveSetting.getControl('ma_doi_tac').val(data.ma);
    _frmMauIn.getControl('ma_doi_tac').val(data.ma);
    _frmCauHinhXe.getControl('ma_doi_tac').val(data.ma);
    _partnerListService.layThongTinChiTietDoiTac(data).then(res => {
        if (row !== undefined) {
            row.select();
            var objData = res.data_info;
            var objData_doi_tac = res.data_info.doi_tac;
            var objData_dv_ocr = res.data_info.dv_ocr;
            var objData_dv_call = res.data_info.dv_call;
            var objData_dv_google = res.data_info.dv_gg;
            var objData_dv_sms = res.data_info.dv_sms;
            var objData_dv_ai = res.data_info.dv_ai;
            var objData_dv_bao_gia = res.data_info.dv_bao_gia;
            var objData_dv_setting = res.data_info.dv_ud;
            var objData_ch_bt_xe = res.data_info.ch_bt_xe;

            _frmLuuThongTinMaDoiTac.getControl("ma").readOnly();
            _frmLuuThongTinMaDoiTac.setData(objData_doi_tac);
            _frmCauHinhXe.setData(objData_ch_bt_xe);

            _frmSaveConfigOCR.setData(objData_dv_ocr);
            if (objData_dv_ocr != null && objData_dv_ocr.ap_dung == 1 != objData_dv_ocr.ap_dung == 0) {
                $("#checkbox_tt_ocr").prop("checked", true);
            }
            else {
                $("#checkbox_tt_ocr").prop("checked", false);
            }
            $("#checkbox_tt_ocr").trigger("change");

            _frmSaveConfigCall.setData(objData_dv_call);
            if (objData_dv_call != null && objData_dv_call.ap_dung == 1 != objData_dv_call.ap_dung == 0) {
                $("#checkbox_tt_call").prop("checked", true);
            }
            else {
                $("#checkbox_tt_call").prop("checked", false);
            }
            $("#checkbox_tt_call").trigger("change");

            _frmSaveConfigMaps.setData(objData_dv_google);
            if (objData_dv_google != null && objData_dv_google.ap_dung == 1 != objData_dv_google.ap_dung == 0) {
                $("#checkbox_tt_gg").prop("checked", true);
            }
            else {
                $("#checkbox_tt_gg").prop("checked", false);
            }
            $("#checkbox_tt_gg").trigger("change");

            _frmSaveConfigSMS.setData(objData_dv_sms);
            if (objData_dv_sms != null && objData_dv_sms.trang_thai == "D") {
                $("#checkbox_tt_sms").prop("checked", true);
            }
            else {
                $("#checkbox_tt_sms").prop("checked", false);
            }
            $("#checkbox_tt_sms").trigger("change");

            _frmSaveConfigAI.setData(objData_dv_ai);
            if (objData_dv_ai != null && objData_dv_ai.ap_dung == 1 != objData_dv_ai.ap_dung == 0) {
                $("#checkbox_tt_ai").prop("checked", true);
            }
            else {
                $("#checkbox_tt_ai").prop("checked", false);
            }
            $("#checkbox_tt_ai").trigger("change");

            _frmSaveBaoGia.setData(objData_dv_bao_gia);
            if (objData_dv_bao_gia != null && objData_dv_bao_gia.ap_dung == 1 != objData_dv_bao_gia.ap_dung == 0) {
                $("#checkbox_tt_bao_gia").prop("checked", true);
            }
            else {
                $("#checkbox_tt_bao_gia").prop("checked", false);
            }
            $("#checkbox_tt_bao_gia").trigger("change");
            //_frmSaveSetting.setData(objData_dv_setting);
            $("#preview_file_anh_favicon").attr("src", IMAGE_DEFAULT);
            $("#preview_file_anh_dang_nhap").attr("src", IMAGE_DEFAULT);
            $("#preview_file_anh_ud").attr("src", IMAGE_DEFAULT);
            $("#preview_file_anh").attr("src", IMAGE_DEFAULT);
            _frmSaveSetting.getControl("url_anh_favicon").val("");
            _frmSaveSetting.getControl("url_anh_dang_nhap").val("");
            _frmSaveSetting.getControl("url_anh_ud").val("");
            //LOGO_DANG_NHAP,FAVICON, LOGO_WEB_APP,MAU_IN
            if (objData_dv_setting != null && objData_dv_setting.length > 0) {
                var objFavicon = objData_dv_setting.where(n => n.loai == "FAVICON").firstOrDefault();
                if (objFavicon != null) {
                    ESUtil.checkLoadImage("/" + objFavicon.url_anh, () => {
                        $("#preview_file_anh_favicon").attr("src", "/" + objFavicon.url_anh);
                        _frmSaveSetting.getControl("url_anh_favicon").val(objFavicon.url_anh);
                    });
                }
                var objDangNhap = objData_dv_setting.where(n => n.loai == "LOGO_DANG_NHAP").firstOrDefault();
                if (objDangNhap != null) {
                    ESUtil.checkLoadImage("/" + objDangNhap.url_anh, () => {
                        $("#preview_file_anh_dang_nhap").attr("src", "/" + objDangNhap.url_anh);
                        _frmSaveSetting.getControl("url_anh_dang_nhap").val(objDangNhap.url_anh);
                    });
                }
                var objApp = objData_dv_setting.where(n => n.loai == "LOGO_WEB_APP").firstOrDefault();
                if (objApp != null) {
                    ESUtil.checkLoadImage("/" + objApp.url_anh, () => {
                        $("#preview_file_anh_ud").attr("src", "/" + objApp.url_anh);
                        _frmSaveSetting.getControl("url_anh_ud").val(objApp.url_anh);
                    });
                }
            }
            var objData_dv_mau_in = objData_dv_setting.where(n => n.loai == "MAU_IN").firstOrDefault();
            _frmMauIn.setData(objData_dv_mau_in);
            if (objData_dv_mau_in != null) {
                ESUtil.checkLoadImage("/" + objData_dv_mau_in.url_anh, () => {
                    $("#preview_file_anh").attr("src", "/" + objData_dv_mau_in.url_anh);
                });
            }
            $("#preview_file_logo").attr("src", IMAGE_DEFAULT);
            if (objData.doi_tac.logo != undefined && objData.doi_tac.logo != null && objData.doi_tac.logo != "") {
                ESUtil.checkLoadImage("/" + objData.doi_tac.logo, () => {
                    $("#preview_file_logo").attr("src", "/" + objData.doi_tac.logo);
                });
            }
        }
        $('#home-tab').trigger('click');
        _modalNhapMaDoiTac.show();
        row.select();

    });
}
function hthiTab(tab) {
    $("#tabName").val(tab);
    if (tab == 'tabDichVuBaoGia') {
        drawTableBaoGia();
    }
}
function SetDefaultValue() {
    $('#tabDichVuOCR').find('input[type="text"]').prop('readonly', true);
    $('#tabDichVuOCR').find('select').prop('disabled', true);
    $('#tabDichVuCall').find('input[type="text"]').prop('readonly', true);
    $('#tabDichVuCall').find('select').prop('disabled', true);
    $('#tabDichVuGoogle').find('input[type="text"]').prop('readonly', true);
    $('#tabDichVuGoogle').find('select').prop('disabled', true);
    $('#tabDichVuSMS').find('input[type="text"]').prop('readonly', true);
    $('#tabDichVuSMS').find('select').prop('disabled', true);
    $("#tabDichVuUngDung").find('input[type="text"]').prop('readonly', true);
    $("#tabDichVuUngDung").find('select').prop('disabled', true);
    $("#tabDichVuAI").find('input[type="text"]').prop('readonly', true);
    $("#tabDichVuAI").find('select').prop('disabled', true);
    $("#tabDichVuBaoGia").find('input[type="text"]').prop('readonly', true);
    $("#tabDichVuBaoGia").find('select').prop('disabled', true);
}
function SetDefaultReset() {
    _frmLuuThongTinMaDoiTac.resetForm();
    _frmLuuThongTinMaDoiTac.clearErrorMessage();
    _frmSaveConfigOCR.resetForm();
    _frmSaveConfigOCR.clearErrorMessage();
    _frmSaveConfigCall.resetForm();
    _frmSaveConfigCall.clearErrorMessage();
    _frmSaveConfigMaps.resetForm();
    _frmSaveConfigMaps.clearErrorMessage();
    _frmSaveConfigSMS.resetForm();
    _frmSaveConfigSMS.clearErrorMessage();
    _frmSaveSetting.resetForm();
    _frmSaveSetting.clearErrorMessage();
    _frmMauIn.resetForm();
    _frmMauIn.clearErrorMessage();
    _frmCauHinhXe.resetForm();
    _frmCauHinhXe.clearErrorMessage();
    _frmSaveConfigAI.resetForm();
    _frmSaveConfigAI.clearErrorMessage();
    _frmSaveBaoGia.resetForm();
    _frmSaveBaoGia.clearErrorMessage();
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
            if (arrMaHangMuc.includes(obj.ma_hang_muc)) {
                arr.push(obj);
            }
        } else {
            arr.push(obj);
        }
    });
    return arr;
}
function getDataTableMDTT() {
    var arr = [];
    $("#tableMappingMDTT tr").each(function () {
        var ma = $(this).attr("row-val");
        if (ma.includes('.')) {
            ma = ma.split('').filter(n => n != '.').join('');
        }
        var obj = {
            ma_muc_do: $("#ma_muc_do_" + ma).val(),
            ten_muc_do: $("#ten_muc_do_" + ma).val(),
            thay_the_sc: $("#thay_the_sc_" + ma).val(),
            ma_mapping: $("#ma_mapping_" + ma).val(),
            ten_mapping: $("#ten_mapping_" + ma).val(),
            ten_tat_mapping: $("#ten_tat_mapping_" + ma).val()
        };
        if (obj.ma_mapping == "" || obj.ma_mapping == undefined || obj.ma_mapping == null) {
            if (arrMaMucDoTT.includes(obj.ma_muc_do)) {
                arr.push(obj);
            }
        } else {
            arr.push(obj);
        }
    });
    return arr;
}
function getDataTableBaoGia() {
    var arr = [];
    $("#tableNhapBaoGia tr").each(function () {
        var gara = $(this).attr("row-val");
        var obj = {
            gara: $("#gara_" + gara).val(),
            base_url: $("#base_url_" + gara).val(),
            api_access: $("#api_access_" + gara).val(),
            partner_code: $("#partner_code_" + gara).val(),
            secretkey: $("#secretkey_" + gara).val()
        };
        if (obj.gara == "" || obj.gara == undefined || obj.gara == null) {
            if (arrBaoGia.includes(obj.gara)) {
                arr.push(obj);
            }
        } else {
            arr.push(obj);
        }
    });
    return arr;
}
function setDefaultMappingHangMuc() {
    _frmMappingHangMuc.resetForm();
    _frmMappingHangMuc.clearErrorMessage();
    _frmMappingHangMuc.getControl("ma_doi_tac").readOnly(false);
    _frmMappingHangMuc.getControl("doi_tac_ai").setValue('FPT');
    _frmMappingHangMuc.getControl("hien_thi_app").setValue('C');
}
function setDefaultMucDoTT() {
    _frmSaveMucDoTT_AI.resetForm();
    _frmSaveMucDoTT_AI.clearErrorMessage();
    _frmSaveMucDoTT_AI.getControl("ma_doi_tac").readOnly(false);
    _frmSaveMucDoTT_AI.getControl("doi_tac_ai").setValue('FPT');
}
function drawTableMappingHangMuc() {
    var hthi_app = $('#hien_thi_app').val();
    var listMapping = [];
    var listHangMuc = objDanhMuc.hang_muc.where(n => n.ma_doi_tac === _dataHD.ma && (hthi_app == '' || n.hien_thi_app == hthi_app));
    _mappingHangMuc.getAll().then(res => {
        arrMaHangMuc = [];
        listMapping = res.data_info.where(n => n.ma_doi_tac == _dataHD.ma && n.doi_tac_ai == $('#doi_tac_ai').val());
        $.each(listMapping, function (index, value) {
            arrMaHangMuc.push(value.ma_hang_muc);
        });

        $.each(listHangMuc, function (index1, value1) {
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
}
function drawTableMucDoTT() {
    var listMapping = [];
    var lstMucDo = objDanhMuc.muc_do.where(n => n.ma_doi_tac === _dataHD.ma);
    _mappingDamageLevelService.getAll().then(res => {
        arrMaMucDoTT = [];
        listMapping = res.data_info.where(n => n.ma_doi_tac == _dataHD.ma && n.doi_tac_ai == $('#doi_tac_ai_muc_do').val());
        $.each(listMapping, function (index, value) {
            arrMaMucDoTT.push(value.ma_muc_do);
        });

        $.each(lstMucDo, function (index1, value1) {
            $.each(listMapping, function (index2, value2) {
                if (value1.ma == value2.ma_muc_do) {
                    lstMucDo[index1].ma_mapping = value2.ma_mapping;
                    lstMucDo[index1].ten_mapping = value2.ten_mapping;
                    lstMucDo[index1].ten_tat_mapping = value2.ten_tat_mapping;
                }
            });
        });

        ESUtil.genHTML("tableMucDo_AI_template", "tableMappingMDTT", { mdtt: lstMucDo }, function () {
            _frmSaveMucDoTT_AI.getControl("ma_doi_tac").fill('select2:select');
        });
    });
}
function drawTableBaoGia() {
    _partnerListService.layDsBaoGia({ ma_doi_tac: _dataHD.ma }).then(res => {
        ESUtil.genHTML("BaoGia_template", "tableNhapBaoGia", { data: res.data_info });
    });
}
function suaBaoGiaDichVu(json) {
    var obj = JSON.parse(json);
    _frmSaveBaoGia.resetForm();
    _frmSaveBaoGia.clearErrorMessage();
    _frmSaveBaoGia.setData(obj);
    if (obj.ap_dung == "1") {
        $("#checkbox_tt_bao_gia").prop("checked", true);
    }
}

$(document).ready(function () {
    SetDefaultValue();
    _service.all([
        _bankListService.layDsNganHang(),
        _partnerListService.layDsDoiTac(),
        _categoryvehicleListService.layDsHangMucXe(),
        _mappingHangMuc.getAll(),
        _damageLevelService.layDsMucDoTonThat(),
        _mappingDamageLevelService.getAll(),
        _garaListService.layDsGara()
    ]).then(arrRes => {
        objDanhMuc.ngan_hang = arrRes[0].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh = arrRes[0].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.doi_tac = arrRes[1].data_info;
        objDanhMuc.hang_muc = arrRes[2].data_info;
        objDanhMuc.mapping_hang_muc = arrRes[3].data_info;
        objDanhMuc.muc_do = arrRes[4].data_info;
        objDanhMuc.mapping_muc_do = arrRes[5].data_info;
        objDanhMuc.gara = arrRes[6].data_info;
        _frmLuuThongTinMaDoiTac.getControl("ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmSaveBaoGia.getControl("gara").setDataSource(objDanhMuc.gara, "ten", "ma", "Chọn gara", "");
        _frmSaveConfigSMS.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        getPaging(1);
    });
    _frmMappingHangMuc.getControl("hien_thi_app").addEventChange(val => {
        drawTableMappingHangMuc();
    });
    $("#btnNhapThongTinMaDoiTac").click(function () {
        $("#preview_file_anh_favicon").attr("src", IMAGE_DEFAULT);
        $("#preview_file_anh_dang_nhap").attr("src", IMAGE_DEFAULT);
        $("#preview_file_anh_ud").attr("src", IMAGE_DEFAULT);
        $("#preview_file_anh").attr("src", IMAGE_DEFAULT);
        SetDefaultReset();
        SetDefaultValue();
        $("#preview_file_logo").attr("src", IMAGE_DEFAULT);
        _frmLuuThongTinMaDoiTac.getControl("ma").readOnly(false);
        _modalNhapMaDoiTac.show();
        $('#home-tab').trigger('click');
    })
    $("#btnLuuThongTinMaDoiTac").click(function () {
        var tab = $("#tabName").val();
        if (tab == "tabThongTin") {
            if (_frmLuuThongTinMaDoiTac.isValid()) {
                var formData = _frmLuuThongTinMaDoiTac.getFormFileData();
                _partnerListService.luuThongTinDoiTac(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin đối tác thành công.");
                        getPaging(1);
                        _modalNhapMaDoiTac.hide();
                        _frmSaveConfigOCR.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveConfigCall.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveConfigMaps.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveConfigSMS.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveSetting.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveConfigAI.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmSaveBaoGia.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                        _frmMauIn.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuOCR") {
            if (_frmSaveConfigOCR.isValid()) {
                var formData = _frmSaveConfigOCR.getJsonData();
                formData.ap_dung = $("#checkbox_tt_ocr").is(":checked") ? 1 : 0;
                _partnerListService.saveConfigOCR(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ OCR thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuCall") {
            if (_frmSaveConfigCall.isValid()) {
                var formData = _frmSaveConfigCall.getJsonData();
                formData.ap_dung = $("#checkbox_tt_call").is(":checked") ? 1 : 0;
                _partnerListService.saveConfigCall(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ Video call thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuGoogle") {
            if (_frmSaveConfigMaps.isValid()) {
                var formData = _frmSaveConfigMaps.getJsonData();
                formData.ap_dung = $("#checkbox_tt_gg").is(":checked") ? 1 : 0;
                _partnerListService.saveConfigMaps(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ Google Maps thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuSMS") {
            if (_frmSaveConfigSMS.isValid()) {
                var formData = _frmSaveConfigSMS.getJsonData();
                formData.trang_thai = $("#checkbox_tt_sms").is(":checked") ? "D" : "K";
                _partnerListService.saveConfigSMS(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ SMS thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuAI") {
            if (_frmSaveConfigAI.isValid()) {
                var formData = _frmSaveConfigAI.getJsonData();
                formData.ap_dung = $("#checkbox_tt_ai").is(":checked") ? 1 : 0;
                _partnerListService.saveConfigAI(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuBaoGia") {
            if (_frmSaveBaoGia.isValid()) {
                var formData = _frmSaveBaoGia.getJsonData();
                formData.ap_dung = $("#checkbox_tt_bao_gia").is(":checked") ? 1 : 0;
                _partnerListService.saveConfigGara(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin dịch vụ thành công.");
                        _modalNhapMaDoiTac.show();
                        drawTableBaoGia();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabCaiDatMauIn") {
            if (_frmMauIn.isValid()) {
                var formData = _frmMauIn.getFormFileData();
                _partnerListService.saveConfigSetting(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Cài đặt mẫu in thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabDichVuUngDung") {
            if (_frmSaveSetting.isValid()) {
                var formData = _frmSaveSetting.getFormFileData();
                _partnerListService.saveConfigApp(formData).then(res => {
                    _notifyService.success("Cài đặt ứng dụng thành công.");
                    _modalNhapMaDoiTac.show();
                    _frmSaveSetting.getControl("url_anh_dang_nhap").val(res.url_anh_dang_nhap);
                    _frmSaveSetting.getControl("url_anh_favicon").val(res.url_anh_favicon);
                    _frmSaveSetting.getControl("url_anh_ud").val(res.url_anh_ud);
                });
            }
        }
        if (tab == "tabCauHinhXe") {
            if (_frmCauHinhXe.isValid()) {
                var formData = _frmCauHinhXe.getJsonData();
                _partnerListService.saveCauHinhXe(formData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin cấu hình xe thành công.");
                        _modalNhapMaDoiTac.show();
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            }
        }
        if (tab == "tabMappingHangMuc") {
            var obj = {
                ma_doi_tac: _dataHD.ma,
                doi_tac_ai: _frmMappingHangMuc.getControl('doi_tac_ai').getValue(),
                data: getDataTable()
            };
            _mappingHangMuc.luuThongTinHangMuc(obj).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalNhapMaDoiTac.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
        if (tab == "tabMucDoTonThat") {
            var obj = {
                ma_doi_tac: _dataHD.ma,
                doi_tac_ai: _frmSaveMucDoTT_AI.getControl('doi_tac_ai').getValue(),
                data: getDataTableMDTT()
            };
            _mappingDamageLevelService.saveMucDoTT_AI(obj).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    _notifyService.success("Lưu thông tin thành công.");
                    _modalNhapMaDoiTac.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $('#checkbox_tt_ocr').change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuOCR').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuOCR').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuOCR').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuOCR').find('select').prop('disabled', true);
        }
    });
    $("#checkbox_tt_call").change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuCall').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuCall').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuCall').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuCall').find('select').prop('disabled', true);
        }
    });
    $("#checkbox_tt_gg").change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuGoogle').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuGoogle').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuGoogle').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuGoogle').find('select').prop('disabled', true);
        }
    });
    $("#checkbox_tt_sms").change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuSMS').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuSMS').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuSMS').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuSMS').find('select').prop('disabled', true);
        }
    });
    $("#checkbox_tt_ai").change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuAI').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuAI').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuAI').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuAI').find('select').prop('disabled', true);
        }
    });
    $("#checkbox_tt_bao_gia").change(function () {
        if ($(this).is(':checked')) {
            $('#tabDichVuBaoGia').find('input[type="text"]').prop('readonly', false);
            $('#tabDichVuBaoGia').find('select').prop('disabled', false);
        } else {
            $('#tabDichVuBaoGia').find('input[type="text"]').prop('readonly', true);
            $('#tabDichVuBaoGia').find('select').prop('disabled', true);
        }
    });
    $("#btnXoaThongTinMaDoiTac").click(function () {
        var formData = _frmLuuThongTinMaDoiTac.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa đối tác này không?",
            "",
            val => {
                _notifyService.warning(
                    "Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
            });
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $("#file_logo, #file_anh_favicon, #file_anh_dang_nhap, #file_anh_ud, #file_anh").change(function () {
        var input = this;
        ESUtil.readURL(input, IMAGE_DEFAULT);
    })
    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#preview_file_anh').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    };
    $('#tabMappingHangMucClick').click(function () {
        setDefaultMappingHangMuc();
        drawTableMappingHangMuc();
    });
    $('#tabMappingMucDoTTClick').click(function () {
        setDefaultMucDoTT();
        drawTableMucDoTT();
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
    $("#inputSearchMDTT").keyup(function () {
        setTimeout(() => {
            var val = $(this).val().toLowerCase();
            if (val == "") {
                $("#tableMappingMDTT tr[data-search]").show();
                return;
            }
            $("#tableMappingMDTT tr[data-search]").hide();
            $("#tableMappingMDTT tr[data-search*='" + val + "']").show();
        }, 500);
    });
    $("#tabBaoGiaClick").click(function (data) {
        $("#btnThemMoiBaoGia").click(function () {
            _frmSaveBaoGia.resetForm();
            _frmSaveBaoGia.clearErrorMessage();
            $("#checkbox_tt_bao_gia").setValue("1");
            $("#checkbox_tt_bao_gia").prop("checked", true);
            _frmSaveBaoGia.getControl('ma_doi_tac').val(_frmLuuThongTinMaDoiTac.getControl("ma").val());
        })
        ESUtil.genHTML("BaoGia_template", "tableNhapBaoGia", { data: data });
    });
});