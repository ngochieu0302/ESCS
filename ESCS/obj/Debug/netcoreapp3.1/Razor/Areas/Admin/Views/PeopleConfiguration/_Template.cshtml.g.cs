#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\PeopleConfiguration\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fb270aba95b81fcbcff4d35038a68b71a0d4fd3d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_PeopleConfiguration__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/PeopleConfiguration/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fb270aba95b81fcbcff4d35038a68b71a0d4fd3d", @"/Areas/Admin/Views/PeopleConfiguration/_Template.cshtml")]
    public class Areas_Admin_Views_PeopleConfiguration__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""modalCauHinhBoiThuongConNguoi_template"">
    <%if(ds_boi_thuong.length > 0){ %>
    <% _.forEach(ds_boi_thuong, function(item,index) { %>
    <tr class=""row_item"">
        <td style=""font-weight:bold;"">
            <%if(item.quy_trinh == 'GD'){ %>
            Giám định
            <% } else if");
            BeginWriteAttribute("(item.quy_trinh", " (item.quy_trinh =", 330, "", 348, 0);
            EndWriteAttribute();
            WriteLiteral("= \'CCCT\'){ %>\r\n            Contact Center\r\n            <% } else if");
            BeginWriteAttribute("(item.quy_trinh", " (item.quy_trinh =", 415, "", 433, 0);
            EndWriteAttribute();
            WriteLiteral("= \'CHUNG\'){ %>\r\n            Chung\r\n            <% } else if");
            BeginWriteAttribute("(item.quy_trinh", " (item.quy_trinh =", 492, "", 510, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'BT'){ %>
            Bồi thường
            <% } %>
        </td>
        <td>
            <input type=""hidden"" data-field=""ma"" name=""ma"" data-val=""<%- item.ma %>"" value=""<%- item.ma%>"" />
            <input type=""hidden"" data-field=""stt"" data-val=""<%- item.stt %>"" value=""<%- item.stt%>"" />
            <input type=""hidden"" data-field=""quy_trinh"" data-val=""<%- item.quy_trinh %>"" value=""<%- item.quy_trinh%>"" />
            <input type=""hidden"" data-field=""ung_dung"" data-val=""<%- item.ung_dung %>"" value=""<%- item.ung_dung%>"" />
            <input type=""hidden"" data-field=""ten"" data-val=""<%- item.ten %>"" value=""<%- item.ten%>"" />
            <input type=""text"" style=""font-weight:bold"" name=""ten"" disabled required value=""<%- item.ten %>"" autocomplete=""off"" class=""floating-input"" />
        </td>
        <td style=""text-align: center;"">
            <div class=""col-sm-12"">
                <%");
            BeginWriteAttribute("if(item.gia_tri", " if(item.gia_tri =", 1424, "", 1442, 0);
            EndWriteAttribute();
            WriteLiteral("= \'C\'){ %>\r\n                <div class=\"custom-control custom-switch\">\r\n                    <input type=\"checkbox\" checked=\"checked\" ");
            WriteLiteral(@" data-field=""gia_tri"" name=""gia_tri"" class=""custom-control-input checkbox"" id=""checkbox_bt_<%- item.ma%>"">
                    <label class=""custom-control-label"" for=""checkbox_bt_<%- item.ma%>""></label>
                </div>
                <% } else { %>
                <div class=""custom-control custom-switch"">
                    <input type=""checkbox"" data-field=""gia_tri"" ");
            WriteLiteral(@" name=""gia_tri"" class=""custom-control-input checkbox"" id=""checkbox_bt_<%- item.ma%>"">
                    <label class=""custom-control-label"" for=""checkbox_bt_<%- item.ma%>""></label>
                </div>
                <% } %>
            </div>
        </td>
        <%})}%>
    </tr>
    <% if(ds_boi_thuong.length < 12){
    for(var");
            BeginWriteAttribute("i", " i =", 2400, "", 2404, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 12 -  ds_boi_thuong.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td></td>\r\n        <td style=\"height:38.2px;\"></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tblDsNgayCauHinhConNguoi_template"">
    <% if(ds_ngay_ad.length > 0){
    _.forEach(ds_ngay_ad, function(item,index) { %>
    <tr style=""cursor: pointer; text-align:center"" data-val=""<%- item.ngay_ad %>"" id=""ds_ngay_ad_bt_<%- item.ngay_ad %>"" onclick=""getDetailCompensation('<%- item.ngay_ad %>')"" class=""item-ngay_ad"">
        <td style=""font-weight:bold""><%- item.ngay_ad_hthi %></td>
    </tr>
    <%})}%>
    <% if(ds_ngay_ad.length < 8){
    for(var");
            BeginWriteAttribute("i", " i =", 3138, "", 3142, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 8 - ds_ngay_ad.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:38.2px;\"></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tblCauHinhSLATemplate"">
    <%if(data.length > 0){ %>
    <% _.forEach(data, function(item,index) { %>
    <tr class=""row_item"">
        <td class=""text-center"">
            <input type=""hidden"" data-field=""stt"" data-val=""<%- item.stt %>"" value=""<%- item.stt%>"" />
            <%- item.stt %>
        </td>
        <td class=""text-left font-weight-bold"">
            <input type=""hidden"" data-field=""ma"" data-val=""<%- item.ma %>"" value=""<%- item.ma%>"" />
            <input type=""hidden"" data-field=""buoc_thuc_hien"" data-val=""<%- item.buoc_thuc_hien %>"" value=""<%- item.buoc_thuc_hien%>"" />
            <span><%- item.buoc_thuc_hien %></span>
        </td>
        <td class=""text-right"">
            <input type=""text"" name=""tien_tu"" data-field=""tien_tu"" data-val=""<%- item.tien_tu %>"" required value=""<%=ESUtil.formatMoney(item.tien_tu)%>"" autocomplete=""off"" placeholder=""Tiền từ"" class=""floating-input number tien_tu"">
        </td>
        <td class=""text-right"">
          ");
            WriteLiteral(@"  <input type=""text"" name=""tien_toi"" data-field=""tien_toi"" data-val=""<%- item.tien_toi %>"" value=""<%=ESUtil.formatMoney(item.tien_toi)%>"" autocomplete=""off"" placeholder=""Tiền tới"" class=""floating-input number tien_toi"">
        </td>
        <td class=""text-right"">
            <input type=""text"" name=""tgian"" data-field=""tgian"" data-val=""<%- item.tgian %>"" value=""<%- item.tgian %>"" autocomplete=""off"" placeholder=""Thời gian"" class=""floating-input number tgian"">
        </td>
        <td class=""text-right"">
            <input type=""text"" name=""tgian_noti"" data-field=""tgian_noti"" data-val=""<%- item.tgian_noti %>"" value=""<%- item.tgian_noti %>"" autocomplete=""off"" placeholder=""Thời gian noti"" class=""floating-input number tgian_noti"">
        </td>
        <td style=""text-align: center;"">
            <div class=""col-sm-12"">
                <%");
            BeginWriteAttribute("if(item.tgian_hanh_chinh", " if(item.tgian_hanh_chinh =", 5186, "", 5213, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'C'){ %>
                <div class=""custom-control custom-switch"">
                    <input type=""checkbox"" checked=""checked"" data-field=""tgian_hanh_chinh"" name=""tgian_hanh_chinh"" class=""custom-control-input checkbox"" id=""checkbox_bt_<%- item.ma%>_<%- item.tien_tu%>_<%- item.tien_toi%>"">
                    <label class=""custom-control-label"" for=""checkbox_bt_<%- item.ma%>_<%- item.tien_tu%>_<%- item.tien_toi%>""></label>
                </div>
                <% } else { %>
                <div class=""custom-control custom-switch"">
                    <input type=""checkbox"" data-field=""tgian_hanh_chinh"" name=""tgian_hanh_chinh"" class=""custom-control-input checkbox"" id=""checkbox_bt_<%- item.ma%>_<%- item.tien_tu%>_<%- item.tien_toi%>"">
                    <label class=""custom-control-label"" for=""checkbox_bt_<%- item.ma%>_<%- item.tien_tu%>_<%- item.tien_toi%>""></label>
                </div>
                <% } %>
            </div>
        </td>
        <td class=""text-center"">
            ");
            WriteLiteral(@"<a href=""#"" onclick=""addRowSLA(this)"">
                <i class=""far fa-plus-square""></i>
            </a>
            <a href=""#"" onclick=""removeRowSLA(this)"" class=""d-none"">
                <i class=""fal fa-trash-alt ml-2""></i>
            </a>
        </td>
    </tr>
    <% })} %>

    <% if(data.length < 11){
    for(var");
            BeginWriteAttribute("i", " i =", 6574, "", 6578, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 11 - data.length;i++ ){
    %>
    <tr>
        <td style=""height:36.5px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

<script type=""text/html"" id=""tblDsNgayCauHinhSLA_template"">
    <% if(ds_ngay_ad.length > 0){
    _.forEach(ds_ngay_ad, function(item,index) { %>
    <tr style=""cursor: pointer; text-align:center"" data-val=""<%- item.ngay_ad %>"" data-so-id=""<%-item.so_id%>"" id=""ds_ngay_ad_sla_<%- item.ngay_ad %>"" onclick=""getDetailCauHinhSLA('<%- item.ngay_ad %>')"" class=""item-ngay_ad"">
        <td style=""font-weight:bold""><%- item.ngay_ad_hthi %></td>
    </tr>
    <%})}%>

    <% if(ds_ngay_ad.length < 9){
    for(var");
            BeginWriteAttribute("i", " i =", 7358, "", 7362, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 9 - ds_ngay_ad.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:36.5px;\"></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>");
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
