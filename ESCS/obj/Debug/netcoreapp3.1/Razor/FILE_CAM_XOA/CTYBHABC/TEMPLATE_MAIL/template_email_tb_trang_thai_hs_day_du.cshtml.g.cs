#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "bfdf5bf52e37e4630dc78f206835a116772da2ab"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_tb_trang_thai_hs_day_du), @"mvc.1.0.view", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_tb_trang_thai_hs_day_du.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"bfdf5bf52e37e4630dc78f206835a116772da2ab", @"/FILE_CAM_XOA/CTYBHABC/TEMPLATE_MAIL/template_email_tb_trang_thai_hs_day_du.cshtml")]
    public class FILE_CAM_XOA_CTYBHABC_TEMPLATE_MAIL_template_email_tb_trang_thai_hs_day_du : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bfdf5bf52e37e4630dc78f206835a116772da2ab3853", async() => {
                WriteLiteral("\r\n    <title>THÔNG BÁO TRẠNG THÁI HỒ SƠ BỔ SUNG ĐẦY ĐỦ</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bfdf5bf52e37e4630dc78f206835a116772da2ab4966", async() => {
                WriteLiteral(@"
    <div style=""border:1px solid #035299; border-radius:5px; background-color:azure; font-family: 'Tahoma' ; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center"">
                THÔNG BÁO TRẠNG THÁI HỒ SƠ BỔ SUNG ĐẦY ĐỦ
                <br>Số hồ sơ: ");
#nullable restore
#line 20 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n                <p style=\"margin: 8px 0px;\">Kính gửi: <span style=\"color: #035299;\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                                               Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                \r\n                <p style=\"margin: 8px 0px;\">\r\n                    Công ty chúng tôi đã nhận được hồ sơ bổ sung của NĐBH là Ông(bà) <span style=\"color: #035299;\">");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                                                                              Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> có tham gia bảo hiểm chăm sóc sức khỏe của ");
#nullable restore
#line 26 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                                                                                                                                                Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".
                </p>
                <p style=""margin: 8px 0px;"">
                    Sau khi xem xét hồ sơ, chúng tôi có đủ cơ sở xem xét và thanh toán chi phí đã xác nhận theo đúng quy định, Quý khách đã bổ sung đầy đủ chứng từ.
                </p>
                
                <p style=""color: #035299; margin: 8px 0px;""><span>");
#nullable restore
#line 32 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                             Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>Địa chỉ: <span style=\"color: #035299\">");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Số điện thoại: <span style=\"color: #035299\">");
#nullable restore
#line 35 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                               Write(mail.dien_thoai_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Tên cán bộ: <span style=\"color: #035299\">");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                            Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\CTYBHABC\TEMPLATE_MAIL\template_email_tb_trang_thai_hs_day_du.cshtml"
                                                       Write(mail.email_btv);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span></li>
                </ul>
                <p style=""margin: 8px 0px;"">Rất mong sớm nhận được phản hồi của khách hàng.</p>
                
                <p style=""margin: 8px 0px; color: #035299; font-weight: bold"">Trân trọng cảm ơn !</p>
            </div>
        </div>
    </div>
");
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
