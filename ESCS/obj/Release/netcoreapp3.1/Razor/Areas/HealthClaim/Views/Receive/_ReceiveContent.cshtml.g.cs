#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\Receive\_ReceiveContent.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_Receive__ReceiveContent), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/Receive/_ReceiveContent.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f", @"/Areas/HealthClaim/Views/Receive/_ReceiveContent.cshtml")]
    public class Areas_HealthClaim_Views_Receive__ReceiveContent : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_ReceiveContent_2", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_ReceiveContent_1", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_ReceiveContent_3", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_ReceiveContent_4", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_ReceiveContent_5", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""card border mb-0 p-2"" style=""height:unset"">
    <div class=""card-body p-1"" style=""padding:0px; height: 83vh !important;"" id=""navBoiThuong"">
        <ul class=""nav nav-pills font-weight-bold"" role=""tablist"" style=""background-color:#f8f9fa;"">
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""collapse"" href=""#sidebar_info"" role=""button"" id=""main_collapse"">
                    <i class=""fas fa-chevron-left""></i>
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layDsTaiLieu()"" href=""#tabHoSoGiayTo"" role=""tab"" aria-controls=""home"" aria-selected=""false"">
                    <i class=""fas fa-file-image  mr-2""></i>H??? s??, ch???ng t??? y??u c???u
                </a>
            </li>

            <li class=""nav-item"">
                <a class=""nav-link active"" id=""tabThongTinYeuCau_click"" data-toggle=""tab"" href=""#tabThongTinYeuCau"" role=""tab"" aria-controls=""home"" aria-selected=""tru");
            WriteLiteral(@"e"">
                    <i class=""fas fa-align-justify mr-2""></i>Th??ng tin y??u c???u tr??? ti???n b???o hi???m
                </a>
            </li>

            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layThongTinChungTu()"" href=""#tabThongTinThanhToan"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                    <i class=""fal fa-money-bill-alt mr-2""></i>Th??ng tin thanh to??n, th??? h?????ng
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layLichSuTonThat()"" href=""#tabThongTinLichSuTonThat"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                    <i class=""fas fa-history mr-2""></i>L???ch s??? b???i th?????ng
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layLichSuTonThatTop5()"" href=""#tabThongTinLichSuTonThatTop5"" role=""tab"" aria-controls=""profile"" aria-selected=");
            WriteLiteral(@"""false"">
                    <i class=""fas fa-layer-group mr-2""></i>Top 5 h???p ?????ng t??i t???c
                </a>
            </li>
        </ul>
        <div class=""tab-content"" style=""border: unset;"">
            <div class=""tab-pane"" role=""tabpanel"" id=""tabHoSoGiayTo"" style=""padding-bottom:unset !important"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f6753", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane active\" role=\"tabpanel\" id=\"tabThongTinYeuCau\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f7997", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane\" role=\"tabpanel\" id=\"tabThongTinThanhToan\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f9237", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane pl-0\" role=\"tabpanel\" id=\"tabThongTinLichSuTonThat\" style=\"position: absolute; width:100%;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f10528", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_3.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane pl-0\" role=\"tabpanel\" id=\"tabThongTinLichSuTonThatTop5\" style=\"position: absolute; width:100%;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef22fdff30a0f0dd833bfc5dd990a46e282b0b2f11824", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
        </div>
    </div>
</div>
<div class=""row tab-navigator"">
    <div class=""col-12 mg-t-10 px-2"">
        <a href=""javascript:void(0)"" id=""btnXemQRCode"" class=""mr-2"">
            <i class=""fa fa-qrcode mr-1""></i> Xem QRCode
        </a>
        <a href=""javascript:void(0)"" id=""btnNhanHoSoTN"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-share-square mr-1""></i> Nh???n h??? s??
        </a>
        <a href=""javascript:void(0)"" id=""btnYeuCauBoSungHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-file-plus mr-1""></i> Y??u c???u b??? sung h??? s??
        </a>
        <a href=""javascript:void(0)"" id=""btnHuyHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-file-times mr-1""></i> H???y h??? s??
        </a>
        <a href=""javascript:void(0)"" id=""btnGoHuyHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-trash-undo-alt mr-1""></i> G??? H???y h??? s??
        </a>
        <a href=""javascript:void(0)"" id=""btnChuyenBoiThuong"" class=""escs_pquyen mr-2"">
     ");
            WriteLiteral(@"       <i class=""fas fa-share mr-1""></i> Chuy???n sang b??? ph???n t??nh to??n
        </a>
        <a href=""javascript:void(0)"" id=""btnChuyenNguoiXuLy"" class=""escs_pquyen mr-2"">
            <i class=""far fa-user-friends mr-1""></i> Chuy???n ng?????i x??? l??
        </a>
        <a href=""javascript:void(0)"" id=""btnXemQlMIC"" class=""mr-2"">
            <i class=""fas fa-file-search mr-1""></i> Xem quy???n l???i MIC
        </a>
        <a href=""#"" id=""btnNhanHoSoGoc"" class=""mr-2"">
            <i class=""fas fa-inbox-in mr-1""></i> Nh???n h??? s?? g???c
        </a>
        <a href=""javascript:void(0)"" id=""btnGuiEmailThongBao"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-envelope mr-1""></i> G???i email
        </a>
        <a href=""#"" id=""btnPrint"" class=""mr-2"">
            <i class=""fas fa-print mr-1""></i> In ???n
        </a>
    </div>
</div>


");
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
