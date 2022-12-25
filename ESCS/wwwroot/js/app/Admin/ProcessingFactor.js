var objDanhMuc = {};
var ESCS_MA_DOI_TAC_DUY_NHAT = '';
var dateNow = new Date().ddmmyyyy();

var _service = new Service();
var _notifyService = new NotifyService();
var _partnerListService = new PartnerListService();
var _branchListService = new BranchListService();
var _processingFactorService = new ProcessingFactorService();

var _frmThemCauHinh = new FormService('frmThemCauHinh');

var _modalThemHieuSuatXuLy = new ModalService('modalThemHieuSuatXuLy');

var _frmTimKiem = new FormService("frmTimKiem");
var objData = null;

const GRID_HO_SO_SO_DONG = 14;

var configColumn = [
    { field: "sott", title: "STT", width: "5%", hozAlign: "center", headerSort: false },
    { field: "nsd", title: "MÃ NSD", width: "12%", hozAlign: "center", headerSort: false },
    { field: "ten_nsd", title: "TÊN NSD", width: "20%", headerSort: false },
    { field: "nv_text", title: "NGHIỆP VỤ", width: "10%", hozAlign: "center", headerSort: false },
    { field: "he_so", title: "HỆ SỐ", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ngay_ad", title: "NGÀY ÁP DỤNG", width: "15%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac_ql", title: "ĐỐI TÁC QUẢN LÝ", width: "15%", headerSort: false },
    { field: "ten_doi_tac", title: "ĐỐI TÁC", width: "15%", headerSort: false },
    { field: "ten_chi_nhanh", title: "CHI NHÁNH", width: "15%", headerSort: false }
];

var _gridView = new GridViewService("gridViewHieuSuatLamViec", configColumn, getPaging, rowClick);

function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
    _processingFactorService.getPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
        if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
        } else {
            _gridView.addRowEmpty(GRID_HO_SO_SO_DONG);
        }
    });
}

function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _frmThemCauHinh.getControl("ma_doi_tac").val(data.ma_doi_tac);
    _frmThemCauHinh.getControl("ma_doi_tac").trigger("select2:select");
    _frmThemCauHinh.setData(data);
    var obj = {
        ma_doi_tac: data.ma_doi_tac,
        ma_chi_nhanh: data.ma_chi_nhanh
    }
    setGridViewHeSo(obj);
    _modalThemHieuSuatXuLy.show();
};

function getDataTable() {
    var otArr = [];
    $('tbody#cau_hinh_he_so tr').each(function (e) {
        var json = {
            nsd: $(this).find('td input.nsd').attr('col-val'),
            he_so: $(this).find('td input.he_so').val()
        };
        if (json.he_so != 0 && json.he_so != '0' && json.he_so != undefined) {
            otArr.push(json);
        }
    });
    return otArr;
}

function setGridViewHeSo(obj) {
    _processingFactorService.GetListNSD(obj).then(res => {
        var listNSD = res.data_info;
        var obj1 = {
            ma_doi_tac: _frmThemCauHinh.getControl("ma_doi_tac").getValue(),
            ma_chi_nhanh: _frmThemCauHinh.getControl("ma_chi_nhanh").getValue(),
            ma_doi_tac_ql: _frmThemCauHinh.getControl("ma_doi_tac_ql").getValue(),
            nv: _frmThemCauHinh.getControl("nv").getValue(),
            ngay_ad: _frmThemCauHinh.getControl("ngay_ad").getValue()
        }
        _processingFactorService.GetListHeSoNSD(obj1).then(res1 => {
            var HeSoNSD = res1.data_info;
            var arrData = [];
            $.each(listNSD, (index, item) => {
                var objTemp = {
                    ma_doi_tac: item.ma_doi_tac,
                    ma_chi_nhanh: item.ma_chi_nhanh,
                    nsd: item.nsd,
                    ten_nsd: item.ten_nsd,
                    he_so: 0
                }
                arrData.push(objTemp);
            });

            if (HeSoNSD.length == 0) {
                ESUtil.genHTML("cau_hinh_he_so_template", "cau_hinh_he_so", { data: arrData });
            } else {
                $.each(arrData, (index1, item1) => {
                    $.each(HeSoNSD, (index2, item2) => {
                        if (item1.nsd == item2.nsd) {
                            arrData[index1].he_so = item2.he_so;
                        }
                    });
                });
                ESUtil.genHTML("cau_hinh_he_so_template", "cau_hinh_he_so", { data: arrData });
            }
        });
    });
}

function rowSelected(el) {
    $('#tblCauHinhXe tr.rowSelected').removeClass('rowSelected');
    $(el).addClass('rowSelected');
}

$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _branchListService.layDsChiNhanh()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.chi_nhanh = arrRes[1].data_info;

        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", '');
        _frmTimKiem.getControl("ma_doi_tac").trigger('select2:select');
        _frmTimKiem.getControl("ngay_ad").setValue('');

        _frmThemCauHinh.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThemCauHinh.getControl("ma_chi_nhanh").setDataSource([], "ten", "ma", "Chọn chi nhánh", '');
        _frmThemCauHinh.getControl("ma_doi_tac").trigger('select2:select');
        _frmThemCauHinh.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);

        getPaging(1);
    });
    _frmTimKiem.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        _frmTimKiem.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", '');
    });
    _frmThemCauHinh.getControl("ma_doi_tac").addEventChange(val => {
        var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac == val);
        _frmThemCauHinh.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma", "Chọn chi nhánh", '');
    });
    _frmThemCauHinh.getControl("ma_chi_nhanh").addEventChange(val => {
        var obj = {
            ma_doi_tac: _frmThemCauHinh.getControl("ma_doi_tac").getValue(),
            ma_chi_nhanh: val
        }
        setGridViewHeSo(obj);
    });

    _frmThemCauHinh.getControl("nv").addEventChange(val => {
        if (_frmThemCauHinh.getControl("ma_chi_nhanh").getValue() != '') {
            var obj = {
                ma_doi_tac: _frmThemCauHinh.getControl("ma_doi_tac").getValue(),
                ma_chi_nhanh: _frmThemCauHinh.getControl("ma_chi_nhanh").getValue()
            }
            setGridViewHeSo(obj);
        }
    });

    $('form[name=frmThemCauHinh] input[name=ngay_ad]').on('change', function() {
        if (_frmThemCauHinh.getControl("ma_chi_nhanh").getValue() != '') {
            var obj = {
                ma_doi_tac: _frmTimKiem.getControl("ma_doi_tac").getValue(),
                ma_chi_nhanh: _frmThemCauHinh.getControl("ma_chi_nhanh").getValue()
            }
            setGridViewHeSo(obj);
        }
    });
    

    $('#btnTimKiem').click(function () {
        getPaging(1);
    });

    $('#btnThem').click(function () {
        _frmThemCauHinh.clearErrorMessage();
        _frmThemCauHinh.resetForm();
        _frmThemCauHinh.getControl('ma_doi_tac').setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThemCauHinh.getControl('ma_doi_tac').trigger('select2:select');
        _frmThemCauHinh.getControl('nv').setValue('XE');
        _frmThemCauHinh.getControl('ngay_ad').setValue(dateNow);
        ESUtil.genHTML("cau_hinh_he_so_template", "cau_hinh_he_so", { data: [] });
        _modalThemHieuSuatXuLy.show();
    });

    $('#btnLuuCauHinh').click(function() {
        if (_frmThemCauHinh.isValid()) {
            var dataJson = _frmThemCauHinh.getJsonData();
            dataJson.data = getDataTable();
            _processingFactorService.HeSoNsdNhap(dataJson).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    _notifyService.success("Lưu thông tin thành công.");
                    getPaging(1);
                    _modalThemHieuSuatXuLy.hide();
                } else {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
            });
        }
    });

    $('#btnXoaCauHinh').click(function () {
        var nsd = $('#tblCauHinhXe tr.rowSelected').find('input[name=nsd]').attr('col-val');

        var obj = _frmThemCauHinh.getJsonData();
        obj.nsd_cb = nsd;

        _notifyService.confirmDelete("Bạn có chắc muốn xóa cấu hình hệ số nsd này không?", "", val => {
            _processingFactorService.xoaCauHinh(obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var obj1 = {
                    ma_doi_tac: _frmThemCauHinh.getControl("ma_doi_tac").getValue(),
                    ma_chi_nhanh: _frmThemCauHinh.getControl("ma_chi_nhanh").getValue()
                }
                setGridViewHeSo(obj1);
                getPaging(1);
                _notifyService.success("Xóa cấu hình hệ số nsd thành công.");
            });
        });
    });
});