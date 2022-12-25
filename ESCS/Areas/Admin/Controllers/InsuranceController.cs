using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using ESCS.MODEL.ESCS;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class InsuranceController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        public InsuranceController(IWebHostEnvironment env)
        {
            _env = env;
        }
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save(ht_ma_nha_bh model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", "png", ".gif"};
            if (model.file_logo != null && model.file_logo.Length > 0)
            {
                var ext = Path.GetExtension(model.file_logo.FileName);
                if (!arr_ext.Contains(ext))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.logo) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.logo)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.logo));
                }
                model.logo = @"images/nha_bao_hiem/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.logo), FileMode.Create))
                {
                    await model.file_logo.CopyToAsync(fileStream);
                }
            }
            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_NH, JsonConvert.SerializeObject(model));
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_XOA, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_NHA_BH_IMPORT_EXCEL, json);
            return Ok(data);
        }
    }
}
