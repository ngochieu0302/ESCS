using ESCS.Attributes;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;

namespace ESCS.Areas.Manager.Controllers
{
    [Area("Manager")]
    [SystemAuthen]
    public class PaymentController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public PaymentController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Danh sách thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách thanh toán tồn
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSTon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_LKE_TATCA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh mục người sử dụng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDMNguoiSuDung()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PHT_NSD_DMUC, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// Nhập hồ sơ thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapHsThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xoa hồ sơ thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaHsThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết hồ sơ thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layCtThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser()); 
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách tài khoản thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsTaiKhoanChiNhanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_DOI_TAC_CHI_NHANH_TAI_KHOAN_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Xác nhận thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacNhanThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_XAC_NHAN, json, "/api/carclaim/approve_payment");
            return Ok(data);
        }
        /// <summary>
        /// Hủy xác nhận thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyXacNhanThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_HUY_XAC_NHAN, json, "/api/carclaim/unapprove_payment");
            return Ok(data);
        }
        /// <summary>
        /// Import danh sách hồ sơ đề nghị thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> importDsDeNghiThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_IMPORT_EXCEL, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ mapping
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetLisMappingDsHsTon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THANH_TOAN_MAPPING_EXCEL, json);
            return Ok(data);
        }
        /// <summary>
        /// Import danh sách hồ sơ đề nghị thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuDsDeNghiThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_LUU_DE_NGHI_THANH_TOAN, json);
            return Ok(data);
        }
    }
}
