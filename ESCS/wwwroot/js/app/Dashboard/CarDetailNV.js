var _service = new DashboardService();
var _frmSearch = new FormService("frmSearch");
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var objDanhMuc = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_NSD = $("#escs_tai_khoan").val();
Highcharts.setOptions({
    colors: ["#1e88e5", "#26c6da", "#dc3545", "#ffc107", "#f15c80", "#7cb5ec", "#f45b5b", "#8085e9", "#e4d354", "#434348"],
    lang: {
        thousandsSep: ','
    }
});

function clearChart() {
    ESUtil.genHTML('tong_hop_template', 'tong_hop', { data: [] });
    ESUtil.genHTML('so_tien_list_template', 'so_tien_list', { data: [] });
    ESUtil.genHTML('top_10_list_template', 'top_10_list', { data: [] });
    $('#don_vi_bar, #nghiep_vu_pie, #thoi_gian_bar').html('');
}

function layThongTin(type) {
    var objJson = _frmSearch.getJsonData();
    _service.layThongTinChiTietDashboard(objJson).then(res => {
        ESUtil.genHTML('tong_hop_template', 'tong_hop', { data: res.data_info.tong_hop });
        ESUtil.genHTML('so_tien_list_template', 'so_tien_list', { data: res.data_info.so_tien_list });
        ESUtil.genHTML('top_10_list_template', 'top_10_list', { data: res.data_info.top_10_list });

        genChartDonViBar(res.data_info.don_vi_bar);
        genChartNghiepVuPie(res.data_info.nghiep_vu_pie);
        genChartThoiGianBar(res.data_info.thoi_gian_bar);
    });
}

function genChartDonViBar(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ma_chi_nhanh_ql', 'name'));
    var arrNamNay = [];
    var arrNamTruoc = [];
    var arrChiNhanh = [];
    $.each(data, (index, item) => {
        arrChiNhanh.push(item.name);
        var obj1 = {
            ten_cot: 'Số lượng năm nay',
            chi_nhanh: item.name,
            y: item.tien_nam_nay,
            so_luong: item.sl_nam_nay
        }
        var obj2 = {
            ten_cot: 'Số lượng năm trước',
            chi_nhanh: item.name,
            y: item.tien_nam_truoc,
            so_luong: item.sl_nam_truoc
        }
        arrNamNay.push(obj1);
        arrNamTruoc.push(obj2);
    });

    var bieu_do = Highcharts.chart('don_vi_bar', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Hồ sơ bồi thường theo đơn vị chi nhánh'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: arrChiNhanh,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'số tiền'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span>',
            pointFormat: '<table><tr><td style="padding:0">{series.name}: </td>' +
                '<td style="padding:0;font-weight:bold">{point.y}</td></tr></table>' + 
                '<table><tr><td style="padding:0">{point.ten_cot}: </td>' +
                '<td style="padding:0;font-weight:bold">{point.so_luong}</td></tr></table>',
            footerFormat: '',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Số tiền năm trước',
                data: arrNamTruoc
            },
            {
                name: 'Số tiền năm nay',
                data: arrNamNay
            }
        ]
    });
}

function genChartNghiepVuPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten_nv', 'name'));

    var tong_tien = 0;
    var arrData = [];
    $.each(data, (index, item) => {
        tong_tien += item.tien;
    });

    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            y: ((item.tien / tong_tien) * 100),
            so_tien: ESUtil.formatMoney(item.tien),
            so_luong: item.so_luong
        }
        arrData.push(obj);
    });

    // Build the chart
    Highcharts.chart('nghiep_vu_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng nghiệp vụ bồi thường'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>' + 
                        'Số tiền: <b>{point.so_tien}</b><br>' +
                        'Số lượng hồ sơ: <b>{point.so_luong}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>',
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            name: 'Tỷ trọng',
            data: arrData
        }]
    });
}

function genChartThoiGianBar(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'tien', 'y'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));

    var arrThang = [];
    $.each(data, (index, item) => {
        arrThang.push(item.thang);
    });

    Highcharts.chart('thoi_gian_bar', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Thống kê hồ sơ / tiền phát sinh theo thời gian'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: arrThang,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Số tiền'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span>',
            pointFormat: '<table><tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0;font-weight:bold">{point.y}</td></tr></table>' + 
                '<table><tr><td style="color:{series.color};padding:0">Số lượng hồ sơ: </td>' +
                '<td style="padding:0;font-weight:bold">{point.so_luong}</td></tr></table>',
            footerFormat: '',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Số tiền',
            data: data
        }]
    });
}

$(document).ready(function () {
    _service.base.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmSearch.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", objDanhMuc.doi_tac[0].ma);
        _frmSearch.getControl("ma_chi_nhanh").setDataSource([], "ten_tat", "ma", "Chọn chi nhánh", "");
        _frmSearch.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmSearch.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
            _frmSearch.getControl("ma_chi_nhanh").setValue("");
            layThongTin();
        });
        _frmSearch.getControl("ma_doi_tac").trigger("select2:select");
        layThongTin();
    });
    _frmSearch.getControl("nhom").addEventChange(type => {
        //clearChart();
        layThongTin();
    });
    _frmSearch.getControl("ma_chi_nhanh").addEventChange(type => {
        //clearChart();
        layThongTin();
    });
});