#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5eeef14267a167586978c3929eed0444ff414a7b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_OPES_TEMPLATE_MAIL_opes_template_email_xe_thong_bao_giam_dinh_gdv), @"mvc.1.0.view", @"/FILE_CAM_XOA/OPES/TEMPLATE_MAIL/opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5eeef14267a167586978c3929eed0444ff414a7b", @"/FILE_CAM_XOA/OPES/TEMPLATE_MAIL/opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml")]
    public class FILE_CAM_XOA_OPES_TEMPLATE_MAIL_opes_template_email_xe_thong_bao_giam_dinh_gdv : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("font-family: \'Tahoma\'"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;

#line default
#line hidden
#nullable disable
            WriteLiteral("<!DOCTYPE html>\r\n<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "5eeef14267a167586978c3929eed0444ff414a7b4067", async() => {
                WriteLiteral("\r\n    <meta charset=\"utf-8\" />\r\n    <title>TH??NG B??O GI??M ?????NH G??V</title>\r\n");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "5eeef14267a167586978c3929eed0444ff414a7b5113", async() => {
                WriteLiteral(@"
    <div>
        <div style=""width: 810px; margin: 0 auto;"">
            <h2 style=""color: #035299; text-align: center"">TH??NG B??O GI??M ?????NH G??V</h2>
            <div style=""padding: 8px; text-align: justify;"">

                <p style=""font-family: 'Tahoma'; font-size: 14px;"">Dear anh/ch??? : <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 20 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                                                                  Write(mail.thong_tin_gdv);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top:5px;\">\r\n                    - Anh/ch??? ???????c ph??n c??ng gi??m ?????nh cho xe ?? t?? <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 23 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                                                   Write(mail.doi_tuong);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    v???i s??? h??? s?? b???i th?????ng <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 24 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                            Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span>
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Nguy??n nh??n v?? di???n bi???n: N???i dung nguy??n nh??n di???n bi???n
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - ?????a ??i???m t???n th???t: ?????a ??i???m x???y ra t???n th???t
                </p>

                <p>
                    - Ng?????i li??n h???: t??n ng?????i li??n h???/ s??? ??i???n tho???i
                </p>

                <p style=""font-family: 'Tahoma'; font-size: 14px; margin-top:5px;"">
                    - Anh/chi vui l??ng li??n h??? kh??ch h??ng v?? th???c hi???n c??ng t??c gi??m ?????nh hi???n tr?????ng.
                </p>
                <br />
                <p style=""color: #035299; font-weight: bold"">Tr??n tr???ng C???m ??n!</p>
                <br />
                <div>
                    <div style=""width:280px; float:left"">
                        <img style="" max-width: 160px; margin-top:20px""");
                BeginWriteAttribute("src", " src=\"", 2134, "\"", 2156, 1);
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
WriteAttributeValue("", 2140, mail.logo_email, 2140, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(@" />
                    </div>
                    <div style=""float:left;"">
                        <p style=""font-family: 'Tahoma'; font-size: 14px; font-weight: bold"">
                            <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 51 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                            Write(mail.slogan);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"color: #00CCCC; margin: 8px 0px; font-weight: bold; margin-left: 3px;\"><span>");
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                          Write(mail.ten_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            ?????a ch???: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                     Write(mail.dia_chi_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            T???ng ????i: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 59 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                      Write(mail.sdt_tong_dai);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" <span>(Mi???n ph??)</span></span>
                        </p>
                        <p style=""font-family: 'Tahoma'; font-size: 14px; color:#FF7F50; margin:unset;"">
                            Fax: <span style=""font-family: 'Tahoma'; font-size: 14px; color: #035299"">");
#nullable restore
#line 62 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                 Write(mail.fax);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Website: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 65 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                     Write(mail.website_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                        <p style=\"font-family: \'Tahoma\'; font-size: 14px; color:#FF7F50; margin:unset;\">\r\n                            Email: <span style=\"font-family: \'Tahoma\'; font-size: 14px; color: #035299\">");
#nullable restore
#line 68 "D:\ESCS\ESCS\FILE_CAM_XOA\OPES\TEMPLATE_MAIL\opes_template_email_xe_thong_bao_giam_dinh_gdv.cshtml"
                                                                                                   Write(mail.email_cty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                        </p>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
            WriteLiteral("\r\n</html>\r\n\r\n\r\n\r\n");
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
