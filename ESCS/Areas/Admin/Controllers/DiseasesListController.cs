using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ESCS.Models;
using System.Xml;
using System.IO;
using System.Xml.Serialization;
using System.Security.Cryptography.X509Certificates;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using ESCS.Common;
using ESCS.COMMON.Response;

namespace ESCS.Areas.admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class DiseaseslistController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public DiseaseslistController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Danh sách bệnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BENH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết bệnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BENH_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_IMPORT_EXCEL, json);
            return Ok(data);
        }
    }
}