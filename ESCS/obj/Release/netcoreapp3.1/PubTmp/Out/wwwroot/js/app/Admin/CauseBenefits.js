var objDanhMuc = {};
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";

var _service = new Service();
var _notifyService = new NotifyService();
var _causeBenefitsService = new CauseBenefitsService();
var _partnerListService = new PartnerListService();
var _productHumanService = new ProductHumanService();
var _healthClaimCommonService = new HealthClaimCommonService();
var _packageService = new PackageService();

var _frmTimKiem = new FormService("frmTimKiem");
var _frmNhapNguyenNhanQuyenLoi = new FormService("frmNhapNguyenNhanQuyenLoi");
var _frmXemKetQua = new FormService("frmXemKetQua");

var _modalXemKetQua = new ModalService("ModalXemKetQua");
var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma_lhnv", title: "MÃ SẢN PHẨM", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_lhnv", title: "TÊN SẢN PHẨM", width: "23%", headerSort: false },
    { field: "nhom_nguyen_nhan", title: "MÃ NGUYÊN NHÂN", width: "10%", hozAlign: "center", headerSort: false },
    { field: "nhom_nguyen_nhan_ten", title: "TÊN NGUYÊN NHÂN", width: "23%", headerSort: false },
    { field: "nsd", title: "NSD", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "ĐỐI TÁC", width: "10%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac_ql", title: "ĐỐI TÁC QUẢN LÝ", width: "10%", hozAlign: "center", headerSort: false },
];

var _gridView = new GridViewService("gridView", configColumn, getPaging, rowClick);
function getPaging(trang) {
    var objTimKiem = _frmTimKiem.getJsonData();
    objTimKiem.trang = trang;
    objTimKiem.so_dong = 14;
    _causeBenefitsService.getPaging(objTimKiem).then(res => {
        _gridView.setDataSource(res, trang);
    });
}
function rowClick(data, row) {
    for (var i = 0; i < row.getTable().getRows().length; i++) {
        row.getTable().getRows()[i].deselect();
    }
    _frmNhapNguyenNhanQuyenLoi.clearErrorMessage();
    _frmNhapNguyenNhanQuyenLoi.resetForm();
    _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").setValue(data.ma_doi_tac_ql);
    _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").trigger('select2:select');
    _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").setValue(data.ma_lhnv);
    $('#treeQuyenLoiBaoHiem').jstree("destroy").empty();
    $('#treeNhomNguyenNhan').jstree("destroy").empty();
    taoDuLieuTreeNguyenNhan(ESCS_MA_DOI_TAC,
        objDanhMuc.nguyen_nhan,
        arr1 => {
            fnLoadTreeNguyenNhan(arr1, () => {
                _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").trigger('select2:select');
            });
        }, data.nhom_nguyen_nhan);
    showModal();
    row.select();
};
function showModal() {
    $('#inside-modal .nav-tabs.profile-tab').tabdrop();
    $("#inside-modal").esmodal("show");
}
function hideModal() {
    $("#inside-modal").esmodal("hide");
}
function taoDuLieuTreeQLBH(ma_doi_tac_ql, ma_lhnv, nhom_nguyen_nhan, callback = undefined) {
    var arr = [];
    var quyen_loi_bh = objDanhMuc.quyen_loi;
    var quyen_loi_bh_new = quyen_loi_bh.where(n => n.ma_doi_tac == ma_doi_tac_ql && n.ma_lhnv == ma_lhnv);
    console.log("ma_doi_tac_ql", ma_doi_tac_ql);
    console.log("ma_lhnv", ma_lhnv);
    console.log("quyen_loi_bh_new", quyen_loi_bh_new);

    var checked = false;
    _causeBenefitsService.getAll().then(res => {
        var arr_cau_hinh = res.data_info;
        console.log("Danh sách quyền lợi", quyen_loi_bh_new);
        for (var i = 0; i < quyen_loi_bh_new.length; i++) {
            checked = false;
            quyen_loi_bh_new[i].parent = quyen_loi_bh_new[i].parent == 'QL_GOC' ? '#' : quyen_loi_bh_new[i].parent;
            for (var j = 0; j < arr_cau_hinh.length; j++) {
                if (arr_cau_hinh[j].ma_lhnv == ma_lhnv &&
                    arr_cau_hinh[j].nhom_nguyen_nhan == nhom_nguyen_nhan &&
                    quyen_loi_bh_new[i].ma == arr_cau_hinh[j].ma_qloi) {
                    //var obj = {
                    //    id: quyen_loi_bh_new[i].ma,
                    //    parent: quyen_loi_bh_new[i].parent,
                    //    text: quyen_loi_bh_new[i].ten,
                    //    icon: "",
                    //    state: {
                    //        opened: true,
                    //        disabled: false,
                    //        selected: true
                    //    },
                    //    li_attr: {},
                    //    a_attr: {}
                    //}
                    //arr.push(obj);
                    checked = true
                }
            }
            /*quyen_loi_bh_new[i].parent = quyen_loi_bh_new[i].parent == 'QL_GOC' ? '#' : quyen_loi_bh_new[i].parent;*/

            var obj = {
                id: quyen_loi_bh_new[i].ma,
                parent: quyen_loi_bh_new[i].parent,
                text: quyen_loi_bh_new[i].ten,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false
                },
                a_attr: { class: "" },
                li_attr: {}
            }
            if (checked) {
/*                obj.a_attr.class = "jstree-checked";*/
                obj.state.selected = true;
            }
            arr.push(obj);
        }

        if (callback) {
            callback(arr);
        }
    });
}
function taoDuLieuTreeNguyenNhan(ma_doi_tac, nguyen_nhan, callback = undefined, nn_select = undefined) {

    var arr = [];
    var nguyen_nhan_new = nguyen_nhan.where(n => n.ma_doi_tac == ma_doi_tac);
    if (nn_select == undefined) {
        var obj11 = {
            id: nguyen_nhan_new[0].ma,
            parent: "#",
            text: nguyen_nhan_new[0].ten,
            icon: "",
            state: {
                opened: true,
                disabled: false,
                selected: true,
            },
            li_attr: {},
            a_attr: {}
        }
        arr.push(obj11);
        for (var i = 1; i < nguyen_nhan_new.length; i++) {
            var obj1 = {
                id: nguyen_nhan_new[i].ma,
                parent: "#",
                text: nguyen_nhan_new[i].ten,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {}
            }
            arr.push(obj1);
        }
    } else {
        for (var i = 0; i < nguyen_nhan_new.length; i++) {
            if (nguyen_nhan_new[i].ma == nn_select) {
                var obj21 = {
                    id: nguyen_nhan_new[i].ma,
                    parent: "#",
                    text: nguyen_nhan_new[i].ten,
                    icon: "",
                    state: {
                        opened: true,
                        disabled: false,
                        selected: true
                    },
                    li_attr: {},
                    a_attr: {}
                }
                arr.push(obj21);
                nguyen_nhan_new = nguyen_nhan_new.filter(n => n != nguyen_nhan_new[i]);
            }
            var obj2 = {
                id: nguyen_nhan_new[i].ma,
                parent: "#",
                text: nguyen_nhan_new[i].ten,
                icon: "",
                state: {
                    opened: true,
                    disabled: false,
                    selected: false,
                },
                li_attr: {},
                a_attr: {},
            }
            arr.push(obj2);
        }
    }

    if (callback) {
        callback(arr);
    }
}
function fnLoadTreeQLBH(json_data) {
    $('#treeQuyenLoiBaoHiem')
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: true },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "plugins": [
                "search", "checkbox"
            ]
        });
}
function fnLoadTreeNguyenNhan(json_data, callback = undefined) {
    $('#treeNhomNguyenNhan')
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                },
                "multiple": false
            },
            "checkbox": {
                "three_state": false
            },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "plugins": [
                "search", "checkbox"
            ]
        }).on("select_node.jstree", function () {
            var ma_doi_tac_ql = _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").val();
            var san_pham = _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").val();
            var nhom_nguyen_nhan = $('#treeNhomNguyenNhan').jstree().get_selected(true)[0].id;
            loadTreeQloi(ma_doi_tac_ql, san_pham, nhom_nguyen_nhan);
        })
        .bind('loaded.jstree', function (e, data) {
            if (callback) {
                callback();
            }
        });
}
function loadTreeQloi(ma_doi_tac_ql, ma_lhnv, nhom_nguyen_nhan) {
    $('#treeQuyenLoiBaoHiem').jstree("destroy").empty();
    if (ma_doi_tac_ql != '') {
        taoDuLieuTreeQLBH(ma_doi_tac_ql, ma_lhnv, nhom_nguyen_nhan , arr => {
                fnLoadTreeQLBH(arr);
        });
    }
}
$(document).ready(function () {
    _service.all([
        _partnerListService.layDsDoiTac(),
        _productHumanService.getAllSanPham(),
        _healthClaimCommonService.layDanhMucChung({ ma_doi_tac: ESCS_MA_DOI_TAC }),
        _packageService.danhSachQuyenLoiTree()
    ]).then(arrRes => {
        ESCS_MA_DOI_TAC_DUY_NHAT = (arrRes[0].data_info != null && arrRes[0].data_info.length == 1) ? arrRes[0].data_info[0].ma : "";
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.san_pham = arrRes[1].data_info;
        objDanhMuc.nguyen_nhan = arrRes[2].data_info.where(n => n.ma_doi_tac == ESCS_MA_DOI_TAC && n.nhom == "NGUYEN_NHAN");
        objDanhMuc.quyen_loi = arrRes[3].data_info;
        _frmTimKiem.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác quản lý", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác quản lý", "");
        _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").setDataSource([], "ten", "ma", "Chọn quyền lợi sản phẩm", "");
        getPaging(1);
    });
    _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").addEventChange(val => {
        var sp = objDanhMuc.san_pham.where(n => n.ma_doi_tac == val);
        _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").setDataSource(sp, "ten", "ma", "Chọn quyền lợi sản phẩm", "");
        $('#treeQuyenLoiBaoHiem').jstree("destroy").empty();
        if (val != '') {
            taoDuLieuTreeQLBH(val,
                objDanhMuc.quyen_loi,
                arr => {
                    fnLoadTreeQLBH(arr);
                });
        }
    });

    _frmNhapNguyenNhanQuyenLoi.getControl("san_pham").addEventChange(val => {
        var ma_doi_tac_ql = _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").val();
        var nhom_nguyen_nhan = $('#treeNhomNguyenNhan').jstree().get_selected(true)[0].id;
        loadTreeQloi(ma_doi_tac_ql, val, nhom_nguyen_nhan);
    });

    $("#btnThemMoi").click(function () {
        _frmNhapNguyenNhanQuyenLoi.clearErrorMessage();
        _frmNhapNguyenNhanQuyenLoi.resetForm();
        $('#treeQuyenLoiBaoHiem').jstree("destroy").empty();
        $('#treeNhomNguyenNhan').jstree("destroy").empty();

        _frmNhapNguyenNhanQuyenLoi.getControl("ma_doi_tac_ql").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);

        if (ESCS_MA_DOI_TAC != '') {
            taoDuLieuTreeNguyenNhan(ESCS_MA_DOI_TAC,
                objDanhMuc.nguyen_nhan,
                arr1 => {
                    fnLoadTreeNguyenNhan(arr1);
                });
        }
        showModal();
    });
    $('#btnLuu').click(function () {
        if (_frmNhapNguyenNhanQuyenLoi.isValid()) {
            var arrQLBH = $('#treeQuyenLoiBaoHiem').jstree().get_selected(true);
            var arrNguyenNhan = $('#treeNhomNguyenNhan').jstree().get_selected(true);
            if (arrQLBH.length == 0) {
                _notifyService.error("Bạn chưa chọn quyền lợi nào");
                return;
            } else if (arrNguyenNhan.length == 0) {
                _notifyService.error("Bạn chưa chọn nhóm nguyên nhân nào");
                return;
            }
            var arr = [];
            for (var j = 0; j < arrQLBH.length; j++) {
                var obj = {
                    ma_qloi: arrQLBH[j].id,
                    nhom_nguyen_nhan: arrNguyenNhan[0].id
                }
                arr.push(obj);
            }
            var obj = {
                ma_doi_tac_ql: _frmNhapNguyenNhanQuyenLoi.getControl('ma_doi_tac_ql').getValue(),
                san_pham: _frmNhapNguyenNhanQuyenLoi.getControl('san_pham').getValue(),
                data: arr
            };
            _causeBenefitsService.luuThongTinCauHinh(obj).then(res => {
                if (res.state_info.status === "OK") {
                    getPaging(1);
                    _notifyService.success("Lưu thông tin thành công.");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#timKiemQuyenLoiSanPham").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeQuyenLoiSanPham").jstree('search', val);
        }, 500);
    });
    $("#timKiemQuyenLoiBaoHiem").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeQuyenLoiBaoHiem").jstree('search', val);
        }, 500);
    });
    $("#timKiemNguyenNhan").keyup(function () {
        var val = $(this).val();
        setTimeout(() => {
            $("#treeNhomNguyenNhan").jstree('search', val);
        }, 500);
    });
    $('#btnTimKiem').click(function () {
        getPaging(1);
    });
});