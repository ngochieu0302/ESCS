#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "10ae615c95167b16f24bc831563a8439ff38df36"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_opes_template_email_xe_trinh_pasc), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/opes_template_email_xe_trinh_pasc.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"10ae615c95167b16f24bc831563a8439ff38df36", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/opes_template_email_xe_trinh_pasc.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_opes_template_email_xe_trinh_pasc : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\'"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "10ae615c95167b16f24bc831563a8439ff38df363995", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO TRÌNH PHƯƠNG ÁN SỬA CHỮA</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "10ae615c95167b16f24bc831563a8439ff38df365052", async() => {
                WriteLiteral(@"
    <div>
        <div style=""width: 710px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO TRÌNH PHƯƠNG ÁN SỬA CHỮA</h2>
            <div style=""padding: 8px; text-align: justify;"">

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Dear anh/chị: <span style=""color: #035299"">");
#nullable restore
#line 20 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                         Write(mail.ten_nguoi_duyet_chinh_pasc);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:5px;\">\r\n                    - Giám định viên <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                     Write(mail.ten_gdv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> đã hoàn tất giám định và trình phương án sửa chữa cho xe ô tô <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                                                                                                                                                                             Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>,\r\n                    hồ sơ yêu cầu bồi thường số <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                                Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Anh/chị vui lòng kiểm tra chi tiết hồ sơ và xét duyệt phương án sửa chữa.
                </p>
                <br />
                <p style=""color: #035299; font-weight: bold"">Trân trọng cảm ơn!</p>

                <p style=""margin-top:15px;"">
                    <img style="" max-width: 200px;""");
                BeginWriteAttribute("src", " src=\"", 1689, "\"", 1711, 1);
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
WriteAttributeValue("", 1695, mail.logo_email, 1695, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(@" />
                </p>
                <div style=""margin-left:253px; margin-top:-120px"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold"">
                        <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                        Write(mail.slogan);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </p>\r\n                </div>\r\n                <div style=\"margin-left:250px; margin-top: -60px;\">\r\n                    <p style=\"color: #00CCCC; margin: 8px 0px; font-weight: bold; margin-left: 3px;\"><span>");
#nullable restore
#line 42 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                      Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                    <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:55px; color:#FF7F50\">\r\n                        Địa chỉ: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                 Write(mail.dia_chi_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </p>\r\n                    <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:5px; color:#FF7F50\">\r\n                        Tổng đài: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                  Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" <span>(Miễn phí)</span></span>
                    </p>
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:-18px; color:#FF7F50; margin-left: 221px;"">
                        Fax: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                             Write(mail.fax);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </p>\r\n                    <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:5px;color:#FF7F50\">\r\n                        Website: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                                 Write(mail.website_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:-17px;color:#FF7F50; margin-left: 220px;"">
                        Email: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_trinh_pasc.cshtml"
                                                                                               Write(mail.email_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
