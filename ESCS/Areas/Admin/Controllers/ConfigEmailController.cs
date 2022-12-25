using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using Newtonsoft.Json;
using System.IO;
using ESCS.COMMON.Common;
using ESCS.Common;
using Newtonsoft.Json.Linq;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class ConfigEmailController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save(ht_email_mau_gui model)
        {
            var user = GetUser();
            string requestData = Utilities.FormCollectionToJson(Request.Form);
            var obj = JObject.Parse(requestData);
            obj["ma_doi_tac_nsd"] = user.ma_doi_tac;
            obj["ma_chi_nhanh_nsd"] = user.ma_chi_nhanh;
            obj["nsd"] = user.nsd;
            obj["pas"] = user.pas;
            var arr = obj["arr"].ToString();
            obj["arr"] = JArray.Parse(arr);
            //model.ma_doi_tac_nsd = user.ma_doi_tac;
            //model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            //model.nsd = user.nsd;
            //model.pas = user.pas;
            if (model.file != null && model.file.Length > 0)
            {
                var defineInfo = Request.GetDefineInfo();
                var arr_ext = new string[] { ".cshtml"};
                var ext = Path.GetExtension(model.file.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");

                model.url = model.ma_doi_tac_nsd + "/TEMPLATE_MAIL/" + model.file.FileName;

                List<file_uploads> file = new List<file_uploads>();
                using (var ms = new MemoryStream())
                {
                    model.file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    var fileBase64 = Convert.ToBase64String(fileBytes);
                    file.Add(new file_uploads()
                    {
                        ma_doi_tac = model.ma_doi_tac_nsd,
                        loai = "TEMPLATE_MAIL",
                        path = model.url,
                        file_base64 = fileBase64
                    });
                    var resUpload = await EscsUtils.UploadFileToPath(file, defineInfo);
                    if (resUpload.state_info.status == STATUS_NOTOK)
                    {
                        return Ok(resUpload);
                    }
                }
            }
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CH_NH, JsonConvert.SerializeObject(obj));
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CH_CT, json);
            return Ok(data);
        }
    }
}