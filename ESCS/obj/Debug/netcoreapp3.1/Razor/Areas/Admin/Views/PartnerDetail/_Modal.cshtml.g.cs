#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\PartnerDetail\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "cc4a9c9eba5eaf1dd0174fd918b3f0d6b1527f4a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_PartnerDetail__Modal), @"mvc.1.0.view", @"/Areas/Admin/Views/PartnerDetail/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"cc4a9c9eba5eaf1dd0174fd918b3f0d6b1527f4a", @"/Areas/Admin/Views/PartnerDetail/_Modal.cshtml")]
    public class Areas_Admin_Views_PartnerDetail__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frmThemCauHinh"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmThemCauHinh"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("novalidate", new global::Microsoft.AspNetCore.Html.HtmlString("novalidate"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<div id=""modalThemCauHinh"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"">
    <div class=""modal-dialog modal-lg"" style=""max-width:1100px"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">C???u h??nh ?????i t??c x??? l?? h??? s??</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">??</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cc4a9c9eba5eaf1dd0174fd918b3f0d6b1527f4a4656", async() => {
                WriteLiteral("\r\n                    <input type=\"hidden\" name=\"bt\"");
                BeginWriteAttribute("value", " value=\"", 714, "\"", 722, 0);
                EndWriteAttribute();
                WriteLiteral(" />\r\n                    <div class=\"row\">\r\n                        <div class=\"col-sm-4\">\r\n                            <div class=\"form-group\">\r\n                                <label");
                BeginWriteAttribute("class", " class=\"", 907, "\"", 915, 0);
                EndWriteAttribute();
                WriteLiteral(">?????i t??c qu???n l?? ????n</label>\r\n                                <select class=\"select2 form-control custom-select\"");
                BeginWriteAttribute("required", " required=\"", 1028, "\"", 1039, 0);
                EndWriteAttribute();
                WriteLiteral(@" name=""ma_doi_tac_ql"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Ng??y ??p d???ng</label>
                                <div class=""input-group"">
                                    <input type=""text"" autocomplete=""off""");
                BeginWriteAttribute("required", " required=\"", 1489, "\"", 1500, 0);
                EndWriteAttribute();
                WriteLiteral(@" class=""form-control datepicker tu_ngay"" name=""tu_ngay"" display-format=""date"" value-format=""number"" placeholder=""mm/dd/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
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
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper.Method = (string)__tagHelperAttribute_1.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                <div class=""row mt-2"">
                    <div class=""col-12"">
                        <ul class=""nav nav-pills font-weight-bold"" role=""tablist"" style=""background-color:#f8f9fa"">
                            <li class=""nav-item"">
                                <a class=""nav-link active"" id=""xe-tab"" data-toggle=""tab"" href=""#xe_co_gioi"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                                    Nghi???p v??? xe c?? gi???i
                                </a>
                            </li>
                            <li class=""nav-item"">
                                <a class=""nav-link"" id=""nguoi-tab"" data-toggle=""tab"" href=""#con_nguoi"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                                    Nghi???p v??? con ng?????i
                                </a>
                            </li>
                        </ul>
                        <div class=""tab-content"" style=""padding-top: 10px"">
                           ");
            WriteLiteral(@" <div id=""xe_co_gioi"" class=""tab-pane fade show active data-scroll"" role=""tabpanel"" aria-labelledby=""xe-tab"">
                                <div class=""table-responsive"" style=""max-height: 315px"">
                                    <table id=""tblCauHinhXe"" class=""table table-bordered fixed-header"">
                                        <thead class=""font-weight-bold"">
                                            <tr class=""text-center uppercase"">
                                                <th width=""4%"">STT</th>
                                                <th width=""24%"">????n v??? qu???n l??</th>
                                                <th style=""width:24%"">
                                                    <div class=""custom-control custom-checkbox"">
                                                        <input type=""checkbox"" id=""chon_tat_ca_dvgd"" class=""custom-control-input"">
                                                        <label class=""custom-control-label"" for=""chon_ta");
            WriteLiteral(@"t_ca_dvgd""><b style=""font-weight:bold"">????n v??? gi??m ?????nh trung t??m</b></label>
                                                    </div>
                                                </th>
                                                <th style=""width:24%"">
                                                    <div class=""custom-control custom-checkbox"">
                                                        <input type=""checkbox"" id=""chon_tat_ca_dvbt"" class=""custom-control-input"">
                                                        <label class=""custom-control-label"" for=""chon_tat_ca_dvbt""><b style=""font-weight:bold"">????n v??? b???i th?????ng</b></label>
                                                    </div>
                                                </th>
                                                <th style=""width:24%"">
                                                    <div class=""custom-control custom-checkbox"">
                                                        <input type=""");
            WriteLiteral(@"checkbox"" id=""chon_tat_ca_dvtt"" class=""custom-control-input"">
                                                        <label class=""custom-control-label"" for=""chon_tat_ca_dvtt""><b style=""font-weight:bold"">????n v??? thanh to??n</b></label>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id=""modalThemCauHinhXe""></tbody>
                                    </table>
                                </div>
                            </div>
                            <div class=""tab-pane fade data-scroll"" id=""con_nguoi"" role=""tabpanel"" aria-labelledby=""nguoi-tab"">
                                <div class=""table-responsive"" style=""max-height: 315px"">
                                    <table id=""tblCauHinhNg"" class=""table table-bordered fixed-header"">
                                        <thea");
            WriteLiteral(@"d class=""font-weight-bold"">
                                            <tr class=""text-center uppercase"">
                                                <th width=""4%"">STT</th>
                                                <th width=""32%"">????n v??? qu???n l??</th>
");
            WriteLiteral(@"                                                <th style=""width:32%"">
                                                    <div class=""custom-control custom-checkbox"">
                                                        <input type=""checkbox"" id=""chon_tat_ca_dvbt_ng"" class=""custom-control-input"">
                                                        <label class=""custom-control-label"" for=""chon_tat_ca_dvbt_ng""><b style=""font-weight:bold"">????n v??? b???i th?????ng</b></label>
                                                    </div>
                                                </th>
                                                <th style=""width:32%"">
                                                    <div class=""custom-control custom-checkbox"">
                                                        <input type=""checkbox"" id=""chon_tat_ca_dvtt_ng"" class=""custom-control-input"">
                                                        <label class=""custom-control-label"" for=""chon_tat_ca_dvtt_ng""><b s");
            WriteLiteral(@"tyle=""font-weight:bold"">????n v??? thanh to??n</b></label>
                                                    </div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody id=""modalThemCauHinhNg""></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"" style=""display: block;"">
                <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80 float-left"" id=""btnXoaCauHinh""><i class=""fas fa-trash-alt""></i> X??a</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> ????ng</button>
                <button type=""button"" class=""btn btn-primary bt");
            WriteLiteral(@"n-sm wd-90 float-right"" id=""btnLuuCauHinh""><i class=""fa fa-save""></i> L??u</button>
            </div>
        </div>
    </div>
</div>

<div id=""modalChonMaChiNhanh"" class=""modal-drag"" style=""width:400px; z-index:9999999;"">
    <div class=""modal-drag-header px-2 border-bottom"">
        <h5><span class=""modal-drag-title"">Ch???n chi nh??nh</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" placeholder=""T??m ki???m th??ng tin"" class=""form-control"" id=""modalChonMaChiNhanhElementSearch"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:230px;"" id=""modalChonMaChiNhanhDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnChonMaChiNhanh"">
            <i class=""fas ");
            WriteLiteral("fa-mouse-pointer mr-2\"></i> Ch???n\r\n        </button>\r\n    </div>\r\n</div>\r\n");
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
