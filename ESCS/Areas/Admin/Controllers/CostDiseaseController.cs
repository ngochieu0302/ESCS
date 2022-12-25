using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Admin.Controllers
{
    //Mã bệnh chi phí
    [Area("Admin")]
    [SystemAuthen]
    public class CostDiseaseController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [ESCSLog]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_CHI_PHI_NHAP, json);
            return Ok(data);
        }
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_CHI_PHI_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_CHI_PHI_LKE_CT, json);
            return Ok(data);
        }
    }
}
