using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Http;
using Newtonsoft.Json;
using RazorEngine.Templating;
using RazorEngine.Configuration;
using ESCS.MODEL.ESCS.OutValues;
using ESCS.COMMON.Response;
using ESCS.Common;

namespace ESCS.Areas.Manager.Controllers
{
    [Area("Manager")]
    [SystemAuthen]
    public class ApprovedOtherController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public ApprovedOtherController(IWebHostEnvironment env)
        {
            _env = env;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }

        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm")]
        public IActionResult Index()
        {
            return View();
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_KHAC_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin chi tiết")]
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_KHAC_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> PheDuyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var defineInfo = Request.GetDefineInfo();
            BaseResponse<int?, out_value_phe_duyet> data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_PHE_DUYET_KHAC_NH, json);
            //Kiểm tra nếu duyệt chính mới sinh ra file và gửi email
            if (data != null && data.state_info != null && data.out_value != null && data.state_info.status == STATUS_OK && data.out_value.duyet_chinh_out == "1")
            {
                json = json.AddPropertyStringJson("so_id_dt", data.out_value.ma_dt_trinh_out);
                EscsUtils.SignatureFileAndSendEmail(json, defineInfo);
            }
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> HuyDuyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHE_DUYET_KHAC_XOA, json);
            return Ok(data);
        }
    }
}