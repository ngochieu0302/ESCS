#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\PartnerList\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "cf2e747c61c2972e219172db4fb6ddaafd6e7c9f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_PartnerList__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/PartnerList/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"cf2e747c61c2972e219172db4fb6ddaafd6e7c9f", @"/Areas/Admin/Views/PartnerList/_Template.cshtml")]
    public class Areas_Admin_Views_PartnerList__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<script type=\"text/html\" id=\"tableMucDo_AI_template\">\r\n    <% if(mdtt.length > 0){ %>\r\n    <% _.forEach(mdtt, function(item,index) { %>\r\n    <tr row-val=\"<%- item.ma %>\" data-search=\"<%- item.ten.toLowerCase() %>\">\r\n        <% var");
            BeginWriteAttribute("stt", " stt =", 230, "", 236, 0);
            EndWriteAttribute();
            WriteLiteral(" item.ma %>\r\n        <% if (stt.includes(\'.\'))");
            BeginWriteAttribute("stt", " stt =", 282, "", 288, 0);
            EndWriteAttribute();
            BeginWriteAttribute("stt.split(\'\').filter(n", " stt.split(\'\').filter(n =", 288, "", 313, 0);
            EndWriteAttribute();
            WriteLiteral("> n != \'.\').join(\'\') %>;\r\n        <td><input id=\'ma_muc_do_<%- stt %>\' type=\"text\" name=\"ma_muc_do\" maxlength=\"50\" col-ma-muc-do=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ma %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 504, "\"", 515, 0);
            EndWriteAttribute();
            WriteLiteral(" /></td>\r\n        <td><input id=\'ten_muc_do_<%- stt %>\' type=\"text\" name=\"ten_muc_do\" maxlength=\"50\" col-ten-muc-do=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ten %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 695, "\"", 706, 0);
            EndWriteAttribute();
            WriteLiteral(" /></td>\r\n        <td>\r\n            <select id=\'thay_the_sc_<%- stt %>\' class=\"select2 form-control custom-select\" name=\"thay_the_sc\">\r\n                <option");
            BeginWriteAttribute("value", " value=\"", 866, "\"", 874, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn phương án</option>
                <option value=""T"">Thay thế</option>
                <option value=""S"">Sửa chữa</option>
            </select>
        </td>
        <td><input id='ma_mapping_<%- stt %>' type=""text"" name=""ma_mapping"" maxlength=""50"" col-ma-mapping=""<%- item.ma %>"" class=""floating-input"" autocomplete=""off"" value=""<%- item.ma_mapping %>"" /></td>
        <td><input id='ten_mapping_<%- stt %>' type=""text"" name=""ten_mapping"" maxlength=""200"" col-ten-mapping=""<%- item.ma %>"" class=""floating-input"" autocomplete=""off"" value=""<%- item.ten_mapping %>"" /></td>
        <td><input id='ten_tat_mapping_<%- stt %>' type=""text"" name=""ten_tat_mapping"" maxlength=""100"" col-ten-tat-mapping=""<%- item.ma %>"" class=""floating-input"" autocomplete=""off"" value=""<%- item.ten_tat_mapping %>"" /></td>
    </tr>
    <% }) %>
    <% }%>
</script>

<script type=""text/html"" id=""HangMuc_template"">
    <% if(hang_muc.length > 0){
    _.forEach(hang_muc, function(item,index) { %>
    <tr row-val=""<%- item.ma %");
            WriteLiteral(">\" data-search=\"<%- item.ten.toLowerCase() %>\">\r\n        <td><input id=\'ma_hang_muc_<%- item.ma %>\' type=\"text\" name=\"ma_hang_muc\" maxlength=\"50\" col-ma-hang-muc=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ma %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 2123, "\"", 2134, 0);
            EndWriteAttribute();
            WriteLiteral(" /></td>\r\n        <td><input id=\'ten_hang_muc_<%- item.ma %>\' type=\"text\" name=\"ten_hang_muc\" maxlength=\"50\" col-ten-hang-muc=\"<%- item.ma %>\" class=\"floating-input\" value=\"<%- item.ten %>\"");
            BeginWriteAttribute("readonly", " readonly=\"", 2324, "\"", 2335, 0);
            EndWriteAttribute();
            WriteLiteral(@" /></td>
        <td><input id='ma_mapping_ai_<%- item.ma %>' type=""text"" name=""ma_mapping_ai"" maxlength=""50"" col-ma-mapping-ai=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ma_mapping_ai %>"" /></td>
        <td><input id='ten_mapping_ai_<%- item.ma %>' type=""text"" name=""ten_mapping_ai"" maxlength=""200"" col-ten-mapping-ai=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ten_mapping_ai %>"" /></td>
        <td><input id='ten_tat_mapping_ai_<%- item.ma %>' type=""text"" name=""ten_tat_mapping_ai"" maxlength=""100"" col-ten-tat-mapping-ai=""<%- item.ma %>"" class=""floating-input"" value=""<%- item.ten_tat_mapping_ai %>"" /></td>
    </tr>
    <% })}%>
</script>

<script type=""text/html"" id=""BaoGia_template"">
    <% if(data.length > 0){
    _.forEach(data, function(item,index) { %>
    <tr row-val=""<%- item.gara %>"" data-search=""<%- item.ten_gara.toLowerCase() %>"" style=""cursor:pointer"" onclick=""suaBaoGiaDichVu('<%- JSON.stringify(item) %>')"">
        <td><%- item.ten_gara %></td> 
        <td><%");
            WriteLiteral("- item.token %></td>\r\n        <td class=\"text-center\"><%- item.ngay_hl_hthi %></td>\r\n        <td class=\"text-center\"><%- item.ngay_kt_hthi %></td>\r\n        <td class=\"text-center\"><%- item.ap_dung_hthi %></td>\r\n    </tr>\r\n    <% })}%>\r\n</script>");
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