#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\CarCompensation\_ModalGaraPhuongAn.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d5d0e42f02132f7018b9f1fecdb59d69e332951c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_CarCompensation__ModalGaraPhuongAn), @"mvc.1.0.view", @"/Areas/CarClaim/Views/CarCompensation/_ModalGaraPhuongAn.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d5d0e42f02132f7018b9f1fecdb59d69e332951c", @"/Areas/CarClaim/Views/CarCompensation/_ModalGaraPhuongAn.cshtml")]
    public class Areas_CarClaim_Views_CarCompensation__ModalGaraPhuongAn : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalGaraPhuongAn"" class=""modal-drag"" style=""width:500px; z-index:9999999;"">
    <div class=""modal-drag-header"">
        <h5><span class=""modal-drag-title"">Chọn gara</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_GaraPhuongAn"" type=""text"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalGaraPhuongAnElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalGaraPhuongAnDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""btnGaraPhuongAn"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalGar");
            WriteLiteral(@"aPhuongAnDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox dsgarapa"" data-id=""ds_gara_pa_<%- item.ma_gara %>"" data-text=""<%- item.ma_gara.toLowerCase() %>-<%- item.ten_gara.toLowerCase() %>"">
        <input type=""checkbox"" id=""gara_pa_<%- item.ma_gara %>"" data-bt-gara=""<%- item.bt_gara %>"" value=""<%- item.ma_gara %>"" class=""custom-control-input modalGaraPhuongAnItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""gara_pa_<%- item.ma_gara %>""><%- item.ten_gara %></label>
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
