#pragma checksum "D:\ESCS\ESCS\Areas\Contract\Views\Package\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "58cb16a6b5da622e4339cbb8e7858d579abfefec"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Contract_Views_Package__Template), @"mvc.1.0.view", @"/Areas/Contract/Views/Package/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"58cb16a6b5da622e4339cbb8e7858d579abfefec", @"/Areas/Contract/Views/Package/_Template.cshtml")]
    public class Areas_Contract_Views_Package__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<script type=\"text/html\" id=\"tableNhapQLoi_template\">\r\n    <% if(dk.length > 0){ %>\r\n    <% _.forEach(dk, function(item,index) { %>\r\n    <%");
            BeginWriteAttribute("if(item.lh_nv_ct", " if(item.lh_nv_ct =", 139, "", 158, 0);
            EndWriteAttribute();
            WriteLiteral(@"= null){ %>
    <tr class=""item_lhnv"" data-lhnv=""<%- item.lh_nv %>"">
        <td class=""text-center"">
            <input type=""hidden"" data-lhnv-ct=""<%- item.lh_nv %>"" value=""<%- item.lh_nv_ct %>"" />
            <input type=""hidden"" data-bt=""<%- item.lh_nv %>"" value=""<%- item.bt %>"" />
            <input type=""hidden"" data-ten=""<%- item.lh_nv %>"" value=""<%- item.ten %>"" />
            <%- item.sott %>
        </td>
        <%if(item.pd==15){
        %>
        <td style=""padding-left: <%- item.pd %>px""><b style=""font-weight:bold""><%- item.ten_hien_thi %></b></td>
        <%
        }
        else
        {
        %>
        <td style=""padding-left: <%- item.pd %>px""><%- item.ten_hien_thi %></td>
        <%
        }
        %>
        <td class=""text-right"">
            <input type=""text"" data-so-lan-ngay=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.so_lan_ngay) %>"" />
        </td>
        <td class=""text-right"">
            <inp");
            WriteLiteral(@"ut type=""text"" data-tien-lan-ngay=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_lan_ngay) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-tien-nam=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_nam) %>"" />
        </td>
        <td style=""display: none"" class=""text-center""><%- item.lh_nv %></td>
        <td class=""text-right"">
            <input type=""text"" data-dong-bh=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.dong_bh) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-so-ngay-cho=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- item.so_ngay_cho %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-tl-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUti");
            WriteLiteral(@"l.formatMoney(item.tl_phi) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.phi) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-ghi-chu=""<%- item.lh_nv %>"" maxlength=""200"" class=""floating-input"" value=""<%- item.ghi_chu %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-so-ngay-gia-han=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- item.so_ngay_gia_han %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-quyen-loi=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.quyen_loi %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-loai=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.loai %>"" />
        </td>
        <td class=""text");
            WriteLiteral("-right\">\r\n            <input type=\"text\" data-loaiq=\"<%- item.lh_nv %>\" maxlength=\"50\" class=\"floating-input\" value=\"<%- item.loaiq %>\" />\r\n        </td>\r\n    </tr>\r\n    <% }else if(item.lh_nv_ct.toString().indexOf(\'.\')");
            BeginWriteAttribute("!", " !=", 3449, "", 3452, 0);
            EndWriteAttribute();
            WriteLiteral(@" -1){ %>
    <tr class=""item_lhnv"" data-lhnv=""<%- item.lh_nv %>"">
        <td class=""text-center"">
            <input type=""hidden"" data-lhnv-ct=""<%- item.lh_nv %>"" value=""<%- item.lh_nv_ct %>"" />
            <input type=""hidden"" data-bt=""<%- item.lh_nv %>"" value=""<%- item.bt %>"" />
            <input type=""hidden"" data-ten=""<%- item.lh_nv %>"" value=""<%- item.ten %>"" />
            <%- item.sott %>
        </td>
        <%if(item.pd==15){
        %>
        <td style=""padding-left: <%- item.pd %>px""><b style=""font-style: italic;""><%- item.ten_hien_thi %></b></td>
        <%
        }
        else
        {
        %>
        <td style=""padding-left: <%- item.pd%>px; font-style: italic;""><%- item.ten_hien_thi %></td>
        <%
        }
        %>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-so-lan-ngay=""<%- item.lh_nv %>"" onchange=""changeSoLanNgayBac3(this)"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.");
            WriteLiteral(@"so_lan_ngay) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-tien-lan-ngay=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_lan_ngay) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-tien-nam=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_nam) %>"" />
        </td>
        <td style=""display: none"" class=""text-center"" style=""font-style: italic;""><%- item.lh_nv %></td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-dong-bh=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.dong_bh) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-so-ngay-cho=""<%- item.lh_nv %>"" maxlength=""16"" class=""number");
            WriteLiteral(@" floating-input"" value=""<%- ESUtil.formatMoney(item.so_ngay_cho) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-tl-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tl_phi) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.phi) %>"" />
        </td>
        <td class=""text-right"" style=""font-style: italic;"">
            <input type=""text"" data-ghi-chu=""<%- item.lh_nv %>"" maxlength=""200"" class=""floating-input"" value=""<%- item.ghi_chu %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-so-ngay-gia-han=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- item.so_ngay_gia_han %>"" />
        </td>
        <td class=""text-right"">
            <input type");
            WriteLiteral(@"=""text"" data-quyen-loi=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.quyen_loi %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-loai=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.loai %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-loaiq=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.loaiq %>"" />
        </td>
    </tr>
    <% }else{ %>
    <tr class=""item_lhnv"" data-lhnv=""<%- item.lh_nv %>"">
        <td class=""text-center"">
            <input type=""hidden"" data-lhnv-ct=""<%- item.lh_nv %>"" value=""<%- item.lh_nv_ct %>"" />
            <input type=""hidden"" data-bt=""<%- item.lh_nv %>"" value=""<%- item.bt %>"" />
            <input type=""hidden"" data-ten=""<%- item.lh_nv %>"" value=""<%- item.ten %>"" />
            <%- item.sott %>
        </td>
        <%if(item.pd==15){
        %>
        <td style=""padding-left: <%- item.pd %>px""><b sty");
            WriteLiteral(@"le=""font-weight:bold""><%- item.ten_hien_thi %></b></td>
        <%
        }
        else
        {
        %>
        <td style=""padding-left: <%- item.pd %>px""><%- item.ten_hien_thi %></td>
        <%
        }
        %>
        <td class=""text-right"">
            <input type=""text"" data-so-lan-ngay=""<%- item.lh_nv %>"" onchange=""changeSoLanNgayBac2(this)"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.so_lan_ngay) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-tien-lan-ngay=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_lan_ngay) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-tien-nam=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tien_nam) %>"" />
        </td>
        <td style=""display: none"" class=""text-center""><%- item.lh_nv %></td>
        <td class=""text-ri");
            WriteLiteral(@"ght"">
            <input type=""text"" data-dong-bh=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.dong_bh) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-so-ngay-cho=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.so_ngay_cho) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-tl-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.tl_phi) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-phi=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- ESUtil.formatMoney(item.phi) %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-ghi-chu=""<%- item.lh_nv %>"" maxlength=""200"" class=""floating-input"" value=""<%- item.ghi_chu %>"" />
        </td>
        <td class=""text-right"">
");
            WriteLiteral(@"            <input type=""text"" data-so-ngay-gia-han=""<%- item.lh_nv %>"" maxlength=""16"" class=""number floating-input"" value=""<%- item.so_ngay_gia_han %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-quyen-loi=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.quyen_loi %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-loai=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.loai %>"" />
        </td>
        <td class=""text-right"">
            <input type=""text"" data-loaiq=""<%- item.lh_nv %>"" maxlength=""50"" class=""floating-input"" value=""<%- item.loaiq %>"" />
        </td>
    </tr>
    <% } %>
    <% })} %>
    <% if(dk.length < 12){
    for(var");
            BeginWriteAttribute("i", " i =", 10386, "", 10390, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 12 - dk.length;i++ ){
    %>
    <tr>
        <td style=""height:35px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
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

");
            WriteLiteral(@"<script type=""text/html"" id=""tableDKBSTemplate"">
    <%if(ds_dkbs.length > 0){
    _.forEach(ds_dkbs, function(item,index) { %>
    <tr class=""dkbs"">
        <td>
            <input type=""hidden"" data-name=""ma"" data-field=""ma"" value=""<%- item.ma %>"" />
            <a href=""#"" data-field=""ten"" data-val=""<%- item.ten %>""><%- item.ten %></a>
        </td>
        <td>
            <input type=""text"" data-name=""ghi_chu"" autocomplete=""off"" maxlength=""500"" class=""floating-input"" data-field=""ghi_chu"" value=""<%- item.ghi_chu %>"" />
        </td>
        <td>
            <input style=""text-align:center"" type=""text"" data-name=""so_lan_ngay"" autocomplete=""off"" maxlength=""18"" class=""floating-input decimal"" data-field=""so_lan_ngay"" value=""<%- item.so_lan_ngay %>"" />
        </td>
        <td>
            <input type=""text"" data-name=""tien_lan_ngay"" autocomplete=""off"" maxlength=""18"" class=""number floating-input"" data-field=""tien_lan_ngay"" value=""<%- item.tien_lan_ngay %>"" />
        </td>
        <td>
     ");
            WriteLiteral(@"       <input type=""text"" data-name=""tien_nam"" autocomplete=""off"" maxlength=""18"" class=""number floating-input"" data-field=""tien_nam"" value=""<%- item.tien_nam %>"" />
        </td>
        <td>
            <input type=""text"" data-name=""dong_bh"" autocomplete=""off"" maxlength=""3"" class=""floating-input number"" data-field=""dong_bh"" value=""<%- item.dong_bh %>"" />
        </td>
        <td>
            <input style=""text-align:center"" type=""text"" data-name=""so_ngay_cho"" autocomplete=""off"" maxlength=""18"" class=""floating-input decimal"" data-field=""so_ngay_cho"" value=""<%- item.so_ngay_cho %>"" />
        </td>
        <td>
            <input type=""text"" data-name=""phi"" autocomplete=""off"" maxlength=""18"" class=""number floating-input"" data-field=""phi"" value=""<%- item.phi %>"" />
        </td>
        <td>
            <input type=""text"" data-name=""tl_phi"" autocomplete=""off"" maxlength=""3"" class=""number floating-input"" data-field=""tl_phi"" value=""<%- item.tl_phi %>"" />
        </td>
        <td class=""text-center"">");
            WriteLiteral("\n            <i class=\"fa fa-times text-danger cursor-pointer\" data-val=\"<%- item.ma %>\" onclick=\"xoaDKBS(this)\"></i>\r\n        </td>\r\n    </tr>\r\n    <% })} %>\r\n    <% if(ds_dkbs.length < 12){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 13062, "", 13066, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 12 - ds_dkbs.length; i++ ){
    %>
    <tr>
        <td style=""height:38.2px;""></td>
        <td></td>
        <td></td>
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

");
            WriteLiteral(@"<script type=""text/html"" id=""tableGhiChuKhacTemplate"">
    <%if(data.length > 0){
    _.forEach(data, function(item,index) { %>
    <tr class=""ghiChuKhac"">
        <td>
            <a href=""#"" data-field=""ma"" data-val=""<%- item.ma %>""><%- item.ma %></a>
        </td>
        <td>
            <input type=""text"" data-name=""ten"" autocomplete=""off"" maxlength=""500"" class=""floating-input"" data-field=""ten"" value=""<%- item.ten %>"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" data-val=""<%- item.ma %>"" onclick=""xoaGhiChuKhac(this)""></i>
        </td>
    </tr>
    <% })} %>
    <% if(data.length < 11){
    for(var");
            BeginWriteAttribute("i", " i =", 14088, "", 14092, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 11 - data.length; i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:38.2px;\"></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""modalThemTyLeDong1_template"">
    <%if(ds_ty_le.length > 0){
    _.forEach(ds_ty_le, function(item,index) { %>
    <tr class=""tl_dong"">
        <td>
            <input type=""text"" name=""tl_dong"" data-field=""tl_dong"" maxlength=""3"" required value=""<%- item.tl_dong %>"" autocomplete=""off"" placeholder=""Tỷ lệ đồng"" class=""floating-input decimal"" />
        </td>
        <td>
            <input type=""text"" name=""tg_cho"" data-field=""tg_cho"" maxlength=""3"" required value=""<%- item.tg_cho %>"" autocomplete=""off"" placeholder=""Thời gian chờ"" class=""floating-input decimal"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" onclick=""xoaTyLeDong(this)""></i>
        </td>
    </tr>
    <% })} else { %>
    <tr class=""tl_dong"">
        <td>
            <input type=""text"" name=""tl_dong"" maxlength=""3"" data-field=""tl_dong"" required");
            BeginWriteAttribute("value", " value=\"", 15237, "\"", 15245, 0);
            EndWriteAttribute();
            WriteLiteral(" autocomplete=\"off\" placeholder=\"Tỷ lệ đồng\" class=\"floating-input decimal\" />\r\n        </td>\r\n        <td>\r\n            <input type=\"text\" name=\"tg_cho\" maxlength=\"3\" data-field=\"tg_cho\" required");
            BeginWriteAttribute("value", " value=\"", 15442, "\"", 15450, 0);
            EndWriteAttribute();
            WriteLiteral(@" autocomplete=""off"" placeholder=""Thời gian chờ"" class=""floating-input decimal"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" onclick=""xoaTyLeDong(this)""></i>
        </td>
    </tr>
    <%}%>
</script>

");
            WriteLiteral(@"<script type=""text/html"" id=""modalThemTyLeDong2_template"">
    <%if(ds_ty_le.length > 0){
    _.forEach(ds_ty_le, function(item,index) { %>
    <tr class=""tl_dong"">
        <td>
            <input type=""text"" name=""tl_dong"" maxlength=""3"" data-field=""tl_dong"" required value=""<%- item.tl_dong %>"" autocomplete=""off"" placeholder=""Tỷ lệ đồng"" class=""floating-input decimal"" />
        </td>
        <td>
            <input type=""text"" name=""tg_cho"" maxlength=""3"" data-field=""tg_cho"" required value=""<%- item.tg_cho %>"" autocomplete=""off"" placeholder=""Thời gian chờ"" class=""floating-input decimal"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" onclick=""xoaTyLeDong(this)""></i>
        </td>
    </tr>
    <% })} else { %>
    <tr class=""tl_dong"">
        <td>
            <input type=""text"" name=""tl_dong"" data-field=""tl_dong"" maxlength=""3"" required");
            BeginWriteAttribute("value", " value=\"", 16702, "\"", 16710, 0);
            EndWriteAttribute();
            WriteLiteral(" autocomplete=\"off\" placeholder=\"Tỷ lệ đồng\" class=\"floating-input decimal\" />\r\n        </td>\r\n        <td>\r\n            <input type=\"text\" name=\"tg_cho\" data-field=\"tg_cho\" maxlength=\"3\" required");
            BeginWriteAttribute("value", " value=\"", 16907, "\"", 16915, 0);
            EndWriteAttribute();
            WriteLiteral(@" autocomplete=""off"" placeholder=""Thời gian chờ"" class=""floating-input decimal"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" onclick=""xoaTyLeDong(this)""></i>
        </td>
    </tr>
    <% } %>
</script>

");
            WriteLiteral(@"<script type=""text/html"" id=""modalThemMaBenh_template"">
    <%if(ds_ma_benh.length > 0){
    _.forEach(ds_ma_benh, function(item,index) { %>
    <tr class=""ma_benh"">
        <td>
            <input type=""hidden"" data-name=""ma_benh"" data-field=""ma_benh"" value=""<%- item.ma_benh %>"" />
            <a href=""#"" data-field=""ma_benh"" data-val=""<%- item.ma_benh %>""><%- item.ten_v %></a>
        </td>
        <td>
            <input type=""text"" data-name=""tl_dong"" maxlength=""3"" autocomplete=""off"" class=""floating-input number"" value=""<%- item.tl_dong %>"" />
        </td>
        <td>
            <input type=""text"" data-name=""tg_cho"" maxlength=""3"" autocomplete=""off"" class=""floating-input number"" value=""<%- item.tg_cho %>"" />
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" data-val=""<%- item.ma_benh %>"" onclick=""xoaMaBenh(this)""></i>
        </td>
    </tr>
    <% })} %>

    <% if(ds_ma_benh.length < 8){
    for(var");
            BeginWriteAttribute("i", " i =", 18218, "", 18222, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 8 - ds_ma_benh.length; i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:38.2px;\"></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>");
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
