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
using ESCS.COMMON.EscsBill;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Web;
using DeviceDetectorNET;
using DeviceDetectorNET.Cache;
using System.Text;

namespace ESCS.Controllers
{
    public class ClaimOnlineController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpService _httpService;
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        public ClaimOnlineController(IWebHostEnvironment hostingEnvironment, IHttpService httpService)
        {
            _httpService = httpService;
            _hostingEnvironment = hostingEnvironment;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        public IActionResult BoSungHoSo(string ma)
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

            if (string.IsNullOrEmpty(ma))
                return View("Tên view notfound");
            return View(new bh_bt_ho_so_giay_to_link(ma));
        }
        public IActionResult ChupAnh(string ma)
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

            if (string.IsNullOrEmpty(ma))
                return NotFound();
            return View(new bh_bt_ho_so_giay_to_link(ma));
        }
        public IActionResult KhaiBaoBTXE()
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
            return View(new bh_bt_ho_so_giay_to_link("7JM7rKojuB1"));
        }

        [AjaxOnly]
        public async Task<IActionResult> LayThongTinHSBS()
        {
            var json = Request.GetDataRequestNewNoneSession();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LINK_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> LayThongTinHoSoTheoShortLink()
        {
            var json = Request.GetDataRequestNewNoneSession();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_LINK_LKE_CT, json);
            return Ok(data);
        }
        public IActionResult TraCuu(string version, [FromQuery] tra_cuu_ho_so hoso)
        {
            hoso.vesion = version;
            hoso.isValid();
            return View(hoso);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy thông tin chi tiết từ short link")]
        [AjaxOnly]
        public async Task<IActionResult> layThongTinKhachHangShortLink()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_NG_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Nhập thông tin khách hàng xác nhận phương án bồi thường con người")]
        [AjaxOnly]
        public async Task<IActionResult> luuXacNhanPhuongAnBoiThuong()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_NG_KHONG_OTP, json);
            return Ok(data);
        }
        public IActionResult KhachHangXacNhan(string ma)
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
            if (string.IsNullOrEmpty(ma))
                return NotFound();

            return View(new bh_bt_kh_xac_nhan_ng(ma));
        }
        [ESCSDescription(ESCSMethod.POST, "Nhập thông tin ý kiến bổ sung hồ sơ của khách hàng")]
        [AjaxOnly]
        public async Task<IActionResult> luuYKienKhachHang()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_Y_KIEN_KH_NH, json, "api/partner/customer-confirm");
            return Ok(data);
        }
        public IActionResult DanhGiaRuiRo()
        {
            var detector = new DeviceDetector(Request.Headers["User-Agent"].ToString());
            detector.SetCache(new DictionaryCache());
            detector.Parse();
            if (detector.IsMobile()){
                var domainName = Request.Scheme + "://" + Request.Host.Value.ToString().ToLower();
                var pathURL = Request.Scheme + "://" + Request.Host.Value.ToString().ToLower() + Request.Path + Request.QueryString;
                Uri uri = new Uri(pathURL);
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
                if (string.IsNullOrEmpty(pathURL))
                    throw new Exception("Không xác định được link chụp ảnh");
                var apikey = HttpUtility.ParseQueryString(uri.Query, Encoding.UTF8).Get("hash");
                if (string.IsNullOrEmpty(apikey))
                    throw new Exception("Không xác định được thông tin token key");
                var decript = Utilities.DecryptByKey(apikey, AppSettings.KeyEryptData);
                if (!string.IsNullOrEmpty(decript))
                {
                    var arr = decript.Split("|");
                    if (arr == null && arr.Count() != 5)
                        throw new Exception("Không xác định được thông tin mã QRCode");
                    var qrcode = new
                    {
                        ma_doi_tac = arr[0],
                        nv = arr[1],
                        so_id = arr[2],
                        loai = arr[3],
                        timelive = arr[4]
                    };
                    long curentDate = Int64.Parse(DateTime.Now.ToString("yyyyMMddHHmmss"));
                    if (curentDate > Int64.Parse(qrcode.timelive))
                        throw new Exception("Link đánh giá rủi ro hết hiệu lực sủ dụng");
                    return View(new bh_hd_xe_gcn_dgrr(qrcode.ma_doi_tac, qrcode.so_id));
                }
                else
                {
                    return PageNotFound();
                }
            }
            else
            {
                return DetectDevice();
            }
        }
        [NoneMenu]
        public IActionResult DetectDevice()
        {
            return View();
        }
        [HttpGet]
        public ViewResult PageNotFound() => View("PageNotFound");

        [ESCSDescription(ESCSMethod.POST, "Lấy thông tin hợp đồng + danh sách xe")]
        [AjaxOnly]
        public async Task<IActionResult> layThongTinHangMucDGRR()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_HANG_MUC_DGRR_CACHE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy thông tin hợp đồng + danh sách xe")]
        [AjaxOnly]
        public async Task<IActionResult> layThongTinHopDong()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Nhập thông tin đánh giá rủi ro")]
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinDanhGiaRuiRo()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_CT_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy danh sách file thumail")]
        [AjaxOnly]
        public async Task<IActionResult> getFileThumnail()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_DGRR_THUMNAIL, json, "/api/esmartclaim/get-file-thumnail");
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy thông tin chi tiết đánh giá rủi ro")]
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDanhGiaRuiRo()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_CT_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetFiles()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, "/api/esmartclaim/get-file");
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachVideo()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_VIDEO_LKE, json, "/api/carclaim/get-list-video");
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xemVideoHs()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew<bh_file_video>(StoredProcedure.PBH_FILE_VIDEO_LKE_CT, json);
            if (data != null && data.data_info != null && data.data_info.bt != null && data.data_info.bt != 0)
            {
                var hashVideo = HttpUtility.UrlEncode(Utilities.EncryptByKey(data.data_info.bt.ToString(), AppSettings.KeyEryptData));
                data.data_info.duong_dan = "/carclaim/carclaimcommon/video?hashVideo=" + hashVideo;
            }
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDanhGiaChiTiet()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HANG_MUC_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinDanhGiaChiTiet()
        {
            var json = Request.GetDataRequestNoneLogin();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HANG_MUC_NH, json);
            return Ok(data);
        }
    }
}
