#pragma checksum "D:\ESCS\ESCS\Areas\MotoClaim\Views\MotoCompensation\_ModalKhauTru.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "55367c43a07e69a67e0776dc1e95b41fb954741d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotoClaim_Views_MotoCompensation__ModalKhauTru), @"mvc.1.0.view", @"/Areas/MotoClaim/Views/MotoCompensation/_ModalKhauTru.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"55367c43a07e69a67e0776dc1e95b41fb954741d", @"/Areas/MotoClaim/Views/MotoCompensation/_ModalKhauTru.cshtml")]
    public class Areas_MotoClaim_Views_MotoCompensation__ModalKhauTru : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalKhauTru"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog modal-lg"" style=""max-width:unset; width:45%"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title""");
            BeginWriteAttribute("id", " id=\"", 333, "\"", 338, 0);
            EndWriteAttribute();
            WriteLiteral(@">Thông tin chi tiết khấu trừ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"" style=""background-color: #54667a0a; padding-top:5px;"">
                <form name=""frmKhauTru"" method=""post"">
                    <div class=""row"">
                        <div class=""col col-8"">
                            <div class=""form-group"">
                                <label class=""_required"">Vụ tổn thất</label>
                                <select class=""select2 form-control custom-select"" name=""vu_tt"" style=""width: 100%""></select>
                            </div>
                        </div>
                        <div class=""col col-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Số tiền tối thiểu(chưa VAT)</label>
                                <input type=""text"" class=""form-control number"" autocomplete=""off"" name=""t");
            WriteLiteral(@"ien_ktru_tien_bh"" placeholder=""Số tiền khấu trừ tối thiểu"">
                            </div>
                        </div>

                    </div>
                </form>
                <div class=""table-responsive"" style=""max-height:495px"">
                    <table class=""table table-bordered fixed-header"">
                        <thead class=""font-weight-bold"">
                            <tr class=""text-center uppercase"">
                                <th>Hạng mục</th>
                                <th style=""width:125px"">
                                    <div class=""custom-control custom-checkbox"">
                                        <input type=""checkbox"" class=""custom-control-input"" id=""check_tl_ktru_tien_bh""");
            BeginWriteAttribute("checked", " checked=\"", 2122, "\"", 2132, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                        <label class=""custom-control-label"" for=""check_tl_ktru_tien_bh"">TL giảm(%)</label>
                                    </div>
                                </th>
                                <th style=""width:125px"">
                                    <div class=""custom-control custom-checkbox"">
                                        <input type=""checkbox"" class=""custom-control-input"" id=""check_dkbs""");
            BeginWriteAttribute("checked", " checked=\"", 2590, "\"", 2600, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                        <label class=""custom-control-label"" for=""check_dkbs"">ĐKBS</label>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id=""tblKhauTru"">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" id=""btnLuuKhauTru"">
                    <i class=""fas fa-save mr-2""></i>Lưu
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-110 float-right"" id=""btnLuuDongKhauTru"">
                    <i class=""fas fa-hdd mr-2""></i>Lưu & đóng
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-1""></i>Đóng
      ");
            WriteLiteral("          </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");
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
