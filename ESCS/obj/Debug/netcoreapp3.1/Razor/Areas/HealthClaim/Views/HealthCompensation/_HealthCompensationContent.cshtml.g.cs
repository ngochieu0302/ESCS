#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\HealthCompensation\_HealthCompensationContent.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "08319cac43ee0b7d60e458dbd200f00566f291d3"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_HealthCompensation__HealthCompensationContent), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/HealthCompensation/_HealthCompensationContent.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"08319cac43ee0b7d60e458dbd200f00566f291d3", @"/Areas/HealthClaim/Views/HealthCompensation/_HealthCompensationContent.cshtml")]
    public class Areas_HealthClaim_Views_HealthCompensation__HealthCompensationContent : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_1", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_2", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_3", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_4", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_5", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", "_HealthCompensationContent_6", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
    <div class=""card-body p-1"" style=""padding: 0px; height: 83vh !important;"" id=""navBoiThuong"">
        <ul class=""nav nav-pills font-weight-bold"" id=""HealthCareContentTab"" role=""tablist"" style=""background-color:#f8f9fa;"">
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""collapse"" href=""#sidebar_info"" role=""button"" id=""main_collapse"">
                    <i class=""fas fa-chevron-left""></i>
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link active"" data-toggle=""tab"" id=""tabThongTinYeuCau_click"" href=""#tabThongTinYeuCau"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                    <i class=""fas fa-align-justify mr-2""></i>Thông tin yêu cầu trả tiền BH
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layDsTaiLieu()"" href=""#tabHoSoGiayTo"" role=""tab"" aria-co");
            WriteLiteral(@"ntrols=""home"" aria-selected=""false"">
                    <i class=""fas fa-file-image  mr-2""></i>Hồ sơ, chứng từ yêu cầu
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" href=""#tabTinhToanBoiThuong"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                    <i class=""far fa-calculator-alt mr-2""></i>Tính toán trả tiền BH
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""loadChungTuThuHuong()"" href=""#tabThongTinThanhToan"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                    <i class=""fal fa-money-bill-alt mr-2""></i>Thông tin hóa đơn, thụ hưởng
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layLichSuTonThat()"" href=""#tabThongTinLichSuTonThat"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
      ");
            WriteLiteral(@"              <i class=""fas fa-history mr-2""></i>Lịch sử trả tiền BH
                </a>
            </li>
            <li class=""nav-item"">
                <a class=""nav-link"" data-toggle=""tab"" onclick=""layLichSuTonThatTop5()"" href=""#tabThongTinTop5LichSuTonThat"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                    <i class=""fas fa-layer-group mr-2""></i>Top 5 HĐ tái tục
                </a>
            </li>
        </ul>
        <div class=""tab-content"" style=""border: unset;"">
            <div class=""tab-pane active"" role=""tabpanel"" id=""tabThongTinYeuCau"" style=""padding:10px;"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d37559", async() => {
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
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane\" role=\"tabpanel\" id=\"tabHoSoGiayTo\" style=\"padding:10px;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d38816", async() => {
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
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane\" role=\"tabpanel\" id=\"tabTinhToanBoiThuong\" style=\"padding:10px;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d310080", async() => {
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
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane\" role=\"tabpanel\" id=\"tabThongTinThanhToan\" style=\"padding:10px;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d311345", async() => {
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
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane pl-0\" role=\"tabpanel\" id=\"tabThongTinLichSuTonThat\" style=\"position: absolute; width:100%; padding:10px;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d312651", async() => {
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
            WriteLiteral("\r\n            </div>\r\n            <div class=\"tab-pane pl-0\" role=\"tabpanel\" id=\"tabThongTinTop5LichSuTonThat\" style=\"position: absolute; width:100%; padding:10px;\">\r\n                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("partial", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "08319cac43ee0b7d60e458dbd200f00566f291d313961", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.PartialTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_PartialTagHelper.Name = (string)__tagHelperAttribute_5.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
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
        <a href=""javascript:void(0)"" id=""btnXacNhanKyTay"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-check mr-1""></i> Xác nhận KH ký tay
        </a>
        <a href=""javascript:void(0)"" id=""btnNhanHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-files-medical mr-1""></i> Nhận hồ sơ
        </a>
        <a href=""javascript:void(0)"" id=""btnTraHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-chevron-double-left mr-1""></i> Trả hồ sơ tiếp nhận
        </a>
        <a href=""javascript:void(0)"" id=""btnXemQRCode"" class=""mr-2"">
            <i class=""fas fa-qrcode mr-1""></i> Xem QRCode
        </a>
        <a href=""javascript:void(0)"" id=""btnYeuCauBoSungHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-files-medical mr-1""></i> Yêu cầu bổ sung hồ sơ
        </a>
        <a href=""javascript:void(0)"" id=""btnTrinhPhuongAn"" class=""escs");
            WriteLiteral(@"_pquyen mr-2"" data-toggle=""modal"">
            <i class=""fas fa-share-square mr-1""></i> Trình phương án
        </a>
        <a href=""javascript:void(0)"" id=""btnTrinhTuChoiBT"" class=""escs_pquyen mr-2"" data-toggle=""modal"">
            <i class=""fas fa-share-square mr-1""></i> Trình từ chối chi tiền BH
        </a>
        <a href=""javascript:void(0)"" id=""btnChuyenThanhToan"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-share-square mr-1""></i> Chuyển thanh toán
        </a>
        <a href=""#"" id=""btnHuychuyenboithuong"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-undo mr-1""></i> Hủy chuyển thanh toán
        </a>
        <a href=""#"" id=""btnCopyHoSo"" class=""escs_pquyen mr-2"">
            <i class=""fas fa-share-square mr-1""></i> Yêu cầu trả thêm tiền bảo hiểm
        </a>
        <a href=""javascript:void(0)"" id=""btnXemQlMIC"" class=""mr-2"">
            <i class=""fas fa-file-search mr-1""></i> Xem quyền lợi MIC
        </a>
        <a href=""javascript:void(0)"" id=""btnGuiEmailThong");
            WriteLiteral(@"Bao"" class=""escs_pquyen mr-2"" data-toggle=""modal"">
            <i class=""fas fa-envelope mr-1""></i> Gửi email
        </a>
        <a href=""#"" id=""btnPrint"" class=""mr-3"">
            <i class=""fas fa-print mr-1""></i> In ấn
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
