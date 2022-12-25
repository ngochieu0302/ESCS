//create by: thanhnx.vbi
function CommonService() {
    this.danhMucChung = {
        so_tien_bh: {
            nguoi: 150000000,
            tai_san:100000000
        },
        nghiep_vu: [
            { ma: "XE", ten: "Xe ô tô", mac_dinh: 1, ap_dung: 1 },
            { ma: "XE_MAY", ten: "Xe máy", mac_dinh: 0, ap_dung: 1 }
        ],
        luong_xly: [
            { ma: "XE", ten: "Vật chất xe"},
            { ma: "NGUOI", ten: "TNDS về người"},
            { ma: "TAI_SAN", ten: "TNDS về tài sản"}
        ],
        noi_sua_chua: [
            { ma: "K", ten: "Sửa chữa ngoài" },
            { ma: "C", ten: "Chính hãng" }
        ],
        phuong_an_sua_chua : [
            { ma: "S", ten: "Sửa chữa" },
            { ma: "T", ten: "Thay thế" }
        ],
        thu_hoi_vat_tu: [
            { ma: "C", ten: "Có" },
            { ma: "K", ten: "Không" }
        ],
        nguon_tb: [
            { ma: "CTCT", ten: "Tổng đài" },
            { ma: "MOBILE", ten: "App mobile" },
            { ma: "TTGD", ten: "Trực tiếp" }
        ],
        nhom_tai_lieu: [
            { ma: "TT", ten: "Tổn thất" },
            { ma: "TL", ten: "Giấy tờ, tài liệu" },
            { ma: "TC", ten: "Toàn cảnh, hiện trường" }
        ],
        khau_tru: [
            { ma: "C", ten: "Có" },
            { ma: "K", ten: "Không" }
        ],
        tl_thue: [
            { ma: "0", ten: "0" },
            { ma: "1", ten: "1" },
            { ma: "2", ten: "2" },
            { ma: "3", ten: "3" },
            { ma: "4", ten: "4" },
            { ma: "5", ten: "5" },
            { ma: "6", ten: "6" },
            { ma: "7", ten: "7" },
            { ma: "8", ten: "8" },
            { ma: "9", ten: "9" },
            { ma: "10", ten: "10" }
            
        ],
        tl_thue_mien_thuong: [
            { ma: "THM", ten: "Theo TL thuế từng hạng mục" },
            { ma: "0", ten: "0%" },
            { ma: "8", ten: "8%" },
            { ma: "10", ten: "10%" }
        ]
    };
    // Lấy nội dung email
    this.layNoiDungEmail = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/getemailtemplate", obj);
    };
    // Lấy danh sách template email
    this.layDsTemplateEmail = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/getemail", obj);
    };
    // Lấy danh sách file đính kèm
    this.layDsFileDinhKem = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/GetAttachFile", obj);
    };
    // Lấy danh sách đơn vị hành chính
    this.layTatCaDonViHanhChinh = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/getadministrativeunits", obj);
    };
    // Lấy danh sách nội dung trình
    this.danhSachNoiDung = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/danhSachNoiDung", obj);
    };
    // Lấy control ẩn hiển của từng màn hình
    this.layControl = function (obj = {}) {
        var _service = new Service();
        return _service.postData("/common/getcontrol", obj);
    };
    // In PDF
    this.InPdf = function (obj, divContentLoading='body') {
        var _notifySerVice = new NotifyService();
        if (obj.ma_mau_in === undefined || obj.ma_mau_in === null || obj.ma_mau_in === null) {
            _notifySerVice.error("Thiếu mã mẫu in");
            return;
        }
        var _service = new Service(false);
        return _service.getFile("/common/printpdf", obj);
    }
    // In hóa đơn
    this.InHoaDon = function (obj, divContentLoading = 'body') {
        var _notifySerVice = new NotifyService();
        if (obj.ma_mau_in === undefined || obj.ma_mau_in === null || obj.ma_mau_in === null) {
            _notifySerVice.error("Thiếu mã mẫu in");
            return;
        }
        var _service = new Service(false);
        return _service.getFile("/common/InHoaDon", obj);
    }
    // In PDF và ký số
    this.InPdfKySo = function (obj) {
        var _notifySerVice = new NotifyService();
        if (obj.ma_mau_in === undefined || obj.ma_mau_in === null || obj.ma_mau_in === null) {
            _notifySerVice.error("Thiếu mã mẫu in");
            return;
        }
        var _service = new Service(false);
        return _service.getFile("/common/printsignaturepdf", obj);
    }
    // Get Html PDF
    this.InHtmlPdf = function (obj) {
        var _notifySerVice = new NotifyService();
        if (obj.ma_mau_in === undefined || obj.ma_mau_in === null || obj.ma_mau_in === null) {
            _notifySerVice.error("Thiếu mã mẫu in");
            return;
        }
        var _service = new Service();
        return _service.getFile("/common/printhtmlpdf", obj);
    }
    // Lấy ảnh chi tiết hiển thị lên Viewer
    this.layAnhChiTiet = function (obj) {
        var _service = new Service();
        if (obj.loai === "DGRR") {
            return _service.postData("/claimOnline/getfiles", obj);
        } else {
            return _service.postData("/carclaim/carinvestigation/getfiles", obj);
        }
    }
    // Xoay ảnh
    this.rotateImage = function (obj) {
        var _service = new Service();
        return _service.postData("/common/rotateImage", obj);
    }
    // Đổi mật khẩu
    this.doiMatKhau = function (obj) {
        var _service = new Service();
        return _service.postData("/home/changepass", obj);
    }
    // Thoát
    this.dangXuat = function () {
        window.location.href = "/home/logout";
    }
    //Kiểm tra online offline chát giám định viên
    this.kiemTraKetNoiChat = function (obj) {
        var _service = new Service();
        _service.isPostObject = true;
        return _service.postData("/home/checkconnectionchat", obj);
    }
    //Lấy nội dung chát
    this.layNoiDungChat = function (obj) {
        var _service = new Service();
        return _service.postData("/home/getcontentchat", obj);
    }
    //Đọc file Excel
    this.docFileExcel = function (obj) {
        var _service = new Service();
        return _service.postFormData("/Upload/ReadFileExcel", obj);
    };
    //Đọc hóa đơn
    this.docHoaDon = function (obj) {
        var _service = new Service();
        return _service.postFormData("/Common/ReadBill", obj);
    };
    //Gửi SMS
    this.sendSMS = function (obj) {
        var _service = new Service();
        return _service.postData("/Common/sendSMS", obj);
    }
}
function validateEmailControl(el) {
    var error = "";
    if ($(el)) {
        var val = $(el).val();
        if (val != undefined && val != null && val.trim() !== "") {
            var check = ESCheck.isEmail(val);
            if (!check) {
                error = "Không đúng định dạng email";
            }
        }
    }
    return error;
}
function validateCMTControl(el) {
    var error = "";
    if ($(el)) {
        var val = $(el).val();
        if (val != undefined && val != null && val !== "") {
            if (val.length != 8 && val.length != 9 && val.length != 12) {
                error = "Không đúng định dạng CMT/CCCD";
            }
        }
    }
    return error;
}
function validatePhoneControl(el) {
    var error = "";
    if ($(el)) {
        var val = $(el).val().replace(/_/g, '');
        if (val != undefined && val != null && val !== "") {
            if (val.length != 10 && val.length != 11) {
                error = "Không đúng định dạng số điện thoại";
                return error;
            }
            if (val.substring(0, 1) != "0" && val.substring(0, 1) != "1") {
                error = "Số điện thoại phải bắt đầu từ số 0 hoặc 1";
                return error;
            }
            var arr_11 = [
                "120", "121", "122", "126", "128",//mobilephone
                "123", "124", "125", "127", "127",//vinaphone
                "186", "188", "189",//vietnammobile
                "199"//gmobile
            ];
            var arr_10 = [
                "70", "79", "77", "76", "78", "93", "89", "90",//mobilephone
                "83", "84", "85", "81", "82", "91", "94", "88", "87",//vinaphone
                "32", "33", "34", "35", "36", "37", "38", "39", "86", "95", "96", "97", "98",//viettell
                "56", "58", "92", "52",//vietnammobile,
                "99", "59", //gmobile //"1900"
            ];
            var arr_ban = [
                "212", "213", "214", "215", "216", "217", "218", // tây bắc bộ
                "203", "204", "205", "206", "207", "208", "209", "210", "219", // đông bắc bộ
                "211", "220", "221", "222", "225", "226", "227", "228", "229", //đồng bằng sông hồng
                "240", "241", "242", "243", "244", "245", "246", "247", "248", "249", // Hà nội
                "232", "233", "234", "237", "238", "239", // bắc trung bộ
                "235", "236", "252", "255", "256", "257", "258", "259", // nam trung bộ
                "260", "261", "262", "263", "269", // các tỉnh tây nguyên
                "280", "281", "282", "283", "284", "285", "286", "287", "288", "289",// TP HCM
                "251", "254", "271", "274", "276", // đông nam bộ
                "270", "272", "273", "275", "277", "290", "291", "292", "293", "294", "296", "297", "299" // tây nam bộ
            ];
            arr_tong_dai = ["900"];
            if (val.length == 11) {
                var ba_ky_tu = val.substring(1, 4);
                if (!arr_11.includes(ba_ky_tu) && !arr_ban.includes(ba_ky_tu)) {
                    error = "Đầu số điện thoại không hợp lệ";
                    return error;
                }
            }
            if (val.length == 10) {
                var hai_ky_tu = val.substring(1, 3);
                var ba_ky_tu = val.substring(1, 4);
                if (!arr_10.includes(hai_ky_tu) && !arr_ban.includes(ba_ky_tu) && !arr_tong_dai.includes(ba_ky_tu)) {
                    error = "Đầu số điện thoại không hợp lệ";
                    return error;
                }
            }
        }
    }
    return error;
}
//function validateNumberControl(el) {
//    if ($(el)) {
//        var val = $(el).val();
//        if (val == 0) {
//            s = s.replace(/^0+/, '');
//        }
//    }
//}