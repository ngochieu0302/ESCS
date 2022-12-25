var _service = new Service();
var _carService = new CarService();
var _frmTimKiemHĐ = new FormService("frmTimKiemHĐ");
var _frmGCN = new FormService("frmGCNXE");
var _frmKH = new FormService("frmKH");
var _frmHopDong = new FormService("frmHopDong");
var _modalMap = new ModalMapService("modalMap");
var _frmToaDoAnh = new FormService("frmToaDoAnh");
var _danhmuc = null;
var _dataHD = null;
var _dataGCN = null;
var _dataDK = null;
var _checkChange = false;
var _notifyService = new NotifyService();
var _navTabHopDong = new NavTabService("navTabHopDong", ["tabTimKH", "tabThongTinHD"]);
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _arrColumn = [];
var _arrField = 'ten,dchi,gcn,bien_xe,so_khung,so_may,hang_xe,hieu_xe,loai_xe,nam_sx,' +
    'so_cho,trong_tai,md_sd,gia_tri,dkbs,gio_hl,ngay_hl,gio_kt,ngay_kt,loai,tien_vc,phi_vc,ktru,' +
    'mien_thuong,tien_bb,phi_bb,tien_hh,phi_hh,tien_nn,phi_nn';
// Creatby : Namnt
var objDanhMuc = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ngay_cap", title: "Ngày cấp", width: "10%", hozAlign: "center", headerSort: false },
    { field: "kieu_hd_ten", title: "Kiểu hợp đồng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Chi nhánh", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số hợp đồng", width: "15%", hozAlign: "left", headerSort: false },
    //{ field: "so_hd_goc", title: "Số hợp đồng gốc", width: "180", hozAlign: "left", headerSort: false },
    { field: "ten", title: "Tên khách", width: "20%", hozAlign: "left", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "30%", hozAlign: "left", headerSort: false }
];

function showWindowEdit(data, row) {
    _windowOpen('car-contract-modal', 'open');

    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }

    _carService.get_gcn_lke(data).then(res => {
        _dataHD = res.data_info.hd[0];
        $("#frm_xe_ttkhachhang").bindJsonToHtml(res.data_info.hd[0]);
        $("#frm_xe_ttdoitac").bindJsonToHtml(res.data_info.hd[0]);

        _frmKH.setData(res.data_info.hd[0]);
        _frmHopDong.setData(res.data_info.hd[0]);

        _frmGCN.getControl("loai_xe").setDataSource(jsonFilter(_danhmuc.loai_xe, 'ma_doi_tac', _dataHD.ma_doi_tac), "ten", "ma", "Chọn loại xe", "");
        _frmGCN.getControl("hang_xe").setDataSource(jsonFilter(_danhmuc.hang_xe, 'ma_doi_tac', _dataHD.ma_doi_tac), "ten", "ma", "Chọn hãng xe", "");
        _frmGCN.getControl("hang_xe").change();
        _dataGCN = res.data_info.gcn;
        _dataDK = res.data_info.dk;
        inittableGCN();
        loadDetailDongTai();
        _HDBHCar.showStep('tabTimKH');
        $('#fullWidthModalLabel').html("Số hợp đồng: " + _dataHD.so_hd);
        if (row !== undefined) {
            row.select();
        }
        getAnhThumnail();
    });
};

function loadDetailDongTai() {
    var data = new Object();
    data.so_id = _dataHD.so_id;
    data.so_id_dt = 0;
    data.ma_doi_tac = _dataHD.ma_doi_tac;
    data.ma_chi_nhanh = _dataHD.ma_chi_nhanh;
    data.phong = _dataHD.phong;

    _carService.dongtai_lke(data).then(res => {
        inittableDoTai(res.data_info);
    });
};

var _gridViewTimKiem = new GridViewService("gridViewTimKiem", configColumn, getPagingTimkiem, showWindowEdit);
function getPagingTimkiem(trang) {
    var objTimKiem = _frmTimKiemHĐ.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _carService.timkiemHD(objTimKiem).then(res => {
        _gridViewTimKiem.setDataSource(res, trang);
    });
}

function inittableDK() {
    var object = [];
    var loai_hinh = _frmGCN.getControl('loai').val();
    var so_id_dt = parseInt(_frmGCN.getControl('so_id_dt').val());
    if (isNaN(so_id_dt)) so_id_dt = 0;
    $.each(_danhmuc.lh_nv, function (index, item) {
        if (item.ma_doi_tac == _dataHD.ma_doi_tac) {
            var check = true;
            item.so_id_dt = 0;
            $.each(_dataDK, function (index1, item1) {
                if (item.lh_nv == item1.lh_nv && item1.so_id_dt == so_id_dt) {
                    object.push(item1);
                    check = false;
                }
            });

            if (check) {
                item.so_id_dt = so_id_dt;
                object.push(item);
            }
        }
    });

    //var object = JSON.parse(JSON.stringify(_danhmuc.lh_nv));
    //$.extend(true, object, _dataDK);

    var data = jsonFilter(object, 'loai', loai_hinh);

    var configColumnDK = [
        ["lh_nv", "", "0%", "hidden"],
        ["thue", "", "0%", "hidden"],
        ["dkbs", "", "0%", "hidden"],
        ["ten", "Sản phẩm tham gia", "30%", "string_disable"],
        ["tien", "Tiền BH", "15%", "int_edit"],
        ["mien_thuong", "Miễn thường", "13%", loai_hinh == 'TN' ? "checkbox_edit" : "hidden"],
        ["ktru", "Khấu trừ", "15%", loai_hinh == 'TN' ? "int_edit" : "hidden"],
        ["tl_phi", "TL Phí", "10%", "float_edit"],
        ["phi", "Phí", "15%", "int_edit"]
    ];

    _gridWidget.create(data, "table-data-gcndk", configColumnDK, '100%', '200');

    $("#table-data-gcndk").on('cellvaluechanged', function (event) {
        var args = event.args;
        var datafield = event.args.datafield;
        var rowBoundIndex = args.rowindex;
        var value = args.newvalue;
        var oldvalue = args.oldvalue;
        var data = $('#table-data-gcndk').jqxGrid('getrowdata', rowBoundIndex);

        if (!check_giaxe()) {
            data.tien = _frmGCN.getControl('gia_tri').val();
            $('#table-data-gcndk').jqxGrid('updaterow', rowBoundIndex, data);
        }
    });
};

function check_giaxe() {
    var data_dk = $("#table-data-gcndk").jqxGrid('getrows');
    var check = true;
    $.each(data_dk, function (index, item) {
        if (item.lh_nv == 'XE05' && item.tien > parseInt(_frmGCN.getControl('gia_tri').val().replace(/,/g, ''))) {
            _notifyService.error("Tiền bảo hiểm vật chất không quá giá trị xe!");
            check = false;
        }
    });
    return check;
};

function inittableDoTai(data) {
    var configColumnDK = [
        ["ma_doi_tac", "", "0%", "hidden"],
        ["so_id", "", "0%", "hidden"],
        ["kieu", "Kiểu", "80", "combobox_edit"],
        ["so_id_dt", "Biển xe/số khung/số máy", "200", "combobox_edit"],
        ["lh_nv", "Loại hình nghiệp vụ", "200", "combobox_edit"],
        ["phuong_thuc", "Phương thức", "90", "combobox_edit"],
        ["doi_tac_dong", "Đối tác đồng", "120", "combobox_edit"],
        ["tl_dong", "Tỷ lệ đồng", "70", "float_edit"],
        ["tl_tai_cd", "Tỷ lệ tái cố định", "90", "float_edit"],
        ["tl_tai_tt", "Tỷ lệ tái tạm thời", "100", "float_edit"]
    ];

    _gridWidget.create(data, "table-data-do-tai", configColumnDK, '95%', '430', 'bindingComboDOTAI');
    _gridWidget.initNullRow("table-data-do-tai", 10);

    $("#table-data-do-tai").on('cellvaluechanged', function (event) {
        var args = event.args;
        var datafield = event.args.datafield;
        var rowBoundIndex = args.rowindex;
        var value = args.newvalue;
        var oldvalue = args.oldvalue;
        var data = $('#table-data-do-tai').jqxGrid('getrowdata', rowBoundIndex);

        if (datafield == 'tl_dong' || datafield == 'tl_tai_cd' || datafield == 'tl_tai_tt') {
            if (value > 100) {
                eval('data.' + datafield + '=100;');
                _notifyService.error("Tỷ lệ từ 0 - 100!");
                $('#table-data-do-tai').jqxGrid('updaterow', rowBoundIndex, data);
            }
            if (value < 0) {
                eval('data.' + datafield + '=0;');
                _notifyService.error("Tỷ lệ từ 0 - 100!");
                $('#table-data-do-tai').jqxGrid('updaterow', rowBoundIndex, data);
            }
        }
    });
};

function bindingComboDOTAI(field) {
    var jsonxe = [];
    var jsonlhnv = [];
    if (field == 'so_id_dt') {
        $.each(_dataGCN, function (index, item) {
            var object = [];
            object.ma = item.so_id_dt;
            object.ten = item.bien_xe + '/' + item.so_khung + '/' + item.so_may;
            jsonxe.push(object);
        });
        return jsonxe;
    } else if (field == 'lh_nv') {
        var data = $('#table-data-do-tai').jqxGrid('getrowdata', $('#table-data-do-tai').jqxGrid('selectedrowindex'));
        $.each(_dataDK, function (index, item) {
            if (item.so_id_dt == data.so_id_dt) {
                var object = [];
                object.ma = item.lh_nv;
                object.ten = item.ten;
                jsonlhnv.push(object);
            }
        });
        return jsonlhnv;
    } else if (field == 'kieu') {
        var data = [{ ma: 'Leader', ten: 'Leader' }, { ma: 'Follow', ten: 'Follow' }];
        return data;
    } else if (field == 'phuong_thuc') {
        var data = [{ ma: 'NHABH', ten: 'Cty bảo hiểm' }, { ma: 'NOIBO', ten: 'Đồng nội bộ' }];
        return data;
    } else if (field == 'doi_tac_dong') {
        var data = $('#table-data-do-tai').jqxGrid('getrowdata', $('#table-data-do-tai').jqxGrid('selectedrowindex'));
        if (data.phuong_thuc == 'NHABH')
            return _danhmuc.nhabh;
        else
            return _danhmuc.chi_nhanh;
    }
    return null;
};

function _eventDKBS() {
    var dkbs = '';
    $("input:checkbox[name='HD_DKBS']:checked").each(function () {
        dkbs += ',' + $(this).val();
    });
    dkbs = dkbs.replace(',', '');
    $("input[name='dkbs']").val(dkbs);
};

function _openDKBS() {
    $('#jqxPopover').jqxPopover('open');
};

function inittableGCN() {
    var data = _dataGCN;

    var configColumn = [
        //["so_id", "", "", "number"],
        //["ma_chi_nhanh", "", "", "string"],
        //["ma_doi_tac", "", "", "string"],
        //["so_id_dt", "", "", "string"],
        ["gcn", "GCN", "40%", "string"],
        ["bien_xe", "Biển xe", "60%", "string"]
    ];

    console.log(data);
    _gridWidget.create(data, "table-data-gcn", configColumn, '100%', '455', '', true);

    $('#table-data-gcn').unbind('rowselect');
    $('#table-data-gcn').on('rowselect', function (event) {
        var args = event.args;
        var boundIndex = args.rowindex;
        var visibleIndex = args.visibleindex;
        var rightclick = args.rightclick;
        var ev = args.originalEvent;
        var data = $('#table-data-gcn').jqxGrid('getrowdata', boundIndex);

        _carService.get_detail(data).then(res => {
            $('#btnMoiGCN').click();
            //_dataDK = res.data_info.dk;
            _frmGCN.setData(res.data_info.gcn[0]);
            inittableDK();
        });
    });

    if (data.length > 0) {
        var index = $('#table-data-gcn').jqxGrid('getrowboundindex', 0);
        $('#table-data-gcn').jqxGrid('selectrow', index);
    } else {
        $('#btnMoiGCN').click();
    }
};

function _detailKH() {
    var dataForm = _frmKH.getJsonData();
    if (dataForm.ma_doi_tac == '' || dataForm.ma_kh == '') return;
    _CContact.get_detail_kh(dataForm).then(res => {
        _frmKH.setData(res.data_info.kh[0]);
    });
};

function _gridUploadExcel(dataJson) {
    var gridName = 'table-data-excel';

    var keys = [];
    _arrColumn = [];
    for (var k in dataJson[0]) keys.push(k);

    for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var name = eval('dataJson[0].' + keys[i]);

        _arrColumn.push([key, name, 0, "string_edit"]);
    }
    dataJson.splice(0, 1);

    //$('#div_' + gridName).html('<div id="' + gridName + '"></div>');
    //bindingDataGridLocal(getTheme5(), null, gridName, 820, 360, null, null, null, _arrColumn, dataJson, 'singlerow', '', '', '', '', '', '', '1', '');
    _gridWidget.create(dataJson, gridName, _arrColumn, "100%", 360);
    $("#" + gridName).jqxGrid('autoresizecolumns');
    setTimeout(function () {
        $('#btnCheckExcel').click();
    }, 500);
};

function check_valid_upload(gridName) {
    if (_arrColumn.length == 1) {
        $('#frm_bh_hd_update_nd').html('Sai định dạng file excel!');
        return;
    }

    var tmp = ',' + _arrField + ',';

    //var keys = [];
    //for (var k in json_fieldcheck[0][0]) keys.push(k);
    //for (var i = 0; i < keys.length; i++) {
    //    var val = eval('json_fieldcheck[0][0].' + keys[i]);
    //    if (val != '1') {
    //        tmp = tmp.replace(',' + keys[i] + ',', ',');
    //    }
    //}

    $.each(_arrColumn, function (index, item) {
        tmp = tmp.replace(',' + item[0] + ',', ',');
    });

    tmp = tmp.replace(',,', '');
    if (tmp != '' && tmp != ',') {
        $('#frm_bh_hd_update_nd').html('File excel thiếu thông tin các cột: ' + tmp);
        return;
    }

    $('#frm_bh_hd_update_nd').val('');
    $('#frm_bh_hd_update_nd').html(check_valid_upload_filter(gridName));

    if ($('#frm_bh_hd_update_nd').html() == '') {
        $('#btnCheckUpload_save').parent().show();
    }
}

function check_valid_upload_filter(gridName) {
    var numrowscount = $('#' + gridName).jqxGrid('getdatainformation').rowscount;

    for (var i = 0; i < numrowscount; i++) {
        var data = $('#' + gridName).jqxGrid('getrowdata', i);

        for (var j = 0; j < _arrColumn.length; j++) {
            var value_check = eval('data.' + _arrColumn[j][0]);

            if (_arrColumn[j][0] == 'ngay_hl' || _arrColumn[j][0] == 'ngay_kt') {
                if (typeof value_check == typeof undefined || value_check == null) value_check = '';
                if (value_check.length != 10 || !isValidDate(value_check)) {
                    //$('#row' + i + gridName).children().eq(j).addClass('mess-error');
                    //$('#row' + i + gridName).children().eq(j).attr('data-class-clear', 'mess-error');

                    //arr_check.push([data.stt]);

                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - sai định dạng ngày hiệu lực/kết thúc: ' + data.ngay_hl + ' - ' + data.ngay_kt;
                }
            }

            if (_arrColumn[j][0] == 'ng_sinh') {
                if (typeof value_check == typeof undefined || value_check == null) value_check = '';
                if (!isValidDate(value_check)) {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - sai định dạng ngày sinh: ' + data.ng_sinh;
                }
            }

            if (_arrColumn[j][0] == 'gio_hl' || _arrColumn[j][0] == 'gio_kt') {
                if (typeof value_check == typeof undefined || value_check == null) value_check = '';
                if (value_check == '' || value_check.length > 6 || value_check.length < 2) {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - sai định dạng Giờ hiệu lực: ' + data.gio_hl + ' Giờ kết thúc: ' + data.gio_kt;
                }
            }

            if (_arrColumn[j][0] == 'so_cmt') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '') {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - thiếu thông tin chứng minh thư/ mã số thuế!';
                    //} else if (isNaN(value_check) && value_check.length > 4 && value_check.length != 8) {
                    //return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - sai chứng minh thư/ mã số thuế! ' + value_check;
                } else if (!isNaN(value_check) && value_check.length > 4 && value_check.length != 9 && value_check.length != 12) {
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - sai chứng minh thư/ mã số thuế! ' + value_check;
                }
            }

            if (_arrColumn[j][0] == 'd_thoai') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '') {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - thiếu thông tin số điện thoại!';
                }
            }

            if (_arrColumn[j][0] == 'email') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '') {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - thiếu thông email!';
                }
            }

            if (_arrColumn[j][0] == 'gioi') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '' || (value_check.toUpperCase() != 'NAM' && value_check.toUpperCase() != 'NU')) {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - Nhập giới tính NAM/NU!';
                }
            }

            if (_arrColumn[j][0] == 'goi_bh') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '' || arr_goi.indexOf(',' + value_check + ',') == -1) {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - Các chương trình bảo hiểm áp dụng: ' + arr_goi + '!';
                }
            }

            if (_arrColumn[j][0] == 'nhom') {
                if (typeof value_check == typeof undefined || value_check == null || value_check == '') {
                    $('#' + gridName).jqxGrid('scrolloffset', i * 32 - 100, 0);
                    $('#' + gridName).jqxGrid('selectrow', i);
                    return 'Chú ý, stt:' + data.stt + ' - ' + data.ten + ' - thiếu thông tin nhóm bảo hiểm: ' + $('#frm_bh_hd_nhom').val() + '!';
                }
            }
        }
    }

    return '';
};

function _windowOpen(windowName) {
    $('#' + windowName + ' .nav-tabs.profile-tab').tabdrop();
    $('#' + windowName).modal("show");
    $(".page-wrapper").addClass("position-relative");
    $('#' + windowName).addClass("position-absolute");
    $('#' + windowName).css("padding-right", "");
    $('#' + windowName).css("padding-left", "");
    $('#' + windowName).css("padding-top", "50px");
    $('.modal-backdrop').hide();
    $('body').removeClass("modal-open");
    $('body').css("padding-right", "0px");
}

/*var tableTimkiem = new GridViewService("table-data-timkiem", configColumn, 'getPagingTimkiem', showWindowEdit);*/

var _HDBHCar = {
    showStep: function (tab) {
        if (tab == 'tabThongTinHD') {
            if (_frmKH.getControl('so_id_kh').val() == '') {
                $('#btnLuuKH').click();
                return;
            }

            _frmHopDong.getControl('ma_kh').val(_frmKH.getControl('ma_kh').val());
            _frmHopDong.getControl('ma_doi_tac').val(_frmKH.getControl('ma_doi_tac').val());
            _frmHopDong.getControl('ma_doi_tac').trigger('change');
            _frmHopDong.getControl('ma_chi_nhanh').val(_frmKH.getControl('ma_chi_nhanh').val());
            _frmHopDong.getControl('ma_chi_nhanh').trigger('change');
            if (_dataHD != null) {
                _frmHopDong.getControl('phong').val(_dataHD.phong);
                _frmHopDong.getControl('phong').trigger('change');
            }
        } else if (tab == 'tabTimKH') {
        }

        _navTabHopDong.showTab(tab);
    }
}

function jsonFilter(data, param, value) {
    if (value == undefined || value == null) return data;
    var param = param.split(',');
    var value = value.toString().split(',');
    return $(data).filter(function (i, n) {
        var string = '';
        for (var i = 0; i < param.length; i++) {
            string = string + '&& n.' + param[i] + ' == "' + value[i] + '"';
        }
        string = string.replace('&&', '');

        return eval(string);
    })
}

$(document).ready(function () {
    _service.all([_partnerListService.layDsDoiTac(), _branchListService.layDsChiNhanh()]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmTimKiemHĐ.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemHĐ.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmKH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac.data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");

    });
    _frmTimKiemHĐ.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    _frmKH.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");
    });

    _frmTimKiemHĐ.getControl('ngay_d').val('01/01/2020');
    _carService.pageload().then(function (res) {
        _danhmuc = res.data_info;

        var json_namsx = '[';
        var d = new Date();
        var n = d.getFullYear();
        for (var i = n; i > n - 25; i--) {
            json_namsx = json_namsx + '{ ten: ' + i + ', ma: ' + i + ' },';
        }
        json_namsx = eval(json_namsx + ']');

        _frmGCN.getControl("nam_sx").setDataSource(json_namsx, "ten", "ma", "Chọn năm sản xuất", "");

        _frmKH.getControl("ma_doi_tac").setDataSource(_danhmuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmKH.getControl("ma_doi_tac").bind('change', function () {
            _frmKH.getControl("ma_chi_nhanh").setDataSource(jsonFilter(_danhmuc.chi_nhanh, 'ma_doi_tac', $(this).val()), "ten", "ma", "Chọn chi nhánh", "");
        });

        _frmHopDong.getControl("ma_doi_tac").setDataSource(_danhmuc.doi_tac, "ten", "ma", "Chọn đối tác", "");
        _frmHopDong.getControl("ma_doi_tac").bind('change', function () {
            _frmHopDong.getControl("ma_chi_nhanh").setDataSource(jsonFilter(_danhmuc.chi_nhanh, 'ma_doi_tac', $(this).val()), "ten", "ma", "Chọn chi nhánh", "");
        });
        _frmHopDong.getControl("ma_chi_nhanh").bind('change', function () {
            _frmHopDong.getControl("phong").setDataSource(jsonFilter(_danhmuc.phong, 'ma_doi_tac,ma_chi_nhanh', _frmHopDong.getControl("ma_doi_tac").val() + ',' + $(this).val()), "ten", "ma", "Chọn phòng ban", "");
        });

        var string = '';
        $.each(_danhmuc.dkbs, function (index, item) {
            string += '<div class="custom-control custom-checkbox custom-control-inline">' +
                '<input type = "checkbox" onclick="_eventDKBS();" id = "DKBS_' + item.ma + '" name = "HD_DKBS" value = "' + item.ma + '" class="custom-control-input"/>' +
                '<label class="custom-control-label" for="DKBS_' + item.ma + '">' + item.ten + '</label>' +
                '</div ></br>';
        });

        $('#jqxPopover').html(string);
    });

    $('#btnSearch').bind('click', function () {
        getPagingTimkiem(1);
    });

    $('#btnLuuGCN').bind('click', function () {
        if (_frmGCN.isValid()) {
            var data = new Object();
            data.so_id = _dataHD.so_id;
            data.ma_doi_tac = _dataHD.ma_doi_tac;
            data.ma_chi_nhanh = _dataHD.ma_chi_nhanh;
            data.phong = _dataHD.phong;
            _frmGCN.setData(data);
            var formData = _frmGCN.getJsonData();

            var data_dk = $("#table-data-gcndk").jqxGrid('getrows');
            //var data_gcn = $("#table-data-gcn").jqxGrid('getrows');
            //$.each(data_gcn, function (index, item) {
            //    $.each(item, function (key, value) {
            //        if (value != undefined && value != null && value.toString().indexOf('/') == 2) {
            //            item[key] = value.dateToNumber();
            //        }
            //    });
            //    data_gcn[index] = item;
            //});

            //formData.gcn = data_gcn;
            formData.dk = data_dk;

            _carService.ds_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    showWindowEdit(_dataHD);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    _frmGCN.getControl('gia_tri').bind('change', function (e) {
        if (!check_giaxe())
            $(this).val($(this).prop("defaultValue"));
    });

    _frmGCN.getControl('gia_tri').on('focusin', function () {
        $(this).prop("defaultValue", $(this).val());
    });

    $('#btnLuuDOTAI').bind('click', function () {
        var data = new Object();
        data.so_id = _dataHD.so_id;
        data.ma_doi_tac = _dataHD.ma_doi_tac;
        data.ma_chi_nhanh = _dataHD.ma_chi_nhanh;
        data.phong = _dataHD.phong;

        var data_dk = $("#table-data-do-tai").jqxGrid('getrows');

        data.do = data_dk;

        _carService.dongtai_nhap(data).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công.");
                loadDetailDongTai();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    //$('#btnXoaGCN').bind('click', function () {
    //    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa xe?", index, val => {
    //        var data = new Object();
    //        data.so_id = _dataHD.so_id;
    //        data.ma_doi_tac = _dataHD.ma_doi_tac;
    //        data.ma_chi_nhanh = _dataHD.ma_chi_nhanh;
    //        data.phong = _dataHD.phong;
    //        _frmGCN.setData(data);
    //        var formData = _frmGCN.getJsonData();

    //        _carService.ds_xoa(formData).then(res => {
    //            if (res.state_info.status === "OK") {
    //                _notifyService.success("Xóa thành công.");
    //                showWindowEdit(_dataHD);
    //            }
    //            else {
    //                _notifyService.error(res.state_info.message_body);
    //            }
    //        });
    //    });
    //});

    $('#btnQuayLai').bind('click', function () {

    });

    _frmKH.getControl('loai_kh').bind('change', function () {
        _frmKH.getControl('cmt').removeAttr('required');
        _frmKH.getControl('cmt').prev().removeClass('_required');
        _frmKH.getControl('mst').removeAttr('required');
        _frmKH.getControl('mst').prev().removeClass('_required');
        if ($(this).val() == 'C') {
            _frmKH.getControl('cmt').attr('required', '');
            _frmKH.getControl('cmt').prev().addClass('_required');
        } else {
            _frmKH.getControl('mst').attr('required', '');
            _frmKH.getControl('mst').prev().addClass('_required');
        }
    });

    $('#btnLuuKH').bind('click', function () {
        if (_frmKH.isValid()) {
            var formData = _frmKH.getJsonData();

            if (formData.loai_kh == 'C' && formData.cmt == '') {
                _notifyService.error("Khách hàng cá nhân nhập đủ CMND/ căn cước");
                return;
            } else if (formData.loai_kh == 'T' && formData.mst == '') {
                _notifyService.error("Khách hàng tổ chức nhập đủ mã số thuế");
                return;
            }

            _CContact.kh_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmKH.getControl('ma_kh').val(res.out_value.ma);
                    _frmKH.getControl('so_id_kh').val(res.out_value.so_id_kh);
                    _checkChange = false;
                    $('#btnTiepTheo').click();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
            });
        }
    });

    $('#btnLuuHD').bind('click', function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SAVE';
            if (formData.so_id == null || formData.so_id == '') {
                formData.kieu_hd = 'G';
            }

            _carService.hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDong.getControl('so_id').val(res.out_value.so_id);
                    var formData = _frmHopDong.getJsonData();
                    showWindowEdit(formData);
                    $('#btnSearch').click();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#jqxPopover").jqxPopover({
        theme: "metro",
        showArrow: true,
        title: "ĐKBS",
        selector: $("#popoverDKBS")
    });

    $('#jqxPopover').on('open', function () {
        $("#jqxPopover").css('padding', '5px');
        $("#jqxPopover").css('border-radius', '7px');
        $("input:checkbox[name='HD_DKBS']").prop('checked', false);
        var dkbs = $("input[name='dkbs']").val().split(',');
        for (var i = 0; i < dkbs.length; i++) {
            $("input:checkbox[name='HD_DKBS'][id='DKBS_" + dkbs[i] + "']").prop('checked', true);
        }
    });

    $('#jqxPopover').on('close', function () {

    });

    $('#btnLuuSDBS').bind('click', function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SDBS';
            if (formData.so_id == null || formData.so_id == '') {
                _notifyService.error("Chọn hợp đồng để tạo phụ lục.");
                return;
            }

            if (_dataHD.so_hd == formData.so_hd) {
                _notifyService.error("Số hợp đồng phụ lục phải khác số hợp đồng cũ.");
                return;
            }

            formData.kieu_hd = 'B';

            hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDong.getControl('so_id').val(res.out_value.so_id);
                    var formData = _frmHopDong.getJsonData();
                    showWindowEdit(formData);
                    $('#btnSearch').click();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    _frmGCN.getControl("hang_xe").bind('change', function () {
        _frmGCN.getControl("hieu_xe").setDataSource(jsonFilter(_danhmuc.hieu_xe, 'ma_doi_tac,hang_xe',
            _dataHD.ma_doi_tac + ',' + $(this).val()), "ten", "ma", "Chọn hiệu xe", "");
    });

    $('#btnMoiGCN').bind('click', function () {
        _frmGCN.resetForm();
        _frmGCN.clearErrorMessage();
        $('#table-data-gcn').jqxGrid('unselectrow');
        inittableDoTai(null);
        $('a[href="#thong_tin_xe"]').click();
    });

    $('#btnCopyGCN').bind('click', function () {
        _frmGCN.getControl('gcn').val('');
        _frmGCN.getControl('so_id_dt').val('');
    });

    _frmGCN.getControl('loai').bind('change', function () {
        inittableDK(null);
    });

    $('#btnAdd').bind('click', function () {
        _frmKH.resetForm();
        _frmKH.clearErrorMessage();

        _frmHopDong.resetForm();
        _frmHopDong.clearErrorMessage();

        _dataHD = null;

        _HDBHCar.showStep('tabTimKH');
    });

    $('#btnSearch').click();

    $("form[name='frmKH']").on("input", function () {
        _checkChange = true;
    });

    $("form[name='frmHopDong']").on("input", function () {
        _checkChange = true;
    });

    $('#btnCheckExcel').bind('click', function () {
        //loadingForm(true);
        setTimeout(function () {
            check_valid_upload('table-data-excel');
            //loadingForm(false);
        }, 50);
    });

    $('#btnSaveExcel').bind('click', function () {
        var data = new Object();
        data.so_id = _dataHD.so_id;
        data.ma_doi_tac = _dataHD.ma_doi_tac;
        data.ma_chi_nhanh = _dataHD.ma_chi_nhanh;
        data.phong = _dataHD.phong;

        var data_ds = $("#table-data-excel").jqxGrid('getrows');
        data.ds = data_ds;

        _carService.xe_excel_nh(data).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công.");
                showWindowEdit(_dataHD);
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    ////////// upload file
    $('#btnUpLoadAnhDGTT').click(function () {
        _uploadService.setParam({ so_id: _dataHD.so_id, type: "image", pm: "BH", loai: "" });
        _uploadService.showPupup();
    });

    $('#btnUploadExcel').click(function () {
        _uploadService.setParam({ so_id: _dataHD.so_id, type: "image", pm: "BH", loai: "IMPORT" });
        _uploadService.showPupup();
    });

    $('#btnXoaLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", index, val => {
            _service.xoaAnhHoSoGiamDinh({ so_id: _dataHD.so_id, bt: arrVal }).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getAnhThumnail(response => {
                    if (response !== undefined && response !== null && response.state_info.status === "NotOK") {
                        _notifyService.error(response.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Xóa ảnh giám định thành công.");
                });
            });
        });
    });

    $('#btnDownLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (arrVal.length === 1) {
            _service.layAnhChiTiet({ so_id: _dataHD.so_id, bt: arrVal[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "anh_ton_that_" + new Date().toDateString() + extension);
                }
                if (extension === ".pdf") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/pdf");
                }
                if (extension === ".xlsx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
                if (extension === ".xls") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.ms-excel");
                }
                if (extension === ".doc") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/msword");
                }
                if (extension === ".docx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                }
            });
        }
        else {
            _service.taiFileAnhTonThatZip({ so_id: _dataHD.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });

    $("#btnExportDSXE").click(function () {
        var formData = _frmHopDong.getJsonData();
        formData.ma_mau_in = "ESCS_EXCEL_DS_XE";
        _service.getFile("/common/ExportExcelTable", formData).then(res => {
            ESUtil.convertBase64ToFile(res, "export_" + new Date().toDateString() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    $('#btnImportDSXE').bind('click', function () {
        _modalUploadExcel.show();
        $('#table-data-excel').jqxGrid('clear');
        $("#table-data-excel").jqxGrid('autoresizecolumns');
    });

    $('#btnViewAnhListDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        //_frmThemHMTT.resetForm();
        hienThiNhomTaiLieuTonThat();
        _frmThemHMTT.getControl("loai").setValue("TT");
        _modalThemHMTT.setTitle("Thêm hạng mục tổn thất");
        _frmThemHMTT.getControl("hanh_dong").val("them_moi");
        _frmThemHMTT.getControl("hang_muc").readOnly(false);
        _frmThemHMTT.getControl("loai").readOnly(false);

        _frmThemHMTT.getControl("tien_tu_dong").val("");
        _frmThemHMTT.getControl("tien_gd").val("");
        _frmThemHMTT.getControl("ghi_chu").val("");
        //_selectCheckBoxService.setCheckedValue([]);
        var vutt = _frmThemHMTT.getControl("vu_tt").val();
        bindVuTonThat();
        _frmThemHMTT.getControl("vu_tt").val(vutt);
        _modalThemHMTT.show();
    });

    $("#btnXemViTriChupAnh").click(function () {
        var kinh_do = _frmToaDoAnh.getControl("kinh_do").val();
        var vi_do = _frmToaDoAnh.getControl("vi_do").val();
        _modalMap.hienThiMapTheoToaDo(kinh_do, vi_do, "Địa điểm chụp ảnh");
    });

    $("#btnXoaGCN").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa hợp đồng bảo hiểm xe ô tô  này không?", "", val => {
            _notifyService.warning("Xóa dữ liệu này sẽ ảnh hưởng đến toàn hệ thống. Chức năng xóa tạm thời không được sử dụng.");
        });
    });

    bindingDropDownContent();
});

function bindingDropDownContent() {
    $('#dropdownWindow').jqxWindow({
        theme: 'metro',
        showCollapseButton: true,
        resizable: false,
        autoOpen: false,
        height: 300,
        width: 500
    });

    var configColumnDropdown = [
        ["ma", "Mã", "100", "string"],
        ["ten", "Tên", "200", "string"]
    ];

    _gridWidget.create(null, "table-dropdown", configColumnDropdown, '100%', '100%');

    $(window).mousedown(function () {
        $('#dropdownWindow').jqxWindow('bringToFront');
    });
}


////////// upload file
var configUpload = {
    onSuccess: function (file, response, data) {
        if (data.loai == "IMPORT") {
            _gridUploadExcel(response);
            _uploadService.hidePupup();
        } else {
            getAnhThumnail();
        }
    }
};

var _uploadService = new UploadService(configUpload);

function getAnhThumnail(callback = undefined) {
    _carService.layDanhSachFile({
        ma_doi_tac: _dataHD.ma_doi_tac,
        ma_chi_nhanh: _dataHD.ma_chi_nhanh,
        so_id: _dataHD.so_id
    }).then(res => {
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}

function bindAnhThumnail(arrAnh) {
    $("#dsAnhTonThat").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return;
    }
    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
        }
    }
    for (var index = 0; index < arr_nhom_anh.length; index++) {
        if (typeof arr_nhom_anh[index] !== 'string') {
            continue;
        }
        var divTitle = $('<div class="px-2 pt-2"><strong class="m-0">' + arr_nhom_anh[index] + '</strong></div>');
        var ul = $('<ul class="docs-pictures clearfix"></ul>');
        var arr = arrAnh.where(n => n.nhom_anh === arr_nhom_anh[index]);
        for (var i_anh = 0; i_anh < arr.length; i_anh++) {
            if (typeof arr[i_anh] !== 'object') {
                continue;
            }
            var li = $('<li class="p-1"></li>');
            var input = $('<input name="ds_anh_xe" type="checkbox" value="' + arr[i_anh].bt + '" class="position-relative" style="top:18px;left:0px;z-index:9;">');
            li.append(input);

            if (
                arr[i_anh].extension === ".jpg" ||
                arr[i_anh].extension === ".png" ||
                arr[i_anh].extension === ".gif" ||
                arr[i_anh].extension === ".jpeg"
            ) {
                var image = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="data:image/png;base64, ' + arr[i_anh].duong_dan + '" alt="">');

                li.append(image);
            }
            if (arr[i_anh].extension === ".pdf") {
                //var pdf = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/pdf.png" alt="">');
                var pdf = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/document.png" alt="">');
                li.append(pdf);
            }
            if (arr[i_anh].extension === ".doc" || arr[i_anh].extension === ".docx") {
                //var doc = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/word.jpg" alt="">');
                var doc = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/document.png" alt="">');
                li.append(doc);
            }
            if (arr[i_anh].extension === ".xlsx" || arr[i_anh].extension === ".xls") {
                //var excel = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/excel.png" alt="">');
                var excel = $('<img data-original="" data-id="' + arr[i_anh].so_id + '" data-bt="' + arr[i_anh].bt + '" src="/images/document.png" alt="">');
                li.append(excel);
            }
            ul.append(li);
        }
        $("#dsAnhTonThat").append(divTitle);
        $("#dsAnhTonThat").append(ul);
    }
}

function initImageViewer() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-container',
        tooltip: true,
        title: false,
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}

function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}

function hienThiNhomTaiLieuTonThat() {
    //_frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_xe.where(n => n.loai !== "PHU" && n.loai !== "TAI_LIEU"), "ten", "ma", "Chọn hạng mục", "");
    $(".frmThemHMTT_TT").show();
    $("#frmThemHMTT_loai").removeClass("col-6");
    $("#frmThemHMTT_loai").addClass("col-12");
}

_service.layAnhChiTiet = function (obj) {
    return _service.postData("/carclaim/carinvestigation/getfiles", obj);
}

_service.xoaAnhHoSoGiamDinh = function (obj) {
    return _service.postData("/carclaim/carinvestigation/deleteimagedamage", obj);
}

_service.taiFileAnhTonThatZip = function (obj) {
    return _service.postData("/carclaim/carinvestigation/downloadzipfile", obj);
}
