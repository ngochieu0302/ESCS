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
using ESCS.COMMON.Http;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class UserInformationController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        public UserInformationController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GetUserInformation()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PKH_NSD_CT, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> UpdateUserInformation(nguoi_su_dung model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif" };
            if (model.file_anh_dai_dien != null && model.file_anh_dai_dien.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh_dai_dien.FileName);
                if (!arr_ext.Contains(ext))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.anh_dai_dien) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.anh_dai_dien)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.anh_dai_dien));
                }
                model.anh_dai_dien = @"images/users/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.anh_dai_dien), FileMode.Create))
                {
                    await model.file_anh_dai_dien.CopyToAsync(fileStream);
                }
            }
            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;
            var baseResponse = await Request.GetRespone<escs_authen>(StoredProcedure.PKH_NSD_UPDATE, model);
            if (baseResponse.state_info.status == ResponseStatus.OK && baseResponse.data_info.nguoi_dung != null)
            {
                baseResponse.data_info.nguoi_dung.pas = model.pas;
                EscsUtils.SaveUserMenu(baseResponse.data_info.nguoi_dung.ma_doi_tac + "/" + model.nsd, baseResponse.data_info.menu);

                baseResponse.data_info.nguoi_dung.time_live = Int64.Parse(DateTime.Now.AddMinutes((double)HttpConfiguration.SessionTimeOut).ToString("yyyyMMddHHmmss"));
                var token = Utilities.EncryptByKey(JsonConvert.SerializeObject(baseResponse.data_info.nguoi_dung), AppSettings.KeyEryptData);
                HttpContext.Response.Cookies.Delete(ESCSConstants.ESCS_TOKEN);
                HttpContext.Response.Cookies.Append(ESCSConstants.ESCS_TOKEN, token, new CookieOptions() { Expires = DateTime.Now.AddMinutes(HttpConfiguration.SessionTimeOut + 10) });
            }
            return Ok(baseResponse);
        }
    }
}
