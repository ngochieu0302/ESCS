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
    /// Phê duyệt
    /// </summary>
    [Area("Manager")]
    [SystemAuthen]
    public class AwaitingPaymentController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public AwaitingPaymentController(IWebHostEnvironment env)
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_TON_LKE, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DONG_HS, json, "/api/esmartclaim/close-claim");
            return Ok(data);
        }
        /// <summary>
        /// Chuyển lại hồ sơ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_HUY_CHUYEN_THANH_TOAN_TT, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_HUY_DONG_HS, json, "/api/esmartclaim/un-close-claim");
            return Ok(data);
        }
        /// <summary>
        /// Lấy lại thông tin số tiền thuế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layTienBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_SO_TIEN_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật lại thông tin tiền thuế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThue()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_SO_TIEN_THUE_NH, json, "/api/esmartclaim/update-vat");
            return Ok(data);
        }
    }
}
