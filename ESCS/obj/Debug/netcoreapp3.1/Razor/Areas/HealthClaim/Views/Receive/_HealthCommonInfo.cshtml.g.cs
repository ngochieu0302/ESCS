#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\Receive\_HealthCommonInfo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a6b9dbda3ef7c92d2ed9883442cfe0659e985ca0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_Receive__HealthCommonInfo), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/Receive/_HealthCommonInfo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a6b9dbda3ef7c92d2ed9883442cfe0659e985ca0", @"/Areas/HealthClaim/Views/Receive/_HealthCommonInfo.cshtml")]
    public class Areas_HealthClaim_Views_Receive__HealthCommonInfo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""card mb-0 h-100"" id=""navThongTinHoSo"">
    <ul class=""nav nav-tabs profile-tab"" role=""tablist"">
        <li class=""nav-item shown"">
            <a class=""nav-link active"" data-toggle=""tab"" href=""#navThongTinChung"" role=""tab"" aria-selected=""true"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-info-circle""></i> Thông tin chung
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-info-circle""></i>
                </span>
            </a>
        </li>
        <li class=""nav-item shown"" onclick=""xemQuaTrinhXuLy('navQuaTrinhGiaiQuyet')"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navQuaTrinhGiaiQuyet"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-eye""></i> Quá trình giải quyết
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-eye""></i>
       ");
            WriteLiteral(@"         </span>
            </a>
        </li>
    </ul>
    <!-- Tab panes -->
    <div class=""tab-content border border-top-0 scrollable"">
        <div class=""tab-pane active p-0"" id=""navThongTinChung"" role=""tabpanel"">
            <div class=""card-body p-2"">
                <div class=""border mb-2 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Thông tin hồ sơ</h5>
                    </div>
                    <table class=""table"" id=""HealthGuaranteeCommon"">
                        <tr>
                            <td>Ngày mở hsbt</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Ngày thông báo</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Nguồn thông báo</td>
                            <td></td>
             ");
            WriteLiteral(@"           </tr>
                        <tr>
                            <td>Trạng thái xử lý</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Tổng tiền yêu cầu</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Tổng tiền duyệt</td>
                            <td>0</td>
                        </tr>
                    </table>
                </div>
                <div class=""border mb-3 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Khách hàng</h5>
                        <span>
                            <a href=""#"" id=""btnSuaThongTinNDBH"">
                                <i class=""far fa-edit""></i>
                            </a>
                        </span>
                    </div>
                    <");
            WriteLiteral(@"table class=""table"" id=""HealthGuaranteeCustomer"">
                        <tr>
                            <td>Tên</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Số HĐBH</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Đơn vị cấp</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Số GCN</td>
                            <td data-field=""gcn"">
                                <span style=""float:right"">
                                    <a href=""#"" data-toggle=""modal"" data-target=""#HealthGuaranteeCertificate"">
                                        <i class=""fas fa-eye"" title=""Xem chi tiết quyền lợi bảo hiểm""></i>
                                    </a>
                                </span>
                            </td>
            ");
            WriteLiteral(@"            </tr>
                        <tr>
                            <td>Tên NĐBH</td>
                            <td data-field=""ten_ndbh"">Nguyễn Trần Vân Anh</td>
                        </tr>
                        <tr>
                            <td>CMT/Hộ chiếu</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Ngày sinh</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Điện thoại</td>
                            <td data-field=""dien_thoai"">
                                <span style=""float:right"">
                                    <a href=""#""><i class=""fal fa-phone-rotary"" title=""Gọi điện thoại""></i></a>
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Hiệu lực BH</td>
                      ");
            WriteLiteral(@"      <td></td>
                        </tr>
                        <tr>
                            <td>Người liên hệ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>SĐT liên hệ</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>Email liên hệ</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <!--second tab-->
        <div class=""tab-pane p-0"" id=""navQuaTrinhGiaiQuyet"" role=""tabpanel"">
            <div class=""card-body p-2"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg border-bottom"">
                        <h5 class=""m-0"">Quá trình giải quyết</h5>
                        <span><a href=""#"" id=""btnXemTien");
            WriteLiteral("TrinhGiaiQuyet\" data-toggle=\"modal\" ");
            WriteLiteral("><i class=\"far fa-stream\"></i></a></span>\r\n                    </div>\r\n                    <div class=\"timeline mt-2\" id=\"navQuaTrinhGiaiQuyetTimeLine\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
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
