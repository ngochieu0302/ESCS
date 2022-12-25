var objDanhMuc = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var ngayDauNam = new Date().getNgayDauNam();
var gd_chon_anh_arr = [];
var ho_so_chi_tiet = undefined;

var configUpload = {
    onSuccess: function (file, response) {
        if (response.state_info.status === "NotOK") {
            _notifyService.error(response.state_info.message_body);
            return
        }
        getAnhThumnail();
    }
};

var _service = new Service();
var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _uploadService = new UploadService(configUpload);
var _partnerListService = new PartnerListService();
var _bankListService = new BankListService();
var _branchListService = new BranchListService();
var _expertationcostService = new ExpertationcostService();
var _categoryPersonService = new CategoryPersonService();
var _userManagementService = new UserManagementService();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'HSGD';
const NV = 'HSGD';

var _navChiPhiGiamDinh = new NavTabService("navChiPhiGiamDinh", ["tabThongTinChiPhiGiamDinh", "tabHoSoChungTu", "tabThongTinNguoiThuHuong"], "nav-pills");
var _frmTimKiemChiPhiGD = new FormService("frmTimKiemChiPhiGD");
var _frmHoaDonChungTuCP_GD = new FormService("frmHoaDonChungTuCP_GD");
var _frmNguoiThuHuongCP_GD = new FormService("frmNguoiThuHuongCP_GD");
var _frmTimKiemThongTinChung = new FormService("frmTimKiemThongTinChung");
var _frmThongTinChung = new FormService("frmThongTinChung");
var _frmHoaDonChungTu = new FormService("frmHoaDonChungTu");
var _frmNguoiThuHuong = new FormService("frmNguoiThuHuong");
var _frmUploadHDDT = new FormService("frmUploadHDDT");
var _frmThemHMTT = new FormService("frmThemHMTT");
var _frmChiPhiGDChiTiet = new FormService("frmChiPhiGDChiTiet");
var _frmBoSungTienThucTe = new FormService("frmBoSungTienThucTe");

var _modalHoaDonChungTuCP_GD = new ModalService("modalHoaDonChungTuCP_GD");
var _modalNguoiThuHuongCP_GD = new ModalService("modalNguoiThuHuongCP_GD");
var _modalHoaDonChungTu = new ModalService("modalHoaDonChungTu");
var _modalNguoiThuHuong = new ModalService("modalNguoiThuHuong");
var _modalDonViPhatHanhHoaDon = new ModalFullScreenService("modalDonViPhatHanhHoaDon");
var _modalTrinhDuyetService = new ModalTrinhDuyetService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalThemHMTT = new ModalFullScreenService("modalThemHMTT", "tabHoSoGiayTo");
var _modalTimKiemHoSo = new ModalService("modalTimKiemHoSo");
var _modalThemChiPhiGD = new ModalService("modalThemChiPhiGD");
var _modalBoSungTienThucTe = new ModalService("modalBoSungTienThucTe");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nv_hthi", title: "Nghiệp vụ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "15%", headerSort: false, hozAlign: "center" },
    { field: "tien_dx", title: "Tiền đx", width: "10%", hozAlign: "right", formatter: formatterMoney, headerSort: false },
    { field: "tien_duyet", title: "Tiền duyệt", width: "9%", hozAlign: "right", formatter: formatterMoney, headerSort: false },
    { field: "tien_thoa_thuan", title: "Tiền thỏa thuận", width: "10%", hozAlign: "right", formatter: formatterMoney, headerSort: false },
    { field: "tien_thue", title: "Tiền thuế", width: "9%", hozAlign: "right", formatter: formatterMoney, headerSort: false },
    { field: "tong_cong", title: "Tổng cộng", width: "9%", hozAlign: "right", formatter: formatterMoney, headerSort: false },
    { field: "trang_thai_ten", title: "Trạng thái", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "ten_doi_tac", title: "Đối tác", width: "15%", headerSort: false }
];

var _gridViewChiPhiGD = new GridViewService("gridViewChiPhiGD", configColumn, getPaging, rowClick);

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.so_id === undefined || data.so_id === null || data.so_id === 0 || data.so_id === "") {
        return;
    }
    if (row !== undefined) {
        row.select();
    }
    layHoSoCTiet(data, res => {
        _navChiPhiGiamDinh.showTab("tabThongTinChiPhiGiamDinh");
        var obj = {
            ma_doi_tac: res.data_info.ho_so.firstOrDefault().ma_doi_tac,
            so_id: res.data_info.ho_so.firstOrDefault().so_id_bt,
            nv: res.data_info.ho_so.firstOrDefault().nv
        }
        _expertationcostService.layChiTietHoSoBT(obj).then(res1 => {
            if (res1.state_info.status !== 'OK') {
                _notifyService.error(res1.state_info.message_body);
                return;
            }
            $("#tblThongTinHS").bindJsonToHtml(res1.data_info);
        });
        initHoaDonChungTu(ho_so_chi_tiet.chung_tu);
        initNguoiThuHuong(ho_so_chi_tiet.thu_huong);
    });
    ESUtil.genHTML("danhSachHoSoTemplate", "danhSachHoSo", { data: [] });
    showModalChinh();
}
function layHoSoCTiet(obj, callback = undefined) {
    _expertationcostService.GetDetail(obj).then(res => {
        if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ho_so_chi_tiet = res.data_info;
        $('#title_hsgd').html('Số hồ sơ: ' + ho_so_chi_tiet.ho_so[0].so_hs);
        if (ho_so_chi_tiet.ho_so.length > 0) {
            _frmThongTinChung.setData(ho_so_chi_tiet.ho_so[0]);
        }
        ESUtil.genHTML("tblThongTinChungTemplate", "tblThongTinChung", { data: ho_so_chi_tiet.ho_so });
        ESUtil.genHTML("tbDsChiPhiGDTemplate", "tbDsChiPhiGD", { danh_sach: ho_so_chi_tiet.chi_phi_ct }, () => {
            var tong_tien_dx = 0;
            var tong_tien_duyet = 0;
            var tong_thue = 0;
            var tong_tien_thoa_thuan = 0;
            var tong_tong_cong = 0;
            if (ho_so_chi_tiet.chi_phi_ct != null && ho_so_chi_tiet.chi_phi_ct.length > 0) {
                for (var i = 0; i < ho_so_chi_tiet.chi_phi_ct.length; i++) {
                    tong_tien_dx += parseInt(ho_so_chi_tiet.chi_phi_ct[i].tien_dx);
                    tong_tien_duyet += parseInt(ho_so_chi_tiet.chi_phi_ct[i].tien_duyet);
                    tong_thue += parseInt(ho_so_chi_tiet.chi_phi_ct[i].tien_thue);
                    tong_tien_thoa_thuan += parseInt(ho_so_chi_tiet.chi_phi_ct[i].tien_thoa_thuan);
                    tong_tong_cong += parseInt(ho_so_chi_tiet.chi_phi_ct[i].tong_cong);
                }
            }
            $("#tong_tien_dx").html(ESUtil.formatMoney(tong_tien_dx));
            $("#tong_tien_duyet").html(ESUtil.formatMoney(tong_tien_duyet));
            $("#tong_thue").html(ESUtil.formatMoney(tong_thue));
            $("#tong_tien_thoa_thuan").html(ESUtil.formatMoney(tong_tien_thoa_thuan));
            $("#tong_tong_cong").html(ESUtil.formatMoney(tong_tong_cong));
        });
        ESUtil.anHienControl(objDanhMuc.cau_hinh_nut, ho_so_chi_tiet.ho_so[0]);
        if (callback) {
            callback(res);
        }
    });
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiemChiPhiGD.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 13;
    _expertationcostService.timKiemPtrang(objTimKiem).then(res => {
        _gridViewChiPhiGD.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewChiPhiGD.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewChiPhiGD.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function bindEditChungTu() {
    $(".edit_chung_tu").click(function () {
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmHoaDonChungTu.setData(data);
        _modalHoaDonChungTu.show();
    });
    $(".xoaChungTu").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _expertationcostService.xoaChungTuBoiThuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initHoaDonChungTu(ho_so_chi_tiet.chung_tu);
                    _notifyService.success("Xóa chứng từ thành công.");
                });
            });
        });
    });
}
function bindEditThuHuong() {
    $(".edit_thu_huong").click(function () {
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmNguoiThuHuong.setData(data);
        _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
        _modalNguoiThuHuong.show();
    });
    $(".xoaNguoiThuHuong").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = ho_so_chi_tiet.ho_so.so_id;
            _expertationcostService.xoaThongTinNguoiThuHuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initHoaDonChungTu(ho_so_chi_tiet.chung_tu);
                    _notifyService.success("Xóa người thụ hưởng thành công.");
                });
            });
        });
    });
}
function initHoaDonChungTu(res) {
    var chung_tu_tong_tien = 0;
    var chung_tu_tong_thue = 0;
    var tong_cong = 0;
    $.each(res, function (i, item) {
        chung_tu_tong_tien += parseInt(item.tien);
        chung_tu_tong_thue += parseInt(item.thue);
        tong_cong += parseInt(item.tong_cong);
    });
    ESUtil.genHTML("step3_chung_tu_template", "step3_chung_tu", { chung_tu: res });
    //tổng cộng
    $("#step3_chung_tu").next().find(".chung_tu_tong_tien").html(ESUtil.formatMoney(chung_tu_tong_tien));
    $("#step3_chung_tu").next().find(".chung_tu_tong_thue").html(ESUtil.formatMoney(chung_tu_tong_thue));
    $("#step3_chung_tu").next().find(".chung_tu_tong_cong").html(ESUtil.formatMoney(tong_cong));
    bindEditChungTu();
}
function initNguoiThuHuong(res) {
    var thu_huong_tong = 0;
    $.each(res, function (i, item) {
        thu_huong_tong += parseInt(item.tien);
    });
    ESUtil.genHTML("step3_thu_huong_template", "step3_thu_huong", { thu_huong: res });
    $("#step3_thu_huong").next().find(".thu_huong_tong").html(ESUtil.formatMoney(thu_huong_tong));
    bindEditThuHuong();
}
function showModalChinh() {
    $('#ExpertationcostModal .nav-tabs.profile-tab').tabdrop();
    $("#ExpertationcostModal").esmodal("show");
}
function timThongTinChung(el) {
    var obj = {
        ma_doi_tac: _frmTimKiemThongTinChung.getControl("ma_doi_tac").val(),
        nv: _frmTimKiemThongTinChung.getControl("nv").val(),
        nd_tim: _frmTimKiemThongTinChung.getControl("so_hs_bt").val()
    };
    if (obj.nv == undefined || obj.nv == null || obj.nv == "") {
        _notifyService.error("Chưa chọn nghiệp vụ");
        return;
    };
    if (obj.nd_tim == undefined || obj.nd_tim == null || obj.nd_tim == "") {
        _notifyService.error("Chưa nhập nội dung tìm kiếm");
        return;
    };
    _expertationcostService.layDsHoSoBT(obj).then(res => {
        if (res.state_info.status != 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("danhSachHoSoTemplate", "danhSachHoSo", { data: res.data_info });
        _modalTimKiemHoSo.show();
    });
}
function chonHoSoBT(el, ma_doi_tac, so_id, nv) {
    $('.dshoso').removeClass('active');
    $(el).addClass('active');
    $('#danhSachHoSo').removeClass('d-none');
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        nv: nv
    }
    _expertationcostService.layChiTietHoSoBT(obj).then(res => {
        if (res.state_info.status !== 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var response = res.data_info;
        var nv_temp = '';
        if (nv == 'XE') {
            nv_temp = "Xe ô tô"
        } else if (nv == 'NG') {
            nv_temp = "Con người";
        }
        var data_input = [{
            ngay_ht: "",
            so_hs_bt: response.so_hs,
            nv_text: nv_temp,
            tien_dx: response.tien_duyet_gia,
            tien_thoa_thuan: 0,
            tien_thue: 0,
            ngay_trinh: '',
            ngay_duyet: '',
            trang_thai_ten: ''
        }]
        ESUtil.genHTML("tblThongTinChungTemplate", "tblThongTinChung", { data: data_input });
        _frmThongTinChung.getControl("so_id_bt").val(so_id);
        _frmThongTinChung.getControl("nv").val(nv);
        _modalTimKiemHoSo.hide();
    });
}
function searchHoSoBT() {
    _frmTimKiemThongTinChung.resetForm();
    _frmTimKiemThongTinChung.clearErrorMessage();
    ESUtil.genHTML("danhSachHoSoTemplate", "danhSachHoSo", { data: [] });
    _modalTimKiemHoSo.show();
}
function chonDonViPhatHanhHoaDon(el) {
    _frmUploadHDDT.resetForm();
    _frmUploadHDDT.clearErrorMessage();
    $("#fileNameHoaDonDT").html("");
    _modalDonViPhatHanhHoaDon.options = { placement: "top" };
    _modalDonViPhatHanhHoaDon.showWithPosition($('#btnDocHoaDon'));
}
function chungTuTinhTien() {
    var so_tien = parseInt(_frmHoaDonChungTu.getControl("tien").getValue());
    var tl_thue = parseInt(_frmHoaDonChungTu.getControl("tl_thue").getValue());
    var thue = so_tien * (tl_thue / 100);
    var tong_cong = so_tien + thue;
    _frmHoaDonChungTu.getControl("thue").setValue(ESUtil.formatMoney(thue));
    _frmHoaDonChungTu.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function layDsTaiLieu() {
    getAnhThumnail();
}
function getAnhThumnail(callback = undefined) {
    _expertationcostService.layDanhSachFile({
        ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
        ma_chi_nhanh: ho_so_chi_tiet.ho_so[0].ma_chi_nhanh,
        so_id: ho_so_chi_tiet.ho_so[0].so_id
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
    $("#dsNhomAnh").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }

    var arrDataCPL = [];
    var arrDataTL = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
            arrDataCPL.push(arrAnh[i]);
        }
        if (arrAnh[i].loai == "TT") {
            arrDataTL.push(arrAnh[i]);
        }
    }
    var arrData = [
        { loai_tai_lieu: "CPL", ten_loai_tai_lieu: "Ảnh chưa phân loại", so_luong_tai_lieu: arrDataCPL.length },
        { loai_tai_lieu: "TT", ten_loai_tai_lieu: "Giấy tờ, tài liệu", so_luong_tai_lieu: arrDataTL.length }
    ];

    var arr_nhom_anh = [];
    for (var i = 0; i < arrAnh.length; i++) {
        if (arr_nhom_anh.indexOf(arrAnh[i].nhom_anh) < 0 && typeof arrAnh[i] === 'object') {
            arr_nhom_anh.push(arrAnh[i].nhom_anh);
            $("#dsNhomAnh").append('<button class="dropdown-item" type="button" data-id="nhom_anh_' + i + '" onclick="goToScroll(\'nhom_anh_' + i + '\')">' + arrAnh[i].nhom_anh + '</button>');
        }
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, ma_file, loai, ...object }) => {
        acc[ma_file] = (acc[ma_file] || []);
        acc[ma_file].push({ bt, ma_file, ma_chi_nhanh, loai, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ ma_file: key == null || key == "null" ? '' : key, loai: "", nhom: "", children: value }));

    for (var i = 0; i < result.length; i++) {
        if (result[i].ma_file == "") {
            result[i].nhom = "Ảnh chưa phân loại";
            result[i].loai = 'CPL';
        }
        else {
            if (result[i].children.length > 0) {
                result[i].nhom = result[i].children.firstOrDefault().nhom_anh;
                result[i].loai = result[i].children.firstOrDefault().loai;
            }
            else {
                result[i].nhom = "Không xác định";
                result[i].loai = "";
            }
        }
        if (result[i].ma_file == "") {
            result[i].stt = 0;
        }
        else {
            result[i].stt = 1;
        }
    }
    result.sort((a, b) => a.stt - b.stt);
    ESUtil.genHTML("lstImage_template", "dsAnhTonThat", { arrLoai: arrData, arrAnh: result });
    return result;
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
function getImageSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function luuPhanLoaiHangMuc(callback = undefined) {
    if (!_frmThemHMTT.isValid()) {
        return;
    }
    var obj = _frmThemHMTT.getJsonData();
    obj.loai = "TLHSGD";
    obj.ma_doi_tac = ho_so_chi_tiet.ho_so[0].ma_doi_tac;
    obj.so_id = ho_so_chi_tiet.ho_so[0].so_id;
    obj.pm = CONSTANT_PM;
    obj.bt = getImageSelect();
    _expertationcostService.phanLoaiHangMuc(obj).then(res => {
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
        var data = {
            ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so[0].so_id
        }
        _notifyService.success("Phân loại hạng mục thành công");
        if (callback) {
            callback(res);
        }
    });
}
function onToggleImg(index) {
    var count = $(".nhom_anh_ton_that_" + index + ":checked").length;
    var count_check = $(".nhom_anh_ton_that_" + index).length;
    if (count < count_check) {
        $(".nhom_anh_ton_that_" + index).prop("checked", true);
    } else {
        $(".nhom_anh_ton_that_" + index).prop("checked", false);
    }
}
function themChiPhi() {
    luuChiPhiGD(() => {
        _frmChiPhiGDChiTiet.clearErrorMessage();
        _frmChiPhiGDChiTiet.resetForm();
        $('#btnBoSungChiPhiThucTe').hide();
        _modalThemChiPhiGD.show();
    });
}
function suaChiPhi(el) {
    var data = JSON.parse($(el).closest('tr').find("input[name='objInfo']").val());
    _frmChiPhiGDChiTiet.setData(data);
    _frmChiPhiGDChiTiet.getControl("nhom_gd").trigger("select2:select");
    _frmChiPhiGDChiTiet.getControl("dvi_gd").setValue(data.dvi_gd);
    _frmChiPhiGDChiTiet.getControl("dvi_gd").trigger("select2:select");
    _frmChiPhiGDChiTiet.getControl("nsd_gd").setValue(data.nsd_gd);
    $('#btnBoSungChiPhiThucTe').show();
    _modalThemChiPhiGD.show();
};
function xoaChiPhi(bt) {
    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chi phí này không?", "", val => {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so[0].so_id,
            bt: bt
        }
        _expertationcostService.xoaChiPhiGDChiTiet(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            layHoSoCTiet({ ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id });
            _notifyService.success("Xóa thông tin thành công!");
        });
    });
};
function luuChiPhiChiTiet(callback = undefined) {
    var obj = _frmChiPhiGDChiTiet.getJsonData();
    obj.so_id = ho_so_chi_tiet.ho_so[0].so_id;
    _expertationcostService.luuChiPhiGDChiTiet(obj).then(res => {
        if (res.state_info.status !== 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        layHoSoCTiet({ ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac, so_id: ho_so_chi_tiet.ho_so[0].so_id });
        _notifyService.success("Lưu chi phí thành công");
        if (callback) {
            callback();
        }
    });
}
function luuChiPhiGD(callback = undefined) {
    var obj = _frmThongTinChung.getJsonData();
    obj.tien_dx = $("#tong_tien_dx").html().replace(/[^0-9]+/g, '');
    obj.tien_duyet = $("#tong_tien_duyet").html().replace(/[^0-9]+/g, '');
    obj.tien_thoa_thuan = $("#tong_tien_thoa_thuan").html().replace(/[^0-9]+/g, '');
    obj.tien_thue = $("#tong_thue").html().replace(/[^0-9]+/g, '');
    _expertationcostService.luuChiPhiGiamDinh(obj).then(res => {
        if (res.state_info.status !== 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        layHoSoCTiet({ ma_doi_tac: ESCS_MA_DOI_TAC, so_id: res.out_value.so_id });
        _notifyService.success("Lưu thông tin thành công!");
        if (callback) {
            callback();
        }
    });
}

$(document).ready(function () {
    _frmTimKiemChiPhiGD.getControl("ngay_d").setValue(ngayDauNam);
    _frmTimKiemChiPhiGD.getControl("ngay_c").setValue(dateNow);

    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _bankListService.layDsNganHang(),
        _commonService.layControl({ nv: "HSGD" }),
        _categoryPersonService.layDsHMCN({ ma_doi_tac: ESCS_MA_DOI_TAC }),
        _userManagementService.layDsNSD({ ma_doi_tac: ESCS_MA_DOI_TAC })
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        _frmTimKiemChiPhiGD.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info
        objDanhMuc.ngan_hang = arrRes[2].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh_ngan_hang = arrRes[2].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.cau_hinh_nut = arrRes[3].data_info;
        objDanhMuc.hang_muc = arrRes[4].data_info;
        objDanhMuc.ds_can_bo = arrRes[5].data_info;

        _frmTimKiemThongTinChung.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmHoaDonChungTuCP_GD.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
        _frmNguoiThuHuongCP_GD.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmNguoiThuHuongCP_GD.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        _frmHoaDonChungTu.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
        ESUtil.executeAsync(() => {
            _frmNguoiThuHuong.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        });
        ESUtil.executeAsync(() => {
            objDanhMuc.hang_muc_tai_lieu = objDanhMuc.hang_muc.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.loai === "TLHSGD");
            _frmThemHMTT.getControl("hang_muc").setDataSource(objDanhMuc.hang_muc_tai_lieu, "ten", "ma", "Chọn tài liệu", "");
        });
        _frmChiPhiGDChiTiet.getControl("dvi_gd").setDataSource([], "ten", "ma", "Chọn đơn vị giám định", "");
        getPaging(1);
    });
    _frmNguoiThuHuong.getControl("ma_ngan_hang").addEventChange(val => {
        _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmNguoiThuHuongCP_GD.getControl("ma_ngan_hang").addEventChange(val => {
        _frmNguoiThuHuongCP_GD.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
    });
    _frmHoaDonChungTu.getControl("tl_thue").addEventChange(val => {
        chungTuTinhTien();
    });
    _frmHoaDonChungTu.getControl('tien').change(function () {
        chungTuTinhTien();
    });
    _frmChiPhiGDChiTiet.getControl("nhom_gd").addEventChange(val => {
        if (val == 'NGOAI') {
            _frmChiPhiGDChiTiet.getControl("nsd_gd").attr("required", false);
            _frmChiPhiGDChiTiet.getControl("nsd_gd").closest("div.form-group").find("label._required").removeClass("_required");
            var obj_input = {
                ma_doi_tac: _frmTimKiemChiPhiGD.getControl('ma_doi_tac').getValue(),
                nv: ho_so_chi_tiet.ho_so[0].nv
            }
            _expertationcostService.layDanhSachDonViGD(obj_input).then(res => {
                _frmChiPhiGDChiTiet.getControl("dvi_gd").setDataSource(res.data_info, "ten", "ma", "Chọn đơn vị giám định", "");
            });
        } else if (val == 'NB') {
            _frmChiPhiGDChiTiet.getControl("nsd_gd").attr("required", true);
            _frmChiPhiGDChiTiet.getControl("nsd_gd").closest("div.form-group").find("label").addClass("_required");
            var arr_chi_nhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
            _frmChiPhiGDChiTiet.getControl("dvi_gd").setDataSource(arr_chi_nhanh, "ten", "ma", "Chọn đơn vị giám định", "");
        }
    });
    _frmChiPhiGDChiTiet.getControl("dvi_gd").addEventChange(val => {
        var nhom_gd = _frmChiPhiGDChiTiet.getControl("nhom_gd").getValue();
        if (nhom_gd == 'NGOAI') {
            _frmChiPhiGDChiTiet.getControl("nsd_gd").setDataSource([], "ten", "ma", "Chọn cán bộ giám định", "");
        } else if (nhom_gd == 'NB') {
            var arr_cb = objDanhMuc.ds_can_bo.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.ma_chi_nhanh == val);
            _frmChiPhiGDChiTiet.getControl("nsd_gd").setDataSource(arr_cb, "ten", "ma", "Chọn cán bộ giám định", "");
        }
    });
    $("form[name=frmChiPhiGDChiTiet] input[name=tien_dx]").on("change", function () {
        var val = _frmChiPhiGDChiTiet.getControl("tien_dx").val().replace(/[^0-9]+/g, '');
        _frmChiPhiGDChiTiet.getControl("tien_duyet").val(ESUtil.formatMoney(val));
        _frmChiPhiGDChiTiet.getControl("tien_thoa_thuan").val(ESUtil.formatMoney(val));
        $("form[name=frmChiPhiGDChiTiet] input[name=tien_thoa_thuan]").trigger('change');
    });
    $("form[name=frmChiPhiGDChiTiet] input[name=tien_thoa_thuan]").on("change", function () {
        var tien_thoa_thuan = parseInt(_frmChiPhiGDChiTiet.getControl("tien_thoa_thuan").val().replace(/[^0-9]+/g, ''));
        var tien_thue = parseInt(_frmChiPhiGDChiTiet.getControl("tien_thue").val().replace(/[^0-9]+/g, '') == '' ? 0 : _frmChiPhiGDChiTiet.getControl("tien_thue").val().replace(/[^0-9]+/g, ''));
        var tong_cong = tien_thoa_thuan + tien_thue;
        _frmChiPhiGDChiTiet.getControl("tong_cong").val(ESUtil.formatMoney(tong_cong));
    });
    $("form[name=frmChiPhiGDChiTiet] input[name=tien_thue]").on("change", function () {
        var tien_thoa_thuan = parseInt(_frmChiPhiGDChiTiet.getControl("tien_thoa_thuan").val().replace(/[^0-9]+/g, ''));
        var tien_thue = parseInt(_frmChiPhiGDChiTiet.getControl("tien_thue").val().replace(/[^0-9]+/g, '') == '' ? 0 : _frmChiPhiGDChiTiet.getControl("tien_thue").val().replace(/[^0-9]+/g, ''));
        var tong_cong = tien_thoa_thuan + tien_thue;
        _frmChiPhiGDChiTiet.getControl("tong_cong").val(ESUtil.formatMoney(tong_cong));
    });
    $("#btnUpLoadAnhDGTT").click(function () {
        _uploadService.setParam({
            ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so[0].so_id,
            type: "image",
            pm: CONSTANT_PM,
            nv: NV
        });
        _uploadService.showPupup();
    });
    $("#btnThemMoiChiPhiGD").click(function () {
        _frmTimKiemThongTinChung.clearErrorMessage();
        _frmTimKiemThongTinChung.resetForm();
        _navChiPhiGiamDinh.showTab("tabThongTinChiPhiGiamDinh");
        ESUtil.genHTML("tblThongTinChungTemplate", "tblThongTinChung", { data: [] });
        ESUtil.genHTML("tbDsChiPhiGDTemplate", "tbDsChiPhiGD", { danh_sach: [] }, () => {
            $("#tong_tien_dx").html(ESUtil.formatMoney(0));
            $("#tong_tien_duyet").html(ESUtil.formatMoney(0));
            $("#tong_thue").html(ESUtil.formatMoney(0));
            $("#tong_tien_thoa_thuan").html(ESUtil.formatMoney(0));
            $("#tong_tong_cong").html(ESUtil.formatMoney(0));
        });
        $('#title_hsgd').html('Thông tin chi phí giám định');
        showModalChinh();
    });
    $("#btnTimKiemHoSoChiPhiGD").click(function () {
        _notifyService.error('123');
    });
    $("#btnThemHoaDonChungTu").click(function () {
        _frmHoaDonChungTu.resetForm();
        _frmHoaDonChungTu.clearErrorMessage();
        _frmHoaDonChungTu.getControl("so_id").val(ho_so_chi_tiet.ho_so.so_id);
        _modalHoaDonChungTu.show();
    });
    $('#btnChonFileHoaDon').click(function () {
        if (!_frmUploadHDDT.isValid()) {
            return;
        }
        $("#fileHoaDonDT").trigger("click");
    });
    $("#fileHoaDonDT").change(function () {
        var i = $(this).prev('label').clone();
        var file = $("#fileHoaDonDT")[0].files[0].name;
        $(this).prev('label').text(file);
    });
    $('#btnDocFileHoaDon').click(function () {
        if (_frmUploadHDDT.isValid()) {
            _frmHoaDonChungTu.resetForm();
            _frmHoaDonChungTu.clearErrorMessage();
            var formData = _frmUploadHDDT.getFormFileData();
            formData.append("ma_doi_tac", ho_so_chi_tiet.ho_so.ma_doi_tac);
            formData.append("so_id", ho_so_chi_tiet.ho_so.so_id);
            _common.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDon.hide();
                    $('#btnThemHoaDonChungTu').trigger('click');
                    var obj = {
                        so_id: ho_so_chi_tiet.ho_so.so_id,
                        dvi_phat_hanh: _frmUploadHDDT.getControl('dvi_ph').getValue(),
                        ten_dvi_phat_hanh: res.sellerLegalName,
                        mst_dvi_phat_hanh: res.sellerTaxCode,
                        dchi_dvi_phat_hanh: res.sellerAddressLine,
                        ngay_ct: res.invoiceIssuedDate,
                        mau_hdon: res.invoiceSeries,
                        ky_hieu_hdon: res.templateCode,
                        so_hdon: res.invoiceNumber,
                        dien_giai: '',
                        tien: res.totalAmountWithoutVAT,
                        tl_thue: res.vatPercentage,
                        thue: res.totalVATAmount,
                        tong_cong: res.totalAmountWithVAT,
                        ten_dvi_nhan: res.buyerLegalName,
                        mst_dvi_nhan: res.buyerTaxCode,
                        dchi_dvi_nhan: res.buyerAddressLine
                    }
                    obj.tl_thue = obj.tl_thue.replace('%', '');
                    _frmHoaDonChungTu.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmHoaDonChungTu.setData(obj);
                }
            });
        }
    });
    $("#btnLuuHoaDonChungTu").click(function () {
        var data = _frmHoaDonChungTu.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmHoaDonChungTu.isValid()) {
            _expertationcostService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initHoaDonChungTu(ho_so_chi_tiet.chung_tu);
                    _frmHoaDonChungTu.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu chứng từ thành công");
                });
            });
        }
    });
    $("#btnLuuDongHoaDonChungTu").click(function () {
        var data = _frmHoaDonChungTu.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so[0].so_id;
        if (_frmHoaDonChungTu.isValid()) {
            _expertationcostService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initHoaDonChungTu(ho_so_chi_tiet.chung_tu);
                    _modalHoaDonChungTu.hide();
                    _notifyService.success("Lưu chứng từ thành công");
                });
            });
        }
    });
    $('#btnDocHoaDon').click(function () {
        _frmUploadHDDT.resetForm();
        _frmUploadHDDT.clearErrorMessage();
        $("#fileNameHoaDonDT").html("");
        _modalDonViPhatHanhHoaDon.options = { placement: "top" };
        _modalDonViPhatHanhHoaDon.showWithPosition($('#btnDocHoaDon'));
    });
    $("#btnThemNguoiThuHuong").click(function () {
        _frmNguoiThuHuong.resetForm();
        _frmNguoiThuHuong.clearErrorMessage();
        _frmNguoiThuHuong.getControl("so_id").val(ho_so_chi_tiet.ho_so.so_id);
        _frmNguoiThuHuong.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", "");
        _modalNguoiThuHuong.show();
    });
    $("#btnLuuNguoiThuHuong").click(function () {
        var data = _frmNguoiThuHuong.getJsonData();
        data.pm = CONSTANT_PM;
        data.so_id = ho_so_chi_tiet.ho_so.so_id;
        if (_frmNguoiThuHuong.isValid()) {
            data.loai = "TH";
            _expertationcostService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initNguoiThuHuong(ho_so_chi_tiet.thu_huong);
                    _frmNguoiThuHuong.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu thông tin thụ hưởng thành công");
                });
            });
        }
    });
    $("#btnLuuDongNguoiThuHuong").click(function () {
        var data = _frmNguoiThuHuong.getJsonData();
        data.so_id = ho_so_chi_tiet.ho_so[0].so_id;
        if (_frmNguoiThuHuong.isValid()) {
            data.loai = "TH";
            _expertationcostService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id,
                }
                layHoSoCTiet(obj, res => {
                    initNguoiThuHuong(ho_so_chi_tiet.thu_huong);
                    _modalNguoiThuHuong.hide();
                    _frmNguoiThuHuong.getControl("bt").setValue(res.out_value.bt);
                    _notifyService.success("Lưu thông tin thụ hưởng thành công");
                });
            });
        }
    });
    $("#btnTrinhGiamDinh").click(function () {
        var obj = {
            ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
            ma_doi_tac_ql: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
            so_id: ho_so_chi_tiet.ho_so[0].so_id,
            loai_trinh: "TRINH_DUYET_HO_SO_GIAM_DINH",
            nghiep_vu: "HSGD",
            ma_mau_in: "ESCS_TRINH_GIAM_DINH_HS",
            remove_file: "ESCS_TRINH_GIAM_DINH_HS",
            create_file: "ESCS_TRINH_GIAM_DINH_HS",
            pm: 'HSGD'
        };
        obj.ma = "TEMPLATE_EMAIL_TRINH_DUYET_HO_SO_GIAM_DINH";
        _modalTrinhDuyetService.show(obj, (type, res) => {
            getPaging(1);
        });
    });
    $("#btnChuyenThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn chuyển thanh toán hồ sơ này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so[0].so_id
            }
            _expertationcostService.chuyenThanhToan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id
                }
                layHoSoCTiet(obj_1, res => {
                    getPaging(1);
                    _notifyService.success("Chuyển thanh toán thành công");
                });
                
            });
        })
    });
    $("#btnHuyChuyenThanhToan").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn hủy chuyển thanh toán hồ sơ này không?", "", val => {
            var obj = {
                ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                so_id: ho_so_chi_tiet.ho_so[0].so_id
            }
            _expertationcostService.goChuyenThanhToan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj_1 = {
                    ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac,
                    so_id: ho_so_chi_tiet.ho_so[0].so_id
                }
                layHoSoCTiet(obj_1, res => {
                    getPaging(1);
                    _notifyService.success("Gỡ chuyển thanh toán thành công");
                });

            });
        })
    });
    $("#btnPhanLoaiTonThat").click(function () {
        _frmThemHMTT.getControl("hang_muc").setValue("");
        var arrVal = [];
        $("input:checkbox[name='ds_anh_xe']:checked").each(function () {
            var objArrVal = {
                bt: $(this).val(),
                hm: $(this).attr('data-hm')
            }
            arrVal.push(objArrVal);
        });
        if (arrVal.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh cần phân loại");
            return;
        }
        _frmThemHMTT.getControl("hang_muc").setValue(arrVal[arrVal.length - 1].hm);
        _modalThemHMTT.show();
    });
    $("#btnLuuHMTT").click(function () {
        luuPhanLoaiHangMuc();
    });
    $("#btnLuuDongHMTT").click(function () {
        luuPhanLoaiHangMuc(res => {
            _modalThemHMTT.hide();
        });
    });
    $("#btnLuuChiPhiGD").click(function () {
        luuChiPhiGD();
    });
    $("#btnLuuDongChiPhiGDChiTiet").click(function () {
        if (_frmChiPhiGDChiTiet.isValid()) {
            luuChiPhiChiTiet(() => {
                _modalThemChiPhiGD.hide();
            });
        }
    });
    $("#btnLuuChiPhiGDChiTiet").click(function () {
        if (_frmChiPhiGDChiTiet.isValid()) {
            luuChiPhiChiTiet();
        }
    });
    $("#btnTimKiemHoSoGD").click(function () {
        getPaging(1);
    })
    $("#btnBoSungChiPhiThucTe").click(function () {
        _frmBoSungTienThucTe.resetForm();
        _frmBoSungTienThucTe.clearErrorMessage();
        _modalBoSungTienThucTe.show();
    });
    $("#btnLuuTienThoaThuan").click(function () {
        if (_frmBoSungTienThucTe.isValid()) {
            var obj = _frmBoSungTienThucTe.getJsonData();
            obj.ma_doi_tac = ho_so_chi_tiet.ho_so[0].ma_doi_tac;
            obj.so_id = ho_so_chi_tiet.ho_so[0].so_id;
            obj.bt = _frmChiPhiGDChiTiet.getControl("bt").val();
            _expertationcostService.luuTienThucTe(obj).then(res => {
                if (res.state_info.status !== 'OK') {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                layHoSoCTiet({ ma_doi_tac: ho_so_chi_tiet.ho_so[0].ma_doi_tac, so_id: ho_so_chi_tiet.ho_so[0].so_id });
                _notifyService.success("Lưu chi phí thực tế thành công");
                _modalBoSungTienThucTe.hide();
                _modalThemChiPhiGD.hide();
            });
        }
    });
})