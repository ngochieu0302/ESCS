#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalSendEmail.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ef88ac6821b53ca06b4852932ad74d1bf8774035"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalSendEmail), @"mvc.1.0.view", @"/Views/Shared/_ModalSendEmail.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ef88ac6821b53ca06b4852932ad74d1bf8774035", @"/Views/Shared/_ModalSendEmail.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalSendEmail : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/libs/esmail/css/component.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmSendEmailCommon"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("style", new global::Microsoft.AspNetCore.Html.HtmlString("width:100%;"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper;
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("\r\n");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "ef88ac6821b53ca06b4852932ad74d1bf87740355437", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
<script>(function (e, t, n) { var r = e.querySelectorAll(""html"")[0]; r.className = r.className.replace(/(^|\s)no-js(\s|$)/, ""$1js$2"") })(document, window, 0);</script>
<div id=""modalSendEmailCommon"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1 modal-draggable"">
                <h4 class=""modal-title"">Th??ng tin g???i email</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ef88ac6821b53ca06b4852932ad74d1bf87740357245", async() => {
                WriteLiteral("\r\n                    <input type=\"hidden\" name=\"key\"");
                BeginWriteAttribute("value", " value=\"", 850, "\"", 858, 0);
                EndWriteAttribute();
                WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"template\"");
                BeginWriteAttribute("value", " value=\"", 920, "\"", 928, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Lo???i th??ng b??o</label>
                                <select class=""select2 form-control custom-select"" required name=""loai"" style=""width: 100%;"">
                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ef88ac6821b53ca06b4852932ad74d1bf87740358331", async() => {
                    WriteLiteral("Ch???n lo???i th??ng b??o");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_2.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral(@"
                                </select>
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Email ng?????i nh???n(d???u ;)</label>
                                <input type=""text"" class=""form-control"" required name=""nguoi_nhan"" placeholder=""Email ng?????i nh???n"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label");
                BeginWriteAttribute("class", " class=\"", 2000, "\"", 2008, 0);
                EndWriteAttribute();
                WriteLiteral(@">Cc (d???u ;)</label>
                                <input type=""text"" class=""form-control"" name=""cc"" placeholder=""Cc Email"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label");
                BeginWriteAttribute("class", " class=\"", 2342, "\"", 2350, 0);
                EndWriteAttribute();
                WriteLiteral(@">Bcc (d???u ;)</label>
                                <input type=""text"" class=""form-control"" name=""bcc"" placeholder=""Bcc Email"">
                            </div>
                        </div>
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label class=""_required"">Ti??u ?????</label>
                                <input type=""text"" class=""form-control"" required name=""tieu_de"" placeholder=""Ti??u ????? email"">
                            </div>
                        </div>
                        <div class=""col-12"">
                            <a href=""#"" data-toggle=""collapse"" data-target=""#modalSendEmailCommonNoiDungEmail"" aria-expanded=""false"" aria-controls=""modalSendEmailCommonNoiDungEmail"">Xem n???i dung email.</a>
                            <a href=""#"" style=""float:right"" id=""modalSendEmailCommonDinhKemFile"" data-file-id=""123456789,123456788"" data-file-name=""file1.pdf,file2.pdf"">File ????nh k??m th??m(0)</a>
        ");
                WriteLiteral(@"                </div>
                        <div class=""col-12 collapse"" id=""modalSendEmailCommonNoiDungEmail"">
                            <div class=""form-group"">
                                <textarea id=""frmSendEmailCommon_noi_dung"" name=""noi_dung"" required rows=""3"" placeholder=""N???i dung""></textarea>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_5.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-150 d-none"" id=""btnFrmSendEmailZaloCommonSubmit"">
                    <i class=""fas fa-envelope mr-2""></i>G???i email v?? zalo
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-70"" id=""btnFrmSendEmailCommonSubmit"">
                    <i class=""fas fa-envelope mr-2""></i>G???i
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-70"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>????ng
                </button>
            </div>
        </div>
    </div>
</div>


<div id=""modalSendEmailCommonFileAttach"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-md"">
        <div class=""modal-content"">
            <div class=""modal-head");
            WriteLiteral(@"er py-1"">
                <h4 class=""modal-title"">Th??m t??i li???u ????nh k??m</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-12"">
                        <table id=""modalSendEmailCommonFileAttachTable"" style=""width:100%"" class=""table-bordered"">
                            <tr>
                                <td colspan=""2"">Ch??a c?? file ????nh k??m</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <div class=""dropzone-panel"">
                    <a class=""dropzone-select btn btn-sm btn-primary font-weight-bold text-white"" id=""modalSendEmailCommonFileAttachAdd"">
                        <i class=""fas fa-plus""></i> Th??m t??i li???u
                    </a>
                </di");
            WriteLiteral(@"v>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-1""></i> ????ng
                </button>
            </div>
        </div>
    </div>
</div>

<script type=""text/html"" id=""modalSendEmailCommonFileAttachTableTemplate"">
    <% if(data.length > 0){
    _.forEach(data, function(item,index) { %>
    <tr data-file-id=""<%- item.id %>"">
        <td style=""padding:5px;"" class=""font-weight-bold"">
            <%- item.ten %>
        </td>
        <td class=""text-center"" style=""padding:5px;width:100px"">
            <a href=""#"" onclick=""ESSendEmail_OnDeleteFile('<%- item.id %>')""><i class=""fas fa-trash""></i></a>
        </td>
    </tr>
    <% })}else{ %>
    <tr>
        <td class=""text-center"" colspan=""2"">Ch??a c?? file ????nh k??m</td>
    </tr>
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
