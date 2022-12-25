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
using ESCS.Common;
using ESCS.COMMON.Response;
using ESCS.MODEL.ESCS.OutValues;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.COMMON.Contants;
using System.Web;

namespace ESCS.Areas.Manager.Controllers
{
    /// <summary>
    /// Phê duyệt
    /// </summary>
    [Area("Manager")]
    [SystemAuthen]
    public class ApprovedController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public ApprovedController(IWebHostEnvironment env)
        {
            _env = env;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Màn hình phê duyệt
        /// </summary>
        /// <returns></returns>
        public IActionResult Index(string ho_so)
        {
            ViewBag.ho_so = Utilities.DecryptByKey(ho_so, AppSettings.KeyEryptData);
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> Liet_ke_trang()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_TRINH_DUYET_LKE, (object)rq);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> Liet_ke_chi_tiet()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_PHE_DUYET_LKE_CT, (object)rq);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> Dong_y_duyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHE_DUYET_NH, json, "/api/esmartclaim/approve");
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> Huy_dong_y_duyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHE_DUYET_XOA, json, "/api/esmartclaim/unapprove");
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> TuChoiDuyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_PHE_DUYET_TU_CHOI, json);
            //if (data != null && data.state_info != null && data.out_value != null && data.state_info.status == STATUS_OK && data.out_value.duyet_chinh_out == "1")
            //{
            //    var defineInfo = Request.GetDefineInfo();
            //    EscsUtils.RemoveFile(json, defineInfo);
            //    EscsUtils.CreateSaveFile(json, defineInfo);
            //}
            return Ok(data);
        }
        //Màn hình phê duyệt
        public IActionResult TransApprovedDisplay(string ma_doi_tac, string so_id, string nv, string lhnv, string loai, string bt, string ten, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + nv + "/" + lhnv + "/" + loai + "/" + bt + "/" + ten + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình bồi thường
        public IActionResult TransCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình giám định
        public IActionResult TransInvestigationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình bồi thường xe máy
        public IActionResult TransMotoCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình giám định xe máy
        public IActionResult TransMotoInvestigationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
    }
}
