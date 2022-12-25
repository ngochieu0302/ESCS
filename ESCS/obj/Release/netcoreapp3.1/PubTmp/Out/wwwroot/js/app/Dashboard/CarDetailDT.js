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
    _service.layThongTinChiTietDashboardDT(objJson).then(res => {
        ESUtil.genHTML('tong_hop_template', 'tong_hop', { data: res.data_info.tong_hop });
        ESUtil.genHTML('top_30_hang_muc_template', 'top_30_hang_muc', { data: res.data_info.top_hang_muc_pie });

        genChartMucDichSdPie(res.data_info.muc_dich_sd_pie);
        genChartTuoiXePie(res.data_info.tuoi_xe_pie);
        genChartLoaiXePie(res.data_info.loai_xe_pie);
        genChartKhuVucBar(res.data_info.khu_vuc_bar);
        genChatHangXeBubble(res.data_info.top_hang_xe_bubble);
        genChatHieuXeBubble(res.data_info.top_hieu_xe_bubble);
        genChartNguyenNhanPie(res.data_info.nguyen_nhan_pie);
    });
}

function genChartMucDichSdPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'md_sd', 'name'));

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
    Highcharts.chart('muc_dich_sd_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng hồ sơ theo mục đích sử dụng'
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

function genChartTuoiXePie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'tuoi', 'name'));

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
    Highcharts.chart('tuoi_xe_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng hồ sơ theo độ tuổi xe'
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

function genChartLoaiXePie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'loai_xe', 'name'));

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
    Highcharts.chart('loai_xe_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng hồ sơ theo loại xe'
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

function genChartKhuVucBar(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'tien', 'y'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));

    var arrThang = [];
    $.each(data, (index, item) => {
        arrThang.push(item.name);
    });

    Highcharts.chart('khu_vuc_bar', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Phân tích tần suất theo khu vực tỉnh thành'
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
                '<td style="padding:0;font-weight:bold">{point.sl}</td></tr></table>',
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

function genChatHangXeBubble(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'tien', 'x'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'so_luong', 'y'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'hang_xe', 'name'));

    var arrData = [];
    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            x: item.x,
            y: item.y,
            tien: ESUtil.formatMoney(item.x)
        }
        arrData.push(obj);
    });

    Highcharts.chart('top_hang_xe_bubble', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Top 10 hãng xe thường xuyên xảy ra tổn thất'
        },

        subtitle: {
            text: ''
        },

        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, số tiền: {point.x}, số lượng: {point.y}.'
            }
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: ''
            },
            labels: {
                format: '{value}',
                formatter: function () {
                    return ESUtil.formatMoney(this.value) + '  .';
                }
            },
            accessibility: {
                rangeDescription: ''
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Số lượng hồ sơ'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.2,
            accessibility: {
                rangeDescription: ''
            }
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                '<tr><th>Số lượng hồ sơ:</th><td>{point.y}</td></tr>' +
                '<tr><th>Số tiền:</th><td>{point.tien}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            type: 'bubble',
            minSize: 40,
            maxSize: 40,
            sizeBy: 'width',
            data: arrData
        }]

    });
}

function genChatHieuXeBubble(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'tien', 'x'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'so_luong', 'y'));
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'hieu_xe', 'name'));

    var arrData = [];
    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            x: item.x,
            y: item.y,
            tien: ESUtil.formatMoney(item.x)
        }
        arrData.push(obj);
    });

    Highcharts.chart('top_hieu_xe_bubble', {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Top 30 hiệu xe thường xuyên xảy ra tổn thất'
        },

        subtitle: {
            text: ''
        },

        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.name}, số tiền: {point.x}, số luọng: {point.y}.'
            }
        },

        xAxis: {
            gridLineWidth: 1,
            title: {
                text: ''
            },
            labels: {
                format: '{value}',
                formatter: function () {
                    return ESUtil.formatMoney(this.value) + '  .';
                }
            },
            //plotLines: [{
            //    color: 'black',
            //    dashStyle: 'dot',
            //    width: 2,
            //    value: 65,
            //    label: {
            //        rotation: 0,
            //        y: 15,
            //        style: {
            //            fontStyle: 'italic'
            //        },
            //        text: 'Safe fat intake 65g/day'
            //    },
            //    zIndex: 3
            //}],
            accessibility: {
                rangeDescription: ''
            }
        },

        yAxis: {
            startOnTick: false,
            endOnTick: false,
            title: {
                text: 'Số lượng hồ sơ'
            },
            labels: {
                format: '{value}'
            },
            maxPadding: 0.2,
            //plotLines: [{
            //    color: 'black',
            //    dashStyle: 'dot',
            //    width: 2,
            //    value: 50,
            //    label: {
            //        align: 'right',
            //        style: {
            //            fontStyle: 'italic'
            //        },
            //        text: 'Safe sugar intake 50g/day',
            //        x: -10
            //    },
            //    zIndex: 3
            //}],
            accessibility: {
                rangeDescription: ''
            }
        },

        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><th colspan="2"><h3>{point.name}</h3></th></tr>' +
                '<tr><th>Số lượng hồ sơ:</th><td>{point.y}</td></tr>' +
                '<tr><th>Số tiền:</th><td>{point.tien}</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}'
                }
            }
        },

        series: [{
            type: 'bubble',
            minSize: 40,
            maxSize: 40,
            sizeBy: 'width',
            data: arrData
        }]

    });
}

function genChartNguyenNhanPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'nhom_nguyen_nhan', 'name'));

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
    Highcharts.chart('nguyen_nhan_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tỷ trọng hồ sơ theo nguyên nhân tổn thất'
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