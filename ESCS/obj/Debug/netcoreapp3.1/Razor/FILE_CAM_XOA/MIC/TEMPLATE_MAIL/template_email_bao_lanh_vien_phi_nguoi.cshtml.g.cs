#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c0dd58920ba4a76129186837b9303eb8ee0c3024"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_MIC_TEMPLATE_MAIL_template_email_bao_lanh_vien_phi_nguoi), @"mvc.1.0.view", @"/FILE_CAM_XOA/MIC/TEMPLATE_MAIL/template_email_bao_lanh_vien_phi_nguoi.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c0dd58920ba4a76129186837b9303eb8ee0c3024", @"/FILE_CAM_XOA/MIC/TEMPLATE_MAIL/template_email_bao_lanh_vien_phi_nguoi.cshtml")]
    public class FILE_CAM_XOA_MIC_TEMPLATE_MAIL_template_email_bao_lanh_vien_phi_nguoi : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c0dd58920ba4a76129186837b9303eb8ee0c30243613", async() => {
                WriteLiteral("\r\n    <title>TH??NG B??O X??C NH???N B???O L??NH VI???N PH??</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c0dd58920ba4a76129186837b9303eb8ee0c30244721", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center;"">
                TH??NG B??O X??C NH???N B???O L??NH VI???N PH??
                <br>S??? h??? s??: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n                <p style=\"margin: 8px 0px;\">\r\n                    K??nh g???i: <span style=\"color: #035299\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                      Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    ?????ng k??nh g???i Qu?? kh??ch h??ng:\r\n                    <span style=\"color: #035299\">");
#nullable restore
#line 28 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                            Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <p style=\"margin: 8px 0px;\">");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                       Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral(" l?? ????n v??? gi???i quy???t quy???n l???i b???o hi???m c???a B???o hi???m ");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                              Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(" xin tr??n tr???ng th??ng b??o: </p>\r\n\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Ng??y ");
#nullable restore
#line 33 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                    Write(mail.ngay_ht);

#line default
#line hidden
#nullable disable
                WriteLiteral(",\r\n                    ");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" ???? nh???n ???????c h??? s?? y??u c???u b???o l??nh vi???n ph?? (BLVP) c???a b???nh nh??n <span style=\"color: #035299\">");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                    Write(mail.ten_nguoi_duoc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> c?? tham gia ");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                               Write(mail.ten_goi_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral(" c???a ");
#nullable restore
#line 34 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                    Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(".\r\n                </p>\r\n\r\n                <p style=\"margin: 8px 0px;\">Sau khi xem x??t h??? s??, ");
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                              Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" xin g???i x??c nh???n BLVP ?????i v???i h??? s?? <span style=\"color: #035299\">");
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                     Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> v???i s??? ti???n b???ng ");
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                         Write(mail.so_tien_duyet);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" chi ti???t vui l??ng tham kh???o file ????nh k??m.</p>

                <p style=""margin: 8px 0px; text-decoration: underline; font-weight: bold;"">L??u ??:</p>
                <p style=""margin: 8px 0px;"">Khi c?? thay ?????i b???t c??? th??ng tin n??o, ????? ngh??? (CSYT) th??ng b??o ngay cho ");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" bi???t ????? xem x??t v?? x??c nh???n l???i n???i dung b???o l??nh vi???n ph??.</p>\r\n\r\n                <p style=\"margin: 8px 0px;\">\r\n                    ????? tra c???u t??nh tr???ng h??? s?? v?? qu?? tr??nh gi???i quy???t, Qu?? kh??ch vui l??ng d??ng ???ng d???ng ");
#nullable restore
#line 43 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" Claim tr??n mobile ????? tra c???u theo m??: <span style=\"color: #035299\">");
#nullable restore
#line 43 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                              Write(mail.ma_cv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n\r\n                <p style=\"margin: 8px 0px;\">M???i v?????ng m???c vui l??ng li??n h??? Hotline: <b>");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                  Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</b></p>\r\n\r\n                <p>\r\n                    ");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" l?? ????n v??? c???u ti???n, ?????c mong ng??y c??ng mang l???i tr???i nghi???m t???t nh???t cho kh??ch h??ng, ch??ng t??i mong mu???n ???????c l???ng nghe nh???ng ????ng g??p qu?? b??u c???a Qu?? kh??ch v??? ch???t l?????ng d???ch v??? b???o l??nh vi???n ph?? c???a ");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                              Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@".
                    Qu?? kh??ch vui l??ng ????nh gi?? *****<span style=""color:red"">(n???u t??? 1-3 sao h???i l?? do)</span>
                </p>

                <p style=""margin: 8px 0px; font-weight: bold; color: #035299;"">Tr??n tr???ng C???m ??n!</p>

                <p style=""color: #035299; margin: 8px 0px;""><span>");
#nullable restore
#line 55 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                             Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>?????a ch???: <span style=\"color: #035299\">");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>S??? ??i???n tho???i: <span style=\"color: #035299\">");
#nullable restore
#line 59 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                               Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>T??n c??n b???: <span style=\"color: #035299\">");
#nullable restore
#line 60 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                            Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 61 "D:\ESCS\ESCS\FILE_CAM_XOA\MIC\TEMPLATE_MAIL\template_email_bao_lanh_vien_phi_nguoi.cshtml"
                                                       Write(mail.email_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
