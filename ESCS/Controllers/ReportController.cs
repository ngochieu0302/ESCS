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

namespace ESCS.Controllers
{
    public class ReportController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpService _httpService;
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        public ReportController(IWebHostEnvironment hostingEnvironment, IHttpService httpService)
        {
            _httpService = httpService;
            _hostingEnvironment = hostingEnvironment;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Trang chủ
        /// </summary>
        /// <returns></returns>
        [SystemAuthen]
        public IActionResult Index()
        {
            return View();
        }
    }
}
