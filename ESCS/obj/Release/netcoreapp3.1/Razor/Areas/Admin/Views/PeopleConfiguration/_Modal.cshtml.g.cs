#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\PeopleConfiguration\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "8545f0b68f26a0417043329e596a7641cea3877f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_PeopleConfiguration__Modal), @"mvc.1.0.view", @"/Areas/Admin/Views/PeopleConfiguration/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8545f0b68f26a0417043329e596a7641cea3877f", @"/Areas/Admin/Views/PeopleConfiguration/_Modal.cshtml")]
    public class Areas_Admin_Views_PeopleConfiguration__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmThemCauHinhConNguoi"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("novalidate", new global::Microsoft.AspNetCore.Html.HtmlString("novalidate"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "BLVP", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "TNTT", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "TN_MOBILE", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("frmCauHinhSLA"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmCauHinhSLA"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral("\r\n");
            WriteLiteral(@"<div id=""modalThemCauHinhBoiThuongConNguoi"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"">
    <div class=""modal-dialog modal-lg"" style=""max-width:65%"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Cấu hình bồi thường</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <div class=""row"">
                    <div class=""col-3"" style=""margin-top: 10px;"">
                        <div class=""card"">
                            <div class=""card-body p-0"">
                                <div class=""border rounded"">
                                    <div class=""justify-content-between align-items-center p-2 card-title-bg"">
                                        <h5 class=""m-0 text-center"">Các ngày khai báo</h5>
                                    </div>
");
            WriteLiteral(@"                                    <table class=""table table-hover"" id=""tblDsNgayCauHinhBoiThuongConNguoi"" style=""border-bottom:1px solid #e8eef3;"">
                                        <tbody id=""tblDsNgayCHBTConNguoi"">
                                        </tbody>
                                    </table>
                                    <div class=""pt-3 text-center"" id=""divThemMoiNgayCHBTConNguoi"">
                                        <button type=""button"" class=""btn btn-primary btn-sm"" style=""width:100%"" id=""btnOpenInputThemNgayCHBTConNguoi""><i class=""fa fa-plus""></i> Thêm mới</button>
                                    </div>
                                    <div class=""pt-3"" id=""divInputThemNgayCHBTConNguoi"">
                                        <div class=""form-group"">
                                            <div class=""input-group"">
                                                <input type=""text"" id=""ngayad_bt"" class=""form-control datepicker"" autocomplete=""off"" d");
            WriteLiteral(@"isplay-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"" style=""width:100%"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text"" style=""padding: 0.1em 0.3em !important;""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                            <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnThemNgayCHBTConNguoi"" style=""margin-top:5px; width:49%"">
                                                <i class=""fa fa-save mr-2""></i>Lưu
                                            </button>
                                            <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnDongNgayCHBTConNguoi"" style=""margin-top: 5px; width: 49%"">
                                                <i class=""fas fa-window-close mr-2""></i>Đóng
                    ");
            WriteLiteral(@"                        </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-9"">
                        <div class=""tab-content"" style=""padding-top: 10px"">
                            <div class=""tab-pane fade show active data-scroll"" role=""tabpanel"" aria-labelledby=""xe-tab"">
                                <div class=""table-responsive"" style=""max-height: 415px"">
                                    <table id=""tblCauHinhBoiThuongConNguoi"" class=""table table-bordered fixed-header"">
                                        <thead class=""font-weight-bold"">
                                            <tr class=""text-center uppercase"">
                                                <th style=""width:22%"">Màn hình</th>
                                                <th>Mã</th>
           ");
            WriteLiteral(@"                                     <th style=""width:100px"">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody id=""modalCauHinhBoiThuongConNguoi"">
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"" style=""display:block"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnLuuCauHinhBoiThuongConNguoi"">
                    <i class=""fa fa-save mr-2""></i>Lưu
                </button>
            ");
            WriteLiteral(@"    <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80"" id=""btnXoaCauHinhBoiThuongConNguoi"">
                    <i class=""fas fa-trash-alt""></i>&nbsp;&nbsp;Xóa
                </button>
            </div>
        </div>
    </div>
</div>

");
            WriteLiteral(@"<div id=""modalCauHinhChungConNguoi"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"">
    <div class=""modal-dialog modal-lg"" style=""max-width:60%"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Cấu hình chung con người</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f12146", async() => {
                WriteLiteral("\r\n                    <input type=\"hidden\" name=\"ngay_ad\"");
                BeginWriteAttribute("value", " value=\"", 6155, "\"", 6163, 0);
                EndWriteAttribute();
                WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Đối tác</label>
                                <select class=""select2 form-control custom-select""");
                BeginWriteAttribute("required", " required=\"", 6466, "\"", 6477, 0);
                EndWriteAttribute();
                WriteLiteral(" name=\"ma_doi_tac\" style=\"width: 100%; height:36px;\"></select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                ");
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
                <div class=""row"">
                    <div class=""col-4"" style=""margin-top: 10px;"">
                        <div class=""card"">
                            <div class=""card-body p-0"">
                                <div class=""rounded"">
                                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                                        <h5 class=""m-0"">Các ngày khai báo</h5>
                                    </div>
                                    <table class=""table table-hover"" id=""tblDsNgayCauHinhConNguoi"" style=""border-bottom:1px solid #e8eef3;"">
                                        <thead>
                                            <tr>
                                                <th class=""text-center"">Ngày khai báo</th>
                                            </tr>
                                        </thead>
                                        <tbody class=""text-center""></tbody>
          ");
            WriteLiteral(@"                          </table>
                                    <div class=""pt-3 text-center"" id=""divThemMoiNgayCHConNguoi"">
                                        <button type=""button"" class=""btn btn-primary btn-sm"" style=""width:100%"" id=""btnOpenInputThemNgayCH""><i class=""fa fa-plus""></i> Thêm mới</button>
                                    </div>
                                    <div class=""pt-3"" id=""divInputThemNgayCHConNguoi"">
                                        <div class=""form-group"">
                                            <div class=""input-group"">
                                                <input type=""text"" id=""ngayad_ch"" class=""form-control datepicker"" autocomplete=""off"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"" style=""width:100%"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text"" style=""padding: 0.1em 0.3em !important;""><span ");
            WriteLiteral(@"class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                            <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnThemNgayCHConNguoi"" style=""margin-top:5px; width:49%"">
                                                <i class=""fa fa-save mr-2""></i>Lưu
                                            </button>
                                            <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnDongNgayCHConNguoi"" style=""margin-top: 5px; width: 49%"">
                                                <i class=""fas fa-window-close mr-2""></i>Đóng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-8"">
 ");
            WriteLiteral(@"                       <div class=""tab-content"" style=""padding-top: 10px"">
                            <div class=""tab-pane fade show active data-scroll"" role=""tabpanel"" aria-labelledby=""xe-tab"">
                                <div class=""table-responsive"" style=""max-height: 405px"">
                                    <table id=""tblCauHinhConNguoi"" class=""table table-bordered fixed-header"">
                                        <thead class=""font-weight-bold"">
                                            <tr class=""text-center uppercase"">
                                                <th width=""75%"">Cấu hình</th>
                                                <th style=""width:25%"">Trạng thái</th>
                                            </tr>
                                        </thead>
                                        <tbody id=""modalCauHinhConNguoi"">
                                        </tbody>
                                    </table>
                                <");
            WriteLiteral(@"/div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"" style=""display:block"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnLuuCauHinhConNguoi"">
                    <i class=""fa fa-save mr-2""></i>Lưu
                </button>
                <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80"" id=""btnXoaCauHinhConNguoi"">
                    <i class=""fas fa-trash-alt""></i>&nbsp;&nbsp;Xóa
                </button>
            </div>
        </div>
    </div>
</div>

");
            WriteLiteral(@"<div id=""modalCauHinhSLA"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"">
    <div class=""modal-dialog modal-lg"" style=""max-width: 75%; margin-bottom:unset; margin-top:10px;"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Cấu hình SLA</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f20472", async() => {
                WriteLiteral(@"
                    <div class=""row"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Đối tác</label>
                                <select class=""select2 form-control custom-select"" required name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Nguồn</label>
                                <select class=""select2 form-control custom-select"" required name=""nguon"" style=""width: 100%; height:36px;"">
                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f21545", async() => {
                    WriteLiteral("Chọn nguồn");
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
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f22809", async() => {
                    WriteLiteral("Bảo lãnh viện phí");
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
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f24080", async() => {
                    WriteLiteral("Tiếp nhận trực tiếp");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_5.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                    ");
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "8545f0b68f26a0417043329e596a7641cea3877f25353", async() => {
                    WriteLiteral("Tiếp nhận mobile");
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_6.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_6);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                WriteLiteral("\r\n                                </select>\r\n                            </div>\r\n                        </div>\r\n                    </div>\r\n                ");
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.FormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_FormTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.RenderAtEndOfFormTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_RenderAtEndOfFormTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_7);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
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
                <div class=""row mt-2"">
                    <div class=""col-2"" style=""padding-right: 0;"">
                        <div class=""card"" style=""margin-bottom:unset;"">
                            <div class=""card-body p-0"">
                                <div class=""border rounded"">
                                    <div class=""justify-content-between align-items-center p-2 card-title-bg"">
                                        <h6 class=""m-0 text-center"">Ngày áp dụng</h6>
                                    </div>
                                    <table class=""table table-hover"" id=""tblDsNgayCauHinhSLA"" style=""border-bottom:1px solid #e8eef3;"">
                                        <tbody id=""tblDsNgayCauHinhSLA"">
                                        </tbody>
                                    </table>
                                    <div class=""pt-3 text-center"" id=""divThemMoiNgayCHSLA"">
                                        <button type=""button"" class=""btn btn-pri");
            WriteLiteral(@"mary btn-sm"" style=""width:100%"" id=""btnOpenInputThemNgayCHSLA""><i class=""fa fa-plus""></i> Thêm mới</button>
                                    </div>
                                    <div class=""pt-3"" id=""divInputThemNgayCHSLA"">
                                        <div class=""form-group"">
                                            <div class=""input-group"">
                                                <input type=""text"" id=""ngayad_sla"" class=""form-control datepicker"" autocomplete=""off"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"" style=""width:100%"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text"" style=""padding: 0.1em 0.3em !important;""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                            <button type=""button"" class");
            WriteLiteral(@"=""btn btn-primary btn-sm"" id=""btnThemNgayCHSLA"" style=""margin-top:5px; width:48%"">
                                                <i class=""fa fa-save mr-2""></i>Lưu
                                            </button>
                                            <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnDongNgayCHSLA"" style=""margin-top: 5px; width: 49%"">
                                                <i class=""fas fa-window-close mr-2""></i>Đóng
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-10"">
                        <div class=""table-responsive"" style=""max-height: 410px;"">
                            <table id=""tblThongTinCauHinhSLA"" class=""table table-bordered fixed-header"">
                                <the");
            WriteLiteral(@"ad class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width: 45px"">STT</th>
                                        <th style=""width: 26%"">Bước thực hiện</th>
                                        <th>Tiền từ (VNĐ)</th>
                                        <th>Tiền tới (VNĐ)</th>
                                        <th style=""width: 14%"">Thời gian SLA theo quy trình (phút)</th>
                                        <th style=""width: 14%"">Thời gian sắp đến hạn SLA (phút)</th>
                                        <th>Thời gian hành chính</th>
                                        <th style=""width: 60px""></th>
                                    </tr>
                                </thead>
                                <tbody id=""tblCauHinhSLA"" class=""tblCauHinhSLA"">
                                </tbody>
                            </table>
                        </div>
       ");
            WriteLiteral(@"             </div>
                </div>
                <div class=""modal-footer"" style=""display: block; padding: 10px 0px 0px;"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal"">
                        <i class=""fas fa-window-close mr-2""></i>Đóng
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnLuuCauHinhSLA"">
                        <i class=""fa fa-save mr-2""></i>Lưu
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
