#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6c8a38d943a1f3cc9709e92448bd05f3bbabad51"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_trinh_xin_y_kien), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_trinh_xin_y_kien.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6c8a38d943a1f3cc9709e92448bd05f3bbabad51", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_trinh_xin_y_kien.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_trinh_xin_y_kien : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6c8a38d943a1f3cc9709e92448bd05f3bbabad513987", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>TRÌNH XIN Ý KIẾN HỒ SƠ</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6c8a38d943a1f3cc9709e92448bd05f3bbabad515032", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO TRÌNH XIN Ý KIẾN HỒ SƠ</h2>
            <div style=""padding: 8px; text-align: justify;"">

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Kính gửi : <span style=""color: #035299"">Ban lãnh đạo</span></p>

                <p style=""margin-top:5px;""><span style=""color: #4552a2""></span> trình xin ý kiến đối với xe <span style=""color: #4552a2""> ");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                                                                                                     Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> theo hợp đồng bảo hiểm <span style=\"color: #4552a2\"> ");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                                                                                                                                                                                 Write(mail.so_hd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>, chi tiết như sau:</p>\r\n\r\n                <ul>\r\n                    <li>Số hồ sơ: <span style=\"color: #4552a2\">");
#nullable restore
#line 25 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                          Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tên khách hàng: <span style=\"color: #4552a2\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                                Write(mail.ten_kh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tiền đề xuất sửa chữa: <span style=\"color: #4552a2\">");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                                       Write(mail.tien_de_xuat_duyet_gia);

#line default
#line hidden
#nullable disable
                WriteLiteral(" VNĐ</span></li>\r\n                    <li>Tổng tiền phê duyệt sửa chữa: <span style=\"color: #4552a2\"></span>");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
                                                                                     Write(mail.tien_duyet);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" VND</li>
                </ul>

                <p style=""margin-top:5px;"">Kính mong Ban lãnh đạo xem xét và cho ý kiến.</p>
                <div style=""font-family: 'Tahoma'; font-size: 14px; color: red; font-weight: bold; margin-top: 10px"">
                    <span>
                        Vui lòng click vào đường link để <a");
                BeginWriteAttribute("href", " href=\"", 1860, "\"", 1883, 1);
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_trinh_xin_y_kien.cshtml"
WriteAttributeValue("", 1867, mail.short_link, 1867, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">xác nhận </a> thông tin\r\n                    </span>\r\n                </div>\r\n                <p style=\"color: #035299; font-weight: bold; margin-top: 5px;\">Trân trọng Cảm ơn!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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