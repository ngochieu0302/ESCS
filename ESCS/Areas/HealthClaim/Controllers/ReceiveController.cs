using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using RazorEngine.Templating;
using Newtonsoft.Json;
using ESCS.COMMON.Http;
using RazorEngine.Configuration;
using ESCS.Common;
using System.Drawing;
using ESCS.COMMON.OCR;
using ESCS.COMMON.EscsBill;
using ESCS.COMMON.Contants;

namespace ESCS.Areas.HealthClaim.Controllers
{
    [Area("HealthClaim")]
    public class ReceiveController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getCommonInfo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LKE_TTC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> insertNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_NH, json, "/api/health/create");
            return Ok(data);
        }
        /// <summary>
        /// Update khách hàng VIP
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> updateKHVIP()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_KH_VIP, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển người xử lý hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenNguoiXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_NGUOI_XLY, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách các lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lstReceives()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LKE_LAN, json);
            return Ok(data);
        }
        /// <summary>
        /// Thông tin chi tiết 1 lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detailReceive()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Thông tin chi tiết 1 ho so
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detailHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ThemHoSoTiepNhanLan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]  
        public async Task<IActionResult> ThemHoSoTiepNhanQuyenLoiLan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_QLOI_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XoaHoSoTiepNhanLan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LayChiTietQLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_QLOI_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XoaHoSoTiepNhanQuyenLoiLan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_QLOI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getListQuyenLoiGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_GOC_XEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết người được bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemChiTietNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_NDBH_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển hồ sơ sang bộ phận tính toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenHoSoSangTinhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_CHUYEN, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách files thumnail
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFilesThumnail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_THUMNAIL, json, "/api/esmartclaim/get-file-thumnail");
            return Ok(data);
        }
        /// <summary>
        /// Lấy file hiển thị
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, "/api/esmartclaim/get-file");
            return Ok(data);
        }
        /// <summary>
        /// Xóa file ảnh trong hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteImageDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLSTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyHoSoTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_HUY_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSoTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_HUY_HS_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getHosoTaiLieu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LAY_DS, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy tất cả chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Nhập thông tin người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinNguoiThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinNguoiThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Phân loại ảnh tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> phanLoaiHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_PHAN_HANG_MUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhận hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhanHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_NHAN_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// Gửi thông báo tới khách hàng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> guiThongBaoYCBSHS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_MCM_GUI_THONG_BAO, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu chi phí chi tiết quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LuuChiPhiChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_QLOI_CHI_PHI_NH, json);
            return Ok(data);
        }
        public IActionResult TransCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
             TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
             return LocalRedirect(url_redirect);
        }
        [AjaxOnly]
        public async Task<IActionResult> ktraHoSoDuyetTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_NG_HO_SO, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách các lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachLanBoSungHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemLanNhanHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem chi tiết lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChiTietlanNhanHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_CT_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luulanNhanHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu lần nhận chi tiết hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luulanNhanChiTietHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xác nhận lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XacNhanlanNhanHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_XAC_NHAN, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa lần nhận hồ sơ gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaLanNhanHoSoGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_BS_HS_GOC_X, json);
            return Ok(data);
        }
        /// <summary>
        /// Kiểm tra lần tiếp nhận có bị trùng bệnh viện không
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> kiemTraTrungLanTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIEP_NHAN_LAN_KIEM_TRA_TRUNG, json);
            return Ok(data);
        }

        /// <summary>
        /// Nhập thông tin phản hồi ý kiến khách hàng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinPhanHoiYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_Y_KIEN_KH_NH, json);
            return Ok(data);
        }
    }
}
