#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "68729110b470ccc6a98f6b28cbd7378b1d2dd9e8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_tb_nhan_hs_online), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_tb_nhan_hs_online.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"68729110b470ccc6a98f6b28cbd7378b1d2dd9e8", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_tb_nhan_hs_online.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_tb_nhan_hs_online : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\';"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "68729110b470ccc6a98f6b28cbd7378b1d2dd9e83969", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO NHẬN THÔNG TIN ONLINE</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "68729110b470ccc6a98f6b28cbd7378b1d2dd9e85072", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center"">
                THÔNG BÁO NHẬN THÔNG TIN ONLINE
                <br>Số hồ sơ: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                <br>Loại hình bảo hiểm: ");
#nullable restore
#line 20 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                   Write(mail.ten_lhnv);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; \">Kính gửi Ông (Bà): <span style=\"color: #035299\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                               Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top: 5px;\"><b style=\"font-family: \'Tahoma\'; font-size: 14px;\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                  Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</b>, Xin trân trọng thông báo: </p>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top: 3px;\">\r\n                    Ngày <span style=\"font-family: \'Tahoma\'; font-size: 14px;\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                          Write(mail.ngay_ht);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>, <span style=\"font-family: \'Tahoma\'; font-size: 14px;\"> ");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                                       Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" </span> đã nhận được thông tin khai báo ONLINE của Quý khách về <b>Hồ sơ yêu cầu trả tiền bảo hiểm</b> của NĐBH là ông(bà)<span style=\"color: #035299\"> ");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                                                                                                                                                                                                                     Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> như sau:\r\n\r\n                    <ul style=\"line-height: 20px\">\r\n                        <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Ngày vào viện:\t<span style=\"color: #035299\">");
#nullable restore
#line 29 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                      Write(mail.ngay_vv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Ngày ra viện:\t<span style=\"color: #035299\">");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                     Write(mail.ngay_rv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Cơ sở y tế:\t<span style=\"color: #035299\">");
#nullable restore
#line 31 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                   Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Chẩn đoán:\t<span style=\"color: #035299\">");
#nullable restore
#line 32 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                  Write(mail.chan_doan);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                        <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Số tiền yêu cầu:\t<span style=\"color: #035299\">");
#nullable restore
#line 33 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                        Write(mail.tien_yc);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" VND</span></li>
                        <li style=""font-family: 'Tahoma'; font-size: 14px;"">Tiến độ xử lý thông tin:</li>
                    </ul>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px; margin-left: 10px; color: #035299"">
                    <span>Quý khách gửi hồ sơ trong giờ hành chính: ");
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" sẽ phản hồi về <span style=""color:red"">tình trạng hồ sơ hoặc chứng từ cần bổ sung</span> trong vòng 30 phút.</span>
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px; margin-left: 10px; color: #035299"">
                    <span>Quý khách gửi hồ sơ từ 17h00 đến 21h00: ");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                             Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" sẽ phản hồi về <span style=""color:red"">tình trạng hồ sơ hoặc chứng từ cần bổ sung</span> trong vòng 60 phút. </span>
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px; margin-left: 10px; color: #035299"">
                    <span>Quý khách gửi hồ sơ sau 21h00, ");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                    Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" sẽ phản hồi về <span style=""color:red"">tình trạng hồ sơ hoặc chứng từ cần bổ sung</span> vào buổi sáng ngày làm việc tiếp theo. </span>
                </p>

                <p style=""font-weight: bold; margin-top: 10px;"">
                    <span style=""font-family: 'Tahoma'; font-size: 14px;"">
                        Để tra cứu tình trạng hồ sơ và quá trình giải quyết, Quý khách vui lòng sử dụng ứng dụng <a href=""#"">(Thiếu tên App Mobile)</a> trên mobile để tra cứu
                    </span>
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 3px;"">Mọi thắc mắc về hồ sơ cần giải đáp hoặc hỗ trợ, Quý khách vui lòng liên hệ:</p>

                <p style=""color: #035299; font-weight: bold; margin-top:3px "">
                <p style=""color: #035299; font-weight: bold; margin-top:3px""><span style=""font-family: 'Tahoma'; font-size: 14px;"">");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                              Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <ul style=\"line-height: 20px\">\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Địa chỉ:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                                    Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Số điện thoại:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 59 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                                          Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Email:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 60 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_tb_nhan_hs_online.cshtml"
                                                                                                                                                  Write(mail.email_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299; font-weight: bold\">Trân trọng Cảm ơn!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
