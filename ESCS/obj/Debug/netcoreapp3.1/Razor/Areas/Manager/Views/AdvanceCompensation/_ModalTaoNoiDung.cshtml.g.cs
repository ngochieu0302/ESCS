#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\AdvanceCompensation\_ModalTaoNoiDung.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "b5f35d66d54d74745a2d836fb47dd306123367bb"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_AdvanceCompensation__ModalTaoNoiDung), @"mvc.1.0.view", @"/Areas/Manager/Views/AdvanceCompensation/_ModalTaoNoiDung.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"b5f35d66d54d74745a2d836fb47dd306123367bb", @"/Areas/Manager/Views/AdvanceCompensation/_ModalTaoNoiDung.cshtml")]
    public class Areas_Manager_Views_AdvanceCompensation__ModalTaoNoiDung : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalTaoNoiDung"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-md"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thông tin nội dung</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <div id=""modalTaoNoiDungFormNhap"">
                    <form id=""frmTaoNoiDung"" name=""frmTaoNoiDung"" method=""post"">
                        <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 703, "\"", 711, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"pm\"");
            BeginWriteAttribute("value", " value=\"", 771, "\"", 779, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"nv_ct\"");
            BeginWriteAttribute("value", " value=\"", 842, "\"", 850, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""row"">
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Đối tác</label>
                                    <select class=""form-control select2"" style=""width:100%"" required name=""ma_doi_tac""></select>
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Nghiệp vụ</label>
                                    <select class=""select2 form-control custom-select"" name=""nv"" required style=""width: 100%; height:36px;"">
                                        <option");
            BeginWriteAttribute("value", " value=\"", 1666, "\"", 1674, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nghiệp vụ</option>
                                        <option value=""XE"">Xe ô tô</option>
                                        <option value=""NG"">Con người</option>
                                    </select>
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Bước</label>
                                    <select class=""select2 form-control custom-select"" name=""pm"" required style=""width: 100%; height:36px;""></select>
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Nghiệp vụ chi tiết</label>
                                    <select class=""select2 form-control custom-select"" name=""nv_ct"" required style");
            WriteLiteral(@"=""width: 100%; height:36px;""></select>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label class=""_required"">Nội dung</label>
                                    <textarea class=""form-control"" autocomplete=""off"" name=""noi_dung""");
            BeginWriteAttribute("value", " value=\"", 3178, "\"", 3186, 0);
            EndWriteAttribute();
            WriteLiteral(@" required placeholder=""Nội dung"" rows=""5""></textarea>
                                </div>
                            </div>
                        </div>
                        <div class=""row border-top mt-1"">
                            <div class=""col-12"" style=""margin-top:10px"">
                                <button type=""button"" class=""btn btn-primary btn-sm wd-80 ml-2 float-right"" id=""btnLuuNoiDung"">
                                    <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
                                </button>
                                <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80 float-left mr-2"" id=""btnXoaNoiDung""><i class=""fas fa-trash-alt mr-2""></i>Xóa</button>
                                <button type=""button"" class=""btn btn-primary btn-sm wd-140 float-left"" id=""btnXemDanhSachNoiDung""><i class=""fa fa-eye mr-2""></i>Xem danh sách</button>
                            </div>
                        </div>
                    </form>
           ");
            WriteLiteral(@"     </div>
                <div id=""modalTaoNoiDungFormLietKe"" class=""d-none"">
                    <div class=""row"">
                        <div class=""col-12 px-2"">
                            <div id=""gridViewDanhSach"" class=""table-app"">
                                <div class=""table-responsive"" style=""height:300px; width: 100%;"">
                                    <table class=""table table-striped table-bordered fixed-header"">
                                        <thead class=""font-weight-bold"">
                                            <tr class=""text-center uppercase"">
                                                <th style=""width: 40px;"">STT</th>
                                                <th>Nội dung</th>
                                                <th style=""width: 40px""></th>
                                            </tr>
                                        </thead>
                                        <tbody id=""tblDanhSachNoiDung"">
                    ");
            WriteLiteral(@"                    </tbody>
                                    </table>
                                </div>
                                <div class=""px-2"" id=""tblDanhSachNoiDung_pagination""></div>
                            </div>
                        </div>
                    </div>
                    <div class=""row border-top mt-1"">
                        <div class=""col-12"" style=""margin-top:10px"">
                            <button type=""button"" class=""btn btn-primary btn-sm wd-100 float-right"" id=""btnManHinhThemMoi"">
                                <i class=""fas fa-plus mr-2""></i>Thêm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id=""modalChonNoiDung"" class=""modal-drag"" style=""width:380px; z-index:9999999;"">
    <div class=""modal-drag-header px-3 border-bottom"">
        <h5><span class=""modal-drag-title"">Chọn nội dung đã tạo</span> <");
            WriteLiteral(@"span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px; padding-bottom: 7px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""inputSearch_ChonNoiDung"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
                <input type=""hidden"" id=""modalChonNoiDungElementSelect"">

            </div>
            <div class=""col-12 my-2 scrollable"" style=""max-height:250px;"" id=""modalChonNoiDungDanhSach"">

            </div>
        </div>
    </div>
    <div class=""modal-drag-footer border-top"">
        <button type=""button"" class=""btn-outline-primary btn-sm wd-80"" id=""btnBoChonNoiDung"">
            <i class=""fas fa-times mr-1""></i> Bỏ chọn
        </button>
        <button type=""button"" class=""btn btn-primary btn-sm wd-80 float-right"" id=""btnChonNoiDung"">
            <i class=""fas fa-mouse-pointer mr-1""></i> Chọn
        </button>
    </d");
            WriteLiteral(@"iv>
</div>

<script type=""text/html"" id=""modalChonNoiDungDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox dscnd"" id=""dscnd_<%- item.so_id %>"">
        <input type=""checkbox"" id=""chon_noi_dung_<%- item.so_id %>"" value=""<%- item.so_id %>"" data-loai=""<%- item.nv_ct%>"" class=""custom-control-input modalChonNoiDungItem single_checked"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""chon_noi_dung_<%- item.so_id %>""><%- item.noi_dung.slice(0, 55) + (item.noi_dung.length > 55 ? '...' : '')%></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>

<script type=""text/html"" id=""tblDanhSachNoiDung_template"">
    <% if(data.length > 0){ %>
    <% _.forEach(data, function(item, index) { %>
    <tr style=""cursor: pointer;"">
        <td class=""text-center""><%- item.stt %></td>
        <td class=""text-left""><");
            WriteLiteral(@"%- item.noi_dung %></td>
        <td class=""text-center"">
            <a href=""#"" onclick=""suaNoiDung('<%- item.ma_doi_tac%>','<%- item.so_id%>','<%- item.pm%>','<%- item.nv%>','<%- item.nv_ct%>','<%- item.noi_dung%>')""><i class=""fa fa-edit""></i></a>
        </td>
    </tr>
    <% })}else{ %>
    <tr style=""cursor: pointer;"">
        <td colspan=""5"" class=""text-center"">Chưa có dữ liệu</td>
    </tr>
    <% } %>

    <% if(data.length < 7){
    for(var");
            BeginWriteAttribute("i", " i =", 8774, "", 8778, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 7 - data.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td>\r\n            <div class=\"tabulator-cell\" role=\"gridcell\" tabulator-field=\"stt\"");
            BeginWriteAttribute("title", " title=\"", 8919, "\"", 8927, 0);
            EndWriteAttribute();
            WriteLiteral(" style=\"text-align: center; height: 20px;\">&nbsp;<div class=\"tabulator-col-resize-handle\"></div><div class=\"tabulator-col-resize-handle prev\"></div></div>\r\n        </td>\r\n        <td></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n");
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
