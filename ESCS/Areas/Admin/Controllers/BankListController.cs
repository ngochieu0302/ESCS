﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.ESCSStoredProcedures;
using System.ComponentModel;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class BankListController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NGAN_HANG_DMUC, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NGAN_HANG_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NGAN_HANG_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NGAN_HANG_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NGAN_HANG_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_NGAN_HANG_IMPORT_EXCEL, json);
            return Ok(data);
        }
    }
}