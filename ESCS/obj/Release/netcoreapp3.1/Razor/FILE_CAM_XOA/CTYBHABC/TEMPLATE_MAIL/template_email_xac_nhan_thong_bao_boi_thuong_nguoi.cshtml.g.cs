#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c981e5641f0b873cb78cb333d8da2116cfb993e8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_xac_nhan_thong_bao_boi_thuong_nguoi), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c981e5641f0b873cb78cb333d8da2116cfb993e8", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_xac_nhan_thong_bao_boi_thuong_nguoi : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c981e5641f0b873cb78cb333d8da2116cfb993e84325", async() => {
                WriteLiteral("\r\n    <title>XÁC NHẬN THÔNG BÁO TRẢ TIỀN BẢO HIỂM</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c981e5641f0b873cb78cb333d8da2116cfb993e85433", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:12px; margin:5px; background-color:azure"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center"">
                XÁC NHẬN THÔNG BÁO TRẢ TIỀN BẢO HIỂM
                <br>Số hồ sơ: ");
#nullable restore
#line 20 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                <br>Loại hình bảo hiểm: ");
#nullable restore
#line 21 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                   Write(mail.ten_lhnv);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px;\">Kính gửi Quý khách hàng: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                            Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top: 5px;\">");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" xin gửi tới Quý khách cùng toàn thể gia đình lời chúc sức khỏe, hạnh phúc. </p>
                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px;"">Chúng tôi hi vọng luôn được là người bạn đồng hành tin cậy của Quý khách trong suốt thời gian tham gia bảo hiểm tại ");
#nullable restore
#line 29 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                                                                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".</p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 5px;"">
                    Chúng tôi đã nhận được xác nhận online của Quý khách
                    về phương án chi trả yêu cầu bồi thường, với xác nhận
                    là với nội dung như sau:
                </p>

                <ul style=""line-height: 25px"">
                    <li style=""font-family: 'Tahoma'; font-size: 14px;"">Số hợp đồng bảo hiểm:	<span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                                 Write(mail.so_hd);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n");
                WriteLiteral("                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Người được bảo hiểm: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                             Write(mail.ten_nguoi_duoc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Tên người yêu cầu trả tiền bảo hiểm:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                                                Write(mail.ten_nguoi_yc_tra_tien_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">\r\n                        Tổng số tiền yêu cầu trả tiền bảo hiểm:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 43 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                   Write(mail.tong_so_tien_yc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral(" VND</span>\r\n                    </li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">\r\n                        Tổng số tiền ");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" chi trả bồi thường: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                               Write(mail.so_tien_duyet);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" VND</span>
                    </li>
                </ul>

                <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold; margin-top: 8px;"">
                    <span>
                        Để tra cứu tình trạng hồ sơ và quá trình giải quyết, Quý khách vui lòng sử dụng ứng dụng <a href=""#"">(Thiếu tên App Mobile)</a> trên mobile để tra cứu
                    </span>
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top: 8px;"">Mọi thắc mắc về hồ sơ cần giải đáp hoặc hỗ trợ, Quý khách vui lòng liên hệ:</p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; color: #035299; font-weight: bold""><span style=""font-family: 'Tahoma'; font-size: 14px;"">");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                      Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <ul style=\"line-height: 20px\">\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Địa chỉ:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 61 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                    Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Số điện thoại:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 62 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                          Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li style=\"font-family: \'Tahoma\'; font-size: 14px;\">Email:\t<span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 63 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_xac_nhan_thong_bao_boi_thuong_nguoi.cshtml"
                                                                                                                                                  Write(mail.email_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
