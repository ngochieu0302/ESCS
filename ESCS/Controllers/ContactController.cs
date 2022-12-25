using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.COMMON.Auth;
using ESCS.COMMON.Common;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Http;
using ESCS.COMMON.Contants;
using Newtonsoft.Json;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.Response;
using ESCS.Common;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ESCS.COMMON.Http;
using System.Net;
using ESCS.COMMON.Request;
using Newtonsoft.Json.Linq;
using System.Drawing;
using System.Drawing.Text;
using System.Drawing.Drawing2D;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using ESCS.Models;
using ESCS.MODEL.ESCS;
using ESCS.MODEL.ESCS.OutValues;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class ContactController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpService _httpService;
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        public ContactController(IWebHostEnvironment hostingEnvironment, IHttpService httpService)
        {
            _httpService = httpService;
            _hostingEnvironment = hostingEnvironment;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Trang danh sách tiếp nhận thông tin sơ bồi thường
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Danh sách hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_TIEP_NHAN_LKE, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// nhập hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveHsTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser()); 
             var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_NH, json, "api/carclaim/receive");
            return Ok(data);
        }
        /// <summary>
        /// lấy chi tiết hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetHsTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Kiểm tra số vụ tổn thất xảy ra trong cùng 1 ngày
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ktraVuTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_VU_TT_KTRA, json);
            return Ok(data);
        }
        /// <summary>
        /// nhập vụ tổn thất tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> saveTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_VU_TT_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xoaVuTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_VU_TT_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> listLanTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_LH_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuLanTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_LH_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_CHUYEN, json, "api/carclaim/assessment/tranfer");
            return Ok(data);
        }
        /// <summary>
        /// Update khách hàng VIP
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> updateKHVIP()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_KH_VIP, json);
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật thông tin giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThongTinGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_GIAM_DINH_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyHoSoTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Gỡ hủy hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSoTiepNhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEP_NHAN_GO_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách giám định viên
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeDanhSachGDVHT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_GDVHT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> timKiemGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_TKIEM, json);
            return Ok(data);
        }
    }
}
