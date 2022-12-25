var _common = new CommonService();
var _service = new Service();
var _packageService = new PackageService();
var _notifyService = new NotifyService();
var _healthService = new HealthService();
var _UploadExcelService = new UploadExcelService();

var dateNow = new Date().ddmmyyyy();
var ngayDauThang = new Date().getNgayDauThang();
var dateNowKT = new Date().ddmmyyyy(3);
var gioHT = new Date().HHmm();
var objDanhMuc = {};
var objData = null;
var objDanhMucDonViHanhChinh = {};
const GRID_HO_SO_SO_DONG = 13;
const CONSTANT_PM = 'BH';
var ESCS_MA_DOI_TAC = $("#escs_ma_doi_tac").val();
var ESCS_MA_DOI_TAC_DUY_NHAT = "";
var checkDoubleClick = null;
var _modalCauHinhMaBenh = new ModalDragService("modalCauHinhMaBenh", undefined, "top");
var _modalCauHinhDKBS = new ModalDragService("modalCauHinhDKBS", undefined, "top");
var _modalUploadExcel = new ModalService("modalUploadExcel");
var _modalAddNhomGoi = new ModalService("modalAddNhomGoi");
var _navThongTin = new NavTabService("navThongTin", ["tabCauHinhQL", "tabCauHienTienBH", "tabQuyenLoiBoSung", "tabGhiChuKhac", "tabTyLeDong"], "quy-trinh");

var ARR_GOI_BH = [{
    id: "QL_GOC",
    ma: "QL_GOC",
    lh_nv: "QL_GOC",
    parent: "#",
    lh_nv_ct: "#",
    nhom_goc: "#",
    text: "Quyền lợi gói",
    ten: "Quyền lợi gói",
    so_lan_ngay: 0,
    tien_lan_ngay: 0,
    tien_nam: 0,
    dong_bh: 0,
    so_ngay_cho: 0,
    tl_phi: 0,
    phi: 0,
    ghi_chu: "",
    type: ""
}];
var ARR_COPY = [];

var _partnerListService = new PartnerListService();
var _diseasesListService = new DiseasesListService();
var _popupoverNhapTien = new PopoverService("popupoverNhapTien");
var _frmNhapTien = new FormService("frmNhapTien");
var _frmAddNhomGoiBH = new FormService("frmAddNhomGoiBH");

var configColumn = [
    { field: "sott", title: "STT", width: "4%", hozAlign: "center", headerSort: false },
    { field: "ma", title: "Mã gói", width: "12%", hozAlign: "center", headerSort: false, formatter: "html" },
    { field: "ten", title: "Tên gói", width: "25%", headerSort: false },
    { field: "gioi_tinh_ten", title: "Giới tính", width: "6%", hozAlign: "center", headerSort: false },
    { field: "tuoi_tu", title: "Từ tuổi", width: "5%", hozAlign: "center", headerSort: false },
    { field: "tuoi_toi", title: "Đến tuổi", width: "5%", hozAlign: "center", headerSort: false },
    { field: "trang_thai_ten", title: "Trạng thái", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ngay_ad_hthi", title: "Ngày áp dụng", width: "8%", hozAlign: "center", headerSort: false },
    { field: "ten_doi_tac", title: "Tên đối tác", width: "25%", hozAlign: "center", headerSort: false }
];

function hideModal() {
    $("#inside-modal").esmodal("hide");
}
var _gridViewTimKiem = new GridViewService("gridViewTimKiem", configColumn, getPaging, rowClick);
var _frmTimKiem = new FormService("frmTimKiem");
var _frmThongTinGoiBH = new FormService("frmThongTinGoiBH");

function getPaging(trang) {
    if (_frmTimKiem.isValid()) {
        var objTimKiem = _frmTimKiem.getJsonData();
        objTimKiem.pm = CONSTANT_PM;
        objTimKiem.trang = trang;
        objTimKiem.so_dong = GRID_HO_SO_SO_DONG;
        _packageService.paging(objTimKiem).then(res => {
            _gridViewTimKiem.setDataSource(res, trang);
            if (res.data_info.data !== null && res.data_info.data !== undefined && res.data_info.data.length <= GRID_HO_SO_SO_DONG) {
                _gridViewTimKiem.addRowEmpty(GRID_HO_SO_SO_DONG - res.data_info.data.length);
            } else {
                _gridViewTimKiem.addRowEmpty(GRID_HO_SO_SO_DONG);
            }
        });
    }
}
function xemChiTietGoi(data, callback = undefined) {
    _packageService.layThongTinChiTiet(data).then(res => {
        _frmThongTinGoiBH.resetForm();
        _frmThongTinGoiBH.clearErrorMessage();
        var data_bv_cong = res.data_info.cau_hinh_bv.where(n => n.nhom_bv == 'C').firstOrDefault();
        var data_bv_tu = res.data_info.cau_hinh_bv.where(n => n.nhom_bv == 'T').firstOrDefault();
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        ARR_GOI_BH = res.data_info.dk_tree;
        ARR_GOI_BH = ARR_GOI_BH.select(n => hthiTien(n));
        $('#treeQuyenLoiGoi').jstree(true).deselect_all();
        fnReloadQuyenLoiGoi();
        $("#treeQuyenLoiGoi").jstree("open_all");
        _frmThongTinGoiBH.setData(res.data_info.goi);
        _healthService.getListLHNV({ ma_doi_tac: res.data_info.goi.ma_doi_tac }).then(resCT => {
            if (resCT.state_info.status !== "OK") {
                _notifyService.error(resCT.state_info.message_body);
                return;
            }
            _frmThongTinGoiBH.getControl("ma_nhom").setDataSource(resCT.data_info, "ten", "ma", "Chọn sản phẩm", res.data_info.goi.ma_nhom);
            _frmThongTinGoiBH.getControl('ma_nhom').trigger('select2:select');
            _frmThongTinGoiBH.getControl("ma_doi_tac").readOnly();
            _frmThongTinGoiBH.getControl("ma").readOnly();
            if (callback) {
                callback(res);
            }
        });
        ESUtil.genHTML("tableNhapQLoi_template", "tableNhapQLoi", { dk: res.data_info.dk });
        if (data_bv_cong !== null && data_bv_cong !== '') {
            $("#bvc_tl_dong").setValue(data_bv_cong.tl_dong);
            $("#bvc_tg_cho").setValue(data_bv_cong.tg_cho);
        } else {
            $("#bvc_tl_dong").setValue('');
            $("#bvc_tg_cho").setValue('');
        }
        if (data_bv_tu !== null && data_bv_tu !== '') {
            $("#bvt_tl_dong").setValue(data_bv_tu.tl_dong);
            $("#bvt_tg_cho").setValue(data_bv_tu.tg_cho);
        } else {
            $("#bvt_tl_dong").setValue('');
            $("#bvt_tg_cho").setValue('');
        }
        ESUtil.genHTML("modalThemMaBenh_template", "modalThemMaBenh", { ds_ma_benh: res.data_info.cau_hinh_ma_benh });
    });
}
function rowClick(data, row) {
    if (row !== undefined) {
        for (var i = 0; i < row.getTable().getRows().length; i++) {
            row.getTable().getRows()[i].deselect();
        }
    }
    xemChiTietGoi(data, res => {
        $("#inside-modal").esmodal("show");
        if (row !== undefined) {
            row.select();
        }
    });
}
function checkGoiQuyenLoi(operation, node, node_parent, node_position, more) {
    if (operation == 'move_node') {
        if (this.get_node(node).data.nhom_goc != this.get_node(node_parent).data.nhom_goc) {
            //_notifyService.error("Không được phép di chuyển khác nhóm quyền lợi danh mục");
            return false;
        }
        return true;
    }
}
function fnLoadTreeQuyenLoiGoi(json_data) {
    $('#treeQuyenLoiGoi')
        .on('loaded.jstree', function (e, data) {
            $(this).jstree("open_node", "QL_GOC");
            for (var i = 0; i < json_data.length; i++) {
                json_data[i] = hthiTien(json_data[i]);
                $('#treeQuyenLoiGoi').jstree(true).get_node(json_data[i].id).data = json_data[i];
            }
            ARR_GOI_BH = getTreeQuyenLoiGoi();
        })
        .on('search.jstree', function (nodes, str, res) {
            if (str.nodes.length === 0) {
                $('#treeQuyenLoiGoi').jstree(true).hide_all();
            }
        })
        .on('move_node.jstree', function (e, data) {
            var nhom_goc_cha = $('#treeQuyenLoiGoi').jstree(true).get_node(data.parent).data.nhom_goc;
            if (data.node.data.nhom_goc != nhom_goc_cha) {
                _notifyService.error("Không được phép di chuyển khác nhóm quyền lợi danh mục");
                return;
            }
            data.node.data.parent = data.parent;
        })
        //.on("dblclick.jstree", function (event) {
        //    var treeQuyenLoiGoi = $('#treeQuyenLoiGoi').jstree(true);
        //    var node = $(event.target).closest("li");
        //    var item = treeQuyenLoiGoi.get_node(node[0].id);
        //    _frmNhapTien.setData(item.data);
        //    $("#frmNhapTien_ten").html(item.data.ten);
        //    $("#popupoverNhapTien").css({ top: "250px", left: "150px" });
        //    _popupoverNhapTien.show();
        //})
        .jstree({
            "core": {
                'multiple': true,
                "check_callback": checkGoiQuyenLoi,
                "animation": 0,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: false },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "types": {
                "file": {
                    "icon": "glyphicon glyphicon-file",
                }
            },
            "plugins": [
                "contextmenu", "dnd", "types", "search", "checkbox"
            ],
            "contextmenu": {
                "items": function ($node) {
                    return {
                        //"paste": {
                        //    "separator_before": false,
                        //    "icon": false,
                        //    "_disabled": function (data) {
                        //        return ARR_COPY == null || ARR_COPY.length <= 0;
                        //    },
                        //    "separator_after": false,
                        //    "label": "Dán quyền lợi",
                        //    "action": function (data) {
                        //        var treeQuyenLoiGoi = $('#treeQuyenLoiGoi').jstree(true);
                        //        var selected = treeQuyenLoiGoi.get_selected(true)[0];
                        //        //Lấy ra quyền lợi gốc của danh sách array coppy
                        //        var goc = ARR_COPY.where(n => n.parent == "QL_GOC");
                        //        if (goc.length <= 0) {
                        //            for (var i = 0; i < ARR_COPY.length; i++) {
                        //                ARR_GOI_BH.push({
                        //                    id: ARR_COPY[i].id, ma: ARR_COPY[i].id, text: ARR_COPY[i].text, ten: ARR_COPY[i].ten, parent: selected.id, type: "file", so_lan_ngay: 0, tien_lan_ngay: 0, tien_nam: 0
                        //                })
                        //            }
                        //        }
                        //        else {
                        //            var arr_goc_id = [];
                        //            for (var i = 0; i < goc.length; i++) {
                        //                arr_goc_id.push(goc[i].id);
                        //                ARR_GOI_BH.push({ id: goc[i].id, ma: goc[i].id, text: goc[i].text, ten: goc[i].ten, parent: selected.id, type: "file", so_lan_ngay: 0, tien_lan_ngay: 0, tien_nam: 0 });
                        //                var items = ARR_COPY.where(n => n.parent == goc[i].id);
                        //                for (var j = 0; j < items.length; j++) {
                        //                    ARR_GOI_BH.push({ id: items[j].id, ma: items[j].id, text: items[j].text, ten: items[j].ten, parent: goc[i].id, type: "file", so_lan_ngay: 0, tien_lan_ngay: 0, tien_nam: 0 })
                        //                }
                        //            };
                        //            var item_not_goc = ARR_COPY.where(n => n.parent != "QL_GOC" && !arr_goc_id.includes(n.parent));
                        //            for (var i = 0; i < item_not_goc.length; i++) {
                        //                ARR_GOI_BH.push({ id: item_not_goc[i].id, ma: item_not_goc[i].id, text: item_not_goc[i].text, ten: item_not_goc[i].ten, parent: selected.id, type: "file", so_lan_ngay: 0, tien_lan_ngay: 0, tien_nam: 0 });
                        //            }
                        //        }
                        //        fnReloadQuyenLoiGoi();
                        //        $('#treeQuyenLoiGoi').jstree("open_all");
                        //        $('#treeQuyenLoiSP').jstree("deselect_all");
                        //        disableTreeQuyenLoiSP();
                        //        ARR_COPY = [];
                        //    }
                        //},
                        "Delete": {
                            "label": "Xóa quyền lợi",
                            "action": function (data) {
                                _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa quyền lợi này không?", "", () => {
                                    var inst = $.jstree.reference(data.reference),
                                        obj = inst.get_node(data.reference);
                                    if (inst.is_selected(obj)) {
                                        inst.delete_node(inst.get_selected());
                                    }
                                    else {
                                        inst.delete_node(obj);
                                    }
                                    disableTreeQuyenLoiSP();
                                    ARR_GOI_BH = getTreeQuyenLoiGoi();
                                });
                            }
                        }
                    };
                }
            }
        });
}
function fnLoadTreeQuyenLoiSP(json_data) {
    $('#treeQuyenLoiSP')
        .on('loaded.jstree', function (e, data) {
            $(this).jstree("open_node", "QL_GOC");
            $(this).jstree().disable_node("QL_GOC");
            for (var i = 0; i < json_data.length; i++) {
                $('#treeQuyenLoiSP').jstree(true).get_node(json_data[i].id).data = json_data[i];
            }
        })
        .on('search.jstree', function (nodes, str, res) {
            if (str.nodes.length === 0) {
                $('#treeQuyenLoiSP').jstree(true).hide_all();
            }
        })
        .jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "data": json_data,
                "themes": {
                    "icons": false
                }
            },
            "checkbox": { three_state: false },
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            },
            "types": {
                "#": {
                    "valid_children": ["root"]
                },
                "root": {
                    "icon": "/static/3.1.1/assets/images/tree_icon.png",
                    "valid_children": ["default"]
                },
                "default": {
                    "valid_children": ["default", "file"]
                },
                "file": {
                    "icon": "glyphicon glyphicon-file",
                    "valid_children": []
                }
            },
            "plugins": [
                "contextmenu", "types", "search", "checkbox"
            ],
            "contextmenu": {
                "items": function ($node) {
                    return {
                        //"Copy": {
                        //    "label": "Sao chép quyền lợi",
                        //    "action": function (data) {
                        //        ARR_COPY = $("#treeQuyenLoiSP").jstree(true).get_selected(true).select(n => hthiTien(n.data));
                        //    }
                        //}
                    };
                }
            }
        });

}
function fnReloadQuyenLoiGoi() {
    $('#treeQuyenLoiGoi').jstree(true).settings.core.data = ARR_GOI_BH;
    $('#treeQuyenLoiGoi').jstree('refresh');
    for (var i = 0; i < ARR_GOI_BH.length; i++) {
        $('#treeQuyenLoiGoi').jstree(true).get_node(ARR_GOI_BH[i].id).data = ARR_GOI_BH[i];
    }
}
function hthiTien(obj) {
    var so_lan_ngay = 0;
    if (obj.so_lan_ngay && obj.so_lan_ngay != null && obj.so_lan_ngay != 0) {
        so_lan_ngay = obj.so_lan_ngay;
    }
    var tien_lan_ngay = 0;
    if (obj.tien_lan_ngay && obj.tien_lan_ngay != null && obj.tien_lan_ngay != 0) {
        tien_lan_ngay = obj.tien_lan_ngay;
    }
    var tien_nam = 0;
    if (obj.tien_nam && obj.tien_nam != null && obj.tien_nam != 0) {
        tien_nam = obj.tien_nam;
    }
    //obj.ten = obj.text;
    //obj.text = obj.ten + " <b style='font-weight:bold; color:red; font-size:10px;'>(Tổng tiền BH/năm: " + ESUtil.formatMoney(tien_nam) + "đ, tiền/lần/ngày: " + ESUtil.formatMoney(tien_lan_ngay) + "đ, số lần/ngày: " + so_lan_ngay + " lần)</b>";
    return obj;
}
function getTreeQuyenLoiGoi() {
    return $('#treeQuyenLoiGoi').jstree(true).get_json('#', { flat: true }).select(n => n.data);
}
function disableTreeQuyenLoiSP() {
    var arr = $('#treeQuyenLoiGoi').jstree(true).get_json('#', { flat: true });
    var arrTree = $('#treeQuyenLoiSP').jstree(true).get_json('#', { flat: true });
    for (var i = 0; i < arrTree.length; i++) {
        $("#treeQuyenLoiSP").jstree(true).enable_node(arrTree[i].id);
        $("#treeQuyenLoiSP").jstree(true).show_node(arrTree[i].id);
    }
    for (var i = 0; i < arr.length; i++) {
        $("#treeQuyenLoiSP").jstree(true).disable_node(arr[i].id);
        var arr_id = objDanhMuc.nhom_quyen_loi.select(n => n.id);
        if (arr[i].id != "QL_GOC" && !arr_id.includes(arr[i].id)) {
            $("#treeQuyenLoiSP").jstree(true).hide_node(arr[i].id);
        }
    }

}
function luuNhapTien(callback = undefined) {
    var obj = _frmNhapTien.getJsonData();
    if (!_frmNhapTien.isValid()) {
        return;
    }
    if (parseInt(obj.so_lan_ngay) <= 0) {
        _notifyService.error("Số lần giám định, bồi thường trên ngày không được phép nhỏ hơn 0.");
        return;
    }
    if (parseInt(obj.tien_lan_ngay) <= 0) {
        _notifyService.error("Số tiền tối đa bồi thường trên ngày không được phép nhỏ hơn 0.");
        return;
    }
    if (parseInt(obj.tien_nam) <= 0) {
        _notifyService.error("Số tiền trên năm không được phép nhỏ hơn 0.");
        return;
    }
    if (parseInt(obj.tien_lan_ngay) > parseInt(obj.tien_nam)) {
        _notifyService.error("Số tiền trên năm không được nhỏ hơn số tiền tối đa trên ngày.");
        return;
    }
    var so_lan_ngay = obj.so_lan_ngay == "" || obj.so_lan_ngay < 0 ? 0 : parseInt(obj.so_lan_ngay);
    var tien_lan_ngay = obj.tien_lan_ngay == "" || obj.tien_lan_ngay < 0 ? 0 : parseInt(obj.tien_lan_ngay);
    var tien_nam = obj.tien_nam == "" || obj.tien_nam < 0 ? 0 : parseInt(obj.tien_nam);
    $('#treeQuyenLoiGoi').jstree(true).get_node(obj.id).data.so_lan_ngay = so_lan_ngay;
    $('#treeQuyenLoiGoi').jstree(true).get_node(obj.id).data.tien_lan_ngay = tien_lan_ngay;
    $('#treeQuyenLoiGoi').jstree(true).get_node(obj.id).data.tien_nam = tien_nam;
    var item = ARR_GOI_BH.where(n => n.id == obj.id).firstOrDefault();
    item.so_lan_ngay = so_lan_ngay;
    item.tien_lan_ngay = tien_lan_ngay;
    item.tien_nam = tien_nam;
    item = hthiTien(item);
    fnReloadQuyenLoiGoi();
    if (callback) {
        callback();
    }
}
function hthiTab(tab) {
    if (tab == 'tabCauHienTienBH') {
        if (_frmThongTinGoiBH.getControl('so_id').getValue() == '' || _frmThongTinGoiBH.getControl('so_id').getValue() == undefined) {
            _notifyService.error('Bạn phải lưu gói trước');
            return;
        }
        _navThongTin.showTab("tabCauHienTienBH");
    }
    else if (tab == 'tabQuyenLoiBoSung') {
        if (_frmThongTinGoiBH.getControl('so_id').getValue() == '' || _frmThongTinGoiBH.getControl('so_id').getValue() == undefined) {
            _notifyService.error('Bạn phải lưu gói trước');
            return;
        }
        _navThongTin.showTab("tabQuyenLoiBoSung");
    }
    else if (tab == 'tabTyLeDong') {
        if (_frmThongTinGoiBH.getControl('so_id').getValue() == '' || _frmThongTinGoiBH.getControl('so_id').getValue() == undefined) {
            _notifyService.error('Bạn phải lưu gói trước');
            return;
        }
    }
}
function getDataTienQloi() {
    var arrData = [];
    $("#tableNhapQLoi tr.item_lhnv").each(function () {
        var lhnv = $(this).attr("data-lhnv");
        var obj = {
            bt: $("#tableNhapQLoi input[data-bt='" + lhnv + "']").val(),
            ten: $("#tableNhapQLoi input[data-ten='" + lhnv + "']").val(),
            lh_nv: lhnv,
            lh_nv_ct: $("#tableNhapQLoi input[data-lhnv-ct='" + lhnv + "']").val(),
            so_lan_ngay: $("#tableNhapQLoi input[data-so-lan-ngay='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            tien_lan_ngay: $("#tableNhapQLoi input[data-tien-lan-ngay='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            tien_nam: $("#tableNhapQLoi input[data-tien-nam='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            dong_bh: $("#tableNhapQLoi input[data-dong-bh='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            so_ngay_cho: $("#tableNhapQLoi input[data-so-ngay-cho='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            tl_phi: $("#tableNhapQLoi input[data-tl-phi='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            phi: $("#tableNhapQLoi input[data-phi='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            ghi_chu: $("#tableNhapQLoi input[data-ghi-chu='" + lhnv + "']").val(),
            so_ngay_gia_han: $("#tableNhapQLoi input[data-so-ngay-gia-han='" + lhnv + "']").val().replace(/[^0-9]+/g, ''),
            quyen_loi: $("#tableNhapQLoi input[data-quyen-loi='" + lhnv + "']").val(),
            loai: $("#tableNhapQLoi input[data-loai='" + lhnv + "']").val(),
            loaiq: $("#tableNhapQLoi input[data-loaiq='" + lhnv + "']").val()
        };
        obj.so_lan_ngay = obj.so_lan_ngay == "" ? "0" : obj.so_lan_ngay;
        obj.tien_lan_ngay = obj.tien_lan_ngay == "" ? "0" : obj.tien_lan_ngay;
        obj.tien_nam = obj.tien_nam == "" ? "0" : obj.tien_nam;
        obj.dong_bh = obj.dong_bh == "" ? "0" : obj.dong_bh;
        obj.so_ngay_cho = obj.so_ngay_cho == "" ? "0" : obj.so_ngay_cho;
        obj.tl_phi = obj.tl_phi == "" ? "0" : obj.tl_phi;
        obj.phi = obj.phi == "" ? "0" : obj.phi;
        arrData.push(obj);
    });
    return arrData;
}
function getDataTableDKBS() {
    var arrData = [];
    $("#tableDKBS tr input[type=checkbox]:checked").each(function (index, item) {
        var obj = {
            ma: $(item).val(),
            ten: $(item).closest('tr').find('input[name=ten_dkbs]').val(),
            ghi_chu: $(item).closest('tr').find('input[name=ghi_chu]').val()
        }
        arrData.push(obj);
    });
    return arrData;
}
function getDataTableTyLeDongC() {
    var otArr = [];
    $("#modalThemTyLeDong1 tr.tl_dong").each(function (e) {
        var json = {
            nhom_bv: 'C',
            tl_dong: '',
            tg_cho: '',
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
function getDataTableTyLeDongT() {
    var otArr = [];
    $("#modalThemTyLeDong2 tr.tl_dong").each(function (e) {
        var json = {
            nhom_bv: 'T',
            tl_dong: '',
            tg_cho: ''
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
function xoaMaBenh(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        var obj = _frmThongTinGoiBH.getJsonData();
        var objData = {
            ma_doi_tac: obj.ma_doi_tac,
            so_id: obj.so_id,
            ma: obj.ma,
            ma_benh: $(el).attr("data-val"),
        };
        _packageService.xoaCauHinhMaBenh(objData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Xóa thông tin thành công");
                $(el).parent().parent().remove();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    })
}
function xoaTyLeDong() {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa dữ liệu này không?",
        "",
        val => {
            _notifyService.warning(
                "Chức năng xóa tạm thời không được sử dụng.");
        });
}
function xoaDKBS(el) {
    _notifyService.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?", "", () => {
        var obj = _frmThongTinGoiBH.getJsonData();
        var objData = {
            ma_doi_tac: obj.ma_doi_tac,
            ma: $(el).attr("data-val"),
            so_id_goi: obj.so_id
        };
        _packageService.deleteDkbsGoi(objData).then(res => {
            if (res.state_info.status === "OK") {
                _notifyService.success("Xóa thông tin thành công");
                $(el).parent().parent().remove();
            }
            else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    })
}
function getTableMaBenh() {
    var otArr = [];
    $("#modalThemMaBenh tr").each(function (e) {
        var json = {
            ma_benh: '',
            tl_dong: '',
            tg_cho: ''
        };
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-name");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        });
        if (json.ma_benh != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
function getTableDKBS() {
    var otArr = [];
    $("#tableDKBS tr").each(function (e) {
        var json = {
            ma: '',
            ten: '',
            ghi_chu: '',
            so_lan_ngay: '',
            tien_lan_ngay: '',
            tien_nam: '',
            dong_bh: '',
            so_ngay_cho: '',
            phi: '',
            tl_phi: ''
        }
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-name");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        })
        if (json.ma != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
function chonCauHinhMaBenh(el) {
    var arr = getTableMaBenh();
    $("#modalCauHinhMaBenhDanhSach .chmb").removeClass("d-none");
    $("#inputSearch_CauHinhMaBenh").focus();
    $("#inputSearch_CauHinhMaBenh").val();
    $("#modalCauHinhMaBenhDanhSach .modalChonCauHinhMaBenhItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalCauHinhMaBenhDanhSach .modalChonCauHinhMaBenhItem[value='" + arr[i].ma_benh + "']").prop("checked", true);
    };
    _modalCauHinhMaBenh.show(el);
}
function chonDKBS(el) {
    var arr = getTableDKBS();
    $("#modalCauHinhDKBSDanhSach .dkbs").removeClass("d-none");
    $("#inputSearch_CauHinhDKBS").focus();
    $("#inputSearch_CauHinhDKBS").val();
    $("#modalCauHinhDKBSDanhSach .modalChonCauHinhDKBSItem").prop("checked", false);
    for (var i = 0; i < arr.length; i++) {
        $("#modalCauHinhDKBSDanhSach .modalChonCauHinhDKBSItem[value='" + arr[i].ma + "']").prop("checked", true);
    };
    _modalCauHinhDKBS.show(el);
}
function getCheckedMaBenh() {
    var arr_chon = [];
    $("#modalCauHinhMaBenhDanhSach .modalChonCauHinhMaBenhItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma_benh: "",
                tl_dong: 0,
                tg_cho: 0
            };
            var val = $(this).val();
            var ds_ma_benh = objDanhMuc.ma_benh.where(n => n.ma == val).firstOrDefault();
            obj.ma_benh = ds_ma_benh.ma;
            obj.ten_v = ds_ma_benh.ten_v;
            arr_chon.push(obj);
        }
    });
    return arr_chon;
}
function getCheckedDKBS() {
    var arr_chon = [];
    $("#modalCauHinhDKBSDanhSach .modalChonCauHinhDKBSItem").each(function () {
        if ($(this).is(":checked")) {
            var obj = {
                ma: '',
                ten: '',
                ghi_chu: ''
            };
            var val = $(this).val();
            var ds_dkbs = objDanhMuc.dkbs.where(n => n.ma == val).firstOrDefault();
            obj.ma = ds_dkbs.ma;
            obj.ten = ds_dkbs.ten;
            arr_chon.push(obj);
        }
    });
    return arr_chon;
}
function xemNoiDungFile(el) {
    _UploadExcelService.getDataExcel(el);
}
function getTableGhiChuKhac() {
    var otArr = [];
    $("#tableGhiChuKhac tr.ghiChuKhac").each(function (e) {
        var json = {}
        td = $(this).children();
        td.each(function (i) {
            $(this).find("a[data-field]").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
            $(this).find("input").each(function (el) {
                var name = $(this).attr("data-name");
                if ($(this).hasClass("number") || $(this).hasClass("decimal")) {
                    json[name] = $(this).val().replace(/[^0-9]+/g, '');
                } else {
                    json[name] = $(this).val();
                }
            });
        })
        if (json.ma != '' && json.ten != '') {
            otArr.push(json);
        }
    });
    return otArr;
}
function themGhiChu() {
    var stt = 1;
    var arr_cu = getTableGhiChuKhac();
    if (arr_cu.length !== 0) {
        stt = parseInt(arr_cu[arr_cu.length - 1].ma) + 1;
    }
    var obj = {
        ma: stt,
        ten: ''
    }
    arr_cu.push(obj);
    ESUtil.genHTML("tableGhiChuKhacTemplate", "tableGhiChuKhac", { data: arr_cu });
}
function xoaNhomGoi(ma_nhom) {
    var obj = {};
    obj.ma = ma_nhom;
    _packageService.xoaNhomGoiBH(obj).then(res => {
        if (res.state_info.status !== 'OK') {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        _packageService.LayDanhSachNhomGoiBH().then(res1 => {
            if (res1.state_info.status !== 'OK') {
                _notifyService.error(res1.state_info.message_body);
                return;
            }
            objDanhMuc.nhom_goi = res1.data_info;
            ESUtil.genHTML("dsNhomGoiTemplate", "dsNhomGoi", { data: objDanhMuc.nhom_goi });
        });
        _notifyService.success("Xóa nhóm gói bảo hiểm thành công");
    });
}
function suaNhomGoi(ma_nhom, ten_nhom) {
    var obj = {};
    obj.ma = ma_nhom;
    obj.ten = ten_nhom;
    $("#btnThemNhomGoiMoi").addClass("d-none");
    $("#btnNhomGoiQuayVe").removeClass("d-none");
    $("#btnLuuNhomGoi").removeClass("d-none");
    $("#modalAddNhomGoiDsChon").addClass("d-none");
    $("#modalAddNhomGoiBHForm").removeClass("d-none");
    _frmAddNhomGoiBH.resetForm();
    _frmAddNhomGoiBH.clearErrorMessage();
    _frmAddNhomGoiBH.setData(obj)
}

$(document).ready(function () {
    _frmTimKiem.getControl("ngay_ad_tu").setValue("");
    _frmTimKiem.getControl("ngay_ad_toi").setValue("");
    _service.all([
        _partnerListService.layDsDoiTac(),
        _packageService.danhSachQuyenLoiTree(),
        _packageService.GetAllQLBS({ ma_doi_tac: ESCS_MA_DOI_TAC }),
        _diseasesListService.layDanhSachMaBenh(),
        _packageService.LayDanhSachNhomGoiBH()
    ]).then(arrRes => {
        objDanhMuc.doi_tac = arrRes[0].data_info;
        objDanhMuc.quyen_loi = arrRes[1].data_info.where(n => n.nhom == 'CHINH');
        objDanhMuc.nhom_quyen_loi = arrRes[1].data_info.where(n => n.parent == "QL_GOC");
        objDanhMuc.dkbs = arrRes[2].data_info;
        objDanhMuc.ma_benh = arrRes[3].data_info.where(n => n.benh_db == 'C');
        objDanhMuc.nhom_goi = arrRes[4].data_info
        fnLoadTreeQuyenLoiSP([]);
        fnLoadTreeQuyenLoiGoi([]);
        ESCS_MA_DOI_TAC_DUY_NHAT = (objDanhMuc.doi_tac != null && objDanhMuc.doi_tac.length == 1) ? objDanhMuc.doi_tac[0].ma : "";
        _frmTimKiem.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThongTinGoiBH.getControl("ma_doi_tac").setDataSource(objDanhMuc.doi_tac, "ten", "ma", "Chọn đối tác", ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThongTinGoiBH.getControl("ma_nhom").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        ESUtil.genHTML("modalCauHinhMaBenhDanhSachTemplate", "modalCauHinhMaBenhDanhSach", { ds_cau_hinh_ma_benh: objDanhMuc.ma_benh });
        ESUtil.genHTML("modalCauHinhDKBSDanhSachTemplate", "modalCauHinhDKBSDanhSach", { ds_cau_hinh_dkbs: objDanhMuc.dkbs });
        _frmThongTinGoiBH.getControl("nhom_goi").setDataSource(objDanhMuc.nhom_goi, "ten", "ma", "Chọn nhóm gói", "");
    });
    _frmThongTinGoiBH.getControl("ma_doi_tac").addEventChange(val => {
        _frmThongTinGoiBH.getControl("ma_nhom").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        if (val != '') {
            _healthService.getListLHNV({ ma_doi_tac: val }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _frmThongTinGoiBH.getControl("ma_nhom").setDataSource(res.data_info, "ten", "ma", "Chọn sản phẩm", "");
            });
        }
    });
    _frmThongTinGoiBH.getControl('ma_nhom').addEventChange(val => {
        // Tree QLOI BH
        $('#treeQuyenLoiSP').jstree("destroy").empty();
        var ma_doi_tac = _frmThongTinGoiBH.getControl('ma_doi_tac').val();
        var arr_qloi = objDanhMuc.quyen_loi.where(n => n.ma_doi_tac == ma_doi_tac && n.ma_lhnv == val);
        var node_parent = objDanhMuc.quyen_loi.where(n => n.ma == 'QL_GOC' && n.id == 'QL_GOC').firstOrDefault();
        arr_qloi.push(node_parent);
        fnLoadTreeQuyenLoiSP(arr_qloi);

        // tab ĐKBS
        var obj = _frmThongTinGoiBH.getJsonData();
        _packageService.getDkbsGoi(obj).then(res => {
            var dkbs = res.data_info.where(n => n.type == 'DKBS');
            var ghi_chu_khac = res.data_info.where(n => n.type == 'KHAC');
            if (dkbs.length == 0) {
                ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: [] });
            } else {
                ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: dkbs });
            }

            if (ghi_chu_khac.length == 0) {
                ESUtil.genHTML("tableGhiChuKhacTemplate", "tableGhiChuKhac", { data: [] });
            } else {
                ESUtil.genHTML("tableGhiChuKhacTemplate", "tableGhiChuKhac", { data: ghi_chu_khac });
            }
        });
    });
    $("#btnThemGoi").click(function () {
        fnLoadTreeQuyenLoiSP([]);
        ARR_GOI_BH = [{
            id: "QL_GOC",
            ma: "QL_GOC",
            lh_nv: "QL_GOC",
            parent: "#",
            lh_nv_ct: "#",
            nhom_goc: "#",
            text: "Quyền lợi gói",
            ten: "Quyền lợi gói",
            so_lan_ngay: 0,
            tien_lan_ngay: 0,
            tien_nam: 0,
            dong_bh: 0,
            so_ngay_cho: 0,
            tl_phi: 0,
            phi: 0,
            ghi_chu: "",
            type: ""
        }];
        hthiTab(tabCauHinhQL);
        //_navThongTin.showTab("tabCauHinhQL");
        _frmThongTinGoiBH.getControl("ma_nhom").setDataSource([], "ten", "ma", "Chọn sản phẩm", "");
        _frmThongTinGoiBH.clearErrorMessage();
        _frmThongTinGoiBH.resetForm();
        _frmThongTinGoiBH.getControl("ma_doi_tac").readOnly(false);
        _frmThongTinGoiBH.getControl("ma").readOnly(false);
        _frmThongTinGoiBH.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThongTinGoiBH.getControl("ma_doi_tac").trigger("select2:select");
        _frmThongTinGoiBH.getControl("ngay_ad").setValue(new Date().getNgayDauNam());
        _frmThongTinGoiBH.getControl("gioi_tinh").setValue(" ");
        _frmThongTinGoiBH.getControl("trang_thai").setValue("D");
        fnReloadQuyenLoiGoi();
        disableTreeQuyenLoiSP();
        ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: [] });
        ESUtil.genHTML("tableGhiChuKhacTemplate", "tableGhiChuKhac", { data: [] });
        ESUtil.genHTML("modalThemMaBenh_template", "modalThemMaBenh", { ds_ma_benh: [] });
        $("#inside-modal").esmodal("show");
    });
    $("#btnTimKiem").click(function () {
        getPaging(1);
    });
    $("#timKiemQLGoi").keyup(function () {
        $("#treeQuyenLoiGoi").jstree(true).show_all();
        $("#treeQuyenLoiGoi").jstree('search', $(this).val());
    });
    $("#timKiemQLSP").keyup(function () {
        $("#treeQuyenLoiSP").jstree(true).show_all();
        $("#treeQuyenLoiSP").jstree('search', $(this).val());
    });
    $("#btnThemQuyenLoi").click(function () {
        ARR_COPY = $("#treeQuyenLoiSP").jstree(true).get_selected(true).select(n => hthiTien(n.data));
        if (ARR_COPY.length <= 0) {
            _notifyService.error("Bạn chưa chọn quyền lợi cần thêm");
            return;
        }
        for (var i = 0; i < objDanhMuc.nhom_quyen_loi.length; i++) {
            var count = ARR_COPY.where(n => n.parent == objDanhMuc.nhom_quyen_loi[i].id).length;
            if (count > 0) {
                count = ARR_COPY.where(n => n.id == objDanhMuc.nhom_quyen_loi[i].id).length;
                if (count <= 0) {
                    var parent_node_data = hthiTien($("#treeQuyenLoiSP").jstree(true).get_node(objDanhMuc.nhom_quyen_loi[i].id).data);
                    ARR_COPY.push(parent_node_data);
                }
            }
        }
        var treeQuyenLoiGoi = $('#treeQuyenLoiGoi').jstree(true);
        var ds_nhom_da_push = ARR_GOI_BH.where(n => n.parent == "QL_GOC").select(n => n.id);
        for (var i = 0; i < ARR_COPY.length; i++) {
            if (ds_nhom_da_push.includes(ARR_COPY[i].id)) {
                continue;
            }
            ARR_GOI_BH.push({
                id: ARR_COPY[i].id,
                ma: ARR_COPY[i].id,
                lh_nv: ARR_COPY[i].id,
                text: ARR_COPY[i].text,
                ten: ARR_COPY[i].ten,
                parent: ARR_COPY[i].parent,
                lh_nv_ct: ARR_COPY[i].parent,
                nhom_goc: ARR_COPY[i].parent,
                type: "file",
                so_lan_ngay: 0,
                tien_lan_ngay: 0,
                tien_nam: 0,
                dong_bh: 0,
                so_ngay_cho: 0,
                tl_phi: 0,
                phi: 0,
                ghi_chu: "",
            });
        }
        fnReloadQuyenLoiGoi();
        $('#treeQuyenLoiGoi').jstree("open_all");
        $('#treeQuyenLoiSP').jstree("deselect_all");
        disableTreeQuyenLoiSP();
        ARR_COPY = [];
    });
    $("#btnXoaQuyenLoi").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa quyền lợi này không?", "", () => {
            var node_selected = $("#treeQuyenLoiGoi").jstree(true).get_selected(true);
            if (node_selected.length <= 0) {
                _notifyService.error("Bạn chưa chọn quyền lợi cần xóa");
                return;
            }
            var treeQuyenLoiGoi = $('#treeQuyenLoiGoi').jstree(true);
            for (var i = 0; i < node_selected.length; i++) {
                treeQuyenLoiGoi.delete_node(node_selected[i]);
            }
            disableTreeQuyenLoiSP();
            ARR_GOI_BH = getTreeQuyenLoiGoi();
        });
    });
    $("#btnLuuNhapTien").click(function () {
        luuNhapTien();
    });
    $("#btnLuuDongNhapTien").click(function () {
        luuNhapTien(() => {
            _popupoverNhapTien.hide();
        });
    });
    $("#btnDongNhapTien").click(function () {
        _popupoverNhapTien.hide();
    });
    $("#btnLuu").click(function () {
        if (!_frmThongTinGoiBH.isValid()) {
            return;
        }
        var obj = _frmThongTinGoiBH.getJsonData();
        if (parseInt(obj.tuoi_tu) < 0 || parseInt(obj.tuoi_toi) < 0) {
            _notifyService.error("Tuổi phải lớn hơn 0");
            return;
        }
        if (parseInt(obj.tuoi_tu) > 200 || parseInt(obj.tuoi_toi) > 200) {
            _notifyService.error("Độ tuổi quá lớn");
            return;
        }
        if (parseInt(obj.tuoi_tu) >= parseInt(obj.tuoi_toi)) {
            _notifyService.error("Từ tuổi không được lớn hơn đến tuổi");
            return;
        }
        obj.dk = [];
        var ql = getTreeQuyenLoiGoi();
        ql = ql.removeItem(n => n.id == "QL_GOC");
        //if (ql.length <= 0) {
        //    _notifyService.error("Bạn chưa thêm quyền lợi vào gói");
        //    return;
        //}
        obj.dk = ql.select(n => {
            var obj = {
                lh_nv: n.id,
                lh_nv_ct: n.parent == "QL_GOC" ? "" : n.parent,
                ten: n.ten,
                so_lan_ngay: n.so_lan_ngay,
                tien_lan_ngay: n.tien_lan_ngay,
                tien_nam: n.tien_nam,
                tl_phi: 0,
                phi: 0,
                dong_bh: 0,
                so_ngay_cho: 0,
                ghi_chu: "",
                quyen_loi: "",
                loai: "",
                loaiq: ""
            }
            return obj;
        });
        _packageService.luuGoiBH(obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _frmThongTinGoiBH.getControl("so_id").val(res.out_value.so_id);
            xemChiTietGoi({ ma_doi_tac: obj.ma_doi_tac, so_id: _frmThongTinGoiBH.getControl("so_id").val() });
            getPaging(1);
            _notifyService.success("Lưu thông tin gói thành công");
        });
    });
    $("#btnLuuTienQLoi").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin quyền lợi này không?",
            "",
            () => {
                var obj = {
                    ma_doi_tac: _frmThongTinGoiBH.getControl("ma_doi_tac").val(),
                    so_id: _frmThongTinGoiBH.getControl("so_id").val(),
                    dk: getDataTienQloi()
                };
                //var count_error = 0;
                //$.each(obj.dk, (index, item) => {
                //    if (item.tien_lan_ngay > item.tien_nam) {
                //        count_error++;
                //    }
                //});
                var count_error = obj.dk.where(item => parseFloat(item.tien_lan_ngay) > parseFloat(item.tien_nam)).length;
                if (count_error > 0) {
                    _notifyService.error('Số tiền quyền lợi ngày không thể lớn hơn số tiền quyền lợi năm!');
                    return;
                }
                _packageService.luuTienQuyenLoi(obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    _notifyService.success("Lưu thông tin thành công");
                });
            });
    });
    $("#btnCopy").click(function () {
        _frmThongTinGoiBH.getControl("so_id").val("");
        _frmThongTinGoiBH.getControl("tuoi_tu").val("0");
        _frmThongTinGoiBH.getControl("tuoi_toi").val("0");
        _frmThongTinGoiBH.getControl("ma_doi_tac").readOnly(false);
        //_frmThongTinGoiBH.getControl("ma_doi_tac").setValue(ESCS_MA_DOI_TAC_DUY_NHAT);
        _frmThongTinGoiBH.getControl("ma").readOnly(false);
        //_frmThongTinGoiBH.getControl("ma").val("");
    });
    $('#btnLuuDKBS').click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin quyền lợi bổ sung này không?", "", () => {
            var obj = _frmThongTinGoiBH.getJsonData();
            var objData = {
                ma_doi_tac: obj.ma_doi_tac,
                so_id: obj.so_id,
                data: getTableDKBS()
            }
            //console.log(objData);
            _packageService.luuDkbsGoi(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnLuuTyLeDong").click(function () {
        _notifyService.confirm("Bạn có chắc chắn muốn lưu thông tin tỷ lệ đồng - thời gian chờ này không?", "", () => {
            var obj = _frmThongTinGoiBH.getJsonData();
            var arr = [];
            arr.push({
                nhom_bv: "C",
                tl_dong: $("#bvc_tl_dong").val(),
                tg_cho: $("#bvc_tg_cho").val(),
            });
            arr.push({
                nhom_bv: "T",
                tl_dong: $("#bvt_tl_dong").val(),
                tg_cho: $("#bvt_tg_cho").val(),
            });
           
            var objData = {
                ma_doi_tac: obj.ma_doi_tac,
                so_id: obj.so_id,
                ma: obj.ma,
                data_bv: arr,
                data_ma: getTableMaBenh()
            };
            _packageService.luuTyLeDong(objData).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.success("Lưu thông tin thành công");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        });
    });
    $("#btnChonCauHinhMaBenh").click(function () {
        var arr_table = getTableMaBenh();
        var arr_chon = getCheckedMaBenh();
        var arr_tong_hop = [];
        for (var i = 0; i < arr_chon.length; i++) {
            var ma_benh = arr_table.where(n => n.ma_benh == arr_chon[i].ma_benh).firstOrDefault();

            if (ma_benh != null) {
                ma_benh.ten_v = objDanhMuc.ma_benh.where(n => n.ma == ma_benh.ma_benh).firstOrDefault().ten_v;
                arr_tong_hop.push(ma_benh);
            }
            else {
                arr_tong_hop.push(arr_chon[i]);
            }
        }
        ESUtil.genHTML("modalThemMaBenh_template", "modalThemMaBenh", { ds_ma_benh: arr_tong_hop });
        _modalCauHinhMaBenh.hide();
    });
    $("#btnChonCauHinhDKBS").click(function () {
        var arr_table = getTableDKBS();
        var arr_chon = getCheckedDKBS();
        var arr_tong_hop = [];
        for (var i = 0; i < arr_chon.length; i++) {
            var ma_dkbs = arr_table.where(n => n.ma == arr_chon[i].ma).firstOrDefault();
            if (ma_dkbs != null) {
                ma_dkbs.ten = objDanhMuc.dkbs.where(n => n.ma == ma_dkbs.ma).firstOrDefault().ten;
                arr_tong_hop.push(ma_dkbs);
            }
            else {
                arr_tong_hop.push(arr_chon[i]);
            }
        }   
        ESUtil.genHTML("tableDKBSTemplate", "tableDKBS", { ds_dkbs: arr_tong_hop });
        _modalCauHinhDKBS.hide();
    });
    $("#inputSearch_CauHinhDKBS").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalCauHinhDKBSDanhSach .dkbs").removeClass("d-none");
            return;
        }
        $("#modalCauHinhDKBSDanhSach .dkbs").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.dkbs.where(n => n.ten.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalCauHinhDKBSDanhSach #dkbs_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#inputSearch_CauHinhMaBenh").keyup(ESUtil.delay(function (e) {
        var tim = $(this).val().toLowerCase().trim();
        if (tim == "") {
            $("#modalCauHinhMaBenhDanhSach .chmb").removeClass("d-none");
            return;
        }
        $("#modalCauHinhMaBenhDanhSach .chmb").addClass("d-none");
        var source = [];
        if (tim != "") {
            source = objDanhMuc.ma_benh.where(n => n.ten_v.toLowerCase().includes(tim));
        }
        if (source != null && source.length > 0) {
            for (var i = 0; i < source.length; i++) {
                $("#modalCauHinhMaBenhDanhSach #chmb_" + source[i].ma).removeClass("d-none");
            }
        }
    }, 300));
    $("#btnExportExcel").click(function () {
        var obj = {
            ma_doi_tac: _frmThongTinGoiBH.getControl('ma_doi_tac').val(),
            so_id: _frmThongTinGoiBH.getControl('so_id').val(),
            ma_goi: _frmThongTinGoiBH.getControl('ma').val()
        }
        obj.ma_mau_in = "ESCS_EXCEL_DS_GOI_BH";
        _service.getFile("/common/ExportExcelV2", obj).then(res => {
            ESUtil.convertBase64ToFile(res, obj.ma_mau_in + "_" + new Date().getFullYear() + new Date().getMonth() + new Date().getDay() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + new Date().getMilliseconds() + ".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        });
    });
    $('#btnImportExcel').click(function () {
        $("#table_import_excel thead tr").html('');
        $("#table_import_excel tbody").html('');
        _modalUploadExcel.show();
    });
    $('#btnUploadExcel').click(function () {
        $("#frmImportExcelFile").click();
    });
    $('#btnSaveExcel').click(function () {
        var obj = {
            ma_doi_tac: _frmThongTinGoiBH.getControl('ma_doi_tac').getValue(),
            so_id: _frmThongTinGoiBH.getControl('so_id').val(), 
            data: objData
        };
        _packageService.SaveDataExcel(obj).then(res => {
            if (res.state_info.status === "OK") {
                var obj1 = {
                    ma_doi_tac: _frmThongTinGoiBH.getControl('ma_doi_tac').getValue(),
                    so_id: _frmThongTinGoiBH.getControl("so_id").val()
                }
                xemChiTietGoi(obj1);
                getPaging(1);
                _notifyService.success("Import excel thành công.");
                _modalUploadExcel.hide();
            } else {
                _notifyService.error(res.state_info.message_body);
            }
        });
    });
    $('#btnLuuGhiChuKhac').click(function () {
        var objData = {
            ma_doi_tac: _frmThongTinGoiBH.getControl("ma_doi_tac").getValue(),
            so_id: _frmThongTinGoiBH.getControl("so_id").val(),
            arr: getTableGhiChuKhac()
        }
        _packageService.LuuGhiChuKhac(objData).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
            }
            _notifyService.success("Lưu thông tin thành công");
        });
    });
    $("#btnThemNhomGoi").click(function () {
        $("#btnThemNhomGoiMoi").removeClass("d-none");
        $("#btnNhomGoiQuayVe").addClass("d-none");
        $("#btnLuuNhomGoi").addClass("d-none");

        $("#modalAddNhomGoiDsChon").removeClass("d-none");
        $("#modalAddNhomGoiBHForm").addClass("d-none");
        _frmAddNhomGoiBH.resetForm();
        _frmAddNhomGoiBH.clearErrorMessage();
        _packageService.LayDanhSachNhomGoiBH().then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            objDanhMuc.nhom_goi = res.data_info;
            ESUtil.genHTML("dsNhomGoiTemplate", "dsNhomGoi", { data: objDanhMuc.nhom_goi });
            _modalAddNhomGoi.show();
        });
    });
    $("#btnThemNhomGoiMoi").click(function () {
        $("#btnThemNhomGoiMoi").addClass("d-none");
        $("#btnNhomGoiQuayVe").removeClass("d-none");
        $("#btnLuuNhomGoi").removeClass("d-none");
        $("#modalAddNhomGoiDsChon").addClass("d-none");
        $("#modalAddNhomGoiBHForm").removeClass("d-none");
        _frmAddNhomGoiBH.resetForm();
        _frmAddNhomGoiBH.clearErrorMessage();
    });
    $("#btnNhomGoiQuayVe").click(function () {
        $("#btnThemNhomGoiMoi").removeClass("d-none");
        $("#btnNhomGoiQuayVe").addClass("d-none");
        $("#btnLuuNhomGoi").addClass("d-none");
        $("#modalAddNhomGoiDsChon").removeClass("d-none");
        $("#modalAddNhomGoiBHForm").addClass("d-none");
        _frmAddNhomGoiBH.resetForm();
        _frmAddNhomGoiBH.clearErrorMessage();
    });
    $("#btnLuuNhomGoi").click(function () {
        var obj = _frmAddNhomGoiBH.getJsonData();
        _packageService.LuuNhomGoiBH(obj).then(res => {
            if (res.state_info.status !== 'OK') {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _packageService.LayDanhSachNhomGoiBH().then(res1 => {
                if (res1.state_info.status !== 'OK') {
                    _notifyService.error(res1.state_info.message_body);
                    return;
                }
                objDanhMuc.nhom_goi = res1.data_info;
                ESUtil.genHTML("dsNhomGoiTemplate", "dsNhomGoi", { data: objDanhMuc.nhom_goi }, () => {
                    $("btnNhomGoiQuayVe").trigger("click");
                });
            });
            _notifyService.success("Lưu nhóm gói bảo hiểm thành công");
        });
    });
    getPaging(1);
});