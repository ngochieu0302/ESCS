#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e1e9aa81ff07d1f023cbd50b02005fa3d33ec2dd"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_thong_bao_kh_xac_nhan_bbgd), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_thong_bao_kh_xac_nhan_bbgd.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
using RazorEngine.Templating;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e1e9aa81ff07d1f023cbd50b02005fa3d33ec2dd", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_thong_bao_kh_xac_nhan_bbgd.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_thong_bao_kh_xac_nhan_bbgd : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\';font-size: 14px;line-height: 1.6;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e1e9aa81ff07d1f023cbd50b02005fa3d33ec2dd4302", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>THÔNG BÁO KHÁCH HÀNG XÁC NHẬN BIÊN BẢN GIÁM ĐỊNH</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e1e9aa81ff07d1f023cbd50b02005fa3d33ec2dd5373", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">THÔNG BÁO KHÁCH HÀNG XÁC NHẬN BIÊN BẢN GIÁM ĐỊNH</h2>
            <div style=""padding: 8px; text-align: justify;"">
                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Kính gửi : <span style=""color: #035299"">Bộ phận giám định</span></p>

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">
                    Hệ thống thông báo khách hàng đã phản hồi về xác nhận biên bản giám định, số hồ sơ: <span style=""color: #035299"">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                                                                                Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - ");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                                                                                              Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    theo hợp đồng bảo hiểm <span style=\"color: #035299\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                   Write(mail.so_hd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n\r\n                    <ul style=\"font-family: \'Tahoma\'; font-size: 14px;\">\r\n                        <li>Người liên hệ : <span style=\"color: #4552a2\">");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                    Write(mail.nguoi_lhe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li>Số điện thoại: <span style=\"color: #4552a2\">");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                   Write(mail.dthoai_lhe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li>\r\n                            Email: ");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                    if (!string.IsNullOrEmpty(mail.email_lhe))
                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("<span style=\"color: #4552a2\">");
#nullable restore
#line 31 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                     Write(mail.email_lhe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>");
#nullable restore
#line 31 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_thong_bao_kh_xac_nhan_bbgd.cshtml"
                                                                                }

#line default
#line hidden
#nullable disable
                WriteLiteral(@"                        </li>
                    </ul>

                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Đề nghị bộ phận giám định/bồi thường thực hiện các bước tiếp theo theo quy định.</p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; color: #035299; font-weight: bold; margin-top: 5px;"">Trân trọng Cảm ơn!</p>
            </div>
        </div>
    </div>
");
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
