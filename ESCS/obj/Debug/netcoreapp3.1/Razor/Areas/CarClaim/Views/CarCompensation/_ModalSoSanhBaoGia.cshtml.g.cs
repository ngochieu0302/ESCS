#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\CarCompensation\_ModalSoSanhBaoGia.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "31c28ef7393992c652e2ad533a6a059ebee59ec7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_CarCompensation__ModalSoSanhBaoGia), @"mvc.1.0.view", @"/Areas/CarClaim/Views/CarCompensation/_ModalSoSanhBaoGia.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"31c28ef7393992c652e2ad533a6a059ebee59ec7", @"/Areas/CarClaim/Views/CarCompensation/_ModalSoSanhBaoGia.cshtml")]
    public class Areas_CarClaim_Views_CarCompensation__ModalSoSanhBaoGia : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<!-- Modal so sánh báo giá -->
<div id=""modalSoSanhBaoGia"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog"" style=""max-width: 97%; margin:10px auto;"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">So sánh báo giá Gara</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"" style=""padding-top:5px;height:590px"">
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""table-responsive"" style=""max-height:575px;"">
                            <table class=""table table-bordered"" id=""modalSoSanhBaoGiaTable"">
                                <thead class=""font-weight-bold card-title-bg-primary"" id=""modalSoSanhBaoGiaTableThead"" style=""font-size:10px;"">

                                </thead>
 ");
            WriteLiteral(@"                               <tbody id=""modalSoSanhBaoGiaTableTbody"">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"" style=""display:block"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-1""></i>Đóng
                </button>
            </div>
        </div>
    </div>
</div>
<script type=""text/html"" id=""modalSoSanhBaoGiaTableTheadTemplate"">
    <tr class=""text-center uppercase"">
        <th class=""text-center"" style=""vertical-align:middle; width: 40px;"" rowspan=""2"">STT</th>
        <th style=""vertical-align: middle;"" rowspan=""2"">Tên hạng mục</th>
        <% if(data.length > 0){
        _.forEach(data, function(item, index) { %>
        <th class=""text-center"" colspan=""3"" style=""vertical-align: middle;""><%- ");
            WriteLiteral(@"item.ten_gara %></th>
        <% })}%>
        <th class=""text-center"" colspan=""3"" style=""vertical-align:middle;"">HỆ THỐNG ĐÁNH GIÁ<br><i>(Tiền nhỏ nhất)</i></th>
    </tr>
    <tr class=""text-center uppercase"">
        <% if(data.length > 0){
        _.forEach(data, function(item, index) { %>
        <th class=""text-center"" style=""width:100px"">Tiền v.tư</th>
        <th class=""text-center"" style=""width:100px"">Tiền nhân công</th>
        <th class=""text-center"" style=""width:100px"">Tiền sơn</th>
        <% })}%>
        <th class=""text-center"" style=""width:100px"">Tiền v.tư</th>
        <th class=""text-center"" style=""width:100px"">Tiền nhân công</th>
        <th class=""text-center"" style=""width:100px"">Tiền sơn</th>
    </tr>
</script>

<script type=""text/html"" id=""modalSoSanhBaoGiaTableTbodyTemplate"">
    <% if(data.length > 0){
    _.forEach(data, function(item, index) { %>
    <tr>
        <td class=""text-center""><%- index +1 %></td>
        <td><%- item.hang_muc_ten %></td>
        <% _");
            WriteLiteral(@".forEach(gara, function(itemGara, b_i1) { %>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_vtu_'+b_i1]) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_nhan_cong_'+b_i1]) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_khac_'+b_i1]) %></td>
        <% })%>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_vtu_min']) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_nhan_cong_min']) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item['tien_khac_min']) %></td>
    </tr>
    <% })}%>

    <% if(data.length < 13){
    for(var");
            BeginWriteAttribute("i", " i =", 3733, "", 3737, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 13 - data.length;i++ ){%>
    <tr>
        <td style=""height:35.5px;""></td>
        <td></td>
        <% _.forEach(gara, function(itemGara, b_i1) { %>
        <td></td>
        <td></td>
        <td></td>
        <% })%>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
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