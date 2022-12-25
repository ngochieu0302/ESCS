using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using ESCS.COMMON.Common;
using System.Web;
using Microsoft.AspNetCore.Html;
using System.Text;
using System.Linq;
using ESCS.COMMON.Response;
using ESCS.COMMON.Http;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Converters;
using System.Dynamic;
using Microsoft.AspNetCore.Http;
using ESCS.COMMON.EscsBill;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class CommonController : BaseController
    {
        private TemplateServiceConfiguration config;
        public static IRazorEngineService _service = null;
        private readonly IWebHostEnvironment _env;
        /// <summary>
        /// Contructor
        /// </summary>
        /// <param name="env"></param>
        public CommonController(IWebHostEnvironment env)
        {
            _env = env;
            config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }
        /// <summary>
        /// Lấy danh sách đơn vị hành chính
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetAdministrativeUnits()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_TINH_DMUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách nội dung trình
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> danhSachNoiDung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_ND_TRINH_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách control theo trạng thái
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetControl()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRANG_THAI_TEN_AN_HIEN, json);
            return Ok(data);
        }
        /// <summary>
        /// Biên dịch sẵn mẫu in
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Compile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var res = await Request.GetResponeNew(objData.data_info.ma_action_api, json, "/api/esmartclaim/compile-template");
            return Ok(res);
        }
        /// <summary>
        /// Chuyển file lên server và biên dịch lại
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> CopyAndCompile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            List<string> files = new List<string>();
            if (System.IO.File.Exists(Path.Combine(_env.ContentRootPath, "FILE_CAM_XOA", objData.data_info.url_file)))
            {
                files.Add(Path.Combine(_env.ContentRootPath, "FILE_CAM_XOA", objData.data_info.url_file));
            }
            var res = await Request.PostDataAndFile("/api/esmartclaim/copy-compile", objData.data_info.ma_action_api, json, files);
            return Ok(res);
        }
        /// <summary>
        /// In mẫu in
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> PrintPdf()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.GeneratePdfFile(objData.data_info.ma_action_api, json);
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// In hóa đơn
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> InHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.GeneratePdfFile(objData.data_info.ma_action_api, json, "/api/esmartclaim/in-hoa-don");
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }

        /// <summary>
        /// In mẫu in và ký số
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> PrintSignaturePdf()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.GeneratePdfFileSignature(objData.data_info.ma_action_api, json);
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// In mẫu in (Html)
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> PrintHtmlPdf()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            if (objData.data_info == null)
                throw new Exception("Không tìm thấy mẫu in");
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var response = await Request.GeneratePdfFile(objData.data_info.ma_action_api, json, "/api/esmartclaim/gen-html-pdf");
            try
            {
                var res = response.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            Stream receiveStream = await response.Content.ReadAsStreamAsync();
            StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
            string html = readStream.ReadToEnd();
            return Ok(html);
        }
        /// <summary>
        /// Export Excel
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ExportExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.ExportExcel(objData.data_info.ma_action_api, json);
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// Export Excel Table
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ExportExcelTable()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            var file = await Request.ExportExcel(objData.data_info.ma_action_api, json, "/api/esmartclaim/export-excel-table");
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// Nhập cấu hình xe
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> SaveVehicleConfiguration() // Lưu cấu hình xe
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập mã lỗi hồ sơ
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> SaveErrorCode() // Lưu mã lỗi hồ sơ 
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LOI_HO_SO_NH, json);
            return Ok(data);
        }
        /// <summary>
        ///Lấy danh sách mẫu email
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetEmail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_LKE, json);
            return Ok(data);
        }
        /// <summary>
        ///Xem QRCode
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetQRCode()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_QRCODE_LKE_CT, json, "/api/health/qrcode");

            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách file đính kèm
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetAttachFile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_ATTACH_FILE, json);
            return Ok(data);
        }
        /// <summary>
        ///Lấy nội dung Email
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> GetEmailTemplate()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CT, json, "/api/common/get-template-email");
            return Ok(data);
        }
        /// <summary>
        /// Gửi email
        /// </summary>
        /// <param name="mailConfig"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> SendMail(EsMailInfo mailConfig)
        {
            var defineInfo = Request.GetDefineInfo();
            var user = GetUser();
            mailConfig.ma_doi_tac_nsd = user.ma_doi_tac;
            mailConfig.ma_chi_nhanh_nsd = user.ma_chi_nhanh;
            mailConfig.nsd = user.nsd;
            mailConfig.pas = user.pas;
            if (!string.IsNullOrEmpty(mailConfig.ma_doi_tac) && !string.IsNullOrEmpty(mailConfig.so_id) && !string.IsNullOrEmpty(mailConfig.loai))
            {
                var data = await Request.GetResponeNew<string>(StoredProcedure.PBH_BT_XE_HS_LAY_TTIN_EMAIL_KTRA, JsonConvert.SerializeObject(mailConfig));
                if (data.state_info.status == STATUS_NOTOK)
                    throw new Exception(data.state_info.message_body);
            }
            #region Kiểm tra dữ liệu gửi email
            if (string.IsNullOrEmpty(mailConfig.key))
                throw new Exception("Không tìm thấy thông tin cấu hình");
            if (string.IsNullOrEmpty(mailConfig.loai))
                throw new Exception("Bạn chưa chọn loại thông báo");
            if (string.IsNullOrEmpty(mailConfig.nguoi_nhan))
                throw new Exception("Bạn chưa nhập danh sách người nhận");
            if (string.IsNullOrEmpty(mailConfig.tieu_de))
                throw new Exception("Bạn chưa nhập tiêu đề mail");
            if (string.IsNullOrEmpty(mailConfig.noi_dung) || mailConfig.noi_dung.Trim() == "")
                throw new Exception("Bạn chưa nhập nội dung email");
            var ds_mail_nhan = mailConfig.nguoi_nhan.Split(";");
            string mail_nhan_loi = "";
            foreach (var mail_nhan in ds_mail_nhan)
            {
                if (!Utilities.IsValidEmail(mail_nhan.Trim()))
                    if (mail_nhan_loi == "")
                        mail_nhan_loi = mail_nhan;
                    else
                        mail_nhan_loi += "," + mail_nhan;
            }
            if (mail_nhan_loi != "")
                throw new Exception("Không đúng định dạng email người nhận(" + mail_nhan_loi + ")");
            if (!string.IsNullOrEmpty(mailConfig.cc) && mailConfig.cc.Trim()!="")
            {
                var ds_mail_cc = mailConfig.cc.Split(";");
                string mail_cc_loi = "";
                foreach (var mail_cc in ds_mail_cc)
                {
                    if (!Utilities.IsValidEmail(mail_cc.Trim()))
                        if (mail_cc_loi == "")
                            mail_cc_loi = mail_cc;
                        else
                            mail_cc_loi += "," + mail_cc;
                }
                if (mail_cc_loi != "")
                    throw new Exception("Không đúng định dạng email CC(" + mail_cc_loi + ")");
            }
            if (!string.IsNullOrEmpty(mailConfig.bcc) && mailConfig.bcc.Trim() != "")
            {
                var ds_mail_bcc = mailConfig.bcc.Split(";");
                string mail_bcc_loi = "";
                foreach (var mail_bcc in ds_mail_bcc)
                {
                    if (!Utilities.IsValidEmail(mail_bcc.Trim()))
                        if (mail_bcc_loi == "")
                            mail_bcc_loi = mail_bcc;
                        else
                            mail_bcc_loi += "," + mail_bcc;
                }
                if (mail_bcc_loi != "")
                    throw new Exception("Không đúng định dạng email BCC(" + mail_bcc_loi + ")");
            }
            #endregion
            ThongTinEmail<ThongBaoGiamDinh> config = JsonConvert.DeserializeObject<ThongTinEmail<ThongBaoGiamDinh>>(Utilities.Decrypt(mailConfig.key));
            MailOpenIdConfig mailOpenIdConfig = new MailOpenIdConfig();
            mailOpenIdConfig.title = mailConfig.tieu_de;
            mailOpenIdConfig.body = mailConfig.template;
            //Thông tin server mail
            mailOpenIdConfig.server.smtp_server = config.server_mail.smtp_server;
            mailOpenIdConfig.server.smtp_port = Convert.ToInt32(config.server_mail.smtp_port);
            mailOpenIdConfig.server.smtp_username = config.server_mail.smtp_tai_khoan;
            mailOpenIdConfig.server.smtp_password = config.server_mail.smtp_mat_khau;
            //Thông tin tài khoản gửi
            mailOpenIdConfig.from.username = config.server_mail.smtp_tai_khoan;
            mailOpenIdConfig.from.password = config.server_mail.smtp_mat_khau;
            mailOpenIdConfig.from.alias = config.server_mail.ten_hthi; 
            foreach (var mail_nhan in ds_mail_nhan)
            {
                if (!string.IsNullOrEmpty(mail_nhan) && mail_nhan.Trim() != "")
                    mailOpenIdConfig.to.Add(new MailInfo(mail_nhan.Trim()));
            }
            if (!string.IsNullOrEmpty(mailConfig.cc) && mailConfig.cc.Trim() != "")
            {
                var ds_mail_cc = mailConfig.cc.Split(";");
                foreach (var mail_cc in ds_mail_cc)
                {
                    if (!string.IsNullOrEmpty(mail_cc) && mail_cc.Trim() != "")
                    {
                        if (mailOpenIdConfig.cc == null)
                        {
                            mailOpenIdConfig.cc = new List<MailInfo>();
                        }
                        mailOpenIdConfig.cc.Add(new MailInfo(mail_cc.Trim()));
                    }    
                        
                }
            }
            if (!string.IsNullOrEmpty(mailConfig.bcc) && mailConfig.bcc.Trim() != "")
            {
                var ds_mail_bcc = mailConfig.bcc.Split(";");
                foreach (var mail_bcc in ds_mail_bcc)
                {
                    if (!string.IsNullOrEmpty(mail_bcc) && mail_bcc.Trim() != "")
                    {
                        if (mailOpenIdConfig.bcc == null)
                        {
                            mailOpenIdConfig.bcc = new List<MailInfo>();
                        }
                        mailOpenIdConfig.bcc.Add(new MailInfo(mail_bcc.Trim()));
                    }    
                       
                }
            }
            if (mailConfig.files != null && mailConfig.files.Count > 0)
            {
                foreach (var file in mailConfig.files)
                {
                    mailOpenIdConfig.attach.Add(new FilesAttach(file.file_base_64, file.ten_file+".pdf"));
                }
            }
            await OpenIdService.ForwardMail(mailOpenIdConfig, defineInfo);
            return Ok(mailConfig);
        }
        /// <summary>
        /// Gửi email làm lại
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> sendmail_v2()
        {
            var json = Request.GetDataRequestNew(GetUser());     
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_LAY_TTIN_EMAIL_TEMP, json, "api/partner/send-email");
            return Ok(data);
        }
        /// <summary>
        /// Xuất Excel lấy thông tin từ thủ tục
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ExportExcelV2()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.ExportExcel(objData.data_info.ma_action_api, json, "/api/esmartclaim/export-excel-v2");
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// Đọc hóa đơn điện tử
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<ActionResult> ReadBill()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
            {
                return BadRequest();
            }
            IFormFileCollection files;
            var rq = Request.GetFormDataRequest(GetUser(), out files);
            if (files.Count <= 0)
            {
                throw new Exception("Không tìm thấy file");
            }
            var content = await Utilities.ReadTextFile(files[0]);
            ReadEBill objInput = new ReadEBill();
            objInput.EBillXmlContent = content;
            EBill eBill = await BillService.GetDataBill(objInput);
            //if (eBill != null && !string.IsNullOrEmpty(eBill.InvoiceNumber))
            //{
            //    eBill.Ct = eBill.Items.Item;
            //    eBill.Items = null;
            //    eBill.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
            //    eBill.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
            //    eBill.nsd = tai_lieu.nsd;
            //    eBill.pas = tai_lieu.pas;
            //    eBill.so_id = tai_lieu.so_id;
            //    var eBillJson = JsonConvert.SerializeObject(eBill, Formatting.None, new JsonSerializerSettings
            //    {
            //        ContractResolver = new LowercaseContractResolver()
            //    });
            //    var r_ebill = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PBH_DOC_EBILL_NH, eBillJson, "/api/esmartclaim/excute", defineInfo);
            //}
            return Ok(eBill);
        }
        /// <summary>
        /// GetFileById
        /// </summary>
        /// <param name="ma_doi_tac"></param>
        /// <param name="so_id"></param>
        /// <param name="bt"></param>
        /// <returns></returns>
        private async Task<BaseResponse<bh_file>> GetFileById(string ma_doi_tac, decimal? so_id, decimal? bt)
        {
            var nguoi_dung = GetUser();
            var requestData = "{}";
            requestData = requestData.AddPropertyStringJson("ma_doi_tac_nsd", nguoi_dung.ma_doi_tac)
                                        .AddPropertyStringJson("ma_chi_nhanh_nsd", nguoi_dung.ma_chi_nhanh)
                                        .AddPropertyStringJson("nsd", nguoi_dung.nsd)
                                        .AddPropertyStringJson("pas", nguoi_dung.pas)
                                        .AddPropertyStringJson("ma_doi_tac", ma_doi_tac)
                                        .AddPropertyStringJson("so_id", so_id==null?"0": so_id.Value.ToString())
                                        .AddPropertyStringJson("bt", bt == null ? "0" : bt.Value.ToString());

            return await Request.GetResponeNew<bh_file>(StoredProcedure.PHT_BH_FILE_TAI_FILE, requestData, "/api/esmartclaim/get-file");
        }
        /// <summary>
        /// Export Báo Cáo
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> ExportBaoCao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var objData = await Request.GetResponeNew<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, json);
            json = json.AddPropertyStringJson("url_file", objData.data_info.url_file);
            var file = await Request.ExportBaoCao(objData.data_info.ma_action_api, json);
            try
            {
                var res = file.Result<object>();
                if (res.state_info.status == "NotOK")
                    return Ok(res);
            }
            catch
            {

            }
            return Ok(file.Content.ReadAsByteArrayAsync().Result);
        }
        /// <summary>
        /// Xoay ảnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> RotateImage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, "/api/esmartclaim/rotate-image");
            return Ok(data);
        }
        /// <summary>
        /// Send Email kèm Zalo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> sendEmailZalo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_MCM_GUI_THONG_BAO, json);
            return Ok(data);
        }
        /// <summary>
        /// Send Email kèm Zalo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> sendSMS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DICH_VU_SMS_GUI_THONG_BAO, json);
            return Ok(data);
        }
    }
}
