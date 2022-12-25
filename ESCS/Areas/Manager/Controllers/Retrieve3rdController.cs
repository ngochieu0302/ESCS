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
    public class Retrieve3rdController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Nhập thông tin thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_PS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_PS_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm + phân trang liệt kê danh sách thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_PS_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liêt kê chi tiết danh sách thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_PS_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListTon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_LKE_TON, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết danh sách thu đòi người thứ 3 phát sinh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetDetailTon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Tìm kiếm danh sách người cần thu đòi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPagingTNBA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_LKE_PT, json);
            return Ok(data);
        }
    }
}
