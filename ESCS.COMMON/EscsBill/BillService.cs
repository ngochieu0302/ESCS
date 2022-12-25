using ESCS.COMMON.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace ESCS.COMMON.EscsBill
{
    public class BillService
    {
        public static async Task<EBill> GetDataBill(ReadEBill objInput)
        {
            using (HttpClient service = new HttpClient())
            {
                service.BaseAddress = new Uri(HttpConfiguration.BaseUrl);
                service.DefaultRequestHeaders.Clear();
                service.DefaultRequestHeaders.Add("ePartnerCode", HttpConfiguration.PartnerCode);
                service.DefaultRequestHeaders.Add("eAuthToken", HttpConfiguration.AccessToken);
                service.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                var res =  await service.PostAsJsonAsync("/api/esmartclaim/invoice", objInput);
                var jsonString = res.Content.ReadAsStringAsync().Result;
                var data = JsonConvert.DeserializeObject<EBill>(jsonString);
                return data;
            }
        }
    }
}
