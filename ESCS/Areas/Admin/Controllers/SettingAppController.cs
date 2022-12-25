using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.Common;
using ESCS.COMMON.Common;
using ESCS.COMMON.Contants;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.COMMON.Response;
using ESCS.Controllers;
using ESCS.MODEL.ESCS;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Nancy.Json;
using Newtonsoft.Json;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class SettingAppController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        public SettingAppController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAI_DAT_UNG_DUNG_LKE, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> AddSettingApp(ht_cai_dat_ung_dung model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".svg" };
            if (model.file_anh != null && model.file_anh.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh.FileName);
                if (!arr_ext.Contains(ext))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.url_anh) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.url_anh)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.url_anh));
                }
                model.url_anh = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.url_anh), FileMode.Create))
                {
                    await model.file_anh.CopyToAsync(fileStream);
                }
            }

            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;

            var json = new JavaScriptSerializer().Serialize(model);
            var data = await Request.GetResponeNew(StoredProcedure.PHT_THEM_CAI_DAT_UNG_DUNG, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> UpdateSettingApp(ht_cai_dat_ung_dung model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".svg" };
            if (model.file_anh != null && model.file_anh.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh.FileName);
                if (!arr_ext.Contains(ext))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.url_anh) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.url_anh)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.url_anh));
                }
                model.url_anh = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.url_anh), FileMode.Create))
                {
                    await model.file_anh.CopyToAsync(fileStream);
                }
            }

            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;

            var json = new JavaScriptSerializer().Serialize(model);
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAP_NHAT_CAI_DAT_UNG_DUNG, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> DeleteSettingApp()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_XOA_CAI_DAT_UNG_DUNG, json);
            return Ok(data);
        }
    }
}
