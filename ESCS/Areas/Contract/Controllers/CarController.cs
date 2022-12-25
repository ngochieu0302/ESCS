using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    [SystemAuthen]
    public class CarController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DM_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xe_timkiem()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xe_dongtai_lke()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_DONG_TAI_BH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> kh_timkiem()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xe_detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> kh_detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_DETAIL, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xe_gcn_lke()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> xe_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> hd_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HD_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> xe_ds_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> xe_dongtai_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_DO_TAI_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> xe_excel_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_EXCEL_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> kh_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> ds_xoa()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_XOA, json);
            return Json(data);
        }
    }
}
