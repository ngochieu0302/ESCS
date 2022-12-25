using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.CarClaim.Controllers
{
    [Area("CarClaim")]
    [SystemAuthen]
    public class DesktopOpinionController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm phân trang cho ý kiến desktop
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu cho ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ChoYKienNh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NSD_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê chi tiết xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> YKienCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NSD_CT_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê thông tin chi tiết hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinChiTietHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_LKE_THONG_TIN_HO_SO, json);
            return Ok(data);
        }
    }
}
