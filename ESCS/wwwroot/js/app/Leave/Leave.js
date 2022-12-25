const GRID_HO_SO_SO_DONG = 14;
const CONSTANT_PM = 'LN'; //Lịch nghỉ

//var _commonService = new CommonService();
// PHÊ DUYỆT 
var dateNow = new Date().ddmmyyyy();
var gioHT = new Date().HHmm();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var objDanhMuc = {};
var arrTrangThai = [];
var ho_so_chi_tiet = {};

var _notifyService = new NotifyService();
var _service = new LeaveService();
var _userManagementService = new UserManagementService();
var _partnerListService = new PartnerListService();
// Tìm kiếm
var _frmTimKiemHoSo = new FormService("FrmApprovedSearch");
var _frmThongTinLichNghi = new FormService("FrmThongTinLichNghi");
// Button
var _btnFrmLeaveSearch = new ButtonService("btnFrmLeaveSearch");
var _btnFrmLeaveAdd = new ButtonService("btnFrmLeaveAdd");
var _btnLuuLichNghi = new ButtonService("btnLuuLichNghi");
var _btnXoaLichNghi = new ButtonService("btnXoaLichNghi");
var _btnDuyetLichNghi = new ButtonService("btnDuyetLichNghi");
var _btnHuyDuyetLichNghi = new ButtonService("btnHuyDuyetLichNghi");
// Modal
var _modalThemLichNghi = new ModalService("modalThemLichNghi");
// Grid
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nsd_tao", title: "Người tạo", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Cán bộ nghỉ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_cb", title: "Tên cán bộ nghỉ", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ngay_bd", title: "Ngày bắt đầu", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ngay_kt", title: "Ngày kết thúc", width: "10%", hozAlign: "center", headerSort: false },
    { field: "noi_dung", title: "Nội dung", width: "28%", headerSort: false},
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", headerSort: false},
    { field: "bt", title: "bt", width: "4%", hozAlign: "center", headerSort: false, visible: false }
];
var _gridViewDanhSach = new GridViewService("gridViewDanhSach", configColumn, getPaging, rowClick);

function getPaging(trang) {
    if (_frmTimKiemHoSo.isValid()) {
        var objTimKiem = _frmTimKiemHoSo.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _service.paging(objTimKiem).then(res => {
            _gridViewDanhSach.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
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

function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    if (data.bt === undefined || data.bt === null || data.bt === 0 || data.bt === "") {
        return;
    }
    var objGetDetail = { ma_doi_tac: data.ma_doi_tac, ma_chi_nhanh: data.ma_chi_nhanh, ma:data.ma, bt:data.bt };
    _service.xemChiTietLichNghi(objGetDetail).then(res => {
        ho_so_chi_tiet = res;
        _frmThongTinLichNghi.setData(res.data_info.lich_nghi);
        _frmThongTinLichNghi.getControl("ma_doi_tac").setValue(res.data_info.lich_nghi.ma_doi_tac);
        _frmThongTinLichNghi.getControl("ma_doi_tac").trigger("select2:select");
        _frmThongTinLichNghi.getControl("ma").setValue(res.data_info.lich_nghi.ma);

        if (res.data_info.lich_nghi.trang_thai == 'C') {
            _btnDuyetLichNghi.show();
            _btnLuuLichNghi.show();
            _btnXoaLichNghi.show();
        } else {
            _btnDuyetLichNghi.hide();
            _btnLuuLichNghi.hide();
            _btnXoaLichNghi.hide();
        }
        //_btnXoaLichNghi.show();
        $('#modalThemLichNghi .modal-title').html('Sửa thông tin lần nghỉ');
        _modalThemLichNghi.show();
    });
}

function bindCmbDataDonVi(objDanhMuc) {
    _frmThongTinLichNghi.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đơn vị", "");
    _frmThongTinLichNghi.getControl("ma").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
    _frmThongTinLichNghi.getControl("ma_doi_tac").addEventChange(val => {
        var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === val);
        //console.log(arrCanBo);
        _frmThongTinLichNghi.getControl("ma").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThongTinLichNghi.getControl("ma").setValue("");
    });
}

$(document).ready(function () {
    _frmTimKiemHoSo.getControl("ngay_d").setValue(ngayDauThang);
    _frmTimKiemHoSo.getControl("ngay_c").setValue(dateNow);

    var objTimKiem = _frmTimKiemHoSo.getJsonData();
    objTimKiem.trang = 1;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _service.base.all([
        _userManagementService.layDsNSD(),
        _partnerListService.layDsDoiTac(),
        _service.paging(objTimKiem),
    ]).then(arrRes => {
        objDanhMuc.can_bo = arrRes[0].data_info;
        objDanhMuc.doi_tac = arrRes[1].data_info;
        ESUtil.executeAsync(() => { bindCmbDataDonVi(objDanhMuc); });
        ESUtil.executeAsync(() => {
            _gridViewDanhSach.setDataSource(arrRes[2], 1);
            if (arrRes[2].data_info.data !== null && arrRes[2].data_info.data !== undefined && arrRes[2].data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG - arrRes[2].data_info.data.length);
            } else {
                _gridViewDanhSach.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
        ESUtil.executeWithTimeAsync(hienThiHoSoNofify, 300);
    });

    _btnFrmLeaveSearch.click(function () {
        getPaging(1);
    });

    _btnFrmLeaveAdd.click(function () {
        _frmThongTinLichNghi.resetForm();
        _frmThongTinLichNghi.getControl("gio_phut_bd").val(gioHT);
        _frmThongTinLichNghi.getControl("ngay_bd").val(dateNow);
        _frmThongTinLichNghi.getControl("gio_phut_kt").val(gioHT);
        _frmThongTinLichNghi.getControl("ngay_kt").val(dateNow);
        _btnDuyetLichNghi.hide();
        _btnXoaLichNghi.hide();
        _btnLuuLichNghi.show();
        $('#modalThemLichNghi .modal-title').html('Thêm lần nghỉ');
        _modalThemLichNghi.show();
    });

    _btnLuuLichNghi.click(function () {
        if (_frmThongTinLichNghi.isValid()) {
            var json = _frmThongTinLichNghi.getJsonData();
            json.ma_chi_nhanh = json.ma_doi_tac;
            _service.luuLichNghi(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThemLichNghi.hide();
                _notifyService.success("Lưu lịch nghỉ thành công");
            });

        }
    });

    _btnDuyetLichNghi.click(function () {
        if (_frmThongTinLichNghi.isValid()) {
            var json = _frmThongTinLichNghi.getJsonData();
            _service.duyetLichNghi(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThemLichNghi.hide();
                _notifyService.success("Duyệt lịch nghỉ thành công");
            });
        }
    });

    _btnXoaLichNghi.click(function () {
        if (_frmThongTinLichNghi.isValid()) {
            _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa không?", "", val => {
                var json = _frmThongTinLichNghi.getJsonData();
                json.ma_chi_nhanh = json.ma_doi_tac;
                _service.xoaLichNghi(json).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    getPaging(1);
                    _modalThemLichNghi.hide();
                    _notifyService.success("Xóa lịch nghỉ thành công");
                });
            });
        }
    });

    $('#trang_thai').bind("change", function () {
        getPaging(1);
    });
});