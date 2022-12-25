const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'PD'; //Phê duyệt
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var _commonService = new CommonService();
var _statusListService = new StatusListService();
// PHÊ DUYỆT 
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var objDanhMuc = {};
var arrTrangThai = [];
var ho_so_chi_tiet = {};
var _notifyService = new NotifyService();
var _approvedOtherService = new ApprovedOtherService();
var _partnerListService = new PartnerListService(); // lấy đối tác
var _branchListService = new BranchListService(); // lấy chi nhánh
var _CarInvestigationService = new CarInvestigationService();
var _service_trinh_duyet = new TrinhDuyetService();
var _service = new Service();
// Tìm kiếm
var _frmTimKiemHoSo = new FormService("frmApprovedOtherSearch");
// Tab 1 : xem File + ảnh
var _frmPheDuyet_tab1 = new FormService("_frmPheDuyet_tab1");
// Tab 2 : xem lưới tính toán
var _frmPheDuyet_tab2 = new FormService("_frmPheDuyet_tab2");
// Nút tìm kiếm 
var _btnTimKiemHoSo = new ButtonService("btnSearch");
// Đồng ý
var _btnDongY = new ButtonService("btnDongY");
var _btnDongY3 = new ButtonService("btnDongY3");
// Từ chối 
var _btnHuyDongY = new ButtonService("btnHuyDongY");
var _btnHuyDongY3 = new ButtonService("btnHuyDongY3");
// Trình tiếp
var _btnTrinhTiep = new ButtonService("btnTrinhTiep");
// so_id , ma_doi_tac
var so_id_1;
var ma_doi_tac_1;
var nv_1;
var lhnv_1;
var loai_trinh_1;
var ma_chi_nhanh_1;

var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var _frmModalTrinhDuyet = new FormService("frmModalTrinhDuyet");
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ten_dvi_trinh", title: "Đơn vị trình", width: "15%", headerSort: false },
    { field: "nguoi_trinh", title: "Người trình", width: "10%", hozAlign: "center", headerSort: false },
    { field: "loai", title: "Loại trình", width: "15%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "số hồ sơ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "6%", hozAlign: "center", headerSort: false },
    { field: "tien_trinh", title: "Tiền trình", width: "8%", hozAlign: "right", headerSort: false },
    { field: "tien_duyet", title: "Tiền duyệt", width: "8%", hozAlign: "right", headerSort: false },
    { field: "trang_thai_duyet_hthi", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "noi_dung_trinh", title: "Nội dung trình", width: "25%", hozAlign: "left", headerSort: false }
];
var _gridViewdsPheDuyet = new GridViewService("gridViewdsPheDuyet", configColumn, getPaging, rowClick);
function anHienNutDuyet() {
    $("#btnDongY").hide();
    $("#btnHuyDongY").hide();
    $("#btnDongY3").hide();
    $("#btnHuyDongY3").hide();
    if (ho_so_chi_tiet.data_info.trinh_duyet == undefined || ho_so_chi_tiet.data_info.trinh_duyet == null ||
        ho_so_chi_tiet.data_info.trinh_duyet.length <= 0) {
        return;
    }
    var count = ho_so_chi_tiet.data_info.trinh_duyet.where(n => n.ma_doi_tac_duyet == ESCS_MA_DOI_TAC && n.nguoi_duyet == ESCS_NSD).length;
    if (count) {
        var duyet_chinh = ho_so_chi_tiet.data_info.trinh_duyet.where(n => n.ma_doi_tac_duyet == ESCS_MA_DOI_TAC && n.phe_duyet == "1").firstOrDefault();
        var item = ho_so_chi_tiet.data_info.trinh_duyet.where(n => n.ma_doi_tac_duyet == ESCS_MA_DOI_TAC && n.nguoi_duyet == ESCS_NSD).firstOrDefault();
        if (duyet_chinh.trang_thai == "C") {
            if (item.trang_thai == "D") {
                $("#btnHuyDongY").show();
                $("#btnHuyDongY3").show();
            }
            if (item.trang_thai == "C") {
                $("#btnDongY").show();
                $("#btnDongY3").show();
            }
        }
        if (duyet_chinh.trang_thai == "D" && duyet_chinh.nguoi_duyet == ESCS_NSD) {
            if (item.trang_thai == "D") {
                $("#btnHuyDongY").show();
                $("#btnHuyDongY3").show();
            }
            if (item.trang_thai == "C") {
                $("#btnDongY").show();
                $("#btnDongY3").show();
            }
        }
    }
}
function getPaging(trang) {
    if (_frmTimKiemHoSo.isValid()) {
        var objTimKiem = _frmTimKiemHoSo.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _approvedOtherService.paging(objTimKiem).then(res => {
            _gridViewdsPheDuyet.setDataSource(res, trang);
        });
    }
}
function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.documentElement.scrollHeight + 'px';
}
function calcHeight(iframeElement) {
    if (iframeElement && iframeElement && iframeElement.contentWindow && iframeElement.contentWindow.document && iframeElement.contentWindow.document.body) {
        var the_height = iframeElement.contentWindow.document.body.scrollHeight;
        iframeElement.height = the_height;
    }
}
function setIframe(id, html) {
    $('#viewHtml_iframe_viewer').attr("srcdoc", html);
}
function loadDsTrinhDuyet() {
    var item = ho_so_chi_tiet.data_info.trinh_duyet.where(n => n.ma_doi_tac_duyet == ESCS_MA_DOI_TAC && n.nguoi_duyet == ESCS_NSD).firstOrDefault();
    var objGetDetail = {
        ma_doi_tac: ho_so_chi_tiet.data_info.ho_so.ma_doi_tac,
        so_id: ho_so_chi_tiet.data_info.ho_so.so_id,
        loai: item.loai
    };
    _approvedOtherService.getDetail(objGetDetail).then(res => {
        ho_so_chi_tiet = res;
        ESUtil.genHTML("tblDanhSachTrinhDuyet_template", "tblStep1_lstrinh_tbody", res.data_info);
        anHienNutDuyet();
    });
}
function anHienTableStep3(table) {
    $(".tblStep3").hide();
    $("#tblStep3_" + table).show();
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    //if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
    //    return;
    //}
    var objGetDetail = { ma_doi_tac: ESCS_MA_DOI_TAC, so_id: data.so_id, loai: data.loai_trinh, bt: data.bt };
    var mau_in = "ESCS_BBGD";
    if (data.ma == 'XE_TRINH_DUYET_TAM_UNG_BT') {
        mau_in = "ESCS_TAM_UNG_BT";
    };
    if (data.ma == 'XE_TRINH_DUYET_THU_HOI_VAT_TU') {
        mau_in = "ESCS_THANH_LY_VAT_TU";
    };
    if (data.ma == 'XE_TRINH_DUYET_THU_DOI_NTBA') {
        mau_in = "ESCS_THU_DOI_NTBA";
    };

    so_id_1 = data.so_id;
    ma_doi_tac_1 = data.ma_doi_tac;
    nv_1 = "XE";
    lhnv_1 = data.lh_nv;
    loai_trinh_1 = data.ma;
    ma_chi_nhanh_1 = data.ma_chi_nhanh;
    _approvedOtherService.getDetail(objGetDetail).then(res => {
        var arrRes = [];
        arrRes[0] = null;
        arrRes.push(res);
        var ma_dt_trinh = res.data_info.trinh.ma_dt_trinh;
        
        _commonService.InPdf({
            ma_mau_in: mau_in,
            so_id: data.so_id,
            loai: data.loai_trinh,
            ma_dt_trinh: ma_dt_trinh,
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_doi_tac_ql: ESCS_MA_DOI_TAC
        }).then(resFile => {
            arrRes[0] = resFile;
            try {
                var errorJson = JSON.parse(arrRes[0]);
                _notifyService.error(errorJson.state_info.message_body);
                return;
            } catch { }

            PDFObject.embed("data:application/pdf;base64," + arrRes[0],
                "#viewHtml", {
                pdfOpenParams: {
                    navpanes: 0,
                    statusbar: 0,
                    toolbar: 0,
                    view: "FitH",
                    pagemode: "bookmarks"
                }
            });

            ho_so_chi_tiet = arrRes[1];

            var res = arrRes[1];
            ESStorage.setItemLocalStorage("detail", JSON.stringify(res.data_info));

            _frmPheDuyet_tab1.getControl("ma_doi_tac").setValue(data.ma_doi_tac);
            _frmPheDuyet_tab1.getControl("ma_doi_tac_xl").setValue(data.ma_doi_tac_xl);
            _frmPheDuyet_tab1.getControl("so_id").setValue(data.so_id);
            _frmPheDuyet_tab1.getControl("bt").setValue(data.bt);
            _frmPheDuyet_tab1.getControl("nv").setValue(data.nv);
            _frmPheDuyet_tab1.getControl("loai").setValue(data.ma);
            _frmPheDuyet_tab1.getControl("noi_dung").setValue(data.noi_dung);
            _frmPheDuyet_tab1.getControl("noi_dung_duyet").setValue(data.noi_dung_duyet);

            _frmPheDuyet_tab2.getControl("ma_doi_tac").setValue(data.ma_doi_tac);
            _frmPheDuyet_tab2.getControl("ma_doi_tac_xl").setValue(data.ma_doi_tac_xl);
            _frmPheDuyet_tab2.getControl("so_id").setValue(data.so_id);
            _frmPheDuyet_tab2.getControl("bt").setValue(data.bt);
            _frmPheDuyet_tab2.getControl("nv").setValue(data.nv);
            _frmPheDuyet_tab2.getControl("loai").setValue(data.ma);
            _frmPheDuyet_tab2.getControl("noi_dung").setValue(data.noi_dung);
            _frmPheDuyet_tab2.getControl("noi_dung_duyet").setValue(data.noi_dung_duyet);

            if (data.ma == 'XE_TRINH_DUYET_TAM_UNG_BT') {
                anHienTableStep3("tubt");
                $(".tam_ung_tong").html("0");
                var tong = 0;
                if (res.data_info.pa_khac_phuc != null && res.data_info.pa_khac_phuc.length > 0) {
                    for (var i = 0; i < res.data_info.pa_khac_phuc.length; i++) {
                        tong += res.data_info.pa_khac_phuc[i].tien;
                    }
                }
                $(".tam_ung_tong").html(ESUtil.formatMoney(tong));
                ESUtil.genHTML("tblStep3_tubt_template", "tblStep3_tubt_tbody", res.data_info);
            };
            if (data.ma == 'XE_TRINH_DUYET_THU_DOI_NTBA') {
                anHienTableStep3("ntba");
                $(".ntba_tong").html("0");
                var tong = 0;
                if (res.data_info.pa_khac_phuc != null && res.data_info.pa_khac_phuc.length > 0) {
                    for (var i = 0; i < res.data_info.pa_khac_phuc.length; i++) {
                        tong += res.data_info.pa_khac_phuc[i].tien;
                    }
                }
                $(".ntba_tong").html(ESUtil.formatMoney(tong));
                ESUtil.genHTML("tblStep3_ntba_template", "tblStep3_ntba_tbody", res.data_info);
            };
            //if (data.ma == 'XE_TRINH_DUYET_THU_HOI_VAT_TU') {
            //    anHienTableStep3("ntba");
            //    $(".ntba_tong").html("0");
            //    var tong = 0;
            //    if (res.data_info.pa_khac_phuc != null && res.data_info.pa_khac_phuc.length > 0) {
            //        for (var i = 0; i < res.data_info.pa_khac_phuc.length; i++) {
            //            tong += res.data_info.pa_khac_phuc[i].tien;
            //        }
            //    }
            //    $(".ntba_tong").html(ESUtil.formatMoney(tong));
            //    ESUtil.genHTML("tblStep3_ntba_template", "tblStep3_ntba_tbody", res.data_info);
            //};

            $('[data-toggle="tooltip"]').tooltip();
            $("#CarCompensationModal #so_ho_so").html(res.data_info.ho_so != null? res.data_info.ho_so.so_hs: "Không thuộc hồ sơ nào");
            $("#CarCompensationModal #noi_dung_trinh").html(data.loai);

            if (row !== undefined) {
                row.select();
            }
            ESUtil.genHTML("tblDanhSachTrinhDuyet_template", "tblStep1_lstrinh_tbody", res.data_info);
            getAnhThumnail({ ma_doi_tac: data.ma_doi_tac, so_id: data.so_id, ma_chi_nhanh: data.ma_chi_nhanh });
            showModalPheDuyet();
            anHienNutDuyet();
            $("#y_kien_nguoi_duyet_khac").val("");
        });
    });
}
function hienThiHoSoNofify() {
    var notify_info = $("#notify_info").val();
    if (notify_info === undefined || notify_info === null || notify_info === "") {
        return;
    }
    var arr = notify_info.split('/');
    var data = {
        ma_doi_tac_ql: arr[0],
        so_id: arr[1]
    };
    rowClick(data);
}
// Hiển thị modal 
function showModalPheDuyet() {
    $("#CarCompensationModal").esmodal("show");
}
function getAnhThumnail(obj, callback = undefined) {
    _CarInvestigationService.layDanhSachFile(obj).then(res => {
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
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function html2json(table) {
    var otArr = [];
    $('table#' + table + ' tbody tr').each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var name = $(this).attr("name");
                if ($(this).hasClass("number")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        if (JSON.stringify(json) != '{}') {
            otArr.push(json);
        }
    });
    return otArr;
}
function xemChiTietNguoiTrinh(el, nd) {
    $("#y_kien_nguoi_duyet_khac").val("");
    if (nd != undefined && nd != null && nd != "") {
        $("#y_kien_nguoi_duyet_khac").val(nd);
    }
}
$(document).ready(function () {
    _frmTimKiemHoSo.getControl("ma_doi_tac").setValue("");
    _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _statusListService.layDsTrangThai(),
        _commonService.layControl({ nv: "XE" }),
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.cnhanh = arrRes[1].data_info;
        objDanhMuc.ds_trang_thai = arrRes[2].data_info;
        arrTrangThai = arrRes[3].data_info;
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";

        _frmTimKiemHoSo.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        var arrChiNhanh = objDanhMuc.cnhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
        hienThiHoSoNofify();
    });
    _frmTimKiemHoSo.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.cnhanh.where(n => n.ma_doi_tac === val);
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSo.getControl("ma_chi_nhanh").setValue("");
    });

    _frmTimKiemHoSo.getControl("ngayd").setValue(ngayDauThang);
    _frmTimKiemHoSo.getControl("ngayc").setValue(dateNow);
    getPaging(1);
    // tim kiem
    _btnTimKiemHoSo.click(function () {
        getPaging(1);
    });
    $('#FrmApprovedSearch_trang_thai, #FrmApprovedSearch_loai, #FrmApprovedSearch_nv, #FrmApprovedSearch_ma_chi_nhanh, #FrmApprovedSearch_ma_doi_tac').bind("change", function () {
        getPaging(1);
    });
    //Khi bấm duyệt
    _btnDongY.click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn duyệt không?", "", val => {
            var json = _frmPheDuyet_tab1.getJsonData();
            if (loai_trinh_1 == 'XE_TRINH_DUYET_TAM_UNG_BT') {
                json.ma_mau_in = "ESCS_TAM_UNG_BT";
            };
            if (loai_trinh_1 == 'XE_TRINH_DUYET_THU_HOI_VAT_TU') {
                json.ma_mau_in = "ESCS_THANH_LY_VAT_TU";
            };
            if (loai_trinh_1 == 'XE_TRINH_DUYET_THU_DOI_NTBA') {
                json.ma_mau_in = "ESCS_THU_DOI_NTBA";
            };
            json.pm = CONSTANT_PM;
            _approvedOtherService.PheDuyet(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                //loadDsTrinhDuyet();
                getPaging(1);
                _notifyService.success("Duyệt thành công !");
            });
        });
    });
    _btnDongY3.click(function () {
        _btnDongY.click();
    });
    //Khi bấm hủy duyệt
    _btnHuyDongY.click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy duyệt không?", "", val => {
            var json = _frmPheDuyet_tab2.getJsonData();
            _approvedOtherService.HuyDuyet(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                //loadDsTrinhDuyet();
                getPaging(1);
                _notifyService.success("Hủy duyệt thành công");
            });
        });
    });
    _btnHuyDongY3.click(function () {
        _btnHuyDongY.click();
    });

    // trình tiếp 
    $('#btnTrinhTiep').bind("click", function () {
        console.log(objDanhMuc.doi_tac);
        _frmModalTrinhDuyet.getControl("ma_doi_tac_duyet").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", "");

        var obj = {
            ma_doi_tac: ma_doi_tac_1,
            so_id: so_id_1
        }

        loadLichSuTrinhDuyet(obj, "gridTrinhDuyet_template", "gridTrinhDuyet");
    });

    _frmModalTrinhDuyet.getControl("ma_doi_tac_duyet").addEventChange(val => {
        if (_frmPheDuyet_tab2.isValid()) {
            _service_trinh_duyet.layDanhSachNguoiDuyet({
                ma_doi_tac: val,
                ma_doi_tac_duyet: val,
                so_id: so_id_1,
                nv: "XE",
                loai: loai_trinh_1
            }).then(res => {
                console.log(res);
                _frmModalTrinhDuyet.getControl("nguoi_duyet").setDataSource(res.data_info, "ten", "ma", "Chọn cán bộ");
            });
        }
    });

    _btnLuuTrinhDuyet.click(function () {
        var json = _frmModalTrinhDuyet.getJsonData();
        json.ma_doi_tac = ma_doi_tac_1;
        json.so_id = so_id_1;
        json.loai = loai;
        json.nv = nv_1;
        json.loai = loai_trinh_1;
        json.ma_chi_nhanh_duyet = ma_chi_nhanh_1;
        json.id_template = "gridTrinhDuyet_template";
        json.id_grid = "gridTrinhDuyet";
        json.ma_doi_tac_duyet = _frmModalTrinhDuyet.getControl("ma_doi_tac_duyet").val();
        luuTrinhDuyet(json);
        getPaging(1);
    });

    _btnHuyTrinhDuyet.click(function () {
        xoaTrinhDuyet();
        getPaging(1);
    });
});
