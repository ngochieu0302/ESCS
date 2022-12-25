#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_HealthGuaranteeAddInvoice.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ed0dedf767d2277c70f55f226d6d25e01a07cc3b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__HealthGuaranteeAddInvoice), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_HealthGuaranteeAddInvoice.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ed0dedf767d2277c70f55f226d6d25e01a07cc3b", @"/Areas/HealthClaim/Views/_HealthGuaranteeAddInvoice.cshtml")]
    public class Areas_HealthClaim_Views__HealthGuaranteeAddInvoice : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalHoaDonChungTu"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm hóa đơn, chứng từ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form name=""frmHoaDonChungTu"" id=""frmHoaDonChungTu"" method=""post"">
                    <input type=""hidden"" name=""so_id"" />
                    <input type=""hidden"" name=""bt"" />
                    <div class=""row"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Đơn vị phát hành</label>
                                <select class=""select select2 form-control custom-select"" required name=""dvi_p");
            WriteLiteral("h\" style=\"width:100%\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 1091, "\"", 1099, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn đơn vị phát hành</option>
                                    <option value=""BENH_VIEN"">Bệnh viện</option>
                                    <option value=""NHA_THUOC"">Nhà thuốc</option>
                                    <option value=""KHAC"">Khác</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên đơn vị phát hành</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Tên đơn vị phát hành"" required name=""ten_dvi_phat_hanh"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label ");
            WriteLiteral(@"class=""_required"">Mã số thuế</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Mã số thuế"" required name=""mst_dvi_phat_hanh"">
                            </div>
                        </div>
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label class=""_required"">Địa chỉ</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Địa chỉ"" required name=""dchi_dvi_phat_hanh"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Ngày phát hành</label>
                                <div class=""input-group"">
                                    <input typ");
            WriteLiteral(@"e=""text"" class=""form-control datepicker"" autocomplete=""off"" display-format=""date"" value-format=""number"" required name=""ngay_ct"" placeholder=""dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Mẫu hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" required name=""mau_hdon"" placeholder=""GT00001..."">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_");
            WriteLiteral(@"required"">Ký hiệu hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" required name=""ky_hieu_hdon"" placeholder=""AP/20..."">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" required name=""so_hdon"" placeholder=""0000001"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label class=""_required"">Nội dung</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Nội dung"" required name=");
            WriteLiteral(@"""dien_giai"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số tiền</label>
                                <input type=""text"" class=""form-control number"" autocomplete=""off"" placeholder=""Số tiền"" required name=""tien"">
                            </div>
                        </div>
");
            WriteLiteral("                        <div class=\"col-3\">\r\n                            <div class=\"form-group\">\r\n                                <label");
            BeginWriteAttribute("class", " class=\"", 6338, "\"", 6346, 0);
            EndWriteAttribute();
            WriteLiteral(@">Tiền thuế</label>
                                <input type=""text"" class=""form-control number"" autocomplete=""off"" placeholder=""Thuế"" required name=""thue"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Tổng cộng</label>
                                <input type=""text"" class=""form-control number"" autocomplete=""off"" placeholder=""Tổng tiền"" readonly required name=""tong_cong"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label>Tên đơn vị nhận hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Tên đơn vị nhận hóa đơn"" name");
            WriteLiteral(@"=""ten_dvi_nhan"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label>MST đơn vị nhận hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""MST đơn vị nhận hóa đơn"" name=""mst_dvi_nhan"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label>Địa chỉ đơn vị nhận hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Địa chỉ đơn vị nhận hóa đơn"" name=""dchi_dvi_nhan"">
                            </div>
                        </div>
                    </div>
                    <div class");
            WriteLiteral(@"=""row"" style=""margin-top:8px"">
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label>Website tra cứu hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Website tra cứu hóa đơn"" name=""website_tra_cuu"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label>Mã tra cứu hóa đơn</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Mã tra cứu hóa đơn"" name=""ma_tra_cuu"">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 ml-2"" id=""btnLuuHoaDonChungTu"">
 ");
            WriteLiteral(@"                   <i class=""fas fa-save mr-2""></i>Lưu
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-110"" id=""btnLuuDongHoaDonChungTu"">
                    <i class=""fas fa-hdd mr-2""></i>Lưu & đóng
                </button>
                <button class=""btn btn-primary btn-sm wd-85 mg-t-22"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
            </div>
        </div>
    </div>
</div>

");
            WriteLiteral(@"<script type=""text/html"" id=""step3_chung_tu_template"">
    <% if(chung_tu.length > 0){
    _.forEach(chung_tu, function(item,index) { %>
    <tr>
        <td class=""text-center"">
            <input type=""hidden"" value=""<%- JSON.stringify(item) %>"" name=""objInfo"" />
            <%- item.ngay_ct %>
        </td>
        <td class=""text-center""><%- item.mau_hdon %></td>
        <td class=""text-center""><%- item.ky_hieu_hdon %></td>
        <td class=""text-center""><%- item.so_hdon %></td>
        <td><%- item.dien_giai %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tien) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.thue) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.tong_cong) %></td>
        <td class=""text-center"">
");
            WriteLiteral("            <a href=\"#\" onclick=\"suaHoaDonChungTu(this)\">\r\n                <i class=\"far fa-file-alt\" title=\"Xem/sửa chi tiết chứng từ\"></i>\r\n            </a>\r\n        </td>\r\n        <td class=\"text-center\">\r\n");
            WriteLiteral("            <a href=\"#\" onclick=\"xoaHoaDonChungTu(this)\">\r\n                <i class=\"fas fa-trash-alt\" title=\"Xóa chứng từ\"></i>\r\n            </a>\r\n        </td>\r\n    </tr>\r\n    <% })} %>\r\n\r\n    <% if(chung_tu.length < 3){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 11371, "", 11375, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 3 - chung_tu.length;i++ ){
    %>
    <tr>
        <td style=""height:35.5px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>

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
