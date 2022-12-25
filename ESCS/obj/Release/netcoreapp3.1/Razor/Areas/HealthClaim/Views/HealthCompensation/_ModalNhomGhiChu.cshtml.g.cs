#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\HealthCompensation\_ModalNhomGhiChu.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "26b0d986db57ea1490dc5d9d639c86bba462fa72"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_HealthCompensation__ModalNhomGhiChu), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/HealthCompensation/_ModalNhomGhiChu.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"26b0d986db57ea1490dc5d9d639c86bba462fa72", @"/Areas/HealthClaim/Views/HealthCompensation/_ModalNhomGhiChu.cshtml")]
    public class Areas_HealthClaim_Views_HealthCompensation__ModalNhomGhiChu : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalNhomGhiChu"" class=""modal-drag"" style=""width: 300px; z-index: 9999999; left: 120px;"">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn nhóm ghi chú</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""inputSearch_NhomGhiChu"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalNhomGhiChuElementSelect"">
                
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalNhomGhiChuDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"" style=""height: 32px; border-top: 1px solid #eaeaea; margin:0px 0px 10px 0px;"">
        <button type=""button"" class=""btn btn-primary btn-");
            WriteLiteral(@"sm wd-85 float-right"" id=""btnChonNhomGhiChu"">
            <i class=""fas fa-mouse-pointer mr-1""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalNhomGhiChuDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox dsngc"" id=""dsngc_<%- item.ma %>"">
        <input type=""checkbox"" id=""nhom_chi_chu_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonNhomGhiChuItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""nhom_chi_chu_<%- item.ma %>""><%- item.ma %> - <%- item.nhom %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>");
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
