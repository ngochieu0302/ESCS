#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalBaoCao.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c25da718b08cc3cea81f0de44fcd874e29954d5b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalBaoCao), @"mvc.1.0.view", @"/Views/Shared/_ModalBaoCao.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c25da718b08cc3cea81f0de44fcd874e29954d5b", @"/Views/Shared/_ModalBaoCao.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalBaoCao : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "NGAY_MO", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "NGAY_DONG", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "BB", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "TN", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frmBaoCaoChung"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmBaoCaoChung"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalBaoCaoChung"" class=""modal fade"" tabindex=""-1"" data-keyboard=""false"" aria-hidden=""true"">
    <div class=""modal-dialog"">
        <div class=""esmodal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Báo cáo chung</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b6204", async() => {
                WriteLiteral(@"
                    <div class=""row"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label for=""ma_chi_nhanh"" class=""_required"">Biểu mẫu báo cáo</label>
                                <select class=""select2 form-control custom-select"" required name=""mau_bao_cao"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label class=""_required"">Chọn ngày tìm kiếm</label>
                                <select class=""select2 form-control custom-select"" name=""ngay_tkiem"" style=""width:100%"">
                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b7410", async() => {
                    WriteLiteral("Chọn ngày tìm kiếm");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b8681", async() => {
                    WriteLiteral("Tìm theo ngày mở hồ sơ");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_1.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b9956", async() => {
                    WriteLiteral("Tìm theo ngày đóng hồ sơ");
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
                                <label class=""_required"">Từ ngày báo cáo</label>
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control datepicker"" autocomplete=""off""");
                BeginWriteAttribute("required", " required=\"", 2130, "\"", 2141, 0);
                EndWriteAttribute();
                WriteLiteral(@" name=""ngayd"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Tới ngày báo cáo</label>
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control datepicker"" autocomplete=""off""");
                BeginWriteAttribute("required", " required=\"", 2908, "\"", 2919, 0);
                EndWriteAttribute();
                WriteLiteral(@" name=""ngayc"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label>Đối tác</label>
                                <select class=""select2 form-control custom-select"" name=""ma_doi_tac"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"">
                        <div class=");
                WriteLiteral(@"""col-12"">
                            <div class=""form-group"">
                                <label for=""ma_chi_nhanh"">Chi nhánh</label>
                                <select class=""select2 form-control custom-select"" name=""ma_chi_nhanh"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:10px;margin-bottom:10px;"" id=""benh_vien"">
                        <div class=""col-12"">
                            <div class=""input-group"" style=""cursor:pointer"">
                                <input type=""text"" name=""benh_vien"" style=""cursor:pointer;"" onclick=""chonBenhVien(this);"" class=""form-control"" autocomplete=""off"" placeholder=""Click chọn bệnh viện"">
                                <div class=""input-group-append"">
                                    <label class=""input-group-text""");
                BeginWriteAttribute("for", " for=\"", 4903, "\"", 4909, 0);
                EndWriteAttribute();
                WriteLiteral(@">
                                        <a href=""#"" onclick=""xoaChon(this,'BV')"">
                                            <i class=""fas fa-times""></i>
                                        </a>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"">                    
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label for=""san_pham"">Loại hình bảo hiểm</label>
                                <select class=""select2 form-control custom-select"" name=""san_pham"" style=""width: 100%; height:36px;"">
                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b15870", async() => {
                    WriteLiteral("Chọn loại hình");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b17138", async() => {
                    WriteLiteral("Bảo hiểm bắt buộc");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_3.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "c25da718b08cc3cea81f0de44fcd874e29954d5b18409", async() => {
                    WriteLiteral("Bảo hiểm tự nguyện");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_4.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
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
                                <label for=""san_pham"">Trạng thái hồ sơ</label>
                                <select class=""select2 form-control custom-select"" name=""trang_thai"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"" id=""nv_nguoi"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label for=""nhom_nguyen_nhan"">Nguyên nhân điều trị</label>
                                <select class=""select2 form-control custom-select"" name=""nhom_nguyen_nhan"" style=""width:100%"">
                                </select>
                            </div");
                WriteLiteral(@">
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label for=""hinh_thuc_dtri"">Hình thức điều trị</label>
                                <select class=""select2 form-control custom-select"" name=""hinh_thuc_dtri"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top: 5px;"" id=""nv_xe"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label for=""nhom_nguyen_nhan"">Nguyên nhân tai nạn</label>
                                <select class=""select2 form-control custom-select"" name=""nhom_nguyen_nhan"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                        <div clas");
                WriteLiteral(@"s=""col-6"">
                            <div class=""form-group"">
                                <label for=""nhom_nguyen_nhan"">Nguồn khai báo</label>
                                <select class=""select2 form-control custom-select"" name=""nguon"" style=""width:100%"">                                 
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:6px"">
                        <div class=""col-12"" style=""text-align:center; margin-top:10px"">
                            <button type=""button"" class=""btn btn-primary btn-sm wd-120"" id=""btnXuatBaoCaoChung"">
                                <i class=""fa fa-download mr-2""></i>Xuất excel
                            </button>
                        </div>
                    </div>
                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_7.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_7);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral("\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
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
