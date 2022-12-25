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

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class MauinController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAU_IN_ESCS, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save(ht_mau_in_upload model)
        {
            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;
            var defineInfo = Request.GetDefineInfo();
            var arr_ext = new string[] { ".xml"};
            if (model.file != null && model.file.Length > 0)
            {
                var ext = Path.GetExtension(model.file.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");
                model.url_file = Path.Combine(model.ma_doi_tac_nsd,"MAU_IN","PDF", model.file.FileName);

                List<file_uploads> file = new List<file_uploads>();
                using (var ms = new MemoryStream())
                {
                    model.file.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    var fileBase64 = Convert.ToBase64String(fileBytes);
                    file.Add(new file_uploads()
                    {
                        ma_doi_tac = model.ma_doi_tac_nsd,
                        loai = "MAU_IN_PDF",
                        path = model.url_file,
                        file_base64 = fileBase64
                    });
                    var resUpload = await EscsUtils.UploadFileToPath(file, defineInfo);
                    if (resUpload.state_info.status == STATUS_NOTOK)
                    {
                        return Ok(resUpload);
                    }
                }
            }
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAU_IN_NH, JsonConvert.SerializeObject(model));
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAU_IN_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAU_IN_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAU_IN_LKE_CT, json);
            return Ok(data);
        }
    }
}