#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_ModalChiPhiKhamBenh.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "088ff08916d4fd626939eeff71f2c11c92129053"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__ModalChiPhiKhamBenh), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_ModalChiPhiKhamBenh.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"088ff08916d4fd626939eeff71f2c11c92129053", @"/Areas/HealthClaim/Views/_ModalChiPhiKhamBenh.cshtml")]
    public class Areas_HealthClaim_Views__ModalChiPhiKhamBenh : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalChiPhiKhamBenh"" class=""modal-drag"" style=""width: 350px; z-index: 9999999; margin-top: 45.1125px !important; margin-left: 20.975px !important"">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn chi phí khám bệnh</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_ChiPhiKhamBenh"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalChiPhiKhamBenhElementSelect"">
                <input type=""hidden"" id=""modalChiPhiKhamBenh_MaBenh"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""height:250px;"" id=""modalChiPhiKhamBenhDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-fo");
            WriteLiteral(@"oter"" style=""height: 32px; border-top: 1px solid #eaeaea; margin:0px 0px 10px 0px;"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" id=""btnChonChiPhiKhamBenh"">
            <i class=""fas fa-mouse-pointer mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalChiPhiKhamBenhDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox dscpkb"" id=""dscpkb_<%- item.ma %>"" data-text=""<%- item.ten_day_du.toLowerCase() %>"">
        <input type=""checkbox"" id=""chi_phi_kham_benh_<%- item.ma_day_du %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChiPhiKhamBenhItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""chi_phi_kham_benh_<%- item.ma_day_du %>""><%- item.ten_day_du %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
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
