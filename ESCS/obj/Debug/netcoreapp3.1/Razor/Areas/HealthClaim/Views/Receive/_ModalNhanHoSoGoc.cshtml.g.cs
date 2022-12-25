#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\Receive\_ModalNhanHoSoGoc.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5296aee6bfdf8a928b24af860cc5b9867e461e4d"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views_Receive__ModalNhanHoSoGoc), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/Receive/_ModalNhanHoSoGoc.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5296aee6bfdf8a928b24af860cc5b9867e461e4d", @"/Areas/HealthClaim/Views/Receive/_ModalNhanHoSoGoc.cshtml")]
    public class Areas_HealthClaim_Views_Receive__ModalNhanHoSoGoc : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalDsLanNhanHoSoGoc"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"" style=""max-width: 60%;"">
        <div class=""modal-content"">
            <div class=""modal-header"" style=""padding: 0.5rem 1rem;"">
                <h4 class=""modal-title"">Danh sách các lần nhận hồ sơ gốc</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body p-2"" style=""background-color:#54667a0a;"">
                <form name=""frmLanNhanHoSoGoc"" novalidate=""novalidate"" method=""post"">
                    <input type=""hidden"" name=""lan""");
            BeginWriteAttribute("value", " value=\"", 855, "\"", 863, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row mt-2"">
                        <div class=""col-3"" style=""padding-right: 0;"">
                            <div class=""card"" style=""margin-bottom:unset;"">
                                <div class=""card-body p-0"">
                                    <div class=""border rounded"">
                                        <div class=""justify-content-between align-items-center p-2 card-title-bg"">
                                            <h6 class=""m-0 text-center"">Ngày nhận hồ sơ gốc</h6>
                                        </div>
                                        <div class=""table-responsive"" style=""max-height:400px"">
                                            <table class=""table table-hover"" style=""border-bottom:1px solid #e8eef3;"">
                                                <tbody class=""text-center"" id=""tblDsNgayNhanHoSoGoc"">
                                                </tbody>
                                            </table>
      ");
            WriteLiteral(@"                                  </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-9"">
                            <div class=""card"" style=""margin-bottom:unset;"">
                                <div class=""card-body p-0"">
                                    <div class=""rounded"">
                                        <div class=""row"">
                                            <div class=""col-12"">
                                                <div class=""table-responsive"" style=""max-height: 430px"">
                                                    <table id=""tableDanhSachHSGTGoc"" class=""table table-bordered fixed-header"">
                                                        <thead class=""font-weight-bold card-title-bg"">
                                                            <tr class=""text-center uppercase"" style=""background-color: #1e88");
            WriteLiteral(@"e5;color:#FFF;"">
                                                                <th style=""width: 70%"">Tên Hồ sơ giấy tờ</th>
                                                                <th style=""width: 30%"">Trạng thái</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody id=""tableDanhSachHSGTBody"">
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"" style=""display: blo");
            WriteLiteral(@"ck;"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-150 float-left"" id=""btnThemMoiLanNhanHSGoc""><i class=""fas fa-plus""></i> Thêm lần nhận hồ sơ</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" id=""btnLuuCTLanNhanHSGoc""><i class=""fas fa-save""></i> Lưu</button>
                <button type=""button"" class=""btn btn-primary btn-sm float-right"" id=""btnXacNhanLanNhanHSGoc""><i class=""fas fa-check""></i> Xác nhận</button>
                <button type=""button"" class=""btn btn-outline-primary btn-sm wd-85 float-right"" id=""btnXoaLanNhanHSGoc""");
            BeginWriteAttribute("style", " style=\"", 4705, "\"", 4713, 0);
            EndWriteAttribute();
            WriteLiteral(@"><i class=""fas fa-trash-alt""></i> Xóa</button>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade bs-example-modal-sm"" id=""modalThemLanNhanHSGoc"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"" style=""max-width: 30%;"">
        <div class=""modal-content"">
            <div class=""modal-header"" style=""padding: 0.5rem 1rem;"">
                <h5 class=""modal-title"">Thêm ngày nhận hồ sơ gốc</h5>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body"">
                <form name=""frmThemLanNhanHSGoc"" method=""post"">
                    <input type=""hidden"" name=""lan""");
            BeginWriteAttribute("value", " value=\"", 5577, "\"", 5585, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Ngày nhận hồ sơ gốc</label>
                                <div class=""input-group"">
                                    <input type=""text"" name=""ngay_nhan"" autocomplete=""off"" display-format=""date"" value-format=""number""");
            BeginWriteAttribute("required", " required=\"", 6008, "\"", 6019, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""form-control datepicker"" placeholder=""Ngày nhận"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 6552, "\"", 6560, 0);
            EndWriteAttribute();
            WriteLiteral(@">Ghi chú</label>
                                <div class=""input-group"">
                                    <textarea class=""form-control"" name=""ghi_chu"" placeholder=""Ghi chú"" rows=""5"" spellcheck=""false""></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""btnLuuLanNhanHSGoc""><i class=""fa fa-save""></i> Lưu</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
            </div>
        </div>
    </div>
</div>

");
            WriteLiteral(@"<script type=""text/html"" id=""tblDsNgayNhanHoSoGoc_template"">
    <% if(ds_ngay.length > 0){
    _.forEach(ds_ngay, function(item,index) { %>
    <tr style=""cursor: pointer; text-align:center"" data-lan=""<%- item.lan %>"" id=""bt_<%- item.lan %>"" onclick=""getDetailNgayNhanHSGoc('<%- item.lan %>')"" class=""item-ngay-nhan-hs-goc"">
        <td style=""font-weight:bold"">
            <%- item.ngay_nhan_hthi %>(<%- item.nsd %>)
        </td>
        <%");
            BeginWriteAttribute("if(item.trang_thai", " if(item.trang_thai =", 7840, "", 7861, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 'D'){ %>
        <td>
            <span>
                <a href=""#"">
                    <i class=""fas fa-check"" style=""color:green""></i>
                </a>
            </span>
        </td>
        <% }else{ %>
        <td>
            <span>
                <a href=""#"" onclick=""suaLanNhanHoSoGoc('<%- item.lan %>')"">
                    <i class=""fas fa-edit""></i>
                </a>
            </span>
        </td>
        <% } %>
    </tr>
    <%})} %>
    <% if(ds_ngay.length < 11){
    for(var");
            BeginWriteAttribute("i", " i =", 8391, "", 8395, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 11 - ds_ngay.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:36px;\"></td>\r\n        <td></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n\r\n");
            WriteLiteral(@"<script type=""text/html"" id=""tableDanhSachHSGTBody_template"">
    <% if(ho_so_giay_to.length > 0){
    _.forEach(ho_so_giay_to, function(item,index) { %>
    <tr>
        <td style=""text-align:left"">
            <a href=""#"" data-field=""ten"" data-val=""<%- item.ten %>""><%- item.ten %></a>
        </td>
        <td style=""text-align: center"">
            <div class=""custom-control custom-checkbox custom-control-inline ml-2"" style=""margin:unset;"">
                <input type=""checkbox"" id=""bo_sung_hsgt_goc_<%- item.ma_hs %>"" value=""<%- item.ma_hs %>"" class=""custom-control-input input_chon_hsgt_bs"">
                <label class=""custom-control-label"" for=""bo_sung_hsgt_goc_<%- item.ma_hs %>"">&nbsp;</label>
            </div>
        </td>
    </tr>
    <% })}else{ %>
    <tr>
        <td class=""text-center"" colspan=""2"">Chưa có dữ liệu</td>
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