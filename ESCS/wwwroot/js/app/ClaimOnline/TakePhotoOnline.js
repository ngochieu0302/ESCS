var objDanhMuc = {};
var _service = new Service();
var _notifyService = new NotifyService();
var detector = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
var setStep = "";

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
        $('#hinh_anh').addClass("d-none");
        $('#trang_chu').addClass("d-none");
        $('#page404').addClass("d-none");
        $('#page_ddos').addClass("d-none");
        $('#' + step).removeClass("d-none");
        showLoading(false, true, "body");
        $('#' + step).removeClass("d-none");
    }, 300);
    gotoTop();
}
function showLoading(isShow, aceptShow, divLoading = 'body') {
    if (isShow && aceptShow) {
        ESLoading.show(divLoading);
    }
    else {
        ESLoading.hide(divLoading);
    }
}
function chupAnh(idFile) {
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
function onChangeAnh(el) {
    const fileList = el.files;
    var id = $(el).attr("id");
    var ma = $(el).attr("data-ma");
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
    var dem = hinh_anh.files.where(n => n.is_exist == false).length;
    if (dem == 0) {
        var index_new = hinh_anh.files.max(n => n.file_index) + 1;
        var fileNew = { file_index: index_new, file_name: "file_" + ma + "_" + index_new, x: '0', y: '0', is_exist: false };
        hinh_anh.files.push(fileNew);
        var item = JSON.parse(JSON.stringify(fileNew));
        item.ma = ma;
        ESUtil.appendHTML("divHinhAnhTemplate", "divHinhAnh" + ma, item);
    }
}
$(document).ready(function () {
    hienThi("page_ddos");
    var ma = $("#short_link").val();
    if (ma == "" && ma == null && ma == undefined) {
        _notifyService.error("Không xác định được thông tin link chụp ảnh");
        return;
    }
    _service.postData("/ClaimOnline/LayThongTinHoSoTheoShortLink", { short_link: ma }).then(res => {
        var ho_so = res.data_info.ho_so;
        if (res.state_info.status !== "OK") {
            hienThi("page404");
            return;
        }
        objDanhMuc = res.data_info;
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
        var ho_so = objDanhMuc.ho_so;
        ESUtil.genHTML("divThongTinHoSoTemplate", "divThongTinHoSo", { ho_so: ho_so });
        ESUtil.genHTML("divThongTinDoiTuongBaoHiemTemplate", "divThongTinDoiTuongBaoHiem", { ho_so: ho_so });
        for (var i = 0; i < objDanhMuc.hinh_anh.length; i++) {
            objDanhMuc.hinh_anh[i].files = [];
            objDanhMuc.hinh_anh[i].files.push({ file_index: 0, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_0", x: '0', y: '0', is_exist: false })
            objDanhMuc.hinh_anh[i].files.push({ file_index: 1, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_1", x: '0', y: '0', is_exist: false })
            objDanhMuc.hinh_anh[i].files.push({ file_index: 2, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_2", x: '0', y: '0', is_exist: false })
            objDanhMuc.hinh_anh[i].files.push({ file_index: 3, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_3", x: '0', y: '0', is_exist: false })
        }
        ESUtil.genHTML("divDanhSachHinhAnhTemplate", "divDanhSachHinhAnh", objDanhMuc);
    });
    $("#chupAnh").click(function () {
        if (window.innerWidth >= 768) {
            hienThi("device-detect");
            return;
        }
        hienThi("hinh_anh");
    });
    $("#btnQuayLai").click(function () {
        if (window.innerWidth >= 768) {
            hienThi("device-detect");
            return;
        }
        hienThi("trang_chu");
    });
    $("#btnUpload").click(function () {
        var formData = new FormData();
        formData.append("ma_doi_tac_nsd", objDanhMuc.ho_so.ma_doi_tac);
        formData.append("ma_doi_tac", objDanhMuc.ho_so.ma_doi_tac);
        formData.append("ma_chi_nhanh", objDanhMuc.ho_so.ma_chi_nhanh);
        formData.append("so_id", objDanhMuc.ho_so.so_id);
        formData.append("so_id_dt", objDanhMuc.ho_so.so_id_dt);
        formData.append("nv", objDanhMuc.ho_so.nv);
        formData.append("pm", "GD");
        formData.append("ung_dung", "WEB_MOBILE_KH");
        var arr = [];
        var ds_anh = objDanhMuc.hinh_anh;
        var fileIndex = 0;
        for (var i = 0; i < ds_anh.length; i++) {
            var hinh_anh = ds_anh[i];
            var ds_file = hinh_anh.files.where(n => n.is_exist);
            for (var j = 0; j < ds_file.length; j++) {
                var fileName = $("#divDanhSachHinhAnh input#" + ds_file[j].file_name)[0].files[0].name;
                var fileNameExt = fileName.substr(fileName.lastIndexOf('.') + 1);
                var fileInfo = { key_file: "file" + fileIndex, nhom: hinh_anh.ma, x: ds_file[j].x, y: ds_file[j].y };
                arr.push(fileInfo);
                formData.append("file" + fileIndex, $("#divDanhSachHinhAnh input#" + ds_file[j].file_name)[0].files[0], ds_file[j].file_name + "." + fileNameExt);
                fileIndex++;
            }
        }
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
            _notifyService.info("Tải ảnh thành công!", () => {
                hienThi("trang_chu");
                for (var i = 0; i < objDanhMuc.hinh_anh.length; i++) {
                    objDanhMuc.hinh_anh[i].files = [];
                    objDanhMuc.hinh_anh[i].files.push({ file_index: 0, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_0", is_exist: false })
                    objDanhMuc.hinh_anh[i].files.push({ file_index: 1, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_1", is_exist: false })
                    objDanhMuc.hinh_anh[i].files.push({ file_index: 2, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_2", is_exist: false })
                    objDanhMuc.hinh_anh[i].files.push({ file_index: 3, file_name: "file_" + objDanhMuc.hinh_anh[i].ma + "_3", is_exist: false })
                }
                ESUtil.genHTML("divDanhSachHinhAnhTemplate", "divDanhSachHinhAnh", objDanhMuc);
            });
        });
    });
});