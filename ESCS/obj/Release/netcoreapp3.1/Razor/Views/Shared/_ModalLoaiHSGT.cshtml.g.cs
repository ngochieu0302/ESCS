#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalLoaiHSGT.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ef58371d652dd5c6e57800224503c5299c1111a9"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalLoaiHSGT), @"mvc.1.0.view", @"/Views/Shared/_ModalLoaiHSGT.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ef58371d652dd5c6e57800224503c5299c1111a9", @"/Views/Shared/_ModalLoaiHSGT.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalLoaiHSGT : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalLoaiHSGT"" class=""modal-drag"" style=""width:300px; z-index:9999999;"">
    <div class=""modal-drag-header px-3 border-bottom"">
        <h5><span class=""modal-drag-title"">Chọn loại hồ sơ</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""hidden"" id=""modalLoaiHSGTElementSelect"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalLoaiHSGTDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer px-3 border-top"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-80"" id=""btnChonLoaiHSGT"">
            <i class=""fas fa-mouse-pointer mr-1""></i> Chọn
        </button>
        <button type=""button"" class=""btn-outline-primary btn-sm wd-80 float-right"" id=""btnBoChonLoaiHSGT"">
            <i class=""fas fa-times m");
            WriteLiteral(@"r-1""></i> Bỏ chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalLoaiHSGTTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox"" data-text="""">
        <input type=""checkbox"" id=""loai_hsgt_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonLoaiHSGTItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""loai_hsgt_<%- item.ma %>""><%- item.ten %></label>
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
