#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\UserManagement\_PhanCapGiamDinhBoiThuong.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "59df07cf642653ed06ff80170f1be1c5ee5f3571"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_UserManagement__PhanCapGiamDinhBoiThuong), @"mvc.1.0.view", @"/Areas/Admin/Views/UserManagement/_PhanCapGiamDinhBoiThuong.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"59df07cf642653ed06ff80170f1be1c5ee5f3571", @"/Areas/Admin/Views/UserManagement/_PhanCapGiamDinhBoiThuong.cshtml")]
    public class Areas_Admin_Views_UserManagement__PhanCapGiamDinhBoiThuong : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalPhanCapGiamDinhBoiThuong"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"">
            <form name=""frmPhanCapGiamDinhBoiThuong"" method=""post"">
                <div class=""modal-header"">
                    <h4 class=""modal-title"">Phân cấp giám định, bồi thường</h4>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <input type=""hidden"" name=""ma_doi_tac""");
            BeginWriteAttribute("value", " value=\"", 791, "\"", 799, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"ma_chi_nhanh\"");
            BeginWriteAttribute("value", " value=\"", 869, "\"", 877, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                        <input type=\"hidden\" name=\"ma\"");
            BeginWriteAttribute("value", " value=\"", 937, "\"", 945, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n\r\n                        <input type=\"hidden\" name=\"so_id\"");
            BeginWriteAttribute("value", " value=\"", 1010, "\"", 1018, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Nghiệp vụ</label>
                                <select class=""select2 form-control custom-select"" required name=""nv"" style=""width: 100%; height:36px;"">
                                    <option value=""XE"">Xe cơ giới</option>
                                    <option value=""NG"">Con người</option>
                                    <option value=""THANH_TOAN"">Thanh toán</option>
");
            WriteLiteral(@"                                </select>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Ngày hiệu lực</label>
                                <div class=""input-group"">
                                    <input type=""text"" name=""ngay_hl"" display-format=""date"" value-format=""number"" required class=""form-control datepicker"" placeholder=""Ngày hiệu lực"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label class=""_req");
            WriteLiteral(@"uired"">Ngày kết thúc</label>
                                <div class=""input-group"">
                                    <input type=""text"" name=""ngay_kt"" display-format=""date"" value-format=""number"" required class=""form-control datepicker"" placeholder=""Ngày kết thúc"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Trạng thái</label>
                                <select class=""select2 form-control custom-select"" required name=""trang_thai"" style=""width: 100%; height:36px;"">
                                    <option value=""D"">Được dùng</option>
                ");
            WriteLiteral(@"                    <option value=""K"">Không được dùng</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-sm-12"">
                            <label>Nội dung</label>
                            <textarea class=""form-control"" name=""nd"" placeholder=""Nội dung"" rows=""3""></textarea>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:15px;"">
                        <div class=""col-md-12"">
                            <div>
                                <ul class=""nav nav-pills"" role=""tablist"" id=""tab-phan-cap"">
                                    <li class=""nav-item"" role=""presentation"">
                                        <a class=""nav-link active"" id=""giam-dinh-tab"" data-toggle=""tab"" href=""#giam_dinh"" role=""tab"" aria-controls=""giam_dinh"" aria-selected=""true"">Giám định</a>
                                    </li>
               ");
            WriteLiteral(@"                     <li class=""nav-item"" role=""presentation"">
                                        <a class=""nav-link"" id=""boi-thuong-tab"" data-toggle=""tab"" href=""#boi_thuong"" role=""tab"" aria-controls=""boi_thuong"" aria-selected=""false"">Bồi thường</a>
                                    </li>
                                </ul>
                                <div class=""tab-content"" style=""padding-top:10px;"">
                                    <div class=""tab-pane fade show active data-scroll"" id=""giam_dinh"" role=""tabpanel"" aria-labelledby=""giam-dinh-tab"">
                                        <div class=""table-responsive"" id=""divPhanCapGiamDinh"" style=""max-height: 270px;"">
                                            <table id=""tablePhanCapGiamDinh"" class=""table table-bordered fixed-header"">
                                                <thead class=""font-weight-bold card-title-bg"">
                                                    <tr class=""text-center uppercase"" style=""background-colo");
            WriteLiteral(@"r: #1e88e5;color:#FFF;"">
                                                        <th style=""width:20px"" class=""text-center"">STT</th>
                                                        <th style=""width:35%"">Loại hình nghiệp vụ</th>
                                                        <th style=""width:25%"">P/A khắc phục</th>
                                                        <th>Số tiền</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody id=""tablePhanCapGiamDinhBoby"">
                                                </tbody>
                                                <tfoot>
                                                    <tr class=""text-left card-title-bg"">
                                                        <td colspan=""5"">
                                                            <a ");
            WriteLiteral(@"href=""javascript:void(0)"" id=""btnThemMoiPhanCapGiamDinh"" title=""Thêm mới phân cấp giám định"">
                                                                <i class=""fas fa-plus-square""></i>&nbsp;&nbsp;Thêm mới phân cấp giám định
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                    <div class=""tab-pane fade data-scroll"" id=""boi_thuong"" role=""tabpanel"" aria-labelledby=""boi-thuong-tab"">
                                        <div class=""table-responsive"" id=""divPhanCapBoiThuong"" style=""max-height: 270px;"">
                                            <table id=""tablePhanCapBoiThuong"" class=""table table-bordered fixed-header"">
          ");
            WriteLiteral(@"                                      <thead class=""font-weight-bold card-title-bg"">
                                                    <tr class=""text-center uppercase"" style=""background-color: #1e88e5;color:#FFF;"">
                                                        <th style=""width:20px"" class=""text-center"">STT</th>
                                                        <th style=""width:35%"">Loại hình nghiệp vụ</th>
                                                        <th>Duyệt phương án</th>
                                                        <th>Bảo lãnh</th>
                                                        <th>Bồi thường</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody id=""tablePhanCapBoiThuongBody"">
                                                </tbody>
                           ");
            WriteLiteral(@"                     <tfoot>
                                                    <tr class=""text-left card-title-bg"">
                                                        <td colspan=""6"">
                                                            <a href=""javascript:void(0)"" id=""btnThemMoiPhanCapBoiThuong"" title=""Thêm mới phân cấp bồi thường"">
                                                                <i class=""fas fa-plus-square""></i>&nbsp;&nbsp;Thêm mới phân cấp bồi thường
                                                            </a>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
  ");
            WriteLiteral(@"              </div>
                <div class=""modal-footer"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-80"" id=""btnLuuPhanCapGiamDinhBoiThuong""><i class=""fa fa-save""></i> Lưu</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
                </div>
            </form>
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
