#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\_ModalSuKienBH.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "fdd972836d51d184a8402e51c7fa7a5ca369e3e5"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views__ModalSuKienBH), @"mvc.1.0.view", @"/Areas/CarClaim/Views/_ModalSuKienBH.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"fdd972836d51d184a8402e51c7fa7a5ca369e3e5", @"/Areas/CarClaim/Views/_ModalSuKienBH.cshtml")]
    public class Areas_CarClaim_Views__ModalSuKienBH : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalSuKienBH"" class=""modal fade"" tabindex=""-1"" data-keyboard=""false"" aria-hidden=""true"">
    <div class=""modal-dialog"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thông tin sự kiện bảo hiểm</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"" style=""padding-top:5px;"">
                <div id=""modalSuKienBHFormNhap"">
                    <form id=""frmSuKienBH"" name=""frmSuKienBH"" method=""post"">
                        <input type=""hidden"" name=""bt""");
            BeginWriteAttribute("value", " value=\"", 656, "\"", 664, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label for=""ma_chi_nhanh"" class=""_required"">Nhóm sự kiện</label>
                                    <select class=""select2 form-control custom-select"" required name=""nhom_su_kien"" style=""width:100%"">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label class=""_required"">Tên sự kiện</label>
                                    <input type=""text"" required autocomplete=""off"" class=""form-control"" name=""ten_sk"" placeholder=""Tên sự kiện"">
                                </div>
                            </div>
                   ");
            WriteLiteral(@"     </div>
                        <div class=""row"">
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Ngày xảy ra</label>
                                    <div class=""input-group"">
                                        <input type=""text"" class=""form-control datepicker"" required name=""tu_ngay"" display-format=""date"" value-format=""number"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label>Ngày kết thúc dự kiến");
            WriteLiteral("</label>\r\n                                    <div class=\"input-group\">\r\n                                        <input type=\"text\" class=\"form-control datepicker\"");
            BeginWriteAttribute("required", " required=\"", 2876, "\"", 2887, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""den_ngay"" display-format=""date"" value-format=""number"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label>Mô tả sự kiện</label>
                                    <textarea class=""form-control"" name=""mo_ta"" autocomplete=""off"" rows=""4"" placeholder=""Mô tả sự kiện""></textarea>
                                </div>
                            </div>
                        </div>
                        <div class=""row"" style=""margin-top:6px"">
     ");
            WriteLiteral(@"                       <div class=""col-12"" style=""text-align:center; margin-top:10px"">
                                <button type=""button"" class=""btn btn-primary btn-sm wd-110"" id=""btnLuuSuKienBH"">
                                    <i class=""fa fa-save mr-2""></i>Lưu thông tin
                                </button>
                               
                                <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""btnQuayLaiChonSuKien"">
                                    <i class=""fas fa-step-backward mr-2""></i>Quay lại
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div id=""modalSuKienBHFormChon"">
                    <form id=""frmTKiemSuKienBH"" name=""frmTKiemSuKienBH"" method=""post"">
                        <input type=""hidden"" name=""bt""");
            BeginWriteAttribute("value", " value=\"", 4834, "\"", 4842, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <div class=""input-group"">
                                        <input type=""text"" class=""form-control"" autocomplete=""off"" name=""tim"" placeholder=""Nhập tên sự kiện: Cơn bão số 12.."">
                                        <div class=""input-group-append"">
                                            <label class=""input-group-text"" for=""tim"">
                                                <a href=""javascript:void(0)"" onclick=""getPagingSKBH(1)"">
                                                    <i class=""fas fa-search"" title=""Tìm kiếm""></i>
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
 ");
            WriteLiteral(@"                       </div>
                    </form>
                    <table class=""table table-hover"" style=""border-bottom:1px solid #e8eef3;"">
                        <thead>
                            <tr>
                                <th style=""width:40px""></th>
                                <th class=""text-center"" style=""width:150px"">Ngày xảy ra</th>
                                <th class=""text-center"">Tên sự kiện</th>
                                <th style=""width:40px""></th>
                            </tr>
                        </thead>
                        <tbody id=""tableSuKienBH"">
                        </tbody>
                    </table>
                    <div class=""row mt-2"">
                        <div class=""col-12"">
                            <div id=""tableSuKienBH_pagination""></div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:6px"">
                        <div class=""col-1");
            WriteLiteral(@"2"" style=""text-align:center; margin-top:10px"">
                            <button type=""button"" class=""btn btn-primary btn-sm wd-140 float-left"" id=""btnXemDsSuKienChon"">
                                <i class=""fa fa-eye mr-2""></i>Xem danh sách
                            </button>
                            <button type=""button"" class=""btn btn-primary btn-sm wd-100 float-right"" id=""btnThemMoiSuKien"">
                                <i class=""fas fa-plus mr-2""></i>Thêm mới
                            </button>
                            <button type=""button"" class=""btn btn-primary btn-sm wd-140 float-right mr-1"" id=""btnLuuChonSuKien"">
                                <i class=""fa fa-save mr-2""></i>Lưu chọn sự kiện
                            </button>
                            <button type=""button"" class=""btn btn-primary btn-sm wd-180"" id=""btnManHinhTKiemSuKien"">
                                <i class=""fa fa-search mr-2""></i>Màn hình tìm kiếm
                            </button>

       ");
            WriteLiteral(@"                 </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script type=""text/html"" id=""tableSuKienBHTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <tr style=""cursor: pointer;"">
        <td onclick=""chonSuKien('<%- item.bt %>', '<%- item.nhom_su_kien %>', '<%- item.ten_sk %>', '<%- item.tu_ngay %>', '<%- item.den_ngay %>', '<%- item.thoi_gian %>', '<%- item.mo_ta %>')"">
            <div class=""custom-control custom-checkbox"">
                <input type=""checkbox"" id=""sukien_<%- item.bt %>"" value=""<%- item.bt %>"" class=""custom-control-input input-su-kien"">
                <label class=""custom-control-label"" for=""sukien_<%- item.bt %>"" style=""cursor:pointer""></label>
            </div>
        </td>
        <td onclick=""chonSuKien('<%- item.bt %>', '<%- item.nhom_su_kien %>', '<%- item.ten_sk %>', '<%- item.tu_ngay %>', '<%- item.den_ngay %>', '<%- item.thoi_gian %>', '<%- ite");
            WriteLiteral(@"m.mo_ta %>')""><%- item.thoi_gian %></td>
        <td onclick=""chonSuKien('<%- item.bt %>', '<%- item.nhom_su_kien %>', '<%- item.ten_sk %>', '<%- item.tu_ngay %>', '<%- item.den_ngay %>', '<%- item.thoi_gian %>', '<%- item.mo_ta %>')""><%- item.ten_sk %></td>
        <td class=""text-center"">
            <a href=""#"" onclick=""suaSuKienBH('<%- item.bt %>', '<%- item.nhom_su_kien %>', '<%- item.ten_sk %>', '<%- item.tu_ngay %>', '<%- item.den_ngay %>', '<%- item.mo_ta %>')""><i class=""fa fa-edit""></i></a>
        </td>
    </tr>
    <% })}else{ %>
    <tr style=""cursor: pointer;"">
        <td colspan=""4"" class=""text-center"">Chưa có sự kiện được thiết lập</td>
    </tr>
    <% } %>
</script>");
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
