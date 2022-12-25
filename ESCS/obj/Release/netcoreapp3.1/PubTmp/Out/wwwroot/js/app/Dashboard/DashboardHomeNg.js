var _service = new DashboardService();
var _frmSearch = new FormService("frmSearch");
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
var objDanhMuc = {};
function layThongTin() {
    var objJson = _frmSearch.getJsonData();
    _service.layThongTinDashboard_ng(objJson).then(res => {
        genPieChart(res.data_info.trang_thai);
        genSplineChart(res.data_info.xu_ly, objJson.nhom);
        genHoSoTon(res.data_info);
        genTonTiepNhan(res.data_info);
        genTonBoiThuong(res.data_info);
        genTonBaoLanh(res.data_info);
        genTongSo(res.data_info.tong_so);
    });
}

function genPieChart(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'sl', 'y'));

    Highcharts.chart('TonTheoTrangThai', {
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

function genSplineChart(data, type) {
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

    Highcharts.chart('TinhHinhXuLyHoSo', {
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
    ESUtil.genHTML("hoSoTonNg_template", "hoSoTonNg", data);
}

function genTonTiepNhan(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_TIEP_NHAN");
    ESUtil.genHTML("tonTiepNhan_template", "tonTiepNhan", { "data": data });
}

function genTonBoiThuong(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_BOI_THUONG");
    ESUtil.genHTML("tonBoiThuongNg_template", "tonBoiThuongNg", { "data": data });
}

function genTonBaoLanh(data) {
    var data = data.bo_phan.where(n => n.trang_thai_ton === "TON_BAO_LANH");
    ESUtil.genHTML("tonBaoLanh_template", "tonBaoLanh", { "data": data });
}

function genTongSo(data) {
    var tong_ho_so = tong_ho_so_tien = 0;
    _.forEach(data, function (item, index) {
        tong_ho_so += item.sl;
        tong_ho_so_tien += item.tien;
    });
    $('#tong_ho_so_ng').html(tong_ho_so);
    $('#tong_ho_so_tien_ng').html(ESUtil.formatMoney(tong_ho_so_tien));

    var json = data.where(n => n.trang_thai_ton === "DA_GIAI_QUYET").firstOrDefault();
    $('#da_giai_quyet_ng').html(json.sl);
    $('#da_giai_quyet_tien_ng').html(ESUtil.formatMoney(json.tien));
    $('#chua_giai_quyet_ng').html(tong_ho_so - json.sl);
    $('#chua_giai_quyet_tien_ng').html(ESUtil.formatMoney(tong_ho_so_tien - json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_TIEP_NHAN").firstOrDefault();
    $('#ton_tiep_nhan_ng').html(json.sl);
    $('#ton_tiep_nhan_tien_ng').html(ESUtil.formatMoney(json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_BOI_THUONG").firstOrDefault();
    $('#ton_boi_thuong_ng').html(json.sl);
    $('#ton_boi_thuong_tien_ng').html(ESUtil.formatMoney(json.tien));

    var json = data.where(n => n.trang_thai_ton === "TON_BAO_LANH").firstOrDefault();
    $('#ton_bao_lanh_ng').html(json.sl);
    $('#ton_bao_lanh_tien_ng').html(ESUtil.formatMoney(json.tien));
}

$(document).ready(function () {
    ESUtil.hienThiHuongDanSuDung("HUONG_DAN_CHUNG_NG");
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh(),
        _service.getCauHinhDashboard()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;
        objDanhMuc.cau_hinh_dashboard = arrRes[2].data_info;
        ESUtil.anHienDashboard(objDanhMuc.cau_hinh_dashboard);
        _frmSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", objDanhMuc.doi_tac[0].ma);
        _frmSearch.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSearch.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmSearch.getControl("ma_chi_nhanh").setValue("");
            layThongTin();
        });
        _frmSearch.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC);
        _frmSearch.getControl("ma_doi_tac").trigger("select2:select");
        layThongTin();
    });
    _frmSearch.getControl("nhom").addEventChange(type => {
        layThongTin();
    });
    _frmSearch.getControl("ma_chi_nhanh").addEventChange(type => {
        layThongTin();
    });

});