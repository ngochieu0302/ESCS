using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.COMMON.Http;
using ESCS.COMMON.Request;
using ESCS.COMMON.Response;
using ESCS.MODEL.ESCS;
using ESCS.MODEL.ESCS.ModelView;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using RazorEngine.Configuration;
using RazorEngine.Templating;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Common
{
    public class EscsUtils
    {
        public static IRazorEngineService _service = null;
        public static void CreateConfigRazor()
        {
            TemplateServiceConfiguration config = new TemplateServiceConfiguration();
            config.CachingProvider = new RazorEngine.Templating.DefaultCachingProvider();
            if (_service == null)
                _service = RazorEngineService.Create(config);
        }

        private static Dictionary<string, IEnumerable<escs_menu>> user_menus = new Dictionary<string, IEnumerable<escs_menu>>();
        public static List<ht_cai_dat> cai_dat = null;
        public static escs_dv_google dv_google = null;
        public static void SaveUserMenu(string user, IEnumerable<escs_menu> menu)
        {
            if (!user_menus.ContainsKey(user))
            {
                user_menus.Add(user, menu);
            }
            else
            {
                user_menus[user] = menu;
            }
        }
        public static void RemoveMenu(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                return;
            }
            if (user_menus.ContainsKey(user))
            {
                user_menus.Remove(user);
            }
        }
        public static IEnumerable<escs_menu> GetMenu(string user)
        {
            if (string.IsNullOrEmpty(user))
            {
                return new List<escs_menu>();
            }
            if (user_menus.ContainsKey(user))
            {
                return user_menus[user];
            }
            return new List<escs_menu>();
        }
        public static void CreateFileAndSendEmail(string json, DefineInfo defineInfo, bool gui_email = true)
        {
            Task task = new Task(async () =>
            {
                try
                {
                    thong_tin_in_an cau_hinh = JsonConvert.DeserializeObject<thong_tin_in_an>(json);
                    Dictionary<string, file_result> dsFile = new Dictionary<string, file_result>();
                    #region Lấy ra thông tin mẫu in, ký file, lưu file ký
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in))
                    {
                        var arr = cau_hinh.ma_mau_in.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            if (string.IsNullOrEmpty(cau_hinh.ma))
                            {
                                cau_hinh.ma = "";
                            }
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.CreateAndSignatureFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            dsFile.Add(arr[i], file.data_info);
                        }
                    }
                    #endregion
                    #region Lấy ra thông tin email và gửi email
                    if (!gui_email)
                        return;
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma) && cau_hinh.ma != "")
                    {
                        var arr = cau_hinh.ma.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma = arr[i];
                            var mau_email = await OpenIdService.Excute<ht_email_mau_gui>(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CT, JsonConvert.SerializeObject(cau_hinh), defineInfo);

                            if (string.IsNullOrEmpty(mau_email.data_info.action))
                                throw new Exception("Chưa gán hành động lấy dữ liệu");
                            var res = await OpenIdService.Excute<ThongTinEmail<ThongBaoGiamDinh>>(mau_email.data_info.action, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            if (res.state_info.status != "OK")
                                throw new Exception(res.state_info.message_body);

                            DynamicViewBag dynamicViewBag = new DynamicViewBag();
                            dynamicViewBag.AddValue("Data", res);
                            var _networkCredentials = NetworkCredentials.GetItem("ESCS_PATH_FILE");
                            string path = Path.Combine(_networkCredentials.PathLocal, mau_email.data_info.url ?? "");

                            if (System.IO.File.Exists(path))
                            {
                                string name = mau_email.data_info.ma_doi_tac + mau_email.data_info.ma;
                                string template = "";
                                if (_service.IsTemplateCached(name, null))
                                {
                                    try { template = _service.Run(name, null, null, dynamicViewBag); } catch { throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); }
                                }
                                else
                                {
                                    string htmlTemplate = System.IO.File.ReadAllText(path);
                                    try { 
                                        template = _service.RunCompile(htmlTemplate, name, null, null, dynamicViewBag); 
                                    } catch { throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); }
                                }


                                ThongTinEmail<ThongBaoGiamDinh> config = res.data_info;
                                MailOpenIdConfig mailOpenIdConfig = new MailOpenIdConfig();
                                mailOpenIdConfig.title = config.nguoi_nhan.tieu_de;
                                mailOpenIdConfig.body = template;
                                //Thông tin server mail
                                mailOpenIdConfig.server.smtp_server = config.server_mail.smtp_server;
                                mailOpenIdConfig.server.smtp_port = Convert.ToInt32(config.server_mail.smtp_port);
                                mailOpenIdConfig.server.smtp_username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.server.smtp_password = config.server_mail.smtp_mat_khau;
                                //Thông tin tài khoản gửi
                                mailOpenIdConfig.from.username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.from.password = config.server_mail.smtp_mat_khau;
                                mailOpenIdConfig.from.alias = config.server_mail.ten_hthi;
                                var ds_mail_nhan = config.nguoi_nhan.email.Split(";");
                                foreach (var mail_nhan in ds_mail_nhan)
                                {
                                    if (!string.IsNullOrEmpty(mail_nhan) && mail_nhan.Trim() != "")
                                        mailOpenIdConfig.to.Add(new MailInfo(mail_nhan.Trim()));
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.cc) && config.nguoi_nhan.cc.Trim() != "")
                                {
                                    var ds_mail_cc = config.nguoi_nhan.cc.Split(";");
                                    foreach (var mail_cc in ds_mail_cc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_cc) && mail_cc.Trim() != "")
                                            mailOpenIdConfig.cc.Add(new MailInfo(mail_cc.Trim()));
                                    }
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.bcc) && config.nguoi_nhan.bcc.Trim() != "")
                                {
                                    var ds_mail_bcc = config.nguoi_nhan.bcc.Split(";");
                                    foreach (var mail_bcc in ds_mail_bcc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_bcc) && mail_bcc.Trim() != "")
                                            mailOpenIdConfig.bcc.Add(new MailInfo(mail_bcc.Trim()));
                                    }
                                }
                                if (!string.IsNullOrEmpty(mau_email.data_info.ma_files))
                                {
                                    var dsFileDinhKem = mau_email.data_info.ma_files.Split(",");
                                    var dsTenFileDinhKem = mau_email.data_info.ten_files.Split(",");
                                    for (int j = 0; j < dsFileDinhKem.Count(); j++)
                                    {
                                        if (dsFile.ContainsKey(dsFileDinhKem[j]) && dsFile[dsFileDinhKem[j]]!=null)
                                        {
                                            mailOpenIdConfig.attach.Add(new FilesAttach(Convert.ToBase64String(dsFile[dsFileDinhKem[j]].file), dsTenFileDinhKem[j]));
                                        }
                                    }
                                }
                                await OpenIdService.ForwardMail(mailOpenIdConfig, defineInfo);
                            }
                            else
                            {
                                throw new Exception("Không tìm thấy đường dẫn file mẫu");
                            }
                        }    
                    }
                    #endregion
                }
                catch (Exception ex)
                {

                }
            });
            task.Start();
        }
        public static void SendEmail(string json, DefineInfo defineInfo, bool gui_email = true)
        {
            Task task = new Task(async () =>
            {
                try
                {
                    thong_tin_in_an cau_hinh = JsonConvert.DeserializeObject<thong_tin_in_an>(json);
                    #region Lấy ra thông tin email và gửi email
                    if (!gui_email)
                        return;
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma) && cau_hinh.ma != "")
                    {
                        var arr = cau_hinh.ma.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma = arr[i];
                            var mau_email = await OpenIdService.Excute<ht_email_mau_gui>(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CT, JsonConvert.SerializeObject(cau_hinh), defineInfo);

                            if (string.IsNullOrEmpty(mau_email.data_info.action))
                                throw new Exception("Chưa gán hành động lấy dữ liệu");
                            var res = await OpenIdService.Excute<ThongTinEmail<ThongBaoGiamDinh>>(mau_email.data_info.action, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            if (res.state_info.status != "OK")
                                throw new Exception(res.state_info.message_body);

                            DynamicViewBag dynamicViewBag = new DynamicViewBag();
                            dynamicViewBag.AddValue("Data", res);
                            var _networkCredentials = NetworkCredentials.GetItem("ESCS_PATH_FILE");
                            string path = Path.Combine(_networkCredentials.PathLocal, mau_email.data_info.url ?? "");

                            if (System.IO.File.Exists(path))
                            {
                                string name = mau_email.data_info.ma_doi_tac + mau_email.data_info.ma;
                                string template = "";
                                if (_service.IsTemplateCached(name, null))
                                {
                                    try { template = _service.Run(name, null, null, dynamicViewBag); } catch { throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); }
                                }
                                else
                                {
                                    string htmlTemplate = System.IO.File.ReadAllText(path);
                                    try
                                    {
                                        template = _service.RunCompile(htmlTemplate, name, null, null, dynamicViewBag);
                                    }
                                    catch { throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); }
                                }


                                ThongTinEmail<ThongBaoGiamDinh> config = res.data_info;
                                MailOpenIdConfig mailOpenIdConfig = new MailOpenIdConfig();
                                mailOpenIdConfig.title = config.nguoi_nhan.tieu_de;
                                mailOpenIdConfig.body = template;
                                //Thông tin server mail
                                mailOpenIdConfig.server.smtp_server = config.server_mail.smtp_server;
                                mailOpenIdConfig.server.smtp_port = Convert.ToInt32(config.server_mail.smtp_port);
                                mailOpenIdConfig.server.smtp_username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.server.smtp_password = config.server_mail.smtp_mat_khau;
                                //Thông tin tài khoản gửi
                                mailOpenIdConfig.from.username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.from.password = config.server_mail.smtp_mat_khau;
                                mailOpenIdConfig.from.alias = config.server_mail.ten_hthi;
                                var ds_mail_nhan = config.nguoi_nhan.email.Split(";");
                                foreach (var mail_nhan in ds_mail_nhan)
                                {
                                    if (!string.IsNullOrEmpty(mail_nhan) && mail_nhan.Trim() != "")
                                        mailOpenIdConfig.to.Add(new MailInfo(mail_nhan.Trim()));
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.cc) && config.nguoi_nhan.cc.Trim() != "")
                                {
                                    var ds_mail_cc = config.nguoi_nhan.cc.Split(";");
                                    foreach (var mail_cc in ds_mail_cc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_cc) && mail_cc.Trim() != "")
                                            mailOpenIdConfig.cc.Add(new MailInfo(mail_cc.Trim()));
                                    }
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.bcc) && config.nguoi_nhan.bcc.Trim() != "")
                                {
                                    var ds_mail_bcc = config.nguoi_nhan.bcc.Split(";");
                                    foreach (var mail_bcc in ds_mail_bcc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_bcc) && mail_bcc.Trim() != "")
                                            mailOpenIdConfig.bcc.Add(new MailInfo(mail_bcc.Trim()));
                                    }
                                }
                                await OpenIdService.ForwardMail(mailOpenIdConfig, defineInfo);
                            }
                            else
                            {
                                throw new Exception("Không tìm thấy đường dẫn file mẫu");
                            }
                        }
                    }
                    #endregion
                }
                catch (Exception ex)
                {

                }
            });
            task.Start();
        }
        public async static Task<BaseResponse<List<file_uploads>>> UploadFileToPath(List<file_uploads> files, DefineInfo defineInfo)
        {
            return await OpenIdService.UploadFileToPath<List<file_uploads>>(JsonConvert.SerializeObject(files), defineInfo);
        }
        public static void SignatureFileAndSendEmail(string json, DefineInfo defineInfo, bool gui_email = true)
        {
            Task task = new Task(async () =>
            {
                try
                {
                    thong_tin_in_an cau_hinh = JsonConvert.DeserializeObject<thong_tin_in_an>(json);
                    Dictionary<string, file_result> dsFile = new Dictionary<string, file_result>();
                    #region Lấy ra thông tin mẫu in, ký file, lưu file ký
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in))
                    {
                        var arr = cau_hinh.ma_mau_in.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.SignatureFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            dsFile.Add(arr[i], file.data_info);
                        }
                    }
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in_khong_ky_so))
                    {
                        var arr = cau_hinh.ma_mau_in_khong_ky_so.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.CreateSaveFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            dsFile.Add(arr[i], file.data_info);
                        }
                    }
                    #endregion
                    #region Lấy ra thông tin email và gửi email
                    if (!gui_email)
                        return;
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma) && cau_hinh.ma != "")
                    {
                        var arr = cau_hinh.ma.Split(",");//ma_mail_001,ma_mail_002
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma = arr[i];
                            var mau_email = await OpenIdService.Excute<ht_email_mau_gui>(StoredProcedure.PHT_MAIL_MAU_GUI_LKE_CT, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            if (string.IsNullOrEmpty(mau_email.data_info.action))
                                throw new Exception("Chưa gán hành động lấy dữ liệu");
                            DynamicViewBag dynamicViewBag = new DynamicViewBag();
                            var res = await OpenIdService.Excute<ThongTinEmail<ThongBaoGiamDinh>>(mau_email.data_info.action, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            if (res.state_info.status != "OK")
                                throw new Exception(res.state_info.message_body);
                            dynamicViewBag.AddValue("Data", res);
                            var _networkCredentials = NetworkCredentials.GetItem("ESCS_PATH_FILE");
                            string path = Path.Combine(_networkCredentials.PathLocal, mau_email.data_info.url ?? "");
                            if (System.IO.File.Exists(path))
                            {
                                string name = mau_email.data_info.ma_doi_tac + mau_email.data_info.ma;
                                string template = "";
                                if (_service.IsTemplateCached(name, null))
                                {
                                    try { template = _service.Run(name, null, null, dynamicViewBag); } catch { throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); }
                                }
                                else
                                {
                                    string htmlTemplate = System.IO.File.ReadAllText(path);
                                    try
                                    {
                                        template = _service.RunCompile(htmlTemplate, name, null, null, dynamicViewBag);
                                    }
                                    catch(Exception ex) 
                                    { 
                                        throw new Exception("Có lỗi xảy ra trong quá trình gán dữ liệu vào mẫu"); 
                                    }
                                }
                                ThongTinEmail<ThongBaoGiamDinh> config = res.data_info;
                                MailOpenIdConfig mailOpenIdConfig = new MailOpenIdConfig();
                                mailOpenIdConfig.title = config.nguoi_nhan.tieu_de;
                                mailOpenIdConfig.body = template;
                                //Thông tin server mail
                                mailOpenIdConfig.server.smtp_server = config.server_mail.smtp_server;
                                mailOpenIdConfig.server.smtp_port = Convert.ToInt32(config.server_mail.smtp_port);
                                mailOpenIdConfig.server.smtp_username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.server.smtp_password = config.server_mail.smtp_mat_khau;
                                //Thông tin tài khoản gửi
                                mailOpenIdConfig.from.username = config.server_mail.smtp_tai_khoan;
                                mailOpenIdConfig.from.password = config.server_mail.smtp_mat_khau;
                                mailOpenIdConfig.from.alias = config.server_mail.ten_hthi;
                                var ds_mail_nhan = config.nguoi_nhan.email.Split(";");
                                foreach (var mail_nhan in ds_mail_nhan)
                                {
                                    if (!string.IsNullOrEmpty(mail_nhan) && mail_nhan.Trim() != "")
                                        mailOpenIdConfig.to.Add(new MailInfo(mail_nhan.Trim()));
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.cc) && config.nguoi_nhan.cc.Trim() != "")
                                {
                                    var ds_mail_cc = config.nguoi_nhan.cc.Split(";");
                                    foreach (var mail_cc in ds_mail_cc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_cc) && mail_cc.Trim() != "")
                                            mailOpenIdConfig.cc.Add(new MailInfo(mail_cc.Trim()));
                                    }
                                }
                                if (!string.IsNullOrEmpty(config.nguoi_nhan.bcc) && config.nguoi_nhan.bcc.Trim() != "")
                                {
                                    var ds_mail_bcc = config.nguoi_nhan.bcc.Split(";");
                                    foreach (var mail_bcc in ds_mail_bcc)
                                    {
                                        if (!string.IsNullOrEmpty(mail_bcc) && mail_bcc.Trim() != "")
                                            mailOpenIdConfig.bcc.Add(new MailInfo(mail_bcc.Trim()));
                                    }
                                }
                                if (!string.IsNullOrEmpty(mau_email.data_info.ma_files))
                                {
                                    var dsFileDinhKem = mau_email.data_info.ma_files.Split(",");
                                    var dsTenFileDinhKem = mau_email.data_info.ten_files.Split(",");
                                    for (int j = 0; j < dsFileDinhKem.Count(); j++)
                                    {
                                        if (dsFile.ContainsKey(dsFileDinhKem[j]))
                                        {
                                            if (dsFile[dsFileDinhKem[j]]!=null)
                                            {
                                                mailOpenIdConfig.attach.Add(new FilesAttach(Convert.ToBase64String(dsFile[dsFileDinhKem[j]].file), dsTenFileDinhKem[j]));
                                            }
                                        }
                                    }
                                }
                                await OpenIdService.ForwardMail(mailOpenIdConfig, defineInfo);
                            }
                            else
                            {
                                throw new Exception("Không tìm thấy đường dẫn file mẫu");
                            }
                        }
                    }
                    #endregion
                }
                catch (Exception ex)
                {

                }
            });
            task.Start();
        }
        public static void CreateSaveFile(string json, DefineInfo defineInfo)
        {
            Task task = new Task(async () =>
            {
                try
                {
                    thong_tin_in_an cau_hinh = JsonConvert.DeserializeObject<thong_tin_in_an>(json);
                    if (!string.IsNullOrEmpty(cau_hinh.ma_dt_trinh))
                    {
                        cau_hinh.so_id_dt = cau_hinh.ma_dt_trinh;
                    }
                    Dictionary<string, file_result> dsFile = new Dictionary<string, file_result>();
                    #region Lấy ra thông tin mẫu in, ký file, lưu file ký
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in))
                    {
                        var arr = cau_hinh.ma_mau_in.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            if (string.IsNullOrEmpty(cau_hinh.ma))
                            {
                                cau_hinh.ma = "";
                            }
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.CreateSaveFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            dsFile.Add(arr[i], file.data_info);
                        }
                    }
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in_khong_ky_so))
                    {
                        var arr = cau_hinh.ma_mau_in_khong_ky_so.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.CreateSaveFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                        }
                    }
                    #endregion
                }
                catch (Exception ex)
                {

                }
            });
            task.Start();
        }
        public static void RemoveFile(string json, DefineInfo defineInfo)
        {
            Task task = new Task(async () =>
            {
                try
                {
                    thong_tin_in_an cau_hinh = JsonConvert.DeserializeObject<thong_tin_in_an>(json);
                    if (!string.IsNullOrEmpty(cau_hinh.ma_dt_trinh))
                    {
                        cau_hinh.so_id_dt = cau_hinh.ma_dt_trinh;
                    }
                    #region Lấy ra thông tin mẫu in, ký file, lưu file ký
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in))
                    {
                        var arr = cau_hinh.ma_mau_in.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            if (string.IsNullOrEmpty(cau_hinh.ma))
                            {
                                cau_hinh.ma = "";
                            }
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.RemoveFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                        }
                    }
                    if (cau_hinh != null && !string.IsNullOrEmpty(cau_hinh.ma_mau_in_khong_ky_so))
                    {
                        var arr = cau_hinh.ma_mau_in_khong_ky_so.Split(",");
                        for (int i = 0; i < arr.Count(); i++)
                        {
                            cau_hinh.ma_mau_in = arr[i];
                            var mau_in = await OpenIdService.Excute<ht_mau_in>(StoredProcedure.PHT_MAU_IN_LKE_IN, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                            cau_hinh.url_file = mau_in.data_info.url_file;
                            cau_hinh.ten_mau_in = mau_in.data_info.ten;
                            var file = await OpenIdService.RemoveFile(mau_in.data_info.ma_action_api, JsonConvert.SerializeObject(cau_hinh), defineInfo);
                        }
                    }
                    #endregion
                }
                catch (Exception ex)
                {

                }
            });
            task.Start();
        }
    }
}
