var _service = new DashboardService();
var _frmSearch = new FormService("frmSearch");
var _frmTimKiemHoSoTon = new FormService("frmTimKiemHoSoTon");
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _userManagementService = new UserManagementService();
var _carCompensationService = new CarCompensationService();

var _modalDanhSachHoSoTon = new ModalService("modalDanhSachHoSoTon");
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var objDanhMuc = {};

function getPaging(trang, callback = undefined) {
    var objTimKiem = _frmTimKiemHoSoTon.getJsonData();
    objTimKiem.trang = trang;
    var so_dong = 12;
    var dau = (trang - 1) * so_dong;
    var cuoi = trang * so_dong;
    _service.layThongTinChiTietHoSoDashBoard(objTimKiem).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info;
        var tong_so_dong = data.length;
        var arr = data.where((item, i) => i >= dau && i <= cuoi);
        if (data !== undefined && data !== null && data.length > 0) {
            ESUtil.genHTML("tblDanhSachHoSoTon_template", "tblDanhSachHoSoTon", { data: arr });
        } else {
            ESUtil.genHTML("tblDanhSachHoSoTon_template", "tblDanhSachHoSoTon", { data: [] });
        }
        $("#tblDanhSachHoSoTon_pagination").html(ESUtil.pagingHTML("getPaging", trang, tong_so_dong, so_dong));
        if (callback) {
            callback(res);
        }
    });
}
function layThongTin() {
    var objJson = _frmSearch.getJsonData();
    _service.layThongTinDashboard_xe(objJson).then(res => {
        genPieChart(res.data_info.trang_thai);
        genSplineChart(res.data_info.xu_ly, objJson.nhom);
        genHoSoTon(res.data_info);
        genTonGiamDinh(res.data_info);
        genTonBoiThuong(res.data_info);
        genTonHienTruong(res.data_info);
        genTongSo(res.data_info.tong_so);
    });
}

function genPieChart(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'sl', 'y'));

    Highcharts.chart('visitor1', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 320,
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.y} hồ sơ</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>'
                },
                //showInLegend: true
            }
        },
        series: [{
            name: 'Hồ sơ',
            //colorByPoint: true,
            data: data
        }]
    });
}

function genSplineChart(data,type) {
    var arrDGQ = [];
    var arrCGQ = [];
    var arrTitle = [];
    _.forEach(data, function (item, index) {
        arrDGQ.push(item.sl_dgq);
        arrCGQ.push(item.sl_cgq);

        if (type == 'THANG') {
            var year = item.thoi_gian.toString().substr(0, 4);
            var month = _.trimStart(item.thoi_gian.toString().substr(4, 6), '0');
            arrTitle.push('Tháng ' + month + '/' + year);
        } else if (type == 'NAM') {
            arrTitle.push('Năm ' + item.thoi_gian);
        } else if (type == 'TUAN') {
            arrTitle.push('Tuần ' + item.thoi_gian.toString().substr(4, 6) + "/" + item.thoi_gian.toString().substr(0, 4));
        }
    });

    Highcharts.chart('container', {
        chart: {
            type: 'areaspline',
            height: 320,
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 150,
            y: 100,
            floating: true,
            borderWidth: 1,
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
        },
        xAxis: {
            categories: arrTitle,
            labels: {
                rotation: 45
            }
        },
        yAxis: {
            title: {
                text: 'Số lượng hồ sơ'
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' hồ sơ'
        },
        credits: {
            enabled: false
        },
        plotOptions: {
            areaspline: {
                fillOpacity: 0.1
            },
            series: {
                marker: {
                    symbol: 'circle'
                }
            }
        },
        series: [{
            name: 'Đã giải quyết',
            color: 'rgb(30, 136, 229)',
            data: arrDGQ
        }, {
            name: 'Chưa giải quyết',
            color: 'rgb(38, 198, 218)',
            data: arrCGQ
        }]
    });
}

function genHoSoTon(data) {
    ESUtil.genHTML("hoSoTon_template", "hoSoTon", data);
}

function genTonGiamDinh(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_GIAM_DINH");
    ESUtil.genHTML("tonGiamDinh_template", "tonGiamDinh", { "data": data});
}

function genTonBoiThuong(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_BOI_THUONG");
    ESUtil.genHTML("tonBoiThuong_template", "tonBoiThuong", { "data": data });
}

function genTonHienTruong(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_GIAM_DINH_HT");
    ESUtil.genHTML("tonHienTruong_template", "tonHienTruong", { "data": data });
}

function genTongSo(data) {
    var tong_ho_so = tong_ho_so_tien = 0;
    _.forEach(data, function (item, index) {
        tong_ho_so += item.sl;
        tong_ho_so_tien += item.tien;
    });
    $('#tong_ho_so').html(tong_ho_so);
    $('#tong_ho_so_tien').html(ESUtil.formatMoney(tong_ho_so_tien));

    var json = data.where(n => n.trang_thai_ton === "DA_GIAI_QUYET").firstOrDefault();
    $('#da_giai_quyet').html(json.sl);
    $('#da_giai_quyet_tien').html(ESUtil.formatMoney(json.tien));
    $('#chua_giai_quyet').html(tong_ho_so - json.sl);
    $('#chua_giai_quyet_tien').html(ESUtil.formatMoney(tong_ho_so_tien - json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_GIAM_DINH").firstOrDefault();
    $('#ton_giam_dinh').html(json.sl);
    $('#ton_giam_dinh_tien').html(ESUtil.formatMoney(json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_BOI_THUONG").firstOrDefault();
    $('#ton_boi_thuong').html(json.sl);
    $('#ton_boi_thuong_tien').html(ESUtil.formatMoney(json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_GIAM_DINH_HT").firstOrDefault();
    $('#ton_hien_truong').html(json.sl);
    $('#ton_hien_truong_tien').html(ESUtil.formatMoney(json.tien));
}

function openModalHoSoTon(nsd, trang_thai_ton, stt, el) {
    var obj = {
        ma_doi_tac: ESCS_MA_DOI_TAC,
        ma_chi_nhanh: _frmSearch.getControl("ma_chi_nhanh").getValue(),
        nhom: _frmSearch.getControl("nhom").getValue(),
        ma_nsd: nsd,
        trang_thai_ton: trang_thai_ton,
        stt: stt
    }
    $(".ma_nsd").removeClass("d-none");
    $(".khung").addClass("d-none");
    if (trang_thai_ton == 'TON_NGAY') {
        $(".khung").removeClass("d-none");
        $(".ma_nsd").addClass("d-none");
    }
    _frmTimKiemHoSoTon.clearErrorMessage();
    _frmTimKiemHoSoTon.setData(obj);
    getPaging(1);
    _modalDanhSachHoSoTon.show();
}
$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("HUONG_DAN_CHUNG_XE");
    _service.base.all([
        _partnerListService.layDsDoiTacQTHT(),
        _branchListService.layDsChiNhanhQTHT(),
        _userManagementService.layDsNSD(),
        _service.getCauHinhDashboard()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.can_bo = arrRes[2].data_info;
        objDanhMuc.cau_hinh_dashboard = arrRes[3].data_info;
        ESUtil.anHienDashboard(objDanhMuc.cau_hinh_dashboard);

        _frmSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", objDanhMuc.doi_tac[0].ma);
        _frmTimKiemHoSoTon.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", objDanhMuc.doi_tac[0].ma);
        _frmTimKiemHoSoTon.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSearch.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSearch.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmSearch.getControl("ma_chi_nhanh").setValue("");
            layThongTin();
        });
        _frmSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmSearch.getControl("ma_doi_tac").trigger("select2:select");

        _frmTimKiemHoSoTon.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", objDanhMuc.doi_tac[0].ma);
        _frmTimKiemHoSoTon.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmTimKiemHoSoTon.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmTimKiemHoSoTon.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmTimKiemHoSoTon.getControl("ma_chi_nhanh").setValue("");
        });
        _frmTimKiemHoSoTon.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmTimKiemHoSoTon.getControl("ma_doi_tac").trigger("select2:select");

        _frmTimKiemHoSoTon.getControl("ma_nsd").setDataSource(objDanhMuc.can_bo, "ten", "ma", "Chọn cán bộ", "");

        layThongTin();
    });

    _frmSearch.getControl("nhom").addEventChange(type => {
        layThongTin();
    });
    _frmSearch.getControl("ma_chi_nhanh").addEventChange(type => {
        layThongTin();
    });

    _frmTimKiemHoSoTon.getControl("ma_chi_nhanh").addEventChange(val => {
        getPaging(1);
    });

    _frmTimKiemHoSoTon.getControl("nhom").addEventChange(val => {
        getPaging(1);
    });

    _frmTimKiemHoSoTon.getControl("ma_nsd").addEventChange(val => {
        getPaging(1);
    });

    _frmTimKiemHoSoTon.getControl("stt").addEventChange(val => {
        getPaging(1);
    });
    _frmTimKiemHoSoTon.getControl("trang_thai_ton").addEventChange(val => {
        if (val == "TON_NGAY") {
            $(".khung").removeClass("d-none");
            $(".ma_nsd").addClass("d-none");
            _frmTimKiemHoSoTon.getControl("ma_nsd").setValue("");
        } else {
            $(".khung").addClass("d-none");
            $(".ma_nsd").removeClass("d-none");
        }
        getPaging(1);
    });
});