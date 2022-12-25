using ESCS.COMMON.Common;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ESCS.COMMON.Http
{
    public class OCRService
    {
        public static async Task<T> OCRCar<T>(byte[] file, string base_url, string api_key)
        {
            var decript = Utilities.DecryptByKey(api_key, AppSettings.KeyEryptData);
            if (!string.IsNullOrEmpty(decript))
                api_key = decript;
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(base_url);
                    client.DefaultRequestHeaders.Add("api_key", api_key);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "file", "file.jpg");
                        var response = await client.PostAsync("/api/v1/gtcn/extract-sync", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return JsonConvert.DeserializeObject<T>(jsonString);
                    }
                }
            }
        }
        public static async Task<string> OCRCar(byte[] file, string base_url, string api_key)
        {
            var decript = Utilities.DecryptByKey(api_key, AppSettings.KeyEryptData);
            if (!string.IsNullOrEmpty(decript))
                api_key = decript;
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(base_url);
                    client.DefaultRequestHeaders.Add("api_key", api_key);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "file", "file.jpg");
                        var response = await client.PostAsync("/api/v1/gtcn/extract-sync", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return jsonString;
                    }
                }
            }
        }
        public static async Task<T> NhanDienAnhTonThat<T>(string baseUrl, string api_key, byte[] file)
        {
            var decript = Utilities.DecryptByKey(api_key, AppSettings.KeyEryptData);
            if (!string.IsNullOrEmpty(decript))
                api_key = decript;

            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Add("api-key", api_key);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "image", "image.jpg");
                        form.Add(new StringContent("true"), "return_base64");
                        var response = await client.PostAsync("/dmp/cardam/detect", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return JsonConvert.DeserializeObject<T>(jsonString);
                    }
                }
            }
        }

        public static async Task<T> OCRFPTBangLaiXe<T>(string baseUrl, string api_key, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Add("api_key", api_key);

                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "image", "image.jpg");
                        var response = await client.PostAsync("/vision/dlr/vnm", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return JsonConvert.DeserializeObject<T>(jsonString);
                    }
                }
            }
        }
        public static async Task<T> OCRFPTDangKy<T>(string baseUrl, string api_key, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Add("api_key", api_key);

                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "image", "image.jpg");
                        var response = await client.PostAsync("/vision/vrr/vnm", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return JsonConvert.DeserializeObject<T>(jsonString);
                    }
                }
            }
        }
        public static async Task<T> OCRFPTDangKiem<T>(string baseUrl, string api_key, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Add("api_key", api_key);

                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "image", "image.jpg");
                        var response = await client.PostAsync("/vision/vnm/inspection-cert", form);
                        var jsonString = response.Content.ReadAsStringAsync().Result;
                        return JsonConvert.DeserializeObject<T>(jsonString);
                    }
                }
            }
        }

        //OCR Computer vision
        public static async Task<string> OCRCVSDangKiemXe(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/vehicle_inspection?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
        public static async Task<string> OCRCVSGPLX(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/document/hospital_discharge_paper?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
        public static async Task<string> OCRCVSDangKyXe(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/document/hospital_discharge_paper?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
        public static async Task<string> OCRCVSGiayRaVien(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/document/hospital_discharge_paper?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
        public static async Task<string> OCRCVSHoaDonVienPhi(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/document/pvi_invoice?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
        public static async Task<string> OCRCVSBangKeChiPhi(string baseUrl, string api_key, string api_secret, byte[] file)
        {
            using (var client = new HttpClient())
            {
                using (MultipartFormDataContent form = new MultipartFormDataContent())
                {
                    var authToken = Encoding.ASCII.GetBytes($"{api_key}:{api_secret}");
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(authToken));
                    using (MemoryStream ms = new MemoryStream())
                    {
                        form.Add(new ByteArrayContent(file), "img", "img.jpg");
                        var response = await client.PostAsync("/api/v2/ocr/document/invoice_full?get_thumb=true&format_type=file", form);
                        return response.Content.ReadAsStringAsync().Result;
                    }
                }
            }
        }
    }
}
