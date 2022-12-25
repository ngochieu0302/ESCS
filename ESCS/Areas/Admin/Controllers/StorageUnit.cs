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
    public class StorageUnit : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        //cache
        [AjaxOnly]
        public async Task<IActionResult> GetAllStorageUnit()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHO_DMUC, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHO_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHO_LKE_CT, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHO_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHO_XOA, json);
            return Ok(data);
        }

        
    }
}