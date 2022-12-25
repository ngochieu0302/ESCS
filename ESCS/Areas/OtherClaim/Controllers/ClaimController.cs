using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using RazorEngine.Templating;
using Newtonsoft.Json;
using ESCS.COMMON.Http;
using RazorEngine.Configuration;
using ESCS.Common;
using System.Drawing;
using ESCS.COMMON.OCR;
using ESCS.COMMON.EscsBill;

namespace ESCS.Areas.OtherClaim.Controllers
{
    [Area("OtherClaim")]
    public class ClaimController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ tính toán bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_HS_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm  đối tượng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> timKiemDoiTuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_HS_TIM_NDBH, json);
            return Ok(data);
        }
        /// <summary>
        /// tạo mới hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinNguoiThongBao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_HS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// lấy danh sách hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsDanhMucChung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_MA_DANH_MUC_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// lấy thông tin chi tiết hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_HS_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// lấy lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> danhSachQuaTrinhXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KHAC_HS_LKE_CT, json);
            return Ok(data);
        }
    }
}
