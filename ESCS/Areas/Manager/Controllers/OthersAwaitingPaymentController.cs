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
    /// Chờ thanh toán con người
    /// </summary>
    [Area("Manager")]
    [SystemAuthen]
    public class OthersAwaitingPaymentController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public OthersAwaitingPaymentController(IWebHostEnvironment env)
        {
            _env = env;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Màn hình hồ sơ chờ thanh toán
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Liệt kê + phân trang
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BOI_THUONG_KHAC_CHO_DONG_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem chi tiết hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BOI_THUONG_KHAC_CHO_DONG_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Đóng hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> dongHoSoBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_DONG_HS, json); 
            return Ok(data);
        }
        /// <summary>
        /// Mở hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDongHoSoBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_HUY_DONG_HS, json); 
            return Ok(data);
        }
        /// <summary>
        /// Import danh sách hồ sơ chờ đóng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> importHSChoDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_THANH_TOAN_TON_DONG_NHIEU_HS, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CHUNG_TU_NH, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_CHUNG_TU_XOA, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_THU_HUONG_NH, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GD_HS_THU_HUONG_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách file
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_XEM_DANH_SACH, json, "/api/esmartclaim/get-paging-file");
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
    }
}
