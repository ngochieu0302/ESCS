#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e83edd9f587efbd5cbe08a5f5778f826bf69dab5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_thong_bao_kh_da_bsct), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_thong_bao_kh_da_bsct.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e83edd9f587efbd5cbe08a5f5778f826bf69dab5", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_thong_bao_kh_da_bsct.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_thong_bao_kh_da_bsct : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\';line-height: 1.6;font-size:14px;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e83edd9f587efbd5cbe08a5f5778f826bf69dab54241", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO KHÁCH HÀNG ĐÃ BỔ SUNG CHỨNG TỪ ONLINE</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e83edd9f587efbd5cbe08a5f5778f826bf69dab55360", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:6px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center; font-family: 'Tahoma'"">THÔNG BÁO KHÁCH HÀNG ĐÃ BỔ SUNG CHỨNG TỪ ONLINE</h3>
            <div style=""padding: 8px; text-align: justify;"">

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px;"">Kính gửi: <span style=""color: #035299"">Bộ phận bồi thường</span></p>

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">
                    Hệ thống thông báo khách hàng đã bổ sung hồ sơ chứng từ online số hồ sơ: <span style=""color: #035299"">");
#nullable restore
#line 25 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                                                                                                                     Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <div style=\"margin-left: 10px;\">\r\n                    <p>Tên khách hàng: ");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                                  Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</p>\r\n                    <p>Số điện thoại: ");
#nullable restore
#line 29 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                                 Write(mail.dthoai_lhe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</p>\r\n                    <p>Email liên hệ: ");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                                 Write(mail.email_lhe);

#line default
#line hidden
#nullable disable
                WriteLiteral("</p>\r\n                </div>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px;\">\r\n                    <b>Các loại giấy tờ:</b>\r\n                </p>\r\n                <div style=\"margin-left: 10px;\">\r\n                    ");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                Write(new RawString(mail.giay_to));

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
                </div>
                <p style=""font-family: 'Tahoma'; font-size: 14px;"">
                    <b>Ý kiến khách hàng:</b>
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; color: red"">
                    <i>");
#nullable restore
#line 42 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_thong_bao_kh_da_bsct.cshtml"
                  Write(mail.y_kien);

#line default
#line hidden
#nullable disable
                WriteLiteral("</i>\r\n                </p>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px;\">Đề nghị bộ phận bồi thường thực hiện các bước tiếp theo theo quy định.</p>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
