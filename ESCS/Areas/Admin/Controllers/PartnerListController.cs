using ESCS.Attributes;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.COMMON.Http;
using ESCS.Controllers;
using ESCS.MODEL.ESCS;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Nancy.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class PartnerListController : BaseController
    {
        private readonly IWebHostEnvironment _env;
        public PartnerListController(IWebHostEnvironment env)
        {
            _env = env;
        }

        #region Thông tin đối tác
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAllNoneCache()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_TAT_CA, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save(ma_doi_tac model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif" };
            if (model.file_logo != null && model.file_logo.Length > 0)
            {
                var ext = Path.GetExtension(model.file_logo.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.logo) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.logo)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.logo));
                }
                model.logo = @"images/ma_doi_tac/" + Guid.NewGuid().ToString("N") + ext; ;
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_NH, JsonConvert.SerializeObject(model));
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_LKE_CT, json);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_ocr.api_key", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_call.sid", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_call.secret", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_gg.key", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_gg.key_android", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_gg.key_ios", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_ai.api_key", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_bao_gia.api_access", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_bao_gia.partner_code", AppSettings.KeyEryptData);
            data = Utilities.DecryptStrJsonByKey(data, "data_info.dv_bao_gia.secretkey", AppSettings.KeyEryptData);
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ OCR
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            bh_dich_vu_ocr dv = JsonConvert.DeserializeObject<bh_dich_vu_ocr>(json);
            dv.api_key = Utilities.EncryptByKey(dv.api_key, AppSettings.KeyEryptData);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_OCR_NH, JsonConvert.SerializeObject(dv));
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ video call - voice call
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigCall()
        {
            var json = Request.GetDataRequestNew(GetUser());
            bh_dich_vu_call dv = JsonConvert.DeserializeObject<bh_dich_vu_call>(json);
            dv.sid = Utilities.EncryptByKey(dv.sid, AppSettings.KeyEryptData);
            dv.secret = Utilities.EncryptByKey(dv.secret, AppSettings.KeyEryptData);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_CALL_NH, JsonConvert.SerializeObject(dv));
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ google maps
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigMaps()
        {
            var json = Request.GetDataRequestNew(GetUser());
            bh_dich_vu_google dv = JsonConvert.DeserializeObject<bh_dich_vu_google>(json);
            dv.key = Utilities.EncryptByKey(dv.key, AppSettings.KeyEryptData);
            dv.key_android = Utilities.EncryptByKey(dv.key_android, AppSettings.KeyEryptData);
            dv.key_ios = Utilities.EncryptByKey(dv.key_ios, AppSettings.KeyEryptData);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_GOOGLE_NH, JsonConvert.SerializeObject(dv));
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ SMS
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigSMS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_SMS_NH, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ AI
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            bh_dich_vu_ai dv = JsonConvert.DeserializeObject<bh_dich_vu_ai>(json);
            dv.api_key = Utilities.EncryptByKey(dv.api_key, AppSettings.KeyEryptData);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_AI_NH, JsonConvert.SerializeObject(dv));
            return Ok(data);
        }
        #endregion

        #region Cấu hình mẫu in
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigSetting(ht_cai_dat_ung_dung model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".svg" };
            if (model.file_anh != null && model.file_anh.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
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
            model.ma_app = "WEB";
            model.loai = "MAU_IN";

            var json = new JavaScriptSerializer().Serialize(model);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_NH, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình ứng dụng
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigApp(ht_cai_dat_ung_dung model)
        {
            var arr_ext = new string[] { ".jpg", ".jpeg", ".png", ".gif", ".svg" };
            var user = GetUser();
            if (model.file_anh_dang_nhap != null && model.file_anh_dang_nhap.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh_dang_nhap.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.url_anh_dang_nhap) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.url_anh_dang_nhap)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.url_anh_dang_nhap));
                }
                model.url_anh_dang_nhap = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext;
                model.url_anh = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.url_anh), FileMode.Create))
                {
                    await model.file_anh_dang_nhap.CopyToAsync(fileStream);
                }
                model.ma_doi_tac_nsd = user.ma_doi_tac;
                model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
                model.nsd = user.nsd;
                model.pas = user.pas;
                model.ma_app = "WEB";
                model.loai = "LOGO_DANG_NHAP";
                var json = new JavaScriptSerializer().Serialize(model);
                var data = await Request.GetResponeNew(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_NH, json);
            }
            if (model.file_anh_favicon != null && model.file_anh_favicon.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh_favicon.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.url_anh_favicon) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.url_anh_favicon)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.url_anh_favicon));
                }
                model.url_anh_favicon = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                model.url_anh = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.url_anh), FileMode.Create))
                {
                    await model.file_anh_favicon.CopyToAsync(fileStream);
                }
                model.ma_doi_tac_nsd = user.ma_doi_tac;
                model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
                model.nsd = user.nsd;
                model.pas = user.pas;
                model.ma_app = "WEB";
                model.loai = "FAVICON";
                var json = new JavaScriptSerializer().Serialize(model);
                var data = await Request.GetResponeNew(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_NH, json);
            }
            if (model.file_anh_ud != null && model.file_anh_ud.Length > 0)
            {
                var ext = Path.GetExtension(model.file_anh_ud.FileName);
                if (!arr_ext.Contains(ext.ToLower()))
                    throw new Exception("Định dạng file không phù hợp");
                if (!string.IsNullOrEmpty(model.url_anh_ud) && System.IO.File.Exists(Path.Combine(_env.WebRootPath, model.url_anh_ud)))
                {
                    System.IO.File.Delete(Path.Combine(_env.WebRootPath, model.url_anh_ud));
                }
                model.url_anh_ud = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                model.url_anh = @"images/cai_dat/" + Guid.NewGuid().ToString("N") + ext; ;
                using (Stream fileStream = new FileStream(Path.Combine(_env.WebRootPath, model.url_anh), FileMode.Create))
                {
                    await model.file_anh_ud.CopyToAsync(fileStream);
                }
                model.ma_doi_tac_nsd = user.ma_doi_tac;
                model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
                model.nsd = user.nsd;
                model.pas = user.pas;
                model.ma_app = "WEB";
                model.loai = "LOGO_WEB_APP";
                var json = new JavaScriptSerializer().Serialize(model);
                var data = await Request.GetResponeNew(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_NH, json);
            }

            return Ok(model);
        }
        #endregion

        #region Cấu hình xe
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveCauHinhXe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_NH, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình mapping mức độ tổn thất
        [AjaxOnly]
        public async Task<IActionResult> GetAllMucDo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_MUC_DO_TT_AI_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveMucDoAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_MUC_DO_TT_AI_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPagingMucDo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_MUC_DO_TT_AI_LKE, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình dịch vụ báo giá Gara
        [AjaxOnly]
        public async Task<IActionResult> GetAllBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<List<bh_dich_vu_bao_gia>>(StoredProcedure.PBH_DICH_VU_BAO_GIA_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveConfigGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            bh_dich_vu_bao_gia dv = JsonConvert.DeserializeObject<bh_dich_vu_bao_gia>(json);
            dv.api_access = Utilities.EncryptByKey(dv.api_access, AppSettings.KeyEryptData);
            dv.partner_code = Utilities.EncryptByKey(dv.partner_code, AppSettings.KeyEryptData);
            dv.secretkey = Utilities.EncryptByKey(dv.secretkey, AppSettings.KeyEryptData);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_BAO_GIA_NH, JsonConvert.SerializeObject(dv));
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPagingBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_BAO_GIA_LKE, json);
            return Ok(data);
        }
        #endregion
    }
}
