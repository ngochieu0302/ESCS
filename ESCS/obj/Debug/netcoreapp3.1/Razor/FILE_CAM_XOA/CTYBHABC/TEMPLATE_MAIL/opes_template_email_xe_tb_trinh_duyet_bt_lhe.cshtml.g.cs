#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "cd20c8053cad9de0c7828bb5a02be30182110c3e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_opes_template_email_xe_tb_trinh_duyet_bt_lhe), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"cd20c8053cad9de0c7828bb5a02be30182110c3e", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_opes_template_email_xe_tb_trinh_duyet_bt_lhe : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\'; padding: 0 10%;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cd20c8053cad9de0c7828bb5a02be30182110c3e4310", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO TRÌNH DUYỆT BỒI THƯỜNG (GỬI NGƯỜI LIÊN HỆ, NGƯỜI THÔNG BÁO)</title>\r\n");
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
            WriteLiteral("\r\n\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cd20c8053cad9de0c7828bb5a02be30182110c3e5406", async() => {
                WriteLiteral(@"

    <h2 style=""color: #035299; text-align: center; margin-bottom: 30px;"">
        THÔNG BÁO TRÌNH DUYỆT BỒI THƯỜNG (GỬI NGƯỜI LIÊN HỆ)
    </h2>
    <div style=""margin-left:10px;"">
        <p style=""font-family: 'Tahoma'; font-size: 14px;"">
            Kính gửi: <span style=""color:#035299""> Quý khách hàng </span>
        </p>

        <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
            - Hồ sơ yêu cầu bồi thường cho xe ô tô <span style=""color: #035299"">");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                           Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n            đã được duyệt với số tiền <span style=\"color: #035299\">");
#nullable restore
#line 29 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                              Write(mail.so_tien_bt);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span> VND
        </p>

        <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
            - Quý khách vui lòng kiểm tra chi tiết ở file đính kèm (att tờ trình bồi thường được duyệt).
            Quý khách vui lòng điền đầy đủ thông tin cần thiết và ký xác nhận để hoàn thiện hồ sơ thanh toán bồi
            thường.
        </p>

        <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
            - Nếu cần tham khảo thêm thông tin về hồ sơ yêu cầu bảo hiểm này,
            Quý khách vui lòng liên hệ tổng đài <span style=""color: #035299"">");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                        Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
        </p>

        <br />
        <p style=""color: #035299; font-weight: bold"">Trân trọng cảm ơn!</p>
        <br />
    </div>

    <div style="" margin-left: 15px;"">
        <table style=""width:100%"">
            <tr>
                <td rowspan=""5"" style=""width: 200px;"">
                    <img style=""width: 200px;""");
                BeginWriteAttribute("src", " src=\"", 2005, "\"", 2027, 1);
#nullable restore
#line 52 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
WriteAttributeValue("", 2011, mail.logo_email, 2011, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(@" />
                </td>
                <td colspan=""2"" style=""margin-bottom:30px;"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold; margin: 0;padding: 5px 0 30px 20px;"">
                        <span style=""font-family: 'Tahoma'; font-size: 14px; color: #00CCCC"">");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                        Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=""2"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold; margin: 0;padding: 5px 0 5px 18px;"">
                        <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 63 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                        Write(mail.slogan);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan=""2"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin: 0;padding: 5px 0 5px 18px; color:#FF7F50;"">
                        Địa chỉ: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 70 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                                 Write(mail.dia_chi_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td style=""vertical-align:top;"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin: 0;padding: 5px 0 5px 18px; color:#FF7F50;"">
                        Tổng đài: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">
                            ");
#nullable restore
#line 78 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                       Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"<span> (Miễn phí) </span>
                        </span>
                    </p>
                </td>
                <td style=""vertical-align:top;"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin: 0;padding: 5px 0 5px 18px; color:#FF7F50;"">
                        Fax: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 84 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                             Write(mail.fax);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                </td>
            </tr>
            <tr>
                <td style=""vertical-align:top;"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin: 0;padding: 5px 0 5px 18px; color:#FF7F50;"">
                        Website: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 91 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                                 Write(mail.website_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                    </p>
                </td>
                <td style=""vertical-align:top;"">
                    <p style=""font-family: 'Tahoma'; font-size: 14px; margin: 0;padding: 5px 0 5px 18px; color:#FF7F50;"">
                        Email: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 96 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\opes_template_email_xe_tb_trinh_duyet_bt_lhe.cshtml"
                                                                                               Write(mail.email_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </p>\r\n                </td>\r\n            </tr>\r\n        </table>\r\n    </div>\r\n");
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
