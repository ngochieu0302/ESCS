#pragma checksum "D:\ESCS\ESCS\Views\ClaimOnline\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0ede1e85819cdd7451e52a853ae2100fa884f407"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_ClaimOnline__Modal), @"mvc.1.0.view", @"/Views/ClaimOnline/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0ede1e85819cdd7451e52a853ae2100fa884f407", @"/Views/ClaimOnline/_Modal.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_ClaimOnline__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmYKienKhachHang"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("novalidate", new global::Microsoft.AspNetCore.Html.HtmlString("novalidate"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmGhiChuHangMuc"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<div class=""modal fade"" id=""modalYKienKhachHang"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModalCenterTitle"" aria-hidden=""true"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog modal-dialog-centered"" role=""document"">
        <div class=""modal-content"">
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0ede1e85819cdd7451e52a853ae2100fa884f4074844", async() => {
                WriteLiteral(@"
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""form-group m-0"">
                                <label class=""_required"" style=""font-size: 16px; font-weight: 600; color: #424D54;"">Vui lòng nhập ý kiến</label>
                                <textarea class=""form-control"" placeholder=""Nhập ý kiến của bạn"" required autocomplete=""off"" rows=""6"" name=""noi_dung"" maxlength=""500"">Đã bổ sung</textarea>
                            </div>
                        </div>
                    </div>
                    <div class=""row px-3 mt-3 border-top"">
                        <div class=""col-12 mt-3 d-flex justify-content-center"">
                            <button type=""button"" class=""btn-nhap wd-110 mx-2 p-2"" id=""btnLuuYKienKhachHang"" style=""background-color: #0C8242; font-family: 'Roboto'; width:110px;""><i class=""fa fa-check mr-2""></i>Gửi hồ sơ</button>
                            <button type=""button"" class=""btn-close wd-110 m");
                WriteLiteral("x-2 p-2\" id=\"btnDongYKienKhachHang\" style=\"width: 110px;\"><i class=\"fas fa-window-close mr-2\"></i>Đóng</button>\r\n                        </div>\r\n                    </div>\r\n                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
        </div>
    </div>
</div>

<div class=""custom-modal"">
    <div id=""modalXemHinhAnhDanhGiaRuiRo"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;"">
        <div class=""modal-dialog modal-lg m-0 px-2"" style=""width:100%;max-width:unset; top:8%;"">
            <div class=""modal-content"">
                <div class=""modal-header py-1"" style=""background-color: #0c8241; cursor: pointer; border: unset; box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset; "">
                    <h6 class=""modal-title"" style=""color:#fff"" id=""image-title"">Hình ảnh chi tiết</h6>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body p-2"">
                    <div class=""row"">
                        <div class=");
            WriteLiteral(@"""col-12"">
                            <div style=""height:70vh;"" id=""modalXemHinhAnhDanhGiaRuiRoView""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div class=""custom-modal"">
    <style>
        .modal-body{
            position: fixed !important;
            top:0 !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
        }
    </style>
    <div id=""modalQuayVideoDanhGiaRuiRo"" class=""modal"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999; overflow:hidden !important;"">
        <div class=""modal-dialog"" style=""width: 100%; height: 100%; margin: 0; padding: 0;"">
            <div class=""modal-content"" style="" height: 100%; min-height: 100%; border-radius: 0; border: 0;"">
                <div class=""modal-body p-0 m-0"">
                    <div class=""h-100 d-flex flex");
            WriteLiteral(@"-column camera-container"">
                        <style>
                            .media-button{
                                text-shadow: 0px 0px 5px dimgray;
                            }
                        </style>
                        <div class=""w-100 py-3"" style=""position:absolute; top:0; background-color:transparent;z-index:1;"">
                            <div class=""container-fluid d-flex flex-nowrap camera-info"">
");
            WriteLiteral(@"                                <div class=""col-4 col-md-3 py-1 px-2 d-none"" style=""max-width:100px !important;"">
                                    <div class=""progress h-100"">
                                        <div class=""progress-bar bg-primary"" style=""width:100%;"" id=""recordProgress""></div>
                                    </div>
                                </div>
                                <a href=""javascript:void(0);"" class=""media-button text-danger ml-auto d-none""><i class=""fas fa-3x fa-fw fa-video fa-fade""></i></a>
                                <a href=""javascript:void(0);"" class=""media-button text-white ml-auto""><i class=""fas fa-3x fa-fw fa-times""></i></a>
                            </div>
                        </div>
                        <div class=""camera-media flex-fill"" style=""height:0;"">
                            <video muted playsinline
                                   style=""width:100%;height:100%;background-color:dimgray;"">
                          ");
            WriteLiteral(@"  </video>
                        </div>
                        <div class=""w-100 py-3"" style=""position:absolute; bottom:0; background-color:transparent;z-index:1;"">
                            <div class=""container-fluid d-flex flex-nowrap camera-control"">
                                <a href=""javascript:void(0);"" class=""media-button text-white ml-auto""><i class=""fas fa-3x fa-fw fa-play""></i></a>
                                <a href=""javascript:void(0);"" class=""media-button text-white ml-auto""><i class=""fas fa-3x fa-fw fa-pause""></i></a>
                                <a href=""javascript:void(0);"" class=""media-button text-white mr-auto ml-4""><i class=""fas fa-3x fa-fw fa-circle""></i></a>
                                <a href=""javascript:void(0);"" class=""media-button text-white mr-auto ml-4""><i class=""fas fa-3x fa-fw fa-stop""></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   ");
            WriteLiteral(@" </div>
</div>

<div class=""custom-modal"">
    <div id=""modalXemVideoDanhGiaRuiRo"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999; overflow:hidden !important;"">
        <div class=""modal-dialog"" style=""width: 100%; height: 100%; margin: 0; padding: 0;"">
            <div class=""modal-content"" style="" height: auto; min-height: 100%; border-radius: 0; border: 0;"">
                <div class=""modal-body p-0 m-0"">
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""video-screenshot m-0 p-0"">
                                <div class=""video-back-camera"">
                                    <a href=""javascript:void(0)"" id=""btnBackVideo""><i class=""fas fa-arrow-left icon-back-camera""></i></a>
                                </div>
                                <video autoplay id=""xemVideoDanhGiaRuiRo"" playsinline controls></video>
              ");
            WriteLiteral(@"              </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade"" id=""modalNhapGhiChu"" tabindex=""-1"" role=""dialog"" aria-labelledby=""exampleModalCenterTitle"" aria-hidden=""true"" data-keyboard=""false"" data-backdrop=""static"">
    <div class=""modal-dialog m-0 p-0 w-100 modal-dialog-end"" role=""document"" style=""position: fixed; top: auto; right: auto; left: auto; bottom: 0;"">
        <div class=""modal-content border-0 rounded-border"">
            <div class=""modal-header card-header py-2"">
                <h6 class=""modal-title"" id=""hang-muc-title"">Ghi chú hạng mục</h6>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0ede1e85819cdd7451e52a853ae2100fa884f40714605", async() => {
                WriteLiteral(@"
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""form-group m-0"">
                                <textarea class=""form-control"" data-id="""" placeholder=""Ghi chú hạng mục"" required autocomplete=""off"" rows=""6"" name=""ghi_chu"" maxlength=""500"" style=""font-size: 0.825rem;""></textarea>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_2.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            </div>
            <div class=""modal-footer border-0"">
                <div class=""row w-100 mx-0 mb-3"">
                    <div class=""col-6 px-1"">
                        <button type=""button"" class=""btn-close p-2"" style=""width: 100%;"" data-dismiss=""modal""><i class=""fas fa-window-close mr-2""></i>Đóng</button>
                    </div>
                    <div class=""col-6 px-1"">
                        <button type=""button"" class=""btn-success p-2"" style=""width: 100%;"" id=""btnLuuGhiChu"" data-dismiss=""modal""><i class=""fas fa-save mr-2""></i>Lưu</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>");
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
