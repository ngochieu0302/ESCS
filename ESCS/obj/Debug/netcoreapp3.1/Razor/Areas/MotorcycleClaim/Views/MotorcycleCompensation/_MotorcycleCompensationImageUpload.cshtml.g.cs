#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\MotorcycleCompensation\_MotorcycleCompensationImageUpload.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f81b6f0360b1c82bbaf043c05c464371eef57388"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationImageUpload), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationImageUpload.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f81b6f0360b1c82bbaf043c05c464371eef57388", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationImageUpload.cshtml")]
    public class Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationImageUpload : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalEscsUploadFile"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-md"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm tài liệu tổn thất</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form id=""frmThemTLTT"" name=""frmThemTLTT"" method=""post"">
                    <input type=""hidden"" name=""pm"" value=""BT""/>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""dropzone-multi"" id=""uploadFileEscsDropzone"">
                                <div class=""dropzone-panel mb-lg-0 mb-2"">
                                    <a class=""dropzone-select btn btn-sm btn-primary font-weight-bold text-white"">
   ");
            WriteLiteral(@"                                     <i class=""fa fa-plus""></i> Thêm tài liệu
                                    </a>
                                </div>
                                <div class=""dropzone-items scrollable"" style=""height:40vh"">
                                    <div class=""dropzone-item"" style=""display:none"">
                                        <div class=""dropzone-file"">
                                            <div class=""dropzone-filename"" title=""some_image_file_name.jpg"">
                                                <span data-dz-name>some_image_file_name.jpg</span>
                                                <strong>(<span data-dz-size>340kb</span>)</strong>
                                            </div>
                                            <div class=""dropzone-error"" data-dz-errormessage></div>
                                        </div>
                                        <div class=""dropzone-progress"">
                               ");
            WriteLiteral(@"             <div class=""progress"">
                                                <div class=""progress-bar bg-primary"" role=""progressbar"" aria-valuemin=""0"" aria-valuemax=""100"" aria-valuenow=""0"" data-dz-uploadprogress></div>
                                            </div>
                                        </div>
                                        <div class=""dropzone-toolbar"">
                                            <span class=""dropzone-start"">
                                                <i class=""fa fa-upload""></i>
                                            </span>
                                            <span class=""dropzone-cancel"" data-dz-remove style=""display: none;"">
                                                <i class=""fas fa-times""></i>
                                            </span>
                                            <span class=""dropzone-delete"" data-dz-remove>
                                                <i class=""fas fa-times""></i>
    ");
            WriteLiteral(@"                                        </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <span class=""form-text text-muted"">Kích thước lớn nhất là <span id=""uploadConfigFileSize""></span>MB và tải lên tối đa <span id=""uploadConfigFile""></span> file</span>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm mg-t-22"" id=""btnUploadAllFile"">
                    <i class=""fas fa-cloud-upload-alt""></i>&nbsp;&nbsp;Tải lên tất cả
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm mg-t-22"" id=""btnUploadAllFileAndClose"">
                    <i class=""fas fa-cloud-upload-alt""></i>&nbsp;&nbsp;Tải lên tất cả và đóng
                </button>
                <butt");
            WriteLiteral(@"on type=""button"" class=""btn-outline-primary btn-sm wd-90 mg-t-22"" data-dismiss=""modal"" id=""btnCancelUpload"">
                    <i class=""fas fa-window-close""></i>&nbsp;&nbsp;Hủy
                </button>
            </div>
        </div>
    </div>
</div>
<style>
    .dropzone-multi {
        border: 0;
        padding: 0;
    }

        .dropzone-multi .dz-message {
            display: none;
        }

        .dropzone-multi .dropzone-panel .dropzone-upload,
        .dropzone-multi .dropzone-panel .dropzone-remove-all {
            display: none;
        }

        .dropzone-multi .dropzone-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-top: 0.75rem;
            border-radius: 0.42rem;
            padding: 0.5rem 1rem;
            background-color: #F3F6F9;
        }

            .dropzone-m");
            WriteLiteral(@"ulti .dropzone-item .dropzone-file {
                -webkit-box-flex: 1;
                -ms-flex-positive: 1;
                flex-grow: 1;
            }

                .dropzone-multi .dropzone-item .dropzone-file .dropzone-filename {
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: #7E8299;
                    text-overflow: ellipsis;
                    margin-right: 0.5rem;
                }

                    .dropzone-multi .dropzone-item .dropzone-file .dropzone-filename b {
                        font-size: 0.9rem;
                        font-weight: 500;
                        color: #B5B5C3;
                    }

                .dropzone-multi .dropzone-item .dropzone-file .dropzone-error {
                    margin-top: 0.25rem;
                    font-size: 0.9rem;
                    font-weight: 400;
                    color: #F64E60;
                    text-overflow: ellipsis;
                }

  ");
            WriteLiteral(@"          .dropzone-multi .dropzone-item .dropzone-progress {
                width: 15%;
            }

                .dropzone-multi .dropzone-item .dropzone-progress .progress {
                    height: 5px;
                    -webkit-transition: all 0.2s ease-in-out;
                    transition: all 0.2s ease-in-out;
                }

    ");
            WriteLiteral(@"@media (prefers-reduced-motion: reduce) {
        .dropzone-multi .dropzone-item .dropzone-progress .progress {
            -webkit-transition: none;
            transition: none;
        }
    }

    .dropzone-multi .dropzone-item .dropzone-toolbar {
        margin-left: 1rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-wrap: nowrap;
        flex-wrap: nowrap;
    }

        .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-start,
        .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-cancel,
        .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-delete {
            height: 25px;
            width: 25px;
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            -webkit-box-pack: center;
            -ms-flex-pack: cent");
            WriteLiteral(@"er;
            justify-content: center;
            cursor: pointer;
            -webkit-transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
            transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
            transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
            transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;
        }

            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-start i,
            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-cancel i,
            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-delete i {
                -webkit-transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
                t");
            WriteLiteral(@"ransition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
                transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
                transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;
                font-size: 0.8rem;
                color: #7E8299;
            }

            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-start:hover,
            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-cancel:hover,
            .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-delete:hover {
                -webkit-transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
                transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
              ");
            WriteLiteral(@"  transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
                transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;
            }

                .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-start:hover i,
                .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-cancel:hover i,
                .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-delete:hover i {
                    color: #3699FF;
                }

        .dropzone-multi .dropzone-item .dropzone-toolbar .dropzone-start {
            -webkit-transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
            transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, -webkit-box-shadow 0.15s ease;
            transition: color 0.15s ease, background-color 0.15s eas");
            WriteLiteral("e, border-color 0.15s ease, box-shadow 0.15s ease;\r\n            transition: color 0.15s ease, background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease, -webkit-box-shadow 0.15s ease;\r\n        }\r\n</style>");
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
