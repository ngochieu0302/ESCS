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

namespace ESCS.Areas.MotorcycleClaim.Controllers
{
    /// <summary>
    /// Danh mục tra cứu giá
    /// </summary>
    [Area("Moto")]
    [SystemAuthen]
    public class MotoAveragePriceController : BaseController
    {
        /// <summary>
        /// Danh mục tra cứu giá
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Lấy toàn bộ thông tin tra cứu
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_TRA_CUU_GIA_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm + phân trang tra cứu giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_TRA_CUU_GIA_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chi tiết tra cứu giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_TRA_CUU_GIA_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListContract()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GIA_HO_SO_LKE, json);
            return Ok(data);
        }
    }
}