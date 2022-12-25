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
using ESCS.MODEL.ESCS.OutValues;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class ViewImagesController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpService _httpService;
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        public ViewImagesController(IWebHostEnvironment hostingEnvironment, IHttpService httpService)
        {
            _httpService = httpService;
            _hostingEnvironment = hostingEnvironment;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        public IActionResult Index(string ho_so)
        {
            ViewBag.thong_tin_ho_so = Utilities.DecryptByKey(ho_so, AppSettings.KeyEryptData);
            return View();
        }
        /// <summary>
        /// Lấy danh sách file
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_XEM_DANH_SACH, json, "/api/esmartclaim/get-paging-file");
            return Ok(data);
        }
    }
}
