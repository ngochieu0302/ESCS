#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\Expertationcost\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "be7acbca05a1af8a3b728354f7c8a871a8b11f71"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_Expertationcost__Template), @"mvc.1.0.view", @"/Areas/Manager/Views/Expertationcost/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"be7acbca05a1af8a3b728354f7c8a871a8b11f71", @"/Areas/Manager/Views/Expertationcost/_Template.cshtml")]
    public class Areas_Manager_Views_Expertationcost__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""step3_chung_tu_template"">
    <% if(chung_tu.length > 0){
    _.forEach(chung_tu, function(item,index) { %>
    <tr>
        <td class=""text-center"">
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- item.ngay_ct %>
        </td>
        <td><%- item.mau_hdon %></td>
        <td class=""text-center""><%- item.ky_hieu_hdon %></td>
        <td class=""text-center""><%- item.so_hdon %></td>
        <td><%- item.dien_giai %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tien) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.thue) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tong_cong) %></td>
        <td class=""text-center"">
            <a href=""#"" class=""edit_chung_tu"" data-toggle=""modal"" data-target=""#"" data-backdrop=""static"" data-keyboard=""false"">
                <i class=""far fa-file-alt"" title=""Xem/sửa chi tiết chứng từ""></i>
            </a>
        </td>");
            WriteLiteral("\r\n        <td class=\"text-center\">\r\n            <a href=\"#\" class=\"xoaChungTu\"><i class=\"fas fa-trash-alt\" title=\"Xóa chứng từ\"></i></a>\r\n        </td>\r\n    </tr>\r\n    <% })} %>\r\n    <% if(chung_tu.length < 3){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 1272, "", 1276, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 3 - chung_tu.length;i++ ){
    %>
    <tr>
        <td style=""height:35.5px""></td>
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
            WriteLiteral(@"<script type=""text/html"" id=""step3_thu_huong_template"">
    <% if(thu_huong.length > 0){
    _.forEach(thu_huong, function(item,index) { %>
    <tr>
        <td class=""text-center"">
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- item.pttt %>
        </td>
        <td><%- item.ten %></td>
        <td class=""text-center""><%- item.tk_cmt %></td>
        <td class=""text-center""><%- item.ten_ngan_hang %></td>
        <td><%- item.dien_giai %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tien) %></td>
        <td class=""text-center"">
            <a href=""#"" class=""edit_thu_huong"" data-toggle=""modal"" data-target=""#"" data-backdrop=""static"" data-keyboard=""false"">
                <i class=""far fa-file-alt"" title=""Xem/sửa chi tiết thông tin""></i>
            </a>
        </td>
        <td class=""text-center"">
            <a href=""#"" class=""xoaNguoiThuHuong""><i class=""fas fa-trash-alt"" title=""Xóa người thụ hưởng""></i></a>
     ");
            WriteLiteral("   </td>\r\n    </tr>\r\n    <% })}%>\r\n    <% if(thu_huong.length < 4){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 2710, "", 2714, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 4 - thu_huong.length;i++ ){
    %>
    <tr>
        <td style=""height:38.2px""></td>
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
            WriteLiteral(@"<script type=""text/html"" id=""step3_chung_tu_template"">
    <% if(chung_tu.length > 0){
    _.forEach(chung_tu, function(item,index) { %>
    <tr>
        <td class=""text-center"">
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- item.ngay_ct %>
        </td>
        <td class=""text-center""><%- item.mau_hdon %></td>
        <td class=""text-center""><%- item.ky_hieu_hdon %></td>
        <td class=""text-center""><%- item.so_hdon %></td>
        <td><%- item.dien_giai %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tien) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.thue) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tong_cong) %></td>
        <td class=""text-center"">
");
            WriteLiteral("            <a href=\"#\" onclick=\"suaHoaDonChungTu(this)\">\r\n                <i class=\"far fa-file-alt\" title=\"Xem/sửa chi tiết chứng từ\"></i>\r\n            </a>\r\n        </td>\r\n        <td class=\"text-center\">\r\n");
            WriteLiteral("            <a href=\"#\" onclick=\"xoaHoaDonChungTu(this)\">\r\n                <i class=\"fas fa-trash-alt\" title=\"Xóa chứng từ\"></i>\r\n            </a>\r\n        </td>\r\n    </tr>\r\n    <% })} %>\r\n\r\n    <% if(chung_tu.length < 3){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 4412, "", 4416, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 3 - chung_tu.length;i++ ){
    %>
    <tr>
        <td style=""height:35.5px;""></td>
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
            WriteLiteral(@"<script type=""text/html"" id=""step3_thu_huong_template"">
    <% if(thu_huong.length > 0){
    _.forEach(thu_huong, function(item,index) { %>
    <tr>
        <td>
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- item.pttt %>
        </td>
        <td>
            <%- item.ten %>
        </td>
        <td><%- item.tk_cmt %></td>
        <td><%- item.ten_ngan_hang %></td>
        <td><%- item.dien_giai %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tien) %></td>
        <td class=""text-center"">
            <%if(item.loai=='TH') {
            %>
            <a href=""#"" onclick=""suaNguoiThuHuong(this)"">
                <i class=""far fa-file-alt"" title=""Xem/sửa chi tiết thông tin""></i>
            </a>
            <%
            }%>

        </td>
        <td class=""text-center"">
            <%if(item.loai=='TH') {
            %>
            <a href=""#"" onclick=""xoaNguoiThuHuong(this, '<%- item.so_id %>', '<%- item");
            WriteLiteral(".bt %>\')\"><i class=\"fas fa-trash-alt\" title=\"Xóa người thụ hưởng\"></i></a>\r\n            <%\r\n            }%>\r\n        </td>\r\n    </tr>\r\n    <% })} %>\r\n\r\n    <% if(thu_huong.length < 3){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 5973, "", 5977, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 3 - thu_huong.length;i++ ){
    %>
    <tr>
        <td style=""height:35.5px;""></td>
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
            WriteLiteral(@"<script type=""text/html"" id=""lstImage_template"">
    <% if(arrLoai.length > 0){ %>
    <% _.forEach(arrLoai, function(iteml,indexl) { %>
    <% if(iteml.so_luong_tai_lieu > 0){ %>
    <div style=""border-radius: 3px; text-align: center; background-color: #ececec; padding: 3px 0px; margin: 5px 0px; border: 1px solid #607d8b; "">
        <p class=""m-0 font-weight-bold"">
            <%- iteml.ten_loai_tai_lieu %>
        </p>
    </div>
    <% if(arrAnh.length > 0){
    _.forEach(arrAnh, function(item,index) { %>
    <%");
            BeginWriteAttribute("if(item.loai", " if(item.loai =", 6798, "", 6813, 0);
            EndWriteAttribute();
            WriteLiteral(@"= iteml.loai_tai_lieu){ %>
    <div class=""pt-1"" id=""nhom_anh_<%- index %>"">
        <p class=""m-0 font-weight-bold""><a href=""#"" onclick=""onToggleImg('<%- index %>')""><%- item.nhom %></a></p>
    </div>
    <ul class=""docs-pictures clearfix"">
        <% _.forEach(item.children, function(image,index_anh) { %>
        <li class=""p-1"">
            <input type=""checkbox"" onclick=""onClickGDChiTiet(this, <%- JSON.stringify(image, ESUtil.replacerImg) %>)"" id=""img<%- image.bt %>"" class=""nhom_anh_ton_that_<%- index %> mt-1"" data-hm=""<%- item.ma_file %>"" value=""<%- image.bt %>"" name=""ds_anh_xe"">
            <p class=""fileNameImage mt-1"" style=""cursor:pointer""><%- image.ten_file %></p>
            <% if(_.includes(["".jpg"", "".png"", "".gif"","".jpeg""], image.extension)){ %>
            <img data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-ngay=""<%- image.ngay %>"" data-nsd=""<%- image.nsd%>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm");
            WriteLiteral(@"=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""data:image/png;base64, <%- image.duong_dan %>"" alt=""<%- image.ten_file %>"">
            <% }else if(_.includes(["".pdf"", "".doc"", "".docx""], image.extension)){ %>
            <img data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/pdf-image.png"" alt=""<%- image.ten_file %>"">
            <% } else if(_.includes(["".xml""], image.extension)){%>
            <img data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/xml.png"" alt=""<%- image.ten_file %>"">
            <% } else if(_.includes(["".xlsx"", "".xls""], image.extension)){%>
            <img data-original="""" location-x=""<%-");
            WriteLiteral(@" image.x %>"" location-y=""<%- image.y %>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/excel-logo.jpg"" alt=""<%- image.ten_file %>"">
            <% } %>
        </li>
        <% }) %>
    </ul>
    <% } %>
    <% })} %>
    <% } %>
    <% }) %>
    <% } %>
</script>

<script type=""text/html"" id=""tblThongTinChungTemplate"">
    <%");
            BeginWriteAttribute("if(data.length", " if(data.length =", 9327, "", 9344, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 0){ %>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Số hồ sơ bồi thường:</td>
        <td class=""text-center"" width=""25%""><a href=""javascript:void(0)"" onclick=""searchHoSoBT()"">Chọn hồ sơ bồi thường</a></td>
        <td style=""font-weight:bold"" width=""10%"">Ngày mở hồ sơ:</td>
        <td class=""text-center"" width=""20%""></td>
        <td style=""font-weight:bold"" width=""10%"">Nghiệp vụ:</td>
        <td class=""text-center"" width=""15%""></td>
    </tr>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Chi phí dự kiến:</td>
        <td class=""text-center"" width=""20%"">0</td>
        <td style=""font-weight:bold"" width=""10%"">Chi phí thực tế:</td>
        <td class=""text-center"" width=""25%"">0</td>
        <td style=""font-weight:bold"" width=""10%"">Tiền thuế:</td>
        <td class=""text-center"" width=""15%"">0</td>
    </tr>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Ngày trình:</td>
        <td class=""text-center"" width=""20%""></td>
        <td style=""font-weight:bol");
            WriteLiteral(@"d"" width=""10%"">Ngày duyệt:</td>
        <td class=""text-center"" width=""25%""></td>
        <td style=""font-weight:bold"" width=""10%"">Trạng thái:</td>
        <td class=""text-center"" width=""15%""></td>
    </tr>
    <% }else{ %>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Số hồ sơ bồi thường:</td>
        <%");
            BeginWriteAttribute("if(data[0].so_hs_bt.trim()", " if(data[0].so_hs_bt.trim() =", 10695, "", 10724, 0);
            EndWriteAttribute();
            WriteLiteral(@"= """"){ %>
        <td class=""text-center"" width=""25%""><a href=""javascript:void(0)"" onclick=""searchHoSoBT()"">Hồ sơ chưa lấy số</a></td>
        <% }else{ %>
        <td class=""text-center"" width=""25%""><a href=""javascript:void(0)"" onclick=""searchHoSoBT()""><%- data[0].so_hs_bt %></a></td>
        <% } %>
        <td style=""font-weight:bold"" width=""10%"">Ngày mở hồ sơ:</td>
        <td class=""text-center"" width=""20%""><%- data[0].ngay_ht %></td>
        <td style=""font-weight:bold"" width=""10%"">Nghiệp vụ:</td>
        <td class=""text-center"" width=""15%""><%- data[0].nv_text %></td>
    </tr>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Chi phí dự kiến:</td>
        <td class=""text-center"" width=""20%""><%- ESUtil.formatMoney(data[0].tien_dx) %></td>
        <td style=""font-weight:bold"" width=""10%"">Chi phí thực tế:</td>
        <td class=""text-center"" width=""25%""><%- ESUtil.formatMoney(data[0].tien_thoa_thuan) %></td>
        <td style=""font-weight:bold"" width=""10%"">Tiền thuế:</td>
        <");
            WriteLiteral(@"td class=""text-center"" width=""15%""><%- ESUtil.formatMoney(data[0].tien_thue) %></td>
    </tr>
    <tr>
        <td style=""font-weight:bold"" width=""10%"">Ngày trình:</td>
        <td class=""text-center"" width=""20%""><%- data[0].ngay_trinh %></td>
        <td style=""font-weight:bold"" width=""10%"">Ngày duyệt:</td>
        <td class=""text-center"" width=""25%""><%- data[0].ngay_duyet %></td>
        <td style=""font-weight:bold"" width=""10%"">Trạng thái:</td>
        <td class=""text-center"" width=""15%""><%- data[0].trang_thai_ten %></td>
    </tr>
    <% } %>
</script>

<script type=""text/html"" id=""danhSachHoSoTemplate"">
    <% if(data.length > 0){ %>
    <% var");
            BeginWriteAttribute("sott", " sott =", 12420, "", 12427, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0 %>
    <% _.forEach(data, function(item,index) { %>
    <% sott++ %>
    <tr class=""row_item cursor-pointer dshoso"" onclick=""chonHoSoBT(this, '<%- item.ma_doi_tac %>', '<%- item.so_id %>', '<%- item.nv %>')"">
        <td class=""text-center""><%- sott %></td>
        <td class=""text-center""><%- item.ngay_mo_hs %></td>
        <td class=""text-center""><%- item.so_hs %></td>
        <td class=""text-center""><%- item.ten_kh %></td>
        <td class=""text-center""><%- ESUtil.formatMoney(item.tien_duyet) %></td>
        <td class=""text-center""><%- item.so_hd %></td>
        <td class=""text-center""><%- item.so_gcn %></td>
        <td class=""text-center""><%- item.trang_thai_ten %></td>
    </tr>
    <% })} %>

    <% if(data.length < 5){
    for(var");
            BeginWriteAttribute("i", " i =", 13194, "", 13198, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 5 - data.length;i++ ){
    %>
    <tr>
        <td style=""height:35.1px;""></td>
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

<script type=""text/html"" id=""tbDsChiPhiGDTemplate"">
    <% var");
            BeginWriteAttribute("stt", " stt =", 13524, "", 13530, 0);
            EndWriteAttribute();
            WriteLiteral(" 0 %>\r\n    <% _.forEach(danh_sach, function(item,index) { %>\r\n    <tr class=\"chiPhiItem\" data-bt=\"<%- stt %>\">\r\n        <%");
            BeginWriteAttribute("stt", " stt =", 13652, "", 13658, 0);
            EndWriteAttribute();
            WriteLiteral(@" stt + 1 %>
        <td class=""text-center"">
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- stt %>
        </td>
        <td class=""text-center"">
            <a href=""#"" data-field=""ngay_ht"" data-val=""<%- item.ngay_ht %>""><%- item.ngay_ht_text %></a>
        </td>
        <td>
            <a href=""#"" data-field=""ten_chi_phi"" data-val=""<%- item.ten_chi_phi %>""><%- item.ten_chi_phi %></a>
        </td>
        <td class=""text-center"">
            <a href=""#"" data-field=""nhom_gd"" data-val=""<%- item.nhom_gd %>""><%- item.nhom_gd_ten %></a>
        </td>
        <td class=""text-right"">
            <a href=""#"" data-field=""tien_dx"" data-val=""<%- item.tien_dx %>""><%- ESUtil.formatMoney(item.tien_dx) %></a>
        </td>
        <td class=""text-right"">
            <a href=""#"" data-field=""tien_duyet"" data-val=""<%- item.tien_duyet %>""><%- ESUtil.formatMoney(item.tien_duyet) %></a>
        </td>
        <td class=""text-right"">
            <a href");
            WriteLiteral(@"=""#"" data-field=""tien_thoa_thuan"" data-val=""<%- item.tien_thoa_thuan %>""><%- ESUtil.formatMoney(item.tien_thoa_thuan) %></a>
        </td>
        <td class=""text-right"">
            <a href=""#"" data-field=""tien_thue"" data-val=""<%- item.tien_thue %>""><%- ESUtil.formatMoney(item.tien_thue) %></a>
        </td>
        <td class=""text-right"">
            <a href=""#"" data-field=""tong_cong"" data-val=""<%- item.tong_cong %>""><%- ESUtil.formatMoney(item.tong_cong) %></a>
        </td>
        <td class=""text-center"">
            <i class=""fa fa-edit text-danger cursor-pointer"" onclick=""suaChiPhi(this)""></i>
        </td>
        <td class=""text-center"">
            <i class=""fa fa-times text-danger cursor-pointer"" onclick=""xoaChiPhi('<%- item.bt %>')""></i>
        </td>
    </tr>
    <% }) %>

    <% if(danh_sach.length < 5){
    for(var");
            BeginWriteAttribute("i", " i =", 15542, "", 15546, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 5 - danh_sach.length;i++ ){
    %>
    <tr>
        <td style=""height:39.2px;""></td>
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
