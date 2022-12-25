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
using ESCS.MODEL.ESCS.ModelView;
using ESCS.MODEL.ESCS.OutValues;

namespace ESCS.Areas.Report.Controllers
{
    [Area("Report")]
    public class ReportPartnerController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ tính toán bồi thường
        /// </summary>
        /// <returns></returns>
        //[AjaxOnly]
        //public async Task<IActionResult> GetPaging()
        //{
        //    var json = Request.GetDataRequestNew(GetUser());
        //    var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_LKE, json);
        //    return Ok(data);
        //}
    }
}
