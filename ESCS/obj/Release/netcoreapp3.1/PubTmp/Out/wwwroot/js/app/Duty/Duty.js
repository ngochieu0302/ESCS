const GRID_HO_SO_SO_DONG = 14;
const CONSTANT_PM = 'LT'; //Lịch trực

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
var _service = new DutyService();
var _userManagementService = new UserManagementService();
var _partnerListService = new PartnerListService();
// Tìm kiếm
var _frmTimKiemHoSo = new FormService("FrmApprovedSearch");
var _frmThongTinLichTruc = new FormService("FrmThongTinLichTruc");
// Button
var _btnFrmDutySearch = new ButtonService("btnFrmDutySearch");
var _btnFrmDutyAdd = new ButtonService("btnFrmDutyAdd");
var _btnLuuLichTruc = new ButtonService("btnLuuLichTruc");
var _btnXoaLichTruc = new ButtonService("btnXoaLichTruc");
var _btnDuyetLichTruc = new ButtonService("btnDuyetLichTruc");
var _btnHuyDuyetLichTruc = new ButtonService("btnHuyDuyetLichTruc");
// Modal
var _modalThemLichTruc = new ModalService("modalThemLichTruc");
// Grid
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "nsd_tao", title: "Người tạo", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Cán bộ trực", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_cb", title: "Tên cán bộ trực", width: "15%", hozAlign: "center", headerSort: false },
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
    _service.xemChiTietLichTruc(objGetDetail).then(res => {
        ho_so_chi_tiet = res;
        console.log(res);
        _frmThongTinLichTruc.setData(res.data_info);
        _frmThongTinLichTruc.getControl("ma_doi_tac").setValue(res.data_info.ma_doi_tac);
        _frmThongTinLichTruc.getControl("ma_doi_tac").trigger("select2:select");
        _frmThongTinLichTruc.getControl("ma").setValue(res.data_info.ma);

        if (res.data_info.trang_thai == 'C') {
            _btnDuyetLichTruc.show();
            _btnLuuLichTruc.show();
            _btnXoaLichTruc.show();
        } else {
            _btnDuyetLichTruc.hide();
            _btnLuuLichTruc.hide();
            _btnXoaLichTruc.hide();
        }
        //_btnXoaLichTruc.show();
        $('#modalThemLichTruc .modal-title').html('Sửa thông tin lần nghỉ');
        _modalThemLichTruc.show();
    });
}

function bindCmbDataDonVi(objDanhMuc) {
    _frmThongTinLichTruc.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đơn vị", "");
    _frmThongTinLichTruc.getControl("ma").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
    _frmThongTinLichTruc.getControl("ma_doi_tac").addEventChange(val => {
        var arrCanBo = objDanhMuc.can_bo.where(n => n.ma_doi_tac === val);
        //console.log(arrCanBo);
        _frmThongTinLichTruc.getControl("ma").setDataSource(arrCanBo, "ten", "ma", "Chọn cán bộ", "");
        _frmThongTinLichTruc.getControl("ma").setValue("");
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

    _btnFrmDutySearch.click(function () {
        getPaging(1);
    });

    _btnFrmDutyAdd.click(function () {
        _frmThongTinLichTruc.resetForm();
        _frmThongTinLichTruc.getControl("gio_phut_bd").val(gioHT);
        _frmThongTinLichTruc.getControl("ngay_bd").val(dateNow);
        _frmThongTinLichTruc.getControl("gio_phut_kt").val(gioHT);
        _frmThongTinLichTruc.getControl("ngay_kt").val(dateNow);
        _btnDuyetLichTruc.hide();
        _btnXoaLichTruc.hide();
        _btnLuuLichTruc.show();
        $('#modalThemLichTruc .modal-title').html('Thêm lần trực');
        _modalThemLichTruc.show();
    });

    _btnLuuLichTruc.click(function () {
        if (_frmThongTinLichTruc.isValid()) {
            var json = _frmThongTinLichTruc.getJsonData();
            json.ma_chi_nhanh = json.ma_doi_tac;
            _service.luuLichTruc(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThemLichTruc.hide();
                _notifyService.success("Lưu lịch nghỉ thành công");
            });

        }
    });

    _btnDuyetLichTruc.click(function () {
        if (_frmThongTinLichTruc.isValid()) {
            var json = _frmThongTinLichTruc.getJsonData();
            json.ma_chi_nhanh = json.ma_doi_tac;
            _service.duyetLichTruc(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                getPaging(1);
                _modalThemLichTruc.hide();
                _notifyService.success("Duyệt lịch nghỉ thành công");
            });
        }
    });

    _btnXoaLichTruc.click(function () {
        if (_frmThongTinLichTruc.isValid()) {
            _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa không?", "", val => {
                var json = _frmThongTinLichTruc.getJsonData();
                json.ma_chi_nhanh = json.ma_doi_tac;
                _service.xoaLichTruc(json).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    getPaging(1);
                    _modalThemLichTruc.hide();
                    _notifyService.success("Xóa lịch nghỉ thành công");
                });
            });
        }
    });

    $('#trang_thai').bind("change", function () {
        getPaging(1);
    });
});