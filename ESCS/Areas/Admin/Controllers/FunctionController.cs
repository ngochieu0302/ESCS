using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class FunctionController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDataBySearch()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_QUYEN_TKIEM, json);
            return Ok(data);
        }
    }
}
