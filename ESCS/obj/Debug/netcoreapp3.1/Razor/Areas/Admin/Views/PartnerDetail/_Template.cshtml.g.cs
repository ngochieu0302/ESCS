#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\PartnerDetail\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f69d50ec4b0a30ca9c7d307feb60b31d096c9043"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_PartnerDetail__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/PartnerDetail/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f69d50ec4b0a30ca9c7d307feb60b31d096c9043", @"/Areas/Admin/Views/PartnerDetail/_Template.cshtml")]
    public class Areas_Admin_Views_PartnerDetail__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""modalThemCauHinhXeTemplate"">
    <% if(arrChiNhanh.length > 0){
    _.forEach(arrChiNhanh, function(item,index) { %>
    <tr>
        <td class=""text-center""><%- index+1 %></td>
        <td>
            <a data-field=""ma_chi_nhanh_ql"" data-val=""<%- item.ma_chi_nhanh_ql %>""><%- item.ten_chi_nhanh_ql %></a>
        </td>
        <td class=""text-center"">
            <input style=""cursor:pointer;"" type=""text"" class=""floating-input <%- (item.ma_chi_nhanh_gd!=null && item.ma_chi_nhanh_gd!='')?'hasValue':'' %> dsDVGD"" data-field=""ma_chi_nhanh_gd"" data-val=""<%- item.ma_chi_nhanh_gd %>"" value=""<%- item.ten_chi_nhanh_gd %>"" onclick=""chonMaChiNhanh(this, '<%- index %>','top top-right')"" placeholder=""Chọn đơn vị xử lý"" readonly=""readonly"">
        </td>
        <td class=""text-center"">
            <input style=""cursor:pointer"" type=""text"" class=""floating-input <%- (item.ma_chi_nhanh_bt!=null && item.ma_chi_nhanh_bt!='')?'hasValue':'' %> dsDVBT"" data-field=""ma_chi_nhanh_bt"" data-va");
            WriteLiteral(@"l=""<%- item.ma_chi_nhanh_bt %>"" value=""<%- item.ten_chi_nhanh_bt %>"" onclick=""chonMaChiNhanh(this, '<%- index %>','top top-right')"" placeholder=""Chọn đơn vị xử lý"" readonly=""readonly"">
        </td>
        <td class=""text-center"">
            <input style=""cursor:pointer"" type=""text"" class=""floating-input <%- (item.ma_chi_nhanh_tt!=null && item.ma_chi_nhanh_tt!='')?'hasValue':'' %> dsDVTT"" data-field=""ma_chi_nhanh_tt"" data-val=""<%- item.ma_chi_nhanh_tt %>"" value=""<%- item.ten_chi_nhanh_tt %>"" onclick=""chonMaChiNhanh(this, '<%- index %>','top top-right')"" placeholder=""Chọn đơn vị xử lý"" readonly=""readonly"">
        </td>
    </tr>
    <% })} %>
</script>

<script type=""text/html"" id=""modalThemCauHinhNgTemplate"">
    <% if(arrChiNhanh.length > 0){
    _.forEach(arrChiNhanh, function(item,index) { %>
    <tr>
        <td class=""text-center""><%- index+1 %></td>
        <td>
            <a style=""cursor:pointer"" data-field=""ma_chi_nhanh_ql"" data-val=""<%- item.ma_chi_nhanh_ql %>""><%- item.ten_chi_nh");
            WriteLiteral(@"anh_ql %></a>
        </td>
        <td class=""text-center"">
            <input style=""cursor:pointer"" type=""text"" class=""floating-input <%- (item.ma_chi_nhanh_bt!=null && item.ma_chi_nhanh_bt!='')?'hasValue':'' %> dsDVBT_NG"" data-field=""ma_chi_nhanh_bt"" data-val=""<%- item.ma_chi_nhanh_bt %>"" value=""<%- item.ten_chi_nhanh_bt %>"" onclick=""chonMaChiNhanh(this, '<%- index %>','top top-right')"" placeholder=""Chọn đơn vị xử lý"" readonly=""readonly"">
        </td>
        <td class=""text-center"">
            <input style=""cursor:pointer"" type=""text"" class=""floating-input <%- (item.ma_chi_nhanh_tt!=null && item.ma_chi_nhanh_tt!='')?'hasValue':'' %> dsDVTT_NG"" data-field=""ma_chi_nhanh_tt"" data-val=""<%- item.ma_chi_nhanh_tt %>"" value=""<%- item.ten_chi_nhanh_tt %>"" onclick=""chonMaChiNhanh(this, '<%- index %>','top top-right')"" placeholder=""Chọn đơn vị xử lý"" readonly=""readonly"">
        </td>
    </tr>
    <% })} %>
</script>

<script type=""text/html"" id=""modalChonMaChiNhanTemplate"">
    <% if(danh_sach.leng");
            WriteLiteral(@"th > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox"" data-text=""<%- item.ten_tat.toLowerCase() %>"">
        <input type=""checkbox"" name=""chon_ma_chi_nhanh"" id=""ma_chi_nhanh_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonMaChiNhanhItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""ma_chi_nhanh_<%- item.ma %>""><%- item.ten_tat %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>

<script type=""text/html"" id=""edit_cau_hinh_template"">
    <% if(arrCauHinh.length > 0){
    _.forEach(arrCauHinh, function(item,index) { %>
    <tr>
        <td>
            <select class=""select2 form-control custom-select ma_dvi_gd""");
            BeginWriteAttribute("required", " required=\"", 3911, "\"", 3922, 0);
            EndWriteAttribute();
            WriteLiteral(" style=\"height:36px;\">\r\n                <option");
            BeginWriteAttribute("value", " value=\"", 3970, "\"", 3978, 0);
            EndWriteAttribute();
            WriteLiteral(">Chọn đơn vị</option>\r\n                <% if(arrChiNhanh.length > 0){\r\n                _.forEach(arrChiNhanh, function(item1,index) { %>\r\n                <option value=\"<%- item1.ma %>\" <%");
            BeginWriteAttribute("if(item1.ma", " if(item1.ma =", 4167, "", 4181, 0);
            EndWriteAttribute();
            WriteLiteral(@"= item.ma_chi_nhanh_gd){ %>selected=""selected""<% } %>>
                        <%- item1.ten_tat %>
                    </option>
                <% })}%>
            </select>
        </td>
        <td>
            <select class=""select2 form-control custom-select ma_dvi_bt""");
            BeginWriteAttribute("required", " required=\"", 4464, "\"", 4475, 0);
            EndWriteAttribute();
            WriteLiteral(" style=\"height:36px;\">\r\n                <option");
            BeginWriteAttribute("value", " value=\"", 4523, "\"", 4531, 0);
            EndWriteAttribute();
            WriteLiteral(">Chọn đơn vị</option>\r\n                <% if(arrChiNhanh.length > 0){\r\n                _.forEach(arrChiNhanh, function(item1,index) { %>\r\n                <option value=\"<%- item1.ma %>\" <%");
            BeginWriteAttribute("if(item1.ma", " if(item1.ma =", 4720, "", 4734, 0);
            EndWriteAttribute();
            WriteLiteral(@"= item.ma_chi_nhanh_bt){ %>selected=""selected""<% } %>>
                        <%- item1.ten_tat %>
                    </option>
                <% })}%>
            </select>
        </td>
        <td>
            <select class=""select2 form-control custom-select ma_dvi_chi""");
            BeginWriteAttribute("required", " required=\"", 5018, "\"", 5029, 0);
            EndWriteAttribute();
            WriteLiteral(" style=\"height:36px;\">\r\n                <option");
            BeginWriteAttribute("value", " value=\"", 5077, "\"", 5085, 0);
            EndWriteAttribute();
            WriteLiteral(">Chọn đơn vị</option>\r\n                <% if(arrChiNhanh.length > 0){\r\n                _.forEach(arrChiNhanh, function(item1,index) { %>\r\n                <option value=\"<%- item1.ma %>\" <%");
            BeginWriteAttribute("if(item1.ma", " if(item1.ma =", 5274, "", 5288, 0);
            EndWriteAttribute();
            WriteLiteral(@"= item.ma_chi_nhanh_tt){ %>selected=""selected""<% } %>>
                        <%- item1.ten_tat %>
                    </option>
                <% })}%>
            </select>
        </td>
        <td>
            <div class=""input-group"">
                <input type=""text"" autocomplete=""off"" class=""form-control datepicker tu_ngay"" name=""ngay_d"" display-format=""date"" value-format=""number"" placeholder=""mm/dd/yyyy"" value=""<%- parseInt(item.tu_ngay).numberToDate() %>"">
                <div class=""input-group-append"">
                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                </div>
            </div>
        </td>
        <td class=""text-center"">
            <button type=""button"" class=""btn btn-primary btn-sm remove_config"">
                <i class=""ti-close""></i>
            </button>
        </td>
    </tr>
    <% })} %>
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
