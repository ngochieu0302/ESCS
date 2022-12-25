using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Web;
using ESCS.COMMON.Http;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Contants;
using Newtonsoft.Json;
using ESCS.Common;

namespace ESCS.Controllers
{
    public class ConfirmController : BaseController
    {
        public async Task<IActionResult> Index()
        {
            var domainName = Request.Scheme + "://" + Request.Host.Value.ToString().ToLower();
            if (domainName.Contains("localhost") || domainName.Contains(AppSettings.AppDomain))
                domainName = AppSettings.AppDomainLive;
            if (EscsUtils.cai_dat == null || EscsUtils.cai_dat.Count() <= 0 || EscsUtils.cai_dat.Where(n => n.domain == domainName).Count() <= 0)
            {

                var baseResponse = Request.GetRespone<ht_cai_dat>(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_LKE, new { domain = domainName }).Result;
                if (baseResponse.data_info != null && baseResponse.data_info.doi_tac != null && !string.IsNullOrEmpty(baseResponse.data_info.doi_tac.ma))
                {
                    baseResponse.data_info.domain = domainName;
                    EscsUtils.cai_dat.Add(baseResponse.data_info);
                }
            }
            return View();
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy thông tin chi tiết từ short link")]
        [AjaxOnly]
        public async Task<IActionResult> getInfoFromShortLink()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lưu thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> SaveInformation()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Cập nhật thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> UpdateInformation()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_CAP_NHAT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đánh giá")]
        [AjaxOnly]
        public async Task<IActionResult> getListRate()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_DANH_GIA_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lưu xác nhận khách hàng qua OTP")]
        [AjaxOnly]
        public async Task<IActionResult> luuXacNhanKhachHangOTP()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_OTP, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lưu xác nhận khách hàng không qua OTP")]
        [AjaxOnly]
        public async Task<IActionResult> luuXacNhanKhachHangKhongOTP()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_KHONG_OTP, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Gửi OTP cho khách hàng xác nhận")]
        [AjaxOnly]
        public async Task<IActionResult> guiOTPXacNhan()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_GUI_OTP, json);
            return Ok(data);
        }
    }
}