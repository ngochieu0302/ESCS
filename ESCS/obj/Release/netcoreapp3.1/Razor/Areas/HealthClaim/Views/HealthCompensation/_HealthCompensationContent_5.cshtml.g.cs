#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\HealthCompensation\_HealthCompensationContent_5.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a315c7ba1ecbb06d7df5f74d80ce593a84809d95"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_HealthCompensation__HealthCompensationContent_5), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/HealthCompensation/_HealthCompensationContent_5.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a315c7ba1ecbb06d7df5f74d80ce593a84809d95", @"/Areas/HealthClaim/Views/HealthCompensation/_HealthCompensationContent_5.cshtml")]
    public class Areas_HealthClaim_Views_HealthCompensation__HealthCompensationContent_5 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row mx-0 pos-relative"">
    <div class=""col-12 pr-0 pl-0"">
        <div class=""table-responsive"">
            <table class=""table table-bordered fixed-header"">
                <tr style=""background-color: #f8f9fa;"">
                    <td class=""p-1"">
                        <div class=""form-group m-0"">
                            <div class=""input-group"">
                                <div style=""width:20%"">
                                    <select id=""kieuXemLSTT"" class=""select2 form-control custom-select"" name=""nguon"" style=""width:100%"">
                                        <option value=""KIEU1"" selected>Kiểu 1</option>
                                        <option value=""KIEU2"">Kiểu 2</option>
                                    </select>
                                </div>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" id=""inputSearch_LichSuTonThat"" placeholder=""Nhập tên quyền lợi bảo hiểm"">
                             ");
            WriteLiteral(@"   <div class=""input-group-append"">
                                    <label class=""input-group-text"">
                                        <a href=""#"" id=""btnExportExcelLSTT"">
                                            <i class=""fas fa-download"" title=""Export lịch sử tổn thất""></i>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class=""table-responsive"" style=""max-height: 66.5vh;"" id=""div_kieu_1"">
            <table style=""width:300%;"" class=""table table-bordered fixed-header"">
                <thead class=""text-center font-weight-bold"">
                    <tr>
                        <th>Ngày mở</th>
                        <th>Số hồ sơ</th>
                        <th>Loại</th>
                        <th>Ngày vv</th>
                     ");
            WriteLiteral(@"   <th>Ngày rv</th>
                        <th>Hình thức điều trị</th>
                        <th>Nguyên nhân</th>
                        <th>Quyền lợi</th>
                        <th>Cơ sở y tế</th>
                        <th style=""width: 25%;"">Chẩn đoán</th>
                        <th>Tiền yêu cầu</th>
                        <th>Tiền duyệt</th>
                        <th>Số ngày duyệt</th>
                        <th>Trạng thái</th>
                        <th>Lý do giảm trừ</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody id=""tblLichSuTonThatConNguoi"">
                </tbody>
                <tfoot>
                    <tr class=""font-weight-bold text-center"">
                        <td colspan=""10"">Tổng cộng</td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienYeuCauLSTT""></td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienD");
            WriteLiteral(@"uyetLSTT""></td>
                        <td colspan=""4""></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class=""table-responsive"" style=""max-height: 66.5vh;"" id=""div_kieu_2"">
            <table style=""width:100%;"" class=""table table-bordered fixed-header"">
                <thead class=""text-center font-weight-bold"">
                    <tr>
                        <th>Quyền lợi</th>
                        <th>Tổng tiền yêu cầu</th>
                        <th>Tổng tiền duyệt</th>
                        <th>Tổng số ngày duyệt</th>
                    </tr>
                </thead>
                <tbody id=""tblLichSuTonThatConNguoiGroup"">
                </tbody>
                <tfoot>
                    <tr class=""font-weight-bold text-center"">
                        <td>Tổng cộng</td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienYeuCauLSTTGroup""></td>
                        <td clas");
            WriteLiteral("s=\"text-right font-weight-bold text-danger\" id=\"tongTienDuyetLSTTGroup\"></td>\r\n                        <td></td>\r\n                    </tr>\r\n                </tfoot>\r\n            </table>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
