#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\CostDisease\_ModalChiPhiThuoc.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "145b42c0aa380051050eab84312897f515c51b5c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_CostDisease__ModalChiPhiThuoc), @"mvc.1.0.view", @"/Areas/Admin/Views/CostDisease/_ModalChiPhiThuoc.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"145b42c0aa380051050eab84312897f515c51b5c", @"/Areas/Admin/Views/CostDisease/_ModalChiPhiThuoc.cshtml")]
    public class Areas_Admin_Views_CostDisease__ModalChiPhiThuoc : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalChiPhiThuoc"" class=""modal-drag"" style=""width:365px; z-index:9999999;"">
    <div class=""modal-drag-header"">
        <h5><span class=""modal-drag-title"">Chọn chi phí thuốc</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_ChiPhiThuoc"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalChiPhiThuocElementSelect"">
                <input type=""hidden"" id=""modalChiPhiThuoc_MaBenh"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""height:250px;"" id=""modalChiPhiThuocDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonChiPhiThuoc"">
            <i class=""fas fa-save mr-2"">");
            WriteLiteral("</i> Chọn\r\n        </button>\r\n    </div>\r\n</div>\r\n\r\n<script type=\"text/html\" id=\"modalChiPhiThuocDanhSachTemplate\">\r\n    <% if(danh_sach.length > 0){\r\n    _.forEach(danh_sach, function(item,index) { %>\r\n    <%");
            BeginWriteAttribute("if(item.ten_ct", " if(item.ten_ct =", 1233, "", 1250, 0);
            EndWriteAttribute();
            WriteLiteral(@"= null){ %>
    <div class=""custom-control custom-checkbox dscpt"" id=""dscpt_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""chi_phi_thuoc_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChiPhiThuocItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""chi_phi_thuoc_<%- item.ma %>""><%- item.ten %></label>
    </div>
    <% }else{ %>
    <div class=""custom-control custom-checkbox dscpt"" id=""dscpt_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""chi_phi_thuoc_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChiPhiThuocItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""chi_phi_thuoc_<%- item.ma %>""><%- item.ten_ct %> / <%- item.ten %></label>
    </div>
    <% } %>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
  ");
            WriteLiteral("  <% } %>\r\n</script>");
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
