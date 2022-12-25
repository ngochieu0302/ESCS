#pragma checksum "D:\ESCS\ESCS\Areas\Manager\Views\RetrieveCategories\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "aaf9859d6b5d5c075c878b6c6850ee3976fd23c2"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Manager_Views_RetrieveCategories__Modal), @"mvc.1.0.view", @"/Areas/Manager/Views/RetrieveCategories/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"aaf9859d6b5d5c075c878b6c6850ee3976fd23c2", @"/Areas/Manager/Views/RetrieveCategories/_Modal.cshtml")]
    public class Areas_Manager_Views_RetrieveCategories__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .wizard .nav-tabs > li a {
        margin: 15px auto;
    }
</style>
<div id=""modalThuHoiVatTu"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"" style=""max-width:900px"">
        <div class=""modal-content"">
            <div class=""modal-header"">
                <h4 class=""modal-title"">Thanh lý thu hồi vật tư</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">×</span></button>
            </div>
            <div class=""modal-body"" style=""padding-top:5px"">
                <form name=""frmTimKiemVatTu"" method=""post"">
                    <input type=""hidden"" class=""form-control"" name=""so_id_tl"">
                    <div class=""row"">
                        <div class=""col col-3"">
                            <div class=""form-group"">
                                <label for=""ngay_d"">Từ ngày</l");
            WriteLiteral(@"abel>
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control datepicker"" autocomplete=""off"" name=""tu_ngay"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col col-3"">
                            <div class=""form-group"">
                                <label for=""ngay_c"">Đến ngày</label>
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control datepicker"" autocomplete=""off"" name=""den_ngay"" display-format=""date"" value-format=""number"" placeholder=""dd/mm/yyyy"">
      ");
            WriteLiteral(@"                              <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label>Số hồ sơ</label>
                                <input type=""text"" name=""so_hs"" placeholder=""Số hồ sơ"" autocomplete=""off"" class=""form-control digit"">
                            </div>
                        </div>
                        <div class=""col col-3"" style=""margin-top: 5px;"">
                            <button type=""button"" class=""btn btn-primary btn-sm wd-40p mt-3"" id=""btnRetrieveCatSearchModal"" title=""Tìm kiếm"">
                                <i class=""fa fa-search""></i>
                            </button>
               ");
            WriteLiteral(@"         </div>
                    </div>

                </form>
                <div class=""row"">
                    <div class=""col-12 mt-1"">
                        <div class=""table-responsive"" style=""max-height:277px;"">
                            <table class=""table table-bordered fixed-header"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width:40px"">
                                            <div class=""custom-control custom-checkbox"">
                                                <input type=""checkbox"" onchange=""checkAll(this)"" class=""custom-control-input ntba-all"" id=""tableDsNguoiThuDoiCheckAll"" />
                                                <label class=""custom-control-label"" for=""tableDsNguoiThuDoiCheckAll""><b style=""font-weight:bold"">&nbsp;</b></label>
                                            </div>
                            ");
            WriteLiteral(@"            </th>
                                        <th style=""width:200px"">Số hồ sơ</th>
                                        <th style=""width:200px"">Vật tư thanh lý thu hồi</th>
                                        <th style=""width:100px"">Số tiền</th>
                                        <th>Ghi chú</th>
                                    </tr>
                                </thead>
                                <tbody id=""bodyTableDsVatTu"">
                                    <tr>
                                        <td colspan=""6"" class=""text-center"">Chưa có dữ liệu</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <form name=""frmLuuHoaDonChungTu"" method=""post"">
                    <input type=""hidden"" name=""so_id_tl""");
            BeginWriteAttribute("value", " value=\"", 5040, "\"", 5048, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row mt-2"">
                        <div class=""col-2"">
                            <div class=""form-group"">
                                <input type=""text"" id=""frmLuuHoaDonChungTu_Tongtien"" autocomplete=""off"" name=""tong_tien"" required placeholder=""Tổng tiền"" readonly=""readonly"" class=""form-control number"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <input type=""text"" placeholder=""Số chứng từ"" autocomplete=""off"" maxlength=""50"" name=""so_ct"" readonly=""readonly"" class=""form-control"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <div class=""input-group"">
                                    <input type=""text"" class=""form-control datepicker"" required autocomplete=""of");
            WriteLiteral(@"f"" name=""ngay_ht"" display-format=""date"" value-format=""number"" placeholder=""Ngày thu đòi: dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""form-group"">
                                <input type=""text"" placeholder=""Ghi chú"" autocomplete=""off"" maxlength=""500"" name=""ghi_chu"" class=""form-control"">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"" style=""display:block"">
                <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80"" id=""modalThuHoiVatTu_Xoa""><i class=""fas fa-trash mr-2"">");
            WriteLiteral(@"</i>Xóa</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-2 float-right"" data-dismiss=""modal"" id=""modalClose""><i class=""fas fa-window-close mr-2""></i>Đóng</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-180 mg-t-2 float-right"" id=""modalThuHoiVatTu_LuuChungTu""><i class=""fas fa-save mr-2""></i>Cập nhật số chứng từ</button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-2 float-right"" id=""modalThuHoiVatTu_Luu""><i class=""fas fa-save mr-2""></i>Lưu</button>
                <button type=""button"" class=""btn btn-primary btn-sm float-right"" id=""btnTrinhThanhLy""><i class=""fas fa-share-square mr-2""></i>Trình duyệt</button>
");
            WriteLiteral("            </div>\r\n        </div>\r\n    </div>\r\n</div>");
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
