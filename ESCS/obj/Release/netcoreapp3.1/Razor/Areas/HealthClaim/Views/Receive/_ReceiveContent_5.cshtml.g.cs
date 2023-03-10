#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\Receive\_ReceiveContent_5.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b32fb88e81ee96c28cc17b181c6e857fb5f693ed"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_Receive__ReceiveContent_5), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/Receive/_ReceiveContent_5.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b32fb88e81ee96c28cc17b181c6e857fb5f693ed", @"/Areas/HealthClaim/Views/Receive/_ReceiveContent_5.cshtml")]
    public class Areas_HealthClaim_Views_Receive__ReceiveContent_5 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row mx-0 pos-relative"">
    <div class=""col-12 pr-0 pl-0"">
        <div class=""table-responsive"" style=""max-height: 23vh;"">
            <table style=""width:100%;"" class=""table table-bordered fixed-header"">
                <thead class=""text-center font-weight-bold"">
                    <tr>
                        <th width=""40%"">Số hợp đồng</th>
                        <th width=""20%"">Tổng tiền yêu cầu</th>
                        <th width=""20%"">Tổng tiền duyệt</th>
                        <th width=""20%"">Tổng số ngày duyệt</th>
                    </tr>
                </thead>
                <tbody id=""tblTop5DanhSachHD"">
                </tbody>
            </table>
        </div>
        <h5 class=""mt-3"">Lịch sử quyền lợi đã sử dụng</h5>
        <div class=""table-responsive"">
            <table class=""table table-bordered fixed-header"">
                <tr style=""background-color: #f8f9fa;"">
                    <td class=""p-1"">
                        <div class=""form-g");
            WriteLiteral(@"roup m-0"">
                            <div class=""input-group"">
                                <div style=""width:20%"">
                                    <select id=""kieuXemLSTTTop5"" class=""select2 form-control custom-select"" name=""nguon"" style=""width:100%"">
                                        <option value=""KIEU1"" selected>Kiểu 1</option>
                                        <option value=""KIEU2"">Kiểu 2</option>
                                    </select>
                                </div>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" id=""inputSearch_LichSuTonThatTop5"" placeholder=""Nhập tên quyền lợi bảo hiểm"">
                                <div class=""input-group-append"">
                                    <label class=""input-group-text"">
                                        <a href=""#"" id=""btnExportExcelLSTTTop5"">
                                            <i class=""fas fa-download"" title=""Export lịch sử tổn thất""></i>
       ");
            WriteLiteral(@"                                 </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        <div class=""table-responsive"" style=""max-height: 39.5vh;"" id=""div_kieu_1_top_5"">
            <table style=""width:300%;"" class=""table table-bordered fixed-header"">
                <thead class=""text-center font-weight-bold"">
                    <tr>
                        <th>Ngày mở</th>
                        <th>Số hồ sơ</th>
                        <th>Số hợp đồng</th>
                        <th>Loại</th>
                        <th>Ngày vv</th>
                        <th>Ngày rv</th>
                        <th>Hình thức điều trị</th>
                        <th>Nguyên nhân</th>
                        <th>Quyền lợi</th>
                        <th>Cơ sở y tế</th>
                        <th style=""width");
            WriteLiteral(@": 25%;"">Chẩn đoán</th>
                        <th>Tiền yêu cầu</th>
                        <th>Tiền duyệt</th>
                        <th>Số ngày duyệt</th>
                        <th>Trạng thái</th>
                        <th>Lý do giảm trừ</th>
                        <th>Ghi chú</th>
                    </tr>
                </thead>
                <tbody id=""tblLichSuTonThatConNguoiTop5"">
                </tbody>
                <tfoot>
                    <tr class=""font-weight-bold text-center"">
                        <td colspan=""11"">Tổng cộng</td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienYeuCauLSTTTop5""></td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienDuyetLSTTTop5""></td>
                        <td colspan=""4""></td>
                    </tr>
                </tfoot>
            </table>
        </div>
        <div class=""table-responsive"" style=""max-height: 39.5vh;"" id=""div_kieu_2_t");
            WriteLiteral(@"op_5"">
            <table style=""width:100%;"" class=""table table-bordered fixed-header"">
                <thead class=""text-center font-weight-bold"">
                    <tr>
                        <th>Quyền lợi</th>
                        <th>Tổng tiền yêu cầu</th>
                        <th>Tổng tiền duyệt</th>
                        <th>Tổng số ngày duyệt</th>
                    </tr>
                </thead>
                <tbody id=""tblLichSuTonThatConNguoiGroupTop5"">
                </tbody>
                <tfoot>
                    <tr class=""font-weight-bold text-center"">
                        <td>Tổng cộng</td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienYeuCauLSTTGroupTop5""></td>
                        <td class=""text-right font-weight-bold text-danger"" id=""tongTienDuyetLSTTGroupTop5""></td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</");
            WriteLiteral("div>\r\n");
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
