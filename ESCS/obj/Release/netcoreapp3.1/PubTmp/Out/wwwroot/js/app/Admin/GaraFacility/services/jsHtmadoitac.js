var _service = new UserManagementService();
var objDanhMuc = {};

//var objDefault = {
//    ma: "ma",
//    ten: "ten",
//    ten_e: "ten_e",
//    ten_gon: "ten_gon",
//    dchi: "dchi",
//    ma_thue: "ma_thue",
//    nhang: "nhang",
//    kvuc: "kvuc",
//    d_thoai: "d_thoai",
//    email: "email",
//    so_tk: "so_tk",
//    ngan_hang: "ngan_hang"
//};

var _modalNhapDoiTac = new ModalService("modalNhapDoiTac");   // id modal
var _frmLuuThongTinDoiTac = new FormService("frmLuuThongTinDoiTac");   // name cua form
var _submitForm = new ButtonService("submitForm");      // nut luu
var _btnSetDefaulValueForm = new ButtonService("btnSetDefaulValueForm");   // nut moi
var _btnNhapThongTinDoiTac = new ButtonService("btnNhapThongTinDoiTac");   //  

//var _btnLuuThongTinNguoiDung = new ButtonService("btnLuuThongTinNguoiDung");

//var _btnReadOnly = new ButtonService("btnReadOnly");
//var _btnUnReadOnly = new ButtonService("btnUnReadOnly");
//var _btnCheckValidate = new ButtonService("btnCheckValidate");
//var _btnLuuThongTinNguoiDung = new ButtonService("btnLuuThongTinNguoiDung");


$(document).ready(function () {
    // 
    _service.pageload().then(res => {
        objDanhMuc = res;
        console.log(res);
        _frmLuuThongTinDoiTac.getControl("ma_doi_tac").setDataSource(objDanhMuc.data_info.doi_tac, "ten_tat", "ma");
        _frmLuuThongTinDoiTac.getControl("ma_doi_tac").addEventChange(val => {
            var arrChiNhanh = objDanhMuc.data_info.dtac_chi_nhanh.where(n => n.ma_doi_tac === val);
            _frmLuuThongTinDoiTac.getControl("ma_chi_nhanh").setDataSource(arrChiNhanh, "ten", "ma");
            _frmLuuThongTinDoiTac.getControl("ma_chi_nhanh").setValue("");
        });
        _frmLuuThongTinDoiTac.getControl("ma_chi_nhanh").addEventChange(val => {
            var ma_dtac = val.split('/')[0];
            var ma_cnhanh = val.split('/')[1];
            var arrPhong = objDanhMuc.data_info.phong.where(n => n.ma_doi_tac === ma_dtac && n.ma_chi_nhanh === ma_cnhanh);
            _frmLuuThongTinDoiTac.getControl("phong").setDataSource(arrPhong, "ten", "ma");
            _frmLuuThongTinDoiTac.getControl("phong").setValue("");
        });
    });

    // 
    _submitForm.click(function () {
        console.log(_frm.getJsonData());
    });

    // 
    _modalNhapDoiTac.hide();

    //_btnSetDefaulValueForm.click(function () {
    //    _frm.setData(objDefault);
    //});

    //_btnCheckValidate.click(function () {
    //    _frm.isValid();
    //});

    // 
    _btnNhapThongTinDoiTac.click(function () {
        var objDefault = {
            ma: "ma",
            ten: "ten",
            ten_e: "ten_e",
            ten_gon: "ten_gon",
            dchi: "dchi",
            ma_thue: "ma_thue",
            nhang: "nhang",
            kvuc: "kvuc",
            d_thoai: "d_thoai",
            email: "email",
            so_tk: "so_tk",
            ngan_hang: "ngan_hang"
        };
        _frmLuuThongTinDoiTac.clearErrorMessage();
        _frmLuuThongTinDoiTac.setData(objDefault);
        _modalNhapDoiTac.show();
    });
    //_btnLuuThongTinNguoiDung.click(function () {
    //    if (_frmLuuThongTinDoiTac.isValid()) {
    //        alert("Vượt qua Validate");
    //    }
    //});
});


