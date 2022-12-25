#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\Payment\_ModalBenhVien.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f724a8037f0a564e4e7c47d524d9ca92de3d22ac"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_Payment__ModalBenhVien), @"mvc.1.0.view", @"/Areas/Manager/Views/Payment/_ModalBenhVien.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f724a8037f0a564e4e7c47d524d9ca92de3d22ac", @"/Areas/Manager/Views/Payment/_ModalBenhVien.cshtml")]
    public class Areas_Manager_Views_Payment__ModalBenhVien : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .text {
        color: red;
    }
</style>
<div id=""modalBenhVien"" class=""modal-drag"" style=""width: 625px; z-index: 9999999; margin-top: 8px !important; margin-left: 144.85px !important; "">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn bệnh viện</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_BenhVien"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control item-benhvien"">
                <input type=""hidden"" id=""modalBenhVienElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalBenhVienDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button typ");
            WriteLiteral(@"e=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonBenhVien"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalBenhVienDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <%if(item.bl_noitru == 'C' && item.bl_ngoaitru == 'C'){%>
    <div class=""custom-control custom-checkbox dsbv"" id=""dsbv_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""benh_vien_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-benhvien modalBenhVienItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""benh_vien_<%- item.ma %>""><%- item.ten %> </label> - <label class=""text""> (Bảo lãnh nội trú / Bảo lãnh ngoại trú) </label>
    </div>
    <%}else if(");
            BeginWriteAttribute("item.bl_noitru", " item.bl_noitru =", 1935, "", 1952, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'C' && item.bl_ngoaitru == 'K'){%>
    <div class=""custom-control custom-checkbox dsbv"" id=""dsbv_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""benh_vien_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-benhvien modalBenhVienItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""benh_vien_<%- item.ma %>""><%- item.ten %> - <label class=""text""> (Bảo lãnh nội trú) </label> </label>
    </div>
    <%}else");
            BeginWriteAttribute("if(item.bl_noitru", " if(item.bl_noitru =", 2502, "", 2522, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'K' && item.bl_ngoaitru == 'C'){%>
    <div class=""custom-control custom-checkbox dsbv"" id=""dsbv_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""benh_vien_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-benhvien modalBenhVienItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""benh_vien_<%- item.ma %>""><%- item.ten %> - <label class=""text""> (Bảo lãnh ngoại trú) </label> </label>
    </div>
    <%}else{%>
    <div class=""custom-control custom-checkbox dsbv"" id=""dsbv_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""benh_vien_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-benhvien modalBenhVienItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""benh_vien_<%- item.ma %>""><%- item.ten %></label>
    </div>
    <%}%>
    <% ");
            WriteLiteral(@"})}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>


<div id=""modalCanBo"" class=""modal-drag"" style=""width: 300px; z-index: 9999999; margin-top: 226px !important; margin-left: 848px !important;"">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn cán bộ</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_CanBo"" type=""text"" placeholder=""Tìm kiếm cán bộ"" class=""form-control"">
                <input type=""hidden"" id=""modalCanBoElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalCanBoDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type");
            WriteLiteral(@"=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonCanBo"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalCanBoDanhSachTemplate"">
    <% if(danh_sach_can_bo.length > 0){ %>
    <% _.forEach(danh_sach_can_bo, function(item,index) { %>
    <% var");
            BeginWriteAttribute("ma", " ma =", 4904, "", 4909, 0);
            EndWriteAttribute();
            WriteLiteral(@" danh_sach_can_bo[index].ma.trim().replace(/[^a-zA-Z0-9]/g, '') %>
    <div class=""custom-control custom-checkbox dscb"" id=""dscb_<%- ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""can_bo_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-canbo modalCanBoItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""can_bo_<%- item.ma %>""><%- item.ten %></label>
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