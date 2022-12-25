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

namespace ESCS.Areas.Manager.Controllers
{
    /// <summary>
    /// Phê duyệt
    /// </summary>
    [SystemAuthen]
    public class LeaveController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        public LeaveController(IWebHostEnvironment env)
        {
            _env = env;
        }
        /// <summary>
        /// Màn hình phê duyệt
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Danh sách lịch nghỉ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_LICH_NGHI_LKE, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// Lưu lịch nghỉ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_LICH_NGHI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa lịch nghỉ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_LICH_NGHI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Chi tiết lịch nghỉ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detail()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_LICH_NGHI_LKE_CT, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// Duyệt lịch nghỉ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> approve()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_LICH_NGHI_DUYET, json);
            return Ok(data);
        }
    }
}
