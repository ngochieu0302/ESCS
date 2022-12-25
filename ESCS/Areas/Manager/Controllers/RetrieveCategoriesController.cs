using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Manager.Controllers
{
    [Area("Manager")]
    [SystemAuthen]
    public class RetrieveCategoriesController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Nhập thông tin thu hồi vật tư phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_PS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm + phân trang liệt kê danh sách vật tư thu hồi phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_PS_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liêt kê chi tiết danh sách thanh lý thu hồi vật tư phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly] 
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_PS_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm danh sách vật tư thu hồi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPagingVatTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_PS_XOA, json);
            return Ok(data);
        }
    }
}
