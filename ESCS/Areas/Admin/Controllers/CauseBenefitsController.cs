using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class CauseBenefitsController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CAU_HINH_LKE, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinCauHinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CAU_HINH_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CAU_HINH_CACHE, json);
            return Ok(data);
        }
    }
}
