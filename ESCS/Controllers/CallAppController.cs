using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.VideoCall;
using ESCS.Attributes;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.Common;
using ESCS.COMMON.ExtensionMethods;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.Response;
using System.Data;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class CallAppController : BaseController
    {
        [AjaxOnly]
        public async Task<IActionResult> AuthenCall()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_CALL_ID_LKE_CT, json, "/api/esmartclaim/authen-call");
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> CheckConnection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_CALL_KTRA_DANG_KY, json, "/api/esmartclaim/check-connect-call");
            return Ok(data);
        }
    }
}
