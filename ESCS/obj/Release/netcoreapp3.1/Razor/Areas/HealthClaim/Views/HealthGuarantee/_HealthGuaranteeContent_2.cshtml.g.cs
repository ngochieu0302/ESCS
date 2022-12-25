#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\HealthGuarantee\_HealthGuaranteeContent_2.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7e0201de426a82a74eb3f7fca334df60a5a1ab55"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_HealthGuarantee__HealthGuaranteeContent_2), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/HealthGuarantee/_HealthGuaranteeContent_2.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7e0201de426a82a74eb3f7fca334df60a5a1ab55", @"/Areas/HealthClaim/Views/HealthGuarantee/_HealthGuaranteeContent_2.cshtml")]
    public class Areas_HealthClaim_Views_HealthGuarantee__HealthGuaranteeContent_2 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row"">
    <div class=""col-9 pr-0 pl-0"">
        <div class=""card mb-0 modal-main-content"">
            <div class=""card-body px-0"" style=""padding-top:0 !important"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Hình ảnh hồ sơ</h5>
                        <div class=""btn-group float-right"">
                            <div class=""custom-control custom-checkbox custom-control-inline"" style=""margin:unset;"">
                                <input type=""checkbox"" onchange=""updateTrangThaiHsGoc()"" id=""trang_thai_hs_goc_chk""");
            BeginWriteAttribute("value", " value=\"", 685, "\"", 693, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""custom-control-input"">
                                <label class=""custom-control-label"" for=""trang_thai_hs_goc_chk"" style=""font-size:13px; color:#009efb;font-weight:bold; cursor:pointer; padding-top: 1px;"">Đã bổ sung đầy đủ hồ sơ gốc</label>
                            </div>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div id=""img-container"" style=""height:67vh""></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-3"">
        <div class=""card m-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg border-bottom"">
                        <div class=""btn-group float-right"" style=""color: #2d88ff;"">
                            <a");
            WriteLiteral(@" class=""btn btn-light rounded py-0"" id=""btnAnhHopDong"">
                                <i class=""fas fa-file-contract"" title=""Click để xem ảnh hợp đồng""></i>
                            </a>
                            <a class=""btn btn-light rounded py-0"" id=""btnTransImageView"">
                                <i class=""fas fa-th""></i>
                            </a>
                            <a class=""btn btn-light rounded py-0"" id=""btnDocOCR"">
                                OCR <i class=""fas fa-qrcode"" title=""Click để đọc OCR tài liệu""></i>
                            </a>
                        </div>
                        <div class=""btn-group float-right"">
                            <a class=""btn btn-light rounded py-0 d-none"" data-toggle=""dropdown"" data-display=""static"" aria-haspopup=""true"" aria-expanded=""false"">
                                <i class=""fal fa-ellipsis-v""></i>
                            </a>
                            <div class=""dropdown-menu dropdown-menu-ri");
            WriteLiteral(@"ght border"" id=""dsNhomAnh""></div>
                        </div>
                    </div>
                    <div class=""container-fluid scrollable"" id=""lstImage"" style=""height: 460px;"">
                        <div class=""row"">
                            <div class=""col-12 px-2 list-pictures"" id=""dsAnhTonThat"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""container-fluid"">
            <div class=""row"">
                <div class=""btn-group btn-group-justified"" role=""group"">
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Phân loại danh mục"" id=""btnViewAnhListDGTT"">
                        <i class=""fas fa-atlas""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải xuống"" id=""btnDownLoadAnhDGTT"">
                        <i");
            WriteLiteral(@" class=""fas fa-download""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải lên"" id=""btnUpLoadAnhDGTT"">
                        <i class=""fas fa-upload""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""In"" id=""btnInAnhDGTT"">
                        <i class=""fas fa-print""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Xóa"" id=""btnXoaLoadAnhDGTT"">
                        <i class=""fas fa-trash-alt""></i>
                    </button>
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
