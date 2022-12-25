using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.Http
{
    public class BGHttpConfiguration
    {
        public static string BaseUrl { get; set; }
        public static string Token { get; set; }
        public static string BHAccessToken { get; set; }
        public static string BHSecretKey { get; set; }
        public static string BHPartnerCode { get; set; }

        public static string GRAccessToken { get; set; }
        public static string GRSecretKey { get; set; }
        public static string GRPartnerCode { get; set; }
    }
}
