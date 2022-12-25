#pragma checksum "D:\ESCS\ESCS\Areas\Contract\Views\Package\_ModalMaBenh.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7f7e7dcbb071db163cbb139c582946fb0107951e"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Contract_Views_Package__ModalMaBenh), @"mvc.1.0.view", @"/Areas/Contract/Views/Package/_ModalMaBenh.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7f7e7dcbb071db163cbb139c582946fb0107951e", @"/Areas/Contract/Views/Package/_ModalMaBenh.cshtml")]
    public class Areas_Contract_Views_Package__ModalMaBenh : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalCauHinhMaBenh"" class=""modal-drag"" style=""width:350px; z-index:9999999; position:absolute; top:500px !important;"">
    <div class=""modal-drag-header"">
        <h5><span class=""modal-drag-title"">Chọn mã bệnh</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""inputSearch_CauHinhMaBenh"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalCauHinhMaBenhElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalCauHinhMaBenhDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnChonCauHinhMaBenh"">
            <i class=""fas fa-mouse-pointer mr-1""></i> Chọn
    ");
            WriteLiteral(@"    </button>
    </div>
</div>
<script type=""text/html"" id=""modalCauHinhMaBenhDanhSachTemplate"">
    <% if(ds_cau_hinh_ma_benh.length > 0){
    _.forEach(ds_cau_hinh_ma_benh, function(item,index) { %>
    <div class=""custom-control custom-checkbox chmb"" id=""chmb_<%- item.ma %>"" data-text=""<%- item.ten_v %>"">
        <input type=""checkbox"" id=""ma_benh_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonCauHinhMaBenhItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""ma_benh_<%- item.ma %>""><%- item.ten_v %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>

");
            WriteLiteral(@"<div id=""modalCauHinhDKBS"" class=""modal-drag"" style=""width:600px; z-index:9999999; position:absolute; top:500px !important; margin-left:120px !important;"">
    <div class=""modal-drag-header"">
        <h5><span class=""modal-drag-title"">Chọn điều khoản bổ sung</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""inputSearch_CauHinhDKBS"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalCauHinhDKBSElementSelect"">

            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalCauHinhDKBSDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnChonCauHinhDKBS"">
            <i class=""fas fa-mous");
            WriteLiteral(@"e-pointer mr-1""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""modalCauHinhDKBSDanhSachTemplate"">
    <% if(ds_cau_hinh_dkbs.length > 0){
    _.forEach(ds_cau_hinh_dkbs, function(item,index) { %>
    <div class=""custom-control custom-checkbox dkbs"" id=""dkbs_<%- item.ma %>"" data-text=""<%- item.ten %>"">
        <input type=""checkbox"" id=""ma_dkbs_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonCauHinhDKBSItem"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""ma_dkbs_<%- item.ma %>""><%- item.ten %></label>
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
