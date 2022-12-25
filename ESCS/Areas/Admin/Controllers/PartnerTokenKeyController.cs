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
using System.ComponentModel;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class PartnerTokenKeyController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> getPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_TOKEN_KEY_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_TOKEN_KEY_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_TOKEN_KEY_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_TOKEN_KEY_XOA, json);
            return Ok(data);
        }
    }
}
