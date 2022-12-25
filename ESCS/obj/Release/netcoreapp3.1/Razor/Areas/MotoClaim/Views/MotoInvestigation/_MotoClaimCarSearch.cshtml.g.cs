#pragma checksum "D:\ESCS\ESCS\Areas\MotoClaim\Views\MotoInvestigation\_MotoClaimCarSearch.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "ab9009a9076ef570a145e4384ec2bfa5e4d98e92"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotoClaim_Views_MotoInvestigation__MotoClaimCarSearch), @"mvc.1.0.view", @"/Areas/MotoClaim/Views/MotoInvestigation/_MotoClaimCarSearch.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"ab9009a9076ef570a145e4384ec2bfa5e4d98e92", @"/Areas/MotoClaim/Views/MotoInvestigation/_MotoClaimCarSearch.cshtml")]
    public class Areas_MotoClaim_Views_MotoInvestigation__MotoClaimCarSearch : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    #navLuongXuLy li.active a {
        font-weight: bold;
    }
</style>
<div id=""modalMotoSearch"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog modal-lg"" style=""max-width:unset;width:55%;"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm hồ sơ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" onclick=""hideModalTimKiemXe()"" aria-hidden=""true"">×</button>
            </div>
            <div class=""card border mb-0 p-2"">
                <div class=""card-body"" style=""padding:0px;"" id=""navTabTimKiemXe"">
                    <ul class=""cd-breadcrumb triangle nav nav-tabs"" role=""tablist"">
                        <li role=""presentation"" onclick=""changeTabTKiemXe('tabTimKiemXe')"" id=""Tab_tabTimKiemXe"">
                            <a href=""#Tab_tabTimKiemXe"" aria-controls=""changeTabTKiemXe"" role=""ta");
            WriteLiteral(@"b"" data-toggle=""tab"" aria-expanded=""false"" aria-selected=""true"">
                                <span class=""fa fa-car mr-2""></span>Thông tin xe
                            </a>
                        </li>
                        <li role=""presentation"" onclick=""changeTabTKiemXe('tabThongTinLienHe')"">
                            <a href=""#Tab_tabThongTinLienHe"" aria-controls=""stepThongTinGiamDinh"" role=""tab"" data-toggle=""tab"" aria-expanded=""false"" aria-selected=""false"">
                                <span class=""fa fa-user mr-2""></span>Thông tin người thông báo
                            </a>
                        </li>
                    </ul>
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" role=""tabpanel"" id=""tabTimKiemXe"">
                            <div class=""row"">
                                <div class=""col-12"">
                                    <nav aria-label=""breadcrumb"">
                                        <ol clas");
            WriteLiteral(@"s=""breadcrumb px-2"" id=""navLuongXuLy"" style=""margin:unset;margin-bottom:5px; padding-top:3px; padding-bottom:3px;"">
                                            <li class=""breadcrumb-item active"" data-val=""TIMKIEM""><a href=""#"" onclick=""navTimKiemXe('TIMKIEM')"">Tìm kiếm đối tượng</a></li>
                                            <li class=""breadcrumb-item"" data-val=""TAOHD""><a href=""#"" onclick=""navTimKiemXe('TAOHD')"">Không xác định được đối tượng</a></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                            <form name=""frmMotoClaimMotoSearch"" class=""divTIMKIEM"" method=""post"">
                                <div class=""row d-none"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Công ty</label>
                            ");
            WriteLiteral("                <select class=\"select2 form-control custom-select\" required name=\"ma_doi_tac\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 3242, "\"", 3250, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn đối tác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 3604, "\"", 3612, 0);
            EndWriteAttribute();
            WriteLiteral(">Đơn vị</label>\r\n                                            <select class=\"select2 form-control custom-select\" name=\"ma_chi_nhanh\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 3821, "\"", 3829, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn chi nhánh</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row d-none"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Tên</label>
                                            <input type=""text"" class=""form-control"" readonly placeholder=""Tên chủ xe/khách hàng"" autocomplete=""off"" name=""ten_kh"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số CMT</label>
                                            <input type=""text"" class=""form-control"" placeholder=""Số CMT/CCCD"" a");
            WriteLiteral(@"utocomplete=""off"" name=""cmt_kh"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Mã số thuế</label>
                                            <input type=""text"" class=""form-control"" placeholder=""Mã số thuế"" autocomplete=""off"" name=""mst_kh"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số hợp đồng</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số hợp đồng"" name=""so_hdong"">
                                   ");
            WriteLiteral(@"     </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số GCN bảo hiểm</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số giấy chứng nhận"" name=""so_gcn"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Biển số xe</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Biển số xe"" name=""bien_so_xe"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                 ");
            WriteLiteral(@"       <div class=""form-group"">
                                            <label>Số khung</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số khung"" name=""so_khung"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số máy</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số máy"" name=""so_may"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label");
            WriteLiteral(@" for=""ngay_d"" class=""_required"">Ngày xảy ra tổn thất</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" class=""form-control datepicker_max"" required name=""ngay_xr"" placeholder=""dd/mm/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <button type=""button"" class=""btn btn-primary btn-sm mg-t-22"" id=""btnMotoSearch""><i class=""fa fa-search mr-2""></i>Tìm kiếm</button>
                                    </div>
                                </div>");
            WriteLiteral(@"
                            </form>
                            <div class=""row divTIMKIEM"">
                                <div class=""col-12 mt-3"">
                                    <div class=""table-responsive"" style=""max-height: 230px;"">
                                        <table id=""tableDsHoSoGiayTo"" class=""table table-bordered fixed-header"" style=""width:170%"">
                                            <thead class=""font-weight-bold text-center uppercase"">
                                                <tr>
                                                    <th style=""width:100px"">Số hợp đồng</th>
                                                    <th style=""width:100px"">Biển số xe</th>
                                                    <th style=""width:180px"">Số giấy chứng nhận</th>
                                                    <th style=""width:150px"">Nghiệp vụ</th>
                                                    <th style=""width:225px"">Hiệu lực bảo hiểm</th>
      ");
            WriteLiteral(@"                                              <th>Tên chủ xe</th>
                                                    <th>Đơn vị cấp đơn</th>
                                                </tr>
                                            </thead>
                                            <tbody id=""modalMotoSearchDsGCN"">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <form class=""divTAOHD"" name=""frmTaoHDAo"" novalidate=""novalidate"" method=""post"">
                                <div class=""row mb-2"">
                                    <div class=""col-4"">
                                        <div class=""form-group"">
                                            <label for=""nguon"" class=""_required"">Nghiệp vụ</label>
                                            <select class=""select2 form-control ");
            WriteLiteral("custom-select\"");
            BeginWriteAttribute("required", " required=\"", 11012, "\"", 11023, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"nv\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 11111, "\"", 11119, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nghiệp vụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-4"">
                                        <div class=""form-group"">
                                            <label for=""nguon"" class=""_required"">Loại hình</label>
                                            <select class=""select2 form-control custom-select""");
            BeginWriteAttribute("required", " required=\"", 11610, "\"", 11621, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"loai\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 11711, "\"", 11719, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn loại hình</option>
                                                <option value=""TN"">Tự nguyện</option>
                                                <option value=""BB"">Bắt buộc</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-4"">
                                        <div class=""form-group"">
                                            <label for=""nguon"" class=""_required"">Loại hình nghiệp vụ</label>
                                            <select class=""select2 form-control custom-select""");
            BeginWriteAttribute("required", " required=\"", 12393, "\"", 12404, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"lh_nv\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 12495, "\"", 12503, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn loại hình nghiệp vụ</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-4"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Tên chủ xe</label>
                                            <input type=""text"" autocomplete=""off"" class=""form-control""");
            BeginWriteAttribute("required", " required=\"", 13001, "\"", 13012, 0);
            EndWriteAttribute();
            WriteLiteral(@" maxlength=""100"" name=""ten"">
                                        </div>
                                    </div>
                                    <div class=""col-4"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Biển số xe</label>
                                            <input type=""text"" autocomplete=""off"" class=""form-control""");
            BeginWriteAttribute("required", " required=\"", 13449, "\"", 13460, 0);
            EndWriteAttribute();
            WriteLiteral(@" maxlength=""100"" name=""bien_xe"">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class=""tab-pane"" role=""tabpanel"" id=""tabThongTinLienHe"">
                            <form name=""frmMotoClaimCustomerInfo"" method=""post"">
                                <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 13930, "\"", 13938, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_hs\"");
            BeginWriteAttribute("value", " value=\"", 14009, "\"", 14017, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"nv\"");
            BeginWriteAttribute("value", " value=\"", 14085, "\"", 14093, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"ma_doi_tac\"");
            BeginWriteAttribute("value", " value=\"", 14169, "\"", 14177, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"ma_chi_nhanh\"");
            BeginWriteAttribute("value", " value=\"", 14255, "\"", 14263, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_id_hd\"");
            BeginWriteAttribute("value", " value=\"", 14337, "\"", 14345, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_id_dt\"");
            BeginWriteAttribute("value", " value=\"", 14419, "\"", 14427, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                <input type=""hidden"" name=""nguon_tb"" value=""TTGD"" />
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label for=""nguon"" class=""_required"">Luồng xử lý theo NV</label>
                                            <select class=""select2 form-control custom-select""");
            BeginWriteAttribute("required", " required=\"", 14897, "\"", 14908, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"nv_xly\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 15000, "\"", 15008, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn luồng xử lý hồ sơ</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label for=""nguon"" class=""_required"">Nguồn thông báo</label>
                                            <select class=""select2 form-control custom-select""");
            BeginWriteAttribute("required", " required=\"", 15515, "\"", 15526, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"nguon_tb\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 15620, "\"", 15628, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nguồn thông báo</option>
                                                <option value=""CTCT"">Tổng đài</option>
                                                <option value=""MOBILE"">App mobile</option>
                                                <option value=""TTGD"" selected=""selected"">Trực tiếp</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Giờ thông báo</label>
                                            <div class=""input-group bootstrap-timepicker timepicker"">
                                                <input class=""form-control input-small time"" autocomplete=""off""");
            BeginWriteAttribute("required", " required=\"", 16526, "\"", 16537, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""gio_tb"" type=""text"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text"">
                                                        <span class=""ti-calendar""></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Ngày thông báo</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" class=""form-control datepicker_max"" display-format=""date"" value-format=""number""");
            BeginWriteAttribute("required", " required=\"", 17538, "\"", 17549, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""ngay_tb"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12"">
                                        <h5 class=""m-0 pd-y-10"">Thông tin người thông báo</h5>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mối quan hệ với chủ sở hữu ");
            WriteLiteral(@"xe</label>
                                            <select class=""select2 form-control"" required style=""width:100%"" name=""moi_qh_tb"">
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Họ và tên</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" required maxlength=""100"" name=""nguoi_tb"" placeholder=""VD: Nguyễn Văn A"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                           ");
            WriteLiteral(@" <label class=""_required"">Điện thoại</label>
                                            <input type=""text"" fn-validate=""validatePhoneControl"" autocomplete=""off"" class=""form-control phone"" required name=""dthoai_tb"" placeholder=""VD: 0972xxxxxx"">
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Email</label>
                                            <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" maxlength=""100"" name=""email_tb"" placeholder=""VD: mail@escs.vn"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12"">
                                    ");
            WriteLiteral(@"    <h5 class=""m-0 pd-y-10"">Thông tin người liên hệ</h5>
                                    </div>
                                    <div class=""col-12"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input class=""custom-control-input"" type=""checkbox"" id=""chkThamGiaLienHe"" value=""option1"">
                                            <label class=""custom-control-label"" for=""chkThamGiaLienHe"" style=""font-size:12px""><b style=""font-weight:bold"">Tôi là người thông báo và là người liên hệ</b></label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"" style=""margin-top:5px;"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mối quan hệ với chủ sở hữu xe</la");
            WriteLiteral(@"bel>
                                            <select class=""select2 form-control"" style=""width:100%"" required name=""moi_qh_lhe""></select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Họ và tên</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" required maxlength=""100"" name=""nguoi_lhe"" placeholder=""VD: Nguyễn Văn A"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Điện thoại</label>
    ");
            WriteLiteral(@"                                        <input type=""text"" fn-validate=""validatePhoneControl"" class=""form-control phone"" autocomplete=""off"" required name=""dthoai_lhe"" placeholder=""VD: 0972xxxxxx"">
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Email</label>
                                            <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" maxlength=""100"" name=""email_lhe"" placeholder=""VD: mail@escs.vn"">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
            ");
            WriteLiteral(@"    <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnTiepTheo"">
                    Tiếp theo &nbsp;&nbsp;<i class=""fas fa-chevron-right""></i>
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 mg-t-22"" onclick=""hideModalTimKiemXe()"" data-dismiss=""modal"" id=""modalCarSearch_close""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
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