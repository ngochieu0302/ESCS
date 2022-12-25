var objDanhMuc = {};
var _service = new Service();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var NAM_SAN_XUAT = [];
var nam_ht = new Date().getFullYear();
for (var i = nam_ht; i > nam_ht - 25; i--) {
    NAM_SAN_XUAT.push({ ma: i, ten: i });
}
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _departmentListService = new DepartmentListService();
var _motorcycleContractService = new MotorcycleContractService();
var _categoryCommonService = new CategoryCommonService();
var _commonService = new CommonService();
var _customerService = new CustomerService();
var _categoryvehicleListService = new CategoryvehicleListService();

var _carManufacturerListService = new CarManufacturerListService();
var _hieuXeService = new HieuXeService();
var _rangeVehicleService = new RangeVehicleService();
var _businessCodeService = new BusinessCodeService();
var _uploadExcelService = new UploadExcelService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmMotorcycleContractSearch = new FormService("frmMotorcycleContractSearch");
var _frmHopDong = new FormService("frmHopDong");
var _frmHopDongEdit = new FormService("frmHopDongEdit");
var _frmGCNXE = new FormService("frmGCNXE");
var _frmImportXe = new FormService("frmImportXe");
var _frmSaveQLKHSearch = new FormService("frmSaveQLKHSearch");
var _frmSaveQLKH = new FormService("frmSaveQLKH");
var _frmDTNhaBH = new FormService("frmDTNhaBH");
var _frmDTNoiBo = new FormService("frmDTNoiBo");
var _frmToaDoAnh = new FormService("frmToaDoAnh");
var _frmThemHMTT = new FormService("frmThemHMTT");

var _modalMotorcycleContractSearch = new ModalService("modalMotorcycleContractSearch");
var _modalEditKH = new ModalService("modalEditKH");
var _modalEditHD = new ModalService("modalEditHD");
var _modalSDBS = new ModalService("modalSDBS");
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "tabHoSoGiayTo");

var _notifyService = new NotifyService();
var _navTabTimKiemKhachHang = new NavTabService("navTabTimKiemKhachHang", ["tabTimKiemKH", "tabThongTinHD"], "quy-trinh");
var _navThongTinHoSo = new NavTabService("navThongTinHoSo", ["navThongTinChung", "navDanhSachXe"], "nav-tabs-timeline");
var _navThongTinChung = new NavTabService("navThongTinChung", ["thong_tin_xe", "tai_lieu", "thong_tin_do_tai"], "quy-trinh");//nav-tabs-timeline
var _navDongtai = new NavTabService("navDongtai", ["tabNhaBH", "tabNoiBo"], "nav-tabs-timeline");

var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalMap = new ModalMapService("modalMap");
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalChonDKBS = new ModalDragService("modalChonDKBS", undefined, "bottom");

var _dataKH = null;
var _dataDK = null;
var _danhmuc = null;
var gd_chon_anh_arr = [];
var gd_anh_chon_cuoi = null;
var hop_dong_chi_tiet = null;
var lhnv = null;
var objData = null;
var arrGCN = [];

const GRID_HOP_DONG_SO_DONG = 13;
const GRID_KH_SO_DONG = 10;
const CONSTANT_PM = 'BH';

var configUpload = {
    onSuccess: function (file, response, data) {
        if (response.state_info.status === "NotOK") {
            _notifyService.error(response.state_info.message_body);
            return
        }
        var arrError = response.data_info.where(n => n.status_upload == "ERROR");
        for (var i = 0; i < arrError.length; i++) {
            _notifyService.error(arrError[i].error_message);
            return
        }
        if (data.loai == "IMPORT") {
            _gridUploadExcel(response);
            _uploadService.hidePupup();
        } else {
            getAnhThumnail();
        }
    }
};
var _uploadService = new UploadService(configUpload);

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ngay_cap", title: "Ngày cấp", width: "8%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "kieu_hd_ten", title: "Kiểu hợp đồng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số hợp đồng", width: "16%", hozAlign: "center", headerSort: false },
    { field: "ten", title: "Tên khách", width: "20%", hozAlign: "left", headerSort: false },
    { field: "so_luong_dt", title: "SL xe", width: "5%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "tong_phi", title: "Tổng phí", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "nsd", title: "Cán bộ cấp đơn", width: "12%", hozAlign: "center", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "25%", hozAlign: "left", headerSort: false },
    { field: "so_hd_goc", title: "Số hợp đồng gốc", width: "15%", hozAlign: "left", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var configColumnKH = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "loai_kh_hthi", title: "Khách hàng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã khách hàng", width: "15%", headerSort: false },
    { field: "ten", title: "Tên", width: "20%", headerSort: false },
    { field: "dchi", title: "Địa chỉ", width: "38%", headerSort: false },
    { field: "d_thoai", title: "Điện thoại", width: "12%", hozAlign: "center", headerSort: false },
    { field: "email", title: "Email", width: "12%", headerSort: false },
    { field: "cmt", title: "CMT", width: "10%", headerSort: false },
    { field: "mst", title: "MST", width: "10%", headerSort: false },
    { field: "ten_doi_tac", title: "Đối tác", width: "25%", headerSort: false },
    { field: "ten_doi_tac_cn", title: "Đơn vị", hozAlign: "center", width: "21%", headerSort: false }

];
var _gridViewHDXeOTo = new GridViewService("gridViewHDXeOTo", configColumn, getPaging, rowClick);

var _gridViewKH = new GridViewService("gridViewTkiemKH", configColumnKH, getPagingKhachHang, rowClickKH);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HOP_DONG_SO_DONG;
    _motorcycleContractService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewHDXeOTo.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HOP_DONG_SO_DONG) {
            _gridViewHDXeOTo.addRowEmpty(GRID_HOP_DONG_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHDXeOTo.addRowEmpty(GRID_HOP_DONG_SO_DONG);
        }
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    layChitietHopDong(data);
    if (row !== undefined) {
        row.select();
        var objInput = {
            ma_doi_tac: data.ma_doi_tac,
            so_id: data.so_id,
            nv: 'XE_MAY'
        }
        _motorcycleContractService.getListDongtai(objInput).then(res => {
            ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
        });
    }
    _navDongtai.showTab("tabNhaBH");
};
function layChitietHopDong(data, callback = undefined) {
    _motorcycleContractService.layChiTietHopDong(data).then(res => {
        hop_dong_chi_tiet = res;
        $("#inside-modal").esmodal("show");
        getDefaultDongTai();
        $("#CarContractustomer1").bindJsonToHtml(res.data_info.hd);
        $("#CarContractustomer2").bindJsonToHtml(res.data_info.hd);
        _frmMotorcycleContractSearch.setData(res.data_info.hd);
        _frmHopDong.setData(res.data_info.hd);
        $('#titleUpdateHD').html("Số hợp đồng: " + res.data_info.hd.so_hd);
        ESUtil.genHTML("danhDachGCN_template", "danhDachGCN", res.data_info, () => {
            if (res.data_info.gcn == null || res.data_info.gcn.length <= 0) {
                $("#divTongDsXe").html("Danh sách xe");
                return;
            }
            $("#divTongDsXe").html("Danh sách xe (" + res.data_info.gcn.length + ")");
        });
        _navThongTinChung.showTab("thong_tin_xe");
        if (res.data_info.gcn == null || res.data_info.gcn.length <= 0) {
            $("#btnMoiGCN").trigger("click");
            _navThongTinHoSo.showTab("navThongTinChung");
        }
        else {
            xemChiTietGCN(res.data_info.gcn[0].ma_doi_tac, res.data_info.gcn[0].so_id, res.data_info.gcn[0].so_id_dt);
            _navThongTinHoSo.showTab("navDanhSachXe");
        }
        if (callback) {
            callback(res);
        }
    });
}
function check_giaxe() {
    var data_dk = $("#table-data-gcndk").jqxGrid('getrows');
    var check = true;
    $.each(data_dk, function (index, item) {
        if (item.lh_nv == 'XE05' && item.tien > parseInt(_frmGCNXE.getControl('gia_tri').val().replace(/,/g, ''))) {
            _notifyService.error("Tiền bảo hiểm vật chất không quá giá trị xe!");
            check = false;
        }
    });
    return check;
};
function loadDetailDongTai() {
    var data = new Object();
    data.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
    data.so_id_dt = 0;
    data.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
    data.ma_chi_nhanh = hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh;
    data.phong = hop_dong_chi_tiet.data_info.hd.phong;

    _motorcycleContractService.layDsHdXe_dong_tai(data).then(res => {
        inittableDoTai(res.data_info);
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
function getAnhThumnail(callback = undefined) {
    _motorcycleContractService.layDanhSachFile({
        ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
        ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
        so_id: hop_dong_chi_tiet.data_info.hd.so_id,
        so_id_dt: _frmGCNXE.getControl("so_id_dt").val(),
        nv: 'XE_MAY'
    }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        bindAnhThumnail(res.data_info);
        initImageViewer();
        if (callback) {
            callback(res);
        }
    });
}
function bindAnhThumnail(arrAnh) {
    $("#dsAnhTonThat").html("");
    $("#dsNhomAnh").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return;
    }
    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
            $("#dsNhomAnh").append('<button class="dropdown-item" type="button" data-id="nhom_anh_' + i + '" onclick="goToScroll(\'nhom_anh_' + i + '\')">' + arrAnh[i].nhom_anh + '</button>');
        }
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    ESUtil.genHTML("lstImage_template", "dsAnhTonThat", { "arrAnh": result });
    return;
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
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
function onClickGDChiTiet(el, obj) {
    if ($(el).is(":checked")) {
        gd_chon_anh_arr.push(obj);
    } else {
        gd_chon_anh_arr = $.grep(gd_chon_anh_arr, function (e) {
            return e.bt != obj.bt;
        });
    }
    if (gd_chon_anh_arr.length > 0) {
        gd_anh_chon_cuoi = gd_chon_anh_arr[gd_chon_anh_arr.length - 1];
    }
    if (gd_chon_anh_arr == null || gd_chon_anh_arr.length <= 0) {
        return;
    }
}
function getPagingKhachHang(trang, callback = undefined) {
    var objTimKiem = _frmMotorcycleContractSearch.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_KH_SO_DONG;
    _motorcycleContractService.timkiemKhachhang(objTimKiem).then(res => {
        _gridViewKH.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_KH_SO_DONG) {
            _gridViewKH.addRowEmpty(GRID_KH_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewKH.addRowEmpty(GRID_KH_SO_DONG);
        }
        if (callback) {
            callback(res);
        }
    });
}
function rowClickKH(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _dataKH = data;
    row.select();
};
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
    });
}
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function onCheckKhauTru(el, val) {
    var check = $(el).is(":checked");
    $("#danhSachNV input[col-mien-thuong='" + val + "']").attr("disabled", "disabled");
    if (check) {
        $("#danhSachNV input[col-mien-thuong='" + val + "']").removeAttr("disabled");
    }
    else {
        $("#danhSachNV input[col-mien-thuong='" + val + "']").val("0");
    }
    hthiTongTien();
}
function hthiTongTien() {
    var tt_xe_tong_tien_bh = 0;
    var tt_xe_tong_tien_mien_thuong = 0;
    var tt_xe_tong_phi = 0;
    $("#danhSachNV tr").each(function () {
        var ma = $(this).attr("row-val");
        tt_xe_tong_tien_bh += $("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
        tt_xe_tong_tien_mien_thuong += $("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
        tt_xe_tong_phi += $("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().trim() == "" ? 0 : parseFloat($("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().trim().replace(/[^0-9]+/g, ''));
    });

    $("#tt_xe_tong_tien_bh").html(ESUtil.formatMoney(tt_xe_tong_tien_bh));
    $("#tt_xe_tong_tien_mien_thuong").html(ESUtil.formatMoney(tt_xe_tong_tien_mien_thuong));
    $("#tt_xe_tong_phi").html(ESUtil.formatMoney(tt_xe_tong_phi));
}
function getDataTable() {
    var arr = [];
    $("#danhSachNV tr").each(function () {
        var ma = $(this).attr("row-val");
        var obj = {
            so_id_dt: 0,
            lh_nv: ma,
            tien: $("#danhSachNV tr input[col-tien-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            phi: $("#danhSachNV tr input[col-phi-bh='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            thue: 0,
            mien_thuong: $("#danhSachNV tr input[col-mien-thuong='" + ma + "']").val().replace(/[^0-9]+/g, ''),
            ktru: $("#danhSachNV tr input[col-khau-tru='" + ma + "']").is(":checked") ? "C" : "K"
        };
        arr.push(obj);
    });
    return arr;
}
function xemChiTietGCN(ma_doi_tac, so_id, so_id_dt) {
    $(".item-gcn").removeClass("text-danger");
    if (ma_doi_tac == "" || so_id == "" || so_id_dt == "") {
        var dkbs = JSON.parse(JSON.stringify(objDanhMuc.dkbs.where(n => n.ma_doi_tac == ma_doi_tac)));
        for (var i = 0; i < dkbs.length; i++) {
            dkbs[i].chon = false;
        }
        ESUtil.genHTML("danhSachDKBS_template", "danhSachDKBS", { dkbs: dkbs });
        return;
    }
    var obj = hop_dong_chi_tiet.data_info.gcn.where(n => n.ma_doi_tac == ma_doi_tac && n.so_id == so_id && n.so_id_dt == so_id_dt).firstOrDefault();
    if (obj != null) {
        _frmGCNXE.setData(obj);
        _frmGCNXE.getControl("hang_xe").trigger("select2:select");
        _frmGCNXE.getControl("hieu_xe").setValue(obj.hieu_xe);
        _frmGCNXE.getControl("loai").trigger("select2:select");
        $("#item-gcn-" + ma_doi_tac + so_id + so_id_dt).addClass("text-danger");
        var dkbs = JSON.parse(JSON.stringify(objDanhMuc.dkbs.where(n => n.ma_doi_tac == ma_doi_tac)));
        if (obj.dkbs != null) {
            var dkbs_dt = obj.dkbs.split(',');
            for (var i = 0; i < dkbs.length; i++) {
                dkbs[i].chon = false;
                for (var j = 0; j < dkbs_dt.length; j++) {
                    if (dkbs[i].ma == dkbs_dt[j].trim()) {
                        dkbs[i].chon = true;
                    }
                }
            }
        }
        ESUtil.genHTML("danhSachDKBS_template", "danhSachDKBS", { dkbs: dkbs });
        checkNullBienXe(_frmGCNXE.getControl('bien_xe').getValue(), _frmGCNXE.getControl('so_khung').getValue(), _frmGCNXE.getControl('so_may').getValue());
        getAnhThumnail();
    }
}
function xemNoiDungFile(el) {
    var formData = _frmImportXe.getFormFileData();
    _commonService.docFileExcel(formData).then(res => {
        _notifyService.success("Xem log");
    });
}
function anHienThemMoiKH(form = "frmMotorcycleContractSearch", is_slide = false) {
    $("#frmMotorcycleContractSearch").hide();
    $("#frmSaveQLKHSearch").hide();
    $("#btnTiepTheo").hide();
    $("#btnSaveQLKHSearch").hide();
    $("#btnHuyThemMoiKH").hide();

    if (form == "frmMotorcycleContractSearch") {
        $("#btnTiepTheo").show();
        if (is_slide)
            $("#frmMotorcycleContractSearch").slideDown();
        else
            $("#frmMotorcycleContractSearch").show();
    }
    if (form == "frmSaveQLKHSearch") {
        $("#btnSaveQLKHSearch").show();
        $("#btnHuyThemMoiKH").show();
        if (is_slide)
            $("#frmSaveQLKHSearch").slideDown();
        else
            $("#frmSaveQLKHSearch").show();
    }
}
function luuThongTinKH(obj, callback = undefined) {
    _customerService.saveKH(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res);
        }
    });
}
function ganGiaTriFormHD(objKH) {
    _frmHopDong.clearErrorMessage();
    _frmHopDong.resetForm();
    _frmHopDong.getControl("ma_kh").val(objKH.ma);
    _frmHopDong.getControl("khach_hang").val(objKH.ten + ' - ' + objKH.ma);
    _frmHopDong.getControl("ma_doi_tac").setValue(objKH.ma_doi_tac);
    _frmHopDong.getControl("ma_doi_tac").trigger('select2:select');
    _frmHopDong.getControl("ma_chi_nhanh").setValue(objKH.ma_chi_nhanh);
    _frmHopDong.getControl("ma_chi_nhanh").trigger('select2:select');
    _frmHopDong.getControl("trang_thai").setValue("C");
    _frmHopDong.getControl("trang_thai").readOnly();
    _frmHopDong.getControl("kieu_hd").setValue("G");
    _frmHopDong.getControl("kieu_hd").readOnly();

    _frmHopDong.getControl('ngay_cap').val(new Date().ddmmyyyy());
    _frmHopDong.getControl('ngay_hl').val(new Date().ddmmyyyy());
    _frmHopDong.getControl('ngay_kt').val(new Date().ddmmyyyy(1));

    //if (hop_dong_chi_tiet.data_info.hd != null && hop_dong_chi_tiet.data_info.hd.phong != undefined && hop_dong_chi_tiet.data_info.hd.phong != null && hop_dong_chi_tiet.data_info.hd.phong != "") {
    //    _frmHopDong.getControl('phong').setValue(hop_dong_chi_tiet.data_info.hd.phong);
    //    _frmHopDong.getControl('phong').trigger('select2:select');
    //}
}
function getDefaultDongTai() {
    arrGCN = [];
    $.each(hop_dong_chi_tiet.data_info.gcn, (index, value) => {
        if (value.bien_xe == null) {
            var obj = {
                so_id_dt: value.so_id_dt,
                bien_xe: value.so_khung
            }
            arrGCN.push(obj);
        } else {
            var obj_1 = {
                so_id_dt: value.so_id_dt,
                bien_xe: value.bien_xe
            }
            arrGCN.push(obj_1);
        }
    });
    _frmDTNhaBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrNhaBH = objDanhMuc.NhaBH.where(n => n.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNhaBH.getControl("don_vi_dong_tai").setDataSource(arrNhaBH, "ten", "ma", "Chọn nhà bảo hiểm", "");
    _frmDTNhaBH.getControl("so_id_dt").setDataSource(arrGCN, "bien_xe", "so_id_dt", "Chọn giấy chứng nhận", "");
    _frmDTNhaBH.getControl("lhnv").setDataSource([], "", "", "Chọn loại hình nghiệp vụ", "");

    _frmDTNoiBo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
    _frmDTNoiBo.getControl("don_vi_dong_tai").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmDTNoiBo.getControl("so_id_dt").setDataSource(arrGCN, "bien_xe", "so_id_dt", "Chọn giấy chứng nhận", "");
    _frmDTNoiBo.getControl("lhnv").setDataSource([], "", "", "Chọn loại hình nghiệp vụ", "");
}
function Xem_chi_tiet_dong_tai(ma_doi_tac, so_id, so_id_dt, don_vi_dong_tai, loai_dong) {
    var objInput = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        so_id_dt: so_id_dt,
        don_vi_dong_tai: don_vi_dong_tai,
        loai_dong: loai_dong,
        nv: 'XE_MAY'
    }
    _motorcycleContractService.getDetailDongTai(objInput).then(res => {
        if (res.data_info.loai_dong == 'NGOAI') {
            _navDongtai.showTab("tabNhaBH");
            $('#nbh').trigger('click');
            _frmDTNhaBH.setData(res.data_info);
            if (res.data_info.so_id_dt == 0) {
                arrGCN = [];
                $.each(hop_dong_chi_tiet.data_info.gcn, (index, value) => {
                    if (value.bien_xe == null) {
                        var obj = {
                            so_id_dt: value.so_id_dt,
                            bien_xe: value.so_khung
                        }
                        arrGCN.push(obj);
                    } else {
                        var obj_1 = {
                            so_id_dt: value.so_id_dt,
                            bien_xe: value.bien_xe
                        }
                        arrGCN.push(obj_1);
                    }
                });
                _frmDTNhaBH.getControl("so_id_dt").setDataSource(arrGCN, "bien_xe", "so_id_dt", "Chọn giấy chứng nhận", "");
                _frmDTNhaBH.getControl('so_id_dt').trigger('select2:select');
                _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            } else {
                _frmDTNhaBH.getControl('so_id_dt').trigger('select2:select');
                _frmDTNhaBH.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", res.data_info.lhnv.trim());
            }
        } else if (res.data_info.loai_dong == 'NOIBO') {
            _navDongtai.showTab("tabNoiBo");
            $('#nb').trigger('click');
            $('#CarCompensationContent2Tab .nav-link').removeClass("active").first().addClass("active");

            _frmDTNoiBo.setData(res.data_info);
            if (res.data_info.so_id_dt == 0) {
                arrGCN = [];
                $.each(hop_dong_chi_tiet.data_info.gcn, (index, value) => {
                    if (value.bien_xe == null) {
                        var obj = {
                            so_id_dt: value.so_id_dt,
                            bien_xe: value.so_khung
                        }
                        arrGCN.push(obj);
                    } else {
                        var obj_1 = {
                            so_id_dt: value.so_id_dt,
                            bien_xe: value.bien_xe
                        }
                        arrGCN.push(obj_1);
                    }
                });
                _frmDTNoiBo.getControl("so_id_dt").setDataSource(arrGCN, "bien_xe", "so_id_dt", "Chọn giấy chứng nhận", "");
                _frmDTNoiBo.getControl('so_id_dt').trigger('select2:select');
                _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
            } else {
                _frmDTNoiBo.getControl('so_id_dt').trigger('select2:select');
                _frmDTNoiBo.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", res.data_info.lhnv.trim());
            }
        }
    });
}
function xemNoiDungFile(el) {
    _uploadExcelService.getDataExcel(el);
}
function chonDKBS(el, placement = "bottom") {
    var id = $(el).attr("id");
    $("#modalChonDKBSElementSelect").val($(el).attr("id"));
    $("#modalChonDKBS .modalChonDKBSItem").prop("checked", false);
    var val = $("#" + id).val();
    if (val != "") {
        var arr = val.split(",");
        for (var i = 0; i < arr.length; i++) {
            $("#modalChonDKBS .modalChonDKBSItem[value='" + arr[i] + "']").prop("checked", true);
        }
    }
    _modalChonDKBS.setPlacement(placement);
    _modalChonDKBS.show(el);
}
function showStep(step) {
    _navThongTinChung.showTab(step);
    if (step == 'thong_tin_do_tai') {
        $('#nbh').trigger('click');
        _navDongtai.showTab("tabNhaBH");
    }
}
function checkNullBienXe(bien_xe, so_khung, so_may) {
    $("form[name='frmGCNXE'] input[name='bien_xe']").prop("required", true);
    $("form[name='frmGCNXE'] input[name='bien_xe']").closest("div").find('label').addClass('_required');
    $("form[name='frmGCNXE'] input[name='so_khung']").prop("required", true);
    $("form[name='frmGCNXE'] input[name='so_khung']").closest("div").find('label').addClass('_required');
    $("form[name='frmGCNXE'] input[name='so_may']").prop("required", true);
    $("form[name='frmGCNXE'] input[name='so_may']").closest("div").find('label').addClass('_required');

    if (bien_xe != '') {
        $("form[name='frmGCNXE'] input[name='so_khung']").prop("required", false);
        $("form[name='frmGCNXE'] input[name='so_khung']").closest("div").find('label').removeClass('_required');
        $("form[name='frmGCNXE'] input[name='so_may']").prop("required", false);
        $("form[name='frmGCNXE'] input[name='so_may']").closest("div").find('label').removeClass('_required');
    }
    else if (so_khung != '') {
        if (so_may != '') {
            $("form[name='frmGCNXE'] input[name='bien_xe']").prop("required", false);
            $("form[name='frmGCNXE'] input[name='bien_xe']").closest("div").find('label').removeClass('_required');
        } else {
            $("form[name='frmGCNXE'] input[name='bien_xe']").prop("required", true);
            $("form[name='frmGCNXE'] input[name='bien_xe']").closest("div").find('label').addClass('_required');
        }
    }
}
function luuPhanLoaiHangMuc(callback = undefined) {
    if (!_frmThemHMTT.isValid()) {
        return;
    }
    var obj = _frmThemHMTT.getJsonData();
    obj.loai = "TLHD";
    obj.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
    obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
    obj.pm = CONSTANT_PM;
    obj.bt = getImageSelect();
    obj.nv = 'XE_MAY';
    _motorcycleContractService.phanLoaiHangMuc(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        getAnhThumnail(res => {
            if (!callback) {
                for (var i = 0; i < obj.bt.length; i++) {
                    $("#img" + obj.bt[i]).prop("checked", true);
                }
            }
        });
        _notifyService.success("Phân loại hạng mục thành công");
        if (callback) {
            callback(res);
        }
    });
}
$(document).ready(function () {
    _frmTimKiem.getControl("ngay_d").setValue("01/01/2020");
    _frmSaveQLKHSearch.getControl("loai_kh").setValue("C");
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _departmentListService.layDsPhongBan(),
        _carManufacturerListService.layDsHangXe(),
        _hieuXeService.layDsHieuXe(),
        _businessCodeService.layDsLHNVXeMay(),
        _categoryCommonService.layDsDanhMucChung(),
        _motorcycleContractService.getListNhaBH(),
        _categoryvehicleListService.layDsHangMucXe(),
        _rangeVehicleService.layDsLoaiXe()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.phong_ban = arrRes[2].data_info;
        objDanhMuc.hang_xe = arrRes[3].data_info.where(n => n.nv == 'XE_MAY');
        objDanhMuc.hieu_xe = arrRes[4].data_info.where(n => n.nv == 'XE_MAY');
        objDanhMuc.lhnv = arrRes[5].data_info;
        objDanhMuc.dkbs = arrRes[6].data_info.where(n => n.nv == "XE_MAY" && n.nhom == "DKBS");
        objDanhMuc.NhaBH = arrRes[7].data_info;
        objDanhMuc.hang_muc = arrRes[8].data_info;
        objDanhMuc.loai_xe = arrRes[9].data_info.where(n => n.nv == 'XE_MAY');

        ESCS_MA_DOI_TAC_DUY_NHAT =
            (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmSaveQLKH.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKH.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmSaveQLKHSearch.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKHSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");


        _frmMotorcycleContractSearch.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmMotorcycleContractSearch.getControl("ma_chi_nhanh")
            .setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");

        _frmHopDong.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");

        _frmHopDongEdit.getControl("ma_doi_tac")
            .setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHopDongEdit.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDongEdit.getControl("phong").setDataSource([], "ten", "ma", "Chọn phòng ban", "");


        _frmGCNXE.getControl("hang_xe").setDataSource(objDanhMuc.hang_xe, "ten", "ma", "Chọn hãng xe", "");
        _frmGCNXE.getControl("hieu_xe").setDataSource([], "ten", "ma", "Chọn hiệu xe", "");
        _frmGCNXE.getControl("loai_xe").setDataSource(objDanhMuc.loai_xe, "ten", "ma", "Chọn loại xe", "");

        objDanhMuc.hang_muc_tlhd = objDanhMuc.hang_muc.where(n => n.loai === "TLHD");
        _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tlhd, "ten", "ma", "Chọn tài liệu", "");

        ESUtil.genHTML("modalChonDKBSDanhSachTemplate", "modalChonDKBSDanhSach", { danh_sach: objDanhMuc.dkbs });
    });

    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChi_nhanh, "ten_tat", "ma", "Chọn chi nhánh");
    });
    _frmSaveQLKH.getControl("ma_doi_tac").addEventChange(val => {
        var arrChi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveQLKH.getControl("ma_chi_nhanh").setDataSource(arrChi_nhanh, "ten_tat", "ma", "Chọn chi nhánh");
    });
    _frmSaveQLKHSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmSaveQLKHSearch.getControl("ma_chi_nhanh").setDataSource(arrChi_nhanh, "ten_tat", "ma", "Chọn chi nhánh");
    });

    _frmMotorcycleContractSearch.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh1 = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmMotorcycleContractSearch.getControl("ma_chi_nhanh")
            .setDataSource(arrChiNhanh1, "ten_tat", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDong.getControl("kieu_hd").addEventChange(val => {
        if (val == 'B') {
            $("form[name='frmHopDong'] input[name='so_hd_goc']").prop('readonly', false);
        } else {
            $("form[name='frmHopDong'] input[name='so_hd_goc']").prop('readonly', true);
        }
    });
    _frmHopDongEdit.getControl("kieu_hd").addEventChange(val => {
        if (val == 'B') {
            $("form[name='frmHopDongEdit'] input[name='so_hd_goc']").prop('readonly', false);
        } else {
            $("form[name='frmHopDongEdit'] input[name='so_hd_goc']").prop('readonly', true);
        }
    });
    _frmHopDong.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmHopDong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDong.getControl("phong").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDong.getControl("ma_chi_nhanh").addEventChange(val => {
        var ma_doi_tac = _frmHopDong.getControl("ma_doi_tac").val();
        var arrPhongBan = objDanhMuc.phong_ban.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh === val);
        _frmHopDong.getControl("phong").setDataSource(arrPhongBan, "ten", "ma", "Chọn phòng ban", "");
    });

    _frmHopDongEdit.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
        _frmHopDongEdit.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmHopDongEdit.getControl("phong").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmHopDongEdit.getControl("ma_chi_nhanh").addEventChange(val => {
        var ma_doi_tac = _frmHopDongEdit.getControl("ma_doi_tac").val();
        var arrPhongBan = objDanhMuc.phong_ban.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_chi_nhanh === val);
        _frmHopDongEdit.getControl("phong").setDataSource(arrPhongBan, "ten", "ma", "Chọn phòng ban", "");
    });

    _frmGCNXE.getControl("hang_xe").addEventChange(val => {
        _frmGCNXE.getControl("hieu_xe").setDataSource(objDanhMuc.hieu_xe.where(n => n.hang_xe == val),
            "ten",
            "ma",
            "Chọn hiệu xe",
            "");
    });

    _frmGCNXE.getControl("loai").addEventChange(val => {
        var ma_doi_tac = _frmGCNXE.getControl("ma_doi_tac").val();
        var so_id = _frmGCNXE.getControl("so_id").val();
        var so_id_dt = _frmGCNXE.getControl("so_id_dt").val();
        var lhnv = JSON.parse(JSON.stringify(objDanhMuc.lhnv.where(n => n.ma_doi_tac == ma_doi_tac && n.loai == val)));
        var dsDieuKhoan = [];
        if (hop_dong_chi_tiet != null &&
            hop_dong_chi_tiet.data_info != null &&
            hop_dong_chi_tiet.data_info.dk != null &&
            ma_doi_tac != "" &&
            so_id != "" &&
            so_id_dt != "") {
            dsDieuKhoan =
                hop_dong_chi_tiet.data_info.dk.where(n => n.ma_doi_tac == ma_doi_tac &&
                    n.so_id == so_id &&
                    n.so_id_dt == so_id_dt);
        }
        for (var i = 0; i < lhnv.length; i++) {
            lhnv[i].tien = 0;
            lhnv[i].thue = 0;
            lhnv[i].tl_phi = 0;
            lhnv[i].phi = 0;
            lhnv[i].ktru = 'K';
            lhnv[i].mien_thuong = '';
            lhnv[i].dkbs = '';
            if (dsDieuKhoan != null && dsDieuKhoan.length > 0) {
                for (var j = 0; j < dsDieuKhoan.length; j++) {
                    if (lhnv[i].ma == dsDieuKhoan[j].lh_nv) {
                        lhnv[i].tien = dsDieuKhoan[j].tien;
                        lhnv[i].thue = dsDieuKhoan[j].thue;
                        lhnv[i].tl_phi = dsDieuKhoan[j].tl_phi;
                        lhnv[i].phi = dsDieuKhoan[j].phi;
                        lhnv[i].ktru = dsDieuKhoan[j].ktru;
                        lhnv[i].mien_thuong = dsDieuKhoan[j].mien_thuong;
                        lhnv[i].dkbs = dsDieuKhoan[j].dkbs;
                    }
                }
            }
        }
        ESUtil.genHTML("danhSachNV_template",
            "danhSachNV",
            { lhnv: lhnv },
            () => {
                console.log(lhnv);
                hthiTongTien();
                $(document).on("keypress",
                    "#danhSachNV input.number",
                    function (e) {
                        var keycode = e.which || e.keyCode;
                        var arrKeycode = [8, 37, 39, 46];
                        if (!(event.shiftKey == false &&
                            ((arrKeycode.indexOf(keycode) > 0) || (keycode >= 48 && keycode <= 57)))) {
                            event.preventDefault();
                        }
                    });
            });
    });

    _frmDTNhaBH.getControl("so_id_dt").addEventChange(val => {
        var dt = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == val && n.so_id == hop_dong_chi_tiet.data_info.hd.so_id);
        if (dt.length != 0) {
            lhnv = JSON.parse(
                JSON.stringify(objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.loai == dt[0].loai)));

            _frmDTNhaBH.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        } else {
            _frmDTNhaBH.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        }
    });
    _frmDTNoiBo.getControl("so_id_dt").addEventChange(val => {
        var dt = hop_dong_chi_tiet.data_info.gcn.where(n => n.so_id_dt == val && n.so_id == hop_dong_chi_tiet.data_info.hd.so_id);
        if (dt.length != 0) {
            lhnv = JSON.parse(
                JSON.stringify(objDanhMuc.lhnv.where(n => n.ma_doi_tac == hop_dong_chi_tiet.data_info.hd.ma_doi_tac && n.loai == dt[0].loai)));

            _frmDTNoiBo.getControl("lhnv").setDataSource(lhnv, "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        } else {
            _frmDTNoiBo.getControl("lhnv").setDataSource([], "ten", "ma", "Chọn loại hình nghiệp vụ", "");
        }
    });
    _frmSaveQLKH.getControl('loai_kh').addEventChange(val => {
        if (val == 'T') {
            $('#cmt').hide();
            $('#mst').show();
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', true);
        } else if (val == 'C') {
            $('#cmt').show();
            $('#mst').hide();
            $('form[name=frmSaveQLKH] input[name=mst]').prop('required', false);
            $('form[name=frmSaveQLKH] input[name=cmt]').prop('required', true);
        }
    });

    _frmSaveQLKHSearch.getControl("loai_kh").addEventChange(val => {
        if (val == 'T') {
            $('#cmt_search').hide();
            $('#mst_search').show();
            $('form[name=frmSaveQLKHSearch] input[name=cmt]').prop('required', false);
            $('form[name=frmSaveQLKHSearch] input[name=mst]').prop('required', true);
        } else if (val == 'C') {
            $('#cmt_search').show();
            $('#mst_search').hide();
            $('form[name=frmSaveQLKHSearch] input[name=mst]').prop('required', false);
            $('form[name=frmSaveQLKHSearch] input[name=cmt]').prop('required', true);
        }
    });

    $('form[name="frmGCNXE"] input[name="ngay_hl"]').change(function () {
        var vl = $('form[name="frmGCNXE"] input[name="ngay_hl"]').val();
        if (vl != "") {
            var ngay_kt_date = vl.slice(0, 6);
            var ngay_kt_int = parseInt(vl.slice(-4, 10)) + 1;
            $('form[name="frmGCNXE"] input[name="ngay_kt"]').val(ngay_kt_date.toString() + ngay_kt_int.toString());
        }
    });

    $('form[name="frmGCNXE"] input[name="gio_hl"]').change(function () {
        var vl = $('form[name="frmGCNXE"] input[name="gio_hl"]').val();
        $('form[name="frmGCNXE"] input[name="gio_kt"]').val(vl);
    });

    $('form[name="frmGCNXE"] input[name="bien_xe"]').keyup(function () {
        checkNullBienXe(_frmGCNXE.getControl('bien_xe').getValue(), _frmGCNXE.getControl('so_khung').getValue(), _frmGCNXE.getControl('so_may').getValue());
    });
    $('form[name="frmGCNXE"] input[name="so_khung"]').keyup(function () {
        checkNullBienXe(_frmGCNXE.getControl('bien_xe').getValue(), _frmGCNXE.getControl('so_khung').getValue(), _frmGCNXE.getControl('so_may').getValue());
    });
    $('form[name="frmGCNXE"] input[name="so_may"]').keyup(function () {
        checkNullBienXe(_frmGCNXE.getControl('bien_xe').getValue(), _frmGCNXE.getControl('so_khung').getValue(), _frmGCNXE.getControl('so_may').getValue());
    });

    $('#btnTransImageView').click(function () {
        $("#dsAnhTonThat").toggleClass("list");
        if ($("#dsAnhTonThat").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });

    $("#btnAdd").click(function () {
        $("#btnFooter").hide();
        anHienThemMoiKH();
        _modalMotorcycleContractSearch.show();
        getPagingKhachHang(1, res => {
            _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
            _frmMotorcycleContractSearch.resetForm();
            _frmMotorcycleContractSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
            _frmMotorcycleContractSearch.getControl("ma_doi_tac").trigger("select2:select");

            setTimeout(() => {
                _gridViewKH.table.redraw(true);
            }, 200);
        });
    });

    $("#btnTiepTheo").click(function () {
        if (_dataKH == null) {
            _notifyService.error("Vui lòng chọn khách hàng");
            return;
        }
        _navTabTimKiemKhachHang.showTab("tabThongTinHD");
        ganGiaTriFormHD(_dataKH);
    });

    $("#btnQuayLai").click(function () {
        setTimeout(() => {
            _gridViewKH.table.redraw(true);
        }, 100);
        _navTabTimKiemKhachHang.showTab("tabTimKiemKH");
    });

    $("#btnSearch").click(function () {
        getPaging(1);
    });

    $("#btnCarSearch").click(function () {
        _dataKH = null;
        getPagingKhachHang(1);
    });

    $("#btnDeleteQLKH").click(function () {
        _notifyService.confirmDelete("Chức năng tạm thời không được xóa")
    });

    $("#btnLuuHD").click(function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SAVE';
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }
            _motorcycleContractService.hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDong.getControl('so_id').val(res.out_value.so_id);
                    formData.so_id = res.out_value.so_id;
                    $('.close').trigger('click');
                    $('#btnSearch').click();
                    layChitietHopDong(formData);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnLuuHDEdit").click(function () {
        if (_frmHopDongEdit.isValid()) {
            var formData = _frmHopDongEdit.getJsonData();
            if (formData.kieu_hd == 'G') {
                formData.so_hd_sdbs = formData.so_hd;
            }
            _motorcycleContractService.hd_nhap(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công.");
                    _frmHopDongEdit.getControl('so_id').val(res.out_value.so_id);
                    formData.so_id = res.out_value.so_id;
                    layChitietHopDong(formData);
                    _modalEditHD.hide();
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $("#btnClose").click(function () {
        $("#inside-modal").esmodal("hide");
    });

    $("#btnSuaThongTinHD").click(function () {
        _frmHopDongEdit.resetForm();
        _frmHopDongEdit.clearErrorMessage();
        _frmHopDongEdit.setData(hop_dong_chi_tiet.data_info.hd);
        _frmHopDongEdit.getControl("ma_doi_tac").setValue(hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql);
        _frmHopDongEdit.getControl("ma_doi_tac").trigger("select2:select");
        _frmHopDongEdit.getControl("ma_chi_nhanh").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql);
        _frmHopDongEdit.getControl("ma_chi_nhanh").trigger("select2:select");
        _frmHopDongEdit.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmHopDongEdit.getControl("kieu_hd").trigger("select2:select");
        _frmHopDongEdit.getControl("khach_hang").val(hop_dong_chi_tiet.data_info.hd.ten + ' - ' + hop_dong_chi_tiet.data_info.hd.ma_kh);
        _frmHopDongEdit.getControl("kieu_hd").readOnly();
        _frmHopDongEdit.getControl("so_hd_goc").readOnly();
        _frmHopDongEdit.getControl("ma_doi_tac").readOnly(false);
        _frmHopDongEdit.getControl("ma_chi_nhanh").readOnly(false);
        _frmHopDongEdit.getControl("phong").readOnly(false);
        _frmHopDongEdit.getControl("loai").setValue("SAVE");
        _modalEditHD.show();
    });

    $("#btnCloseHD").click(function () {
        $("#modalMotorcycleContractSearch").esmodal("hide");
    })

    $('#btnLuuSDBS').click(function () {
        if (_frmHopDong.isValid()) {
            var formData = _frmHopDong.getJsonData();
            formData.loai = 'SDBS';
            if (formData.so_id == null || formData.so_id == '') {
                _notifyService.error("Chọn hợp đồng để tạo phụ lục.");
                return;
            }

            if (hop_dong_chi_tiet.data_info.hd.so_hd == formData.so_hd) {
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

    $('#btnMoiGCN').click(function () {
        _frmGCNXE.resetForm();
        _frmGCNXE.clearErrorMessage();
        _frmGCNXE.getControl("loai").setValue("TN");
        _frmGCNXE.getControl("ma_doi_tac").setValue(hop_dong_chi_tiet.data_info.hd.ma_doi_tac);
        _frmGCNXE.getControl("ma_chi_nhanh").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh);
        _frmGCNXE.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmGCNXE.getControl("so_id").setValue(hop_dong_chi_tiet.data_info.hd.so_id);
        _frmGCNXE.getControl("loai").trigger("select2:select");
        xemChiTietGCN(hop_dong_chi_tiet.data_info.hd.ma_doi_tac, "", "");
    });

    $('#btnCopyGCN').click(function () {
        _frmGCNXE.getControl('gcn').val('');
        _frmGCNXE.getControl('so_id_dt').val('');
    });

    $('#btnLuuGCN').click(function () {
        if (!_frmGCNXE.isValid())
            return;
        var obj = _frmGCNXE.getJsonData();
        obj.dk = getDataTable();
        _motorcycleContractService.luuThongTinGCN(obj).then(res => {
            if (res.state_info.status === "OK") {
                var objChiTiet = {
                    ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                    ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                    so_id: hop_dong_chi_tiet.data_info.hd.so_id,
                    so_id_dt: res.out_value.so_id_dt
                };
                layChitietHopDong(objChiTiet, resCtiet => {
                    xemChiTietGCN(objChiTiet.ma_doi_tac, objChiTiet.so_id, objChiTiet.so_id_dt);
                });
                _notifyService.success("Lưu thông tin thành công.");
                getPaging(1);
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnUpLoadAnhDGTT').click(function () {
        var obj = {
            ma_doi_tac: _frmGCNXE.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNXE.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNXE.getControl("so_id").val(),
            so_id_dt: _frmGCNXE.getControl("so_id_dt").val(),
            type: "image",
            pm: "BH",
            loai: ""
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Không xác định đối tượng bảo hiểm");
            return;
        }
        _uploadService.setParam(obj);
        _uploadService.showPupup();
    });

    $('#btnXoaLoadAnhDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần xóa");
            return;
        }
        var obj = {
            ma_doi_tac: _frmGCNXE.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNXE.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNXE.getControl("so_id").val(),
            so_id_dt: _frmGCNXE.getControl("so_id_dt").val(),
            type: "image",
            pm: CONSTANT_PM,
            bt: arrVal,
            loai: ""
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Không xác định đối tượng bảo hiểm");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa các ảnh đã chọn không?", 1, val => {
            _motorcycleContractService.xoaAnhHoSoGiamDinh(obj).then(res => {
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
            _motorcycleContractService.layAnhChiTiet({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal[0] }).then(res => {
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
            _motorcycleContractService.taiFileAnhTonThatZip({ so_id: hop_dong_chi_tiet.data_info.hd.so_id, bt: arrVal }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    });

    //$("#btnExportDSXE").click(function () {
    //    var formData = _frmHopDong.getJsonData();
    //    formData.ma_mau_in = "ESCS_EXCEL_DS_XE";
    //    _service.getFile("/common/ExportExcelTable", formData).then(res => {
    //        ESUtil.convertBase64ToFile(res, "export_" + new Date().toDateString() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    //    });
    //});

    $("#btnExportDSXE").click(function () {
        var obj = _frmTimKiem.getJsonData();
        obj.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        obj.ma_chi_nhanh = hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh;
        obj.ma_mau_in = "ESCS_EXCEL_DS_XEV2";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });

    $('#btnViewAnhListDGTT').click(function () {
        var arrVal = getImageSelect();
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        _frmThemHMTT.getControl("hang_muc").setValue("");
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

    $("#btnLuuDKBS").click(function () {
        var obj = {
            ma_doi_tac: _frmGCNXE.getControl("ma_doi_tac").val(),
            ma_chi_nhanh: _frmGCNXE.getControl("ma_chi_nhanh").val(),
            so_id: _frmGCNXE.getControl("so_id").val(),
            so_id_dt: _frmGCNXE.getControl("so_id_dt").val(),
            dkbs: getTableDKBS()
        };
        if (obj.ma_doi_tac == "" || obj.ma_chi_nhanh == "" || obj.so_id == "" || obj.so_id_dt == "") {
            _notifyService.error("Bạn chưa chọn đối tượng bảo hiểm");
            return;
        }
        _notifyService.confirmDelete("Bạn có chắc chắn muốn lưu thông tin điều khoản bổ sung này không?", "", () => {
            _motorcycleContractService.luuThongTinDKBS(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var strDKBS = "";
                for (var i = 0; i < obj.dkbs.length; i++) {
                    if (strDKBS == "")
                        strDKBS = obj.dkbs[i].ma;
                    else
                        strDKBS += "," + obj.dkbs[i].ma;
                }
                _frmGCNXE.getControl("dkbs").val(strDKBS);
                _notifyService.success("Lưu thông tin thành công");
            });
        });
    });

    $("#btnThemMoiKhachHang").click(function () {
        $("#btnFooter").show();
        _frmSaveQLKHSearch.clearErrorMessage();
        _frmSaveQLKHSearch.resetForm();
        _frmSaveQLKHSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmSaveQLKHSearch.getControl("ma_doi_tac").trigger("select2:select");
        _frmSaveQLKHSearch.getControl("loai_kh").setValue("C");
        _frmSaveQLKHSearch.getControl("loai_kh").trigger("select2:select");
        anHienThemMoiKH("frmSaveQLKHSearch", false);
    });

    $("#btnHuyThemMoiKH").click(function () {
        anHienThemMoiKH("frmMotorcycleContractSearch", false);
        $("#btnFooter").hide();
    });

    $("#btnSaveQLKHSearch").click(function () {
        if (!_frmSaveQLKHSearch.isValid()) {
            return;
        }
        var obj = _frmSaveQLKHSearch.getJsonData();
        luuThongTinKH(obj, res => {
            _frmMotorcycleContractSearch.getControl("tim").val(obj.ma);
            $("#btnCarSearch").trigger("click");
            anHienThemMoiKH("frmMotorcycleContractSearch", false);
            _notifyService.success("Lưu thông tin khách hàng thành công.");
        });
    });

    $("#btnSuaThongTinKH").click(function () {
        _customerService.xemChiTiet_KH({
            ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
            ma: hop_dong_chi_tiet.data_info.hd.ma_kh
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmSaveQLKH.clearErrorMessage();
            _frmSaveQLKH.setData(res.data_info);
            _frmSaveQLKH.getControl("ma_doi_tac").trigger("select2:select");
            _frmSaveQLKH.getControl("ma_chi_nhanh").setValue(res.data_info.ma_chi_nhanh);
            _frmSaveQLKH.getControl("ma_doi_tac").readOnly();
            _frmSaveQLKH.getControl("ma_chi_nhanh").readOnly();
            _frmSaveQLKH.getControl("ma").readOnly();
            _frmSaveQLKH.getControl('loai_kh').trigger('select2:select');
            _modalEditKH.show();
        });
    });

    $("#btnSaveQLKH").click(function () {
        if (!_frmSaveQLKH.isValid()) {
            return;
        }
        var obj = _frmSaveQLKH.getJsonData();
        luuThongTinKH(obj, res => {
            _modalEditKH.hide();
            layChitietHopDong({
                ma_doi_tac: hop_dong_chi_tiet.data_info.hd.ma_doi_tac,
                ma_chi_nhanh: hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh,
                so_id: hop_dong_chi_tiet.data_info.hd.so_id
            });
            _notifyService.success("Lưu thông tin khách hàng thành công.");
        });
    });

    $("#inputSearch").keyup(function () {
        setTimeout(() => {
            var val = $(this).val().toLowerCase();
            if (val == "") {
                $("#danhDachGCN tr[data-search]").show();
                return;
            }
            $("#danhDachGCN tr[data-search]").hide();
            $("#danhDachGCN tr[data-search*='" + val + "']").show();
        }, 500);
    });

    $("#btnXemThongTinSDBS").click(function () {
        ESUtil.genHTML("SDBS_template", "tableSDBS", { dk: hop_dong_chi_tiet.data_info.hd_sdbs });
        _modalSDBS.show();
    });

    $('#nbh').click(function () {
        $('#btnMoiDTNhaBH').trigger('click');
    });
    $('#nb').click(function () {
        $('#btnMoiDTNoiBo').trigger('click');
    });

    $('#btnLuuDTNhaBH').click(function () {
        if (_frmDTNhaBH.isValid()) {
            if (_frmDTNhaBH.getControl('tl_dong').val() == "" && _frmDTNhaBH.getControl('tl_tai_cd').val() == "" && _frmDTNhaBH.getControl('tl_tai_tt').val() == "") {
                _notifyService.error("Bạn không được để trống cả 3 trường tỷ lệ đồng / tái");
                return;
            }
            var formData = _frmDTNhaBH.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            formData.nv = 'XE_MAY';
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NGOAI';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _motorcycleContractService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _motorcycleContractService.getListDongtai(objInput).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    $('#btnMoiDTNhaBH').trigger('click');
                    _notifyService.success("Lưu thông tin thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $('#btnLuuDTNoiBo').click(function () {
        if (_frmDTNoiBo.isValid()) {
            var formData = _frmDTNoiBo.getJsonData();
            formData.ma_doi_tac = hop_dong_chi_tiet.data_info.hd.ma_doi_tac;
            formData.nv = 'XE_MAY';
            formData.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
            formData.loai_dong = 'NOIBO';
            if (formData.so_id_dt == '') {
                formData.so_id_dt = 0;
            }
            if (formData.lhnv == '') {
                formData.lhnv = ' ';
            }
            _motorcycleContractService.LuuThongTinDongTai(formData).then(res => {
                if (res.state_info.status === "OK") {
                    var objInput = {
                        ma_doi_tac: formData.ma_doi_tac,
                        so_id: formData.so_id,
                        nv: formData.nv
                    }
                    _motorcycleContractService.getListDongtai(objInput).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    $('#btnMoiDTNoiBo').trigger('click');
                    _notifyService.success("Lưu thông tin thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    $('#btnXoaDTNhaBH').click(function () {
        var objInput = _frmDTNhaBH.getJsonData();
        objInput.nv = 'XE_MAY';
        objInput.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        objInput.loai_dong = 'NGOAI';
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa không?", 1, val => {
            _motorcycleContractService.XoaDongTai(objInput).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                } else {
                    _notifyService.success("Xóa đồng tái thành công.");
                    var dt = {
                        ma_doi_tac: objInput.ma_doi_tac,
                        so_id: objInput.so_id,
                        nv: objInput.nv
                    }
                    _motorcycleContractService.getListDongtai(dt).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                }
            });
        });
    });

    $('#btnXoaDTNoiBo').click(function () {
        var objInput = _frmDTNoiBo.getJsonData();
        objInput.nv = 'XE_MAY';
        objInput.so_id = hop_dong_chi_tiet.data_info.hd.so_id;
        objInput.loai_dong = 'NOIBO';
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa đồng tái này không?", 1, val => {
            _motorcycleContractService.XoaDongTai(objInput).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                } else {
                    var dt = {
                        ma_doi_tac: objInput.ma_doi_tac,
                        so_id: objInput.so_id,
                        nv: objInput.nv
                    }
                    _motorcycleContractService.getListDongtai(dt).then(res => {
                        ESUtil.genHTML("DongTai_template", "tableDongTai", { dk: res.data_info });
                    });
                    _notifyService.success("Xóa đồng tái thành công.");
                }
            });
        });
    });

    $('#btnMoiDTNhaBH').click(function () {
        _frmDTNhaBH.resetForm();
        _frmDTNhaBH.clearErrorMessage();
    });

    $('#btnMoiDTNoiBo').click(function () {
        _frmDTNoiBo.resetForm();
        _frmDTNoiBo.clearErrorMessage();
        Xem_chi_tiet_dong_tai("", "", "", "", "");
        _frmDTNoiBo.getControl('lhnv').setDataSource([], 'ten', 'lh_nv', 'Chọn loại hình nghiệp vụ', '');
    });

    $("#btnSDBS").click(function () {
        _frmHopDongEdit.resetForm();
        _frmHopDongEdit.clearErrorMessage();
        _frmHopDongEdit.setData(hop_dong_chi_tiet.data_info.hd);
        _frmHopDongEdit.getControl("so_id").setValue("");
        _frmHopDongEdit.getControl("ma_doi_tac").setValue(hop_dong_chi_tiet.data_info.hd.ma_doi_tac_ql);
        _frmHopDongEdit.getControl("ma_doi_tac").trigger("select2:select");
        _frmHopDongEdit.getControl("ma_chi_nhanh").setValue(hop_dong_chi_tiet.data_info.hd.ma_chi_nhanh_ql);
        _frmHopDongEdit.getControl("ma_chi_nhanh").trigger("select2:select");
        _frmHopDongEdit.getControl("phong").setValue(hop_dong_chi_tiet.data_info.hd.phong);
        _frmHopDongEdit.getControl("kieu_hd").setValue("B");
        _frmHopDongEdit.getControl("kieu_hd").trigger("select2:select");
        _frmHopDongEdit.getControl("kieu_hd").readOnly();
        _frmHopDongEdit.getControl("so_hd_goc").setValue(hop_dong_chi_tiet.data_info.hd.so_hd_sdbs);
        _frmHopDongEdit.getControl("so_hd_goc").readOnly();
        _frmHopDongEdit.getControl("khach_hang").val(hop_dong_chi_tiet.data_info.hd.ten + ' - ' + hop_dong_chi_tiet.data_info.hd.ma_kh);
        _frmHopDongEdit.getControl("ma_doi_tac").readOnly();
        _frmHopDongEdit.getControl("ma_chi_nhanh").readOnly();
        _frmHopDongEdit.getControl("phong").readOnly();
        _frmHopDongEdit.getControl("so_hd").setValue("");
        _frmHopDongEdit.getControl("trang_thai").setValue("C");
        _frmHopDongEdit.getControl("loai").setValue("SDBS");
        _modalEditHD.show();
    });

    $('#btnImportDSXE').click(function () {
        _modalUploadExcel.show();
    });

    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });

    $('#btnSaveExcel').click(function () {
        var obj = {
            data: objData,
            so_id: hop_dong_chi_tiet.data_info.hd.so_id
        };
        _motorcycleContractService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Import excel thành công.");
                layChitietHopDong(hop_dong_chi_tiet.data_info.hd);
                getPaging(1);
                _modalUploadExcel.hide();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });

    $('#btnNewExcel').click(function () {
        _uploadExcelService.refresh();
    });

    $("#btnChonDKBS").click(function () {
        var arrInput = $(".modalChonDKBSItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        var id = $("#modalChonDKBSElementSelect").val();
        $("#" + id).val(val);
        if ($("#" + id).attr("onchange") != undefined) {
            $("#" + id).trigger("change");
        }
        _modalChonDKBS.hide();
    });

    $("#btnLuuHMTT").click(function () {
        luuPhanLoaiHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanLoaiHangMuc(res => {
            _modalThemHMTT.hide();
        });
    });

    getPaging(1);
});