#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_HealthCommonInfo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a52dfd1559dd200b6d4d04ddb7c12af8e455f4ef"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__HealthCommonInfo), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_HealthCommonInfo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a52dfd1559dd200b6d4d04ddb7c12af8e455f4ef", @"/Areas/HealthClaim/Views/_HealthCommonInfo.cshtml")]
    public class Areas_HealthClaim_Views__HealthCommonInfo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""card mb-0 h-100"" id=""navThongTinHoSo"">
    <ul class=""nav nav-tabs profile-tab"" role=""tablist"">
        <li class=""nav-item shown"">
            <a class=""nav-link active"" data-toggle=""tab"" href=""#navThongTinChung"" role=""tab"" aria-selected=""true"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-info-circle""></i> Thông tin chung
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-info-circle""></i>
                </span>
            </a>
        </li>
        <li class=""nav-item shown"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navThongTinLienHe"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-clinic-medical""></i> Thông tin CSYT
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-history""></i>
                </span>
            </a>
        ");
            WriteLiteral(@"</li>
        <li class=""nav-item"" onclick=""xemQuaTrinhXuLy('navQuaTrinhGiaiQuyet')"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navQuaTrinhGiaiQuyet"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-history mr-1""></i> Quá trình xử lý
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-eye""></i>
                </span>
            </a>
        </li>
    </ul>
    <!-- Tab panes -->
    <div class=""tab-content border border-top-0 scrollable"">
        <div class=""tab-pane active p-0"" id=""navThongTinChung"" role=""tabpanel""></div>
        <div class=""tab-pane p-0"" id=""navThongTinLienHe"" role=""tabpanel""></div>
        <div class=""tab-pane p-0"" id=""navQuaTrinhGiaiQuyet"" role=""tabpanel"">
            <div class=""card-body p-2"" style=""padding-top:5px;"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between ");
            WriteLiteral("align-items-center p-2 card-title-bg border-bottom\">\r\n                        <h5 class=\"m-0\">Quá trình giải quyết</h5>\r\n                        <span><a href=\"#\" id=\"btnXemTienTrinhGiaiQuyet\" data-toggle=\"modal\" ");
            WriteLiteral("><i class=\"far fa-stream\"></i></a></span>\r\n                    </div>\r\n                    <div class=\"timeline mt-2\" id=\"navQuaTrinhGiaiQuyetTimeLine\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
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
