var _service = new Service();
var _commonService = new CommonService();
var _notifyService = new NotifyService();
var _modalXemHinhAnhDanhGiaRuiRo = new ModalFullScreenService("modalXemHinhAnhDanhGiaRuiRo", "");
var _modalQuayVideoDanhGiaRuiRo = new ModalFullScreenService("modalQuayVideoDanhGiaRuiRo", "");
var _modalXemVideoDanhGiaRuiRo = new ModalFullScreenService("modalXemVideoDanhGiaRuiRo", "");
var _modalNhapGhiChu = new ModalService("modalNhapGhiChu");
var _frmGhiChuHangMuc = new FormService("frmGhiChuHangMuc");
var _frmDanhGiaRuiRo = new FormService("frmDanhGiaRuiRo");
var detector = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var _navThongTinHinhAnh = new NavTabService("navThongTinHinhAnh", ["tabHinhAnhHoSo", "tabVideoHoSo", "tabXemHinhAnhHoSo"], "quy-trinh");
var objDanhMuc = {};
var setStep = "";
var urlImage = "/images/images-default.jpg";
var arrUrlImage = [
    { ma: "DGRR_TRUOCXE", url: "/images/landingpage/anh_truoc_xe.jpg"},
    { ma: "DGRR_TRAIXE", url: "/images/landingpage/anh_trai_xe.jpg"},
    { ma: "DGRR_SAUXE", url: "/images/landingpage/anh_sau_xe.jpg"},
    { ma: "DGRR_PHAIXE", url: "/images/landingpage/anh_phai_xe.jpg"},
];
var arrAnhThumnail = [];
function gotoTop() {
    $('html, body').scrollTop(0);
}
function randomNum() {
    "use strict";
    return Math.floor(Math.random() * 9) + 1;
}
function page404() {
    let loop1, loop2, loop3, time = 30, i = 0, number, selector3 = document.querySelector('.thirdDigit'), selector2 = document.querySelector('.secondDigit'),
        selector1 = document.querySelector('.firstDigit');
    loop3 = setInterval(function () {
        "use strict";
        if (i > 40) {
            clearInterval(loop3);
            selector3.textContent = 4;
        } else {
            selector3.textContent = randomNum();
            i++;
        }
    }, time);
    loop2 = setInterval(function () {
        "use strict";
        if (i > 80) {
            clearInterval(loop2);
            selector2.textContent = 0;
        } else {
            selector2.textContent = randomNum();
            i++;
        }
    }, time);
    loop1 = setInterval(function () {
        "use strict";
        if (i > 100) {
            clearInterval(loop1);
            selector1.textContent = 4;
        } else {
            selector1.textContent = randomNum();
            i++;
        }
    }, time);
}
function randomNumber() {
    "use strict";
    return Math.floor(Math.random() * 9) + 1;
}
function page505() {
    let loop4, loop5, loop6, time1 = 30, j = 0, number1, selector6 = document.querySelector('.thirdThree'), selector5 = document.querySelector('.secondTwo'),
        selector4 = document.querySelector('.firstOne');
    loop6 = setInterval(function () {
        "use strict";
        if (j > 40) {
            clearInterval(loop6);
            selector6.textContent = 5;
        } else {
            selector6.textContent = randomNumber();
            j++;
        }
    }, time1);
    loop5 = setInterval(function () {
        "use strict";
        if (j > 80) {
            clearInterval(loop5);
            selector5.textContent = 0;
        } else {
            selector5.textContent = randomNumber();
            j++;
        }
    }, time1);
    loop4 = setInterval(function () {
        "use strict";
        if (j > 100) {
            clearInterval(loop4);
            selector4.textContent = 0;
        } else {
            selector4.textContent = randomNumber();
            j++;
        }
    }, time1);
}
function hienThi(step) {
    setStep = step;
    showLoading(true, true, "body");
    if (step == 'page404') {
        page404();
    }
    if (step == 'page_ddos') {
        page505();
    }
    setTimeout(function () {
        $('#device-detect').addClass("d-none");
        $('#chup_anh_danh_gia').addClass("d-none");
        $('#danh_sach_xe').addClass("d-none");
        $('#danh_gia').addClass("d-none");
        $('#trang_chu').addClass("d-none");
        $('#page404').addClass("d-none");
        $('#page_ddos').addClass("d-none");
        showLoading(false, true, "body");
        $('#' + step).removeClass("d-none");
    }, 300);
    gotoTop();
}
function chonDoiTuongChupAnh(so_id_dt, so_id_lan, danh_gia) {
    var obj = {
        so_id_dt: so_id_dt,
        so_id_lan: so_id_lan,
        danh_gia: danh_gia
    }
    _frmDanhGiaRuiRo.setData(obj);
    $(".chupAnhDanhGia").removeClass("card-active");
    $("#chupAnhDanhGia_" + so_id_dt).addClass("card-active");
    $("#soIDDoiTuong").val(so_id_dt);
    $("#btnChupAnhDanhGia").prop("disabled", false);
    $("#btnChupAnhDanhGia").removeClass("btn-disabled").addClass("btn-button");
}
function getAnhThumnail(obj, callback = undefined) {
    _service.postData("/ClaimOnline/getFileThumnail", obj).then(res => {
        if (res.state_info.status === "OK") {
            bindAnhThumnail(res.data_info);
            initImageViewer();
            if (callback) {
                callback(res);
            }
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
}
function bindAnhThumnail(arrAnh) {
    if (arrAnh === undefined || arrAnh === null || arrAnh.length <= 0) {
        return;
    }
    var result = Object.entries(arrAnh.reduce((acc, { bt, ma_chi_nhanh, ma_file, ...object }) => {
        acc[ma_file] = (acc[ma_file] || []);
        acc[ma_file].push({ bt, ma_file, ma_chi_nhanh, ...object });
        return acc;
    }, {})).map(([key, value]) => ({ ma_file: key == null || key == "null" ? '' : key, children: value }));
    result.sort((a, b) => a.stt - b.stt);
    ESUtil.genHTML("divDanhSachHinhAnhChupDanhGiaRuiRoTemplate", "divDanhSachHinhAnhDanhGiaRuiRo", { hinh_anh: result });
    return result;
}
function initImageViewer() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.divDanhSachHinhAnhDanhGiaRuiRo');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhDanhGiaRuiRoView',
        id: 'modalXemHinhAnhDanhGiaRuiRoView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function xemAnhChiTietDanhGia(el) {
    var title = $(el).attr("data-name");
    $("#image-title").html(title);
    _modalXemHinhAnhDanhGiaRuiRo.show();
}
function chupAnhDanhGia(idFile) {
    $("#" + idFile).click();
}
function base64ToBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/jpeg' });
}
function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia);
}
function onChangeChupAnhDanhGia(el) {
    const fileList = el.files;
    var id = $(el).attr("id");
    var ma = $(el).attr("data-ma");
    var stt = $(el).attr("data-stt");
    for (const file of fileList) {
        if (file.type && !file.type.startsWith('image/')) {
            _notifyService.error("Tệp không phải hình ảnh!");
            return;
        }
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            var image = new Image();
            image.src = readerEvent.target.result;
            image.onload = function (imageEvent) {
                var canvas = document.createElement('canvas'),
                    max_size = 600,
                    width = image.width,
                    height = image.height;
                if (width > height) {
                    if (width > max_size) {
                        height *= max_size / width;
                        width = max_size;
                    }
                } else {
                    if (height > max_size) {
                        width *= max_size / height;
                        height = max_size;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                canvas.getContext('2d').drawImage(image, 0, 0, width, height);
                var dataUrl = canvas.toDataURL();
                var blob = base64ToBlob(dataUrl);
                var blobUrl = URL.createObjectURL(blob);
                $("#img_" + id).attr("src", blobUrl);
                $("#removeImage_" + id).css("display", "block");
            }
        }
        reader.readAsDataURL(file);
    }
    var hinh_anh = objDanhMuc.hinh_anh.where(n => n.ma == ma).firstOrDefault();
    var ho_so_anh = hinh_anh.files.where(n => n.file_name == id).firstOrDefault();
    ho_so_anh.is_exist = true;
    ho_so_anh.stt = stt;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var crdPosition = position.coords;
                ho_so_anh.x = crdPosition.latitude;
                ho_so_anh.y = crdPosition.longitude;
            },
            function errorCallback(error) {
                console.log(`ERROR(${error.code}): ${error.message}`);
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }
    if (ma == "DGRR_KHAC") {
        var dem = hinh_anh.files.where(n => n.is_exist == false).length;
        if (dem == 0) {
            var index_new = hinh_anh.files.max(n => n.file_index) + 1;
            var fileNew = { file_index: index_new, file_name: "file_" + ma + "_" + index_new, x: '0', y: '0', is_exist: false, stt: index_new };
            hinh_anh.files.push(fileNew);
            var item = JSON.parse(JSON.stringify(fileNew));
            item.ma = ma;
            ESUtil.appendHTML("divHinhAnhDanhGiaRuiRoTemplate", "divHinhAnhDanhGiaRuiRo" + ma, item);
            $("#removeImage_file_" + ma + "_" + index_new).css("display", "block");
        }
    }
}
function showLoading(isShow, aceptShow, divLoading = 'body') {
    if (isShow && aceptShow) {
        ESLoading.show(divLoading);
    }
    else {
        ESLoading.hide(divLoading);
    }
}
function xoaAnhChup(id) {
    $("#img_" + id).attr("src", urlImage);
    $("#removeImage_" + id).css("display", "none");
}
function kiemTraChupAnh(arrAnh, arrAnhDaChup) {
    if (arrAnh.length > 0 && arrAnhDaChup.length > 0) {
        $.each(arrAnh, function (index, item) {
            $.each(arrAnhDaChup, function (index1, item1) {
                if (item.ma == item1.nhom) {
                    arrAnh = arrAnh.filter(n => n != item);
                }
            });
        });
        arrAnh = arrAnh.where(n => n.ma != "DGRR_KHAC");
    }
    return arrAnh;
}
function onChonBinhThuong(el) {
    var id = $(el).attr("id");
    var ma = $(el).attr("data-ma");
    $("." + ma).prop("checked", false);
    $("#" + id).prop("checked", true);
}
function onChonKhac(el) {
    var id = $(el).attr("id");
    var ma = $(el).attr("data-ma");
    $("." + ma).prop("checked", false);
    $("#" + id).prop("checked", true);
}
function showGhiChu(el) {
    var val = $(el).attr("data-val");
    var name = $(el).attr("data-name");
    var id = $(el).attr("data-id");
    if (val == undefined) {
        val = "";
    }
    $("#hang-muc-title").html("Ghi chú " + name);
    _frmGhiChuHangMuc.getControl("ghi_chu").val(val);
    _frmGhiChuHangMuc.getControl("ghi_chu").attr("data-id", id);
    _modalNhapGhiChu.show();
}
function layDuLieuTableDanhGiaRuiRo() {
    var otArr = [];
    $("#divThongTinDanhGiaTonThat .item-danhgia").each(function (e) {
        var json = {};
        x = $(this).children();
        x.each(function (i) {
            $(this).find("input").each(function (el) {
                var check_result = 'BT';
                var field = $(this).attr("data-field");
                if ($(this).hasClass("checkbox")) {
                    if (field == "danh_gia_khac" && $(this).is(":checked") == true) {
                        check_result = 'KHAC'
                    }
                    if (field == "danh_gia_bt" && $(this).is(":checked") == true) {
                        check_result = 'BT'
                    }
                    json.danh_gia = check_result;
                }
                else {
                    json[field] = $(this).attr("data-val");
                }
            });

            $(this).find("a").each(function (el) {
                var name = $(this).attr("data-field");
                json[name] = $(this).attr("data-val");
            });
        });
        otArr.push(json);
    });
    return otArr;
}
function onCheckHoanThanh(el) {
    var check = $(el).is(":checked");
    if (check == true) {
        $("#btnHoanThanhDanhGiaSoBo").prop("disabled", false);
        $("#btnHoanThanhDanhGiaSoBo").removeClass("btn-disabled").addClass("btn-button");
    } else {
        $("#btnHoanThanhDanhGiaSoBo").prop("disabled", true);
        $("#btnHoanThanhDanhGiaSoBo").addClass("btn-disabled").removeClass("btn-button");
    }
}
function showStepHinhAnh(step) {
    ESUtil.genHTML("divDanhSachVideoDanhGiaRuiRoTemplate", "divDanhSachVideoDanhGiaRuiRo", { data: [] });
    ESUtil.genHTML("divDanhSachHinhAnhChupDanhGiaRuiRoTemplate", "divDanhSachHinhAnhDanhGiaRuiRo", { hinh_anh: [] });
    if (step == "tabHinhAnhHoSo") {
        $("#tabHinhAnh").addClass("active");
        $("#tabHinhAnhHoSo").addClass("active");
        $("#tabVideoHoSo").removeClass("active");
        $("#tabVideo").removeClass("active");
        $("#tabXemHinhAnhHoSo").removeClass("active");
        $("#tabXemHinhAnh").removeClass("active");
        _navThongTinHinhAnh.showTab(step);
        showLoading(true, true, "body");
        setTimeout(function () {
            showLoading(false, true, "body");
            ESUtil.genHTML("divDanhSachHinhAnhChupTemplate", "divDanhSachHinhAnhChup", { hinh_anh: objDanhMuc.hinh_anh });
        }, 300);
        $("#btnQuayVideo").parent().parent().parent().addClass("d-none");
        $("#btnDanhGiaRuiRo").addClass("d-none");
        $("#btnUpload").removeClass("d-none");
    }
    if (step == "tabVideoHoSo") {
        $("#tabHinhAnh").removeClass("active");
        $("#tabHinhAnhHoSo").removeClass("active");
        $("#tabVideoHoSo").addClass("active");
        $("#tabVideo").addClass("active");
        $("#tabXemHinhAnhHoSo").removeClass("active");
        $("#tabXemHinhAnh").removeClass("active");
        _navThongTinHinhAnh.showTab(step);
        layDanhSachVideo();
        $("#btnQuayVideo").parent().parent().parent().removeClass("d-none");
        $("#btnDanhGiaRuiRo").addClass("d-none");
        $("#btnUpload").addClass("d-none");
    }
    if (step == "tabXemHinhAnhHoSo") {
        $("#tabHinhAnh").removeClass("active");
        $("#tabHinhAnhHoSo").removeClass("active");
        $("#tabVideoHoSo").removeClass("active");
        $("#tabVideo").removeClass("active");
        $("#tabXemHinhAnhHoSo").addClass("active");
        $("#tabXemHinhAnh").addClass("active");
        _navThongTinHinhAnh.showTab(step);
        layDanhSachHinhAnh();
        $("#btnQuayVideo").parent().parent().parent().addClass("d-none");
        $("#btnDanhGiaRuiRo").removeClass("d-none");
        $("#btnUpload").addClass("d-none");
    }
    return;
}
function layDanhSachHinhAnh() {
    var obj = _frmDanhGiaRuiRo.getJsonData();
    obj.ma_doi_tac = $("#ma_doi_tac").val();
    obj.so_id_hd = $("#so_id").val();
    _service.postData("/ClaimOnline/getFileThumnail", obj).then(res => {
        if (res.state_info.status === "OK") {
            arrAnhThumnail = res.data_info;
            if (arrAnhThumnail.length > 0) {
                bindAnhThumnail(arrAnhThumnail);
                initImageViewer();
            } else {
                ESUtil.genHTML("divKhongCoKetQuaTemplate", "divDanhSachHinhAnhDanhGiaRuiRo", { hinh_anh: [] });
            }
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
}
function layDanhSachVideo() {
    var obj = _frmDanhGiaRuiRo.getJsonData();
    obj.ma_doi_tac_nsd = $("#ma_doi_tac").val();
    obj.so_id = $("#so_id").val();
    _service.postData("/ClaimOnline/layDanhSachVideo", obj).then(res => {
        if (res.state_info.status === "OK") {
            if (res.data_info.length > 0) {
                ESUtil.genHTML("divDanhSachVideoDanhGiaRuiRoTemplate", "divDanhSachVideoDanhGiaRuiRo", { data: res.data_info });
            } else {
                ESUtil.genHTML("divKhongCoKetQuaTemplate", "divDanhSachVideoDanhGiaRuiRo", { data: [] });
            }
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
}
function xemVideoDanhGiaRuiRo(ma_doi_tac, so_id, so_id_dt, bt) {
    var obj = {
        ma_doi_tac_nsd: ma_doi_tac,
        so_id: so_id,
        so_id_dt: so_id_dt,
        bt: bt
    }
    _service.postData("/ClaimOnline/xemVideoHs", obj).then(res => {
        if (res.state_info.status === "OK") {
            $("#xemVideoDanhGiaRuiRo").attr("src", res.data_info.duong_dan);
            _modalXemVideoDanhGiaRuiRo.show();
        } else {
            _notifyService.error(res.state_info.message_body);
        }
    });
}

//huynq
const userCamOptions = {
    device: "",
    screen: {},
    record: {},
};
const [cameraInfoBar] = $("#modalQuayVideoDanhGiaRuiRo .camera-container .camera-info");
const [cameraControlBar] = $("#modalQuayVideoDanhGiaRuiRo .camera-container .camera-control");
const [cameraScreen] = $("#modalQuayVideoDanhGiaRuiRo .camera-container>.camera-media>video");
const [btnPlay, btnPause, btnRecord, btnStop] = [...cameraControlBar.querySelectorAll(".media-button")];
const [btnCloseStream, btnIsRecording] = [...cameraInfoBar.querySelectorAll(".media-button")].reverse();
const recordProgress = document.getElementById('recordProgress');
const recordFPS = 30;
const recordInterval = [];
const recordTimeLimit = 30;

const _cameraService = new CameraService(cameraScreen);

$(document).ready(async function () {
    hienThi("page_ddos");
    var ma_doi_tac = $("#ma_doi_tac").val();
    var so_id = $("#so_id").val();
    if (ma_doi_tac == "" && ma_doi_tac == null && ma_doi_tac == undefined) {
        _notifyService.error("Không xác định được thông tin mã đối tác");
        return;
    }
    if (so_id == "" && so_id == null && so_id == undefined) {
        _notifyService.error("Không xác định được thông tin số ID hợp đồng");
        return;
    }
    _service.all([
        _service.postData("/ClaimOnline/layThongTinHopDong", { ma_doi_tac: ma_doi_tac, so_id: so_id }),
        _service.postData("/ClaimOnline/layThongTinHangMucDGRR", { ma_doi_tac: ma_doi_tac })
    ]).then(arrRes => {
        var arrHopDong = arrRes[0];
        var arrHinhAnh = arrRes[1];
        if (arrHopDong.state_info.status !== "OK") {
            hienThi("page404");
            return;
        }
        if (arrHinhAnh.state_info.status !== "OK") {
            hienThi("page404");
            return;
        }
        objDanhMuc = arrHopDong.data_info;
        objDanhMuc.hinh_anh = arrHinhAnh.data_info;
        if (objDanhMuc.doi_tac == null) {
            hienThi("page404");
            return;
        }
        gotoTop();
        if (!detector) {
            hienThi("device-detect");
            return;
        } else {
            hienThi("trang_chu");
        }
        var logo = objDanhMuc.cai_dat.where(n => n.loai == "LOGO_DANG_NHAP").firstOrDefault();
        ESUtil.checkLoadImage("/" + logo.url_anh, () => {
            $(".app_logo").attr("src", "/" + logo.url_anh);
        }, () => { console.log("Không tìm thấy ảnh logo trên webserver"); });
        $(".app_ten_cty_bh").html(logo.ten_doi_tac.toUpperCase());
        var dataHD = objDanhMuc.hd;
        ESUtil.genHTML("divThongTinHopDongTemplate", "divThongTinHopDong", { data: dataHD });
        ESUtil.genHTML("divThongTinKhachHangTemplate", "divThongTinKhachHang", { data: dataHD });
        ESUtil.genHTML("divThongTinDanhSachXeTemplate", "divThongTinDanhSachXe", { data: [] });
        for (var i = 0; i < objDanhMuc.hinh_anh.length; i++) {
            objDanhMuc.hinh_anh[i].tinh_trang = 'BT';
            objDanhMuc.hinh_anh[i].ghi_chu = '';
            objDanhMuc.hinh_anh[i].files = [];
            objDanhMuc.hinh_anh[i].files.push({ file_index: 0, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_0", x: '0', y: '0', is_exist: false, stt: '0' })
            for (var j = 0; j < arrUrlImage.length; j++) {
                if (objDanhMuc.hinh_anh[i].ma == arrUrlImage[j].ma) {
                    objDanhMuc.hinh_anh[i].url = arrUrlImage[j].url;
                }
            }
        }
    });
    $("#btnTrangChu").click(function () {
        //if (window.innerWidth >= 768) {
        //    hienThi("device-detect");
        //    return;
        //}
        hienThi("trang_chu");
    });
    $("#btnDanhSachXe").click(function () {
        //if (window.innerWidth >= 768) {
        //    hienThi("device-detect");
        //    return;
        //}
        hienThi("danh_sach_xe");
        $("#btnChupAnhDanhGia").prop("disabled", true);
        $("#btnChupAnhDanhGia").addClass("btn-disabled").removeClass("btn-button");
        var data = objDanhMuc.gcn;
        if (data.length > 0) {
            ESUtil.genHTML("divThongTinDanhSachXeTemplate", "divThongTinDanhSachXe", { data: data}, () => {
                if (objDanhMuc.gcn.length == 1) {
                    $(".chupAnhDanhGia").addClass("card-active");
                    $(".chupAnhDanhGia").trigger("click");
                }
            });
        } else {
            ESUtil.genHTML("divKhongCoKetQuaTemplate", "divThongTinDanhSachXe", { data: [] });
        }
    });
    $("#btnQuayLaiDSXe").click(function () {
        //if (window.innerWidth >= 768) {
        //    hienThi("device-detect");
        //    return;
        //}
        hienThi("danh_sach_xe");
    });
    $("#btnChupAnhDanhGia").click(function () {
        hienThi("chup_anh_danh_gia");
        showStepHinhAnh("tabHinhAnhHoSo");
    });
    $("#btnChupAnh").click(function () {
        //if (window.innerWidth >= 768) {
        //    hienThi("device-detect");
        //    return;
        //}
        hienThi("chup_anh_danh_gia");
        showStepHinhAnh("tabXemHinhAnhHoSo");
    });
    $("#btnUpload").click(function () {
        $("#checkHoanThanh").prop("checked", false);
        $("#btnHoanThanhDanhGiaSoBo").prop("disabled", true);
        $("#btnHoanThanhDanhGiaSoBo").addClass("btn-disabled").removeClass("btn-button");
        //if (window.innerWidth >= 768) {
        //    hienThi("device-detect");
        //    return;
        //}
        var so_id_dt = _frmDanhGiaRuiRo.getControl("so_id_dt").val();
        var danh_gia = _frmDanhGiaRuiRo.getControl("danh_gia").val();
        if ((danh_gia == "" || danh_gia == null || danh_gia == 'C') && arrAnhThumnail.length <= 0) {
            var formData = new FormData();
            formData.append("ma_doi_tac_nsd", objDanhMuc.hd.ma_doi_tac);
            formData.append("ma_doi_tac", objDanhMuc.hd.ma_doi_tac);
            formData.append("ma_chi_nhanh", objDanhMuc.hd.ma_chi_nhanh);
            formData.append("so_id", objDanhMuc.hd.so_id);
            formData.append("so_id_dt", so_id_dt);
            formData.append("nv", "XE");
            formData.append("pm", "BH");
            formData.append("ung_dung", "WEB_MOBILE_KH");
            var arr = [];
            var ds_anh = objDanhMuc.hinh_anh;
            var fileIndex = 0;
            for (var i = 0; i < ds_anh.length; i++) {
                var hinh_anh = ds_anh[i];
                var ds_file = hinh_anh.files.where(n => n.is_exist);
                for (var j = 0; j < ds_file.length; j++) {
                    var fileName = $("#divDanhSachHinhAnhChup input#" + ds_file[j].file_name)[0].files[0].name;
                    var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                    var fileInfo = { key_file: "file" + fileIndex, nhom: hinh_anh.ma, x: ds_file[j].x, y: ds_file[j].y, stt: ds_file[j].stt };
                    arr.push(fileInfo);
                    formData.append("file" + fileIndex, $("#divDanhSachHinhAnhChup input#" + ds_file[j].file_name)[0].files[0], ds_file[j].file_name + "." + fileNameExt);
                    fileIndex++;
                }
            }
            //var arrAnh = kiemTraChupAnh(objDanhMuc.hinh_anh, arr);
            //if (arrAnh.length > 0) {
            //    _notifyService.error("Tồn tại hạng mục chưa thực hiện chụp ảnh!");
            //    return;
            //}
            if (arr.length == 0) {
                _notifyService.error("Bạn chưa thực hiện chụp ảnh!");
                return;
            }
            formData.append("files", JSON.stringify(arr));
            _service.postFormData("/upload/uploadfilenonelogin", formData).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                _notifyService.info("Tải ảnh thành công", () => {
                    showStepHinhAnh("tabXemHinhAnhHoSo");
                });
            });
        } else if ((danh_gia == "" || danh_gia == null || danh_gia == 'C') && arrAnhThumnail.length > 0) {
            ESUtil.genHTML("divThongTinDanhGiaTonThatTemplate", "divThongTinDanhGiaTonThat", { data: objDanhMuc.hinh_anh });
            hienThi("danh_gia");
        } else {
            var obj = _frmDanhGiaRuiRo.getJsonData();
            obj.ma_doi_tac = objDanhMuc.hd.ma_doi_tac;
            obj.so_id_hd = objDanhMuc.hd.so_id;
            _service.postData("/ClaimOnline/layThongTinDanhGiaRuiRo", obj).then(res => {
                if (res.state_info.status === "OK") {
                    ESUtil.genHTML("divThongTinDanhGiaTonThatTemplate", "divThongTinDanhGiaTonThat", { data: res.data_info });
                    $("#checkHoanThanh").prop("checked", true);
                    $("#btnHoanThanhDanhGiaSoBo").prop("disabled", false);
                    $("#btnHoanThanhDanhGiaSoBo").removeClass("btn-disabled").addClass("btn-button");
                    hienThi("danh_gia");
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });
    $("#btnDanhGiaRuiRo").click(function () {
        ESUtil.genHTML("divThongTinDanhGiaTonThatTemplate", "divThongTinDanhGiaTonThat", { data: objDanhMuc.hinh_anh });
        hienThi("danh_gia");
    });
    $("#btnHoanThanhDanhGiaSoBo").click(function () {
        var obj = _frmDanhGiaRuiRo.getJsonData();
        if (obj.danh_gia == "" || obj.danh_gia == null || obj.danh_gia == 'C') {
            obj.ma_doi_tac = objDanhMuc.hd.ma_doi_tac;
            obj.so_id_hd = objDanhMuc.hd.so_id;
            obj.tinh_trang = 'D';
            obj.xac_nhan = 'C';
            obj.nguon = 'WEB_MOBILE_KH';
            obj.arr = layDuLieuTableDanhGiaRuiRo();
            _service.postData("/ClaimOnline/nhapThongTinDanhGiaRuiRo", obj).then(res => {
                if (res.state_info.status === "OK") {
                    _notifyService.info("Hoàn tất đánh giá!", () => {
                        _service.postData("/ClaimOnline/layThongTinHopDong", { ma_doi_tac: obj.ma_doi_tac, so_id: obj.so_id_hd }).then(res => {
                            objDanhMuc.gcn = res.data_info.gcn;
                            ESUtil.genHTML("divThongTinDanhSachXeTemplate", "divThongTinDanhSachXe", { data: res.data_info.gcn });
                            hienThi("danh_sach_xe");
                        });
                    });
                } else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        } else {
            _notifyService.info("Hợp đồng đã hoàn tất đánh giá. Không sửa xóa!", () => {
                hienThi("danh_sach_xe");
            });
        }
    });
    $("#btnLuuGhiChu").click(function () {
        var val = _frmGhiChuHangMuc.getControl("ghi_chu").val();
        var id = _frmGhiChuHangMuc.getControl("ghi_chu").attr("data-id");
        if (val != "") {
            $("#divThongTinDanhGiaTonThat .item-danhgia").find("i[data-ma=" + id + "]").addClass("text-primary");
        }
        else {
            $("#divThongTinDanhGiaTonThat .item-danhgia").find("i[data-ma=" + id + "]").removeClass("text-primary");
        }
        $("#divThongTinDanhGiaTonThat .item-danhgia").find("a[data-field='ghi_chu'][data-id=" + id + "]").attr("data-val", val);
    });
    $("#btnBackVideo").click(function () {
        showLoading(true, true, "body");
        setTimeout(function () {
            showLoading(false, true, "body");
            _modalXemVideoDanhGiaRuiRo.hide();
        }, 300);
        if ($.fullscreen.isFullScreen()) {
            $.fullscreen.exit();
        }
    });

    //huynq
    _cameraService.onRecordFinished = (blob => {
        const obj = _frmDanhGiaRuiRo.getJsonData();
        const MB = 15;
        const maxAllowedSize = MB * 1024 * 1024;

        if (blob.size > maxAllowedSize) {
            _notifyService.error("File video không được vượt quá " + MB + "MB");
            return;
        }

        const videoName = prompt("Nhập tên video, bỏ trống hoặc ấn hủy để ngừng upload");
        if (videoName == "" || videoName === null || videoName === undefined) {
            //window.open(URL.createObjectURL(blob), "_blank");
            return;
        }

        blob.name = `${new Date().getTime()}_${ESUtil.xoaKhoangTrangText(videoName)}.mp4`;

        const formData = new FormData();
        formData.append("vid", blob, blob.name);
        formData.append("ma_doi_tac_nsd", $("#ma_doi_tac").val());
        formData.append("so_id", $("#so_id").val());
        formData.append("so_id_dt", obj.so_id_dt);
        formData.append("ten", videoName);

        _service.postFormData("/Upload/UploadVideoNoneLogin", formData).then(res => {
            if (res.state_info.status !== "OK") {
                _notifyService.error(res.state_info.message_body);
                return;
            }
            _notifyService.confirmUpload("Tải video thành công", () => {
                _cameraService.closeStream();
                _modalQuayVideoDanhGiaRuiRo.hide();
                layDanhSachVideo();
            });
        });
    });
    _cameraService.onRecordStarted = mediaRecorder => {
        const totalFrame_3 = recordTimeLimit * recordFPS / 3;
        const intervalTime = recordTimeLimit * 1000 / totalFrame_3;
        let progress = totalFrame_3;

        recordProgress.style.width = "100%";
        recordProgress.parentElement.parentElement.classList.remove('d-none');

        recordInterval.push(setInterval(() => {
            if (progress <= 0) {
                if (recordInterval.length > 0) clearInterval(recordInterval.pop());
                if (mediaRecorder.state === "recording") btnStop.click();
                recordProgress.parentElement.parentElement.classList.add('d-none');
                return;
            }
            else if (mediaRecorder.state === "recording") {
                progress -= 1;
                recordProgress.style.width = `${progress * 100 / totalFrame_3}%`;
            }
        }, intervalTime));
    }
    _cameraService.onRecordStopped = () => {
        if (recordInterval.length > 0) {
            clearInterval(recordInterval.pop());
            recordProgress.parentElement.parentElement.classList.add('d-none');
        }
    }

    $("#btnQuayVideo").click(async () => {
        try {
            await _cameraService.startStreamDevice(userCamOptions.device, userCamOptions.screen, userCamOptions.record);

            btnPlay.classList.add('d-none');
            btnPause.classList.remove('d-none');
            btnRecord.classList.remove('d-none');
            btnStop.classList.add('d-none');
            _modalQuayVideoDanhGiaRuiRo.show();
        }
        catch {
            _notifyService.error("Không thể truy cập camera!");
        }
    });
    $(btnCloseStream).click(() => {
        _cameraService.closeStream();
        _modalQuayVideoDanhGiaRuiRo.hide();
    });
    $(btnPlay).click(() => {
        _cameraService.play(() => {
            btnPlay.classList.add('d-none');
            btnPause.classList.remove('d-none');
        });
    });
    $(btnPause).click(() => {
        _cameraService.pause(() => {
            btnPlay.classList.remove('d-none');
            btnPause.classList.add('d-none');
        });
    });
    $(btnRecord).click(() => {
        if (_cameraService.player.paused === true) {
            btnPlay.click();
        };
        _cameraService.startRecord(() => {
            btnRecord.classList.add('d-none');
            btnStop.classList.remove('d-none');
            btnCloseStream.classList.add('d-none');
            btnIsRecording.classList.remove('d-none');
        });
    });
    $(btnStop).click(() => {
        _cameraService.stopRecord(() => {
            btnRecord.classList.remove('d-none');
            btnStop.classList.add('d-none');
            btnCloseStream.classList.remove('d-none');
            btnIsRecording.classList.add('d-none');
        });
    });
});