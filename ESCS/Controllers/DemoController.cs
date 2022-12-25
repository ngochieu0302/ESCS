using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ESCS.Models;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.COMMON.Auth;
using ESCS.COMMON.Common;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Http;
using ESCS.COMMON.Contants;
using Newtonsoft.Json;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.Response;
using ESCS.Common;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class DemoController : Controller
    {
        public DemoController()
        {
        }
        public IActionResult Index()
        {
            return View(); 
        }
        [HttpPost]
        public async Task<IActionResult> thanhtest()
        {
            //var data = await Request.GetRespone("NVUTFOWJ83B8NEG");
            escs_nguoi_dung nd = new escs_nguoi_dung();
            nd.ma_doi_tac = "CTYBHABC";
            nd.ma_chi_nhanh = "000";
            nd.nsd = "admin@escs.vn";
            nd.pas = "6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b";


            var json = Request.GetDataRequestNew(nd);
            var data = await Request.GetResponeNew("ABC", json);
            return Json(data);
        }
    }
}
