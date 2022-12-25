var objDanhMuc = {};
var _service = new Service();
var _userInformationService = new UserInformationService();
var _frmUserInformation = new FormService("frmUserInformation");
var data_form = '';
const IMAGE_DEFAULT = "/images/default.png";

$(document).ready(function () {
    var obj = {
        ma_nsd: $('#escs_tai_khoan').val(),
        ma_doi_tac: $('#escs_ma_doi_tac').val(),
        ma_chi_nhanh: $('#escs_ma_chi_nhanh').val(),
        phong: $('#escs_phong').val()
    };
    _userInformationService.layThongTinNsd(obj).then(res => {
        data_form = res.data_info;
        var objData = res.data_info;
        _frmUserInformation.clearErrorMessage();
        _frmUserInformation.setData(objData);
        $("#img_main").attr("src", IMAGE_DEFAULT);
        $(".dropdown-user img").attr("src", IMAGE_DEFAULT);
        if (objData.anh_dai_dien != undefined && objData.anh_dai_dien != null && objData.anh_dai_dien != "") {
            ESUtil.checkLoadImage("/" + objData.anh_dai_dien, () => {
                $("#img_main").attr("src", "/" + objData.anh_dai_dien);
            });
            ESUtil.checkLoadImage("/" + objData.anh_dai_dien, () => {
                $(".dropdown-user img").attr("src", "/" + objData.anh_dai_dien);
            });
        }
    });
    $('#btnReset').click(function() {
        _frmUserInformation.clearErrorMessage();
        _frmUserInformation.setData(data_form);
    });

    $('#btnLuuThongTinNSD').click(function () {
        if (_frmUserInformation.isValid()) {
            var ma = $('input[name="ma"]').val();
            var formData = _frmUserInformation.getFormFileData();
            if (ma !== data_form.ma) {
                return _notifyService.error("không thể thay đổi mã người dùng");
            }
            _userInformationService.capnhat(formData).then(res => {
                if (res.state_info.status === "OK") {
                    $(".dropdown-user img").attr("src", IMAGE_DEFAULT);
                    if (res.data_info.nguoi_dung.anh_dai_dien != undefined && res.data_info.nguoi_dung.anh_dai_dien != null && res.data_info.nguoi_dung.anh_dai_dien != "") {
                        ESUtil.checkLoadImage("/" + res.data_info.nguoi_dung.anh_dai_dien, () => {
                            $(".dropdown-user img").attr("src", "/" + res.data_info.nguoi_dung.anh_dai_dien);
                        });
                    }
                    $('#nameUser').html(res.data_info.nguoi_dung.ten);
                    $('#emailUser').html(res.data_info.nguoi_dung.email);
                    $('#phoneUser').html(res.data_info.nguoi_dung.dthoai);
                    _notifyService.success("Lưu thông tin người sử dụng thành công.");
                }
                else {
                    _notifyService.error(res.state_info.message_body);
                }
            });
        }
    });

    var readURL = function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.avatar').attr('src', e.target.result);
            }

            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#file_anh_dai_dien").on('change', function () {
        readURL(this);
    });
})