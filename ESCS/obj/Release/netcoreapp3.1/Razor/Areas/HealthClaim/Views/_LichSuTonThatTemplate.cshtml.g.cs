#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_LichSuTonThatTemplate.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "543769eca180b06862657789e2824f74030ccba6"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__LichSuTonThatTemplate), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_LichSuTonThatTemplate.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"543769eca180b06862657789e2824f74030ccba6", @"/Areas/HealthClaim/Views/_LichSuTonThatTemplate.cshtml")]
    public class Areas_HealthClaim_Views__LichSuTonThatTemplate : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""tblLichSuTonThatConNguoi_template"">
    <% if(arrHoSo.length > 0){ %>
    <% _.forEach(arrHoSo, function(item,index) { %>
    <tr class=""text-center lichSuTonThat"" id=""lichSuTonThat_<%- item.so_id %>_<%- item.lhnv %>"" data-search=""<%- item.nd_tim %>"">
        <td><%- item.ngay_ht %></td>
        <td>
            <%");
            BeginWriteAttribute("if(item.loai", " if(item.loai =", 351, "", 366, 0);
            EndWriteAttribute();
            WriteLiteral("= \'HSTT\'){ %>\r\n            <a href=\"#\" onclick=\"TransReceiveDisplay(\'<%- item.ma_doi_tac%>\',\'<%- item.so_id%>\')\"><%- item.so_hs %></a>\r\n            <%}%>\r\n            <%");
            BeginWriteAttribute("if(item.loai", " if(item.loai =", 535, "", 550, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'BLVP'){ %>
            <a href=""#"" onclick=""TransHealthguaranteeDisplay('<%- item.ma_doi_tac%>','<%- item.so_id%>')""><%- item.so_hs%></a>
            <%}%>
        </td>
        <td><%= item.loai_ten%></td>
        <td><%- item.ngay_vv %></td>
        <td><%- item.ngay_rv %></td>
        <td><%- item.hinh_thuc_ten %></td>
        <td><%- item.ten_nguyen_nhan %></td>
        <td class=""text-left""><%- item.quyen_loi_ten %></td>
        <td class=""text-left""><%- item.ten_benh_vien %></td>
        <td class=""text-left""><%- item.chan_doan %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-right""><%- item.so_ngay_duyet %></td>
        <td class=""text-center""><%- item.trang_thai %></td>
        <td class=""text-center"">
            <% if(item.nguyen_nhan");
            BeginWriteAttribute("!", " !=", 1468, "", 1471, 0);
            EndWriteAttribute();
            WriteLiteral(" null && item.nguyen_nhan");
            BeginWriteAttribute("!", " != \'", 1496, "\'", 1501, 0);
            EndWriteAttribute();
            WriteLiteral(" && item.nguyen_nhan");
            BeginWriteAttribute("!", " !=", 1522, "", 1525, 0);
            EndWriteAttribute();
            WriteLiteral(@" undefined){ %>
            <a href=""#"" data-field=""nguyen_nhan"" data-val=""<%- item.nguyen_nhan %>"" onclick=""showNguyenNhanGiamTru(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Lý do giảm trừ""></i>
            </a>
            <% }else{ %>
            <a data-field=""nguyen_nhan"" data-val="""" onclick=""showNguyenNhanGiamTru(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Lý do giảm trừ""></i>
            </a>
            <% } %>
        </td>
        <td class=""text-center"">
            <% if(item.ghi_chu");
            BeginWriteAttribute("!", " !=", 2128, "", 2131, 0);
            EndWriteAttribute();
            WriteLiteral(" null && item.ghi_chu");
            BeginWriteAttribute("!", " != \'", 2152, "\'", 2157, 0);
            EndWriteAttribute();
            WriteLiteral(" && item.ghi_chu");
            BeginWriteAttribute("!", " !=", 2174, "", 2177, 0);
            EndWriteAttribute();
            WriteLiteral(@" undefined){ %>
            <a href=""#"" data-field=""ghi_chu"" data-val=""<%- item.ghi_chu %>"" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% }else{ %>
            <a data-field=""ghi_chu"" data-val="""" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% } %>
        </td>
    </tr>
    <% })}%>

    <% if(arrHoSo.length < 11){
    for(var");
            BeginWriteAttribute("i", " i =", 2747, "", 2751, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 11 - arrHoSo.length;i++ ){
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
        <td></td>
    </tr>
    <% }} %>
</script>

<script type=""text/html"" id=""tblLichSuTonThatConNguoiGroup_template"">
    <% if(arrHoSo.length > 0){ %>
    <% _.forEach(arrHoSo, function(item,index) { %>
    <tr class=""text-center lichSuTonThat"" id=""lichSuTonThat_<%- item.so_id %>_<%- item.lhnv %>"" data-search=""<%- item.nd_tim %>"">
        <td class=""text-left""><%- item.quyen_loi_ten %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-right""><%- item.so_ngay_duyet %></td>
    </tr>
    <% })}%>

  ");
            WriteLiteral("  <% if(arrHoSo.length < 4){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 3816, "", 3820, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 4 - arrHoSo.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:35px;\"></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tblTop5DanhSachHD_template"">
    <% if(data.length > 0){ %>
    <% _.forEach(data, function(item,index) { %>
    <tr class=""hop_dong_tai_tuc"" id=""hop_dong_tai_tuc_<%- item.so_id_hd %>"" onclick=""xemLSTTTop5('<%- item.so_id_hd %>')"">
        <td class=""text-center""><%- item.so_hd %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-center""><%- item.so_ngay_duyet %></td>
    </tr>
    <% })}%>

    <% if(data.length < 4){
    for(var");
            BeginWriteAttribute("i", " i =", 4667, "", 4671, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 4 - data.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:35px;\"></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tblLichSuTonThatConNguoiTop5_template"">
    <% if(arrHoSo.length > 0){ %>
    <% _.forEach(arrHoSo, function(item,index) { %>
    <tr class=""text-center lichSuTonThat"" id=""lichSuTonThat_<%- item.so_id %>_<%- item.lhnv %>"" data-search=""<%- item.nd_tim %>"">
        <td><%- item.ngay_ht %></td>
        <td>
            <%");
            BeginWriteAttribute("if(item.loai", " if(item.loai =", 5245, "", 5260, 0);
            EndWriteAttribute();
            WriteLiteral("= \'HSTT\'){ %>\r\n            <a href=\"#\" onclick=\"TransReceiveDisplay(\'<%- item.ma_doi_tac%>\',\'<%- item.so_id%>\')\"><%- item.so_hs %></a>\r\n            <%}%>\r\n            <%");
            BeginWriteAttribute("if(item.loai", " if(item.loai =", 5429, "", 5444, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'BLVP'){ %>
            <a href=""#"" onclick=""TransHealthguaranteeDisplay('<%- item.ma_doi_tac%>','<%- item.so_id%>')""><%- item.so_hs %></a>
            <%}%>
        </td>
        <td><%- item.so_hd %></td>
        <td><%= item.loai_ten%></td>
        <td><%- item.ngay_vv %></td>
        <td><%- item.ngay_rv %></td>
        <td><%- item.hinh_thuc_ten %></td>
        <td><%- item.ten_nguyen_nhan %></td>
        <td class=""text-left""><%- item.quyen_loi_ten %></td>
        <td class=""text-left""><%- item.ten_benh_vien %></td>
        <td class=""text-left""><%- item.chan_doan %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-right""><%- item.so_ngay_duyet %></td>
        <td class=""text-center""><%- item.trang_thai %></td>
        <td class=""text-center"">
            <% if(item.nguyen_nhan");
            BeginWriteAttribute("!", " !=", 6399, "", 6402, 0);
            EndWriteAttribute();
            WriteLiteral(" null && item.nguyen_nhan");
            BeginWriteAttribute("!", " != \'", 6427, "\'", 6432, 0);
            EndWriteAttribute();
            WriteLiteral(" && item.nguyen_nhan");
            BeginWriteAttribute("!", " !=", 6453, "", 6456, 0);
            EndWriteAttribute();
            WriteLiteral(@" undefined){ %>
            <a href=""#"" data-field=""nguyen_nhan"" data-val=""<%- item.nguyen_nhan %>"" onclick=""showNguyenNhanGiamTru(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Lý do giảm trừ""></i>
            </a>
            <% }else{ %>
            <a data-field=""nguyen_nhan"" data-val="""" onclick=""showNguyenNhanGiamTru(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Lý do giảm trừ""></i>
            </a>
            <% } %>
        </td>
        <td class=""text-center"">
            <% if(item.ghi_chu");
            BeginWriteAttribute("!", " !=", 7059, "", 7062, 0);
            EndWriteAttribute();
            WriteLiteral(" null && item.ghi_chu");
            BeginWriteAttribute("!", " != \'", 7083, "\'", 7088, 0);
            EndWriteAttribute();
            WriteLiteral(" && item.ghi_chu");
            BeginWriteAttribute("!", " !=", 7105, "", 7108, 0);
            EndWriteAttribute();
            WriteLiteral(@" undefined){ %>
            <a href=""#"" data-field=""ghi_chu"" data-val=""<%- item.ghi_chu %>"" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% }else{ %>
            <a data-field=""ghi_chu"" data-val="""" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% } %>
        </td>
    </tr>
    <% })}%>

    <% if(arrHoSo.length < 4){
    for(var");
            BeginWriteAttribute("i", " i =", 7677, "", 7681, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 4 - arrHoSo.length;i++ ){
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
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

");
            WriteLiteral(@"<script type=""text/html"" id=""tblLichSuTonThatConNguoiGroupTop5_template"">
    <% if(arrHoSo.length > 0){ %>
    <% _.forEach(arrHoSo, function(item,index) { %>
    <tr class=""text-center lichSuTonThat"" id=""lichSuTonThat_<%- item.so_id %>_<%- item.lhnv %>"" data-search=""<%- item.nd_tim %>"">
        <td class=""text-left""><%- item.quyen_loi_ten %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-right""><%- item.so_ngay_duyet %></td>
    </tr>
    <% })}%>

    <% if(arrHoSo.length < 4){
    for(var");
            BeginWriteAttribute("i", " i =", 8817, "", 8821, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 4 - arrHoSo.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:35px;\"></td>\r\n        <td></td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
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