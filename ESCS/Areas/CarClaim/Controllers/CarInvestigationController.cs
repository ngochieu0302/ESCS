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
using ESCS.MODEL.ESCS.OutValues;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.COMMON.Contants;
using Newtonsoft.Json.Linq;
using System.Web;

namespace ESCS.Areas.CarClaim.Controllers
{
    /// <summary>
    /// Giám định bồi thường xe cơ giới
    /// </summary>
    [Area("CarClaim")]
    [SystemAuthen]
    public class CarInvestigationController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        public CarInvestigationController(IWebHostEnvironment env)
        {
            _env = env;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        public IActionResult Index(string ho_so)
        {
            ViewBag.ho_so = Utilities.DecryptByKey(ho_so, AppSettings.KeyEryptData);
            return View();
        }
        /// <summary>
        /// Lấy tất cả danh mục màn hình giám định xe cơ giới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_DMUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chi tiết hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin reload hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetReload()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_LKE_CT_RELOAD, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lại thông tin hạng mục tổn thất khi notify bắn về
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetCategoriesDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NOTIFY_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Tiếp nhận hồ sơ bên contact
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ReceiveHS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NHAN_HS, json);
            return Ok(data);
        }

        /// <summary>
        /// Tìm kiếm xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPagingSearchCar()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var urlApi = "/api/esmartclaim/excute";
            if (AppSettings.ConnectApiCorePartner)
                urlApi = "/api/partner/search-policy";
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_TIM_XE, json, urlApi);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin người thông báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveCustomerInfo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NH, json, "api/carclaim/receive");
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật thông tin người thông báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> UpdateCustomerInfo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_TT_KH_UPDATE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin diễn biến tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveProcessDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_VU_TT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa vụ tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_VU_TT_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin bên giam gia giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SavePersonInvolve()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_NGUOI_LIEN_QUAN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin bên liên quan
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeletePersonInvolve()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_NGUOI_LIEN_QUAN_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển người xử lý hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> MoveUserHandler()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CHUYEN_XL, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DestroyRecordsDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_HUY, json, "/api/esmartclaim/destroy");
            return Ok(data);
        }
        /// <summary>
        /// Gỡ hủy hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_GO_HUY, json, "/api/esmartclaim/undestroy");
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quá trình xử lý
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListProcessing()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_QTXL_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin giám định tổn thất
        /// </summary>getfiles
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveExpertiseDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_GDTT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin so sánh OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> CompareOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_XE_GD_SO_SANH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách files thumnail
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFilesThumnail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var dataRQ = JsonConvert.DeserializeObject<data_get_list_file>(json);
            string urlApi = "/api/esmartclaim/get-file-thumnail";
            if (AppSettings.ConnectApiCorePartner && !string.IsNullOrEmpty(dataRQ.pm) && dataRQ.pm == "BH")
                urlApi = "/api/partner/list-file";
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_THUMNAIL, json, urlApi);
            return Ok(data);
        }
        /// <summary>
        /// Lấy file hiển thị
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var dataRQ = JsonConvert.DeserializeObject<data_get_list_file>(json);
            string urlApi = "/api/esmartclaim/get-file";
            if (AppSettings.ConnectApiCorePartner && !string.IsNullOrEmpty(dataRQ.pm) && dataRQ.pm == "API")
                urlApi = "/api/partner/get-file";
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, urlApi);
            return Json(data);
        }
        /// <summary>
        /// Xóa file ảnh trong hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteImageDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Bắt đầu giám định (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> StartInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_BD_GD, json);
            return Ok(data);
        }
        /// <summary>
        /// Kết thúc giám định (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> EndInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_KT_GD, json);
            return Ok(data);
        }
        /// <summary>
        /// Duyệt báo cáo giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DuyetBaoCaoGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_GD_DUYET_BCGD, json);
            return Ok(data);
        }

        /// <summary>
        /// Tự duyệt biên bản giám định (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DuyetBBGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_GD_DUYET_GD, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy duyệt b áo cáo giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDuyetBaoCaoGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_GD_HUY_DUYET_BCGD, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy duyệt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> HuyDuyetBBGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_GD_HUY_DUYET_GD, json);
            return Ok(data);
        }

        /// <summary>
        /// Hủy giám định (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> UndoEndInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_KT_GD_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển bồi thường (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Convert2Compensation()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_GD_CHUYEN_BT, json);
            return Ok(data);
        }
        /// <summary>
        /// Gửi email bổ sung giấy tờ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> AddProfile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LINK_NH, json);
            if (data != null && data.state_info != null && data.state_info.status == STATUS_OK)
            {
                var defineInfo = Request.GetDefineInfo();
                EscsUtils.CreateFileAndSendEmail(json, defineInfo);
            }
            return Ok(data);
        }
        /// <summary>
        /// Hủy chuyển bồi thường (AnhLD)
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> UndoConvert2Compensation()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CHUYEN_BT_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Phân loại hạng mục tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ClassifyCategoriesDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_PHAN_HANG_MUC, json);
            var defineInfo = Request.GetDefineInfo();
            #region Phân loại và đọc ocr
            Task task = new Task(async () =>
            {
                try
                {
                    var dich_vu = await Request.GetResponeNewWithDefineInfo<bh_dich_vu_ocr>(StoredProcedure.PBH_DICH_VU_OCR_LKE_CT, json, "/api/esmartclaim/excute", defineInfo);
                    if (dich_vu != null && dich_vu.data_info != null && dich_vu.state_info.status == STATUS_OK && dich_vu.data_info.ap_dung == 1)
                    {
                        phan_loai_tai_lieu tai_lieu = JsonConvert.DeserializeObject<phan_loai_tai_lieu>(json);
                        if (tai_lieu.bt != null && tai_lieu.bt.Count() > 0 &&
                        (tai_lieu.hang_muc == dich_vu.data_info.hm_hddt))
                        {
                            foreach (var item in tai_lieu.bt)
                            {
                                hang_muc_tai_lieu tl = new hang_muc_tai_lieu();
                                tl.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                tl.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                tl.nsd = tai_lieu.nsd;
                                tl.pas = tai_lieu.pas;
                                tl.so_id = tai_lieu.so_id;
                                tl.bt = item;
                                var json_rq_file = JsonConvert.SerializeObject(tl);
                                var file = await Request.GetResponeNewWithDefineInfo<bh_file>(StoredProcedure.PHT_BH_FILE_TAI_FILE, json_rq_file, "/api/esmartclaim/get-file", defineInfo);
                                if (file.data_info == null || string.IsNullOrEmpty(file.data_info.duong_dan))
                                    continue;
                                if (tai_lieu.hang_muc == dich_vu.data_info.hm_hddt)
                                {
                                    ReadEBill objInput = new ReadEBill();
                                    objInput.EBillXmlContent = Utilities.Base64Decode(file.data_info.duong_dan);
                                    EBill eBill = await BillService.GetDataBill(objInput);
                                    if (eBill != null && !string.IsNullOrEmpty(eBill.InvoiceNumber))
                                    {
                                        eBill.Ct = eBill.Items.Item;
                                        eBill.Items = null;
                                        eBill.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                        eBill.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                        eBill.nsd = tai_lieu.nsd;
                                        eBill.pas = tai_lieu.pas;
                                        eBill.so_id = tai_lieu.so_id;
                                        var eBillJson = JsonConvert.SerializeObject(eBill, Formatting.None, new JsonSerializerSettings
                                        {
                                            ContractResolver = new LowercaseContractResolver()
                                        });
                                        var r_ebill = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PBH_DOC_EBILL_NH, eBillJson, "/api/esmartclaim/excute", defineInfo);
                                    }
                                }
                            }
                        }
                    }
                }
                catch
                {
                }
            });
            task.Start();
            #endregion
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật hạng mục tổn thất đã phân loại
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> UpdateCategoriesDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_HANG_MUC_SUA, json);
            var defineInfo = Request.GetDefineInfo();
            return Ok(data);
        }
        /// <summary>
        /// Xóa hạng mục tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteCategoriesDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_HANG_MUC_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Download zip file
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DownloadZipFile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE_NEN, json, "/api/esmartclaim/download-zip-file");
            return Ok(data);
        }
        /// <summary>
        /// Lấy hạng mục tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetCategories()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin hợp đồng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetContract()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_HD_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Bổ sung thêm thông tin bằng lái xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveLicenseInfo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_VU_TT_UPDATE, json);
            return Ok(data);
        }
        /// <summary>
        /// Bổ sung thêm thông tin đăng kiểm xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SaveRegistryInfo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_VU_TT_UPDATE_DK, json);
            return Ok(data);
        }
        /// <summary>
        /// Gửi email cho giám định viên
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> SendMailInspector()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_ESCS, json, "/api/p/esmartclaim/send-mail");
            return Ok(data);
        }
        /// <summary>
        /// In mẫu in và ký số
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> PrintSignaturePdf()
        {
            var json = Request.GetDataRequestNew(GetUser());
            json = json.AddPropertyStringJson("ma", "ESCS_MAU_IN");
            var file = await Request.GeneratePdfFileSignature(StoredProcedure.PHT_MAU_IN_KY_SO_ESCS, json);
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// Lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetHistory()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LSTT, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê duyệt trình
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietkeduyettrinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê trình duyệt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietketrinhduyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_LICH_SU_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa trình duyệt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoatrinhduyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu trình duyệt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luutrinhduyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách người duyệt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> laydanhsachnguoiduyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_NSD_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách tọa độ giám định viên hiện trường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetLocation()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_DINH_VI_GDV_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách giám định viên theo địa bàn giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetUserInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_GDVHT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi phí tự động
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetAutoCost()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GIA_LAY, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập kiểm tra hồ sơ giấy tờ lỗi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> setGiayToLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_LOI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê chi tiết hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layHangMucChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_CT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập chi tiết hạng mục TNDS
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> saveDetailTNDS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TNDS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập chi tiết hạng mục TNDS
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ketThucLanGiamDinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_KTHUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy kết thúc lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyKetThucLanGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_HUY_KTHUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển giám định viên hiện trường
        /// </summary>
        /// <returns></returns> 
        [AjaxOnly]
        public async Task<IActionResult> chuyenNguoiXuLyGDVHT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CHUYEN_GDVHT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDsNguoiTrongNhomPhanCongGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CONG_GD_NSD_THEO_TRUONG_NHOM_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật thông tin OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThongTinOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAP_NHAT_OCR, json);
            return Ok(data);
        }
        /// <summary>
        /// Kiểm tra quyền xử lý hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> kiemTraQuyenXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_KTRA_XU_LY, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy mức độ tổn thất AI
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layMucDoTonThatAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_AI_MUC_DO, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách tỷ lệ thương tật
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachTyLeThuongTat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_PHAN_TRAM_THUONG_TAT_TREE, json);
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
        /// lấy cache đánh giá hiện trường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetAllDght()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_DGHT_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin đánh giá hiện trường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuDanhGiaHienTruong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_DGHT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin đánh giá hiện trường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LayChiTietDanhGiaHienTruong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_DGHT_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu chi tiết hạng mục tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LuuChiTietHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển hướng trang
        /// </summary>
        /// <param name="ma_doi_tac"></param>
        /// <param name="so_id"></param>
        /// <param name="hanh_dong"></param>
        /// <param name="url_redirect"></param>
        /// <returns></returns>
        public IActionResult TransCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect+"?ho_so="+ ho_so);
        }
        /// <summary>
        /// Lấy danh sách đối tượng tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetlistDoiTuongTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DOI_TUONG_TON_THAT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin đối tượng tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> saveDoiTuongTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DOI_TUONG_TON_THAT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin đối tượng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaDoiTuongTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DOI_TUONG_TON_THAT_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê chi phí lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeChiPhiLanGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_CHI_PHI_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin chi phí lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuChiPhiLanGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_CHI_PHI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin chi phí lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaChiPhiLanGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_LAN_GD_CHI_PHI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm loại chi phí lần giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DSLoaiChiPhiGDTKiem()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CHI_PHI_GD_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm nhóm sự kiện bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DSNhomSuKienBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NHOM_SU_KIEN_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm kiếm sự kiện bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> TKiemSuKienBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SU_KIEN_BAO_HIEM_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin sự kiện bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuSuKienBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SU_KIEN_BAO_HIEM_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách sự kiện theo vụ tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSSuKienTheoVuTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SU_KIEN_BAO_HIEM_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin báo cáo giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layBaoCaoGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_BCGD_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin báo cáo giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuBaoCaoGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_BCGD_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy số hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> laySoHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var thong_tin_dang_nhap = JsonConvert.DeserializeObject<thong_tin_dang_nhap>(json);
            if (AppSettings.Version == VersionConstants.v1_0_0)
            {
                if (AppSettings.ConnectApiCorePartner && thong_tin_dang_nhap.ma_doi_tac_nsd == "MIC")
                {
                    var response = await Request.GetResponeNew<object, out_value_tich_hop>(StoredProcedure.PTICH_HOP_DL_BOI_THUONG_XE, json, "/api/partner/insurance");
                    if (response.state_info.status == STATUS_OK)
                    {
                        if (response.out_value == null || string.IsNullOrEmpty(response.out_value.so_ho_so))
                        {
                            response.state_info.status = STATUS_NOTOK;
                            response.state_info.message_body = "Không xác định được số hồ sơ " + response.state_info.message_body;
                            return Ok(response);
                        }
                        json = json.AddPropertyStringJson("so_hs", response.out_value.so_ho_so);
                        var resUpdate = await Request.GetResponeNew<object>(StoredProcedure.PTICH_HOP_SO_HS, json);
                        if (resUpdate.state_info.status == STATUS_NOTOK)
                        {
                            return Ok(resUpdate);
                        }
                    }
                    return Ok(response);
                }
                if (AppSettings.ConnectApiCorePartner && thong_tin_dang_nhap.ma_doi_tac_nsd == "OPES")
                {
                    var response = await Request.GetResponeNew<object, out_value_tich_hop>(StoredProcedure.PTICH_HOP_DL_BOI_THUONG_XE_OPES, json, "/api/partner/insurance");
                    if (response.state_info.status == STATUS_OK)
                    {
                        if (response.out_value == null || string.IsNullOrEmpty(response.out_value.so_ho_so))
                        {
                            response.state_info.status = STATUS_NOTOK;
                            response.state_info.message_body = "Không xác định được số hồ sơ " + response.state_info.message_body;
                            return Ok(response);
                        }
                        json = json.AddPropertyStringJson("so_hs", response.out_value.so_ho_so);
                        json = json.AddPropertyStringJson("so_tn", response.out_value.so_tn);
                        var resUpdate = await Request.GetResponeNew<object>(StoredProcedure.PTICH_HOP_SO_HS_SO_TN, json);
                        if (resUpdate.state_info.status == STATUS_NOTOK)
                        {
                            return Ok(resUpdate);
                        }
                    }
                    return Ok(response);
                }
                return Ok(await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CAP_NHAT_SO_HS, json));
            }
            if (AppSettings.Version == VersionConstants.v1_1_1)
            {
                var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CAP_NHAT_SO_HS, json, "/api/carclaim/get-number-claim");
                return Ok(data);
            }
            return Ok(await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CAP_NHAT_SO_HS, json));
        }
        /// <summary>
        /// Xác nhận khách hàng ký tay
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacNhanKyTay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_KY_TAY, json);
            return Ok(data);
        }
        /// <summary>
        /// Gửi email xác nhận đánh giá hiện trường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> guiEmailKhachHang()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_GUI_EMAIL, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin xác nhận biên bản giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinXacNhanBBGD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_BBGD_LKE_CT, json);
            return Ok(data);
        }
        /// DÙNG CHUNG 
        /// <summary>
        /// Lưu ước tổn thất nghiệp vụ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuUocTonThatNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_UOC_TON_THAT_NV_NH, json);
            return Ok(data);
        }
        /// DÙNG CHUNG 
        /// <summary>
        /// Lấy danh sách LHNV đối tượng hợp đồng đã tham gia
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsLHNVUoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_UOC_TON_THAT_LHNV_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xác nhận gửi email
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacnhan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_GUI_EMAIL, json);
            return Ok(data);
        }
        /// <summary>
        /// Kiểm tra hồ sơ duyệt giá tự động
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ktraHoSoDuyetGiaTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_HO_SO, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử yêu cầu BSHS
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLichSuYeuCauBSHS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_NSD_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách thương tật
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsThuongTat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_THUONG_TAT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập thương tật
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThuongTat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_THUONG_TAT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thương tật
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThuongTat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_THUONG_TAT_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Thêm gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> themGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_THEM, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Chọn phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chonPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_PA_CHON, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy tất cả gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Thêm gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Kết thúc báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ketThucBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_KT, json);
            return Ok(data);
        }

        /// <summary>
        /// Hủy kết thúc báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyKetThucBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_MOBILE_BAO_GIA_HUY_KT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách loại hình nghiệp vụ theo đối tượng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_XE_GD_LHNV, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin đánh giá theo loại hình nghiệp vụ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDgiaLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_NV_DGTT_LKE_CT, json);
            return Ok(data);
        }
    }
}
