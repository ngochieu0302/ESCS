using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class PartnerDetailController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> list()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_LK, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> listByPartner()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CN_TATCA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deleteConfig()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_CHI_NHANH_CAU_HINH_CT_X, json);
            return Ok(data);
        }
    }
}
