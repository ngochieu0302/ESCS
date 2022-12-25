var objDanhMuc = {};
var _frmTraCuuGia = new FormService("frmTraCuuGia");
var _notifyService = new NotifyService();
var _service = new Service();
var _averagePriceService = new AveragePriceService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _frmTimKiem = new FormService("frmTimKiem");
var _modalNhapTraCuuGia = new ModalService("modalNhapTraCuuGia");
var objTimKiem = {};
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "hang_xe", title: "Hãng xe", width: "9%", align: "center", headerSort: false },
    { field: "hieu_xe", title: "Hiệu xe", width: "9%", align: "center", headerSort: false },
    { field: "ten_hang_muc_hthi", title: "Hạng mục", width: "20%", headerSort: false },
    { field: "muc_do_ten", title: "Mức độ", width: "18%", headerSort: false },
    { field: "tien", title: "Giá tiền", width: "9%", headerSort: false, align: "right", formatter: formatterMoney },
    { field: "tinh_thanh_ten", title: "Tỉnh thành", width: "9%", headerSort: false },
    { field: "thay_the_sc_hthi", title: "Thay thế sửa chữa", width: "10%", align:"center", headerSort: false },
    { field: "chinh_hang_hthi", title: "Chính hãng", width: "10%", align: "center", headerSort: false }
];

var configHoSoColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "so_hs", title: "Số hồ sơ", width: "44%", headerSort: false },
    { field: "ngay_ht", title: "Ngày", width: "25%", headerSort: false },
    { field: "tien", title: "Số tiền", width: "25%", headerSort: false, formatter: formatterMoney }
];

var _gridViewDsHoSo = new GridViewService("gridViewDsHoSo", configHoSoColumn, getPagingHoSo, undefined);
var _gridViewTraCuuGia = new GridViewService("gridViewTraCuuGia", configColumn, getPaging, rowClick);
function getPagingHoSo(trang, callback = undefined) {
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 10;
    _averagePriceService.layDanhSachHoSo(objTimKiem).then(res => {
       
        _gridViewDsHoSo.setDataSource(res, trang);
        if (callback) {
            callback(res);
        }
        
    });
}
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 15;
    _averagePriceService.timKiemPTrang(objTimKiem).then(res => {
        _gridViewTraCuuGia.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    objTimKiem = data;
    data.ten_gara = "Công ty TNHH Đầu Tư và TM";
    getPagingHoSo(1, res => {
        ESUtil.genHTML("templateThongTinDsHoSo", "thongTinDsHoSo", data);
        _modalNhapTraCuuGia.show();
        setTimeout(() => {
            _gridViewDsHoSo.table.redraw(true);
        }, 200);
    });
};
function bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh) {
    var dviHanhChinh = objDanhMucDonViHanhChinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
    _frmTimKiem.getControl("tinh_thanh").setDataSource(dviHanhChinh, "ten_tinh", "ma_tinh", "Chọn tỉnh thành", "");
    _frmTimKiem.getControl("quan_huyen").setDataSource([], "ten_quan", "ma_quan", "Chọn quận huyện", "");
    _frmTimKiem.getControl("tinh_thanh").addEventChange(val => {
        var arrQuanHuyen = objDanhMucDonViHanhChinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === val);
        _frmTimKiem.getControl("quan_huyen").setDataSource(arrQuanHuyen, "ten_quan", "ma_quan", "Chọn quận huyện", "");
        _frmTimKiem.getControl("quan_huyen").setValue("");
    });
}
$(document).ready(function () {
    var storageDonViHanhChinh = ESStorage.getItemLocalStorage(ESConstants.DON_VI_HANH_CHINH);
    if (storageDonViHanhChinh === undefined || storageDonViHanhChinh === null || storageDonViHanhChinh === "null") {
        _service.base.all([
            _commonService.layTatCaDonViHanhChinh(),
            _categoryvehicleListService.layDsHangMucXe()
        ]).then(arrRes => {
            ESUtil.executeAsync(() => {
                objDanhMucDonViHanhChinh = arrRes[0].data_info;
                ESStorage.setItemLocalStorage(ESConstants.DON_VI_HANH_CHINH, JSON.stringify(objDanhMucDonViHanhChinh));
                bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);
            });
            _frmTraCuuGia.getControl("hang_muc").setDataSource(arrRes[1].data_info, "ten", "ma", "Chọn hạng mục", "");
        });
    }
    else {
        objDanhMucDonViHanhChinh = JSON.parse(storageDonViHanhChinh);
        bindCmbDataDonViHanhChinh(objDanhMucDonViHanhChinh);
        _categoryvehicleListService.layDsHangMucXe().then(res => {
            _frmTraCuuGia.getControl("hang_muc").setDataSource(res.data_info, "ten", "ma", "Chọn hạng mục", "");
        });
    }
    

    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    getPaging(1);
});

