#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6748d8401bea9b937f5273b2715fea025f210540"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_trinh_bao_lanh), @"mvc.1.0.view", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_trinh_bao_lanh.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6748d8401bea9b937f5273b2715fea025f210540", @"/FILE_CAM_XOA/PJICO/TEMPLATE_MAIL/template_email_ng_trinh_bao_lanh.cshtml")]
    public class FILE_CAM_XOA_PJICO_TEMPLATE_MAIL_template_email_ng_trinh_bao_lanh : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6748d8401bea9b937f5273b2715fea025f2105403600", async() => {
                WriteLiteral("\r\n    <title>TH??NG B??O TR??NH DUY???T B???O L??NH VI???N PH??</title>\r\n    <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "6748d8401bea9b937f5273b2715fea025f2105404707", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <h3 style=""color: #035299; text-align: center;"">
                TH??NG B??O TR??NH DUY???T B???O L??NH VI???N PH??
                <br>S??? h??? s??: ");
#nullable restore
#line 19 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n            </h3>\r\n            <div style=\"padding: 8px; text-align: justify;\">\r\n");
#nullable restore
#line 22 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                 if (mail.ma_doi_tac == "ATACC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("                <p style=\"margin: 8px 0px;\">\r\n                    K??nh g???i:\r\n                    <span style=\"color: #035299;\">\r\n                        Gi??m ?????c TPA v?? Tr?????ng ph??ng Ph??ng Nghi???p v??? BHSK ");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - C??ng ty BH ");
#nullable restore
#line 27 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                                                        Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                    </span>\r\n                </p>\r\n");
#nullable restore
#line 30 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                }

#line default
#line hidden
#nullable disable
#nullable restore
#line 31 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                 if (mail.ma_doi_tac == "MIC" || mail.ma_doi_tac == "CTYBHABC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("            <p style=\"margin: 8px 0px;\">\r\n                K??nh g???i:\r\n                <span style=\"color: #035299;\">\r\n                    Tr?????ng ph??ng Ph??ng Nghi???p v??? BHSK ");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                 Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" - C??ng ty BH ");
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                                    Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                </span>\r\n            </p>\r\n");
#nullable restore
#line 39 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                }

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                <p style=\"margin: 8px 0px;\">H??? th???ng nh???n ???????c th??ng b??o tr??nh duy???t b???o l??nh vi???n ph?? (");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                                                   Write(mail.ten_hinh_thuc);

#line default
#line hidden
#nullable disable
                WriteLiteral("/");
#nullable restore
#line 41 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                                                                       Write(mail.ten_nguyen_nhan);

#line default
#line hidden
#nullable disable
                WriteLiteral(") nh?? sau:</p>\r\n\r\n                <ul style=\"line-height: 20px; margin: 8px 0px;\">\r\n                    <li>S??? h??? s??: <span style=\"color: #035299\">");
#nullable restore
#line 44 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                          Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>T??n N??BH: <span style=\"color: #035299\">");
#nullable restore
#line 45 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                          Write(mail.ten_nguoi_duoc_bh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>CCCD/H??? chi???u: <span style=\"color: #035299\">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                               Write(mail.cmt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>C??n b??? BLVP tr??nh duy???t: <span style=\"color: #035299\">");
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                         Write(mail.ten_cb);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>??i???n tho???i: <span style=\"color: #035299\">");
#nullable restore
#line 48 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                            Write(mail.dien_thoai);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Email: <span style=\"color: #035299\">");
#nullable restore
#line 49 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                       Write(mail.email);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>S??? ti???n y??u c???u: <span style=\"color: #035299\">");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                 Write(mail.tien_yc);

#line default
#line hidden
#nullable disable
                WriteLiteral(" VND</span></li>\r\n                    <li>C?? s??? y t???: <span style=\"color: #035299\">");
#nullable restore
#line 51 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                            Write(mail.ten_bv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                </ul>\r\n\r\n");
                WriteLiteral("                <p style=\"margin: 8px 0px;\">?????i v???i <span style=\"color: #035299;\">");
#nullable restore
#line 55 "D:\ESCS\ESCS\FILE_CAM_XOA\PJICO\TEMPLATE_MAIL\template_email_ng_trinh_bao_lanh.cshtml"
                                                                             Write(mail.ten_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>, vui l??ng xem file ????nh k??m.</p>\r\n                <p style=\"font-weight: bold; color: #035299; margin: 8px 0px;\">Tr??n tr???ng c???m ??n!</p>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
