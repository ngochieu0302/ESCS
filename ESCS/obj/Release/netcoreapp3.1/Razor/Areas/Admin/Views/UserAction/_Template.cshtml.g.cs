#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\UserAction\_Template.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "43e7b30ccc282ccf224bee46ad1826acd1ce2f3c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_UserAction__Template), @"mvc.1.0.view", @"/Areas/Admin/Views/UserAction/_Template.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"43e7b30ccc282ccf224bee46ad1826acd1ce2f3c", @"/Areas/Admin/Views/UserAction/_Template.cshtml")]
    public class Areas_Admin_Views_UserAction__Template : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .text {
        font-weight: bold;
    }
</style>
<script type=""text/html"" id=""templateThongTinLogNSD"">
    <div class=""col-sm-12"">
        <table class=""table"">
            <tr>
                <td class=""text"">Đơn vị</td>
                <td colspan=""5"">
                    <b><%- ma_doi_tac_ten %></b>
                </td>
            </tr>
            <tr>
                <td class=""text"">Chi nhánh</td>
                <td>
                    <%- ma_chi_nhanh_ten %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Người sử dụng</td>
                <td>
                    <%- nsd_ten %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Vùng quản trị</td>
                <td>
                    <%- vung_qt_ten %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Nhóm</td>
                <td>
                    <%- nhom_ten %>
         ");
            WriteLiteral(@"       </td>
            </tr>
            <tr>
                <td class=""text"">Chức năng</td>
                <td>
                    <%- chuc_nang_ten %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Thời gian</td>
                <td>
                    <%- thoi_gian_hthi %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Nội dung yêu cầu</td>
                <td>
                    <%- nd_yeu_cau %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Trạng thái</td>
                <td>
                    <%- trang_thai_hthi %>
                </td>
            </tr>
            <tr>
                <td class=""text"">Loại hoạt động</td>
                <td>
                    <%- loai_hd_hthi %>
                </td>
            </tr>
        </table>
    </div>
</script>
");
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
