#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalXemThongTinGiayToTaiLieu.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1c6e211b0327898bd4e11ea588c780620dc6e932"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalXemThongTinGiayToTaiLieu), @"mvc.1.0.view", @"/Views/Shared/_ModalXemThongTinGiayToTaiLieu.cshtml")]
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
#nullable restore
#line 1 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\ESCS\ESCS\Views\_ViewImports.cshtml"
using ESCS.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1c6e211b0327898bd4e11ea588c780620dc6e932", @"/Views/Shared/_ModalXemThongTinGiayToTaiLieu.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalXemThongTinGiayToTaiLieu : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .pdfobject-container {
        height: 72vh;
    }
    .pdfobject {
        border: 1px solid #666;
    }
</style>
<div id=""modalXemThongTinGiayToTaiLieu"" class=""modal fade"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog"" style=""max-width:90vw"">
        <div class=""modal-content"">
            <div class=""modal-header py-1 modal-draggable"">
                <h4 class=""modal-title"">Danh s??ch t??i li???u</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body"" style=""background-color:#54667a0a; padding:0px"">
                <div class=""row p-2"">
                    <div class=""col-3"">
                        <div class=""card border mb-0"">
                            <div class=""card-body p-3"" style=""height:80vh;overflow-y:auto"">
                                <div class=""nav flex-column nav-pills"" role=""tablist"" aria-orientation=""vertical"" id=""modalD");
            WriteLiteral(@"anhSachGiayToTaiLieu"">

                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-9 pl-0"">
                        <div class=""card border mb-0"">
                            <div class=""card-body"" style=""height: 80vh;overflow-y: auto; padding: .25rem !important;"">
                                <div class=""tab-content"" id=""modalXemChiTietGiayToTaiLieu""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type=""text/html"" id=""modalDanhSachGiayToTaiLieuTemplate"">
    <% if(data.length > 0){ %>
    <% var");
            BeginWriteAttribute("stt", " stt =", 1794, "", 1800, 0);
            EndWriteAttribute();
            WriteLiteral(@" 1 %>
    <%_.forEach(data, function(item,index) { %>
    <a class=""nav-link modalDanhSachGiayToTaiLieuTabItem"" onclick=""xemChiTietFile('<%- item.bt %>','<%- item.extension%>', this)"" style=""cursor:pointer"" id=""modalDanhSachGiayToTaiLieuTabItem_<%- stt %>"" document-id=""<%- stt %>"" data-toggle=""pill"" href=""#modalXemChiTietGiayToTaiLieuTabContent_<%- stt %>"" role=""tab"" aria-controls=""modalDanhSachGiayToTaiLieuTabItem_<%- stt %>"" aria-selected=""true""><%- item.nhom_anh %></a>
    <% stt++ %>
    <% }) %>
    <% }%>
</script>
<script type=""text/html"" id=""modalXemChiTietGiayToTaiLieuTemplate"">
    <% if(data.length > 0){%>
    <% var");
            BeginWriteAttribute("stt", " stt =", 2444, "", 2450, 0);
            EndWriteAttribute();
            WriteLiteral(@" 1 %>
    <%_.forEach(data, function(item,index) { %>
    <div class=""tab-pane fade"" id=""modalXemChiTietGiayToTaiLieuTabContent_<%- stt %>"" style=""height: 77vh;width:auto"" role=""tabpanel"" aria-labelledby=""modalXemChiTietGiayToTaiLieuTabContent_<%- stt %>""></div>
    <% stt++ %>
    <% })
    }%>
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
