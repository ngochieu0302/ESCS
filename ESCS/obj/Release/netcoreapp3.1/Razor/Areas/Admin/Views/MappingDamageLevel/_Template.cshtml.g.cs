#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\MappingDamageLevel\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "80ff5da5d713fbf25a9074887e512812e0d97fe2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_MappingDamageLevel__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/MappingDamageLevel/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"80ff5da5d713fbf25a9074887e512812e0d97fe2", @"/Areas/Admin/Views/MappingDamageLevel/_Template.cshtml")]
    public class Areas_Admin_Views_MappingDamageLevel__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<script type=\"text/html\" id=\"tableMucDo_AI_template\">\r\n    <% if(mdtt.length > 0){ %>\r\n    <% _.forEach(mdtt, function(item,index) { %>\r\n    <tr row-val=\"<%- item.ma %>\">\r\n        <% var");
            BeginWriteAttribute("stt", " stt =", 186, "", 192, 0);
            EndWriteAttribute();
            WriteLiteral(" item.ma %>\r\n        <% if (stt.includes(\'.\'))");
            BeginWriteAttribute("stt", " stt =", 238, "", 244, 0);
            EndWriteAttribute();
            BeginWriteAttribute("stt.split(\'\').filter(n", " stt.split(\'\').filter(n =", 244, "", 269, 0);
            EndWriteAttribute();
            WriteLiteral("> n != \'.\').join(\'\') %>;\r\n        <td><input id=\'ma_muc_do_<%- stt %>\' type=\"text\" name=\"ma_muc_do\" maxlength=\"50\" col-ma-muc-do=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ma %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 460, "\"", 471, 0);
            EndWriteAttribute();
            WriteLiteral(" /></td>\r\n        <td><input id=\'ten_muc_do_<%- stt %>\' type=\"text\" name=\"ten_muc_do\" maxlength=\"50\" col-ten-muc-do=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ten %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 651, "\"", 662, 0);
            EndWriteAttribute();
            WriteLiteral(@" /></td>
        <td><input id='ma_mapping_<%- stt %>' type=""text"" name=""ma_mapping"" maxlength=""50"" col-ma-mapping=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ma_mapping %>"" /></td>
        <td><input id='ten_mapping_<%- stt %>' type=""text"" name=""ten_mapping"" maxlength=""200"" col-ten-mapping=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ten_mapping %>"" /></td>
        <td><input id='ten_tat_mapping_<%- stt %>' type=""text"" name=""ten_tat_mapping"" maxlength=""100"" col-ten-tat-mapping=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ten_tat_mapping %>"" /></td>
    </tr>
    <% }) %>
    <% }%>
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
