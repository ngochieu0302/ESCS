#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8f507a951cf9571fcf2f6aa481f7782af27d0eda"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_ng_trinh_tu_choi_blvp), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_ng_trinh_tu_choi_blvp.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8f507a951cf9571fcf2f6aa481f7782af27d0eda", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_ng_trinh_tu_choi_blvp.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_ng_trinh_tu_choi_blvp : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8f507a951cf9571fcf2f6aa481f7782af27d0eda3656", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO TRÌNH TỪ CHỐI BẢO LÃNH VIỆN PHÍ</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8f507a951cf9571fcf2f6aa481f7782af27d0eda4765", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center;"">
                THÔNG BÁO TRÌNH TỪ CHỐI BẢO LÃNH VIỆN PHÍ
                <br>Số hồ sơ: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                 if (mail.ma_doi_tac == "ATACC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("                    <p style=\"margin: 8px 0px;\">Kính gửi: <span style=\"color: #035299;\">Giám đốc TPA và Trưởng phòng Phòng Nghiệp vụ BHSK ");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - Công ty BH ");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                                                                                        Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n");
#nullable restore
#line 25 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                }

#line default
#line hidden
#nullable disable
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                 if (mail.ma_doi_tac == "MIC" || mail.ma_doi_tac == "CTYBHABC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("                    <p style=\"margin: 8px 0px;\">Kính gửi: <span style=\"color: #035299;\">Trưởng phòng Phòng Nghiệp vụ BHSK ");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - Công ty BH ");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                                                                        Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n");
#nullable restore
#line 29 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                }

#line default
#line hidden
#nullable disable
                WriteLiteral("                <p style=\"margin: 8px 0px;\">Đồng kính gửi: <span style=\"color: #035299;\">");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                    Write(mail.ten_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"margin: 8px 0px;\">Hệ thống nhận được thông báo trình duyệt bảo lãnh viện phí (");
#nullable restore
#line 32 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                   Write(mail.ten_hinh_thuc);

#line default
#line hidden
#nullable disable
                WriteLiteral("/");
#nullable restore
#line 32 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                                                       Write(mail.ten_nguyen_nhan);

#line default
#line hidden
#nullable disable
                WriteLiteral(") như sau:</p>\r\n\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>Số hồ sơ: <span style=\"color: #035299\">");
#nullable restore
#line 35 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                          Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tên NĐBH: <span style=\"color: #035299\">");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                          Write(mail.ten_nguoi_duoc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>CCCD/Hộ chiếu: <span style=\"color: #035299\">");
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                               Write(mail.cmt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Điện thoại: <span style=\"color: #035299\">");
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                            Write(mail.dien_thoai);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 39 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                       Write(mail.email);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Số tiền yêu cầu: <span style=\"color: #035299\">");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                 Write(mail.tien_yc);

#line default
#line hidden
#nullable disable
                WriteLiteral(" VND</span></li>\r\n                    <li>Cơ sở y tế: <span style=\"color: #035299\">");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                            Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Cán bộ BLVP trình duyệt: <span style=\"color: #035299\">");
#nullable restore
#line 42 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                         Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n\r\n                <p style=\"margin: 8px 0px;\">Để xem chi tiết, đối với <span style=\"color: #035299;\">");
#nullable restore
#line 45 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                                              Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> đề nghị truy cập hệ thống phần mềm bồi thường.</p>\r\n                <p style=\"margin: 8px 0px;\">Đối với <span style=\"color: #035299;\">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_ng_trinh_tu_choi_blvp.cshtml"
                                                                             Write(mail.ten_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>, vui lòng xem file đính kèm.</p>\r\n                <p style=\"font-weight: bold; color: #035299; margin: 8px 0px;\">Trân trọng cảm ơn!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
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
