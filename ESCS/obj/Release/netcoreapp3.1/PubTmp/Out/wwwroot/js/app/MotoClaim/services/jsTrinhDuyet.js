function TrinhDuyetService() {
    var _service = new Service();
    this.base = new Service();

    // anhld // 
    // lưu trình duyệt
    this.luuTrinhDuyet = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/luutrinhduyet", obj);
    }

    // xóa trình duyệt
    this.xoaTrinhDuyet = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/xoatrinhduyet", obj);
    }

    // liệt kê lịch sử trình duyệt
    this.lietKeTrinhDuyet = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/lietketrinhduyet", obj);
    }

    // lấy danh sách người duyệt 
    this.layDanhSachNguoiDuyet = function (obj) {
        return _service.postData("/motoclaim/motoinvestigation/laydanhsachnguoiduyet", obj);
    }
}

var _frmModalTrinhDuyet = new FormService("frmModalTrinhDuyet");
var _btnLuuTrinhDuyet = new ButtonService("btnLuuTrinhDuyet");
var _btnHuyTrinhDuyet = new ButtonService("btnHuyTrinhDuyet");
var _btnTrinhDuyetLichSu = new ButtonService("btnTrinhDuyetLichSu");

// lưu mới
function luuTrinhDuyet(json, callback = undefined) {
    _service_trinh_duyet.luuTrinhDuyet(json).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        loadLichSuTrinhDuyet(json, json.id_template, json.id_grid);
        _notifyService.success("Trình duyệt thành công !");
        _frmModalTrinhDuyet.resetForm();
        if (callback) {
            callback(res);
        }
        // ghép sự kiện gửi email
    });
}

// nút xóa - tuy nhiên dùng xóa nhúng vào lưới 
function xoaTrinhDuyet(callback = undefined) {
    $(".xoaBaoGia").click(function () {
        _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa trình duyệt này không ?", "", val => {
            var json = _frmModalTrinhDuyet.getJsonData();
            json.ma_doi_tac = $(this).data("ma_doi_tac");
            json.so_id = $(this).data("so_id");
            json.bt = $(this).data("bt");
            _service_trinh_duyet.xoaTrinhDuyet(json).then(res => {
                if (res.state_info.status !== "OK") {
                    _notifyService.error(res.state_info.message_body);
                    return;
                }
                loadLichSuTrinhDuyet(json, "gridTrinhDuyet_template", "gridTrinhDuyet");
                _notifyService.success("Xóa trình duyệt thành công !");
                if (callback) {
                    callback(res);
                }
            });
        });
    });
}

// liệt kê lịch sử trình duyệt
function loadLichSuTrinhDuyet(obj, id_template, id_gird, callback = undefined) {
    _service_trinh_duyet.lietKeTrinhDuyet(obj).then(res => {
        if (res.state_info.status !== "OK") {
            _notifyService.error(res.state_info.message_body);
            return;
        }
        console.log(res);
        if (res.state_info.status == "OK") {
            ESUtil.genHTML(id_template, id_gird, res);
            //$(".xoaTrinhDuyet").click(function () {
            //    _notifyService.confirmDelete("Bạn có chắc chắn muốn xóa trình duyệt này không ?", "", val => {
            //        var json = $(this).closest("tr").find("[name='objTrinh']").val();
            //        json = JSON.parse(json);
            //        _service_trinh_duyet.xoaTrinhDuyet(json).then(res => {
            //            if (res.state_info.status !== "OK") {
            //                _notifyService.error(res.state_info.message_body);
            //                return;
            //            }
            //            loadLichSuTrinhDuyet(obj, id_template, id_gird);
            //            if (callback) {
            //                callback(res);
            //            }
            //            _notifyService.success("Xóa trình duyệt thành công.");
            //        });
            //    });
            //});
            return;
        } else {
            e.preventDefault();
        }
    });
}
