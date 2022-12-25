#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalChiNhanh.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1881ab096e467af83c33fcba07cb47601e4f42d6"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalChiNhanh), @"mvc.1.0.view", @"/Views/Shared/_ModalChiNhanh.cshtml")]
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
#line 1 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1881ab096e467af83c33fcba07cb47601e4f42d6", @"/Views/Shared/_ModalChiNhanh.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalChiNhanh : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalChonChiNhanh"" class=""modal-drag"" style=""width:350px; z-index:9999999; "">
    <div class=""modal-drag-header border-bottom"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn đơn vị xử lý</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""modalChonChiNhanhTimKiem"" onclick=""onFocusTimKiem(this)"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalChonChiNhanhTimKiem_ma"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalChonChiNhanhDanhSach""></div>
        </div>
    </div>
    <div class=""modal-drag-footer"" style=""border-top: 1px solid #e9ecef;"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""Moda");
            WriteLiteral(@"lChonChiNhanh_btnChonDonVi"">
            <i class=""fas fa-mouse-pointer mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalChonChiNhanhDanhSachTemplate"">
    <div class=""border rounded mb-2"">
        <div class=""d-flex justify-content-between align-items-center py-1"" style=""background-color: #f7f7f7;"">
            <div class=""custom-control custom-checkbox ml-2"">
                <input type=""checkbox"" onchange=""onChonTatCaDonVi(this)"" id=""chon_tat_ca"" class=""custom-control-input"">
                <label class=""custom-control-label font-weight-bold"" for=""chon_tat_ca"">Chọn tất cả đơn vị</label>
            </div>
        </div>
    </div>
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox modalChonChiNhanhDanhSachItem ml-2"" data-text=""<%- ESUtil.xoaKhoangTrangText(item.ten_tat) %>"">
        <input type=""checkbox"" id=""chi_nhanh_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-");
            WriteLiteral(@"control-input modalChonChiNhanh"" onclick=""onChonDonVi(this)"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""chi_nhanh_<%- item.ma %>""><%- item.ten_tat %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>

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