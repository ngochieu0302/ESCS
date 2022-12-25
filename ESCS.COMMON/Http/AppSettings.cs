using System;
using System.Collections.Generic;
using System.Text;

namespace ESCS.COMMON.Http
{
    public class AppSettings
    {
        public static string AppName { get; set; }
        public static string AppDomain { get; set; }
        public static string AppDomainLive { get; set; }
        public static string SecretKeyData { get; set; }
        public static double TimeRecoverPass { get; set; }
        public static bool UseCaptcha { get; set; }
        public static string KeyEryptData { get; set; }
        public static bool ConnectApiCorePartner { get; set; }
        public static bool ConnectApiCorePartnerHealth { get; set; }
        public static bool InsuranceToCore { get; set; }
        public static bool WriteLogFile { get; set; }
        public static bool UseDeveloperExceptionPage { get; set; }
        public static string Version { get; set; }
        public static bool RazorRuntimeCompilation { get; set; }
    }
}
