#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\GaraList\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "487d7bc0d452b597e459bc4ad0a1b8a2781f2b1d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_GaraList__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/GaraList/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"487d7bc0d452b597e459bc4ad0a1b8a2781f2b1d", @"/Areas/Admin/Views/GaraList/_Template.cshtml")]
    public class Areas_Admin_Views_GaraList__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""tabledanhSachNV_template"">
    <% if(hmtt.length > 0){ %>
    <% _.forEach(hmtt, function(i,index) { %>
    <tr>
        <td><%- i.ten %></td>
        <td>
            <select class=""select2 form-control custom-select"" multiple name=""muc_do"">
                <% _.forEach(mdtt, function(j,index) { %>
                    <option");
            BeginWriteAttribute("value", " value=\"", 365, "\"", 373, 0);
            EndWriteAttribute();
            WriteLiteral("><%- j.ten %></option>\r\n                <% }) %>\r\n            </select>\r\n        </td>\r\n        <td>\r\n            <input type=\"text\"");
            BeginWriteAttribute("name", " name=\"", 506, "\"", 513, 0);
            EndWriteAttribute();
            WriteLiteral(" maxlength=\"18\" col-gia-thay-the=\"<%- i.gia_thay_the %>\" class=\"number floating-input\" value=\"<%- ESUtil.formatMoney(i.phi) %>\" />\r\n        </td>\r\n        <td>\r\n            <input type=\"text\"");
            BeginWriteAttribute("name", " name=\"", 705, "\"", 712, 0);
            EndWriteAttribute();
            WriteLiteral(" maxlength=\"18\" col-gia-sua-chua=\"<%- i.gia_sua_chua %>\" class=\"number floating-input\" value=\"<%- ESUtil.formatMoney(i.phi) %>\" />\r\n        </td>\r\n    </tr>\r\n    <% }) %>\r\n    <% }%>\r\n</script>");
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
