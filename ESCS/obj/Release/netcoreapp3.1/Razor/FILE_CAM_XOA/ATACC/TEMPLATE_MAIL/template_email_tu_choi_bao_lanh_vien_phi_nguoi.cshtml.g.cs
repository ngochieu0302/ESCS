#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6450e9b14bf435256554783305e2dd5c20bd6c70"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_tu_choi_bao_lanh_vien_phi_nguoi), @"mvc.1.0.view", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6450e9b14bf435256554783305e2dd5c20bd6c70", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml")]
    public class FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_tu_choi_bao_lanh_vien_phi_nguoi : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6450e9b14bf435256554783305e2dd5c20bd6c703693", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO TỪ CHỐI BẢO LÃNH VIỆN PHÍ</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6450e9b14bf435256554783305e2dd5c20bd6c704800", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center"">
                THÔNG BÁO TỪ CHỐI BẢO LÃNH VIỆN PHÍ
                <br>Số hồ sơ: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n                <p style=\"margin: 8px 0px;\">Kính gửi: <span style=\"color: #035299\">");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                              Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Đồng kính gửi Quý khách hàng:\r\n                    <span style=\"color: #035299\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                            Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n\r\n                <p style=\"margin: 8px 0px;\">\r\n                    ");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
               Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral(" (");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                  Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(") là đơn vị giải quyết quyền lợi bảo hiểm của Bảo hiểm ");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                              Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(", xin trân trọng thông báo:\r\n                </p>\r\n\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Ngày ");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                    Write(mail.ngay_ht);

#line default
#line hidden
#nullable disable
                WriteLiteral(", Chúng tôi đã nhận được hồ sơ yêu cầu bảo lãnh viện phí (BLVP) của khách hàng <span style=\"color: #035299\">");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                             Write(mail.ten_nguoi_duoc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> tham gia bảo hiểm chăm sóc sức khỏe của ");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                    Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".
                </p>

                <p style=""margin: 8px 0px;"">
                    Sau khi đối chiếu giữa Hợp đồng/Giấy chứng nhận bảo hiểm, Quy tắc bảo hiểm và các Quy phạm pháp luật hiện hành có liên quan với Hồ sơ y tế, chúng tôi rất tiếc phải thông báo:
                    không thể bảo lãnh chi phí y tế đối với hồ sơ <span style=""color: #035299"">");
#nullable restore
#line 39 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                          Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> vì lý do: <span style=\"color: #035299\">");
#nullable restore
#line 39 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                    Write(mail.ly_do);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n\r\n                <p style=\"margin: 8px 0px; text-decoration: underline; font-weight: bold;\">Lưu ý:</p>\r\n                <p style=\"margin: 8px 0px;\">Khi có thay đổi bất cứ thông tin nào, đề nghị (CSYT) thông báo ngay cho ");
#nullable restore
#line 43 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" biết để xem xét và xác nhận lại nội dung bảo lãnh viện phí</p>\r\n                <p style=\"margin: 8px 0px;\">Quý khách vui lòng trực tiếp thanh toán viện phí cho ");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                            Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral(" và thu thập hồ sơ đầy đủ, cân nhắc gửi về ");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" để được xem xét cho từng trường hợp cụ thể.</p>
                <p style=""margin: 8px 0px;"">Rất mong nhận được sự đồng cảm của Quý khách</p>
                <p style=""margin: 8px 0px;"">Để tra cứu tình trạng hồ sơ và quá trình giải quyết, Quý khách vui lòng sử dụng ứng dụng ");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" Claim trên mobile để tra cứu theo mã: <span style=\"color: #035299\">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                         Write(mail.ma_cv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> \r\n                <p style=\"margin: 8px 0px;\">Mọi vướng mắc vui lòng liên hệ Hotline: <b>");
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                  Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</b></p>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    ");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" là đơn vị cầu tiến, ước mong ngày càng mang lại trải nghiệm tốt nhất cho khách hàng, chúng tôi mong muốn được lắng nghe những đóng góp quý báu của Quý khách về chất lượng dịch vụ bảo lãnh viện phí của ");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                              Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".
                    Quý khách vui lòng đánh giá *****<span style=""color:red"">(nếu từ 1-3 sao hỏi lý do)</span>
                </p>
                <p style=""margin: 8px 0px; color: #035299; font-weight: bold"">Trân trọng Cảm ơn!</p>
                <p style=""color: #035299; margin: 8px 0px;""><span>");
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                             Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>Địa chỉ: <span style=\"color: #035299\">");
#nullable restore
#line 55 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Số điện thoại: <span style=\"color: #035299\">");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                               Write(mail.dien_thoai_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tên cán bộ: <span style=\"color: #035299\">");
#nullable restore
#line 57 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                            Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_bao_lanh_vien_phi_nguoi.cshtml"
                                                       Write(mail.email_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
