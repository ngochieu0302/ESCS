#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\Expertationcost\_ExpertationcostCommonInfo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e8c33973f550fffb2827566d699498a0d2445c8d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_Expertationcost__ExpertationcostCommonInfo), @"mvc.1.0.view", @"/Areas/Manager/Views/Expertationcost/_ExpertationcostCommonInfo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e8c33973f550fffb2827566d699498a0d2445c8d", @"/Areas/Manager/Views/Expertationcost/_ExpertationcostCommonInfo.cshtml")]
    public class Areas_Manager_Views_Expertationcost__ExpertationcostCommonInfo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
            <div class=""card-body p-1"">
                <div class=""border mb-2 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p");
            WriteLiteral(@"-2 card-title-bg border-bottom"">
                        <h5 class=""m-0"">Quá trình giải quyết</h5>
                    </div>
                    <div class=""timeline mt-2"" id=""navQuaTrinhGiaiQuyetTimeLine""></div>
                </div>
            </div>
        </div>
    </div>
</div>");
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