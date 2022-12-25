using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Http;
using Newtonsoft.Json;
using RazorEngine.Templating;
using RazorEngine.Configuration;
using ESCS.Common;
using ESCS.COMMON.Response;
using ESCS.MODEL.ESCS.OutValues;
using ESCS.MODEL.ESCS.ModelView;

namespace ESCS.Areas.Manager.Controllers
{
    /// <summary>
    /// Chi phí giám định
    /// </summary>
    [Area("Manager")]
    [SystemAuthen]
    public class ExpertationcostController : BaseController
    {
        [ESCSDescription(ESCSMethod.GET, "Trang chủ")]
        public IActionResult Index()
        {
            return View();
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin chi tiết hồ sơ giám định")]
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_LKE_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> layDsHoSoBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_BT_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> luuChiPhiGiamDinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin hóa đơn chứng từ chi phí giám định")]
        [AjaxOnly]
        public async Task<IActionResult> nhapChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CHUNG_TU_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin người thụ hưởng")]
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinNguoiThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_THU_HUONG_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đơn vị giám định")]
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachDonViGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CTY_GIAM_DINH_CACHE, json);
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
        /// Chuyển thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CHUYEN_TT, json);
            return Ok(data);
        }
        /// <summary>
        /// Gỡ chuyển thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goChuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CHUYEN_TT_XOA, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_PHAN_HANG_MUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChiTietHoSoBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_BT_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu chi phí giám định chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuChiPhiGDChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa chi phí giám định chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaChiPhiGDChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CT_X, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu chi phí thực tế chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuTienThucTe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CT_TIEN_THUC_TE_NH, json);
            return Ok(data);
        }
    }
}
