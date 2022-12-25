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
    public class HealthAwaitingPaymentController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public HealthAwaitingPaymentController(IWebHostEnvironment env)
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_THANH_TOAN_TON_LKE, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_DONG_HS, json, "/api/health/close-claim"); 
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_HUY_DONG_HS, json, "/api/health/un-close-claim"); 
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
        /// Cập nhật thông tin OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> soSanhOCRHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_OCR_HOA_DON_SO_SANH, json);
            return Ok(data);

        }
        /// <summary>
        /// Lấy danh sách lần tiếp nhận đóng hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachlanTiepNhanDongHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ chờ đóng con người
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachHoSoChoDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHO_DONG_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ chờ đóng con người
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuLanTiepNhanHoSoChoDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết lần tiếp nhận đóng hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChiTietLanTiepNhanDongHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Đóng lần tiếp nhận đống hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> dongLanTiepNhanDongHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_DONG, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy đóng lần tiếp nhận đống hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDongLanTiepNhanDongHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_HUY_DONG, json);
            return Ok(data);
        }
        /// <summary>
        /// xóa lần tiếp nhận đống hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaLanTiepNhanHoSoChoDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LAN_TIEP_NHAN_DONG_HS_XOA, json);
            return Ok(data);
        }
    }
}
