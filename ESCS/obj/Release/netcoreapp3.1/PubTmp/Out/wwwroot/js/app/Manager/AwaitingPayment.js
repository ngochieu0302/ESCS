//Service
const MAN_HINH = "THANH_TOAN";
const NHOM_LHNV = {
    XE: "VCX",
    NNTX: "NNTX",
    LPHU_XE: "LPHU_XE",
    NGUOI: "NG",
    HANG_HOA: "HH",
    TNDS: "TNDS"
}
const DOI_TUONG_TT = {
    XE: "XE",
    NGUOI: "NGUOI",
    NGUOI_HK: "NGUOI_HK",
    HANG_HOA: "HANG_HOA",
    TAI_SAN: "TAI_SAN"
}

var _common = new CommonService();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _service = new AwaitingPaymentService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
var _carClaimCommonService = new CarClaimCommonService();
var _carInvestigationService = new CarInvestigationService();
var _viewImagesService = new ViewImagesService();
var _carCompensationService = new CarCompensationService();
var _userManagementService = new UserManagementService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalDocumentService = new ModalDocumentService();

var objDanhMuc = {};
var profileDetail = {};
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var ngayDauNam = new Date().getNgayDauNam();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var arrTatCaAnh = [];
var arrDuLieuOCRHoaDon = [];
var arrThongTinOCRHoaDon = [];
var arrChiNhanhTKiem = [];

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
const GRID_HO_SO_SO_DONG = 13;
//Form
var _frmTimKiemHoSoChoThanhToan = new FormService("frmTimKiemHoSoChoThanhToan");

var _frmThemNguoiThuHuongBoiThuongXe = new FormService("frmThemNguoiThuHuongBoiThuongXe");
var _frmThemHoaDonChungTuBoiThuongXe = new FormService("frmThemHoaDonChungTuBoiThuongXe");
var _frmUploadHoaDonDienTuXe = new FormService("frmUploadHoaDonDienTuXe");
var _frmCapNhatThue = new FormService("frmCapNhatThue");
var _frmOCRHoaDonChungTu = new FormService("frmOCRHoaDonChungTu");

var _modalCapNhatThue = new ModalFullScreenService("modalCapNhatThue", "");
var _modalDonViPhatHanhHoaDonDienTuXe = new ModalFullScreenService("modalDonViPhatHanhHoaDonDienTuXe", "");
var _modalThemNguoiThuHuongBoiThuongXe = new ModalService("modalThemNguoiThuHuongBoiThuongXe");
var _modalThemHoaDonChungTuBoiThuongXe = new ModalService("modalThemHoaDonChungTuBoiThuongXe");

var _modalXemThongTinGiayToTaiLieu = new ModalService("modalXemThongTinGiayToTaiLieu");
var _modalOCRHoaDonChungTu = new ModalFullScreenService("modalOCRHoaDonChungTu", "");
var _modalXemHinhAnhHoaDonCTiet = new ModalFullScreenService("modalXemHinhAnhHoaDonCTiet", "");
var _modalChonSoHoaDon = new ModalDragService("modalChonSoHoaDon", undefined, "");
var _modalChonChiNhanh = new ModalDragService("modalChonChiNhanh", undefined, "bottom");
var _modalThongTinHoSoService = new ModalThongTinHoSoService();

var configColumn = [
    { field: "kh_vip", title: "*", width: "3%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "nguon_tb", title: "Nguồn", width: "6%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ngay_chuyen_tt_hthi", title: "Ngày chuyển TT", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái HS", width: "10%", hozAlign: "center", headerSort: false, formatter: "html" }, //, formatter: formatterTrangThai
    { field: "so_hs", title: "Số hồ sơ", width: "15%", headerSort: false, hozAlign: "center" },
    { field: "nsd", title: "Bồi thường viên", width: "12%", hozAlign: "center", headerSort: false },
    { field: "doi_tuong", title: "Biển xe", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_kh", title: "Tên khách hàng", width: "20%", headerSort: false },
    { field: "so_tien", title: "Số tiền TT", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "so_vu", title: "Số vụ", width: "6%", hozAlign: "center", headerSort: false, visible: false },
    { field: "nv", title: "Nghiệp vụ", width: "12%", hozAlign: "center", headerSort: false },
    { field: "so_hd", title: "Số HĐBH", width: "15%", hozAlign: "center", headerSort: false },
    { field: "gcn", title: "Số GCN", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh_xly", title: "Đơn vị xử lý", width: "23%", hozAlign: "center", headerSort: false },
    { field: "ten_chi_nhanh", title: "Đơn vị cấp đơn", width: "23%", hozAlign: "center", headerSort: false },
    { field: "so_id", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false },
    { field: "ma_doi_tac", title: "ID", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];

var _gridViewHoSo = new GridViewService("gridViewHoSo", configColumn, getPaging, rowClick);

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
    profileDetail = data;
    if (profileDetail.ngay_dong < 30000101) {
        $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
        $("#btnDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
        $("#btnChuyenBT_xemToanBoThongTinHSBT").addClass("d-none");
    } else {
        $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
        $("#btnDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
        $("#btnChuyenBT_xemToanBoThongTinHSBT").removeClass("d-none");
    }
    xemToanBoThongTinHoSoBoiThuong(data.ma_doi_tac, data.ma_chi_nhanh_ql, data.ma_chi_nhanh, data.so_id, data.so_id_hd, data.so_id_dt);
}
function xemToanBoThongTinHoSoBoiThuong(ma_doi_tac, ma_chi_nhanh_ql, ma_chi_nhanh, so_id, so_id_hd, so_id_dt) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_chi_nhanh_ql: ma_chi_nhanh_ql,
        ma_chi_nhanh: ma_chi_nhanh,
        so_id: so_id,
        so_id_hd: so_id_hd,
        so_id_dt: so_id_dt,
        nv: 'XE'
    }
    _modalThongTinHoSoService.data = obj;
    _modalThongTinHoSoService.xemChiTietThongTinHoSo();
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiemHoSoChoThanhToan.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 13;
    _service.getPaging(objTimKiem).then(res => {
        _gridViewHoSo.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridViewHoSo.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}
function bindThongTinNguoiThuHuongXemToanBoThongTinHSBT() {
    $(".suaThongTinNguoiThuHuongXe").click(function () {
        _frmThemNguoiThuHuongBoiThuongXe.resetForm();
        _frmThemNguoiThuHuongBoiThuongXe.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmThemNguoiThuHuongBoiThuongXe.setData(data);
        _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == data.ma_ngan_hang), "ten", "ma", "Chọn chi nhánh", data.ma_chi_nhanh);
        _modalThemNguoiThuHuongBoiThuongXe.show();
    });
    $(".xoaThongTinNguoiThuHuongXe").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa người thụ hưởng này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = profileDetail.so_id;
            _carCompensationService.xoaThongTinNguoiThuHuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xóa người thụ hưởng thành công.");
                loadChungTuThuHuong();
            });
        });
    });
}
function bindThongTinHoaDonChungTuXemToanBoThongTinHSBT() {
    $(".suaThongTinHoaDonChungTuXe").click(function () {
        _frmThemHoaDonChungTuBoiThuongXe.resetForm();
        _frmThemHoaDonChungTuBoiThuongXe.clearErrorMessage();
        var data = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
        _frmThemHoaDonChungTuBoiThuongXe.setData(data);
        _modalThemHoaDonChungTuBoiThuongXe.show();
    });
    $(".xoaThongTinHoaDonChungTuXe").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa chứng từ này không?", "", val => {
            var json = JSON.parse($(this).closest('tr').find("input[name='objInfo']").val());
            json.so_id = profileDetail.so_id;
            _carCompensationService.xoaChungTuBoiThuong(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Xóa người thụ hưởng thành công.");
                loadChungTuThuHuong();
            });
        });
    });
}
function chungTuTinhTienXemToanBoThongTinHSBT() {
    var so_tien = parseInt(_frmThemHoaDonChungTuBoiThuongXe.getControl("tien").getValue());
    var tl_thue = parseInt(_frmThemHoaDonChungTuBoiThuongXe.getControl("tl_thue").getValue());
    var thue = Math.round(so_tien * (tl_thue / 100));
    var tong_cong = so_tien + thue;
    _frmThemHoaDonChungTuBoiThuongXe.getControl("thue").setValue(ESUtil.formatMoney(thue));
    _frmThemHoaDonChungTuBoiThuongXe.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
}
function initHoaDonChungTu(res) {
    ESUtil.genHTML("tblToanBoThongTinHoaDonChungTuXe_template", "tblToanBoThongTinHoaDonChungTuXe", { data: res.chung_tu }, () => {
        var tongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT = 0;
        var tongTienThueHoaDonChungTuXeOtO_xemToanBoThongTinHSBT = 0;
        var tongCongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT = 0;
        for (var i = 0; i < res.chung_tu.length; i++) {
            tongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT += res.chung_tu[i].tien;
            tongTienThueHoaDonChungTuXeOtO_xemToanBoThongTinHSBT += res.chung_tu[i].thue;
            tongCongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT += res.chung_tu[i].tong_cong;
        }
        $("#tongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT));
        $("#tongTienThueHoaDonChungTuXeOtO_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tongTienThueHoaDonChungTuXeOtO_xemToanBoThongTinHSBT));
        $("#tongCongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tongCongTienHoaDonChungTuXeOtO_xemToanBoThongTinHSBT));
    });
    bindThongTinHoaDonChungTuXemToanBoThongTinHSBT();
}
function initNguoiThuHuong(res) {
    ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuongXe_template", "tblToanBoThongTinNguoiThuHuongBoiThuongXe", { data: res.thu_huong }, () => {
        var tongSoTienThuHuongXe_xemToanBoThongTinHSBT = 0;
        for (var i = 0; i < res.thu_huong.length; i++) {
            tongSoTienThuHuongXe_xemToanBoThongTinHSBT += res.thu_huong[i].tien;
        }
        $("#tongSoTienThuHuongXe_xemToanBoThongTinHSBT").html(ESUtil.formatMoney(tongSoTienThuHuongXe_xemToanBoThongTinHSBT));
    });
    bindThongTinNguoiThuHuongXemToanBoThongTinHSBT();
}
function loadChungTuThuHuong() {
    var data = {
        ma_doi_tac: profileDetail.ma_doi_tac,
        so_id: profileDetail.so_id
    };
    _carCompensationService.layChungTuBoiThuong(data).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        initHoaDonChungTu(res);
        initNguoiThuHuong(res);
        _service.layThongTinChiTietHoSo(data).then(resDetail => {
            ho_so_chi_tiet = resDetail;
            ESUtil.genHTML("modalChonSoHoaDonTemplate", "modalChonSoHoaDonDanhSach", { danh_sach: ho_so_chi_tiet.data_info.chung_tu });
        });
    });
}
function showPopupDocHoaDonDienTuXe(el) {
    _frmUploadHoaDonDienTuXe.resetForm();
    _frmUploadHoaDonDienTuXe.clearErrorMessage();
    $("#fileNameHoaDonDienTuXe").html("");
    _modalDonViPhatHanhHoaDonDienTuXe.show();
}
function unique_arr(arr) {
    var newArr = []
    newArr = arr.filter(function (item) {
        return newArr.includes(item) ? '' : newArr.push(item)
    })
    return newArr;
}
function xemThongTinGiayToTaiLieu() {
    var data = [];
    var ds_giay_to = objDanhMuc.ds_giay_to;
    var arrAnhTL = arrTatCaAnh.where(n => n.loai == "TL");
    $.each(arrAnhTL, function (index, item) {
        $.each(ds_giay_to, function (index1, item1) {
            if (item.ma_file == item1.hang_muc && (item1.ma == "HOA_DON_DIEN_TU" || item1.ma == "HOA_DON_GIAY")) {
                data.push(item);
            }
        });
    });
    ESUtil.genHTML("modalDanhSachGiayToTaiLieuTemplate", "modalDanhSachGiayToTaiLieu", { data: data });
    ESUtil.genHTML("modalXemChiTietGiayToTaiLieuTemplate", "modalXemChiTietGiayToTaiLieu", { data: data });
    $("#modalDanhSachGiayToTaiLieu a:first-child").trigger("click");
    _modalXemThongTinGiayToTaiLieu.show();
}
function xemChiTietFile(bt, extension, el) {
    var tabActive = $(el).attr("document-id");
    $(".modalDanhSachGiayToTaiLieuTabItem").removeClass("tab-active");
    $("#modalDanhSachGiayToTaiLieuTabItem_" + tabActive).addClass("tab-active");
    var arr = unique_arr(bt.split(","));
    if (extension == ".pdf") {
        _carInvestigationService.layAnhChiTiet({ so_id: profileDetail.so_id, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        _commonService.InHoaDon({
            ma_mau_in: "BT_IN_ANH_HOA_DON",
            ma_doi_tac: profileDetail.ma_doi_tac,
            so_id: profileDetail.so_id,
            bt: arr
        }, "#modalXemChiTietGiayToTaiLieu").then(response => {
            PDFObject.embed("data:application/pdf;base64," + response,
                "#modalXemChiTietGiayToTaiLieuTabContent_" + tabActive, {
                pdfOpenParams: {
                    navpanes: 1,
                    statusbar: 0,
                    toolbar: 1,
                    view: "FitH",
                    pagemode: "bookmarks"
                }
            }
            );
        });
    }
}
function luuThueBT(callback = undefined) {
    var obj = _frmCapNhatThue.getJsonData();
    if (obj.so_id == undefined || obj.so_id == null || obj.so_id == "" || obj.so_id == 0) {
        _notifyService.error("Thiếu thông tin cập nhật thuế");
        return;
    }
    obj.tien_thue = _frmCapNhatThue.getControl("tien_thue").val().replace(/[^0-9]+/g, '');
    if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "" || obj.tien_thue < 0) {
        _notifyService.error("Tiền thuế cập nhật lại phải lớn hơn 0");
        return;
    }

    obj.tien_thue_cp_khac = _frmCapNhatThue.getControl("tien_thue_cp_khac").val().replace(/[^0-9]+/g, '');
    if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "" || obj.tien_thue_cp_khac < 0) {
        _notifyService.error("Tiền thuế chi phí khác cập nhật lại phải lớn hơn 0");
        return;
    }

    obj.ma_doi_tac = ESCS_MA_DOI_TAC;
    var checked = $("#frmCapNhatThueGenFileBT").is(":checked");
    if (checked) {
        obj.gen_file = "C";
        if (ESCS_MA_DOI_TAC == "OPES") {
            obj.create_file_sign = "OPES_TB_BOI_THUONG_BAI_NAI";
            obj.remove_file = "OPES_TB_BOI_THUONG_BAI_NAI";
        } else {
            obj.create_file_sign = "ESCS_THONG_BAO_BOI_THUONG";
            obj.remove_file = "ESCS_THONG_BAO_BOI_THUONG";
        }
    }
    else {
        obj.gen_file = "K";
        obj.create_file_sign = "";
        obj.remove_file = "";
    }
    _notifyService.confirm("Bạn có chắc chắn muốn cập nhật lại số tiền thuế không?", "", () => {
        _service.capNhatThue(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            obj.ma_doi_tac = profileDetail.ma_doi_tac;
            _service.layThongTinChiTietHoSo(obj).then(resDetail => {
                if (resDetail.state_info.status !== "OK") {
                    _notifyService.error(resDetail.state_info.message_body);
                    return;
                }
                var ho_so = resDetail.data_info.ho_so;
                if (ho_so.ngay_dong < 30000101) {
                    $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                    $("#btnDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
                    $("#btnChuyenBT_xemToanBoThongTinHSBT").addClass("d-none");
                } else {
                    $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
                    $("#btnDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                    $("#btnChuyenBT_xemToanBoThongTinHSBT").removeClass("d-none");
                }
                xemToanBoThongTinHoSoBoiThuong(ho_so.ma_doi_tac, ho_so.ma_chi_nhanh_ql, ho_so.ma_chi_nhanh, ho_so.so_id, ho_so.so_id_hd, ho_so.so_id_dt);
                _notifyService.success("Cập nhật tiền thuế thành công");
                if (callback) {
                    callback(res);
                }
            });

        });
    });
}
//Đọc OCR hóa đơn
function bindImagesTab1(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    return result;
}
function getImageOCRSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_anh_ocr']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function getImageHoaDonOCRSelect() {
    var arrVal = [];
    $("input:checkbox[name='ds_hoa_don_ocr']:checked").each(function () {
        arrVal.push($(this).val());
    });
    return arrVal;
}
function getHangMucAnhHoaDon() {
    var arrVal = [];
    $("input:checkbox[name='ds_hoa_don_ocr']:checked").each(function () {
        arrVal.push($(this).attr("data-ma-file"));
    });
    return arrVal;
}
function loadThongTinOCRHoaDonChungTu(obj) {
    _carClaimCommonService.soSanhThongTinOCRHoaDon(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var chung_tu = res.data_info.chung_tu;
        arrDuLieuOCRHoaDon = res.data_info.data;
        var arrHD = [];
        if (chung_tu.length > 0) {
            for (var i = 0; i < chung_tu.length; i++) {
                arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
            }
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
            _frmOCRHoaDonChungTu.getControl("bt").setValue(arrHD[0].ma);
        }
        else {
            _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", "");
            _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
        }
        $("#hoa_don_item_tat_ca").prop("checked", true);
        $("#hoa_don_item_tat_ca").trigger("change");
    });
}
function layChiTietHoaDonChungTu(ma_doi_tac, so_id, ma_file, bt) {
    $(".images-ocr").prop("checked", false);
    $("#img_" + so_id + '_' + bt).prop("checked", true);
    var obj = {
        ma_doi_tac: ma_doi_tac,
        so_id: so_id,
        nv: 'XE',
        hang_muc: ma_file,
        bt: bt.split(",")
    }
    loadThongTinOCRHoaDonChungTu(obj);
}
function soSanhDuLieuOCRHoaDon(val) {
    var data = arrDuLieuOCRHoaDon;
    var arr = [];
    if (val != "" && val != null && val != undefined) {
        var chung_tu = profileData.chung_tu.where(n => n.bt == val).firstOrDefault();
        //Tên đvị phát hành
        var ten_dvi_phat_hanh = {
            loai: "TEN_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Đơn vị phát hành",
            nd_goc: chung_tu.ten_dvi_phat_hanh == null || chung_tu.ten_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);
        //Mã số thuế
        var mst_dvi_phat_hanh = {
            loai: "MST_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Mã số thuế",
            nd_goc: chung_tu.mst_dvi_phat_hanh == null || chung_tu.mst_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.mst_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);
        //Địa chỉ 
        var dchi_dvi_phat_hanh = {
            loai: "DCHI_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Địa chỉ",
            nd_goc: chung_tu.dchi_dvi_phat_hanh == null || chung_tu.dchi_dvi_phat_hanh == '' ? 'Chưa có dữ liệu' : chung_tu.dchi_dvi_phat_hanh,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            dchi_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        dchi_dvi_phat_hanh.so_sanh = ESUtil.compareText(dchi_dvi_phat_hanh.nd_goc, dchi_dvi_phat_hanh.nd_ocr);
        //Ngày hdon
        var ngay_ct = {
            loai: "NGAY_CT",
            noi_dung_so_sanh: "Ngày hóa đơn",
            nd_goc: chung_tu.ngay_ct == null || chung_tu.ngay_ct == '' ? 'Chưa có dữ liệu' : chung_tu.ngay_ct,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
        }
        ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);
        //Mẫu hdon
        var mau_hdon = {
            loai: "MAU_HDON",
            noi_dung_so_sanh: "Mẫu hóa đơn",
            nd_goc: chung_tu.mau_hdon == null || chung_tu.mau_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.mau_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
        }
        mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);
        //Ký hiệu hdon
        var ky_hieu_hdon = {
            loai: "KY_HIEU_HDON",
            noi_dung_so_sanh: "Ký hiệu hóa đơn",
            nd_goc: chung_tu.ky_hieu_hdon == null || chung_tu.ky_hieu_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.ky_hieu_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
        }
        ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);
        //Số hdon
        var so_hdon = {
            loai: "SO_HDON",
            noi_dung_so_sanh: "Số hóa đơn",
            nd_goc: chung_tu.so_hdon == null || chung_tu.so_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.so_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
        }
        so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);
        //Tiền
        var tien = {
            loai: "TIEN",
            noi_dung_so_sanh: "Số tiền",
            nd_goc: chung_tu.tien_hdon == null || chung_tu.tien_hdon == '' ? 'Chưa có dữ liệu' : chung_tu.tien_hdon,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tien.nd_ocr = data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri;
        }
        tien.so_sanh = ESUtil.compareText(tien.nd_goc, tien.nd_ocr);
        //TL thuế
        var tl_thue = {
            loai: "TL_THUE",
            noi_dung_so_sanh: "Tỉ lệ thuế",
            nd_goc: chung_tu.tl_thue == null || chung_tu.tl_thue == '' ? 'Chưa có dữ liệu' : chung_tu.tl_thue,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tl_thue.nd_ocr = data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri;
        }
        tl_thue.so_sanh = ESUtil.compareText(tl_thue.nd_goc, tl_thue.nd_ocr);
        //Thuế
        var thue = {
            loai: "TIEN_THUE",
            noi_dung_so_sanh: "Tiền thuế",
            nd_goc: chung_tu.tien_thue == null || chung_tu.tien_thue == '' ? 'Chưa có dữ liệu' : chung_tu.tien_thue,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            thue.nd_ocr = data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri;
        }
        thue.so_sanh = ESUtil.compareText(thue.nd_goc, thue.nd_ocr);
        //Tổng tiền
        var tong_tien = {
            loai: "TONG_TIEN",
            noi_dung_so_sanh: "Tổng tiền",
            nd_goc: chung_tu.tong_tien == null || chung_tu.tong_tien == '' ? 'Chưa có dữ liệu' : chung_tu.tong_tien,
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
        }
        tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);
        //Tên dvi nhận
        var ten_dvi_nhan_hdon = {
            loai: "TEN_DVI_NHAN_HDON",
            noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
            nd_ocr: '',
            nd_goc: chung_tu.ten_dvi_nhan == null || chung_tu.ten_dvi_nhan == '' ? 'Chưa có dữ liệu' : chung_tu.ten_dvi_nhan,
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri;
        }
        ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);
        //Website tra cứu
        var website_tra_cuu = {
            loai: "WEBSITE_TRA_CUU_HDON",
            noi_dung_so_sanh: "Website tra cứu",
            nd_ocr: '',
            nd_goc: chung_tu.website_tra_cuu == null || chung_tu.website_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.website_tra_cuu,
            so_sanh: false
        };
        if (data.length > 1) {
            website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);
        //Mã tra cứu
        var ma_tra_cuu = {
            loai: "MA_TRA_CUU_HDON",
            noi_dung_so_sanh: "Mã tra cứu hóa đơn",
            nd_ocr: '',
            nd_goc: chung_tu.ma_tra_cuu == null || chung_tu.ma_tra_cuu == '' ? 'Chưa có dữ liệu' : chung_tu.ma_tra_cuu,
            so_sanh: false
        };
        if (data.length > 1) {
            ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

        arr.push(ten_dvi_phat_hanh);
        arr.push(mst_dvi_phat_hanh);
        arr.push(dchi_dvi_phat_hanh);
        arr.push(ngay_ct);
        arr.push(mau_hdon);
        arr.push(so_hdon);
        arr.push(ky_hieu_hdon);
        arr.push(tien);
        arr.push(tl_thue);
        arr.push(thue);
        arr.push(tong_tien);
        arr.push(ten_dvi_nhan_hdon);
        arr.push(ma_tra_cuu);
        arr.push(website_tra_cuu);
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
    }
    else {
        var chung_tu = ho_so_chi_tiet.data_info.chung_tu.where(n => n.bt == val).firstOrDefault();
        //Tên đvị phát hành
        var ten_dvi_phat_hanh = {
            loai: "TEN_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Đơn vị phát hành",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        ten_dvi_phat_hanh.so_sanh = ESUtil.compareText(ten_dvi_phat_hanh.nd_goc, ten_dvi_phat_hanh.nd_ocr);
        //Mã số thuế
        var mst_dvi_phat_hanh = {
            loai: "MST_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Mã số thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mst_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MST_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        mst_dvi_phat_hanh.so_sanh = ESUtil.compareText(mst_dvi_phat_hanh.nd_goc, mst_dvi_phat_hanh.nd_ocr);
        //Địa chỉ 
        var dchi_dvi_phat_hanh = {
            loai: "DCHI_DVI_PHAT_HANH",
            noi_dung_so_sanh: "Địa chỉ",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            dchi_dvi_phat_hanh.nd_ocr = data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'DCHI_DVI_PHAT_HANH').firstOrDefault().gia_tri;
        }
        dchi_dvi_phat_hanh.so_sanh = ESUtil.compareText(dchi_dvi_phat_hanh.nd_goc, dchi_dvi_phat_hanh.nd_ocr);
        //Ngày hdon
        var ngay_ct = {
            loai: "NGAY_CT",
            noi_dung_so_sanh: "Ngày hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ngay_ct.nd_ocr = data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'NGAY_CT').firstOrDefault().gia_tri;
        }
        ngay_ct.so_sanh = ESUtil.compareStringDate(ngay_ct.nd_goc, ngay_ct.nd_ocr);
        //Mẫu hdon
        var mau_hdon = {
            loai: "MAU_HDON",
            noi_dung_so_sanh: "Mẫu hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            mau_hdon.nd_ocr = data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MAU_HDON').firstOrDefault().gia_tri;
        }
        mau_hdon.so_sanh = ESUtil.compareText(mau_hdon.nd_goc, mau_hdon.nd_ocr);
        //Ký hiệu hdon
        var ky_hieu_hdon = {
            loai: "KY_HIEU_HDON",
            noi_dung_so_sanh: "Ký hiệu hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            ky_hieu_hdon.nd_ocr = data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'KY_HIEU_HDON').firstOrDefault().gia_tri;
        }
        ky_hieu_hdon.so_sanh = ESUtil.compareText(ky_hieu_hdon.nd_goc, ky_hieu_hdon.nd_ocr);
        //Số hdon
        var so_hdon = {
            loai: "SO_HDON",
            noi_dung_so_sanh: "Số hóa đơn",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            so_hdon.nd_ocr = data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'SO_HDON').firstOrDefault().gia_tri;
        }
        so_hdon.so_sanh = ESUtil.compareText(so_hdon.nd_goc, so_hdon.nd_ocr);
        //Tiền
        var tien = {
            loai: "TIEN",
            noi_dung_so_sanh: "Số tiền",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tien.nd_ocr = data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN').firstOrDefault().gia_tri;
        }
        tien.so_sanh = ESUtil.compareText(tien.nd_goc, tien.nd_ocr);
        //TL thuế
        var tl_thue = {
            loai: "TL_THUE",
            noi_dung_so_sanh: "Tỉ lệ thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tl_thue.nd_ocr = data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TL_THUE').firstOrDefault().gia_tri;
        }
        tl_thue.so_sanh = ESUtil.compareText(tl_thue.nd_goc, tl_thue.nd_ocr);
        //Thuế
        var thue = {
            loai: "TIEN_THUE",
            noi_dung_so_sanh: "Tiền thuế",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            thue.nd_ocr = data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TIEN_THUE').firstOrDefault().gia_tri;
        }
        thue.so_sanh = ESUtil.compareText(thue.nd_goc, thue.nd_ocr);
        //Tổng tiền
        var tong_tien = {
            loai: "TONG_TIEN",
            noi_dung_so_sanh: "Tổng tiền",
            nd_goc: 'Chưa có dữ liệu',
            nd_ocr: '',
            so_sanh: false
        };
        if (data.length > 1) {
            tong_tien.nd_ocr = data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TONG_TIEN').firstOrDefault().gia_tri;
        }
        tong_tien.so_sanh = ESUtil.compareText(tong_tien.nd_goc, tong_tien.nd_ocr);
        //Tên dvi nhận
        var ten_dvi_nhan_hdon = {
            loai: "TEN_DVI_NHAN_HDON",
            noi_dung_so_sanh: "Đơn vị nhận hóa đơn",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            ten_dvi_nhan_hdon.nd_ocr = data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'TEN_DVI_NHAN_HDON').firstOrDefault().gia_tri;
        }
        ten_dvi_nhan_hdon.so_sanh = ESUtil.compareText(ten_dvi_nhan_hdon.nd_goc, ten_dvi_nhan_hdon.nd_ocr);
        //Website tra cứu
        var website_tra_cuu = {
            loai: "WEBSITE_TRA_CUU_HDON",
            noi_dung_so_sanh: "Website tra cứu",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            website_tra_cuu.nd_ocr = data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'WEBSITE_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        website_tra_cuu.so_sanh = ESUtil.compareText(website_tra_cuu.nd_goc, website_tra_cuu.nd_ocr);
        //Mã tra cứu
        var ma_tra_cuu = {
            loai: "MA_TRA_CUU_HDON",
            noi_dung_so_sanh: "Mã tra cứu hóa đơn",
            nd_ocr: '',
            nd_goc: 'Chưa có dữ liệu',
            so_sanh: false
        };
        if (data.length > 1) {
            ma_tra_cuu.nd_ocr = data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == null || data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri == '' ? '' : data.where(n => n.loai == 'MA_TRA_CUU_HDON').firstOrDefault().gia_tri;
        }
        ma_tra_cuu.so_sanh = ESUtil.compareText(ma_tra_cuu.nd_goc, ma_tra_cuu.nd_ocr);

        arr.push(ten_dvi_phat_hanh);
        arr.push(mst_dvi_phat_hanh);
        arr.push(dchi_dvi_phat_hanh);
        arr.push(ngay_ct);
        arr.push(mau_hdon);
        arr.push(so_hdon);
        arr.push(ky_hieu_hdon);
        arr.push(tien);
        arr.push(tl_thue);
        arr.push(thue);
        arr.push(tong_tien);
        arr.push(ten_dvi_nhan_hdon);
        arr.push(ma_tra_cuu);
        arr.push(website_tra_cuu);
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: arr });
    }
}
function layDuLieuOCRHoaDonChungTu() {
    var otArr = [];
    $("#modalCompareDataOCRHoaDonChungTu tr.row_item").each(function (e) {
        var json = { loai: '', nd_ocr: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if (json[field] != undefined) {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onChonHoaDonOCR(el, val) {
    var count_item = $(".hoa_don_item").length;
    var count_checked = $(".hoa_don_item:checked").length;
    $("#hoa_don_item_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#hoa_don_item_tat_ca").prop("checked", true);
    var data = layDuLieuOCRHoaDonChungTu();
    var hs = data.where(n => n.loai == val).firstOrDefault();
    var count = arrThongTinOCRHoaDon.where(n => n.loai == val).length;
    if ($(el).is(":checked") && count <= 0) {
        arrThongTinOCRHoaDon.push(hs);
    }
    if ($(el).is(":checked") == false && count > 0) {
        arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.loai == val);
    }
}
function onChonHoaDonTatCaOCR(el) {
    arrThongTinOCRHoaDon = [];
    var checked = $(el).is(":checked");
    $(".hoa_don_item").prop("checked", checked);
    var data = layDuLieuOCRHoaDonChungTu();
    if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            var hs = data.where(n => n.loai == data[i].loai).firstOrDefault();
            var count = arrThongTinOCRHoaDon.where(n => n.loai == data[i].loai).length;
            if (checked && count <= 0) {
                arrThongTinOCRHoaDon.push(hs);
            }
            if (!checked && count > 0) {
                arrThongTinOCRHoaDon = arrThongTinOCRHoaDon.removeItem(n => n.loai == data[i].loai);
            }
        }
    }
}
function sdOCRHoaDon(el) {
    var arr = arrThongTinOCRHoaDon;
    var arrVal = getImageHoaDonOCRSelect();
    if (arr.length == 0) {
        _notifyService.error("Bạn chưa tích chọn dữ liệu cần sử dụng !");
        return;
    }
    var obj = {
        data: arr,
        so_id: profileDetail.so_id,
        bt: arrVal[0],
        dvi_ph: 'GARA'
    }
    _notifyService.confirm("Bạn có chắc chắn muốn sử dụng dữ liệu để cập nhật cho hóa đơn chứng từ ?", "", () => {
        _carClaimCommonService.capNhatThongTinHoaDon(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Cập nhật dữ liệu thành công");
            $("#hoa_don_item_tat_ca").prop("checked", false);
            var objGetDetail = { ma_doi_tac: profileDetail.ma_doi_tac, so_id: profileDetail.so_id };
            _service.layThongTinChiTietHoSo(objGetDetail).then(resDetail => {
                ho_so_chi_tiet = resDetail;
                var chung_tu = ho_so_chi_tiet.data_info.chung_tu;
                var arrHD = [];
                if (chung_tu.length > 0) {
                    for (var i = 0; i < chung_tu.length; i++) {
                        arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
                    }
                    _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
                    _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
                }
            });
            loadChungTuThuHuong();
        });
    });
};
function initImageViewerHangMucHoaDonCTiet() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-pictures-hoadon');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'img-hang-muc-hoadon',
        id: 'img-hang-muc-hoadon',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function bindImagesCategoryHoaDonDetail(arrAnh) {
    $("#dsHinhAnhHangMucHoaDonCTiet").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom: key, children: value }));

    return result;
}
function openModalXemHinhAnhHoaDonCTiet(val, bt, extension) {
    if (extension == ".pdf") {
        _carInvestigationService.layAnhChiTiet({ so_id: profileDetail.so_id, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        $('.inputSearchHangMucHoaDon').val('');
        _carInvestigationService.layDanhSachFile({
            ma_doi_tac: profileDetail.ma_doi_tac,
            ma_chi_nhanh: profileDetail.ma_chi_nhanh,
            so_id: profileDetail.so_id
        }).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMuc = bindImagesCategoryHoaDonDetail(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucHoaDonTemplate", "dsHinhAnhHangMucHoaDonCTiet", { danh_sach: arrAnhHangMuc });
                $('.inputSearchHangMucHoaDon').val(val);
                $(".inputSearchHangMucHoaDon").trigger('keyup');
            }
            initImageViewerHangMucHoaDonCTiet();
            _modalXemHinhAnhHoaDonCTiet.show();
        });
    }
}
//Xem hình ảnh hóa đơn
function xemHinhAnhHoaDon() {
    _carInvestigationService.layDanhSachFile({
        ma_doi_tac: profileDetail.ma_doi_tac,
        ma_chi_nhanh: profileDetail.ma_chi_nhanh,
        so_id: profileDetail.so_id
    }).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            var ext = [".jpg", ".png", ".jpeg", ".gif"];
            var ds_anh = res.data_info.where(n => ext.includes(n.extension) && n.loai == "TL");

            var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
            ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
            $('#input_imagesHangMucTonThat').val('Hóa đơn');
            $("#input_imagesHangMucTonThat").trigger('keyup');
        }
        initImageViewerHangMucTonThatXe();
    });
    _modalXemHinhAnhHangMucTonThat.show();
}
//Chon hoa don
function chonSoHoaDon(el) {
    $("#modalChonSoHoaDon .modalChonSoHoaDonItem").prop("checked", false);
    var val = $(el).val();
    if (val != "") {
        var arr = val.split(",");
        for (var i = 0; i < arr.length; i++) {
            $("#modalChonSoHoaDon .modalChonSoHoaDonItem[value='" + arr[i] + "']").prop("checked", true);
        }
    }
    _modalChonSoHoaDon.show(el);
}
//Tìm kiếm nhiều chi nhánh
function onFocusTimKiem(el) {
    $(el).focus();
}
function onChonDonViXuly(el, placement = "bottom") {
    $("#chon_tat_ca").prop("checked", false);
    var count_item = $(".modalChonChiNhanh").length;
    var val = $(el).attr("data-val");
    val = val || "";
    var arr = val.split(";").where(n => n != "");
    $("#modalChonChiNhanhDanhSach .modalChonChiNhanh").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanh[value='" + arr[i] + "']").prop("checked", true);
    }
    if (count_item === arr.length)
        $("#chon_tat_ca").prop("checked", true);
    _modalChonChiNhanh.setPlacement(placement);
    _modalChonChiNhanh.show(el);
}
function onChonTatCaDonVi(el) {
    arrChiNhanhTKiem = [];
    var checked = $(el).is(":checked");
    if (checked) {
        $(".modalChonChiNhanh").prop("checked", checked);
        $.each($("#modalChonChiNhanhDanhSach input.modalChonChiNhanh"), function (index, item) {
            if ($('.modalChonChiNhanh').is(':checked')) {
                var val = $(item).val();
                arrChiNhanhTKiem.push(val);
                $("#modalChonChiNhanhTimKiem_ma").val(arrChiNhanhTKiem.join("|"));
            }
        });
    } else {
        $(".modalChonChiNhanh").prop("checked", false);
        $("#modalChonChiNhanhTimKiem_ma").val("");
    }
}
function onChonDonVi(el) {
    var count_item = $(".modalChonChiNhanh").length;
    var count_checked = $(".modalChonChiNhanh:checked").length;
    $("#chon_tat_ca").prop("checked", false);
    if (count_item === count_checked)
        $("#chon_tat_ca").prop("checked", true);
    var val = $(el).val();
    var checked = $(el).is(":checked");
    var arr_ma = [];
    if ($("#modalChonChiNhanhTimKiem_ma").val() != "") {
        arr_ma = $("#modalChonChiNhanhTimKiem_ma").val().split("|");
    }
    if (checked) {
        arr_ma.push(val);
    } else {
        arr_ma = arr_ma.removeItem(n => n == val);
    }
    $("#modalChonChiNhanhTimKiem_ma").val(arr_ma.join("|"));
}
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("THANH_TOAN");
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_d").setValue(ngayDauNam);
    _frmTimKiemHoSoChoThanhToan.getControl("ngay_c").setValue(dateNow);

    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _userManagementService.layDsNSD(),
        _bankListService.layDsNganHang(),
        _carClaimCommonService.lietKeDanhSachGiayToOCR({ ma_doi_tac: ESCS_MA_DOI_TAC })
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.can_bo = arrRes[2].data_info;
        objDanhMuc.ngan_hang = arrRes[3].data_info.where(n => n.nhom === "NGAN_HANG");
        objDanhMuc.chi_nhanh_ngan_hang = arrRes[3].data_info.where(n => n.nhom === "CHI_NHANH_NGAN_HANG");
        objDanhMuc.ds_giay_to = arrRes[4].data_info;
        _frmTimKiemHoSoChoThanhToan.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh_ql").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh").setValue("");
        _frmTimKiemHoSoChoThanhToan.getControl("ma_chi_nhanh_ql").setValue("");

        _frmThemHoaDonChungTuBoiThuongXe.getControl("tl_thue").setDataSource(_common.danhMucChung.tl_thue, "ten", "ma", "Chọn mức tỷ lệ thuế", "");
        _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_ngan_hang").setDataSource(objDanhMuc.ngan_hang, "ten", "ma", "Chọn ngân hàng", "");
        _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_ngan_hang").addEventChange(val => {
            _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_chi_nhanh").setDataSource(objDanhMuc.chi_nhanh_ngan_hang.where(n => n.ma_ct == val), "ten", "ma", "Chọn chi nhánh", "");
        });
        ESUtil.genHTML("modalChonChiNhanhDanhSachTemplate", "modalChonChiNhanhDanhSach", { danh_sach: _.sortBy(arrChiNhanh, x => x.ten_tat) });
    });
    _frmThemHoaDonChungTuBoiThuongXe.getControl("tl_thue").addEventChange(val => {
        chungTuTinhTienXemToanBoThongTinHSBT();
    });
    _frmOCRHoaDonChungTu.getControl("hoa_don").addEventChange(val => {
        soSanhDuLieuOCRHoaDon(val);
    });
    _frmThemHoaDonChungTuBoiThuongXe.getControl("dvi_ph").addEventChange(val => {
        var data = {
            ma_doi_tac: profileDetail.ma_doi_tac,
            so_id: profileDetail.so_id,
            loai: val
        }
        _carCompensationService.layThongTinDoiTacChungTu(data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            res = res.data_info;
            var tong_cong = res.tien + res.thue;
            _frmThemHoaDonChungTuBoiThuongXe.getControl("ten_dvi_phat_hanh").setValue(res.ten);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("mst_dvi_phat_hanh").setValue(res.mst);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("dchi_dvi_phat_hanh").setValue(res.dia_chi);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("ten_dvi_nhan").setValue(res.ten_dvi_nhan);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("dchi_dvi_nhan").setValue(res.dchi_dvi_nhan);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("mst_dvi_nhan").setValue(res.mst_dvi_nhan);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("mau_hdon").setValue(res.mau_hdon);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("ky_hieu_hdon").setValue(res.ky_hieu_hdon);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("tien").setValue(res.tien);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("thue").setValue(ESUtil.formatMoney(res.thue));
            _frmThemHoaDonChungTuBoiThuongXe.getControl("tl_thue").setValue(res.tl_thue);
            _frmThemHoaDonChungTuBoiThuongXe.getControl("tong_cong").setValue(tong_cong);
            if (val === "CUUHO" || val === "KHACHHANG") {
                _frmThemHoaDonChungTuBoiThuongXe.getControl("mau_hdon").setValue("");
                _frmThemHoaDonChungTuBoiThuongXe.getControl("ky_hieu_hdon").setValue("");
            }
        });
    });
    _frmThemNguoiThuHuongBoiThuongXe.getControl("dvi_th").addEventChange(val => {
        var data = {
            ma_doi_tac: profileDetail.ma_doi_tac,
            so_id: profileDetail.so_id,
            loai: val
        }
        _carCompensationService.layThongTinDoiTac(data).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            resData = res.data_info;
            if (val == "KHACHHANG") {
                _frmThemNguoiThuHuongBoiThuongXe.getControl("dien_giai").setValue("");
            }
            _frmThemNguoiThuHuongBoiThuongXe.getControl("ten").setValue(resData.ten);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_ngan_hang").setValue(resData.ngan_hang_ma);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_ngan_hang").trigger("select2:select");
            _frmThemNguoiThuHuongBoiThuongXe.getControl("ma_chi_nhanh").setValue(resData.chi_nhanh_ma);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("tk_cmt").setValue(resData.tai_khoan);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("tien_chua_vat").setValue(resData.tien_chua_vat);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("tien_thue").setValue(resData.tien_thue);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("tien").setValue(resData.tien);
            _frmThemNguoiThuHuongBoiThuongXe.getControl("dien_giai").setValue(resData.dien_giai_1);
        });
    });

    _frmCapNhatThue.getControl("tien_thue").change(function () {
        var obj = _frmCapNhatThue.getJsonData();
        if (obj.so_tien == undefined || obj.so_tien == null || obj.so_tien == "") {
            obj.so_tien = 0;
        }
        if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "") {
            obj.tien_thue_cp_khac = 0;
        }
        obj.tien_thue = _frmCapNhatThue.getControl("tien_thue").val().replace(/[^0-9]+/g, '');
        if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "") {
            obj.tien_thue = 0;
        }
        var tong_cong = parseFloat(obj.so_tien) + parseFloat(obj.tien_thue) + parseFloat(obj.tien_thue_cp_khac);
        _frmCapNhatThue.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });
    _frmCapNhatThue.getControl("tien_thue_cp_khac").change(function () {
        var obj = _frmCapNhatThue.getJsonData();
        if (obj.so_tien == undefined || obj.so_tien == null || obj.so_tien == "") {
            obj.so_tien = 0;
        }
        obj.tien_thue_cp_khac = _frmCapNhatThue.getControl("tien_thue_cp_khac").val().replace(/[^0-9]+/g, '');
        if (obj.tien_thue_cp_khac == undefined || obj.tien_thue_cp_khac == null || obj.tien_thue_cp_khac == "") {
            obj.tien_thue_cp_khac = 0;
        }
        if (obj.tien_thue == undefined || obj.tien_thue == null || obj.tien_thue == "") {
            obj.tien_thue = 0;
        }
        var tong_cong = parseFloat(obj.so_tien) + parseFloat(obj.tien_thue) + parseFloat(obj.tien_thue_cp_khac);
        _frmCapNhatThue.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });

    $("#btnTimKiemHoSo").click(function () {
        getPaging(1);
    });
    $("#btnDongHoSo_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn đóng hồ sơ bồi thường này không?", "", val => {
            var data = {
                so_id: profileDetail.so_id
            }
            _service.dongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Đóng hồ sơ bồi thường thành công.");
                $("#btnDongHoSo_xemToanBoThongTinHSBT").addClass("d-none");
                $("#btnChuyenBT_xemToanBoThongTinHSBT").addClass("d-none");
                $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                _modalXemToanBoThongTinHoSo.hide();
                getPaging(1);
            });
        });
    });
    $("#btnChuyenBT_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn chuyển lại hồ sơ này cho cán bộ bồi thường?", "", val => {
            var data = {
                so_id: profileDetail.so_id
            }
            _service.chuyenBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Chuyển lại hồ sơ thành công.");
                _modalXemToanBoThongTinHoSo.hide();
                getPaging(1);
            });
        });
    });
    $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn hủy đóng hồ sơ bồi thường này không?", "", val => {
            var data = {
                so_id: profileDetail.so_id
            }
            _service.huyDongHoSoBT(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Hủy đóng hồ sơ bồi thường thành công.");
                $("#btnDongHoSo_xemToanBoThongTinHSBT").removeClass("d-none");
                $("#btnChuyenBT_xemToanBoThongTinHSBT").removeClass("d-none");
                $("#btnHuyDongHoSo_xemToanBoThongTinHSBT").addEventChange("d-none");
                _modalXemToanBoThongTinHoSo.hide();
                getPaging(1);
            });
        });
    });
    //Hóa đơn, chứng từ
    $("#btnThemNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        _frmThemNguoiThuHuongBoiThuongXe.resetForm();
        _frmThemNguoiThuHuongBoiThuongXe.clearErrorMessage();
        _modalThemNguoiThuHuongBoiThuongXe.show();
    })
    $("#frmThemNguoiThuHuongBoiThuongXe input[name='tien_chua_vat']").change(function () {
        var so_tien = parseInt(_frmThemNguoiThuHuongBoiThuongXe.getControl("tien_chua_vat").getValue());
        var thue = parseInt(_frmThemNguoiThuHuongBoiThuongXe.getControl("tien_thue").getValue());
        var tong_cong = so_tien + thue;
        _frmThemNguoiThuHuongBoiThuongXe.getControl("tien").setValue(ESUtil.formatMoney(tong_cong));
    });
    $("#frmThemNguoiThuHuongBoiThuongXe input[name='tien_thue']").change(function () {
        var so_tien = parseInt(_frmThemNguoiThuHuongBoiThuongXe.getControl("tien_chua_vat").getValue());
        var thue = parseInt(_frmThemNguoiThuHuongBoiThuongXe.getControl("tien_thue").getValue());
        var tong_cong = so_tien + thue;
        _frmThemNguoiThuHuongBoiThuongXe.getControl("tien").setValue(ESUtil.formatMoney(tong_cong));
    });
    $("#frmThemHoaDonChungTuBoiThuongXe input[name='tien']").change(function () {
        chungTuTinhTienXemToanBoThongTinHSBT();
    });
    $("#frmThemHoaDonChungTuBoiThuongXe input[name='thue']").change(function () {
        var so_tien = parseInt(_frmThemHoaDonChungTuBoiThuongXe.getControl("tien").getValue());
        var thue = parseInt(_frmThemHoaDonChungTuBoiThuongXe.getControl("thue").getValue());
        var tong_cong = so_tien + thue;
        _frmThemHoaDonChungTuBoiThuongXe.getControl("tong_cong").setValue(ESUtil.formatMoney(tong_cong));
    });
    $("#btnThemHoaDonChungTu_xemToanBoThongTinHSBT").click(function () {
        _frmThemHoaDonChungTuBoiThuongXe.resetForm();
        _frmThemHoaDonChungTuBoiThuongXe.clearErrorMessage();
        _modalThemHoaDonChungTuBoiThuongXe.show();
    });
    $("#btnLuuThongTinHoaDonChungTuBoiThuongXe_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuongXe.getJsonData();
        data.so_id = profileDetail.so_id;
        if (_frmThemHoaDonChungTuBoiThuongXe.isValid()) {
            _carCompensationService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmThemHoaDonChungTuBoiThuongXe.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuDongThongTinHoaDonChungTuBoiThuongXe_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemHoaDonChungTuBoiThuongXe.getJsonData();
        data.so_id = profileDetail.so_id;
        if (_frmThemHoaDonChungTuBoiThuongXe.isValid()) {
            _carCompensationService.nhapChungTuBoiThuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _modalThemHoaDonChungTuBoiThuongXe.hide();
                _notifyService.success("Lưu chứng từ thành công");
            });
        }
    });
    $("#btnLuuThongTinNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuongXe.getJsonData();
        data.so_id = profileDetail.so_id;
        if (_frmThemNguoiThuHuongBoiThuongXe.isValid()) {
            data.loai = "TH";
            _carCompensationService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _frmThemNguoiThuHuongBoiThuongXe.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    $("#btnLuuDongThongTinNguoiThuHuong_xemToanBoThongTinHSBT").click(function () {
        var data = _frmThemNguoiThuHuongBoiThuongXe.getJsonData();
        data.so_id = profileDetail.so_id;
        if (_frmThemNguoiThuHuongBoiThuongXe.isValid()) {
            data.loai = "TH";
            _carCompensationService.nhapThongTinNguoiThuHuong(data).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadChungTuThuHuong();
                _modalThemNguoiThuHuongBoiThuongXe.hide();
                _frmThemNguoiThuHuongBoiThuongXe.getControl("bt").setValue(res.out_value.bt);
                _notifyService.success("Lưu thông tin thụ hưởng thành công");
            });
        }
    });
    //Đọc hóa đơn 
    $('#modalDonViPhatHanhHoaDonDienTuXe_btnChonFileHoaDonDT').click(function () {
        if (!_frmUploadHoaDonDienTuXe.isValid()) {
            return;
        }
        $("#fileHoaDonDienTuXe").trigger("click");
    });
    $("#fileHoaDonDienTuXe").change(function () {
        var i = $(this).prev('label').clone();
        var file = $("#fileHoaDonDienTuXe")[0].files[0].name;
        $(this).prev('label').text(file);
    });
    $('#modalDonViPhatHanhHoaDonDienTuXe_btnDocFileHoaDonDT').click(function () {
        if (_frmUploadHoaDonDienTuXe.isValid()) {
            _frmThemHoaDonChungTuBoiThuongXe.resetForm();
            _frmThemHoaDonChungTuBoiThuongXe.clearErrorMessage();
            var formData = _frmUploadHoaDonDienTuXe.getFormFileData();
            formData.append("ma_doi_tac", profileDetail.ma_doi_tac);
            formData.append("so_id", profileDetail.so_id);
            _common.docHoaDon(formData).then(res => {
                if (res != undefined) {
                    _modalDonViPhatHanhHoaDonDienTuXe.hide();
                    $('#btnThemHoaDonChungTu_xemToanBoThongTinHSBT').trigger('click');
                    var obj = {
                        so_id: profileDetail.so_id,
                        dvi_phat_hanh: _frmUploadHoaDonDienTuXe.getControl('dvi_ph').getValue(),
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
                        dchi_dvi_nhan: res.buyerAddressLine,
                        website_tra_cuu: '',
                        ma_tra_cuu: ''
                    }
                    obj.tl_thue = obj.tl_thue.replace('%', '');
                    _frmThemHoaDonChungTuBoiThuongXe.getControl('dvi_ph').setValue(obj.dvi_phat_hanh);
                    _frmThemHoaDonChungTuBoiThuongXe.setData(obj);
                }
            });
        }
    });
    //Cập nhật lại thuế
    $("#btnCapNhatThue").click(function () {
        var obj = {
            ma_doi_tac: profileDetail.ma_doi_tac,
            so_id: profileDetail.so_id
        }
        _service.layTienBT(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmCapNhatThue.setData(res.data_info);
            $("#frmCapNhatThueGenFileBT").prop("checked", true);
            _modalCapNhatThue.show();
        });
    });
    $("#btnLuuDongCapNhatThue").click(function () {
        _frmCapNhatThue.getControl("hanh_dong").setValue("K");
        luuThueBT(res => {
            _modalCapNhatThue.hide();
        });
    });
    $("#btnLuuDongCapNhatThueThuHuong").click(function () {
        _frmCapNhatThue.getControl("hanh_dong").setValue("C");
        luuThueBT(res => {
            _modalCapNhatThue.hide();
        });
    });
    //Đọc OCR hóa đơn
    $("#btnDocOCRHoaDonXe").click(function () {
        arrDuLieuOCRHoaDon = [];
        arrThongTinOCRHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var obj = {
            ma_doi_tac: profileDetail.ma_doi_tac,
            ma_chi_nhanh: profileDetail.ma_chi_nhanh,
            so_id: profileDetail.so_id
        }
        var chung_tu = profileData.chung_tu;
        _carInvestigationService.layDanhSachFile(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var data = [];
                var ds_giay_to = objDanhMuc.ds_giay_to;
                $.each(res.data_info, function (index, item) {
                    $.each(ds_giay_to, function (index1, item1) {
                        if (item.ma_file == item1.hang_muc && (item1.ma == 'HOA_DON_DIEN_TU' || item1.ma == "HOA_DON_GIAY")) {
                            data.push(item);
                        }
                    });
                });
                var ext = [".jpg", ".png", ".jpeg", ".gif", ".pdf"];
                var ds_anh = data.where(n => ext.includes(n.extension));
                var arrAnh = bindImagesTab1(ds_anh);
                ESUtil.genHTML("dsAnhHoaDonChungTu_template", "dsAnhHoaDonChungTu", { danh_sach: arrAnh });
            }
            var arrHD = [];
            if (chung_tu.length > 0) {
                for (var i = 0; i < chung_tu.length; i++) {
                    arrHD.push({ ma: chung_tu[i].bt, ten: chung_tu[i].ten_dvi_phat_hanh });
                }
                _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", arrHD[0].ma);
                _frmOCRHoaDonChungTu.getControl("bt").setValue(arrHD[0].ma);
                _frmOCRHoaDonChungTu.getControl("hoa_don").trigger("select2:select");
            }
            else {
                _frmOCRHoaDonChungTu.getControl("hoa_don").setDataSource(arrHD, "ten", "ma", "Chọn hóa đơn", "");
            }
            _modalOCRHoaDonChungTu.show();
            $("#hoa_don_item_tat_ca").prop("checked", false);
        });
    });
    $("#btnDocOCRHoaDonChungTu").click(function () {
        arrThongTinOCRHoaDon = [];
        ESUtil.genHTML("modalCompareDataOCRHoaDonChungTuTemplate", "modalCompareDataOCRHoaDonChungTu", { data: [] });
        var arrVal = getImageHoaDonOCRSelect();
        var arrHangMuc = getHangMucAnhHoaDon();
        var obj = {
            ma_doi_tac: profileDetail.ma_doi_tac,
            so_id: profileDetail.so_id,
            nv: "XE",
            hang_muc: arrHangMuc[0],
            bt: arrVal,
            su_dung_truc_tiep_kqua: "K"
        };
        if (arrVal == undefined || arrVal == null || arrVal.length <= 0) {
            _notifyService.error("Bạn chưa chọn ảnh muốn thực hiện OCR");
            return;
        }
        _carClaimCommonService.docOCR(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            loadThongTinOCRHoaDonChungTu(obj);
        });
    });
    $('#btnToggleImageHoaDon').click(function () {
        $("#dsAnhHoaDonChungTu").toggleClass("list");
        if ($("#dsAnhHoaDonChungTu").hasClass("list")) {
            $(this).find("i").removeClass("fa-list").addClass("fa-th");
        } else {
            $(this).find("i").removeClass("fa-th").addClass("fa-list");
        }
    });
    $(".inputSearchHangMucHoaDon").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").removeClass("d-none");
        if (val != "") {
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#dsHinhAnhHangMucHoaDonCTiet .imagesCategory[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $(".inputTimKiemHangMuc_xemToanBoThongTinHSBTXe").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").removeClass("d-none");
        if (val != "") {
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#tblToanBoThongTinHangMucTonThatXeOTo .hmTonThatXeItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $('#btnChonSoHoaDon').click(function () {
        var target = _modalChonSoHoaDon.target;
        var arrInput = $("#modalChonSoHoaDon .modalChonSoHoaDonItem:checked");
        var arrChecked = [];
        arrInput.each(function (e) {
            var item = $(this).val();
            arrChecked.push(item);
        });
        var val = arrChecked.join(",");
        $(target).val(val);
        _modalChonSoHoaDon.hide();
    });
    //Tìm kiếm chi nhánh
    $("#modalChonChiNhanhTimKiem").keyup(ESUtil.delay(function (e) {
        var tim = ESUtil.xoaKhoangTrangText($(this).val().toLowerCase());
        if (tim == "") {
            $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").removeClass("d-none");
            return;
        }
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem").addClass("d-none");
        $("#modalChonChiNhanhDanhSach .modalChonChiNhanhDanhSachItem[data-text*='" + tim + "']").removeClass("d-none");
    }, 500));
    $("#ModalChonChiNhanh_btnChonDonVi").click(function () {
        var ma = $("#modalChonChiNhanhTimKiem_ma").val();
        var arr = ma.split("|");
        var data_val = "";
        var ten_dvi = "";
        for (var i = 0; i < arr.length; i++) {
            if (i == 0) {
                data_val += arr[i];
            } else {
                data_val += ";" + arr[i];
            }
        }
        if (arr.length >= 1 && arr[0].trim() != null && arr[0].trim() != "") {
            ten_dvi = "Đã có " + arr.length + " đơn vị được chọn";
        }
        $(_modalChonChiNhanh.target).attr("data-val", data_val);
        $(_modalChonChiNhanh.target).val(ten_dvi);
        _modalChonChiNhanh.hide();
    });
    getPaging(1);
});
