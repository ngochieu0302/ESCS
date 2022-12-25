using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Manager.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class TitleController : BaseController
    {        
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CHUC_DANH_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getPaging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PHT_MA_CHUC_DANH_LKE, (object)rq);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CHUC_DANH_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CHUC_DANH_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PHT_MA_CHUC_DANH_LKE_CT, (object)rq);
            return Ok(data);
        }
    }
}
