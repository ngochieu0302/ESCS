#pragma checksum "D:\ESCS\ESCS\Views\Home\KiemTraHeThong.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "99c3c8195a9fdcd55f3f9912bda4f1dfb35b24f8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_KiemTraHeThong), @"mvc.1.0.view", @"/Views/Home/KiemTraHeThong.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"99c3c8195a9fdcd55f3f9912bda4f1dfb35b24f8", @"/Views/Home/KiemTraHeThong.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_KiemTraHeThong : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\Home\KiemTraHeThong.cshtml"
  
    Layout = "_LayoutLogin";

#line default
#line hidden
#nullable disable
            DefineSection("scripts", async() => {
                WriteLiteral(@"
    <script>
        var data = {
            define_info:
            {
                accept: ""*/*"", accept_encoding: ""gzip, deflate"",
                host: ""com.escs.mobile"",
                referer: ""com.escs.mobile"",
                user_agent: ""ESCS Mobile - Android/1.0.5"", 
                origin: ""com.escs.mobile"",
                ip_remote_ipv4: ""2586bb417d3f65f1"",
                ip_remote_ipv6: ""2586bb417d3f65f1"",
                time: ""20210621182435""
            },
            data_info: {
                ma_doi_tac_nsd: ""CTYBHABC"",
                ma_chi_nhanh_nsd: ""000"",
                nsd: ""admin@escs.vn"",
                pas: ""6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090""
            }
        }
        function postData(url, data) {
            return new Promise((resolve, reject) => {
                var rq = {
                    cache: false,
                    datatype: 'json'
                }
                rq.headers={
             ");
                WriteLiteral(@"       ePartnerCode: ""ESCS_ADMIN"",
                    eAction: ""O8XZRU5OI6NL493"",
                    eAuthToken: ""ef76d82726313f99fe47db591465dc1f"",
                    eSignature: ""7a7ba69ef5c898d629f20936cddfd790f4bd9bd42ced6cd2fcd84389f4f47bb5"",
                    eEnvirontment:""DEV""
                }
                rq.type = 'post';
                rq.url = url;
                rq.data = JSON.stringify(data);
                rq.success = function (response) {
                    resolve(response);
                };
                rq.error = function (err) {
                    reject(err);
                };
                $.ajax(rq);
            });
        }
        document.write(""Ki???m tra h??? th???ng"");
        for (var i = 0; i < 2; i++) {
            postData(""http://cloudapi.escs.vn/api/esmartclaim/excute"", data).then(res => {
                document.write(res.state_info.message_body);
            });
        }
        //setTimeout(function () {
        //    location.");
                WriteLiteral("reload()\r\n        //}, 5000);\r\n    </script>\r\n");
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
