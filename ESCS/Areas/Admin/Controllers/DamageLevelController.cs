using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.ESCSStoredProcedures;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class DamageLevelController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_DMUC, json);
            return Ok(data);
        }
        //[ESCSDescription(ESCSMethod.GET, "Lấy tất cả danh sách")]
        //public async Task<IActionResult> PageLoad()
        //{
        //    var json = Request.GetDataRequestNew(GetUser());
        //    var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_DMUC, json);
        //    return Ok(data);
        //}
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Luu_nhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Xoa_nhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> Liet_ke_trang()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> Liet_ke_chi_tiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_XE_MUC_DO_TT_LKE_CT, json);
            return Json(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<JsonResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_MUC_DO_TT_IMPORT_EXCEL, json);
            return Json(data);
        }
    }
}