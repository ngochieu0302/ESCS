#pragma checksum "D:\ESCS\ESCS\Views\Contact\_ModalHangGPLX.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "49386455fa0fd3fcaceeae227dfaf3deac2ccbca"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Contact__ModalHangGPLX), @"mvc.1.0.view", @"/Views/Contact/_ModalHangGPLX.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"49386455fa0fd3fcaceeae227dfaf3deac2ccbca", @"/Views/Contact/_ModalHangGPLX.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Contact__ModalHangGPLX : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalHangGPLX"" class=""modal-drag"" style=""width:350px; z-index:9999999;"">
    <div class=""modal-drag-header border-bottom px-2"">
        <h5><span class=""modal-drag-title px-2"">Chọn hạng giấy phép lái xe</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
");
            WriteLiteral(@"            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalHangGPLXDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer border-top"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonHangGPLX"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalHangGPLXDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox"" data-text="""">
        <input type=""checkbox"" id=""hang_gplx_<%- item.hang_gplx %>"" value=""<%- item.hang_gplx %>"" class=""custom-control-input modalHangGPLXItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""hang_gplx_<%- item.hang_gplx %>""><%- item.hang_gplx %></label>
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
