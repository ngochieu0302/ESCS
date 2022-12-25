using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    [SystemAuthen]
    public class CarAnalysisController : BaseController
    {
        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }
        [SystemAuthen]
        [NoneMenu]
        public IActionResult IndexDT()
        {
            return View();
        }
        /// <summary>
        /// Lấy tất cả danh mục màn hình tính toán bồi thường xe cơ giới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietDashboard()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_1, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy tất cả danh mục màn hình tính toán bồi thường xe cơ giới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietDashboardDT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_2, json);
            return Ok(data);
        }
    }
}