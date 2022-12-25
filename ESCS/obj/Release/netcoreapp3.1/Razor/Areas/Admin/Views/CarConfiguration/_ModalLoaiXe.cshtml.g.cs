#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\CarConfiguration\_ModalLoaiXe.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7aa08ace68884ee345574f156e9beb3120d409fb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_CarConfiguration__ModalLoaiXe), @"mvc.1.0.view", @"/Areas/Admin/Views/CarConfiguration/_ModalLoaiXe.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7aa08ace68884ee345574f156e9beb3120d409fb", @"/Areas/Admin/Views/CarConfiguration/_ModalLoaiXe.cshtml")]
    public class Areas_Admin_Views_CarConfiguration__ModalLoaiXe : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .text {
        color: red;
    }
</style>
<div id=""modalLoaiXe"" class=""modal-drag"" style=""width:700px; z-index:9999999; margin-top: -400px !important; margin-left: 385px !important;"">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn thông tin loại xe</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_LoaiXe"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control item-loaixe"">
                <input type=""hidden"" id=""modalLoaiXeElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalLoaiXeDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""bu");
            WriteLiteral(@"tton"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonLoaiXe"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalLoaiXeDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox loaixe"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""loai_xe_<%- item.ma %>"" data-field=""loai_xe"" value=""<%- item.ma %>"" class=""custom-control-input item-loaixe modalLoaiXeItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""loai_xe_<%- item.ma %>""><%- item.ten %> </label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
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
