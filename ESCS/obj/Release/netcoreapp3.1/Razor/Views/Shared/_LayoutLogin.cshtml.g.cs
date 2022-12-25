#pragma checksum "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7c8a2ac35601fe61d22bae244fd1876190f668a6"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__LayoutLogin), @"mvc.1.0.view", @"/Views/Shared/_LayoutLogin.cshtml")]
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
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7c8a2ac35601fe61d22bae244fd1876190f668a6", @"/Views/Shared/_LayoutLogin.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__LayoutLogin : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
  
    var domainName = Context.Request.Scheme + "://" + Context.Request.Host.Value.ToString().ToLower();
    if (domainName.Contains("localhost") || domainName.Contains(ESCS.COMMON.Http.AppSettings.AppDomain))
        domainName = ESCS.COMMON.Http.AppSettings.AppDomainLive;
    ht_cai_dat setting = ESCS.Common.EscsUtils.cai_dat?.Where(n => n.domain == domainName).FirstOrDefault();

    var favicon = "images/favicon.png";
    if (setting != null && setting.cai_dat.Count()>0)
    {
        var cai_dat_favicon = setting.cai_dat.Where(n => n.loai == "FAVICON").FirstOrDefault();
        favicon = cai_dat_favicon != null && !string.IsNullOrEmpty(cai_dat_favicon.url_anh) ? cai_dat_favicon.url_anh : favicon;
    }

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html dir=\"ltr\">\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7c8a2ac35601fe61d22bae244fd1876190f668a64161", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n    <!-- Tell the browser to be responsive to screen width -->\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n    <meta name=\"keywords\"");
                BeginWriteAttribute("content", " content=\"", 1049, "\"", 1059, 0);
                EndWriteAttribute();
                WriteLiteral(">\r\n    <meta name=\"description\"");
                BeginWriteAttribute("content", " content=\"", 1091, "\"", 1126, 1);
#nullable restore
#line 23 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
WriteAttributeValue("", 1101, setting?.doi_tac.ten_tat, 1101, 25, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">\r\n    <meta name=\"robots\" content=\"noindex,nofollow\">\r\n    <title");
                BeginWriteAttribute("default", " default=\"", 1193, "\"", 1224, 1);
#nullable restore
#line 25 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
WriteAttributeValue("", 1203, setting?.doi_tac.ten, 1203, 21, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">Đăng nhập - ");
#nullable restore
#line 25 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
                                                  Write(setting?.doi_tac.ten_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral("</title>\r\n    <link rel=\"canonical\"");
                BeginWriteAttribute("href", " href=\"", 1298, "\"", 1305, 0);
                EndWriteAttribute();
                WriteLiteral(" />\r\n    <!-- Favicon icon -->\r\n    <link rel=\"icon\" type=\"image/x-icon\" sizes=\"16x16\"");
                BeginWriteAttribute("href", " href=\"", 1392, "\"", 1408, 2);
                WriteAttributeValue("", 1399, "/", 1399, 1, true);
#nullable restore
#line 28 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
WriteAttributeValue("", 1400, favicon, 1400, 8, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(@">
    <!-- Custom CSS -->
    <link href=""../../css/style.css"" rel=""stylesheet"">
    <style>
        .auth-wrapper {
            position: relative;
            min-height: 100vh;
        }

            .auth-wrapper #recoverform {
                display: none;
            }

            .auth-wrapper #recoverformSuccess {
                display: none;
            }

        .auth-box {
            width: 20%;
        }

        input.form-control {
            height: 32px;
        }
    </style>
");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7c8a2ac35601fe61d22bae244fd1876190f668a67865", async() => {
                WriteLiteral("\r\n    ");
#nullable restore
#line 55 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
Write(RenderBody());

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
    <script src=""../libs/jquery/dist/jquery.min.js""></script>
    <script src=""../libs/popper.js/dist/umd/popper.min.js""></script>
    <script src=""../libs/bootstrap/dist/js/bootstrap.min.js""></script>
    <script>
        $('#to-recover').on(""click"", function () {
            $(""#loginform"").slideUp();
            $(""#recoverform"").fadeIn();
        });
        $('#back-login').on(""click"", function () {
            $(""#recoverform"").slideUp();
            $(""#loginform"").fadeIn();
        });
        $('#back-login-success').on(""click"", function () {
            $(""#recoverformSuccess"").slideUp();
            $(""#loginform"").fadeIn();
        });
    </script>
    ");
#nullable restore
#line 73 "D:\ESCS\ESCS\Views\Shared\_LayoutLogin.cshtml"
Write(RenderSection("Scripts", required: false));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>\r\n");
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
