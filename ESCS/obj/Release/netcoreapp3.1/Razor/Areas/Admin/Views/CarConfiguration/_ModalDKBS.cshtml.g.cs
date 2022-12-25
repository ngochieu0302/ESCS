#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\CarConfiguration\_ModalDKBS.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "dc4781f56958c514248ccc072d2e5693d4c816c7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_CarConfiguration__ModalDKBS), @"mvc.1.0.view", @"/Areas/Admin/Views/CarConfiguration/_ModalDKBS.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dc4781f56958c514248ccc072d2e5693d4c816c7", @"/Areas/Admin/Views/CarConfiguration/_ModalDKBS.cshtml")]
    public class Areas_Admin_Views_CarConfiguration__ModalDKBS : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .text {
        color: red;
    }
</style>
<div id=""modalGiamTruDkbs"" class=""modal-drag"" style=""width:500px; z-index:9999999; margin-top: -360px !important; margin-left: 156px !important;"">
    <div class=""modal-drag-header border-bottom"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn thông tin điều khoản bổ sung</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_dkbs"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control item-dkbs"">
                <input type=""hidden"" id=""modalDkbsElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalDkbsDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
  ");
            WriteLiteral(@"      <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonDkbs"">
            <i class=""fas fa-mouse-pointer mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalDkbsDanhSachTemplate"">
    <% if(ds_giam_tru_dkbs.length > 0){
    _.forEach(ds_giam_tru_dkbs, function(item,index) { %>
    <div class=""custom-control custom-checkbox dkbs"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""dkbs_<%- item.ma %>"" data-field=""dkbs"" value=""<%- item.ma %>"" class=""custom-control-input item-dkbs modalDkbsItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""dkbs_<%- item.ma %>""><%- item.ten %> </label>
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