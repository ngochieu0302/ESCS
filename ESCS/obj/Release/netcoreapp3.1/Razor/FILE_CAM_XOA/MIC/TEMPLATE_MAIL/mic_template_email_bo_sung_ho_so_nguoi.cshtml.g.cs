#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ea23591240f300022967a0c49d258c86541d43c5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_MIC_TEMPLATE_MAIL_mic_template_email_bo_sung_ho_so_nguoi), @"mvc.1.0.view", @"/FILE_CAM_XOA/MIC/TEMPLATE_MAIL/mic_template_email_bo_sung_ho_so_nguoi.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ea23591240f300022967a0c49d258c86541d43c5", @"/FILE_CAM_XOA/MIC/TEMPLATE_MAIL/mic_template_email_bo_sung_ho_so_nguoi.cshtml")]
    public class FILE_CAM_XOA_MIC_TEMPLATE_MAIL_mic_template_email_bo_sung_ho_so_nguoi : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ea23591240f300022967a0c49d258c86541d43c53808", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO BỔ SUNG HỒ SƠ</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ea23591240f300022967a0c49d258c86541d43c54899", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:5px; background-color:azure; font-family: 'Tahoma' ; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center"">
                THÔNG BÁO BỔ SUNG HỒ SƠ
                <br>Số hồ sơ: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n                <p style=\"margin: 8px 0px;\">Kính gửi: <span style=\"color: #035299;\">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                                               Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Lời đầu tiên, ");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                             Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral(" (");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"), xin gửi lời cảm ơn chân thành tới Quý đối tác vì sự hợp tác bền vững quý báu và lời chúc sức khỏe, thịnh vượng.
                </p>
                <p style=""margin: 8px 0px;"">
                    Công ty chúng tôi đã nhận được hồ sơ bảo lãnh viện phí của NĐBH là Ông(bà) <span style=""color: #035299;"">");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                                                                                        Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> có tham gia bảo hiểm chăm sóc sức khỏe của ");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                                                                                                                                                          Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".
                </p>
                <p style=""margin: 8px 0px;"">
                    Sau khi xem xét hồ sơ do Quý đối tác cung cấp, để chúng tôi có đủ cơ sở xem xét và thanh toán chi phí đã xác nhận bảo lãnh viện phí theo đúng quy định, kính đề nghị Quý đối tác bổ sung những chứng từ dưới đây trong thời gian sớm nhất:
                </p>
                <div style=""margin-left: 10px;color: #035299;"">
                    ");
#nullable restore
#line 33 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                Write(new RawString(mail.yeu_cau_bs));

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                </div>\r\n");
                WriteLiteral("                <p style=\"margin: 8px 0px;\">Mọi vướng mắc về hồ sơ cần giải đáp hoặc hỗ trợ, vui lòng liên hệ:</p>\r\n                <p style=\"color: #035299; margin: 8px 0px;\"><span>");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                             Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>Địa chỉ: <span style=\"color: #035299\">");
#nullable restore
#line 43 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Số điện thoại: <span style=\"color: #035299\">");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                               Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tên cán bộ: <span style=\"color: #035299\">");
#nullable restore
#line 45 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                            Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                       Write(mail.email_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span></li>
                </ul>
                <p style=""margin: 8px 0px;"">Rất mong sớm nhận được phản hồi của Quý đối tác.</p>
                <p style=""margin: 8px 0px;"">
                    Để tra cứu tình trạng hồ sơ và quá trình giải quyết, Quý khách vui lòng dùng ứng dụng ");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" CLAIM trên mobile để tra cứu theo mã: <span style=\"color: #035299;\">");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\mic_template_email_bo_sung_ho_so_nguoi.cshtml"
                                                                                                                                                                                               Write(mail.ma_cv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <p style=\"margin: 8px 0px; color: #035299; font-weight: bold\">Trân trọng cảm ơn !</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
            WriteLiteral("\r\n</html>\r\n\r\n\r\n");
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
