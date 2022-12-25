using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Formatting;
using System.Threading.Tasks;
using ESCS.COMMON;
using ESCS.COMMON.Http;
using ESCS.COMMON.VideoCall;
using ECSS.Hubs;
using ESCS.Hubs;
using ESCS.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using ESCS.COMMON.Common;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;
using Microsoft.AspNetCore.Http.Features;
using ESCS.Common;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using ESCS.COMMON.Contants;

namespace ESCS
{
    /// <summary>
    /// <PreserveCompilationContext>true</PreserveCompilationContext>
	/// <RazorCompileOnPublish>false</RazorCompileOnPublish>
	/// <CopyRazorGenerateFilesToPublishDirectory>true</CopyRazorGenerateFilesToPublishDirectory>
    /// </summary>
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
           .SetBasePath(env.ContentRootPath)
           .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
           .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
           .AddEnvironmentVariables();
            this.Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }
        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton(Configuration.GetSection("HttpConfiguration").Get<HttpConfiguration>());
            services.AddSingleton(Configuration.GetSection("BGHttpConfiguration").Get<BGHttpConfiguration>());
            services.AddSingleton(Configuration.GetSection("AppSettings").Get<AppSettings>());
            services.AddSingleton(Configuration.GetSection("NetworkCredentials").Get<NetworkCredentials>());
            services.AddSingleton(Configuration.GetSection("HeaderConfiguration").Get<HeaderConfiguration>());
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddScoped<IHttpService, HttpService>();
            services.AddScoped<IUserConnectionManager, UserConnectionManager>();
            if (AppSettings.RazorRuntimeCompilation)
                services.AddControllersWithViews().AddRazorRuntimeCompilation();
            services.AddMvc().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore);
            services.AddCommonService();
            services.AddSignalR();
            services.AddDistributedMemoryCache();
            services.AddHttpContextAccessor();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromMinutes(HttpConfiguration.SessionTimeOut);
            });
            services.ConfigureApplicationCookie(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.SecurePolicy = HttpConfiguration.Secure ? CookieSecurePolicy.Always : CookieSecurePolicy.None;
                options.Cookie.Expiration = TimeSpan.FromMinutes(HttpConfiguration.SessionTimeOut);
                options.ExpireTimeSpan = TimeSpan.FromMinutes(HttpConfiguration.SessionTimeOut);
                options.SlidingExpiration = true;
            });
            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = long.MaxValue;
                options.MultipartHeadersLengthLimit = int.MaxValue;
            });
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.Configure<IISServerOptions>(options =>
            {
                options.AllowSynchronousIO = true;
                options.MaxRequestBodySize = int.MaxValue;
            });
            if (string.IsNullOrEmpty(AppSettings.Version))
                AppSettings.Version = VersionConstants.v1_0_0;
            EscsUtils.CreateConfigRazor();
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (AppSettings.UseDeveloperExceptionPage)
                app.UseDeveloperExceptionPage();

            var path = Directory.GetCurrentDirectory();
            loggerFactory.AddFile($"{path}\\Logs\\Log.txt");

            app.UseStatusCodePages();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!AppSettings.UseDeveloperExceptionPage)
                app.UseMiddleware<ErrorHandler>();
            app.UseRouting();
            app.UseAuthorization();
            app.UseSession();
            if (HeaderConfiguration.XFrameOptionsEnbale)
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("X-Frame-Options", HeaderConfiguration.XFrameOptions);
                    await next();
                });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "areas",
                    pattern: "{area:exists}/{controller=Home}/{action=Index}");

                endpoints.MapControllerRoute(
                    name: "dang-nhap",
                    pattern: "dang-nhap",
                    defaults: new { controller = "Home", action = "Login" });

                endpoints.MapControllerRoute(
                    name: "bo-sung-ho-so",
                    pattern: "bo-sung-ho-so",
                    defaults: new { controller = "ClaimOnline", action = "BoSungHoSo" });

                endpoints.MapControllerRoute(
                    name: "khai-bao-boi-thuong-xe",
                    pattern: "khai-bao-boi-thuong-xe",
                    defaults: new { controller = "ClaimOnline", action = "KhaiBaoBTXE" });

                endpoints.MapControllerRoute(
                   name: "danh-gia-rui-ro",
                   pattern: "danh-gia-rui-ro",
                   defaults: new { controller = "ClaimOnline", action = "DanhGiaRuiRo" });

                endpoints.MapControllerRoute(
                    name: "khach-hang-xac-nhan",
                    pattern: "khach-hang-xac-nhan",
                    defaults: new { controller = "ClaimOnline", action = "KhachHangXacNhan" });

                endpoints.MapControllerRoute(
                    name: "chup-anh",
                    pattern: "r/{ma}",
                    defaults: new { controller = "ClaimOnline", action = "ChupAnh" });

                endpoints.MapControllerRoute(
                    name: "tra-cuu",
                    pattern: "tra-cuu/{version}",
                    defaults: new { controller = "ClaimOnline", action = "TraCuu" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}"
                );

                endpoints.MapControllerRoute(name: "Error",
                                                "error",
                                                new { controller = "Home", action = "Error" });

                endpoints.MapControllerRoute(name: "PageNotFound",
                                                "pagenotfound",
                                                new { controller = "Home", action = "PageNotFound" });
                endpoints.MapHub<SendNotifyHub>("/notify-service");

            });
        }
    }
}


