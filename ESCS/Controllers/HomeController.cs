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
using DeviceDetectorNET;
using DeviceDetectorNET.Cache;
using System.Text;
using Oracle.ManagedDataAccess.Client;
using Dapper;
using Microsoft.Extensions.Logging;
using System.Web;

namespace ESCS.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IHttpService _httpService;
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly ILogger<HomeController> _logger;
        public HomeController(IWebHostEnvironment hostingEnvironment, IHttpService httpService, ILogger<HomeController> logger)
        {
            _logger = logger;
            _httpService = httpService;
            _hostingEnvironment = hostingEnvironment;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Trang chủ
        /// </summary>
        /// <returns></returns>
        [SystemAuthen]
        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// IndexH
        /// </summary>
        /// <returns></returns>
        [SystemAuthen]
        [NoneMenu]
        public IActionResult IndexH()
        {
            return View();
        }
        /// <summary>
        /// IndexTTGQ
        /// </summary>
        /// <returns></returns>
        [SystemAuthen]
        [NoneMenu]
        public IActionResult IndexTTGQ()
        {
            return View();
        }
        /// <summary>
        /// Chi tiết dashboard
        /// </summary>
        /// <returns></returns>
        [SystemAuthen]
        [NoneMenu]
        public IActionResult Detail()
        {
            return View();
        }
        public IActionResult GetCheckSum(string merchant_secret, string ma_dvi, string ma_chi_nhanh, long? so_id_hs)
        {
            string chuoi = merchant_secret + ma_dvi + ma_chi_nhanh + (so_id_hs == null ? "" : ((long)so_id_hs).ToString());
            string hmacSha1 = Utilities.HMACSHA1(chuoi, merchant_secret);
            return Ok(hmacSha1.Replace("=", "%3d").Replace(" ", "+"));
        }
        /// <summary>
        /// Trang login
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> Login()
        {
            var domainName = Request.Scheme + "://" + Request.Host.Value.ToString().ToLower();
            if (domainName.Contains("localhost") || domainName.Contains(AppSettings.AppDomain))
                domainName = AppSettings.AppDomainLive;
            if (AppSettings.WriteLogFile)
                _logger.LogInformation(domainName);
            ViewBag.domain = domainName;

            if (EscsUtils.cai_dat == null || EscsUtils.cai_dat.Count() <= 0 || EscsUtils.cai_dat.Where(n => n.domain == domainName).Count() <= 0)
            {
                var baseResponse = await Request.GetRespone<ht_cai_dat>(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_LKE, new { domain = domainName });
                if (baseResponse.data_info != null && baseResponse.data_info.doi_tac != null && !string.IsNullOrEmpty(baseResponse.data_info.doi_tac.ma))
                {
                    if (EscsUtils.cai_dat == null)
                        EscsUtils.cai_dat = new List<ht_cai_dat>();
                    baseResponse.data_info.domain = domainName;
                    EscsUtils.cai_dat.Add(baseResponse.data_info);
                }
            }
            return View();
        }
        /// <summary>
        /// Đăng nhập hệ thống
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> Login(user_login_escs model)
        {
            var detector = new DeviceDetector(Request.Headers["User-Agent"].ToString());
            detector.SetCache(new DictionaryCache());
            detector.Parse();

            if (AppSettings.UseCaptcha)
            {
                string captchaToken = GetCookies("SESSIONID.CAPTCHA");
                if (string.IsNullOrEmpty(captchaToken))
                {
                    ModelState.AddModelError("captcha", "Không tìm thấy captcha");
                    return View(model);
                }
                if (string.IsNullOrEmpty(model.captcha))
                {
                    ModelState.AddModelError("captcha", "Bạn chưa nhập captcha");
                }
                string captcha = Utilities.DecryptByKey(captchaToken, "ESCS_TOKEN_KEY" + DateTime.Now.ToString("yyyyMMdd"));
                if (model.captcha != captcha)
                {
                    ModelState.AddModelError("captcha", "Mã captcha chưa chính xác");
                }
            }
            if (!string.IsNullOrEmpty(model.username) && !Utilities.IsValidEmail(model.username))
            {
                ModelState.AddModelError("username", "Tài khoản không đúng định dạng email.");
            }

            if (ModelState.IsValid)
            {
                var domainName = Request.Scheme + "://" + Request.Host.Value.ToString().ToLower();
                if (domainName.Contains("localhost") || domainName.Contains(AppSettings.AppDomain))
                    domainName = AppSettings.AppDomainLive;
                ViewBag.domain = domainName;
                if (EscsUtils.cai_dat ==null || EscsUtils.cai_dat.Count()<=0 || EscsUtils.cai_dat.Where(n => n.domain == domainName).Count() <= 0)
                {
                    var resCaiDat = await Request.GetRespone<ht_cai_dat>(StoredProcedure.PBH_CAI_DAT_UNG_DUNG_LKE, new { domain = domainName });
                    if (resCaiDat.data_info != null && resCaiDat.data_info.doi_tac != null && !string.IsNullOrEmpty(resCaiDat.data_info.doi_tac.ma))
                    {
                        if (EscsUtils.cai_dat == null)
                            EscsUtils.cai_dat = new List<ht_cai_dat>();
                        resCaiDat.data_info.domain = domainName;
                        EscsUtils.cai_dat.Add(resCaiDat.data_info);
                    }
                }
                var ma_doi_tac_tmp = EscsUtils.cai_dat.Where(n=>n.domain== domainName).FirstOrDefault().doi_tac.ma;
                var baseResponse = await Request.GetRespone<escs_authen>(StoredProcedure.PHT_NSD_LOGIN, new { ma_doi_tac_nsd = ma_doi_tac_tmp, nsd = model.username, pas = Utilities.Sha256Hash(model.password) });
                if (baseResponse.state_info.status == ResponseStatus.OK && baseResponse.data_info.nguoi_dung != null)
                {
                    if (baseResponse.data_info.dv_google != null && !string.IsNullOrEmpty(baseResponse.data_info.dv_google.key))
                    {
                        var decript = Utilities.DecryptByKey(baseResponse.data_info.dv_google.key, AppSettings.KeyEryptData);
                        if (!string.IsNullOrEmpty(decript))
                            baseResponse.data_info.dv_google.key = decript;
                    }
                    baseResponse.data_info.nguoi_dung.pas = Utilities.Sha256Hash(model.password);
                    EscsUtils.SaveUserMenu(baseResponse.data_info.nguoi_dung.ma_doi_tac + "/" + model.username, baseResponse.data_info.menu);
                    EscsUtils.dv_google = baseResponse.data_info.dv_google;

                    baseResponse.data_info.nguoi_dung.time_live = Int64.Parse(DateTime.Now.AddMinutes((double)HttpConfiguration.SessionTimeOut).ToString("yyyyMMddHHmmss"));
                    var token = Utilities.EncryptByKey(JsonConvert.SerializeObject(baseResponse.data_info.nguoi_dung), AppSettings.KeyEryptData);

                    HttpContext.Response.Cookies.Delete(ESCSConstants.ESCS_TOKEN);
                    HttpContext.Response.Cookies.Append(ESCSConstants.ESCS_TOKEN, token, new CookieOptions() { Expires = DateTime.Now.AddMinutes(HttpConfiguration.SessionTimeOut + 10) });
                    TempData[ESCSConstants.ESCS_TOKEN] = token;

                    // Kiêm tra nsd có được vào link cho ý kiến không
                    if (model.backlink != "//" && model.backlink != "" && model.backlink != null && model.backlink.Contains("?hashcode="))
                    {
                        string hash_code = model.backlink.Split('=')[1];
                        hash_code = hash_code.Replace("#", "");
                        if (hash_code != "")
                        {
                            var tt_hs_yk = await Request.GetRespone<List<nsd_y_kien>>(StoredProcedure.PBH_BT_Y_KIEN_GET_INFO_HASHCODE, new { hashcode = hash_code });
                            if (tt_hs_yk.state_info.status != "OK")
                            {
                                ModelState.AddModelError("username", "Có lỗi xảy ra");
                                return View(model);
                            }
                            else
                            {
                                if (tt_hs_yk.data_info.Where(n => n.nsd == model.username).FirstOrDefault() != null)
                                {
                                    if (detector.IsDesktop())
                                    {
                                        var url_go = "/carclaim/desktopOpinion";
                                        var hanh_dong = "XEM_CTIET_HO_SO";
                                        try
                                        {
                                            TempData[ESCSConstants.NOTIFY_INFO] = tt_hs_yk.data_info.FirstOrDefault().ma_doi_tac + "/" + tt_hs_yk.data_info.FirstOrDefault().so_id_hs + "/" + tt_hs_yk.data_info.FirstOrDefault().so_id_yk + "/" + hanh_dong;
                                            return LocalRedirect(url_go);
                                        }
                                        catch
                                        {

                                        }
                                    }
                                    else
                                    {
                                        var url_go = "/opinion";
                                        TempData["hashcode"] = hash_code;
                                        return LocalRedirect(url_go);
                                    }
                                }
                                else
                                {
                                    ModelState.AddModelError("username", "Bạn không có quyền vào cho ý kiến này");
                                    return View(model);
                                }
                            }
                        }
                    }
                    return RedirectToAction("Index");
                }
                ModelState.AddModelError("username", baseResponse.state_info.message_body);
            }
            return View(model);
        }
        /// <summary>
        /// Trang lấy lại mật khẩu
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetPass(string t, string signature)
        {
            user_get_pass userpass = new user_get_pass();
            userpass.t = t;
            userpass.signature = signature;
            if (userpass == null ||
                string.IsNullOrEmpty(userpass.t) ||
                string.IsNullOrEmpty(userpass.signature) ||
                Utilities.Sha256Hash(userpass.t + AppSettings.SecretKeyData + DateTime.Now.ToString("yyyyMMdd")) != userpass.signature)
            {
                userpass.trang_thai = "500";
                userpass.thong_bao = "Thông tin không hợp lệ";
                return View(userpass);
            }
            var baseResponse = await Request.GetRespone<escs_nsd_quen_mk>(StoredProcedure.PHT_NSD_QUEN_MK_LKE_CT, new { token = userpass.t });
            if (baseResponse.state_info.status != STATUS_OK)
            {
                userpass.trang_thai = "500";
                userpass.thong_bao = baseResponse.state_info.message_body;
                return View(userpass);
            }
            if (baseResponse.data_info == null)
            {
                userpass.trang_thai = "500";
                userpass.thong_bao = "Thông tin không hợp lệ";
                return View(userpass);
            }
            if (baseResponse.data_info.tg_ket_thuc < Convert.ToInt64(DateTime.Now.ToString("yyyyMMddHHmmss")))
            {
                userpass.trang_thai = "500";
                userpass.thong_bao = "Thời gian thay đổi mật khẩu đã hết hạn (" + AppSettings.TimeRecoverPass + " phút). Vui lòng thử lại lần sau.";
                return View(userpass);
            }
            userpass.trang_thai = "200";
            return View(userpass);
        }
        /// <summary>
        /// Trang lấy lại mật khẩu
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> GetPass(user_get_pass userpass)
        {
            if (userpass == null ||
                string.IsNullOrEmpty(userpass.t) ||
                string.IsNullOrEmpty(userpass.signature) ||
                Utilities.Sha256Hash(userpass.t + AppSettings.SecretKeyData + DateTime.Now.ToString("yyyyMMdd")) != userpass.signature)
            {
                userpass.trang_thai = "500";
                userpass.thong_bao = "Thông tin không hợp lệ";
                return View(userpass);
            }
            if (string.IsNullOrEmpty(userpass.mat_khau_moi))
            {
                ModelState.AddModelError("mat_khau_moi", "Bạn chưa nhập mật khẩu mới");
            }
            if (string.IsNullOrEmpty(userpass.nhap_lai_mat_khau))
            {
                ModelState.AddModelError("nhap_lai_mat_khau", "Bạn chưa nhập lại mật khẩu mới");
            }
            if (userpass.mat_khau_moi != userpass.nhap_lai_mat_khau)
            {
                ModelState.AddModelError("nhap_lai_mat_khau", "Nhập lại mật khẩu mới không trùng nhau");
            }
            if (ModelState.IsValid)
            {
                var baseResponse = await Request.GetRespone<escs_nsd_quen_mk>(StoredProcedure.PHT_NSD_QUEN_MK_LKE_CT, new { token = userpass.t });
                if (baseResponse.state_info.status != STATUS_OK)
                {
                    userpass.trang_thai = "500";
                    userpass.thong_bao = baseResponse.state_info.message_body;
                    return View(userpass);
                }
                if (baseResponse.data_info == null)
                {
                    userpass.trang_thai = "500";
                    userpass.thong_bao = "Thông tin không hợp lệ";
                    return View(userpass);
                }
                if (baseResponse.data_info.tg_ket_thuc < Convert.ToInt64(DateTime.Now.ToString("yyyyMMddHHmmss")))
                {
                    userpass.trang_thai = "500";
                    userpass.thong_bao = "Thời gian thay đổi mật khẩu đã hết hạn (" + AppSettings.TimeRecoverPass + " phút). Vui lòng thử lại lần sau.";
                    return View(userpass);
                }
                var resCapNhatMatKhau = await Request.GetRespone<int>(StoredProcedure.PHT_NSD_CAP_LAI_MK, new { tai_khoan = baseResponse.data_info.ma, mat_khau = Utilities.Sha256Hash(userpass.mat_khau_moi) });
                if (resCapNhatMatKhau.state_info.status != STATUS_OK)
                {
                    userpass.trang_thai = "500";
                    userpass.thong_bao = resCapNhatMatKhau.state_info.message_body;
                    return View(userpass);
                }
                userpass.trang_thai = "SUCCESS";
            }
            return View(userpass);
        }
        /// <summary>
        /// Logout hệ thống
        /// </summary>
        /// <returns></returns>
        public IActionResult Logout()
        {
            HttpContext.Response.Cookies.Delete(ESCSConstants.ESCS_TOKEN);
            return RedirectToAction("Login");
        }
        /// <summary>
        /// Màn hình thông báo lỗi
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [NoneMenu]
        public ViewResult Error() => View("Error");
        /// <summary>
        /// Màn hình thông báo không hỗ trợ trên mobile
        /// </summary>
        /// <returns></returns>
        [NoneMenu]
        public IActionResult DetectDevice()
        {
            return View();
        }
        /// <summary>
        /// Màn hình page notfound
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult PageNotFound() => View("PageNotFound");
        /// <summary>
        /// Lấy danh sách tin nhắn
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetNotify()
        {
            var json = Request.GetDataRequestNew(GetUser());
            json.AddPropertyStringJson("loai_thong_bao", "NOTIFY");
            var data = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Kiểm tra hashcode
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> checkHashcode()
        {
            string url_link = TempData["url_link"].ToString();
            var detector = new DeviceDetector(Request.Headers["User-Agent"].ToString());
            detector.SetCache(new DictionaryCache());
            detector.Parse();
            var json = GetUser();
            // Kiêm tra nsd có được vào link cho ý kiến không
            if (url_link != "//" && url_link != "" && url_link != null && url_link.Contains("?hashcode="))
            {
                string hash_code = url_link.Split('=')[1];
                hash_code = hash_code.Replace("#", "");
                if (hash_code != "")
                {
                    var tt_hs_yk = await Request.GetRespone<List<nsd_y_kien>>(StoredProcedure.PBH_BT_Y_KIEN_GET_INFO_HASHCODE, new { hashcode = hash_code });
                    if (tt_hs_yk.state_info.status != "OK")
                    {
                        ModelState.AddModelError("username", "Có lỗi xảy ra");
                        return RedirectToAction("Login");
                    }
                    else
                    {
                        if (tt_hs_yk.data_info.Where(n => n.nsd == json.nsd).FirstOrDefault() != null)
                        {
                            if (detector.IsDesktop())
                            {
                                var url_go = "/carclaim/desktopOpinion";
                                var hanh_dong = "XEM_CTIET_HO_SO";
                                try
                                {
                                    TempData[ESCSConstants.NOTIFY_INFO] = tt_hs_yk.data_info.FirstOrDefault().ma_doi_tac + "/" + tt_hs_yk.data_info.FirstOrDefault().so_id_hs + "/" + tt_hs_yk.data_info.FirstOrDefault().so_id_yk + "/" + hanh_dong;
                                    return LocalRedirect(url_go);
                                }
                                catch
                                {

                                }
                            }
                            else
                            {
                                var url_go = "/opinion";
                                TempData["hashcode"] = hash_code;
                                return LocalRedirect(url_go);
                            }
                        }
                        else
                        {
                            TempData["_backlink"] = url_link;
                            return RedirectToAction("Login");

                        }
                    }
                }
            }
            return RedirectToAction("Index");
        }
        /// <summary>
        /// Lấy danh sách thống báo hồ sơ mới
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetContractNotify()
        {
            var json = Request.GetDataRequestNew(GetUser());
            json.AddPropertyStringJson("loai_thong_bao", "NOTIFY");
            var data = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_HS_MOI_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Captcha
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="noisy"></param>
        /// <returns></returns>
        public IActionResult Captcha(string prefix, bool noisy = true)
        {
            var rand = new Random((int)DateTime.Now.Ticks);
            int a = rand.Next(10, 99);
            int b = rand.Next(0, 9);
            var captcha = string.Format("{0} + {1} = ?", a, b);
            var cookie_value = Utilities.EncryptByKey((a + b).ToString(), "ESCS_TOKEN_KEY" + DateTime.Now.ToString("yyyyMMdd"));
            SetCookies("SESSIONID.CAPTCHA", cookie_value, 10);
            FileContentResult img = null;
            using (var mem = new MemoryStream())
            using (var bmp = new Bitmap(130, 30))
            using (var gfx = Graphics.FromImage((Image)bmp))
            {
                gfx.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
                gfx.SmoothingMode = SmoothingMode.AntiAlias;
                gfx.FillRectangle(Brushes.White, new Rectangle(0, 0, bmp.Width, bmp.Height));
                if (noisy)
                {
                    int i, r, x, y;
                    var pen = new Pen(System.Drawing.Color.Yellow);
                    for (i = 1; i < 10; i++)
                    {
                        pen.Color = System.Drawing.Color.FromArgb(
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)));

                        r = rand.Next(0, (130 / 3));
                        x = rand.Next(0, 130);
                        y = rand.Next(0, 30);

                        gfx.DrawEllipse(pen, x - r, y - r, r, r);
                    }
                }
                gfx.DrawString(captcha, new Font("Tahoma", 15), Brushes.Gray, 2, 3);
                bmp.Save(mem, System.Drawing.Imaging.ImageFormat.Jpeg);
                img = this.File(mem.GetBuffer(), "image/Jpeg");
            }
            return img;
        }
        /// <summary>
        /// Captcha Recover Pass
        /// </summary>
        /// <param name="prefix"></param>
        /// <param name="noisy"></param>
        /// <returns></returns>
        public IActionResult CaptchaRecoverPass(string prefix, bool noisy = true)
        {
            var rand = new Random((int)DateTime.Now.Ticks);
            int a = rand.Next(10, 99);
            int b = rand.Next(0, 9);
            var captcha = string.Format("{0} + {1} = ?", a, b);
            var cookie_value = Utilities.EncryptByKey((a + b).ToString(), "ESCS_TOKEN_KEY" + DateTime.Now.ToString("yyyyMMdd"));
            SetCookies("SESSIONID.CAPTCHA_RECOVER_PASS", cookie_value, 10);
            FileContentResult img = null;
            using (var mem = new MemoryStream())
            using (var bmp = new Bitmap(130, 30))
            using (var gfx = Graphics.FromImage((Image)bmp))
            {
                gfx.TextRenderingHint = TextRenderingHint.ClearTypeGridFit;
                gfx.SmoothingMode = SmoothingMode.AntiAlias;
                gfx.FillRectangle(Brushes.White, new Rectangle(0, 0, bmp.Width, bmp.Height));
                if (noisy)
                {
                    int i, r, x, y;
                    var pen = new Pen(System.Drawing.Color.Yellow);
                    for (i = 1; i < 10; i++)
                    {
                        pen.Color = System.Drawing.Color.FromArgb(
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)),
                        (rand.Next(0, 255)));

                        r = rand.Next(0, (130 / 3));
                        x = rand.Next(0, 130);
                        y = rand.Next(0, 30);

                        gfx.DrawEllipse(pen, x - r, y - r, r, r);
                    }
                }
                gfx.DrawString(captcha, new Font("Tahoma", 15), Brushes.Gray, 2, 3);
                bmp.Save(mem, System.Drawing.Imaging.ImageFormat.Jpeg);
                img = this.File(mem.GetBuffer(), "image/Jpeg");
            }
            return img;
        }
        /// <summary>
        /// Màn hình ký dữ liệu
        /// </summary>
        /// <returns></returns>
        public IActionResult Signature()
        {
            return View();
        }
        /// <summary>
        /// Ký dữ liệu
        /// </summary>
        /// <param name="secret_key"></param>
        /// <param name="data_info"></param>
        /// <returns></returns>
        [HttpPost]
        public IActionResult Signature(string secret_key, string data_info)
        {
            try
            {
                var obj = JObject.Parse(data_info);
                data_info = JsonConvert.SerializeObject(obj);
            }
            catch
            {
                return Ok(new { signature = "Không đúng định dạng json" });
            }
            string sign = Utilities.Sha256Hash(JWTHelper.Base64UrlEncode(data_info) + "." + secret_key);
            return Ok(new { signature = sign, data_info = data_info });
        }
        /// <summary>
        /// Gửi notify mẫu
        /// </summary>
        [SystemAuthen]
        public IActionResult SendNotifyExample()
        {
            return View();
        }
        /// <summary>
        /// Generate lại mẫu in
        /// </summary>
        [SystemAuthen]
        public IActionResult ReGenerateFile()
        {
            return View();
        }
        /// <summary>
        /// Generate lại mẫu in
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        [HttpPost]
        public async Task<IActionResult> ReGenerateFileSubmit()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_GEN_FILE, json, "/api/esmartclaim/re-gennerate-file");
            return Ok(res);
        }
        /// <summary>
        /// SendNotifyExample
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        [SystemAuthen]
        public async Task<IActionResult> SendNotifyExample(notify_model model)
        {
            var user = GetUser();
            model.ma_doi_tac_nsd = user.ma_doi_tac;
            model.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            model.nsd = user.nsd;
            model.pas = user.pas;
            var data = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_NOTIFY_TEST_NH, JsonConvert.SerializeObject(model));
            return Ok(data);
        }
        /// <summary>
        /// Chuyển hướng notify
        /// </summary>
        /// <param name="gid"></param>
        /// <param name="url_redirect"></param>
        /// <returns></returns>
        public IActionResult RedirectNotify(string gid, string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            var user = GetUser();
            TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
            var json = JsonConvert.SerializeObject(new
            {
                ma_doi_tac_nsd = user.ma_doi_tac,
                ma_chi_nhanh_nsd = user.ma_chi_nhanh,
                nsd = user.nsd,
                pas = user.pas,
                gid = gid
            });
            try
            {
                Task task = new Task(async () =>
                {
                    await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_DOC_TB, json);
                });
                task.Start();
            }
            catch
            {
            }
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        /// <summary>
        /// Đọc thông báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ReadNotify()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_DOC_TB, json);
            return Ok(res);
        }
        /// <summary>
        /// Đọc tất cả thông báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ReadAllNotify()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PHT_THONG_BAO_DOC_TATCA_TB, json);
            return Ok(res);
        }
        /// <summary>
        /// Đổi mật khẩu
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ChangePass()
        {
            var jsonData = Request.GetDataRequestNew(GetUser());
            user_login_escs_change_pass user = JsonConvert.DeserializeObject<user_login_escs_change_pass>(jsonData);
            BaseResponse<user_login_escs_change_pass> res = new BaseResponse<user_login_escs_change_pass>();
            if (user == null || string.IsNullOrEmpty(user.pas_cu))
            {
                res.state_info.status = "NotOK";
                res.state_info.message_code = "PAS_CU_NOTFOUND";
                res.state_info.message_body = "Bạn chưa nhập mật khẩu cũ";
                return Ok(res);
            }
            if (string.IsNullOrEmpty(user.pas_moi))
            {
                res.state_info.status = "NotOK";
                res.state_info.message_code = "PAS_MOI_NOTFOUND";
                res.state_info.message_body = "Bạn chưa nhập mật khẩu mới";
                return Ok(res);
            }
            if (string.IsNullOrEmpty(user.pas_nhap_lai))
            {
                res.state_info.status = "NotOK";
                res.state_info.message_code = "PAS_NHAP_LAI_NOTFOUND";
                res.state_info.message_body = "Bạn chưa nhập lại mật khẩu mới";
                return Ok(res);
            }
            if (user.pas_nhap_lai != user.pas_moi)
            {
                res.state_info.status = "NotOK";
                res.state_info.message_code = "PAS_NHAP_LAI_INVALID";
                res.state_info.message_body = "Nhập lại mật khẩu mới không khớp";
                return Ok(res);
            }
            user.pas_cu = Utilities.Sha256Hash(user.pas_cu);
            user.pas_moi = Utilities.Sha256Hash(user.pas_moi);
            var userSession = GetUser();
            user.ma_doi_tac_nsd = userSession.ma_doi_tac;
            user.ma_chi_nhanh_nsd = userSession.ma_chi_nhanh;
            user.pas = userSession.pas;
            user.nsd = userSession.nsd;
            var json = JsonConvert.SerializeObject(user);
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_DOI_MAT_KHAU, json);
            try
            {
                var jsonR = JsonConvert.SerializeObject(data);
                BaseResponse<object> resChangePass = JsonConvert.DeserializeObject<BaseResponse<object>>(jsonR);
                if (resChangePass.state_info.status == "OK")
                {
                    var session = HttpContext.Request.Cookies[ESCSConstants.ESCS_TOKEN]?.ToString();
                    escs_nguoi_dung auth = JsonConvert.DeserializeObject<escs_nguoi_dung>(Utilities.DecryptByKey(session, ESCS.COMMON.Http.AppSettings.KeyEryptData));
                    auth.pas = user.pas_moi;

                    auth.time_live = Int64.Parse(DateTime.Now.AddMinutes((double)HttpConfiguration.SessionTimeOut).ToString("yyyyMMddHHmmss"));
                    var token = Utilities.EncryptByKey(JsonConvert.SerializeObject(auth), AppSettings.KeyEryptData);

                    HttpContext.Response.Cookies.Delete(ESCSConstants.ESCS_TOKEN);
                    HttpContext.Response.Cookies.Append(ESCSConstants.ESCS_TOKEN, token, new CookieOptions() { Expires = DateTime.Now.AddMinutes(HttpConfiguration.SessionTimeOut + 10) });
                }
            }
            catch
            {

            }
            return Ok(data);
        }
        /// <summary>
        /// Khôi phục lại mật khẩu
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> RecoverPass(user_login_escs model)
        {
            BaseResponse<string> res = new BaseResponse<string>();
            string pathFile = string.Empty;
            string template_mail = string.Empty;
            #region Kiểm tra dữ liệu đầu vào
            string captchaToken = GetCookies("SESSIONID.CAPTCHA_RECOVER_PASS");
            if (string.IsNullOrEmpty(captchaToken))
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "validate-recover-pass-captcha.notfound";
                res.state_info.message_body = "Không tìm thấy captcha";
                return Ok(res);
            }
            if (string.IsNullOrEmpty(model.captcha))
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "validate-recover-pass-captcha.notfound";
                res.state_info.message_body = "Bạn chưa nhập captcha";
                return Ok(res);
            }
            string captcha = Utilities.DecryptByKey(captchaToken, "ESCS_TOKEN_KEY" + DateTime.Now.ToString("yyyyMMdd"));
            if (model.captcha != captcha)
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "validate-recover-pass-captcha.invalid";
                res.state_info.message_body = "Mã captcha chưa chính xác";
                return Ok(res);
            }
            if (string.IsNullOrEmpty(model.username))
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "validate-recover-pass-username.notfound";
                res.state_info.message_body = "Bạn chưa nhập tên tài khoản";
                return Ok(res);
            }
            if (!string.IsNullOrEmpty(model.username) && !Utilities.IsValidEmail(model.username))
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "validate-recover-pass-username.invalid";
                res.state_info.message_body = "Tài khoản không đúng định dạng email.";
                return Ok(res);
            }
            #endregion
            #region Lấy dữ liệu Database
            var baseResponse = await Request.GetRespone<escs_quen_mat_khau<string>>(StoredProcedure.PHT_NSD_QUEN_MK, new { username = model.username });
            escs_quyen_mk_token value_out = null;
            if (baseResponse.out_value != null && !string.IsNullOrEmpty(baseResponse.out_value.ToString()))
            {
                value_out = JsonConvert.DeserializeObject<escs_quyen_mk_token>(baseResponse.out_value.ToString());
                baseResponse.data_info.link_lien_ket = AppSettings.AppDomain + "/home/getpass?t=" + value_out.token + "&signature=" + Utilities.Sha256Hash(value_out.token + AppSettings.SecretKeyData + DateTime.Now.ToString("yyyyMMdd"));
            }
            #endregion
            #region Lấy template email
            NetworkCredentialItem network = NetworkCredentials.GetItem("ESCS_PATH_FILE");
            pathFile = Path.Combine(network.PathLocal, "FILE_CAM_XOA", baseResponse.data_info.mau_email.url);
            if (!System.IO.File.Exists(pathFile))
            {
                res.state_info.status = STATUS_NOTOK;
                res.state_info.message_code = "500";
                res.state_info.message_body = "Không tồn tại file";
                return Ok(res);
            }
            template_mail = System.IO.File.ReadAllText(pathFile);
            #endregion
            var defineInfo = Request.GetDefineInfo();
            Task task = new Task(async () =>
            {
                #region Compile template
                DynamicViewBag dynamicViewBag = new DynamicViewBag();
                dynamicViewBag.AddValue("Data", baseResponse);
                string name = baseResponse.data_info.mau_email.ma_doi_tac + "_" + baseResponse.data_info.mau_email.ma;
                try { template_mail = _service.RunCompile(template_mail, name, null, null, dynamicViewBag); } catch (Exception ex) { throw new Exception("Lỗi cú pháp khi đổ dữ liệu: " + ex.Message); }
                #endregion
                #region Gửi Email
                MailOpenIdConfig mailOpenIdConfig = new MailOpenIdConfig();
                mailOpenIdConfig.title = "Thiết lập lại mật khẩu của tài khoản người dùng";
                mailOpenIdConfig.body = template_mail;
                //Thông tin server mail
                mailOpenIdConfig.server.smtp_server = baseResponse.data_info.server.smtp_server;
                mailOpenIdConfig.server.smtp_port = (int)baseResponse.data_info.server.smtp_port.Value;
                mailOpenIdConfig.server.smtp_username = baseResponse.data_info.server.smtp_tai_khoan;
                mailOpenIdConfig.server.smtp_password = baseResponse.data_info.server.smtp_mat_khau;
                //Thông tin tài khoản gửi
                mailOpenIdConfig.from.username = baseResponse.data_info.server.smtp_tai_khoan;
                mailOpenIdConfig.from.password = baseResponse.data_info.server.smtp_mat_khau;
                mailOpenIdConfig.from.alias = baseResponse.data_info.server.ten_hthi;
                mailOpenIdConfig.to.Add(new MailInfo(baseResponse.data_info.nsd.email));
                await OpenIdService.ForwardMail(mailOpenIdConfig, defineInfo);
                #endregion
            });
            task.Start();
            res.state_info.message_code = "200";
            res.state_info.message_body = "Gửi email lấy lại mật khẩu thành công";
            return Ok(res);
        }
        /// <summary>
        /// Kiểm tra kết nối chát
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [AjaxOnly]
        public async Task<IActionResult> CheckConnectionChat(kiem_tra_ket_noi ketNoi)
        {
            var user = GetUser();
            ketNoi.ma_doi_tac_nsd = user.ma_doi_tac;
            ketNoi.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            ketNoi.nsd = user.nsd;
            ketNoi.pas = user.pas;
            if (ketNoi.ds_ket_noi == null || ketNoi.ds_ket_noi.Count <= 0)
            {
                BaseResponse<kiem_tra_ket_noi> res = new BaseResponse<kiem_tra_ket_noi>();
                res.data_info = ketNoi;
                return Ok(res);
            }
            var defineInfo = Request.GetDefineInfo();
            BaseRequest<kiem_tra_ket_noi> req = new BaseRequest<kiem_tra_ket_noi>(ketNoi, defineInfo);
            var response = await _httpService.CallApi("/api/esmartclaim/check-connect", req);
            var result = response.Result<kiem_tra_ket_noi>();
            if (result != null && result.data_info != null && result.data_info.ds_ket_noi != null)
            {
                result.data_info.ds_ket_noi = result.data_info.ds_ket_noi.GroupBy(elem => elem.ma_gdv).Select(group => group.First()).ToList();
            }
            return Ok(result);
        }
        /// <summary>
        /// Lấy nội dung chát
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetContentChat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CHAT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Thông tin Dashboard người
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDashboardNg()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_DASHBOARD, json);
            return Ok(data);
        }
        /// <summary>
        /// Thông tin Dashboard tiến trình giải quyết xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDashboardTTGQ()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_SLA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin dashboard
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDashboard()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy tất cả danh mục màn hình tính toán bồi thường xe cơ giới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietDashboard()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_1, json);
            return Ok(data);
        }
        /// <summary>
        /// Tài liệu hướng dẫn
        /// </summary>
        /// <returns></returns>
        public IActionResult Tutorial()
        {
            return View();
        }
        public async Task<IActionResult> GetFunc()
        {
            Reflection rf = new Reflection();
            AppInfo appInfo = new AppInfo();
            var user = GetUser();
            appInfo.ma_doi_tac_nsd = user.ma_doi_tac;
            appInfo.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            appInfo.nsd = user.nsd;
            appInfo.pas = user.pas;

            appInfo.area.Add(new AreaInfo() { ma = "Admin", ten = "Quản trị hệ thống", duong_dan = "ESCS.Areas.Admin" });
            appInfo.area.Add(new AreaInfo() { ma = "CarClaim", ten = "Quản trị nghiệp vụ giám định, bồi thường xe", duong_dan = "ESCS.Areas.CarClaim" });
            appInfo.area.Add(new AreaInfo() { ma = "Contract", ten = "Quản trị hợp đồng", duong_dan = "ESCS.Areas.Contract" });
            appInfo.area.Add(new AreaInfo() { ma = "HealthClaim", ten = "Quản trị nghiệp vụ giám định, bồi thường con người", duong_dan = "ESCS.Areas.HealthClaim" });
            appInfo.area.Add(new AreaInfo() { ma = "Manager", ten = "Quản trị phê duyệt", duong_dan = "ESCS.Areas.Manager" });
            foreach (var area in appInfo.area)
            {
                var controllers = rf.GetControllers(area.duong_dan + ".Controllers");
                var lstController = controllers.Select(n => new ControllerInfo()
                {
                    ma = n.Name.Replace("Controller", ""),
                    duong_dan = n.FullName,
                    vung_qt = area.ma,
                    ten = n.GetAttributeValue<ESCSDescriptionAttribute, string>(des => des.Description) ?? n.Name
                }).ToList();
                appInfo.controller.AddRange(lstController);
                foreach (var controller in controllers)
                {
                    List<ActionInfo> action = rf.GetActions(controller);
                    action = action.Select(n =>
                    {
                        n.nhom = controller.Name.Replace("Controller", "");
                        n.phuong_thuc = n.phuong_thuc ?? "NONE";
                        n.ten = n.ten ?? n.ma;
                        n.vung_qt = area.ma;
                        return n;
                    }).ToList();
                    appInfo.action.AddRange(action);
                }
            }
            var json = JsonConvert.SerializeObject(appInfo);
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Không có quyền
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [NoneMenu]
        public ViewResult UnRole() => View("UnRole");
        /// <summary>
        /// Mobile Nhập
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> MobileNhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PMOBILE_NSD_BH_BT_XE_GD_NH, json);
            return Ok(data);
        }
        public IActionResult BoSungHoSo(string ma)
        {
            if (string.IsNullOrEmpty(ma))
                return View("Tên view notfound");
            return View(new bh_bt_ho_so_giay_to_link(ma));
        }
        [AjaxOnly]
        public async Task<IActionResult> LayThongTinHSBS()
        {
            var json = Request.GetDataRequestNewNoneSession();
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LINK_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Gửi tin nhắn
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GuiTinNhanMCM()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_MCM_LICH_GUI_LKE, json);
            return Ok(res);
        }
        [AjaxOnly]
        public async Task<IActionResult> timKiemHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var res = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_TIM_KIEM, json);
            return Ok(res);
        }
        //Màn hình bồi thường
        public IActionResult TransCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình giám định
        public IActionResult TransInvestigationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        //Màn hình phê duyệt
        public IActionResult TransApprovedDisplay(string ma_doi_tac, string so_id, string nv, string lhnv, string loai, string bt, string ten, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + nv + "/" + lhnv + "/" + loai + "/" + bt + "/" + ten + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
        [HttpPost]
        public IActionResult Decrypt([FromBody] decrpty_code model)
        {
            var data = Utilities.DecryptByKey(model.code, "1.0.1");
            return Ok(data);
        }
        /// <summary>
        /// Ẩn hiện dashboard
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getCauHinhDashboard()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DASHBOARD_AN_HIEN, json);
            return Ok(data);
        }
        /// <summary>
        /// Ẩn hiện dashboard
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietHoSoDashBoard()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DASHBOARD_CT, json);
            return Ok(data);
        }
    }
}
public class StoredText
{
    public string name { get; set; }
    public string text { get; set; }
}