#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\_MotorcycleClaimListGara.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0e08de1367afb0f7ce17409746fa1aaad842141b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views__MotorcycleClaimListGara), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/_MotorcycleClaimListGara.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0e08de1367afb0f7ce17409746fa1aaad842141b", @"/Areas/MotorcycleClaim/Views/_MotorcycleClaimListGara.cshtml")]
    public class Areas_MotorcycleClaim_Views__MotorcycleClaimListGara : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalGaraList"" class=""modal fade"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Danh sách Gara</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form name=""frmTKiemGara"" method=""post"">
                    <div class=""row"">
                        <div class=""col-4"">
                            <div class=""form-group"">
                                <label>Tỉnh/thành</label>
                                <select class=""select2 form-control custom-select"" name=""tinh_thanh"" style=""width:100%""></select>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""form-group"">
          ");
            WriteLiteral(@"                      <label>Quận/huyện</label>
                                <select class=""select2 form-control custom-select"" name=""quan_huyen"" style=""width:100%""></select>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""form-group"">
                                <label>Tên gara</label>
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control"" name=""ten"" placeholder=""Tên gara"" autocomplete=""off"">
                                    <div class=""input-group-append"">
                                        <label class=""input-group-text"" for=""ten"">
                                            <a href=""#"" id=""btnModalGaraListSearch"">
                                                <i class=""fa fa-search""></i>
                                            </a>
                                        </label>
            ");
            WriteLiteral(@"                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mt-3"">
                        <div class=""col-12"">
                            <div class=""table-responsive scrollable"" style=""max-height:350px;"">
                                <table id=""tableTKiemGara"" class=""table table-bordered"">
                                    <thead class=""font-weight-bold"">
                                        <tr style=""background-color: #1e88e5; color: #FFF;"">
                                            <th style=""width:45px;""></th>
                                            <th class=""text-center"">Tên gara</th>
                                            <th class=""text-center"">Địa chỉ</th>
                                        </tr>
                                    </thead>
                                    <tbody id=""bodyTableTKiemGara"">
             ");
            WriteLiteral(@"                           <tr>
                                            <td class=""text-center"" colspan=""3"">Chưa có dữ liệu</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button class=""btn btn-primary btn-sm wd-90 mg-t-22"" id=""btnChonGara""><i class=""fas fa-check""></i>&nbsp;&nbsp;Chọn</button>
                <button class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""modal"" id=""ModalGaraList_close""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
            </div>
        </div>
    </div>
</div>");
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
