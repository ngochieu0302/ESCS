using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using DocumentFormat.OpenXml.Drawing.Charts;
using ESCS.MODEL.BAOGIA;
using Newtonsoft.Json;
using ESCS.COMMON.Http;
using ESCS.COMMON.Request;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.IO;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class GaraListController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_NH, json);
            DefineInfo defineInfo = Request.GetDefineInfo();
            //Kiểm tra xem có liên kết với phần mềm gara không, nếu có => chuyển dữ liệu thông tin kết nối sang hệ thống bên GARA
            try
            {
                bg_ma_gara gara = JsonConvert.DeserializeObject<bg_ma_gara>(json);
                if (!string.IsNullOrEmpty(gara.ket_noi_bg) && gara.ket_noi_bg == "C")
                {
                    //PBH_HT_MA_GARA_KET_NOI - PAPI_CTY_BAO_HIEM_KET_NOI
                    //Lấy thông tin dữ liệu cần đồng bộ sang gồm 
                    //+ Thông tin công ty bảo hiểm + thông tin kết nối + thông tin tài khoản mặc định + thông tin gara
                    //+ Thông tin mức độ tổn thất
                    //+ Thông tin hãng xe, hiệu xe
                    //+ Thông tin hạng mục tổn thất (Chính, phụ)
                    var ketNoiDataInfo = await Request.GetResponeNew<thong_tin_ket_noi>(StoredProcedure.PBH_HT_MA_GARA_KET_NOI, json);
                    var ketNoiChung = ketNoiDataInfo.data_info;
                    thong_tin_ket_noi_chuyen ketNoi = ketNoiChung.GetDataChuyen();
                    ketNoi.base_url = HttpConfiguration.BaseUrl;
                    ketNoi.api_access = BGHttpConfiguration.BHAccessToken;
                    ketNoi.partner_code = BGHttpConfiguration.BHPartnerCode;
                    ketNoi.token = BGHttpConfiguration.Token;
                    ketNoi.secretkey = BGHttpConfiguration.BHSecretKey;
                    if (!string.IsNullOrEmpty(ketNoi.gara_mat_khau))
                    {
                        ketNoi.gara_mat_khau = Utilities.Sha256Hash(ketNoi.gara_mat_khau);
                    }

                    var jsonDataInfo = JsonConvert.SerializeObject(ketNoi);
                    string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);
                    using (var httpClient = new HttpClient())
                    {
                        httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                        httpClient.DefaultRequestHeaders.Clear();
                        httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.GRPartnerCode);
                        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.GRAccessToken);
                        httpClient.DefaultRequestHeaders.Add("eEnvirontment", "DEV");
                        httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PAPI_CTY_BAO_HIEM_KET_NOI);
                        string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                        var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.GRSecretKey);
                        httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                        var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                        var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                        var jsonString = rp.Content.ReadAsStringAsync().Result;
                    }
                    //Create folder ở đây
                    var _networkCredentials = NetworkCredentials.GetItem("ESCS_PATH_FILE");
                    string pathSource = Path.Combine(_networkCredentials.PathLocal, "MACDINH_GARA");
                    string targetSource = Path.Combine(_networkCredentials.PathLocal, ketNoi.ma_gara);
                    if (Directory.Exists(pathSource) && !Directory.Exists(targetSource))
                    {
                        Utilities.CopyDirectoryGara(pathSource, targetSource);
                    }
                }
            }
            catch { }
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_GARA_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_GARA_IMPORT_EXCEL, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> saveConfigGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_GARA_CONFIG_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getConfigGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_GARA_CONFIG_LKE, json);
            return Ok(data);
        }
    }
}