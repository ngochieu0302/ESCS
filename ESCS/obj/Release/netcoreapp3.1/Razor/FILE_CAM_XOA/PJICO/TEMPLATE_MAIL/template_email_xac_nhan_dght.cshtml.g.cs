#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9396bd316555ea7dc8e985480112136a6fa82736"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_xac_nhan_dght), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_xac_nhan_dght.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9396bd316555ea7dc8e985480112136a6fa82736", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_xac_nhan_dght.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_xac_nhan_dght : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9396bd316555ea7dc8e985480112136a6fa827363931", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO GỬI BIÊN BẢN GIÁM ĐỊNH HIỆN TRƯỜNG</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9396bd316555ea7dc8e985480112136a6fa827364998", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO GỬI BIÊN BẢN GIÁM ĐỊNH HIỆN TRƯỜNG</h2>
            <div style=""padding: 8px; text-align: justify;"">

                <p>Kính gửi : <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">Quý khách hàng / Giám định viên</span></p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                              Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral(", xin gửi tới Quý Khách hàng, giám định viên hiện trường biên bản giám định hiện trường xe <span style=\"color: #4552a2\">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                                                                                                                   Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> theo hợp đồng bảo hiểm <span style=\"color: #4552a2\">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                                                                                                                                                                                              Write(mail.so_hd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> như sau:</p>\r\n\r\n                <p style=\"font-family: \'Tahoma\' ; font-size: 14px; margin-top:10px\">Số hồ sơ: <span style=\"color: #4552a2\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                      Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:3px;\">Ngày giờ giám định: <span style=\"color: #4552a2\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                               Write(mail.ngay_gd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:3px;\">Nơi giám định: <span style=\"color: #4552a2\">");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                          Write(mail.dia_diem);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:3px;\">Thông tin cán bộ giám định: <span style=\"color: #4552a2\">");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                                       Write(mail.thong_tin_gdv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top: 3px;\">Trường hợp cần hỗ trợ thêm, vui lòng liên hệ hotline <span style=\"color: #4552a2\">");
#nullable restore
#line 32 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                                                                                 Write(mail.dthoai_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; color: red; font-weight: bold; margin-top: 10px\">");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                              Write(mail.url_xac_nhan);

#line default
#line hidden
#nullable disable
                WriteLiteral("</p>\r\n\r\n                <div style=\"font-family: \'Tahoma\'; font-size: 14px; color: red; font-weight: bold; margin-top: 10px\">\r\n                    <span>\r\n                        Vui lòng click vào đường link để <a");
                BeginWriteAttribute("href", " href=\"", 2354, "\"", 2377, 1);
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
WriteAttributeValue("", 2361, mail.short_link, 2361, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">xác nhận </a> thông tin hiện trường\r\n                    </span>\r\n                </div>\r\n");
                WriteLiteral("\r\n                <ul style=\"font-family: \'Tahoma\'; font-size: 14px; line-height: 20px\">\r\n                    <li>Công ty:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 48 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                    Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Địa chỉ:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                    Write(mail.dia_chi_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Website:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_xac_nhan_dght.cshtml"
                                                                                                    Write(mail.website_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n                <p style=\"color: #035299; font-weight: bold\">Trân trọng Cảm ơn!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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