#pragma checksum "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7de9eae31dbd9c94954aaca0d44d947cc18eabed"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_tu_choi_boi_thuong_vien_phi_nguoi), @"mvc.1.0.view", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml")]
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
#line 1 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
using ESCS.COMMON.Response;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
using ESCS.MODEL.ESCS;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7de9eae31dbd9c94954aaca0d44d947cc18eabed", @"/FILE_CAM_XOA/ATACC/TEMPLATE_MAIL/template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml")]
    public class FILE_CAM_XOA_ATACC_TEMPLATE_MAIL_template_email_tu_choi_boi_thuong_vien_phi_nguoi : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
#line 3 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
  
    Layout = null;
    var data = ViewBag.Data as BaseResponse<ThongTinEmail<ThongBaoGiamDinh>>;
    var mail = data.data_info.mail;
    var dsQuyenLoi = data.data_info.data2;
    string ma_mau = "#035299";
    if (mail.ma_doi_tac == "ATACC")
        ma_mau = "#e002ac";

#line default
#line hidden
#nullable disable
            WriteLiteral("<html>\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7de9eae31dbd9c94954aaca0d44d947cc18eabed3851", async() => {
                WriteLiteral(@"
    <title>THÔNG BÁO TỪ CHỐI TRẢ TIỀN BẢO HIỂM</title>
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
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7de9eae31dbd9c94954aaca0d44d947cc18eabed5239", async() => {
                WriteLiteral(@"
    <div style=""border: 1px solid #035299; border-radius: 5px; background-color: azure; font-family: 'Tahoma'; font-size: 14px; line-height: 1.5;"">
        <div style=""width: 710px; margin: 0 auto;"">
            <div style=""margin-top:20px;"">
                <img style=""width:170px""");
                BeginWriteAttribute("src", " src=\"", 1076, "\"", 1098, 1);
#nullable restore
#line 35 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue("", 1082, mail.logo_email, 1082, 16, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(" alt=\"Logo\" />\r\n            </div>\r\n            <h3");
                BeginWriteAttribute("style", " style=\"", 1150, "\"", 1208, 6);
                WriteAttributeValue("", 1158, "color:", 1158, 6, true);
                WriteAttributeValue(" ", 1164, "#035299;", 1165, 9, true);
                WriteAttributeValue(" ", 1173, "text-align:", 1174, 12, true);
                WriteAttributeValue(" ", 1185, "center;", 1186, 8, true);
                WriteAttributeValue(" ", 1193, "color:", 1194, 7, true);
#nullable restore
#line 37 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 1200, ma_mau, 1201, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">\r\n                THÔNG BÁO TỪ CHỐI TRẢ TIỀN BẢO HIỂM\r\n                <br style=\"font-family: \'Tahoma\'; font-size: 14px; color:red !important\" />Hình thức hoàn trả trực tiếp/Hình thức hoàn trả online\r\n                <br>Số hồ sơ: ");
#nullable restore
#line 40 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                         Write(mail.so_hs);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"
                <p style=""font-family: 'Tahoma'; font-size: 16px; color:red; margin-top: 5px;"">
                    <i>(Đây là email tự động, Quý khách vui lòng không Reply email này)</i>
                </p>
            </h3>
            <div style=""padding: 8px; text-align: justify;"">
                <p style=""margin: 8px 0px;"">Kính gửi Ông (Bà): <span");
                BeginWriteAttribute("style", " style=\"", 1816, "\"", 1838, 2);
                WriteAttributeValue("", 1824, "color:", 1824, 6, true);
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 1830, ma_mau, 1831, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 46 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                       Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n");
#nullable restore
#line 47 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                 if (mail.ma_doi_tac == "ATACC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("                    <p style=\"margin: 8px 0px;\">\r\n                        Trước tiên, ");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                               Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral(" (");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                  Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral("), xin gửi tới Quý khách cùng toàn thể gia đình lời chúc sức khỏe, hạnh phúc và chúng tôi hi vọng luôn được là người bạn đồng hành tin cậy của Quý khách trong suốt thời gian tham gia bảo hiểm tại ");
#nullable restore
#line 50 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                                                           Write(mail.ten_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(".\r\n                    </p>\r\n");
#nullable restore
#line 52 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                }

#line default
#line hidden
#nullable disable
#nullable restore
#line 53 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                 if (mail.ma_doi_tac == "MIC" || mail.ma_doi_tac == "CTYBHABC")
                {

#line default
#line hidden
#nullable disable
                WriteLiteral("                    <p style=\"font-family: \'Tahoma\'; font-size: 14px; margin:5px\">\r\n                        Trước tiên, ");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                               Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral(" (");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                  Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(") xin gửi tới Quý khách cùng toàn thể gia đình lời chúc sức khỏe, hạnh phúc và chúng tôi hi vọng luôn được là người bạn đồng hành tin cậy của Quý khách trong suốt thời gian tham gia bảo hiểm tại ");
#nullable restore
#line 56 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                                                          Write(mail.ten_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(".\r\n                    </p>\r\n");
#nullable restore
#line 58 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                }

#line default
#line hidden
#nullable disable
                WriteLiteral("\r\n                <p style=\"margin: 8px 0px;\">\r\n                    Căn cứ Hồ sơ yêu cầu trả tiền bảo hiểm do Quý khách cung cấp về sự kiện bảo hiểm của Ông/Bà <span");
                BeginWriteAttribute("style", " style=\"", 3014, "\"", 3036, 2);
                WriteAttributeValue("", 3022, "color:", 3022, 6, true);
#nullable restore
#line 61 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 3028, ma_mau, 3029, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 61 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                        Write(mail.nguoi_lh);

#line default
#line hidden
#nullable disable
                WriteLiteral(",</span>\r\n                    sau khi xem xét phạm vi bảo hiểm, ");
#nullable restore
#line 62 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                 Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" rất tiếc phải thông báo <span style=\"color: #035299\">");
#nullable restore
#line 62 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                            Write(mail.ma_doi_tac_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral(@"</span> không thể chi trả số tiền bảo hiểm theo đề nghị của Quý khách với các lý do như sau:
                </p>
                <p style=""margin: 8px 0px;""><i>Nguyên tệ: VNĐ</i></p>
                <table class=""table"" style=""margin-top: 15px; font-size: 12px;"">
                    <thead>
                        <tr class=""table-active"" style=""background-color: #f2f2f2;"">
                            <th scope=""col"" style=""text-align: center;"">Sự kiện bảo hiểm</th>
                            <th scope=""col"" style=""text-align: center;"">Số tiền phát sinh</th>
                            <th scope=""col"" style=""text-align: center;"">Lý do</th>
                            <th scope=""col"" style=""text-align: center;"">Diễn giải</th>
                        </tr>
                    </thead>
                    <tbody>
");
#nullable restore
#line 75 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                         if (dsQuyenLoi != null && dsQuyenLoi.Count() > 0)
                        {
                            foreach (var qloi in dsQuyenLoi)
                            {

#line default
#line hidden
#nullable disable
                WriteLiteral("                                <tr>\r\n                                    <th scope=\"row\">");
#nullable restore
#line 80 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                               Write(qloi.ten_ql);

#line default
#line hidden
#nullable disable
                WriteLiteral("</th>\r\n                                    <td style=\"font-family: \'Tahoma\';text-align: right;\">");
#nullable restore
#line 81 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                    Write(qloi.tien_yc);

#line default
#line hidden
#nullable disable
                WriteLiteral("</td>\r\n                                    <td style=\"font-family: \'Tahoma\';\">");
#nullable restore
#line 82 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                  Write(qloi.nguyen_nhan_giam);

#line default
#line hidden
#nullable disable
                WriteLiteral("</td>\r\n                                    <td style=\"font-family: \'Tahoma\';\">");
#nullable restore
#line 83 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                  Write(qloi.ghi_chu_qloi);

#line default
#line hidden
#nullable disable
                WriteLiteral("</td>\r\n                                </tr>\r\n");
#nullable restore
#line 85 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                            }
                        }

#line default
#line hidden
#nullable disable
                WriteLiteral("                    </tbody>\r\n                </table>\r\n                <p style=\"margin: 8px 0px;\">\r\n                    <b>Để tra cứu tình trạng hồ sơ và quá trình giải quyết, Quý khách vui lòng dùng ứng dụng ");
#nullable restore
#line 90 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                        Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" trên mobile</b>
                </p>
                <p style=""margin: 8px 0px;"">
                    Mọi thông tin cần làm rõ về phương án giải quyết nêu trên, Quý khách hàng vui lòng liên hệ với chúng tôi theo địa chỉ:
                </p>
                <p");
                BeginWriteAttribute("style", " style=\"", 5252, "\"", 5332, 10);
                WriteAttributeValue("", 5260, "color:", 5260, 6, true);
#nullable restore
#line 95 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 5266, ma_mau, 5267, 7, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 5274, ";", 5274, 1, true);
                WriteAttributeValue(" ", 5275, "font-family:", 5276, 13, true);
                WriteAttributeValue(" ", 5288, "\'Tahoma\';", 5289, 10, true);
                WriteAttributeValue(" ", 5298, "font-size:", 5299, 11, true);
                WriteAttributeValue(" ", 5309, "14px;", 5310, 6, true);
                WriteAttributeValue(" ", 5315, "margin:", 5316, 8, true);
                WriteAttributeValue(" ", 5323, "8px", 5324, 4, true);
                WriteAttributeValue(" ", 5327, "0px;", 5328, 5, true);
                EndWriteAttribute();
                WriteLiteral("><span>");
#nullable restore
#line 95 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                     Write(mail.ten_cong_ty);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></p>\r\n                <ul style=\"line-height: 20px; margin: 8px 0px; font-family: \'Tahoma\'; font-size: 14px;\">\r\n                    <li>Địa chỉ: <span");
                BeginWriteAttribute("style", " style=\"", 5514, "\"", 5536, 2);
                WriteAttributeValue("", 5522, "color:", 5522, 6, true);
#nullable restore
#line 97 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 5528, ma_mau, 5529, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 97 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                         Write(mail.dchi_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n                    <li>Số điện thoại: <span");
                BeginWriteAttribute("style", " style=\"", 5609, "\"", 5631, 2);
                WriteAttributeValue("", 5617, "color:", 5617, 6, true);
#nullable restore
#line 98 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 5623, ma_mau, 5624, 7, false);

#line default
#line hidden
#nullable disable
                EndWriteAttribute();
                WriteLiteral(">");
#nullable restore
#line 98 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                               Write(mail.d_thoai_dt);

#line default
#line hidden
#nullable disable
                WriteLiteral("</span></li>\r\n");
                WriteLiteral("                </ul>\r\n                <p");
                BeginWriteAttribute("style", " style=\"", 5998, "\"", 6057, 8);
                WriteAttributeValue("", 6006, "margin:", 6006, 7, true);
                WriteAttributeValue(" ", 6013, "8px", 6014, 4, true);
                WriteAttributeValue(" ", 6017, "0px;", 6018, 5, true);
                WriteAttributeValue(" ", 6022, "font-weight:", 6023, 13, true);
                WriteAttributeValue(" ", 6035, "bold;", 6036, 6, true);
                WriteAttributeValue(" ", 6041, "color:", 6042, 7, true);
#nullable restore
#line 103 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 6048, ma_mau, 6049, 7, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 6056, ";", 6056, 1, true);
                EndWriteAttribute();
                WriteLiteral(">Chúng tôi xin được chia sẻ và rất mong nhận được sự thông cảm từ Quý khách.</p>\r\n                <p");
                BeginWriteAttribute("style", " style=\"", 6158, "\"", 6217, 8);
                WriteAttributeValue("", 6166, "margin:", 6166, 7, true);
                WriteAttributeValue(" ", 6173, "8px", 6174, 4, true);
                WriteAttributeValue(" ", 6177, "0px;", 6178, 5, true);
                WriteAttributeValue(" ", 6182, "font-weight:", 6183, 13, true);
                WriteAttributeValue(" ", 6195, "bold;", 6196, 6, true);
                WriteAttributeValue(" ", 6201, "color:", 6202, 7, true);
#nullable restore
#line 104 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
WriteAttributeValue(" ", 6208, ma_mau, 6209, 7, false);

#line default
#line hidden
#nullable disable
                WriteAttributeValue("", 6216, ";", 6216, 1, true);
                EndWriteAttribute();
                WriteLiteral(@">Trân trọng Cảm ơn!</p>
                <br />
                <hr />
                <p style=""font-family: 'Tahoma'; font-size: 10px; margin-top: 5px; opacity:0.4;"">
                    <span>
                        Email này cùng các tệp tin đính kèm là các thông tin bảo mật của ");
#nullable restore
#line 109 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                    Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" và có mục đích chỉ gửi cho những người nhận được nêu tại email.
                        Nếu Quý vị không phải là người nhận dự kiến của email này cùng các tập tin kèm theo, vui lòng không thực hiện bất cứ hành động nào trên cơ sở email và các tập tin này. Việc chia sẻ hoặc tiết lộ bất cứ nội dung nào của email này hoặc bất kỳ tập tin đính kèm nào là không được phép, trừ khi có sự đồng ý trước bằng văn bản của ");
#nullable restore
#line 110 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                                                                                                                                        Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(".\r\n                        Trường hợp Quý vị nhận được email này do có sự nhầm lẫn hoặc lỗi hệ thống, vui lòng thông báo ngay cho ");
#nullable restore
#line 111 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                          Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" bằng việc phản hồi lại email này, đồng thời xóa email này cùng các tập tin đính kèm khỏi hệ thống của Quý vị.\r\n                        ");
#nullable restore
#line 112 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" không chịu bất kỳ trách nhiệm nào về bất cứ sự truyền tải không chính xác, không đầy đủ hay không kịp thời của bất kỳ thông tin nào trong email. Mặc dù ");
#nullable restore
#line 112 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                 Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" đã thực hiện các biện pháp cần thiết để đảm bảo email này không có chứa virus, ");
#nullable restore
#line 112 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                                                                                                                                      Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" không chịu trách nhiệm đối với bất cứ thiệt hại hay tổn thất nào phát sinh từ việc nhận hoặc sử dụng email hoặc bất kỳ tệp tin đính kèm nào.
                    </span>
                </p>
                <p style=""font-family: 'Tahoma'; font-size: 10px; margin-top: 10px; opacity:0.4;"">
                    <span>
                        This email and any file transmitted with it are confidential information of ");
#nullable restore
#line 117 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                               Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(@" and intended solely for the use of the individual or entity to whom they are addressed.
                        If you are not the intended recipient, please do not take any action in reliance on this email.
                        Without prior written consent of ");
#nullable restore
#line 119 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                    Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(", any disclosure or distribution of this email or any of its attachments is strictly prohibited.\r\n                        If you have received this email in error, kindly notify ");
#nullable restore
#line 120 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                           Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" immediately by replying to this email and then delete this email along with all attachments from your system.\r\n                        ");
#nullable restore
#line 121 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                   Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" shall not take any responsibility for any improper, incomplete or delayed transmission of any information contained in this email. Although ");
#nullable restore
#line 121 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
                                                                                                                                                                                     Write(mail.ten_cong_ty_tat);

#line default
#line hidden
#nullable disable
                WriteLiteral(" has taken reasonable precautions to ensure no viruses are present in this email, ");
#nullable restore
#line 121 "D:\ESCS\ESCS\FILE_CAM_XOA\ATACC\TEMPLATE_MAIL\template_email_tu_choi_boi_thuong_vien_phi_nguoi.cshtml"
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