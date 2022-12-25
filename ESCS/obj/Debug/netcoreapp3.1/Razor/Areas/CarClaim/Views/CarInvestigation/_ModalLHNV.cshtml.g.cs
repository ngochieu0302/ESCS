#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\CarInvestigation\_ModalLHNV.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "a44843943f4848f44150b7cfc494cf0b420a85c0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_CarInvestigation__ModalLHNV), @"mvc.1.0.view", @"/Areas/CarClaim/Views/CarInvestigation/_ModalLHNV.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"a44843943f4848f44150b7cfc494cf0b420a85c0", @"/Areas/CarClaim/Views/CarInvestigation/_ModalLHNV.cshtml")]
    public class Areas_CarClaim_Views_CarInvestigation__ModalLHNV : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalDsLHNVLaySoHS"" class=""modal-drag"" style=""width:350px; z-index:9999999; margin-top: 95px !important; margin-left: -255px !important;"">
    <div class=""modal-drag-header"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn loại hình nghiệp vụ</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_LHNVLaySoHS"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control item-lhnv"">
                <input type=""hidden"" id=""modalLHNVLaySoHSElementSelect"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalLHNVDanhSachLaySoHS"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90");
            WriteLiteral(@""" id=""btnChonLHNVLaySoHS"">
            <i class=""fas fa-save mr-2""></i> Chọn
        </button>
    </div>
</div>

<div id=""modalDsLHNV"" class=""modal-drag"" style=""width:350px; z-index:9999999; margin-top: 58px !important; margin-left: -179px !important;"">
    <div class=""modal-drag-header border-bottom"">
        <h5 style=""margin-left:10px;""><span class=""modal-drag-title"">Chọn loại hình nghiệp vụ</span> <span data-dismiss=""modal-drag"" style=""margin-right:10px;""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input id=""inputSearch_LHNV"" type=""text"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control item-lhnv"">
                <input type=""hidden"" id=""modalLHNVElementSelect"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalLHNVDanhSach"">

            </div>
        </div>
    </di");
            WriteLiteral(@"v>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""btnChonLHNV"">
            <i class=""fas fa-mouse-pointer mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalLHNVDanhSachTemplate"">
    <% if(data.length > 0){ %>
    <% _.forEach(data, function(item,index){ %>
    <div class=""custom-control custom-checkbox dslhnv"" id=""dslhnv_<%- item.ma %>"" data-text=""<%- item.ma.toLowerCase() %>-<%- item.ten.toLowerCase() %>"">
        <input type=""checkbox"" id=""lhnv_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input item-lhnv modalLHNVItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""lhnv_<%- item.ma %>""><%- item.ten %></label>
    </div>
    <% }) %>
    <% }else{ %>
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
