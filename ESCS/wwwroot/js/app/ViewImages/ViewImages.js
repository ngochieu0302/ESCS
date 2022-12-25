var _service = new Service();
var _viewImagesService = new ViewImagesService();
var _modalXemHinhAnhHangMucChiTiet = new ModalFullScreenService("modalXemHinhAnhHangMucChiTiet", "");

var trang = 1;
var trang_max = 1;

function getPagingXemToanBoAnhHoSo(so_id, nv, hang_muc, loai, trang, callback = undefined) {
    var data = {
        so_id: so_id,
        nv: nv,
        hang_muc: hang_muc,
        loai: loai,
        trang: trang,
        so_dong: 6
    }
    _viewImagesService.layDanhSachAnh(data).then(res => {
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
            ESUtil.appendHTML("dsToanBoAnhHoSoBoiThuongTemplate", "dsToanBoAnhHoSoBoiThuong", { danh_sach: source }, () => {
                if (callback) {
                    callback();
                }
            });
        }
    });
}
function initImageViewerToanBoAnh() {
    var Viewer = window.Viewer;
    var pictures = document.querySelector('.modalXemToanBoThongTinHoSoDSAnhXe');
    var options = {
        inline: true,
        url: 'data-original',
        backdrop: true,
        className: 'modalXemHinhAnhChiTietView',
        id: 'modalXemHinhAnhChiTietView',
        event_item: "click",
        tooltip: true,
        title: false,
        navbar: false
    };
    var viewer = new Viewer(pictures, options);
}
function xemChiTietHinhAnhHoSoBoiThuong(el) {
    _modalXemHinhAnhHangMucChiTiet.show();
}
function getDocHeight() {
    var D = document;
    return Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight
    );
}
$(document).ready(function () {
    var data = $("#thong_tin_ho_so").val();
    var so_id = data.split("/")[0];
    var nv = data.split("/")[1];
    var hang_muc = data.split("/")[2].split(',');
    var loai = data.split("/")[3];
    getPagingXemToanBoAnhHoSo(so_id, nv, hang_muc, loai, 1, () => { initImageViewerToanBoAnh() });

    window.addEventListener('scroll', () => {
        if (Math.round(window.pageYOffset + window.innerHeight) >= getDocHeight()) {
            trang++;
            if (trang > trang_max) {
                return;
            }
            getPagingXemToanBoAnhHoSo(so_id, nv, hang_muc, loai, trang, () => { initImageViewerToanBoAnh()});
        }
    });
});