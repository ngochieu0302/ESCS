#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\ApprovedOther\_ApprovedContentStep3.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8fccdf829452d146c0de6a6829983beea4bdaa7f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_ApprovedOther__ApprovedContentStep3), @"mvc.1.0.view", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep3.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8fccdf829452d146c0de6a6829983beea4bdaa7f", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep3.cshtml")]
    public class Areas_Manager_Views_ApprovedOther__ApprovedContentStep3 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row mg-t-10"" style=""height:79vh"">
    <div class=""col-12"">
        <div class=""card mb-0"" style=""height:99%"">
            <div class=""row"">
                <div class=""col-12"">
                    <form id=""_frmPheDuyet_tab2"" name=""_frmPheDuyet_tab2"" novalidate=""novalidate"" method=""post"">
                        <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 365, "\"", 373, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"ma_doi_tac\"");
            BeginWriteAttribute("value", " value=\"", 441, "\"", 449, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"ma_doi_tac_xl\"");
            BeginWriteAttribute("value", " value=\"", 520, "\"", 528, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"bt\"");
            BeginWriteAttribute("value", " value=\"", 588, "\"", 596, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"nv\"");
            BeginWriteAttribute("value", " value=\"", 656, "\"", 664, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"loai\"");
            BeginWriteAttribute("value", " value=\"", 726, "\"", 734, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"noi_dung\"");
            BeginWriteAttribute("value", " value=\"", 800, "\"", 808, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"noi_dung_duyet\"");
            BeginWriteAttribute("value", " value=\"", 880, "\"", 888, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    </form>\r\n                    <div class=\"table-responsive\">\r\n");
            WriteLiteral(@"                        <table class=""table table-bordered fixed-header tblStep3"" style=""display:none"" id=""tblStep3_tubt"">
                            <thead class=""font-weight-bold card-title-bg-primary"">
                                <tr class=""text-center uppercase"">
                                    <th>PTTT</th>
                                    <th>Tên đối tượng thụ hưởng</th>
                                    <th>Số TK</th>
                                    <th>Ngân hàng</th>
                                    <th>Nội dung</th>
                                    <th>Số tiền</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody id=""tblStep3_tubt_tbody""></tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td colspan=""3"" class=""text-left"">
                           ");
            WriteLiteral(@"         </td>
                                    <td class=""font-weight-bold text-center"" colspan=""2"">
                                        Tổng cộng tiền cần duyệt
                                    </td>
                                    <td class=""font-weight-bold text-right tam_ung_tong"">
                                    </td>
                                    <td class=""font-weight-bold"">
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div class=""table-responsive"">
");
            WriteLiteral(@"                        <table class=""table table-bordered fixed-header tblStep3"" style=""display:none"" id=""tblStep3_ntba"">
                            <thead class=""font-weight-bold card-title-bg-primary"">
                                <tr class=""text-center uppercase"">
                                    <th>Tên đối tượng thu đòi</th>
                                    <th>Điện thoại</th>
                                    <th>Số tiền</th>
                                    <th>Địa chỉ</th>
                                    <th>Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody id=""tblStep3_ntba_tbody""></tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td colspan=""2"" class=""text-left"">
                                        Tổng cộng tiền cần duyệt
                                    </td>
                          ");
            WriteLiteral(@"          <td class=""font-weight-bold text-right ntba_tong"">
                                    </td>
                                    <td class=""font-weight-bold"" colspan=""2"">
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            <div class=""row text-right"">
                <div class=""col-12 mg-t-10"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 mr-2"" id=""btnDongY3"">
                        <i class=""fas fa-plus-square mr-2""></i>Duyệt
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-130 mr-2"" id=""btnHuyDongY3"">
                        <i class=""fas fa-plus-square mr-2""></i>Hủy Duyệt
                    </button>
                    <button type=""button"" class=""btn-outline-primary btn-sm wd-90"" id=""btnDong3"" data-dismiss=""esm");
            WriteLiteral("odal\">\r\n                        <i class=\"fas fa-window-close mr-2\"></i>Đóng\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
