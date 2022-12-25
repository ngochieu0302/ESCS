using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.ESCSStoredProcedures;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class PriceGaraController : BaseController
    {
        public IActionResult Index() 
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachCauHinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_GIA_GARA_CAU_HINH_LKE, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SavePriceGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_NHAP, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deletePriceGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_XOA, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_IMPORT, json);
            return Ok(data);
        }
    }
}