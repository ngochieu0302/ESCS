#pragma checksum "D:\ESCS\ESCS\Views\Home\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5d4c5dfb7e2832cb9b6f516aa1acfbb3e8fa8c52"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home__Template), @"mvc.1.0.view", @"/Views/Home/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5d4c5dfb7e2832cb9b6f516aa1acfbb3e8fa8c52", @"/Views/Home/_Template.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Home__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""tong_hop_sla_template"">
    <% _.forEach(data, function(item,index) { %>
    <div class=""col"">
        <div class=""card"">
            <div class=""card-body p-1"">
                <div class=""d-flex flex-row"">
                    <div class=""round round-lg text-white d-inline-block text-center rounded-circle bg-info"">
                        <i class=""fal fa-sigma""></i>
                    </div>
                    <div class=""ml-2 align-self-center wd-60p"">
                        <p class=""text-muted mb-0""><%- item.ten_nhom %></p>
                        <div class=""d-flex justify-content-between align-items-baseline"">
                            <h4 class=""mb-0 font-weight-light"" id=""tong_ho_so""><%- item.sl %></h4>
                            <p class=""mb-0"" id=""tong_ho_so_tien""><%- ESUtil.formatMoney(item.tien) %> </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <%})%>
</s");
            WriteLiteral("cript>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""hoSoTon_template"">
    <% if(ton_ngay.length > 0){
    _.forEach(ton_ngay, function(item, index) { %>
    <tr>
        <td>
            <a href=""#"" onclick=""openModalHoSoTon('<%- item.nsd %>', 'TON_NGAY', '<%- item.stt%>', this)""><%- item.khung %></a>
        </td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% })}else{ %>
    <tr>
        <td class=""text-center"" colspan=""8"">Ch??a c?? d??? li???u</td>
    </tr>
    <% } %>
</script>

");
            WriteLiteral(@"<script type=""text/html"" id=""tonGiamDinh_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td>
            <a href=""#"" onclick=""openModalHoSoTon('<%- item.nsd%>','<%- item.trang_thai_ton %>','', this)""><%- item.ten %></a>
        </td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 2054, "", 2058, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tonBoiThuong_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td>
            <a href=""#"" onclick=""openModalHoSoTon('<%- item.nsd%>','<%- item.trang_thai_ton %>','', this)""><%- item.ten %></a>
        </td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 2689, "", 2693, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tonHienTruong_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td>
            <a href=""#"" onclick=""openModalHoSoTon('<%- item.nsd%>','<%- item.trang_thai_ton %>','', this)""><%- item.ten %></a>
        </td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 3318, "", 3322, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tonTiepNhan_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td class=""text-content""><%- item.ten %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 3914, "", 3918, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""hoSoTonNg_template"">
    <% if(ton_ngay.length > 0){
    _.forEach(ton_ngay, function(item, index) { %>
    <tr>
        <td class=""text-content""><%- item.khung %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% })}else{ %>
    <tr>
        <td class=""text-center"" colspan=""8"">Ch??a c?? d??? li???u</td>
    </tr>
    <% } %>
</script>

<script type=""text/html"" id=""tonBoiThuongNg_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td class=""text-content""><%- item.ten %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 4855, "", 4859, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tonBaoLanh_template"">
    <% _.forEach(data, function(item, index) { %>
    <tr>
        <td class=""text-content""><%- item.ten %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.sl) %></td>
    </tr>
    <% }) %>

    <% if(data.length < 5){ %>
    <% for(var");
            BeginWriteAttribute("i", " i =", 5376, "", 5380, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < (5 - data.length); i++){ %>\r\n    <tr>\r\n        <td class=\"text-content\">&nbsp;</td>\r\n        <td class=\"text-right\">&nbsp;</td>\r\n    </tr>\r\n    <% }} %>\r\n</script>");
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
