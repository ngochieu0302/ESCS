#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\CarCompensation\_CarCompensationCategoryAdd.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "2f14a957dc37381a52bdd84f867c8c75ee9fc505"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_CarCompensation__CarCompensationCategoryAdd), @"mvc.1.0.view", @"/Areas/CarClaim/Views/CarCompensation/_CarCompensationCategoryAdd.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2f14a957dc37381a52bdd84f867c8c75ee9fc505", @"/Areas/CarClaim/Views/CarCompensation/_CarCompensationCategoryAdd.cshtml")]
    public class Areas_CarClaim_Views_CarCompensation__CarCompensationCategoryAdd : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalThemHMTTPHU"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-md"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h5 class=""modal-title"">Thêm hạng mục phụ/phụ tùng</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form id=""frmThemHMTTPhu"" method=""post"" name=""frmThemHMTTPhu"">
                    <input type=""hidden"" name=""ma_doi_tac""");
            BeginWriteAttribute("value", " value=\"", 659, "\"", 667, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"so_id\"");
            BeginWriteAttribute("value", " value=\"", 726, "\"", 734, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"gara\"");
            BeginWriteAttribute("value", " value=\"", 792, "\"", 800, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Hạng mục, phụ tùng phụ</label>
                                <div class=""input-group"">
                                    <select class=""select2 form-control custom-select"" required name=""hang_muc"" style=""width:100%"">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Chi phí do bồi thường viên tính toán</label>
                                <div class=""input-group"">
                                    <input type=""text"" autocomplete=""off"" required placeholder=""Chi phí do bồi thường viên tính toán"" class=""form-control number"" name=""tien_gd"">
   ");
            WriteLiteral(@"                             </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label>Ghi chú</label>
                                <div class=""input-group"">
                                    <textarea maxlength=""500"" rows=""5"" autocomplete=""off"" placeholder=""Ghi chú"" class=""form-control"" name=""ghi_chu""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 mg-t-22"" id=""btnLuuHMTTPhu""><i class=""fas fa-plus-square""></i>&nbsp;&nbsp;Lưu</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd");
            WriteLiteral(@"-85 mg-t-22"" id=""btnLuuDongHMTTPhu""><i class=""fas fa-plus-square""></i>&nbsp;&nbsp;Lưu & đóng</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 mg-t-22"" data-dismiss=""modal"" id=""CarCompensationCarCategoryAdd_close""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
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
