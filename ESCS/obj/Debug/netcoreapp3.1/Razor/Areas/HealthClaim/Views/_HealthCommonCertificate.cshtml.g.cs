#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_HealthCommonCertificate.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "01d67b1db750adc0245a32b9c078fbdc5d22a689"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__HealthCommonCertificate), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_HealthCommonCertificate.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"01d67b1db750adc0245a32b9c078fbdc5d22a689", @"/Areas/HealthClaim/Views/_HealthCommonCertificate.cshtml")]
    public class Areas_HealthClaim_Views__HealthCommonCertificate : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade show"" id=""modalXemQuyenLoiChiTiet"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog"" role=""document"" style=""max-width: 95vw; margin-top:10px;"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Quyền lợi chi tiết GCN bảo hiểm</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body px-2 py-0"">
                <div class=""row mt-2"">
                    <div class=""col-12"">
                        <div class=""card border mb-2"">
                            <div class=""card mb-0"">
                                <div class=""card-body"" style=""padding:0px"">
                                    <div class=""row"">
                                        <div class=""col-12"" id=""navThongTinQuyenLoiDKBS"">
                   ");
            WriteLiteral(@"                         <ul class=""nav nav-pills border-bottom"" role=""tablist"" style=""background-color:#f8f9fa"">
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link active"" href=""#tabThongTinQuyenLoiBaoHiem"" data-toggle=""tab"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                                                        <i class=""far fa-file-search mr-2""></i> Quyền lợi chi tiết GCN bảo hiểm
                                                    </a>
                                                </li>
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link"" href=""#tabDieuKhoanBoSung"" data-toggle=""tab"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                                                        <i class=""fas fa-file-plus mr-2""></i> Điều khoản bổ sung");
            WriteLiteral(@"
                                                    </a>
                                                </li>
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link"" href=""#tabGhiChuKhac"" data-toggle=""tab"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                                                        <i class=""fas fa-notes-medical mr-2""></i> Các ghi chú khác
                                                    </a>
                                                </li>
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link"" href=""#tabThongTinLSTT"" data-toggle=""tab"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                                                        <i class=""fas fa-history mr-2""></i> Lịch sử khám chữa bệnh
                            ");
            WriteLiteral(@"                        </a>
                                                </li>
                                            </ul>
                                            <div class=""tab-content"">
                                                <div class=""tab-pane px-0 pt-2"" id=""tabThongTinQuyenLoiBaoHiem"" role=""tabpanel"">
                                                    <div class=""table-responsive"" style=""max-height:71vh"">
                                                        <table class=""table table-bordered"" style=""border-collapse: separate; border-spacing: 0;"">
                                                            <thead class=""font-weight-bold card-title-bg-primary"" style=""position: sticky; top: 0;"">
                                                                <tr>
                                                                    <th rowspan=""2"" style=""text-align:center; width:400px; vertical-align:middle;"">Tên Quyền lợi bảo hiểm</th>
                                   ");
            WriteLiteral(@"                                 <th colspan=""5"" style=""text-align:center"">Quyền lợi bảo hiểm gốc</th>
                                                                    <th colspan=""2"" style=""text-align:center"">Quyền lợi đã sử dụng</th>
                                                                    <th colspan=""2"" style=""text-align:center"">Quyền lợi còn lại</th>
                                                                </tr>
                                                                <tr class=""text-center uppercase"">
                                                                    <th>Số lần(ngày)/năm</th>
                                                                    <th>Số tiền giới hạn(ngày)/năm</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                    <th>Tỷ lệ đồng</th>
                                                                    <th>Số ngày chờ</th>
       ");
            WriteLiteral(@"                                                             <th>Số lần(ngày)</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                    <th>Số lần(ngày)</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id=""dsQuyenLoiGoc"">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class=""tab-pane px-0 pt-2"" id=""tabDieuKhoanBoSung"" role=""tabpanel"">
                                                    <div class");
            WriteLiteral(@"=""table-responsive"" style=""max-height:71vh"">
                                                        <table style=""width:100%;"" class=""table table-bordered fixed-header"">
                                                            <thead class=""font-weight-bold card-title-bg-primary"" style=""position: sticky; top: 0;"">
                                                                <tr class=""text-center uppercase"">
                                                                    <th width=""50%"">ĐIỀU KHOẢN BỔ SUNG</th>
                                                                    <th>SỐ LẦN/NGÀY</th>
                                                                    <th>TIỀN LẦN/NGÀY</th>
                                                                    <th>TIỀN NĂM</th>
                                                                    <th>SỐ NGÀY CHỜ</th>
                                                                </tr>
                                                            </");
            WriteLiteral(@"thead>
                                                            <tbody id=""dsDieuKhoanBoSung"">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class=""tab-pane px-0 pt-2"" id=""tabGhiChuKhac"" role=""tabpanel"">
                                                    <div class=""table-responsive"" style=""max-height:71vh"">
                                                        <table style=""width:100%;"" class=""table table-bordered fixed-header"">
                                                            <thead class=""font-weight-bold card-title-bg-primary"" style=""position: sticky; top: 0;"">
                                                                <tr class=""text-center uppercase"">
                                                                    <t");
            WriteLiteral(@"h width=""5%"">MÃ</th>
                                                                    <th>GHI CHÚ</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id=""dsGhiChuKhac"">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class=""tab-pane px-0 pt-2"" id=""tabThongTinLSTT"" role=""tabpanel"">
                                                    <div class=""table-responsive"" style=""max-height:71vh"">
                                                        <table style=""width:250%;"" class=""table table-bordered fixed-header"">
                                                            <thead class=""text-cen");
            WriteLiteral(@"ter font-weight-bold"">
                                                                <tr>
                                                                    <th>Ngày mở</th>
                                                                    <th>Số hồ sơ</th>
                                                                    <th>Loại</th>
                                                                    <th>Ngày vv</th>
                                                                    <th>Ngày rv</th>
                                                                    <th>Hình thức điều trị</th>
                                                                    <th>Nguyên nhân</th>
                                                                    <th>Quyền lợi</th>
                                                                    <th>Cơ sở y tế</th>
                                                                    <th style=""width: 25%;"">Chẩn đoán</th>
                              ");
            WriteLiteral(@"                                      <th>Tiền yêu cầu</th>
                                                                    <th>Tiền duyệt</th>
                                                                    <th>Số ngày duyệt</th>
                                                                    <th>Trạng thái</th>
                                                                    <th>Lý do giảm trừ</th>
                                                                    <th>Ghi chú</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id=""tblThongTinLSTT"">
                                                            </tbody>
                                                            <tfoot>
                                                                <tr class=""font-weight-bold text-center"">
                                     ");
            WriteLiteral(@"                               <td colspan=""10"">Tổng cộng</td>
                                                                    <td class=""text-right font-weight-bold text-danger"" id=""tongYeuCauLSTT""></td>
                                                                    <td class=""text-right font-weight-bold text-danger"" id=""tongDuyetLSTT""></td>
                                                                    <td colspan=""4""></td>
                                                                </tr>
                                                            </tfoot>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
 ");
            WriteLiteral(@"                   </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
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
