var profileData = {};
var trang = 1;
var trang_max = 1;
var trang_max_nd = 1;
var _serviceTemp = new Service();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _modalPreviewFileService = new ModalPreviewFileService();
var _modalDocumentService = new ModalDocumentService();
var _modalXemHinhAnhChiTiet = new ModalFullScreenService("modalXemHinhAnhChiTiet", "");
var _modalXemHinhAnhHangMucTonThat = new ModalFullScreenService("modalXemHinhAnhHangMucTonThat", "");
var _modalThemCanBoTraoDoiXeOTo = new ModalService("modalThemCanBoTraoDoiXeOTo");
var _modalThemCanBoTraoDoiConNguoi = new ModalService("modalThemCanBoTraoDoiConNguoi");

var _frmThemCanBoTraoDoiXeOTo = new FormService("frmThemCanBoTraoDoiXeOTo");
var _frmNoiDungTraoDoiXeOTo = new FormService("frmNoiDungTraoDoiXeOTo");
var _frmThemCanBoTraoDoiConNguoi = new FormService("frmThemCanBoTraoDoiConNguoi");
var _frmThemNoiDungTraoDoiConNguoi = new FormService("frmThemNoiDungTraoDoiConNguoi");
var _frmNhomChatTraoDoi = new FormService("frmNhomChatTraoDoi");
var _frmHangMucTonThatTNDSTAISAN = new FormService("frmHangMucTonThatTNDSTAISAN");
var _frmThongTinTinhToanTNDSTAISAN = new FormService("frmThongTinTinhToanTNDSTAISAN");

var _popoverModalXemToanBoThongTin = new PopoverService("popoverModalXemToanBoThongTin");

var _navToanBoThongTinHoSoBoiThuong = new NavTabService("navToanBoThongTinHoSoBoiThuong", ["tabToanBoThongTinHoSoBoiThuong", "tabToanBoThongTinHoSoGiayTo"], "quy-trinh");
function ModalThongTinHoSoService() {
    this.modalId = "modalXemToanBoThongTinHoSo";
    this.data = null;
    this.xemChiTietThongTinHoSo = function (isShow = true) {
        var _notifyService = new NotifyService();
        var _instance = this;
        var obj = _instance.data;
        if (_instance.data == undefined || _instance.data == null ||
            _instance.data.nv == undefined || _instance.data.nv == null || _instance.data.nv == "" ||
            _instance.data.ma_doi_tac == undefined || _instance.data.ma_doi_tac == null || _instance.data.ma_doi_tac == "" ||
            _instance.data.ma_chi_nhanh_ql == undefined || _instance.data.ma_chi_nhanh_ql == null || _instance.data.ma_chi_nhanh_ql == "" ||
            _instance.data.ma_chi_nhanh == undefined || _instance.data.ma_chi_nhanh == null || _instance.data.ma_chi_nhanh == "" ||
            _instance.data.so_id == undefined || _instance.data.so_id == null || _instance.data.so_id == "" || _instance.data.so_id == "0" ||
            _instance.data.so_id_hd == undefined || _instance.data.so_id_hd == null || _instance.data.so_id_hd == "" || _instance.data.so_id_hd == "0" ||
            _instance.data.so_id_dt == undefined || _instance.data.so_id_dt == null || _instance.data.so_id_dt == "" || _instance.data.so_id_dt == "0") {
            _notifyService.error("Thiếu thông tin để xem thông tin của hồ sơ");
            return;
        }
        var objFile = {
            ma_doi_tac: _instance.data.ma_doi_tac,
            ma_chi_nhanh: _instance.data.ma_chi_nhanh,
            so_id: _instance.data.so_id,
            nv: _instance.data.nv
        }
        if (_instance.data.nv == "XE" || _instance.data.nv == "XE_MAY") {
            _serviceTemp.all([
                _serviceTemp.postData("/carclaim/carclaimcommon/xemToanBoThongTinHoSoBoiThuong", obj),
                _serviceTemp.postData("/carclaim/carinvestigation/getfilesthumnail", objFile)
            ]).then(arrRes => {
                var arrResHoSo = arrRes[0];
                var arrResHinhAnh = arrRes[1];
                if (arrResHoSo.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (arrResHinhAnh.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                profileData = arrResHoSo.data_info;
                //Thong tin hoa don chung tu
                $(".soHoSo_ModalXemToanBoThongTin").html(profileData.ho_so.so_hs);
                $(".ngayDong_ModalXemToanBoThongTin").html(profileData.ho_so.ngay_dong_hs);
                $(".donViCapDon_ModalXemToanBoThongTin").html(profileData.ho_so.ten_cnhanh_cap);
                $(".soTien_ModalXemToanBoThongTin").html(ESUtil.formatMoney(profileData.ho_so.tien_duyet));
                $(".soTienThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(profileData.ho_so.thue));
                $(".tongSoTien_ModalXemToanBoThongTin").html(ESUtil.formatMoney(profileData.ho_so.tien_duyet + profileData.ho_so.thue));
                ESUtil.genHTML("modalChonSoHoaDonTemplate", "modalChonSoHoaDonDanhSach", { danh_sach: profileData.chung_tu });
                //initHoaDonChungTu(profileData);
                //initNguoiThuHuong(profileData);
                //Thông tin chung của hồ sơ
                ESUtil.genHTML("tblToanBoThongTinChungHoSoBoiThuongXeOTo_template", "tblToanBoThongTinChungHoSoBoiThuongXeOTo", { ho_so: profileData.ho_so });
                //Thông tin giấy chứng nhận
                ESUtil.genHTML("tblToanBoThongTinGiayChungNhanXeOTo_template", "tblToanBoThongTinGiayChungNhanXeOTo", { gcn: profileData.gcn });
                ESUtil.genHTML("tblToanBoThongTinLoaiHinhNghiepVuThamGia_template", "tblToanBoThongTinLoaiHinhNghiepVuThamGia", { data: profileData.dk }, () => {
                    var tongTienThamGiaBaoHiem = 0;
                    var tongTienMienThuong = 0;
                    var tongTienPhiBaoHiem = 0;
                    for (var i = 0; i < profileData.dk.length; i++) {
                        tongTienThamGiaBaoHiem += profileData.dk[i].tien;
                        tongTienMienThuong += profileData.dk[i].mien_thuong;
                        tongTienPhiBaoHiem += profileData.dk[i].phi;
                    }
                    $("#tongTienTienThamGiaBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienThamGiaBaoHiem));
                    $("#tongTienMienThuong_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienMienThuong));
                    $("#tongTienPhiBaoHiem_xemToanBoThongTinHSBTXe").html(ESUtil.formatMoney(tongTienPhiBaoHiem));
                });
                //Thông tin lịch sử tổn thất
                ESUtil.genHTML("tblToanBoLichSuTonThatXeOTo_template", "tblToanBoLichSuTonThatXeOTo", { data: profileData.lich_su_ton_that });
                //Thông tin vụ tổn thất
                ESUtil.genHTML("tblToanBoThongTinVuTonThatXeOTo_template", "tblToanBoThongTinVuTonThatXeOTo", { data: profileData.ds_vu_tt });
                ESUtil.genHTML("tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo_template", "tblToanBoThongTinDaiDienCacBenThamGiaGiamDinhXeOTo", { data: profileData.ds_nguoi_tham_gia });
                //Thông tin lịch giám định
                ESUtil.genHTML("tblToanBoThongTinLichGiamDinhXeOTo_template", "tblToanBoThongTinLichGiamDinhXeOTo", { data: profileData.ds_lan_gd });
                //Thông tin hồ sơ giấy tờ
                ESUtil.genHTML("tblToanBoThongTinHoSoGiayToXeOTo_template", "tblToanBoThongTinHoSoGiayToXeOTo", { ho_so_giay_to: profileData.ho_so_giay_to });
                //Thông tin quá trình xử lý
                ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo_template", "tblToanBoThongTinQuaTrinhGiaiQuyetXeOTo", { data: profileData.qua_trinh_xu_ly });
                //Thông tin loại hình nghiệp vụ
                ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong_template", "navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong", { danh_sach: profileData.lh_nv });
                ESUtil.genHTML("navToanBoThongTinLoaiHinhNghiepVuHMTT_template", "navToanBoThongTinLoaiHinhNghiepVuHMTT", { danh_sach: profileData.lh_nv });
                var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
                var arrAnh = arrResHinhAnh.data_info.where(n => ext.includes(n.extension));
                var arrPDF = arrResHinhAnh.data_info.where(n => n.extension == ".pdf");
                var arrAnhTC = [];
                var arrAnhTT = [];
                var arrAnhCPL = [];
                var arrAnhGTTL = [];
                for (var i = 0; i < arrAnh.length; i++) {
                    if (arrAnh[i].loai == "TC") {
                        arrAnhTC.push(arrAnh[i]);
                    }
                    if (arrAnh[i].loai == "TT") {
                        arrAnhTT.push(arrAnh[i]);
                    }
                    if (arrAnh[i].loai == "TL") {
                        arrAnhGTTL.push(arrAnh[i]);
                    }
                    if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                        arrAnhCPL.push(arrAnh[i]);
                    }
                }
                arrAnhTC = bindImagesToanBoAnhHoSo(arrAnhTC);
                arrAnhTT = bindImagesToanBoAnhHoSo(arrAnhTT);
                arrAnhGTTL = bindImagesToanBoAnhHoSo(arrAnhGTTL);
                arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);

                ESUtil.genHTML("tblToanBoThongTinAnhToanCanhXeOTo_template", "tblToanBoThongTinAnhToanCanhXeOTo", { dataAnhToanCanh: arrAnhTC });
                ESUtil.genHTML("tblToanBoThongTinAnhTonThatXeOTo_template", "tblToanBoThongTinAnhTonThatXeOTo", { dataAnhTonThat: arrAnhTT });
                ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToXeOTo_template", "tblToanBoThongTinAnhHoSoGiayToXeOTo", { dataAnhHoSoGiayTo: arrAnhGTTL });
                ESUtil.genHTML("tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo_template", "tblToanBoThongTinAnhHoSoChuaPhanLoaiXeOTo", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
                ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFXeOTo_template", "tblToanBoThongTinTaiLieuPDFXeOTo", { dataTaiLieuPDF: arrPDF });
                ////Mẫu in
                var sourceMauIn = [
                    { ma: "ESCS_TBTN_YCBT", ten: "Thông báo tai nạn và yêu cầu bồi thường" },
                    { ma: "ESCS_BCGD", ten: "Báo cáo giám định" },
                    { ma: "ESCS_BBGD_HIEN_TRUONG", ten: "Biên bản ghi nhận hiện trường" },
                    { ma: "ESCS_BBGD_XAC_DINH_THIET_HAI_XCG", ten: "Biên bản giám định/xác định thiệt XCG" },
                    { ma: "ESCS_TO_TRINH_PHUONG_AN_SUA_CHUA", ten: "Tờ trình phương án sửa chữa" },
                    { ma: "ESCS_TB_DUYET_PHUONG_AN", ten: "Thông báo duyệt phương án" },
                    { ma: "ESCS_THONG_BAO_DUYET_BAO_LANH", ten: "Thông báo duyệt bảo lãnh" },
                    { ma: "ESCS_TO_TRINH_BOI_THUONG", ten: "Tờ trình bồi thường" },
                    { ma: "ESCS_THONG_BAO_BOI_THUONG", ten: "Thông báo bồi thường" },
                    { ma: "ESCS_TO_TRINH_TU_CHOI_BT", ten: "Tờ trình từ chối bồi thường" },
                    { ma: "ESCS_TB_TU_CHOI_TB", ten: "Thông báo từ chối bồi thường" }
                ];
                ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnXeOTo", { dataTaiLieuIn: sourceMauIn });
                _modalDocumentService.setDataSource(sourceMauIn);
                if (isShow) {
                    $('#' + _instance.modalId).modal('show');
                    _instance.anHienTabTheoNghiepVu();
                    showStepThongTinHoSo("tabToanBoThongTinHoSoBoiThuong");
                }
            });

            $("#btnTaiAnhToanCanhXe_ModalXemToanBoThongTin").bind('click', function () {
                var arr = getImagesHinhAnhHoSo("ds_tai_anh_toan_canh");
                dowloadHinhAnhHoSo(arr);
            });
            $("#btnInAnhToanCanhXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_in_anh_toan_canh");
                printHinhAnhHoSo(arr);
            });
            $("#btnXemAnhToanCanhXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_xem_anh_toan_canh");
                if (arr.length > 0) {
                    xemToanBoHinhAnhHoSoBoiThuong("TOAN_CANH", arr);
                } else {
                    _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
                    return;
                }
            });
            $("#btnTaiAnhTonThatXe_ModalXemToanBoThongTin").bind('click', function () {
                var arr = getImagesHinhAnhHoSo("ds_tai_anh_ton_that");
                dowloadHinhAnhHoSo(arr);
            });
            $("#btnInAnhTonThatXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_in_anh_ton_that");
                printHinhAnhHoSo(arr);
            });
            $("#btnXemAnhTonThatXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_xem_anh_ton_that");
                if (arr.length > 0) {
                    xemToanBoHinhAnhHoSoBoiThuong("CHINH", arr);
                } else {
                    _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
                    return;
                }
            });
            $("#btnTaiAnhHoSoGiayToXe_ModalXemToanBoThongTin").bind('click', function () {
                var arr = getImagesHinhAnhHoSo("ds_tai_anh_ho_so_giay_to");
                dowloadHinhAnhHoSo(arr);
            });
            $("#btnInAnhHoSoGiayToXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_in_anh_ho_so_giay_to");
                printHinhAnhHoSo(arr);
            });
            $("#btnXemAnhHoSoGiayToXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_xem_anh_ho_so_giay_to");
                if (arr.length > 0) {
                    xemToanBoHinhAnhHoSoBoiThuong("TAI_LIEU", arr);
                } else {
                    _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
                    return;
                }
            });
            $("#btnTaiAnhChuaPhanLoaiXe_ModalXemToanBoThongTin").bind('click', function () {
                var arr = getImagesHinhAnhHoSo("ds_tai_anh_chua_phan_loai");
                dowloadHinhAnhHoSo(arr);
            });
            $("#btnInAnhChuaPhanLoaiXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_in_anh_chua_phan_loai");
                printHinhAnhHoSo(arr);
            });
            $("#btnXemAnhChuaPhanLoaiXe_ModalXemToanBoThongTin").bind("click", function () {
                var arr = getImagesHinhAnhHoSo("ds_xem_anh_chua_phan_loai");
                if (arr.length > 0) {
                    xemToanBoHinhAnhHoSoBoiThuong("CHUA_PHAN_LOAI", arr);
                } else {
                    _notifyService.error("Vui lòng chọn ảnh/tài liệu cần xem");
                    return;
                }
            });
            $('#divTableXemToanBoAnhToanCanhXeOTo').scroll(function () {
                let div = $(this).get(0);
                if (Math.round((div.scrollTop + div.offsetHeight)) < div.scrollHeight - 100) {
                    trang++;
                    if (trang > trang_max) {
                        return;
                    }
                    getPagingListImages(trang, "TOAN_CANH", () => { initImageViewerToanBoAnh(); });
                }
            });
            $('#divTableXemToanBoAnhTonThatXeOTo').scroll(function () {
                let div = $(this).get(0);
                if (Math.round((div.scrollTop + div.offsetHeight)) < div.scrollHeight - 100) {
                    trang++;
                    if (trang > trang_max) {
                        return;
                    }
                    getPagingListImages(trang, "CHINH", () => { initImageViewerToanBoAnh(); });
                }
            });
            $('#divTableXemToanBoAnhHoSoGiayToXeOTo').scroll(function () {
                let div = $(this).get(0);
                if (Math.round((div.scrollTop + div.offsetHeight)) < div.scrollHeight - 100) {
                    trang++;
                    if (trang > trang_max) {
                        return;
                    }
                    getPagingListImages(trang, "TAI_LIEU", () => { initImageViewerToanBoAnh(); });
                }
            });
            $('#divTableXemToanBoAnhChuaPhanLoaiXeOTo').scroll(function () {
                let div = $(this).get(0);
                if (Math.round((div.scrollTop + div.offsetHeight)) < div.scrollHeight - 100) {
                    trang++;
                    if (trang > trang_max) {
                        return;
                    }
                    getPagingListImages(trang, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
                }
            });
            $("#btnThemNoiDungTraoDoiXeOTo").click(function () {
                if (_frmNoiDungTraoDoiXeOTo.isValid()) {
                    var obj = _frmNoiDungTraoDoiXeOTo.getJsonData();
                    obj.so_id = profileData.ho_so.so_id;
                    obj.nv = 'XE';
                    if (obj.nd.trim() == "" || obj.nd.trim() == null) {
                        _notifyService.error("Bạn chưa nhập nội dung trao đổi");
                        return;
                    }
                    _serviceTemp.postData("/carclaim/carclaimcommon/nhapNoiDungTraoDoi", obj).then(res => {
                        if (res.state_info.status !== "OK") {
                            _notifyService.error(res.state_info.message_body);
                            return;
                        }
                        $("#noiDungTraoDoiXeOTo").setValue("");
                        $("#tblDanhSachNoiDungTraoDoiXeOTo").html("");
                        trang = 1;
                        getPagingNoiDungTraoDoi(trang, () => {
                            let div = $('#lichSuChatTraoDoiXeOTo').get(0);
                            div.scrollTo(0, document.body.scrollHeight);
                        });
                    });
                }
            });
            $("#noiDungTraoDoiXeOTo").keydown(function (event) {
                var code = event.keyCode || event.which;
                if (code === 13) {
                    event.preventDefault();
                    $("#btnThemNoiDungTraoDoiXeOTo").trigger('click');
                }
            });
            $("#btnThemNguoiThamGiaTraoDoiXeOTo").click(function () {
                _frmThemCanBoTraoDoiXeOTo.resetForm();
                _frmThemCanBoTraoDoiXeOTo.clearErrorMessage();
                bindDataCanBoTraoDoiXeOTo(profileData.ho_so.ma_doi_tac, profileData.ho_so.so_id);
                _modalThemCanBoTraoDoiXeOTo.show();
            });
            $("#btnThemVaDongCanBoTraoDoiXeOTo").click(function () {
                if (_frmThemCanBoTraoDoiXeOTo.isValid()) {
                    var formData = _frmThemCanBoTraoDoiXeOTo.getJsonData();
                    _serviceTemp.postData("/carclaim/carclaimcommon/themCanBoTraoDoi", formData).then(res => {
                        if (res.state_info.status === "OK") {
                            _notifyService.success("Thêm cán bộ thành công");
                            _modalThemCanBoTraoDoiXeOTo.hide();
                            getPagingDanhSachCanBoTraoDoi();
                        }
                        else {
                            _notifyService.error(res.state_info.message_body);
                        }
                    });
                }
            });
            $('#lichSuChatTraoDoiXeOTo').scroll(function () {
                let div = $(this).get(0);
                if ((Math.round(div.scrollTop)) <= 0) {
                    trang++;
                    if (trang > trang_max_nd) {
                        return;
                    }
                    getPagingNoiDungTraoDoi(trang);
                    div.scroll({ top: 1, behavior: "smooth" });
                }
            });
            $("#input_imagesHangMucTonThat").keyup(ESUtil.delay(function (e) {
                var val = $("#input_imagesHangMucTonThat").val().trim();
                $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").removeClass("d-none");
                if (val != "") {
                    $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat").addClass("d-none");
                    var textSearch = ESUtil.xoaKhoangTrangText(val);
                    $("#dsHinhAnhHangMucTonThat .imagesHangMucTonThat[data-search*=" + textSearch + "]").removeClass("d-none");
                }
            }, 300));
            _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").addEventChange(val => {
                $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").addClass("d-none");
                $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").addClass("d-none");
                $("#divHangMucTonThatTNDSTaiSanKhac_ModalXemToanBoThongTin").addClass("d-none");
                $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN_XE").addClass("d-none");
                if (val == "XE") {
                    $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").removeClass("d-none");
                    $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN_XE").removeClass("d-none");
                    $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").removeClass("d-none");
                    var ds_tsan_xe = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
                    _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong").setDataSource(ds_tsan_xe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "");
                    if (ds_tsan_xe.length > 0) {
                        _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong").setValue(ds_tsan_xe[0].so_id_doi_tuong);
                        _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong").trigger("select2:select");
                    }
                }
                if (val == "KHAC") {
                    $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").removeClass("d-none");
                    $("#divHangMucTonThatTNDSTaiSanKhac_ModalXemToanBoThongTin").removeClass("d-none");
                    var lh_nv = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-lhnv");
                    var doi_tuong = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-doi-tuong");
                    var nhom = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-nhom");
                    xemChiTietNghiepVuHoSo(doi_tuong, val, lh_nv, 0, res => {
                        ESUtil.genHTML("modalHangMucTonThatTNDSTaiSanKhacTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSTaiSanKhac_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                            if (res.data_info != null && res.data_info.length > 0) {
                                $("#tongTienHangMucTonThatTNDSTaiSanKhac_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                            }
                        });
                    });
                }
            });
            _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong").addEventChange(val => {
                var lh_nv = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-lhnv");
                var doi_tuong = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-doi-tuong");
                var nhom = $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li.active").attr("data-nhom");
                var so_id_doi_tuong = _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong").val();
                xemChiTietNghiepVuHoSo(doi_tuong, "XE", lh_nv, so_id_doi_tuong, res => {
                    ESUtil.genHTML("modalHangMucTonThatTNDSTaiSanXeTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                        if (res.data_info != null && res.data_info.length > 0) {
                            $("#tongTienHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.gia_giam_dinh)));
                        }
                    });
                });
            });
            _frmThongTinTinhToanTNDSTAISAN.getControl("loai_tai_san").addEventChange(val => {
                xemThongTinTinhToanTNDSTaiSan(val);
            });
            _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").addEventChange(val => {
                var obj = {
                    ma_doi_tac: profileData.ho_so.ma_doi_tac,
                    so_id: profileData.ho_so.so_id,
                    lh_nv: $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li.active").attr("data-lhnv"),
                    so_id_doi_tuong: val
                }
                var objLHNV = profileData.lh_nv.where(n => n.ma == obj.lh_nv).firstOrDefault();
                if (profileData.lh_nv.length == 0 && objLHNV == null) {
                    objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
                }
                _serviceTemp.postData("/carclaim/CarCompensation/layHangMucLHNV", obj).then(res => {
                    if (res.state_info.status !== "OK") {
                        _notifyService.error(res.state_info.message_body);
                        return;
                    }
                    if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                        ESUtil.genHTML("modalThongTinTinhToanTNDSTaiSanVCXTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSTaiSanVCX_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                            var giaDuyetVtu = res.data_info.data.sum(n => parseFloat(n.gia_vtu_duyet));
                            var giaDuyetNC = res.data_info.data.sum(n => parseFloat(n.gia_nhan_cong_duyet));
                            var giaDuyetKhac = res.data_info.data.sum(n => parseFloat(n.gia_khac_duyet));
                            var tienKhauHao = res.data_info.data.sum(n => parseFloat(n.tien_khau_hao));
                            var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                            var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                            var tienGiamGia = res.data_info.data.sum(n => parseFloat(n.giam_gia));
                            var tienKtruBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_ktru_tien_bh));
                            var tienThue = res.data_info.data.sum(n => parseFloat(n.tien_thue));
                            $(".tblThongTinTinhToanVCXTienDuyetVtu_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetVtu));
                            $(".tblThongTinTinhToanVCXTienDuyetNC_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetNC));
                            $(".tblThongTinTinhToanVCXTienDuyetKhac_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetKhac));
                            $(".tblThongTinTinhToanVCXTienKhauHao_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKhauHao));
                            $(".tblThongTinTinhToanVCXTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                            $(".tblThongTinTinhToanVCXTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                            $(".tblThongTinTinhToanVCXTienDuyetGiamGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamGia));
                            $(".tblThongTinTinhToanVCXTienKhauTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKtruBaoHiem));
                            $(".tblThongTinTinhToanVCXThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienThue));
                        });
                    }
                });
            });
        }
        if (_instance.data.nv == "NG") {
            _serviceTemp.all([
                _serviceTemp.postData("/healthclaim/HealthClaimCommon/layToanBoThongTinHoSo", obj),
                _serviceTemp.postData("/healthclaim/HealthClaimCommon/getfilesthumnail", obj)
            ]).then(arrRes => {
                var arrResHoSo = arrRes[0];
                var arrResHinhAnh = arrRes[1];
                if (arrResHoSo.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                if (arrResHinhAnh.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                profileData = arrResHoSo.data_info;

                ESUtil.genHTML("tblToanBoThongTinChungHoSoConNguoi_template", "tblToanBoThongTinChungHoSoConNguoi", { ho_so: profileData.ho_so });
                ESUtil.genHTML("tblToanBoThongTinGiayChungNhanConNguoi_template", "tblToanBoThongTinGiayChungNhanConNguoi", { gcn: profileData.gcn.firstOrDefault() });
                ESUtil.genHTML("tblToanBoThongTinChiTietGiayChungNhanConNguoi_template", "tblToanBoThongTinChiTietGiayChungNhanConNguoi", { profileData: data.gcn_ql });
                /*                ESUtil.genHTML("tblToanBoThongTinHoSoGiayToConNguoi_template", "tblToanBoThongTinHoSoGiayToConNguoi", { data: data.profileData });*/
                ESUtil.genHTML("tblToanBoThongTinKhamChuaBenhYCBHConNguoi_template", "tblToanBoThongTinKhamChuaBenhYCBHConNguoi", { data: profileData.lan_kham });
                ESUtil.genHTML("tblToanBoThongTinHoaDonChungTuConNguoi_template", "tblToanBoThongTinHoaDonChungTuConNguoi", { data: profileData.chung_tu });
                var chung_tu_tong_tien = chung_tu_tong_thue = chung_tu_tong_cong = 0;
                $.each(profileData.chung_tu, function (index, item) {
                    chung_tu_tong_tien += item.tien;
                    chung_tu_tong_thue += item.thue;
                    chung_tu_tong_cong += item.tong_cong;
                });
                $('#tongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_tien));
                $('#tongTienThueHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_thue));
                $('#tongCongTienHoaDonChungTu_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(chung_tu_tong_cong));
                ESUtil.genHTML("tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi_template", "tblToanBoThongTinNguoiThuHuongBoiThuongConNguoi", { data: data.thu_huong });
                var thu_huong_tong = 0;
                $.each(profileData.thu_huong, function (index, item) {
                    thu_huong_tong += item.tien;
                });
                $('#tongSoTienThuHuong_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(thu_huong_tong));

                ESUtil.genHTML("tblToanBoThongTinLichSuTonThatConNguoi_template", "tblToanBoThongTinLichSuTonThatConNguoi", { arrHoSo: profileData.lich_su_ton_that }, () => {
                    var tong_yc = 0, tong_duyet = 0;
                    $.each(profileData.lich_su_ton_that, (index, item) => {
                        tong_yc += parseFloat(item.so_tien_yc);
                        tong_duyet += parseFloat(item.so_tien_duyet);
                    });
                    $('#tongTienYeuCau_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_yc));
                    $('#tongTienDuyet_xemToanBoThongTinHSBT').html(ESUtil.formatMoney(tong_duyet));
                });
                ESUtil.genHTML("tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi_template", "tblToanBoThongTinQuaTrinhGiaiQuyetConNguoi", { data: profileData.qua_trinh_xly });
                //Hình ảnh
                var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
                var arrAnh = arrResHinhAnh.data_info.where(n => ext.includes(n.extension));
                var arrPDF = arrResHinhAnh.data_info.where(n => n.extension == ".pdf");
                var arrAnhTL = [];
                var arrAnhCPL = [];
                for (var i = 0; i < arrAnh.length; i++) {
                    if (arrAnh[i].loai == "TT") {
                        arrAnhTL.push(arrAnh[i]);
                    }
                    if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                        arrAnhCPL.push(arrAnh[i]);
                    }
                }
                arrAnhTL = bindImagesToanBoAnhHoSo(arrAnhTL);
                arrAnhCPL = bindImagesToanBoAnhHoSo(arrAnhCPL);
                arrPDF = bindImagesToanBoAnhHoSo(arrPDF);
                ESUtil.genHTML("tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi_template", "tblToanBoThongTinAnhHoSoGiayToTaiLieuConNguoi", { dataAnhGiayToTaiLieu: arrAnhTL });
                ESUtil.genHTML("tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi_template", "tblToanBoThongTinAnhGiayToTaiLieuCPLConNguoi", { dataAnhHoSoChuaPhanLoai: arrAnhCPL });
                ESUtil.genHTML("tblToanBoThongTinTaiLieuPDFConNguoi_template", "tblToanBoThongTinTaiLieuPDFConNguoi", { dataTaiLieuPDF: arrPDF });
                //Mẫu in
                var sourceMauIn = [
                    { ma: "ESCS_YCTTBH", ten: "Giấy yêu cầu trả tiền bảo hiểm" },
                    { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
                    { ma: "ESCS_TT_DXBT", ten: "Tờ trình đề xuất phương án trả tiền bảo hiểm" },
                    { ma: "ESCS_TT_DXBT_QL_KHAC", ten: "Thông báo phê duyệt đề xuất trả tiền bảo hiểm" },
                    { ma: "ESCS_NG_TO_TRINH_TU_CHOI_BH", ten: "Tờ trình từ chối chi trả tiền bảo hiểm" },
                    { ma: "ESCS_TBTCTTBH", ten: "Thông báo phê duyệt từ chối chi trả tiền bảo hiểm" },
                    { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" },
                    { ma: "ESCS_NG_TO_TRINH_DUYET_BAO_LANH", ten: "Thông báo trình bảo lãnh viện phí" },
                    { ma: "ESCS_TB_GYCXNBL_QL_KHAC", ten: "Giấy yêu cầu kiêm xác nhận bảo lãnh" },
                    { ma: "ESCS_NG_TRINH_TU_CHOI_BLVP", ten: "Tờ trình từ chối bảo lãnh viện phí" },
                    { ma: "ESCS_TB_TU_CHOI_BLVP", ten: "Thông báo từ chối bảo lãnh viện phí" },
                    { ma: "ESCS_YCBSHS", ten: "Giấy yêu cầu bổ sung hồ sơ giấy tờ" }
                ];
                ESUtil.genHTML("tblThongTinInAn_template", "tblThongTinInAnConNguoi", { dataTaiLieuIn: sourceMauIn });
                _modalDocumentService.setDataSource(sourceMauIn);
                if (isShow) {
                    $('#' + _instance.modalId).modal('show');
                    _instance.anHienTabTheoNghiepVu();
                    showStepThongTinHoSo("tabToanBoThongTinHoSoBoiThuong");
                }
            });
        }
    }
    this.hide = function () {
        $('#' + this.modalId).modal('hide');
    };
    this.OnInit = function () {

    }
    this.anHienTabTheoNghiepVu = function () {
        var _instance = this;
        var nv = _instance.data.nv;
        if (nv === "XE" || nv === "XE_MAY") {
            $("#navToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
            $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").removeClass('d-none');
            $("#navToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');
            $("#tabContentToanBoThongTinHoSoGiayToXeOTo").removeClass('d-none');

            $("#navToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
            $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").addClass('d-none');
            $("#navToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
            $("#tabContentToanBoThongTinHoSoGiayToConNguoi").addClass('d-none');
        }
        if (nv === "NG") {
            $("#navToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
            $("#tabContentToanBoThongTinHoSoBoiThuongXeOTo").addClass('d-none');
            $("#navToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');
            $("#tabContentToanBoThongTinHoSoGiayToXeOTo").addClass('d-none');

            $("#navToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
            $("#tabContentToanBoThongTinHoSoBoiThuongConNguoi").removeClass('d-none');
            $("#navToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
            $("#tabContentToanBoThongTinHoSoGiayToConNguoi").removeClass('d-none');
        }
    }
    this.OnInit();
}
function showStepThongTinHoSo(step) {
    if (step === "tabToanBoThongTinHoSoBoiThuong" && (profileData.ho_so.nghiep_vu === "XE" || profileData.ho_so.nghiep_vu === "XE_MAY") && MAN_HINH === "THANH_TOAN") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinHoaDonChungTuXe").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("li:first-child > a").addClass("active");
        showStepTabThongTinHoSo("tabToanBoThongTinChungXeOTo");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo" && (profileData.ho_so.nghiep_vu === "XE" || profileData.ho_so.nghiep_vu === "XE_MAY") && MAN_HINH === "THANH_TOAN") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhToanCanhXeOTo").addClass("active");
        $("#tabToanBoAnhToanCanhXeOToActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("li:first-child > a").addClass("active");
    }
    if (step === "tabToanBoThongTinHoSoBoiThuong" && (profileData.ho_so.nghiep_vu === "XE" || profileData.ho_so.nghiep_vu === "XE_MAY") && MAN_HINH !== "THANH_TOAN") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#anHienTabThongTinChungXeOTo").trigger('click');
        $("#anHienTabThongTinHoaDonChungTuXe").addClass("d-none");
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinChungXeOTo").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongXeOTo").find("li:nth-child(2) > a").addClass("active");
        showStepTabThongTinHoSo("tabToanBoThongTinChungXeOTo");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo" && (profileData.ho_so.nghiep_vu === "XE" || profileData.ho_so.nghiep_vu === "XE_MAY") && MAN_HINH !== "THANH_TOAN") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhToanCanhXeOTo").addClass("active");
        $("#tabToanBoAnhToanCanhXeOToActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayToXeOTo").find("li:first-child > a").addClass("active");
    }
    if (step === "tabToanBoThongTinHoSoBoiThuong" && profileData.ho_so.nghiep_vu === "NG") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#anHienTabThongTinChungConNguoi").trigger('click');
        $("#anHienTabThongTinHoaDonChungTuConNguoi").addClass("d-none");
        $("#tabXemToanBoThongTinHoSoBoiThuong").addClass("active");
        $("#tabXemToanBoThongTinHoSoGiayTo").removeClass("active");
        $("#tabToanBoThongTinChungConNguoi").addClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoBoiThuongConNguoi").find("li:nth-child(2) > a").addClass("active");
        showStepThongTinHoSoBoiThuong("tabToanBoThongTinChungConNguoi");
    }
    if (step === "tabToanBoThongTinHoSoGiayTo" && profileData.ho_so.nghiep_vu === "NG") {
        _navToanBoThongTinHoSoBoiThuong.showTab(step);
        $("#tabXemToanBoThongTinHoSoGiayTo").addClass("active");
        $("#tabXemToanBoThongTinHoSoBoiThuong").removeClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("active");
        $("#tabToanBoAnhHoSoGiayToTaiLieuConNguoiActive").trigger('click');
        $("#navToanBoThongTinHoSoGiayToConNguoi").find("a.active").removeClass("active");
        $("#navToanBoThongTinHoSoGiayToConNguoi").find("li:first-child > a").addClass("active");
    }
    return;
}
function callBackViewFile(res) {
    if (res.data_info.extension != ".pdf") {
        return;
    }
    _modalPreviewFileService.viewFile(res.data_info.duong_dan, res.data_info.ten_file);
}
function showStepTabThongTinHoSo(step) {
    if (step === "tabToanBoThongTinHangMucTonThatXeOTo") {
        $("#navToanBoThongTinLoaiHinhNghiepVuHMTT").find("li.breadcrumb-item:first-child").trigger("click");
    }
    if (step === "tabToanBoThongTinBoiThuongXeOTo") {
        $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong").find("li.breadcrumb-item:first-child").trigger("click");
    }
    if (step === "tabToanBoThongTinBaoGiaPhuongAnXeOTo") {
        if (profileData.ho_so.nghiep_vu == "XE") {
            var obj = {
                ma_doi_tac: profileData.ho_so.ma_doi_tac,
                so_id: profileData.ho_so.so_id
            }
            _serviceTemp.postData("/carclaim/CarCompensation/xemBangGiaChiTiet", obj).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.genHTML("tblToanBoThongTinTinhToanPhuongAnTemplate", "tblToanBoThongTinTinhToanPhuongAn", res.data_info, () => {
                    $("#tblToanBoThongTinTinhToanPhuongAn .pa_nghiep_vu_bang_tinh").addClass("d-none");
                    for (var i = 0; i < res.data_info.lh_nv.length; i++) {
                        var lh_nv_show = res.data_info.lh_nv[i].vcx + res.data_info.lh_nv[i].doi_tuong;
                        $("#tblToanBoThongTinTinhToanPhuongAn ." + lh_nv_show.toUpperCase()).removeClass("d-none");
                    }
                });
            });
        }
    }
    if (step === "tabToanBoYKienCanBoXeOTo") {
        ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoi_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: [] });
        ESUtil.genHTML("tblDanhSachNoiDungTraoDoi_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: [] });
        $('#tblDanhSachNoiDungTraoDoiXeOTo').html("");
        trang = 1;
        getPagingNoiDungTraoDoi(trang, () => {
            let div = $('#lichSuChatTraoDoiXeOTo').get(0);
            div.scrollTo(0, document.body.scrollHeight);
        });
        getPagingDanhSachCanBoTraoDoi();
    }
}
function showStepTabHinhAnhHoSo(step) {
    if (step === "tabToanBoAnhTonThatXeOTo") {
        $("#divTableXemToanBoAnhTonThatXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhToanCanhXeOTo") {
        $("#divTableXemToanBoAnhToanCanhXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoGiayToXeOTo") {
        $("#divTableXemToanBoAnhHoSoGiayToXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhHoSoChuaPhanLoaiXeOTo") {
        $("#divTableXemToanBoAnhChuaPhanLoaiXeOToTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongXeOTo") {
        var obj = {
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            ma_chi_nhanh: profileData.ho_so.ma_chi_nhanh_ql,
            so_id: profileData.ho_so.so_id_hd,
            so_id_dt: profileData.ho_so.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    if (step === "tabToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi") {
        $("#divTableXemToanBoAnhGiayToTaiLieuCPLConNguoiTabItem").trigger('click');
    }
    if (step === "tabToanBoThongTinTaiLieuHopDongConNguoi") {
        var obj = {
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            ma_chi_nhanh: profileData.ho_so.ma_chi_nhanh_ql,
            so_id: profileData.ho_so.so_id_hd,
            so_id_dt: profileData.ho_so.so_id_dt,
            pm: "BH"
        }
        getToanBoAnhThumnailHopDong(obj);
    }
    return;
}
function xemTabToanBoAnhHoSoBoiThuong(tabId) {
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: [] });
    ESUtil.genHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: [] });
    trang = 1;
    if (tabId === "divTableToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhTonThatXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhTonThatXeOTo") {
        $("#navTabXemToanBoAnhTonThatXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhTonThatXeOTo").addClass("d-none");
        getPagingListImages(1, "CHINH", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhToanCanhXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhToanCanhXeOTo") {
        $("#navTabXemToanBoAnhToanCanhXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhToanCanhXeOTo").addClass("d-none");
        getPagingListImages(1, "TOAN_CANH", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToXeOTo") {
        $("#navTabXemToanBoAnhHoSoGiayToXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhHoSoGiayToXeOTo").addClass("d-none");
        getPagingListImages(1, "TAI_LIEU", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhChuaPhanLoaiXeOTo").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhChuaPhanLoaiXeOTo") {
        $("#navTabXemToanBoAnhChuaPhanLoaiXeOTo .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableAnhChuaPhanLoaiXeOTo").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnh(); });
    }
    if (tabId === "divTableToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhHoSoGiayToTaiLieuConNguoi") {
        $("#navTabAnhGiayToTaiLieu .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhHoSoGiayToTaiLieuConNguoi").addClass("d-none");
        getPagingListImages(1, "TL", () => { initImageViewerToanBoAnhConNguoi(); });
    }
    if (tabId === "divTableToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
    }
    else if (tabId === "divTableXemToanBoAnhGiayToTaiLieuCPLConNguoi") {
        $("#navTabToanBoAnhGiayToTaiLieuChuaPhanLoaiConNguoi .breadcrumb-item").removeClass("active");
        $("#" + tabId + "TabItem").addClass("active");
        $("#" + tabId).removeClass("d-none");
        $(".divTableToanBoAnhGiayToTaiLieuCPLConNguoi").addClass("d-none");
        getPagingListImages(1, "CHUA_PHAN_LOAI", () => { initImageViewerToanBoAnhConNguoi(); });
    }
}
function bindImagesToanBoAnhHoSo(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [], ten_doi_tuong: [] }));
    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
                item.ten_doi_tuong = item1.ten_doi_tuong;
            });
        }
    });
    return result;
}
function bindImagesAnhThumnailHopDong(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, data: value, bt: [], hang_muc: [], extension: [] }));

    $.each(result, function (index, item) {
        var data = item.data;
        if (data.length > 0) {
            $.each(data, function (index1, item1) {
                item.bt.push(item1.bt);
                item.hang_muc = item1.ma_file;
                if (!(item.extension.includes(item1.extension))) {
                    item.extension.push(item1.extension);
                }
            });
        }
    });
    return result;
}
function bindImagesHangMucTonThat(arrAnh) {
    $("#dsHinhAnhHangMucTonThat").html("");
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return [];
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, nhom_anh, ...object }) => {
        acc[nhom_anh] = (acc[nhom_anh] || []);
        acc[nhom_anh].push({ bt, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ nhom_anh: key, children: value }));

    return result;
}
function getToanBoAnhThumnailHopDong(obj, callback = undefined) {
    var objFile = {
        ma_doi_tac: obj.ma_doi_tac,
        ma_chi_nhanh: obj.ma_chi_nhanh_ql,
        so_id: obj.so_id,
        so_id_dt: obj.so_id_dt,
        pm: obj.pm
    }
    _serviceTemp.postData("/carclaim/carinvestigation/getfilesthumnail", objFile).then(res => {
        var arrAnh = res.data_info;
        var arrAnhTL = [];
        var arrAnhCPL = [];
        for (var i = 0; i < arrAnh.length; i++) {
            if (arrAnh[i].ma_file == null || arrAnh[i].ma_file == "") {
                arrAnhCPL.push(arrAnh[i]);
            }
            if (arrAnh[i].loai == "TT") {
                arrAnhTL.push(arrAnh[i]);
            }
        }
        var arrAnhPDF = arrAnhTL.where(n => n.extension == ".pdf");
        arrAnhTL = bindImagesAnhThumnailHopDong(arrAnhTL);
        arrAnhPDF = bindImagesAnhThumnailHopDong(arrAnhPDF);
        var arr = arrAnhTL.concat(arrAnhPDF);
        ESUtil.genHTML("tblToanBoThongTinTaiLieuHopDongXeOTo_template", "tblToanBoThongTinTaiLieuHopDongXeOTo", { dataTaiLieuHD: arr });
        if (callback) {
            callback(res);
        }
    });
}
function openXemChiTietTaiLieuHopDong(val, bt, extension) {
    if (extension == '.pdf') {
        _serviceTemp.postData("/carclaim/carinvestigation/getfiles", { so_id: profileData.ho_so.so_id_hd, bt: bt }).then(res => {
            callBackViewFile(res);
        });
    } else {
        var objFile = {
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            ma_chi_nhanh: profileData.ho_so.ma_chi_nhanh_ql,
            so_id: profileData.ho_so.so_id_hd,
            so_id_dt: profileData.ho_so.so_id_dt,
            pm: "BH"
        }
        _serviceTemp.postData("/carclaim/carinvestigation/getfilesthumnail", objFile).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
                var ext = [".jpg", ".png", ".jpeg", ".gif"];
                var ds_anh = res.data_info.where(n => ext.includes(n.extension));
                var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
                ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
                $('#input_imagesHangMucTonThat').val(val);
                $("#input_imagesHangMucTonThat").trigger('keyup');
            }
            initImageViewerHangMucTonThatXe();
            _modalXemHinhAnhHangMucTonThat.show();
        });
    }
}
function openXemHinhAnhHangMucTonThat(nv, val) {
    var objFile = {
        ma_doi_tac: profileData.ho_so.ma_doi_tac,
        ma_chi_nhanh: profileData.ho_so.ma_chi_nhanh,
        so_id: profileData.ho_so.so_id
    };
    _serviceTemp.postData("/carclaim/carinvestigation/getfilesthumnail", objFile).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (res.data_info != undefined && res.data_info != null && res.data_info.length > 0) {
            var ext = [".jpg", ".png", ".jpeg", ".gif"];
            var ds_anh = res.data_info.where(n => ext.includes(n.extension));
            var arrAnhHangMucTonThat = bindImagesHangMucTonThat(ds_anh);
            ESUtil.genHTML("dsHinhAnhHangMucTonThat_template", "dsHinhAnhHangMucTonThat", { danh_sach: arrAnhHangMucTonThat });
            $('#input_imagesHangMucTonThat').val(val);
            $("#input_imagesHangMucTonThat").trigger('keyup');
        }
        initImageViewerHangMucTonThatXe();
        _modalXemHinhAnhHangMucTonThat.show();
    });
}
function openXemChiTietTaiLieuPDF(bt) {
    _serviceTemp.postData("/carclaim/carinvestigation/getfiles", { so_id: profileData.ho_so.so_id, bt: bt }).then(res => {
        callBackViewFile(res);
    });
}
function openXemChiTietMauIn(ma_mau_in) {
    _modalDocumentService.onClickIem = function (ma_mau_in) {
        _commonService.InPdf({
            ma_mau_in: ma_mau_in,
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            ma_doi_tac_ql: profileData.ho_so.ma_doi_tac_ql,
            so_id: profileData.ho_so.so_id,
            so_id_hd: profileData.ho_so.so_id_hd,
            so_id_dt: profileData.ho_so.so_id_dt
        }, "#modalDocumentContents").then(response => {
            _modalDocumentService.viewFile(response);
        });
    }
    _modalDocumentService.show(ma_mau_in);
}
function getImagesHinhAnhHoSo(name) {
    var arrAnh = [];
    $("input:checkbox[name='" + name + "']:checked").each(function () {
        arrAnh.push($(this).val());
    });
    return arrAnh;
}
function dowloadHinhAnhHoSo(arrAnh) {
    var arrAnhDowLoad = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhDowLoad.length; i++) {
        arr.push(arrAnhDowLoad[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        if (mergedArr.length <= 0) {
            _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
            return;
        }
        if (mergedArr.length === 1) {
            _serviceTemp.postData("/carclaim/carinvestigation/getfiles", { so_id: profileData.ho_so.so_id, bt: mergedArr[0] }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                var extension = res.data_info.extension.toLowerCase();
                if (extension === ".jpg" || extension === ".jpeg" || extension === ".png" || extension === ".gif") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension);
                }
                if (extension === ".pdf") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/pdf");
                }
                if (extension === ".xlsx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
                }
                if (extension === ".xls") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.ms-excel");
                }
                if (extension === ".doc") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/msword");
                }
                if (extension === ".docx") {
                    ESUtil.convertBase64ToFile(res.data_info.duong_dan, "tai_lieu_" + new Date().toDateString() + extension, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
                }
            });
        } else {
            _serviceTemp.postData("/carclaim/carinvestigation/downloadzipfile", { so_id: profileData.ho_so.so_id, bt: mergedArr }).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                ESUtil.convertBase64ToFile(res.data_info, "tap_tai_lieu_" + new Date().toDateString() + ".zip", "application/zip");
            });
        }
    } else {
        _notifyService.error("Vui lòng chọn ảnh/tài liệu cần tải xuống");
        return;
    }
}
function printHinhAnhHoSo(arrAnh) {
    var arrAnhPrinted = arrAnh;
    var arr = [];
    for (var i = 0; i < arrAnhPrinted.length; i++) {
        arr.push(arrAnhPrinted[i].split(","));
        var mergedArr = [].concat.apply([], arr);
    }
    if (mergedArr !== undefined && mergedArr !== null && mergedArr !== "") {
        _commonService.InHoaDon({
            ma_mau_in: "BT_IN_ANH_HOA_DON",
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            so_id: profileData.ho_so.so_id,
            bt: mergedArr

        }, "#modalDocumentContents").then(res => {
            _modalPreviewFileService.viewFile(res, "tai_lieu_" + new Date().ddmmyyyy().dateToNumber() + ".pdf");
        });
    } else {
        _notifyService.error("Vui lòng chọn tài liệu cần in");
        return;
    }
}
function xemToanBoHinhAnhHoSoBoiThuong(loai, hang_muc) {
    var data = {
        so_id: profileData.ho_so.so_id,
        nv: profileData.ho_so.nghiep_vu,
        hang_muc: hang_muc,
        loai: loai
    };
    var notify_url = "/ViewImages";
    window.open("/carclaim/carclaimcommon/TransViewsImageDisplay?so_id=" + data.so_id + "&nv=" + data.nv + "&hang_muc=" + data.hang_muc + "&loai=" + data.loai + "&url_redirect=" + notify_url, '_blank');
}
function onChonTai(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkTaiAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkTaiAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkTaiAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkTaiAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonIn(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkInAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkInAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkInAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkInAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function onChonXem(el, nv, loai) {
    var checked = $(el).is(":checked");
    if (nv == 'XE') {
        if (loai == 'TOAN_CANH') {
            $(".checkXemAnhToanCanhXe").prop("checked", checked);
        }
        if (loai == 'CHINH') {
            $(".checkXemAnhTonThatXe").prop("checked", checked);
        }
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToXe").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhChuaPhanLoaiXe").prop("checked", checked);
        }
    }
    if (nv == 'NG') {
        if (loai == 'TAI_LIEU') {
            $(".checkXemAnhHoSoGiayToTaiLieu").prop("checked", checked);
        }
        if (loai == 'CHUA_PHAN_LOAI') {
            $(".checkXemAnhHoSoGiayToTaiLieuCPL").prop("checked", checked);
        }
    }
}
function getPagingListImages(trang, loai, callback = undefined) {
    var obj = {
        so_id: profileData.ho_so.so_id,
        loai: loai,
        nv: profileData.ho_so.nghiep_vu
    }
    obj.trang = trang;
    obj.so_dong = 6;
    _serviceTemp.postData("/carclaim/carclaimcommon/GetListFiles", obj).then(res => {
        var ext = [".jpg", ".png", ".jpeg", ".gif", ".svg"];
        var source = res.data_info.data.where(n => ext.includes(n.extension));
        source = _.chain(source).groupBy("nhom_anh").map((value, key) => ({ nhom_anh: key, data: value })).value();
        var tong_so_dong = res.data_info.tong_so_dong;
        if (tong_so_dong % 6 == 0) {
            trang_max = tong_so_dong / 6;
        } else {
            trang_max = parseInt(tong_so_dong / 6) + 1;
        }
        if (source.length != 0) {
            if (loai === "CHINH") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhTonThatXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "TOAN_CANH") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhToanCanhXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "TAI_LIEU") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhHoSoGiayToXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "CHUA_PHAN_LOAI") {
                ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongXe_template", "dsToanBoAnhChuaPhanLoaiXeOTo", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "TL") {
                ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhHoSoGiayToTaiLieuConNguoi", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
            if (loai === "CHUA_PHAN_LOAI") {
                ESUtil.appendHTML("dsToanBoAnhConNguoi_template", "dsToanBoAnhGiayToTaiLieuCPLConNguoi", { danh_sach: source }, () => {
                    if (callback) {
                        callback();
                    }
                });
            }
        } else {
            _notifyService.warning("Không có hình ảnh nào !");
            return;
        }

    });
}
function initImageViewerHangMucTonThatXe() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.list-images-hang-muc');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'images-hang-muc-container',
        id: 'images-hang-muc-container',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        callBackViewFile: callBackViewFile
    };
    var viewer = new Viewer(pictures, options);
}
function initImageViewerToanBoAnh() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDanhSachAnhXe');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhChiTietView',
        id: 'modalXemHinhAnhChiTietView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false,
        viewed() {
            this.viewer.zoomTo(0.4);
        }
    };
    var viewer = new Viewer(pictures, options);
}
function xemChiTietHinhAnhHoSo(el) {
    _modalXemHinhAnhChiTiet.show();
}
function getPagingNoiDungTraoDoi(trang, callback = undefined) {
    var obj = {
        so_id: profileData.ho_so.so_id,
        nv: profileData.ho_so.nghiep_vu
    }
    obj.trang = trang;
    obj.so_dong = 7;
    _serviceTemp.postData("/carclaim/carclaimcommon/lietKeNoiDungTraoDoi", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info.data;
        var tong_so_dong = res.out_value.tong_so_dong;
        if (tong_so_dong % 7 == 0) {
            trang_max_nd = tong_so_dong / 7;
        } else {
            trang_max_nd = parseInt(tong_so_dong / 7) + 1;
        }
        if (data.length != 0) {
            if (obj.nv == "XE"  || obj.nv == "XE_MAY") {
                ESUtil.prependHTML("tblDanhSachNoiDungTraoDoi_template", "tblDanhSachNoiDungTraoDoiXeOTo", { data: data }, () => {
                    if (callback) {
                        callback();
                    }
                });
                $("#soLuongTinNhanTraoDoiXeOTo").html("(" + tong_so_dong + " tin nhắn)");
            }
            if (obj.nv == "NG") {
                ESUtil.prependHTML("tblDanhSachNoiDungTraoDoi_template", "tblDanhSachNoiDungTraoDoiConNguoi", { data: data }, () => {
                    if (callback) {
                        callback();
                    }
                });
                $("#soLuongTinNhanTraoDoiConNguoi").html("(" + tong_so_dong + " tin nhắn)");
            }
        }
    });
}
function xoaNguoiThamGiaTraoDoi(so_id, nv, ma_nsd) {
    _notifyService.confirmDelete("Bạn có chắc muốn xóa cán bộ này khỏi danh sách cán bộ trao đổi này không?", "", () => {
        var obj = {
            so_id: so_id,
            nv: nv,
            ma_nsd: ma_nsd
        }
        _serviceTemp.postData("/carclaim/carclaimcommon/xoaCanBoTraoDoi", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.success("Xóa thông tin thành công");
            getPagingDanhSachCanBoTraoDoi();
        });
    });
}
function getPagingDanhSachCanBoTraoDoi() {
    var obj = {
        so_id: profileData.ho_so.so_id,
        nv: profileData.ho_so.nghiep_vu
    }
    _serviceTemp.postData("/carclaim/carclaimcommon/lietKeDanhSachCanBoTraoDoi", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        var data = res.data_info;
        var so_nguoi_tg = data.length;
        if (obj.nv == "XE" || obj.nv == "XE_MAY") {
            ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoi_template", "tblDanhSachNguoiThamGiaTraoDoiXeOTo", { data: data });
            $("#soNguoiThamGiaTraoDoiXeOTo").html("(Có " + so_nguoi_tg + " cán bộ)")
        }
        if (obj.nv == "NG") {
            ESUtil.genHTML("tblDanhSachNguoiThamGiaTraoDoi_template", "tblDanhSachNguoiThamGiaTraoDoiConNguoi", { data: data });
            $("#soNguoiThamGiaTraoDoiConNguoi").html("(Có " + so_nguoi_tg + " cán bộ)")
        }
    });
}
function bindDataCanBoTraoDoiXeOTo(ma_doi_tac, so_id) {
    _frmThemCanBoTraoDoiXeOTo.getControl("so_id").val(so_id);
    _frmThemCanBoTraoDoiXeOTo.getControl("nv").val('XE');
    var arrChiNhanh = objDanhMuc.chi_nhanh.where(n => n.ma_doi_tac === ma_doi_tac);
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten_tat", "ma", "Chọn chi nhánh", "");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_chi_nhanh").setValue("");
    _frmThemCanBoTraoDoiXeOTo.getControl("ma_nsd").setDataSource([], "ten", "ma", "Chọn cán bộ", "");
}
function xemThongTinChiTietHangMucTonThat(lhnv, nhom, doi_tuong, hang_muc) {
    if (profileData.ho_so.nghiep_vu == "XE") {
        $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li").removeClass("active");
        $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li[data-lhnv='" + lhnv + "']").addClass("active");
        $(".divHangMucTonThatItem").hide();
        if (doi_tuong == "TAI_SAN") {
            $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").addClass("d-none");
            $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").addClass("d-none");
            var ds_tsan_xe = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
            var ds_tsan_khac = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
            _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
            _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
            $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN").addClass("d-none");
            $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN_XE").addClass("d-none");
            if (ds_tsan_khac.length > 0)
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
            else if (ds_tsan_xe.length > 0)
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
            _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
            if (ds_tsan_xe.length > 0) {
                $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN").removeClass("d-none");
            }
            $("#divDanhGiaTNDSTAISAN").show();
        }
        xemChiTietNghiepVuHoSo(nhom, "", lhnv, 0, res => {
            if (doi_tuong == DOI_TUONG_TT.XE) {
                ESUtil.genHTML("modalHangMucTonThatVCXTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatVCX_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatVCX_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.gia_giam_dinh)));
                    }
                });
                $("#divHangMucTonThatVCX_ModalXemToanBoThongTin").show();
            }
            if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ESUtil.genHTML("modalHangMucTonThatHangHoaTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatHangHoa_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatHangHoa_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatHANGHOA_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.NNTX && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatNguoiTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatNguoi_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatNguoi_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatNNTX_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatTNDSNguoiTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSNguoi_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoi_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatTNDSNGUOI_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI_HK) {
                ESUtil.genHTML("modalHangMucTonThatTNDSNguoiHKTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSNguoiHK_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoiHK_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatTNDSNGUOI_HK_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.LPHU_XE && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatLPHUXETemplate_ModalXemToanBoThongTin", "modalHangMucTonThatLPHUXE_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoiLPHUXe_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatLPHUXE_ModalXemToanBoThongTin").show();
            }
            if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                $("#tableChiTietTonThatTNDS_TAI_SAN").addClass("d-none");
                $("#tableChiTietTonThatTNDS_TAI_SAN_XE").addClass("d-none");
                var ds_tsan_xe = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
                var ds_tsan_khac = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
                _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
                $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").addClass("d-none");
                $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").addClass("d-none");
                if (ds_tsan_khac.length > 0)
                    _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
                else if (ds_tsan_xe.length > 0)
                    _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
                if (ds_tsan_xe.length > 0) {
                    $("#tableChiTietTonThatTNDS_TAI_SAN").removeClass("d-none");
                }
                $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").show();
            }
        });
    }
    if (profileData.ho_so.nghiep_vu == "XE_MAY") {
        $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li").removeClass("active");
        $("#navToanBoThongTinLoaiHinhNghiepVuHMTT li[data-lhnv='" + lhnv + "']").addClass("active");
        $(".divHangMucTonThatItem").hide();
        if (doi_tuong == "TAI_SAN") {
            $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").addClass("d-none");
            $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").addClass("d-none");
            var ds_tsan_xe = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
            var ds_tsan_khac = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
            _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
            _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
            $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN").addClass("d-none");
            $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN_XE").addClass("d-none");
            if (ds_tsan_khac.length > 0)
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
            else if (ds_tsan_xe.length > 0)
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
            _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
            if (ds_tsan_xe.length > 0) {
                $("#frmHangMucTonThatTNDSTAISAN_TAI_SAN").removeClass("d-none");
            }
            $("#divDanhGiaTNDSTAISAN").show();
        }
        xemChiTietNghiepVuHoSoXeMay(nhom, "", lhnv, 0, res => {
            if (doi_tuong == DOI_TUONG_TT.XE) {
                ESUtil.genHTML("modalHangMucTonThatVCXTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatVCX_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatVCX_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.gia_giam_dinh)));
                    }
                });
                $("#divHangMucTonThatVCX_ModalXemToanBoThongTin").show();
            }
            if (doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ESUtil.genHTML("modalHangMucTonThatHangHoaTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatHangHoa_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatHangHoa_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatHANGHOA_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.NNTX && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatNguoiTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatNguoi_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatNguoi_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatNNTX_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatTNDSNguoiTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSNguoi_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoi_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatTNDSNGUOI_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.TNDS && doi_tuong == DOI_TUONG_TT.NGUOI_HK) {
                ESUtil.genHTML("modalHangMucTonThatTNDSNguoiHKTemplate_ModalXemToanBoThongTin", "modalHangMucTonThatTNDSNguoiHK_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoiHK_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatTNDSNGUOI_HK_ModalXemToanBoThongTin").show();
            }
            if (nhom == NHOM_LHNV.LPHU_XE && doi_tuong == DOI_TUONG_TT.NGUOI) {
                ESUtil.genHTML("modalHangMucTonThatLPHUXETemplate_ModalXemToanBoThongTin", "modalHangMucTonThatLPHUXE_ModalXemToanBoThongTin", { danh_sach: res.data_info }, () => {
                    if (res.data_info != null && res.data_info.length > 0) {
                        $("#tongTienHangMucTonThatTNDSNguoiLPHUXe_ModalXemToanBoThongTin").html(ESUtil.formatMoney(res.data_info.sum(n => n.tien_tt)));
                    }
                });
                $("#divHangMucTonThatLPHUXE_ModalXemToanBoThongTin").show();
            }
            if (doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                $("#tableChiTietTonThatTNDS_TAI_SAN").addClass("d-none");
                $("#tableChiTietTonThatTNDS_TAI_SAN_XE").addClass("d-none");
                var ds_tsan_xe = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "XE");
                var ds_tsan_khac = profileData.ds_doi_tuong.where(n => n.nhom == DOI_TUONG_TT.TAI_SAN && n.loai == "KHAC");
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").val("KHAC");
                _frmHangMucTonThatTNDSTAISAN.getControl("doi_tuong_xe").setDataSource([], "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng tổn thất", "")
                $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").addClass("d-none");
                $("#divHangMucTonThatTNDSTaiSanXe_ModalXemToanBoThongTin").addClass("d-none");
                if (ds_tsan_khac.length > 0)
                    _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
                else if (ds_tsan_xe.length > 0)
                    _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").setValue("XE");
                _frmHangMucTonThatTNDSTAISAN.getControl("loai_tai_san").trigger("select2:select");
                if (ds_tsan_xe.length > 0) {
                    $("#tableChiTietTonThatTNDS_TAI_SAN").removeClass("d-none");
                }
                $("#divHangMucTonThatTNDSTAISAN_ModalXemToanBoThongTin").show();
            }
        });
    }
}
function xemChiTietNghiepVuHoSo(nhom, loai, lh_nv, so_id_doi_tuong, callback = undefined) {
    var obj = {};
    obj.ma_doi_tac = profileData.ho_so.ma_doi_tac;
    obj.so_id = profileData.ho_so.so_id;
    obj.lh_nv = lh_nv;
    obj.nhom = nhom;
    obj.loai = loai;
    obj.so_id_doi_tuong = so_id_doi_tuong;
    obj.pm = "BT";

    _serviceTemp.postData("/carclaim/carinvestigation/layHangMucChiTiet", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res);
        }
    });
}
function xemChiTietNghiepVuHoSoXeMay(nhom, loai, lh_nv, so_id_doi_tuong, callback = undefined) {
    var obj = {};
    obj.ma_doi_tac = profileData.ho_so.ma_doi_tac;
    obj.so_id = profileData.ho_so.so_id;
    obj.lh_nv = lh_nv;
    obj.nhom = nhom;
    obj.loai = loai;
    obj.so_id_doi_tuong = so_id_doi_tuong;
    obj.pm = "BT";

    _serviceTemp.postData("/motoclaim/motoinvestigation/layHangMucChiTiet", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        if (callback) {
            callback(res);
        }
    });
}
function xemThongTinChiTietTinhToanBoiThuong(lhnv) {
    if (profileData.ho_so.nghiep_vu == "XE") {
        $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li").removeClass("active");
        $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li[data-lhnv='" + lhnv + "']").addClass("active");
        $(".divThongTinTinhToanItem").hide();
        var objLHNV = profileData.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
        if (profileData.lh_nv.length == 0 && objLHNV == null) {
            objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
        }
        var obj = {
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            so_id: profileData.ho_so.so_id,
            lh_nv: lhnv
        }
        _serviceTemp.postData("/carclaim/CarCompensation/layHangMucLHNV", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            /*Vật chất xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
                ESUtil.genHTML("modalThongTinTinhToanVCXTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanVCX_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyetVtu = res.data_info.data.sum(n => parseFloat(n.gia_vtu_duyet));
                    var giaDuyetNC = res.data_info.data.sum(n => parseFloat(n.gia_nhan_cong_duyet));
                    var giaDuyetKhac = res.data_info.data.sum(n => parseFloat(n.gia_khac_duyet));
                    var tienKhauHao = res.data_info.data.sum(n => parseFloat(n.tien_khau_hao));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    var tienGiamGia = res.data_info.data.sum(n => parseFloat(n.giam_gia));
                    var tienKtruBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_ktru_tien_bh));
                    var tienThue = res.data_info.data.sum(n => parseFloat(n.tien_thue));
                    $(".tblThongTinTinhToanVCXTienDuyetVtu_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetVtu));
                    $(".tblThongTinTinhToanVCXTienDuyetNC_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetNC));
                    $(".tblThongTinTinhToanVCXTienDuyetKhac_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetKhac));
                    $(".tblThongTinTinhToanVCXTienKhauHao_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKhauHao));
                    $(".tblThongTinTinhToanVCXTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanVCXTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                    $(".tblThongTinTinhToanVCXTienDuyetGiamGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamGia));
                    $(".tblThongTinTinhToanVCXTienKhauTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKtruBaoHiem));
                    $(".tblThongTinTinhToanVCXThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienThue));
                });
                $("#divThongTinTinhToanVCX_ModalXemToanBoThongTin").show();
            }
            /*Hàng hóa trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ESUtil.genHTML("modalThongTinTinhToanHangHoaTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanHangHoa_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyetHH = res.data_info.data.sum(n => parseFloat(n.tien_vtu_duyet_pa));
                    var giaDuyetNC = res.data_info.data.sum(n => parseFloat(n.tien_nhan_cong_duyet_pa));
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienKhauHao = res.data_info.data.sum(n => parseFloat(n.tien_khau_hao));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    var tienThue = res.data_info.data.sum(n => parseFloat(n.thue));
                    $(".tblThongTinTinhToanHHTienHangHoa_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetHH));
                    $(".tblThongTinTinhToanHHTienDuyetNC_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetNC));
                    $(".tblThongTinTinhToanHHTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanHHTienKhauHao_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKhauHao));
                    $(".tblThongTinTinhToanHHTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanHHTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                    $(".tblThongTinTinhToanHHThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienThue));
                });
                $("#divThongTinTinhToanHangHoa_ModalXemToanBoThongTin").show();
            }
            /*Người ngồi trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.NNTX) {
                ESUtil.genHTML("modalThongTinTinhToanNNTXTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanNNTX_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanNNTXTienDuyet_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanNNTXTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanNNTXTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanNNTX_ModalXemToanBoThongTin").show();
            }
            /*TNDS về người*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoi_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoi_ModalXemToanBoThongTin").show();
            }
            /*TNDS về hành khách*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiHKTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoiHK_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoiHK_ModalXemToanBoThongTin").show();
            }
            /*TNDS về tài sản*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                $(".thongTinTinhToanTaiSan").removeClass("d-none");
                $(".divThongTinTinhToanTNDSTaiSan").removeClass("d-none");
                $("#divThongTinTinhToanTNDSTaiSanKhac").removeClass("d-none");
                $("#divThongTinTinhToanTNDSTaiSanXe").addClass("d-none");
                var loai_ts = _frmThongTinTinhToanTNDSTAISAN.getControl("loai_tai_san").val();
                if (loai_ts == null) {
                    _frmThongTinTinhToanTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
                }
                var doi_tuong = _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").val();
                xemThongTinTinhToanTNDSTaiSan(loai_ts, function () {
                    if (loai_ts == "XE") {
                        _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").setValue(doi_tuong);
                        setTimeout(function () {
                            _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").trigger("select2:select");
                        }, 150);
                    }
                });
                $("#divThongTinTinhToanTNDSTaiSan_ModalXemToanBoThongTin").show();
            }
            /*Tai nạn lái phụ xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiLPHUXeTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoiLPHUXe_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoiLPHUXe_ModalXemToanBoThongTin").show();
            }
        });
    }
    if (profileData.ho_so.nghiep_vu == "XE_MAY") {
        $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li").removeClass("active");
        $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li[data-lhnv='" + lhnv + "']").addClass("active");
        $(".divThongTinTinhToanItem").hide();
        var objLHNV = profileData.lh_nv.where(n => n.ma == lhnv).firstOrDefault();
        if (profileData.lh_nv.length == 0 && objLHNV == null) {
            objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
        }
        var obj = {
            ma_doi_tac: profileData.ho_so.ma_doi_tac,
            so_id: profileData.ho_so.so_id,
            lh_nv: lhnv
        }
        _serviceTemp.postData("/motoclaim/motoCompensation/layHangMucLHNV", obj).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            /*Vật chất xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.XE) {
                ESUtil.genHTML("modalThongTinTinhToanVCXTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanVCX_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyetVtu = res.data_info.data.sum(n => parseFloat(n.gia_vtu_duyet));
                    var giaDuyetNC = res.data_info.data.sum(n => parseFloat(n.gia_nhan_cong_duyet));
                    var giaDuyetKhac = res.data_info.data.sum(n => parseFloat(n.gia_khac_duyet));
                    var tienKhauHao = res.data_info.data.sum(n => parseFloat(n.tien_khau_hao));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    var tienGiamGia = res.data_info.data.sum(n => parseFloat(n.giam_gia));
                    var tienKtruBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_ktru_tien_bh));
                    var tienThue = res.data_info.data.sum(n => parseFloat(n.tien_thue));
                    $(".tblThongTinTinhToanVCXTienDuyetVtu_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetVtu));
                    $(".tblThongTinTinhToanVCXTienDuyetNC_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetNC));
                    $(".tblThongTinTinhToanVCXTienDuyetKhac_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetKhac));
                    $(".tblThongTinTinhToanVCXTienKhauHao_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKhauHao));
                    $(".tblThongTinTinhToanVCXTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanVCXTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                    $(".tblThongTinTinhToanVCXTienDuyetGiamGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamGia));
                    $(".tblThongTinTinhToanVCXTienKhauTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKtruBaoHiem));
                    $(".tblThongTinTinhToanVCXThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienThue));
                });
                $("#divThongTinTinhToanVCX_ModalXemToanBoThongTin").show();
            }
            /*Hàng hóa trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.HANG_HOA) {
                ESUtil.genHTML("modalThongTinTinhToanHangHoaTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanHangHoa_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyetHH = res.data_info.data.sum(n => parseFloat(n.tien_vtu_duyet_pa));
                    var giaDuyetNC = res.data_info.data.sum(n => parseFloat(n.tien_nhan_cong_duyet_pa));
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienKhauHao = res.data_info.data.sum(n => parseFloat(n.tien_khau_hao));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    var tienThue = res.data_info.data.sum(n => parseFloat(n.thue));
                    $(".tblThongTinTinhToanHHTienHangHoa_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetHH));
                    $(".tblThongTinTinhToanHHTienDuyetNC_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyetNC));
                    $(".tblThongTinTinhToanHHTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanHHTienKhauHao_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienKhauHao));
                    $(".tblThongTinTinhToanHHTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanHHTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                    $(".tblThongTinTinhToanHHThue_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienThue));
                });
                $("#divThongTinTinhToanHangHoa_ModalXemToanBoThongTin").show();
            }
            /*Người ngồi trên xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.NNTX) {
                ESUtil.genHTML("modalThongTinTinhToanNNTXTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanNNTX_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanNNTXTienDuyet_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanNNTXTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanNNTXTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanNNTX_ModalXemToanBoThongTin").show();
            }
            /*TNDS về người*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoi_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoi_ModalXemToanBoThongTin").show();
            }
            /*TNDS về hành khách*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI_HK && objLHNV.nhom == NHOM_LHNV.TNDS) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiHKTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoiHK_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiHKTienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoiHK_ModalXemToanBoThongTin").show();
            }
            /*TNDS về tài sản*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
                $(".thongTinTinhToanTaiSan").removeClass("d-none");
                $(".divThongTinTinhToanTNDSTaiSan").removeClass("d-none");
                $("#divThongTinTinhToanTNDSTaiSanKhac").removeClass("d-none");
                $("#divThongTinTinhToanTNDSTaiSanXe").addClass("d-none");
                var loai_ts = _frmThongTinTinhToanTNDSTAISAN.getControl("loai_tai_san").val();
                if (loai_ts == null) {
                    _frmThongTinTinhToanTNDSTAISAN.getControl("loai_tai_san").setValue("KHAC");
                }
                var doi_tuong = _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").val();
                xemThongTinTinhToanTNDSTaiSan(loai_ts, function () {
                    if (loai_ts == "XE") {
                        _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").setValue(doi_tuong);
                        setTimeout(function () {
                            _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").trigger("select2:select");
                        }, 150);
                    }
                });
                $("#divThongTinTinhToanTNDSTaiSan_ModalXemToanBoThongTin").show();
            }
            /*Tai nạn lái phụ xe*/
            if (objLHNV.doi_tuong == DOI_TUONG_TT.NGUOI && objLHNV.nhom == NHOM_LHNV.LPHU_XE) {
                ESUtil.genHTML("modalThongTinTinhToanTNDSNguoiLPHUXeTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSNguoiLPHUXe_ModalXemToanBoThongTin", { tinh_toan_bt: res.data_info.data }, () => {
                    var giaDuyet = res.data_info.data.sum(n => parseFloat(n.tien_duyet_pa));
                    var tienBaoHiem = res.data_info.data.sum(n => parseFloat(n.tien_bao_hiem));
                    var tienGiamTru = res.data_info.data.sum(n => parseFloat(n.tien_giam_tru));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienDuyetGia_ModalXemToanBoThongTin").html(ESUtil.formatMoney(giaDuyet));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienBaoHiem_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienBaoHiem));
                    $(".tblThongTinTinhToanTNDSNguoiLPHUXETienGiamTru_ModalXemToanBoThongTin").html(ESUtil.formatMoney(tienGiamTru));
                });
                $("#divThongTinTinhToanTNDSNguoiLPHUXe_ModalXemToanBoThongTin").show();
            }
        });
    }
}
function chuanHoaNVCTThongTinTinhToan(dsNVCT, nhom, doi_tuong) {
    if (dsNVCT.length > 0) {
        for (var i = 0; i < dsNVCT.length; i++) {
            dsNVCT[i].doi_tuong_goc = false;//Không là đối tượng gốc
            if (dsNVCT[i].so_id_doi_tuong != 0) {
                dsNVCT[i].doi_tuong_goc = true;//Là đối tượng gốc
            }
            dsNVCT[i].nhom = nhom;
            dsNVCT[i].so_luong_dt = 0;
        }
    }
    if (doi_tuong != DOI_TUONG_TT.TAI_SAN) {
        return dsNVCT;
    }
    //Chuẩn hóa cha con đối tượng cũ
    var arr = [];
    var doi_tuong_cha = dsNVCT.where(n => n.doi_tuong_goc);
    if (doi_tuong_cha.length > 0) {
        for (var i = 0; i < doi_tuong_cha.length; i++) {
            doi_tuong_cha[i].ds_doi_tuong = dsNVCT.where(n => n.so_id_doi_tuong_cha == doi_tuong_cha[i].so_id_doi_tuong);
            doi_tuong_cha[i].so_luong_dt = doi_tuong_cha[i].ds_doi_tuong.length;
            arr.push(doi_tuong_cha[i]);
        }
    }
    //Thêm lại đối tượng mới
    var doi_tuong_moi = dsNVCT.where(n => n.so_id_doi_tuong_cha == 0 && n.so_id_doi_tuong == 0);
    if (doi_tuong_moi.length > 0) {
        for (var i = 0; i < doi_tuong_moi.length; i++) {
            arr.push(doi_tuong_moi[i]);
        }
    }
    arr.sort((a, b) => b.so_luong_dt - a.so_luong_dt);
    return arr;
}
function xemThongTinTinhToanTNDSTaiSan(val, callback = undefined) {
    $(".thongTinTinhToanTaiSanDoiTuong").addClass("d-none");
    $("#divThongTinTinhToanTNDSTaiSanXe").addClass("d-none");
    $("#divThongTinTinhToanTNDSTaiSanKhac").removeClass("d-none");
    if (val == "XE") {
        $(".thongTinTinhToanTaiSanDoiTuong").removeClass("d-none");
        $("#divThongTinTinhToanTNDSTaiSanXe").removeClass("d-none");
        $("#divThongTinTinhToanTNDSTaiSanKhac").addClass("d-none");
        var dsDoiTuongTaiSanXe = profileData.ds_doi_tuong.where(n => n.nhom == "TAI_SAN" && n.loai == "XE");
        _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").setDataSource(dsDoiTuongTaiSanXe, "ten_doi_tuong", "so_id_doi_tuong", "Chọn đối tượng", "");
        if (dsDoiTuongTaiSanXe != undefined && dsDoiTuongTaiSanXe != null && dsDoiTuongTaiSanXe.length > 0) {
            _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").setValue(dsDoiTuongTaiSanXe[0].so_id_doi_tuong);
            _frmThongTinTinhToanTNDSTAISAN.getControl("doi_tuong").trigger("select2:select");
        }
        if (callback) {
            callback();
        }
        return;
    }
    $("#divThongTinTinhToanTNDSTaiSan_ModalXemToanBoThongTin").removeClass("d-none");
    var obj = {
        ma_doi_tac: profileData.ho_so.ma_doi_tac,
        so_id: profileData.ho_so.so_id,
        lh_nv: $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong li.active").attr("data-lhnv")
    }
    var objLHNV = profileData.lh_nv.where(n => n.ma == obj.lh_nv).firstOrDefault();
    if (profileData.lh_nv.length == 0 && objLHNV == null) {
        objLHNV = { doi_tuong: DOI_TUONG_TT.XE };
    }
    _serviceTemp.postData("/carclaim/CarCompensation/layHangMucLHNV", obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        /*TNDS về tài sản*/
        if (objLHNV.doi_tuong == DOI_TUONG_TT.TAI_SAN) {
            var nhom = $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong .breadcrumb-item.active").attr("data-nhom");
            var doi_tuong = $("#navToanBoThongTinLoaiHinhNghiepVuThongTinBoiThuong .breadcrumb-item.active").attr("data-doi-tuong");
            var arr = chuanHoaNVCTThongTinTinhToan(res.data_info.data, nhom, doi_tuong);
            ESUtil.genHTML("modalThongTinTinhToanTNDSTaiSanTemplate_ModalXemToanBoThongTin", "modalThongTinTinhToanTNDSTaiSan_ModalXemToanBoThongTin", { tinh_toan_bt: arr }, () => {
                //var giaduyet = arr.sum(n => parseFloat(n.tien_duyet_pa));
                //var giaduyet_khac = arr.where(n => n.so_luong_dt <= 0).sum(n => parseFloat(n.tien_duyet_pa));
                //$("#tblTinhToanTNDS_TAISANTienDuyetGiaKhac").html(ESUtil.formatMoney(giaduyet_khac));
                //$("#tblTinhToanTNDS_TAISANTienDuyetGia").html(ESUtil.formatMoney(giaduyet));
            });
        }
        if (callback) {
            callback();
        }
    });
}
function showGhiChuModalXemToanBoThongTin(el) {
    _popoverModalXemToanBoThongTin.options = { placement: "bottom bottom-right" };
    $("#divThongTinGhiChuNoiDung_ModalXemToanBoThongTin").focus();
    var val = $(el).attr("data-val");
    if (val == undefined) {
        val = "";
    }
    $("#divThongTinGhiChuNoiDung_ModalXemToanBoThongTin").val(val);
    _popoverModalXemToanBoThongTin.showWithPosition(el);
}