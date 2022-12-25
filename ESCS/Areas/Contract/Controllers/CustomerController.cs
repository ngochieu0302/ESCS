using ESCS.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    [SystemAuthen]
    [ESCSDescription(ESCSMethod.GET, "Quản lý khách hàng")]
    public class CustomerController : BaseController
    {
        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm")]
        public IActionResult Index()
        {
            return View();
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NHAP, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin chi tiết")]
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE_CT, json);
            return Ok(data);
        }
    }
}
