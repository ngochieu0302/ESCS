#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalPreviewFile.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5419a78eb880933220bfb0a4782f122e31b261b0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalPreviewFile), @"mvc.1.0.view", @"/Views/Shared/_ModalPreviewFile.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5419a78eb880933220bfb0a4782f122e31b261b0", @"/Views/Shared/_ModalPreviewFile.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalPreviewFile : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
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
    .show_loading {
        background: url(../images/loading.svg) center center no-repeat;
    }
</style>
<div id=""modalPreviewFile"" class=""modal fade"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog"" style=""max-width:60vw"">
        <div class=""modal-content"">
            <div class=""modal-header py-1 modal-draggable"">
                <h4 class=""modal-title"" id=""modalPreviewFileTitle"">Danh s??ch t??i li???u</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body"" style=""background-color:#54667a0a; padding:0px"">
                <div class=""row p-2"">
                    <div class=""col-12"">
                        <div class=""card border mb-0"">
                            <div class=""card-body"" style=""height: 80vh;overflow-y: auto; padding: .");
            WriteLiteral(@"25rem !important;"">
                                <div class=""tab-content"" id=""modalPreviewFileContents"" style=""height:79vh !important""></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
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
