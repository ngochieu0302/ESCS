using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.COMMON.Auth;
using ESCS.COMMON.Common;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Http;
using ESCS.COMMON.Contants;
using Newtonsoft.Json;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.Response;
using ESCS.Common;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ESCS.COMMON.Http;
using System.Net;
using ESCS.COMMON.Request;
using Newtonsoft.Json.Linq;
using System.Drawing;
using System.Drawing.Text;
using System.Drawing.Drawing2D;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using ESCS.Models;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.EscsBill;
using System.Collections.Generic;
using System.Linq;
using System.Data;

namespace ESCS.Controllers
{
    public class OpinionController : BaseController
    {
        [SystemAuthen]
        public IActionResult Index()
        {
            return View();
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy thông tin từ hash code")]
        [AjaxOnly]
        public async Task<IActionResult> getInfoFromHashCode()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_GET_INFO_HASHCODE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu ý kiến cán bộ")]
        [AjaxOnly]
        public async Task<IActionResult> luuYKienCanBo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NSD_CT_NH, json);
            return Ok(data);
        }
    }
}
