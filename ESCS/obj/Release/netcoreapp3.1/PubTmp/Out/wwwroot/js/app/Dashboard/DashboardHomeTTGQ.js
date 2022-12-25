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
    _service.layThongTinDashboardTTGQ(objJson).then(res => {
        genTongSo(res.data_info.chung_top.firstOrDefault());
        genChartCacBuocDatPie(res.data_info.cac_buoc_dat_pie);
        genChartCacBuocKhongDatPie(res.data_info.cac_buoc_khong_dat_pie);
        genChartThoiGianTrungBinhBuocPie(res.data_info.tgian_tbinh_buoc_pie);
    });
}

function genTongSo(data) {
    if (data != null && data != undefined) {
        $('#tong_ho_so_sla').html(data.tong_ho_so);
        $('#tgian_tbinh_gd_ho_so').html(ESUtil.formatMoney(data.tgian_tbinh_gd_ho_so));
        $('#tong_ho_so_0_5').html(data.tong_ho_so_0_5);
        $('#tgian_tbinh_gd_ho_so_0_5').html(ESUtil.formatMoney(data.tgian_tbinh_gd_ho_so_0_5));
        $('#tong_ho_so_5_10').html(data.tong_ho_so_5_10);
        $('#tgian_tbinh_gd_ho_so_5_10').html(ESUtil.formatMoney(data.tgian_tbinh_gd_ho_so_5_10));
        $('#tong_ho_so_10_50').html(data.tong_ho_so_10_50);
        $('#tgian_tbinh_gd_ho_so_10_50').html(ESUtil.formatMoney(data.tgian_tbinh_gd_ho_so_10_50));
        $('#tong_ho_so_50_500').html(data.tong_ho_so_50_500);
        $('#tgian_tbinh_gd_ho_so_50_500').html(ESUtil.formatMoney(data.tgian_tbinh_gd_ho_so_50_500));
    }
}

function genChartCacBuocDatPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));

    var tong_ho_so = 0;
    var arrData = [];
    $.each(data, (index, item) => {
        tong_ho_so += item.sl;
    });

    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            y: ((item.sl / tong_ho_so) * 100),
            so_luong: item.sl
        }
        arrData.push(obj);
    });

    // Build the chart
    Highcharts.chart('cac_buoc_dat_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Các bước thực hiện đạt yêu cầu'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>' +
                'Tên: <b>{point.name}</b><br>' +
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

function genChartCacBuocKhongDatPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));

    var tong_ho_so = 0;
    var arrData = [];
    $.each(data, (index, item) => {
        tong_ho_so += item.sl;
    });

    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            y: ((item.sl / tong_ho_so) * 100),
            so_luong: item.sl
        }
        arrData.push(obj);
    });

    // Build the chart
    Highcharts.chart('cac_buoc_khong_dat_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Các bước thực hiện không đạt yêu cầu'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>' +
                'Tên: <b>{point.name}</b><br>' +
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

function genChartThoiGianTrungBinhBuocPie(data) {
    data.forEach(obj => ESUtil.renameJsonKey(obj, 'ten', 'name'));

    var tong_ho_so = 0;
    var arrData = [];
    $.each(data, (index, item) => {
        tong_ho_so += item.sl;
    });

    $.each(data, (index, item) => {
        var obj = {
            name: item.name,
            y: ((item.sl / tong_ho_so) * 100),
            so_luong: item.sl
        }
        arrData.push(obj);
    });

    // Build the chart
    Highcharts.chart('thoi_gian_trung_binh_buoc_pie', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Thời gian trung bình của các bước'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b><br>' +
                'Tên: <b>{point.name}</b><br>' +
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