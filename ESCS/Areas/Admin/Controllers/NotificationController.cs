using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class NotificationController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [Area("Admin")]
        [SystemAuthen]
        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveTokenConnection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_KET_NOI_NH, json);
            return Ok(res);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_LKE, json);
            return Ok(data);
        }
    }
}