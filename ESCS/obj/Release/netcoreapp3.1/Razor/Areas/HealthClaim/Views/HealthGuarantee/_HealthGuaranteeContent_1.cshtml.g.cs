#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\HealthGuarantee\_HealthGuaranteeContent_1.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b21265e7a715bb4824a1bf2dd4d4a1ba743d404a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_HealthGuarantee__HealthGuaranteeContent_1), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/HealthGuarantee/_HealthGuaranteeContent_1.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b21265e7a715bb4824a1bf2dd4d4a1ba743d404a", @"/Areas/HealthClaim/Views/HealthGuarantee/_HealthGuaranteeContent_1.cshtml")]
    public class Areas_HealthClaim_Views_HealthGuarantee__HealthGuaranteeContent_1 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row"">
    <div class=""col-12 px-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""d-flex justify-content-between align-items-center py-2 card-title-bg"">
                    <h5 class=""m-0"">Thông tin các lần bảo lãnh viện phí</h5>
                    <span>
                        <a href=""#"" class=""float-right"" id=""btnMoModalThemLanBaoLanh"">
                            <i class=""fas fa-plus-square mr-2""></i>Tạo mới lần bảo lãnh
                        </a>
                    </span>
                </div>
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""table-responsive table-app"" style=""max-height:180px""");
            BeginWriteAttribute("id", " id=\"", 755, "\"", 760, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                            <table id=""tbl_lan_bao_lanh"" class=""table table-bordered fixed-header"">
                                <thead class=""font-weight-bold card-title-bg-primary"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width: 6%;"">Lần BL</th>
                                        <th style=""width: 14%;"">Ngày yêu cầu</th>
                                        <th style=""width: 15%;"">Ngày duyệt</th>
                                        <th style=""width: 20%;"">Người duyệt</th>
                                        <th style=""width: 10%;"">Số tiền YC</th>
                                        <th style=""width: 10%;"">Tiền đề xuất</th>
                                        <th style=""width: 9%;"">Số tiền duyệt</th>
                                        <th style=""width: 12%;"">Trạng thái</th>
                                        <th style=""width: 4%;""></th>
                                    </tr");
            WriteLiteral(@">
                                </thead>
                                <tbody id=""tblLanBaoLanh"">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""card mb-0"" id=""divQuyenLoi"">
            <div class=""card-body p-0"">
                <div class=""d-flex justify-content-between align-items-center py-2 card-title-bg"">
                    <h5 class=""m-0"">Thông tin chi tiết quyền lợi bảo lãnh lần <span class=""so_lan""></span></h5>
                    <span>
                        <a href=""javascript:void(0)"" id=""btnTraCuuBangGiaDichVu"" class=""font-weight-bold mr-2"">
                            <i class=""fas fa-search""></i> Tra cứu bảng giá dịch vụ
                        </a>
                        <a href=""javascript:void(0)"" id=""btnXemQuyenLoiChiTiet"" class=""font-weight-bold"">
                            <i class=""fas fa-file-sea");
            WriteLiteral(@"rch""></i> Xem quyền lợi chi tiết GCN bảo hiểm
                        </a>
                    </span>
                </div>
                <div class=""table-responsive"" style=""max-height:285px"">
                    <table id=""tbl_lan_bao_lanh_quyen_loi"" class=""table table-bordered fixed-header"">
                        <thead class=""font-weight-bold card-title-bg-primary"">
                            <tr class=""text-center uppercase"">
                                <th style=""width: 30%"">Quyền lợi</th>
                                <th style=""width: 25%"">Chẩn đoán</th>
                                <th style=""width: 10%"">Số tiền YC</th>
                                <th style=""width: 10%"">Giảm trừ</th>
                                <th style=""width: 9%"">Số tiền duyệt</th>
                                <th style=""width: 8%"">Ghi chú NB</th>
                                <th style=""width: 4%""></th>
                                <th style=""width: 4%""></th>
                       ");
            WriteLiteral(@"     </tr>
                        </thead>
                        <tbody id=""tblQloiLan"">
                        </tbody>
                        <tfoot>
                            <tr>
                                <td class=""font-weight-bold"" colspan=""2"">
                                    Tổng cộng
                                </td>
                                <td class=""font-weight-bold text-right"" id=""tblQloiLanTongTienYC"">0</td>
                                <td class=""font-weight-bold text-right"" id=""tblQloiLanTongGiamTru"">0</td>
                                <td class=""font-weight-bold text-right"" id=""tblQloiLanTongTienDuyet"">0</td>
                                <td class=""text-right"" colspan=""3"">
                                    <a href=""#"" class=""float-right"" id=""btnThemQuyenLoi"">
                                        <i class=""fas fa-plus-square mr-2""></i>Thêm mới quyền lợi
                                    </a>
                                </td>
     ");
            WriteLiteral("                       </tr>\r\n                        </tfoot>\r\n                    </table>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
