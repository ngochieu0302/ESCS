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
    public class ConfigurationTNDSController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_PHAN_TRAM_THUONG_TAT_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_PHAN_TRAM_THUONG_TAT_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_PHAN_TRAM_THUONG_TAT_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_PHAN_TRAM_THUONG_TAT_IMPORT, json);
            return Ok(data);
        }
    }
}
