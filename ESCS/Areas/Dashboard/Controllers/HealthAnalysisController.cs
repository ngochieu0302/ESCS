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
    public class HealthAnalysisController : BaseController
    {
        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }
        [SystemAuthen]
        [NoneMenu]
        public IActionResult Analysis1()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult Analysis2()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult Analysis3()
        {
            return View();
        }
        /// <summary>
        /// Lấy dashoard theo địa bàn con người
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietDashboardDB()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_DASHBOARD_1, json);
            return Ok(data);
        }
    }
}