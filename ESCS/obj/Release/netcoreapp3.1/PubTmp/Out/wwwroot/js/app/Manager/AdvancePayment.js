var _common = new CommonService();
var _service = new AdvancePaymentService();
var _notifyService = new NotifyService();
var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var objDanhMuc = {};
var objDanhMucDonViHanhChinh = {};
var ho_so_chi_tiet = {};
var loai_trinh = "";
var nv_trinh = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();

const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'TT'; //Thanh toán
var ho_so = {};
var mode = "pro";
if (mode === "dev") {
    dateNow = "30/10/2020";
    ngayDauThang = "01/10/2020";
}
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "thu_huong", title: "Người thụ hưởng", width: "10%", headerSort: false},
    { field: "pttt", title: "PTTT", width: "10%", headerSort: false, hozAlign: "center" },
    { field: "tien", title: "Số tiền", width: "7%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "ten_nh", title: "Ngân hàng", width: "20%", headerSort: false },
    { field: "ngay_nh", title: "Ngày nhập", width: "10%", hozAlign: "center", headerSort: false },
    { field: "trang_thai", title: "Trạng thái", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "Người sử dụng", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nd", title: "Nội dung", width: "20%", headerSort: false },
];

var configColumnTon = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "18%", headerSort: false, hozAlign: "center" },
    { field: "tien", title: "Số tiền", width: "8%", hozAlign: "right", headerSort: false, formatter: formatterMoney },
    { field: "pttt", title: "PTTT", width: "6%", headerSort: false, hozAlign: "center" },
    { field: "ten", title: "Tên thụ hưởng", width: "25%", headerSort: false },
    { field: "tk_cmt", title: "Số TK/CMT", width: "10%", headerSort: false },
    { field: "ten_ngan_hang", title: "Ngân hàng/Địa chỉ nhận", width: "27%", hozAlign: "center", headerSort: false },
    { field: "dien_giai", title: "Diễn giải", width: "20%", hozAlign: "center", headerSort: false }
];
//service
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _bankListService = new BankListService();
//grid
var _gridViewThanhToan = new GridViewService("gridViewThanhToan", configColumn, getPaging, rowClick);
var _gridViewThanhToanTon = new GridViewService("gridViewThanhToanTon", configColumnTon, getPagingTon, rowClickTon);
//form
var _frmTimKiemThanhToan = new FormService("frmTimKiemThanhToan");
var _frmThanhToan = new FormService("frmThanhToan");
var _frmSearchHoSoTon = new FormService("frmSearchHoSoTon");
//button
var _btnThemMoiHoSo = new ButtonService("btnThemMoiHoSo");
var _btnLuuHoSo = new ButtonService("btnLuuHoSo");
var _btnFrmSearch = new ButtonService("btnFrmSearch");
//modal
var _modalThanhToanBoiThuong = new ModalService("modalThanhToanBoiThuong");
//category
var _userManagementService = new UserManagementService();
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }

    if (data.so_id_tt === undefined || data.so_id_tt === null || data.so_id_tt === 0 || data.so_id_tt === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, so_id_tt: data.so_id_tt };
    _service.layCtThanhToan(objGetDetail).then(res => {
        if (row !== undefined) {
            row.select();
        }
        _frmThanhToan.setData(res.data_info.ttchung);
        _frmThanhToan.getControl("ma_nh").trigger("select2:select");
        _frmThanhToan.getControl("tai_khoan").setValue(res.data_info.ttchung.ma_tai_khoan);
        ESUtil.genHTML("PaymentTable2_template", "PaymentTable1", res.data_info);
        $("#frmSearchHoSoTon").hide();
        $('#ttbt_chon_tat_ca').attr("disabled", "disabled");
        $('#ttbt_chon_tat_ca').prop("checked", true);
        $("#btnXoa").show();
        _modalThanhToanBoiThuong.show();
    });
}
function rowClickTon(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (row !== undefined) {
        row.select();
    }
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
function getPaging(trang) {
    if (_frmTimKiemThanhToan.isValid()) {
        var objTimKiem = _frmTimKiemThanhToan.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewThanhToan.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewThanhToan.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function getPagingTon(trang, callback = undefined) {
    if (_frmSearchHoSoTon.isValid()) {
        var objTimKiem = _frmSearchHoSoTon.getJsonData();
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.layDSTon(objTimKiem).then(res => {
            _gridViewThanhToanTon.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewThanhToanTon.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewThanhToanTon.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
            if (callback) {
                callback(res);
            }
        });
    }
}

$(document).ready(function() {
    //Khởi tạo giá trị cho bộ lọc hồ sơ
    _frmTimKiemThanhToan.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemThanhToan.getControl("ngay_c").setValue(dateNow);

    _frmSearchHoSoTon.getControl("ngay_d").setValue("");
    _frmSearchHoSoTon.getControl("ngay_c").setValue("");
    _frmSearchHoSoTon.getControl("nv").setValue("XE");
    //Lấy danh sách hồ sơ (có phân trang)
    getPaging(1);
    //Lấy danh mục
    _service.base.all([
        _branchListService.layDsChiNhanh(),
        _service.layDsTaiKhoanChiNhanh(),
    ]).then(arrRes => {
        objDanhMuc.chi_nhanh = arrRes[0].data_info;
        objDanhMuc.tai_khoan = arrRes[1].data_info;
        objDanhMuc.ngan_hang = [];
        for (var i = 0; i < arrRes[1].data_info.length; i++) {
            var obj = { ngan_hang: arrRes[1].data_info[i].ngan_hang, ten_ngan_hang: arrRes[1].data_info[i].ten_ngan_hang };
            var count = objDanhMuc.ngan_hang.where(n => n.ngan_hang == obj.ngan_hang).length;
            if (count <= 0) {
                objDanhMuc.ngan_hang.push(obj);
            }
        }
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ESCS_MA_DOI_TAC);
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemThanhToan.getControl("ma_chi_nhanh").setValue("");
        _frmThanhToan.getControl("ma_nh").setDataSource(objDanhMuc.ngan_hang, "ten_ngan_hang", "ngan_hang", "Chọn ngân hàng", "");
        _frmThanhToan.getControl("tai_khoan").setDataSource([], "tai_khoan", "ma_tai_khoan", "Chọn tài khoản thanh toán", "");
        
        hienThiHoSoNofify();
    });
    _frmThanhToan.getControl("ma_nh").addEventChange(val => {
        var tai_khoan = objDanhMuc.tai_khoan.where(n => n.ngan_hang == val);
        _frmThanhToan.getControl("tai_khoan").setDataSource(tai_khoan, "tai_khoan", "ma_tai_khoan", "Chọn tài khoản thanh toán", "");
    });
    _btnThemMoiHoSo.click(function () {
        $("#btnXoa").hide();
        $("#frmSearchHoSoTon").show();
        $('#ttbt_chon_tat_ca').removeAttr("disabled");
        $("#ttbt_chon_tat_ca").prop("checked", false);
        _frmThanhToan.resetForm();
        _frmThanhToan.getControl("ngay_ht").setValue(dateNow);
        _frmSearchHoSoTon.resetForm();
        _frmSearchHoSoTon.getControl("ngay_d").setValue("");
        _frmSearchHoSoTon.getControl("ngay_c").setValue("");
        _frmSearchHoSoTon.getControl("nv").setValue("XE");
        getPagingTon(1, res => {
            _modalThanhToanBoiThuong.show();
            setTimeout(() => {
                _gridViewThanhToanTon.table.redraw(true);
            }, 200);
        });
    });
    _btnLuuHoSo.click(function() {
        var obj = _frmThanhToan.getJsonData();
        if (_frmThanhToan.isValid()) {
            obj.arr = html2json();
            obj.nv = "XE";
            obj.ma_cnhanh_nh = obj.tai_khoan.split('-')[0];
            obj.ma_tk = obj.tai_khoan.split('-')[1];
            _service.nhapHsThanhToan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmThanhToan.getControl("so_id_tt").setValue(res.out_value.so_id_tt);
                _notifyService.success("Lưu thành công");
                getPaging(1);
            });
        }
    });
    $("#btnLuuDongHoSo").click(function () {
        var obj = _frmThanhToan.getJsonData();
        if (_frmThanhToan.isValid()) {
            obj.arr = html2json();
            obj.nv = "XE";
            obj.ma_cnhanh_nh = obj.tai_khoan.split('-')[0];
            obj.ma_tk = obj.tai_khoan.split('-')[1];
            _service.nhapHsThanhToan(obj).then(res => {
                if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmThanhToan.getControl("so_id_tt").setValue(res.out_value.so_id_tt);
                _notifyService.success("Lưu thành công");
                getPaging(1);
                _modalThanhToanBoiThuong.hide();
            });
        }
    });
    _btnFrmSearch.click(function () {
        getPaging(1);
    });
    $("#btnTKiemHsTon").click(function () {
        getPagingTon(1);
    });
    $("#btnXoa").click(function () {
        _notifyService.confirmDelete("Bạn có chắc muốn xóa chứng từ thanh toán này không?", "", () => {
            var obj = _frmThanhToan.getJsonData();
            if (_frmThanhToan.isValid()) {
                _service.xoaHsThanhToan(obj).then(res => {
                    if (res !== undefined && res !== null && res.state_info.status === "NotOK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _modalThanhToanBoiThuong.hide();
                    _notifyService.success("Xóa thành công");
                    getPaging(1);
                });
            }
        });
    });
});
function html2json() {
    var otArr = [];
    $('#PaymentTable1 tr').each(function(e) {
        var val = JSON.parse($(this).find("input[name='objInfo']").val());
        var chk = $(this).find('input[name="bt"]');
        if (chk.is(':checked')) {
            otArr.push(val);
        }
    });
    return otArr;
}