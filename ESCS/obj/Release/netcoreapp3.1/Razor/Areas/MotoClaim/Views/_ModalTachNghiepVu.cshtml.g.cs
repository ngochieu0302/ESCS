#pragma checksum "D:\ESCS\ESCS\Areas\MotoClaim\Views\_ModalTachNghiepVu.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5f731252b685eaf23140a9789357b4da5155f8ca"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotoClaim_Views__ModalTachNghiepVu), @"mvc.1.0.view", @"/Areas/MotoClaim/Views/_ModalTachNghiepVu.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5f731252b685eaf23140a9789357b4da5155f8ca", @"/Areas/MotoClaim/Views/_ModalTachNghiepVu.cshtml")]
    public class Areas_MotoClaim_Views__ModalTachNghiepVu : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalTachNghiepVu"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-md"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Danh sách nghiệp vụ hồ sơ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col col-12"">
                        <div class=""table-responsive"" style=""max-height:380px"">
                            <table class=""table table-bordered fixed-header"" style=""width:100%"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width: 50px"">Chọn</th>
                              ");
            WriteLiteral(@"          <th>Tên loại hình nghiệp vụ</th>
                                    </tr>
                                </thead>
                                <tbody id=""modalTachNghiepVuBody""></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"" style=""display:block;"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-80 mg-t-22 float-right"" data-dismiss=""modal""><i class=""fas fa-window-close mr-2""></i>Đóng</button>
                <button type=""button"" class=""btn btn-primary btn-sm mg-t-22"" id=""btnChapNhanTachNghiepVu""><i class=""fas fa-copy mr-2""></i>Tách và chuyển hồ sơ</button>
            </div>
        </div>
    </div>
</div>

<script type=""text/html"" id=""modalTachNghiepVuBodyTemplate"">
    <% if(data.length > 0){
    _.forEach(data, function(item,index) { %>
    <tr class=""row-item"">
        <td>
            <div class=""custom-contro");
            WriteLiteral(@"l custom-checkbox ml-2"">
                <input type=""checkbox"" data-field=""lh_nv"" value=""<%- item.ma %>""  id=""modalTachNghiepVu_<%- index %>"" class=""custom-control-input"">
                <label class=""custom-control-label"" for=""modalTachNghiepVu_<%- index %>"">&nbsp;</label>
            </div>
        </td>
        <td>
            <a href=""#""><%- item.ten %></a>
        </td>
    </tr>
    <% })}%>
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