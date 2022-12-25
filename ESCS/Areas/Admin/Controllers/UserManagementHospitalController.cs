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
    public class UserManagementHospitalController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var rq = Request.GetDataRequest(GetUser());
            if (rq.mat_khau != null && !string.IsNullOrEmpty(rq.mat_khau.ToString()))
            {
                rq.mat_khau = Utilities.Sha256Hash(rq.mat_khau.ToString());
            }
            else
            {
                rq.mat_khau = "";
            }
            var data = await Request.GetRespone(StoredProcedure.PBH_HT_NSD_BV_NH, (object)rq);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_BV_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_BV_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_BV_XOA, json);
            return Ok(data);
        }
    }
}