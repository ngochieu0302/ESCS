#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\ApprovedOther\_ApprovedContentStep2.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "0263b8c8fc7d424bcc52125f35c1ea5d22880ee8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_ApprovedOther__ApprovedContentStep2), @"mvc.1.0.view", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep2.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"0263b8c8fc7d424bcc52125f35c1ea5d22880ee8", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep2.cshtml")]
    public class Areas_Manager_Views_ApprovedOther__ApprovedContentStep2 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .square {
        width: 100%;
        padding-bottom: 100%;
        background-size: cover;
        background-position: center;
        transition: all .2s ease-in-out;
    }

    label .square {
        height: 100px;
        width: 100px;
        transition-duration: 0.2s;
        transform-origin: 50% 50%;
    }

    :checked + label {
        border-color: #ddd;
    }

        :checked + label .square {
            transform: scale(0.9);
            z-index: -1;
        }

    .img-container {
        height: 400px;
    }

    .btn {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
    }

    .list-group-item {
        padding: 0.0625rem 1rem;
    }

    .d-flex > .btn {
        flex: 1;
    }

    .carbonads {
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 0.875rem;
        overflow: hidden;
        padding: 1rem;
    }

    .carbon-wrap {
        overflow: hidden;
    }

    .carbon-img ");
            WriteLiteral(@"{
        clear: left;
        display: block;
        float: left;
    }

    .carbon-text,
    .carbon-poweredby {
        display: block;
        margin-left: 140px;
    }

        .carbon-text,
        .carbon-text:hover,
        .carbon-text:focus {
            color: #fff;
            text-decoration: none;
        }

        .carbon-poweredby,
        .carbon-poweredby:hover,
        .carbon-poweredby:focus {
            color: #ddd;
            text-decoration: none;
        }

    ");
            WriteLiteral(@"@media (min-width: 768px) {
        .carbonads {
            float: right;
            margin-bottom: -1rem;
            margin-top: -1rem;
            max-width: 360px;
        }
    }

    .footer {
        font-size: 0.875rem;
    }

    .heart {
        color: #ddd;
        display: block;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 0;
        margin-top: 1rem;
        position: relative;
        text-align: center;
        width: 100%;
    }

        .heart:hover {
            color: #ff4136;
        }

        .heart::before {
            border-top: 1px solid #eee;
            content: "" "";
            display: block;
            height: 0;
            left: 0;
            position: absolute;
            right: 0;
            top: 50%;
        }

        .heart::after {
            background-color: #fff;
            content: ""???"";
            padding-left: 0.5rem;
            padding-right: 0.5rem;
            position: relative;");
            WriteLiteral(@"
            z-index: 1;
        }

    .docs-pictures {
        list-style: none;
        margin: 0;
        padding: 0;
    }

        .docs-pictures > li {
            border: 1px solid transparent;
            float: left;
            height: calc(100% / 2);
            margin: -18px -1px -1px 0;
            overflow: hidden;
            width: calc(100% / 2);
        }

            .docs-pictures > li > input {
                color: white;
            }

            .docs-pictures > li > img {
                width: 100%;
                opacity: 0.7
            }

                .docs-pictures > li > img.active {
                    opacity: 1;
                }

    .docs-buttons > .btn-group,
    .docs-buttons > .input-group {
        margin-bottom: 5px;
        width: 100%;
    }

    .docs-buttons .input-group-prepend {
        width: 50%;
    }

        .docs-buttons .input-group-prepend .btn {
            width: 100%;
        }

    .btn-group-justifi");
            WriteLiteral(@"ed {
        display: table;
        width: 100%;
        table-layout: fixed;
        border-collapse: separate;
    }

        .btn-group-justified > .btn, .btn-group-justified > .btn-group {
            display: table-cell;
            float: none;
            width: 20%;
        }
</style>
<div class=""row mg-t-10"" style=""height:79vh"">
    <div class=""col-9 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body px-0"" style=""padding-top:0px; padding-bottom: 0px;"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">H??nh ???nh h??? s??</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div id=""img-container"" style=""height:70vh""></div>
                        </div>
                    </div>
                </div>
            </div>
        </d");
            WriteLiteral(@"iv>
    </div>
    <div class=""col-3"">
        <div class=""card m-0"">
            <div class=""card-body px-0 pb-0"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Danh s??ch t??i li???u</h5>
                        <div class=""btn-group float-right"">
                            <a class=""btn btn-light rounded py-0 d-none"" data-toggle=""dropdown"" data-display=""static"" aria-haspopup=""true"" aria-expanded=""false"">
                                <i class=""fal fa-ellipsis-v""></i>
                            </a>
                            <div class=""dropdown-menu dropdown-menu-right border"" id=""dsNhomAnh"">
                            </div>
                        </div>
                    </div>
                    <div class=""container-fluid scrollable"" id=""lstImage"" style=""height: 430px;"">
                        <div class=""row"">
                           ");
            WriteLiteral(@" <div class=""col-12 list-pictures"" id=""dsAnhTonThat"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""container-fluid"">
            <div class=""row my-3"">
                <div class=""btn-group btn-group-justified"" role=""group"">
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Xem d?????i d???ng danh s??ch"" id=""btnViewAnhListDGTT"">
                        <i class=""fas fa-list""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""T???i xu???ng"" id=""btnDownLoadAnhDGTT"">
                        <i class=""fas fa-download""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""T???i l??n"" id=""btnUpLoadAnhDGTT"">
                        <i class=""fas fa-upload""></i>
       ");
            WriteLiteral(@"             </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""In"" id=""btnInAnhDGTT"">
                        <i class=""fas fa-print""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""X??a"" id=""btnXoaLoadAnhDGTT"">
                        <i class=""fas fa-trash-alt""></i>
                    </button>
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
