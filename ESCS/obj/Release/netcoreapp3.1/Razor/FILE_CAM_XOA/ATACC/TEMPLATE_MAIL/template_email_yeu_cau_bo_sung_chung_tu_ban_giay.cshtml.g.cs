#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "25b216449a6fa2116791cbc11dcc9f9b1c9a3b8b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_yeu_cau_bo_sung_chung_tu_ban_giay), @"mvc.1.0.view", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
using RazorEngine.Text;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"25b216449a6fa2116791cbc11dcc9f9b1c9a3b8b", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml")]
    public class FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_yeu_cau_bo_sung_chung_tu_ban_giay : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 4 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;
    var dsBenhVien = data.data_info.data1;
    string ma_mau = "#035299";
    if (mail.ma_doi_tac == "ATACC")
        ma_mau = "#e002ac";

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "25b216449a6fa2116791cbc11dcc9f9b1c9a3b8b4058", async() => {
                WriteLiteral(@"
    <title>TH??NG B??O Y??U C???U B??? SUNG CH???NG T??? B???N GI???Y</title>
    <meta http-equiv=""Content-Type"" content=""text/html; charset=utf-8"">
    <style>
        table {
            font-family: 'Tahoma';
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    </style>
");
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "25b216449a6fa2116791cbc11dcc9f9b1c9a3b8b5454", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <div style=""margin-top:20px;"">
                <img style=""width:170px""");
                BeginWriteAttribute("src", " src=\"", 1110, "\"", 1132, 1);
#nullable restore
#line 36 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue("", 1116, mail.logo_email, 1116, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(" alt=\"Logo\" />\r\n            </div>\r\n            <h3");
                BeginWriteAttribute("style", " style=\"", 1184, "\"", 1226, 5);
                WriteAttributeValue("", 1192, "color:", 1192, 6, true);
#nullable restore
#line 38 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 1198, ma_mau, 1199, 7, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 1206, ";", 1206, 1, true);
                WriteAttributeValue(" ", 1207, "text-align:", 1208, 12, true);
                WriteAttributeValue(" ", 1219, "center", 1220, 7, true);
                EndWriteAttribute();
                WriteLiteral(">\r\n                TH??NG B??O Y??U C???U B??? SUNG CH???NG T??? B???N GI???Y\r\n                <br>S??? h??? s??: ");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
                <p style=""font-family: 'Tahoma'; font-size: 16px; color:red; margin-top: 5px;"">
                    <i>(????y l?? email t??? ?????ng, Qu?? kh??ch vui l??ng kh??ng Reply email n??y)</i>
                </p>
            </h3>
            <div style=""padding: 8px; text-align: justify;"">
                <p style=""margin: 8px 0px;"">
                    K??nh g???i ??ng (B??): <span");
                BeginWriteAttribute("style", " style=\"", 1717, "\"", 1739, 2);
                WriteAttributeValue("", 1725, "color:", 1725, 6, true);
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 1731, ma_mau, 1732, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                               Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                </p>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Ng??y ");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                    Write(mail.ngay_ht);

#line default
#line hidden
#nullable disable
                WriteLiteral(", ");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" ???? nh???n ???????c h??? s?? b??? sung online c???a Qu?? kh??ch.\r\n                </p>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Sau khi xem x??t h??? s?? do Qu?? kh??ch cung c???p, ????? c?? ????? c?? s??? xem x??t v?? gi???i quy???t quy???n l???i b???o hi???m ????ng quy ?????nh, ");
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" k??nh ????? ngh??? Qu?? kh??ch <span class=""font-weight-bold"">
                        In mail Th??ng b??o n??y k??m b???n gi???y c??c ch???ng t???
                        ???????c y??u c???u b??? sung v?? g???i chuy???n ph??t h??nh ho???c tr???c ti???p ?????n:
                    </span>
                </p>
                <ul style=""line-height: 20px; margin: 8px 0px;"">
                    <li>
                        N??i nh???n h??? s??: <span");
                BeginWriteAttribute("style", " style=\"", 2578, "\"", 2600, 2);
                WriteAttributeValue("", 2586, "color:", 2586, 6, true);
#nullable restore
#line 60 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 2592, ma_mau, 2593, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 60 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </li>\r\n                    <li>\r\n                        ?????a ch???: <span");
                BeginWriteAttribute("style", " style=\"", 2719, "\"", 2741, 2);
                WriteAttributeValue("", 2727, "color:", 2727, 6, true);
#nullable restore
#line 63 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 2733, ma_mau, 2734, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 63 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span>\r\n                    </li>\r\n                </ul>\r\n                <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin-top: 5px;\">\r\n                    Trong m???i tr?????ng h???p c???n thi???t, ");
#nullable restore
#line 67 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" c?? th??? ti???p t???c ????? ngh??? Q??y kh??ch b??? sung th??m ch???ng t??? ????? l??m r?? ph???m vi b???o hi???m v?? h??? s??\r\n                    ch??? ???????c th??ng b??o ph????ng ??n gi???i quy???t sau khi ");
#nullable restore
#line 68 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" nh???n ???????c ?????y ????? h??? s?? b???n gi???y.\r\n                </p>\r\n                <p style=\"color:red\">Sau 30 ng??y, n???u ");
#nullable restore
#line 70 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                 Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" ch??a nh???n ???????c ch???ng t??? b??? sung c???a Qu?? kh??ch, h??? s?? s??? ???????c gi???i quy???t b???i th?????ng d???a tr??n ch???ng t??? hi???n c??.</p>\r\n                <p>\r\n                    ????? tra c???u t??nh tr???ng h??? s?? v?? qu?? tr??nh gi???i quy???t, ??ng/B?? <span");
                BeginWriteAttribute("style", " style=\"", 3511, "\"", 3533, 2);
                WriteAttributeValue("", 3519, "color:", 3519, 6, true);
#nullable restore
#line 72 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 3525, ma_mau, 3526, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 72 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                        Write(mail.ten_khach);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span> vui l??ng truy c???p ???ng d???ng ");
#nullable restore
#line 72 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                          Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" tr??n mobile\r\n                </p>\r\n                <p");
                BeginWriteAttribute("style", " style=\"", 3660, "\"", 3719, 8);
                WriteAttributeValue("", 3668, "margin:", 3668, 7, true);
                WriteAttributeValue(" ", 3675, "8px", 3676, 4, true);
                WriteAttributeValue(" ", 3679, "0px;", 3680, 5, true);
                WriteAttributeValue(" ", 3684, "font-weight:", 3685, 13, true);
                WriteAttributeValue(" ", 3697, "bold;", 3698, 6, true);
                WriteAttributeValue(" ", 3703, "color:", 3704, 7, true);
#nullable restore
#line 74 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
WriteAttributeValue(" ", 3710, ma_mau, 3711, 7, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 3718, ";", 3718, 1, true);
                EndWriteAttribute();
                WriteLiteral(@">Tr??n tr???ng C???m ??n!</p>
                <br />
                <hr />
                <p style=""font-family: 'Tahoma'; font-size: 10px; margin-top: 5px; opacity:0.4;"">
                    <span>
                        Email n??y c??ng c??c t???p tin ????nh k??m l?? c??c th??ng tin b???o m???t c???a ");
#nullable restore
#line 79 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                    Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" v?? c?? m???c ????ch ch??? g???i cho nh???ng ng?????i nh???n ???????c n??u t???i email.
                        N???u Qu?? v??? kh??ng ph???i l?? ng?????i nh???n d??? ki???n c???a email n??y c??ng c??c t???p tin k??m theo, vui l??ng kh??ng th???c hi???n b???t c??? h??nh ?????ng n??o tr??n c?? s??? email v?? c??c t???p tin n??y. Vi???c chia s??? ho???c ti???t l??? b???t c??? n???i dung n??o c???a email n??y ho???c b???t k??? t???p tin ????nh k??m n??o l?? kh??ng ???????c ph??p, tr??? khi c?? s??? ?????ng ?? tr?????c b???ng v??n b???n c???a ");
#nullable restore
#line 80 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                                                                                                                                                                                                                        Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(".\r\n                        Tr?????ng h???p Qu?? v??? nh???n ???????c email n??y do c?? s??? nh???m l???n ho???c l???i h??? th???ng, vui l??ng th??ng b??o ngay cho ");
#nullable restore
#line 81 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                          Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" b???ng vi???c ph???n h???i l???i email n??y, ?????ng th???i x??a email n??y c??ng c??c t???p tin ????nh k??m kh???i h??? th???ng c???a Qu?? v???.\r\n                        ");
#nullable restore
#line 82 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" kh??ng ch???u b???t k??? tr??ch nhi???m n??o v??? b???t c??? s??? truy???n t???i kh??ng ch??nh x??c, kh??ng ?????y ????? hay kh??ng k???p th???i c???a b???t k??? th??ng tin n??o trong email. M???c d?? ");
#nullable restore
#line 82 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                                                                 Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" ???? th???c hi???n c??c bi???n ph??p c???n thi???t ????? ?????m b???o email n??y kh??ng c?? ch???a virus, ");
#nullable restore
#line 82 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                                                                                                                                                                      Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" kh??ng ch???u tr??ch nhi???m ?????i v???i b???t c??? thi???t h???i hay t???n th???t n??o ph??t sinh t??? vi???c nh???n ho???c s??? d???ng email ho???c b???t k??? t???p tin ????nh k??m n??o.
                    </span>
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 10px; margin-top: 10px; opacity:0.4;"">
                    <span>
                        This email and any file transmitted with it are confidential information of ");
#nullable restore
#line 87 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" and intended solely for the use of the individual or entity to whom they are addressed.
                        If you are not the intended recipient, please do not take any action in reliance on this email.
                        Without prior written consent of ");
#nullable restore
#line 89 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                    Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(", any disclosure or distribution of this email or any of its attachments is strictly prohibited.\r\n                        If you have received this email in error, kindly notify ");
#nullable restore
#line 90 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                           Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" immediately by replying to this email and then delete this email along with all attachments from your system.\r\n                        ");
#nullable restore
#line 91 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" shall not take any responsibility for any improper, incomplete or delayed transmission of any information contained in this email. Although ");
#nullable restore
#line 91 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" has taken reasonable precautions to ensure no viruses are present in this email, ");
#nullable restore
#line 91 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_yeu_cau_bo_sung_chung_tu_ban_giay.cshtml"
                                                                                                                                                                                                                                                                                            Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" shall not accept responsibility for any loss or damage arising from the receipt or use of this email or any attachment.\r\n                    </span>\r\n                </p>\r\n                <hr />\r\n            </div>\r\n        </div>\r\n    </div>\r\n");
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
