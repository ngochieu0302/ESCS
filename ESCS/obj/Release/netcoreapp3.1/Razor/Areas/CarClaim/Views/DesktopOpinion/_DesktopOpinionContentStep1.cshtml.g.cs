#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\DesktopOpinion\_DesktopOpinionContentStep1.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "695ac7a309303bd5eaca76c0fe8840cf7e918675"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_DesktopOpinion__DesktopOpinionContentStep1), @"mvc.1.0.view", @"/Areas/CarClaim/Views/DesktopOpinion/_DesktopOpinionContentStep1.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"695ac7a309303bd5eaca76c0fe8840cf7e918675", @"/Areas/CarClaim/Views/DesktopOpinion/_DesktopOpinionContentStep1.cshtml")]
    public class Areas_CarClaim_Views_DesktopOpinion__DesktopOpinionContentStep1 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    #dropdownGDVHT {
        border: 1px solid rgb(233, 236, 239);
        width: 250px;
        box-shadow: rgb(106, 160, 201) -2px 4px 10px 0px;
        position: absolute;
        left: 0px;
        transform: translate3d(593px, -103px, 0px);
        top: 0px;
        will-change: transform;
    }

    #dropdownGDVTT {
        border: 1px solid rgb(233, 236, 239);
        width: 250px;
        box-shadow: rgb(106, 160, 201) -2px 4px 10px 0px;
        position: absolute;
        left: -50px;
        transform: translate3d(593px, -103px, 0px);
        top: 35px;
        will-change: transform;
    }
</style>
<div class=""row"">
    <div class=""col-12 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:78vh; overflow: scroll;"">
");
            WriteLiteral(@"                    <div class=""col-12 px-0"">
                        <form name=""frmDienBienTonThat"" method=""post"">
                            <div class=""col-12 mt-2"">
                                <div class=""d-flex justify-content-between align-items-center"">
                                    <h6 class=""font-weight-bold"">&nbsp;1. Thông tin vụ tổn thất</h6>
                                </div>
                                <table class=""table table-bordered fixed-header"">
                                    <tr>
                                        <th style=""width: 130px; color: #000; vertical-align: middle;"">Vụ tổn thất</th>
                                        <th colspan=""3"">
                                            <select class=""form-control custom-select select2"" style=""width:100%;"" name=""vu_tt"" id=""vu_tt"">
                                            </select>
                                        </th>
                                    </tr>
                     ");
            WriteLiteral("           </table>\r\n                            </div>\r\n                            <div class=\"col-12\" id=\"tblDienBienTonThat\">\r\n                            </div>\r\n                        </form>\r\n                    </div>\r\n");
            WriteLiteral(@"                    <div class=""col-12 px-0"">
                        <form name=""frmThongTinGiamDinh"" method=""post"">
                            <div class=""col-12 mt-2"">
                                <div class=""d-flex justify-content-between align-items-center"">
                                    <h6 class=""font-weight-bold"">&nbsp;2. Thông tin lần giám định</h6>
                                </div>
                                <table class=""table table-bordered fixed-header"">
                                    <tr>
                                        <td style=""width: 130px; color: #000; font-weight: bold; vertical-align: middle; "">Lần giám định</td>
                                        <td colspan=""3"">
                                            <select class=""form-control custom-select select2"" style=""width:100%;"" name=""lan_gd"" id=""lan_gd""></select>
                                        </td>
                                    </tr>
                                </table>");
            WriteLiteral("\r\n                            </div>\r\n                            <div class=\"col-12\" id=\"tblThongTinGiamDinh\"></div>\r\n                        </form>\r\n                    </div>\r\n");
            WriteLiteral(@"                    <div class=""col-12 mt-2"">
                        <div class=""d-flex justify-content-between align-items-center"">
                            <h6 class=""font-weight-bold"">&nbsp;3. Đại diện các bên tham gia giám định</h6>
                        </div>
                        <div class=""table-responsive"" style=""max-height:208px"">
                            <table class=""table table-striped table-bordered fixed-header"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width: 200px;"">Đại diện</th>
                                        <th style=""width: 270px;"">Họ và tên</th>
                                        <th style=""width: 100px;"">Điện thoại</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody class=""tex");
            WriteLiteral("t-center\" id=\"tblThongTinCacBenThamGiaGD\"></tbody>\r\n                            </table>\r\n                        </div>\r\n                    </div>\r\n");
            WriteLiteral(@"                   <div class=""col-12 mt-2"">
                        <div class=""d-flex justify-content-between align-items-center"">
                            <h6 class=""font-weight-bold"">&nbsp;4. Thông tin hồ sơ giấy tờ</h6>
                        </div>
                        <div class=""table-responsive"" style=""max-height:350px"">
                            <table class=""table table-striped table-bordered fixed-header"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width: 200px;"">Tên giấy tờ</th>
                                        <th style=""width: 170px;"">Ngày cung cấp</th>
                                        <th style=""width: 100px;"">Loại</th>
                                        <th style=""width: 100px;"">Hợp lệ</th>
                                        <th>Trạng thái</th>
                                        <th>Yêu cầu bổ sung</t");
            WriteLiteral(@"h>
                                    </tr>
                                </thead>
                                <tbody class=""text-center"" id=""tblThongTinHoSoGiayToYKien""></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
");
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
