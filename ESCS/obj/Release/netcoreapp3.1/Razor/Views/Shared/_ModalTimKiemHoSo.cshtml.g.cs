#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalTimKiemHoSo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "17b52f81b515974b9d33393e5d4781c3531b3b06"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalTimKiemHoSo), @"mvc.1.0.view", @"/Views/Shared/_ModalTimKiemHoSo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"17b52f81b515974b9d33393e5d4781c3531b3b06", @"/Views/Shared/_ModalTimKiemHoSo.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalTimKiemHoSo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmTimKiemHoSoDashboard"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frmTimKiemHoSoDashboard"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalDashBoardTimKiemHoSo"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" aria-modal=""true"" role=""dialog"">
    <div class=""modal-dialog"" style=""max-width: 70%;"">
        <div class=""modal-content"">
            <div class=""modal-header p-2"">
                <h4 class=""modal-title"">Th??ng tin h??? s??</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body py-0"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "17b52f81b515974b9d33393e5d4781c3531b3b064724", async() => {
                WriteLiteral("\r\n                    <div class=\"row mt-1\">\r\n                        <div class=\"col col-5 px-2\">\r\n                            <div class=\"form-group\">\r\n                                <label");
                BeginWriteAttribute("class", " class=\"", 802, "\"", 810, 0);
                EndWriteAttribute();
                WriteLiteral(@">?????i t??c</label>
                                <select class=""select2 form-control custom-select"" name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col col-7 px-2"">
                            <div class=""form-group"">
                                <label");
                BeginWriteAttribute("class", " class=\"", 1189, "\"", 1197, 0);
                EndWriteAttribute();
                WriteLiteral(@">Th??ng tin t??m ki???m</label>
                                <div class=""input-group"">
                                    <input type=""text"" autocomplete=""off"" class=""form-control"" name=""tim"" id=""timKiemNhanhHoSo"" placeholder=""T??m ki???m nhanh: Nh???p s??? h??? s??/Bi???n xe/T??n KH"">
                                    <div class=""input-group-append"">
                                        <label class=""input-group-text"" for=""timKiemNhanhHoSo"">
                                            <a href=""#"" id=""btnSearchHoSo_Dashboard""><i class=""fal fa-search"" title=""T??m ki???m h??? s??""></i></a>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                <div class=""row mt-2"">
                    <div class=""col-12 px-2"">
                        <div class=""table-responsive"">
                            <table class=""table table-bordered fixed-header"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center"">
                                        <th style=""width:4%"">STT</th>
                                        <th style=""width:8%"">Ng??y m???</th>
                                        <th style=""width:20%"">S??? h??? s??</th>
                                        <th style=""width:10%"">Bi???n xe</th>
                                        <th style=""width:19%"">T??n kh??ch h??ng</th>
                                        <th style=""width:11%"">H??? s?? gi??m ?????nh</th>
                                        <th style=""width:11%"">H??? s?? b???i th?????ng</th>
                                        <th style=""width:11%"">H??? s?? ph?? duy???t</th>
                                    <");
            WriteLiteral(@"/tr>
                                </thead>
                                <tbody id=""danhSachHoSoDashboard"">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""row w-100 m-0 my-2"">
                <div class=""col-12 px-2"">
                    <div id=""tableDanhSachHoSoDashboard_pagination""></div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type=""text/html"" id=""danhSachHoSoDashboardTemplate"">
    <% if(data.length > 0){ %>
    <% _.forEach(data, function(item,index) { %>
    <tr class=""row_item cursor-pointer"" data_ma_doi_tac=""<%- item.ma_doi_tac%>"" data_so_id=""<%- item.so_id%>"">
        <td class=""text-center""><%- item.sott %></td>
        <td class=""text-center""><%- item.ngay_mo_hs %></td>
        <td class=""text-center""><%- item.so_hs %></td>
        <td class=""text-center""><%- item.doi_tuon");
            WriteLiteral(@"g %></td>
        <td class=""text-center""><%- item.ten_kh %></td>
        <td class=""text-center""><a href=""#"" onclick=""ShowInvestigationDisplay('<%- item.ma_doi_tac%>','<%- item.so_id %>','XEM_CTIET_HO_SO_GD')"">HS gi??m ?????nh</a></td>
        <td class=""text-center""><a href=""#"" onclick=""ShowCompensationDisplay('<%- item.ma_doi_tac%>','<%- item.so_id %>','XEM_CTIET_HO_SO_BT')"">HS b???i th?????ng</a></td>
        <td class=""text-center"">
            <%if(item.loai_trinh");
            BeginWriteAttribute("!", " !=", 4556, "", 4559, 0);
            EndWriteAttribute();
            WriteLiteral(@"= null) {%>
            <a href=""#"" onclick=""ShowApprovedDisplay('<%- item.ma_doi_tac%>','<%- item.so_id %>','XE','<%- item.lh_nv%>', '<%- item.loai_trinh%>','<%- item.bt_trinh%>','<%- item.ten_to_trinh%>','<%- item.hanh_dong%>')"">HS ph?? duy???t</a>
            <%}%>
        </td>
    </tr>
    <% })} %>

    <% if(data.length < 5){
    for(var");
            BeginWriteAttribute("i", " i =", 4911, "", 4915, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 5 - data.length;i++ ){
    %>
    <tr>
        <td style=""height:35.1px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

<style>
    #modalDashBoardTimKiemHoSo .fixed-header thead th {
        position: sticky;
        top: 0;
        background-color: #1e88e5;
        color: #fff;
        z-index: 1;
        padding: 8px;
    }

    #modalDashBoardTimKiemHoSo .table td {
        padding: 0.5rem !important;
    }

    #modalDashBoardTimKiemHoSo .table tbody {
        font-size: 12px;
    }
</style>");
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
