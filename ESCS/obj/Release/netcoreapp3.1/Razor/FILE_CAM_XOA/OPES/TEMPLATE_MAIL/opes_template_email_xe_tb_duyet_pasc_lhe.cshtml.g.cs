#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c720f13196a6ec5a7acb213fce8c05f66a5d7208"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_OPES_TEMPLATE_MAIL_opes_template_email_xe_tb_duyet_pasc_lhe), @"mvc.1.0.view", @"/FILE_CAM_XOA/OPES/TEMPLATE_MAIL/opes_template_email_xe_tb_duyet_pasc_lhe.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c720f13196a6ec5a7acb213fce8c05f66a5d7208", @"/FILE_CAM_XOA/OPES/TEMPLATE_MAIL/opes_template_email_xe_tb_duyet_pasc_lhe.cshtml")]
    public class FILE_CAM_XOA_OPES_TEMPLATE_MAIL_opes_template_email_xe_tb_duyet_pasc_lhe : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c720f13196a6ec5a7acb213fce8c05f66a5d72084019", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO DUYỆT PHƯƠNG ÁN SỮA CHỮA</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c720f13196a6ec5a7acb213fce8c05f66a5d72085076", async() => {
                WriteLiteral(@"
    <div>
        <div style=""width: 810px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO DUYỆT PHƯƠNG ÁN SỮA CHỮA </h2>
            <div style=""padding: 8px; text-align: justify;"">
                <p style=""font-family: 'Tahoma'; font-size: 14px;"">
                    Kính gửi: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">Quý khách hàng</span>
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Phương án khắc phục thiệt hại cho xe ô tô <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                                                Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span> của Quý khách
                    đã được duyệt.
                    Quý khách vui lòng xem thông tin chi tiết ở file đính kèm (att phương án sửa chữa được duyệt)
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Quý khách lưu ý, phương án sửa chữa này là chi phí khắc phục thiệt hại hợp lý và chưa phải là phương
                    án bồi thường chính thức.
                    Phương án bồi thường chính thức sẽ được thông báo tới Quý khách trong thời gian sớm nhất.
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Nếu có thắc mắc cần giải đáp quý khách vui lòng liên hệ GĐV phụ trách <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 35 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                                                                            Write(mail.ten_gdv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    số điện thoại liên hệ <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                          Write(mail.dthoai_gdv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:5px;\">\r\n                    - Quý khách vui lòng liên hệ tổng đài <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                                          Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span> nếu cần
                    thêm thông tin chi tiết.
                </p>

                <br />
                <p style=""color: #035299; font-weight: bold"">Trân trọng cảm ơn!</p>
                <br />
                <div>
                    <div style=""width:280px; float:left"">
                        <img style="" max-width: 160px; margin-top:20px""");
                BeginWriteAttribute("src", " src=\"", 2656, "\"", 2678, 1);
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
WriteAttributeValue("", 2662, mail.logo_email, 2662, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(@" />
                    </div>
                    <div style=""float:left;"">
                        <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold"">
                            <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                            Write(mail.slogan);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"color: #00CCCC; margin: 8px 0px; font-weight: bold; margin-left: 3px;\"><span>");
#nullable restore
#line 55 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                          Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Địa chỉ: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                     Write(mail.dia_chi_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Tổng đài: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 61 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                      Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" <span>(Miễn phí)</span></span>
                        </p>
                        <p style=""font-family: 'Tahoma'; font-size: 14px; color:#FF7F50; margin:unset;"">
                            Fax: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 64 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                 Write(mail.fax);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Website: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 67 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                     Write(mail.website_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Email: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 70 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_tb_duyet_pasc_lhe.cshtml"
                                                                                                   Write(mail.email_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
            WriteLiteral("\r\n</html>\r\n\r\n");
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
