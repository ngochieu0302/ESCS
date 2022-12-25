function UserManagementService() {
    var _service = new Service();
    //Lấy danh sách cán bộ
    this.layDsNSD = function (obj) {
        return _service.postData("/admin/usermanagement/getall", obj);
    };
    //Lấy danh sách quyền cán bộ
    this.layDsCanBoQuyen = function (obj) {
        return _service.postData("/admin/usermanagement/getallcanbo", obj);
    };
    //Lấy danh sách quyền nsd
    this.layDsQuyenNSD = function (obj) {
        return _service.postData("/admin/usermanagement/getallrole", obj);
    };
    //Lưu thông tin người sử dụng
    this.luuThongTinNSD = function (obj) {
        return _service.postData("/admin/usermanagement/save", obj);
    };
    //Tìm kiếm + phân trang người sử dụng
    this.timKiemPTrang = function (obj) {
        return _service.postData("/admin/usermanagement/getpaging", obj);
    };
    //Lấy thông tin chi tiết người sử dụng
    this.layThongTinChiTiet = function (obj) {
        return _service.postData("/admin/usermanagement/getdetail", obj);
    };
    //Lấy thông tin danh sách địa bàn đã phân của người sử dụng
    this.layDsDiaBanNSD = function (obj) {
        return _service.postData("/admin/usermanagement/getlocalityinspection", obj);
    };
    //Lưu thông tin phân chia địa bàn
    this.luuThongTinDiaBanNSD = function (obj) {
        return _service.postData("/admin/usermanagement/savelocalityinspection", obj);
    };
    //Lưu phân cấp giám định bồi thường
    this.luuPhanCap = function (obj) {
        return _service.postData("/admin/usermanagement/savedecentralization", obj);
    };
    //Lưu nhóm phân cấp giám định bồi thường
    this.luuPhanCapNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/luuPhanCapNhomPC", obj);
    };
    //Lấy phân cấp giám định bồi thường 
    this.layPhanCap = function (obj) {
        return _service.postData("/admin/usermanagement/getdecentralization", obj);
    };
    //Lấy phân cấp giám định bồi thường 
    this.layPhanCapNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/layPhanCapNhomPC", obj);
    };
    //Khóa tài khoản
    this.khoaTaiKhoan = function (obj) {
        return _service.postData("/admin/usermanagement/khoaTaiKhoan", obj);
    };
    //Mở khóa tài khoản
    this.moKhoaTaiKhoan = function (obj) {
        return _service.postData("/admin/usermanagement/moKhoaTaiKhoan", obj);
    };
    //Mở khóa tài khoản
    this.xoaTaiKhoan = function (obj) {
        return _service.postData("/admin/usermanagement/xoaTaiKhoan", obj);
    };
    //Lấy danh sách ngày
    this.layDSNgay = function (obj) {
        return _service.postData("/admin/usermanagement/layDSNgay", obj);
    };
    //Lấy danh sách ngày nhóm phân cấp
    this.layDSNgayNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/layDSNgayNhomPC", obj);
    };
    //Thêm ngày phân cấp mới
    this.luuPhanCapNgay = function (obj) {
        return _service.postData("/admin/usermanagement/luuPhanCapNgay", obj);
    };
    //Thêm ngày phân cấp mới nhóm phân cấp
    this.luuPhanCapNgayNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/luuPhanCapNgayNhomPC", obj);
    };
    //Lấy chi tiết ngày phân cấp
    this.getDetailPhanCapNgay = function (obj) {
        return _service.postData("/admin/usermanagement/getDetailPhanCapNgay", obj);
    };
    //Lấy chi tiết ngày phân cấp nhóm phân cấp
    this.getDetailPhanCapNgayNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/getDetailPhanCapNgayNhomPC", obj);
    };
    //Lấy chi tiết ngày phân cấp
    this.deletePhanCapNgay = function (obj) {
        return _service.postData("/admin/usermanagement/deletePhanCapNgay", obj);
    };
    //Sao chép phân cấp
    this.copyPhanCapNgay = function (obj) {
        return _service.postData("/admin/usermanagement/copyPhanCapNgay", obj);
    };
    // Lưu thông tin phân cấp chung
    this.luuThongTinPhanCapChung = function (obj) {
        return _service.postData("/admin/usermanagement/luuPhanCapChung", obj);
    };
    // Lưu thông tin phân cấp chung
    this.luuThongTinPhanCapChungNhomPC = function (obj) {
        return _service.postData("/admin/usermanagement/luuThongTinPhanCapChungNhomPC", obj);
    };
    // Liệt kê phân cấp chung
    this.layThongTinPhanCapChung = function (obj) {
        return _service.postData("/admin/usermanagement/phanCapChung", obj);
    };
    // Lấy nhóm quyền và nhóm quyền chi tiết
    this.layNhomQuyen = function () {
        return _service.postData("/admin/usermanagement/layNhomQuyen", {});
    };
    // Lưu nhóm quyền cấu hình
    this.luuNhomQuyenCauHinh = function (obj) {
        return _service.postData("/admin/usermanagement/luuNhomQuyenCauHinh", obj);
    };
    // Lấy nhóm phân cấp chi tiết
    this.layNhomPhanCap = function (obj) {
        return _service.postData("/admin/usermanagement/layNhomPhanCap", obj);
    };
    // Xóa nhóm quyền
    this.xoaNhomQuyen = function (obj) {
        return _service.postData("/admin/usermanagement/xoaNhomQuyen", obj);
    };
}