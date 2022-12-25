using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ESCS.Areas.Manager.Controllers
{
    [Area("Manager")]
    [SystemAuthen]
    public class AdvanceCompensationController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Lấy danh sách tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsHSTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_LKE_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm + phân trang ds hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_XE_TAM_UNG_TKIEM, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// Lưu danh sách hồ sơ tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa hồ sơ tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem chi tiết thông tin tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemCtietTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_LKE_CT, json);
            return Ok(data);
        }

    }
}
