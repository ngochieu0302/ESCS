#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ESChat.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d7ff59c06d54fbd79b41995c89784c02b7ab8a37"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ESChat), @"mvc.1.0.view", @"/Views/Shared/_ESChat.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d7ff59c06d54fbd79b41995c89784c02b7ab8a37", @"/Views/Shared/_ESChat.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ESChat : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/images/users/1.jpg"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("alt", new global::Microsoft.AspNetCore.Html.HtmlString("avatar"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("avatar1"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/html"" id=""templateEsChat"">
    <div class=""container"" style=""display:none"" id=""ESChat_<%- ma_doi_tac %>_<%- nsd %>"" hien_thi=""false"">
        <div class=""row chat-window col-xs-5 col-md-3"" style=""margin-left:10px;"">
            <div class=""col-12 p-0 move-item"" style=""border:solid 3px #1e88e5;border-radius:0.85rem"">
                <div class=""card m-0"" style=""border-radius: 0.85rem"">
                    <div class=""card-header"">
                        <div class=""row"">
                            <div class=""col-9"">
                                <h5 class=""panel-title ESChatDisplayName"">
                                    Không có dữ liệu
                                </h5>
                            </div>
                            <div class=""col-3"" style=""text-align: right;"">
                                <a href=""#"" class=""ESChatVideoCall"" style=""padding-right:5px;"" title=""Gọi video"">
                                    <span class=""fa fa-video""></span>
      ");
            WriteLiteral(@"                          </a>
                                <a href=""#"" style=""padding-right:5px;"" class=""ESChatMinimize"">
                                    <span class=""fa fa-minus""></span>
                                </a>
                                <a href=""#"" style=""padding-right:5px;"" class=""ESChatMaximize"">
                                    <span class=""far fa-window-maximize""></span>
                                </a>
                                <a href=""javascript:void(0)"" class=""ESChat_close"">
                                    <span class=""fa fa-times""></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class=""card-body ESChatContent"" id=""ESChatContent_<%- ma_doi_tac %>_<%- nsd %>"" style=""height:50vh;overflow:auto"">
                        <p class=""ESChatNoneContent"" style=""text-align:center;opacity:0.5"">Không có nội dung hiển thị</p>
                  ");
            WriteLiteral(@"  </div>
                    <div class=""card-footer py-0 ESChatFooter"">
                        <div class=""row"">
                            <div class=""col"">
                                <div class=""form-group float-label mt-1"">
                                    <input type=""text"" class=""form-control ESChatNotify"" id=""ESChatNotify_<%- ma_doi_tac %>_<%- nsd %>"" autofocus>
                                    <label for=""quickreplay2"" class=""form-control-label"">Nhập nội dung tin nhắn</label>
                                </div>
                            </div>
                            <div class=""col-auto pl-0 align-self-center"">
                                <button class=""btn btn-light ESChatAttachFile"" id=""ESChatAttachFile_<%- ma_doi_tac %>_<%- nsd %>"">
                                    <i class=""fa fa-paperclip""></i>
                                </button>
                                <button class=""btn btn-primary ESChatSubmit"" id=""ESChatSubmit_<%- ma_doi_tac %>_<%- nsd ");
            WriteLiteral(@"%>"">
                                    <i class=""fa fa-paper-plane""></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>
<script type=""text/html"" id=""templateTinNhanDen"">
    <div class=""message-item"">
        ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "d7ff59c06d54fbd79b41995c89784c02b7ab8a377692", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
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
        <div class=""content"">
            <div class=""title""><%- nsd_gui_ten %></div>
            <div class=""bubble"">
                <%- nd %>
            </div>
            <div class=""text-muted""><%- thoi_gian %></div>
        </div>
    </div>
</script>
<script type=""text/html"" id=""templateTinNhanDi"">
    <div class=""message-item user"">
        <div class=""content"">
            <div class=""bubble"">
                <%- nd %>
            </div>
            <div class=""text-muted""><%- thoi_gian %></div>
        </div>
    </div>
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