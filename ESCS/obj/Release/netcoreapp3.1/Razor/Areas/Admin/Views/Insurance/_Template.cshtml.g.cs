#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\Insurance\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "38d36c2ffef1280ed858407bde7e139a7508c673"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_Insurance__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/Insurance/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"38d36c2ffef1280ed858407bde7e139a7508c673", @"/Areas/Admin/Views/Insurance/_Template.cshtml")]
    public class Areas_Admin_Views_Insurance__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""dsNhomQuyenTemplate"">
    <% _.forEach(nhom_quyen, function(item, index) {%>
    <div class=""col-6"">
        <div class=""custom-control custom-checkbox"">
            <input type=""checkbox"" id=""menu_nhom_quyen_<%- item.nhom_chuc_nang %>"" value=""<%- item.nhom_chuc_nang %>"" onchange=""chonNhomQuyen(this)"" class=""custom-control-input menu_nhom_quyen"">
            <label class=""custom-control-label"" for=""menu_nhom_quyen_<%- item.nhom_chuc_nang %>"" style=""padding-top:2px""><%- item.ten_chuc_nang %></label>
        </div>
    </div>
    <%})%>
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
