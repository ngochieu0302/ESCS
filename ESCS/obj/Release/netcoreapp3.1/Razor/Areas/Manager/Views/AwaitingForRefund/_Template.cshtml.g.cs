#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\AwaitingForRefund\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0214bd1175463c8b0fec5e582b8caf5dcb21721a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_AwaitingForRefund__Template), @"mvc.1.0.view", @"/Areas/Manager/Views/AwaitingForRefund/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0214bd1175463c8b0fec5e582b8caf5dcb21721a", @"/Areas/Manager/Views/AwaitingForRefund/_Template.cshtml")]
    public class Areas_Manager_Views_AwaitingForRefund__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<script type=\"text/html\" id=\"tblHoanQuyTon_template\">\r\n    <% if(data.length > 0){%>\r\n    <% var");
            BeginWriteAttribute("sott", " sott =", 124, "", 131, 0);
            EndWriteAttribute();
            WriteLiteral(@" 1 %>
    <%_.forEach(data, function(item, index) { %>
    <tr class=""row_item"">
        <td class=""text-center"">
            <input type=""hidden"" data-field=""so_id_hs"" value=""<%- item.so_id_hs %>"" />
            <input type=""hidden"" data-field=""bt"" value=""<%- item.bt %>"" />
            <input type=""hidden"" data-field=""loai"" value=""<%- item.loai %>"" />
            <div class=""custom-control custom-checkbox ml-2"">
                <input type=""checkbox"" <% if(item.checked){ %>checked<% } %> data-field=""bt"" value=""<%- item.bt%>"" onchange=""onChon(this)"" id=""ttbt_<%- item.bt%>_<%- sott %>"" class=""custom-control-input ttbt_item"">
                <label class=""custom-control-label"" for=""ttbt_<%- item.bt%>_<%- sott %>"">&nbsp;</label>
            </div>
        </td>
        <td class=""text-center"">
            <a data-field=""nv"" data-val=""<%- item.nv %>"" class=""cursor-pointer"">
                <%- item.nv %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""s");
            WriteLiteral(@"o_hs"" data-val=""<%- item.so_hs %>"" class=""cursor-pointer"">
                <%- item.so_hs %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""loai_ten"" data-val=""<%- item.loai_ten %>"" class=""cursor-pointer"">
                <%- item.loai_ten %>
            </a>
        </td>
        <td class=""text-center"">
            <input type=""text"" data-field=""tien"" class=""floating-input number"" value=""<%- ESUtil.formatMoney(item.tien) %>"" />
        </td>
        <td class=""text-center"">
            <a data-field=""ten"" data-val=""<%- item.ten %>"" class=""cursor-pointer"">
                <%- item.ten %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""ngay_ht"" data-val=""<%- item.ngay_ht %>"" class=""cursor-pointer"">
                <%- item.ngay_ht %>
            </a>
        </td>
        <% sott++ %>
    </tr>
    <% })}%>
    <% if(data.length < 8){
    for(var");
            BeginWriteAttribute("i", " i =", 2126, "", 2130, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 8 - data.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:35.2px\"></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral("<script type=\"text/html\" id=\"tblHoanQuyChiTiet_template\">\r\n    <% if(data.length > 0){%>\r\n    <% var");
            BeginWriteAttribute("sott", " sott =", 2514, "", 2521, 0);
            EndWriteAttribute();
            WriteLiteral(@" 1 %>
    <%_.forEach(data, function(item, index) { %>
    <tr class=""row_item"">
        <td class=""text-center"">
            <input type=""hidden"" data-field=""so_id_hs"" value=""<%- item.so_id_hs %>"" />
            <input type=""hidden"" data-field=""bt"" value=""<%- item.bt %>"" />
            <input type=""hidden"" data-field=""loai"" value=""<%- item.loai %>"" />
            <div class=""custom-control custom-checkbox ml-2"">
                <input type=""checkbox"" disabled=""disabled"" <% if(item.checked){ %>checked<% } %> data-field=""bt"" value=""<%- item.bt%>"" onchange=""onChon(this)"" id=""ttct_<%- item.bt%>_<%- sott %>"" class=""custom-control-input ttct_item"">
                <label class=""custom-control-label"" for=""ttct_<%- item.bt%>_<%- sott %>"">&nbsp;</label>
            </div>
        </td>
        <td class=""text-center"">
            <a data-field=""nv"" data-val=""<%- item.nv %>"" class=""cursor-pointer"">
                <%- item.nv %>
            </a>
        </td>
        <td class=""text-center"">
        ");
            WriteLiteral(@"    <a data-field=""so_hs"" data-val=""<%- item.so_hs %>"" class=""cursor-pointer"">
                <%- item.so_hs %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""loai_ten"" data-val=""<%- item.loai_ten %>"" class=""cursor-pointer"">
                <%- item.loai_ten %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""tien"" data-val=""<%- item.tien %>"" class=""cursor-pointer"">
                <%- ESUtil.formatMoney(item.tien) %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""ten"" data-val=""<%- item.ten %>"" class=""cursor-pointer"">
                <%- item.ten %>
            </a>
        </td>
        <td class=""text-center"">
            <a data-field=""ngay_ht"" data-val=""<%- item.ngay_ht %>"" class=""cursor-pointer"">
                <%- item.ngay_ht %>
            </a>
        </td>
        <td class=""text-center"">
            <a href=""#"" onclick=""xoaHoSoDeNghiHoanQuy(th");
            WriteLiteral("is,\'<%- item.so_id_hs %>\',\'<%- item.bt %>\')\">\r\n                <i class=\"fas fa-trash-alt\"></i>\r\n            </a>\r\n        </td>\r\n        <% sott++ %>\r\n    </tr>\r\n    <% })}%>\r\n    <% if(data.length < 8){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 4786, "", 4790, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 8 - data.length;i++ ){
    %>
    <tr>
        <td style=""height:35.2px""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
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
