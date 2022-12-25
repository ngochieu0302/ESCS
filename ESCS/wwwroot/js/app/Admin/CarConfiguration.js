var objDanhMuc = {};
var objCauHinh = {};
var objCauHinhSLA = {};
var arrTinh = [];
var arrQuanHuyen = [];
var arrChiNhanh = [];
var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _carConfigurationService = new CarConfigurationService();
var _rangeVehicleService = new RangeVehicleService();
var _categoryCommonService = new CategoryCommonService();
var _administrativeUnitsService = new AdministrativeUnitsService();
var _branchListService = new BranchListService();
var _categoryvehicleListService = new CategoryvehicleListService();
var _damageLevelService = new DamageLevelService();
var _userManagementService = new UserManagementService();
var _garaListService = new GaraListService();
var _hieuXeService = new HieuXeService();

var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var dateNow = new Date().ddmmyyyy();
const GRID_HO_SO_SO_DONG = 14;

var dataHS = [
    { ma: ' ', ten: 'Chọn trạng thái' },
    { ma: 'C', ten: 'Có' },
    { ma: 'K', ten: 'Không' }
];
var dataTT = [
    { ma: ' ', ten: 'Chọn trạng thái' },
    { ma: 'T', ten: 'Trước thuế' },
    { ma: 'S', ten: 'Sau thuế' }
];
var arrXE = [
    { ma: "TN", ten: "Tự nguyện", nv: "XE" },
    { ma: "BB", ten: "Bắt buộc", nv: "XE" }
];
var arrHoSo = [
    { ma: "GD_XE", ten: "Giám định", nv: "XE" },
    { ma: "BT_XE", ten: "Bồi thường", nv: "XE" },
    { ma: "PA_XE", ten: "Phương án", nv: "XE" },
    { ma: "BL_XE", ten: "Bảo lãnh", nv: "XE" },
    { ma: "TT_XE", ten: "Chuyển thanh toán", nv: "XE" }
];
const arrLoaiHSGT = [
    { ma: 'BG', ten: 'Bản gốc' },
    { ma: 'BS', ten: 'Bản sao' },
    { ma: 'BDC', ten: 'Bản đối chiếu' }
]
var arrNv = [
    { ma: 'XE', ten: 'Xe ô tô' },
    { ma: 'XE_MAY', ten: 'Xe máy' }
]
var arrCloneSLA = [];
var arrTinhThanh = [];
var nvGiamTru = '';
var nvCauHinhBT = '';

var _frmTimKiem = new FormService("frmTimKiem");
var _frmThemKhauHao = new FormService("frmThemKhauHao");
var _frmThemKhauHaoLoaiXe = new FormService("frmThemKhauHaoLoaiXe");
var _frmThemCauHinhXeOto = new FormService("frmThemCauHinhXeOto");
var _frmThemkpi = new FormService("frmThemkpi");
var _frmCauHinhSLA = new FormService("frmCauHinhSLA");
var _frmThemCauHinhPhanCong = new FormService("frmThemCauHinhPhanCong");
var _frmCHPheDuyetGiaTuDongNhapNgayAD = new FormService("frmCHPheDuyetGiaTuDongNhapNgayAD");
var _frmCHBenGDMD_MQH = new FormService("frmCHBenGDMD_MQH");
var _frmThemNgayApDung = new FormService("frmThemNgayApDung");
var _frmThemNgayApDungGT = new FormService("frmThemNgayApDungGT");
var _frmThemNgayApDungHSCT = new FormService("frmThemNgayApDungHSCT");
var _frmThemNgayApDungXLBT = new FormService("frmThemNgayApDungXLBT");
var _frmCauHinhXuLyBoiThuong = new FormService("frmCauHinhXuLyBoiThuong");

var _navCauHinhXuLy = new NavTabService("navCauHinhXuLy", ["tabCauHinhXeOTo", "tabCauHinhXeMay"], "nav-tabs");
var _navCauHinhBenGDMD = new NavTabService("navCauHinhBenGDMD", ["tabCauHinhBenGDMDXeOTo", "tabCauHinhBenGDMDXeMay"], "nav-tabs");
var _navCauHinhPhanCongDiaBanGD = new NavTabService("navCauHinhPhanCongDiaBanGD", ["tabCauHinhPhanCongDiaBanGDXeOTo", "tabCauHinhPhanCongDiaBanGDXeMay"], "nav-tabs");

var _modalNhapKhauHao = new ModalService("modalNhapKhauHao");
var _modalNhapGiamTru = new ModalService("modalNhapGiamTru");
var _modalCauHinhChungXeOto = new ModalService("modalCauHinhChungXeOto");
var _modalThemCauHinhkpi = new ModalService("modalThemCauHinhkpi");
var _modalThemCauHinhBoiThuong = new ModalService("modalThemCauHinhBoiThuong");
var _modalThemCauHinhHoSo = new ModalService("modalThemCauHinhHoSo");
var _modalCauHinhSLA = new ModalService("modalCauHinhSLA");
var _modalCauHinhPhanCong = new ModalService("modalCauHinhPhanCong");
var _modalChonMaChiNhanh = new ModalDragService("modalChonMaChiNhanh", undefined, "bottom");
var _modalChonQuanHuyen = new ModalDragService("modalChonQuanHuyen", undefined, "bottom");
var _modalCHBenGDMD = new ModalService("modalCHBenGDMD");
var _modalCHBenGDMD_MQH = new ModalService("modalCHBenGDMD_MQH");
var _modalThemNgayApDung = new ModalService("modalThemNgayApDung");
var _modalLoaiXe = new ModalDragService("modalLoaiXe", undefined, "bottom");
var _modalGiamTruDkbs = new ModalDragService("modalGiamTruDkbs", undefined, "bottom");
var _modalLoaiHSGT = new ModalDragService("modalLoaiHSGT", undefined, "bottom");
var _modalCHPheDuyetGiaTuDong = new ModalService("modalCHPheDuyetGiaTuDong");
var _modalCHPheDuyetGiaTuDongNhapNgayAD = new ModalService("modalCHPheDuyetGiaTuDongNhapNgayAD");
var _modalCHPheDuyetGiaChonHangHieuXe = new ModalDragService("modalCHPheDuyetGiaChonHangHieuXe", undefined, "bottom");
var _modalCHPheDuyetGiaChonMDTT = new ModalDragService("modalCHPheDuyetGiaChonMDTT", undefined, "bottom");
var _modalHangMucTonThat = new ModalDragService("modalHangMucTonThat", undefined, "bottom");
var _modalThemNgayApDungGT = new ModalService("modalThemNgayApDungGT");
var _modalThemNgayApDungHSCT = new ModalService("modalThemNgayApDungHSCT");
var _modalThemCauHinhXuLyBoiThuong = new ModalService("modalThemCauHinhXuLyBoiThuong");
var _modalThemNgayApDungXLBT = new ModalService("modalThemNgayApDungXLBT");
// Xóa dòng dữ liệu khấu hao
function xoaKhauHao(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        $(el).parent().parent().remove();
    })
}
// Xóa dòng dữ liệu tính giảm trừ bảo hiểm
function xoaGiamTru(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        $(el).parent().parent().remove();
    })
}
// Xóa dòng dữ liệu tính giảm trừ xe máy bảo hiểm
function xoaGiamTruXM(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        $(el).parent().parent().remove();
    })
}
// Xóa dòng dữ liệu khấu hao loại xe
function xoaKhauHaoLoaiXe(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        $(el).parent().parent().remove();
    })
}
// Get data bảng phương pháp tính khấu hao
function getDataTableKH() {
    var otArr = [];
    $("#modalThemKhauHao tr.khau_hao").each(function (e) {
        var json = { tuoi_xe_tu: '', tuoi_xe_toi: '', tl_khau_hao: '', bt: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Get bảng phương pháp tính khấu hao loại xe
function getDataTableXe() {
    var otArr = [];
    $("#modalThemKhauHaoLoaiXe tr.khau_hao_loai_xe").each(function (e) {
        var json = { tuoi_xe_tu: '', tuoi_xe_toi: '', he_so_tl: '', bt: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Get data bảng phương pháp tính giảm trừ
function getDataTableGiamTru() {
    var otArrGt = [];
    $("#modalThemGiamTru tr").each(function (e) {
        var json = { tu_ngay: '', toi_ngay: '', tl_giam: '', };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        if (json.tu_ngay != '') {
            otArrGt.push(json);
        }
    });
    return otArrGt;
}
// Get data bảng phương pháp tính giảm trừ xe máy
function getDataTableGiamTruXM() {
    var otArrGt = [];
    $("#modalThemGiamTruXM tr").each(function (e) {
        var json = { tu_ngay: '', toi_ngay: '', tl_giam: '', };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr('data-val').replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr('data-val');
                }
            });
        });
        if (json.tu_ngay != '') {
            otArrGt.push(json);
        }
    });
    return otArrGt;
}
// Get data bảng giảm trừ điều khoản bổ sung
function getDataTableGiamTruDKBS() {
    var otArr = [];
    $("#modalThemGiamTruDKBS tr").each(function (e) {
        var json = { ma_dkbs: '', tl_giam: '', tien_giam: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        if (json.ma_dkbs != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
// Get data bảng giảm trừ điều khoản bổ sung xe máy
function getDataTableGiamTruDKBSXM() {
    var otArr = [];
    $("#modalThemGiamTruDKBSXM tr").each(function (e) {
        var json = { ma_dkbs: '', tl_giam: '', tien_giam: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).val();
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        if (json.ma_dkbs != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
// Get data bảng cấu hình bồi thường
function getDataTableCauHinhBoiThuong() {
    var otArr = [];
    $("#modalCauHinhBoiThuong tr.row-item").each(function (e) {
        var json = { ma: '', gia_tri: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } else if ($(this).hasClass("radio")) {
                    json[field] = $(this).is(":checked") == true ? 'S' : 'T';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Get data bảng cấu hình bồi thường xe máy
function getDataTableCauHinhBoiThuongXM() {
    var otArr = [];
    $("#modalCauHinhBoiThuongXM tr.row-item").each(function (e) {
        var json = { ma: '', gia_tri: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } else if ($(this).hasClass("radio")) {
                    json[field] = $(this).is(":checked") == true ? 'S' : 'T';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Get data bảng cấu hình KPI
function getDataTableKPI() {
    var otArr = [];
    $("#tblTienTrinhKPI tr.row_item").each(function (e) {
        var json = { name: '', value: '', ma: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                }
                else {
                    json[field] = $(this).val();
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Get data bảng cấu hình hồ sơ bồi thường
function getDataTableHS() {
    var otArr = [];
    $("#tblHoSo tr.row_item").each(function (e) {
        var json = { ma: '', loai: '', bat_buoc: '', ten_giay_to: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } else {
                    json[field] = $(this).val();
                }
            });
            $(this).find("a").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).attr("data-val").replace(/[^0-9]+/g, '');
                }
                else if ($(this).hasClass("combobox")) {
                    json[field] = $(this).attr("data-val");
                    if (json[field] == undefined) {
                        json[field] = "";
                    }
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
//Get data table bồi thường xe
function getDataTableBTXe() {
    var otArr = [];
    $("#tblCauHinhXeOto tr.row_item").each(function (e) {
        var json = { name: '', value: '', ma: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } else if ($(this).hasClass("radio")) {
                    json[field] = $(this).is(":checked") == true ? 'S' : 'T';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
// Lấy thông tin chi tiết phương pháp tính khấu hao
function getDetailKhauHao(ngay_ad) {
    if (_frmThemKhauHao.getControl('loai_xe').getValue() == '') {
        ESUtil.genHTML("modalThemKhauHao_template", "modalThemKhauHao", { ds_khau_hao: [] });
        if (ngay_ad != undefined) {
            _frmThemKhauHao.getControl('ngay_ad').val(ngay_ad);
            $('.item-ngay_ad').removeClass("text-danger");
            $("#ds_ngay_ad_kh_" + ngay_ad).addClass("text-danger");
            var objDsNgay = _frmThemKhauHao.getJsonData();
            objDsNgay.ngay_ad = ngay_ad;
            _carConfigurationService.layThongTinChiTiet(objDsNgay).then(res => {
                ESUtil.genHTML("modalThemKhauHao_template", "modalThemKhauHao", { ds_khau_hao: res.data_info.khau_hao });
            });
        } else {
            ESUtil.genHTML("modalThemKhauHao_template", "modalThemKhauHao", { ds_khau_hao: [] });
        }
    } else {
        ESUtil.genHTML("modalThemKhauHaoLoaiXe_template", "modalThemKhauHaoLoaiXe", { ds_khau_hao_loai_xe: [] });
        if (ngay_ad != undefined) {
            _frmThemKhauHao.getControl('ngay_ad').val(ngay_ad);
            $('.item-ngay_ad').removeClass("text-danger");
            $("#ds_ngay_ad_kh_" + ngay_ad).addClass("text-danger");
            var objDsNgay = _frmThemKhauHao.getJsonData();
            objDsNgay.ngay_ad = ngay_ad;
            objDsNgay.nv = nv;
            _carConfigurationService.layThongTinChiTiet(objDsNgay).then(res => {
                var ds_ngay_kh_lx = res.data_info.khau_hao_loai_xe.where(n => n.loai_xe == _frmThemKhauHao.getControl('loai_xe').getValue())
                ESUtil.genHTML("modalThemKhauHaoLoaiXe_template", "modalThemKhauHaoLoaiXe", { ds_khau_hao_loai_xe: ds_ngay_kh_lx });
            });
        } else {
            ESUtil.genHTML("modalThemKhauHaoLoaiXe_template", "modalThemKhauHaoLoaiXe", { ds_khau_hao_loai_xe: [] });
        }
    }
}
// Lấy thông tin chi tiết phương pháp tính giảm trừ
function getDetailReduce(ngay_ad) {
    ESUtil.genHTML("modalThemGiamTru_template", "modalThemGiamTru", { ds_giam_tru: [] });
    ESUtil.genHTML("modalThemGiamTruDKBS_template", "modalThemGiamTruDKBS", { ds_giam_tru_dkbs: [] });
    if (ngay_ad != undefined) {
        $("#tblDsNgayGiamTru a.nav-link").removeClass("active");
        $("#tblDsNgayGiamTru a[data_ngay_ad='" + ngay_ad + "']").addClass("active");
        if (nvGiamTru == 'XE') {
            var obj = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: ngay_ad,
                nv: nvGiamTru
            }
            _carConfigurationService.layThongTinChiTietGiamTru(obj).then(res => {
                ESUtil.genHTML("modalThemGiamTru_template", "modalThemGiamTru", { ds_giam_tru: res.data_info.giam_tru });
                ESUtil.genHTML("modalThemGiamTruDKBS_template", "modalThemGiamTruDKBS", { ds_giam_tru_dkbs: res.data_info.giam_tru_dkbs });
            });
        } else if (nvGiamTru == 'XE_MAY') {
            var obj = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: ngay_ad,
                nv: nvGiamTru
            }
            _carConfigurationService.layThongTinChiTietGiamTru(obj).then(res => {
                ESUtil.genHTML("modalThemGiamTruXM_template", "modalThemGiamTruXM", { ds_giam_tru: res.data_info.giam_tru });
                ESUtil.genHTML("modalThemGiamTruDKBSXM_template", "modalThemGiamTruDKBSXM", { ds_giam_tru_dkbs: res.data_info.giam_tru_dkbs });
            });
        }
    }
}
// Lấy thông tin chi tiết cấu hình chung xe ô tô
function getDetailCauHinhXe(ngay_ad) {
    ESUtil.genHTML("modalCauHinhXeOto_template", "modalCauHinhXeOto", { ds_xe_oto: [] });
    if (ngay_ad != undefined) {
        $('.item-ngay_ad').removeClass("text-danger");
        $("#ds_ngay_ad_ch_" + ngay_ad).addClass("text-danger");
        _frmThemCauHinhXeOto.getControl('ngay_ad').val(ngay_ad);
        var objDsNgay = _frmThemCauHinhXeOto.getJsonData();
        objDsNgay.ngay_ad = ngay_ad;
        _carConfigurationService.layThongTinChiTietCar(objDsNgay).then(res => {
            ESUtil.genHTML("modalCauHinhXeOto_template", "modalCauHinhXeOto", { ds_xe_oto: res.data_info.cau_hinh_lke });
        });
    }
}
//Lấy thông tin cấu hình bồi thường
function getDetailCompensation(ngay_ad) {
    ESUtil.genHTML("modalCauHinhBoiThuong_template", "modalCauHinhBoiThuong", { ds_boi_thuong: [] });
    ESUtil.genHTML("modalCauHinhBoiThuongXM_template", "modalCauHinhBoiThuongXM", { ds_boi_thuong: [] });
    if (ngay_ad != undefined && ngay_ad != null && ngay_ad.toString().trim() != "") {
        $("#tblDsNgayCHBT a.nav-link").removeClass("active");
        $("#tblDsNgayCHBT a[data_ngay_ad='" + ngay_ad + "']").addClass("active");
        if (nvCauHinhBT == 'XE') {
            var objDsNgay = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: ngay_ad,
                nv: nvCauHinhBT
            }
            _carConfigurationService.xemCauHinhBoiThuong(objDsNgay).then(res => {
                var data = res.data_info.tt_lke;
                if (data == null || data.length <= 0) {
                    ESUtil.genHTML("modalCauHinhBoiThuong_template", "modalCauHinhBoiThuong", { ds_boi_thuong: objCauHinh.tt_chung });
                    $(".modal-user-log").html("");
                }
                else {
                    ESUtil.genHTML("modalCauHinhBoiThuong_template", "modalCauHinhBoiThuong", { ds_boi_thuong: res.data_info.tt_lke });
                    $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
                }
            });
        } else if (nvCauHinhBT == 'XE_MAY') {
            var objDsNgay = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: ngay_ad,
                nv: nvCauHinhBT
            }
            _carConfigurationService.xemCauHinhBoiThuong(objDsNgay).then(res => {
                var data = res.data_info.tt_lke;
                if (data == null || data.length <= 0) {
                    ESUtil.genHTML("modalCauHinhBoiThuongXM_template", "modalCauHinhBoiThuongXM", { ds_boi_thuong: objCauHinh.tt_chung });
                    $(".modal-user-log").html("");
                }
                else {
                    ESUtil.genHTML("modalCauHinhBoiThuongXM_template", "modalCauHinhBoiThuongXM", { ds_boi_thuong: res.data_info.tt_lke });
                    $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
                }
            });
        }
    }
}
// Chọn DKBS
function chonDKBS(el) {
    if (nvGiamTru == 'XE') {
        var arr = getDataTableGiamTruDKBS();
        $("#modalDkbsDanhSach .dkbs").removeClass("d-none");
        $("#inputSearch_dkbs").focus();
        $("#inputSearch_dkbs").val();
        $("#modalDkbsDanhSach .modalDkbsItem").prop("checked", false);
        for (var i = 0; i < arr.length; i++) {
            $("#modalDkbsDanhSach .modalDkbsItem[value='" + arr[i].ma_dkbs + "']").prop("checked", true);
        }
        _modalGiamTruDkbs.show(el);
    } else if (nvGiamTru == 'XE_MAY') {
        var arr = getDataTableGiamTruDKBSXM();
        $("#modalDkbsDanhSach .dkbs").removeClass("d-none");
        $("#inputSearch_dkbs").focus();
        $("#inputSearch_dkbs").val();
        $("#modalDkbsDanhSach .modalDkbsItem").prop("checked", false);
        for (var i = 0; i < arr.length; i++) {
            $("#modalDkbsDanhSach .modalDkbsItem[value='" + arr[i].ma_dkbs + "']").prop("checked", true);
        }
        _modalGiamTruDkbs.show(el);
    }
    
}
function getCheckedGiamTruDKBS() {
    var arr_chon = [];
    $("#modalDkbsDanhSach .modalDkbsItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma_dkbs: $(this).val(),
                ten: objDanhMuc.dkbs.where(n => n.ma == $(this).val()).firstOrDefault().ten,
                tl_giam: '',
                tien_giam: ''
            };
            arr_chon.push(obj);
        }
    });
    return arr_chon;
    
}
function chonLoaiCauHinh(loai) {
    $(".modal-user-log").html("");
    $('.cau_hinh_xe').removeClass('card_active');
    if (loai == 'KH') {
        $('#khau_hao').addClass('card_active');
        _frmThemKhauHao.resetForm();
        _frmThemKhauHao.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        //_frmThemKhauHao.getControl("ma_doi_tac").trigger('select2:select');
        _frmThemKhauHao.getControl("loai_xe").trigger('select2:select');
        _frmThemKhauHao.getControl("ma_doi_tac").readOnly(false);
        _frmThemKhauHao.getControl("nv").setValue("XE");
        _frmThemKhauHao.getControl("nv").trigger("select2:select");
        $('#divInputThemNgayKH').hide();
        $('#divThemMoiNgayKH').show();
        _modalNhapKhauHao.show();
    } else if (loai == 'GT') {
        changeTabNvGiamTru('XE');
        $('#giam_tru').addClass('card_active');
        _modalNhapGiamTru.show();
    } else if (loai == 'CH') {
        $('#chung_oto').addClass('card_active');
        _frmThemCauHinhXeOto.resetForm();
        _frmThemCauHinhXeOto.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmThemCauHinhXeOto.getControl("ma_doi_tac").trigger('select2:select');
        _frmThemCauHinhXeOto.getControl("ma_doi_tac").readOnly(false);
        $('#divInputThemNgayCH').hide();
        $('#divThemMoiNgayCH').show();
        _modalCauHinhChungXeOto.show();
    } else if (loai == 'KPI') {
        $('#ch_kpi').addClass('card_active');
        _frmThemkpi.resetForm();
        _frmThemkpi.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmThemkpi.getControl("ma_doi_tac").trigger('select2:select');
        _frmThemkpi.getControl("ma_doi_tac").readOnly(false);
        _frmThemkpi.getControl("nv").setValue("XE");
        _frmThemkpi.getControl("nv").trigger('select2:select');
        _frmThemkpi.getControl("nv_ct").setValue("TN");
        _frmThemkpi.getControl("nv_ct").trigger('select2:select');
        $("#themMoiTien").setValue("");
        _modalThemCauHinhkpi.show();
    } else if (loai == "CH_BOI_THUONG") {
        $("#ch_boi_thuong").addClass('card_active');
        changeTabCauHinhBoiThuong('XE');
        _modalThemCauHinhBoiThuong.show();
    } else if (loai == "CH_HS") {
        $('#ch_ho_so').addClass('card_active');
        onChangeCauHinhHoSoGiayTo('XE');
        _modalThemCauHinhHoSo.show();
    }
    else if (loai == "CH_PHAN_CONG") {
        $('#ch_phan_cong').addClass('card_active');
        $("#inputTimKiemTinhThanh").val("");
        $("#inputTimKiemQuanHuyen").val("");
        $("#inputTimKiemDonViXuLy").val("");
        $("#modalCHDanhSachTinhThanh .item-provice").prop("checked", false);
        $("#modalCHDanhSachQuanHuyen .item-district").prop("checked", false);
        $("#modalCHDanhSachDonViXuLy .item-branch").prop("checked", false);
        bindTinhThanh();
        bindQuanHuyen([]);
        getPagingCauHinhPhanCong(1);
        $("#btnLuuCauHinh").addClass('d-none');
        $("#btnXemDanhSach").addClass('d-none');
        $("#btnThemMoiPhanCong").removeClass('d-none');
        $(".tabCauHinhPhanCongTheoDiaBan").addClass('d-none');
        $(".tabDanhSachCauHinh").removeClass('d-none');
        _modalCauHinhPhanCong.show();
    } else if (loai == "CH_SLA") {
        $('#ch_sla').addClass('card_active');
        _frmCauHinhSLA.resetForm();
        _frmCauHinhSLA.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmCauHinhSLA.getControl("ma_doi_tac").trigger('select2:select');
        _frmCauHinhSLA.getControl("nv").setValue("XE");
        _frmCauHinhSLA.getControl("nv").trigger('select2:select');
        $("#ngayad_sla").val(dateNow);
        $('#divInputThemNgayCHSLA').hide();
        $('#divThemMoiNgayCHSLA').show();
        _modalCauHinhSLA.show();
    }
    else if (loai == "CH_DUYET_GIA_TU_DONG") {
        _carConfigurationService.layDsNgayADDuyetGiaTuDong().then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            ESUtil.genHTML("modalCHPheDuyetGiaTuDongNgayADTemplate", "modalCHPheDuyetGiaTuDongNgayAD", { data: res.data_info }, () => {
                if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                    $("#modalCHPheDuyetGiaTuDongNgayAD a.nav-link").removeClass("active");
                    $("#modalCHPheDuyetGiaTuDongNgayAD a[data_ngay_ad='" + res.data_info[0].ngay_ad + "']").addClass("active");
                    layChiTietCHDuyetGiaTuDong(res.data_info[0].ngay_ad);
                }
            });
            hienThiTabCHDuyetGia("tabCHDonViGaraHangXeHieuXe");
            _modalCHPheDuyetGiaTuDong.show();
        });
    }
    else if (loai == "CH_CH_BEN_GDMD") {
        $('#ch_ben_tham_gia_gdinh_mac_dinh').addClass('card_active');
        _navCauHinhBenGDMD.showTab("tabCauHinhBenGDMDXeOTo");
        layCauHinhBenThamGiaGiamDinh("XE");
        _modalCHBenGDMD.show();
    }
    else if (loai == "CH_XU_LY_BT") {
        $('#ch_xu_ly_bt').addClass('card_active');
        var ma_chi_nhanh = _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").val();
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            nv: "XE"
        }
        _carConfigurationService.lietKeCauHinhXyLyBoiThuong(obj).then(res => {
            objCauHinh = res.data_info;
            ESUtil.genHTML("tblDsNgayCauHinhXLBT_template", "tblDsNgayCauHinhXLBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                if (res.data_info.ds_ngay.length > 0) {
                    $("#tblDsNgayCauHinhXLBT a.nav-link").removeClass("active");
                    $("#tblDsNgayCauHinhXLBT a[data_ngay_ad='" + res.data_info.ds_ngay[0].ngay_ad + "']").addClass("active");
                    getDetailCauHinhXuLy(res.data_info.ds_ngay[0].ngay_ad, ma_chi_nhanh, "XE");
                }
            });
        });
        _modalThemCauHinhXuLyBoiThuong.show();
        _navCauHinhXuLy.showTab("tabCauHinhXeOTo");
    }
}
function chonHSBatBuoc(el) {
    var ma = $(el).find("input[data-field='bat_buoc']").is(":checked") == true ? 1 : 0;
    if (ma == 0) {
        $(el).closest('tr').find("a[data-field='loai']").attr("data-val", "");
        $(el).closest('tr').find("a[data-field='loai']").html("Chọn loại hồ sơ");
    }
}
function chonLoaiHSGT(el) {
    var val = $(el).attr("data-val");
    $(el).blur();
    $("#modalLoaiHSGTDanhSach .dscb").removeClass("d-none");
    $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem").prop("checked", false);
    if (val != undefined && val != null && val != "") {
        $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem[value='" + val + "']").prop("checked", true);
    }
    _modalLoaiHSGT.show(el);
}
function onChangeCauHinhHoSoGiayTo(nv) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        nv: nv
    }
    _carConfigurationService.xemCauHinhHoSo(obj).then(res => {
        var data = res.data_info.ds_ngay;
        objCauHinh.ds_ngay = data;
        ESUtil.genHTML("tblDsNgayCauHinhHoSoCT_template", "tblDsNgayHoSo", { ds_ngay_ad: data }, () => {
            if (data.length > 0) {
                getListBuoc(res.data_info.ds_ngay[0].ngay_ad);
            } else {
                setDataDefaultHoSo();
            }
        });
    });
}
function getListBuoc(ngay_ad, callback = undefined) {
    if (ngay_ad != undefined && ngay_ad != null) {
        ESUtil.genHTML("modalLoaiHSGTTemplate", "modalLoaiHSGTDanhSach", { danh_sach: arrLoaiHSGT }, () => {
            $("#modalLoaiHSGTDanhSach .single_checked").click(function () {
                $("#modalLoaiHSGTDanhSach .single_checked").prop("checked", false);
                $(this).prop("checked", true);
            });
        });
    }
    $("#tblDsNgayHoSo a.nav-link").removeClass("active");
    $("#tblDsNgayHoSo a[data_ngay_ad='" + ngay_ad + "']").addClass("active");

    if (ngay_ad != null && ngay_ad != undefined) {
        ESUtil.genHTML("tblCacBuocCauHinhHoSoCT_template", "tblDsCacBuoc", { ds_buoc: arrHoSo }, () => {
            getDetailHoSoGiayTo(arrHoSo[0].ma);
        });
    } else {
        setDataDefaultHoSo();
    }
    if (callback) {
        callback();
    }
}
function setDataDefaultHoSo() {
    ESUtil.genHTML("tblCacBuocCauHinhHoSoCT_template", "tblDsCacBuoc", { ds_buoc: [] });
    ESUtil.genHTML("tblDanhSachHoSo_template", "tblHoSo", { ds_ho_so: [] });
    ESUtil.genHTML("tblDsNgayCauHinhHoSoCT_template", "tblDsNgayHoSo", { ds_ngay_ad: [] });
}
function getDetailHoSoGiayTo(buoc, callback = undefined) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        nv: $("#navCauHinhHoSoChungTu a.active").attr('data-val'),
        ngay_ad: $("#tblDsNgayHoSo a.active").attr('data-ngay'),
        buoc: buoc
    }
    $("#tblDsCacBuoc a.nav-link").removeClass("active");
    $("#tblDsCacBuoc a[data_buoc='" + buoc + "']").addClass("active");
    _carConfigurationService.xemCauHinhHoSo(obj).then(res => {
        var arrHoSo = res.data_info.ds_ho_so;
        var arrHoSoChiTiet = res.data_info.lke_ct;
        $(".modal-user-log").html("");
        if (arrHoSoChiTiet.length > 0) {
            $(".modal-user-log").html("(" + arrHoSoChiTiet[0].nsd + " - " + arrHoSoChiTiet[0].ngay + ")");
        }
        var arrTongHop = [];

        $.each(arrHoSo, function (index, item) {
            $.each(arrHoSoChiTiet, function (index1, item1) {
                if (item.ma == item1.ma) {
                    var obj = {
                        buoc: item1.buoc,
                        bat_buoc: item1.bat_buoc,
                        loai: item1.loai,
                        ma: item1.ma,
                        ma_doi_tac: item1.ma_doi_tac,
                        ngay_ad: item1.ngay_ad,
                        ngay_ad_hthi: item1.ngay_ad_hthi,
                        nv: item1.nv,
                        ten_giay_to: item1.ten_giay_to,
                        ten_loai_giay_to: item1.ten_loai_giay_to
                    }
                    arrTongHop.push(obj);
                    arrHoSo = arrHoSo.filter(n => n != item);
                }
            });
        });
        arrTongHop = arrTongHop.concat(arrHoSo);
        ESUtil.genHTML("tblDanhSachHoSo_template", "tblHoSo", { ds_ho_so: arrTongHop });
    });
    if (callback) {
        callback();
    }
}
function setDefaultData() {
    ESUtil.genHTML("tblDsNgayKPI_template", "tblDsNgay", { ds_ngay_ad: [] });
    ESUtil.genHTML("tblDsTienKPI_template", "tblDsTien", { ds_tien: [] });
    ESUtil.genHTML("tblTienTrinhKPI_template", "tblTienTrinhKPI", { danh_sach_kpi: [] });
}
function getListNgay(ma_doi_tac, nv, nv_ct) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        nv: nv,
        nv_ct: nv_ct
    }
    _carConfigurationService.xemThongTinChiTietNgayTien(obj).then(res => {
        var data = res.data_info.ngay_ad;
        ESUtil.genHTML("tblDsNgayKPI_template", "tblDsNgay", { ds_ngay_ad: data }, () => {
            if (data.length > 0) {
                getListTien(res.data_info.ngay_ad.firstOrDefault().ngay_ad);
            } else {
                setDefaultData();
            }
        });
    });
}
function getListTien(ngay_ad, callback = undefined) {
    var obj = _frmThemkpi.getJsonData();
    obj.ngay_ad = ngay_ad;
    $('.item-ngay_ad').removeClass("text-danger");
    $('.item-ngay_ad').removeClass("active");
    $("#ds_ngay_ad_" + ngay_ad).addClass("text-danger");
    $("#ds_ngay_ad_" + ngay_ad).addClass("active");
    _carConfigurationService.xemThongTinChiTietNgayTien(obj).then(res => {
        ESUtil.genHTML("tblDsTienKPI_template", "tblDsTien", { ds_tien: res.data_info.so_tien }, () => {
            if (res.data_info.so_tien.length > 0) {
                getDataDetail(ngay_ad, res.data_info.so_tien.firstOrDefault().tien);
            } else {
                ESUtil.genHTML("tblTienTrinhKPI_template", "tblTienTrinhKPI", { danh_sach_kpi: [] });
            }
        });
    });
    if (callback) {
        callback();
    }
}
function getDataDetail(ngay_ad, tien, callback = undefined) {
    var obj = _frmThemkpi.getJsonData();
    obj.ngay_ad = ngay_ad;
    obj.tien = tien;
    $('.item-tien').removeClass("text-danger");
    $('.item-tien').removeClass("active");
    $("#ds_tien_" + tien).addClass("text-danger");
    $("#ds_tien_" + tien).addClass("active");
    _carConfigurationService.layThongTinChiTietKPI(obj).then(res => {
        if (res.data_info.lke_ct.length > 0 && res.data_info.lke_ct != null) {
            ESUtil.genHTML("tblTienTrinhKPI_template", "tblTienTrinhKPI", { danh_sach_kpi: res.data_info.lke_ct });
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
    if (callback) {
        callback();
    }
}
function onChangeCaiDat(ma) {
    if (ma == "GDVTT_BTV") {
        var checked = $("#checkbox_bt_" + ma).is(":checked");
        if (checked) {
            $("#checkbox_bt_" + ma).prop("checked", false);
            _notifyService.confirm("Hệ thống sẽ tự động gán quyền GĐVTT và quyền bồi thường viên cho các cán bộ đang sử dụng một trong hai quyền trên.", "", val => {
                $("#checkbox_bt_" + ma).prop("checked", true);
            });
        }
    }
}
//huynq 2022
function layCauHinhBenThamGiaGiamDinh(nv) {
    ESUtil.genHTML("tblCHBenGDMD_template", "tblCHBenGDMDXe", { data: [] });
    ESUtil.genHTML("tblCHBenGDMD_template", "tblCHBenGDMDXeMay", { data: [] });
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        nv: nv
    }
    _carConfigurationService.lietKeThongTinCHBenGDMD(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (obj.nv === "XE") {
            ESUtil.genHTML("tblCHBenGDMD_template", "tblCHBenGDMDXe", { data: res.data_info });
        }
        if (obj.nv === "XE_MAY") {
            ESUtil.genHTML("tblCHBenGDMD_template", "tblCHBenGDMDXeMay", { data: res.data_info });
        }
    });
}
function openModalGDMD_MQH(doi_tuong, mac_dinh, ma_moi_qhe, nv ) {
    var obj = {
        doi_tuong: doi_tuong,
        ma_doi_tac: ESCS_MA_DOI_TAC,
        ma_moi_qhe: ma_moi_qhe,
        mac_dinh: mac_dinh,
        nv: nv
    }
    _frmCHBenGDMD_MQH.clearErrorMessage();
    _frmCHBenGDMD_MQH.setData(obj);
    _frmCHBenGDMD_MQH.getControl("ma_moi_qhe").setDataSource(objDanhMuc.moi_qhe, "ten", "ma");
    _frmCHBenGDMD_MQH.getControl("ma_moi_qhe").setValue(ma_moi_qhe);
    _modalCHBenGDMD_MQH.show();
}
function onChangeCHBenGDMD(doi_tuong, ma_moi_qhe, nv) {
    var checked = $("#checkbox_bt_" + doi_tuong + "_"+nv).is(":checked");
    $("#checkbox_bt_" + doi_tuong + "_"+ nv).prop("checked", checked);
    let input = {
        doi_tuong: doi_tuong,
        ma_doi_tac: ESCS_MA_DOI_TAC,
        mac_dinh: checked ? 'C' : 'K',
        ma_moi_qhe: ma_moi_qhe,
        nv: nv
    };
    _carConfigurationService.luuThongTinCHBenGDMD(input).then(res => {
        if (res.state_info.status === "OK") {
            _notifyService.success("Lưu thông tin cấu hình thành công.");
            layCauHinhBenThamGiaGiamDinh(nv);
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
}
//Cấu hình phân công theo địa bàn
function onChangeTinhThanh() {
    $("#inputTimKiemQuanHuyen").val("");
    arrTinh = [];
    $('.item-provice').each(function () {
        if (this.checked) {
            arrTinh.push($(this).val())
        }
    });
    arrQuanHuyen = [];
    $('.item-district').each(function () {
        if (this.checked) {
            arrQuanHuyen.push($(this).val())
        }
    });
    bindQuanHuyen(arrTinh, arrQuanHuyen);
}
function onChangeQuanHuyen() {
    var count = $('.item-district').length;
    var fill = $('.item-district:checked').length;
    $("#quan_huyen_tat_ca").prop("checked", count === fill);
    arrQuanHuyen = [];
    $('.item-district').each(function () {
        if (this.checked) {
            arrQuanHuyen.push($(this).val())
        }
    });
}
function bindTinhThanh(arr_checked = []) {
    var arrTinhThanh = objDanhMuc.don_vi_hanh_chinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "");
    for (var i = 0; i < arrTinhThanh.length; i++) {
        arrTinhThanh[i].chon = false;
    }
    if (arr_checked !== undefined && arr_checked.length > 0) {
        for (var i = 0; i < arr_checked.length; i++) {
            for (var j = 0; j < arrTinhThanh.length; j++) {
                if (arr_checked[i] === arrTinhThanh[j].ma_tinh) {
                    arrTinhThanh[j].chon = true;
                    continue;
                }
            }
        }
    }
    $("#modalCHDanhSachTinhThanh").html("");
    ESUtil.genHTML("modalCHDanhSachTinhThanhTemplate", "modalCHDanhSachTinhThanh", { danh_sach: arrTinhThanh });
}
function bindQuanHuyen(arr_ma_tinh, arr_checked = []) {
    var quan_huyen = [];
    for (var i = 0; i < arr_ma_tinh.length; i++) {
        ma_tinh = arr_ma_tinh[i];
        var tmp = objDanhMuc.don_vi_hanh_chinh.where(n => n.ma_phuong.trim() === "" && n.ma_quan.trim() !== "" && n.ma_tinh.trim() === ma_tinh);
        for (var j = 0; j < tmp.length; j++) {
            tmp[j].chon = false;
        }
        Array.prototype.push.apply(quan_huyen, tmp);
    }
    if (arr_checked !== undefined && arr_checked !== null && arr_checked.length > 0) {
        for (var j = 0; j < quan_huyen.length; j++) {
            quan_huyen[j].chon = false;
            var count = arr_checked.where(n => n === quan_huyen[j].ma_quan).length;
            if (count > 0) {
                quan_huyen[j].chon = true;
            }
        }
    }
    quan_huyen.sort(function (a, b) {
        if (a.ma_tinh < b.ma_tinh) return -1;
        if (a.ma_tinh > b.ma_tinh) return 1;
        return 0;
    });
    $("#modalCHDanhSachQuanHuyen").html("");
    ESUtil.genHTML("modalCHDanhSachQuanHuyenTemplate", "modalCHDanhSachQuanHuyen", { danh_sach: quan_huyen });
}
function bindChiNhanh(arr_checked = []) {
    var arrChiNhanh = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
    for (var i = 0; i < arrChiNhanh.length; i++) {
        arrChiNhanh[i].chon = false;
    }
    if (arr_checked !== undefined && arr_checked.length > 0) {
        for (var i = 0; i < arr_checked.length; i++) {
            for (var j = 0; j < arrChiNhanh.length; j++) {
                if (arr_checked[i] === arrChiNhanh[j].ma) {
                    arrChiNhanh[j].chon = true;
                    continue;
                }
            }
        }
    }
    $("#modalCHDanhSachDonViXuLy").html("");
    ESUtil.genHTML("modalCHDanhSachDonViXuLyTemplate", "modalCHDanhSachDonViXuLy", { danh_sach: arrChiNhanh }, () => {
        $("#modalCHDanhSachDonViXuLy .single_checked").click(function () {
            var single_checked = $(this).is(":checked");
            $("#modalCHDanhSachDonViXuLy .single_checked").prop("checked", false);
            $(this).prop("checked", single_checked);
        });
    });
}
function chonTatCaTinhThanh(el) {
    $(".item-provice").prop("checked", $(el).is(":checked"));
    var tinhThanh = [];
    if ($(el).is(":checked")) {
        tinhThanh = objDanhMuc.don_vi_hanh_chinh.where(n => n.ma_quan.trim() === "" && n.ma_phuong.trim() === "").select(n => n.ma_tinh);
    }
    bindQuanHuyen(tinhThanh);
}
function chonTatCaQuanHuyen(el) {
    $(".item-district").prop("checked", $(el).is(":checked"));
}
function layDanhSachTinhThanhCauHinh() {
    var arr = [];
    $("#modalCHDanhSachTinhThanh .divItemTinhThanh input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).val());
    });
    return arr;
}
function layDanhSachQuanHuyenCauHinh() {
    var arr = [];
    $("#modalCHDanhSachQuanHuyen .divItemQuanHuyen input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).val());
    });
    return arr;
}
function layDanhSachDviXulyCauHinh() {
    var arr = [];
    $("#modalCHDanhSachDonViXuLy .divItemDonViXuLy input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).val());
    });
    return arr;
}
function getPagingCauHinhPhanCong(trang, callback = undefined) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        so_dong: 14
    }
    obj.trang = trang;
    _carConfigurationService.lietKeThongTinPhanCongDiaBan(obj).then(res => {
        var data = res.data_info.data;
        if (data.length > 0) {
            $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
        }
        ESUtil.genHTML("tblDanhSachCauHinhPhanCong_template", "tblDanhSachCauHinhPhanCong", { data: data });
        $("#tblDanhSachCauHinhPhanCong_pagination").html(ESUtil.pagingHTML("getPagingCauHinhPhanCong", obj.trang, res.data_info.tong_so_dong, obj.so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function xoaThongTinCauHinh(ma_doi_tac, ma_tinh, nv) {
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_tinh: ma_tinh,
        nv: nv
    }
    _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
        _carConfigurationService.xoaThongTinPhanCongDiaBan(obj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Xóa thông tin thành công");
                getPagingCauHinhPhanCong(1);
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
}
function suaThongTinCauHinh(ma_doi_tac, ma_tinh, nv) {
    $("#navCauHinhPhanCongDiaBanGD li a").removeClass("active");
    var obj = {
        ma_doi_tac: ma_doi_tac,
        ma_tinh: ma_tinh,
        nv: nv
    }
    _carConfigurationService.layThongTinChiTietPhanCongDiaBan(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        arrTinh = [];
        for (var i = 0; i < res.data_info.tinh_thanh.length; i++) {
            arrTinh.push(res.data_info.tinh_thanh[i].ma_tinh);
        }
        arrQuanHuyen = [];
        for (var j = 0; j < res.data_info.quan_huyen.length; j++) {
            arrQuanHuyen.push(res.data_info.quan_huyen[j].ma_quan);
        }
        arrChiNhanh = [];
        for (var j = 0; j < res.data_info.chi_nhanh.length; j++) {
            arrChiNhanh.push(res.data_info.chi_nhanh[j].ma);
        }
        bindChiNhanh(arrChiNhanh);
        bindTinhThanh(arrTinh);
        bindQuanHuyen(arrTinh, arrQuanHuyen);
        if (nv == "XE") {
            $("#tabCauHinhPhanCongDiaBanGDXeOTo").addClass("active");
        }
        if (nv == "XE_MAY") {
            $("#tabCauHinhPhanCongDiaBanGDXeMay").addClass("active");
        }
        $("#btnLuuCauHinh").removeClass('d-none');
        $("#btnXemDanhSach").removeClass('d-none');
        $("#btnThemMoiPhanCong").addClass('d-none');
        $(".tabCauHinhPhanCongTheoDiaBan").removeClass('d-none');
        $(".tabDanhSachCauHinh").addClass('d-none');
    });
}
//--------------------Code SLA-----------------------
function getDetailCauHinhSLA(ngay_ad) {
    ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: [] });
    if (ngay_ad != undefined && ngay_ad != null && ngay_ad.toString().trim() != "") {
        $('.item-ngay_ad').removeClass("text-danger");
        $('.item-ngay_ad').removeClass("active");
        $("#ds_ngay_ad_sla_" + ngay_ad).addClass("text-danger");
        $("#ds_ngay_ad_sla_" + ngay_ad).addClass("active");

        var so_id = $("#tblDsNgayCauHinhSLA tr.active").attr('data-so-id');
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            so_id: so_id
        }
        _carConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
            var data = res.data_info.ttin_ctiet;
            if (data.length > 0) {
                ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: data });
            }
            else {
                ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: arrCloneSLA });
            }
        });
    }
}
function getDataTableCauHinhSLA() {
    var otArr = [];
    $("#tblCauHinhSLA tr.row_item").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                } else if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function addRowSLA(el) {
    var ten = $(el).closest('tr.row_item').find("span").html();
    var tien_tu = $(el).closest('tr.row_item').find("input[data-field='tien_tu']").val();
    var tien_toi = $(el).closest('tr.row_item').find("input[data-field='tien_toi']").val();
    arrCloneSLA = getDataTableCauHinhSLA();
    if (tien_tu == 0 && tien_toi == 0) {
        _notifyService.error("Bạn chưa nhập tiền từ, tiền tới");
        return;
    } else {
        _notifyService.confirmHTML('Bạn có chắc muốn thêm bước thực hiện <b class="font-weight-bold">' + ten + '</b> này không?', "", val => {
            var obj = {};
            obj.stt = $(el).closest('tr.row_item').find('input[data-field="stt"]').attr('data-val');
            obj.ma = $(el).closest('tr.row_item').find('input[data-field="ma"]').attr('data-val');
            obj.buoc_thuc_hien = $(el).closest('tr.row_item').find('input[data-field="buoc_thuc_hien"]').attr('data-val');
            obj.tien_tu = 0;
            obj.tien_toi = 0;
            obj.tgian = 0;
            obj.tgian_noti = 0;
            obj.tgian_hanh_chinh = "K";
            arrCloneSLA.push(obj);
            arrCloneSLA.sort((a, b) => a.stt - b.stt);
            ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: arrCloneSLA });
        });
    }
}
function removeRowSLA(el) {
    var ten = $(el).closest('tr.row_item').find("span").html();
    _notifyService.confirmHTML('Bạn có chắc muốn xóa bước thực hiện <b class="font-weight-bold">' + ten + '</b> này không?', "", val => {
        $(el).closest("tr").remove();
        _notifyService.success("Xóa bước thực hiện thành công");
    });
}
//--------------------Cấu hình ngày nghỉ lễ-----------------------
function getDetailCauHinhNgayNghi(ten) {
    ESUtil.genHTML("modalCauHinhNgayNghi_template", "modalCauHinhNgayNghi", { ds_ngay_nghi: [] });
}
//Cấu hình duyệt giá tự động
function hienThiTabCHDuyetGia(tab) {
    $("#tabCHDonViGaraHangXeHieuXeMenu").removeClass("active");
    $("#tabCHHangMucMucDoGiaMenu").removeClass("active");
    $(".tabCHDonViGaraHangXeHieuXe").addClass("d-none");
    $(".tabCHHangMucMucDoGia").addClass("d-none");
    $(".tabCHSoTienToiDa").addClass("d-none");
    $("#" + tab + "Menu").addClass("active");
    $("." + tab).removeClass("d-none");
    if (tab == "tabCHHangMucMucDoGia") {
        $("#modalCHPheDuyetGiaTuDongDsDaCauHinh_Them").trigger("click");
        layDSHangMucCHDGNhap();
    }
}
function layChiTietCHDuyetGiaTuDong(ngay_ad) {
    $("#modalCHPheDuyetGiaTuDongNgayAD a.nav-link").removeClass("active");
    $("#modalCHPheDuyetGiaTuDongNgayAD a[data_ngay_ad='" + ngay_ad + "']").addClass("active");
    hienThiTabCHDuyetGia('tabCHDonViGaraHangXeHieuXe');
    $("#chdg_arr_hang_xe").val("");
    $("#chdg_arr_hieu_xe").val("");
    $("#chdg_arr_muc_do_tt").val("");
    $("#chdg_arr_hang_muc").val("");
    $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem input[type='checkbox']").prop("checked", false);
    $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem input[type='text']").val("0");
    _carConfigurationService.layChiTietCHDuyetGiaTuDong({ ngay_ad: ngay_ad }).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        for (var i = 0; i < res.data_info.dvi.length; i++) {
            $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem input[type='checkbox'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").prop("checked", true);
            $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem input[type='text'][data_ma_dvi='" + res.data_info.dvi[i].ma_chi_nhanh + "']").val(ESUtil.formatMoney(res.data_info.dvi[i].so_tien));
        }
        for (var i = 0; i < res.data_info.gara.length; i++) {
            $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem input[type='checkbox'][data_ma_gara='" + res.data_info.gara[i].ma_gara + "']").prop("checked", true);
        }
        for (var i = 0; i < res.data_info.hieu_xe.length; i++) {
            $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem input[type='checkbox'][data_hang_xe='" + res.data_info.hieu_xe[i].hang_xe + "'][data_hieu_xe='" + res.data_info.hieu_xe[i].hieu_xe + "']").prop("checked", true);
        }
    });
}
function layDviCHDuyetGia() {
    var arr = [];
    $("#modalCHPheDuyetGiaTuDongDviAD div.modalCHPheDuyetGiaTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_ma_dvi"));
    });
    return arr;
}
function layDviSoTienCHDuyetGia() {
    var arr = [];
    $("#modalCHPheDuyetGiaTuDongDviAD div.modalCHPheDuyetGiaTuDongDviADItem input[type='checkbox']:checked").each(function (i, el) {
        var ma_dvi = $(el).attr("data_ma_dvi");
        var so_tien = $("#modalCHPheDuyetGiaTuDongDviAD div.modalCHPheDuyetGiaTuDongDviADItem input[type='text'][data_ma_dvi='" + ma_dvi + "']").val();
        if (so_tien == undefined || so_tien == null) {
            so_tien = "0";
        }
        so_tien = parseFloat(so_tien.replace(/[^0-9]+/g, ''))
        arr.push(so_tien);
    });
    return arr;
}
function layGaraCHDuyetGia() {
    var arr = [];
    $("#modalCHPheDuyetGiaTuDongGaraAD div.modalCHPheDuyetGiaTuDongGaraItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_ma_gara"));
    });
    return arr;
}
function layHangXeCHDuyetGia() {
    var arr = [];
    $("#modalCHPheDuyetGiaTuDongHangHieuXeAD div.modalCHPheDuyetGiaTuDongHangHieuXeItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_hang_xe"));
    });
    return arr;
}
function layHieuXeCHDuyetGia() {
    var arr = [];
    $("#modalCHPheDuyetGiaTuDongHangHieuXeAD div.modalCHPheDuyetGiaTuDongHangHieuXeItem input[type='checkbox']:checked").each(function (i, el) {
        arr.push($(el).attr("data_hieu_xe"));
    });
    return arr;
}
function chonTatCaDviCHDuyetGia(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem input[type='checkbox']").prop("checked", checked);
}
function chonTatCaGaraCHDuyetGia(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem input[type='checkbox']").prop("checked", checked);
}
function chonTatCaHangHieuXeCHDuyetGia(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem input[type='checkbox']").prop("checked", checked);
}
function onChkHienThiGaraAD(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetGiaTuDongGaraADTkiem").val("");
    if (!checked) {
        $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem").removeClass("d-none");
        return;
    }
    $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem").addClass("d-none");
    $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem input[type='checkbox']:checked").parent().parent().removeClass("d-none");
}
function onChkHienThiHangHieuXeAD(el) {
    var checked = $(el).is(":checked");
    $("#modalCHPheDuyetGiaTuDongHangHieuXeADTkiem").val("");
    if (!checked) {
        $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem").removeClass("d-none");
        return;
    }
    $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem").addClass("d-none");
    $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem input[type='checkbox']:checked").parent().parent().removeClass("d-none");
}
function onFocus(el) {
    $(el).focus();
}
function onClickCHDGChonHangHieuXe(el, placement = "bottom") {
    var ngay_ad = $("#modalCHPheDuyetGiaTuDongNgayAD a.active").attr("data_ngay_ad");
    _carConfigurationService.layHangHieuXeCHDG({ ngay_ad: ngay_ad }).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var hang_xe = $("#chdg_arr_hang_xe").val();
        var hieu_xe = $("#chdg_arr_hieu_xe").val();
        var arr_hang_xe = hang_xe.split(";");
        var arr_hieu_xe = hieu_xe.split(";");

        ESUtil.genHTML("modalCHPheDuyetGiaChonHangHieuXeContentTemplate", "modalCHPheDuyetGiaChonHangHieuXeContent", { danh_sach: res.data_info }, () => {
            for (var i = 0; i < arr_hang_xe.length; i++) {
                $("#modalCHPheDuyetGiaChonHangHieuXeContent input[type='checkbox'][data_hang_xe='" + arr_hang_xe[i] + "'][data_hieu_xe='" + arr_hieu_xe[i] + "']").prop("checked", true);
            }
        });
        _modalCHPheDuyetGiaChonHangHieuXe.setPlacement(placement);
        _modalCHPheDuyetGiaChonHangHieuXe.show(el);
    });
}
function onClickCHDGChonMDTT(el, placement = "bottom") {
    var muc_do_tt = $("#chdg_arr_muc_do_tt").val();
    var arr_muc_do_tt = muc_do_tt.split(";");
    ESUtil.genHTML("modalCHPheDuyetGiaChonMDTTContentTemplate", "modalCHPheDuyetGiaChonMDTTContent", { danh_sach: objDanhMuc.muc_do_tt.where(n => n.nhom == "XE" && n.nv == "TN") }, () => {
        for (var i = 0; i < arr_muc_do_tt.length; i++) {
            $("#modalCHPheDuyetGiaChonMDTTContent input[type='checkbox'][value='" + arr_muc_do_tt[i] + "']").prop("checked", true);
        }
    });
    _modalCHPheDuyetGiaChonMDTT.setPlacement(placement);
    _modalCHPheDuyetGiaChonMDTT.show(el);
}
function onClickCHDGChonHangMuc(el, placement = "bottom") {
    $("#inputTimKiemHangMuc").val("");
    $("#dsHangMuc .modalDanhSachHangMucItem").prop("checked", false);
    getPagingHangMuc(1);
    _modalHangMucTonThat.show(el);
    $("#inputTimKiemHangMuc").focus();
}
function getPagingHangMuc(trang) {
    var data = objDanhMuc.hang_muc_xe;
    var arrTmp = [];
    var so_dong = 20;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;

    var tim = $("#inputTimKiemHangMuc").val();
    var textSearch = "%" + tim.replace(/ /g, '%') + "%";
    for (var i = 0; i < data.length; i++) {
        var check = data[i].ten.toUpperCase().like(textSearch.toUpperCase());
        if (check) {
            var objSearch = data[i];
            var arrKyTu = tim.toUpperCase().split(' ').where(n => n != " ");
            objSearch.orderTmp = [];
            for (var j = 0; j < arrKyTu.length; j++) {
                objSearch.orderTmp.push(data[i].ten.toUpperCase().indexLike(arrKyTu[j].toUpperCase()));
            }
            arrTmp.push(objSearch);
        }
    }
    var tong_so_dong = arrTmp.length;
    arrTmp = arrTmp.where((item, i) => i >= dau && i <= cuoi - 1);
    arrTmp.sort(compareAutoCompleteHangMuc);
    if (arrTmp != null && arrTmp.length > 0) {
        ESUtil.genHTML("dsHangMucTemplate", "dsHangMuc", { data: arrTmp }, () => {
            var ma = $("#chdg_arr_hang_muc").val();
            var arr_ma = ma.split(";").where(n => n != "");
            for (var i = 0; i < arr_ma.length; i++) {
                $("#dsHangMuc .modalDanhSachHangMucItem[value='" + arr_ma[i] + "']").prop("checked", true);
            }
        });
    }
    $("#dsHangMuc_pagination").html(ESUtil.pagingHTML("getPagingHangMuc", trang, tong_so_dong, so_dong));
    $("#inputTimKiemHangMuc").focus();
}
function compareAutoCompleteHangMuc(a, b) {
    var count = a.orderTmp.length;
    var bang_tat_ca = 0;
    for (var i = 0; i < count; i++) {
        if ((a.orderTmp[i] - b.orderTmp[i]) > 0) {
            return 1
        }
        if (a.orderTmp[i] == b.orderTmp[i]) {
            bang_tat_ca = bang_tat_ca + 1;
        }
        if ((a.orderTmp[i] - b.orderTmp[i]) < 0) {
            return -1
        }
    }
    if (bang_tat_ca == count) {
        return 0;
    }
    return 1;
}
function onChonHangMuc(el) {
    var hang_muc = $("#chdg_arr_hang_muc").val();
    var arr_hang_muc = hang_muc.split(";");
    arr_hang_muc = arr_hang_muc.where(n => n != "");
    var hang_muc = $(el).val();
    arr_hang_muc = arr_hang_muc.removeItem(n => n == hang_muc);
    if ($(el).is(":checked")) {
        arr_hang_muc.push(hang_muc);
    }
    hang_muc = "";
    for (var i = 0; i < arr_hang_muc.length; i++) {
        if (i == 0) {
            hang_muc = arr_hang_muc[i];
        }
        else {
            hang_muc += ";" + arr_hang_muc[i];
        }
    }
    $("#chdg_arr_hang_muc").val(hang_muc);
}
function layDSHangMucCHDGNhap() {
    var ngay_ad = $("#modalCHPheDuyetGiaTuDongNgayAD a.active").attr("data_ngay_ad");
    var arr_hang_xe = $("#chdg_arr_hang_xe").val();
    var arr_hieu_xe = $("#chdg_arr_hieu_xe").val();
    var arr_muc_do_tt = $("#chdg_arr_muc_do_tt").val();
    var arr_hang_muc = $("#chdg_arr_hang_muc").val();
    ESUtil.genHTML("tableHangMucGiaTuDongBodyTemplate", "tableHangMucGiaTuDongBody", { data: [] });
    if (arr_hang_xe.trim() == "" || arr_hieu_xe.trim() == "" || arr_muc_do_tt.trim() == "" || arr_hang_muc.trim() == "") {
        return;
    }
    var obj = {
        ngay_ad: ngay_ad,
        hang_xe: arr_hang_xe,
        hieu_xe: arr_hieu_xe,
        muc_do_tt: arr_muc_do_tt,
        hang_muc: arr_hang_muc,
    }
    _carConfigurationService.layDSHangMucCHDGNhap(obj).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ESUtil.genHTML("tableHangMucGiaTuDongBodyTemplate", "tableHangMucGiaTuDongBody", { data: res.data_info });
    });
}
function layDuLieuHangMucCHDGNhap() {
    var otArr = [];
    $("#tableHangMucGiaTuDongBody tr.tableHangMucGiaTuDongBodyRow").each(function (e) {
        var json = {
            hang_xe: "", hieu_xe: "", hang_muc: "", muc_do: "", tien_thay_the_c: 0,
            tien_sua_chua_c: 0, tien_thay_the_k: 0, tien_sua_chua_c: 0
        };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("number")) {
                    json[field] = $(this).val().replace(/[^0-9]+/g, '');
                }
                else {
                    json[field] = $(this).val();
                }
            });

        });
        otArr.push(json);
    });
    return otArr;
}
function getPagingDsCauHinhDuyetGia(trang) {
    var objTimKiem = { ngay_ad: 0, trang: trang, so_dong: 12 };
    objTimKiem.ngay_ad = $("#modalCHPheDuyetGiaTuDongNgayAD a.active").attr("data_ngay_ad");
    _carConfigurationService.timKiemDsCauHinhDuyetGia(objTimKiem).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        $("#tableHangMucGiaTuDongBody_pagination").removeClass("d-none");
        ESUtil.genHTML("tableHangMucGiaTuDongBodyTemplate", "tableHangMucGiaTuDongBody", { data: res.data_info.data });
        $("#tableHangMucGiaTuDongBody_pagination").html(ESUtil.pagingHTML("getPagingDsCauHinhDuyetGia", objTimKiem.trang, res.data_info.tong_so_dong, objTimKiem.so_dong));
    });
}
//Cấu hình xử lý hồ sơ
function getDetailCauHinhXuLy(ngay_ad, ma_chi_nhanh, nv) {
    $("#chon_tat_ca_gdvtt_xe").prop("checked", false);
    $("#chon_tat_ca_gdvht_xe").prop("checked", false);
    $("#chon_tat_ca_gdvtt_xe_may").prop("checked", false);
    $("#chon_tat_ca_gdvht_xe_may").prop("checked", false);
    ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: [] });
    ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: [] });
    var arrNSD = objDanhMuc.ds_can_bo.where(n => n.ma_chi_nhanh == ma_chi_nhanh);
    for (var i = 0; i < arrNSD.length; i++) {
        arrNSD[i].gdvht = "K";
        arrNSD[i].gdvtt = "K";
        arrNSD[i].ten_tim = arrNSD[i].ten + "" + arrNSD[i].ma;
    }
    if (ngay_ad != undefined && ngay_ad != null && ngay_ad.toString().trim() != "") {
        $("#tblDsNgayCauHinhXLBT a.nav-link").removeClass("active");
        $("#tblDsNgayCauHinhXLBT a[data_ngay_ad='" + ngay_ad + "']").addClass("active");
        _carConfigurationService.lietKeCauHinhXyLyBoiThuong({ ma_doi_tac: ESCS_MA_DOI_TAC, ngay_ad: ngay_ad, ma_chi_nhanh: ma_chi_nhanh, nv: nv }).then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            var data = res.data_info.lke;
            if (data == null || data.length <= 0) {
                ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: arrNSD });
                ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: arrNSD });
                $(".modal-user-log").html("");
            }
            if (nv == "XE" && data.length > 0) {
                $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
                for (var i = 0; i < arrNSD.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (arrNSD[i].ma == data[j].ma) {
                            arrNSD[i].gdvht = data[j].gdvht;
                            arrNSD[i].gdvtt = data[j].gdvtt;
                            arrNSD[i].ten_tim = data[j].ten_tim;
                        }
                    }
                }
                ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: arrNSD }, () => {
                    var gdvht = $("#modalCauHinhXuLyBoiThuongXe .gdvht").length;
                    var gdvtt = $("#modalCauHinhXuLyBoiThuongXe .gdvtt").length;
                    var gdvht_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvht:checked").length;
                    var gdvtt_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvtt:checked").length;
                    if (gdvht == gdvht_checked) {
                        $("#chon_tat_ca_gdvht_xe").prop("checked", true);
                    }
                    if (gdvtt == gdvtt_checked) {
                        $("#chon_tat_ca_gdvht_xe").prop("checked", true);
                    }
                });
            }
            if (nv == "XE_MAY" && data.length > 0) {
                $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
                for (var i = 0; i < arrNSD.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (arrNSD[i].ma == data[j].ma) {
                            arrNSD[i].gdvht = data[j].gdvht;
                            arrNSD[i].gdvtt = data[j].gdvtt;
                            arrNSD[i].ten_tim = data[j].ten_tim;
                        }
                    }
                }
                ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: arrNSD }, () => {
                    var gdvht = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht").length;
                    var gdvtt = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt").length;
                    var gdvht_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht:checked").length;
                    var gdvtt_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt:checked").length;
                    if (gdvht == gdvht_checked) {
                        $("#chon_tat_ca_gdvht_xe_may").prop("checked", true);
                    }
                    if (gdvtt == gdvtt_checked) {
                        $("#chon_tat_ca_gdvtt_xe_may").prop("checked", true);
                    }
                });
            }
        });
    }
}
function layCauHinhXuLyBoiThuong(nv) {
    ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: [] });
    ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: [] });
    var ngay_ad = $("#tblDsNgayCauHinhXLBT a.active").attr('data-ngay');
    var ma_chi_nhanh = _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").val();
    var arrNSD = objDanhMuc.ds_can_bo.where(n => n.ma_chi_nhanh == ma_chi_nhanh);
    for (var i = 0; i < arrNSD.length; i++) {
        arrNSD[i].gdvht = "K";
        arrNSD[i].gdvtt = "K";
        arrNSD[i].ten_tim = arrNSD[i].ten + "" + arrNSD[i].ma;
    }
    _carConfigurationService.lietKeCauHinhXyLyBoiThuong({ ma_doi_tac: ESCS_MA_DOI_TAC, ngay_ad: ngay_ad, ma_chi_nhanh: ma_chi_nhanh, nv: nv }).then(res => {
        if (res.state_info.status != "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.lke;
        if (data == null || data.length <= 0) {
            ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: arrNSD });
            ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: arrNSD });
            $(".modal-user-log").html("");
        }
        if (nv == "XE" && data.length > 0) {
            $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
            for (var i = 0; i < arrNSD.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (arrNSD[i].ma == data[j].ma) {
                        arrNSD[i].gdvht = data[j].gdvht;
                        arrNSD[i].gdvtt = data[j].gdvtt;
                        arrNSD[i].ten_tim = data[j].ten_tim;
                    }
                }
            }
            ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeTemplate", "modalCauHinhXuLyBoiThuongXe", { danh_sach: arrNSD }, () => {
                var gdvht = $("#modalCauHinhXuLyBoiThuongXe .gdvht").length;
                var gdvtt = $("#modalCauHinhXuLyBoiThuongXe .gdvtt").length;
                var gdvht_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvht:checked").length;
                var gdvtt_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvtt:checked").length;
                if (gdvht == gdvht_checked) {
                    $("#chon_tat_ca_gdvht_xe").prop("checked", true);
                }
                if (gdvtt == gdvtt_checked) {
                    $("#chon_tat_ca_gdvht_xe").prop("checked", true);
                }
            });
        }
        if (nv == "XE_MAY" && data.length > 0) {
            $(".modal-user-log").html("(" + data[0].nsd + " - " + data[0].ngay + ")");
            for (var i = 0; i < arrNSD.length; i++) {
                for (var j = 0; j < data.length; j++) {
                    if (arrNSD[i].ma == data[j].ma) {
                        arrNSD[i].gdvht = data[j].gdvht;
                        arrNSD[i].gdvtt = data[j].gdvtt;
                        arrNSD[i].ten_tim = data[j].ten_tim;
                    }
                }
            }
            ESUtil.genHTML("modalCauHinhXuLyBoiThuongXeMayTemplate", "modalCauHinhXuLyBoiThuongXeMay", { danh_sach: arrNSD }, () => {
                var gdvht = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht").length;
                var gdvtt = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt").length;
                var gdvht_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht:checked").length;
                var gdvtt_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt:checked").length;
                if (gdvht == gdvht_checked) {
                    $("#chon_tat_ca_gdvht_xe_may").prop("checked", true);
                }
                if (gdvtt == gdvtt_checked) {
                    $("#chon_tat_ca_gdvtt_xe_may").prop("checked", true);
                }
            });
        }
    });
}
//Get data table xử lý hồ sơ
function getDataTableCHXLyBoiThuongXe() {
    var otArr = [];
    $("#modalCauHinhXuLyBoiThuongXe tr.row_item").each(function (e) {
        var json = { gdvht_gdvtt: '', gdvtt_btv: '', ma: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                } 
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function getDataTableCHXLyBoiThuongXeMay() {
    var otArr = [];
    $("#modalCauHinhXuLyBoiThuongXeMay tr.row_item").each(function (e) {
        var json = { gdvht_gdvtt: '', gdvtt_btv: '', ma: '' };
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var field = $(this).attr("data-field");
                if ($(this).hasClass("checkbox")) {
                    json[field] = $(this).is(":checked") == true ? 'C' : 'K';
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onChonTatCaGDVHTXe(el) {
    $(".gdvht").prop("checked", false);
    if ($(el).is(":checked")) {
        $(".gdvht").prop("checked", true);
    }
}
function onChonTatCaGDVHTXeMay(el) {
    $(".gdvht").prop("checked", false);
    if ($(el).is(":checked")) {
        $(".gdvht").prop("checked", true);
    }
}
function onChonTatCaGDVTTXe(el) {
    $(".gdvtt").prop("checked", false);
    if ($(el).is(":checked")) {
        $(".gdvtt").prop("checked", true);
    }
}
function onChonTatCaGDVTTXeMay(el) {
    $(".gdvtt").prop("checked", false);
    if ($(el).is(":checked")) {
        $(".gdvtt").prop("checked", true);
    }
}
function onChonGDVHTXe(el) {
    $("#chon_tat_ca_gdvht_xe").prop("checked", false);
    var dem = $("#modalCauHinhXuLyBoiThuongXe .gdvht").length;
    var dem_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvht:checked").length;
    if (dem == dem_checked) {
        $("#chon_tat_ca_gdvht_xe").prop("checked", true);
    }
}
function onChonGDVHTXeMay(el) {
    $("#chon_tat_ca_gdvht_xe_may").prop("checked", false);
    var dem = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht").length;
    var dem_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvht:checked").length;
    if (dem == dem_checked) {
        $("#chon_tat_ca_gdvht_xe_may").prop("checked", true);
    }
}
function onChonGDVTTXe(el) {
    $("#chon_tat_ca_gdvtt_xe").prop("checked", false);
    var dem = $("#modalCauHinhXuLyBoiThuongXe .gdvtt").length;
    var dem_checked = $("#modalCauHinhXuLyBoiThuongXe .gdvtt:checked").length;
    if (dem == dem_checked) {
        $("#chon_tat_ca_gdvtt_xe").prop("checked", true);
    }
}
function onChonGDVTTXeMay(el) {
    $("#chon_tat_ca_gdvtt_xe_may").prop("checked", false);
    var dem = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt").length;
    var dem_checked = $("#modalCauHinhXuLyBoiThuongXeMay .gdvtt:checked").length;
    if (dem == dem_checked) {
        $("#chon_tat_ca_gdvtt_xe_may").prop("checked", true);
    }
}
function onChangeTimKiemCanBo(el) {
    var nv = $("#navCauHinhXuLy a.active").attr("data-val");
    if (nv == "XE") {
        var value = $(el).val();
        $("#modalCauHinhXuLyBoiThuongXe .cauHinhXuLyBTXe").removeClass("d-none");
        if (value != "") {
            $("#modalCauHinhXuLyBoiThuongXe .cauHinhXuLyBTXe").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(value);
            $("#modalCauHinhXuLyBoiThuongXe .cauHinhXuLyBTXe[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }
    if (nv == "XE_MAY") {
        var value = $(el).val();
        $("#modalCauHinhXuLyBoiThuongXeMay .cauHinhXuLyBTXeMay").removeClass("d-none");
        if (value != "") {
            $("#modalCauHinhXuLyBoiThuongXeMay .cauHinhXuLyBTXeMay").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(value);
            $("#modalCauHinhXuLyBoiThuongXeMay .cauHinhXuLyBTXeMay[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }
}
function changeTabNvGiamTru(nv) {
    nvGiamTru = '';
    if (nv !== '' && nv != undefined) {
        nvGiamTru = nv;
        ESUtil.genHTML("modalThemGiamTru_template", "modalThemGiamTru", { ds_giam_tru: [] });
        ESUtil.genHTML("modalThemGiamTruXM_template", "modalThemGiamTruXM", { ds_giam_tru: [] });
        ESUtil.genHTML("modalThemGiamTruDKBS_template", "modalThemGiamTruDKBS", { ds_giam_tru_dkbs: [] });
        ESUtil.genHTML("modalThemGiamTruDKBSXM_template", "modalThemGiamTruDKBSXM", { ds_giam_tru_dkbs: [] });
        ESUtil.genHTML("modalDkbsDanhSachTemplate", "modalDkbsDanhSach", { ds_giam_tru_dkbs: objDanhMuc.dkbs.where(n => n.nv == nvGiamTru) });
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: 0,
            nv: nvGiamTru
        }
        _carConfigurationService.GetDsNgay(obj).then(res => {
            objCauHinh = res.data_info;
            $('#tblDsNgayGiamTru').html('');
            ESUtil.genHTML("tblDsNgayGiamTru_template", "tblDsNgayGiamTru", { ds_ngay_ad: res.data_info.ds_ngay_gt }, () => {
                if (res.data_info.ds_ngay_gt.length > 0) {
                    $("#tblDsNgayGiamTru a.nav-link").removeClass("active");
                    $("#tblDsNgayGiamTru a[data_ngay_ad='" + res.data_info.ds_ngay_gt[0].ngay_ad + "']").addClass("active");
                    getDetailReduce(res.data_info.ds_ngay_gt[0].ngay_ad);
                } else {
                    getDetailReduce(undefined);
                }
            });
        });
    }
}
function changeTabCauHinhBoiThuong(nv) {
    nvCauHinhBT = '';
    if (nv !== '' && nv != undefined) {
        nvCauHinhBT = nv;
        ESUtil.genHTML("modalCauHinhBoiThuong_template", "modalCauHinhBoiThuong", { ds_boi_thuong: [] });
        ESUtil.genHTML("modalCauHinhBoiThuongXM_template", "modalCauHinhBoiThuongXM", { ds_boi_thuong: [] });
        ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: [] });
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: 0,
            nv: nvCauHinhBT
        }
        _carConfigurationService.xemCauHinhBoiThuong(obj).then(res => {
            objCauHinh = res.data_info;
            ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                if (res.data_info.ds_ngay.length > 0) {
                    $("#tblDsNgayCHBT a.nav-link").removeClass("active");
                    $("#tblDsNgayCHBT a[data_ngay_ad='" + res.data_info.ds_ngay[0].ngay_ad + "']").addClass("active");
                    getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                }
            });
        });
    }
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),//0
        _rangeVehicleService.layDsLoaiXe(),//1
        _categoryCommonService.layDsDanhMucChung(),//2
        _administrativeUnitsService.layDsTinhThanh(),//3
        _branchListService.layDsChiNhanh(),//4
        _damageLevelService.layDsMucDoTonThat(),//5
        _categoryvehicleListService.layDsHangMucXe(),//6,
        _garaListService.layDsGara(),//7
        _hieuXeService.layDsHieuXe(),//8
        _userManagementService.layDsNSD() //9
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0];
        objDanhMuc.loai_xe = arrRes[1];
        objDanhMuc.dkbs = arrRes[2].data_info.where(n => n.nhom === "DKBS");
        objDanhMuc.moi_qhe = arrRes[2].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom === "MOI_QUAN_HE");
        objDanhMuc.don_vi_hanh_chinh = arrRes[3].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        objDanhMuc.don_vi = arrRes[4].data_info;
        objDanhMuc.muc_do_tt = arrRes[5].data_info;
        objDanhMuc.hang_muc_xe = arrRes[6].data_info.where(n => n.loai !== "PHU" && n.loai !== "TAI_LIEU" && n.loai !== "ANH_TOAN_CANH" && n.nhom !== "HSGT");
        objDanhMuc.gara = arrRes[7].data_info;
        objDanhMuc.hieu_xe = arrRes[8].data_info.where(n => n.nv == 'XE');
        objDanhMuc.ds_can_bo = arrRes[9].data_info.where(n => n.ma_doi_tac = ESCS_MA_DOI_TAC);

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmThemKhauHao.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmThemKhauHao.getControl("loai_xe").setDataSource([], "ten", "ma", "Chọn loại xe", "");
        _frmThemCauHinhXeOto.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmThemkpi.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmCauHinhSLA.getControl("ma_doi_tac").setDataSource(arrRes[0].data_info, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC);
        _frmThemkpi.getControl("nv_ct").setDataSource([], "ten", "ma", "Chọn nghiệp vụ", "");
        ESUtil.genHTML("modalLoaiXeDanhSachTemplate", "modalLoaiXeDanhSach", { danh_sach: objDanhMuc.loai_xe.data_info });

        // hieu them
        _frmThemKhauHao.getControl("nv").setDataSource(arrNv, "ten", "ma", "Chọn nghiệp vụ", "");

        ESUtil.genHTML("modalCHPheDuyetGiaTuDongDviADTemplate", "modalCHPheDuyetGiaTuDongDviAD", { data: objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC) });
        //ESUtil.genHTML("modalCHPheDuyetGiaTuDongGaraADTemplate", "modalCHPheDuyetGiaTuDongGaraAD", { data: objDanhMuc.gara });
        //ESUtil.genHTML("modalCHPheDuyetGiaTuDongHangHieuXeADTemplate", "modalCHPheDuyetGiaTuDongHangHieuXeAD", { data: objDanhMuc.hieu_xe });
        var arrChiNhanh = objDanhMuc.don_vi.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC);
        _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", arrChiNhanh[0].ma);
        _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").trigger("select2:select");
        bindTinhThanh();
        bindQuanHuyen([]);
        bindChiNhanh();
    });

    _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").addEventChange(val => {
        var ngay_ad = $("#tblDsNgayCauHinhXLBT a.active").attr('data-ngay');
        var nv = $("#navCauHinhXuLy a.active").attr("data-val");
        getDetailCauHinhXuLy(ngay_ad,val, nv);
    });

    _frmThemKhauHao.getControl('ma_doi_tac').addEventChange(val => {
        var nv = _frmThemKhauHao.getControl('nv').val();
        _carConfigurationService.GetDsNgay({ ma_doi_tac: val, nv: nv }).then(res => {
            if (_frmThemKhauHao.getControl('loai_xe').getValue() == '') {
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: res.data_info.ds_ngay_kh });
                if (res.data_info.ds_ngay_kh.length != 0) {
                    getDetailKhauHao(res.data_info.ds_ngay_kh[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            } else {
                var ds_ngay_lx = res.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == _frmThemKhauHao.getControl('loai_xe').getValue())
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: ds_ngay_lx });
                if (ds_ngay_lx.length != 0) {
                    getDetailKhauHao(ds_ngay_lx[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            }
        });
    });
    _frmThemKhauHao.getControl("nv").addEventChange(val => {
        var ma_doi_tac = _frmThemKhauHao.getControl('ma_doi_tac').val();
        _carConfigurationService.GetDsNgay({ ma_doi_tac: ma_doi_tac, nv: val }).then(res => {
            var arrLoaiXe = objDanhMuc.loai_xe.data_info.where(n => n.nv == val);
            _frmThemKhauHao.getControl("loai_xe").setDataSource(arrLoaiXe, "ten", "ma", "Chọn loại xe", "");
            if (_frmThemKhauHao.getControl('loai_xe').getValue() == '') {
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: res.data_info.ds_ngay_kh });
                if (res.data_info.ds_ngay_kh.length != 0) {
                    getDetailKhauHao(res.data_info.ds_ngay_kh[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            } else {
                var ds_ngay_lx = res.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == _frmThemKhauHao.getControl('loai_xe').getValue())
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: ds_ngay_lx });
                if (ds_ngay_lx.length != 0) {
                    getDetailKhauHao(ds_ngay_lx[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            }
        });
    });
    _frmThemKhauHao.getControl('loai_xe').addEventChange(val => {
        if (val == '') {
            $("#pp_khau_hao").show();
            $("#pp_khau_hao_loai_xe").hide();
            var mdt = _frmThemKhauHao.getControl("ma_doi_tac").getValue();
            var nv = _frmThemKhauHao.getControl("nv").getValue();
            _carConfigurationService.GetDsNgay({ ma_doi_tac: mdt, nv: nv }).then(res => {
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: res.data_info.ds_ngay_kh });
                if (res.data_info.ds_ngay_kh.length != 0) {
                    getDetailKhauHao(res.data_info.ds_ngay_kh[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            });
        } else {
            $("#pp_khau_hao").hide();
            $("#pp_khau_hao_loai_xe").show();
            var mdt = _frmThemKhauHao.getControl("ma_doi_tac").getValue();
            var nv = _frmThemKhauHao.getControl("nv").getValue();
            _carConfigurationService.GetDsNgay({ ma_doi_tac: mdt, nv: nv }).then(res => {
                var data_ngay_lx = res.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == val);
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: data_ngay_lx });
                if (data_ngay_lx.length != 0) {
                    getDetailKhauHao(data_ngay_lx[0].ngay_ad);
                } else {
                    getDetailKhauHao(undefined);
                }
            });
        }
    });
    _frmThemCauHinhXeOto.getControl('ma_doi_tac').addEventChange(val => {
        _carConfigurationService.GetDsNgay({ ma_doi_tac: val }).then(res => {
            ESUtil.genHTML("tblDsNgayCauHinhXe_template", "tblDsNgayCauHinhXe", { ds_ngay_ad: res.data_info.ds_ngay_ch });
            if (res.data_info.ds_ngay_ch.length != 0) {
                getDetailCauHinhXe(res.data_info.ds_ngay_ch[0].ngay_ad);
            } else {
                getDetailCauHinhXe(undefined);
                _frmThemCauHinhXeOto.getControl('ngay_ad').val('');
            }
        });
    });
    _frmThemkpi.getControl('nv').addEventChange(val => {
        var nv_ct = arrXE.where(n => n.nv == val);
        _frmThemkpi.getControl("nv_ct").setDataSource(nv_ct, "ten", "ma", "Chọn nghiệp vụ", "");
    });
    _frmThemkpi.getControl("nv_ct").addEventChange(val => {
        getListNgay(_frmThemkpi.getControl("ma_doi_tac").getValue(), _frmThemkpi.getControl("nv").getValue(), val);
    });
    _frmCauHinhSLA.getControl("nv").addEventChange(val => {
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            nv: val
        }
        _carConfigurationService.lietKeThongTinCauHinhSLA(obj).then(res => {
            objCauHinhSLA = res.data_info;
            ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                if (res.data_info.ds_ngay.length > 0) {
                    getDetailCauHinhSLA(res.data_info.ds_ngay[0].ngay_ad);
                }
            });
        });
    });
    // Sự kiện onchange theo ngày phương pháp tính khấu hao
    $('form[name="frmThemKhauHao"]').find('input[name=ngay_ad]').on('change', function () {
        var obj = _frmThemKhauHao.getJsonData();
        getDetailKhauHao(obj.ngay_ad);
    });
    // Sự kiện onchange theo ngày cấu hình chung xe ô tô
    $('form[name="frmThemCauHinhXeOto"]').find('input[name=ngay_ad]').on('change', function () {
        var obj = _frmThemCauHinhXeOto.getJsonData();
        getDetailCauHinhXe(obj.ngay_ad);
    });
    // Thêm các dòng dữ liệu phương pháp tính khấu hao
    $("#btnAddKhauHao").click(function () {
        var json = { tuoi_xe_tu: '', tuoi_xe_toi: '', tl_khau_hao: '' };
        var arr = getDataTableKH();
        arr.push(json);
        ESUtil.genHTML("modalThemKhauHao_template", "modalThemKhauHao", { ds_khau_hao: arr });
    });
    // Lưu thông tin cấu hình
    $("#btnLuuKhauHao").click(function () {
        if (_frmThemKhauHao.getControl("loai_xe").getValue() == '') {
            if (getDataTableKH().length == 0) {
                _notifyService.error('Chưa nhập đầy đủ thông tin khấu hao');
                return;
            }
            var objDaTa = {
                ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                ngay_ad: _frmThemKhauHao.getControl('ngay_ad').val(),
                nv: _frmThemKhauHao.getControl('nv').getValue(),
                data_kh: getDataTableKH()
            }
            _carConfigurationService.SavePhuongPhapKhauHao(objDaTa).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: objDaTa.ma_doi_tac, nv: obj.nv }).then(res1 => {
                        ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: res1.data_info.ds_ngay_kh });
                        if (res1.data_info.ds_ngay_kh.length != 0) {
                            getDetailKhauHao(res.out_value.ngay_ad);
                        } else {
                            getDetailKhauHao(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            })
        } else {
            if (getDataTableXe().length == 0) {
                _notifyService.error('Chưa nhập đầy đủ thông tin khấu hao loại xe');
                return;
            }
            var objDaTa = {
                ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                ngay_ad: _frmThemKhauHao.getControl('ngay_ad').val(),
                loai_xe: _frmThemKhauHao.getControl("loai_xe").getValue(),
                nv: _frmThemKhauHao.getControl('nv').getValue(),
                data_lx: getDataTableXe()
            }
            _carConfigurationService.SaveLoaiXe(objDaTa).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: obj.ma_doi_tac, nv: obj.nv }).then(res1 => {
                        var data_ngay_lx = res1.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == _frmThemKhauHao.getControl('loai_xe').getValue());
                        ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: data_ngay_lx });
                        if (data_ngay_lx.length != 0) {
                            getDetailKhauHao(res.out_value.ngay_ad);
                        } else {
                            getDetailKhauHao(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            })
        }
    });
    // Xóa thông tin phương pháp tính khấu hao
    $("#btnXoaKhauHao").click(function () {
        if (_frmThemKhauHao.getControl('loai_xe').getValue() == '') {
            var objData = {
                ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                ngay_ad: _frmThemKhauHao.getControl('ngay_ad').val(),
                nv: _frmThemKhauHao.getControl('nv').getValue()
            }
            _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
                _carConfigurationService.deleteConfigKhauHao(objData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Xóa cấu hình thành công");
                        _carConfigurationService.GetDsNgay({ ma_doi_tac: objData.ma_doi_tac, nv: obj.nv }).then(res1 => {
                            ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: res1.data_info.ds_ngay_kh });
                            if (res1.data_info.ds_ngay_kh.length != 0) {
                                getDetailKhauHao(res1.data_info.ds_ngay_kh[0].ngay_ad);
                            } else {
                                getDetailKhauHao(undefined);
                            }
                        });
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            });
        } else {
            var objData = {
                ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                loai_xe: _frmThemKhauHao.getControl('loai_xe').getValue(),
                ngay_ad: _frmThemKhauHao.getControl('ngay_ad').val(),
                nv: _frmThemKhauHao.getControl('nv').getValue()
            }
            _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
                _carConfigurationService.deleteConfigKhauHaoLoaiXe(objData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Xóa cấu hình thành công");
                        _carConfigurationService.GetDsNgay({ ma_doi_tac: objData.ma_doi_tac, nv: obj.nv }).then(res1 => {
                            var ds_ngay_lx = res1.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == objData.loai_xe);
                            ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: ds_ngay_lx });
                            if (ds_ngay_lx.length != 0) {
                                getDetailKhauHao(ds_ngay_lx[0].ngay_ad);
                            } else {
                                getDetailKhauHao(undefined);
                            }
                        });
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            });
        }
    });
    // Thêm các dòng dữ liệu phương pháp tính giảm trừ
    $("#btnAddGiamTru").click(function () {
        var json = { tu_ngay: '', toi_ngay: '', tl_giam: '' };
        var arr = getDataTableGiamTru();
        arr.push(json);
        ESUtil.genHTML("modalThemGiamTru_template", "modalThemGiamTru", { ds_giam_tru: arr });
    });
    // Thêm các dòng dữ liệu phương pháp tính giảm trừ
    $("#btnAddGiamTruXM").click(function () {
        var json = { tu_ngay: '', toi_ngay: '', tl_giam: '' };
        var arr = getDataTableGiamTruXM();
        arr.push(json);
        ESUtil.genHTML("modalThemGiamTruXM_template", "modalThemGiamTruXM", { ds_giam_tru: arr });
    });
    // Chọn điều khoản bổ sung
    $("#btnChonDkbs").click(function () {
        if (nvGiamTru == 'XE') {
            var arr_table = getDataTableGiamTruDKBS();
            var arr_chon = getCheckedGiamTruDKBS();
            var arr_tong_hop = [];
            for (var i = 0; i < arr_chon.length; i++) {
                var dkbs = arr_table.where(n => n.ma_dkbs == arr_chon[i].ma_dkbs).firstOrDefault();
                if (dkbs != null) {
                    arr_tong_hop.push(dkbs);
                }
                else {
                    arr_tong_hop.push(arr_chon[i]);
                }
            }
            ESUtil.genHTML("modalThemGiamTruDKBS_template", "modalThemGiamTruDKBS", { ds_giam_tru_dkbs: arr_tong_hop });
        } else if (nvGiamTru == 'XE_MAY') {
            var arr_table = getDataTableGiamTruDKBSXM();
            var arr_chon = getCheckedGiamTruDKBS();
            var arr_tong_hop = [];
            for (var i = 0; i < arr_chon.length; i++) {
                var dkbs = arr_table.where(n => n.ma_dkbs == arr_chon[i].ma_dkbs).firstOrDefault();
                if (dkbs != null) {
                    arr_tong_hop.push(dkbs);
                }
                else {
                    arr_tong_hop.push(arr_chon[i]);
                }
            }
            ESUtil.genHTML("modalThemGiamTruDKBSXM_template", "modalThemGiamTruDKBSXM", { ds_giam_tru_dkbs: arr_tong_hop });
        }
        
        _modalGiamTruDkbs.hide();
    });
    // Lưu thông tin phương pháp tính giảm trừ - giảm trừ dkbs
    $("#btnLuuGiamTru").click(function () {
        if (nvGiamTru == 'XE') {
            if (getDataTableGiamTru().length == 0) {
                _notifyService.error('Chưa nhập thông tin giảm trừ');
                return;
            }
            if (getDataTableGiamTruDKBS().length == 0) {
                _notifyService.error('Chưa nhập thông tin giảm trừ điều khoản bổ sung');
                return;
            }
            var objData = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: $("#tblDsNgayGiamTru a.active").attr("data-ngay"),
                nv: nvGiamTru,
                data_gt: getDataTableGiamTru(),
                data_dkbs: getDataTableGiamTruDKBS()
            }
            _carConfigurationService.SaveReduce(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: ESCS_MA_DOI_TAC, nv: nvGiamTru }).then(res1 => {
                        ESUtil.genHTML("tblDsNgayGiamTru_template", "tblDsNgayGiamTru", { ds_ngay_ad: res1.data_info.ds_ngay_gt });
                        if (res1.data_info.ds_ngay_gt.length != 0) {
                            getDetailReduce(res.out_value.ngay_ad);
                        } else {
                            getDetailReduce(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            })
        } else if (nvGiamTru == 'XE_MAY') {
            if (getDataTableGiamTruXM().length == 0) {
                _notifyService.error('Chưa nhập thông tin giảm trừ');
                return;
            }
            if (getDataTableGiamTruDKBSXM().length == 0) {
                _notifyService.error('Chưa nhập thông tin giảm trừ điều khoản bổ sung');
                return;
            }
            var objData = {
                ma_doi_tac: ESCS_MA_DOI_TAC,
                ngay_ad: $("#tblDsNgayGiamTru a.active").attr("data-ngay"),
                nv: nvGiamTru,
                data_gt: getDataTableGiamTruXM(),
                data_dkbs: getDataTableGiamTruDKBSXM()
            }
            _carConfigurationService.SaveReduce(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: ESCS_MA_DOI_TAC, nv: nvGiamTru }).then(res1 => {
                        ESUtil.genHTML("tblDsNgayGiamTru_template", "tblDsNgayGiamTru", { ds_ngay_ad: res1.data_info.ds_ngay_gt });
                        if (res1.data_info.ds_ngay_gt.length != 0) {
                            getDetailReduce(res.out_value.ngay_ad);
                        } else {
                            getDetailReduce(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            })
        }
        
    });
    // Xóa thông tin phương pháp tính khấu hao
    $("#btnXoaGiamTru").click(function () {
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ngay_ad: $("#tblDsNgayGiamTru a.active").attr("data-ngay")
        }
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
            _carConfigurationService.deleteConfigGiamTru(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa cấu hình thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: ESCS_MA_DOI_TAC, nv: nvGiamTru }).then(res1 => {
                        ESUtil.genHTML("tblDsNgayGiamTru_template", "tblDsNgayGiamTru", { ds_ngay_ad: res1.data_info.ds_ngay_gt });
                        if (res1.data_info.ds_ngay_gt.length != 0) {
                            getDetailReduce(res1.data_info.ds_ngay_gt[0].ngay_ad);
                        } else {
                            getDetailReduce(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Thêm ngày áp dụng cấu hình bồi thường
    $('#btnThemNgayCHBT').click(function () {
        _modalThemNgayApDung.show();
    });
    $("#btnLuuThemNgayApDungCauHinhBT").click(function () {
        var arrNgay = [];
        var obj = _frmThemNgayApDung.getJsonData();
        obj.ma_doi_tac = $("#escs_ma_doi_tac").val();
        obj.nv = nvCauHinhBT;
        obj.ngay_ad_hthi = obj.ngay_ad.numberToDate();
        $("#tblDsNgayCHBT a.item-ngay_ad").each(function (e) {
            var value = parseInt($(this).attr('data-ngay'));
            arrNgay.push(value);
        });
        if (arrNgay.indexOf(obj.ngay_ad) !== -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var arr = objCauHinh.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: arr }, () => {
            getDetailCompensation(obj.ngay_ad);
        });
        _modalThemNgayApDung.hide();
    });
    // Lưu thông tin cấu hình bồi thường xe ô tô
    $("#btnLuuCauHinhXeOto").click(function () {
        var obj = _frmThemCauHinhXeOto.getJsonData();
        var arr = getDataTableBTXe();
        //Convert array to object
        var data = {};
        for (let i = 0; i < arr.length; i++) {
            data[arr[i].ma] = arr[i].value;
        }
        var mergedObj = { ...obj, ...data };
        _carConfigurationService.luuThongTinCauHinhXe(mergedObj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
                _carConfigurationService.GetDsNgay({ ma_doi_tac: ESCS_MA_DOI_TAC }).then(res1 => {
                    ESUtil.genHTML("tblDsNgayCauHinhXe_template", "tblDsNgayCauHinhXe", { ds_ngay_ad: res1.data_info.ds_ngay_ch });
                    if (res1.data_info.ds_ngay_ch.length != 0) {
                        getDetailCauHinhXe(res.out_value.ngay_ad);
                    } else {
                        getDetailCauHinhXe(undefined);
                    }
                });
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    // Xóa thông tin cấu hình bồi thường xe ô tô
    $("#btnXoaCauHinhXeOto").click(function () {
        var formData = _frmThemCauHinhXeOto.getJsonData();
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
            _carConfigurationService.deleteConfigCommonCar(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa cấu hình thành công");
                    _carConfigurationService.GetDsNgay({ ma_doi_tac: ESCS_MA_DOI_TAC }).then(res1 => {
                        ESUtil.genHTML("tblDsNgayCauHinhXe_template", "tblDsNgayCauHinhXe", { ds_ngay_ad: res1.data_info.ds_ngay_ch });
                        if (res1.data_info.ds_ngay_ch.length != 0) {
                            getDetailCauHinhXe(res1.data_info.ds_ngay_ch[0].ngay_ad);
                        } else {
                            getDetailCauHinhXe(undefined);
                        }
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $('#btnAddKhauHaoLoaiXe').click(function () {
        var json = { tuoi_xe_tu: '', tuoi_xe_toi: '', he_so_tl: '' };
        var arr = getDataTableXe();
        arr.push(json);
        ESUtil.genHTML("modalThemKhauHaoLoaiXe_template", "modalThemKhauHaoLoaiXe", { ds_khau_hao_loai_xe: arr });
    });
    $('#btnOpenInputThemNgayKH').click(function () {
        $('.item-ngay_ad').removeClass("text-danger");
        ESUtil.genHTML('modalThemKhauHao_template', 'modalThemKhauHao', { ds_khau_hao: [] });
        ESUtil.genHTML('modalThemKhauHaoLoaiXe_template', 'modalThemKhauHaoLoaiXe', { ds_khau_hao_loai_xe: [] });
        $('#divInputThemNgayKH').show();
        $('#divThemMoiNgayKH').hide();
    });
    $('#btnDongNgayKH').click(function () {
        getDetailKhauHao(_frmThemKhauHao.getControl('ngay_ad').getValue());
        $('#divInputThemNgayKH').hide();
        $('#divThemMoiNgayKH').show();
    });
    $('#btnThemNgayKH').click(function () {
        var arrNgay = [];
        $("#tblDsKhauHao tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_kh').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var mdt = _frmThemKhauHao.getControl('ma_doi_tac').getValue();
        var nv = _frmThemKhauHao.getControl('nv').getValue();
        _carConfigurationService.GetDsNgay({ ma_doi_tac: mdt, nv: nv }).then(res => {
            if (_frmThemKhauHao.getControl('loai_xe').getValue() == '') {
                var obj = {
                    ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                    ngay_ad: ngay_new.dateToNumber(),
                    ngay_ad_hthi: ngay_new
                }
                var arr = res.data_info.ds_ngay_kh;
                arr.push(obj);
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: arr }, () => {
                    getDetailKhauHao(obj.ngay_ad);
                });
                $('#divInputThemNgayKH').hide();
                $('#divThemMoiNgayKH').show();
            } else {
                var obj = {
                    ma_doi_tac: _frmThemKhauHao.getControl('ma_doi_tac').getValue(),
                    ngay_ad: ngay_new.dateToNumber(),
                    ngay_ad_hthi: ngay_new
                }
                var arr = res.data_info.ds_ngay_kh_lx.where(n => n.loai_xe == _frmThemKhauHao.getControl('loai_xe').getValue());
                arr.push(obj);
                ESUtil.genHTML("tblDsKhauHao_template", "tblDsKhauHao", { ds_ngay_ad: arr }, () => {
                    getDetailKhauHao(obj.ngay_ad);
                });
                $('#divInputThemNgayKH').hide();
                $('#divThemMoiNgayKH').show();
            }
        });
    });
    $('#btnThemNgayGT').click(function () {
        _modalThemNgayApDungGT.show();
    });
    $('#btnLuuThemNgayApDungCauHinhGT').click(function () {
        var arr = objCauHinh.ds_ngay_gt;
        var obj = _frmThemNgayApDungGT.getJsonData();
        obj.ma_doi_tac = $("#escs_ma_doi_tac").val();
        obj.ngay_ad_hthi = obj.ngay_ad.numberToDate();
        obj.nv = nvGiamTru;

        var arrNgay = [];
        $("#tblDsNgayGiamTru a.item-ngay_ad").each(function (e) {
            var value = parseInt($(this).attr('data-ngay'));
            arrNgay.push(value);
        });
        if (arrNgay.indexOf(obj.ngay_ad) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayGiamTru_template", "tblDsNgayGiamTru", { ds_ngay_ad: arr }, () => {
            getDetailReduce(obj.ngay_ad);
        });
        _modalThemNgayApDungGT.hide();
    });
    $('#btnOpenInputThemNgayCH').click(function () {
        $('.item-ngay_ad').removeClass("text-danger");
        ESUtil.genHTML('modalCauHinhXeOto_template', 'modalCauHinhXeOto', { ds_xe_oto: [] });
        $('#divInputThemNgayCH').show();
        $('#divThemMoiNgayCH').hide();
    });
    $('#btnDongNgayCH').click(function () {
        getDetailCauHinhXe(_frmThemCauHinhXeOto.getControl('ngay_ad').getValue());
        $('#divInputThemNgayCH').hide();
        $('#divThemMoiNgayCH').show();
    });
    $('#btnThemNgayCH').click(function () {
        var arrNgay = [];
        $("#tblDsNgayCauHinhXe tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_ch').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        _carConfigurationService.GetDsNgay({ ma_doi_tac: _frmThemCauHinhXeOto.getControl('ma_doi_tac').getValue() }).then(res => {
            var obj = {
                ma_doi_tac: _frmThemCauHinhXeOto.getControl('ma_doi_tac').getValue(),
                ngay_ad: ngay_new.dateToNumber(),
                ngay_ad_hthi: ngay_new
            }
            var arr = res.data_info.ds_ngay_ch;
            arr.push(obj);
            ESUtil.genHTML("tblDsNgayCauHinhXe_template", "tblDsNgayCauHinhXe", { ds_ngay_ad: arr }, () => {
                getDetailCauHinhXe(obj.ngay_ad);
            });
            $('#divInputThemNgayCH').hide();
            $('#divThemMoiNgayCH').show();
        });
    });
    // Thêm ngày áp dụng KPI
    $("#btnThemNgayApDung").click(function () {
        var arrNgay = [];
        $("#tblDsNgay tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#themMoiNgayAD').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var obj = _frmThemkpi.getJsonData();
        _carConfigurationService.xemThongTinChiTietNgayTien(obj).then(res => {
            var objData = {
                ma_doi_tac: obj.ma_doi_tac,
                nv: obj.nv,
                nv_ct: obj.nv_ct,
                ngay_ad: ngay_new.dateToNumber(),
                ngay_ad_hthi: ngay_new
            }
            var arr = res.data_info.ngay_ad;
            arr.push(objData);
            ESUtil.genHTML("tblDsNgayKPI_template", "tblDsNgay", { ds_ngay_ad: arr }, () => {
                getListTien(objData.ngay_ad);
            });
        });
    });
    // Thêm số tiền bồi thường KPI
    $("#btnThemSoTien").click(function () {
        var arrTien = [];
        $("#tblDsTien tr.item-tien").each(function (e) {
            var value = $(this).find('td').html();
            arrTien.push(value);
        });
        var tien_new = $('#themMoiTien').val();
        var tien = tien_new.trim().replace(/[^0-9]/g, '');
        if (arrTien.indexOf(tien_new) != -1) {
            _notifyService.error('Số tiền bồi thường đã tồn tại');
            return;
        }
        var obj = _frmThemkpi.getJsonData();
        obj.ngay_ad = $("#tblDsNgay tr.active").attr('data-val');
        _carConfigurationService.xemThongTinChiTietNgayTien(obj).then(res => {
            var objData = {
                ma_doi_tac: obj.ma_doi_tac,
                nv: obj.nv,
                nv_ct: obj.nv_ct,
                ngay_ad: obj.ngay_ad,
                tien: tien
            }
            var arr = res.data_info.so_tien;
            arr.push(objData);
            ESUtil.genHTML("tblDsTienKPI_template", "tblDsTien", { ds_tien: arr }, () => {
                getDataDetail(objData.ngay_ad, tien);
            });
        });
    });
    // Lưu thông tin KPI
    $("#btnLuukpi").click(function () {
        let obj = _frmThemkpi.getJsonData();
        let ngay_ad = $("#tblDsNgay tr.active").attr('data-val');
        let tien = $("#tblDsTien tr.active").attr('data-val');
        obj.ngay_ad = ngay_ad;
        obj.tien = tien;
        let arr = getDataTableKPI();
        //Convert array to object
        let data = {};
        for (let i = 0; i < arr.length; i++) {
            data[arr[i].ma] = arr[i].value;
        }
        var mergedObj = { ...obj, ...data };
        _carConfigurationService.luuThongTinTienTrinhKPI(mergedObj).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    // Xóa thông tin tiến trình kpi
    $("#btnXoakpi").click(function () {
        var formData = _frmThemkpi.getJsonData();
        let ngay_ad = $("#tblDsNgay tr.active").attr('data-val');
        let tien = $("#tblDsTien tr.active").attr('data-val');
        formData.ngay_ad = ngay_ad;
        formData.tien = tien;
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _carConfigurationService.xoaThongTinTienTrinhKPI(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    getListNgay(formData.ma_doi_tac, formData.nv, formData.nv_ct);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Lưu thông tin cấu hình chung
    $("#btnLuuCauHinhBoiThuong").click(function () {
        if (nvCauHinhBT == 'XE') {
            var objData = {
                ma_doi_tac: $("#escs_ma_doi_tac").val(),
                ngay_ad: $("#tblDsNgayCHBT a.active").attr("data-ngay"),
                nv: nvCauHinhBT,
                data: getDataTableCauHinhBoiThuong()
            }
            for (var i = 0; i < objData.data.length; i++) {
                var item = objData.data[i];
                if (item.ma == 'TY_LE_BOI_THUONG') {
                    if (item.gia_tri < 0 || item.gia_tri > 100) {
                        _notifyService.error("Tỷ lệ bồi thường toàn bộ nằm trong khoảng 0 đến 100%");
                        return;
                    }
                }
                if (item.ma == 'UOC_TON_THAT_BCGD') {
                    item.gia_tri = item.gia_tri.replace(/[^0-9]+/g, '');
                }
            }
            _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin cấu hình bồi thường này không?", "", () => {
                _carConfigurationService.luuThongTinCauHinhBoiThuong(objData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin thành công");
                        _carConfigurationService.xemCauHinhBoiThuong(objData).then(res => {
                            objCauHinh = res.data_info;
                            ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                                if (res.data_info.ds_ngay.length > 0) {
                                    getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                                }
                            });
                        });
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            });
        } else if (nvCauHinhBT == 'XE_MAY') {
            var objData = {
                ma_doi_tac: $("#escs_ma_doi_tac").val(),
                ngay_ad: $("#tblDsNgayCHBT a.active").attr("data-ngay"),
                nv: nvCauHinhBT,
                data: getDataTableCauHinhBoiThuongXM()
            }
            for (var i = 0; i < objData.data.length; i++) {
                var item = objData.data[i];
                if (item.ma == 'TY_LE_BOI_THUONG') {
                    if (item.gia_tri < 0 || item.gia_tri > 100) {
                        _notifyService.error("Tỷ lệ bồi thường toàn bộ nằm trong khoảng 0 đến 100%");
                        return;
                    }
                }
                if (item.ma == 'UOC_TON_THAT_BCGD') {
                    item.gia_tri = item.gia_tri.replace(/[^0-9]+/g, '');
                }
            }
            _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin cấu hình bồi thường này không?", "", () => {
                _carConfigurationService.luuThongTinCauHinhBoiThuong(objData).then(res => {
                    if (res.state_info.status === "OK") {
                        _notifyService.success("Lưu thông tin thành công");
                        _carConfigurationService.xemCauHinhBoiThuong(objData).then(res => {
                            objCauHinh = res.data_info;
                            ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                                if (res.data_info.ds_ngay.length > 0) {
                                    getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                                }
                            });
                        });
                    } else {
                        _notifyService.error(res.state_info.message_body);
                    }
                });
            });
        }
    });
    // Xóa thông tin cấu hình chung
    $("#btnXoaCauHinhBoiThuong").click(function () {
        var objData = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: $("#tblDsNgayCHBT tr.active").attr("data-val"),
            nv: $("#navCauHinhBoiThuong a.active").attr("data-val")
        }
        _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?", "", val => {
            _carConfigurationService.xoaCauHinhBoiThuong(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa cấu hình thành công");
                    _carConfigurationService.xemCauHinhBoiThuong(objData).then(res => {
                        objCauHinh = res.data_info;
                        ESUtil.genHTML("tblDsNgayCauHinhBoiThuong_template", "tblDsNgayCHBT", { ds_ngay_ad: res.data_info.ds_ngay }, () => {
                            if (res.data_info.ds_ngay.length > 0) {
                                getDetailCompensation(res.data_info.ds_ngay[0].ngay_ad);
                            }
                        });
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    // Chọn loại hồ sơ
    $("#btnChonLoaiHSGT").click(function () {
        var target = _modalLoaiHSGT.target;
        var val = $("#modalLoaiHSGTDanhSach .modalChonLoaiHSGTItem:checked").val();
        if (val != undefined && val != null) {
            $(target).attr("data-val", val);
            var data = arrLoaiHSGT.where(n => n.ma == val).firstOrDefault();
            $(target).html(data.ten);
            $(target).attr("data-val", data.ma);
        }
        _modalLoaiHSGT.hide();
    });
    $("#btnBoChonLoaiHSGT").click(function () {
        var target = _modalLoaiHSGT.target;
        $(target).attr("data-val", "");
        $(target).html("Chọn loại hồ sơ");
        _modalLoaiHSGT.hide();
    });
    // Lưu thông tin hồ sơ
    $("#btnLuuHoSo").click(function () {
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            nv: $("#navCauHinhHoSoChungTu a.active").attr('data-val'),
            ngay_ad: $("#tblDsNgayHoSo a.active").attr('data-ngay'),
            buoc: $("#tblDsCacBuoc a.active").attr('data-buoc'),
            data: getDataTableHS()
        };
        _carConfigurationService.luuThongTinHoSoChungTu(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin thành công");
            getDetailHoSoGiayTo(obj.buoc);
        });
    });
    //Xóa thông tin hồ sơ 
    $("#btnXoaHoSo").click(function () {
        var objData = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            nv: $("#navCauHinhHoSoChungTu a.active").attr('data-val'),
            ngay_ad: $("#tblDsNgayHoSo a.active").attr('data-ngay'),
            buoc: $("#tblDsCacBuoc a.active").attr('data-buoc')
        };
        _notifyService.confirmDelete("Bạn có chắc muốn xóa thông tin này không?", "", val => {
            _carConfigurationService.xoaCauHinhHoSo(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Xóa thông tin thành công");
                    onChangeCauHinhHoSoGiayTo(objData.nv);
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    //Thêm ngày áp dụng 
    $("#btnThemNgayApDungHS").click(function () {
        _modalThemNgayApDungHSCT.show();
    });
    $("#btnLuuThemNgayApDungCauHinhHSCT").click(function () {
       

        var arrNgay = [];
        var obj = _frmThemNgayApDungHSCT.getJsonData();
        obj.ma_doi_tac = $("#escs_ma_doi_tac").val();
        obj.ngay_ad_hthi = obj.ngay_ad.numberToDate();
        $("#tblDsNgayHoSo a.item-ngay_ad").each(function (e) {
            var value = parseInt($(this).attr('data-ngay'));
            arrNgay.push(value);
        });
        if (arrNgay.indexOf(obj.ngay_ad) !== -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var arr = objCauHinh.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhHoSoCT_template", "tblDsNgayHoSo", { ds_ngay_ad: arr }, () => {
            getListBuoc(obj.ngay_ad);
        });
        _modalThemNgayApDungHSCT.hide();
    });
    //---------Cấu hình SLA-------------
    $('#btnOpenInputThemNgayCHSLA').click(function () {
        var arr = getDataTableCauHinhSLA();
        arrCloneSLA = arr.clone();
        $('.item-ngay_ad').removeClass("text-danger");
        ESUtil.genHTML("tblCauHinhSLATemplate", "tblCauHinhSLA", { data: [] });
        $('#divInputThemNgayCHSLA').show();
        $('#divThemMoiNgayCHSLA').hide();
    });
    $('#btnDongNgayCHSLA').click(function () {
        getDetailCauHinhSLA(objCauHinhSLA.ds_ngay[0].ngay_ad);
        $('#divInputThemNgayCHSLA').hide();
        $('#divThemMoiNgayCHSLA').show();
    });
    $('#btnThemNgayCHSLA').click(function () {
        var arrNgay = [];
        $("#tblDsNgayCauHinhSLA tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_sla').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: ngay_new.dateToNumber(),
            ngay_ad_hthi: ngay_new
        }
        var arr = objCauHinhSLA.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: arr }, () => {
            getDetailCauHinhSLA(obj.ngay_ad);
            $('#divInputThemNgayCHSLA').hide();
            $('#divThemMoiNgayCHSLA').show();
        });
    });
    $("#btnLuuCauHinhSLA").click(function () {
        if (_frmCauHinhSLA.isValid()) {
            var obj = _frmCauHinhSLA.getJsonData();
            obj.ngay_ad = $("#tblDsNgayCauHinhSLA tr.active").attr('data-val');
            obj.so_id = $("#tblDsNgayCauHinhSLA tr.active").attr('data-so-id');
            obj.arr = getDataTableCauHinhSLA();

            for (var i = 0; i < obj.arr.length; i++) {
                if (obj.arr[i].tien_tu == 0 && obj.arr[i].tien_toi == 0) {
                    _notifyService.error("Bạn nhập thiếu thông tin hoặc thông tin không hợp lệ dòng " + (i + 1));
                    return;
                }
            }
            _carConfigurationService.luuThongTinCauHinhSLA(obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //--Code cấu hình phân công theo địa bàn
    $("#inputTimKiemTinhThanh").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#modalCHDanhSachTinhThanh .divItemTinhThanh").removeClass("d-none");
        if (val != "") {
            $("#modalCHDanhSachTinhThanh .divItemTinhThanh").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHDanhSachTinhThanh .divItemTinhThanh[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#inputTimKiemQuanHuyen").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#modalCHDanhSachQuanHuyen .divItemQuanHuyen").removeClass("d-none");
        if (val != "") {
            $("#modalCHDanhSachQuanHuyen .divItemQuanHuyen").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHDanhSachQuanHuyen .divItemQuanHuyen[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#inputTimKiemDonViXuLy").keyup(ESUtil.delay(function (e) {
        var val = $(this).val().trim();
        $("#modalCHDanhSachDonViXuLy .divItemDonViXuLy").removeClass("d-none");
        if (val != "") {
            $("#modalCHDanhSachDonViXuLy .divItemDonViXuLy").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHDanhSachDonViXuLy .divItemDonViXuLy[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#btnThemMoiPhanCong").click(function () {
        $("#navCauHinhPhanCongDiaBanGD li a").removeClass("active");
        $("#tabCauHinhPhanCongDiaBanGDXeOTo").addClass("active");
        bindTinhThanh();
        bindChiNhanh();
        bindQuanHuyen([]);
        $("#btnLuuCauHinh").removeClass('d-none');
        $("#btnXemDanhSach").removeClass('d-none');
        $("#btnThemMoiPhanCong").addClass('d-none');
        $(".modal-user-log").html("");
        $(".tabCauHinhPhanCongTheoDiaBan").removeClass('d-none');
        $(".tabDanhSachCauHinh").addClass('d-none');
    });
    $("#btnLuuCauHinh").click(function () {
        var arrTinhThanh = layDanhSachTinhThanhCauHinh();
        var arrQuanHuyen = layDanhSachQuanHuyenCauHinh();
        var arrDviXuLy = layDanhSachDviXulyCauHinh();
        var arr = [];
        if (arrTinhThanh.length == 0) {
            _notifyService.error("Bạn chưa chọn tỉnh thành!");
            return;
        }
        if (arrQuanHuyen.length == 0) {
            _notifyService.error("Bạn chưa chọn quận huyện!");
            return;
        }
        if (arrDviXuLy.length == 0) {
            _notifyService.error("Bạn chưa chọn đơn vị xử lý!");
            return;
        }
        for (var i = 0; i < arrTinhThanh.length; i++) {
            for (var j = 0; j < arrQuanHuyen.length; j++) {
                for (var k = 0; k < arrDviXuLy.length; k++) {
                    var obj = {
                        ma_tinh: arrTinhThanh[i],
                        ma_quan: arrQuanHuyen[j],
                        ma_chi_nhanh_bt: arrDviXuLy[k]
                    }
                    arr.push(obj);
                }
            }
        }
        var objData = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            nv: $("#navCauHinhPhanCongDiaBanGD li a.active").attr("data-val"),
            data: arr
        }
        _carConfigurationService.luuThongTinPhanCong(objData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Lưu thông tin thành công");
                $("#btnLuuCauHinh").addClass('d-none');
                $("#btnXemDanhSach").addClass('d-none');
                $("#btnThemMoiPhanCong").removeClass('d-none');
                $(".tabCauHinhPhanCongTheoDiaBan").addClass('d-none');
                $(".tabDanhSachCauHinh").removeClass('d-none');
                getPagingCauHinhPhanCong(1);
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $("#btnXemDanhSach").click(function () {
        $("#btnXemDanhSach").addClass('d-none');
        $("#btnLuuCauHinh").addClass('d-none');
        $("#btnThemMoiPhanCong").removeClass('d-none');
        $(".tabCauHinhPhanCongTheoDiaBan").addClass('d-none');
        $(".tabDanhSachCauHinh").removeClass('d-none');
        getPagingCauHinhPhanCong(1);
    });
    //Cấu hình phê duyệt giá
    $("#btnThemNgayADDuyetGiaTuDong").click(function () {
        _modalCHPheDuyetGiaTuDongNhapNgayAD.show();
    });
    $("#btnLuuCHPheDuyetGiaTuDongNhapNgayAD").click(function () {
        var obj = _frmCHPheDuyetGiaTuDongNhapNgayAD.getJsonData();
        _carConfigurationService.luuCHDuyetGiaTuDongNgayAD(obj).then(res => {
            if (res.state_info.status != "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _carConfigurationService.layDsNgayADDuyetGiaTuDong().then(resDetail => {
                if (resDetail.state_info.status != "OK") {
                    _notifyService.error(resDetail.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("modalCHPheDuyetGiaTuDongNgayADTemplate", "modalCHPheDuyetGiaTuDongNgayAD", { data: resDetail.data_info }, () => {
                    $("#modalCHPheDuyetGiaTuDongNgayAD a.nav-link").removeClass("active");
                    $("#modalCHPheDuyetGiaTuDongNgayAD a[data_ngay_ad='" + obj.ngay_ad + "']").addClass("active");
                    layChiTietCHDuyetGiaTuDong(obj.ngay_ad);
                });
                hienThiTabCHDuyetGia("tabCHDonViGaraHangXeHieuXe");
            });
            _modalCHPheDuyetGiaTuDongNhapNgayAD.hide();
        });
    });
    $("#btnLuuCauHinhDuyetGia").click(function () {
        var id = $("#modalCHPheDuyetGiaTuDongTabList a.active").attr("id");
        if (id == "tabCHDonViGaraHangXeHieuXeMenu") {
            var obj = {
                ngay_ad: 0,
                ma_chi_nhanh: [],
                so_tien: [],
                gara: [],
                hang_xe: [],
                hieu_xe: []
            }
            obj.ngay_ad = $("#modalCHPheDuyetGiaTuDongNgayAD a.active").attr("data_ngay_ad");
            obj.ma_chi_nhanh = layDviCHDuyetGia();
            obj.so_tien = layDviSoTienCHDuyetGia();
            obj.gara = layGaraCHDuyetGia();
            obj.hang_xe = layHangXeCHDuyetGia();
            obj.hieu_xe = layHieuXeCHDuyetGia();

            _carConfigurationService.luuCHDuyetGiaDanhMuc(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin cấu hình thành công");
            });
        }
        if (id == "tabCHHangMucMucDoGiaMenu") {
            var obj = {
                ngay_ad: $("#modalCHPheDuyetGiaTuDongNgayAD a.active").attr("data_ngay_ad"),
                hm: layDuLieuHangMucCHDGNhap()
            }
            _carConfigurationService.luuDuLieuHangMucCHDGNhap(obj).then(res => {
                if (res.state_info.status != "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.success("Lưu thông tin cấu hình thành công");
            });
        }
    });
    $("#modalCHPheDuyetGiaTuDongDviADTkiem").keyup(ESUtil.delay(function (e) {
        var val = $("#modalCHPheDuyetGiaTuDongDviADTkiem").val().trim();
        $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetGiaTuDongDviAD .modalCHPheDuyetGiaTuDongDviADItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetGiaTuDongGaraADTkiem").keyup(ESUtil.delay(function (e) {
        $("#chkHienThiGaraAD").prop("checked", false);
        var val = $("#modalCHPheDuyetGiaTuDongGaraADTkiem").val().trim();
        $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetGiaTuDongGaraAD .modalCHPheDuyetGiaTuDongGaraItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetGiaTuDongHangHieuXeADTkiem").keyup(ESUtil.delay(function (e) {
        $("#chkHienThiHangHieuXeAD").prop("checked", false);
        var val = $("#modalCHPheDuyetGiaTuDongHangHieuXeADTkiem").val().trim();
        $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem").removeClass("d-none");
        if (val != "") {
            $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem").addClass("d-none");
            var textSearch = ESUtil.xoaKhoangTrangText(val);
            $("#modalCHPheDuyetGiaTuDongHangHieuXeAD .modalCHPheDuyetGiaTuDongHangHieuXeItem[data-search*=" + textSearch + "]").removeClass("d-none");
        }
    }, 300));
    $("#modalCHPheDuyetGiaChonHangHieuXe_Chon").click(function () {
        $("#chdg_arr_hang_xe").val("");
        $("#chdg_arr_hieu_xe").val("");
        var hang_xe = "";
        var hieu_xe = "";
        $("#modalCHPheDuyetGiaChonHangHieuXeContent input[type='checkbox']:checked").each((i, el) => {
            if (i == 0) {
                hang_xe = $(el).attr("data_hang_xe");
                hieu_xe = $(el).attr("data_hieu_xe");
            }
            else {
                hang_xe += ";" + $(el).attr("data_hang_xe");
                hieu_xe += ";" + $(el).attr("data_hieu_xe");
            }
        })
        $("#chdg_arr_hang_xe").val(hang_xe);
        $("#chdg_arr_hieu_xe").val(hieu_xe);
        _modalCHPheDuyetGiaChonHangHieuXe.hide();

        layDSHangMucCHDGNhap();
    });
    $("#modalCHPheDuyetGiaChonMDTT_Chon").click(function () {
        $("#chdg_arr_muc_do_tt").val("");
        var muc_do_tt = "";
        $("#modalCHPheDuyetGiaChonMDTTContent input[type='checkbox']:checked").each((i, el) => {
            if (i == 0) {
                muc_do_tt = $(el).val();
            }
            else {
                muc_do_tt += ";" + $(el).val();
            }
        })
        $("#chdg_arr_muc_do_tt").val(muc_do_tt);
        _modalCHPheDuyetGiaChonMDTT.hide();
        layDSHangMucCHDGNhap();
    });
    $("#modalCHPheDuyetGiaChonHangMuc_Chon").click(function () {
        _modalHangMucTonThat.hide();
        layDSHangMucCHDGNhap();
    });
    $("#modalCHPheDuyetGiaTuDongDsDaCauHinh").click(function () {
        $(".tabCHHangMucMucDoGia_Nhap").addClass("d-none");
        $("#modalCHPheDuyetGiaTuDongDsDaCauHinh").addClass("d-none");
        $("#modalCHPheDuyetGiaTuDongDsDaCauHinh_Them").removeClass("d-none");
        getPagingDsCauHinhDuyetGia(1);
    });
    $("#modalCHPheDuyetGiaTuDongDsDaCauHinh_Them").click(function () {
        $(".tabCHHangMucMucDoGia_Nhap").removeClass("d-none");
        $("#tableHangMucGiaTuDongBody_pagination").addClass("d-none");
        $("#modalCHPheDuyetGiaTuDongDsDaCauHinh").removeClass("d-none");
        $("#modalCHPheDuyetGiaTuDongDsDaCauHinh_Them").addClass("d-none");
        ESUtil.genHTML("tableHangMucGiaTuDongBodyTemplate", "tableHangMucGiaTuDongBody", { data: [] });
    });
    //huynq 2022
    $("#btnLuuCHBenGDMD_MQH").click(function () {
        if (_frmCHBenGDMD_MQH.isValid()) {
            var formData = _frmCHBenGDMD_MQH.getJsonData();
            _carConfigurationService.luuThongTinCHBenGDMD(formData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin cấu hình thành công.");
                    layCauHinhBenThamGiaGiamDinh(formData.nv);
                    _modalCHBenGDMD_MQH.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    //Cấu hình xử lý hồ sơ
    $("#btnThemNgayXuLyBoiThuong").click(function () {
        _modalThemNgayApDungXLBT.show();
    });
    $('#btnThemNgayCHSLA').click(function () {
        var arrNgay = [];
        $("#tblDsNgayCauHinhSLA tr.item-ngay_ad").each(function (e) {
            var value = $(this).find('td').html();
            arrNgay.push(value);
        });
        var ngay_new = $('#ngayad_sla').val();
        if (arrNgay.indexOf(ngay_new) != -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        }
        var obj = {
            ma_doi_tac: $("#escs_ma_doi_tac").val(),
            ngay_ad: ngay_new.dateToNumber(),
            ngay_ad_hthi: ngay_new
        }
        var arr = objCauHinhSLA.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhSLA_template", "tblDsNgayCauHinhSLA", { ds_ngay_ad: arr }, () => {
            getDetailCauHinhSLA(obj.ngay_ad);
            $('#divInputThemNgayCHSLA').hide();
            $('#divThemMoiNgayCHSLA').show();
        });
    });
    $("#btnLuuThemNgayApDungCauHinhXLBT").click(function () {
        var arrNgay = [];
        var obj = _frmThemNgayApDungXLBT.getJsonData();
        obj.ma_doi_tac = $("#escs_ma_doi_tac").val();
        obj.ngay_ad_hthi = obj.ngay_ad.numberToDate();
        obj.ma_chi_nhanh = _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").val();
        obj.nv = $("#navCauHinhXuLy a.active").attr("data-val");
        $("#tblDsNgayCauHinhXLBT a.item-ngay_ad").each(function (e) {
            var value = parseInt($(this).attr('data-ngay'));
            arrNgay.push(value);
        });
        if (arrNgay.indexOf(obj.ngay_ad) !== -1) {
            _notifyService.error('Ngày áp dụng đã tồn tại');
            return;
        } 
        var arr = objCauHinh.ds_ngay;
        arr.push(obj);
        ESUtil.genHTML("tblDsNgayCauHinhXLBT_template", "tblDsNgayCauHinhXLBT", { ds_ngay_ad: arr }, () => {
            getDetailCauHinhXuLy(obj.ngay_ad, obj.ma_chi_nhanh, obj.nv);
        });
        _modalThemNgayApDungXLBT.hide();
    });
    //Lưu cấu hình xử lý hồ sơ
    $("#btnLuuCauHinhXuLyBoiThuong").click(function () {
        var obj = {
            ma_doi_tac: ESCS_MA_DOI_TAC,
            ma_chi_nhanh: _frmCauHinhXuLyBoiThuong.getControl("ma_chi_nhanh").val(),
            ngay_ad: $("#tblDsNgayCauHinhXLBT a.active").attr('data-ngay'),
        };
        var nv = $("#navCauHinhXuLy a.active").attr("data-val");
        if (nv == "XE") {
            obj.data = getDataTableCHXLyBoiThuongXe()
            obj.nv = "XE";
        }
        if (nv == "XE_MAY") {
            obj.data = getDataTableCHXLyBoiThuongXeMay()
            obj.nv = "XE_MAY";
        }
        _carConfigurationService.luuThongTinCauHinhXuLy(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Lưu thông tin thành công");
            getDetailCauHinhXuLy(obj.ngay_ad, obj.ma_chi_nhanh, obj.nv);
        });
    });
});