#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d8d81d48cf7785a4ae57400775ff4b85dbd30161"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_xe_phan_cong_btv), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_xe_phan_cong_btv.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d8d81d48cf7785a4ae57400775ff4b85dbd30161", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_xe_phan_cong_btv.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_xe_phan_cong_btv : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\';font-size:14px;line-height:1.6;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d8d81d48cf7785a4ae57400775ff4b85dbd301613987", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO PHÂN CÔNG BỒI THƯỜNG VIÊN</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d8d81d48cf7785a4ae57400775ff4b85dbd301615045", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO PHÂN CÔNG BỒI THƯỜNG VIÊN</h2>
            <div style=""padding: 8px; text-align: justify;"">
                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Kính gửi Anh/chị: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
                                                                                                                                                     Write(mail.ten_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span></p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    Hệ thống thông báo hồ sơ đã được phân công cho bạn xử lý cho xe ô tô <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 21 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
                                                                                                                                                         Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    với số hồ sơ bồi thường <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
                                                                                                            Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    theo hợp đồng bảo hiểm <span style=\"color: #035299\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
                                                                   Write(mail.so_hd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px;\">Đề nghị cán bộ ");
#nullable restore
#line 25 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xe_phan_cong_btv.cshtml"
                                                                             Write(mail.ten_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral(" thực hiện các bước tiếp theo theo quy định.</p>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299; font-weight: bold; margin-top: 5px;\">Trân trọng Cảm ơn!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n</html>");
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
