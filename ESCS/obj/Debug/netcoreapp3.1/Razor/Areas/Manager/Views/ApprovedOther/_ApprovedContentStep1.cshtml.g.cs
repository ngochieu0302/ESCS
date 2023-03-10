#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\ApprovedOther\_ApprovedContentStep1.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "72d5854e6fa29cb9ae4398c2bda6c3913fb0d1aa"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_ApprovedOther__ApprovedContentStep1), @"mvc.1.0.view", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep1.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"72d5854e6fa29cb9ae4398c2bda6c3913fb0d1aa", @"/Areas/Manager/Views/ApprovedOther/_ApprovedContentStep1.cshtml")]
    public class Areas_Manager_Views_ApprovedOther__ApprovedContentStep1 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    iframe {
        display: block;
        margin: 20px auto;
    }
</style>
<div class=""row mg-t-10"" style=""height:79vh"">
    <div class=""col-12"">
        <div class=""row"">
            <div class=""col-7"">
                <div class=""scrollable"" id=""modalViewFileContent"">
                    <div id=""viewHtml"" class=""text-center mx-auto"">
                    </div>
                </div>
            </div>

            <div class=""col-5"">
                <div class=""card"" style=""margin-bottom:0 !important"">
                    <div class=""card-body p-0"">
                        <div class=""border mb-3 rounded"">
                            <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                                <h5 class=""m-0"">Danh s??ch tr??nh duy???t</h5>
                            </div>
                            <table class=""table table-hover"" id=""tblDanhSachTrinhDuyet"">
                                <thead>
                     ");
            WriteLiteral(@"               <tr>
                                        <th class=""text-center"">C??n b??? duy???t</th>
                                        <th class=""text-center"">Tr???ng th??i</th>
                                        <th class=""text-center"">Duy???t</th>
                                        <th class=""text-center"">Ng??y duy???t</th>
                                    </tr>
                                </thead>
                                <tbody id=""tblStep1_lstrinh_tbody"" class=""scrollable"" style=""max-height:400px;"">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <form id=""_frmPheDuyet_tab1"" name=""_frmPheDuyet_tab1"" novalidate=""novalidate"" method=""post"">
                    <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 1894, "\"", 1902, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"ma_doi_tac\"");
            BeginWriteAttribute("value", " value=\"", 1966, "\"", 1974, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"ma_doi_tac_xl\"");
            BeginWriteAttribute("value", " value=\"", 2041, "\"", 2049, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"bt\"");
            BeginWriteAttribute("value", " value=\"", 2105, "\"", 2113, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"nv\"");
            BeginWriteAttribute("value", " value=\"", 2169, "\"", 2177, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                    <input type=\"hidden\" name=\"loai\"");
            BeginWriteAttribute("value", " value=\"", 2235, "\"", 2243, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""form-group"">
                        <label>?? ki???n duy???t c??n b??? kh??c</label>
                        <textarea class=""form-control"" disabled=""disabled"" rows=""4"" cols=""50"" id=""y_kien_nguoi_duyet_khac"" placeholder=""Ch???n ng?????i duy???t ????? xem n???i dung duy???t""></textarea>
                    </div>
                    <div class=""form-group"">
                        <label>N???i dung c???a c??n b??? tr??nh</label>
                        <textarea class=""form-control"" disabled=""disabled"" rows=""4"" cols=""50"" name=""noi_dung"" placeholder=""N???i dung tr??nh""></textarea>
                    </div>
                    <div class=""form-group"">
                        <label style=""color:red"">?? ki???n duy???t c???a b???n</label>
                        <textarea class=""form-control"" rows=""6"" cols=""50"" name=""noi_dung_duyet"" placeholder=""?? ki???n duy???t""></textarea>
                    </div>
                </form>

                <div class=""modal-footer"">
                    <button type=""butto");
            WriteLiteral(@"n"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" id=""btnDongY"">
                        <i class=""fas fa-plus-square mr-2""></i>Duy???t
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-130 mg-t-22"" id=""btnHuyDongY"">
                        <i class=""fas fa-plus-square mr-2""></i>&nbsp;&nbsp;H???y Duy???t
                    </button>
                    <button type=""button"" class=""btn-outline-primary btn-sm wd-90 mg-t-22"" id=""btnDong1"" data-dismiss=""esmodal"">
                        <i class=""fas fa-window-close mr-2""></i>????ng
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
