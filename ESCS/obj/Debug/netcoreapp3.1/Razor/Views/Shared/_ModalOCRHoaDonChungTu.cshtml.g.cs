#pragma checksum "D:\ESCS\ESCS\Views\Shared\_ModalOCRHoaDonChungTu.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f61833be8346482646c866b92916116cfe451c06"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__ModalOCRHoaDonChungTu), @"mvc.1.0.view", @"/Views/Shared/_ModalOCRHoaDonChungTu.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f61833be8346482646c866b92916116cfe451c06", @"/Views/Shared/_ModalOCRHoaDonChungTu.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"dcf4208752dabc5d55038aad5a6dc25ac2b53d32", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__ModalOCRHoaDonChungTu : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("name", new global::Microsoft.AspNetCore.Html.HtmlString("frmOCRHoaDonChungTu"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("method", "post", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
            WriteLiteral(@"<style>
    #dsAnhHoaDonChungTu img:hover {
        border: 2px solid #009efb;
    }

    #dsAnhHoaDonChungTu input {
        color: white !important;
        position: absolute !important;
        z-index: 9;
        opacity: 1;
        width: 16px;
        height: 16px;
        margin-left: 3px !important;
    }
    #modalOCRHoaDonChungTu .table td {
        padding: 0.3rem !important;
    }
    #modalOCRHoaDonChungTu .table th {
        padding: 0.3rem !important;
    }
</style>
<!-- Modal thông tin bao gia -->
<div id=""modalOCRHoaDonChungTu"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;width:70%;top: 2%; left: 15%;"">
    <div class=""modal-dialog "" style=""width:100%;max-width:unset"">
        <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
            <div class=""modal-header py-1 px-2"" style=""background-color:#0069d9; cursor:pointer;borde");
            WriteLiteral(@"r:unset;"">
                <h6 class=""modal-title"" style=""color:#fff"">Thông tin OCR hóa đơn, chứng từ</h6>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body py-1 px-2"">
                <div class=""row"">
                    <div class=""col-9 pr-0"">
                        <div class=""card m-0"">
                            <div class=""card-body p-0"">
                                <div class=""border rounded p-2"" style=""height:75vh;"">
                                    ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("form", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f61833be8346482646c866b92916116cfe451c065521", async() => {
                WriteLiteral(@"
                                        <div class=""row"">
                                            <div class=""col-12"">
                                                <div class=""table-responsive"" style=""max-height: 73.5vh;"">
                                                    <table class=""table"">
                                                        <thead>
                                                            <tr>
                                                                <td style=""color: #000; font-weight: bold; vertical-align: middle; text-align:center;"">Hóa đơn</td>
                                                                <td colspan=""4"">
                                                                    <select class=""form-control custom-select select2"" style=""width:100%;"" name=""hoa_don""></select>
                                                                </td>
                                                            </tr>
                                 ");
                WriteLiteral(@"                           <tr class=""text-center"">
                                                                <th style=""width: 70px;"">
                                                                    <div class=""custom-control custom-checkbox"">
                                                                        <input type=""checkbox"" onchange=""onChonHoaDonTatCaOCR(this)"" id=""hoa_don_item_tat_ca"" class=""custom-control-input"">
                                                                        <label class=""custom-control-label"" for=""hoa_don_item_tat_ca"">&nbsp;</label>
                                                                    </div>
                                                                </th>
                                                                <th style=""width: 135px;"">TÊN</th>
                                                                <th style=""width: 271px;"">THÔNG TIN OCR</th>
                                                                <th st");
                WriteLiteral(@"yle=""width: 20px;""></th>
                                                                <th style=""width: 271px;"">THÔNG TIN HÓA ĐƠN</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id=""modalCompareDataOCRHoaDonChungTu"">
                                                        </tbody>
                                                    </table>
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
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-3"">
                        <div class=""card m-0"">
                            <div class=""card-body p-0"">
                                <div class=""border rounded"">
                                    <div class=""justify-content-between align-items-center p-2 card-title-bg border-bottom"">
                                        <p class=""m-0 font-weight-bold text-center"">
                                            DANH SÁCH HÓA ĐƠN
                                        </p>
                                    </div>
                                    <div class=""container-fluid scrollable p-0"" id=""dsAnhHoaDonChungTu"" style=""height: 523px;"">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  ");
            WriteLiteral(@"              </div>
            </div>
            <div class=""modal-footer px-1"" style=""display:block"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-140 float-right"" id=""btnDocOCRHoaDonChungTu"">
                    <i class=""fas fa-qrcode mr-2""></i>Đọc OCR
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-140 float-right"" onclick=""sdOCRHoaDon(this)"">
                    <i class=""fas fa-save mr-2""></i>Sử dụng dữ liệu OCR
                </button>
            </div>
        </div>
    </div>
</div>

<div class=""custom-modal"">
    <div id=""modalXemHinhAnhHoaDonCTiet"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;width:1000px;top: 5%; lef");
            WriteLiteral(@"t: 18%;"">
        <div class=""modal-dialog modal-lg"" style=""width:90%;max-width:unset"">
            <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
                <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
                    <h6 class=""modal-title"" style=""color:#fff"">Hình ảnh chi tiết</h6>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-9 modal-hien-thi"">
                            <div class=""card mb-0"">
                                <div class=""card-body p-0"" style=""height: 65vh; text-align:center"">
                                    <div id=""img-hang-muc-hoadon"" style=""height: 65vh;""></div>
                                </div>
                            </div>
               ");
            WriteLiteral(@"         </div>
                        <div class=""col-3"" id=""accordion"">
                            <div class=""card mb-1"">
                                <div class=""card-header p-2"" style=""border:none"">
                                    <input type=""text"" placeholder=""Tìm kiếm theo hạng mục"" class=""form-control inputSearchHangMucHoaDon"" readonly>
                                </div>
                                <div");
            BeginWriteAttribute("class", " class=\"", 7922, "\"", 7930, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                    <div class=""card-body p-1"">
                                        <div style=""width:100%; vertical-align:middle;max-height: 65vh;"" class=""scrollable"">
                                            <div style=""width:100%"" id=""dsHinhAnhHangMucHoaDonCTiet"" class=""list-pictures-hoadon"">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

");
            WriteLiteral(@"<script type=""text/html"" id=""dsHinhAnhHangMucHoaDonTemplate"">
    <% if(danh_sach.length > 0){ %>
    <% _.forEach(danh_sach, function(item,index) { %>
    <div class=""imagesCategory"" style=""display: table-row"" data-search=""<%- ESUtil.xoaKhoangTrangText(item.nhom) %>"">
        <p style=""margin-bottom:5px;"">
            <a href=""#""><%- item.nhom %></a>
        </p>
        <% _.forEach(item.children, function(image,index_anh) { %>
        <div style=""width:60px; height:60px; margin-right:10px; margin-bottom:5px; cursor:pointer;float:left;"">
            <img style=""width: 100%; height:100%; border-radius:10px"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-ngay=""<%- image.ngay %>"" data-nsd=""<%- image.nsd%>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""data:image/png;base64, <%- image.duong_dan %>"" alt=""<%- image.ten_file %>"">
        </div>
        <% }) ");
            WriteLiteral("%>\r\n    </div>\r\n    <% })} %>\r\n</script>\r\n<script type=\"text/html\" id=\"modalCompareDataOCRHoaDonChungTuTemplate\">\r\n    <%");
            BeginWriteAttribute("if(data!", " if(data!=", 9808, "", 9818, 0);
            EndWriteAttribute();
            WriteLiteral(@"=undefined && data!==null && data.length > 0){
    _.forEach(data, function(item,index) {
    %>
    <tr class=""row_item"">
        <td class=""text-center"">
            <div class=""custom-control custom-checkbox"">
                <input type=""checkbox"" onchange=""onChonHoaDonOCR(this,'<%- item.loai%>')"" id=""ocr_<%- item.loai%>"" class=""custom-control-input hoa_don_item"">
                <label class=""custom-control-label"" for=""ocr_<%- item.loai%>"">&nbsp;</label>
            </div>
        </td>
        <td>
            <%- item.noi_dung_so_sanh %>
            <input type=""hidden"" data-field=""nd_ocr"" value=""<%- item.nd_ocr %>"" />
            <input type=""hidden"" data-field=""loai"" value=""<%- item.loai %>"" />
        </td>
        <td class=""text-center""><%- item.nd_ocr %></td>
        <td class=""text-center""><% if(item.so_sanh) { %> <i class=""fas fa-check text-success""></i> <%} else { %><i class=""fas fa-times text-danger""></i> <%}%></td>
        <td class=""text-center""><%- item.nd_goc %></td>
   ");
            WriteLiteral(@" </tr>
    <% })}else{ %>
    <tr style=""cursor: pointer;"">
        <td colspan=""5"" class=""text-center"">Chưa có dữ liệu</td>
    </tr>
    <% } %>
</script>

<script type=""text/html"" id=""dsAnhHoaDonChungTu_template"">
    <% if(danh_sach.length > 0){ %>
    <% _.forEach(danh_sach, function(item,index) { %>
    <div style=""display: inline-block;width:100%;"">
        <p style=""font-weight: bold;"" class=""pl-3 pt-2 mb-0"">
            <a href=""#"" onclick=""onToggleImgOCR(this, '<%- index %>')""><%- ESUtil.rutGonText(85, item.nhom) %></a>
        </p>
        <ul class=""docs-pictures clearfix px-2"">
            <% _.forEach(item.children, function(image,index_anh) { %>
            <li class=""p-1"">
                <input type=""checkbox"" onclick=""layChiTietHoaDonChungTu('<%- image.ma_doi_tac %>', '<%- image.so_id %>','<%- image.ma_file %>', '<%- image.bt %>')"" id=""img_<%- image.so_id%>_<%- image.bt %>"" class=""nhom_anh_ocr_<%- index %> mt-1 images-ocr"" value=""<%- image.bt%>"" data-ma-file=""<%- image.ma_f");
            WriteLiteral(@"ile %>"" name=""ds_hoa_don_ocr"">
                <p class=""fileNameImageBaoGia mt-1"" style=""cursor:pointer""><%- image.ten_file %></p>
                <% if(_.includes(["".jpg"", "".png"", "".gif"","".jpeg""], image.extension)){ %>
                <img onclick=""openModalXemHinhAnhHoaDonCTiet('<%- image.ten_file %>','<%- image.bt %>','<%- image.extension %>')"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-ngay=""<%- image.ngay %>"" data-nsd=""<%- image.nsd%>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""data:image/png;base64, <%- image.duong_dan %>"" alt=""<%- image.ten_file %>"">
                <% }else if(_.includes(["".pdf"", "".doc"", "".docx""], image.extension)){ %>
                <img onclick=""openModalXemHinhAnhHoaDonCTiet('<%- image.ten_file %>','<%- image.bt %>','<%- image.extension %>')"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-id=""");
            WriteLiteral(@"<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/pdf-image.png"" alt=""<%- image.ten_file %>"">
                <% } else if(_.includes(["".xml""], image.extension)){%>
                <img onclick=""openModalXemHinhAnhHoaDonCTiet('<%- image.ten_file %>','<%- image.bt %>','<%- image.extension %>')"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/xml.png"" alt=""<%- image.ten_file %>"">
                <% } else if(_.includes(["".xlsx"", "".xls""], image.extension)){%>
                <img onclick=""openModalXemHinhAnhHoaDonCTiet('<%- image.ten_file %>','<%- image.bt %>','<%- image.extension %>')"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt");
            WriteLiteral(@" %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""/images/excel-logo.jpg"" alt=""<%- image.ten_file %>"">
                <% } %>
            </li>
            <% }) %>
        </ul>
    </div>
    <% })} %>
</script>
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