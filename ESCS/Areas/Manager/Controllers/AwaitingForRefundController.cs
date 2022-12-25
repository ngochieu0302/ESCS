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
    public class AwaitingForRefundController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public AwaitingForRefundController(IWebHostEnvironment env)
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
        /// [AjaxOnly]
        public async Task<IActionResult> getPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê + phân trang
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê + phân trang
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_CT_HOAN_QUY_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ hoàn quỹ tồn
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getListBackLog()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_LKE_TON, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập hồ sơ hoàn quỹ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapHsHoanQuy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết hồ sơ hoàn quỹ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layCtHoanQuy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Xác nhận hồ sơ hoàn quỹ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacNhanHoanQuy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_XAC_NHAN, json);
            return Ok(data);
        }
        /// <summary>
        /// Xác nhận hồ sơ hoàn quỹ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacNhanHoanQuyHuy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_XAC_NHAN_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa đề nghị hoàn quỹ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaHsHoanQuy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HOAN_QUY_XOA, json);
            return Ok(data);
        }
    }
}
